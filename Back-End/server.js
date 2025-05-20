require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

// Validate environment variables
if (!process.env.JWT_SECRET) {
  console.warn('Warning: JWT_SECRET not set. Using default secret key.');
  process.env.JWT_SECRET = 'default_secret_key_change_in_production';
}
if (!process.env.ACCESS_TOKEN_EXPIRY) {
  console.warn('Warning: ACCESS_TOKEN_EXPIRY not set. Using default value of 15m.');
  process.env.ACCESS_TOKEN_EXPIRY = '15m';
}
if (!process.env.REFRESH_TOKEN_EXPIRY) {
  console.warn('Warning: REFRESH_TOKEN_EXPIRY not set. Using default value of 7d.');
  process.env.REFRESH_TOKEN_EXPIRY = '7d';
}

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
let refreshTokens = [];

// Store orders in memory
let orders = [];

// ✅ Register Route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Signup Request Data:", { username, email, password });

  // Check if the user already exists
  const userExists = users.find((u) => u.email === email || u.username === username);
  if (userExists) {
    console.log("Signup Error: User already exists with email or username");
    return res.status(400).json({ message: 'Username or Email already exists' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword,
      cart: []
    };

    users.push(newUser);
    console.log("User Registered Successfully:", newUser);
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// ✅ Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Login Request Data:", { email, password });

  const user = users.find((u) => u.email === email);

  if (!user) {
    console.log("Login Error: User not found for email:", email);
    return res.status(401).json({ message: 'User not found' });
  }

  console.log("Stored Hashed Password:", user.password);

  try {
    const match = await bcrypt.compare(password, user.password);
    console.log("Password Match:", match);

    if (!match) {
      console.log("Login Error: Invalid credentials for email:", email);
      return res.status(403).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    refreshTokens.push(refreshToken);
    console.log("Login successful. Tokens generated for user:", user.email);

    res.json({ accessToken, refreshToken });

  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: 'Error during login' });
  }
});

// ✅ Refresh Token Route
app.post('/refresh-token', (req, res) => {
  const { token } = req.body;

  if (!token || !refreshTokens.includes(token)) {
    console.log("Refresh Token Error: Token not found or invalid");
    return res.status(403).json({ message: 'Refresh token not found' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    console.log("New Access Token generated for user:", user.username);
    res.json({ accessToken });

  } catch (err) {
    console.log("Invalid Refresh Token:", err.message);
    res.status(403).json({ message: 'Invalid refresh token' });
  }
});

// ✅ Logout Route
app.post('/logout', (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter(rt => rt !== token);
  console.log("User logged out. Token removed:", token);
  res.json({ message: 'Logged out successfully' });
});

// ✅ Authenticate Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log("Authentication Error: No token provided");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Authentication Error: Invalid token");
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

// ✅ Add to Cart Route
app.post('/cart', authenticateToken, (req, res) => {
  const { id, name, price, image, quantity } = req.body;
  const user = users.find(u => u.id === req.user.id);

  if (!user) return res.status(404).json({ message: 'User not found' });

  const existingItem = user.cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    user.cart.push({ id, name, price, image, quantity });
  }

  console.log("Cart updated for user:", user.username);
  res.json({ cart: user.cart });
});

// ✅ Get Cart Route
app.get('/cart', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);

  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json({ cart: user.cart });
});

// ✅ Update Cart Item Quantity
app.put('/cart/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const user = users.find(u => u.id === req.user.id);

  if (!user) return res.status(404).json({ message: 'User not found' });

  const item = user.cart.find(item => item.id === parseInt(id));
  if (!item) return res.status(404).json({ message: 'Item not found in cart' });

  if (quantity <= 0) {
    user.cart = user.cart.filter(item => item.id !== parseInt(id));
  } else {
    item.quantity = quantity;
  }

  console.log("Cart item updated for user:", user.username);
  res.json({ cart: user.cart });
});

// ✅ Remove Item from Cart Route
app.delete('/cart/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === req.user.id);

  if (!user) return res.status(404).json({ message: 'User not found' });

  user.cart = user.cart.filter(item => item.id !== parseInt(id));
  console.log("Item removed from cart for user:", user.username);
  res.json({ cart: user.cart });
});

// ✅ Create Order Route
app.post('/orders', authenticateToken, (req, res) => {
  const { items, total, date } = req.body;
  const user = users.find(u => u.id === req.user.id);

  if (!user) return res.status(404).json({ message: 'User not found' });

  const order = {
    id: orders.length + 1,
    userId: user.id,
    items,
    total,
    date,
    status: 'completed'
  };

  orders.push(order);
  console.log("Order created for user:", user.username);
  res.status(201).json({ order });
});

// ✅ Get Orders Route
app.get('/orders', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);

  if (!user) return res.status(404).json({ message: 'User not found' });

  const userOrders = orders.filter(order => order.userId === user.id);
  res.json({ orders: userOrders });
});

// ✅ Clear Cart Route
app.delete('/cart/clear', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);

  if (!user) return res.status(404).json({ message: 'User not found' });

  user.cart = [];
  console.log("Cart cleared for user:", user.username);
  res.json({ message: 'Cart cleared successfully' });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


