import request from 'supertest';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { TicketController } from '../ticketController';
import { TicketService } from '../../services/ticketService';

jest.mock('../services/ticketService');

const createTestApp = (): Application => {
  const app = express();
  app.use(bodyParser.json());
  const ticketController = new TicketController();
  app.post('/tickets', ticketController.createTicket);
  app.get('/tickets', ticketController.getTickets);
  app.get('/tickets/:id', ticketController.getTicketById);
  app.put('/tickets/:id', ticketController.updateTicket);
  app.delete('/tickets/:id', ticketController.deleteTicket);
  return app;
};

describe('Ticket Controller', () => {
  let app: Application;

  beforeEach(() => {
    app = createTestApp();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTicket', () => {
    it('should create a new ticket successfully', async () => {
      const mockTicket = { id: 1, name: 'Test Ticket' };
      (TicketService as jest.Mock).mockImplementation(() => ({
        createTicket: jest.fn().mockResolvedValue(mockTicket),
      }));

      const response = await request(app)
        .post('/tickets')
        .send({ name: 'Test Ticket' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockTicket);
    });

    it('should return 400 Bad Request if ticket creation fails', async () => {
      (TicketService as jest.Mock).mockImplementation(() => ({
        createTicket: jest.fn().mockRejectedValue(new Error('Failed to create ticket')),
      }));

      const response = await request(app)
        .post('/tickets')
        .send({ name: 'Invalid Ticket' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Failed to create ticket' });
    });
  });

  describe('getTickets', () => {
    it('should return a list of tickets successfully', async () => {
      const mockTickets = [{ id: 1, name: 'Ticket 1' }, { id: 2, name: 'Ticket 2' }];
      (TicketService as jest.Mock).mockImplementation(() => ({
        getTickets: jest.fn().mockResolvedValue(mockTickets),
      }));

      const response = await request(app).get('/tickets');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTickets);
    });

    it('should return 500 Internal Server Error if ticket retrieval fails', async () => {
      (TicketService as jest.Mock).mockImplementation(() => ({
        getTickets: jest.fn().mockRejectedValue(new Error('Failed to retrieve tickets')),
      }));

      const response = await request(app).get('/tickets');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to retrieve tickets' });
    });
  });

  describe('getTicketById', () => {
    it('should return the ticket with the specified id', async () => {
      const mockTicket = { id: 1, name: 'Test Ticket' };
      (TicketService as jest.Mock).mockImplementation(() => ({
        getTicketById: jest.fn().mockResolvedValue(mockTicket),
      }));

      const response = await request(app).get('/tickets/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTicket);
    });

    it('should return 404 Not Found if ticket with specified id does not exist', async () => {
      (TicketService as jest.Mock).mockImplementation(() => ({
        getTicketById: jest.fn().mockResolvedValue(null),
      }));

      const response = await request(app).get('/tickets/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Ticket not found' });
    });
  });

  describe('updateTicket', () => {
    it('should update the ticket with the specified id', async () => {
      const mockTicket = { id: 1, name: 'Updated Ticket' };
      (TicketService as jest.Mock).mockImplementation(() => ({
        updateTicket: jest.fn().mockResolvedValue(mockTicket),
      }));

      const response = await request(app)
        .put('/tickets/1')
        .send({ name: 'Updated Ticket' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTicket);
    });

    it('should return 404 Not Found if ticket with specified id does not exist', async () => {
      (TicketService as jest.Mock).mockImplementation(() => ({
        updateTicket: jest.fn().mockResolvedValue(null),
      }));

      const response = await request(app)
        .put('/tickets/999')
        .send({ name: 'Updated Ticket' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Ticket not found' });
    });
  });

  describe('deleteTicket', () => {
    it('should delete the ticket with the specified id', async () => {
      (TicketService as jest.Mock).mockImplementation(() => ({
        deleteTicket: jest.fn().mockResolvedValue(undefined),
      }));

      const response = await request(app).delete('/tickets/1');

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

    it('should return 404 Not Found if ticket with specified id does not exist', async () => {
      (TicketService as jest.Mock).mockImplementation(() => ({
        deleteTicket: jest.fn().mockResolvedValue(null),
      }));

      const response = await request(app).delete('/tickets/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Ticket not found' });
    });
  });
});
