import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const createUser = async (name: string, email: string, password: string, role: Role) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });
    return { error: null, data: newUser };
  } catch (error) {
    return { error: "Failed to create user", data: null };
  }
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

export const login = async (email: string, password: string) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return { error: "User not found", data: null };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return { error: "Invalid credentials", data: null };
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
    return { error: null, data: { token } };
  } catch (error) {
    return { error: "Login failed", data: null };
  }
};

export const getProfile = async (token: string) => {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: number };
    const user = await findUserById(decodedToken.userId);
    if (!user) {
      return { error: "User not found", data: null };
    }
    return { error: null, data: { user } };
  } catch (error) {
    return { error: "Invalid or expired token", data: null };
  }
};