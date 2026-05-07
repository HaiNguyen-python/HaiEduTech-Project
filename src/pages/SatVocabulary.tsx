import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Volume2, ChevronLeft, ChevronRight, Layers, List, Star, RotateCcw, BookOpen, CheckCircle, XCircle, Keyboard } from "lucide-react";
import { useMasteredMotivation } from "@/hooks/useMasteredMotivation";
import { useLanguage } from "@/contexts/LanguageContext";
import { satVocabData, SAT_LEVELS, SAT_SECTIONS, SAT_CATEGORIES_BY_SECTION, type SatWord } from "@/data/satVocabData";
import SatClimber from "@/components/SatClimber";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameLeaderboard from "@/components/games/GameLeaderboard";
import VocabMasteryLeaderboard, { syncMasteredCount } from "@/components/VocabMasteryLeaderboard";
import StudyStreakLeaderboard from "@/components/StudyStreakLeaderboard";
import { supabase } from "@/integrations/supabase/client";

const WORDS_PER_PAGE = 12;

const levelColors: Record<string, string> = {
  B2: "bg-indigo-500/20 text-indigo-400",
  C1: "bg-purple-500/20 text-purple-400",
};

// Friendly emoji for each lesson category — adds visual variety to the cards
const categoryIcons: Record<string, string> = {
  "Evidence-Based Reading": "🔍",
  "Command of Evidence": "📊",
  "Words in Context": "🧩",
  "Standard English Conventions": "📝",
  "High-Frequency SAT Words – Set 1": "⭐",
  "High-Frequency SAT Words – Set 2": "🌟",
  "Roots, Prefixes & Suffixes": "🌱",
  "Expression of Ideas": "💡",
  "Rhetorical Synthesis": "🧠",
  "Transitions & Flow": "🔗",
  "Heart of Algebra": "🧮",
  "Problem Solving & Data Analysis": "📈",
  "Passport to Advanced Math": "🚀",
  "Geometry & Trigonometry": "📐",
};
const iconFor = (cat: string) => categoryIcons[cat] || "📚";

const speak = (text: string) => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  }
};

// Render an example sentence with the target word bolded (handles inflections)
const renderExample = (example: string, word: string) => {
  const stem = word.replace(/(ing|ed|es|s|ly|tion|ment|ness)$/i, "");
  const safe = stem.length >= 3 ? stem : word;
  const re = new RegExp(`\\b(${safe.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[a-z]*)\\b`, "gi");
  const parts: Array<string | { b: string }> = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(example)) !== null) {
    if (m.index > last) parts.push(example.slice(last, m.index));
    parts.push({ b: m[0] });
    last = m.index + m[0].length;
  }
  if (last < example.length) parts.push(example.slice(last));
  if (parts.length === 0) parts.push(example);
  return (
    <>
      <span className="font-semibold not-italic" style={{ color: "#0f766e" }}>E.g. </span>
      {parts.map((p, i) =>
        typeof p === "string" ? <span key={i}>{p}</span> : <strong key={i} className="font-bold" style={{ color: "#111827" }}>{p.b}</strong>
      )}
    </>
  );
};

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const Flashcard = ({ word, isMastered, onStar }: { word: SatWord; isMastered: boolean; onStar: (w: string, e: React.MouseEvent) => void }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="cursor-pointer" onClick={() => setFlipped(!flipped)}>
      {!flipped ? (
        <motion.div
          key="front"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl bg-white dark:bg-card flex flex-col items-center justify-center gap-3"
          style={{ padding: "2rem", border: "2px solid #f1f5f9", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", minHeight: "14rem" }}
        >
          <h3 className="font-extrabold text-center" style={{ fontSize: "1.75rem", color: "#111827" }}>{word.word}</h3>
          {word.ipa && (
            <p className="text-center" style={{ fontSize: "0.95rem", color: "#6b7280", fontFamily: "Georgia, serif" }}>{word.ipa}</p>
          )}
          {word.partOfSpeech && (
            <Badge variant="secondary" className="text-xs italic">{word.partOfSpeech}</Badge>
          )}
          <Badge className={levelColors[word.level]}>{word.level}</Badge>
          <div className="flex items-center gap-2 mt-2">
            <button onClick={(e) => { e.stopPropagation(); speak(word.word); }} className="p-2 rounded-full hover:bg-primary/10">
              <Volume2 size={20} style={{ color: "#4b5563" }} />
            </button>
            <motion.button
              onClick={(e) => { e.stopPropagation(); onStar(word.word, e); }}
              className="p-2 rounded-full hover:bg-yellow-500/10"
              whileTap={{ scale: 1.4 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Star size={20}
                className={isMastered ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]" : ""}
                style={isMastered ? {} : { color: "#4b5563" }}
              />
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="back"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl bg-white dark:bg-card flex flex-col justify-center gap-2"
          style={{ padding: "2rem", border: "2px solid #f1f5f9", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", minHeight: "14rem" }}
        >
          <p className="font-bold break-words" style={{ fontSize: "1.1875rem", color: "#1d4ed8", lineHeight: 1.6 }}>{word.definition.vi}</p>
          {word.example && (
            <p className="italic mt-1 break-words" style={{ fontSize: "0.9375rem", color: "#374151", lineHeight: 1.6 }}>{renderExample(word.example, word.word)}</p>
          )}
          <Badge variant="outline" className="w-fit mt-1 text-xs">{word.category}</Badge>
        </motion.div>
      )}
    </div>
  );
};

const VocabExercise = ({ words, allWords, t }: { words: SatWord[]; allWords?: SatWord[]; t: (vi: string, en: string) => string }) => {
  const [questions, setQuestions] = useState<{ word: SatWord; options: string[]; correct: number }[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const scoreSavedRef = useRef(false);
  const QUIZ_SIZE = 10;

  const generateQuiz = useCallback(() => {
    if (words.length < 4) return;
    const distractorPool = allWords && allWords.length > 4 ? allWords : words;
    const picked = shuffle(words).slice(0, QUIZ_SIZE);
    const qs = picked.map(w => {
      const wrongs = shuffle(distractorPool.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.definition.vi);
      const allOpts = shuffle([w.definition.vi, ...wrongs]);
      return { word: w, options: allOpts, correct: allOpts.indexOf(w.definition.vi) };
    });
    setQuestions(qs);
    setCurrent(0); setSelected(null); setScore(0); setFinished(false);
    scoreSavedRef.current = false;
  }, [words, allWords]);

  useEffect(() => {
    if (!finished || scoreSavedRef.current) return;
    scoreSavedRef.current = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await (supabase as any).from("game_scores").insert({
          user_id: user.id, score, game_type: "vocab-sat", max_streak: 0,
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
        {t(`Hãy đánh dấu ⭐ ít nhất 4 từ đã học để bắt đầu luyện tập! (Hiện tại: ${words.length}/4)`,
          `Mark ⭐ at least 4 words as learned to start practicing! (Current: ${words.length}/4)`)}
      </p>
    </div>
  );
  if (questions.length === 0) return <p className="text-muted-foreground text-center py-12">{t("Đang tạo bài tập...", "Generating exercises...")}</p>;

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">{score >= 8 ? "🏆" : score >= 5 ? "👍" : "💪"}</div>
        <h3 className="text-2xl font-bold text-foreground mb-2">{score}/{questions.length}</h3>
        <p className="text-muted-foreground mb-6">
          {score >= 8 ? t("Xuất sắc! Bạn nắm vững từ vựng rất tốt!", "Excellent! You've mastered these words!")
            : score >= 5 ? t("Khá tốt! Hãy tiếp tục ôn luyện.", "Good job! Keep practicing.")
              : t("Cần ôn thêm. Hãy thử lại nhé!", "Needs more review. Try again!")}
        </p>
        <Button onClick={generateQuiz} className="gap-2 mb-6"><RotateCcw className="w-4 h-4" /> {t("Làm lại", "Try Again")}</Button>
        <div className="w-full max-w-sm"><GameLeaderboard gameType="vocab-sat" currentScore={score} /></div>
      </div>
    );
  }

  const q = questions[current];
  if (!q) return null;
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-muted-foreground">{t("Câu", "Question")} {current + 1}/{questions.length}</span>
        <span className="text-sm font-semibold text-primary">{t("Điểm", "Score")}: {score}</span>
      </div>
      <div className="rounded-xl border border-border bg-card p-8 mb-6">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-3xl font-bold text-foreground">{q.word.word}</h3>
          <button onClick={() => speak(q.word.word)} className="p-2 rounded-full hover:bg-primary/10">
            <Volume2 className="w-5 h-5 text-primary" />
          </button>
        </div>
        {q.word.ipa && <p className="text-sm text-muted-foreground mb-2" style={{ fontFamily: "Georgia, serif" }}>{q.word.ipa}</p>}
        {q.word.example && <p className="text-sm text-foreground italic">{renderExample(q.word.example, q.word.word)}</p>}
        <p className="text-sm text-muted-foreground mt-3">{t("Chọn nghĩa đúng:", "Choose the correct meaning:")}</p>
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
                <span className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-xs font-bold shrink-0">{String.fromCharCode(65 + idx)}</span>
                <span>{opt}</span>
                {selected !== null && idx === q.correct && <CheckCircle className="w-5 h-5 text-green-500 ml-auto shrink-0" />}
                {selected !== null && idx === selected && idx !== q.correct && <XCircle className="w-5 h-5 text-red-500 ml-auto shrink-0" />}
              </div>
            </div>
          );
        })}
      </div>
      {selected !== null && (
        <div className="flex justify-end items-center mt-6">
          <Button onClick={handleNext}>
            {current + 1 >= questions.length ? t("Xem kết quả", "See Results") : t("Câu tiếp", "Next")}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

// ── Sentence Practice: type the example sentence verbatim to remember usage ──
const normalize = (s: string) =>
  s.toLowerCase().replace(/[.,!?;:"'()]/g, "").replace(/\s+/g, " ").trim();

const SentencePractice = ({ words, t }: { words: SatWord[]; t: (vi: string, en: string) => string }) => {
  const [pool, setPool] = useState<SatWord[]>([]);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const QUIZ_SIZE = 8;

  const start = useCallback(() => {
    const usable = words.filter(w => w.example && w.example.split(/\s+/).length >= 4);
    if (usable.length < 1) return;
    setPool(shuffle(usable).slice(0, Math.min(QUIZ_SIZE, usable.length)));
    setIdx(0); setInput(""); setRevealed(false); setScore(0); setDone(false);
  }, [words]);

  useEffect(() => { start(); }, [start]);

  if (words.length < 1) return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-6xl mb-4">⌨️</div>
      <h3 className="text-xl font-bold text-foreground mb-2">{t("Chưa có từ nào", "No words yet")}</h3>
      <p className="text-muted-foreground max-w-md">
        {t("Hãy đánh dấu ⭐ ít nhất 1 từ để luyện gõ lại câu ví dụ.", "Mark ⭐ at least 1 word to practice typing the example sentence.")}
      </p>
    </div>
  );

  if (pool.length === 0) return null;

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">{score >= pool.length - 1 ? "🏆" : score >= pool.length / 2 ? "👍" : "💪"}</div>
        <h3 className="text-2xl font-bold text-foreground mb-2">{score}/{pool.length}</h3>
        <p className="text-muted-foreground mb-6">
          {t("Gõ lại câu ví dụ giúp bạn nhớ ngữ cảnh sử dụng từ.", "Re-typing example sentences helps you remember word usage.")}
        </p>
        <Button onClick={start} className="gap-2"><RotateCcw className="w-4 h-4" /> {t("Làm lại", "Try Again")}</Button>
      </div>
    );
  }

  const cur = pool[idx];
  const target = cur.example;
  const isCorrect = revealed && normalize(input) === normalize(target);

  const handleCheck = () => {
    if (revealed) return;
    setRevealed(true);
    if (normalize(input) === normalize(target)) setScore(s => s + 1);
  };
  const handleNext = () => {
    if (idx + 1 >= pool.length) setDone(true);
    else { setIdx(i => i + 1); setInput(""); setRevealed(false); }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-muted-foreground">{t("Câu", "Sentence")} {idx + 1}/{pool.length}</span>
        <span className="text-sm font-semibold text-primary">{t("Điểm", "Score")}: {score}</span>
      </div>
      <div className="rounded-xl border border-border bg-card p-6 mb-4">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-2xl font-bold text-foreground">{iconFor(cur.category)} {cur.word}</h3>
          <button onClick={() => speak(cur.word)} className="p-2 rounded-full hover:bg-primary/10">
            <Volume2 className="w-5 h-5 text-primary" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground mb-1">
          <strong className="text-foreground">{t("Nghĩa:", "Meaning:")}</strong> {cur.definition.vi}
        </p>
        <p className="text-sm text-muted-foreground">
          {t("Nghe câu mẫu, sau đó gõ lại đầy đủ để ghi nhớ ngữ cảnh.", "Listen to the model sentence, then type it back to lock in usage.")}
        </p>
        <Button variant="outline" size="sm" className="gap-2 mt-3" onClick={() => speak(target)}>
          <Volume2 className="w-4 h-4" /> {t("Nghe câu mẫu", "Play sentence")}
        </Button>
      </div>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        disabled={revealed}
        rows={3}
        placeholder={t("Gõ lại câu ví dụ…", "Type the example sentence…")}
        className="w-full p-4 rounded-xl border-2 border-border bg-card text-foreground focus:border-primary/60 focus:outline-none text-base leading-relaxed disabled:opacity-70"
      />
      {revealed && (
        <div className={`mt-4 p-4 rounded-xl border-2 ${isCorrect ? "border-green-500 bg-green-500/10" : "border-orange-500 bg-orange-500/10"}`}>
          <div className="flex items-center gap-2 mb-2 font-semibold">
            {isCorrect ? (
              <><CheckCircle className="w-5 h-5 text-green-600" /><span className="text-green-700 dark:text-green-400">{t("Tuyệt vời! Chính xác.", "Perfect match!")}</span></>
            ) : (
              <><XCircle className="w-5 h-5 text-orange-600" /><span className="text-orange-700 dark:text-orange-400">{t("Gần đúng — đối chiếu lại nhé.", "Close — compare with the original.")}</span></>
            )}
          </div>
          <p className="text-sm"><strong>{t("Câu gốc:", "Original:")}</strong> <span className="italic">{target}</span></p>
        </div>
      )}
      <div className="flex justify-end gap-2 mt-6">
        {!revealed ? (
          <Button onClick={handleCheck} disabled={input.trim().length === 0}>{t("Kiểm tra", "Check")}</Button>
        ) : (
          <Button onClick={handleNext}>
            {idx + 1 >= pool.length ? t("Xem kết quả", "See Results") : t("Câu tiếp", "Next")}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};

const SatVocabulary = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [sectionFilter, setSectionFilter] = useState<string>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "flashcard" | "exercise" | "sentence">("list");

  const availableCategories = useMemo(() => {
    if (sectionFilter === "all") return [...SAT_CATEGORIES_BY_SECTION["Reading & Writing"], ...SAT_CATEGORIES_BY_SECTION["Math"]];
    return SAT_CATEGORIES_BY_SECTION[sectionFilter] || [];
  }, [sectionFilter]);
  useEffect(() => { setCategoryFilter("all"); }, [sectionFilter]);
  const [mastered, setMastered] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("sat_mastered");
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
      localStorage.setItem("sat_mastered", JSON.stringify([...next]));
      syncMasteredCount("sat", next.size);
      return next;
    });
  }, []);

  const handleMasteredWithMotivation = useMasteredMotivation(mastered, toggleMastered);

  const handleStarClick = useCallback((word: string, e: React.MouseEvent) => {
    const isCurrentlyMastered = mastered.has(word);
    handleMasteredWithMotivation(word);
    if (!isCurrentlyMastered) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const id = ++starIdCounter.current;
      setFlyingStars(prev => [...prev, { id, startX: rect.left + rect.width / 2, startY: rect.top + rect.height / 2 }]);
    }
  }, [mastered, handleMasteredWithMotivation]);

  const handleStarLanded = useCallback((id: number) => {
    setFlyingStars(prev => prev.filter(s => s.id !== id));
  }, []);

  const filtered = useMemo(() => {
    let words = satVocabData;
    if (search) {
      const q = search.toLowerCase();
      words = words.filter(w =>
        w.word.toLowerCase().includes(q) ||
        w.definition.vi.toLowerCase().includes(q) ||
        (w.example || "").toLowerCase().includes(q)
      );
    }
    if (sectionFilter !== "all") words = words.filter(w => w.section === sectionFilter);
    if (levelFilter !== "all") words = words.filter(w => w.level === levelFilter);
    if (categoryFilter !== "all") words = words.filter(w => w.category === categoryFilter);
    if (showMasteredOnly) words = words.filter(w => !mastered.has(w.word));
    return words;
  }, [search, sectionFilter, levelFilter, categoryFilter, showMasteredOnly, mastered]);

  const totalPages = Math.ceil(filtered.length / WORDS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * WORDS_PER_PAGE, page * WORDS_PER_PAGE);
  useEffect(() => setPage(1), [search, sectionFilter, levelFilter, categoryFilter, showMasteredOnly]);

  return (
    <div ref={pageContainerRef} className="min-h-screen bg-background">
      <SEO
        title="SAT Vocabulary – Ngân hàng từ vựng SAT | HaiEduTech"
        description={`${satVocabData.length}+ từ vựng SAT theo bài học - flashcard, quiz, leaderboard và Mountain Climber gamification.`}
        path="/sat-vocabulary"
      />
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 min-w-0">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                  SAT Vocabulary <span className="text-gradient">{t("Ngân hàng từ vựng", "Word Bank")}</span>
                </h1>
                <p className="text-muted-foreground">
                  {t(
                    `${satVocabData.length} từ vựng SAT theo bài học - Lọc, học flashcard, luyện tập, nghe phát âm`,
                    `${satVocabData.length} SAT words by lesson - Filter, flashcard, exercises, pronunciation`
                  )}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
                  <span className="text-muted-foreground">{t("Đã thuộc", "Mastered")}: <strong className="text-primary">{mastered.size}</strong></span>
                  <span className="text-muted-foreground">{t("Cần ôn", "Need Review")}: <strong className="text-orange-400">{satVocabData.length - mastered.size}</strong></span>
                </div>
              </div>

              <SatClimber mastered={mastered.size} total={satVocabData.length} flyingStars={flyingStars} onStarLanded={handleStarLanded} containerRef={pageContainerRef} />

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
                <select value={sectionFilter} onChange={e => setSectionFilter(e.target.value)} className="px-3 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none font-semibold">
                  <option value="all">{t("Tất cả phần thi", "All Sections")}</option>
                  {SAT_SECTIONS.map(s => <option key={s} value={s}>{s === "Math" ? "📐 Math" : "📖 Reading & Writing"}</option>)}
                </select>
                <select value={levelFilter} onChange={e => setLevelFilter(e.target.value)} className="px-3 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none">
                  <option value="all">{t("Tất cả cấp độ", "All Levels")}</option>
                  {SAT_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="px-3 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none max-w-[260px]">
                  <option value="all">{t("Tất cả bài học", "All Lessons")}</option>
                  {availableCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <Button variant={showMasteredOnly ? "default" : "outline"} size="sm" onClick={() => setShowMasteredOnly(!showMasteredOnly)} className="gap-1.5">
                  <RotateCcw className="w-4 h-4" /> {t("Cần ôn", "Need Review")}
                </Button>
                <Tabs value={viewMode} onValueChange={v => setViewMode(v as any)} className="ml-auto">
                  <TabsList>
                    <TabsTrigger value="list" title={t("Danh sách", "List")}><List className="w-4 h-4" /></TabsTrigger>
                    <TabsTrigger value="flashcard" title={t("Flashcard", "Flashcard")}><Layers className="w-4 h-4" /></TabsTrigger>
                    <TabsTrigger value="exercise" title={t("Trắc nghiệm", "Quiz")}><BookOpen className="w-4 h-4" /></TabsTrigger>
                    <TabsTrigger value="sentence" title={t("Gõ lại câu ví dụ", "Type sentence")}><Keyboard className="w-4 h-4" /></TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <p className="text-xs text-muted-foreground mb-4">{filtered.length} {t("kết quả", "results")}</p>

              {viewMode === "sentence" ? (
                <SentencePractice words={satVocabData.filter(w => mastered.has(w.word))} t={t} />
              ) : viewMode === "exercise" ? (
                <VocabExercise words={satVocabData.filter(w => mastered.has(w.word))} allWords={satVocabData} t={t} />
              ) : viewMode === "flashcard" ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <AnimatePresence mode="popLayout">
                    {paginated.map(w => (
                      <motion.div key={w.word + w.category} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                        <Flashcard word={w} isMastered={mastered.has(w.word)} onStar={handleStarClick} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {paginated.map(w => (
                    <motion.div
                      key={w.word + w.category}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group min-w-0 h-full rounded-xl bg-white dark:bg-card hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                      style={{ padding: "1.5rem", border: "2px solid #cbd5e1", boxShadow: "0 4px 12px -2px rgb(0 0 0 / 0.08)" }}
                    >
                      <div className="mb-2 min-w-0 flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="break-words font-extrabold" style={{ fontSize: "1.5rem", color: "#111827", lineHeight: 1.35 }}>{w.word}</h3>
                          {w.ipa && (
                            <p className="break-words" style={{ fontSize: "0.95rem", color: "#6b7280", fontFamily: "Georgia, serif", marginTop: "2px" }}>{w.ipa}</p>
                          )}
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
                              <Star size={20}
                                className={mastered.has(w.word) ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]" : ""}
                                style={mastered.has(w.word) ? {} : { color: "#4b5563" }}
                              />
                            </motion.button>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <Badge className={levelColors[w.level] + " text-xs"}>{w.level}</Badge>
                        {w.partOfSpeech && <Badge variant="secondary" className="text-xs italic">{w.partOfSpeech}</Badge>}
                        <Badge variant="outline" className="text-xs">{w.category}</Badge>
                        <Badge className={(w.section === "Math" ? "bg-orange-500/20 text-orange-500" : "bg-blue-500/20 text-blue-500") + " text-xs"}>
                          {w.section === "Math" ? "📐 Math" : "📖 R&W"}
                        </Badge>
                      </div>

                      <p className="min-w-0 break-words font-bold whitespace-normal" style={{ fontSize: "1.1875rem", color: "#1d4ed8", lineHeight: 1.6 }}>{w.definition.vi}</p>

                      {w.example && (
                        <p className="mt-3 min-w-0 break-words italic leading-relaxed whitespace-normal" style={{ fontSize: "1rem", color: "#374151", lineHeight: 1.6 }}>{renderExample(w.example, w.word)}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              {viewMode !== "exercise" && viewMode !== "sentence" && totalPages > 1 && (
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
              <VocabMasteryLeaderboard subject="sat" currentCount={mastered.size} />
              <StudyStreakLeaderboard />
            </div>
          </div>
          <div className="lg:hidden mt-6 space-y-4">
            <VocabMasteryLeaderboard subject="sat" currentCount={mastered.size} />
            <StudyStreakLeaderboard />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SatVocabulary;
