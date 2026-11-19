import Link from "@/components/LocLink";
import ContactForm from "@/components/ContactForm";
import { Icon, IconTile } from "@/components/Icon";
import Img from "@/components/Img";
import { Orbs } from "@/components/PageHero";
import Reveal, { RevealItem } from "@/components/Reveal";
import { ABILITIES, getAges, getArticles } from "@/lib/content";
import { getProfile } from "@/lib";
import { agePhoto } from "@/lib/img";
import type { Locale } from "@/lib/i18n";
import { getT } from "@/lib/messages";

const OFFER_PHOTOS = [
  { src: "/photos/educators.webp", alt: "Educators together after a workshop" },
  { src: "/photos/leaders.webp", alt: "A conversation with a centre's leaders" },
  { src: "/photos/walkthrough.webp", alt: "Walking a school with its team" },
  { src: "/photos/library.webp", alt: "Planning with a school team" },
];
const TRUST_TINT = ["tint-saffron", "tint-violet", "tint-sky", "tint-mint"];

export default function Home({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getT(locale);
  const P = getProfile(locale);
  const h = P.home;
  const ages = getAges(locale).items;
  const all = getArticles(locale);
  const featured = ["lid-wont-fit", "before-they-speak", "see-maths-thinking"].map((s) => all.find((a) => a.slug === s)).filter(Boolean) as typeof all;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-12 md:pb-24 md:pt-20">
        <Orbs />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow rise">{h.eyebrow}</p>
            <h1 className="rise mt-4 text-[2.7rem] leading-[1.1] md:text-6xl xl:text-[4.4rem]" style={{ ["--d" as string]: "0.08s" }}>
              {h.headlineStart} <span className="hl">{h.headlineHighlight}</span>
            </h1>
            <p className="rise mt-7 max-w-xl text-lg text-ink-soft md:text-xl" style={{ ["--d" as string]: "0.18s" }}>{h.sub}</p>
            <div className="rise mt-9 flex flex-wrap items-center gap-x-6 gap-y-4" style={{ ["--d" as string]: "0.28s" }}>
              <Link href="/contact/" className="btn btn-primary">{t("Book a school conversation")} <Icon name="arrow" className="h-5 w-5" /></Link>
              <Link href="/ages/" className="link-arrow">{t("Explore by age")} <span aria-hidden>→</span></Link>
            </div>
            <ul className="rise mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4" style={{ ["--d" as string]: "0.38s" }}>
              {h.trust.map((x, i) => (
                <li key={x.label} className={`rounded-2xl p-4 ${TRUST_TINT[i]}`}>
                  <p className="text-xl font-extrabold leading-none md:text-2xl">{x.value}</p>
                  <p className="mt-2 text-xs font-semibold leading-snug text-ink-soft">{x.label}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rise lg:col-span-5" style={{ ["--d" as string]: "0.2s" }}>
            <div className="relative">
              <div aria-hidden className="absolute -inset-5 rotate-3 rounded-[2.8rem] bg-saffron-tint" />
              <div className="absolute -bottom-8 -left-6 h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-lift md:h-36 md:w-36"><Img src="/photos/kid-rug.webp" alt="" sizes="150px" position="55% 58%" /></div>
              <figure className="relative overflow-hidden rounded-card shadow-lift">
                <div className="aspect-[4/3]"><Img src="/photos/campus.webp" alt={t("Tripta Tarunesh with a colleague on a school campus")} sizes="(min-width: 1024px) 40vw, 100vw" priority position="45% 55%" /></div>
              </figure>
              <span className="chip chip-violet absolute -right-2 -top-4 bg-white shadow-soft">Foundation Years First</span>
            </div>
          </div>
        </div>
      </section>

      {/* BAND */}
      <section className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="rounded-[2.2rem] bg-night p-6 text-white md:p-9">
            <p className="eyebrow !text-sun">{t("Why this work matters")}</p>
            <h2 className="mt-3 max-w-4xl text-2xl !text-white md:text-4xl">{h.band.title}</h2>
            <p className="mt-4 max-w-4xl text-base text-white/85 md:text-lg">{h.band.text}</p>
            <Link href="/about/" className="btn btn-light mt-6">{t("Read my story")}</Link>
          </div>
        </Reveal>
      </section>

      {/* PILLARS */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal><p className="eyebrow">{t("What shapes a child first")}</p><h2 className="mt-3 max-w-2xl text-3xl md:text-5xl">{t("Four things come before any")} <span className="hl hl-coral">{t("worksheet.")}</span></h2></Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {h.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <div className={`h-full rounded-card p-7 tint-${p.tint}`}>
                <IconTile name={p.icon} tint={p.tint} size="h-14 w-14 bg-white" />
                <h3 className="mt-6 text-2xl">{p.title}</h3>
                <p className="mt-2 text-[0.98rem]">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EXPLORE BY AGE */}
      <section id="explore" className="bg-paper-2 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div><p className="eyebrow">{t("For families and educators")}</p><h2 className="mt-3 text-3xl md:text-5xl">{t("Explore by")} <span className="hl hl-violet">{t("age.")}</span></h2><p className="mt-4 max-w-xl text-lg text-ink-soft">{t("Choose an age for something to notice, something to try and a question to read about.")}</p></div>
            <Link href="/ages/" className="link-arrow">{t("All age guides")} <span aria-hidden>→</span></Link>
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ages.map((a, i) => (
              <li key={a.slug}>
                <Reveal className="h-full" delay={(i % 4) * 0.06}>
                  <Link href={`/ages/${a.slug}/`} className={`card-hover group flex h-full min-h-[140px] flex-col justify-between overflow-hidden rounded-card transition tint-${a.stage}`}>
                    {agePhoto(a.slug) && <div className="aspect-[16/10] w-full overflow-hidden"><div className="h-full transition duration-700 group-hover:scale-105"><Img src={agePhoto(a.slug) as string} alt="" sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw" /></div></div>}
                    <div className="p-5 pb-0"><p className="text-xl font-extrabold">{a.label}</p><p className="mt-1 text-sm text-ink-soft">{a.short}</p></div>
                    <span aria-hidden className="m-5 mt-4 flex h-9 w-9 items-center justify-center rounded-full bg-white font-extrabold transition group-hover:translate-x-1">→</span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* QUESTIONS */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div><p className="eyebrow">{t("Everyday moments")}</p><h2 className="mt-3 text-3xl md:text-5xl">{t("Start with a")} <span className="hl hl-saffron">{t("question.")}</span></h2></div>
          <Link href="/articles/" className="link-arrow">{t("Browse all articles")} <span aria-hidden>→</span></Link>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((a, i) => {
            const ab = ABILITIES[a.ability];
            return (
              <Reveal key={a.slug} delay={i * 0.08}>
                <Link href={`/articles/${a.slug}/`} className="card card-hover flex h-full flex-col p-8">
                  <span className={`chip chip-${ab.tint} self-start`}>{t(ab.label)}</span>
                  <h3 className="mt-5 text-2xl leading-tight">{a.title}</h3>
                  <p className="mt-3 flex-1 text-ink-soft">{a.excerpt}</p>
                  <span className="mt-6 flex items-center justify-between text-sm font-extrabold">{t("{n} min read", { n: a.readingMinutes })} <span aria-hidden>→</span></span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* WORK WITH SCHOOLS */}
      <section className="bg-paper-2 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal><p className="eyebrow">{t("For school leaders")}</p><h2 className="mt-3 max-w-3xl text-3xl md:text-5xl">{t("Systems that work for real children in")} <span className="hl">{t("real classrooms.")}</span></h2><p className="mt-5 max-w-2xl text-lg text-ink-soft">{P.schools.intro}</p></Reveal>
          <div className="mt-14 space-y-8">
            {P.schools.offers.map((o, i) => (
              <Reveal key={o.title}>
                <div className="card grid items-center gap-8 overflow-hidden p-5 md:grid-cols-2 md:p-6">
                  <div className={`${i % 2 ? "md:order-2" : ""} aspect-[4/3] overflow-hidden rounded-[1.4rem]`}><Img src={OFFER_PHOTOS[i].src} alt={t(OFFER_PHOTOS[i].alt)} sizes="(min-width: 768px) 45vw, 100vw" /></div>
                  <div className="p-3 md:p-8">
                    <span className={`chip chip-${o.tint}`}>0{i + 1}</span>
                    <h3 className="mt-4 text-3xl md:text-4xl">{o.title}</h3>
                    <p className="mt-4 text-lg text-ink-soft">{o.text}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">{o.items.map((x) => <li key={x} className={`chip chip-${o.tint}`}>{x}</li>)}</ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center"><Link href="/work-with-schools/" className="btn btn-outline">{t("See how we work together")}</Link></div>
        </div>
      </section>

      {/* SELF-CHECK */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.2rem] tint-violet p-8 md:p-14">
            <div aria-hidden className="orb orb-2 -right-16 -top-16 h-72 w-72 bg-white/60" />
            <div className="relative grid items-center gap-8 md:grid-cols-12">
              <div className="md:col-span-7">
                <p className="eyebrow !text-violet-deep">{t("Free · 5 minutes")}</p>
                <h2 className="mt-3 text-3xl md:text-5xl">{t("Is your Foundation Years programme")} <span className="hl hl-saffron">{t("on track?")}</span></h2>
                <p className="mt-5 max-w-xl text-lg">{t("Ten statements about an ordinary day in your school. You get a reflection across relationships, play, language, thinking, and how you see and plan.")}</p>
                <Link href="/self-check/" className="btn btn-primary mt-8">{t("Take the school self-check")}</Link>
                <p className="mt-4 text-sm font-semibold">{t("Your answers stay in your browser.")}</p>
              </div>
              <ul className="space-y-3 md:col-span-5" aria-hidden>
                {[["Relationships", "bg-coral", 70], ["Play", "bg-sun", 85], ["Language", "bg-sky", 55], ["Thinking", "bg-violet", 62]].map(([l, c, v]) => (
                  <li key={l as string} className="rounded-2xl bg-white p-4 shadow-soft"><div className="flex justify-between text-sm font-extrabold"><span>{t(l as string)}</span><span className="text-ink-soft">{t("sample")}</span></div><div className="mt-2 h-2.5 overflow-hidden rounded-pill bg-paper-2"><div className={`h-full rounded-pill ${c}`} style={{ width: `${v}%` }} /></div></li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <Reveal className="text-center"><p className="eyebrow">{t("How working together works")}</p><h2 className="mt-3 text-3xl md:text-5xl">{t("Three simple steps.")}</h2></Reveal>
        <ol className="relative mt-14 grid gap-6 md:grid-cols-3">
          {P.schools.process.map((s, i) => (
            <RevealItem key={s.title} delay={i * 0.1} className="card h-full p-8 text-center">
              <span className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-xl font-extrabold ${["bg-saffron-tint text-saffron-deep", "bg-violet-tint text-violet-deep", "bg-mint-tint text-mint-deep"][i]}`}>{i + 1}</span>
              <h3 className="mt-5 text-2xl">{s.title}</h3>
              <p className="mt-2 text-ink-soft">{s.text}</p>
            </RevealItem>
          ))}
        </ol>
      </section>

      {/* INITIATIVES */}
      <section className="bg-paper-2 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal><p className="eyebrow">{t("Two initiatives")}</p><h2 className="mt-3 text-3xl md:text-5xl">{t("Ideas with")} <span className="hl hl-mint">{t("a place to land.")}</span></h2></Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              { href: "/playxploration/", tint: "sun", tag: t("Founded by Tripta"), title: "PlayXploration", text: P.playx.tagline, icon: "blocks" },
              { href: "/foundation-years-first/", tint: "coral", tag: t("Educational Mentoring India"), title: "Foundation Years First", text: P.fyf.premise, icon: "compass" },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.1}>
                <Link href={c.href} className={`card-hover group flex h-full flex-col rounded-card p-8 tint-${c.tint} md:p-10`}>
                  <IconTile name={c.icon} tint={c.tint} size="h-14 w-14 bg-white" />
                  <p className="eyebrow mt-6 !text-ink-soft">{c.tag}</p>
                  <h3 className="mt-2 text-3xl md:text-4xl">{c.title}</h3>
                  <p className="mt-3 flex-1 text-lg">{c.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-extrabold transition group-hover:gap-4">{t("Explore")} <span aria-hidden>→</span></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ANUBHUTI */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <div className="grid items-center gap-10 rounded-[2.2rem] bg-night p-8 text-white md:grid-cols-2 md:p-14">
            <div>
              <p className="eyebrow !text-sun">{t("A monthly letter")}</p>
              <h2 className="mt-3 text-3xl !text-white md:text-5xl">{P.newsletter.name}</h2>
              <p className="mt-5 text-lg text-white/85">{P.newsletter.intro}</p>
              <Link href="/anubhuti/" className="mt-6 inline-flex min-h-[44px] items-center font-extrabold text-sun underline underline-offset-4">{t("Read the first letter")} →</Link>
            </div>
            <div className="rounded-card bg-white p-6 text-ink md:p-8"><p className="mb-4 text-lg font-extrabold">{t("Join Anubhuti")}</p><ContactForm variant="subscribe" /></div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
