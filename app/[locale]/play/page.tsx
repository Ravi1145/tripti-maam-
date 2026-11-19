import type { Metadata } from "next";
import PageHero, { ReviewBanner } from "@/components/PageHero";
import TodaysPlay from "@/components/TodaysPlay";
import { getAges } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { getT } from "@/lib/messages";
import { pageMeta } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as Locale;
  const t = getT(locale);
  return pageMeta(locale, "/play/", { title: t("Today's Play"), description: t("One idea to try with your child today, with something to look for afterwards.") });
}

export default function Play({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getT(locale);
  const { items, reviewed } = getAges(locale);
  const ideas = items.map((a) => ({ slug: a.slug, label: a.label, tryTitle: a.tryTitle, tryText: a.tryText, lookText: a.lookText, stage: a.stage }));
  return (
    <>
      <PageHero eyebrow={t("Today's Play")} title={t("One idea to try with your child")} highlight={t("today.")} sub={t("Small, everyday and free. No special toys needed. Do it, then look for what changes.")} tint="sun" />
      <ReviewBanner reviewed={reviewed} />
      <section className="mx-auto max-w-4xl px-6 pb-8"><TodaysPlay ideas={ideas} /></section>
    </>
  );
}
