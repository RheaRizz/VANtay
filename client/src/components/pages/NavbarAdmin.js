import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../styles/NavbarAdmin.css'; 

const NavbarAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className="navbar-admin">
      <div className="navbar-content-admin">
        <img src="logo.png" alt="Logo" className="navbar-logo" />
        <ul className="navbar-menu-admin">
          <li><a href="/cashier">Cashier</a></li>
          <li><Link to="/admin">Admin</Link></li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
