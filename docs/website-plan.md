# Tripta Tarunesh website — redesign plan (for approval)

Status: **BUILT (first pass). Awaiting Tripta review of drafted content, then push. See README for the review workflow.**

---

## 1. Where we are (audit, page by page)

Audited the production build on every route. Word counts are visible text inside the page body.

| Page | Words | What works | What is wrong |
|---|---|---|---|
| Home | 513 | Clear promise, her photo, her own question, glow/animation | Dark-heavy look you have rejected twice; several headings are my phrasing, not hers ("Ideas with a place to land", "Fresh thinking…"); no proof (testimonials/logos); one CTA type only |
| About | 288 | Portrait, her quote, philosophy grid | Thin story; switches between "she" and "I"; no timeline/education (missing facts) |
| Services | 218 | Clean scroll index | No process ("how working together works"), no outcomes, no imagery, no per-service detail |
| PlayXploration | 120 | Strong tagline | Far too thin for her flagship initiative; no visuals, no "how a school uses it" |
| Foundation Years First | 81 | Clear premise | Thinnest page; **"TODO" visible to visitors** (initiative link) |
| Blog index | 104 | Works | Only 2 posts, both short summaries I wrote from your notes |
| Blog post | 177 | Article layout, SEO | **"TODO" visible** at the end of the body |
| Gallery | 190 | Events + lightbox | Photo quality is mixed; event names/dates unknown |
| Newsletter (Writing) | 173 | Content is hers | **"TODO" visible** ("Read online: TODO"); no subscribe box |
| Speaking | 155 | Bett Asia facts | No visuals, no "invite Tripta to speak" path |
| FAQ | 8 Qs | Searchable, schema for Google | Answers written by me from your brief; no pricing/process questions |
| Contact | 52 | Form fields | No email/phone, form not connected, no "what happens next" |
| 404 | 13 | — | Default unbranded Next.js page |

Cross-site issues
- **Voice is inconsistent** (third person "She helps…" vs first person "I translate…", "Tell me about your school").
- **Navigation has 9 destinations** plus dropdowns — too many for a personal brand.
- **No lead magnet** and only one kind of call to action.
- **No social proof** at all (testimonials, school logos, press).
- Mobile layout not yet reviewed screen by screen.

---

## 2. Design direction (proposed): "Warm & Bright" — inspired by Kinedu, not copied

What we borrow from kinedu.com (patterns only, never their copy or assets):

| Kinedu pattern | Our version |
|---|---|
| Warm off-white page (`#FBFAF8`), lots of air | Warm white base for every page; dark indigo used only for the footer and one statement band |
| One action colour + soft multicolour tints that colour-code sections | **Saffron `#FF8A1F`** for every button; soft tints of violet, coral, sky and sun to colour-code pillars/services/stats |
| Heavy rounded sans headline with a highlighter swash on key words | **Plus Jakarta Sans 800** for headings (free; Kinedu's own fallback font) + saffron highlighter on 1–2 words per heading; Inter for body |
| Pill buttons, floating pill nav, 24–32px rounded cards, soft shadows | Same shape language |
| Gentle floating pastel orbs, little else moving | Floating orbs + highlighter sweep + soft fade-ups; remove heavy glow/aurora |
| Product mockup in the hero | Her best photo in a rounded card on a coloured blob |

Palette (draft)

| Token | Colour | Use |
|---|---|---|
| paper | `#FBFAF8` | page background |
| ink | `#1A1D2E` | text |
| saffron | `#FF8A1F` / dark `#C2410C` | buttons, highlights / small text on light |
| violet | `#6D5DF5` tint `#EEECFF` | Relationships, links |
| coral | `#FF6B6B` tint `#FFECEC` | Play |
| sky | `#2B8BE4` tint `#E6F2FD` | Language |
| sun | `#FFC033` tint `#FFF6DB` | Thinking, highlighter |
| night | `#16133A` | footer + one statement band only |

All text pairs checked to WCAG AA (4.5:1).

---

## 3. New page structure ("the pattern")

### Home (in this order)
1. **Hero** — promise in her words + highlighter word, one saffron button ("Book a school conversation"), secondary text link; trust row with **real facts only**: ~20 years in ECCE · curricula for 10 national + 2 international organisations · 1,950+ educators at Bett Asia 2026 · Harvard CEEL-PZ. Her photo in a rounded card.
2. **Emotional band** — "The years that shape everything that follows" + her one-line why.
3. **Four pillars trio** — Relationships / Play / Language / Thinking, each colour-coded with an icon (like Kinedu's Play/Respond/Connect).
4. **Numbers row** — the same real facts, colour-coded.
5. **What she does, 01–05** — five numbered blocks (curriculum, teacher development, audits, leadership mentoring, observation & assessment), each with a coloured pill label and one good photo.
6. **Lead magnet** — "Is your Foundation Years programme on track? 10 questions, 5 minutes" with a sample reading across the four pillars. *(Needs her questions — see section 6.)*
7. **Proof** — testimonials from school leaders. *(Hidden until real quotes exist.)*
8. **How working together works** — 3 steps (conversation → observation & audit → systems & mentoring).
9. **Initiatives** — PlayXploration and Foundation Years First cards.
10. **Latest writing** + newsletter subscribe.
11. **FAQ preview** (4 questions) + footer CTA.

### Other pages
- **About** — first-person story (why she does this, the turning point, how she works), timeline (needs dates), education & certifications, recognition, photo.
- **Services** — overview + one detail block per service: who it is for, what happens, what the school gets; process; FAQ; CTA.
- **PlayXploration** — what it is, the two lenses, what play reveals, how a school runs it (steps), CTA.
- **Foundation Years First** — premise, the five aims, who it is for, how to join/follow, link.
- **Speaking** — topics she speaks on, Bett Asia highlight, recognition, "Invite Tripta to speak" form.
- **Writing/Blog** — merged into one "Insights" page: newsletter subscribe + articles.
- **Gallery** — only the best-graded photos; events named and dated.
- **Contact** — email/phone/WhatsApp, form (connected), "what happens next" in 3 steps, response time.
- **404** — branded page with links home.

### Navigation (from 9 items to 5 + CTA)
About · Services · Initiatives ▾ · Insights · Gallery · **[Book a conversation]**

---

## 4. Content fixes (what I will write vs what only Tripta can supply)

I can write / restructure (from her existing words only, she approves):
- One consistent voice across the site
- Rewrite all headings in plain language; remove my marketing phrasing
- Services detail blocks, process steps, FAQ additions, 404, microcopy
- Draft 10 self-check questions from her four pillars (for her approval)

Only Tripta can supply (will stay hidden until provided, never invented):
- Testimonials (name, role, school), school/partner logos
- Career timeline, education, dates
- Email, phone, WhatsApp, newsletter link, Foundation Years First link
- Full text of her articles
- Event names, dates, places for gallery photos
- Approval of every photo used (and consent for any photo with children)

---

## 5. Images plan
- Use the **8 best-scoring adult-only WhatsApp photos** (measured for sharpness and exposure), all given one consistent warm colour grade so they read as one set: campus (#3), educator group (#5), session moment (#2), corridor walk (#58), leadership meeting (#61), memorial block (#1), centre entrance (#56), library meeting (#62).
- Present them Kinedu-style: rounded cards sitting on soft coloured blobs, never full-bleed (full-bleed exposes phone-photo quality).
- Hero stays the sharpest photo (campus). Request one high-resolution professional portrait for later.
- Photos with identifiable children stay out unless written consent is confirmed.

---

## 6. Decisions (confirmed by you)
| # | Decision | Choice |
|---|---|---|
| 1 | Theme | **Warm & Bright** (Kinedu-inspired light theme; dark only in footer + one band) |
| 2 | Voice | **First person "I"** across the site |
| 3 | Main goal | **Book a school conversation** (every primary button) |
| 4 | Images | **8 best adult-only photos**, one colour grade, rounded cards |
| 5 | Self-check | **Build now** — I draft 10 questions + sample result; Tripta approves before launch |
| 6 | Navigation | **Simplify** to About · Services · Initiatives ▾ · Insights · Gallery · [Book a conversation] |
| 7 | Testimonials | **Not yet** — section built but hidden until real quotes arrive |
| 8 | Contact | **Form only** for now; email/phone added later via the admin |

## 7. Build order once approved
1. Theme tokens, fonts, buttons, nav, footer (site-wide)
2. Home rebuilt in the new pattern
3. About, Services, PlayXploration, Foundation Years First
4. Insights (blog + newsletter), Speaking, Contact, 404
5. Gallery clean-up with graded photos
6. Mobile pass on every page, accessibility and speed check (Lighthouse), then push

---

## 8. Reference 2 — the "Foundation Years First" clone (analysed; supersedes parts of sections 2–4)

A 32-page, ~10,800-word static preview (private, `noindex`). Key finding: **it is a different kind of site from ours.**

| | Our current site | The clone |
|---|---|---|
| Who it speaks to | School owners/principals (B2B) | Parents and educators (B2C resource) with a school-services door at the end |
| What it is | Expert profile + services | Content library: 8 age guides, 9 articles, 3 features, milestones, "Today's Play", monthly letter "Anubhuti", editorial policy |
| Voice | Mixed he/she/I | First person, calm, concrete ("When I visit a school, I begin by looking at the child.") |
| Look | Dark indigo + glow | Warm paper `#FBF8F0`, berry `#652E3B`, Instrument Serif headings + DM Sans, 4–6px corners, hairlines, age stages colour-coded in soft beige/sage/mauve |

### What it does well (content patterns worth adopting)
1. **Every article follows one repeatable shape:** a question from everyday life → *The Moment Before We Help* → *Offer help with one part* → *Notice what changes* → further reading (named sources) → "Read next". 330–570 words, no jargon.
2. **Age is the navigation:** 8 age guides (birth→8), each = one familiar moment + "Try this today" + "What to look for next" + a related article.
3. **Concrete, low-cost activities** (a dabba lid, a soft ball, two counters) — no special toys.
4. **Trust through honesty:** a *How we write* page (what is illustrative vs documented, where sources come from, photos "illustrate the scenes").
5. **Warm personal credibility:** About leads with a classroom observation (Melaka preschool), not a CV; credentials appear in one short paragraph.
6. **Clear audience doors:** For Parents / For Educators / Work with schools, each with its own next step.
7. **Lead magnets without pressure:** Anubhuti monthly letter ("one moment, one question, one thing to try"); a "how does your child join a game?" self-guide.
8. **Services page is plain-language** (4 offers: curriculum & classroom practice, observation & assessment, PlayXploration, family engagement & speaking) and starts "with the questions your team is already facing".

### Things to check before reuse (flags)
- **Spelling:** the clone writes *Lakshmi Annapurna **Chitaluri***; the earlier brief wrote *Chintaluri*. Needs Tripta's confirmation.
- **Experience claim:** clone says "more than two decades"; her LinkedIn text said "nearly two decades". Pick one, with her approval.
- **Scope drift:** clone says "birth to 12" on the home page and "birth to eight" elsewhere.
- **Images:** the clone's photos are illustrative (it says so itself). They look generated; **we will not copy them** — we use her real photos or commission photography.
- **Copy ownership:** text appears drafted in her voice by a tool/person. We reuse **structure and style**, and only reuse sentences once Tripta approves them.
- All forms in the clone are "preview" only; milestone content leans on U.S. CDC checkpoints (we'd cite India sources too, e.g. Navchetana as the clone already does).

### Revised recommendation
**Content architecture from the clone + visual theme to be decided (see questions below).** Concretely:
- Add a **Foundation Years First resource hub** inside our site: age guides, an article library (question-led template), Today's Play, Anubhuti letter, How we write.
- Keep the **expert/school-services side** (Services, PlayXploration, Speaking, Contact) as the conversion path, in the clone's plain-language style.
- Home becomes: promise in her voice → explore by age → start with a question → follow an ability → school services door.

---

## 9. Final decisions after the clone review (these override anything above that conflicts)

| # | Decision | Final choice |
|---|---|---|
| 1 | Look | **Kinedu-style bright** (warm white, saffron buttons, multicolour soft accents, heavy rounded headings with highlighter swashes) |
| 2 | Purpose | **Expert site + Foundation Years First hub** (both audiences) |
| 3 | Clone copy | **Reuse structure and style; reuse its sentences only after Tripta approves them** |
| 4 | Voice | First person "I" |
| 5 | Main button | "Book a school conversation"; parent-side button: "Explore by age" |
| 6 | Photos | 8 best adult-only photos, one colour grade, rounded cards; clone's illustrative photos are NOT copied |
| 7 | Self-check | Build now (drafted, awaiting Tripta's approval) |
| 8 | Testimonials | Hidden until real quotes exist |
| 9 | Contact | Form only for now |

### Combined sitemap (replaces section 3 navigation)
Top nav: **For Parents · For Educators · Articles · About · Work with schools [button]**

```
/                         Home: promise → Explore by age → Start with a question → Follow an ability → For schools door
/for-parents/             What to notice and try at home, birth to eight
/for-educators/           Classroom examples + resources to share with families
/ages/                    8 age guides: birth–12m, 1–2, 2–3, 3–4, 4–5, 5–6, 6–7, 7–8
/articles/                Question-led article library with filter (age, ability)
/articles/[slug]          Standard shape: question → moment → one thing to try → notice → sources → read next
/play/                    Today's Play (one idea to try)
/milestones/              Early milestones, birth–3 (cite India sources + clone's CDC, clearly labelled)
/anubhuti/                Monthly letter + subscribe
/how-we-write/            Editorial approach (what is illustrative vs documented, sources)
/about/                   Story-first (a classroom observation), short credentials
/work-with-schools/       4 plain-language offers + process + enquiry form
/initiatives/playxploration/   Her flagship initiative (fuller page)
/speaking/  /gallery/  /faq/  /contact/    kept, restyled (footer + relevant pages)
```

### Content to create (all first-person, one repeatable article template)
- 8 age guides (≈200 words each): familiar moment · try this today · what to look for next
- 9 articles seeded from the clone's questions (rewritten after Tripta's approval)
- 3 ability features ("try a different way", etc.)
- Today's Play, Anubhuti welcome letter, How we write, For Parents, For Educators
- 10-question school self-check (draft)
- All placeholders (testimonials, email/phone, dates, spelling of partner's name) hidden or flagged, never invented

### Build order
1. Theme tokens, fonts, nav/footer (Kinedu-bright)
2. Home + Explore-by-age + article template
3. Age guides + article library (filter) + Today's Play + Anubhuti + How we write
4. For Parents / For Educators / About / Work with schools / PlayXploration
5. Speaking, Gallery, FAQ, Contact, 404
6. Mobile pass on every page, accessibility + speed check, push
