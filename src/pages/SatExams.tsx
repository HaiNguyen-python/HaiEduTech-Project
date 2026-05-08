/**
 * @file SatExams.tsx
 * @description Hub for Digital SAT mock exams with real exam timing.
 * Reorganized with tabs (All / R&W / Math / Full) for cleaner categorization
 * and grouped sub-headers within each tab to reduce visual clutter.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ListChecks, Target, Sparkles, Calculator, BookOpen, TimerOff, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { satMockExams, SAT_TYPE_LABELS, type SatMockExam } from "@/data/satMockExamData";
import SatStarToggle from "@/components/sat/SatStarToggle";
import { useSatStarsCount } from "@/hooks/useSatStars";
import { Star } from "lucide-react";

const ICON: Record<string, typeof Calculator> = {
  rw: BookOpen,
  math: Calculator,
  full: Target,
};

type TabKey = "all" | "rw" | "math" | "full";

const SatExams = () => {
  const { t, lang } = useLanguage();
  const studiedCount = useSatStarsCount("sat:exam:");
  const [tab, setTab] = useState<TabKey>("all");

  const grouped = useMemo(() => {
    const rw = satMockExams.filter((e) => e.type === "rw");
    const math = satMockExams.filter((e) => e.type === "math");
    const full = satMockExams.filter((e) => e.type === "full");
    return { rw, math, full };
  }, []);

  const ExamCard = ({ exam, i }: { exam: SatMockExam; i: number }) => {
    const cfg = SAT_TYPE_LABELS[exam.type];
    const Icon = ICON[exam.type] || Target;
    return (
      <motion.div
        key={exam.id}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay: 0.04 * Math.min(i, 6) }}
      >
        <Card className="overflow-hidden h-full hover:shadow-lg transition-all border-l-4" style={{ borderLeftColor: cfg.color }}>
          <CardContent className="p-5 flex flex-col h-full">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${cfg.color}20`, color: cfg.color }}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-base md:text-lg leading-tight">
                  {lang === "vi" ? exam.titleVi : exam.title}
                </h3>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    {cfg.emoji} {cfg.label}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    <Clock className="w-2.5 h-2.5 mr-0.5" /> {exam.duration} {t("phút", "min")}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    {exam.totalQuestions} {t("câu", "Q")}
                  </Badge>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 flex-1">
              {lang === "vi" ? exam.descriptionVi : exam.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              <Link to={`/sat-exams/${exam.id}`} className="flex-1 min-w-[140px]">
                <Button className="w-full bg-gradient-to-r text-white" style={{ backgroundImage: `linear-gradient(to right, ${cfg.color}, ${cfg.color}cc)` }}>
                  <Play className="w-4 h-4 mr-1.5" /> {t("Bắt đầu (canh giờ)", "Start (timed)")}
                </Button>
              </Link>
              <Link to={`/sat-exams/${exam.id}?mode=untimed`}>
                <Button variant="outline">
                  <TimerOff className="w-4 h-4 mr-1.5" /> {t("Không giờ", "Untimed")}
                </Button>
              </Link>
              <SatStarToggle storageKey={`sat:exam:${exam.id}`} size="md" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const SectionHeader = ({ icon: I, color, title, subtitle, count }: { icon: typeof Calculator; color: string; title: string; subtitle: string; count: number }) => (
    <div className="flex items-center gap-3 mb-4 mt-2">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}20`, color }}>
        <I className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-lg md:text-xl font-bold leading-tight">{title}</h2>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <Badge variant="outline" className="shrink-0">{count} {t("đề", "exams")}</Badge>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 lg:pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <Link to="/english/sat" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="w-4 h-4" />
            {t("Quay lại SAT Preparation", "Back to SAT Preparation")}
          </Link>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              {t("Đề thi SAT — đúng thời gian thi thật", "SAT Mock Exams — Real exam timing")}
              <span className="text-base">🎓✨</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-500 bg-clip-text text-transparent">
              🚀 SAT Exams 🎯
            </h1>
            <p className="text-base text-muted-foreground max-w-3xl">
              {t(
                "Các đề thi mẫu Digital SAT có canh giờ chuẩn: module Reading & Writing 32 phút / 27 câu, module Math 35 phút / 22 câu, đề full-length 134 phút / 98 câu. Chiến thôi nào! 💪🔥",
                "Digital SAT mock exams with official timing: R&W modules 32 min / 27 Q, Math modules 35 min / 22 Q, full-length 134 min / 98 Q. Let's crush it! 💪🔥"
              )}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge className="bg-primary/10 text-primary border-primary/30">
                <ListChecks className="w-3 h-3 mr-1" /> {satMockExams.length} {t("đề thi", "mock exams")} 📚
              </Badge>
              <Badge variant="outline">
                <Clock className="w-3 h-3 mr-1" /> {t("Bấm giờ chuẩn SAT", "Official SAT timing")} ⏱️
              </Badge>
              <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30">
                🏆 {t("Săn điểm 1500+", "Aim for 1500+")}
              </Badge>
              <Badge className="bg-pink-500/10 text-pink-700 dark:text-pink-300 border-pink-500/30">
                🧠 {t("Luyện não đỉnh", "Brain workout")}
              </Badge>
              <Badge className="bg-amber-400/15 text-amber-700 dark:text-amber-300 border-amber-400/40">
                <Star className="w-3 h-3 mr-1 fill-amber-400 text-amber-500" />
                {studiedCount} {t("đề đã đánh dấu", "exams marked")}
              </Badge>
            </div>

            {/* Fun motivational strip for high-schoolers */}
            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {[
                { e: "🎯", t: t("Mục tiêu rõ", "Clear goals") },
                { e: "⚡", t: t("Tăng tốc", "Speed up") },
                { e: "🧩", t: t("Tư duy logic", "Logical thinking") },
                { e: "🥇", t: t("Vô địch nhé!", "Be the champ!") },
              ].map((it, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card/60 border border-border/50 backdrop-blur-sm"
                >
                  <span className="text-xl">{it.e}</span>
                  <span className="text-xs font-medium">{it.t}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)} className="w-full">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full mb-6 h-auto">
              <TabsTrigger value="all" className="text-xs sm:text-sm py-2">
                🎯 {t("Tất cả", "All")} <span className="ml-1.5 opacity-70">({satMockExams.length})</span>
              </TabsTrigger>
              <TabsTrigger value="rw" className="text-xs sm:text-sm py-2">
                📖 R&W <span className="ml-1.5 opacity-70">({grouped.rw.length})</span>
              </TabsTrigger>
              <TabsTrigger value="math" className="text-xs sm:text-sm py-2">
                🧮 Math <span className="ml-1.5 opacity-70">({grouped.math.length})</span>
              </TabsTrigger>
              <TabsTrigger value="full" className="text-xs sm:text-sm py-2">
                🏆 Full <span className="ml-1.5 opacity-70">({grouped.full.length})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-10 mt-0">
              <section>
                <SectionHeader icon={BookOpen} color={SAT_TYPE_LABELS.rw.color}
                  title={t("Reading & Writing — Module Practice", "Reading & Writing — Module Practice")}
                  subtitle={t("32 phút · 27 câu mỗi module", "32 min · 27 Q per module")}
                  count={grouped.rw.length} />
                <div className="grid md:grid-cols-2 gap-5">
                  {grouped.rw.map((exam, i) => <ExamCard key={exam.id} exam={exam} i={i} />)}
                </div>
              </section>
              <section>
                <SectionHeader icon={Calculator} color={SAT_TYPE_LABELS.math.color}
                  title={t("Math — Module Practice", "Math — Module Practice")}
                  subtitle={t("35 phút · 22 câu mỗi module · được dùng máy tính", "35 min · 22 Q per module · calculator allowed")}
                  count={grouped.math.length} />
                <div className="grid md:grid-cols-2 gap-5">
                  {grouped.math.map((exam, i) => <ExamCard key={exam.id} exam={exam} i={i} />)}
                </div>
              </section>
              <section>
                <SectionHeader icon={Target} color={SAT_TYPE_LABELS.full.color}
                  title={t("Full-Length Digital SAT", "Full-Length Digital SAT")}
                  subtitle={t("134 phút · 98 câu · 2 R&W + 2 Math", "134 min · 98 Q · 2 R&W + 2 Math")}
                  count={grouped.full.length} />
                <div className="grid md:grid-cols-2 gap-5">
                  {grouped.full.map((exam, i) => <ExamCard key={exam.id} exam={exam} i={i} />)}
                </div>
              </section>
            </TabsContent>

            <TabsContent value="rw" className="mt-0">
              <SectionHeader icon={BookOpen} color={SAT_TYPE_LABELS.rw.color}
                title={t("Reading & Writing — Module Practice", "Reading & Writing — Module Practice")}
                subtitle={t("32 phút · 27 câu mỗi module", "32 min · 27 Q per module")}
                count={grouped.rw.length} />
              <div className="grid md:grid-cols-2 gap-5">
                {grouped.rw.map((exam, i) => <ExamCard key={exam.id} exam={exam} i={i} />)}
              </div>
            </TabsContent>

            <TabsContent value="math" className="mt-0">
              <SectionHeader icon={Calculator} color={SAT_TYPE_LABELS.math.color}
                title={t("Math — Module Practice", "Math — Module Practice")}
                subtitle={t("35 phút · 22 câu mỗi module · được dùng máy tính", "35 min · 22 Q per module · calculator allowed")}
                count={grouped.math.length} />
              <div className="grid md:grid-cols-2 gap-5">
                {grouped.math.map((exam, i) => <ExamCard key={exam.id} exam={exam} i={i} />)}
              </div>
            </TabsContent>

            <TabsContent value="full" className="mt-0">
              <SectionHeader icon={Target} color={SAT_TYPE_LABELS.full.color}
                title={t("Full-Length Digital SAT", "Full-Length Digital SAT")}
                subtitle={t("134 phút · 98 câu · 2 R&W + 2 Math", "134 min · 98 Q · 2 R&W + 2 Math")}
                count={grouped.full.length} />
              <div className="grid md:grid-cols-2 gap-5">
                {grouped.full.map((exam, i) => <ExamCard key={exam.id} exam={exam} i={i} />)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SatExams;
