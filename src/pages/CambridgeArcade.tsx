/**
 * @file CambridgeArcade.tsx
 * @description Cambridge Kids Arcade — 3 colourful mini-games for kids
 * studying Cambridge YLE (Starters/Movers/Flyers) and Cambridge English
 * Qualifications (KET/PET). Vibrant, playful, mobile-first design.
 * Games:
 *   1) 🎈 Balloon Pop — tap the balloon whose English matches the prompt.
 *   2) 🔤 Spelling Bee — drag/tap letters to unscramble a word.
 *   3) 🃏 Memory Match — flip cards to pair English ↔ Emoji.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Heart, Trophy, Sparkles, Star, Volume2,
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

// ─────────────────────────────────────────────────────────────
// GAME 1 — Balloon Pop
// ─────────────────────────────────────────────────────────────
function BalloonPop({ level, onExit }: { level: CambridgeKidsLevel; onExit: () => void }) {
  const pool = useMemo(
    () => CAMBRIDGE_KIDS_WORDS.filter(w => w.level === level),
    [level]
  );
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [round, setRound] = useState(0);
  const [target, setTarget] = useState<CambridgeKidsWord | null>(null);
  const [choices, setChoices] = useState<CambridgeKidsWord[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const nextRound = () => {
    if (pool.length < 4) return;
    const t = pool[Math.floor(Math.random() * pool.length)];
    const distractors = shuffle(pool.filter(w => w.word !== t.word)).slice(0, 3);
    setChoices(shuffle([t, ...distractors]));
    setTarget(t);
    setFeedback(null);
    setRound(r => r + 1);
    speakEn(t.word);
  };

  useEffect(() => { nextRound(); /* eslint-disable-next-line */ }, []);

  const handlePick = (w: CambridgeKidsWord) => {
    if (!target || feedback) return;
    if (w.word === target.word) {
      setScore(s => s + 10);
      setFeedback("correct");
      setTimeout(nextRound, 800);
    } else {
      setLives(l => l - 1);
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 700);
    }
  };

  const gameOver = lives <= 0;

  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-sky-300 via-cyan-200 to-emerald-200 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 rounded-3xl p-4 sm:p-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <Button variant="secondary" size="sm" onClick={onExit}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Exit
        </Button>
        <div className="flex items-center gap-3">
          <Badge className="bg-yellow-400 text-yellow-950 text-base">
            <Trophy className="w-4 h-4 mr-1" /> {score}
          </Badge>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Heart
                key={i}
                className={`w-5 h-5 ${i < lives ? "fill-rose-500 text-rose-500" : "text-rose-200"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {gameOver ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-3">🎈</div>
          <h3 className="text-2xl font-bold text-foreground">Game Over!</h3>
          <p className="text-muted-foreground mb-4">Final score: {score}</p>
          <Button onClick={() => { setScore(0); setLives(5); nextRound(); }}>
            Play again
          </Button>
        </div>
      ) : target && (
        <>
          <div className="text-center mb-6">
            <p className="text-sm text-foreground/70 mb-1">Pop the balloon for:</p>
            <button
              onClick={() => speakEn(target.word)}
              className="inline-flex items-center gap-2 text-3xl sm:text-4xl font-extrabold text-foreground hover:scale-105 transition"
            >
              <Volume2 className="w-7 h-7 text-primary" />
              <span className="capitalize">{target.vi}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <AnimatePresence>
              {choices.map((w, idx) => (
                <motion.button
                  key={`${round}-${w.word}`}
                  layout
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -100, opacity: 0, scale: 0.5 }}
                  transition={{ delay: idx * 0.05, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePick(w)}
                  className={`relative aspect-[4/5] rounded-[50%_50%_50%_50%/45%_45%_55%_55%] bg-gradient-to-b ${LEVEL_COLOR[w.level]} shadow-2xl flex flex-col items-center justify-center gap-2 p-3 border-4 border-white/40`}
                >
                  <span className="text-5xl drop-shadow-lg">{w.emoji}</span>
                  <span className="text-base sm:text-lg font-extrabold text-white drop-shadow capitalize text-center leading-tight">
                    {w.word}
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
            >
              ✨
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// GAME 2 — Spelling Bee
// ─────────────────────────────────────────────────────────────
function SpellingBee({ level, onExit }: { level: CambridgeKidsLevel; onExit: () => void }) {
  const pool = useMemo(
    () => CAMBRIDGE_KIDS_WORDS.filter(w => w.level === level && /^[a-z ]+$/i.test(w.word)),
    [level]
  );
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [current, setCurrent] = useState<CambridgeKidsWord | null>(null);
  const [letters, setLetters] = useState<{ ch: string; used: boolean }[]>([]);
  const [typed, setTyped] = useState<string>("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const next = () => {
    if (!pool.length) return;
    const w = pool[Math.floor(Math.random() * pool.length)];
    const chars = w.word.replace(/\s+/g, "").split("");
    setCurrent(w);
    setLetters(shuffle(chars).map(ch => ({ ch, used: false })));
    setTyped("");
    setFeedback(null);
    setRound(r => r + 1);
    speakEn(w.word);
  };

  useEffect(() => { next(); /* eslint-disable-next-line */ }, []);

  const pick = (idx: number) => {
    if (!letters[idx] || letters[idx].used || feedback) return;
    const newLetters = letters.map((l, i) => i === idx ? { ...l, used: true } : l);
    const newTyped = typed + letters[idx].ch;
    setLetters(newLetters);
    setTyped(newTyped);
    if (current && newTyped.length === current.word.replace(/\s+/g, "").length) {
      if (newTyped.toLowerCase() === current.word.replace(/\s+/g, "").toLowerCase()) {
        setScore(s => s + 20);
        setFeedback("correct");
        setTimeout(next, 1000);
      } else {
        setFeedback("wrong");
        setTimeout(() => {
          setLetters(letters.map(l => ({ ...l, used: false })));
          setTyped("");
          setFeedback(null);
        }, 900);
      }
    }
  };

  const reset = () => {
    setLetters(letters.map(l => ({ ...l, used: false })));
    setTyped("");
  };

  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-amber-200 via-yellow-100 to-orange-200 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-950 rounded-3xl p-4 sm:p-6">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <Button variant="secondary" size="sm" onClick={onExit}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Exit
        </Button>
        <Badge className="bg-orange-500 text-white text-base">
          <Star className="w-4 h-4 mr-1" /> {score}
        </Badge>
      </div>

      {current && (
        <div className="text-center">
          <div className="text-7xl mb-2">{current.emoji}</div>
          <p className="text-sm text-foreground/70 mb-1">Spell this word!</p>
          <button
            onClick={() => speakEn(current.word)}
            className="inline-flex items-center gap-2 text-xl font-bold text-foreground/80 hover:text-primary"
          >
            <Volume2 className="w-5 h-5" />
            <span className="italic">({current.vi})</span>
          </button>

          {/* Typed slots */}
          <div className="flex flex-wrap justify-center gap-2 my-6 min-h-[60px]">
            {current.word.replace(/\s+/g, "").split("").map((_, i) => (
              <div
                key={i}
                className={`w-12 h-14 sm:w-14 sm:h-16 rounded-xl border-4 ${
                  feedback === "wrong" ? "border-rose-500 bg-rose-100" :
                  feedback === "correct" ? "border-emerald-500 bg-emerald-100" :
                  "border-orange-400 bg-white/80"
                } flex items-center justify-center text-2xl sm:text-3xl font-extrabold text-foreground`}
              >
                {typed[i] ?? ""}
              </div>
            ))}
          </div>

          {/* Letter palette */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {letters.map((l, i) => (
              <motion.button
                key={`${round}-${i}`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                disabled={l.used}
                onClick={() => pick(i)}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl text-2xl font-extrabold uppercase shadow-lg transition ${
                  l.used
                    ? "bg-muted text-muted-foreground/50 cursor-not-allowed"
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
  );
}

// ─────────────────────────────────────────────────────────────
// GAME 3 — Memory Match
// ─────────────────────────────────────────────────────────────
type Card = { id: number; key: string; face: "word" | "emoji"; word: CambridgeKidsWord; matched: boolean };

function MemoryMatch({ level, onExit }: { level: CambridgeKidsLevel; onExit: () => void }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);

  const setup = () => {
    const pool = shuffle(CAMBRIDGE_KIDS_WORDS.filter(w => w.level === level)).slice(0, 8);
    const deck: Card[] = [];
    pool.forEach((w, idx) => {
      deck.push({ id: idx * 2, key: w.word, face: "word", word: w, matched: false });
      deck.push({ id: idx * 2 + 1, key: w.word, face: "emoji", word: w, matched: false });
    });
    setCards(shuffle(deck));
    setFlipped([]);
    setMoves(0);
    setMatches(0);
  };

  useEffect(() => { setup(); /* eslint-disable-next-line */ }, [level]);

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

  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-purple-200 via-pink-100 to-rose-200 dark:from-purple-950 dark:via-fuchsia-950 dark:to-rose-950 rounded-3xl p-4 sm:p-6">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <Button variant="secondary" size="sm" onClick={onExit}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Exit
        </Button>
        <div className="flex gap-2">
          <Badge className="bg-purple-500 text-white">Moves: {moves}</Badge>
          <Badge className="bg-pink-500 text-white">Pairs: {matches}/{cards.length / 2}</Badge>
        </div>
      </div>

      {done && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center py-6">
          <div className="text-6xl">🏆</div>
          <h3 className="text-2xl font-bold">You did it in {moves} moves!</h3>
          <Button className="mt-3" onClick={setup}>Play again</Button>
        </motion.div>
      )}

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {cards.map(card => {
          const isFlipped = flipped.includes(card.id) || card.matched;
          return (
            <motion.button
              key={card.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => click(card.id)}
              className="relative aspect-square"
            >
              <div className={`absolute inset-0 rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}>
                {/* Back */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-3xl text-white shadow-lg [backface-visibility:hidden]">
                  ?
                </div>
                {/* Front */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${LEVEL_COLOR[card.word.level]} flex items-center justify-center p-1 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] ${card.matched ? "opacity-60" : ""}`}>
                  {card.face === "emoji" ? (
                    <span className="text-4xl sm:text-5xl">{card.word.emoji}</span>
                  ) : (
                    <span className="text-xs sm:text-sm font-bold text-white text-center capitalize leading-tight">{card.word.word}</span>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Hub
// ─────────────────────────────────────────────────────────────
type GameKey = "balloon" | "spelling" | "memory" | null;

const CambridgeArcade = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState<GameKey>(null);
  const [level, setLevel] = useState<CambridgeKidsLevel>("Starters");

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-pink-50 to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <SEO
        title="Cambridge Kids Arcade — Starters/Movers/Flyers/KET/PET"
        description="Fun mini-games for Cambridge English kids: Balloon Pop, Spelling Bee, Memory Match across Starters, Movers, Flyers, KET and PET levels."
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
              "Học từ vựng Cambridge YLE & KET/PET qua 3 trò chơi đầy màu sắc cho các bé.",
              "Learn Cambridge YLE & KET/PET vocabulary through 3 colourful mini-games for kids."
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

        {!active && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { key: "balloon" as const, emoji: "🎈", title: "Balloon Pop", desc: t("Nghe & nổ bóng đúng từ", "Listen & pop the right balloon"), color: "from-sky-400 to-cyan-500" },
              { key: "spelling" as const, emoji: "🔤", title: "Spelling Bee", desc: t("Ghép chữ cái để tạo từ", "Tap letters to spell the word"), color: "from-orange-400 to-amber-500" },
              { key: "memory" as const, emoji: "🃏", title: "Memory Match", desc: t("Lật thẻ ghép cặp từ ↔ emoji", "Flip cards to match word ↔ emoji"), color: "from-fuchsia-500 to-purple-600" },
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
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CambridgeArcade;
