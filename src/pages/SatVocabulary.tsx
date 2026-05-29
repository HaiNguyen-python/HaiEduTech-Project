import StudyChibisStatic from "@/components/decorations/StudyChibisStatic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Volume2, ChevronLeft, ChevronRight, Layers, List, Star, RotateCcw, BookOpen, CheckCircle, XCircle, Keyboard, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useMasteredMotivation } from "@/hooks/useMasteredMotivation";
import { useLanguage } from "@/contexts/LanguageContext";
import { satVocabData, SAT_LEVELS, SAT_SECTIONS, SAT_CATEGORIES_BY_SECTION, type SatWord } from "@/data/satVocabData";
import SatClimber from "@/components/SatClimber";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameLeaderboard from "@/components/games/GameLeaderboard";
import VocabMasteryLeaderboard from "@/components/VocabMasteryLeaderboard";
import { useMasteredVocab } from "@/hooks/useMasteredVocab";
import StudyStreakLeaderboard from "@/components/StudyStreakLeaderboard";
import SmartReviewColumn from "@/components/SmartReviewColumn";
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

// ── Multi-mode SAT Vocabulary Exercise ──
type SatExType =
  | "meaningVi"
  | "reverse"
  | "listening"
  | "fillBlank"
  | "defEn"
  | "partOfSpeech"
  | "context"
  | "scramble";

interface SatExQuestion {
  type: SatExType;
  word: SatWord;
  prompt: string;
  options: string[];
  correct: number;
}

const SAT_TYPE_LABELS: Record<SatExType, { vi: string; en: string; emoji: string }> = {
  meaningVi: { vi: "Chọn nghĩa tiếng Việt", en: "Choose Vietnamese meaning", emoji: "🇻🇳" },
  reverse: { vi: "Chọn từ theo nghĩa tiếng Việt", en: "Pick the word from meaning", emoji: "🔁" },
  listening: { vi: "Nghe và chọn từ", en: "Listen & choose", emoji: "🎧" },
  fillBlank: { vi: "Điền từ vào chỗ trống", en: "Fill in the blank", emoji: "✏️" },
  defEn: { vi: "Định nghĩa tiếng Anh → từ", en: "English definition → word", emoji: "📖" },
  partOfSpeech: { vi: "Xác định loại từ", en: "Identify the part of speech", emoji: "🏷️" },
  context: { vi: "Câu nào dùng đúng từ này?", en: "Which sentence uses it?", emoji: "💬" },
  scramble: { vi: "Sắp xếp lại chữ cái", en: "Unscramble the letters", emoji: "🔤" },
};

const POS_OPTIONS = ["noun", "verb", "adjective", "adverb"];

const scrambleLetters = (w: string): string => {
  const letters = w.split("");
  if (letters.length < 2) return w;
  for (let i = 0; i < 10; i++) {
    const shuffled = shuffle(letters).join("");
    if (shuffled !== w) return shuffled;
  }
  return letters.reverse().join("");
};

const buildSatQuestions = (words: SatWord[], pool: SatWord[], quizSize: number): SatExQuestion[] => {
  const picked = shuffle(words).slice(0, quizSize);
  return picked.map((w, idx) => {
    const candidates: SatExType[] = ["meaningVi", "reverse", "listening", "defEn", "scramble"];
    if (w.example && w.example.toLowerCase().includes(w.word.toLowerCase())) {
      candidates.push("fillBlank", "context");
    }
    if (w.partOfSpeech && POS_OPTIONS.includes(w.partOfSpeech.toLowerCase())) candidates.push("partOfSpeech");
    const type = candidates[idx % candidates.length];

    if (type === "meaningVi") {
      const wrongs = shuffle(pool.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.definition.vi);
      const opts = shuffle([w.definition.vi, ...wrongs]);
      return { type, word: w, prompt: w.word, options: opts, correct: opts.indexOf(w.definition.vi) };
    }
    if (type === "reverse") {
      const wrongs = shuffle(pool.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.word);
      const opts = shuffle([w.word, ...wrongs]);
      return { type, word: w, prompt: w.definition.vi, options: opts, correct: opts.indexOf(w.word) };
    }
    if (type === "listening") {
      const wrongs = shuffle(pool.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.word);
      const opts = shuffle([w.word, ...wrongs]);
      return { type, word: w, prompt: w.word, options: opts, correct: opts.indexOf(w.word) };
    }
    if (type === "fillBlank") {
      const re = new RegExp(w.word, "ig");
      const blanked = w.example.replace(re, "_____");
      const wrongs = shuffle(pool.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.word);
      const opts = shuffle([w.word, ...wrongs]);
      return { type, word: w, prompt: blanked, options: opts, correct: opts.indexOf(w.word) };
    }
    if (type === "defEn") {
      const wrongs = shuffle(pool.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.word);
      const opts = shuffle([w.word, ...wrongs]);
      return { type, word: w, prompt: w.definition.en, options: opts, correct: opts.indexOf(w.word) };
    }
    if (type === "partOfSpeech") {
      const correct = w.partOfSpeech!.toLowerCase();
      const wrongs = POS_OPTIONS.filter(p => p !== correct).slice(0, 3);
      const opts = shuffle([correct, ...wrongs]);
      return { type, word: w, prompt: w.word, options: opts, correct: opts.indexOf(correct) };
    }
    if (type === "context") {
      const wrongExamples = shuffle(
        pool.filter(x => x.word !== w.word && x.example && !x.example.toLowerCase().includes(w.word.toLowerCase()))
      ).slice(0, 3).map(x => x.example);
      while (wrongExamples.length < 3) wrongExamples.push(shuffle(pool)[0].example);
      const opts = shuffle([w.example, ...wrongExamples]);
      return { type, word: w, prompt: w.word, options: opts, correct: opts.indexOf(w.example) };
    }
    // scramble
    const scrambled = scrambleLetters(w.word);
    const wrongs = shuffle(pool.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.word);
    const opts = shuffle([w.word, ...wrongs]);
    return { type, word: w, prompt: scrambled, options: opts, correct: opts.indexOf(w.word) };
  });
};

const VocabExercise = ({ words, allWords, t, quizSize, setQuizSize }: { words: SatWord[]; allWords?: SatWord[]; t: (vi: string, en: string) => string; quizSize: number; setQuizSize: (n: number) => void }) => {
  const [questions, setQuestions] = useState<SatExQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const scoreSavedRef = useRef(false);
  const autoPlayedRef = useRef<number>(-1);

  const generateQuiz = useCallback(() => {
    if (words.length < 4) return;
    const distractorPool = allWords && allWords.length > 4 ? allWords : words;
    const size = Math.min(quizSize, words.length);
    setQuestions(buildSatQuestions(words, distractorPool, size));
    setCurrent(0); setSelected(null); setScore(0); setFinished(false);
    scoreSavedRef.current = false;
    autoPlayedRef.current = -1;
  }, [words, allWords, quizSize]);

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

  useEffect(() => {
    const q = questions[current];
    if (q && q.type === "listening" && autoPlayedRef.current !== current) {
      autoPlayedRef.current = current;
      const id = setTimeout(() => speak(q.word.word), 250);
      return () => clearTimeout(id);
    }
  }, [current, questions]);

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
    const ratio = score / questions.length;
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">{ratio >= 0.8 ? "🏆" : ratio >= 0.5 ? "👍" : "💪"}</div>
        <h3 className="text-2xl font-bold text-foreground mb-2">{score}/{questions.length}</h3>
        <p className="text-muted-foreground mb-6">
          {ratio >= 0.8 ? t("Xuất sắc! Bạn nắm vững từ vựng rất tốt!", "Excellent! You've mastered these words!")
            : ratio >= 0.5 ? t("Khá tốt! Hãy tiếp tục ôn luyện.", "Good job! Keep practicing.")
              : t("Cần ôn thêm. Hãy thử lại nhé!", "Needs more review. Try again!")}
        </p>
        <Button onClick={generateQuiz} className="gap-2 mb-6"><RotateCcw className="w-4 h-4" /> {t("Làm lại", "Try Again")}</Button>
        <div className="w-full max-w-sm"><GameLeaderboard gameType="vocab-sat" currentScore={score} /></div>
      </div>
    );
  }

  const q = questions[current];
  if (!q) return null;
  const label = SAT_TYPE_LABELS[q.type];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
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
            <p className="text-sm text-muted-foreground">{t("Chọn từ tiếng Anh tương ứng:", "Pick the matching word:")}</p>
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
        ) : q.type === "scramble" ? (
          <>
            <p className="text-xs text-muted-foreground mb-2">{t("Sắp xếp lại các chữ cái:", "Unscramble the letters:")}</p>
            <h3 className="text-3xl font-extrabold tracking-[0.4em] text-primary mb-2 uppercase">{q.prompt}</h3>
            <p className="text-sm text-muted-foreground italic">{t("Gợi ý:", "Hint:")} {q.word.definition.vi}</p>
          </>
        ) : q.type === "partOfSpeech" ? (
          <>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-3xl font-bold text-foreground">{q.word.word}</h3>
              <button onClick={() => speak(q.word.word)} className="p-2 rounded-full hover:bg-primary/10">
                <Volume2 className="w-5 h-5 text-primary" />
              </button>
            </div>
            {q.word.ipa && <p className="text-sm text-muted-foreground" style={{ fontFamily: "Georgia, serif" }}>{q.word.ipa}</p>}
            {q.word.example && <p className="text-sm text-foreground italic mt-2">{renderExample(q.word.example, q.word.word)}</p>}
            <p className="text-sm text-muted-foreground mt-3">{t("Đây là loại từ gì?", "What part of speech is this?")}</p>
          </>
        ) : q.type === "context" ? (
          <>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-3xl font-bold text-foreground">{q.prompt}</h3>
              <button onClick={() => speak(q.word.word)} className="p-2 rounded-full hover:bg-primary/10">
                <Volume2 className="w-5 h-5 text-primary" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground italic mb-1">{q.word.definition.vi}</p>
            <p className="text-sm text-muted-foreground">{t("Câu nào dùng từ này một cách tự nhiên?", "Which sentence uses it naturally?")}</p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-3xl font-bold text-foreground">{q.word.word}</h3>
              <button onClick={() => speak(q.word.word)} className="p-2 rounded-full hover:bg-primary/10">
                <Volume2 className="w-5 h-5 text-primary" />
              </button>
            </div>
            {q.word.ipa && <p className="text-sm text-muted-foreground mb-2" style={{ fontFamily: "Georgia, serif" }}>{q.word.ipa}</p>}
            {q.word.example && <p className="text-sm text-foreground italic">{renderExample(q.word.example, q.word.word)}</p>}
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
        <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <div className="flex justify-between items-center gap-3 flex-wrap">
            <p className="text-sm text-muted-foreground italic">
              <strong className="text-foreground not-italic">{q.word.word}</strong>
              {q.word.partOfSpeech && <span className="text-xs ml-1">({q.word.partOfSpeech})</span>}
              {" — "}{q.word.definition.vi}
            </p>
            <Button onClick={handleNext}>
              {current + 1 >= questions.length ? t("Xem kết quả", "See Results") : t("Câu tiếp", "Next")}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          {q.word.example && q.type !== "fillBlank" && q.type !== "context" && (
            <p className="text-xs text-muted-foreground mt-2 italic">
              <strong className="not-italic font-bold text-primary">E.g. </strong>{q.word.example}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// ── Inline per-card example typing widget ──
const normalize = (s: string) =>
  s.toLowerCase().replace(/[.,!?;:"'()]/g, "").replace(/\s+/g, " ").trim();

const InlineTypeExample = ({ word, t }: { word: SatWord; t: (vi: string, en: string) => string }) => {
  const [input, setInput] = useState("");
  const [revealed, setRevealed] = useState(false);
  if (!word.example) return null;
  const target = word.example;
  const isCorrect = revealed && normalize(input) === normalize(target);

  const reset = () => { setInput(""); setRevealed(false); };

  return (
    <div className="mt-3 pt-3 border-t border-border/60">
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

const SatVocabulary = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [sectionFilter, setSectionFilter] = useState<string>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "flashcard" | "exercise">("list");
  const [quizSize, setQuizSize] = useState<number>(10);

  const availableCategories = useMemo(() => {
    if (sectionFilter === "all") return [...SAT_CATEGORIES_BY_SECTION["Reading & Writing"], ...SAT_CATEGORIES_BY_SECTION["Math"]];
    return SAT_CATEGORIES_BY_SECTION[sectionFilter] || [];
  }, [sectionFilter]);
  useEffect(() => { setCategoryFilter("all"); }, [sectionFilter]);
  const { mastered, toggle: toggleMastered } = useMasteredVocab("sat");
  const [showMasteredOnly, setShowMasteredOnly] = useState(false);
  const [flyingStars, setFlyingStars] = useState<{ id: number; startX: number; startY: number }[]>([]);
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const starIdCounter = useRef(0);

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
      <StudyChibisStatic />
      <div className="pt-24 lg:pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <Link to="/english/sat" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="w-4 h-4" />
            {t("Quay lại SAT Preparation", "Back to SAT Preparation")}
          </Link>
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
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <label className="text-xs text-muted-foreground">{t("Số câu", "Questions")}:</label>
                    <select value={quizSize} onChange={e => setQuizSize(Number(e.target.value))} className="rounded-md border border-border bg-background px-2 py-1 text-xs">
                      {[5, 10, 15, 20, 30, 50, 100, 200].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <VocabExercise words={satVocabData.filter(w => mastered.has(w.word))} allWords={satVocabData} t={t} quizSize={quizSize} setQuizSize={setQuizSize} />
                </div>
              ) : (() => {
                // Group paginated words by category so each lesson/topic has its own section
                const groups = paginated.reduce<Record<string, SatWord[]>>((acc, w) => {
                  (acc[w.category] ||= []).push(w);
                  return acc;
                }, {});
                const allCats = [...SAT_CATEGORIES_BY_SECTION["Reading & Writing"], ...SAT_CATEGORIES_BY_SECTION["Math"]];
                const orderedCats = allCats.filter(c => groups[c]);
                Object.keys(groups).forEach(c => { if (!orderedCats.includes(c)) orderedCats.push(c); });

                return (
                  <div className="space-y-8">
                    {orderedCats.map(cat => (
                      <section key={cat}>
                        <div className="flex items-baseline gap-3 mb-3 border-b border-border/60 pb-1.5">
                          <h3 className="text-lg font-bold text-primary">
                            <span className="mr-1.5">{iconFor(cat)}</span>{cat}
                          </h3>
                          <span className="text-xs text-muted-foreground">{groups[cat].length} {t("từ", "words")}</span>
                        </div>

                        {viewMode === "flashcard" ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            <AnimatePresence mode="popLayout">
                              {groups[cat].map(w => (
                                <motion.div key={w.word + w.category} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                                  <Flashcard word={w} isMastered={mastered.has(w.word)} onStar={handleStarClick} />
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {groups[cat].map(w => (
                              <motion.div
                                key={w.word + w.category}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group min-w-0 h-full rounded-xl bg-white dark:bg-card hover:shadow-xl transition-all duration-300"
                                style={{ padding: "1rem 1.1rem", border: "4px solid hsl(var(--primary) / 0.85)", boxShadow: "0 6px 18px -4px hsl(var(--primary) / 0.35), inset 0 0 0 1px hsl(var(--primary) / 0.25)", borderRadius: "0.85rem" }}

                              >
                                <div className="mb-1.5 min-w-0 flex items-start gap-2">
                                  <div className="min-w-0 flex-1">
                                    <h4 className="break-words font-extrabold" style={{ fontSize: "1.2rem", color: "#111827", lineHeight: 1.25 }}>
                                      <span className="mr-1">{iconFor(w.category)}</span>{w.word}
                                    </h4>
                                    {w.ipa && (
                                      <p className="break-words font-mono" style={{ fontSize: "0.78rem", color: "#6b7280" }}>{w.ipa}</p>
                                    )}
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
                                        <Star size={16}
                                          className={mastered.has(w.word) ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]" : ""}
                                          style={mastered.has(w.word) ? {} : { color: "#4b5563" }}
                                        />
                                      </motion.button>
                                    </div>
                                  </div>
                                </div>

                                <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                                  <Badge className={levelColors[w.level] + " text-[10px] px-1.5 py-0"}>{w.level}</Badge>
                                  {w.partOfSpeech && <Badge variant="secondary" className="text-[10px] px-1.5 py-0 italic">{w.partOfSpeech}</Badge>}
                                  <Badge className={(w.section === "Math" ? "bg-orange-500/20 text-orange-500" : "bg-blue-500/20 text-blue-500") + " text-[10px] px-1.5 py-0"}>
                                    {w.section === "Math" ? "📐 Math" : "📖 R&W"}
                                  </Badge>
                                </div>

                                <p className="min-w-0 break-words font-bold whitespace-normal" style={{ fontSize: "1rem", color: "#1d4ed8", lineHeight: 1.45 }}>{w.definition.vi}</p>

                                {w.example && (
                                  <p className="mt-1.5 min-w-0 break-words italic whitespace-normal" style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.5 }}>{renderExample(w.example, w.word)}</p>
                                )}
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
      <SmartReviewColumn
        subject="sat"
        lang="en-US"
        lookupWord={(w) => {
          const found = satVocabData.find(x => x.word === w);
          if (!found) return null;
          return {
            word: found.word,
            phonetic: found.ipa,
            definitionVi: found.definition.vi,
            definitionEn: found.definition.en,
          };
        }}
        allWordsForQuiz={satVocabData.map(w => ({ word: w.word, definition: w.definition.vi }))}
      />
      <Footer />
    </div>
  );
};

export default SatVocabulary;
