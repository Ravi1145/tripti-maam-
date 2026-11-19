"use client";
import Link from "@/components/LocLink";
import { useMemo, useState } from "react";
import { useT } from "./I18nProvider";
import type { SelfCheck as Data } from "@/lib/content";

/** A ten-question reflection for school leaders. Answers never leave the browser. */
export default function SelfCheck({ data }: { data: Data }) {
  const t = useT();
  const [answers, setAnswers] = useState<(number | null)[]>(() => data.questions.map(() => null));
  const [done, setDone] = useState(false);
  const answered = answers.filter((a) => a !== null).length;
  const total = data.questions.length;

  const scores = useMemo(
    () => data.areas.map((a) => {
      const idx = data.questions.map((q, i) => (q.area === a.key ? i : -1)).filter((i) => i >= 0);
      const max = idx.length * (data.scale.length - 1);
      const got = idx.reduce((s, i) => s + (answers[i] ?? 0), 0);
      return { ...a, pct: max ? Math.round((got / max) * 100) : 0 };
    }),
    [answers, data]
  );
  const lowest = [...scores].sort((a, b) => a.pct - b.pct)[0];

  if (done) {
    return (
      <div className="card p-6 md:p-10" aria-live="polite">
        <p className="eyebrow">{t("Your reflection")}</p>
        <h2 className="mt-3 text-3xl md:text-4xl">{t("Where your team can look first")}</h2>
        <p className="mt-3 max-w-2xl text-ink-soft">{t("Every bar is a starting point for a conversation, not a grade. Strengths are worth naming too.")}</p>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {scores.map((s) => (
            <li key={s.key} className={`rounded-card p-6 tint-${s.tint}`}>
              <div className="flex items-baseline justify-between"><h3 className="text-xl">{s.label}</h3><span className="text-sm font-extrabold">{s.pct}%</span></div>
              <div className="mt-3 h-3 overflow-hidden rounded-pill bg-white/70" role="img" aria-label={`${s.label}: ${s.pct}%`}><div className="h-full rounded-pill bg-ink transition-all duration-700" style={{ width: `${Math.max(s.pct, 6)}%` }} /></div>
              {s.key === lowest.key && <p className="mt-4 text-[0.95rem]"><strong>{t("A good place to start:")}</strong> {s.advice}</p>}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/contact/" className="btn btn-primary">{t("Talk this through with me")}</Link>
          <button onClick={() => { setAnswers(data.questions.map(() => null)); setDone(false); }} className="btn btn-outline">{t("Start again")}</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (answered === total) setDone(true); }} className="card p-6 md:p-10">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-extrabold">{t("{a} of {n} answered", { a: answered, n: total })}</p>
        <div className="h-2 w-40 overflow-hidden rounded-pill bg-paper-2" aria-hidden><div className="h-full rounded-pill bg-saffron transition-all" style={{ width: `${(answered / total) * 100}%` }} /></div>
      </div>
      <ol className="mt-8 space-y-8">
        {data.questions.map((q, i) => (
          <li key={i}>
            <fieldset>
              <legend className="text-lg font-bold md:text-xl"><span className="mr-2 text-saffron-deep">{i + 1}.</span>{q.text}</legend>
              <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
                {data.scale.map((label, v) => {
                  const on = answers[i] === v;
                  return (
                    <label key={label} className={`flex min-h-[48px] cursor-pointer items-center justify-center rounded-pill border-2 px-3 text-center text-sm font-bold transition has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-violet ${on ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink"}`}>
                      <input type="radio" name={`q${i}`} value={v} checked={on} onChange={() => setAnswers((a) => a.map((x, j) => (j === i ? v : x)))} className="sr-only" />{label}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>
      <button type="submit" disabled={answered < total} className="btn btn-primary mt-10 disabled:cursor-not-allowed disabled:opacity-50">{t("See my reflection")}</button>
      {answered < total && <p className="mt-3 text-sm text-ink-soft">{t("Answer all {n} to see your reflection.", { n: total })}</p>}
    </form>
  );
}
