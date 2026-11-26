import { useEffect, useRef } from "react";

type Pointer = { x: number; y: number; tx: number; ty: number };

function wave(offset: number) {
  let d = "";
  for (let i = 0; i <= 40; i++) {
    const u = i / 40;
    const x = u * 640;
    const y = 70 + Math.sin(u * Math.PI * 4 + offset) * 36;
    d += `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return d;
}

const STRAND_A = wave(0);
const STRAND_B = wave(Math.PI);

function paint(ctx: CanvasRenderingContext2D, w: number, h: number, time: number, pointer: Pointer) {
  ctx.clearRect(0, 0, w, h);
  const gx = w * (0.58 + pointer.x * 0.12);
  const gy = h * (0.46 + pointer.y * 0.1);
  const glow = ctx.createRadialGradient(gx, gy, 8, gx, gy, Math.max(w, h) * 0.62);
  glow.addColorStop(0, "rgba(255, 77, 28, 0.18)");
  glow.addColorStop(0.42, "rgba(62, 109, 136, 0.07)");
  glow.addColorStop(1, "rgba(243, 238, 230, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  const amp = Math.min(h * 0.3, 128);
  const mid = h * 0.52 + pointer.y * 12;
  const phase = time * 0.45 + pointer.x * 0.5;
  const steps = 64;
  const left = 4;
  const span = w - 8;

  const a: { x: number; y: number; z: number }[] = [];
  const b: { x: number; y: number; z: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const u = i / steps;
    const ang = u * Math.PI * 2 * 2.15 + phase;
    const x = left + u * span;
    a.push({ x, y: mid + Math.sin(ang) * amp, z: Math.cos(ang) });
    b.push({ x, y: mid + Math.sin(ang + Math.PI) * amp, z: Math.cos(ang + Math.PI) });
  }

  const segment = (p0: (typeof a)[0], p1: (typeof a)[0], front: boolean) => {
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.strokeStyle = front ? "rgba(28, 25, 22, 0.92)" : "rgba(28, 25, 22, 0.22)";
    ctx.lineWidth = front ? 1.8 : 1.1;
    ctx.stroke();
  };

  for (let i = 0; i < steps; i++) {
    if (a[i].z <= 0) segment(a[i], a[i + 1], false);
    if (b[i].z <= 0) segment(b[i], b[i + 1], false);
    if (i % 4 === 0) {
      ctx.beginPath();
      ctx.moveTo(a[i].x, a[i].y);
      ctx.lineTo(b[i].x, b[i].y);
      ctx.strokeStyle = `rgba(62, 109, 136, ${0.15 + Math.abs(a[i].z) * 0.35})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
  for (let i = 0; i < steps; i++) {
    if (a[i].z > 0) segment(a[i], a[i + 1], true);
    if (b[i].z > 0) segment(b[i], b[i + 1], true);
  }

  for (let i = 0; i <= steps; i += 8) {
    const p = a[i].z >= b[i].z ? a[i] : b[i];
    const coral = i % 16 === 8;
    ctx.beginPath();
    ctx.arc(p.x, p.y, coral ? 4.4 : 2.5, 0, Math.PI * 2);
    ctx.fillStyle = coral ? "#FF4D1C" : "#1C1916";
    ctx.fill();
  }
}

export function HelixField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer: Pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let alive = true;
    let visible = true;
    let frame = 0;
    let time = 1.1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      paint(ctx, rect.width, rect.height, time, pointer);
    };

    const loop = (now: number) => {
      if (!alive) return;
      frame = 0;
      if (!visible || document.hidden) return;
      if (!reduce) time = now / 1000;
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      draw();
      if (!reduce) frame = requestAnimationFrame(loop);
    };

    const kick = () => {
      if (!frame && alive && visible && !document.hidden && !reduce) frame = requestAnimationFrame(loop);
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.ty = (event.clientY - rect.top) / rect.height - 0.5;
      if (reduce) draw();
    };

    const onLeave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
      if (reduce) draw();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
      else if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });

    const onVis = () => {
      if (document.hidden && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else kick();
    };

    resize();
    draw();
    kick();
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      alive = false;
      if (frame) cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className={`decor block h-full w-full ${className}`} aria-hidden="true" />;
}

export function HelixMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 140" className={`decor ${className}`} aria-hidden="true">
      <path className="strand" d={STRAND_A} fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path className="strand" d={STRAND_B} fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.38" />
      <circle className="glyph-node" cx="320" cy="70" r="4" fill="#FF4D1C" />
      <circle cx="160" cy="70" r="2.4" fill="#3E6D88" />
      <circle cx="480" cy="70" r="2.4" fill="currentColor" />
    </svg>
  );
}

export function useHelixWash<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const move = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      node.style.setProperty("--hx", `${x.toFixed(1)}%`);
      node.style.setProperty("--hy", `${y.toFixed(1)}%`);
    };
    const leave = () => {
      node.style.removeProperty("--hx");
      node.style.removeProperty("--hy");
    };
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", leave);
    return () => {
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", leave);
    };
  }, []);

  return ref;
}

export function StrandField({ tone = "light" }: { tone?: "light" | "dark" }) {
  const ink = tone === "dark" ? "text-foam/25" : "text-tide/35";
  return (
    <div className="decor pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg className={`absolute -left-[12%] top-[8%] h-[46%] w-[78%] ${ink}`} viewBox="0 0 800 240" fill="none">
        <path className="strand" d="M0 120C150 16 250 16 400 120s250 104 400 0" stroke="currentColor" strokeWidth="1.25" />
        <path className="strand" d="M0 120C150 224 250 224 400 120S650 16 800 120" stroke="currentColor" strokeWidth="1.25" opacity="0.55" />
        <circle cx="400" cy="120" r="3.2" fill="#FF4D1C" />
        <circle cx="168" cy="78" r="2" fill="currentColor" />
        <circle cx="632" cy="162" r="2" fill="currentColor" />
      </svg>
      <div className={tone === "dark" ? "node-field-dark absolute inset-0" : "node-field absolute inset-0"} />
    </div>
  );
}
