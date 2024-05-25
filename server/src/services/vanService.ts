import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class VanService {
  async createVan(data: any) {
    try {
      return await prisma.van.create({
        data,
      });
    } catch (error: any) {
      throw new Error(`Error in createVan: ${error.message}`);
    }
  }

  async getVans() {
    try {
      return await prisma.van.findMany();
    } catch (error: any) {
      throw new Error(`Error in getVans: ${error.message}`);
    }
  }

  async getVanById(id: number) {
    try {
      return await prisma.van.findUnique({
        where: { id },
      });
    } catch (error: any) {
      throw new Error(`Error in getVanById: ${error.message}`);
    }
  }

  async updateVan(id: number, data: any) {
    try {
      return await prisma.van.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      throw new Error(`Error in updateVan: ${error.message}`);
    }
  }

  async deleteVan(id: number) {
    try {
      return await prisma.van.delete({
        where: { id },
      });
    } catch (error: any) {
      throw new Error(`Error in deleteVan: ${error.message}`);
    }
  }
}