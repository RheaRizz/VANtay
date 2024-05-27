import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UpdateVan from '../UpdateVan';
import * as vanService from '../../services/vanService';

jest.mock('../../services/vanService');

describe('UpdateVan', () => {
  test('renders Update Van form', async () => {
    const vanData = {
      model: 'Test Model',
      plate_no: 'ABC123',
      capacity: 5,
      userId: 1,
    };

    vanService.getVanById.mockResolvedValueOnce(vanData);

    render(
      <MemoryRouter>
        <UpdateVan />
      </MemoryRouter>
    );

    expect(screen.getByText(/Update Van/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Model/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/License Plate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Capacity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/User ID/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Model')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue('ABC123')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue('5')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    });
  });

  test('submits form with updated van data', async () => {
    const vanData = {
      model: 'Test Model',
      plate_no: 'ABC123',
      capacity: 5,
      userId: 1,
    };

    const updatedVanData = {
      model: 'Updated Model',
      plate_no: 'XYZ789',
      capacity: 8,
      userId: 2,
    };

    vanService.getVanById.mockResolvedValueOnce(vanData);
    vanService.updateVan.mockResolvedValueOnce(updatedVanData);

    render(
      <MemoryRouter>
        <UpdateVan />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Model/i), { target: { value: 'Updated Model' } });
    fireEvent.change(screen.getByLabelText(/License Plate/i), { target: { value: 'XYZ789' } });
    fireEvent.change(screen.getByLabelText(/Capacity/i), { target: { value: '8' } });
    fireEvent.change(screen.getByLabelText(/User ID/i), { target: { value: '2' } });

    fireEvent.click(screen.getByText(/Update Van/i));

    await waitFor(() => {
      expect(vanService.updateVan).toHaveBeenCalledWith('id', updatedVanData);
    });
  });
});
