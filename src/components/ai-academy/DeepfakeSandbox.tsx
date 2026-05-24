/**
 * DeepfakeSandbox — side-by-side portrait reveal. Hover/touch a "magnifier"
 * over each photo to expose hidden noise/blur artifacts on the spoofed one.
 */
import { useRef, useState } from "react";
import { ShieldCheck, ShieldAlert, Search } from "lucide-react";
import { BonusGames } from "./SandboxBonusGames";
import { BestMatchPick } from "./SandboxMiniActivity";

const DF_TF = [
  { q: "Deepfake là video / ảnh do AI tạo trông như người thật.", a: true },
  { q: "Deepfake luôn dễ phát hiện bằng mắt thường.", a: false, why: "Nhiều deepfake rất tinh vi — cần soi artifact (mép, bóng, răng…)." },
  { q: "Nên kiểm chứng nguồn trước khi chia sẻ video lạ.", a: true },
  { q: "Tai và bóng đổ thường là điểm AI deepfake hay lỗi.", a: true },
  { q: "Deepfake không bị xem là vi phạm pháp luật.", a: false, why: "Nhiều nước (VN, EU, Mỹ) đã có luật xử phạt deepfake lừa đảo." },
];
const DF_PAIRS = [
  { a: "GAN", b: "Mạng AI sinh ra ảnh giả" },
  { a: "Artifact", b: "Dấu vết lỗi do AI để lại" },
  { a: "Liveness check", b: "Kiểm tra người thật trước camera" },
  { a: "Watermark", b: "Dấu chìm tố cáo nội dung do AI tạo" },
];

type Frame = {
  id: "real" | "fake";
  label: string;
  emoji: string;
  bg: string;
  artifacts: { x: number; y: number; hint: string }[];
};

const FRAMES: Frame[] = [
  {
    id: "real",
    label: "Ảnh thật",
    emoji: "🧑‍🎓",
    bg: "from-emerald-400/30 via-teal-400/20 to-cyan-400/30",
    artifacts: [],
  },
  {
    id: "fake",
    label: "Deepfake?",
    emoji: "🤖",
    bg: "from-rose-400/30 via-pink-400/20 to-fuchsia-400/30",
    artifacts: [
      { x: 25, y: 30, hint: "Mép tai bị mờ" },
      { x: 70, y: 55, hint: "Bóng đổ sai hướng" },
      { x: 50, y: 78, hint: "Răng méo, không khớp" },
    ],
  },
];

const DeepfakeSandbox = () => {
  const [hovered, setHovered] = useState<{ id: string; x: number; y: number } | null>(null);
  const [verdict, setVerdict] = useState<"real" | "fake" | null>(null);
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const onMove = (id: string, e: React.MouseEvent | React.TouchEvent) => {
    const el = refs.current[id];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const point = "touches" in e ? e.touches[0] : e;
    const x = ((point.clientX - rect.left) / rect.width) * 100;
    const y = ((point.clientY - rect.top) / rect.height) * 100;
    setHovered({ id, x, y });
  };

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">
        🔍 Di chuột (hoặc chạm) lên từng ảnh để soi <b>kính lúp</b> tìm dấu vết deepfake.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {FRAMES.map((f) => (
          <div
            key={f.id}
            ref={(el) => (refs.current[f.id] = el)}
            onMouseMove={(e) => onMove(f.id, e)}
            onMouseLeave={() => setHovered(null)}
            onTouchMove={(e) => onMove(f.id, e)}
            onTouchEnd={() => setHovered(null)}
            className={`relative aspect-square rounded-2xl border-2 border-border bg-gradient-to-br ${f.bg} overflow-hidden cursor-crosshair select-none`}
          >
            <div className="absolute inset-0 flex items-center justify-center text-7xl">
              {f.emoji}
            </div>
            <div className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-background/80 backdrop-blur">
              {f.label}
            </div>

            {/* Hidden artifacts revealed under magnifier */}
            {f.artifacts.map((a, i) => {
              const visible =
                hovered?.id === f.id &&
                Math.hypot(hovered.x - a.x, hovered.y - a.y) < 18;
              return (
                <div
                  key={i}
                  className={`absolute w-10 h-10 rounded-full border-2 border-rose-500 transition-opacity ${
                    visible ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ left: `${a.x}%`, top: `${a.y}%`, transform: "translate(-50%,-50%)" }}
                >
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] bg-rose-500 text-white px-1.5 py-0.5 rounded whitespace-nowrap">
                    {a.hint}
                  </div>
                </div>
              );
            })}

            {/* Magnifier lens */}
            {hovered?.id === f.id && (
              <div
                className="pointer-events-none absolute w-20 h-20 rounded-full border-4 border-cyan-400/80 shadow-2xl bg-white/10 backdrop-blur-[2px]"
                style={{
                  left: `${hovered.x}%`,
                  top: `${hovered.y}%`,
                  transform: "translate(-50%,-50%)",
                }}
              >
                <Search className="absolute -top-2 -right-2 w-4 h-4 text-cyan-300 bg-background rounded-full p-0.5" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setVerdict("real")}
          className={`flex-1 py-2 rounded-xl text-sm font-bold border-2 transition ${
            verdict === "real"
              ? "bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300"
              : "border-border hover:border-emerald-400"
          }`}
        >
          <ShieldCheck className="w-4 h-4 inline mr-1" /> Trái là thật
        </button>
        <button
          onClick={() => setVerdict("fake")}
          className={`flex-1 py-2 rounded-xl text-sm font-bold border-2 transition ${
            verdict === "fake"
              ? "bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-300"
              : "border-border hover:border-rose-400"
          }`}
        >
          <ShieldAlert className="w-4 h-4 inline mr-1" /> Phải là giả
        </button>
      </div>

      {verdict && (
        <div
          className={`p-3 rounded-xl text-sm font-medium ${
            verdict === "fake"
              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
              : "bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/30"
          }`}
        >
          {verdict === "fake"
            ? "✅ Chính xác! Ảnh phải có 3 lỗi: mép tai mờ, bóng sai, răng méo."
            : "❌ Sai rồi — soi kỹ ảnh phải sẽ thấy artifact của deepfake."}
        </div>
      )}

      <BonusGames tfItems={DF_TF} matchPairs={DF_PAIRS} accent="from-rose-500 to-fuchsia-600" border="border-rose-400/40" />
    </div>
  );
};

export default DeepfakeSandbox;
