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
            Mobile app growth consulting for founders. Onboarding optimization, monetization, conversion, and retention.
          </p>
        </div>
        <nav aria-label="Pages" className="flex flex-col gap-2 text-[15px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Pages</p>
          <Link to="/#results">Results</Link>
          <Link to="/#clients">Work</Link>
          <Link to="/case-studies">Case studies</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/growth-sprint">Growth Sprint</Link>
          <Link to="/methodology">Method</Link>
          <Link to="/blog">Blog</Link>
        </nav>
        <nav aria-label="Contact" className="flex flex-col gap-2 text-[15px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Contact</p>
          <a href={`mailto:${MAIL}`}>{MAIL}</a>
          <a href={CAL} target="_blank" rel="noopener noreferrer">Let's grow your app</a>
          <Link to="/pricing#review">Review · $350</Link>
          <Link to="/growth-sprint">Sprint · $2,000</Link>
          <Link to="/pricing#advisory">Advisory · let's discuss</Link>
        </nav>
      </div>
      <div className="mx-auto flex max-w-page items-center justify-between border-t border-ink/10 px-6 py-5 font-mono text-[12px] text-mute md:px-10">
        <span>Helix Growth · 2026</span>
        <span>English</span>
      </div>
    </footer>
  );
}
