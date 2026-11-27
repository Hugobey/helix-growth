import { useEffect } from "react";
import { SITE_ORIGIN } from "./site";

export type PageMetaOptions = {
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  robots?: string;
  published?: string;
  modified?: string;
  author?: string;
  rss?: boolean;
};

type MetaSnapshot = { node: Element; created: boolean; previous: string | null };

function setMeta(attr: "name" | "property", key: string, value: string) {
  const selector = `meta[${attr}="${key}"]`;
  let node = document.head.querySelector(selector);
  const created = !node;
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute(attr, key);
    document.head.appendChild(node);
  }
  const previous = node.getAttribute("content");
  node.setAttribute("content", value);
  return { node, created, previous } satisfies MetaSnapshot;
}

export function usePageMeta(
  title: string,
  description: string,
  canonical: string,
  jsonLd?: unknown,
  options?: PageMetaOptions,
) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const snapshots = [
      setMeta("name", "description", description),
      setMeta("property", "og:title", options?.ogTitle ?? title),
      setMeta("property", "og:description", options?.ogDescription ?? description),
      setMeta("property", "og:url", canonical),
      setMeta("name", "twitter:title", options?.twitterTitle ?? title),
      setMeta("name", "twitter:description", options?.twitterDescription ?? description),
    ];

    if (options?.ogImage) snapshots.push(setMeta("property", "og:image", options.ogImage));
    if (options?.ogImageAlt) snapshots.push(setMeta("property", "og:image:alt", options.ogImageAlt));
    if (options?.ogImageWidth) snapshots.push(setMeta("property", "og:image:width", String(options.ogImageWidth)));
    if (options?.ogImageHeight) snapshots.push(setMeta("property", "og:image:height", String(options.ogImageHeight)));
    if (options?.ogType) snapshots.push(setMeta("property", "og:type", options.ogType));
    if (options?.twitterImage) snapshots.push(setMeta("name", "twitter:image", options.twitterImage));
    if (options?.robots) snapshots.push(setMeta("name", "robots", options.robots));
    if (options?.published) snapshots.push(setMeta("property", "article:published_time", options.published));
    if (options?.modified) snapshots.push(setMeta("property", "article:modified_time", options.modified));
    if (options?.author) snapshots.push(setMeta("property", "article:author", options.author));

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    const previousCanonical = canonicalLink?.getAttribute("href") ?? null;
    if (canonicalLink) canonicalLink.setAttribute("href", canonical);

    let rss: HTMLLinkElement | null = null;
    if (options?.rss) {
      rss = document.createElement("link");
      rss.rel = "alternate";
      rss.type = "application/rss+xml";
      rss.href = `${SITE_ORIGIN}/blog/rss.xml`;
      rss.title = "Helix Growth blog";
      document.head.appendChild(rss);
    }

    let createdLd = false;
    let ld = document.querySelector("script[data-page-ld]");
    if (jsonLd) {
      if (!ld) {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.dataset.pageLd = "true";
        document.head.appendChild(script);
        ld = script;
        createdLd = true;
      }
      ld.textContent = JSON.stringify(jsonLd);
    } else if (ld) {
      ld.remove();
      ld = null;
    }

    return () => {
      document.title = previousTitle;
      for (const snapshot of snapshots) {
        if (snapshot.created) snapshot.node.remove();
        else if (snapshot.previous === null) snapshot.node.removeAttribute("content");
        else snapshot.node.setAttribute("content", snapshot.previous);
      }
      if (canonicalLink && previousCanonical) canonicalLink.setAttribute("href", previousCanonical);
      rss?.remove();
      if (createdLd) ld?.remove();
      else if (ld && jsonLd) ld.remove();
    };
  }, [
    title,
    description,
    canonical,
    jsonLd,
    options?.ogTitle,
    options?.ogDescription,
    options?.ogImage,
    options?.ogImageAlt,
    options?.ogImageWidth,
    options?.ogImageHeight,
    options?.ogType,
    options?.twitterTitle,
    options?.twitterDescription,
    options?.twitterImage,
    options?.robots,
    options?.published,
    options?.modified,
    options?.author,
    options?.rss,
  ]);
}
