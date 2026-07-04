// IELTS Writing skill progress chart — 4 official criteria with distinct colors
import { useEffect, useState } from "react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TrendingUp, Target, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

// Official IELTS Writing criteria + a dedicated color per criterion
const CRITERIA = [
  { key: "TR", labelVi: "Task Response",       labelEn: "Task Response",              color: "#3B82F6" }, // blue
  { key: "CC", labelVi: "Coherence & Cohesion", labelEn: "Coherence & Cohesion",      color: "#10B981" }, // emerald
  { key: "LR", labelVi: "Lexical Resource",    labelEn: "Lexical Resource",           color: "#F59E0B" }, // amber
  { key: "GR", labelVi: "Grammar & Accuracy",  labelEn: "Grammatical Range & Accuracy", color: "#EF4444" }, // red
] as const;

type CritKey = typeof CRITERIA[number]["key"];

interface Attempt {
  created_at: string;
  overall_score: number | null;
  task_type: number | null;
  result: any;
}

interface AggRow { key: CritKey; label: string; score: number; color: string; fullMark: number; }

function matchCriterion(label: string): CritKey | null {
  const l = label.toLowerCase();
  if (l.includes("task") && (l.includes("response") || l.includes("achievement"))) return "TR";
  if (l.includes("coher") || l.includes("cohesion")) return "CC";
  if (l.includes("lexical") || l.includes("vocab")) return "LR";
  if (l.includes("grammat") || l.includes("grammar") || l.includes("accuracy") || l.includes("range")) return "GR";
  return null;
}

interface Props { taskType?: 1 | 2 | "all"; }

const WritingSkillChart = ({ taskType = "all" }: Props) => {
  const { t } = useLanguage();
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setAttempts([]); setLoading(false); return; }
      let q = supabase
        .from("writing_attempts")
        .select("created_at, overall_score, task_type, result")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(30);
      const { data } = await q;
      setAttempts((data as Attempt[]) || []);
      setLoading(false);
    })();
  }, []);

  const filtered = attempts.filter(a => taskType === "all" || a.task_type === taskType);

  // Aggregate: average score per criterion across filtered attempts
  const perCritScores: Record<CritKey, number[]> = { TR: [], CC: [], LR: [], GR: [] };
  filtered.forEach(a => {
    const crits = Array.isArray(a.result?.criteria) ? a.result.criteria : [];
    crits.forEach((c: any) => {
      const k = matchCriterion(String(c.label || ""));
      if (k && typeof c.score === "number") perCritScores[k].push(c.score);
    });
  });

  const radarData: AggRow[] = CRITERIA.map(c => {
    const arr = perCritScores[c.key];
    const avg = arr.length ? arr.reduce((s, v) => s + v, 0) / arr.length : 0;
    return { key: c.key, label: t(c.labelVi, c.labelEn), score: Number(avg.toFixed(1)), color: c.color, fullMark: 9 };
  });

  // Latest attempt per criterion
  const latest: AggRow[] = CRITERIA.map(c => {
    const first = filtered.find(a => Array.isArray(a.result?.criteria)
      && a.result.criteria.some((cr: any) => matchCriterion(String(cr.label || "")) === c.key));
    const cr = first?.result?.criteria?.find((x: any) => matchCriterion(String(x.label || "")) === c.key);
    return { key: c.key, label: t(c.labelVi, c.labelEn), score: cr?.score || 0, color: c.color, fullMark: 9 };
  });

  // Trend data: reverse chronological -> chronological
  const trend = [...filtered].reverse().map((a, i) => {
    const row: Record<string, any> = { idx: i + 1, date: new Date(a.created_at).toLocaleDateString() };
    (a.result?.criteria || []).forEach((c: any) => {
      const k = matchCriterion(String(c.label || ""));
      if (k) row[k] = c.score;
    });
    row.overall = a.overall_score;
    return row;
  });

  const targetBand = 7;

  if (loading) {
    return (
      <Card className="border-2 border-primary/20">
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          {t("Đang tải biểu đồ năng lực...", "Loading skill chart...")}
        </CardContent>
      </Card>
    );
  }

  if (filtered.length === 0) {
    return (
      <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-emerald-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="w-4 h-4 text-primary" />
            {t("Biểu đồ năng lực Writing", "Writing Skill Chart")}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {t(
            "Chưa có dữ liệu. Hãy nộp bài đầu tiên để xem điểm 4 tiêu chí IELTS Writing của bạn.",
            "No data yet. Submit your first essay to see your 4 IELTS Writing criteria scores."
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
            {CRITERIA.map(c => (
              <div key={c.key} className="flex items-center gap-2 text-xs px-2 py-1.5 rounded border bg-background">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: c.color }} />
                <span className="font-medium">{t(c.labelVi, c.labelEn)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const gap = (row: AggRow) => Number((targetBand - row.score).toFixed(1));
  const overallAvg = radarData.reduce((s, r) => s + r.score, 0) / radarData.length;

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-muted/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="w-4 h-4 text-primary" />
            {t("Biểu đồ năng lực Writing", "Writing Skill Chart")}
            <span className="text-xs font-normal text-muted-foreground ml-1">
              ({filtered.length} {t("bài", "attempts")})
            </span>
          </CardTitle>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-muted-foreground">{t("TB tổng", "Avg")}: <strong className="text-primary">{overallAvg.toFixed(1)}</strong></span>
            <span className="text-muted-foreground flex items-center gap-1"><Target className="w-3 h-3" /> {t("Mục tiêu", "Target")} {targetBand.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="radar" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 h-8 mb-3">
            <TabsTrigger value="radar" className="text-xs">🎯 {t("Tổng quan", "Overview")}</TabsTrigger>
            <TabsTrigger value="gap" className="text-xs">📊 {t("Khoảng cách", "Gap")}</TabsTrigger>
            <TabsTrigger value="trend" className="text-xs">📈 {t("Tiến trình", "Trend")}</TabsTrigger>
          </TabsList>

          <TabsContent value="radar" className="mt-2">
            <div className="grid md:grid-cols-2 gap-4 items-center">
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="72%">
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="label" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 9]} tick={{ fontSize: 10 }} />
                  <Radar name={t("Trung bình", "Average")} dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.25} strokeWidth={2} />
                  <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                </RadarChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {radarData.map(r => (
                  <div key={r.key} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 font-medium">
                        <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: r.color }} />
                        {r.label}
                      </span>
                      <span className="font-bold" style={{ color: r.color }}>
                        {r.score.toFixed(1)} <span className="text-muted-foreground font-normal">/ 9</span>
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${(r.score / 9) * 100}%`, backgroundColor: r.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gap" className="mt-2">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={radarData.map(r => ({ ...r, gap: gap(r) }))} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="label" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis domain={[0, 9]} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                  formatter={(v: number, name: string) => [v, name === "score" ? t("Điểm hiện tại", "Current") : t("Cần thêm", "Gap to target")]}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="score" name={t("Điểm hiện tại", "Current")} radius={[4, 4, 0, 0]}>
                  {radarData.map((r, i) => <Cell key={i} fill={r.color} />)}
                </Bar>
                <Bar dataKey="gap" name={t("Cần thêm để đạt " + targetBand, `Gap to Band ${targetBand}`)} stackId="a" fill="hsl(var(--muted))" fillOpacity={0.5} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {t(
                `Cột màu = điểm hiện tại. Phần xám = khoảng cách đến Band ${targetBand}.`,
                `Colored bar = current score. Grey = gap to Band ${targetBand}.`
              )}
            </p>
          </TabsContent>

          <TabsContent value="trend" className="mt-2">
            {trend.length < 2 ? (
              <p className="text-xs text-muted-foreground text-center py-10">
                {t("Cần ít nhất 2 bài để xem biểu đồ tiến trình.", "Need at least 2 attempts to show a trend.")}
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={trend} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="idx" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" label={{ value: t("Bài số", "Attempt"), position: "insideBottom", offset: -3, style: { fontSize: 10, fill: "hsl(var(--muted-foreground))" } }} />
                  <YAxis domain={[0, 9]} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  {CRITERIA.map(c => (
                    <Line key={c.key} type="monotone" dataKey={c.key} name={t(c.labelVi, c.labelEn)} stroke={c.color} strokeWidth={2} dot={{ r: 3 }} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-4 pt-3 border-t grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          {latest.map(r => (
            <div key={r.key} className="p-2 rounded-lg border bg-background/50" style={{ borderLeftWidth: 3, borderLeftColor: r.color }}>
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{r.label}</div>
              <div className="font-bold text-base" style={{ color: r.color }}>{r.score || "-"}</div>
              <div className="text-[10px] text-muted-foreground">{t("Bài mới nhất", "Latest attempt")}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WritingSkillChart;
