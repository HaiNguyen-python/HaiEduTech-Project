/**
 * @file GlobalSearch.tsx
 * @description Cmd/Ctrl+K command palette indexing every route on the site plus
 * lesson titles, with accent-insensitive matching, recent pages and role filtering.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator,
} from "@/components/ui/command";
import {
  Search, Compass, FolderLock, FileText, GraduationCap, BookOpen, Newspaper,
  Code2, Languages, Globe, MessageSquare, PenTool, Award, Cpu, Library, Swords, Heart, Brain,
  Home as HomeIcon, Clock, Zap, Sparkles, Wrench, Lock, Gamepad2, Target, User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserRole } from "@/hooks/useUserRole";
import { isPublicPath } from "@/lib/publicRoutes";
import {
  GROUP_LABELS, GROUP_ORDER, MAX_PER_GROUP, QUICK_PATHS, SEARCH_ENTRIES,
  normalize, scoreEntry, type SearchEntry, type SearchGroupId,
} from "@/lib/search/searchIndex";
import { loadLessonIndex, type LessonSearchEntry } from "@/lib/search/lessonIndex";
import { readRecentPages, rememberRecentPage } from "@/lib/search/recentPages";

interface GlobalSearchProps {
  variant?: "icon" | "button";
  className?: string;
}


const GROUP_ICONS: Record<SearchGroupId, React.ComponentType<{ className?: string }>> = {
  recent: Clock,
  quick: Zap,
  abroad: Compass,
  english: BookOpen,
  chinese: Languages,
  vietnamese: Globe,
  nordic: Sparkles,
  programming: Code2,
  exams: Target,
  vocab: Library,
  life: Heart,
  me: User,
  admin: Wrench,
  lesson: FileText,
};

/** A few nicer per-path icons on top of the group default. */
const PATH_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "/": HomeIcon,
  "/about": Brain,
  "/dashboard": Award,
  "/notebook": PenTool,
  "/contact": MessageSquare,
  "/study-abroad/documents": FolderLock,
  "/study-abroad/phd": GraduationCap,
  "/global-scholarship": Newspaper,
  "/ai-grading": Cpu,
  "/vocab-arena": Swords,
  "/arcade-plus": Gamepad2,
};

const readRecents = (): string[] => {
  const parsed = safeStorage.get<string[]>(RECENT_KEY, []);
  return Array.isArray(parsed)
    ? parsed.filter((p) => typeof p === "string").slice(0, RECENT_LIMIT)
    : [];
};

export const rememberRecentPage = (path: string) => {
  const next = [path, ...readRecents().filter((p) => p !== path)].slice(0, RECENT_LIMIT);
  safeStorage.set(RECENT_KEY, next);
};

const GlobalSearch = ({ variant = "icon", className }: GlobalSearchProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [lessons, setLessons] = useState<LessonSearchEntry[]>([]);
  const [recents, setRecents] = useState<string[]>([]);
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const { user, isTeacher, isAssistant } = useUserRole();
  const isVi = lang === "vi";
  const canSeeAdmin = isTeacher || isAssistant;

  // Cmd/Ctrl+K toggles palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((p) => !p);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) setRecents(readRecents());
    else setQuery("");
  }, [open]);

  // Lesson index is heavy - only pull it in once the user actually types.
  useEffect(() => {
    if (!open || query.trim().length < 2 || lessons.length > 0) return;
    let active = true;
    loadLessonIndex()
      .then((list) => { if (active) setLessons(list); })
      .catch(() => { /* lesson search stays unavailable */ });
    return () => { active = false; };
  }, [open, query, lessons.length]);

  const visibleEntries = useMemo(
    () => SEARCH_ENTRIES.filter((e) => (e.adminOnly ? canSeeAdmin : true)),
    [canSeeAdmin],
  );

  const label = useCallback((e: { vi: string; en: string }) => (isVi ? e.vi : e.en), [isVi]);

  const go = useCallback((path: string) => {
    setOpen(false);
    rememberRecentPage(path);
    if (!user && !isPublicPath(path)) {
      navigate(`/login?next=${encodeURIComponent(path)}`);
      return;
    }
    navigate(path);
  }, [navigate, user]);

  const nq = normalize(query);

  /** Grouped page results, ranked. */
  const pageGroups = useMemo(() => {
    if (!nq) return [] as { group: SearchGroupId; items: SearchEntry[] }[];
    const scored = visibleEntries
      .map((entry) => ({
        entry,
        score: scoreEntry([entry.vi, entry.en], [entry.keywords ?? "", entry.to], nq),
      }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score || label(a.entry).localeCompare(label(b.entry)));

    const byGroup = new Map<SearchGroupId, SearchEntry[]>();
    for (const { entry } of scored) {
      const list = byGroup.get(entry.group) ?? [];
      if (list.length >= MAX_PER_GROUP) continue;
      list.push(entry);
      byGroup.set(entry.group, list);
    }
    return GROUP_ORDER.filter((g) => byGroup.has(g)).map((g) => ({ group: g, items: byGroup.get(g)! }));
  }, [nq, visibleEntries, label]);

  const lessonResults = useMemo(() => {
    if (nq.length < 2 || lessons.length === 0) return [] as LessonSearchEntry[];
    return lessons
      .map((l) => ({ l, score: scoreEntry([l.vi, l.en], [l.parentVi, l.parentEn], nq) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((r) => r.l);
  }, [nq, lessons]);

  const entryByPath = useMemo(() => {
    const map = new Map<string, SearchEntry>();
    for (const e of visibleEntries) map.set(e.to, e);
    return map;
  }, [visibleEntries]);

  const recentEntries = recents
    .map((p) => entryByPath.get(p))
    .filter((e): e is SearchEntry => Boolean(e));
  const quickEntries = QUICK_PATHS
    .map((p) => entryByPath.get(p))
    .filter((e): e is SearchEntry => Boolean(e))
    .filter((e) => !recents.includes(e.to));

  const renderItem = (entry: SearchEntry, keyPrefix: string) => {
    const Icon = PATH_ICONS[entry.to] ?? GROUP_ICONS[entry.group];
    const needsLogin = !user && !isPublicPath(entry.to);
    return (
      <CommandItem
        key={`${keyPrefix}-${entry.to}`}
        value={`${keyPrefix}-${entry.to}`}
        onSelect={() => go(entry.to)}
        className="cursor-pointer"
      >
        <Icon className="mr-2 h-4 w-4 shrink-0 text-primary" />
        <span className="truncate">{label(entry)}</span>
        {needsLogin && (
          <span className="ml-auto flex items-center gap-1 text-[11px] text-muted-foreground">
            <Lock className="h-3 w-3" />
            {t("cần đăng nhập", "sign in")}
          </span>
        )}
      </CommandItem>
    );
  };

  const groupHeading = (g: SearchGroupId) => (isVi ? GROUP_LABELS[g].vi : GROUP_LABELS[g].en);

  const hasResults = pageGroups.length > 0 || lessonResults.length > 0;

  return (
    <>
      {variant === "icon" ? (
        <Button
          variant="ghost"
          size="icon"
          className={className ?? "h-9 w-9"}
          onClick={() => setOpen(true)}
          aria-label={t("Tìm kiếm", "Search")}
          title={t("Tìm kiếm (Ctrl+K)", "Search (Ctrl+K)")}
        >
          <Search className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className={className ?? "w-full justify-start gap-2 text-muted-foreground hover:text-foreground"}
        >
          <Search className="h-4 w-4" />
          <span>{t("Tìm trang, bài học...", "Search pages, lessons...")}</span>
          <kbd className="ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] sm:inline-flex">
            ⌘K
          </kbd>
        </Button>
      )}

      <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder={t("Tìm trang, bài học, du học... (gõ không dấu cũng được)", "Search pages, lessons, study abroad...")}
        />
        <CommandList>
          {!nq && recentEntries.length > 0 && (
            <>
              <CommandGroup heading={groupHeading("recent")}>
                {recentEntries.map((e) => renderItem(e, "recent"))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          {!nq && (
            <CommandGroup heading={groupHeading("quick")}>
              {quickEntries.map((e) => renderItem(e, "quick"))}
            </CommandGroup>
          )}

          {nq && !hasResults && (
            <CommandEmpty>
              {t("Không tìm thấy kết quả.", "No results found.")}
            </CommandEmpty>
          )}

          {nq && !hasResults && (
            <CommandGroup heading={t("Gợi ý", "Suggestions")}>
              {quickEntries.slice(0, 3).map((e) => renderItem(e, "suggest"))}
            </CommandGroup>
          )}

          {pageGroups.map(({ group, items }, idx) => (
            <div key={group}>
              {idx > 0 && <CommandSeparator />}
              <CommandGroup heading={groupHeading(group)}>
                {items.map((e) => renderItem(e, `g-${group}`))}
              </CommandGroup>
            </div>
          ))}

          {lessonResults.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading={groupHeading("lesson")}>
                {lessonResults.map((l) => (
                  <CommandItem
                    key={l.to}
                    value={`lesson-${l.to}`}
                    onSelect={() => go(l.to)}
                    className="cursor-pointer"
                  >
                    <FileText className="mr-2 h-4 w-4 shrink-0 text-primary" />
                    <span className="truncate">{isVi ? l.vi : l.en}</span>
                    <span className="ml-auto max-w-[45%] truncate text-[11px] text-muted-foreground">
                      {isVi ? l.parentVi : l.parentEn}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default GlobalSearch;
