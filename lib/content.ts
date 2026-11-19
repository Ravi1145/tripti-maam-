import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { DEFAULT_LOCALE, type Locale } from "./i18n";

/**
 * Content loader. Every piece of content has one file per language:
 *   content/articles/<slug>.en.md   .hi.md   .mr.md
 *   content/ages.en.json            .hi.json .mr.json   (same for faq, selfcheck)
 * English is the master. A translation file only needs the fields that change;
 * anything missing falls back to English, and `translated` says whether a real translation exists.
 */
const ROOT = path.join(process.cwd(), "content");
type Tint = "violet" | "coral" | "sky" | "sun" | "mint" | "saffron";

/** Topics used to filter and colour-code the article library. `label` is an English key for t(). */
export const ABILITIES: Record<string, { label: string; tint: Tint }> = {
  "communication-and-language": { label: "Communication and language", tint: "sky" },
  "thinking-and-problem-solving": { label: "Thinking and problem-solving", tint: "violet" },
  "relationships-and-participation": { label: "Relationships and participation", tint: "coral" },
  "attention-and-persistence": { label: "Attention and persistence", tint: "sun" },
  "early-reading-writing-and-maths": { label: "Early reading, writing and maths", tint: "mint" },
  "big-ideas": { label: "Big ideas", tint: "saffron" },
};

export type Article = {
  slug: string; title: string; date: string; excerpt: string; cover?: string; tags: string[]; author: string;
  ages: string[]; ability: string; reviewed: boolean; translated: boolean; seoTitle?: string; seoDescription?: string; body: string; readingMinutes: number;
};
export type EventItem = {
  slug: string; title: string; date: string; location: string; summary: string; cover?: string; translated: boolean;
  photos: { image: string; caption?: string }[]; body: string;
};
export type AgeGuide = {
  slug: string; label: string; short: string; stage: Tint; title: string; moment: string;
  tryTitle: string; tryText: string; lookText: string; shareText: string; article: string;
};
export type Faq = { question: string; answer: string };
export type SelfCheck = {
  reviewed: boolean; title: string; intro: string; scale: string[];
  areas: { key: string; label: string; tint: Tint; advice: string }[];
  questions: { area: string; text: string }[];
};

const file = (rel: string) => path.join(ROOT, rel);
const exists = (rel: string) => fs.existsSync(file(rel));
const toDate = (d: unknown) => (d instanceof Date ? d.toISOString().slice(0, 10) : String(d ?? ""));
const readJson = <T,>(rel: string): T | null => (exists(rel) ? (JSON.parse(fs.readFileSync(file(rel), "utf8")) as T) : null);
const readMd = (rel: string) => (exists(rel) ? matter(fs.readFileSync(file(rel), "utf8")) : null);
const slugsIn = (dir: string) => (fs.existsSync(file(dir)) ? fs.readdirSync(file(dir)).filter((f) => f.endsWith(".en.md")).map((f) => f.replace(/\.en\.md$/, "")) : []);
const pick = (tr: unknown, en: string) => (typeof tr === "string" && tr.trim() ? tr : en);

/* ------------------------------------------------------------------ articles */
export function getArticles(locale: Locale = DEFAULT_LOCALE): Article[] {
  return slugsIn("articles")
    .map((slug) => {
      const base = readMd(`articles/${slug}.en.md`);
      if (!base || base.data.draft) return null;
      const tr = locale !== DEFAULT_LOCALE ? readMd(`articles/${slug}.${locale}.md`) : null;
      const d = base.data, td = tr?.data ?? {};
      const body = tr && tr.content.trim() ? tr.content : base.content;
      const words = body.split(/\s+/).filter(Boolean).length;
      return {
        slug, date: toDate(d.date), cover: d.cover || undefined, tags: Array.isArray(td.tags) && td.tags.length ? td.tags.map(String) : Array.isArray(d.tags) ? d.tags.map(String) : [],
        author: String(d.author ?? "Tripta Tarunesh"), ages: Array.isArray(d.ages) ? d.ages.map(String) : [], ability: String(d.ability ?? "big-ideas"),
        title: pick(td.title, String(d.title ?? "Untitled")), excerpt: pick(td.excerpt, String(d.excerpt ?? "")),
        seoTitle: pick(td.seoTitle, d.seoTitle || "") || undefined, seoDescription: pick(td.seoDescription, d.seoDescription || "") || undefined,
        translated: locale === DEFAULT_LOCALE || !!tr, reviewed: locale === DEFAULT_LOCALE ? d.reviewed === true : !!tr && d.reviewed === true && td.reviewed === true,
        body, readingMinutes: Math.max(1, Math.round(words / (locale === DEFAULT_LOCALE ? 200 : 150))),
      } as Article;
    })
    .filter((a): a is Article => !!a)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
export const getArticle = (slug: string, locale: Locale = DEFAULT_LOCALE) => getArticles(locale).find((a) => a.slug === slug);
export const articleSlugs = () => slugsIn("articles");

/* ---------------------------------------------------------------- age guides */
export function getAges(locale: Locale = DEFAULT_LOCALE): { reviewed: boolean; items: AgeGuide[] } {
  const en = readJson<{ reviewed?: boolean; items?: AgeGuide[] }>("ages.en.json") ?? {};
  const tr = locale !== DEFAULT_LOCALE ? readJson<{ reviewed?: boolean; items?: Partial<AgeGuide>[] }>(`ages.${locale}.json`) : null;
  const items = (en.items ?? []).map((a) => {
    const t = tr?.items?.find((x) => x.slug === a.slug) ?? {};
    return { ...a, label: pick(t.label, a.label), short: pick(t.short, a.short), title: pick(t.title, a.title), moment: pick(t.moment, a.moment), tryTitle: pick(t.tryTitle, a.tryTitle), tryText: pick(t.tryText, a.tryText), lookText: pick(t.lookText, a.lookText), shareText: pick(t.shareText, a.shareText) };
  });
  return { reviewed: locale === DEFAULT_LOCALE ? en.reviewed === true : en.reviewed === true && tr?.reviewed === true, items };
}
export const ageSlugs = () => getAges().items.map((a) => a.slug);

/* ----------------------------------------------------------------- self-check */
export function getSelfCheck(locale: Locale = DEFAULT_LOCALE): SelfCheck {
  const en = readJson<SelfCheck>("selfcheck.en.json") ?? { reviewed: false, title: "", intro: "", scale: [], areas: [], questions: [] };
  const tr = locale !== DEFAULT_LOCALE ? readJson<Partial<SelfCheck>>(`selfcheck.${locale}.json`) : null;
  if (!tr) return locale === DEFAULT_LOCALE ? en : { ...en, reviewed: false };
  return {
    reviewed: en.reviewed === true && tr.reviewed === true, title: pick(tr.title, en.title), intro: pick(tr.intro, en.intro),
    scale: tr.scale && tr.scale.length === en.scale.length ? tr.scale : en.scale,
    areas: en.areas.map((a) => { const t = tr.areas?.find((x) => x.key === a.key); return { ...a, label: pick(t?.label, a.label), advice: pick(t?.advice, a.advice) }; }),
    questions: en.questions.map((q, i) => ({ ...q, text: pick(tr.questions?.[i]?.text, q.text) })),
  };
}

/* --------------------------------------------------------------------- events */
export function getEvents(locale: Locale = DEFAULT_LOCALE): EventItem[] {
  return slugsIn("events")
    .map((slug) => {
      const base = readMd(`events/${slug}.en.md`)!;
      if (base.data.draft) return null;
      const tr = locale !== DEFAULT_LOCALE ? readMd(`events/${slug}.${locale}.md`) : null;
      const d = base.data, td = tr?.data ?? {};
      const photos = (Array.isArray(d.photos) ? d.photos : []).filter((p: { image?: string }) => p?.image).map((p: { image: string; caption?: string }, i: number) => ({ image: p.image, caption: pick(td.photos?.[i]?.caption, p.caption ?? "") || undefined }));
      return { slug, title: pick(td.title, String(d.title ?? "Untitled event")), date: toDate(d.date), location: pick(td.location, String(d.location ?? "")), summary: pick(td.summary, String(d.summary ?? "")), cover: d.cover || undefined, photos, body: tr && tr.content.trim() ? tr.content : base.content, translated: locale === DEFAULT_LOCALE || !!tr } as EventItem;
    })
    .filter((e): e is EventItem => !!e)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
export const getEvent = (slug: string, locale: Locale = DEFAULT_LOCALE) => getEvents(locale).find((e) => e.slug === slug);
export const eventSlugs = () => slugsIn("events");

/* ------------------------------------------------------------------------ FAQ */
export function getFaqs(locale: Locale = DEFAULT_LOCALE): Faq[] {
  const en = readJson<{ items?: Faq[] }>("faq.en.json")?.items ?? [];
  const tr = locale !== DEFAULT_LOCALE ? readJson<{ items?: Partial<Faq>[] }>(`faq.${locale}.json`)?.items : null;
  return en.map((f, i) => ({ question: pick(tr?.[i]?.question, f.question), answer: pick(tr?.[i]?.answer, f.answer) }));
}

/* ------------------------------------------------------------------- Markdown */
/** Markdown to sanitised HTML. Authors are trusted, but content lives in git so we sanitise anyway. */
export function renderMarkdown(md: string): string {
  const html = marked.parse(md, { async: false }) as string;
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "h3", "figure", "figcaption"]),
    allowedAttributes: { a: ["href", "title", "target", "rel"], img: ["src", "alt", "title", "width", "height", "loading"] },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: { a: (tag, attribs) => ({ tagName: "a", attribs: { ...attribs, rel: "noopener noreferrer" } }) },
  });
}

const DATE_LOCALE: Record<Locale, string> = { en: "en-IN", hi: "hi-IN", mr: "mr-IN" };
export const fmtDate = (iso: string, locale: Locale = DEFAULT_LOCALE) =>
  iso ? new Date(iso + "T00:00:00").toLocaleDateString(DATE_LOCALE[locale], { day: "numeric", month: "long", year: "numeric" }) : "";
