import request from "supertest";
import { PrismaClient } from "@prisma/client";
import { app } from "../index";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

describe("Trips", () => {
  let user: any;
  let van: any;

  beforeAll(async () => {
    user = await prisma.user.create({
      data: {
        name: "Admin User",
        role: "ADMIN",
        email: "admin@example.com",
        password: "password",
      },
    });

    van = await prisma.van.create({
      data: {
        model: "Van Model",
        plate_no: "XYZ123",
        capacity: 12,
        userId: user.id,
      },
    });
  });

  afterAll(async () => {
    await prisma.van.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.trip.deleteMany();
  });

  describe("createTrip", () => {
    it("should create a trip", async () => {
      // Setup
      const tripData = {
        standby_time: new Date().toISOString(),
        departure_time: new Date().toISOString(),
        destination: "New York",
        driver_name: "John Doe",
        vanId: van.id,
      };

      // Invocation
      const res = await request(app).post("/api/trip").send(tripData);

      // Assessment
      expect(res.statusCode).toBe(201);
      expect(res.body).toMatchObject({
        destination: tripData.destination,
        driver_name: tripData.driver_name,
        vanId: tripData.vanId,
      });

      // Verify in database
      const foundTrip = await prisma.trip.findUnique({
        where: { id: res.body.id },
      });

      expect(foundTrip).not.toBeNull();
      expect(foundTrip?.destination).toBe(tripData.destination);
      expect(foundTrip?.driver_name).toBe(tripData.driver_name);
    });

    it("should verify a trip is created in the database", async () => {
      // Setup
      const tripData = {
        standby_time: new Date().toISOString(),
        departure_time: new Date().toISOString(),
        destination: "New York",
        driver_name: "John Doe",
        vanId: van.id,
      };

      // Invocation
      const res = await request(app).post("/api/trip").send(tripData);

      // Verify in database
      const createdTrip = await prisma.trip.findUnique({
        where: { id: res.body.id },
      });

      expect(createdTrip).not.toBeNull();
      expect(createdTrip?.destination).toBe(tripData.destination);
      expect(createdTrip?.driver_name).toBe(tripData.driver_name);
      expect(createdTrip?.vanId).toBe(tripData.vanId);
    });

    it("should fail to create a trip without a destination", async () => {
      // Setup
      const invalidTripData = {
        standby_time: new Date().toISOString(),
        departure_time: new Date().toISOString(),
        // Missing destination
        driver_name: "John Doe",
        vanId: van.id,
      };

      // Invocation
      const res = await request(app).post("/api/trip").send(invalidTripData);

      // Assessment
      expect(res.statusCode).toBe(400);
      expect(res.body).toMatchObject({
        error: "Destination is required",
      });
    });
  });

  describe("getTrips", () => {
    it("should return all trips", async () => {
      // Setup
      const tripData1 = {
        standby_time: new Date().toISOString(),
        departure_time: new Date().toISOString(),
        destination: "New York",
        driver_name: "John Doe",
        vanId: van.id,
      };

      const tripData2 = {
        standby_time: new Date().toISOString(),
        departure_time: new Date().toISOString(),
        destination: "Los Angeles",
        driver_name: "Jane Doe",
        vanId: van.id,
      };

      await prisma.trip.createMany({
        data: [tripData1, tripData2],
      });

      // Invocation
      const res = await request(app).get("/api/trip");

      // Assessment
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
    });

    it("should return an empty array if no trips exist", async () => {
      // Invocation
      const res = await request(app).get("/api/trip");

      // Assessment
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });

    it("should return a 500 status code if there is a server error", async () => {
      // Simulate a server error
      const originalFindMany = prisma.trip.findMany;
      prisma.trip.findMany = jest.fn().mockImplementation(() => {
        throw new Error("Database connection error");
      });

      // Invocation
      const res = await request(app).get("/api/trip");

      // Assessment
      expect(res.statusCode).toBe(500);
      expect(res.body).toMatchObject({
        error: "Internal Server Error",
      });

      prisma.trip.findMany = originalFindMany;
    });
  });

  describe("getTripById", () => {
    it("should return a trip by ID", async () => {
      // Setup
      const tripData = {
        standby_time: new Date().toISOString(),
        departure_time: new Date().toISOString(),
        destination: "New York",
        driver_name: "John Doe",
        vanId: van.id,
      };

      const createdTrip = await prisma.trip.create({
        data: tripData,
      });

      // Invocation
      const res = await request(app).get(`/api/trip/${createdTrip.id}`);

      // Assessment
      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBe(createdTrip.id);
      expect(res.body.destination).toBe(tripData.destination);
      expect(res.body.driver_name).toBe(tripData.driver_name);
    });

    it("should return an error if id does not exist", async () => {
      // Setup
      const nonExistentId = 99999;

      // Invocation
      const res = await request(app).get(`/api/trip/${nonExistentId}`);

      // Assessment
      expect(res.statusCode).toBe(404);
      expect(res.body).toMatchObject({
        error: "Trip not found",
      });
    });

    it("should return a server error if id is malformed", async () => {
      // Setup
      const malformedId = "invalid_id"; 

      // Invocation
      const res = await request(app).get(`/api/trip/${malformedId}`);

      // Assessment
      expect(res.statusCode).toBe(500); 
      expect(res.body).toMatchObject({
        error: "Internal Server Error",
      });
    });
  });

  describe("updateTrip", () => {
    it("should update an existing trip", async () => {
      // Setup
      const tripData = {
        standby_time: new Date().toISOString(),
        departure_time: new Date().toISOString(),
        destination: "New York",
        driver_name: "John Doe",
        vanId: van.id,
      };

      const createdTrip = await prisma.trip.create({
        data: tripData,
      });

      const updatedTripData = {
        destination: "Boston",
        standby_time: new Date().toISOString(),
        departure_time: new Date().toISOString(),
        driver_name: "John Doe",
        vanId: van.id,
      };

      // Invocation
      const res = await request(app)
        .put(`/api/trip/${createdTrip.id}`)
        .send(updatedTripData);

      // Assessment
      expect(res.statusCode).toBe(200);
      expect(res.body.destination).toBe(updatedTripData.destination);

      // Verify in database
      const foundTrip = await prisma.trip.findUnique({
        where: { id: createdTrip.id },
      });

      expect(foundTrip?.destination).toBe(updatedTripData.destination);
    });

    it("should verify if trip was updated from the database", async () => {
      // Setup
      const tripData = {
        standby_time: new Date().toISOString(),
        departure_time: new Date().toISOString(),
        destination: "New York",
        driver_name: "John Doe",
        vanId: van.id,
      };

      const createdTrip = await prisma.trip.create({
        data: tripData,
      });

      const updatedTripData = {
        destination: "Boston",
        standby_time: new Date().toISOString(),
        departure_time: new Date().toISOString(),
      };

      // Invocation
      await request(app)
        .put(`/api/trip/${createdTrip.id}`)
        .send(updatedTripData);

      // Verify in database
      const updatedTrip = await prisma.trip.findUnique({
        where: { id: createdTrip.id },
      });

      expect(updatedTrip).not.toBeNull();
      expect(updatedTrip?.destination).toBe(updatedTripData.destination);
    });

    it("should return an error if the trip ID does not exist", async () => {
      // Setup
      const nonExistentId = 99999; 
      const updatedTripData = {
        destination: "Boston",
        standby_time: new Date().toISOString(),
        departure_time: new Date().toISOString(),
      };

      // Invocation
      const res = await request(app)
        .put(`/api/trip/${nonExistentId}`)
        .send(updatedTripData);

      // Assessment
      expect(res.statusCode).toBe(404); 
      expect(res.body).toMatchObject({
        error: "Trip not found",
      });
    });

    it("should return a server error if the trip ID is malformed", async () => {
      // Setup
      const malformedId = "invalid_id"; 
      const updatedTripData = {
        destination: "Boston",
        standby_time: new Date().toISOString(),
        departure_time: new Date().toISOString(),
      };

      // Invocation
      const res = await request(app)
        .put(`/api/trip/${malformedId}`)
        .send(updatedTripData);

      // Assessment
      expect(res.statusCode).toBe(500); 
      expect(res.body).toMatchObject({
        error: "Internal Server Error",
      });
    });
  });

  describe("deleteTrip", () => {
    it("should delete a trip", async () => {
      // Setup
      const tripData = {
        standby_time: new Date().toISOString(),
        departure_time: new Date().toISOString(),
        destination: "New York",
        driver_name: "John Doe",
        vanId: van.id,
      };

      const createdTrip = await prisma.trip.create({
        data: tripData,
      });

      // Invocation
      const res = await request(app).delete(`/api/trip/${createdTrip.id}`);

      // Assessment
      expect(res.statusCode).toBe(204);

      // Verify in database
      const foundTrip = await prisma.trip.findUnique({
        where: { id: createdTrip.id },
      });

      expect(foundTrip).toBeNull();
    });

    it("should return an error if the trip ID does not exist", async () => {
      // Setup
      const nonExistentId = 99999; 

      // Invocation
      const res = await request(app).delete(`/api/trip/${nonExistentId}`);

      // Assessment
      expect(res.statusCode).toBe(404); 
      expect(res.body).toMatchObject({
        error: "Trip not found",
      });
    });

    it("should return a server error if the trip ID is malformed", async () => {
      // Setup
      const malformedId = "invalid_id"; 

      // Invocation
      const res = await request(app).delete(`/api/trip/${malformedId}`);

      // Assessment
      expect(res.statusCode).toBe(500); 
      expect(res.body).toMatchObject({
        error: "Internal Server Error",
      });
    });

    it("should verify if trip was deleted from the database", async () => {
      // Setup
      const tripData = {
        standby_time: new Date().toISOString(),
        departure_time: new Date().toISOString(),
        destination: "New York",
        driver_name: "John Doe",
        vanId: van.id,
      };
    
      const createdTrip = await prisma.trip.create({
        data: tripData,
      });
    
      // Invocation
      await request(app).delete(`/api/trip/${createdTrip.id}`);
    
      // Verify in database
      const deletedTrip = await prisma.trip.findUnique({
        where: { id: createdTrip.id },
      });
    
      expect(deletedTrip).toBeNull();
    });
  });
});
