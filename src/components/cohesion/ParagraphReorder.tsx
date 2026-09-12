/**
 * ParagraphReorder - Sắp xếp các câu bị xáo trộn thành đoạn văn mạch lạc.
 * Dùng nút Up/Down thay vì drag-and-drop để tránh phụ thuộc dnd-kit.
 */
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp, ArrowDown, CheckCircle2, RotateCcw, Shuffle,
  Sparkles, BookmarkPlus, BookmarkCheck, Loader2, Eye, Download,
} from "lucide-react";
import { openWritingPdf } from "@/lib/writingPdfExport";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { REORDER_PARAGRAPHS, ReorderParagraph } from "@/data/ieltsCohesionBank";
import { appendCohesionNotebook, escapeCohesionHtml } from "./cohesionNotebook";
import { recordPracticeSignal } from "@/lib/writingPracticeSignals";

interface Props {
  taskType: 1 | 2;
}

// Fisher-Yates shuffle (returns indices)
const shuffleIndices = (n: number): number[] => {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Ensure at least one item is out of place
  if (arr.every((v, i) => v === i) && n > 1) {
    [arr[0], arr[1]] = [arr[1], arr[0]];
  }
  return arr;
};

const REFERENCE_MARKERS = [
  "this", "these", "those", "such", "the former", "the latter",
  "however", "moreover", "furthermore", "therefore", "consequently",
  "in addition", "as a result", "for instance", "for example",
  "in conclusion", "to sum up", "overall", "meanwhile", "afterwards",
  "subsequently", "likewise", "similarly", "by contrast", "on the other hand",
  "which", "doing so", "given this", "given that", "following this",
];

const highlightMarkers = (sentence: string) => {
  const parts: (string | { marker: string })[] = [];
  const lower = sentence.toLowerCase();
  let cursor = 0;

  // greedy scan
  while (cursor < sentence.length) {
    let matched: { marker: string; start: number } | null = null;
    for (const m of REFERENCE_MARKERS) {
      const idx = lower.indexOf(m, cursor);
      if (idx !== -1 && (matched === null || idx < matched.start)) {
        // word boundary check
        const before = idx === 0 || /[^a-z]/i.test(sentence[idx - 1]);
        const after = idx + m.length >= sentence.length || /[^a-z]/i.test(sentence[idx + m.length]);
        if (before && after) matched = { marker: m, start: idx };
      }
    }
    if (!matched) {
      parts.push(sentence.slice(cursor));
      break;
    }
    if (matched.start > cursor) parts.push(sentence.slice(cursor, matched.start));
    parts.push({ marker: sentence.slice(matched.start, matched.start + matched.marker.length) });
    cursor = matched.start + matched.marker.length;
  }

  return parts.map((p, i) =>
    typeof p === "string" ? (
      <span key={i}>{p}</span>
    ) : (
      <mark key={i} className="bg-primary/20 text-primary px-1 rounded font-semibold">
        {p.marker}
      </mark>
    )
  );
};

const ParagraphReorder = ({ taskType }: Props) => {
  const { t } = useLanguage();
  const pool = useMemo(
    () => REORDER_PARAGRAPHS.filter((p) => p.taskType === taskType),
    [taskType]
  );
  const [idx, setIdx] = useState(0);
  const [order, setOrder] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const current: ReorderParagraph | undefined = pool[idx];

  const reshuffle = () => {
    if (!current) return;
    setOrder(shuffleIndices(current.sentences.length));
    setChecked(false);
    setSaved(false);
  };

  useEffect(() => {
    reshuffle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, taskType]);

  if (!current) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          {t("Chưa có đoạn văn cho task này.", "No paragraphs for this task yet.")}
        </CardContent>
      </Card>
    );
  }

  const moveUp = (i: number) => {
    if (i === 0) return;
    const next = [...order];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    setOrder(next);
    setChecked(false);
  };
  const moveDown = (i: number) => {
    if (i === order.length - 1) return;
    const next = [...order];
    [next[i], next[i + 1]] = [next[i + 1], next[i]];
    setOrder(next);
    setChecked(false);
  };

  const isCorrect = order.length > 0 && order.every((v, i) => v === i);
  const correctCount = order.filter((v, i) => v === i).length;

  const goNext = () => {
    const nextIdx = (idx + 1) % pool.length;
    const nextItem = pool[nextIdx];
    if (nextItem) setOrder(shuffleIndices(nextItem.sentences.length));
    setChecked(false);
    setSaved(false);
    setIdx(nextIdx);
  };

  const handleCheck = () => {
    setChecked(true);
    if (order.length > 0) {
      recordPracticeSignal({
        crit: "CC",
        score10: (correctCount / order.length) * 10,
        taskType,
      });
    }
    if (isCorrect) toast.success(t("Chính xác! ✨", "Perfect order! ✨"));
    else toast.error(t(`Chưa đúng - ${correctCount}/${order.length} câu đúng vị trí`, `Not quite - ${correctCount}/${order.length} in place`));
  };

  const handleSave = async () => {
    if (saved || saving) return;
    setSaving(true);
    const ts = new Date().toLocaleString();
    const orderedSentences = order.map((oIdx) => current.sentences[oIdx]);
    const block =
      `<p><strong>🧩 Paragraph Reorder: ${escapeCohesionHtml(current.topic)}</strong> <em>(${ts})</em> - ${isCorrect ? "✅ Correct" : `${correctCount}/${order.length}`}</p>` +
      `<p><strong>My order:</strong></p><ol>${orderedSentences.map((s) => `<li>${escapeCohesionHtml(s)}</li>`).join("")}</ol>` +
      `<p><strong>Correct order:</strong></p><ol>${current.sentences.map((s) => `<li>${escapeCohesionHtml(s)}</li>`).join("")}</ol>` +
      `<p><strong>Why:</strong> ${escapeCohesionHtml(current.explanation)}</p>`;
    const ok = await appendCohesionNotebook(block, taskType, {
      success: (m) => toast.success(t("Đã lưu vào Sổ tay ghi chú", m)),
      error: (m) => toast.error(m),
      info: (m) => toast.message(t("Đăng nhập để lưu vào sổ tay", m)),
    });
    if (ok) setSaved(true);
    setSaving(false);
  };

  const typeLabel: Record<ReorderParagraph["type"], string> = {
    introduction: t("Mở bài", "Introduction"),
    body: t("Thân bài", "Body"),
    conclusion: t("Kết bài", "Conclusion"),
    overview: t("Overview", "Overview"),
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              {t("Sắp xếp lại các câu để tạo đoạn văn mạch lạc", "Reorder the sentences into a cohesive paragraph")}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{idx + 1} / {pool.length}</Badge>
              <Badge variant="outline">{typeLabel[current.type]}</Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground pt-1">{current.topic}</p>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            <span>{t("Thứ tự của bạn", "Your order")}</span>
            <span className="text-xs font-normal text-muted-foreground">
              {t("Bấm mũi tên để đổi vị trí", "Use arrows to reorder")}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {order.map((sentenceIdx, i) => {
            const sentence = current.sentences[sentenceIdx];
            // Guard: order can be briefly stale after switching to a paragraph
            // with fewer sentences (before the reshuffle effect runs).
            if (typeof sentence !== "string") return null;
            const correctHere = checked && sentenceIdx === i;
            const wrongHere = checked && sentenceIdx !== i;
            return (
              <div
                key={`${sentenceIdx}-${i}`}
                className={`flex items-start gap-2 p-3 rounded-lg border transition-colors ${
                  correctHere
                    ? "border-emerald-500/50 bg-emerald-500/10"
                    : wrongHere
                      ? "border-red-500/40 bg-red-500/5"
                      : "border-border bg-background hover:bg-muted/40"
                }`}
              >
                <div className="flex flex-col gap-1 shrink-0">
                  <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => moveUp(i)} disabled={i === 0}>
                    <ArrowUp className="w-3.5 h-3.5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => moveDown(i)} disabled={i === order.length - 1}>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <Badge variant="outline" className="mt-1 shrink-0 font-mono text-xs">{i + 1}</Badge>
                <p className="text-[15px] leading-relaxed text-foreground flex-1">
                  {highlightMarkers(sentence)}
                </p>
              </div>
            );
          })}

          <div className="flex gap-2 flex-wrap pt-3">
            <Button onClick={handleCheck}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              {t("Kiểm tra", "Check Order")}
            </Button>
            <Button variant="outline" onClick={reshuffle}>
              <Shuffle className="w-4 h-4 mr-2" />
              {t("Xáo lại", "Reshuffle")}
            </Button>
            <Button variant="outline" onClick={goNext}>
              <RotateCcw className="w-4 h-4 mr-2" />
              {t("Đoạn khác", "Next Paragraph")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {checked && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Card className={`border-2 ${isCorrect ? "border-emerald-500/40" : "border-amber-500/40"}`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between flex-wrap gap-2">
                  <span className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-primary" />
                    {t("Giải thích thứ tự mạch lạc", "Why this order works")}
                  </span>
                  <span className={`text-2xl font-bold ${isCorrect ? "text-emerald-500" : "text-amber-500"}`}>
                    {correctCount}/{order.length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-end flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={handleExportPdf}>
                    <Download className="w-4 h-4 mr-1.5" />{t("Tải PDF", "Download PDF")}
                  </Button>
                  <Button
                    size="sm"
                    variant={saved ? "outline" : "default"}
                    onClick={handleSave}
                    disabled={saved || saving}
                  >
                    {saving ? (
                      <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" />{t("Đang lưu...", "Saving...")}</>
                    ) : saved ? (
                      <><BookmarkCheck className="w-4 h-4 mr-1.5 text-emerald-600" />{t("Đã lưu vào Sổ tay", "Saved to Notebook")}</>
                    ) : (
                      <><BookmarkPlus className="w-4 h-4 mr-1.5" />{t("Lưu vào Sổ tay", "Save to Notebook")}</>
                    )}
                  </Button>
                </div>

                <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-2">
                    {t("Thứ tự chuẩn Band 8+:", "Correct Band 8+ order:")}
                  </p>
                  <ol className="space-y-1.5 pl-5 list-decimal">
                    {current.sentences.map((s, i) => (
                      <li key={i} className="text-[15px] leading-relaxed text-foreground">
                        {highlightMarkers(s)}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="p-3 bg-primary/10 rounded-lg border border-primary/30">
                  <p className="text-sm text-foreground leading-relaxed">{current.explanation}</p>
                </div>

                <p className="text-xs text-muted-foreground">
                  {t("Các từ được tô sáng là cohesive devices - chúng là dấu hiệu giúp xác định trình tự.", "Highlighted words are cohesive devices - they signal the logical order.")}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ParagraphReorder;
