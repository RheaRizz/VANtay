import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface TicketUpdateData {
  passenger_name: string;
  passenger_classification: string;
  passenger_address: string;
  passenger_phone_no: string;
  date: Date;
  destination: string;
  seat_no: number;
  fare: number;
  vanId: number;
  userId: number;
  tripId?: number;
}

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

  async updateTicket(id: number, data: TicketUpdateData) {
    try {
      const updateData: any = {
        passenger_name: data.passenger_name,
        passenger_classification: data.passenger_classification,
        passenger_address: data.passenger_address,
        passenger_phone_no: data.passenger_phone_no,
        date: new Date(data.date),
        destination: data.destination,
        seat_no: data.seat_no,
        fare: data.fare,
        van: {
          connect: {
            id: data.vanId,
          },
        },
        user: {
          connect: {
            id: data.userId,
          },
        },
      };

      if (data.tripId) {
        updateData.trip = {
          connect: {
            id: data.tripId,
          },
        };
      }

      return await prisma.ticket.update({
        where: {
          id,
        },
        data: updateData,
      });
    } catch (error: any) {
      throw new Error(`Error in updateTicket: ${error.message}`);
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

  async deleteTicket(id: number) {
    try {
      return await prisma.ticket.delete({
        where: { id },
      });
    } catch (error: any) {
      throw new Error(`Error in deleteTicket: ${error.message}`);
    }
  }

  async updateMissingIdsFromDb(id: number, data: any) {
    const currentTicket = await prisma.ticket.findUnique({ where: { id } });
    if (!currentTicket) {
      throw new Error(`Ticket with ID ${id} not found.`);
    }

    const vanId = data.vanId || currentTicket.vanId;
    const userId = data.userId || currentTicket.userId;
    const tripId = data.tripId || currentTicket.tripId;

    if (!(await prisma.van.findUnique({ where: { id: vanId } }))) {
      throw new Error(`Van with ID ${vanId} not found.`);
    }
    if (!(await prisma.user.findUnique({ where: { id: userId } }))) {
      throw new Error(`User with ID ${userId} not found.`);
    }
    if (tripId && !(await prisma.trip.findUnique({ where: { id: tripId } }))) {
      throw new Error(`Trip with ID ${tripId} not found.`);
    }

    try {
      return await prisma.ticket.update({
        where: { id },
        data: {
          passenger_name: data.passenger_name,
          passenger_classification: data.passenger_classification,
          passenger_address: data.passenger_address,
          passenger_phone_no: data.passenger_phone_no,
          date: new Date(data.date),
          destination: data.destination,
          seat_no: data.seat_no,
          fare: data.fare,
          van: { connect: { id: vanId } },
          user: { connect: { id: userId } },
          trip: tripId ? { connect: { id: tripId } } : undefined,
        },
      });
    } catch (error: any) {
      throw new Error(`Error in updateTicket: ${error.message}`);
    }
  }
}
