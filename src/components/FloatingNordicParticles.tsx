/**
 * @file FloatingNordicParticles.tsx
 * @description Floating background icons/text themed for Swedish or Finnish
 *              lesson pages. Mirrors `FloatingParticles` but with
 *              language-specific vocabulary, flags and cultural symbols.
 *              Renders fixed to viewport, behind page content, pointer-events
 *              disabled so it never interferes with interaction.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo } from "react";
import { motion } from "framer-motion";

const SWEDISH_SYMBOLS = [
  // Greetings & high-freq words
  "Hej", "Hej då", "Tack", "Varsågod", "Förlåt", "Ja", "Nej", "Skål",
  "Lagom", "Fika", "Hygge", "Mysigt", "Jätte­bra", "Snälla",
  // Identity
  "Svenska", "Sverige", "Stockholm", "Göteborg", "Malmö", "Uppsala",
  // Culture & nature
  "🇸🇪", "👑", "🦌", "🌲", "❄️", "☕", "🍪", "🧀", "🐎", "⛵",
  // Letters
  "Å", "Ä", "Ö", "å", "ä", "ö",
  // Exam labels
  "YKI", "Sfi", "A1", "A2", "B1", "B2",
  // Common nouns
  "kaffe", "kanelbulle", "midsommar", "skog", "snö", "vatten",
];

const FINNISH_SYMBOLS = [
  // Greetings & high-freq words
  "Moi", "Hei", "Terve", "Kiitos", "Ole hyvä", "Anteeksi", "Kyllä", "Ei",
  "Sisu", "Hyvää", "Kippis", "Joo",
  // Identity
  "Suomi", "Suomalainen", "Helsinki", "Turku", "Tampere", "Oulu", "Rovaniemi",
  // Culture & nature
  "🇫🇮", "🦌", "🌲", "❄️", "☕", "🥐", "🧖", "🏒", "🦉", "🌌",
  // Letters
  "Ä", "Ö", "ä", "ö",
  // Exam labels
  "YKI", "A1", "A2", "B1", "B2", "C1",
  // Common nouns
  "kahvi", "korvapuusti", "sauna", "metsä", "lumi", "järvi", "revontulet",
];

const COLORS = [
  "hsl(var(--primary) / 0.22)",
  "hsl(var(--primary) / 0.14)",
  "hsl(var(--accent) / 0.20)",
  "hsl(var(--accent) / 0.12)",
  "hsl(var(--foreground) / 0.10)",
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
  const picked = shuffled.slice(0, Math.min(count, shuffled.length));
  return picked.map((symbol, i) => ({
    id: i,
    symbol,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 14 + Math.random() * 18,
    duration: 18 + Math.random() * 18,
    delay: Math.random() * -22,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotate: Math.random() * 360,
    driftX: (Math.random() - 0.5) * 140,
    driftY: (Math.random() - 0.5) * 100,
  }));
}

interface Props {
  variant: "swedish" | "finnish";
  /** Number of particles. Default 55. */
  count?: number;
  /** Pause motion (e.g. for reduced-motion preference). */
  paused?: boolean;
}

/**
 * Fixed-to-viewport, behind-content floating particles. Mount once per page.
 */
const FloatingNordicParticles = ({ variant, count = 55, paused = false }: Props) => {
  const pool = variant === "swedish" ? SWEDISH_SYMBOLS : FINNISH_SYMBOLS;
  const particles = useMemo(() => generateParticles(pool, count), [pool, count]);

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
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
                  rotate: [p.rotate, p.rotate + 18, p.rotate - 14, p.rotate + 8, p.rotate],
                  scale: [1, 1.06, 0.95, 1.03, 1],
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

export default FloatingNordicParticles;
