import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   experimental: {
    serverComponentsExternalPackages: ["better-auth"],
  },
};

export default nextConfig;
