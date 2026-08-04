/**
 * RLSandbox - "Self-driving Maze"
 * A 4x4 grid with coins and obstacles. The student tunes the reward for
 * collecting coins and the penalty for hitting obstacles; a tiny greedy
 * pathfinder replays the trip and the running score updates live.
 * Demonstrates the core reward/penalty loop of Reinforcement Learning.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Car, Play, RefreshCcw, Coins, Bomb } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { BonusGames } from "./SandboxBonusGames";
import { BestMatchPick } from "./SandboxMiniActivity";

const RL_TF = [
  { q: "RL learns through a Reward - Penalty mechanism.", a: true },
  { q: "DeepMind's AlphaGo used RL to learn the game of Go.", a: true },
  { q: "RL requires someone to label every action as right or wrong.", a: false, why: "No labels needed - the agent tries, fails, and receives a score instead." },
  { q: "Tesla Autopilot trains on billions of simulated kilometers.", a: true },
  { q: "Agent is the name for the 'player' in RL.", a: true },
];
const RL_PAIRS = [
  { a: "Agent", b: "The character that makes decisions" },
  { a: "Environment", b: "The world the agent lives in" },
  { a: "Reward", b: "Points earned for a correct action" },
  { a: "Policy", b: "The strategy for choosing actions" },
];

type Cell = "empty" | "coin" | "obstacle" | "goal";

const SIZE = 4;
// Layout: S = start (0,0), G = goal (3,3), C = coin, X = obstacle
const LAYOUT: Cell[][] = [
  ["empty",    "coin",     "obstacle", "empty"],
  ["obstacle", "empty",    "coin",     "empty"],
  ["empty",    "obstacle", "empty",    "coin"],
  ["coin",     "empty",    "empty",    "goal"],
];

type Pos = { r: number; c: number };

const buildPath = (reward: number, penalty: number): Pos[] => {
  // Toy "policy": greedy walk right/down, but if penalty for obstacles
  // outweighs reward for coins, agent detours around obstacle cells.
  const avoid = penalty > reward;
  const path: Pos[] = [{ r: 0, c: 0 }];
  let r = 0, c = 0;
  while (r !== SIZE - 1 || c !== SIZE - 1) {
    const tryDown = r < SIZE - 1 ? LAYOUT[r + 1][c] : null;
    const tryRight = c < SIZE - 1 ? LAYOUT[r][c + 1] : null;
    const downBad = avoid && tryDown === "obstacle";
    const rightBad = avoid && tryRight === "obstacle";

    if (r === SIZE - 1) c++;
    else if (c === SIZE - 1) r++;
    else if (downBad && !rightBad) c++;
    else if (rightBad && !downBad) r++;
    else if (tryDown === "coin" && !avoid) r++;
    else if (tryRight === "coin" && !avoid) c++;
    else (Math.random() > 0.5 ? r++ : c++);

    path.push({ r, c });
    if (path.length > 16) break;
  }
  return path;
};

const RLSandbox = () => {
  const [reward, setReward] = useState(10);
  const [penalty, setPenalty] = useState(5);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const tRef = useRef<number | null>(null);

  const path = useMemo(() => buildPath(reward, penalty), [reward, penalty]);

  // Score up to current step
  const score = useMemo(() => {
    let s = 0;
    for (let i = 1; i <= step && i < path.length; i++) {
      const { r, c } = path[i];
      const cell = LAYOUT[r][c];
      if (cell === "coin") s += reward;
      if (cell === "obstacle") s -= penalty;
      if (cell === "goal") s += 20;
    }
    return s;
  }, [step, path, reward, penalty]);

  const stop = () => {
    if (tRef.current) window.clearInterval(tRef.current);
    tRef.current = null;
    setRunning(false);
  };

  useEffect(() => () => stop(), []);

  const run = () => {
    stop();
    setStep(0);
    setRunning(true);
    let i = 0;
    tRef.current = window.setInterval(() => {
      i++;
      setStep(i);
      if (i >= path.length - 1) {
        stop();
      }
    }, 380);
  };

  const reset = () => {
    stop();
    setStep(0);
  };

  const agent = path[Math.min(step, path.length - 1)];

  return (
    <div className="space-y-3 sm:space-y-4 [&>*+*]:pt-3 sm:[&>*+*]:pt-4 [&>*+*]:border-t [&>*+*]:border-border/40">
      {/* Grid */}
      <div className="rounded-2xl border-2 border-emerald-400/40 bg-gradient-to-br from-slate-900 via-emerald-950/60 to-slate-900 p-3">
        <div className="grid grid-cols-4 gap-1.5 aspect-square max-w-xs mx-auto">
          {LAYOUT.flatMap((row, r) =>
            row.map((cell, c) => {
              const isAgent = agent.r === r && agent.c === c;
              const visited = path.slice(0, step + 1).some((p) => p.r === r && p.c === c);
              return (
                <div
                  key={`${r}-${c}`}
                  className={`relative aspect-square rounded-lg flex items-center justify-center text-xl sm:text-2xl transition ${
                    cell === "goal"
                      ? "bg-emerald-500/30 border-2 border-emerald-300"
                      : cell === "obstacle"
                      ? "bg-rose-500/20 border border-rose-400/40"
                      : cell === "coin"
                      ? "bg-amber-400/20 border border-amber-300/40"
                      : "bg-slate-800/60 border border-slate-700"
                  } ${visited && !isAgent ? "ring-1 ring-cyan-400/60" : ""}`}
                >
                  {cell === "coin" && "🪙"}
                  {cell === "obstacle" && "💣"}
                  {cell === "goal" && "🏁"}
                  {isAgent && (
                    <motion.div
                      layoutId="agent"
                      transition={{ type: "spring", stiffness: 260, damping: 24 }}
                      className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                    >
                      🚗
                    </motion.div>
                  )}
                </div>
              );
            }),
          )}
        </div>

        <div className="flex items-center justify-between mt-2 text-sm">
          <div className="text-emerald-300">Step: <b>{step}</b></div>
          <div className="text-cyan-300">
            Score: <motion.span key={score} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="font-black text-lg">{score}</motion.span>
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="p-3 rounded-xl border bg-card">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="flex items-center gap-1"><Coins className="w-4 h-4 text-amber-500" /> Reward / coin</span>
            <span className="font-bold text-amber-600">+{reward}</span>
          </div>
          <Slider value={[reward]} min={0} max={20} step={1} onValueChange={(v) => setReward(v[0])} />
        </div>
        <div className="p-3 rounded-xl border bg-card">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="flex items-center gap-1"><Bomb className="w-4 h-4 text-rose-500" /> Penalty / obstacle</span>
            <span className="font-bold text-rose-600">-{penalty}</span>
          </div>
          <Slider value={[penalty]} min={0} max={20} step={1} onValueChange={(v) => setPenalty(v[0])} />
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={run} disabled={running} className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white">
          <Play className="w-4 h-4 mr-1" /> {running ? "Running..." : "Run Simulation"}
        </Button>
        <Button onClick={reset} variant="outline">
          <RefreshCcw className="w-4 h-4 mr-1" /> Reset
        </Button>
      </div>

      <p className="text-xs text-muted-foreground flex items-start gap-2">
        <Car className="w-3.5 h-3.5 mt-0.5 text-emerald-500 shrink-0" />
        <span>When <b>penalty &gt; reward</b>, the agent learns to <b>avoid</b> obstacles. Tesla and Waymo self-driving cars train on the exact same Reward-Penalty loop - just billions of times bigger.</span>
      </p>

      <BestMatchPick
        title="🎮 Reward or Penalty? Classify the RL signal"
        hint="When training a self-driving car, should each behavior get a reward or a penalty?"
        accent="from-emerald-500 to-cyan-600"
        border="border-emerald-400/40"
        options={[
          { id: "reward", label: "🍬 Reward (+)" },
          { id: "penalty", label: "⚡ Penalty (-)" },
          { id: "neutral", label: "➖ Neutral (0)" },
        ]}
        items={[
          { prompt: "Car stays in its lane for 10 straight seconds", correctId: "reward" },
          { prompt: "Car crashes into an obstacle", correctId: "penalty" },
          { prompt: "Car brakes hard for no reason", correctId: "penalty" },
          { prompt: "Car reaches the goal safely, faster than target", correctId: "reward" },
          { prompt: "Car stops correctly at a red light", correctId: "reward" },
          { prompt: "Car stays parked and never moves", correctId: "neutral" },
        ]}
      />

      <BonusGames tfItems={RL_TF} matchPairs={RL_PAIRS} accent="from-emerald-500 to-cyan-600" border="border-emerald-400/40" />
    </div>
  );
};

export default RLSandbox;
