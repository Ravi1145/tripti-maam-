import type { Metadata } from "next";
import Link from "@/components/LocLink";
import CtaBand from "@/components/CtaBand";
import { IconTile } from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import type { Locale } from "@/lib/i18n";
import { getT } from "@/lib/messages";
import { pageMeta } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as Locale;
  const t = getT(locale);
  return pageMeta(locale, "/for-educators/", { title: t("For educators"), description: t("Ways of looking at children in the classroom, and resources you can share with families, from Foundation Years First.") });
}

const CARDS = [
  { title: "Look, listen, interpret, document", text: "Describe what a child did before deciding what it means. Our articles each start from one observed moment, a model you can use in staff meetings.", tint: "violet", icon: "eye", href: "/articles/", cta: "Read the articles" },
  { title: "Share with families", text: "Every age guide has one idea to try at home and one thing to look for next. Send the guide for your class's age group to families after a parent meeting.", tint: "coral", icon: "heart", href: "/ages/", cta: "Browse the age guides" },
  { title: "Reflect as a team", text: "The school self-check gives a team ten statements to discuss: relationships, play, language, thinking, and how you see and plan.", tint: "mint", icon: "compass", href: "/self-check/", cta: "Try the self-check" },
  { title: "Bring a workshop to your school", text: "Curriculum, observation and assessment, PlayXploration and family engagement, through Educational Mentoring India.", tint: "sun", icon: "users", href: "/work-with-schools/", cta: "Work with schools" },
];

export default function Educators({ params }: { params: { locale: string } }) {
  const t = getT(params.locale as Locale);
  return (
    <>
      <PageHero eyebrow={t("For educators")} title={t("Start with what the child")} highlight={t("actually did.")} sub={t("Classroom ways of looking, and resources you can share with families. Each one is small enough to try on Monday morning.")} tint="violet" />
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 0.08}>
              <div className={`flex h-full flex-col rounded-card p-8 md:p-10 tint-${c.tint}`}>
                <IconTile name={c.icon} tint={c.tint} size="h-14 w-14 bg-white" />
                <h2 className="mt-6 text-2xl md:text-3xl">{t(c.title)}</h2>
                <p className="mt-3 flex-1 text-lg">{t(c.text)}</p>
                <Link href={c.href} className="link-arrow mt-6 self-start">{t(c.cta)} <span aria-hidden>→</span></Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand title={t("Want this in your school?")} text={t("We can look at what children experience in your classrooms and agree one change to try.")} tint="violet" />
    </>
  );
}
