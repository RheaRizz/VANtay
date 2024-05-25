import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTripById, updateTrip, fetchVans } from '../services/tripService';
import '../styles/UpdateTrip.css';

const UpdateTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState({
    standby_time: '',
    departure_time: '',
    destination: '',
    driver_name: '',
    vanId: '',
  });

  const [vans, setVans] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripData = await fetchTripById(id);
        setTrip({
          ...tripData,
          standby_time: tripData.standby_time ? tripData.standby_time.slice(0, -1) : '',
          departure_time: tripData.departure_time ? tripData.departure_time.slice(0, -1) : ''
        });
      } catch (error) {
        console.error('Error fetching trip:', error);
        setError('Failed to fetch trip. Please try again.');
      }
    };

    const getVans = async () => {
      try {
        const fetchedVans = await fetchVans();
        setVans(fetchedVans);
      } catch (error) {
        console.error('Error fetching vans:', error);
        setError('Failed to fetch vans. Please try again.');
      }
    };

    fetchData();
    getVans();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip({
      ...trip,
      [name]: name === 'vanId' ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTrip(id, trip);
      navigate('/admin/manage-trip');
    } catch (error) {
      console.error('Error updating trip:', error);
      setError('Failed to update trip. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/admin/manage-trip');
  };

  return (
    <div className="update-trip-page">
      <h2 className="text-2xl mb-4 font-bold text-center">Update Trip</h2>
      <form className="update-trip-form" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Standby Time:
            <input
              type="datetime-local"
              name="standby_time"
              value={trip.standby_time}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Departure Time:
            <input
              type="datetime-local"
              name="departure_time"
              value={trip.departure_time}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Destination:
            <input
              type="text"
              name="destination"
              value={trip.destination}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Driver Name:
            <input
              type="text"
              name="driver_name"
              value={trip.driver_name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Van:
            <select 
              name="vanId"
              value={trip.vanId}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        </div>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Update Trip
          </button>
          <button type="button" onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTrip;
