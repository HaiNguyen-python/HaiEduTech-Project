// Interactive Writing Guide with academic outline, sentence starters, checklists, and copy-to-clipboard
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ChevronDown, ChevronUp, Lightbulb, Target, PenTool, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useLanguage } from "@/contexts/LanguageContext";
import { WritingPrompt } from "@/data/ieltsWritingPrompts";
import { getDetailedWritingGuide, type WritingGuideStep } from "@/data/writingGuideData";

interface WritingGuidePanelProps {
  prompt: WritingPrompt;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const STEP_ICONS = [
  <PenTool className="w-4 h-4" />,
  <Target className="w-4 h-4" />,
  <BookOpen className="w-4 h-4" />,
  <Lightbulb className="w-4 h-4" />,
];

const STEP_COLORS = [
  "from-blue-500 to-blue-600",
  "from-emerald-500 to-emerald-600",
  "from-violet-500 to-violet-600",
  "from-amber-500 to-amber-600",
];

const WritingGuidePanel = ({ prompt, open, onOpenChange }: WritingGuidePanelProps) => {
  const { t } = useLanguage();
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  const [copiedStarter, setCopiedStarter] = useState<string | null>(null);

  // Get the detailed guide based on task type and sub-type
  const guideSteps = getDetailedWritingGuide(prompt);

  const handleCheck = useCallback((stepId: string) => {
    setCheckedSteps(prev => ({ ...prev, [stepId]: !prev[stepId] }));
  }, []);

  const handleCopyStarter = useCallback(async (starter: string) => {
    await navigator.clipboard.writeText(starter);
    setCopiedStarter(starter);
    setTimeout(() => setCopiedStarter(null), 2000);
  }, []);

  const completedCount = Object.values(checkedSteps).filter(Boolean).length;
  const totalSteps = guideSteps.length;

  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <Card className="overflow-hidden">
        <CollapsibleTrigger className="w-full">
          <CardHeader className="pb-3 flex flex-row items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors rounded-t-lg">
            <div className="flex items-center gap-3">
              <CardTitle className="text-base">📋 {t("Hướng dẫn viết chi tiết", "Detailed Writing Guide")}</CardTitle>
              {completedCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {completedCount}/{totalSteps} {t("hoàn thành", "done")}
                </Badge>
              )}
            </div>
            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-3 pt-0">
            {/* Progress bar */}
            <div className="w-full bg-muted rounded-full h-1.5 mb-2">
              <div
                className="bg-gradient-to-r from-primary to-emerald-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0}%` }}
              />
            </div>

            {guideSteps.map((step, i) => {
              const stepId = `step-${i}`;
              const isChecked = checkedSteps[stepId] || false;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`rounded-lg border transition-all duration-300 ${
                    isChecked ? "bg-primary/5 border-primary/20" : "bg-muted/20 border-border"
                  }`}
                >
                  {/* Step Header */}
                  <div className="flex items-start gap-3 p-3">
                    <div className="flex items-center gap-2 shrink-0 mt-0.5">
                      <Checkbox
                        id={stepId}
                        checked={isChecked}
                        onCheckedChange={() => handleCheck(stepId)}
                        className="mt-0"
                      />
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${STEP_COLORS[i % 4]} flex items-center justify-center text-white`}>
                        {STEP_ICONS[i % 4]}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold text-base ${isChecked ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {step.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-0.5">{step.objective}</p>
                    </div>
                  </div>

                  {/* Logical Flow */}
                  <div className="px-3 pb-2">
                    <p className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
                      <Target className="w-3.5 h-3.5" /> {t("Trình tự viết:", "Logical Flow:")}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {step.logicalFlow.map((flowStep, fi) => (
                        <span key={fi} className="flex items-center gap-1.5">
                          <span className="text-sm bg-muted px-2.5 py-1 rounded-md text-foreground">{flowStep}</span>
                          {fi < step.logicalFlow.length - 1 && <span className="text-muted-foreground text-sm">→</span>}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sentence Starters */}
                  <div className="px-3 pb-3">
                    <p className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
                      <PenTool className="w-3 h-3" /> {t("Mẫu câu gợi ý:", "Sentence Starters:")}
                    </p>
                    <div className="space-y-1">
                      {step.sentenceStarters.map((starter, si) => (
                        <div
                          key={si}
                          className="group flex items-center gap-2 bg-background border rounded-md px-2.5 py-1.5 hover:border-primary/40 transition-colors"
                        >
                          <span className="text-xs text-foreground flex-1 italic">"{starter}"</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyStarter(starter);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                            title={t("Sao chép", "Copy")}
                          >
                            {copiedStarter === starter ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5 text-muted-foreground hover:text-primary" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default WritingGuidePanel;
