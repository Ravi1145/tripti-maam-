import type { Metadata } from "next";
import Link from "@/components/LocLink";
import ContactForm from "@/components/ContactForm";
import PageHero, { ReviewBanner } from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { ABILITIES, getAges, getArticles } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { getT } from "@/lib/messages";
import { pageMeta } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as Locale;
  const t = getT(locale);
  return pageMeta(locale, "/for-parents/", { title: t("For parents"), description: t("Everyday moments that show what your child is learning, from birth to eight. Find your child's age and choose one thing to notice and one thing to try.") });
}

export default function Parents({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getT(locale);
  const { items: ages, reviewed } = getAges(locale);
  const first = ages[0];
  const arts = getArticles(locale).filter((a) => a.ages.length).slice(0, 3);
  return (
    <>
      <PageHero eyebrow={t("For parents · Birth to eight")} title={t("You are already")} highlight={t("teaching them.")} sub={t("A nappy change, setting out cups or telling a story in the language you speak at home can show you what your child is learning. Find your child's age, then choose one thing to notice and one thing to try.")} image="/photos/kid-rug.webp" tint="coral">
        <Link href="/ages/" className="btn btn-primary">{t("Find your child's age")}</Link>
        <Link href="/articles/" className="link-arrow">{t("Start with a question")} <span aria-hidden>→</span></Link>
      </PageHero>
      <ReviewBanner reviewed={reviewed} />

      {first && (
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <Reveal>
            <div className="grid items-center gap-8 rounded-[2.2rem] tint-coral p-8 md:grid-cols-12 md:p-12">
              <div className="md:col-span-7"><span className="chip chip-coral bg-white">{t("In the first weeks")}</span><h2 className="mt-4 text-3xl md:text-4xl">{first.tryTitle}</h2><p className="mt-4 text-lg">{first.tryText}</p></div>
              <div className="md:col-span-5 md:text-right"><Link href={`/ages/${first.slug}/`} className="btn btn-primary">{t("Open the first-year guide")}</Link></div>
            </div>
          </Reveal>
        </section>
      )}

      <section className="bg-paper-2 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal><h2 className="text-3xl md:text-5xl">{t("Choose your child's")} <span className="hl hl-violet">{t("age.")}</span></h2><p className="mt-4 max-w-xl text-lg text-ink-soft">{t("Each guide has a familiar moment, one idea to try and something to look for next.")}</p></Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ages.map((a, i) => <li key={a.slug}><Reveal className="h-full" delay={(i % 4) * 0.06}><Link href={`/ages/${a.slug}/`} className={`card-hover flex h-full min-h-[120px] flex-col justify-between rounded-card p-6 tint-${a.stage}`}><div><p className="text-xl font-extrabold">{a.label}</p><p className="mt-1 text-sm text-ink-soft">{a.short}</p></div><span aria-hidden className="mt-4 font-extrabold">→</span></Link></Reveal></li>)}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal><h2 className="text-3xl md:text-5xl">{t("Everyday")} <span className="hl hl-saffron">{t("questions.")}</span></h2></Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">{arts.map((a, i) => <Reveal key={a.slug} delay={i * 0.08}><Link href={`/articles/${a.slug}/`} className="card card-hover flex h-full flex-col p-8"><span className={`chip chip-${ABILITIES[a.ability].tint} self-start`}>{t(ABILITIES[a.ability].label)}</span><h3 className="mt-5 text-2xl leading-tight">{a.title}</h3><p className="mt-3 flex-1 text-ink-soft">{a.excerpt}</p></Link></Reveal>)}</div>
        <p className="mt-10 max-w-3xl rounded-card bg-sky-tint p-6 text-sm text-ink-soft"><strong className="text-ink">{t("A note.")}</strong> {t("These guides are about noticing and supporting everyday learning. They are not medical advice. If you are worried about your child's development, please speak to your paediatrician or another qualified specialist.")}</p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-8">
        <Reveal><div className="card p-8 text-center md:p-12"><h2 className="text-3xl">{t("A letter a month")}</h2><p className="mt-3 text-ink-soft">{t("One familiar moment, one question, one thing to try. In your inbox.")}</p><div className="mx-auto mt-6 max-w-md text-left"><ContactForm variant="subscribe" /></div></div></Reveal>
      </section>
    </>
  );
}
