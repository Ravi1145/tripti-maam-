import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import Img from "@/components/Img";
import Link from "@/components/LocLink";
import { Orbs } from "@/components/PageHero";
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
      <section className="relative overflow-hidden pb-14 pt-12 md:pb-20 md:pt-20">
        <Orbs tint="sun" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow rise">{t("Founded by Tripta Tarunesh")}</p>
            <h1 className="rise mt-4 text-[2.6rem] leading-[1.08] md:text-6xl" style={{ ["--d" as string]: "0.08s" }}>PlayXploration</h1>
            <p className="rise mt-4 text-2xl font-extrabold leading-snug md:text-3xl" style={{ ["--d" as string]: "0.14s" }}><span className="hl">{t("play that shows what children can do.")}</span></p>
            <p className="rise mt-6 max-w-xl text-lg text-ink-soft md:text-xl" style={{ ["--d" as string]: "0.2s" }}>{p.tagline}</p>
            <div className="rise mt-8 flex flex-wrap items-center gap-4" style={{ ["--d" as string]: "0.28s" }}>
              <Link href="/contact/" className="btn btn-primary">{t("Book a school conversation")}</Link>
              <Link href="/work-with-schools/" className="link-arrow">{t("Work with schools")} <span aria-hidden>→</span></Link>
            </div>
          </div>
          <div className="rise lg:col-span-5" style={{ ["--d" as string]: "0.2s" }}>
            <div className="relative">
              <div aria-hidden className="absolute -inset-4 rotate-3 rounded-[2.5rem] bg-sun-tint" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-lift"><Img src="/photos/library.webp" alt={t("Planning with a school team")} sizes="(min-width: 1024px) 40vw, 100vw" priority /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <Reveal>
          <div className="rounded-[2rem] tint-sun p-8 md:p-12">
            <p className="eyebrow !text-ink">{t("What it is")}</p>
            <p className="mt-4 max-w-4xl text-xl font-bold leading-relaxed md:text-2xl">{p.intro}</p>
          </div>
        </Reveal>
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
