/**
 * GenAISandbox — "Prompt → Picture"
 * Students pick a subject, style and mood; the mock "AI" composes an emoji
 * scene + descriptive caption. Teaches the idea of prompt engineering for
 * generative models like Midjourney / DALL·E.
 */
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Wand2, Sparkles, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BonusGames } from "./SandboxBonusGames";

const GEN_TF = [
  { q: "Generative AI tạo ra nội dung mới chưa từng tồn tại.", a: true },
  { q: "Prompt càng mơ hồ → kết quả càng đẹp.", a: false, why: "Ngược lại: prompt càng cụ thể (chủ thể + style + mood) càng đẹp." },
  { q: "ChatGPT có thể bịa thông tin — gọi là Hallucination.", a: true },
  { q: "Midjourney là AI vẽ tranh từ prompt văn bản.", a: true },
  { q: "AI tạo sinh không cần dữ liệu huấn luyện.", a: false, why: "Nó học từ HÀNG TỶ ảnh / bài viết trên Internet." },
];
const GEN_PAIRS = [
  { a: "Prompt", b: "Câu lệnh ra cho AI" },
  { a: "Hallucination", b: "AI bịa thông tin trông như thật" },
  { a: "Seed", b: "Số ngẫu nhiên — đổi seed ra ảnh khác" },
  { a: "Style", b: "Phong cách: anime, 3D, watercolor…" },
];

const SUBJECTS = [
  { id: "cat", emoji: "🐱", label: "mèo" },
  { id: "astronaut", emoji: "🧑‍🚀", label: "phi hành gia" },
  { id: "dragon", emoji: "🐉", label: "rồng" },
  { id: "robot", emoji: "🤖", label: "robot" },
  { id: "samurai", emoji: "🥷", label: "ninja" },
];
const STYLES = [
  { id: "anime", emoji: "🎌", label: "phong cách anime" },
  { id: "watercolor", emoji: "🎨", label: "tranh màu nước" },
  { id: "pixel", emoji: "👾", label: "pixel-art retro" },
  { id: "3d", emoji: "🧊", label: "render 3D Pixar" },
];
const MOODS = [
  { id: "neon", emoji: "🌃", label: "đêm neon cyberpunk" },
  { id: "forest", emoji: "🌲", label: "khu rừng huyền bí" },
  { id: "space", emoji: "🌌", label: "ngoài vũ trụ" },
  { id: "beach", emoji: "🏖️", label: "bãi biển hoàng hôn" },
];

const Pick = <T extends { id: string; emoji: string; label: string }>({
  list, value, onChange, color,
}: { list: T[]; value: string; onChange: (v: string) => void; color: string }) => (
  <div className="flex flex-wrap gap-1.5">
    {list.map((o) => (
      <button
        key={o.id}
        onClick={() => onChange(o.id)}
        className={`px-2.5 py-1 rounded-full text-xs font-bold border-2 transition active:scale-95 ${
          value === o.id
            ? `${color} text-white border-transparent shadow`
            : "bg-card text-foreground border-border hover:border-primary/40"
        }`}
      >
        <span className="mr-1">{o.emoji}</span>{o.label}
      </button>
    ))}
  </div>
);

const GenAISandbox = () => {
  const [subject, setSubject] = useState(SUBJECTS[0].id);
  const [style, setStyle] = useState(STYLES[0].id);
  const [mood, setMood] = useState(MOODS[0].id);
  const [seed, setSeed] = useState(0);

  const s = SUBJECTS.find((x) => x.id === subject)!;
  const st = STYLES.find((x) => x.id === style)!;
  const m = MOODS.find((x) => x.id === mood)!;

  const sparkles = useMemo(
    () => Array.from({ length: 14 }, () => ({
      l: Math.random() * 100, t: Math.random() * 100,
      d: 0.4 + Math.random() * 0.8, s: 0.6 + Math.random() * 0.8,
    })),
    [subject, style, mood, seed],
  );

  return (
    <div className="space-y-4">
      <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden border-2 border-pink-400/40 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        {sparkles.map((sp, i) => (
          <motion.div
            key={`${seed}-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, sp.s, 0] }}
            transition={{ duration: 1.6, delay: sp.d, repeat: Infinity }}
            className="absolute text-yellow-200"
            style={{ left: `${sp.l}%`, top: `${sp.t}%` }}
          >✦</motion.div>
        ))}
        <motion.div
          key={`${subject}-${style}-${mood}-${seed}`}
          initial={{ scale: 0.4, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="absolute inset-0 flex items-center justify-center text-[120px] sm:text-[160px] drop-shadow-[0_0_25px_rgba(236,72,153,0.6)]"
        >
          {s.emoji}
        </motion.div>
        <div className="absolute bottom-2 left-2 right-2 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-black/50 backdrop-blur text-white text-xs font-mono">
            “{s.label} {st.label}, {m.label}” ✨
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <div className="text-[11px] font-bold uppercase text-muted-foreground mb-1">1. Chủ thể</div>
          <Pick list={SUBJECTS} value={subject} onChange={setSubject} color="bg-pink-500" />
        </div>
        <div>
          <div className="text-[11px] font-bold uppercase text-muted-foreground mb-1">2. Phong cách</div>
          <Pick list={STYLES} value={style} onChange={setStyle} color="bg-purple-500" />
        </div>
        <div>
          <div className="text-[11px] font-bold uppercase text-muted-foreground mb-1">3. Bối cảnh</div>
          <Pick list={MOODS} value={mood} onChange={setMood} color="bg-indigo-500" />
        </div>
      </div>

      <Button
        onClick={() => setSeed((x) => x + 1)}
        className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white"
      >
        <Wand2 className="w-4 h-4 mr-1" /> Tạo lại (Re-roll)
      </Button>

      <p className="text-xs text-muted-foreground flex items-start gap-2">
        <Sparkles className="w-3.5 h-3.5 mt-0.5 text-pink-500 shrink-0" />
        <span>Prompt = công thức nấu ăn cho AI. Càng <b>cụ thể</b> (chủ thể + phong cách + bối cảnh), ảnh càng đẹp. Đây là kỹ năng <b>Prompt Engineering</b> mà các kỹ sư AI đang được trả lương cao!</span>
      </p>

      <BonusGames tfItems={GEN_TF} matchPairs={GEN_PAIRS} accent="from-pink-500 to-purple-600" border="border-pink-400/40" />
    </div>
  );
};

export default GenAISandbox;
