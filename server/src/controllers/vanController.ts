import { Request, Response } from "express";
import { VanService } from "../services/vanService";

const vanService = new VanService();

export class VanController {
  async createVan(request: Request, response: Response) {
    const van = await vanService.createVan(request.body);
    response.status(201).json(van);
  }

  async getVans(request: Request, response: Response) {
    const vans = await vanService.getVans();
    response.status(200).json(vans);
  }

  async getVanById(request: Request, response: Response) {
    const van = await vanService.getVanById(parseInt(request.params.id));
    if (!van) {
      return response.status(404).json({ message: "Van not found" });
    }
    response.status(200).json(van);
  }

  async updateVan(request: Request, response: Response) {
    const van = await vanService.updateVan(parseInt(request.params.id), request.body);
    if (!van) {
      return response.status(404).json({ message: "Van not found" });
    }
    response.status(200).json(van);
  }

  async deleteVan(request: Request, response: Response) {
    await vanService.deleteVan(parseInt(request.params.id));
    response.status(204).send();
  }
}