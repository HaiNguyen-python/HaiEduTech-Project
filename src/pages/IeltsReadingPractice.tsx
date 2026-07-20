/**
 * @file IeltsReadingPractice.tsx
 * @description IELTS Reading Practice hub with two modes:
 *   1) Quick Exercises - links into the embedded reading drills in lectures
 *   2) Ultimate Full-Text Exam Challenges - immersive split-screen exam engine
 *      featuring a countdown timer, question-navigation matrix, multiple
 *      formats (MCQ, matching headings, fill-blank) and a review mode.
 *   The Quick Exercises area is intentionally a re-entry point: choosing an
 *   exam opens an overlay; the user's selection state is preserved underneath.
 */
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ArrowLeft, BookOpen, Trophy, Clock, Timer, X, CheckCircle2,
  XCircle, ChevronLeft, ChevronRight, Plus, Minus, Sun, Moon, GripVertical, NotebookPen, Flag,
} from "lucide-react";
import ReaderPassage from "@/components/ielts/ReaderPassage";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import {
  IELTS_FULL_READING_EXAMS as _BASE_EXAMS,
  type ReadingExam,
  type ReadingQuestion,
} from "@/data/ieltsFullReadingExams";
import { IELTS_FULL_READING_EXAMS_EXPANSION } from "@/data/ieltsFullReadingExamsExpansion";
import { IELTS_FULL_READING_EXAMS_EXPANSION2 } from "@/data/ieltsFullReadingExamsExpansion2";
import { IELTS_FULL_READING_EXAMS_EXPANSION3 } from "@/data/ieltsFullReadingExamsExpansion3";
import { IELTS_FULL_READING_EXAMS_EXPANSION4 } from "@/data/ieltsFullReadingExamsExpansion4";
import { READING_PASSAGE_EXTENSIONS } from "@/data/ieltsReadingPassageExtensions";
import { READING_QUESTION_EXTENSIONS } from "@/data/ieltsReadingQuestionExtensions";
import { READING_VOCAB, type ReadingVocabItem } from "@/data/ieltsReadingVocab";
import { IELTS_FULL_TESTS, type FullTest } from "@/data/ieltsFullTests";

// Extend each exam's passage AND questions so each passage carries 13-14 Qs
// like a real Cambridge IELTS Reading paper.
const _MERGED_EXAMS: ReadingExam[] = [..._BASE_EXAMS, ...IELTS_FULL_READING_EXAMS_EXPANSION, ...IELTS_FULL_READING_EXAMS_EXPANSION2, ...IELTS_FULL_READING_EXAMS_EXPANSION3, ...IELTS_FULL_READING_EXAMS_EXPANSION4].map(e => {
  const extra = READING_PASSAGE_EXTENSIONS[e.id];
  const extraQs = READING_QUESTION_EXTENSIONS[e.id];
  let merged = extra ? { ...e, passage: e.passage + extra } : { ...e };
  if (extraQs && extraQs.length) merged = { ...merged, questions: [...merged.questions, ...extraQs] };
  return merged;
});
const IELTS_FULL_READING_EXAMS: ReadingExam[] = _MERGED_EXAMS;
const EXAMS_BY_ID: Record<string, ReadingExam> = Object.fromEntries(IELTS_FULL_READING_EXAMS.map(e => [e.id, e]));

// ============================================================
// Shared exam-room UI helpers
// ============================================================

const FONT_SIZES = [14, 15, 16, 17, 18, 20, 22] as const;

interface RoomToolbarProps {
  fontIdx: number;
  setFontIdx: React.Dispatch<React.SetStateAction<number>>;
  paperTheme: "light" | "dark";
  setPaperTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}
const RoomToolbar: React.FC<RoomToolbarProps> = ({ fontIdx, setFontIdx, paperTheme, setPaperTheme }) => (
  <div className="inline-flex items-center gap-1 rounded-lg border bg-card px-1.5 py-1">
    <button
      onClick={() => setFontIdx(i => Math.max(0, i - 1))}
      className="p-1 rounded hover:bg-muted text-foreground"
      aria-label="Smaller font"
      title="A−"
    ><Minus className="w-3.5 h-3.5" /></button>
    <span className="text-[11px] font-mono text-muted-foreground w-7 text-center">{FONT_SIZES[fontIdx]}px</span>
    <button
      onClick={() => setFontIdx(i => Math.min(FONT_SIZES.length - 1, i + 1))}
      className="p-1 rounded hover:bg-muted text-foreground"
      aria-label="Larger font"
      title="A+"
    ><Plus className="w-3.5 h-3.5" /></button>
    <span className="w-px h-4 bg-border mx-1" />
    <button
      onClick={() => setPaperTheme(p => (p === "light" ? "dark" : "light"))}
      className="p-1 rounded hover:bg-muted text-foreground"
      aria-label="Toggle passage theme"
      title="Light/Dark paper"
    >{paperTheme === "light" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}</button>
  </div>
);

// Draggable horizontal split between passage (left) and questions (right).
// Only active on lg+; below that we stack vertically.
const useSplit = () => {
  const [leftPct, setLeftPct] = useState(50);
  const dragRef = useRef<{ active: boolean; startX: number; startPct: number; width: number }>({
    active: false, startX: 0, startPct: 50, width: 0,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    dragRef.current.active = true;
    dragRef.current.startX = e.clientX;
    dragRef.current.startPct = leftPct;
    dragRef.current.width = containerRef.current.getBoundingClientRect().width;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current.active) return;
      const dx = e.clientX - dragRef.current.startX;
      const pct = dragRef.current.startPct + (dx / dragRef.current.width) * 100;
      setLeftPct(Math.min(75, Math.max(25, pct)));
    };
    const onUp = () => {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return { leftPct, containerRef, onMouseDown };
};

const paperClass = (t: "light" | "dark") =>
  t === "light"
    ? "bg-white text-slate-900"
    : "bg-slate-950 text-slate-100";

// ============================================================
// Post-submit review: detailed Q-by-Q analysis + key vocabulary
// → Saves to student_notebooks under "IELTS Reading Vocabulary"
// ============================================================

interface PostSubmitReviewProps {
  exam: ReadingExam;
  questions: ReadingQuestion[];
  answers: Record<number, string>;
  /** Optional remapper from displayed (global) number to original question number for vocab lookup */
  vocabExamIds: string[];
}
const PostSubmitReview: React.FC<PostSubmitReviewProps> = ({ exam, questions, answers, vocabExamIds }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const correctCount = questions.filter(q => (answers[q.number] || "").trim().toLowerCase() === q.answer.toLowerCase()).length;
  const wrongCount = questions.length - correctCount;

  const vocab: ReadingVocabItem[] = useMemo(() => {
    const seen = new Set<string>();
    const list: ReadingVocabItem[] = [];
    for (const id of vocabExamIds) {
      for (const v of (READING_VOCAB[id] || [])) {
        if (seen.has(v.word.toLowerCase())) continue;
        seen.add(v.word.toLowerCase());
        list.push(v);
      }
    }
    return list;
  }, [vocabExamIds]);

  const buildNotebookHtml = () => {
    const today = new Date().toLocaleDateString();
    const head = `<h2>${exam.passageTitle}</h2><p><em>${t("Lưu ngày", "Saved")}: ${today}</em></p>`;
    const items = vocab.map((v, i) => `
      <p><strong>${i + 1}. ${v.word}</strong>${v.pos ? ` <em>(${v.pos})</em>` : ""}${v.ipa ? ` <span style="color:#0ea5e9">${v.ipa}</span>` : ""}<br/>
      → ${v.meaningVi}${v.exampleEn ? `<br/><em>e.g. ${v.exampleEn}</em>` : ""}</p>`).join("");
    return head + items;
  };

  const saveToNotebook = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: t("Cần đăng nhập", "Login required"), description: t("Hãy đăng nhập để lưu vào notebook.", "Please log in to save to your notebook."), variant: "destructive" });
        setSaving(false);
        return;
      }
      const { data, error } = await supabase.from("student_notebooks").insert({
        user_id: user.id,
        title: `IELTS Reading Vocabulary - ${exam.passageTitle}`,
        subject: "ielts",
        content: buildNotebookHtml(),
        is_public: false,
      }).select().single();
      if (error) {
        console.error("[Notebook save error]", error);
        throw error;
      }
      console.log("[Notebook saved]", data?.id);
      setSaved(true);
      window.dispatchEvent(new Event("notebook:updated"));
      toast({ title: t("Đã lưu vào Notebook", "Saved to Notebook"), description: t("Mở /notebook để xem.", "Open /notebook to review.") });
    } catch (e: any) {
      console.error("[Notebook save failed]", e);
      toast({ title: t("Lưu thất bại", "Save failed"), description: e?.message || e?.error_description || "Unknown error", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Per-question breakdown */}
      <div className="rounded-xl border bg-card p-4">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h3 className="font-bold text-base text-foreground">
            📊 {t("Phân tích chi tiết từng câu", "Per-question analysis")}
          </h3>
          <div className="flex items-center gap-2 text-xs">
            <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30">
              ✓ {correctCount} {t("đúng", "correct")}
            </Badge>
            <Badge className="bg-destructive/15 text-destructive border-destructive/30">
              ✗ {wrongCount} {t("sai", "wrong")}
            </Badge>
          </div>
        </div>
        <ol className="space-y-2 text-sm">
          {questions.map(q => {
            const user = (answers[q.number] || "").trim();
            const isCorrect = user.toLowerCase() === q.answer.toLowerCase();
            return (
              <li key={q.number} className={cn(
                "rounded-lg border px-3 py-2",
                isCorrect ? "border-emerald-500/40 bg-emerald-500/5" : "border-destructive/40 bg-destructive/5"
              )}>
                <div className="flex items-start gap-2">
                  <span className="font-bold w-6 shrink-0">{q.number}.</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-foreground">{q.prompt}</div>
                    <div className="text-xs mt-1">
                      <span className="text-muted-foreground">{t("Bạn:", "You:")} </span>
                      <span className={isCorrect ? "text-emerald-700 dark:text-emerald-300 font-medium" : "text-destructive font-medium"}>
                        {user || <em className="opacity-60">{t("(bỏ trống)", "(blank)")}</em>}
                      </span>
                      {!isCorrect && (
                        <>
                          <span className="text-muted-foreground"> · {t("Đáp án:", "Answer:")} </span>
                          <span className="text-emerald-700 dark:text-emerald-300 font-semibold">{q.answer}</span>
                        </>
                      )}
                    </div>
                    {q.explanation && (
                      <p className="text-xs text-muted-foreground italic mt-1">💡 {q.explanation}</p>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Key vocabulary */}
      {vocab.length > 0 && (
        <div className="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-emerald-500/5 p-4">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h3 className="font-bold text-base text-foreground">
              📚 {t("Từ vựng quan trọng - IELTS Reading Vocabulary", "Key Vocabulary - IELTS Reading Vocabulary")}
            </h3>
            <Button
              size="sm"
              variant={saved ? "outline" : "default"}
              disabled={saving || saved}
              onClick={saveToNotebook}
              className={saved ? "" : "bg-gradient-to-r from-primary to-emerald-500 text-white"}
            >
              <NotebookPen className="w-4 h-4 mr-1" />
              {saved ? t("Đã lưu vào Notebook", "Saved to Notebook") : t("Lưu vào Notebook", "Save to Notebook")}
            </Button>
          </div>
          <ol className="space-y-2 text-sm">
            {vocab.map((v, i) => (
              <li key={v.word} className="rounded-lg border bg-card/60 px-3 py-2">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-bold text-foreground">{i + 1}. {v.word}</span>
                  {v.pos && <span className="text-xs text-muted-foreground italic">({v.pos})</span>}
                  {v.ipa && <span className="text-xs text-sky-600 dark:text-sky-300 font-mono">{v.ipa}</span>}
                </div>
                <div className="text-sm text-foreground/90 mt-0.5">→ {v.meaningVi}</div>
                {v.exampleEn && <div className="text-xs text-muted-foreground italic mt-0.5">e.g. {v.exampleEn}</div>}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};


// ============================================================
// Split-screen Full-Text Exam Engine
// ============================================================

interface ExamEngineProps {
  exam: ReadingExam;
  onClose: () => void;
}

const ExamEngine: React.FC<ExamEngineProps> = ({ exam, onClose }) => {
  const { t } = useLanguage();
  const progressKey = `ielts-reading-progress::${exam.id}`;
  const [answers, setAnswers] = useState<Record<number, string>>(() => {
    try {
      const raw = localStorage.getItem(progressKey);
      if (raw) {
        const p = JSON.parse(raw);
        return p?.answers || {};
      }
    } catch { /* noop */ }
    return {};
  });
  const [flagged, setFlagged] = useState<Set<number>>(() => {
    try {
      const raw = localStorage.getItem(progressKey);
      if (raw) {
        const p = JSON.parse(raw);
        return new Set(Array.isArray(p?.flagged) ? p.flagged : []);
      }
    } catch { /* noop */ }
    return new Set();
  });
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(exam.durationMinutes * 60);
  const [activeQ, setActiveQ] = useState<number>(exam.questions[0].number);
  const [fontIdx, setFontIdx] = useState(2);
  const [paperTheme, setPaperTheme] = useState<"light" | "dark">("light");
  const { leftPct, containerRef, onMouseDown } = useSplit();

  // Auto-save answers + flagged to localStorage
  useEffect(() => {
    if (submitted) return;
    const handle = setTimeout(() => {
      try {
        localStorage.setItem(progressKey, JSON.stringify({
          answers,
          flagged: Array.from(flagged),
          updatedAt: Date.now(),
        }));
      } catch { /* quota */ }
    }, 400);
    return () => clearTimeout(handle);
  }, [answers, flagged, submitted, progressKey]);

  // Clear saved progress on submit
  useEffect(() => {
    if (submitted) {
      try { localStorage.removeItem(progressKey); } catch { /* noop */ }
    }
  }, [submitted, progressKey]);

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

  const toggleFlag = useCallback((qNum: number) => {
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(qNum)) next.delete(qNum); else next.add(qNum);
      return next;
    });
  }, []);

  const submitLoggedRef = useRef(false);
  useEffect(() => {
    if (!submitted || submitLoggedRef.current) return;
    submitLoggedRef.current = true;
    const elapsed = exam.durationMinutes * 60 - secondsLeft;
    logStudentActivity({
      activityType: "ielts_reading",
      activityId: exam.id,
      score,
      maxScore: exam.questions.length,
      timeSpentSeconds: elapsed > 0 ? elapsed : undefined,
      metadata: {
        examId: exam.id,
        total_questions: exam.questions.length,
        percent: Math.round((score / Math.max(exam.questions.length, 1)) * 100),
        mode: "single_exam",
      },
    });
  }, [submitted, exam, score, secondsLeft]);

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
              const isFlagged = flagged.has(q.number);
              return (
                <button
                  key={q.number}
                  onClick={() => setActiveQ(q.number)}
                  aria-label={`Question ${q.number}${isFlagged ? " (flagged)" : ""}`}
                  className={cn(
                    "relative w-7 h-7 rounded text-xs font-semibold border transition-all",
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
                  {isFlagged && !submitted && (
                    <Flag className="absolute -top-1.5 -right-1.5 w-3 h-3 text-amber-500 fill-amber-400" />
                  )}
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

      {/* Toolbar: font size + paper theme */}
      <div className="border-b bg-card/60 px-3 py-1.5 flex items-center justify-end gap-2">
        <RoomToolbar fontIdx={fontIdx} setFontIdx={setFontIdx} paperTheme={paperTheme} setPaperTheme={setPaperTheme} />
      </div>

      {/* Split-screen dual panes - resizable on lg+ */}
      <div ref={containerRef} className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT - Passage */}
        <section
          aria-label="Reading passage"
          className={cn("overflow-y-auto border-b lg:border-b-0 lg:border-r min-h-[40vh] lg:min-h-0", paperClass(paperTheme))}
          style={{ flexBasis: `${leftPct}%`, flexGrow: 0, flexShrink: 0 } as React.CSSProperties}
        >
          <div className="w-full px-5 md:px-8 lg:px-10 py-6 md:py-8">
            <h2 className="text-xl md:text-2xl font-bold mb-1">{exam.passageTitle}</h2>
            <p className={cn("text-xs uppercase tracking-wide mb-5", paperTheme === "light" ? "text-slate-500" : "text-slate-400")}>
              {t("Đoạn văn", "Reading Passage")}
            </p>
            <ReaderPassage
              passageId={exam.id}
              passage={exam.passage}
              fontSize={FONT_SIZES[fontIdx]}
              paperTheme={paperTheme}
            />
          </div>
        </section>

        {/* Splitter handle - visible on lg+ only */}
        <div
          role="separator"
          aria-orientation="vertical"
          onMouseDown={onMouseDown}
          className="hidden lg:flex items-center justify-center w-2 cursor-col-resize bg-border hover:bg-primary/40 transition-colors shrink-0"
          title={t("Kéo để chỉnh kích thước", "Drag to resize")}
        >
          <GripVertical className="w-3 h-3 text-muted-foreground pointer-events-none" />
        </div>

        {/* RIGHT - Questions */}
        <section
          aria-label="Questions"
          className="overflow-y-auto bg-background flex-1 min-h-[40vh] lg:min-h-0"
        >
          <div className="max-w-2xl mx-auto px-5 md:px-8 py-6 md:py-8 space-y-6">
            {!submitted && exam.questions.map((q) => (
              <QuestionBlock
                key={q.number}
                question={q}
                value={answers[q.number] || ""}
                onChange={(v) => handleAnswer(q.number, v)}
                submitted={submitted}
                onFocus={() => setActiveQ(q.number)}
                flagged={flagged.has(q.number)}
                onToggleFlag={() => toggleFlag(q.number)}
              />
            ))}
            {submitted && (
              <>
                <div className="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-emerald-500/5 p-5 text-center">
                  <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="font-bold text-lg">
                    {t("Kết quả", "Final Score")}: {score}/{exam.questions.length}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {score === exam.questions.length
                      ? t("Xuất sắc!", "Excellent!")
                      : score >= exam.questions.length * 0.7
                        ? t("Tốt - gần Band 7!", "Strong - around Band 7!")
                        : t("Tiếp tục luyện tập!", "Keep practising!")}
                  </p>
                  <div className="mt-3 flex gap-2 justify-center">
                    <Button variant="outline" size="sm" onClick={onClose}>
                      <ArrowLeft className="w-4 h-4 mr-1" /> {t("Quay lại danh sách", "Back to list")}
                    </Button>
                  </div>
                </div>
                <PostSubmitReview
                  exam={exam}
                  questions={exam.questions}
                  answers={answers}
                  vocabExamIds={[exam.id]}
                />
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

// ============================================================
// Question renderer - handles all 3 supported formats
// ============================================================

interface QBlockProps {
  question: ReadingQuestion;
  value: string;
  onChange: (v: string) => void;
  submitted: boolean;
  onFocus: () => void;
  flagged?: boolean;
  onToggleFlag?: () => void;
}

const QuestionBlock: React.FC<QBlockProps> = ({ question: q, value, onChange, submitted, onFocus, flagged, onToggleFlag }) => {
  const correct = submitted && value.trim().toLowerCase() === q.answer.toLowerCase();
  const wrong = submitted && value && !correct;

  return (
    <div
      id={`q-${q.number}`}
      onFocus={onFocus}
      onClick={onFocus}
      className={cn(
        "rounded-xl border bg-card p-4 transition-all",
        flagged && !submitted && "ring-2 ring-amber-400/60",
        submitted && (correct ? "border-emerald-500 bg-emerald-500/5" : wrong ? "border-destructive bg-destructive/5" : "")
      )}
    >
      <div className="flex items-start gap-3 mb-3">
        <Badge variant="outline" className="font-bold text-sm shrink-0">{q.number}</Badge>
        <p className="text-sm font-medium text-foreground leading-relaxed flex-1">{q.prompt}</p>
        {!submitted && onToggleFlag && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onToggleFlag(); }}
            className={cn(
              "shrink-0 p-1 rounded transition-colors",
              flagged ? "text-amber-500 hover:text-amber-600" : "text-muted-foreground hover:text-amber-500"
            )}
            title={flagged ? "Unflag" : "Mark for review"}
            aria-label="Mark for review"
          >
            <Flag className={cn("w-4 h-4", flagged && "fill-amber-400")} />
          </button>
        )}
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
            <option value="">- Select a heading -</option>
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
// Full Test Engine - 3 passages, 60-min countdown, sequential
// question numbering (Passage 1: Q1–N, Passage 2: continues, ...).
// ============================================================

interface FullTestEngineProps {
  test: FullTest;
  onClose: () => void;
}

const FullTestEngine: React.FC<FullTestEngineProps> = ({ test, onClose }) => {
  const { t } = useLanguage();
  const passages = useMemo(
    () => test.passageIds.map(id => EXAMS_BY_ID[id]).filter(Boolean) as ReadingExam[],
    [test]
  );

  // Build a flat question list with re-numbered "global" numbers 1..N.
  const flat = useMemo(() => {
    let n = 1;
    const list: { passageIndex: number; q: ReadingQuestion; globalNumber: number }[] = [];
    passages.forEach((p, pi) => {
      p.questions.forEach(q => {
        list.push({ passageIndex: pi, q, globalNumber: n++ });
      });
    });
    return list;
  }, [passages]);

  const totalQs = flat.length;
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(test.durationMinutes * 60);
  const [activePassage, setActivePassage] = useState(0);
  const [fontIdx, setFontIdx] = useState(2);
  const [paperTheme, setPaperTheme] = useState<"light" | "dark">("light");
  const { leftPct, containerRef, onMouseDown } = useSplit();

  useEffect(() => {
    if (submitted) return;
    const id = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) { clearInterval(id); setSubmitted(true); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [submitted]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const timerLow = secondsLeft < 300;

  const score = useMemo(() => {
    let s = 0;
    for (const item of flat) {
      const ans = (answers[item.globalNumber] || "").trim().toLowerCase();
      if (ans && ans === item.q.answer.toLowerCase()) s += 1;
    }
    return s;
  }, [answers, flat]);

  const passageOffsets = useMemo(() => {
    const offsets: number[] = [];
    let acc = 1;
    passages.forEach(p => { offsets.push(acc); acc += p.questions.length; });
    return offsets;
  }, [passages]);

  const handleClose = () => {
    if (!submitted && Object.keys(answers).length > 0) {
      const ok = window.confirm(
        t("Bạn chắc muốn thoát? Câu trả lời sẽ bị mất.", "Are you sure you want to exit? Your answers will be lost.")
      );
      if (!ok) return;
    }
    onClose();
  };

  const fullTestLoggedRef = useRef(false);
  useEffect(() => {
    if (!submitted || fullTestLoggedRef.current) return;
    fullTestLoggedRef.current = true;
    const elapsed = test.durationMinutes * 60 - secondsLeft;
    logStudentActivity({
      activityType: "ielts_reading",
      activityId: test.id,
      score,
      maxScore: totalQs,
      timeSpentSeconds: elapsed > 0 ? elapsed : undefined,
      metadata: {
        testId: test.id,
        total_questions: totalQs,
        percent: Math.round((score / Math.max(totalQs, 1)) * 100),
        mode: "full_test",
      },
    });
  }, [submitted, test, score, totalQs, secondsLeft]);

  const currentPassage = passages[activePassage];
  const currentItems = flat.filter(i => i.passageIndex === activePassage);

  return (
    <div className="fixed inset-0 z-[60] bg-background flex flex-col">
      <header className="border-b bg-card shadow-sm shrink-0">
        <div className="container mx-auto px-3 sm:px-4 py-2.5 flex items-center gap-3 flex-wrap">
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="w-4 h-4 mr-1" /> {t("Thoát", "Exit")}
          </Button>
          <div className="font-semibold text-sm text-foreground truncate flex-1 min-w-[160px]">
            🏆 {test.title}
          </div>
          <div className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-sm font-bold",
            timerLow ? "bg-destructive/10 border-destructive text-destructive animate-pulse" : "bg-muted border-border text-foreground"
          )}>
            <Timer className="w-4 h-4" /> {mm}:{ss}
          </div>
          {/* Passage tabs */}
          <div className="flex gap-1">
            {passages.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActivePassage(i)}
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-semibold border transition-all",
                  activePassage === i ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:border-primary/40"
                )}
              >
                {t(`Đoạn ${i + 1}`, `Passage ${i + 1}`)} ({passageOffsets[i]}-{passageOffsets[i] + p.questions.length - 1})
              </button>
            ))}
          </div>
          {!submitted ? (
            <Button size="sm" onClick={() => setSubmitted(true)} className="bg-gradient-to-r from-primary to-emerald-500 text-white">
              {t("Nộp bài", "Submit Test")}
            </Button>
          ) : (
            <Badge className="text-sm px-3 py-1">{t("Điểm: ", "Score: ")}{score}/{totalQs}</Badge>
          )}
        </div>
        {/* Global question matrix */}
        <div className="container mx-auto px-3 sm:px-4 pb-2 flex flex-wrap gap-1">
          {flat.map(item => {
            const answered = !!answers[item.globalNumber];
            const correct = submitted && (answers[item.globalNumber] || "").trim().toLowerCase() === item.q.answer.toLowerCase();
            const wrong = submitted && !correct;
            return (
              <button
                key={item.globalNumber}
                onClick={() => setActivePassage(item.passageIndex)}
                className={cn(
                  "w-7 h-7 rounded text-[10px] font-semibold border transition-all",
                  submitted
                    ? correct ? "bg-emerald-500 text-white border-emerald-500"
                      : wrong ? "bg-destructive text-white border-destructive"
                      : "bg-muted text-muted-foreground border-border"
                    : answered ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:border-primary/50"
                )}
              >
                {item.globalNumber}
              </button>
            );
          })}
        </div>
      </header>

      <div className="border-b bg-card/60 px-3 py-1.5 flex items-center justify-end gap-2">
        <RoomToolbar fontIdx={fontIdx} setFontIdx={setFontIdx} paperTheme={paperTheme} setPaperTheme={setPaperTheme} />
      </div>

      <div ref={containerRef} className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <section
          aria-label="Reading passage"
          className={cn("overflow-y-auto border-b lg:border-b-0 lg:border-r min-h-[40vh] lg:min-h-0", paperClass(paperTheme))}
          style={{ flexBasis: `${leftPct}%`, flexGrow: 0, flexShrink: 0 } as React.CSSProperties}
        >
          <div className="w-full px-5 md:px-8 lg:px-10 py-6 md:py-8">
            <Badge variant="outline" className="mb-2 text-[10px]">
              {t(`Đoạn ${activePassage + 1} / ${passages.length}`, `Passage ${activePassage + 1} of ${passages.length}`)}
            </Badge>
            <h2 className="text-xl md:text-2xl font-bold mb-1">{currentPassage.passageTitle}</h2>
            <p className={cn("text-xs uppercase tracking-wide mb-5", paperTheme === "light" ? "text-slate-500" : "text-slate-400")}>
              {t("Đoạn văn", "Reading Passage")}
            </p>
            <ReaderPassage
              passageId={currentPassage.id}
              passage={currentPassage.passage}
              fontSize={FONT_SIZES[fontIdx]}
              paperTheme={paperTheme}
            />
          </div>
        </section>

        <div
          role="separator"
          aria-orientation="vertical"
          onMouseDown={onMouseDown}
          className="hidden lg:flex items-center justify-center w-2 cursor-col-resize bg-border hover:bg-primary/40 transition-colors shrink-0"
          title={t("Kéo để chỉnh kích thước", "Drag to resize")}
        >
          <GripVertical className="w-3 h-3 text-muted-foreground pointer-events-none" />
        </div>

        <section aria-label="Questions" className="overflow-y-auto bg-background flex-1 min-h-[40vh] lg:min-h-0">
          <div className="max-w-2xl mx-auto px-5 md:px-8 py-6 md:py-8 space-y-6">
            <div className="text-xs text-muted-foreground">
              {t(
                `Câu hỏi ${passageOffsets[activePassage]}–${passageOffsets[activePassage] + currentPassage.questions.length - 1}`,
                `Questions ${passageOffsets[activePassage]}–${passageOffsets[activePassage] + currentPassage.questions.length - 1}`
              )}
            </div>
            {!submitted && currentItems.map(item => (
              <QuestionBlock
                key={item.globalNumber}
                question={{ ...item.q, number: item.globalNumber }}
                value={answers[item.globalNumber] || ""}
                onChange={v => setAnswers(p => ({ ...p, [item.globalNumber]: v }))}
                submitted={submitted}
                onFocus={() => { /* no-op */ }}
              />
            ))}
            {submitted && (
              <>
                <div className="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-emerald-500/5 p-5 text-center">
                  <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="font-bold text-lg">{t("Kết quả", "Final Score")}: {score}/{totalQs}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {score >= totalQs * 0.85
                      ? t("Xuất sắc - Band 8.0+!", "Excellent - Band 8.0+!")
                      : score >= totalQs * 0.7
                        ? t("Tốt - quanh Band 7.0", "Strong - around Band 7.0")
                        : t("Tiếp tục luyện tập!", "Keep practising!")}
                  </p>
                  <div className="mt-3"><Button variant="outline" size="sm" onClick={onClose}>
                    <ArrowLeft className="w-4 h-4 mr-1" /> {t("Quay lại danh sách", "Back to list")}
                  </Button></div>
                </div>
                <PostSubmitReview
                  exam={{ ...currentPassage, passageTitle: test.title } as ReadingExam}
                  questions={flat.map(i => ({ ...i.q, number: i.globalNumber }))}
                  answers={answers}
                  vocabExamIds={passages.map(p => p.id)}
                />
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

// ============================================================
// Page shell
// ============================================================

const IeltsReadingPractice: React.FC = () => {
  const { t } = useLanguage();
  const [activeExam, setActiveExam] = useState<ReadingExam | null>(null);
  const [activeFullTest, setActiveFullTest] = useState<FullTest | null>(null);



  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="IELTS Reading Practice - Full-Text Mock Exams | HaiEduTech"
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
                {t("Luyện Đọc IELTS - Bài tập nhanh & Đề full-text", "IELTS Reading Practice - Quick drills & Full-text exams")}
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
          <Tabs defaultValue="full-test" className="w-full">
            <TabsList className="grid w-full max-w-3xl grid-cols-3">
              <TabsTrigger value="quick">
                {t("⚡ Bài tập nhanh", "⚡ Quick Exercises")}
              </TabsTrigger>
              <TabsTrigger value="full">
                {t("📖 Đơn đoạn (20 phút)", "📖 Single passages (20 min)")}
              </TabsTrigger>
              <TabsTrigger value="full-test">
                {t("🏆 Full Test (60 phút)", "🏆 Full Test (60 min)")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="full-test" className="mt-6">
              <div className="mb-4 rounded-xl border-2 border-dashed border-primary/30 bg-gradient-to-r from-primary/5 to-emerald-500/5 p-4">
                <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  {t("🏆 Đề thi đầy đủ - 3 passages, 60 phút", "🏆 Complete tests - 3 passages, 60 minutes")}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {t(
                    "Mô phỏng chính xác phòng thi IELTS Academic Reading: 3 passages liền nhau, ~40 câu hỏi, đồng hồ đếm ngược 60 phút và ma trận câu hỏi 1–40.",
                    "Exactly mirrors the IELTS Academic Reading exam: 3 connected passages, ~40 questions, 60-minute countdown and a global 1–40 question matrix."
                  )}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {IELTS_FULL_TESTS.map(ft => {
                  const ps = ft.passageIds.map(id => EXAMS_BY_ID[id]).filter(Boolean);
                  const totalQs = ps.reduce((a, p) => a + p.questions.length, 0);
                  return (
                    <motion.div
                      key={ft.id}
                      whileHover={{ y: -2 }}
                      className="rounded-xl border bg-card p-4 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge variant="secondary" className="text-[10px]">{t("Đề đầy đủ", "Full Test")}</Badge>
                        <span className="text-[11px] text-muted-foreground inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {ft.durationMinutes} min
                        </span>
                        <span className="text-[11px] text-muted-foreground">{totalQs} Qs</span>
                      </div>
                      <h3 className="font-bold text-foreground text-base mb-1">{ft.title}</h3>
                      <ul className="text-xs text-muted-foreground mb-3 space-y-0.5 list-disc list-inside">
                        {ps.map((p, i) => (
                          <li key={p.id}>{t(`Đoạn ${i + 1}`, `Passage ${i + 1}`)}: {p.passageTitle}</li>
                        ))}
                      </ul>
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-primary to-emerald-500 text-white"
                        onClick={() => setActiveFullTest(ft)}
                      >
                        <Trophy className="w-4 h-4 mr-1" />
                        {t("Bắt đầu Full Test", "Start Full Test")}
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>



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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ExamEngine exam={activeExam} onClose={() => setActiveExam(null)} />
          </motion.div>
        )}
        {activeFullTest && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FullTestEngine test={activeFullTest} onClose={() => setActiveFullTest(null)} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default IeltsReadingPractice;
