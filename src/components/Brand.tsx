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

function HelixMini() {
  return (
    <svg viewBox="0 0 22 30" className="block h-full w-full" aria-hidden="true">
      <path d="M4 2C4 7 18 7 18 13.5C18 20 4 20 4 26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 2C18 7 4 7 4 13.5C4 20 18 20 18 26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
      <path d="M4.2 4h13.6M4.2 25.2h13.6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="11" cy="13.5" r="1.65" fill="#FF4D1C" />
    </svg>
  );
}

export function Brand({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} className="brand-link inline-flex items-center gap-2.5 text-ink">
      <span className="brand-mark"><Mark /></span>
      <span className="brand-helix"><HelixMini /></span>
      <span className="brand-name font-display text-[1.45rem] leading-none tracking-[-0.03em]">Helix Growth</span>
    </Link>
  );
}
