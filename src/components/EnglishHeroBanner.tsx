/**
 * @file EnglishHeroBanner.tsx
 * @description Watercolor English/UK-themed hero banner used across all learn-English pages.
 * Renders as a soft full-width image strip behind the page hero/title. Pointer-events disabled.
 * @copyright 2026 HaiEduTech.
 */
import englishHero from "@/assets/english-hero.jpg";

interface Props {
  /** Banner height (Tailwind class). */
  heightClass?: string;
  /** Opacity 0-100 for the image (default 35). */
  opacity?: number;
  className?: string;
}

const EnglishHeroBanner = ({ heightClass = "h-48 md:h-64", opacity = 35, className = "" }: Props) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-0 ${heightClass} overflow-hidden ${className}`}
    >
      <img
        src={englishHero}
        alt=""
        width={1920}
        height={640}
        loading="lazy"
        className="w-full h-full object-cover"
        style={{ opacity: opacity / 100 }}
      />
      {/* fade to background so content stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
    </div>
  );
};

export default EnglishHeroBanner;
