/**
 * @file ExamFunLayer.tsx
 * @description Playful helpers for the Cambridge mock exam screen: a stepping-stone
 *              progress path with a walking mascot, milestone cheer bubbles, a small
 *              sound engine and a sticker board for the result screen.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ------------------------------- sound ------------------------------- */

const SOUND_KEY = "cambridge-exam-sound";

export const readSoundPref = (level: string) => {
  const saved = localStorage.getItem(SOUND_KEY);
  if (saved === "on") return true;
  if (saved === "off") return false;
  return ["starters", "movers", "flyers"].includes(level);
};

export const writeSoundPref = (on: boolean) =>
  localStorage.setItem(SOUND_KEY, on ? "on" : "off");

let audioCtx: AudioContext | null = null;

/** Short synthesised chime so no audio asset is needed. */
export const playChime = (kind: "select" | "cheer" | "finish" = "select") => {
  try {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    audioCtx = audioCtx || new Ctor();
    const ctx = audioCtx;
    const notes = kind === "select" ? [660] : kind === "cheer" ? [660, 880] : [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      const start = ctx.currentTime + i * 0.11;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.12, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.24);
    });
  } catch {
    /* audio is optional */
  }
};

/* --------------------------- progress path --------------------------- */

interface ProgressPathProps {
  total: number;
  answered: number;
  current: number;
  color: string;
  mascot?: string;
}

/** Stepping stones that fill in as answers arrive, with a mascot on top. */
export const ExamProgressPath = ({ total, answered, current, color, mascot = "🐣" }: ProgressPathProps) => {
  const pct = total > 0 ? Math.min(100, (answered / total) * 100) : 0;
  const walkPct = total > 1 ? (current / (total - 1)) * 100 : 0;

  return (
    <div className="relative pt-7 pb-1">
      <motion.div
        className="absolute top-0 text-2xl select-none"
        style={{ left: `calc(${walkPct}% - 14px)` }}
        animate={{ y: [0, -5, 0], rotate: [-4, 4, -4] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        {mascot}
      </motion.div>

      <div className="relative h-3 rounded-full bg-slate-200 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        />
      </div>

      <div className="mt-2 flex items-center gap-1 overflow-hidden">
        {Array.from({ length: Math.min(total, 30) }).map((_, i) => {
          const done = i < Math.round((answered / Math.max(total, 1)) * Math.min(total, 30));
          return (
            <motion.span
              key={i}
              className="text-[11px] leading-none"
              animate={done ? { scale: [1, 1.35, 1] } : { scale: 1 }}
              transition={{ duration: 0.4 }}
              aria-hidden="true"
            >
              {done ? "🐾" : "·"}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
};

/* --------------------------- cheer bubbles --------------------------- */

const CHEERS: { vi: string; en: string; emoji: string }[] = [
  { vi: "Giỏi lắm!", en: "Great job!", emoji: "🌟" },
  { vi: "Tuyệt vời!", en: "Awesome!", emoji: "🎉" },
  { vi: "Cố lên nào!", en: "Keep going!", emoji: "💪" },
  { vi: "Xuất sắc!", en: "Brilliant!", emoji: "🌈" },
  { vi: "Gần xong rồi!", en: "Almost there!", emoji: "🚀" },
];

interface CheerProps {
  answered: number;
  every?: number;
  vi: boolean;
  enabled?: boolean;
  onCheer?: () => void;
}

/** Shows a floating encouragement bubble every few answers. */
export const ExamCheerBubble = ({ answered, every = 5, vi, enabled = true, onCheer }: CheerProps) => {
  const [cheer, setCheer] = useState<{ text: string; emoji: string; key: number } | null>(null);
  const lastMilestone = useRef(0);

  useEffect(() => {
    if (!enabled || answered === 0) return;
    const milestone = Math.floor(answered / every);
    if (milestone === 0 || milestone === lastMilestone.current) return;
    lastMilestone.current = milestone;
    const pick = CHEERS[(milestone - 1) % CHEERS.length];
    setCheer({ text: vi ? pick.vi : pick.en, emoji: pick.emoji, key: Date.now() });
    onCheer?.();
    const timer = setTimeout(() => setCheer(null), 2200);
    return () => clearTimeout(timer);
  }, [answered, every, vi, enabled, onCheer]);

  return (
    <AnimatePresence>
      {cheer && (
        <motion.div
          key={cheer.key}
          initial={{ opacity: 0, y: 20, scale: 0.8, x: "-50%" }}
          animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
          exit={{ opacity: 0, y: -20, scale: 0.9, x: "-50%" }}
          className="pointer-events-none fixed bottom-24 left-1/2 z-40 rounded-full border-2 border-white bg-gradient-to-r from-[#FFD93D] via-[#FF9F1C] to-[#FF6B9D] px-6 py-3 text-lg font-black text-[#78350F] shadow-xl"
        >
          {cheer.emoji} {cheer.text}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* --------------------------- sticker board --------------------------- */

interface StickerBoardProps {
  pct: number;
  vi: boolean;
}

/** Stars plus a themed sticker set earned from the score band. */
export const ExamStickerBoard = ({ pct, vi }: StickerBoardProps) => {
  const stars = pct >= 80 ? 3 : pct >= 60 ? 2 : pct >= 40 ? 1 : 0;
  const stickers = pct >= 80 ? ["🏆", "🌈", "🦄", "🎈"] : pct >= 60 ? ["🎖️", "🌟", "🐻"] : pct >= 40 ? ["⭐", "🍀"] : ["🌱"];
  const caption =
    pct >= 80
      ? vi ? "Nhà vô địch nhỏ!" : "Little champion!"
      : pct >= 60
        ? vi ? "Làm tốt lắm!" : "Well done!"
        : pct >= 40
          ? vi ? "Đang tiến bộ!" : "Getting better!"
          : vi ? "Cùng thử lại nhé!" : "Let's try again!";

  return (
    <div className="rounded-3xl border-2 border-[#FFD93D] bg-gradient-to-br from-[#FFFDF5] to-[#FFF3E0] p-6 text-center">
      <div className="mb-2 flex justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.15 * i, type: "spring", stiffness: 200 }}
            className="text-4xl"
          >
            {i < stars ? "⭐" : "☆"}
          </motion.span>
        ))}
      </div>
      <p className="text-xl font-black text-[#B45309]">{caption}</p>
      <div className="mt-3 flex flex-wrap justify-center gap-3">
        {stickers.map((s, i) => (
          <motion.span
            key={s}
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 220 }}
            className="grid h-14 w-14 place-items-center rounded-2xl border-2 border-white bg-white text-3xl shadow-md"
          >
            {s}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export const LEVEL_MASCOT: Record<string, string> = {
  starters: "🐣",
  movers: "🐰",
  flyers: "🦅",
  ket: "🦊",
  pet: "🦉",
};
