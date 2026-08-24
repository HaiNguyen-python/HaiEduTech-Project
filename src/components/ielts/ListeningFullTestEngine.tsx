/**
 * ListeningFullTestEngine - runs a full 40-question IELTS Listening test
 * (Section 1 -> 4) in exam conditions: one shared 30-minute timer, continuous
 * Q1-Q40 numbering, one submission at the end, band score + review after.
 *
 * Rendering and the multi-voice audio engine are reused from
 * ListeningPracticeSetCard via its controlled mode.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle2, Clock, Headphones, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import ListeningPracticeSetCard from "@/components/ielts/ListeningPracticeSetCard";
import type { ListeningPracticeSet } from "@/data/ieltsListeningPractice";
import type { FullListeningTest } from "@/data/ieltsFullListeningTests";
import { bandColor, ieltsListeningBand } from "@/lib/ieltsListeningBand";
import { pushListeningAttempt } from "@/lib/ieltsListeningHistory";
import { logStudentActivity } from "@/hooks/useActivityLogger";

interface Props {
  test: FullListeningTest;
  sets: ListeningPracticeSet[]; // in section order 1..4
  onExit: () => void;
}

const normalize = (v: string) => v.trim().toLowerCase().replace(/[.,!?;:"']/g, "");

type AnswerMap = Record<string, Record<number, string>>;

const ListeningFullTestEngine = ({ test, sets, onExit }: Props) => {
  const { t } = useLanguage();
  const saveKey = `ielts-listening-full::${test.id}`;
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(test.durationMinutes * 60);
  const [restored, setRestored] = useState(false);
  const loggedRef = useRef(false);

  const totalQuestions = useMemo(
    () => sets.reduce((acc, s) => acc + s.questions.length, 0),
    [sets],
  );

  // Continuous Q1..Q40 numbering offsets per section.
  const offsets = useMemo(() => {
    let running = 0;
    return sets.map((s) => {
      const off = running;
      running += s.questions.length;
      return off;
    });
  }, [sets]);

  const score = useMemo(() => {
    let total = 0;
    for (const s of sets) {
      const setAns = answers[s.id] ?? {};
      s.questions.forEach((q, i) => {
        const raw = (setAns[i] ?? "").toString();
        if (!raw) return;
        if (q.type === "mcq") {
          if (Number(raw) === q.answer) total += 1;
        } else if (normalize(raw) === normalize(q.answer)) {
          total += 1;
        }
      });
    }
    return total;
  }, [answers, sets]);

  const answeredCount = useMemo(
    () =>
      sets.reduce(
        (acc, s) =>
          acc +
          s.questions.filter((_q, i) => ((answers[s.id] ?? {})[i] ?? "").toString().trim() !== "").length,
        0,
      ),
    [answers, sets],
  );

  const percent = Math.round((score / Math.max(totalQuestions, 1)) * 100);
  const band = ieltsListeningBand(score, totalQuestions);

  // --- Restore / persist the whole attempt ---
  useEffect(() => {
    try {
      const raw = localStorage.getItem(saveKey);
      if (raw) {
        const data = JSON.parse(raw);
        if (data?.answers && typeof data.answers === "object") setAnswers(data.answers);
        if (data?.submitted) setSubmitted(true);
        if (typeof data?.secondsLeft === "number") setSecondsLeft(data.secondsLeft);
      }
    } catch { /* noop */ }
    setRestored(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveKey]);

  useEffect(() => {
    if (!restored) return;
    const id = window.setTimeout(() => {
      try {
        localStorage.setItem(saveKey, JSON.stringify({ answers, submitted, secondsLeft, ts: Date.now() }));
      } catch { /* noop */ }
    }, 400);
    return () => window.clearTimeout(id);
  }, [answers, submitted, secondsLeft, saveKey, restored]);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    try { window.speechSynthesis?.cancel(); } catch { /* noop */ }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // --- Countdown ---
  useEffect(() => {
    if (submitted) return;
    const id = window.setInterval(() => {
      setSecondsLeft((v) => {
        if (v <= 1) {
          window.clearInterval(id);
          handleSubmit();
          return 0;
        }
        return v - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [submitted, handleSubmit]);

  // Log the attempt once after submission.
  useEffect(() => {
    if (!submitted || loggedRef.current) return;
    loggedRef.current = true;
    pushListeningAttempt({
      id: test.id,
      title: test.title,
      mode: "full",
      score,
      total: totalQuestions,
    });
    logStudentActivity({
      activityType: "ielts_listening_full",
      activityId: test.id,
      score,
      maxScore: totalQuestions,
      metadata: { testId: test.id, band, percent, total_questions: totalQuestions },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setSecondsLeft(test.durationMinutes * 60);
    loggedRef.current = false;
    try { localStorage.removeItem(saveKey); } catch { /* noop */ }
    try { window.speechSynthesis?.cancel(); } catch { /* noop */ }
  };

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const lowTime = !submitted && secondsLeft <= 300;

  const setAnswersFor = useCallback(
    (setId: string) =>
      (updater: (prev: Record<number, string>) => Record<number, string>) =>
        setAnswers((prev) => ({ ...prev, [setId]: updater(prev[setId] ?? {}) })),
    [],
  );

  return (
    <div className="space-y-5">
      {/* Sticky exam header */}
      <div className="sticky top-16 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onExit} className="gap-1">
            <ArrowLeft className="w-4 h-4" /> {t("Danh sách đề", "All tests")}
          </Button>
          <div className="flex items-center gap-2 min-w-[180px]">
            <Headphones className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-sm sm:text-base">{test.title}</span>
          </div>
          <Badge variant="outline" className="text-[11px]">
            {answeredCount}/{totalQuestions} {t("câu đã trả lời", "answered")}
          </Badge>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-bold tabular-nums",
              lowTime ? "border-rose-500 text-rose-600 animate-pulse" : "border-border text-foreground",
            )}
          >
            <Clock className="w-4 h-4" /> {mm}:{ss}
          </span>
          {!submitted ? (
            <Button size="sm" onClick={handleSubmit} className="gap-2 ml-auto">
              <CheckCircle2 className="w-4 h-4" /> {t("Nộp bài", "Submit test")}
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={handleReset} className="gap-2 ml-auto">
              <RotateCcw className="w-4 h-4" /> {t("Làm lại", "Try again")}
            </Button>
          )}
        </div>
      </div>

      {submitted && (
        <Card className="border-primary/30 bg-gradient-to-r from-blue-500/5 to-emerald-500/5">
          <CardContent className="p-4 sm:p-5 flex flex-wrap items-center gap-4">
            <span className="text-lg font-bold">
              {t("Điểm", "Score")}: {score}/{totalQuestions}
            </span>
            <Progress value={percent} className="h-2 flex-1 min-w-[140px] max-w-sm" />
            <span className="text-sm font-bold text-primary">{percent}%</span>
            <span className={cn("text-sm font-bold", bandColor(band))}>
              📊 {t("Band ước tính", "Est. Band")}: {band.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">
              {t(
                "Xem lại từng section bên dưới - đáp án đúng, transcript và giải thích AI.",
                "Review each section below - correct answers, transcript and AI explanations.",
              )}
            </span>
          </CardContent>
        </Card>
      )}

      {sets.map((s, idx) => (
        <div key={s.id} className="space-y-2">
          <div className="flex items-center gap-2 pt-2">
            <Badge className="bg-emerald-600 text-white text-[11px]">
              {t("Phần", "Section")} {s.section}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {t("Câu", "Questions")} {offsets[idx] + 1}-{offsets[idx] + s.questions.length}
            </span>
          </div>
          <ListeningPracticeSetCard
            set={s}
            controlled={{
              answers: answers[s.id] ?? {},
              setAnswers: setAnswersFor(s.id),
              submitted,
              numberOffset: offsets[idx],
              forceExamMode: true,
            }}
          />
        </div>
      ))}

      <div className="flex justify-center pt-2">
        {!submitted ? (
          <Button size="lg" onClick={handleSubmit} className="gap-2">
            <CheckCircle2 className="w-5 h-5" /> {t("Nộp bài cả đề", "Submit whole test")}
          </Button>
        ) : (
          <Button size="lg" variant="outline" onClick={handleReset} className="gap-2">
            <RotateCcw className="w-5 h-5" /> {t("Làm lại đề này", "Retake this test")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ListeningFullTestEngine;
