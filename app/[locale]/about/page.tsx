import type { Metadata } from "next";
import Link from "@/components/LocLink";
import CtaBand from "@/components/CtaBand";
import { IconTile } from "@/components/Icon";
import Img from "@/components/Img";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getProfile } from "@/lib";
import type { Locale } from "@/lib/i18n";
import { getT } from "@/lib/messages";
import { pageMeta } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as Locale;
  return pageMeta(locale, "/about/", { title: getT(locale)("About Tripta"), description: getProfile(locale).about.intro });
}

export default function About({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getT(locale);
  const P = getProfile(locale);
  const a = P.about;
  return (
    <>
      <PageHero eyebrow={t("About Tripta")} title={t("Hello, I'm Tripta.")} highlight={t("I look at the child first.")} sub={a.intro} image="/photos/moment.webp" imageAlt={t("A warm moment at the close of a session")} tint="saffron" />

      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-6 text-lg text-ink-soft lg:col-span-7">
          {a.story.map((s, i) => (
            <Reveal key={i}>{i === a.story.length - 1 ? <p className="rounded-card bg-sun-tint p-8 text-2xl font-extrabold leading-snug text-ink md:text-3xl">&ldquo;{s}&rdquo;</p> : <p>{s}</p>}</Reveal>
          ))}
        </div>
        <aside className="lg:col-span-5">
          <div className="space-y-4 lg:sticky lg:top-28">
            <Reveal>
              <div className="card p-7">
                <p className="eyebrow">{t("At a glance")}</p>
                <p className="mt-3 text-xl font-extrabold">{P.person.role}</p>
                <ul className="mt-5 space-y-3">{a.facts.map((f) => <li key={f} className="flex gap-3 text-[0.98rem]"><span aria-hidden className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-saffron" />{f}</li>)}</ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-card tint-violet p-7">
                <p className="eyebrow !text-violet-deep">{t("Recognition")}</p>
                <ul className="mt-4 flex flex-wrap gap-2">{a.recognition.map((r) => <li key={r} className="chip chip-violet bg-white">{r}</li>)}</ul>
              </div>
            </Reveal>
          </div>
        </aside>
      </section>

      <section className="bg-paper-2 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal><p className="eyebrow">{t("Continually learning")}</p><h2 className="mt-3 max-w-2xl text-3xl md:text-5xl">{t("What I keep studying,")} <span className="hl hl-violet">{t("and why it matters.")}</span></h2></Reveal>
          <ul className="mt-10 flex flex-wrap gap-3">{a.learning.map((l, i) => <li key={l} className={`chip text-sm ${["chip-violet", "chip-coral", "chip-sky", "chip-sun", "chip-mint", "chip-saffron"][i % 6]} !px-5 !py-2`}>{l}</li>)}</ul>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Img src="/photos/educators.webp" alt={t("Educators together after a workshop")} sizes="33vw" className="!h-72 rounded-card" />
            <Img src="/photos/walkthrough.webp" alt={t("Walking a school with its team")} sizes="33vw" className="!h-72 rounded-card" />
            <Img src="/photos/entrance.webp" alt={t("Outside a school building")} sizes="33vw" className="!h-72 rounded-card" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
        <Reveal>
          <IconTile name="users" tint="mint" size="mx-auto h-16 w-16" />
          <p className="eyebrow mt-6">{t("Who I work with")}</p>
          <p className="mt-4 text-2xl font-extrabold leading-snug md:text-4xl">{a.workWith}</p>
          <Link href="/work-with-schools/" className="btn btn-primary mt-9">{t("See how we work together")}</Link>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
