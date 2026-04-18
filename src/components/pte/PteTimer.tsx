/**
 * @file PteTimer.tsx
 * @description Countdown timer with auto-trigger callback and color states.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useState, useRef } from "react";
import { Clock } from "lucide-react";

interface PteTimerProps {
  seconds: number;
  label?: string;
  onComplete?: () => void;
  running: boolean;
  resetKey?: string | number;
}

const PteTimer = ({ seconds, label = "Time", onComplete, running, resetKey }: PteTimerProps) => {
  const [remaining, setRemaining] = useState(seconds);
  const completedRef = useRef(false);

  useEffect(() => {
    setRemaining(seconds);
    completedRef.current = false;
  }, [seconds, resetKey]);

  useEffect(() => {
    if (!running) return;
    if (remaining <= 0) {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
      return;
    }
    const id = setTimeout(() => setRemaining(r => r - 1), 1000);
    return () => clearTimeout(id);
  }, [remaining, running, onComplete]);

  const danger = remaining <= 5;
  const warn = remaining <= 10;
  const colorClass = danger
    ? "bg-red-600 text-white"
    : warn
      ? "bg-amber-500 text-white"
      : "bg-[#003580] text-white";

  return (
    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${colorClass}`}>
      <Clock size={14} />
      <span>{label}:</span>
      <span className="tabular-nums">{Math.max(0, remaining)}s</span>
    </div>
  );
};

export default PteTimer;
