/**
 * @file LessonBuilder.tsx
 * @description Structured lesson builder (objectives, vocabulary, dialogue, practice, quiz).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BLOCK_LABEL, newBlock, type ContentDraft, type LessonBlock, type LessonBlockType, type LessonBody,
} from "@/lib/contentStudio";

interface Props {
  draft: ContentDraft;
  onChange: (patch: Partial<ContentDraft>) => void;
}

const BLOCK_TYPES: LessonBlockType[] = [
  "objective", "vocabulary", "dialogue", "explanation", "practice", "quiz",
];

export default function LessonBuilder({ draft, onChange }: Props) {
  const { t, lang } = useLanguage();
  const blocks = ((draft.body as LessonBody)?.blocks ?? []) as LessonBlock[];

  const setBlocks = (next: LessonBlock[]) => onChange({ body: { blocks: next } });
  const patchBlock = (id: string, patch: Partial<LessonBlock>) =>
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  const move = (idx: number, dir: -1 | 1) => {
    const next = [...blocks];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    setBlocks(next);
  };

  const label = (b: LessonBlockType) => (lang === "vi" ? BLOCK_LABEL[b].vi : BLOCK_LABEL[b].en);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="les-sum-vi">{t("Tóm tắt (Tiếng Việt)", "Summary (Vietnamese)")}</Label>
          <Textarea id="les-sum-vi" rows={3} value={draft.summary ?? ""}
            onChange={(e) => onChange({ summary: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="les-sum-en">{t("Tóm tắt (English)", "Summary (English)")}</Label>
          <Textarea id="les-sum-en" rows={3} value={draft.summary_en ?? ""}
            onChange={(e) => onChange({ summary_en: e.target.value })} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium">{t("Thêm khối:", "Add block:")}</span>
        {BLOCK_TYPES.map((type) => (
          <Button key={type} type="button" size="sm" variant="outline"
            onClick={() => setBlocks([...blocks, newBlock(type)])}>
            <Plus className="mr-1 h-3.5 w-3.5" />
            {label(type)}
          </Button>
        ))}
      </div>

      {blocks.length === 0 && (
        <p className="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          {t("Chưa có khối nội dung. Hãy thêm khối đầu tiên.", "No blocks yet. Add your first block.")}
        </p>
      )}

      {blocks.map((block, idx) => (
        <Card key={block.id}>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-3">
            <CardTitle className="flex flex-wrap items-center gap-2 text-base">
              <Badge variant="secondary">{idx + 1}</Badge>
              {label(block.type)}
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button type="button" size="icon" variant="ghost" aria-label={t("Lên", "Move up")}
                onClick={() => move(idx, -1)}>
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button type="button" size="icon" variant="ghost" aria-label={t("Xuống", "Move down")}
                onClick={() => move(idx, 1)}>
                <ArrowDown className="h-4 w-4" />
              </Button>
              <Button type="button" size="icon" variant="ghost" aria-label={t("Xoá khối", "Delete block")}
                onClick={() => setBlocks(blocks.filter((b) => b.id !== block.id))}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label>{t("Tiêu đề khối (VI)", "Block heading (VI)")}</Label>
                <Input value={block.heading}
                  onChange={(e) => patchBlock(block.id, { heading: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>{t("Tiêu đề khối (EN)", "Block heading (EN)")}</Label>
                <Input value={block.heading_en ?? ""}
                  onChange={(e) => patchBlock(block.id, { heading_en: e.target.value })} />
              </div>
            </div>

            {(block.type === "objective" || block.type === "explanation" || block.type === "practice") && (
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>{t("Nội dung (VI)", "Content (VI)")}</Label>
                  <Textarea rows={5} value={block.text ?? ""}
                    onChange={(e) => patchBlock(block.id, { text: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>{t("Nội dung (EN)", "Content (EN)")}</Label>
                  <Textarea rows={5} value={block.text_en ?? ""}
                    onChange={(e) => patchBlock(block.id, { text_en: e.target.value })} />
                </div>
              </div>
            )}

            {block.type === "vocabulary" && (
              <div className="space-y-2">
                {(block.vocabulary ?? []).map((v, vi) => (
                  <div key={vi} className="grid gap-2 md:grid-cols-[1fr_1fr_1fr_auto]">
                    <Input placeholder={t("Từ / cụm từ", "Term")} value={v.term}
                      onChange={(e) => {
                        const next = [...(block.vocabulary ?? [])];
                        next[vi] = { ...v, term: e.target.value };
                        patchBlock(block.id, { vocabulary: next });
                      }} />
                    <Input placeholder={t("Nghĩa", "Meaning")} value={v.meaning}
                      onChange={(e) => {
                        const next = [...(block.vocabulary ?? [])];
                        next[vi] = { ...v, meaning: e.target.value };
                        patchBlock(block.id, { vocabulary: next });
                      }} />
                    <Input placeholder={t("Ví dụ", "Example")} value={v.example ?? ""}
                      onChange={(e) => {
                        const next = [...(block.vocabulary ?? [])];
                        next[vi] = { ...v, example: e.target.value };
                        patchBlock(block.id, { vocabulary: next });
                      }} />
                    <Button type="button" size="icon" variant="ghost" aria-label={t("Xoá từ", "Remove term")}
                      onClick={() => patchBlock(block.id, {
                        vocabulary: (block.vocabulary ?? []).filter((_, i) => i !== vi),
                      })}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button type="button" size="sm" variant="outline"
                  onClick={() => patchBlock(block.id, {
                    vocabulary: [...(block.vocabulary ?? []), { term: "", meaning: "", example: "" }],
                  })}>
                  <Plus className="mr-1 h-3.5 w-3.5" />{t("Thêm từ", "Add term")}
                </Button>
              </div>
            )}

            {block.type === "dialogue" && (
              <div className="space-y-2">
                {(block.dialogue ?? []).map((d, di) => (
                  <div key={di} className="grid gap-2 md:grid-cols-[120px_1fr_1fr_auto]">
                    <Input placeholder={t("Người nói", "Speaker")} value={d.speaker}
                      onChange={(e) => {
                        const next = [...(block.dialogue ?? [])];
                        next[di] = { ...d, speaker: e.target.value };
                        patchBlock(block.id, { dialogue: next });
                      }} />
                    <Input placeholder={t("Câu thoại", "Line")} value={d.line}
                      onChange={(e) => {
                        const next = [...(block.dialogue ?? [])];
                        next[di] = { ...d, line: e.target.value };
                        patchBlock(block.id, { dialogue: next });
                      }} />
                    <Input placeholder={t("Bản dịch", "Translation")} value={d.translation ?? ""}
                      onChange={(e) => {
                        const next = [...(block.dialogue ?? [])];
                        next[di] = { ...d, translation: e.target.value };
                        patchBlock(block.id, { dialogue: next });
                      }} />
                    <Button type="button" size="icon" variant="ghost" aria-label={t("Xoá câu", "Remove line")}
                      onClick={() => patchBlock(block.id, {
                        dialogue: (block.dialogue ?? []).filter((_, i) => i !== di),
                      })}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button type="button" size="sm" variant="outline"
                  onClick={() => patchBlock(block.id, {
                    dialogue: [...(block.dialogue ?? []), { speaker: "B", line: "", translation: "" }],
                  })}>
                  <Plus className="mr-1 h-3.5 w-3.5" />{t("Thêm câu thoại", "Add line")}
                </Button>
              </div>
            )}

            {block.type === "quiz" && (
              <div className="space-y-4">
                {(block.quiz ?? []).map((q, qi) => (
                  <div key={qi} className="space-y-2 rounded-md border border-border p-3">
                    <div className="flex items-start gap-2">
                      <Textarea rows={2} placeholder={t("Câu hỏi", "Question")} value={q.question}
                        onChange={(e) => {
                          const next = [...(block.quiz ?? [])];
                          next[qi] = { ...q, question: e.target.value };
                          patchBlock(block.id, { quiz: next });
                        }} />
                      <Button type="button" size="icon" variant="ghost" aria-label={t("Xoá câu hỏi", "Remove question")}
                        onClick={() => patchBlock(block.id, {
                          quiz: (block.quiz ?? []).filter((_, i) => i !== qi),
                        })}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid gap-2 md:grid-cols-2">
                      {[0, 1, 2, 3].map((oi) => (
                        <Input key={oi} placeholder={`${t("Lựa chọn", "Option")} ${oi + 1}`}
                          value={q.options?.[oi] ?? ""}
                          onChange={(e) => {
                            const next = [...(block.quiz ?? [])];
                            const options = [...(q.options ?? ["", "", "", ""])];
                            options[oi] = e.target.value;
                            next[qi] = { ...q, options };
                            patchBlock(block.id, { quiz: next });
                          }} />
                      ))}
                    </div>
                    <div className="grid gap-2 md:grid-cols-[200px_1fr]">
                      <div className="space-y-1.5">
                        <Label>{t("Đáp án đúng", "Correct answer")}</Label>
                        <Select value={String(q.correctIndex ?? 0)}
                          onValueChange={(v) => {
                            const next = [...(block.quiz ?? [])];
                            next[qi] = { ...q, correctIndex: Number(v) };
                            patchBlock(block.id, { quiz: next });
                          }}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {[0, 1, 2, 3].map((oi) => (
                              <SelectItem key={oi} value={String(oi)}>
                                {`${t("Lựa chọn", "Option")} ${oi + 1}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label>{t("Giải thích", "Explanation")}</Label>
                        <Input value={q.explanation ?? ""}
                          onChange={(e) => {
                            const next = [...(block.quiz ?? [])];
                            next[qi] = { ...q, explanation: e.target.value };
                            patchBlock(block.id, { quiz: next });
                          }} />
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="button" size="sm" variant="outline"
                  onClick={() => patchBlock(block.id, {
                    quiz: [
                      ...(block.quiz ?? []),
                      { question: "", options: ["", "", "", ""], correctIndex: 0, explanation: "" },
                    ],
                  })}>
                  <Plus className="mr-1 h-3.5 w-3.5" />{t("Thêm câu hỏi", "Add question")}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
