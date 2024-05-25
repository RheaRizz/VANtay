import { Router } from "express";
import { TicketController } from "../controllers/ticketController";

const router = Router();
const ticketController = new TicketController();

router.post("/", (request, response) => ticketController.createTicket(request, response));
router.get("/", (request, response) => ticketController.getTickets(request, response));
router.get("/:id", (request, response) => ticketController.getTicketById(request, response));
router.put("/:id", (request, response) => ticketController.updateTicket(request, response));
router.delete("/:id", (request, response) => ticketController.deleteTicket(request, response));

export default router;