"use client";
import Link from "@/components/LocLink";
import { useT } from "./I18nProvider";
import Reveal from "./Reveal";

/** Closing call to action. The primary button always leads to a school conversation. */
export default function CtaBand({ title, text, tint = "saffron" }: { title?: string; text?: string; tint?: string }) {
  const t = useT();
  return (
    <section className="mx-auto max-w-6xl px-6 pt-8">
      <Reveal>
        <div className={`relative overflow-hidden rounded-[2.2rem] p-8 text-center md:p-16 tint-${tint}`}>
          <div aria-hidden className="orb orb-1 -left-10 -top-10 h-56 w-56 bg-white/60" />
          <div aria-hidden className="orb orb-2 -bottom-16 -right-10 h-64 w-64 bg-white/50" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl md:text-5xl">{title ?? t("Let's talk about your school.")}</h2>
            <p className="mt-5 text-lg">{text ?? t("Tell me what your team is facing and what you would like children to experience. We can take it from there.")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4"><Link href="/contact/" className="btn btn-primary">{t("Book a school conversation")}</Link><Link href="/self-check/" className="btn btn-outline">{t("Take the self-check")}</Link></div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
