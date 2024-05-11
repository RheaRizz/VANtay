import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail, findUserById } from "../services/authService";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const signup = async (request: Request, response: Response) => {
  const { name, email, password, role } = request.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(name, email, hashedPassword, role);
    response.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    response.status(500).json({ error: "Failed to create user" });
  }
};

export const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return response.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
    response.json({ token });
  } catch (error) {
    response.status(500).json({ error: "Login failed" });
  }
};

export const getProfile = async (request: any, response: Response) => {
  const token = request.headers.authorization?.split(" ")[1];

  if (!token) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: number };
    const user = await findUserById(decodedToken.userId);
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    response.json({ user });
  } catch (error) {
    response.status(401).json({ error: "Invalid or expired token" });
  }
};
