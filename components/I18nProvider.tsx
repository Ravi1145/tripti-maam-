"use client";
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";
import { makeT, type Dict, type T } from "@/lib/messages";

type Ctx = { locale: Locale; t: T };
const I18nContext = createContext<Ctx>({ locale: DEFAULT_LOCALE, t: makeT({}) });

/** Gives client components the current language and its translations. */
export default function I18nProvider({ locale, dict, children }: { locale: Locale; dict: Dict; children: ReactNode }) {
  const value = useMemo(() => ({ locale, t: makeT(dict) }), [locale, dict]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useT = () => useContext(I18nContext).t;
export const useLocale = () => useContext(I18nContext).locale;
