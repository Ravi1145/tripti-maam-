import type { Metadata } from "next";
import Link from "@/components/LocLink";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal, { RevealItem } from "@/components/Reveal";
import { getProfile } from "@/lib";
import type { Locale } from "@/lib/i18n";
import { getT } from "@/lib/messages";
import { pageMeta } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as Locale;
  const t = getT(locale);
  return pageMeta(locale, "/speaking/", { title: t("Speaking"), description: t("Topics I speak on, recent events and the Project Zero learning behind my work.") });
}

const TINT = ["tint-violet", "tint-coral", "tint-sky", "tint-sun"];

export default function Speaking({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getT(locale);
  const s = getProfile(locale).speaking;
  return (
    <>
      <PageHero eyebrow={t("Speaking")} title={t("On stage, and")} highlight={t("in the classroom.")} sub={t("I share practical ideas on play, observation and the Foundation Years with educators, school leaders and families.")} image="/photos/educators.webp" imageAlt={t("Educators together after a workshop")} tint="sky">
        <Link href="/contact/" className="btn btn-primary">{t("Invite me to speak")}</Link>
      </PageHero>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal><p className="eyebrow">{t("Topics")}</p></Reveal>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">{s.topics.map((x, i) => <RevealItem key={x} delay={(i % 2) * 0.06} className={`h-full rounded-card p-7 text-xl font-extrabold leading-snug ${TINT[i % 4]}`}>{x}</RevealItem>)}</ul>
      </section>

      <section className="bg-paper-2 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal><p className="eyebrow">{t("Recent")}</p><h2 className="mt-3 text-3xl md:text-5xl">{t("Where I've been")} <span className="hl hl-sky">{t("speaking.")}</span></h2></Reveal>
          <div className="mt-10 space-y-5">
            {s.events.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.08}>
                <article className="card grid gap-5 p-8 md:grid-cols-12 md:p-10">
                  <div className="md:col-span-4"><h3 className="text-2xl md:text-3xl">{e.title}</h3><p className="mt-2 font-bold text-saffron-deep">{e.when}</p><p className="text-sm text-ink-soft">{e.where}</p></div>
                  <p className="text-lg text-ink-soft md:col-span-8">{e.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal><p className="eyebrow">{t("The learning behind it")}</p><h2 className="mt-3 text-3xl md:text-5xl">{t("Project Zero,")} <span className="hl hl-violet">{t("Harvard.")}</span></h2></Reveal>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">{s.certifications.map((c, i) => <RevealItem key={c.title} delay={i * 0.07} className="card h-full p-7"><p className="text-xl font-extrabold leading-snug">{c.title}</p><p className="mt-2 text-sm text-ink-soft">{c.org}</p></RevealItem>)}</ul>
      </section>

      <CtaBand title={t("Planning an event?")} text={t("Tell me about your audience, the age group and what you would like them to take away.")} tint="sky" />
    </>
  );
}
