
import request from 'supertest';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { authController } from '../authController';
import { createUser, login as loginService, getProfile as getProfileService } from '../../services/authService';


jest.mock('../../services/authService');


const createTestApp = (): Application => {
  const app = express();
  app.use(bodyParser.json());
  app.post('/signup', authController.signup);
  app.post('/login', authController.login);
  app.get('/profile', authController.getProfile);
  return app;
};

describe('Auth Controller', () => {
  let app: Application;

  // Setup phase
  beforeEach(() => {
    app = createTestApp();
  });

  // Teardown phase
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should create a new user successfully', async () => {
      // Mocking the createUser service to resolve with a successful response
      (createUser as jest.Mock).mockResolvedValue({ error: null, data: { id: 1, name: 'Test User', email: 'test@example.com' } });

      // Invocation phase: perform a POST request to the /signup endpoint
      const response = await request(app)
        .post('/signup')
        .send({ name: 'Test User', email: 'test@example.com', password: 'password', role: 'user' });

      // Assessment phase: verify the response status and body
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User created successfully');
      expect(response.body.user).toEqual({ id: 1, name: 'Test User', email: 'test@example.com' });
    });

    it('should return an error if user creation fails', async () => {
      // Mocking the createUser service to resolve with an error
      (createUser as jest.Mock).mockResolvedValue({ error: 'Failed to create user', data: null });

      // Invocation phase: perform a POST request to the /signup endpoint
      const response = await request(app)
        .post('/signup')
        .send({ name: 'Test User', email: 'test@example.com', password: 'password', role: 'user' });

      // Assessment phase: verify the response status and body
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to create user');
    });
  });

  describe('login', () => {
    it('should log in a user successfully', async () => {
      // Mocking the login service to resolve with a successful response
      (loginService as jest.Mock).mockResolvedValue({ error: null, data: { token: 'fake-token' } });

      // Invocation phase: perform a POST request to the /login endpoint
      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password' });

      // Assessment phase: verify the response status and body
      expect(response.status).toBe(200);
      expect(response.body.token).toBe('fake-token');
    });

    it('should return an error if login fails', async () => {
      // Mocking the login service to resolve with an error
      (loginService as jest.Mock).mockResolvedValue({ error: 'Login failed', data: null });

      // Invocation phase: perform a POST request to the /login endpoint
      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password' });

      // Assessment phase: verify the response status and body
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Login failed');
    });
  });

  describe('getProfile', () => {
    it('should return user profile if authorized', async () => {
      // Mocking the getProfile service to resolve with a successful response
      (getProfileService as jest.Mock).mockResolvedValue({ error: null, data: { id: 1, name: 'Test User', email: 'test@example.com' } });

      // Invocation phase: perform a GET request to the /profile endpoint with a fake token
      const response = await request(app)
        .get('/profile')
        .set('Authorization', 'Bearer fake-token');

      // Assessment phase: verify the response status and body
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: 1, name: 'Test User', email: 'test@example.com' });
    });

    it('should return an error if token is missing', async () => {
      // Invocation phase: perform a GET request to the /profile endpoint without a token
      const response = await request(app).get('/profile');

      // Assessment phase: verify the response status and body
      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Unauthorized');
    });

    it('should return an error if profile retrieval fails', async () => {
      // Mocking the getProfile service to resolve with an error
      (getProfileService as jest.Mock).mockResolvedValue({ error: 'Failed to get profile', data: null });

      // Invocation phase: perform a GET request to the /profile endpoint with a fake token
      const response = await request(app)
        .get('/profile')
        .set('Authorization', 'Bearer fake-token');

      // Assessment phase: verify the response status and body
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to get profile');
    });
  });
});
