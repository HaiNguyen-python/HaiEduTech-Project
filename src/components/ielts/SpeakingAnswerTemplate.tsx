/**
 * @file SpeakingAnswerTemplate.tsx
 * @description Collapsible answer-framework panel for IELTS Speaking practice.
 *   Shows a part-specific structure (PREP / cue-card blocks / AREA + Balance)
 *   with band 7.0+ sentence starters, per-step input slots persisted per question,
 *   and buttons to copy the outline or push it into the Quick Notes area.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutTemplate, ChevronDown, ChevronUp, Copy, StickyNote, Clock, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import {
  getSpeakingTemplate,
  PART2_PLANNING_HINTS,
} from "@/data/speakingAnswerTemplates";

interface Props {
  part: 1 | 2 | 3;
  questionId?: string;
  question?: string;
  onInsertToNotes?: (outline: string) => void;
}

const SpeakingAnswerTemplate: React.FC<Props> = ({ part, questionId, question, onInsertToNotes }) => {
  const { t } = useLanguage();
  const template = useMemo(() => getSpeakingTemplate(part), [part]);
  const storageKey = `speaking-template-${part}-${questionId || "generic"}`;

  const [open, setOpen] = useState(true);
  const [values, setValues] = useState<Record<string, string>>({});

  // Load saved answers for this question
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      setValues(raw ? JSON.parse(raw) : {});
    } catch {
      setValues({});
    }
  }, [storageKey]);

  // Persist (debounced) so students never lose their outline
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        if (Object.values(values).some((v) => v?.trim())) {
          localStorage.setItem(storageKey, JSON.stringify(values));
        }
      } catch { /* storage unavailable */ }
    }, 400);
    return () => clearTimeout(id);
  }, [values, storageKey]);

  const buildOutline = () => {
    const lines: string[] = [];
    if (question) lines.push(`Q: ${question}`);
    lines.push(`${template.name} (${template.totalSecondsLabel})`);
    template.steps.forEach((s) => {
      const label = t(s.labelVi, s.labelEn);
      const own = (values[s.id] || "").trim();
      lines.push(`• ${label}: ${own || t("(điền ý của bạn)", "(add your idea)")}`);
    });
    return lines.join("\n");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildOutline());
      toast.success(t("Đã copy dàn ý", "Outline copied"));
    } catch {
      toast.error(t("Không thể copy", "Could not copy"));
    }
  };

  const filled = template.steps.filter((s) => (values[s.id] || "").trim()).length;

  return (
    <Card className="border-2 border-primary/30 bg-primary/5">
      <CardContent className="pt-4 pb-4 space-y-3">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div className="flex items-start gap-2">
            <LayoutTemplate className="w-4 h-4 mt-0.5 text-primary" />
            <div>
              <h4 className="text-sm font-bold text-foreground">
                {t("🧩 Khung trả lời mẫu", "🧩 Answer Template")} - Part {part}
                <Badge variant="secondary" className="ml-2 text-[10px] align-middle">
                  {template.name}
                </Badge>
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t(template.taglineVi, template.taglineEn)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Badge variant="outline" className="text-[10px]">
              {filled}/{template.steps.length}
            </Badge>
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={() => setOpen((o) => !o)}>
              {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              {open ? t("Thu gọn", "Collapse") : t("Mở khung", "Open")}
            </Button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 overflow-hidden"
            >
              {part === 2 && (
                <div className="rounded-lg border border-amber-300/60 dark:border-amber-700/60 bg-amber-50/60 dark:bg-amber-950/20 p-3">
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1.5">
                    {t("⏱️ 1 phút chuẩn bị - ghi 4 gạch đầu dòng", "⏱️ 1-minute prep - write 4 bullets")}
                  </p>
                  <ul className="space-y-1">
                    {PART2_PLANNING_HINTS.map((h, i) => (
                      <li key={i} className="text-xs text-foreground/80 flex gap-1.5">
                        <Check className="w-3 h-3 mt-0.5 text-amber-600 shrink-0" />
                        {t(h.vi, h.en)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {template.steps.map((step, idx) => (
                <div key={step.id} className="rounded-lg border bg-background p-3 space-y-2">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-sm font-bold text-foreground">
                      {idx + 1}. {t(step.labelVi, step.labelEn)}
                    </p>
                    <Badge variant="secondary" className="text-[10px] gap-1">
                      <Clock className="w-3 h-3" />
                      ~{step.seconds}s
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{t(step.goalVi, step.goalEn)}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {step.starters.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() =>
                          setValues((v) => ({
                            ...v,
                            [step.id]: v[step.id]?.trim() ? `${v[step.id]} ${s}` : s,
                          }))
                        }
                        className="text-[11px] md:text-xs rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-foreground/90 hover:bg-primary/15 transition-colors text-left"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={values[step.id] || ""}
                    onChange={(e) => setValues((v) => ({ ...v, [step.id]: e.target.value }))}
                    placeholder={t(step.placeholderVi, step.placeholderEn)}
                    className="w-full min-h-[56px] rounded-md border bg-background px-2.5 py-2 text-sm md:text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y"
                  />
                </div>
              ))}

              <div className="flex flex-wrap items-center gap-2">
                {onInsertToNotes && (
                  <Button
                    size="sm"
                    className="h-8 text-xs gap-1.5"
                    onClick={() => {
                      onInsertToNotes(buildOutline());
                      toast.success(t("Đã chèn vào Ghi chú nhanh", "Inserted into Quick Notes"));
                    }}
                  >
                    <StickyNote className="w-3.5 h-3.5" />
                    {t("Chèn vào Ghi chú nhanh", "Insert into Quick Notes")}
                  </Button>
                )}
                <Button size="sm" variant="outline" className="h-8 text-xs gap-1.5" onClick={handleCopy}>
                  <Copy className="w-3.5 h-3.5" />
                  {t("Copy dàn ý", "Copy outline")}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 text-xs"
                  onClick={() => {
                    setValues({});
                    try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
                  }}
                >
                  {t("Xóa hết", "Clear all")}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default SpeakingAnswerTemplate;
