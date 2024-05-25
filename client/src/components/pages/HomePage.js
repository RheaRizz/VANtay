import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTrips } from "../services/ticketService";
import NavBar from "./Navbar";
import "../styles/HomePage.css";

const HomePage = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const tripData = await getTrips();
        setTrips(tripData);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div>
      <div className="homepage-bg flex justify-center items-center">
        <div className="text-center1">
          <h1 className="text-white text-4xl font-bold mb-4">
            VANTAY.COME TO ANTIQUE
          </h1>
          <NavBar />
        </div>
      </div>

      <div
        id="second-section"
        className="second-section flex flex-wrap justify-center"
      >
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="card"
          >
            <h3 className="text-lg font-bold">Trip to {trip.destination}</h3>
            <p>Standby Time: {new Date(trip.standby_time).toLocaleString()}</p>
            <p>
              Departure Time: {new Date(trip.departure_time).toLocaleString()}
            </p>
            <p>Driver: {trip.driver_name}</p>
            <Link
              to={`/cashier/add-ticket/${trip.id}`}
              className="btn-manage-ticket"
            >
              Manage Ticket
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
