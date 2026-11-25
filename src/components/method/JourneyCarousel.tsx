import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { finished, formatInt, opened, screens, stepRate } from "../../method/model";
import { onTabKey } from "../../lib/tabs";
import { Meter } from "./Meter";

const ease = [0.22, 1, 0.36, 1] as const;

const stages = [
  {
    id: "impression",
    n: "01",
    title: "First impression",
    question: "What does the user understand before starting?",
    investigate: ["Value proposition.", "Initial engagement.", "Expectations."],
  },
  {
    id: "onboarding",
    n: "02",
    title: "Onboarding",
    question: "Which steps create friction or unnecessary effort?",
    investigate: ["Step-level completion.", "Messaging.", "Trust.", "User input requirements."],
  },
  {
    id: "activation",
    n: "03",
    title: "Activation",
    question: "Does the user reach the first meaningful product experience?",
    investigate: ["Activation rate.", "Time to value.", "First meaningful action."],
  },
  {
    id: "monetization",
    n: "04",
    title: "Monetization",
    question: "Does the offer appear at the right moment and communicate enough value?",
    investigate: ["Paywall exposure.", "Offer relevance.", "Paid conversion.", "Revenue per user."],
  },
  {
    id: "retention",
    n: "05",
    title: "Retention",
    question: "Does the user have a reason to return and continue paying?",
    investigate: ["Cohort retention.", "Renewal.", "Engagement patterns.", "Churn signals."],
  },
] as const;

const weeks = [0, 1, 2, 4, 8];
const reached = [100, 52, 41, 31, 22];
const leftEarly = [100, 18, 10, 5, 2];

export function JourneyCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduce = useReducedMotion();
  const stage = stages[index];

  const go = (next: number, focus = false) => {
    if (next < 0 || next >= stages.length) return;
    setDirection(next > index ? 1 : -1);
    setIndex(next);
    if (focus) document.getElementById(`stage-${stages[next].id}`)?.focus();
  };

  return (
    <div>
      <p className="text-[15px] text-mute">Five stages. Select one, or use the arrows.</p>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5" role="tablist" aria-label="User journey">
        {stages.map((item, itemIndex) => {
          const on = itemIndex === index;
          return (
            <button
              key={item.id}
              id={`stage-${item.id}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="journey-panel"
              tabIndex={on ? 0 : -1}
              className={`min-h-11 border px-3 py-2 text-left ${on ? "border-ink bg-ink text-ground" : "border-ink/15 bg-ground"}`}
              onClick={() => go(itemIndex)}
              onKeyDown={(event) => onTabKey(event, itemIndex, stages.length, (next) => go(next, true))}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]">{item.n}</span>
              <span className="mt-1 block text-[15px]">{item.title}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-start gap-3">
        <button
          type="button"
          className="min-h-11 text-left text-[14px] disabled:opacity-30"
          disabled={index === 0}
          aria-label={index === 0 ? "Previous" : `Previous: ${stages[index - 1].title}`}
          onClick={() => go(index - 1)}
        >
          <span className="border-b border-ink/30 font-mono text-[11px] uppercase tracking-[0.14em]">Previous</span>
          {index > 0 && <span className="mt-1 block leading-tight">{stages[index - 1].title}</span>}
        </button>
        <p className="pt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
          {stage.n} / 05
        </p>
        <button
          type="button"
          className="min-h-11 text-right text-[14px] disabled:opacity-30"
          disabled={index === stages.length - 1}
          aria-label={index === stages.length - 1 ? "Next" : `Next: ${stages[index + 1].title}`}
          onClick={() => go(index + 1)}
        >
          <span className="border-b border-ink/30 font-mono text-[11px] uppercase tracking-[0.14em]">Next</span>
          {index < stages.length - 1 && <span className="mt-1 block leading-tight">{stages[index + 1].title}</span>}
        </button>
      </div>

      <div id="journey-panel" role="tabpanel" aria-labelledby={`stage-${stage.id}`} className="mt-6 overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.article
          key={stage.id}
          className="grid items-start gap-8 border border-ink/10 bg-ground p-5 md:p-8 lg:grid-cols-[0.9fr_1.1fr]"
          initial={reduce ? false : { opacity: 0, x: direction * 28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? { opacity: 1 } : { opacity: 0, x: direction * -20 }}
          transition={{ duration: reduce ? 0 : 0.28, ease }}
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-tide">{stage.n}</p>
            <h3 className="mt-2 font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-none">{stage.title}</h3>
            <p className="mt-4 text-[1.05rem] leading-relaxed">{stage.question}</p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Investigate</p>
            <ul className="mt-2 border-t border-ink/10">
              {stage.investigate.map((item) => (
                <li key={item} className="border-b border-ink/10 py-2 text-[15px]">{item}</li>
              ))}
            </ul>
          </div>
          <StageVisual id={stage.id} />
        </motion.article>
      </AnimatePresence>
      </div>
    </div>
  );
}

function StageVisual({ id }: { id: (typeof stages)[number]["id"] }) {
  if (id === "impression") return <Impression />;
  if (id === "onboarding") return <Onboarding />;
  if (id === "activation") return <Activation />;
  if (id === "monetization") return <Monetization />;
  return <Retention />;
}

function Caption({ children }: { children: string }) {
  return <p className="mt-3 text-[12px] leading-snug text-mute">{children}</p>;
}

function Impression() {
  const rows = [
    ["Before the app", "An ad or a store line promises a result."],
    ["First screen", "The product repeats the result, before any proof."],
    ["The question", "Can this person say what the product will do for them?"],
  ];
  return (
    <figure>
      <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Hypothetical · same 1,000 opens</figcaption>
      <ol className="mt-4 space-y-3">
        {rows.map(([title, body], index) => (
          <li key={title} className="grid grid-cols-[2rem_1fr] gap-3">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-tide" aria-hidden="true" />
            <span>
              <span className="sr-only">0{index + 1}. </span>
              <span className="block text-[15px]">{title}</span>
              <span className="mt-1 block text-[14px] leading-snug text-mute">{body}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-6 font-display text-[1.6rem] leading-none">860 of 1,000 continue</p>
      <p className="mt-2 text-[14px] text-mute">Median time on the promise: 8 seconds.</p>
      <Caption>Counts from the fictional onboarding. Not a client, and not a usability test.</Caption>
    </figure>
  );
}

function Onboarding() {
  return (
    <figure>
      <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Step completion · fictional</figcaption>
      <div className="mt-4 space-y-3">
        {screens.map((item) => (
          <div key={item.id}>
            <div className="flex items-baseline justify-between gap-3 text-[14px]">
              <span>{item.name}</span>
              <span className="font-mono text-[12px] text-mute">{stepRate(item)}%</span>
            </div>
            <div className="mt-1">
              <Meter value={item.continued} max={opened} tone={item.id === "email" ? "ink" : "tide"} />
            </div>
          </div>
        ))}
      </div>
      <Caption>Email is the break in this set: 430 of 740 continue. The other steps hold most of the people who reach them.</Caption>
    </figure>
  );
}

function Activation() {
  const marks = [
    ["Opened", opened],
    ["Finished onboarding", finished],
    ["Did the first meaningful action", 240],
  ] as const;
  return (
    <figure>
      <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Time to a real use · hypothetical</figcaption>
      <div className="mt-4 space-y-3">
        {marks.map(([label, value]) => (
          <div key={label}>
            <div className="flex items-baseline justify-between gap-3 text-[14px]">
              <span>{label}</span>
              <span className="font-mono text-[12px]">{formatInt(value)}</span>
            </div>
            <div className="mt-1">
              <Meter value={value} max={opened} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[15px] leading-relaxed">
        70 people finish setup and never do the thing the product is for. Among the 240 who do, the median time to that action is 6 minutes.
      </p>
      <Caption>Activation here is one defined action, not onboarding completion. The 6 minutes are part of the illustration.</Caption>
    </figure>
  );
}

function Monetization() {
  const marks = [
    ["Opened", 1000],
    ["Saw the paywall", 180],
    ["Started a trial", 40],
    ["Paid", 14],
  ] as const;
  return (
    <figure>
      <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Exposure, then payment · hypothetical</figcaption>
      <div className="mt-4 space-y-3">
        {marks.map(([label, value]) => (
          <div key={label}>
            <div className="flex items-baseline justify-between gap-3 text-[14px]">
              <span>{label}</span>
              <span className="font-mono text-[12px]">{formatInt(value)}</span>
            </div>
            <div className="mt-1">
              <Meter value={value} max={opened} tone={label === "Paid" ? "ink" : "tide"} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[15px] leading-relaxed">
        22% of people who saw the offer started a trial. 82% of opens never saw it. A healthy rate on the view can hide an offer that arrives too late.
      </p>
      <Caption>14 of 40 trials pay in this sketch. Not a client.</Caption>
    </figure>
  );
}

function Retention() {
  const [weekIndex, setWeekIndex] = useState(1);
  const reduce = useReducedMotion();
  const width = 560;
  const height = 180;
  const left = 36;
  const right = 16;
  const top = 16;
  const plotW = width - left - right;
  const plotH = height - top - 28;

  const x = (week: number) => left + (week / 8) * plotW;
  const y = (value: number) => top + (1 - value / 100) * plotH;
  const path = (series: number[]) => series.map((value, index) => `${index ? "L" : "M"}${x(weeks[index]).toFixed(1)} ${y(value).toFixed(1)}`).join(" ");

  return (
    <figure>
      <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
        Illustrative cohorts · still active
      </figcaption>
      <svg className="mt-4 h-auto w-full" viewBox={`0 0 ${width} ${height + 8}`} role="img" aria-label="Two illustrative retention curves. People who reached a first result decline more slowly than people who left before it.">
        {[0, 25, 50, 75, 100].map((tick) => (
          <g key={tick}>
            <line x1={left} x2={width - right} y1={y(tick)} y2={y(tick)} stroke="rgba(28,25,22,0.12)" />
            <text x={0} y={y(tick) + 4} fill="#4F4942" fontSize="11" fontFamily="JetBrains Mono, ui-monospace, monospace">
              {tick}
            </text>
          </g>
        ))}
        <motion.path d={path(reached)} fill="none" stroke="#1C1916" strokeWidth="1.8" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease }} />
        <motion.path d={path(leftEarly)} fill="none" stroke="#3E6D88" strokeWidth="1.8" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease }} />
        {weeks.map((week, index) => (
          <g key={week}>
            <circle cx={x(week)} cy={y(reached[index])} r={weekIndex === index ? 4.5 : 3} fill="#1C1916" />
            <circle cx={x(week)} cy={y(leftEarly[index])} r={weekIndex === index ? 4.5 : 3} fill="#3E6D88" />
            <text x={x(week)} y={height + 4} textAnchor="middle" fill="#4F4942" fontSize="11" fontFamily="JetBrains Mono, ui-monospace, monospace">
              W{week}
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Week">
        {weeks.map((week, index) => (
          <button
            key={week}
            type="button"
            aria-pressed={weekIndex === index}
            onClick={() => setWeekIndex(index)}
            className={`min-h-11 border px-3 text-[13px] ${weekIndex === index ? "border-ink bg-ink text-ground" : "border-ink/15"}`}
          >
            Week {week}
          </button>
        ))}
      </div>
      <p className="mt-4 text-[15px] leading-relaxed" aria-live="polite">
        At week {weeks[weekIndex]}, {reached[weekIndex]}% of the illustrated group who reached a first result are still active. {leftEarly[weekIndex]}% of the group who left before it are.
      </p>
      <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-mute">
        <span>Ink · reached a first result</span>
        <span>Tide · left before it</span>
      </p>
      <Caption>These points are chosen to show the pattern. They are not calculated from the 1,000 opens, and they are not a client cohort.</Caption>
    </figure>
  );
}
