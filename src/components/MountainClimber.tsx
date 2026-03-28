// Mountain Climber progress visualization — climber moves up as words are mastered
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Flag, Mountain } from "lucide-react";

interface MountainClimberProps {
  mastered: number;
  total: number;
}

// Milestone ledges on the mountain path
const MILESTONES = [
  { words: 0, label: "Base Camp", band: "Start Learning", y: 92 },
  { words: 100, label: "Ledge 1", band: "Band 5.5", y: 74 },
  { words: 300, label: "Ledge 2", band: "Band 6.5", y: 56 },
  { words: 500, label: "Ledge 3", band: "Band 7.5", y: 38 },
  { words: 800, label: "Summit", band: "Band 8.0+", y: 12 },
];

const MountainClimber = ({ mastered, total }: MountainClimberProps) => {
  // Calculate climber position as a percentage along the path (0-100)
  const progress = useMemo(() => Math.min((mastered / Math.max(total, 1)) * 100, 100), [mastered, total]);

  // Map progress to vertical position (92% = bottom, 8% = top)
  const climberY = useMemo(() => {
    const minY = 8;
    const maxY = 92;
    return maxY - (progress / 100) * (maxY - minY);
  }, [progress]);

  // Determine which milestone the climber has reached
  const currentMilestone = useMemo(() => {
    let reached = MILESTONES[0];
    for (const m of MILESTONES) {
      if (mastered >= m.words) reached = m;
    }
    return reached;
  }, [mastered]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden mb-8" style={{ height: "220px", background: "linear-gradient(180deg, #dbeafe 0%, #eff6ff 40%, #f0fdf4 100%)" }}>

      {/* Mountain silhouette — SVG */}
      <svg viewBox="0 0 1200 220" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {/* Far mountain */}
        <polygon points="0,220 200,60 400,220" fill="#cbd5e1" opacity="0.5" />
        <polygon points="150,220 400,30 650,220" fill="#94a3b8" opacity="0.6" />
        {/* Main mountain */}
        <polygon points="300,220 600,15 900,220" fill="#64748b" opacity="0.7" />
        {/* Snow cap */}
        <polygon points="540,55 600,15 660,55" fill="#f8fafc" opacity="0.9" />
        {/* Near hill */}
        <polygon points="700,220 950,80 1200,220" fill="#94a3b8" opacity="0.5" />
        {/* Ground */}
        <rect x="0" y="190" width="1200" height="30" fill="#86efac" opacity="0.3" />

        {/* Winding path up the mountain */}
        <path
          d="M 200,200 Q 300,180 350,160 Q 420,140 480,120 Q 540,100 570,80 Q 590,60 600,40"
          stroke="#a78bfa"
          strokeWidth="3"
          fill="none"
          strokeDasharray="8 4"
          opacity="0.6"
        />
      </svg>

      {/* Milestone markers */}
      {MILESTONES.map((m, i) => {
        const isReached = mastered >= m.words;
        // Position milestones along the path
        const xPositions = [17, 30, 42, 52, 50];
        const x = xPositions[i];
        return (
          <motion.div
            key={m.label}
            className="absolute flex items-center gap-1.5"
            style={{ left: `${x}%`, top: `${m.y}%`, transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15 }}
          >
            {/* Glowing dot */}
            <div
              className="rounded-full shrink-0"
              style={{
                width: i === MILESTONES.length - 1 ? 14 : 10,
                height: i === MILESTONES.length - 1 ? 14 : 10,
                backgroundColor: isReached ? "#22c55e" : "#d1d5db",
                boxShadow: isReached ? "0 0 8px rgba(34,197,94,0.6)" : "none",
              }}
            />
            {/* Label badge */}
            <div
              className="rounded-md px-2 py-0.5 text-xs font-semibold whitespace-nowrap"
              style={{
                backgroundColor: isReached ? "rgba(34,197,94,0.15)" : "rgba(0,0,0,0.5)",
                color: isReached ? "#166534" : "#f8fafc",
                border: isReached ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {m.words > 0 ? `${m.words} words` : m.label} ({m.band})
            </div>
          </motion.div>
        );
      })}

      {/* Flag at summit */}
      <motion.div
        className="absolute"
        style={{ left: "50%", top: "6%", transform: "translateX(-50%)" }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Flag size={22} className="text-red-500 fill-red-500 drop-shadow-md" />
      </motion.div>

      {/* Climber character — moves up with progress */}
      <motion.div
        className="absolute z-10"
        style={{ left: "50%", transform: "translateX(-50%)" }}
        animate={{ top: `${climberY}%` }}
        transition={{ type: "spring", stiffness: 80, damping: 18, mass: 1 }}
      >
        <div className="flex flex-col items-center">
          {/* Climber emoji figure */}
          <motion.div
            className="text-3xl select-none"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            🧗
          </motion.div>
          {/* Progress label under climber */}
          <div
            className="mt-1 rounded-full px-3 py-0.5 text-xs font-bold whitespace-nowrap shadow-md"
            style={{ backgroundColor: "#1d4ed8", color: "#ffffff" }}
          >
            {mastered}/{total}
          </div>
        </div>
      </motion.div>

      {/* Current milestone announcement */}
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
    </div>
  );
};

export default MountainClimber;
