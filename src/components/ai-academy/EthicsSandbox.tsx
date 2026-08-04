/**
 * EthicsSandbox - "Is AI fair?"
 * Students adjust a biased training dataset (gender ratio) for a fake hiring
 * model and watch the predicted hire-rate gap shrink. Teaches dataset bias
 * and why diverse training data matters.
 */
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Scale, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { BonusGames } from "./SandboxBonusGames";
import { ChipFilter, BestMatchPick } from "./SandboxMiniActivity";

const ETH_TF = [
  { q: "AI is conscious and can make its own moral decisions.", a: false, why: "AI only learns from data - it has no 'conscience'." },
  { q: "Biased data leads to biased AI.", a: true },
  { q: "Amazon once had to scrap a hiring AI for gender discrimination.", a: true, why: "In 2018, because its historical data skewed heavily male." },
  { q: "Balancing a dataset makes AI fairer.", a: true },
  { q: "AI Ethics only matters for big companies.", a: false, why: "Any AI product used by people needs it - even a small app." },
];
const ETH_PAIRS = [
  { a: "Bias", b: "Unfair skew in data or a model" },
  { a: "Fairness", b: "Equal treatment across groups of people" },
  { a: "Transparency", b: "Users understand how AI makes decisions" },
  { a: "Privacy", b: "Protecting personal data" },
];

const EthicsSandbox = () => {
  // % of training examples that are male engineers (rest female)
  const [maleRatio, setMaleRatio] = useState(85);

  // Model "learns" the bias: predicted hire rate is correlated to representation
  const malePred = useMemo(() => 0.35 + (maleRatio / 100) * 0.5, [maleRatio]);
  const femalePred = useMemo(() => 0.85 - (maleRatio / 100) * 0.5, [maleRatio]);
  const gap = Math.abs(malePred - femalePred);
  const fair = gap < 0.08;

  return (
    <div className="space-y-3 sm:space-y-4 [&>*+*]:pt-3 sm:[&>*+*]:pt-4 [&>*+*]:border-t [&>*+*]:border-border/40">
      <div className="rounded-2xl border-2 border-amber-400/40 bg-gradient-to-br from-amber-500/5 to-rose-500/5 p-4">
        <div className="text-[11px] font-bold uppercase text-amber-700 dark:text-amber-300 mb-2 flex items-center gap-1">
          <Scale className="w-3 h-3" /> Training data for a hiring AI
        </div>

        {/* Avatar bar */}
        <div className="grid grid-cols-20 gap-0.5 mb-2" style={{ gridTemplateColumns: "repeat(20, minmax(0, 1fr))" }}>
          {Array.from({ length: 20 }).map((_, i) => {
            const isMale = i < Math.round(maleRatio / 5);
            return (
              <div key={i} className="text-base sm:text-lg text-center">
                {isMale ? "👨‍💻" : "👩‍💻"}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-xs mb-1">
          <span>👨‍💻 Male: <b>{maleRatio}%</b></span>
          <span>👩‍💻 Female: <b>{100 - maleRatio}%</b></span>
        </div>
        <Slider value={[maleRatio]} min={10} max={95} step={5} onValueChange={(v) => setMaleRatio(v[0])} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border-2 border-blue-400/40 bg-blue-500/5 p-3 text-center">
          <div className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-1">AI hire rate: MEN</div>
          <motion.div key={malePred} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-2xl font-black text-blue-600">
            {(malePred * 100).toFixed(0)}%
          </motion.div>
        </div>
        <div className="rounded-2xl border-2 border-pink-400/40 bg-pink-500/5 p-3 text-center">
          <div className="text-xs font-bold text-pink-700 dark:text-pink-300 mb-1">AI hire rate: WOMEN</div>
          <motion.div key={femalePred} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-2xl font-black text-pink-600">
            {(femalePred * 100).toFixed(0)}%
          </motion.div>
        </div>
      </div>

      <motion.div
        key={fair ? "fair" : "unfair"}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl border-2 p-3 ${
          fair
            ? "border-emerald-400/50 bg-emerald-500/10"
            : "border-rose-400/50 bg-rose-500/10"
        }`}
      >
        <div className={`flex items-center gap-2 font-bold text-sm ${fair ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}`}>
          {fair ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          {fair ? "Fair ✅" : "Biased ⚠️"} (gap of {(gap * 100).toFixed(0)}%)
        </div>
        <p className="text-xs text-foreground/80 mt-1">
          {fair
            ? "Balanced data means the AI makes fairer decisions for both genders."
            : "The data is too skewed - the AI 'learns' that coding is one gender's job and rejects the other's resumes. This is exactly what happened to Amazon in 2018!"}
        </p>
      </motion.div>

      <p className="text-xs text-muted-foreground">
        💡 AI has <b>no conscience</b> - it only learns from data. If the data is biased, the AI will be biased too. That's why <b>AI Ethics</b> is one of the most important subjects at MIT and Stanford.
      </p>

      <ChipFilter
        title="✂️ Cut the bias from a job posting"
        hint="Remove biased phrases from the job description to raise the AI's fairness score."
        baseline={40}
        positive
        goal={75}
        goodLabel="The description is neutral enough now ✅"
        badLabel="Still some biased wording left - cut a few more chips!"
        metricLabel="Fairness Score"
        accent="from-amber-500 to-rose-500"
        border="border-amber-400/40"
        options={[
          { id: "1", label: "❌ 'men preferred'", weight: 18 },
          { id: "2", label: "❌ 'must be under 30'", weight: 14 },
          { id: "3", label: "❌ 'no new mothers'", weight: 16 },
          { id: "4", label: "❌ 'must be good-looking'", weight: 10 },
          { id: "5", label: "❌ 'only top-university grads'", weight: 8 },
        ]}
      />

      <BestMatchPick
        title="⚖️ AI ethics scenarios - pick the right principle"
        hint="Which AI ethics principle does each issue belong to?"
        accent="from-amber-500 to-rose-500"
        border="border-amber-400/40"
        options={[
          { id: "fair", label: "⚖️ Fairness" },
          { id: "trans", label: "🔍 Transparency" },
          { id: "priv", label: "🔒 Privacy" },
          { id: "acc", label: "🛡️ Accountability" },
        ]}
        items={[
          { prompt: "AI rejects a woman's resume because the training data was all men", correctId: "fair" },
          { prompt: "A user doesn't know that an AI is scoring their application", correctId: "trans" },
          { prompt: "An app records children's voices without asking their parents", correctId: "priv" },
          { prompt: "A self-driving car causes a crash - it's unclear who's responsible", correctId: "acc" },
          { prompt: "A hospital's AI hides the reason it denied an insurance claim", correctId: "trans" },
        ]}
      />

      <BonusGames tfItems={ETH_TF} matchPairs={ETH_PAIRS} accent="from-amber-500 to-rose-500" border="border-amber-400/40" />
    </div>
  );
};

export default EthicsSandbox;
