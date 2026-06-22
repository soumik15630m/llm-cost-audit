import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Default sitewide OG image (home + any page without its own).
export const alt = "LLM Cost Audit — cut your OpenAI / Anthropic bill 40–70%";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand monogram as a data URI (Satori renders <img> data URIs reliably).
const MONOGRAM =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 32 32'><rect x='0.6' y='0.6' width='30.8' height='30.8' rx='8.4' fill='#15110d' stroke='rgba(240,231,214,0.14)'/><path d='M8 9v14h7' fill='none' stroke='#e3b566' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/><path d='M24 10l-7 12' stroke='#e3b566' stroke-width='1.8' stroke-linecap='round' opacity='0.55'/><circle cx='24' cy='10' r='1.5' fill='#e3b566'/><circle cx='17' cy='22' r='1.5' fill='#e3b566' opacity='0.55'/></svg>`
  );

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 30,
          backgroundColor: "#0a0908",
          backgroundImage:
            "radial-gradient(52% 55% at 14% 8%, rgba(227,181,102,0.20), transparent 60%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MONOGRAM} width={56} height={56} alt="" />
          <div style={{ color: "#fcf8f0", fontSize: 30, fontWeight: 600 }}>{site.name}</div>
        </div>

        <div
          style={{
            color: "#fcf8f0",
            fontSize: 74,
            fontWeight: 600,
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            maxWidth: 1000,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          Your LLM bill is&nbsp;<span style={{ color: "#e3b566" }}>40–70% larger</span>
          &nbsp;than it needs to be.
        </div>

        <div style={{ color: "#9a9082", fontSize: 28, display: "flex" }}>
          A $750 assessment that finds exactly where inference spend leaks.
        </div>
      </div>
    ),
    { ...size }
  );
}
