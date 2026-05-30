// Reusable listening practice card with TTS audio + collapsible transcript + auto-grading.
// Upgrades: auto-save, multi-accent voice picker, IELTS band score, exam mode, AI explain wrong answers.
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  Play, Pause, Square, Headphones, Eye, EyeOff,
  CheckCircle2, XCircle, RotateCcw, Gauge,
  SkipBack, SkipForward, Sparkles, ShieldAlert, Mic2, Save,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ListeningPracticeSet } from "@/data/ieltsListeningPractice";
import { cn } from "@/lib/utils";
import DOMPurify from "dompurify";
import { ieltsListeningBand, bandColor } from "@/lib/ieltsListeningBand";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type AccentKey = "en-GB" | "en-US" | "en-AU";
const ACCENT_LABELS: Record<AccentKey, string> = {
  "en-GB": "🇬🇧 UK",
  "en-US": "🇺🇸 US",
  "en-AU": "🇦🇺 AU",
};

interface ExplainResult {
  quote?: string;
  keyword?: string;
  why?: string;
  trap?: string;
  tip?: string;
  error?: string;
}

const formatTime = (sec: number) => {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

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
  // Slower, more natural default — matches real exam pacing.
  const [rate, setRate] = useState(s.rate ?? 0.85);
  const chunkTimerRef = useRef<number | null>(null);
  const cancelledRef = useRef(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [elapsedInChunk, setElapsedInChunk] = useState(0);
  const chunkStartedAtRef = useRef<number>(0);
  const tickRef = useRef<number | null>(null);
  const pausedAccumRef = useRef(0);
  const pausedAtRef = useRef<number | null>(null);

  // --- New: accent picker (UK/US/AU) ---
  const [accent, setAccent] = useState<AccentKey>(() => {
    if (typeof window === "undefined") return "en-GB";
    return (localStorage.getItem("ielts-listening-accent") as AccentKey) || "en-GB";
  });
  useEffect(() => { localStorage.setItem("ielts-listening-accent", accent); }, [accent]);

  // --- New: exam mode (mô phỏng phòng thi: 1 lần phát, ẩn transcript & seek) ---
  const [examMode, setExamMode] = useState(false);

  // --- New: AI explain per wrong question ---
  const [explainOpen, setExplainOpen] = useState<Record<number, boolean>>({});
  const [explainData, setExplainData] = useState<Record<number, ExplainResult>>({});
  const [explainLoading, setExplainLoading] = useState<Record<number, boolean>>({});

  // --- New: auto-save key ---
  const saveKey = `ielts-listening-progress::${s.id}`;
  const [restoredOnce, setRestoredOnce] = useState(false);

  // Split transcript into natural chunks (sentences / dialogue turns).
  const buildChunks = (text: string): string[] => {
    const lines = text.split(/\n+/).map(l => l.trim()).filter(Boolean);
    const chunks: string[] = [];
    for (const line of lines) {
      const parts = line.match(/[^.!?]+[.!?]+["')\]]*|[^.!?]+$/g) ?? [line];
      for (const p of parts) {
        const trimmed = p.trim();
        if (trimmed) chunks.push(trimmed);
      }
    }
    return chunks;
  };

  const chunks = useMemo(() => buildChunks(s.transcript), [s.transcript]);

  // Estimate per-chunk duration (speak time + trailing gap) in seconds.
  // Baseline ~160 wpm at rate=1.0 → ~0.375s/word; account for spelling slowdown + gap.
  const chunkDurations = useMemo(() => {
    return chunks.map((c, i) => {
      const words = c.trim().split(/\s+/).length;
      const isSpelling = /(?:\b[A-Z](?:[-\s][A-Z]){2,}\b)|(?:\b\d{4,}\b)/.test(c);
      const effRate = isSpelling ? Math.min(rate, 0.55) : rate;
      const speakSec = (words * 0.38) / Math.max(effRate, 0.3);
      const next = chunks[i + 1] ?? "";
      const isDialogueChange = /^[A-Z][a-z]+:/.test(next) && !/^[A-Z][a-z]+:/.test(c);
      const gapMs = isSpelling ? 900 : isDialogueChange ? 700 : /[?!]$/.test(c) ? 550 : 420;
      return speakSec + gapMs / 1000;
    });
  }, [chunks, rate]);

  const cumulative = useMemo(() => {
    const arr: number[] = [0];
    for (let i = 0; i < chunkDurations.length - 1; i++) arr.push(arr[i] + chunkDurations[i]);
    return arr;
  }, [chunkDurations]);
  const totalDuration = useMemo(
    () => chunkDurations.reduce((a, b) => a + b, 0),
    [chunkDurations]
  );
  const currentTime = Math.min(totalDuration, (cumulative[currentIdx] ?? 0) + elapsedInChunk);

  const stopTick = () => {
    if (tickRef.current) { window.clearInterval(tickRef.current); tickRef.current = null; }
  };
  const startTick = () => {
    stopTick();
    tickRef.current = window.setInterval(() => {
      if (pausedAtRef.current != null) return;
      const now = performance.now();
      const e = (now - chunkStartedAtRef.current - pausedAccumRef.current) / 1000;
      setElapsedInChunk(Math.max(0, e));
    }, 200) as unknown as number;
  };

  useEffect(() => {
    return () => {
      try { window.speechSynthesis?.cancel(); } catch { /* noop */ }
      if (chunkTimerRef.current) window.clearTimeout(chunkTimerRef.current);
      stopTick();
    };
  }, []);

  const pickVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const re = new RegExp(accent.replace("-", "[-_]"), "i");
    return (
      voices.find(v => re.test(v.lang) && /natural|premium|neural|enhanced/i.test(v.name)) ||
      voices.find(v => re.test(v.lang)) ||
      voices.find(v => v.lang?.startsWith("en"))
    );
  };

  const speakChunks = useCallback((startIdx: number) => {
    if (cancelledRef.current) return;
    if (startIdx >= chunks.length) {
      setPlaying(false);
      setPaused(false);
      setCurrentIdx(0);
      setElapsedInChunk(0);
      stopTick();
      return;
    }
    setCurrentIdx(startIdx);
    setElapsedInChunk(0);
    chunkStartedAtRef.current = performance.now();
    pausedAccumRef.current = 0;
    pausedAtRef.current = null;

    const raw = chunks[startIdx];
    const isSpelling = /(?:\b[A-Z](?:[-\s][A-Z]){2,}\b)|(?:\b(?:zero|one|two|three|four|five|six|seven|eight|nine|oh|double|triple)(?:[\s,-]+(?:zero|one|two|three|four|five|six|seven|eight|nine|oh|double|triple)){2,}\b)|(?:\b\d{4,}\b)/i.test(raw);
    const text = isSpelling
      ? raw.replace(/-/g, ", ").replace(/\b([A-Z])\b/g, "$1,")
      : raw;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = accent;
    u.rate = isSpelling ? Math.min(rate, 0.55) : rate;
    u.pitch = 1;
    const v = pickVoice();
    if (v) u.voice = v;
    const isDialogueChange =
      startIdx > 0 && /^[A-Z][a-z]+:/.test(chunks[startIdx]) && !/^[A-Z][a-z]+:/.test(chunks[startIdx - 1]);
    const gapMs = isSpelling ? 900 : isDialogueChange ? 700 : /[?!]$/.test(chunks[startIdx - 1] ?? "") ? 550 : 420;
    u.onend = () => {
      if (cancelledRef.current) return;
      chunkTimerRef.current = window.setTimeout(() => speakChunks(startIdx + 1), gapMs);
    };
    u.onerror = () => { setPlaying(false); setPaused(false); stopTick(); };
    window.speechSynthesis.speak(u);
  }, [chunks, rate]);

  const speak = (fromIdx = 0) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (chunkTimerRef.current) window.clearTimeout(chunkTimerRef.current);
    window.speechSynthesis.cancel();
    cancelledRef.current = false;
    setPlaying(true);
    setPaused(false);
    startTick();
    speakChunks(fromIdx);
  };

  const togglePause = () => {
    if (!window.speechSynthesis) return;
    if (paused) {
      window.speechSynthesis.resume();
      if (pausedAtRef.current != null) {
        pausedAccumRef.current += performance.now() - pausedAtRef.current;
        pausedAtRef.current = null;
      }
      setPaused(false);
    } else {
      window.speechSynthesis.pause();
      pausedAtRef.current = performance.now();
      setPaused(true);
    }
  };

  const stop = () => {
    cancelledRef.current = true;
    if (chunkTimerRef.current) window.clearTimeout(chunkTimerRef.current);
    window.speechSynthesis?.cancel();
    stopTick();
    setPlaying(false);
    setPaused(false);
    setCurrentIdx(0);
    setElapsedInChunk(0);
  };

  // Seek to a time (seconds) by finding the corresponding chunk and restarting playback there.
  const seekToTime = (timeSec: number) => {
    if (!chunks.length) return;
    let idx = 0;
    for (let i = 0; i < cumulative.length; i++) {
      if (cumulative[i] <= timeSec) idx = i; else break;
    }
    if (playing) {
      speak(idx);
    } else {
      setCurrentIdx(idx);
      setElapsedInChunk(0);
    }
  };

  const skipChunks = (delta: number) => {
    const target = Math.max(0, Math.min(chunks.length - 1, currentIdx + delta));
    if (playing) speak(target);
    else { setCurrentIdx(target); setElapsedInChunk(0); }
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

  const band = useMemo(() => ieltsListeningBand(score, s.questions.length), [score, s.questions.length]);

  // --- Auto-save (debounced) ---
  useEffect(() => {
    if (!restoredOnce) return;
    const id = window.setTimeout(() => {
      try {
        localStorage.setItem(saveKey, JSON.stringify({ answers, submitted, examMode, ts: Date.now() }));
      } catch { /* noop */ }
    }, 400);
    return () => window.clearTimeout(id);
  }, [answers, submitted, examMode, saveKey, restoredOnce]);

  // --- Restore on mount ---
  useEffect(() => {
    try {
      const raw = localStorage.getItem(saveKey);
      if (raw) {
        const data = JSON.parse(raw);
        if (data?.answers && typeof data.answers === "object") setAnswers(data.answers);
        if (data?.submitted) setSubmitted(true);
        if (data?.examMode) setExamMode(true);
      }
    } catch { /* noop */ }
    setRestoredOnce(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setShowTranscript(false);
    setExplainOpen({});
    setExplainData({});
    try { localStorage.removeItem(saveKey); } catch { /* noop */ }
    stop();
  };

  // --- AI explain a wrong question ---
  const requestExplain = async (qIdx: number) => {
    const q = s.questions[qIdx];
    setExplainOpen(o => ({ ...o, [qIdx]: true }));
    if (explainData[qIdx] && !explainData[qIdx].error) return;
    setExplainLoading(l => ({ ...l, [qIdx]: true }));
    try {
      const userAns = answers[qIdx] ?? "";
      const correctAnswer = q.type === "mcq" ? `${String.fromCharCode(65 + q.answer)}. ${q.options[q.answer]}` : q.answer;
      const userPretty = q.type === "mcq" && userAns !== ""
        ? `${String.fromCharCode(65 + Number(userAns))}. ${q.options[Number(userAns)] ?? ""}`
        : String(userAns);
      const { data, error } = await supabase.functions.invoke("explain-ielts-listening", {
        body: {
          transcript: s.transcript,
          question: q.prompt,
          correctAnswer,
          userAnswer: userPretty,
          questionType: s.questionType,
          language: lang,
        },
      });
      if (error) throw error;
      setExplainData(d => ({ ...d, [qIdx]: data as ExplainResult }));
    } catch (e) {
      console.error("explain-ielts-listening failed", e);
      setExplainData(d => ({ ...d, [qIdx]: { error: e instanceof Error ? e.message : "Failed" } }));
      toast({
        title: t("Không lấy được lời giải", "Could not fetch explanation"),
        description: t("Vui lòng thử lại sau vài giây.", "Please try again in a moment."),
        variant: "destructive",
      });
    } finally {
      setExplainLoading(l => ({ ...l, [qIdx]: false }));
    }
  };

  // Build a set of answer keywords for transcript highlighting after submit.
  const answerKeywords = useMemo(() => {
    if (!submitted) return [] as string[];
    const out: string[] = [];
    for (const q of s.questions) {
      if (q.type === "fill-in" && typeof q.answer === "string") {
        const cleaned = q.answer.replace(/[.,!?;:"']/g, "").trim();
        if (cleaned.length >= 2 && cleaned.length <= 40) out.push(cleaned);
      }
      if (q.type === "mcq") {
        const opt = q.options?.[q.answer];
        if (opt) {
          const w = opt.split(/\s+/).filter(x => x.length >= 4).slice(0, 2);
          out.push(...w);
        }
      }
    }
    return Array.from(new Set(out));
  }, [submitted, s.questions]);

  const highlightedTranscript = useMemo(() => {
    if (!submitted || answerKeywords.length === 0) {
      return s.transcript;
    }
    let html = s.transcript
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    for (const kw of answerKeywords) {
      const safe = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      html = html.replace(
        new RegExp(`\\b(${safe})\\b`, "gi"),
        `<mark class="bg-yellow-300/70 dark:bg-yellow-500/40 rounded px-0.5 font-semibold">$1</mark>`
      );
    }
    return html;
  }, [submitted, answerKeywords, s.transcript]);

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
            <Badge
              variant={examMode ? "default" : "outline"}
              className={cn(
                "cursor-pointer text-[10px] gap-1",
                examMode && "bg-rose-600 hover:bg-rose-700 text-white border-rose-600"
              )}
              onClick={() => {
                if (submitted) return;
                setExamMode(v => {
                  const next = !v;
                  if (next) { setShowTranscript(false); stop(); }
                  return next;
                });
              }}
              title={t("Mô phỏng phòng thi: 1 lần phát, ẩn script & thanh tua", "Exam mode: single play, hide script & seek bar")}
            >
              <ShieldAlert className="w-3 h-3" />
              {examMode ? t("Exam Mode • ON", "Exam Mode • ON") : t("Bật Exam Mode", "Enable Exam Mode")}
            </Badge>
            <span className="text-xs text-muted-foreground ml-auto">
              {t("Đọc bằng giọng máy (Web Speech)", "Spoken with browser TTS")}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {!playing ? (
              <Button onClick={() => speak(currentIdx)} size="sm" className="gap-2">
                <Play className="w-4 h-4" />
                {currentIdx > 0 ? t("Tiếp tục", "Resume") : t("Phát", "Play")}
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
            <Button
              onClick={() => skipChunks(-1)}
              size="sm"
              variant="outline"
              className="gap-1 px-2"
              title={t("Lùi 1 câu", "Previous sentence")}
              disabled={currentIdx <= 0 && elapsedInChunk < 0.5}
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => skipChunks(1)}
              size="sm"
              variant="outline"
              className="gap-1 px-2"
              title={t("Tới 1 câu", "Next sentence")}
              disabled={currentIdx >= chunks.length - 1}
            >
              <SkipForward className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2 ml-auto">
              <Gauge className="w-4 h-4 text-muted-foreground" />
              <select
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="text-xs bg-background border border-border rounded px-2 py-1"
                title={t("Tốc độ phát", "Playback speed")}
              >
                <option value={0.7}>0.7x — {t("rất chậm", "very slow")}</option>
                <option value={0.85}>0.85x — {t("tự nhiên", "natural")}</option>
                <option value={0.95}>0.95x — {t("đề thi thật", "exam pace")}</option>
                <option value={1.1}>1.1x — {t("nhanh", "fast")}</option>
              </select>

              <Button onClick={() => setShowTranscript(v => !v)} size="sm" variant="ghost" className="gap-2">
                {showTranscript ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showTranscript ? t("Ẩn script", "Hide script") : t("Hiện script", "Show script")}
              </Button>
            </div>
          </div>

          {/* Seekable progress bar */}
          <div className="flex items-center gap-3 pt-1">
            <span className="text-xs font-mono text-muted-foreground tabular-nums w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[Math.min(currentTime, totalDuration)]}
              min={0}
              max={Math.max(1, totalDuration)}
              step={0.5}
              onValueChange={(v) => {
                const t0 = v[0] ?? 0;
                // Update display immediately for responsive scrubbing
                let idx = 0;
                for (let i = 0; i < cumulative.length; i++) {
                  if (cumulative[i] <= t0) idx = i; else break;
                }
                setCurrentIdx(idx);
                setElapsedInChunk(Math.max(0, t0 - (cumulative[idx] ?? 0)));
              }}
              onValueCommit={(v) => seekToTime(v[0] ?? 0)}
              className="flex-1"
              aria-label={t("Thanh tua bài nghe", "Audio seek bar")}
            />
            <span className="text-xs font-mono text-muted-foreground tabular-nums w-10">
              {formatTime(totalDuration)}
            </span>
          </div>

          {showTranscript && (
            <div className="mt-2 rounded-lg bg-background border border-border overflow-hidden">
              <div className="px-3 py-1.5 bg-muted/60 text-xs font-semibold text-foreground border-b border-border">
                {submitted
                  ? t("📝 Script bài nghe — đối chiếu lại từng câu", "📝 Listening transcript — review every line")
                  : t("📝 Script bài nghe", "📝 Listening transcript")}
              </div>
              <div className="p-3 text-sm whitespace-pre-line leading-relaxed text-foreground/90 max-h-80 overflow-y-auto">
                {s.transcript}
              </div>
            </div>
          )}

        </div>

        {s.mapSvg && (
          <div className="rounded-lg bg-white border-2 border-emerald-500/40 p-3 overflow-x-auto">
            <p className="text-xs font-semibold mb-2 text-emerald-700">
              {t("🗺️ Bản đồ / sơ đồ tham khảo", "🗺️ Map / Plan reference")}
            </p>
            <div
              className="flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(s.mapSvg, {
                  USE_PROFILES: { svg: true, svgFilters: true },
                }),
              }}
            />
          </div>
        )}

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
            <Button onClick={() => { setSubmitted(true); setShowTranscript(true); stop(); }} className="gap-2">
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
