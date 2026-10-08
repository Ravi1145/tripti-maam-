import { getPosts } from "@/lib/content";
import { P } from "@/lib";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const base = P.site.url;
  const items = getPosts()
    .map((p) => `<item><title>${esc(p.title)}</title><link>${base}/blog/${p.slug}/</link><guid>${base}/blog/${p.slug}/</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${esc(p.excerpt)}</description></item>`)
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Tripta Tarunesh</title><link>${base}/blog/</link><description>${esc(P.site.description)}</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
