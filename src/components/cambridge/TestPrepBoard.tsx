/**
 * @file TestPrepBoard.tsx
 * @description Shared Cambridge YLE Test Prep board: papers grouped into clearly
 *              separated level bands (Starters, Movers, Flyers, KET, PET) with a
 *              sticky level filter. Used by the Cambridge hub tab and by the
 *              standalone Test Prep page so both stay identical.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, BookOpenCheck, ChevronDown } from "lucide-react";
import { cambridgeMockExams, CAMBRIDGE_LEVEL_LABELS } from "@/data/cambridgeMockExamData";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import CefrProgressChart from "@/components/cambridge/CefrProgressChart";

export type CambridgeLevelKey = "starters" | "movers" | "flyers" | "ket" | "pet";

export const CAMBRIDGE_LEVEL_ORDER: CambridgeLevelKey[] = ["starters", "movers", "flyers", "ket", "pet"];

export const CAMBRIDGE_LEVEL_META: Record<
  CambridgeLevelKey,
  { cefr: string; age: string; ageVi: string; blurb: string; blurbVi: string }
> = {
  starters: {
    cefr: "Pre-A1",
    age: "ages 6-8",
    ageVi: "6-8 tuổi",
    blurb: "First words, colours, animals and very simple sentences.",
    blurbVi: "Từ đầu tiên, màu sắc, con vật và câu rất đơn giản.",
  },
  movers: {
    cefr: "A1",
    age: "ages 8-10",
    ageVi: "8-10 tuổi",
    blurb: "Everyday topics, past simple and short stories.",
    blurbVi: "Chủ đề hằng ngày, thì quá khứ đơn và truyện ngắn.",
  },
  flyers: {
    cefr: "A2",
    age: "ages 9-12",
    ageVi: "9-12 tuổi",
    blurb: "Longer texts, present perfect and school projects.",
    blurbVi: "Bài đọc dài hơn, thì hiện tại hoàn thành và dự án ở trường.",
  },
  ket: {
    cefr: "A2",
    age: "ages 11-14",
    ageVi: "11-14 tuổi",
    blurb: "Emails, notices and real-life A2 reading and listening.",
    blurbVi: "Email, thông báo và bài đọc - nghe A2 thực tế.",
  },
  pet: {
    cefr: "B1",
    age: "ages 13+",
    ageVi: "13 tuổi trở lên",
    blurb: "Articles and opinion texts at independent B1 level.",
    blurbVi: "Bài báo và bài nêu ý kiến ở trình độ B1 độc lập.",
  },
};

/** Sort papers by their trailing number so Test 10 comes after Test 9. */
const paperNumber = (id: string) => {
  const m = id.match(/(\d+)$/);
  return m ? parseInt(m[1], 10) : 0;
};

interface Props {
  /** Distance of the sticky filter bar from the top of the viewport. */
  stickyTopClass?: string;
}

const TestPrepBoard = ({ stickyTopClass = "top-16" }: Props) => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<CambridgeLevelKey | "all">("all");
  const [openLevels, setOpenLevels] = useState<CambridgeLevelKey[]>(["starters"]);

  const toggleLevel = (level: CambridgeLevelKey) =>
    setOpenLevels((prev) => (prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]));

  const grouped = useMemo(
    () =>
      CAMBRIDGE_LEVEL_ORDER.map((level) => ({
        level,
        exams: cambridgeMockExams
          .filter((e) => e.level === level)
          .slice()
          .sort((a, b) => paperNumber(a.id) - paperNumber(b.id)),
      })),
    []
  );

  const visible = filter === "all" ? grouped : grouped.filter((g) => g.level === filter);
  const totalExams = cambridgeMockExams.length;

  return (
    <>
      {/* CEFR competency chart from saved mock results */}
      <CefrProgressChart />

      {/* Sticky level filter */}
      <div className={`sticky ${stickyTopClass} z-20 border-y-2 border-white/70 bg-white/90 backdrop-blur-sm`}>
        <div className="container mx-auto flex flex-wrap items-center gap-2 px-4 py-3">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
              filter === "all"
                ? "border-[#7C3AED] bg-[#EDE9FE] text-[#5B21B6]"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            🌈 {t("Tất cả", "All levels")} ({totalExams})
          </button>
          {CAMBRIDGE_LEVEL_ORDER.map((level) => {
            const cfg = CAMBRIDGE_LEVEL_LABELS[level];
            const count = grouped.find((g) => g.level === level)?.exams.length ?? 0;
            const active = filter === level;
            return (
              <button
                key={level}
                onClick={() => {
                  setFilter(level);
                  setOpenLevels((prev) => (prev.includes(level) ? prev : [...prev, level]));
                }}
                className="rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors"
                style={{
                  borderColor: active ? cfg.color : "#E2E8F0",
                  background: active ? `${cfg.color}1A` : "#fff",
                  color: active ? cfg.color : "#475569",
                }}
              >
                {cfg.emoji} {cfg.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Level bands */}
      <section className="container mx-auto space-y-10 px-4 pb-8 pt-6">
        {visible.map(({ level, exams }) => {
          const cfg = CAMBRIDGE_LEVEL_LABELS[level];
          const meta = CAMBRIDGE_LEVEL_META[level];
          const perPaper = exams[0]?.totalQuestions ?? 0;
          const isOpen = filter === level || openLevels.includes(level);
          return (
            <div key={level} className="rounded-3xl border-2 bg-white/85 p-4 md:p-6" style={{ borderColor: `${cfg.color}66` }}>
              {/* Band header - click to open or close the paper list */}
              <button
                type="button"
                onClick={() => toggleLevel(level)}
                aria-expanded={isOpen}
                className="mb-5 flex w-full flex-wrap items-center gap-3 rounded-2xl px-4 py-3 text-left transition-opacity hover:opacity-90"
                style={{ background: `${cfg.color}1F` }}
              >
                <span className="text-3xl">{cfg.emoji}</span>
                <div className="min-w-[200px] flex-1">
                  <h2 className="text-2xl font-black" style={{ color: cfg.color }}>
                    {cfg.label}
                  </h2>
                  <p className="text-sm font-semibold text-slate-600">
                    {meta.cefr} · {t(meta.ageVi, meta.age)} · {exams.length} {t("đề", "papers")} ·{" "}
                    {t(`${perPaper} câu/đề`, `${perPaper} Qs each`)}
                  </p>
                </div>
                <p className="max-w-md text-sm font-medium text-slate-600">{t(meta.blurbVi, meta.blurb)}</p>
                <span
                  className="ml-auto flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-sm font-bold"
                  style={{ color: cfg.color }}
                >
                  {isOpen ? t("Thu gọn", "Hide") : t("Xem đề", "Show papers")}
                  <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </span>
              </button>

              {/* Exam cards */}
              {isOpen && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {exams.map((exam, index) => {
                  const bestRaw = typeof window !== "undefined" ? localStorage.getItem(`cambridge-mock-best-${exam.id}`) : null;
                  const best = bestRaw ? Math.round((parseInt(bestRaw) / exam.totalQuestions) * 100) : null;
                  const readingCount = exam.questions.filter((q) => q.section === "Reading & Writing").length;
                  const listeningCount = exam.questions.filter((q) => q.section === "Listening").length;
                  return (
                    <div
                      key={exam.id}
                      className="flex flex-col rounded-2xl border-2 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-lg"
                      style={{ borderColor: `${cfg.color}80` }}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <span
                          className="rounded px-2 py-0.5 text-xs font-black uppercase tracking-wider"
                          style={{ background: `${cfg.color}25`, color: cfg.color }}
                        >
                          {cfg.label} #{index + 1}
                        </span>
                        {best !== null && (
                          <span
                            className={`ml-auto text-xs font-bold ${
                              best >= 80 ? "text-emerald-600" : best >= 60 ? "text-amber-600" : "text-red-500"
                            }`}
                          >
                            🏆 {best}%
                          </span>
                        )}
                      </div>
                      <h3 className="mb-2 text-base font-bold leading-snug text-slate-800">{t(exam.titleVi, exam.title)}</h3>
                      <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {exam.duration}m
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpenCheck className="h-4 w-4" />
                          {exam.totalQuestions} {t("câu", "Qs")}
                        </span>
                        <span className="text-xs">
                          📖 {readingCount} · 🎧 {listeningCount}
                        </span>
                      </div>
                      <div className="mt-auto flex gap-2">
                        <Link to={`/cambridge-mock-exam/${exam.id}?mode=timed`} className="flex-1">
                          <Button
                            size="sm"
                            className="w-full bg-gradient-to-r from-[#C780FA] to-[#7C3AED] text-sm font-bold text-white hover:from-[#B25FF7] hover:to-[#6D28D9]"
                          >
                            <Clock className="mr-1 h-4 w-4" />
                            {t("Có giờ", "Timed")}
                          </Button>
                        </Link>
                        <Link to={`/cambridge-mock-exam/${exam.id}?mode=untimed`} className="flex-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full border-2 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                            style={{ borderColor: cfg.color }}
                          >
                            {t("Tự do", "Free")}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
              )}
            </div>
          );
        })}
      </section>
    </>
  );
};

export default TestPrepBoard;
