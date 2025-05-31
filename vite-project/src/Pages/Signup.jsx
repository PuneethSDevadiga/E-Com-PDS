// Signup.jsx

import  { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaShop } from "react-icons/fa6";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        username,
        email,
        password,
      });
      console.log('response:',response.data);
      setSuccess(true);
      navigate('/'); // Redirect to login page after successful signup
    } catch (err) {
      setError(err.response?.data?.message || 'Error registering user');
    }
  };

  return (
    <div className="container-signup">
      <div className="signup-card">
        <div className="logo-circle">
          <FaShop/>
        </div>
        <h2 className="signup-heading">Sign Up to PDS STORE</h2>
        <form onSubmit={handleSubmit}>
          <div className="align-center">
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
              required
            />
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              required
            />
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
            />
            <button type='submit'>Sign Up</button>
          </div>
        </form>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">User registered successfully! You can now log in.</p>}
        <div className="return-to-login-inline">
          <span>Already have an account?</span>
          <Link to="/">
            <button className="return-btn">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
