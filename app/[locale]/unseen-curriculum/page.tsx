import type { Metadata } from "next";
import Link from "@/components/LocLink";
import CtaBand from "@/components/CtaBand";
import PageHero, { ReviewBanner } from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getArticles } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { getT } from "@/lib/messages";
import { pageMeta } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as Locale;
  const t = getT(locale);
  return pageMeta(locale, "/unseen-curriculum/", { title: t("The Unseen Curriculum"), description: t("A series on what children learn that never appears on a timetable, shared first through the Anubhuti letter.") });
}

export default function Unseen({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getT(locale);
  /** Parts of the series are the articles that say "From The Unseen Curriculum". */
  const parts = getArticles(locale).filter((a) => /unseen curriculum/i.test(a.body)).reverse();
  return (
    <>
      <PageHero eyebrow={t("A series")} title={t("The Unseen")} highlight={t("Curriculum.")} sub={t("A series on what children learn that never appears on a timetable, shared first through the Anubhuti letter.")} tint="violet" />
      <ReviewBanner reviewed={parts.every((p) => p.reviewed)} />
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <ol className="space-y-5">
          {parts.map((a, i) => (
            <li key={a.slug}>
              <Reveal delay={i * 0.06}>
                <Link href={`/articles/${a.slug}/`} className="card card-hover block p-8 md:p-10">
                  <span className="chip chip-violet">{t("Part {n}", { n: i + 1 })}</span>
                  <h2 className="mt-4 text-2xl md:text-3xl">{a.title}</h2>
                  <p className="mt-3 text-lg text-ink-soft">{a.excerpt}</p>
                  <span className="link-arrow mt-5">{t("Read this part")} <span aria-hidden>→</span></span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-ink-soft">{t("More parts will appear here as they are published.")} <Link href="/anubhuti/" className="font-extrabold text-ink underline decoration-saffron decoration-[3px] underline-offset-4">{t("Get them in your inbox")}</Link></p>
      </section>
      <CtaBand />
    </>
  );
}
