/**
 * MiniCVChallenges — two bite-sized Computer Vision mini-games:
 *  1) "Tìm phương tiện giao thông" — tap all vehicle emojis in a 4x3 grid.
 *  2) "Đoán độ tự tin" — slider where the student predicts AI confidence
 *     for a given scene, then we reveal the true number.
 * Both reward sound + bounce and live entirely on the client.
 */
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Car, Sparkles, RefreshCcw, Target } from "lucide-react";
import { playSuccessSound, playFailureSound, bounceVariant } from "@/lib/aiAcademyFx";

// ============================================================
// Mini-game 1 — Vehicle finder (multi-tap classification)
// ============================================================
type Tile = { emoji: string; isVehicle: boolean };
const POOL: Tile[] = [
  { emoji: "🚗", isVehicle: true },
  { emoji: "🚌", isVehicle: true },
  { emoji: "🛵", isVehicle: true },
  { emoji: "🚲", isVehicle: true },
  { emoji: "✈️", isVehicle: true },
  { emoji: "🚂", isVehicle: true },
  { emoji: "🍎", isVehicle: false },
  { emoji: "🐶", isVehicle: false },
  { emoji: "🌳", isVehicle: false },
  { emoji: "📱", isVehicle: false },
  { emoji: "🎨", isVehicle: false },
  { emoji: "⚽", isVehicle: false },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const VehicleFinder = () => {
  const [round, setRound] = useState(0);
  const tiles = useMemo(() => shuffle(POOL), [round]);
  const [picked, setPicked] = useState<Set<number>>(new Set());
  const [checked, setChecked] = useState(false);

  const toggle = (idx: number) => {
    if (checked) return;
    setPicked((p) => {
      const next = new Set(p);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const check = () => {
    setChecked(true);
    const correct = tiles.every((t, i) => t.isVehicle === picked.has(i));
    if (correct) playSuccessSound();
    else playFailureSound();
  };

  const reset = () => {
    setPicked(new Set());
    setChecked(false);
    setRound((r) => r + 1);
  };

  const score = tiles.reduce(
    (s, t, i) => s + (t.isVehicle === picked.has(i) ? 1 : 0),
    0
  );

  return (
    <div className="rounded-2xl border-2 border-emerald-400/40 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Car className="w-4 h-4 text-emerald-600" />
        <h4 className="font-bold text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
          🚦 Mini-game: Tìm phương tiện giao thông
        </h4>
      </div>
      <p className="text-[13px] text-foreground/85">
        Hãy chọn <b>tất cả</b> ô là phương tiện giao thông (AI gọi đây là{" "}
        <b>multi-label classification</b>).
      </p>

      <div className="grid grid-cols-4 gap-2">
        {tiles.map((t, i) => {
          const isPicked = picked.has(i);
          const correctWhenChecked =
            checked && t.isVehicle === isPicked;
          const wrongWhenChecked = checked && t.isVehicle !== isPicked;
          return (
            <motion.button
              key={`${round}-${i}`}
              whileTap={{ scale: 0.9 }}
              animate={correctWhenChecked && isPicked ? bounceVariant : undefined}
              onClick={() => toggle(i)}
              className={`aspect-square rounded-xl text-3xl flex items-center justify-center border-2 transition select-none ${
                wrongWhenChecked
                  ? "border-rose-500 bg-rose-100 dark:bg-rose-900/40"
                  : correctWhenChecked
                  ? "border-emerald-500 bg-emerald-100 dark:bg-emerald-900/40"
                  : isPicked
                  ? "border-cyan-500 bg-cyan-100 dark:bg-cyan-900/40"
                  : "border-border bg-card hover:bg-muted"
              }`}
            >
              {t.emoji}
            </motion.button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-2">
        {!checked ? (
          <Button
            onClick={check}
            disabled={picked.size === 0}
            className="bg-gradient-to-r from-emerald-500 to-cyan-600 text-white min-h-[40px]"
          >
            <Sparkles className="w-4 h-4 mr-1" /> Kiểm tra
          </Button>
        ) : (
          <Button onClick={reset} variant="outline" className="min-h-[40px]">
            <RefreshCcw className="w-4 h-4 mr-1" /> Chơi lại
          </Button>
        )}
        {checked && (
          <span className="text-sm font-bold text-foreground">
            🎯 Đúng <span className="text-emerald-600">{score}/{tiles.length}</span>
          </span>
        )}
      </div>
    </div>
  );
};

// ============================================================
// Mini-game 2 — Confidence predictor
// ============================================================
const SCENES = [
  { emoji: "🐱", desc: "Ảnh con mèo rõ nét, đủ sáng", actual: 97 },
  { emoji: "🌫️🐶", desc: "Ảnh con chó trong sương mù dày", actual: 54 },
  { emoji: "🌙🚗", desc: "Ảnh xe ô tô chụp lúc nửa đêm", actual: 62 },
  { emoji: "📸✨", desc: "Ảnh selfie có flash, cận cảnh khuôn mặt", actual: 94 },
  { emoji: "🌧️🚦", desc: "Đèn giao thông qua kính ô tô đầy nước mưa", actual: 48 },
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
    diff <= 8 ? "Tuyệt vời!" : diff <= 18 ? "Khá sát!" : "Hơi chệch rồi 😅";

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
          🎯 Mini-game: Đoán độ tự tin của AI
        </h4>
      </div>

      <div className="p-3 rounded-xl bg-card border border-border">
        <div className="text-4xl mb-1">{scene.emoji}</div>
        <p className="text-sm text-foreground">{scene.desc}</p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[13px] text-muted-foreground">Dự đoán của bạn</span>
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
            AI thật trả lời: <span className="text-fuchsia-600">{scene.actual}%</span>
          </div>
          <div className="text-foreground/85 mt-0.5">
            Lệch <b>{diff}%</b> — {verdict}
          </div>
        </motion.div>
      )}

      <div className="flex gap-2">
        {!revealed ? (
          <Button
            onClick={reveal}
            className="bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white min-h-[40px]"
          >
            <Sparkles className="w-4 h-4 mr-1" /> Hé lộ đáp án
          </Button>
        ) : (
          <Button onClick={nextScene} variant="outline" className="min-h-[40px]">
            <RefreshCcw className="w-4 h-4 mr-1" /> Cảnh khác
          </Button>
        )}
      </div>
    </div>
  );
};

const MiniCVChallenges = () => (
  <div className="space-y-3 pt-2">
    <VehicleFinder />
    <ConfidencePredictor />
  </div>
);

export default MiniCVChallenges;
