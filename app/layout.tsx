import type { Metadata, Viewport } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import Cursor from "@/components/Cursor";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import { P } from "@/lib";

const serif = Cormorant({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const sans = Montserrat({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(P.site.url),
  title: { default: P.site.title, template: "%s | Tripta Tarunesh" },
  description: P.site.description,
  openGraph: {
    title: P.site.title,
    description: P.site.description,
    url: P.site.url,
    siteName: "Tripta Tarunesh",
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: P.site.title, description: P.site.description },
};

export const viewport: Viewport = { themeColor: "#08282A", width: "device-width", initialScale: 1 };

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: P.person.name,
    jobTitle: P.person.headline,
    description: P.site.description,
    url: P.site.url,
    sameAs: [P.person.linkedin],
    address: { "@type": "PostalAddress", addressLocality: "Pune", addressRegion: "Maharashtra", addressCountry: "IN" },
    worksFor: [
      { "@type": "Organization", name: "Educational Mentoring India" },
      { "@type": "Organization", name: "PlayXploration" },
    ],
    knowsAbout: ["Early Childhood Education", "Play-based learning", "Teacher development", "School improvement", "NEP 2020"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PlayXploration",
    founder: { "@type": "Person", name: P.person.name },
    description: "Helping schools reimagine play-based learning as a pathway to school readiness.",
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-gold focus:px-4 focus:py-2">Skip to content</a>
        <Loader />
        <Cursor />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
