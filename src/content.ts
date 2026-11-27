export const CAL = "https://cal.com/hugo-blanchart-hugob-sdd1yn/30min";
export const CAL_SPRINT = `${CAL}?notes=Growth%20Sprint%20%242%2C000`;
export const CAL_AUDIT = `${CAL}?notes=App%20Growth%20Review%20%24350`;
export const CAL_ADVISORY = `${CAL}?notes=Growth%20Advisory`;
export const MAIL = "hello@helixgrowth.io";
export const AUDIT_MAIL =
  "mailto:hello@helixgrowth.io?subject=App%20Growth%20Review%20%24350&body=App%20or%20a%20way%20in%3A%0A%0AWhat%20you%20want%20understood%3A%0A%0AAnalytics%20you%20can%20share%2C%20or%20none%3A%0A%0AMonetization%20data%20you%20can%20share%2C%20or%20none%3A%0A";

export const logos = [
  { src: "/assets/voodoo.png", alt: "Voodoo", width: 316, height: 64 },
  { src: "/assets/prose.png", alt: "Prose", width: 209, height: 64 },
  { src: "/assets/heineken.png", alt: "Heineken", width: 446, height: 64 },
  { src: "/assets/biogen.png", alt: "Biogen", width: 184, height: 64 },
];

export type Metric = { value: string; label: string };

export type Study = {
  id: string;
  kicker: string;
  name: string;
  context: string;
  bottleneck: string;
  experiment: string;
  metrics: Metric[];
  note: string;
};

export const studies: Study[] = [
  {
    id: "wizz",
    kicker: "Monetization feature",
    name: "Wizz",
    context: "Social discovery app. MRR had held near $3M for several months.",
    bottleneck: "Revenue had to move from the live product, not from a new channel.",
    experiment: "One monetization feature. It was the only monetization initiative that worked, and it was retained.",
    metrics: [{ value: "+$1M MRR", label: "About $3M in October 2025 to about $4M in November 2025. $4M was the highest MRR reached." }],
    note: "The feature contributed to that increase. Not a monthly series.",
  },
  {
    id: "prose",
    kicker: "Onboarding",
    name: "Prose",
    context: "Personalized beauty and haircare.",
    bottleneck: "Onboarding conversion against the previous version.",
    experiment: "A new onboarding.",
    metrics: [{ value: "+34% onboarding CVR", label: "Relative improvement versus the previous version. Not 34 percentage points." }],
    note: "The figure is the overall relative change in onboarding conversion rate.",
  },
  {
    id: "perifit",
    kicker: "Paywall",
    name: "Perifit",
    context: "Connected health and wellness product.",
    bottleneck: "Paywall conversion.",
    experiment: "More paywall exposure, and social proof on the existing value proposition.",
    metrics: [{ value: "2× paywall CVR", label: "Paywall conversion after those two changes." }],
    note: "Two changes. No other metric is claimed.",
  },
  {
    id: "unite",
    kicker: "Public review",
    name: "Unite",
    context: "Sports social. Raphaël Lebon. An organic week, then a press week.",
    bottleneck: "Seven fields before the feed. Sign-ups flattened after the organic week.",
    experiment: "Setup cut to name, location, and two sports. Paris filled before new regions.",
    metrics: [
      { value: "409 vs 285", label: "Week of 19 Jan 2026 vs Sud-Ouest week of 16 Feb" },
      { value: "59", label: "Île-de-France sessions. No local campaign." },
      { value: "7 → 3", label: "Setup fields before the feed." },
    ],
    note: "A public review. Not one of the three homepage results.",
  },
];

export const results = [
  {
    id: "wizz",
    name: "Wizz",
    figure: "+$1M",
    label: "MRR",
    body: "A monetization initiative that contributed to growth from about $3M to $4M MRR between October and November 2025.",
  },
  {
    id: "prose",
    name: "Prose",
    figure: "+34%",
    label: "Onboarding conversion",
    body: "Improvement against the previous version, validated through an A/B test.",
  },
  {
    id: "perifit",
    name: "Perifit",
    figure: "2×",
    label: "Paywall conversion",
    body: "Following paywall optimization work.",
  },
];

export const clients = [
  {
    id: "wizz",
    name: "Wizz",
    product: "Social discovery app.",
    achievement: "Contributed to a $1M MRR increase through a new monetization initiative.",
    logo: "/assets/wizz-white.png",
    logoClass: "h-7 w-auto",
    kind: "tiktok" as const,
    film: "7335066212700818720",
    start: undefined as number | undefined,
    filmTitle: "Official Wizz film. TikTok @wizz_app, video 7335066212700818720.",
    poster: "",
    gradient: "from-[#04101f]/90 via-[#04101f]/45 via-[24%] to-transparent",
    links: [
      { label: "App Store", href: "https://apps.apple.com/fr/app/wizz-app-chat-now/id1452906710" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=info.wizzapp" },
    ],
  },
  {
    id: "prose",
    name: "Prose",
    product: "Personalized haircare.",
    achievement: "+34% onboarding conversion.",
    logo: "/assets/prose.png",
    logoClass: "h-5 w-auto brightness-0 invert",
    kind: "tiktok" as const,
    film: "7401154664395214111",
    start: undefined as number | undefined,
    filmTitle: "Official Prose film. TikTok @prosebeauty, video 7401154664395214111.",
    poster: "",
    gradient: "from-[#2a181c]/90 via-[#2a181c]/45 via-[24%] to-transparent",
    links: [{ label: "Visit website", href: "https://prose.com/" }],
  },
  {
    id: "perifit",
    name: "Perifit",
    product: "Connected fitness and pelvic floor training.",
    achievement: "2× paywall conversion.",
    logo: "/assets/perifit.png",
    logoClass: "h-9 w-auto brightness-0 invert",
    kind: "youtube" as const,
    film: "HBGw15sY0pw",
    start: 13,
    filmTitle: "Official Perifit film. Connected biofeedback, starting at 13 seconds.",
    poster: "https://i.ytimg.com/vi/HBGw15sY0pw/maxresdefault.jpg",
    gradient: "from-[#041812]/90 via-[#041812]/45 via-[24%] to-transparent",
    links: [
      { label: "App Store", href: "https://apps.apple.com/fr/app/perifit-care/id1183437203" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=starshipproduct.perifitmainapp" },
      { label: "Website", href: "https://perifit.co/" },
    ],
  },
];

export const signals = [
  { id: "funnel", label: "Conversion funnels" },
  { id: "time", label: "Time on each screen" },
  { id: "scroll", label: "Scroll and interaction" },
  { id: "cohort", label: "Segments and cohorts" },
  { id: "source", label: "Acquisition context" },
  { id: "value", label: "Experience and perceived value" },
];

export const fitYes = [
  "Your mobile app is already live and generating revenue.",
  "You have users but want to improve monetization and retention.",
  "You want to understand what's really happening inside your product.",
  "You're willing to challenge existing assumptions.",
  "You believe growth is a product responsibility, not just a marketing function.",
  "You want to make decisions using evidence rather than intuition.",
];

export const fitNo = [
  "You're comfortable with the status quo and have no intention of improving your product.",
  "You expect instant results without experimentation.",
  "You believe growth is exclusively about advertising and acquisition.",
  "You're unwilling to share relevant product or business data.",
  "You expect guaranteed revenue increases without considering the underlying product.",
  "You expect someone to implement everything without internal collaboration.",
];

export type CaseSlug = "wizz" | "prose" | "perifit";

export type CaseStudy = {
  slug: CaseSlug;
  name: string;
  category: string;
  headline: string;
  summary: string;
  logo: string;
  logoClass: string;
  figure: string;
  figureLabel: string;
  intro: string;
  challenge: string;
  investigation: string;
  solution: string;
  moves: string[];
  results: string[];
  diagram: "shift" | "flow" | "exposure";
  image?: { src: string; alt: string; caption: string; well: string };
  seoTitle: string;
  seoDescription: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "wizz",
    name: "Wizz",
    category: "Monetization strategy",
    headline: "Turning passive monetization into an immediate opportunity.",
    summary: "Revenue had settled. The mechanic in the product was not giving a Gen Z audience a reason to act now.",
    logo: "/assets/wizz.png",
    logoClass: "h-8 w-auto",
    figure: "+$1M",
    figureLabel: "MRR",
    intro: "Wizz is a social discovery app, built for a Gen Z audience. The business was already producing revenue. The monetization in the product was not producing a decision.",
    challenge: "Wizz had been generating approximately $3M in MRR for several months. The mechanic already in the product was not motivating users, and it was not creating value they could feel immediately.",
    investigation: "I started by examining monetization performance, then benchmarked competing apps for other ways to monetize. The insight that changed the work: the experience in the product was too passive for Wizz's Gen Z audience.",
    solution: "I developed a new monetization concept built around immediacy, FOMO, and behavioral triggers. I defined the initial requirements and worked alongside the designers and developers to bring the feature to life. The published version was adapted in places. It kept the original strategic concept.",
    moves: [],
    results: [
      "The feature contributed to MRR increasing from approximately $3M in October 2025 to $4M in November 2025.",
      "It became the monetization initiative the company retained.",
      "$4M was the highest MRR ever reached.",
    ],
    diagram: "shift",
    image: {
      src: "/assets/wizz-product.png",
      alt: "Wizz Infinity offer inside the app.",
      caption: "Wizz, in the product.",
      well: "bg-[#071426]",
    },
    seoTitle: "Wizz app monetization case study — Helix Growth",
    seoDescription: "A passive monetization mechanic, rebuilt around an immediate decision. MRR moved from about $3M to $4M between October and November 2025.",
  },
  {
    slug: "prose",
    name: "Prose",
    category: "Onboarding optimization",
    headline: "Building trust before asking for commitment.",
    summary: "The onboarding asked for personal information before the product had earned it. Email capture was where people stopped.",
    logo: "/assets/prose.png",
    logoClass: "h-6 w-auto",
    figure: "+34%",
    figureLabel: "Onboarding conversion",
    intro: "Prose makes personalized haircare. That product depends on what a person is willing to share. The onboarding was asking for it before the value was visible.",
    challenge: "The original onboarding asked for personal information before it had established trust, and before it had demonstrated what the product was worth. Email capture was a significant point of friction.",
    investigation: "Using Heap and Contentsquare, I read the onboarding journey and found where prospects were dropping off. The ask for personal information was the break, and email capture was the sharpest point of it.",
    solution: "I coordinated the technical team through a redesign with one order of operations: communicate the value, then request the information. The sequence of screens changed so the product made its case first.",
    moves: [
      "Stronger copywriting.",
      "More reasons to believe.",
      "Onboarding screens rearranged.",
      "Email capture moved toward the end of the experience.",
    ],
    results: [
      "The new onboarding achieved a 34% relative improvement in conversion rate compared with the previous version, validated through an A/B test.",
    ],
    diagram: "flow",
    image: {
      src: "/assets/prose-background.jpg",
      alt: "Prose onboarding experience.",
      caption: "Prose, in the product.",
      well: "bg-[#071426]",
    },
    seoTitle: "Prose onboarding conversion case study — Helix Growth",
    seoDescription: "Trust before the ask. Prose onboarding conversion improved 34% relative to the previous version, validated through an A/B test.",
  },
  {
    slug: "perifit",
    name: "Perifit",
    category: "Paywall optimization",
    headline: "Making the paywall more visible and credible.",
    summary: "The subscription waited through several sessions. It needed to be encountered, and the value on screen needed proof.",
    logo: "/assets/perifit.png",
    logoClass: "h-16 w-auto",
    figure: "2×",
    figureLabel: "Paywall conversion",
    intro: "Perifit is a connected fitness product. People could spend several sessions inside it before they ever met the subscription.",
    challenge: "Users needed to complete several product sessions before encountering the paywall. A subscription that arrives that late is one most people never get to judge.",
    investigation: "I benchmarked comparable fitness apps. Social proof was a recurring way those products reinforce the value of a subscription, rather than a substitute for the value itself.",
    solution: "Two changes, made together. I found additional touchpoints so the paywall was encountered more often. On the value proposition already on screen, I introduced the average customer rating and selected testimonials.",
    moves: ["More paywall exposure, at additional touchpoints.", "Average customer rating and selected testimonials, on the existing value proposition."],
    results: ["Paywall conversion doubled following the optimization work."],
    diagram: "exposure",
    image: {
      src: "/assets/perifit-background.jpg",
      alt: "Unlock Perifit Premium, the paywall in the app.",
      caption: "Perifit Premium, in the app.",
      well: "bg-[#071c18]",
    },
    seoTitle: "Perifit paywall optimization case study — Helix Growth",
    seoDescription: "The Perifit paywall was shown at more touchpoints, with social proof added to the value proposition already on screen. Conversion doubled.",
  },
];

export const relatedCases: Record<CaseSlug, { slug: CaseSlug; label: string }[]> = {
  wizz: [
    { slug: "prose", label: "Onboarding conversion" },
    { slug: "perifit", label: "Paywall optimization" },
  ],
  prose: [
    { slug: "wizz", label: "Monetization strategy" },
    { slug: "perifit", label: "Conversion optimization" },
  ],
  perifit: [
    { slug: "wizz", label: "Monetization strategy" },
    { slug: "prose", label: "Onboarding conversion" },
  ],
};

export function caseBySlug(slug: string | undefined) {
  return caseStudies.find((item) => item.slug === slug);
}

export const dimensions = [
  { id: "onboarding", n: "01", title: "Onboarding & activation", line: "How soon a new user reaches something worth returning for." },
  { id: "paywall", n: "02", title: "Paywalls & monetization", line: "What is offered, when it appears, and whether it converts." },
  { id: "retention", n: "03", title: "Retention & engagement", line: "The loop that brings people back." },
  { id: "ux", n: "04", title: "Product UX & conversion", line: "Friction between intent and the action that earns revenue." },
  { id: "subscription", n: "05", title: "Subscription growth", line: "Trials, plans, renewals, and the revenue they produce." },
  { id: "analytics", n: "06", title: "Product analytics & experimentation", line: "Behavior read clearly enough to choose the next test." },
];

export const tools = [
  { id: "amplitude", name: "Amplitude", logo: "", line: "Product analytics, funnels, cohorts, behavioral analysis, and retention." },
  { id: "mixpanel", name: "Mixpanel", logo: "/assets/tools/mixpanel.svg", line: "User engagement, conversion funnels, and product usage." },
  { id: "posthog", name: "PostHog", logo: "/assets/tools/posthog.svg", line: "Product analytics, session replay, feature flags, and experimentation." },
  { id: "revenuecat", name: "RevenueCat", logo: "/assets/tools/revenuecat.svg", line: "Subscription performance, trial conversion, revenue, renewals, and churn." },
];

export const funnel = [
  {
    label: "Install",
    count: "1,000",
    p: 100,
    drop: "",
    note: "1,000 installs is the denominator. A healthy store rate does not mean they wanted the same job.",
  },
  {
    label: "Onboarding",
    count: "640",
    p: 64,
    drop: "360 leave here",
    note: "640 finished the intro. The missing 360 are often the account, a quiz, or a permission.",
  },
  {
    label: "Activation",
    count: "410",
    p: 41,
    drop: "230 never get value",
    note: "410 reached a useful action. If this is thin, the product showed up too late.",
  },
  {
    label: "Paywall",
    count: "260",
    p: 26,
    drop: "150 never see an offer",
    note: "260 saw an offer. A low rate can mean they left, or the offer waited for a moment that never came.",
  },
  {
    label: "Trial",
    count: "80",
    p: 8,
    drop: "180 see it and don't start",
    note: "80 started a trial. A high rate here can still lose money if the trial never delivers.",
  },
  {
    label: "Paid",
    count: "32",
    p: 3.2,
    drop: "48 trials don't pay",
    note: "32 paid, in this illustration. Read it next to refunds and week-one use.",
  },
];

export const lenses = [
  {
    id: "onboarding",
    n: "01",
    title: "Onboarding & activation",
    line: "How soon a new user reaches something worth coming back for.",
    problem: "An account, a quiz, or a permission sits in front of the first useful action.",
    lever: "A result before the account, when the product can make one. Keep a question only if it changes that result.",
    measure: "Completion, a named activation, and install to paywall. Completion up and activation flat is a shorter tour.",
  },
  {
    id: "paywall",
    n: "02",
    title: "Paywalls & monetization",
    line: "What is sold, when it appears, and whether the trial keeps the promise.",
    problem: "Trials start and payments don't. Or the offer waits for a moment that never comes.",
    lever: "One primary plan. A trial long enough for one loop. The price stays visible.",
    measure: "Paywall view, trial start, trial-to-paid, revenue per install, refunds, and plan mix. Together.",
  },
  {
    id: "retention",
    n: "03",
    title: "Retention & engagement",
    line: "The reason to come back, and the reason to cancel.",
    problem: "A daily nudge teaches people to ignore you. Or they cancel because the paid thing never happened.",
    lever: "One loop they can repeat. A push tied to that loop. Cancel reasons before any coupon.",
    measure: "D1, D7, and D30 of the core action. Opens are not retention.",
  },
  {
    id: "ux",
    n: "04",
    title: "Product UX & conversion",
    line: "The steps between intent and the action that earns money.",
    problem: "A premium feature is real, and almost nobody finds it.",
    lever: "One obvious next action. The paid value is visible before the lock.",
    measure: "Continuation from a named step to a named step.",
  },
  {
    id: "subscription",
    n: "05",
    title: "Subscription growth",
    line: "Trials, plan mix, renewals, and the revenue they actually produce.",
    problem: "A higher trial-start rate can still leave fewer paying users. A forecast can be treated as money already collected.",
    lever: "Read trial-to-paid, refunds, and revenue per install beside any trial-start change. Name the period on ARPU and LTV.",
    measure: "Trial-to-paid, renewal at the real date, revenue per install, plan mix, and refunds.",
  },
  {
    id: "analytics",
    n: "06",
    title: "Product analytics & experimentation",
    line: "What a rate can say, and what it cannot.",
    problem: "The dashboard and the product disagree. Or a test is chosen before the funnel is written down.",
    lever: "One funnel, written down, before a new test. The tool follows the stack the team already trusts.",
    measure: "The metric in the question, plus a guardrail. A trial-start win that loses paid users is not a win.",
  },
];

export type Plan = {
  id: "review" | "sprint" | "advisory";
  name: string;
  kicker: string;
  price: string;
  priceSize: "figure" | "sentence";
  position: string;
  benefits: string[];
  cta: string;
  href: string;
  external: boolean;
  recommended?: boolean;
};

export const plans: Plan[] = [
  {
    id: "review",
    name: "App Growth Review",
    kicker: "One working day",
    price: "$350",
    priceSize: "figure",
    position: "Get an expert perspective on what's holding your app back.",
    benefits: [
      "Understand what's holding your app back.",
      "Identify the most important opportunities.",
      "Get expert recommendations.",
    ],
    cta: "Get your app reviewed",
    href: AUDIT_MAIL,
    external: false,
  },
  {
    id: "sprint",
    name: "Growth Sprint",
    kicker: "Recommended",
    price: "$2,000",
    priceSize: "figure",
    position: "Find your next growth opportunity. Build a strategy to capture it.",
    benefits: [
      "Understand your biggest growth constraints.",
      "Discover opportunities across the user journey.",
      "Prioritize high-impact initiatives.",
      "Establish a clear growth direction.",
    ],
    cta: "Discuss your growth sprint",
    href: CAL_SPRINT,
    external: true,
    recommended: true,
  },
  {
    id: "advisory",
    name: "Growth Advisory",
    kicker: "Monthly",
    price: "Let's discuss your needs.",
    priceSize: "sentence",
    position: "Keep making better growth decisions.",
    benefits: [
      "Get ongoing strategic guidance.",
      "Make better product decisions.",
      "Continuously review and refine growth priorities.",
    ],
    cta: "Talk about advisory",
    href: CAL_ADVISORY,
    external: true,
  },
];

export const outOfScope = [
  "Paid acquisition",
  "Design, code, or tests shipped for you",
  "Analytics instrumentation inside the $350 review",
];

export const fit = [
  { ok: true, line: "An established app with users and revenue, looking for the next stage of growth." },
  { ok: true, line: "An indie or early-stage founder who wants an expert read. The review starts once someone can open a build." },
  { ok: true, line: "A team that wants an external product-growth partner, without hiring a full-time specialist." },
  { ok: false, line: "You want someone to buy users." },
  { ok: false, line: "You want the recommendations built for you." },
];

export const pricingFaqs = [
  {
    q: "What kind of apps do you work with?",
    a: "Mobile apps. The review fits an indie developer or a small app business that wants an outside read before a longer engagement. The sprint fits an app that is already live, has users, and is generating revenue. Advisory fits a founder or product team that wants that read to continue.",
  },
  {
    q: "Do you implement the recommendations?",
    a: "No. The review and the sprint are strategic. We do not build the product, and we do not develop every change we recommend. Your team implements. Advisory is guidance, not a development retainer.",
  },
  {
    q: "What data access is required?",
    a: "A way into the app. Analytics where you already have them. Monetization data when the question is revenue. If a source is missing, we say so. We do not invent the numbers. Setting up a new analytics tool is not part of the $350 review.",
  },
  {
    q: "How long does an engagement take?",
    a: "The App Growth Review takes no more than one working day. The Growth Sprint is about seven days. Advisory continues month to month. The shape of that month is agreed in the conversation. It is not a fixed calendar.",
  },
  {
    q: "Is the Growth Review a full audit?",
    a: "No. It is a focused App Growth Review: the bottlenecks and the opportunities that deserve attention first. It is not a comprehensive technical audit, and it is not an implementation.",
  },
  {
    q: "Can we continue working together?",
    a: "Yes. A review can lead into a sprint. A sprint can lead into advisory. Neither step is required. Each engagement stands on its own.",
  },
  {
    q: "Are results guaranteed?",
    a: "No. A recommendation is a direction to validate, not a promise that revenue will move. We do not guarantee a revenue increase.",
  },
];

export const prepareItems = [
  {
    title: "Business objectives",
    why: "The review should answer the decision in front of you. A revenue goal, a conversion goal, or a retention goal changes which part of the product we open first.",
  },
  {
    title: "Product analytics",
    why: "Funnels and events show what happened. If the stack is thin, we can still walk the product, and we will say which questions the data cannot answer yet.",
  },
  {
    title: "Monetization metrics",
    why: "Trials, paid conversion, price, and renewal keep a screen-level rate honest. A higher completion rate that does not reach revenue is a different problem.",
  },
  {
    title: "Onboarding funnel",
    why: "The steps from first open to the first meaningful action are where a lot of growth is lost, often before anyone sees a paywall.",
  },
  {
    title: "Retention data",
    why: "Cohorts, renewal, and the action people repeat show whether the product has a reason to be opened again. A payment without that reason shows up later as churn.",
  },
  {
    title: "Relevant product access",
    why: "A build, a test account, or a path through the core loop lets us do what a new user does. A dashboard alone cannot show whether a screen is understood.",
  },
  {
    title: "Current growth challenges",
    why: "The question you already have focuses the day. It is a starting point. It is not the conclusion.",
  },
];

export type Step = { t: string; leak?: boolean };

export type Scenario = {
  id: string;
  tab: string;
  title: string;
  lead: string;
  rows: { dt: string; dd: string }[];
  before?: { title: string; steps: Step[] };
  after?: { title: string; steps: Step[] };
  extra?: "causes" | "curve";
};

export const scenarios: Scenario[] = [
  {
    id: "sc-1",
    tab: "Installs, no activation",
    title: "People install. Almost nobody reaches the product.",
    lead: "Separate a bad first session from traffic that wanted a different job.",
    rows: [
      { dt: "What might be happening", dd: "The account, a quiz, or a permission sits in front of the first result." },
      { dt: "What to investigate", dd: "Acquisition intent, screens before the useful action, and whether registration is required first." },
      { dt: "Metrics", dd: "A named activation, onboarding completion, install to paywall, split by source." },
      { dt: "A direction to test", dd: "Show a result, then ask for the account. Keep a question only if it changes that result." },
    ],
    before: {
      title: "A shape that stalls",
      steps: [
        { t: "Account", leak: true },
        { t: "Eight questions", leak: true },
        { t: "Permission", leak: true },
        { t: "The useful thing" },
      ],
    },
    after: {
      title: "A direction to test",
      steps: [
        { t: "One question that changes the result" },
        { t: "The useful thing" },
        { t: "Account, once they want to keep it" },
      ],
    },
  },
  {
    id: "sc-2",
    tab: "Trials, few payments",
    title: "Trials start. Payments don't follow.",
    lead: "Trial start and trial-to-paid answer different questions.",
    rows: [
      { dt: "What might be happening", dd: "The paywall promised a result the trial never delivered, or the trial ended before one loop." },
      { dt: "What to investigate", dd: "Promise against the product, trial length against time to value, and whether the boasted feature is on the path." },
      { dt: "Metrics", dd: "Trial start, trial-to-paid, refunds, and week-one use. Revenue per install keeps the trial chart honest." },
      { dt: "A direction to test", dd: "Make the promised result reachable before the trial ends." },
    ],
    before: {
      title: "What the paywall said",
      steps: [
        { t: "A result in seven days" },
        { t: "A trial of three days", leak: true },
        { t: "The feature lives in settings", leak: true },
      ],
    },
    after: {
      title: "What to line up",
      steps: [
        { t: "The result is reachable inside the trial" },
        { t: "The trial covers one loop" },
        { t: "The boasted feature is on the path" },
      ],
    },
  },
  {
    id: "sc-3",
    tab: "Payments, no habit",
    title: "People pay. They don't come back.",
    lead: "A payment without a habit is a refund waiting for renewal.",
    rows: [
      { dt: "What might be happening", dd: "Day zero converts and day two is empty. Cancels say they didn't use it." },
      { dt: "What to investigate", dd: "The first week of the core action. Whether a loop exists without a notification." },
      { dt: "Metrics", dd: "D1, D7, D30 of the core action. Renewal at the real date. Push opens are not retention." },
      { dt: "A direction to test", dd: "One loop inside the first week. A push tied to that loop. Reasons before a discount." },
    ],
    before: {
      title: "A curve that collects payments",
      steps: [
        { t: "Strong day-zero purchase" },
        { t: "No second session", leak: true },
        { t: "Daily generic push", leak: true },
        { t: "Cancel: didn't use it", leak: true },
      ],
    },
    after: {
      title: "Where the work is",
      steps: [
        { t: "A loop inside the first week" },
        { t: "A push tied to that loop" },
        { t: "Cancel reasons, before any offer to stay" },
      ],
    },
    extra: "curve",
  },
  {
    id: "sc-4",
    tab: "Seen, rarely bought",
    title: "The paywall is seen. Almost nobody buys.",
    lead: "A view is not a decision. These causes do not share a fix.",
    rows: [
      { dt: "Read together", dd: "Paywall view, purchase rate from that view, plan mix, and payment failures. None of them, alone, names the cause." },
    ],
    extra: "causes",
  },
];

export const causes = [
  { label: "Weak value", note: "The screen lists features the person has not felt. Show the value before the lock." },
  { label: "Wrong price", note: "The number doesn't match the value already felt. Read willingness and refunds, not only the sticker." },
  { label: "Offer structure", note: "Annual is the default and the saving is a footnote. Monthly and annual have to compare in money and in time." },
  { label: "Trust", note: "The price appears after the button, or nothing nearby says why this company should hold a card." },
  { label: "Timing", note: "The offer arrives before the product has been useful. Earlier views often mean fewer purchases from that view." },
  { label: "Purchase friction", note: "The purchase fails, asks for a second account, or hides what happens next. A new headline will not touch that." },
];

export const metrics = [
  { id: "store-rate", tab: "Store", title: "Store conversion", body: "Product-page views that become installs. It says nothing about activation." },
  { id: "complete", tab: "Completion", title: "Onboarding completion", body: "People who finish the intro. A jump here with flat activation means you removed screens, not the friction that mattered." },
  { id: "activation", tab: "Activation", title: "Activation", body: "One defined useful action. Name it, or the rate is theater." },
  { id: "paywall-view", tab: "Paywall view", title: "Paywall view rate", body: "People who see an offer. Show it earlier and this rate rises while purchases from the view often fall." },
  { id: "trial", tab: "Trial start", title: "Trial-start rate", body: "The offer was accepted. It is not revenue. Treat a rise as incomplete until trial-to-paid and revenue per install agree." },
  { id: "paid", tab: "Trial to paid", title: "Trial-to-paid", body: "Trials old enough to have been asked to pay. A drop can be the promise, the length, a missing feature, or a failed payment." },
  { id: "rpi", tab: "Per install", title: "Revenue per install", body: "Money after refunds, over installs with the same follow-up. It keeps trial-start from lying." },
  { id: "ltv", tab: "ARPU and LTV", title: "ARPU and LTV", body: "Name the period and the users. A forecast is not money collected. Plan mix moves both without any screen having won." },
  { id: "churn", tab: "Cohorts", title: "Churn and cohorts", body: "Say whether churn is a cancel, an expiry, or silence. Week one and month three are different problems." },
];

export const presets = [
  { id: "a", name: "A", start: 8, pay: 40, line: "8% start · 40% of trials pay" },
  { id: "b", name: "B", start: 10, pay: 30, line: "10% start · 30% of trials pay" },
] as const;

export function trialMath(start: number, pay: number) {
  const trials = Math.round((1000 * start) / 100);
  const paid = Math.round((trials * pay) / 100);
  return { trials, paid };
}
