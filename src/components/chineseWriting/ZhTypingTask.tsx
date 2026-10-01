import { useEffect, useRef, useState } from "react";
import { Shuffle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { pickRandomIndex, markPracticed } from "@/lib/randomPicker";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import type { ZhSentence } from "@/data/chineseWritingBank";

const strip = (s: string) => s.replace(/[\s，。！？、；：,.!?;:"“”（）()…]/g, "");

export default function ZhTypingTask({ items, poolKey }: { items: ZhSentence[]; poolKey: string }) {
  const { t } = useLanguage();
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [start, setStart] = useState<number | null>(null);
  const [done, setDone] = useState<{ acc: number; cpm: number } | null>(null);
  const ref = useRef<HTMLTextAreaElement>(null);
  const ids = items.map((i) => i.id);
  const item = items[idx % Math.max(1, items.length)];

  const reset = () => { setTyped(""); setStart(null); setDone(null); setTimeout(() => ref.current?.focus({ preventScroll: true }), 0); };
  useEffect(() => { setIdx(pickRandomIndex(poolKey, ids)); reset(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [poolKey, items.length]);
  const next = () => { if (item) markPracticed(poolKey, item.id); setIdx(pickRandomIndex(poolKey, ids, item?.id)); reset(); };

  if (!item) return null;
  const target = strip(item.zh);
  const got = strip(typed);

  function finish() {
    let ok = 0;
    for (let i = 0; i < target.length; i++) if (got[i] === target[i]) ok++;
    const acc = Math.round((ok / target.length) * 100);
    const mins = Math.max(0.05, ((Date.now() - (start ?? Date.now())) / 60000));
    const cpm = Math.round(got.length / mins);
    setDone({ acc, cpm });
    logStudentActivity({ activityType: "chinese_writing_typing", activityId: item.id, score: acc, maxScore: 100, domain: "chinese", metadata: { cpm } });
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") { e.preventDefault(); done ? next() : finish(); }
  };

  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <Badge variant="outline">HSK {item.level}</Badge><span>{(idx % items.length) + 1}/{items.length}</span>
        </div>
        <div>
          <p className="text-2xl tracking-wide">
            {Array.from(target).map((ch, i) => (
              <span key={i} className={i < got.length ? (got[i] === ch ? "text-primary" : "text-destructive underline") : "text-foreground"}>{ch}</span>
            ))}
          </p>
          <p className="text-muted-foreground">{item.pinyin}</p>
          <p className="text-sm text-muted-foreground">{item.vi}</p>
        </div>
        <Textarea ref={ref} value={typed} readOnly={!!done} rows={2} lang="zh-CN" onKeyDown={onKey}
          onPaste={(e) => e.preventDefault()}
          onChange={(e) => { if (start === null) setStart(Date.now()); setTyped(e.target.value); }}
          placeholder={t("Gõ pinyin bằng bộ gõ tiếng Trung để ra chữ Hán... (Enter để chấm)", "Type with a Chinese pinyin IME... (Enter to check)")} />
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={() => (done ? next() : finish())} disabled={!got.length}>{done ? t("Tiếp", "Next") : t("Chấm", "Check")}<ArrowRight className="w-4 h-4 ml-1" /></Button>
          <Button variant="outline" onClick={next}><Shuffle className="w-4 h-4 mr-1" />{t("Câu khác", "Random")}</Button>
          {done && <span className="ml-auto text-sm"><strong>{done.acc}%</strong> {t("chính xác", "accuracy")} · <strong>{done.cpm}</strong> {t("chữ/phút", "chars/min")}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
