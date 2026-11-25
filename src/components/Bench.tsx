import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { funnel, presets, trialMath } from "../content";
import { onTabKey } from "../lib/tabs";

const ease = [0.22, 1, 0.36, 1] as const;
const modes = ["lift", "funnel", "paywall"] as const;
type Mode = (typeof modes)[number];

export function Bench({ initial = "lift" }: { initial?: Mode }) {
  const [mode, setMode] = useState<Mode>(initial);
  const reduce = useReducedMotion();

  const choose = (next: Mode, focus = false) => {
    setMode(next);
    if (focus) document.getElementById(`bench-${next}`)?.focus();
  };

  return (
    <div data-od-id="bench">
      <div className="flex overflow-x-auto border border-ink/10" role="tablist" aria-label="Diagnostic">
        {modes.map((item, index) => (
          <button
            key={item}
            id={`bench-${item}`}
            type="button"
            role="tab"
            aria-selected={mode === item}
            tabIndex={mode === item ? 0 : -1}
            className={`min-h-11 min-w-[7.5rem] flex-1 whitespace-nowrap px-3 py-3 font-mono text-[11px] uppercase tracking-[0.12em] ${mode === item ? "bg-ink text-ground" : "bg-ground text-ink"}`}
            onClick={() => choose(item)}
            onKeyDown={(event) => onTabKey(event, index, modes.length, (next) => choose(modes[next], true))}
          >
            {item === "lift" ? "Lift" : item === "funnel" ? "Funnel" : "Paywall"}
          </button>
        ))}
      </div>
      <div className="pt-6" role="tabpanel">
        {mode === "lift" && <Lift reduce={Boolean(reduce)} />}
        {mode === "funnel" && <Funnel reduce={Boolean(reduce)} />}
        {mode === "paywall" && <Paywall />}
      </div>
    </div>
  );
}

function Lift({ reduce }: { reduce: boolean }) {
  const [start, setStart] = useState(8);
  const [pay, setPay] = useState(40);
  const { trials, paid } = trialMath(start, pay);
  const baseline = trialMath(8, 40).paid;
  const delta = paid - baseline;

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Illustrative. Per 1,000 eligible users. Not a client.</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2" role="group" aria-label="Worked presets">
        {presets.map((preset) => {
          const on = start === preset.start && pay === preset.pay;
          return (
            <button
              key={preset.id}
              type="button"
              aria-pressed={on}
              className={`min-h-11 rounded-md border px-3 py-2 text-left text-[14px] ${on ? "border-ink bg-ink text-ground" : "border-ink/10"}`}
              onClick={() => {
                setStart(preset.start);
                setPay(preset.pay);
              }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]">Preset {preset.name}</span>
              <span className="mt-1 block">{preset.line}</span>
            </button>
          );
        })}
      </div>
      <label className="mt-6 block">
        <span className="flex items-baseline justify-between font-mono text-[12px] uppercase tracking-[0.12em] text-mute">
          Trial start <span className="text-ink">{start}%</span>
        </span>
        <input
          className="mt-2 w-full accent-ink"
          type="range"
          min={4}
          max={18}
          value={start}
          onChange={(event) => setStart(Number(event.target.value))}
        />
      </label>
      <label className="mt-4 block">
        <span className="flex items-baseline justify-between font-mono text-[12px] uppercase tracking-[0.12em] text-mute">
          Trial to paid <span className="text-ink">{pay}%</span>
        </span>
        <input
          className="mt-2 w-full accent-ink"
          type="range"
          min={15}
          max={70}
          value={pay}
          onChange={(event) => setPay(Number(event.target.value))}
        />
      </label>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Meter label="Trials" value={trials} width={trials} tone="ink" reduce={reduce} />
        <Meter label="Paid" value={paid} width={paid} tone="accent" reduce={reduce} />
      </div>
      <p className="mt-4 text-[15px] leading-snug" aria-live="polite">
        {delta < 0
          ? `${trials} trials and ${paid} paid. Against preset A, trial start can rise while paying users fall.`
          : delta > 0
            ? `${trials} trials and ${paid} paid. ${delta} more paying users than preset A, on this illustration.`
            : `${trials} trials and ${paid} paid. Same paying users as preset A.`}
      </p>
    </div>
  );
}

function Meter({ label, value, width, tone, reduce }: { label: string; value: number; width: number; tone: "ink" | "accent"; reduce: boolean }) {
  return (
    <div className="min-w-0">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">{label}</p>
      <p className="mt-1 font-mono text-[1.6rem] leading-none">{value}</p>
      <div className="mt-2 h-2 bg-surface">
        <motion.div
          className={`h-full ${tone === "accent" ? "bg-accent" : "bg-ink"}`}
          initial={false}
          animate={{ width: `${Math.max(4, Math.min(100, width))}%` }}
          transition={{ duration: reduce ? 0 : 0.35, ease }}
        />
      </div>
    </div>
  );
}

function Funnel({ reduce }: { reduce: boolean }) {
  const [stage, setStage] = useState(4);
  const active = funnel[stage];
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Illustrative funnel. Not a client.</p>
      <div className="mt-2" role="list">
        {funnel.map((item, index) => {
          const pressed = index === stage;
          const width = `${8 + item.p * 0.92}%`;
          return (
            <button
              key={item.label}
              type="button"
              role="listitem"
              aria-pressed={pressed}
              onClick={() => setStage(index)}
              className="block w-full border-t border-ink/10 py-3 text-left"
            >
              <span className="flex items-baseline justify-between gap-4">
                <span className="text-[15px]">
                  {item.label}
                  {item.drop && <small className="mt-0.5 block text-[12px] text-mute">{item.drop}</small>}
                </span>
                <strong className="font-mono text-[1.15rem] font-normal">{item.count}</strong>
              </span>
              <span className="mt-2 block h-1.5 bg-surface">
                <motion.span
                  className={`block h-full ${pressed ? "bg-ink" : "bg-ink/25"}`}
                  initial={reduce ? false : { width: 0 }}
                  whileInView={{ width }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: reduce ? 0 : 0.55, ease, delay: reduce ? 0 : index * 0.04 }}
                />
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-4 min-h-[3rem] text-[15px] leading-snug" aria-live="polite">{active.note}</p>
      <p className="text-[12px] text-mute">The number is the count. Later bars are eased so they stay visible.</p>
    </div>
  );
}

function Paywall() {
  const [when, setWhen] = useState<"before" | "after">("after");
  return (
    <div className="grid gap-6 sm:grid-cols-[220px_1fr]">
      <div className="rounded-xl border border-ink/10 bg-surface p-4" aria-hidden="true">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">{when === "before" ? "Before a result" : "After a result"}</p>
        <p className="mt-3 font-display text-[1.7rem] font-bold leading-none">Keep the streak.</p>
        <div className="mt-5 bg-ink px-3 py-3 text-ground">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ground/70">Annual · primary</p>
          <p className="mt-2 font-mono text-[1rem]">Price stays visible</p>
        </div>
        <div className="mt-2 border border-ink/10 px-3 py-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Monthly</p>
          <p className="mt-1 text-[14px]">The comparison, not the footnote.</p>
        </div>
        <p className="mt-4 border border-ink/15 px-3 py-2 text-center text-[13px]">Start the trial</p>
      </div>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">When the offer appears. Illustrative.</p>
        <div className="mt-3 flex flex-col gap-2" role="group" aria-label="Offer timing">
          {(["before", "after"] as const).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={when === item}
              onClick={() => setWhen(item)}
              className={`min-h-11 border px-3 py-3 text-left text-[15px] ${when === item ? "border-ink bg-ink text-ground" : "border-ink/10"}`}
            >
              {item === "before" ? "Before value" : "After a result"}
            </button>
          ))}
        </div>
        <p className="mt-4 text-[15px] leading-snug" aria-live="polite">
          {when === "before"
            ? "Shown before the product is useful. Views rise. Purchases from that view often fall. That is exposure, not a worse price."
            : "Shown after a result. The offer has a referent. The trial still has to contain what was sold."}
        </p>
      </div>
    </div>
  );
}
