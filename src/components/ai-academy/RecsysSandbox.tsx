/**
 * RecsysSandbox — "Smart feed builder"
 * A list of user personas with interest vectors and a content library with
 * topic vectors. A similarity-threshold slider gates which items are
 * recommended (cosine similarity). Live hit-rate updates teach how feed
 * algorithms work.
 */
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Users, Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { BonusGames } from "./SandboxBonusGames";
import { ChipFilter } from "./SandboxMiniActivity";

const REC_TF = [
  { q: "TikTok & YouTube dùng hệ gợi ý để chọn video cho bạn.", a: true },
  { q: "Hệ gợi ý đo độ giống nhau bằng cosine similarity.", a: true },
  { q: "Ngưỡng quá cao sẽ tạo ra 'filter bubble'.", a: true, why: "Bạn chỉ thấy nội dung lặp lại sở thích — thiếu đa dạng." },
  { q: "Vector sở thích chỉ có 1 con số duy nhất.", a: false, why: "Vector có nhiều chiều (thể thao, nhạc, khoa học…)." },
  { q: "Spotify gợi ý nhạc cũng dùng nguyên lý tương tự.", a: true },
];
const REC_PAIRS = [
  { a: "Cosine similarity", b: "Đo độ giống giữa 2 vector" },
  { a: "User vector", b: "Sở thích người dùng dạng số" },
  { a: "Filter bubble", b: "Bị mắc kẹt trong vùng nội dung quen" },
  { a: "Hit rate", b: "% nội dung được gợi ý" },
];

const TOPICS = ["⚽ Thể thao", "🎮 Game", "🎵 Nhạc", "🔬 Khoa học", "🎨 Nghệ thuật"];

type Vec5 = [number, number, number, number, number];

const PERSONAS: { id: string; emoji: string; name: string; v: Vec5 }[] = [
  { id: "p1", emoji: "👦", name: "Bin (game thủ)",   v: [0.2, 1.0, 0.4, 0.1, 0.1] },
  { id: "p2", emoji: "👧", name: "Mai (yêu nhạc)",   v: [0.1, 0.2, 1.0, 0.1, 0.6] },
  { id: "p3", emoji: "🧑", name: "Khoa (mê khoa học)", v: [0.1, 0.3, 0.2, 1.0, 0.3] },
  { id: "p4", emoji: "👩", name: "Linh (vẽ tranh)",  v: [0.0, 0.1, 0.4, 0.3, 1.0] },
];

const CONTENT: { id: string; emoji: string; title: string; v: Vec5 }[] = [
  { id: "c1", emoji: "⚽", title: "Highlight World Cup",   v: [1.0, 0.1, 0.2, 0.0, 0.1] },
  { id: "c2", emoji: "🎮", title: "Mẹo chơi Minecraft",     v: [0.1, 1.0, 0.1, 0.2, 0.2] },
  { id: "c3", emoji: "🎼", title: "Cover nhạc Trịnh",      v: [0.0, 0.0, 1.0, 0.0, 0.5] },
  { id: "c4", emoji: "🚀", title: "NASA phóng tên lửa",     v: [0.1, 0.2, 0.0, 1.0, 0.1] },
  { id: "c5", emoji: "🖼️", title: "Triển lãm Van Gogh",    v: [0.0, 0.0, 0.3, 0.2, 1.0] },
  { id: "c6", emoji: "🏀", title: "Skill bóng rổ NBA",      v: [0.9, 0.1, 0.2, 0.0, 0.1] },
  { id: "c7", emoji: "🎧", title: "Lo-fi học bài",         v: [0.0, 0.1, 0.8, 0.1, 0.3] },
  { id: "c8", emoji: "🤖", title: "AI tự lái xe",         v: [0.0, 0.4, 0.0, 0.9, 0.2] },
];

const cosine = (a: Vec5, b: Vec5) => {
  const dot = a.reduce((s, x, i) => s + x * b[i], 0);
  const ma = Math.sqrt(a.reduce((s, x) => s + x * x, 0));
  const mb = Math.sqrt(b.reduce((s, x) => s + x * x, 0));
  return ma && mb ? dot / (ma * mb) : 0;
};

const RecsysSandbox = () => {
  const [activeId, setActiveId] = useState(PERSONAS[0].id);
  const [threshold, setThreshold] = useState(50);

  const active = PERSONAS.find((p) => p.id === activeId)!;

  const scored = useMemo(
    () => CONTENT.map((c) => ({ ...c, score: cosine(active.v, c.v) })).sort((a, b) => b.score - a.score),
    [active],
  );
  const recs = scored.filter((s) => s.score * 100 >= threshold);
  const hitRate = Math.round((recs.length / CONTENT.length) * 100);

  return (
    <div className="space-y-10 sm:space-y-12 [&>*+*]:pt-10 sm:[&>*+*]:pt-12 [&>*+*]:border-t-2 [&>*+*]:border-border/70">
      {/* Persona picker */}
      <div className="rounded-2xl border-2 border-amber-400/40 bg-amber-500/5 p-3">
        <div className="text-[11px] font-bold uppercase text-amber-700 dark:text-amber-300 mb-2 flex items-center gap-1">
          <Users className="w-3 h-3" /> ① Chọn người dùng
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PERSONAS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              className={`p-2 rounded-xl border-2 text-left transition active:scale-95 ${
                activeId === p.id
                  ? "border-amber-500 bg-amber-500/15"
                  : "border-border bg-card hover:border-amber-400/50"
              }`}
            >
              <div className="text-2xl">{p.emoji}</div>
              <div className="text-xs font-bold leading-tight">{p.name}</div>
            </button>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {TOPICS.map((t, i) => (
            <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-background border">
              {t}: <b>{(active.v[i] * 100).toFixed(0)}%</b>
            </span>
          ))}
        </div>
      </div>

      {/* Threshold */}
      <div className="rounded-2xl border-2 border-orange-400/40 bg-orange-500/5 p-3">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-bold text-orange-700 dark:text-orange-300">② Ngưỡng tương đồng</span>
          <span className="font-black text-lg text-orange-600">{threshold}%</span>
        </div>
        <Slider value={[threshold]} min={20} max={95} step={5} onValueChange={(v) => setThreshold(v[0])} />
        <div className="mt-2 text-xs text-muted-foreground">
          Ngưỡng càng cao → AI chỉ gợi ý nội dung <b>cực kỳ</b> giống sở thích. Quá cao = thiếu đa dạng (filter bubble).
        </div>
      </div>

      {/* Live feed */}
      <div className="rounded-2xl border-2 border-rose-400/40 bg-gradient-to-br from-rose-500/5 to-amber-500/5 p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] font-bold uppercase text-rose-700 dark:text-rose-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> ③ Feed gợi ý
          </div>
          <div className="text-xs">
            Hit-rate: <b className="text-rose-600">{hitRate}%</b> ({recs.length}/{CONTENT.length})
          </div>
        </div>
        <div className="space-y-1.5 max-h-56 overflow-y-auto">
          {scored.map((c) => {
            const shown = c.score * 100 >= threshold;
            return (
              <motion.div
                key={c.id}
                animate={{ opacity: shown ? 1 : 0.3, scale: shown ? 1 : 0.96 }}
                className={`flex items-center gap-2 p-2 rounded-lg border ${
                  shown ? "bg-card border-emerald-400/40" : "bg-muted/40 border-border"
                }`}
              >
                <span className="text-2xl">{c.emoji}</span>
                <span className="text-sm font-semibold flex-1">{c.title}</span>
                <span className={`text-xs font-mono ${shown ? "text-emerald-600" : "text-muted-foreground"}`}>
                  {(c.score * 100).toFixed(0)}%
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        💡 YouTube & TikTok tính cosine similarity giữa <b>vector sở thích</b> của bạn và hàng tỷ video — chỉ những video vượt ngưỡng mới xuất hiện trên feed.
      </p>

      <ChipFilter
        title="🎬 Trộn vector sở thích của bạn"
        hint="Chọn các chủ đề bạn hay xem trên TikTok. Càng nhiều tín hiệu rõ ràng → AI càng dễ gợi ý đúng (similarity cao)."
        baseline={20}
        positive
        goal={70}
        goodLabel="Vector sở thích rõ ràng — AI gợi ý chính xác!"
        badLabel="AI chưa hiểu bạn — hãy bật thêm vài chủ đề bạn thực sự thích."
        metricLabel="Độ chính xác gợi ý"
        accent="from-orange-500 to-rose-500"
        border="border-orange-400/40"
        options={[
          { id: "sport", label: "⚽ Thể thao", weight: 14 },
          { id: "game", label: "🎮 Game", weight: 14 },
          { id: "music", label: "🎵 Nhạc Vpop", weight: 12 },
          { id: "food", label: "🍜 Food review", weight: 12 },
          { id: "study", label: "📚 Học tiếng Anh", weight: 16 },
          { id: "tech", label: "💻 Công nghệ", weight: 12 },
        ]}
      />

      <BonusGames tfItems={REC_TF} matchPairs={REC_PAIRS} accent="from-orange-500 to-rose-500" border="border-orange-400/40" />
    </div>
  );
};

export default RecsysSandbox;
