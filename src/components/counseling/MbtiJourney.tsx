/**
 * @file MbtiJourney.tsx
 * @description Hành trình MBTI - so sánh kết quả qua nhiều lần test:
 *   - Timeline kiểu hành trình (mốc thời gian + type code + ghi chú)
 *   - Line chart 4 chiều (E%, S%, T%, J%) qua thời gian
 *   - Nút "Hỏi Compass AI" để nhận phân tích sự trưởng thành nhận thức
 * Hiển thị khi user có ≥ 2 lần làm MBTI Full Test.
 * @author HaiEduTech
 */

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import {
  TrendingUp,
  Sparkles,
  Loader2,
  Calendar,
  ArrowRight,
  Heart,
  Lightbulb,
  Target,
} from "lucide-react";
import DOMPurify from "dompurify";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { MBTI_PROFILES } from "@/data/mbtiFullTest";
import { toast } from "sonner";

interface MbtiJourneyProps {
  history: any[]; // career_assessments rows, newest first
}

interface KeyChange {
  dimension: "EI" | "SN" | "TF" | "JP";
  trend: "stable" | "growing" | "shifting";
  note: string;
}

interface AiInsight {
  narrative: string;
  key_changes: KeyChange[];
  growth_insight: string;
  next_step: string;
}

const DIM_LABELS: Record<string, { vi: string; en: string; positive: string; negative: string }> = {
  EI: { vi: "Hướng ngoại / Hướng nội", en: "Extraversion / Introversion", positive: "E", negative: "I" },
  SN: { vi: "Cảm giác / Trực giác", en: "Sensing / Intuition", positive: "S", negative: "N" },
  TF: { vi: "Lý trí / Cảm xúc", en: "Thinking / Feeling", positive: "T", negative: "F" },
  JP: { vi: "Nguyên tắc / Linh hoạt", en: "Judging / Perceiving", positive: "J", negative: "P" },
};

const DIM_COLORS = {
  EI: "hsl(262 83% 58%)", // violet
  SN: "hsl(199 89% 48%)", // sky
  TF: "hsl(160 84% 39%)", // emerald
  JP: "hsl(330 81% 60%)", // pink
};

export default function MbtiJourney({ history }: MbtiJourneyProps) {
  const { t, lang } = useLanguage();
  const [aiInsight, setAiInsight] = useState<AiInsight | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  // Sort oldest → newest for timeline & chart
  const sorted = useMemo(
    () =>
      [...history]
        .filter((h) => h?.result?.code && h?.result?.scores)
        .sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        ),
    [history]
  );

  // Build chart data
  const chartData = useMemo(
    () =>
      sorted.map((h, i) => {
        const s = h.result.scores || {};
        const date = new Date(h.created_at);
        return {
          name: lang === "vi" ? `Lần ${i + 1}` : `Test ${i + 1}`,
          date: date.toLocaleDateString(lang === "vi" ? "vi-VN" : "en-US", {
            month: "short",
            day: "numeric",
          }),
          code: h.result.code,
          EI: Math.round(s.EI?.pct ?? 50),
          SN: Math.round(s.SN?.pct ?? 50),
          TF: Math.round(s.TF?.pct ?? 50),
          JP: Math.round(s.JP?.pct ?? 50),
        };
      }),
    [sorted, lang]
  );

  // Detect changes between latest and first
  const latestCode = sorted[sorted.length - 1]?.result?.code as string | undefined;
  const firstCode = sorted[0]?.result?.code as string | undefined;
  const hasTypeChange = latestCode && firstCode && latestCode !== firstCode;

  const requestAiInsight = async () => {
    setLoadingAi(true);
    setAiInsight(null);
    try {
      const { data: session } = await supabase.auth.getSession();
      const payload = {
        language: lang,
        history: sorted.map((h) => ({
          date: new Date(h.created_at).toISOString().slice(0, 10),
          code: h.result.code,
          scores: {
            EI: Math.round(h.result.scores?.EI?.pct ?? 50),
            SN: Math.round(h.result.scores?.SN?.pct ?? 50),
            TF: Math.round(h.result.scores?.TF?.pct ?? 50),
            JP: Math.round(h.result.scores?.JP?.pct ?? 50),
          },
        })),
      };
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/counseling-ai`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.session?.access_token}`,
          },
          body: JSON.stringify({ mode: "mbti-journey", payload }),
        }
      );
      const data = await resp.json();
      if (data?.narrative) {
        setAiInsight(data);
      } else {
        toast.error(t("Không nhận được phân tích", "Could not get analysis"));
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to analyze");
    } finally {
      setLoadingAi(false);
    }
  };

  if (sorted.length < 2) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      {/* Header */}
      <div className="rounded-2xl border border-violet-200/60 dark:border-violet-900/40 bg-gradient-to-br from-violet-50/80 via-pink-50/60 to-sky-50/60 dark:from-violet-950/30 dark:via-pink-950/20 dark:to-sky-950/20 p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-display font-bold">
              {t("Hành trình MBTI của em", "Your MBTI Journey")}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {t(
                `Em đã làm ${sorted.length} lần trắc nghiệm. Cùng nhìn lại sự thay đổi nhận thức bản thân theo thời gian nhé.`,
                `You've taken the test ${sorted.length} times. Let's look at how your self-awareness has evolved over time.`
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline hành trình */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-violet-500" />
          {t("Mốc hành trình", "Journey Milestones")}
        </h4>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gradient-to-b from-violet-300 via-sky-300 to-emerald-300 dark:from-violet-800 dark:via-sky-800 dark:to-emerald-800" />
          <div className="space-y-4">
            {sorted.map((h, i) => {
              const r = h.result;
              const profile = MBTI_PROFILES[r.code];
              const date = new Date(h.created_at);
              const prev = i > 0 ? sorted[i - 1].result.code : null;
              const changed = prev && prev !== r.code;
              return (
                <div key={h.id} className="relative pl-12">
                  {/* Dot */}
                  <div
                    className={`absolute left-0 top-1 w-9 h-9 rounded-full bg-gradient-to-br ${
                      profile?.color || "from-violet-500 to-pink-500"
                    } flex items-center justify-center text-white text-[11px] font-bold shadow-md ring-4 ring-background`}
                  >
                    {i + 1}
                  </div>
                  <div className="rounded-xl bg-secondary/40 border border-border p-3">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className={`text-xl font-bold bg-gradient-to-r ${
                          profile?.color || "from-violet-500 to-pink-500"
                        } bg-clip-text text-transparent`}
                      >
                        {r.code}
                      </span>
                      {changed && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-medium flex items-center gap-1">
                          <ArrowRight className="w-3 h-3" />
                          {t("Thay đổi từ", "Changed from")} {prev}
                        </span>
                      )}
                      <span className="text-[11px] text-muted-foreground ml-auto">
                        {date.toLocaleDateString(lang === "vi" ? "vi-VN" : "en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-foreground">
                      {lang === "vi" ? profile?.title_vi : profile?.title_en}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Type change summary */}
        {hasTypeChange && (
          <div className="mt-4 rounded-xl bg-gradient-to-r from-violet-50 to-pink-50 dark:from-violet-950/30 dark:to-pink-950/30 border border-violet-200/60 dark:border-violet-900/40 p-3 flex items-center gap-3">
            <Heart className="w-5 h-5 text-pink-500 flex-shrink-0" />
            <p className="text-xs sm:text-sm">
              <span className="font-semibold">
                {t("Em đã trưởng thành! ", "You've grown! ")}
              </span>
              {t(
                `Từ ${firstCode} đến ${latestCode} - đó là dấu hiệu của sự khám phá bản thân.`,
                `From ${firstCode} to ${latestCode} - a sign of deep self-exploration.`
              )}
            </p>
          </div>
        )}
      </div>

      {/* Line chart 4 dimensions */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <h4 className="text-sm font-bold mb-1 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-sky-500" />
          {t("Tiến triển 4 chiều theo thời gian", "4 Dimensions Over Time")}
        </h4>
        <p className="text-[11px] text-muted-foreground mb-4">
          {t(
            "% nghiêng về chiều thứ nhất (E, S, T, J). 50% = cân bằng.",
            "% leaning toward first letter (E, S, T, J). 50% = balanced."
          )}
        </p>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                ticks={[0, 25, 50, 75, 100]}
              />
              <ReferenceLine y={50} stroke="hsl(var(--muted-foreground))" strokeDasharray="4 4" opacity={0.5} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 12,
                  fontSize: 12,
                }}
                formatter={(value: any, name: string) => {
                  const dim = DIM_LABELS[name];
                  return [`${value}%`, lang === "vi" ? dim?.vi : dim?.en];
                }}
                labelFormatter={(label, items) => {
                  const item = items?.[0]?.payload;
                  return `${label} · ${item?.code} · ${item?.date}`;
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                formatter={(value) => {
                  const dim = DIM_LABELS[value];
                  return lang === "vi" ? dim?.vi : dim?.en;
                }}
              />
              <Line type="monotone" dataKey="EI" stroke={DIM_COLORS.EI} strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="SN" stroke={DIM_COLORS.SN} strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="TF" stroke={DIM_COLORS.TF} strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="JP" stroke={DIM_COLORS.JP} strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insight CTA + Result */}
      <div className="rounded-2xl border border-border bg-gradient-to-br from-emerald-50/60 to-sky-50/60 dark:from-emerald-950/20 dark:to-sky-950/20 p-5">
        {!aiInsight && (
          <div className="text-center">
            <Sparkles className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
            <h4 className="font-bold mb-1">
              {t("Hỏi Compass AI phân tích hành trình của em", "Ask Compass AI to analyze your journey")}
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 max-w-md mx-auto">
              {t(
                "Thầy Hải sẽ đọc dữ liệu các lần test và viết một đoạn cảm nhận ấm áp về sự trưởng thành nhận thức bản thân của em.",
                "Teacher Hai will read your test history and write a warm reflection on how your self-awareness has grown."
              )}
            </p>
            <button
              onClick={requestAiInsight}
              disabled={loadingAi}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-semibold hover:brightness-110 shadow-md disabled:opacity-60"
            >
              {loadingAi ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t("Đang phân tích...", "Analyzing...")}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {t("Hỏi Compass AI", "Ask Compass AI")}
                </>
              )}
            </button>
          </div>
        )}

        {aiInsight && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-bold">{t("Cảm nhận của thầy Hải", "Teacher Hai's Reflection")}</h4>
            </div>

            {/* Narrative */}
            <div
              className="text-sm sm:text-base leading-relaxed text-foreground/90 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(aiInsight.narrative),
              }}
            />

            {/* Key changes */}
            {aiInsight.key_changes?.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-2">
                {aiInsight.key_changes.map((kc, i) => {
                  const dim = DIM_LABELS[kc.dimension];
                  const trendBadge =
                    kc.trend === "growing"
                      ? { label: t("Trưởng thành", "Growing"), color: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300" }
                      : kc.trend === "shifting"
                      ? { label: t("Chuyển dịch", "Shifting"), color: "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300" }
                      : { label: t("Ổn định", "Stable"), color: "bg-sky-100 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300" };
                  return (
                    <div key={i} className="rounded-xl bg-background/70 border border-border p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold">
                          {lang === "vi" ? dim?.vi : dim?.en}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${trendBadge.color}`}>
                          {trendBadge.label}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{kc.note}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Growth + Next step */}
            <div className="grid sm:grid-cols-2 gap-3">
              {aiInsight.growth_insight && (
                <div className="rounded-xl bg-gradient-to-br from-violet-50 to-pink-50 dark:from-violet-950/30 dark:to-pink-950/30 border border-violet-200/60 dark:border-violet-900/40 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Lightbulb className="w-4 h-4 text-violet-500" />
                    <p className="text-xs font-bold">{t("Insight tăng trưởng", "Growth Insight")}</p>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed">{aiInsight.growth_insight}</p>
                </div>
              )}
              {aiInsight.next_step && (
                <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-sky-50 dark:from-emerald-950/30 dark:to-sky-950/30 border border-emerald-200/60 dark:border-emerald-900/40 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-emerald-500" />
                    <p className="text-xs font-bold">{t("Bước tiếp theo", "Next Step")}</p>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed">{aiInsight.next_step}</p>
                </div>
              )}
            </div>

            <button
              onClick={requestAiInsight}
              disabled={loadingAi}
              className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              <Loader2 className={`w-3 h-3 ${loadingAi ? "animate-spin" : "hidden"}`} />
              {t("Phân tích lại", "Re-analyze")}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
