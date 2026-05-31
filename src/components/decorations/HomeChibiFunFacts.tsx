/**
 * @file HomeChibiFunFacts.tsx
 * @description Decorative chibis on the home page. Fun-fact bubbles were moved
 *              to the floating AI chatbot - chibis here are purely visual.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import chibiTeacher from "@/assets/chibi-teacher.png";

const CHIBIS = [chibiTeacher];

interface Spot {
  src: string;
  side: "left" | "right";
  top: string;
  offset: string;
  size: number;
}

const HomeChibiFunFacts = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const spots = useMemo<Spot[]>(() => {
    return [
      { src: CHIBIS[0], side: "left", top: "clamp(5.5rem, 8vw, 7rem)", offset: "clamp(0.75rem, 2vw, 2rem)", size: 94 },
    ];
  }, []);

  if (!mounted) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 hidden h-[48rem] select-none lg:block">
      {spots.map((s, i) => (
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
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default HomeChibiFunFacts;
