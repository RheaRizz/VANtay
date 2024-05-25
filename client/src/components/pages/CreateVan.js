import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVan } from '../services/vanService'; 
import '../styles/CreateVan.css';

const CreateVan = () => {
  const [formData, setFormData] = useState({
    model: '',
    plate_no: '',
    capacity: '',
    userId: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'capacity' || name === 'userId' ? parseInt(value, 10) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVan(formData); 
      navigate('/admin/manage-van');
    } catch (error) {
      console.error('Failed to create van:', error);
    }
  };

  return (
    <div className="create-van-page">
      <div className="form-card">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Create Van</h2>
          <form className="create-van-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="model">Model:</label>
              <input type="text" id="model" name="model" required value={formData.model} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="plate_no">License Plate:</label>
              <input type="text" id="plate_no" name="plate_no" required value={formData.plate_no} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="capacity">Capacity:</label>
              <input type="number" id="capacity" name="capacity" required value={formData.capacity} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="userId">User ID:</label>
              <input type="number" id="userId" name="userId" required value={formData.userId} onChange={handleChange} />
            </div>
            <div className="form-buttons">
              <button type="submit" className="btn-submit">Create Van</button>
              <button type="button" className="btn-cancel" onClick={() => navigate('/admin/manage-van')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateVan;