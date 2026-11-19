/**
 * Language settings, in one place.
 * English lives at "/", Hindi at "/hi/", Marathi at "/mr/" (the same pattern kinedu.com uses for /es and /pt).
 */
export const LOCALES = ["en", "hi", "mr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_INFO: Record<Locale, { label: string; short: string; name: string; htmlLang: string; ogLocale: string }> = {
  en: { label: "EN", short: "EN", name: "English", htmlLang: "en-IN", ogLocale: "en_IN" },
  hi: { label: "हिं", short: "HI", name: "हिन्दी", htmlLang: "hi-IN", ogLocale: "hi_IN" },
  mr: { label: "मर", short: "MR", name: "मराठी", htmlLang: "mr-IN", ogLocale: "mr_IN" },
};

export const isLocale = (v: string | undefined | null): v is Locale => !!v && (LOCALES as readonly string[]).includes(v);

/** "/about/" in Hindi becomes "/hi/about/". English has no prefix. */
export function localePath(locale: Locale, path: string): string {
  if (!path.startsWith("/")) return path;
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}/` : `/${locale}${path}`;
}

/** Remove a leading language segment: "/hi/about/" becomes "/about/". */
export function stripLocale(pathname: string): string {
  const m = pathname.match(/^\/(en|hi|mr)(\/.*)?$/);
  return m ? m[2] || "/" : pathname;
}

/** Alternate-language links for Google (hreflang), including x-default. */
export function alternates(path: string, siteUrl = ""): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of LOCALES) out[LOCALE_INFO[l].htmlLang.split("-")[0]] = `${siteUrl}${localePath(l, path)}`;
  out["x-default"] = `${siteUrl}${localePath(DEFAULT_LOCALE, path)}`;
  return out;
}
