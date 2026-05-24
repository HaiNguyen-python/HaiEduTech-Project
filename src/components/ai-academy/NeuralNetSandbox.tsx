/**
 * NeuralNetSandbox
 * 2-input → 1-output toy "neural network" that predicts a mock exam score
 * from (studying hours, sleeping hours). The connection lines glow brighter
 * as weights — derived from input — grow.
 */
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { BonusGames } from "./SandboxBonusGames";
import { BestMatchPick } from "./SandboxMiniActivity";

const NN_TF = [
  { q: "Não AI mô phỏng các tế bào thần kinh gọi là neuron.", a: true },
  { q: "AI 'học' bằng cách điều chỉnh hàng triệu trọng số.", a: true },
  { q: "Mỗi neuron có cảm xúc giống con người.", a: false, why: "Neuron chỉ là phép toán: input × weight + bias." },
  { q: "Càng nhiều dữ liệu huấn luyện, AI càng dự đoán chuẩn hơn.", a: true },
  { q: "Mạng neuron sâu (Deep Learning) chỉ có 1 lớp ẩn.", a: false, why: "'Sâu' = nhiều lớp ẩn xếp chồng (có khi hàng trăm)." },
];
const NN_PAIRS = [
  { a: "Weight (trọng số)", b: "Con số gắn vào mỗi đường nối" },
  { a: "Activation", b: "Hàm 'bật / tắt' tín hiệu của neuron" },
  { a: "Backpropagation", b: "Cách AI sửa trọng số khi sai" },
  { a: "Epoch", b: "1 lần học hết toàn bộ dữ liệu" },
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
          <div className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">Dự đoán điểm thi</div>
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
            <span>📚 Giờ học / ngày</span>
            <span className="font-bold text-emerald-600">{study}h</span>
          </div>
          <Slider value={[study]} min={0} max={10} step={0.5} onValueChange={(v) => setStudy(v[0])} />
        </div>
        <div className="p-3 rounded-xl border bg-card">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>😴 Giờ ngủ / ngày</span>
            <span className="font-bold text-cyan-600">{sleep}h</span>
          </div>
          <Slider value={[sleep]} min={3} max={12} step={0.5} onValueChange={(v) => setSleep(v[0])} />
        </div>
      </div>

      <p className="text-xs text-muted-foreground flex items-start gap-2">
        <Brain className="w-3.5 h-3.5 mt-0.5 text-emerald-500 shrink-0" />
        Đường nối sáng hơn = "trọng số" lớn hơn. Não AI thật học hàng triệu trọng số như vậy để dự đoán mọi thứ — từ điểm thi đến giá nhà.
      </p>

      <BestMatchPick
        title="🎯 Đoán đầu ra của Neural Net"
        hint="Với mỗi tình huống đầu vào, chọn xem mạng neuron sẽ dự đoán kết quả nào hợp lý nhất."
        accent="from-emerald-500 to-teal-600"
        border="border-emerald-400/40"
        options={[
          { id: "low", label: "Điểm thấp 📉" },
          { id: "mid", label: "Điểm trung bình 😐" },
          { id: "high", label: "Điểm cao 🚀" },
        ]}
        items={[
          { prompt: "Học 8h/ngày · Ngủ 8h/ngày", correctId: "high" },
          { prompt: "Học 0h/ngày · Ngủ 12h/ngày", correctId: "low" },
          { prompt: "Học 3h/ngày · Ngủ 4h/ngày (thiếu ngủ)", correctId: "mid" },
          { prompt: "Học 6h/ngày · Ngủ 7h/ngày", correctId: "high" },
        ]}
      />

      <BonusGames tfItems={NN_TF} matchPairs={NN_PAIRS} accent="from-emerald-500 to-teal-600" border="border-emerald-400/40" />
    </div>
  );
};

export default NeuralNetSandbox;
