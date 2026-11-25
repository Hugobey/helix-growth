export type ScreenId = "promise" | "goals" | "email" | "setup" | "result";
export type Dimension = "conversion" | "time" | "behavior" | "segmentation" | "context";
export type SegmentCut = "source" | "platform" | "experience";

export type Screen = {
  id: ScreenId;
  name: string;
  arrived: number;
  continued: number;
  medianSec: number;
  p80Sec: number;
  scrollers: number;
  interactors: number;
  untouched: number;
  job: string;
  value: string;
  expectation: string;
};

export type SegmentRow = { id: string; label: string; users: number; completed: number };

export const opened = 1000;

export const screens: Screen[] = [
  {
    id: "promise",
    name: "Promise",
    arrived: 1000,
    continued: 860,
    medianSec: 8,
    p80Sec: 14,
    scrollers: 620,
    interactors: 910,
    untouched: 90,
    job: "Decide, in a few seconds, whether this product is for them.",
    value: "The screen states an outcome. It does not show the product doing it.",
    expectation: "Someone who continues has accepted the promise far enough to answer questions. Someone who leaves may have understood it and rejected it.",
  },
  {
    id: "goals",
    name: "Goals",
    arrived: 860,
    continued: 740,
    medianSec: 34,
    p80Sec: 58,
    scrollers: 782,
    interactors: 834,
    untouched: 26,
    job: "Tell the product about themselves so the result can be specific.",
    value: "The questions are the work. Answering them feels like progress.",
    expectation: "A long visit and a high step rate fit a screen people know how to use.",
  },
  {
    id: "email",
    name: "Email",
    arrived: 740,
    continued: 430,
    medianSec: 4,
    p80Sec: 8,
    scrollers: 133,
    interactors: 490,
    untouched: 250,
    job: "Get to something useful, or save a place in the flow.",
    value: "The screen asks for an address. It does not demonstrate the product.",
    expectation: "If the promise was a result, an email here can feel like that result was withheld. Many people do not stay long enough to learn what the field is for.",
  },
  {
    id: "setup",
    name: "Setup",
    arrived: 430,
    continued: 380,
    medianSec: 47,
    p80Sec: 81,
    scrollers: 198,
    interactors: 421,
    untouched: 9,
    job: "Prepare the thing they came to use.",
    value: "The time is spent configuring, and most people who arrive finish.",
    expectation: "A long visit here is compatible with people doing the task. Length alone is not a broken screen.",
  },
  {
    id: "result",
    name: "First result",
    arrived: 380,
    continued: 310,
    medianSec: 16,
    p80Sec: 29,
    scrollers: 167,
    interactors: 357,
    untouched: 23,
    job: "See the product deliver what was promised.",
    value: "This is the first meaningful result in the flow.",
    expectation: "Most people who arrive complete it. The larger loss happened earlier.",
  },
];

export const finished = screens[screens.length - 1].continued;

export const segments: Record<SegmentCut, { label: string; rows: SegmentRow[] }> = {
  source: {
    label: "Acquisition source",
    rows: [
      { id: "organic", label: "Organic", users: 450, completed: 198 },
      { id: "paid", label: "Paid social", users: 400, completed: 64 },
      { id: "referral", label: "Referral", users: 150, completed: 48 },
    ],
  },
  platform: {
    label: "Platform",
    rows: [
      { id: "ios", label: "iOS", users: 600, completed: 222 },
      { id: "android", label: "Android", users: 400, completed: 88 },
    ],
  },
  experience: {
    label: "Experience",
    rows: [
      { id: "new", label: "New to the category", users: 500, completed: 110 },
      { id: "switch", label: "Already using another app", users: 500, completed: 200 },
    ],
  },
};

export const defaultFocus: Record<SegmentCut, string> = {
  source: "paid",
  platform: "android",
  experience: "new",
};

export const dimensions: { id: Dimension; label: string; hint: string }[] = [
  { id: "conversion", label: "Conversion", hint: "Completion, drop-off, and the step rate." },
  { id: "time", label: "Time", hint: "Median and the 80th percentile, in seconds." },
  { id: "behavior", label: "Behavior", hint: "Scroll, clicks, and who leaves without either." },
  { id: "segmentation", label: "Segmentation", hint: "Source, platform, and prior experience." },
  { id: "context", label: "Context", hint: "The job of the screen, the value on it, and the expectation." },
];

export const examples: { id: string; title: string; body: string; dimension: Dimension; screen: ScreenId; cut?: SegmentCut }[] = [
  {
    id: "engage",
    title: "Long time, high completion",
    body: "Users spend a long time on a screen, but completion remains high. This could indicate engagement rather than friction.",
    dimension: "time",
    screen: "setup",
  },
  {
    id: "bounce",
    title: "Short time, immediate exit",
    body: "Users spend very little time on a screen and abandon immediately. This could indicate unclear messaging or a mismatch in expectations.",
    dimension: "time",
    screen: "email",
  },
  {
    id: "source",
    title: "One cohort falls behind",
    body: "One acquisition cohort converts significantly worse than another. This could indicate that the onboarding experience doesn't match the promise made during acquisition.",
    dimension: "segmentation",
    screen: "promise",
    cut: "source",
  },
];

export function share(part: number, whole: number) {
  return Math.round((part / whole) * 100);
}

export function formatInt(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
}

export function screenById(id: ScreenId) {
  return screens.find((item) => item.id === id) ?? screens[0];
}

export function stepRate(screen: Screen) {
  return share(screen.continued, screen.arrived);
}

export function dropCount(screen: Screen) {
  return screen.arrived - screen.continued;
}

function rateLabel(row: SegmentRow) {
  return `${share(row.completed, row.users)}% (${formatInt(row.completed)} of ${formatInt(row.users)})`;
}

export function explain(dimension: Dimension, screen: Screen, cut: SegmentCut, focus: SegmentRow) {
  const step = stepRate(screen);
  const drop = dropCount(screen);
  const blend = `${share(finished, opened)}%`;

  if (dimension === "conversion") {
    return {
      observation: `${formatInt(screen.arrived)} people reach ${screen.name}. ${formatInt(screen.continued)} continue, a ${step}% step. ${formatInt(drop)} leave on this screen. The funnel still ends at ${formatInt(finished)} of ${formatInt(opened)}, ${blend}.`,
      hypothesis: conversionHypothesis[screen.id],
    };
  }

  if (dimension === "time") {
    return {
      observation: `On ${screen.name}, the median visit is ${screen.medianSec}s and the 80th percentile is ${screen.p80Sec}s. The step conversion on the same screen is ${step}%.`,
      hypothesis: timeHypothesis[screen.id],
    };
  }

  if (dimension === "behavior") {
    return {
      observation: `Of the people who reach ${screen.name}, ${share(screen.scrollers, screen.arrived)}% scroll past the first view, ${share(screen.interactors, screen.arrived)}% click or enter something, and ${share(screen.untouched, screen.arrived)}% leave without a click.`,
      hypothesis: behaviorHypothesis[screen.id],
    };
  }

  if (dimension === "segmentation") {
    const rows = segments[cut].rows;
    const other = rows.filter((row) => row.id !== focus.id).sort((a, b) => b.completed / b.users - a.completed / a.users)[0];
    return {
      observation: `${focus.label} finishes at ${rateLabel(focus)}. ${other.label} finishes at ${rateLabel(other)}. Blended completion is still ${blend} of ${formatInt(opened)}.`,
      hypothesis: segmentHypothesis[focus.id] ?? "A gap between groups is a reason to look at the promise and the audience. It is not, by itself, the cause.",
    };
  }

  return {
    observation: `${formatInt(screen.arrived)} people reach ${screen.name}, and ${step}% of them continue. That is the measurement. The job, the value, and the expectation below are a read of the screen, not a second metric.`,
    hypothesis: contextHypothesis[screen.id],
  };
}

const conversionHypothesis: Record<ScreenId, string> = {
  promise: "A first-screen exit can be people who are not the audience. The rate locates the loss. It does not say whether the promise was clear.",
  goals: "Most people who start the questions finish them. This step is not where the funnel breaks.",
  email: "This is the largest drop. A 58% step rate tells you where to look next. It does not say whether the problem is trust, timing, or the ask.",
  setup: "People who reach setup usually finish it. A high step rate after a long task is a different situation from a short exit.",
  result: "The last step holds most of the people who arrive. The completion rate of the whole funnel was mostly decided earlier.",
};

const timeHypothesis: Record<ScreenId, string> = {
  promise: "Eight seconds is enough to accept or reject a promise, and not enough to struggle with a control. Short time is compatible with a clear screen. It does not prove the copy is doing its job.",
  goals: "The visit is long and the step still converts. People may be working through the questions. That can be engagement rather than friction, and the clock cannot settle it alone.",
  email: "The median is 4 seconds and the 80th percentile is 8. People are not lingering. With the size of the drop, this fits an immediate rejection more than a form they are fighting. Unclear messaging, or a mismatch with what they expected, are both possible. Neither is proven.",
  setup: "The median is 47 seconds, the 80th percentile is 81, and 88% of people who arrive still finish. A long visit with high completion can be the task itself. Reading that time as friction would aim the next change at the wrong screen.",
  result: "The visit is moderate and most people complete the step. Nothing in the timing singles this screen out.",
};

const behaviorHypothesis: Record<ScreenId, string> = {
  promise: "Most people continue, and many scroll. There is no pattern of a control people tap and then abandon. The first screen is not showing a broken interaction.",
  goals: "Almost everyone interacts. The people who leave have usually started. That looks like effort, not a screen they bounce off.",
  email: "About a third of arrivals leave without ever using the field, and few people scroll. They are not failing a form they tried to finish. The pattern fits an ask they are not ready for. It could be the message, or a mismatch with the expectation they arrived with. The clicks do not decide which.",
  setup: "Interaction is high, which matches the time spent. People are using the screen, not abandoning it on sight.",
  result: "Most people who arrive interact and finish. The abandonment pattern is ordinary for a last step.",
};

const segmentHypothesis: Record<string, string> = {
  paid: "Paid social finishes at 16%, against 44% for organic. The blended 31% hides that gap. The onboarding may not match the promise in the paid creative. The paid audience may also be less ready. The gap is a reason to compare the ad and the first screens. It is not proof of either cause.",
  organic: "Organic finishes well above the blend. These people may arrive with a clearer intent. That does not mean the screens are fine for every other source.",
  referral: "Referral sits near the blend. It does not explain the overall rate, and it does not close the gap between paid social and organic.",
  ios: "iOS finishes higher than Android. The gap is real, and it is smaller than paid social versus organic. A platform gap can be layout, speed, or a different mix of sources. It should not become the story until those are separated.",
  android: "Android finishes at 22%, against 37% on iOS. That can be the build, or it can be who the ads send. The source split is the larger gap in this fictional set. Platform is a clue, not the verdict.",
  new: "People new to the category finish at 22%. People who already use another app finish at 40%. The flow may assume knowledge a new person does not have. Or the switcher arrives with a job already in mind. The split is a hypothesis about fit, not a verdict on a screen.",
  switch: "People who already use another app finish higher. They may arrive knowing what they want. The lower rate among new people is the open question, not evidence that the flow is easy.",
};

const contextHypothesis: Record<ScreenId, string> = {
  promise: "Whether the line is credible is not something an 86% step rate can settle. The context is a hypothesis about the job of the screen.",
  goals: "High completion and a long visit are compatible with a screen people understand. That still does not tell you which question, if any, is extra.",
  email: "The count says people leave. The context says the screen asks for a commitment before it has shown the product working. That is a plausible account. It is not a finding.",
  setup: "If the time is the task, the next experiment is not 'make setup shorter' by default. Shortening a screen people are willing to complete can remove the thing they came to do.",
  result: "The first result is where the promise becomes visible. Most of the loss is already behind them. Moving the offer, or the email, has to be judged against that, not against this step alone.",
};

export type SimInput = { mau: number; trialPct: number; price: number; renewalPct: number };

export const simStart: SimInput = { mau: 20000, trialPct: 6, price: 12, renewalPct: 75 };

export const simBounds = {
  mau: { min: 5000, max: 80000, step: 5000 },
  trialPct: { min: 2, max: 18, step: 1 },
  price: { min: 5, max: 30, step: 1 },
  renewalPct: { min: 40, max: 95, step: 1 },
} as const;

export function simulate(input: SimInput) {
  const newcomers = Math.round((input.mau * input.trialPct) / 100);
  const leavePct = 100 - input.renewalPct;
  const paying = Math.round((newcomers * 100) / leavePct);
  const mrr = paying * input.price;
  const revenuePerUser = mrr / input.mau;
  return { newcomers, leavePct, paying, mrr, revenuePerUser };
}

const users = (rows: SegmentRow[]) => rows.reduce((sum, row) => sum + row.users, 0);
const done = (rows: SegmentRow[]) => rows.reduce((sum, row) => sum + row.completed, 0);

let previous = opened;
for (const screen of screens) {
  if (screen.arrived !== previous) throw new Error(`Funnel broken at ${screen.id}`);
  if (screen.interactors + screen.untouched !== screen.arrived) throw new Error(`Behavior broken at ${screen.id}`);
  if (screen.p80Sec < screen.medianSec) throw new Error(`Time broken at ${screen.id}`);
  previous = screen.continued;
}
if (previous !== finished) throw new Error("Finish mismatch");
for (const cut of Object.values(segments)) {
  if (users(cut.rows) !== opened || done(cut.rows) !== finished) throw new Error(`Segment broken: ${cut.label}`);
}
