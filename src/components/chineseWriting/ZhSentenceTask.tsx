import { useEffect, useRef, useState } from "react";
import { Loader2, Shuffle, RotateCcw, ArrowRight, Eye, CheckCircle2, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { handleAiError } from "@/lib/aiResponseHandler";
import { pickRandomIndex, markPracticed } from "@/lib/randomPicker";
import ZhGradePanel, { type ZhGradeResult } from "./ZhGradePanel";
import { gradeZh, type ZhMode } from "./gradeZh";

export interface ZhTaskItem {
  id: string; level: string;
  heading: string; pinyin?: string; meaning: string;
  instructionVi: string; instructionEn: string;
  target: string; reference?: string;
  model?: string; modelPinyin?: string; modelVi?: string;
}

const speak = (text: string) => {
  try { const u = new SpeechSynthesisUtterance(text); u.lang = "zh-CN"; u.rate = 0.85; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch { /* ignore */ }
};

export default function ZhSentenceTask({ items, mode, poolKey }: { items: ZhTaskItem[]; mode: ZhMode; poolKey: string }) {
  const { t } = useLanguage();
  const [idx, setIdx] = useState(0);
  const [attempt, setAttempt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ZhGradeResult | null>(null);
  const [showModel, setShowModel] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  const ids = items.map((i) => i.id);
  const item = items[idx % Math.max(1, items.length)];

  const reset = () => { setAttempt(""); setResult(null); setShowModel(false); setTimeout(() => ref.current?.focus({ preventScroll: true }), 0); };
  useEffect(() => { setIdx(pickRandomIndex(poolKey, ids)); reset(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [poolKey, items.length]);

  const next = () => { if (item) markPracticed(poolKey, item.id); setIdx(pickRandomIndex(poolKey, ids, item?.id)); reset(); };

  async function check() {
    if (!item || attempt.trim().length < 2 || loading) return;
    setLoading(true);
    try {
      const r = await gradeZh({ mode, level: item.level, target: item.target, reference: item.reference, attempt: attempt.trim() }, item.id);
      if (r) setResult(r);
    } catch (e) { handleAiError(e, { context: t("chấm bài viết tiếng Trung", "Chinese writing grading") }); }
    finally { setLoading(false); }
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); result ? next() : check(); }
  };

  if (!item) return <p className="text-muted-foreground">{t("Chưa có mục nào cho bộ lọc này.", "No items for this filter.")}</p>;
  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <Badge variant="outline">HSK {item.level}</Badge>
          <span>{(idx % items.length) + 1}/{items.length}</span>
        </div>
        <div>
          <p className="text-xs uppercase font-bold text-muted-foreground mb-1">{t(item.instructionVi, item.instructionEn)}</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-semibold text-foreground">{item.heading}</p>
            <Button size="icon" variant="ghost" onClick={() => speak(item.heading)} aria-label="Listen"><Volume2 className="w-4 h-4" /></Button>
          </div>
          {item.pinyin && <p className="text-muted-foreground">{item.pinyin}</p>}
          <p className="text-sm text-muted-foreground mt-1">{item.meaning}</p>
        </div>
        <Textarea ref={ref} value={attempt} onChange={(e) => setAttempt(e.target.value)} onKeyDown={onKey} rows={3} lang="zh-CN"
          placeholder={t("Viết câu tiếng Trung của bạn... (Enter để chấm)", "Write your Chinese sentence... (Enter to check)")} />
        <div className="flex flex-wrap gap-2">
          <Button onClick={check} disabled={loading || attempt.trim().length < 2}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <CheckCircle2 className="w-4 h-4 mr-1" />}{t("Chấm", "Check")}
          </Button>
          {item.model && <Button variant="outline" onClick={() => setShowModel((s) => !s)}><Eye className="w-4 h-4 mr-1" />{t("Câu mẫu", "Model")}</Button>}
          <Button variant="outline" onClick={reset}><RotateCcw className="w-4 h-4 mr-1" />{t("Làm lại", "Retry")}</Button>
          <Button variant="outline" onClick={next}><Shuffle className="w-4 h-4 mr-1" />{t("Câu khác", "Random")}</Button>
          <Button variant="outline" onClick={next}>{t("Tiếp", "Next")}<ArrowRight className="w-4 h-4 ml-1" /></Button>
        </div>
        {showModel && item.model && (
          <div className="rounded-md bg-muted/40 p-3 text-sm">
            <p className="text-base font-medium">{item.model}</p>
            {item.modelPinyin && <p className="text-muted-foreground">{item.modelPinyin}</p>}
            {item.modelVi && <p className="text-muted-foreground">{item.modelVi}</p>}
          </div>
        )}
        {result && <ZhGradePanel result={result} />}
      </CardContent>
    </Card>
  );
}
