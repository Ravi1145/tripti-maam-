import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Section, { Eyebrow } from "@/components/Section";
import { P } from "@/lib";

export const metadata: Metadata = { title: "Writing", description: "The Unseen Curriculum newsletter and featured essays on play, the Foundation Years and AI readiness." };

export default function Writing() {
  const w = P.writing;
  return (
    <>
      <PageHero art="pages" eyebrow="Writing" title="The Unseen Curriculum" sub="A newsletter on what children learn long before anyone writes it down." />
      <Section>
        <Reveal>
          <article className="card-lux md:p-12">
            <Eyebrow>{w.newsletter.part}</Eyebrow>
            <h2 className="font-serif text-3xl leading-tight text-teal-900 md:text-5xl">{w.newsletter.title}</h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink/75">{w.newsletter.summary}</p>
            <p className="mt-6 text-sm text-ink/50">Read online: {w.newsletter.link}</p>
          </article>
        </Reveal>
      </Section>
      <Section tone="cream">
        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <Eyebrow>Featured post</Eyebrow>
            <h2 className="font-serif text-4xl leading-tight text-teal-900">{w.featured.title}</h2>
            <p className="mt-6 leading-relaxed text-ink/75">{w.featured.text}</p>
            <blockquote className="mt-8 border-l-2 border-gold pl-6 font-serif text-xl italic text-teal-700">{w.featured.closing}</blockquote>
          </Reveal>
          <Reveal delay={0.12}>
            <Eyebrow>Origin essay · {w.essay.date}</Eyebrow>
            <h3 className="font-serif text-3xl leading-tight text-teal-900">{w.essay.title}</h3>
            <p className="mt-4 text-ink/70">{w.essay.text}</p>
            <div className="mt-10 flex flex-wrap gap-2">
              {w.featured.tags.map((t) => (<span key={t} className="rounded-sm bg-teal-100 px-3 py-1 text-xs text-teal-900">#{t}</span>))}
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
