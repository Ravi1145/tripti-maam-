"use client";
import { motion } from "framer-motion";
import { isTodo, P } from "@/lib";
import images from "@/data/images.json";

/** Arch-shaped portrait. Uses person.photo, or the "about" site photo, once uploaded in the admin. */
export default function Portrait({ className = "" }: { className?: string }) {
  const photo = !isTodo(P.person.photo) && P.person.photo ? P.person.photo : (images as Record<string, string>).about;
  return (
    <div className={`relative mx-auto w-full max-w-sm ${className}`}>
      <div aria-hidden className="arch absolute -inset-3 border border-gold/60" />
      <div className="arch relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-teal-700 via-teal-900 to-teal-950 shadow-[0_40px_80px_-40px_rgba(10,31,27,0.8)]">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={`Portrait of ${P.person.name}`} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center text-ivory">
            <p className="font-serif text-8xl font-light italic text-gold-light">TT</p>
            <div className="my-6 h-px w-16 bg-gold" />
            <p className="font-serif text-2xl">Tripta Tarunesh</p>
            <p className="mt-3 text-[0.68rem] uppercase tracking-[0.3em] text-ivory/60">Portrait: TODO: confirm with Tripta</p>
          </div>
        )}
      </div>
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-8 text-center text-[0.68rem] uppercase tracking-[0.3em] text-gold-dark">Nearly two decades in ECCE</motion.p>
    </div>
  );
}
