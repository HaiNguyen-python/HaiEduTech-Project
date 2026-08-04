/**
 * NeuralNetSandbox
 * 2-input → 1-output toy "neural network" that predicts a mock exam score
 * from (studying hours, sleeping hours). The connection lines glow brighter
 * as weights - derived from input - grow.
 */
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { BonusGames } from "./SandboxBonusGames";
import { BestMatchPick } from "./SandboxMiniActivity";

const NN_TF = [
  { q: "AI brains simulate nerve cells called neurons.", a: true },
  { q: "AI 'learns' by adjusting millions of weights.", a: true },
  { q: "Each neuron has human-like emotions.", a: false, why: "A neuron is just math: input times weight plus bias." },
  { q: "More training data usually makes AI predictions more accurate.", a: true },
  { q: "A deep neural network (Deep Learning) has only 1 hidden layer.", a: false, why: "'Deep' means many stacked hidden layers - sometimes hundreds." },
];
const NN_PAIRS = [
  { a: "Weight", b: "The number attached to each connection" },
  { a: "Activation", b: "The 'on/off' function of a neuron's signal" },
  { a: "Backpropagation", b: "How AI corrects its weights after a mistake" },
  { a: "Epoch", b: "One full pass through all the training data" },
];

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

const NeuralNetSandbox = () => {
  const [study, setStudy] = useState(3);
  const [sleep, setSleep] = useState(7);

  // Toy "weights" derived from raw inputs (normalized 0..1)
  const wStudy = clamp(study / 8, 0, 1);
  const wSleep = clamp(1 - Math.abs(sleep - 8) / 8, 0, 1); // 8h sleep is ideal

  // Hidden layer activations (sigmoid-like, deterministic)
  const h1 = clamp(0.6 * wStudy + 0.4 * wSleep, 0, 1);
  const h2 = clamp(0.8 * wStudy + 0.2 * wSleep, 0, 1);
  const h3 = clamp(0.3 * wStudy + 0.7 * wSleep, 0, 1);

  // Output score 0–10
  const score = useMemo(() => {
    const raw = (h1 * 0.4 + h2 * 0.35 + h3 * 0.25) * 10;
    return Math.round(raw * 10) / 10;
  }, [h1, h2, h3]);

  const Line = ({ x1, y1, x2, y2, w }: { x1: number; y1: number; x2: number; y2: number; w: number }) => (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={`hsl(${180 + w * 100} 90% 60%)`}
      strokeWidth={1 + w * 3}
      strokeOpacity={0.3 + w * 0.7}
      style={{ filter: `drop-shadow(0 0 ${w * 6}px hsl(${180 + w * 100} 90% 60%))` }}
    />
  );

  const Node = ({ cx, cy, label, intensity }: { cx: number; cy: number; label: string; intensity: number }) => (
    <g>
      <circle
        cx={cx} cy={cy} r={18}
        fill={`hsl(${180 + intensity * 100} 90% ${30 + intensity * 30}%)`}
        style={{ filter: `drop-shadow(0 0 ${intensity * 10}px hsl(${180 + intensity * 100} 90% 60%))` }}
      />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">
        {label}
      </text>
    </g>
  );

  return (
    <div className="space-y-3 sm:space-y-4 [&>*+*]:pt-3 sm:[&>*+*]:pt-4 [&>*+*]:border-t [&>*+*]:border-border/40">
      <div className="rounded-2xl border-2 border-emerald-400/40 bg-gradient-to-br from-slate-900 to-emerald-950/60 p-4">
        <svg viewBox="0 0 400 220" className="w-full h-48">
          {/* connections input → hidden */}
          <Line x1={50} y1={70} x2={200} y2={50} w={wStudy} />
          <Line x1={50} y1={70} x2={200} y2={110} w={wStudy} />
          <Line x1={50} y1={70} x2={200} y2={170} w={wStudy * 0.7} />
          <Line x1={50} y1={150} x2={200} y2={50} w={wSleep * 0.6} />
          <Line x1={50} y1={150} x2={200} y2={110} w={wSleep} />
          <Line x1={50} y1={150} x2={200} y2={170} w={wSleep} />
          {/* hidden → output */}
          <Line x1={200} y1={50} x2={350} y2={110} w={h1} />
          <Line x1={200} y1={110} x2={350} y2={110} w={h2} />
          <Line x1={200} y1={170} x2={350} y2={110} w={h3} />

          <Node cx={50} cy={70} label="📚" intensity={wStudy} />
          <Node cx={50} cy={150} label="😴" intensity={wSleep} />
          <Node cx={200} cy={50} label="H1" intensity={h1} />
          <Node cx={200} cy={110} label="H2" intensity={h2} />
          <Node cx={200} cy={170} label="H3" intensity={h3} />
          <Node cx={350} cy={110} label="🎯" intensity={score / 10} />
        </svg>

        <div className="text-center mt-2">
          <div className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">Predicted Exam Score</div>
          <motion.div
            key={score}
            initial={{ scale: 0.9, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-display font-black bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent"
          >
            {score.toFixed(1)} / 10
          </motion.div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="p-3 rounded-xl border bg-card">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>📚 Study Hours / Day</span>
            <span className="font-bold text-emerald-600">{study}h</span>
          </div>
          <Slider value={[study]} min={0} max={10} step={0.5} onValueChange={(v) => setStudy(v[0])} />
        </div>
        <div className="p-3 rounded-xl border bg-card">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>😴 Sleep Hours / Day</span>
            <span className="font-bold text-cyan-600">{sleep}h</span>
          </div>
          <Slider value={[sleep]} min={3} max={12} step={0.5} onValueChange={(v) => setSleep(v[0])} />
        </div>
      </div>

      <p className="text-xs text-muted-foreground flex items-start gap-2">
        <Brain className="w-3.5 h-3.5 mt-0.5 text-emerald-500 shrink-0" />
        A brighter connection means a bigger "weight". Real AI brains learn millions of weights like this to predict everything - from exam scores to house prices.
      </p>

      <BestMatchPick
        title="🎯 Guess the Neural Net Output"
        hint="For each input scenario, pick the most reasonable prediction the network would make."
        accent="from-emerald-500 to-teal-600"
        border="border-emerald-400/40"
        options={[
          { id: "low", label: "Low score 📉" },
          { id: "mid", label: "Average score 😐" },
          { id: "high", label: "High score 🚀" },
        ]}
        items={[
          { prompt: "Studies 8h/day - Sleeps 8h/day", correctId: "high" },
          { prompt: "Studies 0h/day - Sleeps 12h/day", correctId: "low" },
          { prompt: "Studies 3h/day - Sleeps 4h/day (sleep-deprived)", correctId: "mid" },
          { prompt: "Studies 6h/day - Sleeps 7h/day", correctId: "high" },
        ]}
      />

      <BonusGames tfItems={NN_TF} matchPairs={NN_PAIRS} accent="from-emerald-500 to-teal-600" border="border-emerald-400/40" />
    </div>
  );
};

export default NeuralNetSandbox;
