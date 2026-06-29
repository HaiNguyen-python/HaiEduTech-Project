/**
 * @file FloatingChineseParticles.tsx
 * @description Decorative floating Chinese-themed icons & words for Chinese course
 * pages (Chinese hub, HSK vocab/grammar/test, HSKK, Tone Drill, Reading,
 * Listening, Conversational, Culture, Arcade...).
 * Pointer-events disabled; place inside a `relative overflow-hidden` container
 * or use `fullPage` for a fixed full-viewport layer.
 * @copyright 2026 HaiEduTech.
 */
import { useMemo } from "react";
import { motion } from "framer-motion";

// Chinese-themed symbols: greetings, Hanzi, Pinyin, HSK tags, idioms, emojis.
const SYMBOLS = [
  // Greetings & polite (Hanzi + Pinyin)
  "你好", "您好", "谢谢", "再见", "对不起", "没关系", "请", "欢迎",
  "Nǐ hǎo", "Xièxie", "Zàijiàn", "Duìbuqǐ", "Bù kèqi",
  // Common words
  "中文", "汉语", "普通话", "汉字", "拼音", "声调", "成语",
  "学习", "老师", "学生", "朋友", "中国", "北京", "上海",
  // Numbers & basics
  "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "百", "千", "万",
  // HSK & exam tags
  "HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6", "HSKK 初级", "HSKK 中级", "HSKK 高级",
  "YCT", "BCT",
  // Pinyin & tones
  "mā", "má", "mǎ", "mà", "ma", "ā á ǎ à", "ī í ǐ ì", "ū ú ǔ ù",
  "zh / ch / sh", "j / q / x", "z / c / s",
  // Grammar patterns
  "S + 是 + N", "S + 在 + 地点", "S + 有 + N", "S + 把 + O + V", "S + 被 + O + V",
  "了 / 过 / 着", "的 / 得 / 地", "比 + N", "因为...所以...",
  // Idioms & chengyu
  "马马虎虎", "一举两得", "入乡随俗", "活到老学到老", "熟能生巧",
  "加油!", "棒极了!", "太好了!",
  // Culture & emojis
  "🐉", "🐼", "🏮", "🥢", "🍜", "🥟", "🍵", "🧧", "🎋", "🎐", "🀄",
  "🇨🇳", "🇹🇼", "🇸🇬", "🎓", "📚", "✍️", "🗣️", "🎧", "💬", "✨", "🌟", "🚀", "📈",
  "春", "夏", "秋", "冬", "福", "喜", "爱", "心",
];

const COLORS = [
  "hsl(var(--primary) / 0.22)",
  "hsl(var(--primary) / 0.15)",
  "hsl(var(--accent) / 0.20)",
  "hsl(var(--accent) / 0.13)",
  "hsl(0 70% 50% / 0.18)",   // Chinese red accent
  "hsl(45 90% 50% / 0.18)",  // Imperial gold accent
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

function generateParticles(count: number): Particle[] {
  const shuffled = [...SYMBOLS].sort(() => Math.random() - 0.5);
  const picks: string[] = [];
  for (let i = 0; i < count; i++) picks.push(shuffled[i % shuffled.length]);
  return picks.map((symbol, i) => ({
    id: i,
    symbol,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 14 + Math.random() * 18,
    duration: 18 + Math.random() * 18,
    delay: Math.random() * -20,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotate: (Math.random() - 0.5) * 40,
    driftX: (Math.random() - 0.5) * 160,
    driftY: (Math.random() - 0.5) * 120,
  }));
}

interface Props {
  count?: number;
  paused?: boolean;
  fullPage?: boolean;
}

const FloatingChineseParticles = ({ count = 12, paused = false, fullPage = false }: Props) => {
  const particles = useMemo(() => generateParticles(count), [count]);

  return (
    <div
      className={
        fullPage
          ? "pointer-events-none fixed inset-0 z-0 overflow-hidden"
          : "pointer-events-none absolute inset-0 overflow-hidden"
      }
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute select-none font-semibold"
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
                  rotate: [p.rotate, p.rotate + 15, p.rotate - 12, p.rotate + 8, p.rotate],
                  scale: [1, 1.06, 0.94, 1.03, 1],
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

export default FloatingChineseParticles;
