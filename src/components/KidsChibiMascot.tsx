/**
 * @file KidsChibiMascot.tsx
 * @description Two cute animated chibi mascots (boy + girl) fixed at the bottom-right corner.
 * Pure CSS/SVG — arms wave, legs kick, body bobs, eyes blink. Click for jump + speech bubble.
 */
import { useState, useEffect } from "react";

const TIPS_VI = [
  "Cố lên nào! 🌟",
  "Học từ mới thôi! 📚",
  "Bạn giỏi lắm! 💪",
  "Đánh dấu 'đã thuộc' nhé! ✨",
  "Mỗi ngày 5 từ thôi! 🎯",
  "Tuyệt vời! 🎉",
  "Đọc to lên nào! 🎤",
];
const TIPS_EN = [
  "You can do it! 🌟",
  "Let's learn a word! 📚",
  "You're awesome! 💪",
  "Mark 'mastered'! ✨",
  "Just 5 words a day! 🎯",
  "Amazing! 🎉",
  "Say it out loud! 🎤",
];

type Who = "boy" | "girl";

function ChibiSVG({ who }: { who: Who; jump?: boolean }) {
  const isGirl = who === "girl";
  // Soft kawaii palette
  const skin = "#FFE3CC";
  const skinShade = "#FFCBA8";
  const cheek = "#FF8FB1";
  const hair = isGirl ? "#8B4A2B" : "#3A2418";
  const hairShine = isGirl ? "#C77E55" : "#6B4A3A";
  const shirt = isGirl ? "#FF7FB6" : "#5DA9FF";
  const shirtLight = isGirl ? "#FFD6E8" : "#CFE4FF";
  const overall = isGirl ? "#E94B8A" : "#3B5BA5";
  const shoe = isGirl ? "#C72A6D" : "#1f2937";
  const bow = "#FFE066";
  const mouth = "#C2185B";

  return (
    <svg
      width="100"
      height="128"
      viewBox="0 0 120 160"
      style={{ filter: "drop-shadow(0 8px 12px rgba(0,0,0,.22))", overflow: "visible" }}
    >
      {/* Ground shadow */}
      <ellipse cx="60" cy="154" rx="30" ry="4.5" fill="rgba(0,0,0,.18)" />

      {/* Legs (chubby) */}
      <g className="chibi-leg-l">
        <rect x="42" y="112" width="15" height="24" rx="7.5" fill={overall} />
        <ellipse cx="49.5" cy="138" rx="11" ry="5.5" fill={shoe} />
        <ellipse cx="47" cy="137" rx="3" ry="1.4" fill="#fff" opacity=".5" />
      </g>
      <g className="chibi-leg-r">
        <rect x="63" y="112" width="15" height="24" rx="7.5" fill={overall} />
        <ellipse cx="70.5" cy="138" rx="11" ry="5.5" fill={shoe} />
        <ellipse cx="68" cy="137" rx="3" ry="1.4" fill="#fff" opacity=".5" />
      </g>

      {/* Body / shirt (rounder, pillow shape) */}
      <path
        d="M30,92 Q30,72 60,72 Q90,72 90,92 L88,114 Q60,122 32,114 Z"
        fill={shirt}
      />
      {/* Soft shirt highlight */}
      <ellipse cx="52" cy="88" rx="14" ry="8" fill={shirtLight} opacity="0.75" />
      {/* Cute chest emblem */}
      <text x="60" y="103" textAnchor="middle" fontSize="16">{isGirl ? "🌸" : "⭐"}</text>

      {/* Arms (rounded) */}
      <g className="chibi-arm-l">
        <rect x="22" y="74" width="13" height="30" rx="6.5" fill={shirt} />
        <circle cx="28.5" cy="106" r="8.5" fill={skin} />
        <circle cx="26" cy="104" r="2" fill="#fff" opacity=".55" />
      </g>
      <g className="chibi-arm-r">
        <rect x="85" y="74" width="13" height="30" rx="6.5" fill={shirt} />
        <circle cx="91.5" cy="106" r="8.5" fill={skin} />
        <circle cx="89" cy="104" r="2" fill="#fff" opacity=".55" />
      </g>

      {/* Head (extra round, big chibi head) */}
      <circle cx="60" cy="44" r="34" fill={skin} />
      {/* Subtle face shading */}
      <ellipse cx="60" cy="62" rx="22" ry="8" fill={skinShade} opacity=".35" />

      {/* Hair */}
      {isGirl ? (
        <>
          {/* Long flowing hair back */}
          <path d="M24,46 Q20,90 38,98 Q44,94 42,70 Q40,54 44,44 Z" fill={hair} />
          <path d="M96,46 Q100,90 82,98 Q76,94 78,70 Q80,54 76,44 Z" fill={hair} />
          {/* Twin tails hint */}
          <ellipse cx="30" cy="86" rx="6" ry="10" fill={hair} />
          <ellipse cx="90" cy="86" rx="6" ry="10" fill={hair} />
          {/* Top dome */}
          <path d="M26,46 Q26,10 60,8 Q94,10 94,46 Q90,28 60,24 Q30,28 26,46 Z" fill={hair} />
          {/* Soft bangs sweep */}
          <path d="M30,42 Q44,32 56,38 Q70,30 90,42 Q76,46 60,42 Q46,46 30,42 Z" fill={hair} />
          {/* Hair shine */}
          <path d="M40,20 Q50,16 58,20 Q50,22 42,26 Z" fill={hairShine} opacity=".7" />
          {/* Big bow */}
          <g className="chibi-bow">
            <ellipse cx="40" cy="20" rx="9" ry="6" fill={bow} />
            <ellipse cx="40" cy="20" rx="3" ry="3" fill="#FF8FB1" />
            <path d="M32,18 Q28,12 26,22 Q30,24 34,22 Z" fill={bow} />
            <path d="M48,18 Q52,12 54,22 Q50,24 46,22 Z" fill={bow} />
          </g>
        </>
      ) : (
        <>
          {/* Fluffy boy hair */}
          <path
            d="M26,44 Q24,12 60,8 Q96,12 94,44 Q90,28 80,30 Q74,18 60,22 Q46,18 40,30 Q30,28 26,44 Z"
            fill={hair}
          />
          {/* Cowlick tufts */}
          <path d="M52,12 Q56,4 62,12 Q58,14 54,16 Z" fill={hair} />
          <path d="M36,28 Q42,22 46,28 Q42,32 38,32 Z" fill={hair} />
          <path d="M84,28 Q78,22 74,28 Q78,32 82,32 Z" fill={hair} />
          {/* Hair shine */}
          <path d="M44,18 Q56,12 66,18 Q56,22 48,24 Z" fill={hairShine} opacity=".55" />
        </>
      )}

      {/* Ears */}
      <ellipse cx="28" cy="48" rx="3.5" ry="5.5" fill={skin} />
      <ellipse cx="92" cy="48" rx="3.5" ry="5.5" fill={skin} />

      {/* Cheeks (big & blushy) */}
      <ellipse cx="40" cy="58" rx="6" ry="4" fill={cheek} opacity="0.7" />
      <ellipse cx="80" cy="58" rx="6" ry="4" fill={cheek} opacity="0.7" />

      {/* Eyes — huge sparkly kawaii eyes */}
      <g className="chibi-eye-l">
        <ellipse cx="48" cy="52" rx="6" ry="8" fill="#1a1a2e" />
        <ellipse cx="48" cy="55" rx="4" ry="5" fill={isGirl ? "#6B2C5C" : "#1a3a6b"} />
        <circle cx="50" cy="50" r="2.4" fill="#fff" />
        <circle cx="46" cy="56" r="1.2" fill="#fff" />
      </g>
      <g className="chibi-eye-r" style={{ animationDelay: ".15s" } as any}>
        <ellipse cx="72" cy="52" rx="6" ry="8" fill="#1a1a2e" />
        <ellipse cx="72" cy="55" rx="4" ry="5" fill={isGirl ? "#6B2C5C" : "#1a3a6b"} />
        <circle cx="74" cy="50" r="2.4" fill="#fff" />
        <circle cx="70" cy="56" r="1.2" fill="#fff" />
      </g>

      {/* Tiny nose hint */}
      <ellipse cx="60" cy="62" rx="1.3" ry="1" fill={skinShade} opacity=".7" />

      {/* Big smile */}
      <path
        d="M51,67 Q60,75 69,67"
        stroke={mouth}
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Inner mouth */}
      <path d="M54,68 Q60,73 66,68 Q60,71 54,68 Z" fill="#FF6B9D" opacity=".75" />
    </svg>
  );
}


export default function KidsChibiMascot({ lang = "vi" as "vi" | "en" }) {
  const [bubble, setBubble] = useState<string | null>(null);
  const [jumpBoy, setJumpBoy] = useState(false);
  const [jumpGirl, setJumpGirl] = useState(false);

  useEffect(() => {
    const tips = lang === "vi" ? TIPS_VI : TIPS_EN;
    setBubble(tips[Math.floor(Math.random() * tips.length)]);
    const id = setInterval(() => {
      setBubble(tips[Math.floor(Math.random() * tips.length)]);
    }, 9000);
    return () => clearInterval(id);
  }, [lang]);

  const poke = (who: Who) => {
    if (who === "boy") {
      setJumpBoy(true);
      setTimeout(() => setJumpBoy(false), 700);
    } else {
      setJumpGirl(true);
      setTimeout(() => setJumpGirl(false), 700);
    }
    const tips = lang === "vi" ? TIPS_VI : TIPS_EN;
    setBubble(tips[Math.floor(Math.random() * tips.length)]);
  };

  return (
    <>
      <style>{`
        @keyframes chibi-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes chibi-bob2 { 0%,100%{transform:translateY(-3px)} 50%{transform:translateY(-9px)} }
        @keyframes chibi-arm-l { 0%,100%{transform:rotate(-18deg)} 50%{transform:rotate(-55deg)} }
        @keyframes chibi-arm-r { 0%,100%{transform:rotate(18deg)} 50%{transform:rotate(55deg)} }
        @keyframes chibi-leg-l { 0%,100%{transform:rotate(-6deg)} 50%{transform:rotate(12deg)} }
        @keyframes chibi-leg-r { 0%,100%{transform:rotate(6deg)} 50%{transform:rotate(-12deg)} }
        @keyframes chibi-blink { 0%,92%,100%{transform:scaleY(1)} 95%{transform:scaleY(.1)} }
        @keyframes chibi-bow-wiggle { 0%,100%{transform:rotate(-6deg)} 50%{transform:rotate(8deg)} }
        @keyframes chibi-jump {
          0%{transform:translateY(0)}
          40%{transform:translateY(-28px) rotate(-6deg)}
          70%{transform:translateY(-10px) rotate(5deg)}
          100%{transform:translateY(0)}
        }
        @keyframes bubble-pop { 0%{opacity:0; transform:translateY(6px) scale(.85)} 100%{opacity:1; transform:translateY(0) scale(1)} }
        .chibi-wrap { animation: chibi-bob 2.4s ease-in-out infinite; transform-origin: 50% 100%; }
        .chibi-wrap.boy { animation: chibi-bob 2.4s ease-in-out infinite; }
        .chibi-wrap.girl { animation: chibi-bob2 2.6s ease-in-out infinite .3s; }
        .chibi-wrap.jump { animation: chibi-jump .7s cubic-bezier(.3,1.4,.5,1) 1 !important; }
        .chibi-arm-l { transform-origin: 32px 78px; animation: chibi-arm-l 1.1s ease-in-out infinite; }
        .chibi-arm-r { transform-origin: 88px 78px; animation: chibi-arm-r 1.1s ease-in-out infinite; }
        .chibi-leg-l { transform-origin: 50px 112px; animation: chibi-leg-l 1.3s ease-in-out infinite; }
        .chibi-leg-r { transform-origin: 70px 112px; animation: chibi-leg-r 1.3s ease-in-out infinite; }
        .chibi-eye-l { transform-origin: 48px 52px; animation: chibi-blink 4.2s infinite; }
        .chibi-eye-r { transform-origin: 72px 52px; animation: chibi-blink 4.2s infinite; }
        .chibi-bow  { transform-origin: 60px 18px; animation: chibi-bow-wiggle 2s ease-in-out infinite; }
      `}</style>

      <style>{`
        /* Chibis are completely static — no idle motion, no hover motion. */
        @keyframes bubble-pop { 0%{opacity:0; transform:translateY(6px) scale(.85)} 100%{opacity:1; transform:translateY(0) scale(1)} }
        .chibi-wrap,
        .chibi-wrap.boy,
        .chibi-wrap.girl,
        .chibi-arm-l, .chibi-arm-r,
        .chibi-leg-l, .chibi-leg-r,
        .chibi-eye-l, .chibi-eye-r,
        .chibi-bow {
          animation: none !important;
          transform: none !important;
        }
        .chibi-wrap:hover, .chibi-wrap:focus { transform: none !important; animation: none !important; }
        .sparkle-fx { opacity: .85; animation: none !important; }
      `}</style>


      <div
        className="hidden md:flex fixed z-40 select-none items-end gap-2"
        style={{ bottom: 16, right: 16, pointerEvents: "none" }}
        aria-hidden="true"
      >

        {/* Soft cloud platform behind chibis (static) */}
        <div
          className="absolute"
          style={{
            bottom: -10, right: 0, width: 230, height: 60,
            background: "radial-gradient(ellipse at center, rgba(255,255,255,.85), rgba(255,255,255,0) 70%)",
          }}
        />

        {/* Static sparkles (no animation) */}
        <span className="sparkle-fx absolute" style={{ top: -6, right: 30, fontSize: 18 }}>✨</span>
        <span className="sparkle-fx absolute" style={{ top: 30, left: -10, fontSize: 14 }}>⭐</span>
        <span className="sparkle-fx absolute" style={{ bottom: 20, right: -8, fontSize: 16 }}>💫</span>


        {/* Speech bubble */}
        {bubble && (
          <div
            className="absolute px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap shadow-xl"
            style={{
              right: 60,
              top: -28,
              background: "linear-gradient(135deg,#FFF7CC,#FFE0A8)",
              color: "#7c4a00",
              border: "2.5px solid #FFB347",
              animation: "bubble-pop .35s ease-out",
            }}
          >
            {bubble}
            <span
              className="absolute"
              style={{
                right: 18, bottom: -9,
                width: 0, height: 0,
                borderLeft: "7px solid transparent",
                borderRight: "7px solid transparent",
                borderTop: "11px solid #FFB347",
              }}
            />
          </div>
        )}

        <button
          onClick={() => poke("boy")}
          style={{ pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
          aria-label="Boy chibi"
        >
          <div className={`chibi-wrap boy ${jumpBoy ? "jump" : ""}`}>
            <ChibiSVG who="boy" jump={jumpBoy} />
          </div>
        </button>

        <button
          onClick={() => poke("girl")}
          style={{ pointerEvents: "auto", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
          aria-label="Girl chibi"
        >
          <div className={`chibi-wrap girl ${jumpGirl ? "jump" : ""}`}>
            <ChibiSVG who="girl" jump={jumpGirl} />
          </div>
        </button>
      </div>
    </>
  );
}
