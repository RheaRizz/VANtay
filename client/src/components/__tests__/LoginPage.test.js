import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import { login } from '../services/apiService';


jest.mock('../services/apiService', () => ({
  login: jest.fn(),
}));


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('LoginPage', () => {
  test('handles form submission with valid credentials', async () => {
    login.mockResolvedValue({ token: 'fake-token' });
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });

    
    fireEvent.click(screen.getByText('LOGIN'));

    
    await waitFor(() => expect(login).toHaveBeenCalled());

    
    expect(login).toHaveBeenCalledWith({
      email: 'john.doe@example.com',
      password: 'password123',
    });

    
    expect(localStorage.getItem('token')).toBe('fake-token');

    
    expect(mockNavigate).toHaveBeenCalledWith('/cashier');
  });
});
