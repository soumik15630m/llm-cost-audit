import Link from "next/link";
import Wordmark from "./Wordmark";
import MobileMenu from "./MobileMenu";
import Magnetic from "./Magnetic";
import { navLinks } from "./nav-links";

/**
 * Sitewide header (Server Component). Wordmark + nav + primary CTA.
 * Sticky, with a hairline border and subtle ink blur on scroll.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--hairline)] bg-ink/80 backdrop-blur-md">
      <div
        className="container-page flex h-16 items-center justify-between"
        style={{ ["--header-h" as string]: "4rem" }}
      >
        <Wordmark />

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-body"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Magnetic className="hidden md:inline-flex" strength={10}>
            <Link href="/contact" className="btn-primary text-sm">
              Book an assessment
            </Link>
          </Magnetic>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
