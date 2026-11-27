import { lexer, type Tokens } from "marked";

export type Block =
  | { type: "markdown"; text: string }
  | { type: "figure"; name: string }
  | { type: "takeaways"; text: string }
  | { type: "faq"; text: string };

export type Post = {
  title: string;
  seoTitle: string;
  description: string;
  slug: string;
  category: string;
  author: string;
  datePublished: string;
  dateModified: string;
  readingTime: string;
  excerpt: string;
  cover: string;
  coverAlt: string;
  ogImage: string;
  blocks: Block[];
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function frontMatter(source: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error("Blog post is missing front matter.");
  const fields: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const split = line.indexOf(":");
    if (split === -1) continue;
    const key = line.slice(0, split).trim();
    let value = line.slice(split + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    fields[key] = value;
  }
  return { fields, body: match[2] };
}

export function blocksFromMarkdown(body: string): Block[] {
  const pattern = /<!--\s*(?:figure:\s*([a-z0-9-]+)|block:\s*([a-z0-9-]+)|\/block)\s*-->/g;
  const blocks: Block[] = [];
  let mode: "markdown" | "takeaways" | "faq" = "markdown";
  let cursor = 0;
  for (const match of body.matchAll(pattern)) {
    const chunk = body.slice(cursor, match.index);
    pushChunk(blocks, mode, chunk);
    if (match[1]) blocks.push({ type: "figure", name: match[1] });
    else if (match[2] === "takeaways" || match[2] === "faq") mode = match[2];
    else mode = "markdown";
    cursor = (match.index ?? 0) + match[0].length;
  }
  pushChunk(blocks, mode, body.slice(cursor));
  return blocks;
}

function pushChunk(blocks: Block[], mode: "markdown" | "takeaways" | "faq", chunk: string) {
  if (!chunk.trim()) return;
  if (mode === "markdown") blocks.push({ type: "markdown", text: chunk });
  else blocks.push({ type: mode, text: chunk });
}

export function parsePost(source: string): Post {
  const { fields, body } = frontMatter(source);
  return {
    title: fields.title,
    seoTitle: fields.seoTitle,
    description: fields.description,
    slug: fields.slug,
    category: fields.category,
    author: fields.author,
    datePublished: fields.datePublished,
    dateModified: fields.dateModified,
    readingTime: fields.readingTime,
    excerpt: fields.excerpt,
    cover: fields.cover,
    coverAlt: fields.coverAlt,
    ogImage: fields.ogImage,
    blocks: blocksFromMarkdown(body),
  };
}

export function headingsIn(blocks: Block[]) {
  const headings: { id: string; text: string }[] = [];
  const seen = new Map<string, number>();
  for (const block of blocks) {
    if (block.type !== "markdown" && block.type !== "faq") continue;
    for (const token of lexer(block.text)) {
      if (token.type !== "heading" || token.depth !== 2) continue;
      const base = slugify(token.text);
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      headings.push({ id: count === 0 ? base : `${base}-${count + 1}`, text: token.text });
    }
  }
  return headings;
}

export function isPullQuote(token: Tokens.Paragraph) {
  const meaningful = (token.tokens ?? []).filter((item) => item.type !== "text" || item.text.trim() !== "");
  return meaningful.length === 1 && meaningful[0].type === "strong";
}
