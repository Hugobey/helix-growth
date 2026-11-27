import { useMemo } from "react";
import { Link } from "react-router-dom";
import seo from "../blog/seo.json";
import { allPosts } from "../blog/posts";
import { formatDate } from "../blog/parse";
import { CAL } from "../content";
import { HelixMark, StrandField } from "../components/Helix";
import { Reveal } from "../components/Reveal";
import { usePageMeta } from "../lib/meta";
import { SITE_ORIGIN } from "../lib/site";

const posts = allPosts();

export function Blog() {
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Blog",
      name: seo.blogIndex.title,
      headline: seo.blogIndex.h1,
      description: seo.blogIndex.description,
      url: seo.blogIndex.url,
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        url: `${SITE_ORIGIN}/blog/${post.slug}`,
        datePublished: post.datePublished,
        dateModified: post.dateModified,
      })),
    }),
    [],
  );

  usePageMeta(seo.blogIndex.title, seo.blogIndex.description, seo.blogIndex.canonical, jsonLd, {
    ogType: "website",
    ogImage: `${SITE_ORIGIN}${posts[0]?.ogImage ?? "/assets/og.jpg"}`,
    twitterImage: `${SITE_ORIGIN}${posts[0]?.ogImage ?? "/assets/og.jpg"}`,
    robots: "index,follow",
    rss: true,
  });

  return (
    <main id="main">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 overflow-hidden md:h-48" aria-hidden="true">
          <StrandField />
        </div>
        <div className="relative mx-auto max-w-page px-6 pb-6 pt-16 md:px-10 md:pt-24">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">Blog</p>
            <h1 className="mt-4 max-w-[16ch] font-display text-[clamp(2.8rem,6vw,4.8rem)] leading-[0.94]">{seo.blogIndex.h1}</h1>
            <p className="mt-6 max-w-[46ch] text-[1.08rem] leading-relaxed">{seo.blogIndex.description}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-page px-6 pb-8 md:px-10" aria-label="Articles">
        {posts.map((post, index) => (
          <article key={post.slug} className={index === 0 ? "py-14 md:py-20" : "border-t border-ink/10 py-14 md:py-20"}>
            <Link to={`/blog/${post.slug}`} className="group grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <div className="overflow-hidden rounded-[1.25rem]">
                <img
                  src={post.cover}
                  srcSet={`${post.cover.replace(/\.webp$/, "-800.webp")} 800w, ${post.cover} 1600w`}
                  sizes="(min-width: 1024px) 560px, calc(100vw - 3rem)"
                  width={1600}
                  height={900}
                  alt={post.coverAlt}
                  className="aspect-video w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-tide">{post.category}</p>
                <h2 className="mt-3 font-display text-[clamp(2rem,3.6vw,3.15rem)] leading-[1.02]">{post.title}</h2>
                <p className="mt-4 max-w-[42ch] text-[1.05rem] leading-relaxed text-mute">{post.excerpt}</p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
                  <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                  <span aria-hidden="true"> · </span>
                  {post.readingTime}
                </p>
                <p className="mt-6 text-[15px] underline decoration-ink/30 underline-offset-4 group-hover:decoration-ink">Read article</p>
              </div>
            </Link>
          </article>
        ))}
      </section>

      <section className="on-graphite wash-host-dark wash-shift relative overflow-hidden text-ground">
        <StrandField tone="dark" />
        <div className="relative mx-auto max-w-page px-6 py-16 md:px-10 md:py-24">
          <HelixMark className="mb-8 w-full max-w-md text-ground/50" />
          <h2 className="max-w-[12ch] font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.94]">Bring a live product.</h2>
          <p className="mt-5 max-w-[36ch] text-[1.05rem] leading-relaxed text-foam">
            We'll read the behavior behind the numbers, and the product decision that follows.
          </p>
          <a className="mt-8 inline-flex min-h-11 items-center rounded-md bg-accent px-5 py-3 text-[15px] text-ink hover:bg-accent-hover" href={CAL} target="_blank" rel="noopener noreferrer">
            Let's grow your app
          </a>
        </div>
      </section>
    </main>
  );
}
