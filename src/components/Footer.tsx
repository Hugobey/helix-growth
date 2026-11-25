import { Link } from "react-router-dom";
import { CAL, MAIL } from "../content";
import { Brand } from "./Brand";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ground" data-od-id="footer">
      <div className="mx-auto grid max-w-page gap-10 px-6 py-[72px] md:grid-cols-[1.4fr_1fr_1fr] md:px-10">
        <div>
          <Brand to="/" />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-mute">
            An independent studio for mobile product growth. Conversion, monetization, and retention.
          </p>
        </div>
        <nav aria-label="Pages" className="flex flex-col gap-2 text-[15px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Pages</p>
          <Link to="/#results">Results</Link>
          <Link to="/#clients">Work</Link>
          <Link to="/#wins">Growth wins</Link>
          <Link to="/#engagements">Engagements</Link>
          <Link to="/methodology">Method</Link>
        </nav>
        <nav aria-label="Contact" className="flex flex-col gap-2 text-[15px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Contact</p>
          <a href={`mailto:${MAIL}`}>{MAIL}</a>
          <a href={CAL} target="_blank" rel="noopener noreferrer">Let's talk</a>
          <Link to="/#review">Review · $350</Link>
          <Link to="/#sprint">Sprint · $2,800</Link>
          <Link to="/#advisory">Advisory · custom</Link>
        </nav>
      </div>
      <div className="mx-auto flex max-w-page items-center justify-between border-t border-ink/10 px-6 py-5 font-mono text-[12px] text-mute md:px-10">
        <span>Helix Growth · 2026</span>
        <span>English</span>
      </div>
    </footer>
  );
}
