/**
 * @file ChineseArcade.tsx
 * @description Chinese Vocabulary Arcade Hub - 3 mini-games: Space Shooter, Hotpot Chef, Pinyin Runner.
 * Cyberpunk-arcade theme with neon styling, full mobile-responsive controls.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowLeft, Rocket, ChefHat, Footprints, Trophy, Zap, Sparkles, Timer } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { hskVocabData, type HskWord } from "@/data/hskVocab";
import WordMeteor from "@/components/games/WordMeteor";
import GameLeaderboard from "@/components/games/GameLeaderboard";
import { submitGameScore } from "@/lib/submitGameScore";

// ============================================================
// Shared types & helpers
// ============================================================

type GameId = "menu" | "shooter" | "hotpot" | "runner" | "meteor" | "sentence";
type Difficulty = "easy" | "hard" | "expert"; // easy=HSK1-2, hard=HSK3-4, expert=HSK5-6

// Strip tone marks from pinyin and return plain ASCII letters
const stripTones = (pinyin: string): string => {
  const map: Record<string, string> = {
    ā: "a", á: "a", ǎ: "a", à: "a", a: "a",
    ē: "e", é: "e", ě: "e", è: "e", e: "e",
    ī: "i", í: "i", ǐ: "i", ì: "i", i: "i",
    ō: "o", ó: "o", ǒ: "o", ò: "o", o: "o",
    ū: "u", ú: "u", ǔ: "u", ù: "u", u: "u",
    ǖ: "u", ǘ: "u", ǚ: "u", ǜ: "u", ü: "u", v: "u",
  };
  return Array.from(pinyin.toLowerCase()).map(c => map[c] ?? c).join("").replace(/[^a-z]/g, "");
};

// Extract per-syllable tone marks from a pinyin string. Returns array of "ˉ ˊ ˇ ˋ" or "·" (neutral).
const extractTones = (pinyin: string): string[] => {
  const toneMap: Record<string, string> = {
    "ā": "ˉ", "ē": "ˉ", "ī": "ˉ", "ō": "ˉ", "ū": "ˉ", "ǖ": "ˉ",
    "á": "ˊ", "é": "ˊ", "í": "ˊ", "ó": "ˊ", "ú": "ˊ", "ǘ": "ˊ",
    "ǎ": "ˇ", "ě": "ˇ", "ǐ": "ˇ", "ǒ": "ˇ", "ǔ": "ˇ", "ǚ": "ˇ",
    "à": "ˋ", "è": "ˋ", "ì": "ˋ", "ò": "ˋ", "ù": "ˋ", "ǜ": "ˋ",
  };
  // Split syllables roughly by spaces or middle dots; HSK words usually have one or two
  const syllables = pinyin.toLowerCase().split(/\s+/).filter(Boolean);
  return syllables.map(syl => {
    for (const ch of syl) {
      if (toneMap[ch]) return toneMap[ch];
    }
    return "·"; // neutral / no tone
  });
};

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const speakChinese = (text: string) => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN";
    u.rate = 0.8;
    window.speechSynthesis.speak(u);
  }
};

// Detect touch device for showing virtual controls
const isTouchDevice = () => typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

// Filter words by difficulty level
const wordsForDifficulty = (diff: Difficulty): HskWord[] => {
  const levels =
    diff === "easy" ? ["HSK 1", "HSK 2"]
    : diff === "hard" ? ["HSK 3", "HSK 4"]
    : ["HSK 5", "HSK 6"];
  return hskVocabData.filter(w => levels.includes(w.level));
};

// ============================================================
// HUD - shared top bar component
// ============================================================
const HUD = ({ score, combo, level, lives }: { score: number; combo: number; level: number; lives: number }) => (
  <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-sm mb-3">
    <div className="flex items-center gap-3 text-sm font-mono">
      <span className="text-cyan-400">SCORE <span className="text-white font-bold">{score}</span></span>
      <span className="text-amber-400">x{combo}</span>
      <span className="text-pink-400 hidden sm:inline">LVL {level}</span>
    </div>
    <div className="flex items-center gap-1">
      {Array.from({ length: 3 }).map((_, i) => (
        <Heart key={i} className={`w-5 h-5 ${i < lives ? "text-rose-500 fill-rose-500" : "text-slate-700"}`} />
      ))}
    </div>
  </div>
);

// ============================================================
// GAME 1: Hanzi Space Shooter
// ============================================================
type Meteor = { id: number; word: HskWord; x: number; y: number; speed: number };

const SpaceShooter = ({ difficulty, onExit }: { difficulty: Difficulty; onExit: () => void }) => {
  const { t } = useLanguage();
  const words = useMemo(() => wordsForDifficulty(difficulty), [difficulty]);
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [laser, setLaser] = useState<{ x: number; from: number } | null>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [shake, setShake] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [shipX, setShipX] = useState(50); // 0-100 percentage
  const keysRef = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const meteorIdRef = useRef(0);
  const particleIdRef = useRef(0);

  // Spawn meteors at increasing rate based on level (gentler ramp + bigger gaps)
  useEffect(() => {
    if (gameOver) return;
    const spawnInterval = Math.max(3800 - level * 200, 1800);
    const id = setInterval(() => {
      const w = words[Math.floor(Math.random() * words.length)];
      if (!w) return;
      setMeteors(prev => [
        ...prev,
        {
          id: ++meteorIdRef.current,
          word: w,
          x: 10 + Math.random() * 80,
          y: 0,
          // Much slower fall, gentle ramp by level
          speed: 0.05 + level * 0.012 + Math.random() * 0.03,
        },
      ]);
    }, spawnInterval);
    return () => clearInterval(id);
  }, [level, gameOver, words]);

  // Move meteors down, lose life if they hit floor
  useEffect(() => {
    if (gameOver) return;
    const id = setInterval(() => {
      setMeteors(prev => {
        const next: Meteor[] = [];
        let lifeLost = false;
        for (const m of prev) {
          const ny = m.y + m.speed;
          if (ny >= 85) {
            lifeLost = true;
            continue;
          }
          next.push({ ...m, y: ny });
        }
        if (lifeLost) {
          setLives(l => {
            const nl = l - 1;
            if (nl <= 0) setGameOver(true);
            return nl;
          });
          setCombo(1);
          setShake(true);
          setTimeout(() => setShake(false), 300);
        }
        return next;
      });
    }, 50);
    return () => clearInterval(id);
  }, [gameOver]);

  // Ship movement loop — smooth glide while arrow keys held
  useEffect(() => {
    if (gameOver) return;
    const id = setInterval(() => {
      setShipX(x => {
        let nx = x;
        if (keysRef.current.left) nx -= 1.8;
        if (keysRef.current.right) nx += 1.8;
        return Math.max(4, Math.min(96, nx));
      });
    }, 30);
    return () => clearInterval(id);
  }, [gameOver]);

  // Keyboard: arrow keys for movement (don't steal typing keys)
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { keysRef.current.left = true; e.preventDefault(); }
      if (e.key === "ArrowRight") { keysRef.current.right = true; e.preventDefault(); }
    };
    const onUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") keysRef.current.left = false;
      if (e.key === "ArrowRight") keysRef.current.right = false;
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  // Level up every 10 hits
  useEffect(() => {
    setLevel(Math.floor(score / 50) + 1);
  }, [score]);

  // Auto-focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Check input matches any meteor pinyin
  const checkMatch = (val: string) => {
    const typed = val.toLowerCase().trim();
    if (!typed) return;
    const target = meteors.find(m => stripTones(m.word.pinyin) === typed);
    if (target) {
      // Fire laser, destroy meteor
      setLaser({ x: target.x });
      setTimeout(() => setLaser(null), 200);
      setParticles(prev => [
        ...prev,
        { id: ++particleIdRef.current, x: target.x, y: target.y },
      ]);
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== particleIdRef.current));
      }, 600);
      setMeteors(prev => prev.filter(m => m.id !== target.id));
      setScore(s => s + 10 * combo);
      setCombo(c => Math.min(c + 1, 10));
      setInput("");
      speakChinese(target.word.character);
    }
  };

  const handleTapMeteor = (m: Meteor) => {
    // Mobile tap: auto-fill pinyin
    setInput(stripTones(m.word.pinyin));
    checkMatch(stripTones(m.word.pinyin));
  };

  if (gameOver) {
    return (
      <GameOverScreen score={score} onRetry={() => window.location.reload()} onExit={onExit} />
    );
  }

  return (
    <div className="space-y-3 max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-2">
        <Button variant="outline" size="sm" onClick={onExit} className="bg-slate-900 border-cyan-500/60 text-cyan-200 hover:bg-slate-800 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-1" /> {t("Quay lại", "Back")}
        </Button>
        <span className="text-xs text-cyan-300/70 font-mono uppercase tracking-wider">Hanzi Space Shooter</span>
      </div>
      <HUD score={score} combo={combo} level={level} lives={lives} />
      <motion.div
        ref={containerRef}
        animate={shake ? { x: [-8, 8, -6, 6, 0] } : {}}
        transition={{ duration: 0.3 }}
        className="relative h-[640px] sm:h-[760px] rounded-2xl border-2 border-cyan-500/40 bg-gradient-to-b from-slate-950 via-purple-950/30 to-slate-900 overflow-hidden"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, rgba(168,85,247,0.15), transparent 40%), radial-gradient(circle at 80% 70%, rgba(6,182,212,0.15), transparent 40%)",
        }}
      >
        {/* Starfield */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-50 animate-pulse"
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, animationDelay: `${i * 0.1}s` }}
          />
        ))}

        {/* Meteors */}
        <AnimatePresence>
          {meteors.map(m => (
            <motion.button
              key={m.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0, rotate: 180 }}
              onClick={() => handleTapMeteor(m)}
              className="absolute -translate-x-1/2 px-5 py-4 rounded-2xl bg-gradient-to-br from-rose-500/95 to-amber-500/95 border-2 border-amber-300 shadow-[0_0_22px_rgba(251,191,36,0.75)] text-white font-bold text-center min-w-[170px] cursor-pointer"
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
            >
              <div className="text-5xl sm:text-6xl leading-tight drop-shadow">{m.word.character}</div>
              {/* Pinyin shown WITH tone marks so students still see thanh điệu */}
              <div className="text-xl sm:text-2xl font-mono text-amber-50 mt-1 tracking-wide">{m.word.pinyin}</div>
              <div className="text-sm text-white/95 mt-1 max-w-[220px] mx-auto leading-snug">{m.word.definition.vi}</div>
            </motion.button>
          ))}
        </AnimatePresence>

        {/* Laser beam */}
        {laser && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            className="absolute bottom-12 w-1 bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,1)] origin-bottom"
            style={{ left: `calc(${laser.x}% - 2px)`, height: "85%" }}
          />
        )}

        {/* Particle explosions */}
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-amber-400 shadow-[0_0_30px_rgba(251,191,36,1)]"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          />
        ))}

        {/* Cannon */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-12 h-12 rounded-t-2xl bg-gradient-to-t from-cyan-600 to-cyan-300 border-2 border-cyan-200 shadow-[0_0_20px_rgba(6,182,212,0.8)]" />

        {/* Floor line */}
        <div className="absolute bottom-12 left-0 right-0 h-0.5 bg-rose-500/50 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
      </motion.div>

      {/* Input — students type WITHOUT tone marks */}
      <input
        ref={inputRef}
        value={input}
        onChange={e => {
          setInput(e.target.value);
          checkMatch(e.target.value);
        }}
        placeholder={t("Gõ Pinyin (không cần dấu thanh)...", "Type Pinyin (no tones needed)...")}
        className="w-full px-4 py-3 rounded-xl bg-slate-900 border-2 border-cyan-500/50 text-cyan-100 placeholder:text-slate-500 font-mono text-lg focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
        autoFocus
      />
      <Button variant="outline" onClick={onExit} className="w-full bg-slate-900 border-cyan-500/60 text-cyan-200 hover:bg-slate-800 hover:text-white">
        <ArrowLeft className="w-4 h-4 mr-2" /> {t("Về menu game", "Back to game menu")}
      </Button>
    </div>
  );
};

// ============================================================
// GAME 2: Hanzi Hotpot Chef
// ============================================================
type IngredientWord = { char: string; id: number; used: boolean };

const HotpotChef = ({ difficulty, onExit }: { difficulty: Difficulty; onExit: () => void }) => {
  const { t } = useLanguage();
  // Pick only multi-character HSK words for compound matching
  const compoundWords = useMemo(
    () => wordsForDifficulty(difficulty).filter(w => Array.from(w.character).length >= 2 && Array.from(w.character).length <= 3),
    [difficulty]
  );
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [target, setTarget] = useState<HskWord | null>(null);
  const [ingredients, setIngredients] = useState<IngredientWord[]>([]);
  const [selected, setSelected] = useState<IngredientWord[]>([]);
  const [boiling, setBoiling] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const ingredientIdRef = useRef(0);
  const scoreSubmittedRef = useRef(false);

  const loadNewRound = useCallback(() => {
    if (compoundWords.length === 0) return;
    const w = compoundWords[Math.floor(Math.random() * compoundWords.length)];
    const targetChars = Array.from(w.character);
    const distractors: string[] = [];
    while (distractors.length < 3) {
      const other = compoundWords[Math.floor(Math.random() * compoundWords.length)];
      const c = Array.from(other.character)[Math.floor(Math.random() * Array.from(other.character).length)];
      if (!targetChars.includes(c) && !distractors.includes(c)) distractors.push(c);
    }
    const all = shuffle([...targetChars, ...distractors]).map(c => ({
      char: c,
      id: ++ingredientIdRef.current,
      used: false,
    }));
    setTarget(w);
    setIngredients(all);
    setSelected([]);
    setTimeLeft(20); // reset 20-second countdown per word
  }, [compoundWords]);

  useEffect(() => {
    loadNewRound();
  }, [loadNewRound]);

  // 20-second countdown per word
  useEffect(() => {
    if (gameOver || boiling || wrong) return;
    if (timeLeft <= 0) {
      // Time's up: lose a life, reset round
      setCombo(1);
      setWrong(true);
      setLives(l => {
        const nl = l - 1;
        if (nl <= 0) setGameOver(true);
        return nl;
      });
      setTimeout(() => {
        setWrong(false);
        loadNewRound();
      }, 700);
      return;
    }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, gameOver, boiling, wrong, loadNewRound]);

  // Submit final score once on game over
  useEffect(() => {
    if (gameOver && !scoreSubmittedRef.current) {
      scoreSubmittedRef.current = true;
      submitGameScore({ gameType: `hotpot_chef_${difficulty}`, score, maxStreak: combo, difficulty });
    }
  }, [gameOver, score, combo, difficulty]);

  const handleSelect = (ing: IngredientWord) => {
    if (ing.used || !target) return;
    const next = [...selected, ing];
    setSelected(next);
    setIngredients(prev => prev.map(i => (i.id === ing.id ? { ...i, used: true } : i)));

    const typed = next.map(n => n.char).join("");
    const expected = target.character.slice(0, typed.length);

    if (typed === expected) {
      if (typed === target.character) {
        setBoiling(true);
        // Bonus points for remaining time
        setScore(s => s + 20 * combo + timeLeft);
        setCombo(c => Math.min(c + 1, 10));
        speakChinese(target.character);
        setTimeout(() => {
          setBoiling(false);
          setLevel(Math.floor(score / 100) + 1);
          loadNewRound();
        }, 1100);
      }
    } else {
      setWrong(true);
      setCombo(1);
      setLives(l => {
        const nl = l - 1;
        if (nl <= 0) setGameOver(true);
        return nl;
      });
      setTimeout(() => {
        setWrong(false);
        setIngredients(prev => prev.map(i => ({ ...i, used: false })));
        setSelected([]);
      }, 700);
    }
  };

  if (gameOver) return <GameOverScreen score={score} onRetry={() => window.location.reload()} onExit={onExit} />;
  if (!target) return <p className="text-center p-8">Loading...</p>;

  const timeColor = timeLeft <= 5 ? "text-rose-300" : timeLeft <= 10 ? "text-amber-300" : "text-emerald-300";
  const timeBar = (timeLeft / 20) * 100;

  // Decorative floating hanzi (purely visual background)
  const bgHanzi = ["香", "辣", "麻", "鲜", "汤", "火", "锅", "美", "味", "热"];

  return (
    <div className="space-y-3 max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-2">
        <Button variant="outline" size="sm" onClick={onExit} className="bg-slate-900 border-amber-500/60 text-amber-200 hover:bg-slate-800 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-1" /> {t("Quay lại", "Back")}
        </Button>
        <span className="text-xs text-amber-300/80 font-mono uppercase tracking-wider">🍲 Hanzi Hotpot Chef</span>
      </div>
      <HUD score={score} combo={combo} level={level} lives={lives} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
        {/* Main play area */}
        <div className="relative rounded-2xl border-2 border-amber-500/40 bg-gradient-to-b from-amber-950/50 via-rose-950/40 to-slate-900 p-4 sm:p-6 min-h-[560px] overflow-hidden">
          {/* Lively background: floating hanzi + lanterns */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
            {bgHanzi.map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "-10%", opacity: [0, 0.18, 0.18, 0] }}
                transition={{ duration: 14 + (i % 5) * 2, repeat: Infinity, delay: i * 1.2, ease: "linear" }}
                className="absolute text-6xl sm:text-7xl font-bold text-amber-200/30 select-none"
                style={{ left: `${(i * 13 + 5) % 92}%` }}
              >
                {ch}
              </motion.span>
            ))}
            {/* Red lanterns */}
            <div className="absolute top-2 left-4 text-3xl opacity-70 animate-pulse">🏮</div>
            <div className="absolute top-2 right-4 text-3xl opacity-70 animate-pulse" style={{ animationDelay: "0.5s" }}>🏮</div>
          </div>

          {/* Timer bar */}
          <div className="relative mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className={`inline-flex items-center gap-1 text-xs font-mono ${timeColor}`}>
                <Timer className="w-3.5 h-3.5" /> {timeLeft}s
              </span>
              <span className="text-xs text-amber-200/70 font-mono">{t("Mỗi từ 20 giây", "20s per word")}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800/80 overflow-hidden border border-amber-500/30">
              <motion.div
                animate={{ width: `${timeBar}%` }}
                transition={{ duration: 0.3 }}
                className={`h-full ${timeLeft <= 5 ? "bg-rose-500" : timeLeft <= 10 ? "bg-amber-400" : "bg-emerald-400"}`}
              />
            </div>
          </div>

          {/* Target */}
          <div className="relative text-center mb-6">
            <p className="text-xs text-amber-300 font-mono mb-1">{t("MỤC TIÊU - Ghép ra từ:", "TARGET - Combine to make:")}</p>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-1 drop-shadow">{target.definition.vi}</p>
            <p className="text-sm text-amber-200">{target.definition.en}</p>
          </div>

          {/* Hotpot with constant steam + fire */}
          <motion.div
            animate={boiling ? { scale: [1, 1.12, 1], rotate: [0, 3, -3, 0] } : wrong ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
            className={`relative mx-auto w-56 h-36 sm:w-72 sm:h-44 rounded-b-full border-4 mb-6 flex items-end justify-center ${
              boiling
                ? "border-amber-300 bg-gradient-to-b from-amber-400/40 to-rose-500/60 shadow-[0_0_50px_rgba(251,191,36,0.9)]"
                : wrong
                ? "border-rose-500 bg-rose-900/40"
                : "border-amber-500/70 bg-gradient-to-b from-amber-900/60 to-rose-900/70 shadow-[0_0_25px_rgba(251,191,36,0.4)]"
            }`}
          >
            {/* Continuous steam puffs */}
            {[0, 1, 2, 3, 4].map(i => (
              <motion.div
                key={i}
                initial={{ y: 0, opacity: 0, scale: 0.8 }}
                animate={{ y: -90, opacity: [0, 0.85, 0], scale: [0.8, 1.4, 1.6] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
                className="absolute -top-2 text-4xl"
                style={{ left: `${20 + i * 14}%` }}
              >
                💨
              </motion.div>
            ))}
            {/* Fire flames under pot */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
              {[0, 1, 2, 3, 4].map(i => (
                <motion.span
                  key={i}
                  animate={{ scaleY: [1, 1.4, 0.9, 1.2, 1], opacity: [0.8, 1, 0.9, 1, 0.8] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                  className="text-2xl origin-bottom"
                >
                  🔥
                </motion.span>
              ))}
            </div>
            {/* Selected chars sitting in pot */}
            <div className="flex gap-2 mb-4">
              {selected.map(s => (
                <motion.span
                  key={s.id}
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-4xl sm:text-5xl font-bold text-amber-50 drop-shadow-[0_0_10px_rgba(251,191,36,1)]"
                >
                  {s.char}
                </motion.span>
              ))}
            </div>
            {boiling && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-14 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-amber-950 text-sm font-bold whitespace-nowrap shadow-lg">
                ✨ {t("Tuyệt vời!", "Delicious!")} +{20 * combo + timeLeft} ✨
              </motion.div>
            )}
          </motion.div>

          {/* Ingredient bowls */}
          <div className="relative grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 max-w-2xl mx-auto">
            {ingredients.map(ing => (
              <motion.button
                key={ing.id}
                whileHover={!ing.used ? { scale: 1.1 } : {}}
                whileTap={!ing.used ? { scale: 0.95 } : {}}
                onClick={() => handleSelect(ing)}
                disabled={ing.used}
                className={`aspect-square rounded-2xl border-2 flex items-center justify-center text-4xl sm:text-5xl font-bold transition-all ${
                  ing.used
                    ? "border-slate-600 bg-slate-800 text-slate-400 opacity-60"
                    : "border-amber-300 bg-gradient-to-br from-amber-700 to-rose-700 text-white hover:border-amber-100 shadow-[0_0_14px_rgba(251,191,36,0.5)]"
                }`}
              >
                {ing.char}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Leaderboard sidebar */}
        <aside className="rounded-2xl border-2 border-amber-500/40 bg-slate-900 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white">{t("Bảng xếp hạng", "Leaderboard")}</h3>
          </div>
          <p className="text-xs text-amber-200/70 mb-2 font-mono uppercase">Hotpot · {difficulty}</p>
          <GameLeaderboard gameType={`hotpot_chef_${difficulty}`} currentScore={score} />
        </aside>
      </div>

      <Button variant="outline" onClick={onExit} className="w-full bg-slate-900 border-amber-500/60 text-amber-200 hover:bg-slate-800 hover:text-white">
        <ArrowLeft className="w-4 h-4 mr-2" /> {t("Về menu game", "Back to game menu")}
      </Button>
    </div>
  );
};

// ============================================================
// GAME 3: Pinyin Runner (Tone Reflex)
// ============================================================
const TONE_MARKS = ["ˉ", "ˊ", "ˇ", "ˋ"];

const PinyinRunner = ({ difficulty, onExit }: { difficulty: Difficulty; onExit: () => void }) => {
  const { t } = useLanguage();
  // Pick only single-character + single-syllable words so the tone target is unambiguous
  const singleTone = useMemo(
    () =>
      wordsForDifficulty(difficulty).filter(w => {
        if (Array.from(w.character).length !== 1) return false;
        const tones = extractTones(w.pinyin);
        return tones.length === 1 && TONE_MARKS.includes(tones[0]);
      }),
    [difficulty]
  );
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [currentWord, setCurrentWord] = useState<HskWord | null>(null);
  const [trackTones, setTrackTones] = useState<string[]>([]);
  const [playerTrack, setPlayerTrack] = useState(1); // 0-3
  const [gameOver, setGameOver] = useState(false);
  const [flashCorrect, setFlashCorrect] = useState(false);
  const [flashWrong, setFlashWrong] = useState(false);

  const loadNewWord = useCallback(() => {
    if (singleTone.length === 0) return;
    const w = singleTone[Math.floor(Math.random() * singleTone.length)];
    setCurrentWord(w);
    // Shuffle tone marks across 4 tracks
    setTrackTones(shuffle(TONE_MARKS));
  }, [singleTone]);

  useEffect(() => {
    loadNewWord();
  }, [loadNewWord]);

  useEffect(() => {
    setLevel(Math.floor(score / 60) + 1);
  }, [score]);

  const submitChoice = useCallback(
    (trackIdx: number) => {
      if (!currentWord) return;
      const correctTone = extractTones(currentWord.pinyin)[0];
      const chosenTone = trackTones[trackIdx];
      if (chosenTone === correctTone) {
        setScore(s => s + 15 * combo);
        setCombo(c => Math.min(c + 1, 10));
        setFlashCorrect(true);
        speakChinese(currentWord.character);
        setTimeout(() => {
          setFlashCorrect(false);
          loadNewWord();
        }, 500);
      } else {
        setCombo(1);
        setFlashWrong(true);
        setLives(l => {
          const nl = l - 1;
          if (nl <= 0) setGameOver(true);
          return nl;
        });
        setTimeout(() => {
          setFlashWrong(false);
          loadNewWord();
        }, 600);
      }
    },
    [currentWord, trackTones, combo, loadNewWord]
  );

  // Keyboard controls (1-4 keys, or Arrow Left/Right to switch tracks then Enter)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= "1" && e.key <= "4") {
        const idx = parseInt(e.key, 10) - 1;
        setPlayerTrack(idx);
        submitChoice(idx);
      } else if (e.key === "ArrowLeft") {
        setPlayerTrack(p => Math.max(0, p - 1));
      } else if (e.key === "ArrowRight") {
        setPlayerTrack(p => Math.min(3, p + 1));
      } else if (e.key === "Enter" || e.key === " ") {
        submitChoice(playerTrack);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [submitChoice, playerTrack]);

  if (gameOver) return <GameOverScreen score={score} onRetry={() => window.location.reload()} onExit={onExit} />;
  if (!currentWord) return <p className="text-center p-8">Loading...</p>;

  // Build masked pinyin: replace vowels with _
  const maskedPinyin = currentWord.pinyin.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüaeiou]/g, "_");

  return (
    <div className="space-y-3 max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-2">
        <Button variant="outline" size="sm" onClick={onExit} className="bg-slate-900 border-pink-500/60 text-pink-200 hover:bg-slate-800 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-1" /> {t("Quay lại", "Back")}
        </Button>
        <span className="text-xs text-pink-300/80 font-mono uppercase tracking-wider">🐉 Pinyin Tone Runner</span>
      </div>
      <HUD score={score} combo={combo} level={level} lives={lives} />
      <div
        className={`relative rounded-2xl border-2 overflow-hidden bg-gradient-to-b from-slate-950 via-pink-950/30 to-slate-900 transition-colors ${
          flashCorrect ? "border-green-400 shadow-[0_0_30px_rgba(74,222,128,0.6)]" : flashWrong ? "border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.6)]" : "border-pink-500/40"
        }`}
        style={{ height: 520 }}
      >
        {/* Word display top */}
        <div className="absolute top-4 left-0 right-0 text-center z-10">
          <p className="text-5xl sm:text-6xl font-bold text-white drop-shadow-[0_0_10px_rgba(236,72,153,0.8)] mb-1">
            {currentWord.character}
          </p>
          <p className="text-xl font-mono text-pink-300 tracking-widest">{maskedPinyin}</p>
          <p className="text-xs text-pink-200/70 mt-1">{currentWord.definition.vi}</p>
        </div>

        {/* 4 vertical tracks with tone clouds */}
        <div className="absolute inset-0 grid grid-cols-4 pt-32">
          {trackTones.map((tone, idx) => (
            <button
              key={idx}
              onClick={() => submitChoice(idx)}
              className={`relative border-x border-pink-500/20 flex flex-col items-center justify-start pt-4 transition-colors ${
                playerTrack === idx ? "bg-pink-500/10" : "hover:bg-pink-500/5"
              }`}
            >
              {/* Tone cloud */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-3xl sm:text-4xl font-bold text-white shadow-[0_0_20px_rgba(236,72,153,0.6)] border-2 border-pink-200"
              >
                {tone}
              </motion.div>
              {/* Track number */}
              <span className="absolute bottom-24 text-xs text-pink-300 font-mono">{idx + 1}</span>
            </button>
          ))}
        </div>

        {/* Runner avatar */}
        <motion.div
          animate={{ x: `${playerTrack * 25 + 12.5}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute bottom-6 -translate-x-1/2 text-5xl"
        >
          🏃
        </motion.div>

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 shadow-[0_0_15px_rgba(236,72,153,0.6)]" />
      </div>

      {/* Mobile virtual controls */}
      <div className="grid grid-cols-4 gap-2">
        {[0, 1, 2, 3].map(i => (
          <Button
            key={i}
            onClick={() => submitChoice(i)}
            className="h-16 text-3xl font-bold bg-slate-800 hover:bg-pink-600 text-white border-2 border-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.4)]"
          >
            {trackTones[i]}
          </Button>
        ))}
      </div>
      <p className="text-xs text-center text-muted-foreground">
        {t("Phím 1-4 hoặc bấm vào ô có dấu thanh đúng", "Press 1-4 or tap the track with the correct tone")}
      </p>
      <Button variant="outline" onClick={onExit} className="w-full">
        <ArrowLeft className="w-4 h-4 mr-2" /> {t("Thoát", "Exit")}
      </Button>
    </div>
  );
};

// ============================================================
// Game Over Screen
// ============================================================
const GameOverScreen = ({ score, onRetry, onExit }: { score: number; onRetry: () => void; onExit: () => void }) => {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl border-2 border-rose-500/40 bg-gradient-to-b from-slate-950 to-rose-950/30 p-8 text-center"
    >
      <div className="text-6xl mb-4">💀</div>
      <h3 className="text-3xl font-bold text-rose-400 mb-2">GAME OVER</h3>
      <p className="text-cyan-300 font-mono text-xl mb-6">SCORE: {score}</p>
      <div className="flex gap-3 justify-center">
        <Button onClick={onRetry} className="bg-cyan-500 hover:bg-cyan-600">
          <Zap className="w-4 h-4 mr-2" /> {t("Chơi lại", "Play Again")}
        </Button>
        <Button variant="outline" onClick={onExit}>
          <ArrowLeft className="w-4 h-4 mr-2" /> {t("Về menu", "To Menu")}
        </Button>
      </div>
    </motion.div>
  );
};

// ============================================================
// MAIN PAGE - Hub Menu
// ============================================================
const ChineseArcade = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState<GameId>("menu");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  const games = [
    {
      id: "shooter" as const,
      icon: <Rocket className="w-7 h-7" />,
      chibi: "👾",
      title: t("Hanzi Space Shooter", "Hanzi Space Shooter"),
      desc: t("Gõ Pinyin để bắn hạ thiên thạch Hán tự đang rơi!", "Type Pinyin to shoot down falling Hanzi meteorites!"),
      color: "from-cyan-500 to-blue-600",
      glow: "shadow-[0_0_30px_rgba(6,182,212,0.4)]",
    },
    {
      id: "hotpot" as const,
      icon: <ChefHat className="w-7 h-7" />,
      chibi: "🐼",
      title: t("Hanzi Hotpot Chef", "Hanzi Hotpot Chef"),
      desc: t("Ghép các ký tự thành từ ghép tiếng Trung trong nồi lẩu!", "Combine characters to form compound words in the hotpot!"),
      color: "from-amber-500 to-rose-600",
      glow: "shadow-[0_0_30px_rgba(251,191,36,0.4)]",
    },
    {
      id: "runner" as const,
      icon: <Footprints className="w-7 h-7" />,
      chibi: "🐉",
      title: t("Pinyin Tone Runner", "Pinyin Tone Runner"),
      desc: t("Chạy vào làn có dấu thanh đúng. Phản xạ là tất cả!", "Run into the track with the correct tone mark. Reflexes are everything!"),
      color: "from-pink-500 to-purple-600",
      glow: "shadow-[0_0_30px_rgba(236,72,153,0.4)]",
    },
    {
      id: "meteor" as const,
      icon: <Sparkles className="w-7 h-7" />,
      chibi: "🐲",
      title: t("Word Meteor (中文)", "Word Meteor (中文)"),
      desc: t("Bắn nghĩa đúng cho thiên thạch Hán tự + Pinyin đang rơi.", "Tap the correct meaning of falling Hanzi + Pinyin meteors."),
      color: "from-red-500 to-orange-600",
      glow: "shadow-[0_0_30px_rgba(239,68,68,0.4)]",
    },
  ];

  // Floating background hanzi characters for the hub
  const floatHanzi = ["学", "中", "文", "你", "好", "汉", "字", "拼", "音", "龙", "福", "爱", "家", "天", "山", "水"];

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      <SEO
        title="Chinese Arcade: 3 Game Học Tiếng Trung HSK | HaiEduTech"
        description="Bộ 3 mini-game tiếng Trung phong cách cyberpunk-arcade: Space Shooter Pinyin, Hotpot Chef ghép từ ghép, Pinyin Tone Runner luyện phản xạ thanh điệu."
        path="/chinese/arcade"
      />
      <Navbar />
      {/* Floating hanzi background (visual only) */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden>
        {floatHanzi.map((ch, i) => (
          <motion.span
            key={i}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ y: "-15vh", opacity: [0, 0.12, 0.12, 0] }}
            transition={{ duration: 18 + (i % 6) * 3, repeat: Infinity, delay: i * 1.6, ease: "linear" }}
            className="absolute text-7xl sm:text-8xl font-bold text-cyan-300/20 select-none"
            style={{ left: `${(i * 11 + 4) % 94}%` }}
          >
            {ch}
          </motion.span>
        ))}
      </div>
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {active === "menu" && (
          <>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3">
                <Trophy className="w-4 h-4" /> CHINESE ARCADE HUB
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-400 bg-clip-text text-transparent mb-2">
                {t("Trung tâm trò chơi tiếng Trung", "Chinese Vocabulary Arcade")}
              </h1>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                {t("3 mini-game arcade luyện Hanzi, Pinyin và thanh điệu theo phong cách neon-cyberpunk.", "3 neon-cyberpunk arcade mini-games to drill Hanzi, Pinyin, and tones.")}
              </p>
            </motion.div>

            {/* Difficulty selector */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              <Button
                onClick={() => setDifficulty("easy")}
                size="sm"
                className={
                  difficulty === "easy"
                    ? "bg-cyan-500 hover:bg-cyan-600 text-white border-2 border-cyan-300"
                    : "bg-slate-800 text-cyan-100 border-2 border-cyan-400/60 hover:bg-slate-700 hover:text-white"
                }
              >
                HSK 1-2 · {t("Dễ", "Easy")}
              </Button>
              <Button
                onClick={() => setDifficulty("hard")}
                size="sm"
                className={
                  difficulty === "hard"
                    ? "bg-pink-500 hover:bg-pink-600 text-white border-2 border-pink-300"
                    : "bg-slate-800 text-pink-100 border-2 border-pink-400/60 hover:bg-slate-700 hover:text-white"
                }
              >
                HSK 3-4 · {t("Khó", "Hard")}
              </Button>
              <Button
                onClick={() => setDifficulty("expert")}
                size="sm"
                className={
                  difficulty === "expert"
                    ? "bg-amber-500 hover:bg-amber-600 text-white border-2 border-amber-300"
                    : "bg-slate-800 text-amber-100 border-2 border-amber-400/60 hover:bg-slate-700 hover:text-white"
                }
              >
                HSK 5-6 · {t("Chuyên gia", "Expert")}
              </Button>
            </div>

            {/* Game cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {games.map((g, i) => (
                <motion.button
                  key={g.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActive(g.id)}
                  className={`relative overflow-hidden p-6 min-h-[240px] rounded-2xl border-2 border-slate-700 bg-slate-900 text-left transition-all hover:border-cyan-500/50 hover:${g.glow}`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${g.color} rounded-t-2xl`} />
                  <motion.div
                    animate={{ y: [0, -6, 0], rotate: [-3, 3, -3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -bottom-2 -right-2 text-7xl drop-shadow-2xl select-none opacity-90"
                    aria-hidden
                  >
                    {g.chibi}
                  </motion.div>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${g.color} flex items-center justify-center text-white mb-4`}>
                    {g.icon}
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2 leading-tight">{g.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-[75%]">{g.desc}</p>
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">▶ PLAY</div>
                </motion.button>
              ))}
            </div>

            <div className="mt-6 text-center text-xs text-slate-500">
              {isTouchDevice()
                ? t("📱 Chế độ cảm ứng đã bật - chạm để chơi", "📱 Touch mode enabled - tap to play")
                : t("⌨️ Phím Pinyin (Shooter) · Click (Hotpot) · Phím 1-4 (Runner)", "⌨️ Type Pinyin (Shooter) · Click (Hotpot) · Press 1-4 (Runner)")}
            </div>
          </>
        )}

        {active === "shooter" && <SpaceShooter difficulty={difficulty} onExit={() => setActive("menu")} />}
        {active === "hotpot" && <HotpotChef difficulty={difficulty} onExit={() => setActive("menu")} />}
        {active === "runner" && <PinyinRunner difficulty={difficulty} onExit={() => setActive("menu")} />}
        {active === "meteor" && (
          <div className="max-w-6xl mx-auto">
            <WordMeteor
              lang="zh"
              difficulty={difficulty}
              gameType={`meteor_zh_${difficulty}`}
              customBank={wordsForDifficulty(difficulty).map(w => ({
                word: `${w.character} ${w.pinyin}`,
                meaning: w.definition.vi,
              }))}
              onExit={() => setActive("menu")}
            />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ChineseArcade;
