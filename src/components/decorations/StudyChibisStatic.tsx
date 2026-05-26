/**
 * @file StudyChibisStatic.tsx
 * @description Two studious chibis (boy & girl) pinned to fixed viewport positions.
 *              They stay put on scroll, never overlap text (kept to the screen edges,
 *              hidden below xl), and are purely decorative.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import chibiBoy from "@/assets/chibi-study-boy.png";
import chibiGirl from "@/assets/chibi-study-girl.png";

const StudyChibisStatic = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 z-0 hidden select-none 2xl:block">
    <img
      src={chibiBoy}
      alt=""
      width={110}
      height={110}
      loading="lazy"
      style={{
        position: "fixed",
        right: "150px",
        bottom: "20px",
        width: 110,
        height: 110,
        objectFit: "contain",
        filter:
          "drop-shadow(0 6px 14px rgba(59,130,246,0.35)) drop-shadow(0 3px 6px rgba(16,185,129,0.25))",
      }}
    />
    <img
      src={chibiGirl}
      alt=""
      width={110}
      height={110}
      loading="lazy"
      style={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
        width: 110,
        height: 110,
        objectFit: "contain",
        filter:
          "drop-shadow(0 6px 14px rgba(244,114,182,0.35)) drop-shadow(0 3px 6px rgba(16,185,129,0.25))",
      }}
    />
  </div>
);


export default StudyChibisStatic;
