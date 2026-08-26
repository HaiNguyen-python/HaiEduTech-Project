/**
 * @file CefrProgressChart.tsx
 * @description CEFR competency chart shown at the top of the Cambridge Test
 *              Prep board. Turns the student's saved mock scores into a visual
 *              A1 to B2 position with per-level bars and a next-step hint.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { motion } from "framer-motion";
import { TrendingUp, Target, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { CAMBRIDGE_LEVEL_LABELS } from "@/data/cambridgeMockExamData";
import { useCambridgeCefr } from "@/hooks/useCambridgeCefr";
import { CEFR_LABEL, MASTERY_THRESHOLD, MIN_PAPERS_FOR_MASTERY } from "@/lib/cambridgeCefrModel";

const CefrProgressChart = () => {
  const { t } = useLanguage();
  const snap = useCambridgeCefr();
  const workingCfg = CAMBRIDGE_LEVEL_LABELS[snap.workingLevel];
  const workingCefr = CEFR_LABEL[snap.workingLevel];

  return (
    <section className="container mx-auto px-4 pt-6">
      <div className="rounded-3xl border-2 border-[#3B82F6]/40 bg-white/90 p-4 shadow-sm md:p-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#10B981] text-white">
            <TrendingUp className="h-6 w-6" />
          </span>
          <div className="min-w-[220px] flex-1">
            <h2 className="text-xl font-black text-slate-800 md:text-2xl">
              {t("Năng lực của bạn trên thang CEFR", "Your level on the CEFR scale")}
            </h2>
            <p className="text-sm font-medium text-slate-600">
              {t(
                "Tính từ điểm cao nhất của các đề bạn đã làm trên trang này.",
                "Calculated from your best scores on the papers you have taken here."
              )}
            </p>
          </div>
          <div className="rounded-2xl bg-[#3B82F6]/10 px-4 py-2 text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-[#3B82F6]">
              {t("Hiện tại", "Current")}
            </p>
            <p className="text-2xl font-black text-[#1D4ED8]">{snap.currentCefr}</p>
          </div>
        </div>

        {/* Scale bar from Pre-A1 to B1/B2 */}
        <div className="mb-2 mt-1">
          <div className="relative h-5 w-full overflow-hidden rounded-full bg-slate-100">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#10B981]"
              initial={{ width: 0 }}
              animate={{ width: `${snap.scalePercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="mt-1 flex justify-between text-[11px] font-bold text-slate-500">
            <span>Pre-A1</span>
            <span>A1</span>
            <span>A2</span>
            <span>A2+</span>
            <span>B1</span>
            <span>B2</span>
          </div>
        </div>

        {/* Per-level bars */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {snap.levels.map((lv) => {
            const cfg = CAMBRIDGE_LEVEL_LABELS[lv.level];
            return (
              <div
                key={lv.level}
                className="rounded-2xl border-2 p-3"
                style={{ borderColor: `${cfg.color}55`, background: `${cfg.color}0F` }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black" style={{ color: cfg.color }}>
                    {cfg.emoji} {cfg.label}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{lv.cefr}</span>
                </div>
                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: cfg.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${lv.average}%` }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                </div>
                <p className="mt-2 text-xs font-semibold text-slate-600">
                  {lv.attempted > 0
                    ? t(
                        `TB ${lv.average}% · cao nhất ${lv.best}% · ${lv.attempted}/${lv.total} đề`,
                        `Avg ${lv.average}% · best ${lv.best}% · ${lv.attempted}/${lv.total} papers`
                      )
                    : t(`Chưa làm đề nào (0/${lv.total})`, `No papers yet (0/${lv.total})`)}
                </p>
                {lv.mastered && (
                  <p className="mt-1 flex items-center gap-1 text-xs font-bold text-emerald-600">
                    <Sparkles className="h-3.5 w-3.5" /> {t("Đã đạt", "Mastered")}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Next step */}
        <div className="mt-5 flex flex-wrap items-start gap-3 rounded-2xl bg-slate-50 p-4">
          <Target className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#10B981]" />
          <p className="min-w-[240px] flex-1 text-sm font-medium text-slate-700">
            {snap.totalAttempted === 0
              ? t(
                  "Hãy làm 2 đề ở cấp độ phù hợp để hệ thống xác định trình độ CEFR của bạn.",
                  "Take 2 papers at a suitable level so the system can place you on the CEFR scale."
                )
              : t(
                  `Bước tiếp theo: đạt trung bình ${MASTERY_THRESHOLD}% ở ${workingCfg.label} (${workingCefr}) với ít nhất ${MIN_PAPERS_FOR_MASTERY} đề. Bạn còn thiếu ${snap.gapToNext}%.`,
                  `Next step: reach a ${MASTERY_THRESHOLD}% average at ${workingCfg.label} (${workingCefr}) across at least ${MIN_PAPERS_FOR_MASTERY} papers. You are ${snap.gapToNext}% short.`
                )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CefrProgressChart;
