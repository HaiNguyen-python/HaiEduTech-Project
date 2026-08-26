/**
 * @file IeltsPerformance.tsx
 * @description "Your IELTS Performance" - one dashboard that aggregates every
 *   result the student produced across the 4 skills plus vocabulary and grammar,
 *   predicts the achievable band, estimates test readiness and ranks what to fix.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
  ResponsiveContainer, AreaChart, Area, BarChart, Bar,
} from "recharts";
import {
  Activity, ArrowRight, BookOpen, BrainCircuit, CalendarClock, Gauge, Headphones,
  Lightbulb, Mic2, PenTool, Sparkles, Target, TrendingDown, TrendingUp, Trophy,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useIeltsPerformance } from "@/hooks/useIeltsPerformance";
import { skillLabel, skillLink, type SkillKey } from "@/lib/ieltsPerformanceModel";

const SKILL_META: Record<SkillKey, { icon: typeof Headphones; color: string; hex: string }> = {
  listening: { icon: Headphones, color: "text-purple-500", hex: "#8B5CF6" },
  reading: { icon: BookOpen, color: "text-amber-500", hex: "#F59E0B" },
  writing: { icon: PenTool, color: "text-primary", hex: "#3B82F6" },
  speaking: { icon: Mic2, color: "text-emerald-500", hex: "#10B981" },
};

const TARGETS = [6, 6.5, 7, 7.5, 8];

const fmtDate = (ms: number) => {
  const d = new Date(ms);
  return `${d.getDate()}/${d.getMonth() + 1}`;
};

const IeltsPerformance = () => {
  const { t } = useLanguage();
  const p = useIeltsPerformance();
  const [coach, setCoach] = useState<string | null>(null);
  const [coachLoading, setCoachLoading] = useState(false);

  const skills = ["listening", "reading", "writing", "speaking"] as const;
  const hasAnyData = p.prediction.totalAttempts > 0;

  const radarData = useMemo(() => {
    const rows = skills.map((k) => ({
      subject: t(skillLabel(k).vi, skillLabel(k).en),
      band: p.prediction.perSkill[k] ?? 0,
      fullMark: 9,
    }));
    rows.push({ subject: t("Từ vựng", "Vocabulary"), band: p.vocab.lexicalBand ?? 0, fullMark: 9 });
    rows.push({ subject: t("Ngữ pháp", "Grammar"), band: p.grammarBand ?? 0, fullMark: 9 });
    return rows;
  }, [p.prediction, p.vocab.lexicalBand, p.grammarBand, t]);

  const trendData = useMemo(() => {
    const byDay = new Map<string, Record<string, number | string>>();
    skills.forEach((k) => {
      p.stats[k].history.forEach((h) => {
        const key = fmtDate(h.at);
        const row = byDay.get(key) || { label: key, at: h.at };
        row[k] = h.band;
        byDay.set(key, row);
      });
    });
    return [...byDay.values()].sort((a, b) => Number(a.at) - Number(b.at)).slice(-25);
  }, [p.stats]);

  const criteriaData = useMemo(
    () => p.criteria.map((c) => ({ name: c.label, score: c.score, source: c.source })),
    [p.criteria],
  );

  const askCoach = async () => {
    setCoachLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ielts-performance-coach", {
        body: {
          target: p.target,
          predicted: p.prediction.overall,
          perSkill: p.prediction.perSkill,
          confidence: p.prediction.confidence,
          weeksToTarget: p.ready.weeks,
          criteria: p.criteria,
          vocabMastered: p.vocab.mastered,
          attempts: Object.fromEntries(skills.map((k) => [k, p.stats[k].attempts])),
        },
      });
      if (error) throw error;
      setCoach(data?.analysis || null);
    } catch {
      // Rule-based fallback so the panel is never empty.
      const weakest = skills
        .filter((k) => p.prediction.perSkill[k] != null)
        .sort((a, b) => (p.prediction.perSkill[a] as number) - (p.prediction.perSkill[b] as number))[0];
      setCoach(
        weakest
          ? t(
              `Điểm dự đoán hiện tại là ${p.prediction.overall?.toFixed(1)}. Kỹ năng cần ưu tiên là ${skillLabel(weakest).vi}. Hãy luyện kỹ năng này 3 lần mỗi tuần, mỗi lần làm 1 đề đầy đủ rồi đọc lại toàn bộ giải thích đáp án. Duy trì 15 từ vựng mới mỗi tuần để nâng Lexical Resource.`,
              `Your predicted overall is ${p.prediction.overall?.toFixed(1)}. Priority skill: ${skillLabel(weakest).en}. Practise it three times a week with one full set each time, then read every answer explanation. Keep adding 15 new words a week to lift Lexical Resource.`,
            )
          : t(
              "Hãy hoàn thành ít nhất 1 bài ở mỗi kỹ năng để nhận phân tích chi tiết.",
              "Complete at least one task in each skill to unlock a detailed analysis.",
            ),
      );
    } finally {
      setCoachLoading(false);
    }
  };

  const confidenceLabel = {
    none: t("Chưa có dữ liệu", "No data"),
    low: t("Độ tin cậy thấp", "Low confidence"),
    medium: t("Độ tin cậy trung bình", "Medium confidence"),
    high: t("Độ tin cậy cao", "High confidence"),
  }[p.prediction.confidence];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t("Your IELTS Performance - Dashboard năng lực IELTS", "Your IELTS Performance - IELTS Analytics")}
        description={t(
          "Dashboard phân tích 4 kỹ năng IELTS, dự đoán band điểm, thời gian sẵn sàng thi và lộ trình cải thiện cá nhân hóa.",
          "Analytics for all 4 IELTS skills: predicted band score, test-readiness timeline and a personalised improvement plan.",
        )}
        path="/ielts-performance"
        locale="vi_VN"
      />
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 pt-24 pb-16 max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="mb-3 bg-primary/10 text-primary border-primary/30">
            <Gauge className="w-3.5 h-3.5 mr-1" /> Cambridge IELTS
          </Badge>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
            {t("Năng lực IELTS của bạn", "Your IELTS Performance")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            {t(
              "Toàn bộ kết quả luyện tập của bạn ở 4 kỹ năng, từ vựng và ngữ pháp được tổng hợp thành một bức tranh năng lực, kèm dự đoán band điểm và lộ trình cải thiện.",
              "Every practice result across the 4 skills, vocabulary and grammar in one competency picture, with a predicted band score and an improvement roadmap.",
            )}
          </p>
        </motion.header>

        {/* Overall verdict */}
        <Card className="mb-6 border-primary/25 bg-gradient-to-br from-primary/[0.06] to-emerald-500/[0.06]">
          <CardContent className="p-5 md:p-6 grid gap-6 md:grid-cols-3">
            <div className="text-center md:text-left">
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                {t("Band dự đoán", "Predicted Overall")}
              </div>
              <div className="text-5xl font-display font-bold text-gradient leading-none">
                {p.prediction.overall != null ? p.prediction.overall.toFixed(1) : "--"}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {confidenceLabel} · {p.prediction.totalAttempts} {t("lượt luyện", "attempts")}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-1">
                <Target className="w-3.5 h-3.5" /> {t("Mục tiêu", "Target band")}
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {TARGETS.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => p.setTarget(v)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-colors ${
                      p.target === v
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border hover:bg-muted/50"
                    }`}
                  >
                    {v.toFixed(1)}
                  </button>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                {p.prediction.overall == null
                  ? t("Chưa đủ dữ liệu để tính khoảng cách.", "Not enough data to measure the gap yet.")
                  : p.ready.ready
                    ? t("Bạn đã đạt mục tiêu, hãy giữ phong độ.", "You have reached the target, keep the streak going.")
                    : t(
                        `Còn thiếu ${p.ready.gap.toFixed(1)} band.`,
                        `${p.ready.gap.toFixed(1)} band to go.`,
                      )}
              </div>

            </div>

            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-1">
                <CalendarClock className="w-3.5 h-3.5" /> {t("Sẵn sàng thi", "Test readiness")}
              </div>
              <div className="text-3xl font-display font-bold text-foreground">
                {p.ready.ready
                  ? t("Sẵn sàng", "Ready")
                  : p.ready.weeks != null
                    ? t(`~${p.ready.weeks} tuần`, `~${p.ready.weeks} weeks`)
                    : "--"}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {p.ready.estimated
                  ? t(
                      "Ước tính theo mô hình 0.5 band / 7 tuần luyện đều.",
                      "Estimated with the 0.5 band per 7 weeks steady-practice model.",
                    )
                  : t(
                      `Dựa trên tốc độ tiến bộ thực tế của bạn: +${(p.ready.ratePerWeek * 4).toFixed(2)} band/tháng.`,
                      `Based on your measured rate: +${(p.ready.ratePerWeek * 4).toFixed(2)} band per month.`,
                    )}
              </div>
            </div>
          </CardContent>
        </Card>

        {!hasAnyData && (
          <Card className="mb-6 border-dashed">
            <CardContent className="py-6 text-center text-sm text-muted-foreground">
              <Activity className="w-6 h-6 mx-auto mb-2 opacity-60" />
              {t(
                "Chưa có dữ liệu. Hãy làm 1 đề Listening hoặc Reading, viết 1 bài Task 2 và ghi âm 1 câu Speaking để mở toàn bộ phân tích.",
                "No data yet. Complete one Listening or Reading set, one Task 2 essay and one Speaking recording to unlock the full analysis.",
              )}
              <div className="mt-3 flex flex-wrap gap-2 justify-center">
                {skills.map((k) => (
                  <Button key={k} asChild size="sm" variant="outline">
                    <Link to={skillLink(k)}>{t(skillLabel(k).vi, skillLabel(k).en)}</Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Radar + skill cards */}
        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-primary" />
                {t("Bản đồ năng lực 6 trục", "6-axis Competency Radar")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} outerRadius="72%">
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                    <PolarRadiusAxis domain={[0, 9]} tick={false} axisLine={false} />
                    <Radar
                      dataKey="band"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.22}
                      strokeWidth={2}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8, fontSize: 12,
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-3 sm:grid-cols-2 content-start">
            {skills.map((k) => {
              const s = p.stats[k];
              const meta = SKILL_META[k];
              const Icon = meta.icon;
              const band = p.prediction.perSkill[k];
              const spark = s.history.slice(-8).map((h, i) => ({ i, band: h.band }));
              return (
                <Card key={k} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <Icon className={`w-4 h-4 ${meta.color}`} />
                        {t(skillLabel(k).vi, skillLabel(k).en)}
                      </div>
                      {s.attempts >= 4 && (
                        <span className={`text-xs flex items-center gap-1 ${s.trend >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                          {s.trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {s.trend >= 0 ? "+" : ""}{s.trend.toFixed(1)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-end gap-3">
                      <div className="text-3xl font-display font-bold leading-none">
                        {band != null ? band.toFixed(1) : "--"}
                      </div>
                      <div className="text-[11px] text-muted-foreground pb-0.5">
                        <div>{t("Cao nhất", "Best")}: {s.best != null ? s.best.toFixed(1) : "--"}</div>
                        <div>
                          {s.avgPercent != null
                            ? `${s.avgPercent}% ${t("chính xác", "accuracy")}`
                            : `${s.attempts} ${t("lượt", "attempts")}`}
                        </div>
                      </div>
                    </div>
                    <div className="h-10 mt-2 -mx-1">
                      {spark.length > 1 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={spark}>
                            <Area type="monotone" dataKey="band" stroke={meta.hex} fill={meta.hex} fillOpacity={0.18} strokeWidth={2} />
                          </AreaChart>
                        </ResponsiveContainer>
                      ) : (
                        <Link to={skillLink(k)} className="text-xs text-primary hover:underline inline-flex items-center gap-1">
                          {t("Bắt đầu luyện", "Start practising")} <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Trend chart */}
        {trendData.length > 1 && (
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                {t("Tiến bộ theo thời gian", "Progress over time")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData} margin={{ top: 8, right: 12, bottom: 4, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                    <XAxis dataKey="label" fontSize={11} tick={{ fill: "currentColor", opacity: 0.7 }} />
                    <YAxis domain={[3, 9]} fontSize={11} width={28} tick={{ fill: "currentColor", opacity: 0.7 }} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 8, fontSize: 12,
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <ReferenceLine y={p.target} stroke="hsl(var(--primary))" strokeDasharray="4 4" opacity={0.5} />
                    {skills.map((k) => (
                      <Line
                        key={k}
                        type="monotone"
                        dataKey={k}
                        name={t(skillLabel(k).vi, skillLabel(k).en)}
                        stroke={SKILL_META[k].hex}
                        strokeWidth={2}
                        dot={{ r: 2.5 }}
                        connectNulls
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Vocabulary & Grammar */}
        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                {t("Từ vựng", "Vocabulary")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Kpi label={t("Đã thuộc", "Mastered")} value={String(p.vocab.mastered)} />
                <Kpi
                  label={t("Band từ vựng", "Lexical band")}
                  value={p.vocab.lexicalBand != null ? p.vocab.lexicalBand.toFixed(1) : "--"}
                  accent
                />
                <Kpi
                  label={t("7 ngày qua", "Last 7 days")}
                  value={p.vocab.last7 != null ? `+${p.vocab.last7}` : "--"}
                />
                <Kpi
                  label={t("Cần ôn lại", "Due for review")}
                  value={p.vocab.dueForReview != null ? String(p.vocab.dueForReview) : "--"}
                />
              </div>
              {!p.vocab.hasTimeline && p.vocab.mastered > 0 && (
                <p className="text-xs text-muted-foreground">
                  {t(
                    "Đăng nhập để đồng bộ ngày học từ và tính lịch ôn tập chính xác.",
                    "Sign in to sync word dates and get an accurate review schedule.",
                  )}
                </p>
              )}
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>{t("Tiến độ 1000 từ IELTS", "Progress to 1000 IELTS words")}</span>
                  <span>{Math.min(100, Math.round((p.vocab.mastered / 1000) * 100))}%</span>
                </div>
                <Progress value={Math.min(100, (p.vocab.mastered / 1000) * 100)} className="h-2" />
              </div>
              <Button asChild size="sm" variant="outline" className="w-full">
                <Link to="/ielts-vocabulary">
                  {t("Mở Vocabulary Bank", "Open Vocabulary Bank")} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Gauge className="w-5 h-5 text-rose-500" />
                {t("Tiêu chí chấm chi tiết", "Grading criteria breakdown")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {criteriaData.length ? (
                <>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={criteriaData} layout="vertical" margin={{ left: 8, right: 16 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis type="number" domain={[0, 9]} fontSize={11} tick={{ fill: "currentColor", opacity: 0.7 }} />
                        <YAxis type="category" dataKey="name" width={130} fontSize={10} tick={{ fill: "currentColor", opacity: 0.8 }} />
                        <Tooltip
                          contentStyle={{
                            background: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: 8, fontSize: 12,
                          }}
                        />
                        <ReferenceLine x={p.target} stroke="hsl(var(--primary))" strokeDasharray="4 4" />
                        <Bar dataKey="score" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} barSize={14} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2">
                    {t(
                      "Ngữ pháp tổng hợp từ Writing (Grammatical Range) và Speaking.",
                      "Grammar is combined from Writing (Grammatical Range) and Speaking.",
                    )}{" "}
                    {p.grammarBand != null && `${t("Band ngữ pháp", "Grammar band")}: ${p.grammarBand.toFixed(1)}`}
                  </p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground py-8 text-center">
                  {t(
                    "Chấm 1 bài Writing hoặc 1 câu Speaking để xem phân tích theo 4 tiêu chí.",
                    "Grade one Writing task or one Speaking answer to see the 4-criteria breakdown.",
                  )}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Weaknesses */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              {t("Bạn cần cải thiện gì", "What you need to improve")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {p.weaknesses.length ? p.weaknesses.map((w, i) => (
              <div
                key={w.id}
                className={`rounded-xl border p-4 ${
                  w.severity === "high"
                    ? "border-rose-500/30 bg-rose-500/[0.05]"
                    : w.severity === "medium"
                      ? "border-amber-500/30 bg-amber-500/[0.05]"
                      : "border-border bg-card"
                }`}
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="min-w-0">
                    <div className="font-semibold text-sm flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-[11px] flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      {t(w.titleVi, w.titleEn)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{t(w.detailVi, w.detailEn)}</p>
                    <p className="text-xs text-foreground mt-1.5">➜ {t(w.actionVi, w.actionEn)}</p>
                  </div>
                  <Button asChild size="sm" variant="outline" className="shrink-0">
                    <Link to={w.link}>{t("Luyện ngay", "Practise")} <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
                  </Button>
                </div>
              </div>
            )) : (
              <p className="text-sm text-muted-foreground text-center py-6">
                <Trophy className="w-6 h-6 mx-auto mb-2 text-amber-500" />
                {t(
                  "Tất cả kỹ năng đã đạt mục tiêu. Hãy nâng mục tiêu lên mức cao hơn.",
                  "Every skill is at target. Raise your target band to keep pushing.",
                )}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Weekly plan + AI coach */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <CalendarClock className="w-5 h-5 text-emerald-500" />
                {t("Kế hoạch luyện mỗi tuần", "Weekly practice plan")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {p.plan.map((row) => {
                const Icon = SKILL_META[row.key].icon;
                return (
                  <div key={row.key} className="flex items-center justify-between rounded-lg border bg-card px-3 py-2">
                    <span className="text-sm flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${SKILL_META[row.key].color}`} />
                      {t(skillLabel(row.key).vi, skillLabel(row.key).en)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {row.sessions} {t("buổi", "sessions")} · {row.minutes} {t("phút", "min")}
                    </span>
                  </div>
                );
              })}
              <p className="text-[11px] text-muted-foreground pt-1">
                {t(
                  "Khối lượng được phân bổ theo khoảng cách tới band mục tiêu của từng kỹ năng.",
                  "Volume is weighted by each skill's distance from your target band.",
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-primary" />
                {t("Nhận xét của AI Coach", "AI Coach commentary")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {coach ? (
                <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{coach}</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {t(
                    "Tạo nhận xét chi tiết dựa trên toàn bộ số liệu phía trên: điểm mạnh, điểm yếu và việc cần làm trong 4 tuần tới.",
                    "Generate a detailed commentary from all the numbers above: strengths, weaknesses and what to do in the next 4 weeks.",
                  )}
                </p>
              )}
              <Button onClick={askCoach} disabled={coachLoading || !hasAnyData} size="sm" className="w-full">
                {coachLoading
                  ? t("Đang phân tích...", "Analysing...")
                  : coach
                    ? t("Phân tích lại", "Re-analyse")
                    : t("Phân tích năng lực của tôi", "Analyse my performance")}
              </Button>
              {!p.signedIn && (
                <p className="text-[11px] text-muted-foreground">
                  {t(
                    "Đăng nhập để đồng bộ điểm Writing và từ vựng từ tài khoản của bạn.",
                    "Sign in to sync your Writing scores and vocabulary from your account.",
                  )}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Kpi = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div className={`rounded-lg border px-3 py-2 ${accent ? "bg-primary/10 border-primary/30" : "bg-card"}`}>
    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
    <div className="text-lg font-bold leading-tight">{value}</div>
  </div>
);

export default IeltsPerformance;
