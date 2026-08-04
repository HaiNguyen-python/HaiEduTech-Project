/**
 * MathAISandbox - Visual intuition for the math behind AI.
 * Students play with a Gradient Descent ball rolling down a U-shaped loss curve,
 * then practice probability & linear-regression intuition.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sigma, Play, RotateCcw, TrendingDown } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { BonusGames } from "./SandboxBonusGames";
import { ChipFilter, BestMatchPick } from "./SandboxMiniActivity";

const MATH_TF = [
  { q: "Gradient Descent is how AI 'rolls down the valley' to find the lowest point.", a: true },
  { q: "A learning rate that's too large can make the AI overshoot the bottom.", a: true },
  { q: "A probability of 0% means the event is CERTAIN to happen.", a: false, why: "It's the opposite - 0% means never. 100% means certain." },
  { q: "Linear regression = drawing the straight line that best fits the data points.", a: true },
  { q: "AI relies more on linear algebra and probability than on geometry.", a: true },
];
const MATH_PAIRS = [
  { a: "Loss function", b: "Measures how wrong the model's predictions are" },
  { a: "Gradient", b: "The steepest direction of a function" },
  { a: "Learning rate", b: "The step size taken each time weights update" },
  { a: "Bias/Intercept", b: "The constant that shifts the line up or down" },
];

const MathAISandbox = () => {
  // Gradient descent on f(x) = (x - 3)^2
  const [x, setX] = useState(-4);
  const [lr, setLr] = useState(0.15);
  const [steps, setSteps] = useState(0);
  const [running, setRunning] = useState(false);
  const stopRef = useRef(false);

  const loss = (xv: number) => (xv - 3) * (xv - 3);
  const grad = (xv: number) => 2 * (xv - 3);

  const reset = () => {
    stopRef.current = true;
    setX(-4);
    setSteps(0);
    setRunning(false);
  };

  const run = async () => {
    if (running) return;
    setRunning(true);
    stopRef.current = false;
    let cur = x;
    for (let i = 0; i < 40 && !stopRef.current; i++) {
      const next = cur - lr * grad(cur);
      cur = next;
      setX(next);
      setSteps((s) => s + 1);
      await new Promise((r) => setTimeout(r, 90));
      if (Math.abs(grad(cur)) < 0.01) break;
    }
    setRunning(false);
  };

  // SVG plot of parabola
  const points = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    for (let xv = -6; xv <= 6; xv += 0.25) pts.push({ x: xv, y: loss(xv) });
    return pts;
  }, []);
  const toSvg = (xv: number, yv: number) => ({ cx: 30 + (xv + 6) * 28, cy: 180 - Math.min(yv, 80) * 2 });
  const path = points.map((p, i) => {
    const c = toSvg(p.x, p.y);
    return `${i === 0 ? "M" : "L"} ${c.cx} ${c.cy}`;
  }).join(" ");
  const ball = toSvg(x, loss(x));
  const minPoint = toSvg(3, 0);

  return (
    <div className="space-y-3 sm:space-y-4 [&>*+*]:pt-3 sm:[&>*+*]:pt-4 [&>*+*]:border-t [&>*+*]:border-border/40">
      <div className="rounded-2xl border-2 border-cyan-400/40 bg-gradient-to-br from-slate-900 to-cyan-950/60 p-4">
        <div className="text-[11px] uppercase tracking-wider text-cyan-300 font-bold mb-2 flex items-center gap-1">
          <Sigma className="w-3.5 h-3.5" /> Gradient Descent · f(x) = (x − 3)²
        </div>
        <svg viewBox="0 0 400 200" className="w-full h-44">
          <path d={path} stroke="hsl(180 90% 60%)" strokeWidth={2.5} fill="none" opacity={0.85} />
          {/* axes */}
          <line x1={30} y1={180} x2={390} y2={180} stroke="hsl(180 60% 80% / 0.3)" />
          <line x1={30} y1={20} x2={30} y2={180} stroke="hsl(180 60% 80% / 0.3)" />
          {/* min marker */}
          <circle cx={minPoint.cx} cy={minPoint.cy} r={5} fill="#10B981" />
          <text x={minPoint.cx} y={minPoint.cy - 8} fontSize="9" fill="#10B981" textAnchor="middle">Minimum</text>
          {/* ball */}
          <motion.circle
            cx={ball.cx} cy={ball.cy} r={9}
            fill="#FACC15"
            style={{ filter: "drop-shadow(0 0 6px #FACC15)" }}
            animate={{ cx: ball.cx, cy: ball.cy }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
          />
        </svg>
        <div className="grid grid-cols-3 gap-2 mt-2 text-center text-[11px]">
          <div className="rounded bg-cyan-500/20 p-1.5">
            <div className="opacity-70">Current x</div>
            <div className="font-black text-cyan-200">{x.toFixed(2)}</div>
          </div>
          <div className="rounded bg-cyan-500/20 p-1.5">
            <div className="opacity-70">Loss</div>
            <div className="font-black text-cyan-200">{loss(x).toFixed(2)}</div>
          </div>
          <div className="rounded bg-cyan-500/20 p-1.5">
            <div className="opacity-70">Step</div>
            <div className="font-black text-cyan-200">{steps}</div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="p-3 rounded-xl border bg-card">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>📍 Starting point x</span>
            <span className="font-bold text-cyan-600">{x.toFixed(1)}</span>
          </div>
          <Slider value={[x]} min={-6} max={6} step={0.5} onValueChange={(v) => { setX(v[0]); setSteps(0); }} />
        </div>
        <div className="p-3 rounded-xl border bg-card">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>⚡ Learning rate</span>
            <span className="font-bold text-cyan-600">{lr.toFixed(2)}</span>
          </div>
          <Slider value={[lr]} min={0.02} max={1.05} step={0.02} onValueChange={(v) => setLr(v[0])} />
          {lr > 0.9 && (
            <p className="text-[11px] text-rose-500 mt-1 font-semibold">⚠️ Too large - the ball may overshoot the minimum!</p>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={run} disabled={running} className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
          <Play className="w-4 h-4 mr-1" /> {running ? "Rolling..." : "Start rolling down"}
        </Button>
        <Button onClick={reset} variant="outline">
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground flex items-start gap-2">
        <TrendingDown className="w-3.5 h-3.5 mt-0.5 text-cyan-500 shrink-0" />
        This is exactly how <b>every neural network</b> learns: find the fastest direction to reduce "Loss" and take small steps. A learning rate too large overshoots the minimum; too small takes forever to converge.
      </p>

      <ChipFilter
        title="🎲 Probability Intuition"
        hint="Pick the statements that are TRUE about probability to score points."
        baseline={20}
        positive
        goal={75}
        goodLabel="You've nailed basic probability ✅"
        badLabel="A few answers are off - review and try again"
        metricLabel="Probability Score"
        accent="from-cyan-500 to-blue-600"
        border="border-cyan-400/40"
        options={[
          { id: "1", label: "P(rolling a 6 on a die) = 1/6 ≈ 16.7%", weight: 18 },
          { id: "2", label: "Flip 2 coins: P(both heads) = 1/4 = 25%", weight: 18 },
          { id: "3", label: "P(A and B, independent) = P(A) × P(B)", weight: 16 },
          { id: "4", label: "❌ After 5 heads in a row, the 6th flip must be tails", weight: -20 },
          { id: "5", label: "❌ A 50% probability means it's CERTAIN to happen half the time", weight: -15 },
        ]}
      />

      <BestMatchPick
        title="📈 Linear regression - pick the best-fit line"
        hint="For each dataset, which line y = ax + b makes the most sense?"
        accent="from-cyan-500 to-blue-600"
        border="border-cyan-400/40"
        options={[
          { id: "pos", label: "y = 2x (sloping up)" },
          { id: "neg", label: "y = -x + 5 (sloping down)" },
          { id: "flat", label: "y = 3 (flat)" },
        ]}
        items={[
          { prompt: "More study hours -> higher exam score", correctId: "pos" },
          { prompt: "More hours gaming -> lower exam score", correctId: "neg" },
          { prompt: "Today's step count has nothing to do with exam score", correctId: "flat" },
          { prompt: "More practice problems solved -> higher score", correctId: "pos" },
        ]}
      />

      <BonusGames tfItems={MATH_TF} matchPairs={MATH_PAIRS} accent="from-cyan-500 to-blue-600" border="border-cyan-400/40" />
    </div>
  );
};

export default MathAISandbox;
