"use client";

import { createUser } from "@/modules/user/user.action";
import { useActionState } from "react";

const Users = () => {
  const [state, action, pending] = useActionState(createUser, null);

  return (
    <form action={action} className="flex flex-col gap-2 max-w-100">
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
  )
}

export default Users 
