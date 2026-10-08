import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Portrait from "@/components/Portrait";
import Reveal from "@/components/Reveal";
import Section, { Eyebrow } from "@/components/Section";
import { P } from "@/lib";

export const metadata: Metadata = { title: "About", description: P.about.intro };

export default function About() {
  return (
    <>
      <PageHero art="tree" eyebrow="About" title="The answer begins earlier." sub={P.about.intro} />
      <Section>
        <div className="grid gap-16 md:grid-cols-5">
          <Reveal className="md:col-span-2">
            <Portrait />
          </Reveal>
          <div className="space-y-8 md:col-span-3">
            <Reveal>
              <Eyebrow>Her question</Eyebrow>
              <p className="font-serif text-3xl leading-snug text-teal-900 md:text-4xl">{P.about.question}</p>
            </Reveal>
            <Reveal delay={0.1}><p className="text-lg leading-relaxed text-ink/80">{P.about.answer}</p></Reveal>
            {P.about.paragraphs.map((t, i) => (
              <Reveal key={i} delay={0.1}><p className="text-lg leading-relaxed text-ink/80">{t}</p></Reveal>
            ))}
            <Reveal>
              <blockquote className="border-l-2 border-gold pl-6 font-serif text-2xl italic leading-snug text-teal-700">{P.hero.subtitle}</blockquote>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <Reveal><Eyebrow>Philosophy</Eyebrow><h2 className="font-serif text-4xl text-teal-900 md:text-5xl">What shapes a child first</h2></Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {P.about.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="card-lux h-full"><h3 className="font-serif text-2xl text-teal-900">{p.title}</h3><p className="mt-3 text-ink/70">{p.text}</p></div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <Reveal>
          <Eyebrow>Learning</Eyebrow>
          <h2 className="font-serif text-4xl text-ivory md:text-5xl">Continually studying</h2>
          <div className="mt-10 flex flex-wrap gap-3">
            {["Harvard CEEL", "Project Zero", "Reggio Emilia", "Visible Thinking", "Universal Design for Learning", "Indian knowledge systems", "Developmentally appropriate assessment"].map((t) => (
              <span key={t} className="rounded-sm border border-gold/50 px-5 py-2 text-sm text-gold-light transition hover:bg-gold hover:text-teal-950">{t}</span>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>Who she works with</Eyebrow>
          <p className="max-w-3xl font-serif text-3xl leading-snug text-teal-900 md:text-4xl">{P.about.workWith}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-16 rounded-sm border border-dashed border-gold/60 p-8 text-sm text-ink/60">
            <strong className="text-teal-900">Experience timeline &amp; education:</strong> TODO: confirm with Tripta (roles, institutions and dates were not available).
          </div>
        </Reveal>
      </Section>
    </>
  );
}
