---
title: "A 10-Point Checklist to Audit Your OpenAI / Anthropic Spend"
description: "A practical, vendor-neutral checklist for finding waste in your LLM bill — caching, model tiering, batching, context management, and the metrics that actually tell you whether you're efficient."
slug: "llm-spend-audit-checklist"
date: "2026-06-21"
tags: ["llm cost audit", "cost optimization", "openai", "anthropic", "finops", "checklist"]
---

# A 10-Point Checklist to Audit Your OpenAI / Anthropic Spend

You don't need a consultant to start finding waste in your LLM bill. Most of it hides in a handful of predictable places. Here's the checklist I run through on every audit — work down it and you'll surface the majority of what's recoverable.

## 1. Is prompt caching on — and actually working?

Repeated context (system prompt, tool definitions, reference docs) re-sent on every call is usually the single biggest leak. Confirm caching is enabled **and** that your static content sits at the *front* of the prompt. A dynamic value near the top (timestamp, session ID, user name) silently breaks the cache match for everything after it. Cached reads can cost as little as 10% of standard input — this is the first thing to verify.

## 2. Is every call using the right model tier?

Look at what model each call type uses. Classification, extraction, routing, tagging, and formatting almost never need a frontier model. If a single top-tier model is wired into every call, you're likely overpaying 5× on the bulk of your work. Map call types to the cheapest tier that handles each correctly.

## 3. Is async work running through the Batch API?

Anything that can tolerate a few hours of latency — enrichment, evals, nightly jobs, bulk processing — should run on the Batch API for a 50% discount on input and output. Check how much of your volume is genuinely real-time. The async tail running at full price is pure recoverable spend.

## 4. Is your context growing unbounded?

In multi-turn conversations, does the full history get re-sent on every turn with no trimming or summarization? If so, each call in a session costs more than the last, and long conversations get expensive fast. Look for a context-management strategy — truncation, summarization, or a sliding window.

## 5. Are your prompts lean?

Every token in your system prompt is billed on every call. Audit for redundancy: verbose instructions, repeated context, stale examples, dead tool definitions. Tightening a system prompt that runs millions of times a month compounds into real money.

## 6. Are you over-generating output?

Output tokens cost 3–5× input. Check `max_tokens` settings and whether you're asking for more than you use. Unbounded or oversized output limits, verbose formats where a terse one would do, and "explain your reasoning" on calls that don't need it all inflate the expensive side of the bill.

## 7. Are you paying long-context premiums you don't need?

Some providers apply premium rates above a context threshold (e.g. very large input requests). If you're stuffing huge retrieved context into every call "just in case," you may be paying a premium for tokens that aren't improving the answer. Retrieve less, more precisely.

## 8. Do you know your cost *per unit*, not just total?

This is the metric that matters. Track **cost per conversation / per request / per user**, not just the monthly total. The total can rise while your per-unit cost is collapsing (good) — or stay flat while per-unit cost balloons (bad, masked by slowing growth). Unit cost is the only number that tells you if you're actually getting more efficient.

## 9. Can you attribute spend to features?

If your bill is one undifferentiated number, you can't see which feature is bleeding. Tag or segment usage by feature/endpoint so you can find the specific call path that's driving cost — that's where the fix usually lives.

## 10. Are the easy provider defaults turned on?

Providers keep adding cost features — automatic caching, cheaper fast modes, no-surcharge long context on newer models, free model upgrades at the same price. A bill running on last year's model and last year's defaults is often leaving a straightforward discount on the table. Check that you're on the current, cheapest-equivalent configuration.

---

## How to read the results

Work down the list and you'll typically find that two or three items account for most of the waste — usually caching (#1), tiering (#2), and batching (#3). Those three alone often add up to the 40–70% range, because they attack the largest, most repeated parts of the bill without touching output quality.

The one number to anchor on is **#8 — cost per unit.** Fix the leaks, then watch your cost-per-conversation drop while quality stays flat. That's the proof the optimization worked, and it's measured against your own invoices, so there's nothing to take on faith.

If you'd rather have someone run this against your actual usage export and hand you the dollar figures line by line, that's exactly what an assessment is — but the checklist above will get you a long way on your own.

---

*This checklist is vendor-neutral and reflects public 2026 API pricing mechanics; specific rates and features change over time.*
