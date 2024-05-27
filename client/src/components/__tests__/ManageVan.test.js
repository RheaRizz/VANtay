import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ManageVan from '../pages/ManageVan';
import { getVans, deleteVan } from '../services/vanService';


jest.mock('../services/vanService', () => ({
  getVans: jest.fn(),
  deleteVan: jest.fn(),
}));

describe('ManageVan', () => {
  beforeEach(() => {
    
    jest.clearAllMocks();
  });

  test('renders ManageVan component', async () => {
    
    const mockVanData = [
      { id: 1, model: 'Van 1', plate_no: 'ABC123', capacity: 10, userId: 1 },
      { id: 2, model: 'Van 2', plate_no: 'XYZ789', capacity: 12, userId: 2 },
    ];

    
    getVans.mockResolvedValueOnce(mockVanData);

    render(
      <Router>
        <ManageVan />
      </Router>
    );

    
    await waitFor(() => {
      expect(screen.getByText('Van 1')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Van 2')).toBeInTheDocument();
    });
  });

  test('handles van deletion', async () => {
    
    getVans.mockResolvedValueOnce([{ id: 1, model: 'Van 1', plate_no: 'ABC123', capacity: 10, userId: 1 }]);

    render(
      <Router>
        <ManageVan />
      </Router>
    );

    
    await waitFor(() => {
      expect(screen.getByText('Van 1')).toBeInTheDocument();
    });

    
    deleteVan.mockResolvedValueOnce({});

    
    fireEvent.click(screen.getByText('Delete'));

    
    await waitFor(() => {
      
      expect(deleteVan).toHaveBeenCalledWith(1);
    });
  });
});
