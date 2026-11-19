"use client";
import Link from "@/components/LocLink";
import { useT } from "@/components/I18nProvider";
import { Orbs } from "@/components/PageHero";

export default function NotFound() {
  const t = useT();
  return (
    <section className="relative overflow-hidden py-28 text-center">
      <Orbs />
      <div className="relative mx-auto max-w-2xl px-6">
        <p className="eyebrow">{t("Page not found")}</p>
        <h1 className="mt-4 text-5xl md:text-6xl">{t("This page")} <span className="hl">{t("wandered off.")}</span></h1>
        <p className="mt-6 text-lg text-ink-soft">{t("The page you are looking for may have moved. Here are good places to start.")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4"><Link href="/" className="btn btn-primary">{t("Go home")}</Link><Link href="/ages/" className="btn btn-outline">{t("Explore by age")}</Link><Link href="/articles/" className="btn btn-outline">{t("Read articles")}</Link></div>
      </div>
    </section>
  );
}
