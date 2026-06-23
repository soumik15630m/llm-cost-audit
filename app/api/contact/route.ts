/**
 * Contact form delivery — a Vercel Edge Function. No separate backend.
 *
 * On each valid submission it sends TWO emails via Resend:
 *   1. To the lead   — a personalized reply with next steps + a link to your
 *                      Slack so they can follow up in chat.
 *   2. To you        — a "{name} from {company} just joined" notification with
 *                      their details (reply-to is set to the lead).
 *
 * Everything is configured by environment variables (see .env.example):
 *   RESEND_API_KEY      (required)  Resend API key — https://resend.com
 *   CONTACT_TO_EMAIL    (required)  where YOUR notification is sent ("to me")
 *   CONTACT_FROM_EMAIL  (recommended) verified sender, e.g.
 *                         "LLM Cost Audit <hello@yourdomain.com>".
 *                         NOTE: to email *leads* (external addresses) the from
 *                         domain must be verified in Resend. The default
 *                         onboarding@resend.dev only delivers to your own
 *                         account address — fine for the notification, not for
 *                         the lead reply.
 *   SLACK_INVITE_URL    (optional)  Slack invite/channel link for follow-ups,
 *                         included in both emails.
 *
 * If RESEND_API_KEY is unset, the submission is written to the function logs and
 * the form still succeeds. Set STRICT_CONTACT=1 to fail loudly instead.
 *
 * Edge runtime: only `fetch` is used — fast, cheap, zero-config on Vercel.
 */
import { site } from "@/lib/site";
import { neon } from "@neondatabase/serverless";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const runtime = "edge";

/**
 * Per-IP rate limiting (Upstash Redis) — prevents abuse of this endpoint:
 * inbox/email bombing, Resend-quota exhaustion, and junk DB rows. Skipped if the
 * env vars aren't set (form still works), but it should be enabled in production.
 * 5 requests per 10 minutes per IP is generous for real users, tight for abuse.
 */
const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(5, "10 m"),
        prefix: "ratelimit:contact",
        analytics: false,
      })
    : null;

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  spend?: string;
  /** acceptance of Terms + Privacy Policy (required by the form) */
  consent?: boolean;
  /** honeypot — real users never fill this hidden field */
  company_website?: string;
};

const clean = (s: unknown, max = 200) => String(s ?? "").trim().slice(0, max);
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

type Email = {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  headers?: Record<string, string>;
};

type ConsentRecord = {
  name: string;
  email: string;
  company: string;
  spend: string;
  ip: string;
  ua: string;
};

/**
 * Append a proof-of-consent row (with timestamp) to a Neon Postgres database.
 * The connection string is provided via DATABASE_URL. Edge-compatible (the Neon
 * serverless driver runs over HTTP). Table is created on first use. Failures are
 * logged and never block the form.
 */
async function logConsent(rec: ConsentRecord): Promise<void> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) return;
  try {
    const sql = neon(dbUrl);
    await sql`CREATE TABLE IF NOT EXISTS consent_log (
      id bigserial PRIMARY KEY,
      name text NOT NULL,
      email text NOT NULL,
      company text NOT NULL,
      spend text,
      consent boolean NOT NULL DEFAULT true,
      ip text,
      user_agent text,
      created_at timestamptz NOT NULL DEFAULT now()
    )`;
    await sql`INSERT INTO consent_log (name, email, company, spend, consent, ip, user_agent)
      VALUES (${rec.name}, ${rec.email}, ${rec.company}, ${rec.spend}, true, ${rec.ip}, ${rec.ua})`;
  } catch (e) {
    console.log("[contact] neon consent log failed:", String(e));
  }
}

async function sendEmail(key: string, from: string, mail: Email): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [mail.to],
        reply_to: mail.replyTo,
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
        headers: mail.headers,
      }),
    });
    if (!res.ok) console.log("[contact] resend error", res.status, await res.text());
    return res.ok;
  } catch {
    console.log("[contact] resend network error");
    return false;
  }
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return Response.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  // Silently accept (and drop) bot submissions that trip the honeypot.
  if (clean(body.company_website)) return Response.json({ ok: true });

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "";
  const ua = req.headers.get("user-agent") || "";

  // Rate limit per IP before doing any work (email / DB).
  if (ratelimit) {
    const { success } = await ratelimit.limit(ip || "anonymous");
    if (!success) {
      return Response.json(
        { ok: false, error: "Too many requests — please try again later." },
        { status: 429 }
      );
    }
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const company = clean(body.company, 160);
  const spend = clean(body.spend, 60);
  const consent = body.consent === true;

  if (!name || !isEmail(email) || !company || !spend || !consent) {
    return Response.json(
      { ok: false, error: "Missing or invalid fields" },
      { status: 422 }
    );
  }

  const firstName = name.split(/\s+/)[0];
  const at = new Date().toISOString();
  const slack = process.env.SLACK_INVITE_URL;

  // Record the consent (name/email/company/spend + time, IP, user agent) to Neon.
  // Runs in parallel with email delivery; awaited before responding.
  const consentLog = logConsent({ name, email, company, spend, ip, ua });

  const key = process.env.RESEND_API_KEY;
  const founderTo = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "LLM Cost Audit <onboarding@resend.dev>";

  // No email configured → log so the lead is never lost, still succeed.
  if (!key) {
    await consentLog;
    console.log(
      `[contact] (no RESEND_API_KEY) ${name} <${email}> · ${company} · ${spend} · ${at}`
    );
    if (process.env.STRICT_CONTACT === "1") {
      return Response.json({ ok: false, error: "Not configured" }, { status: 502 });
    }
    return Response.json({ ok: true });
  }

  const slackText = slack ? `\n\nWant to talk it through first? Join our Slack:\n${slack}\n` : "\n";
  const slackBtn = slack
    ? `<p style="margin:24px 0"><a href="${esc(slack)}" style="display:inline-block;background:#1c1407;color:#f2ce86;text-decoration:none;font-weight:600;padding:11px 20px;border-radius:8px">Join our Slack →</a></p>`
    : "";

  // 1) Personalized reply to the lead.
  const leadEmail: Email = {
    to: email,
    replyTo: founderTo,
    subject: "Your LLM cost assessment — next steps",
    text:
      `Hi ${firstName},\n\n` +
      `Thanks for reaching out about an LLM inference cost assessment. Here's what happens next:\n\n` +
      `  1. We sign a mutual NDA — before any data is shared.\n` +
      `  2. You send a usage export from your provider dashboard (not prompts, not billing).\n` +
      `  3. You get a $${site.assessmentPriceUSD} findings report with the dollar math, line by line.\n` +
      slackText +
      `\nTalk soon,\n${site.name}`,
    html:
      `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.6;color:#1c1407;max-width:520px">` +
      `<p>Hi ${esc(firstName)},</p>` +
      `<p>Thanks for reaching out about an LLM inference cost assessment. Here's what happens next:</p>` +
      `<ol style="padding-left:18px">` +
      `<li>We sign a <strong>mutual NDA</strong> — before any data is shared.</li>` +
      `<li>You send a <strong>usage export</strong> from your provider dashboard (not prompts, not billing).</li>` +
      `<li>You get a <strong>$${site.assessmentPriceUSD} findings report</strong> with the dollar math, line by line.</li>` +
      `</ol>` +
      slackBtn +
      `<p style="color:#6b645a">Talk soon,<br/>${esc(site.name)}</p>` +
      `</div>`,
    // One-time confirmation, but include an unsubscribe path for good standing
    // with Gmail/Yahoo and a clean deliverability score.
    headers: {
      "List-Unsubscribe": `<mailto:${founderTo || site.contactEmail}?subject=unsubscribe>`,
    },
  };

  // 2) Notification to you ("they just joined").
  const founderEmail: Email | null = founderTo
    ? {
        to: founderTo,
        replyTo: email,
        subject: `New assessment request — ${company}`,
        text:
          `${name} from ${company} just requested an assessment.\n\n` +
          `Name:    ${name}\n` +
          `Email:   ${email}\n` +
          `Company: ${company}\n` +
          `Spend:   ${spend}\n` +
          `Consent: Accepted Terms & Privacy Policy\n` +
          `Time:    ${at}\n\n` +
          `Reply to this email to reach them directly.${slack ? `\nSlack: ${slack}` : ""}`,
        html:
          `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;color:#1c1407">` +
          `<h2 style="margin:0 0 4px">New assessment request</h2>` +
          `<p style="margin:0 0 14px;color:#6b645a"><strong>${esc(name)}</strong> from <strong>${esc(company)}</strong> just joined.</p>` +
          `<table style="border-collapse:collapse">` +
          `<tr><td style="padding:4px 12px 4px 0;color:#6b645a">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>` +
          `<tr><td style="padding:4px 12px 4px 0;color:#6b645a">Company</td><td>${esc(company)}</td></tr>` +
          `<tr><td style="padding:4px 12px 4px 0;color:#6b645a">Monthly spend</td><td>${esc(spend)}</td></tr>` +
          `<tr><td style="padding:4px 12px 4px 0;color:#6b645a">Consent</td><td>Accepted Terms &amp; Privacy Policy</td></tr>` +
          `<tr><td style="padding:4px 12px 4px 0;color:#6b645a">Time</td><td>${esc(at)}</td></tr>` +
          `</table>` +
          `<p style="margin-top:14px">Reply to this email to reach them directly.</p>` +
          slackBtn +
          `</div>`,
      }
    : null;

  // Send both; the founder notification and the lead reply are independent.
  const [leadOk, founderOk] = await Promise.all([
    sendEmail(key, from, leadEmail),
    founderEmail ? sendEmail(key, from, founderEmail) : Promise.resolve(false),
    consentLog,
  ]);

  if (!leadOk && !founderOk && process.env.STRICT_CONTACT === "1") {
    return Response.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  }

  // The form succeeds as long as the request was valid; delivery status is logged.
  return Response.json({ ok: true });
}
