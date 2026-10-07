import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Clock3, NotebookPen, Pause, Play, RotateCcw, Sparkles, Volume2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClickableFinnishText from "@/components/ClickableFinnishText";
import { useLanguage } from "@/contexts/LanguageContext";
import { playFinnishTts } from "@/lib/finnishTts";
import { YKI_B1_SPEAKING_EXAM_SETS, YKI_B1_SPEAKING_PARTS, type YkiSpeakingPart } from "@/data/ykiB1SpeakingExamSets";

const PART_STYLES: Record<YkiSpeakingPart, string> = {
  narration: "border-sky-500/30 bg-sky-500/10 text-sky-800 dark:text-sky-200",
  dialogue: "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200",
  situations: "border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-200",
  opinion: "border-rose-500/30 bg-rose-500/10 text-rose-800 dark:text-rose-200",
};

export default function YkiB1SpeakingExamPractice() {
  const { t } = useLanguage();
  const [setIndex, setSetIndex] = useState(0);
  const [part, setPart] = useState<YkiSpeakingPart>("narration");
  const [showModel, setShowModel] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(90);
  const [running, setRunning] = useState(false);

  const activeSet = YKI_B1_SPEAKING_EXAM_SETS[setIndex];
  const active = useMemo(() => activeSet.sections.find((item) => item.part === part) ?? activeSet.sections[0], [activeSet, part]);
  const partMeta = YKI_B1_SPEAKING_PARTS.find((item) => item.value === active.part) ?? YKI_B1_SPEAKING_PARTS[0];

  useEffect(() => {
    setSecondsLeft(active.timeSeconds);
    setRunning(false);
    setShowModel(false);
  }, [active.id, active.timeSeconds]);

  useEffect(() => {
    if (!running || secondsLeft <= 0) return;
    const timer = window.setInterval(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [running, secondsLeft]);

  const next = () => {
    const partIndex = YKI_B1_SPEAKING_PARTS.findIndex((item) => item.value === part);
    if (partIndex < YKI_B1_SPEAKING_PARTS.length - 1) {
      setPart(YKI_B1_SPEAKING_PARTS[partIndex + 1].value);
      return;
    }
    setSetIndex((value) => (value + 1) % YKI_B1_SPEAKING_EXAM_SETS.length);
    setPart("narration");
  };

  return (
    <section className="space-y-4" aria-labelledby="uploaded-yki-speaking-heading">
      <Card className="border-primary/25 bg-primary/5">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Badge className="mb-2">9 YKI sets · 36 sections</Badge>
              <CardTitle id="uploaded-yki-speaking-heading" className="flex items-center gap-2 text-xl">
                <Sparkles className="h-5 w-5 text-primary" />
                {t("Đề luyện nói YKI B1 từ tài liệu", "YKI B1 speaking exam practice")}
              </CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">{t("Mỗi bộ có Kertominen, Keskustelu, Tilanteita và Mielipide, kèm câu trả lời mẫu.", "Each set includes Narration, Dialogue, Situations and Opinion with model answers.")}</p>
            </div>
            <Button size="sm" variant="outline" onClick={next}>{t("Phần tiếp theo", "Next section")}<ChevronRight className="ml-1 h-4 w-4" /></Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {YKI_B1_SPEAKING_EXAM_SETS.map((set, index) => (
              <Button key={set.id} size="sm" variant={setIndex === index ? "default" : "outline"} onClick={() => setSetIndex(index)} className="shrink-0">
                {t("Bộ", "Set")} {index + 1}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {YKI_B1_SPEAKING_PARTS.map((item) => (
              <Button key={item.value} variant={part === item.value ? "default" : "outline"} onClick={() => setPart(item.value)} className="h-auto whitespace-normal py-2">
                {item.fi}<span className="ml-1 hidden text-xs opacity-75 sm:inline">· {item.en}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-2">
              <Badge variant="outline" className={PART_STYLES[active.part]}>{partMeta.fi} · {partMeta.en}</Badge>
              <CardTitle className="text-xl">{active.titleFi}</CardTitle>
              <div className="space-y-0.5 text-sm text-muted-foreground"><p>🇬🇧 {active.titleEn}</p><p>🇻🇳 {active.titleVi}</p></div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={secondsLeft === 0 ? "destructive" : "secondary"}><Clock3 className="mr-1 h-3.5 w-3.5" />{Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, "0")}</Badge>
              <Button size="icon" variant="outline" aria-label={running ? t("Tạm dừng", "Pause") : t("Bắt đầu", "Start")} onClick={() => setRunning((value) => !value)}>{running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}</Button>
              <Button size="icon" variant="ghost" aria-label={t("Đặt lại giờ", "Reset timer")} onClick={() => { setRunning(false); setSecondsLeft(active.timeSeconds); }}><RotateCcw className="h-4 w-4" /></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-lg bg-muted/60 p-4">
            <p className="font-semibold leading-relaxed" lang="fi">{active.promptFi}</p>
            <div className="mt-2 space-y-1 text-sm text-muted-foreground"><p>🇬🇧 {active.promptEn}</p><p>🇻🇳 {active.promptVi}</p></div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold">{t("Cụm gợi ý", "Suggested phrases")}</p>
            <div className="flex flex-wrap gap-2">
              {active.hintsFi.map((hint) => <Button key={hint} size="sm" variant="outline" className="h-auto whitespace-normal" onClick={() => void playFinnishTts(hint, { playbackRate: 0.85, speechRate: 0.85 })}><Volume2 className="mr-1 h-3.5 w-3.5" />{hint}</Button>)}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => setShowModel((value) => !value)}>{showModel ? t("Ẩn câu trả lời mẫu", "Hide model answer") : t("Xem câu trả lời mẫu", "Show model answer")}</Button>
            <Button variant="outline" onClick={() => void playFinnishTts(active.modelFi, { playbackRate: 0.85, speechRate: 0.85 })}><Volume2 className="mr-2 h-4 w-4" />{t("Nghe bài mẫu", "Play model")}</Button>
          </div>

          {showModel && (
            <div className="space-y-3 rounded-lg border border-emerald-500/25 bg-emerald-500/5 p-4">
              <div className="leading-relaxed" lang="fi"><ClickableFinnishText text={active.modelFi} /></div>
              <p className="border-t pt-3 text-sm text-muted-foreground">🇬🇧 {active.modelEn}</p>
              <p className="text-sm text-muted-foreground">🇻🇳 {active.modelVi}</p>
              <Button size="sm" variant="ghost" onClick={() => navigator.clipboard?.writeText(`${active.modelFi}\n\n${active.modelEn}\n\n${active.modelVi}`)}><NotebookPen className="mr-1 h-3.5 w-3.5" />{t("Sao chép để ghi chú", "Copy for notes")}</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}