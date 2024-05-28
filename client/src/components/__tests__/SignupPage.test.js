import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignupPage from './SignupPage';
import { signup } from '../services/apiService';

jest.mock('../services/apiService', () => ({
  signup: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe('SignupPage', () => {
  test('renders SignupPage component', () => {
    render(
      <Router>
        <SignupPage />
      </Router>
    );

    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm your password')).toBeInTheDocument();
    expect(screen.getByText('Create account')).toBeInTheDocument();
  });

  test('handles input changes', () => {
    render(
      <Router>
        <SignupPage />
      </Router>
    );

    const nameInput = screen.getByPlaceholderText('Enter your name');
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(passwordInput.value).toBe('password123');
    expect(confirmPasswordInput.value).toBe('password123');
  });

  test('handles form submission with matching passwords', async () => {
    signup.mockResolvedValue({ message: 'Signup successful' });

    render(
      <Router>
        <SignupPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm your password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('Create account'));

    await screen.findByText('Create An Account!');

    expect(signup).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'CASHIER',
    });
  });

  test('shows error when passwords do not match', () => {
    render(
      <Router>
        <SignupPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm your password'), { target: { value: 'differentpassword' } });

    fireEvent.click(screen.getByText('Create account'));

    
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });

  test('shows error when email already exists', async () => {
    signup.mockRejectedValue({ error: 'Email already exists' });

    render(
      <Router>
        <SignupPage />
      </Router>
    );


    fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm your password'), { target: { value: 'password123' } });

    
    fireEvent.click(screen.getByText('Create account'));

    
    expect(await screen.findByText('Email already exists')).toBeInTheDocument();
  });
});
