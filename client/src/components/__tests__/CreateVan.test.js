
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateVan from '../pages/CreateVan';
import { createVan } from '../services/vanService';


jest.mock('../services/vanService', () => ({
  createVan: jest.fn(),
}));


const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('CreateVan', () => {
  beforeEach(() => {
    
    jest.clearAllMocks();
  });

  test('renders CreateVan component', () => {
    render(
      <Router>
        <CreateVan />
      </Router>
    );

    
    expect(screen.getByLabelText(/Model/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/License Plate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Capacity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/User ID/i)).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    render(
      <Router>
        <CreateVan />
      </Router>
    );

    
    fireEvent.change(screen.getByLabelText(/Model/i), { target: { value: 'Test Model' } });
    fireEvent.change(screen.getByLabelText(/License Plate/i), { target: { value: 'ABC123' } });
    fireEvent.change(screen.getByLabelText(/Capacity/i), { target: { value: '12' } });
    fireEvent.change(screen.getByLabelText(/User ID/i), { target: { value: '1' } });

    
    createVan.mockResolvedValueOnce({});

    
    fireEvent.click(screen.getByRole('button', { name: /Create Van/i }));

    
    await waitFor(() => {
      expect(createVan).toHaveBeenCalledWith({
        model: 'Test Model',
        plate_no: 'ABC123',
        capacity: 12,
        userId: 1,
      });
    });

    
    expect(mockNavigate).toHaveBeenCalledWith('/admin/manage-van');
  });

  test('handles form cancellation', () => {
    render(
      <Router>
        <CreateVan />
      </Router>
    );

    
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    
    expect(mockNavigate).toHaveBeenCalledWith('/admin/manage-van');
  });
});
