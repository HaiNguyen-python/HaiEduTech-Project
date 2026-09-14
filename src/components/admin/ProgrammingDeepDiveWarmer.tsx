// Admin tool: keep an English AI Deep-Dive cached for every Programming lesson
// so learners never wait for generation when they open a lesson.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { allProgrammingModules } from "@/data/programmingLessonData";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { Loader2, RefreshCw, Sparkles, Square } from "lucide-react";

interface LessonRow {
  module_id: string;
  lesson_id: string;
  module_title: string;
  lesson_title: string;
  base_theory: string;
  code_language: string | null;
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

  const [cachedKeys, setCachedKeys] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0, ok: 0, failed: 0 });
  const [currentLabel, setCurrentLabel] = useState("");
  const stopRef = useRef(false);

  const loadCache = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("programming_theory_cache")
      .select("module_id, lesson_id");
    if (!error && data) {
      setCachedKeys(new Set(data.map((r) => `${r.module_id}::${r.lesson_id}`)));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadCache();
  }, [loadCache]);

  const missing = allLessons.filter((l) => !cachedKeys.has(`${l.module_id}::${l.lesson_id}`));

  const generateMissing = async () => {
    if (running || missing.length === 0) return;
    stopRef.current = false;
    setRunning(true);
    setProgress({ done: 0, total: missing.length, ok: 0, failed: 0 });

    let cursor = 0;
    let ok = 0;
    let failed = 0;
    let done = 0;

    const worker = async () => {
      while (!stopRef.current && cursor < missing.length) {
        const row = missing[cursor++];
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
        setProgress({ done, total: missing.length, ok, failed });
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

  const readyCount = allLessons.length - missing.length;
  const readyPercent = allLessons.length ? Math.round((readyCount / allLessons.length) * 100) : 0;

  return (
    <Card className="border border-border/60 bg-card">
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2 text-lg">
          <Sparkles className="w-5 h-5 text-primary" />
          {t("Bản giảng sâu Programming", "Programming Deep-Dive cache")}
          <Badge variant="secondary">{readyPercent}%</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border/60 p-3">
            <div className="text-xs text-muted-foreground">{t("Tổng bài học", "Total lessons")}</div>
            <div className="text-2xl font-bold">{allLessons.length}</div>
          </div>
          <div className="rounded-lg border border-border/60 p-3">
            <div className="text-xs text-muted-foreground">{t("Đã có bản giảng sâu", "Deep-Dive ready")}</div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{readyCount}</div>
          </div>
          <div className="rounded-lg border border-border/60 p-3">
            <div className="text-xs text-muted-foreground">{t("Còn thiếu", "Missing")}</div>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {loading ? "..." : missing.length}
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
            disabled={running || loading || missing.length === 0}
            className="min-h-11"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {t("Tạo sẵn các bài còn thiếu", "Generate missing Deep-Dives")}
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
