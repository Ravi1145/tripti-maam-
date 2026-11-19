import type { Metadata } from "next";
import Link from "@/components/LocLink";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { getFaqs } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { getT } from "@/lib/messages";
import { pageMeta } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as Locale;
  const t = getT(locale);
  return pageMeta(locale, "/faq/", { title: t("Questions"), description: t("Answers to common questions about working with me, PlayXploration and Foundation Years First.") });
}

export default function Faq({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getT(locale);
  const items = getFaqs(locale);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", inLanguage: locale, mainEntity: items.map((i) => ({ "@type": "Question", name: i.question, acceptedAnswer: { "@type": "Answer", text: i.answer } })) }} />
      <PageHero eyebrow={t("FAQ")} title={t("Questions you")} highlight={t("probably have.")} sub={t("Everything school leaders and families ask before we begin.")} tint="sky" />
      <section className="mx-auto max-w-3xl px-6 pb-8">
        <FaqList items={items} />
        <p className="mt-10 text-center text-ink-soft">{t("Still wondering?")} <Link href="/contact/" className="font-extrabold text-ink underline decoration-saffron decoration-[3px] underline-offset-4">{t("Send me a note")}</Link>.</p>
      </section>
    </>
  );
}
