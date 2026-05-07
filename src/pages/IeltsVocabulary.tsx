import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Volume2, ChevronLeft, ChevronRight, Layers, List, Star, RotateCcw, BookOpen, CheckCircle, XCircle, Link, Copy, Keyboard } from "lucide-react";
import VocabIllustration from "@/components/VocabIllustration";
import { useMasteredMotivation } from "@/hooks/useMasteredMotivation";
import { useLanguage } from "@/contexts/LanguageContext";
import { ieltsVocabData, IELTS_CATEGORIES, CEFR_LEVELS, type IeltsWord } from "@/data/ieltsVocabData";
import MountainClimber from "@/components/MountainClimber";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameLeaderboard from "@/components/games/GameLeaderboard";
import VocabMasteryLeaderboard, { syncMasteredCount } from "@/components/VocabMasteryLeaderboard";
import StudyStreakLeaderboard from "@/components/StudyStreakLeaderboard";
import { supabase } from "@/integrations/supabase/client";

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

// Text-to-Speech helper
const speak = (text: string) => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  }
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

// Flashcard component
// Flashcard component - auto-height, no internal scrollbar, high-contrast text
const Flashcard = ({ word }: { word: IeltsWord }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="cursor-pointer" onClick={() => setFlipped(!flipped)}>
      {!flipped ? (
        <motion.div
          key="front"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="rounded-xl bg-white dark:bg-card flex flex-col items-center justify-center gap-3"
          style={{ padding: "2rem", border: "2px solid #f1f5f9", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", minHeight: "14rem" }}
        >
          <VocabIllustration word={word.word} definition={word.definition.en} category={word.category} size={80} />
          <h3 className="font-extrabold" style={{ fontSize: "1.5rem", color: "#111827" }}>{word.word}</h3>
          <p className="font-mono" style={{ fontSize: "0.875rem", color: "#4b5563" }}>{word.ipa}</p>
          <div className="flex items-center gap-1.5">
            <Badge className={levelColors[word.level]}>{word.level}</Badge>
            {word.partOfSpeech && <Badge variant="secondary" className="text-xs italic">{word.partOfSpeech}</Badge>}
          </div>
          <button onClick={(e) => { e.stopPropagation(); speak(word.word); }} className="mt-2 p-2 rounded-full hover:bg-primary/10 transition-colors">
            <Volume2 size={20} style={{ color: "#4b5563" }} />
          </button>
        </motion.div>
      ) : (
        <motion.div
          key="back"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="rounded-xl bg-white dark:bg-card flex flex-col justify-center gap-2"
          style={{ padding: "2rem", border: "2px solid #f1f5f9", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", minHeight: "14rem" }}
        >
          <p className="font-semibold break-words" style={{ fontSize: "1rem", color: "#374151", lineHeight: 1.6 }}>{word.definition.en}</p>
          <p className="font-bold break-words" style={{ fontSize: "1.1875rem", color: "#1d4ed8", lineHeight: 1.6 }}>{word.definition.vi}</p>
          <p className="italic mt-1 break-words" style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.6 }}><span className="font-semibold not-italic" style={{ color: "#1d4ed8" }}>E.g. </span>{word.example}</p>
          {word.synonyms && word.synonyms.length > 0 && (
            <div className="mt-2 rounded-md" style={{ backgroundColor: "#ecfdf5", padding: "0.5rem 0.75rem" }}>
              <p className="break-words" style={{ fontSize: "0.875rem", color: "#065f46", lineHeight: 1.6 }}>
                <span className="font-semibold">Syn: </span>{word.synonyms.join(" • ")}
              </p>
            </div>
          )}
          <Badge variant="outline" className="w-fit mt-1 text-xs">{word.category}</Badge>
        </motion.div>
      )}
    </div>
  );
};

// ── Inline Type-the-example widget (always visible per word card) ──
const normalizeText = (s: string) =>
  s.toLowerCase().replace(/[.,!?;:"'()]/g, "").replace(/\s+/g, " ").trim();

const InlineTypeExample = ({ word, t }: { word: IeltsWord; t: (vi: string, en: string) => string }) => {
  const [input, setInput] = useState("");
  const [revealed, setRevealed] = useState(false);
  if (!word.example) return null;
  const target = word.example;
  const isCorrect = revealed && normalizeText(input) === normalizeText(target);
  const reset = () => { setInput(""); setRevealed(false); };

  return (
    <div className="mt-4 pt-3 border-t border-border/60">
      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary mb-2">
        <Keyboard className="w-3.5 h-3.5" />
        {t("Gõ lại câu ví dụ", "Type the example")}
      </div>
      <div className="space-y-2">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={revealed}
          rows={2}
          placeholder={t("Gõ lại câu ví dụ…", "Type the example sentence…")}
          className="w-full p-3 rounded-lg border-2 border-border bg-background text-foreground focus:border-primary/60 focus:outline-none text-sm leading-relaxed disabled:opacity-70"
        />
        <div className="flex items-center justify-between gap-2">
          {!revealed ? (
            <Button size="sm" onClick={() => setRevealed(true)} disabled={input.trim().length === 0}>
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
                <><XCircle className="w-4 h-4 text-orange-600" /><span className="text-orange-700 dark:text-orange-400">{t("Gần đúng — đối chiếu lại nhé.", "Close — compare with the original.")}</span></>
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
type ExType = "meaning" | "reverse" | "fillBlank" | "synonym" | "listening";

interface ExQuestion {
  type: ExType;
  word: IeltsWord;
  prompt: string;
  options: string[];
  correct: number;
  hint?: string;
}

const buildQuestions = (words: IeltsWord[], allWords: IeltsWord[]): ExQuestion[] => {
  const QUIZ_SIZE = 12;
  const distractorPool = allWords.length > 4 ? allWords : words;
  const picked = shuffle(words).slice(0, QUIZ_SIZE);

  return picked.map((w, idx) => {
    // Cycle through available types based on word data
    const candidates: ExType[] = ["meaning", "reverse", "listening"];
    if (w.example && w.example.toLowerCase().includes(w.word.toLowerCase())) candidates.push("fillBlank");
    if (w.synonyms && w.synonyms.length > 0) candidates.push("synonym");
    const type = candidates[idx % candidates.length];

    if (type === "reverse") {
      // Show Vietnamese meaning, pick the right English word
      const wrongs = shuffle(distractorPool.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.word);
      const opts = shuffle([w.word, ...wrongs]);
      return {
        type, word: w,
        prompt: w.definition.vi,
        options: opts,
        correct: opts.indexOf(w.word),
      };
    }
    if (type === "fillBlank") {
      const re = new RegExp(w.word, "ig");
      const blanked = w.example.replace(re, "_____");
      const wrongs = shuffle(distractorPool.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.word);
      const opts = shuffle([w.word, ...wrongs]);
      return {
        type, word: w,
        prompt: blanked,
        options: opts,
        correct: opts.indexOf(w.word),
      };
    }
    if (type === "synonym") {
      const correctSyn = w.synonyms![0];
      const synPool = allWords.filter(x => x.word !== w.word).flatMap(x => x.synonyms || []);
      const wrongs = shuffle(synPool.filter(s => s !== correctSyn)).slice(0, 3);
      while (wrongs.length < 3) wrongs.push(shuffle(distractorPool)[0].word);
      const opts = shuffle([correctSyn, ...wrongs]);
      return {
        type, word: w,
        prompt: w.word,
        options: opts,
        correct: opts.indexOf(correctSyn),
      };
    }
    if (type === "listening") {
      const wrongs = shuffle(distractorPool.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.word);
      const opts = shuffle([w.word, ...wrongs]);
      return {
        type, word: w,
        prompt: w.word, // played via TTS
        options: opts,
        correct: opts.indexOf(w.word),
      };
    }
    // Default: meaning
    const wrongs = shuffle(distractorPool.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.definition.en);
    const opts = shuffle([w.definition.en, ...wrongs]);
    return {
      type: "meaning", word: w,
      prompt: w.word,
      options: opts,
      correct: opts.indexOf(w.definition.en),
    };
  });
};

const TYPE_LABELS: Record<ExType, { vi: string; en: string; emoji: string }> = {
  meaning: { vi: "Chọn nghĩa đúng", en: "Choose meaning", emoji: "🎯" },
  reverse: { vi: "Chọn từ đúng theo nghĩa tiếng Việt", en: "Pick the English word", emoji: "🔁" },
  fillBlank: { vi: "Điền từ vào chỗ trống", en: "Fill in the blank", emoji: "✏️" },
  synonym: { vi: "Chọn từ đồng nghĩa", en: "Pick the synonym", emoji: "🔗" },
  listening: { vi: "Nghe và chọn từ", en: "Listen & choose", emoji: "🎧" },
};

const VocabExercise = ({ words, allWords, t }: { words: IeltsWord[]; allWords?: IeltsWord[]; t: (vi: string, en: string) => string }) => {
  const [questions, setQuestions] = useState<ExQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const scoreSavedRef = useRef(false);

  const generateQuiz = useCallback(() => {
    if (words.length < 4) return;
    setQuestions(buildQuestions(words, allWords && allWords.length > 4 ? allWords : words));
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    scoreSavedRef.current = false;
  }, [words, allWords]);

  useEffect(() => {
    if (!finished || scoreSavedRef.current) return;
    scoreSavedRef.current = true;
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

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[current]?.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
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
        <div className="text-6xl mb-4">{score >= 10 ? "🏆" : score >= 7 ? "👍" : "💪"}</div>
        <h3 className="text-2xl font-bold text-foreground mb-2">{score}/{questions.length}</h3>
        <p className="text-muted-foreground mb-6">
          {score >= 10 ? t("Xuất sắc! Bạn nắm vững từ vựng rất tốt!", "Excellent! You've mastered these words!") :
           score >= 7 ? t("Khá tốt! Hãy tiếp tục ôn luyện.", "Good job! Keep practicing.") :
           t("Cần ôn thêm. Hãy thử lại nhé!", "Needs more review. Try again!")}
        </p>
        <Button onClick={generateQuiz} className="gap-2 mb-6">
          <RotateCcw className="w-4 h-4" /> {t("Làm lại", "Try Again")}
        </Button>
        <div className="w-full max-w-sm">
          <GameLeaderboard gameType="vocab-ielts" currentScore={score} />
        </div>
      </div>
    );
  }

  const q = questions[current];
  if (!q) return null;
  const label = TYPE_LABELS[q.type];

  return (
    <div className="max-w-2xl mx-auto">
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
        ) : q.type === "reverse" ? (
          <>
            <p className="text-xs text-muted-foreground mb-2">{t("Nghĩa tiếng Việt:", "Vietnamese meaning:")}</p>
            <h3 className="text-2xl font-bold text-foreground mb-2">{q.prompt}</h3>
            <p className="text-sm text-muted-foreground">{t("Chọn từ tiếng Anh tương ứng:", "Pick the matching English word:")}</p>
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
      {selected !== null && (
        <div className="flex justify-between items-center mt-6 gap-3 flex-wrap">
          <p className="text-sm text-muted-foreground italic">
            <strong className="text-foreground not-italic">{q.word.word}</strong> — {q.word.definition.vi}
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
  const [mastered, setMastered] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("ielts_mastered");
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch { return new Set<string>(); }
  });
  const [showMasteredOnly, setShowMasteredOnly] = useState(false);
  const [flyingStars, setFlyingStars] = useState<{ id: number; startX: number; startY: number }[]>([]);
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const starIdCounter = useRef(0);

  const toggleMastered = useCallback((word: string) => {
    setMastered(prev => {
      const next = new Set(prev);
      if (next.has(word)) next.delete(word); else next.add(word);
      localStorage.setItem("ielts_mastered", JSON.stringify([...next]));
      syncMasteredCount("ielts", next.size);
      return next;
    });
  }, []);

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
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
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
              <Button
                variant={showMasteredOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowMasteredOnly(!showMasteredOnly)}
                className="gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                {t("Cần ôn", "Need Review")}
              </Button>
              <Tabs value={viewMode} onValueChange={v => setViewMode(v as "list" | "flashcard" | "exercise")} className="ml-auto">
                <TabsList>
                  <TabsTrigger value="list"><List className="w-4 h-4" /></TabsTrigger>
                  <TabsTrigger value="flashcard"><Layers className="w-4 h-4" /></TabsTrigger>
                  <TabsTrigger value="exercise"><BookOpen className="w-4 h-4" /></TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <p className="text-xs text-muted-foreground mb-4">{filtered.length} {t("kết quả", "results")}</p>

            {/* Content based on mode */}
            {viewMode === "exercise" ? (
              <VocabExercise words={ieltsVocabData.filter(w => mastered.has(w.word))} allWords={ieltsVocabData} t={t} />
            ) : viewMode === "flashcard" ? (
              /* Flashcard grid - generous gap, responsive columns */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AnimatePresence mode="popLayout">
                  {paginated.map(w => (
                    <motion.div key={w.word + w.category} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                      <Flashcard word={w} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              /* List grid - 1 col mobile, 2 tablet, 3 desktop */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {paginated.map(w => (
                  <motion.div
                    key={w.word + w.category}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group min-w-0 h-full rounded-xl bg-white dark:bg-card hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    style={{ padding: "2rem", border: "2px solid #cbd5e1", boxShadow: "0 4px 12px -2px rgb(0 0 0 / 0.08), 0 0 0 1px rgb(0 0 0 / 0.04)", borderRadius: "1rem" }}
                  >
                    {/* Header: Word + Illustration + Audio + Star */}
                    <div className="mb-2 min-w-0 flex items-start gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="break-words font-extrabold" style={{ fontSize: "1.5rem", lineHeight: 1.35, overflowWrap: "break-word", wordBreak: "normal" }}>
                          <span style={{ color: "#059669" }}>{w.word}</span>
                          {w.synonyms && w.synonyms.length > 0 && (
                            <span className="ml-2 italic font-medium" style={{ fontSize: "0.95rem", color: "#111827" }}>
                              = {w.synonyms.join(", ")}
                            </span>
                          )}
                        </h3>
                        <p className="break-words font-mono" style={{ fontSize: "0.875rem", color: "#4b5563", overflowWrap: "break-word", wordBreak: "normal" }}>{w.ipa}</p>
                        <div className="mt-2 flex items-center gap-1">
                          <button onClick={() => speak(w.word)} className="rounded-lg p-1.5 transition-colors hover:bg-primary/10">
                            <Volume2 size={20} style={{ color: "#4b5563" }} />
                          </button>
                          <motion.button
                            onClick={(e) => handleStarClick(w.word, e)}
                            className="rounded-lg p-1.5 transition-colors hover:bg-yellow-500/10"
                            whileTap={{ scale: 1.4 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <Star
                              size={20}
                              className={mastered.has(w.word) ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]" : ""}
                              style={mastered.has(w.word) ? {} : { color: "#4b5563" }}
                            />
                          </motion.button>
                        </div>
                      </div>
                      <VocabIllustration word={w.word} definition={w.definition.en} category={w.category} size={64} />
                    </div>

                    {/* Badges */}
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <Badge className={levelColors[w.level] + " text-xs"}>{w.level}</Badge>
                      {w.partOfSpeech && <Badge variant="secondary" className="text-xs italic">{w.partOfSpeech}</Badge>}
                      <Badge variant="outline" className="text-xs">{w.category}</Badge>
                    </div>

                    {/* Definition - high contrast */}
                    <p className="min-w-0 break-words font-semibold leading-relaxed whitespace-normal" style={{ fontSize: "1rem", color: "#374151", lineHeight: 1.6, overflowWrap: "break-word", wordBreak: "normal" }}>{w.definition.en}</p>
                    <p className="mt-1 min-w-0 break-words font-bold whitespace-normal" style={{ fontSize: "1.1875rem", color: "#1d4ed8", lineHeight: 1.6, overflowWrap: "break-word", wordBreak: "normal" }}>{w.definition.vi}</p>

                    {/* Example sentence */}
                    <p className="mt-3 min-w-0 break-words italic leading-relaxed whitespace-normal" style={{ fontSize: "1rem", color: "#374151", lineHeight: 1.6, overflowWrap: "break-word", wordBreak: "normal" }}>
                      <span className="font-bold not-italic" style={{ color: "#1d4ed8" }}>E.g. </span>
                      {w.example.split(new RegExp(`(${w.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig")).map((part, i) =>
                        part.toLowerCase() === w.word.toLowerCase()
                          ? <strong key={i} className="font-extrabold italic" style={{ color: "#111827" }}>{part}</strong>
                          : <span key={i}>{part}</span>
                      )}
                    </p>

                    {/* Inline Type-the-example widget */}
                    <InlineTypeExample word={w} t={t} />

                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination (hide in exercise mode) */}
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
          <div className="hidden lg:block w-72 flex-shrink-0 sticky top-24 self-start space-y-4">
            <VocabMasteryLeaderboard subject="ielts" currentCount={mastered.size} />
            <StudyStreakLeaderboard />
          </div>
          </div>
          <div className="lg:hidden mt-6 space-y-4">
            <VocabMasteryLeaderboard subject="ielts" currentCount={mastered.size} />
            <StudyStreakLeaderboard />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IeltsVocabulary;
