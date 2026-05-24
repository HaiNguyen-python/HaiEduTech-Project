/**
 * @file AISkillTree.tsx
 * @description Cây kinh nghiệm AI — visualization 8 chặng (Mầm AI → AI Sensei)
 * đọc XP từ useAIAcademyXP. Nhánh phụ bonus dựa trên totalBadges/totalStars.
 */
import { motion } from "framer-motion";
import { Lock, Check, Sparkles } from "lucide-react";
import { useAIAcademyXP } from "@/hooks/useAIAcademyXP";

type Milestone = {
  lv: number;
  xp: number;
  title: string;
  icon: string;
  desc: string;
  bonus?: { icon: string; title: string; req: string; check: (ctx: BonusCtx) => boolean };
};

type BonusCtx = { stars: number; badges: number; xp: number };

const MILESTONES: Milestone[] = [
  { lv: 1, xp: 0,    title: "Mầm AI",         icon: "🌱", desc: "Bắt đầu hành trình khám phá" },
  { lv: 2, xp: 100,  title: "Khám phá",       icon: "🔭", desc: "Học khái niệm cốt lõi về AI",
    bonus: { icon: "⭐", title: "Quiz Master", req: "≥ 9 sao", check: (c) => c.stars >= 9 } },
  { lv: 3, xp: 250,  title: "Tập sự",         icon: "⚡", desc: "Thử nghiệm lab AI đầu tiên" },
  { lv: 4, xp: 500,  title: "Tư duy máy",     icon: "🧠", desc: "Hiểu mạng nơ-ron và dữ liệu",
    bonus: { icon: "🎨", title: "Sáng tạo",   req: "≥ 4 huy hiệu", check: (c) => c.badges >= 4 } },
  { lv: 5, xp: 900,  title: "Nhà khoa học",   icon: "🧪", desc: "Vận dụng AI vào bài toán thực" },
  { lv: 6, xp: 1400, title: "Kiến trúc sư",   icon: "🏛️", desc: "Tự xây dự án AI mini",
    bonus: { icon: "🏆", title: "AI Builder", req: "≥ 8 huy hiệu", check: (c) => c.badges >= 8 } },
  { lv: 7, xp: 2000, title: "Chuyên gia trẻ", icon: "🧙", desc: "Hoàn thành Capstone Project" },
  { lv: 8, xp: 3000, title: "AI Sensei",      icon: "👑", desc: "Bậc thầy AI tương lai Việt Nam",
    bonus: { icon: "💎", title: "Tài năng VN", req: "≥ 40 sao", check: (c) => c.stars >= 40 } },
];

interface Props {
  totalStars: number;
  totalBadges: number;
}

export default function AISkillTree({ totalStars, totalBadges }: Props) {
  const { state } = useAIAcademyXP();
  const xp = state.xp;
  const ctx: BonusCtx = { stars: totalStars, badges: totalBadges, xp };

  // Current milestone = highest one reached
  const currentIdx = MILESTONES.reduce(
    (acc, m, i) => (xp >= m.xp ? i : acc),
    0
  );
  const nextMs = MILESTONES[currentIdx + 1];
  const curMs = MILESTONES[currentIdx];
  const toNextPct = nextMs
    ? Math.min(100, Math.round(((xp - curMs.xp) / (nextMs.xp - curMs.xp)) * 100))
    : 100;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mb-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-slate-950/80 via-primary/5 to-emerald-950/40 backdrop-blur-md p-5 sm:p-7 overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-10 w-64 h-64 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative flex items-center justify-between flex-wrap gap-3 mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-black text-white flex items-center gap-2">
            🌳 Cây kinh nghiệm AI
            <Sparkles className="w-5 h-5 text-emerald-300 animate-pulse" />
          </h2>
          <p className="text-sm text-white/70 mt-1">
            Hành trình {MILESTONES.length} chặng — từ Mầm non đến AI Sensei tài năng Việt Nam
          </p>
        </div>
        <div className="rounded-xl bg-white/10 border border-white/15 px-4 py-2 text-right">
          <div className="text-[11px] uppercase tracking-wide text-white/60">XP hiện tại</div>
          <div className="text-lg font-black text-white">
            {xp.toLocaleString()} <span className="text-emerald-300">XP</span>
          </div>
          {nextMs && (
            <div className="text-[11px] text-white/60">
              Còn {(nextMs.xp - xp).toLocaleString()} XP đến {nextMs.icon} {nextMs.title}
            </div>
          )}
        </div>
      </div>

      {/* Tree */}
      <div className="relative">
        {/* Vertical spine */}
        <div className="absolute left-6 sm:left-8 top-2 bottom-2 w-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="w-full bg-gradient-to-b from-primary via-cyan-400 to-emerald-400 transition-all duration-700"
            style={{
              height: `${
                ((currentIdx + (nextMs ? toNextPct / 100 : 0)) /
                  (MILESTONES.length - 1)) *
                100
              }%`,
            }}
          />
        </div>

        <ul className="space-y-4 sm:space-y-5">
          {MILESTONES.map((m, i) => {
            const reached = xp >= m.xp;
            const isCurrent = i === currentIdx && nextMs !== undefined;
            const bonusUnlocked = m.bonus ? m.bonus.check(ctx) : false;

            return (
              <motion.li
                key={m.lv}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
                className="relative pl-16 sm:pl-20"
              >
                {/* Node */}
                <div className="absolute left-0 top-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                  <motion.div
                    animate={
                      isCurrent
                        ? { scale: [1, 1.08, 1], boxShadow: [
                            "0 0 0 0 hsl(var(--primary) / 0.6)",
                            "0 0 0 12px hsl(var(--primary) / 0)",
                            "0 0 0 0 hsl(var(--primary) / 0)",
                          ] }
                        : {}
                    }
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className={[
                      "relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl sm:text-3xl border-2 transition-all",
                      reached
                        ? "bg-gradient-to-br from-primary to-emerald-500 border-white/60 shadow-lg shadow-primary/40"
                        : "bg-slate-800/80 border-white/15 grayscale opacity-60",
                    ].join(" ")}
                  >
                    <span className={reached ? "" : "opacity-50"}>{m.icon}</span>
                    {reached && !isCurrent && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                    )}
                    {!reached && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-700 border-2 border-slate-950 flex items-center justify-center">
                        <Lock className="w-2.5 h-2.5 text-white/70" />
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Card */}
                <div
                  className={[
                    "rounded-xl border p-3 sm:p-4 backdrop-blur-sm transition-all",
                    isCurrent
                      ? "border-primary/60 bg-primary/15 ring-2 ring-primary/40"
                      : reached
                      ? "border-emerald-400/30 bg-emerald-500/10"
                      : "border-white/10 bg-white/5",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                          Chặng {m.lv}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary text-white">
                            Đang ở đây
                          </span>
                        )}
                      </div>
                      <div className="text-base sm:text-lg font-black text-white">
                        {m.title}
                      </div>
                      <p className="text-xs sm:text-sm text-white/75 mt-0.5">{m.desc}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs text-white/60">Mở khoá tại</div>
                      <div className="text-sm font-black text-emerald-300">
                        {m.xp.toLocaleString()} XP
                      </div>
                    </div>
                  </div>

                  {/* Progress bar to next when current */}
                  {isCurrent && nextMs && (
                    <div className="mt-3">
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${toNextPct}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-primary to-emerald-400"
                        />
                      </div>
                      <div className="text-[11px] text-white/60 mt-1">
                        {toNextPct}% đến {nextMs.title}
                      </div>
                    </div>
                  )}

                  {/* Bonus side-quest */}
                  {m.bonus && (
                    <div
                      className={[
                        "mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-xs sm:text-sm border",
                        bonusUnlocked
                          ? "bg-amber-400/15 border-amber-300/40 text-amber-100"
                          : "bg-white/5 border-white/10 text-white/60",
                      ].join(" ")}
                    >
                      <span className="text-lg">{m.bonus.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold">
                          Nhánh phụ: {m.bonus.title}
                          {bonusUnlocked && (
                            <span className="ml-2 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-300 text-amber-900">
                              Đã mở
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] opacity-90">Điều kiện: {m.bonus.req}</div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </motion.section>
  );
}
