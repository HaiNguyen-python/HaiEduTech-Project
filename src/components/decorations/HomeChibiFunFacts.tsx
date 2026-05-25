/**
 * @file HomeChibiFunFacts.tsx
 * @description Fixed-position chibis on the home page that pop random fun facts
 *              in cute speech bubbles. Desktop-only, fixed to viewport so they
 *              do not scroll with content.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import chibiTeacher from "@/assets/chibi-teacher.png";
import chibiOwl from "@/assets/chibi-owl.png";
import chibiRocket from "@/assets/chibi-rocket.png";

type Fact = { vi: string; en: string };

const FACTS: Fact[] = [
  { vi: "AI chatbot bật mí: hơn 60% từ vựng học thuật tiếng Anh có gốc Latin hoặc Pháp.", en: "AI chatbot fact: over 60% of academic English vocabulary comes from Latin or French roots." },
  { vi: "AI chatbot bật mí: chữ 好 ghép từ 女 và 子 — một chữ Hán nhỏ nhưng chứa cả câu chuyện văn hoá.", en: "AI chatbot fact: the Chinese character 好 combines 女 and 子 — one small symbol with a full cultural story." },
  { vi: "AI chatbot bật mí: Python được đặt theo nhóm hài Monty Python, không phải theo loài rắn.", en: "AI chatbot fact: Python was named after Monty Python, not the snake." },
  { vi: "AI chatbot bật mí: luyện nói tiếng Anh 10 phút mỗi ngày hiệu quả hơn học dồn 1 buổi dài cuối tuần.", en: "AI chatbot fact: 10 minutes of spoken English daily beats one long cramming session on the weekend." },
  { vi: "AI chatbot bật mí: chỉ khoảng 3.000 chữ Hán thông dụng là đã đủ đọc phần lớn nội dung báo chí cơ bản.", en: "AI chatbot fact: roughly 3,000 common Hanzi are enough to read most basic news content." },
  { vi: "AI chatbot bật mí: học lập trình sớm giúp não quen với tư duy chia nhỏ vấn đề và giải từng bước.", en: "AI chatbot fact: learning to code early trains your brain to break big problems into clear steps." },
  { vi: "AI chatbot bật mí: IELTS Speaking chỉ khoảng 11–14 phút, nên phản xạ tự nhiên quan trọng hơn nói quá dài.", en: "AI chatbot fact: IELTS Speaking lasts only 11–14 minutes, so natural response matters more than speaking too long." },
  { vi: "AI chatbot bật mí: nhiều từ tiếng Trung hiện đại dùng rất gọn — 电脑 là 'máy não điện', tức computer.", en: "AI chatbot fact: many modern Chinese words are compact — 电脑 literally means 'electric brain', or computer." },
  { vi: "AI chatbot bật mí: JavaScript được viết trong khoảng 10 ngày, nhưng nay lại đứng sau vô số website lớn.", en: "AI chatbot fact: JavaScript was created in about 10 days, yet now powers countless major websites." },
];

const CHIBIS = [chibiTeacher, chibiOwl, chibiRocket];
const ROTATE_MS = 3 * 60 * 1000;

interface Spot {
  src: string;
  side: "left" | "right";
  top: string;
  offset: string;
  size: number;
  bubbleSide: "left" | "right";
}

const HomeChibiFunFacts = () => {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [factIdx, setFactIdx] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

   // Rotate the displayed fun fact every 3 minutes
  useEffect(() => {
    const id = setInterval(() => {
      setFactIdx((i) => (i + Math.floor(Math.random() * (FACTS.length - 1)) + 1) % FACTS.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  const spots = useMemo<Spot[]>(() => {
    return [
      { src: CHIBIS[0], side: "left", top: "clamp(5.5rem, 8vw, 7rem)", offset: "clamp(0.75rem, 2vw, 2rem)", size: 94, bubbleSide: "right" },
      { src: CHIBIS[1], side: "right", top: "clamp(14rem, 28vw, 19rem)", offset: "clamp(0.75rem, 2vw, 2rem)", size: 92, bubbleSide: "left" },
      { src: CHIBIS[2], side: "left", top: "clamp(25rem, 44vw, 33rem)", offset: "clamp(0.75rem, 2.5vw, 2.25rem)", size: 96, bubbleSide: "right" },
    ];
  }, []);

  if (!mounted) return null;

  const speakerIdx = factIdx % spots.length;
  const currentFact = FACTS[factIdx];
  const factText = lang === "vi" ? currentFact.vi : currentFact.en;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 hidden h-[48rem] select-none lg:block">
      {spots.map((s, i) => {
        const isSpeaker = i === speakerIdx;
        const bubblePosStyle: React.CSSProperties =
          s.bubbleSide === "right"
            ? { left: `${s.size + 10}px` }
            : { right: `${s.size + 10}px` };
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: s.top,
              [s.side]: s.offset,
              zIndex: 4,
              width: `${s.size}px`,
              height: `${s.size}px`,
            }}
          >
            <img
              src={s.src}
              alt=""
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter:
                  "drop-shadow(0 6px 14px rgba(59,130,246,0.45)) drop-shadow(0 3px 6px rgba(16,185,129,0.35))",
                transform: isSpeaker ? "translateY(-4px) scale(1.05)" : "none",
                transition: "transform 400ms ease",
              }}
            />
            {isSpeaker && (
              <div
                key={factIdx}
                style={{
                  position: "absolute",
                  top: `${s.size * 0.18}px`,
                  ...bubblePosStyle,
                  maxWidth: "240px",
                  minWidth: "180px",
                  padding: "10px 14px",
                  borderRadius: "16px",
                  background: "hsl(var(--background))",
                  border: "1.5px solid hsl(var(--primary) / 0.35)",
                  boxShadow:
                    "0 10px 24px rgba(59,130,246,0.18), 0 4px 10px rgba(16,185,129,0.12)",
                  fontSize: "13px",
                  lineHeight: 1.4,
                  color: "hsl(var(--foreground))",
                  animation: "chibiBubbleIn 400ms ease-out",
                }}
              >
                <span style={{ fontWeight: 600, color: "hsl(var(--primary))" }}>
                  🤖 {lang === "vi" ? "AI chatbot nói nhỏ" : "AI chatbot says"}
                </span>
                <div style={{ marginTop: 4 }}>{factText}</div>
              </div>
            )}
          </div>
        );
      })}
      <style>{`
        @keyframes chibiBubbleIn {
          from { opacity: 0; transform: translateY(6px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default HomeChibiFunFacts;
