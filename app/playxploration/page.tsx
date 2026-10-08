import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Section, { Eyebrow } from "@/components/Section";
import { P } from "@/lib";

export const metadata: Metadata = { title: "PlayXploration", description: P.playx.intro };

export default function PlayX() {
  return (
    <>
      <PageHero art="kite" eyebrow="Founded by Tripta Tarunesh" title="PlayXploration" sub={P.playx.tagline} />
      <Section>
        <Reveal><p className="max-w-3xl font-serif text-3xl leading-snug text-teal-900 md:text-4xl">{P.playx.intro}</p></Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {P.playx.lenses.map((l, i) => (
            <Reveal key={l.title} delay={i * 0.12}>
              <div className="card-lux h-full">
                <Eyebrow>Lens {i + 1}</Eyebrow>
                <h3 className="font-serif text-3xl text-teal-900">{l.title}</h3>
                <p className="mt-3 text-ink/70">{l.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section tone="dark">
        <Reveal>
          <Eyebrow>Made visible</Eyebrow>
          <h2 className="font-serif text-4xl text-ivory md:text-5xl">What play reveals</h2>
          <div className="mt-10 flex flex-wrap gap-3">
            {P.playx.visible.map((t) => (
              <span key={t} className="rounded-sm border border-gold/50 px-5 py-2 text-sm text-gold-light transition hover:bg-gold hover:text-teal-950">{t}</span>
            ))}
          </div>
        </Reveal>
      </Section>
      <Section tone="cream">
        <Reveal>
          <Eyebrow>At the intersection of</Eyebrow>
          <div className="grid gap-px overflow-hidden rounded-sm bg-gold/30 sm:grid-cols-2 lg:grid-cols-3">
            {P.playx.intersections.map((t) => (
              <div key={t} className="bg-ivory p-8 font-serif text-xl text-teal-900 transition hover:bg-white">{t}</div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="mt-14 text-center">
          <Link href="/contact/" className="btn-dark">Bring PlayXploration to your school →</Link>
        </Reveal>
      </Section>
    </>
  );
}
