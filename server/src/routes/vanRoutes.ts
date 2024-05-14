import express, { Router } from "express";
import { getVans } from "../controllers/vanController";

export const vanRouter: Router = express.Router();

vanRouter.get("/", getVans);
