
// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.get("/", (req: Request, res: Response) => {
  res.send("We like to eat pizza");
});

app.get("/api/ticket", async (req: Request, res: Response) => {
  const tickets = await prisma.ticket.findMany()

  res.send(tickets)
});

app.get("/api/van", async (req: Request, res: Response) => {
  const vans = await prisma.van.findMany()

  res.send(vans)
});

app.get("/api/user", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany()

  res.send(users)
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
