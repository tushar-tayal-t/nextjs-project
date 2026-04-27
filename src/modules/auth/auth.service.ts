import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {email}
  });

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Invalid credentials");

  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const token = await new SignJWT({ id: user.id})
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);

  return {token, user};
}

export async function verifyToken(token?: string) {
  try {
    if (!token) return null;

    const secret = new TextEncoder().encode(JWT_SECRET);
    return (await jwtVerify(token, secret));
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const token = (await cookies()).get("token")?.value;

  const payload = verifyToken(token);

  return payload;
}