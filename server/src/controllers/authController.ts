import { Request, Response } from "express";
import { createUser, login as loginService, getProfile as getProfileService } from "../services/authService";

export const authController = {
  signup: async (request: Request, response: Response) => {
    const { name, email, password, role } = request.body;
    const { error, data } = await createUser(name, email, password, role);

    if (error) {
      return response.status(500).json({ error: "Failed to create user" });
    }

    response.status(201).json({ message: "User created successfully", user: data });
  },

  login: async (request: Request, response: Response) => {
    const { email, password } = request.body;
    const { error, data } = await loginService(email, password);

    if (error) {
      return response.status(500).json({ error: "Login failed" });
    }

    response.json(data);
  },

  getProfile: async (request: Request, response: Response) => {
    const token = request.headers.authorization?.split(" ")[1];

    if (!token) {
      return response.status(401).json({ error: "Unauthorized" });
    }

    const { error, data } = await getProfileService(token);

    if (error) {
      return response.status(500).json({ error: "Failed to get profile" });
    }

    response.json(data);
  }
};