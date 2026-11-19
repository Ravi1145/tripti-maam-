import type { Metadata } from "next";
import Link from "@/components/LocLink";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import PhotoGrid from "@/components/PhotoGrid";
import Img from "@/components/Img";
import Reveal from "@/components/Reveal";
import { fmtDate, getEvents } from "@/lib/content";
import { getProfile } from "@/lib";
import { localePath, type Locale } from "@/lib/i18n";
import { getT } from "@/lib/messages";
import { pageMeta } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as Locale;
  const t = getT(locale);
  return pageMeta(locale, "/gallery/", { title: t("Gallery and events"), description: t("Photos from workshops, school visits and talks.") });
}

export default function Gallery({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getT(locale);
  const P = getProfile(locale);
  const events = getEvents(locale);
  const photos = events.flatMap((e) => e.photos.map((p) => ({ image: p.image, caption: p.caption, event: e.title })));
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ImageGallery", name: t("Events and gallery"), url: `${P.site.url}${localePath(locale, "/gallery/")}`, image: photos.slice(0, 20).map((p) => `${P.site.url}${p.image}`) }} />
      <PageHero eyebrow={t("Gallery and events")} title={t("Moments from")} highlight={t("the field.")} sub={t("Workshops, school visits and conversations with educators.")} tint="mint" />
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <ul className="grid gap-6 md:grid-cols-3">
          {events.map((e, i) => (
            <li key={e.slug}><Reveal className="h-full" delay={i * 0.07}>
              <Link href={`/gallery/${e.slug}/`} className="card card-hover group block h-full overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-mint-tint">{(e.cover || e.photos[0]?.image) && <div className="h-full transition duration-700 group-hover:scale-105"><Img src={(e.cover || e.photos[0]?.image) as string} alt="" sizes="(min-width: 768px) 33vw, 100vw" /></div>}</div>
                <div className="p-7"><p className="text-xs font-extrabold uppercase tracking-[0.1em] text-saffron-deep">{[fmtDate(e.date, locale), e.location].filter(Boolean).join(" · ") || t("Event")}</p><h2 className="mt-2 text-2xl">{e.title}</h2><p className="mt-2 text-ink-soft">{e.summary}</p><p className="mt-4 text-sm font-extrabold">{e.photos.length ? t("{n} photos", { n: e.photos.length }) : t("Photos coming soon")} →</p></div>
              </Link>
            </Reveal></li>
          ))}
        </ul>
      </section>
      {!!photos.length && (
        <section className="bg-paper-2 py-16 md:py-24"><div className="mx-auto max-w-6xl px-6"><Reveal><h2 className="mb-10 text-3xl md:text-5xl">{t("All")} <span className="hl hl-saffron">{t("photos.")}</span></h2></Reveal><PhotoGrid photos={photos} /></div></section>
      )}
    </>
  );
}
