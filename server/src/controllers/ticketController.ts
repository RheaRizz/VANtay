import { Request, Response } from "express";
import { TicketService } from "../services/ticketService";

const ticketService = new TicketService();

export class TicketController {
  async createTicket(request: Request, response: Response) {
    const ticket = await ticketService.createTicket(request.body);
    response.status(201).json(ticket);
  }

  async getTickets(request: Request, response: Response) {
    const ticket = await ticketService.getTickets();
    response.status(200).json(ticket);
  }

  async getTicketById(request: Request, response: Response) {
    const ticket = await ticketService.getTicketById(parseInt(request.params.id));
    if (!ticket) {
      return response.status(404).json({ message: "Trip not found" });
    }
    response.status(200).json(ticket);
  }

  async updateTicket(request: Request, response: Response) {
    const trip = await ticketService.updateTicket(parseInt(request.params.id), request.body);
    if (!trip) {
      return response.status(404).json({ message: "Trip not found" });
    }
    response.status(200).json(trip);
  }

  async deleteTicket(request: Request, response: Response) {
    await ticketService.deleteTicket(parseInt(request.params.id));
    response.status(204).send();
  }
}