import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getVans, deleteVan } from '../services/vanService';
import '../styles/ManageVan.css';

const ManageVan = () => {
  const [vans, setVans] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchVans = async () => {
      try {
        const vansData = await getVans();
        setVans(vansData);
      } catch (error) {
        console.error("Error fetching vans:", error);
      }
    };

    fetchVans();
  }, [location]);

  const handleDelete = async (id) => {
    try {
      await deleteVan(id);
      const updatedVans = vans.filter(van => van.id !== id);
      setVans(updatedVans);
    } catch (error) {
      console.error("Error deleting van:", error);
    }
  };

  return (
    <div className="manage-van-page">
      <div className="text-center">
        <h2 className="text-4xl font-bold">Manage Van</h2>
        <Link to="/admin/create-van">
          <button className="btn-create-van bg-gray-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-gray-600">
            Create Van
          </button>
        </Link>
        <h3>AVAILABLE VANS</h3>

        <div className="van-list mt-6">
          {vans.length > 0 ? (
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', padding: 0 }}>
              {vans.map((van) => (
                <li key={van.id} className="van-item" style={{ listStyle: 'none', flex: '0 1 300px', padding: '16px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', margin: '8px' }}>
                  <h3 className="text-2xl font-bold">{van.model}</h3>
                  <p>License Plate: {van.plate_no}</p>
                  <p>Capacity: {van.capacity}</p>
                  <p>User ID: {van.userId}</p>
                  <div>
                    <Link to={`/admin/update-van/${van.id}`}>
                      <button className="btn-update-van">
                        Update
                      </button>
                    </Link>
                    <button className="btn-delete-van" onClick={() => handleDelete(van.id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No vans available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageVan;

