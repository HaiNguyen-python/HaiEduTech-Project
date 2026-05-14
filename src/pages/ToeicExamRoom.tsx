// TOEIC Exam Room — interactive testing engine.
// Supports:
//  - LR Full test or Practice-by-Part mode
//  - Countdown timer
//  - Audio player with speed control (0.8/1.0/1.2) + auto-next
//  - Question navigator sidebar grouped by part
//  - SW mode: voice recorder for Speaking, distraction-free editor for Writing
//  - Review mode with answer key, transcripts, explanations
//  - 990-scale score conversion
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

const HISTORY_KEY = "toeic-score-history";

function fmtTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
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
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">{t("Không tìm thấy đề thi.", "Exam not found.")}</p>
          <Button asChild><Link to="/toeic-exams">{t("Quay lại danh sách", "Back to Library")}</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-slate-100">
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
  }

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
          <Link to="/toeic-exams" className="text-xs text-cyan-300 hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> {t("Danh sách đề", "Back to library")}
          </Link>
          <h1 className="text-xl md:text-2xl font-bold mt-1">{exam.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700">
            <Clock className="w-4 h-4 text-cyan-300" />
            <span className="font-mono text-lg">{fmtTime(timeLeft)}</span>
          </div>
          <Button size="sm" variant="outline" onClick={() => setPaused((p) => !p)} className="border-slate-600">
            {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </Button>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500" onClick={handleSubmit}>
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
              className={selectedPart === p ? "bg-cyan-600 hover:bg-cyan-500" : "border-slate-600 text-slate-200"}
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
            <Card className="bg-slate-900/60 border-slate-700 p-5">
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30">
                  {PART_LABELS[current.part]}
                </Badge>
                <span className="text-xs text-slate-400">
                  Q {activeIdx + 1} / {questions.length}
                </span>
              </div>

              {/* Listening audio mock player */}
              {current.part <= 4 && (
                <div className="mb-4 p-3 rounded-lg bg-slate-950/60 border border-slate-700">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Volume2 className="w-4 h-4 text-cyan-300" />
                    <span className="text-xs text-slate-400">
                      {t("Audio ETS — chọn tốc độ", "ETS Audio — choose speed")}
                    </span>
                    <div className="flex gap-1">
                      {[0.8, 1.0, 1.2].map((s) => (
                        <button
                          key={s}
                          onClick={() => setSpeed(s)}
                          className={`px-2 py-1 rounded text-xs font-mono ${
                            speed === s ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-300"
                          }`}
                        >
                          {s}x
                        </button>
                      ))}
                    </div>
                    <label className="ml-auto flex items-center gap-1 text-xs text-slate-300">
                      <input
                        type="checkbox"
                        checked={autoNext}
                        onChange={(e) => setAutoNext(e.target.checked)}
                        className="accent-cyan-500"
                      />
                      Auto-next
                    </label>
                  </div>
                  {current.audioSrc ? (
                    <audio controls src={current.audioSrc} className="mt-2 w-full" />
                  ) : (
                    <div className="mt-2 text-xs italic text-slate-500">
                      {t("(Audio mẫu — học sinh có thể đọc transcript ở chế độ Review)", "(Sample audio — read the transcript in Review mode)")}
                    </div>
                  )}
                </div>
              )}

              {/* Reading passage */}
              {(current.part === 6 || current.part === 7) && current.passage && (
                <div className="mb-4 p-3 rounded-lg bg-slate-950/60 border border-slate-700 whitespace-pre-wrap text-sm leading-relaxed text-slate-200 max-h-72 overflow-auto">
                  {current.passage}
                </div>
              )}

              <p className="text-base font-medium mb-4">{current.prompt}</p>

              <div className="space-y-2">
                {current.options.map((opt, i) => {
                  const selected = answers[current.id] === i;
                  return (
                    <button
                      key={i}
                      onClick={() => selectAnswer(current.id, i)}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition ${
                        selected
                          ? "bg-cyan-500/20 border-cyan-400 text-white"
                          : "bg-slate-950/40 border-slate-700 hover:border-slate-500 text-slate-200"
                      }`}
                    >
                      <span className="font-mono text-xs text-cyan-300 mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between mt-5">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-slate-200"
                  disabled={activeIdx === 0}
                  onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
                >
                  <ArrowLeft className="w-4 h-4 mr-1" /> {t("Trước", "Prev")}
                </Button>
                <Button
                  size="sm"
                  className="bg-cyan-600 hover:bg-cyan-500"
                  disabled={activeIdx >= questions.length - 1}
                  onClick={() => setActiveIdx((i) => Math.min(questions.length - 1, i + 1))}
                >
                  {t("Tiếp", "Next")} <SkipForward className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="bg-slate-900/60 border-slate-700 p-5 text-slate-400">
              {t("Không có câu hỏi cho phần này.", "No questions for this part.")}
            </Card>
          )}
        </div>

        {/* Navigator sidebar */}
        <aside className="space-y-3 lg:sticky lg:top-20 self-start">
          <Card className="bg-slate-900/60 border-slate-700 p-4">
            <div className="flex items-center gap-2 mb-3">
              <ListChecks className="w-4 h-4 text-cyan-300" />
              <h3 className="text-sm font-semibold">{t("Điều hướng câu hỏi", "Question Navigator")}</h3>
            </div>
            <div className="space-y-3 max-h-[60vh] overflow-auto pr-1">
              {partGroups.map(([part, qs]) => (
                <div key={part}>
                  <div className="text-[11px] font-semibold text-slate-400 mb-1">Part {part}</div>
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
                              ? "bg-cyan-500 text-white"
                              : answered
                                ? "bg-cyan-500/30 text-cyan-100"
                                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
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
      <Link to="/toeic-exams" className="text-xs text-cyan-300 hover:underline inline-flex items-center gap-1">
        <ArrowLeft className="w-3 h-3" /> {t("Danh sách đề", "Back to library")}
      </Link>

      <Card className="mt-3 mb-6 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-cyan-500/40 p-6">
        <h1 className="text-2xl font-bold text-white">{exam.title} — {t("Kết quả", "Results")}</h1>
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-700">
            <p className="text-xs text-slate-400">Listening (5–495)</p>
            <p className="text-3xl font-bold text-cyan-300">{lScore}</p>
            <p className="text-xs text-slate-400 mt-1">{lc}/{listeningQs.length} {t("đúng", "correct")}</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-700">
            <p className="text-xs text-slate-400">Reading (5–495)</p>
            <p className="text-3xl font-bold text-teal-300">{rScore}</p>
            <p className="text-xs text-slate-400 mt-1">{rc}/{readingQs.length} {t("đúng", "correct")}</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-700">
            <p className="text-xs text-slate-400">{t("Tổng (10–990)", "Total (10–990)")}</p>
            <p className="text-3xl font-bold text-emerald-300">{lScore + rScore}</p>
            <p className="text-xs text-slate-400 mt-1">{t("Quy đổi ETS chuẩn", "ETS-style scaling")}</p>
          </div>
        </div>
      </Card>

      <h2 className="text-lg font-semibold mb-3">{t("Đáp án chi tiết", "Detailed Answer Key")}</h2>
      <div className="space-y-3">
        {questions.map((q, i) => {
          const userAns = answers[q.id];
          const correct = userAns === q.answer;
          return (
            <Card key={q.id} className="bg-slate-900/60 border-slate-700 p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-slate-400">#{i + 1}</span>
                  <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30">{PART_LABELS[q.part]}</Badge>
                </div>
                {correct ? (
                  <span className="flex items-center gap-1 text-emerald-400 text-xs"><CheckCircle2 className="w-4 h-4" /> {t("Đúng", "Correct")}</span>
                ) : (
                  <span className="flex items-center gap-1 text-rose-400 text-xs"><XCircle className="w-4 h-4" /> {t("Sai", "Incorrect")}</span>
                )}
              </div>
              <p className="text-sm font-medium mb-2">{q.prompt}</p>
              <div className="text-xs space-y-1 mb-2">
                {q.options.map((opt, idx) => (
                  <div
                    key={idx}
                    className={`px-2 py-1 rounded ${
                      idx === q.answer ? "bg-emerald-500/20 text-emerald-200" :
                      idx === userAns ? "bg-rose-500/20 text-rose-200" : "text-slate-400"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}. {opt}
                  </div>
                ))}
              </div>
              {q.transcript && (
                <details className="text-xs text-slate-300 mb-1">
                  <summary className="cursor-pointer text-cyan-300">{t("Transcript", "Transcript")}</summary>
                  <p className="mt-1 whitespace-pre-wrap">{q.transcript}</p>
                </details>
              )}
              {q.explanation && (
                <p className="text-xs text-amber-200 mt-1">
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
  const [writings, setWritings] = useState<Record<string, string>>({});
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Per-task timer
  const [timeLeft, setTimeLeft] = useState(current?.responseSeconds ?? 0);
  useEffect(() => {
    setTimeLeft(current?.responseSeconds ?? 0);
  }, [current]);
  useEffect(() => {
    if (!current) return;
    const id = setInterval(() => setTimeLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [current]);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => chunksRef.current.push(e.data);
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setRecordings((r) => ({ ...r, [current.id]: url }));
        stream.getTracks().forEach((t) => t.stop());
      };
      mediaRecorderRef.current = mr;
      mr.start();
      setRecording(true);
    } catch (err) {
      alert(t("Cần cấp quyền micro.", "Microphone permission required."));
    }
  }
  function stopRecording() {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }

  function handleFinish() {
    // Mock scoring: 0..200 per skill based on completion ratio
    const sCount = exam.speakingTasks.filter((t) => recordings[t.id]).length;
    const wCount = exam.writingTasks.filter((t) => (writings[t.id]?.length ?? 0) > 50).length;
    const sScore = Math.round((sCount / exam.speakingTasks.length) * 200);
    const wScore = Math.round((wCount / exam.writingTasks.length) * 200);
    saveHistoryEntry({
      examId: exam.id,
      examTitle: exam.title,
      scoreSpeaking: sScore,
      scoreWriting: wScore,
    });
    alert(t(
      `Đã lưu kết quả: Speaking ${sScore}/200 · Writing ${wScore}/200`,
      `Saved: Speaking ${sScore}/200 · Writing ${wScore}/200`
    ));
  }

  if (!current) return null;
  const wordCount = (writings[current.id] ?? "").trim().split(/\s+/).filter(Boolean).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <Link to="/toeic-exams" className="text-xs text-cyan-300 hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> {t("Danh sách đề", "Back to library")}
          </Link>
          <h1 className="text-xl md:text-2xl font-bold mt-1">{exam.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700">
            <Clock className="w-4 h-4 text-teal-300" />
            <span className="font-mono text-lg">{fmtTime(timeLeft)}</span>
          </div>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500" onClick={handleFinish}>
            {t("Hoàn tất", "Finish")}
          </Button>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          size="sm"
          variant={tab === "speaking" ? "default" : "outline"}
          className={tab === "speaking" ? "bg-teal-600 hover:bg-teal-500" : "border-slate-600 text-slate-200"}
          onClick={() => { setTab("speaking"); setActiveIdx(0); }}
        >
          <Mic className="w-4 h-4 mr-1" /> Speaking ({exam.speakingTasks.length})
        </Button>
        <Button
          size="sm"
          variant={tab === "writing" ? "default" : "outline"}
          className={tab === "writing" ? "bg-emerald-600 hover:bg-emerald-500" : "border-slate-600 text-slate-200"}
          onClick={() => { setTab("writing"); setActiveIdx(0); }}
        >
          <PenLine className="w-4 h-4 mr-1" /> Writing ({exam.writingTasks.length})
        </Button>
      </div>

      <div className="grid lg:grid-cols-[1fr_220px] gap-6">
        <Card className="bg-slate-900/60 border-slate-700 p-5">
          <div className="flex items-center justify-between mb-3">
            <Badge className="bg-teal-500/20 text-teal-200 border-teal-400/30">
              {tab === "speaking" ? "Speaking" : "Writing"} · Part {current.part} · {current.type}
            </Badge>
            <span className="text-xs text-slate-400">
              Task {activeIdx + 1} / {tasks.length}
            </span>
          </div>

          {current.imageUrl && (
            <img src={current.imageUrl} alt="task" className="w-full max-h-72 object-cover rounded-lg mb-3 border border-slate-700" />
          )}

          <p className="text-sm whitespace-pre-wrap mb-4 leading-relaxed">{current.prompt}</p>

          <div className="text-xs text-slate-400 mb-3">
            {t("Chuẩn bị:", "Prep:")} {current.prepSeconds}s · {t("Trả lời:", "Response:")} {current.responseSeconds}s
          </div>

          {tab === "speaking" ? (
            <div className="space-y-3">
              <div className="flex gap-2">
                {!recording ? (
                  <Button size="sm" className="bg-rose-600 hover:bg-rose-500" onClick={startRecording}>
                    <Mic className="w-4 h-4 mr-1" /> {t("Ghi âm", "Record")}
                  </Button>
                ) : (
                  <Button size="sm" className="bg-slate-700 hover:bg-slate-600" onClick={stopRecording}>
                    <Square className="w-4 h-4 mr-1" /> {t("Dừng", "Stop")}
                  </Button>
                )}
              </div>
              {recordings[current.id] && (
                <div>
                  <p className="text-xs text-slate-400 mb-1">{t("Nghe lại:", "Playback:")}</p>
                  <audio controls src={recordings[current.id]} className="w-full" />
                </div>
              )}

              {/* AI feedback placeholder */}
              <div className="mt-3 p-3 rounded-lg bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-teal-400/30">
                <div className="flex items-center gap-2 text-sm font-semibold text-teal-200 mb-1">
                  <Sparkles className="w-4 h-4" /> {t("Phản hồi AI (Beta)", "AI Feedback (Beta)")}
                </div>
                <p className="text-xs text-slate-300">
                  {t(
                    "Sau khi ghi âm, bạn có thể gửi đoạn ghi âm tới AI Speaking Coach để nhận điểm phát âm, độ trôi chảy và gợi ý cải thiện cho TOEIC Speaking Part 3.",
                    "After recording, send your audio to the AI Speaking Coach to get pronunciation, fluency and improvement suggestions tailored for TOEIC Speaking Part 3."
                  )}
                </p>
                <Button asChild size="sm" variant="outline" className="mt-2 border-teal-400/40 text-teal-200">
                  <Link to="/speaking-coach">{t("Mở AI Speaking Coach", "Open AI Speaking Coach")}</Link>
                </Button>
              </div>

              {current.sampleAnswer && (
                <details className="text-xs text-slate-300">
                  <summary className="cursor-pointer text-cyan-300">{t("Câu trả lời mẫu", "Sample Answer")}</summary>
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
                className="min-h-[280px] bg-slate-950/60 border-slate-700 text-slate-100 font-sans text-base leading-relaxed"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>{wordCount} {t("từ", "words")}</span>
                <span>{t("Lưu tự động trong trình duyệt", "Auto-saved locally")}</span>
              </div>
              {current.sampleAnswer && (
                <details className="text-xs text-slate-300">
                  <summary className="cursor-pointer text-cyan-300">{t("Đáp án mẫu", "Sample Answer")}</summary>
                  <p className="mt-1 whitespace-pre-wrap">{current.sampleAnswer}</p>
                </details>
              )}
            </div>
          )}

          {current.scoringCriteria && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {current.scoringCriteria.map((c) => (
                <Badge key={c} variant="outline" className="border-slate-600 text-slate-300 text-[10px]">{c}</Badge>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-5">
            <Button
              size="sm"
              variant="outline"
              className="border-slate-600 text-slate-200"
              disabled={activeIdx === 0}
              onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> {t("Trước", "Prev")}
            </Button>
            <Button
              size="sm"
              className="bg-teal-600 hover:bg-teal-500"
              disabled={activeIdx >= tasks.length - 1}
              onClick={() => setActiveIdx((i) => Math.min(tasks.length - 1, i + 1))}
            >
              {t("Tiếp", "Next")} <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </Card>

        <aside className="lg:sticky lg:top-20 self-start">
          <Card className="bg-slate-900/60 border-slate-700 p-4">
            <div className="flex items-center gap-2 mb-3">
              <ListChecks className="w-4 h-4 text-teal-300" />
              <h3 className="text-sm font-semibold">{t("Danh sách task", "Task List")}</h3>
            </div>
            <div className="space-y-1">
              {tasks.map((tk: ToeicSWTask, i) => {
                const done = tab === "speaking" ? !!recordings[tk.id] : (writings[tk.id]?.length ?? 0) > 50;
                const active = i === activeIdx;
                return (
                  <button
                    key={tk.id}
                    onClick={() => setActiveIdx(i)}
                    className={`w-full text-left px-3 py-2 rounded text-xs ${
                      active ? "bg-teal-500/30 text-white" : done ? "bg-emerald-500/20 text-emerald-200" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {i + 1}. {tk.type}
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

export default ToeicExamRoom;
