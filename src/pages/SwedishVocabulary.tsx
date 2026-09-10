/**
 * @file SwedishVocabulary.tsx
 * @description Swedish vocabulary bank — flashcards, list view, MCQ exercise,
 *              search & level/category filters, mastery toggle (synced via
 *              useMasteredVocab). Mirrors the HSK / Vietnamese vocab pages.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import SwedishHeroBanner from "@/components/swedish/SwedishHeroBanner";
import FloatingNordicParticles from "@/components/FloatingNordicParticles";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Layers,
  List,
  Star,
  RotateCcw,
  CheckCircle,
  XCircle,
  Dumbbell,
  BookOpen,
  Sparkles,
  Target,
  Mic,
  MicOff,
  PenLine,
  
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useMasteredVocab } from "@/hooks/useMasteredVocab";
import { lazy, Suspense } from "react";

const VocabBrainPanel = lazy(() => import("@/components/vocab/VocabBrainPanel"));
const SWEDISH_MILESTONES = [
  { words: 100, band: "YKI A1" },
  { words: 300, band: "YKI A2" },
  { words: 600, band: "YKI B1" },
  { words: 1000, band: "YKI B2" },
];
import VocabMasteryLeaderboard from "@/components/VocabMasteryLeaderboard";
import { playSwedishTts, stopSwedishTts } from "@/lib/swedishTts";
import WordQuest from "@/components/vocab/WordQuest";
import DailyWordMission from "@/components/vocab/DailyWordMission";
import { countDue, loadSrs } from "@/lib/vocab/srsEngine";
import { swedishToQuest } from "@/lib/vocab/vocabAdapter";
import { buildMcq, maskAnswerForms, shuffleArr } from "@/lib/vocab/questionQuality";


/** Swedish voice shared by Word Quest and Daily Mission. */
const speakSv = (text: string, slow = false) => {
  stopSwedishTts();
  void playSwedishTts(text, { playbackRate: slow ? 0.78 : 0.95, speechRate: slow ? 0.6 : 0.85 });
};
import { ensureSwedishIpa } from "@/lib/swedishIpa";
import SwedishVocabReviewModes from "@/components/swedish/SwedishVocabReviewModes";
import { SimpleVocabDeck } from "@/components/vocab/StandardVocabDeck";

import {
  SWEDISH_WORDS,
  SWEDISH_CATEGORIES,
  SWEDISH_LEVELS,
  type SwedishWord,
  type SwedishLevel,
} from "@/data/swedishVocabBank";

const WORDS_PER_PAGE = 12;

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

// Play Swedish with Google-quality voice (proxy → fallback to sv-SE native).
const speakSwedish = (text: string) => {
  stopSwedishTts();
  void playSwedishTts(text, { playbackRate: 0.95, speechRate: 0.85 });
};

// Normalize a Swedish utterance for fuzzy comparison.
const normalizeSv = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFC")
    .replace(/[.,!?;:"'()]/g, "")
    .replace(/\s+/g, " ")
    .trim();

// Word-level similarity 0–1, tolerant of small misses.
const similarityScore = (a: string, b: string) => {
  const A = normalizeSv(a).split(" ").filter(Boolean);
  const B = new Set(normalizeSv(b).split(" ").filter(Boolean));
  if (A.length === 0) return 0;
  let hits = 0;
  for (const w of A) if (B.has(w)) hits += 1;
  return hits / A.length;
};

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const levelColors: Record<SwedishLevel, string> = {
  A1: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  A2: "bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/30",
  B1: "bg-violet-500/20 text-violet-700 dark:text-violet-300 border-violet-500/30",
};

/* -------------------------------------------------------------------------- */
/* Flashcard                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Mini speak-back panel: user records, browser transcribes Swedish via
 * the Web Speech API (sv-SE), and we score word overlap vs. the target.
 */
const SpeakBack = ({ target }: { target: string }) => {
  const { t } = useLanguage();
  const SR: any =
    (typeof window !== "undefined" &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)) ||
    null;
  const supported = !!SR;
  const recRef = useRef<any>(null);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState("");
  const [score, setScore] = useState<number | null>(null);

  const start = () => {
    if (!supported) return;
    try { recRef.current?.stop(); } catch { /* noop */ }
    const rec = new SR();
    recRef.current = rec;
    rec.lang = "sv-SE";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e: any) => {
      const text = e.results?.[0]?.[0]?.transcript ?? "";
      setHeard(text);
      setScore(Math.round(similarityScore(target, text) * 100));
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    setListening(true);
    setHeard("");
    setScore(null);
    try { rec.start(); } catch { setListening(false); }
  };

  const stop = () => { try { recRef.current?.stop(); } catch { /* noop */ } setListening(false); };

  if (!supported) {
    return (
      <p className="text-[11px] text-muted-foreground italic">
        {t("Trình duyệt không hỗ trợ ghi âm — dùng Chrome để luyện nói.",
           "Speech recognition unavailable — open in Chrome to practise speaking.")}
      </p>
    );
  }

  const tone =
    score == null ? "" :
    score >= 80 ? "text-emerald-500" :
    score >= 50 ? "text-amber-500" : "text-rose-500";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant={listening ? "destructive" : "outline"}
          onClick={(e) => { e.stopPropagation(); listening ? stop() : start(); }}
          className="h-7 gap-1.5 text-xs"
        >
          {listening ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
          {listening ? t("Dừng", "Stop") : t("Nói lại câu", "Speak it back")}
        </Button>
        {score != null && (
          <span className={`text-xs font-bold ${tone}`}>{score}%</span>
        )}
      </div>
      {heard && (
        <p className="text-[11px] text-muted-foreground">
          <span className="font-semibold">{t("Bạn đã nói: ", "You said: ")}</span>“{heard}”
        </p>
      )}
    </div>
  );
};

/**
 * Mini rewrite panel: user types the example sentence, we score character/word
 * accuracy. Trains spelling of å/ä/ö and Swedish word order.
 */
const RewriteBack = ({ target }: { target: string }) => {
  const { t } = useLanguage();
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const score = useMemo(() => Math.round(similarityScore(target, value) * 100), [target, value]);
  const exact = normalizeSv(target) === normalizeSv(value);
  return (
    <div className="space-y-1.5">
      <Input
        value={value}
        onChange={(e) => { setValue(e.target.value); setChecked(false); }}
        onClick={(e) => e.stopPropagation()}
        placeholder={t("Gõ lại câu ví dụ bằng tiếng Thụy Điển…", "Type the example sentence in Swedish…")}
        className="h-8 text-xs"
      />
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => { e.stopPropagation(); setChecked(true); }}
          className="h-7 gap-1.5 text-xs"
        >
          <PenLine className="h-3.5 w-3.5" />
          {t("Kiểm tra", "Check")}
        </Button>
        {checked && (
          <span className={`text-xs font-bold ${exact ? "text-emerald-500" : score >= 70 ? "text-amber-500" : "text-rose-500"}`}>
            {exact ? "✓ 100%" : `${score}%`}
          </span>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Flashcard — auto-expanding (no 3D flip) to fit speak/rewrite practice       */
/* -------------------------------------------------------------------------- */

const Flashcard = ({
  word,
  mastered,
  onToggle,
}: {
  word: SwedishWord;
  mastered: boolean;
  onToggle: (id: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  return (
    <div
      className="rounded-xl border border-border bg-card p-4 shadow-sm hover:border-primary/40 transition-colors cursor-pointer"
      onClick={() => setOpen((v) => !v)}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {word.article && (
              <Badge variant="outline" className="text-[10px] uppercase">{word.article}</Badge>
            )}
            <p className="text-xl md:text-2xl font-bold text-foreground leading-tight">{word.sv}</p>
            <Badge className={levelColors[word.level]} variant="outline">{word.level}</Badge>
          </div>
          <p className="font-mono text-xs text-muted-foreground mt-0.5">{ensureSwedishIpa(word.sv, word.ipa)}</p>
          <p className="text-[11px] italic text-muted-foreground">{word.pos}</p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); speakSwedish(word.sv); }}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
            aria-label="Play Swedish"
          >
            <Volume2 className="w-4 h-4 text-primary" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onToggle(word.id); }}
            className="p-1.5 rounded-full hover:bg-amber-500/10 transition-colors"
            aria-label="Toggle mastered"
          >
            <Star className={`w-4 h-4 ${mastered ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
          </button>
        </div>
      </div>

      {/* Meanings */}
      <div className="mt-2">
        <p className="text-sm font-semibold text-primary">{t(word.vi, word.en)}</p>
        <p className="text-xs text-muted-foreground">{t(word.en, word.vi)}</p>
      </div>

      {/* Example */}
      <div className="mt-2 p-2.5 rounded-lg bg-secondary/50">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-bold text-foreground leading-snug">“{word.example}”</p>
          <button
            onClick={(e) => { e.stopPropagation(); speakSwedish(word.example); }}
            className="p-1 rounded hover:bg-primary/10 shrink-0"
            aria-label="Play example"
          >
            <Volume2 className="w-4 h-4 text-primary" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground italic mt-1">{t(word.exampleVi, word.exampleEn)}</p>
      </div>

      {/* Practice (expandable) */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-3 pt-3 border-t border-border/60 space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {t("Luyện chủ động", "Active practice")}
              </p>
              <SpeakBack target={word.example} />
              <RewriteBack target={word.example} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-2 text-[10px] text-muted-foreground text-center">
        {open ? t("Bấm để thu gọn", "Tap to collapse") : t("Bấm để luyện nói + viết lại", "Tap to practise speaking + rewriting")}
      </p>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MCQ Exercise (over mastered words)                                          */
/* -------------------------------------------------------------------------- */

type SvMode = "sv-to-gloss" | "gloss-to-sv" | "fill-blank" | "listening" | "context" | "pos";

interface MCQ {
  word: SwedishWord;
  options: string[];
  correct: string;
  mode: SvMode;
  prompt: string;
  explVi: string;
  explEn: string;
}

const SV_POS_LABEL: Record<string, { vi: string; en: string }> = {
  "n.": { vi: "danh từ", en: "noun" },
  "v.": { vi: "động từ", en: "verb" },
  "adj.": { vi: "tính từ", en: "adjective" },
  "adv.": { vi: "trạng từ", en: "adverb" },
  "phr.": { vi: "cụm từ", en: "phrase" },
};

const buildMCQ = (target: SwedishWord, pool: SwedishWord[], lang: "vi" | "en", mode: SvMode): MCQ | null => {
  const gloss = (w: SwedishWord) => (lang === "vi" ? w.vi : w.en);
  const explVi = `“${target.sv}” (${target.pos}) nghĩa là “${target.vi}”. Ví dụ: ${target.example} - ${target.exampleVi}`;
  const explEn = `“${target.sv}” (${target.pos}) means “${target.en}”. Example: ${target.example} - ${target.exampleEn}`;
  const base = { word: target, mode, explVi, explEn };

  if (mode === "pos") {
    const labels = Object.keys(SV_POS_LABEL);
    if (!SV_POS_LABEL[target.pos] || labels.length < 4) return null;
    const label = (p: string) => (lang === "vi" ? SV_POS_LABEL[p].vi : SV_POS_LABEL[p].en);
    const wrongs = shuffleArr(labels.filter(p => p !== target.pos)).slice(0, 3).map(label);
    const options = shuffleArr([label(target.pos), ...wrongs]);
    return { ...base, options, correct: label(target.pos), prompt: target.sv };
  }

  if (mode === "sv-to-gloss" || mode === "context") {
    const mcq = buildMcq<SwedishWord>({
      target, pool, answer: gloss(target),
      optionOf: gloss,
      aliasesOf: x => [x.sv, x.vi, x.en],
      answerAliases: [target.sv, target.vi, target.en],
      posOf: x => x.pos, topicOf: x => x.category, levelOf: x => x.level,
    });
    if (!mcq) return null;
    const prompt = mode === "context"
      ? maskAnswerForms(target.example, [target.sv])
      : target.sv;
    if (mode === "context" && !prompt.includes("_____")) return null;
    return { ...base, options: mcq.options, correct: mcq.options[mcq.correct], prompt };
  }

  // Swedish word is the answer: gloss-to-sv / fill-blank / listening
  const mcq = buildMcq<SwedishWord>({
    target, pool, answer: target.sv,
    optionOf: x => x.sv,
    aliasesOf: x => [x.vi, x.en],
    answerAliases: [target.vi, target.en],
    posOf: x => x.pos, topicOf: x => x.category, levelOf: x => x.level,
  });
  if (!mcq) return null;
  let prompt = gloss(target);
  if (mode === "fill-blank") {
    prompt = maskAnswerForms(target.example, [target.sv]);
    if (!prompt.includes("_____")) return null;
  }
  if (mode === "listening") prompt = target.sv;
  return { ...base, options: mcq.options, correct: target.sv, prompt };
};

const ExerciseView = ({ pool }: { pool: SwedishWord[] }) => {
  const { t, lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(0);
  const [round, setRound] = useState(0);

  // Snapshot pool + interface language when the round starts: switching the UI
  // language or refiltering the bank must not rebuild a quiz in progress.
  const poolRef = useRef(pool); poolRef.current = pool;
  const langRef = useRef(lang); langRef.current = lang;
  const enough = pool.length >= 4;

  const questions = useMemo(() => {
    const p = poolRef.current;
    if (p.length < 4) return [];
    const modes: SvMode[] = ["sv-to-gloss", "gloss-to-sv", "fill-blank", "listening", "context", "pos"];
    const qLang: "vi" | "en" = langRef.current === "en" ? "en" : "vi";
    const out: MCQ[] = [];
    shuffleArr(p).slice(0, 14).forEach((wd, i) => {
      const first = modes[i % modes.length];
      const order = [first, ...modes.filter(m => m !== first)];
      for (const m of order) {
        const q = buildMCQ(wd, p, qLang, m);
        if (q) { out.push(q); break; }
      }
    });
    return out.slice(0, 12);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, enough]);


  if (pool.length < 4) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card/60 p-8 text-center">
        <Dumbbell className="mx-auto h-10 w-10 text-muted-foreground/60 mb-3" />
        <p className="font-semibold text-foreground">{t("Cần ít nhất 4 từ đã 'Mastered'", "You need at least 4 mastered words")}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {t("Bấm ngôi sao ⭐ trên các thẻ để đánh dấu Mastered rồi quay lại.", "Star ⭐ words on the cards to mark as mastered, then come back.")}
        </p>
      </div>
    );
  }

  if (index >= questions.length) {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
        <Sparkles className="mx-auto h-10 w-10 text-emerald-500 mb-3" />
        <p className="text-2xl font-bold text-foreground">
          {score}/{questions.length}
        </p>
        <p className="text-sm text-muted-foreground mt-1">{t("Bài tập đã xong!", "Exercise complete!")}</p>
        <Button onClick={() => { setIndex(0); setPicked(null); setScore(0); setDone(0); setRound(r => r + 1); }} className="mt-4 gap-2">
          <RotateCcw className="h-4 w-4" />
          {t("Làm lại", "Try again")}
        </Button>
      </div>
    );
  }

  const q = questions[index];
  const correct = picked === q.correct;

  const PROMPT_HINT: Record<SvMode, { vi: string; en: string }> = {
    "sv-to-gloss": { vi: "Từ tiếng Thụy Điển này nghĩa là gì?", en: "What does this Swedish word mean?" },
    "gloss-to-sv": { vi: "Nghĩa này tương ứng từ tiếng Thụy Điển nào?", en: "Which Swedish word matches this meaning?" },
    "fill-blank": { vi: "Điền từ còn thiếu vào câu:", en: "Fill the missing word in the sentence:" },
    "listening": { vi: "Nghe và chọn từ đúng:", en: "Listen and choose the word:" },
    "context": { vi: "Từ còn thiếu trong câu này nghĩa là gì?", en: "What does the missing word mean?" },
    "pos": { vi: "Từ này thuộc từ loại nào?", en: "Which part of speech is this word?" },
  };
  const isSentence = q.mode === "fill-blank" || q.mode === "context";

  return (
    <div className="rounded-xl border border-border bg-card p-5 md:p-6 space-y-4">
      {/* Sticky bar so Next is always reachable. */}
      <div className="sticky top-16 z-20 -mx-2 flex items-center justify-between gap-2 rounded-lg bg-card/95 px-2 py-1.5 text-xs text-muted-foreground backdrop-blur">
        <span>{t("Câu", "Question")} {index + 1}/{questions.length}</span>
        <span>{t("Điểm", "Score")}: {score}</span>
        {picked != null && (
          <Button size="sm" onClick={() => { setIndex(i => i + 1); setPicked(null); }} className="gap-1">
            {t("Câu tiếp", "Next")} <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="rounded-lg bg-muted/50 p-4 text-center">
        <p className="text-xs text-muted-foreground mb-1">{t(PROMPT_HINT[q.mode].vi, PROMPT_HINT[q.mode].en)}</p>
        {q.mode === "listening" ? (
          <button
            onClick={() => speakSwedish(q.word.sv)}
            className="mx-auto mt-1 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20"
          >
            <Volume2 className="h-7 w-7 text-primary" />
          </button>
        ) : (
          <p className={isSentence
            ? "text-base md:text-lg font-medium text-foreground whitespace-pre-wrap"
            : "text-2xl md:text-3xl font-bold text-foreground"}>
            {q.prompt}
          </p>
        )}
        {(q.mode === "sv-to-gloss" || q.mode === "pos") && (
          <button
            onClick={() => speakSwedish(q.word.sv)}
            className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <Volume2 className="h-3.5 w-3.5" /> {t("Nghe", "Listen")}
          </button>
        )}

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {q.options.map((opt, oi) => {
          const isCorrect = opt === q.correct;
          const isPicked = opt === picked;
          const reveal = picked != null;
          return (
            <button
              key={opt}
              disabled={reveal}
              onClick={() => {
                setPicked(opt);
                if (opt === q.correct) setScore((s) => s + 1);
                setDone((d) => d + 1);
              }}
              className={`text-left rounded-lg border px-3 py-2.5 text-sm font-medium transition
                ${reveal
                  ? isCorrect
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : isPicked
                      ? "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300"
                      : "border-border opacity-60"
                  : "border-border hover:border-primary hover:bg-primary/5"
                }`}
            >
              <span className="inline-flex items-center gap-2">
                {reveal && isCorrect && <CheckCircle className="h-4 w-4" />}
                {reveal && isPicked && !isCorrect && <XCircle className="h-4 w-4" />}
                <span><span className="font-semibold mr-1">{String.fromCharCode(65 + oi)}.</span>{opt}</span>
              </span>
            </button>
          );
        })}
      </div>
      {picked != null && (
        <div className="space-y-3">
          <div className={`rounded-lg border p-3 text-sm ${correct ? "border-emerald-500/50 bg-emerald-500/10" : "border-orange-500/50 bg-orange-500/10"}`}>
            <p className="font-semibold text-foreground mb-1">
              {correct ? t("Chính xác!", "Correct!") : `${t("Đáp án đúng:", "Correct answer:")} ${q.correct}`}
            </p>
            <p className="text-foreground/90">{t(q.explVi, q.explEn)}</p>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => { setIndex((i) => i + 1); setPicked(null); }}
              className="gap-2"
            >
              {t("Câu tiếp", "Next")}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Main page                                                                   */
/* -------------------------------------------------------------------------- */

const SwedishVocabulary = () => {
  const { t, lang } = useLanguage();
  const { mastered, toggle } = useMasteredVocab("swedish");

  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<"all" | SwedishLevel>("all");
  const [catFilter, setCatFilter] = useState<string>("all");
  const [view, setView] = useState<"flash" | "list" | "exercise" | "qa" | "quest" | "mission">("flash");
  const [dueToday, setDueToday] = useState(() => countDue(loadSrs("swedish")));
  useEffect(() => {
    const id = window.setInterval(() => setDueToday(countDue(loadSrs("swedish"))), 5000);
    return () => window.clearInterval(id);
  }, []);
  const [page, setPage] = useState(0);

  // Filtered list
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SWEDISH_WORDS.filter((w) => {
      if (levelFilter !== "all" && w.level !== levelFilter) return false;
      if (catFilter !== "all" && w.category !== catFilter) return false;
      if (!q) return true;
      return (
        w.sv.toLowerCase().includes(q) ||
        w.vi.toLowerCase().includes(q) ||
        w.en.toLowerCase().includes(q)
      );
    });
  }, [query, levelFilter, catFilter]);

  useEffect(() => { setPage(0); }, [query, levelFilter, catFilter, view]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / WORDS_PER_PAGE));
  const pageWords = filtered.slice(page * WORDS_PER_PAGE, (page + 1) * WORDS_PER_PAGE);
  const masteredWords = useMemo(
    () => SWEDISH_WORDS.filter((w) => mastered.has(w.id)),
    [mastered]
  );

  const handleToggle = useCallback((id: string) => {
    const wasIn = mastered.has(id);
    toggle(id);
    if (!wasIn) {
      toast({
        title: t("⭐ Đã thêm vào Mastered", "⭐ Marked as mastered"),
        description: t("Tiếp tục luyện trong tab Bài tập.", "Practise it in the Exercise tab."),
      });
    }
  }, [mastered, toggle, t]);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background">
      <FloatingNordicParticles variant="swedish" />
      <SEO
        title="Swedish Vocabulary YKI A1–B1 | HaiEduTech"
        description="Từ vựng tiếng Thụy Điển YKI A1, A2, B1 — flashcard, danh sách, bài tập trắc nghiệm. Tích hợp audio sv-SE và đánh dấu Mastered."
        path="/swedish/vocabulary"
      />
      <Navbar />
      <main className="pt-24 lg:pt-28 pb-12">
        <SwedishHeroBanner pickKey="SwedishVocabulary" compact />
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-primary/20 bg-gradient-to-br from-emerald-500/10 via-sky-500/10 to-violet-500/10 p-6 md:p-8 mb-6"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 p-3 text-white shadow-md">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <Badge className="mb-2 bg-primary/15 text-primary hover:bg-primary/20">
                  {t("Từ vựng YKI Ruotsi A1 → B1", "YKI Ruotsi Vocabulary A1 → B1")}
                </Badge>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {t("Swedish Vocabulary — Ngân hàng từ vựng tiếng Thụy Điển", "Swedish Vocabulary Bank")}
                </h1>
                <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                  {t(
                    `${SWEDISH_WORDS.length}+ từ vựng theo cấp YKI, có audio sv-SE, ví dụ song ngữ và bài tập trắc nghiệm trên các từ bạn đã đánh dấu Mastered ⭐.`,
                    `${SWEDISH_WORDS.length}+ words by YKI level, with sv-SE audio, bilingual examples and an MCQ drill over your mastered ⭐ list.`
                  )}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs items-center">
                  <span className="rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 px-2 py-0.5 font-semibold">
                    ⭐ {mastered.size} {t("đã thuộc", "mastered")}
                  </span>
                  <span className="rounded-full bg-card border border-border px-2 py-0.5 text-muted-foreground">
                    {filtered.length} / {SWEDISH_WORDS.length} {t("từ hiển thị", "shown")}
                  </span>
                  <a href="/swedish/performance" className="rounded-full bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground px-3 py-0.5 font-semibold hover:opacity-90 transition-opacity">
                    📊 {t("Xem trình độ của tôi", "View my level")}
                  </a>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <div className="rounded-2xl border border-border bg-card p-4 md:p-5 mb-5 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("Tìm tiếng Thụy Điển / tiếng Việt / English…", "Search Swedish / Vietnamese / English…")}
                className="pl-9"
              />
            </div>

            {/* Level chips */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setLevelFilter("all")}
                className={`rounded-full px-3 py-1 text-xs font-semibold border transition ${
                  levelFilter === "all" ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"
                }`}
              >
                {t("Tất cả cấp", "All levels")}
              </button>
              {SWEDISH_LEVELS.map((lv) => (
                <button
                  key={lv}
                  onClick={() => setLevelFilter(lv)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold border transition ${
                    levelFilter === lv ? "bg-primary text-primary-foreground border-primary" : `${levelColors[lv]} border`
                  }`}
                >
                  YKI {lv === "A1" ? "1" : lv === "A2" ? "2" : "3"} · {lv}
                </button>
              ))}
            </div>

            {/* Category chips */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCatFilter("all")}
                className={`rounded-full px-3 py-1 text-xs font-semibold border transition ${
                  catFilter === "all" ? "bg-foreground text-background border-foreground" : "border-border hover:border-primary"
                }`}
              >
                {t("Tất cả chủ đề", "All topics")}
              </button>
              {SWEDISH_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCatFilter(c.id)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold border transition ${
                    catFilter === c.id ? "bg-foreground text-background border-foreground" : "border-border hover:border-primary"
                  }`}
                >
                  {c.emoji} {t(c.nameVi, c.nameEn)}
                </button>
              ))}
            </div>
          </div>

          {/* View tabs */}
          <Tabs value={view} onValueChange={(v) => setView(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 mb-5 h-auto gap-1">
              <TabsTrigger value="flash" className="flex-col gap-1 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Layers className="h-4 w-4" />
                <span className="text-xs sm:text-sm font-semibold">{t("Flashcards", "Flashcards")}</span>
              </TabsTrigger>
              <TabsTrigger value="list" className="flex-col gap-1 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <List className="h-4 w-4" />
                <span className="text-xs sm:text-sm font-semibold">{t("Danh sách", "List")}</span>
              </TabsTrigger>
              <TabsTrigger value="quest" className="flex-col gap-1 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs sm:text-sm font-semibold">Word Quest</span>
              </TabsTrigger>
              <TabsTrigger value="mission" className="flex-col gap-1 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Target className="h-4 w-4" />
                <span className="text-xs sm:text-sm font-semibold">
                  {t("Nhiệm vụ", "Daily Mission")}
                  {dueToday > 0 && <span className="ml-1 rounded-full bg-orange-500 px-1.5 text-[10px] font-bold text-white">{dueToday}</span>}
                </span>
              </TabsTrigger>
              <TabsTrigger value="exercise" className="flex-col gap-1 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Dumbbell className="h-4 w-4" />
                <span className="text-xs sm:text-sm font-semibold">{t("Ôn tập 5 chế độ", "Review · 5 modes")}</span>
              </TabsTrigger>
            </TabsList>

            {/* Flashcards */}
            <TabsContent value="flash">
              <SimpleVocabDeck
                cards={filtered.map(word => ({
                  key: word.id,
                  term: word.sv,
                  pronunciation: ensureSwedishIpa(word.sv, word.ipa),
                  level: word.level,
                  partOfSpeech: [word.article, word.pos].filter(Boolean).join(" · "),
                  category: word.category,
                  meaningPrimary: t(word.vi, word.en),
                  meaningSecondary: t(word.en, word.vi),
                  example: word.example,
                  exampleTranslation: t(word.exampleVi, word.exampleEn),
                  backExtra: <div className="space-y-3 border-t border-border pt-3" onClick={event => event.stopPropagation()}><SpeakBack target={word.example} /><RewriteBack target={word.example} /></div>,
                }))}
                t={t}
                speak={speakSwedish}
                stopAudio={stopSwedishTts}
                mastered={mastered}
                onToggleMastered={id => handleToggle(id)}
              />
            </TabsContent>

            {/* List */}
            <TabsContent value="list">
              {filtered.length === 0 ? (
                <p className="py-12 text-center text-sm text-muted-foreground">{t("Không có từ phù hợp.", "No matching words.")}</p>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-border bg-card">
                  <table className="w-full min-w-[700px] text-sm">
                    <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                      <tr>
                        <th className="py-2 px-3 font-semibold w-10">⭐</th>
                        <th className="py-2 px-3 font-semibold">Svenska</th>
                        <th className="py-2 px-3 font-semibold">{lang === "vi" ? "Tiếng Việt" : "English"}</th>
                        <th className="py-2 px-3 font-semibold">{t("Ví dụ", "Example")}</th>
                        <th className="py-2 px-3 font-semibold">{t("Cấp", "Level")}</th>
                        <th className="py-2 px-3 font-semibold text-right">{t("Nghe", "Audio")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((wd) => (
                        <tr key={wd.id} className="border-b border-border/40 last:border-0">
                          <td className="py-2 px-3">
                            <button onClick={() => handleToggle(wd.id)} aria-label="Toggle mastered">
                              <Star className={`w-4 h-4 ${mastered.has(wd.id) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/60"}`} />
                            </button>
                          </td>
                          <td className="py-2 px-3 font-semibold text-primary">
                            {wd.article && <span className="text-muted-foreground italic mr-1">{wd.article}</span>}
                            {wd.sv}
                            <span className="ml-2 text-[10px] uppercase text-muted-foreground">{wd.pos}</span>
                          </td>
                          <td className="py-2 px-3 text-foreground/90">{t(wd.vi, wd.en)}</td>
                          <td className="py-2 px-3 text-foreground/80">
                            <div className="italic">"{wd.example}"</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{t(wd.exampleVi, wd.exampleEn)}</div>
                          </td>
                          <td className="py-2 px-3">
                            <Badge className={levelColors[wd.level]} variant="outline">{wd.level}</Badge>
                          </td>
                          <td className="py-2 px-3 text-right">
                            <button
                              onClick={() => speakSwedish(wd.example)}
                              className="p-1.5 rounded hover:bg-primary/10"
                              aria-label="Play example"
                            >
                              <Volume2 className="w-4 h-4 text-primary" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>

            {/* Word Quest + Daily Mission — forceMount keeps progress across tab switches */}
            <TabsContent value="quest" forceMount className={view === "quest" ? "" : "hidden"}>
              <WordQuest
                words={filtered.map(swedishToQuest)}
                allWords={SWEDISH_WORDS.map(swedishToQuest)}
                t={t}
                storageKey="swedish_word_quest_v1"
                speak={speakSv}
                stopSpeak={stopSwedishTts}
                typingLabel={{ vi: "Gõ từ tiếng Thụy Điển có nghĩa:", en: "Type the Swedish word that means:" }}
                speechLang="sv-SE"
                knownKeys={mastered}
                onWordLearned={w => { if (!mastered.has(w)) toggle(w); }}
              />
            </TabsContent>
            <TabsContent value="mission" forceMount className={view === "mission" ? "" : "hidden"}>
              <DailyWordMission
                bank={filtered.map(swedishToQuest)}
                allWords={SWEDISH_WORDS.map(swedishToQuest)}
                t={t}
                subject="swedish"
                speechLang="sv-SE"
                speak={text => speakSv(text)}
                stopSpeak={stopSwedishTts}
                onWordMastered={w => { if (!mastered.has(w)) toggle(w); }}
              />
            </TabsContent>

            {/* Exercise — 5 EdTech review modes */}
            <TabsContent value="exercise">
              <SwedishVocabReviewModes masteredPool={masteredWords} filteredPool={filtered} />
            </TabsContent>
            {/* removed QA tab */}
          </Tabs>

          {/* Leaderboard */}
          <div className="mt-8">
            <VocabMasteryLeaderboard subject="swedish" currentCount={mastered.size} label={t("Bảng xếp hạng Từ vựng Thụy Điển", "Swedish Vocabulary Leaderboard")} />
          </div>

          {/* 3D memory brain: mastery ids are mapped back to Swedish words for the labels */}
          <Suspense fallback={<div className="h-40 rounded-xl bg-muted/30 animate-pulse mt-8" />}>
            <VocabBrainPanel
              subject="swedish"
              localWords={[...mastered]}
              t={t}
              labelOf={(id) => SWEDISH_WORDS.find((w) => w.id === id)?.sv || id}
              lookupWord={(sv) => {
                const found = SWEDISH_WORDS.find((w) => w.sv === sv);
                if (!found) return null;
                return {
                  word: found.sv,
                  phonetic: found.ipa,
                  definitionVi: found.vi,
                  definitionEn: found.en,
                };
              }}
              speak={(text) => { void playSwedishTts(text); }}
              milestones={SWEDISH_MILESTONES}
              onPractice={() => {
                setView("exercise");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SwedishVocabulary;
