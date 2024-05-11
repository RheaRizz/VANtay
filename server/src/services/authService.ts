import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (name: string, email: string, password: string, role: Role) => {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
      role,
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const findUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};
