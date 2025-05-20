import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";
import { FaShop } from "react-icons/fa6";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      console.log("Login Response:", response.data);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      window.location.href = "/home";
    } catch (err) {
      console.error("Login Error:", err.response?.data?.message || "Login failed");
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container-login">
      <div className="logo-circle">
          <FaShop/>
      </div>
        <h2 style={{color:'#ff6f4f', fontFamily:'sans-serif'}}>Login to PDS STORE </h2>
      <form onSubmit={handleSubmit}>
        <div className="align-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </div>
      </form>
      <div className="signup">
        <p> Do not have account ? please signup</p>
        <Link to="/signup">
        <button>Sign Up</button>
      </Link>
      </div>
      
    </div>
  );
};

export default Login;

