import { motion } from "framer-motion";
import { Brain, CheckCircle, ArrowRight, FileText, Mic } from "lucide-react";
import { Link } from "react-router-dom";

const AIGradingPreview = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 cyber-grid opacity-10" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-6">
            <Brain className="w-3 h-3" />
            AI-Powered
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            IELTS <span className="text-gradient">Grading Engine</span>
          </h2>
          <p className="text-muted-foreground mb-6">
            Get instant, examiner-level feedback on your Writing & Speaking. Our AI analyzes your work
            across all 4 IELTS criteria and provides a detailed band score breakdown.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "Band 1.0–9.0 detailed score breakdown",
              "Grammar, Vocabulary & Cohesion error highlighting",
              '"Upgrade Engine" — transforms your essay to Band 8.0+',
              "Speaking analysis with audio waveform feedback",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm text-secondary-foreground">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
          <Link
            to="/ai-grading"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all shadow-lg shadow-primary/25"
          >
            Try AI Grading <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Mock UI preview */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-primary/60" />
            </div>
            <span className="text-xs text-muted-foreground ml-2">AI Grading Panel</span>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                <FileText className="w-4 h-4" /> Writing
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-sm">
                <Mic className="w-4 h-4" /> Speaking
              </button>
            </div>

            {/* Score preview */}
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground">Overall Band Score</span>
                <span className="text-2xl font-display font-bold text-primary">6.5</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Task Achievement", score: 7.0 },
                  { label: "Coherence", score: 6.0 },
                  { label: "Lexical Resource", score: 6.5 },
                  { label: "Grammar", score: 6.5 },
                ].map((c) => (
                  <div key={c.label} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{c.label}</span>
                    <span className="font-mono font-semibold text-foreground">{c.score}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Error sample */}
            <div className="bg-secondary/50 rounded-lg p-3">
              <span className="text-xs font-medium text-foreground block mb-2">Error Highlights</span>
              <div className="text-xs space-y-1">
                <div className="flex items-start gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-destructive/20 text-destructive text-[10px] font-medium">Grammar</span>
                  <span className="text-muted-foreground">"peoples" → "people"</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-400 text-[10px] font-medium">Vocab</span>
                  <span className="text-muted-foreground">"good" → "beneficial"</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AIGradingPreview;
