import { useMemo, useState } from "react";
import { BookOpen, Check, ChevronDown, Copy, Search, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import { pythonCheatsheetGroups } from "@/data/pythonCheatsheet";

const TOTAL_ENTRIES = pythonCheatsheetGroups.reduce((n, g) => n + g.entries.length, 0);

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard API unavailable (e.g. insecure context); copying is best-effort.
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className="shrink-0 rounded-md border border-border bg-background p-1.5 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
    >
      {copied ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
    </button>
  );
}

export default function PythonCheatsheet() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const q = query.trim().toLocaleLowerCase();

  const groups = useMemo(() => {
    if (!q) return pythonCheatsheetGroups;
    return pythonCheatsheetGroups
      .map(g => ({
        ...g,
        entries: g.entries.filter(e =>
          `${e.signature} ${e.en} ${e.vi}`.toLocaleLowerCase().includes(q)
        ),
      }))
      .filter(g => g.entries.length > 0);
  }, [q]);

  const matchCount = groups.reduce((n, g) => n + g.entries.length, 0);
  const searching = q.length > 0;

  return (
    <aside className="overflow-hidden rounded-xl border border-border bg-card shadow-sm" aria-label="Python cheatsheet">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-4 py-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-sm font-bold text-foreground">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/10">
              <BookOpen className="h-4 w-4 text-primary" />
            </span>
            {t("Cheatsheet Python", "Python cheatsheet")}
          </span>
          <span className="rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground">
            {searching ? `${matchCount}/${TOTAL_ENTRIES}` : TOTAL_ENTRIES}
          </span>
        </div>
        {/* Quick search */}
        <div className="relative mt-3">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t("Tìm hàm, cú pháp…", "Search syntax…")}
            aria-label={t("Tìm trong cheatsheet", "Search cheatsheet")}
            className="h-8 w-full rounded-md border border-border bg-background pl-8 pr-8 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {searching && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={t("Xóa tìm kiếm", "Clear search")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Groups */}
      <div className="max-h-[60vh] overflow-y-auto">
        {groups.length === 0 ? (
          <p className="px-4 py-8 text-center text-xs text-muted-foreground">
            {t("Không tìm thấy mục nào khớp với từ khóa.", "No entries match your search.")}
          </p>
        ) : (
          groups.map((group, index) => (
            <details key={group.title} open={searching || index === 0} className="group border-b border-border last:border-0">
              <summary className="flex cursor-pointer list-none items-center gap-2.5 bg-muted/40 px-4 py-3 text-xs font-semibold text-foreground transition-colors hover:bg-muted/70 [&::-webkit-details-marker]:hidden">
                <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded border border-border bg-background px-1 font-mono text-[10px] font-bold text-muted-foreground">
                  {index + 1}
                </span>
                <span className="flex-1 truncate">{t(group.vi, group.title)}</span>
                <span className="shrink-0 font-mono text-[10px] font-medium text-muted-foreground">{group.entries.length}</span>
                <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="divide-y divide-border/60">
                {group.entries.map(({ signature, en, vi, example }) => (
                  <div key={signature} className="px-4 py-3">
                    <div className="flex items-start justify-between gap-2">
                      <code className="break-words rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-primary">
                        {signature}
                      </code>
                      <CopyButton
                        text={example}
                        label={t(`Sao chép ví dụ cho ${signature}`, `Copy example for ${signature}`)}
                      />
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{t(vi, en)}</p>
                    <div className="mt-2 overflow-hidden rounded-md border border-border bg-muted/60">
                      <div className="flex items-center gap-1.5 border-b border-border/70 bg-muted px-2.5 py-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-border" aria-hidden="true" />
                        <span className="font-mono text-[10px] text-muted-foreground">python</span>
                      </div>
                      <div className="whitespace-pre-wrap px-2.5 py-2 font-mono text-[11px] leading-relaxed text-foreground">
                        {example}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </details>
          ))
        )}
      </div>
    </aside>
  );
}
