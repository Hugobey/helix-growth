import { useEffect } from "react";

function setMeta(selector: string, attr: string, value: string) {
  const node = document.querySelector(selector);
  if (node) node.setAttribute(attr, value);
}

export function usePageMeta(title: string, description: string, canonical: string, jsonLd?: unknown) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", canonical);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    const link = document.querySelector('link[rel="canonical"]');
    if (link) link.setAttribute("href", canonical);

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.pageLd = "true";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => script?.remove();
  }, [title, description, canonical, jsonLd]);
}
