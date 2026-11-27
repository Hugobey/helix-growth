import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  CAL,
  clients,
  fitNo,
  fitYes,
  outOfScope,
  plans,
  results,
  signals,
} from "../content";
import { usePageMeta } from "../lib/meta";
import { OfferArt } from "../components/Glyphs";
import { HelixField, HelixMark, StrandField, useHelixWash } from "../components/Helix";
import { iconForLine, PointIcon } from "../components/PointIcon";
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
              We help ambitious founders to unlock growth opportunities.
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
          <div className="hero-aside min-w-0">
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
              <h2 className="mt-4 max-w-[12ch] font-display text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.96]">Some results.</h2>
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
            <h2 className="mt-4 max-w-[14ch] font-display text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.96]">We worked together</h2>
          </Reveal>
          <ul className="mt-16 grid gap-6 lg:grid-cols-3">
            {clients.map((client, index) => (
              <li key={client.id} className="min-w-0">
                <article className="film-card group relative aspect-[9/16] overflow-hidden bg-graphite">
                  <div className="film-frame relative h-full overflow-hidden bg-graphite">
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
                    <div className={`film-shade pointer-events-none absolute inset-0 z-[6] bg-gradient-to-t ${client.gradient}`} />
                  </div>
                  <div className="film-copy absolute inset-x-0 bottom-0 z-10 p-5 text-white md:p-6">
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
              Our holistic approach.
            </h2>
            <p className="mt-6 max-w-[42ch] text-[1.05rem] leading-relaxed">
              We don't just look at a conversion rate. We dissect the user behavior and deep dive into the related metrics.
            </p>
            <p className="mt-6 max-w-[28ch] font-display text-[clamp(1.7rem,2.4vw,2.15rem)] leading-[1.15]">
              The data tells you what happened. We tell you why, and what to do next.
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
              We're selective.
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
          <Reveal className="editorial-lead">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">Three ways to work together</p>
            <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[0.98]">
              A review, a sprint, or a continuing partner.
            </h2>
            <p className="mt-5 max-w-[36rem] text-[1.05rem] leading-relaxed">
              <Link className="underline decoration-ink/30 underline-offset-4" to="/pricing">Compare the three on the pricing page.</Link>
            </p>
          </Reveal>
          <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                id={plan.id}
                key={plan.id}
                data-plan={plan.id}
                className={`flex scroll-mt-28 flex-col p-6 md:p-8 ${plan.recommended ? "on-graphite bg-graphite text-ground" : "border border-ink/10 bg-surface"}`}
              >
                {plan.id === "review" && <span id="audit" />}
                <OfferArt name={plan.id} />
                <p className={`font-mono text-[11px] uppercase tracking-[0.16em] ${plan.recommended ? "text-foam" : "text-mute"}`}>{plan.kicker}</p>
                <h3 className="mt-3 font-display text-[2.1rem] leading-none">{plan.name}</h3>
                <p className={`mt-4 font-display leading-[1.05] ${plan.priceSize === "figure" ? "text-[2.4rem]" : "text-[1.7rem]"}`}>{plan.price}</p>
                <p className="mt-4 text-[17px] leading-snug">{plan.position}</p>
                <ul className={`mt-6 border-t ${plan.recommended ? "border-white/15" : "border-ink/10"}`}>
                  {plan.benefits.map((item) => (
                    <li key={item} className={`flex items-start gap-3 border-b py-2.5 text-[14px] leading-snug ${plan.recommended ? "border-white/15" : "border-ink/10"}`}>
                      <PointIcon name={iconForLine(item)} className="point-icon mt-0.5 h-[1.15rem] w-[1.15rem] shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className={`mt-4 text-[13px] leading-snug ${plan.recommended ? "text-foam" : "text-mute"}`}>
                  {plan.id === "review" && "A focused review. Not a full audit, and not an implementation."}
                  {plan.id === "sprint" && "A strategy engagement of about seven days. Your team builds the changes."}
                  {plan.id === "advisory" && "Ongoing guidance. Not a development retainer. No monthly price until we scope it."}
                </p>
                <a
                  className={`mt-auto inline-flex min-h-11 items-center justify-center rounded-md px-4 py-3 text-center text-[15px] ${plan.recommended ? "bg-accent text-ink hover:bg-accent-hover" : plan.id === "review" ? "bg-ink text-ground" : "border border-ink"}`}
                  href={plan.href}
                  {...(plan.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {plan.cta}
                </a>
              </article>
            ))}
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
            Let's make your app more profitable.
          </h2>
          <p className="mt-5 max-w-[36ch] text-[1.05rem] leading-relaxed text-foam">
            We'll read behind the numbers and the behaviors, to help you make the product decision that follows.
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
  return (
    <div className="signal-panel group overflow-hidden bg-graphite px-6 py-8 text-ground md:px-8 md:py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-foam">What we investigate</p>
      <ul className="mt-6">
        {signals.map((signal) => (
          <li key={signal.id} className="grid grid-cols-[2.75rem_1fr] items-center gap-3 border-b border-white/10 py-3 last:border-b-0">
            <span className="point-mark grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-[#FF4D1C]">
              <PointIcon name={signal.id} />
            </span>
            <span className="text-[16px] leading-snug">{signal.label}</span>
          </li>
        ))}
      </ul>
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
