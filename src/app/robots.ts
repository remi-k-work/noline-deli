import type { MetadataRoute } from "next";

// Portfolio demo only — discovery happens via remiforge.dev.
// Block all crawlers here to protect Vercel Hobby bandwidth (paired with WAF Challenge + rate-limit).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
