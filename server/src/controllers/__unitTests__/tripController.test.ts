import request from 'supertest';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { TripController } from '../tripController';
import { TripService } from '../../services/tripService';

jest.mock('../services/tripService');

const createTestApp = (): Application => {
  const app = express();
  app.use(bodyParser.json());
  const tripController = new TripController();
  app.post('/trips', tripController.createTrip);
  app.get('/trips', tripController.getTrips);
  app.get('/trips/:id', tripController.getTripById);
  app.put('/trips/:id', tripController.updateTrip);
  app.delete('/trips/:id', tripController.deleteTrip);
  return app;
};

describe('Trip Controller', () => {
  let app: Application;

  beforeEach(() => {
    app = createTestApp();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTrip', () => {
    it('should create a new trip successfully', async () => {
      const mockTrip = { id: 1, name: 'Test Trip' };
      (TripService as jest.Mock).mockImplementation(() => ({
        createTrip: jest.fn().mockResolvedValue(mockTrip),
      }));

      const response = await request(app)
        .post('/trips')
        .send({ name: 'Test Trip' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockTrip);
    });

    it('should return 400 Bad Request if trip creation fails', async () => {
      (TripService as jest.Mock).mockImplementation(() => ({
        createTrip: jest.fn().mockRejectedValue(new Error('Failed to create trip')),
      }));

      const response = await request(app)
        .post('/trips')
        .send({ name: 'Invalid Trip' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Failed to create trip' });
    });
  });

  describe('getTrips', () => {
    it('should return a list of trips successfully', async () => {
      const mockTrips = [{ id: 1, name: 'Trip 1' }, { id: 2, name: 'Trip 2' }];
      (TripService as jest.Mock).mockImplementation(() => ({
        getTrips: jest.fn().mockResolvedValue(mockTrips),
      }));

      const response = await request(app).get('/trips');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTrips);
    });

    it('should return 500 Internal Server Error if trip retrieval fails', async () => {
      (TripService as jest.Mock).mockImplementation(() => ({
        getTrips: jest.fn().mockRejectedValue(new Error('Failed to retrieve trips')),
      }));

      const response = await request(app).get('/trips');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to retrieve trips' });
    });
  });

  describe('getTripById', () => {
    it('should return the trip with the specified id', async () => {
      const mockTrip = { id: 1, name: 'Test Trip' };
      (TripService as jest.Mock).mockImplementation(() => ({
        getTripById: jest.fn().mockResolvedValue(mockTrip),
      }));

      const response = await request(app).get('/trips/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTrip);
    });

    it('should return 404 Not Found if trip with specified id does not exist', async () => {
      (TripService as jest.Mock).mockImplementation(() => ({
        getTripById: jest.fn().mockResolvedValue(null),
      }));

      const response = await request(app).get('/trips/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Trip not found' });
    });
  });

  describe('updateTrip', () => {
    it('should update the trip with the specified id', async () => {
      const mockTrip = { id: 1, name: 'Updated Trip' };
      (TripService as jest.Mock).mockImplementation(() => ({
        updateTrip: jest.fn().mockResolvedValue(mockTrip),
      }));

      const response = await request(app)
        .put('/trips/1')
        .send({ name: 'Updated Trip' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTrip);
    });

    it('should return 404 Not Found if trip with specified id does not exist', async () => {
      (TripService as jest.Mock).mockImplementation(() => ({
        updateTrip: jest.fn().mockResolvedValue(null),
      }));

      const response = await request(app)
        .put('/trips/999')
        .send({ name: 'Updated Trip' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Trip not found' });
    });
  });

  describe('deleteTrip', () => {
    it('should delete the trip with the specified id', async () => {
      (TripService as jest.Mock).mockImplementation(() => ({
        deleteTrip: jest.fn().mockResolvedValue(undefined),
      }));

      const response = await request(app).delete('/trips/1');

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

    it('should return 404 Not Found if trip with specified id does not exist', async () => {
      (TripService as jest.Mock).mockImplementation(() => ({
        deleteTrip: jest.fn().mockResolvedValue(null),
      }));

      const response = await request(app).delete('/trips/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Trip not found' });
    });
  });
});
