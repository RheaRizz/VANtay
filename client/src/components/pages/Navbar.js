import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../styles/NavBar.css'; 

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <img src="logo.png" alt="Logo" className="navbar-logo" />
        <ul className="navbar-menu">
          <li><a href="#second-section">Cashier</a></li>
          <li><Link to="/admin">Admin</Link></li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
