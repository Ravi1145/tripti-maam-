import type { Metadata } from "next";
import Link from "next/link";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { getFaqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about working with Tripta Tarunesh, PlayXploration, Foundation Years First and school support.",
  alternates: { canonical: "/faq/" },
};

export default function Faq() {
  const items = getFaqs();
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((i) => ({ "@type": "Question", name: i.question, acceptedAnswer: { "@type": "Answer", text: i.answer } })) }} />
      <PageHero art="plane" eyebrow="FAQ" title="Questions, answered." sub="Everything school leaders ask before we begin." />
      <Section tone="cream">
        <div className="mx-auto max-w-4xl">
          <FaqList items={items} />
          <p className="mt-12 text-center text-ink/75">Still wondering? <Link href="/contact/" className="font-semibold text-teal-900 underline decoration-gold underline-offset-4">Send a message</Link>.</p>
        </div>
      </Section>
    </>
  );
}
