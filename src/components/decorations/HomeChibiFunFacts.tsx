/**
 * @file HomeChibiFunFacts.tsx
 * @description Fixed-position chibis on the home page that pop random fun facts
 *              in cute speech bubbles. Desktop-only, fixed to viewport so they
 *              do not scroll with content.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import chibiTeacher from "@/assets/chibi-teacher.png";
import chibiOwl from "@/assets/chibi-owl.png";
import chibiRocket from "@/assets/chibi-rocket.png";
import chibiGraduate from "@/assets/chibi-graduate.png";
import chibiCoder from "@/assets/chibi-coder.png";
import chibiPanda from "@/assets/chibi-panda.png";

type Fact = { vi: string; en: string };

const FACTS: Fact[] = [
  { vi: "Bộ não bạn đốt ~20% năng lượng cơ thể đấy!", en: "Your brain burns ~20% of your body's energy!" },
  { vi: "Học 20 phút mỗi ngày hiệu quả hơn 3 tiếng cuối tuần.", en: "20 minutes daily beats 3 hours on weekends." },
  { vi: "Tiếng Trung có hơn 50.000 chữ Hán — nhưng chỉ cần ~3.000 để đọc báo!", en: "Chinese has 50,000+ characters — but ~3,000 is enough to read the news!" },
  { vi: "IELTS Speaking dài chỉ 11–14 phút thôi 😉", en: "IELTS Speaking is only 11–14 minutes long 😉" },
  { vi: "Python được đặt theo tên… nhóm hài Monty Python!", en: "Python is named after… the Monty Python comedy group!" },
  { vi: "Nghe nhạc khi học từ vựng giúp ghi nhớ lâu hơn.", en: "Listening to music while learning vocab boosts retention." },
  { vi: "Thầy Hải có 15+ năm kinh nghiệm giảng dạy 🇻🇳🇫🇮", en: "Mr. Hai has 15+ years of teaching experience 🇻🇳🇫🇮" },
  { vi: "AI có thể chấm IELTS Writing trong 10 giây tại HaiEduTech!", en: "AI can grade IELTS Writing in 10 seconds at HaiEduTech!" },
  { vi: "Học song ngữ làm chậm lão hóa não tới 4–5 năm.", en: "Bilingualism can delay brain aging by 4–5 years." },
  { vi: "TOEIC có 200 câu hỏi trong 2 tiếng — bình quân 36 giây/câu!", en: "TOEIC has 200 questions in 2 hours — ~36 seconds each!" },
  { vi: "Chữ 'HSK' nghĩa là 汉语水平考试 — Hán Ngữ Thủy Bình Khảo Thí.", en: "'HSK' means 汉语水平考试 — Chinese Proficiency Test." },
  { vi: "Học code giúp bạn tư duy logic tốt hơn ở mọi môn học!", en: "Coding improves logical thinking across every subject!" },
];

const CHIBIS = [chibiTeacher, chibiOwl, chibiRocket, chibiGraduate, chibiCoder, chibiPanda];

interface Spot {
  src: string;
  side: "left" | "right";
  top: number;     // vh percentage
  offset: number;  // px from side
  size: number;
  bubbleSide: "left" | "right";
}

const HomeChibiFunFacts = () => {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [factIdx, setFactIdx] = useState(0);

  useEffect(() => {
    setMounted(true);
    const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Rotate the displayed fun fact every ~6s
  useEffect(() => {
    const id = setInterval(() => {
      setFactIdx((i) => (i + Math.floor(Math.random() * (FACTS.length - 1)) + 1) % FACTS.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const spots = useMemo<Spot[]>(() => {
    // 3 chibis distributed top/middle/bottom on alternating sides
    return [
      { src: CHIBIS[0], side: "left",  top: 18, offset: 14, size: 110, bubbleSide: "right" },
      { src: CHIBIS[1], side: "right", top: 42, offset: 14, size: 100, bubbleSide: "left"  },
      { src: CHIBIS[2], side: "left",  top: 70, offset: 18, size: 105, bubbleSide: "right" },
    ];
  }, []);

  if (!mounted || viewport.w < 1024 || viewport.h === 0) return null;

  // One chibi at a time "speaks" — cycle which one
  const speakerIdx = factIdx % spots.length;
  const currentFact = FACTS[factIdx];
  const factText = language === "vi" ? currentFact.vi : currentFact.en;

  return createPortal(
    <div aria-hidden className="pointer-events-none hidden lg:block select-none">
      {spots.map((s, i) => {
        const topPx = Math.round((s.top / 100) * viewport.h);
        const isSpeaker = i === speakerIdx;
        const bubblePosStyle: React.CSSProperties =
          s.bubbleSide === "right"
            ? { left: `${s.size + 10}px` }
            : { right: `${s.size + 10}px` };
        return (
          <div
            key={i}
            style={{
              position: "fixed",
              top: `${topPx}px`,
              [s.side]: `${s.offset}px`,
              zIndex: 5,
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
                  💡 {language === "vi" ? "Bạn biết không?" : "Did you know?"}
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
    </div>,
    document.body
  );
};

export default HomeChibiFunFacts;
