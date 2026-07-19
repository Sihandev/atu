import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: ".site-out",
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
