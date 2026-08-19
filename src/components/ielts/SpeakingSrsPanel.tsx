/**
 * @file SpeakingSrsPanel.tsx
 * @description "Cần luyện lại hôm nay" - spaced repetition review panel for
 *   IELTS Speaking. Shows the weak sentences / phrases collected from AI
 *   grading, lets the student listen to a model reading, say it again (Web
 *   Speech API accuracy check) and then move it up the 1 / 3 / 7 day ladder.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Volume2, Mic, Square, CheckCircle2, RotateCcw, Trash2, CalendarClock,
  Sparkles, Trophy, Loader2, Lightbulb, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import { playEnglishTts, stopEnglishTts } from "@/lib/englishTts";
import { SRS_INTERVAL_DAYS, normalizeSrsKey } from "@/lib/speakingSrsExtract";
import { useSpeakingSrs, type SpeakingSrsItem } from "@/hooks/useSpeakingSrs";

const TYPE_META: Record<string, { vi: string; en: string; cls: string }> = {
  pronunciation: { vi: "Phát âm", en: "Pronunciation", cls: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30" },
  fluency: { vi: "Độ trôi chảy", en: "Fluency", cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30" },
  grammar: { vi: "Ngữ pháp", en: "Grammar", cls: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30" },
  vocabulary: { vi: "Từ vựng", en: "Vocabulary", cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" },
};

const scoreMatch = (target: string, said: string): number => {
  const targetWords = normalizeSrsKey(target).split(" ").filter(Boolean);
  const saidWords = new Set(normalizeSrsKey(said).split(" ").filter(Boolean));
  if (!targetWords.length) return 0;
  const hit = targetWords.filter((w) => saidWords.has(w)).length;
  return Math.round((hit / targetWords.length) * 100);
};

interface RowProps {
  item: SpeakingSrsItem;
  onPromote: (item: SpeakingSrsItem) => void;
  onReset: (item: SpeakingSrsItem) => void;
  onRemove: (item: SpeakingSrsItem) => void;
}

const SrsRow: React.FC<RowProps> = ({ item, onPromote, onReset, onRemove }) => {
  const { t } = useLanguage();
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState<string>("");
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const recognitionRef = useRef<any>(null);
  const meta = TYPE_META[item.itemType] || TYPE_META.grammar;
  const practiceText = (item.target || item.content).trim();

  const listen = useCallback(async () => {
    setSpeaking(true);
    try {
      await playEnglishTts(practiceText, { speechRate: 0.92 });
    } catch {
      /* fallback handled inside the TTS helper */
    }
    setSpeaking(false);
  }, [practiceText]);

  const stopListening = useCallback(() => {
    try { recognitionRef.current?.stop(); } catch { /* ignore */ }
    recognitionRef.current = null;
    setListening(false);
  }, []);

  const startListening = useCallback(() => {
    const Ctor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Ctor) {
      setHeard(t("Trình duyệt chưa hỗ trợ nhận diện giọng nói.", "This browser does not support speech recognition."));
      return;
    }
    stopEnglishTts();
    const rec = new Ctor();
    rec.lang = "en-US";
    rec.continuous = false;
    rec.interimResults = true;
    let finalText = "";
    rec.onresult = (event: any) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) text += event.results[i][0].transcript + " ";
      finalText = text.trim();
      setHeard(finalText);
    };
    rec.onerror = () => { /* no-speech / aborted are ignored */ };
    rec.onend = () => {
      setListening(false);
      recognitionRef.current = null;
      if (finalText) setAccuracy(scoreMatch(practiceText, finalText));
    };
    recognitionRef.current = rec;
    setHeard("");
    setAccuracy(null);
    setListening(true);
    rec.start();
  }, [practiceText, t]);

  return (
    <div className="rounded-xl border bg-card p-3 sm:p-4 space-y-2.5">
      <div className="flex items-start justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className={`text-xs ${meta.cls}`}>
            {t(meta.vi, meta.en)}
          </Badge>
          {item.part ? <Badge variant="secondary" className="text-xs">Part {item.part}</Badge> : null}
          <Badge variant="outline" className="text-xs gap-1">
            <CalendarClock className="w-3 h-3" />
            {t("Bậc", "Step")} {item.stage + 1}/{SRS_INTERVAL_DAYS.length}
          </Badge>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onRemove(item)} aria-label={t("Xóa", "Remove")}>
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>

      <div className="space-y-1">
        <p className="text-base sm:text-lg font-semibold text-foreground">{item.content}</p>
        {item.target && item.target.trim() !== item.content.trim() && (
          <p className="text-sm text-emerald-600 dark:text-emerald-400 inline-flex items-start gap-1.5">
            <ArrowRight className="w-4 h-4 mt-0.5 shrink-0" />
            <span className="font-medium">{item.target}</span>
          </p>
        )}
        {item.tip && (
          <p className="text-sm text-muted-foreground inline-flex items-start gap-1.5">
            <Lightbulb className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />
            <span>{item.tip}</span>
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant="outline" onClick={listen} disabled={speaking}>
          {speaking ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Volume2 className="w-4 h-4 mr-1.5" />}
          {t("Nghe mẫu", "Listen")}
        </Button>
        {listening ? (
          <Button size="sm" variant="destructive" onClick={stopListening}>
            <Square className="w-4 h-4 mr-1.5" /> {t("Dừng", "Stop")}
          </Button>
        ) : (
          <Button size="sm" variant="secondary" onClick={startListening}>
            <Mic className="w-4 h-4 mr-1.5" /> {t("Nói lại", "Say it again")}
          </Button>
        )}
        <div className="ml-auto flex flex-wrap gap-2">
          <Button size="sm" onClick={() => onPromote(item)} className="bg-gradient-to-r from-primary to-emerald-500">
            <CheckCircle2 className="w-4 h-4 mr-1.5" /> {t("Đã ổn", "Got it")}
          </Button>
          <Button size="sm" variant="outline" onClick={() => onReset(item)}>
            <RotateCcw className="w-4 h-4 mr-1.5" /> {t("Cần luyện thêm", "Needs work")}
          </Button>
        </div>
      </div>

      {(heard || accuracy !== null) && (
        <div className="rounded-lg bg-muted/40 border p-2.5 text-sm space-y-1">
          {heard && (
            <p>
              <span className="font-semibold">{t("Máy nghe được: ", "Heard: ")}</span>
              <span className="text-foreground/80">{heard}</span>
            </p>
          )}
          {accuracy !== null && (
            <p className={accuracy >= 80 ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-amber-600 dark:text-amber-400 font-semibold"}>
              {t("Độ chính xác", "Accuracy")}: {accuracy}%
              {accuracy >= 80
                ? t(" - rất tốt, bấm \"Đã ổn\" nhé!", " - great, tap \"Got it\"!")
                : t(" - nghe mẫu và thử lại 1 lần nữa.", " - listen again and retry.")}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const SpeakingSrsPanel: React.FC = () => {
  const { t } = useLanguage();
  const { due, upcoming, mastered, loading, promote, resetItem, removeItem } = useSpeakingSrs();

  const formatDue = (iso: string) => {
    const days = Math.max(0, Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000));
    return days <= 1 ? t("mai", "tomorrow") : t(`sau ${days} ngày`, `in ${days} days`);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: t("Cần luyện hôm nay", "Due today"), value: due.length, cls: "from-primary/10 to-emerald-500/10" },
          { label: t("Sắp tới", "Upcoming"), value: upcoming.length, cls: "from-sky-500/10 to-primary/10" },
          { label: t("Đã thuần thục", "Mastered"), value: mastered.length, cls: "from-emerald-500/10 to-amber-500/10" },
        ].map((s) => (
          <Card key={s.label} className={`bg-gradient-to-br ${s.cls}`}>
            <CardContent className="pt-4 pb-3 text-center">
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            {t("Cần luyện lại hôm nay", "Review today")}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {t(
              "Những câu và cụm từ bạn phát âm sai hoặc chưa trôi chảy được tự động gom vào đây theo chu kỳ 1 ngày - 3 ngày - 7 ngày.",
              "Sentences and phrases you mispronounced or delivered without fluency are collected here on a 1-day, 3-day, 7-day cycle."
            )}
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground text-sm py-6 justify-center">
              <Loader2 className="w-4 h-4 animate-spin" /> {t("Đang tải...", "Loading...")}
            </div>
          ) : due.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <Trophy className="w-10 h-10 mx-auto text-emerald-500" />
              <p className="font-semibold text-foreground">
                {t("Hôm nay không có gì phải luyện lại!", "Nothing to review today!")}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("Làm thêm 1 câu Part 2 để hệ thống thu thập điểm cần cải thiện nhé.", "Answer one more Part 2 question so the system can collect new weak points.")}
              </p>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              {due.map((item) => (
                <SrsRow key={item.id} item={item} onPromote={promote} onReset={resetItem} onRemove={removeItem} />
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>

      {(upcoming.length > 0 || mastered.length > 0) && (
        <Accordion type="multiple" className="space-y-3">
          {upcoming.length > 0 && (
            <AccordionItem value="upcoming" className="border rounded-xl px-4">
              <AccordionTrigger className="text-base font-semibold">
                {t("Lịch ôn sắp tới", "Upcoming reviews")} ({upcoming.length})
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pb-4">
                {upcoming.map((it) => (
                  <div key={it.id} className="flex items-center justify-between gap-3 text-sm border-b last:border-0 pb-2">
                    <span className="font-medium text-foreground">{it.content}</span>
                    <Badge variant="secondary" className="text-xs shrink-0">{formatDue(it.dueAt)}</Badge>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}
          {mastered.length > 0 && (
            <AccordionItem value="mastered" className="border rounded-xl px-4">
              <AccordionTrigger className="text-base font-semibold">
                {t("Đã thuần thục", "Mastered")} ({mastered.length})
              </AccordionTrigger>
              <AccordionContent className="flex flex-wrap gap-2 pb-4">
                {mastered.map((it) => (
                  <Badge key={it.id} variant="outline" className="text-xs">{it.content}</Badge>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      )}
    </div>
  );
};

export default SpeakingSrsPanel;
