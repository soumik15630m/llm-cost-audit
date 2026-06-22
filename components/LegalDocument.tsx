import Markdown from "./Markdown";
import type { LegalDoc } from "@/lib/posts";

/**
 * Shared layout for /privacy, /terms, /nda. Renders the founder-supplied
 * Markdown (with its own leading H1 suppressed) under a single page <h1>, in a
 * readable legal measure. If the doc is pending, shows the clear placeholder.
 */
export default function LegalDocument({
  doc,
  children,
}: {
  doc: LegalDoc;
  children?: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-[44rem]">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        {doc.title}
      </h1>
      {doc.pending && (
        <p className="mt-4 rounded-lg border border-[rgba(227,181,102,0.3)] bg-[rgba(227,181,102,0.05)] px-4 py-3 text-sm text-body">
          <span className="font-semibold text-accent">CONTENT PENDING</span> —
          founder to supply. Drop the finished Markdown at{" "}
          <code className="tabular">{doc.sourceFile.replace("/content", "content")}</code>{" "}
          and it renders here automatically.
        </p>
      )}
      {children}
      <div className="mt-8">
        {/* Suppress the document's own H1; the page <h1> above is canonical. */}
        <Markdown dropFirstH1>{doc.content}</Markdown>
      </div>
    </article>
  );
}
