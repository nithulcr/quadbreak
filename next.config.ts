import type { NextConfig } from "next";

const wordpressUrl =
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  "https://hotpink-hamster-901951.hostingersite.com";

let wordpressHostname = "hotpink-hamster-901951.hostingersite.com";

try {
  wordpressHostname = new URL(wordpressUrl).hostname;
} catch {
  // Keep the default host when the environment value is malformed.
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: wordpressHostname,
      },
    ],
  },
};

export default nextConfig;
