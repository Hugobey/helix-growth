import { useMemo, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { CAL, caseBySlug, caseStudies, relatedCases, type CaseStudy } from "../content";
import { CaseDiagram } from "../components/CaseDiagrams";
import { HelixMark, StrandField } from "../components/Helix";
import { Reveal } from "../components/Reveal";
import { usePageMeta } from "../lib/meta";

export function CaseArticle() {
  const { slug } = useParams();
  const study = caseBySlug(slug);
  const jsonLd = useMemo(() => (study ? articleLd(study) : undefined), [study]);

  usePageMeta(
    study?.seoTitle ?? "Case study — Helix Growth",
    study?.seoDescription ?? "Case studies in app monetization, onboarding conversion, and paywall optimization.",
    study ? `https://helixgrowth.io/case-studies/${study.slug}` : "https://helixgrowth.io/case-studies",
    jsonLd,
  );

  if (!study) {
    return (
      <main id="main" className="mx-auto max-w-page px-6 py-24 md:px-10">
        <h1 className="font-display text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.95]">This case isn't here.</h1>
        <Link className="mt-6 inline-block underline underline-offset-4" to="/case-studies">All case studies</Link>
      </main>
    );
  }

  const related = relatedCases[study.slug].map((item) => ({
    ...item,
    study: caseStudies.find((entry) => entry.slug === item.slug)!,
  }));

  return (
    <main id="main">
      <article>
        <header className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-36 overflow-hidden md:h-48" aria-hidden="true">
            <StrandField />
          </div>
          <div className="relative mx-auto max-w-page px-6 pb-4 pt-14 md:px-10 md:pt-20">
            <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
              <Link to="/case-studies" className="underline decoration-ink/20 underline-offset-4">Case studies</Link>
              <span aria-hidden="true"> · </span>
              <span>{study.name}</span>
            </nav>
            <div className={study.image ? "mt-8 grid items-end gap-10 lg:grid-cols-[1.05fr_0.9fr] lg:gap-14" : "mt-8"}>
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-tide">
                  {study.name} · {study.category}
                </p>
                <h1 className="mt-4 max-w-[16ch] font-display text-[clamp(2.7rem,5.6vw,4.6rem)] leading-[0.94]">{study.headline}</h1>
                <p className="mt-6 max-w-[42rem] text-[1.12rem] leading-relaxed">{study.intro}</p>
              </Reveal>
              {study.image && (
                <figure>
                  <div className={`overflow-hidden rounded-[1.25rem] ${study.image.well}`}>
                    <img src={study.image.src} alt={study.image.alt} className="mx-auto max-h-[440px] w-full object-contain lg:max-h-[560px]" />
                  </div>
                  <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">{study.image.caption}</figcaption>
                </figure>
              )}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-page px-6 md:px-10">
          <Section n="01" title="The challenge" id="challenge">
            <p>{study.challenge}</p>
          </Section>
          <Section n="02" title="The investigation" id="investigation">
            <p>{study.investigation}</p>
          </Section>
          <Section n="03" title="The solution" id="solution">
            <p>{study.solution}</p>
            {study.moves.length > 0 && (
              <ul className="mt-6 max-w-[40rem] border-t border-ink/10">
                {study.moves.map((move) => (
                  <li key={move} className="border-b border-ink/10 py-3 text-[16px] leading-snug">{move}</li>
                ))}
              </ul>
            )}
            <div className="mt-10 max-w-[44rem]">
              <CaseDiagram name={study.diagram} />
            </div>
          </Section>
        </div>

        <section className="on-graphite bg-graphite text-ground" id="results" aria-labelledby="results-title">
          <div className="mx-auto grid max-w-page items-end gap-10 px-6 py-16 md:px-10 md:py-24 lg:grid-cols-[auto_1fr] lg:gap-16">
            <p className="font-display text-[clamp(4.4rem,8vw,7rem)] leading-[0.82] text-accent">{study.figure}</p>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-foam">{study.figureLabel}</p>
              <h2 id="results-title" className="mt-3 font-display text-[clamp(2rem,3vw,2.8rem)] leading-none">The results</h2>
              <div className="mt-6 max-w-[40rem] space-y-3 text-[1.05rem] leading-relaxed text-foam">
                {study.results.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-page px-6 py-16 md:px-10 md:py-20" aria-labelledby="related-title">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="related-title" className="font-display text-[clamp(2rem,3vw,2.8rem)] leading-none">Related case studies</h2>
            <Link className="text-[15px] underline decoration-ink/30 underline-offset-4" to="/methodology">Read the method</Link>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link to={`/case-studies/${item.slug}`} className="group block h-full border-t-4 border-tide bg-surface p-7">
                  <img src={item.study.logo} alt="" className={item.study.logoClass} />
                  <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-tide">{item.label}</p>
                  <h3 className="mt-2 font-display text-[1.8rem] leading-none">{item.study.name}</h3>
                  <p className="mt-3 text-[15px] leading-snug text-mute">{item.study.headline}</p>
                  <p className="mt-5 text-[14px] underline decoration-ink/30 underline-offset-4 group-hover:decoration-ink">Read case study</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>

      <section className="on-graphite wash-host-dark wash-shift relative overflow-hidden text-ground">
        <StrandField tone="dark" />
        <div className="relative mx-auto max-w-page px-6 py-16 md:px-10 md:py-24">
          <HelixMark className="mb-8 w-full max-w-md text-ground/50" />
          <h2 className="max-w-[12ch] font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.94]">Bring a live product.</h2>
          <p className="mt-5 max-w-[36ch] text-[1.05rem] leading-relaxed text-foam">
            We'll read the behavior behind the numbers, and the product decision that follows.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 py-3 text-[15px] text-ink hover:bg-accent-hover" href={CAL} target="_blank" rel="noopener noreferrer">
              Let's grow your app
            </a>
            <Link className="text-[15px] text-ground underline decoration-white/30 underline-offset-4" to="/case-studies">
              All case studies
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Section({ n, title, id, children }: { n: string; title: string; id: string; children: ReactNode }) {
  return (
    <section className="border-t border-ink/10 py-14 md:py-16" aria-labelledby={id}>
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-tide">{n}</p>
      <h2 id={id} className="mt-3 font-display text-[clamp(2rem,3vw,2.7rem)] leading-none">{title}</h2>
      <div className="mt-5 max-w-[42rem] text-[1.08rem] leading-relaxed">{children}</div>
    </section>
  );
}

function articleLd(study: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: study.headline,
        description: study.seoDescription,
        url: `https://helixgrowth.io/case-studies/${study.slug}`,
        mainEntityOfPage: `https://helixgrowth.io/case-studies/${study.slug}`,
        image: study.image ? `https://helixgrowth.io${study.image.src}` : undefined,
        author: { "@type": "Person", "name": "Hugo Blanchart" },
        publisher: { "@type": "Organization", "name": "Helix Growth", "url": "https://helixgrowth.io/" },
        about: study.category,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", "position": 1, "name": "Case studies", "item": "https://helixgrowth.io/case-studies" },
          { "@type": "ListItem", "position": 2, "name": study.name, "item": `https://helixgrowth.io/case-studies/${study.slug}` },
        ],
      },
    ],
  };
}
