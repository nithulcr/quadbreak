import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {

    remotePatterns: [
      {
        protocol: "https",
        hostname: "hotpink-hamster-901951.hostingersite.com",
      },
    ],
  },
};

export default nextConfig;
