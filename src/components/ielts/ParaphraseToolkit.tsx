import { useState } from "react";
import { Volume2, CheckCircle2, ChevronDown, Sparkles, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { PARA_TOOLKIT, toolUsed, type ToolItem, type ToolKind } from "@/data/ieltsParaphraseToolkit";
import { playEnglishTts } from "@/lib/englishTts";

const COLUMNS: { kind: ToolKind; en: string; vi: string }[] = [
  { kind: "collocation", en: "Collocations", vi: "Collocations" },
  { kind: "structure", en: "Structures", vi: "Cấu trúc" },
];

export default function ParaphraseToolkit({ toolKey, attempt, onInsert }: { toolKey: string; attempt: string; onInsert: (text: string) => void }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(true);
  const [focus, setFocus] = useState<string | null>(null);
  const items = PARA_TOOLKIT[toolKey] ?? [];
  if (!items.length) return null;
  const used = items.filter((i) => toolUsed(i, attempt)).length;

  const chip = (i: ToolItem, kind: ToolKind) => {
    const ok = toolUsed(i, attempt);
    const id = `${kind}:${i.en}`;
    return (
      <button key={id} type="button"
        onClick={() => setFocus(focus === id ? null : id)}
        className={`w-full text-left text-sm rounded-full border px-3 py-1.5 truncate transition-colors ${ok ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground"}`}>
        {ok && <CheckCircle2 className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />}{i.en}
        <span className="ml-1.5 text-[10px] opacity-70">{i.level}</span>
      </button>
    );
  };

  const focused = items.find((i) => COLUMNS.some((c) => focus === `${c.kind}:${i.en}`));

  return (
    <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
      <button type="button" onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between gap-2 text-left">
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <Sparkles className="w-4 h-4 text-primary" />
          {t("Bộ công cụ ngôn ngữ: collocations & cấu trúc", "Language toolkit: collocations & structures")}
        </span>
        <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          {t(`Đã dùng ${used}/${items.length}`, `Used ${used}/${items.length}`)}
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </span>
      </button>
      {open && (
        <>
          <p className="text-xs text-muted-foreground">{t("Bấm để xem nghĩa và ví dụ; dùng nút chèn nếu muốn đưa vào bài viết lại. Mục dùng đúng chuyển xanh.", "Click to see its meaning and example; use the insert button to add it to your rewrite. Items you use turn green.")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {COLUMNS.map((col) => (
              <div key={col.kind} className="rounded-md border bg-background p-2 space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{t(col.vi, col.en)}</p>
                {items.filter((i) => i.kind === col.kind).map((i) => chip(i, col.kind))}
              </div>
            ))}
          </div>
          {focused && (
            <div className="rounded-md border bg-background p-2.5 text-sm space-y-1">
              <p className="text-foreground"><span className="font-semibold">{focused.en}</span> <Badge variant="outline" className="ml-1">{focused.level}</Badge></p>
              <p className="text-muted-foreground">{focused.vi}</p>
              <p className="italic text-foreground/90 inline-flex items-center gap-2">
                {focused.ex}
                <button type="button" aria-label="Listen" onClick={() => playEnglishTts(focused.ex)} className="text-primary"><Volume2 className="w-4 h-4" /></button>
              </p>
              {focused.kind === "collocation" && (
                <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => onInsert(focused.en)}>
                  <Plus className="w-3 h-3 mr-1" />{t("Chèn vào bài", "Insert")}
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
