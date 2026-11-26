import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CAL } from "../content";
import { Brand } from "./Brand";

const links = [
  { href: "/#results", label: "Results" },
  { href: "/#clients", label: "Work" },
  { href: "/case-studies", label: "Cases" },
  { href: "/pricing", label: "Pricing" },
  { href: "/methodology", label: "Method" },
];

function currentLink(href: string, pathname: string) {
  if (href === "/methodology") return pathname === "/methodology";
  if (href === "/pricing") return pathname === "/pricing";
  if (href === "/case-studies") return pathname.startsWith("/case-studies");
  return false;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - last;
      last = y;
      if (open) {
        setHidden(false);
        return;
      }
      if (y < 64) setHidden(false);
      else if (delta > 8) setHidden(true);
      else if (delta < -8) setHidden(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    const node = headerRef.current;
    if (!node) return;
    if (hidden) node.setAttribute("inert", "");
    else node.removeAttribute("inert");
  }, [hidden]);

  return (
    <header
      ref={headerRef}
      data-hidden={hidden ? "true" : undefined}
      className="site-header sticky top-0 z-40 border-b border-ink/10 bg-ground/90 backdrop-blur-md"
    >
      <div className="mx-auto flex h-[72px] max-w-page items-center gap-6 px-6 md:px-10">
        <Brand to="/" />
        <nav className="ml-auto hidden items-center gap-6 text-[15px] md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              aria-current={currentLink(link.href, pathname) ? "page" : undefined}
              className="text-ink hover:underline hover:underline-offset-4"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          className="ml-2 hidden min-h-11 items-center rounded-md bg-ink px-4 py-2 text-[14px] text-ground md:inline-flex"
          href={CAL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Let's talk
        </a>
        <button
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-3 w-5" aria-hidden="true">
            <span className={`absolute left-0 h-px w-5 bg-ink transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-px w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-px w-5 bg-ink transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu"
            className="border-t border-ink/10 bg-ground md:hidden"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col gap-1 overflow-hidden px-6 py-4" aria-label="Mobile">
              {links.map((link) => (
                <Link key={link.href} to={link.href} className="py-3 text-lg" onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <a className="mt-3 min-h-11 rounded-md bg-ink px-4 py-3 text-center text-ground" href={CAL} target="_blank" rel="noopener noreferrer">
                Let's talk
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
