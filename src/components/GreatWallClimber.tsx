// Great Wall Climber progress visualization — Chinese cultural theme for HSK vocab mastery
import { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import greatWallBg from "@/assets/great-wall-bg.webp";
import scholarImg from "@/assets/chinese-scholar.webp";

interface FlyingStar {
  id: number;
  startX: number;
  startY: number;
}

interface GreatWallClimberProps {
  mastered: number;
  total: number;
  flyingStars: FlyingStar[];
  onStarLanded: (id: number) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

// HSK milestone watchtowers along the Great Wall path
const MILESTONES = [
  { words: 0, label: "Base Camp", band: "HSK 1: Start Learning", x: 8, y: 85 },
  { words: 150, label: "HSK 1 Ledge", band: "HSK 1 Complete", x: 18, y: 75 },
  { words: 300, label: "HSK 2 Ridge", band: "First Watchtower", x: 30, y: 65 },
  { words: 600, label: "HSK 3 Peak", band: "Mountain Temple", x: 45, y: 52 },
  { words: 1200, label: "HSK 4 Vista", band: "Above the Clouds", x: 58, y: 38 },
  { words: 2500, label: "HSK 5 Summit", band: "Near the Top", x: 72, y: 24 },
  { words: 5000, label: "HSK 6: Hanzi Master Summit", band: "5000+ words", x: 88, y: 12 },
];

// Encouraging phrases in Chinese & English
const SCHOLAR_QUOTES = [
  "加油! Keep going! 💪",
  "太棒了! Amazing! 🌟",
  "你是天才! Genius! 🧠",
  "继续攀登! Climb higher! 🏔️",
  "了不起! Incredible! ✨",
  "好样的! Well done! 🎉",
  "学无止境! Learning is endless! 📚",
  "一步一个脚印! Step by step! 👣",
  "书山有路勤为径! 🎋",
  "功夫不负有心人! 🏆",
  "知识就是力量! Knowledge is power! 💎",
  "再接再厉! Keep it up! 🚀",
];

// Path points following the Great Wall winding from bottom-left to top-right
const PATH_POINTS = [
  { x: 5, y: 88 },
  { x: 10, y: 82 },
  { x: 16, y: 76 },
  { x: 22, y: 72 },
  { x: 28, y: 67 },
  { x: 34, y: 62 },
  { x: 40, y: 56 },
  { x: 46, y: 50 },
  { x: 52, y: 44 },
  { x: 58, y: 38 },
  { x: 64, y: 32 },
  { x: 70, y: 26 },
  { x: 76, y: 22 },
  { x: 82, y: 18 },
  { x: 88, y: 12 },
];

// Interpolate position along the winding wall path
const getPositionOnPath = (progress: number) => {
  const clamped = Math.max(0, Math.min(1, progress));
  const totalSeg = PATH_POINTS.length - 1;
  const exact = clamped * totalSeg;
  const lower = Math.floor(exact);
  const upper = Math.min(lower + 1, totalSeg);
  const frac = exact - lower;
  const p1 = PATH_POINTS[lower];
  const p2 = PATH_POINTS[upper];
  return {
    x: p1.x + (p2.x - p1.x) * frac,
    y: p1.y + (p2.y - p1.y) * frac,
  };
};

const GreatWallClimber = ({ mastered, total, flyingStars, onStarLanded, containerRef }: GreatWallClimberProps) => {
  const wallRef = useRef<HTMLDivElement>(null);
  const progress = total > 0 ? mastered / total : 0;
  const position = useMemo(() => getPositionOnPath(progress), [progress]);
  const [showQuote, setShowQuote] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");
  const quoteTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevMastered = useRef(mastered);

  // Show a motivational quote when mastered count increases
  useEffect(() => {
    if (mastered > prevMastered.current) {
      setCurrentQuote(SCHOLAR_QUOTES[Math.floor(Math.random() * SCHOLAR_QUOTES.length)]);
      setShowQuote(true);
      if (quoteTimeoutRef.current) clearTimeout(quoteTimeoutRef.current);
      quoteTimeoutRef.current = setTimeout(() => setShowQuote(false), 3000);
    }
    prevMastered.current = mastered;
    return () => { if (quoteTimeoutRef.current) clearTimeout(quoteTimeoutRef.current); };
  }, [mastered]);

  // Current milestone reached
  const currentMilestone = useMemo(() => {
    let reached = MILESTONES[0];
    for (const m of MILESTONES) {
      if (mastered >= m.words) reached = m;
    }
    return reached;
  }, [mastered]);

  return (
    <div
      ref={wallRef}
      className="relative w-full rounded-2xl overflow-hidden mb-8 select-none border border-amber-900/20 shadow-lg"
      style={{ height: "340px" }}
    >
      {/* Great Wall landscape background */}
      <img
        src={greatWallBg}
        alt="Great Wall of China landscape"
        className="absolute inset-0 w-full h-full object-cover object-center"
        draggable={false}
      />

      {/* Warm overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(139,90,43,0.15) 100%)",
        }}
      />

      {/* Milestone watchtower markers */}
      {MILESTONES.map((ms) => {
        const reached = mastered >= ms.words;
        return (
          <div
            key={ms.words}
            className="absolute flex flex-col items-center"
            style={{ left: `${ms.x}%`, top: `${ms.y}%`, transform: "translate(-50%, -50%)" }}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs
              ${reached
                ? "bg-amber-500 border-amber-300 text-white shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                : "bg-white/70 border-stone-400 text-stone-500"
              }`}
            >
              {reached ? "🏯" : "⛩️"}
            </div>
            <span
              className={`text-[10px] font-bold mt-0.5 px-1.5 py-0.5 rounded whitespace-nowrap
              ${reached
                ? "bg-amber-600/90 text-white shadow-sm"
                : "bg-white/80 text-stone-700"
              }`}
            >
              {ms.band}
            </span>
            <span className="text-[9px] text-white/90 font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {ms.words} words
            </span>
          </div>
        );
      })}

      {/* Scholar character following the wall path */}
      <motion.div
        className="absolute z-10"
        animate={{ left: `${position.x}%`, top: `${position.y}%` }}
        transition={{ type: "spring", stiffness: 50, damping: 16, mass: 1.5 }}
        style={{ transform: "translate(-50%, -70%)" }}
      >
        {/* Speech bubble */}
        <AnimatePresence>
          {showQuote && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.8 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
              style={{
                backgroundColor: "rgba(255,255,255,0.95)",
                color: "#78350f",
                border: "2px solid rgba(180,83,9,0.3)",
              }}
            >
              {currentQuote}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scholar with gentle walking bobbing */}
        <motion.img
          src={scholarImg}
          alt="Chinese Scholar"
          className="w-16 h-16 object-contain drop-shadow-lg"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          draggable={false}
        />

        {/* Progress counter badge */}
        <motion.div
          className="mt-1 rounded-full px-3 py-1 text-xs font-extrabold whitespace-nowrap mx-auto w-fit"
          style={{
            backgroundColor: "#92400e",
            color: "#fef3c7",
            boxShadow: "0 3px 12px rgba(146,64,14,0.5)",
            border: "2px solid rgba(253,230,138,0.4)",
          }}
          key={mastered}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {mastered}/{total}
        </motion.div>
      </motion.div>

      {/* Progress overlay top-left */}
      <div className="absolute top-3 left-3 rounded-lg px-3 py-2 shadow border"
        style={{
          backgroundColor: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(6px)",
          borderColor: "rgba(180,83,9,0.15)",
        }}
      >
        <p className="text-xs font-bold" style={{ color: "#78350f" }}>
          🏯 Mastered: {mastered} / {total}
        </p>
        <div className="w-24 h-1.5 bg-stone-200 rounded-full mt-1 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress * 100}%`,
              background: "linear-gradient(to right, #b45309, #d97706, #f59e0b)",
            }}
          />
        </div>
      </div>

      {/* Current milestone announcement bottom-right */}
      <motion.div
        className="absolute bottom-3 right-4 rounded-lg px-3 py-1.5 text-xs font-bold"
        style={{
          backgroundColor: "rgba(255,255,255,0.9)",
          color: "#78350f",
          backdropFilter: "blur(6px)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
          border: "1px solid rgba(180,83,9,0.2)",
        }}
        key={currentMilestone.label}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        🏔️ {currentMilestone.label} — {currentMilestone.band}
      </motion.div>

      {/* Flying stars animation */}
      <AnimatePresence>
        {flyingStars.map((star) => {
          const rect = wallRef.current?.getBoundingClientRect();
          if (!rect) return null;
          const relStartX = star.startX - rect.left;
          const relStartY = star.startY - rect.top;
          const targetX = rect.width * (position.x / 100);
          const targetY = rect.height * (position.y / 100);
          return (
            <motion.div
              key={star.id}
              className="absolute z-20 pointer-events-none"
              initial={{ left: relStartX, top: relStartY, scale: 1, opacity: 1 }}
              animate={{
                left: targetX,
                top: targetY,
                scale: [1, 2, 0.6],
                opacity: [1, 1, 0],
              }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              onAnimationComplete={() => onStarLanded(star.id)}
            >
              <span className="text-2xl drop-shadow-[0_0_12px_rgba(250,204,21,0.9)]">⭐</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default GreatWallClimber;
