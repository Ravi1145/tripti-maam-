import type { Metadata } from "next";
import Link from "@/components/LocLink";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { Orbs, ReviewBanner } from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { ABILITIES, articleSlugs, fmtDate, getAges, getArticle, getArticles, renderMarkdown } from "@/lib/content";
import { getProfile } from "@/lib";
import { LOCALES, localePath, type Locale } from "@/lib/i18n";
import { getT } from "@/lib/messages";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => LOCALES.flatMap((locale) => articleSlugs().map((slug) => ({ locale, slug })));

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const locale = params.locale as Locale;
  const a = getArticle(params.slug, locale);
  if (!a) return {};
  const title = a.seoTitle || a.title, description = a.seoDescription || a.excerpt;
  const path = `/articles/${a.slug}/`;
  return pageMeta(locale, path, {
    title, description,
    extra: {
      keywords: a.tags,
      openGraph: { type: "article", title, description, url: localePath(locale, path), publishedTime: a.date, authors: [a.author], tags: a.tags, images: a.cover ? [a.cover] : undefined },
      twitter: { card: "summary_large_image", title, description },
    },
  });
}

export default function ArticlePage({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  const t = getT(locale);
  const P = getProfile(locale);
  const a = getArticle(params.slug, locale);
  if (!a) notFound();
  const all = getArticles(locale);
  const ab = ABILITIES[a.ability] ?? ABILITIES["big-ideas"];
  const ageLabels = getAges(locale).items.filter((x) => a.ages.includes(x.slug));
  const next = all.filter((x) => x.slug !== a.slug && (x.ability === a.ability || x.ages.some((g) => a.ages.includes(g)))).slice(0, 2);
  const more = next.length ? next : all.filter((x) => x.slug !== a.slug).slice(0, 2);
  const abs = (p: string) => `${P.site.url}${localePath(locale, p)}`;
  const url = abs(`/articles/${a.slug}/`);
  return (
    <>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "BlogPosting", inLanguage: locale, headline: a.title, description: a.seoDescription || a.excerpt, datePublished: a.date, dateModified: a.date, author: { "@type": "Person", name: a.author, url: P.site.url }, publisher: { "@type": "Person", name: P.person.name }, mainEntityOfPage: url, keywords: a.tags.join(", ") },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: t("Home"), item: abs("/") }, { "@type": "ListItem", position: 2, name: t("Articles"), item: abs("/articles/") }, { "@type": "ListItem", position: 3, name: a.title, item: url }] },
      ]} />
      <header className="relative overflow-hidden pb-12 pt-12 md:pt-16">
        <Orbs tint={ab.tint} />
        <div className="relative mx-auto max-w-3xl px-6">
          <nav aria-label={t("Breadcrumb")} className="text-sm font-bold text-ink-soft"><Link href="/articles/" className="hover:underline">{t("Articles")}</Link> / {t(ab.label)}</nav>
          <div className="mt-6 flex flex-wrap gap-2"><span className={`chip chip-${ab.tint}`}>{t(ab.label)}</span>{ageLabels.map((g) => <Link key={g.slug} href={`/ages/${g.slug}/`} className="chip bg-white text-ink-soft shadow-soft hover:text-ink">{g.label}</Link>)}</div>
          <h1 className="rise mt-5 text-[2.2rem] leading-[1.1] md:text-5xl">{a.title}</h1>
          <p className="mt-6 text-sm font-bold text-ink-soft">{t("By {name}", { name: a.author })} · <time dateTime={a.date}>{fmtDate(a.date, locale)}</time> · {t("{n} min read", { n: a.readingMinutes })}</p>
        </div>
      </header>
      <ReviewBanner reviewed={a.reviewed} translated={a.translated} />
      <article className="mx-auto max-w-3xl px-6 pb-16"><div className="prose-fy" dangerouslySetInnerHTML={{ __html: renderMarkdown(a.body) }} /></article>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <p className="rounded-card bg-sky-tint p-6 text-sm text-ink-soft"><strong className="text-ink">{t("A note.")}</strong> {t("This is about noticing and supporting everyday learning, not medical advice. If you are worried about a child's development, please speak to a paediatrician or another qualified specialist.")}</p>
      </section>

      <section className="bg-paper-2 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal><h2 className="text-3xl md:text-4xl">{t("Read next")}</h2></Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {more.map((m) => <Link key={m.slug} href={`/articles/${m.slug}/`} className="card card-hover p-8"><span className={`chip chip-${ABILITIES[m.ability]?.tint ?? "saffron"}`}>{t(ABILITIES[m.ability]?.label ?? "Big ideas")}</span><h3 className="mt-4 text-2xl leading-tight">{m.title}</h3><p className="mt-3 text-ink-soft">{m.excerpt}</p></Link>)}
          </div>
        </div>
      </section>
    </>
  );
}
