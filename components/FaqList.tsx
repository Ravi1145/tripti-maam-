"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useId, useMemo, useState } from "react";

export default function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const [q, setQ] = useState("");
  const id = useId();
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    return items.filter((it) => !t || it.question.toLowerCase().includes(t) || it.answer.toLowerCase().includes(t));
  }, [items, q]);

  return (
    <div>
      <label className="block">
        <span className="sr-only">Search questions</span>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions..." className="w-full rounded-full border border-gold/40 bg-white/80 px-6 py-4 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/40" />
      </label>
      <p className="sr-only" role="status" aria-live="polite">{shown.length} question{shown.length === 1 ? "" : "s"} shown</p>
      <ul className="mt-8 divide-y divide-gold/30 border-y border-gold/30">
        {shown.map((it, i) => {
          const isOpen = open === i;
          return (
            <li key={it.question}>
              <h2>
                <button id={`${id}-b${i}`} aria-expanded={isOpen} aria-controls={`${id}-p${i}`} onClick={() => setOpen(isOpen ? null : i)} className="flex min-h-[64px] w-full items-center justify-between gap-6 py-6 text-left">
                  <span className="font-serif text-2xl text-teal-900 md:text-3xl">{it.question}</span>
                  <span aria-hidden className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold text-xl text-gold-dark transition duration-300 ${isOpen ? "rotate-45 bg-gold text-teal-950" : ""}`}>+</span>
                </button>
              </h2>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div id={`${id}-p${i}`} role="region" aria-labelledby={`${id}-b${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                    <p className="max-w-3xl pb-8 text-lg leading-relaxed text-ink/80">{it.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
      {!shown.length && <p className="mt-8 text-ink/70">No questions match your search. Try the contact form instead.</p>}
    </div>
  );
}
