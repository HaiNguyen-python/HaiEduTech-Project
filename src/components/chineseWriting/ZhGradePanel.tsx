import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

export interface ZhGradeResult {
  overall: number;
  scores?: { task?: number; vocab?: number; grammar?: number; coherence?: number; hanzi?: number };
  improvements?: string[]; issues?: string[];
  corrected?: string; correctedPinyin?: string; upgraded?: string; tipVi?: string;
}

const LABELS: [keyof NonNullable<ZhGradeResult["scores"]>, string, string][] = [
  ["task", "Yêu cầu", "Task"], ["vocab", "Từ vựng", "Vocabulary"], ["grammar", "Ngữ pháp", "Grammar"],
  ["coherence", "Mạch lạc", "Coherence"], ["hanzi", "Chữ Hán", "Hanzi"],
];

export default function ZhGradePanel({ result, nextHint = true }: { result: ZhGradeResult; nextHint?: boolean }) {
  const { t } = useLanguage();
  return (
    <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-3">
      <span className="text-3xl font-bold text-primary">{result.overall}/10</span>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
        {LABELS.map(([k, vi, en]) => (
          <div key={k} className="rounded-md bg-background p-2"><span className="text-muted-foreground">{t(vi, en)}</span> <strong>{result.scores?.[k] ?? "-"}</strong></div>
        ))}
      </div>
      {!!result.improvements?.length && <ul className="text-sm list-disc pl-5 text-foreground">{result.improvements.map((x, i) => <li key={i}>{x}</li>)}</ul>}
      {!!result.issues?.length && <ul className="text-sm list-disc pl-5 text-destructive">{result.issues.map((x, i) => <li key={i}>{x}</li>)}</ul>}
      {result.corrected && (
        <div className="text-sm"><strong>{t("Bản sửa:", "Corrected:")}</strong> <span className="text-base">{result.corrected}</span>
          {result.correctedPinyin && <p className="text-muted-foreground">{result.correctedPinyin}</p>}</div>
      )}
      {result.upgraded && <p className="text-sm"><Badge className="mr-2">{t("Nâng cấp", "Upgrade")}</Badge><span className="text-base">{result.upgraded}</span></p>}
      {result.tipVi && <p className="text-sm text-muted-foreground">{result.tipVi}</p>}
      {nextHint && <p className="text-xs text-muted-foreground">{t("Nhấn Enter để sang câu ngẫu nhiên tiếp.", "Press Enter for the next random item.")}</p>}
    </div>
  );
}
