import type { MetadataRoute } from "next";
import { ageSlugs, articleSlugs, eventSlugs, getArticle, getEvent } from "@/lib/content";
import { P } from "@/lib";
import { LOCALES, LOCALE_INFO, localePath } from "@/lib/i18n";

export const dynamic = "force-static";

const routes = ["", "about", "work-with-schools", "playxploration", "foundation-years-first", "for-parents", "for-educators", "ages", "articles", "play", "anubhuti", "how-we-write", "self-check", "speaking", "gallery", "unseen-curriculum", "faq", "contact"];

type Entry = MetadataRoute.Sitemap[number];

/** One entry per language, each pointing at all its translations (hreflang). */
function entry(path: string, lastModified: Date, changeFrequency: Entry["changeFrequency"], priority: number): Entry[] {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[LOCALE_INFO[l].htmlLang.split("-")[0]] = `${P.site.url}${localePath(l, path)}`;
  return LOCALES.map((l) => ({ url: `${P.site.url}${localePath(l, path)}`, lastModified, changeFrequency, priority, alternates: { languages } }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...routes.flatMap((r) => entry(`/${r ? r + "/" : ""}`, now, "monthly", r === "" ? 1 : 0.7)),
    ...ageSlugs().flatMap((s) => entry(`/ages/${s}/`, now, "monthly", 0.7)),
    ...articleSlugs().flatMap((s) => entry(`/articles/${s}/`, new Date(getArticle(s)?.date || now), "yearly", 0.6)),
    ...eventSlugs().flatMap((s) => { const d = getEvent(s)?.date; return entry(`/gallery/${s}/`, d ? new Date(d) : now, "yearly", 0.5); }),
  ];
}
