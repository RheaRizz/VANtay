import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/NavbarAdmin.css'; 

const NavbarAdmin = () => {
  return (
    <nav className="navbar-admin">
      <div className="navbar-content-admin">
        <img src="logo.png" alt="Logo" className="navbar-logo" />
        <ul className="navbar-menu-admin">
          <li><a href="/">Cashier</a></li>
          <li><Link to="/admin">Admin</Link></li>
          <li>Logout</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarAdmin;