import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

async function fun1() {
  const hash = await bcrypt.hash("password", 10);
  const user = await prisma.user.create({
    data: {
      email: "tushar@gmail.com",
      name: "tushar",
      password: hash
    }
  });

  console.log(user);
}

fun1();