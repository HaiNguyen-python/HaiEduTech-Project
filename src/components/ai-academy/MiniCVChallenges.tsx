/**
 * MiniCVChallenges - two bite-sized Computer Vision mini-games:
 *  1) "Pixel Reveal" - guess the image while it's still pixelated/blurred.
 *  2) "Guess the Confidence" - slider where the student predicts AI confidence
 *     for a given scene, then we reveal the true number.
 * Both reward sound + bounce and live entirely on the client.
 */
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Eye, Sparkles, RefreshCcw, Target, ZoomIn } from "lucide-react";
import { playSuccessSound, playFailureSound, bounceVariant } from "@/lib/aiAcademyFx";

// ============================================================
// Mini-game 1 - Pixel Reveal (image clarity vs AI vision)
// ============================================================
type Puzzle = { emoji: string; label: string; options: string[] };

const PUZZLES: Puzzle[] = [
  { emoji: "🐱", label: "Cat",       options: ["Cat", "Dog", "Rabbit", "Fox"] },
  { emoji: "🚗", label: "Car",       options: ["Motorbike", "Car", "Bus", "Train"] },
  { emoji: "🌳", label: "Tree",      options: ["Flower", "Grass", "Tree", "Bush"] },
  { emoji: "🍕", label: "Pizza",     options: ["Bread", "Pizza", "Hamburger", "Cake"] },
  { emoji: "✈️", label: "Airplane",  options: ["Train", "Rocket", "Airplane", "Hot air balloon"] },
  { emoji: "🐘", label: "Elephant",  options: ["Rhino", "Elephant", "Hippo", "Buffalo"] },
  { emoji: "⚽", label: "Soccer ball",  options: ["Soccer ball", "Clock", "Moon", "Wheel"] },
  { emoji: "🌻", label: "Sunflower", options: ["Rose", "Daisy", "Sunflower", "Lotus"] },
];

const BLUR_STEPS = [24, 14, 7, 3, 0];
const POINTS = [5, 4, 3, 2, 1];

const PixelReveal = () => {
  const [round, setRound] = useState(0);
  const puzzle = useMemo(() => {
    const p = PUZZLES[Math.floor(Math.random() * PUZZLES.length)];
    const opts = [...p.options].sort(() => Math.random() - 0.5);
    return { ...p, options: opts };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  const [level, setLevel] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const reveal = () => {
    if (level < BLUR_STEPS.length - 1) setLevel((l) => l + 1);
  };

  const choose = (opt: string) => {
    if (picked) return;
    setPicked(opt);
    if (opt === puzzle.label) {
      setScore(POINTS[level]);
      playSuccessSound();
    } else {
      setScore(0);
      playFailureSound();
    }
  };

  const reset = () => {
    setLevel(0);
    setPicked(null);
    setScore(null);
    setRound((r) => r + 1);
  };

  const blurPx = BLUR_STEPS[level];

  return (
    <div className="rounded-2xl border-2 border-emerald-400/40 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Eye className="w-4 h-4 text-emerald-600" />
        <h4 className="font-bold text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
          🔍 Mini-game: What does the AI see? (Pixel Reveal)
        </h4>
      </div>
      <p className="text-[13px] text-foreground/85">
        Guess the object correctly while the image is still <b>blurry</b> to earn more points. The more times you tap "Sharpen", the fewer points you get -
        that's exactly how computer vision needs enough <b>pixels</b> to recognize things accurately.
      </p>

      <div className="relative mx-auto w-full max-w-[260px] aspect-square rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 grid place-items-center overflow-hidden border-2 border-cyan-400/40 shadow-inner">
        <motion.div
          key={`${round}-${level}`}
          initial={{ scale: 0.9, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
          style={{ filter: `blur(${blurPx}px)` }}
          className="text-[140px] leading-none select-none"
        >
          {puzzle.emoji}
        </motion.div>
        <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-black/55 text-white text-[11px] font-bold tracking-wide">
          Pixel level {level + 1}/{BLUR_STEPS.length}
        </div>
        <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-emerald-500/90 text-white text-[11px] font-bold">
          Max points: {POINTS[level]}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {puzzle.options.map((opt, oi) => {
          const isPicked = picked === opt;
          const isCorrectShown = !!picked && opt === puzzle.label;
          const isWrongPick = isPicked && opt !== puzzle.label;
          return (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.95 }}
              animate={isPicked && opt === puzzle.label ? bounceVariant : undefined}
              onClick={() => choose(opt)}
              disabled={!!picked}
              className={`px-3 py-2.5 rounded-xl text-sm font-bold border-2 transition select-none ${
                isCorrectShown
                  ? "border-emerald-500 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-200"
                  : isWrongPick
                  ? "border-rose-500 bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-200"
                  : "border-border bg-card hover:bg-muted text-foreground"
              }`}
            >
              <span className="mr-1">{String.fromCharCode(65 + oi)}.</span>{opt}
            </motion.button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-2 flex-wrap">
        {!picked ? (
          <Button
            onClick={reveal}
            disabled={level >= BLUR_STEPS.length - 1}
            variant="outline"
            className="min-h-[40px]"
          >
            <ZoomIn className="w-4 h-4 mr-1" /> Sharpen a bit
          </Button>
        ) : (
          <Button
            onClick={reset}
            className="bg-gradient-to-r from-emerald-500 to-cyan-600 text-white min-h-[40px]"
          >
            <RefreshCcw className="w-4 h-4 mr-1" /> Try again
          </Button>
        )}
        <AnimatePresence>
          {picked && (
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`text-sm font-extrabold ${
                score && score > 0 ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {score && score > 0
                ? `🎉 +${score} points - Answer: ${puzzle.label}`
                : `😅 Wrong - Answer: ${puzzle.label}`}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ============================================================
// Mini-game 2 - Confidence predictor
// ============================================================
const SCENES = [
  { emoji: "🐱", desc: "A sharp, well-lit photo of a cat", actual: 97 },
  { emoji: "🌫️🐶", desc: "A dog photo taken in thick fog", actual: 54 },
  { emoji: "🌙🚗", desc: "A car photo shot at midnight", actual: 62 },
  { emoji: "📸✨", desc: "A close-up flash selfie", actual: 94 },
  { emoji: "🌧️🚦", desc: "A traffic light seen through a rain-covered car window", actual: 48 },
];

const ConfidencePredictor = () => {
  const [sceneIdx, setSceneIdx] = useState(() =>
    Math.floor(Math.random() * SCENES.length)
  );
  const [guess, setGuess] = useState(75);
  const [revealed, setRevealed] = useState(false);

  const scene = SCENES[sceneIdx];
  const diff = revealed ? Math.abs(guess - scene.actual) : 0;
  const verdict =
    diff <= 8 ? "Excellent!" : diff <= 18 ? "Pretty close!" : "A bit off 😅";

  const reveal = () => {
    setRevealed(true);
    if (diff <= 8) playSuccessSound();
    else playFailureSound();
  };

  const nextScene = () => {
    const next = (sceneIdx + 1) % SCENES.length;
    setSceneIdx(next);
    setGuess(75);
    setRevealed(false);
  };

  return (
    <div className="rounded-2xl border-2 border-fuchsia-400/40 bg-gradient-to-br from-fuchsia-500/10 to-purple-500/10 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Target className="w-4 h-4 text-fuchsia-600" />
        <h4 className="font-bold text-sm uppercase tracking-wide text-fuchsia-700 dark:text-fuchsia-300">
          🎯 Mini-game: Guess the AI's confidence
        </h4>
      </div>

      <div className="p-3 rounded-xl bg-card border border-border">
        <div className="text-4xl mb-1">{scene.emoji}</div>
        <p className="text-sm text-foreground">{scene.desc}</p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[13px] text-muted-foreground">Your guess</span>
          <span className="text-base font-black text-fuchsia-600">{guess}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={guess}
          disabled={revealed}
          onChange={(e) => setGuess(Number(e.target.value))}
          className="w-full accent-fuchsia-500 h-3"
        />
      </div>

      {revealed && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl bg-fuchsia-500/10 border border-fuchsia-400/40 text-sm"
        >
          <div className="font-bold text-foreground">
            The real AI answered: <span className="text-fuchsia-600">{scene.actual}%</span>
          </div>
          <div className="text-foreground/85 mt-0.5">
            Off by <b>{diff}%</b> - {verdict}
          </div>
        </motion.div>
      )}

      <div className="flex gap-2">
        {!revealed ? (
          <Button
            onClick={reveal}
            className="bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white min-h-[40px]"
          >
            <Sparkles className="w-4 h-4 mr-1" /> Reveal answer
          </Button>
        ) : (
          <Button onClick={nextScene} variant="outline" className="min-h-[40px]">
            <RefreshCcw className="w-4 h-4 mr-1" /> Next scene
          </Button>
        )}
      </div>
    </div>
  );
};

const MiniCVChallenges = () => (
  <div className="space-y-3 pt-2">
    <PixelReveal />
    <ConfidencePredictor />
  </div>
);

export default MiniCVChallenges;
