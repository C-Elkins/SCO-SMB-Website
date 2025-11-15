import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel serverless deployment - removed static export
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },
};

export default nextConfig;
