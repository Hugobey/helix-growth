import { useEffect, useRef } from "react";

const XS = [0.88, 0.72, 0.56, 0.42, 0.28, 0.16];
const YS = [0.16, 0.3, 0.44, 0.58, 0.72, 0.86];
const PAYWALL = 3;

type Pointer = { x: number; y: number; tx: number; ty: number };

function paint(ctx: CanvasRenderingContext2D, w: number, h: number, pointer: Pointer) {
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(15, 23, 42, 0.08)";
  ctx.lineWidth = 1;
  for (let i = 1; i < 4; i++) {
    const y = (h * i) / 4;
    ctx.beginPath();
    ctx.moveTo(24, y);
    ctx.lineTo(w - 16, y);
    ctx.stroke();
  }

  const shiftX = pointer.x * 14;
  const shiftY = pointer.y * 8;
  const points = XS.map((x, i) => ({
    x: 28 + x * (w - 56) + shiftX * (i / 5),
    y: YS[i] * (h - 24) + 8 + shiftY,
  }));

  ctx.beginPath();
  ctx.strokeStyle = "#0F172A";
  points.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
  ctx.stroke();

  points.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, i === PAYWALL ? 5 : 2.4, 0, Math.PI * 2);
    ctx.fillStyle = i === PAYWALL ? "#F97316" : "#0F172A";
    ctx.fill();
  });
}

export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer: Pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let frame = 0;
    let alive = true;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      paint(ctx, rect.width, rect.height, pointer);
    };

    const loop = () => {
      if (!alive) return;
      frame = 0;
      if (!visible || document.hidden) return;
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      draw();
      if (Math.abs(pointer.tx - pointer.x) > 0.002 || Math.abs(pointer.ty - pointer.y) > 0.002) {
        frame = requestAnimationFrame(loop);
      }
    };

    const kick = () => {
      if (!reduce && visible && !frame) frame = requestAnimationFrame(loop);
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      if (reduce) draw();
      else kick();
    };

    const onLeave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
      if (reduce) {
        pointer.x = 0;
        pointer.y = 0;
        draw();
      } else kick();
    };

    resize();
    draw();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    observer.observe(canvas);

    const onResize = () => {
      resize();
      draw();
    };
    window.addEventListener("resize", onResize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      alive = false;
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="h-[280px] w-full md:h-[min(52vh,420px)]"
      aria-hidden="true"
    />
  );
}
