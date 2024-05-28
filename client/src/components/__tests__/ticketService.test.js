
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as ticketService from '../services/ticketService';

describe('ticketService', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should create a ticket', async () => {
    const ticketData = { /* Ticket data */ };
    const responseData = { /* Response data after ticket creation */ };

    mock.onPost(`${ticketService.API_BASE_URL}/ticket`, ticketData).reply(200, responseData);

    const result = await ticketService.createTicket(ticketData);
    expect(result).toEqual(responseData);
  });

  it('should fetch trips', async () => {
    const tripsData = [/* Trip data */];

    mock.onGet(`${ticketService.API_BASE_URL}/trip`).reply(200, tripsData);

    const result = await ticketService.getTrips();
    expect(result).toEqual(tripsData);
  });

  it('should fetch vans', async () => {
    const vansData = [/* Van data */];

    mock.onGet(`${ticketService.API_BASE_URL}/van`).reply(200, vansData);

    const result = await ticketService.getVans();
    expect(result).toEqual(vansData);
  });

  it('should fetch users', async () => {
    const usersData = [/* User data */];

    mock.onGet(`${ticketService.API_BASE_URL}/user`).reply(200, usersData);

    const result = await ticketService.getUsers();
    expect(result).toEqual(usersData);
  });

  it('should fetch a trip by ID', async () => {
    const tripId = 1;
    const tripData = { /* Trip data */ };

    mock.onGet(`${ticketService.API_BASE_URL}/trip/${tripId}`).reply(200, tripData);

    const result = await ticketService.getTripById(tripId);
    expect(result).toEqual(tripData);
  });

  it('should fetch tickets', async () => {
    const ticketsData = [/* Ticket data */];

    mock.onGet(`${ticketService.API_BASE_URL}/ticket`).reply(200, ticketsData);

    const result = await ticketService.getTickets();
    expect(result).toEqual(ticketsData);
  });

  it('should fetch a ticket by ID', async () => {
    const ticketId = 1;
    const ticketData = { /* Ticket data */ };

    mock.onGet(`${ticketService.API_BASE_URL}/ticket/${ticketId}`).reply(200, ticketData);

    const result = await ticketService.getTicketById(ticketId);
    expect(result).toEqual(ticketData);
  });

  it('should update a ticket', async () => {
    const ticketId = 1;
    const ticketData = { /* Updated ticket data */ };
    const responseData = { /* Response data after ticket update */ };

    mock.onPut(`${ticketService.API_BASE_URL}/ticket/${ticketId}`, ticketData).reply(200, responseData);

    const result = await ticketService.updateTicket(ticketId, ticketData);
    expect(result).toEqual(responseData);
  });

  it('should delete a ticket', async () => {
    const ticketId = 1;

    mock.onDelete(`${ticketService.API_BASE_URL}/ticket/${ticketId}`).reply(204);

    await ticketService.deleteTicket(ticketId);
    expect(mock.history.delete.length).toBe(1);
    expect(mock.history.delete[0].url).toBe(`${ticketService.API_BASE_URL}/ticket/${ticketId}`);
  });
});
