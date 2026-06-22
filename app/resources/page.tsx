import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/Magnetic";
import { ArrowUpRight, Download, ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Sample audit — see what your findings report looks like",
  description:
    "Download an illustrative LLM cost audit: a Series-A support workload taken from ~$11k to ~$4.2k/mo, with the leak breakdown, before/after math, and the fix — clearly labeled a sample.",
  alternates: { canonical: "/resources" },
};

// Illustrative leak lines mirrored from the downloadable report.
const lines = [
  { label: "Uncached repeated prefix", before: "$6,400", after: "$1,400" },
  { label: "Frontier model on simple calls", before: "$2,400", after: "$1,100" },
  { label: "Async jobs, no Batch API", before: "$1,200", after: "$700" },
  { label: "Context & output hygiene", before: "$1,000", after: "$1,000" },
];

export default function ResourcesPage() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        {/* Copy + download */}
        <Reveal>
          <p className="eyebrow">Resources</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            See exactly what your audit will look like.
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted">
            A complete, illustrative findings report — the same structure you
            receive after a $750 assessment, on a fictional but realistic
            profile. Read it before you ever send a usage export.
          </p>

          <div className="mt-8 rounded-xl border border-[rgba(227,181,102,0.3)] bg-[rgba(227,181,102,0.05)] p-5">
            <p className="text-sm leading-relaxed text-body">
              <span className="font-semibold text-accent">
                Sample report —
              </span>{" "}
              illustrative figures only. Contains no real company or client data.
              The design is the real deliverable; the numbers are made up to show
              the method.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {/* Static file in /public — opens the print-ready report; "Save as
                PDF" from the browser produces the downloadable PDF. */}
            <Magnetic>
              <a
                href="/sample-llm-cost-audit.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Open the sample report
                <ArrowUpRight size={17} />
              </a>
            </Magnetic>
            <a href="/sample-llm-cost-audit.html" download className="btn-ghost">
              <Download size={16} /> Download
            </a>
          </div>
          <p className="mt-3 text-xs text-muted">
            Opens in a new tab, print-optimized. Use your browser&apos;s Print →
            Save&nbsp;as&nbsp;PDF for a PDF copy.
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-4">
            {[
              { k: "Baseline", v: "$11k/mo" },
              { k: "Optimized", v: "$4.2k/mo" },
              { k: "Unit cost", v: "−62%" },
            ].map((s) => (
              <div key={s.k} className="card p-4">
                <dt className="text-xs text-muted">{s.k}</dt>
                <dd className="tabular mt-1 text-xl font-semibold text-headline">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Preview thumbnail (a faithful, on-brand excerpt) */}
        <Reveal delay={0.1}>
          <div className="card overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-[var(--hairline)] px-5 py-3">
              <span className="text-xs text-muted">Preview · page 1</span>
              <span className="rounded-full border border-[rgba(227,181,102,0.35)] bg-[rgba(227,181,102,0.08)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                Sample
              </span>
            </div>

            <div className="p-6">
              <p className="eyebrow">Inference cost assessment</p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-[var(--hairline)] p-3">
                  <div className="tabular text-lg font-semibold text-headline">
                    $11,000
                  </div>
                  <div className="text-[11px] text-muted">Current / mo</div>
                </div>
                <div className="rounded-lg border border-[rgba(227,181,102,0.4)] p-3">
                  <div className="tabular text-lg font-semibold text-accent">
                    $4,200
                  </div>
                  <div className="text-[11px] text-muted">Optimized / mo</div>
                </div>
                <div className="rounded-lg border border-[rgba(227,181,102,0.4)] p-3">
                  <div className="tabular text-lg font-semibold text-accent">
                    −62%
                  </div>
                  <div className="text-[11px] text-muted">Unit cost</div>
                </div>
              </div>

              {/* before/after bars */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-12 text-[11px] text-muted">Before</span>
                  <div className="h-5 flex-1 overflow-hidden rounded bg-white/5">
                    <div className="flex h-full w-full items-center rounded bg-gradient-to-r from-[#6b645a] to-[#857d70] pl-2 text-[10px] font-semibold text-white">
                      $11,000
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-12 text-[11px] text-muted">After</span>
                  <div className="h-5 flex-1 overflow-hidden rounded bg-white/5">
                    <div
                      className="flex h-full items-center rounded bg-gradient-to-r from-[#f2ce86] to-accent pl-2 text-[10px] font-semibold text-ink"
                      style={{ width: "38%" }}
                    >
                      $4,200
                    </div>
                  </div>
                </div>
              </div>

              {/* mini leak table */}
              <table className="mt-6 w-full text-[11.5px]">
                <thead>
                  <tr className="text-left text-muted">
                    <th className="pb-2 font-medium">Leak</th>
                    <th className="pb-2 text-right font-medium">Current</th>
                    <th className="pb-2 text-right font-medium">Optimized</th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((line) => (
                    <tr key={line.label} className="border-t border-[var(--hairline)]">
                      <td className="py-1.5 text-body/85">{line.label}</td>
                      <td className="tabular py-1.5 text-right text-body/85">
                        {line.before}
                      </td>
                      <td className="tabular py-1.5 text-right text-accent">
                        {line.after}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-16 flex flex-col items-start gap-4 border-t border-[var(--hairline)] pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg text-muted">
            This is the format. Your figures would be real, drawn from your usage
            export.
          </p>
          <Magnetic>
            <Link href="/contact" className="btn-primary">
              Book an assessment
              <ArrowRight size={18} />
            </Link>
          </Magnetic>
        </div>
      </Reveal>
    </Section>
  );
}
