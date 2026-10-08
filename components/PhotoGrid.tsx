"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

export type Photo = { image: string; caption?: string; event?: string };

/** Masonry-style photo grid with an accessible lightbox (Esc closes, arrow keys navigate). */
export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (open === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  if (!photos.length) return null;
  const cur = open !== null ? photos[open] : null;

  return (
    <>
      <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>li]:mb-5">
        {photos.map((p, i) => (
          <motion.li key={p.image + i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.7, delay: (i % 3) * 0.08 }} className="break-inside-avoid">
            <button
              onClick={(e) => { lastFocus.current = e.currentTarget; setOpen(i); }}
              aria-label={`Open photo${p.caption ? `: ${p.caption}` : ` ${i + 1}`}`}
              className="group relative block w-full overflow-hidden rounded-3xl border border-gold/30 bg-teal-950 text-left"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.caption || p.event || "Event photo"} loading="lazy" className="w-full transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              {(p.caption || p.event) && (
                <span className="absolute inset-x-0 bottom-0 translate-y-3 p-5 text-sm text-ivory opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  {p.caption || p.event}
                </span>
              )}
            </button>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {cur && open !== null && (
          <motion.div role="dialog" aria-modal="true" aria-label="Photo viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] flex items-center justify-center bg-teal-950/95 p-4 backdrop-blur" onClick={close}>
            <button ref={closeRef} onClick={close} aria-label="Close" className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-2xl text-ivory transition hover:bg-gold hover:text-teal-950">×</button>
            {photos.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo" className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-xl text-ivory transition hover:bg-gold hover:text-teal-950 md:left-8">←</button>
                <button onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo" className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-xl text-ivory transition hover:bg-gold hover:text-teal-950 md:right-8">→</button>
              </>
            )}
            <motion.figure key={open} initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cur.image} alt={cur.caption || cur.event || "Event photo"} className="max-h-[80vh] rounded-2xl object-contain" />
              {(cur.caption || cur.event) && <figcaption className="mt-4 text-center text-sm text-ivory/80">{cur.caption || cur.event}</figcaption>}
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
