import request from "supertest";
import { PrismaClient } from "@prisma/client";
import { app } from "../index";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

describe("Ticket API", () => {
  let ticketId: number;
  let tripId: number;
  let vanId: number;
  let userId: number;

  beforeAll(async () => {
    // Setup: Create van, user, and trip for testing
    const vanResponse = await prisma.van.create({
      data: {
        plate_no: "TEST123",
        model: "Test Van",
        capacity: 12,
        user: {
          create: {
            name: "Test User",
            email: `testuser_${Date.now()}@example.com`,
            password: "password",
            role: "CASHIER",
          },
        },
      },
      include: { user: true },
    });
    vanId = vanResponse.id;
    userId = vanResponse.user.id;

    const tripResponse = await prisma.trip.create({
      data: {
        standby_time: new Date(),
        departure_time: new Date(),
        destination: "Test Destination",
        driver_name: "Test Driver",
        vanId: vanId,
      },
    });
    tripId = tripResponse.id;

    const ticketResponse = await request(app).post("/api/ticket").send({
      passenger_name: "Test Passenger",
      passenger_classification: "Adult",
      passenger_address: "123 Test St",
      passenger_phone_no: "123-456-7890",
      date: new Date(),
      destination: "Test Destination",
      seat_no: 1,
      fare: 50,
      vanId: vanId,
      userId: userId,
      tripId: tripId,
    });

    ticketId = ticketResponse.body.id;
  });

  // Teardown
  afterAll(async () => {
    await prisma.ticket.deleteMany({ where: {} });
    await prisma.trip.deleteMany({ where: {} });
    await prisma.van.deleteMany({ where: {} });
    await prisma.user.deleteMany({ where: {} });

    await prisma.$disconnect();
  });

  describe("POST /api/ticket", () => {
    it("should create a new ticket with tripId", async () => {
      // Invocation: Create a new ticket with tripId
      const response = await request(app).post("/api/ticket").send({
        passenger_name: "Another Passenger",
        passenger_classification: "Adult",
        passenger_address: "789 Test Blvd",
        passenger_phone_no: "555-666-7777",
        date: new Date(),
        destination: "Another Destination",
        seat_no: 3,
        fare: 80,
        vanId,
        userId,
        tripId,
      });

      // Assessment
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
    });

    it("should verify the ticket is created in the database", async () => {
      // Invocation
      const response = await request(app).post("/api/ticket").send({
        passenger_name: "Verify Passenger",
        passenger_classification: "Adult",
        passenger_address: "789 Test Blvd",
        passenger_phone_no: "555-666-7777",
        date: new Date(),
        destination: "Verify Destination",
        seat_no: 4,
        fare: 70,
        vanId,
        userId,
        tripId,
      });

      // Assessment
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");

      // Verification
      const createdTicket = await prisma.ticket.findUnique({
        where: { id: response.body.id },
      });
      expect(createdTicket).toBeTruthy();
      expect(createdTicket?.passenger_name).toBe("Verify Passenger");
    });

    it("should fail to create a new ticket with missing required fields", async () => {
      // Invocation
      const response = await request(app).post("/api/ticket").send({
        // Missing required fields 
      });

      // Assessment
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "Missing required fields");
    });

    it("should fail to create a new ticket with invalid input data", async () => {
      // Invocation
      const response = await request(app).post("/api/ticket").send({
        passenger_name: "Invalid Passenger",
        passenger_classification: "Unknown", 
      });

      // Assessment
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "Invalid input data");
    });

    it("should fail to create a new ticket without tripId", async () => {
      // Invocation
      const response = await request(app).post("/api/ticket").send({
        passenger_name: "New Passenger",
        passenger_classification: "Child",
        passenger_address: "456 Test Ave",
        passenger_phone_no: "987-654-3210",
        date: new Date(),
        destination: "New Destination",
        seat_no: 2,
        fare: 40,
        vanId,
        userId,
      });

      // Assessment
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "error",
        "TripId is required to create a ticket"
      );
    });
  });

  describe("PUT /api/ticket/:id", () => {
    it("should update an existing ticket", async () => {
      // Invocation
      const response = await request(app).put(`/api/ticket/${ticketId}`).send({
        passenger_name: "Updated Passenger",
        passenger_classification: "Adult",
        passenger_address: "789 Test Blvd",
        passenger_phone_no: "111-222-3333",
        date: new Date(),
        destination: "Updated Destination",
        seat_no: 3,
        fare: 60,
        vanId,
        userId,
      });

      // Assessment
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", ticketId);
    });

    it("should verify the ticket is updated in the database", async () => {
      // Verification
      const updatedTicket = await prisma.ticket.findUnique({
        where: { id: ticketId },
      });

      expect(updatedTicket).toBeTruthy();
      expect(updatedTicket?.passenger_name).toBe("Updated Passenger");
    });

    it("should fail to update a non-existing ticket", async () => {
      // Invocation
      const response = await request(app).put("/api/ticket/9999").send({
        // Updated ticket data
        passenger_name: "Updated Passenger",
        passenger_classification: "Adult",
        passenger_address: "789 Test Blvd",
        passenger_phone_no: "111-222-3333",
        date: new Date(),
        destination: "Updated Destination",
        seat_no: 3,
        fare: 60,
        vanId,
        userId,
      });

      // Assessment
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error", "Ticket not found");
    });

    it("should fail to update a ticket with invalid input data", async () => {
      // Invocation
      const response = await request(app).put(`/api/ticket/${ticketId}`).send({
        passenger_name: "", // Invalid empty passenger_name
        passenger_classification: "Adult",
        passenger_address: "789 Test Blvd",
        passenger_phone_no: "111-222-3333",
        date: new Date(),
        destination: "Updated Destination",
        seat_no: 3,
        fare: 60,
        vanId,
        userId,
      });

      // Assessment
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "Invalid input data");
    });
  });

  describe("DELETE /api/ticket/:id", () => {
    it("should delete an existing ticket", async () => {
      // Invocation
      const response = await request(app).delete(`/api/ticket/${ticketId}`);

      // Assessment
      expect(response.status).toBe(204);

      // Verification
      const deletedTicket = await prisma.ticket.findUnique({
        where: { id: ticketId },
      });
      expect(deletedTicket).toBeNull();
    });

    it("should verify the ticket is deleted in the database", async () => {
      // Verification
      const deletedTicket = await prisma.ticket.findUnique({
        where: { id: ticketId },
      });
      expect(deletedTicket).toBeNull();
    });

    it("should fail to delete a ticket without proper authorization", async () => {
      // Setup
      const newTicketResponse = await request(app).post("/api/ticket").send({
        passenger_name: "Test Passenger",
        passenger_classification: "Adult",
        passenger_address: "123 Test St",
        passenger_phone_no: "123-456-7890",
        date: new Date(),
        destination: "Test Destination",
        seat_no: 1,
        fare: 50,
        vanId: vanId,
        userId: userId,
        tripId: tripId,
      });
      const newTicketId = newTicketResponse.body.id;

      // Invocation
      const response = await request(app).delete(`/api/ticket/${newTicketId}`);

      // Assessment
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "Unauthorized");
    });

    it("should fail to delete a non-existing ticket", async () => {
      // Invocation
      const response = await request(app).delete("/api/ticket/9999");

      // Assessment
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error", "Ticket not found");
    });
  });

  describe("GET /api/ticket", () => {
    it("should get all tickets", async () => {
      // Invocation
      const response = await request(app).get("/api/ticket");

      // Assessment
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("should fail to get a ticket with invalid ID", async () => {
      // Setup
      const invalidTicketId = "invalid_ticket_id";

      // Invocation
      const response = await request(app).get(`/api/ticket/${invalidTicketId}`);

      // Assessment
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error", "Ticket not found");
    });
  });
});
