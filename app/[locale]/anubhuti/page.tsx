import type { Metadata } from "next";
import Link from "@/components/LocLink";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getProfile, has } from "@/lib";
import type { Locale } from "@/lib/i18n";
import { getT } from "@/lib/messages";
import { pageMeta } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as Locale;
  return pageMeta(locale, "/anubhuti/", { title: getT(locale)("Anubhuti, a monthly letter"), description: getProfile(locale).newsletter.intro });
}

export default function Anubhuti({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getT(locale);
  const n = getProfile(locale).newsletter;
  return (
    <>
      <PageHero eyebrow={t("A monthly letter")} title="Anubhuti," highlight={t("one moment a month.")} sub={n.intro} image="/photos/kid-swing.webp" tint="saffron" />
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <article className="card p-8 md:p-12">
            <p className="eyebrow">{t("The first letter")}</p>
            <p className="mt-5 text-xl font-bold leading-relaxed md:text-2xl">{n.letter}</p>
            <p className="mt-8 text-lg font-extrabold">{t("Tripta")}</p>
            <Link href="/articles/lid-wont-fit/" className="link-arrow mt-6">{t("What is my toddler learning when a lid won't fit?")} <span aria-hidden>→</span></Link>
          </article>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="rounded-card tint-sun p-8 md:p-10"><h2 className="text-2xl md:text-3xl">{t("Get it in your inbox")}</h2><p className="mb-6 mt-2">{t("One email a month. Unsubscribe any time.")}</p><ContactForm variant="subscribe" />{has(n.link) && <a href={n.link} className="link-arrow mt-6">{t("Or read on the newsletter platform")} <span aria-hidden>→</span></a>}</div>
        </Reveal>
      </section>
    </>
  );
}
