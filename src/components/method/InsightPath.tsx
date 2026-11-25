import { Link } from "react-router-dom";

const steps = [
  {
    n: "01",
    title: "Observation",
    body: "Users abandon onboarding at email capture.",
  },
  {
    n: "02",
    title: "Investigation",
    body: "Behavioral analysis shows that users have not yet received enough information to understand the product's value.",
  },
  {
    n: "03",
    title: "Hypothesis",
    body: "Moving email capture later and strengthening reasons to believe could improve conversion.",
  },
  {
    n: "04",
    title: "Action",
    body: "Redesign the sequence and validate it through an A/B test.",
  },
];

export function InsightPath() {
  return (
    <div>
      <ol className="grid gap-4 md:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.n} className="relative border-t-4 border-tide bg-surface p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-tide">
              {step.n}
              {index < steps.length - 1 && <span className="sr-only">, then</span>}
            </p>
            <h3 className="mt-3 font-display text-[1.7rem] leading-none">{step.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed">{step.body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 max-w-3xl text-[16px] leading-relaxed">
        The investigation narrows what to try. It does not prove the redesign will work. A recommendation should be validated, not assumed. The test has to watch the rate that mattered and whether revenue moved with it.
      </p>
      <p className="mt-4 text-[15px]">
        <Link className="underline decoration-ink/30 underline-offset-4" to="/case-studies/prose">
          The Prose case study
        </Link>{" "}
        <span className="text-mute">is a tested onboarding sequence. It is not this fictional funnel.</span>
      </p>
    </div>
  );
}
