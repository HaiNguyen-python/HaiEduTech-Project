/**
 * @file FloatingIeltsParticles.tsx
 * @description Floating background icons/text themed for IELTS lectures.
 *              Fixed to viewport, behind page content, pointer-events disabled.
 *              Moderate density (default 14) so it never distracts from the
 *              lecture body. Optional variant tailors symbols to the pillar
 *              (writing / speaking / reading / listening / all).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo } from "react";
import { motion } from "framer-motion";

const CORE = [
  "IELTS", "Band 7.0+", "Band 8.0", "CEFR C1",
  "🇬🇧", "🎓", "📘", "📝", "✍️", "🎧", "📖", "🎤",
  "Academic", "General",
];

const WRITING = [
  "Task 1", "Task 2", "Cohesion", "Lexical", "Paraphrase",
  "Overview", "Trend", "Argument", "Thesis", "TR · CC · LR · GRA",
  "✍️", "📝", "📊",
];

const SPEAKING = [
  "Part 1", "Part 2", "Part 3", "Fluency", "Pronunciation",
  "Cue Card", "Follow-up", "Filler", "Stress · Intonation",
  "🎤", "💬", "🗣️",
];

const READING = [
  "Skimming", "Scanning", "True/False/NG", "Matching Headings",
  "Paraphrase", "Keyword", "Distractor",
  "📖", "🔍", "📚",
];

const LISTENING = [
  "Section 1", "Section 2", "Section 3", "Section 4",
  "Signposting", "Distractor", "Note-taking", "Spelling",
  "🎧", "🔊", "📻",
];

const POOLS: Record<string, string[]> = {
  all: [...CORE, ...WRITING, ...SPEAKING, ...READING, ...LISTENING],
  writing: [...CORE, ...WRITING],
  speaking: [...CORE, ...SPEAKING],
  reading: [...CORE, ...READING],
  listening: [...CORE, ...LISTENING],
};

const COLORS = [
  "hsl(var(--primary) / 0.20)",
  "hsl(var(--primary) / 0.12)",
  "hsl(var(--accent) / 0.18)",
  "hsl(var(--accent) / 0.10)",
  "hsl(var(--foreground) / 0.08)",
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
}

function generateParticles(pool: string[], count: number): Particle[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const picked: string[] = [];
  for (let i = 0; i < count; i++) picked.push(shuffled[i % shuffled.length]);
  return picked.map((symbol, i) => ({
    id: i,
    symbol,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 14 + Math.random() * 18,
    duration: 22 + Math.random() * 20,
    delay: Math.random() * -22,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotate: Math.random() * 360,
    driftX: (Math.random() - 0.5) * 140,
    driftY: (Math.random() - 0.5) * 110,
  }));
}

interface Props {
  variant?: "all" | "writing" | "speaking" | "reading" | "listening";
  count?: number;
  paused?: boolean;
}

/**
 * Fixed-to-viewport, behind-content floating IELTS particles. Mount once.
 */
const FloatingIeltsParticles = ({ variant = "all", count = 14, paused = false }: Props) => {
  const pool = POOLS[variant] ?? POOLS.all;
  const particles = useMemo(() => generateParticles(pool, count), [pool, count]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute select-none font-semibold tracking-tight"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            color: p.color,
            willChange: "transform",
          }}
          animate={
            paused
              ? {}
              : {
                  x: [0, p.driftX, -p.driftX * 0.6, p.driftX * 0.3, 0],
                  y: [0, p.driftY, -p.driftY * 0.5, p.driftY * 0.7, 0],
                  rotate: [p.rotate, p.rotate + 14, p.rotate - 12, p.rotate + 6, p.rotate],
                  scale: [1, 1.05, 0.96, 1.02, 1],
                }
          }
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
};

export default FloatingIeltsParticles;
