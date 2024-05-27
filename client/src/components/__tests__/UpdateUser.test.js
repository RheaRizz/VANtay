import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UpdateUser from '../pages/UpdateUser';
import * as userService from '../../services/userService';

jest.mock('../../services/userService');

describe('UpdateUser', () => {
  test('renders Update User form', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      role: 'ADMIN',
    };

    userService.getUserById.mockResolvedValueOnce(userData);

    render(
      <MemoryRouter>
        <UpdateUser />
      </MemoryRouter>
    );

    expect(screen.getByText(/Update User/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Role/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test User')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue('ADMIN')).toBeInTheDocument();
    });
  });

  test('submits form with updated user data', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      role: 'ADMIN',
    };

    const updatedUserData = {
      name: 'Updated User',
      email: 'updated@example.com',
      role: 'CASHIER',
    };

    userService.getUserById.mockResolvedValueOnce(userData);
    userService.updateUser.mockResolvedValueOnce(updatedUserData);

    render(
      <MemoryRouter>
        <UpdateUser />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Updated User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'updated@example.com' } });
    fireEvent.change(screen.getByLabelText(/Role/i), { target: { value: 'CASHIER' } });

    fireEvent.click(screen.getByText(/Update User/i));

    await waitFor(() => {
      expect(userService.updateUser).toHaveBeenCalledWith('userId', updatedUserData);
    });
  });
});
