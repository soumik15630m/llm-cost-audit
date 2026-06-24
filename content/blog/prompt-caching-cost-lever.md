---
title: "Prompt Caching: The Highest-Leverage Cost Lever Most AI Teams Aren't Using"
description: "Prompt caching can cut the cost of repeated context by up to 90% on Anthropic and 50% on OpenAI. Here's how it works, the real dollar math, and why most teams leave it switched off."
slug: "prompt-caching-cost-lever"
date: "2026-06-21"
tags: ["prompt caching", "llm cost optimization", "anthropic", "openai", "inference cost"]
---

# Prompt Caching: The Highest-Leverage Cost Lever Most AI Teams Aren't Using

If I could only fix one thing in a typical LLM codebase, it would be this one. Prompt caching is the single highest-leverage cost optimization available right now - and in audit after audit, it's the one teams have left switched off.

Here's what it does, why it works, and the math that makes it the first thing I check.

## The problem it solves

Every API call reprocesses your entire prompt from scratch - the system prompt, the tool definitions, the retrieved documents, the conversation history. If you're running a chatbot with a 4,000-token system prompt across 20,000 conversations a day, you are paying for those 4,000 tokens 20,000 times, every day, forever. The content never changes, but you're billed full price for it on every call.

Prompt caching makes those repeated tokens close to free.

## How it works

When the model processes a prompt, it builds an internal representation of the tokens it has already seen. Caching lets the provider **store that computed state** and reuse it, instead of recomputing the same prefix on the next request. If your next call starts with the same content - same system prompt, same history up to a point - it reads from the cache instead of reprocessing.

The economics differ by provider:

- **Anthropic** charges cache reads at **10% of the standard input price** - a 90% discount on cached tokens. The first write costs slightly more than normal input (1.25× for a 5-minute cache, 2× for a 1-hour cache), but that's paid once and amortized across every subsequent read. You control what gets cached explicitly with `cache_control` markers.
- **OpenAI** caching is **automatic** and discounts cached input by **50%**. It kicks in on prompts over ~1,024 tokens with no code change - though many teams don't structure their prompts to take full advantage of it.

Crucially, caching **stacks with the Batch API discount**, so high-volume repeated work can compound both savings.

## The math

Take the support assistant above: a 4,000-token static prefix (system prompt + tools), reused across a high call volume on a mid-tier model at $3 per million input tokens.

Say that prefix accounts for 90 million tokens of input per day:

```
Without caching:  90M × $3 / 1,000,000      = $270/day  ≈ $8,100/month
With caching:     90M × $0.30 / 1,000,000   =  $27/day  ≈   $810/month
                  (cache reads at 10% of input)
```

*(Illustrative figures.)* That's roughly **$7,300 a month** recovered from a single configuration change - on one component of the bill. The write cost is negligible because in a high-frequency app the cache is read far more often than it's written, and each read resets the time-to-live window so you rarely pay to rewrite it.

## Why it's the first thing to fix

Three reasons caching is where I always start:

1. **The savings are large and immediate.** Repeated context is usually the single biggest line on the bill, and caching attacks it directly.
2. **There's no quality trade-off.** Caching changes nothing about the output - the response is identical to an uncached call. You are paying less for exactly the same result.
3. **It's mostly a configuration change**, not an architecture rewrite. On Anthropic it's marking the right blocks; on OpenAI it's structuring prompts so the static content sits at the front where automatic caching can catch it.

## The catch most teams miss

Caching requires an **exact prefix match.** The cached portion has to be byte-for-byte identical on each call. Teams unknowingly defeat their own caching by putting something dynamic - a timestamp, a session ID, the user's name - near the *top* of the prompt, which breaks the match for everything after it.

The fix is ordering: put everything static (system prompt, tools, reference documents) first, and everything dynamic (the user's message, per-request variables) last. Get that ordering right and the cache does the rest.

## The point

Prompt caching is the rare optimization that's large, free of quality cost, and mostly a config change - which is exactly why it's the first place real money is hiding. If your team hasn't deliberately structured prompts around it, the odds are very high that you're paying full price, many times a day, for content that never changes.

That's the kind of thing a usage export makes obvious in a single line - and the kind of thing an assessment is built to find.

---

*Pricing and discount figures reflect public 2026 API documentation and may change; your actual savings depend on your prompt structure and traffic.*
