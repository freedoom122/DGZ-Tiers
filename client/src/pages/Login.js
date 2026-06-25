import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/api';
import './Auth.css';

const Login = ({ setIsAuthenticated, setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('isAdmin', data.user.isAdmin);
      setIsAuthenticated(true);
      setIsAdmin(data.user.isAdmin);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">⚔️ LOGIN ⚔️</h1>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="button-minecraft">LOGIN</button>
        </form>
        <p className="auth-link">
          NO ACCOUNT? <Link to="/signup">SIGN UP</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
