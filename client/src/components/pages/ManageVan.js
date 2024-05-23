import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/AdminPage.css';

const ManageVan = () => {
  return (
    <div className="manage-van-page">
      <div className="text-center">
        <h2 className="text-4xl font-bold">Manage Van</h2>
        <Link to="create-van">
          <button className="btn-create-van bg-gray-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-gray-600">Create Van</button>
        </Link>
        <p>Manage van details and schedules here.</p>
        <Outlet /> {/* This will render nested routes like CreateVan */}
      </div>
    </div>
  );
};

export default ManageVan;
