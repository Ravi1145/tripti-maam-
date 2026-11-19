import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getProfile, has } from "@/lib";
import type { Locale } from "@/lib/i18n";
import { getT } from "@/lib/messages";
import { pageMeta } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as Locale;
  return pageMeta(locale, "/contact/", { title: getT(locale)("Contact"), description: getProfile(locale).contact.intro });
}

export default function Contact({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const t = getT(locale);
  const P = getProfile(locale);
  return (
    <>
      <PageHero eyebrow={t("Contact")} title={t("Let's talk about")} highlight={t("your school.")} sub={P.contact.intro} tint="saffron" />
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-7"><div className="card p-6 md:p-10"><ContactForm /></div></Reveal>
        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="space-y-5">
            <div className="rounded-card tint-sun p-8">
              <p className="eyebrow !text-ink">{t("What happens next")}</p>
              <ol className="mt-5 space-y-4">{P.contact.next.map((n, i) => <li key={n.title} className="flex gap-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white font-extrabold">{i + 1}</span><div><p className="font-extrabold">{n.title}</p><p className="text-sm">{n.text}</p></div></li>)}</ol>
            </div>
            <div className="card space-y-4 p-8 text-[0.98rem]">
              {has(P.person.email) && <p><span className="eyebrow block">{t("Email")}</span><a className="font-bold underline decoration-saffron decoration-2 underline-offset-4" href={`mailto:${P.person.email}`}>{P.person.email}</a></p>}
              {has(P.person.phone) && <p><span className="eyebrow block">{t("Phone")}</span><a className="font-bold" href={`tel:${P.person.phone.replace(/\s/g, "")}`}>{P.person.phone}</a></p>}
              <p><span className="eyebrow block">{t("Based in")}</span>{P.person.location}</p>
              <p><span className="eyebrow block">LinkedIn</span><a className="font-bold underline decoration-saffron decoration-2 underline-offset-4" href={P.person.linkedin} target="_blank" rel="noopener noreferrer">triptatarunesh ↗</a></p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
