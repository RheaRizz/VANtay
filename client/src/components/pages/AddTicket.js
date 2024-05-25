import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTicket,
  getVans,
  getUsers,
  getTripById,
} from "../services/ticketService";
import "../styles/AddTicket.css";

const AddTicket = () => {
  const [passengerName, setPassengerName] = useState("");
  const [passengerClassification, setPassengerClassification] = useState("");
  const [passengerAddress, setPassengerAddress] = useState("");
  const [passengerPhoneNo, setPassengerPhoneNo] = useState("");
  const [date, setDate] = useState("");
  const [destination, setDestination] = useState("");
  const [seatNo, setSeatNo] = useState("");
  const [fare, setFare] = useState("");
  const [vanId, setVanId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tripId, setTripId] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const vans = await getVans();
        setVanId(vans[0].id);

        const users = await getUsers();
        setUserId(users[0].id);

        const trip = await getTripById(id);
        setTripId(trip.id);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!date) {
      console.error("Invalid date value");
      return;
    }

    let formattedDate;
    try {
      formattedDate = new Date(date).toISOString();
    } catch (error) {
      console.error("Error formatting date:", error);
      return;
    }

    const ticketData = {
      passenger_name: passengerName,
      passenger_classification: passengerClassification,
      passenger_address: passengerAddress,
      passenger_phone_no: passengerPhoneNo,
      date: formattedDate,
      destination,
      seat_no: parseInt(seatNo, 10),
      fare: parseFloat(fare),
      vanId,
      userId,
      tripId,
    };

    try {
      await createTicket(ticketData);
      navigate("/cashier");
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  const handleCancel = () => {
    navigate("/cashier");
  };

  return (
    <div className="create-ticket-page">
      <div className="form-card">
        <h2 className="text-center">Create New Ticket</h2>
        <form onSubmit={handleSubmit} className="create-ticket-form">
          <div className="form-group">
            <label>Passenger Name:</label>
            <input
              type="text"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Passenger Classification:</label>
            <input
              type="text"
              value={passengerClassification}
              onChange={(e) => setPassengerClassification(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Passenger Address:</label>
            <input
              type="text"
              value={passengerAddress}
              onChange={(e) => setPassengerAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Passenger Phone No:</label>
            <input
              type="text"
              value={passengerPhoneNo}
              onChange={(e) => setPassengerPhoneNo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Destination:</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Seat No:</label>
            <input
              type="number"
              value={seatNo}
              onChange={(e) => setSeatNo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Fare:</label>
            <input
              type="number"
              value={fare}
              onChange={(e) => setFare(e.target.value)}
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn-submit">
              Create Ticket
            </button>
            <button type="button" onClick={handleCancel} className="btn-cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTicket;
