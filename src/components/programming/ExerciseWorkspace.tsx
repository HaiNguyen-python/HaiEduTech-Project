/**
 * @file ExerciseWorkspace.tsx
 * @description Code input area + AI hints + AI-generated exercise-specific sample answer.
 */
import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, RotateCcw, Copy, Check, Lightbulb, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import CodeBlock from "@/components/CodeBlock";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Props {
  lessonId: string;
  /** Exercise prompt text used to generate exercise-specific hints + sample. */
  exercise?: string;
  /** Reference code from the lesson theory (used as style hint + fallback sample). */
  sampleCode: string;
  language?: string;
}

interface HelperData {
  approach: string;
  hints: string[];
  sample: string;
}

const ExerciseWorkspace = ({ lessonId, exercise = "", sampleCode, language = "python" }: Props) => {
  const { t } = useLanguage();
  const storageKey = `exercise-draft:${lessonId}`;
  // Draft is stored together with the key it belongs to, so a lesson change can
  // never write the previous lesson's code into the new lesson's slot.
  const [draft, setDraft] = useState<{ key: string; code: string }>(() => ({
    key: storageKey,
    code: localStorage.getItem(storageKey) ?? "",
  }));
  const code = draft.key === storageKey ? draft.code : "";
  const setCode = (value: string) => setDraft({ key: storageKey, code: value });
  const [showSample, setShowSample] = useState(false);
  const [copied, setCopied] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);

  // AI helper state
  const [helper, setHelper] = useState<HelperData | null>(null);
  const [helperLoading, setHelperLoading] = useState(false);
  const [revealedHints, setRevealedHints] = useState(0);
  const [showApproach, setShowApproach] = useState(false);
  const fetchingRef = useRef(false);

  // Load this lesson's own draft whenever the lesson changes, so the previous
  // lesson's code never leaks into (or overwrites) the new exercise.
  const loadedKeyRef = useRef(storageKey);
  useEffect(() => {
    loadedKeyRef.current = storageKey;
    setCode(localStorage.getItem(storageKey) ?? "");
  }, [storageKey]);

  useEffect(() => {
    // Skip the render that still holds the previous lesson's code.
    if (loadedKeyRef.current !== storageKey) return;
    localStorage.setItem(storageKey, code);
  }, [code, storageKey]);

  // Reset helper when exercise changes (e.g. navigating to next lesson)
  useEffect(() => {
    setHelper(null);
    setRevealedHints(0);
    setShowApproach(false);
    setShowSample(false);
    fetchingRef.current = false;
  }, [lessonId]);

  const ensureHelper = async (): Promise<HelperData | null> => {
    if (helper) return helper;
    if (fetchingRef.current) return null;
    if (!exercise) return null;
    fetchingRef.current = true;
    setHelperLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("exercise-helper", {
        body: { exercise, language, referenceCode: sampleCode },
      });
      if (error) throw error;
      const next: HelperData = {
        approach: data?.approach || "",
        hints: Array.isArray(data?.hints) ? data.hints : [],
        sample: data?.sample || "",
      };
      setHelper(next);
      return next;
    } catch (e) {
      toast.error(t("Không lấy được gợi ý, vui lòng thử lại.", "Could not load hints, please retry."));
      return null;
    } finally {
      setHelperLoading(false);
      fetchingRef.current = false;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = e.currentTarget;
      const s = ta.selectionStart;
      const en = ta.selectionEnd;
      const next = code.substring(0, s) + "    " + code.substring(en);
      setCode(next);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = s + 4;
      });
    }
  };

  const handleReset = () => {
    if (code && !confirm(t("Xoá toàn bộ code đã viết?", "Clear your code?"))) return;
    setCode("");
  };

  const effectiveSample = helper?.sample?.trim() || sampleCode;

  const handleCopySample = async () => {
    await navigator.clipboard.writeText(effectiveSample);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleHintClick = async () => {
    const data = await ensureHelper();
    if (!data) return;
    if (!showApproach) {
      setShowApproach(true);
      return;
    }
    if (revealedHints < data.hints.length) {
      setRevealedHints((n) => n + 1);
    }
  };

  const handleShowSample = async () => {
    if (!showSample) {
      await ensureHelper(); // best-effort; falls back to lesson code on failure
    }
    setShowSample((v) => !v);
  };

  const hintLabel = !showApproach
    ? t("Gợi ý cách tiếp cận", "Show approach")
    : revealedHints < (helper?.hints.length ?? 3)
      ? t(`Hiện gợi ý ${revealedHints + 1}`, `Reveal hint ${revealedHints + 1}`)
      : t("Đã hiện hết gợi ý", "All hints shown");

  return (
    <div className="mt-4 space-y-3">
      {/* Editor */}
      <div className="rounded-xl border-2 border-amber-500/30 overflow-hidden bg-[#1e1f29]">
        <div className="flex items-center justify-between px-3 py-2 bg-[#282a36] border-b border-[#44475a]">
          <span className="text-xs font-mono text-[#bd93f9]">
            ✍️ {t("Khung code của bạn", "Your code")} ({language})
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleReset}
            className="h-7 text-xs text-[#f8f8f2] hover:bg-[#44475a] hover:text-white"
          >
            <RotateCcw className="w-3 h-3 mr-1" /> {t("Xoá", "Clear")}
          </Button>
        </div>
        <textarea
          ref={taRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          placeholder={t(
            "// Viết code của bạn ở đây...\n// Nhấn Tab để thụt dòng.",
            "// Write your solution here...\n// Press Tab to indent.",
          )}
          className="w-full min-h-[200px] max-h-[420px] p-4 bg-[#1e1f29] text-[#f8f8f2] font-mono text-sm leading-relaxed resize-y outline-none caret-[#ff79c6] placeholder:text-[#6272a4]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        />
      </div>

      {/* Action bar */}
      <div className="flex flex-wrap items-center gap-2">
        {exercise && (
          <Button
            size="sm"
            onClick={handleHintClick}
            disabled={helperLoading || (showApproach && revealedHints >= (helper?.hints.length ?? 3))}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-sm"
          >
            {helperLoading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Lightbulb className="w-4 h-4 mr-1" />}
            {hintLabel}
          </Button>
        )}
        <Button
          size="sm"
          onClick={handleShowSample}
          disabled={helperLoading}
          className="bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white shadow-sm"
        >
          {helperLoading && !showSample ? (
            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
          ) : showSample ? (
            <EyeOff className="w-4 h-4 mr-1" />
          ) : (
            <Eye className="w-4 h-4 mr-1" />
          )}
          {showSample ? t("Ẩn đáp án mẫu", "Hide sample answer") : t("Xem đáp án mẫu", "Show sample answer")}
        </Button>
        {showSample && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopySample}
            className="text-xs border-emerald-500/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/15 hover:text-emerald-800 dark:hover:text-emerald-100"
          >
            {copied ? <Check className="w-3.5 h-3.5 mr-1 text-green-500" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
            {copied ? t("Đã chép", "Copied") : t("Chép đáp án", "Copy sample")}
          </Button>
        )}
        <span className="text-xs text-muted-foreground ml-auto">
          💡 {t("Code được lưu tự động trên trình duyệt.", "Your code is auto-saved in your browser.")}
        </span>
      </div>

      {/* Approach + tiered hints */}
      {showApproach && helper && (
        <div className="rounded-xl border-2 border-amber-400/40 bg-amber-50 dark:bg-amber-950/30 p-4 space-y-2">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-200 font-semibold text-sm">
            <Sparkles className="w-4 h-4" />
            {t("Cách tiếp cận", "Approach")}
          </div>
          <p className="text-sm text-amber-900 dark:text-amber-100">{helper.approach}</p>
          {revealedHints > 0 && (
            <ol className="list-decimal pl-5 space-y-1.5 mt-2 text-sm text-amber-900 dark:text-amber-100">
              {helper.hints.slice(0, revealedHints).map((h, i) => (
                <li key={i}>
                  <span className="font-medium">{t(`Gợi ý ${i + 1}:`, `Hint ${i + 1}:`)}</span> {h}
                </li>
              ))}
            </ol>
          )}
        </div>
      )}

      {/* Sample answer */}
      {showSample && (
        <div className="rounded-xl border-2 border-emerald-500/30 overflow-hidden">
          <div className="px-3 py-2 bg-emerald-500/10 border-b border-emerald-500/20 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            ✅ {helper?.sample
              ? t("Đáp án mẫu cho đề bài này", "Sample answer for this exercise")
              : t("Đáp án mẫu để tham khảo (theo bài học)", "Reference sample answer (from lesson)")}
          </div>
          <CodeBlock code={effectiveSample} language={language} />
        </div>
      )}
    </div>
  );
};

export default ExerciseWorkspace;
