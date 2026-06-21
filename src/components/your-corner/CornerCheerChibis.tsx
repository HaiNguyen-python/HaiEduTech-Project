/**
 * @file CornerCheerChibis.tsx
 * @description Decorative chibis pinned to viewport corners on Your Corner page
 *              to give learners a cheerful, encouraging vibe. Purely visual.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import cheer from "@/assets/chibi-vocab-cheer.png";
import owl from "@/assets/chibi-owl.png";
import rocket from "@/assets/chibi-rocket.png";
import boy from "@/assets/chibi-study-boy.png";
import girl from "@/assets/chibi-study-girl.png";

interface Item {
  src: string;
  alt: string;
  style: React.CSSProperties;
  size: number;
  bubble?: string;
  flip?: boolean;
}

const ITEMS: Item[] = [
  // top-left – owl mentor
  { src: owl, alt: "", size: 96, style: { top: 96, left: 12 }, bubble: "Bạn giỏi lắm! 🌟" },
  // top-right – rocket cheer (avoid under navbar buttons on desktop only)
  { src: rocket, alt: "", size: 90, style: { top: 110, right: 12 }, bubble: "Tới đỉnh nào! 🚀", flip: true },
  // mid-left – study boy
  { src: boy, alt: "", size: 100, style: { top: "45%", left: 8 }, bubble: "Học chăm nhé! 📚" },
  // mid-right – study girl
  { src: girl, alt: "", size: 100, style: { top: "55%", right: 8 }, bubble: "Cố lên! 💪", flip: true },
  // bottom-left – cheer
  { src: cheer, alt: "", size: 110, style: { bottom: 24, left: 14 }, bubble: "Tuyệt vời! 🎉" },
];

/**
 * Hidden under xl (1280px) to avoid covering content on smaller screens.
 * Static (no idle animation) so the page feels calm.
 */
export default function CornerCheerChibis() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 hidden select-none xl:block">
      {ITEMS.map((it, i) => (
        <div key={i} className="absolute" style={it.style}>
          <img
            src={it.src}
            alt={it.alt}
            width={it.size}
            height={it.size}
            loading="lazy"
            style={{
              width: it.size,
              height: it.size,
              objectFit: "contain",
              transform: it.flip ? "scaleX(-1)" : undefined,
              filter:
                "drop-shadow(0 6px 14px rgba(59,130,246,0.30)) drop-shadow(0 3px 6px rgba(16,185,129,0.22))",
            }}
          />
          {it.bubble && (
            <div
              className="absolute left-1/2 -translate-x-1/2 -top-7 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow"
              style={{
                background: "linear-gradient(135deg,#FFF7CC,#FFE0A8)",
                color: "#7c4a00",
                border: "1.5px solid #FFB347",
              }}
            >
              {it.bubble}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
