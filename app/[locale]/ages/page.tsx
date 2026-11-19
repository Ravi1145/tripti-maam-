import type { Metadata } from "next";
import Link from "@/components/LocLink";
import PageHero, { ReviewBanner } from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getAges } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { getT } from "@/lib/messages";
import { pageMeta } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as Locale;
  const t = getT(locale);
  return pageMeta(locale, "/ages/", { title: t("Explore by age"), description: t("Eight age guides from birth to eight. Each has a familiar moment, one idea to try today and something to look for next.") });
}

export default function Ages({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getT(locale);
  const { items, reviewed } = getAges(locale);
  return (
    <>
      <PageHero eyebrow={t("Birth to eight")} title={t("Explore by")} highlight={t("age.")} sub={t("Choose an age for something to notice, something to try and a question to read about.")} tint="violet" />
      <ReviewBanner reviewed={reviewed} />
      <section className="mx-auto max-w-6xl px-6 pb-8">
        <ul className="grid gap-5 sm:grid-cols-2">
          {items.map((a, i) => (
            <li key={a.slug}>
              <Reveal className="h-full" delay={(i % 2) * 0.06}>
                <Link href={`/ages/${a.slug}/`} className={`card-hover group flex h-full flex-col rounded-card p-8 tint-${a.stage}`}>
                  <span className={`chip chip-${a.stage} self-start bg-white`}>{a.label}</span>
                  <h2 className="mt-5 text-3xl">{a.title}</h2>
                  <p className="mt-1 font-bold text-ink-soft">{a.short}</p>
                  <p className="mt-4 flex-1">{a.moment}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-extrabold transition group-hover:gap-4">{t("Open the guide")} <span aria-hidden>→</span></span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
