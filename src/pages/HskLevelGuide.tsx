/**
 * @file HskLevelGuide.tsx
 * @description Detailed HSK level guide: structure table, pro-tips, timed reading, HSKK practice.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { getHskLevel } from "@/data/hskExamGuide";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Lightbulb,
  Mic,
  Target,
  Timer,
  Trophy,
  Volume2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const HskLevelGuide = () => {
  const { level } = useParams<{ level: string }>();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const guide = getHskLevel(Number(level));
  const showPinyinAbove = guide ? guide.level <= 3 : false;

  // Timed Reading state
  const [timerOn, setTimerOn] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(guide?.timedDrill.targetSeconds ?? 30);
  const [drillAnswer, setDrillAnswer] = useState<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!guide) return;
    setSecondsLeft(guide.timedDrill.targetSeconds);
  }, [guide]);

  useEffect(() => {
    if (!timerOn) return;
    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setTimerOn(false);
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [timerOn]);

  if (!guide) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-20 text-center">
          <p>{t("Không tìm thấy cấp độ HSK.", "HSK level not found.")}</p>
          <Button onClick={() => navigate("/chinese/hsk-guide")} className="mt-4">
            {t("Về HSK Hub", "Back to HSK Hub")}
          </Button>
        </main>
      </div>
    );
  }

  const speak = (hanzi: string) => {
    try {
      const u = new SpeechSynthesisUtterance(hanzi);
      u.lang = "zh-CN";
      u.rate = 0.85;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch {/* noop */}
  };

  const markReady = () => {
    try {
      const raw = localStorage.getItem("hsk-ready-levels");
      const list: number[] = raw ? JSON.parse(raw) : [];
      if (!list.includes(guide.level)) list.push(guide.level);
      localStorage.setItem("hsk-ready-levels", JSON.stringify(list));
      toast({
        title: t("🎉 Trạng thái Ready for Exam!", "🎉 Ready for Exam Status Unlocked!"),
        description: t(
          `Chinese Scholar đã sẵn sàng cho HSK ${guide.level}.`,
          `Chinese Scholar is now ready for HSK ${guide.level}.`
        ),
      });
    } catch {/* noop */}
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10 max-w-5xl">
        {/* Breadcrumb */}
        <Link
          to="/chinese/hsk-guide"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> {t("Quay lại HSK Hub", "Back to HSK Hub")}
        </Link>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="text-6xl">{guide.badge}</div>
            <div>
              <Badge variant="secondary" className="mb-1">HSK {guide.level}</Badge>
              <h1 className="text-3xl md:text-4xl font-display font-bold">
                {lang === "vi" ? guide.titleVi : guide.title}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <Stat icon={<BookOpen className="w-4 h-4" />} label={t("Từ vựng", "Vocabulary")} value={`${guide.vocabSize}`} />
            <Stat icon={<Target className="w-4 h-4" />} label={t("Tổng số câu", "Total questions")} value={`${guide.totalQuestions}`} />
            <Stat icon={<Clock className="w-4 h-4" />} label={t("Thời gian", "Duration")} value={guide.totalDuration} />
            <Stat icon={<Trophy className="w-4 h-4" />} label={t("Điểm đạt", "Passing score")} value={guide.passingScore} />
          </div>
        </motion.div>

        {/* Exam Breakdown Tables */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            📋 {t("Cấu trúc đề thi chi tiết", "Exam Breakdown")}
          </h2>
          <div className="space-y-4">
            {guide.sections.map((s, idx) => (
              <Card key={idx} className="p-5 overflow-hidden">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                  <h3 className="text-lg font-bold">
                    {s.name} <span className="text-muted-foreground font-normal text-sm">— {s.nameVi}</span>
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {s.totalQuestions} Q · {s.duration}
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" style={{ minWidth: 600 }}>
                    <thead>
                      <tr className="border-b text-left text-xs uppercase text-muted-foreground">
                        <th className="py-2 pr-3">Part</th>
                        <th className="py-2 pr-3">Q</th>
                        <th className="py-2">{t("Định dạng", "Format")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {s.parts.map((p, pi) => (
                        <tr key={pi} className="border-b last:border-0">
                          <td className="py-3 pr-3 font-semibold">{p.part}</td>
                          <td className="py-3 pr-3">{p.questions}</td>
                          <td className="py-3 text-foreground/90">
                            {lang === "vi" ? p.formatVi : p.format}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            ))}
          </div>

          {guide.writingFocus && (
            <Card className="mt-4 p-5 border-amber-500/30 bg-amber-500/5">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                ✍️ {t("Trọng tâm phần Viết", "Writing focus")}
              </h4>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {lang === "vi" ? guide.writingFocus.descriptionVi : guide.writingFocus.description}
              </p>
            </Card>
          )}
        </section>

        {/* Pro Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-emerald-500" />
            {t("Mẹo làm bài hiệu quả", "Effective Exam-Taking Tips")}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                {t("Mẹo chung", "General Tips")}
              </h3>
              <div className="space-y-3">
                {guide.generalTips.map((tip, i) => <ProTipCard key={i} tip={tip} language={lang} />)}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                {t("Mẹo riêng cho HSK ", "Strategies for HSK ")}{guide.level}
              </h3>
              <div className="space-y-3">
                {guide.levelTips.map((tip, i) => <ProTipCard key={i} tip={tip} language={lang} />)}
              </div>
            </div>
          </div>
        </section>

        {/* Timed Reading Drill */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Timer className="w-6 h-6 text-red-500" />
            {t("Đồng hồ bấm giờ thử thách", "Timed Reading Challenge")}
          </h2>
          <Card className="p-5">
            <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
              <h3 className="font-bold">
                {lang === "vi" ? guide.timedDrill.titleVi : guide.timedDrill.title}
              </h3>
              <div className="flex items-center gap-3">
                <span className={`text-2xl font-mono font-bold ${secondsLeft <= 5 ? "text-red-500 animate-pulse" : "text-foreground"}`}>
                  {secondsLeft}s
                </span>
                {!timerOn ? (
                  <Button
                    size="sm"
                    onClick={() => {
                      setSecondsLeft(guide.timedDrill.targetSeconds);
                      setDrillAnswer(null);
                      setTimerOn(true);
                    }}
                  >
                    {t("Bắt đầu", "Start")}
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => setTimerOn(false)}>
                    {t("Dừng", "Stop")}
                  </Button>
                )}
              </div>
            </div>

            {showPinyinAbove && guide.timedDrill.pinyin && (
              <p className="text-xs text-muted-foreground mb-1 leading-relaxed">{guide.timedDrill.pinyin}</p>
            )}
            <div className="flex items-start gap-2 mb-2">
              <p className="text-xl font-display flex-1 leading-relaxed">{guide.timedDrill.passage}</p>
              <button onClick={() => speak(guide.timedDrill.passage)} className="p-2 rounded-full hover:bg-secondary" aria-label="Play">
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground italic mb-4">{guide.timedDrill.translation}</p>

            <p className="font-semibold mb-3">
              {lang === "vi" ? guide.timedDrill.questionVi : guide.timedDrill.question}
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {guide.timedDrill.options.map((opt, i) => {
                const isPicked = drillAnswer === i;
                const isRight = drillAnswer !== null && i === guide.timedDrill.answerIndex;
                const isWrong = isPicked && i !== guide.timedDrill.answerIndex;
                return (
                  <button
                    key={i}
                    onClick={() => setDrillAnswer(i)}
                    disabled={drillAnswer !== null}
                    className={`text-left p-3 rounded-lg border transition-all text-sm ${
                      isRight
                        ? "border-emerald-500 bg-emerald-500/10"
                        : isWrong
                        ? "border-red-500 bg-red-500/10"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    {opt}
                    {isRight && <CheckCircle2 className="w-4 h-4 text-emerald-500 inline ml-2" />}
                  </button>
                );
              })}
            </div>
          </Card>
        </section>

        {/* HSKK Speaking (HSK 4-6) */}
        {guide.hskkPrompts && guide.hskkPrompts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Mic className="w-6 h-6 text-purple-500" />
              {t("Luyện HSKK Speaking", "HSKK Speaking Practice")}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {guide.hskkPrompts.map((p, i) => (
                <Card key={i} className="p-5 border-purple-500/30 bg-purple-500/5">
                  <Badge variant="secondary" className="mb-2">{p.level}</Badge>
                  {p.hanzi && (
                    <>
                      {p.pinyin && <p className="text-xs text-muted-foreground mb-1">{p.pinyin}</p>}
                      <div className="flex items-start gap-2 mb-2">
                        <p className="font-display text-lg flex-1">{p.hanzi}</p>
                        <button onClick={() => speak(p.hanzi!)} className="p-2 rounded-full hover:bg-secondary" aria-label="Play">
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                  <p className="text-sm text-foreground/90 mb-2">
                    {lang === "vi" ? p.promptVi : p.prompt}
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    ⏱ {p.durationSeconds}s {t("để trả lời", "to respond")}
                  </p>
                  <Link to="/speaking-coach/chinese">
                    <Button size="sm" variant="outline" className="w-full">
                      <Mic className="w-3 h-3 mr-1" />
                      {t("Mở AI Speaking Coach", "Open AI Speaking Coach")}
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Frequent Words */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            🔥 {t("Từ thường gặp nhất", "Most Frequently Tested Words")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {guide.frequentWords.map((w, i) => (
              <Card key={i} className="p-3 hover:border-red-500/40 transition-all group">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    {showPinyinAbove && (
                      <p className="text-xs text-muted-foreground">{w.pinyin}</p>
                    )}
                    <p className="font-display text-xl">{w.hanzi}</p>
                    {!showPinyinAbove && (
                      <p className="text-xs text-muted-foreground italic">{w.pinyin}</p>
                    )}
                    <p className="text-xs text-foreground/80 mt-1">
                      {lang === "vi" ? w.meaningVi : w.meaning}
                    </p>
                  </div>
                  <button onClick={() => speak(w.hanzi)} className="p-1.5 rounded-full hover:bg-secondary opacity-60 group-hover:opacity-100" aria-label="Play">
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <Badge variant="outline" className="mt-2 text-[10px]">{w.category}</Badge>
              </Card>
            ))}
          </div>
          <Link to={guide.vocabLink}>
            <Button variant="outline" className="mt-4">
              {t("Xem toàn bộ từ vựng HSK ", "View all HSK ")}{guide.level}{t(" trong Vocab Bank", " vocabulary")}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </section>

        {/* Bottom CTA */}
        <section className="rounded-2xl p-6 md:p-8 bg-gradient-to-r from-red-500/10 via-amber-500/10 to-emerald-500/10 border">
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <div>
              <h3 className="text-xl font-bold mb-1">
                {t("Sẵn sàng bước vào phòng thi?", "Ready for the exam room?")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(
                  "Mở Mock Test Preview để làm quen format, hoặc đánh dấu Chinese Scholar đã 'Sẵn sàng thi'.",
                  "Open the Mock Test Preview to drill the format, or mark your Chinese Scholar as 'Ready for Exam'."
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to={guide.vocabLink}>
                <Button variant="outline">
                  📝 {t("Mock Test Preview", "Mock Test Preview")}
                </Button>
              </Link>
              <Button onClick={markReady} className="bg-gradient-to-r from-emerald-500 to-teal-500">
                <Trophy className="w-4 h-4 mr-1" />
                {t("Tôi đã sẵn sàng", "Mark as Ready")}
              </Button>
            </div>
          </div>
        </section>

        {/* Level navigation */}
        <div className="mt-8 flex justify-between">
          {guide.level > 1 ? (
            <Link to={`/chinese/hsk-guide/${guide.level - 1}`}>
              <Button variant="ghost"><ArrowLeft className="w-4 h-4 mr-1" />HSK {guide.level - 1}</Button>
            </Link>
          ) : <span />}
          {guide.level < 6 && (
            <Link to={`/chinese/hsk-guide/${guide.level + 1}`}>
              <Button variant="ghost">HSK {guide.level + 1}<ArrowRight className="w-4 h-4 ml-1" /></Button>
            </Link>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Stat = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <Card className="p-3">
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
      {icon} {label}
    </div>
    <p className="font-bold text-base text-foreground">{value}</p>
  </Card>
);

const ProTipCard = ({
  tip,
  language,
}: {
  tip: { title: string; titleVi: string; body: string; bodyVi: string };
  language: string;
}) => (
  <div className="rounded-xl p-4 bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/30">
    <div className="flex items-start gap-2">
      <span className="text-xl shrink-0">💡</span>
      <div>
        <h4 className="font-bold text-foreground mb-1">
          {language === "vi" ? tip.titleVi : tip.title}
        </h4>
        <p className="text-sm text-foreground/85 leading-relaxed">
          {language === "vi" ? tip.bodyVi : tip.body}
        </p>
      </div>
    </div>
  </div>
);

export default HskLevelGuide;
