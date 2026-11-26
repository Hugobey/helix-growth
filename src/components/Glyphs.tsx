import { motion, useReducedMotion } from "framer-motion";

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Glyph({ name }: { name: string }) {
  const reduce = useReducedMotion();
  const draw = {
    initial: reduce ? false : { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, amount: 0.6 },
    transition: { duration: reduce ? 0 : 0.8, ease },
  };

  return (
    <svg viewBox="0 0 48 48" className="h-11 w-11" aria-hidden="true">
      {name === "onboarding" && (
        <>
          <rect x="5" y="14" width="10" height="16" rx="1.5" {...stroke} />
          <rect x="19" y="14" width="10" height="16" rx="1.5" {...stroke} />
          <rect x="33" y="14" width="10" height="16" rx="1.5" {...stroke} />
          <motion.path d="M10 30 V36 H38 V30" {...stroke} {...draw} />
        </>
      )}
      {name === "paywall" && (
        <>
          <motion.path d="M8 34 L18 22 L26 28 L40 12" {...stroke} {...draw} />
          <circle className="glyph-node" cx="40" cy="12" r="2.4" fill="#FF4D1C" />
          <path d="M14 38h20" {...stroke} />
        </>
      )}
      {name === "retention" && (
        <motion.path d="M24 10 a14 14 0 1 1 -9 4" {...stroke} {...draw} />
      )}
      {name === "retention" && <path d="M13 10 V18 H21" {...stroke} />}
      {name === "ux" && (
        <>
          <motion.path d="M10 24 H18 L24 14 L30 34 L36 24 H40" {...stroke} {...draw} />
          <circle className="glyph-node" cx="24" cy="14" r="2.2" fill="#3E6D88" />
        </>
      )}
      {name === "subscription" && (
        <>
          <motion.circle cx="24" cy="24" r="12" {...stroke} {...draw} />
          <circle className="glyph-node" cx="24" cy="12" r="2.3" fill="#FF4D1C" />
        </>
      )}
      {name === "analytics" && (
        <>
          <path d="M8 38 H40" {...stroke} />
          <motion.path d="M14 32 V22 M24 32 V14 M34 32 V18" {...stroke} {...draw} />
        </>
      )}
    </svg>
  );
}

export function OfferArt({ name }: { name: "review" | "sprint" | "advisory" }) {
  const reduce = useReducedMotion();
  const draw = {
    initial: reduce ? false : { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: reduce ? 0 : 1, ease },
  };

  if (name === "review") {
    return (
      <svg viewBox="0 0 220 120" className="decor h-28 w-full" aria-hidden="true">
        <circle cx="96" cy="58" r="28" {...stroke} />
        <motion.path d="M116 76 L146 102" {...stroke} {...draw} />
        <circle className="glyph-node" cx="96" cy="58" r="4" fill="#FF4D1C" />
        <path d="M96 40 V48 M96 68 V76 M78 58 H86 M106 58 H114" {...stroke} />
      </svg>
    );
  }

  if (name === "sprint") {
    return (
      <svg viewBox="0 0 220 120" className="decor h-28 w-full text-ground" aria-hidden="true">
        <motion.path d="M30 78 L70 40 L120 70 L168 34 L196 58" {...stroke} {...draw} />
        <circle cx="30" cy="78" r="3" fill="currentColor" />
        <circle cx="70" cy="40" r="3" fill="currentColor" />
        <circle className="glyph-node" cx="120" cy="70" r="4.5" fill="#FF4D1C" />
        <circle cx="168" cy="34" r="3" fill="#7FA8BE" />
        <circle cx="196" cy="58" r="3" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 220 120" className="decor h-28 w-full" aria-hidden="true">
      <motion.path className="strand" d="M20 60 C50 28 80 28 110 60 S170 92 200 60" {...stroke} {...draw} />
      <path d="M20 60 C50 92 80 92 110 60 S170 28 200 60" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <circle className="glyph-node" cx="110" cy="60" r="4" fill="#FF4D1C" />
    </svg>
  );
}
