"use client";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Icon } from "@/components/Art";
import Counter from "@/components/Counter";
import Cover from "@/components/Cover";
import Magnetic from "@/components/Magnetic";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { P, PILLAR_ICONS, SERVICE_ICONS } from "@/lib";

type Latest = { slug: string; title: string; excerpt: string; date: string; cover?: string };

const words = P.hero.title.split(" ");
const D = 1.5; // start once the loader lifts

export default function HomeClient({ latest = [] }: { latest?: Latest[] }) {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const yTxt = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  const mx = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });
  const px = useTransform(mx, (v) => v * 18), py = useTransform(my, (v) => v * 18);

  return (
    <>
      {/* ---------------------------------------------------------------- HERO */}
      <section
        ref={heroRef}
        className="on-dark grain relative flex min-h-screen flex-col justify-between overflow-hidden bg-teal-950 text-ivory"
        onMouseMove={(e) => { if (reduce) return; mx.set(e.clientX / window.innerWidth - 0.5); my.set(e.clientY / window.innerHeight - 0.5); }}
      >
        <div aria-hidden className="pointer-events-none absolute left-[38%] top-[8%] h-[780px] w-[780px] animate-spinslow rounded-full border border-gold/15" />
        <div aria-hidden className="pointer-events-none absolute left-[46%] top-[18%] h-[560px] w-[560px] rounded-full border border-gold/10" />
        <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-6 pb-12 pt-36 lg:grid-cols-12 lg:pt-32">
          <motion.div style={reduce ? undefined : { y: yTxt, opacity: fade }} className="lg:col-span-7">
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D }} className="label">{P.hero.eyebrow}</motion.p>
            <h1 className="mt-8 font-serif text-[2.9rem] font-light leading-[1.02] sm:text-7xl xl:text-[6.4rem]">
              <span className="sr-only">{P.hero.title}</span>
              {words.map((w, i) => (
                <span key={i} aria-hidden className="inline-block overflow-hidden pb-2 align-bottom">
                  <motion.span className={`inline-block pr-[0.22em] ${i >= words.length - 3 ? "italic text-gold-light" : ""}`} initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: D + 0.1 + i * 0.09, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>{w}</motion.span>
                </span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D + 1 }} className="mt-9 max-w-xl text-lg leading-relaxed text-ivory/75">{P.hero.subtitle}</motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D + 1.2 }} className="mt-11 flex flex-wrap items-center gap-5">
              <Magnetic><Link href={P.hero.ctaPrimary.href} className="btn-gold">{P.hero.ctaPrimary.label}</Link></Magnetic>
              <Magnetic><Link href={P.hero.ctaSecondary.href} className="btn-ghost text-ivory">{P.hero.ctaSecondary.label}</Link></Magnetic>
            </motion.div>
          </motion.div>

          <motion.div style={reduce ? undefined : { y: yImg, x: px }} className="hidden lg:col-span-5 lg:block">
            <motion.div initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D + 0.2, duration: 1.4, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto w-[82%]">
              <div aria-hidden className="arch absolute -inset-3 border border-gold/50" />
              <div className="arch relative aspect-[3/4] overflow-hidden bg-teal-900 shadow-[0_60px_100px_-40px_rgba(0,0,0,0.9)]"><Photo scene="play" slot="hero" alt="Tripta Tarunesh speaking at an event" /></div>
              <motion.div style={reduce ? undefined : { y: py }} className="absolute -bottom-6 -left-10 border border-gold/50 bg-teal-950/95 px-6 py-5 backdrop-blur">
                <p className="font-serif text-4xl font-light text-gold-light">Nearly 20</p>
                <p className="mt-1 text-[0.66rem] uppercase tracking-[0.25em] text-ivory/70">years in ECCE</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: D + 1.6 }} className="relative border-t border-gold/25">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-10 gap-y-2 px-6 py-5 text-[0.68rem] uppercase tracking-[0.28em] text-ivory/65">
            {["Harvard CEEL-PZ", "Educational Mentoring India", "PlayXploration", "India & the Gulf"].map((t) => <li key={t}>{t}</li>)}
          </div>
        </motion.ul>
      </section>

      {/* ------------------------------------------------------ THE QUESTION */}
      <section className="bg-ivory py-28 md:py-40">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-3"><p className="label">01 &nbsp;The question</p></Reveal>
          <div className="lg:col-span-9">
            <Reveal delay={0.1}><h2 className="font-serif text-4xl font-light leading-[1.12] text-teal-900 md:text-6xl xl:text-[4.4rem]">{P.about.question.replace(/\?$/, "")}<span className="italic text-gold-dark">?</span></h2></Reveal>
            <div className="mt-14 grid gap-10 border-t border-gold/40 pt-10 md:grid-cols-2">
              <Reveal delay={0.1}><p className="text-xl leading-relaxed text-ink/85">{P.about.answer}</p></Reveal>
              <Reveal delay={0.2}><p className="leading-relaxed text-ink/75">{P.about.paragraphs[0]}</p><Link href="/about/" className="mt-8 inline-flex min-h-[44px] items-center gap-3 border-b border-gold pb-1 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-teal-900 transition hover:gap-5">Read her story <span aria-hidden>→</span></Link></Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- FOUNDATIONS */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="flex flex-wrap items-end justify-between gap-6"><div><p className="label">02 &nbsp;Foundations</p><h2 className="mt-6 max-w-2xl font-serif text-4xl font-light leading-[1.1] text-teal-900 md:text-6xl">Four things come before any worksheet.</h2></div></Reveal>
          <ul className="mt-16 grid border-y border-gold/50 sm:grid-cols-2 lg:grid-cols-4">
            {P.about.pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <li className="group h-full border-gold/40 p-8 transition duration-500 hover:bg-white/60 sm:border-r lg:last:border-r-0">
                  <span className="font-serif text-5xl font-light text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mt-8 block text-gold-dark"><Icon name={PILLAR_ICONS[p.title] || "blocks"} className="h-8 w-8" /></span>
                  <h3 className="mt-5 font-serif text-3xl text-teal-900">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/75">{p.text}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------ SERVICES */}
      <section className="on-dark relative bg-teal-950 py-24 text-ivory md:py-36">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal><p className="label">03 &nbsp;How she helps schools</p><h2 className="mt-6 font-serif text-4xl font-light leading-[1.1] md:text-6xl">Practical systems, <span className="italic text-gold-light">not paperwork.</span></h2></Reveal>
              <Reveal delay={0.1}>
                <div className="arch relative mt-12 hidden aspect-[4/3] w-[86%] overflow-hidden border border-gold/50 bg-teal-900 lg:block"><Photo scene="workshop" slot="workshop" alt="" /></div>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ul className="border-t border-gold/30">
              {P.services.map((s, i) => (
                <Reveal key={s.title} delay={0.03 * i}>
                  <li className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-gold/30 py-7 transition-all duration-500 hover:pl-3 md:grid-cols-[4rem_1fr_auto]">
                    <span className="font-serif text-2xl font-light text-gold">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-serif text-3xl font-light text-ivory transition group-hover:text-gold-light">{s.title}</h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-ivory/65">{s.text}</p>
                    </div>
                    <span className="hidden self-center text-gold md:block"><Icon name={SERVICE_ICONS[i]} /></span>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-10"><Link href="/services/" className="btn-gold">All services</Link></Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- STATS */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal><p className="label">04 &nbsp;In numbers</p></Reveal>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4">
            {P.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="h-full border-gold/50 px-2 py-8 sm:px-8 sm:first:pl-0 lg:border-l lg:first:border-l-0">
                  <p className="font-serif text-6xl font-light text-teal-900 md:text-7xl"><Counter to={s.value} prefix={s.prefix} suffix={s.suffix} /></p>
                  <div className="my-5 h-px w-12 bg-gold" />
                  <p className="max-w-[16rem] text-sm leading-relaxed text-ink/75">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- INITIATIVES */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal><p className="label">05 &nbsp;Initiatives</p><h2 className="mt-6 max-w-3xl font-serif text-4xl font-light leading-[1.1] text-teal-900 md:text-6xl">Ideas with <span className="italic text-gold-dark">a place to land.</span></h2></Reveal>
          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            {[
              { href: "/playxploration/", tag: "Founded by Tripta", title: "PlayXploration", text: P.playx.tagline, scene: "play" as const, slot: "play" },
              { href: "/foundation-years-first/", tag: "Educational Mentoring India", title: "Foundation Years First", text: P.fyf.premise, scene: "classroom" as const, slot: "classroom" },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.12}>
                <Link href={c.href} className="group block">
                  <div className="aspect-[16/11] overflow-hidden bg-teal-900"><div className="h-full w-full transition duration-[1200ms] group-hover:scale-105"><Photo scene={c.scene} slot={c.slot} alt="" /></div></div>
                  <div className="mt-7 flex items-start justify-between gap-6">
                    <div>
                      <p className="label">{c.tag}</p>
                      <h3 className="mt-4 font-serif text-4xl font-light text-teal-900 md:text-5xl">{c.title}</h3>
                      <p className="mt-3 max-w-md leading-relaxed text-ink/75">{c.text}</p>
                    </div>
                    <span aria-hidden className="mt-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold text-xl text-gold-dark transition duration-500 group-hover:bg-teal-900 group-hover:text-gold-light">→</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ SPEAKING */}
      <section className="on-dark grain relative overflow-hidden bg-teal-900 py-24 text-ivory md:py-36">
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-12">
          <Reveal className="order-2 lg:order-1 lg:col-span-6">
            <p className="label">06 &nbsp;On stage</p>
            <h2 className="mt-6 font-serif text-5xl font-light leading-[1.05] md:text-7xl">{P.speaking.events[0].title}</h2>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-gold-light">{P.speaking.events[0].where} · {P.speaking.events[0].when}</p>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-ivory/80">{P.speaking.events[0].text}</p>
            <div className="mt-10 flex flex-wrap gap-4"><Link href="/speaking/" className="btn-gold">Speaking &amp; recognition</Link><Link href="/gallery/" className="btn-ghost text-ivory">Event gallery</Link></div>
          </Reveal>
          <Reveal delay={0.15} className="order-1 lg:order-2 lg:col-span-6">
            <div className="relative mx-auto max-w-lg"><div aria-hidden className="absolute -inset-3 translate-x-4 translate-y-4 border border-gold/40" /><div className="relative aspect-[4/5] overflow-hidden bg-teal-950"><Photo scene="stage" slot="stage" alt="" /></div></div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------------- BLOG */}
      {!!latest.length && (
        <section className="bg-ivory py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <div><p className="label">07 &nbsp;Journal</p><h2 className="mt-6 max-w-2xl font-serif text-4xl font-light leading-[1.1] text-teal-900 md:text-6xl">Fresh thinking on the Foundation Years.</h2></div>
              <Link href="/blog/" className="btn-dark">All articles</Link>
            </Reveal>
            <div className="mt-16 grid gap-10 md:grid-cols-3">
              {latest.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.1}>
                  <Link href={`/blog/${p.slug}/`} className="group block">
                    <div className="aspect-[4/3] overflow-hidden bg-teal-900"><div className="h-full w-full transition duration-[1200ms] group-hover:scale-105"><Cover src={p.cover} alt="" seed={i} /></div></div>
                    <h3 className="mt-6 font-serif text-3xl leading-tight text-teal-900 transition group-hover:text-teal-700">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">{p.excerpt}</p>
                    <span className="mt-5 inline-block text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold-dark">Read article →</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- CTA */}
      <section className="on-dark grain relative overflow-hidden bg-teal-950 py-28 text-center text-ivory md:py-40">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10" />
        <Reveal className="relative mx-auto max-w-4xl px-6">
          <p className="label mx-auto">An invitation</p>
          <h2 className="mt-8 font-serif text-5xl font-light leading-[1.05] md:text-8xl">Let us build the <span className="italic text-gold-light">foundation</span> together.</h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ivory/70">{P.about.workWith}</p>
          <div className="mt-12"><Magnetic><Link href="/contact/" className="btn-gold">Start a conversation</Link></Magnetic></div>
        </Reveal>
      </section>
    </>
  );
}
