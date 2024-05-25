import express from "express";
import { authController } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/profile", authMiddleware, authController.getProfile);

export default router;