"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "./I18nProvider";
import { LOCALES, LOCALE_INFO, localePath, stripLocale } from "@/lib/i18n";

/**
 * EN | हिं | मर pill, modelled on Kinedu's switcher: a soft grey track with the active
 * language as a white pill. Real links (not buttons) so every language page is crawlable.
 */
export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const path = stripLocale(usePathname() || "/");
  return (
    <nav aria-label="Language" className={className}>
      <ul className="inline-flex items-center gap-0.5 rounded-pill border border-line bg-paper-2 p-1">
        {LOCALES.map((l) => {
          const on = l === locale;
          return (
            <li key={l}>
              <Link
                href={localePath(l, path)}
                hrefLang={LOCALE_INFO[l].htmlLang}
                lang={LOCALE_INFO[l].htmlLang}
                aria-current={on ? "true" : undefined}
                aria-label={LOCALE_INFO[l].name}
                title={LOCALE_INFO[l].name}
                className={`flex min-h-[40px] min-w-[44px] items-center justify-center rounded-pill px-3 text-sm font-extrabold transition ${on ? "bg-white text-saffron-deep shadow-soft" : "text-ink-soft hover:text-ink"}`}
              >
                {LOCALE_INFO[l].label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
