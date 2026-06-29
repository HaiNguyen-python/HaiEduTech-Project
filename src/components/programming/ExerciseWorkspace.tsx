/**
 * @file ExerciseWorkspace.tsx
 * @description Code input area + collapsible sample answer for Practice Exercise.
 */
import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, RotateCcw, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import CodeBlock from "@/components/CodeBlock";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  lessonId: string;
  sampleCode: string;
  language?: string;
}

const ExerciseWorkspace = ({ lessonId, sampleCode, language = "python" }: Props) => {
  const { t } = useLanguage();
  const storageKey = `exercise-draft:${lessonId}`;
  const [code, setCode] = useState<string>(() => localStorage.getItem(storageKey) ?? "");
  const [showSample, setShowSample] = useState(false);
  const [copied, setCopied] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    localStorage.setItem(storageKey, code);
  }, [code, storageKey]);

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

  const handleCopySample = async () => {
    await navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

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
            className="h-7 text-xs text-[#f8f8f2] hover:bg-[#44475a]"
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

      {/* Sample answer toggle */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowSample((v) => !v)}
          className="border-amber-500/40 text-amber-700 dark:text-amber-300 hover:bg-amber-500/10"
        >
          {showSample ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
          {showSample ? t("Ẩn đáp án mẫu", "Hide sample answer") : t("Xem đáp án mẫu", "Show sample answer")}
        </Button>
        {showSample && (
          <Button size="sm" variant="ghost" onClick={handleCopySample} className="text-xs">
            {copied ? <Check className="w-3.5 h-3.5 mr-1 text-green-500" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
            {copied ? t("Đã chép", "Copied") : t("Chép đáp án", "Copy sample")}
          </Button>
        )}
        <span className="text-xs text-muted-foreground ml-auto">
          💡 {t("Code được lưu tự động trên trình duyệt của bạn.", "Your code is auto-saved in your browser.")}
        </span>
      </div>

      {showSample && (
        <div className="rounded-xl border-2 border-green-500/30 overflow-hidden">
          <div className="px-3 py-2 bg-green-500/10 border-b border-green-500/20 text-xs font-semibold text-green-700 dark:text-green-300">
            ✅ {t("Đáp án mẫu để tham khảo", "Sample answer for reference")}
          </div>
          <CodeBlock code={sampleCode} language={language} />
        </div>
      )}
    </div>
  );
};

export default ExerciseWorkspace;
