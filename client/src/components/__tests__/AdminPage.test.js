
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminPage from '../pages/AdminPage';


jest.mock('./ManageVan', () => () => <div>Manage Van Component</div>);
jest.mock('./ManageTrip', () => () => <div>Manage Trip Component</div>);
jest.mock('./ManageUser', () => () => <div>Manage User Component</div>);
jest.mock('./ManageTicket', () => () => <div>Manage Ticket Component</div>);
jest.mock('./UpdateUser', () => () => <div>Update User Component</div>);
jest.mock('./UpdateVan', () => () => <div>Update Van Component</div>);
jest.mock('./UpdateTrip', () => () => <div>Update Trip Component</div>);
jest.mock('./UpdateTicket', () => () => <div>Update Ticket Component</div>);
jest.mock('./NavbarAdmin', () => () => <div>Navbar Admin Component</div>);
jest.mock('./CreateVan', () => () => <div>Create Van Component</div>);
jest.mock('./CreateTrip', () => () => <div>Create Trip Component</div>);

test('renders AdminPage component', () => {
  render(
    <Router>
      <AdminPage />
    </Router>
  );

  
  expect(screen.getByText(/Manage Users/i)).toBeInTheDocument();
  expect(screen.getByText(/Manage Vans/i)).toBeInTheDocument();
  expect(screen.getByText(/Manage Trips/i)).toBeInTheDocument();
  expect(screen.getByText(/Manage Tickets/i)).toBeInTheDocument();
});
