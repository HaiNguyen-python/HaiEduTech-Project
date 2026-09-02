/**
 * @file PracticeSheet.tsx
 * @description Tạo bảng viết 田字格 in được để luyện chữ Hán trên giấy.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState } from "react";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface Props {
  /** Các chữ có thể chọn để in */
  chars: { char: string; pinyin?: string }[];
}

const COLUMNS = 8;

const PracticeSheet = ({ chars }: Props) => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<string[]>(chars.slice(0, 6).map((c) => c.char));

  const toggle = (c: string) =>
    setSelected((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const rows = useMemo(
    () => selected.map((c) => ({ char: c, pinyin: chars.find((x) => x.char === c)?.pinyin })),
    [selected, chars],
  );

  const handlePrint = () => {
    const html = rows
      .map((r) => {
        const cells = Array.from({ length: COLUMNS })
          .map((_, i) => `<td class="cell">${i === 0 ? `<span class="solid">${r.char}</span>` : i === 1 ? `<span class="faint">${r.char}</span>` : ""}</td>`)
          .join("");
        return `<tr><td class="label">${r.char}${r.pinyin ? ` <em>${r.pinyin}</em>` : ""}</td>${cells}</tr>`;
      })
      .join("");

    const doc = `<!doctype html><html lang="vi"><head><meta charset="utf-8" />
<title>${t("Bảng luyện viết chữ Hán - HaiEduTech", "Chinese writing practice sheet - HaiEduTech")}</title>
<style>
  body { font-family: system-ui, sans-serif; padding: 24px; color: #0f172a; }
  h1 { font-size: 18px; margin: 0 0 4px; }
  p.sub { font-size: 12px; color: #475569; margin: 0 0 18px; }
  table { border-collapse: collapse; width: 100%; }
  td.label { width: 96px; font-size: 12px; color: #475569; padding-right: 8px; }
  td.label em { color: #0ea5e9; font-style: normal; }
  td.cell { width: 64px; height: 64px; border: 1px solid #94a3b8; position: relative; text-align: center; vertical-align: middle; }
  td.cell::before, td.cell::after { content: ""; position: absolute; background: #cbd5e1; }
  td.cell::before { left: 50%; top: 0; bottom: 0; width: 1px; }
  td.cell::after { top: 50%; left: 0; right: 0; height: 1px; }
  span.solid { font-size: 44px; position: relative; z-index: 1; }
  span.faint { font-size: 44px; color: #cbd5e1; position: relative; z-index: 1; }
  tr { page-break-inside: avoid; }
  footer { margin-top: 20px; font-size: 11px; color: #94a3b8; }
</style></head><body>
<h1>${t("Bảng luyện viết chữ Hán", "Chinese writing practice sheet")}</h1>
<p class="sub">${t("Ô đầu là chữ mẫu, ô thứ hai để tô lại, các ô còn lại tự viết.", "First box is the model, second is for tracing, the rest are for free writing.")}</p>
<table>${html}</table>
<footer>HaiEduTech - haiedutech.com</footer>
</body></html>`;

    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(doc);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 400);
  };

  return (
    <div>
      <p className="text-base text-muted-foreground mb-3">
        {t(
          "Chọn chữ bạn muốn luyện rồi in bảng 田字格 ra giấy để viết tay.",
          "Pick the characters you want, then print a 田字格 grid to write by hand.",
        )}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {chars.map((c) => (
          <button
            key={c.char}
            onClick={() => toggle(c.char)}
            className={cn(
              "px-3 py-2 rounded-xl border-2 text-lg font-bold transition-all active:scale-95",
              selected.includes(c.char)
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-foreground hover:border-primary/40",
            )}
          >
            {c.char}
          </button>
        ))}
      </div>
      <Button onClick={handlePrint} disabled={selected.length === 0}>
        <Printer className="w-4 h-4 mr-1" />
        {t(`In bảng viết (${selected.length} chữ)`, `Print sheet (${selected.length} characters)`)}
      </Button>
    </div>
  );
};

export default PracticeSheet;
