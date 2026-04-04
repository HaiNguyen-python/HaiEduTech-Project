import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Volume2, ChevronLeft, ChevronRight, Layers, List, Star, RotateCcw, BookOpen, CheckCircle, XCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { hskVocabData, HSK_LEVELS, HSK_CATEGORIES, type HskWord } from "@/data/hskVocab";
import HanziStrokeOrder from "@/components/HanziStrokeOrder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GreatWallClimber from "@/components/GreatWallClimber";
import { useMasteredMotivation } from "@/hooks/useMasteredMotivation";
import GameLeaderboard from "@/components/games/GameLeaderboard";
import VocabMasteryLeaderboard, { syncMasteredCount } from "@/components/VocabMasteryLeaderboard";
import { supabase } from "@/integrations/supabase/client";

const WORDS_PER_PAGE = 12;

// Level color mapping for HSK levels
const levelColors: Record<string, string> = {
  "HSK 1": "bg-green-500/20 text-green-400",
  "HSK 2": "bg-emerald-500/20 text-emerald-400",
  "HSK 3": "bg-blue-500/20 text-blue-400",
  "HSK 4": "bg-indigo-500/20 text-indigo-400",
  "HSK 5": "bg-purple-500/20 text-purple-400",
  "HSK 6": "bg-rose-500/20 text-rose-400",
};

// Text-to-Speech helper for Mandarin
const speakChinese = (text: string) => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN";
    u.rate = 0.8;
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

// Flashcard component for HSK words
const HskFlashcard = ({ word }: { word: HskWord }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="cursor-pointer perspective-1000 h-60" onClick={() => setFlipped(!flipped)}>
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front - Show Hanzi + Pinyin */}
        <div className="absolute inset-0 rounded-xl border border-border bg-card p-6 flex flex-col items-center justify-center gap-2" style={{ backfaceVisibility: "hidden" }}>
          <HanziStrokeOrder character={word.character} size={80} />
          <h3 className="text-4xl font-bold text-foreground">{word.character}</h3>
          <p className="text-base text-primary font-medium">{word.pinyin}</p>
          <Badge className={levelColors[word.level]}>{word.level}</Badge>
          <button onClick={(e) => { e.stopPropagation(); speakChinese(word.character); }} className="mt-1 p-2 rounded-full hover:bg-primary/10 transition-colors">
            <Volume2 className="w-5 h-5 text-primary" />
          </button>
        </div>
        {/* Back - Show Definition, Example, Category */}
        <div className="absolute inset-0 rounded-xl border border-border bg-card p-5 flex flex-col justify-center gap-2" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <p className="text-sm font-semibold text-foreground">{word.definition.en}</p>
          <p className="text-sm text-primary font-medium">{word.definition.vi}</p>
          <div className="mt-2 p-3 rounded-lg bg-secondary/50">
            <p className="text-base font-bold text-foreground">{word.example}</p>
            <p className="text-xs text-muted-foreground mt-1">{word.examplePinyin}</p>
          </div>
          <Badge variant="outline" className="w-fit mt-1 text-xs">{word.category}</Badge>
        </div>
      </motion.div>
    </div>
  );
};

// MCQ Exercise component for HSK vocabulary
const HskExercise = ({ words, t }: { words: HskWord[]; t: (vi: string, en: string) => string }) => {
  const [questions, setQuestions] = useState<{ word: HskWord; options: string[]; correct: number }[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const scoreSavedRef = useRef(false);
  const QUIZ_SIZE = 10;

  const generateQuiz = useCallback(() => {
    const pool = words.length >= 4 ? words : hskVocabData;
    const picked = shuffle(pool).slice(0, QUIZ_SIZE);
    const qs = picked.map(w => {
      const wrongs = shuffle(pool.filter(x => x.character !== w.character)).slice(0, 3).map(x => x.definition.vi);
      const allOpts = shuffle([w.definition.vi, ...wrongs]);
      return { word: w, options: allOpts, correct: allOpts.indexOf(w.definition.vi) };
    });
    setQuestions(qs);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    scoreSavedRef.current = false;
  }, [words]);

  useEffect(() => {
    if (!finished || scoreSavedRef.current) return;
    scoreSavedRef.current = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await (supabase as any).from("game_scores").insert({
          user_id: user.id, score, game_type: "vocab-hsk", max_streak: 0,
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
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  };

  if (questions.length === 0) return <p className="text-muted-foreground text-center py-12">{t("Cần ít nhất 4 từ để tạo bài tập", "Need at least 4 words to generate exercises")}</p>;

  // Mascot encouragement messages per HSK level
  const mascotMessages = [
    { emoji: "🏆", vi: "太棒 rồi! Bạn xuất sắc lắm!", en: "太棒了! Excellent work!" },
    { emoji: "👍", vi: "不错 đó! Tiếp tục cố gắng nhé!", en: "不错! Keep going!" },
    { emoji: "💪", vi: "加油 nào! Hãy ôn lại và thử lại!", en: "加油! Review and try again!" },
  ];

  if (finished) {
    const msg = score >= 8 ? mascotMessages[0] : score >= 5 ? mascotMessages[1] : mascotMessages[2];
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">{msg.emoji}</div>
        <h3 className="text-2xl font-bold text-foreground mb-2">{score}/{questions.length}</h3>
        <p className="text-muted-foreground mb-2">{t(msg.vi, msg.en)}</p>
        <div className="mt-2 mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20 max-w-sm">
          <p className="text-sm font-medium text-primary">
            🎓 Teacher Hai: {score >= 8 ? "你真厉害！继续保持！" : score >= 5 ? "还不错，再加把劲！" : "别灰心，多练习就会进步的！"}
          </p>
        </div>
        <Button onClick={generateQuiz} className="gap-2 mb-6">
          <RotateCcw className="w-4 h-4" /> {t("Làm lại", "Try Again")}
        </Button>
        <div className="w-full max-w-sm">
          <GameLeaderboard gameType="vocab-hsk" currentScore={score} />
        </div>
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
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-4xl font-bold text-foreground">{q.word.character}</h3>
          <button onClick={() => speakChinese(q.word.character)} className="p-2 rounded-full hover:bg-primary/10">
            <Volume2 className="w-5 h-5 text-primary" />
          </button>
        </div>
        <p className="text-base text-primary font-medium mb-1">{q.word.pinyin}</p>
        <div className="p-3 rounded-lg bg-secondary/50 mt-2">
          <p className="text-base font-bold text-foreground">{q.word.example}</p>
          <p className="text-xs text-muted-foreground mt-1">{q.word.examplePinyin}</p>
        </div>
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
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-muted-foreground italic">{q.word.definition.en}</p>
          <Button onClick={handleNext}>
            {current + 1 >= questions.length ? t("Xem kết quả", "See Results") : t("Câu tiếp", "Next")}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

const HskVocabulary = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "flashcard" | "exercise">("list");
  const [mastered, setMastered] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("hsk_mastered");
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch { return new Set<string>(); }
  });
  const [showMasteredOnly, setShowMasteredOnly] = useState(false);

  // Flying stars state for Great Wall Climber
  const [flyingStars, setFlyingStars] = useState<{ id: number; startX: number; startY: number }[]>([]);
  const starIdRef = useRef(0);
  const climberContainerRef = useRef<HTMLDivElement>(null);

  const toggleMastered = useCallback((word: string) => {
    setMastered(prev => {
      const next = new Set(prev);
      if (next.has(word)) next.delete(word); else next.add(word);
      localStorage.setItem("hsk_mastered", JSON.stringify([...next]));
      syncMasteredCount("hsk", next.size);
      return next;
    });
  }, []);

  // Wrap toggleMastered with motivation and flying star effect
  const handleToggleWithMotivation = useMasteredMotivation(mastered, toggleMastered);

  const handleStarClick = useCallback((word: string, event: React.MouseEvent) => {
    const wasNotMastered = !mastered.has(word);
    handleToggleWithMotivation(word);
    if (wasNotMastered) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      const id = ++starIdRef.current;
      setFlyingStars(prev => [...prev, { id, startX: rect.left + rect.width / 2, startY: rect.top + rect.height / 2 }]);
    }
  }, [mastered, handleToggleWithMotivation]);

  const handleStarLanded = useCallback((id: number) => {
    setFlyingStars(prev => prev.filter(s => s.id !== id));
  }, []);

  const filtered = useMemo(() => {
    let words = hskVocabData;
    if (search) {
      const q = search.toLowerCase();
      words = words.filter(w =>
        w.character.toLowerCase().includes(q) ||
        w.pinyin.toLowerCase().includes(q) ||
        w.definition.vi.toLowerCase().includes(q) ||
        w.definition.en.toLowerCase().includes(q)
      );
    }
    if (levelFilter !== "all") words = words.filter(w => w.level === levelFilter);
    if (categoryFilter !== "all") words = words.filter(w => w.category === categoryFilter);
    if (showMasteredOnly) words = words.filter(w => !mastered.has(w.character));
    return words;
  }, [search, levelFilter, categoryFilter, showMasteredOnly, mastered]);

  const totalPages = Math.ceil(filtered.length / WORDS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * WORDS_PER_PAGE, page * WORDS_PER_PAGE);

  // Reset page when filters change
  useEffect(() => setPage(1), [search, levelFilter, categoryFilter, showMasteredOnly]);

  // Per-level mastered stats
  const levelStats = useMemo(() => {
    const stats: Record<string, { total: number; mastered: number }> = {};
    for (const level of HSK_LEVELS) {
      const total = hskVocabData.filter(w => w.level === level).length;
      const m = hskVocabData.filter(w => w.level === level && mastered.has(w.character)).length;
      stats[level] = { total, mastered: m };
    }
    return stats;
  }, [mastered]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 min-w-0">
            {/* Great Wall Climber Progress Visualization */}
            <GreatWallClimber
              mastered={mastered.size}
              total={hskVocabData.length}
              flyingStars={flyingStars}
              onStarLanded={handleStarLanded}
              containerRef={climberContainerRef}
            />

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                HSK Vocabulary <span className="text-gradient">{t("Ngân hàng từ vựng", "Word Bank")}</span>
              </h1>
              <p className="text-muted-foreground">
                {t(
                  `${hskVocabData.length} từ vựng HSK 1-6 — Lọc theo cấp độ, flashcard, luyện tập, phát âm`,
                  `${hskVocabData.length} HSK 1-6 words — Filter by level, flashcard, exercises, pronunciation`
                )}
              </p>
              {/* Per-level stats badges */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {HSK_LEVELS.map(level => (
                  <div key={level} className="flex items-center gap-1.5 text-xs">
                    <Badge className={levelColors[level] + " text-xs"}>{level}</Badge>
                    <span className="text-muted-foreground">
                      {levelStats[level].mastered}/{levelStats[level].total}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                <span className="text-muted-foreground">{t("Đã thuộc", "Mastered")}: <strong className="text-primary">{mastered.size}</strong></span>
                <span className="text-muted-foreground">{t("Cần ôn", "Need Review")}: <strong className="text-orange-400">{hskVocabData.length - mastered.size}</strong></span>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={t("Tìm Hán tự, Pinyin, nghĩa...", "Search Hanzi, Pinyin, meaning...")}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none text-sm"
                />
              </div>
              <select
                value={levelFilter}
                onChange={e => setLevelFilter(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none"
              >
                <option value="all">{t("Tất cả cấp độ", "All Levels")}</option>
                {HSK_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-sm focus:outline-none max-w-[200px]"
              >
                <option value="all">{t("Tất cả chủ đề", "All Topics")}</option>
                {HSK_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
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
              <HskExercise words={filtered} t={t} />
            ) : viewMode === "flashcard" ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                  {paginated.map(w => (
                    <motion.div key={w.character + w.category} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                      <HskFlashcard word={w} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {paginated.map((w, idx) => (
                  <div key={w.character + w.category} className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-colors">
                    {/* Stroke order area */}
                    <div className="bg-secondary/30 flex items-center justify-center p-4">
                      <HanziStrokeOrder character={w.character} size={100} />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-bold text-foreground text-2xl">{w.character}</h3>
                          <p className="text-sm text-primary font-medium">{w.pinyin}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => speakChinese(w.character)} className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors">
                            <Volume2 className="w-4 h-4 text-primary" />
                          </button>
                          <button onClick={(e) => handleStarClick(w.character, e)} className="p-1.5 rounded-lg hover:bg-yellow-500/10 transition-colors">
                            <Star className={`w-4 h-4 ${mastered.has(w.character) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`} />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={levelColors[w.level] + " text-xs"}>{w.level}</Badge>
                        <Badge variant="outline" className="text-xs">{w.category}</Badge>
                      </div>
                      <p className="text-sm text-foreground font-medium">{w.definition.en}</p>
                      <p className="text-sm text-primary">{w.definition.vi}</p>
                      <div className="mt-2 p-2.5 rounded-lg bg-secondary/50">
                        <p className="text-base font-bold text-foreground leading-relaxed">{w.example}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{w.examplePinyin}</p>
                      </div>
                    </div>
                  </div>
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
          <div className="hidden lg:block w-72 flex-shrink-0 sticky top-24 self-start">
            <VocabMasteryLeaderboard subject="hsk" currentCount={mastered.size} />
          </div>
          </div>
          <div className="lg:hidden mt-6">
            <VocabMasteryLeaderboard subject="hsk" currentCount={mastered.size} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HskVocabulary;
