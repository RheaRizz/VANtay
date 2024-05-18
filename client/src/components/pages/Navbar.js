import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/NavBar.css'; 

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <img src="logo.png" alt="Logo" className="navbar-logo" />
        <ul className="navbar-menu">
          <li><a href="#second-section">Cashier</a></li>
          <li><Link to="/admin">Admin</Link></li>
          <li>Logout</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
