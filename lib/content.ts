import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const ROOT = path.join(process.cwd(), "content");

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover?: string;
  tags: string[];
  author: string;
  seoTitle?: string;
  seoDescription?: string;
  body: string;
  readingMinutes: number;
};

export type EventItem = {
  slug: string;
  title: string;
  date: string;
  location: string;
  summary: string;
  cover?: string;
  photos: { image: string; caption?: string }[];
  body: string;
};

function readDir(dir: string): string[] {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full).filter((f) => f.endsWith(".md"));
}

const toDate = (d: unknown) => (d instanceof Date ? d.toISOString().slice(0, 10) : String(d ?? ""));

export function getPosts(): Post[] {
  return readDir("blog")
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(ROOT, "blog", file), "utf8"));
      if (data.draft) return null;
      const words = content.split(/\s+/).filter(Boolean).length;
      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title ?? "Untitled"),
        date: toDate(data.date),
        excerpt: String(data.excerpt ?? ""),
        cover: data.cover || undefined,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        author: String(data.author ?? "Tripta Tarunesh"),
        seoTitle: data.seoTitle || undefined,
        seoDescription: data.seoDescription || undefined,
        body: content,
        readingMinutes: Math.max(1, Math.round(words / 200)),
      } as Post;
    })
    .filter((p): p is Post => !!p)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

export function getEvents(): EventItem[] {
  return readDir("events")
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(ROOT, "events", file), "utf8"));
      if (data.draft) return null;
      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title ?? "Untitled event"),
        date: toDate(data.date),
        location: String(data.location ?? ""),
        summary: String(data.summary ?? ""),
        cover: data.cover || undefined,
        photos: Array.isArray(data.photos) ? data.photos.filter((p: any) => p?.image) : [],
        body: content,
      } as EventItem;
    })
    .filter((e): e is EventItem => !!e)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const getEvent = (slug: string) => getEvents().find((e) => e.slug === slug);

export type Faq = { question: string; answer: string };
export function getFaqs(): Faq[] {
  const f = path.join(ROOT, "faq.json");
  if (!fs.existsSync(f)) return [];
  const j = JSON.parse(fs.readFileSync(f, "utf8"));
  return Array.isArray(j.items) ? j.items : [];
}

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

export const fmtDate = (iso: string) =>
  iso ? new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "";
