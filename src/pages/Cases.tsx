import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { CAL, wins } from "../content";
import { HelixMark, StrandField } from "../components/Helix";
import { Reveal } from "../components/Reveal";
import { usePageMeta } from "../lib/meta";

const ease = [0.22, 1, 0.36, 1] as const;

export function Cases() {
  usePageMeta(
    "Case studies — Helix Growth",
    "Wizz, Prose, and Perifit. What changed in monetization, onboarding, and the paywall.",
    "https://helixgrowth.io/case-studies/",
  );

  return (
    <main id="main">
      <section className="relative overflow-hidden">
        <StrandField />
        <div className="relative mx-auto max-w-page px-6 pb-4 pt-16 md:px-10 md:pt-24">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">Case studies</p>
            <h1 className="mt-4 max-w-[14ch] font-display text-[clamp(2.8rem,6vw,4.8rem)] leading-[0.94]">
              The work behind the figures.
            </h1>
            <p className="mt-5 max-w-[42ch] text-[1.05rem] leading-relaxed text-mute">
              Three engagements. The same results as the homepage, with what was actually changed.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="mx-auto max-w-page px-6 pb-8 md:px-10">
        {wins.map((win, index) => (
          <Win key={win.id} win={win} flip={index % 2 === 1} />
        ))}
      </section>
      <section className="on-graphite relative overflow-hidden text-ground">
        <StrandField tone="dark" />
        <div className="relative mx-auto flex max-w-page flex-wrap items-end justify-between gap-8 px-6 py-16 md:px-10 md:py-20">
          <div>
            <HelixMark className="mb-8 w-full max-w-xs text-ground/50" />
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.96]">Bring the next product.</h2>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 py-3 text-[15px] text-ink hover:bg-accent-hover" href={CAL} target="_blank" rel="noopener noreferrer">
              Let's grow your app
            </a>
            <Link className="text-[15px] text-ground underline decoration-white/30 underline-offset-4" to="/">
              Back to the homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
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
        <h2 className="mt-3 max-w-[16ch] font-display text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.02]">{win.headline}</h2>
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
