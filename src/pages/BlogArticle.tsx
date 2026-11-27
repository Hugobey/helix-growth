import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import seo from "../blog/seo.json";
import { ArticleBlocks } from "../blog/markdown";
import { formatDate, headingsIn } from "../blog/parse";
import { postBySlug } from "../blog/posts";
import { caseBySlug } from "../content";
import { Reveal } from "../components/Reveal";
import { usePageMeta } from "../lib/meta";
import { SITE_ORIGIN } from "../lib/site";
import { useReducedMotion } from "framer-motion";

const relatedSlugs = ["prose", "perifit", "wizz"] as const;

function ReadingProgress() {
  const reduce = useReducedMotion();
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const node = document.getElementById("article-body");
      if (!node) return;
      const start = node.offsetTop;
      const height = node.offsetHeight - window.innerHeight * 0.4;
      const next = height <= 0 ? 1 : Math.min(1, Math.max(0, (window.scrollY - start) / height));
      setScale(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  if (reduce) return null;
  return <div className="reading-progress" style={{ transform: `scaleX(${scale})` }} aria-hidden="true" />;
}

function Title({ title }: { title: string }) {
  const split = title.indexOf(". ");
  if (split === -1) return title;
  return (
    <>
      <span>{title.slice(0, split + 1)} </span>
      <span className="text-mute">{title.slice(split + 2)}</span>
    </>
  );
}

export function BlogArticle() {
  const { slug } = useParams();
  const post = postBySlug(slug);
  const headings = useMemo(() => (post ? headingsIn(post.blocks) : []), [post]);
  const articleLd = seo.article.jsonLd;

  usePageMeta(
    post?.seoTitle ?? "Article — Helix Growth",
    post?.description ?? seo.blogIndex.description,
    post ? `${SITE_ORIGIN}/blog/${post.slug}` : `${SITE_ORIGIN}/blog`,
    post ? articleLd : undefined,
    post
      ? {
          ogTitle: seo.article.og.title,
          ogDescription: seo.article.og.description,
          ogImage: seo.article.og.image,
          ogImageAlt: seo.article.og["image:alt"],
          ogImageWidth: seo.article.og["image:width"],
          ogImageHeight: seo.article.og["image:height"],
          ogType: seo.article.og.type,
          twitterTitle: seo.article.twitter.title,
          twitterDescription: seo.article.twitter.description,
          twitterImage: seo.article.twitter.image,
          robots: seo.article.robots,
          published: post.datePublished,
          modified: post.dateModified,
          author: post.author,
          rss: true,
        }
      : { robots: "noindex", rss: true },
  );

  if (!post) {
    return (
      <main id="main" className="mx-auto max-w-page px-6 py-24 md:px-10">
        <h1 className="font-display text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.95]">This article isn't here.</h1>
        <Link className="mt-6 inline-block underline underline-offset-4" to="/blog">All articles</Link>
      </main>
    );
  }

  const related = relatedSlugs.map((item) => caseBySlug(item)).filter((item) => item !== undefined);

  return (
    <main id="main">
      <ReadingProgress />
      <article>
        <header>
          <div className="relative mx-auto max-w-page px-6 pb-4 pt-14 md:px-10 md:pt-20">
            <Reveal>
              <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
                <Link to="/blog" className="underline decoration-ink/20 underline-offset-4">Blog</Link>
                <span aria-hidden="true"> · </span>
                <span>{post.category}</span>
              </nav>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-tide">{post.category}</p>
              <h1 className="mt-3 max-w-[18ch] font-display text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.96]">
                <Title title={post.title} />
              </h1>
              <p className="mt-6 max-w-[42rem] text-[1.2rem] leading-relaxed text-mute">{post.excerpt}</p>
              <p className="mt-6 flex items-center gap-3 text-[15px]">
                <img src="/assets/hugo.jpg" alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
                <span>
                  {post.author}
                  <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
                    <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                    <span aria-hidden="true"> · </span>
                    {post.readingTime}
                  </span>
                </span>
              </p>
            </Reveal>
          </div>
        </header>

        <div className="mx-auto max-w-page px-6 md:px-10">
          <img
            src={post.cover}
            srcSet={`${post.cover.replace(/\.webp$/, "-800.webp")} 800w, ${post.cover} 1600w`}
            sizes="(min-width: 1280px) 1120px, calc(100vw - 3rem)"
            width={1600}
            height={900}
            alt={post.coverAlt}
            fetchPriority="high"
            className="aspect-video w-full rounded-[1.25rem] object-cover"
          />
        </div>

        <div className="article-layout mx-auto max-w-page px-6 pb-8 md:px-10">
          <nav className="article-toc" aria-label="On this page">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-tide">On this page</p>
            <ol>
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`}>{heading.text}</a>
                </li>
              ))}
            </ol>
          </nav>
          <details className="article-toc-mobile">
            <summary>On this page</summary>
            <ol>
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`}>{heading.text}</a>
                </li>
              ))}
            </ol>
          </details>
          <div id="article-body" className="article-body">
            <ArticleBlocks blocks={post.blocks} />
            <section className="article-related" aria-labelledby="related-cases">
              <h2 id="related-cases">Related case studies</h2>
              <ul className="article-list">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link to={`/case-studies/${item.slug}`}>
                      {item.name}
                      <span className="mt-1 block text-mute">{item.headline}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
