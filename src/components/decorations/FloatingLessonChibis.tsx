import { useMemo } from "react";

// Chibi character images (studious mascots) — imported so Vite bundles them
import chibiTeacher from "@/assets/chibi-teacher.png";
import chibiTeacherIelts from "@/assets/chibi-teacher-ielts.png";
import chibiReading from "@/assets/chibi-reading.png";
import chibiWriting from "@/assets/chibi-writing.png";
import chibiSpeaking from "@/assets/chibi-speaking.png";
import chibiListening from "@/assets/chibi-listening.png";
import chibiGraduate from "@/assets/chibi-graduate.png";
import chibiOwl from "@/assets/chibi-owl.png";
import chibiPanda from "@/assets/chibi-panda.png";
import chibiCoder from "@/assets/chibi-coder.png";
import chibiRobot from "@/assets/chibi-robot.png";
import aiChibiRobot from "@/assets/ai-chibi-robot.png";
import chibiRocket from "@/assets/chibi-rocket.png";
import chibiHsk1 from "@/assets/chibi-cn-hsk1.png";
import chibiHsk2 from "@/assets/chibi-cn-hsk2.png";
import chibiHsk3 from "@/assets/chibi-cn-hsk3.png";
import chibiHsk4 from "@/assets/chibi-cn-hsk4.png";
import chibiHsk5 from "@/assets/chibi-cn-hsk5.png";
import chibiQuizTrophy from "@/assets/chibi-quiz-trophy.png";
import chibiVocabCheer from "@/assets/chibi-vocab-cheer.png";
import chibiVocabClassroom from "@/assets/chibi-vocab-classroom.png";
import chibiVocabGamer from "@/assets/chibi-vocab-gamer.png";
import chibiVocabWarrior from "@/assets/chibi-vocab-warrior.png";
import grammarChibiBeginner from "@/assets/grammar-chibi-beginner.png";
import grammarChibiIntermediate from "@/assets/grammar-chibi-intermediate.png";
import grammarChibiAdvanced from "@/assets/grammar-chibi-advanced.png";

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

type ChibiItem = { kind: "emoji"; value: string } | { kind: "img"; src: string };
const e = (value: string): ChibiItem => ({ kind: "emoji", value });
const img = (src: string): ChibiItem => ({ kind: "img", src });

const THEMES: Record<ChibiTheme, ChibiItem[]> = {
  english: [
    img(chibiTeacher), img(chibiReading), img(chibiWriting), img(chibiSpeaking), img(chibiListening), img(chibiGraduate),
    e("📚"), e("✏️"), e("🎓"), e("🇬🇧"), e("📖"), e("🧠"), e("💡"), e("🏆"),
  ],
  chinese: [
    img(chibiPanda), img(chibiHsk1), img(chibiHsk2), img(chibiHsk3), img(chibiHsk4), img(chibiHsk5),
    e("🐼"), e("🏮"), e("🐉"), e("🎋"), e("📜"), e("🀄"), e("🧧"), e("🏯"),
  ],
  programming: [
    img(chibiCoder), img(chibiRobot), img(aiChibiRobot), img(chibiRocket),
    e("💻"), e("⌨️"), e("🐍"), e("🚀"), e("🧩"), e("⚙️"), e("📡"), e("⚡"),
  ],
  ielts: [
    img(chibiTeacherIelts), img(chibiReading), img(chibiWriting), img(chibiSpeaking), img(chibiListening), img(chibiQuizTrophy),
    e("📝"), e("🎧"), e("🗣️"), e("📖"), e("🎯"), e("⏱️"), e("🏆"), e("💡"),
  ],
  toeic: [
    img(chibiTeacher), img(chibiListening), img(chibiReading), img(chibiQuizTrophy),
    e("💼"), e("📈"), e("🎧"), e("📞"), e("✈️"), e("🏢"), e("📊"), e("🌍"),
  ],
  sat: [
    img(chibiGraduate), img(chibiReading), img(chibiWriting), img(chibiQuizTrophy),
    e("🎓"), e("📐"), e("📚"), e("🧮"), e("🇺🇸"), e("📊"), e("🏛️"), e("⭐"),
  ],
  cambridge: [
    img(chibiOwl), img(chibiReading), img(chibiGraduate), img(chibiVocabClassroom),
    e("🎒"), e("🧸"), e("🦊"), e("🎨"), e("🌈"), e("⭐"), e("🎈"), e("🦄"),
  ],
  hsk: [
    img(chibiHsk1), img(chibiHsk2), img(chibiHsk3), img(chibiHsk4), img(chibiHsk5), img(chibiPanda),
    e("🀄"), e("📚"), e("🏮"), e("🐉"), e("🎋"), e("🧧"), e("🏯"), e("📜"),
  ],
  grammar: [
    img(grammarChibiBeginner), img(grammarChibiIntermediate), img(grammarChibiAdvanced), img(chibiTeacher), img(chibiReading),
    e("📖"), e("✏️"), e("🧠"), e("🔤"), e("💡"), e("🧩"), e("🏆"), e("⭐"),
  ],
  conversation: [
    img(chibiSpeaking), img(chibiTeacher), img(chibiListening),
    e("💬"), e("🗣️"), e("👋"), e("🎙️"), e("🤝"), e("😊"), e("💭"), e("✨"), e("🌟"), e("🎵"),
  ],
  python: [
    img(chibiCoder), img(chibiRobot), img(aiChibiRobot), img(chibiRocket),
    e("🐍"), e("💻"), e("🧪"), e("🚀"), e("⚙️"), e("🧩"), e("📊"), e("📦"),
  ],
  vocabulary: [
    img(chibiVocabCheer), img(chibiVocabClassroom), img(chibiVocabGamer), img(chibiVocabWarrior), img(chibiReading),
    e("📖"), e("🔤"), e("🧠"), e("💡"), e("📚"), e("🎯"), e("⭐"), e("🏆"),
  ],
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
  item: ChibiItem;
  side: "left" | "right";
  top: number;
  offset: number;
  size: number;
  delay: number;
  duration: number;
  rotate: number;
  opacity: number;
}

interface FloatingLessonChibisProps {
  theme: ChibiTheme;
  count?: number;
  seed?: string;
}

const FloatingLessonChibis = ({ theme, count = 4, seed }: FloatingLessonChibisProps) => {
  const pool = THEMES[theme] ?? THEMES.english;
  const seedStr = seed ?? theme;

  const spots = useMemo<ChibiSpot[]>(() => {
    const rand = mulberry32(hashString(seedStr));

    // Fisher-Yates so no duplicates
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const total = Math.min(count, shuffled.length);

    const leftCount = Math.ceil(total / 2);
    const rightCount = total - leftCount;
    const leftSlot = 100 / Math.max(leftCount, 1);
    const rightSlot = 100 / Math.max(rightCount, 1);
    let li = 0;
    let ri = 0;

    return shuffled.slice(0, total).map((item, i): ChibiSpot => {
      const side: "left" | "right" = i % 2 === 0 ? "left" : "right";
      const slot = side === "left" ? leftSlot : rightSlot;
      const idx = side === "left" ? li++ : ri++;
      const baseTop = idx * slot + slot * 0.3;
      const jitter = (rand() - 0.5) * slot * 0.25;
      // Image chibis are bigger than emoji
      const baseSize = item.kind === "img" ? 90 : 46;
      const variance = item.kind === "img" ? 40 : 22;
      return {
        item,
        side,
        top: Math.max(5, Math.min(92, baseTop + jitter)),
        // Sit just inside the viewport edge: visible in full, but tucked against
        // the side so they never overlap the centered content column.
        offset: 0.5 + rand() * 1.8,
        size: baseSize + Math.floor(rand() * variance),
        delay: rand() * 4,
        duration: 5 + rand() * 5,
        rotate: (rand() - 0.5) * 18,
        opacity: item.kind === "img" ? 0.9 + rand() * 0.1 : 0.85 + rand() * 0.15,
      };
    });
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
        {spots.map((s, i) => {
          const common: React.CSSProperties = {
            top: `${s.top}vh`,
            [s.side]: `${s.offset}vw`,
            opacity: s.opacity,
            ["--r" as string]: `${s.rotate}deg`,
            animation: `${i % 2 === 0 ? "chibi-float-a" : "chibi-float-b"} ${s.duration}s ease-in-out ${s.delay}s infinite`,
          } as React.CSSProperties;
          if (s.item.kind === "img") {
            return (
              <img
                key={i}
                src={s.item.src}
                alt=""
                loading="lazy"
                className="absolute"
                style={{
                  ...common,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  objectFit: "contain",
                  filter: "drop-shadow(0 6px 14px rgba(59,130,246,0.45)) drop-shadow(0 3px 6px rgba(16,185,129,0.35))",
                }}
              />
            );
          }
          return (
            <div
              key={i}
              className="absolute"
              style={{
                ...common,
                fontSize: `${s.size}px`,
                filter: "drop-shadow(0 4px 10px rgba(59,130,246,0.45)) drop-shadow(0 2px 4px rgba(16,185,129,0.35))",
                textShadow: "0 2px 6px rgba(0,0,0,0.25)",
              }}
            >
              {s.item.value}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FloatingLessonChibis;
