import { useMemo, useState } from "react";
import { Activity, Radar as RadarIcon } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { programmingSkills, weeklyPythonProgress, type PythonCompletion } from "@/lib/pythonChallengeProgress";

interface Props { ids: Set<string>; history: PythonCompletion[]; loading: boolean; error: boolean; }

export default function PythonProgressChart({ ids, history, loading, error }: Props) {
  const { t } = useLanguage();
  const [view, setView] = useState<"skills" | "growth">("skills");
  const skills = useMemo(() => programmingSkills(ids).map(s => ({ ...s, name: t(s.vi, s.en) })), [ids, t]);
  const trend = useMemo(() => weeklyPythonProgress(history).map(p => ({ ...p, label: new Date(p.date).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" }) })), [history]);
  return (
    <section className="rounded-lg border border-border bg-card p-4" aria-label={t("Năng lực lập trình của bạn", "Your programming skills")}>
      <div className="mb-1 flex items-center gap-2">
        <RadarIcon className="h-5 w-5 text-primary" />
        <h2 className="font-bold text-foreground">{t("Năng lực lập trình", "Your programming skills")}</h2>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">{t("Tiến độ hoàn thành theo nhóm kỹ năng", "Completion progress by skill area")}</p>
      <div className="mt-4 flex gap-1 border-b border-border pb-2" role="group" aria-label={t("Chọn biểu đồ", "Chart view")}>
        <Button size="sm" variant={view === "skills" ? "secondary" : "ghost"} aria-pressed={view === "skills"} onClick={() => setView("skills")}><RadarIcon />{t("Kỹ năng", "Skills")}</Button>
        <Button size="sm" variant={view === "growth" ? "secondary" : "ghost"} aria-pressed={view === "growth"} onClick={() => setView("growth")}><Activity />{t("Tiến bộ", "Growth")}</Button>
      </div>
      {loading && <p className="mt-2 text-xs text-muted-foreground" role="status">{t("Đang đồng bộ tiến độ...", "Syncing progress...")}</p>}
      {error && <p className="mt-2 text-xs text-destructive" role="status">{t("Chưa tải được lịch sử tài khoản. Đang hiển thị tiến độ trên thiết bị.", "Account history unavailable. Showing this device's progress.")}</p>}
      {view === "skills" ? <>
        <div className="h-64 w-full" aria-hidden="true">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={skills} outerRadius="60%">
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="name" tick={{ fill: "hsl(var(--foreground))", fontSize: 10 }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <ul className="space-y-3">
          {skills.map(s => <li key={s.en}>
            <div className="mb-1 flex items-center justify-between gap-2 text-xs"><span className="text-foreground">{s.name}</span><span className="shrink-0 font-mono text-muted-foreground">{s.completed}/{s.total}</span></div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted"><svg width={`${s.value}%`} height="6" className="text-primary" role="img" aria-label={`${s.name}: ${s.value}%`}><rect width="100%" height="6" fill="currentColor" /></svg></div>
          </li>)}
        </ul>
        {ids.size === 0 && !loading && <p className="mt-4 text-sm text-muted-foreground">{t("Hoàn thành bài đầu tiên để bắt đầu hành trình của bạn.", "Your journey starts with your first completed challenge.")}</p>}
      </> : <>
        <div className="mt-4 h-56 w-full" aria-label={t("Bài hoàn thành tích lũy trong 8 tuần", "Cumulative completions over 8 weeks")}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend} margin={{ top: 10, right: 12, bottom: 5, left: -25 }}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} interval={1} />
              <YAxis allowDecimals={false} domain={[0, "auto"]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <Tooltip content={({ active, payload }) => active && payload?.length ? <div className="rounded-md border border-border bg-popover p-2 text-xs text-popover-foreground">{payload[0].payload.label}: {payload[0].value} {t("bài", "challenges")}</div> : null} />
              <Line type="monotone" dataKey="completed" name={t("Đã hoàn thành", "Completed")} stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{t("8 tuần gần nhất · Mỗi bài tính một lần theo ngày hoàn thành đầu tiên được lưu trên tài khoản.", "Last 8 weeks · Each challenge counts once, at its first recorded account completion.")}</p>
        {!history.length && !loading && <p className="mt-3 text-sm text-muted-foreground">{t("Chưa có lịch sử hoàn thành có ngày trên tài khoản.", "No dated account completions yet.")}</p>}
      </>}
    </section>
  );
}