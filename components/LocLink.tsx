"use client";
import Link from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "./I18nProvider";
import { localePath } from "@/lib/i18n";

const SKIP = /^\/(admin|api|_next|feed\.xml|sitemap\.xml|robots\.txt|photos|uploads)(\/|$)/;

/** Drop-in replacement for next/link that keeps the visitor in their language. */
export default function LocLink({ href, ...rest }: ComponentProps<typeof Link>) {
  const locale = useLocale();
  const h = typeof href === "string" && href.startsWith("/") && !href.startsWith("//") && !SKIP.test(href) ? localePath(locale, href) : href;
  return <Link href={h} {...rest} />;
}
