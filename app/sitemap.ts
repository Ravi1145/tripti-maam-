import type { MetadataRoute } from "next";
import { getEvents, getPosts } from "@/lib/content";
import { P } from "@/lib";

export const dynamic = "force-static";

const routes = ["", "about", "services", "playxploration", "foundation-years-first", "blog", "gallery", "writing", "speaking", "faq", "contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = P.site.url;
  return [
    ...routes.map((r) => ({ url: `${base}/${r ? r + "/" : ""}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: r === "" ? 1 : 0.7 })),
    ...getPosts().map((p) => ({ url: `${base}/blog/${p.slug}/`, lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.6 })),
    ...getEvents().map((e) => ({ url: `${base}/gallery/${e.slug}/`, lastModified: new Date(e.date), changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
