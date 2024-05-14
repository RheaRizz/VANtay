import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getTickets = async (request: Request, response: Response): Promise<void> => {
  try {
    const tickets = await prisma.ticket.findMany();
    response.json(tickets);
  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });
  }
};
