import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();
const userController = new UserController();

router.get("/", (request, response) => userController.getUsers(request, response));
router.get("/:id", (request, response) => userController.getUserById(request, response));
router.put("/:id", (request, response) => userController.updateUser(request, response));
router.delete("/:id", (request, response) => userController.deleteUser(request, response));

export default router;