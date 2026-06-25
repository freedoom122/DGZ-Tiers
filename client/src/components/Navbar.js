import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';

const Navbar = ({ isAdmin }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🎮 DGZ-TIERS
        </Link>
        <div className="navbar-menu">
          <span className="navbar-user">👤 {username}</span>
          {isAdmin && (
            <Link to="/admin" className="navbar-link admin-link">
              <FaTachometerAlt /> ADMIN
            </Link>
          )}
          <button onClick={handleLogout} className="navbar-logout">
            <FaSignOutAlt /> LOGOUT
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
