"use server";

import { redirect } from "next/navigation";
import { loginUserSchema } from "./auth.schema";
import { loginUser } from "./auth.service";
import { cookies } from "next/headers";

export async function loginAction(_: any, formData: FormData) {
  try {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password")
    };
    const parsedData = await loginUserSchema.safeParse(rawData);
    if (!parsedData.success) {
      return {
        error: parsedData.error.flatten().fieldErrors
      }
    }
    const {token} = await loginUser(parsedData.data.email, parsedData.data.password);
    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: true,
      path: "/"
    });
  } catch(error: any) {
    return {error: error.message}
  }
  redirect("/dashboard");
}