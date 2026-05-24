/**
 * @file KidsCategoryQuiz.tsx
 * @description Tiny 5-question multiple-choice review quiz shown at the end of
 * each vocabulary category. Picks 5 random words from the category, asks
 * "Which word means ___ ?" using the Vietnamese gloss, and gives instant
 * feedback with a celebratory score at the end.
 */
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RotateCcw, Check, X, Trophy } from "lucide-react";
import type { CambridgeKidsWord } from "@/data/cambridgeKidsVocab";

interface Props {
  words: CambridgeKidsWord[];
  accentColor: string;
  softColor: string;
  lang: "vi" | "en";
}

interface Question {
  prompt: CambridgeKidsWord;
  choices: CambridgeKidsWord[];
}

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const buildQuestions = (words: CambridgeKidsWord[], count: number): Question[] => {
  if (words.length < 4) return [];
  const picks = shuffle(words).slice(0, Math.min(count, words.length));
  return picks.map((prompt) => {
    const distractors = shuffle(words.filter(w => w.word !== prompt.word)).slice(0, 3);
    return { prompt, choices: shuffle([prompt, ...distractors]) };
  });
};

export default function KidsCategoryQuiz({ words, accentColor, softColor, lang }: Props) {
  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);
  const [seed, setSeed] = useState(0);
  const questions = useMemo(() => buildQuestions(words, 5), [words, seed]);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);

  if (words.length < 4) return null;

  const q = questions[step];
  const total = questions.length;
  const done = started && step >= total;

  const reset = () => {
    setSeed(s => s + 1);
    setStep(0);
    setPicked(null);
    setScore(0);
    setStarted(true);
  };

  const handlePick = (word: string) => {
    if (picked) return;
    setPicked(word);
    if (word === q.prompt.word) setScore(s => s + 1);
    setTimeout(() => {
      setPicked(null);
      setStep(s => s + 1);
    }, 900);
  };

  if (!started) {
    return (
      <div
        className="mt-6 rounded-2xl p-5 border-2 text-center"
        style={{ background: softColor, borderColor: accentColor }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-5 h-5" style={{ color: accentColor }} />
          <h4 className="font-extrabold text-lg" style={{ color: accentColor }}>
            {t("Bài kiểm tra nhỏ", "Quick Review Quiz")}
          </h4>
        </div>
        <p className="text-sm text-slate-700 mb-3">
          {t("Trả lời 5 câu hỏi vui để ôn lại chủ đề này nhé! 🎉",
             "Answer 5 fun questions to review this topic! 🎉")}
        </p>
        <button
          onClick={() => setStarted(true)}
          className="px-5 py-2.5 rounded-full font-bold text-white shadow-md hover:scale-105 transition-transform"
          style={{ background: accentColor }}
        >
          {t("Bắt đầu", "Start")} ▶
        </button>
      </div>
    );
  }

  if (done) {
    const pct = Math.round((score / total) * 100);
    const message = pct === 100 ? t("Tuyệt vời! Hoàn hảo! 🌟", "Perfect! Amazing! 🌟")
      : pct >= 60 ? t("Giỏi lắm! 👏", "Great job! 👏")
      : t("Cố lên, học lại nhé! 💪", "Keep going, try again! 💪");
    return (
      <div
        className="mt-6 rounded-2xl p-5 border-2 text-center"
        style={{ background: softColor, borderColor: accentColor }}
      >
        <Trophy className="w-10 h-10 mx-auto mb-2" style={{ color: accentColor }} />
        <h4 className="font-extrabold text-xl mb-1" style={{ color: accentColor }}>
          {score}/{total}
        </h4>
        <p className="text-slate-800 font-semibold mb-3">{message}</p>
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-full font-bold text-white shadow-md hover:scale-105 transition-transform inline-flex items-center gap-2"
          style={{ background: accentColor }}
        >
          <RotateCcw className="w-4 h-4" />
          {t("Làm lại", "Try Again")}
        </button>
      </div>
    );
  }

  return (
    <div
      className="mt-6 rounded-2xl p-5 border-2"
      style={{ background: softColor, borderColor: accentColor }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" style={{ color: accentColor }} />
          <h4 className="font-extrabold text-base" style={{ color: accentColor }}>
            {t("Câu hỏi", "Question")} {step + 1}/{total}
          </h4>
        </div>
        <div className="text-sm font-bold text-slate-700">
          {t("Điểm", "Score")}: {score}
        </div>
      </div>

      <div className="mb-4 p-4 rounded-xl bg-white shadow-sm text-center">
        <p className="text-sm text-slate-600 mb-1">
          {t("Từ tiếng Anh nào có nghĩa là:", "Which English word means:")}
        </p>
        <p className="text-2xl">{q.prompt.emoji}</p>
        <p className="font-extrabold text-xl text-slate-900 mt-1">
          {q.prompt.vi}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {q.choices.map((c) => {
            const isCorrect = c.word === q.prompt.word;
            const isPicked = picked === c.word;
            const reveal = picked !== null;
            const bg = !reveal ? "#FFFFFF"
              : isCorrect ? "#10B981"
              : isPicked ? "#EF4444" : "#FFFFFF";
            const color = !reveal ? "#0f172a"
              : isCorrect || isPicked ? "#FFFFFF" : "#94a3b8";
            return (
              <motion.button
                key={c.word}
                layout
                onClick={() => handlePick(c.word)}
                disabled={picked !== null}
                whileHover={{ scale: picked ? 1 : 1.03 }}
                className="rounded-xl px-4 py-3 font-bold text-base shadow-sm border-2 transition-colors flex items-center justify-center gap-2"
                style={{
                  background: bg,
                  color,
                  borderColor: !reveal ? accentColor : bg,
                }}
              >
                {reveal && isCorrect && <Check className="w-5 h-5" />}
                {reveal && isPicked && !isCorrect && <X className="w-5 h-5" />}
                {c.word}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
