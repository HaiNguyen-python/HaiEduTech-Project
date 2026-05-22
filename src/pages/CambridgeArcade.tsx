/**
 * @file CambridgeArcade.tsx
 * @description Cambridge Kids Arcade — colourful mini-games for kids studying
 * Cambridge YLE (Starters/Movers/Flyers) and Cambridge English (KET/PET).
 *
 * Games:
 *   1) 🎈 Balloon Pop — balloons drift DOWN; tap the right one before it lands.
 *      (no repeated words within a round)
 *   2) 🔤 Spelling Bee — 15s countdown per word.
 *   3) 🃏 Memory Match — numbered cards, 3 difficulty grids (Easy/Med/Hard).
 *   4) ☄️ Word Meteor — Cambridge-level filtered bank, progressive speed.
 *
 * Each game submits scores to `game_scores` and shows a live leaderboard.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Heart, Trophy, Sparkles, Star, Volume2, Rocket, Gamepad2, Timer,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  CAMBRIDGE_KIDS_WORDS,
  CAMBRIDGE_LEVELS,
  type CambridgeKidsLevel,
  type CambridgeKidsWord,
} from "@/data/cambridgeKidsVocab";
import WordMeteor from "@/components/games/WordMeteor";
import GameLeaderboard from "@/components/games/GameLeaderboard";
import { submitGameScore } from "@/lib/submitGameScore";

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const speakEn = (text: string) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.85;
    u.pitch = 1.15;
    window.speechSynthesis.speak(u);
  } catch { /* noop */ }
};

const LEVEL_COLOR: Record<CambridgeKidsLevel, string> = {
  Starters: "from-pink-400 to-rose-500",
  Movers: "from-amber-400 to-orange-500",
  Flyers: "from-emerald-400 to-teal-500",
  KET: "from-sky-400 to-blue-600",
  PET: "from-fuchsia-500 to-purple-600",
};

// Hook: a shuffled-bag drawer that never returns a word twice until the bag empties.
function useShuffleBag<T>(pool: T[], keyOf: (t: T) => string) {
  const bagRef = useRef<T[]>([]);
  const recentRef = useRef<string[]>([]);
  const draw = (avoid: string[] = []): T | null => {
    if (pool.length === 0) return null;
    if (bagRef.current.length === 0) bagRef.current = shuffle(pool);
    const block = new Set([...avoid, ...recentRef.current.slice(-Math.min(6, pool.length - 1))]);
    let i = bagRef.current.findIndex((it) => !block.has(keyOf(it)));
    if (i === -1) i = 0;
    const item = bagRef.current.splice(i, 1)[0];
    recentRef.current.push(keyOf(item));
    if (recentRef.current.length > pool.length) recentRef.current.shift();
    return item;
  };
  const reset = () => { bagRef.current = []; recentRef.current = []; };
  return { draw, reset };
}

// ─────────────────────────────────────────────────────────────
// GAME 1 — Balloon Pop (now with falling balloons + no repeats)
// ─────────────────────────────────────────────────────────────
interface FallingBalloon { id: number; word: CambridgeKidsWord; x: number; y: number; isTarget: boolean; }

function BalloonPop({ level, onExit }: { level: CambridgeKidsLevel; onExit: () => void }) {
  const pool = useMemo(
    () => CAMBRIDGE_KIDS_WORDS.filter(w => w.level === level),
    [level]
  );
  const bag = useShuffleBag(pool, (w) => w.word);

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [maxStreak, setMaxStreak] = useState(0);
  const [streak, setStreak] = useState(0);
  const [target, setTarget] = useState<CambridgeKidsWord | null>(null);
  const [balloons, setBalloons] = useState<FallingBalloon[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const idRef = useRef(0);
  const tickRef = useRef<number>();

  const nextRound = () => {
    if (pool.length < 4) return;
    const t = bag.draw();
    if (!t) return;
    const distractors: CambridgeKidsWord[] = [];
    const used = new Set([t.word]);
    while (distractors.length < 3) {
      const d = bag.draw(Array.from(used));
      if (!d) break;
      if (!used.has(d.word)) { distractors.push(d); used.add(d.word); }
    }
    const four = shuffle([t, ...distractors]);
    setTarget(t);
    setFeedback(null);
    setBalloons(four.map((w, i) => ({
      id: ++idRef.current,
      word: w,
      x: 10 + i * 22 + (Math.random() * 6 - 3),
      y: -10 - i * 5,
      isTarget: w.word === t.word,
    })));
    speakEn(t.word);
  };

  useEffect(() => {
    nextRound();
    /* eslint-disable-next-line */
  }, []);

  // Falling animation
  useEffect(() => {
    if (lives <= 0 || feedback === "correct") return;
    tickRef.current = window.setInterval(() => {
      setBalloons((prev) => {
        const speed = 0.45 + Math.min(1.0, score / 200); // ramp up
        const updated = prev.map((b) => ({ ...b, y: b.y + speed }));
        const escaped = updated.filter((b) => b.y >= 88);
        if (escaped.some((e) => e.isTarget)) {
          setLives((l) => Math.max(0, l - 1));
          setStreak(0);
          setTimeout(nextRound, 600);
          return [];
        }
        return updated.filter((b) => b.y < 88);
      });
    }, 70);
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [lives, feedback, score]);

  const handlePick = (b: FallingBalloon) => {
    if (!target || feedback) return;
    if (b.isTarget) {
      const delta = 10 + streak * 2;
      setScore(s => s + delta);
      setStreak(s => { const ns = s + 1; setMaxStreak((m) => Math.max(m, ns)); return ns; });
      setFeedback("correct");
      setTimeout(nextRound, 700);
    } else {
      setLives(l => l - 1);
      setStreak(0);
      setFeedback("wrong");
      setBalloons((prev) => prev.filter((x) => x.id !== b.id));
      setTimeout(() => setFeedback(null), 500);
    }
  };

  const gameOver = lives <= 0;

  useEffect(() => {
    if (gameOver && !submitted && score > 0) {
      setSubmitted(true);
      submitGameScore({ gameType: "balloon_pop", score, maxStreak, difficulty: level });
    }
  }, [gameOver, submitted, score, maxStreak, level]);

  const restart = () => {
    bag.reset(); setScore(0); setLives(5); setStreak(0); setMaxStreak(0);
    setSubmitted(false); nextRound();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
      <div className="min-h-[70vh] rounded-3xl p-4 sm:p-6 relative overflow-hidden bg-[linear-gradient(180deg,#7dd3fc_0%,#bae6fd_35%,#bbf7d0_70%,#86efac_100%)] dark:bg-[linear-gradient(180deg,#0f172a_0%,#1e1b4b_50%,#0f172a_100%)]">
        {/* Playful decorations */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-4 left-6 text-5xl opacity-90 animate-pulse">☁️</div>
          <div className="absolute top-10 right-10 text-6xl opacity-90">🌈</div>
          <div className="absolute top-2 right-1/3 text-5xl">☀️</div>
          <div className="absolute top-24 left-1/3 text-4xl opacity-80">☁️</div>
          <div className="absolute bottom-10 left-4 text-5xl">🌷</div>
          <div className="absolute bottom-6 right-8 text-5xl">🌻</div>
          <div className="absolute bottom-2 left-1/2 text-4xl">🦋</div>
          <div className="absolute top-1/2 left-2 text-3xl opacity-70">⭐</div>
          <div className="absolute top-1/3 right-4 text-3xl opacity-70">✨</div>
        </div>
        <div className="relative">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <Button variant="secondary" size="sm" onClick={onExit}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Exit
          </Button>
          <div className="flex items-center gap-3">
            <Badge className="bg-yellow-400 text-yellow-950 text-base">
              <Trophy className="w-4 h-4 mr-1" /> {score}
            </Badge>
            <Badge className="bg-orange-500 text-white text-base">🔥 {streak}</Badge>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Heart key={i} className={`w-5 h-5 ${i < lives ? "fill-rose-500 text-rose-500" : "text-rose-200"}`} />
              ))}
            </div>
          </div>
        </div>

        {gameOver ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-3">🎈</div>
            <h3 className="text-2xl font-bold text-foreground">Game Over!</h3>
            <p className="text-muted-foreground mb-4">Final score: {score}</p>
            <Button onClick={restart}>Play again</Button>
          </div>
        ) : target && (
          <>
            <div className="text-center mb-4">
              <p className="text-sm text-foreground/70 mb-1">Pop the balloon for:</p>
              <button
                onClick={() => speakEn(target.word)}
                className="inline-flex items-center gap-2 text-3xl sm:text-4xl font-extrabold text-foreground hover:scale-105 transition"
              >
                <Volume2 className="w-7 h-7 text-primary" />
                <span className="capitalize">{target.vi}</span>
              </button>
            </div>

            <div className="relative h-[460px] w-full">
              <AnimatePresence>
                {balloons.map((b) => (
                  <motion.button
                    key={b.id}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handlePick(b)}
                    className={`absolute -translate-x-1/2 w-28 sm:w-32 aspect-[4/5] rounded-[50%_50%_50%_50%/45%_45%_55%_55%] bg-gradient-to-b ${LEVEL_COLOR[b.word.level]} shadow-2xl flex flex-col items-center justify-center gap-1 p-2 border-4 border-white/40`}
                    style={{ left: `${b.x}%`, top: `${b.y}%` }}
                  >
                    <span className="text-4xl drop-shadow-lg">{b.word.emoji}</span>
                    <span className="text-sm sm:text-base font-extrabold text-white drop-shadow capitalize text-center leading-tight">
                      {b.word.word}
                    </span>
                    <span className="absolute -bottom-3 w-1 h-6 bg-white/60" />
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>

            {feedback === "correct" && (
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none text-9xl"
              >✨</motion.div>
            )}
          </>
        )}
        </div>
      </div>

      <aside className="rounded-2xl border border-border bg-card/60 p-3">
        <GameLeaderboard gameType="balloon_pop" currentScore={score} />
      </aside>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// GAME 2 — Spelling Bee (with 15s countdown)
// ─────────────────────────────────────────────────────────────
function SpellingBee({ level, onExit }: { level: CambridgeKidsLevel; onExit: () => void }) {
  const pool = useMemo(
    () => CAMBRIDGE_KIDS_WORDS.filter(w => w.level === level && /^[a-z ]+$/i.test(w.word)),
    [level]
  );
  const bag = useShuffleBag(pool, (w) => w.word);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [lives, setLives] = useState(3);
  const [maxStreak, setMaxStreak] = useState(0);
  const [streak, setStreak] = useState(0);
  const [current, setCurrent] = useState<CambridgeKidsWord | null>(null);
  const [letters, setLetters] = useState<{ ch: string; used: boolean }[]>([]);
  const [typed, setTyped] = useState<string>("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | "timeout" | null>(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef<number>();

  const next = () => {
    const w = bag.draw();
    if (!w) return;
    const chars = w.word.replace(/\s+/g, "").split("");
    setCurrent(w);
    setLetters(shuffle(chars).map(ch => ({ ch, used: false })));
    setTyped("");
    setFeedback(null);
    setTimeLeft(20);
    setRound(r => r + 1);
    speakEn(w.word);
  };

  useEffect(() => { next(); /* eslint-disable-next-line */ }, []);

  // countdown
  useEffect(() => {
    if (feedback || lives <= 0) return;
    if (timeLeft <= 0) {
      setFeedback("timeout");
      setLives((l) => Math.max(0, l - 1));
      setStreak(0);
      setTimeout(next, 900);
      return;
    }
    timerRef.current = window.setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [timeLeft, feedback, lives]);

  // Physical keyboard input — type letters to spell
  useEffect(() => {
    if (feedback || lives <= 0 || !current) return;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      if (k === "Backspace") {
        // un-use the last used letter
        const lastCh = typed.slice(-1).toLowerCase();
        if (!lastCh) return;
        const idx = [...letters].map((l, i) => ({ l, i }))
          .reverse()
          .find(({ l }) => l.used && l.ch.toLowerCase() === lastCh)?.i;
        if (idx !== undefined) {
          setLetters(letters.map((l, i) => i === idx ? { ...l, used: false } : l));
          setTyped(typed.slice(0, -1));
        }
        return;
      }
      if (!/^[a-zA-Z]$/.test(k)) return;
      const want = k.toLowerCase();
      const idx = letters.findIndex((l) => !l.used && l.ch.toLowerCase() === want);
      if (idx !== -1) pick(idx);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letters, typed, feedback, lives, current]);

  const pick = (idx: number) => {
    if (!letters[idx] || letters[idx].used || feedback) return;
    const newLetters = letters.map((l, i) => i === idx ? { ...l, used: true } : l);
    const newTyped = typed + letters[idx].ch;
    setLetters(newLetters);
    setTyped(newTyped);
    if (current && newTyped.length === current.word.replace(/\s+/g, "").length) {
      if (newTyped.toLowerCase() === current.word.replace(/\s+/g, "").toLowerCase()) {
        const delta = 20 + timeLeft * 2 + streak * 3;
        setScore(s => s + delta);
        setStreak((s) => { const ns = s + 1; setMaxStreak((m) => Math.max(m, ns)); return ns; });
        setFeedback("correct");
        setTimeout(next, 900);
      } else {
        setFeedback("wrong");
        setStreak(0);
        setTimeout(() => {
          setLetters(letters.map(l => ({ ...l, used: false })));
          setTyped("");
          setFeedback(null);
        }, 800);
      }
    }
  };

  const reset = () => {
    setLetters(letters.map(l => ({ ...l, used: false })));
    setTyped("");
  };

  const gameOver = lives <= 0;
  useEffect(() => {
    if (gameOver && !submitted && score > 0) {
      setSubmitted(true);
      submitGameScore({ gameType: "spelling_bee", score, maxStreak, difficulty: level });
    }
  }, [gameOver, submitted, score, maxStreak, level]);

  const restart = () => { bag.reset(); setScore(0); setLives(3); setStreak(0); setMaxStreak(0); setSubmitted(false); next(); };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
      <div className="min-h-[70vh] bg-gradient-to-br from-amber-200 via-yellow-100 to-orange-200 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-950 rounded-3xl p-4 sm:p-6">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <Button variant="secondary" size="sm" onClick={onExit}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Exit
          </Button>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-orange-500 text-white text-base">
              <Star className="w-4 h-4 mr-1" /> {score}
            </Badge>
            <Badge className={`text-white text-base ${timeLeft <= 5 ? "bg-rose-600 animate-pulse" : "bg-emerald-600"}`}>
              <Timer className="w-4 h-4 mr-1" /> {timeLeft}s
            </Badge>
            <Badge className="bg-rose-500 text-white">❤️ {lives}</Badge>
          </div>
        </div>

        {gameOver ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-3">🐝</div>
            <h3 className="text-2xl font-bold text-foreground">Time's up!</h3>
            <p className="text-muted-foreground mb-4">Final score: {score}</p>
            <Button onClick={restart}>Play again</Button>
          </div>
        ) : current && (
          <div className="text-center">
            <div className="text-7xl mb-2">{current.emoji}</div>
            <p className="text-sm text-foreground/70 mb-1">Spell this word in 20 seconds! (type or tap letters)</p>
            <button
              onClick={() => speakEn(current.word)}
              className="inline-flex items-center gap-2 text-xl font-bold text-foreground/80 hover:text-primary"
            >
              <Volume2 className="w-5 h-5" />
              <span className="italic">({current.vi})</span>
            </button>

            <div className="flex flex-wrap justify-center gap-2 my-6 min-h-[60px]">
              {current.word.replace(/\s+/g, "").split("").map((_, i) => (
                <div
                  key={i}
                  className={`w-12 h-14 sm:w-14 sm:h-16 rounded-xl border-4 ${
                    feedback === "wrong" || feedback === "timeout" ? "border-rose-500 bg-rose-100" :
                    feedback === "correct" ? "border-emerald-500 bg-emerald-100" :
                    "border-orange-400 bg-white/80"
                  } flex items-center justify-center text-2xl sm:text-3xl font-extrabold text-foreground`}
                >
                  {typed[i] ?? ""}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {letters.map((l, i) => (
                <motion.button
                  key={`${round}-${i}`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={l.used}
                  onClick={() => pick(i)}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl text-2xl font-extrabold uppercase shadow-lg transition ${
                    l.used ? "bg-muted text-muted-foreground/50 cursor-not-allowed"
                          : "bg-gradient-to-br from-orange-400 to-amber-500 text-white"
                  }`}
                >
                  {l.ch}
                </motion.button>
              ))}
            </div>

            <div className="flex justify-center gap-2">
              <Button variant="outline" size="sm" onClick={reset}>Clear</Button>
              <Button size="sm" onClick={next}>Skip</Button>
            </div>
          </div>
        )}
      </div>

      <aside className="rounded-2xl border border-border bg-card/60 p-3">
        <GameLeaderboard gameType="spelling_bee" currentScore={score} />
      </aside>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// GAME 3 — Memory Match (difficulty + numbered cards)
// ─────────────────────────────────────────────────────────────
type Card = { id: number; key: string; face: "word" | "emoji"; word: CambridgeKidsWord; matched: boolean };
type MemoryDifficulty = "easy" | "medium" | "hard";

const MEMORY_CONFIG: Record<MemoryDifficulty, { pairs: number; cols: number; label: string }> = {
  easy:   { pairs: 6,  cols: 4, label: "3×4 Easy" },
  medium: { pairs: 8,  cols: 4, label: "4×4 Medium" },
  hard:   { pairs: 10, cols: 5, label: "5×4 Hard" },
};

function MemoryMatch({ level, onExit }: { level: CambridgeKidsLevel; onExit: () => void }) {
  const [difficulty, setDifficulty] = useState<MemoryDifficulty>("easy");
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const config = MEMORY_CONFIG[difficulty];

  const setup = () => {
    const wordPool = CAMBRIDGE_KIDS_WORDS.filter(w => w.level === level);
    const pool = shuffle(wordPool).slice(0, config.pairs);
    const deck: Card[] = [];
    pool.forEach((w, idx) => {
      deck.push({ id: idx * 2, key: w.word, face: "word", word: w, matched: false });
      deck.push({ id: idx * 2 + 1, key: w.word, face: "emoji", word: w, matched: false });
    });
    setCards(shuffle(deck));
    setFlipped([]);
    setMoves(0);
    setMatches(0);
    setSubmitted(false);
  };

  useEffect(() => { setup(); /* eslint-disable-next-line */ }, [level, difficulty]);

  const click = (id: number) => {
    if (flipped.includes(id) || flipped.length === 2) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.matched) return;
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = newFlipped.map(fid => cards.find(c => c.id === fid)!);
      if (a.key === b.key) {
        setTimeout(() => {
          setCards(cs => cs.map(c => c.key === a.key ? { ...c, matched: true } : c));
          setFlipped([]);
          setMatches(m => m + 1);
          speakEn(a.word.word);
        }, 500);
      } else {
        setTimeout(() => setFlipped([]), 900);
      }
    }
  };

  const done = matches > 0 && matches === cards.length / 2;
  const gameType = `memory_match_${difficulty}`;

  // Score: more pairs + fewer moves = higher
  const finalScore = done ? Math.max(0, config.pairs * 30 - (moves - config.pairs) * 5) : 0;
  useEffect(() => {
    if (done && !submitted) {
      setSubmitted(true);
      submitGameScore({
        gameType,
        score: finalScore,
        difficulty: `${level}-${difficulty}`,
        metadata: { moves, pairs: config.pairs },
      });
    }
  }, [done, submitted, finalScore, gameType, level, difficulty, moves, config.pairs]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
      <div className="min-h-[70vh] bg-gradient-to-br from-purple-200 via-pink-100 to-rose-200 dark:from-purple-950 dark:via-fuchsia-950 dark:to-rose-950 rounded-3xl p-4 sm:p-6">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <Button variant="secondary" size="sm" onClick={onExit}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Exit
          </Button>
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-purple-500 text-white">Moves: {moves}</Badge>
            <Badge className="bg-pink-500 text-white">Pairs: {matches}/{cards.length / 2}</Badge>
          </div>
        </div>

        {/* Difficulty selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {(Object.keys(MEMORY_CONFIG) as MemoryDifficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition border-2 ${
                difficulty === d
                  ? "bg-fuchsia-500 text-white border-fuchsia-400 shadow-lg scale-105"
                  : "bg-white/80 text-fuchsia-900 border-fuchsia-300 hover:bg-white"
              }`}
            >
              {MEMORY_CONFIG[d].label}
            </button>
          ))}
          <Button size="sm" variant="outline" onClick={setup}>↻ Reset</Button>
        </div>

        {done && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center py-6">
            <div className="text-6xl">🏆</div>
            <h3 className="text-2xl font-bold">You did it in {moves} moves!</h3>
            <p className="text-muted-foreground">Score: {finalScore}</p>
            <Button className="mt-3" onClick={setup}>Play again</Button>
          </motion.div>
        )}

        <div
          className="grid gap-3 sm:gap-4 mx-auto"
          style={{ gridTemplateColumns: `repeat(${config.cols}, minmax(0, 1fr))`, maxWidth: `${config.cols * 220}px` }}
        >
          {cards.map((card, index) => {
            const isFlipped = flipped.includes(card.id) || card.matched;
            return (
              <motion.button
                key={card.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => click(card.id)}
                className="relative aspect-square min-h-[120px] sm:min-h-[160px]"
              >
                <div className={`absolute inset-0 rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}>
                  {/* Back with number */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white shadow-lg [backface-visibility:hidden]">
                    <span className="text-5xl sm:text-6xl font-extrabold drop-shadow">{index + 1}</span>
                  </div>
                  {/* Front */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${LEVEL_COLOR[card.word.level]} flex items-center justify-center p-2 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] ${card.matched ? "opacity-60" : ""}`}>
                    {card.face === "emoji" ? (
                      <span className="text-6xl sm:text-7xl">{card.word.emoji}</span>
                    ) : (
                      <span className="text-base sm:text-xl font-bold text-white text-center capitalize leading-tight px-1">{card.word.word}</span>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <aside className="rounded-2xl border border-border bg-card/60 p-3">
        <GameLeaderboard gameType={gameType} currentScore={finalScore} />
      </aside>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Hub
// ─────────────────────────────────────────────────────────────
type GameKey = "balloon" | "spelling" | "memory" | "meteor" | null;

const CambridgeArcade = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState<GameKey>(null);
  const [level, setLevel] = useState<CambridgeKidsLevel>("Starters");

  // Build a Cambridge-level meteor bank so Word Meteor respects the selected level
  const cambridgeMeteorBank = useMemo(() => {
    const seen = new Set<string>();
    return CAMBRIDGE_KIDS_WORDS
      .filter((w) => w.level === level && /^[a-z ]+$/i.test(w.word))
      .filter((w) => {
        if (seen.has(w.vi)) return false;
        seen.add(w.vi);
        return true;
      })
      .map((w) => ({ word: w.word, meaning: w.vi }));
  }, [level]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-pink-50 to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <SEO
        title="Cambridge Kids Arcade — Starters/Movers/Flyers/KET/PET"
        description="Fun mini-games for Cambridge English kids: Balloon Pop, Spelling Bee, Memory Match, Word Meteor across Starters, Movers, Flyers, KET and PET levels."
        path="/cambridge/arcade"
      />
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link to="/cambridge-lectures" className="hover:underline">
            <ArrowLeft className="w-4 h-4 inline mr-1" />
            {t("Quay lại Cambridge Lectures", "Back to Cambridge Lectures")}
          </Link>
        </div>

        <header className="text-center mb-8">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-amber-500 to-emerald-500 bg-clip-text text-transparent"
          >
            🎪 Cambridge Kids Arcade
          </motion.h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            {t(
              "Học từ vựng Cambridge YLE & KET/PET qua các trò chơi đầy màu sắc — có bảng xếp hạng thi đấu!",
              "Learn Cambridge YLE & KET/PET vocabulary through colourful mini-games — with competitive leaderboards!"
            )}
          </p>
        </header>

        {/* Level picker */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {CAMBRIDGE_LEVELS.map(l => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                level === l
                  ? `bg-gradient-to-r ${LEVEL_COLOR[l]} text-white shadow-lg scale-105`
                  : "bg-muted text-foreground hover:bg-muted/70"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Active game */}
        {active === "balloon" && <BalloonPop level={level} onExit={() => setActive(null)} />}
        {active === "spelling" && <SpellingBee level={level} onExit={() => setActive(null)} />}
        {active === "memory" && <MemoryMatch level={level} onExit={() => setActive(null)} />}
        {active === "meteor" && (
          <div className="max-w-5xl mx-auto">
            <Button variant="ghost" size="sm" onClick={() => setActive(null)} className="mb-3">
              <ArrowLeft className="w-4 h-4 mr-1" /> {t("Quay lại", "Back")}
            </Button>
            <WordMeteor
              key={level}
              lang="en"
              customBank={cambridgeMeteorBank}
              gameType={`meteor_cambridge_${level.toLowerCase()}`}
              difficulty={level}
              onExit={() => setActive(null)}
            />
          </div>
        )}

        {!active && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { key: "balloon" as const, emoji: "🎈", title: "Balloon Pop", desc: t("Bóng rớt xuống — chọn nhanh!", "Balloons drift down — pop the right one!"), color: "from-sky-400 to-cyan-500" },
                { key: "spelling" as const, emoji: "🔤", title: "Spelling Bee", desc: t("Đánh vần trong 15 giây", "Spell the word in 15 seconds"), color: "from-orange-400 to-amber-500" },
                { key: "memory" as const, emoji: "🃏", title: "Memory Match", desc: t("3 độ khó: 3×4 / 4×4 / 5×4", "3 difficulties: 3×4 / 4×4 / 5×4"), color: "from-fuchsia-500 to-purple-600" },
                { key: "meteor" as const, emoji: "☄️", title: "Word Meteor", desc: t("Từ vựng theo level Cambridge", "Cambridge-level vocabulary meteors"), color: "from-red-500 to-orange-600" },
              ].map((g, idx) => (
                <motion.button
                  key={g.key}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  onClick={() => setActive(g.key)}
                  className={`relative overflow-hidden rounded-3xl p-6 text-left bg-gradient-to-br ${g.color} text-white shadow-2xl`}
                >
                  <Sparkles className="absolute top-3 right-3 w-5 h-5 opacity-50" />
                  <div className="text-6xl mb-3">{g.emoji}</div>
                  <h3 className="text-2xl font-extrabold">{g.title}</h3>
                  <p className="text-sm opacity-90 mt-1">{g.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs bg-white/20 rounded-full px-3 py-1">
                    Level: {level}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Bridge to older-learner English Arcade Hub */}
            <div className="mt-10 rounded-3xl border border-violet-300/30 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-amber-500/10 p-6 text-center">
              <Badge variant="outline" className="mb-2"><Gamepad2 className="w-3 h-3 mr-1" /> More English Games</Badge>
              <h3 className="text-xl font-bold mb-1">
                {t("Game tiếng Anh cho Teen & Adult", "Teen & Adult English Games")}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-4">
                {t(
                  "Synonym Sprint, Spelling Bee và Word Builder — mini-game từ vựng B1+ cho học viên lớn tuổi hơn.",
                  "Synonym Sprint, Spelling Bee, and Word Builder — B1+ vocabulary games for older learners."
                )}
              </p>
              <Link to="/english/arcade">
                <Button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:opacity-90">
                  <Rocket className="w-4 h-4 mr-2" /> {t("Mở English Arcade Hub", "Open English Arcade Hub")}
                </Button>
              </Link>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CambridgeArcade;
