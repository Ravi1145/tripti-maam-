"use client";
import { motion } from "framer-motion";
import Blobs from "./Blobs";
import { ART, type ArtName } from "./Art";

export default function PageHero({ eyebrow, title, sub, art }: { eyebrow: string; title: string; sub?: string; art?: ArtName }) {
  const Art = art ? ART[art] : null;
  return (
    <section className="grain relative overflow-hidden bg-teal-950 pb-24 pt-44 text-ivory">
      <Blobs />
      {Art && (
        <motion.div aria-hidden={false} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }} className="pointer-events-none absolute -right-10 bottom-0 top-24 hidden w-[44%] items-center justify-center lg:flex">
          <Art className="h-full max-h-[460px] w-full" />
        </motion.div>
      )}
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="text-xs font-medium uppercase tracking-[0.4em] text-gold">{eyebrow}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }} className="mt-6 font-serif text-6xl leading-[1.02] md:text-8xl">{title}</motion.h1>
          {sub && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 1 }} className="mt-8 max-w-2xl text-lg leading-relaxed text-ivory/80">{sub}</motion.p>}
        </div>
      </div>
    </section>
  );
}
