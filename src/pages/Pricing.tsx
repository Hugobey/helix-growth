import { useMemo } from "react";
import { Link } from "react-router-dom";
import { CAL_SPRINT, plans, pricingFaqs } from "../content";
import { HelixMark, StrandField } from "../components/Helix";
import { iconForLine, PointIcon } from "../components/PointIcon";
import { Reveal } from "../components/Reveal";
import { usePageMeta } from "../lib/meta";

const pageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Find the right way to grow your app.",
  url: "https://helixgrowth.io/pricing/",
  description: "A $350 App Growth Review, a $2,000 Growth Sprint, and monthly Growth Advisory. Strategic support for mobile apps. No guaranteed revenue.",
};

const sprintFit = [
  "Has a live mobile app.",
  "Has users and meaningful activity.",
  "Has access to relevant business or product data, or is willing to improve measurement.",
  "Wants to solve problems beyond acquisition.",
  "Has the resources to implement recommendations internally.",
];

const nextSteps = [
  { n: "01", title: "We identify leakage points." },
  { n: "02", title: "We look at your data, the users journey and generate opportunities." },
  { n: "03", title: "We present a prioritized growth strategy and recommendations." },
];

const clientProvides = [
  "App access.",
  "Analytics access or data export.",
  "Experiment history",
  "Business context and goals.",
];

export function Pricing() {
  const jsonLd = useMemo(() => pageLd, []);
  usePageMeta(
    "App growth pricing — Helix Growth",
    "Find the right way to grow your app. A $350 review, a $2,000 growth sprint, and monthly advisory. No guaranteed revenue increase.",
    "https://helixgrowth.io/pricing/",
    jsonLd,
  );

  return (
    <main id="main">
      <header className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 overflow-hidden md:h-48" aria-hidden="true">
          <StrandField />
        </div>
        <div className="relative mx-auto max-w-page px-6 pb-4 pt-16 md:px-10 md:pt-20">
          <Reveal className="editorial-lead">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">Pricing</p>
            <h1 className="mt-4 max-w-[14ch] font-display text-[clamp(2.8rem,5.6vw,4.8rem)] leading-[0.94]">
              Find the right way to grow your app.
            </h1>
            <p className="mt-6 max-w-[42rem] text-[1.12rem] leading-relaxed">
              A first outside read, a seven-day strategy, and an ongoing advisory relationship are different levels of support. The right one depends on the stage of the app and the decision in front of you.
            </p>
          </Reveal>
        </div>
      </header>

      <section id="plans" className="scroll-mt-[118px] mx-auto max-w-page px-6 pb-8 pt-8 md:px-10 md:pt-12" aria-labelledby="plans-title">
        <h2 id="plans-title" className="sr-only">Pricing comparison</h2>
        <div className="grid items-stretch gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              id={plan.id}
              key={plan.id}
              data-plan={plan.id}
              className={`flex scroll-mt-32 flex-col px-6 py-8 md:px-8 md:py-10 ${plan.recommended ? "order-first border-2 border-ink bg-surface lg:order-none" : "border border-ink/15 bg-ground"}`}
            >
              <p className="min-h-6 font-mono text-[11px] uppercase tracking-[0.16em] text-tide">{plan.kicker}</p>
              <h3 className="mt-6 font-display text-[2rem] leading-none">{plan.name}</h3>
              <p className={`mt-8 flex min-h-[5.75rem] items-end font-display ${plan.priceSize === "figure" ? "text-[3.35rem] leading-[0.95]" : "text-[1.85rem] leading-[1.08]"}`}>
                {plan.price}
              </p>
              <p className="mt-5 min-h-[4.75rem] text-[16px] leading-snug">{plan.position}</p>
              <ul className="mt-8 flex-1 border-t border-ink/10">
                {plan.benefits.map((item) => (
                  <li key={item} className="flex items-start gap-3 border-b border-ink/10 py-3 text-[15px] leading-snug">
                    <PointIcon name={iconForLine(item)} className="point-icon mt-0.5 h-[1.15rem] w-[1.15rem] shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                className={`mt-10 inline-flex min-h-11 items-center justify-center rounded-md px-4 py-3 text-center text-[15px] ${plan.recommended ? "bg-accent text-ink hover:bg-accent-hover" : plan.id === "review" ? "bg-ink text-ground" : "border border-ink"}`}
                href={plan.href}
                {...(plan.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-[40rem] text-[15px] leading-relaxed text-mute">
          The review is not a full audit. The sprint does not include building the recommended changes. Advisory has no fixed monthly price.{" "}
          <Link className="text-ink underline decoration-ink/30 underline-offset-4" to="/growth-sprint">The Growth Sprint is described here.</Link>
        </p>
      </section>

      <section id="fit" className="scroll-mt-[118px] border-t border-ink/10">
        <div className="mx-auto max-w-page px-6 section-pad md:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">The flagship</p>
            <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[0.96]">
              Is the Growth Sprint right for you?
            </h2>
            <p className="mt-5 max-w-[40rem] text-[1.05rem] leading-relaxed">
              The sprint is for an established app that already earns, and wants a clearer direction for conversion, monetization, or retention.
            </p>
          </Reveal>
          <ul className="mt-10 max-w-[40rem] border-t border-ink/10">
            {sprintFit.map((item) => (
              <li key={item} className="border-b border-ink/10 py-3 text-[16px] leading-snug">{item}</li>
            ))}
          </ul>
          <div className="mt-10 max-w-[40rem] border-t-4 border-ink bg-surface p-6 md:p-8">
            <h3 className="font-display text-[1.7rem] leading-none">You can also opt for the App Growth Review.</h3>
            <p className="mt-4 text-[16px] leading-relaxed">
              Indie developers and small app businesses, and founders who are not ready for a full growth engagement, get more from the one-day review. It is $350, it takes no more than one working day, and it is a focused read of where growth is being lost. It is not a comprehensive audit.
            </p>
            <a className="mt-6 inline-flex min-h-11 items-center text-[15px] underline decoration-ink/30 underline-offset-4" href="#review">
              See the $350 review
            </a>
          </div>
        </div>
      </section>

      <section id="next" className="scroll-mt-[118px] border-t border-ink/10 bg-surface">
        <div className="mx-auto max-w-page px-6 section-pad md:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">The engagement</p>
            <h2 className="mt-4 max-w-[14ch] font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[0.96]">
              What happens next?
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-px bg-ink/10 lg:grid-cols-3">
            {nextSteps.map((step) => (
              <li key={step.n} className="bg-surface p-6 md:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-tide">{step.n}</p>
                <p className="mt-4 font-display text-[1.7rem] leading-[1.1]">{step.title}</p>
              </li>
            ))}
          </ol>
          {/* <p className="mt-8 max-w-[42rem] text-[16px] leading-relaxed">
            The depth follows the engagement. The review returns priorities in a day. The sprint returns a direction for the next 90 days. Advisory keeps that direction current.
          </p> */}
          <h3 className="mt-12 font-display text-[1.7rem] leading-none">What we need from you</h3>
          <ul className="mt-5 max-w-[36rem] border-t border-ink/10">
            {clientProvides.map((item) => (
              <li key={item} className="border-b border-ink/10 py-3 text-[16px]">{item}</li>
            ))}
          </ul>
          {/* <p className="mt-6 max-w-[40rem] text-[15px] leading-relaxed text-mute">
            If a source is missing, say so. We will not fill the gap with invented numbers.{" "}
            <Link className="text-ink underline decoration-ink/30 underline-offset-4" to="/preparing-for-a-growth-review">
              Preparing your mobile app for a growth review
            </Link>{" "}
            is the short list of what makes the day useful.
          </p> */}
        </div>
      </section>

      <section className="border-t border-ink/10" aria-labelledby="case-title">
        <div className="mx-auto max-w-page px-6 section-pad md:px-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">A product decision</p>
          <h2 id="case-title" className="mt-4 max-w-[16ch] font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[0.96]">
            Strategy showed up in the sequence.
          </h2>
          <article className="mt-10 grid gap-8 border border-ink/10 p-6 md:grid-cols-[0.7fr_1.3fr] md:p-10">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-tide">Prose · Onboarding</p>
              <p className="mt-4 font-display text-[clamp(3rem,6vw,4.6rem)] leading-[0.86] text-accent">+34%</p>
              <p className="mt-3 text-[15px] text-mute">Relative onboarding conversion, versus the previous version. Validated by an A/B test.</p>
            </div>
            <div>
              <h3 className="font-display text-[2rem] leading-[1.05]">Building trust before asking for commitment.</h3>
              <p className="mt-4 text-[16px] leading-relaxed">
                The onboarding asked for personal information before the product had earned it. Email capture was where people stopped. The sequence changed so the product made its case first, with stronger reasons to believe, and email moved later.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-mute">
                The figure is the relative change. The test design is not ours to invent, and the result is not a promise for the next app.
              </p>
              <Link className="mt-6 inline-flex min-h-11 items-center text-[15px] underline decoration-ink/30 underline-offset-4" to="/case-studies/prose">
                Read the Prose case study
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section id="faq" className="scroll-mt-[118px] border-t border-ink/10">
        <div className="mx-auto max-w-page px-6 section-pad md:px-10">
          <h2 className="max-w-[12ch] font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[0.96]">Questions before you book.</h2>
          <div className="mt-10 max-w-[44rem] border-t border-ink/10">
            {pricingFaqs.map((item) => (
              <details key={item.q} className="group border-b border-ink/10 py-4">
                <summary className="cursor-pointer list-none text-[1.15rem] leading-snug [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-6">
                    {item.q}
                    <span className="mt-1 font-mono text-[12px] text-mute group-open:hidden" aria-hidden="true">+</span>
                    <span className="mt-1 hidden font-mono text-[12px] text-mute group-open:inline" aria-hidden="true">–</span>
                  </span>
                </summary>
                <p className="mt-3 max-w-[40rem] text-[15px] leading-relaxed text-mute">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="on-graphite wash-host-dark wash-shift relative overflow-hidden text-ground">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 overflow-hidden md:h-48" aria-hidden="true">
          <StrandField tone="dark" />
        </div>
        <div className="relative mx-auto max-w-page px-6 py-16 md:px-10 md:py-24">
          <HelixMark className="mb-8 w-full max-w-md text-ground/50" />
          <h2 className="max-w-[16ch] font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.94]">
            Ready to find your next growth opportunity?
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 py-3 text-[15px] text-ink hover:bg-accent-hover" href={CAL_SPRINT} target="_blank" rel="noopener noreferrer">
              Discuss your growth sprint
            </a>
            <a className="text-[15px] text-ground underline decoration-white/30 underline-offset-4" href="#review">
              Or the $350 review
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
