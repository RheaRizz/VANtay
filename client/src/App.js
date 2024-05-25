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


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/cashier" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />}>
    
          <Route path="manage-van" element={<ManageVan />} />
          <Route path="manage-trip" element={<ManageTrip />}>

            
          </Route>
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="update-user/:userId" element={<UpdateUser />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;