/**
 * @file CambridgeYleExercises.tsx
 * @description Interactive exercises for Cambridge YLE Vocabulary.
 * Two modes: Multiple Choice (EN→VI) and Fill-in-the-Blank.
 * Auto-generated from the current level's word bank.
 */
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, CheckCircle2, XCircle, RotateCcw, Trophy, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import type { CambridgeKidsLevel, CambridgeKidsWord } from "@/data/cambridgeKidsVocab";

type ExMode = "mc" | "blank";
type Theme = { color: string; soft: string; gradient: string };

const NUM_QUESTIONS = 10;

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const speak = (text: string, rate = 0.9) => {
  try {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = rate;
    window.speechSynthesis.speak(u);
  } catch { /* noop */ }
};

interface MCQuestion {
  type: "mc";
  word: CambridgeKidsWord;
  options: string[]; // Vietnamese options
  correctIndex: number;
}
interface BlankQuestion {
  type: "blank";
  word: CambridgeKidsWord;
  sentence: string; // with ___ replacing the word
  fullExample: string;
}
type Question = MCQuestion | BlankQuestion;

const buildMC = (words: CambridgeKidsWord[]): MCQuestion[] => {
  const picked = shuffle(words).slice(0, NUM_QUESTIONS);
  return picked.map(w => {
    const distractors = shuffle(words.filter(x => x.vi !== w.vi)).slice(0, 3).map(x => x.vi);
    const options = shuffle([w.vi, ...distractors]);
    return { type: "mc" as const, word: w, options, correctIndex: options.indexOf(w.vi) };
  });
};

const buildBlank = (words: CambridgeKidsWord[]): BlankQuestion[] => {
  const eligible = words.filter(w => w.example && new RegExp(`\\b${w.word}\\b`, "i").test(w.example!));
  const picked = shuffle(eligible.length >= NUM_QUESTIONS ? eligible : words).slice(0, NUM_QUESTIONS);
  return picked.map(w => {
    const ex = w.example || `A ${w.word} is great.`;
    const re = new RegExp(`\\b${w.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:s|es|ed|ing)?\\b`, "i");
    const sentence = ex.replace(re, "_____");
    return { type: "blank" as const, word: w, sentence, fullExample: ex };
  });
};

interface Props {
  level: CambridgeKidsLevel;
  words: CambridgeKidsWord[];
  theme: Theme;
}

const CambridgeYleExercises = ({ level, words, theme }: Props) => {
  const { t } = useLanguage();
  const [mode, setMode] = useState<ExMode>("mc");
  const [seed, setSeed] = useState(0); // bump to regenerate
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [typed, setTyped] = useState("");
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const questions: Question[] = useMemo(() => {
    if (words.length < 4) return [];
    return mode === "mc" ? buildMC(words) : buildBlank(words);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, words, seed, level]);

  // Reset when mode/level changes
  useEffect(() => {
    setCurrent(0); setSelected(null); setTyped(""); setAnswered(false); setScore(0); setStreak(0);
  }, [mode, seed, level]);

  if (words.length < 4) {
    return (
      <div className="text-center py-12 text-slate-600">
        {t("Cần ít nhất 4 từ để luyện bài tập.", "At least 4 words needed for exercises.")}
      </div>
    );
  }

  const q = questions[current];
  const isLast = current === questions.length - 1;
  const finished = answered && isLast;

  const checkBlank = () => {
    if (q.type !== "blank") return false;
    const ans = typed.trim().toLowerCase();
    const target = q.word.word.toLowerCase();
    // Accept exact match or simple inflections
    return ans === target ||
      ans === target + "s" || ans === target + "es" || ans === target + "ed" || ans === target + "ing" ||
      target === ans + "s" || target === ans + "es";
  };

  const submitMC = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const correct = q.type === "mc" && idx === q.correctIndex;
    if (correct) { setScore(s => s + 1); setStreak(s => s + 1); } else { setStreak(0); }
  };

  const submitBlank = () => {
    if (answered || !typed.trim()) return;
    setAnswered(true);
    const correct = checkBlank();
    if (correct) { setScore(s => s + 1); setStreak(s => s + 1); } else { setStreak(0); }
  };

  const next = () => {
    setCurrent(c => Math.min(c + 1, questions.length - 1));
    setSelected(null); setTyped(""); setAnswered(false);
  };

  const restart = () => setSeed(s => s + 1);

  // Finished screen
  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl p-8 text-center border-4 border-white shadow-xl"
        style={{ background: theme.gradient }}
      >
        <div className="text-6xl mb-3">{pct >= 80 ? "🏆" : pct >= 50 ? "🌟" : "💪"}</div>
        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
          {pct >= 80 ? t("Xuất sắc!", "Excellent!") : pct >= 50 ? t("Khá tốt!", "Nice work!") : t("Cố lên nào!", "Keep trying!")}
        </h3>
        <p className="text-lg font-bold text-slate-800 mb-1">
          {t("Bạn đúng", "You got")} <span className="text-2xl">{score}/{questions.length}</span> ({pct}%)
        </p>
        <p className="text-sm text-slate-700 mb-6">
          {t("Cấp độ", "Level")}: <strong>{level}</strong> · {mode === "mc" ? t("Trắc nghiệm", "Multiple Choice") : t("Điền vào chỗ trống", "Fill in the Blank")}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button onClick={restart} className="rounded-full font-bold" style={{ background: theme.color, color: "white" }}>
            <RotateCcw className="w-4 h-4 mr-2" />
            {t("Làm lại bộ mới", "New Set")}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mode + score header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white border-2 shadow-sm" style={{ borderColor: theme.color }}>
        <div className="flex gap-2">
          <button
            onClick={() => setMode("mc")}
            className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all"
            style={{
              background: mode === "mc" ? theme.gradient : "#F1F5F9",
              color: mode === "mc" ? "#0F172A" : "#475569",
              border: `2px solid ${mode === "mc" ? theme.color : "#E2E8F0"}`,
            }}
          >
            🎯 {t("Trắc nghiệm", "Multiple Choice")}
          </button>
          <button
            onClick={() => setMode("blank")}
            className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all"
            style={{
              background: mode === "blank" ? theme.gradient : "#F1F5F9",
              color: mode === "blank" ? "#0F172A" : "#475569",
              border: `2px solid ${mode === "blank" ? theme.color : "#E2E8F0"}`,
            }}
          >
            ✍️ {t("Điền từ", "Fill Blank")}
          </button>
        </div>
        <div className="flex items-center gap-3 text-sm font-bold">
          <span className="flex items-center gap-1 text-slate-700">
            <Sparkles className="w-4 h-4" style={{ color: theme.color }} />
            {t("Câu", "Q")} {current + 1}/{questions.length}
          </span>
          <span className="flex items-center gap-1 text-emerald-600">
            <Trophy className="w-4 h-4" /> {score}
          </span>
          {streak >= 2 && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-700">
              🔥 {streak}
            </span>
          )}
        </div>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current + ":" + mode + ":" + seed}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl p-5 md:p-6 border-2 shadow-md bg-white"
          style={{ borderColor: theme.color }}
        >
          {q.type === "mc" ? (
            <>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                {t("Từ này nghĩa là gì?", "What does this word mean?")}
              </p>
              <div className="flex items-center gap-3 mb-5">
                <div className="text-5xl">{q.word.emoji}</div>
                <div className="flex-1">
                  <p className="text-3xl font-extrabold text-slate-900">{q.word.word}</p>
                </div>
                <button
                  onClick={() => speak(q.word.word, 0.85)}
                  className="p-2.5 rounded-full hover:bg-slate-100"
                  style={{ color: theme.color }}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, i) => {
                  const isCorrect = i === q.correctIndex;
                  const isPicked = i === selected;
                  let bg = "white", border = "#E2E8F0", color = "#0F172A";
                  if (answered) {
                    if (isCorrect) { bg = "#10B98115"; border = "#10B981"; color = "#065F46"; }
                    else if (isPicked) { bg = "#EF444415"; border = "#EF4444"; color = "#991B1B"; }
                  } else {
                    border = theme.color + "55";
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => submitMC(i)}
                      disabled={answered}
                      className="text-left px-4 py-3 rounded-2xl font-bold text-base transition-all flex items-center justify-between gap-2"
                      style={{ background: bg, border: `2px solid ${border}`, color }}
                    >
                      <span>{opt}</span>
                      {answered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                      {answered && isPicked && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                {t("Điền từ thích hợp vào chỗ trống", "Fill in the missing word")}
              </p>
              <div className="text-4xl mb-2">{q.word.emoji}</div>
              <p className="text-xl md:text-2xl font-bold text-slate-900 mb-1 leading-relaxed">
                {q.sentence}
              </p>
              <p className="text-sm text-slate-600 italic mb-4">{q.word.exampleVi}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                <Input
                  value={typed}
                  onChange={e => setTyped(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") submitBlank(); }}
                  placeholder={t("Nhập từ tiếng Anh...", "Type the English word...")}
                  disabled={answered}
                  className="flex-1 min-w-[200px] h-12 text-lg font-bold bg-white border-2"
                  style={{ borderColor: theme.color }}
                />
                {!answered && (
                  <Button
                    onClick={submitBlank}
                    disabled={!typed.trim()}
                    className="h-12 px-6 font-bold rounded-xl"
                    style={{ background: theme.color, color: "white" }}
                  >
                    {t("Kiểm tra", "Check")}
                  </Button>
                )}
              </div>

              {answered && (
                <div
                  className="rounded-2xl px-4 py-3 mt-2"
                  style={{
                    background: checkBlank() ? "#10B98115" : "#EF444415",
                    border: `2px solid ${checkBlank() ? "#10B981" : "#EF4444"}`,
                  }}
                >
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {checkBlank() ? (
                      <><CheckCircle2 className="w-5 h-5 text-emerald-600" /><span className="text-emerald-700">{t("Chính xác!", "Correct!")}</span></>
                    ) : (
                      <><XCircle className="w-5 h-5 text-red-600" /><span className="text-red-700">{t("Chưa đúng. Đáp án:", "Not quite. Answer:")} <u>{q.word.word}</u></span></>
                    )}
                  </div>
                  <p className="text-sm text-slate-800">
                    <strong>{q.fullExample}</strong>
                  </p>
                  <button
                    onClick={() => speak(q.fullExample, 0.85)}
                    className="mt-1 inline-flex items-center gap-1 text-xs font-bold"
                    style={{ color: theme.color }}
                  >
                    <Volume2 className="w-3.5 h-3.5" /> {t("Nghe câu", "Listen")}
                  </button>
                </div>
              )}
            </>
          )}

          {/* Next button */}
          {answered && (
            <div className="mt-5 flex justify-end">
              <Button
                onClick={next}
                className="rounded-full font-bold px-6"
                style={{ background: theme.color, color: "white" }}
              >
                {isLast ? t("Xem kết quả", "See result") : t("Câu tiếp theo", "Next")}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CambridgeYleExercises;
