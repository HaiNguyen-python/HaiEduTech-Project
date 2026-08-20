/**
 * @file SpeakingTemplateLab.tsx
 * @description Standalone "Template Practice" mode for IELTS Speaking.
 *   Students pick a part and a question type, study the framework steps with
 *   Band 7.0+ sentence starters, read a fully annotated Band 7.5 model answer,
 *   draft their own outline (persisted per question type) and copy it out.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LayoutTemplate, Clock, Copy, Lightbulb, ListChecks, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { getSpeakingTemplate } from "@/data/speakingAnswerTemplates";
import { getTypesByPart, getStepLabel } from "@/data/speakingTemplateTypes";

const SpeakingTemplateLab = () => {
  const { t } = useLanguage();
  const [part, setPart] = useState<1 | 2 | 3>(1);
  const types = useMemo(() => getTypesByPart(part), [part]);
  const [typeId, setTypeId] = useState<string>(types[0]?.id ?? "");

  useEffect(() => {
    setTypeId(getTypesByPart(part)[0]?.id ?? "");
  }, [part]);

  const type = types.find((x) => x.id === typeId) || types[0];
  const framework = useMemo(() => getSpeakingTemplate(part), [part]);
  const storageKey = `speaking-template-lab-${type?.id || "none"}`;

  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      setValues(raw ? JSON.parse(raw) : {});
    } catch {
      setValues({});
    }
  }, [storageKey]);

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

  if (!type) return null;

  const buildOutline = () => {
    const lines = [
      `${t("Dạng câu hỏi", "Question type")}: ${t(type.labelVi, type.labelEn)} (Part ${part})`,
      `${framework.name} (${framework.totalSecondsLabel})`,
    ];
    framework.steps.forEach((s) => {
      const own = (values[s.id] || "").trim();
      lines.push(`• ${t(s.labelVi, s.labelEn)}: ${own || t("(điền ý của bạn)", "(add your idea)")}`);
    });
    return lines.join("\n");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildOutline());
      toast.success(t("Đã copy dàn ý - dán vào Sổ tay của bạn", "Outline copied - paste it into your notebook"));
    } catch {
      toast.error(t("Không thể copy", "Could not copy"));
    }
  };

  const filled = framework.steps.filter((s) => (values[s.id] || "").trim()).length;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header + selectors */}
      <Card className="border-2 border-primary/30 bg-primary/5">
        <CardContent className="pt-5 pb-5 space-y-4">
          <div className="flex items-start gap-2">
            <LayoutTemplate className="w-5 h-5 mt-0.5 text-primary shrink-0" />
            <div>
              <h2 className="text-lg md:text-xl font-bold text-foreground">
                {t("🧩 Luyện khung trả lời (Template Practice)", "🧩 Template Practice")}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {t(
                  "Chọn Part và dạng câu hỏi, học khung cấu trúc chuẩn, xem bài mẫu Band 7.5 rồi tự viết dàn ý của mình.",
                  "Pick a part and a question type, learn the framework, study a Band 7.5 model, then draft your own outline.",
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {([1, 2, 3] as const).map((p) => (
              <Button
                key={p}
                size="sm"
                variant={part === p ? "default" : "secondary"}
                onClick={() => setPart(p)}
              >
                Part {p}
              </Button>
            ))}
            <Badge variant="outline" className="text-xs">
              {framework.name} • {framework.totalSecondsLabel}
            </Badge>
          </div>

          <div className="grid gap-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {t("Dạng câu hỏi", "Question type")}
            </label>
            <Select value={type.id} onValueChange={setTypeId}>
              <SelectTrigger className="w-full md:max-w-xl text-sm md:text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" side="bottom">
                {types.map((x) => (
                  <SelectItem key={x.id} value={x.id} className="text-sm">
                    {t(x.labelVi, x.labelEn)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {type.cueWords.map((c) => (
                <Badge key={c} variant="secondary" className="text-[11px]">
                  “{c}...”
                </Badge>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-amber-300/60 dark:border-amber-700/60 bg-amber-50/60 dark:bg-amber-950/20 p-3 flex gap-2">
            <Lightbulb className="w-4 h-4 mt-0.5 text-amber-600 shrink-0" />
            <p className="text-sm text-foreground/85">
              <span className="font-bold">{t("Mẹo của thầy Hải: ", "Teacher Hai's tip: ")}</span>
              {t(type.tipVi, type.tipEn)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Framework steps + student drafting */}
      <Card>
        <CardContent className="pt-5 pb-5 space-y-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h3 className="text-base md:text-lg font-bold text-foreground">
              {t("Khung cấu trúc", "The framework")} - {framework.name}
            </h3>
            <Badge variant="outline" className="text-xs">
              {filled}/{framework.steps.length} {t("bước đã viết", "steps drafted")}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{t(framework.taglineVi, framework.taglineEn)}</p>

          {framework.steps.map((step, idx) => (
            <div key={step.id} className="rounded-lg border bg-background p-3 space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className="text-sm md:text-base font-bold text-foreground">
                  {idx + 1}. {t(step.labelVi, step.labelEn)}
                </p>
                <Badge variant="secondary" className="text-[11px] gap-1">
                  <Clock className="w-3 h-3" />~{step.seconds}s
                </Badge>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">{t(step.goalVi, step.goalEn)}</p>
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
                className="w-full min-h-[60px] rounded-md border bg-background px-2.5 py-2 text-sm md:text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y"
              />
            </div>
          ))}

          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="gap-1.5" onClick={handleCopy}>
              <Copy className="w-4 h-4" />
              {t("Copy dàn ý", "Copy outline")}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setValues({});
                try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
              }}
            >
              {t("Xóa hết", "Clear all")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Annotated model answer */}
      <Card className="border-2 border-emerald-300/60 dark:border-emerald-700/60 bg-emerald-50/40 dark:bg-emerald-950/15">
        <CardContent className="pt-5 pb-5 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h3 className="text-base md:text-lg font-bold text-foreground">
              {t("Ví dụ cụ thể - bài mẫu có chú thích", "Worked example - annotated model answer")}
            </h3>
            <Badge variant="default" className="text-[11px]">{type.example.band}</Badge>
          </div>
          <div className="rounded-lg border bg-background p-3">
            <p className="text-xs font-semibold text-muted-foreground mb-1">
              {t("Câu hỏi mẫu", "Sample question")}
            </p>
            <p className="text-sm md:text-base font-medium text-foreground whitespace-pre-wrap">
              {type.example.question}
            </p>
          </div>
          <div className="space-y-2">
            {type.example.lines.map((line, i) => {
              const step = getStepLabel(framework.steps, line.stepId);
              return (
                <div key={i} className="rounded-lg border bg-background p-3">
                  <Badge variant="secondary" className="text-[11px] mb-1.5">
                    {step ? t(step.labelVi, step.labelEn) : line.stepId}
                  </Badge>
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed whitespace-pre-wrap">
                    {line.text}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Extra practice questions */}
      <Card>
        <CardContent className="pt-5 pb-5 space-y-2">
          <div className="flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-primary" />
            <h3 className="text-base md:text-lg font-bold text-foreground">
              {t("Câu hỏi luyện thêm cùng dạng", "More practice questions of this type")}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {t(
              "Áp dụng đúng khung trên cho từng câu, nói to và bấm giờ theo thời lượng gợi ý.",
              "Apply the same framework to each one, speak aloud and time yourself against the suggested seconds.",
            )}
          </p>
          <ul className="space-y-1.5 mt-1">
            {type.practiceQuestions.map((q, i) => (
              <li key={i} className="text-sm md:text-base text-foreground/90 flex gap-2">
                <span className="font-bold text-primary shrink-0">{i + 1}.</span>
                {q}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SpeakingTemplateLab;
