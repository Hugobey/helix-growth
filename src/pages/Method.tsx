import { useMemo } from "react";
import { Link } from "react-router-dom";
import { CAL } from "../content";
import { HelixMark, StrandField } from "../components/Helix";
import { Reveal } from "../components/Reveal";
import { usePageMeta } from "../lib/meta";

const where = [
  ["First screen", "Did they understand the product before they started?"],
  ["The steps", "Which one asks for effort before it has earned it?"],
  ["First use", "Did they reach a result, or only finish a form?"],
  ["The offer", "Was it shown before they had a reason to pay?"],
  ["Coming back", "Is there a reason to return, or only a reason to subscribe once?"],
] as const;

const business = [
  ["01", "The rate", "Did the step we changed actually move?"],
  ["02", "Paying users", "Did more people start paying, or did a middle step get easier?"],
  ["03", "Revenue", "Did price, conversion, and renewal land in a different sum?"],
] as const;

const pageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Growth starts with understanding user behavior.",
  url: "https://helixgrowth.io/methodology/",
  description: "How Helix Growth investigates mobile app behavior beyond the dashboard, and connects a product decision to revenue.",
};

export function Method() {
  const jsonLd = useMemo(() => pageLd, []);
  usePageMeta(
    "Mobile app growth methodology — Helix Growth",
    "How we investigate user behavior beyond the dashboard. Funnels, time, segmentation, and the revenue effect of a product decision.",
    "https://helixgrowth.io/methodology/",
    jsonLd,
  );

  return (
    <main id="main">
      <header className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 overflow-hidden md:h-48" aria-hidden="true">
          <StrandField />
        </div>
        <div className="relative mx-auto max-w-page px-6 pb-4 pt-16 md:px-10 md:pt-20">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">Method</p>
            <h1 className="mt-4 max-w-[16ch] font-display text-[clamp(2.7rem,5.6vw,4.8rem)] leading-[0.94]">
              Growth starts with understanding user behavior.
            </h1>
            <p className="mt-6 max-w-[46rem] text-[1.12rem] leading-relaxed">
              Your analytics tell you what happened. But understanding why requires looking deeper. We connect product data, behavioral insights and user experience to uncover opportunities that conventional dashboards often miss.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="border-t border-ink/10" aria-labelledby="rate-title">
        <div className="mx-auto max-w-page px-6 section-pad md:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">The rate</p>
            <h2 id="rate-title" className="mt-4 max-w-[16ch] font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[0.96]">
              You already know what happened.
            </h2>
            <p className="mt-5 max-w-[40rem] text-[1.05rem] leading-relaxed">
              A funnel gives you a rate. It does not tell you whether the screen is unclear, too early, or doing its job. Those are different changes.
            </p>
          </Reveal>
          <figure className="mt-10">
            <div className="border-t border-ink/10 pt-6">
              <p className="font-display text-[clamp(3.2rem,6vw,5rem)] leading-none">31%</p>
              <p className="mt-3 max-w-[36rem] text-[1.05rem] leading-relaxed">
                reach a first result. One thousand people open a subscription app. Three hundred and ten get there. The rate does not move. The decision still can.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="border border-ink/10 bg-surface p-5 md:p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-tide">What the dashboard answers</p>
                <h3 className="mt-3 font-display text-[1.7rem] leading-none">Change the email screen.</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-mute">
                  The step looks weak, so the screen must be the problem.
                </p>
              </div>
              <div className="border border-ink/10 bg-surface p-5 md:p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-tide">The question under it</p>
                <h3 className="mt-3 font-display text-[1.7rem] leading-none">Move the ask.</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-mute">
                  People leave in a few seconds, before the product has shown its value. The screen may be early, not broken.
                </p>
              </div>
            </div>
            <figcaption className="mt-4 max-w-[42rem] text-[14px] leading-relaxed text-mute">
              Illustrative. Not a client.{" "}
              <Link className="underline decoration-ink/30 underline-offset-4" to="/case-studies/prose">
                The Prose case
              </Link>{" "}
              is a tested onboarding sequence. It is not this example.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-surface" aria-labelledby="where-title">
        <div className="mx-auto max-w-page px-6 section-pad md:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">Where to look</p>
            <h2 id="where-title" className="mt-4 max-w-[18ch] font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[0.96]">
              You know where people leave. Not which question to ask.
            </h2>
            <p className="mt-5 max-w-[40rem] text-[1.05rem] leading-relaxed">
              A drop-off is a location. The decision depends on what that screen was asking them to do.
            </p>
          </Reveal>
          <ol className="mt-10 border-t border-ink/10">
            {where.map(([place, question], index) => (
              <li key={place} className="grid gap-2 border-b border-ink/10 py-5 md:grid-cols-[9rem_1fr] md:items-baseline md:gap-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-tide">0{index + 1} · {place}</p>
                <p className="font-display text-[clamp(1.45rem,2vw,1.85rem)] leading-[1.15]">{question}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-ink/10" aria-labelledby="business-title">
        <div className="mx-auto max-w-page px-6 section-pad md:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">The business</p>
            <h2 id="business-title" className="mt-4 max-w-[16ch] font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[0.96]">
              A better rate is not yet a better business.
            </h2>
            <p className="mt-5 max-w-[42rem] text-[1.05rem] leading-relaxed">
              A test can move a step and leave revenue where it was. Before a change is worth shipping, three things have to be read together.
            </p>
          </Reveal>
          <ol className="mt-10 grid gap-px bg-ink/10 md:grid-cols-3">
            {business.map(([n, title, body]) => (
              <li key={n} className="bg-ground p-5 md:p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-tide">{n}</p>
                <h3 className="mt-3 font-display text-[1.7rem] leading-none">{title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-mute">{body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-[42rem] text-[15px] leading-relaxed text-mute">
            Amplitude, RevenueCat, PostHog, Mixpanel, Heap, and Contentsquare can support a question. None of them is a requirement. The right read depends on the app and the business model, and instrumentation is not part of every engagement.
          </p>
        </div>
      </section>

      <section className="on-graphite wash-host-dark wash-shift relative overflow-hidden text-ground">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 overflow-hidden md:h-48" aria-hidden="true">
          <StrandField tone="dark" />
        </div>
        <div className="relative mx-auto max-w-page px-6 py-16 md:px-10 md:py-24">
          <HelixMark className="mb-8 w-full max-w-md text-ground/50" />
          <h2 className="max-w-[16ch] font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.94]">
            Your next growth opportunity might be hiding in plain sight.
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 py-3 text-[15px] text-ink hover:bg-accent-hover" href={CAL} target="_blank" rel="noopener noreferrer">
              Let's grow your app
            </a>
            <Link className="text-[15px] text-ground underline decoration-white/30 underline-offset-4" to="/case-studies">
              Explore our case studies
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
