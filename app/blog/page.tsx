import type { Metadata } from "next";
import Link from "next/link";
import Cover from "@/components/Cover";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { fmtDate, getPosts } from "@/lib/content";
import { P } from "@/lib";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles by Tripta Tarunesh on play-based learning, the Foundation Years, teacher development and school transformation.",
  alternates: { canonical: "/blog/", types: { "application/rss+xml": "/feed.xml" } },
};

export default function BlogIndex() {
  const posts = getPosts();
  const [first, ...rest] = posts;
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Blog", name: "Tripta Tarunesh Blog", url: `${P.site.url}/blog/`, blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, datePublished: p.date, url: `${P.site.url}/blog/${p.slug}/` })) }} />
      <PageHero art="pages" eyebrow="Blog" title="Notes from the Foundation Years." sub="Ideas on play, observation, teacher practice and what children learn long before anyone writes it down." />
      <Section>
        {!first && <p className="text-lg text-ink/70">New articles are coming soon.</p>}
        {first && (
          <Reveal>
            <Link href={`/blog/${first.slug}/`} className="group grid overflow-hidden rounded-[2rem] border border-gold/40 bg-white md:grid-cols-2">
              <div className="aspect-[4/3] overflow-hidden md:aspect-auto"><Cover src={first.cover} alt="" seed={0} className="transition duration-700 group-hover:scale-105" /></div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">Latest · {fmtDate(first.date)} · {first.readingMinutes} min read</p>
                <h2 className="mt-4 font-serif text-4xl leading-tight text-teal-900 md:text-5xl">{first.title}</h2>
                <p className="mt-4 leading-relaxed text-ink/75">{first.excerpt}</p>
                <span className="mt-8 text-sm font-semibold text-teal-900 transition group-hover:translate-x-2">Read article →</span>
              </div>
            </Link>
          </Reveal>
        )}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              <Link href={`/blog/${p.slug}/`} className="card-lux group block h-full overflow-hidden !p-0">
                <div className="aspect-[16/10] overflow-hidden"><Cover src={p.cover} alt="" seed={i + 1} className="transition duration-700 group-hover:scale-105" /></div>
                <div className="p-7">
                  <p className="text-xs uppercase tracking-[0.25em] text-gold-dark">{fmtDate(p.date)} · {p.readingMinutes} min</p>
                  <h2 className="mt-3 font-serif text-3xl leading-tight text-teal-900">{p.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{p.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
