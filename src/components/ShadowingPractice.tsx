/**
 * @file ShadowingPractice.tsx
 * @description Single-Sentence Shadowing module for IELTS Speaking.
 *  4-step flow: Understand → Analysis → Shadow → Record & Grade.
 *  Uses Web Speech API for TTS and STT; grades via word-accuracy + WPM.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useRef, useState } from "react";
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
  SHADOWING_SENTENCES as BASE_SENTENCES,
  type ShadowingSentence,
} from "@/data/shadowingSentences";
import { SHADOWING_EXPANSION } from "@/data/shadowingSentencesExpansion";
import { SHADOWING_EXPANSION_2 } from "@/data/shadowingSentencesExpansion2";

// Combined library - base C1/C2 grammar drills + IELTS Part 1/2/3 expansions
const SHADOWING_SENTENCES: ShadowingSentence[] = [
  ...BASE_SENTENCES,
  ...SHADOWING_EXPANSION,
  ...SHADOWING_EXPANSION_2,
];


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

/**
 * Pick the most natural-sounding English voice the browser exposes.
 * Priority: Neural / Natural / Premium → Google US English → any en-US → any en-*.
 */
function pickBestVoice(): SpeechSynthesisVoice | undefined {
  if (typeof window === "undefined" || !window.speechSynthesis) return undefined;
  const voices = window.speechSynthesis.getVoices();
  const enVoices = voices.filter((v) => v.lang?.toLowerCase().startsWith("en"));
  const premium = enVoices.find((v) =>
    /(neural|natural|premium|enhanced|wavenet|studio)/i.test(v.name)
  );
  if (premium) return premium;
  const branded = enVoices.find((v) =>
    /(google us english|aria|jenny|guy|samantha|microsoft.*online)/i.test(v.name)
  );
  if (branded) return branded;
  const enUs = enVoices.find((v) => /en[-_]US/i.test(v.lang));
  return enUs || enVoices[0];
}

/** Split a sentence into prosodic chunks at commas / semicolons / dashes. */
function splitProsodicChunks(sentence: string): string[] {
  return sentence
    .split(/([,;:\-–])/)
    .reduce<string[]>((acc, part) => {
      if (/^[,;:\-–]$/.test(part)) {
        if (acc.length) acc[acc.length - 1] += part;
      } else if (part.trim()) {
        acc.push(part.trim());
      }
      return acc;
    }, []);
}

/**
 * Human-like TTS: chunk by clause + vary pitch per intonation arrows, with a
 * gentle declarative arc and an end-of-sentence slow-down.
 */
function speak(
  text: string,
  rate = 0.95,
  intonation?: { word: string; direction: "up" | "down" }[]
) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const voice = pickBestVoice();
  const chunks = splitProsodicChunks(text);

  const intMap = new Map<string, "up" | "down">();
  (intonation || []).forEach((i) =>
    intMap.set(i.word.toLowerCase().replace(/[.,!?;:"'()]/g, ""), i.direction)
  );

  const lastIdx = chunks.length - 1;
  chunks.forEach((chunk, idx) => {
    const u = new SpeechSynthesisUtterance(chunk);
    u.lang = voice?.lang || "en-US";
    if (voice) u.voice = voice;
    u.rate = rate;
    const lastWord = chunk
      .replace(/[.,!?;:"'()\-–]+$/g, "")
      .split(/\s+/)
      .pop()
      ?.toLowerCase()
      .replace(/[.,!?;:"'()]/g, "");
    const dir = lastWord ? intMap.get(lastWord) : undefined;
    if (dir === "up") u.pitch = 1.25;
    else if (dir === "down") u.pitch = 0.85;
    else u.pitch = idx === lastIdx ? 0.95 : 1.05;
    if (idx === lastIdx) u.rate = Math.max(0.7, rate - 0.05);
    u.volume = 1;
    window.speechSynthesis.speak(u);
  });
}

interface Props {
  className?: string;
}

const STEPS: { id: Step; label: string; labelVi: string; icon: any }[] = [
  { id: 1, label: "Listen & Understand", labelVi: "Nghe & Hiểu", icon: BookOpen },
  { id: 2, label: "Shadow", labelVi: "Nhại theo", icon: Headphones },
  { id: 3, label: "Record & Grade", labelVi: "Ghi âm & Chấm", icon: Award },
];

type LevelPick = "mix" | "B2" | "C1" | "C2";

/** Pick a random sentence of the level, avoiding recently seen ones. */
function pickRandom(level: LevelPick, recent: string[]): ShadowingSentence | undefined {
  const pool = SHADOWING_SENTENCES.filter((s) => level === "mix" || s.level === level);
  if (!pool.length) return undefined;
  const fresh = pool.filter((s) => !recent.includes(s.id));
  const src = fresh.length ? fresh : pool;
  return src[Math.floor(Math.random() * src.length)];
}

const ShadowingPractice: React.FC<Props> = () => {
  const { t, lang } = useLanguage();
  const [level, setLevel] = useState<LevelPick | null>(null);
  const [current, setCurrent] = useState<ShadowingSentence | undefined>(undefined);
  const recentRef = useRef<string[]>([]);
  const [session, setSession] = useState<{ done: number; total: number }>({ done: 0, total: 0 });
  const [listenCount, setListenCount] = useState(0);
  const [step, setStep] = useState<Step>(1);
  const [rate, setRate] = useState<0.8 | 0.95 | 1.1>(0.95);
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
    return () => { window.speechSynthesis?.cancel(); };
  }, []);

  const nextSentence = (lv: LevelPick = level ?? "mix") => {
    const s = pickRandom(lv, recentRef.current);
    if (s) recentRef.current = [s.id, ...recentRef.current].slice(0, 30);
    setCurrent(s);
  };

  const startLevel = (lv: LevelPick) => {
    setLevel(lv);
    recentRef.current = [];
    setSession({ done: 0, total: 0 });
    nextSentence(lv);
  };

  useEffect(() => {
    // Reset state on sentence change
    setStep(1);
    setTranscript("");
    setInterim("");
    setDuration(0);
    setScore(null);
    setShowVi(false);
    setListenCount(0);
    stopRecording();
    window.speechSynthesis?.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id]);

  const play = (r: number = rate) => {
    if (!current) return;
    speak(current.sentence, r, current.intonation);
    setListenCount((c) => c + 1);
  };

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
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
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
      // user-controlled stop only - see stopRecording
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
    setSession((p) => ({ done: p.done + 1, total: p.total + overall }));
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
        `<p><strong>🎤 Shadowing - ${current.grammarPoint}</strong> <em>(${new Date().toLocaleString()})</em></p>` +
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

  if (!level || !current) {
    const count = (lv: LevelPick) => SHADOWING_SENTENCES.filter((s) => lv === "mix" || s.level === lv).length;
    const levels: { id: LevelPick; title: string; desc: string }[] = [
      { id: "B2", title: "B2", desc: t("Band 6.0-6.5 · câu rõ ràng, cấu trúc phổ biến", "Band 6.0-6.5 · clear, common structures") },
      { id: "C1", title: "C1", desc: t("Band 7.0-7.5 · câu phức, collocation nâng cao", "Band 7.0-7.5 · complex sentences, advanced collocations") },
      { id: "C2", title: "C2", desc: t("Band 8.0+ · đảo ngữ, cấu trúc học thuật", "Band 8.0+ · inversion, academic structures") },
      { id: "mix", title: t("Trộn", "Mixed"), desc: t("Ngẫu nhiên mọi cấp độ để tăng phản xạ", "Random across all levels for reflexes") },
    ];
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Headphones className="w-5 h-5 text-primary" />
            {t("Chọn cấp độ để bắt đầu Shadowing", "Choose a level to start shadowing")}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {t(
              "Mỗi lượt hệ thống đưa ra một câu ngẫu nhiên. Làm 3 bước: Nghe & Hiểu → Nhại theo → Ghi âm & Chấm, rồi sang câu mới.",
              "Each round shows a random sentence. Do 3 steps: Listen & Understand → Shadow → Record & Grade, then move on."
            )}
          </p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {levels.map((lv) => (
            <button
              key={lv.id}
              type="button"
              onClick={() => startLevel(lv.id)}
              className="text-left p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-bold text-foreground">{lv.title}</span>
                <Badge variant="secondary">{count(lv.id)}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{lv.desc}</p>
            </button>
          ))}
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

  const avg = session.done ? Math.round(session.total / session.done) : 0;
  const levelLabel = level === "mix" ? t("Trộn", "Mixed") : level;

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Session bar */}
      <Card>
        <CardContent className="py-3 flex flex-wrap items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => { stopRecording(); window.speechSynthesis?.cancel(); setLevel(null); setCurrent(undefined); }}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            {t("Đổi cấp độ", "Change level")}
          </Button>
          <Badge variant="outline">{t("Cấp độ", "Level")}: {levelLabel}</Badge>
          <span className="text-sm text-muted-foreground">
            {t("Đã luyện", "Done")}: <strong className="text-foreground">{session.done}</strong>
            {session.done > 0 && <> · {t("Điểm TB", "Avg")}: <strong className="text-foreground">{avg}</strong></>}
          </span>
          <Button variant="outline" size="sm" className="ml-auto" onClick={() => nextSentence()} disabled={isRecording}>
            <RefreshCw className="w-4 h-4 mr-1" />
            {t("Bỏ qua, câu khác", "Skip, new sentence")}
          </Button>
        </CardContent>
      </Card>

      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, idx) => {
          const Icon = s.icon;
          const isActive = step === s.id;
          const isDone = step > s.id;
          return (
            <div key={s.id} className="flex items-center flex-1">
              <button
                type="button"
                onClick={() => !isRecording && setStep(s.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full border text-sm font-medium w-full justify-center transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary"
                    : isDone
                      ? "bg-primary/10 text-primary border-primary/30"
                      : "bg-muted text-muted-foreground border-border"
                }`}
              >
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                <span className="hidden sm:inline">{s.id}. {lang === "vi" ? s.labelVi : s.label}</span>
                <span className="sm:hidden">{s.id}</span>
              </button>
              {idx < STEPS.length - 1 && <div className="h-0.5 w-3 bg-border shrink-0" />}
            </div>
          );
        })}
      </div>

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
              {showVi ? t("Ẩn nghĩa", "Hide meaning") : t("Xem nghĩa", "Show meaning")}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-lg p-5 border">
            {renderHighlightedSentence(step === 1 ? "plain" : "intonation")}
            {showVi && <p className="text-sm text-muted-foreground italic mt-3">{current.vietnamese}</p>}
          </div>

          {/* Single audio control row */}
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={() => play()} disabled={isRecording}>
              <Volume2 className="w-4 h-4 mr-1.5" />
              {t("Nghe mẫu", "Play model")}
            </Button>
            {([0.8, 0.95, 1.1] as const).map((r) => (
              <Button key={r} variant={rate === r ? "secondary" : "outline"} size="sm" onClick={() => setRate(r)}>
                {r}x
              </Button>
            ))}
            <span className="text-xs text-muted-foreground ml-auto">
              {t("Đã nghe", "Listened")}: {listenCount}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              {step === 1 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {t("Nghe mẫu 1-2 lần, đọc nghĩa và nắm cấu trúc trọng tâm (tô cam).", "Listen 1-2 times, check the meaning and the key structure (orange).")}
                  </p>
                  <div className="p-3 rounded-lg border bg-muted/30 space-y-2">
                    <p className="text-sm"><span className="font-semibold">{t("Cấu trúc", "Structure")}:</span> <span className="font-mono">{current.grammarSpan}</span></p>
                    <p className="text-sm text-foreground/80">{current.grammarExplanation}</p>
                  </div>
                  <div className="p-3 rounded-lg border bg-muted/30">
                    <p className="text-sm font-semibold mb-1.5">{t("Từ vựng & collocation", "Vocabulary & collocations")}</p>
                    <ul className="space-y-1 mb-2">
                      {current.vocabulary.map((v) => (
                        <li key={v.word} className="text-sm"><span className="font-semibold text-primary">{v.word}</span> - {v.definition}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5">
                      {current.collocations.map((c) => <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>)}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 space-y-2">
                  <p className="text-sm font-medium flex items-center gap-1.5">
                    <Headphones className="w-4 h-4 text-primary" />
                    {t("Bấm Nghe mẫu và nói đè theo ngay (không dừng)", "Press Play model and speak along at the same time")}
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-0.5">
                    <li>{t("Lượt 1-2: tốc độ 0.8x, bắt nhịp", "Rounds 1-2: 0.8x to catch the rhythm")}</li>
                    <li>{t("Lượt 3-5: tốc độ 0.95x-1.1x, nhấn từ in đậm, theo mũi tên ↑↓", "Rounds 3-5: 0.95x-1.1x, stress bold words, follow ↑↓")}</li>
                  </ul>
                  <p className="text-xs text-muted-foreground">
                    {listenCount >= 5 ? t("Tốt! Sẵn sàng ghi âm.", "Great! Ready to record.") : t(`Mục tiêu: 5 lượt (${listenCount}/5)`, `Goal: 5 rounds (${listenCount}/5)`)}
                  </p>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="rounded-lg border bg-card p-4">
                    <div className="flex items-end justify-center gap-1 h-12">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 rounded-full transition-all ${isRecording ? "bg-primary" : "bg-muted-foreground/30"}`}
                          style={{ height: `${isRecording ? 8 + Math.abs(Math.sin(i + visualLevel / 20)) * (visualLevel / 3 + 8) : 4}px` }}
                        />
                      ))}
                    </div>
                    <p className="text-center text-xs text-muted-foreground mt-2">
                      {isRecording ? t(`Đang ghi âm... ${duration}s`, `Recording... ${duration}s`) : t("Nói lại cả câu, không nhìn mẫu nếu có thể", "Say the whole sentence, try not to read")}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    {!isRecording ? (
                      <Button onClick={startRecording} size="lg">
                        <Mic className="w-4 h-4 mr-2" />
                        {score ? t("Ghi âm lại", "Record again") : t("Bắt đầu ghi âm", "Start recording")}
                      </Button>
                    ) : (
                      <Button onClick={finishAndGrade} size="lg" variant="destructive">
                        <Square className="w-4 h-4 mr-2" />
                        {t("Dừng & Chấm điểm", "Stop & Grade")}
                      </Button>
                    )}
                  </div>
                  {(transcript || interim) && (
                    <div className="rounded-lg border bg-muted/40 p-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1">{t("Bạn đã nói:", "You said:")}</p>
                      <p className="text-sm">{transcript} <span className="text-muted-foreground italic">{interim}</span></p>
                    </div>
                  )}
                  {score && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border-2 border-primary/30 bg-primary/5 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold flex items-center gap-2"><Award className="w-5 h-5 text-primary" />{t("Kết quả", "Result")}</p>
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
                        {score.overall >= 75
                          ? t("Rất tốt! Sang câu mới để tăng phản xạ.", "Great! Move on to a new sentence.")
                          : t("Nghe lại, nhấn rõ từ in đậm rồi ghi âm lại.", "Listen again, stress the bold words and record again.")}
                      </p>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between pt-2 border-t">
            <Button variant="outline" size="sm" onClick={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))} disabled={step === 1 || isRecording}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              {t("Bước trước", "Previous")}
            </Button>
            {step < 3 ? (
              <Button size="sm" onClick={() => setStep((s) => ((s + 1) as Step))}>
                {step === 1 ? t("Sang Nhại theo", "Go to Shadow") : t("Sang Ghi âm", "Go to Record")}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button size="sm" onClick={() => nextSentence()} disabled={isRecording}>
                {t("Câu ngẫu nhiên tiếp", "Next random sentence")}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
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
