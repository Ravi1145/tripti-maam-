"use client";
import { motion } from "framer-motion";
import { isTodo, P } from "@/lib";

/** Arch-shaped portrait. Shows her photo once person.photo in data/profile.json points to a file in /public. */
export default function Portrait({ className = "" }: { className?: string }) {
  const photo = P.person.photo;
  const has = !isTodo(photo);
  return (
    <div className={`relative mx-auto w-full max-w-sm ${className}`}>
      <motion.div aria-hidden className="absolute -inset-4 rounded-t-[999px] rounded-b-[2rem] border border-gold/50" animate={{ rotate: [0, 1.5, 0, -1.5, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-gradient-to-b from-teal-700 via-teal-900 to-teal-950 shadow-2xl shadow-teal-950/30">
        {has ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={`Portrait of ${P.person.name}`} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center text-ivory">
            <svg viewBox="0 0 200 200" className="h-40 w-40" aria-hidden>
              <circle cx="100" cy="78" r="38" fill="#E6CF91" opacity=".9" />
              <path d="M30 190 C30 130 70 112 100 112 C130 112 170 130 170 190 Z" fill="#C9A24B" />
              <circle cx="100" cy="100" r="96" fill="none" stroke="#C9A24B" strokeOpacity=".4" strokeDasharray="2 8" />
            </svg>
            <p className="mt-4 font-serif text-3xl text-gold-light">Tripta Tarunesh</p>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-ivory/70">Photo: TODO: confirm with Tripta</p>
          </div>
        )}
      </div>
      <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, type: "spring" }} className="absolute -bottom-6 -right-4 flex h-28 w-28 items-center justify-center rounded-full bg-gold text-center text-[11px] font-semibold uppercase leading-tight tracking-wider text-teal-950 shadow-xl">
        Nearly<br />20 years<br />in ECCE
      </motion.div>
    </div>
  );
}
