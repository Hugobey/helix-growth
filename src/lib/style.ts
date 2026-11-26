/** Which visual system is on screen. The words of the site do not change. */
export const STYLE_KEY = "helixgrowth.style";
export const STYLE_QUERY = "style";

export type SiteStyle = "current" | "editorial";

export function parseStyle(value: string | null): SiteStyle | null {
  if (value === "current" || value === "editorial") return value;
  return null;
}

/** The address wins over a saved choice, so a link can open one look. */
export function readSiteStyle(stored: string | null, search: string): SiteStyle {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  return parseStyle(params.get(STYLE_QUERY)) ?? parseStyle(stored) ?? "current";
}

export function applySiteStyle(style: SiteStyle): void {
  document.documentElement.dataset.style = style;
  const theme = document.querySelector('meta[name="theme-color"]');
  if (theme) theme.setAttribute("content", style === "editorial" ? "#F6F4F0" : "#F3EEE6");
  try {
    localStorage.setItem(STYLE_KEY, style);
  } catch {
    /* The attribute still switches this view. */
  }
}

/** Applies the saved look, then drops `style` from the address bar. */
export function applyStyleQuery(): void {
  if (typeof window === "undefined") return;
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(STYLE_KEY);
  } catch {
    stored = null;
  }
  applySiteStyle(readSiteStyle(stored, window.location.search));
  const url = new URL(window.location.href);
  if (!url.searchParams.has(STYLE_QUERY)) return;
  url.searchParams.delete(STYLE_QUERY);
  window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
}
