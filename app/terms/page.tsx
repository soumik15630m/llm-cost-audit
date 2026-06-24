import type { Metadata } from "next";
import Section from "@/components/Section";
import LegalDocument from "@/components/LegalDocument";
import { getLegalDoc } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing LLM Cost Audit engagements - the $750 assessment, optional implementation, and how verified per-unit savings are defined.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  // Renders content/legal/terms.md, or a clear placeholder if not supplied.
  const doc = getLegalDoc("terms", "Terms of Service");
  return (
    <Section>
      <LegalDocument doc={doc} />
    </Section>
  );
}
