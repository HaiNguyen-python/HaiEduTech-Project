/**
 * @file FloatingJapaneseIcons.tsx
 * @description Ambient floating Japanese emojis + kana/kanji for the Japanese hub.
 * Decorative only: pointer-events disabled, hidden on small screens and when the
 * user prefers reduced motion.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo } from "react";
import { motion } from "framer-motion";

const ITEMS = [
  // Japan-themed emojis
  "🌸", "🗾", "⛩️", "🍣", "🍜", "🎋", "🏯", "🎌", "🐱", "🌊", "🍡", "🎐",
  "🍥", "🗻", "🎎", "🍙", "🌅", "🦊",
  // Kana and kanji
  "あ", "い", "う", "え", "お", "か", "さ", "た", "な", "ん",
  "日", "本", "語", "学", "心", "花", "空", "山", "水", "人",
  // Short grammar chunks and levels
  "です", "ます", "から", "ください", "JLPT N5", "N4",
];

const COLORS = [
  "hsl(346 84% 55% / 0.20)", // rose
  "hsl(330 81% 60% / 0.18)", // pink
  "hsl(0 84% 60% / 0.16)",   // red
  "hsl(24 90% 55% / 0.16)",  // orange
  "hsl(200 90% 55% / 0.14)", // sky
];

interface Particle {
  id: number;
  symbol: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  rotate: number;
  driftX: number;
  driftY: number;
  isEmoji: boolean;
}

function generate(count: number): Particle[] {
  const shuffled = [...ITEMS].sort(() => Math.random() - 0.5);
  const picks = shuffled.slice(0, Math.min(count, shuffled.length));
  return picks.map((symbol, i) => {
    const isEmoji = /\p{Extended_Pictographic}/u.test(symbol);
    return {
      id: i,
      symbol,
      x: Math.random() * 96,
      y: Math.random() * 96,
      size: isEmoji ? 26 + Math.random() * 24 : 20 + Math.random() * 18,
      duration: 24 + Math.random() * 18,
      delay: Math.random() * -25,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotate: Math.random() * 18 - 9,
      driftX: (Math.random() - 0.5) * 130,
      driftY: (Math.random() - 0.5) * 100,
      isEmoji,
    };
  });
}

interface Props {
  /** How many particles to render (kept modest for performance). */
  count?: number;
}

export default function FloatingJapaneseIcons({ count = 18 }: Props) {
  const particles = useMemo(() => generate(count), [count]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden md:block motion-reduce:hidden"
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className={`absolute select-none ${p.isEmoji ? "" : "font-bold"}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            color: p.isEmoji ? undefined : p.color,
            opacity: p.isEmoji ? 0.2 : 1,
            filter: p.isEmoji ? "saturate(0.9)" : undefined,
            willChange: "transform",
          }}
          animate={{
            x: [0, p.driftX, -p.driftX * 0.5, p.driftX * 0.3, 0],
            y: [0, p.driftY, -p.driftY * 0.5, p.driftY * 0.7, 0],
            rotate: [p.rotate, p.rotate + 8, p.rotate - 6, p.rotate + 4, p.rotate],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        >
          {p.symbol}
        </motion.span>
      ))}
    </div>
  );
}
