import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import HomePage from './components/pages/HomePage';
import AdminPage from './components/pages/AdminPage';
import ManageUser from './components/pages/ManageUser';
import UpdateUser from './components/pages/UpdateUser';
import ManageVan from './components/pages/ManageVan';
import ManageTrip from './components/pages/ManageTrip';
import CreateTrip from './components/pages/CreateTrip';
import UpdateTrip from './components/pages/UpdateTrip';
import UpdateVan from './components/pages/UpdateVan';
import CreateVan from './components/pages/CreateVan';
import UpdateTicket from './components/pages/UpdateTicket';
import AddTicket from './components/pages/AddTicket';
import ManageTicket from './components/pages/ManageTicket';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/cashier" element={<HomePage />} />
        <Route path="/admin/*" element={<AdminPage />}>
          <Route path="manage-van" element={<ManageVan />} />
          <Route path="manage-trip" element={<ManageTrip />} />
          <Route path="add-ticket" element={<AddTicket />} />
          <Route path="create-van" element={<CreateVan />} />
          <Route path="manage-ticket" element={<ManageTicket />} />
          <Route path="create-trip" element={<CreateTrip />} />
          <Route path="update-van/:id" element={<UpdateVan />} />
          <Route path="update-trip/:id" element={<UpdateTrip />} />
          <Route path="update-ticket/:id" element={<UpdateTicket />} />
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="update-user/:userId" element={<UpdateUser />} />
        </Route>
        <Route path="/cashier/add-ticket/:id" element={<AddTicket />} />
      </Routes>
    </Router>
  );
}

export default App;
