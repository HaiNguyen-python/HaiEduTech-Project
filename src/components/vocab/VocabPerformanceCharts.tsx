/**
 * @file VocabPerformanceCharts.tsx
 * @description Vocabulary progress dashboard shown at the bottom of the IELTS
 * vocabulary page: cumulative mastered words, weekly pace, and per-question-type
 * strengths, so learners can see their own trajectory toward band targets.
 *
 * Data sources (read-only, no schema changes):
 *  - public.user_vocab_mastered  -> mastered words over time (own rows via RLS)
 *  - public.game_scores          -> average practice accuracy
 *  - localStorage vocab_type_stats_<subject> -> accuracy per question type
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
} from "recharts";
import { TrendingUp, CalendarDays, Flame, Target, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type Period = 30 | 90 | 0; // 0 = all time

const VN_TZ = "Asia/Ho_Chi_Minh";

/** Local (Vietnam) day key for a timestamp, e.g. 2026-08-22. */
const vnDayKey = (iso: string): string => {
  const d = new Date(iso);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: VN_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
  return parts; // en-CA gives YYYY-MM-DD
};

/** Monday-based week key for a YYYY-MM-DD day key. */
const weekKey = (dayKey: string): string => {
  const d = new Date(`${dayKey}T00:00:00Z`);
  const dow = (d.getUTCDay() + 6) % 7; // Monday = 0
  d.setUTCDate(d.getUTCDate() - dow);
  return d.toISOString().slice(0, 10);
};

const shortDay = (dayKey: string) => dayKey.slice(5).replace("-", "/");

const BAND_MILESTONES = [
  { words: 100, band: "5.5" },
  { words: 300, band: "6.5" },
  { words: 500, band: "7.5" },
  { words: 800, band: "8.0" },
];

interface Props {
  subject?: string;
  /** Locally known mastered count (used when the user is a guest / offline). */
  localMasteredCount: number;
  t: (vi: string, en: string) => string;
  /** Labels for the question types stored in localStorage. */
  typeLabel: (type: string) => string;
  /** localStorage key holding per-type stats. */
  typeStatsKey: string;
}

interface MasteredRow { word: string; reviewed_at: string | null; created_at: string | null }

const VocabPerformanceCharts = ({
  subject = "ielts",
  localMasteredCount,
  t,
  typeLabel,
  typeStatsKey,
}: Props) => {
  const [rows, setRows] = useState<MasteredRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [period, setPeriod] = useState<Period>(30);
  const [avgAccuracy, setAvgAccuracy] = useState<number | null>(null);
  const [typeStats, setTypeStats] = useState<Record<string, { correct: number; total: number }>>({});

  const loadTypeStats = useCallback(() => {
    try {
      setTypeStats(JSON.parse(localStorage.getItem(typeStatsKey) || "{}"));
    } catch { setTypeStats({}); }
  }, [typeStatsKey]);

  useEffect(() => {
    loadTypeStats();
    const handler = () => loadTypeStats();
    window.addEventListener("vocab-type-stats-updated", handler);
    return () => window.removeEventListener("vocab-type-stats-updated", handler);
  }, [loadTypeStats]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: auth } = await supabase.auth.getUser();
      const uid = auth?.user?.id;
      if (!uid) { if (!cancelled) { setSignedIn(false); setLoading(false); } return; }
      if (!cancelled) setSignedIn(true);

      const [vocabRes, scoreRes] = await Promise.all([
        (supabase as any)
          .from("user_vocab_mastered")
          .select("word, reviewed_at, created_at")
          .eq("user_id", uid)
          .eq("subject", subject)
          .order("reviewed_at", { ascending: true })
          .limit(5000),
        (supabase as any)
          .from("game_scores")
          .select("accuracy, created_at")
          .eq("user_id", uid)
          .eq("game_type", `vocab-${subject}`)
          .order("created_at", { ascending: false })
          .limit(20),
      ]);

      if (cancelled) return;
      setRows((vocabRes.data || []) as MasteredRow[]);
      const accs = ((scoreRes.data || []) as { accuracy: number | null }[])
        .map(r => r.accuracy)
        .filter((a): a is number => typeof a === "number");
      setAvgAccuracy(accs.length ? Math.round(accs.reduce((s, a) => s + a, 0) / accs.length) : null);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [subject]);

  // Per-day counts (Vietnam time), sorted ascending.
  const perDay = useMemo(() => {
    const map = new Map<string, number>();
    rows.forEach(r => {
      const iso = r.reviewed_at || r.created_at;
      if (!iso) return;
      const key = vnDayKey(iso);
      map.set(key, (map.get(key) || 0) + 1);
    });
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [rows]);

  const totalMastered = Math.max(rows.length, localMasteredCount);

  // Cumulative series limited to the selected period.
  const cumulative = useMemo(() => {
    const cutoff = period === 0 ? null : Date.now() - period * 24 * 3600 * 1000;
    let running = 0;
    const out: { day: string; label: string; total: number; added: number }[] = [];
    perDay.forEach(([day, count]) => {
      running += count;
      const ts = new Date(`${day}T00:00:00Z`).getTime();
      if (cutoff === null || ts >= cutoff) {
        out.push({ day, label: shortDay(day), total: running, added: count });
      }
    });
    return out;
  }, [perDay, period]);

  // Weekly pace (new words per week) with the average line.
  const weekly = useMemo(() => {
    const map = new Map<string, number>();
    const cutoff = period === 0 ? null : Date.now() - period * 24 * 3600 * 1000;
    perDay.forEach(([day, count]) => {
      const ts = new Date(`${day}T00:00:00Z`).getTime();
      if (cutoff !== null && ts < cutoff) return;
      const k = weekKey(day);
      map.set(k, (map.get(k) || 0) + count);
    });
    const arr = [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    const avg = arr.length ? Math.round(arr.reduce((s, [, v]) => s + v, 0) / arr.length) : 0;
    return arr.map(([week, words]) => ({ week: shortDay(week), words, avg }));
  }, [perDay, period]);

  // Words added in the last 7 days.
  const last7 = useMemo(() => {
    const cutoff = Date.now() - 7 * 24 * 3600 * 1000;
    return perDay.reduce((sum, [day, count]) => {
      const ts = new Date(`${day}T00:00:00Z`).getTime();
      return ts >= cutoff ? sum + count : sum;
    }, 0);
  }, [perDay]);

  // Consecutive vocabulary study days ending today or yesterday (Vietnam time).
  const streak = useMemo(() => {
    const days = new Set(perDay.map(([d]) => d));
    if (days.size === 0) return 0;
    const today = vnDayKey(new Date().toISOString());
    const cursor = new Date(`${today}T00:00:00Z`);
    if (!days.has(today)) {
      cursor.setUTCDate(cursor.getUTCDate() - 1);
      if (!days.has(cursor.toISOString().slice(0, 10))) return 0;
    }
    let count = 0;
    while (days.has(cursor.toISOString().slice(0, 10))) {
      count += 1;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    }
    return count;
  }, [perDay]);

  const radarData = useMemo(() =>
    Object.entries(typeStats)
      .filter(([, v]) => v.total > 0)
      .map(([type, v]) => ({
        type: typeLabel(type),
        accuracy: Math.round((v.correct / v.total) * 100),
        total: v.total,
      })),
  [typeStats, typeLabel]);

  const nextMilestone = BAND_MILESTONES.find(m => m.words > totalMastered);

  const EmptyNote = ({ text }: { text: string }) => (
    <div className="flex h-56 items-center justify-center rounded-lg border border-dashed border-border px-6 text-center text-sm text-muted-foreground">
      {text}
    </div>
  );

  const stat = (icon: React.ReactNode, value: string, label: string, tone: string) => (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className={`mb-1 flex items-center gap-2 text-xs font-semibold ${tone}`}>{icon}{label}</div>
      <p className="text-2xl font-extrabold text-foreground">{value}</p>
    </div>
  );

  return (
    <section className="mt-10 rounded-2xl border border-border bg-card/60 p-4 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
            <BarChart3 className="h-5 w-5 text-primary" />
            {t("Biểu đồ tiến độ từ vựng", "Vocabulary progress dashboard")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("Theo dõi số từ đã thuộc, nhịp học mỗi tuần và điểm mạnh theo dạng bài.",
               "Track mastered words, weekly pace, and strengths by question type.")}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          {([30, 90, 0] as Period[]).map(p => (
            <Button key={p} size="sm" variant={period === p ? "default" : "outline"} onClick={() => setPeriod(p)}>
              {p === 0 ? t("Tất cả", "All") : `${p} ${t("ngày", "days")}`}
            </Button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stat(<Target className="h-3.5 w-3.5" />, String(totalMastered), t("Tổng từ đã thuộc", "Total mastered"), "text-primary")}
        {stat(<TrendingUp className="h-3.5 w-3.5" />, String(last7), t("Từ mới 7 ngày", "New in 7 days"), "text-emerald-600")}
        {stat(<Flame className="h-3.5 w-3.5" />, String(streak), t("Chuỗi ngày học từ", "Vocab study streak"), "text-orange-500")}
        {stat(<CalendarDays className="h-3.5 w-3.5" />, avgAccuracy === null ? "-" : `${avgAccuracy}%`, t("Độ chính xác Practice", "Practice accuracy"), "text-indigo-500")}
      </div>

      {nextMilestone && (
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
          <Badge variant="outline">
            {t(
              `Còn ${nextMilestone.words - totalMastered} từ nữa để đạt mốc ${nextMilestone.words} từ (Band ${nextMilestone.band})`,
              `${nextMilestone.words - totalMastered} words to reach ${nextMilestone.words} words (Band ${nextMilestone.band})`,
            )}
          </Badge>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 1. Cumulative mastered words */}
        <div className="rounded-xl border border-border bg-background/60 p-4 lg:col-span-2">
          <h3 className="mb-3 text-sm font-bold text-foreground">
            {t("Số từ đã thuộc (cộng dồn)", "Mastered words (cumulative)")}
          </h3>
          {loading ? (
            <EmptyNote text={t("Đang tải dữ liệu...", "Loading data...")} />
          ) : !signedIn ? (
            <EmptyNote text={t("Đăng nhập để lưu và xem tiến độ từ vựng của bạn.", "Sign in to save and see your vocabulary progress.")} />
          ) : cumulative.length === 0 ? (
            <EmptyNote text={t("Chưa có dữ liệu - hãy đánh dấu ⭐ những từ bạn đã thuộc.", "No data yet - mark ⭐ on the words you have mastered.")} />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={cumulative}>
                <defs>
                  <linearGradient id="vocabFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip
                  formatter={(v: number, name) => [v, name === "total" ? t("Tổng từ", "Total words") : t("Từ mới", "New words")]}
                  labelFormatter={l => `${t("Ngày", "Day")} ${l}`}
                />
                {BAND_MILESTONES.map(m => (
                  <ReferenceLine
                    key={m.words}
                    y={m.words}
                    stroke="hsl(var(--muted-foreground))"
                    strokeDasharray="4 4"
                    label={{ value: `${m.words} - Band ${m.band}`, position: "insideTopRight", fontSize: 11 }}
                  />
                ))}
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2.5}
                  fill="url(#vocabFill)"
                  dot={{ r: 3, strokeWidth: 1 }}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* 2. Weekly pace */}
        <div className="rounded-xl border border-border bg-background/60 p-4">
          <h3 className="mb-3 text-sm font-bold text-foreground">{t("Từ mới mỗi tuần", "New words per week")}</h3>
          {weekly.length === 0 ? (
            <EmptyNote text={t("Chưa có dữ liệu tuần nào.", "No weekly data yet.")} />
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <ComposedChart data={weekly}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="words" name={t("Từ mới", "New words")} fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                <Line
                  type="monotone"
                  dataKey="avg"
                  name={t("Trung bình", "Average")}
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* 3. Strengths radar by question type */}
        <div className="rounded-xl border border-border bg-background/60 p-4">
          <h3 className="mb-3 text-sm font-bold text-foreground">{t("Điểm mạnh theo dạng bài", "Strengths by question type")}</h3>
          {radarData.length < 3 ? (
            <EmptyNote text={t("Hãy làm một vài bài Practice để xem điểm mạnh/yếu theo dạng câu hỏi.", "Complete a few Practice rounds to see your strengths by question type.")} />
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData} outerRadius="72%">
                <PolarGrid />
                <PolarAngleAxis dataKey="type" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v: number) => [`${v}%`, t("Độ chính xác", "Accuracy")]} />
                <Radar
                  name={t("Độ chính xác", "Accuracy")}
                  dataKey="accuracy"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.35}
                />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </section>
  );
};

export default VocabPerformanceCharts;
