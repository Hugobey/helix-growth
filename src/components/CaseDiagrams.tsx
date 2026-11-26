export function CaseDiagram({ name }: { name: "shift" | "flow" | "exposure" }) {
  if (name === "shift") return <WizzRevenue />;
  if (name === "flow") return <Flow />;
  return <Exposure />;
}

function WizzRevenue() {
  return (
    <figure>
      <div className="overflow-hidden rounded-[1.25rem] bg-[#101010]">
        <img
          src="/assets/wizz-revenue.png"
          alt="Estimated revenue chart. On 1 September 2025 the marker reads $3M, and the line rises after that."
          width={1500}
          height={582}
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
        Estimated revenue. 1 September 2025, $3M.
      </figcaption>
    </figure>
  );
}

function Flow() {
  return (
    <figure>
      <svg viewBox="0 0 640 210" className="h-auto w-full" role="img" aria-labelledby="flow-title">
        <title id="flow-title">After the redesign, value and reasons to believe come before email capture.</title>
        <text x="0" y="18" fill="#4F4942" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="12" letterSpacing="1.4">
          BEFORE
        </text>
        <line x1="16" y1="58" x2="430" y2="58" stroke="#1C1916" strokeOpacity="0.18" strokeWidth="1.2" />
        <circle cx="16" cy="58" r="6" fill="#1C1916" opacity="0.4" />
        <text x="16" y="88" fill="#1C1916" fontFamily="Satoshi, system-ui, sans-serif" fontSize="16">
          Personal information
        </text>
        <circle cx="430" cy="58" r="8" fill="#FF4D1C" />
        <text x="430" y="88" fill="#1C1916" fontFamily="Satoshi, system-ui, sans-serif" fontSize="16">
          Email
        </text>
        <text x="0" y="132" fill="#4F4942" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="12" letterSpacing="1.4">
          AFTER
        </text>
        <line x1="16" y1="168" x2="520" y2="168" stroke="#1C1916" strokeOpacity="0.18" strokeWidth="1.2" />
        <circle cx="16" cy="168" r="6" fill="#1C1916" />
        <text x="16" y="198" fill="#1C1916" fontFamily="Satoshi, system-ui, sans-serif" fontSize="16">
          Value
        </text>
        <circle cx="200" cy="168" r="6" fill="#1C1916" />
        <text x="200" y="198" fill="#1C1916" fontFamily="Satoshi, system-ui, sans-serif" fontSize="16">
          Reasons to believe
        </text>
        <circle cx="520" cy="168" r="8" fill="#FF4D1C" />
        <text x="520" y="198" fill="#1C1916" fontFamily="Satoshi, system-ui, sans-serif" fontSize="16">
          Email
        </text>
      </svg>
      <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
        Value first. Email toward the end.
      </figcaption>
    </figure>
  );
}

function Exposure() {
  return (
    <figure>
      <svg viewBox="0 0 680 180" className="h-auto w-full" role="img" aria-labelledby="exposure-title">
        <title id="exposure-title">Paywall exposure moved earlier. Social proof added to the value proposition already on screen.</title>
        <text x="0" y="28" fill="#4F4942" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="12" letterSpacing="1.4">
          BEFORE
        </text>
        {[0, 1, 2].map((index) => (
          <circle key={index} cx={180 + index * 64} cy="22" r="5" fill="#1C1916" opacity="0.4" />
        ))}
        <rect x="390" y="10" width="86" height="24" rx="12" fill="none" stroke="#1C1916" />
        <text x="433" y="26" textAnchor="middle" fill="#1C1916" fontFamily="Satoshi, system-ui, sans-serif" fontSize="13">
          Paywall
        </text>
        <text x="0" y="108" fill="#4F4942" fontFamily="JetBrains Mono, ui-monospace, monospace" fontSize="12" letterSpacing="1.4">
          AFTER
        </text>
        <circle cx="180" cy="102" r="5" fill="#3E6D88" />
        <rect x="214" y="90" width="86" height="24" rx="12" fill="none" stroke="#FF4D1C" />
        <text x="257" y="106" textAnchor="middle" fill="#1C1916" fontFamily="Satoshi, system-ui, sans-serif" fontSize="13">
          Paywall
        </text>
        <circle cx="340" cy="102" r="5" fill="#3E6D88" />
        <circle cx="404" cy="102" r="5" fill="#3E6D88" />
        <rect x="438" y="90" width="86" height="24" rx="12" fill="none" stroke="#FF4D1C" />
        <text x="481" y="106" textAnchor="middle" fill="#1C1916" fontFamily="Satoshi, system-ui, sans-serif" fontSize="13">
          Paywall
        </text>
        <text x="180" y="156" fill="#1C1916" fontFamily="Satoshi, system-ui, sans-serif" fontSize="15">
          Rating and testimonials, on the value already there.
        </text>
      </svg>
      <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
        Two changes, read together.
      </figcaption>
    </figure>
  );
}
