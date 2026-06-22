import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import Reveal from "@/components/motion/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book an assessment",
  description:
    "Start a confidential conversation about a $750 LLM cost assessment. Four fields, no billing data — usage exports are shared later, only after a mutual NDA.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Book an assessment
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted">
            Tell us where you are and we&apos;ll take it from there — starting
            with a mutual NDA, before any data changes hands.
          </p>

          <ul className="mt-9 space-y-5">
            {[
              {
                t: "1. This form",
                d: "Four fields so we can size the conversation. Nothing sensitive.",
              },
              {
                t: "2. Mutual NDA",
                d: "Signed before you share anything. Your identity and numbers stay private.",
              },
              {
                t: "3. Usage export",
                d: "You send an export from your provider dashboard — out-of-band, never through this form.",
              },
              {
                t: "4. Findings report",
                d: "A $750 assessment delivering the line-by-line dollar math.",
              },
            ].map((step) => (
              <li key={step.t} className="flex gap-4">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden
                />
                <div>
                  <p className="font-medium text-headline">{step.t}</p>
                  <p className="text-sm text-muted">{step.d}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-9 text-sm text-muted">
            Prefer email? Reach out directly at{" "}
            {/* FOUNDER-FILL: real inbox in lib/site.ts */}
            <a
              href={`mailto:${site.contactEmail}`}
              className="link-a"
            >
              {site.contactEmail}
            </a>
            . You can read the{" "}
            <Link href="/nda" className="link-a">
              mutual NDA
            </Link>{" "}
            first.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
