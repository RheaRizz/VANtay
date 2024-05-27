
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../authMiddleware';

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
  let request: Partial<Request>;
  let response: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    request = { headers: {} };
    response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    nextFunction = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call next() if token is present and valid', () => {
    request.headers!.authorization = 'Bearer valid-token';

    (jwt.verify as jest.Mock).mockReturnValueOnce(true);

    authMiddleware(request as Request, response as Response, nextFunction);

    expect(response.status).not.toHaveBeenCalled();
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalled();
  });

  it('should return 401 if token is missing', () => {
    authMiddleware(request as Request, response as Response, nextFunction);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should return 401 if token is invalid or expired', () => {
    request.headers!.authorization = 'Bearer invalid-token';

    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    authMiddleware(request as Request, response as Response, nextFunction);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith({ error: 'Invalid or expired token' });
    expect(nextFunction).not.toHaveBeenCalled();
  });
});
