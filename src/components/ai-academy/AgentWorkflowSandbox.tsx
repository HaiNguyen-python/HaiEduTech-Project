/**
 * AgentWorkflowSandbox — drag-to-build a 3-node AI agent pipeline, then
 * "Run" to send a glowing light particle through each connected node.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Cloud, GitBranch, MessageCircle, Sparkles } from "lucide-react";
import { BonusGames } from "./SandboxBonusGames";

const AG_TF = [
  { q: "AI Agent có thể gọi nhiều 'công cụ' (tools) khác nhau.", a: true },
  { q: "Một agent chỉ làm được 1 việc duy nhất.", a: false, why: "Agent xâu chuỗi nhiều bước: fetch → suy luận → hành động." },
  { q: "Pipeline = chuỗi các bước nối tiếp nhau.", a: true },
  { q: "ChatGPT 'Browse + Code Interpreter' là một dạng AI Agent.", a: true },
  { q: "Agent không cần điều kiện rẽ nhánh.", a: false, why: "Nó cần kiểm tra (if mưa thì SMS, nếu không thì lưu log)." },
];
const AG_PAIRS = [
  { a: "Tool calling", b: "Agent gọi hàm bên ngoài" },
  { a: "Pipeline", b: "Chuỗi các node thực thi nối tiếp" },
  { a: "Condition", b: "Bước rẽ nhánh dựa trên dữ liệu" },
  { a: "Memory", b: "Lưu lại ngữ cảnh cho lần sau" },
];

type NodeKind = "fetch" | "condition" | "sms" | "translate" | "summarize";
const PALETTE: { kind: NodeKind; label: string; icon: typeof Cloud; color: string }[] = [
  { kind: "fetch", label: "Fetch Weather", icon: Cloud, color: "from-sky-500 to-cyan-500" },
  { kind: "condition", label: "Condition Check", icon: GitBranch, color: "from-amber-500 to-orange-500" },
  { kind: "sms", label: "Send SMS", icon: MessageCircle, color: "from-emerald-500 to-teal-500" },
  { kind: "translate", label: "Translate VI↔EN", icon: Sparkles, color: "from-fuchsia-500 to-purple-500" },
  { kind: "summarize", label: "Summarize News", icon: Sparkles, color: "from-rose-500 to-pink-500" },
];

const AgentWorkflowSandbox = () => {
  const [pipeline, setPipeline] = useState<NodeKind[]>([]);
  const [running, setRunning] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);

  const add = (k: NodeKind) => {
    if (pipeline.length >= 4) return;
    setPipeline((p) => [...p, k]);
  };

  const run = async () => {
    if (pipeline.length < 2 || running) return;
    setRunning(true);
    for (let i = 0; i < pipeline.length; i++) {
      setActiveIdx(i);
      await new Promise((r) => setTimeout(r, 700));
    }
    setActiveIdx(-1);
    setRunning(false);
  };

  const reset = () => {
    setPipeline([]);
    setActiveIdx(-1);
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        🧩 Chạm để thêm node vào pipeline. Bấm <b>Run</b> xem agent thực thi từng bước.
      </p>

      {/* Palette */}
      <div className="flex flex-wrap gap-1.5">
        {PALETTE.map((p) => (
          <button
            key={p.kind}
            onClick={() => add(p.kind)}
            disabled={pipeline.length >= 4}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-white bg-gradient-to-r ${p.color} shadow disabled:opacity-40 active:scale-95 transition`}
          >
            <p.icon className="w-3 h-3 inline mr-1" />
            {p.label}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div className="min-h-[140px] rounded-2xl border-2 border-dashed border-indigo-400/40 bg-indigo-500/5 p-3">
        {pipeline.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-muted-foreground py-8">
            👆 Chọn ít nhất 2 node để xây pipeline
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-1.5">
            {pipeline.map((k, i) => {
              const node = PALETTE.find((p) => p.kind === k)!;
              const isActive = activeIdx === i;
              return (
                <div key={i} className="flex items-center gap-1.5">
                  <motion.div
                    animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ duration: 0.6 }}
                    className={`relative px-2.5 py-2 rounded-lg text-[11px] font-bold text-white bg-gradient-to-r ${node.color} shadow ${
                      isActive ? "ring-4 ring-yellow-300" : ""
                    }`}
                  >
                    <node.icon className="w-3 h-3 inline mr-1" />
                    {node.label}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-lg bg-yellow-300/40"
                        animate={{ opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  {i < pipeline.length - 1 && (
                    <div className="relative w-6 h-0.5 bg-indigo-400/50">
                      {running && activeIdx >= i && (
                        <motion.div
                          initial={{ x: -8, opacity: 0 }}
                          animate={{ x: 24, opacity: [0, 1, 0] }}
                          transition={{ duration: 0.7 }}
                          className="absolute -top-1 w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_8px_2px_rgba(253,224,71,0.8)]"
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={run}
          disabled={pipeline.length < 2 || running}
          className="flex-1 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-blue-600 disabled:opacity-40 active:scale-95"
        >
          <Play className="w-4 h-4 inline mr-1" />
          {running ? "Đang chạy..." : "Run Agent"}
        </button>
        <button
          onClick={reset}
          className="px-3 py-2 rounded-xl text-sm font-bold border-2 border-border hover:border-rose-400 transition"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <BonusGames tfItems={AG_TF} matchPairs={AG_PAIRS} accent="from-indigo-500 to-blue-600" border="border-indigo-400/40" />
    </div>
  );
};

export default AgentWorkflowSandbox;
