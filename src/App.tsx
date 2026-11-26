import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { CaseArticle } from "./pages/CaseArticle";
import { Cases } from "./pages/Cases";
import { Home } from "./pages/Home";
import { Method } from "./pages/Method";
import { Prepare } from "./pages/Prepare";
import { Pricing } from "./pages/Pricing";
import { Sprint } from "./pages/Sprint";

function RouteAnalytics() {
  const { pathname } = useLocation();
  return <Analytics route={pathname} path={pathname} />;
}

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const node = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (node) {
        requestAnimationFrame(() => node.scrollIntoView({ block: "start" }));
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function Missing() {
  return (
    <main id="main" className="mx-auto max-w-page px-5 py-24 md:px-8">
      <h1 className="font-display text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.95] tracking-[-0.03em]">This page isn't here.</h1>
      <Link className="mt-6 inline-block underline underline-offset-4" to="/">Back to Helix Growth</Link>
    </main>
  );
}

export function App() {
  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-ground"
        href="#main"
      >
        Skip to content
      </a>
      <Header />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-studies" element={<Cases />} />
        <Route path="/case-studies/:slug" element={<CaseArticle />} />
        <Route path="/methodology" element={<Method />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/growth-sprint" element={<Sprint />} />
        <Route path="/preparing-for-a-growth-review" element={<Prepare />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
      <RouteAnalytics />
    </>
  );
}
