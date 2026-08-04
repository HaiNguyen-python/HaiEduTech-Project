/**
 * AgentWorkflowSandbox - drag-to-build a 3-node AI agent pipeline, then
 * "Run" to send a glowing light particle through each connected node.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Cloud, GitBranch, MessageCircle, Sparkles } from "lucide-react";
import { BonusGames } from "./SandboxBonusGames";
import { BestMatchPick } from "./SandboxMiniActivity";

const AG_TF = [
  { q: "An AI agent can call several different 'tools'.", a: true },
  { q: "An agent can only ever do one single task.", a: false, why: "An agent chains multiple steps together: fetch -> reason -> act." },
  { q: "A pipeline is a chain of steps executed one after another.", a: true },
  { q: "ChatGPT with 'Browse + Code Interpreter' is a form of AI agent.", a: true },
  { q: "Agents never need conditional branching.", a: false, why: "They often need conditions, like 'if it's raining, send an SMS; otherwise log it'." },
];
const AG_PAIRS = [
  { a: "Tool calling", b: "The agent invoking an external function" },
  { a: "Pipeline", b: "A chain of nodes executed in sequence" },
  { a: "Condition", b: "A branching step based on data" },
  { a: "Memory", b: "Storing context for later use" },
];

type NodeKind = "fetch" | "condition" | "sms" | "translate" | "summarize";
const PALETTE: { kind: NodeKind; label: string; icon: typeof Cloud; color: string }[] = [
  { kind: "fetch", label: "Fetch Weather", icon: Cloud, color: "from-sky-500 to-cyan-500" },
  { kind: "condition", label: "Condition Check", icon: GitBranch, color: "from-amber-500 to-orange-500" },
  { kind: "sms", label: "Send SMS", icon: MessageCircle, color: "from-emerald-500 to-teal-500" },
  { kind: "translate", label: "Translate VI<->EN", icon: Sparkles, color: "from-fuchsia-500 to-purple-500" },
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
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">
        🧩 Tap to add nodes to the pipeline. Hit <b>Run</b> to watch the agent execute each step.
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
            👆 Pick at least 2 nodes to build a pipeline
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
          {running ? "Running..." : "Run Agent"}
        </button>
        <button
          onClick={reset}
          className="px-3 py-2 rounded-xl text-sm font-bold border-2 border-border hover:border-rose-400 transition"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <BestMatchPick
        title="🧰 Pick the right tool for each task"
        hint="An agent needs to choose the correct tool for each request."
        accent="from-indigo-500 to-blue-600"
        border="border-indigo-400/40"
        options={[
          { id: "search", label: "🔎 Web Search" },
          { id: "code", label: "💻 Code Interpreter" },
          { id: "cal", label: "📅 Calendar" },
          { id: "mail", label: "📧 Email" },
        ]}
        items={[
          { prompt: "Summarize this week's latest AI news", correctId: "search" },
          { prompt: "Chart revenue data from an Excel file", correctId: "code" },
          { prompt: "Schedule a meeting with 3 friends on Friday at 8am", correctId: "cal" },
          { prompt: "Send a thank-you email to a list of customers", correctId: "mail" },
        ]}
      />

      <BestMatchPick
        title="📋 Order the agent's flight-booking plan correctly"
        hint="What order should an agent booking a flight follow these steps in?"
        accent="from-indigo-500 to-blue-600"
        border="border-indigo-400/40"
        options={[
          { id: "1", label: "Step 1" },
          { id: "2", label: "Step 2" },
          { id: "3", label: "Step 3" },
          { id: "4", label: "Step 4" },
        ]}
        items={[
          { prompt: "Ask the user: travel date, departure/arrival airport, budget", correctId: "1" },
          { prompt: "Search multiple airlines (VietJet, Bamboo, Vietnam Airlines) to compare prices", correctId: "2" },
          { prompt: "Suggest the 3 cheapest flights and confirm with the user", correctId: "3" },
          { prompt: "Call the payment API and email the ticket", correctId: "4" },
        ]}
      />

      <BonusGames tfItems={AG_TF} matchPairs={AG_PAIRS} accent="from-indigo-500 to-blue-600" border="border-indigo-400/40" />
    </div>
  );
};

export default AgentWorkflowSandbox;
