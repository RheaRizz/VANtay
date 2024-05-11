import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getTrips = async (request: Request, response: Response): Promise<void> => {
  try {
    const trips = await prisma.trip.findMany();
    response.json(trips);
  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });
  }
};
