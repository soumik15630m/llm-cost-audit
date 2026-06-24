import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { site } from "@/lib/site";

// On-brand dynamic OG image per blog post (warm ink bg, gold accent, title).
export const alt = "LLM Cost Audit article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const MONOGRAM =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 32 32'><rect x='0.6' y='0.6' width='30.8' height='30.8' rx='8.4' fill='#15110d' stroke='rgba(240,231,214,0.14)'/><path d='M8 9v14h7' fill='none' stroke='#e3b566' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/><path d='M24 10l-7 12' stroke='#e3b566' stroke-width='1.8' stroke-linecap='round' opacity='0.55'/><circle cx='24' cy='10' r='1.5' fill='#e3b566'/><circle cx='17' cy='22' r='1.5' fill='#e3b566' opacity='0.55'/></svg>`
  );

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function OgImage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  const title = post?.title ?? site.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0908",
          backgroundImage:
            "radial-gradient(58% 60% at 10% 6%, rgba(227,181,102,0.18), transparent 60%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MONOGRAM} width={52} height={52} alt="" />
          <div style={{ color: "#fcf8f0", fontSize: 28, fontWeight: 600 }}>{site.name}</div>
        </div>

        <div
          style={{
            color: "#fcf8f0",
            fontSize: title.length > 64 ? 56 : 66,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            maxWidth: 1000,
            display: "flex",
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "#9a9082", fontSize: 26 }}>
            Independent inference cost audits
          </div>
          <div style={{ color: "#e3b566", fontSize: 26, fontWeight: 600 }}>
            40-70% recoverable
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
