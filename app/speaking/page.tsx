import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Section, { Eyebrow } from "@/components/Section";
import { P } from "@/lib";

export const metadata: Metadata = { title: "Speaking & Recognition", description: "Bett Asia 2026, awards and Project Zero certifications." };

export default function Speaking() {
  const s = P.speaking;
  return (
    <>
      <PageHero art="stage" eyebrow="Speaking & Recognition" title="On stage, and in the classroom." sub="Sharing practical ideas on play, observation and the Foundation Years with educators across Asia." />
      <Section>
        <div className="space-y-6">
          {s.events.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.1}>
              <article className="card-lux grid gap-4 md:grid-cols-4 md:p-10">
                <div>
                  <p className="font-serif text-3xl text-teal-900">{e.title}</p>
                  <p className="mt-2 text-sm text-gold-dark">{e.when}</p>
                  <p className="text-sm text-ink/60">{e.where}</p>
                </div>
                <p className="leading-relaxed text-ink/75 md:col-span-3">{e.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section tone="dark">
        <Reveal><Eyebrow>Recognition</Eyebrow></Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {s.recognition.map((r, i) => (
            <Reveal key={r} delay={i * 0.1}>
              <div className="rounded-sm border border-gold/40 p-10 text-center transition hover:bg-white/5">
                <p className="text-3xl text-gold" aria-hidden>✦</p>
                <p className="mt-3 font-serif text-3xl text-ivory">{r}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section tone="cream">
        <Reveal><Eyebrow>Certifications & learning</Eyebrow></Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {s.certifications.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="card-lux h-full">
                <h3 className="font-serif text-2xl text-teal-900">{c.title}</h3>
                <p className="mt-2 text-sm text-ink/60">{c.org}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
