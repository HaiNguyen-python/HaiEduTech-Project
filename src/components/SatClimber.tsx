// SAT Climber progress visualization - SAT-themed background and milestones
import { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";
import satBg from "@/assets/sat-climber-bg.jpg";
import climberImg from "@/assets/climber-character.webp";

interface FlyingStar { id: number; startX: number; startY: number; }

interface SatClimberProps {
  mastered: number;
  total: number;
  flyingStars: FlyingStar[];
  onStarLanded: (id: number) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

// SAT milestones — score targets mapped to mastered word counts
const MILESTONES = [
  { words: 0,   label: "Base", band: "Start your SAT prep" },
  { words: 30,  label: "Score 1000+", band: "Solid foundation" },
  { words: 80,  label: "Score 1200+", band: "Competitive" },
  { words: 150, label: "Score 1400+", band: "Top tier" },
  { words: 250, label: "Score 1500+", band: "Elite" },
  { words: 400, label: "Score 1600", band: "Perfect Score 🏆" },
];

const QUOTES = [
  "Crushing it! On the way to 1600! 🎯",
  "Every word = +10 SAT points! 💯",
  "Ivy League, here we come! 🎓",
  "Vocabulary is power on the SAT! 📚",
  "Stay focused, future scholar! ✨",
  "Reading + Math = success! 🧠",
  "Mr. Hai believes in you! 👏",
];

// Path along the winding SAT trail in the background
const PATH_POINTS = [
  { x: 18, y: 92 },
  { x: 32, y: 82 },
  { x: 45, y: 72 },
  { x: 56, y: 62 },
  { x: 65, y: 52 },
  { x: 72, y: 42 },
  { x: 78, y: 30 },
  { x: 82, y: 20 },
];

const getPositionOnPath = (progress: number) => {
  const t = Math.min(Math.max(progress, 0), 1) * (PATH_POINTS.length - 1);
  const i = Math.floor(t);
  const frac = t - i;
  const p0 = PATH_POINTS[Math.min(i, PATH_POINTS.length - 1)];
  const p1 = PATH_POINTS[Math.min(i + 1, PATH_POINTS.length - 1)];
  return { x: p0.x + (p1.x - p0.x) * frac, y: p0.y + (p1.y - p0.y) * frac };
};

const SatClimber = ({ mastered, total, flyingStars, onStarLanded }: SatClimberProps) => {
  const mountainRef = useRef<HTMLDivElement>(null);
  const progress = useMemo(() => Math.min(mastered / Math.max(total, 1), 1), [mastered, total]);
  const climberPos = useMemo(() => getPositionOnPath(progress), [progress]);
  const [speech, setSpeech] = useState<string | null>(null);
  const prev = useRef(mastered);

  useEffect(() => {
    if (mastered > prev.current) {
      setSpeech(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
      const t = setTimeout(() => setSpeech(null), 3000);
      return () => clearTimeout(t);
    }
    prev.current = mastered;
  }, [mastered]);

  const currentMilestone = useMemo(() => {
    let reached = MILESTONES[0];
    for (const m of MILESTONES) if (mastered >= m.words) reached = m;
    return reached;
  }, [mastered]);

  return (
    <div ref={mountainRef} className="relative w-full rounded-2xl overflow-hidden mb-8 select-none" style={{ height: "340px" }}>
      <img src={satBg} alt="SAT climbing progress" loading="lazy" width={1920} height={1080}
        className="absolute inset-0 w-full h-full object-cover object-center" draggable={false} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 100%)" }} />

      <motion.div
        className="absolute z-10"
        animate={{ left: `${climberPos.x}%`, top: `${climberPos.y}%` }}
        transition={{ type: "spring", stiffness: 50, damping: 16, mass: 1.5 }}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="flex items-end gap-1">
          <AnimatePresence>
            {speech && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.5, x: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative rounded-xl whitespace-nowrap"
                style={{ backgroundColor: "#fff", color: "#1e293b", fontSize: "13px", fontWeight: 700, padding: "6px 12px", boxShadow: "0 4px 14px rgba(0,0,0,0.15)", border: "2px solid #e2e8f0", marginBottom: "8px" }}
              >
                {speech}
                <div style={{ position: "absolute", right: "-6px", bottom: "10px", width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "6px solid #fff" }} />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex flex-col items-center">
            <motion.img src={climberImg} alt="Climber" className="select-none drop-shadow-lg"
              style={{ width: "64px", height: "64px", objectFit: "contain" }}
              animate={{ y: [0, -4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} draggable={false} />
            <motion.div
              className="mt-1 rounded-full px-3 py-1 text-xs font-extrabold whitespace-nowrap"
              style={{ backgroundColor: "#1d4ed8", color: "#fff", boxShadow: "0 3px 12px rgba(29,78,216,0.5)", border: "2px solid rgba(255,255,255,0.4)" }}
              key={mastered} initial={{ scale: 1.3 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}
            >
              {mastered}/{total}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-3 right-4 rounded-lg px-3 py-1.5 text-xs font-bold"
        style={{ backgroundColor: "rgba(255,255,255,0.92)", color: "#1e293b", backdropFilter: "blur(6px)", boxShadow: "0 2px 10px rgba(0,0,0,0.15)", border: "1px solid rgba(226,232,240,0.8)" }}
        key={currentMilestone.label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
      >
        <Trophy size={14} className="inline mr-1.5 text-primary" />
        {currentMilestone.label} — {currentMilestone.band}
      </motion.div>

      <AnimatePresence>
        {flyingStars.map(star => {
          const r = mountainRef.current?.getBoundingClientRect();
          if (!r) return null;
          const sx = star.startX - r.left;
          const sy = star.startY - r.top;
          const tx = r.width * (climberPos.x / 100);
          const ty = r.height * (climberPos.y / 100);
          return (
            <motion.div key={star.id} className="absolute z-20 pointer-events-none"
              initial={{ left: sx, top: sy, scale: 1, opacity: 1 }}
              animate={{ left: tx, top: ty, scale: [1, 2, 0.6], opacity: [1, 1, 0] }}
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

export default SatClimber;
