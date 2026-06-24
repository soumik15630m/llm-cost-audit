"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { navLinks } from "./nav-links";

/**
 * Mobile navigation island - the only interactive part of the header.
 * Keeps the rest of the header as a Server Component (minimal client JS).
 */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the overlay is open; restore on close/unmount.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--hairline-strong)] text-body"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
          {open ? (
            <path
              d="M3 3l12 12M15 3L3 15"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M2 5h14M2 9h14M2 13h14"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-[var(--header-h,4rem)] z-40 border-t border-[var(--hairline)] bg-ink/95 backdrop-blur-md"
        >
          <nav className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-body hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-full"
            >
              Book an assessment
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
