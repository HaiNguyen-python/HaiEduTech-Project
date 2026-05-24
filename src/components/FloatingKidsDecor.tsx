import { motion } from "framer-motion";

/**
 * FloatingKidsDecor - Cheerful floating balloons, chibi figures, and kid-friendly
 * decorations for child-oriented sections (Cambridge Starters → PET).
 * Pointer-events disabled so it never blocks interactions.
 */

const BALLOONS = [
  { left: "5%", color: "#FF6B9D", delay: 0, duration: 14, size: 56 },
  { left: "18%", color: "#FFD93D", delay: 2, duration: 16, size: 44 },
  { left: "32%", color: "#6BCB77", delay: 4, duration: 13, size: 60 },
  { left: "48%", color: "#4D96FF", delay: 1, duration: 17, size: 50 },
  { left: "63%", color: "#FF9F1C", delay: 5, duration: 15, size: 54 },
  { left: "78%", color: "#C780FA", delay: 3, duration: 12, size: 46 },
  { left: "90%", color: "#FF6B6B", delay: 6, duration: 18, size: 58 },
];

const CHIBIS = [
  { emoji: "🧒", left: "8%", top: "20%", delay: 0 },
  { emoji: "👧", left: "85%", top: "15%", delay: 1.5 },
  { emoji: "🦄", left: "70%", top: "60%", delay: 2 },
  { emoji: "🐻", left: "15%", top: "70%", delay: 0.8 },
  { emoji: "🌈", left: "45%", top: "10%", delay: 1.2 },
  { emoji: "⭐", left: "55%", top: "75%", delay: 2.5 },
  { emoji: "🎈", left: "92%", top: "50%", delay: 0.3 },
  { emoji: "🦊", left: "3%", top: "45%", delay: 1.8 },
  { emoji: "🦋", left: "25%", top: "35%", delay: 1.1 },
  { emoji: "🦋", left: "78%", top: "30%", delay: 2.2 },
  { emoji: "💖", left: "38%", top: "55%", delay: 0.6 },
  { emoji: "🎵", left: "62%", top: "25%", delay: 1.9 },
  { emoji: "🎶", left: "20%", top: "85%", delay: 2.8 },
  { emoji: "✈️", left: "5%", top: "8%", delay: 0.4 },
  { emoji: "🍭", left: "88%", top: "80%", delay: 1.3 },
  { emoji: "🐢", left: "50%", top: "92%", delay: 2.1 },
  { emoji: "🐳", left: "30%", top: "12%", delay: 0.9 },
  { emoji: "🪁", left: "65%", top: "8%", delay: 1.6 },
  { emoji: "🌟", left: "10%", top: "55%", delay: 2.4 },
  { emoji: "🧸", left: "75%", top: "88%", delay: 0.7 },
];

const Balloon = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 40 56" fill="none">
    <ellipse cx="20" cy="22" rx="16" ry="20" fill={color} opacity="0.92" />
    <ellipse cx="14" cy="14" rx="4" ry="6" fill="white" opacity="0.45" />
    <path d="M20 42 L18 46 L22 46 Z" fill={color} />
    <path d="M20 46 Q22 50 19 53 Q17 55 20 56" stroke="#94A3B8" strokeWidth="0.8" fill="none" />
  </svg>
);

const FloatingKidsDecor = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {/* Floating balloons rising up */}
      {BALLOONS.map((b, i) => (
        <motion.div
          key={`balloon-${i}`}
          className="absolute"
          style={{ left: b.left, bottom: "-80px" }}
          animate={{
            y: ["0vh", "-120vh"],
            x: [0, 20, -15, 10, 0],
            rotate: [-3, 3, -2, 4, -3],
          }}
          transition={{
            y: { duration: b.duration, delay: b.delay, repeat: Infinity, ease: "linear" },
            x: { duration: b.duration / 2, delay: b.delay, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 4, delay: b.delay, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Balloon color={b.color} size={b.size} />
        </motion.div>
      ))}

      {/* Chibi/kid emoji decorations - gentle bobbing */}
      {CHIBIS.map((c, i) => (
        <motion.div
          key={`chibi-${i}`}
          className="absolute select-none"
          style={{ left: c.left, top: c.top, fontSize: "44px", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" }}
          animate={{
            y: [0, -14, 0, 8, 0],
            rotate: [-6, 6, -4, 5, -6],
            scale: [1, 1.08, 1, 0.95, 1],
          }}
          transition={{
            duration: 5 + i * 0.4,
            delay: c.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {c.emoji}
        </motion.div>
      ))}

      {/* Sparkles confetti dots */}
      {Array.from({ length: 24 }).map((_, i) => {
        const colors = ["#FF6B9D", "#FFD93D", "#6BCB77", "#4D96FF", "#FF9F1C", "#C780FA"];
        const color = colors[i % colors.length];
        const left = `${(i * 7 + 3) % 100}%`;
        const top = `${(i * 13 + 5) % 90}%`;
        return (
          <motion.div
            key={`dot-${i}`}
            className="absolute rounded-full"
            style={{ left, top, width: 8, height: 8, background: color, opacity: 0.7 }}
            animate={{
              scale: [0, 1.2, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        );
      })}
    </div>
  );
};

export default FloatingKidsDecor;
