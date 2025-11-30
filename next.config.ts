import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack config (Next.js 16 default)
  turbopack: {},
  
  // Webpack config for production builds (when not using Turbopack)
  webpack: (config, { isServer }) => {
    // Handle pdfjs-dist worker in Next.js
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        canvas: false,
      };
    }
    return config;
  },
};

export default nextConfig;
