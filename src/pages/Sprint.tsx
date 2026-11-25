import { useMemo } from "react";
import { Link } from "react-router-dom";
import { CAL_SPRINT, pricingFaqs } from "../content";
import { HelixMark, StrandField } from "../components/Helix";
import { Reveal } from "../components/Reveal";
import { usePageMeta } from "../lib/meta";

const pageLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Growth Sprint",
  url: "https://helixgrowth.io/growth-sprint/",
  provider: { "@type": "Organization", name: "Helix Growth" },
  description: "A seven-day strategic engagement for mobile apps that already generate revenue. A direction for the next 90 days. Implementation stays with the team.",
  offers: { "@type": "Offer", price: "2000", priceCurrency: "USD" },
};

const problems = [
  "The dashboard shows a rate, and the team still cannot say why it moved.",
  "Development time goes to improvements that never reach revenue.",
  "Acquisition keeps spending. Activation, payment, or renewal does not follow.",
  "The next quarter needs a direction, and the meeting produces another list.",
];

const outcomes = [
  "Understand where the app is losing growth potential.",
  "Identify opportunities hidden behind existing metrics.",
  "Stop wasting development resources on low-impact improvements.",
  "Prioritize initiatives based on expected business impact.",
  "Align product decisions with measurable business outcomes.",
  "Leave with a clear direction for the next 90 days.",
];

const days = [
  {
    n: "01",
    title: "The business and the product.",
    body: "We start from what the app is trying to earn, and from the path a person actually takes. The numbers you already trust come with that, not instead of it.",
  },
  {
    n: "02",
    title: "Where the journey is losing people.",
    body: "Time, behavior, segment, and the job of a screen can change what a conversion rate means. The investigation is there to separate a real constraint from a chart that only looks urgent.",
  },
  {
    n: "03",
    title: "A direction, in priority order.",
    body: "You leave with what to do first, what to leave alone, and how you will know if it worked. The changes themselves are built by your team.",
  },
];

const needs = [
  "App access, so we can do what a new user does.",
  "Analytics access where you already have it.",
  "Monetization data when revenue is the question.",
  "Time with the people who will decide what gets built.",
];

export function Sprint() {
  const jsonLd = useMemo(() => pageLd, []);
  usePageMeta(
    "Growth Sprint — Helix Growth",
    "Find your next growth opportunity and a strategy to capture it. A $2,000 engagement of about seven days. Your team implements the changes.",
    "https://helixgrowth.io/growth-sprint/",
    jsonLd,
  );

  return (
    <main id="main">
      <header className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 overflow-hidden md:h-48" aria-hidden="true">
          <StrandField />
        </div>
        <div className="relative mx-auto max-w-page px-6 pb-6 pt-16 md:px-10 md:pt-20">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">Growth Sprint · $2,000 · about seven days</p>
            <h1 className="mt-4 max-w-[16ch] font-display text-[clamp(2.8rem,5.6vw,4.8rem)] leading-[0.94]">
              Find your next growth opportunity. Build a strategy to capture it.
            </h1>
            <p className="mt-6 max-w-[42rem] text-[1.12rem] leading-relaxed">
              For an established mobile app that already generates revenue, and wants conversion, monetization, or retention to move for a reason. This is a strategic engagement. It does not include building every recommended change.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 py-3 text-[15px] text-ink hover:bg-accent-hover" href={CAL_SPRINT} target="_blank" rel="noopener noreferrer">
                Discuss your growth sprint
              </a>
              <Link className="text-[15px] underline decoration-ink/30 underline-offset-4" to="/pricing">
                Compare it with the review and advisory
              </Link>
            </div>
          </Reveal>
        </div>
      </header>

      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-page px-6 section-pad md:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">The situation</p>
            <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[0.96]">
              The rate is visible. The decision is not.
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-px bg-ink/10 md:grid-cols-2">
            {problems.map((item) => (
              <li key={item} className="bg-ground p-6 text-[17px] leading-snug md:p-8">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-surface">
        <div className="mx-auto max-w-page px-6 section-pad md:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">The outcome</p>
            <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[0.96]">
              A direction for the next 90 days.
            </h2>
            <p className="mt-5 max-w-[40rem] text-[1.05rem] leading-relaxed">
              The value is the judgment: which constraint is worth the next build, and which chart can wait.
            </p>
          </Reveal>
          <ul className="mt-10 max-w-[40rem] border-t border-ink/10">
            {outcomes.map((item) => (
              <li key={item} className="border-b border-ink/10 py-3 text-[16px] leading-snug">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-page px-6 section-pad md:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">What the fee is for</p>
              <h2 className="mt-4 font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[0.96]">
                The work is the strategy.
              </h2>
            </Reveal>
            <div className="max-w-[38rem] text-[1.05rem] leading-relaxed">
              <p>
                We connect what people do in the product to the business decision that follows. A long visit can be engagement. A short exit can be a broken expectation. A weak cohort can be a promise the onboarding never keeps. Each of those is a hypothesis, and it has to be tested.
              </p>
              <p className="mt-4">
                We do not promise that revenue will rise. We do not ship the product changes. Your team keeps the build, the test, and the call on what is worth doing next.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-surface">
        <div className="mx-auto max-w-page px-6 section-pad md:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">About seven days</p>
            <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[0.96]">
              Enough time to decide what matters.
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-8 lg:grid-cols-3">
            {days.map((day) => (
              <li key={day.n}>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-tide">{day.n}</p>
                <h3 className="mt-3 font-display text-[1.7rem] leading-[1.1]">{day.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-mute">{day.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-ink/10" aria-labelledby="wizz-title">
        <div className="mx-auto max-w-page px-6 section-pad md:px-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">A related decision</p>
          <h2 id="wizz-title" className="mt-4 max-w-[18ch] font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[0.96]">
            The product was the growth lever.
          </h2>
          <article className="mt-10 grid gap-8 border border-ink/10 p-6 md:grid-cols-[0.7fr_1.3fr] md:p-10">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-tide">Wizz · Monetization</p>
              <p className="mt-4 font-display text-[clamp(3rem,6vw,4.6rem)] leading-[0.86] text-accent">+$1M</p>
              <p className="mt-3 text-[15px] text-mute">MRR, from about $3M in October 2025 to about $4M in November 2025.</p>
            </div>
            <div>
              <h3 className="font-display text-[2rem] leading-[1.05]">Turning passive monetization into an immediate opportunity.</h3>
              <p className="mt-4 text-[16px] leading-relaxed">
                Revenue had held near $3M. The mechanic already in the product was not giving a Gen Z audience a reason to act now. The work was a new monetization concept, kept by the company, and it contributed to that increase. $4M was the highest MRR reached.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-mute">
                One initiative, in one month. Not a series, and not a result we can promise the next product.
              </p>
              <Link className="mt-6 inline-flex min-h-11 items-center text-[15px] underline decoration-ink/30 underline-offset-4" to="/case-studies/wizz">
                Read the Wizz case study
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-surface">
        <div className="mx-auto max-w-page px-6 section-pad md:px-10">
          <h2 className="max-w-[14ch] font-display text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[0.96]">What we need from you.</h2>
          <ul className="mt-8 max-w-[40rem] border-t border-ink/10">
            {needs.map((item) => (
              <li key={item} className="border-b border-ink/10 py-3 text-[16px] leading-snug">{item}</li>
            ))}
          </ul>
          <p className="mt-6 max-w-[42rem] text-[15px] leading-relaxed text-mute">
            A missing source is information, not a reason to invent a number.{" "}
            <Link className="text-ink underline decoration-ink/30 underline-offset-4" to="/preparing-for-a-growth-review">
              Preparing your mobile app for a growth review
            </Link>{" "}
            walks through what is useful to gather first.
          </p>
        </div>
      </section>

      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-page px-6 section-pad md:px-10">
          <h2 className="font-display text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[0.96]">Before the call.</h2>
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
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-foam">$2,000 · about seven days</p>
          <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.94]">
            Ready to find your next growth opportunity?
          </h2>
          <p className="mt-5 max-w-[36rem] text-[1.05rem] leading-relaxed text-foam">
            A strategy, not a build. Your team implements what is worth shipping.
          </p>
          <a className="mt-8 inline-flex min-h-11 items-center rounded-md bg-accent px-5 py-3 text-[15px] text-ink hover:bg-accent-hover" href={CAL_SPRINT} target="_blank" rel="noopener noreferrer">
            Discuss your growth sprint
          </a>
        </div>
      </section>
    </main>
  );
}
