import { useMemo } from "react";
import { motion } from "framer-motion";

// Subject-themed emojis + short text - large, soft, decorative
const ITEMS = [
  // Emojis (subjects, vibes, school life)
  "📚", "✏️", "📝", "🎓", "💡", "🚀", "💻", "🐍",
  "🐉", "❄️", "🦌", "📘", "📗", "📕", "📒", "🗒️",
  "🎯", "🔥", "✨", "💪", "🌟", "📖", "🧠", "🎧",
  "🎤", "🗣️", "💬", "🌏", "🇻🇳", "🇬🇧", "🇫🇮", "🇨🇳",
  "🇺🇸", "🇸🇪", "🇯🇵", "🇰🇷", "🇩🇪", "🇫🇷", "🇪🇸",
  "🏆", "💎", "🌈", "☕", "🪶", "🧩", "🎨", "🪐",
  "🦉", "🐢", "🦋", "🌱", "🌻", "🍀", "🍎", "🥇",
  "📊", "📈", "🔬", "🧪", "⚗️", "🛰️", "🤖", "👩‍🏫",
  "👨‍🎓", "🎼", "🎻", "🎹", "🏅", "🎲", "🧮", "📐",
  // Language / tech text
  "汉", "中", "拼", "字", "学", "习", "听", "说", "读", "写",
  "Hej", "Moi", "Suomi", "Kiitos", "Hyvää",
  "Bonjour", "Hola", "Ciao", "안녕", "こんにちは",
  "IELTS", "TOEIC", "HSK", "YKI", "SAT", "Cambridge", "PTE", "DELE",
  "Python", "SQL", "AI", "ML", "NLP", "DL", "{ }", "</>", "def", "print()",
  "import", "return", "async", "await", "git", "npm", "fn()", "[...]",
  "A+", "B2", "C1", "9.0", "990", "100%",
];


const COLORS = [
  "hsl(217 91% 60% / 0.18)", // blue
  "hsl(160 84% 39% / 0.18)", // emerald
  "hsl(190 90% 50% / 0.16)", // cyan
  "hsl(45 93% 47% / 0.16)",  // amber
  "hsl(330 81% 60% / 0.14)", // pink
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
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: isEmoji ? 24 + Math.random() * 22 : 16 + Math.random() * 14,
      duration: 22 + Math.random() * 18,
      delay: Math.random() * -25,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotate: Math.random() * 20 - 10,
      driftX: (Math.random() - 0.5) * 140,
      driftY: (Math.random() - 0.5) * 100,
      isEmoji,
    };
  });
}

interface Props {
  count?: number;
}

/**
 * Floating subject emojis and labels - large, soft, slow.
 * Specific to Your Corner page.
 */
export default function FloatingSubjectIcons({ count = 22 }: Props) {
  const particles = useMemo(() => generate(count), [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className={`absolute select-none ${p.isEmoji ? "" : "font-bold font-mono"}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            color: p.isEmoji ? undefined : p.color,
            opacity: p.isEmoji ? 0.22 : 1,
            filter: p.isEmoji ? "saturate(0.85)" : undefined,
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
