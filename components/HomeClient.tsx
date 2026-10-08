"use client";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { BlocksArt, IconBadge, Wave } from "@/components/Art";
import Blobs from "@/components/Blobs";
import Counter from "@/components/Counter";
import Cover from "@/components/Cover";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";
import Section, { Eyebrow } from "@/components/Section";
import Story from "@/components/Story";
import TiltCard from "@/components/TiltCard";
import { P, SERVICE_ICONS } from "@/lib";

const words = P.hero.title.split(" ");
const D = 1.3; // hero starts as the loader lifts

type Latest = { slug: string; title: string; excerpt: string; date: string; cover?: string };

export default function HomeClient({ latest = [] }: { latest?: Latest[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const op = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const orbX = useTransform(mx, (v) => v * 50);
  const orbY = useTransform(my, (v) => v * 50);

  return (
    <>
      <section
        ref={ref}
        className="grain relative flex min-h-screen items-center overflow-hidden bg-teal-950 text-ivory"
        onMouseMove={(e) => {
          if (reduce) return;
          mx.set(e.clientX / window.innerWidth - 0.5);
          my.set(e.clientY / window.innerHeight - 0.5);
        }}
      >
        <motion.div style={reduce ? undefined : { y: bgY }} className="absolute inset-0"><Blobs /></motion.div>
        <motion.div aria-hidden style={reduce ? undefined : { x: orbX, y: orbY }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: D + 0.3, duration: 1.2 }} className="pointer-events-none absolute -right-6 top-1/2 hidden w-[42%] max-w-[560px] -translate-y-[44%] lg:block">
          <BlocksArt className="w-full" />
        </motion.div>
        <motion.div style={reduce ? undefined : { y, opacity: op }} className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-40">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D, duration: 0.8 }} className="mb-8 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-10 bg-gold" /> {P.hero.eyebrow}
          </motion.p>
          <h1 className="max-w-3xl font-serif text-6xl leading-[1] md:text-8xl lg:text-[6.5rem]">
            <span className="sr-only">{P.hero.title}</span>
            {words.map((w, i) => (
              <span key={i} aria-hidden className="inline-block overflow-hidden pb-3 align-bottom">
                <motion.span
                  className={`inline-block pr-[0.25em] ${i >= words.length - 3 ? "gold-text italic" : ""}`}
                  initial={{ y: "115%", rotate: 4 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ delay: D + i * 0.09, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D + 0.9, duration: 1 }} className="mt-10 max-w-2xl text-lg leading-relaxed text-ivory/80 md:text-xl">
            {P.hero.subtitle}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D + 1.2, duration: 1 }} className="mt-12 flex flex-wrap items-center gap-5">
            <Magnetic><Link href={P.hero.ctaPrimary.href} className="btn-gold min-h-[48px]">{P.hero.ctaPrimary.label} →</Link></Magnetic>
            <Magnetic><Link href={P.hero.ctaSecondary.href} className="btn-ghost min-h-[48px]">{P.hero.ctaSecondary.label}</Link></Magnetic>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: D + 1.6 }} className="mt-20 flex flex-wrap gap-x-10 gap-y-2 text-xs uppercase tracking-[0.25em] text-ivory/60">
            <span>Harvard CEEL-PZ</span><span>Educational Mentoring India</span><span>PlayXploration</span><span>India &amp; Gulf</span>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block" aria-hidden>
          <div className="h-14 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      <div className="relative overflow-hidden bg-gold py-4 text-teal-950" aria-hidden>
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-serif text-2xl italic">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12">
              {["Foundation Years", "Play-based learning", "Teacher development", "School transformation", "Visible thinking", "ECCE", "NEP 2020", "Inclusion"].map((t) => (
                <span key={t + k}>{t} ✦</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Story />

      <Section tone="dark" className="grain overflow-hidden">
        <div className="grid gap-px overflow-hidden rounded-3xl bg-gold/30 md:grid-cols-4">
          {P.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="bg-teal-900 p-8 text-center md:p-10">
              <p className="font-serif text-6xl text-gold-light md:text-7xl">
                <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-4 text-sm leading-snug text-ivory/75">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Wave from="#0F3D3E" to="#F3ECDD" />
      <Section tone="cream">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>How she helps</Eyebrow>
            <h2 className="max-w-xl font-serif text-5xl text-teal-900 md:text-6xl">Practical systems, not paperwork.</h2>
          </div>
          <Link href="/services/" className="inline-flex min-h-[44px] items-center border-b border-gold pb-1 text-sm font-semibold tracking-wide text-teal-900 hover:text-gold-dark">All services →</Link>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: 1000 }}>
          {P.services.slice(0, 4).map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <TiltCard className="h-full">
                <IconBadge name={SERVICE_ICONS[i]} />
                <h3 className="mt-5 font-serif text-3xl text-teal-900">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/75">{s.text}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Section>
      <Wave from="#F3ECDD" to="#FBF7EF" />

      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <Link href="/playxploration/" className="group relative block h-full overflow-hidden rounded-[2rem] bg-teal-900 p-10 text-ivory md:p-12">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/25 blur-2xl transition-all duration-700 group-hover:scale-150" />
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">Founder</p>
              <h3 className="mt-4 font-serif text-5xl md:text-6xl">PlayXploration</h3>
              <p className="relative mt-5 max-w-sm leading-relaxed text-ivory/80">{P.playx.tagline}</p>
              <span className="mt-10 inline-block text-sm text-gold-light transition group-hover:translate-x-2">Explore →</span>
            </Link>
          </Reveal>
          <Reveal delay={0.15}>
            <Link href="/foundation-years-first/" className="group relative block h-full overflow-hidden rounded-[2rem] border border-gold/40 bg-white p-10 md:p-12">
              <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-teal-100 blur-2xl transition-all duration-700 group-hover:scale-150" />
              <p className="relative text-xs font-medium uppercase tracking-[0.35em] text-gold-dark">New · Educational Mentoring India</p>
              <h3 className="relative mt-4 font-serif text-5xl text-teal-900 md:text-6xl">Foundation Years First</h3>
              <p className="relative mt-5 max-w-sm leading-relaxed text-ink/75">{P.fyf.premise}</p>
              <span className="relative mt-10 inline-block text-sm text-teal-900 transition group-hover:translate-x-2">Discover →</span>
            </Link>
          </Reveal>
        </div>
      </Section>

      {!!latest.length && (
        <Section tone="cream">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>From the blog</Eyebrow>
              <h2 className="max-w-xl font-serif text-5xl text-teal-900 md:text-6xl">Fresh thinking on the Foundation Years.</h2>
            </div>
            <Link href="/blog/" className="inline-flex min-h-[44px] items-center border-b border-gold pb-1 text-sm font-semibold tracking-wide text-teal-900 hover:text-gold-dark">All articles →</Link>
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {latest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.1}>
                <Link href={`/blog/${p.slug}/`} className="card-lux group block h-full overflow-hidden !p-0">
                  <div className="aspect-[16/10] overflow-hidden"><Cover src={p.cover} alt="" seed={i} className="transition duration-700 group-hover:scale-105" /></div>
                  <div className="p-7">
                    <h3 className="font-serif text-3xl leading-tight text-teal-900">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">{p.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <section className="grain relative overflow-hidden bg-teal-950 py-32 text-center text-ivory">
        <Blobs />
        <Reveal className="relative mx-auto max-w-3xl px-6">
          <p className="font-serif text-2xl italic text-gold-light">{P.writing.featured.closing}</p>
          <div className="mx-auto my-10 h-px w-24 bg-gold/60" />
          <h2 className="font-serif text-5xl leading-tight md:text-7xl">Let us build the <span className="gold-text italic">foundation</span> together.</h2>
          <p className="mx-auto mt-6 max-w-xl text-ivory/75">{P.about.workWith}</p>
          <div className="mt-10"><Magnetic><Link href="/contact/" className="btn-gold min-h-[48px]">Start a conversation →</Link></Magnetic></div>
        </Reveal>
      </section>
    </>
  );
}
