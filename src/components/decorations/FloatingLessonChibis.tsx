import { useMemo } from "react";

/**
 * Floating study-themed chibi decorations on the left & right edges of a lesson page.
 * Pure decoration: pointer-events-none, fixed position, hidden on small screens.
 * Pick a theme to get topic-appropriate emoji "chibis".
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
  | "python";

const THEMES: Record<ChibiTheme, string[]> = {
  english: ["📚", "✏️", "🎓", "🗽", "🇬🇧", "📖", "🧠", "💡", "🔤", "🎧"],
  chinese: ["🐼", "🏮", "🥢", "🐉", "🍜", "🎋", "📜", "🀄", "🧧", "🍵"],
  programming: ["💻", "🤖", "⌨️", "🐍", "🚀", "🧩", "⚙️", "🪄", "📡", "🛠️"],
  ielts: ["📝", "🎧", "🗣️", "📖", "🎯", "📊", "✍️", "🧠", "⏱️", "🏆"],
  toeic: ["💼", "📈", "🎧", "📝", "📞", "✈️", "🏢", "📊", "🗂️", "💡"],
  sat: ["🎓", "📐", "📚", "✏️", "🧮", "🇺🇸", "📊", "🧠", "🏛️", "⭐"],
  cambridge: ["🎒", "🧸", "🦊", "🐻", "🎨", "🌈", "📚", "⭐", "🎈", "🦄"],
  hsk: ["🐼", "🀄", "📚", "✏️", "🏮", "🐉", "🎋", "🧧", "🍵", "📜"],
  grammar: ["📖", "✏️", "🧠", "🔤", "💡", "📝", "📚", "🎯", "🪶", "🧩"],
  conversation: ["💬", "🗣️", "👋", "🎙️", "🤝", "😊", "📞", "💭", "🎧", "✨"],
  python: ["🐍", "💻", "🧪", "🚀", "⚙️", "🧩", "🤖", "📊", "💡", "🛠️"],
};

interface FloatingLessonChibisProps {
  theme: ChibiTheme;
  /** number of chibis per side (default 5) */
  count?: number;
}

const FloatingLessonChibis = ({ theme, count = 5 }: FloatingLessonChibisProps) => {
  const pool = THEMES[theme] ?? THEMES.english;

  const { left, right } = useMemo(() => {
    const shuffle = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);
    return {
      left: shuffle(pool).slice(0, count),
      right: shuffle(pool).slice(0, count),
    };
  }, [pool, count]);

  const renderSide = (items: string[], side: "left" | "right") => (
    <div
      aria-hidden
      className={`pointer-events-none fixed top-24 ${side}-2 z-0 hidden xl:flex flex-col gap-10 select-none`}
      style={{ height: "calc(100vh - 8rem)" }}
    >
      {items.map((emoji, i) => (
        <div
          key={`${side}-${i}`}
          className="text-4xl 2xl:text-5xl opacity-70 drop-shadow-md"
          style={{
            animation: `chibi-float ${5 + (i % 4)}s ease-in-out ${i * 0.6}s infinite`,
            filter: "drop-shadow(0 4px 8px rgba(59,130,246,0.25))",
          }}
        >
          {emoji}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes chibi-float {
          0%, 100% { transform: translateY(0) rotate(-4deg); }
          50%      { transform: translateY(-14px) rotate(4deg); }
        }
      `}</style>
      {renderSide(left, "left")}
      {renderSide(right, "right")}
    </>
  );
};

export default FloatingLessonChibis;
