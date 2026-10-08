import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Section, { Eyebrow } from "@/components/Section";
import { P } from "@/lib";

export const metadata: Metadata = { title: "Foundation Years First", description: `${P.fyf.premise} ${P.fyf.intro}` };

export default function FYF() {
  return (
    <>
      <PageHero art="steps" eyebrow={`${P.fyf.by} · ${P.fyf.launched}`} title={P.fyf.premise} sub={P.fyf.intro} />
      <Section>
        <Reveal><Eyebrow>Our aims</Eyebrow><h2 className="font-serif text-4xl text-teal-900 md:text-5xl">Five ways to look at one child</h2></Reveal>
        <ol className="mt-14 space-y-0">
          {P.fyf.goals.map((g, i) => (
            <Reveal key={g} delay={i * 0.06}>
              <li className="flex items-baseline gap-8 border-t border-gold/40 py-8 transition hover:pl-4">
                <span className="font-serif text-2xl text-gold">0{i + 1}</span>
                <span className="font-serif text-3xl text-teal-900 md:text-4xl">{g}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>
      <Section tone="dark">
        <Reveal className="text-center">
          <p className="font-serif text-4xl italic text-gold-light md:text-6xl">{P.fyf.tagline}</p>
          <p className="mt-8 text-sm text-ivory/50">Initiative link: {P.fyf.link}</p>
        </Reveal>
      </Section>
    </>
  );
}
