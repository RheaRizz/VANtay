import express, { Router } from "express";
import { getUsers } from "../controllers/userController";

export const userRouter: Router = express.Router();

userRouter.get("/", getUsers);
