/**
 * FloatingAIIcons - full-page ambient layer of drifting AI/robot icons
 * for the AI Academy hub. Pointer-events disabled, sits behind content.
 */
import { motion } from "framer-motion";
import {
  Bot, Cpu, Brain, Sparkles, Zap, Binary, Network, CircuitBoard,
  Atom, Radio, Code2, Database, Wand2, Rocket,
} from "lucide-react";
import { useMemo } from "react";

type Item = {
  kind: "icon" | "emoji";
  Comp?: typeof Bot;
  emoji?: string;
  top: number;
  left: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  drift: number;
};

const ICONS = [Bot, Cpu, Brain, Sparkles, Zap, Binary, Network, CircuitBoard, Atom, Radio, Code2, Database, Wand2, Rocket];
const EMOJIS = ["🤖", "🧠", "⚡", "✨", "🚀", "🔮", "🛸", "💡"];
const COLORS = ["text-cyan-400", "text-fuchsia-400", "text-purple-400", "text-emerald-400", "text-sky-400", "text-pink-400"];

// Deterministic pseudo-random so SSR/CSR stay stable
const seed = (i: number) => {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

const FloatingAIIcons = () => {
  // Respect user preference for reduced motion (also skips heavy animation on low-power devices via CSS)
  const items = useMemo<Item[]>(() => {
    const out: Item[] = [];
    // Reduced from 22 -> 10 to prevent jank on the AI Academy hub
    for (let i = 0; i < 10; i++) {
      const isEmoji = seed(i + 1) > 0.55;
      out.push({
        kind: isEmoji ? "emoji" : "icon",
        Comp: isEmoji ? undefined : ICONS[Math.floor(seed(i + 2) * ICONS.length)],
        emoji: isEmoji ? EMOJIS[Math.floor(seed(i + 3) * EMOJIS.length)] : undefined,
        top: seed(i + 4) * 92,
        left: seed(i + 5) * 92,
        size: 22 + Math.floor(seed(i + 6) * 22),
        color: COLORS[Math.floor(seed(i + 7) * COLORS.length)],
        duration: 12 + seed(i + 8) * 10,
        delay: seed(i + 9) * 6,
        drift: 10 + seed(i + 10) * 14,
      });
    }
    return out;
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden hidden md:block motion-reduce:hidden"
    >
      {items.map((it, i) => (
        <motion.div
          key={i}
          className={`absolute ${it.color} opacity-[0.16] will-change-transform`}
          style={{ top: `${it.top}%`, left: `${it.left}%`, fontSize: it.size }}
          animate={{
            y: [0, -it.drift, 0, it.drift, 0],
            x: [0, it.drift / 2, 0, -it.drift / 2, 0],
          }}
          transition={{
            duration: it.duration,
            delay: it.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {it.kind === "icon" && it.Comp ? (
            <it.Comp size={it.size} strokeWidth={1.6} />
          ) : (
            <span style={{ fontSize: it.size }}>{it.emoji}</span>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingAIIcons;
