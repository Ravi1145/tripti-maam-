import en from "@/data/profile.en.json";
import hi from "@/data/profile.hi.json";
import mr from "@/data/profile.mr.json";
import type { Locale } from "@/lib/i18n";

export type Profile = typeof en;

/** English site text. Use this for things that never change by language (site URL, social links). */
export const P: Profile = en;

type Json = Record<string, unknown>;
const isObj = (v: unknown): v is Json => !!v && typeof v === "object" && !Array.isArray(v);

/** Overlay a translation on English: objects merge key by key, arrays and text are replaced when present. */
function merge(base: unknown, over: unknown): unknown {
  if (over === undefined || over === null || over === "") return base;
  if (isObj(base) && isObj(over)) {
    const out: Json = { ...base };
    for (const k of Object.keys(base)) out[k] = merge(base[k], over[k]);
    return out;
  }
  return over;
}

const OVERLAYS: Record<Locale, Json> = { en: {}, hi: hi as Json, mr: mr as Json };

/** Site text in the visitor's language (falls back to English field by field). */
export const getProfile = (locale: Locale): Profile => merge(en, OVERLAYS[locale]) as Profile;

export const isTodo = (s?: string) => !!s && s.startsWith("TODO");
/** Shows a value only when it has been filled in (placeholders stay hidden from visitors). */
export const has = (s?: string) => !!s && !isTodo(s);

export type Tint = "violet" | "coral" | "sky" | "sun" | "mint" | "saffron";
