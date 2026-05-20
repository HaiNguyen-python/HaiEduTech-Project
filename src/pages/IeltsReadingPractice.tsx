/**
 * @file IeltsReadingPractice.tsx
 * @description IELTS Reading Practice hub with two modes:
 *   1) Quick Exercises — links into the embedded reading drills in lectures
 *   2) Ultimate Full-Text Exam Challenges — immersive split-screen exam engine
 *      featuring a countdown timer, question-navigation matrix, multiple
 *      formats (MCQ, matching headings, fill-blank) and a review mode.
 *   The Quick Exercises area is intentionally a re-entry point: choosing an
 *   exam opens an overlay; the user's selection state is preserved underneath.
 */
import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ArrowLeft, BookOpen, Trophy, Clock, Timer, X, CheckCircle2,
  XCircle, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import SEO from "@/components/SEO";
import {
  IELTS_FULL_READING_EXAMS,
  type ReadingExam,
  type ReadingQuestion,
} from "@/data/ieltsFullReadingExams";

// ============================================================
// Split-screen Full-Text Exam Engine
// ============================================================

interface ExamEngineProps {
  exam: ReadingExam;
  onClose: () => void;
}

const ExamEngine: React.FC<ExamEngineProps> = ({ exam, onClose }) => {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(exam.durationMinutes * 60);
  const [activeQ, setActiveQ] = useState<number>(exam.questions[0].number);

  // Countdown timer
  useEffect(() => {
    if (submitted) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          setSubmitted(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [submitted]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const timerLow = secondsLeft < 120;

  const score = useMemo(() => {
    let s = 0;
    for (const q of exam.questions) {
      const ans = (answers[q.number] || "").trim().toLowerCase();
      if (ans && ans === q.answer.toLowerCase()) s += 1;
    }
    return s;
  }, [answers, exam.questions]);

  const handleAnswer = useCallback((qNum: number, value: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qNum]: value }));
  }, [submitted]);

  const handleSubmit = () => setSubmitted(true);

  // Confirm before leaving mid-exam
  const handleClose = () => {
    if (!submitted && Object.keys(answers).length > 0) {
      const ok = window.confirm(
        t("Bạn chắc muốn thoát? Câu trả lời sẽ bị mất.", "Are you sure you want to exit? Your answers will be lost.")
      );
      if (!ok) return;
    }
    onClose();
  };

  // Scroll the active question into view when picked from the matrix
  useEffect(() => {
    const el = document.getElementById(`q-${activeQ}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeQ]);

  return (
    <div className="fixed inset-0 z-[60] bg-background flex flex-col">
      {/* Sticky control bar */}
      <header className="border-b bg-card shadow-sm shrink-0">
        <div className="container mx-auto px-3 sm:px-4 py-2.5 flex items-center gap-3 flex-wrap">
          <Button variant="ghost" size="sm" onClick={handleClose} aria-label="Close">
            <X className="w-4 h-4 mr-1" /> {t("Thoát", "Exit")}
          </Button>

          <div className="font-semibold text-sm text-foreground truncate flex-1 min-w-[160px]">
            📖 {exam.title}
            <Badge variant="outline" className="ml-2 text-[10px]">{exam.level}</Badge>
          </div>

          {/* Timer */}
          <div className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-sm font-bold",
            timerLow ? "bg-destructive/10 border-destructive text-destructive animate-pulse" : "bg-muted border-border text-foreground"
          )}>
            <Timer className="w-4 h-4" />
            {mm}:{ss}
          </div>

          {/* Question navigation matrix */}
          <div className="flex flex-wrap gap-1 items-center">
            {exam.questions.map((q) => {
              const answered = !!answers[q.number];
              const correct = submitted && (answers[q.number] || "").trim().toLowerCase() === q.answer.toLowerCase();
              const wrong = submitted && !correct;
              return (
                <button
                  key={q.number}
                  onClick={() => setActiveQ(q.number)}
                  aria-label={`Question ${q.number}`}
                  className={cn(
                    "w-7 h-7 rounded text-xs font-semibold border transition-all",
                    activeQ === q.number && "ring-2 ring-primary ring-offset-1",
                    submitted
                      ? correct
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : wrong
                          ? "bg-destructive text-white border-destructive"
                          : "bg-muted text-muted-foreground border-border"
                      : answered
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:border-primary/50"
                  )}
                >
                  {q.number}
                </button>
              );
            })}
          </div>

          {!submitted ? (
            <Button size="sm" onClick={handleSubmit} className="bg-gradient-to-r from-primary to-emerald-500 text-white">
              {t("Nộp bài", "Submit Test")}
            </Button>
          ) : (
            <Badge className="text-sm px-3 py-1">
              {t("Điểm: ", "Score: ")}{score}/{exam.questions.length}
            </Badge>
          )}
        </div>
      </header>

      {/* Split-screen dual panes */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* LEFT — Passage (white, high-contrast academic) */}
        <section
          aria-label="Reading passage"
          className="overflow-y-auto bg-white dark:bg-slate-900 border-r"
        >
          <div className="max-w-2xl mx-auto px-5 md:px-8 py-6 md:py-8">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
              {exam.passageTitle}
            </h2>
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-5">
              {t("Đoạn văn", "Reading Passage")}
            </p>
            <article className="prose prose-slate dark:prose-invert max-w-none text-[15px] leading-[1.85] font-['Georgia',_'Merriweather',_serif] text-slate-900 dark:text-slate-100">
              {exam.passage.split("\n\n").map((para, i) => (
                <p key={i} className="mb-4">{para}</p>
              ))}
            </article>
          </div>
        </section>

        {/* RIGHT — Questions */}
        <section
          aria-label="Questions"
          className="overflow-y-auto bg-background"
        >
          <div className="max-w-2xl mx-auto px-5 md:px-8 py-6 md:py-8 space-y-6">
            {exam.questions.map((q) => (
              <QuestionBlock
                key={q.number}
                question={q}
                value={answers[q.number] || ""}
                onChange={(v) => handleAnswer(q.number, v)}
                submitted={submitted}
                onFocus={() => setActiveQ(q.number)}
              />
            ))}
            {submitted && (
              <div className="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-emerald-500/5 p-5 text-center">
                <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-bold text-lg">
                  {t("Kết quả", "Final Score")}: {score}/{exam.questions.length}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {score === exam.questions.length
                    ? t("Xuất sắc!", "Excellent!")
                    : score >= exam.questions.length * 0.7
                      ? t("Tốt — gần Band 7!", "Strong — around Band 7!")
                      : t("Tiếp tục luyện tập!", "Keep practising!")}
                </p>
                <div className="mt-3 flex gap-2 justify-center">
                  <Button variant="outline" size="sm" onClick={onClose}>
                    <ArrowLeft className="w-4 h-4 mr-1" /> {t("Quay lại danh sách", "Back to list")}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

// ============================================================
// Question renderer — handles all 3 supported formats
// ============================================================

interface QBlockProps {
  question: ReadingQuestion;
  value: string;
  onChange: (v: string) => void;
  submitted: boolean;
  onFocus: () => void;
}

const QuestionBlock: React.FC<QBlockProps> = ({ question: q, value, onChange, submitted, onFocus }) => {
  const correct = submitted && value.trim().toLowerCase() === q.answer.toLowerCase();
  const wrong = submitted && value && !correct;

  return (
    <div
      id={`q-${q.number}`}
      onFocus={onFocus}
      onClick={onFocus}
      className={cn(
        "rounded-xl border bg-card p-4 transition-all",
        submitted && (correct ? "border-emerald-500 bg-emerald-500/5" : wrong ? "border-destructive bg-destructive/5" : "")
      )}
    >
      <div className="flex items-start gap-3 mb-3">
        <Badge variant="outline" className="font-bold text-sm shrink-0">{q.number}</Badge>
        <p className="text-sm font-medium text-foreground leading-relaxed">{q.prompt}</p>
        {submitted && (correct
          ? <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />
          : wrong ? <XCircle className="w-5 h-5 text-destructive ml-auto shrink-0" /> : null
        )}
      </div>

      {q.type === "multiple-choice" && q.options && (
        <div className="space-y-2 pl-9">
          {q.options.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            const selected = value === opt;
            const isCorrect = submitted && opt.toLowerCase() === q.answer.toLowerCase();
            return (
              <label
                key={opt}
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer transition-colors",
                  submitted
                    ? isCorrect
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200"
                      : selected
                        ? "border-destructive bg-destructive/10"
                        : "border-border text-muted-foreground"
                    : selected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                )}
              >
                <input
                  type="radio"
                  name={`q-${q.number}`}
                  value={opt}
                  checked={selected}
                  onChange={(e) => onChange(e.target.value)}
                  disabled={submitted}
                  className="accent-primary"
                />
                <span className="font-bold mr-1">{letter}.</span>
                <span>{opt}</span>
              </label>
            );
          })}
        </div>
      )}

      {q.type === "matching-headings" && q.headings && (
        <div className="pl-9">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={submitted}
            className={cn(
              "w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30",
              submitted && (correct ? "border-emerald-500" : wrong ? "border-destructive" : "")
            )}
          >
            <option value="">— Select a heading —</option>
            {q.headings.map((h) => (
              <option key={h.label} value={h.label}>
                {h.label}. {h.text}
              </option>
            ))}
          </select>
        </div>
      )}

      {q.type === "fill-blank" && (
        <div className="pl-9">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={submitted}
            placeholder="Type your answer..."
            className={cn(
              "w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30",
              submitted && (correct ? "border-emerald-500" : wrong ? "border-destructive" : "")
            )}
          />
        </div>
      )}

      {submitted && (
        <div className="mt-3 pl-9 text-xs space-y-1">
          {!correct && (
            <p className="text-emerald-700 dark:text-emerald-400">
              ✓ {q.answer}
            </p>
          )}
          {q.explanation && (
            <p className="text-muted-foreground italic">💡 {q.explanation}</p>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================================
// Page shell
// ============================================================

const IeltsReadingPractice: React.FC = () => {
  const { t } = useLanguage();
  const [activeExam, setActiveExam] = useState<ReadingExam | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="IELTS Reading Practice — Full-Text Mock Exams | HaiEduTech"
        description="Luyện đọc IELTS với bài tập nhanh và bộ đề full-text mô phỏng thi thật: split-screen, timer, ma trận câu hỏi, MCQ, matching headings, fill-in-the-blanks."
        path="/ielts-reading-practice"
      />
      <Navbar />
      <main className="pt-4 pb-16">
        <section className="container mx-auto px-4 sm:px-6 pt-2 pb-4">
          <Link to="/ielts-lectures" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="w-4 h-4" /> {t("Quay lại bài giảng", "Back to lectures")}
          </Link>
          <div className="flex items-start gap-4 flex-wrap">
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-blue-500/15 flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-[260px]">
              <Badge variant="outline" className="mb-2 text-xs bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300">
                {t("Mô phỏng đề thi thật", "Real exam simulation")}
              </Badge>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {t("Luyện Đọc IELTS — Bài tập nhanh & Đề full-text", "IELTS Reading Practice — Quick drills & Full-text exams")}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base max-w-3xl">
                {t(
                  "Tổng hợp đầy đủ: bài tập ngắn theo dạng câu hỏi và đề full-text mô phỏng phòng thi thật với màn hình chia đôi, timer, và ma trận navigation.",
                  "All-in-one: short drills by question type plus full-text mock exams in an immersive split-screen exam room with timer and question matrix."
                )}
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6">
          <Tabs defaultValue="quick" className="w-full">
            <TabsList className="grid w-full max-w-xl grid-cols-2">
              <TabsTrigger value="quick">
                {t("⚡ Bài tập nhanh", "⚡ Quick Exercises")}
              </TabsTrigger>
              <TabsTrigger value="full">
                {t("🏆 Đề full-text", "🏆 Full-Text Exams")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quick" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    {t("Bài tập đọc theo từng dạng câu hỏi", "Reading drills by question type")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {t(
                      "Các bài tập nhanh được nhúng trong các bài giảng Reading. Mỗi bài giảng có 1 đoạn văn ngắn + nhiều dạng câu hỏi: Skimming, Scanning, True/False/NG, Matching Headings, Multiple Choice.",
                      "Quick drills are embedded inside the Reading lectures. Each lecture has a short passage + multiple question types: Skimming, Scanning, True/False/NG, Matching Headings, Multiple Choice."
                    )}
                  </p>
                  <Button asChild>
                    <Link to="/ielts-lectures?focus=reading">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {t("Mở bài giảng Reading", "Open Reading lectures")}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="full" className="mt-6">
              <div className="mb-4 rounded-xl border-2 border-dashed border-primary/30 bg-gradient-to-r from-primary/5 to-emerald-500/5 p-4">
                <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  {t("🏆 Ultimate Full-Text Exam Challenges", "🏆 Ultimate Full-Text Exam Challenges")}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {t(
                    "Bấm vào một đề để mở phòng thi mô phỏng chia đôi màn hình: bên trái là toàn văn, bên phải là toàn bộ câu hỏi đa dạng (MCQ, matching headings, fill-blank).",
                    "Click an exam to open an immersive split-screen exam room: full passage on the left, mixed-format questions on the right (MCQ, matching headings, fill-blank)."
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {IELTS_FULL_READING_EXAMS.map((exam) => (
                  <motion.div
                    key={exam.id}
                    whileHover={{ y: -2 }}
                    className="rounded-xl border bg-card p-4 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge variant="secondary" className="text-[10px]">{exam.level}</Badge>
                      <span className="text-[11px] text-muted-foreground inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {exam.durationMinutes} min
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {exam.questions.length} Qs
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground text-base mb-1">{exam.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                      {exam.passage.replace(/^[A-Z]\.\s*/gm, "").slice(0, 120)}…
                    </p>
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-primary to-emerald-500 text-white"
                      onClick={() => setActiveExam(exam)}
                    >
                      <Trophy className="w-4 h-4 mr-1" />
                      {t("Bắt đầu đề thi", "Start Exam")}
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />

      <AnimatePresence>
        {activeExam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ExamEngine exam={activeExam} onClose={() => setActiveExam(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IeltsReadingPractice;
