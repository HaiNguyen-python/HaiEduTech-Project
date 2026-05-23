/**
 * @file HskTestHub.tsx - Landing for the HSK 1-6 mock tests.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { HSK_TESTS, totalQuestions } from "@/data/hskTests";
import { ArrowRight, ClipboardCheck, Clock, GraduationCap, Headphones, BookOpen, PenLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const LEVEL_COLORS: Record<number, string> = {
  1: "from-emerald-500 to-teal-500",
  2: "from-sky-500 to-cyan-500",
  3: "from-violet-500 to-indigo-500",
  4: "from-amber-500 to-orange-500",
  5: "from-rose-500 to-pink-600",
  6: "from-red-600 to-rose-700",
  7: "from-fuchsia-500 to-purple-600",
  8: "from-purple-600 to-indigo-700",
  9: "from-slate-700 to-zinc-900",
};

const HskTestHub = () => {
  const { t } = useLanguage();
  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="HSK Test 1-9: Đề Thi Thử Chuẩn HSK 3.0 Online | HaiEduTech"
        description="Bộ đề thi thử HSK 1 đến HSK 9 (HSK 3.0) mô phỏng chuẩn Hanban với phần Nghe (TTS tự động), Đọc và Viết. Tự chấm điểm và giải thích chi tiết."
        path="/chinese/hsk/test"
      />
      <Navbar />
      <main className="container mx-auto px-4 py-10 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <Badge variant="secondary" className="mb-3"><ClipboardCheck className="w-4 h-4 mr-1 inline" /> {t("Phòng thi HSK", "HSK Test Room")}</Badge>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
            {t("HSK Test - Đề thi thử HSK 1-9", "HSK Test - Mock Exams HSK 1-9")}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Đề thi mô phỏng chuẩn Hanban (HSK 3.0 - 9 cấp độ): đầy đủ phần Nghe (đọc bằng TTS tiếng Trung), Đọc và Viết. Tự chấm điểm, hiển thị giải thích chi tiết sau mỗi câu.",
              "Hanban-style mock exams (HSK 3.0 — 9 levels): full Listening (Chinese TTS), Reading, and Writing sections. Auto-graded with detailed explanations."
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {levels.map((lv, i) => {
            const test = HSK_TESTS[lv];
            const total = totalQuestions(test);
            const hasWriting = test.sections.some(s => s.id === "writing");
            return (
              <motion.div
                key={lv}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={`/chinese/hsk/test/${lv}`}
                  className="group block rounded-2xl border-2 border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  <div className={`h-2 bg-gradient-to-r ${LEVEL_COLORS[lv]}`} />
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-2xl font-bold text-foreground">HSK {lv}</h2>
                      <GraduationCap className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm text-foreground font-medium mb-1">{test.titleVi}</p>
                    <p className="text-xs text-muted-foreground mb-4">{test.introVi}</p>

                    <div className="flex flex-wrap gap-2 mb-4 text-xs">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary text-foreground">
                        <ClipboardCheck className="w-3 h-3" /> {total} {t("câu", "Q")}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary text-foreground">
                        <Clock className="w-3 h-3" /> {test.durationMin} {t("phút", "min")}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary text-foreground">
                        <Headphones className="w-3 h-3" /> {t("Nghe", "Listen")}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary text-foreground">
                        <BookOpen className="w-3 h-3" /> {t("Đọc", "Read")}
                      </span>
                      {hasWriting && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary text-foreground">
                          <PenLine className="w-3 h-3" /> {t("Viết", "Write")}
                        </span>
                      )}
                    </div>

                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:underline">
                      {t("Bắt đầu thi", "Start exam")} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-sm text-foreground">
          💡 <strong>{t("Mẹo của thầy Hải:", "Teacher Hai's tip:")}</strong>{" "}
          {t(
            "Hãy thi thử ít nhất 2 lần - lần đầu để làm quen format, lần hai để bấm giờ nghiêm túc như phòng thi thật. Phần Nghe sẽ được TTS đọc bằng tiếng Trung Phổ thông.",
            "Take each mock at least twice — first to learn the format, second to time yourself like the real test. Listening prompts are read aloud in Mandarin via TTS."
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HskTestHub;
