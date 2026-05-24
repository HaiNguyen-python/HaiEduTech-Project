// Floating balloons background — kid-friendly ambient animation.
import { motion } from "framer-motion";
import { useMemo } from "react";

const COLORS = [
  "#FF8FA3", "#FFB385", "#FFE08A", "#A7E5A0",
  "#7FD1F2", "#B8A4F0", "#FF9ECF", "#86E3CE",
];

interface FloatingBalloonsProps {
  count?: number;
}

const FloatingBalloons = ({ count = 14 }: FloatingBalloonsProps) => {
  const balloons = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        color: COLORS[i % COLORS.length],
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 14 + Math.random() * 10,
        size: 28 + Math.random() * 28,
        drift: (Math.random() - 0.5) * 60,
      })),
    [count],
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      aria-hidden="true"
    >
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: "110vh", x: 0, opacity: 0 }}
          animate={{ y: "-20vh", x: b.drift, opacity: [0, 0.75, 0.75, 0] }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ left: `${b.left}%`, width: b.size, height: b.size * 1.2 }}
          className="absolute"
        >
          {/* balloon body */}
          <div
            className="w-full rounded-full shadow-md"
            style={{
              height: "85%",
              background: `radial-gradient(circle at 30% 30%, #fff8, ${b.color})`,
            }}
          />
          {/* knot */}
          <div
            className="mx-auto"
            style={{
              width: 4,
              height: 4,
              background: b.color,
              transform: "translateY(-1px)",
            }}
          />
          {/* string */}
          <div
            className="mx-auto bg-slate-400/40"
            style={{ width: 1, height: 18 }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingBalloons;
