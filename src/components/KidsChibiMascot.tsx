/**
 * @file KidsChibiMascot.tsx
 * @description Cute animated chibi mascot fixed in the top-right corner.
 * Pure CSS/SVG — arms wave, legs kick, body bobs. Click for a little jump + speech bubble.
 */
import { useState, useEffect } from "react";

const TIPS_VI = [
  "Cố lên nào! 🌟",
  "Học từ mới thôi! 📚",
  "Bạn giỏi lắm! 💪",
  "Đánh dấu 'đã thuộc' nhé! ✨",
  "Mỗi ngày 5 từ thôi! 🎯",
];
const TIPS_EN = [
  "You can do it! 🌟",
  "Let's learn a word! 📚",
  "You're awesome! 💪",
  "Mark 'mastered'! ✨",
  "Just 5 words a day! 🎯",
];

export default function KidsChibiMascot({ lang = "vi" as "vi" | "en" }) {
  const [bubble, setBubble] = useState<string | null>(null);
  const [jump, setJump] = useState(false);

  useEffect(() => {
    const tips = lang === "vi" ? TIPS_VI : TIPS_EN;
    setBubble(tips[Math.floor(Math.random() * tips.length)]);
    const id = setInterval(() => {
      setBubble(tips[Math.floor(Math.random() * tips.length)]);
    }, 8000);
    return () => clearInterval(id);
  }, [lang]);

  const handleClick = () => {
    setJump(true);
    setTimeout(() => setJump(false), 700);
    const tips = lang === "vi" ? TIPS_VI : TIPS_EN;
    setBubble(tips[Math.floor(Math.random() * tips.length)]);
  };

  return (
    <>
      <style>{`
        @keyframes chibi-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes chibi-arm-l { 0%,100%{transform:rotate(-20deg)} 50%{transform:rotate(-55deg)} }
        @keyframes chibi-arm-r { 0%,100%{transform:rotate(20deg)} 50%{transform:rotate(55deg)} }
        @keyframes chibi-leg-l { 0%,100%{transform:rotate(-8deg)} 50%{transform:rotate(15deg)} }
        @keyframes chibi-leg-r { 0%,100%{transform:rotate(8deg)} 50%{transform:rotate(-15deg)} }
        @keyframes chibi-blink { 0%,92%,100%{transform:scaleY(1)} 95%{transform:scaleY(0.1)} }
        @keyframes chibi-jump { 0%{transform:translateY(0)} 40%{transform:translateY(-26px) rotate(-6deg)} 70%{transform:translateY(-10px) rotate(4deg)} 100%{transform:translateY(0)} }
        @keyframes bubble-pop { 0%{opacity:0; transform:translateY(6px) scale(.85)} 100%{opacity:1; transform:translateY(0) scale(1)} }
        .chibi-wrap { animation: chibi-bob 2.4s ease-in-out infinite; transform-origin: 50% 100%; }
        .chibi-wrap.jump { animation: chibi-jump .7s cubic-bezier(.3,1.4,.5,1) 1; }
        .chibi-arm-l { transform-origin: 38px 70px; animation: chibi-arm-l 1.1s ease-in-out infinite; }
        .chibi-arm-r { transform-origin: 82px 70px; animation: chibi-arm-r 1.1s ease-in-out infinite; }
        .chibi-leg-l { transform-origin: 50px 108px; animation: chibi-leg-l 1.3s ease-in-out infinite; }
        .chibi-leg-r { transform-origin: 70px 108px; animation: chibi-leg-r 1.3s ease-in-out infinite; }
        .chibi-eye  { transform-origin: center; animation: chibi-blink 4s infinite; }
      `}</style>

      <div
        className="hidden md:block fixed z-40 select-none"
        style={{ top: 84, right: 18, pointerEvents: "none" }}
        aria-hidden="true"
      >
        {bubble && (
          <div
            className="absolute right-[110px] top-2 px-3 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap shadow-lg"
            style={{
              background: "linear-gradient(135deg,#FFF7CC,#FFE9A8)",
              color: "#7c4a00",
              border: "2px solid #FFD46B",
              animation: "bubble-pop .35s ease-out",
            }}
          >
            {bubble}
            <span
              className="absolute"
              style={{
                right: -8, top: 12,
                width: 0, height: 0,
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderLeft: "10px solid #FFD46B",
              }}
            />
          </div>
        )}

        <button
          onClick={handleClick}
          className="group"
          style={{ pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
          aria-label="Chibi mascot"
        >
          <svg
            width="110"
            height="130"
            viewBox="0 0 120 140"
            className={`chibi-wrap ${jump ? "jump" : ""}`}
            style={{ filter: "drop-shadow(0 6px 8px rgba(0,0,0,.18))" }}
          >
            {/* Legs */}
            <g className="chibi-leg-l">
              <rect x="44" y="104" width="12" height="22" rx="6" fill="#4F46E5" />
              <ellipse cx="50" cy="128" rx="9" ry="5" fill="#1f2937" />
            </g>
            <g className="chibi-leg-r">
              <rect x="64" y="104" width="12" height="22" rx="6" fill="#4F46E5" />
              <ellipse cx="70" cy="128" rx="9" ry="5" fill="#1f2937" />
            </g>

            {/* Body */}
            <ellipse cx="60" cy="92" rx="28" ry="24" fill="#FF6B9D" />
            <ellipse cx="60" cy="96" rx="18" ry="14" fill="#FFD9E6" />

            {/* Arms */}
            <g className="chibi-arm-l">
              <rect x="30" y="68" width="12" height="28" rx="6" fill="#FF6B9D" />
              <circle cx="36" cy="98" r="7" fill="#FFD9B3" />
            </g>
            <g className="chibi-arm-r">
              <rect x="78" y="68" width="12" height="28" rx="6" fill="#FF6B9D" />
              <circle cx="84" cy="98" r="7" fill="#FFD9B3" />
            </g>

            {/* Head */}
            <circle cx="60" cy="46" r="30" fill="#FFE0BD" />
            {/* Hair */}
            <path d="M30,42 Q30,16 60,14 Q90,16 90,42 Q86,28 60,28 Q34,28 30,42Z" fill="#3B2A1A" />
            <path d="M30,42 Q36,34 44,38 L40,46 Z" fill="#3B2A1A" />
            <path d="M90,42 Q84,34 76,38 L80,46 Z" fill="#3B2A1A" />
            {/* Cheeks */}
            <circle cx="42" cy="54" r="4" fill="#FF9DB6" opacity="0.7" />
            <circle cx="78" cy="54" r="4" fill="#FF9DB6" opacity="0.7" />
            {/* Eyes */}
            <g className="chibi-eye">
              <ellipse cx="50" cy="48" rx="3.5" ry="4.5" fill="#1f2937" />
              <circle cx="51.2" cy="46.5" r="1.2" fill="#fff" />
            </g>
            <g className="chibi-eye" style={{ animationDelay: ".1s" } as any}>
              <ellipse cx="70" cy="48" rx="3.5" ry="4.5" fill="#1f2937" />
              <circle cx="71.2" cy="46.5" r="1.2" fill="#fff" />
            </g>
            {/* Smile */}
            <path d="M54,58 Q60,64 66,58" stroke="#7a3b1f" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Little star on chest */}
            <text x="60" y="96" textAnchor="middle" fontSize="14">⭐</text>
          </svg>
        </button>
      </div>
    </>
  );
}
