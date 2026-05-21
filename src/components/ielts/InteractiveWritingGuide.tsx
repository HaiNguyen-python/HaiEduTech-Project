// Interactive Writing Guide — turns a static Band 8.0+ sample essay into a step-by-step lesson.
// Students draft each sentence first, then reveal the master copy + analysis, and watch their essay build up.
import { useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Eye, RotateCcw, Sparkles, CheckCircle2, PenLine, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useLanguage } from "@/contexts/LanguageContext";
import type { GlossaryEntry } from "@/data/ieltsSampleEssays";

interface Props {
  essayBody: string;
  glossary: GlossaryEntry[];
  taskType: 1 | 2;
}

interface SentenceStep {
  stepId: number;
  paragraphIdx: number;
  sentenceInParagraphIdx: number;
  totalInParagraph: number;
  totalParagraphs: number;
  sectionLabel: string;
  promptHint: string;
  type: string;
  rawText: string;        // with **bold** markers
  cleanText: string;      // without markers
  keywords: string[];     // extracted from **bold**
  analysis: string;
}

// Split paragraph text into sentence chunks while keeping punctuation
const splitSentences = (text: string): string[] => {
  const matches = text.match(/[^.!?]+[.!?]+(?:["')\]]+)?(?=\s|$)/g);
  return matches ? matches.map(s => s.trim()).filter(Boolean) : [text.trim()];
};

const stripBold = (s: string) => s.replace(/\*\*(.*?)\*\*/g, "$1");
const extractKeywords = (s: string): string[] => {
  const out: string[] = [];
  const re = /\*\*(.*?)\*\*/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s)) !== null) out.push(m[1]);
  return out;
};

// Heuristic grammar analysis based on detected features
const analyzeSentence = (s: string): string => {
  const clean = stripBold(s);
  const tags: string[] = [];
  if (/\bnot only\b[^.]*\bbut\b/i.test(clean)) tags.push("Negative inversion (Not only … but …)");
  if (/^It is\b.+\bthat\b/i.test(clean) || /^What\b.+\bis\b/i.test(clean)) tags.push("Cleft sentence for emphasis");
  if (/\b(although|whereas|while|despite|in contrast|however|nevertheless)\b/i.test(clean)) tags.push("Contrast / concession connector");
  if (/\b(furthermore|moreover|in addition|consequently|therefore|thus|hence)\b/i.test(clean)) tags.push("Discourse marker");
  if (/\b(which|who|whose|whom)\b/i.test(clean)) tags.push("Relative clause");
  if (/\b(having|being|seen|driven|fuelled|powered|prompted|coupled)\b\s+\w+/i.test(clean)) tags.push("Participle phrase");
  if (/\b(could|might|may|would|should)\b\s+(have\s+)?\b\w+/i.test(clean)) tags.push("Modal of speculation / hedging");
  if (clean.split(",").length >= 3) tags.push("Multi-clause complex sentence");
  if (!tags.length) tags.push("Clear, well-formed academic sentence");
  return tags.join(" · ");
};

const buildSteps = (essayBody: string, taskType: 1 | 2): SentenceStep[] => {
  const paragraphs = essayBody.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
  const totalParagraphs = paragraphs.length;
  const steps: SentenceStep[] = [];
  let stepId = 0;

  paragraphs.forEach((para, pIdx) => {
    const sentences = splitSentences(para);
    const total = sentences.length;

    let sectionLabel = "";
    if (taskType === 1) {
      if (pIdx === 0) sectionLabel = "Introduction (Paraphrase)";
      else if (pIdx === 1) sectionLabel = "Overview (Main Trends)";
      else if (pIdx === totalParagraphs - 1) sectionLabel = `Detail Paragraph ${pIdx - 1}`;
      else sectionLabel = `Detail Paragraph ${pIdx - 1}`;
    } else {
      if (pIdx === 0) sectionLabel = "Introduction";
      else if (pIdx === totalParagraphs - 1) sectionLabel = "Conclusion";
      else sectionLabel = `Body Paragraph ${pIdx}`;
    }

    sentences.forEach((rawText, sIdx) => {
      let type = "Supporting detail";
      let promptHint = "Develop the idea with explanation, evidence, or an example.";

      if (taskType === 1) {
        if (pIdx === 0) {
          type = "Paraphrased introduction";
          promptHint = "Paraphrase the chart / data source and the time period.";
        } else if (pIdx === 1) {
          type = sIdx === 0 ? "Overview signal" : "Second main feature";
          promptHint = sIdx === 0
            ? "Signal the overview and state the most salient trend."
            : "Add a second major trend or comparison.";
        } else {
          if (sIdx === 0) {
            type = "Topic sentence (detail)";
            promptHint = "Open the detail paragraph by naming the category / trend you will describe.";
          } else if (sIdx === total - 1) {
            type = "Closing comparison";
            promptHint = "Close with a comparison or a final quantitative point.";
          } else {
            type = "Specific data point";
            promptHint = "Quote a precise figure with an accurate trend verb (rose, plateaued, plunged).";
          }
        }
      } else {
        if (pIdx === 0) {
          if (sIdx === 0) { type = "Hook / context"; promptHint = "Introduce the topic in a broad academic tone."; }
          else if (sIdx === total - 1) { type = "Thesis statement"; promptHint = "State your position and outline what the essay will argue."; }
          else { type = "Paraphrased prompt"; promptHint = "Rephrase the question in your own words."; }
        } else if (pIdx === totalParagraphs - 1) {
          if (sIdx === 0) { type = "Restated thesis"; promptHint = "Briefly restate your overall position."; }
          else { type = "Final recommendation"; promptHint = "Close with a forward-looking insight or recommendation."; }
        } else {
          if (sIdx === 0) { type = "Topic sentence"; promptHint = "State the single main idea of this body paragraph."; }
          else if (sIdx === 1) { type = "Explanation"; promptHint = "Explain the mechanism or reasoning behind the topic sentence."; }
          else if (sIdx === total - 1) { type = "Mini-conclusion"; promptHint = "Tie the example back to the paragraph's main claim."; }
          else { type = "Evidence / example"; promptHint = "Add a concrete example, data point, or scenario."; }
        }
      }

      steps.push({
        stepId: stepId++,
        paragraphIdx: pIdx,
        sentenceInParagraphIdx: sIdx,
        totalInParagraph: total,
        totalParagraphs,
        sectionLabel,
        promptHint,
        type,
        rawText,
        cleanText: stripBold(rawText),
        keywords: extractKeywords(rawText),
        analysis: analyzeSentence(rawText),
      });
    });
  });

  return steps;
};

const InteractiveWritingGuide = ({ essayBody, glossary, taskType }: Props) => {
  const { t } = useLanguage();
  const steps = useMemo(() => buildSteps(essayBody, taskType), [essayBody, taskType]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [drafts, setDrafts] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const glossaryMap = useMemo(() => {
    const m = new Map<string, GlossaryEntry>();
    glossary.forEach(g => m.set(g.term.toLowerCase(), g));
    return m;
  }, [glossary]);

  const current = steps[activeIdx];
  const progress = Math.round(((activeIdx + (revealed[activeIdx] ? 1 : 0)) / steps.length) * 100);

  const handleReveal = useCallback(() => {
    setRevealed(prev => ({ ...prev, [activeIdx]: true }));
  }, [activeIdx]);

  const handleNext = useCallback(() => {
    if (activeIdx < steps.length - 1) setActiveIdx(activeIdx + 1);
  }, [activeIdx, steps.length]);

  const handleReset = useCallback(() => {
    setActiveIdx(0);
    setDrafts({});
    setRevealed({});
  }, []);

  // Cumulative preview = all revealed sentences, grouped by paragraph
  const cumulativeParagraphs = useMemo(() => {
    const byPara: Record<number, string[]> = {};
    steps.forEach((s, i) => {
      if (revealed[i]) {
        if (!byPara[s.paragraphIdx]) byPara[s.paragraphIdx] = [];
        byPara[s.paragraphIdx].push(s.cleanText);
      }
    });
    return Object.entries(byPara)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([, sents]) => sents.join(" "));
  }, [steps, revealed]);

  if (!current) return null;
  const isRevealed = !!revealed[activeIdx];
  const isLast = activeIdx === steps.length - 1;
  const userDraft = drafts[activeIdx] || "";

  return (
    <div className="glass-card rounded-xl p-5 md:p-7 space-y-5">
      {/* Header + progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <PenLine className="w-5 h-5 text-primary" />
            {t("Bài giảng viết tương tác (Band 8.0+)", "Interactive Writing Lesson (Band 8.0+)")}
          </h2>
          <Badge variant="secondary" className="text-xs">
            {t("Bước", "Step")} {activeIdx + 1} / {steps.length}
          </Badge>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5">
          <div
            className="bg-gradient-to-r from-primary to-emerald-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Active step card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="rounded-xl border border-border bg-card/50 p-4 md:p-5 space-y-4"
        >
          {/* Section + type */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-primary/15 text-primary border-0">{current.sectionLabel}</Badge>
            <Badge variant="outline">{current.type}</Badge>
            <span className="text-xs text-muted-foreground">
              {t("Câu", "Sentence")} {current.sentenceInParagraphIdx + 1} / {current.totalInParagraph}
            </span>
          </div>

          {/* Instruction */}
          <div className="flex items-start gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-base font-medium text-foreground">{current.promptHint}</p>
          </div>

          {/* Keyword chips */}
          {current.keywords.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">
                {t("Từ khoá nên dùng (di chuột để xem nghĩa):", "Suggested keywords (hover for meaning):")}
              </p>
              <div className="flex flex-wrap gap-2">
                {current.keywords.map((kw, i) => {
                  const g = glossaryMap.get(kw.toLowerCase());
                  const chip = (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-colors cursor-help">
                      {kw}
                    </span>
                  );
                  return g ? (
                    <HoverCard key={i} openDelay={120}>
                      <HoverCardTrigger asChild><button type="button">{chip}</button></HoverCardTrigger>
                      <HoverCardContent className="w-72">
                        <p className="font-semibold text-primary mb-1">{g.term}</p>
                        <p className="text-sm text-foreground mb-2">🇻🇳 {g.vietnamese}</p>
                        <p className="text-xs text-muted-foreground italic">"{g.context}"</p>
                      </HoverCardContent>
                    </HoverCard>
                  ) : (
                    <span key={i}>{chip}</span>
                  );
                })}
              </div>
            </div>
          )}

          {/* User input */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              {t("Câu của bạn:", "Your sentence:")}
            </label>
            <Textarea
              value={userDraft}
              onChange={(e) => setDrafts(prev => ({ ...prev, [activeIdx]: e.target.value }))}
              placeholder={t("Viết câu của bạn ở đây...", "Draft your sentence here...")}
              className="min-h-[80px] text-base leading-relaxed"
            />
          </div>

          {/* Compare button */}
          {!isRevealed && (
            <Button
              onClick={handleReveal}
              className="bg-gradient-to-r from-primary to-emerald-500 text-white font-semibold"
            >
              <Eye className="w-4 h-4 mr-1" />
              {t("So sánh với câu mẫu Band 8.0+", "Compare with Master Copy")}
            </Button>
          )}

          {/* Master copy + analysis */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden space-y-3"
              >
                <div className="rounded-lg border-l-4 border-emerald-500 bg-emerald-500/5 p-4">
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> {t("Câu mẫu Band 8.0+", "Master copy — Band 8.0+")}
                  </p>
                  <p className="text-foreground leading-relaxed font-['Georgia',_serif]">
                    {current.rawText.split(/\*\*(.*?)\*\*/g).map((part, i) =>
                      i % 2 === 1
                        ? <strong key={i} className="text-primary">{part}</strong>
                        : <span key={i}>{part}</span>
                    )}
                  </p>
                </div>
                <div className="rounded-lg bg-muted/40 p-3">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">
                    🔬 {t("Phân tích ngữ pháp", "Grammar analysis")}
                  </p>
                  <p className="text-sm text-foreground">{current.analysis}</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {!isLast ? (
                    <Button onClick={handleNext} variant="default" className="font-semibold">
                      {t("Câu tiếp theo", "Next sentence")} <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-5 h-5" />
                      {t("Bạn đã hoàn thành toàn bộ bài viết!", "You've completed the full essay!")}
                    </div>
                  )}
                  <Button variant="ghost" size="sm" onClick={handleReset}>
                    <RotateCcw className="w-3.5 h-3.5 mr-1" /> {t("Bắt đầu lại", "Restart")}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Cumulative essay preview */}
      {cumulativeParagraphs.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4 md:p-5"
        >
          <p className="text-xs font-semibold text-primary mb-2 flex items-center gap-1">
            📜 {t("Bài viết đang hình thành", "Cumulative essay preview")}
          </p>
          <div className="text-foreground leading-[1.9] text-[15px] font-['Georgia',_serif] space-y-3">
            {cumulativeParagraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default InteractiveWritingGuide;
