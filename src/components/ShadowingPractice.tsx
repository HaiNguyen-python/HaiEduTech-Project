/**
 * @file ShadowingPractice.tsx
 * @description Single-Sentence Shadowing module for IELTS Speaking.
 *  4-step flow: Understand → Analysis → Shadow → Record & Grade.
 *  Uses Web Speech API for TTS and STT; grades via word-accuracy + WPM.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Headphones, Search, Mic, Square, Award, Play, ArrowRight, ArrowLeft,
  RefreshCw, CheckCircle2, BookOpen, Languages, ArrowUp, ArrowDown,
  Sparkles, Volume2, Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  SHADOWING_SENTENCES,
  type ShadowingSentence,
} from "@/data/shadowingSentences";

// Web Speech API types (minimal)
interface ISR {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((e: any) => void) | null;
  onerror: ((e: any) => void) | null;
  onend: (() => void) | null;
}

type Step = 1 | 2 | 3 | 4;

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[.,!?;:"'()]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (s: string) => norm(s).split(" ").filter(Boolean);

/** Levenshtein-based word accuracy (0-100). */
function wordAccuracy(target: string, actual: string): number {
  const a = tokenize(target);
  const b = tokenize(actual);
  if (a.length === 0) return 0;
  const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  const distance = dp[a.length][b.length];
  return Math.max(0, Math.round(((a.length - distance) / a.length) * 100));
}

function speak(text: string, rate = 1) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = rate;
  u.pitch = 1;
  // Prefer a native English voice if available
  const voices = window.speechSynthesis.getVoices();
  const v = voices.find((vv) => /en[-_]US/i.test(vv.lang) && /Google|Samantha|Microsoft|Natural/i.test(vv.name))
    || voices.find((vv) => vv.lang?.toLowerCase().startsWith("en"));
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
}

interface Props {
  className?: string;
}

const STEPS: { id: Step; label: string; labelVi: string; icon: any }[] = [
  { id: 1, label: "Understand", labelVi: "Hiểu", icon: BookOpen },
  { id: 2, label: "Analysis", labelVi: "Phân tích", icon: Sparkles },
  { id: 3, label: "Shadow", labelVi: "Nhại theo", icon: Headphones },
  { id: 4, label: "Record & Grade", labelVi: "Ghi âm & Chấm", icon: Award },
];

const ShadowingPractice: React.FC<Props> = () => {
  const { t, lang } = useLanguage();
  const [levelFilter, setLevelFilter] = useState<"all" | "B2" | "C1" | "C2">("all");
  const [search, setSearch] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const [step, setStep] = useState<Step>(1);
  const [rate, setRate] = useState<0.8 | 1 | 1.2>(1);
  const [showVi, setShowVi] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [duration, setDuration] = useState(0);
  const [score, setScore] = useState<null | { accuracy: number; wpm: number; intonation: number; overall: number }>(null);
  const recogRef = useRef<ISR | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startedAtRef = useRef<number>(0);
  const [visualLevel, setVisualLevel] = useState(0);

  // Pre-load voices (Chrome quirk)
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return SHADOWING_SENTENCES.filter(
      (s) =>
        (levelFilter === "all" || s.level === levelFilter) &&
        (!q ||
          s.sentence.toLowerCase().includes(q) ||
          s.grammarPoint.toLowerCase().includes(q))
    );
  }, [levelFilter, search]);

  const current: ShadowingSentence | undefined = filtered[activeIdx] || filtered[0];

  useEffect(() => {
    // Reset state on sentence change
    setStep(1);
    setTranscript("");
    setInterim("");
    setDuration(0);
    setScore(null);
    setShowVi(false);
    stopRecording();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id]);

  // Animate visualizer while recording
  useEffect(() => {
    if (!isRecording) {
      setVisualLevel(0);
      return;
    }
    const id = setInterval(() => setVisualLevel(Math.random() * 100), 120);
    return () => clearInterval(id);
  }, [isRecording]);

  const startRecording = () => {
    if (!current) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      toast.error(t("Trình duyệt không hỗ trợ ghi âm.", "Your browser does not support speech recognition."));
      return;
    }
    const r = new SR();
    r.continuous = true;
    r.interimResults = true;
    r.lang = "en-US";
    setTranscript("");
    setInterim("");
    setScore(null);
    startedAtRef.current = Date.now();
    setDuration(0);
    timerRef.current = setInterval(() => {
      setDuration(Math.floor((Date.now() - startedAtRef.current) / 1000));
    }, 250);
    r.onresult = (e: any) => {
      let finalT = "";
      let interimT = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) finalT += res[0].transcript;
        else interimT += res[0].transcript;
      }
      if (finalT) setTranscript((p) => (p ? p + " " : "") + finalT.trim());
      setInterim(interimT);
    };
    r.onerror = (e: any) => {
      if (e.error !== "aborted" && e.error !== "no-speech") {
        toast.error(t("Lỗi ghi âm: ", "Recording error: ") + e.error);
      }
    };
    r.onend = () => {
      // user-controlled stop only — see stopRecording
    };
    try {
      r.start();
      recogRef.current = r;
      setIsRecording(true);
    } catch {
      toast.error(t("Không thể bắt đầu ghi âm.", "Could not start recording."));
    }
  };

  const stopRecording = () => {
    try {
      recogRef.current?.stop();
    } catch {/* ignore */}
    recogRef.current = null;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRecording(false);
  };

  const finishAndGrade = () => {
    stopRecording();
    if (!current) return;
    const finalTranscript = (transcript + " " + interim).trim();
    if (!finalTranscript) {
      toast.error(t("Chưa ghi được lời nói nào.", "No speech captured. Please try again."));
      return;
    }
    const accuracy = wordAccuracy(current.sentence, finalTranscript);
    const words = tokenize(finalTranscript).length;
    const minutes = Math.max(0.05, duration / 60);
    const wpm = Math.round(words / minutes);
    // Native English rate ~140-180wpm; map distance to ideal.
    const targetWpm = 150;
    const wpmScore = Math.max(0, 100 - Math.min(100, Math.abs(wpm - targetWpm) * 1.2));
    // Intonation proxy: stressed words actually spoken
    const spoken = new Set(tokenize(finalTranscript));
    const stressedHit = current.stressWords.filter((w) => spoken.has(norm(w))).length;
    const intonation = Math.round((stressedHit / Math.max(1, current.stressWords.length)) * 100);
    const overall = Math.round(accuracy * 0.55 + wpmScore * 0.2 + intonation * 0.25);
    setScore({ accuracy, wpm, intonation, overall });
    saveAttempt({ accuracy, wpm, intonation, overall }, finalTranscript);
  };

  const saveAttempt = async (
    sc: { accuracy: number; wpm: number; intonation: number; overall: number },
    finalTranscript: string
  ) => {
    try {
      const { data: u } = await supabase.auth.getUser();
      if (!u?.user || !current) return;
      const block =
        `<p><strong>🎤 Shadowing — ${current.grammarPoint}</strong> <em>(${new Date().toLocaleString()})</em></p>` +
        `<p><strong>Target:</strong> ${current.sentence}</p>` +
        `<p><strong>You said:</strong> ${finalTranscript}</p>` +
        `<p><strong>Score:</strong> Overall ${sc.overall}/100 · Accuracy ${sc.accuracy}% · WPM ${sc.wpm} · Intonation ${sc.intonation}%</p>`;
      const title = "IELTS Shadowing Practice";
      const { data: rows } = await supabase
        .from("student_notebooks")
        .select("id, content")
        .eq("user_id", u.user.id)
        .eq("title", title)
        .order("updated_at", { ascending: false })
        .limit(1);
      const existing = rows && rows[0];
      const now = new Date().toISOString();
      if (existing) {
        await supabase
          .from("student_notebooks")
          .update({ content: `${existing.content || ""}<hr/>${block}`, updated_at: now })
          .eq("id", existing.id);
      } else {
        await supabase.from("student_notebooks").insert({
          user_id: u.user.id,
          title,
          subject: "ielts",
          content: block,
          is_public: false,
        });
      }
      window.dispatchEvent(new CustomEvent("notebook:updated"));
    } catch (e) {
      console.error("Shadowing save error", e);
    }
  };

  if (!current) {
    return (
      <Card>
        <CardContent className="py-16 text-center text-muted-foreground">
          {t("Không tìm thấy câu nào.", "No sentences found.")}
        </CardContent>
      </Card>
    );
  }

  // ---- Renderers ----

  const renderHighlightedSentence = (mode: "plain" | "stress" | "intonation") => {
    const stressSet = new Set(current.stressWords.map(norm));
    const intoMap = new Map((current.intonation || []).map((i) => [norm(i.word), i.direction]));
    const tokens = current.sentence.split(/(\s+)/);
    const inGrammar = (idx: number) => {
      const before = tokens.slice(0, idx).join("");
      const after = tokens.slice(0, idx + 1).join("");
      return (
        current.sentence.indexOf(current.grammarSpan) <= before.length &&
        after.length <=
          current.sentence.indexOf(current.grammarSpan) + current.grammarSpan.length
      );
    };
    return (
      <p className="text-lg md:text-2xl leading-relaxed font-medium text-foreground tracking-wide">
        {tokens.map((tok, i) => {
          if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
          const key = norm(tok);
          const stressed = mode !== "plain" && stressSet.has(key);
          const arrow = mode === "intonation" ? intoMap.get(key) : undefined;
          const inG = inGrammar(i);
          const vocab = current.vocabulary.find((v) => norm(v.word).split(" ").includes(key));
          const inner = (
            <span
              className={[
                inG ? "bg-[#FFEDD5] dark:bg-orange-500/20 rounded px-0.5" : "",
                stressed ? "font-bold text-primary" : "",
                vocab ? "underline decoration-dotted decoration-emerald-500 underline-offset-4 cursor-help" : "",
              ].join(" ")}
            >
              {tok}
              {arrow === "up" && <ArrowUp className="inline w-4 h-4 ml-0.5 text-emerald-500" />}
              {arrow === "down" && <ArrowDown className="inline w-4 h-4 ml-0.5 text-blue-500" />}
            </span>
          );
          if (vocab) {
            return (
              <Popover key={i}>
                <PopoverTrigger asChild>
                  <button type="button" className="inline">{inner}</button>
                </PopoverTrigger>
                <PopoverContent className="w-72 text-left">
                  <div className="space-y-1.5">
                    <p className="font-semibold text-foreground">{vocab.word}</p>
                    <p className="text-sm text-muted-foreground">{vocab.definition}</p>
                    {vocab.synonyms && vocab.synonyms.length > 0 && (
                      <p className="text-xs">
                        <span className="font-medium">Synonyms: </span>
                        {vocab.synonyms.join(", ")}
                      </p>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            );
          }
          return <span key={i}>{inner}</span>;
        })}
      </p>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* LEFT: sentence library */}
      <div className="lg:col-span-4 space-y-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Headphones className="w-4 h-4 text-primary" />
              {t("Thư viện câu Shadowing", "Shadowing Library")}
              <Badge variant="secondary" className="ml-auto">{filtered.length}</Badge>
            </CardTitle>
            <div className="flex gap-1.5 pt-2 flex-wrap">
              {(["all", "B2", "C1", "C2"] as const).map((lv) => (
                <button
                  key={lv}
                  onClick={() => { setLevelFilter(lv); setActiveIdx(0); }}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                    levelFilter === lv
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/50 border-border hover:bg-muted"
                  }`}
                >
                  {lv === "all" ? t("Tất cả", "All") : lv}
                </button>
              ))}
            </div>
            <div className="relative pt-2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setActiveIdx(0); }}
                placeholder={t("Tìm theo nội dung hoặc ngữ pháp...", "Search by content or grammar...")}
                className="w-full pl-8 pr-2 py-1.5 text-sm rounded-md border bg-background"
              />
            </div>
          </CardHeader>
          <CardContent className="max-h-[640px] overflow-y-auto space-y-2">
            {filtered.map((s, i) => {
              const active = current?.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveIdx(i)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    active
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/50 hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <Badge variant="outline" className="text-[10px]">{s.level}</Badge>
                    <span className="text-[11px] text-muted-foreground">{s.grammarPoint}</span>
                  </div>
                  <p className="text-sm text-foreground line-clamp-2 leading-snug">
                    {s.sentence}
                  </p>
                </button>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* RIGHT: 4-step practice flow */}
      <div className="lg:col-span-8 space-y-4">
        {/* Step indicator */}
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between gap-2">
              {STEPS.map((s, idx) => {
                const Icon = s.icon;
                const isActive = step === s.id;
                const isDone = step > s.id;
                return (
                  <div key={s.id} className="flex items-center flex-1">
                    <button
                      onClick={() => setStep(s.id)}
                      className={`flex flex-col items-center gap-1 transition-all ${
                        isActive ? "scale-110" : ""
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground border-primary shadow-md"
                            : isDone
                              ? "bg-emerald-500/15 text-emerald-600 border-emerald-500/40"
                              : "bg-muted text-muted-foreground border-border"
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                      </div>
                      <span
                        className={`text-[11px] font-medium ${
                          isActive ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {s.id}. {lang === "vi" ? s.labelVi : s.label}
                      </span>
                    </button>
                    {idx < STEPS.length - 1 && (
                      <div className={`h-0.5 flex-1 mx-1 ${step > s.id ? "bg-emerald-500/40" : "bg-border"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                {current.grammarPoint}
                <Badge variant="outline" className="ml-1 text-[10px]">{current.level}</Badge>
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowVi((v) => !v)}>
                <Languages className="w-3.5 h-3.5 mr-1" />
                {showVi ? t("Ẩn nghĩa tiếng Việt", "Hide Vietnamese") : t("Hiện nghĩa tiếng Việt", "Show Vietnamese")}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Sentence display */}
            <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-lg p-5 border">
              {renderHighlightedSentence(step === 3 ? "intonation" : step === 2 ? "stress" : "plain")}
              {showVi && (
                <p className="text-sm text-muted-foreground italic mt-3">
                  🇻🇳 {current.vietnamese}
                </p>
              )}
            </div>

            {/* TTS controls — visible in all steps */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">{t("Tốc độ:", "Speed:")}</span>
              {([0.8, 1, 1.2] as const).map((r) => (
                <Button
                  key={r}
                  variant={rate === r ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRate(r)}
                >
                  {r}x
                </Button>
              ))}
              <Button size="sm" onClick={() => speak(current.sentence, rate)} className="ml-1">
                <Volume2 className="w-4 h-4 mr-1.5" />
                {t("Nghe", "Listen")}
              </Button>
            </div>

            {/* Step-specific body */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {step === 1 && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <p className="text-sm font-medium text-foreground mb-1 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        {t("Giải thích ngữ pháp", "Grammar Explanation")}
                      </p>
                      <p className="text-sm text-foreground/80">{current.grammarExplanation}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <p className="text-sm font-medium text-foreground mb-2">
                        {t("Từ vựng nâng cao", "Advanced Vocabulary")}
                      </p>
                      <ul className="space-y-1.5">
                        {current.vocabulary.map((v) => (
                          <li key={v.word} className="text-sm">
                            <span className="font-semibold text-emerald-700 dark:text-emerald-300">{v.word}</span>
                            <span className="text-foreground/80"> — {v.definition}</span>
                            {v.synonyms && (
                              <span className="text-xs text-muted-foreground"> ({v.synonyms.join(", ")})</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <p className="text-sm font-medium mb-1">{t("Cấu trúc trọng tâm", "Target Structure")}</p>
                      <p className="text-sm text-foreground/80 font-mono bg-background/60 rounded px-2 py-1 inline-block">
                        {current.grammarSpan}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <p className="text-sm font-medium mb-1">{t("Collocations", "Collocations")}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {current.collocations.map((c) => (
                          <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      {t(
                        "Các từ in đậm là từ cần nhấn (stress). Hãy đọc to và nhấn mạnh khi luyện.",
                        "Bold words are stressed syllables. Read aloud and emphasise them when practising."
                      )}
                    </p>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-transparent border border-primary/20">
                      <p className="text-sm font-medium mb-2 flex items-center gap-1.5">
                        <Headphones className="w-4 h-4 text-primary" />
                        {t("Nghe và nhại lại ngay (Shadowing)", "Listen and shadow immediately")}
                      </p>
                      <p className="text-xs text-muted-foreground mb-3">
                        {t(
                          "Mũi tên ↑ = lên giọng, ↓ = xuống giọng. Lặp lại ít nhất 5 lần trước khi sang bước Ghi âm.",
                          "↑ = rising intonation, ↓ = falling. Repeat at least 5 times before moving to Recording."
                        )}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" onClick={() => speak(current.sentence, rate)}>
                          <Play className="w-4 h-4 mr-1.5" />
                          {t("Phát mẫu", "Play model")}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => speak(current.sentence, 0.8)}>
                          0.8x
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => speak(current.sentence, 1.2)}>
                          1.2x
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-4">
                    {/* Visualizer */}
                    <div className="rounded-lg border bg-card p-4">
                      <div className="flex items-end justify-center gap-1 h-16">
                        {Array.from({ length: 24 }).map((_, i) => {
                          const h = isRecording
                            ? 8 + Math.abs(Math.sin(Date.now() / 100 + i)) * (visualLevel / 2 + 10)
                            : 4;
                          return (
                            <div
                              key={i}
                              className={`w-1.5 rounded-full transition-all ${
                                isRecording ? "bg-primary" : "bg-muted-foreground/30"
                              }`}
                              style={{ height: `${h}px` }}
                            />
                          );
                        })}
                      </div>
                      <p className="text-center text-xs text-muted-foreground mt-2">
                        {isRecording
                          ? t(`Đang ghi âm... ${duration}s`, `Recording... ${duration}s`)
                          : t("Sẵn sàng ghi âm", "Ready to record")}
                      </p>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-wrap gap-2 justify-center">
                      {!isRecording ? (
                        <Button onClick={startRecording} size="lg">
                          <Mic className="w-4 h-4 mr-2" />
                          {t("Bắt đầu ghi âm", "Start Recording")}
                        </Button>
                      ) : (
                        <Button onClick={finishAndGrade} size="lg" variant="destructive">
                          <Square className="w-4 h-4 mr-2" />
                          {t("Dừng & Chấm điểm", "Stop & Grade")}
                        </Button>
                      )}
                      <Button
                        onClick={() => { setTranscript(""); setInterim(""); setScore(null); setDuration(0); }}
                        size="lg"
                        variant="outline"
                        disabled={isRecording}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        {t("Làm lại", "Reset")}
                      </Button>
                    </div>

                    {(transcript || interim) && (
                      <div className="rounded-lg border bg-muted/40 p-3">
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          {t("Bạn đã nói:", "You said:")}
                        </p>
                        <p className="text-sm">
                          {transcript}{" "}
                          <span className="text-muted-foreground italic">{interim}</span>
                        </p>
                      </div>
                    )}

                    {score && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-semibold flex items-center gap-2">
                            <Award className="w-5 h-5 text-primary" />
                            {t("Báo cáo điểm", "Score Report")}
                          </p>
                          <span className="text-3xl font-bold text-primary">{score.overall}<span className="text-base text-muted-foreground">/100</span></span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { label: t("Phát âm", "Pronunciation"), value: `${score.accuracy}%`, band: bandFromAccuracy(score.accuracy) },
                            { label: t("Trôi chảy", "Fluency"), value: `${score.wpm} wpm`, band: bandFromWpm(score.wpm) },
                            { label: t("Ngữ điệu", "Intonation"), value: `${score.intonation}%`, band: bandFromAccuracy(score.intonation) },
                          ].map((m) => (
                            <div key={m.label} className="rounded-md bg-background/70 border p-2.5 text-center">
                              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{m.label}</p>
                              <p className="font-semibold text-foreground mt-0.5">{m.value}</p>
                              <Badge variant="outline" className="mt-1 text-[10px]">Band {m.band}</Badge>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {t(
                            "Mẹo: nếu ngữ điệu thấp, hãy nhấn rõ các từ in đậm và bám theo mũi tên ↑↓.",
                            "Tip: if intonation is low, emphasise bold words and follow the ↑↓ arrows."
                          )}
                        </p>
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Step nav */}
            <div className="flex justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))}
                disabled={step === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                {t("Bước trước", "Previous")}
              </Button>
              <Button
                size="sm"
                onClick={() => setStep((s) => (s < 4 ? ((s + 1) as Step) : s))}
                disabled={step === 4}
              >
                {t("Bước tiếp", "Next")}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function bandFromAccuracy(p: number): string {
  if (p >= 90) return "8.5+";
  if (p >= 80) return "7.5";
  if (p >= 70) return "7.0";
  if (p >= 60) return "6.5";
  if (p >= 50) return "6.0";
  return "5.0";
}
function bandFromWpm(wpm: number): string {
  const diff = Math.abs(wpm - 150);
  if (diff <= 15) return "8.0";
  if (diff <= 30) return "7.0";
  if (diff <= 50) return "6.0";
  return "5.5";
}

export default ShadowingPractice;
