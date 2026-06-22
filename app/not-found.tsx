import Link from "next/link";
import Section from "@/components/Section";
import { ArrowRight } from "@/components/icons";

// 404 is non-indexable by default in Next; no metadata noindex needed here.
export default function NotFound() {
  return (
    <Section className="text-center">
      <p className="eyebrow">404</p>
      <h1 className="mx-auto mt-4 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
        That page isn&apos;t here.
      </h1>
      <p className="mx-auto mt-5 max-w-md text-lg text-muted">
        The link may be old or mistyped. The money, however, is still hiding in
        your inference bill.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">
          Back home
        </Link>
        <Link href="/blog" className="btn-ghost">
          Read the writing <ArrowRight size={16} />
        </Link>
      </div>
    </Section>
  );
}
