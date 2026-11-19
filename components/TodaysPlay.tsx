"use client";
import Link from "@/components/LocLink";
import { useEffect, useState } from "react";
import { useT } from "./I18nProvider";

export type PlayIdea = { slug: string; label: string; tryTitle: string; tryText: string; lookText: string; stage: string };

/** One idea per day, chosen by the date, so a family sees something new each morning. */
export default function TodaysPlay({ ideas }: { ideas: PlayIdea[] }) {
  const t = useT();
  const [i, setI] = useState(0);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setI(Math.floor(Date.now() / 86400000) % ideas.length);
    setReady(true);
  }, [ideas.length]);
  const idea = ideas[i];
  if (!idea) return null;
  return (
    <div className="card overflow-hidden">
      <div className={`tint-${idea.stage} p-8 md:p-12`}>
        <span className={`chip chip-${idea.stage}`}>{ready ? t("Today") : t("An idea to try")} · {idea.label}</span>
        <h2 className="mt-5 text-3xl md:text-5xl">{idea.tryTitle}</h2>
        <p className="mt-5 max-w-2xl text-lg md:text-xl">{idea.tryText}</p>
        <div className="mt-8 rounded-card bg-white/70 p-6">
          <p className="text-sm font-extrabold uppercase tracking-[0.12em]">{t("What to look for")}</p>
          <p className="mt-2">{idea.lookText}</p>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button onClick={() => setI((i + 1) % ideas.length)} className="btn btn-outline">{t("Show me another")}</button>
          <Link href={`/ages/${idea.slug}/`} className="link-arrow">{t("The full age guide")} <span aria-hidden>→</span></Link>
        </div>
      </div>
    </div>
  );
}
