// Vietnamese Vocabulary Bank — mirrors the IELTS vocab page format.
// Provides list / flashcard / practice modes, search, level + category filters,
// mastered tracking with leaderboard, Vietnamese TTS playback.
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Volume2, VolumeX, ChevronLeft, ChevronRight, Layers, List,
  Star, RotateCcw, BookOpen, CheckCircle, XCircle, ArrowLeft,
} from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMasteredVocab } from "@/hooks/useMasteredVocab";
import { useMasteredMotivation } from "@/hooks/useMasteredMotivation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameLeaderboard from "@/components/games/GameLeaderboard";
import VocabMasteryLeaderboard from "@/components/VocabMasteryLeaderboard";
import StudyStreakLeaderboard from "@/components/StudyStreakLeaderboard";
import { supabase } from "@/integrations/supabase/client";
import { playVietnameseTts, stopVietnameseTts } from "@/lib/vietnameseTts";
import {
  vietnameseVocabBank,
  VIETNAMESE_BANK_LEVELS,
  VIETNAMESE_BANK_CATEGORIES,
  type VietnameseBankWord,
} from "@/data/vietnamese/vocabularyBank";

const WORDS_PER_PAGE = 12;

const levelColors: Record<string, string> = {
  beginner: "bg-green-500/20 text-green-700 dark:text-green-300",
  intermediate: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  advanced: "bg-purple-500/20 text-purple-700 dark:text-purple-300",
};
const levelLabel = (lv: string, isEn: boolean) => {
  if (lv === "beginner") return isEn ? "Beginner" : "Cơ bản";
  if (lv === "intermediate") return isEn ? "Intermediate" : "Trung cấp";
  return isEn ? "Advanced" : "Nâng cao";
};

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ── Vietnamese audio button ──
const SpeakBtn = ({ text, size = 16 }: { text: string; size?: number }) => {
  const [playing, setPlaying] = useState(false);
  const play = async () => {
    if (playing) return;
    setPlaying(true);
    try { await playVietnameseTts(text, { playbackRate: 0.9, speechRate: 0.55, pitch: 1.05 }); }
    finally { setPlaying(false); }
  };
  return (
    <button
      onClick={play}
      className="rounded-md p-1 transition-colors hover:bg-primary/10"
      aria-label="Phát âm"
    >
      {playing
        ? <VolumeX size={size} className="text-primary" />
        : <Volume2 size={size} className="text-muted-foreground" />}
    </button>
  );
};

// ── Flashcard with synced audio (auto-plays word when flipped to back) ──
const Flashcard = ({ word }: { word: VietnameseBankWord }) => {
  const [flipped, setFlipped] = useState(false);

  // Stop any pending TTS when card unmounts or flips
  useEffect(() => () => { stopVietnameseTts(); }, []);

  const handleFlip = () => {
    stopVietnameseTts();
    const next = !flipped;
    setFlipped(next);
    // Auto-play the Vietnamese word when revealing the answer side
    if (next) {
      void playVietnameseTts(word.word, { playbackRate: 0.9, speechRate: 0.55, pitch: 1.05 });
    }
  };

  return (
    <div className="cursor-pointer" onClick={handleFlip}>
      {!flipped ? (
        <motion.div
          key="front"
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
          className="rounded-xl bg-white dark:bg-card flex flex-col items-center justify-center gap-3 p-8 border-2 border-border shadow-sm"
          style={{ minHeight: "13rem" }}
        >
          <h3 className="font-extrabold text-2xl text-foreground">{word.word}</h3>
          {word.ipa && <p className="font-mono text-sm text-muted-foreground">/{word.ipa}/</p>}
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            <Badge className={levelColors[word.level]}>{levelLabel(word.level, false)}</Badge>
            {word.partOfSpeech && <Badge variant="secondary" className="text-xs italic">{word.partOfSpeech}</Badge>}
          </div>
          <div onClick={e => e.stopPropagation()}>
            <SpeakBtn text={word.word} size={20} />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="back"
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
          className="rounded-xl bg-white dark:bg-card flex flex-col justify-center gap-2 p-6 border-2 border-border shadow-sm"
          style={{ minHeight: "13rem" }}
        >
          <div className="flex items-center gap-2">
            <p className="font-bold text-blue-700 dark:text-blue-300 text-lg flex-1">{word.meaning}</p>
            <div onClick={e => e.stopPropagation()}>
              <SpeakBtn text={word.word} size={18} />
            </div>
          </div>
          <p className="text-sm text-foreground">{word.meaningEn}</p>
          <div className="flex items-start gap-2 mt-2">
            <p className="italic text-sm text-foreground/80 flex-1">
              <span className="not-italic font-bold text-primary">VD: </span>{word.example}
            </p>
            <div onClick={e => e.stopPropagation()}>
              <SpeakBtn text={word.example} size={16} />
            </div>
          </div>
          {word.exampleEn && <p className="text-xs text-muted-foreground italic">{word.exampleEn}</p>}
          <Badge variant="outline" className="w-fit mt-1 text-xs">{word.category}</Badge>
        </motion.div>
      )}
    </div>
  );
};

// ── Practice quiz (meaning / reverse / listening / fill-blank) ──
type ExType = "meaning" | "reverse" | "listening" | "fillBlank";
interface ExQ { type: ExType; word: VietnameseBankWord; prompt: string; options: string[]; correct: number; }

const buildQuiz = (words: VietnameseBankWord[], pool: VietnameseBankWord[], size = 12): ExQ[] => {
  const picked = shuffle(words).slice(0, size);
  return picked.map((w, i) => {
    const distractors = shuffle(pool.filter(x => x.word !== w.word));
    const candidates: ExType[] = ["meaning", "reverse", "listening"];
    if (w.example && w.example.toLowerCase().includes(w.word.toLowerCase())) candidates.push("fillBlank");
    const type = candidates[i % candidates.length];

    if (type === "reverse") {
      const wrongs = distractors.slice(0, 3).map(x => x.word);
      const opts = shuffle([w.word, ...wrongs]);
      return { type, word: w, prompt: w.meaning, options: opts, correct: opts.indexOf(w.word) };
    }
    if (type === "listening") {
      const wrongs = distractors.slice(0, 3).map(x => x.word);
      const opts = shuffle([w.word, ...wrongs]);
      return { type, word: w, prompt: w.word, options: opts, correct: opts.indexOf(w.word) };
    }
    if (type === "fillBlank") {
      const re = new RegExp(w.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig");
      const blanked = w.example.replace(re, "_____");
      const wrongs = distractors.slice(0, 3).map(x => x.word);
      const opts = shuffle([w.word, ...wrongs]);
      return { type, word: w, prompt: blanked, options: opts, correct: opts.indexOf(w.word) };
    }
    const wrongs = distractors.slice(0, 3).map(x => x.meaning);
    const opts = shuffle([w.meaning, ...wrongs]);
    return { type: "meaning", word: w, prompt: w.word, options: opts, correct: opts.indexOf(w.meaning) };
  });
};

const TYPE_LABELS: Record<ExType, { vi: string; en: string; emoji: string }> = {
  meaning: { vi: "Chọn nghĩa đúng", en: "Choose meaning", emoji: "🎯" },
  reverse: { vi: "Chọn từ theo nghĩa", en: "Pick the word", emoji: "🔁" },
  listening: { vi: "Nghe và chọn từ", en: "Listen & choose", emoji: "🎧" },
  fillBlank: { vi: "Điền từ vào chỗ trống", en: "Fill in the blank", emoji: "✏️" },
};

const VocabExercise = ({ words, pool, t }: {
  words: VietnameseBankWord[];
  pool: VietnameseBankWord[];
  t: (vi: string, en: string) => string;
}) => {
  const [questions, setQuestions] = useState<ExQ[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [quizSize, setQuizSize] = useState(12);
  const savedRef = useRef(false);

  const generate = useCallback(() => {
    if (words.length < 4) return;
    const size = Math.min(quizSize, words.length);
    setQuestions(buildQuiz(words, pool.length > 4 ? pool : words, size));
    setCurrent(0); setSelected(null); setScore(0); setFinished(false);
    savedRef.current = false;
  }, [words, pool, quizSize]);

  useEffect(() => { generate(); }, [generate]);

  // Stop any audio when component unmounts
  useEffect(() => () => { stopVietnameseTts(); }, []);

  // Auto-play the target word when a new question appears (especially for listening)
  useEffect(() => {
    if (finished) return;
    const q = questions[current];
    if (!q) return;
    stopVietnameseTts();
    if (q.type === "listening") {
      // small delay so the UI swap doesn't clip the audio start
      const id = setTimeout(() => {
        void playVietnameseTts(q.word.word, { playbackRate: 0.85, speechRate: 0.55, pitch: 1.05 });
      }, 250);
      return () => clearTimeout(id);
    }
  }, [current, questions, finished]);

  useEffect(() => {
    if (!finished || savedRef.current) return;
    savedRef.current = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await (supabase as any).from("game_scores").insert({
          user_id: user.id, score, game_type: "vocab-vietnamese", max_streak: 0,
          accuracy: questions.length > 0 ? Math.round((score / questions.length) * 100) : 0,
        });
      }
    })();
  }, [finished, score, questions.length]);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const q = questions[current];
    if (idx === q?.correct) setScore(s => s + 1);
    // After answering, play the correct word so learners hear the right pronunciation
    if (q && q.type !== "listening") {
      void playVietnameseTts(q.word.word, { playbackRate: 0.9, speechRate: 0.55, pitch: 1.05 });
    }
  };
  const handleNext = () => {
    stopVietnameseTts();
    if (current + 1 >= questions.length) setFinished(true);
    else { setCurrent(c => c + 1); setSelected(null); }
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
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">{score >= questions.length * 0.8 ? "🏆" : score >= questions.length * 0.5 ? "👍" : "💪"}</div>
        <h3 className="text-2xl font-bold text-foreground mb-2">{score}/{questions.length}</h3>
        <p className="text-muted-foreground mb-6">
          {score >= questions.length * 0.8
            ? t("Xuất sắc! Bạn nắm vững từ vựng rất tốt!", "Excellent! You've mastered these words!")
            : score >= questions.length * 0.5
              ? t("Khá tốt! Hãy tiếp tục ôn luyện.", "Good job! Keep practicing.")
              : t("Cần ôn thêm. Hãy thử lại nhé!", "Needs more review. Try again!")}
        </p>
        <Button onClick={generate} className="gap-2 mb-6">
          <RotateCcw className="w-4 h-4" /> {t("Làm lại", "Try Again")}
        </Button>
        <div className="w-full max-w-sm">
          <GameLeaderboard gameType="vocab-vietnamese" currentScore={score} />
        </div>
      </div>
    );
  }

  const q = questions[current];
  if (!q) return null;
  const label = TYPE_LABELS[q.type];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <label className="text-muted-foreground">{t("Số câu hỏi:", "Questions:")}</label>
          <select
            value={quizSize}
            onChange={e => setQuizSize(Number(e.target.value))}
            className="rounded-md border border-border bg-card px-2 py-1 text-sm"
          >
            {[5, 10, 12, 15, 20, 30, 50].map(n => (
              <option key={n} value={n} disabled={n > words.length && n !== 5}>
                {n} {n > words.length ? `(${t("chỉ có", "only")} ${words.length})` : ""}
              </option>
            ))}
          </select>
          <Button size="sm" variant="outline" onClick={generate} className="ml-2">
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
            <button
              onClick={() => playVietnameseTts(q.word.word, { playbackRate: 0.9, speechRate: 0.55, pitch: 1.05 })}
              className="p-6 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <Volume2 className="w-10 h-10 text-primary" />
            </button>
            <p className="text-sm text-muted-foreground">{t("Nhấn để nghe lại", "Tap to listen again")}</p>
          </div>
        ) : q.type === "reverse" ? (
          <>
            <p className="text-xs text-muted-foreground mb-2">{t("Nghĩa:", "Meaning:")}</p>
            <h3 className="text-2xl font-bold text-foreground mb-2">{q.prompt}</h3>
            <p className="text-sm text-muted-foreground">{t("Chọn từ tiếng Việt tương ứng:", "Pick the matching Vietnamese word:")}</p>
          </>
        ) : q.type === "fillBlank" ? (
          <>
            <p className="text-xs text-muted-foreground mb-2">{t("Điền từ thích hợp vào chỗ trống:", "Fill in the blank:")}</p>
            <p className="text-lg text-foreground italic leading-relaxed">{q.prompt}</p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-3xl font-bold text-foreground">{q.word.word}</h3>
              <SpeakBtn text={q.word.word} size={20} />
            </div>
            {q.word.ipa && <p className="text-sm text-muted-foreground font-mono mb-1">/{q.word.ipa}/</p>}
            <p className="text-sm text-muted-foreground mt-3">{t("Chọn nghĩa đúng:", "Choose the correct meaning:")}</p>
          </>
        )}
      </div>
      <div className="space-y-3">
        {q.options.map((opt, idx) => {
          let cls = "rounded-xl border p-4 cursor-pointer transition-all text-sm text-foreground ";
          if (selected !== null) {
            if (idx === q.correct) cls += "border-green-500 bg-green-500/10 ";
            else if (idx === selected) cls += "border-red-500 bg-red-500/10 ";
            else cls += "border-border bg-card opacity-50 ";
          } else cls += "border-border bg-card hover:border-primary/40 ";
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
      {selected !== null && (
        <div className="flex justify-between items-center mt-6 gap-3 flex-wrap">
          <p className="text-sm text-muted-foreground italic">
            <strong className="text-foreground not-italic">{q.word.word}</strong> — {q.word.meaning}
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

const VietnameseVocabulary = () => {
  const { t, lang } = useLanguage();
  const isEn = lang === "en";
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "flashcard" | "exercise">("list");
  const { mastered, toggle } = useMasteredVocab("vietnamese");
  const handleMastered = useMasteredMotivation(mastered, toggle);

  const filtered = useMemo(() => {
    let words = vietnameseVocabBank;
    if (search) {
      const q = search.toLowerCase();
      words = words.filter(w =>
        w.word.toLowerCase().includes(q) ||
        w.meaning.toLowerCase().includes(q) ||
        (w.meaningEn || "").toLowerCase().includes(q)
      );
    }
    if (levelFilter !== "all") words = words.filter(w => w.level === levelFilter);
    if (categoryFilter !== "all") words = words.filter(w => w.category === categoryFilter);
    return words;
  }, [search, levelFilter, categoryFilter]);

  const totalPages = Math.ceil(filtered.length / WORDS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * WORDS_PER_PAGE, page * WORDS_PER_PAGE);

  useEffect(() => setPage(1), [search, levelFilter, categoryFilter]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`Từ Vựng Tiếng Việt – Ngân hàng ${vietnameseVocabBank.length}+ từ | HaiEduTech`}
        description="Ngân hàng từ vựng tiếng Việt theo chủ đề & cấp độ: tra cứu, flashcard, luyện tập, phát âm chuẩn."
        path="/learn-vietnamese/vocabulary"
      />
      <Navbar />
      <div className="pt-24 lg:pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <RouterLink to="/learn-vietnamese" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="w-4 h-4" />
            {t("Quay lại Học tiếng Việt", "Back to Learn Vietnamese")}
          </RouterLink>
          <div className="flex gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 min-w-0">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                  {t("Từ vựng Tiếng Việt", "Vietnamese Vocabulary")}{" "}
                  <span className="text-gradient">{t("Ngân hàng từ", "Word Bank")}</span>
                </h1>
                <p className="text-muted-foreground">
                  {t(
                    `${vietnameseVocabBank.length} từ vựng theo chủ đề - Tra cứu, flashcard, luyện tập, phát âm`,
                    `${vietnameseVocabBank.length} themed words - Search, flashcards, practice, pronunciation`
                  )}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
                  <span className="text-muted-foreground">{t("Đã thuộc", "Mastered")}: <strong className="text-primary">{mastered.size}</strong></span>
                  <span className="text-muted-foreground">{t("Cần ôn", "Need Review")}: <strong className="text-orange-500">{Math.max(0, vietnameseVocabBank.length - mastered.size)}</strong></span>
                </div>
              </div>

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
                  {VIETNAMESE_BANK_LEVELS.map(l => (
                    <option key={l} value={l}>{levelLabel(l, isEn)}</option>
                  ))}
                </select>
                <select
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none max-w-[220px]"
                >
                  <option value="all">{t("Tất cả chủ đề", "All Topics")}</option>
                  {VIETNAMESE_BANK_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <Tabs value={viewMode} onValueChange={v => setViewMode(v as any)}>
                  <TabsList>
                    <TabsTrigger value="list" className="gap-1.5 px-4"><List className="w-4 h-4" /> {t("Từ vựng", "Vocabulary")}</TabsTrigger>
                    <TabsTrigger value="flashcard" className="gap-1.5 px-4"><Layers className="w-4 h-4" /> Flashcard</TabsTrigger>
                    <TabsTrigger value="exercise" className="gap-1.5 px-4"><BookOpen className="w-4 h-4" /> {t("Luyện tập", "Practice")}</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <p className="text-xs text-muted-foreground mb-4">{filtered.length} {t("kết quả", "results")}</p>

              {viewMode === "exercise" ? (
                <VocabExercise
                  words={vietnameseVocabBank.filter(w => mastered.has(w.word))}
                  pool={vietnameseVocabBank}
                  t={t}
                />
              ) : (() => {
                const groups = paginated.reduce<Record<string, VietnameseBankWord[]>>((acc, w) => {
                  (acc[w.category] ||= []).push(w);
                  return acc;
                }, {});
                const orderedCats = Object.keys(groups);

                return (
                  <div className="space-y-8">
                    {orderedCats.map(cat => (
                      <section key={cat}>
                        <div className="flex items-baseline gap-3 mb-3 border-b border-border/60 pb-1.5">
                          <h3 className="text-lg font-bold text-primary">{cat}</h3>
                          <span className="text-xs text-muted-foreground">{groups[cat].length} {t("từ", "words")}</span>
                        </div>

                        {viewMode === "flashcard" ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            <AnimatePresence mode="popLayout">
                              {groups[cat].map(w => (
                                <motion.div key={w.word + w.lessonId} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                                  <Flashcard word={w} />
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {groups[cat].map(w => (
                              <motion.div
                                key={w.word + w.lessonId}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group min-w-0 h-full rounded-xl bg-white dark:bg-card hover:shadow-lg transition-all duration-300 p-4 border-2 border-border"
                                style={{ borderColor: "hsl(var(--primary) / 0.35)" }}
                              >
                                <div className="mb-1.5 flex items-start gap-2">
                                  <div className="min-w-0 flex-1">
                                    <h4 className="break-words font-extrabold text-foreground" style={{ fontSize: "1.2rem", lineHeight: 1.25 }}>
                                      <span className="text-emerald-700 dark:text-emerald-400">{w.word}</span>
                                    </h4>
                                    {w.ipa && <p className="font-mono text-xs text-muted-foreground mt-0.5">/{w.ipa}/</p>}
                                    <div className="mt-1 flex items-center gap-0.5">
                                      <SpeakBtn text={w.word} size={16} />
                                      <motion.button
                                        onClick={() => handleMastered(w.word)}
                                        className="rounded-md p-1 transition-colors hover:bg-yellow-500/10"
                                        whileTap={{ scale: 1.4 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        aria-label="Đánh dấu đã thuộc"
                                      >
                                        <Star
                                          size={16}
                                          className={mastered.has(w.word)
                                            ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]"
                                            : "text-muted-foreground"}
                                        />
                                      </motion.button>
                                    </div>
                                  </div>
                                </div>

                                <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                                  <Badge className={levelColors[w.level] + " text-[10px] px-1.5 py-0"}>
                                    {levelLabel(w.level, isEn)}
                                  </Badge>
                                  {w.partOfSpeech && <Badge variant="secondary" className="text-[10px] px-1.5 py-0 italic">{w.partOfSpeech}</Badge>}
                                </div>

                                <p className="break-words font-bold text-blue-700 dark:text-blue-300" style={{ fontSize: "1rem", lineHeight: 1.45 }}>
                                  {w.meaning}
                                </p>
                                {w.meaningEn && (
                                  <p className="mt-0.5 break-words text-foreground/80" style={{ fontSize: "0.88rem", lineHeight: 1.45 }}>
                                    {w.meaningEn}
                                  </p>
                                )}

                                <p className="mt-1.5 break-words italic text-foreground/90" style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>
                                  <span className="font-bold not-italic text-primary">VD: </span>
                                  {w.example.split(new RegExp(`(${w.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig")).map((part, i) =>
                                    part.toLowerCase() === w.word.toLowerCase()
                                      ? <strong key={i} className="font-extrabold not-italic text-foreground">{part}</strong>
                                      : <span key={i}>{part}</span>
                                  )}
                                </p>
                                {w.exampleEn && (
                                  <p className="mt-0.5 break-words italic text-xs text-muted-foreground">{w.exampleEn}</p>
                                )}
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </section>
                    ))}
                  </div>
                );
              })()}

              {viewMode !== "exercise" && totalPages > 1 && (
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
              <VocabMasteryLeaderboard subject="vietnamese" currentCount={mastered.size} />
              <StudyStreakLeaderboard />
            </div>
          </div>

          <div className="lg:hidden mt-6 space-y-4">
            <VocabMasteryLeaderboard subject="vietnamese" currentCount={mastered.size} />
            <StudyStreakLeaderboard />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VietnameseVocabulary;
