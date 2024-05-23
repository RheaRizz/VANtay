import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import HomePage from './components/pages/HomePage';
import AdminPage from './components/pages/AdminPage';
import ManageVan from './components/pages/ManageVan';
import VanForToday from './components/pages/VanForToday';
import CreateVan from './components/pages/CreateVan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cashier" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />}>
          <Route path="van-for-today" element={<VanForToday />} />
          <Route path="manage-van" element={<ManageVan />}>
            <Route path="create-van" element={<CreateVan />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
