import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Cover from "@/components/Cover";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { fmtDate, getPost, getPosts, renderMarkdown } from "@/lib/content";
import { P } from "@/lib";

export const dynamicParams = false;
export const generateStaticParams = () => getPosts().map((p) => ({ slug: p.slug }));

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPost(params.slug);
  if (!p) return {};
  const title = p.seoTitle || p.title;
  const description = p.seoDescription || p.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${p.slug}/` },
    keywords: p.tags,
    openGraph: { type: "article", title, description, url: `/blog/${p.slug}/`, publishedTime: p.date, authors: [p.author], tags: p.tags, images: p.cover ? [p.cover] : undefined },
    twitter: { card: "summary_large_image", title, description, images: p.cover ? [p.cover] : undefined },
  };
}

export default function Post({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug);
  if (!p) notFound();
  const html = renderMarkdown(p.body);
  const others = getPosts().filter((x) => x.slug !== p.slug).slice(0, 2);
  const url = `${P.site.url}/blog/${p.slug}/`;
  return (
    <>
      <JsonLd
        data={[
          { "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.seoDescription || p.excerpt, datePublished: p.date, dateModified: p.date, author: { "@type": "Person", name: p.author, url: P.site.url }, publisher: { "@type": "Person", name: P.person.name }, mainEntityOfPage: url, image: p.cover ? `${P.site.url}${p.cover}` : undefined, keywords: p.tags.join(", ") },
          { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${P.site.url}/` }, { "@type": "ListItem", position: 2, name: "Blog", item: `${P.site.url}/blog/` }, { "@type": "ListItem", position: 3, name: p.title, item: url }] },
        ]}
      />
      <header className="grain relative overflow-hidden bg-teal-950 pb-20 pt-44 text-ivory">
        <div className="relative mx-auto max-w-3xl px-6">
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.3em] text-gold"><Link href="/blog/" className="hover:text-gold-light">Blog</Link> / Article</nav>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] md:text-7xl">{p.title}</h1>
          <p className="mt-8 text-sm text-ivory/75">By {p.author} · <time dateTime={p.date}>{fmtDate(p.date)}</time> · {p.readingMinutes} min read</p>
          {!!p.tags.length && <ul className="mt-5 flex flex-wrap gap-2">{p.tags.map((t) => <li key={t} className="rounded-full border border-gold/50 px-3 py-1 text-xs text-gold-light">{t}</li>)}</ul>}
        </div>
      </header>
      <Section>
        <article className="mx-auto max-w-3xl">
          {p.cover && <div className="-mt-32 mb-12 aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl"><Cover src={p.cover} alt={p.title} /></div>}
          <div className="prose-lux" dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </Section>
      {!!others.length && (
        <Section tone="cream">
          <Reveal><h2 className="font-serif text-4xl text-teal-900 md:text-5xl">Keep reading</h2></Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {others.map((o) => (
              <Link key={o.slug} href={`/blog/${o.slug}/`} className="card-lux block">
                <p className="text-xs uppercase tracking-[0.25em] text-gold-dark">{fmtDate(o.date)}</p>
                <h3 className="mt-3 font-serif text-3xl text-teal-900">{o.title}</h3>
                <p className="mt-3 text-sm text-ink/70">{o.excerpt}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
