// Mountain Climber with flying star animation — climber moves up as words are mastered
import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flag, Mountain } from "lucide-react";

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

// Milestone ledges on the mountain path
const MILESTONES = [
  { words: 0, label: "Base Camp", band: "Start", y: 90 },
  { words: 100, label: "Ledge 1", band: "Band 5.5", y: 72 },
  { words: 300, label: "Ledge 2", band: "Band 6.5", y: 54 },
  { words: 500, label: "Ledge 3", band: "Band 7.5", y: 36 },
  { words: 800, label: "Summit", band: "Band 8.0+", y: 10 },
];

const MountainClimber = ({ mastered, total, flyingStars, onStarLanded, containerRef }: MountainClimberProps) => {
  const mountainRef = useRef<HTMLDivElement>(null);
  const progress = useMemo(() => Math.min((mastered / Math.max(total, 1)) * 100, 100), [mastered, total]);

  // Climber Y position (90% = bottom, 8% = top)
  const climberY = useMemo(() => {
    const minY = 8;
    const maxY = 90;
    return maxY - (progress / 100) * (maxY - minY);
  }, [progress]);

  // Current milestone
  const currentMilestone = useMemo(() => {
    let reached = MILESTONES[0];
    for (const m of MILESTONES) {
      if (mastered >= m.words) reached = m;
    }
    return reached;
  }, [mastered]);

  // Compute flying star target position (climber location in viewport coords)
  const getClimberScreenPos = useCallback(() => {
    if (!mountainRef.current) return { x: 0, y: 0 };
    const rect = mountainRef.current.getBoundingClientRect();
    return {
      x: rect.left + rect.width * 0.5,
      y: rect.top + rect.height * (climberY / 100),
    };
  }, [climberY]);

  return (
    <div ref={mountainRef} className="relative w-full rounded-2xl overflow-hidden mb-8" style={{ height: "220px", background: "linear-gradient(180deg, #dbeafe 0%, #eff6ff 40%, #f0fdf4 100%)" }}>

      {/* Mountain SVG */}
      <svg viewBox="0 0 1200 220" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <polygon points="0,220 200,60 400,220" fill="#cbd5e1" opacity="0.5" />
        <polygon points="150,220 400,30 650,220" fill="#94a3b8" opacity="0.6" />
        <polygon points="300,220 600,15 900,220" fill="#64748b" opacity="0.7" />
        <polygon points="540,55 600,15 660,55" fill="#f8fafc" opacity="0.9" />
        <polygon points="700,220 950,80 1200,220" fill="#94a3b8" opacity="0.5" />
        <rect x="0" y="190" width="1200" height="30" fill="#86efac" opacity="0.3" />
        <path
          d="M 200,200 Q 300,180 350,160 Q 420,140 480,120 Q 540,100 570,80 Q 590,60 600,40"
          stroke="#a78bfa" strokeWidth="3" fill="none" strokeDasharray="8 4" opacity="0.6"
        />
      </svg>

      {/* Milestone markers */}
      {MILESTONES.map((m, i) => {
        const isReached = mastered >= m.words;
        const xPositions = [17, 30, 42, 52, 50];
        return (
          <motion.div
            key={m.label}
            className="absolute flex items-center gap-1.5"
            style={{ left: `${xPositions[i]}%`, top: `${m.y}%`, transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.12 }}
          >
            <div className="rounded-full shrink-0" style={{
              width: i === MILESTONES.length - 1 ? 14 : 10,
              height: i === MILESTONES.length - 1 ? 14 : 10,
              backgroundColor: isReached ? "#22c55e" : "#d1d5db",
              boxShadow: isReached ? "0 0 8px rgba(34,197,94,0.6)" : "none",
            }} />
            <div className="rounded-md px-2 py-0.5 text-xs font-semibold whitespace-nowrap" style={{
              backgroundColor: isReached ? "rgba(34,197,94,0.15)" : "rgba(0,0,0,0.5)",
              color: isReached ? "#166534" : "#f8fafc",
              border: isReached ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(255,255,255,0.15)",
            }}>
              {m.words > 0 ? `${m.words} words` : m.label} ({m.band})
            </div>
          </motion.div>
        );
      })}

      {/* Flag at summit */}
      <motion.div
        className="absolute"
        style={{ left: "50%", top: "4%", transform: "translateX(-50%)" }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Flag size={22} className="text-red-500 fill-red-500 drop-shadow-md" />
      </motion.div>

      {/* Climber — spring animation when moving */}
      <motion.div
        className="absolute z-10"
        style={{ left: "50%", transform: "translateX(-50%)" }}
        animate={{ top: `${climberY}%` }}
        transition={{ type: "spring", stiffness: 60, damping: 14, mass: 1.2 }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            className="text-3xl select-none"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            🧗
          </motion.div>
          <div className="mt-1 rounded-full px-3 py-0.5 text-xs font-bold whitespace-nowrap shadow-md"
            style={{ backgroundColor: "#1d4ed8", color: "#fff" }}>
            {mastered}/{total}
          </div>
        </div>
      </motion.div>

      {/* Current milestone badge */}
      <motion.div
        className="absolute bottom-3 right-4 rounded-lg px-3 py-1.5 text-xs font-semibold"
        style={{ backgroundColor: "rgba(255,255,255,0.85)", color: "#1e293b", backdropFilter: "blur(4px)", border: "1px solid #e2e8f0" }}
        key={currentMilestone.label}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Mountain size={14} className="inline mr-1.5 text-primary" />
        {currentMilestone.label} — {currentMilestone.band}
      </motion.div>

      {/* Flying stars — rendered inside the mountain container via portal-like absolute positioning */}
      <AnimatePresence>
        {flyingStars.map(star => {
          // Calculate relative position within the mountain container
          const mountRect = mountainRef.current?.getBoundingClientRect();
          const containerRect = containerRef.current?.getBoundingClientRect();
          if (!mountRect || !containerRect) return null;

          // Star start position relative to mountain container
          const relStartX = star.startX - mountRect.left;
          const relStartY = star.startY - mountRect.top;
          // Target: climber position
          const targetX = mountRect.width * 0.5;
          const targetY = mountRect.height * (climberY / 100);

          return (
            <motion.div
              key={star.id}
              className="absolute z-20 pointer-events-none"
              initial={{
                left: relStartX,
                top: relStartY,
                scale: 1,
                opacity: 1,
              }}
              animate={{
                left: targetX,
                top: targetY,
                scale: [1, 1.8, 0.5],
                opacity: [1, 1, 0],
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              onAnimationComplete={() => onStarLanded(star.id)}
            >
              <span className="text-2xl drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]">⭐</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default MountainClimber;
