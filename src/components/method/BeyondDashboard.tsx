import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  defaultFocus,
  dimensions,
  dropCount,
  examples,
  explain,
  finished,
  formatInt,
  opened,
  screenById,
  screens,
  segments,
  share,
  stepRate,
  type Dimension,
  type ScreenId,
  type SegmentCut,
} from "../../method/model";
import { onTabKey } from "../../lib/tabs";
import { Meter } from "./Meter";

const ease = [0.22, 1, 0.36, 1] as const;
const timeMax = 90;

export function BeyondDashboard() {
  const [dimension, setDimension] = useState<Dimension>("conversion");
  const [screenId, setScreenId] = useState<ScreenId>("email");
  const [cut, setCut] = useState<SegmentCut>("source");
  const [focusId, setFocusId] = useState(defaultFocus.source);
  const reduce = useReducedMotion();
  const screen = screenById(screenId);
  const rows = segments[cut].rows;
  const focus = rows.find((row) => row.id === focusId) ?? rows[0];
  const reading = explain(dimension, screen, cut, focus);

  const chooseDimension = (next: Dimension, focusTab = false) => {
    setDimension(next);
    if (focusTab) document.getElementById(`dim-${next}`)?.focus();
  };

  const chooseCut = (next: SegmentCut) => {
    setCut(next);
    setFocusId(defaultFocus[next]);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap" role="tablist" aria-label="Ways to read the same funnel">
        {dimensions.map((item, index) => {
          const on = item.id === dimension;
          return (
            <button
              key={item.id}
              id={`dim-${item.id}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="dashboard-panel"
              tabIndex={on ? 0 : -1}
              className={`min-h-11 border px-4 py-2 text-left ${on ? "border-ink bg-ink text-ground" : "border-ink/15 bg-ground"}`}
              onClick={() => chooseDimension(item.id)}
              onKeyDown={(event) => onTabKey(event, index, dimensions.length, (next) => chooseDimension(dimensions[next].id, true))}
            >
              <span className="block font-mono text-[11px] uppercase tracking-[0.14em]">0{index + 1}</span>
              <span className="mt-1 block text-[15px]">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div id="dashboard-panel" role="tabpanel" aria-labelledby={`dim-${dimension}`} className="mt-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/10 pb-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-tide">Fictional onboarding · {formatInt(opened)} opens</p>
            <p className="mt-2 font-display text-[clamp(2rem,4vw,3.2rem)] leading-none">
              {share(finished, opened)}% reach a first result
            </p>
          </div>
          <p className="max-w-xs text-[14px] leading-snug text-mute">{dimensions.find((item) => item.id === dimension)?.hint}</p>
        </div>

        <div className="mt-2" role="list" aria-label="Screens in the funnel">
          {screens.map((item) => {
            const on = item.id === screenId;
            return (
              <button
                key={item.id}
                type="button"
                role="listitem"
                aria-pressed={on}
                onClick={() => setScreenId(item.id)}
                className={`grid w-full grid-cols-[5.5rem_1fr_auto] items-center gap-3 border-b border-ink/10 py-3 text-left sm:grid-cols-[7rem_1fr_auto] ${on ? "bg-surface/80" : ""}`}
              >
                <span className="text-[15px]">{item.name}</span>
                <Meter value={item.arrived} max={opened} tone={on ? "ink" : "tide"} />
                <span className="font-mono text-[12px] text-mute">
                  {stepRate(item)}% · −{formatInt(dropCount(item))}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-[12px] text-mute">Bar length is people who reach the screen. The figure is the step rate, then how many leave.</p>

        {dimension === "time" && <TimeChart screenId={screenId} onPick={setScreenId} />}
        {dimension === "behavior" && <BehaviorChart screenId={screenId} onPick={setScreenId} />}
        {dimension === "segmentation" && (
          <SegmentChart
            cut={cut}
            focusId={focus.id}
            onCut={chooseCut}
            onFocus={setFocusId}
          />
        )}
        {dimension === "context" && <ContextCard screen={screen} />}

        <div className="mt-8 grid gap-4 md:grid-cols-2" aria-live="polite">
          <article className="border-t-4 border-ink bg-surface p-5">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-tide">Observation</h3>
            <p className="mt-3 text-[16px] leading-relaxed">{reading.observation}</p>
          </article>
          <motion.article
            key={`${dimension}-${screen.id}-${focus.id}`}
            className="border-t-4 border-tide bg-surface p-5"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease }}
          >
            <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-tide">Hypothesis</h3>
            <p className="mt-3 text-[16px] leading-relaxed">{reading.hypothesis}</p>
            <p className="mt-4 text-[13px] leading-snug text-mute">A hypothesis is a reason to investigate. It is not proof, and it is not a result.</p>
          </motion.article>
        </div>
      </div>

      <div className="mt-8 grid gap-3 lg:grid-cols-3">
        {examples.map((item) => {
          const on = dimension === item.dimension && screenId === item.screen && (item.cut ? cut === item.cut : true);
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={on}
              onClick={() => {
                setDimension(item.dimension);
                setScreenId(item.screen);
                if (item.cut) {
                  setCut(item.cut);
                  setFocusId(defaultFocus[item.cut]);
                }
              }}
              className={`border p-4 text-left ${on ? "border-ink bg-ink text-ground" : "border-ink/10"}`}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]">{on ? "Showing" : "Show this read"}</span>
              <span className="mt-2 block font-display text-[1.35rem] leading-none">{item.title}</span>
              <span className={`mt-3 block text-[14px] leading-snug ${on ? "text-foam" : "text-mute"}`}>{item.body}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TimeChart({ screenId, onPick }: { screenId: ScreenId; onPick: (id: ScreenId) => void }) {
  const reduce = useReducedMotion();
  return (
    <figure className="mt-8">
      <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
        Seconds on the screen · tick is the median · bar reaches the 80th percentile
      </figcaption>
      <div className="mt-4 space-y-3">
        {screens.map((item) => {
          const on = item.id === screenId;
          return (
            <button key={item.id} type="button" aria-pressed={on} onClick={() => onPick(item.id)} className="block w-full text-left">
              <span className="flex items-baseline justify-between gap-3 text-[14px]">
                <span>{item.name}</span>
                <span className="font-mono text-[12px] text-mute">
                  {item.medianSec}s median · {item.p80Sec}s at the 80th
                </span>
              </span>
              <span className="relative mt-1 block h-3 bg-surface">
                <motion.span
                  className="absolute inset-y-0 left-0 bg-tide/40"
                  initial={false}
                  animate={{ width: `${(item.p80Sec / timeMax) * 100}%` }}
                  transition={{ duration: reduce ? 0 : 0.45, ease }}
                />
                <motion.span
                  className="absolute inset-y-[-3px] w-0.5 bg-ink"
                  initial={false}
                  animate={{ left: `${(item.medianSec / timeMax) * 100}%` }}
                  transition={{ duration: reduce ? 0 : 0.45, ease }}
                />
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-2 flex justify-between font-mono text-[11px] text-mute">
        <span>0s</span>
        <span>30s</span>
        <span>60s</span>
        <span>90s</span>
      </p>
    </figure>
  );
}

function BehaviorChart({ screenId, onPick }: { screenId: ScreenId; onPick: (id: ScreenId) => void }) {
  return (
    <figure className="mt-8">
      <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
        Share of people who reach the screen
      </figcaption>
      <div className="mt-4 space-y-5">
        {screens.map((item) => {
          const on = item.id === screenId;
          const rows = [
            ["Scroll past the first view", share(item.scrollers, item.arrived)],
            ["Click or enter something", share(item.interactors, item.arrived)],
            ["Leave without a click", share(item.untouched, item.arrived)],
          ] as const;
          return (
            <button key={item.id} type="button" aria-pressed={on} onClick={() => onPick(item.id)} className="block w-full text-left">
              <span className="text-[15px]">{item.name}</span>
              <span className="mt-2 grid gap-2">
                {rows.map(([label, value]) => (
                  <span key={label} className="grid grid-cols-[9.5rem_1fr_2.5rem] items-center gap-2 sm:grid-cols-[13rem_1fr_2.5rem]">
                    <span className="text-[13px] text-mute">{label}</span>
                    <Meter value={value} tone={label.startsWith("Leave") ? "tide" : "ink"} />
                    <span className="text-right font-mono text-[12px]">{value}%</span>
                  </span>
                ))}
              </span>
            </button>
          );
        })}
      </div>
    </figure>
  );
}

function SegmentChart({
  cut,
  focusId,
  onCut,
  onFocus,
}: {
  cut: SegmentCut;
  focusId: string;
  onCut: (cut: SegmentCut) => void;
  onFocus: (id: string) => void;
}) {
  const cuts = Object.keys(segments) as SegmentCut[];
  return (
    <figure className="mt-8">
      <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
        Completion by group · the mark is the blended 31%
      </figcaption>
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Segment">
        {cuts.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={item === cut}
            onClick={() => onCut(item)}
            className={`min-h-11 border px-3 text-[14px] ${item === cut ? "border-ink bg-ink text-ground" : "border-ink/15"}`}
          >
            {segments[item].label}
          </button>
        ))}
      </div>
      <div className="mt-5 space-y-4">
        {segments[cut].rows.map((row) => {
          const rate = share(row.completed, row.users);
          const on = row.id === focusId;
          return (
            <button key={row.id} type="button" aria-pressed={on} onClick={() => onFocus(row.id)} className="block w-full text-left">
              <span className="flex items-baseline justify-between gap-3 text-[15px]">
                <span>{row.label}</span>
                <span className="font-mono text-[12px] text-mute">
                  {rate}% · {formatInt(row.completed)} of {formatInt(row.users)}
                </span>
              </span>
              <span className="relative mt-1 block h-3 bg-surface">
                <span className={`absolute inset-y-0 left-0 ${on ? "bg-ink" : "bg-tide"}`} style={{ width: `${rate}%` }} />
                <span className="absolute inset-y-[-4px] w-[3px] bg-ground" style={{ left: "calc(31% - 1px)" }} />
                <span className="absolute inset-y-[-4px] w-px bg-ink" style={{ left: "31%" }} />
              </span>
            </button>
          );
        })}
      </div>
    </figure>
  );
}

function ContextCard({ screen }: { screen: ReturnType<typeof screenById> }) {
  const rows = [
    ["What they are trying to do", screen.job],
    ["Does the screen communicate value?", screen.value],
    ["Do they understand what is expected?", screen.expectation],
  ];
  return (
    <figure className="mt-8 border border-ink/10 bg-surface p-5">
      <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
        {screen.name} · a read of the experience, not a measurement
      </figcaption>
      <dl className="mt-4 grid gap-4">
        {rows.map(([title, body]) => (
          <div key={title}>
            <dt className="text-[15px]">{title}</dt>
            <dd className="mt-1 text-[15px] leading-snug text-mute">{body}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
