
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import { login } from '../services/apiService';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      console.log("Login successful:", response);
      localStorage.setItem('token', response.token);
      navigate('/cashier'); // Use navigate to redirect
    } catch (error) {
      setError(error.error || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Log in to your account</h2>
        <form className="login-form" onSubmit={handleLogin}>
          {error && <div className="error-message">{error}</div>}
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">LOGIN</button>
        </form>
        <p className="signup-text">Don't have an account? <Link to="/signup" className="signup-link">SIGN UP</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
