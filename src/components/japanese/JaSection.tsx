/**
 * @file JaSection.tsx
 * @description Shared collapsible section list used by every Japanese tab so long
 * content stays compact. Supports optional quick search and expand/collapse all.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { ReactNode, useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface JaSectionItem {
  id: string;
  title: string;
  /** Small line under the title (scene, note, formula...). */
  subtitle?: string;
  /** Right-aligned counter chip, e.g. "12 từ". */
  badge?: string;
  /** Lowercased haystack used by the quick search box. */
  searchText?: string;
  render: () => ReactNode;
}

interface Props {
  items: JaSectionItem[];
  /** Indexes opened on first render. Defaults to the first item. */
  defaultOpen?: number[];
  /** Show the quick search box with this placeholder. */
  searchPlaceholder?: string;
  /** Labels for the expand/collapse buttons. */
  labels?: { expand: string; collapse: string; empty: string };
}

export default function JaSection({
  items,
  defaultOpen = [0],
  searchPlaceholder,
  labels = { expand: "Mở tất cả", collapse: "Thu gọn tất cả", empty: "Không tìm thấy nội dung." },
}: Props) {
  const [open, setOpen] = useState<Set<string>>(
    () => new Set(defaultOpen.map((i) => items[i]?.id).filter(Boolean) as string[]),
  );
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (it) => (it.searchText ?? "").includes(q) || it.title.toLowerCase().includes(q),
    );
  }, [items, query]);

  const searching = query.trim().length > 0;

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {searchPlaceholder ? (
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rose-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-11 border-pink-200 bg-white pl-9 text-base"
            />
          </div>
        ) : (
          <span className="text-sm text-slate-500">{items.length} {""}</span>
        )}
        <div className="flex shrink-0 gap-2">
          <Button
            size="sm"
            variant="outline"
            className="border-pink-200 bg-white text-rose-700 hover:bg-pink-50 hover:text-rose-800"
            onClick={() => setOpen(new Set(items.map((i) => i.id)))}
          >
            {labels.expand}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-pink-200 bg-white text-rose-700 hover:bg-pink-50 hover:text-rose-800"
            onClick={() => setOpen(new Set())}
          >
            {labels.collapse}
          </Button>
        </div>
      </div>

      {visible.length === 0 && (
        <Card className="border-pink-200 p-6 text-base text-slate-600">{labels.empty}</Card>
      )}

      {visible.map((it) => {
        const isOpen = searching || open.has(it.id);
        return (
          <Card key={it.id} className="overflow-hidden border-pink-200 shadow-sm">
            <button
              type="button"
              onClick={() => toggle(it.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-3 bg-gradient-to-r from-pink-50 to-rose-50 px-4 py-4 text-left transition hover:from-pink-100 hover:to-rose-100"
            >
              <div className="min-w-0 flex-1">
                <div className="text-base font-bold text-rose-700 sm:text-lg">{it.title}</div>
                {it.subtitle && (
                  <div className="mt-0.5 text-sm text-slate-600">{it.subtitle}</div>
                )}
              </div>
              {it.badge && (
                <span className="shrink-0 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-rose-600 ring-1 ring-pink-200">
                  {it.badge}
                </span>
              )}
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-rose-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && <div className="border-t border-pink-100 bg-white p-4 sm:p-5">{it.render()}</div>}
          </Card>
        );
      })}
    </div>
  );
}
