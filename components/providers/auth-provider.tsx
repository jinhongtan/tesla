"use client";

import { ReactNode } from "react";
// No special Provider is required by the base Better-Auth client, 
// but wrapping your app ensures the client-side hooks initialize correctly.

export function AuthProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}