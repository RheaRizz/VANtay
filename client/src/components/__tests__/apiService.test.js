
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { signup, login, fetchProfile } from '../services/apiService';

describe('apiService', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  describe('signup', () => {
    it('should successfully signup a user', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };
      const response = { message: 'Signup successful' };

      mock.onPost(`${process.env.REACT_APP_API_URL}/signup`).reply(200, response);

      const result = await signup(userData);
      expect(result).toEqual(response);
    });

    it('should throw an error if signup fails', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };
      const errorResponse = { error: 'Signup failed' };

      mock.onPost(`${process.env.REACT_APP_API_URL}/signup`).reply(400, errorResponse);

      await expect(signup(userData)).rejects.toEqual(errorResponse);
    });
  });

  describe('login', () => {
    it('should successfully login a user', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };
      const response = { token: 'fake-token' };

      mock.onPost(`${process.env.REACT_APP_API_URL}/login`).reply(200, response);

      const result = await login(userData);
      expect(result).toEqual(response);
    });

    it('should throw an error if login fails', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };
      const errorResponse = { error: 'Login failed' };

      mock.onPost(`${process.env.REACT_APP_API_URL}/login`).reply(400, errorResponse);

      await expect(login(userData)).rejects.toEqual(errorResponse);
    });
  });

  describe('fetchProfile', () => {
    it('should fetch user profile successfully', async () => {
      const token = 'fake-token';
      const response = { id: 1, email: 'test@example.com' };

      mock.onGet(`${process.env.REACT_APP_API_URL}/profile`).reply(200, response);

      const result = await fetchProfile(token);
      expect(result).toEqual(response);
    });

    it('should throw an error if fetching profile fails', async () => {
      const token = 'fake-token';
      const errorResponse = { error: 'Fetch profile failed' };

      mock.onGet(`${process.env.REACT_APP_API_URL}/profile`).reply(400, errorResponse);

      await expect(fetchProfile(token)).rejects.toEqual(errorResponse);
    });
  });
});
