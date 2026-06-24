import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import Reveal from "@/components/motion/Reveal";
import RevealText from "@/components/motion/RevealText";
import Magnetic from "@/components/Magnetic";
import IsoStackIdle from "@/components/home/IsoStackIdle";
import CostTeardown from "@/components/home/CostTeardown";
import AmbientBackground from "@/components/home/AmbientBackground";
import { ArrowRight, ArrowUpRight, IconLock } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cut your LLM bill 40-70% | Independent inference cost audit",
  description:
    "Your OpenAI / Anthropic bill is likely 40-70% larger than it needs to be. A $750 assessment finds exactly where inference spend leaks - with the dollar math, line by line.",
  alternates: { canonical: "/" },
};

// §5.3 - the method.
const steps = [
  {
    n: "1",
    title: "Send a usage export",
    body: "After a mutual NDA, you send a usage export from your provider dashboard - not your data, not your prompts. The $750 assessment begins.",
  },
  {
    n: "2",
    title: "Get a findings report",
    body: "A written report shows exactly where spend leaks, ranked by recoverable dollars, with current-vs-optimized math on each line. It's yours whether or not we go further.",
  },
  {
    n: "3",
    title: "Optional implementation",
    body: "If you want the changes made, implementation is priced on results - a flat fee or a share of verified per-unit savings, whichever applies.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─────────────────────────── 5.1 HERO ─────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[var(--hairline)]">
        <AmbientBackground />
        <div className="container-page relative z-10 grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.08fr_0.92fr] lg:py-32">
          <div>
            <Reveal>
              <p className="eyebrow">Fig. 00 - Inference cost audits</p>
            </Reveal>

            <RevealText
              as="h1"
              delay={0.1}
              className="mt-6 font-[family-name:var(--font-display)] text-[2.7rem] font-medium leading-[1.04] tracking-[-0.02em] text-headline sm:text-6xl lg:text-[4.1rem]"
              lines={[
                "Your LLM bill is",
                <span key="a" className="italic text-accent">
                  40-70% larger
                </span>,
                "than it needs to be.",
              ]}
            />

            <Reveal delay={0.35}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-body/90">
                An independent audit of your OpenAI / Anthropic usage that finds
                exactly where the money leaks - uncached prompts, over-powered
                models, missing batch jobs, bloated context - and hands you the
                dollar math to recover it.
              </p>
            </Reveal>

            <Reveal delay={0.45}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Magnetic>
                  <Link href="/contact" className="btn-primary">
                    Book an assessment
                    <ArrowRight size={18} />
                  </Link>
                </Magnetic>
                <Link href="/resources" className="btn-ghost group">
                  See a sample audit
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.55}>
              <p className="mt-7 text-sm text-muted">
                <span className="tabular text-body">
                  ${site.assessmentPriceUSD}
                </span>{" "}
                fixed assessment · findings report · confidential under NDA
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <IsoStackIdle />
          </Reveal>
        </div>
      </section>

      {/* ───── 5.2 THE COST OF NOT AUDITING - scroll-teardown centerpiece ───── */}
      {/* Replaces the boxy leak-card grid: a pinned, scroll-scrubbed isometric
          stack that lifts each leak off the bill. Mobile + reduced-motion fall
          back to a de-boxed editorial list (see CostTeardown). */}
      <CostTeardown />

      {/* ─────────────────── 5.3 HOW I MITIGATE IT ─────────────────── */}
      <Section className="border-y border-[var(--hairline)] bg-ink-2">
        <Reveal>
          <p className="eyebrow">Fig. 02 - The method</p>
          <h2 className="mt-5 max-w-2xl text-3xl font-medium tracking-tight sm:text-[2.6rem]">
            How the audit works
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            One fixed-price pass over your real usage, turned into a report you
            can act on - or hand to your own engineers.
          </p>
        </Reveal>

        {/* Connected timeline (no boxes): a gold spine threads the steps. */}
        <div className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-10">
          <div
            aria-hidden
            className="absolute left-5 top-5 hidden h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-[rgba(227,181,102,0.45)] to-transparent md:left-0 md:right-0 md:top-5 md:h-px md:w-auto md:bg-gradient-to-r"
          />
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.1}>
              <div className="relative pl-16 md:pl-0">
                <span className="absolute left-0 top-0 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(227,181,102,0.45)] bg-ink-2 font-[family-name:var(--font-display)] text-lg text-accent md:relative">
                  {step.n}
                </span>
                <h3 className="text-lg font-medium text-headline md:mt-5">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-body/80">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Founder credibility as proof of skill */}
        <Reveal delay={0.1}>
          <div className="card mt-8 flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow">The practice</p>
              <p className="mt-3 max-w-2xl text-lg text-body">
                An engineering-led practice from a low-level performance
                background - the same discipline used to squeeze compilers and
                systems, pointed at token spend.{" "}
                <span className="text-muted">
                  Every audit is hands-on, fixed-price, and verified against your
                  own invoices.
                </span>
              </p>
            </div>
            <ul className="flex shrink-0 flex-wrap gap-2 sm:max-w-[15rem] sm:justify-end">
              {["Compiler-grade rigor", "Provider-agnostic", "NDA-first", "Fixed price"].map(
                (chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-[var(--hairline)] px-3 py-1 text-xs text-muted"
                  >
                    {chip}
                  </li>
                )
              )}
            </ul>
          </div>
        </Reveal>
      </Section>

      {/* ─────────────── 5.4 THE CONFIDENTIALITY MOAT ─────────────── */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--hairline-strong)] text-accent">
              <IconLock size={22} />
            </span>
            <p className="eyebrow mt-6">Fig. 03 - Confidentiality</p>
            <h2 className="mt-5 text-3xl font-medium tracking-tight sm:text-[2.6rem] sm:leading-[1.08]">
              Discretion isn&apos;t a policy here. It&apos;s the product.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-lg leading-relaxed text-body/90">
              <p>
                A mutual NDA is signed before any data is shared. Your identity,
                your usage, and your numbers stay private. The client list is
                never disclosed - not on this site, not to other prospects, not
                in conversation.
              </p>
              <blockquote className="border-l-2 border-accent pl-5 font-[family-name:var(--font-display)] text-2xl italic leading-snug text-headline">
                &ldquo;Your competitor might be a client - and you&apos;d never
                know. That&apos;s exactly the protection you get.&rdquo;
              </blockquote>
              <p className="text-muted">
                It&apos;s also the honest answer to &ldquo;who are your
                clients?&rdquo; The same wall that keeps their names private keeps
                yours private too. You can read the{" "}
                <Link href="/nda" className="link-a">
                  mutual NDA
                </Link>{" "}
                before you send a single byte.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ──────── 5.5 IMPLEMENTATION & SAVINGS-BASED GUARANTEE ──────── */}
      <Section className="border-y border-[var(--hairline)] bg-ink-2">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="eyebrow">Fig. 04 - Implementation &amp; guarantee</p>
            <h2 className="mt-5 text-3xl font-medium tracking-tight sm:text-[2.6rem] sm:leading-[1.08]">
              Priced on results you can verify against your own invoices.
            </h2>
            <p className="mt-5 text-lg text-muted">
              The assessment stands alone. If you want the fixes made,
              implementation is a flat fee or a share of verified savings -
              whichever applies. If the agreed savings aren&apos;t achieved, the
              savings-based fee isn&apos;t owed.
            </p>
            <Link href="/pricing" className="btn-ghost mt-8 text-sm">
              See full pricing <ArrowRight size={16} />
            </Link>
          </Reveal>

          {/* CRITICAL on-page copy: the per-unit savings definition */}
          <Reveal delay={0.1}>
            <div className="card p-7 sm:p-8">
              <h3 className="text-xl font-medium text-headline">
                How &ldquo;savings&rdquo; is defined
              </h3>
              <p className="mt-5 leading-relaxed text-body/90">
                Savings are measured as{" "}
                <span className="text-accent">unit cost</span> - cost per 1,000
                calls (or per conversation, or per user) - on a{" "}
                <span className="text-headline">
                  fixed, agreed sample of your traffic
                </span>
                , compared before and after.
              </p>
              <p className="mt-4 leading-relaxed text-body/90">
                We measure unit cost,{" "}
                <span className="text-headline">
                  not your total monthly bill
                </span>
                , because your usage grows over time. This keeps the number we
                bill on honest and verifiable against your own invoices.
              </p>
              <div className="mt-6 rounded-lg border border-[var(--hairline)] bg-[rgba(240,231,214,0.02)] p-4 text-sm text-muted">
                Payment can be made when your next bill confirms the savings.
                You&apos;re never asked to take the result on faith.
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ───────────────── 5.6 FOUNDING-COHORT CTA ───────────────── */}
      <Section>
        <Reveal>
          <div className="card relative overflow-hidden p-10 text-center sm:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-70"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full"
              style={{ background: "radial-gradient(closest-side, rgba(227,181,102,0.1), transparent)" }}
            />
            <p className="relative inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] px-3 py-1 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Now booking assessments
            </p>
            <h2 className="relative mx-auto mt-6 max-w-2xl text-3xl font-medium tracking-tight sm:text-[2.8rem] sm:leading-[1.06]">
              Put a real number on it.
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-lg text-muted">
              No fabricated logos, no manufactured case studies - just hands-on
              engagements at a fixed price. Send a usage export and find out where
              your number actually sits.
            </p>
            <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Magnetic>
                <Link href="/contact" className="btn-primary">
                  Book an assessment
                  <ArrowRight size={18} />
                </Link>
              </Magnetic>
              <Link href="/blog" className="btn-ghost">
                Read the method first
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
