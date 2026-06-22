/**
 * Central site configuration.
 *
 * Every canonical URL, sitemap entry, OG image URL, and JSON-LD `@id` is derived
 * from `url` — set it once here and the whole SEO layer follows.
 */
export const site = {
  // Service brand (what we do — also the SEO-valuable term).
  name: "LLM Cost Audit",
  wordmark: "LLM Cost Audit",
  // Studio/practice behind the service — and the name on the domain.
  studio: {
    name: "House of STK",
    // One-liner used to justify the houseofstk.com domain in marketing copy.
    line: "the independent engineering practice behind it",
    // Apex domain (the studio); the audit site lives on the llm. subdomain.
    url: "https://houseofstk.com",
  },
  // Production domain (no trailing slash). The audit site lives on a subdomain
  // so it reads as a wing of House of STK; the root domain stays the studio's.
  url: "https://llm.houseofstk.com",
  // Used in <title> templates and OG.
  shortDescription:
    "Independent LLM inference cost audits. Find the 40–70% of your OpenAI / Anthropic bill that leaks — and recover it.",
  // The email first-contact replies and legal requests route to.
  contactEmail: "hello@houseofstk.com",
  // The single audit price, surfaced in copy and Service JSON-LD.
  assessmentPriceUSD: 750,
  // Used as og:locale and html lang.
  locale: "en_US",
  lang: "en",
} as const;

/** Absolute URL helper — always produces a canonical, production-domain URL. */
export function absoluteUrl(path = ""): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${clean === "/" ? "" : clean}`;
}
