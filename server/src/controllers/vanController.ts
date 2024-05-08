import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getVans = async (request: Request, response: Response): Promise<void> => {
  try {
    const vans = await prisma.van.findMany();
    response.json(vans);
  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });
  }
};
