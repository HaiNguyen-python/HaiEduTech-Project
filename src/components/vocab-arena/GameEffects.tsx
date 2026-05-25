import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Zap, Sparkles, Trophy, Crown, Medal } from "lucide-react";
import { comboLabel, getHighScores, type GameKey, type HighScore } from "./gameFx";

// ====== Floating "+N" points anywhere on screen ======
export interface FloatPoint {
  id: number;
  value: number;
  x: number;
  y: number;
  color?: string;
}

export const useFloatingPoints = () => {
  const [points, setPoints] = useState<FloatPoint[]>([]);
  const idRef = useRef(0);
  const fire = useCallback((value: number, opts?: { x?: number; y?: number; color?: string }) => {
    const id = ++idRef.current;
    const x = opts?.x ?? window.innerWidth / 2;
    const y = opts?.y ?? window.innerHeight / 2;
    setPoints((p) => [...p, { id, value, x, y, color: opts?.color }]);
    setTimeout(() => setPoints((p) => p.filter((q) => q.id !== id)), 1200);
  }, []);
  return { points, fire };
};

export const FloatingPointsLayer = ({ points }: { points: FloatPoint[] }) => (
  <div className="fixed inset-0 pointer-events-none z-[60]">
    <AnimatePresence>
      {points.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0.6, x: p.x - 40, y: p.y }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1.4, 1.2, 1], y: p.y - 90 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="absolute text-3xl md:text-4xl font-black drop-shadow-lg"
          style={{ color: p.color || "#10b981", left: 0, top: 0 }}
        >
          +{p.value}
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

// ====== Combo Badge ======
export const ComboBadge = ({ combo }: { combo: number }) => {
  const label = comboLabel(combo);
  if (combo < 2) return null;
  const Icon = combo >= 8 ? Flame : combo >= 5 ? Zap : Sparkles;
  const gradient =
    combo >= 8
      ? "from-red-500 via-orange-500 to-amber-400"
      : combo >= 5
      ? "from-fuchsia-500 to-pink-500"
      : combo >= 3
      ? "from-amber-500 to-yellow-400"
      : "from-sky-500 to-primary";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={combo}
        initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
        animate={{ scale: [0.6, 1.15, 1], opacity: 1, rotate: 0 }}
        exit={{ scale: 0.6, opacity: 0 }}
        transition={{ duration: 0.45 }}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${gradient} text-white text-xs font-black shadow-lg`}
      >
        <Icon className="w-3.5 h-3.5" />
        <span>{combo}x</span>
        {label && <span className="ml-1 hidden sm:inline">{label}</span>}
      </motion.div>
    </AnimatePresence>
  );
};

// ====== Screen Shake Wrapper ======
export const useShake = () => {
  const [shake, setShake] = useState(0);
  const trigger = useCallback(() => setShake((n) => n + 1), []);
  return { shake, trigger };
};

export const ShakeWrap = ({ trigger, children }: { trigger: number; children: React.ReactNode }) => (
  <motion.div
    animate={trigger ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
    transition={{ duration: 0.45 }}
    key={trigger}
  >
    {children}
  </motion.div>
);

// ====== High Score Panel ======
export const HighScorePanel = ({
  game,
  title,
  highlight,
  refreshKey,
}: {
  game: GameKey;
  title: string;
  highlight?: number;
  refreshKey?: number;
}) => {
  const [scores, setScores] = useState<HighScore[]>([]);
  useEffect(() => {
    setScores(getHighScores(game).slice(0, 5));
  }, [game, refreshKey]);

  if (scores.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed border-border bg-card/50 p-4 text-center">
        <Trophy className="w-6 h-6 text-amber-500 mx-auto mb-2" />
        <p className="text-xs text-muted-foreground">{title}</p>
        <p className="text-xs text-muted-foreground/70 mt-1">No scores yet — be the first!</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-2 border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="w-4 h-4 text-amber-500" />
        <h4 className="text-sm font-bold text-foreground">{title}</h4>
      </div>
      <ol className="space-y-1.5">
        {scores.map((s, i) => {
          const isMe = highlight !== undefined && s.score === highlight;
          const Icon = i === 0 ? Crown : i === 1 ? Medal : i === 2 ? Medal : null;
          const iconColor = i === 0 ? "text-amber-500" : i === 1 ? "text-slate-400" : i === 2 ? "text-orange-400" : "";
          return (
            <li
              key={`${s.date}-${i}`}
              className={`flex items-center justify-between text-sm rounded-lg px-2 py-1.5 ${
                isMe ? "bg-primary/10 border border-primary/40 font-bold" : ""
              }`}
            >
              <span className="flex items-center gap-2 min-w-0">
                <span className="w-5 text-xs text-muted-foreground font-mono">{i + 1}.</span>
                {Icon && <Icon className={`w-3.5 h-3.5 ${iconColor}`} />}
                <span className="truncate text-foreground">{s.name}</span>
              </span>
              <span className="font-mono font-bold text-primary">{s.score}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
