/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomePage from '../pages/HomePage';
import * as ticketService from '../services/ticketService';


jest.mock('../services/ticketService', () => ({
  getTrips: jest.fn(),
}));

describe('HomePage', () => {
  beforeEach(() => {
   
    ticketService.getTrips.mockReset();
  });

  test('renders trip cards when trips are fetched', async () => {
    
    const mockTrips = [
      {
        id: 1,
        destination: 'New York',
        standby_time: '2024-05-30T12:00:00.000Z',
        departure_time: '2024-05-30T14:00:00.000Z',
        driver_name: 'John Doe',
      },
      {
        id: 2,
        destination: 'Los Angeles',
        standby_time: '2024-06-01T12:00:00.000Z',
        departure_time: '2024-06-01T14:00:00.000Z',
        driver_name: 'Jane Smith',
      },
    ];

    
    ticketService.getTrips.mockResolvedValue(mockTrips);

    
    render(<HomePage />);

    
    await waitFor(() => {
      expect(screen.getByText('Trip to New York')).toBeInTheDocument();
      expect(screen.getByText('Trip to Los Angeles')).toBeInTheDocument();
    });
  });

  test('displays error message when trips fetching fails', async () => {
    
    const errorMessage = 'Failed to fetch trips';

    
    ticketService.getTrips.mockRejectedValue(new Error(errorMessage));

    
    render(<HomePage />);

    
    await waitFor(() => {
      
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
