/**
 * MLMagicSandbox
 * Two tabs:
 *  1) Decision Tree — answer Yes/No to classify a fruit (Supervised).
 *  2) K-Means — slider K=2..4 groups 20 colored dots on canvas (Unsupervised).
 */
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TreePine, Sparkles, RotateCcw, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { BonusGames } from "./SandboxBonusGames";
import { BestMatchPick } from "./SandboxMiniActivity";

type Tab = "tree" | "kmeans";

const ML_TF = [
  { q: "Supervised Learning cần dữ liệu đã gắn nhãn để học.", a: true },
  { q: "K-Means là thuật toán Unsupervised — tự tìm nhóm.", a: true },
  { q: "Decision Tree luôn cần GPU mạnh mới chạy được.", a: false, why: "Cây quyết định rất nhẹ — chạy được cả trên điện thoại." },
  { q: "Càng nhiều dữ liệu chất lượng, mô hình ML càng chính xác.", a: true },
  { q: "Unsupervised Learning có sẵn đáp án đúng cho mỗi mẫu.", a: false, why: "Không — nó tự tìm cấu trúc mà không có nhãn." },
];
const ML_PAIRS = [
  { a: "Supervised", b: "Học có nhãn — như giáo viên chỉ bài" },
  { a: "Unsupervised", b: "Tự gom nhóm — không cần nhãn" },
  { a: "Decision Tree", b: "Hỏi Yes/No theo nhánh" },
  { a: "K-Means", b: "Tìm K trung tâm nhóm gần nhất" },
];

// ============== Decision Tree ==============
type Node = {
  q?: string;
  yes?: Node;
  no?: Node;
  fruit?: string;
  emoji?: string;
};

const TREE: Node = {
  q: "Vỏ trái cây có trơn không?",
  yes: {
    q: "Màu vàng?",
    yes: { fruit: "Chuối", emoji: "🍌" },
    no: {
      q: "Có vị chua?",
      yes: { fruit: "Cam", emoji: "🍊" },
      no: { fruit: "Táo", emoji: "🍎" },
    },
  },
  no: {
    q: "Có gai?",
    yes: { fruit: "Sầu riêng", emoji: "🥭" },
    no: { fruit: "Kiwi", emoji: "🥝" },
  },
};

const DecisionTreeGame = () => {
  const [path, setPath] = useState<Node[]>([TREE]);
  const current = path[path.length - 1];

  const answer = (choice: "yes" | "no") => {
    const next = current[choice];
    if (next) setPath([...path, next]);
  };

  const reset = () => setPath([TREE]);

  return (
    <div className="rounded-xl bg-card/60 border border-border p-4 space-y-4">
      <div className="flex items-center gap-2 text-sm text-foreground/70">
        <TreePine className="w-4 h-4 text-emerald-500" />
        AI đoán trái cây bằng cách hỏi 1 chuỗi câu hỏi Yes/No
      </div>

      {/* Path of questions */}
      <div className="space-y-2">
        {path.map((n, i) => {
          const isLast = i === path.length - 1;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-lg p-3 border ${
                isLast && !n.fruit
                  ? "border-primary/50 bg-primary/10"
                  : "border-border bg-muted/30"
              }`}
            >
              {n.fruit ? (
                <div className="text-center">
                  <div className="text-5xl mb-2">{n.emoji}</div>
                  <div className="font-bold text-lg">AI đoán: {n.fruit}!</div>
                  <div className="text-xs text-foreground/60 mt-1">
                    Cây quyết định đã đi {path.length - 1} bước để phân loại.
                  </div>
                </div>
              ) : (
                <div className="font-semibold text-sm">{n.q}</div>
              )}
            </motion.div>
          );
        })}
      </div>

      {!current.fruit ? (
        <div className="flex gap-2">
          <Button onClick={() => answer("yes")} className="flex-1 bg-emerald-500 hover:bg-emerald-600">
            Có ✅
          </Button>
          <Button onClick={() => answer("no")} variant="outline" className="flex-1">
            Không ❌
          </Button>
        </div>
      ) : (
        <Button onClick={reset} variant="outline" className="w-full">
          <RotateCcw className="w-4 h-4 mr-2" /> Thử lại với trái cây khác
        </Button>
      )}
    </div>
  );
};

// ============== K-Means ==============
type Point = { x: number; y: number };
const W = 320;
const H = 220;

const seededPoints = (n: number): Point[] => {
  // 3 natural clusters around fixed centers for deterministic visualization.
  const centers = [
    { x: 60, y: 60 },
    { x: 240, y: 80 },
    { x: 150, y: 180 },
  ];
  const out: Point[] = [];
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < n; i++) {
    const c = centers[i % 3];
    out.push({
      x: c.x + (rand() - 0.5) * 70,
      y: c.y + (rand() - 0.5) * 70,
    });
  }
  return out;
};

const CLUSTER_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ec4899"];

const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

const KMeansGame = () => {
  const [k, setK] = useState(3);
  const [iter, setIter] = useState(0);
  const points = useMemo(() => seededPoints(20), []);

  // Initial centroids: pick first K points spread out
  const [centroids, setCentroids] = useState<Point[]>(() =>
    Array.from({ length: 3 }, (_, i) => ({ ...points[i * 6] })),
  );

  // Reset centroids when K changes
  useEffect(() => {
    setCentroids(Array.from({ length: k }, (_, i) => ({ ...points[(i * 6) % points.length] })));
    setIter(0);
  }, [k, points]);

  // Assign each point to nearest centroid
  const assignments = useMemo(
    () => points.map((p) => {
      let best = 0;
      let bd = Infinity;
      centroids.forEach((c, i) => {
        const d = dist(p, c);
        if (d < bd) { bd = d; best = i; }
      });
      return best;
    }),
    [points, centroids],
  );

  const step = () => {
    // Move each centroid to mean of its assigned points
    const next = centroids.map((c, i) => {
      const members = points.filter((_, idx) => assignments[idx] === i);
      if (members.length === 0) return c;
      const mx = members.reduce((s, p) => s + p.x, 0) / members.length;
      const my = members.reduce((s, p) => s + p.y, 0) / members.length;
      return { x: mx, y: my };
    });
    setCentroids(next);
    setIter((n) => n + 1);
  };

  const reset = () => {
    setCentroids(Array.from({ length: k }, (_, i) => ({ ...points[(i * 6) % points.length] })));
    setIter(0);
  };

  return (
    <div className="rounded-xl bg-card/60 border border-border p-4 space-y-4">
      <div className="flex items-center gap-2 text-sm text-foreground/70">
        <Wand2 className="w-4 h-4 text-fuchsia-500" />
        AI tự gom nhóm — không ai dạy nhãn. Đổi K rồi bấm "Học thêm 1 bước".
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold">K = {k} nhóm</span>
        <div className="flex-1">
          <Slider value={[k]} min={2} max={4} step={1} onValueChange={(v) => setK(v[0])} />
        </div>
      </div>

      <div className="relative bg-muted/40 rounded-lg overflow-hidden" style={{ height: H }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
          {/* connections to centroid */}
          {points.map((p, i) => {
            const c = centroids[assignments[i]];
            if (!c) return null;
            return (
              <line
                key={`l${i}`}
                x1={p.x} y1={p.y} x2={c.x} y2={c.y}
                stroke={CLUSTER_COLORS[assignments[i]]}
                strokeOpacity={0.25}
                strokeWidth={1}
              />
            );
          })}
          {/* points */}
          {points.map((p, i) => (
            <motion.circle
              key={`p${i}`}
              cx={p.x} cy={p.y} r={7}
              animate={{ fill: CLUSTER_COLORS[assignments[i]] }}
              transition={{ duration: 0.4 }}
            />
          ))}
          {/* centroids */}
          {centroids.map((c, i) => (
            <motion.g key={`c${i}`} animate={{ x: 0, y: 0 }}>
              <motion.circle
                cx={c.x} cy={c.y} r={12}
                fill={CLUSTER_COLORS[i]}
                fillOpacity={0.35}
                stroke={CLUSTER_COLORS[i]}
                strokeWidth={3}
                animate={{ cx: c.x, cy: c.y }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              />
              <motion.text
                x={c.x} y={c.y + 4}
                textAnchor="middle"
                fontSize={11}
                fontWeight={700}
                fill="white"
                animate={{ x: c.x, y: c.y + 4 }}
              >
                ★
              </motion.text>
            </motion.g>
          ))}
        </svg>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={step} className="flex-1">
          <Sparkles className="w-4 h-4 mr-2" /> Học thêm 1 bước (vòng {iter})
        </Button>
        <Button onClick={reset} variant="outline">
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      <p className="text-xs text-foreground/60">
        💡 Mỗi vòng, các "trung tâm nhóm" (★) di chuyển về giữa các bạn gần nhất. Sau vài vòng, AI
        tìm ra <b>{k} nhóm</b> tự nhiên mà không cần ai dạy.
      </p>
    </div>
  );
};

// ============== Main ==============
const MLMagicSandbox = () => {
  const [tab, setTab] = useState<Tab>("tree");

  return (
    <div className="space-y-3 sm:space-y-4 [&>*+*]:pt-3 sm:[&>*+*]:pt-4 [&>*+*]:border-t [&>*+*]:border-border/40">
      {/* Activity 1 — Interactive playground (tabs) */}
      <div>
        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-500/15 to-fuchsia-500/15 border border-emerald-400/40 text-[11px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            🧪 Activity 1 · Phòng thí nghiệm
          </div>
          <div className="flex gap-1.5 p-1 bg-muted/40 rounded-lg">
            <button
              onClick={() => setTab("tree")}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                tab === "tree" ? "bg-background shadow text-foreground" : "text-foreground/60"
              }`}
            >
              🌳 Cây quyết định
            </button>
            <button
              onClick={() => setTab("kmeans")}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                tab === "kmeans" ? "bg-background shadow text-foreground" : "text-foreground/60"
              }`}
            >
              🎨 K-Means
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {tab === "tree" ? <DecisionTreeGame /> : <KMeansGame />}
          </motion.div>
        </AnimatePresence>
      </div>

      <BestMatchPick
        title="🔍 Activity 2 · Supervised hay Unsupervised?"
        hint="Mỗi tình huống thuộc loại học có giám sát (có nhãn) hay không giám sát (tự gom nhóm)?"
        accent="from-emerald-500 to-fuchsia-600"
        border="border-emerald-400/40"
        options={[
          { id: "sup", label: "🎓 Supervised" },
          { id: "uns", label: "🪄 Unsupervised" },
        ]}
        items={[
          { prompt: "Phân loại email là spam / không spam (đã có 10.000 email gắn nhãn)", correctId: "sup" },
          { prompt: "Tự nhóm 1 triệu khách hàng thành các phân khúc thị trường", correctId: "uns" },
          { prompt: "Dự đoán giá nhà từ dữ liệu nhà đã bán + giá thật", correctId: "sup" },
          { prompt: "AI tự tìm các chủ đề thường xuất hiện trong bài báo (không gắn sẵn chủ đề)", correctId: "uns" },
          { prompt: "Nhận diện chữ số viết tay (đã có ảnh + nhãn 0-9)", correctId: "sup" },
          { prompt: "Phát hiện giao dịch ngân hàng bất thường khi chưa biết kiểu lừa đảo", correctId: "uns" },
        ]}
      />

      <BonusGames
        tfItems={ML_TF}
        matchPairs={ML_PAIRS}
        accent="from-emerald-500 to-fuchsia-600"
        border="border-emerald-400/40"
      />
    </div>
  );
};

export default MLMagicSandbox;
