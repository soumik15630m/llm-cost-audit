import { ImageResponse } from "next/og";

// Apple touch icon (Next auto-wires this as <link rel="apple-touch-icon">).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const MONOGRAM =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 32 32'><path d='M9 9v14h7' fill='none' stroke='#e3b566' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><path d='M24 10l-7 12' stroke='#e3b566' stroke-width='2' stroke-linecap='round' stroke-opacity='0.55'/><circle cx='24' cy='10' r='1.7' fill='#e3b566'/><circle cx='17' cy='22' r='1.7' fill='#e3b566' fill-opacity='0.55'/></svg>`
  );

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0908",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={MONOGRAM} width={120} height={120} alt="" />
      </div>
    ),
    { ...size }
  );
}
