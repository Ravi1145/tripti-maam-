"use client";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
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
      <button aria-expanded={open} aria-haspopup="true" onClick={() => setOpen(!open)} className="flex min-h-[44px] items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-ivory/85 transition hover:text-gold-light">
        {label}<span aria-hidden className={`text-[8px] transition ${open ? "rotate-180" : ""}`}>▼</span>
      </button>
      {open && (
        <motion.ul initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="absolute left-0 top-full min-w-[250px] border border-gold/30 bg-teal-950/97 p-2 shadow-2xl backdrop-blur-md">
          {children.map((c) => (
            <li key={c.href}><Link href={c.href} onClick={() => setOpen(false)} className="block px-4 py-3 text-sm text-ivory/90 transition hover:bg-white/5 hover:text-gold-light">{c.label}</Link></li>
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
  const flat: Item[] = entries.flatMap((e) => ("children" in e ? e.children : [e]));
  const all = [...flat, { href: "/contact/", label: "Contact" }];

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? "bg-teal-950/90 py-3 backdrop-blur-md" : "py-6"}`}>
        <motion.div aria-hidden style={{ scaleX: w }} className="absolute inset-x-0 bottom-0 h-px origin-left bg-gold" />
        <nav aria-label="Main" className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Link href="/" className="group flex items-center gap-4 text-ivory">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold font-serif text-lg italic text-gold-light transition duration-500 group-hover:bg-gold group-hover:text-teal-950">TT</span>
            <span className="hidden font-serif text-2xl font-medium tracking-wide sm:block">Tripta Tarunesh</span>
          </Link>
          <ul className="hidden items-center gap-8 lg:flex">
            {entries.map((e) =>
              "children" in e ? <Dropdown key={e.label} label={e.label} children={e.children} /> : (
                <li key={e.href}>
                  <Link href={e.href} className="group relative flex min-h-[44px] items-center text-[0.72rem] font-medium uppercase tracking-[0.2em] text-ivory/85 transition hover:text-gold-light">
                    {e.label}<span className="absolute bottom-2 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              )
            )}
            <li><Link href="/contact/" className="btn-gold !px-6 !py-3">Contact</Link></li>
          </ul>
          <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="flex h-11 w-11 flex-col items-center justify-center gap-[7px] lg:hidden">
            <span className={`h-px w-7 bg-ivory transition ${open ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`h-px w-7 bg-ivory transition ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="on-dark fixed inset-0 z-40 overflow-y-auto bg-teal-950 px-8 pb-12 pt-28 lg:hidden">
            <ul>
              {all.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} className="border-b border-gold/20">
                  <Link href={l.href} onClick={() => setOpen(false)} className="flex min-h-[56px] items-baseline gap-5 py-4 text-ivory transition hover:text-gold-light">
                    <span className="font-sans text-xs tracking-widest text-gold">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-4xl font-light">{l.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
