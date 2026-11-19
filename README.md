# Tripta Tarunesh: website

Next.js 14 + Tailwind, with a Decap CMS admin at `/admin/`. Light "Warm & Bright" design (warm paper, saffron buttons, colour-coded tints, Plus Jakarta Sans).
All content is plain files in this repo (no database).

## Where things live (all editable in the admin)

| What | File | Admin section |
|------|------|---------------|
| Articles (question-led library) | `content/articles/*.md` | Articles |
| The 8 age guides and Today's Play | `content/ages.json` | Age guides and Today's Play |
| School self-check questions | `content/selfcheck.json` | School self-check |
| Events and gallery photos | `content/events/*.md` | Events and gallery |
| FAQ | `content/faq.json` | Questions (FAQ) |
| All other text (home, about, schools, PlayXploration, contact...) | `data/profile.json` | Site text and settings |
| Photos | `public/photos/` (web-ready, graded) and `public/uploads/` (admin uploads) | any image field |

## Pages
Home · For parents · For educators · Explore by age (+ 8 guides) · Articles (+ filter) · Today's Play · Anubhuti letter · How we write · About · Work with schools · PlayXploration · Foundation Years First · School self-check · Speaking · Gallery · FAQ · Contact.
Old addresses redirect: `/services`, `/blog`, `/writing`.

## The "Draft" ribbon (important)
Drafted content (age guides, articles, self-check) shows a yellow **"Draft, waiting for Tripta's review"** ribbon until it is approved.
To approve: open the item in the admin and tick **"Approved by Tripta"** (`reviewed: true`). Nothing child-development related should go public before that.
Placeholders that start with `TODO: confirm with Tripta` are hidden from visitors automatically (email, phone, links).

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```
Do not run `npm run build` while `npm run dev` is running (they share the `.next` folder). Stop dev first.

## Use the admin locally (no login, edits files on disk)
```bash
npm run dev
npm run cms      # starts decap-server (downloads the package on first run)
```
Open http://localhost:3000/admin/.

## Go live (one-time setup, about 10 minutes)
1. Push this folder to GitHub (already: `Ravi1145/tripti-maam-`).
2. Import it at vercel.com/new (Next.js, nothing else to set).
3. Create a GitHub OAuth App (GitHub > Settings > Developer settings > OAuth Apps). Homepage URL: your live URL. Callback: `https://YOUR-DOMAIN/api/callback`.
4. In Vercel > Settings > Environment Variables add `OAUTH_GITHUB_CLIENT_ID`, `OAUTH_GITHUB_CLIENT_SECRET`, and `NEXT_PUBLIC_FORM_ENDPOINT` (e.g. a Formspree URL; it powers the enquiry form and the Anubhuti sign-up).
5. Set `site.url` in `data/profile.json` to the real domain. Redeploy.
6. Tripta signs in at `https://YOUR-DOMAIN/admin/` with a GitHub account that has write access.

## Pre-launch checklist
- [ ] Tripta approves every drafted article, age guide, play idea and self-check question (tick "Approved by Tripta")
- [ ] Source lines under each article checked and linked
- [ ] Confirm: spelling "Lakshmi Annapurna Chintaluri", and "nearly two decades" wording
- [ ] Email, phone, newsletter link filled in (`data/profile.json`)
- [ ] Every photo approved; consent confirmed for any photo with children
- [ ] Testimonials added (section stays out until real quotes exist)
- [ ] Event names and dates added in Events
- [ ] Real domain set, OAuth app and env variables added, admin login tested
- [ ] Lighthouse run on the live URL; submit `/sitemap.xml` to Google Search Console
