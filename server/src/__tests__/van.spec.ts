import request from "supertest";
import { PrismaClient } from "@prisma/client";
import { app } from "../index";
import dotenv from "dotenv";
import { Role } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();

describe("Vans", () => {
  let user1: any;
  let user2: any;

  beforeAll(async () => {
    user1 = await prisma.user.create({
      data: {
        name: "Test User 1",
        email: "testuser1@example.com",
        password: "password123",
        role: Role.CASHIER,
      },
    });

    user2 = await prisma.user.create({
      data: {
        name: "Test User 2",
        email: "testuser2@example.com",
        password: "password123",
        role: Role.ADMIN,
      },
    });
  });

  afterAll(async () => {
    await prisma.van.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.van.deleteMany();
  });

  describe("createVan", () => {
    it("should create a new van", async () => {
      const vanData = {
        model: "Test Model",
        plate_no: "ABC123",
        capacity: 12,
        userId: user1.id,
      };

      const res = await request(app).post("/api/van").send(vanData);

      expect(res.statusCode).toBe(201);
      expect(res.body).toMatchObject({
        model: vanData.model,
        plate_no: vanData.plate_no,
        capacity: vanData.capacity,
        userId: vanData.userId,
      });

      const foundVan = await prisma.van.findUnique({
        where: { id: res.body.id },
      });

      expect(foundVan).not.toBeNull();
      expect(foundVan?.model).toBe(vanData.model);
    });

    it("verifies if van was created from the database", async () => {
      const vanData = {
        model: "Test Model",
        plate_no: "XYZ789",
        capacity: 15,
        userId: user1.id,
      };

      const res = await request(app).post("/api/van").send(vanData);

      expect(res.statusCode).toBe(201);

      const foundVan = await prisma.van.findUnique({
        where: { id: res.body.id },
      });

      expect(foundVan).not.toBeNull();
      expect(foundVan?.model).toBe(vanData.model);
      expect(foundVan?.plate_no).toBe(vanData.plate_no);
      expect(foundVan?.capacity).toBe(vanData.capacity);
      expect(foundVan?.userId).toBe(vanData.userId);
    });

    it("should fail to create a new van with missing required fields", async () => {
      const incompleteVanData = {
        plate_no: "XYZ789",
        capacity: 15,
      };
      const res = await request(app).post("/api/van").send(incompleteVanData);
      expect(res.statusCode).toBe(400); // Assuming 400 Bad Request for missing required fields
      expect(res.body).toHaveProperty("error");
    }, 10000);
  });

  describe("getVans", () => {
    it("should retrieve all vans", async () => {
      const vanData1 = {
        model: "Model 1",
        plate_no: "XYZ123",
        capacity: 15,
        userId: user1.id,
      };

      const vanData2 = {
        model: "Model 2",
        plate_no: "XYZ456",
        capacity: 20,
        userId: user2.id,
      };

      await prisma.van.createMany({
        data: [vanData1, vanData2],
      });

      const res = await request(app).get("/api/van");

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
    });

    it("should return an empty array if no vans exist", async () => {
      const res = await request(app).get("/api/van");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });

    it("should handle database failures gracefully", async () => {
      const spy = jest
        .spyOn(prisma.van, "findMany")
        .mockRejectedValue(new Error("Database failure"));

      const res = await request(app).get("/api/van");

      expect(spy).toHaveBeenCalled();
      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error", "Internal Server Error");

      spy.mockRestore();
    });
  });

  describe("getVanById", () => {
    it("should retrieve a van by ID", async () => {
      const vanData = {
        model: "Test Model",
        plate_no: "XYZ789",
        capacity: 10,
        userId: user1.id,
      };

      const createdVan = await prisma.van.create({
        data: vanData,
      });

      const res = await request(app).get(`/api/van/${createdVan.id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBe(createdVan.id);
      expect(res.body.model).toBe(vanData.model);
    });

    it("should return 404 for a non-existent van", async () => {
      const res = await request(app).get(`/api/van/99999`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toMatchObject({
        message: "Van not found",
      });
    });

    it("should handle invalid ID format gracefully", async () => {
      const res = await request(app).get(`/api/van/invalid_id`);

      expect(res.statusCode).toBe(400);
      expect(res.body).toMatchObject({
        error: "Invalid ID format",
      });
    });
  });

  describe("updateVan", () => {
    it("should update a van", async () => {
      const vanData = {
        model: "Original Model",
        plate_no: "XYZ000",
        capacity: 10,
        userId: user1.id,
      };

      const createdVan = await prisma.van.create({
        data: vanData,
      });

      const updatedVanData = {
        model: "Updated Model",
      };

      const res = await request(app)
        .put(`/api/van/${createdVan.id}`)
        .send(updatedVanData);

      expect(res.statusCode).toBe(200);
      expect(res.body.model).toBe(updatedVanData.model);

      const foundVan = await prisma.van.findUnique({
        where: { id: createdVan.id },
      });

      expect(foundVan?.model).toBe(updatedVanData.model);
    });

    it("should return 404 if the van does not exist", async () => {
      const updatedVanData = {
        model: "Updated Model",
      };

      const res = await request(app)
        .put(`/api/van/99999`)
        .send(updatedVanData);

      expect(res.statusCode).toBe(404);
      expect(res.body).toMatchObject({
        message: "Van with id 99999 not found",
      });
    });

    it("verify if van was updated from database", async () => {
      const vanData = {
        model: "Original Model",
        plate_no: "XYZ000",
        capacity: 10,
        userId: user1.id,
      };

      const createdVan = await prisma.van.create({
        data: vanData,
      });

      const updatedVanData = {
        model: "Updated Model",
      };

      await request(app)
        .put(`/api/van/${createdVan.id}`)
        .send(updatedVanData);

      const foundVan = await prisma.van.findUnique({
        where: { id: createdVan.id },
      });

      expect(foundVan?.model).toBe(updatedVanData.model);
    });
  });

  describe("deleteVan", () => {
    it("should delete an existing van", async () => {
      const vanData = {
        model: "Test Model",
        plate_no: "XYZ111",
        capacity: 10,
        userId: user1.id,
      };

      const createdVan = await prisma.van.create({
        data: vanData,
      });

      const res = await request(app).delete(`/api/van/${createdVan.id}`);

      expect(res.statusCode).toBe(204);

      const foundVan = await prisma.van.findUnique({
        where: { id: createdVan.id },
      });

      expect(foundVan).toBeNull();
    });

    it("verifies if van was deleted from the database", async () => {
      const vanData = {
        model: "Test Model",
        plate_no: "XYZ111",
        capacity: 10,
        userId: user1.id,
      };

      const createdVan = await prisma.van.create({
        data: vanData,
      });

      await request(app).delete(`/api/van/${createdVan.id}`);

      const foundVan = await prisma.van.findUnique({
        where: { id: createdVan.id },
      });

      expect(foundVan).toBeNull();
    });

    it("should return 500 if an error occurs during deletion", async () => {
      const spy = jest
        .spyOn(prisma.van, "delete")
        .mockRejectedValue(new Error("Database failure"));

      const vanData = {
        model: "Test Model",
        plate_no: "XYZ111",
        capacity: 10,
        userId: user1.id,
      };

      const createdVan = await prisma.van.create({
        data: vanData,
      });

      const res = await request(app).delete(`/api/van/${createdVan.id}`);

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("error", "Internal Server Error");

      spy.mockRestore();
    });
  });
});
