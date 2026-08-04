/**
 * StudySmartSandbox - "Prompt Coach for studying"
 * Students type a study question, sandbox suggests a better prompt
 * template and shows quality score (Specific / With context / Asks for steps).
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BonusGames } from "./SandboxBonusGames";
import { BestMatchPick, ChipFilter } from "./SandboxMiniActivity";

const TF = [
  { q: "The more specific a prompt, the more accurate the AI's answer.", a: true },
  { q: "Asking AI to 'explain step by step' helps you understand more deeply.", a: true },
  { q: "Copying the whole question and asking AI to do it for you is a good study method.", a: false, why: "That's 'letting AI do the work' - you learn nothing." },
  { q: "NotebookLM can read a lecture PDF and answer questions about its content.", a: true },
  { q: "You should double-check AI's answers against your textbook or teacher.", a: true },
];
const PAIRS = [
  { a: "Good prompt", b: "Has context + a specific request" },
  { a: "ChatGPT", b: "General-purpose chat assistant" },
  { a: "NotebookLM", b: "Reads PDF documents and answers Q&A" },
  { a: "Hallucination", b: "AI making up false information" },
];

const score = (p: string) => {
  const s = p.toLowerCase();
  let n = 0;
  const checks = [
    { ok: p.length >= 30, label: "Long enough (≥ 30 characters)" },
    { ok: /grade|age|i am|i'm|my|me/.test(s), label: "Has context about yourself" },
    { ok: /step|explain|example|why|how/.test(s), label: "Asks for an explanation / example" },
    { ok: /math|physics|chemistry|literature|english|history|geography|biology|subject/.test(s), label: "States the subject clearly" },
  ];
  n = checks.filter((c) => c.ok).length;
  return { n, checks };
};

const StudySmartSandbox = () => {
  const [text, setText] = useState("I don't understand how to solve quadratic equations, please help.");
  const r = score(text);
  const better = `I'm a 10th grader studying Math. Explain step by step how to solve a quadratic equation ax² + bx + c = 0, with one concrete example and how to check the roots. Don't do my homework for me - just guide my thinking.`;

  return (
    <div className="space-y-3 sm:space-y-4 [&>*+*]:pt-3 sm:[&>*+*]:pt-4 [&>*+*]:border-t [&>*+*]:border-border/40">
      <div className="rounded-2xl border-2 border-blue-400/40 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-3">
        <label className="text-sm font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1 mb-2">
          <Sparkles className="w-4 h-4" /> Type your study prompt
        </label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="text-sm"
          placeholder="Example: I'm a 9th grader studying Physics..."
        />
        <div className="mt-3 space-y-1.5">
          {r.checks.map((c, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              {c.ok ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-rose-400" />}
              <span className={c.ok ? "text-emerald-700 dark:text-emerald-300" : "text-muted-foreground"}>{c.label}</span>
            </div>
          ))}
        </div>
        <motion.div
          key={r.n}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="mt-3 text-center text-2xl font-black"
        >
          <span className={r.n >= 3 ? "text-emerald-500" : r.n >= 2 ? "text-amber-500" : "text-rose-500"}>
            Prompt score: {r.n}/4
          </span>
        </motion.div>
      </div>

      <div className="rounded-2xl border-2 border-emerald-400/40 bg-emerald-500/5 p-3">
        <h4 className="font-bold text-emerald-700 dark:text-emerald-300 text-sm mb-2">✨ Mr. Hai's 4/4-star prompt template</h4>
        <p className="text-[15px] text-foreground leading-relaxed italic">"{better}"</p>
        <Button
          onClick={() => setText(better)}
          size="sm"
          variant="outline"
          className="mt-3 border-emerald-400/50 text-emerald-700 dark:text-emerald-300"
        >
          Try this template →
        </Button>
      </div>

      <ChipFilter
        title="🧱 Build a 4-layer prompt"
        hint="A strong prompt has 4 layers: Role + Context + Request + Format. Pick the building blocks to add score."
        baseline={20}
        positive
        goal={75}
        goodLabel="Your prompt now has all 4 layers ✅"
        badLabel="Still missing something - add a few more blocks"
        metricLabel="Prompt score"
        accent="from-blue-500 to-cyan-600"
        border="border-blue-400/40"
        options={[
          { id: "1", label: "🎭 Role: 'You are a 10th-grade math tutor'", weight: 20 },
          { id: "2", label: "📚 Context: 'I'm preparing for a national exam'", weight: 18 },
          { id: "3", label: "🎯 Specific request: 'Solve this quadratic equation'", weight: 18 },
          { id: "4", label: "📝 Format: 'Show 5 numbered steps'", weight: 14 },
          { id: "5", label: "🚫 Constraint: 'Don't solve it for me, just guide me'", weight: 12 },
        ]}
      />

      <BestMatchPick
        title="🥇 Pick the best prompt for IELTS prep"
        hint="Each goal has 3 sample prompts (A · Lazy / B · Shallow / C · Solid). Choose the most 'exam-ready' one."
        accent="from-blue-500 to-cyan-600"
        border="border-blue-400/40"
        options={[
          { id: "a", label: "A · Lazy" },
          { id: "b", label: "B · Shallow" },
          { id: "c", label: "C · Solid" },
        ]}
        items={[
          {
            prompt: "Goal: Improve Writing Task 2 from band 5.5 to 6.5",
            correctId: "c",
            candidates: [
              { id: "a", label: "A · Lazy", text: "Write a band 6.5 essay for me on the topic Education." },
              { id: "b", label: "B · Shallow", text: "How do I raise my Writing Task 2 band to 6.5?" },
              { id: "c", label: "C · Solid", text: "You are an IELTS examiner. I'm at band 5.5 for Writing Task 2, weak in Task Response and Coherence. Please: (1) list 5 common mistakes keeping essays at band 5.5, (2) give 3 band-6.5 sentence structures to replace simple sentences, (3) provide one sample Education-topic prompt with a 4-paragraph outline matching band-6.5 criteria." },
            ],
          },
          {
            prompt: "Goal: Review 50 IELTS vocabulary words on Environment",
            correctId: "c",
            candidates: [
              { id: "a", label: "A · Lazy", text: "Give me 50 Environment vocabulary words." },
              { id: "b", label: "B · Shallow", text: "List 50 IELTS Environment vocabulary words with meanings." },
              { id: "c", label: "C · Solid", text: "You are a band-8.0 IELTS teacher. Create a table of 50 band 6.5-7.5 Environment vocabulary words with: word | part of speech | pronunciation | meaning | common collocation | one example sentence usable in Writing Task 2. Group them into 5 sub-topics (pollution, climate change, conservation, energy, waste). Finish with 10 fill-in-the-blank quiz questions for self-testing." },
            ],
          },
          {
            prompt: "Goal: Analyze grammar mistakes in your own essay",
            correctId: "c",
            candidates: [
              { id: "a", label: "A · Lazy", text: "Fix this essay for me: [paste]" },
              { id: "b", label: "B · Shallow", text: "Check the grammar in this essay and fix it: [paste]" },
              { id: "c", label: "C · Solid", text: "You are an IELTS examiner. Here is my Writing Task 2 essay (target band 6.5): [paste]. Please: (1) list each grammar mistake in a table (original sentence | error type | corrected sentence | brief explanation), (2) score all 4 criteria (TR/CC/LR/GRA) with reasons, (3) suggest 3 sentence upgrades from band 5.5 to 6.5, (4) DO NOT rewrite the whole essay for me - just guide me to fix it myself." },
            ],
          },
        ]}
      />

      <BonusGames tfItems={TF} matchPairs={PAIRS} accent="from-blue-500 to-cyan-600" border="border-blue-400/40" />
    </div>
  );
};

export default StudySmartSandbox;
