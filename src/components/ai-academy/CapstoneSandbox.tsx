/**
 * CapstoneSandbox - "Build your AI Assistant"
 * Drag (click-to-add) skill modules from previous tracks into the central
 * Core. When all 4 required modules are installed, the diagnostic boot
 * sequence runs and reveals the finished assistant with confetti.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, CheckCircle2, Sparkles, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { BonusGames } from "./SandboxBonusGames";
import { BestMatchPick } from "./SandboxMiniActivity";

const CAP_TF = [
  { q: "A good AI assistant combines several modules (vision, NLP, ethics...).", a: true },
  { q: "One NLP module alone is enough to build a versatile assistant.", a: false, why: "A strong assistant needs multiple combined capabilities, not just language." },
  { q: "An ethics filter helps AI refuse dangerous requests.", a: true },
  { q: "The more modules an assistant has, the more resources it consumes.", a: true },
  { q: "AI is ready to deploy without any safety review.", a: false, why: "Every AI product must pass ethics and safety testing before release." },
];
const CAP_PAIRS = [
  { a: "Vision module", b: "Eyes - recognizes images/camera feeds" },
  { a: "NLP module", b: "Understands and generates language" },
  { a: "Neural core", b: "The reasoning brain" },
  { a: "Ethics layer", b: "Protects against unsafe or harmful outputs" },
];

type ModuleId = "vision" | "nlp" | "brain" | "ethics" | "rl" | "iot";

const MODULES: { id: ModuleId; emoji: string; label: string; color: string }[] = [
  { id: "vision", emoji: "👁️", label: "Vision (Eyes)",        color: "from-cyan-400 to-blue-500" },
  { id: "nlp",    emoji: "💬", label: "Language (NLP)",       color: "from-fuchsia-400 to-purple-500" },
  { id: "brain",  emoji: "🧠", label: "Brain (Neural Net)",   color: "from-emerald-400 to-teal-500" },
  { id: "ethics", emoji: "🛡️", label: "Ethics",               color: "from-purple-400 to-violet-500" },
  { id: "rl",     emoji: "🎮", label: "Self-Learning (RL)",   color: "from-emerald-400 to-cyan-500" },
  { id: "iot",    emoji: "📡", label: "IoT Connection",       color: "from-cyan-400 to-sky-500" },
];

const REQUIRED: ModuleId[] = ["vision", "nlp", "brain", "ethics"];

const BOOT_LINES = [
  "🔌 Booting processing core...",
  "👁️ Calibrating recognition camera...",
  "💬 Loading language model...",
  "🧠 Activating 86 billion simulated neurons...",
  "🛡️ Enabling ethics and safety filters...",
  "✅ AI assistant ready to serve!",
];

const CapstoneSandbox = () => {
  const [installed, setInstalled] = useState<ModuleId[]>([]);
  const [booting, setBooting] = useState(false);
  const [bootStep, setBootStep] = useState(0);
  const [ready, setReady] = useState(false);

  const allReq = REQUIRED.every((m) => installed.includes(m));

  const toggle = (id: ModuleId) => {
    if (booting || ready) return;
    setInstalled((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  const boot = () => {
    setBooting(true);
    setBootStep(0);
    let i = 0;
    const iv = window.setInterval(() => {
      i++;
      setBootStep(i);
      if (i >= BOOT_LINES.length) {
        window.clearInterval(iv);
        setBooting(false);
        setReady(true);
        confetti({ particleCount: 220, spread: 120, origin: { y: 0.6 } });
        setTimeout(() => confetti({
          particleCount: 160, spread: 100, origin: { y: 0.4 },
          colors: ["#a855f7", "#06b6d4", "#f59e0b", "#10b981"],
        }), 320);
      }
    }, 650);
  };

  const reset = () => {
    setInstalled([]); setBooting(false); setBootStep(0); setReady(false);
  };

  return (
    <div className="space-y-3 sm:space-y-4 [&>*+*]:pt-3 sm:[&>*+*]:pt-4 [&>*+*]:border-t [&>*+*]:border-border/40">
      {/* Module library */}
      <div className="rounded-2xl border-2 border-amber-400/40 bg-amber-500/5 p-3">
        <div className="text-[11px] font-bold uppercase text-amber-700 dark:text-amber-300 mb-2 flex items-center gap-1">
          <Cpu className="w-3 h-3" /> Module library (tap to install/remove)
        </div>
        <div className="grid grid-cols-3 gap-2">
          {MODULES.map((m) => {
            const on = installed.includes(m.id);
            const req = REQUIRED.includes(m.id);
            return (
              <button
                key={m.id}
                onClick={() => toggle(m.id)}
                className={`relative p-2 rounded-xl border-2 transition active:scale-95 ${
                  on
                    ? "border-emerald-500 bg-emerald-500/15 shadow"
                    : "border-border bg-card hover:border-amber-400/50"
                }`}
              >
                <div className={`w-10 h-10 mx-auto rounded-xl bg-gradient-to-br ${m.color} text-white flex items-center justify-center text-xl mb-1 ${on ? "" : "opacity-60"}`}>
                  {m.emoji}
                </div>
                <div className="text-[10px] font-bold leading-tight text-center">{m.label}</div>
                {req && <span className="absolute top-1 right-1 text-[8px] font-black text-rose-500">★</span>}
                {on && <CheckCircle2 className="absolute top-1 left-1 w-3 h-3 text-emerald-500" />}
              </button>
            );
          })}
        </div>
        <p className="text-[10px] text-muted-foreground mt-2">★ = required module to boot the core</p>
      </div>

      {/* Core assembly */}
      <div className="relative rounded-2xl border-2 border-purple-400/40 bg-gradient-to-br from-slate-900 via-purple-950/60 to-slate-900 p-5 min-h-[220px] flex items-center justify-center overflow-hidden">
        {/* glow */}
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent" />

        {!ready && !booting && (
          <div className="relative text-center">
            <motion.div
              animate={{ rotate: installed.length > 0 ? 360 : 0 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-28 h-28 mx-auto rounded-full border-4 border-dashed border-purple-400/60 flex items-center justify-center text-5xl mb-2"
            >
              🤖
            </motion.div>
            <div className="flex flex-wrap justify-center gap-1 max-w-xs mx-auto mb-2">
              <AnimatePresence>
                {installed.map((id) => {
                  const m = MODULES.find((x) => x.id === id)!;
                  return (
                    <motion.div
                      key={id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${m.color} text-white text-base flex items-center justify-center shadow`}
                      title={m.label}
                    >
                      {m.emoji}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            <div className="text-xs text-purple-200">
              {installed.length} / {MODULES.length} modules · {REQUIRED.filter((r) => installed.includes(r)).length}/{REQUIRED.length} required
            </div>
          </div>
        )}

        {booting && (
          <div className="relative w-full">
            <div className="text-center mb-2">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-5xl"
              >🤖</motion.div>
            </div>
            <div className="font-mono text-xs space-y-1 max-w-sm mx-auto">
              {BOOT_LINES.slice(0, bootStep).map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-emerald-300"
                >{l}</motion.div>
              ))}
            </div>
          </div>
        )}

        {ready && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative text-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-2 drop-shadow-[0_0_24px_rgba(168,85,247,0.8)]"
            >🤖</motion.div>
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-purple-500 text-white text-xs font-black">
              <Sparkles className="w-3 h-3" /> AI Certified Guru
            </div>
            <p className="text-sm text-purple-100 mt-2">Your AI assistant is ready! 🎉</p>
          </motion.div>
        )}
      </div>

      <div className="flex gap-2">
        {!ready ? (
          <Button
            onClick={boot}
            disabled={!allReq || booting}
            className="flex-1 bg-gradient-to-r from-amber-500 via-purple-500 to-fuchsia-500 text-white"
          >
            <Sparkles className="w-4 h-4 mr-1" /> {booting ? "Starting..." : "Start the assistant"}
          </Button>
        ) : (
          <Button onClick={reset} variant="outline" className="flex-1">
            <RefreshCcw className="w-4 h-4 mr-1" /> Rebuild
          </Button>
        )}
      </div>

      {!allReq && !ready && (
        <p className="text-xs text-rose-600 dark:text-rose-400 text-center">
          ⚠️ You need all 4 ★ modules (Vision, Language, Brain, Ethics) to start.
        </p>
      )}

      <BestMatchPick
        title="🧩 Activity 2 · Match modules to their function"
        hint="Each module in the AI assistant handles a different role - match them correctly."
        accent="from-amber-500 to-fuchsia-600"
        border="border-amber-400/40"
        options={[
          { id: "vision", label: "👁️ Vision" },
          { id: "nlp", label: "💬 NLP" },
          { id: "brain", label: "🧠 Neural Core" },
          { id: "ethics", label: "🛡️ Ethics" },
          { id: "rl", label: "🎮 RL" },
          { id: "iot", label: "📡 IoT" },
        ]}
        items={[
          { prompt: "Analyze camera footage to recognize someone entering the house", correctId: "vision" },
          { prompt: "Answer questions in natural, fluent English", correctId: "nlp" },
          { prompt: "Refuse a request to build a weapon", correctId: "ethics" },
          { prompt: "Reason over data to make a decision", correctId: "brain" },
          { prompt: "Learn to control a robot through trial and error", correctId: "rl" },
          { prompt: "Read the temperature from a smart-home sensor", correctId: "iot" },
        ]}
      />

      <BonusGames tfItems={CAP_TF} matchPairs={CAP_PAIRS} accent="from-amber-500 to-fuchsia-600" border="border-amber-400/40" />
    </div>
  );
};

export default CapstoneSandbox;
