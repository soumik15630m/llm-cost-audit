import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import Reveal from "@/components/motion/Reveal";
import RevealText from "@/components/motion/RevealText";
import Magnetic from "@/components/Magnetic";
import JsonLd from "@/components/JsonLd";
import { ArrowRight, ArrowUpRight, IconLock } from "@/components/icons";
import { personSchema, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About - the engineering behind LLM Cost Audit",
  description:
    "LLM Cost Audit is the inference-cost division of House of STK - an engineering-led practice that treats your LLM bill as an optimization problem, not a fixed cost.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Unit cost, not the bill",
    body: "We measure cost per 1,000 calls (or per conversation, or per user) on a fixed sample, before and after - the only number that separates real efficiency from usage growth, and the only one we bill savings on.",
  },
  {
    title: "No quality trade-offs",
    body: "Caching, model tiering, and batching change the price, not the output. The responses your users see are identical; you simply stop overpaying for them.",
  },
  {
    title: "Confidential by default",
    body: "A mutual NDA is signed before any data is shared. Your identity, usage, and numbers stay private, and the client list is never disclosed - to anyone.",
  },
  {
    title: "Priced on results",
    body: "A fixed $750 assessment that stands on its own, and optional implementation owed only when verified savings actually land against your invoices.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          personSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      {/* Hero */}
      <Section className="pb-8">
        <Reveal>
          <p className="eyebrow">Fig. - About</p>
        </Reveal>
        <RevealText
          as="h1"
          delay={0.08}
          className="mt-5 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-medium leading-[1.06] tracking-[-0.02em] text-headline sm:text-5xl lg:text-[3.4rem]"
          lines={[
            "The inference-cost division",
            <>
              of{" "}
              <span className="italic text-accent">House of STK</span>.
            </>,
          ]}
        />
        <Reveal delay={0.3}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-body/90">
            House of STK is an independent engineering practice. LLM Cost Audit is
            its inference-cost division - built on one plain observation: an LLM
            bill is an engineering problem, not a fixed cost. It runs into real
            money, and someone has to sit down and fix it.
          </p>
        </Reveal>
      </Section>

      {/* Backstory */}
      <Section className="border-y border-[var(--hairline)] bg-ink-2 py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Why this division exists</p>
            <h2 className="mt-5 text-3xl font-medium tracking-tight sm:text-[2.4rem] sm:leading-[1.1]">
              The bill is made in the code, not the model rate.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-lg leading-relaxed text-body/90">
              <p>
                The model price is the part everyone looks at and the part that
                matters least. The money is made elsewhere - in the prefix you
                re-send on every call, the frontier model running work a cheaper
                tier handles identically, the async jobs paying real-time rates,
                the context that grows unbounded.
              </p>
              <p>
                That&apos;s the same class of inefficiency a systems engineer
                hunts in a hot loop - only here it&apos;s sitting in plain sight
                on a monthly invoice. We started this division to point that
                discipline at token spend:{" "}
                <span className="text-headline">
                  find where unit cost leaks, fix it without touching output, and
                  prove the result against your own invoices.
                </span>
              </p>
              <p className="text-muted">
                Every engagement is run hands-on. No junior hand-off, no generic
                script - the analysis is done by the engineer whose name is on it.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Principles */}
      <Section>
        <Reveal>
          <p className="eyebrow">How we work</p>
          <h2 className="mt-5 max-w-2xl text-3xl font-medium tracking-tight sm:text-[2.4rem]">
            Four principles the practice runs on
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <div className="flex h-full flex-col bg-ink-elevated p-6 sm:p-8">
                <span className="tabular text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl font-medium text-headline">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-body/80">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Who's in charge */}
      <Section className="border-t border-[var(--hairline)]">
        <Reveal>
          <p className="eyebrow">Who runs the audits</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="card mt-6 flex flex-col gap-7 p-7 sm:flex-row sm:items-center sm:p-9">
            {/* Initials avatar */}
            <div
              aria-hidden
              className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-[rgba(227,181,102,0.4)] bg-[radial-gradient(60%_60%_at_50%_40%,rgba(227,181,102,0.18),transparent)]"
            >
              <span className="font-[family-name:var(--font-display)] text-3xl font-medium text-accent">
                SG
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-medium text-headline">
                {site.lead.name}
              </h2>
              <p className="mt-1 text-sm uppercase tracking-[0.14em] text-muted">
                {site.lead.role}
              </p>
              <blockquote className="mt-4 max-w-xl border-l-2 border-accent pl-5 text-[1.02rem] leading-relaxed text-body/90">
                &ldquo;We run every audit hands-on, end to end - systems and
                performance engineering, pointed at inference cost. LLM bills get
                expensive in a handful of predictable ways, and most teams are too
                busy shipping to chase them down. That&apos;s what we handle: find
                where the spend leaks, fix it without changing what your users
                see, and prove the savings against your own invoices.&rdquo;
              </blockquote>
              <Magnetic strength={8}>
                <a
                  href={site.lead.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost mt-6 text-sm"
                >
                  Connect on LinkedIn
                  <ArrowUpRight size={16} />
                </a>
              </Magnetic>
            </div>
          </div>
        </Reveal>

        {/* Confidentiality reassurance */}
        <Reveal delay={0.1}>
          <div className="mt-6 flex items-start gap-4 rounded-xl border border-[var(--hairline)] bg-ink-2 p-6">
            <span className="mt-0.5 shrink-0 text-accent">
              <IconLock size={22} />
            </span>
            <p className="text-[0.95rem] leading-relaxed text-body/85">
              Naming the person in charge cuts both ways: you know exactly who
              handles your data - and that same person is bound by the mutual NDA
              that keeps your identity, usage, and numbers private. Discretion
              isn&apos;t a policy here; it&apos;s the product.{" "}
              <Link href="/nda" className="link-a">
                Read the mutual NDA
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section className="pt-0">
        <Reveal>
          <div className="card relative overflow-hidden p-10 text-center sm:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-70"
            />
            <h2 className="mx-auto max-w-2xl text-3xl font-medium tracking-tight sm:text-[2.4rem]">
              Find out where your number actually sits.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
              A $750 assessment turns your usage export into a line-by-line
              findings report - run by the engineer above, confidential under NDA.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Magnetic>
                <Link href="/contact" className="btn-primary">
                  Book an assessment
                  <ArrowRight size={18} />
                </Link>
              </Magnetic>
              <Link href="/blog" className="btn-ghost">
                Read the writing
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
