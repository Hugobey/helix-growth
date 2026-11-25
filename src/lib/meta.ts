import { useEffect } from "react";

export function usePageMeta(title: string, description: string, canonical: string) {
  useEffect(() => {
    document.title = title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", description);
    const link = document.querySelector('link[rel="canonical"]');
    if (link) link.setAttribute("href", canonical);
  }, [title, description, canonical]);
}
