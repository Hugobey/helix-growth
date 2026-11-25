import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { CAL } from "../content";
import { BeyondDashboard } from "../components/method/BeyondDashboard";
import { InsightPath } from "../components/method/InsightPath";
import { JourneyCarousel } from "../components/method/JourneyCarousel";
import { RevenueSim } from "../components/method/RevenueSim";
import { HelixMark, StrandField } from "../components/Helix";
import { Reveal } from "../components/Reveal";
import { usePageMeta } from "../lib/meta";

const subnav = [
  ["dashboard", "Dashboard"],
  ["journey", "Journey"],
  ["impact", "Impact"],
  ["decision", "Decision"],
  ["tools", "Tools"],
] as const;

const moves = [
  {
    n: "01",
    title: "Measure what happened.",
    body: "A funnel, a rate, a count. This is the dashboard. It starts the read. It is not the decision.",
  },
  {
    n: "02",
    title: "Understand why it happened.",
    body: "Time, behavior, segment, and what the screen is asking. A different signal can change what the same rate means.",
  },
  {
    n: "03",
    title: "Identify what should change.",
    body: "A hypothesis about the product: the sequence, the promise, or the moment of the offer. One change, aimed at the evidence.",
  },
  {
    n: "04",
    title: "Measure the business impact.",
    body: "Did paying users and revenue move, or only a rate along the way? A test answers that. The dashboard does not.",
  },
];

const tools = [
  { name: "Amplitude", logo: "", line: "Funnels, cohorts, and what people do after a screen." },
  { name: "RevenueCat", logo: "/assets/tools/revenuecat.svg", line: "Trials, renewals, and revenue, when the product is a subscription." },
  { name: "PostHog", logo: "/assets/tools/posthog.svg", line: "Product analytics and replay, when that question needs a tool added. Not a requirement for every app." },
  { name: "Mixpanel", logo: "/assets/tools/mixpanel.svg", line: "Events and funnels, and how a flow is actually used." },
  { name: "Heap", logo: "", line: "What people did, including interactions that were never planned as events." },
  { name: "Contentsquare", logo: "", line: "Where attention goes on a screen, and where a session breaks down." },
];

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

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const links = [...document.querySelectorAll<HTMLAnchorElement>("[data-subnav] a")];
    const nodes = links
      .map((link) => ({ link, node: document.getElementById(link.getAttribute("href")!.slice(1)) }))
      .filter((item): item is { link: HTMLAnchorElement; node: HTMLElement } => Boolean(item.node));
    const wrap = document.querySelector<HTMLElement>("[data-subnav]");
    const mark = () => {
      const line = Math.min(380, window.innerHeight * 0.42);
      let current = nodes[0];
      nodes.forEach((item) => {
        if (item.node.getBoundingClientRect().top <= line) current = item;
      });
      links.forEach((link) => link.removeAttribute("aria-current"));
      if (!current || !wrap) return;
      current.link.setAttribute("aria-current", "true");
      const left = current.link.offsetLeft;
      const right = left + current.link.offsetWidth;
      if (left < wrap.scrollLeft + 8 || right > wrap.scrollLeft + wrap.clientWidth - 8) {
        wrap.scrollTo({ left: Math.max(0, left - 16), behavior: reduceMotion ? "auto" : "smooth" });
      }
    };
    mark();
    window.addEventListener("scroll", mark, { passive: true });
    return () => window.removeEventListener("scroll", mark);
  }, []);

  return (
    <main id="main">
      <nav className="sticky top-[72px] z-30 border-b border-ink/10 bg-ground" aria-label="On this page" data-subnav>
        <div className="mx-auto flex max-w-page gap-6 overflow-x-auto px-6 py-3 text-[14px] md:px-10">
          {subnav.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="shrink-0 text-mute underline-offset-8 aria-[current=true]:text-ink aria-[current=true]:underline">
              {label}
            </a>
          ))}
        </div>
      </nav>

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

      <section className="mx-auto max-w-page px-6 pb-4 md:px-10" aria-label="From a measurement to a decision">
        <ol className="grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {moves.map((item) => (
            <li key={item.n} className="bg-ground p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-tide">{item.n}</p>
              <h3 className="mt-3 font-display text-[1.45rem] leading-[1.1]">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-mute">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="dashboard" className="scroll-mt-[118px] border-t border-ink/10">
        <div className="mx-auto max-w-page px-6 section-pad md:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">The difference</p>
            <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.96]">
              Look beyond the dashboard.
            </h2>
            <p className="mt-5 max-w-[44rem] text-[1.05rem] leading-relaxed">
              We don't simply look at conversion rates and recommend changing screens. We combine quantitative data, behavioral signals, segmentation and product experience to understand what is really happening.
            </p>
            <p className="mt-4 max-w-[44rem] text-[15px] leading-relaxed text-mute">
              The onboarding below is fictional. One thousand people open a subscription app. Three hundred and ten reach a first result. The rate stays 31%. The interpretation does not.
            </p>
          </Reveal>
          <div className="mt-12">
            <BeyondDashboard />
          </div>
        </div>
      </section>

      <section id="journey" className="scroll-mt-[118px] border-t border-ink/10 bg-surface">
        <div className="mx-auto max-w-page px-6 section-pad md:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">The product, end to end</p>
            <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[0.96]">
              Understand the entire user journey.
            </h2>
            <p className="mt-5 max-w-[40rem] text-[1.05rem] leading-relaxed">
              A conversion rate sits inside a longer story. The first screen, the setup, the first real use, the offer, and the reason to come back are different questions.
            </p>
          </Reveal>
          <div className="mt-10">
            <JourneyCarousel />
          </div>
        </div>
      </section>

      <section id="impact" className="scroll-mt-[118px] border-t border-ink/10">
        <div className="mx-auto max-w-page px-6 section-pad md:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">Business impact</p>
            <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[0.96]">
              Connect behavior to business impact.
            </h2>
            <p className="mt-5 max-w-[42rem] text-[1.05rem] leading-relaxed">
              A higher rate is not yet a business. Price, conversion, and renewal have to land in the same sum before a change is worth shipping.
            </p>
          </Reveal>
          <div className="mt-10">
            <RevenueSim />
          </div>
        </div>
      </section>

      <section id="decision" className="scroll-mt-[118px] border-t border-ink/10">
        <div className="mx-auto max-w-page px-6 section-pad md:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">What we hand back</p>
            <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[0.96]">
              From insight to action.
            </h2>
            <p className="mt-5 max-w-[40rem] text-[1.05rem] leading-relaxed">
              The email screen in the fictional onboarding is the example. The same shape applies to a live product.
            </p>
          </Reveal>
          <div className="mt-10">
            <InsightPath />
          </div>
        </div>
      </section>

      <section id="tools" className="scroll-mt-[118px] border-t border-ink/10 bg-surface">
        <div className="mx-auto max-w-page px-6 section-pad md:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">Instrumentation</p>
            <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[0.96]">
              The tool follows the question.
            </h2>
            <p className="mt-5 max-w-[42rem] text-[1.05rem] leading-relaxed">
              Amplitude, RevenueCat, PostHog, Mixpanel, Heap, and Contentsquare can support an investigation. None of them is a requirement. The right instrumentation depends on the app, the business model, and the question being asked.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <li key={tool.name} className="border-t border-ink/15 bg-ground p-5">
                <div className="flex items-center gap-3">
                  {tool.logo ? <img src={tool.logo} alt="" className="h-6 w-6" /> : null}
                  <h3 className="font-display text-[1.45rem] leading-none">{tool.name}</h3>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-mute">{tool.line}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-[42rem] text-[15px] leading-relaxed text-mute">
            An app that already trusts a stack does not need a new one for its own sake. PostHog can be installed or configured when the question needs it. It is not assumed for every client, and instrumentation is not part of every engagement.
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
