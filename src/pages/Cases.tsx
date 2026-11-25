import { Link } from "react-router-dom";
import { useMemo } from "react";
import { CAL, caseStudies } from "../content";
import { CaseDiagram } from "../components/CaseDiagrams";
import { HelixMark, StrandField } from "../components/Helix";
import { Reveal } from "../components/Reveal";
import { usePageMeta } from "../lib/meta";

const indexLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Growth challenges. Real product decisions.",
  url: "https://helixgrowth.io/case-studies",
  description: "Product insights, behavioral analysis, and the decisions behind app monetization, onboarding conversion, and paywall optimization.",
  hasPart: caseStudies.map((item) => ({
    "@type": "Article",
    headline: item.headline,
    url: `https://helixgrowth.io/case-studies/${item.slug}`,
    about: item.category,
  })),
};

export function Cases() {
  const jsonLd = useMemo(() => indexLd, []);
  usePageMeta(
    "Mobile app growth case studies — Helix Growth",
    "Growth challenges and the product decisions behind them. App monetization, onboarding conversion, and paywall optimization.",
    "https://helixgrowth.io/case-studies",
    jsonLd,
  );

  return (
    <main id="main">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 overflow-hidden md:h-48" aria-hidden="true">
          <StrandField />
        </div>
        <div className="relative mx-auto max-w-page px-6 pb-6 pt-16 md:px-10 md:pt-24">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">Case studies</p>
            <h1 className="mt-4 max-w-[16ch] font-display text-[clamp(2.8rem,6vw,4.8rem)] leading-[0.94]">
              Growth challenges. Real product decisions.
            </h1>
            <p className="mt-6 max-w-[46ch] text-[1.08rem] leading-relaxed">
              Explore how product insights, behavioral analysis and strategic decisions helped unlock growth opportunities across mobile apps.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-page px-6 pb-8 md:px-10" aria-label="Case studies">
        {caseStudies.map((item, index) => (
          <article key={item.slug} className="border-t border-ink/10 py-14 first:border-t-0 md:py-20">
            <Link
              to={`/case-studies/${item.slug}`}
              className="group grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <img src={item.logo} alt={item.name} className={item.logoClass} />
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-tide">{item.category}</p>
                <h2 className="mt-3 max-w-[18ch] font-display text-[clamp(2rem,3.6vw,3.15rem)] leading-[1.02]">{item.headline}</h2>
                <p className="mt-4 max-w-[38ch] text-[1.05rem] leading-relaxed text-mute">{item.summary}</p>
                <p className="mt-6 font-display text-[clamp(2.4rem,4vw,3.4rem)] leading-none">{item.figure}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">{item.figureLabel}</p>
                <p className="mt-6 text-[15px] underline decoration-ink/30 underline-offset-4 group-hover:decoration-ink">
                  Read case study
                </p>
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                {item.image ? (
                  <div className={`overflow-hidden rounded-[1.25rem] ${item.image.well}`}>
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      className="mx-auto max-h-[520px] w-full object-contain motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="rounded-[1.25rem] bg-surface p-6 md:p-8">
                    <CaseDiagram name={item.diagram} />
                  </div>
                )}
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
