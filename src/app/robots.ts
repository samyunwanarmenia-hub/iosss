import { MetadataRoute } from "next";
import { SITE_URL } from "@/config/siteConfig";

export default function robots(): MetadataRoute.Robots {
  const host = new URL(SITE_URL).host;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",        // internal API routes
          "/private/",    // if you ever add protected pages
        ],
      },
    ],
    sitemap: "https://samyun-wan.life/sitemap.xml",
    host,
  };
}
