/**
 * @file VietnameseArcade.tsx
 * @description Vietnamese Vocabulary Arcade Hub - 2 mini-games using daily
 * Vietnamese vocabulary (60+ entries). Lotus/bamboo aesthetic, fully responsive.
 * Games: (1) Phở Match - quickly match VI ↔ EN cards; (2) Bóng Nước Pop -
 * Vietnamese bubbles float up; tap the bubble whose English meaning matches
 * the prompt before time runs out.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Trophy, Sparkles, Soup, Droplets, Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { dailyMicroLessons } from "@/data/vietnamese/dailyVietnameseData";
import WordMeteor from "@/components/games/WordMeteor";
import { dailyMicroLessonsExpansion } from "@/data/vietnamese/dailyVietnameseExpansion";
import { dailyMicroLessonsV10 } from "@/data/vietnamese/expansionV10Practice";
import { finishGame, useGameAudioCleanup } from "@/lib/gameSession";

// ============================================================
// Vocab pool - uses ALL daily Vietnamese lessons (~60 entries)
// ============================================================
type Pair = { vi: string; en: string };

const VI_POOL: Pair[] = [...dailyMicroLessons, ...dailyMicroLessonsExpansion, ...dailyMicroLessonsV10]
  .map(l => ({ vi: String(l.word.vi).trim(), en: String(l.word.en).trim() }))
  .filter(p => p.vi && p.en);

const speakVi = (text: string) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "vi-VN";
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  } catch { /* noop */ }
};

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ============================================================
// HUD
// ============================================================
const HUD = ({ score, lives, combo }: { score: number; lives: number; combo: number }) => (
  <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-amber-50/90 dark:bg-amber-950/60 border border-amber-500/40 backdrop-blur-sm mb-3">
    <div className="flex items-center gap-3 text-sm font-mono">
      <span className="text-amber-700 dark:text-amber-300">ĐIỂM <span className="font-bold">{score}</span></span>
      <span className="text-rose-600 dark:text-rose-300">x{combo}</span>
    </div>
    <div className="flex items-center gap-1">
      {Array.from({ length: 3 }).map((_, i) => (
        <Heart key={i} className={`w-5 h-5 ${i < lives ? "text-rose-500 fill-rose-500" : "text-slate-300"}`} />
      ))}
    </div>
  </div>
);

// ============================================================
// GAME 1: Phở Match - pair VI ↔ EN cards
// ============================================================
const PhoMatch = ({ onExit }: { onExit: () => void }) => {
  const { t } = useLanguage();
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(1);
  const [picked, setPicked] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [gameOver, setGameOver] = useState(false);
  const correctRef = useRef<string[]>([]);
  const savedRef = useRef(false);
  useGameAudioCleanup();

  // Save the run once when it ends, and feed matched words to the brain
  useEffect(() => {
    if (gameOver && !savedRef.current) {
      savedRef.current = true;
      void finishGame({
        gameType: "vi_pho_match",
        score,
        maxStreak: combo,
        subject: "vietnamese",
        correctWords: correctRef.current,
      });
    }
  }, [gameOver, score, combo]);

  const cards = useMemo(() => {
    const pairs = shuffle(VI_POOL).slice(0, 6);
    const items = [
      ...pairs.map(p => ({ id: `vi-${p.vi}`, key: p.vi, label: p.vi, kind: "vi" as const })),
      ...pairs.map(p => ({ id: `en-${p.vi}`, key: p.vi, label: p.en, kind: "en" as const })),
    ];
    return shuffle(items);
  }, [round]);

  useEffect(() => {
    if (matched.size === 12) {
      setTimeout(() => {
        setMatched(new Set());
        setRound(r => r + 1);
        setScore(s => s + 50 * combo);
        setCombo(c => c + 1);
      }, 800);
    }
  }, [matched, combo]);

  const pick = (card: { id: string; key: string; label: string; kind: "vi" | "en" }) => {
    if (matched.has(card.id) || wrong) return;
    if (card.kind === "vi") speakVi(card.label);
    if (!picked) { setPicked(card.id); return; }
    if (picked === card.id) { setPicked(null); return; }
    // Check if pair (same key, different kind)
    const otherKey = picked.replace(/^vi-|^en-/, "");
    if (otherKey === card.key && picked.slice(0, 3) !== card.id.slice(0, 3)) {
      setMatched(prev => new Set([...prev, picked, card.id]));
      setScore(s => s + 10 * combo);
      correctRef.current.push(card.key);
      setPicked(null);
    } else {
      setWrong(card.id);
      setLives(l => {
        const nl = l - 1;
        if (nl <= 0) setGameOver(true);
        return nl;
      });
      setCombo(1);
      setTimeout(() => { setWrong(null); setPicked(null); }, 600);
    }
  };

  if (gameOver) {
    return (
      <div className="text-center py-10">
        <Trophy className="w-16 h-16 mx-auto text-amber-500 mb-3" />
        <h2 className="text-2xl font-bold mb-2">{t("Hết lượt!", "Game Over!")}</h2>
        <p className="text-muted-foreground mb-4">{t(`Điểm: ${score}`, `Score: ${score}`)}</p>
        <div className="flex gap-2 justify-center">
          <Button onClick={() => { savedRef.current = false; correctRef.current = []; setScore(0); setLives(3); setCombo(1); setRound(r => r + 1); setMatched(new Set()); setGameOver(false); }}>
            {t("Chơi lại", "Play Again")}
          </Button>
          <Button variant="outline" onClick={onExit}>{t("Thoát", "Exit")}</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HUD score={score} lives={lives} combo={combo} />
      <Button variant="ghost" size="sm" onClick={onExit} className="mb-2"><ArrowLeft className="w-4 h-4 mr-1" /> {t("Thoát", "Exit")}</Button>
      <p className="text-xs text-center text-muted-foreground mb-3">
        {t("Ghép thẻ Tiếng Việt với nghĩa Tiếng Anh tương ứng.", "Match each Vietnamese card with its English meaning.")}
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
        {cards.map(c => {
          const isMatched = matched.has(c.id);
          const isPicked = picked === c.id;
          const isWrong = wrong === c.id;
          return (
            <motion.button
              key={c.id}
              whileTap={{ scale: 0.95 }}
              animate={isWrong ? { x: [-5, 5, -5, 5, 0] } : {}}
              onClick={() => pick(c)}
              disabled={isMatched}
              className={`relative aspect-[4/3] rounded-xl border-2 p-2 text-center text-xs sm:text-sm font-semibold transition-all
                ${isMatched ? "bg-emerald-500/20 border-emerald-500 text-emerald-700 dark:text-emerald-300 opacity-60" : ""}
                ${isPicked ? "bg-amber-400/30 border-amber-500 scale-105" : ""}
                ${isWrong ? "bg-rose-500/30 border-rose-500" : ""}
                ${!isMatched && !isPicked && !isWrong ? "bg-gradient-to-br from-amber-50 to-rose-50 dark:from-amber-950/30 dark:to-rose-950/30 border-amber-300/50 hover:border-amber-500" : ""}
              `}
            >
              <div className="absolute top-1 left-1 text-[9px] font-mono opacity-60">
                {c.kind === "vi" ? "VI" : "EN"}
              </div>
              <span className="block break-words leading-tight">{c.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================
// GAME 2: Bóng Nước Pop - bubble shooter
// ============================================================
type Bubble = { id: number; pair: Pair; x: number; y: number };

const BongNuocPop = ({ onExit }: { onExit: () => void }) => {
  const { t } = useLanguage();
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [target, setTarget] = useState<Pair | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const idRef = useRef(0);
  const correctRef = useRef<string[]>([]);
  const savedRef = useRef(false);
  useGameAudioCleanup();

  useEffect(() => {
    if (gameOver && !savedRef.current) {
      savedRef.current = true;
      void finishGame({
        gameType: "vi_bong_nuoc_pop",
        score,
        maxStreak: combo,
        subject: "vietnamese",
        correctWords: correctRef.current,
      });
    }
  }, [gameOver, score, combo]);

  // Spawn a fresh target + 4 distractor bubbles
  const newRound = () => {
    const pool = shuffle(VI_POOL).slice(0, 5);
    const correct = pool[0];
    setTarget(correct);
    setBubbles(pool.map((p, i) => ({
      id: idRef.current++,
      pair: p,
      x: 10 + (i * 80) / 4 + Math.random() * 10,
      y: 100,
    })));
  };

  useEffect(() => { newRound(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  // Float bubbles upward
  useEffect(() => {
    if (gameOver) return;
    const id = setInterval(() => {
      setBubbles(prev => {
        const next = prev.map(b => ({ ...b, y: b.y - 1.2 }));
        if (next.some(b => b.y < -10)) {
          // Missed the target
          setLives(l => {
            const nl = l - 1;
            if (nl <= 0) setGameOver(true);
            return nl;
          });
          setCombo(1);
          setTimeout(() => { if (!gameOver) newRound(); }, 200);
          return [];
        }
        return next;
      });
    }, 60);
    return () => clearInterval(id);
  }, [gameOver]);

  const pop = (b: Bubble) => {
    if (!target) return;
    if (b.pair.vi === target.vi) {
      speakVi(b.pair.vi);
      setScore(s => s + 15 * combo);
      setCombo(c => Math.min(c + 1, 10));
      correctRef.current.push(b.pair.vi);
      newRound();
    } else {
      setLives(l => {
        const nl = l - 1;
        if (nl <= 0) setGameOver(true);
        return nl;
      });
      setCombo(1);
    }
  };

  if (gameOver) {
    return (
      <div className="text-center py-10">
        <Trophy className="w-16 h-16 mx-auto text-cyan-500 mb-3" />
        <h2 className="text-2xl font-bold mb-2">{t("Hết lượt!", "Game Over!")}</h2>
        <p className="text-muted-foreground mb-4">{t(`Điểm: ${score}`, `Score: ${score}`)}</p>
        <div className="flex gap-2 justify-center">
          <Button onClick={() => { savedRef.current = false; correctRef.current = []; setScore(0); setLives(3); setCombo(1); setGameOver(false); newRound(); }}>
            {t("Chơi lại", "Play Again")}
          </Button>
          <Button variant="outline" onClick={onExit}>{t("Thoát", "Exit")}</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HUD score={score} lives={lives} combo={combo} />
      <Button variant="ghost" size="sm" onClick={onExit} className="mb-2"><ArrowLeft className="w-4 h-4 mr-1" /> {t("Thoát", "Exit")}</Button>
      <div className="rounded-xl border-2 border-cyan-500/40 bg-gradient-to-b from-sky-100 via-cyan-50 to-emerald-50 dark:from-sky-950/40 dark:via-cyan-950/40 dark:to-emerald-950/40 p-3 mb-3 text-center">
        <p className="text-xs text-muted-foreground mb-1">{t("Chạm vào quả bóng có chữ Việt đúng nghĩa với:", "Tap the bubble whose Vietnamese matches:")}</p>
        <p className="text-xl sm:text-2xl font-bold text-cyan-700 dark:text-cyan-300">{target?.en}</p>
      </div>
      <div className="relative w-full h-[420px] sm:h-[480px] rounded-xl overflow-hidden bg-gradient-to-b from-cyan-200/60 via-sky-100 to-emerald-100 dark:from-cyan-950/60 dark:via-sky-950/40 dark:to-emerald-950/40 border-2 border-cyan-500/30">
        {bubbles.map(b => (
          <motion.button
            key={b.id}
            onClick={() => pop(b)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.85 }}
            className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-white/90 to-cyan-300/80 dark:from-cyan-300/50 dark:to-cyan-500/50 border-2 border-white/80 shadow-lg flex items-center justify-center text-center text-xs sm:text-sm font-bold text-cyan-900 backdrop-blur-sm"
            style={{ left: `${b.x}%`, bottom: `${b.y}%` }}
          >
            <span className="px-1 break-words leading-tight">{b.pair.vi}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// HUB
// ============================================================
type GameId = "menu" | "match" | "bubble" | "meteor";

const VietnameseArcade = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState<GameId>("menu");

  const games = [
    {
      id: "match" as const,
      icon: <Soup className="w-7 h-7" />,
      chibi: "🐉",
      title: t("Phở Match", "Phở Match"),
      desc: t("Ghép thẻ Tiếng Việt với nghĩa Tiếng Anh.", "Match Vietnamese cards with their English meanings."),
      color: "from-amber-500 to-rose-600",
    },
    {
      id: "bubble" as const,
      icon: <Droplets className="w-7 h-7" />,
      chibi: "🐢",
      title: t("Bóng Nước Pop", "Bubble Pop"),
      desc: t("Đập bóng có nghĩa khớp với từ Tiếng Anh được hỏi.", "Pop the bubble that matches the English prompt."),
      color: "from-cyan-500 to-emerald-600",
    },
    {
      id: "meteor" as const,
      icon: <Rocket className="w-7 h-7" />,
      chibi: "🪷",
      title: t("Word Meteor (Tiếng Việt)", "Word Meteor (Vietnamese)"),
      desc: t("Bắn nghĩa tiếng Anh đúng cho thiên thạch Tiếng Việt đang rơi.", "Tap the correct English meaning of falling Vietnamese meteors."),
      color: "from-red-500 to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-background to-rose-50/40 dark:from-amber-950/20 dark:via-background dark:to-rose-950/20">
      <SEO
        title="Vietnamese Arcade - Trò chơi học Tiếng Việt | HaiEduTech"
        description="Mini-games học từ vựng Tiếng Việt theo phong cách lotus arcade: Phở Match và Bóng Nước Pop, hỗ trợ phát âm vi-VN, hoàn toàn responsive."
        path="/learn-vietnamese/arcade"
      />
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {active === "menu" && (
          <>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-700 dark:text-amber-300 text-xs font-mono mb-3">
                <Sparkles className="w-4 h-4" /> VIETNAMESE ARCADE HUB
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-500 bg-clip-text text-transparent mb-2">
                🪷 {t("Trung tâm trò chơi Tiếng Việt", "Vietnamese Vocabulary Arcade")}
              </h1>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                {t("Mini-game luyện từ vựng Tiếng Việt với phát âm tự động.", "Mini-games to drill Vietnamese vocabulary with built-in pronunciation.")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {games.map((g, i) => (
                <motion.button
                  key={g.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActive(g.id)}
                  className="relative overflow-hidden p-5 min-h-[180px] rounded-2xl border-2 border-amber-300/40 bg-gradient-to-br from-white to-amber-50/40 dark:from-slate-900 dark:to-amber-950/30 text-left transition-all hover:border-amber-500/70 hover:shadow-xl"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${g.color} rounded-t-2xl`} />
                  <motion.div
                    animate={{ y: [0, -6, 0], rotate: [-3, 3, -3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -bottom-2 -right-2 text-6xl drop-shadow-xl select-none opacity-90"
                    aria-hidden
                  >
                    {g.chibi}
                  </motion.div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${g.color} flex items-center justify-center text-white mb-3`}>
                    {g.icon}
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{g.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-[75%]">{g.desc}</p>
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] font-mono">▶ PLAY</div>
                </motion.button>
              ))}
            </div>

            <div className="mt-6 text-center text-xs text-muted-foreground">
              {t("📱 Hoàn toàn responsive · Phát âm tự động bằng vi-VN", "📱 Fully responsive · Auto-pronunciation in vi-VN")}
            </div>
          </>
        )}

        <AnimatePresence mode="wait">
          {active === "match" && <PhoMatch onExit={() => setActive("menu")} />}
          {active === "bubble" && <BongNuocPop onExit={() => setActive("menu")} />}
          {active === "meteor" && (
            <div className="max-w-3xl mx-auto">
              <WordMeteor lang="vi" onExit={() => setActive("menu")} />
            </div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default VietnameseArcade;
