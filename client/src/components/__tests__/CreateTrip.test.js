import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateTrip from '../pages/CreateTrip';
import { fetchVans, createTrip } from '../services/tripService';


jest.mock('../services/tripService', () => ({
  fetchVans: jest.fn(),
  createTrip: jest.fn(),
}));


const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('CreateTrip', () => {
  beforeEach(() => {
    
    jest.clearAllMocks();
  });

  test('renders CreateTrip component', async () => {
    
    fetchVans.mockResolvedValueOnce([{ id: 1, model: 'Van 1' }]);

    render(
      <Router>
        <CreateTrip />
      </Router>
    );

    
    await waitFor(() => {
      expect(screen.getByText('Van 1')).toBeInTheDocument();
    });

    
    expect(screen.getByLabelText(/Standby Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Departure Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Destination/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Driver Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Van/i)).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    
    fetchVans.mockResolvedValueOnce([{ id: 1, model: 'Van 1' }]);
  
    render(
      <Router>
        <CreateTrip />
      </Router>
    );
  
    
    await waitFor(() => {
      expect(screen.getByText('Van 1')).toBeInTheDocument();
    });
  
    
    fireEvent.change(screen.getByLabelText(/Standby Time/i), { target: { value: '2024-05-28T12:00' } });
    fireEvent.change(screen.getByLabelText(/Departure Time/i), { target: { value: '2024-05-28T13:00' } });
    fireEvent.change(screen.getByLabelText(/Destination/i), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText(/Driver Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Van/i), { target: { value: '1' } }); // Pass as string
  
    
    createTrip.mockResolvedValueOnce({});
  
   
    fireEvent.click(screen.getByRole('button', { name: /Create Trip/i }));
  
    
    await waitFor(() => {
      expect(createTrip).toHaveBeenCalledWith({
        standby_time: '2024-05-28T12:00',
        departure_time: '2024-05-28T13:00',
        destination: 'New York',
        driver_name: 'John Doe',
        vanId: 1, 
      });
    });
  
    
    expect(mockNavigate).toHaveBeenCalledWith('/admin/manage-trip');
  });
  
  
  

  test('handles form cancellation', () => {
    render(
      <Router>
        <CreateTrip />
      </Router>
    );

    
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    
    expect(mockNavigate).toHaveBeenCalledWith('/admin/manage-trip');
  });
});
