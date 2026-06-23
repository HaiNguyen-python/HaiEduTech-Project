/**
 * @file SwedishHeroBanner.tsx
 * @description Reusable Swedish landscape hero banner for all /swedish/* pages.
 *              Rotates through 4 cinematic Swedish landscapes (Stockholm,
 *              countryside, Lapland aurora, archipelago) chosen by `variant`
 *              or hashed from a stable key. Overlay keeps text readable.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import heroStockholm from "@/assets/swedish/hero-stockholm.jpg";
import heroCountryside from "@/assets/swedish/hero-countryside.jpg";
import heroLapland from "@/assets/swedish/hero-lapland.jpg";
import heroArchipelago from "@/assets/swedish/hero-archipelago.jpg";

export type SwedishHeroVariant = "stockholm" | "countryside" | "lapland" | "archipelago";

const IMAGES: Record<SwedishHeroVariant, string> = {
  stockholm: heroStockholm,
  countryside: heroCountryside,
  lapland: heroLapland,
  archipelago: heroArchipelago,
};

const ORDER: SwedishHeroVariant[] = ["stockholm", "countryside", "lapland", "archipelago"];

interface Props {
  variant?: SwedishHeroVariant;
  /** Stable key (e.g. page slug) - used to pick a variant if `variant` is omitted. */
  pickKey?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Reduce height for sub-pages. */
  compact?: boolean;
  /** Eager-load the image (LCP). True only on the main /swedish landing if needed. */
  eager?: boolean;
}

function pick(key?: string): SwedishHeroVariant {
  if (!key) return "stockholm";
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  return ORDER[Math.abs(h) % ORDER.length];
}

export const SwedishHeroBanner = ({
  variant,
  pickKey,
  title,
  subtitle,
  compact = false,
  eager = false,
}: Props) => {
  const v = variant ?? pick(pickKey);
  const src = IMAGES[v];
  return (
    <div
      className={`relative isolate w-full overflow-hidden ${
        compact ? "h-44 sm:h-56 md:h-64" : "h-56 sm:h-72 md:h-80 lg:h-96"
      }`}
    >
      <img
        src={src}
        alt="Swedish landscape"
        width={1920}
        height={768}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background" />
      {(title || subtitle) && (
        <div className="absolute inset-0 flex flex-col items-center justify-end px-4 pb-6 text-center sm:pb-8">
          {title && (
            <h1 className="font-display text-2xl font-bold drop-shadow-lg sm:text-3xl md:text-4xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-foreground/85 drop-shadow sm:text-sm md:text-base">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SwedishHeroBanner;
