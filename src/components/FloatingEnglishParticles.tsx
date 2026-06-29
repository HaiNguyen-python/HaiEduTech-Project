/**
 * @file FloatingEnglishParticles.tsx
 * @description Decorative floating English-themed icons & words for English course
 * pages (English hub, Essentials, Grammar, Idioms, Pronunciation, Fun Facts...).
 * Pointer-events disabled; place inside a `relative overflow-hidden` container.
 * @copyright 2026 HaiEduTech.
 */
import { useMemo } from "react";
import { motion } from "framer-motion";

// English-themed symbols: greetings, exam names, phonetics, common words & emojis.
const SYMBOLS = [
  // Greetings & polite
  "Hello", "Hi!", "Thanks", "Welcome", "Please", "Cheers", "Sorry", "Good job!", "Awesome", "Lovely",
  "How are you?", "Nice to meet you", "See you!", "Take care", "You rock!",
  // Core skills & topics
  "English", "ABC", "A-Z", "Grammar", "Vocabulary", "Speaking", "Listening", "Reading", "Writing",
  "Pronunciation", "Spelling", "Fluency", "Accent", "Phrasal Verbs", "Collocations",
  // Exams
  "IELTS", "TOEIC", "SAT", "PTE", "Cambridge", "Starters", "Movers", "Flyers", "KET", "PET",
  "FCE", "CAE", "CPE", "Band 7.0", "Band 8.0", "990", "1600",
  // Phonetics (IPA samples)
  "/ˈhɛloʊ/", "/θ/", "/ð/", "/ʃ/", "/ʒ/", "/ŋ/", "/əʊ/", "/eɪ/", "/iː/", "/uː/", "/ɔː/", "/æ/", "/ʌ/", "/ɜː/",
  // Tenses & grammar bits
  "V-ing", "V2/V3", "to V", "S + V", "Tense", "Modal", "if + S + V", "have + PP", "will + V",
  "a/an/the", "much/many", "some/any",
  // Idioms & expressions
  "Piece of cake", "Break a leg", "Hit the books", "Once in a blue moon", "Bite the bullet",
  "ASAP", "FYI", "OMG", "BTW", "TBH", "IMO",
  // Quotes & motivation
  "Practice makes perfect", "Never give up", "Keep going", "Dream big", "Stay curious",
  // Emojis
  "📚", "📖", "✏️", "🖊️", "📝", "🎧", "🎤", "🗣️", "🇬🇧", "🇺🇸", "🇦🇺", "🇨🇦",
  "🏆", "🥇", "💡", "🧠", "🔤", "🔡", "💬", "💭", "📣", "🎓", "🌟", "✨", "🚀", "📈",
  "☕", "🫖", "🎩", "🚌", "🗽", "🎬", "🎵",
];


const COLORS = [
  "hsl(var(--primary) / 0.22)",
  "hsl(var(--primary) / 0.15)",
  "hsl(var(--accent) / 0.20)",
  "hsl(var(--accent) / 0.13)",
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
  // Allow repeats when caller asks for more particles than unique symbols.
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
  /** Number of particles to render (default: 22). */
  count?: number;
  /** Pause animation (e.g. when prefers-reduced-motion). */
  paused?: boolean;
  /** Render as a fixed full-viewport layer behind page content. */
  fullPage?: boolean;
}

const FloatingEnglishParticles = ({ count = 6, paused = false, fullPage = false }: Props) => {
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

export default FloatingEnglishParticles;
