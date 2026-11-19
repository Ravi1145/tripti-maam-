import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getProfile } from "@/lib";
import type { Locale } from "@/lib/i18n";
import { getT } from "@/lib/messages";
import { pageMeta } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as Locale;
  const t = getT(locale);
  return pageMeta(locale, "/how-we-write/", { title: t("How we write"), description: t("How Foundation Years First articles are written: everyday moments, honest labelling and sources.") });
}

const HEAD = ["Every article starts small", "What is real and what is illustrative", "Sources and care", "About the initiative"];
const TINT = ["tint-saffron", "tint-sky", "tint-mint", "tint-violet"];

export default function HowWeWrite({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getT(locale);
  const P = getProfile(locale);
  return (
    <>
      <PageHero eyebrow={t("Our approach")} title={t("How we")} highlight={t("write.")} sub={t("Short, honest and practical. Here is what you can expect from every article.")} tint="mint" />
      <section className="mx-auto max-w-4xl space-y-5 px-6 pb-8">
        {P.howWeWrite.map((s, i) => (
          <Reveal key={i} delay={i * 0.06}><div className={`rounded-card p-8 md:p-10 ${TINT[i % 4]}`}><h2 className="text-2xl md:text-3xl">{t(HEAD[i] ?? "More")}</h2><p className="mt-3 text-lg">{s}</p></div></Reveal>
        ))}
      </section>
    </>
  );
}
