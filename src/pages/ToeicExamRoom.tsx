// TOEIC Exam Room - interactive testing engine.
// Supports:
//  - LR Full test or Practice-by-Part mode
//  - Countdown timer
//  - Audio player with speed control (0.8/1.0/1.2) + auto-next
//  - Question navigator sidebar grouped by part
//  - SW mode: voice recorder for Speaking, distraction-free editor for Writing
//  - Review mode with answer key, transcripts, explanations
//  - 990-scale score conversion
import PremiumGate from "@/components/premium/PremiumGate";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Clock,
  Play,
  Pause,
  SkipForward,
  Mic,
  Square,
  Volume2,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  ListChecks,
  PenLine,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  TOEIC_LR_EXAMS,
  TOEIC_SW_EXAMS,
  PART_LABELS,
  convertToScaledScore,
  type ToeicLRQuestion,
  type ToeicPart,
  type ToeicSWTask,
} from "@/data/toeicExams";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { useSpeechRecognizer } from "@/hooks/useSpeechRecognizer";
import { supabase } from "@/integrations/supabase/client";
import { handleAiError } from "@/lib/aiResponseHandler";

interface SWGrade { score: number; max: number; feedback: string; tip: string; improved: string }
const toScaled = (got: number, max: number) => (max > 0 ? Math.round((got / max) * 20) * 10 : 0);


const HISTORY_KEY = "toeic-score-history";

const SW_TASK_TITLES: Record<ToeicSWTask["type"], { vi: string; en: string }> = {
  "read-aloud": { vi: "Đọc thành tiếng", en: "Read a Text Aloud" },
  "describe-picture": { vi: "Mô tả tranh", en: "Describe a Picture" },
  "respond-questions": { vi: "Trả lời câu hỏi", en: "Respond to Questions" },
  "propose-solution": { vi: "Đề xuất giải pháp", en: "Propose a Solution" },
  "express-opinion": { vi: "Trình bày quan điểm", en: "Express an Opinion" },
  "write-sentence-picture": { vi: "Viết câu theo tranh", en: "Write a Sentence Based on a Picture" },
  "respond-email": { vi: "Trả lời email", en: "Respond to an Email" },
  "write-essay": { vi: "Viết bài luận", en: "Write an Opinion Essay" },
};

function fmtTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// Resolve the actual reading passage for a question.
// Sibling questions in the same passageGroupId may carry stub text like
// "(See passage above)". This helper looks up the first sibling that has
// a real passage so the student always sees the full text.
function resolvePassage(
  q: ToeicLRQuestion,
  allQuestions: ToeicLRQuestion[],
): string | undefined {
  const stubLike = (p?: string) =>
    !p || /^\(\s*see\b/i.test(p.trim()) || p.trim().length < 30;
  if (!stubLike(q.passage)) return q.passage;
  if (!q.passageGroupId) return q.passage;
  const sibling = allQuestions.find(
    (s) => s.passageGroupId === q.passageGroupId && !stubLike(s.passage),
  );
  return sibling?.passage ?? q.passage;
}

function getListeningAudioText(q: ToeicLRQuestion): string {
  return q.audioText || q.transcript || `${q.prompt} ${q.options.map((opt, idx) => `${String.fromCharCode(65 + idx)}. ${opt}`).join(" ")}`;
}

// Persist a result entry to localStorage history
function saveHistoryEntry(entry: {
  examId: string;
  examTitle: string;
  scoreLR?: number;
  scoreSpeaking?: number;
  scoreWriting?: number;
}) {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const list = raw ? JSON.parse(raw) : [];
    list.push({ ...entry, date: new Date().toISOString().slice(0, 10) });
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

const ToeicExamRoom = () => {
  const { t } = useLanguage();
  const { examId = "" } = useParams();
  const [search] = useSearchParams();
  const mode = search.get("mode") || "full"; // full | practice | sw

  const lrExam = TOEIC_LR_EXAMS.find((e) => e.id === examId);
  const swExam = TOEIC_SW_EXAMS.find((e) => e.id === examId);

  if (!lrExam && !swExam) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">{t("Không tìm thấy đề thi.", "Exam not found.")}</p>
          <Button asChild><Link to="/toeic-exams">{t("Quay lại danh sách", "Back to Library")}</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title={`${(lrExam || swExam)!.title} - HaiEduTech`} description="TOEIC interactive exam room" />
      <Navbar />
      <main className="container mx-auto px-4 py-6 lg:py-10 max-w-7xl">
        {lrExam ? (
          <LRExamRunner exam={lrExam} mode={mode === "practice" ? "practice" : "full"} />
        ) : (
          <SWExamRunner exam={swExam!} />
        )}
      </main>
      <Footer />
    </div>
  );
};

/* -------------------- Listening & Reading runner -------------------- */

interface LRRunnerProps {
  exam: typeof TOEIC_LR_EXAMS[number];
  mode: "full" | "practice";
}

const LRExamRunner = ({ exam, mode }: LRRunnerProps) => {
  const { t } = useLanguage();
  const [selectedPart, setSelectedPart] = useState<ToeicPart | null>(
    mode === "practice" ? (exam.questions[0]?.part ?? null) : null
  );
  // Filter questions by part if practice mode
  const questions = useMemo(() => {
    return mode === "practice" && selectedPart
      ? exam.questions.filter((q) => q.part === selectedPart)
      : exam.questions;
  }, [exam.questions, mode, selectedPart]);

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [activeIdx, setActiveIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exam.durationSec);
  const [paused, setPaused] = useState(false);
  const [autoNext, setAutoNext] = useState(true);
  const [speed, setSpeed] = useState(1.0);

  // Reset state when filter changes
  useEffect(() => {
    setActiveIdx(0);
  }, [selectedPart, mode]);

  // Countdown timer
  useEffect(() => {
    if (submitted || paused) return;
    const id = setInterval(() => setTimeLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [submitted, paused]);

  useEffect(() => {
    if (timeLeft === 0 && !submitted) handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const current = questions[activeIdx];

  function selectAnswer(qid: string, idx: number) {
    setAnswers((a) => ({ ...a, [qid]: idx }));
    if (autoNext && activeIdx < questions.length - 1) {
      setTimeout(() => setActiveIdx((i) => i + 1), 250);
    }
  }

  function handleSubmit() {
    setSubmitted(true);
    // Estimate full score from sample correctness
    const listeningQs = exam.questions.filter((q) => q.part <= 4);
    const readingQs = exam.questions.filter((q) => q.part >= 5);
    const lc = listeningQs.filter((q) => answers[q.id] === q.answer).length;
    const rc = readingQs.filter((q) => answers[q.id] === q.answer).length;
    const lScore = convertToScaledScore(lc, listeningQs.length);
    const rScore = convertToScaledScore(rc, readingQs.length);
    saveHistoryEntry({
      examId: exam.id,
      examTitle: exam.title,
      scoreLR: lScore + rScore,
    });
    // RL pipeline: track raw correct/total ratio across L+R.
    const total = listeningQs.length + readingQs.length;
    const correct = lc + rc;
    const elapsed = exam.durationSec - timeLeft;
    logStudentActivity({
      activityType: "toeic_lr_exam",
      activityId: exam.id,
      score: correct,
      maxScore: total,
      timeSpentSeconds: elapsed > 0 ? elapsed : undefined,
      metadata: {
        examId: exam.id,
        examTitle: exam.title,
        listening_correct: lc,
        listening_total: listeningQs.length,
        reading_correct: rc,
        reading_total: readingQs.length,
        scaled_lr: lScore + rScore,
        percent: Math.round((correct / Math.max(total, 1)) * 100),
      },
    });
  }

  function pickVoices() {
    if (!("speechSynthesis" in window)) return [] as SpeechSynthesisVoice[];
    const all = window.speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang));
    // Prefer high quality natural/neural voices
    const score = (v: SpeechSynthesisVoice) => {
      const n = `${v.name} ${v.voiceURI}`.toLowerCase();
      let s = 0;
      if (/google/.test(n)) s += 5;
      if (/natural|neural|enhanced|premium|online/.test(n)) s += 4;
      if (/(en[-_]us)/i.test(v.lang)) s += 2;
      if (/(en[-_]gb)/i.test(v.lang)) s += 1;
      if (/samantha|aaron|allison|ava|joanna|matthew|guy|jenny|aria|libby|ryan/.test(n)) s += 3;
      return s;
    };
    return all.sort((a, b) => score(b) - score(a));
  }

  function speakSequential(
    segments: { text: string; voice?: SpeechSynthesisVoice; rate?: number; pitch?: number; gap?: number }[]
  ) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    segments.forEach((seg, i) => {
      // Split into sentences for natural prosody breaks
      const sentences = seg.text
        .split(/(?<=[.!?])\s+|\n+/)
        .map((s) => s.trim())
        .filter(Boolean);
      sentences.forEach((sentence, j) => {
        const u = new SpeechSynthesisUtterance(sentence);
        u.lang = seg.voice?.lang || "en-US";
        if (seg.voice) u.voice = seg.voice;
        u.rate = (seg.rate ?? speed) * (sentence.endsWith("?") ? 0.97 : 1);
        u.pitch = seg.pitch ?? 1;
        u.volume = 1;
        // Tiny silence between sentences using a leading space helps some engines breathe
        if (j === sentences.length - 1 && i < segments.length - 1 && seg.gap) {
          u.text = sentence + " ";
        }
        window.speechSynthesis.speak(u);
        if (seg.gap && j === sentences.length - 1) {
          // Insert a silent pause utterance to create rhythm between speakers/options
          const pause = new SpeechSynthesisUtterance(" , , , ");
          pause.volume = 0;
          pause.rate = Math.max(0.6, (seg.rate ?? speed) * 0.7);
          window.speechSynthesis.speak(pause);
        }
      });
    });
  }

  function playGeneratedAudio(q: ToeicLRQuestion) {
    if (!("speechSynthesis" in window)) return;
    const voices = pickVoices();
    const narrator = voices[0];
    const speakerA = voices.find((v) => /female|samantha|joanna|jenny|aria|libby|ava/i.test(v.name)) || voices[1] || narrator;
    const speakerB = voices.find((v) => /male|matthew|guy|ryan|aaron|daniel|david/i.test(v.name)) || voices[2] || narrator;

    const body = getListeningAudioText(q);

    if (q.part === 1) {
      speakSequential([
        { text: `Look at the photograph marked number ${activeIdx + 1} in your test book.`, voice: narrator, rate: speed * 0.95, pitch: 1.0, gap: 0.6 },
        // statements A-D usually separated by line breaks; split & alternate slight pitch
        ...body.split(/\n+/).filter(Boolean).map((line, i) => ({
          text: line,
          voice: i % 2 === 0 ? speakerA : speakerB,
          rate: speed,
          pitch: 1 + (i % 2 === 0 ? 0.05 : -0.05),
          gap: 0.5,
        })),
      ]);
      return;
    }

    if (q.part === 2) {
      const lines = body.split(/\n+/).filter(Boolean);
      speakSequential([
        { text: `Question ${activeIdx + 1}.`, voice: narrator, rate: speed * 0.95, gap: 0.4 },
        ...lines.map((line, i) => ({
          text: line,
          voice: i === 0 ? speakerA : i % 2 === 1 ? speakerB : speakerA,
          rate: speed,
          pitch: i === 0 ? 1.05 : 1 + (i % 2 === 1 ? -0.06 : 0.04),
          gap: 0.5,
        })),
      ]);
      return;
    }

    // Parts 3 & 4: conversation/talk - split by speaker tags or sentences
    const turns = body
      .split(/\n+/)
      .map((t) => t.trim())
      .filter(Boolean);
    speakSequential(
      turns.map((line, i) => {
        const isWoman = /^(W|Woman|Female)\s*[:.\-]/i.test(line);
        const isMan = /^(M|Man|Male)\s*[:.\-]/i.test(line);
        const clean = line.replace(/^(W|M|Woman|Man|Female|Male|Speaker\s*\d)\s*[:.\-]\s*/i, "");
        const v = isWoman ? speakerA : isMan ? speakerB : i % 2 === 0 ? speakerA : speakerB;
        return {
          text: clean,
          voice: v,
          rate: speed * 0.98,
          pitch: v === speakerA ? 1.06 : 0.96,
          gap: 0.35,
        };
      })
    );
  }

  // Warm up voice list (some browsers load async)
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const onv = () => window.speechSynthesis.getVoices();
    onv();
    window.speechSynthesis.onvoiceschanged = onv;
  }, []);

  // Audio plays only when the learner presses Play; stop any audio when the recording changes.
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, [current?.passageGroupId || current?.id, submitted, paused]);

  // Group by part for navigator
  const partGroups = useMemo(() => {
    const map = new Map<ToeicPart, ToeicLRQuestion[]>();
    questions.forEach((q) => {
      if (!map.has(q.part)) map.set(q.part, []);
      map.get(q.part)!.push(q);
    });
    return Array.from(map.entries()).sort(([a], [b]) => a - b);
  }, [questions]);

  if (submitted) {
    return <LRReview exam={exam} answers={answers} questions={questions} />;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <Link to="/toeic-exams" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> {t("Danh sách đề", "Back to library")}
          </Link>
          <h1 className="text-xl md:text-2xl font-bold mt-1">{exam.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-mono text-lg">{fmtTime(timeLeft)}</span>
          </div>
          <Button size="sm" variant="outline" onClick={() => setPaused((p) => !p)} className="border-border">
            {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </Button>
          <Button size="sm"  onClick={handleSubmit}>
            {t("Nộp bài", "Submit")}
          </Button>
        </div>
      </div>

      {/* Practice-by-Part filter */}
      {mode === "practice" && (
        <div className="flex flex-wrap gap-2 mb-4">
          {[1, 2, 3, 4, 5, 6, 7].map((p) => (
            <Button
              key={p}
              size="sm"
              variant={selectedPart === p ? "default" : "outline"}
              className={selectedPart === p ? "" : "border-border text-foreground"}
              onClick={() => setSelectedPart(p as ToeicPart)}
            >
              Part {p}
            </Button>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_240px] gap-6">
        {/* Question pane */}
        <div>
          {current ? (
            <Card className="bg-card border-border p-5">
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {PART_LABELS[current.part]}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Q {activeIdx + 1} / {questions.length}
                </span>
              </div>

              {/* Listening audio mock player */}
              {current.part <= 4 && (
                <div className="mb-4 p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Volume2 className="w-4 h-4 text-primary" />
                    <span className="text-xs text-foreground">
                      {current.part === 1
                        ? t("Audio TOEIC - Nhìn ảnh & nghe 4 câu mô tả (A-D)", "TOEIC Audio - Look at the photo & listen to 4 statements (A-D)")
                        : current.part === 2
                        ? t("Audio TOEIC - Nghe câu hỏi và 3 đáp án (A-C)", "TOEIC Audio - Listen to the question and 3 responses (A-C)")
                        : t("Audio TOEIC - Nghe đoạn hội thoại / bài nói", "TOEIC Audio - Listen to the conversation / talk")}
                    </span>
                    <div className="flex gap-1">
                      {[0.8, 1.0, 1.2].map((s) => (
                        <button
                          key={s}
                          onClick={() => setSpeed(s)}
                          className={`px-2 py-1 rounded text-xs font-mono ${
                            speed === s ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                          }`}
                        >
                          {s}x
                        </button>
                      ))}
                    </div>
                    <label className="ml-auto flex items-center gap-1 text-xs text-foreground">
                      <input
                        type="checkbox"
                        checked={autoNext}
                        onChange={(e) => setAutoNext(e.target.checked)}
                        className="accent-primary"
                      />
                      Auto-next
                    </label>
                  </div>
                  {current.audioSrc ? (
                    <audio controls autoPlay src={current.audioSrc} className="mt-2 w-full" />
                  ) : (
                    <Button size="sm" className="mt-2 font-semibold shadow-md" onClick={() => playGeneratedAudio(current)}>
                      <Play className="w-4 h-4 mr-1" /> {t("Phát lại audio", "Replay audio")}
                    </Button>
                  )}
                </div>
              )}

              {current.part === 1 && current.imageUrl && (
                <img
                  src={current.imageUrl}
                  alt="TOEIC Part 1 workplace photograph"
                  width={832}
                  height={544}
                  className="mb-4 w-full max-h-96 object-contain rounded-lg border border-border bg-muted/50"
                  loading="lazy"
                />
              )}

              {/* Reading passage */}
              {(current.part === 6 || current.part === 7) && (() => {
                const passage = resolvePassage(current, exam.questions);
                return passage ? (
                  <div className="mb-4 p-3 rounded-lg bg-muted/50 border border-border whitespace-pre-wrap text-sm leading-relaxed text-foreground max-h-72 overflow-auto">
                    {passage}
                  </div>
                ) : null;
              })()}

              {current.part === 1 ? (
                <p className="text-xs italic text-muted-foreground mb-3">
                  {t("Hướng dẫn: Nhìn ảnh và chọn câu mô tả đúng nhất (chỉ nghe audio, không có chữ).", "Directions: Look at the photo and choose the statement that best describes it (audio only, no text).")}
                </p>
              ) : current.part === 2 ? (
                <p className="text-xs italic text-muted-foreground mb-3">
                  {t("Hướng dẫn: Nghe câu hỏi và 3 đáp án rồi chọn A, B hoặc C.", "Directions: Listen to the question and three responses, then choose A, B, or C.")}
                </p>
              ) : (
                <p className="text-base font-medium mb-4 text-foreground leading-relaxed">{current.prompt}</p>
              )}

              <div className="space-y-2">
                {current.options.map((opt, i) => {
                  const selected = answers[current.id] === i;
                  return (
                    <button
                      key={i}
                      onClick={() => selectAnswer(current.id, i)}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition ${
                        selected
                          ? "bg-primary/15 border-primary text-foreground"
                          : "bg-background border-border hover:border-primary/50 text-foreground"
                      }`}
                    >
                      <span className="font-mono text-xs text-primary mr-2">{String.fromCharCode(65 + i)}.</span>
                      {current.part !== 1 && current.part !== 2 && opt}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between mt-5">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-primary/50 bg-background text-primary font-semibold hover:bg-primary/10 hover:text-primary disabled:opacity-60"
                  disabled={activeIdx === 0}
                  onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
                >
                  <ArrowLeft className="w-4 h-4 mr-1" /> {t("Trước", "Prev")}
                </Button>
                <Button
                  size="sm"
                  
                  disabled={activeIdx >= questions.length - 1}
                  onClick={() => setActiveIdx((i) => Math.min(questions.length - 1, i + 1))}
                >
                  {t("Tiếp", "Next")} <SkipForward className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="bg-card border-border p-5 text-muted-foreground">
              {t("Không có câu hỏi cho phần này.", "No questions for this part.")}
            </Card>
          )}
        </div>

        {/* Navigator sidebar */}
        <aside className="space-y-3 lg:sticky lg:top-20 self-start">
          <Card className="bg-card border-border p-4">
            <div className="flex items-center gap-2 mb-3">
              <ListChecks className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold">{t("Điều hướng câu hỏi", "Question Navigator")}</h3>
            </div>
            <div className="space-y-3 max-h-[60vh] overflow-auto pr-1">
              {partGroups.map(([part, qs]) => (
                <div key={part}>
                  <div className="text-[11px] font-semibold text-muted-foreground mb-1">Part {part}</div>
                  <div className="grid grid-cols-6 gap-1">
                    {qs.map((q) => {
                      const globalIdx = questions.findIndex((x) => x.id === q.id);
                      const answered = answers[q.id] !== undefined;
                      const active = globalIdx === activeIdx;
                      return (
                        <button
                          key={q.id}
                          onClick={() => setActiveIdx(globalIdx)}
                          className={`aspect-square rounded text-[11px] font-mono ${
                            active
                              ? "bg-primary text-primary-foreground"
                              : answered
                                ? "bg-primary/20 text-foreground"
                                : "bg-muted text-muted-foreground hover:bg-accent"
                          }`}
                        >
                          {globalIdx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};

/* -------------------- LR Review Mode -------------------- */

interface LRReviewProps {
  exam: typeof TOEIC_LR_EXAMS[number];
  questions: ToeicLRQuestion[];
  answers: Record<string, number>;
}

const LRReview = ({ exam, questions, answers }: LRReviewProps) => {
  const { t } = useLanguage();
  const listeningQs = questions.filter((q) => q.part <= 4);
  const readingQs = questions.filter((q) => q.part >= 5);
  const lc = listeningQs.filter((q) => answers[q.id] === q.answer).length;
  const rc = readingQs.filter((q) => answers[q.id] === q.answer).length;
  const lScore = convertToScaledScore(lc, listeningQs.length);
  const rScore = convertToScaledScore(rc, readingQs.length);

  return (
    <div>
      <Link to="/toeic-exams" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
        <ArrowLeft className="w-3 h-3" /> {t("Danh sách đề", "Back to library")}
      </Link>

      <Card className="mt-3 mb-6 bg-primary/5 border-primary/20 p-6">
        <h1 className="text-2xl font-bold text-foreground">{exam.title} - {t("Kết quả", "Results")}</h1>
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-xs text-muted-foreground">Listening (5–495)</p>
            <p className="text-3xl font-bold text-primary">{lScore}</p>
            <p className="text-xs text-muted-foreground mt-1">{lc}/{listeningQs.length} {t("đúng", "correct")}</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-xs text-muted-foreground">Reading (5–495)</p>
            <p className="text-3xl font-bold text-primary">{rScore}</p>
            <p className="text-xs text-muted-foreground mt-1">{rc}/{readingQs.length} {t("đúng", "correct")}</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-xs text-muted-foreground">{t("Tổng (10–990)", "Total (10–990)")}</p>
            <p className="text-3xl font-bold text-primary">{lScore + rScore}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("Quy đổi ETS chuẩn", "ETS-style scaling")}</p>
          </div>
        </div>
      </Card>

      <h2 className="text-lg font-semibold mb-3">{t("Đáp án chi tiết", "Detailed Answer Key")}</h2>
      <div className="space-y-3">
        {questions.map((q, i) => {
          const userAns = answers[q.id];
          const correct = userAns === q.answer;
          return (
            <Card key={q.id} className="bg-card border-border p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-muted-foreground">#{i + 1}</span>
                  <Badge className="bg-primary/10 text-primary border-primary/20">{PART_LABELS[q.part]}</Badge>
                </div>
                {correct ? (
                  <span className="flex items-center gap-1 text-primary text-xs"><CheckCircle2 className="w-4 h-4" /> {t("Đúng", "Correct")}</span>
                ) : (
                  <span className="flex items-center gap-1 text-destructive text-xs"><XCircle className="w-4 h-4" /> {t("Sai", "Incorrect")}</span>
                )}
              </div>
              {(q.part === 6 || q.part === 7) && (() => {
                const passage = resolvePassage(q, exam.questions);
                return passage ? (
                  <div className="mb-2 p-2 rounded bg-muted/50 border border-border whitespace-pre-wrap text-xs leading-relaxed text-foreground max-h-48 overflow-auto">
                    {passage}
                  </div>
                ) : null;
              })()}
              <p className="text-sm font-medium mb-2 text-foreground leading-relaxed">{q.prompt}</p>
              <div className="text-xs space-y-1 mb-2">
                {q.options.map((opt, idx) => (
                  <div
                    key={idx}
                    className={`px-2 py-1 rounded ${
                      idx === q.answer ? "bg-accent text-accent-foreground" :
                      idx === userAns ? "bg-destructive/10 text-destructive" : "text-muted-foreground"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}. {opt}
                  </div>
                ))}
              </div>
              {q.transcript && (
                <details className="text-xs text-foreground mb-1">
                  <summary className="cursor-pointer text-primary">{t("Transcript", "Transcript")}</summary>
                  <p className="mt-1 whitespace-pre-wrap">{q.transcript}</p>
                </details>
              )}
              {q.explanation && (
                <p className="text-xs text-foreground mt-1">
                  <Sparkles className="inline w-3 h-3 mr-1" />{q.explanation}
                </p>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

/* -------------------- Speaking & Writing runner -------------------- */

interface SWRunnerProps {
  exam: typeof TOEIC_SW_EXAMS[number];
}

const SWExamRunner = ({ exam }: SWRunnerProps) => {
  const { t } = useLanguage();
  const [tab, setTab] = useState<"speaking" | "writing">("speaking");
  const [activeIdx, setActiveIdx] = useState(0);
  const tasks = tab === "speaking" ? exam.speakingTasks : exam.writingTasks;
  const current = tasks[activeIdx];

  // Per-task storage
  const [recordings, setRecordings] = useState<Record<string, string>>({});
  const [writings, setWritings] = useState<Record<string, string>>(() => {
    try { return JSON.parse(localStorage.getItem(`toeic-sw-draft-${exam.id}`) || "{}"); }
    catch { return {}; }
  });
  const [recording, setRecording] = useState(false);
  const [savingRecording, setSavingRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mountedRef = useRef(true);
  const recordingUrlsRef = useRef<Set<string>>(new Set());
  const latestRecordingUrlsRef = useRef<Record<string, string>>({});
  const chunksRef = useRef<Blob[]>([]);

  // Speech transcripts feed the automatic grader.
  const [transcripts, setTranscripts] = useState<Record<string, string>>(() => {
    try { return JSON.parse(localStorage.getItem(`toeic-sw-transcripts-${exam.id}`) || "{}"); }
    catch { return {}; }
  });
  const transcriptTaskRef = useRef<string>("");
  const recognizer = useSpeechRecognizer({
    speechLang: "en-US",
    maxSeconds: 120,
    manualStopOnly: true,
    onFinal: (text) => {
      const id = transcriptTaskRef.current;
      if (id) setTranscripts((m) => ({ ...m, [id]: text }));
    },
  });
  useEffect(() => {
    try { localStorage.setItem(`toeic-sw-transcripts-${exam.id}`, JSON.stringify(transcripts)); } catch { /* ignore */ }
  }, [exam.id, transcripts]);
  const [grading, setGrading] = useState(false);
  const [grades, setGrades] = useState<Record<string, SWGrade>>({});
  const [summary, setSummary] = useState<{ speaking: number; writing: number; gradedS: number; gradedW: number } | null>(null);

  // Per-task timer
  const [phase, setPhase] = useState<"prep" | "response">(current?.prepSeconds ? "prep" : "response");
  const [timeLeft, setTimeLeft] = useState(current?.prepSeconds || current?.responseSeconds || 0);
  useEffect(() => {
    setPhase(current?.prepSeconds ? "prep" : "response");
    setTimeLeft(current?.prepSeconds || current?.responseSeconds || 0);
  }, [current]);
  useEffect(() => {
    if (!current || (phase === "response" && timeLeft === 0)) return;
    const id = setTimeout(() => {
      if (timeLeft <= 1 && phase === "prep") {
        setPhase("response");
        setTimeLeft(current.responseSeconds);
      } else {
        setTimeLeft((s) => Math.max(0, s - 1));
      }
    }, 1000);
    return () => clearInterval(id);
  }, [current, phase, timeLeft]);

  useEffect(() => {
    if (phase === "response" && timeLeft === 0 && recording && mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      recognizer.stop();
      setRecording(false);
    }
  }, [phase, timeLeft, recording, recognizer]);

  useEffect(() => {
    try { localStorage.setItem(`toeic-sw-draft-${exam.id}`, JSON.stringify(writings)); }
    catch { /* browser storage may be unavailable */ }
  }, [exam.id, writings]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (mediaRecorderRef.current?.state === "recording") mediaRecorderRef.current.stop();
      recordingUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      recordingUrlsRef.current.clear();
    };
  }, []);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      const taskId = current.id;
      chunksRef.current = [];
      mr.ondataavailable = (e) => chunksRef.current.push(e.data);
      mr.onstop = () => {
        if (!mountedRef.current) { stream.getTracks().forEach((t) => t.stop()); return; }
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        const oldUrl = latestRecordingUrlsRef.current[taskId];
        if (oldUrl) { URL.revokeObjectURL(oldUrl); recordingUrlsRef.current.delete(oldUrl); }
        latestRecordingUrlsRef.current[taskId] = url;
        recordingUrlsRef.current.add(url);
        setRecordings((r) => ({ ...r, [taskId]: url }));
        setSavingRecording(false);
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.onerror = () => {
        stream.getTracks().forEach((t) => t.stop());
        setRecording(false);
        setSavingRecording(false);
      };
      mediaRecorderRef.current = mr;
      mr.start();
      setRecording(true);
      transcriptTaskRef.current = taskId;
      void recognizer.start();
    } catch (err) {
      alert(t("Cần cấp quyền micro.", "Microphone permission required."));
    }
  }
  function stopRecording() {
    if (mediaRecorderRef.current?.state === "recording") {
      setSavingRecording(true);
      mediaRecorderRef.current.stop();
    }
    recognizer.stop();
    setRecording(false);
  }

  function navigateTask(next: () => void) {
    if (recording) stopRecording();
    next();
  }

  async function handleFinish() {
    if (recording || savingRecording || grading) return;
    const payload = [
      ...exam.speakingTasks.map((tk) => ({ tk, section: "speaking" as const, response: transcripts[tk.id] ?? "" })),
      ...exam.writingTasks.map((tk) => ({ tk, section: "writing" as const, response: writings[tk.id] ?? "" })),
    ].filter((x) => x.response.trim().length > 0);
    if (!payload.length) {
      alert(t("Bạn chưa có câu trả lời nào để chấm.", "You have no responses to grade yet."));
      return;
    }
    setGrading(true);
    try {
      const { data, error } = await supabase.functions.invoke("grade-toeic-sw", {
        body: { tasks: payload.map(({ tk, section, response }) => ({ id: tk.id, section, type: tk.type, prompt: tk.prompt, context: tk.imageUrl && tk.sampleAnswer ? `${tk.context ? tk.context + "\n" : ""}Picture description (for the rater): ${tk.sampleAnswer}` : tk.context, response })) },
      });
      if (error || data?.error) throw error ?? new Error(data.error);
      const res = (data?.results ?? {}) as Record<string, SWGrade>;
      setGrades(res);
      // Unanswered tasks count as 0, like the real test.
      const sum = (tasks: ToeicSWTask[]) => tasks.reduce((acc, tk) => {
        const g = res[tk.id];
        const max = g?.max ?? ({ "express-opinion": 5, "write-essay": 5, "respond-email": 4 } as Record<string, number>)[tk.type] ?? 3;
        return { got: acc.got + (g?.score ?? 0), max: acc.max + max, n: acc.n + (g ? 1 : 0) };
      }, { got: 0, max: 0, n: 0 });
      const s = sum(exam.speakingTasks);
      const w = sum(exam.writingTasks);
      const sScore = toScaled(s.got, s.max);
      const wScore = toScaled(w.got, w.max);
      setSummary({ speaking: sScore, writing: wScore, gradedS: s.n, gradedW: w.n });
      saveHistoryEntry({ examId: exam.id, examTitle: exam.title, scoreSpeaking: sScore, scoreWriting: wScore });
      logStudentActivity({
        activityType: "toeic_sw_exam",
        activityId: exam.id,
        score: sScore + wScore,
        maxScore: 400,
        metadata: { examId: exam.id, speaking_scaled: sScore, writing_scaled: wScore, speaking_graded: s.n, writing_graded: w.n, ai_graded: true, percent: Math.round(((sScore + wScore) / 400) * 100) },
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      const h = handleAiError(err, { context: "TOEIC grading" });
      if (!h.handled) alert(t("Chấm bài chưa thành công, vui lòng thử lại.", "Grading failed, please try again."));
    } finally {
      setGrading(false);
    }
  }

  if (!current) return null;
  const wordCount = (writings[current.id] ?? "").trim().split(/\s+/).filter(Boolean).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <Link to="/toeic-exams" className="text-xs text-primary hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> {t("Danh sách đề", "Back to library")}
          </Link>
          <h1 className="text-xl md:text-2xl font-bold mt-1">{exam.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border" aria-label={t(phase === "prep" ? "Thời gian chuẩn bị" : "Thời gian trả lời", phase === "prep" ? "Preparation time" : "Response time")}>
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-muted-foreground">{t(phase === "prep" ? "Chuẩn bị" : "Trả lời", phase === "prep" ? "Prepare" : "Respond")}</span>
            <span className="font-mono text-lg">{fmtTime(timeLeft)}</span>
          </div>
          <Button size="sm" onClick={handleFinish} disabled={recording || savingRecording || grading}>
            {grading ? t("Đang chấm...", "Grading...") : t("Nộp & chấm điểm", "Submit & grade")}
          </Button>
        </div>
      </div>

      {summary && (
        <Card className="mb-4 p-5 bg-primary/5 border-primary/20">
          <h2 className="text-lg font-bold text-foreground">{t("Kết quả chấm tự động", "Automatic grading result")}</h2>
          <div className="grid sm:grid-cols-3 gap-3 mt-3">
            <div className="p-3 rounded-lg bg-card border border-border"><p className="text-xs text-muted-foreground">Speaking (0-200)</p><p className="text-3xl font-bold text-primary">{summary.speaking}</p><p className="text-xs text-muted-foreground">{summary.gradedS}/{exam.speakingTasks.length} {t("câu đã chấm", "tasks graded")}</p></div>
            <div className="p-3 rounded-lg bg-card border border-border"><p className="text-xs text-muted-foreground">Writing (0-200)</p><p className="text-3xl font-bold text-primary">{summary.writing}</p><p className="text-xs text-muted-foreground">{summary.gradedW}/{exam.writingTasks.length} {t("câu đã chấm", "tasks graded")}</p></div>
            <div className="p-3 rounded-lg bg-card border border-border"><p className="text-xs text-muted-foreground">{t("Tổng (0-400)", "Total (0-400)")}</p><p className="text-3xl font-bold text-primary">{summary.speaking + summary.writing}</p><p className="text-xs text-muted-foreground">{t("Điểm ước tính theo thang ETS", "ETS-style estimate")}</p></div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">{t("Câu chưa làm được tính 0 điểm. Mở từng câu để xem nhận xét và bài sửa mẫu.", "Unanswered tasks score 0. Open each task to see feedback and an improved version.")}</p>
        </Card>
      )}

      <div className="flex gap-2 mb-4">
        <Button
          size="sm"
          variant={tab === "speaking" ? "default" : "outline"}
          className={tab === "speaking" ? "" : "border-border text-foreground"}
          onClick={() => navigateTask(() => { setTab("speaking"); setActiveIdx(0); })}
        >
          <Mic className="w-4 h-4 mr-1" /> Speaking ({exam.speakingTasks.length})
        </Button>
        <Button
          size="sm"
          variant={tab === "writing" ? "default" : "outline"}
          className={tab === "writing" ? "" : "border-border text-foreground"}
          onClick={() => navigateTask(() => { setTab("writing"); setActiveIdx(0); })}
        >
          <PenLine className="w-4 h-4 mr-1" /> Writing ({exam.writingTasks.length})
        </Button>
      </div>

      <div className="grid lg:grid-cols-[1fr_220px] gap-6">
        <Card className="bg-card border-border p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <Badge className="bg-primary/10 text-primary border-primary/20">{tab === "speaking" ? "Speaking" : "Writing"} · {t("Câu", "Task")} {activeIdx + 1}</Badge>
              <h2 className="mt-2 text-lg font-semibold text-foreground">{t(SW_TASK_TITLES[current.type].vi, SW_TASK_TITLES[current.type].en)}</h2>
            </div>
            <span className="text-xs text-muted-foreground">
              Task {activeIdx + 1} / {tasks.length}
            </span>
          </div>

          {current.imageUrl && (
            <img src={current.imageUrl} alt="task" className="w-full max-h-80 object-contain rounded-lg mb-3 border border-border bg-muted/50" />
          )}

          {current.context && (
            <div className="mb-3 p-3 rounded-lg bg-muted/50 border border-border text-sm text-foreground whitespace-pre-wrap leading-relaxed">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-primary mb-1">
                {t("Tài liệu tham khảo", "Reference material")}
              </div>
              {current.context}
            </div>
          )}

          <p className="text-base font-medium text-foreground whitespace-pre-wrap mb-4 leading-relaxed">{current.prompt}</p>

          <div className="text-xs text-muted-foreground mb-3">
            {t("Chuẩn bị:", "Prep:")} {current.prepSeconds}s · {t("Trả lời:", "Response:")} {current.responseSeconds}s
          </div>

          {tab === "speaking" ? (
            <div className="space-y-3">
              <div className="flex gap-2">
                {!recording ? (
                  <Button size="sm" className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={startRecording} disabled={phase === "prep" || timeLeft === 0}>
                    <Mic className="w-4 h-4 mr-1" /> {t("Ghi âm", "Record")}
                  </Button>
                ) : (
                  <Button size="sm"  onClick={stopRecording}>
                    <Square className="w-4 h-4 mr-1" /> {t("Dừng", "Stop")}
                  </Button>
                )}
              </div>
              {recordings[current.id] && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t("Nghe lại:", "Playback:")}</p>
                  <audio controls src={recordings[current.id]} className="w-full" />
                </div>
              )}

              {(recording ? recognizer.transcript : transcripts[current.id]) ? (
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <p className="text-xs font-semibold text-primary mb-1">{t("Hệ thống nghe được:", "What the system heard:")}</p>
                  <p className="text-sm text-foreground">{recording ? recognizer.transcript : transcripts[current.id]}</p>
                </div>
              ) : !recognizer.supported ? (
                <p className="text-xs text-destructive">{t("Trình duyệt này không hỗ trợ nhận dạng giọng nói, phần Speaking sẽ không được chấm. Hãy dùng Chrome hoặc Edge.", "This browser does not support speech recognition, so Speaking cannot be graded. Please use Chrome or Edge.")}</p>
              ) : (
                <p className="text-xs text-muted-foreground">{t("Bấm Ghi âm và nói rõ ràng; lời nói sẽ được chuyển thành chữ để chấm điểm khi bạn nộp bài.", "Press Record and speak clearly; your speech is transcribed and graded when you submit.")}</p>
              )}

              {current.sampleAnswer && (
                <details className="text-xs text-foreground">
                  <summary className="cursor-pointer text-primary">{t("Câu trả lời mẫu", "Sample Answer")}</summary>
                  <p className="mt-1">{current.sampleAnswer}</p>
                </details>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <Textarea
                value={writings[current.id] ?? ""}
                onChange={(e) => setWritings((w) => ({ ...w, [current.id]: e.target.value }))}
                placeholder={t("Viết câu trả lời tại đây...", "Type your response here...")}
                className="min-h-[280px] bg-muted/50 border-border text-foreground font-sans text-base leading-relaxed"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{wordCount} {t("từ", "words")}</span>
                <span>{t("Lưu tự động trong trình duyệt", "Auto-saved locally")}</span>
              </div>
              {current.sampleAnswer && (
                <details className="text-xs text-foreground">
                  <summary className="cursor-pointer text-primary">{t("Đáp án mẫu", "Sample Answer")}</summary>
                  <p className="mt-1 whitespace-pre-wrap">{current.sampleAnswer}</p>
                </details>
              )}
            </div>
          )}

          {grades[current.id] && (
            <div className="mt-4 p-4 rounded-lg border border-primary/30 bg-primary/5 space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Sparkles className="w-4 h-4" /> {t("Điểm câu này", "Task score")}: {grades[current.id].score}/{grades[current.id].max}
              </div>
              <p className="text-sm text-foreground">{grades[current.id].feedback}</p>
              {grades[current.id].tip && <p className="text-sm text-foreground"><span className="font-semibold">{t("Mẹo", "Tip")}:</span> {grades[current.id].tip}</p>}
              {grades[current.id].improved && <div className="text-sm text-foreground"><span className="font-semibold">{t("Bản cải thiện", "Improved version")}:</span><p className="whitespace-pre-wrap mt-1">{grades[current.id].improved}</p></div>}
            </div>
          )}

          {current.scoringCriteria && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {current.scoringCriteria.map((c) => (
                <Badge key={c} variant="outline" className="border-border text-foreground text-[10px]">{c}</Badge>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-5">
            <Button
              size="sm"
              variant="outline"
              className="border-primary/50 bg-background text-primary font-semibold hover:bg-primary/10 hover:text-primary disabled:opacity-60"
              disabled={activeIdx === 0}
              onClick={() => navigateTask(() => setActiveIdx((i) => Math.max(0, i - 1)))}
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> {t("Trước", "Prev")}
            </Button>
            <Button
              size="sm"
              
              disabled={activeIdx >= tasks.length - 1}
              onClick={() => navigateTask(() => setActiveIdx((i) => Math.min(tasks.length - 1, i + 1)))}
            >
              {t("Tiếp", "Next")} <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </Card>

        <aside className="lg:sticky lg:top-20 self-start">
          <Card className="bg-card border-border p-4">
            <div className="flex items-center gap-2 mb-3">
              <ListChecks className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold">{t("Danh sách task", "Task List")}</h3>
            </div>
            <div className="space-y-1">
              {tasks.map((tk: ToeicSWTask, i) => {
                const done = tab === "speaking" ? !!(recordings[tk.id] || transcripts[tk.id]) : (writings[tk.id]?.length ?? 0) > 50;
                const active = i === activeIdx;
                return (
                  <button
                    key={tk.id}
                    onClick={() => navigateTask(() => setActiveIdx(i))}
                    className={`w-full text-left px-3 py-2 rounded text-xs ${
                      active ? "bg-primary/15 text-foreground" : done ? "bg-accent text-accent-foreground" : "bg-muted text-foreground hover:bg-secondary"
                    }`}
                  >
                    {i + 1}. {t(SW_TASK_TITLES[tk.type].vi, SW_TASK_TITLES[tk.type].en)}
                  </button>
                );
              })}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};

const ToeicExamRoomGated = () => {
  const { examId = "" } = useParams();
  const known = TOEIC_LR_EXAMS.some((e) => e.id === examId) || TOEIC_SW_EXAMS.some((e) => e.id === examId);
  const free = !known || examId === TOEIC_LR_EXAMS[0]?.id || examId === TOEIC_SW_EXAMS[0]?.id;
  return <PremiumGate free={free} backTo="/toeic-exams"><ToeicExamRoom /></PremiumGate>;
};

export default ToeicExamRoomGated;
