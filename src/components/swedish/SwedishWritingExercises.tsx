import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { SWEDISH_WRITING_SENTENCES, SWEDISH_WRITING_SKILLS, scoreSwedishTyping, shuffledSwedishIndices } from "@/data/swedishWritingPractice";
import type { SwedishLevel } from "@/data/swedishWritingPrompts";
import { playSwedishTts, stopSwedishTts } from "@/lib/swedishTts";
import { logStudentActivity } from "@/hooks/useActivityLogger";

export type SwedishWritingMode = "vocabulary" | "grammar" | "connectors" | "translation" | "paraphrase" | "typing";
export default function SwedishWritingExercises({ mode }: { mode: SwedishWritingMode }) {
  const { t, lang } = useLanguage();
  const [level, setLevel] = useState<SwedishLevel>("A2");
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [checked, setChecked] = useState<{ accuracy: number; wpm: number } | null>(null);
  const [start, setStart] = useState<number | null>(null);
  const [best, setBest] = useState(() => Number(localStorage.getItem("sv-writing-typing-best") || 0));
  const isSkill = mode === "vocabulary" || mode === "grammar" || mode === "connectors";
  const skills = isSkill ? SWEDISH_WRITING_SKILLS[mode] : [];
  const sentences = useMemo(() => SWEDISH_WRITING_SENTENCES.filter(s => s.level === level), [level]);
  const length = isSkill ? skills.length : sentences.length;
  const [order, setOrder] = useState(() => shuffledSwedishIndices(length));
  const [position, setPosition] = useState(0);
  useEffect(() => { setOrder(shuffledSwedishIndices(length)); setPosition(0); setAnswer(""); setRevealed(false); setChecked(null); setStart(null); stopSwedishTts(); }, [length, level, mode]);
  useEffect(() => () => stopSwedishTts(), []);
  const index = order[position] ?? 0;
  const skill = skills[index];
  const sentence = sentences[index];
  const next = () => {
    stopSwedishTts();
    if (position + 1 === length) { setOrder(shuffledSwedishIndices(length)); setPosition(0); }
    else setPosition(p => p + 1);
    setAnswer(""); setRevealed(false); setChecked(null); setStart(null);
  };
  const checkTyping = () => {
    if (!answer.trim() || checked || !sentence) return;
    const accuracy = scoreSwedishTyping(answer, sentence.sv);
    const minutes = Math.max((Date.now() - (start ?? Date.now())) / 60000, 1 / 60);
    const wpm = Math.round(Array.from(sentence.sv).length * accuracy / 100 / 5 / minutes);
    setChecked({ accuracy, wpm });
    if (accuracy >= 80 && wpm > best) { setBest(wpm); localStorage.setItem("sv-writing-typing-best", String(wpm)); }
    void logStudentActivity({ activityType: "swedish_writing_typing", activityId: sentence.id, score: accuracy, maxScore: 100, metadata: { subject: "swedish", level, wpm } });
  };
  const titles = { vocabulary: t("Từ vựng", "Vocabulary"), grammar: t("Ngữ pháp", "Grammar"), connectors: t("Liên kết", "Connectors"), translation: t("Dịch sang tiếng Thụy Điển", "Translate into Swedish"), paraphrase: t("Viết lại câu, giữ nguyên nghĩa", "Rewrite without changing the meaning"), typing: t("Gõ lại chính xác câu tiếng Thụy Điển", "Type the Swedish sentence exactly") };
  if (!sentence || (isSkill && !skill)) return null;
  return <Card className="border-primary/20"><CardHeader><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><Badge variant="outline">{position + 1} / {length}</Badge>{!isSkill && <Select value={level} onValueChange={v => setLevel(v as SwedishLevel)}><SelectTrigger aria-label="Writing level" className="w-28"><SelectValue /></SelectTrigger><SelectContent>{["A1", "A2", "B1"].map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select>}</div><Button variant="outline" onClick={next}>{t("Tiếp theo", "Next")}<ChevronRight className="ml-2 h-4 w-4" /></Button></div><CardTitle className="pt-3 text-xl">{titles[mode]}</CardTitle></CardHeader><CardContent className="space-y-4">
    {isSkill && skill ? <><h3 className="text-xl font-semibold">{skill.term}</h3><p className="text-base text-muted-foreground">{lang === "vi" ? skill.vi : skill.en}</p><div className="space-y-2 rounded-lg bg-muted/50 p-4"><p lang="sv" className="text-lg font-semibold">{skill.exampleSv}</p><p lang="en" className="text-base text-muted-foreground">{skill.exampleEn}</p></div></> : <div className="space-y-2 rounded-lg bg-muted/50 p-4"><p lang={mode === "translation" ? "en" : "sv"} className="text-lg leading-relaxed">{mode === "translation" ? sentence.en : sentence.sv}</p>{mode !== "translation" && <p lang="en" className="text-base text-muted-foreground">{sentence.en}</p>}</div>}
    {mode !== "translation" && <Button variant="ghost" onClick={() => void playSwedishTts(isSkill && skill ? skill.exampleSv : sentence.sv)}><Volume2 className="mr-2 h-4 w-4" />{t("Nghe", "Listen")}</Button>}
    <Textarea aria-label="Swedish practice answer" lang="sv" className="min-h-32 text-base" value={answer} readOnly={mode === "typing" && !!checked} onChange={e => { if (start === null) setStart(Date.now()); setAnswer(e.target.value); }} onKeyDown={e => { if (mode !== "typing" || e.key !== "Enter" || e.shiftKey || e.nativeEvent.isComposing) return; e.preventDefault(); if (checked) next(); else checkTyping(); }} placeholder="Skriv här..." />
    <div className="flex flex-wrap gap-2">{mode === "typing" ? <Button onClick={checkTyping} disabled={!answer.trim() || !!checked}>{t("Kiểm tra", "Check")}</Button> : !isSkill && <Button variant="secondary" onClick={() => setRevealed(v => !v)}>{revealed ? t("Ẩn đáp án", "Hide answer") : t("Xem gợi ý", "Show reference")}</Button>}</div>
    {checked && <div className="grid grid-cols-3 gap-2 text-center"><div className="rounded-lg bg-muted p-3"><strong>{checked.accuracy}%</strong><p className="text-sm text-muted-foreground">{t("Chính xác", "Accuracy")}</p></div><div className="rounded-lg bg-muted p-3"><strong>{checked.wpm}</strong><p className="text-sm text-muted-foreground">WPM</p></div><div className="rounded-lg bg-muted p-3"><strong>{best}</strong><p className="text-sm text-muted-foreground">{t("Kỷ lục WPM", "Best WPM")}</p></div></div>}
    {revealed && <div className="rounded-lg border border-primary/20 bg-primary/5 p-4"><p lang="sv" className="text-lg font-semibold">{mode === "paraphrase" ? sentence.alternativeSv : sentence.sv}</p><p lang="en" className="mt-2 text-base text-muted-foreground">{sentence.en}</p><p className="mt-2 text-sm text-muted-foreground">{t("Bản tham khảo; các cách diễn đạt đúng khác vẫn có thể được chấp nhận.", "Reference only; other correct formulations are possible.")}</p></div>}
  </CardContent></Card>;
}
