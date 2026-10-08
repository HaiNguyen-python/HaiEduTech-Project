/**
 * @file FinnishArcade.tsx
 * @description Finnish Vocabulary Arcade Hub - 3 mini-games (Sauna Match,
 * Reindeer Runner, Inflection Detective) themed around Finnish culture.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState, useRef } from "react";
import FloatingNordicParticles from "@/components/FloatingNordicParticles";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trophy, Zap, Heart, Sparkles, Snowflake, Compass, Target, Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { playFinnishTts, stopFinnishTts } from "@/lib/finnishTts";
import { toast } from "@/hooks/use-toast";
import WordMeteor from "@/components/games/WordMeteor";
import { finishGame } from "@/lib/gameSession";

const MotionButton = motion(Button);

type GameId = "menu" | "sauna" | "runner" | "inflection" | "meteor";

interface FiWord {
  fi: string;
  en: string;
  vi: string;
  emoji: string;
}

const FI_WORDS: FiWord[] = [
  { fi: "kissa", en: "cat", vi: "con mèo", emoji: "🐱" },
  { fi: "koira", en: "dog", vi: "con chó", emoji: "🐶" },
  { fi: "sauna", en: "sauna", vi: "phòng tắm hơi", emoji: "🧖" },
  { fi: "kahvi", en: "coffee", vi: "cà phê", emoji: "☕" },
  { fi: "leipä", en: "bread", vi: "bánh mì", emoji: "🍞" },
  { fi: "vesi", en: "water", vi: "nước", emoji: "💧" },
  { fi: "talo", en: "house", vi: "ngôi nhà", emoji: "🏠" },
  { fi: "auto", en: "car", vi: "xe hơi", emoji: "🚗" },
  { fi: "kirja", en: "book", vi: "quyển sách", emoji: "📖" },
  { fi: "puu", en: "tree", vi: "cây", emoji: "🌳" },
  { fi: "lumi", en: "snow", vi: "tuyết", emoji: "❄️" },
  { fi: "poro", en: "reindeer", vi: "tuần lộc", emoji: "🦌" },
  { fi: "metsä", en: "forest", vi: "rừng", emoji: "🌲" },
  { fi: "järvi", en: "lake", vi: "hồ", emoji: "🏞️" },
  { fi: "aurinko", en: "sun", vi: "mặt trời", emoji: "☀️" },
  { fi: "kuu", en: "moon", vi: "mặt trăng", emoji: "🌙" },
  { fi: "ystävä", en: "friend", vi: "bạn", emoji: "👫" },
  { fi: "perhe", en: "family", vi: "gia đình", emoji: "👨‍👩‍👧" },
  { fi: "ruoka", en: "food", vi: "đồ ăn", emoji: "🍽️" },
  { fi: "maito", en: "milk", vi: "sữa", emoji: "🥛" },
];

// Partitive/inflection examples for "Inflection Detective" game
interface InflectionItem {
  base: string;
  baseEn: string;
  forms: { form: string; type: string; correct: boolean }[];
}
const INFLECTIONS: InflectionItem[] = [
  { base: "kissa", baseEn: "cat", forms: [
    { form: "kissaa", type: "partitive", correct: true },
    { form: "kissan", type: "genitive", correct: false },
    { form: "kissalle", type: "allative", correct: false },
  ]},
  { base: "kirja", baseEn: "book", forms: [
    { form: "kirjat", type: "plural", correct: true },
    { form: "kirjaksi", type: "translative", correct: false },
    { form: "kirjassa", type: "inessive", correct: false },
  ]},
  { base: "talo", baseEn: "house", forms: [
    { form: "talossa", type: "inessive", correct: true },
    { form: "talolla", type: "adessive", correct: false },
    { form: "talona", type: "essive", correct: false },
  ]},
  { base: "kahvi", baseEn: "coffee", forms: [
    { form: "kahvia", type: "partitive", correct: true },
    { form: "kahvin", type: "genitive", correct: false },
    { form: "kahvista", type: "elative", correct: false },
  ]},
  { base: "vesi", baseEn: "water", forms: [
    { form: "vettä", type: "partitive", correct: true },
    { form: "veteen", type: "illative", correct: false },
    { form: "vedellä", type: "adessive", correct: false },
  ]},
];

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const speakFinnish = (text: string) => {
  void playFinnishTts(text).then(ok => {
    if (!ok) toast({ title: "Finnish audio unavailable", description: "Please try the audio again.", variant: "destructive" });
  });
};

const useFinnishGameAudioCleanup = () => {
  useEffect(() => () => stopFinnishTts(), []);
};

// ============================================================
// GAME 1: Sauna Match - match Finnish word to Vietnamese meaning
// ============================================================
const SaunaMatch = ({ onScore }: { onScore: (n: number) => void }) => {
  const { t } = useLanguage();
  useFinnishGameAudioCleanup();
  const [seed, setSeed] = useState(0);
  const round = useMemo(() => shuffle(FI_WORDS).slice(0, 6), [seed]);
  const meanings = useMemo(() => shuffle(round), [round]);
  const [matched, setMatched] = useState<string[]>([]);
  const [selectedFi, setSelectedFi] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [shake, setShake] = useState<string | null>(null);
  const savedRef = useRef(false);
  const done = matched.length === round.length;

  useEffect(() => {
    if (done && !savedRef.current) {
      savedRef.current = true;
      void finishGame({
        gameType: "fi_sauna_match",
        score,
        subject: "finnish-vocab",
        correctWords: matched,
      });
    }
  }, [done, score, matched]);

  const handleViTap = (vi: string) => {
    if (!selectedFi) return;
    const fiWord = round.find(w => w.fi === selectedFi);
    if (!fiWord) return;
    if (fiWord.vi === vi) {
      setMatched(m => [...m, selectedFi]);
      setScore(s => s + 12);
      onScore(12);
      speakFinnish(selectedFi);
      setSelectedFi(null);
    } else {
      setShake(vi); setTimeout(() => setShake(null), 400);
      setSelectedFi(null);
    }
  };

  if (done) {
    return (
      <div className="text-center py-10 space-y-4">
        <div className="text-6xl">🧖❄️</div>
        <h3 className="text-2xl font-bold">{t("Hyvä! Hoàn thành", "Hyvä! Complete")}: {score} XP</h3>
        <Button onClick={() => { savedRef.current = false; setMatched([]); setScore(0); setSeed(s => s + 1); }} className="   ">
          {t("Vòng mới", "New round")}
        </Button>
      </div>
    );
  }


  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm font-mono">
        <div className="">⚡ {score} XP</div>
        <div className="">❄️ {matched.length}/{round.length}</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <div className="text-xs  font-mono mb-1">🇫🇮 Suomi</div>
          {round.map(w => {
            const isMatched = matched.includes(w.fi);
            const isSelected = selectedFi === w.fi;
            return (
              <Button variant="outline" key={w.fi} disabled={isMatched} onClick={() => setSelectedFi(w.fi)}
                className={`finnish-choice w-full px-3 py-3 rounded-lg h-auto whitespace-normal text-base font-bold transition-all active:scale-95 ${
                  isMatched ? "finnish-choice--correct  border-2   opacity-70" :
                  isSelected ? "finnish-choice--selected   border-2  shadow-lg" :
                  " border-2     "
                }`}>
                {w.emoji} {w.fi}
              </Button>
            );
          })}
        </div>
        <div className="space-y-2">
          <div className="text-xs  font-mono mb-1">🇻🇳 Nghĩa</div>
          {meanings.map(w => {
            const isMatched = matched.includes(w.fi);
            return (
              <MotionButton variant="outline" key={w.vi} disabled={isMatched} onClick={() => handleViTap(w.vi)}
                animate={shake === w.vi ? { x: [-6, 6, -4, 4, 0] } : {}}
                className={`finnish-choice w-full px-3 py-3 rounded-lg h-auto whitespace-normal text-base font-medium transition-all active:scale-95 ${
                  isMatched ? "finnish-choice--correct  border-2   opacity-70" :
                  " border-2     "
                }`}>
                {w.vi}
              </MotionButton>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// GAME 2: Reindeer Runner - tap correct Finnish word as reindeer runs
// ============================================================
const ReindeerRunner = ({ onScore }: { onScore: (n: number) => void }) => {
  const { t } = useLanguage();
  useFinnishGameAudioCleanup();
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const pool = useMemo(() => shuffle(FI_WORDS).slice(0, 12), []);
  const current = pool[idx];
  const correctRef = useRef<string[]>([]);
  const savedRef = useRef(false);
  const options = useMemo(() => {
    if (!current) return [];
    const wrong = shuffle(FI_WORDS.filter(w => w.fi !== current.fi)).slice(0, 3).map(w => w.fi);
    return shuffle([current.fi, ...wrong]);
  }, [current]);
  const done = lives <= 0 || idx >= pool.length;

  useEffect(() => {
    if (done && !savedRef.current) {
      savedRef.current = true;
      void finishGame({
        gameType: "fi_reindeer_runner",
        score,
        subject: "finnish-vocab",
        correctWords: correctRef.current,
      });
    }
  }, [done, score]);

  const pick = (opt: string) => {
    if (opt === current.fi) {
      setScore(s => s + 10);
      onScore(10);
      speakFinnish(opt);
      correctRef.current.push(current.fi);
    } else {
      setLives(l => l - 1);
    }
    setIdx(i => i + 1);
  };

  if (done) {
    return (
      <div className="text-center py-10 space-y-4">
        <div className="text-6xl">🦌</div>
        <h3 className="text-2xl font-bold">{t("Kết quả", "Result")}: {score} XP</h3>
        <Button onClick={() => { savedRef.current = false; correctRef.current = []; setIdx(0); setLives(3); setScore(0); }} className="   ">
          {t("Chạy tiếp", "Run again")}
        </Button>
      </div>
    );
  }


  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm font-mono">
        <div className="flex gap-1 ">{Array.from({ length: 3 }).map((_, i) => <Heart key={i} className={`w-4 h-4 ${i < lives ? "fill-current" : "opacity-30"}`} />)}</div>
        <div className="">⚡ {score} XP</div>
        <div className="">{idx + 1}/{pool.length}</div>
      </div>
      <div className="finnish-runner-field relative rounded-lg border-2      p-6 overflow-hidden min-h-[180px]">
        <motion.div animate={{ x: [0, 30, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-6xl absolute left-4 bottom-4">🦌</motion.div>
        <div className="absolute top-3 right-3 text-4xl">{Array.from({ length: 5 }).map((_, i) => <span key={i}>❄️</span>)}</div>
        <div className="text-center mt-6">
          <div className="text-5xl mb-1">{current.emoji}</div>
          <div className="text-xl font-bold ">{current.vi}</div>
          <div className="text-sm text-muted-foreground">{t("Chọn từ tiếng Phần đúng", "Pick the right Finnish word")}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {options.map(opt => (
          <Button variant="outline" key={opt} onClick={() => pick(opt)}
            className="finnish-choice px-3 py-3 rounded-lg h-auto whitespace-normal border-2       text-base font-bold transition-all active:scale-95">
            {opt}
          </Button>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// GAME 3: Inflection Detective - identify the correct case form
// ============================================================
const InflectionDetective = ({ onScore }: { onScore: (n: number) => void }) => {
  const { t } = useLanguage();
  useFinnishGameAudioCleanup();
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"ok" | "err" | null>(null);
  const pool = useMemo(() => shuffle(INFLECTIONS), []);
  const item = pool[idx];
  const targetType = item?.forms.find(f => f.correct)?.type;
  const options = useMemo(() => item ? shuffle(item.forms) : [], [item]);
  const correctRef = useRef<string[]>([]);
  const savedRef = useRef(false);
  const done = idx >= pool.length;

  useEffect(() => {
    if (done && !savedRef.current) {
      savedRef.current = true;
      void finishGame({
        gameType: "fi_inflection_detective",
        score,
        subject: "finnish-vocab",
        correctWords: correctRef.current,
      });
    }
  }, [done, score]);

  const pick = (form: string, correct: boolean) => {
    if (feedback) return;
    setFeedback(correct ? "ok" : "err");
    if (correct) { setScore(s => s + 15); onScore(15); speakFinnish(form); correctRef.current.push(item.base); }
    setTimeout(() => { setFeedback(null); setIdx(i => i + 1); }, 900);
  };

  if (done) {
    return (
      <div className="text-center py-10 space-y-4">
        <div className="text-6xl">🕵️</div>
        <h3 className="text-2xl font-bold">{t("Tuyệt vời", "Awesome")}! {score} XP</h3>
        <Button onClick={() => { savedRef.current = false; correctRef.current = []; setIdx(0); setScore(0); }} className="   ">
          {t("Chơi lại", "Play again")}
        </Button>
      </div>
    );
  }


  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm font-mono">
        <div className="">⚡ {score} XP</div>
        <div className="">{idx + 1}/{pool.length}</div>
      </div>
      <div className="rounded-2xl border-2     p-6 text-center">
        <div className="text-5xl mb-2">🕵️</div>
        <div className="text-sm text-muted-foreground">{t("Từ gốc", "Base word")}</div>
        <div className="text-2xl font-bold ">{item.base}</div>
        <div className="text-sm text-muted-foreground">({item.baseEn})</div>
        <div className="mt-3 text-sm ">{t("Chọn dạng", "Find the")}: <span className="font-bold  uppercase">{targetType}</span></div>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {options.map(f => (
          <Button variant="outline" key={f.form} onClick={() => pick(f.form, f.correct)}
            className={`finnish-choice px-4 py-3 rounded-lg h-auto whitespace-normal border-2 text-lg font-bold transition-all active:scale-95 ${
              feedback === "ok" && f.correct ? "finnish-choice--correct   " :
              feedback === "err" && f.correct ? "finnish-choice--correct   " :
              "     "
            }`}>
            {f.form}
          </Button>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// MAIN
// ============================================================
const FinnishArcade = () => {
  const { t } = useLanguage();
  const [game, setGame] = useState<GameId>("menu");
  const [totalXp, setTotalXp] = useState(0);

  const games = [
    { tone: "shooter", id: "sauna" as const, chibi: "🧖", title: t("Sauna Match", "Sauna Match"), desc: t("Ghép từ tiếng Phần với nghĩa tiếng Việt.", "Match Finnish words with Vietnamese meanings."), icon: Snowflake, color: "" },
    { tone: "hotpot", id: "runner" as const, chibi: "🦌", title: t("Reindeer Runner", "Reindeer Runner"), desc: t("Chọn từ tiếng Phần đúng để tuần lộc về đích.", "Pick the right Finnish word to help the reindeer."), icon: Compass, color: "" },
    { tone: "runner", id: "inflection" as const, chibi: "🕵️", title: t("Inflection Detective", "Inflection Detective"), desc: t("Nhận diện cách (case) của danh từ Phần Lan.", "Identify the correct Finnish noun case."), icon: Target, color: "" },
    { tone: "sentence", id: "meteor" as const, chibi: "☃️", title: t("Word Meteor (Suomi)", "Word Meteor (Suomi)"), desc: t("Bắn nghĩa đúng cho thiên thạch từ vựng tiếng Phần Lan.", "Tap the correct meaning of falling Finnish meteors."), icon: Rocket, color: "" },
  ];

  return (
    <div className="finnish-arcade relative isolate min-h-screen overflow-hidden bg-background text-foreground">
      <FloatingNordicParticles variant="finnish" />
      <SEO title="Finnish Arcade Hub | HaiEduTech" description="Arcade tiếng Phần Lan: Sauna Match, Reindeer Runner, Inflection Detective, Word Meteor - học suomi qua trò chơi." path="/finnish/arcade" />
      <Navbar />
      <div className="pt-6 pb-16">
        <div className="container mx-auto px-3 sm:px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 finnish-arcade-heading">
            <div className="chinese-arcade-kicker inline-flex items-center gap-2 px-3 py-1 rounded-full border  text-xs font-mono mb-3">
              <Sparkles className="w-3 h-3" /> SUOMI · ARCADE
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2 text-foreground    ">
              Finnish Arcade Hub
            </h1>
            <p className=" text-sm">{t("4 mini-game học tiếng Phần Lan với chủ đề sauna, tuần lộc, cách danh từ và thiên thạch từ vựng.", "4 Finnish mini-games themed around sauna, reindeer, noun cases, and vocabulary meteors.")}</p>
          </motion.div>

          <div className="chinese-arcade-hud rounded-lg border backdrop-blur p-3 mb-6 flex items-center justify-between font-mono text-sm">
            <div className="flex items-center gap-3">
              {game !== "menu" && (
                <Button variant="ghost" size="sm" onClick={() => setGame("menu")} className=" ">
                  <ArrowLeft className="w-4 h-4 mr-1" /> {t("Menu", "Menu")}
                </Button>
              )}
              <div className="flex items-center gap-1 px-3 py-1 rounded  border  ">
                <Zap className="w-4 h-4" /> {totalXp} XP
              </div>
            </div>
            <div className="flex items-center gap-1 ">
              <Trophy className="w-4 h-4" /> {t("Cấp", "Lvl")} {Math.floor(totalXp / 100) + 1}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {game === "menu" && (
              <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {games.map((g, i) => {
                  const Icon = g.icon;
                  return (
                    <MotionButton variant="outline" key={g.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                      onClick={() => setGame(g.id)}
                      className={`chinese-arcade-card chinese-arcade-card--${g.tone} relative overflow-hidden text-left rounded-lg border     transition-all p-5 group min-h-[230px] h-auto block whitespace-normal`}>
                      <motion.div animate={{ y: [0, -6, 0], rotate: [-3, 3, -3] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -bottom-2 -right-2 text-6xl drop-shadow-xl select-none opacity-90" aria-hidden>{g.chibi}</motion.div>
                      <div className={`finnish-game-icon w-12 h-12 rounded-lg ${g.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 " />
                      </div>
                      <h3 className="text-lg font-bold  mb-1">{g.title}</h3>
                      <p className="text-sm text-muted-foreground max-w-[80%]">{g.desc}</p>
                    </MotionButton>
                  );
                })}
              </motion.div>
            )}
            {game === "sauna" && <motion.div key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><SaunaMatch onScore={n => setTotalXp(x => x + n)} /></motion.div>}
            {game === "runner" && <motion.div key="r" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><ReindeerRunner onScore={n => setTotalXp(x => x + n)} /></motion.div>}
            {game === "inflection" && <motion.div key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><InflectionDetective onScore={n => setTotalXp(x => x + n)} /></motion.div>}
            {game === "meteor" && <motion.div key="m" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><WordMeteor lang="fi" onExit={() => setGame("menu")} onScore={n => setTotalXp(x => x + n)} /></motion.div>}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FinnishArcade;
