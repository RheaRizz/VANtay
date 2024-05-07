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

app.get("/api/champions", async (req: Request, res: Response) => {
  const champs = await prisma.champion.findMany()

  res.send(champs)
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});