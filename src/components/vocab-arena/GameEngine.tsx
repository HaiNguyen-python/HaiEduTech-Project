import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Zap, Timer, Volume2, ChevronRight, CheckCircle, XCircle, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { ieltsVocabData, type IeltsWord } from "@/data/ieltsVocabData";
import confetti from "canvas-confetti";

// Shuffle helper
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// TTS helper
const speak = (text: string) => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  }
};

// Sound effects using Web Audio API
const playSound = (type: "correct" | "wrong" | "streak" | "gameover") => {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.value = 0.15;

    if (type === "correct") {
      osc.frequency.value = 880;
      osc.type = "sine";
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === "wrong") {
      osc.frequency.value = 200;
      osc.type = "square";
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === "streak") {
      osc.frequency.value = 1200;
      osc.type = "sine";
      osc.start();
      setTimeout(() => { osc.frequency.value = 1600; }, 100);
      osc.stop(ctx.currentTime + 0.3);
    } else {
      osc.frequency.value = 150;
      osc.type = "sawtooth";
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    }
  } catch {
    // Silently fail if audio not available
  }
};

export interface GameQuestion {
  word: IeltsWord;
  options: string[];
  correctIndex: number;
}

export interface GameResult {
  score: number;
  streak: number;
  maxStreak: number;
  correct: number;
  total: number;
  wordResults: { word: string; correct: boolean; timeMs: number }[];
}

interface GameEngineProps {
  questions: GameQuestion[];
  lives: number;
  onGameEnd: (result: GameResult) => void;
  isSuddenDeath?: boolean;
}

// Generate questions from word pool
export const generateQuestions = (
  wordPool: IeltsWord[],
  count: number
): GameQuestion[] => {
  const pool = wordPool.length >= 4 ? wordPool : ieltsVocabData;
  const picked = shuffle(pool).slice(0, count);
  return picked.map((w) => {
    const wrongs = shuffle(pool.filter((x) => x.word !== w.word))
      .slice(0, 3)
      .map((x) => x.word);
    const allOpts = shuffle([w.word, ...wrongs]);
    return {
      word: w,
      options: allOpts,
      correctIndex: allOpts.indexOf(w.word),
    };
  });
};

const GameEngine = ({ questions, lives: initialLives, onGameEnd, isSuddenDeath = false }: GameEngineProps) => {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [lives, setLives] = useState(initialLives);
  const [correct, setCorrect] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [wordResults, setWordResults] = useState<{ word: string; correct: boolean; timeMs: number }[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  // Timer countdown
  useEffect(() => {
    if (gameOver || selected !== null) return;
    setTimeLeft(10);
    setQuestionStartTime(Date.now());

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up — treat as wrong
          clearInterval(timerRef.current!);
          handleAnswer(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current, gameOver]);

  const handleAnswer = useCallback(
    (idx: number) => {
      if (selected !== null || gameOver) return;
      if (timerRef.current) clearInterval(timerRef.current);

      const elapsed = Date.now() - questionStartTime;
      const isCorrect = idx === q.correctIndex;

      setSelected(idx);

      if (isCorrect) {
        // Scoring: base 10 + speed bonus (up to 5 for < 3s) + streak bonus
        let points = 10;
        if (elapsed < 3000) points += Math.round(5 * (1 - elapsed / 3000));
        const newStreak = streak + 1;
        if (newStreak >= 5 && newStreak % 5 === 0) {
          points += 15; // Streak bonus every 5
          playSound("streak");
          confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
        } else {
          playSound("correct");
        }

        setScore((s) => s + points);
        setStreak(newStreak);
        setMaxStreak((m) => Math.max(m, newStreak));
        setCorrect((c) => c + 1);
        setFeedback("correct");
      } else {
        const newLives = isSuddenDeath ? 0 : lives - 1;
        setLives(newLives);
        setStreak(0);
        setFeedback("wrong");
        playSound("wrong");
      }

      setWordResults((prev) => [
        ...prev,
        { word: q.word.word, correct: isCorrect, timeMs: elapsed },
      ]);

      // Auto-advance after delay
      setTimeout(() => {
        setFeedback(null);
        setSelected(null);

        const newLives = isCorrect ? lives : isSuddenDeath ? 0 : lives - 1;
        if (newLives <= 0) {
          playSound("gameover");
          setGameOver(true);
          onGameEnd({
            score: isCorrect ? score + 10 : score,
            streak,
            maxStreak: Math.max(maxStreak, isCorrect ? streak + 1 : streak),
            correct: correct + (isCorrect ? 1 : 0),
            total: current + 1,
            wordResults: [
              ...wordResults,
              { word: q.word.word, correct: isCorrect, timeMs: elapsed },
            ],
          });
          return;
        }

        if (current + 1 >= questions.length) {
          // All questions answered
          confetti({ particleCount: 100, spread: 120, origin: { y: 0.5 } });
          setGameOver(true);
          onGameEnd({
            score: isCorrect ? score + 10 : score,
            streak,
            maxStreak: Math.max(maxStreak, isCorrect ? streak + 1 : streak),
            correct: correct + (isCorrect ? 1 : 0),
            total: questions.length,
            wordResults: [
              ...wordResults,
              { word: q.word.word, correct: isCorrect, timeMs: elapsed },
            ],
          });
        } else {
          setCurrent((c) => c + 1);
        }
      }, 1500);
    },
    [selected, gameOver, q, streak, lives, score, correct, current, maxStreak, questionStartTime, wordResults, isSuddenDeath, onGameEnd, questions.length]
  );

  if (!q) return null;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Top bar: Lives, Score, Streak, Timer */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Lives */}
          <div className="flex items-center gap-1">
            {Array.from({ length: initialLives }).map((_, i) => (
              <Heart
                key={i}
                className={`w-5 h-5 transition-all ${
                  i < lives ? "text-red-500 fill-red-500" : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          {/* Streak */}
          {streak >= 2 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold"
            >
              <Zap className="w-3 h-3" /> {streak}x
            </motion.div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-primary">{score} pts</span>
          <div className="flex items-center gap-1.5">
            <Timer className={`w-4 h-4 ${timeLeft <= 3 ? "text-red-500 animate-pulse" : "text-muted-foreground"}`} />
            <span className={`text-sm font-mono font-bold ${timeLeft <= 3 ? "text-red-500" : "text-foreground"}`}>
              {timeLeft}s
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <Progress value={progress} className="h-2 mb-6" />

      {/* Question card */}
      <motion.div
        key={current}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className={`rounded-2xl border-2 p-8 mb-6 transition-colors ${
          feedback === "correct"
            ? "border-green-500 bg-green-500/5"
            : feedback === "wrong"
            ? "border-red-500 bg-red-500/5 animate-[shake_0.3s_ease-in-out]"
            : "border-border bg-card"
        }`}
      >
        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
          {t("Câu", "Question")} {current + 1}/{questions.length}
        </p>
        <p className="text-lg text-foreground mb-3 font-semibold">
          {t("Từ nào có nghĩa:", "Which word means:")}
        </p>
        <p className="text-xl text-primary font-bold mb-2">"{q.word.definition.en}"</p>
        <p className="text-sm text-muted-foreground italic mb-1">{q.word.definition.vi}</p>
        <p className="text-sm text-foreground italic">
          {t("Ví dụ:", "Example:")} "{q.word.example}"
        </p>

        {/* Feedback popup */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className={`absolute top-4 right-4 px-4 py-2 rounded-xl font-bold text-sm ${
                feedback === "correct"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {feedback === "correct" ? (
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Great!
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <XCircle className="w-4 h-4" /> {q.word.word}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Answer options */}
      <div className="grid grid-cols-2 gap-3">
        {q.options.map((opt, idx) => {
          let cls =
            "relative rounded-xl border-2 p-4 cursor-pointer transition-all text-center font-semibold ";
          if (selected !== null) {
            if (idx === q.correctIndex) cls += "border-green-500 bg-green-500/10 text-green-400 ";
            else if (idx === selected) cls += "border-red-500 bg-red-500/10 text-red-400 ";
            else cls += "border-border bg-card opacity-40 ";
            cls += "pointer-events-none ";
          } else {
            cls +=
              "border-border bg-card hover:border-primary/60 hover:bg-primary/5 active:scale-[0.97] ";
          }
          return (
            <motion.div
              key={idx}
              whileHover={selected === null ? { scale: 1.02 } : {}}
              whileTap={selected === null ? { scale: 0.97 } : {}}
              onClick={() => handleAnswer(idx)}
              className={cls}
            >
              <span className="text-xs text-muted-foreground absolute top-2 left-3">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="text-base">{opt}</span>
              {selected !== null && idx === q.correctIndex && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(opt);
                  }}
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-primary/10"
                >
                  <Volume2 className="w-4 h-4 text-primary" />
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Correct answer info after selection */}
      <AnimatePresence>
        {selected !== null && feedback === "wrong" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30"
          >
            <p className="text-sm text-foreground">
              <strong>{q.word.word}</strong> <span className="text-muted-foreground font-mono">{q.word.ipa}</span>
            </p>
            <p className="text-sm text-primary mt-1">{q.word.definition.vi}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameEngine;
