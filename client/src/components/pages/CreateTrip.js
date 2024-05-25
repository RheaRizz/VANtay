
import React, { useEffect, useState } from 'react';
import '../styles/CreateTrip.css';
import { fetchVans, createTrip } from '../services/tripService';
import { useNavigate } from 'react-router-dom';

const CreateTrip = () => {
  const [standbyTime, setStandbyTime] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [destination, setDestination] = useState('');
  const [driverName, setDriverName] = useState('');
  const [vans, setVans] = useState([]);
  const [selectedVan, setSelectedVan] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getVans = async () => {
      try {
        const fetchedVans = await fetchVans();
        setVans(fetchedVans);
      } catch (error) {
        console.error('Error fetching vans:', error);
        setError('Failed to fetch vans. Please try again.');
      }
    };

    getVans();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedVan) {
      setError('Please select a van.');
      return;
    }
    const tripData = {
      standby_time: standbyTime,
      departure_time: departureTime,
      destination,
      driver_name: driverName,
      vanId: parseInt(selectedVan, 10),
    };

    try {
      await createTrip(tripData);
      navigate('/admin/manage-trip');
    } catch (error) {
      console.error('Error creating trip:', error);
      setError('Failed to create trip. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/admin/manage-trip');
  };

  return (
    <div className="create-trip-container">
      <h2>Create New Trip</h2>
      <form className="create-trip-form" onSubmit={handleSubmit}>
        <label>
          Standby Time:
          <input
            type="datetime-local"
            value={standbyTime}
            onChange={(e) => setStandbyTime(e.target.value)}
          />
        </label>
        <label>
          Departure Time:
          <input
            type="datetime-local"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
          />
        </label>
        <label>
          Destination:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </label>
        <label>
          Driver Name:
          <input
            type="text"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
          />
        </label>
        <label>
          Van:
          <select 
            value={selectedVan} 
            onChange={(e) => setSelectedVan(e.target.value)}
            className="van-select"
          >
            <option value="">Select a van</option>
            {vans.length > 0 ? (
              vans.map((van) => (
                <option key={van.id} value={van.id}>
                  {van.model} 
                </option>
              ))
            ) : (
              <option disabled>Loading vans...</option>
            )}
          </select>
        </label>
        {error && <p className="error">{error}</p>}
        <div className="button-group">
          <button type="submit">Create Trip</button>
          <button type="cancel-button" onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTrip;