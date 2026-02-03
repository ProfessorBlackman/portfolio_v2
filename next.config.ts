import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
  distDir: ".next",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
