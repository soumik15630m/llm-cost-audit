import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import Reveal from "@/components/motion/Reveal";
import JsonLd from "@/components/JsonLd";
import Magnetic from "@/components/Magnetic";
import { Check, Plus, ArrowRight } from "@/components/icons";
import { faqSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing — $750 assessment, savings-based implementation",
  description:
    "A transparent $750 inference cost assessment, plus optional implementation priced as a flat fee or a share of verified per-unit savings — measured against your own invoices.",
  alternates: { canonical: "/pricing" },
};

// FAQ — rendered on-page AND emitted as FAQPage JSON-LD for AI answer engines.
// Questions are phrased the way buyers actually ask them (AEO/GEO).
const faqs = [
  {
    question: "What exactly is included in the $750 assessment?",
    answer:
      "A structured analysis of a usage export from your OpenAI / Anthropic account, delivered as a written findings report. It identifies where spend leaks — uncached repeated context, over-powered models on low-complexity calls, async work not using the Batch API, and unmanaged context growth — and shows current-vs-optimized cost on each line, ranked by recoverable dollars. The report is yours to keep and act on, with or without implementation.",
  },
  {
    question: "What data do you need — do I upload my prompts or billing?",
    answer:
      "No. You send a usage export from your provider dashboard after a mutual NDA is in place. You never upload prompts, customer data, or billing credentials through a web form. The assessment works from aggregate usage data — token counts, model mix, call patterns — not the content of your requests.",
  },
  {
    question: "Is the $750 refundable?",
    answer:
      "No. The assessment is a fixed, non-refundable $750. It produces a real deliverable — a findings report with the dollar math — regardless of whether you choose to implement anything afterward.",
  },
  {
    question: "How is implementation priced?",
    answer:
      "Implementation is separate and optional. It is either a flat fee or a share of verified savings, whichever applies to the engagement. If the agreed savings aren't achieved, the savings-based fee isn't owed.",
  },
  {
    question: "How exactly do you measure savings?",
    answer:
      "Savings are measured as unit cost — cost per 1,000 calls, or per conversation, or per user — on a fixed, agreed sample of your traffic, compared before and after. We deliberately measure unit cost, not your total monthly bill, because your usage grows over time and a growing total would hide the per-unit improvement. Unit cost is verifiable against your own invoices, so payment can be made when your next bill confirms the result.",
  },
  {
    question: "Why measure unit cost instead of the total monthly bill?",
    answer:
      "Because total spend grows with usage. If we billed on the total, a successful optimization could be masked by your product growing — or worse, we could appear to 'save' money in a slow month we had nothing to do with. Cost per unit isolates efficiency from growth: it's the only number that proves the optimization itself worked.",
  },
  {
    question: "How long does the assessment take?",
    answer:
      "Typically a few business days from receiving a complete usage export, depending on the size and complexity of your workload. You'll get a clear turnaround estimate when you book.",
  },
  {
    question: "Is my usage kept confidential?",
    answer:
      "Yes — confidentiality is the default, not an upsell. A mutual NDA is signed before any data is shared. Your identity, usage, and numbers stay private, and the client list is never disclosed to anyone.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />

      {/* Hero */}
      <Section className="pb-10">
        <Reveal>
          <p className="eyebrow">Pricing</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            One fixed price to find the money. Implementation priced on results.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            No retainers, no checkout, no surprise scope. A flat assessment fee,
            and — if you want the fixes made — a model that ties our pay to
            savings you can verify yourself.
          </p>
        </Reveal>
      </Section>

      {/* Two pricing cards */}
      <Section className="py-0">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="card flex h-full flex-col p-8">
              <p className="eyebrow">Step one</p>
              <h2 className="mt-3 text-2xl font-semibold text-headline">
                The assessment
              </h2>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="tabular text-5xl font-semibold text-accent">
                  ${site.assessmentPriceUSD}
                </span>
                <span className="text-muted">one-time · non-refundable</span>
              </div>
              <ul className="mt-7 space-y-3 text-body/90">
                {[
                  "Mutual NDA before any data is shared",
                  "Analysis of your usage export — not your prompts or billing",
                  "Written findings report, ranked by recoverable dollars",
                  "Current-vs-optimized math on every line",
                  "Yours to keep and implement, with or without us",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-0.5 shrink-0 text-accent">
                      <Check size={18} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-primary mt-8 w-full">
                Book an assessment
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card flex h-full flex-col p-8">
              <p className="eyebrow">Step two — optional</p>
              <h2 className="mt-3 text-2xl font-semibold text-headline">
                Implementation
              </h2>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-3xl font-semibold text-headline">
                  Flat fee
                </span>
                <span className="text-muted">or share of verified savings</span>
              </div>
              <ul className="mt-7 space-y-3 text-body/90">
                {[
                  "We make the changes the report identifies",
                  "Priced as a flat fee or a share of verified savings",
                  "Results guarantee: no agreed savings, no savings-based fee",
                  "Savings measured as unit cost on a fixed traffic sample",
                  "Pay when your next bill confirms the result",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-0.5 shrink-0 text-accent">
                      <Check size={18} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-ghost mt-8 w-full">
                Start a conversation
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* The per-unit savings definition (repeated, prominent) */}
      <Section>
        <Reveal>
          <div className="card border-[rgba(227,181,102,0.3)] p-8 sm:p-10">
            <p className="eyebrow">The honest part</p>
            <h2 className="mt-3 max-w-3xl text-2xl font-semibold sm:text-3xl">
              We bill on unit cost, not your total bill.
            </h2>
            <div className="mt-6 grid gap-8 text-lg leading-relaxed text-body/90 md:grid-cols-2">
              <p>
                Savings are measured as{" "}
                <span className="text-accent">unit cost</span> — cost per 1,000
                calls (or per conversation, or per user) — on a{" "}
                <span className="text-headline">
                  fixed, agreed sample of your traffic
                </span>
                , compared before and after.
              </p>
              <p>
                We measure unit cost,{" "}
                <span className="text-headline">not your total monthly bill</span>
                , because your usage grows over time. This keeps the number we
                bill on honest and verifiable against your own invoices.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-[var(--hairline)]">
        <Reveal>
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Questions buyers ask
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 0.04}>
              {/* Native <details> = accessible, zero JS, content in server HTML */}
              <details className="card group p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="text-lg font-medium text-headline">
                    {faq.question}
                  </h3>
                  <span className="shrink-0 text-accent transition-transform duration-300 group-open:rotate-45">
                    <Plus size={18} />
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-body/85">{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-lg text-muted">
              Still deciding? See what the deliverable looks like first.
            </p>
            <div className="flex gap-3">
              <Link href="/resources" className="btn-ghost">
                View a sample audit
              </Link>
              <Magnetic>
                <Link href="/contact" className="btn-primary">
                  Book an assessment
                  <ArrowRight size={18} />
                </Link>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
