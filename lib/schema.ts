/**
 * JSON-LD structured data builders (server-rendered, schema.org).
 *
 * These are emitted in the initial server HTML via the <JsonLd> component so
 * classic search engines AND AI answer engines (ChatGPT Search, Perplexity,
 * Gemini) can parse the offering without executing JS.
 */
import { site, absoluteUrl } from "./site";

const ORG_ID = `${site.url}/#organization`;
const SERVICE_ID = `${site.url}/#service`;
const WEBSITE_ID = `${site.url}/#website`;
const LEAD_ID = `${site.url}/#lead`;

/** The engineer in charge - Person entity with LinkedIn sameAs (E-E-A-T). */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": LEAD_ID,
    name: site.lead.name,
    jobTitle: site.lead.role,
    url: absoluteUrl("/about"),
    sameAs: [site.lead.linkedin],
    worksFor: { "@id": ORG_ID },
  };
}

/** Organization + ProfessionalService - emitted sitewide in the root layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: site.name,
    url: site.url,
    description: site.shortDescription,
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl("/opengraph-image"),
    email: site.contactEmail,
    areaServed: "Worldwide",
    serviceType: "LLM / inference cost optimization audit",
    // LLM Cost Audit is a wing of the House of STK studio.
    parentOrganization: {
      "@type": "Organization",
      name: site.studio.name,
      url: site.studio.url,
    },
    founder: { "@type": "Person", "@id": LEAD_ID, name: site.lead.name },
    knowsAbout: [
      "LLM cost optimization",
      "Inference cost",
      "Prompt caching",
      "Model tiering",
      "Batch API",
      "OpenAI API pricing",
      "Anthropic API pricing",
      "FinOps for AI",
    ],
  };
}

/** Service - the audit offering, with the transparent $750 price. */
export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": SERVICE_ID,
    name: "LLM Inference Cost Audit",
    serviceType: "Cost optimization assessment",
    provider: { "@id": ORG_ID },
    areaServed: "Worldwide",
    description:
      "A fixed-price assessment of your OpenAI / Anthropic usage that identifies where inference spend leaks - uncached context, over-powered models, missing Batch API, unmanaged context growth - with the dollar math, line by line.",
    offers: {
      "@type": "Offer",
      price: String(site.assessmentPriceUSD),
      priceCurrency: "USD",
      description:
        "Non-refundable assessment delivering a written findings report. Implementation is priced separately (flat fee or a share of verified per-unit savings).",
    },
  };
}

/** WebSite - emitted sitewide; reinforces the site as an entity for AI search. */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    url: site.url,
    publisher: { "@id": ORG_ID },
    inLanguage: site.lang,
  };
}

/** Article - emitted on each blog post. */
export function articleSchema(post: {
  title: string;
  description: string;
  slug: string;
  date: string;
}) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    image: absoluteUrl(`/blog/${post.slug}/opengraph-image`),
    author: { "@type": "Organization", "@id": ORG_ID, name: site.name },
    publisher: { "@id": ORG_ID },
  };
}

/** BreadcrumbList - emitted on deep pages (blog posts). */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** FAQPage - emitted on /pricing. High leverage for AI answer-engine citations. */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
