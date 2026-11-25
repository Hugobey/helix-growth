import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  AUDIT_MAIL,
  CAL,
  CAL_ADVISORY,
  CAL_SPRINT,
  MAIL,
  advisoryItems,
  auditItems,
  clients,
  dimensions,
  logos,
  outOfScope,
  results,
  sprintItems,
  tools,
  wins,
} from "../content";
import { usePageMeta } from "../lib/meta";
import { Glyph, OfferArt } from "../components/Glyphs";
import { HelixField, HelixMark, StrandField, useHelixWash } from "../components/Helix";
import { PortraitFilm } from "../components/PortraitFilm";
import { Reveal } from "../components/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

export function Home() {
  usePageMeta(
    "Helix Growth — Your app is already growing",
    "Product growth for mobile apps. Conversion, monetization, and retention, with the founder on the work.",
    "https://helixgrowth.io/",
  );

  const heroRef = useHelixWash<HTMLElement>();
  const offerRef = useHelixWash<HTMLElement>();
  const dataRef = useHelixWash<HTMLElement>();

  return (
    <main id="main">
      <section ref={heroRef} className="wash-host wash-shift relative overflow-hidden" id="top">
        <StrandField />
        <div className="relative mx-auto grid max-w-page items-center gap-12 px-6 section-pad md:px-10 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">Mobile app growth studio</p>
            <h1 className="mt-5 max-w-[12ch] font-display text-[clamp(3.15rem,7vw,5.8rem)] leading-[0.92]">
              Your app is already growing.
              <span className="mt-3 block text-ink/75">Let's make it grow better.</span>
            </h1>
            <p className="mt-6 max-w-[36ch] text-[1.15rem] leading-relaxed">
              I help mobile app founders identify growth opportunities, improve conversion and build more profitable user experiences.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 py-3 text-[15px] text-ink hover:bg-accent-hover" href={CAL} target="_blank" rel="noopener noreferrer">
                Let's talk about your app
              </a>
              <a className="text-[15px] underline decoration-ink/30 underline-offset-4 hover:decoration-ink" href="#clients">
                Explore my work
              </a>
            </div>
          </Reveal>
          <div className="min-w-0">
            <div className="relative h-[300px] md:h-[420px]">
              <HelixField className="absolute inset-0" />
            </div>
            <p className="mt-3 max-w-[34ch] font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-mute">
              Acquisition, activation, monetization, retention. One system.
            </p>
          </div>
        </div>
      </section>

      <section className="on-graphite wash-host-dark wash-shift relative scroll-mt-24 overflow-hidden text-ground" id="results">
        <StrandField tone="dark" />
        <div className="relative mx-auto max-w-page px-6 section-pad md:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foam">Recorded results</p>
            <h2 className="mt-4 max-w-[12ch] font-display text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.96]">The impact.</h2>
          </Reveal>
          <div className="mt-16 grid gap-14 md:grid-cols-3 md:gap-8">
            {results.map((item) => (
              <article key={item.id}>
                <Figure value={item.figure} />
                <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.16em] text-foam">{item.label}</p>
                <p className="mt-2 font-display text-[1.35rem] leading-none text-ground/80">{item.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative scroll-mt-24 overflow-hidden" id="clients">
        <span id="work" className="sr-only">Work</span>
        <StrandField />
        <div className="relative mx-auto max-w-[1440px] px-6 section-pad md:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">Selected clients</p>
            <h2 className="mt-4 max-w-[14ch] font-display text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.96]">On screen.</h2>
          </Reveal>
          <ul className="mt-16 grid gap-5 md:grid-cols-3">
            {clients.map((client, index) => (
              <li key={client.id}>
                <article className="film-card group relative aspect-[3/4] overflow-hidden bg-graphite">
                  <PortraitFilm kind={client.kind} id={client.film} title={client.filmTitle} delay={index * 700} />
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${client.gradient}`} />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
                    <img src={client.logo} alt="" className={client.logoClass} />
                    <h3 className="mt-3 font-display text-[2.15rem] leading-none">
                      <a className="text-white" href={client.site} target="_blank" rel="noopener noreferrer">
                        {client.name}
                      </a>
                    </h3>
                    <p className="mt-2 max-w-[24ch] text-[15px] leading-snug text-white/90">{client.line}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative scroll-mt-24 overflow-hidden bg-surface" id="wins">
        <StrandField />
        <div className="relative mx-auto max-w-page px-6 section-pad md:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">Case studies</p>
            <h2 className="mt-4 font-display text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.96]">Selected growth wins</h2>
          </Reveal>
          <div className="mt-8">
            {wins.map((win, index) => (
              <Win key={win.id} win={win} flip={index % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative scroll-mt-24 overflow-hidden bg-ground" id="dimensions">
        <div className="mx-auto max-w-page px-6 section-pad md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">What I optimize</p>
              <h2 className="mt-4 max-w-[14ch] font-display text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[0.98]">
                Six places growth actually leaks.
              </h2>
            </Reveal>
            <Link className="text-[15px] underline decoration-ink/30 underline-offset-4" to="/methodology">
              Read the method
            </Link>
          </div>
          <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dimensions.map((item) => (
              <li key={item.id} className="group bg-surface p-7">
                <Glyph name={item.id} />
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">{item.n}</p>
                <h3 className="mt-2 font-display text-[1.7rem] leading-none">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-snug text-mute">{item.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section ref={offerRef} className="wash-host relative scroll-mt-24 overflow-hidden" id="engagements">
        <StrandField />
        <div className="relative mx-auto max-w-page px-6 section-pad md:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">Three ways to work together</p>
            <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[0.98]">
              A review, a sprint, or a continuing partner.
            </h2>
          </Reveal>
          <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-3">
            <article id="review" className="flex scroll-mt-28 flex-col border border-ink/10 bg-surface p-6 md:p-8">
              <span id="audit" />
              <OfferArt name="review" />
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">01 · One working day</p>
              <h3 className="mt-3 font-display text-[2.1rem] leading-none">App Growth Review</h3>
              <p className="mt-4 font-mono text-[2.2rem] leading-none">$350</p>
              <p className="mt-4 text-[17px] leading-snug">Find out what's holding your app back.</p>
              <p className="mt-3 text-[14px] leading-snug text-mute">A focused review. Not an exhaustive audit.</p>
              <ul className="mt-6 border-t border-ink/10">
                {auditItems.map((item) => (
                  <li key={item} className="border-b border-ink/10 py-2.5 text-[14px] leading-snug">{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-[13px] leading-snug text-mute">No implementation, no A/B test execution, and no ongoing support.</p>
              <a className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-ink px-4 py-3 text-center text-[15px] text-ground" href={AUDIT_MAIL}>
                Get your App Growth Review
              </a>
            </article>

            <article id="sprint" className="on-graphite flex scroll-mt-28 flex-col bg-graphite p-6 text-ground md:p-8">
              <OfferArt name="sprint" />
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-foam">02 · 7 days + day 30 · two a month</p>
              <h3 className="mt-3 font-display text-[2.1rem] leading-none">Growth Sprint</h3>
              <p className="mt-4 font-mono text-[2.2rem] leading-none">$2,800</p>
              <p className="mt-4 text-[17px] leading-snug">A deeper diagnosis. A clear growth direction.</p>
              <ul className="mt-6 border-t border-white/15">
                {sprintItems.map((item) => (
                  <li key={item} className="border-b border-white/15 py-2.5 text-[14px]">{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-[13px] leading-snug text-foam">Two rounds of rework if it misses the brief. Your team ships.</p>
              <a className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-4 py-3 text-center text-[15px] text-ink hover:bg-accent-hover" href={CAL_SPRINT} target="_blank" rel="noopener noreferrer">
                Explore the Growth Sprint
              </a>
            </article>

            <article id="advisory" className="flex scroll-mt-28 flex-col border border-tide/40 bg-ground p-6 md:p-8">
              <OfferArt name="advisory" />
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-tide">03 · Monthly · custom</p>
              <h3 className="mt-3 font-display text-[2.1rem] leading-none">Monthly Growth Advisory</h3>
              <p className="mt-4 font-mono text-[2.2rem] leading-none">Custom</p>
              <p className="mt-4 text-[17px] leading-snug">Your external product growth partner.</p>
              <ul className="mt-6 border-t border-ink/10">
                {advisoryItems.map((item) => (
                  <li key={item} className="border-b border-ink/10 py-2.5 text-[14px] leading-snug">{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-[13px] leading-snug text-mute">Advisory only. Not an implementation retainer, and not a development retainer.</p>
              <a className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md border border-ink px-4 py-3 text-center text-[15px]" href={CAL_ADVISORY} target="_blank" rel="noopener noreferrer">
                Discuss a monthly partnership
              </a>
            </article>
          </div>
          <ul className="mt-8 grid gap-2 md:grid-cols-3">
            {outOfScope.map((item) => (
              <li key={item} className="text-[14px] text-mute">Outside every engagement: {item}.</li>
            ))}
          </ul>
          <p className="mt-4 text-[14px] text-mute">An NDA on every engagement. Invoices in USD, EUR, or GBP.</p>
        </div>
      </section>

      <section ref={dataRef} className="wash-host relative scroll-mt-24 overflow-hidden bg-surface" id="analytics">
        <div className="relative mx-auto max-w-page px-6 section-pad md:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">Behavior to outcome</p>
            <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[0.98]">
              User behavior, then the business result.
            </h2>
          </Reveal>
          <ol className="mt-8 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[12px] uppercase tracking-[0.14em] text-tide">
            <li>User behavior</li>
            <li aria-hidden="true">→</li>
            <li>Product insight</li>
            <li aria-hidden="true">→</li>
            <li>Growth opportunity</li>
            <li aria-hidden="true">→</li>
            <li>Business outcome</li>
          </ol>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {tools.map((tool) => (
              <li key={tool.id} className="group flex gap-4 border border-ink/10 bg-ground/80 p-5">
                <ToolMark logo={tool.logo} name={tool.name} />
                <div>
                  <h3 className="font-display text-[1.6rem] leading-none">{tool.name}</h3>
                  <p className="mt-2 text-[14px] leading-snug text-mute">{tool.line}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-12 max-w-xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Instrumentation · scoped separately</p>
            <p className="mt-3 text-[16px] leading-relaxed">
              Optional, and priced on its own. Not part of the $350 review. PostHog is one option. Amplitude, Mixpanel, and RevenueCat are not substitutes for each other.
            </p>
          </div>
        </div>
      </section>

      <section className="scroll-mt-24" id="about">
        <div className="mx-auto grid max-w-page items-center gap-14 px-6 section-pad md:grid-cols-[0.72fr_1.28fr] md:px-10">
          <Reveal>
            <figure>
              <img src="/assets/hugo.jpg" alt="Hugo Blanchart" width={900} height={900} className="aspect-[4/5] w-full max-w-sm object-cover" />
              <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Hugo Blanchart</figcaption>
            </figure>
          </Reveal>
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">The person on the work</p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[0.98]">Independent Product Growth Strategist.</h2>
            <p className="mt-4 max-w-lg text-[1.05rem] leading-snug">
              I work with consumer mobile apps across product, growth, monetization, and conversion. Clients work with me. There is no account team in between.
            </p>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-mute">
              The practice is connecting a product decision to a business result: onboarding, paywalls, subscriptions, retention, and the analytics that make those calls reliable.
            </p>
            <ul className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4" aria-label="Teams Hugo has worked with">
              {logos.map((logo) => (
                <li key={logo.alt}>
                  <img src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="h-6 w-auto max-w-[6.75rem] object-contain object-left opacity-80" />
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-lg text-[13px] leading-snug text-mute">
              Voodoo, Heineken, and Biogen are teams I have worked with. Not employers, and not the results above. Prose is both a team and one of those results.
            </p>
            <a className="mt-6 inline-block underline decoration-ink/30 underline-offset-4" href={`mailto:${MAIL}`}>{MAIL}</a>
          </Reveal>
        </div>
      </section>

      <section className="on-graphite wash-host-dark wash-shift relative overflow-hidden text-ground">
        <StrandField tone="dark" />
        <div className="relative mx-auto max-w-page px-6 section-pad md:px-10">
          <HelixMark className="mb-10 w-full max-w-md text-ground/40" />
          <h2 className="max-w-[12ch] font-display text-[clamp(2.8rem,6vw,5rem)] leading-[0.94]">
            Tell me where the product is leaking.
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 py-3 text-[15px] text-ink hover:bg-accent-hover" href={CAL} target="_blank" rel="noopener noreferrer">
              Let's talk about your app
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

function Figure({ value }: { value: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.p
      className="font-display text-[clamp(4.5rem,8vw,7.2rem)] leading-[0.84] text-ground"
      initial={reduce ? false : { y: 28, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.7, ease }}
    >
      {value}
    </motion.p>
  );
}

function Win({
  win,
  flip,
}: {
  win: (typeof wins)[number];
  flip: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <article className="grid items-center gap-10 border-t border-ink/10 py-16 first:border-t-0 lg:grid-cols-2 lg:gap-16 lg:py-24">
      <div className={flip ? "lg:order-2" : ""}>
        <img src={win.logo} alt="" className={win.logoClass} />
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-tide">{win.n}</p>
        <h3 className="mt-3 max-w-[16ch] font-display text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.02]">{win.headline}</h3>
        <div className="mt-6 max-w-[38ch] space-y-2 text-[17px] leading-snug">
          {win.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
      <motion.figure
        className={flip ? "lg:order-1" : ""}
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease }}
      >
        <div className={`overflow-hidden rounded-[1.25rem] ${win.id === "prose" ? "bg-[#f6ebe6]" : win.id === "perifit" ? "bg-[#071c18]" : "bg-[#071426]"}`}>
          <img
            src={win.image}
            alt={win.imageAlt}
            className={`w-full ${win.id === "prose" ? "aspect-[4/5] origin-center scale-[1.45] object-cover" : "max-h-[640px] object-contain"}`}
            loading="lazy"
          />
        </div>
        <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">{win.caption}</figcaption>
      </motion.figure>
    </article>
  );
}

function ToolMark({ logo, name }: { logo: string; name: string }) {
  if (!logo) {
    return (
      <span className="grid h-10 w-10 shrink-0 place-items-center border border-ink/15 font-display text-[1.3rem] leading-none" aria-hidden="true">
        {name.slice(0, 1)}
      </span>
    );
  }
  return <img src={logo} alt="" className="h-10 w-10 shrink-0 object-contain" />;
}
