import StudyChibisStatic from "@/components/decorations/StudyChibisStatic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Volume2, ChevronLeft, ChevronRight, Layers, List, Star, RotateCcw, BookOpen, CheckCircle, XCircle, Link, Copy, Keyboard, Mic, MicOff, ArrowLeft } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import VocabIllustration from "@/components/VocabIllustration";
import { useMasteredMotivation } from "@/hooks/useMasteredMotivation";
import { useLanguage } from "@/contexts/LanguageContext";
import { ieltsVocabData, IELTS_CATEGORIES, CEFR_LEVELS, type IeltsWord } from "@/data/ieltsVocabData";
import MountainClimber from "@/components/MountainClimber";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameLeaderboard from "@/components/games/GameLeaderboard";
import VocabMasteryLeaderboard from "@/components/VocabMasteryLeaderboard";
import { useMasteredVocab } from "@/hooks/useMasteredVocab";
import StudyStreakLeaderboard from "@/components/StudyStreakLeaderboard";
import SmartReviewColumn from "@/components/SmartReviewColumn";
import WeeklyVocabAchievers from "@/components/WeeklyVocabAchievers";
import { supabase } from "@/integrations/supabase/client";
import { IELTS_EXAMPLE_VI } from "@/data/ieltsExampleVi";
import VocabBrainPanel from "@/components/vocab/VocabBrainPanel";
import { recordVocabReviewTracked } from "@/lib/vocabReview";

const WORDS_PER_PAGE = 10;

// Level color mapping
const levelColors: Record<string, string> = {
  A1: "bg-green-500/20 text-green-400",
  A2: "bg-emerald-500/20 text-emerald-400",
  B1: "bg-blue-500/20 text-blue-400",
  B2: "bg-indigo-500/20 text-indigo-400",
  C1: "bg-purple-500/20 text-purple-400",
  C2: "bg-rose-500/20 text-rose-400",
};

// Text-to-Speech helper - Google proxy with native fallback (works in
// preview sandboxes and browsers without en-US voice installed).
import { playEnglishTts, stopEnglishTts } from "@/lib/englishTts";
const speak = (text: string) => {
  stopEnglishTts();
  void playEnglishTts(text, { playbackRate: 0.95, speechRate: 0.85 });
};

// Shuffle helper
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ── Single large flashcard deck (one card on screen at a time) ──
const DECK_SIZES = [10, 20, 30, 50, 100, 200, 0]; // 0 = all filtered words

const FlashcardDeck = ({
  words,
  t,
  mastered,
  onStar,
}: {
  words: IeltsWord[];
  t: (vi: string, en: string) => string;
  mastered: Set<string>;
  onStar: (word: string, e: React.MouseEvent) => void;
}) => {
  const [deckSize, setDeckSize] = useState<number>(20);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const deck = useMemo(() => {
    const limit = deckSize === 0 ? words.length : Math.min(deckSize, words.length);
    return words.slice(0, limit);
  }, [words, deckSize]);

  useEffect(() => { setIndex(0); setFlipped(false); }, [deckSize, words]);
  useEffect(() => { setFlipped(false); }, [index]);

  const total = deck.length;
  const word = deck[Math.min(index, Math.max(total - 1, 0))];

  /** Flipping a mastered card to read its meaning counts as one review. */
  const flashReviewedRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    if (!flipped || !word || !mastered.has(word.word)) return;
    if (flashReviewedRef.current.has(word.word)) return;
    flashReviewedRef.current.add(word.word);
    void recordVocabReviewTracked("ielts", [word.word]);
  }, [flipped, word, mastered]);

  const go = useCallback((delta: number) => {
    stopEnglishTts();
    setFlipped(false);
    setIndex(i => (i + delta + Math.max(total, 1)) % Math.max(total, 1));
  }, [total]);

  // Keyboard shortcuts: ← / → to move, Space to flip.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      else if (e.key === " ") { e.preventDefault(); setFlipped(f => !f); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (!word) {
    return <p className="py-12 text-center text-muted-foreground">{t("Không có từ nào", "No words available")}</p>;
  }

  const isMastered = mastered.has(word.word);
  const faceStyle: React.CSSProperties = {
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    border: "2px solid hsl(var(--primary) / 0.35)",
    boxShadow: "0 12px 30px -12px hsl(var(--primary) / 0.35)",
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Deck controls */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm">
          <label className="text-muted-foreground">{t("Số thẻ muốn lật:", "Cards to flip:")}</label>
          <select
            value={deckSize}
            onChange={e => setDeckSize(Number(e.target.value))}
            className="rounded-md border border-border bg-card px-2 py-1 text-sm"
          >
            {DECK_SIZES.map(n => (
              <option key={n} value={n} disabled={n !== 0 && n > words.length}>
                {n === 0 ? `${t("Tất cả", "All")} (${words.length})` : n}
              </option>
            ))}
          </select>
        </div>
        <span className="text-sm font-semibold text-primary">{index + 1} / {total}</span>
      </div>

      {/* Progress bar */}
      <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>

      {/* The big card - real 3D flip around the vertical axis */}
      <div style={{ perspective: "1600px" }}>
        <motion.div
          key={word.word}
          className="relative w-full cursor-pointer select-none"
          style={{ transformStyle: "preserve-3d", minHeight: "28rem" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 14, duration: 0.6 }}
          onClick={() => setFlipped(f => !f)}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 rounded-2xl bg-white dark:bg-card p-6 sm:p-10"
            style={faceStyle}
          >
            <div className="absolute right-4 top-4 flex items-center gap-1">
              <button
                onClick={e => { e.stopPropagation(); speak(word.word); }}
                className="rounded-full p-2 transition-colors hover:bg-primary/10"
                aria-label={t("Nghe phát âm", "Play pronunciation")}
              >
                <Volume2 size={22} style={{ color: "#4b5563" }} />
              </button>
              <motion.button
                onClick={e => { e.stopPropagation(); onStar(word.word, e); }}
                whileTap={{ scale: 1.4 }}
                className="rounded-full p-2 transition-colors hover:bg-yellow-500/10"
                aria-label={t("Đánh dấu đã thuộc", "Mark as mastered")}
              >
                <Star
                  size={22}
                  className={isMastered ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]" : ""}
                  style={isMastered ? {} : { color: "#4b5563" }}
                />
              </motion.button>
            </div>

            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <VocabIllustration word={word.word} definition={word.definition.en} category={word.category} size={132} />
              <h3 className="font-extrabold" style={{ fontSize: "2.75rem", lineHeight: 1.1, color: "#111827" }}>{word.word}</h3>
              <p className="font-mono" style={{ fontSize: "1.15rem", color: "#4b5563" }}>{word.ipa}</p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Badge className={levelColors[word.level]}>{word.level}</Badge>
                {word.partOfSpeech && <Badge variant="secondary" className="italic">{word.partOfSpeech}</Badge>}
                <Badge variant="outline">{word.category}</Badge>
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                <RotateCcw className="h-3.5 w-3.5" />
                {t("Chạm vào thẻ để lật (hoặc nhấn Space)", "Tap the card to flip (or press Space)")}
              </p>
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 overflow-auto rounded-2xl bg-white dark:bg-card p-6 sm:p-10"
            style={{ ...faceStyle, transform: "rotateY(180deg)" }}
          >
            <div className="absolute right-4 top-4 flex items-center gap-1">
              <button
                onClick={e => { e.stopPropagation(); speak(word.example || word.word); }}
                className="rounded-full p-2 transition-colors hover:bg-primary/10"
                aria-label={t("Nghe ví dụ", "Play example")}
              >
                <Volume2 size={22} style={{ color: "#4b5563" }} />
              </button>
            </div>

            <div className="flex h-full flex-col justify-center gap-3">
              <p className="font-bold break-words" style={{ fontSize: "1.75rem", color: "#1d4ed8", lineHeight: 1.35 }}>{word.definition.vi}</p>
              <p className="font-semibold break-words" style={{ fontSize: "1.125rem", color: "#374151", lineHeight: 1.6 }}>{word.definition.en}</p>
              <p className="italic break-words" style={{ fontSize: "1.0625rem", color: "#374151", lineHeight: 1.6 }}>
                <span className="font-semibold not-italic" style={{ color: "#1d4ed8" }}>E.g. </span>{word.example}
              </p>
              {IELTS_EXAMPLE_VI[word.example?.trim() ?? ""] && (
                <p className="break-words" style={{ fontSize: "1rem", color: "#047857", lineHeight: 1.6, fontWeight: 500 }}>
                  <span className="font-semibold">→ </span>{IELTS_EXAMPLE_VI[word.example.trim()]}
                </p>
              )}
              {word.synonyms && word.synonyms.length > 0 && (
                <div className="rounded-md" style={{ backgroundColor: "#ecfdf5", padding: "0.65rem 0.85rem" }}>
                  <p className="break-words" style={{ fontSize: "1rem", color: "#065f46", lineHeight: 1.6 }}>
                    <span className="font-semibold">Syn: </span>{word.synonyms.join(" • ")}
                  </p>
                </div>
              )}
              {word.collocations && word.collocations.length > 0 && (
                <div className="rounded-md" style={{ backgroundColor: "#eff6ff", padding: "0.65rem 0.85rem" }}>
                  <p className="break-words" style={{ fontSize: "1rem", color: "#1e3a8a", lineHeight: 1.6 }}>
                    <span className="font-semibold">Collocations: </span>{word.collocations.join(" • ")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="mt-4 flex items-center gap-3">
        <Button variant="outline" className="flex-1 gap-2" onClick={() => go(-1)}>
          <ChevronLeft className="w-4 h-4" /> {t("Thẻ trước", "Previous")}
        </Button>
        <Button variant="outline" className="gap-2" onClick={() => setFlipped(f => !f)}>
          <RotateCcw className="w-4 h-4" /> {t("Lật thẻ", "Flip")}
        </Button>
        <Button variant="outline" className="flex-1 gap-2" onClick={() => go(1)}>
          {t("Thẻ sau", "Next")} <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};



// ── Inline Type-the-example widget (always visible per word card) ──
const normalizeText = (s: string) =>
  s.toLowerCase().replace(/[.,!?;:"'()]/g, "").replace(/\s+/g, " ").trim();

const InlineTypeExample = ({ word, t }: { word: IeltsWord; t: (vi: string, en: string) => string }) => {
  const [input, setInput] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  if (!word.example) return null;
  const target = word.example;
  const isCorrect = revealed && normalizeText(input) === normalizeText(target);
  const reset = () => { setInput(""); setRevealed(false); setVoiceError(null); };

  const stopVoice = () => {
    try { recognitionRef.current?.stop(); } catch { /* noop */ }
    setIsListening(false);
  };

  const startVoice = () => {
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setVoiceError(t("Trình duyệt không hỗ trợ voice. Hãy dùng Chrome/Edge.", "Voice not supported. Try Chrome/Edge."));
      return;
    }
    setVoiceError(null);
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = false;
    rec.maxAlternatives = 1;
    let finalText = "";
    rec.onresult = (e: any) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript;
        else interim += r[0].transcript;
      }
      setInput((finalText + " " + interim).trim());
    };
    rec.onerror = (e: any) => {
      setVoiceError(t("Không nhận diện được giọng nói.", "Could not recognize speech.") + (e?.error ? ` (${e.error})` : ""));
      setIsListening(false);
    };
    rec.onend = () => setIsListening(false);
    recognitionRef.current = rec;
    setIsListening(true);
    try { rec.start(); } catch { setIsListening(false); }
  };

  return (
    <div className="mt-4 pt-3 border-t border-border/60">
      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary mb-2">
        <Keyboard className="w-3.5 h-3.5" />
        {t("Gõ lại hoặc nói câu ví dụ", "Type or speak the example")}
      </div>
      <div className="space-y-2">
        <div className="relative">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={revealed}
            rows={2}
            placeholder={t("Gõ lại hoặc bấm mic để nói…", "Type or tap mic to speak…")}
            className="w-full p-3 pr-12 rounded-lg border-2 border-border bg-background text-foreground focus:border-primary/60 focus:outline-none text-sm leading-relaxed disabled:opacity-70"
          />
          <button
            type="button"
            onClick={isListening ? stopVoice : startVoice}
            disabled={revealed}
            title={isListening ? t("Dừng ghi âm", "Stop recording") : t("Nói câu ví dụ", "Speak the example")}
            className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? "bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/40"
                : "bg-primary/10 text-primary hover:bg-primary/20"
            } disabled:opacity-50`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>
        {voiceError && (
          <p className="text-xs text-orange-600 dark:text-orange-400">{voiceError}</p>
        )}
        <div className="flex items-center justify-between gap-2">
          {!revealed ? (
            <Button size="sm" onClick={() => { stopVoice(); setRevealed(true); }} disabled={input.trim().length === 0}>
              {t("Kiểm tra", "Check")}
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={reset} className="gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" /> {t("Thử lại", "Try again")}
            </Button>
          )}
        </div>
        {revealed && (
          <div className={`p-3 rounded-lg border-2 text-sm ${isCorrect ? "border-green-500 bg-green-500/10" : "border-orange-500 bg-orange-500/10"}`}>
            <div className="flex items-center gap-1.5 mb-1 font-semibold">
              {isCorrect ? (
                <><CheckCircle className="w-4 h-4 text-green-600" /><span className="text-green-700 dark:text-green-400">{t("Chính xác!", "Perfect!")}</span></>
              ) : (
                <><XCircle className="w-4 h-4 text-orange-600" /><span className="text-orange-700 dark:text-orange-400">{t("Gần đúng - đối chiếu lại nhé.", "Close - compare with the original.")}</span></>
              )}
            </div>
            <p><strong>{t("Câu gốc:", "Original:")}</strong> <span className="italic">{target}</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Multi-type Vocabulary Exercise ──
type ExType =
  | "meaning"     // word -> English definition
  | "reverse"     // Vietnamese meaning -> word
  | "fillBlank"   // example with blank -> word
  | "synonym"     // word -> synonym
  | "listening"   // audio -> word
  | "defEn"       // English definition -> word
  | "collocation" // word -> correct collocation
  | "scramble"    // scrambled letters -> word
  | "context"     // word -> which example uses it
  | "antonymOdd"  // pick the word that does NOT belong to the meaning group
  | "wordForm"    // pick the part of speech
  | "topic"       // pick the IELTS topic of the word
  | "typeWord"    // type the word from its Vietnamese meaning
  | "dictation"   // listen, then type the word
  | "ipa";        // pick the correct phonetic transcription

// Practice focus filters offered to the learner.
export type ExMode = "all" | "choice" | "typing" | "audio";

const TYPING_TYPES: ExType[] = ["typeWord", "dictation"];
const AUDIO_TYPES: ExType[] = ["listening", "dictation", "ipa"];

interface ExQuestion {
  type: ExType;
  word: IeltsWord;
  prompt: string;
  options: string[];
  correct: number;
  hint?: string;
  /** Present for typing questions - the expected text answer. */
  answerText?: string;
}

// Scramble letters of a word while guaranteeing it differs from original
const scrambleLetters = (w: string): string => {
  const letters = w.split("");
  if (letters.length < 2) return w;
  for (let i = 0; i < 10; i++) {
    const shuffled = shuffle(letters).join("");
    if (shuffled !== w) return shuffled;
  }
  return letters.reverse().join("");
};

const POS_POOL = ["noun", "verb", "adjective", "adverb"];

const buildQuestions = (
  words: IeltsWord[],
  allWords: IeltsWord[],
  quizSize = 12,
  mode: ExMode = "all",
  /** Keep the incoming order (used when the memory brain sends urgent words first). */
  preserveOrder = false,
): ExQuestion[] => {
  const distractorPool = allWords.length > 4 ? allWords : words;
  const picked = (preserveOrder ? words : shuffle(words)).slice(0, quizSize);
  const lastTypeRef: { value: ExType | null } = { value: null };

  const buildOne = (w: IeltsWord, idx: number): ExQuestion => {
    // Types available for this specific word (data-dependent)
    let candidates: ExType[] = ["meaning", "reverse", "listening", "defEn", "scramble", "wordForm", "topic", "typeWord", "dictation", "ipa", "antonymOdd"];
    if (w.example && w.example.toLowerCase().includes(w.word.toLowerCase())) {
      candidates.push("fillBlank", "context");
    }
    if (w.synonyms && w.synonyms.length > 0) candidates.push("synonym");
    if (w.collocations && w.collocations.length > 0) candidates.push("collocation");
    if (!w.partOfSpeech) candidates = candidates.filter(c => c !== "wordForm");
    if (!w.ipa) candidates = candidates.filter(c => c !== "ipa");

    // Apply the learner's focus filter
    if (mode === "typing") candidates = candidates.filter(c => TYPING_TYPES.includes(c));
    else if (mode === "audio") candidates = candidates.filter(c => AUDIO_TYPES.includes(c));
    else if (mode === "choice") candidates = candidates.filter(c => !TYPING_TYPES.includes(c));
    if (candidates.length === 0) candidates = ["meaning"];

    // Rotate through the pool and avoid two identical types in a row
    let type = candidates[idx % candidates.length];
    if (type === lastTypeRef.value && candidates.length > 1) {
      type = candidates[(idx + 1) % candidates.length];
    }
    lastTypeRef.value = type;

    if (type === "typeWord") {
      const hint = `${w.word[0].toUpperCase()}${" _".repeat(Math.max(w.word.length - 1, 0))}  (${w.word.length})`;
      return { type, word: w, prompt: w.definition.vi, options: [], correct: 0, answerText: w.word, hint };
    }
    if (type === "dictation") {
      return { type, word: w, prompt: w.word, options: [], correct: 0, answerText: w.word, hint: w.definition.vi };
    }
    if (type === "wordForm") {
      const correctPos = (w.partOfSpeech || "noun").toLowerCase();
      const wrongs = POS_POOL.filter(p => p !== correctPos).slice(0, 3);
      const opts = shuffle([correctPos, ...wrongs]);
      return { type, word: w, prompt: w.word, options: opts, correct: opts.indexOf(correctPos) };
    }
    if (type === "topic") {
      const wrongs = shuffle(IELTS_CATEGORIES.filter(c => c !== w.category)).slice(0, 3);
      const opts = shuffle([w.category, ...wrongs]);
      return { type, word: w, prompt: w.word, options: opts, correct: opts.indexOf(w.category) };
    }
    if (type === "ipa") {
      const wrongs = shuffle(distractorPool.filter(x => x.word !== w.word && x.ipa && x.ipa !== w.ipa)).slice(0, 3).map(x => x.ipa);
      const opts = shuffle([w.ipa, ...wrongs]);
      return { type, word: w, prompt: w.word, options: opts, correct: opts.indexOf(w.ipa) };
    }
    if (type === "antonymOdd") {
      // 3 words share the target's topic, the odd one comes from another topic.
      const sameTopic = shuffle(distractorPool.filter(x => x.category === w.category && x.word !== w.word)).slice(0, 2);
      const odd = shuffle(distractorPool.filter(x => x.category !== w.category))[0];
      if (!odd || sameTopic.length < 2) {
        const wrongs = shuffle(distractorPool.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.definition.en);
        const optsFallback = shuffle([w.definition.en, ...wrongs]);
        return { type: "meaning", word: w, prompt: w.word, options: optsFallback, correct: optsFallback.indexOf(w.definition.en) };
      }
      const opts = shuffle([w.word, ...sameTopic.map(x => x.word), odd.word]);
      return {
        type,
        word: w,
        prompt: `${w.word} / ${sameTopic.map(x => x.word).join(" / ")} / ${odd.word}`,
        options: opts,
        correct: opts.indexOf(odd.word),
        hint: w.category,
      };
    }
    if (type === "reverse") {
      const wrongs = shuffle(distractorPool.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.word);
      const opts = shuffle([w.word, ...wrongs]);
      return { type, word: w, prompt: w.definition.vi, options: opts, correct: opts.indexOf(w.word) };
    }
    if (type === "fillBlank") {
      const re = new RegExp(w.word, "ig");
      const blanked = w.example.replace(re, "_____");
      const wrongs = shuffle(distractorPool.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.word);
      const opts = shuffle([w.word, ...wrongs]);
      return { type, word: w, prompt: blanked, options: opts, correct: opts.indexOf(w.word) };
    }
    if (type === "synonym") {
      const correctSyn = w.synonyms![0];
      const synPool = allWords.filter(x => x.word !== w.word).flatMap(x => x.synonyms || []);
      const wrongs = shuffle(synPool.filter(s => s !== correctSyn && s !== w.word)).slice(0, 3);
      while (wrongs.length < 3) wrongs.push(shuffle(distractorPool)[0].word);
      const opts = shuffle([correctSyn, ...wrongs]);
      return { type, word: w, prompt: w.word, options: opts, correct: opts.indexOf(correctSyn) };
    }
    if (type === "listening") {
      const wrongs = shuffle(distractorPool.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.word);
      const opts = shuffle([w.word, ...wrongs]);
      return { type, word: w, prompt: w.word, options: opts, correct: opts.indexOf(w.word) };
    }
    if (type === "defEn") {
      const wrongs = shuffle(distractorPool.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.word);
      const opts = shuffle([w.word, ...wrongs]);
      return { type, word: w, prompt: w.definition.en, options: opts, correct: opts.indexOf(w.word) };
    }
    if (type === "collocation") {
      const correctColl = w.collocations![0];
      // Mask target word in the correct collocation so it's not a giveaway
      const maskRegex = new RegExp(`\\b${w.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\w*\\b`, "gi");
      const maskedCorrect = correctColl.replace(maskRegex, "_____");
      const collPool = allWords.filter(x => x.word !== w.word).flatMap(x => x.collocations || []);
      const wrongs = shuffle(
        collPool.filter(c => c !== correctColl && !c.toLowerCase().includes(w.word.toLowerCase()))
      ).slice(0, 3);
      while (wrongs.length < 3) {
        const fb = shuffle(distractorPool)[0]?.word;
        if (fb && !wrongs.includes(fb)) wrongs.push(fb); else break;
      }
      const opts = shuffle([maskedCorrect, ...wrongs]);
      return { type, word: w, prompt: w.word, options: opts, correct: opts.indexOf(maskedCorrect) };
    }
    if (type === "scramble") {
      const scrambled = scrambleLetters(w.word);
      const wrongs = shuffle(distractorPool.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.word);
      const opts = shuffle([w.word, ...wrongs]);
      return { type, word: w, prompt: scrambled, options: opts, correct: opts.indexOf(w.word) };
    }
    if (type === "context") {
      // Mask target word in the correct example so the answer isn't trivially visible
      const maskRegex = new RegExp(`\\b${w.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\w*\\b`, "gi");
      const maskedCorrect = w.example.replace(maskRegex, "_____");
      // Distractors: examples that do NOT contain the target word (so masking can't accidentally reveal it)
      const wrongExamples = shuffle(
        distractorPool.filter(x =>
          x.word !== w.word &&
          x.example &&
          !x.example.toLowerCase().includes(w.word.toLowerCase()) &&
          x.example !== w.example
        )
      ).slice(0, 3).map(x => x.example);
      while (wrongExamples.length < 3) {
        const fallback = shuffle(distractorPool).find(x => x.example && x.word !== w.word);
        if (!fallback) break;
        if (!wrongExamples.includes(fallback.example)) wrongExamples.push(fallback.example);
      }
      const opts = shuffle([maskedCorrect, ...wrongExamples]);
      return { type, word: w, prompt: w.word, options: opts, correct: opts.indexOf(maskedCorrect) };
    }
    // Default: meaning
    const wrongs = shuffle(distractorPool.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.definition.en);
    const opts = shuffle([w.definition.en, ...wrongs]);
    return { type: "meaning", word: w, prompt: w.word, options: opts, correct: opts.indexOf(w.definition.en) };
  };

  const built = picked.map((w, idx) => buildOne(w, idx));
  return built;
};

const TYPE_LABELS: Record<ExType, { vi: string; en: string; emoji: string }> = {
  meaning: { vi: "Chọn nghĩa đúng", en: "Choose meaning", emoji: "🎯" },
  reverse: { vi: "Chọn từ đúng theo nghĩa tiếng Việt", en: "Pick the English word", emoji: "🔁" },
  fillBlank: { vi: "Điền từ vào chỗ trống", en: "Fill in the blank", emoji: "✏️" },
  synonym: { vi: "Chọn từ đồng nghĩa", en: "Pick the synonym", emoji: "🔗" },
  listening: { vi: "Nghe và chọn từ", en: "Listen & choose", emoji: "🎧" },
  defEn: { vi: "Định nghĩa tiếng Anh → từ", en: "English definition → word", emoji: "📖" },
  collocation: { vi: "Chọn cụm từ đi kèm", en: "Pick the collocation", emoji: "🧩" },
  scramble: { vi: "Sắp xếp lại chữ cái", en: "Unscramble the letters", emoji: "🔤" },
  context: { vi: "Câu nào dùng đúng từ này?", en: "Which sentence uses it?", emoji: "💬" },
  antonymOdd: { vi: "Tìm từ khác nhóm nghĩa", en: "Find the odd word out", emoji: "🚫" },
  wordForm: { vi: "Từ này thuộc từ loại nào?", en: "Which part of speech?", emoji: "🏷️" },
  topic: { vi: "Từ này thuộc chủ đề nào?", en: "Which IELTS topic?", emoji: "🗂️" },
  typeWord: { vi: "Gõ lại từ theo nghĩa", en: "Type the word from meaning", emoji: "⌨️" },
  dictation: { vi: "Nghe rồi gõ lại từ", en: "Listen & type the word", emoji: "🎙️" },
  ipa: { vi: "Chọn phiên âm đúng", en: "Pick the correct IPA", emoji: "🔊" },
};

const MODE_LABELS: Record<ExMode, { vi: string; en: string }> = {
  all: { vi: "Tất cả dạng", en: "All types" },
  choice: { vi: "Chỉ trắc nghiệm", en: "Multiple choice only" },
  typing: { vi: "Chỉ gõ chữ", en: "Typing only" },
  audio: { vi: "Chỉ nghe", en: "Listening only" },
};

// Per-type accuracy stats used by the performance radar chart.
export const TYPE_STATS_KEY = "vocab_type_stats_ielts";
export type TypeStats = Record<string, { correct: number; total: number }>;

const readTypeStats = (): TypeStats => {
  try { return JSON.parse(localStorage.getItem(TYPE_STATS_KEY) || "{}") as TypeStats; } catch { return {}; }
};

const mergeTypeStats = (session: TypeStats) => {
  try {
    const saved = readTypeStats();
    Object.entries(session).forEach(([k, v]) => {
      const prev = saved[k] || { correct: 0, total: 0 };
      saved[k] = { correct: prev.correct + v.correct, total: prev.total + v.total };
    });
    localStorage.setItem(TYPE_STATS_KEY, JSON.stringify(saved));
    window.dispatchEvent(new CustomEvent("vocab-type-stats-updated"));
  } catch { /* ignore */ }
};

const VocabExercise = ({ words, allWords, t, priorityWords }: {
  words: IeltsWord[];
  allWords?: IeltsWord[];
  t: (vi: string, en: string) => string;
  /** Words the memory brain asked to drill first (today's review mission). */
  priorityWords?: string[];
}) => {
  const [questions, setQuestions] = useState<ExQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const scoreSavedRef = useRef(false);
  /** Words already counted as reviewed in this session (avoids double counting). */
  const reviewedRef = useRef<Set<string>>(new Set());
  const [quizSize, setQuizSize] = useState<number>(20);
  const [mode, setMode] = useState<ExMode>("all");
  // Typing questions
  const [typed, setTyped] = useState("");
  const [typedResult, setTypedResult] = useState<null | boolean>(null);
  // Per-type stats + wrong questions for the "retry mistakes" flow
  const [stats, setStats] = useState<TypeStats>({});
  const [wrongQs, setWrongQs] = useState<ExQuestion[]>([]);

  const startWith = useCallback((qs: ExQuestion[]) => {
    setQuestions(qs);
    setCurrent(0);
    setSelected(null);
    setTyped("");
    setTypedResult(null);
    setScore(0);
    setFinished(false);
    setStats({});
    setWrongQs([]);
    scoreSavedRef.current = false;
  }, []);

  const generateQuiz = useCallback(() => {
    if (words.length < 4) return;
    const size = Math.min(quizSize, words.length);
    // The memory brain can hand over the words that are about to be forgotten:
    // drill those first, then fill the rest of the quiz with the other words.
    const priority = new Set((priorityWords || []).map(w => w.toLowerCase()));
    const ordered = priority.size > 0
      ? [
          ...shuffle(words.filter(w => priority.has(w.word.toLowerCase()))),
          ...shuffle(words.filter(w => !priority.has(w.word.toLowerCase()))),
        ]
      : words;
    startWith(buildQuestions(ordered, allWords && allWords.length > 4 ? allWords : words, size, mode, priority.size > 0));
  }, [words, allWords, quizSize, mode, startWith, priorityWords]);

  const retryWrong = useCallback(() => {
    if (wrongQs.length === 0) return;
    startWith(shuffle(wrongQs));
  }, [wrongQs, startWith]);

  useEffect(() => {
    if (!finished || scoreSavedRef.current) return;
    scoreSavedRef.current = true;
    mergeTypeStats(stats);
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await (supabase as any).from("game_scores").insert({
          user_id: user.id, score, game_type: "vocab-ielts", max_streak: 0,
          accuracy: questions.length > 0 ? Math.round((score / questions.length) * 100) : 0,
        });
      }
    })();
  }, [finished]);

  useEffect(() => { generateQuiz(); }, [generateQuiz]);

  // Record one answer into the per-type stats + wrong list.
  const record = (q: ExQuestion, correct: boolean) => {
    setStats(prev => {
      const cur = prev[q.type] || { correct: 0, total: 0 };
      return { ...prev, [q.type]: { correct: cur.correct + (correct ? 1 : 0), total: cur.total + 1 } };
    });
    if (!correct) setWrongQs(prev => [...prev, q]);
    // A correct answer is a real spaced-repetition review: it pushes the word
    // deeper towards long-term memory in the Vocabulary Brain. Once per session
    // per word so a "retry mistakes" round cannot inflate the repetition count.
    if (correct && !reviewedRef.current.has(q.word.word)) {
      reviewedRef.current.add(q.word.word);
      void recordVocabReviewTracked("ielts", [q.word.word]);
    }
  };

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    const q = questions[current];
    if (!q) return;
    setSelected(idx);
    const ok = idx === q.correct;
    if (ok) setScore(s => s + 1);
    record(q, ok);
  };

  const checkTyped = () => {
    const q = questions[current];
    if (!q || typedResult !== null) return;
    const ok = normalizeText(typed) === normalizeText(q.answerText || q.word.word);
    setTypedResult(ok);
    if (ok) setScore(s => s + 1);
    record(q, ok);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) setFinished(true);
    else {
      setCurrent(c => c + 1);
      setSelected(null);
      setTyped("");
      setTypedResult(null);
    }
  };


  if (words.length < 4) return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-6xl mb-4">📚</div>
      <h3 className="text-xl font-bold text-foreground mb-2">{t("Chưa đủ từ vựng", "Not enough words")}</h3>
      <p className="text-muted-foreground max-w-md">
        {t(
          `Hãy đánh dấu ⭐ ít nhất 4 từ đã học để bắt đầu luyện tập! (Hiện tại: ${words.length}/4)`,
          `Mark ⭐ at least 4 words as learned to start practicing! (Current: ${words.length}/4)`
        )}
      </p>
    </div>
  );
  if (questions.length === 0) return <p className="text-muted-foreground text-center py-12">{t("Đang tạo bài tập...", "Generating exercises...")}</p>;

  if (finished) {
    const rows = Object.entries(stats).sort((a, b) => b[1].total - a[1].total);
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-6xl mb-4">{score >= 10 ? "🏆" : score >= 7 ? "👍" : "💪"}</div>
        <h3 className="text-2xl font-bold text-foreground mb-2">{score}/{questions.length}</h3>
        <p className="text-muted-foreground mb-6">
          {score >= 10 ? t("Xuất sắc! Bạn nắm vững từ vựng rất tốt!", "Excellent! You've mastered these words!") :
           score >= 7 ? t("Khá tốt! Hãy tiếp tục ôn luyện.", "Good job! Keep practicing.") :
           t("Cần ôn thêm. Hãy thử lại nhé!", "Needs more review. Try again!")}
        </p>

        {/* Accuracy by question type */}
        {rows.length > 0 && (
          <div className="mb-6 w-full max-w-lg rounded-xl border border-border bg-card p-4 text-left">
            <h4 className="mb-3 text-sm font-bold text-foreground">
              {t("Đúng/sai theo dạng câu hỏi", "Accuracy by question type")}
            </h4>
            <div className="space-y-2">
              {rows.map(([type, v]) => {
                const lbl = TYPE_LABELS[type as ExType];
                const pct = v.total ? Math.round((v.correct / v.total) * 100) : 0;
                return (
                  <div key={type} className="flex items-center gap-3 text-sm">
                    <span className="w-44 shrink-0 truncate text-muted-foreground">
                      {lbl ? `${lbl.emoji} ${t(lbl.vi, lbl.en)}` : type}
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div
                        className={`h-full rounded-full ${pct >= 80 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-red-500"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-16 shrink-0 text-right font-semibold text-foreground">{v.correct}/{v.total}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={generateQuiz} className="gap-2">
            <RotateCcw className="w-4 h-4" /> {t("Làm lại", "Try Again")}
          </Button>
          {wrongQs.length > 0 && (
            <Button variant="outline" onClick={retryWrong} className="gap-2">
              <XCircle className="w-4 h-4 text-red-500" />
              {t(`Luyện lại ${wrongQs.length} câu sai`, `Retry ${wrongQs.length} mistakes`)}
            </Button>
          )}
        </div>
        <div className="w-full max-w-sm">
          <GameLeaderboard gameType="vocab-ielts" currentScore={score} />
        </div>
      </div>
    );
  }

  const q = questions[current];
  if (!q) return null;
  const label = TYPE_LABELS[q.type];
  const isTyping = TYPING_TYPES.includes(q.type);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <label className="text-muted-foreground">{t("Số câu hỏi:", "Questions:")}</label>
          <select
            value={quizSize}
            onChange={(e) => setQuizSize(Number(e.target.value))}
            className="rounded-md border border-border bg-card px-2 py-1 text-sm"
          >
            {[5, 10, 20, 30, 50, 100, 200, 300, 500].map(n => (
              <option key={n} value={n} disabled={n > words.length && n !== 5}>
                {n} {n > words.length ? `(${t("chỉ có", "only")} ${words.length})` : ""}
              </option>
            ))}
          </select>
          <label className="ml-2 text-muted-foreground">{t("Dạng bài:", "Focus:")}</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as ExMode)}
            className="rounded-md border border-border bg-card px-2 py-1 text-sm"
          >
            {(Object.keys(MODE_LABELS) as ExMode[]).map(m => (
              <option key={m} value={m}>{t(MODE_LABELS[m].vi, MODE_LABELS[m].en)}</option>
            ))}
          </select>
          <Button size="sm" variant="outline" onClick={generateQuiz} className="ml-2">
            <RotateCcw className="w-3 h-3 mr-1" /> {t("Tạo mới", "New quiz")}
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-muted-foreground">{t("Câu", "Question")} {current + 1}/{questions.length}</span>
        <Badge variant="outline" className="text-xs">{label.emoji} {t(label.vi, label.en)}</Badge>
        <span className="text-sm font-semibold text-primary">{t("Điểm", "Score")}: {score}</span>
      </div>
      <div className="rounded-xl border border-border bg-card p-8 mb-6">
        {q.type === "listening" ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <button onClick={() => speak(q.word.word)} className="p-6 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
              <Volume2 className="w-10 h-10 text-primary" />
            </button>
            <p className="text-sm text-muted-foreground">{t("Nhấn để nghe lại", "Tap to listen again")}</p>
          </div>
        ) : q.type === "dictation" ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <button onClick={() => speak(q.word.word)} className="p-6 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
              <Volume2 className="w-10 h-10 text-primary" />
            </button>
            <p className="text-sm text-muted-foreground">{t("Nghe rồi gõ lại từ bạn nghe được", "Listen, then type the word you hear")}</p>
            {q.hint && <p className="text-sm italic text-muted-foreground">{t("Gợi ý:", "Hint:")} {q.hint}</p>}
          </div>
        ) : q.type === "typeWord" ? (
          <>
            <p className="text-xs text-muted-foreground mb-2">{t("Nghĩa tiếng Việt:", "Vietnamese meaning:")}</p>
            <h3 className="text-2xl font-bold text-foreground mb-2">{q.prompt}</h3>
            <p className="text-sm font-mono text-muted-foreground">{q.hint}</p>
            <p className="text-sm text-muted-foreground mt-2">{t("Gõ từ tiếng Anh tương ứng:", "Type the matching English word:")}</p>
          </>
        ) : q.type === "wordForm" ? (
          <>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-3xl font-bold text-foreground">{q.prompt}</h3>
              <button onClick={() => speak(q.word.word)} className="p-2 rounded-full hover:bg-primary/10">
                <Volume2 className="w-5 h-5 text-primary" />
              </button>
            </div>
            <p className="text-sm italic text-muted-foreground mb-1">"{q.word.example}"</p>
            <p className="text-sm text-muted-foreground">{t("Từ này thuộc từ loại nào?", "Which part of speech is it?")}</p>
          </>
        ) : q.type === "topic" ? (
          <>
            <h3 className="text-3xl font-bold text-foreground mb-2">{q.prompt}</h3>
            <p className="text-sm text-muted-foreground mb-1">{q.word.definition.en}</p>
            <p className="text-sm text-muted-foreground">{t("Từ này thường dùng cho chủ đề IELTS nào?", "Which IELTS topic does it belong to?")}</p>
          </>
        ) : q.type === "ipa" ? (
          <>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-3xl font-bold text-foreground">{q.prompt}</h3>
              <button onClick={() => speak(q.word.word)} className="p-2 rounded-full hover:bg-primary/10">
                <Volume2 className="w-5 h-5 text-primary" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">{t("Nghe và chọn phiên âm đúng:", "Listen and pick the correct transcription:")}</p>
          </>
        ) : q.type === "antonymOdd" ? (
          <>
            <p className="text-xs text-muted-foreground mb-2">
              {t(`Ba từ dưới đây cùng chủ đề "${q.hint}". Chọn từ KHÔNG cùng nhóm:`, `Three of these belong to "${q.hint}". Pick the one that does NOT:`)}
            </p>
            <h3 className="text-lg font-semibold text-foreground leading-relaxed">{q.prompt}</h3>
          </>
        ) : q.type === "reverse" ? (
          <>
            <p className="text-xs text-muted-foreground mb-2">{t("Nghĩa tiếng Việt:", "Vietnamese meaning:")}</p>
            <h3 className="text-2xl font-bold text-foreground mb-2">{q.prompt}</h3>
            <p className="text-sm text-muted-foreground">{t("Chọn từ tiếng Anh tương ứng:", "Pick the matching English word:")}</p>
          </>
        ) : q.type === "defEn" ? (
          <>
            <p className="text-xs text-muted-foreground mb-2">{t("Định nghĩa tiếng Anh:", "English definition:")}</p>
            <h3 className="text-xl font-semibold text-foreground mb-2 leading-relaxed">"{q.prompt}"</h3>
            <p className="text-sm text-muted-foreground">{t("Từ nào khớp với định nghĩa trên?", "Which word matches?")}</p>
          </>
        ) : q.type === "fillBlank" ? (
          <>
            <p className="text-xs text-muted-foreground mb-2">{t("Điền từ thích hợp vào chỗ trống:", "Fill in the blank:")}</p>
            <p className="text-lg text-foreground italic leading-relaxed">{q.prompt}</p>
          </>
        ) : q.type === "synonym" ? (
          <>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-3xl font-bold text-foreground">{q.prompt}</h3>
              <button onClick={() => speak(q.word.word)} className="p-2 rounded-full hover:bg-primary/10">
                <Volume2 className="w-5 h-5 text-primary" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">{t("Chọn từ đồng nghĩa:", "Choose the synonym:")}</p>
          </>
        ) : q.type === "collocation" ? (
          <>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-3xl font-bold text-foreground">{q.prompt}</h3>
              <button onClick={() => speak(q.word.word)} className="p-2 rounded-full hover:bg-primary/10">
                <Volume2 className="w-5 h-5 text-primary" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">{t("Cụm từ nào thường đi kèm với từ này?", "Which collocation goes with this word?")}</p>
          </>
        ) : q.type === "scramble" ? (
          <>
            <p className="text-xs text-muted-foreground mb-2">{t("Sắp xếp lại các chữ cái để được từ đúng:", "Unscramble the letters:")}</p>
            <h3 className="text-3xl font-extrabold tracking-[0.4em] text-primary mb-2 uppercase">{q.prompt}</h3>
            <p className="text-sm text-muted-foreground italic">{t("Gợi ý:", "Hint:")} {q.word.definition.vi}</p>
          </>
        ) : q.type === "context" ? (
          <>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-3xl font-bold text-foreground">{q.prompt}</h3>
              <button onClick={() => speak(q.word.word)} className="p-2 rounded-full hover:bg-primary/10">
                <Volume2 className="w-5 h-5 text-primary" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">{t("Câu nào dùng từ này một cách tự nhiên?", "Which sentence uses it naturally?")}</p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-3xl font-bold text-foreground">{q.word.word}</h3>
              <button onClick={() => speak(q.word.word)} className="p-2 rounded-full hover:bg-primary/10">
                <Volume2 className="w-5 h-5 text-primary" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground font-mono mb-1">{q.word.ipa}</p>
            {q.word.example && (
              <p className="text-sm font-semibold text-foreground italic"><span className="not-italic font-bold text-primary">E.g. </span>{q.word.example}</p>
            )}
            <p className="text-sm text-muted-foreground mt-3">{t("Chọn nghĩa đúng:", "Choose the correct meaning:")}</p>
          </>
        )}
      </div>
      {isTyping ? (
        <div className="rounded-xl border border-border bg-card p-5">
          <input
            value={typed}
            onChange={e => setTyped(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") { typedResult === null ? checkTyped() : handleNext(); } }}
            disabled={typedResult !== null}
            placeholder={t("Gõ từ tại đây...", "Type the word here...")}
            autoFocus
            className={`w-full rounded-lg border-2 bg-background px-4 py-3 text-lg font-semibold outline-none transition-colors ${
              typedResult === null ? "border-border focus:border-primary"
                : typedResult ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"
            }`}
          />
          {typedResult === null ? (
            <Button onClick={checkTyped} disabled={!typed.trim()} className="mt-4 w-full">
              {t("Kiểm tra", "Check")}
            </Button>
          ) : (
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
              {typedResult ? (
                <><CheckCircle className="h-5 w-5 text-green-500" /> <span className="text-green-600">{t("Chính xác!", "Correct!")}</span></>
              ) : (
                <><XCircle className="h-5 w-5 text-red-500" /> <span className="text-red-600">{t("Đáp án đúng:", "Correct answer:")} {q.answerText}</span></>
              )}
            </div>
          )}
        </div>
      ) : (
      <div className="space-y-3">
        {q.options.map((opt, idx) => {
          let cls = "rounded-xl border p-4 cursor-pointer transition-all text-sm text-foreground ";
          if (selected !== null) {
            if (idx === q.correct) cls += "border-green-500 bg-green-500/10 ";
            else if (idx === selected) cls += "border-red-500 bg-red-500/10 ";
            else cls += "border-border bg-card opacity-50 ";
          } else {
            cls += "border-border bg-card hover:border-primary/40 ";
          }
          return (
            <div key={idx} onClick={() => handleSelect(idx)} className={cls}>
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-xs font-bold shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
                {selected !== null && idx === q.correct && <CheckCircle className="w-5 h-5 text-green-500 ml-auto shrink-0" />}
                {selected !== null && idx === selected && idx !== q.correct && <XCircle className="w-5 h-5 text-red-500 ml-auto shrink-0" />}
              </div>
            </div>
          );
        })}
      </div>
      )}
      {(selected !== null || typedResult !== null) && (
        <div className="flex justify-between items-center mt-6 gap-3 flex-wrap">
          <p className="text-sm text-muted-foreground italic">
            <strong className="text-foreground not-italic">{q.word.word}</strong> - {q.word.definition.vi}
          </p>
          <Button onClick={handleNext}>
            {current + 1 >= questions.length ? t("Xem kết quả", "See Results") : t("Câu tiếp", "Next")}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

const IeltsVocabulary = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "flashcard" | "exercise">("list");
  const { mastered, toggle: toggleMastered, pendingCount } = useMasteredVocab("ielts");
  const [showMasteredOnly, setShowMasteredOnly] = useState(false);
  const [flyingStars, setFlyingStars] = useState<{ id: number; startX: number; startY: number }[]>([]);
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const starIdCounter = useRef(0);

  // Wrap toggleMastered with motivational toast + confetti
  const handleMasteredWithMotivation = useMasteredMotivation(mastered, toggleMastered);

  // Launch a flying star from a click event position
  const handleStarClick = useCallback((word: string, e: React.MouseEvent) => {
    const isCurrentlyMastered = mastered.has(word);
    handleMasteredWithMotivation(word);

    // Only fly star when marking as mastered (not un-marking)
    if (!isCurrentlyMastered) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const id = ++starIdCounter.current;
      setFlyingStars(prev => [...prev, {
        id,
        startX: rect.left + rect.width / 2,
        startY: rect.top + rect.height / 2,
      }]);
    }
  }, [mastered, handleMasteredWithMotivation]);

  // Remove a flying star after it lands
  const handleStarLanded = useCallback((id: number) => {
    setFlyingStars(prev => prev.filter(s => s.id !== id));
  }, []);

  const filtered = useMemo(() => {
    let words = ieltsVocabData;
    if (search) {
      const q = search.toLowerCase();
      words = words.filter(w =>
        w.word.toLowerCase().includes(q) ||
        w.definition.en.toLowerCase().includes(q) ||
        w.definition.vi.toLowerCase().includes(q)
      );
    }
    if (levelFilter !== "all") words = words.filter(w => w.level === levelFilter);
    if (categoryFilter !== "all") words = words.filter(w => w.category === categoryFilter);
    if (showMasteredOnly) words = words.filter(w => !mastered.has(w.word));
    return words;
  }, [search, levelFilter, categoryFilter, showMasteredOnly, mastered]);

  const totalPages = Math.ceil(filtered.length / WORDS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * WORDS_PER_PAGE, page * WORDS_PER_PAGE);

  // Reset page when filters change
  useEffect(() => setPage(1), [search, levelFilter, categoryFilter, showMasteredOnly]);

  return (
    <div ref={pageContainerRef} className="min-h-screen bg-background">
      <SEO title="800 Từ Vựng IELTS Có Hình Minh Họa | HaiEduTech" description="Ngân hàng 800 từ vựng IELTS theo chủ đề & cấp độ CEFR, có hình minh họa, IPA, ví dụ. Flashcard, quiz, leaderboard và Mountain Climber gamification." path="/ielts-vocabulary" />
      <Navbar />
      <StudyChibisStatic />
      <div className="pt-24 lg:pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <RouterLink to="/english/ielts" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="w-4 h-4" />
            {t("Quay lại IELTS", "Back to IELTS")}
          </RouterLink>
          <div className="flex gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                IELTS Vocabulary <span className="text-gradient">{t("Ngân hàng từ vựng", "Word Bank")}</span>
              </h1>
              <p className="text-muted-foreground">
                {t(
                  `${ieltsVocabData.length} từ vựng thiết yếu - Lọc, học flashcard, luyện tập, nghe phát âm`,
                  `${ieltsVocabData.length} essential words - Filter, flashcard, exercises, pronunciation`
                )}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
                <span className="text-muted-foreground">{t("Đã thuộc", "Mastered")}: <strong className="text-primary">{mastered.size}</strong></span>
                <span className="text-muted-foreground">{t("Cần ôn", "Need Review")}: <strong className="text-orange-400">{ieltsVocabData.length - mastered.size}</strong></span>
                {pendingCount > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {t(`Đang đồng bộ ${pendingCount} từ lên bảng xếp hạng...`, `Syncing ${pendingCount} word(s) to the leaderboard...`)}
                  </span>
                )}

              </div>
            </div>

            {/* Mountain Climber progress visualization */}
            <MountainClimber mastered={mastered.size} total={ieltsVocabData.length} flyingStars={flyingStars} onStarLanded={handleStarLanded} containerRef={pageContainerRef} />

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={t("Tìm từ vựng...", "Search words...")}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none text-sm"
                />
              </div>
              <select
                value={levelFilter}
                onChange={e => setLevelFilter(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none"
              >
                <option value="all">{t("Tất cả cấp độ", "All Levels")}</option>
                {CEFR_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none max-w-[200px]"
              >
                <option value="all">{t("Tất cả chủ đề", "All Topics")}</option>
                {IELTS_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <Tabs value={viewMode} onValueChange={v => setViewMode(v as "list" | "flashcard" | "exercise")}>
                <TabsList>
                  <TabsTrigger value="list" className="gap-1.5 px-4"><List className="w-4 h-4" /> {t("Từ vựng", "Vocabulary")}</TabsTrigger>
                  <TabsTrigger value="flashcard" className="gap-1.5 px-4"><Layers className="w-4 h-4" /> Flashcard</TabsTrigger>
                  <TabsTrigger value="exercise" className="gap-1.5 px-4"><BookOpen className="w-4 h-4" /> {t("Luyện tập", "Practice")}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <p className="text-xs text-muted-foreground mb-4">{filtered.length} {t("kết quả", "results")}</p>

            {/* Content based on mode */}
            {viewMode === "exercise" ? (
              <VocabExercise words={ieltsVocabData.filter(w => mastered.has(w.word))} allWords={ieltsVocabData} t={t} />
            ) : viewMode === "flashcard" ? (
              <FlashcardDeck words={filtered} t={t} mastered={mastered} onStar={handleStarClick} />
            ) : (() => {
              // Group paginated words by category so each topic shows its own section
              const groups = paginated.reduce<Record<string, IeltsWord[]>>((acc, w) => {
                (acc[w.category] ||= []).push(w);
                return acc;
              }, {});
              const orderedCats = IELTS_CATEGORIES.filter(c => groups[c]);
              // include any category not in the predefined list (defensive)
              Object.keys(groups).forEach(c => { if (!(orderedCats as string[]).includes(c)) (orderedCats as string[]).push(c); });

              return (
                <div className="space-y-8">
                  {orderedCats.map(cat => (
                    <section key={cat}>
                      <div className="flex items-baseline gap-3 mb-3 border-b border-border/60 pb-1.5">
                        <h3 className="text-lg font-bold text-primary">{cat}</h3>
                        <span className="text-xs text-muted-foreground">{groups[cat].length} {t("từ", "words")}</span>
                      </div>

                      {(

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                          {groups[cat].map(w => (
                            <motion.div
                              key={w.word + w.category}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="group min-w-0 h-full rounded-xl bg-white dark:bg-card hover:shadow-lg transition-all duration-300"
                              style={{ padding: "1rem 1.1rem", border: "3px solid hsl(var(--primary) / 0.4)", boxShadow: "0 2px 8px -2px hsl(var(--primary) / 0.15)", borderRadius: "0.85rem" }}

                            >
                              {/* Header: Word + Illustration + Audio + Star */}
                              <div className="mb-1.5 min-w-0 flex items-start gap-2">
                                <div className="min-w-0 flex-1">
                                  <h4 className="break-words font-extrabold" style={{ fontSize: "1.2rem", lineHeight: 1.25, overflowWrap: "break-word", wordBreak: "normal" }}>
                                    <span style={{ color: "#059669" }}>{w.word}</span>
                                    {w.synonyms && w.synonyms.length > 0 && (
                                      <span className="ml-1.5 italic font-medium" style={{ fontSize: "0.82rem", color: "#374151" }}>
                                        = {w.synonyms.slice(0, 2).join(", ")}
                                      </span>
                                    )}
                                  </h4>
                                  <p className="break-words font-mono" style={{ fontSize: "0.78rem", color: "#6b7280", overflowWrap: "break-word", wordBreak: "normal" }}>{w.ipa}</p>
                                  <div className="mt-1 flex items-center gap-0.5">
                                    <button onClick={() => speak(w.word)} className="rounded-md p-1 transition-colors hover:bg-primary/10">
                                      <Volume2 size={16} style={{ color: "#4b5563" }} />
                                    </button>
                                    <motion.button
                                      onClick={(e) => handleStarClick(w.word, e)}
                                      className="rounded-md p-1 transition-colors hover:bg-yellow-500/10"
                                      whileTap={{ scale: 1.4 }}
                                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                      <Star
                                        size={16}
                                        className={mastered.has(w.word) ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]" : ""}
                                        style={mastered.has(w.word) ? {} : { color: "#4b5563" }}
                                      />
                                    </motion.button>
                                  </div>
                                </div>
                                <VocabIllustration word={w.word} definition={w.definition.en} category={w.category} size={48} />
                              </div>

                              {/* Badges */}
                              <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                                <Badge className={levelColors[w.level] + " text-[10px] px-1.5 py-0"}>{w.level}</Badge>
                                {w.partOfSpeech && <Badge variant="secondary" className="text-[10px] px-1.5 py-0 italic">{w.partOfSpeech}</Badge>}
                              </div>

                              {/* Definition - high contrast */}
                              <p className="min-w-0 break-words font-semibold whitespace-normal" style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.45, overflowWrap: "break-word", wordBreak: "normal" }}>{w.definition.en}</p>
                              <p className="mt-0.5 min-w-0 break-words font-bold whitespace-normal" style={{ fontSize: "1rem", color: "#1d4ed8", lineHeight: 1.45, overflowWrap: "break-word", wordBreak: "normal" }}>{w.definition.vi}</p>

                              {/* Example sentence */}
                              <p className="mt-1.5 min-w-0 break-words italic whitespace-normal" style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.5, overflowWrap: "break-word", wordBreak: "normal" }}>
                                <span className="font-bold not-italic" style={{ color: "#1d4ed8" }}>E.g. </span>
                                {w.example.split(new RegExp(`(${w.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig")).map((part, i) =>
                                  part.toLowerCase() === w.word.toLowerCase()
                                    ? <strong key={i} className="font-extrabold italic" style={{ color: "#111827" }}>{part}</strong>
                                    : <span key={i}>{part}</span>
                                )}
                              </p>

                              {/* Vietnamese translation of example */}
                              {IELTS_EXAMPLE_VI[w.example?.trim() ?? ""] && (
                                <p className="min-w-0 break-words whitespace-normal" style={{ fontSize: "0.88rem", color: "#047857", lineHeight: 1.5, fontWeight: 500, overflowWrap: "break-word", wordBreak: "normal" }}>
                                  <span className="font-semibold">→ </span>{IELTS_EXAMPLE_VI[w.example.trim()]}
                                </p>
                              )}

                              {/* Inline Type-the-example widget */}
                              <InlineTypeExample word={w} t={t} />
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </section>
                  ))}
                </div>
              );
            })()}

            {/* Pagination (hide in exercise mode) */}
            {viewMode === "list" && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-muted-foreground">{page} / {totalPages}</span>
                <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </motion.div>
          <div className="hidden lg:block w-72 flex-shrink-0 self-start space-y-4">
            <VocabMasteryLeaderboard subject="ielts" currentCount={mastered.size} />
            <StudyStreakLeaderboard />
            <SmartReviewColumn
              subject="ielts"
              lang="en-US"
              lookupWord={(w) => {
                const found = ieltsVocabData.find(x => x.word === w);
                if (!found) return null;
                return {
                  word: found.word,
                  phonetic: found.ipa,
                  definitionVi: found.definition.vi,
                  definitionEn: found.definition.en,
                };
              }}
              allWordsForQuiz={ieltsVocabData.map(w => ({ word: w.word, definition: w.definition.vi }))}
            />
            <WeeklyVocabAchievers subject="ielts" threshold={20} />
          </div>
          </div>
          <div className="lg:hidden mt-6 space-y-4">
            <VocabMasteryLeaderboard subject="ielts" currentCount={mastered.size} />
            <StudyStreakLeaderboard />
            <SmartReviewColumn
              subject="ielts"
              lang="en-US"
              lookupWord={(w) => {
                const found = ieltsVocabData.find(x => x.word === w);
                if (!found) return null;
                return {
                  word: found.word,
                  phonetic: found.ipa,
                  definitionVi: found.definition.vi,
                  definitionEn: found.definition.en,
                };
              }}
              allWordsForQuiz={ieltsVocabData.map(w => ({ word: w.word, definition: w.definition.vi }))}
            />
            <WeeklyVocabAchievers subject="ielts" threshold={20} />
          </div>
          {/* Memory brain visualisation (always at the very bottom) */}
          <VocabBrainPanel
            subject="ielts"
            localWords={[...mastered]}
            t={t}
            lookupWord={(w) => {
              const found = ieltsVocabData.find(x => x.word === w);
              if (!found) return null;
              return {
                word: found.word,
                phonetic: found.ipa,
                definitionVi: found.definition.vi,
                definitionEn: found.definition.en,
              };
            }}
            onPractice={() => {
              setViewMode("exercise");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IeltsVocabulary;
