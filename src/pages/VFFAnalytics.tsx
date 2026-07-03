/**
 * @file VFFAnalytics.tsx
 * @description Weakness radar + suggested next lessons.
 */
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, Target } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useVFFProgress } from "@/hooks/useVFFProgress";
import { vffLevelA1, vffLevelB1 } from "@/data/vietnamese/vffLevels";
import { vffLevelA2 } from "@/data/vietnamese/vffLevelA2";

const VFFAnalytics = () => {
  const { t } = useLanguage();
  const { progress } = useVFFProgress();

  const data = useMemo(() => {
    const lessons = progress.lessonsCompleted;
    const scores = Object.values(lessons);
    const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    const cp = (progress.checkpointsPassed.A1 || 0 + (progress.checkpointsPassed.A2 || 0) + (progress.checkpointsPassed.B1 || 0)) / 3;
    return [
      { skill: t("Nghe", "Listening"), value: Math.min(100, avg * 0.9) },
      { skill: t("Nói", "Speaking"), value: Math.min(100, avg * 0.8) },
      { skill: t("Đọc", "Reading"), value: Math.min(100, avg) },
      { skill: t("Viết", "Writing"), value: Math.min(100, avg * 0.7) },
      { skill: t("Phát âm", "Pronun."), value: Math.min(100, cp || avg * 0.85) },
    ];
  }, [progress, t]);

  const allLessons = [...vffLevelA1.lessons, ...vffLevelA2.lessons, ...vffLevelB1.lessons];
  const suggestions = allLessons
    .filter(l => (progress.lessonsCompleted[l.id] ?? 0) < 80)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SEO title="My Vietnamese Analytics | HaiEduTech" description="See your Vietnamese skill radar and get suggested lessons this week." path="/learn-vietnamese/for-foreigners/analytics" />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link to="/learn-vietnamese/for-foreigners" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />{t("Về hub", "Back to hub")}
          </Link>
          <div className="rounded-2xl p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 mb-6">
            <TrendingUp className="w-10 h-10 text-blue-600 mb-2" />
            <h1 className="text-3xl font-bold mb-1">{t("Phân tích kỹ năng", "Skill Analytics")}</h1>
            <p className="text-muted-foreground">{t("Biểu đồ 5 kỹ năng và gợi ý bài học tuần này.", "Your 5-skill radar with weekly lesson suggestions.")}</p>
          </div>

          <Card className="mb-6 border-2">
            <CardContent className="pt-6">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/25">
            <CardContent className="pt-5">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-primary" />
                <h3 className="font-bold">{t("Gợi ý ưu tiên tuần này", "This week's priority lessons")}</h3>
              </div>
              {suggestions.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t("Bạn đã hoàn thành tất cả bài học! 🎉", "You've finished every lesson! 🎉")}</p>
              ) : (
                <ul className="space-y-2">
                  {suggestions.map(l => (
                    <li key={l.id} className="flex items-center justify-between border rounded-lg p-3">
                      <div>
                        <div className="font-medium text-sm">{l.title}</div>
                        <div className="text-xs text-muted-foreground">{l.titleEn}</div>
                      </div>
                      <Badge variant="outline">{progress.lessonsCompleted[l.id] ?? 0}%</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VFFAnalytics;
