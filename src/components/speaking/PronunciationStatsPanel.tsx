/**
 * @file PronunciationStatsPanel.tsx
 * @description Table + charts of the words the learner mispronounces most,
 * per Speaking Coach language. Data is read from the local pronunciation log.
 */
import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BarChart3, Download, RotateCcw, Search, Volume2, Brain, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { playSpeakingTts, type SpeakingLang } from "@/lib/speakingModeShared";
import {
  allPronWords,
  dailyTrend,
  errorRate,
  loadPronStats,
  pronStatsCsv,
  resetPronStats,
  sourceBreakdown,
  summarize,
  topMissedWords,
  type PronSource,
  type PronWordStat,
} from "@/lib/speaking/pronunciationStats";

interface Props {
  language: SpeakingLang;
  onPractice?: () => void;
}

type SortKey = "misses" | "rate" | "recent";

const SOURCE_COLORS: Record<PronSource, string> = {
  sentence: "hsl(var(--primary))",
  shadow: "hsl(var(--chart-2, 160 70% 40%))",
  drill: "hsl(var(--chart-3, 35 90% 55%))",
  freetalk: "hsl(var(--chart-4, 280 65% 60%))",
};

const barColor = (misses: number, max: number) => {
  const ratio = max > 0 ? misses / max : 0;
  if (ratio >= 0.66) return "hsl(var(--destructive))";
  if (ratio >= 0.33) return "hsl(35 92% 52%)";
  return "hsl(48 96% 53%)";
};

const PronunciationStatsPanel = ({ language, onPractice }: Props) => {
  const { t } = useLanguage();
  const [version, setVersion] = useState(0);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("misses");

  const store = useMemo(() => loadPronStats(language), [language, version]);
  const summary = useMemo(() => summarize(store), [store]);
  const trend = useMemo(() => dailyTrend(store, 14), [store]);
  const top = useMemo(() => topMissedWords(store, 10), [store]);
  const sources = useMemo(() => sourceBreakdown(store), [store]);

  const sourceLabel: Record<PronSource, string> = {
    sentence: t("Câu mẫu", "Sentences"),
    shadow: t("Nói theo", "Shadowing"),
    drill: t("Luyện âm", "Sound drill"),
    freetalk: t("Nói tự do", "Free Talk"),
  };

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = allPronWords(store).filter((w) => !q || w.word.toLowerCase().includes(q));
    return list.sort((a, b) => {
      if (sort === "rate") return errorRate(b) - errorRate(a) || b.misses - a.misses;
      if (sort === "recent") return b.lastSeen.localeCompare(a.lastSeen);
      return b.misses - a.misses || b.attempts - a.attempts;
    });
  }, [store, query, sort]);

  const maxMiss = top.length > 0 ? top[0].misses : 0;

  const handleExport = useCallback(() => {
    const blob = new Blob([`\uFEFF${pronStatsCsv(store)}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pronunciation-stats-${language}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [store, language]);

  const handleReset = useCallback(() => {
    resetPronStats(language);
    setVersion((v) => v + 1);
  }, [language]);

  const mainTopics = allPronWords(store).length;

  if (mainTopics === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center space-y-3">
          <BarChart3 className="w-10 h-10 mx-auto text-muted-foreground" />
          <p className="font-semibold text-foreground">
            {t("Chưa có dữ liệu thống kê", "No statistics yet")}
          </p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {t(
              "Hãy luyện vài câu ở các chế độ Câu mẫu, Nói theo, Luyện âm hoặc Nói tự do - hệ thống sẽ tự ghi lại những từ bạn hay phát âm sai và vẽ biểu đồ tại đây.",
              "Practise a few sentences in Sentences, Shadowing, Sound drill or Free Talk - the words you mispronounce are logged automatically and charted here."
            )}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: t("Tổng từ khó", "Tricky words"), value: summary.totalWords, tone: "text-primary" },
          { label: t("Đang cần ôn", "Still practising"), value: summary.activeWords, tone: "text-destructive" },
          { label: t("Đã khắc phục", "Fixed"), value: summary.fixedWords, tone: "text-emerald-600" },
          { label: t("Độ chính xác", "Accuracy"), value: `${summary.accuracy}%`, tone: "text-foreground" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className={`text-2xl font-bold ${s.tone}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Top missed words */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              {t("Top 10 từ hay phát âm sai", "Top 10 mispronounced words")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ height: Math.max(220, top.length * 34) }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={top} layout="vertical" margin={{ left: 8, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
                  <XAxis type="number" allowDecimals={false} fontSize={12} />
                  <YAxis type="category" dataKey="word" width={96} fontSize={12} />
                  <Tooltip
                    formatter={(v: number) => [`${v}`, t("Số lần sai", "Misses")]}
                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                  />
                  <Bar dataKey="misses" radius={[0, 6, 6, 0]}>
                    {top.map((w) => (
                      <Cell key={w.word} fill={barColor(w.misses, maxMiss)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {/* Trend */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-emerald-600" />
                {t("Xu hướng 14 ngày", "14-day trend")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trend} margin={{ left: 0, right: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="label" fontSize={11} interval={2} />
                    <YAxis allowDecimals={false} fontSize={11} width={28} />
                    <Tooltip
                      formatter={(v: number) => [`${v}`, t("Lỗi", "Misses")]}
                      contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                    />
                    <Line type="monotone" dataKey="misses" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Source breakdown */}
          {sources.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{t("Lỗi theo chế độ luyện", "Errors by practice mode")}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <div className="h-32 w-32 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={sources} dataKey="count" nameKey="source" innerRadius={26} outerRadius={54}>
                        {sources.map((s) => (
                          <Cell key={s.source} fill={SOURCE_COLORS[s.source]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(v: number, _n, p) => [`${v}`, sourceLabel[(p?.payload?.source ?? "sentence") as PronSource]]}
                        contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <ul className="text-sm space-y-1">
                  {sources.map((s) => (
                    <li key={s.source} className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-sm" style={{ background: SOURCE_COLORS[s.source] }} />
                      <span className="text-muted-foreground">{sourceLabel[s.source]}</span>
                      <span className="font-semibold text-foreground">{s.count}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardHeader className="pb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-base">{t("Bảng chi tiết", "Detailed table")}</CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("Tìm từ...", "Find a word...")}
                className="pl-8 h-9 w-40"
              />
            </div>
            {([
              { key: "misses", label: t("Sai nhiều", "Most misses") },
              { key: "rate", label: t("Tỉ lệ sai", "Error rate") },
              { key: "recent", label: t("Mới nhất", "Recent") },
            ] as const).map((s) => (
              <Button
                key={s.key}
                size="sm"
                variant={sort === s.key ? "default" : "outline"}
                onClick={() => setSort(s.key)}
              >
                {s.label}
              </Button>
            ))}
            <Button size="sm" variant="outline" onClick={handleExport} className="gap-1">
              <Download className="w-4 h-4" /> CSV
            </Button>
            <Button size="sm" variant="ghost" onClick={handleReset} className="gap-1 text-muted-foreground">
              <RotateCcw className="w-4 h-4" /> {t("Xóa", "Reset")}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ minWidth: 600 }}>
              <thead>
                <tr className="text-left text-muted-foreground border-b">
                  <th className="py-2 pr-3">{t("Từ", "Word")}</th>
                  <th className="py-2 pr-3">{t("Phiên âm", "Phonetics")}</th>
                  <th className="py-2 pr-3 text-right">{t("Số lần sai", "Misses")}</th>
                  <th className="py-2 pr-3 text-right">{t("Tỉ lệ sai", "Error rate")}</th>
                  <th className="py-2 pr-3">{t("Lần gần nhất", "Last seen")}</th>
                  <th className="py-2 pr-3">{t("Trạng thái", "Status")}</th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody>
                {rows.map((w: PronWordStat) => (
                  <tr key={w.word} className="border-b last:border-0 hover:bg-muted/40">
                    <td className="py-2 pr-3 font-semibold text-foreground">{w.word}</td>
                    <td className="py-2 pr-3 text-muted-foreground">{w.ipa || "-"}</td>
                    <td className="py-2 pr-3 text-right font-semibold">{w.misses}</td>
                    <td className="py-2 pr-3 text-right">
                      <span className={errorRate(w) >= 60 ? "text-destructive font-semibold" : "text-foreground"}>
                        {errorRate(w)}%
                      </span>
                    </td>
                    <td className="py-2 pr-3 text-muted-foreground">{w.lastSeen}</td>
                    <td className="py-2 pr-3">
                      {w.fixed ? (
                        <Badge variant="secondary">{t("Đã khắc phục", "Fixed")}</Badge>
                      ) : (
                        <Badge variant="outline">{t("Đang ôn", "Practising")}</Badge>
                      )}
                    </td>
                    <td className="py-2 text-right whitespace-nowrap">
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label={t("Nghe phát âm", "Listen")}
                        onClick={() => playSpeakingTts(language, w.word)}
                      >
                        <Volume2 className="w-4 h-4" />
                      </Button>
                      {onPractice && !w.fixed && (
                        <Button size="icon" variant="ghost" aria-label={t("Luyện ngay", "Practise now")} onClick={onPractice}>
                          <Brain className="w-4 h-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rows.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">
                {t("Không tìm thấy từ nào.", "No words found.")}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PronunciationStatsPanel;
