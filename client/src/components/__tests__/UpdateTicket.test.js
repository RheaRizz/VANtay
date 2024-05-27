import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UpdateTicket from '../pages/UpdateTicket';
//eslint-disable-next-line no-unused-vars
import { useNavigate } from 'react-router-dom';
import { getTicketById, updateTicket } from '../services/ticketService';

// Mock the useParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1', // Mock ticket id
  }),
  useNavigate: jest.fn(),
}));

// Mock the getTicketById and updateTicket services
jest.mock('../services/ticketService', () => ({
  getTicketById: jest.fn(),
  updateTicket: jest.fn(),
}));

describe('UpdateTicket', () => {
  beforeEach(() => {
    // Clear all mock calls before each test
    jest.clearAllMocks();
  });

  test('renders UpdateTicket component', async () => {
    // Mock the getTicketById response
    const mockTicket = {
      id: 1,
      passenger_name: 'John Doe',
      passenger_classification: 'Adult',
      passenger_address: '123 Street',
      passenger_phone_no: '1234567890',
      date: '2024-05-28T12:00',
      destination: 'New York',
      seat_no: '10',
      fare: '50.00',
      vanId: '1',
      userId: '123',
      tripId: '456',
    };
    getTicketById.mockResolvedValueOnce(mockTicket);

    render(
      <Router>
        <UpdateTicket />
      </Router>
    );

    // Wait for the ticket data to be loaded
    await waitFor(() => {
      expect(screen.getByLabelText(/Passenger Name/i)).toHaveValue('John Doe');
      // Check other fields similarly
    });
  });

  test('handles form submission', async () => {
    // Mock the getTicketById response
    const mockTicket = {
      id: 1,
      passenger_name: 'John Doe',
      passenger_classification: 'Adult',
      passenger_address: '123 Street',
      passenger_phone_no: '1234567890',
      date: '2024-05-28T12:00',
      destination: 'New York',
      seat_no: '10',
      fare: '50.00',
      vanId: 1, // Updated to integer
      userId: 123, // Updated to integer
      tripId: 456, // Updated to integer
    };
    getTicketById.mockResolvedValueOnce(mockTicket);
    
    render(
      <Router>
        <UpdateTicket />
      </Router>
    );
  
    // Mock the updateTicket response
    updateTicket.mockResolvedValueOnce({});
  
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Passenger Name/i), { target: { value: 'Updated Name' } });
    fireEvent.change(screen.getByLabelText(/Passenger Classification/i), { target: { value: 'Updated Classification' } });
    fireEvent.change(screen.getByLabelText(/Passenger Address/i), { target: { value: 'Updated Address' } });
    fireEvent.change(screen.getByLabelText(/Passenger Phone No/i), { target: { value: '1234567891' } });
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2024-05-29T19:00:00.000Z' } });
    fireEvent.change(screen.getByLabelText(/Destination/i), { target: { value: 'Updated Destination' } });
    fireEvent.change(screen.getByLabelText(/Seat No/i), { target: { value: '11' } });
    fireEvent.change(screen.getByLabelText(/Fare/i), { target: { value: '60.00' } });
    // Update other fields similarly
  
    // Click the submit button
    fireEvent.click(screen.getByRole('button', { name: /Save/i }));
  
    // Check if updateTicket was called with the correct data
    await waitFor(() => {
      expect(updateTicket).toHaveBeenCalledWith(1, {
        passenger_name: 'Updated Name',
        passenger_classification: 'Updated Classification',
        passenger_address: 'Updated Address',
        passenger_phone_no: '1234567891',
        date: '2024-05-29T19:00:00.000Z',
        destination: 'Updated Destination',
        seat_no: 11,
        fare: 60,
        vanId: 1, // Updated to integer
        userId: 123, // Updated to integer
        tripId: 456, // Updated to integer
      });
    });
  
    // Check if navigate was called
    expect(useNavigate).toHaveBeenCalledWith('/admin/manage-ticket');
  });
  
  
  

  test('handles form cancellation', () => {
    const navigate = jest.fn(); // Mock the navigate function
    useNavigate.mockReturnValue(navigate); // Mock useNavigate to return the navigate function

    render(
      <Router>
        <UpdateTicket />
      </Router>
    );

    // Click the cancel button
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    // Check if navigate was called with the correct path
    expect(navigate).toHaveBeenCalledWith('/admin/manage-ticket');
  });
});
