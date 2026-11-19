import type { Metadata } from "next";
import Link from "@/components/LocLink";
import { IconTile } from "@/components/Icon";
import PageHero, { ReviewBanner } from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { ABILITIES, getAges, getArticles } from "@/lib/content";
import { getProfile } from "@/lib";
import type { Locale } from "@/lib/i18n";
import { getT } from "@/lib/messages";
import { pageMeta } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as Locale;
  const f = getProfile(locale).fyf;
  return pageMeta(locale, "/foundation-years-first/", { title: "Foundation Years First", description: `${f.premise} ${f.intro}` });
}

export default function FYF({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getT(locale);
  const f = getProfile(locale).fyf;
  const { items: ages, reviewed } = getAges(locale);
  const arts = getArticles(locale).filter((a) => a.ages.length).slice(0, 3);
  return (
    <>
      <PageHero eyebrow={`${f.by} · ${f.launched}`} title={t("What is a child learning")} highlight={t("right now?")} sub={f.intro} tint="coral">
        <Link href="/ages/" className="btn btn-primary">{t("Explore by age")}</Link>
        <Link href="/articles/" className="link-arrow">{t("Browse the articles")} <span aria-hidden>→</span></Link>
      </PageHero>
      <ReviewBanner reviewed={reviewed} />

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-5 md:grid-cols-2">
          {[
            { href: "/for-parents/", title: t("For parents"), text: t("What to notice and try at home, from birth to eight."), tint: "coral", icon: "heart" },
            { href: "/for-educators/", title: t("For educators"), text: t("Classroom ways of looking, and resources to share with families."), tint: "violet", icon: "users" },
          ].map((d, i) => (
            <Reveal key={d.href} delay={i * 0.08}>
              <Link href={d.href} className={`card-hover group flex items-center gap-6 rounded-card p-8 tint-${d.tint}`}>
                <IconTile name={d.icon} tint={d.tint} size="h-16 w-16 bg-white" />
                <div className="flex-1"><h2 className="text-2xl md:text-3xl">{d.title}</h2><p className="mt-1">{d.text}</p></div>
                <span aria-hidden className="text-2xl font-extrabold transition group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-paper-2 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal><p className="eyebrow">{t("Birth to eight")}</p><h2 className="mt-3 text-3xl md:text-5xl">{t("Choose an")} <span className="hl hl-violet">{t("age.")}</span></h2></Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ages.map((a, i) => (
              <li key={a.slug}><Reveal className="h-full" delay={(i % 4) * 0.06}><Link href={`/ages/${a.slug}/`} className={`card-hover flex h-full min-h-[130px] flex-col justify-between rounded-card p-6 tint-${a.stage}`}><div><p className="text-xl font-extrabold">{a.label}</p><p className="mt-1 text-sm text-ink-soft">{a.short}</p></div><span aria-hidden className="mt-5 font-extrabold">→</span></Link></Reveal></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6"><h2 className="text-3xl md:text-5xl">{t("Start with a")} <span className="hl hl-saffron">{t("question.")}</span></h2><Link href="/articles/" className="link-arrow">{t("All articles")} <span aria-hidden>→</span></Link></Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {arts.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.08}><Link href={`/articles/${a.slug}/`} className="card card-hover flex h-full flex-col p-8"><span className={`chip chip-${ABILITIES[a.ability].tint} self-start`}>{t(ABILITIES[a.ability].label)}</span><h3 className="mt-5 text-2xl leading-tight">{a.title}</h3><p className="mt-3 flex-1 text-ink-soft">{a.excerpt}</p></Link></Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-8">
        <Reveal>
          <div className="rounded-[2.2rem] bg-night p-8 text-white md:p-14">
            <p className="eyebrow !text-sun">{t("What we are here to do")}</p>
            <h2 className="mt-3 text-3xl !text-white md:text-5xl">{f.premise}</h2>
            <ul className="mt-8 flex flex-wrap gap-3">{f.goals.map((g) => <li key={g} className="rounded-pill bg-white/10 px-5 py-2.5 font-bold">{g}</li>)}</ul>
            <p className="mt-8 text-xl font-bold text-sun">{f.tagline}</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
