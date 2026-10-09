import { useChineseTypingInput } from "@/hooks/useChineseTypingInput";
import { AutoSpeakToggle, useAutoSpeak, useAutoSpeakPref } from "@/components/typing/AutoSpeak";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { pickRandomIndex, markPracticed } from "@/lib/randomPicker";
import { playChineseTts, stopChineseTts } from "@/lib/chineseTts";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import type { ZhSentence } from "@/data/chineseWritingBank";
import { activePinyinIndex, letterDisplayCharacters, liveChineseTyping, normalizeLetterTyping } from "@/lib/chineseLetterTyping";

export default function ZhTypingTask({ items, poolKey }: { items: ZhSentence[]; poolKey: string }) {
  const { t } = useLanguage();
  const [idx, setIdx] = useState(0);
  const input = useChineseTypingInput();
  const [showPinyin, setShowPinyin] = useState(true);
  const [start, setStart] = useState<number | null>(null);
  const [done, setDone] = useState<{ acc: number; cpm: number } | null>(null);
  const ref = useRef<HTMLTextAreaElement>(null);
  const ids = items.map((i) => i.id);
  const item = items[idx % Math.max(1, items.length)];

  const reset = () => { input.reset(); setStart(null); setDone(null); setTimeout(() => ref.current?.focus({ preventScroll: true }), 0); };
  useEffect(() => { setIdx(pickRandomIndex(poolKey, ids)); reset(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [poolKey, items.length]);
  const next = () => { if (item) markPracticed(poolKey, item.id); setIdx(pickRandomIndex(poolKey, ids, item?.id)); reset(); };

  const speak = useAutoSpeakPref();
  useAutoSpeak(speak.on, item?.id, item?.zh, (x) => playChineseTts(x), stopChineseTts);
  if (!item) return null;
  const target = normalizeLetterTyping(item.zh);
  const got = liveChineseTyping(input.committed);
  const activeIndex = activePinyinIndex(item.zh, input.typed, input.draft);

  function finish() {
    if (input.isComposing || !got.length) return;
    const scored = normalizeLetterTyping(input.committed);
    let ok = 0;
    for (let i = 0; i < target.length; i++) if (scored[i] === target[i]) ok++;
    const acc = Math.round((ok / target.length) * 100);
    const mins = Math.max(0.05, ((Date.now() - (start ?? Date.now())) / 60000));
    const cpm = Math.round(scored.length / mins);
    setDone({ acc, cpm });
    logStudentActivity({ activityType: "chinese_writing_typing", activityId: item.id, score: acc, maxScore: 100, domain: "chinese", metadata: { cpm } });
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (input.isImeKey(e)) return;
    if (e.key === "Enter") { e.preventDefault(); done ? next() : finish(); }
  };

  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <Badge variant="outline">HSK {item.level}</Badge><span className="flex items-center gap-2"><AutoSpeakToggle on={speak.on} toggle={speak.toggle} onReplay={() => playChineseTts(item.zh)} />{(idx % items.length) + 1}/{items.length}</span>
        </div>
        <div>
          <p className="text-2xl" lang="zh-CN" data-testid="zh-typing-passage">
            {letterDisplayCharacters(item.zh).map(({ character, typingIndex }, i) => (
              <span key={i} className={typingIndex !== null && typingIndex === activeIndex ? "text-primary underline" : typingIndex !== null && typingIndex < got.length ? (got[typingIndex] === character ? "text-primary" : "text-destructive underline") : "text-foreground"}>{character}</span>
            ))}
          </p>
          <Button variant="ghost" size="sm" className="my-1 gap-2" aria-expanded={showPinyin} aria-controls="zh-typing-pinyin" onClick={() => setShowPinyin((visible) => !visible)}>
            {showPinyin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showPinyin ? t("Ẩn Pinyin", "Hide Pinyin") : t("Hiện Pinyin", "Show Pinyin")}
          </Button>
          <p id="zh-typing-pinyin" className="text-muted-foreground" hidden={!showPinyin}>{item.pinyin}</p>
          <p className="text-sm text-muted-foreground">{item.vi}</p>
        </div>
        <Textarea ref={ref} value={input.typed} readOnly={!!done} rows={2} lang="zh-CN" onKeyDown={onKey}
          onCompositionStart={input.onCompositionStart} onCompositionUpdate={input.onCompositionUpdate} onCompositionEnd={input.onCompositionEnd}
          onPaste={(e) => e.preventDefault()}
          onChange={(e) => { if (start === null) setStart(Date.now()); input.onChange(e); }}
          placeholder={t("Gõ pinyin bằng bộ gõ tiếng Trung để ra chữ Hán... (Enter để chấm)", "Type with a Chinese pinyin IME... (Enter to check)")} />
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={() => (done ? next() : finish())} disabled={input.isComposing || !got.length}>{done ? t("Tiếp", "Next") : t("Chấm", "Check")}<ArrowRight className="w-4 h-4 ml-1" /></Button>
          {done && <span className="ml-auto text-sm"><strong>{done.acc}%</strong> {t("chính xác", "accuracy")} · <strong>{done.cpm}</strong> {t("chữ/phút", "chars/min")}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
