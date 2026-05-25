/**
 * @file ChibiFactSpeakers.tsx
 * @description Chibi mascots scattered down the home page, each speaking a fun fact
 * in a cute speech bubble. Replaces the static "Did you know?" card.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import chibiTeacher from "@/assets/chibi-teacher.png";
import chibiTeacherIelts from "@/assets/chibi-teacher-ielts.png";
import chibiReading from "@/assets/chibi-reading.png";
import chibiSpeaking from "@/assets/chibi-speaking.png";
import chibiListening from "@/assets/chibi-listening.png";
import chibiGraduate from "@/assets/chibi-graduate.png";
import chibiOwl from "@/assets/chibi-owl.png";
import chibiPanda from "@/assets/chibi-panda.png";
import chibiCoder from "@/assets/chibi-coder.png";
import chibiRobot from "@/assets/chibi-robot.png";
import aiChibiRobot from "@/assets/ai-chibi-robot.png";
import chibiRocket from "@/assets/chibi-rocket.png";
import chibiHsk3 from "@/assets/chibi-cn-hsk3.png";
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

// Curated facts, each with a unique chibi speaker
const FACTS: Fact[] = [
  { chibi: chibiPanda,        side: "left",  vi: "Tiếng Trung không có thì! 了, 过, 将 sẽ thay bạn chia động từ đó.", en: "Mandarin has no tenses! 了, 过, 将 do the time-marking for you.", to: "/chinese", ctaVi: "Học HSK ngay", ctaEn: "Start HSK" },
  { chibi: chibiTeacherIelts, side: "right", vi: "Hơn 60% từ vựng IELTS có gốc Pháp & Latin — học gốc từ là cheat code!", en: "60%+ of IELTS vocab is French & Latin — learning roots is a cheat code!", to: "/ielts-vocabulary", ctaVi: "Vào IELTS Vocab", ctaEn: "Open IELTS Vocab" },
  { chibi: chibiCoder,        side: "left",  vi: "Python đặt tên theo nhóm hài Monty Python, không phải con rắn nhé!", en: "Python is named after Monty Python — not the snake!", to: "/programming", ctaVi: "Học Python", ctaEn: "Learn Python" },
  { chibi: chibiOwl,          side: "right", vi: "Bug đầu tiên là một con bướm đêm thật, kẹt trong máy Mark II năm 1947!", en: "The first 'bug' was a real moth stuck in the Mark II computer in 1947!", to: "/programming", ctaVi: "Mở Programming Lab", ctaEn: "Open Coding Lab" },
  { chibi: chibiHsk3,         side: "left",  vi: "Chữ 好 (tốt) = 女 (nữ) + 子 (con) — mẹ con sum vầy là điều đẹp nhất!", en: "好 (good) = 女 (woman) + 子 (child) — mother & child = best thing ever!", to: "/chinese/hsk/vocabulary", ctaVi: "Học Hán tự", ctaEn: "Learn Hanzi" },
  { chibi: aiChibiRobot,      side: "right", vi: "ChatGPT đạt 100 triệu người dùng chỉ trong 2 tháng — kỷ lục lịch sử!", en: "ChatGPT hit 100M users in just 2 months — the fastest-growing app ever!", to: "/programming/ai-academy", ctaVi: "Vào AI Academy", ctaEn: "Enter AI Academy" },
  { chibi: chibiSpeaking,     side: "left",  vi: "Người Anh uống ~100 triệu tách trà mỗi ngày — trà là 'small talk' đó!", en: "Brits drink ~100M cups of tea a day — tea IS British small talk!", to: "/english/conversational/curriculum", ctaVi: "Luyện hội thoại EN", ctaEn: "Practice EN Speaking" },
  { chibi: chibiGraduate,     side: "right", vi: "Đại học Harvard ra đời năm 1636 — sớm hơn nước Mỹ tận 140 năm!", en: "Harvard opened in 1636 — 140 years before the USA existed!", to: "/study-abroad/sat", ctaVi: "Lộ trình SAT", ctaEn: "SAT Roadmap" },
  { chibi: chibiRocket,       side: "left",  vi: "JavaScript được tạo ra trong chỉ... 10 ngày năm 1995. Nhanh kinh khủng!", en: "JavaScript was built in just 10 days back in 1995. Wild!", to: "/programming", ctaVi: "Khám phá Tech", ctaEn: "Explore Tech" },
  { chibi: chibiReading,      side: "right", vi: "Từ tiếng Anh dài nhất không lặp chữ là 'uncopyrightable' — 15 chữ khác nhau!", en: "Longest English word with no repeated letters: 'uncopyrightable' — 15 unique letters!", to: "/sat-vocabulary", ctaVi: "Luyện SAT Vocab", ctaEn: "Practice SAT Vocab" },
  { chibi: chibiHsk5,         side: "left",  vi: "Vạn Lý Trường Thành dài hơn 21.000km — nhưng KHÔNG nhìn thấy từ Mặt Trăng đâu!", en: "The Great Wall is 21,000+ km long — but no, you can't see it from the Moon!", to: "/chinese/hsk-guide", ctaVi: "Học HSK", ctaEn: "Study HSK" },
  { chibi: chibiRobot,        side: "right", vi: "Lập trình viên đầu tiên là Ada Lovelace — một phụ nữ, từ năm 1843!", en: "The world's first programmer was Ada Lovelace — a woman, in 1843!", to: "/programming", ctaVi: "Bắt đầu code", ctaEn: "Start coding" },
  { chibi: chibiListening,    side: "left",  vi: "TOEIC vốn được tạo cho... nhân viên ngân hàng Nhật Bản vào năm 1979!", en: "TOEIC was originally built for… Japanese bank employees in 1979!", to: "/english/toeic", ctaVi: "Khám phá TOEIC", ctaEn: "Explore TOEIC" },
  { chibi: chibiVocabCheer,   side: "right", vi: "Pomodoro: 25 phút học + 5 phút nghỉ giúp nhớ lâu hơn 40%!", en: "Pomodoro: 25 min focus + 5 min break boosts retention by 40%!", to: "/dashboard", ctaVi: "Mở Dashboard", ctaEn: "Open Dashboard" },
  { chibi: chibiTeacher,      side: "left",  vi: "Spaced repetition: chỉ 7 lần lặp đúng khoảng cách là nhớ cả đời!", en: "Spaced repetition: just 7 well-timed reviews = lifelong memory!", to: "/ielts-vocabulary", ctaVi: "Thử Vocab Bank", ctaEn: "Try Vocab Bank" },
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
  const START_PCT = 12;
  const END_PCT = 88;
  const total = facts.length;

  return (
    <div aria-hidden={false} className="pointer-events-none absolute inset-0 hidden lg:block z-40 overflow-hidden">
      {facts.map((f, i) => {
        const top = total > 1 ? START_PCT + (i * (END_PCT - START_PCT)) / (total - 1) : START_PCT;
        const isLeft = f.side === "left";
        const funEmoji = FUN_EMOJIS[(i * 7 + rotation) % FUN_EMOJIS.length];
        return (
          <motion.div
            key={`${rotation}-${i}`}
            initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false, amount: 0.4, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="absolute pointer-events-auto"
            style={{
              top: `${top}%`,
              [isLeft ? "left" : "right"]: "1.2vw",
              maxWidth: "320px",
            }}
          >
            <div className={`flex items-end gap-2 ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
              <motion.img
                src={f.chibi}
                alt=""
                width={120}
                height={120}
                loading="lazy"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                className="w-[110px] h-[110px] xl:w-[130px] xl:h-[130px] object-contain shrink-0"
                style={{
                  filter: "drop-shadow(0 8px 18px rgba(59,130,246,0.45)) drop-shadow(0 4px 8px rgba(16,185,129,0.35))",
                  transform: isLeft ? "none" : "scaleX(-1)",
                }}
              />
              <div
                className={`relative rounded-2xl border-[3px] border-primary/70 bg-background shadow-2xl shadow-primary/30 px-4 py-3 text-sm leading-snug text-foreground ${isLeft ? "rounded-bl-sm" : "rounded-br-sm"}`}
              >
                {/* Tail */}
                <span
                  aria-hidden
                  className={`absolute bottom-3 w-3 h-3 rotate-45 bg-background ${isLeft ? "-left-[8px] border-l-[3px] border-b-[3px] border-primary/70" : "-right-[8px] border-r-[3px] border-t-[3px] border-primary/70"}`}
                />
                <p className="font-medium">
                  {lang === "vi" ? f.vi : f.en}
                  <motion.span
                    aria-hidden
                    animate={{ rotate: [0, -12, 12, -8, 0], scale: [1, 1.15, 1, 1.1, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    className="inline-block ml-1.5 text-base"
                  >
                    {funEmoji}
                  </motion.span>
                </p>
                <Link
                  to={f.to}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 group"
                >
                  {lang === "vi" ? f.ctaVi : f.ctaEn}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ChibiFactSpeakers;
