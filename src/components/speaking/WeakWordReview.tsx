import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Brain, CheckCircle, Clock3, Ear, Mic, PartyPopper, Rabbit, RotateCcw, Square, Volume2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { speakingCoachLanguages } from "@/data/speakingCoachData";
import { useSpeechRecognizer } from "@/hooks/useSpeechRecognizer";
import { CLEAN_STREAK, dueWeakWords, loadWeakWords, normalizeWord, reviewWeakWord, type WeakWord } from "@/lib/speakingWeakWords";
import { compareSentence, micErrorMessage, playSpeakingTts, stopSpeakingTts, type SpeakingLang } from "@/lib/speakingModeShared";
import { sortWeakWords, sourceLabel, type WeakWordFilter } from "@/lib/weakWordCoach";

interface Props { language: SpeakingLang; onChange?: () => void; }
const WAVEFORM = [3, 6, 4, 8, 5, 10, 7, 4, 9, 6, 11, 5, 8, 4, 7, 3, 6, 9];
const FILTERS: WeakWordFilter[] = ["due", "missed", "sentence", "shadow", "drill", "freetalk"];

const WeakWordReview = ({ language, onChange }: Props) => {
  const { t } = useLanguage();
  const config = speakingCoachLanguages[language];
  const reduceMotion = useReducedMotion();
  const [allDue, setAllDue] = useState<WeakWord[]>(() => dueWeakWords(loadWeakWords(language)));
  const [filter, setFilter] = useState<WeakWordFilter>("due");
  const queue = useMemo(() => sortWeakWords(allDue, filter), [allDue, filter]);
  const [index, setIndex] = useState(0);
  const [verdict, setVerdict] = useState<"correct" | "wrong" | null>(null);
  const [heard, setHeard] = useState("");
  const [cleared, setCleared] = useState(0);
  const [reviewed, setReviewed] = useState(0);
  const [displayClean, setDisplayClean] = useState<number | null>(null);
  const [listened, setListened] = useState(false);
  const audioBusyRef = useRef(false);
  const [audioBusy, setAudioBusy] = useState(false);
  const card = queue[index];

  const handleFinal = useCallback((transcript: string) => {
    if (!card) return;
    setHeard(transcript);
    const ok = compareSentence(card.word, transcript, language).accuracy >= 75;
    setVerdict(ok ? "correct" : "wrong");
    const updated = reviewWeakWord(language, card.word, ok);
    setDisplayClean(updated[normalizeWord(card.word)]?.clean ?? (ok ? CLEAN_STREAK : 0));
    if (ok && card.clean + 1 >= CLEAN_STREAK) setCleared((count) => count + 1);
    onChange?.();
  }, [card, language, onChange]);
  const rec = useSpeechRecognizer({ speechLang: config.speechLang, maxSeconds: 12, onFinal: handleFinal });

  useEffect(() => { setAllDue(dueWeakWords(loadWeakWords(language))); setIndex(0); setVerdict(null); setHeard(""); setDisplayClean(null); setCleared(0); setReviewed(0); setListened(false); }, [language]);
  // The recognizer object is intentionally excluded: it changes after each render.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setIndex(0); setVerdict(null); setHeard(""); setDisplayClean(null); rec.reset(); }, [filter]);
  useEffect(() => () => stopSpeakingTts(language), [language]);

  const playWord = async (rate: number) => {
    if (!card || audioBusyRef.current) return;
    audioBusyRef.current = true; setAudioBusy(true); setListened(true);
    try { await playSpeakingTts(language, card.word, rate); }
    finally { audioBusyRef.current = false; setAudioBusy(false); }
  };
  const resetAttempt = () => { setVerdict(null); setHeard(""); setDisplayClean(null); rec.reset(); };
  const next = () => { setReviewed((count) => count + 1); resetAttempt(); setListened(false); setIndex((value) => value + 1); };
  const refresh = () => { setAllDue(dueWeakWords(loadWeakWords(language))); setIndex(0); setVerdict(null); setHeard(""); setDisplayClean(null); setReviewed(0); setListened(false); rec.reset(); };

  if (!allDue.length) return <Card className="speaking-studio border-primary/20"><CardContent className="space-y-2 py-10 text-center"><PartyPopper className="mx-auto h-8 w-8 text-primary" /><div className="font-medium">{t("Không còn từ nào cần ôn!", "No words to review!")}</div><p className="text-sm text-muted-foreground">{t("Hãy luyện Câu mẫu, Shadowing, Sound Lab hoặc Free Talk. Từ phát âm chưa ổn sẽ tự xuất hiện tại đây.", "Practise Sentences, Shadowing, Sound Lab or Free Talk. Words needing work will appear here automatically.")}</p></CardContent></Card>;

  if (index >= queue.length || !card) return <Card className="speaking-studio border-primary/20"><CardHeader><CardTitle className="text-base">{t("Xong phiên ôn tập", "Review session complete")}</CardTitle></CardHeader><CardContent className="space-y-4"><div className="grid gap-3 sm:grid-cols-3"><div className="rounded-md bg-primary/10 p-4"><div className="text-3xl font-bold text-primary">{reviewed}</div><div className="text-sm text-muted-foreground">{t("Từ đã ôn", "Reviewed")}</div></div><div className="speaking-feedback-success rounded-md border p-4"><div className="text-3xl font-bold">{cleared}</div><div className="text-sm">{t("Đã làm chủ", "Mastered")}</div></div><div className="rounded-md bg-accent/15 p-4"><div className="text-3xl font-bold">{Math.max(0, allDue.length - cleared)}</div><div className="text-sm text-muted-foreground">{t("Cần tiếp tục", "Keep practising")}</div></div></div><Button onClick={refresh} className="gap-2"><RotateCcw className="h-4 w-4" />{t("Ôn tiếp", "Review again")}</Button></CardContent></Card>;

  const errorText = micErrorMessage(rec.error, t);
  const visibleClean = displayClean ?? card.clean;
  const progress = Math.round((visibleClean / CLEAN_STREAK) * 100);
  const currentStep = verdict ? 4 : rec.isRecording ? 3 : listened ? 2 : 1;
  const source = sourceLabel(card.source);

  return <Card className="speaking-studio speaking-studio-shell overflow-hidden border-primary/20 bg-card/90 shadow-xl backdrop-blur-xl">
    <CardHeader className="border-b border-border/70 pb-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><CardTitle className="flex items-center gap-2 text-lg sm:text-xl"><span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground"><Brain className="h-5 w-5" /></span>{t("Huấn luyện từ yếu", "Weak Words coach")}</CardTitle><p className="mt-2 text-sm text-muted-foreground">{t("Đọc đúng 3 lần liên tiếp để làm chủ một từ.", "Say a word correctly 3 times in a row to master it.")}</p></div><div className="flex gap-2"><Badge className="bg-primary/10 text-primary hover:bg-primary/10">{index + 1}/{queue.length}</Badge><Badge variant="outline">{t(source.vi, source.en)}</Badge></div></div><Progress value={((index + 1) / queue.length) * 100} className="mt-4 h-2" /></CardHeader>
    <CardContent className="space-y-5 p-4 sm:p-6">
      <div className="flex gap-2 overflow-x-auto pb-1" aria-label={t("Lọc từ cần ôn", "Filter review words")}>{FILTERS.map((value) => { const label = value === "due" ? t("Đến hạn", "Due") : value === "missed" ? t("Sai nhiều", "Most missed") : t(sourceLabel(value).vi, sourceLabel(value).en); return <Button key={value} size="sm" variant={filter === value ? "default" : "outline"} onClick={() => setFilter(value)} className="shrink-0">{label}</Button>; })}</div>
      <div className="grid gap-2 sm:grid-cols-4">{[t("1. Nghe", "1. Listen"), t("2. Quan sát", "2. Notice"), t("3. Nói", "3. Speak"), t("4. Củng cố", "4. Reinforce")].map((label, i) => <div key={label} className={`flex min-h-11 items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold ${currentStep === i + 1 ? "border-primary bg-primary/10 text-primary" : currentStep > i + 1 ? "border-primary/30 bg-primary/5" : "bg-muted/40 text-muted-foreground"}`}>{currentStep > i + 1 ? <CheckCircle className="h-4 w-4 text-primary" /> : i + 1}{label.replace(/^\d+\.\s*/, "")}</div>)}</div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.75fr)]">
        <section className="rounded-md border border-primary/20 bg-background/80 p-5 text-center sm:p-7"><Badge variant="secondary">{t(source.vi, source.en)}</Badge><div className="mt-4 break-words text-3xl font-bold sm:text-4xl">{card.word}</div>{card.ipa && <div className="mt-2 break-words font-mono text-base text-primary">{card.ipa}</div>}<div className="mt-5 flex flex-wrap justify-center gap-2"><Button variant="outline" disabled={audioBusy || rec.isRecording} onClick={() => void playWord(0.85)} className="gap-2"><Volume2 className="h-4 w-4" />{t("Nghe mẫu", "Listen")}</Button><Button variant="outline" disabled={audioBusy || rec.isRecording} onClick={() => void playWord(0.65)} className="gap-2"><Rabbit className="h-4 w-4" />{t("Nghe chậm", "Slow")}</Button></div></section>
        <aside className="rounded-md border border-accent/40 bg-accent/10 p-4"><div className="flex items-center gap-2 font-semibold"><span className="grid h-9 w-9 place-items-center rounded-md bg-accent text-accent-foreground"><Ear className="h-5 w-5" /></span>{t("Mục tiêu hôm nay", "Today's target")}</div><div className="mt-5"><div className="flex items-center justify-between text-sm"><span>{t("Chuỗi đọc đúng", "Clean streak")}</span><strong>{visibleClean}/{CLEAN_STREAK}</strong></div><Progress value={progress} className="mt-2 h-2" /></div><div className="mt-4 grid grid-cols-2 gap-2 text-sm"><div className="rounded-md bg-background/80 p-3"><span className="text-muted-foreground">{t("Số lần sai", "Misses")}</span><div className="text-xl font-bold">{card.misses}</div></div><div className="rounded-md bg-background/80 p-3"><span className="text-muted-foreground">{t("Ngày ôn", "Due")}</span><div className="mt-1 flex items-center gap-1 font-semibold"><Clock3 className="h-4 w-4" />{card.dueOn.slice(5)}</div></div></div></aside>
      </div>
      <div className="rounded-md border border-border/70 bg-background/70 p-4"><div className={`speaking-waveform ${rec.isRecording ? "is-recording" : audioBusy ? "is-playing" : ""}`} aria-hidden="true">{WAVEFORM.map((height, i) => <motion.span key={`${height}-${i}`} className="speaking-waveform-bar" style={{ height: `${height * 2.6}px` }} animate={(rec.isRecording || audioBusy) && !reduceMotion ? { scaleY: [0.5, 1, 0.65] } : { scaleY: 0.55 }} transition={{ duration: 0.65, repeat: (rec.isRecording || audioBusy) && !reduceMotion ? Infinity : 0, delay: i * 0.04 }} />)}</div><div className="mt-3 flex flex-wrap justify-center gap-2">{rec.isRecording ? <Button variant="destructive" onClick={rec.stop} className="h-11 gap-2"><Square className="h-4 w-4" />{t("Dừng", "Stop")} {rec.seconds}s</Button> : <Button onClick={rec.start} disabled={verdict !== null || audioBusy} className="h-11 gap-2"><Mic className="h-4 w-4" />{t("Đọc từ này", "Say this word")}</Button>}{verdict === "wrong" && <Button variant="outline" onClick={resetAttempt} className="h-11 gap-2"><RotateCcw className="h-4 w-4" />{t("Thử lại", "Try again")}</Button>}{verdict !== null && <Button onClick={next} className="h-11">{t("Từ tiếp", "Next word")}</Button>}</div></div>
      {errorText && <div role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{errorText}</div>}
      {verdict && <motion.div initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`rounded-md border p-4 text-sm ${verdict === "correct" ? "speaking-feedback-success" : "speaking-feedback-error"}`} aria-live="polite"><div className="flex items-center gap-2 font-semibold">{verdict === "correct" ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}{verdict === "correct" ? t("Tốt lắm! Chuỗi đúng đã tăng.", "Well done! Your clean streak increased.") : t("Chưa khớp. Nghe chậm rồi thử lại ngay.", "Not quite. Listen slowly and try again now.")}</div><div className="mt-3 grid gap-2 sm:grid-cols-2"><div className="rounded-md bg-background/70 p-2"><span className="text-xs text-muted-foreground">{t("Từ mục tiêu", "Target")}</span><div className="font-semibold">{card.word}</div></div><div className="rounded-md bg-background/70 p-2"><span className="text-xs text-muted-foreground">{t("Hệ thống nghe được", "Heard as")}</span><div className="font-semibold italic">{heard || t("Chưa xác định", "Not identified")}</div></div></div></motion.div>}
    </CardContent>
  </Card>;
};
export default WeakWordReview;
