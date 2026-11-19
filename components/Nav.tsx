"use client";
import Link from "@/components/LocLink";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale, useT } from "./I18nProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import { stripLocale } from "@/lib/i18n";

const links = [
  { href: "/for-parents/", label: "For parents" },
  { href: "/for-educators/", label: "For educators" },
  { href: "/articles/", label: "Articles" },
  { href: "/unseen-curriculum/", label: "Unseen Curriculum" },
  { href: "/gallery/", label: "Gallery" },
  { href: "/about/", label: "About" },
];
const more = [
  { href: "/foundation-years-first/", label: "Foundation Years First" },
  { href: "/faq/", label: "FAQ" },
];

export default function Nav() {
  const t = useT();
  useLocale();
  const path = stripLocale(usePathname() || "/");
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  const on = (h: string) => path.startsWith(h);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <nav aria-label={t("Main")} className="mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-pill border border-line bg-white/90 py-2 pl-3 pr-2 shadow-soft backdrop-blur md:pl-4">
        <Link href="/" className="flex items-center gap-3">
          <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full bg-saffron text-lg font-extrabold text-ink">T</span>
          <span className="hidden text-base font-extrabold tracking-tight sm:block md:text-lg">Tripta Tarunesh</span>
        </Link>
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={on(l.href) ? "page" : undefined} className={`flex min-h-[44px] items-center rounded-pill px-4 text-sm font-bold transition hover:bg-paper-2 ${on(l.href) ? "bg-paper-2 text-ink" : "text-ink-soft"}`}>{t(l.label)}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link href="/work-with-schools/" className="btn btn-primary hidden !min-h-[44px] !px-5 !py-2 text-sm md:inline-flex">{t("Work with schools")}</Link>
          <button aria-label={open ? t("Close menu") : t("Open menu")} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)} className="flex h-11 w-11 items-center justify-center rounded-full bg-paper-2 text-xl font-extrabold lg:hidden">{open ? "×" : "≡"}</button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="mx-auto mt-2 max-w-6xl rounded-card border border-line bg-white p-3 shadow-lift lg:hidden">
          <ul>
            {[...links, ...more].map((l) => (
              <li key={l.href}><Link href={l.href} className="flex min-h-[52px] items-center rounded-2xl px-4 text-base font-bold hover:bg-paper-2">{t(l.label)}</Link></li>
            ))}
          </ul>
          <Link href="/work-with-schools/" className="btn btn-primary mt-2 w-full">{t("Work with schools")}</Link>
        </div>
      )}
    </header>
  );
}
