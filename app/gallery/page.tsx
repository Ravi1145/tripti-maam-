import type { Metadata } from "next";
import Link from "next/link";
import Cover from "@/components/Cover";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import PhotoGrid from "@/components/PhotoGrid";
import Reveal from "@/components/Reveal";
import Section, { Eyebrow } from "@/components/Section";
import { fmtDate, getEvents } from "@/lib/content";
import { P } from "@/lib";

export const metadata: Metadata = {
  title: "Gallery & Events",
  description: "Photos and highlights from Tripta Tarunesh's talks, workshops, school visits and events.",
  alternates: { canonical: "/gallery/" },
};

export default function Gallery() {
  const events = getEvents();
  const photos = events.flatMap((e) => e.photos.map((p) => ({ image: p.image, caption: p.caption, event: e.title })));
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ImageGallery", name: "Events and gallery", url: `${P.site.url}/gallery/`, image: photos.slice(0, 20).map((p) => `${P.site.url}${p.image}`) }} />
      <PageHero art="stage" eyebrow="Gallery & Events" title="Moments from the field." sub="Talks, workshops, school visits and conversations with educators." />
      <Section>
        <Reveal><Eyebrow>Events</Eyebrow><h2 className="font-serif text-5xl text-teal-900">Where Tripta has been</h2></Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((e, i) => (
            <Reveal key={e.slug} delay={(i % 3) * 0.08}>
              <Link href={`/gallery/${e.slug}/`} className="card-lux group block h-full overflow-hidden !p-0">
                <div className="aspect-[4/3] overflow-hidden"><Cover src={e.cover || e.photos[0]?.image} alt="" seed={i + 2} className="transition duration-700 group-hover:scale-105" /></div>
                <div className="p-7">
                  <p className="text-xs uppercase tracking-[0.25em] text-gold-dark">{fmtDate(e.date)}{e.location && ` · ${e.location}`}</p>
                  <h3 className="mt-3 font-serif text-3xl text-teal-900">{e.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{e.summary}</p>
                  <p className="mt-4 text-xs text-ink/60">{e.photos.length ? `${e.photos.length} photo${e.photos.length > 1 ? "s" : ""}` : "Photos coming soon"}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      {!!photos.length && (
        <Section tone="cream">
          <Reveal><Eyebrow>All photos</Eyebrow><h2 className="mb-12 font-serif text-5xl text-teal-900">The gallery</h2></Reveal>
          <PhotoGrid photos={photos} />
        </Section>
      )}
    </>
  );
}
