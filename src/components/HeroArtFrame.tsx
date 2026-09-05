/**
 * @file HeroArtFrame.tsx
 * @description Artistic wave backdrop that frames the home hero photo.
 * Layered hand-drawn style waves, slow drift, reduced-motion aware.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const HeroArtFrame = ({ children }: Props) => (
  <div className="relative">
    {/* Wave backdrop */}
    <div
      aria-hidden
      className="absolute -inset-x-5 -inset-y-6 overflow-hidden rounded-[2.5rem] bg-hero-wave shadow-hero-art sm:-inset-x-7 sm:-inset-y-8"
    >
      <svg
        className="absolute inset-x-0 top-0 h-16 w-full text-background/90 motion-safe:animate-hero-wave-slow"
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0 H400 V22 C330 44 270 6 200 24 C130 42 70 12 0 30 Z"
          fill="currentColor"
        />
      </svg>
      <svg
        className="absolute inset-x-0 bottom-0 h-16 w-full text-background/90 motion-safe:animate-hero-wave"
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
      >
        <path
          d="M0 60 H400 V32 C330 10 268 48 200 34 C132 20 66 52 0 34 Z"
          fill="currentColor"
        />
      </svg>
      <svg
        className="absolute inset-0 h-full w-full text-primary-foreground/25"
        viewBox="0 0 400 400"
        preserveAspectRatio="none"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
          <path d="M8 92 C90 66 150 108 236 84 C300 66 348 88 392 74" />
          <path d="M12 118 C96 96 168 130 250 106 C312 88 356 108 390 98" />
          <path d="M10 300 C92 322 156 286 240 308 C304 324 352 302 392 314" />
          <path d="M14 328 C104 350 170 314 252 334 C314 348 358 330 388 338" />
        </g>
      </svg>
    </div>

    <div className="relative">{children}</div>
  </div>
);

export default HeroArtFrame;
