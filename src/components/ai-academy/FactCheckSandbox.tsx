/**
 * FactCheckSandbox - Spot AI hallucinations.
 * 5 sample ChatGPT answers; student marks each as TRUE or HALLUCINATION,
 * sandbox reveals red flags and explanation.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BonusGames } from "./SandboxBonusGames";
import { BestMatchPick } from "./SandboxMiniActivity";

type Claim = { text: string; isTrue: boolean; explain: string };
const CLAIMS: Claim[] = [
  {
    text: "The capital of Vietnam is Hanoi, with a population of around 8 million people.",
    isTrue: true,
    explain: "True - Hanoi has about 8.4 million residents (2024). The number is reasonable and easy to verify.",
  },
  {
    text: "President Ho Chi Minh won the Nobel Peace Prize in 1954.",
    isTrue: false,
    explain: "Hallucination! Ho Chi Minh never received a Nobel Prize. The AI invented a specific-sounding detail to seem credible.",
  },
  {
    text: "The formula for the area of a circle is π × r².",
    isTrue: true,
    explain: "True - this is the classic formula, easy to check in any grade-8 math textbook.",
  },
  {
    text: "Albert Einstein wrote a book called 'Relativity for Kids' in 1923 that sold 2 million copies.",
    isTrue: false,
    explain: "Hallucination! Einstein never wrote a book by that name. Warning sign: extremely specific numbers that can't be verified.",
  },
  {
    text: "US President Donald Trump signed the Paris climate agreement in 2017.",
    isTrue: false,
    explain: "Hallucination! Trump actually WITHDREW from the Paris agreement in 2017 - the opposite happened. AI mixed up the direction of the event, a very common error.",
  },
];

const TF = [
  { q: "AI sometimes 'makes up' information that sounds completely plausible.", a: true },
  { q: "The more specific a claim is (exact numbers, names), the more you should double-check it.", a: true },
  { q: "ChatGPT is always 100% accurate on history questions.", a: false, why: "ChatGPT can hallucinate - especially with historical details." },
  { q: "You should verify AI answers with a second source (Wikipedia, books, a teacher).", a: true },
];
const PAIRS = [
  { a: "Hallucination", b: "AI inventing information that sounds true" },
  { a: "Cross-check", b: "Verifying with a second, independent source" },
  { a: "Source citation", b: "Asking the AI to cite where it got the info" },
  { a: "Red flag", b: "A warning sign, like an oddly specific number" },
];

const FactCheckSandbox = () => {
  const [picks, setPicks] = useState<Record<number, boolean>>({});
  const [revealed, setRevealed] = useState(false);
  const correct = revealed ? CLAIMS.filter((c, i) => picks[i] === c.isTrue).length : 0;

  return (
    <div className="space-y-3 sm:space-y-4 [&>*+*]:pt-3 sm:[&>*+*]:pt-4 [&>*+*]:border-t [&>*+*]:border-border/40">
      <p className="text-sm text-muted-foreground">
        Each statement below was written by ChatGPT. Mark it <b>TRUE</b> or <b>HALLUCINATION</b>, then hit "Check answers".
      </p>

      <div className="space-y-2">
        {CLAIMS.map((c, i) => {
          const pick = picks[i];
          const right = revealed && pick === c.isTrue;
          const wrong = revealed && pick !== undefined && pick !== c.isTrue;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`p-3 rounded-xl border-2 ${
                right ? "border-emerald-400 bg-emerald-500/10" : wrong ? "border-rose-400 bg-rose-500/10" : "border-border bg-card"
              }`}
            >
              <p className="text-sm text-foreground italic">"{c.text}"</p>
              <div className="flex gap-2 mt-2">
                <Button
                  size="sm"
                  variant={pick === true ? "default" : "outline"}
                  disabled={revealed}
                  onClick={() => setPicks((p) => ({ ...p, [i]: true }))}
                  className="text-xs"
                >
                  <CheckCircle2 className="w-3 h-3 mr-1" /> True
                </Button>
                <Button
                  size="sm"
                  variant={pick === false ? "default" : "outline"}
                  disabled={revealed}
                  onClick={() => setPicks((p) => ({ ...p, [i]: false }))}
                  className="text-xs"
                >
                  <XCircle className="w-3 h-3 mr-1" /> Hallucination
                </Button>
              </div>
              {revealed && (
                <div className="mt-2 p-2 rounded-lg bg-amber-500/10 border border-amber-400/30 text-xs text-amber-800 dark:text-amber-200 flex gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{c.explain}</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => setRevealed(true)}
          disabled={revealed || Object.keys(picks).length < CLAIMS.length}
          className="flex-1 bg-gradient-to-r from-amber-500 to-rose-500 text-white"
        >
          🔍 Check answers
        </Button>
        <Button onClick={() => { setPicks({}); setRevealed(false); }} variant="outline">
          Reset
        </Button>
      </div>
      {revealed && (
        <p className="text-center font-bold text-lg">
          You got <span className="text-emerald-500">{correct}/{CLAIMS.length}</span> right - your fact-checking skills are
          {correct >= 4 ? " 🌟 excellent!" : correct >= 3 ? " 👍 pretty good." : " still improving - try again."}
        </p>
      )}

      <BestMatchPick
        title="🔗 Match each claim to the best source to verify it"
        hint="If you need to fact-check a claim, which source is most trustworthy?"
        accent="from-amber-500 to-rose-600"
        border="border-amber-400/40"
        options={[
          { id: "wiki", label: "📚 Wikipedia/textbook" },
          { id: "gov", label: "🏛️ Government website" },
          { id: "scholar", label: "🔬 Google Scholar" },
          { id: "news", label: "📰 Major news outlet (VnExpress, Tuoi Tre)" },
        ]}
        items={[
          { prompt: "Hanoi's population in 2024", correctId: "gov" },
          { prompt: "The formula for the area of a circle", correctId: "wiki" },
          { prompt: "New research findings about AlphaFold", correctId: "scholar" },
          { prompt: "Yesterday's football match results", correctId: "news" },
        ]}
      />

      <BonusGames tfItems={TF} matchPairs={PAIRS} accent="from-amber-500 to-rose-600" border="border-amber-400/40" />
    </div>
  );
};

export default FactCheckSandbox;
