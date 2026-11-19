"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useT } from "./I18nProvider";
import { srcSet } from "@/lib/img";

export type Photo = { image: string; caption?: string; event?: string };

/** Photo grid with an accessible lightbox (Esc closes, arrow keys move between photos). */
export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  const t = useT();
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const close = useCallback(() => { setOpen(null); lastFocus.current?.focus(); }, []);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (open === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, close, step]);

  if (!photos.length) return null;
  const cur = open !== null ? photos[open] : null;
  const btn = "flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl font-extrabold text-ink shadow-lift transition hover:bg-saffron";

  return (
    <>
      <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>li]:mb-5">
        {photos.map((p, i) => (
          <li key={p.image + i} className="break-inside-avoid">
            <button onClick={(e) => { lastFocus.current = e.currentTarget; setOpen(i); }} aria-label={p.caption ? `${t("Open photo")}: ${p.caption}` : `${t("Open photo")} ${i + 1}`} className="card card-hover group relative block w-full overflow-hidden !rounded-card text-left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} srcSet={srcSet(p.image)} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" alt={p.caption || p.event || t("Event photo")} loading="lazy" decoding="async" className="w-full transition duration-700 group-hover:scale-105" />
              {p.caption && <span className="block bg-white px-5 py-3 text-sm font-bold text-ink-soft">{p.caption}</span>}
            </button>
          </li>
        ))}
      </ul>
      {cur && open !== null && (
        <div role="dialog" aria-modal="true" aria-label={t("Photo viewer")} className="fixed inset-0 z-[120] flex items-center justify-center bg-night/90 p-4 backdrop-blur" onClick={close}>
          <button ref={closeRef} onClick={close} aria-label={t("Close")} className={`${btn} absolute right-4 top-4`}>×</button>
          {photos.length > 1 && (<>
            <button onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label={t("Previous photo")} className={`${btn} absolute left-3 md:left-8`}>←</button>
            <button onClick={(e) => { e.stopPropagation(); step(1); }} aria-label={t("Next photo")} className={`${btn} absolute right-3 md:right-8`}>→</button>
          </>)}
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cur.image} alt={cur.caption || cur.event || t("Event photo")} className="max-h-[80vh] rounded-card object-contain" />
            {(cur.caption || cur.event) && <figcaption className="mt-4 text-center text-sm font-bold text-white">{cur.caption || cur.event}</figcaption>}
          </figure>
        </div>
      )}
    </>
  );
}
