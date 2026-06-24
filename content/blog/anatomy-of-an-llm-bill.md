---
title: "The Anatomy of an LLM Bill: Where 40-70% of Your Inference Spend Actually Leaks"
description: "Most AI teams overpay for inference by 40-70% - not because the models are expensive, but because of how requests are constructed. Here's where the money actually goes, and why the bill grows faster than your users."
slug: "anatomy-of-an-llm-bill"
date: "2026-06-21"
tags: ["llm cost optimization", "inference cost", "openai", "anthropic", "finops"]
---

# The Anatomy of an LLM Bill: Where 40-70% of Your Inference Spend Actually Leaks

When a team tells me their OpenAI or Anthropic bill is "just the cost of doing AI," they're almost always wrong. The model rates are rarely the problem. The problem is *how the requests are built* - and that's where 40-70% of a typical bill quietly disappears.

Here's how an inference bill actually breaks down, and why the waste compounds as you grow.

## The bill is four numbers, not one

Every LLM bill is the sum of four things:

1. **Input tokens** - everything you send: system prompt, tool definitions, retrieved context, conversation history, and the user's message.
2. **Output tokens** - what the model generates, usually billed at 3-5× the input rate.
3. **The model tier** you chose for each call.
4. **The pricing modifiers** you did or didn't turn on (caching, batching, context limits).

Most teams obsess over (4) the model and (2) the output, because those feel like the "AI" part. But the largest single source of waste I see is almost always (1) - the input tokens you're re-sending on every call without realizing it.

## Why the input side bleeds

The thing that surprises most founders: **the model reprocesses your entire context on every single request.** Your 3,000-token system prompt, your tool schemas, your retrieved documents, the whole conversation so far - all of it is recomputed from scratch on every call, and you pay for every token, every time.

So consider a support assistant with a 3,000-token system prompt (instructions + tool definitions), handling 30,000 API calls a day on a mid-tier model at $3 per million input tokens.

That static prefix alone is:

```
3,000 tokens × 30,000 calls = 90,000,000 tokens/day
90M tokens × $3 / 1,000,000 = $270/day ≈ $8,100/month
```

*(Illustrative figures.)* Eight thousand dollars a month - and not a cent of it is doing new work. It's the same prefix, reprocessed 30,000 times a day. This is the single most common leak I find, and it's invisible on the dashboard because it just shows up as "input tokens."

## Why the bill grows faster than your users

Here's the part that catches teams off guard at scale. Inference cost doesn't grow linearly with users - it grows with **users × context size × turns per conversation.** As your product matures, all three climb at once:

- You add more to the system prompt (more instructions, more tools, more guardrails).
- Your RAG pipeline retrieves more context per call.
- Conversations get longer, and every turn re-sends the full history.

So a 2× increase in users can easily mean a 3-4× increase in spend. That's why founders look up one quarter and find the LLM line has outpaced everything else - and why measuring **cost per conversation** matters far more than watching the total bill. The total can rise while your per-unit efficiency is collapsing.

## The four leaks, ranked

In rough order of how much money I typically find sitting in each:

1. **Uncached repeated context.** The static prefix re-sent on every call. Almost always the biggest single line, and the easiest to fix - repeated input can be cached at a fraction of the standard price.
2. **Over-powered models.** Frontier-tier models running classification, extraction, routing, and formatting that a model 5× cheaper would handle identically.
3. **No batching.** Asynchronous work (enrichment, evals, nightly jobs, summarization) running at full real-time price when it could run at half.
4. **Unmanaged context growth.** Conversation history and retrieved chunks that grow unbounded, so every call gets more expensive over the session.

None of these are exotic. They're the default state of almost every codebase that shipped an LLM feature quickly and moved on. The waste isn't a sign anyone did anything wrong - it's just what un-audited inference looks like.

## The point

The headline model price is the part everyone looks at and the part that matters least. The bill is made elsewhere - in the prefix you re-send, the tier you over-pay for, the async work you run hot, and the context you let grow. Add those up across a few million calls a month and the 40-70% figure stops sounding like a sales line and starts looking like arithmetic.

If you want to know where *your* number actually sits, that's exactly what an assessment is for: a usage export tells the whole story, line by line, in dollars.

---

*Figures in this article are illustrative and based on public 2026 API pricing; your actual costs depend on your traffic, context size, and model mix.*
