import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ManageUser from '../pages/ManageUser';
import { getUsers, deleteUser } from '../services/userService';


jest.mock('../services/userService', () => ({
  getUsers: jest.fn(),
  deleteUser: jest.fn(),
}));

describe('ManageUser', () => {
  beforeEach(() => {
    
    jest.clearAllMocks();
  });

  test('renders ManageUser component', async () => {
    
    const mockUserData = [
      { id: 1, name: 'User 1', email: 'user1@example.com', role: 'ADMIN' },
      { id: 2, name: 'User 2', email: 'user2@example.com', role: 'CASHIER' },
    ];

    
    getUsers.mockResolvedValueOnce(mockUserData);

    render(
      <Router>
        <ManageUser />
      </Router>
    );

    
    await waitFor(() => {
      expect(screen.getByText('User 1')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('User 2')).toBeInTheDocument();
    });
  });

  test('handles user deletion', async () => {
    
    getUsers.mockResolvedValueOnce([{ id: 1, name: 'User 1', email: 'user1@example.com', role: 'ADMIN' }]);

    render(
      <Router>
        <ManageUser />
      </Router>
    );

    
    await waitFor(() => {
      expect(screen.getByText('User 1')).toBeInTheDocument();
    });

    
    deleteUser.mockResolvedValueOnce({});

    
    fireEvent.click(screen.getByText('Delete'));

    
    await waitFor(() => {
      
      expect(deleteUser).toHaveBeenCalledWith(1);
    });
  });
});
