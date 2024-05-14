import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUsers = async (request: Request, response: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    response.json(users);
  } catch (error) {
    response.status(500).json({ error: "Internal Server Error" });
  }
};
