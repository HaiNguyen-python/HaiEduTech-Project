/**
 * @file EnglishArcade.tsx
 * @description English Vocabulary Arcade Hub - 3 mini-games (Synonym Sprint,
 * Spelling Bee, Word Builder) for learners of all levels.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trophy, Zap, Heart, Sparkles, Volume2, Type, BookOpen, Brain, Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import WordMeteor from "@/components/games/WordMeteor";

type GameId = "menu" | "synonym" | "spelling" | "builder" | "meteor";

interface WordItem {
  word: string;
  vi: string;
  synonym: string;
  emoji: string;
  level: "A1" | "A2" | "B1" | "B2";
}

// Curated bilingual EN bank for arcade play
const EN_WORDS: WordItem[] = [
  { word: "happy", vi: "vui vẻ", synonym: "joyful", emoji: "😊", level: "A1" },
  { word: "sad", vi: "buồn", synonym: "unhappy", emoji: "😢", level: "A1" },
  { word: "big", vi: "to lớn", synonym: "large", emoji: "🐘", level: "A1" },
  { word: "small", vi: "nhỏ", synonym: "tiny", emoji: "🐭", level: "A1" },
  { word: "fast", vi: "nhanh", synonym: "quick", emoji: "⚡", level: "A1" },
  { word: "slow", vi: "chậm", synonym: "sluggish", emoji: "🐢", level: "A2" },
  { word: "smart", vi: "thông minh", synonym: "clever", emoji: "🧠", level: "A2" },
  { word: "brave", vi: "dũng cảm", synonym: "courageous", emoji: "🦁", level: "A2" },
  { word: "begin", vi: "bắt đầu", synonym: "start", emoji: "🚀", level: "A2" },
  { word: "end", vi: "kết thúc", synonym: "finish", emoji: "🏁", level: "A2" },
  { word: "help", vi: "giúp đỡ", synonym: "assist", emoji: "🤝", level: "A2" },
  { word: "important", vi: "quan trọng", synonym: "crucial", emoji: "⭐", level: "B1" },
  { word: "ancient", vi: "cổ xưa", synonym: "old", emoji: "🏛️", level: "B1" },
  { word: "huge", vi: "khổng lồ", synonym: "enormous", emoji: "🐋", level: "B1" },
  { word: "tiny", vi: "bé tí", synonym: "minute", emoji: "🐜", level: "B1" },
  { word: "wealthy", vi: "giàu có", synonym: "rich", emoji: "💰", level: "B1" },
  { word: "powerful", vi: "mạnh mẽ", synonym: "strong", emoji: "💪", level: "B1" },
  { word: "beautiful", vi: "xinh đẹp", synonym: "gorgeous", emoji: "🌸", level: "B1" },
  { word: "difficult", vi: "khó", synonym: "hard", emoji: "🧩", level: "B1" },
  { word: "essential", vi: "thiết yếu", synonym: "vital", emoji: "🔑", level: "B2" },
  { word: "abundant", vi: "dồi dào", synonym: "plentiful", emoji: "🌾", level: "B2" },
  { word: "deliberate", vi: "cố ý", synonym: "intentional", emoji: "🎯", level: "B2" },
  { word: "fragile", vi: "dễ vỡ", synonym: "delicate", emoji: "🪞", level: "B2" },
  { word: "intricate", vi: "phức tạp", synonym: "complex", emoji: "🕸️", level: "B2" },
  { word: "magnificent", vi: "tráng lệ", synonym: "splendid", emoji: "🏰", level: "B2" },
];

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const speakEnglish = (text: string) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
};

// ============================================================
// GAME 1: Synonym Sprint - pick the matching synonym in under 8s
// ============================================================
const SynonymSprint = ({ onScore }: { onScore: (n: number) => void }) => {
  const { t } = useLanguage();
  const [idx, setIdx] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(8);
  const [feedback, setFeedback] = useState<"ok" | "err" | null>(null);
  const pool = useMemo(() => shuffle(EN_WORDS).slice(0, 12), []);
  const current = pool[idx];
  const options = useMemo(() => {
    if (!current) return [];
    const wrong = shuffle(EN_WORDS.filter(w => w.word !== current.word)).slice(0, 3).map(w => w.synonym);
    return shuffle([current.synonym, ...wrong]);
  }, [current]);

  useEffect(() => {
    if (lives <= 0 || idx >= pool.length) return;
    setTimer(8);
    const interval = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000);
    const timeout = setTimeout(() => { setLives(l => l - 1); setFeedback("err"); setTimeout(next, 700); }, 8000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, lives]);

  const next = () => {
    setFeedback(null);
    setIdx(i => i + 1);
  };

  const pick = (opt: string) => {
    if (feedback) return;
    if (opt === current.synonym) {
      setScore(s => s + 10);
      setFeedback("ok");
      onScore(10);
    } else {
      setLives(l => l - 1);
      setFeedback("err");
    }
    setTimeout(next, 700);
  };

  if (lives <= 0 || idx >= pool.length) {
    return (
      <div className="text-center py-10 space-y-4">
        <div className="text-6xl">{lives <= 0 ? "💔" : "🏆"}</div>
        <h3 className="text-2xl font-bold">{t("Kết quả", "Result")}: {score} XP</h3>
        <Button onClick={() => { setIdx(0); setLives(3); setScore(0); }} className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
          {t("Chơi lại", "Play again")}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm font-mono">
        <div className="flex items-center gap-1 text-rose-400">{Array.from({ length: 3 }).map((_, i) => <Heart key={i} className={`w-4 h-4 ${i < lives ? "fill-current" : "opacity-30"}`} />)}</div>
        <div className="text-amber-400">⚡ {score} XP</div>
        <div className="text-cyan-400">⏱ {timer}s</div>
      </div>
      <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border-2 border-violet-500/40 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 p-8 text-center">
        <div className="text-6xl mb-2">{current.emoji}</div>
        <div className="text-3xl font-bold text-foreground mb-1">{current.word}</div>
        <Button variant="ghost" size="sm" onClick={() => speakEnglish(current.word)} className="text-violet-400">
          <Volume2 className="w-4 h-4 mr-1" /> {t("Nghe", "Listen")}
        </Button>
        <div className="text-sm text-muted-foreground mt-1">{t("Chọn từ đồng nghĩa", "Pick the synonym")}</div>
      </motion.div>
      <div className="grid grid-cols-2 gap-3">
        {options.map(opt => (
          <button key={opt} onClick={() => pick(opt)}
            className={`px-4 py-4 rounded-xl border-2 text-lg font-semibold transition-all active:scale-95 ${
              feedback === "ok" && opt === current.synonym ? "border-emerald-500 bg-emerald-500/20 text-emerald-400" :
              feedback === "err" && opt === current.synonym ? "border-emerald-500 bg-emerald-500/20 text-emerald-400" :
              "border-violet-500/30 bg-card hover:border-violet-500/60 hover:bg-violet-500/10"
            }`}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// GAME 2: Spelling Bee - hear and type
// ============================================================
const SpellingBee = ({ onScore }: { onScore: (n: number) => void }) => {
  const { t } = useLanguage();
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [streak, setStreak] = useState(0);
  const pool = useMemo(() => shuffle(EN_WORDS).slice(0, 10), []);
  const current = pool[idx];
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (current) setTimeout(() => speakEnglish(current.word), 400); }, [current]);
  useEffect(() => { inputRef.current?.focus(); }, [idx]);

  const submit = () => {
    if (!current) return;
    const ok = input.trim().toLowerCase() === current.word.toLowerCase();
    if (ok) {
      const gain = 15 + streak * 2;
      setScore(s => s + gain);
      onScore(gain);
      setStreak(s => s + 1);
      setIdx(i => i + 1);
      setInput("");
    } else {
      setRevealed(true);
      setStreak(0);
      setTimeout(() => { setRevealed(false); setIdx(i => i + 1); setInput(""); }, 1400);
    }
  };

  if (idx >= pool.length) {
    return (
      <div className="text-center py-10 space-y-4">
        <div className="text-6xl">🐝</div>
        <h3 className="text-2xl font-bold">{t("Hoàn thành", "Complete")}! {score} XP</h3>
        <Button onClick={() => { setIdx(0); setScore(0); setStreak(0); }} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
          {t("Chơi lại", "Play again")}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm font-mono">
        <div className="text-amber-400">⚡ {score} XP</div>
        <div className="text-fuchsia-400">🔥 {t("Chuỗi", "Streak")}: {streak}</div>
        <div className="text-cyan-400">{idx + 1}/{pool.length}</div>
      </div>
      <div className="rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-8 text-center">
        <div className="text-6xl mb-3">🐝</div>
        <Button onClick={() => speakEnglish(current.word)} variant="outline" className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10">
          <Volume2 className="w-5 h-5 mr-2" /> {t("Nghe lại", "Replay")}
        </Button>
        <div className="text-sm text-muted-foreground mt-3">{t("Nghĩa", "Meaning")}: <span className="text-foreground font-semibold">{current.vi}</span></div>
        {revealed && <div className="mt-3 text-lg font-bold text-emerald-400">{current.word}</div>}
      </div>
      <div className="flex gap-2">
        <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()}
          placeholder={t("Gõ từ bạn nghe được...", "Type the word you hear...")}
          className="flex-1 px-4 py-3 rounded-xl bg-secondary border-2 border-amber-500/30 focus:border-amber-500 focus:outline-none text-lg" />
        <Button onClick={submit} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6">
          ✓
        </Button>
      </div>
    </div>
  );
};

// ============================================================
// GAME 3: Word Builder - unscramble letters
// ============================================================
const WordBuilder = ({ onScore }: { onScore: (n: number) => void }) => {
  const { t } = useLanguage();
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number[]>([]);
  const pool = useMemo(() => shuffle(EN_WORDS).slice(0, 8), []);
  const current = pool[idx];

  const scrambled = useMemo(() => {
    if (!current) return [];
    let arr = shuffle(current.word.split(""));
    if (arr.join("") === current.word) arr = arr.reverse();
    return arr;
  }, [current]);

  const built = picked.map(i => scrambled[i]).join("");

  useEffect(() => { setPicked([]); }, [idx]);

  useEffect(() => {
    if (current && built.length === current.word.length) {
      if (built.toLowerCase() === current.word.toLowerCase()) {
        setScore(s => s + 20);
        onScore(20);
        speakEnglish(current.word);
        setTimeout(() => setIdx(i => i + 1), 800);
      } else {
        setTimeout(() => setPicked([]), 500);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [built, current]);

  if (idx >= pool.length) {
    return (
      <div className="text-center py-10 space-y-4">
        <div className="text-6xl">🏆</div>
        <h3 className="text-2xl font-bold">{t("Tuyệt vời", "Awesome")}! {score} XP</h3>
        <Button onClick={() => { setIdx(0); setScore(0); }} className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
          {t("Chơi lại", "Play again")}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm font-mono">
        <div className="text-amber-400">⚡ {score} XP</div>
        <div className="text-cyan-400">{idx + 1}/{pool.length}</div>
      </div>
      <div className="rounded-2xl border-2 border-cyan-500/40 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-8 text-center">
        <div className="text-6xl mb-2">{current.emoji}</div>
        <div className="text-sm text-muted-foreground mb-1">{t("Sắp xếp các chữ cái", "Unscramble the letters")}</div>
        <div className="text-lg font-semibold text-foreground">{current.vi}</div>
      </div>
      <div className="min-h-[60px] rounded-xl border-2 border-dashed border-cyan-500/30 bg-card p-3 flex items-center justify-center gap-2 flex-wrap text-2xl font-bold tracking-widest">
        {built || <span className="text-muted-foreground text-sm">{t("Nhấn chữ cái bên dưới", "Tap letters below")}</span>}
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {scrambled.map((c, i) => (
          <button key={i} disabled={picked.includes(i)} onClick={() => setPicked(p => [...p, i])}
            className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 text-white text-xl font-bold shadow disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all">
            {c.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="flex gap-2 justify-center">
        <Button variant="outline" onClick={() => setPicked(p => p.slice(0, -1))}>⌫</Button>
        <Button variant="outline" onClick={() => setPicked([])}>Clear</Button>
      </div>
    </div>
  );
};

// ============================================================
// MAIN
// ============================================================
const EnglishArcade = () => {
  const { t } = useLanguage();
  const [game, setGame] = useState<GameId>("menu");
  const [totalXp, setTotalXp] = useState(0);

  const games = [
    { id: "synonym" as const, title: t("Synonym Sprint", "Synonym Sprint"), desc: t("Chọn từ đồng nghĩa trước khi hết giờ.", "Pick the synonym before time runs out."), icon: Brain, color: "from-violet-500 to-fuchsia-500" },
    { id: "spelling" as const, title: t("Spelling Bee", "Spelling Bee"), desc: t("Nghe và gõ chính xác từ tiếng Anh.", "Listen and type the English word."), icon: Type, color: "from-amber-500 to-orange-500" },
    { id: "builder" as const, title: t("Word Builder", "Word Builder"), desc: t("Sắp xếp lại chữ cái thành từ đúng.", "Unscramble letters into the correct word."), icon: BookOpen, color: "from-cyan-500 to-blue-500" },
    { id: "meteor" as const, title: t("Word Meteor (EN)", "Word Meteor (EN)"), desc: t("Bắn nghĩa đúng cho thiên thạch từ vựng tiếng Anh đang rơi.", "Tap the correct meaning of falling English vocabulary meteors."), icon: Rocket, color: "from-orange-500 to-red-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-slate-100">
      <SEO title="English Arcade Hub | HaiEduTech" description="Arcade tiếng Anh: Synonym Sprint, Spelling Bee, Word Builder - học từ vựng qua trò chơi vui nhộn." path="/english/arcade" />
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-3 sm:px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/40 bg-violet-500/10 text-violet-200 text-xs font-mono mb-3">
              <Sparkles className="w-3 h-3" /> ENGLISH · ARCADE
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-300 to-amber-300">
              English Arcade Hub
            </h1>
            <p className="text-slate-400 text-sm">{t("3 mini-game học từ vựng tiếng Anh thú vị, dành cho mọi trình độ.", "3 fun English vocabulary mini-games for all levels.")}</p>
          </motion.div>

          <div className="rounded-xl border border-violet-500/30 bg-slate-950/60 backdrop-blur p-3 mb-6 flex items-center justify-between font-mono text-sm">
            <div className="flex items-center gap-3">
              {game !== "menu" && (
                <Button variant="ghost" size="sm" onClick={() => setGame("menu")} className="text-violet-300 hover:text-violet-200">
                  <ArrowLeft className="w-4 h-4 mr-1" /> {t("Menu", "Menu")}
                </Button>
              )}
              <div className="flex items-center gap-1 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300">
                <Zap className="w-4 h-4" /> {totalXp} XP
              </div>
            </div>
            <div className="flex items-center gap-1 text-emerald-300">
              <Trophy className="w-4 h-4" /> {t("Cấp", "Lvl")} {Math.floor(totalXp / 100) + 1}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {game === "menu" && (
              <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid sm:grid-cols-3 gap-4">
                {games.map((g, i) => {
                  const Icon = g.icon;
                  return (
                    <motion.button key={g.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                      onClick={() => setGame(g.id)}
                      className="text-left rounded-2xl border border-slate-700 bg-slate-950/80 hover:border-violet-400/50 hover:shadow-[0_0_40px_-15px_rgba(167,139,250,0.6)] transition-all p-5 group">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${g.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-100 mb-1">{g.title}</h3>
                      <p className="text-xs text-slate-400">{g.desc}</p>
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
            {game === "synonym" && <motion.div key="syn" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><SynonymSprint onScore={n => setTotalXp(x => x + n)} /></motion.div>}
            {game === "spelling" && <motion.div key="sp" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><SpellingBee onScore={n => setTotalXp(x => x + n)} /></motion.div>}
            {game === "builder" && <motion.div key="b" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><WordBuilder onScore={n => setTotalXp(x => x + n)} /></motion.div>}
            {game === "meteor" && <motion.div key="m" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><WordMeteor lang="en" onExit={() => setGame("menu")} onScore={n => setTotalXp(x => x + n)} /></motion.div>}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EnglishArcade;
