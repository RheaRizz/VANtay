import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { app } from '../index';
import { Role } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

beforeEach(async () => {
  await prisma.ticket.deleteMany();
  await prisma.van.deleteMany();
  await prisma.user.deleteMany();
});

afterEach(async () => {
  await prisma.ticket.deleteMany();
  await prisma.van.deleteMany();
  await prisma.user.deleteMany();
});

describe('Users', () => {
  describe('getUsers', () => {
    it('should return all users', async () => {
      await prisma.user.createMany({
        data: [
          { email: 'user1@example.com', name: 'User One', password: 'password1', role: Role.CASHIER },
          { email: 'user2@example.com', name: 'User Two', password: 'password2', role: Role.CASHIER },
        ],
      });

      const response = await request(app).get('/api/user');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const user = await prisma.user.create({
        data: { email: 'john@example.com', name: 'John Doe', password: 'password123', role: Role.CASHIER },
      });

      const response = await request(app).get(`/api/user/${user.id}`);

      expect(response.status).toBe(200);
      expect(response.body.email).toBe('john@example.com');
    });

    it('should return 404 if user with given ID does not exist', async () => {
      const response = await request(app).get('/api/user/999');

      expect(response.status).toBe(404);
    });

    // Failing test case (intentional)
    it('should fail this test case when user does not exist', async () => {
      const response = await request(app).get('/api/user/999');

      // Intentional incorrect expectation
      expect(response.status).toBe(200);
      expect(response.body.email).toBe('nonexistent@example.com');
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const user = await prisma.user.create({
        data: { email: 'john@example.com', name: 'John Doe', password: 'password123', role: Role.CASHIER },
      });

      const response = await request(app)
        .put(`/api/user/${user.id}`)
        .send({ name: 'John Updated' });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('John Updated');
    });

    it('should verify if user was updated from the database', async () => {
      const user = await prisma.user.create({
        data: { email: 'john@example.com', name: 'John Doe', password: 'password123', role: Role.CASHIER },
      });

      await request(app)
        .put(`/api/user/${user.id}`)
        .send({ name: 'John Updated' });

      const updatedUser = await prisma.user.findUnique({
        where: { id: user.id },
      });

      expect(updatedUser).not.toBeNull();
      expect(updatedUser?.name).toBe('John Updated');
    });

    it('should return 404 if user with given ID does not exist', async () => {
      const response = await request(app)
        .put('/api/user/999')
        .send({ name: 'Nonexistent User' });

      expect(response.status).toBe(404);
    });

    // Failing test case
    it('should fail when updating with invalid data', async () => {
      const user = await prisma.user.create({
        data: { email: 'john@example.com', name: 'John Doe', password: 'password123', role: Role.CASHIER },
      });

      const response = await request(app)
        .put(`/api/user/${user.id}`)
        .send({ email: '' }); // Invalid data: email should not be empty

      expect(response.status).toBe(400); // Correct expectation for invalid data
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const user = await prisma.user.create({
        data: { email: 'john@example.com', name: 'John Doe', password: 'password123', role: Role.CASHIER },
      });

      const response = await request(app).delete(`/api/user/${user.id}`);

      expect(response.status).toBe(204);
    });

    it('should verify if user was deleted from the database', async () => {
      const user = await prisma.user.create({
        data: { email: 'john@example.com', name: 'John Doe', password: 'password123', role: Role.CASHIER },
      });

      await request(app).delete(`/api/user/${user.id}`);

      const deletedUser = await prisma.user.findUnique({
        where: { id: user.id },
      });

      expect(deletedUser).toBeNull();
    });

    it('should return 404 if user with given ID does not exist', async () => {
      const response = await request(app).delete('/api/user/999');

      expect(response.status).toBe(404);
    });
  });
});
