import { useMemo } from "react";
import { motion } from "framer-motion";

/**
 * Floating decorative emojis + short words for the Lifestyle Academy sections.
 * Soft, slow, large - pointer-events disabled so it never blocks the UI.
 */
const ITEMS = [
  // Finance
  "💰", "💵", "📈", "📊", "🏦", "💎", "🪙", "💳", "🧾", "🪴",
  // Etiquette / eloquence
  "💬", "🤝", "🗣️", "👋", "🌍", "✨", "📖", "🎓", "🕊️", "🌐",
  // Presence & resilience
  "🧘", "🛡️", "🔥", "⚡", "🎯", "🌊", "🕯️", "💪", "🧠", "🪞",
  // Physical wellness
  "🏃", "🥗", "😴", "💧", "🌿", "🍎", "🫁", "🧬", "🌅", "🌱",
  // Words
  "Sisu", "Stoic", "Ikigai", "Kaizen", "Hygge", "Wabi-Sabi",
  "Zone 2", "Ikigai", "Mindful", "Flow", "Focus", "Calm",
  "Wealth", "Grace", "Grit", "Rest", "Growth", "Balance",
  "Bình an", "Kiên trì", "Tinh tế", "Vững vàng", "Khoẻ mạnh",
];

const COLORS = [
  "hsl(160 84% 39% / 0.20)", // emerald
  "hsl(174 72% 45% / 0.18)", // teal
  "hsl(45 93% 47% / 0.18)",  // amber
  "hsl(15 90% 60% / 0.18)",  // rose/orange
  "hsl(200 90% 55% / 0.16)", // sky
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
      size: isEmoji ? 26 + Math.random() * 24 : 14 + Math.random() * 12,
      duration: 24 + Math.random() * 18,
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

export default function FloatingLifestyleIcons({ count = 24 }: Props) {
  const particles = useMemo(() => generate(count), [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className={`absolute select-none ${p.isEmoji ? "" : "font-semibold italic"}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            color: p.isEmoji ? undefined : p.color,
            opacity: p.isEmoji ? 0.22 : 1,
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
