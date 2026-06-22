import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import Reveal from "@/components/motion/Reveal";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Writing on LLM cost optimization",
  description:
    "Field notes on cutting inference cost: prompt caching, model tiering, the Batch API, context management, and the unit-cost metric that actually proves efficiency.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <Section>
      <Reveal>
        <p className="eyebrow">Writing</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          The mechanics of an LLM bill
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Direct, vendor-neutral notes on where inference spend leaks and how to
          recover it — the same analysis an assessment runs against your real
          usage.
        </p>
      </Reveal>

      {posts.length === 0 ? (
        <p className="mt-12 rounded-xl border border-[var(--hairline)] p-6 text-muted">
          CONTENT PENDING — founder to supply blog posts in{" "}
          <code className="tabular">content/blog/*.md</code>.
        </p>
      ) : (
        <ul className="mt-12 grid gap-5">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.slug} delay={i * 0.06}>
              <Link
                href={`/blog/${post.slug}`}
                className="card group block p-6 transition-colors hover:border-[rgba(227,181,102,0.4)] sm:p-7"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                  <time dateTime={post.date} className="tabular">
                    {formatDate(post.date)}
                  </time>
                  <span aria-hidden>·</span>
                  <span className="tabular">{post.readingTimeMin} min read</span>
                </div>
                <h2 className="mt-3 text-xl font-semibold text-headline transition-colors group-hover:text-accent sm:text-2xl">
                  {post.title}
                </h2>
                <p className="mt-2.5 max-w-3xl leading-relaxed text-body/85">
                  {post.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--hairline)] px-2.5 py-0.5 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      )}
    </Section>
  );
}
