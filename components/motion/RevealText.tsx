"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Line-mask headline reveal: each line rises from behind an overflow-clip with
 * a staggered spring — the signature premium hero animation. Pass the headline
 * pre-split into visual lines. Reduced-motion shows them instantly.
 */
export default function RevealText({
  lines,
  className,
  as: Tag = "h1",
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  as?: "h1" | "h2";
  delay?: number;
}) {
  const reduce = useReducedMotion();

  const lineVariants: Variants = {
    hidden: { y: reduce ? "0%" : "115%" },
    show: (i: number) => ({
      y: "0%",
      transition: {
        duration: reduce ? 0 : 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay: reduce ? 0 : delay + i * 0.09,
      },
    }),
  };

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block will-change-transform"
            custom={i}
            variants={lineVariants}
            initial="hidden"
            animate="show"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
