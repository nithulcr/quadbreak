import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow Cloudinary full domain (all paths)
    domains: ["res.cloudinary.com"],
    // Allow Strapi-served uploads (local + Railway)
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "terrahstrapirailway-production.up.railway.app",
        // no port needed; Railway handles TLS on 443
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
