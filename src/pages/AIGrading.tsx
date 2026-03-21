import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Brain, FileText, Mic, Send, Loader2, AlertCircle, Sparkles } from "lucide-react";

const AIGrading = () => {
  const [mode, setMode] = useState<"writing" | "speaking">("writing");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    overall: number;
    breakdown: { task: number; coherence: number; lexical: number; grammar: number };
    errors: { error: string; correction: string; category: string }[];
    upgraded: string;
    advice: string;
  }>(null);

  const handleGrade = async () => {
    if (!text.trim()) return;
    setLoading(true);
    // Mock AI response — replace with real API call
    await new Promise((r) => setTimeout(r, 2000));
    setResult({
      overall: 6.5,
      breakdown: { task: 7.0, coherence: 6.0, lexical: 6.5, grammar: 6.5 },
      errors: [
        { error: "peoples", correction: "people", category: "Grammar" },
        { error: "very good", correction: "highly beneficial", category: "Vocab" },
        { error: "Because, so", correction: "Therefore / Consequently", category: "Cohesion" },
      ],
      upgraded: "The rapid advancement of technology has profoundly transformed educational methodologies. While traditional classroom-based instruction remains valuable, the integration of digital tools has proven highly beneficial for enhancing student engagement and learning outcomes...",
      advice: "Focus on improving cohesive devices and reducing informal vocabulary. Practice using complex sentence structures with subordinate clauses. Aim for more precise academic vocabulary.",
    });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-4">
              <Brain className="w-3 h-3" /> AI-Powered
            </div>
            <h1 className="text-4xl font-display font-bold mb-4 text-foreground">
              IELTS <span className="text-gradient">Grading Engine</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              Submit your writing or speaking sample for instant AI-powered examiner-level feedback.
            </p>

            {/* Mode tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setMode("writing")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mode === "writing" ? "bg-primary/10 text-primary border border-primary/20" : "bg-secondary text-secondary-foreground"
                }`}
              >
                <FileText className="w-4 h-4" /> Writing
              </button>
              <button
                onClick={() => setMode("speaking")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mode === "speaking" ? "bg-primary/10 text-primary border border-primary/20" : "bg-secondary text-secondary-foreground"
                }`}
              >
                <Mic className="w-4 h-4" /> Speaking
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Input */}
              <div className="glass-card rounded-xl p-6">
                {mode === "writing" ? (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-foreground">Your Essay</h3>
                      <span className="text-xs text-muted-foreground font-mono">{text.split(/\s+/).filter(Boolean).length} words</span>
                    </div>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Paste your IELTS Writing Task 2 essay here..."
                      className="w-full h-64 bg-secondary/50 rounded-lg p-4 text-sm text-foreground placeholder:text-muted-foreground resize-none border border-border/50 focus:border-primary/50 focus:outline-none transition-colors"
                    />
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-72 text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 animate-pulse-glow">
                      <Mic className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Audio recording coming soon</p>
                    <p className="text-xs text-muted-foreground">Visual waveform & real-time transcription</p>
                  </div>
                )}

                <button
                  onClick={handleGrade}
                  disabled={loading || !text.trim()}
                  className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold disabled:opacity-50 hover:brightness-110 transition-all"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {loading ? "Analyzing..." : "Grade My Essay"}
                </button>
              </div>

              {/* Results */}
              <div className="glass-card rounded-xl p-6">
                {!result && !loading && (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <Brain className="w-12 h-12 text-muted-foreground/30 mb-4" />
                    <p className="text-sm text-muted-foreground">Submit your essay to see AI feedback</p>
                  </div>
                )}

                {loading && (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
                    <p className="text-sm text-muted-foreground">AI Examiner is analyzing...</p>
                  </div>
                )}

                {result && !loading && (
                  <div className="space-y-4 overflow-y-auto max-h-[500px]">
                    {/* Score */}
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-foreground">Overall Band Score</span>
                        <span className="text-3xl font-display font-bold text-primary">{result.overall}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { l: "Task Achievement", v: result.breakdown.task },
                          { l: "Coherence & Cohesion", v: result.breakdown.coherence },
                          { l: "Lexical Resource", v: result.breakdown.lexical },
                          { l: "Grammatical Range", v: result.breakdown.grammar },
                        ].map((c) => (
                          <div key={c.l} className="flex justify-between text-xs">
                            <span className="text-muted-foreground">{c.l}</span>
                            <span className="font-mono font-semibold text-foreground">{c.v}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Errors */}
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <h4 className="text-xs font-medium text-foreground mb-2 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-destructive" /> Error Highlights
                      </h4>
                      <div className="space-y-2">
                        {result.errors.map((e, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs">
                            <span className={`px-1.5 py-0.5 rounded font-medium text-[10px] shrink-0 ${
                              e.category === "Grammar" ? "bg-destructive/20 text-destructive" :
                              e.category === "Vocab" ? "bg-yellow-500/20 text-yellow-400" :
                              "bg-blue-500/20 text-blue-400"
                            }`}>{e.category}</span>
                            <span className="text-muted-foreground">"{e.error}" → "{e.correction}"</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Upgrade Engine */}
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <h4 className="text-xs font-medium text-foreground mb-2 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-primary" /> Band 8.0+ Version
                      </h4>
                      <p className="text-xs text-secondary-foreground leading-relaxed">{result.upgraded}</p>
                    </div>

                    {/* Advice */}
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <h4 className="text-xs font-medium text-primary mb-1">Next Steps</h4>
                      <p className="text-xs text-secondary-foreground">{result.advice}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AIGrading;
