"use client";

import { useState } from "react";
import { Check } from "@/components/icons";
import { site } from "@/lib/site";

/**
 * Minimal first-contact form — name, work email, company, monthly spend range.
 *
 * HARD RULE: this form NEVER collects billing or usage data. A billing-data web
 * form on first contact is a trust red flag to this audience. Usage exports are
 * shared later, after a mutual NDA, out-of-band.
 *
 * Uses React state + an onClick handler (not a raw <form> submit) so submission
 * stays a controlled client interaction. INP-safe: state updates are trivial.
 */
const SPEND_RANGES = [
  "Under $2k / mo",
  "$2k – $10k / mo",
  "$10k – $50k / mo",
  "$50k – $200k / mo",
  "$200k+ / mo",
  "Not sure yet",
] as const;

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [spend, setSpend] = useState("");
  const [website, setWebsite] = useState(""); // honeypot (hidden)
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const formValid =
    name.trim() !== "" && emailValid && company.trim() !== "" && spend !== "" && consent;

  async function handleSubmit() {
    setTouched(true);
    if (!formValid || status === "submitting") return;
    setStatus("submitting");

    try {
      // Delivered by the bundled Edge route at app/api/contact/route.ts.
      // No usage/billing data is ever sent — only these four fields.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, spend, consent, company_website: website }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card p-8 text-center" role="status" aria-live="polite">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(227,181,102,0.4)] text-accent">
          <Check size={22} />
        </div>
        <h2 className="mt-5 text-xl font-semibold text-headline">
          Thanks — message received.
        </h2>
        <p className="mt-3 text-body/85">
          {/* FOUNDER-FILL: confirm the real follow-up flow / SLA wording. */}
          Check your inbox — we&apos;ve emailed you the next steps and a link to
          our Slack for follow-ups. No usage data is needed yet.
        </p>
      </div>
    );
  }

  const showError = (invalid: boolean) => touched && invalid;
  const baseInput =
    "w-full rounded-lg border bg-[#100d0a] px-4 py-3 text-body placeholder:text-muted/70 transition-colors focus:outline-none";
  // Gold border + focus on invalid fields once the user has tried to submit.
  const fieldClass = (invalid: boolean) =>
    `${baseInput} ${
      showError(invalid)
        ? "border-accent focus:border-accent"
        : "border-[var(--hairline-strong)] focus:border-[rgba(227,181,102,0.6)]"
    }`;
  const errorText = "mt-1.5 text-xs text-accent";

  return (
    <div className="card p-6 sm:p-8">
      <div className="grid gap-5">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm text-body">
            Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass(name.trim() === "")}
            placeholder="Jane Doe"
            aria-invalid={showError(name.trim() === "")}
          />
          {showError(name.trim() === "") && <p className={errorText}>Enter your name.</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-body">
            Work email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass(!emailValid)}
            placeholder="jane@company.com"
            aria-invalid={showError(!emailValid)}
          />
          {showError(!emailValid) && (
            <p className={errorText}>
              {email.trim() === "" ? "Enter your work email." : "Enter a valid work email."}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="mb-2 block text-sm text-body">
            Company
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={fieldClass(company.trim() === "")}
            placeholder="Acme AI"
            aria-invalid={showError(company.trim() === "")}
          />
          {showError(company.trim() === "") && (
            <p className={errorText}>Enter your company name.</p>
          )}
        </div>

        <div>
          <label htmlFor="spend" className="mb-2 block text-sm text-body">
            Approximate monthly LLM spend
          </label>
          <select
            id="spend"
            value={spend}
            onChange={(e) => setSpend(e.target.value)}
            className={`${fieldClass(spend === "")} ${spend === "" ? "text-muted/70" : ""}`}
            aria-invalid={showError(spend === "")}
          >
            <option value="" disabled>
              Select a range…
            </option>
            {SPEND_RANGES.map((range) => (
              <option key={range} value={range} className="text-body">
                {range}
              </option>
            ))}
          </select>
          {showError(spend === "") && (
            <p className={errorText}>Select your approximate monthly spend.</p>
          )}
        </div>

        {/* Honeypot — hidden from users; bots that fill it are silently dropped. */}
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="hidden"
        />

        {/* Required consent. Links open in a new tab so reading is optional —
            ticking is all that's needed to proceed. */}
        <label htmlFor="consent" className="flex cursor-pointer items-start gap-3 text-sm text-muted">
          <input
            id="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            aria-invalid={touched && !consent}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[var(--color-accent)]"
          />
          <span>
            I agree to the{" "}
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="link-a"
              onClick={(e) => e.stopPropagation()}
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="link-a"
              onClick={(e) => e.stopPropagation()}
            >
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {touched && !consent && (
          <p className="-mt-2 text-xs text-accent">
            Please accept the Terms and Privacy Policy to continue.
          </p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={status === "submitting"}
          className="btn-primary mt-1 w-full disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? "Sending…" : "Request an assessment"}
        </button>

        {touched && !formValid && status !== "submitting" && (
          <p className="text-center text-xs text-accent" role="alert">
            Please complete all fields above before requesting an assessment.
          </p>
        )}

        {status === "error" && (
          <p className="text-sm text-accent" role="alert">
            Something went wrong sending that. Please email{" "}
            <a href={`mailto:${site.contactEmail}`} className="underline">
              {site.contactEmail}
            </a>{" "}
            directly instead.
          </p>
        )}

        <p className="text-xs leading-relaxed text-muted">
          We only ask for these four fields. No billing credentials, prompts, or
          usage data — those are shared later, after a mutual NDA, never through
          a web form.
        </p>
      </div>
    </div>
  );
}
