/**
 * "Your Performance" for Chinese and Technology: charts of every result the
 * student has logged in student_activity_log for that subject.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar,
} from "recharts";
import { Activity, Clock, Gauge, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

type Subject = "chinese" | "programming";
interface Row { activity_type: string; score: number | null; max_score: number | null; time_spent_seconds: number | null; created_at: string }
interface Section { key: string; vi: string; en: string; match: RegExp }

const SECTIONS: Record<Subject, Section[]> = {
  chinese: [
    { key: "vocab", vi: "Từ vựng HSK", en: "HSK Vocabulary", match: /vocab|word|hsk_srs|flashcard/ },
    { key: "test", vi: "Đề thi HSK", en: "HSK Tests", match: /test|exam|mock|hsk(?!k)/ },
    { key: "speaking", vi: "Nói & HSKK", en: "Speaking & HSKK", match: /speak|hskk|pronunc|tone|pinyin|drill/ },
    { key: "grammar", vi: "Ngữ pháp", en: "Grammar", match: /grammar/ },
    { key: "reading", vi: "Đọc & Nghe", en: "Reading & Listening", match: /read|listen/ },
    { key: "conversation", vi: "Giao tiếp", en: "Conversation", match: /conv|curriculum|lesson|culture/ },
    { key: "games", vi: "Trò chơi", en: "Games", match: /arcade|game|song/ },
  ],
  programming: [
    { key: "python", vi: "Python", en: "Python", match: /python|pyodide/ },
    { key: "sql", vi: "SQL & Dữ liệu", en: "SQL & Data", match: /sql|data|spark/ },
    { key: "ai", vi: "AI & Machine Learning", en: "AI & Machine Learning", match: /ai_|ml_|machine|academy/ },
    { key: "scratch", vi: "Scratch", en: "Scratch", match: /scratch/ },
    { key: "quiz", vi: "Quiz & Lý thuyết", en: "Quizzes & Theory", match: /quiz|theory|lesson/ },
    { key: "startup", vi: "Startup", en: "Startup", match: /startup/ },
  ],
};

const pct = (r: Row) => {
  const max = r.max_score && r.max_score > 0 ? r.max_score : 10;
  return Math.max(0, Math.min(100, ((r.score ?? 0) / max) * 100));
};

const SubjectPerformance = ({ subject }: { subject: Subject }) => {
  const { t } = useLanguage();
  const [rows, setRows] = useState<Row[] | null>(null);
  const [signedIn, setSignedIn] = useState(true);
  const sections = SECTIONS[subject];
  const other = { key: "other", vi: "Khác", en: "Other", match: /.*/ };
  const sectionOf = (type: string) => sections.find((s) => s.match.test(type.toLowerCase())) ?? other;

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setSignedIn(false); setRows([]); return; }
      const { data } = await supabase
        .from("student_activity_log")
        .select("activity_type, score, max_score, time_spent_seconds, created_at")
        .eq("user_id", session.user.id)
        .eq("domain", subject)
        .order("created_at", { ascending: true })
        .limit(2000);
      setRows((data as Row[]) ?? []);
    })();
  }, [subject]);

  const stats = useMemo(() => {
    const list = rows ?? [];
    const bySection = new Map<string, { label: string; count: number; total: number; minutes: number }>();
    [...sections, other].forEach((s) => bySection.set(s.key, { label: t(s.vi, s.en), count: 0, total: 0, minutes: 0 }));
    const byDay = new Map<string, { label: string; sum: number; n: number }>();
    const byWeek = new Map<string, { label: string; activities: number; minutes: number }>();
    let minutes = 0;
    list.forEach((r) => {
      const s = bySection.get(sectionOf(r.activity_type).key)!;
      const p = pct(r);
      const m = (r.time_spent_seconds ?? 0) / 60;
      s.count += 1; s.total += p; s.minutes += m; minutes += m;
      const d = new Date(r.created_at);
      const dayKey = d.toISOString().slice(0, 10);
      const day = byDay.get(dayKey) || { label: `${d.getDate()}/${d.getMonth() + 1}`, sum: 0, n: 0 };
      day.sum += p; day.n += 1; byDay.set(dayKey, day);
      const monday = new Date(d); monday.setDate(d.getDate() - ((d.getDay() + 6) % 7));
      const wk = monday.toISOString().slice(0, 10);
      const week = byWeek.get(wk) || { label: `${monday.getDate()}/${monday.getMonth() + 1}`, activities: 0, minutes: 0 };
      week.activities += 1; week.minutes += m; byWeek.set(wk, week);
    });
    const sectionRows = [...bySection.values()]
      .filter((s) => s.count > 0 || s.label !== t(other.vi, other.en))
      .map((s) => ({ name: s.label, activities: s.count, average: s.count ? Math.round(s.total / s.count) : 0, minutes: Math.round(s.minutes) }));
    const trend = [...byDay.entries()].sort(([a], [b]) => a.localeCompare(b)).slice(-30)
      .map(([, v]) => ({ label: v.label, score: Math.round(v.sum / v.n) }));
    const weekly = [...byWeek.entries()].sort(([a], [b]) => a.localeCompare(b)).slice(-12)
      .map(([, v]) => ({ label: v.label, activities: v.activities, minutes: Math.round(v.minutes) }));
    const avg = list.length ? Math.round(list.reduce((a, r) => a + pct(r), 0) / list.length) : 0;
    const best = sectionRows.filter((s) => s.activities > 0).sort((a, b) => b.average - a.average)[0];
    return { total: list.length, avg, minutes: Math.round(minutes), sectionRows, trend, weekly, best };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, t, subject]);

  const title = subject === "chinese" ? t("Kết quả học Tiếng Trung", "Your Chinese Performance") : t("Kết quả học Công nghệ", "Your Technology Performance");
  const home = subject === "chinese" ? "/chinese" : "/programming";
  const axis = { fontSize: 12, fill: "hsl(var(--muted-foreground))" };
  const tooltipStyle = { background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 };

  return (
    <div className="min-h-screen bg-background">
      <SEO title={`${title} | HaiEduTech`} description={t("Biểu đồ kết quả học tập tích lũy theo từng phần.", "Charts of your cumulative learning results by section.")} />
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground mt-2">{t("Toàn bộ kết quả bạn đã làm, tổng hợp theo từng phần.", "Every result you have produced, grouped by section.")}</p>

        {rows === null ? (
          <p className="mt-10 text-muted-foreground">{t("Đang tải...", "Loading...")}</p>
        ) : !signedIn || rows.length === 0 ? (
          <Card className="mt-8"><CardContent className="p-8 text-center space-y-4">
            <p className="text-foreground font-medium">
              {!signedIn ? t("Đăng nhập để xem kết quả học tập.", "Sign in to see your results.") : t("Chưa có kết quả nào. Hãy làm bài để biểu đồ bắt đầu ghi nhận.", "No results yet. Complete some practice and your charts will start filling in.")}
            </p>
            <Button asChild><Link to={signedIn ? home : "/login"}>{signedIn ? t("Bắt đầu học", "Start learning") : t("Đăng nhập", "Sign in")}</Link></Button>
          </CardContent></Card>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {[
                { icon: Activity, label: t("Bài đã làm", "Activities"), value: stats.total },
                { icon: Gauge, label: t("Điểm trung bình", "Average score"), value: `${stats.avg}%` },
                { icon: Clock, label: t("Thời gian học", "Study time"), value: `${stats.minutes} ${t("phút", "min")}` },
                { icon: Trophy, label: t("Phần mạnh nhất", "Strongest section"), value: stats.best?.name ?? "-" },
              ].map((k) => (
                <Card key={k.label}><CardContent className="p-4">
                  <k.icon className="h-5 w-5 text-primary" />
                  <p className="text-sm text-muted-foreground mt-2">{k.label}</p>
                  <p className="text-xl font-bold text-foreground">{k.value}</p>
                </CardContent></Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              <Card><CardHeader><CardTitle className="text-lg">{t("Điểm trung bình theo phần", "Average score by section")}</CardTitle></CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={stats.sectionRows}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="name" tick={axis} />
                      <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar dataKey="average" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.35} />
                      <Tooltip contentStyle={tooltipStyle} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent></Card>

              <Card><CardHeader><CardTitle className="text-lg">{t("Số bài đã làm theo phần", "Activities by section")}</CardTitle></CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.sectionRows} layout="vertical" margin={{ left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" allowDecimals={false} tick={axis} />
                      <YAxis type="category" dataKey="name" width={130} tick={axis} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar dataKey="activities" name={t("Bài", "Activities")} fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent></Card>

              <Card><CardHeader><CardTitle className="text-lg">{t("Xu hướng điểm (30 ngày học gần nhất)", "Score trend (last 30 study days)")}</CardTitle></CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats.trend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="label" tick={axis} />
                      <YAxis domain={[0, 100]} tick={axis} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Line type="monotone" dataKey="score" name={t("Điểm %", "Score %")} stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent></Card>

              <Card><CardHeader><CardTitle className="text-lg">{t("Hoạt động theo tuần", "Weekly activity")}</CardTitle></CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.weekly}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="label" tick={axis} />
                      <YAxis allowDecimals={false} tick={axis} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar dataKey="activities" name={t("Bài", "Activities")} fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="minutes" name={t("Phút", "Minutes")} fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent></Card>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SubjectPerformance;
