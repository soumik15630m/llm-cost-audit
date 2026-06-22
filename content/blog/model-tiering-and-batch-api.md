---
title: "Stop Paying Opus Prices for Haiku Work: Model Tiering and the Batch API"
description: "Two of the biggest LLM cost levers are choosing the right model tier per task and routing async work through the Batch API. Stacked, they can cut a workload's cost by 90% with no change in output quality."
slug: "model-tiering-and-batch-api"
date: "2026-06-21"
tags: ["model selection", "batch api", "llm cost optimization", "anthropic", "openai"]
---

# Stop Paying Opus Prices for Haiku Work: Model Tiering and the Batch API

After caching, the next two levers I reach for in a cost audit are the simplest to explain and among the most over-looked: **use the cheapest model that does the job**, and **run async work through the Batch API.** Stacked together, they routinely cut a workload's cost by 90% — with the output quality unchanged.

Here's why, with the math.

## Lever one: model tiering

Most providers offer a tiered lineup. On Anthropic in 2026, roughly:

- **Haiku** — ~$1 / $5 per million input/output tokens
- **Sonnet** — ~$3 / $15
- **Opus** — ~$5 / $25

The top tier costs 5× the bottom on input and 5× on output. That premium is worth it for genuinely hard reasoning. It is pure waste for the work that makes up most of a real application: classification, extraction, routing, tagging, formatting, short summaries, intent detection.

The mistake I see constantly is a single frontier model wired into *every* call, because that's what the team prototyped with and never revisited. The product works, so nobody goes back to ask which calls actually need the expensive model. Usually it's a small minority.

**The fix is routing:** send each call to the cheapest tier that handles it correctly. Hard reasoning to the top tier; the bulk of mechanical work to the cheap tier. This is often a few lines of conditional logic, and the output is identical because the cheap model was always capable of the simple task.

## Lever two: the Batch API

Both major providers offer a **Batch API that discounts input *and* output by 50%** for work that can tolerate a few hours of latency. The discount is automatic and carries no quality trade-off — same model, same output, half the price.

The catch is only latency. So it's perfect for anything asynchronous:

- Document processing and enrichment
- Nightly reports and aggregations
- Evaluation and test runs
- Bulk classification and tagging
- Any offline pipeline where "within a few hours" is fine

Plenty of teams run all of this at full real-time price simply because it was easier to call the same synchronous endpoint everywhere. Moving the async half of your workload to Batch halves its cost on its own.

## Stacking them

The levers multiply. Take a classification workload — say 50 million input and 10 million output tokens a month — that's currently running on the top tier, synchronously:

```
Opus, real-time:   50M×$5/M + 10M×$25/M   = $250 + $250 = $500/month
Haiku, real-time:  50M×$1/M + 10M×$5/M    =  $50 +  $50 = $100/month   (5× cheaper)
Haiku + Batch:     $100 × 0.5             =              $50/month   (10× cheaper)
```

*(Illustrative figures.)* The same classification job, producing the same labels, drops from **$500 to $50 a month** — a 90% cut — by routing it to the right tier and batching it. No model retraining, no quality loss, no architecture rewrite. Just sending the work to the right place.

And on Anthropic, because caching also stacks with Batch, a high-volume job with repeated context can layer all three discounts at once.

## How to think about it

A useful mental model: **match the price of the call to the difficulty of the call, and match the endpoint to the urgency of the call.**

- Difficulty → tier. Easy work goes cheap; only genuine reasoning pays the premium.
- Urgency → endpoint. Real-time work stays synchronous; everything that can wait goes to Batch at half price.

Most applications have a small core of hard, urgent calls and a large tail of easy or async ones. The waste is paying top-tier, real-time prices for that entire tail.

## The point

Model tiering and batching are the least glamorous levers in cost optimization and two of the most effective. They don't require touching model quality, prompts, or product behavior — only deciding, per call, how hard and how urgent the work actually is, and pricing it accordingly. For most teams that one audit pass over "which calls go where" is worth a large fraction of the bill.

A usage export shows exactly which calls are over-tiered and which async work is running hot — which is the first thing an assessment maps out.

---

*Model rates and discount structures reflect public 2026 API pricing and may change; actual savings depend on your workload mix.*
