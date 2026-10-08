import type { Metadata } from "next";
import Link from "next/link";
import { IconBadge } from "@/components/Art";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import TiltCard from "@/components/TiltCard";
import { P, SERVICE_ICONS } from "@/lib";

export const metadata: Metadata = {
  title: "Services",
  description: "Curriculum design, teacher development, school audits, leadership mentoring and more, for Early Years and K-12 schools.",
};

export default function Services() {
  return (
    <>
      <PageHero art="blocks" eyebrow="Services" title="Systems that work for real children in real classrooms." sub="Through Educational Mentoring India, for school owners, principals, academic leaders, coordinators and teachers." />
      <Section tone="cream">
        <div className="grid gap-6 md:grid-cols-2">
          {P.services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 0.1}>
              <TiltCard className="h-full">
                <div className="flex gap-6">
                  <IconBadge name={SERVICE_ICONS[i]} />
                  <div>
                    <h2 className="font-serif text-3xl text-teal-900">{s.title}</h2>
                    <p className="mt-2 leading-relaxed text-ink/75">{s.text}</p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section>
        <Reveal className="text-center">
          <p className="mx-auto max-w-2xl font-serif text-3xl text-teal-900 md:text-4xl">Not just to satisfy compliance. To genuinely serve children.</p>
          <Link href="/contact/" className="btn-dark mt-10">Discuss your school →</Link>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto mt-16 max-w-2xl rounded-sm border border-dashed border-gold/60 p-6 text-center text-sm text-ink/60">
            Case studies, school names and testimonials: TODO: confirm with Tripta.
          </div>
        </Reveal>
      </Section>
    </>
  );
}
