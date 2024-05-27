import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ManageTicket from '../pages/ManageTicket';
import { getTickets, deleteTicket } from '../services/ticketService';


jest.mock('../services/ticketService', () => ({
  getTickets: jest.fn(),
  deleteTicket: jest.fn(),
}));

describe('ManageTicket', () => {
  beforeEach(() => {
    
    jest.clearAllMocks();
  });

  test('renders ManageTicket component', async () => {
    
    const mockTicketData = [
      {
        id: 1,
        passenger_name: 'John Doe',
        passenger_classification: 'Economy',
        passenger_address: '123 Main St',
        passenger_phone_no: '555-1234',
        date: new Date(),
        destination: 'Destination',
        seat_no: 1,
        fare: 100,
      },
    ];

    
    getTickets.mockResolvedValueOnce(mockTicketData);

    render(
      <Router>
        <ManageTicket />
      </Router>
    );

    
    await waitFor(() => {
     
      expect(screen.getByText('Passenger: John Doe')).toBeInTheDocument();
    });

    
    expect(screen.getByText('Classification: Economy')).toBeInTheDocument();
    expect(screen.getByText('Address: 123 Main St')).toBeInTheDocument();
    expect(screen.getByText('Phone No: 555-1234')).toBeInTheDocument();
    expect(screen.getByText('Destination: Destination')).toBeInTheDocument();
    expect(screen.getByText('Seat No: 1')).toBeInTheDocument();
    expect(screen.getByText('Fare: $100.00')).toBeInTheDocument();
  });

  test('handles ticket deletion', async () => {
    
    const mockTicketData = [
      {
        id: 1,
        passenger_name: 'John Doe',
        passenger_classification: 'Economy',
        passenger_address: '123 Main St',
        passenger_phone_no: '555-1234',
        date: new Date(),
        destination: 'Destination',
        seat_no: 1,
        fare: 100,
      },
    ];

    
    getTickets.mockResolvedValueOnce(mockTicketData);

    render(
      <Router>
        <ManageTicket />
      </Router>
    );

    
    await waitFor(() => {
      
      expect(screen.getByText('Passenger: John Doe')).toBeInTheDocument();
    });

    
    deleteTicket.mockResolvedValueOnce({});

    
    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));

    
    await waitFor(() => {
      
      expect(deleteTicket).toHaveBeenCalledWith(1);
    });
  });
});
