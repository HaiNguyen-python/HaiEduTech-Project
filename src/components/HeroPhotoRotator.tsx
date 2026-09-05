/**
 * @file HeroPhotoRotator.tsx
 * @description Cross-fading photo rotator used inside the home hero frame.
 * Cycles photos every 8s, pauses on hover, respects reduced motion.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface HeroPhoto {
  src: string;
  alt: string;
}

interface Props {
  photos: HeroPhoto[];
  intervalMs?: number;
}

const HeroPhotoRotator = ({ photos, intervalMs = 8000 }: Props) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (paused || reduced || photos.length < 2) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % photos.length), intervalMs);
    return () => clearTimeout(id);
  }, [index, paused, reduced, photos.length, intervalMs, tick]);

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.img
          key={index}
          src={photos[index].src}
          alt={photos[index].alt}
          width="720"
          height="720"
          {...(index === 0 ? ({ fetchpriority: "high" } as any) : { loading: "lazy" as const })}
          decoding="async"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.9, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {photos.length > 1 && (
        <div className="absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-2 rounded-full bg-foreground/25 py-1.5 backdrop-blur-sm mx-auto w-fit px-3">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              aria-label={`Photo ${i + 1}`}
              aria-current={i === index}
              onClick={() => {
                setIndex(i);
                setTick((t) => t + 1);
              }}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-primary-foreground" : "w-2 bg-primary-foreground/50 hover:bg-primary-foreground/80"
              }`}

            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroPhotoRotator;
