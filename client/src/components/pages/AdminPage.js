import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
//import ManageVan from './ManageVan';
//import ManageTrip from './ManageTrip';
import ManageUser from './ManageUser';
import UpdateUser from './UpdateUser';
//import UpdateVan from './UpdateVan';
import NavbarAdmin from './NavbarAdmin';
//import CreateVan from './CreateVan';
//import CreateTrip from './CreateTrip';
import '../styles/AdminPage.css';
//import UpdateTrip from './UpdateTrip';

const AdminPage = () => {
  return (
    <div className="admin-page">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <nav>
          <ul>
            <li><Link to="manage-van">Manage Van</Link></li>
            <li><Link to="manage-trip">Manage Trip</Link></li>
            <li><Link to="manage-users">Manage Users</Link></li>
          </ul>
        </nav>
      </div>
      <div className="content">
        <NavbarAdmin />
        <Routes>
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="update-user/:userId" element={<UpdateUser />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;