import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Noto_Sans_Devanagari, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import Footer from "@/components/Footer";
import I18nProvider from "@/components/I18nProvider";
import Nav from "@/components/Nav";
import { getProfile, P } from "@/lib";
import { LOCALES, LOCALE_INFO, alternates, isLocale, localePath, type Locale } from "@/lib/i18n";
import { getDict, getT, isUiReviewed } from "@/lib/messages";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-sans", display: "swap" });
// Hindi and Marathi only: the browser downloads it only when a page actually contains Devanagari text.
const deva = Noto_Sans_Devanagari({ subsets: ["devanagari"], weight: ["400", "500", "600", "700", "800"], variable: "--font-deva", display: "swap", preload: false });

export const dynamicParams = false;
export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }));

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale;
  const p = getProfile(locale);
  return {
    metadataBase: new URL(P.site.url),
    title: { default: p.site.title, template: "%s | Tripta Tarunesh" },
    description: p.site.description,
    alternates: { canonical: localePath(locale, "/"), languages: alternates("/") },
    openGraph: { title: p.site.title, description: p.site.description, url: localePath(locale, "/"), siteName: "Tripta Tarunesh", type: "website", locale: LOCALE_INFO[locale].ogLocale },
    twitter: { card: "summary_large_image", title: p.site.title, description: p.site.description },
  };
}

export const viewport: Viewport = { themeColor: "#FBFAF8", width: "device-width", initialScale: 1 };

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const p = getProfile(locale);
  const t = getT(locale);

  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "Person", name: p.person.name, jobTitle: p.person.role, description: p.site.description, url: P.site.url, inLanguage: LOCALE_INFO[locale].htmlLang,
      sameAs: [P.person.linkedin], address: { "@type": "PostalAddress", addressLocality: "Pune", addressRegion: "Maharashtra", addressCountry: "IN" },
      worksFor: { "@type": "Organization", name: "Educational Mentoring India" },
      knowsAbout: ["Early Childhood Education", "Play-based learning", "Teacher development", "School improvement", "NEP 2020"],
    },
    { "@context": "https://schema.org", "@type": "Organization", name: "PlayXploration", founder: { "@type": "Person", name: p.person.name }, description: "Helping schools reimagine play-based learning as a pathway to school readiness." },
  ];

  return (
    <html lang={LOCALE_INFO[locale].htmlLang} className={`${sans.variable} ${deva.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <I18nProvider locale={locale} dict={getDict(locale)}>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:font-bold focus:shadow-lift">{t("Skip to content")}</a>
          <Nav />
          {!isUiReviewed(locale) && (
            <div role="note" className="mx-auto mt-3 max-w-6xl px-6">
              <p className="rounded-pill bg-sun-tint px-4 py-2 text-center text-xs font-bold text-sun-deep">{t("This translation is a draft and is waiting for review by a fluent reader. The English version is the master.")}</p>
            </div>
          )}
          <main id="main">{children}</main>
          <Footer locale={locale} />
        </I18nProvider>
      </body>
    </html>
  );
}
