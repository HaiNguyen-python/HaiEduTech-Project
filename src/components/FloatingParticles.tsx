import { useMemo } from "react";
import { motion } from "framer-motion";

// Subject-related floating symbols
const SYMBOLS = [
  // English
  "Hello", "Thanks", "Welcome", "English", "Chinese", "Programming",
  // Vietnamese
  "Vietnamese", "Xin chào", "Cảm ơn",
  // Identity & places
  "Engineer", "Educator", "Vietnam", "Finland", "Technology",
  // Tech & AI
  "AI", "Data", "Python", "SQL", "ML",
  // Programming symbols
  "{}", "</>", "=>", "def", "print", "if",
  // Chinese
  "汉", "中", "拼",
];

// Brand colors with subtle opacity
const COLORS = [
  "hsl(var(--primary) / 0.20)",
  "hsl(var(--primary) / 0.14)",
  "hsl(var(--accent) / 0.18)",
  "hsl(var(--accent) / 0.12)",
  "hsl(var(--foreground) / 0.10)",
];

interface Particle {
  id: number;
  symbol: string;
  x: number;       // start X position (%)
  y: number;       // start Y position (%)
  size: number;    // font size (px)
  duration: number; // animation duration (s)
  delay: number;   // animation delay (s)
  color: string;
  rotate: number;  // initial rotation (deg)
  driftX: number;  // horizontal drift amount (px)
  driftY: number;  // vertical drift amount (px)
}

/**
 * Generate a set of random floating particles.
 * Uses useMemo to prevent re-generating on every render.
 */
function generateParticles(count: number): Particle[] {
  // Shuffle symbols and pick unique ones (no repeats)
  const shuffled = [...SYMBOLS].sort(() => Math.random() - 0.5);
  const available = shuffled.slice(0, Math.min(count, shuffled.length));

  return available.map((symbol, i) => ({
    id: i,
    symbol,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 13 + Math.random() * 15,
    duration: 30 + Math.random() * 30,
    delay: Math.random() * -40,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotate: Math.random() * 360,
    driftX: (Math.random() - 0.5) * 80,
    driftY: (Math.random() - 0.5) * 60,
  }));
}

interface FloatingParticlesProps {
  /** Number of particles to render (default: 18) */
  count?: number;
  /** Whether to pause the animation */
  paused?: boolean;
}

/**
 * Floating background particles with subject-related icons.
 * Uses GPU-accelerated transforms for smooth performance.
 * Must be placed inside a relative-positioned container.
 */
const FloatingParticles = ({ count = 18, paused = false }: FloatingParticlesProps) => {
  const particles = useMemo(() => generateParticles(count), [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute select-none font-mono font-bold"
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
                  rotate: [p.rotate, p.rotate + 20, p.rotate - 15, p.rotate + 10, p.rotate],
                  scale: [1, 1.05, 0.95, 1.02, 1],
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

export default FloatingParticles;
