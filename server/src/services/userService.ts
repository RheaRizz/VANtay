import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserService {
  async getUsers() {
    try {
      return await prisma.user.findMany();
    } catch (error: any) {
      throw new Error(`Error in getUsers: ${error.message}`);
    }
  }

  async getUserById(id: number) {
    try {
      return await prisma.user.findUnique({
        where: { id },
      });
    } catch (error: any) {
      throw new Error(`Error in getUserById: ${error.message}`);
    }
  }

  async updateUser(id: number, data: any) {
    try {
      return await prisma.user.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      throw new Error(`Error in updateUser: ${error.message}`);
    }
  }

  async deleteUser(id: number) {
    try {
      return await prisma.user.delete({
        where: { id },
      });
    } catch (error: any) {
      throw new Error(`Error in deleteUser: ${error.message}`);
    }
  }
}