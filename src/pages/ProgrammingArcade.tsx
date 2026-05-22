/**
 * @file ProgrammingArcade.tsx
 * @description Tech & Code Game Hub - 3 mini-games: SQL Dungeon, Data Pipeline Plumber, AI Parameter Tuner.
 * Dark terminal-style arcade dashboard for Learn Programming.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Code2, Database, Brain, Zap, Trophy, Loader2, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import CodeGalaxy from "@/components/games/CodeGalaxy";

type GameId = "menu" | "sql" | "pipeline" | "tuner" | "galaxy";

interface LogLine {
  id: number;
  type: "info" | "ok" | "err";
  text: string;
}

// ============================================================
// Shared XP / Level / Log header
// ============================================================
const xpToLevel = (xp: number) => Math.max(1, Math.floor(xp / 100) + 1);

interface GameHeaderProps {
  xp: number;
  log: LogLine[];
  current: GameId;
  onBack: () => void;
}
const GameHeader = ({ xp, log, current, onBack }: GameHeaderProps) => {
  const level = xpToLevel(xp);
  const xpInLevel = xp % 100;
  return (
    <div className="rounded-xl border border-emerald-500/30 bg-slate-950/80 backdrop-blur-md p-4 mb-6 font-mono text-sm shadow-[0_0_40px_-15px_rgba(16,185,129,0.5)]">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        {current !== "menu" && (
          <Button variant="ghost" size="sm" onClick={onBack} className="text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/10">
            <ArrowLeft className="w-4 h-4 mr-1" /> ./back
          </Button>
        )}
        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-amber-300">XP:</span>
          <span className="text-emerald-200 font-bold">{xp}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30">
          <Trophy className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-300">LVL:</span>
          <span className="text-cyan-100 font-bold">{level}</span>
        </div>
        <div className="flex-1 min-w-[140px] h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
          <div className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-fuchsia-400 transition-all" style={{ width: `${xpInLevel}%` }} />
        </div>
      </div>
      <div className="rounded-md bg-black/60 border border-slate-800 p-3 max-h-32 overflow-y-auto text-xs">
        {log.length === 0 ? (
          <div className="text-slate-500">{">> terminal ready..."}</div>
        ) : (
          log.slice(-8).map(l => (
            <div key={l.id} className={l.type === "ok" ? "text-emerald-300" : l.type === "err" ? "text-rose-400" : "text-slate-400"}>
              {l.type === "ok" ? ">> " : l.type === "err" ? "!! " : ">> "}{l.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// ============================================================
// GAME 1: SQL Dungeon
// ============================================================
interface SqlRiddle {
  monster: string;
  emoji: string;
  hp: number;
  prompt: string;
  promptEn: string;
  table: { name: string; cols: string[]; rows: (string | number)[][] };
  // Required tokens in order to defeat
  solution: string[];
  reward: number;
}

const SQL_RIDDLES: SqlRiddle[] = [
  {
    monster: "Goblin Scribe",
    emoji: "👺",
    hp: 30,
    prompt: "Lấy tên tất cả phù thủy từ bảng wizards.",
    promptEn: "Select all wizard names from the wizards table.",
    table: {
      name: "wizards",
      cols: ["id", "name", "power"],
      rows: [[1, "Mira", 80], [2, "Lyra", 65], [3, "Orin", 90]],
    },
    solution: ["SELECT", "name", "FROM", "wizards"],
    reward: 30,
  },
  {
    monster: "Slime Knight",
    emoji: "🦠",
    hp: 50,
    prompt: "Lấy phù thủy có power > 70.",
    promptEn: "Select wizards with power > 70.",
    table: {
      name: "wizards",
      cols: ["id", "name", "power"],
      rows: [[1, "Mira", 80], [2, "Lyra", 65], [3, "Orin", 90]],
    },
    solution: ["SELECT", "name", "FROM", "wizards", "WHERE", "power", ">", "70"],
    reward: 50,
  },
  {
    monster: "Dragon Lord",
    emoji: "🐉",
    hp: 80,
    prompt: "Đếm số phù thủy trong bảng.",
    promptEn: "Count number of wizards.",
    table: {
      name: "wizards",
      cols: ["id", "name", "power"],
      rows: [[1, "Mira", 80], [2, "Lyra", 65], [3, "Orin", 90]],
    },
    solution: ["SELECT", "COUNT(*)", "FROM", "wizards"],
    reward: 80,
  },
];

const SQL_TOKENS = ["SELECT", "FROM", "WHERE", "name", "wizards", "power", ">", "70", "COUNT(*)", "*", "AND", "id"];

const SqlDungeon = ({ pushLog, addXp }: { pushLog: (t: LogLine["type"], text: string) => void; addXp: (n: number) => void }) => {
  const { t } = useLanguage();
  const [idx, setIdx] = useState(0);
  const [hp, setHp] = useState(SQL_RIDDLES[0].hp);
  const [picked, setPicked] = useState<string[]>([]);
  const [shake, setShake] = useState(false);
  const riddle = SQL_RIDDLES[idx];

  useEffect(() => {
    setHp(riddle.hp);
    setPicked([]);
  }, [idx, riddle.hp]);

  const submit = () => {
    const ok = picked.length === riddle.solution.length && picked.every((p, i) => p === riddle.solution[i]);
    if (ok) {
      pushLog("ok", `Query executed. ${riddle.monster} defeated! +${riddle.reward} XP`);
      addXp(riddle.reward);
      setHp(0);
      setTimeout(() => {
        if (idx + 1 < SQL_RIDDLES.length) setIdx(idx + 1);
        else { pushLog("ok", "Dungeon cleared! All monsters defeated."); setIdx(0); }
      }, 900);
    } else {
      pushLog("err", `Syntax Error near ${picked[picked.length - 1] ?? "?"}. -10 HP from your spell.`);
      setShake(true);
      setHp(h => Math.max(0, h - 0)); // monster keeps HP, but visual shake
      setTimeout(() => setShake(false), 350);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {/* Battle screen */}
      <motion.div animate={shake ? { x: [-8, 8, -6, 6, 0] } : {}} transition={{ duration: 0.35 }} className="rounded-xl border border-fuchsia-500/30 bg-gradient-to-b from-slate-900 via-slate-950 to-black p-6 min-h-[280px] flex flex-col items-center justify-center font-mono">
        <div className="text-xs text-fuchsia-300 mb-2">{t("⚔️ TRẬN ĐẤU", "⚔️ BATTLE")}</div>
        <motion.div key={idx} animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-7xl mb-3">
          {riddle.emoji}
        </motion.div>
        <div className="text-emerald-300 text-lg font-bold mb-2">{riddle.monster}</div>
        <div className="w-full max-w-xs h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
          <motion.div className="h-full bg-gradient-to-r from-rose-500 to-amber-400" animate={{ width: `${(hp / riddle.hp) * 100}%` }} />
        </div>
        <div className="text-xs text-slate-400 mt-1">HP: {hp}/{riddle.hp}</div>
      </motion.div>

      {/* Query builder */}
      <div className="rounded-xl border border-emerald-500/30 bg-slate-950 p-5 font-mono">
        <div className="text-xs text-emerald-300 mb-2">{t("📜 Câu đố", "📜 Riddle")}</div>
        <div className="text-slate-200 text-sm mb-3">{t(riddle.prompt, riddle.promptEn)}</div>
        <div className="rounded-md bg-black/60 border border-slate-800 p-3 mb-3 overflow-x-auto">
          <div className="text-xs text-slate-500 mb-1">/* table: {riddle.table.name} */</div>
          <table className="text-xs text-slate-300 min-w-full">
            <thead><tr>{riddle.table.cols.map(c => <th key={c} className="text-left pr-4 text-cyan-300">{c}</th>)}</tr></thead>
            <tbody>{riddle.table.rows.map((r, i) => <tr key={i}>{r.map((v, j) => <td key={j} className="pr-4 py-0.5">{v}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <div className="rounded-md bg-black/80 border border-emerald-500/40 p-3 mb-3 min-h-[48px] text-emerald-300 text-sm">
          <span className="text-slate-500">sql&gt; </span>
          {picked.length === 0 ? <span className="text-slate-600">{t("...nhấn token bên dưới", "...click tokens below")}</span> : picked.join(" ")}
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {SQL_TOKENS.map(tok => (
            <button key={tok} onClick={() => setPicked(p => [...p, tok])}
              className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-emerald-500/20 border border-slate-700 hover:border-emerald-400/50 text-emerald-200 text-xs transition-all active:scale-95">
              {tok}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button onClick={submit} className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 font-bold hover:brightness-110">
            ▶ RUN
          </Button>
          <Button variant="outline" onClick={() => setPicked([])} className="border-slate-700 text-slate-300">Clear</Button>
          <Button variant="ghost" onClick={() => setPicked(p => p.slice(0, -1))} className="text-slate-400">⌫</Button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// GAME 2: Data Pipeline Plumber
// ============================================================
type PipelineBlockId = "extract" | "filter" | "transform" | "load";
const PIPELINE_BLOCKS: { id: PipelineBlockId; label: string; color: string }[] = [
  { id: "extract", label: "Extract", color: "from-cyan-500 to-blue-500" },
  { id: "filter", label: "Filter(X>10)", color: "from-amber-500 to-orange-500" },
  { id: "transform", label: "Transform", color: "from-fuchsia-500 to-pink-500" },
  { id: "load", label: "Load", color: "from-emerald-500 to-green-500" },
];
const CORRECT_PIPELINE: PipelineBlockId[] = ["extract", "filter", "transform", "load"];

const PipelinePlumber = ({ pushLog, addXp }: { pushLog: (t: LogLine["type"], text: string) => void; addXp: (n: number) => void }) => {
  const { t } = useLanguage();
  const [chain, setChain] = useState<PipelineBlockId[]>([]);
  const [running, setRunning] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number }[]>([]);

  const addBlock = (id: PipelineBlockId) => {
    if (chain.includes(id)) return;
    setChain(c => [...c, id]);
  };
  const removeBlock = (i: number) => setChain(c => c.filter((_, idx) => idx !== i));

  const run = () => {
    const ok = chain.length === CORRECT_PIPELINE.length && chain.every((b, i) => b === CORRECT_PIPELINE[i]);
    if (!ok) {
      pushLog("err", `Pipeline misconfigured. Expected: ${CORRECT_PIPELINE.join(" -> ")}`);
      return;
    }
    setRunning(true);
    pushLog("ok", "Pipeline flowing at 100k rows/sec!");
    addXp(60);
    let n = 0;
    const interval = setInterval(() => {
      n++;
      setParticles(p => [...p, { id: Date.now() + n, x: 0 }]);
      if (n > 8) {
        clearInterval(interval);
        setTimeout(() => { setRunning(false); setParticles([]); }, 1500);
      }
    }, 220);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-cyan-500/30 bg-slate-950 p-5">
        <div className="text-xs text-cyan-300 font-mono mb-3">{t("🔧 KÉO KHỐI ETL THEO THỨ TỰ ĐÚNG", "🔧 ARRANGE ETL BLOCKS IN CORRECT ORDER")}</div>

        {/* Pipeline canvas */}
        <div className="relative rounded-lg bg-black/60 border border-slate-800 p-4 min-h-[140px] overflow-hidden">
          <div className="flex items-center gap-2 flex-wrap relative z-10">
            <div className="px-3 py-2 rounded-md bg-slate-800 border border-cyan-400/50 text-cyan-300 font-mono text-xs">📡 SOURCE</div>
            <AnimatePresence>
              {chain.map((id, i) => {
                const block = PIPELINE_BLOCKS.find(b => b.id === id)!;
                return (
                  <motion.button
                    key={`${id}-${i}`}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    onClick={() => removeBlock(i)}
                    className={`px-3 py-2 rounded-md bg-gradient-to-r ${block.color} text-white font-mono text-xs font-bold shadow-lg hover:brightness-110`}
                  >
                    {block.label} ✕
                  </motion.button>
                );
              })}
            </AnimatePresence>
            <div className="px-3 py-2 rounded-md bg-slate-800 border border-emerald-400/50 text-emerald-300 font-mono text-xs">🎯 DEST</div>
          </div>
          {/* Flowing particles when running */}
          {running && particles.map(p => (
            <motion.div key={p.id}
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: "100%", opacity: 0 }}
              transition={{ duration: 2, ease: "linear" }}
              className="absolute top-1/2 left-2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)]"
            />
          ))}
        </div>

        {/* Block palette */}
        <div className="mt-4">
          <div className="text-xs text-slate-400 font-mono mb-2">{t("Khối có sẵn:", "Available blocks:")}</div>
          <div className="flex flex-wrap gap-2">
            {PIPELINE_BLOCKS.map(b => (
              <button key={b.id} onClick={() => addBlock(b.id)} disabled={chain.includes(b.id)}
                className={`px-4 py-2 rounded-md bg-gradient-to-r ${b.color} text-white font-mono text-xs font-bold shadow hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all`}>
                + {b.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button onClick={run} disabled={running} className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold">
            {running ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : "▶"} RUN PIPELINE
          </Button>
          <Button variant="outline" onClick={() => setChain([])} className="border-slate-700 text-slate-300">Reset</Button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// GAME 3: AI Parameter Tuner
// ============================================================
const AiTuner = ({ pushLog, addXp }: { pushLog: (t: LogLine["type"], text: string) => void; addXp: (n: number) => void }) => {
  const { t } = useLanguage();
  const [lr, setLr] = useState(0.05);
  const [batch, setBatch] = useState(32);
  const [reg, setReg] = useState(0.01);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const claimedRef = useRef(false);

  // Simulate train/val loss based on parameters
  const { trainLoss, valLoss, sweetness } = useMemo(() => {
    const epochs = 30;
    const train: number[] = [];
    const val: number[] = [];
    // Ideal: lr~0.01, batch~32-64, reg~0.005-0.02
    const lrPenalty = Math.abs(Math.log10(lr) - Math.log10(0.01));
    const batchPenalty = Math.abs(batch - 48) / 96;
    const regPenalty = Math.abs(reg - 0.01) * 20;
    for (let e = 0; e < epochs; e++) {
      const tBase = 1.5 * Math.exp(-e / (10 - lrPenalty * 2)) + 0.05;
      const vBase = 1.5 * Math.exp(-e / (12 - lrPenalty * 2)) + 0.15 + Math.max(0, (e - 18) * 0.02 * (regPenalty + lrPenalty));
      train.push(tBase + lrPenalty * 0.1 + batchPenalty * 0.05);
      val.push(vBase + lrPenalty * 0.15 + batchPenalty * 0.08 + regPenalty * 0.05);
    }
    const finalGap = Math.abs(train[epochs - 1] - val[epochs - 1]);
    const sweet = Math.max(0, 100 - (lrPenalty * 40 + batchPenalty * 20 + regPenalty * 10 + finalGap * 50));
    return { trainLoss: train, valLoss: val, sweetness: sweet };
  }, [lr, batch, reg]);

  useEffect(() => {
    setScore(Math.round(sweetness));
    if (sweetness > 85 && !claimedRef.current) {
      claimedRef.current = true;
      pushLog("ok", `Sweet Spot found! Accuracy ${Math.round(sweetness)}%. +80 XP`);
      addXp(80);
    } else if (sweetness < 80) {
      claimedRef.current = false;
    }
  }, [sweetness, pushLog, addXp]);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    const W = cvs.width, H = cvs.height;
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, W, H);
    // Grid
    ctx.strokeStyle = "rgba(148,163,184,0.15)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = (H / 5) * i;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    const maxL = Math.max(...trainLoss, ...valLoss, 1.8);
    const draw = (arr: number[], color: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      arr.forEach((v, i) => {
        const x = (i / (arr.length - 1)) * W;
        const y = H - (v / maxL) * H * 0.9;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
    };
    draw(trainLoss, "#34d399");
    draw(valLoss, "#f472b6");
  }, [trainLoss, valLoss]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="rounded-xl border border-fuchsia-500/30 bg-slate-950 p-5">
        <div className="text-xs text-fuchsia-300 font-mono mb-3">{t("📈 LOSS CURVE", "📈 LOSS CURVE")}</div>
        <canvas ref={canvasRef} width={460} height={260} className="w-full rounded-md border border-slate-800 bg-slate-950" />
        <div className="flex items-center gap-4 mt-3 text-xs font-mono">
          <span className="flex items-center gap-1 text-emerald-300"><span className="w-3 h-0.5 bg-emerald-400" /> train</span>
          <span className="flex items-center gap-1 text-pink-300"><span className="w-3 h-0.5 bg-pink-400" /> val</span>
          <span className="ml-auto text-amber-300">Sweet: {score}%</span>
        </div>
      </div>
      <div className="rounded-xl border border-emerald-500/30 bg-slate-950 p-5 space-y-5 font-mono text-sm">
        <div>
          <div className="flex justify-between text-emerald-300 mb-1"><span>Learning Rate</span><span>{lr.toFixed(4)}</span></div>
          <input type="range" min={0.0001} max={0.5} step={0.0001} value={lr} onChange={e => setLr(parseFloat(e.target.value))} className="w-full accent-emerald-400" />
        </div>
        <div>
          <div className="flex justify-between text-cyan-300 mb-1"><span>Batch Size</span><span>{batch}</span></div>
          <input type="range" min={4} max={128} step={4} value={batch} onChange={e => setBatch(parseInt(e.target.value))} className="w-full accent-cyan-400" />
        </div>
        <div>
          <div className="flex justify-between text-fuchsia-300 mb-1"><span>Regularization</span><span>{reg.toFixed(4)}</span></div>
          <input type="range" min={0} max={0.2} step={0.001} value={reg} onChange={e => setReg(parseFloat(e.target.value))} className="w-full accent-fuchsia-400" />
        </div>
        <div className="rounded-md bg-black/60 border border-slate-800 p-3 text-xs text-slate-400">
          <div>{t("Mục tiêu: Đạt Sweet Spot ≥ 85% bằng cách cân bằng 3 siêu tham số.", "Goal: Reach Sweet Spot ≥ 85% by balancing the 3 hyperparameters.")}</div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN PAGE
// ============================================================
const ProgrammingArcade = () => {
  const { t } = useLanguage();
  const [game, setGame] = useState<GameId>("menu");
  const [xp, setXp] = useState(0);
  const [log, setLog] = useState<LogLine[]>([]);
  const [loading, setLoading] = useState(false);
  const logId = useRef(0);

  const pushLog = (type: LogLine["type"], text: string) => {
    logId.current += 1;
    setLog(l => [...l, { id: logId.current, type, text }]);
  };
  const addXp = (n: number) => setXp(x => x + n);

  // Persist xp to Supabase if logged in (best-effort; non-blocking)
  useEffect(() => {
    if (xp === 0) return;
    const persist = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        localStorage.setItem(`prog_arcade_xp_${user.id}`, String(xp));
      } catch { /* ignore */ }
    };
    persist();
  }, [xp]);

  const switchTo = (g: GameId) => {
    setLoading(true);
    setTimeout(() => {
      setGame(g);
      setLoading(false);
      pushLog("info", `Loaded module: ${g.toUpperCase()}`);
    }, 500);
  };

  const cards = [
    { id: "sql" as const, title: "SQL Dungeon", desc: t("Trận đấu RPG dùng SELECT/WHERE/COUNT để hạ quái.", "Retro RPG: defeat monsters with SQL queries."), icon: Database, color: "from-violet-500 to-purple-600" },
    { id: "pipeline" as const, title: "Data Pipeline Plumber", desc: t("Kéo thả Extract → Filter → Transform → Load.", "Drag Extract → Filter → Transform → Load."), icon: Code2, color: "from-cyan-500 to-emerald-500" },
    { id: "tuner" as const, title: "AI Parameter Tuner", desc: t("Tinh chỉnh siêu tham số để chạm Sweet Spot.", "Tune hyperparameters to hit the Sweet Spot."), icon: Brain, color: "from-fuchsia-500 to-pink-500" },
    { id: "galaxy" as const, title: "Code Galaxy", desc: t("Sắp xếp snippet code đúng category — Foundations, Data, AI.", "Sort code snippets by category — Foundations, Data, AI."), icon: Sparkles, color: "from-emerald-500 to-cyan-500" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <SEO title="Tech & Code Game Hub | Learn Programming - HaiEduTech" description="Arcade lập trình: SQL Dungeon, Data Pipeline Plumber, AI Parameter Tuner. Học code qua game." path="/programming/arcade" />
      <Navbar />
      <div className="pt-6 pb-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-screen">
        <div className="container mx-auto px-3 sm:px-6 max-w-6xl">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/40 bg-emerald-500/5 text-emerald-300 text-xs font-mono mb-3">
              <Sparkles className="w-3 h-3" /> &gt; tech_arcade.boot
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-fuchsia-300">
              Tech &amp; Code Game Hub
            </h1>
            <p className="text-slate-400 text-sm">{t("Học SQL, Data Engineering và AI qua 3 mini-game tương tác.", "Learn SQL, Data Engineering, and AI through 3 interactive mini-games.")}</p>
          </motion.div>

          <GameHeader xp={xp} log={log} current={game} onBack={() => setGame("menu")} />

          {loading && (
            <div className="flex items-center justify-center gap-3 py-10 font-mono text-emerald-300">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="animate-pulse">{">> initializing module..."}</span>
            </div>
          )}

          {!loading && game === "menu" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cards.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.button
                    key={c.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => switchTo(c.id)}
                    className="text-left rounded-xl border border-slate-700 bg-slate-950/80 hover:border-emerald-400/50 hover:shadow-[0_0_40px_-15px_rgba(16,185,129,0.6)] transition-all p-5 group"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-100 mb-1 font-mono">{c.title}</h3>
                    <p className="text-xs text-slate-400 mb-3">{c.desc}</p>
                    <div className="text-xs text-emerald-300 font-mono group-hover:text-emerald-200">&gt; ./run</div>
                  </motion.button>
                );
              })}
            </div>
          )}

          {!loading && game === "sql" && <SqlDungeon pushLog={pushLog} addXp={addXp} />}
          {!loading && game === "pipeline" && <PipelinePlumber pushLog={pushLog} addXp={addXp} />}
          {!loading && game === "tuner" && <AiTuner pushLog={pushLog} addXp={addXp} />}
          {!loading && game === "galaxy" && <CodeGalaxy onExit={() => setGame("menu")} onScore={addXp} />}

          <div className="text-center mt-8">
            <Link to="/programming" className="text-xs font-mono text-slate-500 hover:text-emerald-300">&lt; ../programming</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProgrammingArcade;
