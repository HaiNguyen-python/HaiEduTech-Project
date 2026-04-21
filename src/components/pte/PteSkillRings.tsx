/**
 * @file PteSkillRings.tsx
 * @description 4 animated progress-ring cards summarizing PTE progress per skill.
 *              Two variants: `compact` (Dashboard) and `detailed` (PteHub).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { motion } from "framer-motion";
import { Mic, PenTool, BookOpen, Headphones, ArrowRight, Activity, BookMarked, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import type { PteSkillStat } from "@/hooks/usePteSkillStats";

interface SkillVisual {
  icon: typeof Mic;
  gradient: string;
  ring: string;
  bg: string;
  href: string;
}

const VISUALS: Record<string, SkillVisual> = {
  speaking: {
    icon: Mic,
    gradient: "from-[#003580] to-[#0052cc]",
    ring: "stroke-[#0052cc]",
    bg: "bg-[#003580]/5",
    href: "/pte/speaking",
  },
  writing: {
    icon: PenTool,
    gradient: "from-[#0052cc] to-[#1e40af]",
    ring: "stroke-[#1e40af]",
    bg: "bg-[#1e40af]/5",
    href: "/pte/writing",
  },
  reading: {
    icon: BookOpen,
    gradient: "from-[#1e40af] to-[#003580]",
    ring: "stroke-[#1e3a8a]",
    bg: "bg-[#1e3a8a]/5",
    href: "/pte/reading",
  },
  listening: {
    icon: Headphones,
    gradient: "from-[#0052cc] to-[#003580]",
    ring: "stroke-[#0066ff]",
    bg: "bg-[#0066ff]/5",
    href: "/pte/listening",
  },
};

interface RingProps {
  pct: number;
  size?: number;
  strokeWidth?: number;
  ringClass: string;
  centerLabel: string;
  centerSub?: string;
}

const ProgressRing = ({ pct, size = 96, strokeWidth = 9, ringClass, centerLabel, centerSub }: RingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, pct)) / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-slate-200 dark:stroke-slate-700"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={ringClass}
          style={{ strokeDasharray: circumference }}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-base font-extrabold text-foreground leading-none">{centerLabel}</span>
        {centerSub && <span className="text-[10px] text-muted-foreground mt-0.5">{centerSub}</span>}
      </div>
    </div>
  );
};

interface PteSkillRingsProps {
  skills: PteSkillStat[];
  variant?: "compact" | "detailed";
  loading?: boolean;
  showLink?: boolean;
}

const PteSkillRings = ({ skills, variant = "detailed", loading, showLink = true }: PteSkillRingsProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl bg-card border border-border p-4 h-36 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {skills.map((s, i) => {
        const v = VISUALS[s.skill];
        const Icon = v.icon;
        // For compact: show completion %. For detailed: show avg band score (0-90).
        const ringPct = variant === "compact"
          ? s.completionPct
          : Math.round((s.avgScore / 90) * 100);
        const centerLabel = variant === "compact"
          ? `${s.completionPct}%`
          : (s.avgScore > 0 ? s.avgScore.toFixed(0) : "—");
        const centerSub = variant === "compact"
          ? `${s.completed}/${s.total}`
          : (s.avgScore > 0 ? "/ 90" : "no data");

        const card = (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`rounded-2xl border border-border bg-card p-4 sm:p-5 hover:shadow-lg hover:border-primary/40 transition-all relative overflow-hidden ${v.bg}`}
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${v.gradient}`} />
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${v.gradient} text-white grid place-items-center shadow-sm`}>
                <Icon size={18} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {s.label}
              </span>
            </div>

            <div className="flex items-center justify-center mb-3">
              <ProgressRing
                pct={ringPct}
                size={variant === "compact" ? 84 : 100}
                ringClass={v.ring}
                centerLabel={centerLabel}
                centerSub={centerSub}
              />
            </div>

            {variant === "detailed" && (
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Activity size={11}/>Completion</span>
                  <span className="font-bold text-foreground">{s.completionPct}% · {s.completed}/{s.total}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><BookMarked size={11}/>Attempts</span>
                  <span className="font-bold text-foreground">{s.attempts}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Accuracy</span>
                  <span className="font-bold text-foreground">{s.accuracy > 0 ? `${s.accuracy}%` : "—"}</span>
                </div>
                {s.timeSpentSeconds > 0 && (
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Clock size={11}/>Time</span>
                    <span className="font-bold text-foreground">
                      {s.timeSpentSeconds >= 60
                        ? `${Math.round(s.timeSpentSeconds / 60)}m`
                        : `${s.timeSpentSeconds}s`}
                    </span>
                  </div>
                )}
                {s.skill === "reading" && s.vocabMastered > 0 && (
                  <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Vocab mastered</span>
                    <span className="font-bold">{s.vocabMastered}</span>
                  </div>
                )}
              </div>
            )}

            {variant === "compact" && (
              <div className="text-[11px] text-muted-foreground text-center">
                {s.attempts > 0
                  ? `${s.attempts} attempt${s.attempts === 1 ? "" : "s"} · avg ${s.avgScore || "—"}`
                  : "Start practicing"}
              </div>
            )}

            {showLink && (
              <Link
                to={v.href}
                className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:gap-2 transition-all"
              >
                Practice <ArrowRight size={12} />
              </Link>
            )}
          </motion.div>
        );
        return <div key={s.skill}>{card}</div>;
      })}
    </div>
  );
};

export default PteSkillRings;
