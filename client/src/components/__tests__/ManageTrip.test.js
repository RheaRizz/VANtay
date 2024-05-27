import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ManageTrip from '../pages/ManageTrip';
import { fetchTrips, deleteTrip } from '../services/tripService';


jest.mock('../services/tripService', () => ({
  fetchTrips: jest.fn(),
  deleteTrip: jest.fn(),
}));

describe('ManageTrip', () => {
  beforeEach(() => {
    
    jest.clearAllMocks();
  });

  test('renders ManageTrip component', async () => {
    
    const mockTripData = [
      {
        id: 1,
        standby_time: '2024-05-27T12:00:00',
        departure_time: '2024-05-27T14:00:00',
        destination: 'Destination',
        driver_name: 'John Doe',
        vanId: 1,
      },
    ];

   
    fetchTrips.mockResolvedValueOnce(mockTripData);

    render(
      <Router>
        <ManageTrip />
      </Router>
    );

    
    await waitFor(() => {
      
      expect(screen.getByText('Trip ID: 1')).toBeInTheDocument();
    });

    
    expect(screen.getByText('Standby Time: 2024-05-27T12:00:00')).toBeInTheDocument();
    expect(screen.getByText('Departure Time: 2024-05-27T14:00:00')).toBeInTheDocument();
    expect(screen.getByText('Destination: Destination')).toBeInTheDocument();
    expect(screen.getByText('Driver Name: John Doe')).toBeInTheDocument();
    expect(screen.getByText('Van ID: 1')).toBeInTheDocument();
  });

  test('handles trip deletion', async () => {
    
    const mockTripData = [
      {
        id: 1,
        standby_time: '2024-05-27T12:00:00',
        departure_time: '2024-05-27T14:00:00',
        destination: 'Destination',
        driver_name: 'John Doe',
        vanId: 1,
      },
    ];

    
    fetchTrips.mockResolvedValueOnce(mockTripData);

    render(
      <Router>
        <ManageTrip />
      </Router>
    );

    
    await waitFor(() => {
      
      expect(screen.getByText('Trip ID: 1')).toBeInTheDocument();
    });

    
    deleteTrip.mockResolvedValueOnce({});

    
    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));

    
    await waitFor(() => {
      
      expect(deleteTrip).toHaveBeenCalledWith(1);
    });
  });
});
