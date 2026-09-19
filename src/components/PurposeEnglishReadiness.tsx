import { Award, BarChart3, Info, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ConvLesson } from "@/data/conversationalCurriculum";
import type { PurposeTopic } from "@/data/purposeEnglishTypes";
import { buildCertificateStatus, buildReadinessSnapshot, type ReadinessScores, type ReadinessTrack } from "@/lib/purposeEnglishReadiness";

interface Props {
  track: ReadinessTrack;
  topics: PurposeTopic[];
  labs: ConvLesson[];
  coreDone: string[];
  labDone: string[];
  practised: string[];
  scores: ReadinessScores;
  onFocus: (section: "core" | "lab") => void;
}

const PurposeEnglishReadiness = ({ track, topics, labs, coreDone, labDone, practised, scores, onFocus }: Props) => {
  const { lang, t } = useLanguage();
  const vi = lang === "vi";
  const snapshot = buildReadinessSnapshot({ track, topics, labs, coreDone, labDone, practised, scores });
  const stageLabels = {
    foundation: t("Đang xây nền", "Building foundations"),
    developing: t("Đang phát triển", "Developing"),
    "nearly-ready": t("Gần sẵn sàng", "Nearly ready"),
    ready: t("Sẵn sàng áp dụng", "Ready to apply"),
  };
  const chartData = snapshot.axes.map((axis) => ({ skill: vi ? axis.shortVi : axis.shortEn, value: axis.value }));
  const focusSection = snapshot.weakest.coreCompleted < snapshot.weakest.coreTotal ? "core" : "lab";
  const certificate = buildCertificateStatus({ topics, labs, coreDone, labDone, overall: snapshot.overall });

  return (
    <section className="mt-8 overflow-hidden rounded-lg border border-border bg-card shadow-sm" aria-labelledby={`${track}-readiness-title`}>
      <div className="border-b border-border bg-primary/5 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase text-primary">{t("Đánh giá ứng dụng", "Applied readiness")}</p>
            <h2 id={`${track}-readiness-title`} className="mt-1 text-2xl font-bold text-foreground">
              {track === "business" ? "Business English Readiness" : "Academic English Readiness"}
            </h2>
            <p className="mt-2 max-w-2xl text-base leading-7 text-muted-foreground">
              {track === "business"
                ? t("Mức sẵn sàng sử dụng tiếng Anh trong môi trường công sở.", "Your readiness to use English in the workplace.")
                : t("Mức sẵn sàng sử dụng tiếng Anh trong học tập và nghiên cứu.", "Your readiness to use English for study and research.")}
            </p>
          </div>
          <div className="min-w-32 rounded-md border border-primary/20 bg-background px-4 py-3 text-center">
            <p className="text-3xl font-bold text-primary">{snapshot.overall}<span className="text-base">/100</span></p>
            <p className="text-sm font-bold text-foreground">{stageLabels[snapshot.stage]}</p>
          </div>
        </div>
      </div>

      {!snapshot.hasEvidence ? (
        <div className="p-6 sm:p-8">
          <div className="mx-auto max-w-2xl text-center">
            <BarChart3 className="mx-auto h-10 w-10 text-primary" />
            <h3 className="mt-3 text-xl font-bold text-foreground">{t("Bắt đầu tạo hồ sơ readiness", "Start building your readiness profile")}</h3>
            <p className="mt-2 text-base leading-7 text-muted-foreground">
              {t("Hoàn thành bài nền tảng, làm quiz và luyện Communication Lab. Biểu đồ sẽ cập nhật từ kết quả thật của bạn.", "Complete core lessons, quizzes and Communication Labs. The chart will update from your real results.")}
            </p>
            <Button className="mt-5 gap-2" onClick={() => onFocus("core")}><Target className="h-4 w-4" />{t("Bắt đầu bài nền tảng", "Start a core lesson")}</Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:p-6">
          <div>
            <div className="h-72 sm:h-80" aria-label={t("Biểu đồ radar mức độ sẵn sàng", "Readiness radar chart")}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData} outerRadius="70%">
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} tickLine={false} />
                  <Radar dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.28} strokeWidth={2} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "6px" }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="border-l-4 border-secondary bg-secondary/10 p-4">
              <p className="flex items-center gap-2 font-bold text-foreground"><TrendingUp className="h-4 w-4 text-secondary-foreground" />{t("Nên tập trung tiếp theo", "Focus next")}</p>
              <p className="mt-1 text-base text-foreground">{vi ? snapshot.weakest.labelVi : snapshot.weakest.labelEn} · {snapshot.weakest.value}/100</p>
              <Button variant="outline" className="mt-3 gap-2" onClick={() => onFocus(focusSection)}><Target className="h-4 w-4" />{focusSection === "core" ? t("Mở bài nền tảng", "Open core lessons") : t("Mở Communication Lab", "Open Communication Lab")}</Button>
            </div>
          </div>

          <div className="space-y-3">
            {snapshot.axes.map((axis) => (
              <div key={axis.id} className="rounded-md border border-border bg-background p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold text-foreground">{vi ? axis.labelVi : axis.labelEn}</h3>
                  <span className="font-bold text-primary">{axis.value}/100</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${axis.value}%` }} /></div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {t(`Core ${axis.coreCompleted}/${axis.coreTotal} · Quiz ${axis.quizRecorded}/${axis.coreTotal} · Cụm từ ${axis.phrasePractised}/${axis.phraseTotal} · Lab ${axis.labCompleted}/${axis.labTotal}`, `Core ${axis.coreCompleted}/${axis.coreTotal} · Quizzes ${axis.quizRecorded}/${axis.coreTotal} · Phrases ${axis.phrasePractised}/${axis.phraseTotal} · Labs ${axis.labCompleted}/${axis.labTotal}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-start gap-2 border-t border-border bg-muted/40 px-5 py-4 text-sm leading-6 text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p>
          {t("Chỉ báo này dựa trên bài đã hoàn thành (45%), điểm quiz tốt nhất (25%), cụm từ đã luyện (10%) và Communication Lab (20%). Đây không phải chứng chỉ trình độ chính thức.", "This indicator uses completed lessons (45%), best quiz scores (25%), practised phrases (10%) and Communication Labs (20%). It is not an official proficiency certificate.")}
          {snapshot.hasLegacyScoreGap && ` ${t("Một số bài cũ chưa có điểm chi tiết; làm lại quiz sẽ tăng độ tin cậy.", "Some earlier lessons have no detailed score; retake their quizzes to improve confidence.")}`}
        </p>
      </div>
    </section>
  );
};

export default PurposeEnglishReadiness;