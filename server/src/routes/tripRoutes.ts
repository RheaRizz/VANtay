import { Router } from "express";
import { TripController } from "../controllers/tripController";

const router = Router();
const tripController = new TripController();

router.post("/", (request, response) => tripController.createTrip(request, response));
router.get("/", (request, response) => tripController.getTrips(request, response));
router.get("/:id", (request, response) => tripController.getTripById(request, response));
router.put("/:id", (request, response) => tripController.updateTrip(request, response));
router.delete("/:id", (request, response) => tripController.deleteTrip(request, response));

export default router;