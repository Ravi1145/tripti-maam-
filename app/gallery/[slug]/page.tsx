import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PhotoGrid from "@/components/PhotoGrid";
import Section from "@/components/Section";
import { fmtDate, getEvent, getEvents, renderMarkdown } from "@/lib/content";
import { P } from "@/lib";

export const dynamicParams = false;
export const generateStaticParams = () => getEvents().map((e) => ({ slug: e.slug }));

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const e = getEvent(params.slug);
  if (!e) return {};
  const img = e.cover || e.photos[0]?.image;
  return {
    title: e.title,
    description: e.summary,
    alternates: { canonical: `/gallery/${e.slug}/` },
    openGraph: { title: e.title, description: e.summary, url: `/gallery/${e.slug}/`, images: img ? [img] : undefined },
  };
}

export default function EventPage({ params }: { params: { slug: string } }) {
  const e = getEvent(params.slug);
  if (!e) notFound();
  const html = renderMarkdown(e.body);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Event", name: e.title, startDate: e.date, description: e.summary, location: e.location ? { "@type": "Place", name: e.location } : undefined, performer: { "@type": "Person", name: P.person.name }, image: (e.cover || e.photos[0]?.image) ? `${P.site.url}${e.cover || e.photos[0]?.image}` : undefined, eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", eventStatus: "https://schema.org/EventScheduled" }} />
      <header className="grain relative overflow-hidden bg-teal-950 pb-20 pt-44 text-ivory">
        <div className="relative mx-auto max-w-4xl px-6">
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.3em] text-gold"><Link href="/gallery/" className="hover:text-gold-light">Gallery</Link> / Event</nav>
          <h1 className="mt-6 font-serif text-6xl leading-[1.02] md:text-8xl">{e.title}</h1>
          <p className="mt-6 text-ivory/80"><time dateTime={e.date}>{fmtDate(e.date)}</time>{e.location && ` · ${e.location}`}</p>
        </div>
      </header>
      <Section>
        <div className="mx-auto max-w-3xl"><p className="font-serif text-3xl leading-snug text-teal-900">{e.summary}</p><div className="prose-lux mt-8" dangerouslySetInnerHTML={{ __html: html }} /></div>
      </Section>
      <Section tone="cream">
        {e.photos.length ? <PhotoGrid photos={e.photos.map((p) => ({ ...p, event: e.title }))} /> : <p className="text-center text-ink/70">Photos from this event will appear here soon.</p>}
      </Section>
    </>
  );
}
