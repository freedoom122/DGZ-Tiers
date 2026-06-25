import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../api/api';
import './Auth.css';

const Signup = ({ setIsAuthenticated, setIsAdmin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signup(username, email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('isAdmin', data.user.isAdmin);
      setIsAuthenticated(true);
      setIsAdmin(data.user.isAdmin);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">⛏️ SIGN UP ⛏️</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>USERNAME:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>EMAIL:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>PASSWORD:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">❌ {error}</p>}
          <button type="submit" className="button-minecraft">SIGN UP</button>
        </form>
        <p className="auth-link">
          ALREADY HAVE ACCOUNT? <Link to="/login">LOGIN</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
