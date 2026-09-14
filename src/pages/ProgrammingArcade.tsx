/**
 * @file ProgrammingArcade.tsx
 * @description Tech & Code Game Hub - eight programming review games with shared XP tracking.
 * Dark terminal-style arcade dashboard for Learn Programming.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Code2, Database, Brain, Zap, Trophy, Loader2, Sparkles, Clock3, Gauge, Play, Target, ShieldCheck, Keyboard, Bug, GitBranch, LockKeyhole, RotateCcw, Binary, Terminal, Wand2, Flame, Volume2, VolumeX, Medal } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import CodeGalaxy from "@/components/games/CodeGalaxy";
import { BigODetective, BugHunter, CyberShield, DataTypeSorter, GitBranchQuest, PromptArchitect, PythonSpeedRun, TerminalRescue } from "@/components/games/ProgrammingReviewGames";
import { finishGame } from "@/lib/gameSession";
import { ARCADE_BADGES, arcadeLevel, loadArcadeProgress, recordArcadeRun, setArcadeSound, type ArcadeProgress } from "@/lib/arcadeProgress";
import { playArcadeCue, setArcadeSoundEnabled } from "@/lib/arcadeSound";

type GameId = "menu" | "sql" | "pipeline" | "tuner" | "galaxy" | "python" | "bugs" | "git" | "cyber" | "bigo" | "terminal" | "types" | "prompt";

/** Total number of missions in the hub, shared with badge unlocking. */
const TOTAL_GAMES = 12;

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
    <div className="arcade-status mb-7 font-mono text-sm">
      <div className="flex flex-wrap items-center gap-3">
        {current !== "menu" && (
          <Button variant="ghost" onClick={onBack} className="min-h-11 text-[hsl(var(--arcade-green))] hover:bg-[hsl(var(--arcade-green)/0.1)] hover:text-[hsl(var(--arcade-green))]">
            <ArrowLeft className="w-4 h-4" /> Mission board
          </Button>
        )}
        <div className="arcade-stat">
          <Zap className="w-4 h-4 text-[hsl(var(--arcade-gold))]" />
          <span className="text-[hsl(var(--arcade-muted))]">TOTAL XP</span>
          <span className="font-bold text-[hsl(var(--arcade-text))]">{xp}</span>
        </div>
        <div className="arcade-stat">
          <Trophy className="w-4 h-4 text-[hsl(var(--arcade-blue))]" />
          <span className="text-[hsl(var(--arcade-muted))]">LEVEL</span>
          <span className="font-bold text-[hsl(var(--arcade-text))]">{level}</span>
        </div>
        <div className="min-w-[150px] flex-1">
          <div className="mb-1 flex justify-between text-[11px] text-[hsl(var(--arcade-muted))]"><span>NEXT LEVEL</span><span>{xpInLevel}/100 XP</span></div>
          <div className="h-2 overflow-hidden rounded-full bg-[hsl(var(--arcade-line))]">
            <div className="arcade-progress h-full transition-all" style={{ width: `${xpInLevel}%` }} />
          </div>
        </div>
      </div>
      <div className={`arcade-terminal mt-3 max-h-24 overflow-y-auto text-xs ${log.length === 0 && current === "menu" ? "hidden sm:block" : ""}`} aria-live="polite">
        {log.length === 0 ? (
          <div className="text-[hsl(var(--arcade-muted))]">{"> mission control ready - choose your challenge"}</div>
        ) : (
          log.slice(-8).map(l => (
            <div key={l.id} className={l.type === "ok" ? "text-[hsl(var(--arcade-green))]" : l.type === "err" ? "text-destructive" : "text-[hsl(var(--arcade-muted))]"}>
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
  {
    monster: "Sorting Sphinx",
    emoji: "🦁",
    hp: 60,
    prompt: "Sắp xếp phù thủy theo power giảm dần.",
    promptEn: "Sort wizards by power from high to low.",
    table: {
      name: "wizards",
      cols: ["id", "name", "power"],
      rows: [[1, "Mira", 80], [2, "Lyra", 65], [3, "Orin", 90]],
    },
    solution: ["SELECT", "name", "FROM", "wizards", "ORDER BY", "power", "DESC"],
    reward: 60,
  },
  {
    monster: "Ice Wraith",
    emoji: "🧊",
    hp: 55,
    prompt: "Lấy phù thủy tên Mira.",
    promptEn: "Select the wizard named Mira.",
    table: {
      name: "wizards",
      cols: ["id", "name", "power"],
      rows: [[1, "Mira", 80], [2, "Lyra", 65], [3, "Orin", 90]],
    },
    solution: ["SELECT", "*", "FROM", "wizards", "WHERE", "name", "=", "'Mira'"],
    reward: 55,
  },
  {
    monster: "Sum Golem",
    emoji: "🗿",
    hp: 65,
    prompt: "Tính tổng power của tất cả phù thủy.",
    promptEn: "Compute the total power of all wizards.",
    table: {
      name: "wizards",
      cols: ["id", "name", "power"],
      rows: [[1, "Mira", 80], [2, "Lyra", 65], [3, "Orin", 90]],
    },
    solution: ["SELECT", "SUM(power)", "FROM", "wizards"],
    reward: 65,
  },
  {
    monster: "Average Alchemist",
    emoji: "⚗️",
    hp: 70,
    prompt: "Tính power trung bình của phù thủy.",
    promptEn: "Compute the average wizard power.",
    table: {
      name: "wizards",
      cols: ["id", "name", "power"],
      rows: [[1, "Mira", 80], [2, "Lyra", 65], [3, "Orin", 90]],
    },
    solution: ["SELECT", "AVG(power)", "FROM", "wizards"],
    reward: 70,
  },
  {
    monster: "Guild Gatekeeper",
    emoji: "🛡️",
    hp: 75,
    prompt: "Đếm số phù thủy theo từng guild.",
    promptEn: "Count wizards per guild.",
    table: {
      name: "members",
      cols: ["id", "guild", "power"],
      rows: [[1, "Fire", 80], [2, "Ice", 65], [3, "Fire", 90]],
    },
    solution: ["SELECT", "guild", "COUNT(*)", "FROM", "members", "GROUP BY", "guild"],
    reward: 75,
  },
  {
    monster: "Top Rank Titan",
    emoji: "🏔️",
    hp: 85,
    prompt: "Lấy 1 phù thủy mạnh nhất.",
    promptEn: "Select the single strongest wizard.",
    table: {
      name: "wizards",
      cols: ["id", "name", "power"],
      rows: [[1, "Mira", 80], [2, "Lyra", 65], [3, "Orin", 90]],
    },
    solution: ["SELECT", "name", "FROM", "wizards", "ORDER BY", "power", "DESC", "LIMIT", "1"],
    reward: 85,
  },
  {
    monster: "Elite Enchanter",
    emoji: "🔮",
    hp: 90,
    prompt: "Lấy phù thủy có power > 70 và thuộc guild Fire.",
    promptEn: "Select wizards with power > 70 in the Fire guild.",
    table: {
      name: "members",
      cols: ["id", "guild", "power"],
      rows: [[1, "Fire", 80], [2, "Ice", 65], [3, "Fire", 90]],
    },
    solution: ["SELECT", "*", "FROM", "members", "WHERE", "power", ">", "70", "AND", "guild", "=", "'Fire'"],
    reward: 90,
  },
];

const SQL_TOKENS = [
  "SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY", "DESC", "LIMIT",
  "name", "guild", "wizards", "members", "power",
  ">", "=", "70", "1", "'Mira'", "'Fire'",
  "COUNT(*)", "SUM(power)", "AVG(power)", "*", "AND", "id",
];

const SqlDungeon = ({ pushLog, addXp }: { pushLog: (t: LogLine["type"], text: string) => void; addXp: (n: number) => void }) => {
  const { t } = useLanguage();
  const [idx, setIdx] = useState(0);
  const [hp, setHp] = useState(SQL_RIDDLES[0].hp);
  const [picked, setPicked] = useState<string[]>([]);
  const [shake, setShake] = useState(false);
  const [cleared, setCleared] = useState<number | null>(null);
  const riddle = SQL_RIDDLES[idx];
  const runScoreRef = useRef(0);
  const totalXp = SQL_RIDDLES.reduce((sum, r) => sum + r.reward, 0);

  useEffect(() => {
    setHp(riddle.hp);
    setPicked([]);
  }, [idx, riddle.hp]);

  const submit = () => {
    const ok = picked.length === riddle.solution.length && picked.every((p, i) => p === riddle.solution[i]);
    if (ok) {
      pushLog("ok", `Query executed. ${riddle.monster} defeated! +${riddle.reward} XP`);
      addXp(riddle.reward);
      runScoreRef.current += riddle.reward;
      setHp(0);
      setTimeout(() => {
        if (idx + 1 < SQL_RIDDLES.length) setIdx(idx + 1);
        else {
          pushLog("ok", "Dungeon cleared! All monsters defeated.");
          void finishGame({ gameType: "prog_sql_dungeon", score: runScoreRef.current });
          setCleared(runScoreRef.current);
        }
      }, 900);
    } else {
      pushLog("err", `Syntax Error near ${picked[picked.length - 1] ?? "?"}. Rebuild the query and run again.`);
      setShake(true);
      setTimeout(() => setShake(false), 350);
    }
  };

  const replay = () => {
    runScoreRef.current = 0;
    setCleared(null);
    setIdx(0);
    setPicked([]);
    setHp(SQL_RIDDLES[0].hp);
  };

  if (cleared !== null) {
    return (
      <div className="arcade-game-panel flex min-h-[320px] flex-col items-center justify-center gap-4 p-6 text-center">
        <div className="text-6xl" aria-hidden>🏆</div>
        <div>
          <h2 className="font-display text-2xl font-bold text-[hsl(var(--arcade-text))]">{t("Đã phá đảo hầm ngục", "Dungeon cleared")}</h2>
          <p className="mt-2 text-lg font-bold text-[hsl(var(--arcade-gold))]">{cleared} / {totalXp} XP</p>
          <p className="mt-1 text-sm text-[hsl(var(--arcade-muted))]">
            {t(`Đã hạ ${SQL_RIDDLES.length}/${SQL_RIDDLES.length} quái vật`, `${SQL_RIDDLES.length} of ${SQL_RIDDLES.length} monsters defeated`)}
          </p>
        </div>
        <Button onClick={replay} className="min-h-11 bg-[hsl(var(--arcade-blue))] text-[hsl(var(--arcade-canvas))] hover:bg-[hsl(var(--arcade-blue)/0.9)]">
          <RotateCcw className="h-4 w-4" /> {t("Chơi lại", "Play again")}
        </Button>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">

      {/* Battle screen */}
      <motion.div animate={shake ? { x: [-8, 8, -6, 6, 0] } : {}} transition={{ duration: 0.35 }} className="arcade-game-panel flex min-h-[280px] flex-col items-center justify-center p-6 font-mono">
        <div className="text-xs text-fuchsia-300 mb-2">{t("⚔️ TRẬN ĐẤU", "⚔️ BATTLE")}</div>
        <motion.div key={idx} animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-7xl mb-3">
          {riddle.emoji}
        </motion.div>
        <div className="text-emerald-300 text-lg font-bold mb-2">{riddle.monster}</div>
        <div className="h-3 w-full max-w-xs overflow-hidden rounded-full border border-[hsl(var(--arcade-line))] bg-[hsl(var(--arcade-panel))]">
          <motion.div className="h-full bg-gradient-to-r from-rose-500 to-amber-400" animate={{ width: `${(hp / riddle.hp) * 100}%` }} />
        </div>
        <div className="mt-1 text-xs text-[hsl(var(--arcade-muted))]">HP: {hp}/{riddle.hp}</div>
      </motion.div>

      {/* Query builder */}
      <div className="arcade-game-panel p-5 font-mono">
        <div className="text-xs text-emerald-300 mb-2">{t("📜 Câu đố", "📜 Riddle")}</div>
        <div className="mb-3 text-sm text-[hsl(var(--arcade-text))]">{t(riddle.prompt, riddle.promptEn)}</div>
        <div className="arcade-terminal mb-3 overflow-x-auto">
          <div className="mb-1 text-xs text-[hsl(var(--arcade-muted))]">/* table: {riddle.table.name} */</div>
          <table className="min-w-[600px] text-xs text-[hsl(var(--arcade-text))]">
            <thead><tr>{riddle.table.cols.map(c => <th key={c} className="text-left pr-4 text-cyan-300">{c}</th>)}</tr></thead>
            <tbody>{riddle.table.rows.map((r, i) => <tr key={i}>{r.map((v, j) => <td key={j} className="pr-4 py-0.5">{v}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <div className="arcade-terminal mb-3 min-h-[52px] text-sm text-[hsl(var(--arcade-green))]">
          <span className="text-[hsl(var(--arcade-muted))]">sql&gt; </span>
          {picked.length === 0 ? <span className="text-[hsl(var(--arcade-muted))]">{t("...nhấn token bên dưới", "...click tokens below")}</span> : picked.join(" ")}
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {SQL_TOKENS.map(tok => (
            <Button key={tok} variant="outline" onClick={() => setPicked(p => [...p, tok])}
              className="min-h-11 border-[hsl(var(--arcade-line))] bg-[hsl(var(--arcade-panel))] px-3 text-xs text-[hsl(var(--arcade-green))] hover:border-[hsl(var(--arcade-green)/0.5)] hover:bg-[hsl(var(--arcade-green)/0.12)] hover:text-[hsl(var(--arcade-green))]">
              {tok}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button onClick={submit} className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-900 font-bold hover:brightness-110">
            ▶ RUN
          </Button>
          <Button variant="outline" onClick={() => setPicked([])} className="border-[hsl(var(--arcade-line))] bg-[hsl(var(--arcade-panel))] text-[hsl(var(--arcade-text))] hover:bg-[hsl(var(--arcade-line))] hover:text-[hsl(var(--arcade-text))]">Clear</Button>
          <Button variant="ghost" aria-label="Remove last SQL token" onClick={() => setPicked(p => p.slice(0, -1))} className="min-h-11 text-[hsl(var(--arcade-muted))]">⌫</Button>
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
  const timersRef = useRef<{ interval?: number; timeout?: number }>({});

  // Never leave the flow animation running after the player leaves the game
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      if (timers.interval) clearInterval(timers.interval);
      if (timers.timeout) clearTimeout(timers.timeout);
    };
  }, []);

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
    void finishGame({ gameType: "prog_pipeline_plumber", score: 60 });
    let n = 0;
    const interval = window.setInterval(() => {
      n++;
      setParticles(p => [...p, { id: Date.now() + n, x: 0 }]);
      if (n > 8) {
        clearInterval(interval);
        timersRef.current.timeout = window.setTimeout(() => { setRunning(false); setParticles([]); }, 1500);
      }
    }, 220);
    timersRef.current.interval = interval;
  };

  return (
    <div className="space-y-4">
      <div className="arcade-game-panel p-5">
        <div className="text-xs text-cyan-300 font-mono mb-3">{t("🔧 KÉO KHỐI ETL THEO THỨ TỰ ĐÚNG", "🔧 ARRANGE ETL BLOCKS IN CORRECT ORDER")}</div>

        {/* Pipeline canvas */}
        <div className="arcade-terminal relative min-h-[140px] overflow-hidden p-4">
          <div className="flex items-center gap-2 flex-wrap relative z-10">
            <div className="rounded-md border border-cyan-400/50 bg-[hsl(var(--arcade-panel))] px-3 py-2 font-mono text-xs text-cyan-300">📡 SOURCE</div>
            <AnimatePresence>
              {chain.map((id, i) => {
                const block = PIPELINE_BLOCKS.find(b => b.id === id)!;
                return (
                  <motion.div
                    key={`${id}-${i}`}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    className="flex items-center gap-1"
                  >
                    <Button onClick={() => removeBlock(i)} className={`min-h-11 bg-gradient-to-r ${block.color} font-mono text-xs font-bold text-primary-foreground shadow-lg hover:brightness-110`}>{block.label} ✕</Button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            <div className="rounded-md border border-emerald-400/50 bg-[hsl(var(--arcade-panel))] px-3 py-2 font-mono text-xs text-emerald-300">🎯 DEST</div>
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
          <div className="mb-2 font-mono text-xs text-[hsl(var(--arcade-muted))]">{t("Khối có sẵn:", "Available blocks:")}</div>
          <div className="flex flex-wrap gap-2">
            {PIPELINE_BLOCKS.map(b => (
              <Button key={b.id} onClick={() => addBlock(b.id)} disabled={chain.includes(b.id)}
                className={`min-h-11 bg-gradient-to-r ${b.color} px-4 font-mono text-xs font-bold text-primary-foreground shadow hover:brightness-110`}>
                + {b.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button onClick={run} disabled={running} className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold">
            {running ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : "▶"} RUN PIPELINE
          </Button>
          <Button variant="outline" onClick={() => setChain([])} className="border-[hsl(var(--arcade-line))] bg-[hsl(var(--arcade-panel))] text-[hsl(var(--arcade-text))] hover:bg-[hsl(var(--arcade-line))] hover:text-[hsl(var(--arcade-text))]">Reset</Button>
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
      void finishGame({ gameType: "prog_ai_tuner", score: Math.round(sweetness) });
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
      <div className="arcade-game-panel p-5">
        <div className="text-xs text-fuchsia-300 font-mono mb-3">{t("📈 LOSS CURVE", "📈 LOSS CURVE")}</div>
        <canvas ref={canvasRef} width={460} height={260} className="w-full rounded-md border border-[hsl(var(--arcade-line))] bg-[hsl(var(--arcade-canvas))]" />
        <div className="flex items-center gap-4 mt-3 text-xs font-mono">
          <span className="flex items-center gap-1 text-emerald-300"><span className="w-3 h-0.5 bg-emerald-400" /> train</span>
          <span className="flex items-center gap-1 text-pink-300"><span className="w-3 h-0.5 bg-pink-400" /> val</span>
          <span className="ml-auto text-amber-300">Sweet: {score}%</span>
        </div>
      </div>
      <div className="arcade-game-panel space-y-5 p-5 font-mono text-sm">
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
        <div className="arcade-terminal text-xs text-[hsl(var(--arcade-muted))]">
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
    { id: "sql" as const, chibi: "🧙", title: "SQL Dungeon", skill: "DATABASE QUEST", desc: t("Đánh bại 10 quái vật bằng truy vấn SELECT, WHERE, hàm tổng hợp và sắp xếp.", "Defeat 10 monsters with SELECT, WHERE, aggregate, and sorting queries."), goal: t("Xây truy vấn đúng thứ tự", "Build queries in the right order"), difficulty: t("Tăng dần", "Progressive"), time: "8-12 min", reward: "Up to 660 XP", icon: Database, tone: "blue" },
    { id: "pipeline" as const, chibi: "🤖", title: "Data Pipeline Plumber", skill: "DATA ENGINEERING", desc: t("Nối các khối xử lý để dữ liệu đi từ nguồn tới đích mà không bị tắc.", "Connect processing blocks so data flows cleanly from source to destination."), goal: "Extract → Filter → Transform → Load", difficulty: t("Cơ bản", "Beginner"), time: "3-5 min", reward: "60 XP", icon: Code2, tone: "green" },
    { id: "tuner" as const, chibi: "🧠", title: "AI Parameter Tuner", skill: "MACHINE LEARNING", desc: t("Điều chỉnh ba siêu tham số, đọc đường loss và tìm vùng mô hình hoạt động tốt nhất.", "Tune three hyperparameters, read the loss curves, and find the model's sweet spot."), goal: t("Đạt Sweet Spot từ 85%", "Reach an 85% Sweet Spot"), difficulty: t("Trung bình", "Intermediate"), time: "5-8 min", reward: "80 XP", icon: Brain, tone: "gold" },
    { id: "galaxy" as const, chibi: "🚀", title: "Code Galaxy", skill: "CODE RECOGNITION", desc: t("Phân loại 42 đoạn code thuộc Foundations, Data Engineering và AI/ML.", "Classify 42 code snippets across Foundations, Data Engineering, and AI/ML."), goal: t("Nhận diện mẫu code nhanh", "Recognize code patterns fast"), difficulty: t("3 đường chơi", "3 tracks"), time: "6-10 min", reward: "15 XP / answer", icon: Sparkles, tone: "pink" },
    { id: "python" as const, chibi: "⌨️", title: "Python Speed Run", skill: "PYTHON FLUENCY", desc: t("Gõ chính xác năm đoạn Python theo độ khó tăng dần và đua với đồng hồ.", "Retype five Python snippets with rising difficulty and race the clock."), goal: t("Tăng tốc độ và độ chính xác", "Build speed and accuracy"), difficulty: t("Tăng dần", "Progressive"), time: "5-8 min", reward: "Up to 595 XP", icon: Keyboard, tone: "green" },
    { id: "bugs" as const, chibi: "🐛", title: "Bug Hunter", skill: "DEBUGGING", desc: t("Săn lỗi cú pháp và logic phổ biến trong tám đoạn code Python.", "Find common syntax and logic errors across eight Python snippets."), goal: t("Chọn bản sửa đúng", "Choose the correct fix"), difficulty: t("Cơ bản", "Beginner"), time: "5-7 min", reward: "Up to 160 XP", icon: Bug, tone: "pink" },
    { id: "git" as const, chibi: "🌿", title: "Git Branch Quest", skill: "VERSION CONTROL", desc: t("Chọn đúng lệnh cho commit, branch, merge và khôi phục lịch sử.", "Choose the right commands for commits, branches, merges, and recovery."), goal: t("Hoàn thành quy trình Git", "Complete the Git workflow"), difficulty: t("Trung bình", "Intermediate"), time: "5-7 min", reward: "Up to 160 XP", icon: GitBranch, tone: "blue" },
    { id: "cyber" as const, chibi: "🛡️", title: "Cyber Shield", skill: "DIGITAL SAFETY", desc: t("Phản ứng đúng trước phishing, mật khẩu yếu, quyền truy cập và lộ bí mật.", "Respond safely to phishing, weak passwords, permissions, and exposed secrets."), goal: t("Bảo vệ tài khoản và dữ liệu", "Protect accounts and data"), difficulty: t("Cơ bản", "Beginner"), time: "5-7 min", reward: "Up to 160 XP", icon: LockKeyhole, tone: "gold" },
  ];

  return (
    <div className="arcade-page min-h-screen">
      <SEO title="Tech & Code Game Hub | HaiEduTech" description="Eight programming games for practising Python, debugging, Git, cybersecurity, SQL, data engineering, AI and code recognition." path="/programming/arcade" />
      <Navbar />
      <div className="arcade-stage min-h-screen pb-16 pt-8 sm:pt-10">
        <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 font-mono text-xs font-bold text-[hsl(var(--arcade-green))]">
                <ShieldCheck className="h-4 w-4" /> SYSTEM STATUS: ONLINE
              </div>
              <h1 className="max-w-3xl font-display text-4xl font-black leading-tight text-[hsl(var(--arcade-text))] sm:text-5xl lg:text-6xl">
                TECH &amp; CODE <span className="arcade-title-accent">GAME HUB</span>
              </h1>
              <p className="mt-3 max-w-2xl text-base text-[hsl(var(--arcade-muted))] sm:text-lg">{t("Chọn nhiệm vụ, luyện kỹ năng thật và tích lũy XP qua tám trò chơi lập trình.", "Choose a mission, practise real skills, and earn XP through eight coding games.")}</p>
            </div>
            <div className="arcade-online-badge"><span className="arcade-live-dot" /> 8 MISSIONS READY</div>
          </motion.div>

          <GameHeader xp={xp} log={log} current={game} onBack={() => setGame("menu")} />

          {loading && (
            <div className="flex items-center justify-center gap-3 py-10 font-mono text-emerald-300">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="animate-pulse">{">> initializing module..."}</span>
            </div>
          )}

          {!loading && game === "menu" && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {cards.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`arcade-mission arcade-mission--${c.tone} group h-full`}
                  >
                    <div className="arcade-corner" aria-hidden />
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <div className="arcade-icon"><Icon className="h-6 w-6" /></div>
                        <motion.div animate={{ y: [0, -5, 0], rotate: [-3, 3, -3] }} transition={{ duration: 3.5, repeat: Infinity }} className="select-none text-5xl drop-shadow-xl" aria-hidden>{c.chibi}</motion.div>
                      </div>
                      <div className="arcade-skill">{c.skill}</div>
                      <h2 className="mt-2 font-display text-2xl font-bold text-[hsl(var(--arcade-text))]">{c.title}</h2>
                      <p className="mt-2 line-clamp-3 max-w-xl text-sm leading-relaxed text-[hsl(var(--arcade-muted))]">{c.desc}</p>
                      <div className="my-5 flex items-start gap-2 border-l-2 border-current pl-3 text-sm text-[hsl(var(--arcade-text))]">
                        <Target className="mt-0.5 h-4 w-4 shrink-0" /><span>{c.goal}</span>
                      </div>
                      <div className="mt-auto flex flex-wrap gap-2 text-xs text-[hsl(var(--arcade-muted))]">
                        <span className="arcade-meta"><Gauge className="h-3.5 w-3.5" />{c.difficulty}</span>
                        <span className="arcade-meta"><Clock3 className="h-3.5 w-3.5" />{c.time}</span>
                        <span className="arcade-meta arcade-reward"><Zap className="h-3.5 w-3.5" />{c.reward}</span>
                      </div>
                      <Button onClick={() => switchTo(c.id)} className="arcade-play mt-5 min-h-11 w-full sm:w-auto sm:self-start">
                        <Play className="h-4 w-4 fill-current" /> {t("Bắt đầu nhiệm vụ", "Play mission")}
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {!loading && game === "sql" && <SqlDungeon pushLog={pushLog} addXp={addXp} />}
          {!loading && game === "pipeline" && <PipelinePlumber pushLog={pushLog} addXp={addXp} />}
          {!loading && game === "tuner" && <AiTuner pushLog={pushLog} addXp={addXp} />}
          {!loading && game === "galaxy" && <CodeGalaxy onExit={() => setGame("menu")} onScore={addXp} />}
          {!loading && game === "python" && <PythonSpeedRun onScore={addXp} />}
          {!loading && game === "bugs" && <BugHunter onScore={addXp} />}
          {!loading && game === "git" && <GitBranchQuest onScore={addXp} />}
          {!loading && game === "cyber" && <CyberShield onScore={addXp} />}

          <div className="mt-9 text-center">
            <Button asChild variant="ghost" className="text-[hsl(var(--arcade-muted))] hover:bg-[hsl(var(--arcade-panel))] hover:text-[hsl(var(--arcade-green))]">
              <Link to="/programming"><ArrowLeft className="h-4 w-4" /> {t("Quay lại Programming", "Back to Programming")}</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProgrammingArcade;
