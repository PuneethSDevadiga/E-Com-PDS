// Signup.jsx

import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
    </div>
  );
};

export default Signup;
