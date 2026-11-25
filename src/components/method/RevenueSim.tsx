import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { formatInt, formatMoney, simBounds, simStart, simulate, type SimInput } from "../../method/model";

const ease = [0.22, 1, 0.36, 1] as const;

export function RevenueSim() {
  const [input, setInput] = useState<SimInput>(simStart);
  const [baseline, setBaseline] = useState<SimInput>(simStart);
  const reduce = useReducedMotion();
  const current = simulate(input);
  const base = simulate(baseline);
  const delta = current.mrr - base.mrr;
  const scale = Math.max(current.mrr, base.mrr, 1);

  const stepKey = (key: keyof SimInput, direction: 1 | -1) => {
    setInput((prev) => {
      const bound = simBounds[key];
      const next = prev[key] + direction * bound.step;
      return { ...prev, [key]: Math.min(bound.max, Math.max(bound.min, next)) };
    });
  };

  return (
    <div className="on-graphite bg-graphite p-5 text-ground md:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-foam">Hypothetical simulation · not a client result</p>
      <div className="mt-6 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Stepper
            label="Monthly active users"
            display={formatInt(input.mau)}
            hint="People active this month who could become new subscribers."
            onDec={() => stepKey("mau", -1)}
            onInc={() => stepKey("mau", 1)}
            decOff={input.mau <= simBounds.mau.min}
            incOff={input.mau >= simBounds.mau.max}
          />
          <Stepper
            label="Trial conversion"
            display={`${input.trialPct}%`}
            hint="Share of those people who become new subscribers this month."
            onDec={() => stepKey("trialPct", -1)}
            onInc={() => stepKey("trialPct", 1)}
            decOff={input.trialPct <= simBounds.trialPct.min}
            incOff={input.trialPct >= simBounds.trialPct.max}
          />
          <Stepper
            label="Subscription price"
            display={formatMoney(input.price)}
            hint="What one subscriber pays each month."
            onDec={() => stepKey("price", -1)}
            onInc={() => stepKey("price", 1)}
            decOff={input.price <= simBounds.price.min}
            incOff={input.price >= simBounds.price.max}
          />
          <Stepper
            label="Monthly renewal"
            display={`${input.renewalPct}%`}
            hint="Share of paying users still paying next month."
            onDec={() => stepKey("renewalPct", -1)}
            onInc={() => stepKey("renewalPct", 1)}
            decOff={input.renewalPct <= simBounds.renewalPct.min}
            incOff={input.renewalPct >= simBounds.renewalPct.max}
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" className="min-h-11 border border-white/25 px-3 text-[14px]" onClick={() => setBaseline(input)}>
              Set this as the baseline
            </button>
            <button
              type="button"
              className="min-h-11 px-3 text-[14px] underline decoration-white/30 underline-offset-4"
              onClick={() => {
                setInput(simStart);
                setBaseline(simStart);
              }}
            >
              Reset
            </button>
          </div>
        </div>

        <div aria-live="polite">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-foam">Monthly recurring revenue</p>
          <p className="mt-2 font-display text-[clamp(3.2rem,7vw,5.4rem)] leading-[0.86] text-accent">{formatMoney(current.mrr)}</p>
          <p className="mt-3 max-w-md text-[15px] leading-snug text-foam">
            {delta === 0
              ? "This matches the baseline. Move a control and the difference appears here."
              : `${delta > 0 ? "Above" : "Below"} the baseline by ${formatMoney(Math.abs(delta))}.`}
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/15 pt-5">
            <Stat label="New subscribers / month" value={formatInt(current.newcomers)} />
            <Stat label="Paying users, steady state" value={formatInt(current.paying)} />
            <Stat label="Revenue per active user" value={formatMoney(current.revenuePerUser)} />
            <Stat label="Baseline MRR" value={formatMoney(base.mrr)} />
          </dl>
          <div className="mt-6 space-y-3">
            <Bar label="This scenario" value={current.mrr} scale={scale} reduce={Boolean(reduce)} />
            <Bar label="Baseline" value={base.mrr} scale={scale} reduce={Boolean(reduce)} muted />
          </div>
          <p className="mt-5 text-[14px] leading-relaxed text-foam">
            {formatInt(input.mau)} active users × {input.trialPct}% produces {formatInt(current.newcomers)} new subscribers.{" "}
            With {current.leavePct}% not renewing, the steady state is {formatInt(current.paying)} paying users.{" "}
            {formatInt(current.paying)} × {formatMoney(input.price)} = {formatMoney(current.mrr)}.
          </p>
          <p className="mt-3 text-[13px] leading-snug text-foam/80">
            Renewal is monthly. The paying count is the steady state, not the first month. More active users scale revenue. They do not change revenue per user when the rates stay put. This sketch is not the 1,000-person onboarding above.
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[13px] leading-snug text-foam">{label}</dt>
      <dd className="mt-1 font-display text-[1.6rem] leading-none">{value}</dd>
    </div>
  );
}

function Bar({ label, value, scale, reduce, muted = false }: { label: string; value: number; scale: number; reduce: boolean; muted?: boolean }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-[13px]">
        <span className="text-foam">{label}</span>
        <span className="font-mono">{formatMoney(value)}</span>
      </div>
      <div className="mt-1 h-2 bg-white/10">
        <motion.div
          className={`h-full ${muted ? "bg-foam" : "bg-accent"}`}
          initial={false}
          animate={{ width: `${(value / scale) * 100}%` }}
          transition={{ duration: reduce ? 0 : 0.4, ease }}
        />
      </div>
    </div>
  );
}

function Stepper({
  label,
  display,
  hint,
  onDec,
  onInc,
  decOff,
  incOff,
}: {
  label: string;
  display: string;
  hint: string;
  onDec: () => void;
  onInc: () => void;
  decOff: boolean;
  incOff: boolean;
}) {
  return (
    <div className="border-t border-white/15 py-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-foam">{label}</p>
          <p className="mt-1 font-display text-[1.8rem] leading-none">{display}</p>
        </div>
        <div className="flex gap-2">
          <button type="button" aria-label={`Decrease ${label}`} disabled={decOff} onClick={onDec} className="min-h-11 min-w-11 border border-white/25 text-[18px] disabled:opacity-30">
            −
          </button>
          <button type="button" aria-label={`Increase ${label}`} disabled={incOff} onClick={onInc} className="min-h-11 min-w-11 border border-white/25 text-[18px] disabled:opacity-30">
            +
          </button>
        </div>
      </div>
      <p className="mt-2 text-[13px] leading-snug text-foam/80">{hint}</p>
    </div>
  );
}
