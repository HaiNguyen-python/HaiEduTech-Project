/**
 * @file FloatingChibi.tsx
 * @description Decorative chibi mascot with gentle floating animation.
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
    style={{ width: size, height: size, transform: flip ? "scaleX(-1)" : undefined }}
    className={`pointer-events-none select-none drop-shadow-[0_8px_20px_rgba(59,130,246,0.25)] hidden md:block ${className}`}
  />
);

export default FloatingChibi;
