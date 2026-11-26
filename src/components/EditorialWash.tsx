import { useEffect, useRef } from "react";

/**
 * Pointer-following color field for the editorial look.
 * Hidden unless that look is active, so the current look is unchanged.
 */
export function EditorialWash() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0.72, y: 0.28, tx: 0.72, ty: 0.28 };
    let frame = 0;
    let running = false;

    const onMove = (event: PointerEvent) => {
      pointer.tx = event.clientX / Math.max(window.innerWidth, 1);
      pointer.ty = event.clientY / Math.max(window.innerHeight, 1);
    };

    const draw = (time: number) => {
      if (document.documentElement.dataset.style !== "editorial") return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      const width = Math.floor(w * dpr);
      const height = Math.floor(h * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#f3efe8";
      ctx.fillRect(0, 0, w, h);

      pointer.x += (pointer.tx - pointer.x) * (reduce.matches ? 1 : 0.045);
      pointer.y += (pointer.ty - pointer.y) * (reduce.matches ? 1 : 0.045);
      const drift = reduce.matches ? 0 : time * 0.00015;

      const orbs = [
        {
          cx: w * (0.12 + pointer.x * 0.22),
          cy: h * (0.16 + pointer.y * 0.08),
          r: Math.max(w, h) * 0.46,
          color: "255, 77, 28",
          alpha: 0.34,
        },
        {
          cx: w * (0.86 - pointer.x * 0.16),
          cy: h * (0.58 + Math.sin(drift) * 0.04),
          r: Math.max(w, h) * 0.52,
          color: "62, 109, 136",
          alpha: 0.38,
        },
        {
          cx: w * (0.48 + Math.cos(drift) * 0.08),
          cy: h * (0.9 - pointer.y * 0.1),
          r: Math.max(w, h) * 0.34,
          color: "255, 140, 72",
          alpha: 0.22,
        },
      ];

      for (const orb of orbs) {
        const gradient = ctx.createRadialGradient(orb.cx, orb.cy, 0, orb.cx, orb.cy, orb.r);
        gradient.addColorStop(0, `rgba(${orb.color}, ${orb.alpha})`);
        gradient.addColorStop(0.42, `rgba(${orb.color}, ${orb.alpha * 0.28})`);
        gradient.addColorStop(1, `rgba(${orb.color}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }
    };

    const tick = (time: number) => {
      draw(time);
      if (running) frame = window.requestAnimationFrame(tick);
    };

    const sync = () => {
      const editorial = document.documentElement.dataset.style === "editorial";
      const animate = editorial && !reduce.matches;
      if (animate && !running) {
        running = true;
        frame = window.requestAnimationFrame(tick);
        return;
      }
      if (!animate && running) {
        running = false;
        window.cancelAnimationFrame(frame);
      }
      if (editorial) draw(0);
    };

    sync();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", sync);
    reduce.addEventListener("change", sync);
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-style"] });

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", sync);
      reduce.removeEventListener("change", sync);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="editorial-wash" aria-hidden="true" />;
}
