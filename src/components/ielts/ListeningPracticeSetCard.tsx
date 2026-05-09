// Reusable listening practice card with TTS audio + collapsible transcript + auto-grading.
import { useState, useMemo, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Play, Pause, Square, Headphones, Eye, EyeOff,
  CheckCircle2, XCircle, RotateCcw, Gauge,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ListeningPracticeSet } from "@/data/ieltsListeningPractice";
import { cn } from "@/lib/utils";

const sectionColor = (s: number) => {
  switch (s) {
    case 1: return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
    case 2: return "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30";
    case 3: return "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30";
    default: return "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30";
  }
};

const normalize = (s: string) => s.trim().toLowerCase().replace(/[.,!?;:"']/g, "");

interface Props {
  set: ListeningPracticeSet;
  hideHeader?: boolean;
}

const ListeningPracticeSetCard = ({ set: s, hideHeader }: Props) => {
  const { t, lang } = useLanguage();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [rate, setRate] = useState(s.rate ?? 0.95);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => { try { window.speechSynthesis?.cancel(); } catch { /* noop */ } };
  }, []);

  const speak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(s.transcript);
    u.lang = "en-GB";
    u.rate = rate;
    u.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(v => /en[-_]GB/i.test(v.lang)) || voices.find(v => v.lang?.startsWith("en"));
    if (enVoice) u.voice = enVoice;
    u.onend = () => { setPlaying(false); setPaused(false); };
    u.onerror = () => { setPlaying(false); setPaused(false); };
    utterRef.current = u;
    window.speechSynthesis.speak(u);
    setPlaying(true);
    setPaused(false);
  };

  const togglePause = () => {
    if (!window.speechSynthesis) return;
    if (paused) { window.speechSynthesis.resume(); setPaused(false); }
    else { window.speechSynthesis.pause(); setPaused(true); }
  };

  const stop = () => {
    window.speechSynthesis?.cancel();
    setPlaying(false);
    setPaused(false);
  };

  const isCorrect = (qIdx: number): boolean => {
    const q = s.questions[qIdx];
    const userAns = (answers[qIdx] ?? "").toString();
    if (!userAns) return false;
    if (q.type === "mcq") return Number(userAns) === q.answer;
    return normalize(userAns) === normalize(q.answer);
  };

  const score = useMemo(
    () => s.questions.reduce((acc, _q, i) => acc + (isCorrect(i) ? 1 : 0), 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [answers, submitted]
  );
  const percent = Math.round((score / s.questions.length) * 100);

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setShowTranscript(false);
    stop();
  };

  return (
    <Card className="border-l-4 border-l-emerald-500 overflow-hidden">
      <CardContent className="p-5 sm:p-6 space-y-5">
        {!hideHeader && (
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={cn("text-xs", sectionColor(s.section))}>
                {t(`Phần ${s.section}`, `Section ${s.section}`)}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {lang === "vi" ? s.questionTypeVi : s.questionType}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {s.questions.length} {t("câu", "questions")}
              </Badge>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              {lang === "vi" ? s.titleVi : s.title}
            </h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
              {lang === "vi" ? s.contextVi : s.context}
            </p>
          </div>
        )}
        {hideHeader && (
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={cn("text-xs", sectionColor(s.section))}>
              {t(`Phần ${s.section}`, `Section ${s.section}`)}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {lang === "vi" ? s.questionTypeVi : s.questionType}
            </Badge>
            <span className="text-sm font-semibold text-foreground ml-1">
              {lang === "vi" ? s.titleVi : s.title}
            </span>
          </div>
        )}
        {hideHeader && (
          <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed -mt-2">
            {lang === "vi" ? s.contextVi : s.context}
          </p>
        )}

        {/* Audio controls */}
        <div className="rounded-xl bg-muted/40 border border-border p-4 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Headphones className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold">{t("Bài nghe", "Audio")}</span>
            <span className="text-xs text-muted-foreground ml-auto">
              {t("Đọc bằng giọng máy (Web Speech)", "Spoken with browser TTS")}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {!playing ? (
              <Button onClick={speak} size="sm" className="gap-2">
                <Play className="w-4 h-4" /> {t("Phát", "Play")}
              </Button>
            ) : (
              <>
                <Button onClick={togglePause} size="sm" variant="secondary" className="gap-2">
                  {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  {paused ? t("Tiếp tục", "Resume") : t("Tạm dừng", "Pause")}
                </Button>
                <Button onClick={stop} size="sm" variant="outline" className="gap-2">
                  <Square className="w-4 h-4" /> {t("Dừng", "Stop")}
                </Button>
              </>
            )}
            <div className="flex items-center gap-2 ml-auto">
              <Gauge className="w-4 h-4 text-muted-foreground" />
              <select
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="text-xs bg-background border border-border rounded px-2 py-1"
              >
                <option value={0.7}>0.7x</option>
                <option value={0.85}>0.85x</option>
                <option value={0.95}>1.0x</option>
                <option value={1.1}>1.15x</option>
              </select>
              <Button onClick={() => setShowTranscript(v => !v)} size="sm" variant="ghost" className="gap-2">
                {showTranscript ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showTranscript ? t("Ẩn script", "Hide script") : t("Hiện script", "Show script")}
              </Button>
            </div>
          </div>
          {showTranscript && (
            <div className="mt-2 p-3 rounded-lg bg-background border border-border text-sm whitespace-pre-line leading-relaxed text-foreground/90 max-h-72 overflow-y-auto">
              {s.transcript}
            </div>
          )}
        </div>

        {s.matchingOptions && (
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
            <p className="text-xs font-semibold mb-2 text-primary">
              {t("Danh sách lựa chọn", "Answer key (letters)")}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
              {s.matchingOptions.map(o => (
                <div key={o.letter} className="flex items-center gap-2">
                  <span className="font-bold text-primary w-6">{o.letter}.</span>
                  <span>{o.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          {s.questions.map((q, i) => {
            const correct = submitted && isCorrect(i);
            const wrong = submitted && !isCorrect(i);
            return (
              <div
                key={i}
                className={cn(
                  "rounded-lg border p-3 sm:p-4 transition-colors",
                  correct && "border-emerald-500/50 bg-emerald-500/5",
                  wrong && "border-rose-500/50 bg-rose-500/5",
                  !submitted && "border-border bg-background"
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                    {i + 1}
                  </span>
                  <div className="flex-1 space-y-2 min-w-0">
                    <p className="text-sm sm:text-base text-foreground">{q.prompt}</p>
                    {q.type === "mcq" && (
                      <div className="space-y-1.5">
                        {q.options.map((opt, oi) => (
                          <label
                            key={oi}
                            className={cn(
                              "flex items-start gap-2 p-2 rounded cursor-pointer hover:bg-muted/40 transition-colors",
                              answers[i] === String(oi) && "bg-primary/10"
                            )}
                          >
                            <input
                              type="radio"
                              name={`q-${s.id}-${i}`}
                              checked={answers[i] === String(oi)}
                              onChange={() => setAnswers(a => ({ ...a, [i]: String(oi) }))}
                              disabled={submitted}
                              className="mt-1"
                            />
                            <span className="text-sm">
                              <span className="font-semibold mr-2">{String.fromCharCode(65 + oi)}.</span>
                              {opt}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                    {(q.type === "fill-in" || q.type === "matching") && (
                      <Input
                        value={answers[i] ?? ""}
                        onChange={(e) => setAnswers(a => ({ ...a, [i]: e.target.value }))}
                        disabled={submitted}
                        placeholder={
                          q.type === "matching"
                            ? t("Nhập chữ cái (A, B, C...)", "Enter letter (A, B, C...)")
                            : t("Nhập đáp án", "Type your answer")
                        }
                        className="max-w-md"
                      />
                    )}
                    {submitted && (
                      <div className="flex items-start gap-2 text-sm pt-1">
                        {correct ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                            <span className="text-emerald-700 dark:text-emerald-300">
                              {t("Đúng!", "Correct!")}
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                            <span className="text-rose-700 dark:text-rose-300">
                              {t("Đáp án đúng:", "Correct answer:")}{" "}
                              <strong>
                                {q.type === "mcq"
                                  ? `${String.fromCharCode(65 + q.answer)}. ${q.options[q.answer]}`
                                  : q.answer}
                              </strong>
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {!submitted ? (
            <Button onClick={() => setSubmitted(true)} className="gap-2">
              <CheckCircle2 className="w-4 h-4" /> {t("Nộp bài", "Submit answers")}
            </Button>
          ) : (
            <>
              <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                <span className="text-sm font-semibold whitespace-nowrap">
                  {t("Điểm", "Score")}: {score}/{s.questions.length}
                </span>
                <Progress value={percent} className="h-2 flex-1 max-w-xs" />
                <span className="text-sm font-bold text-primary">{percent}%</span>
              </div>
              <Button onClick={handleReset} variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" /> {t("Làm lại", "Try again")}
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ListeningPracticeSetCard;
