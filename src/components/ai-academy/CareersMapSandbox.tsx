/**
 * CareersMapSandbox — Pick 2-3 interests, highlight matching AI careers in VN
 * with salary ranges. Helps students see "AI is for me too".
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Sparkles } from "lucide-react";
import { BonusGames } from "./SandboxBonusGames";

const INTERESTS = [
  { id: "math", label: "Toán / Logic", emoji: "🔢" },
  { id: "art", label: "Vẽ / Thiết kế", emoji: "🎨" },
  { id: "lang", label: "Ngôn ngữ / Viết", emoji: "📝" },
  { id: "code", label: "Code / Máy tính", emoji: "💻" },
  { id: "people", label: "Giao tiếp / Tâm lý", emoji: "🤝" },
  { id: "game", label: "Game / Sáng tạo", emoji: "🎮" },
];

type Career = { name: string; salary: string; company: string; needs: string[] };
const CAREERS: Career[] = [
  { name: "AI / ML Engineer", salary: "30–80 triệu/tháng", company: "VinAI, FPT.AI, Zalo, VNG", needs: ["math", "code"] },
  { name: "Data Scientist", salary: "25–60 triệu/tháng", company: "MoMo, Shopee, Tiki", needs: ["math", "code"] },
  { name: "Prompt Engineer", salary: "20–50 triệu/tháng", company: "Mọi startup AI", needs: ["lang", "code"] },
  { name: "AI Product Manager", salary: "40–100 triệu/tháng", company: "Vingroup, FPT", needs: ["people", "code"] },
  { name: "AI UX / Designer", salary: "20–45 triệu/tháng", company: "Canva, Lovable, Figma", needs: ["art", "people"] },
  { name: "Generative AI Artist", salary: "15–40 triệu/tháng", company: "Studio quảng cáo, phim", needs: ["art", "game"] },
  { name: "Game AI Developer", salary: "25–55 triệu/tháng", company: "VNG, Sky Mavis", needs: ["code", "game"] },
  { name: "Conversational AI Linguist", salary: "20–40 triệu/tháng", company: "Zalo, Kiki, Sun*", needs: ["lang", "people"] },
];

const TF = [
  { q: "Nghề AI cần biết code mới làm được.", a: false, why: "Prompt Engineer, AI PM, AI Linguist không cần code thành thạo." },
  { q: "VinAI, FPT.AI, Zalo AI Lab là các công ty AI hàng đầu VN.", a: true },
  { q: "Học AI từ cấp 3 sẽ dễ vào ngành hơn.", a: true },
  { q: "Lương kỹ sư AI VN cao hơn nhiều ngành khác.", a: true },
];
const PAIRS = [
  { a: "VinAI Research", b: "Vingroup — Computer Vision" },
  { a: "Zalo AI Lab", b: "Chatbot Kiki tiếng Việt" },
  { a: "FPT.AI", b: "Trợ lý ảo doanh nghiệp" },
  { a: "Sky Mavis", b: "Axie Infinity — Game AI" },
];

const CareersMapSandbox = () => {
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const toggle = (id: string) => {
    setPicked((p) => {
      const n = new Set(p);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };
  const matches = CAREERS
    .map((c) => ({ ...c, score: c.needs.filter((n) => picked.has(n)).length }))
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  return (
    <div className="space-y-3 sm:space-y-4 [&>*+*]:pt-3 sm:[&>*+*]:pt-4 [&>*+*]:border-t [&>*+*]:border-border/40">
      <div className="rounded-2xl border-2 border-violet-400/40 bg-violet-500/5 p-3">
        <h4 className="text-sm font-bold text-violet-700 dark:text-violet-300 mb-2 flex items-center gap-1">
          <Sparkles className="w-4 h-4" /> Bạn thích cái gì? (chọn 2–3)
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {INTERESTS.map((it) => (
            <button
              key={it.id}
              onClick={() => toggle(it.id)}
              className={`p-2.5 rounded-xl border-2 text-sm font-medium transition ${
                picked.has(it.id)
                  ? "border-violet-500 bg-violet-500/20 text-violet-700 dark:text-violet-200"
                  : "border-border bg-card hover:border-violet-400/40"
              }`}
            >
              <div className="text-xl">{it.emoji}</div>
              {it.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-1">
          <Briefcase className="w-4 h-4 text-emerald-600" /> Nghề AI phù hợp với bạn:
        </h4>
        {picked.size === 0 ? (
          <p className="text-sm text-muted-foreground italic">Chọn sở thích để xem gợi ý nghề.</p>
        ) : matches.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">Chưa có kết quả — thử kết hợp sở thích khác.</p>
        ) : (
          <ul className="space-y-2">
            {matches.map((c, i) => (
              <motion.li
                key={c.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-3 rounded-xl border-2 border-emerald-400/30 bg-emerald-500/5"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-bold text-emerald-700 dark:text-emerald-300">{c.name}</span>
                  <span className="text-xs text-amber-600 font-bold">💰 {c.salary}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Công ty VN: {c.company}</p>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      <BonusGames tfItems={TF} matchPairs={PAIRS} accent="from-violet-500 to-fuchsia-600" border="border-violet-400/40" />
    </div>
  );
};

export default CareersMapSandbox;
