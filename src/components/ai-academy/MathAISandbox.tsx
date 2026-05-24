/**
 * MathAISandbox — Visual intuition for the math behind AI.
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
  { q: "Gradient Descent là cách AI 'lăn xuống thung lũng' để tìm điểm thấp nhất.", a: true },
  { q: "Learning rate quá lớn có thể khiến AI nhảy vượt qua đáy.", a: true },
  { q: "Xác suất 0% nghĩa là điều đó CHẮC CHẮN xảy ra.", a: false, why: "Ngược lại — 0% là không bao giờ. 100% mới là chắc chắn." },
  { q: "Hồi quy tuyến tính = vẽ 1 đường thẳng khớp nhất với các điểm dữ liệu.", a: true },
  { q: "AI cần Đại số tuyến tính và Xác suất hơn là Hình học.", a: true },
];
const MATH_PAIRS = [
  { a: "Loss function", b: "Hàm đo độ sai của model" },
  { a: "Gradient", b: "Hướng dốc nhất của hàm số" },
  { a: "Learning rate", b: "Bước nhảy mỗi lần cập nhật trọng số" },
  { a: "Bias/Intercept", b: "Hằng số dịch chuyển đường thẳng" },
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
          <text x={minPoint.cx} y={minPoint.cy - 8} fontSize="9" fill="#10B981" textAnchor="middle">Đáy (min)</text>
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
            <div className="opacity-70">x hiện tại</div>
            <div className="font-black text-cyan-200">{x.toFixed(2)}</div>
          </div>
          <div className="rounded bg-cyan-500/20 p-1.5">
            <div className="opacity-70">Loss</div>
            <div className="font-black text-cyan-200">{loss(x).toFixed(2)}</div>
          </div>
          <div className="rounded bg-cyan-500/20 p-1.5">
            <div className="opacity-70">Bước</div>
            <div className="font-black text-cyan-200">{steps}</div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="p-3 rounded-xl border bg-card">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>📍 Điểm xuất phát x</span>
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
            <p className="text-[11px] text-rose-500 mt-1 font-semibold">⚠️ Quá lớn — bóng có thể nhảy vượt đáy!</p>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={run} disabled={running} className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
          <Play className="w-4 h-4 mr-1" /> {running ? "Đang lăn..." : "Bắt đầu lăn xuống"}
        </Button>
        <Button onClick={reset} variant="outline">
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground flex items-start gap-2">
        <TrendingDown className="w-3.5 h-3.5 mt-0.5 text-cyan-500 shrink-0" />
        Đây chính là cách <b>mọi mạng nơ-ron</b> học: tìm hướng giảm "Loss" nhanh nhất, đi từng bước nhỏ. Learning rate quá lớn → nhảy vượt đáy; quá nhỏ → học mãi không xong.
      </p>

      <ChipFilter
        title="🎲 Trực giác Xác suất"
        hint="Chọn các phát biểu ĐÚNG về xác suất để cộng điểm."
        baseline={20}
        positive
        goal={75}
        goodLabel="Bạn đã nắm Xác suất căn bản ✅"
        badLabel="Còn vài câu chưa đúng — đọc lại nhé"
        metricLabel="Điểm Xác suất"
        accent="from-cyan-500 to-blue-600"
        border="border-cyan-400/40"
        options={[
          { id: "1", label: "P(tung xúc xắc ra số 6) = 1/6 ≈ 16.7%", weight: 18 },
          { id: "2", label: "Tung 2 đồng xu: P(cả 2 mặt ngửa) = 1/4 = 25%", weight: 18 },
          { id: "3", label: "P(A và B độc lập) = P(A) × P(B)", weight: 16 },
          { id: "4", label: "❌ Đã tung 5 lần ngửa, lần 6 chắc chắn sấp", weight: -20 },
          { id: "5", label: "❌ Xác suất 50% nghĩa là CHẮC CHẮN một nửa lần xảy ra", weight: -15 },
        ]}
      />

      <BestMatchPick
        title="📈 Hồi quy tuyến tính — chọn đường khớp nhất"
        hint="Với mỗi bộ dữ liệu, đường y = ax + b nào hợp lý nhất?"
        accent="from-cyan-500 to-blue-600"
        border="border-cyan-400/40"
        options={[
          { id: "pos", label: "y = 2x (dốc lên)" },
          { id: "neg", label: "y = -x + 5 (dốc xuống)" },
          { id: "flat", label: "y = 3 (ngang)" },
        ]}
        items={[
          { prompt: "Học càng nhiều → điểm thi càng cao", correctId: "pos" },
          { prompt: "Số giờ chơi game tăng → điểm thi giảm", correctId: "neg" },
          { prompt: "Số bước chân hôm nay không liên quan đến điểm thi", correctId: "flat" },
          { prompt: "Số bài tập làm thêm → điểm cao hơn", correctId: "pos" },
        ]}
      />

      <BonusGames tfItems={MATH_TF} matchPairs={MATH_PAIRS} accent="from-cyan-500 to-blue-600" border="border-cyan-400/40" />
    </div>
  );
};

export default MathAISandbox;
