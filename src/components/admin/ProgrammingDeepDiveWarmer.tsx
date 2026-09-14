// Admin tool: monitor cached Programming theory and fill missing illustrations
// without rewriting lesson content.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { allProgrammingModules } from "@/data/programmingLessonData";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { Image, Loader2, RefreshCw, Sparkles, Square } from "lucide-react";

interface LessonRow {
  module_id: string;
  lesson_id: string;
  module_title: string;
  lesson_title: string;
  base_theory: string;
  code_language: string | null;
}

interface CacheRow {
  module_id: string;
  lesson_id: string;
  enhanced_markdown: string;
  illustrations: unknown;
}

const CONCURRENCY = 2;

// Base64 (UTF-8 safe) so security lesson samples survive the edge firewall.
const encodeTheory = (text: string): string => {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
};

const ProgrammingDeepDiveWarmer = () => {
  const { t } = useLanguage();


  const allLessons = useMemo<LessonRow[]>(
    () =>
      allProgrammingModules.flatMap((m) =>
        m.lessons.map((l) => ({
          module_id: m.id,
          lesson_id: l.id,
          module_title: m.titleEn || m.title,
          lesson_title: l.titleEn || l.title,
          // Stored/forwarded base64: raw security lesson samples trip the edge firewall.
          base_theory: encodeTheory((l.theoryEn || l.theory || "").slice(0, 4000)),
          code_language: l.codeLanguage || null,
        })),
      ),
    [],
  );

  const [cacheRows, setCacheRows] = useState<CacheRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0, ok: 0, failed: 0 });
  const [currentLabel, setCurrentLabel] = useState("");
  const [failedKeys, setFailedKeys] = useState<Set<string>>(new Set());
  const stopRef = useRef(false);

  const loadCache = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("programming_theory_cache")
      .select("module_id, lesson_id, enhanced_markdown, illustrations");
    if (!error && data) {
      setCacheRows(data as CacheRow[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadCache();
  }, [loadCache]);

  const cachedKeys = new Set(cacheRows.map((row) => `${row.module_id}::${row.lesson_id}`));
  const missingTheory = allLessons.filter((lesson) => !cachedKeys.has(`${lesson.module_id}::${lesson.lesson_id}`));
  const illustrationReadyKeys = new Set(
    cacheRows
      .filter((row) =>
        (Array.isArray(row.illustrations) && row.illustrations.length > 0) ||
        /!\[[^\]]*\]\([^)]+\)/.test(row.enhanced_markdown || ""),
      )
      .map((row) => `${row.module_id}::${row.lesson_id}`),
  );
  const missingIllustrations = allLessons.filter((lesson) =>
    cachedKeys.has(`${lesson.module_id}::${lesson.lesson_id}`) &&
    !illustrationReadyKeys.has(`${lesson.module_id}::${lesson.lesson_id}`),
  );

  const generateMissing = async () => {
    if (running || missingTheory.length === 0) return;
    stopRef.current = false;
    setRunning(true);
    setProgress({ done: 0, total: missingTheory.length, ok: 0, failed: 0 });

    let cursor = 0;
    let ok = 0;
    let failed = 0;
    let done = 0;

    const worker = async () => {
      while (!stopRef.current && cursor < missingTheory.length) {
        const row = missingTheory[cursor++];
        setCurrentLabel(`${row.module_id} / ${row.lesson_id}`);
        try {
          const { data, error } = await supabase.functions.invoke("enhance-programming-theory", {
            body: {
              module_id: row.module_id,
              lesson_id: row.lesson_id,
              module_title: row.module_title,
              lesson_title: row.lesson_title,
              base_theory_b64: row.base_theory,
              code_language: row.code_language,
              force_refresh: false,
            },
          });
          if (error) throw error;
          if (data?.markdown && !data?.fallback) ok++;
          else failed++;
        } catch {
          failed++;
        }
        done++;
        setProgress({ done, total: missingTheory.length, ok, failed });
      }
    };

    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
    setCurrentLabel("");
    setRunning(false);
    await loadCache();
    toast.success(
      t(`Xong: ${ok} bài đã tạo, ${failed} lỗi.`, `Finished: ${ok} generated, ${failed} failed.`),
    );
  };

  const generateMissingIllustrations = async () => {
    const queue = failedKeys.size > 0
      ? missingIllustrations.filter((row) => failedKeys.has(`${row.module_id}::${row.lesson_id}`))
      : missingIllustrations;
    if (running || queue.length === 0) return;
    stopRef.current = false;
    setRunning(true);
    setFailedKeys(new Set());
    setProgress({ done: 0, total: queue.length, ok: 0, failed: 0 });

    let ok = 0;
    let failed = 0;
    const nextFailures = new Set<string>();
    for (let index = 0; index < queue.length && !stopRef.current; index += 1) {
      const row = queue[index];
      const key = `${row.module_id}::${row.lesson_id}`;
      setCurrentLabel(`${row.module_id} / ${row.lesson_id}`);
      try {
        const { data, error } = await supabase.functions.invoke("backfill-programming-illustrations", {
          body: {
            module_id: row.module_id,
            lesson_id: row.lesson_id,
            lesson_title: row.lesson_title,
          },
        });
        if (error || (!data?.ok && !data?.skipped)) throw error || new Error(data?.error || "Generation failed");
        ok += 1;
      } catch {
        failed += 1;
        nextFailures.add(key);
      }
      setProgress({ done: index + 1, total: queue.length, ok, failed });
    }

    setFailedKeys(nextFailures);
    setCurrentLabel("");
    setRunning(false);
    await loadCache();
    toast[failed > 0 ? "warning" : "success"](
      t(`Hình minh họa: ${ok} thành công, ${failed} lỗi.`, `Illustrations: ${ok} succeeded, ${failed} failed.`),
    );
  };

  const theoryReadyCount = allLessons.length - missingTheory.length;
  const illustrationReadyCount = illustrationReadyKeys.size;
  const readyPercent = allLessons.length ? Math.round((illustrationReadyCount / allLessons.length) * 100) : 0;

  return (
    <Card className="border border-border/60 bg-card">
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2 text-lg">
          <Sparkles className="w-5 h-5 text-primary" />
          {t("Nội dung & hình Programming", "Programming content & illustrations")}
          <Badge variant="secondary">{readyPercent}%</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border/60 p-3">
            <div className="text-xs text-muted-foreground">{t("Tổng bài học", "Total lessons")}</div>
            <div className="text-2xl font-bold">{allLessons.length}</div>
          </div>
          <div className="rounded-lg border border-border/60 p-3">
            <div className="text-xs text-muted-foreground">{t("Theory đã sẵn sàng", "Theory ready")}</div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{theoryReadyCount}</div>
          </div>
          <div className="rounded-lg border border-border/60 p-3">
            <div className="text-xs text-muted-foreground">{t("Đã có hình", "Illustrated")}</div>
            <div className="text-2xl font-bold text-primary">{loading ? "..." : illustrationReadyCount}</div>
          </div>
          <div className="rounded-lg border border-border/60 p-3">
            <div className="text-xs text-muted-foreground">{t("Còn thiếu hình", "Missing illustrations")}</div>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {loading ? "..." : missingIllustrations.length}
            </div>
          </div>
        </div>

        <Progress value={readyPercent} className="h-2" />

        {running && (
          <div className="space-y-2 rounded-lg border border-border/60 p-3 text-sm">
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="font-medium">
                {progress.done}/{progress.total} - {t("thành công", "ok")} {progress.ok},{" "}
                {t("lỗi", "failed")} {progress.failed}
              </span>
            </div>
            {currentLabel && <div className="text-xs text-muted-foreground">{currentLabel}</div>}
            <Progress value={progress.total ? (progress.done / progress.total) * 100 : 0} className="h-2" />
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={generateMissing}
            disabled={running || loading || missingTheory.length === 0}
            variant="outline"
            className="min-h-11"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {t("Tạo Theory còn thiếu", "Generate missing theory")}
          </Button>
          <Button
            onClick={generateMissingIllustrations}
            disabled={running || loading || missingIllustrations.length === 0}
            className="min-h-11"
          >
            <Image className="w-4 h-4 mr-2" />
            {failedKeys.size > 0
              ? t(`Thử lại ${failedKeys.size} hình lỗi`, `Retry ${failedKeys.size} failed`)
              : t("Tạo hình còn thiếu", "Generate missing illustrations")}
          </Button>
          {running && (
            <Button variant="outline" className="min-h-11" onClick={() => { stopRef.current = true; }}>
              <Square className="w-4 h-4 mr-2" />
              {t("Dừng", "Stop")}
            </Button>
          )}
          <Button variant="ghost" className="min-h-11" onClick={loadCache} disabled={loading || running}>
            <RefreshCw className="w-4 h-4 mr-2" />
            {t("Làm mới số liệu", "Refresh counts")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgrammingDeepDiveWarmer;
