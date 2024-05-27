import request from 'supertest';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { VanController } from '../vanController';
import { VanService } from '../../services/vanService';

jest.mock('../services/vanService');

const createTestApp = (): Application => {
  const app = express();
  app.use(bodyParser.json());
  const vanController = new VanController();
  app.post('/vans', vanController.createVan);
  app.get('/vans', vanController.getVans);
  app.get('/vans/:id', vanController.getVanById);
  app.put('/vans/:id', vanController.updateVan);
  app.delete('/vans/:id', vanController.deleteVan);
  return app;
};

describe('Van Controller', () => {
  let app: Application;

  beforeEach(() => {
    app = createTestApp();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createVan', () => {
    it('should create a new van successfully', async () => {
      const mockVan = { id: 1, name: 'Test Van' };
      (VanService as jest.Mock).mockImplementation(() => ({
        createVan: jest.fn().mockResolvedValue(mockVan),
      }));

      const response = await request(app)
        .post('/vans')
        .send({ name: 'Test Van' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockVan);
    });

    it('should return 400 Bad Request if van creation fails', async () => {
      (VanService as jest.Mock).mockImplementation(() => ({
        createVan: jest.fn().mockRejectedValue(new Error('Failed to create van')),
      }));

      const response = await request(app)
        .post('/vans')
        .send({ name: 'Invalid Van' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Failed to create van' });
    });
  });

  describe('getVans', () => {
    it('should return a list of vans successfully', async () => {
      const mockVans = [{ id: 1, name: 'Van 1' }, { id: 2, name: 'Van 2' }];
      (VanService as jest.Mock).mockImplementation(() => ({
        getVans: jest.fn().mockResolvedValue(mockVans),
      }));

      const response = await request(app).get('/vans');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockVans);
    });

    it('should return 500 Internal Server Error if van retrieval fails', async () => {
      (VanService as jest.Mock).mockImplementation(() => ({
        getVans: jest.fn().mockRejectedValue(new Error('Failed to retrieve vans')),
      }));

      const response = await request(app).get('/vans');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to retrieve vans' });
    });
  });

  describe('getVanById', () => {
    it('should return the van with the specified id', async () => {
      const mockVan = { id: 1, name: 'Test Van' };
      (VanService as jest.Mock).mockImplementation(() => ({
        getVanById: jest.fn().mockResolvedValue(mockVan),
      }));

      const response = await request(app).get('/vans/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockVan);
    });

    it('should return 404 Not Found if van with specified id does not exist', async () => {
      (VanService as jest.Mock).mockImplementation(() => ({
        getVanById: jest.fn().mockResolvedValue(null),
      }));

      const response = await request(app).get('/vans/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Van not found' });
    });
  });

  describe('updateVan', () => {
    it('should update the van with the specified id', async () => {
      const mockVan = { id: 1, name: 'Updated Van' };
      (VanService as jest.Mock).mockImplementation(() => ({
        updateVan: jest.fn().mockResolvedValue(mockVan),
      }));

      const response = await request(app)
        .put('/vans/1')
        .send({ name: 'Updated Van' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockVan);
    });

    it('should return 404 Not Found if van with specified id does not exist', async () => {
      (VanService as jest.Mock).mockImplementation(() => ({
        updateVan: jest.fn().mockResolvedValue(null),
      }));

      const response = await request(app)
        .put('/vans/999')
        .send({ name: 'Updated Van' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Van not found' });
    });
  });

  describe('deleteVan', () => {
    it('should delete the van with the specified id', async () => {
      (VanService as jest.Mock).mockImplementation(() => ({
        deleteVan: jest.fn().mockResolvedValue(undefined),
      }));

      const response = await request(app).delete('/vans/1');

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

    it('should return 404 Not Found if van with specified id does not exist', async () => {
      (VanService as jest.Mock).mockImplementation(() => ({
        deleteVan: jest.fn().mockResolvedValue(null),
      }));

      const response = await request(app).delete('/vans/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Van not found' });
    });
  });
});
