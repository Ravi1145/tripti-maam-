"use client";
import { useLocale, useT } from "./I18nProvider";

/** A small yellow ribbon on drafted pages. Disappears once the content (and its translation) is approved. */
export default function ReviewBanner({ reviewed, translated = true }: { reviewed: boolean; translated?: boolean }) {
  const t = useT();
  const locale = useLocale();
  if (reviewed && translated) return null;
  const text = !translated ? t("Not translated yet. Showing the English version.") : locale === "en" ? t("Draft, waiting for Tripta's review") : t("Draft translation, waiting for review");
  return (
    <div role="note" className="mx-auto mb-2 max-w-6xl px-6">
      <p className="inline-flex items-center gap-2 rounded-pill bg-sun-tint px-4 py-1.5 text-xs font-extrabold text-sun-deep"><span aria-hidden className="h-2 w-2 rounded-full bg-sun" /> {text}</p>
    </div>
  );
}
