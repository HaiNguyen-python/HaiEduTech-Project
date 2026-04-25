// TOEIC Career Climber – progress visualisation themed for the TOEIC vocab journey.
// Shows a chibi business climber making their way up a sunny corporate skyline path,
// with milestone "career checkpoints" tied to TOEIC band scores.
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toeicBg from "@/assets/toeic-mountain-bg.jpg";
import toeicClimber from "@/assets/toeic-climber-character.png";

interface FlyingStar {
  id: number;
  startX: number;
  startY: number;
}

interface ToeicMountainClimberProps {
  mastered: number;
  total: number;
  flyingStars: FlyingStar[];
  onStarLanded: (id: number) => void;
}

// Career milestones along the TOEIC business journey.
// `x` / `y` percentages match the winding stair-path in the illustration.
const MILESTONES = [
  { words: 0, label: "Internship", band: "TOEIC 400+", x: 18, y: 92 },
  { words: 80, label: "Junior", band: "TOEIC 500+", x: 32, y: 80 },
  { words: 200, label: "Associate", band: "TOEIC 650+", x: 48, y: 68 },
  { words: 320, label: "Manager", band: "TOEIC 750+", x: 60, y: 54 },
  { words: 420, label: "Director", band: "TOEIC 850+", x: 72, y: 38 },
  { words: 500, label: "CEO Summit", band: "TOEIC 990", x: 78, y: 18 },
];

// Encouraging business-themed quotes shown when a new word is mastered.
const CLIMBER_QUOTES = [
  "Let's close this deal! 💼",
  "One word, one promotion! 📈",
  "I see the corner office! 🏙️",
  "Let's nail this presentation! 🎤",
  "We're scaling fast! 🚀",
  "Business English, easy! ✅",
  "Almost at the boardroom! 🏆",
  "Networking like a pro! 🤝",
  "From intern to CEO! 👔",
  "Every word boosts the resume! 📝",
  "Profits up, vocabulary up! 💰",
  "Mr. Hai is so proud! 👏",
];

// Path control points matching the staircase in the illustration.
const PATH_POINTS = [
  { x: 12, y: 95 },
  { x: 22, y: 88 },
  { x: 32, y: 80 },
  { x: 42, y: 72 },
  { x: 50, y: 64 },
  { x: 58, y: 56 },
  { x: 64, y: 48 },
  { x: 70, y: 38 },
  { x: 74, y: 28 },
  { x: 78, y: 18 },
];

const getPositionOnPath = (progress: number) => {
  const clamped = Math.max(0, Math.min(1, progress));
  const total = PATH_POINTS.length - 1;
  const exact = clamped * total;
  const lower = Math.floor(exact);
  const upper = Math.min(lower + 1, total);
  const frac = exact - lower;
  const p1 = PATH_POINTS[lower];
  const p2 = PATH_POINTS[upper];
  return { x: p1.x + (p2.x - p1.x) * frac, y: p1.y + (p2.y - p1.y) * frac };
};

const ToeicMountainClimber = ({
  mastered,
  total,
  flyingStars,
  onStarLanded,
}: ToeicMountainClimberProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const progress = total > 0 ? mastered / total : 0;
  const position = useMemo(() => getPositionOnPath(progress), [progress]);
  const [showQuote, setShowQuote] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");
  const quoteTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevMastered = useRef(mastered);

  // Trigger a fresh business quote whenever a word is mastered.
  useEffect(() => {
    if (mastered > prevMastered.current) {
      setCurrentQuote(
        CLIMBER_QUOTES[Math.floor(Math.random() * CLIMBER_QUOTES.length)],
      );
      setShowQuote(true);
      if (quoteTimer.current) clearTimeout(quoteTimer.current);
      quoteTimer.current = setTimeout(() => setShowQuote(false), 3000);
    }
    prevMastered.current = mastered;
    return () => {
      if (quoteTimer.current) clearTimeout(quoteTimer.current);
    };
  }, [mastered]);

  const currentMilestone = useMemo(() => {
    let reached = MILESTONES[0];
    for (const m of MILESTONES) if (mastered >= m.words) reached = m;
    return reached;
  }, [mastered]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full rounded-2xl overflow-hidden mb-8 select-none border border-sky-300/40 shadow-lg"
      style={{ height: "340px" }}
    >
      {/* Sunny business cityscape background */}
      <img
        src={toeicBg}
        alt="TOEIC career skyline"
        className="absolute inset-0 w-full h-full object-cover object-center"
        draggable={false}
        loading="lazy"
      />

      {/* Soft sunlight overlay – brightens the scene a touch */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(186,230,253,0.18) 100%)",
        }}
      />

      {/* Career milestones */}
      {MILESTONES.map((ms) => {
        const reached = mastered >= ms.words;
        return (
          <div
            key={ms.words}
            className="absolute flex flex-col items-center"
            style={{
              left: `${ms.x}%`,
              top: `${ms.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs ${
                reached
                  ? "bg-blue-500 border-blue-200 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                  : "bg-white/80 border-slate-400 text-slate-500"
              }`}
            >
              {reached ? "💼" : "🏢"}
            </div>
            <span
              className={`text-[10px] font-bold mt-0.5 px-1.5 py-0.5 rounded whitespace-nowrap ${
                reached
                  ? "bg-blue-600/95 text-white shadow-sm"
                  : "bg-white/90 text-slate-700"
              }`}
            >
              {ms.band}
            </span>
            <span className="text-[9px] font-medium mt-0.5 px-1 rounded bg-white/80 text-slate-700">
              {ms.label}
            </span>
          </div>
        );
      })}

      {/* Climber character */}
      <motion.div
        className="absolute z-10"
        animate={{ left: `${position.x}%`, top: `${position.y}%` }}
        transition={{ type: "spring", stiffness: 50, damping: 16, mass: 1.5 }}
        style={{ transform: "translate(-50%, -75%)" }}
      >
        <AnimatePresence>
          {showQuote && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.8 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
              style={{
                backgroundColor: "rgba(255,255,255,0.97)",
                color: "#1e3a8a",
                border: "2px solid rgba(59,130,246,0.35)",
              }}
            >
              {currentQuote}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.img
          src={toeicClimber}
          alt="TOEIC chibi climber"
          className="w-20 h-20 object-contain drop-shadow-lg"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          draggable={false}
          loading="lazy"
        />

        <motion.div
          className="mt-1 rounded-full px-3 py-1 text-xs font-extrabold whitespace-nowrap mx-auto w-fit"
          style={{
            backgroundColor: "#1d4ed8",
            color: "#dbeafe",
            boxShadow: "0 3px 12px rgba(29,78,216,0.5)",
            border: "2px solid rgba(191,219,254,0.5)",
          }}
          key={mastered}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {mastered}/{total}
        </motion.div>
      </motion.div>

      {/* Top-left progress card */}
      <div
        className="absolute top-3 left-3 rounded-lg px-3 py-2 shadow border"
        style={{
          backgroundColor: "rgba(255,255,255,0.93)",
          backdropFilter: "blur(6px)",
          borderColor: "rgba(59,130,246,0.25)",
        }}
      >
        <p className="text-xs font-bold" style={{ color: "#1e3a8a" }}>
          💼 Mastered: {mastered} / {total}
        </p>
        <div className="w-28 h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress * 100}%`,
              background: "linear-gradient(to right, #1d4ed8, #3b82f6, #38bdf8)",
            }}
          />
        </div>
      </div>

      {/* Current career level (bottom-right) */}
      <motion.div
        className="absolute bottom-3 right-4 rounded-lg px-3 py-1.5 text-xs font-bold"
        style={{
          backgroundColor: "rgba(255,255,255,0.93)",
          color: "#1e3a8a",
          backdropFilter: "blur(6px)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
          border: "1px solid rgba(59,130,246,0.25)",
        }}
        key={currentMilestone.label}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        🏙️ {currentMilestone.label} – {currentMilestone.band}
      </motion.div>

      {/* Flying stars (mastery feedback) */}
      <AnimatePresence>
        {flyingStars.map((star) => {
          const rect = wrapRef.current?.getBoundingClientRect();
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
              <span className="text-2xl drop-shadow-[0_0_12px_rgba(250,204,21,0.9)]">
                ⭐
              </span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ToeicMountainClimber;
