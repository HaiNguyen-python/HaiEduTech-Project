/**
 * @file CVClinic.tsx
 * @description AI-powered CV review for Data/AI/Language Tech roles in the Nordic market.
 *              Parses PDF/DOCX/TXT client-side, sends text to analyze-cv edge function,
 *              displays structured match score + improvement suggestions.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Upload, FileText, Loader2, Stethoscope, Sparkles, CheckCircle2,
  AlertTriangle, Wrench, Globe2, Copy, RefreshCw, Lock, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

type TargetRole = "ai-engineer" | "data-engineer" | "ml-engineer" | "language-tech" | "custom";

interface CVReview {
  matchScore: number;
  verdict: "strong" | "good" | "needs-work" | "mismatch";
  verdictSummary: string;
  breakdown: {
    technicalSkills: number;
    experience: number;
    projectImpact: number;
    atsKeywords: number;
    structure: number;
  };
  strengths: string[];
  gaps: { skill: string; why: string; howToFix: string }[];
  improvements: { original: string; improved: string; reason: string }[];
  nordicTips: string[];
}

const MAX_BYTES = 5 * 1024 * 1024;

const verdictStyle: Record<CVReview["verdict"], { label: string; color: string; bg: string }> = {
  strong: { label: "Strong fit", color: "text-emerald-600", bg: "from-emerald-500/20 to-green-500/10 border-emerald-500/40" },
  good: { label: "Good fit", color: "text-blue-600", bg: "from-blue-500/20 to-cyan-500/10 border-blue-500/40" },
  "needs-work": { label: "Needs work", color: "text-amber-600", bg: "from-amber-500/20 to-orange-500/10 border-amber-500/40" },
  mismatch: { label: "Mismatch", color: "text-rose-600", bg: "from-rose-500/20 to-red-500/10 border-rose-500/40" },
};

const breakdownLabels: Record<keyof CVReview["breakdown"], string> = {
  technicalSkills: "Technical Skills",
  experience: "Experience Relevance",
  projectImpact: "Project Impact",
  atsKeywords: "ATS Keywords",
  structure: "Structure & Clarity",
};

async function parsePdf(file: File): Promise<string> {
  const pdfjs: any = await import("pdfjs-dist");
  // @ts-ignore — Vite worker import
  const workerSrc = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
  pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
  const buf = await file.arrayBuffer();
  const doc = await pdfjs.getDocument({ data: buf }).promise;
  let text = "";
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((it: any) => it.str).join(" ") + "\n";
  }
  return text.trim();
}

async function parseDocx(file: File): Promise<string> {
  const mammoth = await import("mammoth/mammoth.browser");
  const buf = await file.arrayBuffer();
  const result = await (mammoth as any).extractRawText({ arrayBuffer: buf });
  return (result.value || "").trim();
}

const CVClinic = () => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cvText, setCvText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [parsing, setParsing] = useState(false);
  const [targetRole, setTargetRole] = useState<TargetRole>("data-engineer");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState<CVReview | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file: File) => {
    if (file.size > MAX_BYTES) {
      toast.error(t("File quá lớn (tối đa 5MB)", "File too large (max 5MB)"));
      return;
    }
    setParsing(true);
    setFileName(file.name);
    try {
      let text = "";
      const lower = file.name.toLowerCase();
      if (lower.endsWith(".pdf")) text = await parsePdf(file);
      else if (lower.endsWith(".docx")) text = await parseDocx(file);
      else if (lower.endsWith(".txt")) text = await file.text();
      else {
        toast.error(t("Chỉ hỗ trợ PDF, DOCX, TXT", "Only PDF, DOCX, TXT supported"));
        setFileName(null);
        return;
      }
      if (!text || text.length < 100) {
        toast.error(t("Không trích xuất được nội dung CV", "Could not extract enough text from CV"));
        setFileName(null);
        return;
      }
      setCvText(text.slice(0, 15000));
      toast.success(t("Đã đọc CV thành công", "CV parsed successfully"));
    } catch (e) {
      console.error(e);
      toast.error(t("Lỗi khi đọc file", "Failed to parse file"));
      setFileName(null);
    } finally {
      setParsing(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleAnalyze = async () => {
    if (cvText.trim().length < 100) {
      toast.error(t("CV cần ít nhất 100 ký tự", "CV must be at least 100 characters"));
      return;
    }
    setLoading(true);
    setReview(null);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-cv", {
        body: {
          cvText: cvText.trim(),
          targetRole,
          jobDescription: jobDescription.trim() || undefined,
        },
      });
      if (error) {
        const ctx: any = (error as any).context;
        if (ctx?.status === 429) toast.error(t("Quá nhiều yêu cầu, thử lại sau", "Too many requests, try again shortly"));
        else if (ctx?.status === 402) toast.error(t("Hết credits AI", "AI credits exhausted"));
        else toast.error(error.message || t("Lỗi phân tích CV", "Failed to analyze CV"));
        return;
      }
      if (!data?.review) {
        toast.error(t("Phản hồi AI không hợp lệ", "Invalid AI response"));
        return;
      }
      setReview(data.review as CVReview);
      toast.success(t("Phân tích hoàn tất!", "Analysis complete!"));
    } catch (e) {
      console.error(e);
      toast.error(t("Lỗi không xác định", "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!review) return;
    const md = [
      `# CV Clinic Report — ${verdictStyle[review.verdict].label} (${review.matchScore}/100)`,
      ``,
      `**Verdict:** ${review.verdictSummary}`,
      ``,
      `## Score Breakdown`,
      ...Object.entries(review.breakdown).map(
        ([k, v]) => `- ${breakdownLabels[k as keyof CVReview["breakdown"]]}: ${v}/20`,
      ),
      ``,
      `## ✅ Strengths`,
      ...review.strengths.map((s) => `- ${s}`),
      ``,
      `## ⚠️ Gaps`,
      ...review.gaps.map((g) => `- **${g.skill}** — ${g.why}\n  → Fix: ${g.howToFix}`),
      ``,
      `## 🔧 Improvements`,
      ...review.improvements.map(
        (i) => `**Before:** ${i.original}\n**After:** ${i.improved}\n_Reason: ${i.reason}_`,
      ),
      ``,
      `## 🎯 Nordic Market Tips`,
      ...review.nordicTips.map((tip) => `- ${tip}`),
    ].join("\n");
    navigator.clipboard.writeText(md);
    toast.success(t("Đã sao chép báo cáo", "Report copied"));
  };

  const reset = () => {
    setReview(null);
    setCvText("");
    setFileName(null);
    setJobDescription("");
  };

  return (
    <div className="space-y-6">
      {/* Intro */}
      <Card className="p-5 border-primary/30 bg-gradient-to-r from-primary/5 to-emerald-500/5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-white shrink-0">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-lg mb-1">
              🩺 {t("Phòng khám CV", "CV Clinic")}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {t(
                "Tải CV lên để AI rà soát mức độ phù hợp với vị trí Data / AI / Language Tech tại thị trường Bắc Âu (Phần Lan).",
                "Upload your CV and let AI assess its fit for Data / AI / Language Tech roles in the Nordic (Finland) market.",
              )}
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-background/60 px-2 py-1 rounded">
              <Lock className="w-3 h-3" />
              {t("CV của bạn chỉ được phân tích thời gian thực, không lưu trữ.", "Your CV is processed in real-time and never stored.")}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT: Input */}
        <Card className="p-5 space-y-4">
          <h4 className="font-display font-semibold flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            {t("Bước 1: Tải hoặc dán CV", "Step 1: Upload or paste your CV")}
          </h4>

          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
            {parsing ? (
              <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                {t("Đang đọc file...", "Parsing file...")}
              </div>
            ) : fileName ? (
              <div className="flex items-center justify-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-primary" />
                <span className="font-medium">{fileName}</span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setFileName(null); setCvText(""); }}
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium mb-1">
                  {t("Kéo thả file vào đây hoặc click để chọn", "Drag & drop file here, or click to browse")}
                </p>
                <p className="text-xs text-muted-foreground">PDF, DOCX, TXT (max 5MB)</p>
              </>
            )}
          </div>

          <div className="text-xs text-center text-muted-foreground">
            — {t("hoặc dán text", "or paste text")} —
          </div>

          <Textarea
            placeholder={t("Dán nội dung CV của bạn vào đây...", "Paste your CV text here...")}
            value={cvText}
            onChange={(e) => setCvText(e.target.value.slice(0, 15000))}
            className="min-h-[180px] text-sm font-mono"
          />
          <div className="text-xs text-muted-foreground text-right">
            {cvText.length} / 15,000 {t("ký tự", "chars")}
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t("Bước 2: Chọn vị trí mục tiêu", "Step 2: Target role")}
            </label>
            <Select value={targetRole} onValueChange={(v) => setTargetRole(v as TargetRole)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="data-engineer">🔄 Data Engineer</SelectItem>
                <SelectItem value="ai-engineer">🧠 AI Engineer</SelectItem>
                <SelectItem value="ml-engineer">🤖 ML Engineer</SelectItem>
                <SelectItem value="language-tech">🗣️ Language Technology</SelectItem>
                <SelectItem value="custom">✨ Custom (use job description)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Optional JD */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t("Bước 3 (tùy chọn): Mô tả công việc", "Step 3 (optional): Job description")}
            </label>
            <Textarea
              placeholder={t(
                "Dán job description để AI match chính xác hơn...",
                "Paste a job description for a more precise match...",
              )}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value.slice(0, 8000))}
              className="min-h-[100px] text-sm"
            />
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={loading || parsing || cvText.trim().length < 100}
            className="w-full bg-gradient-to-r from-primary to-emerald-500 text-white"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t("AI đang phân tích...", "AI is analyzing...")}
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                {t("Phân tích CV", "Analyze CV")}
              </>
            )}
          </Button>
        </Card>

        {/* RIGHT: Result */}
        <Card className="p-5">
          {!review && !loading && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center text-muted-foreground">
              <Stethoscope className="w-12 h-12 mb-3 opacity-30" />
              <p className="text-sm">
                {t(
                  "Kết quả phân tích sẽ hiển thị tại đây.",
                  "Your analysis report will appear here.",
                )}
              </p>
            </div>
          )}

          {loading && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center">
              <Loader2 className="w-10 h-10 animate-spin text-primary mb-3" />
              <p className="text-sm font-medium">
                {t("AI đang đọc CV của bạn...", "AI is reading your CV...")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t("Thường mất 10-20 giây", "This usually takes 10-20 seconds")}
              </p>
            </div>
          )}

          {review && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              {/* Score header */}
              <div className={`rounded-lg p-4 bg-gradient-to-br ${verdictStyle[review.verdict].bg} border`}>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className={`${verdictStyle[review.verdict].color} bg-background/60 border-current`}>
                    {verdictStyle[review.verdict].label}
                  </Badge>
                  <div className="text-3xl font-display font-bold">
                    {review.matchScore}<span className="text-base text-muted-foreground">/100</span>
                  </div>
                </div>
                <Progress value={review.matchScore} className="h-2 mb-2" />
                <p className="text-sm">{review.verdictSummary}</p>
              </div>

              {/* Breakdown */}
              <div>
                <h5 className="text-sm font-semibold mb-2">{t("Chi tiết điểm", "Score Breakdown")}</h5>
                <div className="space-y-2">
                  {Object.entries(review.breakdown).map(([k, v]) => (
                    <div key={k}>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{breakdownLabels[k as keyof CVReview["breakdown"]]}</span>
                        <span className="font-medium">{v}/20</span>
                      </div>
                      <Progress value={(v / 20) * 100} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths */}
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
                <h5 className="text-sm font-semibold mb-2 flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> {t("Điểm mạnh", "Strengths")}
                </h5>
                <ul className="space-y-1 text-sm">
                  {review.strengths.map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-emerald-600 shrink-0">✓</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gaps */}
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
                <h5 className="text-sm font-semibold mb-2 flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
                  <AlertTriangle className="w-4 h-4" /> {t("Khoảng trống", "Gaps & Missing Skills")}
                </h5>
                <div className="space-y-2">
                  {review.gaps.map((g, i) => (
                    <div key={i} className="text-sm">
                      <div className="font-semibold">{g.skill}</div>
                      <div className="text-xs text-muted-foreground">{g.why}</div>
                      <div className="text-xs mt-0.5"><span className="font-medium">→ </span>{g.howToFix}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Improvements */}
              <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
                <h5 className="text-sm font-semibold mb-2 flex items-center gap-1.5 text-blue-700 dark:text-blue-400">
                  <Wrench className="w-4 h-4" /> {t("Gợi ý viết lại", "Specific Improvements")}
                </h5>
                <div className="space-y-3">
                  {review.improvements.map((imp, i) => (
                    <div key={i} className="text-xs space-y-1 pb-2 border-b border-border/50 last:border-0 last:pb-0">
                      <div><span className="font-semibold text-rose-600">Before:</span> <span className="line-through opacity-70">{imp.original}</span></div>
                      <div><span className="font-semibold text-emerald-600">After:</span> {imp.improved}</div>
                      <div className="italic text-muted-foreground">💡 {imp.reason}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nordic tips */}
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
                <h5 className="text-sm font-semibold mb-2 flex items-center gap-1.5 text-primary">
                  <Globe2 className="w-4 h-4" /> {t("Mẹo CV thị trường Bắc Âu", "Nordic Market Tips")}
                </h5>
                <ul className="space-y-1 text-sm">
                  {review.nordicTips.map((tip, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="shrink-0">🇫🇮</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button onClick={handleCopy} variant="outline" size="sm" className="flex-1">
                  <Copy className="w-3.5 h-3.5 mr-1.5" /> {t("Sao chép báo cáo", "Copy Report")}
                </Button>
                <Button onClick={reset} variant="outline" size="sm" className="flex-1">
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> {t("Phân tích lại", "Re-analyze")}
                </Button>
              </div>
            </motion.div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CVClinic;
