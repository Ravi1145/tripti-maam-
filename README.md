# Tripta Tarunesh - personal website

Next.js 14 + Tailwind + Framer Motion, with a Decap CMS admin at `/admin/`.
All content is plain files in this repo (no database):

| What | Where | Edited in admin under |
|------|-------|-----------------------|
| Blog posts | `content/blog/*.md` | Blog posts |
| Events & gallery photos | `content/events/*.md` | Events & gallery |
| FAQ | `content/faq.json` | FAQ |
| Every other text (hero, about, services, contact...) | `data/profile.json` | Site text & settings |
| Uploaded images | `public/uploads/` | any image field |

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Use the admin locally (no login, edits files on disk)
Open two terminals:
```bash
npm run dev
npm run cms      # starts decap-server (downloads the decap-server package on first run)
```
Then open http://localhost:3000/admin/ and click "Login with GitHub" (local mode skips the login).

## Go live: admin login for Tripta (one-time setup, about 10 minutes)
1. Push this folder to a GitHub repository.
2. In `public/admin/config.yml` set `backend.repo` (`owner/repo`) and `backend.base_url` (your live URL).
3. Create a GitHub OAuth App: GitHub > Settings > Developer settings > OAuth Apps > New.
   - Homepage URL: your live URL
   - Authorization callback URL: `https://YOUR-DOMAIN/api/callback`
4. In Vercel > Project > Settings > Environment Variables add:
   - `OAUTH_GITHUB_CLIENT_ID`
   - `OAUTH_GITHUB_CLIENT_SECRET`
   - `NEXT_PUBLIC_FORM_ENDPOINT` (contact form, e.g. a Formspree URL)
5. Redeploy. Tripta signs in at `https://YOUR-DOMAIN/admin/` with a GitHub account that has write access to the repo.
   Saving or publishing in the admin commits to GitHub and Vercel republishes the site in about a minute.

Only people with write access to the repository can log in to the admin.

## SEO already built in
- Per-page titles, descriptions, canonical URLs, Open Graph and Twitter cards
- JSON-LD: Person, Organization, Blog / BlogPosting, BreadcrumbList, FAQPage, Event, ImageGallery
- `/sitemap.xml` (includes every post and event), `/robots.txt` (blocks `/admin/`, `/api/`), `/feed.xml` (RSS)
- Set the real domain in `data/profile.json` > `site.url` (or in the admin under Site text & settings)
- For each blog post use the "Short summary" (140-160 characters) and an optional SEO title / description

## Photos
- Her portrait: upload in the admin, then set `person.photo` (for example `/uploads/tripta.jpg`).
- Event photos: Events & gallery > open an event > add photos with captions (captions double as alt text).

## Pre-launch checklist
- [ ] Tripta approves all text, photos and named people/organisations
- [ ] Replace every `TODO: confirm with Tripta` (list is in `data/profile.json` > `todo`)
- [ ] Replace the two summary blog posts with her full articles
- [ ] Real domain set; OAuth app and env variables added; admin login tested
- [ ] Add event photos and portrait
- [ ] Submit `/sitemap.xml` to Google Search Console
- [ ] Run Lighthouse on the live URL
