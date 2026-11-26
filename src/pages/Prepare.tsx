import { useMemo } from "react";
import { Link } from "react-router-dom";
import { AUDIT_MAIL, prepareItems } from "../content";
import { StrandField } from "../components/Helix";
import { iconForLine, PointIcon } from "../components/PointIcon";
import { Reveal } from "../components/Reveal";
import { usePageMeta } from "../lib/meta";

const pageLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Preparing your mobile app for a growth review.",
  url: "https://helixgrowth.io/preparing-for-a-growth-review/",
  description: "What to gather before an App Growth Review: objectives, analytics, monetization, onboarding, retention, access, and the question you already have.",
  author: { "@type": "Organization", name: "Helix Growth" },
};

export function Prepare() {
  const jsonLd = useMemo(() => pageLd, []);
  usePageMeta(
    "Preparing your mobile app for a growth review — Helix Growth",
    "A checklist for the day of an App Growth Review: objectives, analytics, monetization, the onboarding funnel, retention, product access, and the question you want answered.",
    "https://helixgrowth.io/preparing-for-a-growth-review/",
    jsonLd,
  );

  return (
    <main id="main">
      <header className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 overflow-hidden md:h-48" aria-hidden="true">
          <StrandField />
        </div>
        <div className="relative mx-auto max-w-page px-6 pb-4 pt-16 md:px-10 md:pt-20">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-tide">
              <Link to="/pricing" className="underline decoration-tide/40 underline-offset-4">Pricing</Link>
              <span aria-hidden="true"> · </span>
              Before a review
            </p>
            <h1 className="mt-4 max-w-[16ch] font-display text-[clamp(2.7rem,5.4vw,4.6rem)] leading-[0.94]">
              Preparing your mobile app for a growth review.
            </h1>
            <p className="mt-6 max-w-[42rem] text-[1.12rem] leading-relaxed">
              The App Growth Review is one working day. The day is more useful when the question, the product, and the numbers are in the same place. You do not need a perfect analytics stack. You need enough for us to see what is happening, and to say what we could not see.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="mx-auto max-w-page px-6 pb-8 pt-6 md:px-10" aria-labelledby="checklist-title">
        <h2 id="checklist-title" className="font-display text-[clamp(2rem,3.5vw,2.8rem)] leading-[1.02]">What to gather.</h2>
        <p className="mt-4 max-w-[40rem] text-[16px] leading-relaxed text-mute">
          Seven items. Each one changes what the review can say. Missing one does not cancel the day.
        </p>
        <ol className="mt-10 max-w-[46rem] border-t border-ink/10">
          {prepareItems.map((item, index) => (
            <li key={item.title} className="grid gap-3 border-b border-ink/10 py-6 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
              <span className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.14em] text-tide">
                <span className="point-mark grid h-10 w-10 place-items-center rounded-xl bg-[rgba(255,77,28,0.12)] text-[#FF4D1C]">
                  <PointIcon name={iconForLine(item.title)} />
                </span>
                0{index + 1}
              </span>
              <div>
                <h3 className="font-display text-[1.7rem] leading-none">{item.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed">{item.why}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-ink/10">
        <div className="mx-auto grid max-w-page gap-10 px-6 section-pad md:px-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[clamp(2rem,3.5vw,2.8rem)] leading-[1.02]">What this is not.</h2>
            <p className="mt-5 text-[16px] leading-relaxed">
              A complete export of every event, or a new analytics install. The review reads the product and the measurement you already have. If the measurement is the constraint, that becomes a recommendation. It is not silently added to the $350.
            </p>
          </div>
          <div className="border-t-4 border-ink bg-surface p-6 md:p-8">
            <h2 className="font-display text-[1.7rem] leading-none">When you are ready.</h2>
            <p className="mt-4 text-[16px] leading-relaxed">
              Send the app, the question, and whatever of the list you can share. If analytics or revenue data are absent, write “none”. That is a useful answer.
            </p>
            <a className="mt-6 inline-flex min-h-11 items-center rounded-md bg-ink px-5 py-3 text-[15px] text-ground" href={AUDIT_MAIL}>
              Get your app reviewed
            </a>
            <p className="mt-4 text-[14px] text-mute">
              The review is $350 and takes no more than one working day.{" "}
              <Link className="text-ink underline decoration-ink/30 underline-offset-4" to="/pricing">See how it sits next to the sprint.</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
