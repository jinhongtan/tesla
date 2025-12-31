import { createAuthClient } from "better-auth/react";


export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});


// Explicitly cast to the server's type to expose emailAndPassword methods
export type AuthClient = typeof authClient;

export const { signIn, signUp, signOut, useSession, verifyEmail, resetPassword} = authClient;


