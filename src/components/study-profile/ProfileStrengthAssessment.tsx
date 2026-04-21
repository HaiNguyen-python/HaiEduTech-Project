/**
 * @file ProfileStrengthAssessment.tsx
 * @description AI-powered profile strength assessment with radar chart, score, and 3-column analysis.
 */
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, RefreshCw, TrendingUp, AlertCircle, Lightbulb, History } from "lucide-react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface Assessment {
  id: string;
  overall_score: number;
  academic_score: number;
  language_score: number;
  experience_score: number;
  documents_score: number;
  motivation_score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  summary: string;
  created_at: string;
}

const scoreColor = (s: number) => {
  if (s >= 80) return "from-emerald-500 to-teal-600";
  if (s >= 60) return "from-amber-500 to-orange-600";
  if (s >= 40) return "from-orange-500 to-rose-600";
  return "from-rose-500 to-red-600";
};

const scoreLabel = (s: number, t: (vi: string, en: string) => string) => {
  if (s >= 85) return t("Xuất sắc", "Excellent");
  if (s >= 70) return t("Tốt", "Strong");
  if (s >= 55) return t("Khá", "Decent");
  if (s >= 40) return t("Cần cải thiện", "Needs Work");
  return t("Yếu", "Weak");
};

const ProfileStrengthAssessment = ({ userId }: { userId: string | null }) => {
  const { t } = useLanguage();
  const [latest, setLatest] = useState<Assessment | null>(null);
  const [history, setHistory] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);

  const load = useCallback(async () => {
    if (!userId) { setLoading(false); return; }
    const { data } = await supabase
      .from("profile_strength_assessments")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10);
    const arr = (data || []) as Assessment[];
    setLatest(arr[0] || null);
    setHistory(arr);
    setLoading(false);
  }, [userId]);

  useEffect(() => { load(); }, [load]);

  const runAssessment = async () => {
    setRunning(true);
    try {
      const { data, error } = await supabase.functions.invoke("assess-profile-strength", { body: {} });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast({ title: t("Đánh giá hoàn tất", "Assessment complete"), description: t(`Điểm tổng: ${data.assessment.overall_score}/100`, `Overall: ${data.assessment.overall_score}/100`) });
      await load();
    } catch (e: any) {
      toast({ title: t("Lỗi đánh giá", "Assessment failed"), description: e.message, variant: "destructive" });
    } finally {
      setRunning(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;
  }

  const radarData = latest ? [
    { dim: t("Học thuật", "Academic"), score: latest.academic_score },
    { dim: t("Ngôn ngữ", "Language"), score: latest.language_score },
    { dim: t("Kinh nghiệm", "Experience"), score: latest.experience_score },
    { dim: t("Hồ sơ", "Documents"), score: latest.documents_score },
    { dim: t("Động lực", "Motivation"), score: latest.motivation_score },
  ] : [];

  return (
    <div className="space-y-4">
      {/* Action bar */}
      <Card>
        <CardContent className="p-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-semibold text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              {t("Đánh giá độ mạnh hồ sơ du học", "Study-Abroad Profile Strength")}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {t("AI phân tích Profile + Documents + Motivation Letter để chấm điểm và gợi ý.", "AI analyzes your Profile + Documents + Motivation Letters to score and suggest improvements.")}
            </div>
          </div>
          <Button onClick={runAssessment} disabled={running} className="gap-2">
            {running ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            {latest ? t("Đánh giá lại", "Re-assess") : t("Đánh giá ngay", "Assess Now")}
          </Button>
        </CardContent>
      </Card>

      {!latest ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-3 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">
              {t("Chưa có đánh giá nào. Bấm 'Đánh giá ngay' để AI phân tích hồ sơ của bạn.", "No assessments yet. Click 'Assess Now' for AI analysis of your profile.")}
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Score + Radar */}
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4">
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`w-40 h-40 rounded-full bg-gradient-to-br ${scoreColor(latest.overall_score)} flex items-center justify-center shadow-2xl`}
                >
                  <div className="text-center text-white">
                    <div className="text-5xl font-bold">{latest.overall_score}</div>
                    <div className="text-xs opacity-90">/100</div>
                  </div>
                </motion.div>
                <div className="mt-3 font-semibold">{scoreLabel(latest.overall_score, t)}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {new Date(latest.created_at).toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="text-xs font-semibold text-muted-foreground mb-2 px-1">
                  {t("Phân tích 5 chiều", "5-Dimension Analysis")}
                </div>
                <ResponsiveContainer width="100%" height={240}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="dim" tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
                    <Radar name="Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <Card>
            <CardContent className="p-4">
              <div className="text-xs font-semibold text-muted-foreground mb-1">{t("Tóm tắt từ AI", "AI Summary")}</div>
              <p className="text-sm leading-relaxed">{latest.summary}</p>
            </CardContent>
          </Card>

          {/* 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Card className="border-emerald-500/30 bg-emerald-500/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <div className="font-semibold text-sm text-emerald-700 dark:text-emerald-400">
                    {t("Điểm mạnh", "Strengths")}
                  </div>
                </div>
                <ul className="space-y-2 text-sm">
                  {latest.strengths.map((s, i) => (
                    <li key={i} className="flex gap-2"><span className="text-emerald-600 dark:text-emerald-400">✓</span><span>{s}</span></li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-rose-500/30 bg-rose-500/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <div className="font-semibold text-sm text-rose-700 dark:text-rose-400">
                    {t("Điểm yếu", "Weaknesses")}
                  </div>
                </div>
                <ul className="space-y-2 text-sm">
                  {latest.weaknesses.map((w, i) => (
                    <li key={i} className="flex gap-2"><span className="text-rose-600 dark:text-rose-400">!</span><span>{w}</span></li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  <div className="font-semibold text-sm text-primary">
                    {t("Gợi ý hành động", "Recommendations")}
                  </div>
                </div>
                <ol className="space-y-2 text-sm list-decimal list-inside">
                  {latest.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* History */}
          {history.length > 1 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <History className="w-4 h-4 text-muted-foreground" />
                  <div className="font-semibold text-sm">{t("Lịch sử đánh giá", "Assessment History")}</div>
                </div>
                <div className="space-y-1.5">
                  {history.slice(1).map((h) => (
                    <div key={h.id} className="flex items-center justify-between p-2 rounded-md bg-muted/30 text-xs">
                      <span className="text-muted-foreground">{new Date(h.created_at).toLocaleString()}</span>
                      <Badge variant="outline">{h.overall_score}/100 · {scoreLabel(h.overall_score, t)}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileStrengthAssessment;
