"use client";
import Link from "@/components/LocLink";
import { useMemo, useState } from "react";
import { useT } from "./I18nProvider";

export type CardArticle = { slug: string; title: string; excerpt: string; ages: string[]; ability: string; abilityLabel: string; tint: string; readingMinutes: number; reviewed: boolean };
export type AgeOpt = { slug: string; label: string };

/** Article library with filters by age and topic, plus a search box. Works with keyboard and screen readers. */
export default function ArticleLibrary({ articles, ages, abilities }: { articles: CardArticle[]; ages: AgeOpt[]; abilities: { key: string; label: string }[] }) {
  const t = useT();
  const [q, setQ] = useState("");
  const [age, setAge] = useState("");
  const [ab, setAb] = useState("");
  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return articles.filter((a) => (!age || a.ages.includes(age)) && (!ab || a.ability === ab) && (!s || (a.title + " " + a.excerpt).toLowerCase().includes(s)));
  }, [articles, q, age, ab]);
  const field = "w-full min-h-[48px] rounded-2xl border border-line bg-white px-4 text-base outline-none transition focus:border-violet focus:ring-2 focus:ring-violet/30";
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="card grid gap-4 p-5 md:grid-cols-4 md:p-6" role="search" aria-label={t("Filter articles")}>
        <label className="block text-sm font-bold md:col-span-2"><span className="mb-1.5 block">{t("Search")}</span><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("Try: lid, stories, turn-taking")} className={field} /></label>
        <label className="block text-sm font-bold"><span className="mb-1.5 block">{t("Age")}</span>
          <select value={age} onChange={(e) => setAge(e.target.value)} className={field}><option value="">{t("All ages")}</option>{ages.map((a) => <option key={a.slug} value={a.slug}>{a.label}</option>)}</select>
        </label>
        <label className="block text-sm font-bold"><span className="mb-1.5 block">{t("Topic")}</span>
          <select value={ab} onChange={(e) => setAb(e.target.value)} className={field}><option value="">{t("All topics")}</option>{abilities.map((a) => <option key={a.key} value={a.key}>{a.label}</option>)}</select>
        </label>
      </form>
      <p className="mt-6 text-sm font-bold text-ink-soft" role="status" aria-live="polite">{t("{n} articles", { n: shown.length })}</p>
      <ul className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((a) => (
          <li key={a.slug}>
            <Link href={`/articles/${a.slug}/`} className="card card-hover flex h-full flex-col p-7">
              <span className={`chip chip-${a.tint} self-start`}>{a.abilityLabel}</span>
              <h2 className="mt-4 text-[1.4rem] leading-tight">{a.title}</h2>
              <p className="mt-3 flex-1 text-[0.97rem] text-ink-soft">{a.excerpt}</p>
              <span className="mt-5 flex items-center justify-between text-sm font-extrabold">{t("{n} min read", { n: a.readingMinutes })} <span aria-hidden>→</span></span>
            </Link>
          </li>
        ))}
      </ul>
      {!shown.length && (
        <div className="card mt-6 p-8 text-center"><p className="text-xl font-extrabold">{t("No articles match.")}</p><button onClick={() => { setQ(""); setAge(""); setAb(""); }} className="btn btn-outline mt-5">{t("Clear filters")}</button></div>
      )}
    </div>
  );
}
