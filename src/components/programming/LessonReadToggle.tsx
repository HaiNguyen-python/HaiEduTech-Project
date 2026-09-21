/**
 * @file LessonReadToggle.tsx
 * @description Per-lesson "Mark as read" toggle + module-level progress bar.
 * Persists read state in localStorage so guests retain progress, and exposes
 * an onMark callback so the host page can award XP / streak / badges once
 * per first-time mark.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState, useCallback } from "react";
import { CheckCircle2, Circle, BookMarked } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { loadModuleRead, notifyReadChange, READ_CHANGE_EVENT } from "@/lib/programmingReadProgress";

interface Props {
  moduleId: string;
  lessonId: string;
  allLessonIds: string[];
  /** Called when user marks a lesson read for the first time. */
  onFirstMark?: () => void;
  className?: string;
  compact?: boolean;
}

const storageKey = (moduleId: string) => `haiedu_prog_read_${moduleId}`;

const loadRead = (moduleId: string): Set<string> => loadModuleRead(moduleId);

const saveRead = (moduleId: string, set: Set<string>) => {
  try {
    localStorage.setItem(storageKey(moduleId), JSON.stringify([...set]));
    // Notify same-tab listeners (roadmap sidebar) that progress changed.
    notifyReadChange(moduleId);
  } catch {
    /* ignore */
  }
};

const LessonReadToggle = ({
  moduleId,
  lessonId,
  allLessonIds,
  onFirstMark,
  className,
  compact,
}: Props) => {
  const { t } = useLanguage();
  const [readSet, setReadSet] = useState<Set<string>>(() => loadRead(moduleId));

  useEffect(() => {
    setReadSet(loadRead(moduleId));
  }, [moduleId, lessonId]);

  // Sync if another tab / page updates the same module
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === storageKey(moduleId)) setReadSet(loadRead(moduleId));
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [moduleId]);

  const isRead = readSet.has(lessonId);
  const total = Math.max(allLessonIds.length, 1);
  const completed = useMemo(
    () => allLessonIds.filter((id) => readSet.has(id)).length,
    [allLessonIds, readSet],
  );
  const pct = Math.round((completed / total) * 100);

  const toggle = useCallback(() => {
    setReadSet((prev) => {
      const next = new Set(prev);
      const wasRead = next.has(lessonId);
      if (wasRead) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
      }
      saveRead(moduleId, next);
      if (!wasRead) {
        onFirstMark?.();
        toast.success(t("Đã đánh dấu hoàn thành ✅", "Marked as completed ✅"), {
          duration: 1600,
        });
      } else {
        toast(t("Đã bỏ đánh dấu", "Unmarked"), { duration: 1200 });
      }
      return next;
    });
  }, [lessonId, moduleId, onFirstMark, t]);

  return (
    <div
      className={cn(
        "rounded-xl border-2 bg-card/80 backdrop-blur-sm p-3 sm:p-4 flex items-center gap-3 flex-wrap",
        isRead ? "border-emerald-500/60" : "border-border",
        className,
      )}
    >
      <motion.button
        type="button"
        onClick={toggle}
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.03 }}
        aria-pressed={isRead}
        aria-label={
          isRead
            ? t("Bỏ đánh dấu đã học", "Unmark as read")
            : t("Đánh dấu đã học bài này", "Mark this lesson as read")
        }
        className={cn(
          "inline-flex items-center gap-2 rounded-full font-semibold text-xs sm:text-sm border transition-all shrink-0",
          compact ? "h-8 px-3" : "h-9 px-4",
          isRead
            ? "bg-emerald-500 text-white border-emerald-600 shadow-sm hover:brightness-110"
            : "bg-secondary text-foreground border-border hover:border-emerald-500/60 hover:text-emerald-600",
        )}
      >
        {isRead ? (
          <CheckCircle2 className="w-4 h-4" />
        ) : (
          <Circle className="w-4 h-4" />
        )}
        {isRead
          ? t("Đã hoàn thành", "Completed")
          : t("Đánh dấu đã học", "Mark as read")}
      </motion.button>

      <div className="flex-1 min-w-[140px]">
        <div className="flex items-center justify-between text-[11px] sm:text-xs text-muted-foreground mb-1">
          <span className="inline-flex items-center gap-1 font-medium">
            <BookMarked className="w-3.5 h-3.5" />
            {t("Tiến độ module", "Module progress")}
          </span>
          <span className="font-mono font-semibold text-foreground">
            {completed}/{total} · {pct}%
          </span>
        </div>
        <Progress value={pct} className="h-2" />
      </div>
    </div>
  );
};

export default LessonReadToggle;
