# Tripta Tarunesh website: project guide

*Describes the project as it is today (version 1, content kept in files). Section 10 says what changes when the multilingual database-backed admin is added. See `docs/admin-and-languages-plan.md`.*

---

## 1. What this project is
A personal-brand website for Tripta Tarunesh, an Early Childhood Education expert. It has two jobs:
1. **Convert school leaders** into enquiries (main button: "Book a school conversation").
2. **Serve parents and educators** with a free resource hub called *Foundation Years First* (age guides, articles, Today's Play, a monthly letter).

Look: light "Warm & Bright" theme (warm paper background, saffron action colour, soft colour-coded tints, one rounded sans font), inspired by the *pattern* of kinedu.com, with its own colours and copy.

## 2. Technology and languages used

| Layer | Technology | Why |
|---|---|---|
| Programming language | **TypeScript** (`.ts`, `.tsx`) | Typed JavaScript; catches mistakes at build time |
| UI library | **React 18** | Components |
| Framework | **Next.js 14** (App Router) | Routing, server rendering, SEO, API routes |
| Styling | **Tailwind CSS 3** + one global stylesheet (`app/globals.css`) | Fast, consistent design tokens |
| Animation | **Framer-motion 11** (scroll reveals) and plain CSS animations | Small, respects "reduced motion" |
| Font | **Plus Jakarta Sans** via `next/font` | One family, loaded fast |
| Content format | **Markdown** (articles, events) and **JSON** (age guides, FAQ, self-check, site text) | Human-editable, versioned in git |
| Markdown tools | `gray-matter` (read front-matter), `marked` (Markdown to HTML), `sanitize-html` (safety) | |
| CMS (admin) | **Decap CMS 3** at `/admin/` | Edits content files through GitHub |
| Hosting (planned) | **Vercel** | Zero-config Next.js hosting |
| Source control | **Git + GitHub** (`Ravi1145/tripti-maam-`) | |
| Runtime | Node.js 24 (works on 18+) | |

Versions in use: Next 14.2, React 18.3, Tailwind 3.4, TypeScript 5.9, Framer-motion 11.18.

## 3. Folder map (what is where)

```
triptimaam/
├─ app/                      PAGES and routes (Next.js App Router: a folder = a URL)
│  ├─ layout.tsx             Site shell: font, <html>, navigation, footer, site-wide structured data
│  ├─ template.tsx           Page-entrance fade (CSS only)
│  ├─ globals.css            ALL design: colours, buttons, cards, highlighter, animations, article text styles
│  ├─ page.tsx               HOME
│  ├─ about/                 About Tripta
│  ├─ work-with-schools/     Services + process + enquiry form + FAQ preview
│  ├─ playxploration/        Her flagship initiative
│  ├─ foundation-years-first/ The resource hub landing page
│  ├─ for-parents/  for-educators/   Audience pages
│  ├─ ages/                  "Explore by age" index
│  │  └─ [slug]/             One page per age guide (8 pages, generated from content/ages.json)
│  ├─ articles/              Article library with filters and search
│  │  └─ [slug]/             One page per article (generated from content/articles/*.md)
│  ├─ play/                  Today's Play (one idea per day)
│  ├─ anubhuti/              Monthly letter + sign-up
│  ├─ how-we-write/          Editorial approach
│  ├─ self-check/            10-question school reflection tool
│  ├─ speaking/              Topics, events, certifications
│  ├─ gallery/               Events and photo grid with lightbox
│  │  └─ [slug]/             One page per event (from content/events/*.md)
│  ├─ faq/                   Searchable FAQ (+ Google FAQ markup)
│  ├─ contact/               Enquiry form and "what happens next"
│  ├─ not-found.tsx          Branded 404
│  ├─ sitemap.ts  robots.ts  feed.xml/route.ts     SEO files, generated automatically
│  └─ api/auth, api/callback  GitHub login for the admin (OAuth)
│
├─ components/               REUSABLE UI PIECES
│  ├─ Nav.tsx  Footer.tsx    Floating pill menu; dark footer
│  ├─ PageHero.tsx           Page header (+ ReviewBanner "Draft" ribbon, background orbs)
│  ├─ CtaBand.tsx            Closing "Book a school conversation" block
│  ├─ ContactForm.tsx        Enquiry form AND the newsletter sign-up form
│  ├─ ArticleLibrary.tsx     Filter by age/topic + search
│  ├─ SelfCheck.tsx          The interactive reflection tool (answers never leave the browser)
│  ├─ TodaysPlay.tsx         Picks one age-guide idea per day
│  ├─ FaqList.tsx            Accessible accordion
│  ├─ PhotoGrid.tsx          Masonry + keyboard-accessible lightbox
│  ├─ Img.tsx  Icon.tsx  Reveal.tsx  JsonLd.tsx   Small helpers
│
├─ content/                  CONTENT (what you edit)
│  ├─ articles/*.md          12 articles (front-matter + Markdown body)
│  ├─ events/*.md            3 events with their photos
│  ├─ ages.json              The 8 age guides (also feed Today's Play)
│  ├─ selfcheck.json         Self-check questions, areas, advice
│  └─ faq.json               FAQ
│
├─ data/profile.json         All other site text: home, about, schools, PlayXploration, contact, etc.
│
├─ lib/                      CODE THAT LOADS CONTENT
│  ├─ content.ts             Reads articles/ages/events/faq/selfcheck, renders Markdown safely
│  └─ img.ts                 Chooses small or large photo version
├─ lib.ts                    Shortcut to site text (`P`) and helpers (`has`, `isTodo`)
│
├─ public/                   FILES SERVED AS-IS
│  ├─ photos/                16 web-ready, colour-graded photos (WebP, 1600px + 800px)
│  ├─ uploads/               Images uploaded through the admin
│  └─ admin/                 index.html (loads Decap), config.yml (what the admin can edit), logo.svg
│
├─ docs/                     Plans and this guide
├─ tailwind.config.ts        Design tokens (colours, radii, shadows)
├─ next.config.mjs           Redirects (/blog → /articles …), admin rewrite, security headers
├─ package.json              Dependencies and commands
├─ tsconfig.json  postcss.config.js
├─ README.md                 Quick start and launch checklist
└─ potos/, WhatsApp*/, out/  NOT part of the site (raw photo dumps, old build). Ignored by git.
```

## 4. How content becomes a page
1. Content lives in files (`content/…`, `data/profile.json`).
2. `lib/content.ts` reads them at **build time**.
3. Pages in `app/` turn them into HTML. Pages with `[slug]` are generated once per file (static, very fast).
4. Whoever edits in `/admin/` is really editing those files in GitHub. Vercel sees the change and rebuilds (about a minute).

## 5. Design system (the "pattern")
- **Colours** (`tailwind.config.ts`): paper `#FBFAF8`, ink `#1A1D2E`, **saffron `#FF8A1F` for every button**, and soft tints (violet, coral, sky, sun, mint) that colour-code sections.
- **Shapes:** pill buttons, 28px rounded cards, soft shadows.
- **Signature details:** a yellow highlighter swash on one or two words per heading (`.hl`), floating pastel orbs behind headers (`.orb`).
- **Motion:** page and hero fades are CSS (so content is never hidden waiting for JavaScript); scroll reveals use Framer-motion and switch off for visitors who prefer reduced motion.
- **Accessibility built in:** skip-link, one H1 per page, alt text on images, labelled forms, keyboard-operable menu/lightbox/accordion, visible focus ring, 44px+ touch targets, AA colour contrast.

## 6. Rules the content follows
- **First-person voice** ("I help schools…").
- **No invented facts.** Anything missing is `TODO: confirm with Tripta` and is **hidden from visitors** automatically (`has()` in `lib.ts`).
- **"Draft" ribbon:** age guides, articles and the self-check show *"Draft, waiting for Tripta's review"* until `reviewed: true`.
- **Photos:** only adult-focused, high-quality ones; any photo with children needs written consent.
- **Not medical advice** notices on age guides and articles.

## 7. SEO and sharing
Per-page title, description and canonical URL; Open Graph and Twitter cards; structured data (Person, Organization, Service, BlogPosting, BreadcrumbList, FAQPage, Event, ImageGallery); `sitemap.xml` (40 URLs), `robots.txt` (blocks `/admin/` and `/api/`), RSS at `/feed.xml`. Old addresses (`/services`, `/blog`, `/writing`) redirect with 308.

## 8. Run it
```bash
npm install
npm run dev        # http://localhost:3000   (don't run build at the same time)
npm run build      # production build
npm start          # serve the production build
npm run cms        # local admin helper (no login needed on your machine)
```

## 9. Deploy
GitHub → Vercel (import repo). Add environment variables: `OAUTH_GITHUB_CLIENT_ID`, `OAUTH_GITHUB_CLIENT_SECRET` (admin login) and `NEXT_PUBLIC_FORM_ENDPOINT` (forms). Set `site.url` in `data/profile.json` to the real domain.

## 10. Known limits of version 1 (why the next step exists)
| Limit | Effect |
|---|---|
| Forms have no backend | Enquiries and sign-ups go nowhere until an external form service is connected |
| Admin is git-based | Needs a GitHub account; publishing takes about a minute; no lead inbox; no roles |
| English only | No language switch, `lang` fixed to `en-IN` |
| No privacy policy / consent text | Needed before collecting personal data |
| No favicon / social-share image files | Browser tab and link previews look generic |
| No analytics | Nothing measures visits (optional, privacy-friendly option exists) |

*Next: `docs/admin-and-languages-plan.md`.*
