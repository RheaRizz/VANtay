import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TicketService {
  async createTicket(data: any) {
    try {
      return await prisma.ticket.create({
        data,
      });
    } catch (error: any) {
      throw new Error(`Error in createTicket: ${error.message}`);
    }
  }

  async getTickets() {
    try {
      return await prisma.ticket.findMany();
    } catch (error: any) {
      throw new Error(`Error in getTickets: ${error.message}`);
    }
  }

  async getTicketById(id: number) {
    try {
      return await prisma.ticket.findUnique({
        where: { id },
      });
    } catch (error: any) {
      throw new Error(`Error in getTicketById: ${error.message}`);
    }
  }

  async updateTicket(id: number, data: any) {
    try {
      return await prisma.ticket.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      throw new Error(`Error in updateTicket: ${error.message}`);
    }
  }

  async deleteTicket(id: number) {
    try {
      return await prisma.ticket.delete({
        where: { id },
      });
    } catch (error: any) {
      throw new Error(`Error in deleteTicket: ${error.message}`);
    }
  }
}