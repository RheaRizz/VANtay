import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const createVan = async (vanData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/van`, vanData);
    return response.data;
  } catch (error) {
    console.error("Error creating van:", error);
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

export const updateVan = async (id, vanData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/van/${id}`, vanData);
    return response.data;
  } catch (error) {
    console.error("Error updating van:", error);
    throw error.response.data;
  }
};

export const deleteVan = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/van/${id}`);
  } catch (error) {
    console.error("Error deleting van:", error);
    throw error.response.data;
  }
};


export const getVanById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/van/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching van by id:", error);
    throw error.response.data;
  }
};
