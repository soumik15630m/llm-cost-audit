# LLM Cost Audit - marketing site

Production-ready, SEO-first marketing site for an LLM / inference cost audit
practice. Next.js (App Router) + TypeScript + Tailwind v4 + Framer Motion.
Static (SSG) on every public page; deploys to **Vercel with zero config**.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (what Vercel runs)
npm start        # serve the production build
```

## Deploy (Vercel, zero config)

1. Push this repo to GitHub.
2. Import it in Vercel - framework auto-detected as Next.js, no settings needed.
3. **Before launch**, set the production domain in [`lib/site.ts`](lib/site.ts)
   (`site.url`). Every canonical, the sitemap, OG image URLs and JSON-LD derive
   from it.
4. After deploy: submit `https://<your-domain>/sitemap.xml` in Google Search
   Console and paste your verification token into `app/layout.tsx` (`metadata.verification`).

## Contact form delivery (no separate backend)

Submissions are handled by a bundled **Edge Function** at
[`app/api/contact/route.ts`](app/api/contact/route.ts) - nothing else to deploy.
On each submission it sends **two emails via Resend**:

1. **To the lead** - a personalized reply with next steps + a link to your Slack
   for follow-ups.
2. **To you** - a "they just joined" notification with the lead's details
   (reply-to is the lead, so you just hit reply).

Set these in Vercel → Settings → Environment Variables (see [`.env.example`](.env.example)):

| Var | | |
|---|---|---|
| `RESEND_API_KEY` | required | Resend API key |
| `CONTACT_TO_EMAIL` | required | where your notification goes |
| `CONTACT_FROM_EMAIL` | recommended | verified sender - **required to email leads** (external addresses); the default `onboarding@resend.dev` only reaches your own account address |
| `SLACK_INVITE_URL` | optional | Slack link included in both emails |
| `DATABASE_URL` | optional | Neon Postgres connection string - logs each consent (name, email, company, spend, time, IP, UA) to a `consent_log` table (auto-created) |

With `RESEND_API_KEY` unset, submissions still succeed and are written to the
Vercel function logs (so leads aren't lost). A required consent checkbox (Terms +
Privacy) gates the form client- and server-side; a honeypot drops bot spam. The
form only ever sends four fields plus the consent flag - no billing or usage data.

## SEO notes

The site lives on the **`llm.houseofstk.com`** subdomain (a wing of the House of
STK studio). Search engines treat a subdomain as a **separate property** - add
`https://llm.houseofstk.com` in Google Search Console and submit
`/sitemap.xml` there. Structured data (JSON-LD) is server-rendered on every page:
Organization (with `parentOrganization` → House of STK), WebSite, Service, plus
Article/BreadcrumbList on posts and FAQPage on pricing.

**IndexNow** (pushes new/changed URLs to Bing + ChatGPT's index): the key file is
already at `public/b440a1e812162c1fce2303ea0334868d.txt`. After a deploy, ping:

```
curl "https://api.indexnow.org/indexnow?url=https://llm.houseofstk.com/&key=b440a1e812162c1fce2303ea0334868d"
```

**Analytics:** privacy-friendly, cookieless Vercel Web Analytics + Speed Insights
are wired in (`app/layout.tsx`) - they only emit on the Vercel production deploy,
need no cookie banner, and the data processor (Vercel) is already disclosed.

## Adding content (founder-supplied Markdown)

Drop Markdown files in - no code changes needed:

| Content | Location | Notes |
|---|---|---|
| Blog posts | `content/blog/*.md` | YAML frontmatter: `title`, `description`, `slug`, `date`, `tags`. Index sorts newest-first; metadata + OG image are built from the frontmatter. |
| Privacy | `content/legal/privacy.md` | Renders at `/privacy`. |
| Terms | `content/legal/terms.md` | Renders at `/terms`. |
| NDA | `content/legal/nda.md` | Renders at `/nda`. Also drop `public/mutual-nda.pdf` for the download link. |

Missing a file? The page shows a clear **CONTENT PENDING** placeholder and the
build still passes. No legal or blog text is ever generated.

## Sample audit PDF

The editable, print-ready sample report is
[`public/sample-llm-cost-audit.html`](public/sample-llm-cost-audit.html). Open
it and use the browser's **Print → Save as PDF** to produce the PDF. It carries
a persistent **"SAMPLE REPORT - illustrative figures only"** stamp on page 1 and
in every footer. Replace the analysis/numbers with your own; keep the stamp.

## Things to fill in (search the code for these markers)

- `FOUNDER-FILL` - real values: domain, name, email, GitHub/LLVM/fmt PR links
  (`lib/site.ts`), contact-form endpoint (`components/contact/ContactForm.tsx`),
  Search Console token (`app/layout.tsx`), NDA download file.
- `FOUNDER-REVIEW` - technical copy to check for voice/accuracy (home page).
- `CONTENT PENDING` - any legal/blog file not yet supplied.

## SEO layer (already wired)

Hierarchical Metadata API · per-page unique title/description · self-referencing
canonicals · `app/sitemap.ts` · `app/robots.ts` · `app/manifest.ts` · default +
per-post dynamic OG images (`next/og`) · JSON-LD: Organization/ProfessionalService,
Service, Article, BreadcrumbList, FAQPage.

## Architecture & design

- **Design language: dark-editorial.** Warm near-black + a single honey-gold
  accent; **Fraunces** neo-serif headings paired with **Hanken Grotesk** body and
  **JetBrains Mono** figures; film-grain overlay; "Fig. 0x -" spec labels; custom
  line-icon set + monogram (`components/icons.tsx`). Tokens live in
  `app/globals.css` (Tailwind v4 `@theme`).
- **Motion:** Lenis inertial smooth-scroll (`components/SmoothScroll.tsx`),
  line-mask headline reveals (`RevealText`), fade/rise/blur reveals (`Reveal`),
  magnetic CTAs (`Magnetic`), scroll-parallax ambient. **All
  `prefers-reduced-motion`-aware** (Lenis + magnetic disable entirely; reveals
  go instant).
- **Server Components by default.** Client islands: `SmoothScroll`, `Magnetic`,
  `Reveal`, `RevealText`, `HeroCostAnimation`, `AmbientBackground`, `MobileMenu`,
  `ContactForm`.
