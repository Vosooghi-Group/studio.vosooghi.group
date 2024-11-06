import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/sanity",
    },
    sitemap: "https://studio.vosooghi.group/sitemap.xml",
  };
}
