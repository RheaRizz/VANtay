import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export const createTicket = async (ticketData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ticket`, ticketData);
    return response.data;
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error.response.data;
  }
};

export const getTrips = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/trip`);
    return response.data;
  } catch (error) {
    console.error("Error fetching trips:", error);
    throw error.response.data;
  }
};

export const getVans = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/van`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vans:", error);
    throw error.response.data;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error.response.data;
  }
};

export const getTripById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/trip/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching trip with ID ${id}:`, error);
    throw error.response.data;
  }
};

export const getTickets = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ticket`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error.response.data;
  }
};

export const getTicketById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ticket/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ticket with ID ${id}:`, error);
    throw error.response.data;
  }
};

export const updateTicket = async (id, ticketData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/ticket/${id}`,
      ticketData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating ticket with ID ${id}:`, error);
    throw error.response.data;
  }
};

export const deleteTicket = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/ticket/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting ticket with ID ${id}:`, error);
    throw error.response.data;
  }
};
