import Link from "next/link";
import Wordmark from "./Wordmark";
import { site } from "@/lib/site";

const footerNav = {
  Practice: [
    { href: "/pricing", label: "Pricing" },
    { href: "/resources", label: "Sample audit" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Book an assessment" },
  ],
  Writing: [
    { href: "/blog", label: "All articles" },
    { href: "/blog/anatomy-of-an-llm-bill", label: "Anatomy of an LLM bill" },
    { href: "/blog/prompt-caching-cost-lever", label: "Prompt caching" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/nda", label: "Mutual NDA" },
  ],
};

/** Sitewide footer (Server Component): nav, legal, founding-cohort note. */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-[var(--hairline)]">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Wordmark />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Independent LLM inference cost audits. We find the 40–70% of your
            OpenAI / Anthropic bill that leaks — and the dollar math to recover it.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            A practice of{" "}
            <span className="font-[family-name:var(--font-display)] text-body">
              {site.studio.name}
            </span>{" "}
            — {site.studio.line}.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] px-3 py-1 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            Now booking assessments
          </p>
        </div>

        {Object.entries(footerNav).map(([heading, links]) => (
          <nav key={heading} aria-label={heading}>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
              {heading}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-body/80 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-[var(--hairline)]">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.studio.name} · {site.name}. Figures cited across this
            site are illustrative and based on public 2026 API pricing.
          </p>
          <p>Confidential by default. NDA before any data is shared.</p>
        </div>
      </div>
    </footer>
  );
}
