import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { handleAiError } from "@/lib/aiResponseHandler";
import { pickRandomIndex, markPracticed } from "@/lib/randomPicker";
import type { ZhEssay, ZhLevel } from "@/data/chineseWritingBank";
import ZhGradePanel, { type ZhGradeResult } from "./ZhGradePanel";
import { gradeZh } from "./gradeZh";

const countHanzi = (s: string) => (s.match(/[\u4e00-\u9fff]/g) || []).length;

export default function ZhEssayTask({ essays, level }: { essays: ZhEssay[]; level: ZhLevel }) {
  const { t } = useLanguage();
  const [own, setOwn] = useState(false);
  const [ownPrompt, setOwnPrompt] = useState("");
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ZhGradeResult | null>(null);
  const key = `zh-essay-${level}`;
  const ids = essays.map((e) => e.id);
  const essay = essays[idx % Math.max(1, essays.length)];
  useEffect(() => { setIdx(pickRandomIndex(key, ids)); setText(""); setResult(null); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [key, essays.length]);

  const next = () => { if (essay) markPracticed(key, essay.id); setIdx(pickRandomIndex(key, ids, essay?.id)); setText(""); setResult(null); };
  const chars = countHanzi(text);
  const prompt = own ? ownPrompt.trim() : essay ? `${essay.zh} (${essay.vi}) ${essay.min}-${essay.max} 字` : "";

  async function grade() {
    if (!prompt || chars < 10 || loading) return;
    setLoading(true);
    try { const r = await gradeZh({ mode: "essay", level, target: prompt, attempt: text.trim() }, own ? "own" : essay.id); if (r) setResult(r); }
    catch (e) { handleAiError(e, { context: t("chấm bài viết tiếng Trung", "Chinese essay grading") }); }
    finally { setLoading(false); }
  }

  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        <div className="flex gap-2">
          <Button size="sm" variant={!own ? "default" : "outline"} onClick={() => setOwn(false)}>{t("Đề có sẵn", "Built-in topics")}</Button>
          <Button size="sm" variant={own ? "default" : "outline"} onClick={() => setOwn(true)}>{t("Tự nhập đề", "Your own topics")}</Button>
        </div>
        {own ? (
          <Input value={ownPrompt} onChange={(e) => setOwnPrompt(e.target.value)} placeholder={t("Dán đề bài (tiếng Trung hoặc tiếng Việt)", "Paste your prompt (Chinese or Vietnamese)")} />
        ) : essay ? (
          <div>
            <div className="flex items-center gap-2"><Badge variant="outline">HSK {essay.level}</Badge><span className="text-sm text-muted-foreground">{essay.min}-{essay.max} {t("chữ", "characters")}</span></div>
            <p className="text-2xl font-semibold mt-2">{essay.zh}</p>
            <p className="text-sm text-muted-foreground">{essay.vi}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">{essay.hints.map((h) => <Badge key={h} variant="secondary">{h}</Badge>)}</div>
          </div>
        ) : null}
        <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} lang="zh-CN" placeholder={t("Viết bài bằng tiếng Trung...", "Write your Chinese composition...")} />
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={grade} disabled={loading || chars < 10 || !prompt}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <CheckCircle2 className="w-4 h-4 mr-1" />}{t("Chấm bài", "Grade")}
          </Button>
          {!own && <Button variant="outline" onClick={next}><Shuffle className="w-4 h-4 mr-1" />{t("Đề khác", "Another topic")}</Button>}
          <span className="ml-auto text-sm text-muted-foreground">{chars} {t("chữ Hán", "Hanzi")}</span>
        </div>
        {result && <ZhGradePanel result={result} nextHint={false} />}
      </CardContent>
    </Card>
  );
}
