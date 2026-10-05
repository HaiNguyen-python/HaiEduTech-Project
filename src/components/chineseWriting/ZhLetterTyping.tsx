import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Volume2, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { pickRandomIndex, markPracticed } from "@/lib/randomPicker";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { playChineseTts } from "@/lib/chineseTts";
import HanziStrokeOrder from "@/components/HanziStrokeOrder";
import { loadLetters, type ZhLetter } from "@/data/chineseLetters";
import type { ZhLevel } from "@/data/chineseWritingBank";

const strip = (s: string) => s.replace(/[\s，。！？、；：,.!?;:"“”‘’（）()…—\-·《》]/g, "");
const PROGRESS_KEY = "zh-letters-progress";
type Progress = { done: string[]; bestCpm: number; words: string[] };
const readProgress = (): Progress => {
  try { return { done: [], bestCpm: 0, words: [], ...JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}") }; } catch { return { done: [], bestCpm: 0, words: [] }; }
};
const shuffle = <T,>(xs: T[]) => [...xs].sort(() => Math.random() - 0.5);

type Quiz = { q: string; options: string[]; answer: string };
function buildQuiz(letter: ZhLetter, all: ZhLetter[]): Quiz[] {
  const pool = all.flatMap((l) => l.words).filter((w) => !letter.words.some((x) => x.w === w.w));
  const ws = shuffle(letter.words).slice(0, 3);
  return ws.map((w, i) => {
    const others = shuffle(pool).slice(0, 3);
    if (i === 0) return { q: letter.zh.replace(w.w, "____"), options: shuffle([w.w, ...others.map((o) => o.w)]), answer: w.w };
    if (i === 1) return { q: `${w.w} = ?`, options: shuffle([w.vi, ...others.map((o) => o.vi)]), answer: w.vi };
    return { q: `${w.w} (pinyin)`, options: shuffle([w.py, ...others.map((o) => o.py)]), answer: w.py };
  });
}

export default function ZhLetterTyping({ level }: { level: ZhLevel }) {
  const { t } = useLanguage();
  const [all, setAll] = useState<ZhLetter[] | null>(null);
  const [vol, setVol] = useState<"all" | 1 | 2>("all");
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [start, setStart] = useState<number | null>(null);
  const [done, setDone] = useState<{ acc: number; cpm: number } | null>(null);
  const [showPy, setShowPy] = useState(true);
  const [stroke, setStroke] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [progress, setProgress] = useState<Progress>(readProgress);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { loadLetters().then(setAll); }, []);
  const items = useMemo(() => (all ?? []).filter((l) => l.level === level && (vol === "all" || l.vol === vol)), [all, level, vol]);
  const poolKey = `zhw-letters-${level}-${vol}`;
  const ids = items.map((i) => i.id);
  const item = items[idx % Math.max(1, items.length)];
  const quiz = useMemo(() => (item && all ? buildQuiz(item, all) : []), [item, all]);

  const reset = () => { setTyped(""); setStart(null); setDone(null); setAnswers({}); setStroke(null); setTimeout(() => ref.current?.focus({ preventScroll: true }), 0); };
  useEffect(() => { if (items.length) setIdx(pickRandomIndex(poolKey, ids)); reset(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [poolKey, items.length]);
  const next = () => { if (item) markPracticed(poolKey, item.id); setIdx(pickRandomIndex(poolKey, ids, item?.id)); reset(); };

  if (!all) return <Card><CardContent className="p-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></CardContent></Card>;
  if (!item) return <Card><CardContent className="p-6 text-muted-foreground">{t("Chưa có lá thư ở cấp độ này.", "No letters at this level yet.")}</CardContent></Card>;

  const target = strip(item.zh);
  const got = strip(typed);

  function finish() {
    let ok = 0;
    for (let i = 0; i < target.length; i++) if (got[i] === target[i]) ok++;
    const acc = Math.round((ok / target.length) * 100);
    const mins = Math.max(0.05, (Date.now() - (start ?? Date.now())) / 60000);
    const cpm = Math.round(got.length / mins);
    setDone({ acc, cpm });
    const p = { ...progress, done: Array.from(new Set([...progress.done, item.id])), bestCpm: Math.max(progress.bestCpm, acc >= 80 ? cpm : 0) };
    setProgress(p); localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
    logStudentActivity({ activityType: "zh_writing_letters", activityId: item.id, score: acc, maxScore: 100, domain: "chinese", metadata: { cpm } });
  }
  const answer = (qi: number, opt: string) => {
    if (answers[qi]) return;
    setAnswers((a) => ({ ...a, [qi]: opt }));
    if (opt === quiz[qi].answer && qi === 0) {
      const p = { ...progress, words: Array.from(new Set([...progress.words, quiz[qi].answer])) };
      setProgress(p); localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
    }
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") { e.preventDefault(); if (done) next(); else if (got.length) finish(); }
  };

  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {(["all", 1, 2] as const).map((v) => (
            <Button key={v} size="sm" variant={vol === v ? "secondary" : "ghost"} onClick={() => setVol(v)}>{v === "all" ? t("Cả 2 tập", "Both volumes") : t(`Tập ${v}`, `Volume ${v}`)}</Button>
          ))}
          <span className="ml-auto text-muted-foreground">
            {t("Đã gõ", "Typed")} <strong>{progress.done.length}</strong>/{all.length} · {t("Kỷ lục", "Best")} <strong>{progress.bestCpm}</strong> {t("chữ/phút", "chars/min")}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">HSK {item.level}</Badge>
          <Badge variant="secondary">{t(`Tập ${item.vol}`, `Vol. ${item.vol}`)} · {/^\d+$/.test(item.label) ? t(`Thư ${item.label}`, `Letter ${item.label}`) : item.label}</Badge>
          <div className="ml-auto flex gap-1">
            <Button size="sm" variant="ghost" onClick={() => playChineseTts(item.zh)}><Volume2 className="w-4 h-4" /></Button>
            <Button size="sm" variant="ghost" onClick={() => setShowPy((s) => !s)}>{showPy ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}<span className="ml-1">Pinyin</span></Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-2xl leading-relaxed tracking-wide">
            {Array.from(target).map((ch, i) => (
              <span key={i} className={i < got.length ? (got[i] === ch ? "text-primary" : "text-destructive underline") : i === got.length ? "text-foreground border-b-2 border-primary" : "text-foreground"}>{ch}</span>
            ))}
          </p>
          {showPy && <p className="text-muted-foreground">{item.pinyin}</p>}
          <p className="text-sm text-foreground/80">{item.vi}</p>
        </div>

        <Textarea ref={ref} value={typed} readOnly={!!done} rows={3} lang="zh-CN" onKeyDown={onKey}
          onPaste={(e) => e.preventDefault()}
          onChange={(e) => { if (start === null) setStart(Date.now()); setTyped(e.target.value); }}
          placeholder={t("Gõ lại lá thư bằng bộ gõ Pinyin... (Enter để chấm)", "Retype the letter with a Pinyin IME... (Enter to check)")} />
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={() => (done ? next() : finish())} disabled={!got.length && !done}>{done ? t("Tiếp", "Next") : t("Chấm", "Check")}<ArrowRight className="w-4 h-4 ml-1" /></Button>
          {done && <span className="ml-auto text-sm"><strong>{done.acc}%</strong> {t("chính xác", "accuracy")} · <strong>{done.cpm}</strong> {t("chữ/phút", "chars/min")}</span>}
        </div>

        {item.words.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-semibold">{t("Từ vựng & Hán tự", "Vocabulary & Hanzi")}</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {item.words.map((w) => (
                <div key={w.w} className="rounded-lg border p-2 text-sm">
                  <div className="flex items-center gap-2">
                    {Array.from(w.w).map((c) => (
                      <button key={c} className="text-xl font-semibold hover:text-primary" onClick={() => setStroke(stroke === c ? null : c)}>{c}</button>
                    ))}
                    <span className="text-muted-foreground">{w.py}</span>
                    <Badge variant="outline" className="ml-auto">HSK {w.lv >= 7 ? "7-9" : w.lv}</Badge>
                  </div>
                  <p className="text-foreground/80">{w.vi}</p>
                </div>
              ))}
            </div>
            {stroke && <div className="flex justify-center"><HanziStrokeOrder character={stroke} size={140} /></div>}
          </div>
        )}

        {done && quiz.length > 0 && (
          <div className="space-y-3 border-t pt-3">
            <p className="text-sm font-semibold">{t("Ôn nhanh", "Quick review")}</p>
            {quiz.map((q, qi) => (
              <div key={qi} className="space-y-1">
                <p className="text-sm">{q.q}</p>
                <div className="flex flex-wrap gap-2">
                  {q.options.map((o) => {
                    const picked = answers[qi];
                    const v = !picked ? "outline" : o === q.answer ? "default" : picked === o ? "destructive" : "outline";
                    return <Button key={o} size="sm" variant={v} onClick={() => answer(qi, o)}>{o}</Button>;
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-muted-foreground">{t("Nguồn: \"999 lá thư gửi cho chính mình\" - Miêu Công Tử. Chỉ dùng cho học tập nội bộ.", "Source: \"999 Letters to Myself\" by Miao Gongzi. For internal study use only.")}</p>
      </CardContent>
    </Card>
  );
}
