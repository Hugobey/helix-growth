import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function Meter({
  value,
  max = 100,
  tone = "ink",
}: {
  value: number;
  max?: number;
  tone?: "ink" | "tide";
}) {
  const reduce = useReducedMotion();
  const width = `${Math.max(0, Math.min(100, (value / max) * 100))}%`;
  return (
    <span className="relative block h-2 bg-surface">
      <motion.span
        className={`block h-full ${tone === "tide" ? "bg-tide" : "bg-ink"}`}
        initial={false}
        animate={{ width }}
        transition={{ duration: reduce ? 0 : 0.45, ease }}
      />
    </span>
  );
}
