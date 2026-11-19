import type { Metadata } from "next";
import ArticleLibrary from "@/components/ArticleLibrary";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { ABILITIES, getAges, getArticles } from "@/lib/content";
import { getProfile } from "@/lib";
import { localePath, type Locale } from "@/lib/i18n";
import { getT } from "@/lib/messages";
import { pageMeta } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as Locale;
  const t = getT(locale);
  const m = pageMeta(locale, "/articles/", {
    title: t("Articles"),
    description: t("Question-led articles on what children are learning from birth to eight, with one thing to try and one thing to notice in each."),
  });
  return { ...m, alternates: { ...m.alternates, types: { "application/rss+xml": "/feed.xml" } } };
}

export default function Articles({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getT(locale);
  const P = getProfile(locale);
  const articles = getArticles(locale);
  const cards = articles.map((a) => ({ slug: a.slug, title: a.title, excerpt: a.excerpt, ages: a.ages, ability: a.ability, abilityLabel: t(ABILITIES[a.ability]?.label ?? "Big ideas"), tint: ABILITIES[a.ability]?.tint ?? "saffron", readingMinutes: a.readingMinutes, reviewed: a.reviewed }));
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Blog", name: t("Articles by Tripta Tarunesh"), url: `${P.site.url}${localePath(locale, "/articles/")}`, inLanguage: locale, blogPost: articles.map((a) => ({ "@type": "BlogPosting", headline: a.title, datePublished: a.date, url: `${P.site.url}${localePath(locale, `/articles/${a.slug}/`)}` })) }} />
      <PageHero eyebrow={t("The article library")} title={t("Start with a")} highlight={t("question.")} sub={t("Each article begins with a moment from everyday life and offers one thing to try. Filter by age or topic.")} tint="saffron" />
      <section className="mx-auto max-w-6xl px-6 pb-8">
        <ArticleLibrary articles={cards} ages={getAges(locale).items.map((a) => ({ slug: a.slug, label: a.label }))} abilities={Object.entries(ABILITIES).map(([key, v]) => ({ key, label: t(v.label) }))} />
      </section>
    </>
  );
}
