import { getArticles } from "@/lib/content";
import { P } from "@/lib";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const base = P.site.url;
  const items = getArticles()
    .map((a) => `<item><title>${esc(a.title)}</title><link>${base}/articles/${a.slug}/</link><guid>${base}/articles/${a.slug}/</guid><pubDate>${new Date(a.date).toUTCString()}</pubDate><description>${esc(a.excerpt)}</description></item>`)
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Tripta Tarunesh</title><link>${base}/articles/</link><description>${esc(P.site.description)}</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
