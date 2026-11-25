import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  AUDIT_MAIL,
  CAL,
  CAL_ADVISORY,
  CAL_SPRINT,
  advisoryItems,
  auditItems,
  clients,
  fitNo,
  fitYes,
  outOfScope,
  results,
  signals,
  sprintItems,
} from "../content";
import { usePageMeta } from "../lib/meta";
import { OfferArt } from "../components/Glyphs";
import { HelixField, HelixMark, StrandField, useHelixWash } from "../components/Helix";
import { PortraitFilm } from "../components/PortraitFilm";
import { Reveal } from "../components/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

export function Home() {
  usePageMeta(
    "Helix Growth — Turn more users into revenue",
    "Mobile app growth agency for founders. App monetization, onboarding optimization, paywall optimization, conversion, and subscription retention.",
    "https://helixgrowth.io/",
  );

  const heroRef = useHelixWash<HTMLElement>();
  const offerRef = useHelixWash<HTMLElement>();

  return (
    <main id="main">
      <section ref={heroRef} className="wash-host wash-shift relative overflow-hidden" id="top">
        <StrandField />
        <div className="relative mx-auto grid max-w-page items-center gap-14 px-6 section-pad md:px-10 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">Mobile app growth agency</p>
            <h1 className="mt-5 font-display text-[clamp(3.4rem,6.5vw,5.7rem)] leading-[0.9]">
              Turn your users
              <span className="block">into revenue.</span>
            </h1>
            <p className="mt-6 max-w-[40ch] text-[1.12rem] leading-relaxed">
              We help you unlock growth opportunities across onboarding, monetization and retention through insights, behavioral analysis and data-driven decisions.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 py-3 text-[15px] text-ink hover:bg-accent-hover" href={CAL} target="_blank" rel="noopener noreferrer">
                Let's grow your app
              </a>
              <a className="text-[15px] underline decoration-ink/30 underline-offset-4 hover:decoration-ink" href="#clients">
                Explore our work
              </a>
            </div>
          </Reveal>
          <div className="min-w-0">
            <div className="relative h-[280px] md:h-[400px]">
              <HelixField className="absolute inset-0" />
            </div>
            <p className="mt-3 max-w-[34ch] font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-mute">
              Onboarding, monetization, retention. One reading of the product.
            </p>
          </div>
        </div>
      </section>

      <section className="on-graphite wash-host-dark wash-shift relative scroll-mt-24 overflow-hidden text-ground" id="results">
        <StrandField tone="dark" />
        <div className="relative mx-auto max-w-page px-6 section-pad md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foam">Recorded results</p>
              <h2 className="mt-4 max-w-[12ch] font-display text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.96]">Three results.</h2>
            </Reveal>
            <Link className="text-[15px] text-ground underline decoration-white/30 underline-offset-4" to="/case-studies">
              Read the case studies
            </Link>
          </div>
          <div className="mt-16 grid gap-16 md:grid-cols-3 md:gap-10">
            {results.map((item) => (
              <article key={item.id}>
                <Figure value={item.figure} />
                <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.16em] text-foam">{item.label}</p>
                <p className="mt-3 font-display text-[1.7rem] leading-none">{item.name}</p>
                <p className="mt-3 max-w-[28ch] text-[15px] leading-snug text-foam">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative scroll-mt-24 overflow-hidden" id="clients">
        <span id="work" className="sr-only">Work</span>
        <div className="relative mx-auto max-w-page px-6 section-pad md:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">Selected clients</p>
            <h2 className="mt-4 max-w-[14ch] font-display text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.96]">In the product.</h2>
          </Reveal>
          <ul className="mt-16 grid gap-6 lg:grid-cols-3">
            {clients.map((client, index) => (
              <li key={client.id} className="min-w-0">
                <article className="film-card group relative aspect-[9/16] overflow-hidden bg-graphite">
                  <PortraitFilm
                    kind={client.kind}
                    id={client.film}
                    title={client.filmTitle}
                    delay={index * 700}
                    start={client.start}
                    poster={client.poster || undefined}
                    crop={client.kind === "youtube" ? "landscape" : "native"}
                    tone={client.id === "prose" ? "rose" : client.id === "perifit" ? "pine" : "navy"}
                  />
                  <div className={`pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[58%] ${client.kind === "tiktok" ? (client.id === "prose" ? "bg-[#2a181c]" : "bg-[#07111f]") : ""}`} />
                  <div className={`pointer-events-none absolute inset-0 z-[6] bg-gradient-to-t ${client.gradient}`} />
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white md:p-6">
                    <img src={client.logo} alt="" className={client.logoClass} />
                    <h3 className="mt-4 font-display text-[2.15rem] leading-none">{client.name}</h3>
                    <p className="mt-2 text-[15px] leading-snug text-white/85">{client.product}</p>
                    <p className="mt-2 text-[15px] leading-snug">{client.achievement}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {client.links.map((link) => (
                        <a
                          key={link.href}
                          className="inline-flex min-h-9 items-center rounded-full border border-white/40 px-3 py-1.5 text-[13px] text-white hover:bg-white/10"
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative scroll-mt-24 overflow-hidden bg-surface" id="beyond">
        <div className="mx-auto grid max-w-page items-center gap-14 px-6 section-pad md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">The difference</p>
            <h2 className="mt-4 max-w-[14ch] font-display text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.96]">
              Look beyond the dashboard.
            </h2>
            <p className="mt-6 max-w-[42ch] text-[1.05rem] leading-relaxed">
              We don't find a low conversion rate and stop at a new screen. We investigate the behavior behind the numbers, connecting quantitative data, qualitative insight, and the product experience.
            </p>
            <p className="mt-6 max-w-[28ch] font-display text-[clamp(1.7rem,2.4vw,2.15rem)] leading-[1.15]">
              A metric tells you what happened. Understanding user behavior helps you investigate why.
            </p>
            <p className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-mute">
              Clients leave with a clearer product decision, and a stronger chance at subscription app growth.
            </p>
            <Link className="mt-6 inline-block text-[15px] underline decoration-ink/30 underline-offset-4" to="/methodology">
              Read the method
            </Link>
          </Reveal>
          <SignalPanel />
        </div>
      </section>

      <section className="scroll-mt-24" id="fit">
        <div className="mx-auto max-w-page px-6 section-pad md:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">Who we work with</p>
            <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2.5rem,5vw,4.2rem)] leading-[0.96]">
              Not every app is ready for growth. And that's okay.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-4 lg:grid-cols-2">
            <article className="border-t-4 border-tide bg-surface p-7 md:p-10">
              <h3 className="font-display text-[1.85rem] leading-none">We're a good fit if...</h3>
              <ul className="mt-8 space-y-4">
                {fitYes.map((line) => (
                  <li key={line} className="flex gap-3 text-[15px] leading-snug">
                    <FitMark ok />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="on-graphite border-t-4 border-accent bg-graphite p-7 text-ground md:p-10">
              <h3 className="font-display text-[1.85rem] leading-none">We're probably not a fit if...</h3>
              <ul className="mt-8 space-y-4">
                {fitNo.map((line) => (
                  <li key={line} className="flex gap-3 text-[15px] leading-snug text-foam">
                    <FitMark ok={false} />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section ref={offerRef} className="wash-host relative scroll-mt-24 overflow-hidden bg-ground" id="engagements">
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

      <section className="on-graphite wash-host-dark wash-shift relative overflow-hidden text-ground">
        <StrandField tone="dark" />
        <div className="relative mx-auto max-w-page px-6 section-pad md:px-10">
          <HelixMark className="mb-10 w-full max-w-md text-ground/50" />
          <h2 className="max-w-[14ch] font-display text-[clamp(2.8rem,6vw,5rem)] leading-[0.94]">
            Bring a live product.
          </h2>
          <p className="mt-5 max-w-[36ch] text-[1.05rem] leading-relaxed text-foam">
            We'll read the behavior behind the numbers, and the product decision that follows.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 py-3 text-[15px] text-ink hover:bg-accent-hover" href={CAL} target="_blank" rel="noopener noreferrer">
              Let's grow your app
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
      className="font-display text-[clamp(4.6rem,8vw,7.4rem)] leading-[0.82] text-accent"
      initial={reduce ? false : { y: 28, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.7, ease }}
    >
      {value}
    </motion.p>
  );
}

function SignalPanel() {
  const strand = (phase: number) => {
    let d = "";
    for (let i = 0; i <= 72; i++) {
      const u = i / 72;
      const x = 20 + Math.sin(u * Math.PI * 4 + phase) * 9;
      const y = 6 + u * 308;
      d += `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)} `;
    }
    return d;
  };

  return (
    <div className="group overflow-hidden bg-graphite px-6 py-8 text-ground md:px-8 md:py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-foam">What we investigate</p>
      <div className="relative mt-6">
        <svg className="pointer-events-none absolute inset-y-0 left-0 h-full w-10" viewBox="0 0 40 320" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <path className="strand" d={strand(0)} fill="none" stroke="#D9D0C3" strokeWidth="1.3" />
          <path className="strand" d={strand(Math.PI)} fill="none" stroke="#3E6D88" strokeWidth="1.3" />
        </svg>
        <ul>
          {signals.map((signal, index) => (
            <li key={signal.id} className="grid grid-cols-[2.5rem_1fr] items-center border-b border-white/10 py-[1.05rem] last:border-b-0">
              <span className={`relative z-10 h-2.5 w-2.5 justify-self-center rounded-full ${index % 2 ? "bg-tide" : "bg-accent"}`} />
              <span className="text-[16px] leading-snug">{signal.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FitMark({ ok }: { ok: boolean }) {
  if (ok) {
    return (
      <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-tide" aria-hidden="true">
        <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <path d="M6 10.2 8.7 13 14 7.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true">
      <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <path d="M7 7l6 6M13 7l-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
