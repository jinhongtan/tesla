import { auth } from "./auth";
import { headers } from "next/headers";
import { cache } from "react";

export const getSession = cache(async () => {
  const headersList = await headers();
  
  const session = await auth.api.getSession({
    headers: headersList,
  });
  
  return session;
});

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  return session?.user || null;
});

export const requireAuth = async () => {
  const session = await getSession();
  if (!session) {
    throw new Error("Not authenticated");
  }
  return session;
};