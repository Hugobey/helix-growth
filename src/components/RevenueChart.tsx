import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function RevenueChart() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const tipId = useId();
  const y3 = 214;
  const y4 = 78;
  const x0 = 72;
  const xOct = 390;
  const xNov = 610;

  return (
    <figure className="min-w-0">
      <div className="relative">
        <svg viewBox="0 0 720 320" className="h-auto w-full" role="img" aria-label="Wizz monthly revenue. A plateau held near $3 million through October 2025, then about $4 million in November 2025. The marked rise is $1 million. Months between those two points are not plotted.">
          <text x="28" y="82" fill="#4F4942" fontSize="12" fontFamily="JetBrains Mono, ui-monospace, monospace">$4M</text>
          <text x="28" y="218" fill="#4F4942" fontSize="12" fontFamily="JetBrains Mono, ui-monospace, monospace">$3M</text>
          <line x1="68" y1="40" x2="68" y2="250" stroke="rgba(28,25,22,0.18)" />
          <line x1="68" y1="250" x2="680" y2="250" stroke="rgba(28,25,22,0.18)" />
          <line x1={x0} y1={y3} x2={xOct} y2={y3} stroke="rgba(28,25,22,0.18)" strokeDasharray="3 5" />
          <path className="chart-draw" pathLength="1" d={`M ${x0} ${y3} H ${xOct}`} fill="none" stroke="#1C1916" strokeWidth="2.2" />
          <path className="chart-draw chart-draw-late" pathLength="1" d={`M ${xOct} ${y3} L ${xNov} ${y4}`} fill="none" stroke="#FF4D1C" strokeWidth="2.4" />
          <motion.path
            d={`M ${xNov - 18} ${y3} V ${y4 + 8}`}
            fill="none"
            stroke="#FF4D1C"
            strokeWidth="1"
            opacity="0.7"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 1, ease }}
          />
          <text x={xNov - 64} y={(y3 + y4) / 2} fill="#FF4D1C" fontSize="13" fontFamily="JetBrains Mono, ui-monospace, monospace">+$1M</text>
          <line x1={xOct} y1={y3 - 10} x2={xOct} y2="262" stroke="#1C1916" strokeWidth="1" />
          <circle cx={xOct} cy={y3} r="4" fill="#1C1916" />
          <circle cx={xNov} cy={y4} r="5.5" fill="#FF4D1C" />
          <text x={x0} y="286" fill="#4F4942" fontSize="12" fontFamily="JetBrains Mono, ui-monospace, monospace">Held near $3M for several months</text>
          <text x={xOct - 8} y="286" fill="#1C1916" fontSize="12" fontFamily="JetBrains Mono, ui-monospace, monospace">Oct 2025</text>
          <text x={xNov - 28} y="52" fill="#1C1916" fontSize="12" fontFamily="JetBrains Mono, ui-monospace, monospace">Nov 2025</text>
        </svg>
        <button
          type="button"
          className="absolute right-[8%] top-[18%] h-11 w-11 rounded-full"
          aria-describedby={open ? tipId : undefined}
          aria-label="November 2025, about $4 million MRR"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        />
        {open && (
          <p id={tipId} role="tooltip" className="absolute right-0 top-0 max-w-xs border border-ink/15 bg-ground p-3 text-[13px] leading-snug shadow-sm">
            +$1M MRR. The monetization feature was kept. $4M was the highest MRR reached.
          </p>
        )}
      </div>
      <figcaption className="mt-3 max-w-xl text-[13px] leading-snug text-mute">
        Two known levels only: the plateau near $3M through the October 2025 launch, then November 2025 near $4M. The diagonal is the transition between those points. No monthly values were invented along it.
      </figcaption>
    </figure>
  );
}
