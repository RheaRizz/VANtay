import { Request, Response } from "express";
import { TripService } from "../services/tripService";

const tripService = new TripService();

export class TripController {
  async createTrip(request: Request, response: Response) {
    const trip = await tripService.createTrip(request.body);
    response.status(201).json(trip);
  }

  async getTrips(request: Request, response: Response) {
    const trip = await tripService.getTrips();
    response.status(200).json(trip);
  }

  async getTripById(request: Request, response: Response) {
    const trip = await tripService.getTripById(parseInt(request.params.id));
    if (!trip) {
      return response.status(404).json({ message: "Trip not found" });
    }
    response.status(200).json(trip);
  }

  async updateTrip(request: Request, response: Response) {
    const trip = await tripService.updateTrip(parseInt(request.params.id), request.body);
    if (!trip) {
      return response.status(404).json({ message: "Trip not found" });
    }
    response.status(200).json(trip);
  }

  async deleteTrip(request: Request, response: Response) {
    await tripService.deleteTrip(parseInt(request.params.id));
    response.status(204).send();
  }
}