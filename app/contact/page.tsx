import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { P } from "@/lib";

export const metadata: Metadata = { title: "Contact", description: P.contact.intro };

export default function Contact() {
  return (
    <>
      <PageHero art="plane" eyebrow="Contact" title="Let us talk about your school." sub={P.contact.intro} />
      <Section tone="cream">
        <div className="grid gap-16 md:grid-cols-5">
          <Reveal className="md:col-span-3"><ContactForm /></Reveal>
          <Reveal delay={0.12} className="md:col-span-2">
            <div className="card-lux space-y-6 text-sm">
              <div><p className="text-xs uppercase tracking-[0.3em] text-gold-dark">Email</p><p className="mt-1 text-ink/70">{P.person.email}</p></div>
              <div><p className="text-xs uppercase tracking-[0.3em] text-gold-dark">Phone</p><p className="mt-1 text-ink/70">{P.person.phone}</p></div>
              <div><p className="text-xs uppercase tracking-[0.3em] text-gold-dark">Based in</p><p className="mt-1 text-ink/70">{P.person.location}</p></div>
              <div><p className="text-xs uppercase tracking-[0.3em] text-gold-dark">LinkedIn</p><a className="mt-1 inline-block text-teal-700 underline" href={P.person.linkedin} target="_blank" rel="noopener noreferrer">triptatarunesh ↗</a></div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
