import Link from "@/components/LocLink";
import { getProfile, P } from "@/lib";
import type { Locale } from "@/lib/i18n";
import { getT } from "@/lib/messages";

const cols: { title: string; links: [string, string][] }[] = [
  { title: "Families and educators", links: [["For parents", "/for-parents/"], ["For educators", "/for-educators/"], ["Explore by age", "/ages/"], ["Articles", "/articles/"], ["Today's Play", "/play/"], ["Anubhuti letter", "/anubhuti/"]] },
  { title: "Work with me", links: [["Work with schools", "/work-with-schools/"], ["PlayXploration", "/playxploration/"], ["Speaking", "/speaking/"], ["School self-check", "/self-check/"], ["Contact", "/contact/"]] },
  { title: "About", links: [["About Tripta", "/about/"], ["Foundation Years First", "/foundation-years-first/"], ["Gallery", "/gallery/"], ["FAQ", "/faq/"], ["How we write", "/how-we-write/"]] },
];

export default function Footer({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const p = getProfile(locale);
  return (
    <footer className="mt-24 bg-night text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="text-3xl font-extrabold leading-tight">{t("The years that shape")} <span className="text-saffron">{t("everything that follows.")}</span></p>
          <p className="mt-5 text-sm text-white/75">{p.person.role}</p>
          <Link href="/contact/" className="btn btn-primary mt-8">{t("Book a school conversation")}</Link>
        </div>
        <nav aria-label={t("Footer")} className="grid gap-8 sm:grid-cols-3 md:col-span-8">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-sun">{t(c.title)}</p>
              <ul className="mt-3">
                {c.links.map(([l, h]) => <li key={h}><Link href={h} className="inline-flex min-h-[40px] items-center text-sm text-white/85 transition hover:text-saffron">{t(l)}</Link></li>)}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-xs text-white/65">
          <span>© {new Date().getFullYear()} Tripta Tarunesh. {t("Foundation Years First is an initiative of Educational Mentoring India.")}</span>
          <span>{t("Child and baby photos are free stock images from Unsplash photographers.")}</span>
          <a href={P.person.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[40px] items-center hover:text-saffron">LinkedIn ↗</a>
        </div>
      </div>
    </footer>
  );
}
