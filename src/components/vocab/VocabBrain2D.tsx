/**
 * @file VocabBrain2D.tsx
 * @description Canvas-2D fallback for the vocabulary brain, used when WebGL is
 * unavailable. Same decay colours, rotating projection and word labels, no three.js.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useRef } from "react";
import { buildScaffold, pickLabelCandidates, tierForDays, type BrainNeuron, type LabelCandidate } from "./vocabBrainModel";

interface Props {
  neurons: BrainNeuron[];
  onSelect: (word: string) => void;
  selected: string | null;
  showLabels?: boolean;
  density?: "low" | "medium" | "high" | "all";
  paused?: boolean;
  focusWord?: string | null;
  /** Consolidation replay progress (0 = surface, 1 = real depth, null = off). */
  replay?: number | null;
}

const DENSITY_LIMIT = { low: 26, medium: 55, high: 110, all: 100000 } as const;


const VocabBrain2D = ({
  neurons,
  onSelect,
  selected,
  showLabels = true,
  density = "medium",
  paused = false,
  focusWord = null,
  replay = null,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scaffoldRef = useRef<Float32Array>(buildScaffold(1600));
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

      // Faint scaffold tissue first (two layers for a solid volume feel).
      const scaffold = scaffoldRef.current;
      for (const [radius, alpha, dot, tint] of [[1, 0.28, 1, "#bfdbfe"], [0.8, 0.14, 0.8, "#60a5fa"]] as const) {
        ctx.fillStyle = tint;
        ctx.globalAlpha = alpha;
        for (let i = 0; i < scaffold.length; i += 3) {
          const sxx = (scaffold[i] * cos - scaffold[i + 2] * sin) * radius;
          ctx.beginPath();
          ctx.arc(cx + sxx * scale, cy - scaffold[i + 1] * radius * scale, dot, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;


      const k = replay === null ? 1 : Math.max(0, Math.min(1, replay));
      const placed = neurons.map(n => ({
        ...n,
        x: n.sx + (n.x - n.sx) * k,
        y: n.sy + (n.y - n.sy) * k,
        z: n.sz + (n.z - n.sz) * k,
      }));
      const sorted = [...placed].sort((a, b) => (a.x * sin + a.z * cos) - (b.x * sin + b.z * cos));
      const candidates: LabelCandidate[] = [];
      sorted.forEach(n => {
        const x = n.x * cos - n.z * sin;
        const z = n.x * sin + n.z * cos;
        const depth = (z + 1.6) / 3.2; // 0 far, 1 near
        const sx = cx + x * scale * (0.9 + depth * 0.2);
        const sy = cy - n.y * scale * (0.9 + depth * 0.2);
        const info = tierForDays(n.days, n.known);
        const isSel =
          selected?.toLowerCase() === n.word.toLowerCase() ||
          focusWord?.toLowerCase() === n.word.toLowerCase();
        const r = (isSel ? 5.5 : 2.4) * info.scale * (0.6 + depth * 0.7);
        ctx.globalAlpha = Math.min(1, (isSel ? 1 : info.alpha) * (0.45 + depth * 0.65));
        ctx.fillStyle = info.color;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
        list.push({ word: n.word, sx, sy });
        candidates.push({ neuron: n, sx, sy, facing: depth * 2 - 0.6 });
      });
      ctx.globalAlpha = 1;

      if (showLabels) {
        const forced = [selected, focusWord].filter((v): v is string => !!v);
        const minDist = density === "all" ? 26 : density === "high" ? 32 : 44;
        const labels = pickLabelCandidates(candidates, DENSITY_LIMIT[density], minDist, forced, -0.8);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        labels.forEach(({ neuron, sx, sy, facing }) => {
          const info = tierForDays(neuron.days, neuron.known);
          const isKey =
            selected?.toLowerCase() === neuron.word.toLowerCase() ||
            focusWord?.toLowerCase() === neuron.word.toLowerCase();
          ctx.font = `${isKey ? 700 : 600} ${isKey ? 15 : 12}px ui-sans-serif, system-ui, sans-serif`;
          ctx.lineWidth = 3;
          ctx.strokeStyle = "rgba(2,6,23,0.9)";
          ctx.globalAlpha = isKey ? 1 : facing < 0.05 ? 0.4 : 0.95;
          ctx.strokeText(neuron.word, sx, sy - 11);
          ctx.fillStyle = isKey ? "#ffffff" : info.labelInk;
          ctx.fillText(neuron.word, sx, sy - 11);
        });
        ctx.globalAlpha = 1;

      }

      projected.current = list;
      if (!paused) angle += 0.0035;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [neurons, selected, showLabels, density, paused, focusWord, replay]);

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
