"use client";
import { loginAction } from '@/modules/auth/auth.actions';
import React, { useActionState, useEffect } from 'react'

const Login = () => {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <div>
      <form action={action}>
        <input name="email" placeholder="Email"/>
        <input name="password" type="password" placeholder="Password"/> 

        <button disabled={pending}>
          {pending ? "Logging in..." : "Login"}
        </button> 
        {state?.error && <p>{state.error}</p>}
        {state?.error && <p>{state.error}</p>}
      </form>    
    </div>
  )
}

export default Login
