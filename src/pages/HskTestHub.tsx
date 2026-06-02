/**
 * @file HskTestHub.tsx - Landing for HSK 1-9 mock tests with per-level tabs.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { HSK_TESTS_BY_LEVEL, totalQuestions } from "@/data/hskTests";
import { ArrowRight, ClipboardCheck, Clock, GraduationCap, Headphones, BookOpen, PenLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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

const LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

const HskTestHub = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState<string>("1");

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="HSK Test 1-9: 27 Đề Thi Thử Chuẩn HSK 3.0 Online | HaiEduTech"
        description="Bộ đề thi thử HSK 1 đến HSK 9 (HSK 3.0) phân loại theo cấp độ, mô phỏng chuẩn Hanban với phần Nghe (TTS), Đọc và Viết. Tự chấm điểm và giải thích chi tiết."
        path="/chinese/hsk/test"
      />
      <Navbar />
      <main className="container mx-auto px-4 py-10 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Badge variant="secondary" className="mb-3"><ClipboardCheck className="w-4 h-4 mr-1 inline" /> {t("Phòng thi HSK", "HSK Test Room")}</Badge>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3 bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
            {t("HSK Test - Đề thi thử HSK 1-9", "HSK Test - Mock Exams HSK 1-9")}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Đề thi mô phỏng chuẩn Hanban (HSK 3.0 - 9 cấp độ): chọn cấp độ bên dưới để xem các đề thi tương ứng. Mỗi cấp có nhiều đề (Mock 01, 02, 03…).",
              "Hanban-style mock exams (HSK 3.0 - 9 levels): pick a level below to view its tests. Each level offers multiple mocks (Mock 01, 02, 03…)."
            )}
          </p>
        </motion.div>

        <Tabs value={active} onValueChange={setActive} className="w-full">
          {/* Level tabs - scrollable on mobile */}
          <div className="overflow-x-auto -mx-4 px-4 mb-6">
            <TabsList className="inline-flex h-auto p-1 bg-muted/60 rounded-xl">
              {LEVELS.map((lv) => {
                const count = HSK_TESTS_BY_LEVEL[lv]?.length ?? 0;
                return (
                  <TabsTrigger
                    key={lv}
                    value={String(lv)}
                    className={`relative px-4 py-2 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:${LEVEL_COLORS[lv]} data-[state=active]:text-white font-semibold whitespace-nowrap`}
                  >
                    HSK {lv}
                    <span className="ml-1.5 text-[10px] opacity-75">({count})</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {LEVELS.map((lv) => {
            const tests = HSK_TESTS_BY_LEVEL[lv] ?? [];
            return (
              <TabsContent key={lv} value={String(lv)} className="mt-0">
                <div className="mb-5 flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${LEVEL_COLORS[lv]} flex items-center justify-center text-white font-bold text-xl shadow-md`}>
                    {lv}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">HSK {lv}</h2>
                    <p className="text-sm text-muted-foreground">
                      {tests.length} {t("đề thi thử", "mock tests")}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {tests.map((test, variantIdx) => {
                    const total = totalQuestions(test);
                    const hasWriting = test.sections.some((s) => s.id === "writing");
                    const isDefault = variantIdx === 0;
                    const href = isDefault
                      ? `/chinese/hsk/test/${lv}`
                      : `/chinese/hsk/test/${lv}/${test.code}`;
                    const variantLabel = test.code.split("-").slice(-2).join(" ");
                    return (
                      <motion.div
                        key={test.code}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: variantIdx * 0.05 }}
                      >
                        <Link
                          to={href}
                          className="group block rounded-2xl border-2 border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all"
                        >
                          <div className={`h-2 bg-gradient-to-r ${LEVEL_COLORS[lv]}`} />
                          <div className="p-5">
                            <div className="flex items-center justify-between mb-3">
                              <Badge variant="outline" className="text-[10px] font-mono uppercase">{variantLabel}</Badge>
                              <GraduationCap className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <p className="text-base text-foreground font-semibold mb-1">{test.titleVi}</p>
                            <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{test.introVi}</p>

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
              </TabsContent>
            );
          })}
        </Tabs>

        <div className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-sm text-foreground">
          💡 <strong>{t("Mẹo của thầy Hải:", "Teacher Hai's tip:")}</strong>{" "}
          {t(
            "Hãy thi thử cả 3 đề Mock của mỗi cấp - lần đầu để làm quen format, các lần sau bấm giờ nghiêm túc như phòng thi thật. Phần Nghe được TTS đọc bằng tiếng Trung Phổ thông.",
            "Take all three mocks per level - first to learn the format, then time yourself like the real test. Listening prompts are read aloud in Mandarin via TTS."
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HskTestHub;
