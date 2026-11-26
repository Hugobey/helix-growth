import { useEffect, useState } from "react";
import { applySiteStyle, parseStyle, type SiteStyle } from "../lib/style";

const options: { id: SiteStyle; label: string }[] = [
  { id: "current", label: "Current" },
  { id: "editorial", label: "Editorial" },
];

export function StyleSwitch() {
  const [style, setStyle] = useState<SiteStyle>("current");

  useEffect(() => {
    setStyle(parseStyle(document.documentElement.dataset.style ?? null) ?? "current");
  }, []);

  const choose = (next: SiteStyle) => {
    applySiteStyle(next);
    setStyle(next);
  };

  return (
    <div className="style-switch" role="group" aria-label="Compare looks">
      <span className="style-switch-label">Look</span>
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={style === option.id}
          onClick={() => choose(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
