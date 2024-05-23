import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import VanForToday from './VanForToday';
import ManageVan from './ManageVan';
import '../styles/AdminPage.css';
import NavbarAdmin from './NavbarAdmin';
import CreateVan from './CreateVan';



const AdminPage = () => {
  return (
    <div className="admin-page">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <nav>
          <ul>
            <li><Link to="van-for-today">Van for Today</Link></li>
            <li><Link to="manage-van">Manage Van</Link></li>
          </ul>
        </nav>
      </div>
      <div className="content">
        <NavbarAdmin /> {/* Centered NavBar */}
        <Routes>
          <Route path="van-for-today" element={<VanForToday />} />
          <Route path="manage-van" element={<ManageVan />} />
          <Route path="manage-van/create-van" element={<CreateVan />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
