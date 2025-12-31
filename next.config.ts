// next.config.ts (or next.config.js)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ CORRECT: Use serverExternalPackages instead of serverComponentsExternalPackages
  serverExternalPackages: ["better-auth"],
  
  // ✅ Output configuration
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,
  
  // ✅ For static exports if needed
  // output: 'export', // Only if you want a static site
  
  // ✅ Image optimization
  images: {
    unoptimized: process.env.NODE_ENV === "production",
  },
  
  // ✅ Enable React Strict Mode
  reactStrictMode: true,
  
  // ✅ Enable SWC minification
  swcMinify: true,
  
  // ✅ Optional: Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // ✅ Optional: Disable TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;