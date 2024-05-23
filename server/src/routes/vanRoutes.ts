import { Router } from "express";
import { VanController } from "../controllers/vanController";

const router = Router();
const vanController = new VanController();

router.post("/", (req, res) => vanController.createVan(req, res));
router.get("/", (req, res) => vanController.getVans(req, res));
router.get("/:id", (req, res) => vanController.getVanById(req, res));
router.put("/:id", (req, res) => vanController.updateVan(req, res));
router.delete("/:id", (req, res) => vanController.deleteVan(req, res));

export default router;