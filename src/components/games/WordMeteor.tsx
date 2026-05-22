/**
 * WordMeteor — reusable falling-words reaction mini-game.
 * Reads bank from src/data/wordMeteorBanks.ts based on `lang` prop.
 * Used inside each language's Arcade Hub (English / Chinese / Vietnamese / Finnish).
 */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Zap, Sparkles, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { METEOR_BANKS, METEOR_LANG_THEME, type MeteorLang, type MeteorItem } from "@/data/wordMeteorBanks";

interface Meteor {
  id: number;
  word: string;
  meaning: string;
  x: number;
  y: number;
  speed: number;
  options: string[];
}

interface Props {
  lang: MeteorLang;
  onExit?: () => void;
  onScore?: (delta: number) => void;
}

export default function WordMeteor({ lang, onExit, onScore }: Props) {
  const bank: MeteorItem[] = METEOR_BANKS[lang];
  const theme = METEOR_LANG_THEME[lang];

  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [running, setRunning] = useState(false);
  const tickRef = useRef<number>();
  const idRef = useRef(0);

  const spawn = () => {
    const item = bank[Math.floor(Math.random() * bank.length)];
    const distractors = bank
      .filter((b) => b.meaning !== item.meaning)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map((d) => d.meaning);
    const options = [...distractors, item.meaning].sort(() => Math.random() - 0.5);
    setMeteors((prev) => [
      ...prev,
      { id: ++idRef.current, word: item.word, meaning: item.meaning, x: Math.random() * 80 + 5, y: 0, speed: 0.55 + Math.random() * 0.55, options },
    ]);
  };

  useEffect(() => {
    if (!running) return;
    const spawnInt = setInterval(spawn, 2400);
    tickRef.current = window.setInterval(() => {
      setMeteors((prev) => {
        const updated = prev.map((m) => ({ ...m, y: m.y + m.speed }));
        const escaped = updated.filter((m) => m.y >= 95);
        if (escaped.length > 0) {
          setLives((l) => Math.max(0, l - escaped.length));
          setStreak(0);
        }
        return updated.filter((m) => m.y < 95);
      });
    }, 60);
    return () => {
      clearInterval(spawnInt);
      if (tickRef.current) clearInterval(tickRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, lang]);

  useEffect(() => {
    if (lives <= 0) setRunning(false);
  }, [lives]);

  const handlePick = (m: Meteor, picked: string) => {
    if (picked === m.meaning) {
      const delta = 10 + streak * 2;
      setScore((s) => s + delta);
      setStreak((s) => s + 1);
      setMeteors((prev) => prev.filter((x) => x.id !== m.id));
      onScore?.(delta);
    } else {
      setStreak(0);
      setLives((l) => Math.max(0, l - 1));
    }
  };

  const reset = () => {
    setMeteors([]); setScore(0); setLives(3); setStreak(0); setRunning(true); idRef.current = 0;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card/60 p-3">
        <div className="flex items-center gap-2 text-sm">
          {onExit && (
            <Button variant="ghost" size="sm" onClick={onExit}><ArrowLeft className="w-4 h-4 mr-1" /> Menu</Button>
          )}
          <Badge variant="outline" className="text-base"><Trophy className="mr-1 h-4 w-4" /> {score}</Badge>
          <Badge variant="outline" className="text-base"><Zap className="mr-1 h-4 w-4" /> {streak}</Badge>
          <Badge variant="outline" className="text-base">❤️ {lives}</Badge>
        </div>
        <Button onClick={reset} size="sm" className={`bg-gradient-to-r ${theme.accent} text-white`}>
          {running ? "Restart" : "Start"}
        </Button>
      </div>

      <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="absolute h-0.5 w-0.5 animate-pulse rounded-full bg-white/70"
            style={{ left: `${(i * 53) % 100}%`, top: `${(i * 31) % 100}%`, animationDelay: `${i * 80}ms` }} />
        ))}

        <AnimatePresence>
          {meteors.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.4 }}
              className="absolute -translate-x-1/2"
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
            >
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-orange-500/30 blur-xl" />
                <div className="relative rounded-xl border border-orange-300/40 bg-gradient-to-br from-orange-500 to-red-600 px-3 py-1.5 text-sm font-bold text-white shadow-lg">
                  ☄️ {m.word}
                </div>
                <div className="mt-1 flex flex-wrap justify-center gap-1">
                  {m.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handlePick(m, opt)}
                      className="rounded-md border border-white/30 bg-white/10 px-2 py-0.5 text-xs text-white backdrop-blur hover:bg-white/25"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {!running && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 text-center text-white">
            <Sparkles className="h-10 w-10 text-amber-300" />
            <h3 className="text-xl font-bold">
              {lives <= 0 ? "Game Over" : `${theme.emoji} Word Meteor — ${theme.label}`}
            </h3>
            <p className="max-w-sm text-sm text-white/80">
              Pick the correct meaning before the meteor hits the ground. Chain answers for bonus points!
            </p>
            <Button onClick={reset} className={`bg-gradient-to-r ${theme.accent} text-white`}>
              {lives <= 0 ? "Play Again" : "Start"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
