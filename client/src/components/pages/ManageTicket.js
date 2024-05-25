import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTickets, deleteTicket } from "../services/ticketService";
import "../styles/ManageTicket.css";

const ManageTicket = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const ticketData = await getTickets();
        setTickets(ticketData);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTicket(id);
      setTickets(tickets.filter((ticket) => ticket.id !== id));
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  return (
    <div className="manage-ticket-page container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Tickets</h2>
      <div className="ticket-list flex flex-wrap">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="ticket-item">
            <h3 className="text-lg font-semibold">
              Passenger: {ticket.passenger_name}
            </h3>
            <p>Classification: {ticket.passenger_classification}</p>
            <p>Address: {ticket.passenger_address}</p>
            <p>Phone No: {ticket.passenger_phone_no}</p>
            <p>Date: {new Date(ticket.date).toLocaleString()}</p>
            <p>Destination: {ticket.destination}</p>
            <p>Seat No: {ticket.seat_no}</p>
            <p>Fare: ${ticket.fare.toFixed(2)}</p>
            <div className="flex justify-between mt-4">
              <Link to={`/admin/update-ticket/${ticket.id}`}>
                <button
                  className="btn-update-ticket bg-blue-500 text-white 
                py-2 px-4 rounded-lg mt-2 hover:bg-blue-600"
                >
                  Update
                </button>
              </Link>
              <button
                onClick={() => handleDelete(ticket.id)}
                className="btn-delete-ticket bg-red-500 text-white py-2 
                px-4 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageTicket;
