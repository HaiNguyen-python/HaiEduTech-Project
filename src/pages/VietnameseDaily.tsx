import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { dailyMicroLessons } from "@/data/vietnamese/dailyVietnameseData";

const STORAGE_KEY = "haiedu_daily_vietnamese_completed";

const VietnameseDaily = () => {
  const { t } = useLanguage();
  const [currentDay, setCurrentDay] = useState(1);
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { setCompleted(JSON.parse(stored)); } catch { /* ignore */ }
    }
  }, []);

  const toggleComplete = (day: number) => {
    const next = completed.includes(day) ? completed.filter(d => d !== day) : [...completed, day];
    setCompleted(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const lesson = dailyMicroLessons.find(l => l.day === currentDay) || dailyMicroLessons[0];
  const isDone = completed.includes(currentDay);
  const progress = (completed.length / dailyMicroLessons.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Daily Vietnamese: 1 phút mỗi ngày | HaiEduTech" description="30 bài học siêu ngắn, mỗi bài 1 phút: 1 từ, 1 cụm, 1 câu, 1 thử thách. Học tiếng Việt như Duolingo." path="/learn-vietnamese/daily" />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link to="/learn-vietnamese" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            {t("Quay lại", "Back")}
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-8 h-8 text-blue-500" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("Daily Vietnamese", "Daily Vietnamese")}
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              {t("30 ngày, mỗi ngày 1 phút — xây dựng thói quen học tiếng Việt", "30 days, 1 minute each — build a Vietnamese learning habit")}
            </p>
          </motion.div>

          {/* Progress bar */}
          <Card className="mb-6 border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">
                  {t("Tiến độ tổng", "Overall Progress")}: {completed.length}/30 {t("ngày", "days")}
                </span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>

          {/* Day picker */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <Button
              variant="outline"
              size="icon"
              disabled={currentDay === 1}
              onClick={() => setCurrentDay(d => Math.max(1, d - 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1 text-center">
              <Badge variant="secondary" className="text-base px-4 py-1.5">
                {t(`Ngày ${currentDay}`, `Day ${currentDay}`)} / 30
              </Badge>
            </div>
            <Button
              variant="outline"
              size="icon"
              disabled={currentDay === 30}
              onClick={() => setCurrentDay(d => Math.min(30, d + 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Lesson card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDay}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="border-border/50 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <Badge variant="outline" className="mb-3">
                      🎯 {t(lesson.theme, lesson.themeEn)}
                    </Badge>
                  </div>

                  {/* Word */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40 border border-blue-200 dark:border-blue-900 rounded-xl p-6 mb-4 text-center">
                    <div className="text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300 mb-2">
                      📖 {t("Từ mới", "New Word")}
                    </div>
                    <div className="text-4xl font-bold text-foreground mb-2">{lesson.word.vi}</div>
                    <div className="text-base text-muted-foreground italic">{lesson.word.en}</div>
                  </div>

                  {/* Phrase */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-pink-950/40 border border-purple-200 dark:border-purple-900 rounded-xl p-5 mb-4 text-center">
                    <div className="text-xs font-bold uppercase tracking-wide text-purple-700 dark:text-purple-300 mb-2">
                      💬 {t("Cụm từ", "Phrase")}
                    </div>
                    <div className="text-2xl font-semibold text-foreground mb-1">{lesson.phrase.vi}</div>
                    <div className="text-sm text-muted-foreground italic">{lesson.phrase.en}</div>
                  </div>

                  {/* Sentence */}
                  <div className="bg-gradient-to-br from-emerald-50 to-lime-50 dark:from-emerald-950/40 dark:to-lime-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl p-5 mb-4 text-center">
                    <div className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300 mb-2">
                      📝 {t("Câu ví dụ", "Example Sentence")}
                    </div>
                    <div className="text-lg font-medium text-foreground mb-1">"{lesson.sentence.vi}"</div>
                    <div className="text-sm text-muted-foreground italic">"{lesson.sentence.en}"</div>
                  </div>

                  {/* Challenge */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border border-amber-200 dark:border-amber-900 rounded-xl p-5 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-amber-600" />
                      <div className="text-sm font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">
                        {t("Thử thách hôm nay", "Today's Challenge")}
                      </div>
                    </div>
                    <p className="text-base font-medium text-foreground">{t(lesson.challenge, lesson.challengeEn)}</p>
                  </div>

                  {/* Complete button */}
                  <Button
                    onClick={() => toggleComplete(currentDay)}
                    className="w-full"
                    variant={isDone ? "secondary" : "default"}
                    size="lg"
                  >
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    {isDone ? t("✓ Đã hoàn thành — Bấm để bỏ chọn", "✓ Completed — Click to undo") : t("Đánh dấu hoàn thành", "Mark as Complete")}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Day grid */}
          <div className="mt-8">
            <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
              {t("Tất cả 30 ngày", "All 30 Days")}
            </h3>
            <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
              {dailyMicroLessons.map(l => (
                <button
                  key={l.day}
                  onClick={() => setCurrentDay(l.day)}
                  className={`aspect-square rounded-lg text-sm font-bold transition-all ${
                    currentDay === l.day
                      ? "bg-primary text-primary-foreground ring-2 ring-primary/40"
                      : completed.includes(l.day)
                      ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                      : "bg-muted hover:bg-muted/70 text-muted-foreground"
                  }`}
                >
                  {l.day}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VietnameseDaily;
