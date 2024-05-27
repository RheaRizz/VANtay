import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTicketById, updateTicket } from "../services/ticketService";
import "../styles/UpdateTicket.css";

const UpdateTicket = () => {
  const [ticketData, setTicketData] = useState({
    passenger_name: "",
    passenger_classification: "",
    passenger_address: "",
    passenger_phone_no: "",
    date: "",
    destination: "",
    seat_no: "",
    fare: "",
    vanId: "",
    userId: "",
    tripId: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const ticket = await getTicketById(id);
        setTicketData({
          passenger_name: ticket.passenger_name,
          passenger_classification: ticket.passenger_classification,
          passenger_address: ticket.passenger_address,
          passenger_phone_no: ticket.passenger_phone_no,
          date: new Date(ticket.date).toISOString().slice(0, 16),
          destination: ticket.destination,
          seat_no: ticket.seat_no,
          fare: ticket.fare,
          vanId: ticket.vanId,
          userId: ticket.userId,
          tripId: ticket.tripId,
        });
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };

    fetchTicket();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData({ ...ticketData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTicketData = {
        ...ticketData,
        seat_no: parseInt(ticketData.seat_no, 10),
        fare: parseFloat(ticketData.fare),
        date: new Date(ticketData.date).toISOString(),
      };
      await updateTicket(id, updatedTicketData);
      navigate("/admin/manage-ticket");
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  const handleCancel = () => {
    navigate("/admin/manage-ticket");
  };

  return (
    <div className="update-ticket-page">
      <div className="form-card-update">
        <h2 className="text-center-update">Update Ticket</h2>
        <form onSubmit={handleSubmit} className="update-ticket-form">
          <label>
            Passenger Name:
            <input
              type="text"
              name="passenger_name"
              value={ticketData.passenger_name}
              onChange={handleChange}
            />
          </label>
          <label>
            Passenger Classification:
            <input
              type="text"
              name="passenger_classification"
              value={ticketData.passenger_classification}
              onChange={handleChange}
            />
          </label>
          <label>
            Passenger Address:
            <input
              type="text"
              name="passenger_address"
              value={ticketData.passenger_address}
              onChange={handleChange}
            />
          </label>
          <label>
            Passenger Phone No:
            <input
              type="text"
              name="passenger_phone_no"
              value={ticketData.passenger_phone_no}
              onChange={handleChange}
            />
          </label>
          <label>
            Date:
            <input
              type="datetime-local"
              name="date"
              value={ticketData.date}
              onChange={handleChange}
            />
          </label>
          <label>
            Destination:
            <input
              type="text"
              name="destination"
              value={ticketData.destination}
              onChange={handleChange}
            />
          </label>
          <label>
            Seat No:
            <input
              type="number"
              name="seat_no"
              value={ticketData.seat_no}
              onChange={handleChange}
            />
          </label>
          <label>
            Fare:
            <input
              type="number"
              name="fare"
              value={ticketData.fare}
              onChange={handleChange}
            />
          </label>
          <div className="form-buttons-update">
            <button type="submit" className="btn-submit-update">
              Save
            </button>
            <button type="button" onClick={handleCancel} className="btn-cancel-update">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTicket;
