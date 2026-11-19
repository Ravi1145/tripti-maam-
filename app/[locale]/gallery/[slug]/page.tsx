import type { Metadata } from "next";
import Link from "@/components/LocLink";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { Orbs, ReviewBanner } from "@/components/PageHero";
import PhotoGrid from "@/components/PhotoGrid";
import { eventSlugs, fmtDate, getEvent, renderMarkdown } from "@/lib/content";
import { getProfile } from "@/lib";
import { LOCALES, localePath, type Locale } from "@/lib/i18n";
import { getT } from "@/lib/messages";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => LOCALES.flatMap((locale) => eventSlugs().map((slug) => ({ locale, slug })));

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const locale = params.locale as Locale;
  const e = getEvent(params.slug, locale);
  if (!e) return {};
  const img = e.cover || e.photos[0]?.image;
  const path = `/gallery/${e.slug}/`;
  return pageMeta(locale, path, { title: e.title, description: e.summary, extra: { openGraph: { title: e.title, description: e.summary, url: localePath(locale, path), images: img ? [img] : undefined } } });
}

export default function EventPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = params.locale as Locale;
  const t = getT(locale);
  const P = getProfile(locale);
  const e = getEvent(params.slug, locale);
  if (!e) notFound();
  const img = e.cover || e.photos[0]?.image;
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Event", name: e.title, startDate: e.date || undefined, description: e.summary, location: e.location ? { "@type": "Place", name: e.location } : undefined, performer: { "@type": "Person", name: P.person.name }, image: img ? `${P.site.url}${img}` : undefined, eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", eventStatus: "https://schema.org/EventScheduled" }} />
      <header className="relative overflow-hidden pb-12 pt-12 md:pt-16">
        <Orbs tint="mint" />
        <div className="relative mx-auto max-w-4xl px-6">
          <nav aria-label={t("Breadcrumb")} className="text-sm font-bold text-ink-soft"><Link href="/gallery/" className="hover:underline">{t("Gallery")}</Link> / {t("Event")}</nav>
          <h1 className="rise mt-5 text-[2.5rem] md:text-6xl">{e.title}</h1>
          {(e.date || e.location) && <p className="mt-4 font-bold text-saffron-deep">{[fmtDate(e.date, locale), e.location].filter(Boolean).join(" · ")}</p>}
          <p className="mt-5 text-xl text-ink-soft">{e.summary}</p>
          {e.body.trim() && <div className="prose-fy mt-6" dangerouslySetInnerHTML={{ __html: renderMarkdown(e.body) }} />}
        </div>
      </header>
      <ReviewBanner reviewed translated={e.translated} />
      <section className="mx-auto max-w-6xl px-6 pb-8">
        {e.photos.length ? <PhotoGrid photos={e.photos.map((p) => ({ ...p, event: e.title }))} /> : <p className="text-center text-ink-soft">{t("Photos from this event will appear here soon.")}</p>}
      </section>
    </>
  );
}
