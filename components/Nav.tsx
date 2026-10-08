"use client";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Item = { href: string; label: string };
type Entry = Item | { label: string; children: Item[] };

const entries: Entry[] = [
  { href: "/about/", label: "About" },
  { href: "/services/", label: "Services" },
  { label: "Initiatives", children: [{ href: "/playxploration/", label: "PlayXploration" }, { href: "/foundation-years-first/", label: "Foundation Years First" }] },
  { href: "/blog/", label: "Blog" },
  { href: "/gallery/", label: "Gallery" },
  { label: "More", children: [{ href: "/writing/", label: "Newsletter" }, { href: "/speaking/", label: "Speaking & Recognition" }, { href: "/faq/", label: "FAQ" }] },
];

function Dropdown({ label, children }: { label: string; children: Item[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    const out = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", out);
    return () => document.removeEventListener("mousedown", out);
  }, []);
  return (
    <li ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
      <button aria-expanded={open} aria-haspopup="true" onClick={() => setOpen(!open)} className="flex min-h-[44px] items-center gap-1 text-sm tracking-wide text-ivory/85 transition hover:text-gold-light">
        {label}<span aria-hidden className={`text-[10px] transition ${open ? "rotate-180" : ""}`}>▼</span>
      </button>
      {open && (
        <motion.ul initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="absolute left-0 top-full min-w-[230px] rounded-2xl border border-gold/30 bg-teal-950/95 p-2 shadow-2xl backdrop-blur-md">
          {children.map((c) => (
            <li key={c.href}><Link href={c.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm text-ivory/90 transition hover:bg-white/5 hover:text-gold-light">{c.label}</Link></li>
          ))}
        </motion.ul>
      )}
    </li>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const flat: Item[] = entries.flatMap((e) => ("children" in e ? e.children : [e]));
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-teal-950/85 py-3 shadow-xl backdrop-blur-md" : "py-6"}`}>
      <motion.div style={{ scaleX: w }} className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-gold-dark via-gold-light to-gold" />
      <nav aria-label="Main" className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-3 text-ivory">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/60 font-serif text-lg text-gold-light transition group-hover:bg-gold group-hover:text-teal-950">T</span>
          <span className="font-serif text-xl tracking-wide">Tripta Tarunesh</span>
        </Link>
        <ul className="hidden items-center gap-7 lg:flex">
          {entries.map((e) =>
            "children" in e ? (
              <Dropdown key={e.label} label={e.label} children={e.children} />
            ) : (
              <li key={e.href}>
                <Link href={e.href} className="group relative flex min-h-[44px] items-center text-sm tracking-wide text-ivory/85 transition hover:text-gold-light">
                  {e.label}
                  <span className="absolute bottom-2 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            )
          )}
          <li><Link href="/contact/" className="btn-gold !px-5 !py-2.5">Contact</Link></li>
        </ul>
        <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden">
          <span className={`h-px w-6 bg-ivory transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-ivory transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-ivory transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </nav>
      {open && (
        <motion.ul initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mx-4 mt-3 max-h-[75vh] space-y-1 overflow-y-auto rounded-2xl bg-teal-950/95 p-5 lg:hidden">
          {[...flat, { href: "/contact/", label: "Contact" }].map((l) => (
            <li key={l.href}><Link onClick={() => setOpen(false)} href={l.href} className="block rounded-lg px-3 py-3 text-ivory/90 hover:bg-white/5 hover:text-gold-light">{l.label}</Link></li>
          ))}
        </motion.ul>
      )}
    </header>
  );
}
