"use client";
import { motion } from "framer-motion";
import Photo from "./Photo";
import type { SceneName } from "./Scenes";

// pages pass an art name; map it to the plate / photo slot used on that page
const MAP: Record<string, { scene: SceneName; slot: string }> = {
  tree: { scene: "classroom", slot: "classroom" },
  blocks: { scene: "workshop", slot: "workshop" },
  kite: { scene: "play", slot: "play" },
  steps: { scene: "outdoor", slot: "outdoor" },
  pages: { scene: "reading", slot: "reading" },
  stage: { scene: "stage", slot: "stage" },
  plane: { scene: "reading", slot: "reading" },
};

export default function PageHero({ eyebrow, title, sub, art }: { eyebrow: string; title: string; sub?: string; art?: string }) {
  const m = MAP[art || "kite"] ?? MAP.kite;
  return (
    <section className="on-dark grain relative overflow-hidden bg-teal-950 pb-24 pt-44 text-ivory md:pb-28">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[620px] w-[620px] rounded-full border border-gold/15" />
      <div aria-hidden className="pointer-events-none absolute -right-20 top-30 h-[460px] w-[460px] rounded-full border border-gold/10" />
      <div className="relative mx-auto grid max-w-7xl items-end gap-14 px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }} className="label">{eyebrow}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1.1, ease: [0.22, 1, 0.36, 1] }} className="mt-7 font-serif text-5xl font-light leading-[1.02] md:text-7xl xl:text-[5.4rem]">{title}</motion.h1>
          {sub && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 1 }} className="mt-9 max-w-xl text-lg leading-relaxed text-ivory/75">{sub}</motion.p>}
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="hidden lg:col-span-5 lg:block">
          <div className="arch relative mx-auto aspect-[3/4] w-[78%] overflow-hidden border border-gold/50 bg-teal-900 p-0 shadow-[0_50px_90px_-40px_rgba(0,0,0,0.8)]">
            <Photo slot={m.slot} scene={m.scene} alt="" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
