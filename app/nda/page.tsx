import type { Metadata } from "next";
import Section from "@/components/Section";
import LegalDocument from "@/components/LegalDocument";
import { Download } from "@/components/icons";
import { getLegalDoc } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Mutual NDA",
  description:
    "The mutual non-disclosure agreement signed before any usage data is shared. Your identity, usage, and numbers stay private - and so does the client list.",
  alternates: { canonical: "/nda" },
};

export default function NdaPage() {
  // Renders content/legal/nda.md, or a clear placeholder if not supplied.
  const doc = getLegalDoc("nda", "Mutual Non-Disclosure Agreement");

  return (
    <Section>
      <LegalDocument doc={doc}>
        <div className="mt-6 rounded-xl border border-[var(--hairline)] bg-ink-2 p-5">
          <p className="text-sm text-body/90">
            Confidentiality runs both ways and is signed{" "}
            <span className="text-headline">before any data is shared</span>.
            Review it in full here, or download a copy to route through your own
            legal process.
          </p>
          {doc.pending ? (
            <p className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[var(--hairline)] px-4 py-2 text-sm text-muted">
              Downloadable copy available once the document is finalized.
            </p>
          ) : (
            <a
              href="/mutual-nda.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost mt-4 text-sm"
            >
              <Download size={16} /> Open the NDA - print or save as PDF
            </a>
          )}
        </div>
      </LegalDocument>
    </Section>
  );
}
