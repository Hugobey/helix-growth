import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { lexer } from "marked";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const origin = "https://helixgrowth.io";

const captions = {
  "growth-models": "Two ways to build a growing business.",
  "two-apps": "Same acquisition, different foundation. Illustrative.",
  "growth-loop": "The loop: acquisition, activation, retention, referral.",
};

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function frontMatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error("Blog post is missing front matter.");
  const fields = {};
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

function blocksFromMarkdown(body) {
  const pattern = /<!--\s*(?:figure:\s*([a-z0-9-]+)|block:\s*([a-z0-9-]+)|\/block)\s*-->/g;
  const blocks = [];
  let mode = "markdown";
  let cursor = 0;
  for (const match of body.matchAll(pattern)) {
    pushChunk(blocks, mode, body.slice(cursor, match.index));
    if (match[1]) blocks.push({ type: "figure", name: match[1] });
    else if (match[2] === "takeaways" || match[2] === "faq") mode = match[2];
    else mode = "markdown";
    cursor = (match.index ?? 0) + match[0].length;
  }
  pushChunk(blocks, mode, body.slice(cursor));
  return blocks;
}

function pushChunk(blocks, mode, chunk) {
  if (!chunk.trim()) return;
  if (mode === "markdown") blocks.push({ type: "markdown", text: chunk });
  else blocks.push({ type: mode, text: chunk });
}

function loadPosts() {
  const dir = join(root, "src/blog/posts");
  return readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const { fields, body } = frontMatter(readFileSync(join(dir, name), "utf8"));
      return { ...fields, blocks: blocksFromMarkdown(body) };
    })
    .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
}

function loadSite() {
  const source = readFileSync(join(root, "src/content.ts"), "utf8");
  const cal = source.match(/export const CAL = "([^"]+)"/)?.[1];
  if (!cal) throw new Error("CAL is missing from src/content.ts.");
  const studies = new Map();
  const pattern = /slug: "(wizz|prose|perifit)"[\s\S]*?name: "([^"]+)"[\s\S]*?headline: "([^"]+)"/g;
  for (const match of source.matchAll(pattern)) {
    studies.set(match[1], { slug: match[1], name: match[2], headline: match[3] });
  }
  for (const slug of ["prose", "perifit", "wizz"]) {
    if (!studies.has(slug)) throw new Error(`Case study ${slug} is missing from src/content.ts.`);
  }
  return { cal, studies };
}

function isPullQuote(token) {
  const meaningful = (token.tokens ?? []).filter((item) => item.type !== "text" || item.text.trim() !== "");
  return meaningful.length === 1 && meaningful[0].type === "strong";
}

function inlineHtml(tokens, cal) {
  if (!tokens) return "";
  return tokens.map((token) => renderInline(token, cal)).join("");
}

function renderInline(token, cal) {
  const nested = token.tokens;
  if (token.type === "text" || token.type === "paragraph") return nested ? inlineHtml(nested, cal) : esc(token.text ?? "");
  if (token.type === "strong") return `<strong>${inlineHtml(nested, cal)}</strong>`;
  if (token.type === "em") return `<em>${inlineHtml(nested, cal)}</em>`;
  if (token.type === "br") return "<br />";
  if (token.type === "escape") return esc(token.text ?? "");
  if (token.type === "codespan") return `<code>${esc(token.text ?? "")}</code>`;
  if (token.type === "link") return linkHtml(token.href, token.text, inlineHtml(nested, cal), cal);
  return esc(token.text ?? "");
}

function linkHtml(href, label, inner, cal) {
  if (label === "Let's grow your app") {
    return `<a class="bg-accent" href="${esc(cal)}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
  }
  if (href.startsWith("/")) return `<a href="${esc(href)}">${inner}</a>`;
  return `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
}

function headingsIn(blocks) {
  const headings = [];
  const seen = new Map();
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

function markdownHtml(text, ids, cal) {
  return lexer(text)
    .map((token) => {
      if (token.type === "space") return "";
      if (token.type === "paragraph") {
        if (isPullQuote(token)) return `<p class="article-pull">${inlineHtml(token.tokens, cal)}</p>`;
        const only = (token.tokens ?? []).filter((item) => item.type !== "text" || item.text.trim() !== "");
        const className = only.length === 1 && only[0].type === "link" && only[0].text === "Let's grow your app" ? ` class="article-cta"` : "";
        return `<p${className}>${inlineHtml(token.tokens, cal)}</p>`;
      }
      if (token.type === "heading") {
        if (token.depth === 3) return `<h3>${inlineHtml(token.tokens, cal)}</h3>`;
        return `<h2 id="${esc(slugify(token.text))}">${inlineHtml(token.tokens, cal)}</h2>`;
      }
      if (token.type === "list") {
        const items = token.items.map((item) => `<li>${inlineHtml(item.tokens, cal)}</li>`).join("");
        return `<ul class="article-list">${items}</ul>`;
      }
      if (token.type === "hr") return "<hr />";
      return "";
    })
    .join("");
}

function namespaceSvg(svg, suffix) {
  return svg
    .replace(/\bid="([^"]+)"/g, (_, id) => `id="${id}${suffix}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${id}${suffix})`)
    .replace(/\b(?:href|xlink:href)="#([^"]+)"/g, (match, id) => match.replace(`#${id}`, `#${id}${suffix}`));
}

function figureHtml(slug, name) {
  const dir = join(root, "src/blog/figures", slug);
  const desktop = readFileSync(join(dir, `${name}.svg`), "utf8");
  const mobile = readFileSync(join(dir, `${name}-mobile.svg`), "utf8");
  const caption = captions[name] ?? "";
  return `<figure class="article-figure"><div class="article-figure-desktop">${namespaceSvg(desktop, "-d")}</div><div class="article-figure-mobile">${namespaceSvg(mobile, "-m")}</div><figcaption>${esc(caption)}</figcaption></figure>`;
}

function blocksHtml(post, ids, cal) {
  return post.blocks
    .map((block) => {
      if (block.type === "figure") return figureHtml(post.slug, block.name);
      if (block.type === "takeaways") {
        const tokens = lexer(block.text);
        const first = tokens.find((token) => token.type === "paragraph" && isPullQuote(token));
        const rest = first ? tokens.filter((token) => token !== first) : tokens;
        const title = first ? `<p class="article-takeaways-title">${inlineHtml(first.tokens, cal)}</p>` : "";
        return `<aside class="article-takeaways">${title}${rest.map((token) => markdownHtml(token.raw ?? "", ids, cal)).join("")}</aside>`;
      }
      if (block.type === "faq") return `<section class="article-faq">${markdownHtml(block.text, ids, cal)}</section>`;
      return markdownHtml(block.text, ids, cal);
    })
    .join("");
}

function titleHtml(title) {
  const split = title.indexOf(". ");
  if (split === -1) return esc(title);
  return `<span>${esc(title.slice(0, split + 1))} </span><span class="text-mute">${esc(title.slice(split + 2))}</span>`;
}

function tocHtml(headings, details) {
  const items = headings.map((heading) => `<li><a href="#${esc(heading.id)}">${esc(heading.text)}</a></li>`).join("");
  if (details) return `<details class="article-toc-mobile"><summary>On this page</summary><ol>${items}</ol></details>`;
  return `<nav class="article-toc" aria-label="On this page"><p>On this page</p><ol>${items}</ol></nav>`;
}

function relatedHtml(studies) {
  const items = ["prose", "perifit", "wizz"]
    .map((slug) => {
      const study = studies.get(slug);
      return `<li><a href="/case-studies/${esc(study.slug)}">${esc(study.name)}<span class="text-mute">${esc(study.headline)}</span></a></li>`;
    })
    .join("");
  return `<section class="article-related" aria-labelledby="related-cases"><h2 id="related-cases">Related case studies</h2><ul class="article-list">${items}</ul></section>`;
}

function articleDocument(post, studies, cal) {
  const headings = headingsIn(post.blocks);
  const ids = { next: 0, values: headings.map((heading) => heading.id) };
  const coverSmall = post.cover.replace(/\.webp$/, "-800.webp");
  return `<main id="main"><article><header><nav aria-label="Breadcrumb"><a href="/blog">Blog</a> · ${esc(post.category)}</nav><p>${esc(post.category)}</p><h1>${titleHtml(post.title)}</h1><p>${esc(post.excerpt)}</p><p><img src="/assets/hugo.jpg" alt="" width="44" height="44" /> ${esc(post.author)} <time datetime="${esc(post.datePublished)}">${esc(formatDate(post.datePublished))}</time> · ${esc(post.readingTime)}</p></header><img src="${esc(post.cover)}" srcset="${esc(coverSmall)} 800w, ${esc(post.cover)} 1600w" sizes="(min-width: 1280px) 1120px, calc(100vw - 3rem)" width="1600" height="900" alt="${esc(post.coverAlt)}" fetchpriority="high" /><div class="article-layout">${tocHtml(headings, false)}${tocHtml(headings, true)}<div id="article-body" class="article-body">${blocksHtml(post, ids, cal)}${relatedHtml(studies)}</div></div></article></main>`;
}

function indexDocument(posts, blog) {
  const articles = posts
    .map((post) => {
      const coverSmall = post.cover.replace(/\.webp$/, "-800.webp");
      return `<article><a href="/blog/${esc(post.slug)}"><img src="${esc(post.cover)}" srcset="${esc(coverSmall)} 800w, ${esc(post.cover)} 1600w" sizes="(min-width: 1024px) 560px, calc(100vw - 3rem)" width="1600" height="900" alt="${esc(post.coverAlt)}" loading="lazy" /><p>${esc(post.category)}</p><h2>${esc(post.title)}</h2><p>${esc(post.excerpt)}</p><p><time datetime="${esc(post.datePublished)}">${esc(formatDate(post.datePublished))}</time> · ${esc(post.readingTime)}</p><p>Read article</p></a></article>`;
    })
    .join("");
  return `<main id="main"><header><p>Blog</p><h1>${esc(blog.h1)}</h1><p>${esc(blog.description)}</p></header>${articles}</main>`;
}

function setMeta(html, attr, key, value) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`<meta\\s+${attr}="${escapedKey}"\\s+content="[^"]*"\\s*/?>`);
  const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function applyHead(html, meta) {
  let next = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
  next = next.replace(/(<link\s+rel="canonical"\s+href=")[^"]*("\s*\/?>)/, `$1${esc(meta.canonical)}$2`);
  next = setMeta(next, "name", "description", meta.description);
  next = setMeta(next, "name", "robots", meta.robots);
  for (const [key, value] of Object.entries(meta.properties)) next = setMeta(next, "property", key, value);
  for (const [key, value] of Object.entries(meta.names)) next = setMeta(next, "name", key, value);
  const ld = JSON.stringify(meta.jsonLd).replace(/</g, "\\u003c");
  if (!/<script type="application\/ld\+json">/.test(next)) throw new Error("Home JSON-LD block is missing.");
  next = next.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json" data-page-ld="true">${ld}</script>`,
  );
  if (!next.includes('rel="alternate"')) {
    next = next.replace(
      "</head>",
      `    <link rel="alternate" type="application/rss+xml" title="Helix Growth blog" href="${origin}/blog/rss.xml" />\n  </head>`,
    );
  }
  if (!next.includes('<div id="root"></div>')) throw new Error("Built index.html has no empty #root.");
  return next.replace('<div id="root"></div>', `<div id="root">${meta.body}</div>`);
}

function writeBoth(relativePath, contents) {
  for (const base of ["public", "dist"]) {
    const target = join(root, base, relativePath);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, contents);
  }
}

function sitemap(posts) {
  const urls = ["/", "/case-studies", "/case-studies/wizz", "/case-studies/prose", "/case-studies/perifit", "/pricing", "/methodology", "/growth-sprint", "/blog"];
  const body = [
    ...urls.map((path) => `  <url><loc>${origin}${path}</loc></url>`),
    ...posts.map((post) => `  <url><loc>${origin}/blog/${post.slug}</loc><lastmod>${post.dateModified}</lastmod></url>`),
  ].join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function rss(posts, blog) {
  const items = posts
    .map((post) => {
      const [year, month, day] = post.datePublished.split("-").map(Number);
      const pubDate = new Date(Date.UTC(year, month - 1, day)).toUTCString();
      const link = `${origin}/blog/${post.slug}`;
      return `    <item>\n      <title>${esc(post.title)}</title>\n      <link>${link}</link>\n      <guid>${link}</guid>\n      <pubDate>${pubDate}</pubDate>\n      <description>${esc(post.excerpt)}</description>\n    </item>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>Helix Growth blog</title>\n    <link>${origin}/blog</link>\n    <description>${esc(blog.description)}</description>\n${items}\n  </channel>\n</rss>\n`;
}

function assertPage(html, expectations) {
  for (const expected of expectations) {
    if (!html.includes(expected)) throw new Error(`Prerender is missing: ${expected}`);
  }
  const titles = html.match(/<title>/g) ?? [];
  if (titles.length !== 1) throw new Error("Prerender title is duplicated.");
  const images = html.match(/property="og:image"/g) ?? [];
  if (images.length !== 1) throw new Error("Prerender og:image is duplicated.");
  const ld = html.match(/application\/ld\+json/g) ?? [];
  if (ld.length !== 1) throw new Error("Prerender JSON-LD is duplicated.");
  if (html.includes("FAQPage")) throw new Error("Prerender must not add FAQPage structured data.");
  const h1 = html.match(/<h1[\s>]/g) ?? [];
  if (h1.length !== 1) throw new Error(`Expected one H1, found ${h1.length}.`);
}

const shell = readFileSync(join(root, "dist/index.html"), "utf8");
const seo = JSON.parse(readFileSync(join(root, "src/blog/seo.json"), "utf8"));
const posts = loadPosts();
const { cal, studies } = loadSite();
if (posts.length === 0) throw new Error("No blog posts to prerender.");

const indexLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: seo.blogIndex.title,
  headline: seo.blogIndex.h1,
  description: seo.blogIndex.description,
  url: seo.blogIndex.url,
  blogPost: posts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    url: `${origin}/blog/${post.slug}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
  })),
};

const indexHtml = applyHead(shell, {
  title: seo.blogIndex.title,
  description: seo.blogIndex.description,
  canonical: seo.blogIndex.canonical,
  robots: "index,follow",
  properties: {
    "og:type": "website",
    "og:title": seo.blogIndex.title,
    "og:description": seo.blogIndex.description,
    "og:url": seo.blogIndex.canonical,
    "og:image": `${origin}${posts[0].ogImage}`,
    "og:site_name": "Helix Growth",
  },
  names: {
    "twitter:card": "summary_large_image",
    "twitter:title": seo.blogIndex.title,
    "twitter:description": seo.blogIndex.description,
    "twitter:image": `${origin}${posts[0].ogImage}`,
  },
  jsonLd: indexLd,
  body: indexDocument(posts, seo.blogIndex),
});

mkdirSync(join(root, "dist/blog"), { recursive: true });
writeFileSync(join(root, "dist/blog/index.html"), indexHtml);
assertPage(indexHtml, [seo.blogIndex.title, seo.blogIndex.canonical, seo.blogIndex.h1, "Read article", posts[0].title]);

for (const post of posts) {
  const article = seo.article.canonical.endsWith(`/blog/${post.slug}`) ? seo.article : null;
  if (!article) throw new Error(`seo.json has no article entry for ${post.slug}.`);
  const page = applyHead(shell, {
    title: article.title,
    description: article.description,
    canonical: article.canonical,
    robots: article.robots,
    properties: {
      "og:type": article.og.type,
      "og:title": article.og.title,
      "og:description": article.og.description,
      "og:url": article.og.url,
      "og:image": article.og.image,
      "og:image:width": String(article.og["image:width"]),
      "og:image:height": String(article.og["image:height"]),
      "og:image:alt": article.og["image:alt"],
      "og:site_name": article.og.site_name,
      "article:published_time": post.datePublished,
      "article:modified_time": post.dateModified,
      "article:author": post.author,
    },
    names: {
      "twitter:card": article.twitter.card,
      "twitter:title": article.twitter.title,
      "twitter:description": article.twitter.description,
      "twitter:image": article.twitter.image,
    },
    jsonLd: article.jsonLd,
    body: articleDocument(post, studies, cal),
  });
  const dir = join(root, "dist/blog", post.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), page);
  assertPage(page, [
    article.title,
    article.canonical,
    article.og.image,
    "BlogPosting",
    "Most founders are trying to solve a product problem with a marketing solution.",
    "Two ways to build a growing business.",
    "Same acquisition, different foundation. Illustrative.",
    "The loop: acquisition, activation, retention, referral.",
    "What is product-led growth for a mobile app?",
    "Related case studies",
    'href="/case-studies/prose"',
    'href="/case-studies/perifit"',
    'href="/case-studies/wizz"',
    'href="/methodology"',
    `href="${cal}"`,
    post.coverAlt,
  ]);
}

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;
writeBoth("sitemap.xml", sitemap(posts));
writeBoth("robots.txt", robots);
writeBoth("blog/rss.xml", rss(posts, seo.blogIndex));
