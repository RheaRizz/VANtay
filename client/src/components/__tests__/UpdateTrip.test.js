import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UpdateTrip from '../pages/UpdateTrip';
import * as tripService from '../services/tripService';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }), 
  useNavigate: () => jest.fn(),
}));


jest.mock('../services/tripService', () => ({
  fetchTripById: jest.fn(() =>
    Promise.resolve({
      standby_time: '2024-05-28T12:00',
      departure_time: '2024-05-28T13:00',
      destination: 'Test Destination',
      driver_name: 'Test Driver',
      vanId: '1',
    })
  ),
  updateTrip: jest.fn(() => Promise.resolve()),
  fetchVans: jest.fn(() =>
    Promise.resolve([
      { id: '1', model: 'Test Van 1' },
      { id: '2', model: 'Test Van 2' },
    ])
  ),
}));

describe('UpdateTrip Component', () => {
    beforeEach(() => {
      jest.clearAllMocks(); 
    });
  
    it('renders without crashing', async () => {
      tripService.fetchVans.mockResolvedValue([
        { id: '1', model: 'Test Van 1' },
        { id: '2', model: 'Test Van 2' },
      ]);
  
      render(
        <BrowserRouter>
          <UpdateTrip />
        </BrowserRouter>
      );
  
      
      expect(screen.getByLabelText('Standby Time:')).toBeInTheDocument();
  
      await waitFor(() => {
        expect(tripService.fetchTripById).toHaveBeenCalled();
      });
  
      await waitFor(() => {
        expect(tripService.fetchVans).toHaveBeenCalled();
      });
    });
  
    it('updates trip on form submission', async () => {
      const updatedTripData = {
        standby_time: '2024-05-28T12:00',
        departure_time: '2024-05-28T13:00',
        destination: 'Updated Destination',
        driver_name: 'Test Driver',
        vanId: '1',
      };
  
      tripService.updateTrip.mockResolvedValueOnce(updatedTripData); 
  
      render(
        <BrowserRouter>
          <UpdateTrip />
        </BrowserRouter>
      );
  
      fireEvent.change(screen.getByLabelText('Destination:'), {
        target: { value: 'Updated Destination' },
      });
  
      fireEvent.submit(screen.getByRole('button', { name: 'Update Trip' }));
  
      await waitFor(() => {
        expect(tripService.updateTrip).toHaveBeenCalledWith('1', {
          ...updatedTripData,
          driver_name: '',
          standby_time: '',
          vanId: '',
        });
      });
    });
  
    it('cancels updating trip on cancel button click', async () => {
      const navigateMock = jest.fn();
      jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigateMock);
  
      render(
        <BrowserRouter>
          <UpdateTrip />
        </BrowserRouter>
      );
  
      fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
  
      expect(navigateMock).toHaveBeenCalledWith('/admin/manage-trip');
    });
  });
  