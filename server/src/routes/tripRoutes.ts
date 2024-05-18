import express, { Router } from "express";
import { getTrips } from "../controllers/tripController";

export const tripRouter: Router = express.Router();

tripRouter.get("/", getTrips);
