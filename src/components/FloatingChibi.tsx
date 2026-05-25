/**
 * @file FloatingChibi.tsx
 * @description Decorative chibi mascot with gentle floating + interactive hover animation.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { motion } from "framer-motion";

interface FloatingChibiProps {
  src: string;
  alt: string;
  className?: string;
  size?: number;
  delay?: number;
  flip?: boolean;
}

const FloatingChibi = ({ src, alt, className = "", size = 110, delay = 0, flip = false }: FloatingChibiProps) => (
  <motion.img
    src={src}
    alt={alt}
    loading="lazy"
    width={size}
    height={size}
    aria-hidden="true"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    animate={{ y: [0, -10, 0] }}
    transition={{
      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
      opacity: { duration: 0.6 },
    }}
    whileHover={{
      scale: 1.18,
      rotate: flip ? [0, 8, -8, 6, 0] : [0, -8, 8, -6, 0],
      transition: { duration: 0.7, ease: "easeInOut" },
    }}
    style={{ width: size, height: size, transform: flip ? "scaleX(-1)" : undefined, transformOrigin: "center bottom" }}
    className={`pointer-events-auto hidden cursor-pointer select-none drop-shadow-[0_8px_24px_hsl(var(--primary)/0.25)] xl:block ${className}`}
  />
);

export default FloatingChibi;
