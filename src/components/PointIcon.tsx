import type { ReactNode } from "react";

type IconName =
  | "funnel"
  | "time"
  | "scroll"
  | "cohort"
  | "source"
  | "value"
  | "search"
  | "mark"
  | "note"
  | "path"
  | "layers"
  | "compass"
  | "cycle"
  | "decision"
  | "chart"
  | "coin"
  | "door"
  | "loop"
  | "key"
  | "flag"
  | "alert"
  | "eye"
  | "pencil";

const benefitIcons: Record<string, IconName> = {
  "Understand what's holding your app back.": "search",
  "Identify the most important opportunities.": "mark",
  "Get expert recommendations.": "note",
  "Understand your biggest growth constraints.": "funnel",
  "Discover opportunities across the user journey.": "path",
  "Prioritize high-impact initiatives.": "layers",
  "Establish a clear growth direction.": "compass",
  "Get ongoing strategic guidance.": "compass",
  "Make better product decisions.": "decision",
  "Continuously review and refine growth priorities.": "cycle",
};

const titleIcons: Record<string, IconName> = {
  "Business objectives": "flag",
  "Product analytics": "chart",
  "Monetization metrics": "coin",
  "Onboarding funnel": "funnel",
  "Retention data": "loop",
  "Relevant product access": "key",
  "Current growth challenges": "alert",
  "Measure what happened.": "chart",
  "Understand why it happened.": "eye",
  "Identify what should change.": "pencil",
  "Measure the business impact.": "coin",
};

export function iconForLine(line: string): IconName {
  return benefitIcons[line] ?? titleIcons[line] ?? "note";
}

export function PointIcon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {paths[name] ?? paths.note}
    </svg>
  );
}

const paths: Record<string, ReactNode> = {
  funnel: (
    <path d="M3.5 4.5h17l-6.2 7.1v6.2l-4.6-1.8v-4.4L3.5 4.5Z" />
  ),
  time: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.2l2.8 1.8" />
    </>
  ),
  scroll: (
    <>
      <rect x="7" y="3.5" width="10" height="17" rx="2" />
      <path d="M12 7.5v6" />
      <path d="m9.5 11.5 2.5 2.5 2.5-2.5" />
    </>
  ),
  cohort: (
    <>
      <circle cx="8" cy="9" r="2.2" />
      <circle cx="16" cy="9" r="2.2" />
      <path d="M4.5 17.5c.6-2.2 2.1-3.3 3.5-3.3s2.9 1.1 3.5 3.3" />
      <path d="M12.5 17.5c.6-2.2 2.1-3.3 3.5-3.3s2.9 1.1 3.5 3.3" />
    </>
  ),
  source: (
    <>
      <path d="M14 5h5v5" />
      <path d="M19 5 10.5 13.5" />
      <rect x="3.5" y="10.5" width="8" height="8" rx="1.5" />
    </>
  ),
  value: (
    <>
      <path d="M12 3.5 19 8.2v7.6L12 20.5 5 15.8V8.2L12 3.5Z" />
      <path d="M12 8.2v7.2" />
      <path d="M9.2 11.2h5.6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m15.5 15.5 4 4" />
    </>
  ),
  mark: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v2.2M12 17.8V20M4 12h2.2M17.8 12H20" />
    </>
  ),
  note: (
    <>
      <path d="M7 3.5h7l4 4V20.5H7V3.5Z" />
      <path d="M14 3.8V8h4" />
      <path d="M9.5 12.5h5" />
      <path d="M9.5 16h5" />
    </>
  ),
  path: (
    <>
      <circle cx="6" cy="7" r="2" />
      <circle cx="17.5" cy="12" r="2" />
      <circle cx="8" cy="17.5" r="2" />
      <path d="M8 7.5 15.2 11" />
      <path d="M15.6 13.4 9.6 16.4" />
    </>
  ),
  layers: (
    <>
      <path d="M4 8h16" />
      <path d="M6.5 12h11" />
      <path d="M9 16h6" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="m14.8 9.2-1.3 4.3-4.3 1.3 1.3-4.3 4.3-1.3Z" />
    </>
  ),
  cycle: (
    <>
      <path d="M16.5 7.5A6.5 6.5 0 0 0 7 9" />
      <path d="M7.5 16.5A6.5 6.5 0 0 0 17 15" />
      <path d="M16.5 4.5v3h-3" />
      <path d="M7.5 19.5v-3h3" />
    </>
  ),
  decision: (
    <>
      <path d="M12 4.5 19 12l-7 7.5L5 12 12 4.5Z" />
      <path d="m9.2 12 1.8 1.8 3.8-3.8" />
    </>
  ),
  chart: (
    <>
      <path d="M4.5 19.5h15" />
      <path d="M7 16V11" />
      <path d="M12 16V7.5" />
      <path d="M17 16v-3.5" />
    </>
  ),
  coin: (
    <>
      <ellipse cx="12" cy="7" rx="6.5" ry="2.6" />
      <path d="M5.5 7v5c0 1.5 2.9 2.6 6.5 2.6s6.5-1.1 6.5-2.6V7" />
      <path d="M5.5 12v4.2c0 1.5 2.9 2.6 6.5 2.6s6.5-1.1 6.5-2.6V12" />
    </>
  ),
  door: (
    <>
      <path d="M6 20.5V5.2L15.5 3.5v17" />
      <path d="M15.5 12H20" />
      <path d="m17.5 9.5 2.5 2.5-2.5 2.5" />
    </>
  ),
  loop: (
    <>
      <path d="M8 14.5a4 4 0 1 1 1.2-5.5" />
      <path d="M16 9.5a4 4 0 1 1-1.2 5.5" />
      <path d="M9.2 9H6.5V6.5" />
      <path d="M14.8 15H17.5v2.5" />
    </>
  ),
  key: (
    <>
      <circle cx="8.5" cy="12" r="3.2" />
      <path d="M11.5 12H20" />
      <path d="M17 12v2.4" />
      <path d="M19.2 12v1.8" />
    </>
  ),
  flag: (
    <>
      <path d="M6 20.5V4" />
      <path d="M6 5h11l-2 3.2L17 11.5H6" />
    </>
  ),
  alert: (
    <>
      <path d="M12 4.2 20.5 19H3.5L12 4.2Z" />
      <path d="M12 10v4.2" />
      <path d="M12 16.8v.6" />
    </>
  ),
  eye: (
    <>
      <path d="M2.8 12S6.2 6.5 12 6.5 21.2 12 21.2 12 17.8 17.5 12 17.5 2.8 12 2.8 12Z" />
      <circle cx="12" cy="12" r="2.4" />
    </>
  ),
  pencil: (
    <>
      <path d="M13.2 6.2 17.8 10.8" />
      <path d="M4.5 19.5 6 14.2 15.6 4.6a1.6 1.6 0 0 1 2.3 0l1.5 1.5a1.6 1.6 0 0 1 0 2.3L9.8 18.4 4.5 19.5Z" />
    </>
  ),
};
