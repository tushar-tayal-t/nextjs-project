import { getCurrentUser } from "@/modules/auth/auth.service";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = getCurrentUser();

  if (!user) redirect("/login");

  return <h1>Welcome user</h1>;
}