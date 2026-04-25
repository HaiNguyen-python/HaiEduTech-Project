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
import VocabMasteryLeaderboard, { syncMasteredCount } from "@/components/VocabMasteryLeaderboard";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react";
import ToeicMountainClimber from "@/components/ToeicMountainClimber";
import { useMasteredMotivation } from "@/hooks/useMasteredMotivation";

const WORDS_PER_PAGE = 24;

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
  basic: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  intermediate: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  advanced: "bg-purple-600/25 text-purple-300 border-purple-500/40",
};

const levelLabels: Record<string, string> = {
  basic: "Basic",
  intermediate: "Intermediate",
  advanced: "Advanced Business",
};

// Word class badge colors
const wordClassColors: Record<string, string> = {
  n: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  v: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  adj: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  adv: "bg-rose-500/20 text-rose-300 border-rose-500/30",
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

// ── Flashcard Component ──
const Flashcard = ({ word }: { word: ToeicWord }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="cursor-pointer h-80" onClick={() => setFlipped(!flipped)} style={{ perspective: "1000px" }}>
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl border border-slate-600/50 bg-[#1E293B]/80 p-6 flex flex-col items-center justify-center gap-3"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h3 className="text-2xl font-bold text-white">{word.word}</h3>
          <p className="text-sm text-slate-400 font-mono">{word.ipa}</p>
          <div className="flex gap-2">
            <Badge className={`${wordClassColors[word.wordClass]} border text-xs font-bold uppercase`}>{word.wordClass}</Badge>
            <Badge className={`${levelColors[word.level]} border text-xs`}>{levelLabels[word.level]}</Badge>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); speak(word.word); }}
            className="mt-2 p-2 rounded-full hover:bg-blue-500/10 transition-colors"
          >
            <Volume2 className="w-5 h-5 text-blue-400" />
          </button>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl border border-slate-600/50 bg-[#1E293B]/80 px-5 py-6 flex flex-col justify-start gap-2 overflow-y-auto"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-base font-semibold text-white">{word.definition.en}</p>
          <p className="text-base text-blue-300">{word.definition.vi}</p>
          <p className="text-sm text-slate-300 italic mt-2">"{word.example}"</p>
          {word.synonyms.length > 0 && (
            <div className="mt-2">
              <span className="text-xs text-slate-500 uppercase font-bold">Synonyms: </span>
              <span className="text-sm text-slate-300">{word.synonyms.join(", ")}</span>
            </div>
          )}
          {word.collocations.length > 0 && (
            <div>
              <span className="text-xs text-slate-500 uppercase font-bold">Collocations: </span>
              <span className="text-sm text-blue-300">{word.collocations.join(", ")}</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// ── Exercise Component ──
const VocabExercise = ({ words, t }: { words: ToeicWord[]; t: (vi: string, en: string) => string }) => {
  const [questions, setQuestions] = useState<{ word: ToeicWord; options: string[]; correct: number }[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const scoreSavedRef = useRef(false);

  const generate = useCallback(() => {
    const pool = shuffle(words).slice(0, 10);
    const qs = pool.map((w) => {
      const wrong = shuffle(words.filter((x) => x.word !== w.word)).slice(0, 3).map((x) => x.definition.en);
      const opts = shuffle([w.definition.en, ...wrong]);
      return { word: w, options: opts, correct: opts.indexOf(w.definition.en) };
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
          user_id: user.id, score, game_type: "vocab-toeic", max_streak: 0,
          accuracy: questions.length > 0 ? Math.round((score / questions.length) * 100) : 0,
        });
      }
    })();
  }, [finished]);

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="mx-auto mb-4 w-12 h-12 text-blue-400" />
        <p className="text-slate-300 mb-4 text-lg">{t("Trắc nghiệm 10 câu ngẫu nhiên từ ngân hàng từ vựng", "10-question random quiz from the vocabulary bank")}</p>
        <Button onClick={generate} className="bg-blue-600 hover:bg-blue-700 text-white">{t("Bắt đầu", "Start Quiz")}</Button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">{score >= 8 ? "🏆" : score >= 5 ? "👍" : "💪"}</div>
        <h3 className="text-2xl font-bold text-white mb-2">{t("Kết quả", "Result")}: {score}/10</h3>
        <p className="text-slate-400 mb-6 text-lg">
          {score >= 8 ? t("Xuất sắc! Bạn đã nắm vững từ vựng!", "Excellent! You've mastered the vocabulary!") :
            score >= 5 ? t("Khá tốt! Tiếp tục luyện tập nhé!", "Good job! Keep practicing!") :
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

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-base px-3 py-1">{current + 1}/10</Badge>
        <span className="text-slate-400 text-base">{t("Điểm", "Score")}: {score}</span>
      </div>
      <h3 className="text-xl font-bold text-white text-center mb-2">
        {t("Nghĩa của từ", "What does")} <span className="text-blue-400">"{q.word.word}"</span> {t("là gì?", "mean?")}
      </h3>
      <p className="text-center text-slate-500 font-mono text-sm mb-6">{q.word.ipa} · {q.word.wordClass}</p>
      <div className="space-y-3">
        {q.options.map((opt, i) => {
          let cls = "border-slate-600/50 bg-[#1E293B]/60 text-slate-200 hover:border-blue-500/50";
          if (selected !== null) {
            if (i === q.correct) cls = "border-emerald-500 bg-emerald-500/10 text-emerald-300";
            else if (i === selected) cls = "border-red-500 bg-red-500/10 text-red-300";
          }
          return (
            <button
              key={i}
              disabled={selected !== null}
              onClick={() => {
                setSelected(i);
                if (i === q.correct) setScore((s) => s + 1);
                setTimeout(() => {
                  if (current < 9) { setCurrent((c) => c + 1); setSelected(null); }
                  else setFinished(true);
                }, 1200);
              }}
              className={`w-full text-left p-4 rounded-xl border transition-all text-base ${cls}`}
            >
              {selected !== null && i === q.correct && <CheckCircle className="inline w-5 h-5 mr-2" />}
              {selected !== null && i === selected && i !== q.correct && <XCircle className="inline w-5 h-5 mr-2" />}
              {opt}
            </button>
          );
        })}
      </div>
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
  const [mastered, setMastered] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("toeic_mastered");
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch { return new Set<string>(); }
  });

  // Flying stars animation: when user marks a word mastered, a star flies from the
  // star button toward the chibi climber, "feeding" it points.
  const [flyingStars, setFlyingStars] = useState<{ id: number; startX: number; startY: number }[]>([]);
  const starIdRef = useRef(0);

  const handleStarLanded = useCallback((id: number) => {
    setFlyingStars((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const toggleMastered = useCallback((word: string) => {
    setMastered(prev => {
      const next = new Set(prev);
      if (next.has(word)) next.delete(word); else next.add(word);
      localStorage.setItem("toeic_mastered", JSON.stringify([...next]));
      syncMasteredCount("toeic", next.size);
      return next;
    });
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

  // Filtered words
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
    return result;
  }, [activeCategory, activeLevel, search]);

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
                <List className="w-4 h-4" /> {t("Danh sách", "List")}
              </TabsTrigger>
              <TabsTrigger value="flashcard" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-600 dark:text-slate-400 gap-2 text-base">
                <Layers className="w-4 h-4" /> Flashcard
              </TabsTrigger>
              <TabsTrigger value="exercise" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-600 dark:text-slate-400 gap-2 text-base">
                <BookOpen className="w-4 h-4" /> {t("Bài tập", "Exercise")}
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Badge className="bg-blue-500/10 text-blue-300 border border-blue-500/30 text-base px-3 py-1">
            {filtered.length} {t("từ", "words")}
          </Badge>
        </div>

        {/* Filters */}
        {mode !== "exercise" && (
          <div className="space-y-4 mb-8">
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

            {/* Level Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-slate-700 text-sm font-bold uppercase self-center mr-2">{t("Cấp độ", "Level")}:</span>
              {["All", ...TOEIC_LEVELS].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => { setActiveLevel(lvl); setPage(1); }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border shadow-sm ${
                    activeLevel === lvl
                      ? "bg-blue-600 text-white border-blue-500 shadow-blue-300/40"
                      : "bg-white text-slate-700 border-sky-200 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  {lvl === "All" ? t("Tất cả", "All") : levelLabels[lvl]}
                </button>
              ))}
            </div>

            {/* Sort Filter */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-slate-700 text-sm font-bold uppercase self-center mr-2">{t("Sắp xếp", "Sort")}:</span>
              {[
                { key: "default", vi: "Mặc định", en: "Default" },
                { key: "az", vi: "A → Z", en: "A → Z" },
                { key: "za", vi: "Z → A", en: "Z → A" },
                { key: "easy", vi: "Dễ → Khó", en: "Easy → Hard" },
                { key: "hard", vi: "Khó → Dễ", en: "Hard → Easy" },
                { key: "mastered", vi: "Đã thuộc trước", en: "Mastered first" },
                { key: "unmastered", vi: "Chưa thuộc trước", en: "Unmastered first" },
              ].map((s) => (
                <button
                  key={s.key}
                  onClick={() => { setSortBy(s.key as SortKey); setPage(1); }}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all border shadow-sm ${
                    sortBy === s.key
                      ? "bg-emerald-600 text-white border-emerald-500 shadow-emerald-300/40"
                      : "bg-white text-slate-700 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50"
                  }`}
                >
                  {t(s.vi, s.en)}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-slate-700 text-sm font-bold uppercase self-center mr-2">{t("Chủ đề", "Topic")}:</span>
              <button
                onClick={() => { setActiveCategory("All"); setPage(1); }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border shadow-sm ${
                  activeCategory === "All"
                    ? "bg-blue-600 text-white border-blue-500 shadow-blue-300/40"
                    : "bg-white text-slate-700 border-sky-200 hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                {t("Tất cả", "All")} ({categoryStats["All"]})
              </button>
              {TOEIC_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setPage(1); }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border shadow-sm flex items-center gap-2 ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white border-blue-500 shadow-blue-300/40"
                      : "bg-white text-slate-700 border-sky-200 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  {categoryIcons[cat]}
                  <span className="hidden sm:inline">{cat}</span>
                  <span className="sm:hidden">{cat.split(" ")[0]}</span>
                  <span className="text-xs opacity-70">({categoryStats[cat]})</span>
                </button>
              ))}
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
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paged.map((w, i) => {
                    const isMastered = mastered.has(w.word);
                    return (
                      <motion.div
                        key={w.word + w.category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className={`group relative rounded-xl border p-6 shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-xl ${
                          isMastered
                            ? "border-amber-400/70 bg-gradient-to-br from-amber-50 via-yellow-50 to-white dark:from-amber-950/40 dark:via-slate-800 dark:to-slate-900 hover:shadow-amber-300/40"
                            : "border-sky-200 bg-gradient-to-br from-white via-sky-50 to-blue-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 hover:border-blue-400/70 hover:shadow-blue-300/40"
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
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{w.word}</h3>
                            <p className="text-sm text-blue-600 dark:text-blue-200/70 font-mono">{w.ipa}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={`${wordClassColors[w.wordClass]} border text-xs font-bold uppercase`}>{w.wordClass}</Badge>
                            <button onClick={() => speak(w.word)} className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-500/15 transition-colors">
                              <Volume2 className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                            </button>
                          </div>
                        </div>

                        {/* Level & category */}
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={`${levelColors[w.level]} border text-xs`}>{levelLabels[w.level]}</Badge>
                          <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                            {categoryIcons[w.category]}
                            {w.category}
                          </span>
                        </div>

                        {/* Definition */}
                        <p className="text-base text-slate-900 dark:text-[#f8fafc] font-medium mb-1">{w.definition.en}</p>
                        <p className="text-base text-blue-700 dark:text-[#93c5fd] mb-3">{w.definition.vi}</p>

                        {/* Example */}
                        <p className="text-sm text-slate-700 dark:text-[#cbd5e1] italic mb-3">"{w.example}"</p>

                        {/* Synonyms */}
                        {w.synonyms.length > 0 && (
                          <div className="mb-2">
                            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">Synonyms: </span>
                            <span className="text-sm text-slate-700 dark:text-[#cbd5e1]">{w.synonyms.join(", ")}</span>
                          </div>
                        )}

                        {/* Collocations */}
                        {w.collocations.length > 0 && (
                          <div>
                            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">Collocations: </span>
                            <span className="text-sm text-blue-700 dark:text-[#93c5fd]">{w.collocations.join(" · ")}</span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-slate-400 text-base">{page}/{totalPages}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
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
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {paged.map((w) => (
                    <Flashcard key={w.word + w.category} word={w} />
                  ))}
                </div>
              )}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="border-slate-700 text-slate-300">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-slate-400 text-base">{page}/{totalPages}</span>
                  <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="border-slate-700 text-slate-300">
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
        <div className="hidden lg:block w-72 flex-shrink-0 sticky top-24 self-start">
          <VocabMasteryLeaderboard subject="toeic" currentCount={mastered.size} />
        </div>
        </div>
        <div className="lg:hidden mt-6 px-4">
          <VocabMasteryLeaderboard subject="toeic" currentCount={mastered.size} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ToeicVocabulary;
