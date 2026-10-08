"use client";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Icon } from "./Art";
import Reveal from "./Reveal";
import { P, PILLAR_ICONS } from "@/lib";

const chapters = [
  {
    n: "01",
    label: "The question",
    title: P.about.question,
    body: P.about.answer,
  },
  {
    n: "02",
    label: "The foundations",
    title: "Four things shape a child before any worksheet does.",
    list: P.about.pillars.map((p) => `${p.title}: ${p.text}`),
  },
  {
    n: "03",
    label: "The system",
    title: "Then we turn insight into a Monday morning.",
    body: P.hero.subtitle,
    cta: { href: "/services/", label: "See how I work with schools" },
  },
];

export default function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section className="relative bg-ivory py-24 md:py-36" aria-label="The story">
      <div ref={ref} className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-12">
        <div className="relative hidden md:col-span-1 md:block" aria-hidden>
          <div className="sticky top-1/3 mx-auto h-48 w-px bg-gold/25">
            <motion.div style={{ scaleY: h }} className="h-full w-px origin-top bg-gradient-to-b from-gold-dark to-gold-light" />
          </div>
        </div>
        <div className="space-y-32 md:col-span-11 md:space-y-48">
          {chapters.map((c) => (
            <article key={c.n} className="grid gap-8 md:grid-cols-11">
              <Reveal className="md:col-span-3">
                <p className="font-serif text-7xl text-gold/70 md:text-8xl">{c.n}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.35em] text-gold-dark">{c.label}</p>
              </Reveal>
              <div className="md:col-span-8">
                <Reveal delay={0.1}>
                  <h2 className="font-serif text-4xl leading-[1.12] text-teal-900 md:text-6xl">{c.title}</h2>
                </Reveal>
                {c.body && <Reveal delay={0.2}><p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/80">{c.body}</p></Reveal>}
                {c.list && (
                  <ul className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-gold/30 sm:grid-cols-2">
                    {c.list.map((t) => {
                      const [a, b] = t.split(": ");
                      return (
                        <li key={a} className="group bg-ivory p-7 transition hover:bg-white">
                          <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-900 text-gold-light transition duration-500 group-hover:rotate-12 group-hover:scale-110"><Icon name={PILLAR_ICONS[a] || "blocks"} /></span>
                          <p className="font-serif text-2xl text-teal-900">{a}</p>
                          <p className="mt-2 text-sm leading-relaxed text-ink/70">{b}</p>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {c.cta && (
                  <Reveal delay={0.3}>
                    <Link href={c.cta.href} className="mt-10 inline-flex min-h-[44px] items-center border-b border-gold pb-1 text-sm font-semibold tracking-wide text-teal-900 transition hover:text-gold-dark">
                      {c.cta.label} →
                    </Link>
                  </Reveal>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
