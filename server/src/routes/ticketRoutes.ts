import express, { Router } from "express";
import { getTickets } from "../controllers/ticketController";

export const ticketRouter: Router = express.Router();

ticketRouter.get("/", getTickets);
