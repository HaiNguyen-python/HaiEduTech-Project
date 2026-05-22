/**
 * WordMeteor — reusable falling-words mini-game.
 *
 * Improvements (May 2026):
 *  - Accepts an optional `customBank` (e.g. Cambridge YLE level pool) so each
 *    arcade can feed its own level-appropriate vocabulary.
 *  - Larger play area + larger answer buttons for easier clicking.
 *  - Progressive difficulty: meteors start SLOW and speed up as score climbs.
 *  - No-repeat queue: cycles through a shuffled bank before re-using words.
 *  - Submits score to `game_scores` + shows live leaderboard.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Zap, Sparkles, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  METEOR_BANKS,
  METEOR_LANG_THEME,
  type MeteorLang,
  type MeteorItem,
} from "@/data/wordMeteorBanks";
import { submitGameScore } from "@/lib/submitGameScore";
import GameLeaderboard from "./GameLeaderboard";

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
  /** Override the default language bank with a curated word list. */
  customBank?: MeteorItem[];
  /** Custom game_type key for the leaderboard (defaults to meteor_<lang>). */
  gameType?: string;
  /** Difficulty label persisted to game_scores. */
  difficulty?: string;
  onExit?: () => void;
  onScore?: (delta: number) => void;
}

export default function WordMeteor({
  lang,
  customBank,
  gameType,
  difficulty = "normal",
  onExit,
  onScore,
}: Props) {
  const fullBank: MeteorItem[] = useMemo(() => {
    const src = customBank && customBank.length >= 4 ? customBank : METEOR_BANKS[lang];
    // de-dup by meaning to avoid trivial repeats
    const seen = new Set<string>();
    return src.filter((it) => {
      if (seen.has(it.meaning)) return false;
      seen.add(it.meaning);
      return true;
    });
  }, [customBank, lang]);

  const theme = METEOR_LANG_THEME[lang];
  const resolvedGameType = gameType ?? `meteor_${lang}`;

  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [running, setRunning] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  const queueRef = useRef<MeteorItem[]>([]);
  const recentRef = useRef<string[]>([]); // last few meanings on screen to avoid simultaneous repeats
  const tickRef = useRef<number>();
  const spawnTimerRef = useRef<number>();
  const idRef = useRef(0);
  const scoreRef = useRef(0);
  useEffect(() => { scoreRef.current = score; }, [score]);

  // Refill shuffled queue when empty so each word appears once before repeating
  const drawNext = (): MeteorItem => {
    if (queueRef.current.length === 0) {
      queueRef.current = [...fullBank].sort(() => Math.random() - 0.5);
    }
    // avoid spawning a meaning already on screen / very recent
    let idx = queueRef.current.findIndex((it) => !recentRef.current.includes(it.meaning));
    if (idx === -1) idx = 0;
    const item = queueRef.current.splice(idx, 1)[0];
    recentRef.current = [...recentRef.current, item.meaning].slice(-6);
    return item;
  };

  const spawn = () => {
    if (fullBank.length < 4) return;
    const item = drawNext();
    const distractors = fullBank
      .filter((b) => b.meaning !== item.meaning)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map((d) => d.meaning);
    const options = [...distractors, item.meaning].sort(() => Math.random() - 0.5);
    // Progressive speed: starts very slow, ramps up gently with score
    const s = scoreRef.current;
    const base = 0.10 + Math.min(0.25, s / 600); // 0.10 → ~0.35 (much slower)
    const jitter = Math.random() * 0.08;
    setMeteors((prev) => [
      ...prev,
      {
        id: ++idRef.current,
        word: item.word,
        meaning: item.meaning,
        x: Math.random() * 78 + 6,
        y: 0,
        speed: base + jitter,
        options,
      },
    ]);
  };

  useEffect(() => {
    if (!running) return;
    setScoreSubmitted(false);
    const scheduleSpawn = () => {
      const s = scoreRef.current;
      const interval = Math.max(2200, 4200 - s * 6); // 4.2s → 2.2s — bigger gaps
      spawnTimerRef.current = window.setTimeout(() => {
        spawn();
        scheduleSpawn();
      }, interval);
    };
    scheduleSpawn();

    tickRef.current = window.setInterval(() => {
      setMeteors((prev) => {
        const updated = prev.map((m) => ({ ...m, y: m.y + m.speed }));
        const escaped = updated.filter((m) => m.y >= 92);
        if (escaped.length > 0) {
          setLives((l) => Math.max(0, l - escaped.length));
          setStreak(0);
          // free recent slot when a meteor escapes
          recentRef.current = recentRef.current.filter(
            (mng) => !escaped.some((e) => e.meaning === mng),
          );
        }
        return updated.filter((m) => m.y < 92);
      });
    }, 70);

    return () => {
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
      if (tickRef.current) clearInterval(tickRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  // Game over → submit score once
  useEffect(() => {
    if (lives <= 0 && running) {
      setRunning(false);
    }
  }, [lives, running]);

  useEffect(() => {
    if (!running && lives <= 0 && score > 0 && !scoreSubmitted) {
      setScoreSubmitted(true);
      submitGameScore({
        gameType: resolvedGameType,
        score,
        maxStreak,
        difficulty,
      });
    }
  }, [running, lives, score, maxStreak, scoreSubmitted, resolvedGameType, difficulty]);

  const handlePick = (m: Meteor, picked: string) => {
    if (picked === m.meaning) {
      const delta = 10 + streak * 2;
      setScore((s) => s + delta);
      setStreak((s) => {
        const ns = s + 1;
        setMaxStreak((mx) => Math.max(mx, ns));
        return ns;
      });
      setMeteors((prev) => prev.filter((x) => x.id !== m.id));
      recentRef.current = recentRef.current.filter((mng) => mng !== m.meaning);
      onScore?.(delta);
    } else {
      setStreak(0);
      setLives((l) => Math.max(0, l - 1));
    }
  };

  const reset = () => {
    setMeteors([]);
    setScore(0);
    setLives(3);
    setStreak(0);
    setMaxStreak(0);
    setRunning(true);
    setScoreSubmitted(false);
    idRef.current = 0;
    queueRef.current = [];
    recentRef.current = [];
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card/60 p-3">
          <div className="flex items-center gap-2 text-sm">
            {onExit && (
              <Button variant="ghost" size="sm" onClick={onExit}>
                <ArrowLeft className="w-4 h-4 mr-1" /> Menu
              </Button>
            )}
            <Badge variant="outline" className="text-base">
              <Trophy className="mr-1 h-4 w-4" /> {score}
            </Badge>
            <Badge variant="outline" className="text-base">
              <Zap className="mr-1 h-4 w-4" /> {streak}
            </Badge>
            <Badge variant="outline" className="text-base">❤️ {lives}</Badge>
          </div>
          <Button onClick={reset} size="sm" className={`bg-gradient-to-r ${theme.accent} text-white`}>
            {running ? "Restart" : "Start"}
          </Button>
        </div>

        <div className="relative h-[560px] w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 w-0.5 animate-pulse rounded-full bg-white/70"
              style={{
                left: `${(i * 53) % 100}%`,
                top: `${(i * 31) % 100}%`,
                animationDelay: `${i * 80}ms`,
              }}
            />
          ))}

          <AnimatePresence>
            {meteors.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.4 }}
                className="absolute -translate-x-1/2"
                style={{ left: `${m.x}%`, top: `${m.y}%`, maxWidth: "min(92vw, 460px)" }}
              >
                <div className="relative">
                  <div className="absolute -inset-3 rounded-full bg-orange-500/30 blur-xl" />
                  <div className="relative mx-auto w-fit rounded-xl border border-orange-300/40 bg-gradient-to-br from-orange-500 to-red-600 px-4 py-2 text-base font-bold text-white shadow-lg">
                    ☄️ {m.word}
                  </div>
                  <div className="mt-2 flex flex-wrap justify-center gap-2">
                    {m.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handlePick(m, opt)}
                        className="rounded-lg border border-white/40 bg-white/15 px-3 py-2 text-sm font-semibold text-white backdrop-blur transition hover:scale-105 hover:bg-white/30 active:scale-95"
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
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/70 text-center text-white p-4">
              <Sparkles className="h-10 w-10 text-amber-300" />
              <h3 className="text-2xl font-bold">
                {lives <= 0 ? `Game Over — ${score} pts` : `${theme.emoji} Word Meteor — ${theme.label}`}
              </h3>
              <p className="max-w-sm text-sm text-white/80">
                Pick the correct meaning before the meteor lands. Meteors start slow and speed up — chain answers for bonus points!
              </p>
              <Button onClick={reset} className={`bg-gradient-to-r ${theme.accent} text-white`}>
                {lives <= 0 ? "Play Again" : "Start"}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Leaderboard sidebar */}
      <aside className="rounded-2xl border border-border bg-card/60 p-3">
        <GameLeaderboard gameType={resolvedGameType} currentScore={score} />
      </aside>
    </div>
  );
}
