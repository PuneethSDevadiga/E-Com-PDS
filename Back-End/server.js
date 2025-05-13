// const express = require('express');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const users = [
//   {
//     username: 'puneeth',
//     password: 'pdx',
//   },
// ];

// let refreshTokens = [];

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(
//     (u) => u.username === username && u.password === password
//   );
//   if (user) {
//     const accessToken = jwt.sign(
//       { username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
//     );
//     const refreshToken = jwt.sign(
//       { username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
//     );
//     refreshTokens.push(refreshToken);
//     res.json({ accessToken, refreshToken });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// });

// app.post('/refresh-token', (req, res) => {
//   const { token } = req.body;
//   if (!token || !refreshTokens.includes(token)) {
//     return res.status(403).json({ message: 'Refresh token not found' });
//   }
//   try {
//     const user = jwt.verify(token, process.env.JWT_SECRET);
//     const accessToken = jwt.sign(
//       { username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
//     );
//     res.json({ accessToken });
//   } catch (err) {
//     res.status(403).json({ message: 'Invalid refresh token' });
//   }
// });

// app.get('/protected', authenticateToken, (req, res) => {
//   res.json({ message: 'This is protected data.' });
// });

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (!token) return res.sendStatus(401);
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });

//2nd
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Dummy user (hardcoded)
// const users = [
//   {
//     username: 'puneeth',
//     password: 'pdx',
//   },
// ];

// // In-memory refresh token store
// let refreshTokens = [];

// // Login route
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(
//     (u) => u.username === username && u.password === password
//   );

//   if (user) {
//     const accessToken = jwt.sign(
//       { username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
//     );

//     const refreshToken = jwt.sign(
//       { username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
//     );

//     refreshTokens.push(refreshToken);

//     res.json({ accessToken, refreshToken });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// });

// // Refresh access token using refresh token
// app.post('/refresh-token', (req, res) => {
//   const { token } = req.body;

//   if (!token || !refreshTokens.includes(token)) {
//     return res.status(403).json({ message: 'Refresh token not found' });
//   }

//   try {
//     const user = jwt.verify(token, process.env.JWT_SECRET);
//     const accessToken = jwt.sign(
//       { username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
//     );
//     res.json({ accessToken });
//   } catch (err) {
//     res.status(403).json({ message: 'Invalid refresh token' });
//   }
// });

// // Logout route - removes refresh token
// app.post('/logout', (req, res) => {
//   const { token } = req.body;

//   refreshTokens = refreshTokens.filter((t) => t !== token);

//   res.json({ message: 'Logged out successfully' });
// });

// // Protected route
// app.get('/protected', authenticateToken, (req, res) => {
//   res.json({ message: 'This is protected data.' });
// });

// // Middleware to validate access token
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

// // Start server
// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });


// const express = require('express');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Hardcoded user
// const users = [
//   {
//     username: 'puneeth',
//     password: 'pdx',
//   },
// ];

// let refreshTokens = [];
// let userCarts = {}; // { username: [cart items] }

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(
//     (u) => u.username === username && u.password === password
//   );

//   if (user) {
//     const accessToken = jwt.sign(
//       { username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
//     );

//     const refreshToken = jwt.sign(
//       { username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
//     );

//     refreshTokens.push(refreshToken);

//     res.json({ accessToken, refreshToken });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// });

// app.post('/refresh-token', (req, res) => {
//   const { token } = req.body;

//   if (!token || !refreshTokens.includes(token)) {
//     return res.status(403).json({ message: 'Refresh token not found' });
//   }

//   try {
//     const user = jwt.verify(token, process.env.JWT_SECRET);
//     const accessToken = jwt.sign(
//       { username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
//     );
//     res.json({ accessToken });
//   } catch (err) {
//     res.status(403).json({ message: 'Invalid refresh token' });
//   }
// });

// app.post('/logout', (req, res) => {
//   const { token } = req.body;
//   refreshTokens = refreshTokens.filter((t) => t !== token);
//   res.json({ message: 'Logged out successfully' });
// });

// // Middleware
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

// // Protected route
// app.get('/protected', authenticateToken, (req, res) => {
//   res.json({ message: 'This is protected data.' });
// });

// // --------------------
// // 🛒 Cart API Routes
// // --------------------

// // Add item to cart
// app.post('/cart', authenticateToken, (req, res) => {
//   const username = req.user.username;
//   const { id, name, quantity } = req.body;

//   if (!userCarts[username]) {
//     userCarts[username] = [];
//   }

//   userCarts[username].push({ id, name, quantity });
//   res.json({ message: 'Item added to cart', cart: userCarts[username] });
// });

// // Get user's cart
// app.get('/cart', authenticateToken, (req, res) => {
//   const username = req.user.username;
//   const cart = userCarts[username] || [];
//   res.json({ cart });
// });

// // Delete item from cart
// app.delete('/cart/:itemId', authenticateToken, (req, res) => {
//   const username = req.user.username;
//   const itemId = req.params.itemId;

//   if (!userCarts[username]) {
//     return res.status(404).json({ message: 'Cart not found' });
//   }

//   userCarts[username] = userCarts[username].filter(item => item.id !== itemId);
//   res.json({ message: 'Item removed', cart: userCarts[username] });
// });

// // --------------------

// // Start server
// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });

//latest commented

// const express = require('express');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const users = [
//   {
//     id: 1,
//     username: 'puneeth',
//     password: 'pdx',
//     cart: []
//   }
// ];

// let refreshTokens = [];

// app.post('/', (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(u => u.username === username && u.password === password);
//   if (user) {
//     const accessToken = jwt.sign(
//       { id: user.id, username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
//     );
//     const refreshToken = jwt.sign(
//       { id: user.id, username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
//     );
//     refreshTokens.push(refreshToken);
//     res.json({ accessToken, refreshToken });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// });

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

// // Add to cart
// app.post('/cart', authenticateToken, (req, res) => {
//   const { id, name, price, image, quantity } = req.body;
//   const user = users.find(u => u.id === req.user.id);

//   const existingItem = user.cart.find(item => item.id === id);
//   if (existingItem) {
//     existingItem.quantity += quantity;
//   } else {
//     user.cart.push({ id, name, price, image, quantity });
//   }

//   res.json({ cart: user.cart });
// });

// // Fetch cart
// app.get('/cart', authenticateToken, (req, res) => {
//   const user = users.find(u => u.id === req.user.id);
//   res.json({ cart: user.cart });
// });

// // Update cart item quantity
// app.put('/cart/:id', authenticateToken, (req, res) => {
//   const { id } = req.params;
//   const { quantity } = req.body;
//   const user = users.find(u => u.id === req.user.id);
//   const item = user.cart.find(item => item.id === parseInt(id));

//   if (!item) return res.status(404).json({ message: 'Item not found in cart' });

//   if (quantity <= 0) {
//     user.cart = user.cart.filter(item => item.id !== parseInt(id));
//   } else {
//     item.quantity = quantity;
//   }

//   res.json({ cart: user.cart });
// });

// // Remove item from cart
// app.delete('/cart/:id', authenticateToken, (req, res) => {
//   const { id } = req.params;
//   const user = users.find(u => u.id === req.user.id);
//   user.cart = user.cart.filter(item => item.id !== parseInt(id));
//   res.json({ cart: user.cart });
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });

// require('dotenv').config();
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const users = [];
// let refreshTokens = [];

// // Register Route
// app.post('/signup', async (req, res) => {
//   const { username, email, password } = req.body;

//   const userExists = users.find((u) => u.email === email);
//   if (userExists) {
//     return res.status(400).json({ message: 'User already exists' });
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = { id: users.length + 1, username, email, password: hashedPassword, cart: [] };
//     users.push(newUser);
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error registering user' });
//   }
// });

// // Login Route
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = users.find((u) => u.email === email);

//   if (!user) {
//     return res.status(401).json({ message: 'User not found' });
//   }

//   try {
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(403).json({ message: 'Invalid credentials' });

//     const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
//     const refreshToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
//     refreshTokens.push(refreshToken);

//     res.json({ accessToken, refreshToken });
//   } catch (err) {
//     res.status(500).json({ message: 'Error during login' });
//   }
// });

// // Refresh Token Route
// app.post('/refresh-token', (req, res) => {
//   const { token } = req.body;
//   if (!token || !refreshTokens.includes(token)) {
//     return res.status(403).json({ message: 'Refresh token not found' });
//   }

//   try {
//     const user = jwt.verify(token, process.env.JWT_SECRET);
//     const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
//     res.json({ accessToken });
//   } catch (err) {
//     res.status(403).json({ message: 'Invalid refresh token' });
//   }
// });

// // Logout Route
// app.post('/logout', (req, res) => {
//   const { token } = req.body;
//   refreshTokens = refreshTokens.filter(rt => rt !== token);
//   res.json({ message: 'Logged out successfully' });
// });

// // Authenticate Middleware
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

// // Add to Cart
// app.post('/cart', authenticateToken, (req, res) => {
//   const { id, name, price, image, quantity } = req.body;
//   const user = users.find(u => u.id === req.user.id);

//   if (!user) return res.status(404).json({ message: 'User not found' });

//   const existingItem = user.cart.find(item => item.id === id);
//   if (existingItem) {
//     existingItem.quantity += quantity;
//   } else {
//     user.cart.push({ id, name, price, image, quantity });
//   }

//   res.json({ cart: user.cart });
// });

// // Get Cart
// app.get('/cart', authenticateToken, (req, res) => {
//   const user = users.find(u => u.id === req.user.id);
//   if (!user) return res.status(404).json({ message: 'User not found' });

//   res.json({ cart: user.cart });
// });

// // Update Cart Item Quantity
// app.put('/cart/:id', authenticateToken, (req, res) => {
//   const { id } = req.params;
//   const { quantity } = req.body;
//   const user = users.find(u => u.id === req.user.id);

//   if (!user) return res.status(404).json({ message: 'User not found' });

//   const item = user.cart.find(item => item.id === parseInt(id));
//   if (!item) return res.status(404).json({ message: 'Item not found in cart' });

//   if (quantity <= 0) {
//     user.cart = user.cart.filter(item => item.id !== parseInt(id));
//   } else {
//     item.quantity = quantity;
//   }

//   res.json({ cart: user.cart });
// });

// // Remove from Cart
// app.delete('/cart/:id', authenticateToken, (req, res) => {
//   const { id } = req.params;
//   const user = users.find(u => u.id === req.user.id);

//   if (!user) return res.status(404).json({ message: 'User not found' });

//   user.cart = user.cart.filter(item => item.id !== parseInt(id));
//   res.json({ cart: user.cart });
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });

//new
// require('dotenv').config();
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const users = [];
// let refreshTokens = [];

// // ✅ Register Route
// app.post('/signup', async (req, res) => {
//   const { username, email, password } = req.body;

//   // Check if the user already exists
//   const userExists = users.find((u) => u.email === email);
//   if (userExists) {
//     return res.status(400).json({ message: 'User already exists' });
//   }

//   try {
//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = {
//       id: users.length + 1,
//       username,
//       email,
//       password: hashedPassword,
//       cart: [] // Initialize an empty cart for the user
//     };

//     users.push(newUser);
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error registering user' });
//   }
// });

// // ✅ Login Route
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = users.find((u) => u.email === email);

//   if (!user) {
//     return res.status(401).json({ message: 'User not found' });
//   }

//   try {
//     // Compare password
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(403).json({ message: 'Invalid credentials' });

//     // Generate JWT tokens
//     const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
//     const refreshToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

//     refreshTokens.push(refreshToken);

//     res.json({ accessToken, refreshToken });
//   } catch (err) {
//     res.status(500).json({ message: 'Error during login' });
//   }
// });

// // ✅ Refresh Token Route
// app.post('/refresh-token', (req, res) => {
//   const { token } = req.body;
//   if (!token || !refreshTokens.includes(token)) {
//     return res.status(403).json({ message: 'Refresh token not found' });
//   }

//   try {
//     const user = jwt.verify(token, process.env.JWT_SECRET);
//     const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
//     res.json({ accessToken });
//   } catch (err) {
//     res.status(403).json({ message: 'Invalid refresh token' });
//   }
// });

// // ✅ Logout Route
// app.post('/logout', (req, res) => {
//   const { token } = req.body;
//   refreshTokens = refreshTokens.filter(rt => rt !== token);
//   res.json({ message: 'Logged out successfully' });
// });

// // ✅ Authenticate Middleware
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

// // ✅ Add to Cart Route
// app.post('/cart', authenticateToken, (req, res) => {
//   const { id, name, price, image, quantity } = req.body;
//   const user = users.find(u => u.id === req.user.id);

//   if (!user) return res.status(404).json({ message: 'User not found' });

//   const existingItem = user.cart.find(item => item.id === id);
//   if (existingItem) {
//     existingItem.quantity += quantity;
//   } else {
//     user.cart.push({ id, name, price, image, quantity });
//   }

//   res.json({ cart: user.cart });
// });

// // ✅ Get Cart Route
// app.get('/cart', authenticateToken, (req, res) => {
//   const user = users.find(u => u.id === req.user.id);
//   if (!user) return res.status(404).json({ message: 'User not found' });

//   res.json({ cart: user.cart });
// });

// // ✅ Update Cart Item Quantity
// app.put('/cart/:id', authenticateToken, (req, res) => {
//   const { id } = req.params;
//   const { quantity } = req.body;
//   const user = users.find(u => u.id === req.user.id);

//   if (!user) return res.status(404).json({ message: 'User not found' });

//   const item = user.cart.find(item => item.id === parseInt(id));
//   if (!item) return res.status(404).json({ message: 'Item not found in cart' });

//   if (quantity <= 0) {
//     user.cart = user.cart.filter(item => item.id !== parseInt(id));
//   } else {
//     item.quantity = quantity;
//   }

//   res.json({ cart: user.cart });
// });

// // ✅ Remove Item from Cart Route
// app.delete('/cart/:id', authenticateToken, (req, res) => {
//   const { id } = req.params;
//   const user = users.find(u => u.id === req.user.id);

//   if (!user) return res.status(404).json({ message: 'User not found' });

//   user.cart = user.cart.filter(item => item.id !== parseInt(id));
//   res.json({ cart: user.cart });
// });

// // ✅ Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// require('dotenv').config();
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const users = [];
// let refreshTokens = [];

// // ✅ Register Route
// app.post('/signup', async (req, res) => {
//   const { username, email, password } = req.body;

//   // Check if the user already exists
//   const userExists = users.find((u) => u.email === email || u.username === username);
//   if (userExists) {
//     return res.status(400).json({ message: 'Username or Email already exists' });
//   }

//   try {
//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = {
//       id: users.length + 1,
//       username,
//       email,
//       password: hashedPassword,
//       cart: [] // Initialize an empty cart for the user
//     };

//     users.push(newUser);
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error registering user' });
//   }
// });

// // ✅ Login Route
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = users.find((u) => u.email === email);

//   if (!user) {
//     return res.status(401).json({ message: 'User not found' });
//   }

//   try {
//     // Compare password
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(403).json({ message: 'Invalid credentials' });

//     // Generate JWT tokens
//     const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
//     const refreshToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

//     refreshTokens.push(refreshToken);

//     res.json({ accessToken, refreshToken });
//   } catch (err) {
//     res.status(500).json({ message: 'Error during login' });
//   }
// });

// // ✅ Refresh Token Route
// app.post('/refresh-token', (req, res) => {
//   const { token } = req.body;
//   if (!token || !refreshTokens.includes(token)) {
//     return res.status(403).json({ message: 'Refresh token not found' });
//   }

//   try {
//     const user = jwt.verify(token, process.env.JWT_SECRET);
//     const accessToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
//     res.json({ accessToken });
//   } catch (err) {
//     res.status(403).json({ message: 'Invalid refresh token' });
//   }
// });

// // ✅ Logout Route
// app.post('/logout', (req, res) => {
//   const { token } = req.body;
//   refreshTokens = refreshTokens.filter(rt => rt !== token);
//   res.json({ message: 'Logged out successfully' });
// });

// // ✅ Authenticate Middleware
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

// // ✅ Add to Cart Route
// app.post('/cart', authenticateToken, (req, res) => {
//   const { id, name, price, image, quantity } = req.body;
//   const user = users.find(u => u.id === req.user.id);

//   if (!user) return res.status(404).json({ message: 'User not found' });

//   const existingItem = user.cart.find(item => item.id === id);
//   if (existingItem) {
//     existingItem.quantity += quantity;
//   } else {
//     user.cart.push({ id, name, price, image, quantity });
//   }

//   res.json({ cart: user.cart });
// });

// // ✅ Get Cart Route
// app.get('/cart', authenticateToken, (req, res) => {
//   const user = users.find(u => u.id === req.user.id);
//   if (!user) return res.status(404).json({ message: 'User not found' });

//   res.json({ cart: user.cart });
// });

// // ✅ Update Cart Item Quantity
// app.put('/cart/:id', authenticateToken, (req, res) => {
//   const { id } = req.params;
//   const { quantity } = req.body;
//   const user = users.find(u => u.id === req.user.id);

//   if (!user) return res.status(404).json({ message: 'User not found' });

//   const item = user.cart.find(item => item.id === parseInt(id));
//   if (!item) return res.status(404).json({ message: 'Item not found in cart' });

//   if (quantity <= 0) {
//     user.cart = user.cart.filter(item => item.id !== parseInt(id));
//   } else {
//     item.quantity = quantity;
//   }

//   res.json({ cart: user.cart });
// });

// // ✅ Remove Item from Cart Route
// app.delete('/cart/:id', authenticateToken, (req, res) => {
//   const { id } = req.params;
//   const user = users.find(u => u.id === req.user.id);

//   if (!user) return res.status(404).json({ message: 'User not found' });

//   user.cart = user.cart.filter(item => item.id !== parseInt(id));
//   res.json({ cart: user.cart });
// });

// // ✅ Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
let refreshTokens = [];

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

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


