/**
 * @file DictionaryLookupsAnalytics.tsx
 * @description Admin visualization of words students look up most via the Super Dictionary.
 * @copyright 2026 HaiEduTech. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, TrendingUp, Users, Sparkles } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

type Row = {
  word: string;
  lang: string;
  lookup_count: number;
  unique_users: number;
  last_looked_up_at: string;
};

const LANGS: { value: "all" | "en" | "zh" | "fi" | "vi"; label: string }[] = [
  { value: "all", label: "🌐 All" },
  { value: "en", label: "🇬🇧 English" },
  { value: "zh", label: "🇨🇳 中文" },
  { value: "fi", label: "🇫🇮 Suomi" },
  { value: "vi", label: "🇻🇳 Tiếng Việt" },
];

const RANGES = [
  { days: 7, label: "7d" },
  { days: 30, label: "30d" },
  { days: 90, label: "90d" },
  { days: 365, label: "1y" },
];

const DictionaryLookupsAnalytics = () => {
  const [lang, setLang] = useState<"all" | "en" | "zh" | "fi" | "vi">("all");
  const [days, setDays] = useState(30);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase.rpc("get_top_dictionary_lookups", {
        _lang: lang === "all" ? null : lang,
        _days: days,
        _limit: 50,
      });
      if (cancelled) return;
      if (error) {
        console.warn("dictionary lookups rpc error", error.message);
        setRows([]);
      } else {
        setRows((data ?? []) as Row[]);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [lang, days]);

  const totals = useMemo(() => {
    const totalLookups = rows.reduce((s, r) => s + Number(r.lookup_count || 0), 0);
    const uniqueWords = rows.length;
    const uniqueUsers = rows.reduce((s, r) => s + Number(r.unique_users || 0), 0);
    return { totalLookups, uniqueWords, uniqueUsers };
  }, [rows]);

  const chartData = useMemo(
    () =>
      rows.slice(0, 20).map((r) => ({
        name: r.word.length > 14 ? r.word.slice(0, 13) + "…" : r.word,
        full: r.word,
        lookups: Number(r.lookup_count),
      })),
    [rows],
  );

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Từ vựng học sinh tra nhiều nhất / Most Looked-Up Words
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Dùng dữ liệu này để soạn bài tập trung vào những từ học sinh thật sự cần.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 mb-4">
            <Tabs value={lang} onValueChange={(v) => setLang(v as typeof lang)}>
              <TabsList className="bg-secondary/40">
                {LANGS.map((l) => (
                  <TabsTrigger key={l.value} value={l.value} className="text-xs">
                    {l.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div className="flex gap-1 ml-auto bg-secondary/40 rounded-md p-1">
              {RANGES.map((r) => (
                <button
                  key={r.days}
                  onClick={() => setDays(r.days)}
                  className={`px-3 py-1 text-xs rounded-md font-semibold transition-colors ${
                    days === r.days
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/70 hover:bg-secondary"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            <StatCard icon={<TrendingUp className="w-4 h-4" />} label="Tổng lượt tra" value={totals.totalLookups} />
            <StatCard icon={<Sparkles className="w-4 h-4" />} label="Số từ riêng biệt" value={totals.uniqueWords} />
            <StatCard icon={<Users className="w-4 h-4" />} label="Số học sinh (ước tính)" value={totals.uniqueUsers} />
          </div>

          {loading ? (
            <Skeleton className="h-72 w-full" />
          ) : rows.length === 0 ? (
            <div className="text-sm text-muted-foreground italic py-10 text-center">
              Chưa có lượt tra từ nào trong khoảng thời gian này.
            </div>
          ) : (
            <>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" angle={-35} textAnchor="end" interval={0} height={60} fontSize={11} />
                    <YAxis allowDecimals={false} fontSize={11} />
                    <Tooltip
                      formatter={(v: number) => [`${v} lượt`, "Lượt tra"]}
                      labelFormatter={(_, items) => (items?.[0]?.payload?.full ?? "")}
                    />
                    <Bar dataKey="lookups" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm min-w-[600px]">
                  <thead className="text-left text-xs uppercase text-muted-foreground border-b">
                    <tr>
                      <th className="py-2 pr-3">#</th>
                      <th className="py-2 pr-3">Từ</th>
                      <th className="py-2 pr-3">Ngôn ngữ</th>
                      <th className="py-2 pr-3 text-right">Lượt tra</th>
                      <th className="py-2 pr-3 text-right">Học sinh</th>
                      <th className="py-2 pr-3">Lần cuối</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={`${r.lang}-${r.word}-${i}`} className="border-b border-border/50 hover:bg-secondary/30">
                        <td className="py-2 pr-3 text-muted-foreground">{i + 1}</td>
                        <td className="py-2 pr-3 font-semibold text-foreground">{r.word}</td>
                        <td className="py-2 pr-3 uppercase text-xs text-muted-foreground">{r.lang}</td>
                        <td className="py-2 pr-3 text-right font-mono">{r.lookup_count}</td>
                        <td className="py-2 pr-3 text-right font-mono">{r.unique_users}</td>
                        <td className="py-2 pr-3 text-xs text-muted-foreground">
                          {new Date(r.last_looked_up_at).toLocaleString("vi-VN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) => (
  <div className="rounded-lg border border-border bg-card p-3">
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {icon}
      {label}
    </div>
    <div className="text-2xl font-display font-bold text-foreground mt-1">{value.toLocaleString("vi-VN")}</div>
  </div>
);

export default DictionaryLookupsAnalytics;
