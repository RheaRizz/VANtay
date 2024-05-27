import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const createTrip = async (tripData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/trip`, tripData);
    return response.data;
  } catch (error) {
    console.error("Create trip error:", error);
    throw error.response.data;
  }
};

export const fetchVans = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/van`);
    return response.data;
  } catch (error) {
    console.error("Fetch vans error:", error);
    throw error.response.data;
  }
};

export const fetchTrips = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/trip`);
    return response.data;
  } catch (error) {
    console.error("Fetch trips error:", error);
    throw error.response.data;
  }
};


export const deleteTrip = async (tripId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/trip/${tripId}`);
    return response.data; 
  } catch (error) {
    console.error("Delete trip error:", error);
    throw error.response.data;
  }
};

export const updateTrip = async (tripId, updatedTripData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/trip/${tripId}`, updatedTripData);
    return response.data;
  } catch (error) {
    console.error("Update trip error:", error);
    throw error.response.data;
  }
};

// Function to fetch trip by ID
export const fetchTripById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/trip/${id}`);
    return response.data;
  } catch (error) {
    console.error("Fetch trip by id error:", error);
    throw error.response.data;
  }
};


