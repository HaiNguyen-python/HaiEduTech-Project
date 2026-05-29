import StudyChibisStatic from "@/components/decorations/StudyChibisStatic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Volume2, ChevronLeft, ChevronRight, Layers, List, Star, RotateCcw, BookOpen, CheckCircle, XCircle, Dumbbell } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { hskVocabData, HSK_LEVELS, HSK_CATEGORIES, type HskWord } from "@/data/hskVocab";
import HanziStrokeOrder from "@/components/HanziStrokeOrder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GreatWallClimber from "@/components/GreatWallClimber";
import { useMasteredMotivation } from "@/hooks/useMasteredMotivation";
import GameLeaderboard from "@/components/games/GameLeaderboard";
import VocabMasteryLeaderboard from "@/components/VocabMasteryLeaderboard";
import { useMasteredVocab } from "@/hooks/useMasteredVocab";
import KangxiRadicalsBrowser from "@/components/KangxiRadicalsBrowser";
import HskExamplePractice from "@/components/HskExamplePractice";
import HskMnemonic from "@/components/HskMnemonic";
import HskExampleTranslation from "@/components/HskExampleTranslation";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "react-router-dom";

const WORDS_PER_PAGE = 12;

// Level color mapping for HSK levels
const levelColors: Record<string, string> = {
  "HSK 1": "bg-green-500/20 text-green-400",
  "HSK 2": "bg-emerald-500/20 text-emerald-400",
  "HSK 3": "bg-blue-500/20 text-blue-400",
  "HSK 4": "bg-indigo-500/20 text-indigo-400",
  "HSK 5": "bg-purple-500/20 text-purple-400",
  "HSK 6": "bg-rose-500/20 text-rose-400",
  "HSK 7-9": "bg-amber-500/20 text-amber-400",
};

// Text-to-Speech helper for Mandarin
const speakChinese = (text: string) => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN";
    u.rate = 0.6;
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

// Render multi-character Chinese words by splitting into individual characters
// (hanzi-writer can only animate one character per instance)
const HanziWord = ({ characters, size }: { characters: string; size: number }) => {
  const chars = Array.from(characters); // supports surrogate pairs
  const perCharSize = chars.length >= 3 ? Math.floor(size * 0.72) : size;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-end justify-center gap-0">
        {chars.map((c, i) => (
          <HanziStrokeOrder key={i} character={c} size={perCharSize} compact />
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground">Click ký tự để xem lại nét bút</p>
    </div>
  );
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
        {/* Front - Show Hanzi (stroke order) + Pinyin */}
        <div className="absolute inset-0 rounded-xl border border-border bg-card p-6 flex flex-col items-center justify-center gap-2" style={{ backfaceVisibility: "hidden" }}>
          <HanziWord characters={word.character} size={110} />
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
            <HskExampleTranslation example={word.example} />
          </div>
          <Badge variant="outline" className="w-fit mt-1 text-xs">{word.category}</Badge>
        </div>
      </motion.div>
    </div>
  );
};

// MCQ Exercise component for HSK vocabulary
// Only quizzes words the user has marked as mastered (starred).
// Mixes 6 question modes (meaning, hanzi, pinyin, listen, fill, example)
// to keep practice varied. Distractors are drawn from the full HSK bank.
type QuizMode = "meaning" | "hanzi" | "pinyin" | "listen" | "fill" | "example";

interface QuizQuestion {
  word: HskWord;
  mode: QuizMode;
  options: string[];
  correct: number;
}

const HskExercise = ({ masteredWords, t }: { masteredWords: HskWord[]; t: (vi: string, en: string) => string }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const scoreSavedRef = useRef(false);
  const [quizSize, setQuizSize] = useState<number>(10);
  const autoPlayedRef = useRef<number>(-1);

  const generateQuiz = useCallback(() => {
    if (masteredWords.length < 4) {
      setQuestions([]);
      setFinished(false);
      return;
    }
    const size = Math.min(quizSize, masteredWords.length);
    const picked = shuffle(masteredWords).slice(0, size);
    const distractorPool = hskVocabData;
    const modes: QuizMode[] = ["meaning", "hanzi", "pinyin", "listen", "fill", "example"];

    const qs: QuizQuestion[] = picked.map((w, i) => {
      // Rotate through modes so each quiz covers all skills
      const mode = modes[i % modes.length];
      let correctVal = "";
      let pool: string[] = [];

      switch (mode) {
        case "meaning":
        case "example": {
          correctVal = w.definition.vi;
          pool = distractorPool
            .filter(x => x.character !== w.character && x.definition.vi !== w.definition.vi)
            .map(x => x.definition.vi);
          break;
        }
        case "hanzi":
        case "fill":
        case "listen": {
          correctVal = w.character;
          pool = distractorPool
            .filter(x => x.character !== w.character && x.character.length === w.character.length)
            .map(x => x.character);
          if (pool.length < 3) {
            pool = distractorPool.filter(x => x.character !== w.character).map(x => x.character);
          }
          break;
        }
        case "pinyin": {
          correctVal = w.pinyin;
          pool = distractorPool
            .filter(x => x.character !== w.character && x.pinyin !== w.pinyin)
            .map(x => x.pinyin);
          break;
        }
      }

      const wrongs = shuffle(Array.from(new Set(pool))).slice(0, 3);
      const allOpts = shuffle([correctVal, ...wrongs]);
      return { word: w, mode, options: allOpts, correct: allOpts.indexOf(correctVal) };
    });

    setQuestions(shuffle(qs));
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    scoreSavedRef.current = false;
    autoPlayedRef.current = -1;
  }, [masteredWords, quizSize]);

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

  // Auto-play audio when a "listen" question first appears
  useEffect(() => {
    const q = questions[current];
    if (q && q.mode === "listen" && autoPlayedRef.current !== current) {
      autoPlayedRef.current = current;
      const id = setTimeout(() => speakChinese(q.word.character), 250);
      return () => clearTimeout(id);
    }
  }, [current, questions]);

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

  if (masteredWords.length < 4) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center max-w-md mx-auto">
        <Star className="w-12 h-12 text-yellow-400 mb-3" />
        <h3 className="text-xl font-bold text-foreground mb-2">
          {t("Cần đánh dấu sao ít nhất 4 từ", "Star at least 4 words first")}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {t(
            `Bài tập chỉ hỏi những từ bạn đã đánh dấu ⭐ là đã học. Hiện tại bạn có ${masteredWords.length}/4 từ đã đánh dấu.`,
            `Quiz only asks words you have starred ⭐ as learned. You currently have ${masteredWords.length}/4 starred words.`
          )}
        </p>
        <p className="text-xs text-muted-foreground">
          {t("👉 Quay lại chế độ Danh sách và nhấn ⭐ vào các từ bạn đã học.", "👉 Switch back to List mode and tap ⭐ on words you've learned.")}
        </p>
      </div>
    );
  }

  if (questions.length === 0) return <p className="text-muted-foreground text-center py-12">{t("Đang chuẩn bị câu hỏi...", "Preparing questions...")}</p>;

  const mascotMessages = [
    { emoji: "🏆", vi: "太棒 rồi! Bạn xuất sắc lắm!", en: "太棒了! Excellent work!" },
    { emoji: "👍", vi: "不错 đó! Tiếp tục cố gắng nhé!", en: "不错! Keep going!" },
    { emoji: "💪", vi: "加油 nào! Hãy ôn lại và thử lại!", en: "加油! Review and try again!" },
  ];

  if (finished) {
    const ratio = score / questions.length;
    const msg = ratio >= 0.8 ? mascotMessages[0] : ratio >= 0.5 ? mascotMessages[1] : mascotMessages[2];
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">{msg.emoji}</div>
        <h3 className="text-2xl font-bold text-foreground mb-2">{score}/{questions.length}</h3>
        <p className="text-muted-foreground mb-2">{t(msg.vi, msg.en)}</p>
        <div className="mt-2 mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20 max-w-sm">
          <p className="text-sm font-medium text-primary">
            🎓 Teacher Hai: {ratio >= 0.8 ? "你真厉害！继续保持！" : ratio >= 0.5 ? "还不错，再加把劲！" : "别灰心，多练习就会进步的！"}
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

  const modeBadge: Record<QuizMode, { label: string; emoji: string }> = {
    meaning: { label: t("Chọn nghĩa", "Choose meaning"), emoji: "📖" },
    hanzi: { label: t("Chọn chữ Hán", "Choose Hanzi"), emoji: "✍️" },
    pinyin: { label: t("Chọn Pinyin", "Choose Pinyin"), emoji: "🔤" },
    listen: { label: t("Nghe & chọn chữ", "Listen & choose"), emoji: "🎧" },
    fill: { label: t("Điền vào chỗ trống", "Fill in the blank"), emoji: "✏️" },
    example: { label: t("Nghĩa trong câu", "Meaning in context"), emoji: "💬" },
  };

  const blankedExample = q.mode === "fill"
    ? q.word.example.replace(q.word.character, "＿＿＿")
    : q.word.example;

  const questionLabel: Record<QuizMode, string> = {
    meaning: t("Chọn nghĩa đúng:", "Choose the correct meaning:"),
    hanzi: t("Chữ Hán nào đúng?", "Which Hanzi is correct?"),
    pinyin: t("Pinyin nào đúng?", "Which Pinyin is correct?"),
    listen: t("Bạn nghe được chữ nào?", "Which character did you hear?"),
    fill: t("Chữ nào điền vào chỗ trống?", "Which character fills the blank?"),
    example: t("Nghĩa của từ in đậm là gì?", "What does the highlighted word mean?"),
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 text-sm">
          <label className="text-muted-foreground">{t("Số câu hỏi:", "Questions:")}</label>
          <select
            value={quizSize}
            onChange={(e) => setQuizSize(Number(e.target.value))}
            className="rounded-md border border-border bg-card px-2 py-1 text-sm"
          >
            {[5, 10, 15, 20, 30, 50, 100, 200].map(n => (
              <option key={n} value={n} disabled={n > masteredWords.length && n !== 5}>
                {n} {n > masteredWords.length ? `(${t("chỉ có", "only")} ${masteredWords.length})` : ""}
              </option>
            ))}
          </select>
          <Button size="sm" variant="outline" onClick={generateQuiz} className="ml-2">
            <RotateCcw className="w-3 h-3 mr-1" /> {t("Tạo mới", "New quiz")}
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{t("Câu", "Question")} {current + 1}/{questions.length}</span>
          <span className="text-sm font-semibold text-primary">{t("Điểm", "Score")}: {score}</span>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card px-4 py-3 mb-3">
        <Badge variant="secondary" className="mb-2 text-xs">
          {modeBadge[q.mode].emoji} {modeBadge[q.mode].label}
        </Badge>

        {q.mode === "meaning" && (
          <>
            <div className="flex items-center gap-3">
              <h3 className="text-3xl font-bold text-foreground">{q.word.character}</h3>
              <button onClick={() => speakChinese(q.word.character)} className="p-1.5 rounded-full hover:bg-primary/10">
                <Volume2 className="w-5 h-5 text-primary" />
              </button>
              <p className="text-base text-primary font-medium">{q.word.pinyin}</p>
            </div>
            <div className="px-3 py-2 rounded-lg bg-secondary/50 mt-2">
              <p className="text-base font-bold text-foreground">{q.word.example}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{q.word.examplePinyin}</p>
              <HskExampleTranslation example={q.word.example} />
            </div>
          </>
        )}

        {q.mode === "hanzi" && (
          <div className="py-2">
            <p className="text-sm text-muted-foreground mb-1">{t("Nghĩa:", "Meaning:")}</p>
            <p className="text-xl font-bold text-foreground">{q.word.definition.vi}</p>
            <p className="text-sm text-primary mt-1">🔤 {q.word.pinyin}</p>
          </div>
        )}

        {q.mode === "pinyin" && (
          <div className="py-2 flex items-center gap-3 flex-wrap">
            <h3 className="text-4xl font-bold text-foreground">{q.word.character}</h3>
            <button onClick={() => speakChinese(q.word.character)} className="p-1.5 rounded-full hover:bg-primary/10">
              <Volume2 className="w-5 h-5 text-primary" />
            </button>
            <p className="text-base text-muted-foreground">— {q.word.definition.vi}</p>
          </div>
        )}

        {q.mode === "listen" && (
          <div className="py-4 flex flex-col items-center gap-3">
            <button
              onClick={() => speakChinese(q.word.character)}
              className="w-16 h-16 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all"
              aria-label={t("Phát lại", "Replay")}
            >
              <Volume2 className="w-8 h-8 text-primary" />
            </button>
            <p className="text-xs text-muted-foreground">{t("Bấm để nghe lại", "Tap to replay")}</p>
          </div>
        )}

        {q.mode === "fill" && (
          <>
            <p className="text-sm text-muted-foreground mb-1">
              {t("Nghĩa:", "Meaning:")} <span className="text-foreground font-semibold">{q.word.definition.vi}</span>
            </p>
            <div className="px-3 py-3 rounded-lg bg-secondary/50 mt-2">
              <p className="text-lg font-bold text-foreground">{blankedExample}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{q.word.examplePinyin.replace(q.word.pinyin, "___")}</p>
            </div>
          </>
        )}

        {q.mode === "example" && (
          <>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold text-foreground">{q.word.character}</h3>
              <button onClick={() => speakChinese(q.word.example)} className="p-1.5 rounded-full hover:bg-primary/10">
                <Volume2 className="w-5 h-5 text-primary" />
              </button>
            </div>
            <div className="px-3 py-2 rounded-lg bg-secondary/50 mt-2">
              <p className="text-base font-bold text-foreground">{q.word.example}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{q.word.examplePinyin}</p>
            </div>
          </>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-2">{questionLabel[q.mode]}</p>
      <div className="space-y-2">
        {q.options.map((opt, idx) => {
          const isHanziOption = q.mode === "hanzi" || q.mode === "fill" || q.mode === "listen";
          let cls = "rounded-lg border p-2.5 cursor-pointer transition-all text-foreground ";
          cls += isHanziOption ? "text-lg font-semibold " : "text-sm ";
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
        <div className="mt-6 space-y-3">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-2xl font-bold text-foreground">{q.word.character}</span>
              <span className="text-sm text-primary font-medium">{q.word.pinyin}</span>
              <span className="text-sm text-muted-foreground">— {q.word.definition.vi}</span>
            </div>
            <p className="text-sm text-foreground mt-1">{q.word.example}</p>
            <p className="text-xs text-muted-foreground italic">{q.word.definition.en}</p>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleNext}>
              {current + 1 >= questions.length ? t("Xem kết quả", "See Results") : t("Câu tiếp", "Next")}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const HskVocabulary = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "radicals" ? "radicals" : "vocabulary";
  const [activeTab, setActiveTab] = useState<"vocabulary" | "radicals">(initialTab);
  // Keep tab and URL in sync (so deep-links from the navbar open the right tab).
  useEffect(() => {
    const urlTab = searchParams.get("tab") === "radicals" ? "radicals" : "vocabulary";
    if (urlTab !== activeTab) setActiveTab(urlTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  const handleTabChange = (v: string) => {
    const next = v === "radicals" ? "radicals" : "vocabulary";
    setActiveTab(next);
    const params = new URLSearchParams(searchParams);
    if (next === "radicals") params.set("tab", "radicals");
    else params.delete("tab");
    setSearchParams(params, { replace: true });
  };
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "flashcard" | "exercise">("list");
  const { mastered, toggle: toggleMasteredHook } = useMasteredVocab("hsk");
  const [showMasteredOnly, setShowMasteredOnly] = useState(false);

  // Flying stars state for Great Wall Climber
  const [flyingStars, setFlyingStars] = useState<{ id: number; startX: number; startY: number }[]>([]);
  const starIdRef = useRef(0);
  const climberContainerRef = useRef<HTMLDivElement>(null);

  const toggleMastered = toggleMasteredHook;

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
      <SEO title="1100+ Từ Vựng HSK 1-6 Có Pinyin & Phát Âm | HaiEduTech" description="Ngân hàng từ vựng HSK 1 đến HSK 6 với Pinyin, dịch nghĩa, phát âm, viết Hanzi tương tác. Học theo flashcard, quiz, gamified với Great Wall Climber." path="/chinese/hsk/vocabulary" />
      <Navbar />
      <StudyChibisStatic />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="vocabulary">{t("Từ vựng HSK", "HSK Vocabulary")}</TabsTrigger>
              <TabsTrigger value="radicals">{t("214 Bộ thủ Khang Hi", "214 Kangxi Radicals")}</TabsTrigger>
            </TabsList>
            <TabsContent value="vocabulary">
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
                  `${hskVocabData.length} từ vựng HSK 1-6 - Lọc theo cấp độ, flashcard, luyện tập, phát âm`,
                  `${hskVocabData.length} HSK 1-6 words - Filter by level, flashcard, exercises, pronunciation`
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
              <div className="relative w-[200px] sm:w-[220px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={t("Tìm Hán tự, Pinyin...", "Search Hanzi, Pinyin...")}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none text-sm"
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
              <Tabs value={viewMode} onValueChange={v => setViewMode(v as "list" | "flashcard" | "exercise")}>
                <TabsList>
                  <TabsTrigger value="list" className="gap-1.5 px-4"><List className="w-4 h-4" /> {t("Từ vựng", "Vocabulary")}</TabsTrigger>
                  <TabsTrigger value="flashcard" className="gap-1.5 px-4"><Layers className="w-4 h-4" /> Flashcard</TabsTrigger>
                  <TabsTrigger value="exercise" className="gap-1.5 px-4"><Dumbbell className="w-4 h-4" /> {t("Luyện tập", "Practice")}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <p className="text-xs text-muted-foreground mb-4">{filtered.length} {t("kết quả", "results")}</p>

            {/* Content based on mode */}
            {viewMode === "exercise" ? (
              <HskExercise masteredWords={hskVocabData.filter(w => mastered.has(w.character))} t={t} />
            ) : (() => {
              const groups = paginated.reduce<Record<string, HskWord[]>>((acc, w) => {
                (acc[w.category] ||= []).push(w);
                return acc;
              }, {});
              const orderedCats = (HSK_CATEGORIES as readonly string[]).filter(c => groups[c]) as string[];
              Object.keys(groups).forEach(c => { if (!orderedCats.includes(c)) orderedCats.push(c); });

              return (
                <div className="space-y-8">
                  {orderedCats.map(cat => (
                    <section key={cat}>
                      <div className="flex items-baseline gap-3 mb-3 border-b border-border/60 pb-1.5">
                        <h3 className="text-lg font-bold text-primary">{cat}</h3>
                        <span className="text-xs text-muted-foreground">{groups[cat].length} {t("từ", "words")}</span>
                      </div>

                      {viewMode === "flashcard" ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          <AnimatePresence mode="popLayout">
                            {groups[cat].map(w => (
                              <motion.div key={w.character + w.category} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                                <HskFlashcard word={w} />
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {groups[cat].map(w => (
                            <div key={w.character + w.category} className="rounded-xl border-[3px] border-primary/40 bg-card overflow-hidden hover:border-primary/70 shadow-sm hover:shadow-md transition-all">
                              {/* Stroke order area */}
                              <div className="bg-secondary/30 flex items-center justify-center p-2">
                                <HanziWord characters={w.character} size={64} />
                              </div>
                              <div className="p-4">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <p className="text-lg text-primary font-bold">{w.pinyin}</p>
                                  <div className="flex items-center gap-0.5">
                                    <button onClick={() => speakChinese(w.character)} className="p-1.5 rounded-md hover:bg-primary/10 transition-colors">
                                      <Volume2 className="w-4 h-4 text-primary" />
                                    </button>
                                    <button onClick={(e) => handleStarClick(w.character, e)} className="p-1.5 rounded-md hover:bg-yellow-500/10 transition-colors">
                                      <Star className={`w-4 h-4 ${mastered.has(w.character) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`} />
                                    </button>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 mb-2">
                                  <Badge className={levelColors[w.level] + " text-xs px-2 py-0.5"}>{w.level}</Badge>
                                </div>
                                <p className="text-base text-foreground font-semibold leading-snug">{w.definition.en}</p>
                                <p className="text-base text-primary font-medium leading-snug">{w.definition.vi}</p>
                                <div className="mt-2 p-3 rounded-lg bg-secondary/50">
                                  <p className="text-lg font-bold text-foreground leading-snug">{w.example}</p>
                                  <p className="text-sm text-muted-foreground mt-1">{w.examplePinyin}</p>
                                  <HskExampleTranslation example={w.example} />
                                </div>
                                <HskExamplePractice example={w.example} examplePinyin={w.examplePinyin} />
                                <HskMnemonic character={w.character} pinyin={w.pinyin} meaning={w.definition.vi} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </section>
                  ))}
                </div>
              );
            })()}

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
            </TabsContent>
            <TabsContent value="radicals">
              <KangxiRadicalsBrowser />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <SmartReviewColumn
        subject="hsk"
        lang="zh-CN"
        lookupWord={(w) => {
          const found = hskVocabData.find(x => x.character === w);
          if (!found) return null;
          return {
            word: found.character,
            phonetic: found.pinyin,
            definitionVi: found.definition.vi,
            definitionEn: found.definition.en,
          };
        }}
        allWordsForQuiz={hskVocabData.map(w => ({ word: w.character, definition: w.definition.vi }))}
      />
      <Footer />
    </div>
  );
};

export default HskVocabulary;
