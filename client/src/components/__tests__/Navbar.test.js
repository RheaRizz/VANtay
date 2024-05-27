
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../pages/Navbar';

describe('Navbar', () => {
  test('renders Navbar component', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Cashier')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('handles Logout click', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );


    fireEvent.click(screen.getByText('Logout'));

    expect(window.location.pathname).toBe('/');
  });
});
