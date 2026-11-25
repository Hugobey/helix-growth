import type { Study } from "../content";

const fields = [
  ["App context", "context"],
  ["Core bottleneck", "bottleneck"],
  ["Key experiment", "experiment"],
] as const;

export function CaseStudy({ study }: { study: Study }) {
  return (
    <article className="grid gap-6 border-b border-ink/10 py-8 md:grid-cols-[200px_1fr] md:gap-12" data-od-id={`study-${study.id}`}>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">{study.kicker}</p>
        <h3 className="mt-2 font-display text-[2rem] font-bold leading-none tracking-[-0.03em]">{study.name}</h3>
      </div>
      <dl>
        {fields.map(([label, key]) => (
          <div key={key} className="border-t border-ink/10 py-3">
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">{label}</dt>
            <dd className="mt-1 text-[15px] leading-snug">{study[key]}</dd>
          </div>
        ))}
        <div className="border-t border-ink/10 py-3">
          <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Hard metric lift</dt>
          <dd className="mt-3 flex flex-wrap gap-x-8 gap-y-4">
            {study.metrics.map((metric) => (
              <p key={metric.value} className="min-w-[9rem]">
                <span className="block font-mono text-[1.35rem] leading-none text-ink">{metric.value}</span>
                <span className="mt-1 block max-w-[16rem] text-[13px] leading-snug text-mute">{metric.label}</span>
              </p>
            ))}
          </dd>
          <p className="mt-3 text-[13px] text-mute">{study.note}</p>
        </div>
      </dl>
    </article>
  );
}
