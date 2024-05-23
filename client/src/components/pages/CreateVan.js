import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateVan.css';

const CreateVan = () => {
  const [formData, setFormData] = useState({
    standby_time: '',
    departure_time: '',
    destination: '',
    driver_name: '',
    vanName: '',
    licensePlate: '',
    capacity: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/create-van', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/admin/manage-van');
      } else {
        console.error('Failed to create van');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="create-van-page">
      <div className="form-card">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Create Van</h2>
          <form className="create-van-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="vanName">Van Name:</label>
              <input type="text" id="vanName" name="vanName" required value={formData.vanName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="licensePlate">License Plate:</label>
              <input type="text" id="licensePlate" name="licensePlate" required value={formData.licensePlate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="driverName">Driver Name:</label>
              <input type="text" id="driverName" name="driverName" required value={formData.driverName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="capacity">Capacity:</label>
              <input type="number" id="capacity" name="capacity" required value={formData.capacity} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="standby_time">Standby Time:</label>
              <input type="datetime-local" id="standby_time" name="standby_time" required value={formData.standby_time} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="departure_time">Departure Time:</label>
              <input type="datetime-local" id="departure_time" name="departure_time" required value={formData.departure_time} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="destination">Destination:</label>
              <input type="text" id="destination" name="destination" required value={formData.destination} onChange={handleChange} />
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
