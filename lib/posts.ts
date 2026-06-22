/**
 * Founder-supplied content ingestion.
 *
 * Blog posts live in content/blog/*.md with YAML frontmatter
 * (title, description, slug, date, tags). Legal docs live in content/legal/*.md.
 * Parsed at build time (these pages are fully static).
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const LEGAL_DIR = path.join(process.cwd(), "content", "legal");

export type PostFrontmatter = {
  title: string;
  description: string;
  slug: string;
  date: string;
  tags: string[];
};

export type Post = PostFrontmatter & {
  content: string;
  readingTimeMin: number;
};

/** ~225 wpm reading speed, rounded up, floored at 1 minute. */
function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
}

function safeListDir(dir: string): string[] {
  try {
    return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
}

/** Read + parse a single blog file. Returns null if frontmatter is incomplete. */
function readPostFile(filename: string): Post | null {
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const slug = (data.slug as string) || filename.replace(/\.md$/, "");
  if (!data.title || !data.date) return null;
  return {
    title: data.title,
    description: data.description ?? "",
    slug,
    date: data.date,
    tags: Array.isArray(data.tags) ? data.tags : [],
    content,
    readingTimeMin: readingTime(content),
  };
}

/** All posts, newest first. */
export function getAllPosts(): Post[] {
  return safeListDir(BLOG_DIR)
    .map(readPostFile)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export type LegalDoc = {
  title: string;
  content: string;
  /** True when no source file exists — page renders a clear placeholder. */
  pending: boolean;
  /** Path to the raw source file under /content (for download links). */
  sourceFile: string;
};

/**
 * Load a legal document by name (privacy | terms | nda). If the founder hasn't
 * supplied the file yet, return a clearly-marked placeholder and keep the build
 * passing — never invent legal text.
 */
export function getLegalDoc(name: "privacy" | "terms" | "nda", title: string): LegalDoc {
  const file = path.join(LEGAL_DIR, `${name}.md`);
  try {
    const raw = fs.readFileSync(file, "utf8");
    const { data, content } = matter(raw);
    return {
      title: (data.title as string) || title,
      content,
      pending: false,
      sourceFile: `/content/legal/${name}.md`,
    };
  } catch {
    return {
      title,
      pending: true,
      sourceFile: `/content/legal/${name}.md`,
      content: [
        `# ${title}`,
        "",
        "> **CONTENT PENDING — founder to supply.**",
        "",
        `This document has not been provided yet. Drop the finished Markdown at \`content/legal/${name}.md\` and it will render here automatically, with no code changes.`,
        "",
        "Until then, no placeholder legal text is shown, because legal terms must be written by the founder — not generated.",
      ].join("\n"),
    };
  }
}
