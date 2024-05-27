
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AddTicket from '../pages/AddTicket';

jest.mock('../services/ticketService', () => ({
  createTicket: jest.fn().mockResolvedValue({}),
  getVans: jest.fn().mockResolvedValue([{ id: 1 }]),
  getUsers: jest.fn().mockResolvedValue([{ id: 1 }]),
  getTripById: jest.fn().mockResolvedValue({ id: 1 }),
}));

describe('AddTicket component', () => {
  test('renders without crashing', () => {
    render(
      <Router>
        <AddTicket />
      </Router>
    );
    expect(screen.getByText(/Create New Ticket/i)).toBeInTheDocument();
  });

  test('renders form inputs', () => {
    render(
      <Router>
        <AddTicket />
      </Router>
    );
  
    expect(screen.getByLabelText('Passenger Name:', { exact: false })).toBeInTheDocument();
    expect(screen.getByLabelText('Passenger Classification:', { exact: false })).toBeInTheDocument();
    expect(screen.getByLabelText('Passenger Address:', { exact: false })).toBeInTheDocument();
    expect(screen.getByLabelText('Passenger Phone No:', { exact: false })).toBeInTheDocument();
    expect(screen.getByLabelText('Date:', { exact: false })).toBeInTheDocument();
    expect(screen.getByLabelText('Destination:', { exact: false })).toBeInTheDocument();
    expect(screen.getByLabelText('Seat No:', { exact: false })).toBeInTheDocument();
    expect(screen.getByLabelText('Fare:', { exact: false })).toBeInTheDocument();
  });
  

  test('calls createTicket function on form submission', async () => {
    render(
      <Router>
        <AddTicket />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Passenger Name:'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Passenger Classification:'), { target: { value: 'Adult' } });
    fireEvent.change(screen.getByLabelText('Passenger Address:'), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText('Passenger Phone No:'), { target: { value: '555-123-4567' } });
    fireEvent.change(screen.getByLabelText('Date:'), { target: { value: '2024-05-31T12:00' } });
    fireEvent.change(screen.getByLabelText('Destination:'), { target: { value: 'Destination' } });
    fireEvent.change(screen.getByLabelText('Seat No:'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Fare:'), { target: { value: '10.00' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Create Ticket' }));

    expect(await screen.findByText(/Create New Ticket/i)).toBeInTheDocument();
    expect(await screen.findByText(/Manage Ticket/i)).toBeInTheDocument();
  });
});
