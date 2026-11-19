import type { Metadata } from "next";
import Link from "@/components/LocLink";
import ContactForm from "@/components/ContactForm";
import CtaBand from "@/components/CtaBand";
import FaqList from "@/components/FaqList";
import { IconTile } from "@/components/Icon";
import Img from "@/components/Img";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Reveal, { RevealItem } from "@/components/Reveal";
import { getFaqs } from "@/lib/content";
import { getProfile } from "@/lib";
import type { Locale } from "@/lib/i18n";
import { getT } from "@/lib/messages";
import { pageMeta } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as Locale;
  const t = getT(locale);
  return pageMeta(locale, "/work-with-schools/", { title: t("Work with schools"), description: t("Curriculum, teacher development, classroom observation, assessment and PlayXploration for Early Years and K-12 schools, through Educational Mentoring India.") });
}

const PHOTOS = ["/photos/educators.webp", "/photos/leaders.webp", "/photos/walkthrough.webp", "/photos/library.webp"];

export default function Schools({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getT(locale);
  const P = getProfile(locale);
  const s = P.schools;
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: "Early childhood school improvement", inLanguage: locale, provider: { "@type": "Person", name: P.person.name }, areaServed: ["India", "Gulf"], description: s.intro }} />
      <PageHero eyebrow={t("Work with schools")} title={t("Practical systems for")} highlight={t("real classrooms.")} sub={s.intro} image="/photos/walkthrough.webp" imageAlt={t("Walking a school with its team")} tint="violet">
        <a href="#enquiry" className="btn btn-primary">{t("Book a school conversation")}</a>
        <Link href="/self-check/" className="link-arrow">{t("Take the self-check")} <span aria-hidden>→</span></Link>
      </PageHero>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="space-y-8">
          {s.offers.map((o, i) => (
            <Reveal key={o.title}>
              <div className="card grid gap-8 overflow-hidden p-5 md:grid-cols-12 md:p-6">
                <div className={`aspect-[4/3] overflow-hidden rounded-[1.4rem] md:col-span-5 ${i % 2 ? "md:order-2" : ""}`}><Img src={PHOTOS[i]} alt="" sizes="(min-width: 768px) 40vw, 100vw" /></div>
                <div className="p-3 md:col-span-7 md:p-8">
                  <IconTile name={o.icon} tint={o.tint} />
                  <h2 className="mt-5 text-3xl md:text-4xl">{o.title}</h2>
                  <p className="mt-4 text-lg text-ink-soft">{o.text}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">{o.items.map((x) => <li key={x} className={`chip chip-${o.tint}`}>{x}</li>)}</ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-paper-2 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="text-center"><p className="eyebrow">{t("How we work together")}</p><h2 className="mt-3 text-3xl md:text-5xl">{t("Three simple steps.")}</h2></Reveal>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {s.process.map((p, i) => (
              <RevealItem key={p.title} delay={i * 0.1} className="card h-full p-8"><span className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-extrabold ${["bg-saffron-tint text-saffron-deep", "bg-violet-tint text-violet-deep", "bg-mint-tint text-mint-deep"][i]}`}>{i + 1}</span><h3 className="mt-5 text-2xl">{p.title}</h3><p className="mt-2 text-ink-soft">{p.text}</p></RevealItem>
            ))}
          </ol>
        </div>
      </section>

      <section id="enquiry" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">{t("Start a conversation")}</p>
            <h2 className="mt-3 text-3xl md:text-5xl">{t("Tell me about your")} <span className="hl hl-saffron">{t("school.")}</span></h2>
            <p className="mt-5 text-lg text-ink-soft">{s.cta}</p>
            <ol className="mt-8 space-y-4">{P.contact.next.map((n, i) => <li key={n.title} className="flex gap-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sun-tint font-extrabold text-sun-deep">{i + 1}</span><div><p className="font-extrabold">{n.title}</p><p className="text-sm text-ink-soft">{n.text}</p></div></li>)}</ol>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7"><div className="card p-6 md:p-10"><ContactForm /></div></Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-8">
        <Reveal><h2 className="text-3xl md:text-4xl">{t("Common questions")}</h2><div className="mt-6"><FaqList items={getFaqs(locale).slice(0, 4)} searchable={false} /></div><Link href="/faq/" className="link-arrow mt-6">{t("All questions")} <span aria-hidden>→</span></Link></Reveal>
      </section>

      <CtaBand title={t("Ready when you are.")} text={t("A short note is plenty. I reply personally.")} tint="violet" />
    </>
  );
}
