import { IconCache, IconTier, IconBatch, IconContext } from "@/components/icons";
import type { ComponentType } from "react";

export type StackLayer = {
  id: string;
  n: string;
  label: string;
  /** one tight technical line on why it bleeds (shown in the HUD caption) */
  why: string;
  current: string;
  /** recovered amount, or null when the layer is preventive (no $ now) */
  saved: string | null;
  preventive?: boolean;
  Icon: ComponentType<{ size?: number; className?: string }>;
};

/**
 * The "context stack" the audit tears down, top → bottom. Each plate is one
 * leak/lever; lifting it = fixing it = the cost meter drops.
 * FOUNDER-REVIEW: illustrative figures, consistent with the sample report.
 */
export const STACK: StackLayer[] = [
  {
    id: "context",
    n: "01",
    label: "Uncached context",
    why: "The system prompt, tools and retrieved docs are reprocessed on every call — full price for the same tokens, thousands of times a day.",
    current: "$6,400/mo",
    saved: "$5,000",
    Icon: IconCache,
  },
  {
    id: "model",
    n: "02",
    label: "Over-powered model",
    why: "A frontier model runs classification, routing and extraction that a tier 5× cheaper handles identically.",
    current: "$2,400/mo",
    saved: "$1,300",
    Icon: IconTier,
  },
  {
    id: "batch",
    n: "03",
    label: "No Batch API",
    why: "Async work — enrichment, evals, nightly jobs — runs at full real-time price when the Batch API would halve it.",
    current: "$1,200/mo",
    saved: "$500",
    Icon: IconBatch,
  },
  {
    id: "growth",
    n: "04",
    label: "Context growth",
    why: "Conversation history grows unbounded, so every turn costs more than the last. Capped now keeps unit cost from creeping back later.",
    current: "$1,000/mo",
    saved: null,
    preventive: true,
    Icon: IconContext,
  },
];

export const METER_START = 11000;
export const METER_END = 4200;
export const SAVINGS_PCT = Math.round((1 - METER_END / METER_START) * 100);

export const formatUSD = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
