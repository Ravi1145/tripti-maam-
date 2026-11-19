import type { Metadata } from "next";
import PageHero, { ReviewBanner } from "@/components/PageHero";
import SelfCheck from "@/components/SelfCheck";
import { getSelfCheck } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { getT } from "@/lib/messages";
import { pageMeta } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as Locale;
  const t = getT(locale);
  return pageMeta(locale, "/self-check/", { title: t("School self-check"), description: t("A five-minute reflection for school leaders across relationships, play, language, thinking, and how you see and plan.") });
}

export default function SelfCheckPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getT(locale);
  const d = getSelfCheck(locale);
  return (
    <>
      <PageHero eyebrow={t("Free · 5 minutes")} title={t("Is your Foundation Years programme")} highlight={t("on track?")} sub={d.intro} tint="violet" />
      <ReviewBanner reviewed={d.reviewed} />
      <section className="mx-auto max-w-4xl px-6 pb-8"><SelfCheck data={d} /></section>
    </>
  );
}
