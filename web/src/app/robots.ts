
import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://devlog-delta-black.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",

      allow: [
        "/",
        "/design",
        "/built-by",
        "/projects",
        "/devlogs",
        "/u/",
      ],

      disallow: [
        "/coming-soon",
        "/feed",
        "/profile",
        "/onboarding",
        "/sign-in",
        "/api/",
        "/projects/new",
        "/devlogs/new",
      ],
    },

    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
