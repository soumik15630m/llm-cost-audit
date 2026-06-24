"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Ambient hero backdrop - warm gold drift + faint grid, with a subtle
 * scroll-linked parallax (grid drifts down slower than the page). Pure
 * transform, reduced-motion aware.
 */
export default function AmbientBackground() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 90]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.35]);

  return (
    <div className="ambient" aria-hidden>
      <motion.div className="ambient-grid" style={{ y, opacity }} />
    </div>
  );
}
