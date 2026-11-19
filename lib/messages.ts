import hi from "@/messages/hi.json";
import mr from "@/messages/mr.json";
import type { Locale } from "./i18n";

/**
 * Interface text (menus, buttons, labels, notices).
 * The English sentence IS the key: t("Book a school conversation").
 * If a translation is missing, the English sentence shows, so the site never breaks.
 * Run `npm run i18n:report` to list what is still untranslated.
 */
export type Dict = Record<string, string>;
const DICTS: Record<Locale, Dict> = { en: {}, hi: hi as Dict, mr: mr as Dict };

export type T = (key: string, vars?: Record<string, string | number>) => string;

export const getDict = (locale: Locale): Dict => DICTS[locale] ?? {};

export function makeT(dict: Dict): T {
  return (key, vars) => {
    let s = dict[key] ?? key;
    if (vars) for (const k of Object.keys(vars)) s = s.split(`{${k}}`).join(String(vars[k]));
    return s;
  };
}
export const getT = (locale: Locale): T => makeT(getDict(locale));

/** Has a fluent reader approved this language's interface text? */
export const isUiReviewed = (locale: Locale): boolean => locale === "en" || getDict(locale).__reviewed === "true";
