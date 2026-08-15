/**
 * @file CambridgeYleTestPrep.tsx
 * @description Cambridge YLE Test Prep hub. Exams are grouped into clearly
 *              separated level bands (Starters, Movers, Flyers, KET, PET) with a
 *              sticky level filter so children and parents can find a paper fast.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, GraduationCap, Trophy, BookOpenCheck } from "lucide-react";
import { cambridgeMockExams, CAMBRIDGE_LEVEL_LABELS } from "@/data/cambridgeMockExamData";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingKidsDecor from "@/components/FloatingKidsDecor";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

type Level = "starters" | "movers" | "flyers" | "ket" | "pet";

const LEVEL_ORDER: Level[] = ["starters", "movers", "flyers", "ket", "pet"];

const LEVEL_META: Record<Level, { cefr: string; age: string; ageVi: string; blurb: string; blurbVi: string }> = {
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

const CambridgeYleTestPrep = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Level | "all">("all");

  const grouped = useMemo(
    () =>
      LEVEL_ORDER.map((level) => ({
        level,
        exams: cambridgeMockExams.filter((e) => e.level === level),
      })),
    []
  );

  const visible = filter === "all" ? grouped : grouped.filter((g) => g.level === filter);
  const totalExams = cambridgeMockExams.length;

  return (
    <div
      className="min-h-screen relative"
      style={{ background: "linear-gradient(180deg, #FFFDF7 0%, #FFF3F7 25%, #EEF7FF 55%, #F1FFF3 80%, #FFF8FB 100%)" }}
    >
      <FloatingKidsDecor />
      <Navbar />
      <main className="pt-20 pb-10 relative z-10">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #FFE9F0 0%, #FFFAE6 35%, #E9F5FF 70%, #EDFFEA 100%)" }} />
          <div className="relative container mx-auto px-4 py-8 md:py-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#F9A826] via-[#FF6B9D] to-[#C780FA] border-2 border-white shadow-lg">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#F9A826] to-[#FF6B9D] text-white border-2 border-white shadow-md text-sm font-bold uppercase tracking-wider">
                  🎯 Cambridge YLE
                </span>
              </div>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 leading-tight"
                style={{
                  background: "linear-gradient(135deg, #FF6B9D 0%, #FF9F1C 35%, #6BCB77 70%, #4D96FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t("Cambridge YLE Test Prep 🏆", "Cambridge YLE Test Prep 🏆")}
              </h1>
              <p className="text-slate-700 font-medium" style={{ fontSize: "18px", lineHeight: "1.6" }}>
                {t(
                  `🎈 ${totalExams} đề thi thử Cambridge theo 5 cấp độ: Starters, Movers, Flyers, KET và PET - có bài đọc đầy đủ, chế độ Bấm giờ và Tự do!`,
                  `🎈 ${totalExams} Cambridge mock papers across 5 levels: Starters, Movers, Flyers, KET and PET - full reading texts, Timed and Free modes!`
                )}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Sticky level filter */}
        <div className="sticky top-16 z-20 border-y-2 border-white/70 bg-white/85 backdrop-blur-sm">
          <div className="container mx-auto flex flex-wrap items-center gap-2 px-4 py-3">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
                filter === "all" ? "border-[#7C3AED] bg-[#EDE9FE] text-[#5B21B6]" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              🌈 {t("Tất cả", "All levels")} ({totalExams})
            </button>
            {LEVEL_ORDER.map((level) => {
              const cfg = CAMBRIDGE_LEVEL_LABELS[level];
              const count = grouped.find((g) => g.level === level)?.exams.length ?? 0;
              const active = filter === level;
              return (
                <button
                  key={level}
                  onClick={() => setFilter(level)}
                  className="rounded-full border-2 bg-white px-4 py-2 text-sm font-bold transition-colors"
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
        <section className="container mx-auto px-4 pt-6 pb-8 space-y-10">
          {visible.map(({ level, exams }) => {
            const cfg = CAMBRIDGE_LEVEL_LABELS[level];
            const meta = LEVEL_META[level];
            return (
              <div key={level} className="rounded-3xl border-2 bg-white/80 p-4 md:p-6" style={{ borderColor: `${cfg.color}66` }}>
                {/* Band header */}
                <div className="mb-5 flex flex-wrap items-center gap-3 rounded-2xl px-4 py-3" style={{ background: `${cfg.color}1F` }}>
                  <span className="text-3xl">{cfg.emoji}</span>
                  <div className="min-w-[200px] flex-1">
                    <h2 className="text-2xl font-black" style={{ color: cfg.color }}>
                      {cfg.label}
                    </h2>
                    <p className="text-sm font-semibold text-slate-600">
                      {meta.cefr} · {t(meta.ageVi, meta.age)} · {exams.length} {t("đề", "papers")}
                    </p>
                  </div>
                  <p className="max-w-md text-sm font-medium text-slate-600">{t(meta.blurbVi, meta.blurb)}</p>
                </div>

                {/* Exam cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {exams.map((exam) => {
                    const bestRaw = localStorage.getItem(`cambridge-mock-best-${exam.id}`);
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
                            {cfg.label}
                          </span>
                          {best !== null && (
                            <span
                              className={`ml-auto text-xs font-bold ${best >= 80 ? "text-emerald-600" : best >= 60 ? "text-amber-600" : "text-red-500"}`}
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
              </div>
            );
          })}

          {/* Link back to lectures */}
          <div className="mt-8 text-center">
            <Link to="/cambridge-lectures">
              <Button variant="outline" className="border-2 border-[#C780FA] bg-white text-[#7C3AED] hover:bg-[#F5F3FF] hover:text-[#5B21B6]">
                <GraduationCap className="mr-2 h-4 w-4" />
                {t("Xem mục Cambridge", "Back to Cambridge hub")}
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CambridgeYleTestPrep;
