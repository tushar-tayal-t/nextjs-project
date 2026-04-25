"use server";

import { revalidatePath } from "next/cache";
import { createUserSchema } from "./user.schema";
import { userService } from "./user.service";

export async function createUser(prevState: any, formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email")
    };

    const parsed = createUserSchema.safeParse(rawData);

    if (!parsed.success) {
      return {
        error: parsed.error.flatten().fieldErrors
      }
    }

    await userService.createUser(parsed.data);
    revalidatePath("/users");
    return {success: true};
  } catch(error: any) {
    if (error.message === "EMAIL_ALREADY_EXISTS") {
      return { error: "Email already exists" };
    }
    return {
      error: "Something went wrong"
    };
  }
}