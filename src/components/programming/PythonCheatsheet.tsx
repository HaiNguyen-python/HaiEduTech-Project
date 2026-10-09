import { BookOpen, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import { pythonCheatsheetGroups } from "@/data/pythonCheatsheet";

export default function PythonCheatsheet() {
  const { t } = useLanguage();
  return (
    <aside className="overflow-hidden rounded-lg border border-border bg-card shadow-sm" aria-label="Python cheatsheet">
      <h2 className="flex items-center gap-2 border-b border-border px-4 py-3 text-sm font-bold text-foreground">
        <BookOpen className="h-4 w-4 text-primary" /> Python cheatsheet
      </h2>
      <div className="max-h-[60vh] overflow-y-auto">
        {pythonCheatsheetGroups.map((group, index) => (
          <details key={group.title} open={index === 0} className="group border-b border-border last:border-0">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 bg-muted/40 px-4 py-3 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
              {t(group.vi, group.title)}<ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <dl className="divide-y divide-border px-4">
              {group.entries.map(({ signature, en, vi, example }) => (
                <div key={signature} className="py-3">
                  <dt className="break-words font-mono text-xs font-semibold text-primary">{signature}</dt>
                  <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {t(vi, en)}
                    <code className="mt-2 block overflow-x-auto rounded bg-muted px-2 py-2 font-mono text-xs leading-relaxed text-foreground whitespace-pre">{example}</code>
                  </dd>
                </div>
              ))}
            </dl>
          </details>
        ))}
      </div>
    </aside>
  );
}
