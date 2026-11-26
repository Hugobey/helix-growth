import { Link } from "react-router-dom";

export function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="block h-full w-full" aria-hidden="true">
      <path d="M8 5.5C5 12 13 14 16 16c3 2 11 4 8 10.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M24 5.5C27 12 19 14 16 16c-3 2-11 4-8 10.5" fill="none" stroke="#FF4D1C" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function Brand({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} className="brand-link inline-flex items-center gap-2.5 text-ink">
      <span className="brand-mark inline-flex h-7 w-7 shrink-0"><Mark /></span>
      <span className="brand-name font-display text-[1.45rem] leading-none tracking-[-0.03em]">Helix Growth</span>
    </Link>
  );
}
