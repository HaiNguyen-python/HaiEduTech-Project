/**
 * @file HskHub.tsx
 * @description HSK Exam Guide Hub - select target HSK level (1-6).
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { HSK_LEVEL_GUIDES, HSK_3_UPDATES } from "@/data/hskExamGuide";
import { ArrowRight, BookOpen, Sparkles, Trophy, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HskHub = () => {
  const { t, lang } = useLanguage();
  const [readyLevels, setReadyLevels] = useState<number[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("hsk-ready-levels");
      if (raw) setReadyLevels(JSON.parse(raw));
    } catch {/* noop */}
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4 text-sm">
            <GraduationCap className="w-4 h-4 mr-2 inline" />
            {t("Cẩm nang luyện thi HSK", "HSK Exam Guide")}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
            {t("HSK Hub — Chinh phục mọi cấp độ", "HSK Hub — Master Every Level")}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Chọn cấp độ mục tiêu của bạn. Mỗi hướng dẫn bao gồm cấu trúc đề thi chi tiết, mẹo làm bài chuyên sâu và liên kết tới ngân hàng từ vựng.",
              "Pick your target level. Each guide ships with detailed exam structure, expert strategies, and links to the vocabulary bank."
            )}
          </p>
        </motion.div>

        {/* HSK 3.0 Updates Callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 p-6"
        >
          <div className="flex items-start gap-3 mb-3">
            <Sparkles className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
            <h2 className="text-xl font-bold text-foreground">
              {lang === "vi" ? HSK_3_UPDATES.titleVi : HSK_3_UPDATES.title}
            </h2>
          </div>
          <ul className="space-y-2 ml-9">
            {HSK_3_UPDATES.bullets.map((b, i) => (
              <li key={i} className="text-sm md:text-base text-foreground/90 leading-relaxed">
                <span className="text-emerald-500 font-bold mr-2">▸</span>
                {lang === "vi" ? b.vi : b.en}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Level Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HSK_LEVEL_GUIDES.map((g, i) => {
            const isReady = readyLevels.includes(g.level);
            return (
              <motion.div
                key={g.level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <Link to={`/chinese/hsk-guide/${g.level}`}>
                  <Card className="p-6 h-full hover:shadow-xl hover:border-red-500/40 transition-all cursor-pointer group relative overflow-hidden">
                    {isReady && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 text-xs font-semibold">
                        <Trophy className="w-3 h-3" />
                        {t("Sẵn sàng thi", "Ready for Exam")}
                      </div>
                    )}
                    <div className="text-5xl mb-3">{g.badge}</div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <h3 className="text-2xl font-display font-bold">HSK {g.level}</h3>
                    </div>
                    <p className="text-sm font-semibold text-foreground/80 mb-2">
                      {lang === "vi" ? g.titleVi : g.title}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-4">
                      <span className="px-2 py-0.5 rounded-full bg-secondary">
                        <BookOpen className="w-3 h-3 inline mr-1" />
                        {g.vocabSize} {t("từ", "words")}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-secondary">
                        {g.totalQuestions} Q · {g.totalDuration.split(" ")[0]} min
                      </span>
                    </div>
                    <div className="flex items-center text-red-500 text-sm font-semibold group-hover:gap-2 gap-1 transition-all">
                      {t("Xem hướng dẫn", "View guide")}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Quick links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/chinese/hsk/vocabulary" className="block">
            <Card className="p-5 hover:bg-red-500/5 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-2xl">📖</div>
                <div>
                  <h3 className="font-bold">{t("Ngân hàng từ vựng HSK", "HSK Vocabulary Bank")}</h3>
                  <p className="text-xs text-muted-foreground">{t("1100+ từ, 6 cấp độ", "1100+ words, 6 levels")}</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link to="/speaking-coach/chinese" className="block">
            <Card className="p-5 hover:bg-red-500/5 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-2xl">🎤</div>
                <div>
                  <h3 className="font-bold">{t("Luyện HSKK Speaking", "HSKK Speaking Practice")}</h3>
                  <p className="text-xs text-muted-foreground">{t("AI Coach cho HSK 4-6", "AI Coach for HSK 4-6")}</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HskHub;
