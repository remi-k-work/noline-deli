import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    // Keep optimizer cache hot for stable product/brand assets (default is only 1h).
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Trim variant cardinality: thumbs render at 48-256px, PDP max ~640px.
    deviceSizes: [640, 1080],
    imageSizes: [64, 128, 256],
    formats: ["image/webp"],
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
