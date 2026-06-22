import StudyChibisStatic from "@/components/decorations/StudyChibisStatic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Volume2, ChevronLeft, ChevronRight, Layers, List,
  RotateCcw, BookOpen, CheckCircle, XCircle, Building2, Users,
  Presentation, TrendingUp, DollarSign, Plane, Handshake, Cpu,
  Headphones, CalendarDays, ArrowLeft, Bookmark
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toeicVocabData, TOEIC_CATEGORIES, TOEIC_LEVELS, type ToeicWord } from "@/data/toeicVocabData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import GameLeaderboard from "@/components/games/GameLeaderboard";
import VocabMasteryLeaderboard from "@/components/VocabMasteryLeaderboard";
import { useMasteredVocab } from "@/hooks/useMasteredVocab";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react";
import SmartReviewColumn from "@/components/SmartReviewColumn";
import WeeklyVocabAchievers from "@/components/WeeklyVocabAchievers";
import ToeicMountainClimber from "@/components/ToeicMountainClimber";
import { useMasteredMotivation } from "@/hooks/useMasteredMotivation";

const WORDS_PER_PAGE = 24;

// Sort options for the vocabulary list
type SortKey = "default" | "az" | "za" | "easy" | "hard" | "mastered" | "unmastered";

// Numeric weight for level-based sorting (lower = easier)
const LEVEL_WEIGHT: Record<string, number> = {
  basic: 1,
  intermediate: 2,
  advanced: 3,
};

// Category icon mapping
const categoryIcons: Record<string, React.ReactNode> = {
  "Office & Workplace": <Building2 className="w-5 h-5" />,
  "Personnel & Human Resources": <Users className="w-5 h-5" />,
  "Meetings & Presentations": <Presentation className="w-5 h-5" />,
  "Sales & Marketing": <TrendingUp className="w-5 h-5" />,
  "Finance & Budgeting": <DollarSign className="w-5 h-5" />,
  "Travel & Transportation": <Plane className="w-5 h-5" />,
  "Contracts & Legal": <Handshake className="w-5 h-5" />,
  "Technology & IT": <Cpu className="w-5 h-5" />,
  "Customer Service": <Headphones className="w-5 h-5" />,
  "Events & Hospitality": <CalendarDays className="w-5 h-5" />,
};

// Level color mapping - Business Blue palette
const levelColors: Record<string, string> = {
  basic: "bg-sky-500 text-white border-sky-600 font-semibold",
  intermediate: "bg-blue-600 text-white border-blue-700 font-semibold",
  advanced: "bg-purple-600 text-white border-purple-700 font-semibold",
};

const levelLabels: Record<string, string> = {
  basic: "Basic",
  intermediate: "Intermediate",
  advanced: "Advanced Business",
};

// Word class badge colors (readable on white)
const wordClassColors: Record<string, string> = {
  n: "bg-emerald-100 text-emerald-800 border-emerald-300",
  v: "bg-amber-100 text-amber-800 border-amber-300",
  adj: "bg-violet-100 text-violet-800 border-violet-300",
  adv: "bg-rose-100 text-rose-800 border-rose-300",
};

// Text-to-Speech helper - Google proxy with native fallback.
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

// ── Flashcard Component (White & Clean) ──
const accentPalettes = [
  { bar: "from-sky-500 to-blue-600", icon: "bg-sky-100 text-sky-700", ring: "border-sky-200" },
  { bar: "from-emerald-500 to-teal-600", icon: "bg-emerald-100 text-emerald-700", ring: "border-emerald-200" },
  { bar: "from-amber-500 to-orange-500", icon: "bg-amber-100 text-amber-700", ring: "border-amber-200" },
  { bar: "from-rose-500 to-pink-600", icon: "bg-rose-100 text-rose-700", ring: "border-rose-200" },
  { bar: "from-violet-500 to-indigo-600", icon: "bg-violet-100 text-violet-700", ring: "border-violet-200" },
  { bar: "from-cyan-500 to-sky-600", icon: "bg-cyan-100 text-cyan-700", ring: "border-cyan-200" },
];
const pickPalette = (key: string) => {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return accentPalettes[h % accentPalettes.length];
};

const Flashcard = ({ word }: { word: ToeicWord }) => {
  const [flipped, setFlipped] = useState(false);
  const p = pickPalette(word.word + word.category);
  const icon = categoryIcons[word.category];
  return (
    <div className="cursor-pointer h-96" onClick={() => setFlipped(!flipped)} style={{ perspective: "1000px" }}>
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-2xl border-2 ${p.ring} bg-white p-6 flex flex-col items-center justify-center gap-3 shadow-lg hover:shadow-2xl transition-shadow`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r ${p.bar}`} />
          <div className={`w-16 h-16 rounded-2xl ${p.icon} flex items-center justify-center shadow-sm [&_svg]:w-8 [&_svg]:h-8`}>
            {icon ?? <Building2 className="w-8 h-8" />}
          </div>
          <h3 className="text-4xl font-extrabold text-slate-900 text-center tracking-tight">{word.word}</h3>
          <p className="text-lg text-slate-700 font-mono font-semibold">{word.ipa}</p>
          <div className="flex gap-2 flex-wrap justify-center">
            <Badge className={`${wordClassColors[word.wordClass]} border text-sm font-bold uppercase px-3 py-1`}>{word.wordClass}</Badge>
            <Badge className={`${levelColors[word.level]} border text-sm px-3 py-1`}>{levelLabels[word.level]}</Badge>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); speak(word.word); }}
            className={`mt-1 p-3 rounded-full bg-gradient-to-r ${p.bar} text-white shadow-md hover:shadow-xl hover:scale-110 transition-all`}
          >
            <Volume2 className="w-5 h-5" />
          </button>
          <p className="text-xs text-slate-500 italic">Click để xem nghĩa →</p>
        </div>
        {/* Back */}
        <div
          className={`absolute inset-0 rounded-2xl border-2 ${p.ring} bg-white px-5 py-6 flex flex-col justify-start gap-3 overflow-y-auto shadow-lg text-slate-900`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r ${p.bar}`} />
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-9 h-9 rounded-lg ${p.icon} flex items-center justify-center [&_svg]:w-5 [&_svg]:h-5`}>
              {icon ?? <Building2 className="w-5 h-5" />}
            </div>
            <h4 className="text-xl font-extrabold text-slate-900">{word.word}</h4>
          </div>
          <p className="text-base font-bold text-slate-900 leading-snug">{word.definition.en}</p>
          <p className="text-base font-semibold text-slate-800 leading-snug">🇻🇳 {word.definition.vi}</p>
          <div className="mt-1 pt-3 border-t border-slate-200">
            <p className="text-sm italic text-slate-700 leading-relaxed"><span className="not-italic font-bold text-slate-900">E.g. </span>{word.example}</p>
          </div>
          {word.synonyms.length > 0 && (
            <div className="mt-1">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-500">Synonyms: </span>
              <span className="text-sm font-medium text-slate-800">{word.synonyms.join(", ")}</span>
            </div>
          )}
          {word.collocations.length > 0 && (
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-500">Collocations: </span>
              <span className="text-sm font-medium text-slate-800">{word.collocations.join(", ")}</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// ── Typing Practice (gõ lại câu ví dụ) ──
const normalize = (s: string) =>
  s.toLowerCase().replace(/[.,!?;:'"`’“”\-]/g, "").replace(/\s+/g, " ").trim();

// Bold the keyword (and simple morphological variants) inside an example sentence.
const highlightKeyword = (sentence: string, word: string): React.ReactNode => {
  if (!word) return sentence;
  const stem = word.trim().replace(/(ing|ed|es|s|ly|tion|sion|ment|er|or|ies|y)$/i, "");
  const root = stem.length >= 3 ? stem : word.trim();
  const escaped = root.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(${escaped}[a-zA-Z]*)`, "gi");
  const parts = sentence.split(re);
  return parts.map((p, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="not-italic font-bold text-blue-700 dark:text-blue-300">{p}</strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );
};

const TypePractice = ({
  example,
  t,
}: {
  example: string;
  t: (vi: string, en: string) => string;
}) => {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const correct = checked && normalize(value) === normalize(example);
  const targetWords = example.split(/\s+/);
  const inputWords = value.trim().split(/\s+/);

  return (
    <div className="mt-2 space-y-2">
      <textarea
        value={value}
        onChange={(e) => { setValue(e.target.value); setChecked(false); }}
        placeholder={t("Gõ lại câu ví dụ ở đây...", "Retype the example sentence here...")}
        rows={2}
        className="w-full text-sm rounded-lg border border-sky-300 dark:border-slate-600 bg-white dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          onClick={() => setChecked(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white h-8 px-3 text-xs"
        >
          {t("Kiểm tra", "Check")}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => { setValue(""); setChecked(false); }}
          className="h-8 px-3 text-xs"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1" /> {t("Xóa", "Reset")}
        </Button>
        {checked && (
          <span className={`text-xs font-semibold inline-flex items-center gap-1 ${correct ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
            {correct
              ? (<><CheckCircle className="w-4 h-4" /> {t("Chính xác!", "Perfect!")}</>)
              : (<><XCircle className="w-4 h-4" /> {t("Chưa đúng – xem gợi ý bên dưới", "Not quite – check the diff below")}</>)}
          </span>
        )}
      </div>
      {checked && !correct && (
        <p className="text-xs leading-relaxed">
          {targetWords.map((tw, i) => {
            const ok = normalize(inputWords[i] || "") === normalize(tw);
            return (
              <span
                key={i}
                className={ok
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400 underline decoration-rose-400"}
              >
                {tw}{i < targetWords.length - 1 ? " " : ""}
              </span>
            );
          })}
        </p>
      )}
    </div>
  );
};

// ── Multi-mode Exercise Component ──
type ToeicExType =
  | "meaningVi"   // word → Vietnamese meaning
  | "meaningEn"   // word → English meaning
  | "reverse"     // Vietnamese meaning → word
  | "listening"   // audio → word
  | "fillBlank"   // example with blank → word
  | "synonym"     // word → synonym
  | "collocation" // word → collocation
  | "wordClass"   // word → part-of-speech
  | "scramble";   // scrambled letters → word

interface ToeicExQuestion {
  type: ToeicExType;
  word: ToeicWord;
  prompt: string;
  options: string[];
  correct: number;
}

const WORD_CLASS_LABELS: Record<string, { vi: string; en: string }> = {
  n: { vi: "Danh từ (noun)", en: "Noun" },
  v: { vi: "Động từ (verb)", en: "Verb" },
  adj: { vi: "Tính từ (adjective)", en: "Adjective" },
  adv: { vi: "Trạng từ (adverb)", en: "Adverb" },
};

const scrambleLetters = (w: string): string => {
  const letters = w.split("");
  if (letters.length < 2) return w;
  for (let i = 0; i < 10; i++) {
    const shuffled = shuffle(letters).join("");
    if (shuffled !== w) return shuffled;
  }
  return letters.reverse().join("");
};

const TOEIC_TYPE_LABELS: Record<ToeicExType, { vi: string; en: string; emoji: string }> = {
  meaningVi: { vi: "Chọn nghĩa tiếng Việt", en: "Choose Vietnamese meaning", emoji: "🇻🇳" },
  meaningEn: { vi: "Chọn nghĩa tiếng Anh", en: "Choose English meaning", emoji: "📖" },
  reverse: { vi: "Chọn từ theo nghĩa tiếng Việt", en: "Pick the English word", emoji: "🔁" },
  listening: { vi: "Nghe và chọn từ", en: "Listen & choose", emoji: "🎧" },
  fillBlank: { vi: "Điền từ vào chỗ trống", en: "Fill in the blank", emoji: "✏️" },
  synonym: { vi: "Chọn từ đồng nghĩa", en: "Pick the synonym", emoji: "🔗" },
  collocation: { vi: "Chọn cụm từ đi kèm", en: "Pick the collocation", emoji: "🧩" },
  wordClass: { vi: "Xác định loại từ", en: "Identify the part of speech", emoji: "🏷️" },
  scramble: { vi: "Sắp xếp lại chữ cái", en: "Unscramble the letters", emoji: "🔤" },
};

const buildToeicQuestions = (words: ToeicWord[], quizSize: number): ToeicExQuestion[] => {
  const picked = shuffle(words).slice(0, quizSize);
  return picked.map((w, idx) => {
    const candidates: ToeicExType[] = ["meaningVi", "meaningEn", "reverse", "listening", "scramble", "wordClass"];
    if (w.example && w.example.toLowerCase().includes(w.word.toLowerCase())) candidates.push("fillBlank");
    if (w.synonyms && w.synonyms.length > 0) candidates.push("synonym");
    if (w.collocations && w.collocations.length > 0) candidates.push("collocation");
    const type = candidates[idx % candidates.length];

    if (type === "meaningVi") {
      const wrongs = shuffle(words.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.definition.vi);
      const opts = shuffle([w.definition.vi, ...wrongs]);
      return { type, word: w, prompt: w.word, options: opts, correct: opts.indexOf(w.definition.vi) };
    }
    if (type === "meaningEn") {
      const wrongs = shuffle(words.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.definition.en);
      const opts = shuffle([w.definition.en, ...wrongs]);
      return { type, word: w, prompt: w.word, options: opts, correct: opts.indexOf(w.definition.en) };
    }
    if (type === "reverse") {
      const wrongs = shuffle(words.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.word);
      const opts = shuffle([w.word, ...wrongs]);
      return { type, word: w, prompt: w.definition.vi, options: opts, correct: opts.indexOf(w.word) };
    }
    if (type === "listening") {
      const wrongs = shuffle(words.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.word);
      const opts = shuffle([w.word, ...wrongs]);
      return { type, word: w, prompt: w.word, options: opts, correct: opts.indexOf(w.word) };
    }
    if (type === "fillBlank") {
      const re = new RegExp(w.word, "ig");
      const blanked = w.example.replace(re, "_____");
      const wrongs = shuffle(words.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.word);
      const opts = shuffle([w.word, ...wrongs]);
      return { type, word: w, prompt: blanked, options: opts, correct: opts.indexOf(w.word) };
    }
    if (type === "synonym") {
      const correctSyn = w.synonyms[0];
      const synPool = words.filter(x => x.word !== w.word).flatMap(x => x.synonyms || []);
      const wrongs = shuffle(synPool.filter(s => s !== correctSyn && s !== w.word)).slice(0, 3);
      while (wrongs.length < 3) wrongs.push(shuffle(words)[0].word);
      const opts = shuffle([correctSyn, ...wrongs]);
      return { type, word: w, prompt: w.word, options: opts, correct: opts.indexOf(correctSyn) };
    }
    if (type === "collocation") {
      const correctColl = w.collocations[0];
      const collPool = words.filter(x => x.word !== w.word).flatMap(x => x.collocations || []);
      const wrongs = shuffle(collPool.filter(c => c !== correctColl && !c.toLowerCase().includes(w.word.toLowerCase()))).slice(0, 3);
      while (wrongs.length < 3) wrongs.push(shuffle(words)[0].word);
      const opts = shuffle([correctColl, ...wrongs]);
      return { type, word: w, prompt: w.word, options: opts, correct: opts.indexOf(correctColl) };
    }
    if (type === "wordClass") {
      const classes = ["n", "v", "adj", "adv"];
      const wrongs = classes.filter(c => c !== w.wordClass).slice(0, 3);
      const opts = shuffle([w.wordClass, ...wrongs]).map(c => WORD_CLASS_LABELS[c]?.vi || c);
      const correctLabel = WORD_CLASS_LABELS[w.wordClass]?.vi || w.wordClass;
      return { type, word: w, prompt: w.word, options: opts, correct: opts.indexOf(correctLabel) };
    }
    // scramble
    const scrambled = scrambleLetters(w.word);
    const wrongs = shuffle(words.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.word);
    const opts = shuffle([w.word, ...wrongs]);
    return { type, word: w, prompt: scrambled, options: opts, correct: opts.indexOf(w.word) };
  });
};

const VocabExercise = ({ words, t }: { words: ToeicWord[]; t: (vi: string, en: string) => string }) => {
  const [questions, setQuestions] = useState<ToeicExQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [quizSize, setQuizSize] = useState<number>(10);
  const scoreSavedRef = useRef(false);
  const autoPlayedRef = useRef<number>(-1);

  const generate = useCallback(() => {
    if (words.length < 4) { setQuestions([]); return; }
    const size = Math.min(quizSize, words.length);
    setQuestions(buildToeicQuestions(words, size));
    setCurrent(0); setSelected(null); setScore(0); setFinished(false);
    scoreSavedRef.current = false;
    autoPlayedRef.current = -1;
  }, [words, quizSize]);

  useEffect(() => {
    if (!finished || scoreSavedRef.current) return;
    scoreSavedRef.current = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await (supabase as any).from("game_scores").insert({
          user_id: user.id, score, game_type: "vocab-toeic", max_streak: 0,
          accuracy: questions.length > 0 ? Math.round((score / questions.length) * 100) : 0,
        });
      }
    })();
  }, [finished]);

  // Auto-play audio when a listening question first appears
  useEffect(() => {
    const q = questions[current];
    if (q && q.type === "listening" && autoPlayedRef.current !== current) {
      autoPlayedRef.current = current;
      const id = setTimeout(() => speak(q.word.word), 250);
      return () => clearTimeout(id);
    }
  }, [current, questions]);

  if (words.length < 4) {
    return (
      <div className="text-center py-12">
        <BookOpen className="mx-auto mb-4 w-12 h-12 text-blue-400" />
        <p className="text-slate-600 dark:text-slate-300 text-lg">
          {t(`Cần ít nhất 4 từ để bắt đầu (hiện có ${words.length}).`, `Need at least 4 words to start (currently ${words.length}).`)}
        </p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="mx-auto mb-4 w-12 h-12 text-blue-400" />
        <p className="text-slate-600 dark:text-slate-300 mb-4 text-lg">
          {t("Trắc nghiệm đa dạng: nghĩa, nghe, điền chỗ trống, đồng nghĩa, cụm từ, loại từ và sắp xếp chữ cái.",
            "Multi-mode quiz: meaning, listening, fill-in-blank, synonyms, collocations, word class, and unscramble.")}
        </p>
        <div className="flex items-center justify-center gap-2 mb-4 text-sm">
          <label className="text-slate-600 dark:text-slate-400">{t("Số câu hỏi:", "Questions:")}</label>
          <select value={quizSize} onChange={e => setQuizSize(Number(e.target.value))} className="rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-2 py-1">
            {[5, 10, 15, 20, 30, 50, 100].map(n => (
              <option key={n} value={n} disabled={n > words.length && n !== 5}>
                {n} {n > words.length ? `(${t("chỉ có", "only")} ${words.length})` : ""}
              </option>
            ))}
          </select>
        </div>
        <Button onClick={generate} className="bg-blue-600 hover:bg-blue-700 text-white">{t("Bắt đầu", "Start Quiz")}</Button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">{score >= questions.length * 0.8 ? "🏆" : score >= questions.length / 2 ? "👍" : "💪"}</div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t("Kết quả", "Result")}: {score}/{questions.length}</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
          {score >= questions.length * 0.8 ? t("Xuất sắc! Bạn đã nắm vững từ vựng!", "Excellent! You've mastered the vocabulary!") :
            score >= questions.length / 2 ? t("Khá tốt! Tiếp tục luyện tập nhé!", "Good job! Keep practicing!") :
              t("Cần ôn lại thêm. Đừng bỏ cuộc!", "Need more review. Don't give up!")}
        </p>
        <Button onClick={generate} className="bg-blue-600 hover:bg-blue-700 text-white mb-6">{t("Làm lại", "Retry")}</Button>
        <div className="max-w-sm mx-auto">
          <GameLeaderboard gameType="vocab-toeic" currentScore={score} />
        </div>
      </div>
    );
  }

  const q = questions[current];
  const label = TOEIC_TYPE_LABELS[q.type];

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.correct) setScore(s => s + 1);
  };
  const handleNext = () => {
    if (current + 1 >= questions.length) setFinished(true);
    else { setCurrent(c => c + 1); setSelected(null); }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30 text-base px-3 py-1">{current + 1}/{questions.length}</Badge>
        <Badge variant="outline" className="text-xs">{label.emoji} {t(label.vi, label.en)}</Badge>
        <span className="text-slate-600 dark:text-slate-400 text-base">{t("Điểm", "Score")}: {score}</span>
      </div>

      <div className="rounded-xl border border-sky-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 p-6 mb-6">
        {q.type === "listening" ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <button onClick={() => speak(q.word.word)} className="p-6 rounded-full bg-blue-500/10 hover:bg-blue-500/20 transition-colors">
              <Volume2 className="w-10 h-10 text-blue-600" />
            </button>
            <p className="text-sm text-slate-500">{t("Nhấn để nghe lại", "Tap to listen again")}</p>
          </div>
        ) : q.type === "reverse" ? (
          <>
            <p className="text-xs text-slate-500 mb-2">{t("Nghĩa tiếng Việt:", "Vietnamese meaning:")}</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{q.prompt}</h3>
            <p className="text-sm text-slate-500">{t("Chọn từ tiếng Anh tương ứng:", "Pick the English word:")}</p>
          </>
        ) : q.type === "fillBlank" ? (
          <>
            <p className="text-xs text-slate-500 mb-2">{t("Điền từ thích hợp vào chỗ trống:", "Fill in the blank:")}</p>
            <p className="text-lg text-slate-900 dark:text-slate-100 italic leading-relaxed">{q.prompt}</p>
          </>
        ) : q.type === "scramble" ? (
          <>
            <p className="text-xs text-slate-500 mb-2">{t("Sắp xếp lại các chữ cái:", "Unscramble the letters:")}</p>
            <h3 className="text-3xl font-extrabold tracking-[0.4em] text-blue-600 uppercase mb-2">{q.prompt}</h3>
            <p className="text-sm text-slate-500 italic">{t("Gợi ý:", "Hint:")} {q.word.definition.vi}</p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{q.prompt}</h3>
              <button onClick={() => speak(q.word.word)} className="p-2 rounded-full hover:bg-blue-500/10">
                <Volume2 className="w-5 h-5 text-blue-600" />
              </button>
            </div>
            <p className="text-sm text-slate-500 font-mono mb-1">{q.word.ipa} · {q.word.wordClass}</p>
            {q.type === "meaningVi" && <p className="text-sm text-slate-500 mt-3">{t("Chọn nghĩa tiếng Việt:", "Choose the Vietnamese meaning:")}</p>}
            {q.type === "meaningEn" && <p className="text-sm text-slate-500 mt-3">{t("Chọn nghĩa tiếng Anh:", "Choose the English meaning:")}</p>}
            {q.type === "synonym" && <p className="text-sm text-slate-500 mt-3">{t("Chọn từ đồng nghĩa:", "Choose the synonym:")}</p>}
            {q.type === "collocation" && <p className="text-sm text-slate-500 mt-3">{t("Cụm từ nào đi kèm với từ này?", "Which collocation goes with it?")}</p>}
            {q.type === "wordClass" && <p className="text-sm text-slate-500 mt-3">{t("Đây là loại từ gì?", "What part of speech is this?")}</p>}
          </>
        )}
      </div>

      <div className="space-y-3">
        {q.options.map((opt, i) => {
          let cls = "border-sky-200 bg-white text-slate-800 hover:border-blue-500/50 dark:border-slate-600/50 dark:bg-[#1E293B]/60 dark:text-slate-200";
          if (selected !== null) {
            if (i === q.correct) cls = "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
            else if (i === selected) cls = "border-red-500 bg-red-500/10 text-red-700 dark:text-red-300";
          }
          return (
            <button
              key={i}
              disabled={selected !== null}
              onClick={() => handleSelect(i)}
              className={`w-full text-left p-4 rounded-xl border transition-all text-base ${cls}`}
            >
              {selected !== null && i === q.correct && <CheckCircle className="inline w-5 h-5 mr-2" />}
              {selected !== null && i === selected && i !== q.correct && <XCircle className="inline w-5 h-5 mr-2" />}
              {String.fromCharCode(65 + i)}. {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="mt-6 rounded-lg border border-blue-200 dark:border-slate-700 bg-blue-50/50 dark:bg-slate-900/40 p-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <p className="text-sm text-slate-700 dark:text-slate-300 italic">
              <strong className="text-slate-900 dark:text-white not-italic">{q.word.word}</strong> ({q.word.wordClass}) - {q.word.definition.vi}
            </p>
            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white">
              {current + 1 >= questions.length ? t("Xem kết quả", "See Results") : t("Câu tiếp", "Next")}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          {q.word.example && (
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 italic">
              <strong className="not-italic font-bold">E.g. </strong>{q.word.example}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// ── Main Page Component ──
const ToeicVocabulary = () => {
  const { t } = useLanguage();
  const [mode, setMode] = useState<"list" | "flashcard" | "exercise">("list");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLevel, setActiveLevel] = useState("All");
  const [sortBy, setSortBy] = useState<SortKey>("default");
  const [page, setPage] = useState(1);
  const { mastered, toggle: toggleMastered } = useMasteredVocab("toeic");

  // Flying stars animation: when user marks a word mastered, a star flies from the
  // star button toward the chibi climber, "feeding" it points.
  const [flyingStars, setFlyingStars] = useState<{ id: number; startX: number; startY: number }[]>([]);
  const starIdRef = useRef(0);

  const handleStarLanded = useCallback((id: number) => {
    setFlyingStars((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // Wrap toggle with motivation toast + mini confetti
  const toggleWithMotivation = useMasteredMotivation(mastered, toggleMastered);

  // Star click handler: launch a flying star from the clicked button toward the climber
  const handleStarClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, word: string) => {
      const isCurrentlyMastered = mastered.has(word);
      if (!isCurrentlyMastered) {
        const rect = e.currentTarget.getBoundingClientRect();
        const id = ++starIdRef.current;
        setFlyingStars((prev) => [
          ...prev,
          { id, startX: rect.left + rect.width / 2, startY: rect.top + rect.height / 2 },
        ]);
      }
      toggleWithMotivation(word);
    },
    [mastered, toggleWithMotivation]
  );

  // Filtered + sorted words
  const filtered = useMemo(() => {
    let result = toeicVocabData;
    if (activeCategory !== "All") result = result.filter((w) => w.category === activeCategory);
    if (activeLevel !== "All") result = result.filter((w) => w.level === activeLevel);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (w) =>
          w.word.toLowerCase().includes(q) ||
          w.definition.en.toLowerCase().includes(q) ||
          w.definition.vi.toLowerCase().includes(q) ||
          w.synonyms.some((s) => s.toLowerCase().includes(q)) ||
          w.collocations.some((c) => c.toLowerCase().includes(q))
      );
    }

    // Apply sorting (work on a copy to keep the source data untouched)
    const catOrder: Record<string, number> = Object.fromEntries(
      (TOEIC_CATEGORIES as readonly string[]).map((c, i) => [c, i])
    );
    if (sortBy !== "default") {
      result = [...result].sort((a, b) => {
        switch (sortBy) {
          case "az":
            return a.word.localeCompare(b.word);
          case "za":
            return b.word.localeCompare(a.word);
          case "easy":
            return (LEVEL_WEIGHT[a.level] ?? 99) - (LEVEL_WEIGHT[b.level] ?? 99) ||
              a.word.localeCompare(b.word);
          case "hard":
            return (LEVEL_WEIGHT[b.level] ?? 0) - (LEVEL_WEIGHT[a.level] ?? 0) ||
              a.word.localeCompare(b.word);
          case "mastered": {
            const am = mastered.has(a.word) ? 0 : 1;
            const bm = mastered.has(b.word) ? 0 : 1;
            return am - bm || a.word.localeCompare(b.word);
          }
          case "unmastered": {
            const am = mastered.has(a.word) ? 1 : 0;
            const bm = mastered.has(b.word) ? 1 : 0;
            return am - bm || a.word.localeCompare(b.word);
          }
          default:
            return 0;
        }
      });
    } else {
      // Default sort groups words by topic so each page is topic-coherent.
      result = [...result].sort((a, b) => {
        const ca = catOrder[a.category] ?? 99;
        const cb = catOrder[b.category] ?? 99;
        return ca - cb || a.word.localeCompare(b.word);
      });
    }


    return result;
  }, [activeCategory, activeLevel, search, sortBy, mastered]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / WORDS_PER_PAGE));
  const paged = filtered.slice((page - 1) * WORDS_PER_PAGE, page * WORDS_PER_PAGE);

  // Category stats
  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = { All: toeicVocabData.length };
    TOEIC_CATEGORIES.forEach((c) => {
      stats[c] = toeicVocabData.filter((w) => w.category === c).length;
    });
    return stats;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <Navbar />
      <StudyChibisStatic />
      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="flex gap-6">
        <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="mb-8">
          <Link to="/english" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-4 text-base">
            <ArrowLeft className="w-4 h-4" />
            {t("Chương trình Tiếng Anh", "English Program")}
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              📊 TOEIC Essential <span className="text-blue-600 dark:text-blue-400">Vocabulary</span>
            </h1>
            <p className="text-slate-700 dark:text-slate-400 text-lg max-w-3xl">
              {t(
                "500+ từ vựng thiết yếu cho kỳ thi TOEIC, được phân loại theo 10 chủ đề doanh nghiệp. Bao gồm phiên âm IPA, từ đồng nghĩa, cụm từ đi kèm và ví dụ thực tế.",
                "500+ essential business vocabulary for the TOEIC exam, organized by 10 professional categories. Includes IPA pronunciation, synonyms, collocations, and real-world examples."
              )}
            </p>
          </motion.div>
        </div>

        {/* TOEIC Career Climber – business-themed motivation */}
        <ToeicMountainClimber
          mastered={mastered.size}
          total={toeicVocabData.length}
          flyingStars={flyingStars}
          onStarLanded={handleStarLanded}
        />

        {/* Mode Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Tabs value={mode} onValueChange={(v) => setMode(v as any)}>
            <TabsList className="bg-white dark:bg-[#1E293B]/80 border border-sky-200 dark:border-slate-700/50 shadow-sm">
              <TabsTrigger value="list" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-600 dark:text-slate-400 gap-2 text-base">
                <List className="w-4 h-4" /> {t("Từ vựng", "Vocabulary")}
              </TabsTrigger>
              <TabsTrigger value="flashcard" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-600 dark:text-slate-400 gap-2 text-base">
                <Layers className="w-4 h-4" /> Flashcard
              </TabsTrigger>
              <TabsTrigger value="exercise" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-600 dark:text-slate-400 gap-2 text-base">
                <BookOpen className="w-4 h-4" /> {t("Luyện tập", "Practice")}
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Badge className="bg-blue-500/10 text-blue-300 border border-blue-500/30 text-base px-3 py-1">
            {filtered.length} {t("từ", "words")}
          </Badge>
        </div>

        {/* Filters */}
        {mode !== "exercise" && (
          <div className="space-y-3 mb-8">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder={t("Tìm từ vựng, nghĩa, từ đồng nghĩa...", "Search words, meanings, synonyms...")}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-[#1E293B]/80 border border-sky-200 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500/30 transition-colors text-base shadow-sm"
              />
            </div>

            {/* Compact dropdown row */}
            <div className="flex flex-wrap gap-3 items-end">
              {/* Level dropdown */}
              <label className="flex flex-col gap-1 min-w-[150px] flex-1 sm:flex-none">
                <span className="text-xs font-bold uppercase text-slate-600 dark:text-slate-300 tracking-wide">{t("Cấp độ", "Level")}</span>
                <select
                  value={activeLevel}
                  onChange={(e) => { setActiveLevel(e.target.value); setPage(1); }}
                  className="px-3 py-2 rounded-lg bg-white dark:bg-[#1E293B]/80 border border-sky-200 dark:border-slate-700/50 text-slate-900 dark:text-white font-semibold text-sm shadow-sm hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500/30 cursor-pointer"
                >
                  <option value="All">{t("Tất cả", "All")}</option>
                  {TOEIC_LEVELS.map(lvl => (
                    <option key={lvl} value={lvl}>{levelLabels[lvl]}</option>
                  ))}
                </select>
              </label>

              {/* Sort dropdown */}
              <label className="flex flex-col gap-1 min-w-[170px] flex-1 sm:flex-none">
                <span className="text-xs font-bold uppercase text-slate-600 dark:text-slate-300 tracking-wide">{t("Sắp xếp", "Sort")}</span>
                <select
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value as SortKey); setPage(1); }}
                  className="px-3 py-2 rounded-lg bg-white dark:bg-[#1E293B]/80 border border-emerald-200 dark:border-slate-700/50 text-slate-900 dark:text-white font-semibold text-sm shadow-sm hover:border-emerald-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-500/30 cursor-pointer"
                >
                  {[
                    { key: "default", vi: "Mặc định", en: "Default" },
                    { key: "az", vi: "A → Z", en: "A → Z" },
                    { key: "za", vi: "Z → A", en: "Z → A" },
                    { key: "easy", vi: "Dễ → Khó", en: "Easy → Hard" },
                    { key: "hard", vi: "Khó → Dễ", en: "Hard → Easy" },
                    { key: "mastered", vi: "Đã thuộc trước", en: "Mastered first" },
                    { key: "unmastered", vi: "Chưa thuộc trước", en: "Unmastered first" },
                  ].map(s => (
                    <option key={s.key} value={s.key}>{t(s.vi, s.en)}</option>
                  ))}
                </select>
              </label>

              {/* Category dropdown */}
              <label className="flex flex-col gap-1 min-w-[220px] flex-1">
                <span className="text-xs font-bold uppercase text-slate-600 dark:text-slate-300 tracking-wide">{t("Chủ đề", "Topic")}</span>
                <select
                  value={activeCategory}
                  onChange={(e) => { setActiveCategory(e.target.value); setPage(1); }}
                  className="px-3 py-2 rounded-lg bg-white dark:bg-[#1E293B]/80 border border-sky-200 dark:border-slate-700/50 text-slate-900 dark:text-white font-semibold text-sm shadow-sm hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-500/30 cursor-pointer"
                >
                  <option value="All">{t("Tất cả", "All")} ({categoryStats["All"]})</option>
                  {TOEIC_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat} ({categoryStats[cat]})</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          {mode === "list" && (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {paged.length === 0 ? (
                <div className="text-center py-16">
                  <Search className="mx-auto mb-4 w-12 h-12 text-slate-600" />
                  <p className="text-slate-400 text-lg">{t("Không tìm thấy từ vựng nào", "No vocabulary found")}</p>
                </div>
              ) : (() => {
                // Group paged words by category - section headers like IELTS/HSK/SAT
                const groups = paged.reduce<Record<string, ToeicWord[]>>((acc, w) => {
                  (acc[w.category] ||= []).push(w);
                  return acc;
                }, {});
                const orderedCats = (TOEIC_CATEGORIES as readonly string[]).filter(c => groups[c]);
                Object.keys(groups).forEach(c => { if (!orderedCats.includes(c)) orderedCats.push(c); });

                return (
                  <div className="space-y-10">
                    {orderedCats.map((cat, sectionIdx) => (
                      <motion.section
                        key={cat}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: sectionIdx * 0.05 }}
                      >
                        {/* Section header */}
                        <div className="flex items-center gap-3 mb-4 pb-2 border-b-2 border-sky-200 dark:border-sky-800">
                          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-200 dark:shadow-sky-900/40">
                            {categoryIcons[cat]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                              {cat}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {groups[cat].length} {t("từ trong trang này", "words on this page")}
                            </p>
                          </div>
                          <Badge className="bg-sky-100 text-sky-700 border border-sky-300 hidden sm:inline-flex">
                            {t("Chủ đề", "Topic")}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {groups[cat].map((w, i) => {
                            const isMastered = mastered.has(w.word);
                            return (
                              <motion.div
                                key={w.word + w.category}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.03 }}
                                className={`group relative rounded-xl border-2 p-6 shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl ${
                                  isMastered
                                    ? "border-amber-500 bg-gradient-to-br from-amber-50 via-yellow-50 to-white dark:from-amber-950/40 dark:via-slate-800 dark:to-slate-900 hover:shadow-amber-400/50"
                                    : "border-sky-400 bg-gradient-to-br from-white via-sky-50 to-blue-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 hover:border-blue-500 hover:shadow-blue-400/50"
                                }`}
                              >
                                {/* Star toggle (top-right) */}
                                <button
                                  onClick={(e) => handleStarClick(e, w.word)}
                                  className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-colors"
                                  aria-label={isMastered ? "Unmark mastered" : "Mark as mastered"}
                                  title={isMastered ? t("Đã thuộc – bỏ đánh dấu", "Mastered – click to unmark") : t("Đánh dấu đã thuộc", "Mark as mastered")}
                                >
                                  <Star
                                    className={`w-6 h-6 transition-all ${
                                      isMastered
                                        ? "fill-amber-400 text-amber-500 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                                        : "text-slate-400 hover:text-amber-400"
                                    }`}
                                  />
                                </button>

                                {/* Word header */}
                                <div className="flex items-start justify-between mb-3 pr-10">
                                  <div>
                                    <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">{w.word}</h3>
                                    <p className="text-sm text-blue-800 dark:text-blue-200/70 font-mono font-bold">{w.ipa}</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge className={`${wordClassColors[w.wordClass]} border text-xs font-bold uppercase`}>{w.wordClass}</Badge>
                                    <button onClick={() => speak(w.word)} className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-500/15 transition-colors">
                                      <Volume2 className="w-5 h-5 text-blue-700 dark:text-blue-300" />
                                    </button>
                                  </div>
                                </div>

                                {/* Level & category */}
                                <div className="flex items-center gap-2 mb-3">
                                  <Badge className={`${levelColors[w.level]} border text-xs`}>{levelLabels[w.level]}</Badge>
                                  <span className="text-xs text-slate-800 dark:text-slate-400 font-semibold flex items-center gap-1">
                                    {categoryIcons[w.category]}
                                    {w.category}
                                  </span>
                                </div>

                                {/* Definition */}
                                <p className="text-base text-slate-950 dark:text-[#f8fafc] font-bold mb-1">{w.definition.en}</p>
                                <p className="text-base text-blue-900 dark:text-[#93c5fd] font-bold mb-3">{w.definition.vi}</p>

                                {/* Example */}
                                <p className="text-sm text-slate-900 dark:text-[#cbd5e1] italic font-medium mb-2">
                                  <span className="not-italic font-extrabold text-blue-800 dark:text-blue-300">E.g. </span>
                                  {highlightKeyword(w.example, w.word)}
                                </p>
                                <TypePractice example={w.example} t={t} />

                                {/* Synonyms */}
                                {w.synonyms.length > 0 && (
                                  <div className="mb-2">
                                    <span className="text-xs text-slate-700 dark:text-slate-400 uppercase font-extrabold">Synonyms: </span>
                                    <span className="text-sm text-slate-900 dark:text-[#cbd5e1] font-semibold">{w.synonyms.join(", ")}</span>
                                  </div>
                                )}

                                {/* Collocations */}
                                {w.collocations.length > 0 && (
                                  <div>
                                    <span className="text-xs text-slate-700 dark:text-slate-400 uppercase font-extrabold">Collocations: </span>
                                    <span className="text-sm text-blue-900 dark:text-[#93c5fd] font-semibold">{w.collocations.join(" · ")}</span>
                                  </div>
                                )}
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.section>
                    ))}
                  </div>
                );
              })()}


              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <Button
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 shadow-md disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-slate-700 dark:text-slate-300 font-semibold text-base">{page}/{totalPages}</span>
                  <Button
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 shadow-md disabled:opacity-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {mode === "flashcard" && (
            <motion.div key="flashcard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {filtered.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-slate-400 text-lg">{t("Không có từ vựng nào", "No vocabulary found")}</p>
                </div>
              ) : (() => {
                const groups = paged.reduce<Record<string, ToeicWord[]>>((acc, w) => {
                  (acc[w.category] ||= []).push(w);
                  return acc;
                }, {});
                const orderedCats = (TOEIC_CATEGORIES as readonly string[]).filter(c => groups[c]);
                Object.keys(groups).forEach(c => { if (!orderedCats.includes(c)) orderedCats.push(c); });
                return (
                  <div className="space-y-10">
                    {orderedCats.map((cat, sectionIdx) => (
                      <motion.section
                        key={cat}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: sectionIdx * 0.05 }}
                      >
                        <div className="flex items-center gap-3 mb-4 pb-2 border-b-2 border-sky-200 dark:border-sky-800">
                          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-200 dark:shadow-sky-900/40">
                            {categoryIcons[cat]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-tight">{cat}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {groups[cat].length} {t("từ trong trang này", "words on this page")}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                          {groups[cat].map((w) => (
                            <Flashcard key={w.word + w.category} word={w} />
                          ))}
                        </div>
                      </motion.section>
                    ))}
                  </div>
                );
              })()}

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <Button size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 shadow-md disabled:opacity-50">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-slate-700 dark:text-slate-300 font-semibold text-base">{page}/{totalPages}</span>
                  <Button size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 shadow-md disabled:opacity-50">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {mode === "exercise" && (
            <motion.div key="exercise" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <VocabExercise words={filtered} t={t} />
            </motion.div>
          )}
        </AnimatePresence>
        </div>
        <div className="hidden lg:block w-72 flex-shrink-0 self-start space-y-4">
          <VocabMasteryLeaderboard subject="toeic" currentCount={mastered.size} />
          <WeeklyVocabAchievers subject="toeic" threshold={20} />
          <SmartReviewColumn
            subject="toeic"
            lang="en-US"
            lookupWord={(w) => {
              const found = toeicVocabData.find(x => x.word === w);
              if (!found) return null;
              return {
                word: found.word,
                phonetic: found.ipa,
                definitionVi: found.definition.vi,
                definitionEn: found.definition.en,
              };
            }}
            allWordsForQuiz={toeicVocabData.map(w => ({ word: w.word, definition: w.definition.vi }))}
          />
        </div>
        </div>
        <div className="lg:hidden mt-6 px-4 space-y-4">
          <VocabMasteryLeaderboard subject="toeic" currentCount={mastered.size} />
          <WeeklyVocabAchievers subject="toeic" threshold={20} />
          <SmartReviewColumn
            subject="toeic"
            lang="en-US"
            lookupWord={(w) => {
              const found = toeicVocabData.find(x => x.word === w);
              if (!found) return null;
              return {
                word: found.word,
                phonetic: found.ipa,
                definitionVi: found.definition.vi,
                definitionEn: found.definition.en,
              };
            }}
            allWordsForQuiz={toeicVocabData.map(w => ({ word: w.word, definition: w.definition.vi }))}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ToeicVocabulary;
