import { useMemo } from "react";

/**
 * Floating study-themed chibi decorations scattered randomly on both edges of the page.
 * Pure decoration: pointer-events-none, fixed position, hidden on small screens.
 */
export type ChibiTheme =
  | "english"
  | "chinese"
  | "programming"
  | "ielts"
  | "toeic"
  | "sat"
  | "cambridge"
  | "hsk"
  | "grammar"
  | "conversation"
  | "python"
  | "vocabulary";

const THEMES: Record<ChibiTheme, string[]> = {
  english: ["📚", "✏️", "🎓", "🗽", "🇬🇧", "📖", "🧠", "💡", "🔤", "🎧", "📝", "🏆"],
  chinese: ["🐼", "🏮", "🥢", "🐉", "🍜", "🎋", "📜", "🀄", "🧧", "🍵", "🏯", "🪭"],
  programming: ["💻", "🤖", "⌨️", "🐍", "🚀", "🧩", "⚙️", "🪄", "📡", "🛠️", "🧠", "⚡"],
  ielts: ["📝", "🎧", "🗣️", "📖", "🎯", "📊", "✍️", "🧠", "⏱️", "🏆", "📚", "💡"],
  toeic: ["💼", "📈", "🎧", "📝", "📞", "✈️", "🏢", "📊", "🗂️", "💡", "🌍", "⏱️"],
  sat: ["🎓", "📐", "📚", "✏️", "🧮", "🇺🇸", "📊", "🧠", "🏛️", "⭐", "📖", "🎯"],
  cambridge: ["🎒", "🧸", "🦊", "🐻", "🎨", "🌈", "📚", "⭐", "🎈", "🦄", "🐧", "🍭"],
  hsk: ["🐼", "🀄", "📚", "✏️", "🏮", "🐉", "🎋", "🧧", "🍵", "📜", "🏯", "🪭"],
  grammar: ["📖", "✏️", "🧠", "🔤", "💡", "📝", "📚", "🎯", "🪶", "🧩", "🏆", "⭐"],
  conversation: ["💬", "🗣️", "👋", "🎙️", "🤝", "😊", "📞", "💭", "🎧", "✨", "🌟", "🎵"],
  python: ["🐍", "💻", "🧪", "🚀", "⚙️", "🧩", "🤖", "📊", "💡", "🛠️", "📦", "⚡"],
  vocabulary: ["📖", "🔤", "🧠", "💡", "✏️", "📚", "🎯", "🪶", "⭐", "🏆", "📝", "🎓"],
};

// Deterministic PRNG so chibis don't reshuffle on every render
const mulberry32 = (seed: number) => {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6D2B79F5) >>> 0;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
};

const hashString = (s: string) => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

interface ChibiSpot {
  emoji: string;
  side: "left" | "right";
  /** vertical position, vh units */
  top: number;
  /** horizontal offset from edge, vw units */
  offset: number;
  size: number; // px
  delay: number;
  duration: number;
  rotate: number;
  opacity: number;
}

interface FloatingLessonChibisProps {
  theme: ChibiTheme;
  /** total chibis (split across both sides). Default 14 */
  count?: number;
  /** seed string to keep positions stable per page */
  seed?: string;
}

const FloatingLessonChibis = ({ theme, count = 14, seed }: FloatingLessonChibisProps) => {
  const pool = THEMES[theme] ?? THEMES.english;
  const seedStr = seed ?? theme;

  const spots = useMemo<ChibiSpot[]>(() => {
    const rand = mulberry32(hashString(seedStr));
    // Build evenly-spread vertical slots per side, then jitter them
    const perSide = Math.ceil(count / 2);
    const buildSide = (side: "left" | "right"): ChibiSpot[] => {
      const slotHeight = 100 / perSide;
      return Array.from({ length: perSide }, (_, i) => {
        const baseTop = i * slotHeight + slotHeight * 0.2;
        const jitter = (rand() - 0.5) * slotHeight * 0.6;
        return {
          emoji: pool[Math.floor(rand() * pool.length)],
          side,
          top: Math.max(3, Math.min(94, baseTop + jitter)),
          offset: 0.5 + rand() * 2.5, // 0.5vw - 3vw from edge
          size: 28 + Math.floor(rand() * 20), // 28-48px
          delay: rand() * 4,
          duration: 5 + rand() * 5, // 5-10s
          rotate: (rand() - 0.5) * 20,
          opacity: 0.45 + rand() * 0.3, // 0.45 - 0.75
        };
      });
    };
    return [...buildSide("left"), ...buildSide("right")];
  }, [pool, count, seedStr]);

  return (
    <>
      <style>{`
        @keyframes chibi-float-a {
          0%, 100% { transform: translateY(0) rotate(var(--r,0deg)); }
          50%      { transform: translateY(-18px) rotate(calc(var(--r,0deg) + 6deg)); }
        }
        @keyframes chibi-float-b {
          0%, 100% { transform: translateY(0) rotate(var(--r,0deg)); }
          50%      { transform: translateY(14px) rotate(calc(var(--r,0deg) - 6deg)); }
        }
      `}</style>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 hidden lg:block overflow-hidden select-none">
        {spots.map((s, i) => (
          <div
            key={i}
            className="absolute drop-shadow-md"
            style={{
              top: `${s.top}vh`,
              [s.side]: `${s.offset}vw`,
              fontSize: `${s.size}px`,
              opacity: s.opacity,
              ["--r" as string]: `${s.rotate}deg`,
              animation: `${i % 2 === 0 ? "chibi-float-a" : "chibi-float-b"} ${s.duration}s ease-in-out ${s.delay}s infinite`,
              filter: "drop-shadow(0 4px 8px rgba(59,130,246,0.2))",
            } as React.CSSProperties}
          >
            {spots[i].emoji}
          </div>
        ))}
      </div>
    </>
  );
};

export default FloatingLessonChibis;
