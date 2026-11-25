import { Link } from "react-router-dom";

export function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <path d="M4 16c4.4-7.2 7.6-7.2 12 0s7.6 7.2 12 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 16c4.4 7.2 7.6 7.2 12 0s7.6-7.2 12 0" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <circle cx="16" cy="16" r="2.1" fill="#FF4D1C" />
    </svg>
  );
}

export function Brand({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} className="inline-flex items-center gap-2.5 text-ink">
      <Mark />
      <span className="font-display text-[1.45rem] leading-none tracking-[-0.03em]">Helix Growth</span>
    </Link>
  );
}
