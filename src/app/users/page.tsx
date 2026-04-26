"use client";

import { createUser } from "@/modules/user/user.action";
import { useActionState, useOptimistic, useState } from "react";

const Users = () => {
  const [state, action, pending] = useActionState(createUser, null);
  const [optimisticUsers, addOptimisticUser] = useOptimistic(
    [],
    (state: any, newUser: any) => [...state, newUser]
  );

  async function handleSubmit(formData: FormData) {
    const name = formData.get("name");
    const email = formData.get("email");

    const optimisticUser = {
      id: crypto.randomUUID(),
      name,
      email,
    };

    addOptimisticUser(optimisticUser);
    action(formData);
  }

  return (
    <>
      <form action={handleSubmit} className="flex flex-col gap-2 max-w-100">
        <input name="name" placeholder="Name"/>
        <input name="email" placeholder="Email"/>

        <button disabled={pending} className="bg-blue-400 p-3">
          {
            pending ? "Creating..." : "Create User"
          }
        </button>

        {state?.error && <p>{JSON.stringify(state.error)}</p>}
        {state?.success && <p>User created</p>}
      </form>
      <div>
        {optimisticUsers.map((u) => (
          <p key={u.id}>{u.name}</p>
        ))}
      </div>
    </>
  )
}

export default Users 
