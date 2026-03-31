// Finnish Skier progress visualization — Nordic gamification for YKI vocab mastery
import { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flag } from "lucide-react";
import skierBg from "@/assets/finnish-skier-bg.png";
import skierImg from "@/assets/skier-character.png";

interface FlyingStar {
  id: number;
  startX: number;
  startY: number;
}

interface FinnishSkierProps {
  mastered: number;
  total: number;
  flyingStars: FlyingStar[];
  onStarLanded: (id: number) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

// Milestone checkpoints on the ski slope
const MILESTONES = [
  { words: 0, label: "Base Camp", band: "Aloitetaan!", x: 15, y: 88 },
  { words: 40, label: "Ledge 1", band: "A1 Start", x: 30, y: 72 },
  { words: 80, label: "Ledge 2", band: "A1 Mid", x: 45, y: 58 },
  { words: 150, label: "Ledge 3", band: "A1 Ready", x: 55, y: 44 },
  { words: 250, label: "Summit", band: "YKI A2 ⛷️", x: 68, y: 22 },
];

// Finnish motivational quotes
const SKIER_QUOTES = [
  "Hienoa työtä! 🎿",
  "Jatka samaan malliin! ❄️",
  "Olet todella taitava! 🌟",
  "Mahtavaa! Eteenpäin! 🏔️",
  "Loistavaa! 🇫🇮",
  "Hyvin menee! ⛷️",
  "Upea suoritus! ✨",
  "Sisu! Älä luovuta! 💪",
];

// Path points for the skier to follow (bottom-left to top-right)
const PATH_POINTS = [
  { x: 12, y: 90 }, { x: 18, y: 85 }, { x: 24, y: 78 },
  { x: 30, y: 72 }, { x: 36, y: 66 }, { x: 42, y: 60 },
  { x: 48, y: 54 }, { x: 54, y: 46 }, { x: 58, y: 40 },
  { x: 62, y: 34 }, { x: 66, y: 28 }, { x: 68, y: 22 },
];

// Interpolate position along the path
const getPositionOnPath = (progress: number) => {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const totalSegments = PATH_POINTS.length - 1;
  const exactIndex = clampedProgress * totalSegments;
  const lowerIndex = Math.floor(exactIndex);
  const upperIndex = Math.min(lowerIndex + 1, totalSegments);
  const segmentProgress = exactIndex - lowerIndex;
  const p1 = PATH_POINTS[lowerIndex];
  const p2 = PATH_POINTS[upperIndex];
  return {
    x: p1.x + (p2.x - p1.x) * segmentProgress,
    y: p1.y + (p2.y - p1.y) * segmentProgress,
  };
};

const FinnishSkier = ({ mastered, total, flyingStars, onStarLanded, containerRef }: FinnishSkierProps) => {
  const progress = total > 0 ? mastered / total : 0;
  const position = useMemo(() => getPositionOnPath(progress), [progress]);
  const [showQuote, setShowQuote] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");
  const quoteTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Show a motivational quote when mastered count changes
  useEffect(() => {
    if (mastered > 0) {
      setCurrentQuote(SKIER_QUOTES[Math.floor(Math.random() * SKIER_QUOTES.length)]);
      setShowQuote(true);
      if (quoteTimeoutRef.current) clearTimeout(quoteTimeoutRef.current);
      quoteTimeoutRef.current = setTimeout(() => setShowQuote(false), 3000);
    }
    return () => { if (quoteTimeoutRef.current) clearTimeout(quoteTimeoutRef.current); };
  }, [mastered]);

  return (
    <div ref={containerRef} className="relative w-full rounded-2xl overflow-hidden border border-[#003580]/15 shadow-lg" style={{ height: 340 }}>
      {/* Background: Snowy fell */}
      <img
        src={skierBg}
        alt="Finnish snowy fell landscape"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />

      {/* Milestone markers */}
      {MILESTONES.map((ms) => {
        const reached = mastered >= ms.words;
        return (
          <div
            key={ms.words}
            className="absolute flex flex-col items-center"
            style={{ left: `${ms.x}%`, top: `${ms.y}%`, transform: "translate(-50%, -50%)" }}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs
              ${reached
                ? "bg-emerald-500 border-emerald-300 text-white"
                : "bg-white/80 border-slate-300 text-slate-500"}`}
            >
              {reached ? "✓" : <Flag className="w-2.5 h-2.5" />}
            </div>
            <span className={`text-[10px] font-bold mt-0.5 px-1 py-0.5 rounded whitespace-nowrap
              ${reached ? "bg-emerald-500/90 text-white" : "bg-white/80 text-slate-700"}`}>
              {ms.band}
            </span>
            <span className="text-[9px] text-white/90 font-medium drop-shadow">
              {ms.words} words
            </span>
          </div>
        );
      })}

      {/* Skier character */}
      <motion.div
        className="absolute"
        animate={{ left: `${position.x}%`, top: `${position.y}%` }}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
        style={{ transform: "translate(-50%, -70%)" }}
      >
        <motion.img
          src={skierImg}
          alt="Finnish Skier"
          className="w-14 h-14 object-contain drop-shadow-lg"
          animate={{ rotate: [0, -3, 3, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />

        {/* Speech bubble */}
        <AnimatePresence>
          {showQuote && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.8 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 text-[#003580] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-[#003580]/20"
            >
              {currentQuote}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Flying stars */}
      <AnimatePresence>
        {flyingStars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ left: star.startX, top: star.startY, opacity: 1, scale: 1 }}
            animate={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              opacity: 0,
              scale: 0.3,
            }}
            transition={{ duration: 0.8, ease: "easeIn" }}
            onAnimationComplete={() => onStarLanded(star.id)}
            className="absolute text-xl pointer-events-none z-20"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            ⭐
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Progress overlay */}
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow border border-[#003580]/10">
        <p className="text-xs font-bold text-[#003580]">
          ⛷️ {mastered} / {total} words mastered
        </p>
        <div className="w-24 h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#003580] to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default FinnishSkier;
