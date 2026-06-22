/**
 * Custom line-icon set — drawn specifically for this site (consistent 1.6px
 * rounded strokes, currentColor). Replaces unicode arrows / ▸ / + so nothing
 * reads as a stock glyph.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 20, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12h15" />
    <path d="M13 6l6 6-6 6" />
  </Base>
);

export const ArrowUpRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </Base>
);

export const Download = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4v11" />
    <path d="M7 11l5 5 5-5" />
    <path d="M5 20h14" />
  </Base>
);

export const Plus = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </Base>
);

/** Uncached repeated context — overlapping stacked frames re-sent each call. */
export const IconCache = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="3.5" width="11" height="11" rx="2" />
    <path d="M9.5 17.5a4 4 0 0 0 4 4h3a4 4 0 0 0 4-4v-3a4 4 0 0 0-4-4" />
  </Base>
);

/** Over-powered models — descending tiers. */
export const IconTier = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 6h14" />
    <path d="M6.5 12h11" />
    <path d="M8.5 18h7" />
  </Base>
);

/** No batching — a grid of async jobs. */
export const IconBatch = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="4" width="6" height="6" rx="1.4" />
    <rect x="14" y="4" width="6" height="6" rx="1.4" />
    <rect x="4" y="14" width="6" height="6" rx="1.4" />
    <path d="M14 17h6M17 14v6" />
  </Base>
);

/** Unmanaged context growth — expanding outward. */
export const IconContext = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 4H5a1 1 0 0 0-1 1v4" />
    <path d="M4 15v4a1 1 0 0 0 1 1h4" />
    <path d="M15 20h4a1 1 0 0 0 1-1v-4" />
    <path d="M20 9V5a1 1 0 0 0-1-1h-4" />
    <path d="M8.5 12h7" />
  </Base>
);

/** Confidentiality. */
export const IconLock = (p: IconProps) => (
  <Base {...p}>
    <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    <path d="M12 14.5v2.5" />
  </Base>
);

export const Check = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 12.5l5 5 10-11" />
  </Base>
);

/** Brand monogram — a stylized falling-cost meridian inside a ring. */
export const Monogram = ({ size = 28, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden {...p}>
    <rect x="0.6" y="0.6" width="30.8" height="30.8" rx="8.4" fill="#15110d" stroke="rgba(240,231,214,0.12)" />
    <path
      d="M8 9v14h7"
      stroke="#e3b566"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M24 10l-7 12" stroke="#e3b566" strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
    <circle cx="24" cy="10" r="1.5" fill="#e3b566" />
    <circle cx="17" cy="22" r="1.5" fill="#e3b566" opacity="0.55" />
  </svg>
);
