import type { Metadata } from "next";
import Section from "@/components/Section";
import LegalDocument from "@/components/LegalDocument";
import { getLegalDoc } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How LLM Cost Audit handles your information. Confidentiality is the default — usage data is shared only under a mutual NDA, never through a web form.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  // Renders content/legal/privacy.md, or a clear placeholder if not supplied.
  const doc = getLegalDoc("privacy", "Privacy Policy");
  return (
    <Section>
      <LegalDocument doc={doc} />
    </Section>
  );
}
