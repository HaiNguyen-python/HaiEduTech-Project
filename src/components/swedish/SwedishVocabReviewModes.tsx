/**
 * @file SwedishVocabReviewModes.tsx
 * @description EdTech-style multi-mode vocabulary review for Swedish.
 *              5 evidence-based recall modes designed for the YKI A1–B1 bank:
 *                1. Listening   — audio → meaning MCQ (receptive listening)
 *                2. Typing      — meaning → typed Swedish word (productive recall)
 *                3. Matching    — pair Swedish ↔ meaning (associative memory)
 *                4. Cloze       — example sentence with blank (contextual use)
 *                5. Speed drill — 60-sec rapid MCQ (automaticity)
 *              All Swedish prompts auto-play via the existing sv-SE TTS proxy.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2, Headphones, Keyboard, Shuffle, AlignLeft, Zap,
  CheckCircle2, XCircle, RotateCcw, Sparkles, ArrowRight, Lightbulb,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { playSwedishTts, stopSwedishTts } from "@/lib/swedishTts";
import type { SwedishWord } from "@/data/swedishVocabBank";

/* -------------------------------- helpers --------------------------------- */

const speak = (s: string) => { stopSwedishTts(); void playSwedishTts(s, { playbackRate: 0.95, speechRate: 0.85 }); };

const norm = (s: string) =>
  (s ?? "").toLowerCase().normalize("NFC").replace(/[.,!?;:"'()]/g, "").replace(/\s+/g, " ").trim();
// Diacritic-insensitive fallback (so "kor" still matches "kör" for ESL typists).
const stripDiacritics = (s: string) =>
  norm(s).replace(/å/g, "a").replace(/ä/g, "a").replace(/ö/g, "o");

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const pickDistractors = (target: SwedishWord, pool: SwedishWord[], n: number) =>
  shuffle(pool.filter(p => p.id !== target.id)).slice(0, n);

/* ============================== 1. LISTENING ============================== */

const ListeningMode = ({ pool, lang }: { pool: SwedishWord[]; lang: "vi" | "en" }) => {
  const { t } = useLanguage();
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const qs = useMemo(() => shuffle(pool).slice(0, 10), [pool]);
  const q = qs[i];
  const gloss = (w: SwedishWord) => (lang === "vi" ? w.vi : w.en);
  const options = useMemo(() => {
    if (!q) return [];
    return shuffle([gloss(q), ...pickDistractors(q, pool, 3).map(gloss)]);
  }, [q, pool, lang]);

  // Auto-play prompt audio when a new question shows
  useEffect(() => { if (q) speak(q.sv); }, [q]);

  if (!q) return <DonePanel score={score} total={qs.length} onRetry={() => { setI(0); setPicked(null); setScore(0); }} />;
  if (i >= qs.length) return <DonePanel score={score} total={qs.length} onRetry={() => { setI(0); setPicked(null); setScore(0); }} />;

  const reveal = picked != null;
  return (
    <div className="rounded-xl border border-border bg-card p-5 md:p-6 space-y-4">
      <HeaderBar i={i + 1} total={qs.length} score={score} />
      <div className="rounded-xl bg-gradient-to-br from-sky-500/10 to-violet-500/10 border border-sky-500/20 p-6 text-center">
        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
          {t("Nghe và chọn nghĩa đúng", "Listen and pick the correct meaning")}
        </p>
        <button
          onClick={() => speak(q.sv)}
          className="mx-auto inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-md hover:scale-105 transition"
          aria-label="Replay audio"
        >
          <Headphones className="h-7 w-7" />
        </button>
        <p className="mt-3 text-[11px] text-muted-foreground">{t("Bấm để nghe lại", "Tap to replay")}</p>
        {reveal && (
          <p className="mt-3 text-2xl font-bold text-foreground">
            {q.sv} <span className="text-base text-muted-foreground font-mono">{ensureSwedishIpa(q.sv, q.ipa)}</span>
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((opt, oi) => {
          const isCorrect = opt === gloss(q);
          const isPicked = opt === picked;
          return (
            <button
              key={opt}
              disabled={reveal}
              onClick={() => { setPicked(opt); if (isCorrect) setScore(s => s + 1); }}
              className={`text-left rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                reveal
                  ? isCorrect
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : isPicked
                      ? "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300"
                      : "border-border opacity-60"
                  : "border-border hover:border-primary hover:bg-primary/5"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                {reveal && isCorrect && <CheckCircle2 className="h-4 w-4" />}
                {reveal && isPicked && !isCorrect && <XCircle className="h-4 w-4" />}
                <span><span className="font-semibold mr-1">{String.fromCharCode(65 + oi)}.</span>{opt}</span>
              </span>
            </button>
          );
        })}
      </div>
      {reveal && <NextButton onClick={() => { setI(i + 1); setPicked(null); }} />}
    </div>
  );
};

/* ================================ 2. TYPING =============================== */

const TypingMode = ({ pool, lang }: { pool: SwedishWord[]; lang: "vi" | "en" }) => {
  const { t } = useLanguage();
  const [i, setI] = useState(0);
  const [value, setValue] = useState("");
  const [result, setResult] = useState<"idle" | "correct" | "close" | "wrong">("idle");
  const [score, setScore] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const qs = useMemo(() => shuffle(pool).slice(0, 10), [pool]);
  const q = qs[i];
  useEffect(() => { inputRef.current?.focus(); }, [i]);

  if (!q || i >= qs.length)
    return <DonePanel score={score} total={qs.length} onRetry={() => { setI(0); setValue(""); setResult("idle"); setScore(0); }} />;

  const check = () => {
    const target = norm(q.sv);
    const guess = norm(value);
    if (target === guess) { setResult("correct"); setScore(s => s + 1); }
    else if (stripDiacritics(target) === stripDiacritics(guess) && guess.length > 0) { setResult("close"); setScore(s => s + 1); }
    else setResult("wrong");
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 md:p-6 space-y-4">
      <HeaderBar i={i + 1} total={qs.length} score={score} />
      <div className="rounded-xl bg-gradient-to-br from-emerald-500/10 to-sky-500/10 border border-emerald-500/20 p-6 text-center">
        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
          {t("Gõ từ tiếng Thụy Điển cho nghĩa sau", "Type the Swedish word for this meaning")}
        </p>
        <p className="text-2xl md:text-3xl font-bold text-foreground">{lang === "vi" ? q.vi : q.en}</p>
        <p className="text-xs text-muted-foreground mt-1 italic">{q.pos}{q.article ? ` · ${q.article}` : ""}</p>
        {result !== "idle" && (
          <div className="mt-3 inline-flex items-center gap-2">
            <button onClick={() => speak(q.sv)} className="p-2 rounded-full bg-primary/10 hover:bg-primary/20" aria-label="Play">
              <Volume2 className="h-4 w-4 text-primary" />
            </button>
            <span className="text-xl font-bold text-foreground">{q.sv}</span>
            {q.ipa && <span className="font-mono text-xs text-muted-foreground">{q.ipa}</span>}
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Input
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") result === "idle" ? check() : (setI(i + 1), setValue(""), setResult("idle")); }}
          placeholder={t("Gõ tại đây… (gợi ý: bắt đầu bằng “" + q.sv.charAt(0) + "”)",
                         "Type here… (hint: starts with “" + q.sv.charAt(0) + "”)")}
          className="flex-1 min-w-[180px]"
          disabled={result !== "idle"}
        />
        {result === "idle" ? (
          <Button onClick={check} disabled={!value.trim()} className="gap-2">
            <CheckCircle2 className="h-4 w-4" /> {t("Kiểm tra", "Check")}
          </Button>
        ) : (
          <Button onClick={() => { setI(i + 1); setValue(""); setResult("idle"); }} className="gap-2">
            {t("Câu tiếp", "Next")} <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
      {result !== "idle" && (
        <div className={`rounded-lg p-3 text-sm font-semibold ${
          result === "correct" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
          : result === "close" ? "bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30"
          : "bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/30"
        }`}>
          {result === "correct" && t("Chính xác! 🎉", "Correct! 🎉")}
          {result === "close" && t("Gần đúng — chú ý chính tả å/ä/ö.", "Almost — watch å/ä/ö spelling.")}
          {result === "wrong" && t("Chưa đúng. Hãy nghe lại và nhớ chính tả.", "Not quite. Listen again and memorise the spelling.")}
        </div>
      )}
    </div>
  );
};

/* =============================== 3. MATCHING ============================== */

const MatchingMode = ({ pool, lang }: { pool: SwedishWord[]; lang: "vi" | "en" }) => {
  const { t } = useLanguage();
  const PAIRS = 5;
  const [round, setRound] = useState(0);
  const round_pool = useMemo(() => shuffle(pool).slice(0, PAIRS), [pool, round]);
  // IMPORTANT: `left` must be derived from `round_pool` every render, otherwise
  // the second round would keep the FIRST round's Swedish words on the left
  // while the right side re-shuffles from the new pool (bug: no possible matches).
  const left = round_pool;
  const [right, setRight] = useState<SwedishWord[]>(() => shuffle(round_pool));
  const [pickedLeft, setPickedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<[string, string] | null>(null);

  // Re-init on round change
  useEffect(() => { setRight(shuffle(round_pool)); setMatched(new Set()); setPickedLeft(null); setWrongPair(null); }, [round_pool]);

  const gloss = (w: SwedishWord) => (lang === "vi" ? w.vi : w.en);

  const onPickRight = (rId: string) => {
    if (!pickedLeft) return;
    if (matched.has(rId)) return;
    if (pickedLeft === rId) {
      setMatched(prev => new Set(prev).add(rId));
      setPickedLeft(null);
      const w = left.find(w => w.id === rId); if (w) speak(w.sv);
    } else {
      setWrongPair([pickedLeft, rId]);
      setTimeout(() => { setWrongPair(null); setPickedLeft(null); }, 600);
    }
  };

  const done = matched.size === PAIRS;

  return (
    <div className="rounded-xl border border-border bg-card p-5 md:p-6 space-y-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{t("Ghép Svenska với nghĩa", "Match Svenska with the meaning")}</span>
        <span>{matched.size}/{PAIRS} ✓</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {left.map(w => {
            const done = matched.has(w.id);
            const picked = pickedLeft === w.id;
            const wrong = wrongPair?.[0] === w.id;
            return (
              <button
                key={w.id}
                disabled={done}
                onClick={() => { setPickedLeft(w.id); speak(w.sv); }}
                className={`w-full text-left rounded-lg border px-3 py-2.5 text-sm font-semibold transition flex items-center gap-2 ${
                  done ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 opacity-80"
                  : wrong ? "bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-300"
                  : picked ? "bg-primary/10 border-primary text-primary"
                  : "border-border hover:border-primary hover:bg-primary/5"
                }`}
              >
                <Volume2 className="h-3.5 w-3.5 shrink-0" />
                <span>{w.sv}</span>
                {w.article && <span className="text-[10px] text-muted-foreground italic ml-auto">{w.article}</span>}
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          {right.map(w => {
            const done = matched.has(w.id);
            const wrong = wrongPair?.[1] === w.id;
            return (
              <button
                key={w.id + "_r"}
                disabled={done}
                onClick={() => onPickRight(w.id)}
                className={`w-full text-left rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                  done ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 opacity-80"
                  : wrong ? "bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-300"
                  : "border-border hover:border-primary hover:bg-primary/5"
                }`}
              >
                {gloss(w)}
              </button>
            );
          })}
        </div>
      </div>
      {done && (
        <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-4 text-center">
          <Sparkles className="mx-auto h-6 w-6 text-emerald-500" />
          <p className="font-bold mt-1">{t("Hoàn thành vòng ghép!", "Round complete!")}</p>
          <Button onClick={() => setRound(r => r + 1)} className="mt-2 gap-2">
            <RotateCcw className="h-4 w-4" /> {t("Vòng mới", "New round")}
          </Button>
        </div>
      )}
    </div>
  );
};

/* ================================= 4. CLOZE =============================== */

const ClozeMode = ({ pool, lang }: { pool: SwedishWord[]; lang: "vi" | "en" }) => {
  const { t } = useLanguage();
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  // Build a Unicode-aware "whole word" regex for the target. JS's `\b` uses
  // ASCII \w only, so it fails on å/ä/ö (e.g. "kött", "äpple") and the blank
  // never gets inserted -> the answer would stay in the sentence. We use
  // \p{L} lookarounds so any Swedish letter counts as part of the word.
  const buildRe = (word: string) => {
    const esc = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^\\p{L}])(${esc})(?=[^\\p{L}]|$)`, "iu");
  };

  // Only keep words whose example actually contains the target as a whole word.
  const cloze_pool = useMemo(
    () => pool.filter(w => w.example && buildRe(w.sv).test(w.example)),
    [pool]
  );
  const qs = useMemo(() => shuffle(cloze_pool).slice(0, 10), [cloze_pool]);
  const q = qs[i];
  const options = useMemo(() => {
    if (!q) return [];
    return shuffle([q.sv, ...pickDistractors(q, cloze_pool, 3).map(d => d.sv)]);
  }, [q, cloze_pool]);

  useEffect(() => { if (q) speak(q.example); }, [q]);

  if (cloze_pool.length < 4)
    return <EmptyPanel msg={t("Cần ít nhất 4 từ có câu ví dụ phù hợp.", "Need at least 4 words with cloze-friendly examples.")} />;
  if (!q || i >= qs.length)
    return <DonePanel score={score} total={qs.length} onRetry={() => { setI(0); setPicked(null); setScore(0); }} />;

  const sentenceWithBlank = q.example.replace(buildRe(q.sv), "$1_____");
  const reveal = picked != null;

  return (
    <div className="rounded-xl border border-border bg-card p-5 md:p-6 space-y-4">
      <HeaderBar i={i + 1} total={qs.length} score={score} />
      <div className="rounded-xl bg-gradient-to-br from-amber-500/10 to-rose-500/10 border border-amber-500/20 p-5">
        <div className="flex items-start gap-2">
          <Lightbulb className="h-4 w-4 text-amber-500 mt-1 shrink-0" />
          <div className="flex-1">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              {t("Điền từ vào chỗ trống", "Fill in the blank")}
            </p>
            <p className="text-lg md:text-xl font-bold text-foreground leading-snug">
              {reveal
                ? q.example
                : sentenceWithBlank}
            </p>
            <p className="text-xs italic text-muted-foreground mt-1">
              {lang === "vi" ? q.exampleVi : q.exampleEn}
            </p>
          </div>
          <button onClick={() => speak(q.example)} className="p-2 rounded-full bg-primary/10 hover:bg-primary/20" aria-label="Replay">
            <Volume2 className="h-4 w-4 text-primary" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt, oi) => {
          const isCorrect = opt === q.sv;
          const isPicked = opt === picked;
          return (
            <button
              key={opt}
              disabled={reveal}
              onClick={() => { setPicked(opt); if (isCorrect) setScore(s => s + 1); speak(opt); }}
              className={`text-left rounded-lg border px-3 py-2.5 text-sm font-semibold transition ${
                reveal
                  ? isCorrect ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : isPicked ? "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300"
                    : "border-border opacity-60"
                  : "border-border hover:border-primary hover:bg-primary/5"
              }`}
            >
              <span className="font-semibold mr-1">{String.fromCharCode(65 + oi)}.</span>{opt}
            </button>
          );
        })}
      </div>
      {reveal && <NextButton onClick={() => { setI(i + 1); setPicked(null); }} />}
    </div>
  );
};

/* ============================= 5. SPEED DRILL ============================= */

const SpeedMode = ({ pool, lang }: { pool: SwedishWord[]; lang: "vi" | "en" }) => {
  const { t } = useLanguage();
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(60);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [q, setQ] = useState<SwedishWord | null>(null);
  const [opts, setOpts] = useState<string[]>([]);
  const tickRef = useRef<number | null>(null);

  const gloss = (w: SwedishWord) => (lang === "vi" ? w.vi : w.en);

  const newQ = useCallback(() => {
    const target = pool[Math.floor(Math.random() * pool.length)];
    const distract = pickDistractors(target, pool, 3).map(gloss);
    setQ(target);
    setOpts(shuffle([gloss(target), ...distract]));
  }, [pool, lang]);

  const start = () => {
    setScore(0); setStreak(0); setTime(60); setRunning(true); newQ();
  };
  const stop = useCallback(() => {
    setRunning(false);
    if (tickRef.current) { window.clearInterval(tickRef.current); tickRef.current = null; }
  }, []);

  useEffect(() => {
    if (!running) return;
    tickRef.current = window.setInterval(() => {
      setTime(prev => {
        if (prev <= 1) { stop(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => { if (tickRef.current) window.clearInterval(tickRef.current); };
  }, [running, stop]);

  const onPick = (opt: string) => {
    if (!q || !running) return;
    if (opt === gloss(q)) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
      setTime(t => Math.min(90, t + 1)); // reward
    } else {
      setStreak(0);
      setTime(t => Math.max(0, t - 2));   // penalty
    }
    newQ();
  };

  if (!running) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 md:p-8 text-center space-y-4">
        <Zap className="mx-auto h-10 w-10 text-amber-500" />
        <h3 className="text-xl font-bold">{t("Speed Drill — 60 giây", "Speed Drill — 60 seconds")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("Đúng = +1 giây, sai = -2 giây. Mục tiêu: đạt streak liên tục để não tạo phản xạ.",
             "Right = +1s, wrong = −2s. Goal: build a long streak so the recall becomes reflex.")}
        </p>
        {score > 0 && (
          <p className="text-3xl font-extrabold text-primary">{t("Điểm vừa rồi:", "Last score:")} {score}</p>
        )}
        <Button onClick={start} size="lg" className="gap-2">
          <Zap className="h-5 w-5" /> {t("Bắt đầu", "Start")}
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-amber-500/40 bg-card p-5 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30">
          ⏱ {time}s
        </Badge>
        <div className="text-sm font-semibold">
          {t("Điểm", "Score")}: <span className="text-primary">{score}</span>
          <span className="ml-3 text-xs text-muted-foreground">🔥 {streak}</span>
        </div>
        <Button size="sm" variant="ghost" onClick={stop}>{t("Dừng", "Stop")}</Button>
      </div>
      {q && (
        <>
          <div className="rounded-lg bg-muted/50 p-4 text-center">
            <p className="text-3xl font-extrabold text-foreground">{q.sv}</p>
            <button onClick={() => speak(q.sv)} className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline">
              <Volume2 className="h-3.5 w-3.5" /> {t("Nghe", "Listen")}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {opts.map(o => (
              <button
                key={o}
                onClick={() => onPick(o)}
                className="text-left rounded-lg border border-border px-3 py-2.5 text-sm font-medium hover:border-primary hover:bg-primary/5 transition"
              >
                {o}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/* ============================== shared bits =============================== */

const HeaderBar = ({ i, total, score }: { i: number; total: number; score: number }) => {
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-between text-xs text-muted-foreground">
      <span>{t("Câu", "Question")} {i}/{total}</span>
      <div className="flex-1 mx-3 h-1.5 rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-primary transition-all" style={{ width: `${(i / total) * 100}%` }} />
      </div>
      <span>{t("Điểm", "Score")}: <span className="text-primary font-semibold">{score}</span></span>
    </div>
  );
};

const NextButton = ({ onClick }: { onClick: () => void }) => {
  const { t } = useLanguage();
  return (
    <div className="flex justify-end">
      <Button onClick={onClick} className="gap-2">
        {t("Câu tiếp", "Next")} <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

const DonePanel = ({ score, total, onRetry }: { score: number; total: number; onRetry: () => void }) => {
  const { t } = useLanguage();
  const pct = Math.round((score / Math.max(1, total)) * 100);
  return (
    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
      <Sparkles className="mx-auto h-10 w-10 text-emerald-500 mb-3" />
      <p className="text-3xl font-extrabold text-foreground">{score}/{total}</p>
      <p className="text-sm text-muted-foreground mt-1">
        {pct >= 80 ? t("Xuất sắc! 💪", "Excellent! 💪") : pct >= 50 ? t("Tốt, tiếp tục luyện.", "Good — keep going.") : t("Hãy nghe lại các từ và thử lại.", "Listen again and retry.")}
      </p>
      <Button onClick={onRetry} className="mt-4 gap-2">
        <RotateCcw className="h-4 w-4" /> {t("Làm lại", "Try again")}
      </Button>
    </div>
  );
};

const EmptyPanel = ({ msg }: { msg: string }) => (
  <div className="rounded-xl border border-dashed border-border bg-card/60 p-8 text-center text-sm text-muted-foreground">
    {msg}
  </div>
);

/* ================================= MAIN =================================== */

interface Props {
  /** Mastered pool (preferred) */
  masteredPool: SwedishWord[];
  /** Fallback pool — usually current filtered list */
  filteredPool: SwedishWord[];
}

const SwedishVocabReviewModes = ({ masteredPool, filteredPool }: Props) => {
  const { t, lang } = useLanguage();
  const [source, setSource] = useState<"mastered" | "filtered">(masteredPool.length >= 5 ? "mastered" : "filtered");
  const pool = source === "mastered" ? masteredPool : filteredPool;
  const enough = pool.length >= 5;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-4 flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold">{t("Nguồn từ ôn:", "Review pool:")}</span>
        <div className="flex gap-2">
          <button
            onClick={() => setSource("mastered")}
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${source === "mastered" ? "bg-amber-500/20 border-amber-500 text-amber-700 dark:text-amber-300" : "border-border hover:border-primary"}`}
          >
            ⭐ {t("Từ đã thuộc", "Mastered")} ({masteredPool.length})
          </button>
          <button
            onClick={() => setSource("filtered")}
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${source === "filtered" ? "bg-primary/20 border-primary text-primary" : "border-border hover:border-primary"}`}
          >
            🔎 {t("Theo bộ lọc hiện tại", "Current filter")} ({filteredPool.length})
          </button>
        </div>
        <p className="text-[11px] text-muted-foreground basis-full">
          {t("Mẹo: đánh sao ⭐ ít nhất 10 từ rồi ôn theo 'Từ đã thuộc' để củng cố trí nhớ dài hạn.",
             "Tip: star ⭐ at least 10 words then drill the 'Mastered' pool for long-term retention.")}
        </p>
      </div>

      {!enough ? (
        <EmptyPanel msg={t("Cần ít nhất 5 từ trong nguồn ôn. Hãy đánh dấu thêm hoặc đổi bộ lọc.", "Need at least 5 words in the pool. Star more or change filters.")} />
      ) : (
        <Tabs defaultValue="listen" className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-auto">
            <TabsTrigger value="listen" className="flex-col gap-1 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Headphones className="h-4 w-4" />
              <span className="text-[11px] sm:text-xs font-semibold">{t("Nghe", "Listen")}</span>
            </TabsTrigger>
            <TabsTrigger value="type" className="flex-col gap-1 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Keyboard className="h-4 w-4" />
              <span className="text-[11px] sm:text-xs font-semibold">{t("Gõ", "Type")}</span>
            </TabsTrigger>
            <TabsTrigger value="match" className="flex-col gap-1 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Shuffle className="h-4 w-4" />
              <span className="text-[11px] sm:text-xs font-semibold">{t("Ghép", "Match")}</span>
            </TabsTrigger>
            <TabsTrigger value="cloze" className="flex-col gap-1 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <AlignLeft className="h-4 w-4" />
              <span className="text-[11px] sm:text-xs font-semibold">{t("Điền chỗ trống", "Cloze")}</span>
            </TabsTrigger>
            <TabsTrigger value="speed" className="flex-col gap-1 py-2 data-[state=active]:bg-amber-500 data-[state=active]:text-white">
              <Zap className="h-4 w-4" />
              <span className="text-[11px] sm:text-xs font-semibold">{t("Speed", "Speed")}</span>
            </TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <TabsContent value="listen" key="listen">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><ListeningMode pool={pool} lang={lang as any} /></motion.div>
            </TabsContent>
            <TabsContent value="type" key="type">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><TypingMode pool={pool} lang={lang as any} /></motion.div>
            </TabsContent>
            <TabsContent value="match" key="match">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><MatchingMode pool={pool} lang={lang as any} /></motion.div>
            </TabsContent>
            <TabsContent value="cloze" key="cloze">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><ClozeMode pool={pool} lang={lang as any} /></motion.div>
            </TabsContent>
            <TabsContent value="speed" key="speed">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><SpeedMode pool={pool} lang={lang as any} /></motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      )}
    </div>
  );
};

export default SwedishVocabReviewModes;
