// Mountain Climber progress visualization — uses illustrated background image
import { useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flag, Mountain } from "lucide-react";
import mountainBg from "@/assets/mountain-climber-bg.png";

interface FlyingStar {
  id: number;
  startX: number;
  startY: number;
}

interface MountainClimberProps {
  mastered: number;
  total: number;
  flyingStars: FlyingStar[];
  onStarLanded: (id: number) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

// Milestone ledges positioned to match the illustrated mountain path
const MILESTONES = [
  { words: 0, label: "Base Camp", band: "Start Learning", x: 50, y: 88 },
  { words: 100, label: "Ledge 1", band: "Band 5.5", x: 62, y: 72 },
  { words: 300, label: "Ledge 2", band: "Band 6.5", x: 58, y: 55 },
  { words: 500, label: "Ledge 3", band: "Band 7.5", x: 54, y: 38 },
  { words: 800, label: "Summit", band: "Goal Band 8.0", x: 48, y: 14 },
];

// Climber path control points matching the winding trail in the image
const PATH_POINTS = [
  { x: 42, y: 90 },  // Base camp
  { x: 55, y: 78 },  // Trail bend 1
  { x: 60, y: 68 },  // Ledge 1 area
  { x: 56, y: 58 },  // Trail bend 2
  { x: 52, y: 48 },  // Ledge 2 area
  { x: 50, y: 38 },  // Trail bend 3
  { x: 48, y: 28 },  // Ledge 3 area
  { x: 47, y: 18 },  // Near summit
  { x: 47, y: 12 },  // Summit
];

// Interpolate position along the path based on progress (0-1)
const getPositionOnPath = (progress: number) => {
  const t = Math.min(Math.max(progress, 0), 1) * (PATH_POINTS.length - 1);
  const i = Math.floor(t);
  const frac = t - i;
  const p0 = PATH_POINTS[Math.min(i, PATH_POINTS.length - 1)];
  const p1 = PATH_POINTS[Math.min(i + 1, PATH_POINTS.length - 1)];
  return {
    x: p0.x + (p1.x - p0.x) * frac,
    y: p0.y + (p1.y - p0.y) * frac,
  };
};

const MountainClimber = ({ mastered, total, flyingStars, onStarLanded, containerRef }: MountainClimberProps) => {
  const mountainRef = useRef<HTMLDivElement>(null);
  const progress = useMemo(() => Math.min(mastered / Math.max(total, 1), 1), [mastered, total]);
  const climberPos = useMemo(() => getPositionOnPath(progress), [progress]);

  // Current milestone
  const currentMilestone = useMemo(() => {
    let reached = MILESTONES[0];
    for (const m of MILESTONES) {
      if (mastered >= m.words) reached = m;
    }
    return reached;
  }, [mastered]);

  return (
    <div
      ref={mountainRef}
      className="relative w-full rounded-2xl overflow-hidden mb-8 select-none"
      style={{ height: "280px" }}
    >
      {/* Illustrated mountain background */}
      <img
        src={mountainBg}
        alt="Mountain climbing progress"
        className="absolute inset-0 w-full h-full object-cover object-center"
        draggable={false}
      />

      {/* Subtle gradient overlay for label readability */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 100%)" }} />

      {/* Milestone markers along the path */}
      {MILESTONES.map((m, i) => {
        const isReached = mastered >= m.words;
        return (
          <motion.div
            key={m.label}
            className="absolute flex items-center gap-1.5"
            style={{ left: `${m.x}%`, top: `${m.y}%`, transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.12 }}
          >
            {/* Glowing waypoint dot */}
            <div className="rounded-full shrink-0" style={{
              width: i === MILESTONES.length - 1 ? 16 : 12,
              height: i === MILESTONES.length - 1 ? 16 : 12,
              backgroundColor: isReached ? "#22c55e" : "rgba(255,255,255,0.7)",
              boxShadow: isReached
                ? "0 0 12px rgba(34,197,94,0.7), 0 0 4px rgba(34,197,94,0.4)"
                : "0 0 6px rgba(255,255,255,0.4)",
              border: isReached ? "2px solid #16a34a" : "2px solid rgba(200,200,200,0.5)",
            }} />
            {/* Label badge */}
            <div className="rounded-lg px-2.5 py-1 text-xs font-bold whitespace-nowrap" style={{
              backgroundColor: isReached ? "rgba(34,197,94,0.9)" : "rgba(30,41,59,0.8)",
              color: "#ffffff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
              backdropFilter: "blur(4px)",
            }}>
              {m.words > 0 ? `${m.words} words` : m.label} ({m.band})
            </div>
          </motion.div>
        );
      })}

      {/* Climber — follows the winding path */}
      <motion.div
        className="absolute z-10"
        animate={{
          left: `${climberPos.x}%`,
          top: `${climberPos.y}%`,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 16, mass: 1.5 }}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="flex flex-col items-center">
          {/* Climber with gentle bobbing */}
          <motion.div
            className="text-4xl select-none drop-shadow-lg"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            🧗
          </motion.div>
          {/* Progress counter badge */}
          <motion.div
            className="mt-1 rounded-full px-3 py-1 text-xs font-extrabold whitespace-nowrap"
            style={{
              backgroundColor: "#1d4ed8",
              color: "#fff",
              boxShadow: "0 3px 12px rgba(29,78,216,0.5)",
              border: "2px solid rgba(255,255,255,0.4)",
            }}
            key={mastered}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {mastered}/{total}
          </motion.div>
        </div>
      </motion.div>

      {/* Current milestone announcement */}
      <motion.div
        className="absolute bottom-3 right-4 rounded-lg px-3 py-1.5 text-xs font-bold"
        style={{
          backgroundColor: "rgba(255,255,255,0.9)",
          color: "#1e293b",
          backdropFilter: "blur(6px)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
          border: "1px solid rgba(226,232,240,0.8)",
        }}
        key={currentMilestone.label}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Mountain size={14} className="inline mr-1.5 text-primary" />
        {currentMilestone.label} — {currentMilestone.band}
      </motion.div>

      {/* Flying stars animation */}
      <AnimatePresence>
        {flyingStars.map(star => {
          const mountRect = mountainRef.current?.getBoundingClientRect();
          if (!mountRect) return null;

          const relStartX = star.startX - mountRect.left;
          const relStartY = star.startY - mountRect.top;
          const targetX = mountRect.width * (climberPos.x / 100);
          const targetY = mountRect.height * (climberPos.y / 100);

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

export default MountainClimber;
