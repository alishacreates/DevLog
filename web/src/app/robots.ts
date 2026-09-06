import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/design", "/built-by"],
      disallow: [
        "/coming-soon",
        "/feed",
        "/projects",
        "/devlogs",
        "/profile",
        "/onboarding",
        "/sign-in",
        "/api/",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}