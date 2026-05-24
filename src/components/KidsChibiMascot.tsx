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

function ChibiSVG({ who, jump }: { who: Who; jump: boolean }) {
  const isGirl = who === "girl";
  // Color palettes
  const skin = "#FFE0BD";
  const cheek = "#FF9DB6";
  const hair = isGirl ? "#6B3A1F" : "#2C1810";
  const shirt = isGirl ? "#FF6FA8" : "#4F8CFF";
  const shirtLight = isGirl ? "#FFD0E2" : "#C9DCFF";
  const pants = isGirl ? "#A24BE0" : "#2C3E66";
  const shoe = isGirl ? "#E91E63" : "#1f2937";
  const bow = "#FFD93D";

  return (
    <svg
      width="92"
      height="118"
      viewBox="0 0 120 150"
      style={{ filter: "drop-shadow(0 6px 10px rgba(0,0,0,.22))", overflow: "visible" }}
    >
      {/* Shadow */}
      <ellipse cx="60" cy="144" rx="26" ry="4" fill="rgba(0,0,0,.18)" />

      {/* Legs */}
      <g className="chibi-leg-l">
        <rect x="44" y="108" width="13" height="22" rx="6" fill={pants} />
        <ellipse cx="50" cy="132" rx="10" ry="5" fill={shoe} />
      </g>
      <g className="chibi-leg-r">
        <rect x="63" y="108" width="13" height="22" rx="6" fill={pants} />
        <ellipse cx="70" cy="132" rx="10" ry="5" fill={shoe} />
      </g>

      {/* Body / shirt */}
      <path
        d="M32,90 Q32,72 60,72 Q88,72 88,90 L86,108 Q60,116 34,108 Z"
        fill={shirt}
      />
      {/* Shirt highlight */}
      <ellipse cx="60" cy="92" rx="16" ry="9" fill={shirtLight} opacity="0.7" />
      {/* Star on chest */}
      <text x="60" y="98" textAnchor="middle" fontSize="14">⭐</text>

      {/* Arms */}
      <g className="chibi-arm-l">
        <rect x="26" y="74" width="12" height="28" rx="6" fill={shirt} />
        <circle cx="32" cy="104" r="7.5" fill={skin} />
      </g>
      <g className="chibi-arm-r">
        <rect x="82" y="74" width="12" height="28" rx="6" fill={shirt} />
        <circle cx="88" cy="104" r="7.5" fill={skin} />
      </g>

      {/* Head */}
      <circle cx="60" cy="46" r="30" fill={skin} />

      {/* Hair */}
      {isGirl ? (
        <>
          {/* Long hair back */}
          <path d="M28,46 Q26,82 38,90 L44,86 Q40,64 42,48 Z" fill={hair} />
          <path d="M92,46 Q94,82 82,90 L76,86 Q80,64 78,48 Z" fill={hair} />
          {/* Top hair */}
          <path d="M28,44 Q28,14 60,12 Q92,14 92,44 Q88,28 60,26 Q32,28 28,44 Z" fill={hair} />
          {/* Bangs */}
          <path d="M34,40 Q44,30 58,36 Q72,30 86,40 Q72,42 60,40 Q48,42 34,40 Z" fill={hair} />
          {/* Bow */}
          <g className="chibi-bow">
            <circle cx="60" cy="18" r="3" fill={bow} />
            <path d="M60,18 Q50,12 48,20 Q50,24 60,18 Z" fill={bow} />
            <path d="M60,18 Q70,12 72,20 Q70,24 60,18 Z" fill={bow} />
          </g>
        </>
      ) : (
        <>
          {/* Short messy boy hair */}
          <path
            d="M30,44 Q28,16 60,14 Q92,16 90,44 Q86,32 78,32 Q72,24 60,26 Q48,24 42,32 Q34,32 30,44 Z"
            fill={hair}
          />
          <path d="M34,42 Q40,36 46,40 L42,46 Z" fill={hair} />
          <path d="M86,42 Q80,36 74,40 L78,46 Z" fill={hair} />
        </>
      )}

      {/* Ears */}
      <ellipse cx="30" cy="50" rx="3" ry="5" fill={skin} />
      <ellipse cx="90" cy="50" rx="3" ry="5" fill={skin} />

      {/* Cheeks */}
      <circle cx="42" cy="56" r="4.5" fill={cheek} opacity="0.75" />
      <circle cx="78" cy="56" r="4.5" fill={cheek} opacity="0.75" />

      {/* Eyes (big sparkly) */}
      <g className="chibi-eye">
        <ellipse cx="50" cy="50" rx="4.2" ry="5.4" fill="#1f2937" />
        <circle cx="51.4" cy="48.2" r="1.5" fill="#fff" />
        <circle cx="49.2" cy="51.6" r="0.7" fill="#fff" />
      </g>
      <g className="chibi-eye" style={{ animationDelay: ".15s" } as any}>
        <ellipse cx="70" cy="50" rx="4.2" ry="5.4" fill="#1f2937" />
        <circle cx="71.4" cy="48.2" r="1.5" fill="#fff" />
        <circle cx="69.2" cy="51.6" r="0.7" fill="#fff" />
      </g>

      {/* Smile */}
      <path
        d="M53,60 Q60,66 67,60"
        stroke="#7a3b1f"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Tiny tongue for girl */}
      {isGirl && (
        <ellipse cx="60" cy="63" rx="2.5" ry="1.6" fill="#FF6B9D" />
      )}
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
        .chibi-eye  { transform-origin: center; animation: chibi-blink 4.2s infinite; }
        .chibi-bow  { transform-origin: 60px 18px; animation: chibi-bow-wiggle 2s ease-in-out infinite; }
      `}</style>

      <style>{`
        @keyframes heart-float { 0%{transform:translateY(0) scale(.8); opacity:0} 30%{opacity:1} 100%{transform:translateY(-30px) scale(1.1); opacity:0} }
        @keyframes sparkle-twinkle { 0%,100%{opacity:.3; transform:scale(.8) rotate(0)} 50%{opacity:1; transform:scale(1.2) rotate(180deg)} }
        @keyframes cloud-drift { 0%,100%{transform:translateX(0)} 50%{transform:translateX(4px)} }
        .heart-fx { position:absolute; animation: heart-float 2.4s ease-out infinite; }
        .sparkle-fx { animation: sparkle-twinkle 2.2s ease-in-out infinite; }
      `}</style>

      <div
        className="hidden md:flex fixed z-40 select-none items-end gap-2"
        style={{ top: 110, right: 24, pointerEvents: "none" }}
        aria-hidden="true"
      >
        {/* Soft cloud platform behind chibis */}
        <div
          className="absolute"
          style={{
            bottom: -10, right: 0, width: 230, height: 60,
            background: "radial-gradient(ellipse at center, rgba(255,255,255,.85), rgba(255,255,255,0) 70%)",
            animation: "cloud-drift 4s ease-in-out infinite",
          }}
        />

        {/* Floating sparkles */}
        <span className="sparkle-fx absolute" style={{ top: -6, right: 30, fontSize: 18 }}>✨</span>
        <span className="sparkle-fx absolute" style={{ top: 30, left: -10, fontSize: 14, animationDelay: ".6s" }}>⭐</span>
        <span className="sparkle-fx absolute" style={{ bottom: 20, right: -8, fontSize: 16, animationDelay: "1.1s" }}>💫</span>

        {/* Floating hearts */}
        <span className="heart-fx" style={{ left: 10, bottom: 40, fontSize: 14, color: "#FF6FA8" }}>💖</span>
        <span className="heart-fx" style={{ right: 14, bottom: 50, fontSize: 12, animationDelay: "1.2s" }}>💕</span>

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
