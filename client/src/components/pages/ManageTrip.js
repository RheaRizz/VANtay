
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import '../styles/ManageTrip.css';
import { fetchTrips, deleteTrip } from '../services/tripService';

const ManageTrip = () => {
  const [trips, setTrips] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const getTrips = async () => {
      try {
        const fetchedTrips = await fetchTrips();
        setTrips(fetchedTrips);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    getTrips();
  }, [location]);

  const fetchAndUpdateTrips = async () => {
    try {
      const fetchedTrips = await fetchTrips();
      setTrips(fetchedTrips);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  const handleDelete = async (tripId) => {
    try {
      await deleteTrip(tripId);
      await fetchAndUpdateTrips();
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  return (
    <div className="manage-trip-page">
      <div className="text-center">
        <h2 className="text-4xl font-bold">Manage Trip</h2>
        <Link to="/admin/create-trip">
          <button className="btn-create-trip">Create Trip</button>
        </Link>
        <div className="trips-container">
          <h3>AVAILABLE TRIPS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trips.map(trip => (
              <div key={trip.id} className="trip-item">
                <h4 className="font-bold text-lg">Trip ID: {trip.id}</h4>
                <p>Standby Time: {trip.standby_time}</p>
                <p>Departure Time: {trip.departure_time}</p>
                <p>Destination: {trip.destination}</p>
                <p>Driver Name: {trip.driver_name}</p>
                <p>Van ID: {trip.vanId}</p>
                <div>
                  <Link to={`/admin/update-trip/${trip.id}`}>
                    <button className="btn-update-trip">Update</button>
                  </Link>
                  <button onClick={() => handleDelete(trip.id)} className="btn-delete-trip">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ManageTrip;
