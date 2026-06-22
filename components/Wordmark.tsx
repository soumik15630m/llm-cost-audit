import Link from "next/link";
import { site } from "@/lib/site";
import { Monogram } from "./icons";

/** Brand wordmark: custom monogram + the practice name in the display serif. */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label={`${site.name} — home`}
    >
      <Monogram size={28} className="transition-transform duration-300 group-hover:-rotate-3" />
      <span className="font-[family-name:var(--font-display)] text-[1.02rem] font-medium tracking-tight text-headline">
        {site.wordmark}
      </span>
    </Link>
  );
}
