/**
 * PromptLabSandbox - Hands-on lab for 5 prompt-engineering patterns:
 * Role, Few-shot, Chain-of-Thought, ReAct, Self-Critique.
 * Students pick a pattern, see a template, and assemble a stronger prompt.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Wand2, Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BonusGames } from "./SandboxBonusGames";
import { ChipFilter, BestMatchPick } from "./SandboxMiniActivity";

type Pattern = {
  id: string;
  emoji: string;
  name: string;
  desc: string;
  template: string;
  example: string;
};
const PATTERNS: Pattern[] = [
  {
    id: "role",
    emoji: "🎭",
    name: "Role Prompting",
    desc: "Give the AI a specific ROLE so it answers like an expert.",
    template: "You are a {ROLE}. Please {TASK} for {AUDIENCE}, in a {STYLE} style.",
    example: "You are a math tutor with 15 years of experience. Explain derivatives to an 11th grader who's fallen behind, using a real-world car speed example.",
  },
  {
    id: "fewshot",
    emoji: "📚",
    name: "Few-shot",
    desc: "Give the AI 2-3 sample EXAMPLES before asking - it will copy the style.",
    template: "Example 1: {INPUT_1} → {OUTPUT_1}\nExample 2: {INPUT_2} → {OUTPUT_2}\nNow: {NEW_INPUT} →",
    example: "Example 1: 'The weather is lovely today' → 😊 positive\nExample 2: 'That test was so hard' → 😞 negative\nNow: 'Waking up early for school is exhausting' →",
  },
  {
    id: "cot",
    emoji: "🧠",
    name: "Chain-of-Thought (CoT)",
    desc: "Ask the AI to 'think step by step' before answering - raises accuracy by 30-50%.",
    template: "{QUESTION}\nThink STEP BY STEP before giving your final answer.",
    example: "Mom has 7 apples, gives 3 to her son, then buys 5 more. How many does she have now? Think STEP BY STEP.",
  },
  {
    id: "react",
    emoji: "🤖",
    name: "ReAct (Reason + Act)",
    desc: "The AI alternates between THINKING and ACTING (calling a tool, searching, calculating).",
    template: "You have these tools: [search, calculator, calendar].\nGoal: {GOAL}\nEach turn, return JSON: {thought, action, action_input}.",
    example: "Tools: [search, calculator]. Goal: 'Find the population of Hanoi, then calculate 5% of it'. Begin.",
  },
  {
    id: "critic",
    emoji: "🔍",
    name: "Self-Critique",
    desc: "Make the AI GRADE and IMPROVE its own answer.",
    template: "{QUESTION}\nAfter answering, rate yourself 1-10 and write a better version.",
    example: "Write a 100-word paragraph on 'Why reading matters'. Then rate it 1-10 and write an improved v2 fixing the weak points.",
  },
];

const PL_TF = [
  { q: "Chain-of-Thought asks the AI to think step by step before answering.", a: true },
  { q: "Few-shot means giving the AI a few sample examples to imitate.", a: true },
  { q: "Role Prompting typically starts with 'You are an expert in X...'.", a: true },
  { q: "The shorter a prompt, the better - context isn't needed.", a: false, why: "The opposite is true - a prompt rich in context gives more accurate results." },
  { q: "ReAct = the AI reasons and calls tools (search, calculator) alternately.", a: true },
];
const PL_PAIRS = [
  { a: "Role", b: "You are an expert in X..." },
  { a: "Few-shot", b: "Give the AI a few sample examples" },
  { a: "CoT", b: "Think step by step" },
  { a: "ReAct", b: "Reason + call tools" },
  { a: "Self-Critique", b: "AI grades and fixes itself" },
];

const PromptLabSandbox = () => {
  const [pid, setPid] = useState(PATTERNS[0].id);
  const [draft, setDraft] = useState(PATTERNS[0].example);
  const [copied, setCopied] = useState(false);
  const p = PATTERNS.find((x) => x.id === pid)!;

  const pick = (id: string) => {
    const np = PATTERNS.find((x) => x.id === id)!;
    setPid(id);
    setDraft(np.example);
    setCopied(false);
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(draft); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* noop */ }
  };

  return (
    <div className="space-y-3 sm:space-y-4 [&>*+*]:pt-3 sm:[&>*+*]:pt-4 [&>*+*]:border-t [&>*+*]:border-border/40">
      <div className="rounded-2xl border-2 border-purple-400/40 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 p-3">
        <h4 className="text-sm font-bold text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-1">
          <Wand2 className="w-4 h-4" /> 5 patterns every Prompt Engineer must know
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PATTERNS.map((it) => (
            <button
              key={it.id}
              onClick={() => pick(it.id)}
              className={`p-2 rounded-xl border-2 text-xs font-bold transition text-left ${
                pid === it.id
                  ? "border-purple-500 bg-purple-500/20 text-purple-700 dark:text-purple-200"
                  : "border-border bg-card hover:border-purple-400/40"
              }`}
            >
              <div className="text-lg">{it.emoji}</div>
              {it.name}
            </button>
          ))}
        </div>
      </div>

      <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border-2 border-fuchsia-400/40 bg-fuchsia-500/5 p-3 space-y-2">
        <p className="text-sm text-foreground"><b>{p.emoji} {p.name}</b> - {p.desc}</p>
        <div className="rounded-lg bg-card border border-border p-2 text-xs font-mono whitespace-pre-wrap text-muted-foreground">
          {p.template}
        </div>
        <label className="text-xs font-bold text-fuchsia-700 dark:text-fuchsia-300">✍️ Try writing a prompt using this pattern:</label>
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={4}
          className="text-sm font-mono"
        />
        <Button onClick={copy} size="sm" variant="outline" className="border-fuchsia-400/50 text-fuchsia-700 dark:text-fuchsia-300">
          {copied ? <><CheckCircle2 className="w-3 h-3 mr-1" /> Copied!</> : <><Copy className="w-3 h-3 mr-1" /> Copy prompt</>}
        </Button>
      </motion.div>

      <ChipFilter
        title="✨ What makes a prompt STRONG"
        hint="Toggle each factor on to watch the prompt score rise. This is a senior Prompt Engineer's checklist."
        baseline={15}
        positive
        goal={80}
        goodLabel="Your prompt is professional-grade ✅"
        badLabel="Still missing something - toggle on more factors"
        metricLabel="Expertise score"
        accent="from-purple-500 to-fuchsia-600"
        border="border-purple-400/40"
        options={[
          { id: "1", label: "🎭 Clear role", weight: 14 },
          { id: "2", label: "🎯 Specific goal", weight: 14 },
          { id: "3", label: "📚 2-3 sample examples", weight: 12 },
          { id: "4", label: "🧠 Asks for CoT", weight: 12 },
          { id: "5", label: "📐 Output format (JSON/table)", weight: 12 },
          { id: "6", label: "🚫 Constraints (≤300 words, English)", weight: 10 },
          { id: "7", label: "🔁 Self-critique at the end", weight: 10 },
        ]}
      />

      <BestMatchPick
        title="🧪 Match the pattern to the need"
        hint="For each need, which prompt pattern fits best?"
        accent="from-purple-500 to-fuchsia-600"
        border="border-purple-400/40"
        options={[
          { id: "role", label: "Role" },
          { id: "fewshot", label: "Few-shot" },
          { id: "cot", label: "CoT" },
          { id: "react", label: "ReAct" },
          { id: "critic", label: "Self-Critique" },
        ]}
        items={[
          { prompt: "Need AI to solve a multi-step math problem accurately", correctId: "cot" },
          { prompt: "Need AI to classify sentiment exactly in your own style", correctId: "fewshot" },
          { prompt: "Need AI to answer like a general practitioner doctor", correctId: "role" },
          { prompt: "Need AI to search the web and calculate back and forth", correctId: "react" },
          { prompt: "Need AI to self-edit your English essay", correctId: "critic" },
        ]}
      />

      <BonusGames tfItems={PL_TF} matchPairs={PL_PAIRS} accent="from-purple-500 to-fuchsia-600" border="border-purple-400/40" />
    </div>
  );
};

export default PromptLabSandbox;
