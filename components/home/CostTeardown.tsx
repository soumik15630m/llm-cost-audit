"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import Magnetic from "@/components/Magnetic";
import { ArrowRight } from "@/components/icons";
import LayerPlate from "./LayerPlate";
import { restZ } from "./IsoStackIdle";
import {
  STACK,
  METER_START,
  METER_END,
  SAVINGS_PCT,
  formatUSD,
  type StackLayer,
} from "./stack-data";

/* Scroll-progress choreography (0 → 1 over the pinned section). */
const LIFTS: [number, number][] = [
  [0.08, 0.26],
  [0.28, 0.46],
  [0.48, 0.66],
  [0.68, 0.84],
];
const CAPTIONS: [number, number][] = [
  [0.04, 0.28],
  [0.28, 0.48],
  [0.48, 0.68],
  [0.68, 0.86],
];
const OUTRO: [number, number] = [0.86, 1.001];
const METER_IN = [0.08, 0.26, 0.46, 0.66, 0.84];
const METER_OUT = [METER_START, 6000, 4700, METER_END, METER_END];

/* ── One plate lifting off the stack ───────────────────────────────────── */
function TeardownPlate({
  layer,
  i,
  progress,
}: {
  layer: StackLayer;
  i: number;
  progress: MotionValue<number>;
}) {
  const [s, e] = LIFTS[i];
  const z = useTransform(progress, [s, e], [restZ(i), restZ(i) + 300]);
  const x = useTransform(progress, [s, e], [0, i % 2 === 0 ? 80 : -80]);
  const scale = useTransform(progress, [s, e], [1, 1.08]);
  const opacity = useTransform(progress, [s + (e - s) * 0.5, e], [1, 0]);

  return (
    <motion.div className="iso-plate" style={{ z, x, scale, opacity }}>
      <LayerPlate layer={layer} />
    </motion.div>
  );
}

/* ── The live cost meter ───────────────────────────────────────────────── */
function Meter({ progress }: { progress: MotionValue<number> }) {
  const value = useTransform(progress, METER_IN, METER_OUT);
  const text = useTransform(value, (n) => formatUSD(n));
  const width = useTransform(value, (n) => `${(n / METER_START) * 100}%`);
  const pctOpacity = useTransform(progress, [0.1, 0.18], [0, 1]);

  return (
    <div>
      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-2">
          <motion.span className="tabular text-5xl font-semibold text-headline sm:text-6xl">
            {text}
          </motion.span>
          <span className="text-sm text-muted">/ mo</span>
        </div>
        <motion.span
          style={{ opacity: pctOpacity }}
          className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(227,181,102,0.4)] bg-[rgba(227,181,102,0.08)] px-2.5 py-1 text-xs font-semibold text-accent"
        >
          −{SAVINGS_PCT}%
        </motion.span>
      </div>
      <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-[rgba(240,231,214,0.07)]">
        <motion.div
          style={{ width, background: "linear-gradient(90deg,#f2ce86,#e3b566)" }}
          className="h-full rounded-full"
        />
      </div>
    </div>
  );
}

/* ── A HUD caption that rotates in (cylindrical reveal) per active layer ── */
function Caption({
  layer,
  range,
  progress,
}: {
  layer: StackLayer;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const [a, b] = range;
  const opacity = useTransform(progress, [a, a + 0.03, b - 0.04, b], [0, 1, 1, 0]);
  const rotateX = useTransform(progress, [a, a + 0.05], [-42, 0]);
  const y = useTransform(progress, [a, a + 0.05], [18, 0]);

  return (
    <motion.div
      style={{ opacity, rotateX, y, transformPerspective: 700 }}
      className="absolute inset-0 origin-top"
    >
      <div className="flex items-center gap-2 text-accent">
        <layer.Icon size={18} />
        <span className="tabular text-xs tracking-[0.18em] text-muted">
          LAYER {layer.n} / 04
        </span>
      </div>
      <h3 className="mt-3 text-2xl font-medium text-headline">{layer.label}</h3>
      <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-body/80">
        {layer.why}
      </p>
      <p className="tabular mt-3 text-sm font-semibold text-accent">
        {layer.saved ? `${layer.saved}/mo recovered` : "Capped - $0 now, real money later"}
      </p>
    </motion.div>
  );
}

/* ── Closing summary + CTA ─────────────────────────────────────────────── */
function Outro({ progress }: { progress: MotionValue<number> }) {
  const [a, b] = OUTRO;
  const opacity = useTransform(progress, [a, a + 0.04], [0, 1]);
  const y = useTransform(progress, [a, a + 0.05], [18, 0]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 origin-top">
      <p className="eyebrow">Result</p>
      <h3 className="mt-3 text-2xl font-medium text-headline">
        Same output. <span className="text-accent">{SAVINGS_PCT}% less</span> unit
        cost.
      </h3>
      <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-body/80">
        From {formatUSD(METER_START)} to {formatUSD(METER_END)}/mo on the sample -
        measured against your own invoices, line by line.
      </p>
      <Magnetic>
        <Link href="/contact" className="btn-primary mt-5">
          Book an assessment
          <ArrowRight size={18} />
        </Link>
      </Magnetic>
    </motion.div>
  );
}

/* ── Static fallback (mobile + reduced-motion): de-boxed editorial list ── */
function StaticLeaks({ className = "" }: { className?: string }) {
  return (
    <section className={className}>
      <div className="container-page py-20 sm:py-28">
        <p className="eyebrow">Fig. 01 - Where it leaks</p>
        <h2 className="mt-5 max-w-2xl text-3xl font-medium tracking-tight sm:text-[2.6rem] sm:leading-[1.08]">
          Inaction isn&apos;t free. It bleeds - on every call.
        </h2>
        <p className="mt-5 max-w-xl text-lg text-muted">
          The audit tears the context stack apart layer by layer. Each one is a
          leak you pay for on every request - and recover once it&apos;s fixed.
        </p>

        <ul className="mt-12 border-t border-[var(--hairline)]">
          {STACK.map((layer) => (
            <li
              key={layer.id}
              className="grid grid-cols-[auto_1fr] items-start gap-5 border-b border-[var(--hairline)] py-7 sm:grid-cols-[auto_1fr_auto] sm:gap-8"
            >
              <span className="font-[family-name:var(--font-display)] text-4xl text-accent/80">
                {layer.n}
              </span>
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="text-accent">
                    <layer.Icon size={20} />
                  </span>
                  <h3 className="text-xl font-medium text-headline">
                    {layer.label}
                  </h3>
                </div>
                <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-body/80">
                  {layer.why}
                </p>
              </div>
              <div className="col-start-2 sm:col-start-3 sm:text-right">
                <div className="tabular text-sm text-muted">{layer.current}</div>
                <div className="tabular text-sm font-semibold text-accent">
                  {layer.saved ? `−${layer.saved}` : "capped"}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="tabular text-2xl text-muted line-through">
            {formatUSD(METER_START)}
          </span>
          <span className="tabular text-3xl font-semibold text-accent">
            {formatUSD(METER_END)}/mo
          </span>
          <span className="text-sm text-muted">
            −{SAVINGS_PCT}% unit cost on the sample
          </span>
        </div>
      </div>
    </section>
  );
}

/* ── The pinned scroll act ─────────────────────────────────────────────── */
export default function CostTeardown() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Reduced motion → the static editorial list only.
  if (reduce) return <StaticLeaks />;

  return (
    <>
      {/* Mobile / small screens: static list (also the no-JS + SEO baseline) */}
      <StaticLeaks className="lg:hidden" />

      {/* Desktop: pinned, scroll-scrubbed teardown */}
      <div ref={ref} className="relative hidden lg:block" style={{ height: "460vh" }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="container-page grid w-full grid-cols-[1fr_1fr] items-center gap-12">
            {/* HUD column */}
            <div>
              <p className="eyebrow">Fig. 01 - Where it leaks</p>
              <h2 className="mt-4 max-w-md text-3xl font-medium tracking-tight sm:text-[2.4rem] sm:leading-[1.08]">
                Watch the bill come apart, layer by layer.
              </h2>
              <div className="mt-9 max-w-md">
                <Meter progress={scrollYProgress} />
              </div>
              <div className="relative mt-9 min-h-[13rem] max-w-md">
                {STACK.map((layer, i) => (
                  <Caption
                    key={layer.id}
                    layer={layer}
                    range={CAPTIONS[i]}
                    progress={scrollYProgress}
                  />
                ))}
                <Outro progress={scrollYProgress} />
              </div>
            </div>

            {/* 3D stack column */}
            <div className="relative flex items-center justify-center">
              <div className="iso-shadow" aria-hidden />
              <div className="iso-scene" aria-hidden>
                <div className="iso-stack">
                  <div className="iso-plate" style={{ transform: "translateZ(-12px)" }}>
                    <div className="iso-base-face flex items-center justify-center">
                      <span className="tabular text-[10px] tracking-[0.2em] text-accent">
                        GPU · API
                      </span>
                    </div>
                  </div>
                  {STACK.map((layer, i) => (
                    <TeardownPlate
                      key={layer.id}
                      layer={layer}
                      i={i}
                      progress={scrollYProgress}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
