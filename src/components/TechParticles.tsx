import { useEffect, useRef } from "react";

const SYMBOLS = ["</>", "{}", "AI", "α", "π", "中", "Suomi", "EN", "ML", "λ", "∑", "Σ"];

/**
 * Subtle canvas-based EduTech particles: floating code/AI/language symbols.
 * Desktop-only. Respects prefers-reduced-motion.
 */
const TechParticles = ({ count = 22, className = "" }: { count?: number; className?: string }) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 1024) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    type P = { x: number; y: number; vx: number; vy: number; s: number; sym: string; a: number };
    const parts: P[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -0.05 - Math.random() * 0.15,
      s: 11 + Math.random() * 9,
      sym: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      a: 0.08 + Math.random() * 0.1,
    }));

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.font = "500 14px 'JetBrains Mono', monospace";
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -20) { p.y = h + 20; p.x = Math.random() * w; }
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        ctx.fillStyle = `hsla(173, 58%, 50%, ${p.a})`;
        ctx.font = `500 ${p.s}px 'JetBrains Mono', monospace`;
        ctx.fillText(p.sym, p.x, p.y);
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [count]);

  return (
    <canvas
      ref={ref}
      className={`pointer-events-none absolute inset-0 hidden h-full w-full lg:block ${className}`}
      aria-hidden
    />
  );
};

export default TechParticles;
