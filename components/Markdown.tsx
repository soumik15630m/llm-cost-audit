import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Markdown → styled HTML, rendered on the server (no client JS).
 * GFM enabled for tables/strikethrough. The leading H1 in supplied files is
 * dropped here because pages render their own <h1> header; remaining headings,
 * code, tables, and links inherit the `.prose` design-system styles.
 */
export default function Markdown({
  children,
  dropFirstH1 = false,
}: {
  children: string;
  dropFirstH1?: boolean;
}) {
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={
          dropFirstH1
            ? {
                // Suppress the document's own H1 (page supplies the title header).
                h1: () => null,
              }
            : undefined
        }
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
