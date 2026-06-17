/**
 * @file CambridgeVocabPractice.tsx
 * @description Kid-friendly multi-question vocabulary practice for Cambridge
 * YLE. Lets learners pick a level (or random across all levels) and the number
 * of questions (10–50). Mixes 4 task types: Vietnamese→English, English→
 * Vietnamese, "pick the matching emoji", and "unscramble the letters".
 * Instant feedback, score summary, confetti vibes.
 */
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Trophy, RotateCcw, Check, X, Volume2, Shuffle, Eraser, Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CAMBRIDGE_LEVELS, type CambridgeKidsLevel, type CambridgeKidsWord } from "@/data/cambridgeKidsVocab";
import { CAMBRIDGE_KIDS_WORDS_CURATED as CAMBRIDGE_KIDS_WORDS_DEDUPED } from "@/data/cambridgeKidsVocabCurated";

type Mode = "viToEn" | "enToVi" | "emoji" | "scramble";

interface PracticeQuestion {
  mode: Mode;
  prompt: CambridgeKidsWord;
  choices: CambridgeKidsWord[];
  /** Pre-shuffled letter tiles for the scramble mode. */
  scrambled?: string[];
}

const QUESTION_COUNT_OPTIONS = [10, 20, 30, 40, 50] as const;
const LEVEL_OPTIONS: Array<CambridgeKidsLevel | "Random"> = ["Random", ...CAMBRIDGE_LEVELS];

const LEVEL_COLOR: Record<CambridgeKidsLevel | "Random", string> = {
  Random: "#7C3AED",
  Starters: "#EC4E89",
  Movers: "#2D7FE0",
  Flyers: "#1FA855",
  KET: "#7B3FE4",
  PET: "#E8841A",
};

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** Cleaned word for scramble (letters & spaces only, lowercase). */
const cleanWord = (w: string) => w.toLowerCase().replace(/[^a-z ]/g, "");

const scrambleLetters = (word: string): string[] => {
  const letters = cleanWord(word).replace(/\s+/g, "").split("");
  if (letters.length < 2) return letters;
  // Re-shuffle until different from original (max 8 tries)
  for (let i = 0; i < 8; i++) {
    const s = shuffle(letters);
    if (s.join("") !== letters.join("")) return s;
  }
  return shuffle(letters);
};

const buildQuestions = (
  level: CambridgeKidsLevel | "Random",
  count: number
): PracticeQuestion[] => {
  const pool =
    level === "Random"
      ? CAMBRIDGE_KIDS_WORDS_DEDUPED
      : CAMBRIDGE_KIDS_WORDS_DEDUPED.filter((w) => w.level === level);
  if (pool.length < 4) return [];
  const picks = shuffle(pool).slice(0, Math.min(count, pool.length));
  // Cycle through all 4 modes so every quiz contains every game type.
  const modes: Mode[] = ["viToEn", "enToVi", "emoji", "scramble"];
  return picks.map((prompt, i) => {
    const mode = modes[i % modes.length];
    const distractors = shuffle(pool.filter((w) => w.word !== prompt.word)).slice(0, 3);
    return {
      mode,
      prompt,
      choices: shuffle([prompt, ...distractors]),
      scrambled: mode === "scramble" ? scrambleLetters(prompt.word) : undefined,
    };
  });
};

const speak = (text: string) => {
  try {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  } catch {
    /* noop */
  }
};

interface Props {
  lang: "vi" | "en";
}

/** ---------------- Scramble sub-component ---------------- */
interface ScrambleBoardProps {
  word: string;
  tiles: string[];
  color: string;
  onResolved: (correct: boolean) => void;
  lang: "vi" | "en";
}

const ScrambleBoard = ({ word, tiles, color, onResolved, lang }: ScrambleBoardProps) => {
  const target = cleanWord(word).replace(/\s+/g, "");
  // Each tile in `tiles` keeps a stable index so duplicate letters work.
  const [picked, setPicked] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setPicked([]);
    setRevealed(false);
    setShowHint(false);
  }, [word]);

  const built = picked.map((i) => tiles[i]).join("");

  useEffect(() => {
    if (revealed || picked.length !== target.length) return;
    const ok = built === target;
    setRevealed(true);
    setTimeout(() => onResolved(ok), 850);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picked]);

  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);

  return (
    <div>
      {/* Built word slots */}
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-4 min-h-[60px]">
        {Array.from({ length: target.length }).map((_, i) => {
          const ch = built[i];
          const filled = !!ch;
          const isWrong = revealed && built !== target && ch;
          const isRight = revealed && built === target;
          return (
            <div
              key={i}
              className="w-9 h-12 sm:w-11 sm:h-14 rounded-xl border-2 border-dashed flex items-center justify-center text-xl sm:text-2xl font-extrabold transition-all"
              style={{
                borderColor: isRight ? "#10B981" : isWrong ? "#EF4444" : color + "66",
                background: filled
                  ? isRight
                    ? "#10B981"
                    : isWrong
                    ? "#EF4444"
                    : "#FFFFFF"
                  : "#F8FAFC",
                color: filled ? (isRight || isWrong ? "#FFFFFF" : "#0f172a") : "#94a3b8",
                boxShadow: filled ? `0 3px 8px ${color}33` : undefined,
              }}
            >
              {ch?.toUpperCase() ?? ""}
            </div>
          );
        })}
      </div>

      {/* Hint */}
      {showHint && (
        <p className="text-center text-sm font-bold text-amber-600 mb-2">
          💡 {t("Bắt đầu bằng chữ", "Starts with")}{" "}
          <span className="text-lg">{target[0].toUpperCase()}</span>
        </p>
      )}

      {/* Letter tiles */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {tiles.map((ch, idx) => {
          const used = picked.includes(idx);
          return (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: used ? 1 : 1.06, y: used ? 0 : -2 }}
              disabled={used || revealed}
              onClick={() => setPicked((p) => [...p, idx])}
              className="w-10 h-12 sm:w-12 sm:h-14 rounded-2xl font-extrabold text-xl sm:text-2xl shadow-md border-2 transition-all"
              style={{
                background: used ? "#E2E8F0" : `linear-gradient(135deg, ${color}, #F472B6)`,
                color: used ? "#94A3B8" : "#FFFFFF",
                borderColor: used ? "#CBD5E1" : "#FFFFFF",
                opacity: used ? 0.4 : 1,
              }}
            >
              {ch.toUpperCase()}
            </motion.button>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setPicked((p) => p.slice(0, -1))}
          disabled={revealed || picked.length === 0}
          className="rounded-full"
        >
          <Eraser className="w-4 h-4 mr-1" />
          {t("Xoá", "Erase")}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setPicked([])}
          disabled={revealed || picked.length === 0}
          className="rounded-full"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          {t("Làm lại", "Reset")}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setShowHint(true)}
          disabled={revealed || showHint}
          className="rounded-full"
        >
          <Lightbulb className="w-4 h-4 mr-1" />
          {t("Gợi ý", "Hint")}
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={() => speak(word)}
          className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
        >
          <Volume2 className="w-4 h-4 mr-1" />
          {t("Nghe", "Listen")}
        </Button>
      </div>
    </div>
  );
};

/** ---------------- Main component ---------------- */
const CambridgeVocabPractice = ({ lang }: Props) => {
  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);
  const [level, setLevel] = useState<CambridgeKidsLevel | "Random">("Random");
  const [count, setCount] = useState<number>(10);
  const [seed, setSeed] = useState(0);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const questions = useMemo(
    () => (started ? buildQuestions(level, count) : []),
    [started, level, count, seed]
  );
  const total = questions.length;
  const q = questions[step];
  const done = started && step >= total && total > 0;

  const reset = () => {
    setStarted(false);
    setStep(0);
    setPicked(null);
    setScore(0);
  };

  const startNew = () => {
    setSeed((s) => s + 1);
    setStep(0);
    setPicked(null);
    setScore(0);
    setStarted(true);
  };

  const handlePick = (word: string) => {
    if (picked || !q) return;
    setPicked(word);
    if (word === q.prompt.word) setScore((s) => s + 1);
    setTimeout(() => {
      setPicked(null);
      setStep((s) => s + 1);
    }, 900);
  };

  const handleScrambleResolved = (correct: boolean) => {
    if (correct) setScore((s) => s + 1);
    setStep((s) => s + 1);
  };

  // ---- Start screen ----
  if (!started) {
    return (
      <div className="rounded-3xl p-6 md:p-8 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-amber-50 border-2 border-white shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-md">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-slate-900">
              ✨ {t("Luyện tập từ vựng", "Vocabulary Practice")}
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              {t(
                "4 dạng bài tập vui: Việt → Anh, Anh → Việt, Đoán biểu tượng & Xếp chữ!",
                "4 fun task types: VI→EN, EN→VI, Emoji match & Letter scramble!"
              )}
            </p>
          </div>
        </div>

        {/* Level picker */}
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            🎯 {t("Cấp độ", "Level")}
          </p>
          <div className="flex flex-wrap gap-2">
            {LEVEL_OPTIONS.map((lv) => {
              const active = lv === level;
              const color = LEVEL_COLOR[lv];
              return (
                <button
                  key={lv}
                  onClick={() => setLevel(lv)}
                  className="px-4 py-2 rounded-xl border-2 font-bold text-sm transition-all flex items-center gap-1.5"
                  style={{
                    background: active ? color : "#FFFFFF",
                    color: active ? "#FFFFFF" : color,
                    borderColor: color,
                    boxShadow: active ? `0 3px 10px ${color}55` : undefined,
                  }}
                >
                  {lv === "Random" ? <Shuffle className="w-4 h-4" /> : null}
                  {lv === "Random" ? t("Ngẫu nhiên", "Random") : lv}
                </button>
              );
            })}
          </div>
        </div>

        {/* Count picker */}
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            🔢 {t("Số câu hỏi", "Number of Questions")}
          </p>
          <div className="flex flex-wrap gap-2">
            {QUESTION_COUNT_OPTIONS.map((n) => {
              const active = n === count;
              return (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={`px-5 py-2 rounded-xl border-2 font-bold text-sm transition-all ${
                    active
                      ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-violet-500 shadow-md"
                      : "bg-white text-slate-700 border-slate-300 hover:border-violet-400"
                  }`}
                >
                  {n} {t("câu", "Qs")}
                </button>
              );
            })}
          </div>
        </div>

        {/* Game types preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {[
            { e: "🇻🇳", l: t("Việt → Anh", "VI → EN") },
            { e: "🇬🇧", l: t("Anh → Việt", "EN → VI") },
            { e: "🎨", l: t("Đoán biểu tượng", "Emoji match") },
            { e: "🔤", l: t("Xếp chữ", "Scramble") },
          ].map((it) => (
            <div
              key={it.l}
              className="rounded-2xl bg-white/70 backdrop-blur border-2 border-white px-3 py-2 text-center shadow-sm"
            >
              <div className="text-2xl">{it.e}</div>
              <div className="text-xs font-bold text-slate-700">{it.l}</div>
            </div>
          ))}
        </div>

        <Button
          onClick={startNew}
          className="w-full md:w-auto px-8 py-6 text-base font-bold rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-500 text-white shadow-lg hover:scale-[1.02] transition-transform"
        >
          🚀 {t("Bắt đầu ôn tập", "Start Practice")}
        </Button>
      </div>
    );
  }

  // ---- Results screen ----
  if (done) {
    const pct = Math.round((score / total) * 100);
    const msg =
      pct === 100
        ? t("🌟 Hoàn hảo! Bạn là nhà vô địch!", "🌟 Perfect! You are a champion!")
        : pct >= 80
        ? t("🎉 Xuất sắc! Tiếp tục phát huy nhé!", "🎉 Excellent! Keep it up!")
        : pct >= 60
        ? t("👏 Tốt lắm! Hãy thử lại để tốt hơn!", "👏 Good job! Try again to improve!")
        : t("💪 Cố lên! Học thêm rồi quay lại nhé!", "💪 Keep practising and come back!");
    return (
      <div className="rounded-3xl p-8 bg-gradient-to-br from-amber-50 via-pink-50 to-violet-50 border-2 border-white shadow-lg text-center">
        <motion.div
          initial={{ scale: 0.6, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="inline-flex p-4 rounded-full bg-gradient-to-br from-amber-400 to-pink-500 mb-4"
        >
          <Trophy className="w-12 h-12 text-white" />
        </motion.div>
        <h3 className="text-3xl font-display font-bold text-slate-900 mb-1">
          {score}/{total}
        </h3>
        <p className="text-lg font-bold text-slate-700 mb-4">{msg}</p>
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            onClick={startNew}
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            {t("Làm lại", "Try Again")}
          </Button>
          <Button variant="outline" onClick={reset}>
            {t("Đổi cấp độ", "Change Settings")}
          </Button>
        </div>
      </div>
    );
  }

  if (!q) {
    return (
      <div className="rounded-2xl p-6 bg-white border border-slate-200 text-center text-slate-600">
        {t("Không đủ từ vựng cho mức này.", "Not enough words for this level.")}
      </div>
    );
  }

  // ---- Question screen ----
  const accent = LEVEL_COLOR[level];
  const progressPct = (step / total) * 100;

  return (
    <div className="rounded-3xl p-5 md:p-6 bg-white border-2 border-white shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" style={{ color: accent }} />
          <span className="font-bold text-slate-700 text-sm">
            {t("Câu", "Question")} {step + 1}/{total}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-slate-700">⭐ {score}</span>
          <button
            onClick={reset}
            className="text-xs font-bold text-slate-500 hover:text-rose-600"
          >
            {t("Thoát", "Exit")}
          </button>
        </div>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden mb-5">
        <motion.div
          className="h-full"
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.3 }}
          style={{ background: `linear-gradient(90deg, ${accent}, #F472B6)` }}
        />
      </div>

      {/* Prompt */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="mb-5 p-5 rounded-2xl text-center"
          style={{ background: `linear-gradient(135deg, ${accent}15, #F472B615)` }}
        >
          {q.mode === "viToEn" && (
            <>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                {t("Từ tiếng Anh nào có nghĩa là:", "Which English word means:")}
              </p>
              <p className="text-4xl mb-1">{q.prompt.emoji}</p>
              <p className="text-2xl md:text-3xl font-extrabold text-slate-900">
                {q.prompt.vi}
              </p>
            </>
          )}
          {q.mode === "enToVi" && (
            <>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                {t("Từ này nghĩa là gì?", "What does this word mean?")}
              </p>
              <div className="flex items-center justify-center gap-2">
                <p className="text-2xl md:text-3xl font-extrabold text-slate-900">
                  {q.prompt.word}
                </p>
                <button
                  onClick={() => speak(q.prompt.word)}
                  className="p-1.5 rounded-full hover:bg-white/60"
                  style={{ color: accent }}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
          {q.mode === "emoji" && (
            <>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                {t("Chọn biểu tượng đúng cho:", "Pick the right emoji for:")}
              </p>
              <p className="text-2xl md:text-3xl font-extrabold text-slate-900">
                {q.prompt.word}
              </p>
              <p className="text-sm text-slate-600 mt-1">({q.prompt.vi})</p>
            </>
          )}
          {q.mode === "scramble" && (
            <>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                🔤 {t("Xếp các chữ cái để tạo từ:", "Arrange the letters to form:")}
              </p>
              <p className="text-4xl mb-1">{q.prompt.emoji}</p>
              <p className="text-2xl md:text-3xl font-extrabold text-slate-900">
                {q.prompt.vi}
              </p>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Body - choices OR scramble board */}
      {q.mode === "scramble" ? (
        <ScrambleBoard
          word={q.prompt.word}
          tiles={q.scrambled ?? scrambleLetters(q.prompt.word)}
          color={accent}
          onResolved={handleScrambleResolved}
          lang={lang}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {q.choices.map((c) => {
            const isCorrect = c.word === q.prompt.word;
            const isPicked = picked === c.word;
            const reveal = picked !== null;
            const bg = !reveal
              ? "#FFFFFF"
              : isCorrect
              ? "#10B981"
              : isPicked
              ? "#EF4444"
              : "#FFFFFF";
            const color = !reveal ? "#0f172a" : isCorrect || isPicked ? "#FFFFFF" : "#94a3b8";
            let label: React.ReactNode;
            if (q.mode === "viToEn") label = c.word;
            else if (q.mode === "enToVi") label = c.vi;
            else label = <span className="text-3xl">{c.emoji}</span>;

            return (
              <motion.button
                key={c.word}
                layout
                whileHover={{ scale: picked ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePick(c.word)}
                disabled={picked !== null}
                className="rounded-2xl px-4 py-4 font-bold text-base shadow-sm border-2 transition-colors flex items-center justify-center gap-2 min-h-[60px]"
                style={{
                  background: bg,
                  color,
                  borderColor: !reveal ? accent : bg,
                }}
              >
                {reveal && isCorrect && <Check className="w-5 h-5" />}
                {reveal && isPicked && !isCorrect && <X className="w-5 h-5" />}
                {label}
              </motion.button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CambridgeVocabPractice;
