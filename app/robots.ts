import type { MetadataRoute } from "next";
import { P } from "@/lib";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin/", "/api/"] }],
    sitemap: `${P.site.url}/sitemap.xml`,
    host: P.site.url,
  };
}
