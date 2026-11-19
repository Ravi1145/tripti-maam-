"use client";
import { useId, useMemo, useState } from "react";
import { useT } from "./I18nProvider";

export default function FaqList({ items, searchable = true }: { items: { question: string; answer: string }[]; searchable?: boolean }) {
  const t = useT();
  const [open, setOpen] = useState<number | null>(0);
  const [q, setQ] = useState("");
  const id = useId();
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    return items.filter((it) => !t || it.question.toLowerCase().includes(t) || it.answer.toLowerCase().includes(t));
  }, [items, q]);
  return (
    <div>
      {searchable && (
        <label className="block">
          <span className="sr-only">{t("Search questions")}</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("Search questions...")} className="w-full min-h-[52px] rounded-pill border border-line bg-white px-6 text-base outline-none transition focus:border-violet focus:ring-2 focus:ring-violet/30" />
        </label>
      )}
      <p className="sr-only" role="status" aria-live="polite">{t("{n} questions shown", { n: shown.length })}</p>
      <ul className="mt-6 space-y-3">
        {shown.map((it, i) => {
          const isOpen = open === i;
          return (
            <li key={it.question} className="card overflow-hidden">
              <h3 className="text-base">
                <button id={`${id}-b${i}`} aria-expanded={isOpen} aria-controls={`${id}-p${i}`} onClick={() => setOpen(isOpen ? null : i)} className="flex min-h-[64px] w-full items-center justify-between gap-6 px-6 py-5 text-left">
                  <span className="text-lg font-extrabold md:text-xl">{it.question}</span>
                  <span aria-hidden className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xl font-extrabold transition duration-300 ${isOpen ? "rotate-45 bg-saffron text-ink" : "bg-paper-2"}`}>+</span>
                </button>
              </h3>
              <div id={`${id}-p${i}`} role="region" aria-labelledby={`${id}-b${i}`} hidden={!isOpen}>
                <p className="px-6 pb-6 text-lg text-ink-soft">{it.answer}</p>
              </div>
            </li>
          );
        })}
      </ul>
      {!shown.length && <p className="mt-6 text-ink-soft">{t("No questions match your search.")}</p>}
    </div>
  );
}
