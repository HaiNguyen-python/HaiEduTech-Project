/**
 * GenAISandbox - "Prompt -> Picture"
 * Students pick a subject, style and mood; the mock "AI" composes an emoji
 * scene + descriptive caption. Teaches the idea of prompt engineering for
 * generative models like Midjourney / DALL-E.
 */
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Wand2, Sparkles, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BonusGames } from "./SandboxBonusGames";
import { BestMatchPick } from "./SandboxMiniActivity";

const GEN_TF = [
  { q: "Generative AI creates new content that never existed before.", a: true },
  { q: "The vaguer a prompt is, the more beautiful the result.", a: false, why: "It's the opposite - a specific prompt (subject + style + mood) gives better results." },
  { q: "ChatGPT can make up facts that sound convincing - this is called hallucination.", a: true },
  { q: "Midjourney generates images from a text prompt.", a: true },
  { q: "Generative AI doesn't need any training data.", a: false, why: "It learns from BILLIONS of images and texts on the Internet." },
];
const GEN_PAIRS = [
  { a: "Prompt", b: "The instruction you give to AI" },
  { a: "Hallucination", b: "AI making up information that sounds real" },
  { a: "Seed", b: "A random number - changing it produces a different image" },
  { a: "Style", b: "A visual look: anime, 3D, watercolor..." },
];

const SUBJECTS = [
  { id: "cat", emoji: "🐱", label: "a cat" },
  { id: "astronaut", emoji: "🧑‍🚀", label: "an astronaut" },
  { id: "dragon", emoji: "🐉", label: "a dragon" },
  { id: "robot", emoji: "🤖", label: "a robot" },
  { id: "samurai", emoji: "🥷", label: "a ninja" },
];
const STYLES = [
  { id: "anime", emoji: "🎌", label: "anime style" },
  { id: "watercolor", emoji: "🎨", label: "watercolor painting" },
  { id: "pixel", emoji: "👾", label: "retro pixel art" },
  { id: "3d", emoji: "🧊", label: "Pixar-style 3D render" },
];
const MOODS = [
  { id: "neon", emoji: "🌃", label: "neon cyberpunk night" },
  { id: "forest", emoji: "🌲", label: "mysterious forest" },
  { id: "space", emoji: "🌌", label: "outer space" },
  { id: "beach", emoji: "🏖️", label: "sunset beach" },
];

const Pick = <T extends { id: string; emoji: string; label: string }>({
  list, value, onChange, color,
}: { list: T[]; value: string; onChange: (v: string) => void; color: string }) => (
  <div className="flex flex-wrap gap-1.5">
    {list.map((o) => (
      <button
        key={o.id}
        onClick={() => onChange(o.id)}
        className={`px-2.5 py-1 rounded-full text-xs font-bold border-2 transition active:scale-95 ${
          value === o.id
            ? `${color} text-white border-transparent shadow`
            : "bg-card text-foreground border-border hover:border-primary/40"
        }`}
      >
        <span className="mr-1">{o.emoji}</span>{o.label}
      </button>
    ))}
  </div>
);

const GenAISandbox = () => {
  const [subject, setSubject] = useState(SUBJECTS[0].id);
  const [style, setStyle] = useState(STYLES[0].id);
  const [mood, setMood] = useState(MOODS[0].id);
  const [seed, setSeed] = useState(0);

  const s = SUBJECTS.find((x) => x.id === subject)!;
  const st = STYLES.find((x) => x.id === style)!;
  const m = MOODS.find((x) => x.id === mood)!;

  const sparkles = useMemo(
    () => Array.from({ length: 14 }, () => ({
      l: Math.random() * 100, t: Math.random() * 100,
      d: 0.4 + Math.random() * 0.8, s: 0.6 + Math.random() * 0.8,
    })),
    [subject, style, mood, seed],
  );

  return (
    <div className="space-y-3 sm:space-y-4 [&>*+*]:pt-3 sm:[&>*+*]:pt-4 [&>*+*]:border-t [&>*+*]:border-border/40">
      <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden border-2 border-pink-400/40 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        {sparkles.map((sp, i) => (
          <motion.div
            key={`${seed}-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, sp.s, 0] }}
            transition={{ duration: 1.6, delay: sp.d, repeat: Infinity }}
            className="absolute text-yellow-200"
            style={{ left: `${sp.l}%`, top: `${sp.t}%` }}
          >✦</motion.div>
        ))}
        <motion.div
          key={`${subject}-${style}-${mood}-${seed}`}
          initial={{ scale: 0.4, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="absolute inset-0 flex items-center justify-center text-[120px] sm:text-[160px] drop-shadow-[0_0_25px_rgba(236,72,153,0.6)]"
        >
          {s.emoji}
        </motion.div>
        <div className="absolute bottom-2 left-2 right-2 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-black/50 backdrop-blur text-white text-xs font-mono">
            "{s.label}, {st.label}, {m.label}" ✨
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <div className="text-[11px] font-bold uppercase text-muted-foreground mb-1">1. Subject</div>
          <Pick list={SUBJECTS} value={subject} onChange={setSubject} color="bg-pink-500" />
        </div>
        <div>
          <div className="text-[11px] font-bold uppercase text-muted-foreground mb-1">2. Style</div>
          <Pick list={STYLES} value={style} onChange={setStyle} color="bg-purple-500" />
        </div>
        <div>
          <div className="text-[11px] font-bold uppercase text-muted-foreground mb-1">3. Setting</div>
          <Pick list={MOODS} value={mood} onChange={setMood} color="bg-indigo-500" />
        </div>
      </div>

      <Button
        onClick={() => setSeed((x) => x + 1)}
        className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white"
      >
        <Wand2 className="w-4 h-4 mr-1" /> Regenerate (re-roll)
      </Button>

      <p className="text-xs text-muted-foreground flex items-start gap-2">
        <Sparkles className="w-3.5 h-3.5 mt-0.5 text-pink-500 shrink-0" />
        <span>A prompt is like a recipe for AI. The more <b>specific</b> it is (subject + style + setting), the better the image. This skill is called <b>Prompt Engineering</b>, and AI engineers are paid well for it!</span>
      </p>

      <BestMatchPick
        title="🔮 Guess the prompt from the image"
        hint="Each 'AI image' below was generated from a prompt. Guess which prompt created it!"
        accent="from-pink-500 to-purple-600"
        border="border-pink-400/40"
        options={[
          { id: "cat-cyber", label: "cat · cyberpunk · neon" },
          { id: "astro-space", label: "astronaut · 3D · space" },
          { id: "dragon-water", label: "dragon · watercolor · forest" },
          { id: "robot-beach", label: "robot · pixel · sunset beach" },
        ]}
        items={[
          { prompt: "🐱🌃 (a glowing cat in a neon-lit city)", correctId: "cat-cyber" },
          { prompt: "🧑‍🚀🌌 (a 3D astronaut among the stars)", correctId: "astro-space" },
          { prompt: "🐉🌲 (a watercolor dragon in a mysterious forest)", correctId: "dragon-water" },
          { prompt: "🤖🏖️ (an 8-bit robot on an orange sunset beach)", correctId: "robot-beach" },
        ]}
      />

      <BonusGames tfItems={GEN_TF} matchPairs={GEN_PAIRS} accent="from-pink-500 to-purple-600" border="border-pink-400/40" />
    </div>
  );
};

export default GenAISandbox;
