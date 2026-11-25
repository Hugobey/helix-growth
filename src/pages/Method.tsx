import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { AUDIT_MAIL, CAL_SPRINT, causes, faqs, lenses, metrics, scenarios } from "../content";
import type { Step } from "../content";
import { Bench } from "../components/Bench";
import { Glyph } from "../components/Glyphs";
import { HelixMark } from "../components/Helix";
import { Reveal } from "../components/Reveal";
import { usePageMeta } from "../lib/meta";
import { onTabKey } from "../lib/tabs";

const ease = [0.22, 1, 0.36, 1] as const;
const subnav = [
  ["dimensions", "Dimensions"],
  ["scenarios", "Scenarios"],
  ["journey", "Simulations"],
  ["metrics", "Metrics"],
] as const;

export function Method() {
  usePageMeta(
    "How mobile growth is read — Helix Growth",
    "Six growth dimensions. Illustrative counts, not client results.",
    "https://helixgrowth.io/methodology/",
  );

  const { hash } = useLocation();
  const fromHash = lenses.find((lens) => lens.id === hash.slice(1))?.id ?? lenses[0].id;
  const [lensId, setLensId] = useState(fromHash);
  const [scenario, setScenario] = useState(0);
  const [cause, setCause] = useState(0);
  const [metric, setMetric] = useState(0);
  const reduce = useReducedMotion();
  const lens = lenses.find((item) => item.id === lensId) ?? lenses[0];
  const scene = scenarios[scenario];
  const metricItem = metrics[metric];

  useEffect(() => {
    const id = hash.slice(1);
    const match = lenses.find((item) => item.id === id);
    if (match) setLensId(match.id);
  }, [hash]);

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

  const selectLens = (id: string, focus = false) => {
    setLensId(id);
    if (focus) document.getElementById(id)?.focus();
  };

  const selectScenario = (index: number, focus = false) => {
    setScenario(index);
    if (focus) document.getElementById(`tab-${scenarios[index].id}`)?.focus();
  };

  const selectMetric = (index: number, focus = false) => {
    setMetric(index);
    if (focus) document.getElementById(`metric-${metrics[index].id}`)?.focus();
  };

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

      <section className="mx-auto max-w-page px-6 pb-8 pt-16 md:px-10 md:pt-20" data-od-id="method-hero">
        <div className="grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Method</p>
            <h1 className="mt-4 max-w-[14ch] font-display text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.96]">
              A rate is not a result.
            </h1>
            <p className="mt-5 max-w-xl text-[1.05rem] leading-snug">
              Onboarding, paywalls, retention, product UX, subscriptions, and the analytics that keep a test honest. Every count on this page is illustrative.
            </p>
          </div>
          <HelixMark className="w-full text-ink" />
        </div>
      </section>

      <section id="dimensions" className="scroll-mt-32 border-t border-ink/10 bg-surface py-[72px]" data-od-id="lens-reader">
        <div className="mx-auto grid max-w-page gap-10 px-6 md:px-10 lg:grid-cols-[220px_1fr]">
          <div role="tablist" aria-label="Lenses" className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {lenses.map((item, index) => (
              <button
                key={item.id}
                id={item.id}
                type="button"
                role="tab"
                aria-selected={item.id === lens.id}
                aria-controls="lens-panel"
                tabIndex={item.id === lens.id ? 0 : -1}
                className={`min-h-11 shrink-0 px-3 py-2 text-left text-[15px] lg:px-0 ${item.id === lens.id ? "text-ink" : "text-mute"}`}
                onClick={() => selectLens(item.id)}
                onKeyDown={(event) => onTabKey(event, index, lenses.length, (next) => selectLens(lenses[next].id, true))}
              >
                <span className="mr-3 font-mono text-[12px]">{item.n}</span>
                {item.title}
              </button>
            ))}
          </div>
          <article id="lens-panel" role="tabpanel" aria-labelledby={lens.id}>
            <motion.div
              key={lens.id}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease }}
            >
              <Glyph name={lens.id} />
              <h2 className="mt-4 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-none">{lens.title}</h2>
              <p className="mt-3 text-[1.05rem]">{lens.line}</p>
              <dl className="mt-8 grid gap-6 md:grid-cols-3">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Problem</dt>
                  <dd className="mt-2 text-[15px] leading-snug">{lens.problem}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Lever</dt>
                  <dd className="mt-2 text-[15px] leading-snug">{lens.lever}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Measure</dt>
                  <dd className="mt-2 text-[15px] leading-snug">{lens.measure}</dd>
                </div>
              </dl>
            </motion.div>
          </article>
        </div>
      </section>

      <section id="scenarios" className="scroll-mt-32 border-t border-ink/10 py-[72px]" data-od-id="scenarios">
        <div className="mx-auto max-w-page px-6 md:px-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Illustrative scenarios</p>
          <h2 className="mt-3 max-w-[18ch] font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.05]">
            The same symptom is not the same problem.
          </h2>
          <div className="mt-8 flex gap-2 overflow-x-auto" role="tablist" aria-label="Scenarios">
            {scenarios.map((item, index) => (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={index === scenario}
                aria-controls={`panel-${item.id}`}
                tabIndex={index === scenario ? 0 : -1}
                className={`min-h-11 shrink-0 border px-3 py-2 text-left text-[14px] ${index === scenario ? "border-ink bg-ink text-ground" : "border-ink/10"}`}
                onClick={() => selectScenario(index)}
                onKeyDown={(event) => onTabKey(event, index, scenarios.length, (next) => selectScenario(next, true))}
              >
                {item.tab}
              </button>
            ))}
          </div>
          <article id={`panel-${scene.id}`} role="tabpanel" aria-labelledby={`tab-${scene.id}`} className="mt-8">
            <h3 className="font-display text-[1.8rem] font-bold leading-[1.05]">{scene.title}</h3>
            <p className="mt-3 max-w-2xl text-[16px] leading-snug">{scene.lead}</p>
            <dl className="mt-6 grid gap-4 md:grid-cols-2">
              {scene.rows.map((row) => (
                <div key={row.dt} className="border-t border-ink/10 pt-3">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">{row.dt}</dt>
                  <dd className="mt-2 text-[15px] leading-snug">{row.dd}</dd>
                </div>
              ))}
            </dl>
            {scene.before && scene.after && (
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <Phone title={scene.before.title} steps={scene.before.steps} />
                <Phone title={scene.after.title} steps={scene.after.steps} />
              </div>
            )}
            {scene.extra === "curve" && <Curve />}
            {scene.extra === "causes" && (
              <div className="mt-8 grid gap-4 lg:grid-cols-[260px_1fr]">
                <div role="group" aria-label="Possible causes" className="flex flex-col">
                  {causes.map((item, index) => (
                    <button
                      key={item.label}
                      type="button"
                      aria-pressed={index === cause}
                      onClick={() => setCause(index)}
                      className={`min-h-11 border-t border-ink/10 py-3 text-left text-[15px] ${index === cause ? "text-ink" : "text-mute"}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <p className="border border-ink/10 bg-surface p-5 text-[17px] leading-snug" aria-live="polite">{causes[cause].note}</p>
              </div>
            )}
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Illustrative. Not a client, and not an outcome.</p>
          </article>
        </div>
      </section>

      <section id="journey" className="scroll-mt-32 border-t border-ink/10 py-[72px]" data-od-id="journey">
        <div className="mx-auto grid max-w-page gap-10 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Simulations</p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.05]">Teaching counts. Not a client.</h2>
            <p className="mt-4 max-w-sm text-[16px] leading-snug text-mute">
              The loudest rate is not always the one that earns money. Switch the instrument. Nothing here is a client result.
            </p>
          </Reveal>
          <Bench initial="funnel" />
        </div>
      </section>

      <section id="metrics" className="scroll-mt-32 border-t border-ink/10 bg-surface py-[72px]" data-od-id="metrics">
        <div className="mx-auto max-w-page px-6 md:px-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Metrics</p>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.05]">A rate is a sentence.</h2>
          <div className="mt-8 flex gap-2 overflow-x-auto" role="tablist" aria-label="Metrics">
            {metrics.map((item, index) => (
              <button
                key={item.id}
                id={`metric-${item.id}`}
                type="button"
                role="tab"
                aria-selected={index === metric}
                aria-controls="metric-panel"
                tabIndex={index === metric ? 0 : -1}
                className={`min-h-11 shrink-0 border px-3 py-2 text-[14px] ${index === metric ? "border-ink bg-ink text-ground" : "border-ink/10 bg-surface"}`}
                onClick={() => selectMetric(index)}
                onKeyDown={(event) => onTabKey(event, index, metrics.length, (next) => selectMetric(next, true))}
              >
                {item.tab}
              </button>
            ))}
          </div>
          <article id="metric-panel" role="tabpanel" className="mt-6 max-w-2xl">
            <h3 className="font-display text-[1.8rem] font-bold">{metricItem.title}</h3>
            <p className="mt-3 text-[17px] leading-snug">{metricItem.body}</p>
          </article>
          <div className="mt-14 border-t border-ink/10 pt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Worked example · illustrative · 1,000 eligible users each</p>
            <div className="mt-6 grid gap-8 md:grid-cols-2">
              <StaticMeter title="Variant A" rate="8% trial start · 40% of those trials pay" trials={80} paid={32} />
              <StaticMeter title="Variant B" rate="10% trial start · 30% of those trials pay" trials={100} paid={30} />
            </div>
            <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-mute">
              B starts more trials and ends with fewer paying users: 100 trials and 30 paid, against 80 trials and 32 paid. A higher trial-start rate is not better monetization. One scale, 100 as the full width. Round arithmetic. Not a test, not a client, and silent on significance.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 py-[72px]" id="questions">
        <div className="mx-auto grid max-w-page gap-8 px-6 md:grid-cols-[0.7fr_1.3fr] md:px-10">
          <h2 className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.05]">Before you write.</h2>
          <div className="border-b border-ink/10">
            {faqs.map((item) => (
              <details key={item.q} className="border-t border-ink/10 py-3">
                <summary className="cursor-pointer text-[17px]">{item.q}</summary>
                <p className="max-w-xl pt-2 text-[15px] leading-relaxed text-mute">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="on-graphite bg-graphite py-[72px] text-ground" data-od-id="method-close">
        <div className="mx-auto max-w-page px-6 md:px-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-foam">Next</p>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.05]">Want this read on your app.</h2>
          <p className="mt-4 max-w-lg text-[16px] leading-snug text-foam">The App Growth Review is $350. One working day. Three to five recommendations. Not a build.</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 py-3 text-[15px] text-ink hover:bg-accent-hover" href={AUDIT_MAIL}>
              Get your App Growth Review
            </a>
            <a className="text-[15px] text-ground underline decoration-white/30 underline-offset-4" href={CAL_SPRINT} target="_blank" rel="noopener noreferrer">Or the sprint</a>
          </div>
        </div>
      </section>
    </main>
  );
}

function Phone({ title, steps }: { title: string; steps: Step[] }) {
  const reduce = useReducedMotion();
  return (
    <div className="border border-ink/10 p-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">{title}</p>
      <ol className="mt-4 space-y-2">
        {steps.map((step, index) => (
          <motion.li
            key={step.t}
            className={`text-[15px] ${step.leak ? "text-mute line-through decoration-ink/20" : ""}`}
            initial={reduce ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: reduce ? 0 : index * 0.05, ease }}
          >
            <span className="mr-3 font-mono text-[12px] text-mute">0{index + 1}</span>
            {step.t}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

function Curve() {
  const reduce = useReducedMotion();
  return (
    <div className="mt-8">
      <p className="text-[13px] text-mute">Two imaginary cohorts. Not anyone's data.</p>
      <svg className="mt-4 h-auto w-full" viewBox="0 0 640 220" role="img" aria-label="Two illustrative retention curves. One falls in the first week. One declines more slowly.">
        <path d="M40 20 V190 H620" fill="none" stroke="rgba(28,25,22,0.2)" />
        <motion.path
          d="M40 36 C 120 48, 180 70, 250 96 C 340 128, 460 148, 610 158"
          fill="none"
          stroke="#1C1916"
          strokeWidth="1.6"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease }}
        />
        <motion.path
          d="M40 36 C 90 90, 150 150, 240 172 C 360 186, 480 190, 610 192"
          fill="none"
          stroke="#3E6D88"
          strokeWidth="1.6"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease }}
        />
      </svg>
      <p className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[13px] text-mute">
        <span>Slower fall. A habit starts in week one.</span>
        <span>Steep fall. A payment, then nothing to return to.</span>
      </p>
    </div>
  );
}

function StaticMeter({ title, rate, trials, paid }: { title: string; rate: string; trials: number; paid: number }) {
  const reduce = useReducedMotion();
  return (
    <div>
      <h3 className="font-display text-[1.5rem] font-bold">{title}</h3>
      <p className="mt-1 text-[14px] text-mute">{rate}</p>
      <Bar label="Trials" value={trials} reduce={Boolean(reduce)} />
      <Bar label="Paid" value={paid} reduce={Boolean(reduce)} tone="accent" />
    </div>
  );
}

function Bar({ label, value, reduce, tone = "ink" }: { label: string; value: number; reduce: boolean; tone?: "ink" | "accent" }) {
  return (
    <div className="mt-4">
      <div className="flex items-baseline justify-between">
        <span className="text-[13px]">{label}</span>
        <span className="font-mono text-[1.3rem]">{value}</span>
      </div>
      <div className="mt-1 h-2 bg-ground">
        <motion.div
          className={`h-full ${tone === "accent" ? "bg-accent" : "bg-ink"}`}
          initial={reduce ? false : { width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduce ? 0 : 0.6, ease }}
        />
      </div>
    </div>
  );
}
