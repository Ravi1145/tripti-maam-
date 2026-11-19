# Plan: multiple languages + a real admin panel (CMS, gallery, blog, leads)

Status: **PLAN, waiting for your decisions (section 9). Nothing here is built yet.**

---

## 1. What you asked for
1. Multiple languages, like kinedu.com.
2. A gallery option (events and photos), controlled from the admin.
3. An admin and CMS panel that controls **everything**: images, blog, lead form, and the site's text.
4. Content and settings that come from the backend, not from files.
5. An audit of what is needed.
6. A full project write-up (done for today's build: `docs/PROJECT_GUIDE.md`).

## 2. How Kinedu does languages (measured on their live site)
- English at `/`, Spanish at `/es`, Portuguese at `/pt`: **a language = a URL path.**
- A small pill toggle **EN | ES | PT** in the header and footer.
- `<link rel="alternate" hreflang="en|es|pt|x-default">` on every page, so Google shows the right language to the right person.
- `canonical` per language page.

We copy exactly that pattern: it is the best for Google and for sharing links.

## 3. Audit: what we have vs what is needed

| # | Area | Today | Gap | Priority |
|---|------|-------|-----|----------|
| 1 | **Lead capture** | Forms exist, but there is **no backend**; without a form service they send nothing | Store every enquiry, speaking request and sign-up in a database; admin inbox with status, notes, CSV export | **Critical** |
| 2 | **Admin** | Decap CMS: edits files through GitHub | Needs a GitHub account; ~1 min to publish; no lead inbox, roles, media library or translation view; clumsy for site text | **Critical** |
| 3 | **Languages** | English only; UI text hard-coded inside pages | Move all UI text to translation files; `[locale]` routes; switcher; hreflang; Devanagari font | **High** |
| 4 | **Privacy and consent** | None | Privacy policy page, consent checkbox on forms, "how long we keep your data" (India's DPDP Act 2023 applies to personal data) | **High** |
| 5 | **Spam and abuse** | None | Honeypot field, time check, rate limit, validation | **High** |
| 6 | **Images** | 16 hand-graded photos in the repo | Admin upload with automatic resize/WebP, alt text per language, credit, **consent tick for photos of children** | High |
| 7 | **Gallery** | Events with photo grid + lightbox | Albums manageable in admin (drag order, captions, cover, hide) | Medium |
| 8 | **SEO** | Good base (sitemap, schema, canonical) | Per-language alternates, favicon + social-share image missing, translated metadata | Medium |
| 9 | **Notifications** | None | Email Tripta on a new lead (needs an email service key) | Medium |
| 10 | **Analytics** | None | Optional privacy-friendly visit counts | Low |
| 11 | **Quality** | Tested by script and by eye | Add automated checks for forms, language routes and admin permissions | Medium |
| 12 | **Repo hygiene** | Raw WhatsApp photo folders sit in the project root | Already git-ignored today so nothing sensitive is committed by accident | Done |

## 4. Recommended architecture

```
 Visitor ──► Next.js site on Vercel ──reads──► Supabase (Postgres)  ◄──writes── Admin panel (/admin)
                │  /, /hi, /mr pages                │ articles, guides, events, FAQ,
                │  forms POST /api/leads            │ site text, media, leads, users
                ▼                                   ▼
        validates + stores lead             Storage bucket: photos
                                             Auth: admin sign-in (email)
```

- **Frontend:** the site you have now, moved under a `[locale]` route segment.
- **Database + login + file storage:** **Supabase** (Postgres). Free tier is enough for this site.
- **Admin panel:** built into the same Next.js app at `/admin` (not a separate product), so one project, one deploy.
- **Publishing:** saving in the admin refreshes the live page **instantly** (Next.js on-demand revalidation). No redeploy.
- **Safety net:** if the database is unreachable, pages fall back to the bundled content files, so the site never goes blank.
- **Decap CMS** is retired once this works (kept for local fallback until then).

### Data model (tables)
| Table | Holds |
|---|---|
| `site_settings` (key, locale, value) | Every block of site text now in `profile.json`, per language |
| `articles` + `article_translations` | Slug, topic, ages, cover, status (draft/review/published), publish date; per language: title, summary, body, SEO, "reviewed" |
| `age_guides` + `…_translations` | The 8 guides |
| `faqs` + `…_translations` | Questions, order |
| `events`, `event_photos` + translations | Albums, photos in order, captions |
| `media` | File, size, **alt text per language, credit, consent confirmed (yes/no)** |
| `leads` | Type (enquiry/speaking/subscribe), name, email, phone, school, city, message, language, page, status (new/contacted/closed), notes, consent time, hashed IP |
| `self_check_questions` | Questions and areas per language |
| `profiles` | Admin users and role (owner / editor) |
| `audit_log` | Who changed what, when |

Row-level security: visitors can only **read published** rows; only signed-in admins can write; leads can only be **created** by the server after validation and **read** by admins.

### Admin panel modules
1. **Dashboard:** new leads, drafts waiting, translations missing.
2. **Leads:** table, filter by type/status, open a lead, add notes, mark contacted, **export CSV**, reply by email.
3. **Articles (blog):** list; editor with Markdown and live preview; language tabs; cover image; topic, ages, tags; SEO fields; Draft / Needs review / Published; schedule date.
4. **Age guides, Today's Play, FAQ, Self-check:** simple forms per language.
5. **Gallery:** create an album, drag-and-drop upload (auto resized), reorder, captions, hide/show, **"consent confirmed" tick required for any photo with children**.
6. **Media library:** all images, alt text per language, credit, where used.
7. **Site text:** forms for home, about, schools, PlayXploration, speaking, contact, per language.
8. **Languages:** a table showing which page or article is missing a translation or still needs review.
9. **Settings:** contact email/phone, notification email, social links, site URL, privacy policy text.
10. **Users:** invite an editor, change role.

## 5. Languages design
- **URLs:** `/` English (default, no prefix), `/hi/…` Hindi, `/mr/…` Marathi (final list in section 9).
- **Switcher:** pill toggle in the menu and footer, same as Kinedu; remembers choice in a cookie; never auto-redirects crawlers.
- **UI text** (buttons, menus, form labels, errors): translation files `messages/en.json`, `hi.json`, `mr.json`.
- **Content text:** translated fields in the database; if a translation is missing, the English version is shown and flagged for Google as such.
- **Quality:** every translation has a **"reviewed by a native speaker"** flag. Unreviewed translations show a small notice in the admin only, and are **not published** unless you choose.
- **Fonts:** Noto Sans Devanagari (Hindi/Marathi) loaded **only** on those pages.
- **SEO:** `hreflang` alternates, per-language canonical, per-language sitemap entries, `<html lang="hi">` etc.
- **Who translates:** I draft Hindi and Marathi from the approved English; a fluent reader (ideally an early-childhood professional) must review before publishing. Child-development wording is easy to get subtly wrong.

## 6. Lead capture design
1. Form (any language) posts to `/api/leads` on our own server.
2. Server checks: required fields, email format, hidden honeypot field, minimum fill time, per-IP limit.
3. Stores the lead, the language, the page it came from, and the consent time.
4. Shows a thank-you in the visitor's language.
5. Admin inbox shows it immediately. (Phase 2: email alert to Tripta.)
Newsletter sign-ups use the same table (type `subscribe`) with confirm/unsubscribe flags.

## 7. Security rules
Admin sign-in through Supabase Auth (email link), roles enforced in the database, uploads limited to images under 10 MB and re-encoded, all Markdown sanitised, secrets only in Vercel environment variables, service key never sent to the browser, personal data minimised and exportable/deletable on request.

## 8. Phases (each one is tested before the next)
| Phase | Deliverable |
|---|---|
| A | Languages foundation: `[locale]` routes, translation files, switcher, hreflang, Devanagari font, English kept identical |
| B | Database: Supabase project, tables, security rules, move all current content in as a "seed", site reads from the database with file fallback |
| C | Lead capture: `/api/leads`, consent + spam protection, privacy page |
| D | Admin core: sign-in, dashboard, leads inbox, articles, FAQ, site text |
| E | Admin media: upload with resize, media library, gallery albums, alt text and consent |
| F | Hindi (+ Marathi) drafts for UI and content, review workflow, language status table |
| G | Audit pass: accessibility, speed, security tests, favicon + social image, docs updated |

Honest sizing: this is several thousand lines and roughly 7 phases. I build and test each phase and show you the result before moving on.

## 9. Decisions I need from you
1. **Languages:** which ones? (Recommended: English + Hindi + Marathi.)
2. **Backend approach:** custom admin + Supabase (recommended), or stay with Decap + an external form service (lighter, but no lead inbox)?
3. **Supabase project:** your account already has one project (`RAVIIPUNE`, which looks unrelated). Create a **new** project for this site (recommended, I will check the cost first and ask again), use the existing one, or you create it?
4. **Translations:** I draft Hindi/Marathi for review (recommended) or translate the menus/buttons only for now?

## 10. What I need later (not now)
- Tripta's contact email/phone, and a notification email address.
- An email-sending service key (Resend or similar) for lead alerts.
- A fluent reviewer for Hindi and Marathi.
- The real domain.
