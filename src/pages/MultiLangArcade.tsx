/**
 * MultiLangArcade - extra arcade hub featuring two new graphic-rich mini-games:
 *  1) "Word Meteor" - falling-word reaction game (works for EN / ZH / VI / FI).
 *  2) "Code Galaxy" - programming syntax sorting (Foundations / Data / AI tracks).
 * Self-contained: no extra deps beyond what the project already uses (lucide-react,
 * framer-motion, tailwind tokens).
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Sparkles, Trophy, Zap, ArrowLeft, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { finishGame } from "@/lib/gameSession";

// ---------- Data ----------
type LangKey = "en" | "zh" | "vi" | "fi";
const METEOR_BANK: Record<LangKey, { word: string; meaning: string }[]> = {
  en: [
    { word: "ephemeral", meaning: "ngắn ngủi" },
    { word: "resilient", meaning: "kiên cường" },
    { word: "candid", meaning: "thẳng thắn" },
    { word: "vivid", meaning: "sống động" },
    { word: "nurture", meaning: "nuôi dưỡng" },
    { word: "obstacle", meaning: "trở ngại" },
    { word: "thrive", meaning: "phát triển mạnh" },
    { word: "humble", meaning: "khiêm tốn" },
  ],
  zh: [
    { word: "幸福 xìngfú", meaning: "hạnh phúc" },
    { word: "努力 nǔlì", meaning: "nỗ lực" },
    { word: "环境 huánjìng", meaning: "môi trường" },
    { word: "梦想 mèngxiǎng", meaning: "ước mơ" },
    { word: "成功 chénggōng", meaning: "thành công" },
    { word: "友谊 yǒuyì", meaning: "tình bạn" },
    { word: "健康 jiànkāng", meaning: "sức khỏe" },
    { word: "勇敢 yǒnggǎn", meaning: "dũng cảm" },
  ],
  vi: [
    { word: "yêu thương", meaning: "to love" },
    { word: "biển cả", meaning: "the sea" },
    { word: "ánh trăng", meaning: "moonlight" },
    { word: "kỷ niệm", meaning: "memory" },
    { word: "hy vọng", meaning: "hope" },
    { word: "đoàn kết", meaning: "unity" },
    { word: "gia đình", meaning: "family" },
    { word: "tự hào", meaning: "proud" },
  ],
  fi: [
    { word: "rakkaus", meaning: "tình yêu" },
    { word: "sisu", meaning: "kiên cường (Phần Lan)" },
    { word: "metsä", meaning: "rừng" },
    { word: "järvi", meaning: "hồ" },
    { word: "talvi", meaning: "mùa đông" },
    { word: "ystävä", meaning: "bạn bè" },
    { word: "rauha", meaning: "bình yên" },
    { word: "onni", meaning: "may mắn" },
  ],
};

const LANG_META: Record<LangKey, { label: string; emoji: string; accent: string }> = {
  en: { label: "English", emoji: "🇬🇧", accent: "from-sky-500 to-indigo-500" },
  zh: { label: "中文",    emoji: "🇨🇳", accent: "from-red-500 to-amber-500" },
  vi: { label: "Tiếng Việt", emoji: "🇻🇳", accent: "from-yellow-500 to-rose-500" },
  fi: { label: "Suomi",  emoji: "🇫🇮", accent: "from-cyan-500 to-blue-600" },
};

/** Which vocabulary bank each arcade language feeds when a word is answered right. */
const SUBJECT_BY_LANG: Record<LangKey, string> = {
  en: "ielts",
  zh: "hsk",
  vi: "vietnamese",
  fi: "finnish-vocab",
};

// ---------- Word Meteor ----------
interface Meteor {
  id: number;
  word: string;
  meaning: string;
  x: number;     // 0–90 (%)
  y: number;     // 0–100 (%)
  speed: number; // %/tick
  options: string[];
}

function WordMeteorGame({ lang }: { lang: LangKey }) {
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [running, setRunning] = useState(false);
  const tickRef = useRef<number>();
  const idRef = useRef(0);
  const correctRef = useRef<string[]>([]);
  const savedRef = useRef(false);
  const bestStreakRef = useRef(0);

  const bank = METEOR_BANK[lang];

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
      { id: ++idRef.current, word: item.word, meaning: item.meaning, x: Math.random() * 80 + 5, y: 0, speed: 0.6 + Math.random() * 0.6, options },
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

  // Save the run once it is over, and log the words answered correctly
  useEffect(() => {
    if (lives <= 0 && !savedRef.current) {
      savedRef.current = true;
      void finishGame({
        gameType: `arcade_plus_meteor_${lang}`,
        score,
        maxStreak: bestStreakRef.current,
        subject: SUBJECT_BY_LANG[lang],
        correctWords: correctRef.current,
      });
    }
  }, [lives, score, lang]);

  const handlePick = (m: Meteor, picked: string) => {
    if (picked === m.meaning) {
      setScore((s) => s + 10 + streak * 2);
      setStreak((s) => {
        const next = s + 1;
        bestStreakRef.current = Math.max(bestStreakRef.current, next);
        return next;
      });
      correctRef.current.push(m.word.split(" ")[0]);
      setMeteors((prev) => prev.filter((x) => x.id !== m.id));
    } else {
      setStreak(0);
      setLives((l) => Math.max(0, l - 1));
    }
  };

  const reset = () => {
    savedRef.current = false;
    correctRef.current = [];
    bestStreakRef.current = 0;
    setMeteors([]); setScore(0); setLives(3); setStreak(0); setRunning(true); idRef.current = 0;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card/60 p-3">
        <div className="flex items-center gap-3 text-sm">
          <Badge variant="outline" className="text-base"><Trophy className="mr-1 h-4 w-4" /> {score}</Badge>
          <Badge variant="outline" className="text-base"><Zap className="mr-1 h-4 w-4" /> Streak {streak}</Badge>
          <Badge variant="outline" className="text-base">❤️ {lives}</Badge>
        </div>
        <Button onClick={reset} size="sm" className={`bg-gradient-to-r ${LANG_META[lang].accent} text-white`}>
          {running ? "Restart" : "Start Game"}
        </Button>
      </div>

      <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900">
        {/* stars */}
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
            <h3 className="text-xl font-bold">{lives <= 0 ? "Game Over" : `${LANG_META[lang].emoji} Word Meteor`}</h3>
            <p className="max-w-sm text-sm text-white/80">
              Tap the correct meaning before the meteor hits the ground. Chain answers for bonus points!
            </p>
            <Button onClick={reset} className={`bg-gradient-to-r ${LANG_META[lang].accent} text-white`}>
              {lives <= 0 ? "Play Again" : "Start"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Code Galaxy ----------
const CODE_TRACKS = {
  foundations: {
    label: "Foundations",
    items: [
      { snippet: "for i in range(10):", category: "Loop" },
      { snippet: "if x > 0:", category: "Conditional" },
      { snippet: "def greet(name):", category: "Function" },
      { snippet: "class User:", category: "Class" },
      { snippet: "while running:", category: "Loop" },
      { snippet: "return total", category: "Function" },
      { snippet: "elif user.is_admin:", category: "Conditional" },
    ],
    categories: ["Loop", "Conditional", "Function", "Class"],
  },
  data: {
    label: "Data Engineering",
    items: [
      { snippet: "SELECT * FROM orders", category: "SQL" },
      { snippet: "df.groupby('city')", category: "Pandas" },
      { snippet: "spark.read.parquet(...)", category: "Spark" },
      { snippet: "JOIN customers c ON c.id = o.cid", category: "SQL" },
      { snippet: "df.merge(other, on='id')", category: "Pandas" },
      { snippet: "rdd.flatMap(lambda x: ...)", category: "Spark" },
      { snippet: "GROUP BY country", category: "SQL" },
    ],
    categories: ["SQL", "Pandas", "Spark"],
  },
  ai: {
    label: "AI / ML",
    items: [
      { snippet: "model.fit(X, y)", category: "Training" },
      { snippet: "loss.backward()", category: "Training" },
      { snippet: "tokenizer.encode(text)", category: "NLP" },
      { snippet: "torch.nn.Linear(128, 64)", category: "Model" },
      { snippet: "softmax(logits)", category: "Model" },
      { snippet: "AutoModel.from_pretrained(...)", category: "NLP" },
      { snippet: "optimizer.step()", category: "Training" },
    ],
    categories: ["Training", "NLP", "Model"],
  },
} as const;

type TrackKey = keyof typeof CODE_TRACKS;

function CodeGalaxyGame() {
  const [track, setTrack] = useState<TrackKey>("foundations");
  const savedRef = useRef(false);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [flash, setFlash] = useState<"ok" | "no" | null>(null);
  const t = CODE_TRACKS[track];
  const item = t.items[idx];

  const choose = (cat: string) => {
    if (!item) return;
    if (cat === item.category) {
      setScore((s) => s + 15);
      setFlash("ok");
    } else {
      setFlash("no");
    }
    setTimeout(() => {
      setFlash(null);
      setIdx((i) => i + 1);
    }, 350);
  };

  const reset = (k?: TrackKey) => { savedRef.current = false; setIdx(0); setScore(0); if (k) setTrack(k); };

  const done = idx >= t.items.length;

  useEffect(() => {
    if (done && !savedRef.current) {
      savedRef.current = true;
      void finishGame({ gameType: `code_galaxy_${track}`, score });
    }
  }, [done, score, track]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(CODE_TRACKS) as TrackKey[]).map((k) => (
            <Button key={k} size="sm" variant={track === k ? "default" : "outline"} onClick={() => reset(k)}>
              {CODE_TRACKS[k].label}
            </Button>
          ))}
        </div>
        <Badge variant="outline" className="text-base"><Trophy className="mr-1 h-4 w-4" /> {score} XP</Badge>
      </div>

      <div className={`relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-950 via-emerald-950/60 to-slate-900 p-6 transition-colors ${
        flash === "ok" ? "ring-2 ring-emerald-400" : flash === "no" ? "ring-2 ring-red-400" : ""
      }`}>
        <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.4),transparent_40%),radial-gradient(circle_at_80%_60%,hsl(var(--accent)/0.4),transparent_40%)]" />
        <div className="relative">
          {!done ? (
            <>
              <p className="mb-2 text-xs uppercase tracking-widest text-emerald-300">Snippet {idx + 1} / {t.items.length}</p>
              <div className="rounded-lg border border-emerald-400/30 bg-black/60 p-4 font-mono text-lg text-emerald-200 shadow-inner">
                <span className="text-emerald-500">$ </span>{item.snippet}
              </div>
              <p className="mt-4 text-sm text-white/80">Which category does this snippet belong to?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {t.categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => choose(c)}
                    className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 transition hover:scale-105 hover:bg-emerald-500/30"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-6 text-center text-white">
              <Rocket className="h-10 w-10 text-emerald-300" />
              <h3 className="text-xl font-bold">Track Complete!</h3>
              <p className="text-sm text-white/80">Final score: <span className="font-bold text-emerald-300">{score} XP</span></p>
              <Button onClick={() => reset()} className="bg-emerald-500 text-white hover:bg-emerald-600">
                Replay
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- Page ----------
export default function MultiLangArcade() {
  const [lang, setLang] = useState<LangKey>("en");
  const meta = useMemo(() => LANG_META[lang], [lang]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm"><ArrowLeft className="mr-1 h-4 w-4" />Home</Button>
          </Link>
          <Badge variant="outline" className="text-sm"><Gamepad2 className="mr-1 h-4 w-4" />Arcade Plus</Badge>
        </div>

        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            🚀 Arcade Plus
          </h1>
          <p className="mt-2 text-muted-foreground">
            Hai trò chơi đồ họa mới: <strong>Word Meteor</strong> cho 4 ngôn ngữ và <strong>Code Galaxy</strong> cho lập trình.
          </p>
        </header>

        <Tabs defaultValue="meteor" className="space-y-6">
          <TabsList className="mx-auto grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="meteor">☄️ Word Meteor</TabsTrigger>
            <TabsTrigger value="galaxy">🌌 Code Galaxy</TabsTrigger>
          </TabsList>

          <TabsContent value="meteor">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{meta.emoji} Word Meteor - {meta.label}</span>
                  <div className="flex gap-1">
                    {(Object.keys(LANG_META) as LangKey[]).map((k) => (
                      <Button
                        key={k}
                        size="sm"
                        variant={lang === k ? "default" : "outline"}
                        onClick={() => setLang(k)}
                      >
                        {LANG_META[k].emoji}
                      </Button>
                    ))}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <WordMeteorGame lang={lang} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="galaxy">
            <Card>
              <CardHeader>
                <CardTitle>🌌 Code Galaxy - Sort Snippets by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeGalaxyGame />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
