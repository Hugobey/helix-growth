import { useEffect, useState } from "react";
import growthModels from "./figures/product-led-growth-mobile-apps/growth-models.svg?raw";
import growthModelsMobile from "./figures/product-led-growth-mobile-apps/growth-models-mobile.svg?raw";
import twoApps from "./figures/product-led-growth-mobile-apps/two-apps.svg?raw";
import twoAppsMobile from "./figures/product-led-growth-mobile-apps/two-apps-mobile.svg?raw";
import growthLoop from "./figures/product-led-growth-mobile-apps/growth-loop.svg?raw";
import growthLoopMobile from "./figures/product-led-growth-mobile-apps/growth-loop-mobile.svg?raw";

const figures: Record<string, { desktop: string; mobile: string; caption: string }> = {
  "growth-models": {
    desktop: growthModels,
    mobile: growthModelsMobile,
    caption: "Two ways to build a growing business.",
  },
  "two-apps": {
    desktop: twoApps,
    mobile: twoAppsMobile,
    caption: "Same acquisition, different foundation. Illustrative.",
  },
  "growth-loop": {
    desktop: growthLoop,
    mobile: growthLoopMobile,
    caption: "The loop: acquisition, activation, retention, referral.",
  },
};

function namespaceSvg(svg: string, suffix: string) {
  return svg
    .replace(/\bid="([^"]+)"/g, (_, id: string) => `id="${id}${suffix}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id: string) => `url(#${id}${suffix})`)
    .replace(/\b(?:href|xlink:href)="#([^"]+)"/g, (match: string, id: string) => match.replace(`#${id}`, `#${id}${suffix}`));
}

export function Figure({ name }: { name: string }) {
  const figure = figures[name];
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const apply = () => setNarrow(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);
  if (!figure) return null;
  return (
    <figure className="article-figure">
      <div className="article-figure-desktop" aria-hidden={narrow} dangerouslySetInnerHTML={{ __html: namespaceSvg(figure.desktop, "-d") }} />
      <div className="article-figure-mobile" aria-hidden={!narrow} dangerouslySetInnerHTML={{ __html: namespaceSvg(figure.mobile, "-m") }} />
      <figcaption>{figure.caption}</figcaption>
    </figure>
  );
}
