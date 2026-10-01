import { useState } from "react";
import { Volume2, CheckCircle2, ChevronDown, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { PARA_TOOLKIT, toolUsed, type ToolKind } from "@/data/ieltsParaphraseToolkit";
import { playEnglishTts } from "@/lib/englishTts";

const GROUPS: { kind: ToolKind; en: string; vi: string }[] = [
  { kind: "collocation", en: "Collocations", vi: "Collocations" },
  { kind: "phrase", en: "High-level phrases", vi: "Cụm từ nâng cao" },
  { kind: "structure", en: "Structures", vi: "Cấu trúc" },
];

export default function ParaphraseToolkit({ toolKey, attempt, onInsert }: { toolKey: string; attempt: string; onInsert: (text: string) => void }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(true);
  const [focus, setFocus] = useState<string | null>(null);
  const items = PARA_TOOLKIT[toolKey] ?? [];
  if (!items.length) return null;
  const used = items.filter((i) => toolUsed(i, attempt)).length;

  return (
    <div className="rounded-lg border bg-muted/30 p-3 space-y-3">
      <button type="button" onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between gap-2 text-left">
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <Sparkles className="w-4 h-4 text-primary" />
          {t("Bộ công cụ ngôn ngữ: collocations, cụm từ & cấu trúc", "Language toolkit: collocations, phrases & structures")}
        </span>
        <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          {t(`Đã dùng ${used}/${items.length}`, `Used ${used}/${items.length}`)}
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </span>
      </button>
      {open && (
        <>
          <p className="text-xs text-muted-foreground">{t("Bấm để chèn vào câu viết lại. Mục dùng đúng sẽ chuyển xanh.", "Click to insert into your rewrite. Items you use turn green.")}</p>
          {GROUPS.map((g) => {
            const list = items.filter((i) => i.kind === g.kind);
            return (
              <div key={g.kind}>
                <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-1.5">{t(g.vi, g.en)}</p>
                <div className="flex flex-wrap gap-1.5">
                  {list.map((i) => {
                    const ok = toolUsed(i, attempt);
                    const id = `${g.kind}:${i.en}`;
                    return (
                      <button key={id} type="button"
                        onClick={() => { setFocus(focus === id ? null : id); if (i.kind !== "structure") onInsert(i.en); }}
                        className={`text-sm rounded-full border px-3 py-1 transition-colors ${ok ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground"}`}>
                        {ok && <CheckCircle2 className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />}{i.en}
                        <span className="ml-1.5 text-[10px] opacity-70">{i.level}</span>
                      </button>
                    );
                  })}
                </div>
                {list.filter((i) => focus === `${g.kind}:${i.en}`).map((i) => (
                  <div key={i.en} className="mt-2 rounded-md border bg-background p-2.5 text-sm space-y-1">
                    <p className="text-foreground"><span className="font-semibold">{i.en}</span> <Badge variant="outline" className="ml-1">{i.level}</Badge></p>
                    <p className="text-muted-foreground">{i.vi}</p>
                    <p className="italic text-foreground/90 inline-flex items-center gap-2">
                      {i.ex}
                      <button type="button" aria-label="Listen" onClick={() => playEnglishTts(i.ex)} className="text-primary"><Volume2 className="w-4 h-4" /></button>
                    </p>
                  </div>
                ))}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
