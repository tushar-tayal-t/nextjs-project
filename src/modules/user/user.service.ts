import { prisma } from "@/lib/prisma";
import { createUserType } from "./user.schema";

export const userService = {
  async createUser(data: createUserType) {
    try {
      return await prisma.user.create({
        data
      });
    } catch(error: any) {
      if (error.code === "P2002") {
        throw new Error("EMAIL_ALREADY_EXISTS");
      }
      throw error;
    }
  }
}