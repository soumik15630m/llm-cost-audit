import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { organizationSchema, serviceSchema, webSiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";

// Self-hosted via next/font - no layout shift, no external request.
// Neo-serif display + grotesque body + mono data: the editorial pairing.
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

/**
 * Root metadata. `metadataBase` makes every relative OG/canonical URL absolute
 * on the production domain. The title template appends the brand to page titles.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "LLM Cost Audit - Cut your OpenAI / Anthropic bill 40-70%",
    template: `%s | ${site.name}`,
  },
  description: site.shortDescription,
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: [
    "LLM cost audit",
    "inference cost optimization",
    "OpenAI cost",
    "Anthropic cost",
    "prompt caching",
    "model tiering",
    "Batch API",
    "AI FinOps",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: "LLM Cost Audit - Cut your OpenAI / Anthropic bill 40-70%",
    description: site.shortDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "LLM Cost Audit - Cut your OpenAI / Anthropic bill 40-70%",
    description: site.shortDescription,
  },
  robots: {
    // Production is fully indexable. (No accidental noindex shipped.)
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // Google Search Console verification.
  verification: { google: "-PUsrcvH44YhFMrUcvofLUIb84Q5gwkT63ngHbfCWT8" },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={site.lang}
      className={`${fraunces.variable} ${hanken.variable} ${mono.variable}`}
    >
      <body className="min-h-screen antialiased">
        {/* Organization + Service + WebSite schema on every page */}
        <JsonLd data={[organizationSchema(), serviceSchema(), webSiteSchema()]} />

        {/* Lenis inertial smooth scroll (reduced-motion aware) */}
        <SmoothScroll />

        {/* Film grain over everything - crafted, not rendered. */}
        <div className="grain" aria-hidden />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />

        {/* Privacy-friendly, cookieless analytics + Core Web Vitals (Vercel). */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
