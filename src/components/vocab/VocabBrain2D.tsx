/**
 * @file VocabBrain2D.tsx
 * @description Canvas-2D fallback for the vocabulary brain, used when WebGL is
 * unavailable. Same decay colours, rotating projection, no three.js.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useRef } from "react";
import { buildScaffold, tierForDays, type BrainNeuron } from "./vocabBrainModel";

interface Props {
  neurons: BrainNeuron[];
  onSelect: (word: string) => void;
  selected: string | null;
}

const VocabBrain2D = ({ neurons, onSelect, selected }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scaffoldRef = useRef<Float32Array>(buildScaffold(900));
  const projected = useRef<{ word: string; sx: number; sy: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let angle = 0;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w, h) / 3;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const list: { word: string; sx: number; sy: number }[] = [];

      // Faint scaffold tissue first.
      const scaffold = scaffoldRef.current;
      ctx.fillStyle = "#60a5fa";
      ctx.globalAlpha = 0.18;
      for (let i = 0; i < scaffold.length; i += 3) {
        const sxx = scaffold[i] * cos - scaffold[i + 2] * sin;
        ctx.beginPath();
        ctx.arc(cx + sxx * scale, cy - scaffold[i + 1] * scale, 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      const sorted = [...neurons].sort((a, b) => (a.x * sin + a.z * cos) - (b.x * sin + b.z * cos));
      sorted.forEach(n => {
        const x = n.x * cos - n.z * sin;
        const z = n.x * sin + n.z * cos;
        const depth = (z + 1.6) / 3.2; // 0 far, 1 near
        const sx = cx + x * scale * (0.9 + depth * 0.2);
        const sy = cy - n.y * scale * (0.9 + depth * 0.2);
        const info = tierForDays(n.days);
        const isSel = selected === n.word;
        const r = (isSel ? 5.5 : 2.4) * info.scale * (0.6 + depth * 0.7);
        ctx.globalAlpha = Math.min(1, (isSel ? 1 : info.alpha) * (0.45 + depth * 0.65));
        ctx.fillStyle = info.color;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
        list.push({ word: n.word, sx, sy });
      });
      ctx.globalAlpha = 1;
      projected.current = list;
      angle += 0.0035;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [neurons, selected]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    let best: string | null = null;
    let bestD = 18 * 18;
    projected.current.forEach(p => {
      const d = (p.sx - px) ** 2 + (p.sy - py) ** 2;
      if (d < bestD) { bestD = d; best = p.word; }
    });
    if (best) onSelect(best);
  };

  return <canvas ref={canvasRef} onClick={handleClick} className="h-full w-full cursor-pointer" />;
};

export default VocabBrain2D;
