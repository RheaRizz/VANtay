import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ManageVan from './ManageVan';
import ManageTrip from './ManageTrip';
import ManageUser from './ManageUser';
import UpdateUser from './UpdateUser';
import UpdateVan from './UpdateVan';
import NavbarAdmin from './NavbarAdmin';
import CreateVan from './CreateVan';
import CreateTrip from './CreateTrip';
import '../styles/AdminPage.css';
import UpdateTrip from './UpdateTrip';
import ManageTicket from './ManageTicket';
import UpdateTicket  from './UpdateTicket';

const AdminPage = () => {
  return (
    <div className="admin-page">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <nav>
          <ul>
            <li><Link to="manage-users">Manage Users</Link></li>
            <li><Link to="manage-van">Manage Vans</Link></li>
            <li><Link to="manage-trip">Manage Trips</Link></li>
            <li><Link to="manage-ticket">Manage Tickets</Link></li>
          </ul>
        </nav>
      </div>
      <div className="content">
        <NavbarAdmin />
        <Routes>
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="update-user/:userId" element={<UpdateUser />} />
          <Route path="manage-van" element={<ManageVan />} />
          <Route path="create-van" element={<CreateVan />} />
          <Route path="update-van/:id" element={<UpdateVan />} />
          <Route path="update-trip/:id" element={<UpdateTrip />} />
          <Route path="manage-trip" element={<ManageTrip />} />
          <Route path="create-trip" element={<CreateTrip />} />
          <Route path="update-ticket/:id" element={<UpdateTicket />} />
          <Route path="manage-ticket" element={<ManageTicket />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
