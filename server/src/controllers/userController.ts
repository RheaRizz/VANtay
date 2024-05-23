import { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

export class UserController {
  async getUsers(request: Request, response: Response) {
    const user = await userService.getUsers();
    response.status(200).json(user);
  }

  async getUserById(request: Request, response: Response) {
    const user = await userService.getUserById(parseInt(request.params.id));
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }
    response.status(200).json(user);
  }

  async updateUser(request: Request, response: Response) {
    const user = await userService.updateUser(parseInt(request.params.id), request.body);
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }
    response.status(200).json(user);
  }

  async deleteUser(request: Request, response: Response) {
    await userService.deleteUser(parseInt(request.params.id));
    response.status(204).send();
  }
}