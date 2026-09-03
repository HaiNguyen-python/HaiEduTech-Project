/**
 * @file PronunciationPlanPanel.tsx
 * @description Personalised pronunciation roadmap: reads the local error log
 * (top missed words, miss frequency, error rate, 14-day trend) and shows the
 * next recommended practice steps with one-tap jumps into each mode.
 */
import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Compass,
  Flame,
  MessageCircle,
  Mic,
  Repeat,
  Target,
  TrendingDown,
  TrendingUp,
  Volume2,
  Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { playSpeakingTts, type SpeakingLang } from "@/lib/speakingModeShared";
import { dailyTrend, loadPronStats } from "@/lib/speaking/pronunciationStats";
import { buildPronPlan, type PlanMode, type PlanStep } from "@/lib/speaking/pronunciationPlan";

interface Props {
  language: SpeakingLang;
  /** Jump into a practice mode. */
  onGoMode?: (mode: PlanMode) => void;
  /** "hero" shows only the next step + today's target; the rest collapses. */
  variant?: "full" | "hero";
}

const MODE_ICON: Record<PlanMode, typeof Mic> = {
  drill: Waves,
  review: Brain,
  shadow: Repeat,
  sentence: Mic,
  freetalk: MessageCircle,
};

const PronunciationPlanPanel = ({ language, onGoMode, variant = "full" }: Props) => {
  const { t } = useLanguage();
  const [done, setDone] = useState<Record<string, boolean>>({});
  const hero = variant === "hero";
  const [stepsOpen, setStepsOpen] = useState(false);
  const showRest = !hero || stepsOpen;

  const store = useMemo(() => loadPronStats(language), [language]);
  const plan = useMemo(() => buildPronPlan(store), [store]);
  const trend = useMemo(() => dailyTrend(store, 14), [store]);

  const speak = useCallback((word: string) => { void playSpeakingTts(language, word, 0.85); }, [language]);

  const totalMinutes = plan.steps.reduce((s, x) => s + x.minutes, 0);
  const doneCount = plan.steps.filter((s) => done[s.id]).length;
  const nextStep: PlanStep | undefined = plan.steps.find((s) => !done[s.id]);

  const trendLabel =
    plan.trend === "improving"
      ? t("Đang tiến bộ", "Improving")
      : plan.trend === "worsening"
        ? t("Đang tăng lỗi", "More misses")
        : plan.trend === "new"
          ? t("Chưa đủ dữ liệu", "Not enough data")
          : t("Ổn định", "Steady");

  const intensityLabel =
    plan.intensity === "intensive"
      ? t("Cường độ cao", "Intensive")
      : plan.intensity === "standard"
        ? t("Cường độ vừa", "Standard")
        : t("Cường độ nhẹ", "Light");

  if (plan.focus.length === 0 && plan.trend === "new") {
    return (
      <Card>
        <CardContent className="py-12 text-center space-y-3">
          <Compass className="w-10 h-10 mx-auto text-muted-foreground" />
          <p className="font-semibold">{t("Chưa có lộ trình", "No roadmap yet")}</p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {t(
              "Hãy luyện vài câu ở mục Câu mẫu, Nói theo, Luyện âm hoặc Nói tự do. Hệ thống sẽ dựa trên các từ bạn phát âm sai để tạo lộ trình riêng cho bạn.",
              "Practise a few sentences in Sentences, Shadowing, Sound drill or Free Talk. Your roadmap is built from the words you actually mispronounce."
            )}
          </p>
          {onGoMode && (
            <Button className="gap-1" onClick={() => onGoMode("sentence")}>
              <Mic className="w-4 h-4" />
              {t("Bắt đầu luyện", "Start practising")}
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Next step hero */}
      {nextStep && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-primary/40 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 min-w-0 space-y-2">
                  <Badge className="gap-1"><Target className="w-3 h-3" />{t("Bước tiếp theo", "Next step")}</Badge>
                  <h3 className="text-lg md:text-xl font-bold">
                    {t(nextStep.titleVi, nextStep.titleEn)}
                  </h3>
                  <p className="text-sm text-muted-foreground">{t(nextStep.reasonVi, nextStep.reasonEn)}</p>
                  {nextStep.words.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {nextStep.words.map((w) => (
                        <button
                          key={w.word}
                          onClick={() => speak(w.word)}
                          className="inline-flex items-center gap-1 rounded-full border bg-background px-3 py-1 text-sm hover:bg-accent"
                          aria-label={t(`Nghe ${w.word}`, `Listen to ${w.word}`)}
                        >
                          <Volume2 className="w-3 h-3 text-primary" />
                          <span className="font-medium">{w.word}</span>
                          <span className="text-xs text-muted-foreground">{w.rate}%</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 md:w-48">
                  <Button className="gap-1" onClick={() => onGoMode?.(nextStep.mode)}>
                    {t("Bắt đầu", "Start")} <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => setDone((d) => ({ ...d, [nextStep.id]: true }))}>
                    <CheckCircle2 className="w-4 h-4" />
                    {t("Đã xong", "Mark done")}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    ~{nextStep.minutes} {t("phút", "min")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Today's target */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-muted-foreground">{t("Mục tiêu hôm nay", "Today's target")}</p>
            <p className="text-2xl font-bold text-primary">
              {plan.dailyTargetWords} {t("từ", "words")}
            </p>
            <p className="text-xs text-muted-foreground">~{plan.dailyTargetMinutes} {t("phút", "min")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-muted-foreground">{t("Từ cần sửa", "Words to fix")}</p>
            <p className="text-2xl font-bold text-orange-500">{plan.activeWords}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Flame className="w-3 h-3" /> {intensityLabel}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-muted-foreground">{t("Xu hướng 7 ngày", "7-day trend")}</p>
            <p className={`text-2xl font-bold flex items-center gap-1 ${plan.trend === "worsening" ? "text-destructive" : "text-emerald-600"}`}>
              {plan.trend === "worsening" ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              {plan.trendDelta > 0 ? `+${plan.trendDelta}` : plan.trendDelta}
            </p>
            <p className="text-xs text-muted-foreground">{trendLabel}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-muted-foreground">{t("Tiến độ lộ trình", "Roadmap progress")}</p>
            <p className="text-2xl font-bold">{doneCount}/{plan.steps.length}</p>
            <Progress value={plan.steps.length ? (doneCount / plan.steps.length) * 100 : 0} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Compass className="w-4 h-4 text-primary" />
            {t("Lộ trình cá nhân hóa hôm nay", "Your personalised roadmap today")}
            <Badge variant="secondary" className="ml-auto">~{totalMinutes} {t("phút", "min")}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {plan.steps.map((step, i) => {
            const Icon = MODE_ICON[step.mode];
            const isDone = !!done[step.id];
            return (
              <div
                key={step.id}
                className={`rounded-lg border p-3 md:p-4 flex flex-col md:flex-row md:items-center gap-3 ${isDone ? "opacity-60 bg-muted/40" : "bg-background"}`}
              >
                <div className="flex items-center gap-3 md:w-56 shrink-0">
                  <div className="w-9 h-9 rounded-full bg-primary/10 grid place-items-center shrink-0">
                    {isDone ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <Icon className="w-5 h-5 text-primary" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{t("Bước", "Step")} {i + 1} · ~{step.minutes} {t("phút", "min")}</p>
                    <p className="font-semibold text-sm leading-snug">{t(step.titleVi, step.titleEn)}</p>
                  </div>
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <p className="text-sm text-muted-foreground">{t(step.reasonVi, step.reasonEn)}</p>
                  {step.words.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {step.words.map((w) => (
                        <Badge key={w.word} variant="outline" className="font-normal">
                          {w.word}
                          <span className="ml-1 text-muted-foreground">×{w.misses}</span>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <Button
                  size="sm"
                  variant={isDone ? "outline" : "default"}
                  className="gap-1 md:w-32"
                  onClick={() => onGoMode?.(step.mode)}
                >
                  {isDone ? t("Luyện lại", "Again") : t("Luyện ngay", "Practise")}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Trend context */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {t("Lỗi phát âm 14 ngày qua", "Misses over the last 14 days")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={trend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="planTrend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="misses" stroke="hsl(var(--primary))" fill="url(#planTrend)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground mt-2">
            {t(
              `7 ngày qua: ${plan.recentMisses} lỗi · 7 ngày trước đó: ${plan.previousMisses} lỗi · độ chính xác ${plan.accuracy}%`,
              `Last 7 days: ${plan.recentMisses} misses · previous 7 days: ${plan.previousMisses} · accuracy ${plan.accuracy}%`
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PronunciationPlanPanel;
