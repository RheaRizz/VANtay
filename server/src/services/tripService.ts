import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TripService {
  async createTrip(data: any) {
    try {
      const { standby_time, departure_time, destination, driver_name, vanId } = data;
      return await prisma.trip.create({
        data: {
          standby_time: new Date(standby_time), 
          departure_time: new Date(departure_time),
          destination,
          driver_name,
          vanId,
        },
      });
    } catch (error: any) {
      throw new Error(`Error in createTrip: ${error.message}`);
    }
  }

  async getTrips() {
    try {
      return await prisma.trip.findMany();
    } catch (error: any) {
      throw new Error(`Error in getTrips: ${error.message}`);
    }
  }

  async getTripById(id: number) {
    try {
      return await prisma.trip.findUnique({
        where: { id },
      });
    } catch (error: any) {
      throw new Error(`Error in getTicketById: ${error.message}`);
    }
  }

  async updateTrip(id: number, data: any) {
    try {
      const { standby_time, departure_time } = data;
      return await prisma.trip.update({
        where: { id },
        data: {
          ...data,
          standby_time: new Date(standby_time), 
          departure_time: new Date(departure_time), 
        },
      });
    } catch (error: any) {
      throw new Error(`Error in updateTrip: ${error.message}`);
    }
  }
  

  async deleteTrip(id: number) {
    try {
      return await prisma.trip.delete({
        where: { id },
      });
    } catch (error: any) {
      throw new Error(`Error in deleteTicket: ${error.message}`);
    }
  }
}