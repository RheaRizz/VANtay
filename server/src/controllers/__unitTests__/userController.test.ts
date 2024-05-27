import request from 'supertest';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { UserController } from '../userController';
import { UserService } from '../../services/userService';

jest.mock('../services/userService');

const createTestApp = (): Application => {
  const app = express();
  app.use(bodyParser.json());
  const userController = new UserController();
  app.get('/users', userController.getUsers);
  app.get('/users/:id', userController.getUserById);
  app.put('/users/:id', userController.updateUser);
  app.delete('/users/:id', userController.deleteUser);
  return app;
};

describe('User Controller', () => {
  let app: Application;

  beforeEach(() => {
    app = createTestApp();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('should return a list of users successfully', async () => {
      const mockUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
      (UserService as jest.Mock).mockImplementation(() => ({
        getUsers: jest.fn().mockResolvedValue(mockUsers),
      }));

      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUsers);
    });

    it('should return 500 Internal Server Error if user retrieval fails', async () => {
      (UserService as jest.Mock).mockImplementation(() => ({
        getUsers: jest.fn().mockRejectedValue(new Error('Failed to retrieve users')),
      }));

      const response = await request(app).get('/users');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to retrieve users' });
    });
  });

  describe('getUserById', () => {
    it('should return the user with the specified id', async () => {
      const mockUser = { id: 1, name: 'Test User' };
      (UserService as jest.Mock).mockImplementation(() => ({
        getUserById: jest.fn().mockResolvedValue(mockUser),
      }));

      const response = await request(app).get('/users/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
    });

    it('should return 404 Not Found if user with specified id does not exist', async () => {
      (UserService as jest.Mock).mockImplementation(() => ({
        getUserById: jest.fn().mockResolvedValue(null),
      }));

      const response = await request(app).get('/users/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'User not found' });
    });
  });

  describe('updateUser', () => {
    it('should update the user with the specified id', async () => {
      const mockUser = { id: 1, name: 'Updated User' };
      (UserService as jest.Mock).mockImplementation(() => ({
        updateUser: jest.fn().mockResolvedValue(mockUser),
      }));

      const response = await request(app)
        .put('/users/1')
        .send({ name: 'Updated User' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
    });

    it('should return 404 Not Found if user with specified id does not exist', async () => {
      (UserService as jest.Mock).mockImplementation(() => ({
        updateUser: jest.fn().mockResolvedValue(null),
      }));

      const response = await request(app)
        .put('/users/999')
        .send({ name: 'Updated User' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'User not found' });
    });
  });

  describe('deleteUser', () => {
    it('should delete the user with the specified id', async () => {
      (UserService as jest.Mock).mockImplementation(() => ({
        deleteUser: jest.fn().mockResolvedValue(undefined),
      }));

      const response = await request(app).delete('/users/1');

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

    it('should return 404 Not Found if user with specified id does not exist', async () => {
      (UserService as jest.Mock).mockImplementation(() => ({
        deleteUser: jest.fn().mockResolvedValue(null),
      }));

      const response = await request(app).delete('/users/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'User not found' });
    });
  });
});
