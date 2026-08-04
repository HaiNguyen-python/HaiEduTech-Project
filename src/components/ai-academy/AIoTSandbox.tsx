/**
 * AIoTSandbox - "Smart traffic light controller"
 * A 4-way crossroad with 4 lanes. Cars spawn at random; the student tunes
 * congestion thresholds and the green-phase budget. A simple If-Else policy
 * keeps the busier lane green longer. Average waiting time and total throughput
 * update in real-time.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Cpu, TrafficCone, Play, Pause } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { BonusGames } from "./SandboxBonusGames";
import { BestMatchPick } from "./SandboxMiniActivity";

const IOT_TF = [
  { q: "AIoT = AI + IoT (Internet-connected sensors).", a: true },
  { q: "Smart traffic lights change automatically based on traffic flow.", a: true },
  { q: "IoT sensors only collect data and never send it anywhere.", a: false, why: "IoT devices must transmit data to the cloud or edge for processing." },
  { q: "Singapore uses AIoT to cut traffic jams by 20-40%.", a: true },
  { q: "Edge computing means processing data right on the device.", a: true },
];
const IOT_PAIRS = [
  { a: "Sensor", b: "A device that measures things (temperature, light, cars...)" },
  { a: "Actuator", b: "The part that acts (turns on a light, spins a fan)" },
  { a: "Edge AI", b: "AI running directly on a small device" },
  { a: "Smart City", b: "A city that runs on AIoT" },
];

type Lane = "N" | "S" | "E" | "W";
const LANES: Lane[] = ["N", "S", "E", "W"];

const AIoTSandbox = () => {
  const [threshold, setThreshold] = useState(5);
  const [phase, setPhase] = useState(4); // seconds budget per lane
  const [running, setRunning] = useState(true);
  const [queues, setQueues] = useState<Record<Lane, number>>({ N: 2, S: 1, E: 4, W: 0 });
  const [activeLane, setActiveLane] = useState<Lane>("E");
  const [tick, setTick] = useState(0);
  const [throughput, setThroughput] = useState(0);
  const [totalWait, setTotalWait] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) {
      if (timerRef.current) window.clearInterval(timerRef.current);
      return;
    }
    timerRef.current = window.setInterval(() => {
      setTick((t) => t + 1);
      setQueues((q) => {
        const next = { ...q };
        // Random arrivals
        LANES.forEach((l) => { if (Math.random() < 0.55) next[l] += 1; });
        // Departures from active lane
        const leave = Math.min(next[activeLane], 2);
        next[activeLane] -= leave;
        setThroughput((x) => x + leave);
        // Accumulated waiting time (every waiting car adds 1 unit per tick)
        setTotalWait((w) => w + LANES.reduce((s, l) => s + next[l], 0));
        return next;
      });
    }, 700);
    return () => { if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [running, activeLane]);

  // If-Else policy: every `phase` ticks, pick the longest queue if it exceeds threshold
  useEffect(() => {
    if (tick > 0 && tick % phase === 0) {
      const sorted = [...LANES].sort((a, b) => queues[b] - queues[a]);
      const candidate = sorted[0];
      if (queues[candidate] >= threshold || candidate !== activeLane) {
        setActiveLane(candidate);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  const reset = () => {
    setQueues({ N: 2, S: 1, E: 4, W: 0 });
    setThroughput(0); setTotalWait(0); setTick(0); setActiveLane("E");
  };

  const avgWait = useMemo(() => (tick === 0 ? 0 : (totalWait / Math.max(throughput, 1)).toFixed(1)), [tick, totalWait, throughput]);

  const LaneCars = ({ lane, orientation }: { lane: Lane; orientation: "vertical" | "horizontal" }) => {
    const cars = Array.from({ length: Math.min(queues[lane], 5) });
    return (
      <div
        className={`flex items-center justify-center gap-0.5 overflow-hidden w-full h-full ${
          orientation === "vertical" ? "flex-col" : "flex-row"
        }`}
      >
        {cars.map((_, i) => (
          <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-base leading-none">🚗</motion.span>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-3 sm:space-y-4 [&>*+*]:pt-3 sm:[&>*+*]:pt-4 [&>*+*]:border-t [&>*+*]:border-border/40">
      {/* Crossroad */}
      <div className="rounded-2xl border-2 border-cyan-400/40 bg-gradient-to-br from-slate-900 via-cyan-950/60 to-slate-900 p-3">
        <div className="grid grid-cols-3 grid-rows-3 aspect-square max-w-xs mx-auto gap-1">
          <div />
          <div className="overflow-hidden flex items-end justify-center pb-1"><LaneCars lane="N" orientation="vertical" /></div>
          <div />
          <div className="overflow-hidden flex items-center justify-end pr-1"><LaneCars lane="W" orientation="horizontal" /></div>
          <div className="relative bg-slate-800 border-2 border-slate-700 rounded-lg flex items-center justify-center">
            <div className="grid grid-cols-2 gap-1 text-xs p-1">
              {LANES.map((l) => (
                <div
                  key={l}
                  className={`w-5 h-5 rounded-full border-2 ${
                    activeLane === l ? "bg-emerald-400 border-emerald-200 shadow-[0_0_12px_rgba(52,211,153,0.9)]" : "bg-rose-600 border-rose-300"
                  } flex items-center justify-center text-[8px] font-bold text-white`}
                >
                  {l}
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden flex items-center justify-start pl-1"><LaneCars lane="E" orientation="horizontal" /></div>
          <div />
          <div className="overflow-hidden flex items-start justify-center pt-1"><LaneCars lane="S" orientation="vertical" /></div>
          <div />
        </div>

        <div className="grid grid-cols-3 gap-2 mt-2 text-center text-xs">
          <div className="rounded-lg bg-cyan-500/10 border border-cyan-400/30 py-1.5">
            <div className="opacity-70">Green Light</div>
            <div className="font-black text-base text-emerald-300">{activeLane}</div>
          </div>
          <div className="rounded-lg bg-cyan-500/10 border border-cyan-400/30 py-1.5">
            <div className="opacity-70">Passed</div>
            <div className="font-black text-base text-cyan-300">{throughput}</div>
          </div>
          <div className="rounded-lg bg-cyan-500/10 border border-cyan-400/30 py-1.5">
            <div className="opacity-70">Avg Wait</div>
            <div className="font-black text-base text-amber-300">{avgWait}</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="p-3 rounded-xl border bg-card">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>🚦 Congestion Threshold</span>
            <span className="font-bold text-cyan-600">{threshold} cars</span>
          </div>
          <Slider value={[threshold]} min={2} max={10} step={1} onValueChange={(v) => setThreshold(v[0])} />
        </div>
        <div className="p-3 rounded-xl border bg-card">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>⏱️ Green Phase Duration</span>
            <span className="font-bold text-cyan-600">{phase}s</span>
          </div>
          <Slider value={[phase]} min={2} max={10} step={1} onValueChange={(v) => setPhase(v[0])} />
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={() => setRunning((r) => !r)} className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
          {running ? <><Pause className="w-4 h-4 mr-1" /> Pause</> : <><Play className="w-4 h-4 mr-1" /> Resume</>}
        </Button>
        <Button onClick={reset} variant="outline">Reset</Button>
      </div>

      <p className="text-xs text-muted-foreground flex items-start gap-2">
        <Cpu className="w-3.5 h-3.5 mt-0.5 text-cyan-500 shrink-0" />
        <span>An IoT sensor counts cars, a microcontroller runs an <b>If-Else</b> rule, and the busiest lane gets the green light. Singapore, Tokyo, and Hanoi use this exact principle to cut traffic jams by 20-40%.</span>
      </p>

      <BestMatchPick
        title="🏠 What should a smart fridge do?"
        hint="For each sensor signal, pick the smartest AIoT action the fridge should send to your phone."
        accent="from-cyan-500 to-blue-600"
        border="border-cyan-400/40"
        options={[
          { id: "alert", label: "🔔 Send an alert" },
          { id: "order", label: "🛒 Auto-order" },
          { id: "cool", label: "❄️ Lower the temperature" },
          { id: "nothing", label: "💤 Do nothing" },
        ]}
        items={[
          { prompt: "Sensor: fridge door has been open for over 2 minutes", correctId: "alert" },
          { prompt: "Sensor: milk carton expires in 2 days", correctId: "alert" },
          { prompt: "Sensor: milk is completely out", correctId: "order" },
          { prompt: "Sensor: fridge temperature rose to 12C (normal is 4C)", correctId: "cool" },
        ]}
      />

      <BonusGames tfItems={IOT_TF} matchPairs={IOT_PAIRS} accent="from-cyan-500 to-blue-600" border="border-cyan-400/40" />
    </div>
  );
};

export default AIoTSandbox;
