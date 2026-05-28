/**
 * @file PhdProposalBuilder.tsx
 * @description 7-step AI-assisted PhD research proposal wizard.
 *              Each step auto-saves to localStorage; final step assembles
 *              the full proposal with copy + .md download.
 */
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileText, Sparkles, Loader2, Copy, Download, ChevronLeft, ChevronRight, Check,
  Activity, FileSearch, ExternalLink, X,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { scoreProposal, buildProposalDocxBlob } from "@/lib/phdProposalScore";

const STORAGE_KEY = "phd-hub-proposal-draft";

interface StepDef {
  id: string;
  titleVi: string;
  titleEn: string;
  hintVi: string;
  hintEn: string;
  exampleVi: string;
  exampleEn: string;
  placeholderVi: string;
  placeholderEn: string;
}

const STEPS: StepDef[] = [
  {
    id: "title",
    titleVi: "1. Tiêu đề luận án",
    titleEn: "1. Dissertation Title",
    hintVi: "Một câu, 10–15 từ, có biến độc lập + biến phụ thuộc + phạm vi.",
    hintEn: "One sentence, 10–15 words, with independent + dependent variable + scope.",
    exampleVi: "Ví dụ: 'Tác động của GNN attention lên độ chính xác dự đoán protein folding ở nhiệt độ thấp.'",
    exampleEn: "Example: 'The Impact of GNN Attention on Protein Folding Prediction Accuracy at Low Temperatures.'",
    placeholderVi: "Nhập tiêu đề đề tài của em…",
    placeholderEn: "Enter your dissertation title…",
  },
  {
    id: "background",
    titleVi: "2. Bối cảnh nghiên cứu (Background)",
    titleEn: "2. Background & Context",
    hintVi: "150–250 từ. Vì sao chủ đề này quan trọng NGAY BÂY GIỜ? Trích ít nhất 2 paper gần đây.",
    hintEn: "150–250 words. Why this matters NOW? Cite at least 2 recent papers.",
    exampleVi: "Ví dụ: 'Kể từ AlphaFold (2021), …'",
    exampleEn: "Example: 'Since AlphaFold (2021), …'",
    placeholderVi: "Viết phần background…",
    placeholderEn: "Write the background…",
  },
  {
    id: "question",
    titleVi: "3. Câu hỏi nghiên cứu",
    titleEn: "3. Research Question(s)",
    hintVi: "1–3 câu hỏi rõ ràng, đo lường được, có hypothesis kèm theo.",
    hintEn: "1–3 clear, measurable research questions with hypotheses.",
    exampleVi: "RQ1: Liệu kiến trúc X có cải thiện metric Y so với baseline Z không?",
    exampleEn: "RQ1: Does architecture X improve metric Y over baseline Z?",
    placeholderVi: "RQ1: …\nRQ2: …",
    placeholderEn: "RQ1: …\nRQ2: …",
  },
  {
    id: "gap",
    titleVi: "4. Lỗ hổng trong literature",
    titleEn: "4. Literature Gap",
    hintVi: "Chỉ ra 1–2 điều mà nghiên cứu hiện tại CHƯA giải quyết được.",
    hintEn: "Identify 1–2 things current research has NOT solved.",
    exampleVi: "Hiện tại chưa có nghiên cứu nào kết hợp X với Y ở quy mô Z.",
    exampleEn: "No current work combines X with Y at scale Z.",
    placeholderVi: "Mô tả lỗ hổng…",
    placeholderEn: "Describe the gap…",
  },
  {
    id: "methodology",
    titleVi: "5. Phương pháp nghiên cứu",
    titleEn: "5. Methodology",
    hintVi: "Dataset, mô hình, baseline so sánh, metric đánh giá, thiết kế thí nghiệm.",
    hintEn: "Dataset, model, baselines, evaluation metrics, experimental design.",
    exampleVi: "Sử dụng dataset Z; so sánh với baseline A, B; đánh giá bằng F1 + nDCG@10.",
    exampleEn: "Use dataset Z; compare against baselines A, B; evaluate with F1 + nDCG@10.",
    placeholderVi: "Trình bày phương pháp…",
    placeholderEn: "Outline your methodology…",
  },
  {
    id: "timeline",
    titleVi: "6. Lộ trình 3–4 năm",
    titleEn: "6. 3–4 Year Timeline",
    hintVi: "Chia theo năm: Y1 coursework + literature; Y2 thí nghiệm; Y3 viết; Y4 bảo vệ.",
    hintEn: "Break down by year: Y1 coursework + lit review; Y2 experiments; Y3 writing; Y4 defense.",
    exampleVi: "Y1: …\nY2: …\nY3: …\nY4: …",
    exampleEn: "Y1: …\nY2: …\nY3: …\nY4: …",
    placeholderVi: "Year 1: …",
    placeholderEn: "Year 1: …",
  },
  {
    id: "contribution",
    titleVi: "7. Đóng góp dự kiến",
    titleEn: "7. Expected Contribution",
    hintVi: "Output cụ thể: paper, dataset, framework, ứng dụng thực tế.",
    hintEn: "Concrete outputs: papers, datasets, frameworks, real-world applications.",
    exampleVi: "Dự kiến 2 paper top-tier + 1 open-source toolkit.",
    exampleEn: "Expected 2 top-tier papers + 1 open-source toolkit.",
    placeholderVi: "Đóng góp dự kiến…",
    placeholderEn: "Expected contributions…",
  },
  {
    id: "references",
    titleVi: "8. References & nguồn tham khảo",
    titleEn: "8. References & Sources",
    hintVi: "Liệt kê 8–15 nguồn theo APA (Tác giả, Năm). Dùng các keyword bên dưới để tra Google Scholar.",
    hintEn: "List 8–15 sources in APA style (Author, Year). Use the keywords below to search Google Scholar.",
    exampleVi: "Vaswani, A., Shazeer, N., Parmar, N. et al. (2017). Attention Is All You Need. NeurIPS.",
    exampleEn: "Vaswani, A., Shazeer, N., Parmar, N. et al. (2017). Attention Is All You Need. NeurIPS.",
    placeholderVi: "Vaswani, A. et al. (2017). …\nGoodfellow, I. et al. (2014). …",
    placeholderEn: "Vaswani, A. et al. (2017). …\nGoodfellow, I. et al. (2014). …",
  },
];

/** Build 5 search-keyword chips from the topic for the references step. */
const buildKeywordSuggestions = (topic: string, titleDraft: string): string[] => {
  const base = (topic || titleDraft || "research").trim();
  const root = base.replace(/["'.,]/g, "").slice(0, 80);
  const stems = [
    root,
    `${root} review`,
    `${root} state of the art`,
    `${root} benchmark dataset`,
    `${root} systematic literature review`,
  ];
  return Array.from(new Set(stems.filter(Boolean))).slice(0, 5);
};

const PhdProposalBuilder = () => {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState(0);
  const [drafts, setDrafts] = useState<string[]>(() => new Array(STEPS.length).fill(""));
  const [topic, setTopic] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.drafts) && parsed.drafts.length === STEPS.length) {
          setDrafts(parsed.drafts);
          if (typeof parsed.topic === "string") setTopic(parsed.topic);
        }
      }
    } catch { /* ignore */ }
  }, []);

  const updateDraft = (i: number, value: string) => {
    setDrafts((prev) => {
      const next = [...prev];
      next[i] = value;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ drafts: next, topic }));
      return next;
    });
  };

  const saveTopic = (value: string) => {
    setTopic(value);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ drafts, topic: value }));
  };

  const handleAiSuggest = async () => {
    const current = STEPS[step];
    const ctxTopic = topic || drafts[0];
    if (!ctxTopic) {
      toast({
        title: t("Cần tiêu đề trước", "Need a topic first"),
        description: t("Hãy điền tiêu đề ở bước 1 hoặc ô đề tài bên trên.",
          "Please fill in step 1 title or the topic field above."),
        variant: "destructive",
      });
      return;
    }
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("draft-research-proposal-section", {
        body: {
          section: current.id,
          topic: ctxTopic,
          context: drafts.slice(0, step).join("\n\n"),
          language: lang,
        },
      });
      if (error) throw error;
      const suggestion = (data as any)?.suggestion;
      if (!suggestion) throw new Error("Empty response");
      updateDraft(step, drafts[step] ? `${drafts[step]}\n\n${suggestion}` : suggestion);
      toast({ title: t("AI đã gợi ý xong", "AI suggestion ready") });
    } catch (e: any) {
      toast({
        title: t("Lỗi AI", "AI Error"),
        description: e?.message || "Failed",
        variant: "destructive",
      });
    } finally {
      setAiLoading(false);
    }
  };

  const assembleFull = () => {
    const header = `# ${drafts[0] || topic || t("Đề cương nghiên cứu Tiến sĩ", "PhD Research Proposal")}\n\n`;
    return header + STEPS.slice(1).map((s, i) => {
      const body = drafts[i + 1].trim();
      return `## ${t(s.titleVi, s.titleEn)}\n\n${body || t("(chưa hoàn thành)", "(not completed)")}`;
    }).join("\n\n");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(assembleFull());
    toast({ title: t("Đã sao chép proposal", "Proposal copied") });
  };

  const handleDownloadMd = () => {
    const blob = new Blob([assembleFull()], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "phd-research-proposal.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadDocx = () => {
    const title = drafts[0] || topic || t("Đề cương nghiên cứu Tiến sĩ", "PhD Research Proposal");
    const blob = buildProposalDocxBlob(title, assembleFull());
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "phd-research-proposal.doc";
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: t("Đã xuất Word", "Word file exported") });
  };

  const fullText = useMemo(() => drafts.join("\n\n"), [drafts]);
  const health = useMemo(() => scoreProposal(fullText), [fullText]);
  const keywordChips = useMemo(() => buildKeywordSuggestions(topic, drafts[0]), [topic, drafts]);
  const isRefStep = STEPS[step]?.id === "references";

  const filledCount = drafts.filter((d) => d.trim().length > 30).length;
  const pct = Math.round((filledCount / STEPS.length) * 100);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const scoreColor = health.total >= 80
    ? "from-emerald-500 to-teal-600"
    : health.total >= 50
      ? "from-amber-500 to-orange-500"
      : "from-rose-500 to-red-500";

  return (
    <Card className="mt-12 border-violet-300 dark:border-violet-800 shadow-xl">
      <CardContent className="p-5 md:p-6">
        <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold">
                  {t("AI Research Proposal Builder", "AI Research Proposal Builder")}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {t("7 bước có hướng dẫn + AI gợi ý từng phần",
                    "7 guided steps with AI suggestion per section")}
                </p>
              </div>
            </div>
          </div>
          <Badge className="bg-violet-500/15 text-violet-700 dark:text-violet-400 border-violet-500/30">
            {filledCount}/{STEPS.length} · {pct}%
          </Badge>
        </div>

        <Progress value={pct} className="mb-5 h-2" />

        <div className="mb-4">
          <label className="text-xs font-semibold text-muted-foreground">
            {t("Chủ đề chính (giúp AI hiểu ngữ cảnh)", "Main topic (helps AI context)")}
          </label>
          <Input
            value={topic}
            onChange={(e) => saveTopic(e.target.value)}
            placeholder={t("VD: Graph Neural Networks cho protein folding",
              "e.g. Graph Neural Networks for protein folding")}
            className="mt-1"
          />
        </div>

        {/* Step tabs */}
        <div className="overflow-x-auto -mx-1 px-1 mb-4">
          <div className="inline-flex w-max gap-1.5">
            {STEPS.map((s, i) => {
              const filled = drafts[i].trim().length > 30;
              const isActive = i === step;
              return (
                <button
                  key={s.id}
                  onClick={() => setStep(i)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap border transition-colors ${
                    isActive
                      ? "bg-violet-600 text-white border-violet-600"
                      : filled
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
                        : "bg-muted/40 text-muted-foreground border-border"
                  }`}
                >
                  {filled && !isActive && <Check className="w-3 h-3 inline mr-1" />}
                  {t(`B${i + 1}`, `S${i + 1}`)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 rounded-lg bg-violet-50/60 dark:bg-violet-950/20 border border-violet-200/60 dark:border-violet-900/40 mb-3">
          <h4 className="font-bold text-base mb-1">{t(current.titleVi, current.titleEn)}</h4>
          <p className="text-xs text-muted-foreground mb-2">{t(current.hintVi, current.hintEn)}</p>
          <p className="text-xs italic text-violet-700 dark:text-violet-400 whitespace-pre-wrap">
            💡 {t(current.exampleVi, current.exampleEn)}
          </p>
        </div>

        <Textarea
          value={drafts[step]}
          onChange={(e) => updateDraft(step, e.target.value)}
          placeholder={t(current.placeholderVi, current.placeholderEn)}
          className="min-h-[180px] mb-3 text-sm leading-relaxed"
        />

        <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
          <div className="text-xs text-muted-foreground">
            {drafts[step].trim().split(/\s+/).filter(Boolean).length} {t("từ", "words")}
          </div>
          <Button onClick={handleAiSuggest} disabled={aiLoading} size="sm" className="gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 text-white">
            {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {t("AI gợi ý cho tôi", "AI Suggest")}
          </Button>
        </div>

        <div className="flex justify-between gap-2 mb-2">
          <Button variant="outline" size="sm" disabled={step === 0} onClick={() => setStep(step - 1)} className="gap-1">
            <ChevronLeft className="w-4 h-4" /> {t("Trước", "Back")}
          </Button>
          <Button variant="outline" size="sm" disabled={isLast} onClick={() => setStep(step + 1)} className="gap-1">
            {t("Tiếp", "Next")} <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {isLast && (
          <div className="mt-5 p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-sky-50 dark:from-emerald-950/30 dark:to-sky-950/20 border border-emerald-300/60">
            <h4 className="font-bold mb-2 flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              🎓 {t("Sẵn sàng xuất proposal", "Ready to export")}
            </h4>
            <p className="text-xs text-muted-foreground mb-3">
              {t("Em có thể sao chép hoặc tải file .md để mở bằng Word, Notion, Obsidian…",
                "Copy or download as .md to open in Word, Notion, Obsidian…")}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleCopy} size="sm" variant="outline" className="gap-2">
                <Copy className="w-4 h-4" /> {t("Sao chép toàn bộ", "Copy full")}
              </Button>
              <Button onClick={handleDownloadMd} size="sm" className="gap-2">
                <Download className="w-4 h-4" /> {t("Tải .md", "Download .md")}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PhdProposalBuilder;
