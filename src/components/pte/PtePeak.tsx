/**
 * @file PtePeak.tsx
 * @description PTE Peak gamification — climber heading toward Band 90 summit.
 *              Reuses MountainClimber visual but with PTE band milestones.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Mountain } from "lucide-react";
import mountainBg from "@/assets/pte/pte-mountain-bg.png";
import climberImg from "@/assets/pte/pte-climber.png";

interface PtePeakProps {
  // Total tasks completed across all PTE modules
  completed: number;
  // Total possible tasks (used for progress percentage)
  total: number;
}

// PTE band milestones along the climb
const PTE_MILESTONES = [
  { tasksRatio: 0.0, band: 30, label: "Base Camp" },
  { tasksRatio: 0.2, band: 50, label: "Ledge 1 — Band 50" },
  { tasksRatio: 0.45, band: 65, label: "Ledge 2 — Band 65" },
  { tasksRatio: 0.7, band: 79, label: "Ledge 3 — Band 79" },
  { tasksRatio: 0.9, band: 85, label: "Near Summit — Band 85" },
  { tasksRatio: 1.0, band: 90, label: "Summit — Band 90 🏆" },
];

const PATH_POINTS = [
  { x: 42, y: 90 }, { x: 55, y: 78 }, { x: 60, y: 68 },
  { x: 56, y: 58 }, { x: 52, y: 48 }, { x: 50, y: 38 },
  { x: 48, y: 28 }, { x: 47, y: 18 }, { x: 47, y: 12 },
];

const getPositionOnPath = (progress: number) => {
  const t = Math.min(Math.max(progress, 0), 1) * (PATH_POINTS.length - 1);
  const i = Math.floor(t);
  const frac = t - i;
  const p0 = PATH_POINTS[Math.min(i, PATH_POINTS.length - 1)];
  const p1 = PATH_POINTS[Math.min(i + 1, PATH_POINTS.length - 1)];
  return { x: p0.x + (p1.x - p0.x) * frac, y: p0.y + (p1.y - p0.y) * frac };
};

const PtePeak = ({ completed, total }: PtePeakProps) => {
  const mountainRef = useRef<HTMLDivElement>(null);
  const progress = useMemo(() => Math.min(completed / Math.max(total, 1), 1), [completed, total]);
  const climberPos = useMemo(() => getPositionOnPath(progress), [progress]);
  const currentMilestone = useMemo(() => {
    let reached = PTE_MILESTONES[0];
    for (const m of PTE_MILESTONES) if (progress >= m.tasksRatio) reached = m;
    return reached;
  }, [progress]);

  return (
    <div
      ref={mountainRef}
      className="relative w-full rounded-2xl overflow-hidden mb-6 select-none border-2 border-[#003580]/20 shadow-md"
      style={{ height: "300px" }}
    >
      <img src={mountainBg} alt="PTE Peak progress" className="absolute inset-0 w-full h-full object-cover object-center" draggable={false} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,53,128,0.15) 0%, rgba(255,255,255,0.05) 100%)" }} />

      <motion.div
        className="absolute z-10"
        animate={{ left: `${climberPos.x}%`, top: `${climberPos.y}%` }}
        transition={{ type: "spring", stiffness: 50, damping: 16, mass: 1.5 }}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="flex flex-col items-center">
          <motion.img
            src={climberImg}
            alt="PTE Academic student climber"
            style={{ width: "60px", height: "60px", objectFit: "contain" }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            draggable={false}
            className="drop-shadow-lg"
          />
          <div className="mt-1 rounded-full px-3 py-1 text-xs font-extrabold whitespace-nowrap bg-[#003580] text-white shadow-md border-2 border-white/40">
            {completed}/{total} · Target Band {currentMilestone.band}
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-3 right-4 rounded-lg px-3 py-1.5 text-xs font-bold bg-white/95 text-[#003580] shadow border border-[#003580]/20">
        <Mountain size={14} className="inline mr-1.5" />
        {currentMilestone.label}
      </div>
      <div className="absolute top-3 left-4 rounded-lg px-3 py-1.5 text-xs font-bold bg-[#003580] text-white shadow">
        🎯 PTE Peak — Climb to Band 90
      </div>
    </div>
  );
};

export default PtePeak;
