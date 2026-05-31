// IELTS Master Quiz - Mixed comprehensive quiz drawing from all lectures
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft, CheckCircle, XCircle, RotateCcw, Trophy,
  Sparkles, Target, Clock, Zap,
} from "lucide-react";
import { allIeltsLectures } from "@/data/ieltsLecturesData";
import { getLectureQuizWithExtras } from "@/data/ieltsLectureQuizExtras";
import { logStudentActivity } from "@/hooks/useActivityLogger";

type SkillScope = "all" | "reading" | "listening" | "writing" | "speaking";

interface PooledQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  lectureTitle: string;
  lectureTitleVi: string;
  lectureId: string;
  skill: string;
}

const COUNTS = [5, 10, 20, 30, 50] as const;
type QCount = typeof COUNTS[number];

const SKILL_LABELS: Record<SkillScope, { en: string; vi: string; emoji: string }> = {
  all:       { en: "All Skills",  vi: "Tất cả kỹ năng", emoji: "🎯" },
  reading:   { en: "Reading",     vi: "Reading",        emoji: "📖" },
  listening: { en: "Listening",   vi: "Listening",      emoji: "🎧" },
  writing:   { en: "Writing",     vi: "Writing",        emoji: "✍️" },
  speaking:  { en: "Speaking",    vi: "Speaking",       emoji: "🎤" },
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const IeltsMasterQuiz = () => {
  const { t } = useLanguage();

  // Build the full pool once
  const fullPool: PooledQuestion[] = useMemo(() => {
    const pool: PooledQuestion[] = [];
    allIeltsLectures.forEach(lec => {
      const merged = getLectureQuizWithExtras(lec.id, lec.quiz);
      merged.forEach(q => {
        pool.push({
          question: q.question,
          options: q.options,
          answer: q.answer,
          explanation: q.explanation,
          lectureTitle: lec.title,
          lectureTitleVi: lec.titleVi,
          lectureId: lec.id,
          skill: lec.skill ?? "general",
        });
      });
    });
    return pool;
  }, []);

  const [skillScope, setSkillScope] = useState<SkillScope>("all");
  const [count, setCount] = useState<QCount>(10);
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<PooledQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  // Skill-scoped pool size for UI hint
  const scopedPoolSize = useMemo(() => {
    if (skillScope === "all") return fullPool.length;
    return fullPool.filter(q => q.skill === skillScope).length;
  }, [fullPool, skillScope]);

  const startQuiz = () => {
    const scopedPool = skillScope === "all" ? fullPool : fullPool.filter(q => q.skill === skillScope);
    const picked = shuffle(scopedPool).slice(0, count);
    setQuestions(picked);
    setAnswers({});
    setSubmitted(false);
    setCurrentIdx(0);
    setSecondsLeft(count * 45); // 45s per question budget
    setStarted(true);
  };

  // Countdown timer
  useEffect(() => {
    if (!started || submitted) return;
    if (secondsLeft <= 0) {
      setSubmitted(true);
      return;
    }
    const id = window.setInterval(() => setSecondsLeft(s => s - 1), 1000);
    return () => window.clearInterval(id);
  }, [started, submitted, secondsLeft]);

  const score = useMemo(
    () => questions.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0),
    [questions, answers]
  );
  const percent = questions.length ? Math.round((score / questions.length) * 100) : 0;
  const answeredCount = Object.keys(answers).length;

  const handleSubmit = () => {
    setSubmitted(true);
    logStudentActivity({
      activityType: "ielts_master_quiz",
      activityId: `master-quiz-${skillScope}-${count}`,
      score,
      maxScore: questions.length,
      domain: "english",
    });
  };

  const reset = () => {
    setStarted(false);
    setSubmitted(false);
    setAnswers({});
    setQuestions([]);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={t("Quiz Tổng Hợp IELTS | HaiEduTech", "IELTS Master Quiz | HaiEduTech")}
        description={t(
          "Quiz hỏi đáp tổng hợp kiến thức IELTS - chọn 5, 10, 20, 30 hoặc 50 câu, mọi kỹ năng.",
          "IELTS comprehensive Q&A quiz - choose 5, 10, 20, 30 or 50 questions across all skills."
        )}
        path="/ielts-lectures/master-quiz"
      />
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-8">
          <div className="container mx-auto px-4 sm:px-6">
            <Link to="/ielts-lectures" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-3">
              <ChevronLeft className="w-4 h-4 mr-1" /> {t("Quay lại bài giảng IELTS", "Back to IELTS Lectures")}
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                {t("Quiz Tổng Hợp IELTS", "IELTS Master Quiz")}
              </h1>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl">
              {t(
                "Kiểm tra kiến thức tổng hợp các kỹ năng IELTS với câu hỏi được rút ngẫu nhiên từ toàn bộ bài giảng. Chọn số lượng câu và bắt đầu!",
                "Test your comprehensive IELTS knowledge with questions randomly drawn from every lecture. Pick your count and go!"
              )}
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 py-8">
          {!started ? (
            <Card className="max-w-3xl mx-auto">
              <CardContent className="p-6 sm:p-8 space-y-6">
                {/* Skill scope */}
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    {t("1. Chọn phạm vi kỹ năng", "1. Choose skill scope")}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {(Object.keys(SKILL_LABELS) as SkillScope[]).map(k => (
                      <button
                        key={k}
                        onClick={() => setSkillScope(k)}
                        className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                          skillScope === k
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/40 text-foreground"
                        }`}
                      >
                        <div className="text-xl mb-1">{SKILL_LABELS[k].emoji}</div>
                        {t(SKILL_LABELS[k].vi, SKILL_LABELS[k].en)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question count */}
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    {t("2. Chọn số lượng câu hỏi", "2. Choose number of questions")}
                  </h3>
                  <div className="grid grid-cols-5 gap-2">
                    {COUNTS.map(c => (
                      <button
                        key={c}
                        onClick={() => setCount(c)}
                        disabled={c > scopedPoolSize}
                        className={`p-4 rounded-xl border-2 text-lg font-bold transition-all ${
                          count === c
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/40 text-foreground"
                        } disabled:opacity-40 disabled:cursor-not-allowed`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {t(
                      `Tổng kho câu hỏi: ${scopedPoolSize}. Mỗi câu có ${Math.round(45)}s.`,
                      `Total pool: ${scopedPoolSize} questions. ~45s per question budget.`
                    )}
                  </p>
                </div>

                <Button
                  onClick={startQuiz}
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 gap-2"
                  disabled={scopedPoolSize === 0}
                >
                  <Zap className="w-5 h-5" />
                  {t(`Bắt đầu Quiz (${count} câu)`, `Start Quiz (${count} questions)`)}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="max-w-3xl mx-auto space-y-4">
              {/* Status bar */}
              <Card className="sticky top-2 z-10 shadow-md">
                <CardContent className="p-4 flex items-center gap-4 flex-wrap">
                  <Badge variant="outline" className="gap-1.5">
                    <Target className="w-3.5 h-3.5" />
                    {answeredCount}/{questions.length} {t("đã trả lời", "answered")}
                  </Badge>
                  {!submitted && (
                    <Badge variant="outline" className={`gap-1.5 ${secondsLeft < 30 ? "text-destructive border-destructive" : ""}`}>
                      <Clock className="w-3.5 h-3.5" />
                      {formatTime(secondsLeft)}
                    </Badge>
                  )}
                  {submitted && (
                    <Badge className={`gap-1.5 ${percent >= 70 ? "bg-green-500" : percent >= 50 ? "bg-amber-500" : "bg-destructive"} text-white`}>
                      <Trophy className="w-3.5 h-3.5" />
                      {score}/{questions.length} ({percent}%)
                    </Badge>
                  )}
                  <div className="flex-1" />
                  {!submitted ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={answeredCount === 0}
                      size="sm"
                      className="bg-primary text-primary-foreground"
                    >
                      {t("Nộp bài", "Submit")}
                    </Button>
                  ) : (
                    <Button onClick={reset} size="sm" variant="outline" className="gap-1.5">
                      <RotateCcw className="w-3.5 h-3.5" />
                      {t("Làm lại", "New quiz")}
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Progress value={(answeredCount / questions.length) * 100} className="h-2" />

              {/* Questions */}
              <AnimatePresence>
                {questions.map((q, i) => {
                  const userAns = answers[i];
                  const isCorrect = userAns === q.answer;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.03, 0.3) }}
                    >
                      <Card>
                        <CardContent className="p-5 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="text-sm font-semibold text-foreground flex-1">
                              <span className="text-primary mr-2">Q{i + 1}.</span>
                              {q.question}
                            </div>
                            <Badge variant="outline" className="text-[10px] shrink-0">
                              {SKILL_LABELS[(q.skill as SkillScope) ?? "all"]?.emoji ?? "📘"} {q.skill}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            {q.options.map((opt, oi) => {
                              const selected = userAns === oi;
                              const showRight = submitted && oi === q.answer;
                              const showWrong = submitted && selected && oi !== q.answer;
                              return (
                                <button
                                  key={oi}
                                  disabled={submitted}
                                  onClick={() => setAnswers(prev => ({ ...prev, [i]: oi }))}
                                  className={`w-full text-left px-3 py-2 rounded-lg border-2 text-sm flex items-center gap-2 transition-all ${
                                    showRight
                                      ? "border-green-500 bg-green-500/10 text-foreground"
                                      : showWrong
                                      ? "border-destructive bg-destructive/10 text-foreground"
                                      : selected
                                      ? "border-primary bg-primary/10 text-foreground"
                                      : "border-border hover:border-primary/40 text-foreground"
                                  }`}
                                >
                                  <span className="font-bold text-muted-foreground">{String.fromCharCode(65 + oi)}.</span>
                                  <span className="flex-1">{opt}</span>
                                  {showRight && <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />}
                                  {showWrong && <XCircle className="w-4 h-4 text-destructive shrink-0" />}
                                </button>
                              );
                            })}
                          </div>
                          {submitted && (
                            <div className={`text-xs p-3 rounded-lg ${isCorrect ? "bg-green-500/10 text-green-700 dark:text-green-300" : "bg-amber-500/10 text-amber-700 dark:text-amber-300"}`}>
                              <strong>{t("Giải thích:", "Explanation:")} </strong>{q.explanation}
                              <div className="mt-1 text-muted-foreground">
                                {t("Từ bài giảng:", "From lecture:")}{" "}
                                <Link to={`/ielts-lectures/${q.lectureId}`} className="underline hover:text-primary">
                                  {t(q.lectureTitleVi, q.lectureTitle)}
                                </Link>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {!submitted && (
                <Button
                  onClick={handleSubmit}
                  disabled={answeredCount === 0}
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-accent text-white"
                >
                  {t(`Nộp bài (${answeredCount}/${questions.length})`, `Submit (${answeredCount}/${questions.length})`)}
                </Button>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IeltsMasterQuiz;
