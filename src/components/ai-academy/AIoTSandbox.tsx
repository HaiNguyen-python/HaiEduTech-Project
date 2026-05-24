/**
 * AIoTSandbox — "Smart traffic light controller"
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

  const LaneCars = ({ lane, dir }: { lane: Lane; dir: "row" | "row-reverse" | "col" | "col-reverse" }) => (
    <div className={`flex ${dir.startsWith("row") ? "flex-row" : "flex-col"} ${dir.endsWith("reverse") ? "flex-row-reverse flex-col-reverse" : ""} gap-0.5 items-center justify-center`}>
      {Array.from({ length: Math.min(queues[lane], 6) }).map((_, i) => (
        <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-lg">🚗</motion.span>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Crossroad */}
      <div className="rounded-2xl border-2 border-cyan-400/40 bg-gradient-to-br from-slate-900 via-cyan-950/60 to-slate-900 p-3">
        <div className="grid grid-cols-3 grid-rows-3 aspect-square max-w-xs mx-auto gap-0">
          {/* row 1 */}
          <div />
          <div className="flex items-end justify-center pb-1"><LaneCars lane="N" dir="col" /></div>
          <div />
          {/* row 2 */}
          <div className="flex items-center justify-end pr-1"><LaneCars lane="W" dir="row" /></div>
          <div className="relative bg-slate-800 border-2 border-slate-700 rounded-lg flex items-center justify-center">
            {/* Lights */}
            <div className="grid grid-cols-3 gap-1 text-xs">
              {LANES.map((l) => (
                <div
                  key={l}
                  className={`w-5 h-5 rounded-full border-2 ${
                    activeLane === l ? "bg-emerald-400 border-emerald-200 shadow-[0_0_12px_rgba(52,211,153,0.9)]" : "bg-rose-600 border-rose-300"
                  } flex items-center justify-center text-[8px] font-bold text-white`}
                >
                  {l}
                </div>
              )).slice(0, 4)}
            </div>
          </div>
          <div className="flex items-center justify-start pl-1"><LaneCars lane="E" dir="row-reverse" /></div>
          {/* row 3 */}
          <div />
          <div className="flex items-start justify-center pt-1"><LaneCars lane="S" dir="col-reverse" /></div>
          <div />
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
          <div className="rounded-lg bg-cyan-500/10 border border-cyan-400/30 py-1.5">
            <div className="opacity-70">Đèn xanh</div>
            <div className="font-black text-base text-emerald-300">{activeLane}</div>
          </div>
          <div className="rounded-lg bg-cyan-500/10 border border-cyan-400/30 py-1.5">
            <div className="opacity-70">Đi qua</div>
            <div className="font-black text-base text-cyan-300">{throughput}</div>
          </div>
          <div className="rounded-lg bg-cyan-500/10 border border-cyan-400/30 py-1.5">
            <div className="opacity-70">Chờ TB</div>
            <div className="font-black text-base text-amber-300">{avgWait}</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="p-3 rounded-xl border bg-card">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>🚦 Ngưỡng kẹt xe</span>
            <span className="font-bold text-cyan-600">{threshold} xe</span>
          </div>
          <Slider value={[threshold]} min={2} max={10} step={1} onValueChange={(v) => setThreshold(v[0])} />
        </div>
        <div className="p-3 rounded-xl border bg-card">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>⏱️ Thời gian xanh</span>
            <span className="font-bold text-cyan-600">{phase}s</span>
          </div>
          <Slider value={[phase]} min={2} max={10} step={1} onValueChange={(v) => setPhase(v[0])} />
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={() => setRunning((r) => !r)} className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
          {running ? <><Pause className="w-4 h-4 mr-1" /> Tạm dừng</> : <><Play className="w-4 h-4 mr-1" /> Tiếp tục</>}
        </Button>
        <Button onClick={reset} variant="outline">Reset</Button>
      </div>

      <p className="text-xs text-muted-foreground flex items-start gap-2">
        <Cpu className="w-3.5 h-3.5 mt-0.5 text-cyan-500 shrink-0" />
        <span>Cảm biến IoT đếm xe → vi điều khiển chạy luật <b>If-Else</b> → bật đèn xanh cho luồng đông nhất. Singapore, Tokyo, Hà Nội đang dùng nguyên lý này để giảm 20-40% kẹt xe.</span>
      </p>
    </div>
  );
};

export default AIoTSandbox;
