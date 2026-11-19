import type { Metadata } from "next";
import Link from "@/components/LocLink";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { Orbs, ReviewBanner } from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { ageSlugs, getAges, getArticles } from "@/lib/content";
import { getProfile } from "@/lib";
import { LOCALES, localePath, type Locale } from "@/lib/i18n";
import { getT } from "@/lib/messages";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => LOCALES.flatMap((locale) => ageSlugs().map((slug) => ({ locale, slug })));

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const locale = params.locale as Locale;
  const a = getAges(locale).items.find((x) => x.slug === params.slug);
  if (!a) return {};
  return pageMeta(locale, `/ages/${a.slug}/`, { title: `${a.label}: ${a.title}`, description: `${a.moment} ${a.tryText}`.slice(0, 158) });
}

export default function Age({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  const t = getT(locale);
  const P = getProfile(locale);
  const { items, reviewed } = getAges(locale);
  const i = items.findIndex((x) => x.slug === params.slug);
  if (i < 0) notFound();
  const a = items[i], prev = items[i - 1], next = items[i + 1];
  const art = getArticles(locale).find((x) => x.slug === a.article);
  const abs = (p: string) => `${P.site.url}${localePath(locale, p)}`;
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: t("Home"), item: abs("/") }, { "@type": "ListItem", position: 2, name: t("Explore by age"), item: abs("/ages/") }, { "@type": "ListItem", position: 3, name: a.label, item: abs(`/ages/${a.slug}/`) }] }} />
      <section className="relative overflow-hidden pb-14 pt-12 md:pt-16">
        <Orbs tint={a.stage} />
        <div className="relative mx-auto max-w-4xl px-6">
          <nav aria-label={t("Breadcrumb")} className="text-sm font-bold text-ink-soft"><Link href="/ages/" className="hover:underline">{t("Explore by age")}</Link> / {a.label}</nav>
          <span className={`chip chip-${a.stage} rise mt-6`}>{a.label}</span>
          <h1 className="rise mt-4 text-[2.5rem] md:text-6xl" style={{ ["--d" as string]: "0.08s" }}>{a.title}</h1>
          <p className="rise mt-6 text-xl text-ink-soft md:text-2xl" style={{ ["--d" as string]: "0.16s" }}>{a.moment}</p>
        </div>
      </section>
      <ReviewBanner reviewed={reviewed} />

      <section className="mx-auto max-w-4xl space-y-6 px-6 pb-16">
        <Reveal>
          <div className={`rounded-[2rem] p-8 md:p-12 tint-${a.stage}`}>
            <p className="eyebrow !text-ink">{t("Try this today")}</p>
            <h2 className="mt-3 text-3xl md:text-4xl">{a.tryTitle}</h2>
            <p className="mt-4 text-lg md:text-xl">{a.tryText}</p>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal><div className="card h-full p-8"><p className="eyebrow">{t("What to look for next")}</p><p className="mt-3 text-lg">{a.lookText}</p></div></Reveal>
          <Reveal delay={0.08}><div className="card h-full p-8"><p className="eyebrow">{t("Share what you notice")}</p><p className="mt-3 text-lg">{a.shareText}</p></div></Reveal>
        </div>
        {art && (
          <Reveal><Link href={`/articles/${art.slug}/`} className="card card-hover flex flex-col gap-2 p-8 md:flex-row md:items-center md:justify-between"><div><p className="eyebrow">{t("Read a little more")}</p><p className="mt-2 text-2xl font-extrabold">{art.title}</p></div><span className="link-arrow shrink-0">{t("Read the article")} <span aria-hidden>→</span></span></Link></Reveal>
        )}
        <p className="rounded-card bg-sky-tint p-6 text-sm text-ink-soft"><strong className="text-ink">{t("A note.")}</strong> {t("This is about noticing everyday learning, not medical advice. If you are worried about your child's development, please speak to a paediatrician or another qualified specialist.")}</p>
      </section>

      <nav aria-label={t("Other ages")} className="mx-auto flex max-w-4xl flex-wrap justify-between gap-4 px-6">
        {prev ? <Link href={`/ages/${prev.slug}/`} className="btn btn-outline">← {prev.label}</Link> : <span />}
        {next ? <Link href={`/ages/${next.slug}/`} className="btn btn-outline">{next.label} →</Link> : <span />}
      </nav>
    </>
  );
}
