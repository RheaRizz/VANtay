import request from "supertest";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { app } from "../index";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

describe("Auth API", () => {
  let userToken: string;
  let newUser: any;

  beforeAll(async () => {
    // Setup
    const hashedPassword = await bcrypt.hash("password123", 10);
    newUser = await prisma.user.create({
      data: {
        name: "Test User",
        email: "testuser@example.com",
        password: hashedPassword,
        role: "CASHIER",
      },
    });

    // Generate a JWT token for the test user
    userToken = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
  });

  afterAll(async () => {
    // Teardown
    await prisma.user.deleteMany({
      where: { email: "testuser@example.com" },
    });

    await prisma.$disconnect();
  });

  describe("POST /api/signup", () => {
    it("should create a new user", async () => {
      // Invocation
      const response = await request(app).post("/api/signup").send({
        name: "New User",
        email: "newuser@example.com",
        password: "password123",
        role: "CASHIER",
      });

      // Assessment
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        "message",
        "User created successfully"
      );
      expect(response.body.user).toHaveProperty("email", "newuser@example.com");
    });

    it("should verify the user is created in database", async () => {
      // Verification
      const newUserInDB = await prisma.user.findUnique({
        where: { email: "newuser@example.com" },
      });
      expect(newUserInDB).toBeTruthy();
    });

    it("should delete the new user from database", async () => {
      // Cleanup/Teardown
      await prisma.user.delete({
        where: { email: "newuser@example.com" },
      });

      // Verification
      const deletedUser = await prisma.user.findUnique({
        where: { email: "newuser@example.com" },
      });
      expect(deletedUser).toBeNull();
    });


    it("should fail to create a new user with incomplete data", async () => {
      // Invocation
      const response = await request(app).post("/api/signup").send({
        name: "Incomplete User",
        password: "password123",
        role: "CASHIER",
      });
  
      // Assessment
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "Incomplete data");
    });
  
    it("should fail to create a new user with invalid role", async () => {
      // Invocation
      const response = await request(app).post("/api/signup").send({
        name: "Invalid Role User",
        email: "invalidrole@example.com",
        password: "password123",
        role: "INVALID_ROLE",
      });
  
      // Assessment
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "Invalid role");
    });
  });

  describe("POST /api/login", () => {
    it("should login the user and return a token", async () => {
      try {
        // Invocation
        const response = await request(app).post("/api/login").send({
          email: "testuser@example.com",
          password: "password123",
        });

        console.log("Login Response:", response.body);

        // Assessment
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");

        // Verification
        const decodedToken: any = jwt.verify(response.body.token, JWT_SECRET);
        expect(decodedToken.userId).toBe(newUser.id);
      } catch (error) {
        console.error("Login Test Error:", error);
        throw error;
      }
    });

    it("should fail to login with incorrect password", async () => {
      // Invocation
      const response = await request(app).post("/api/login").send({
        email: "testuser@example.com",
        password: "incorrectpassword",
      });
  
      // Assessment
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "Login failed");
    });
  
    it("should fail to login with non-existent email", async () => {
      // Invocation
      const response = await request(app).post("/api/login").send({
        email: "nonexistentuser@example.com",
        password: "password123",
      });
  
      // Assessment
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "Login failed");
    });
  });

  describe("GET /api/profile", () => {
    it("should return the user's profile", async () => {
      // Invocation
      const response = await request(app)
        .get("/api/profile")
        .set("Authorization", `Bearer ${userToken}`);

      // Assessment
      expect(response.status).toBe(200);
      expect(response.body.user).toHaveProperty(
        "email",
        "testuser@example.com"
      );

      // Verification
      expect(response.body.user.id).toBe(newUser.id);
      expect(response.body.user.name).toBe("Test User");
    });

    it("should return unauthorized without token", async () => {
      // Invocation
      const response = await request(app).get("/api/profile");

      // Assessment
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "Unauthorized");
    });

    it("should return an error for expired token", async () => {
      // Expired Token for Testing
      const expiredToken = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
        expiresIn: "-1s",
      });

      // Invocation
      const response = await request(app)
        .get("/api/profile")
        .set("Authorization", `Bearer ${expiredToken}`);

      // Assessment
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "Invalid or expired token");
    });

    it("should fail to return the user's profile with no token", async () => {
      // Invocation
      const response = await request(app).get("/api/profile");
  
      // Assessment
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "Token not provided");
    });
  
    it("should fail to return the user's profile with an incorrect token format", async () => {
      const incorrectToken = "incorrect_format_token";
  
      // Invocation
      const response = await request(app)
        .get("/api/profile")
        .set("Authorization", `Bearer ${incorrectToken}`);
  
      // Assessment
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error", "Invalid token format");
    });
  });
})
 
