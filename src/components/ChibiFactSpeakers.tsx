/**
 * @file ChibiFactSpeakers.tsx
 * @description Chibi mascots scattered down the home page, each speaking a fun fact
 * in a cute speech bubble. Replaces the static "Did you know?" card.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import chibiTeacherIelts from "@/assets/chibi-teacher-ielts.png";
import chibiSpeaking from "@/assets/chibi-speaking.png";
import chibiGraduate from "@/assets/chibi-graduate.png";
import chibiPanda from "@/assets/chibi-panda.png";
import chibiCoder from "@/assets/chibi-coder.png";
import aiChibiRobot from "@/assets/ai-chibi-robot.png";
import chibiHsk5 from "@/assets/chibi-cn-hsk5.png";
import chibiVocabCheer from "@/assets/chibi-vocab-cheer.png";

interface Fact {
  chibi: string;
  vi: string;
  en: string;
  to: string;
  ctaVi: string;
  ctaEn: string;
  side: "left" | "right";
}

// Fun trailing emojis added after each fact for liveliness
const FUN_EMOJIS = ["😄", "😆", "🤩", "😎", "🥳", "😋", "🤓", "😝", "🤪", "😺", "✨", "💫", "🎉", "🙌", "👀", "💖"];

// Curated facts, each with a unique chibi speaker (limited to 8 for a calmer home page)
const FACTS: Fact[] = [
  { chibi: chibiPanda,        side: "left",  vi: "Tiếng Trung không có thì! 了, 过, 将 sẽ thay bạn chia động từ đó.", en: "Mandarin has no tenses! 了, 过, 将 do the time-marking for you.", to: "/chinese", ctaVi: "Học HSK ngay", ctaEn: "Start HSK" },
  { chibi: chibiTeacherIelts, side: "right", vi: "Hơn 60% từ vựng IELTS có gốc Pháp & Latin — học gốc từ là cheat code!", en: "60%+ of IELTS vocab is French & Latin — learning roots is a cheat code!", to: "/ielts-vocabulary", ctaVi: "Vào IELTS Vocab", ctaEn: "Open IELTS Vocab" },
  { chibi: chibiCoder,        side: "left",  vi: "Python đặt tên theo nhóm hài Monty Python, không phải con rắn nhé!", en: "Python is named after Monty Python — not the snake!", to: "/programming", ctaVi: "Học Python", ctaEn: "Learn Python" },
  { chibi: aiChibiRobot,      side: "right", vi: "ChatGPT đạt 100 triệu người dùng chỉ trong 2 tháng — kỷ lục lịch sử!", en: "ChatGPT hit 100M users in just 2 months — the fastest-growing app ever!", to: "/programming/ai-academy", ctaVi: "Vào AI Academy", ctaEn: "Enter AI Academy" },
  { chibi: chibiSpeaking,     side: "left",  vi: "Người Anh uống ~100 triệu tách trà mỗi ngày — trà là 'small talk' đó!", en: "Brits drink ~100M cups of tea a day — tea IS British small talk!", to: "/english/conversational/curriculum", ctaVi: "Luyện hội thoại EN", ctaEn: "Practice EN Speaking" },
  { chibi: chibiGraduate,     side: "right", vi: "Đại học Harvard ra đời năm 1636 — sớm hơn nước Mỹ tận 140 năm!", en: "Harvard opened in 1636 — 140 years before the USA existed!", to: "/study-abroad/sat", ctaVi: "Lộ trình SAT", ctaEn: "SAT Roadmap" },
  { chibi: chibiHsk5,         side: "left",  vi: "Vạn Lý Trường Thành dài hơn 21.000km — nhưng KHÔNG nhìn thấy từ Mặt Trăng đâu!", en: "The Great Wall is 21,000+ km long — but no, you can't see it from the Moon!", to: "/chinese/hsk-guide", ctaVi: "Học HSK", ctaEn: "Study HSK" },
  { chibi: chibiVocabCheer,   side: "right", vi: "Pomodoro: 25 phút học + 5 phút nghỉ giúp nhớ lâu hơn 40%!", en: "Pomodoro: 25 min focus + 5 min break boosts retention by 40%!", to: "/dashboard", ctaVi: "Mở Dashboard", ctaEn: "Open Dashboard" },
];

const ChibiFactSpeakers = () => {
  const { lang } = useLanguage();
  // Rotate the displayed set every 3 minutes so users always see fresh facts
  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setRotation((r) => r + 1), 3 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const facts = useMemo(() => {
    const shifted = [...FACTS.slice(rotation % FACTS.length), ...FACTS.slice(0, rotation % FACTS.length)];
    return shifted;
  }, [rotation]);

  // Distribute chibis evenly between hero (~12%) and footer (~88%) of the
  // parent's actual content height, so they NEVER extend past the footer.
  // Start AFTER the entire hero section (including the Learning & Teaching
  // Journey timeline) so chibis never speak over that area.
  const START_PCT = 42;
  const END_PCT = 88;
  const total = facts.length;

  // Only ONE chibi speaks at a time. Speaks for SPEAK_MS, then bubble hides
  // for GAP_MS before the next chibi takes the mic.
  const SPEAK_MS = 8000;
  const GAP_MS = 3000;
  const [activeIdx, setActiveIdx] = useState(0);
  const [speaking, setSpeaking] = useState(true);
  useEffect(() => {
    let timer: number;
    if (speaking) {
      timer = window.setTimeout(() => setSpeaking(false), SPEAK_MS);
    } else {
      timer = window.setTimeout(() => {
        setActiveIdx((i) => (i + 1) % total);
        setSpeaking(true);
      }, GAP_MS);
    }
    return () => clearTimeout(timer);
  }, [speaking, total]);

  const activeFact = facts[activeIdx];
  const activeTop = total > 1 ? START_PCT + (activeIdx * (END_PCT - START_PCT)) / (total - 1) : START_PCT;
  const isLeft = activeFact.side === "left";
  const funEmoji = FUN_EMOJIS[(activeIdx * 7 + rotation) % FUN_EMOJIS.length];

  return (
    <div aria-hidden={false} className="pointer-events-none absolute inset-0 hidden lg:block z-40 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${rotation}-${activeIdx}`}
          initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: isLeft ? -30 : 30, y: -10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute pointer-events-auto"
          style={{
            top: `${activeTop}%`,
            [isLeft ? "left" : "right"]: "2.5vw",
            maxWidth: "320px",
          }}
        >
          <div className={`flex items-end gap-2 ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
            <motion.img
              src={activeFact.chibi}
              alt=""
              width={120}
              height={120}
              loading="lazy"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-[110px] h-[110px] xl:w-[130px] xl:h-[130px] object-contain shrink-0"
              style={{
                filter: "drop-shadow(0 8px 18px rgba(59,130,246,0.45)) drop-shadow(0 4px 8px rgba(16,185,129,0.35))",
                transform: isLeft ? "none" : "scaleX(-1)",
              }}
            />
            <AnimatePresence>
              {speaking && (
                <motion.div
                  key="bubble"
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`relative rounded-2xl border-[3px] border-primary/70 bg-background shadow-2xl shadow-primary/30 px-4 py-3 text-sm leading-snug text-foreground ${isLeft ? "rounded-bl-sm" : "rounded-br-sm"}`}
                >
                  <span
                    aria-hidden
                    className={`absolute bottom-3 w-3 h-3 rotate-45 bg-background ${isLeft ? "-left-[8px] border-l-[3px] border-b-[3px] border-primary/70" : "-right-[8px] border-r-[3px] border-t-[3px] border-primary/70"}`}
                  />
                  <p className="font-medium">
                    {lang === "vi" ? activeFact.vi : activeFact.en}
                    <motion.span
                      aria-hidden
                      animate={{ rotate: [0, -12, 12, -8, 0], scale: [1, 1.15, 1, 1.1, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      className="inline-block ml-1.5 text-base"
                    >
                      {funEmoji}
                    </motion.span>
                  </p>
                  <Link
                    to={activeFact.to}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 group"
                  >
                    {lang === "vi" ? activeFact.ctaVi : activeFact.ctaEn}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ChibiFactSpeakers;
