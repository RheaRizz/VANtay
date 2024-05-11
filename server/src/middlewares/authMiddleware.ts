import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const token = request.headers.authorization?.split(" ")[1];

  if (!token) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    response.status(401).json({ error: "Invalid or expired token" });
  }
};
