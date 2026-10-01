import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2, Shuffle, RotateCcw, ArrowRight, Eye, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { consumeAiGrade } from "@/lib/aiQuota";
import { handleAiError } from "@/lib/aiResponseHandler";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import { PARAPHRASE_BANK, PARA_TOPICS, type ParaLevel } from "@/data/ieltsParaphraseBank";

interface Result {
  overall: number; meaning: number; level: number; grammar: number; naturalness: number;
  reachedLevel?: string; improvements?: string[]; issues?: string[]; corrected?: string; tipVi?: string;
}
const STORE = "ielts-paraphrase-progress";
type Progress = { done: number; total: number };
const loadProg = (): Record<string, Progress> => { try { return JSON.parse(localStorage.getItem(STORE) || "{}"); } catch { return {}; } };

export default function ParaphrasePractice({ taskType }: { taskType: 1 | 2 }) {
  const { t } = useLanguage();
  const [topic, setTopic] = useState("all");
  const [level, setLevel] = useState<ParaLevel>("B2");
  const [idx, setIdx] = useState(0);
  const [attempt, setAttempt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [showModels, setShowModels] = useState(false);
  const [prog, setProg] = useState(loadProg);
  const ref = useRef<HTMLTextAreaElement>(null);

  const items = useMemo(() => PARAPHRASE_BANK.filter((i) => i.task === taskType && (topic === "all" || i.topic === topic)), [taskType, topic]);
  const item = items[idx % Math.max(1, items.length)];
  useEffect(() => { setTopic("all"); }, [taskType]);
  useEffect(() => { reset(); setIdx(0); }, [taskType, topic]);

  function reset() { setAttempt(""); setResult(null); setShowModels(false); setTimeout(() => ref.current?.focus({ preventScroll: true }), 0); }
  const next = () => { setIdx((i) => (i + 1) % items.length); reset(); };
  const random = () => { setIdx((cur) => { if (items.length < 2) return cur; let n = cur; while (n === cur % items.length) n = Math.floor(Math.random() * items.length); return n; }); reset(); };

  async function check() {
    if (!item || attempt.trim().length < 3 || loading) return;
    if (!consumeAiGrade()) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("grade-paraphrase", { body: { source: item.source, attempt, level, taskType } });
      if (error || !data || typeof data.overall !== "number") throw error || new Error(data?.error || "Grading failed");
      setResult(data);
      const k = `t${taskType}`;
      const p = { ...prog, [k]: { done: (prog[k]?.done || 0) + 1, total: (prog[k]?.total || 0) + data.overall } };
      setProg(p); localStorage.setItem(STORE, JSON.stringify(p));
      logStudentActivity({ activityType: "ielts_paraphrase", activityId: item.id, score: data.overall, maxScore: 10, metadata: { level, task: taskType } });
    } catch (e) {
      handleAiError(e, { context: t("chấm paraphrase", "paraphrase grading") });
    } finally { setLoading(false); }
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); result ? next() : check(); }
  };

  const p = prog[`t${taskType}`];
  if (!item) return null;
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {[{ key: "all", en: "All", vi: "Tất cả" }, ...PARA_TOPICS[taskType]].map((tp) => (
          <Button key={tp.key} size="sm" variant={topic === tp.key ? "default" : "outline"} onClick={() => setTopic(tp.key)}>{t(tp.vi, tp.en)}</Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="text-muted-foreground">{t("Cấp độ mục tiêu:", "Target level:")}</span>
        {(["B2", "C1", "C2"] as const).map((l) => (
          <Button key={l} size="sm" variant={level === l ? "default" : "outline"} onClick={() => setLevel(l)}>{l}</Button>
        ))}
        <span className="ml-auto text-muted-foreground">
          {(idx % items.length) + 1}/{items.length}
          {p?.done ? ` · ${t("Đã làm", "Done")} ${p.done} · ${t("TB", "Avg")} ${(p.total / p.done).toFixed(1)}/10` : ""}
        </span>
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <div>
            <p className="text-xs uppercase font-bold text-muted-foreground mb-1">{t("Câu gốc (A2-B1)", "Original sentence (A2-B1)")}</p>
            <p className="text-lg md:text-xl font-semibold text-foreground">{item.source}</p>
            <p className="text-sm text-muted-foreground mt-1">{item.vi}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {item.techniques.map((x) => <Badge key={x} variant="secondary">{x}</Badge>)}
            </div>
          </div>
          <Textarea ref={ref} value={attempt} onChange={(e) => setAttempt(e.target.value)} onKeyDown={onKey} rows={3}
            placeholder={t(`Viết lại câu ở cấp ${level}... (Enter để chấm)`, `Rewrite at ${level} level... (Enter to check)`)} />
          <div className="flex flex-wrap gap-2">
            <Button onClick={check} disabled={loading || attempt.trim().length < 3}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <CheckCircle2 className="w-4 h-4 mr-1" />}{t("Chấm", "Check")}
            </Button>
            <Button variant="outline" onClick={() => setShowModels((s) => !s)}><Eye className="w-4 h-4 mr-1" />{t("Câu mẫu", "Model answers")}</Button>
            <Button variant="outline" onClick={reset}><RotateCcw className="w-4 h-4 mr-1" />{t("Làm lại", "Retry")}</Button>
            <Button variant="outline" onClick={random}><Shuffle className="w-4 h-4 mr-1" />{t("Ngẫu nhiên", "Random")}</Button>
            <Button variant="outline" onClick={next}>{t("Tiếp", "Next")}<ArrowRight className="w-4 h-4 ml-1" /></Button>
          </div>

          {result && (
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-3">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">{result.overall}/10</span>
                {result.reachedLevel && <Badge>{t("Đạt", "Reached")} {result.reachedLevel}</Badge>}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                {([["meaning", "Meaning"], ["level", "Level"], ["grammar", "Grammar"], ["naturalness", "Naturalness"]] as const).map(([k, l]) => (
                  <div key={k} className="rounded-md bg-background p-2"><span className="text-muted-foreground">{l}</span> <strong>{result[k]}</strong></div>
                ))}
              </div>
              {!!result.improvements?.length && <ul className="text-sm list-disc pl-5 text-foreground">{result.improvements.map((x, i) => <li key={i}>{x}</li>)}</ul>}
              {!!result.issues?.length && <ul className="text-sm list-disc pl-5 text-destructive">{result.issues.map((x, i) => <li key={i}>{x}</li>)}</ul>}
              {result.corrected && <p className="text-sm"><strong>{t("Bản sửa:", "Corrected:")}</strong> {result.corrected}</p>}
              {result.tipVi && <p className="text-sm text-muted-foreground">{result.tipVi}</p>}
              <p className="text-xs text-muted-foreground">{t("Nhấn Enter để sang câu tiếp.", "Press Enter for the next sentence.")}</p>
            </div>
          )}

          {showModels && (
            <div className="space-y-2">
              {(["B2", "C1", "C2"] as const).map((l) => (
                <p key={l} className={`text-sm rounded-md p-2 ${l === level ? "bg-accent/40 font-medium" : "bg-muted/40"}`}><Badge variant="outline" className="mr-2">{l}</Badge>{item.models[l]}</p>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
