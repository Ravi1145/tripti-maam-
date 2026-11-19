import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal, { RevealItem } from "@/components/Reveal";
import { getProfile } from "@/lib";
import type { Locale } from "@/lib/i18n";
import { getT } from "@/lib/messages";
import { pageMeta } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as Locale;
  return pageMeta(locale, "/playxploration/", { title: "PlayXploration", description: getProfile(locale).playx.intro });
}

const CHIP = ["chip-violet", "chip-coral", "chip-sky", "chip-sun", "chip-mint", "chip-saffron"];

export default function PlayX({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getT(locale);
  const p = getProfile(locale).playx;
  return (
    <>
      <PageHero eyebrow={t("Founded by Tripta Tarunesh")} title="PlayXploration:" highlight={t("play that shows what children can do.")} sub={p.tagline} tint="sun" />

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <Reveal><p className="text-2xl font-extrabold leading-snug md:text-4xl">{p.intro}</p></Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {p.lenses.map((l, i) => (
            <Reveal key={l.title} delay={i * 0.1}>
              <div className={`h-full rounded-card p-8 md:p-10 tint-${l.tint}`}>
                <span className={`chip chip-${l.tint} bg-white`}>{t("Lens {n}", { n: i + 1 })}</span>
                <h2 className="mt-5 text-3xl md:text-4xl">{l.title}</h2>
                <p className="mt-3 text-lg">{l.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-paper-2 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal><p className="eyebrow">{t("Made visible")}</p><h2 className="mt-3 text-3xl md:text-5xl">{t("What play")} <span className="hl hl-coral">{t("shows us.")}</span></h2></Reveal>
          <ul className="mt-10 flex flex-wrap gap-3">{p.visible.map((v, i) => <li key={v} className={`chip text-base ${CHIP[i % 6]} !px-5 !py-2.5`}>{v}</li>)}</ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal><p className="eyebrow">{t("At the intersection of")}</p></Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {p.intersections.map((x, i) => <RevealItem key={x} delay={(i % 3) * 0.06} className="card p-6 text-xl font-extrabold">{x}</RevealItem>)}
        </ul>
      </section>

      <CtaBand title={t("Bring PlayXploration to your school.")} text={t("We can talk about your children, your team and what you would like to see.")} tint="sun" />
    </>
  );
}
