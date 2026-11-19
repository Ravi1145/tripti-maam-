import type { Metadata } from "next";
import { LOCALE_INFO, alternates, localePath, type Locale } from "./i18n";

/**
 * Page metadata with the right canonical address and hreflang alternates for the language.
 *   pageMeta("hi", "/about/", { title, description })
 */
export function pageMeta(locale: Locale, path: string, m: { title: string; description: string; extra?: Metadata }): Metadata {
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: localePath(locale, path), languages: alternates(path) },
    openGraph: { title: m.title, description: m.description, url: localePath(locale, path), locale: LOCALE_INFO[locale].ogLocale, type: "website" },
    ...m.extra,
  };
}
