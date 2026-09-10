/**
 * WordMeteor - reusable falling-words mini-game.
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
import { finishGame } from "@/lib/gameSession";
import GameLeaderboard from "./GameLeaderboard";

/** Vocabulary subject each meteor language feeds in the memory brain. */
const SUBJECT_BY_LANG: Record<MeteorLang, string> = {
  en: "ielts",
  zh: "hsk",
  vi: "vietnamese",
  fi: "finnish-vocab",
};

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
  const [rocketX, setRocketX] = useState(50); // 0-100 horizontal % of play area
  const [laserAt, setLaserAt] = useState<{ x: number; y: number; id: number } | null>(null);
  const keysRef = useRef({ left: false, right: false });

  const queueRef = useRef<MeteorItem[]>([]);
  const recentRef = useRef<string[]>([]); // last few meanings on screen to avoid simultaneous repeats
  const tickRef = useRef<number>();
  const spawnTimerRef = useRef<number>();
  const idRef = useRef(0);
  const scoreRef = useRef(0);
  const correctWordsRef = useRef<string[]>([]);
  useEffect(() => { scoreRef.current = score; }, [score]);

  // Keyboard rocket movement
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") keysRef.current.left = true;
      if (e.key === "ArrowRight" || e.key === "d") keysRef.current.right = true;
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") keysRef.current.left = false;
      if (e.key === "ArrowRight" || e.key === "d") keysRef.current.right = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setRocketX((x) => {
        let nx = x;
        if (keysRef.current.left) nx -= 1.8;
        if (keysRef.current.right) nx += 1.8;
        return Math.max(5, Math.min(95, nx));
      });
    }, 30);
    return () => clearInterval(id);
  }, [running]);

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
    setMeteors((prev) => {
      // Never crowd the sky: max 3 meteors and always a clear vertical gap so
      // the answer buttons of two meteors can never overlap each other.
      if (prev.length >= 3 || prev.some((m) => m.y < 30)) {
        queueRef.current = [item, ...queueRef.current];
        recentRef.current = recentRef.current.filter((mng) => mng !== item.meaning);
        return prev;
      }
      return [
        ...prev,
        {
          id: ++idRef.current,
          word: item.word,
          meaning: item.meaning,
          // 36%-64% keeps the whole answer panel inside the play area
          x: Math.random() * 28 + 36,
          y: 0,
          speed: base + jitter,
          options,
        },
      ];
    });
  };

  useEffect(() => {
    if (!running) return;
    setScoreSubmitted(false);
    const scheduleSpawn = () => {
      const s = scoreRef.current;
      const interval = Math.max(2200, 4200 - s * 6); // 4.2s → 2.2s - bigger gaps
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
      finishGame({
        gameType: resolvedGameType,
        score,
        maxStreak,
        difficulty,
        subject: SUBJECT_BY_LANG[lang],
        correctWords: correctWordsRef.current,
      });
    }
  }, [running, lives, score, maxStreak, scoreSubmitted, resolvedGameType, difficulty, lang]);

  const handlePick = (m: Meteor, picked: string) => {
    // Rocket slides under the meteor and "shoots" it
    setRocketX(m.x);
    setLaserAt({ x: m.x, y: m.y, id: m.id });
    window.setTimeout(() => setLaserAt(null), 240);

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
      correctWordsRef.current = [...correctWordsRef.current, m.word];
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
    correctWordsRef.current = [];
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
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

        <div
          className="relative h-[78vh] min-h-[640px] w-full overflow-hidden rounded-2xl border-2 border-amber-400/60 bg-gradient-to-b from-rose-200 via-amber-100 to-rose-300 dark:from-rose-900 dark:via-amber-900 dark:to-rose-950"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(251,191,36,0.45), transparent 40%), radial-gradient(circle at 80% 70%, rgba(244,63,94,0.35), transparent 45%)",
          }}
        >
          {/* Chinese cultural floating decor */}
          {["🏮","🐉","🌸","🎏","🏮","🌸","🎋","🏮"].map((e, i) => (
            <motion.span
              key={`d-${i}`}
              animate={{ y: [0, -10, 0], rotate: [-4, 4, -4] }}
              transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
              className="absolute text-3xl sm:text-4xl select-none drop-shadow-[0_2px_6px_rgba(190,18,60,0.35)]"
              style={{ left: `${(i * 13 + 4) % 92}%`, top: `${(i * 11 + 6) % 70}%`, opacity: 0.7 }}
              aria-hidden
            >
              {e}
            </motion.span>
          ))}
          <div className="absolute top-4 right-6 text-7xl font-bold text-rose-600/25 select-none" aria-hidden>福</div>
          <div className="absolute top-1/3 left-4 text-7xl font-bold text-amber-700/20 select-none" aria-hidden>龙</div>

          <AnimatePresence>
            {meteors.map((m) => (
              <motion.div
                key={m.id}
                // x: "-50%" keeps the card centred on its lane. A Tailwind
                // translate class would be wiped out by framer-motion's inline
                // transform, which used to push cards past the right edge.
                initial={{ opacity: 0, scale: 0.6, x: "-50%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%" }}
                exit={{ opacity: 0, scale: 1.4, x: "-50%" }}
                className="absolute"
                style={{ left: `${m.x}%`, top: `${m.y}%`, width: "min(70%, 440px)" }}
              >
                <div className="relative">
                  {/* Meteor body - asteroid-shaped pill with fiery trail */}
                  <motion.div
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="relative mx-auto w-fit"
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-4xl select-none" aria-hidden>☄️</div>
                    <div className="absolute -inset-4 rounded-full bg-orange-500/50 blur-2xl" />
                    <div className="absolute -inset-2 rounded-[40%] bg-gradient-to-br from-amber-300/70 to-rose-500/70 blur-md" />
                    <div
                      className="relative rounded-[45%_55%_50%_50%/55%_45%_55%_45%] border-[3px] border-amber-200 bg-gradient-to-br from-rose-600 via-orange-500 to-amber-500 px-8 py-5 text-2xl font-bold text-white shadow-[0_0_25px_rgba(251,146,60,0.8)]"
                      style={{ textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}
                    >
                      {m.word}
                    </div>
                  </motion.div>
                  <div className="mt-3 flex flex-wrap justify-center gap-3">
                    {m.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handlePick(m, opt)}
                        className="w-full max-w-full rounded-xl border-2 border-amber-200 bg-rose-900/80 px-4 py-3 text-base font-semibold text-amber-50 backdrop-blur transition hover:scale-[1.03] hover:bg-rose-800 active:scale-95 shadow-lg"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Laser beam from rocket to meteor */}
          {laserAt && (
            <div
              className="absolute w-1.5 bg-gradient-to-t from-cyan-200 via-white to-cyan-200 shadow-[0_0_18px_rgba(34,211,238,1)] pointer-events-none"
              style={{
                left: `calc(${rocketX}% - 3px)`,
                bottom: "5%",
                height: `${Math.max(10, 95 - laserAt.y)}%`,
              }}
            />
          )}

          {/* Movable rocket 🚀 */}
          <motion.div
            animate={{ left: `${rocketX}%` }}
            transition={{ type: "tween", duration: 0.06, ease: "linear" }}
            className="absolute bottom-2 -translate-x-1/2 text-5xl drop-shadow-[0_0_12px_rgba(251,191,36,0.9)] select-none pointer-events-none"
            aria-hidden
          >
            🚀
          </motion.div>

          {!running && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/70 text-center text-white p-4 z-20">
              <Sparkles className="h-10 w-10 text-amber-300" />
              <h3 className="text-2xl font-bold">
                {lives <= 0 ? `Game Over - ${score} pts` : `${theme.emoji} Word Meteor - ${theme.label}`}
              </h3>
              <p className="max-w-sm text-sm text-white/80">
                Pick the correct meaning before the meteor lands. Use ← → (or A/D) to fly the rocket. Chain answers for bonus points!
              </p>
              <Button onClick={reset} className={`bg-gradient-to-r ${theme.accent} text-white`}>
                {lives <= 0 ? "Play Again" : "Start"}
              </Button>
            </div>
          )}
        </div>

        {/* Mobile rocket controls */}
        {running && (
          <div className="grid grid-cols-2 gap-2 lg:hidden">
            <Button
              onTouchStart={() => { keysRef.current.left = true; }}
              onTouchEnd={() => { keysRef.current.left = false; }}
              onMouseDown={() => { keysRef.current.left = true; }}
              onMouseUp={() => { keysRef.current.left = false; }}
              onMouseLeave={() => { keysRef.current.left = false; }}
              className="h-12 bg-rose-600 hover:bg-rose-700 text-2xl"
            >
              ◀
            </Button>
            <Button
              onTouchStart={() => { keysRef.current.right = true; }}
              onTouchEnd={() => { keysRef.current.right = false; }}
              onMouseDown={() => { keysRef.current.right = true; }}
              onMouseUp={() => { keysRef.current.right = false; }}
              onMouseLeave={() => { keysRef.current.right = false; }}
              className="h-12 bg-rose-600 hover:bg-rose-700 text-2xl"
            >
              ▶
            </Button>
          </div>
        )}
      </div>

      {/* Leaderboard sidebar */}
      <aside className="rounded-2xl border-2 border-amber-400/40 bg-slate-900 p-4 text-white shadow-[0_0_20px_rgba(251,191,36,0.15)]">
        <GameLeaderboard gameType={resolvedGameType} currentScore={score} />
      </aside>
    </div>
  );
}
