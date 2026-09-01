/**
 * @file CambridgeWritingLab.tsx
 * @description Writing practice for Cambridge Test Prep. Students pick a level and
 *              a task in the official formats, write their answer, and get AI
 *              marking on the four Cambridge criteria with bilingual feedback and a
 *              model answer to compare against.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PenLine, Sparkles, Loader2, CheckCircle2, BookOpen, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import {
  cambridgeWritingTasksByLevel,
  type CambridgeWritingLevel,
  type CambridgeWritingTask,
} from "@/data/cambridgeWritingTasks";

interface Criterion {
  label: string;
  score: number;
  feedback: string;
  feedbackVi?: string;
}

interface Correction {
  original: string;
  fixed: string;
  why?: string;
  whyVi?: string;
}

interface WritingResult {
  score: number;
  wordCount?: number;
  criteria: Criterion[];
  corrections?: Correction[];
  tips?: string[];
  tipsVi?: string[];
  improvedVersion?: string;
  fastScore?: boolean;
}

const LEVELS: { id: CambridgeWritingLevel; label: string; color: string }[] = [
  { id: "starters", label: "Starters", color: "#FF6B6B" },
  { id: "movers", label: "Movers", color: "#4ECDC4" },
  { id: "flyers", label: "Flyers", color: "#FFA94D" },
  { id: "ket", label: "KET (A2)", color: "#4D96FF" },
  { id: "pet", label: "PET (B1)", color: "#C780FA" },
];

const Stars = ({ score }: { score: number }) => (
  <span className="tracking-tight" aria-label={`${score} / 5`}>
    {"⭐".repeat(Math.max(0, Math.min(5, score)))}
    <span className="opacity-30">{"☆".repeat(Math.max(0, 5 - score))}</span>
  </span>
);

const CambridgeWritingLab = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [level, setLevel] = useState<CambridgeWritingLevel>("starters");
  const [taskId, setTaskId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WritingResult | null>(null);
  const [showSample, setShowSample] = useState(false);

  const tasks = useMemo(() => cambridgeWritingTasksByLevel(level), [level]);
  const task: CambridgeWritingTask | null = useMemo(
    () => tasks.find(item => item.id === taskId) ?? null,
    [tasks, taskId]
  );

  const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;

  const selectLevel = (next: CambridgeWritingLevel) => {
    setLevel(next);
    setTaskId(null);
    setText("");
    setResult(null);
    setShowSample(false);
  };

  const selectTask = (next: CambridgeWritingTask) => {
    setTaskId(next.id);
    setText("");
    setResult(null);
    setShowSample(false);
  };

  const submit = async () => {
    if (!task) return;
    if (words < 4) {
      toast({
        title: t("Bài viết quá ngắn", "Answer too short"),
        description: t("Hãy viết ít nhất một vài câu trước khi nhờ chấm.", "Write at least a few sentences before asking for marking."),
      });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("grade-cambridge-writing", {
        body: {
          level: task.level,
          kind: task.kind,
          prompt: task.prompt,
          bullets: task.bullets,
          text: text.trim(),
          minWords: task.minWords,
          maxWords: task.maxWords,
        },
      });
      if (error) throw error;
      if (data?.error) {
        toast({
          title: t("Chưa chấm được", "Marking unavailable"),
          description: t("Hệ thống AI đang quá tải, hãy thử lại sau ít phút.", "The AI service is busy. Please try again in a few minutes."),
          variant: "destructive",
        });
        return;
      }
      setResult(data as WritingResult);
      setShowSample(true);
    } catch {
      toast({
        title: t("Lỗi kết nối", "Connection error"),
        description: t("Không gửi được bài viết. Hãy kiểm tra mạng và thử lại.", "Could not send your answer. Check your connection and try again."),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const activeColor = LEVELS.find(l => l.id === level)?.color ?? "#4D96FF";

  return (
    <section className="container mx-auto px-4 py-8">
      <Card className="p-5 md:p-7 border-2 border-white/70 bg-white/85 backdrop-blur-sm shadow-lg rounded-3xl">
        <div className="flex items-start gap-3 mb-5">
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#4D96FF] to-[#6BCB77] shadow-md">
            <PenLine className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-800">
              {t("Luyện Viết Cambridge ✍️", "Cambridge Writing Practice ✍️")}
            </h2>
            <p className="text-slate-600" style={{ fontSize: "16px", lineHeight: "1.6" }}>
              {t(
                "Bài viết đúng dạng đề thật của từng cấp, chấm theo 4 tiêu chí Cambridge, nhận xét song ngữ và có bài mẫu để đối chiếu.",
                "Real exam formats for each level, marked on the four Cambridge criteria with bilingual feedback and a model answer."
              )}
            </p>
          </div>
        </div>

        {/* Level picker */}
        <div className="flex flex-wrap gap-2 mb-5">
          {LEVELS.map(item => (
            <button
              key={item.id}
              onClick={() => selectLevel(item.id)}
              className="px-4 py-2 rounded-full text-sm font-bold border-2 transition-colors"
              style={
                level === item.id
                  ? { background: item.color, borderColor: item.color, color: "#fff" }
                  : { borderColor: `${item.color}66`, color: "#334155", background: "#fff" }
              }
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Task picker */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          {tasks.map(item => (
            <button
              key={item.id}
              onClick={() => selectTask(item)}
              className={`text-left p-4 rounded-2xl border-2 transition-all ${
                taskId === item.id ? "border-[#4D96FF] bg-[#EEF6FF] shadow-md" : "border-slate-200 bg-white hover:border-[#4D96FF]/50"
              }`}
            >
              <Badge variant="secondary" className="mb-2 text-[11px] uppercase tracking-wide">
                {item.kind.replace(/-/g, " ")}
              </Badge>
              <div className="font-bold text-slate-800" style={{ fontSize: "16px" }}>
                {t(item.titleVi, item.title)}
              </div>
              <div className="text-slate-600 mt-1" style={{ fontSize: "15px" }}>
                {item.minWords}-{item.maxWords} {t("từ", "words")}
              </div>
            </button>
          ))}
        </div>

        {task && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-5 lg:grid-cols-2">
            {/* Prompt */}
            <div className="p-4 rounded-2xl border-2 border-slate-200 bg-white">
              <h3 className="font-bold text-slate-800 mb-2" style={{ fontSize: "17px" }}>
                {t("Đề bài", "Task")}
              </h3>
              <p className="text-slate-700 whitespace-pre-wrap" style={{ fontSize: "16px", lineHeight: "1.65" }}>
                {t(task.promptVi, task.prompt)}
              </p>
              <h4 className="font-bold text-slate-800 mt-4 mb-1" style={{ fontSize: "16px" }}>
                {t("Cần có trong bài", "You must include")}
              </h4>
              <ul className="list-disc pl-5 text-slate-700 space-y-1" style={{ fontSize: "16px" }}>
                {(t("vi", "en") === "vi" ? task.bulletsVi : task.bullets).map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div className="mt-4 p-3 rounded-xl bg-[#FFF8E7] border border-[#F9A826]/40">
                <div className="flex items-center gap-2 font-bold text-[#8a5a00] mb-1" style={{ fontSize: "15px" }}>
                  <Lightbulb className="w-4 h-4" /> {t("Từ và cấu trúc gợi ý", "Useful language")}
                </div>
                <div className="text-slate-700" style={{ fontSize: "15px" }}>{task.usefulLanguage.join(" • ")}</div>
              </div>
            </div>

            {/* Editor */}
            <div className="p-4 rounded-2xl border-2 border-slate-200 bg-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-800" style={{ fontSize: "17px" }}>
                  {t("Bài viết của em", "Your answer")}
                </h3>
                <span
                  className="text-sm font-semibold"
                  style={{ color: words < task.minWords ? "#b45309" : words > task.maxWords ? "#b91c1c" : "#15803d" }}
                >
                  {words} / {task.minWords}-{task.maxWords} {t("từ", "words")}
                </span>
              </div>
              <Textarea
                value={text}
                onChange={e => setText(e.target.value)}
                rows={10}
                placeholder={t("Viết bài của em ở đây...", "Write your answer here...")}
                className="resize-y"
                style={{ fontSize: "16px", lineHeight: "1.7" }}
              />
              <div className="flex flex-wrap gap-2 mt-3">
                <Button onClick={submit} disabled={loading} style={{ background: activeColor }} className="text-white">
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                  {loading ? t("Đang chấm...", "Marking...") : t("Nhờ AI chấm bài", "Mark my writing")}
                </Button>
                <Button variant="outline" onClick={() => setShowSample(v => !v)}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  {showSample ? t("Ẩn bài mẫu", "Hide model answer") : t("Xem bài mẫu", "Show model answer")}
                </Button>
              </div>

              {showSample && (
                <div className="mt-4 p-3 rounded-xl bg-[#F1FFF3] border border-[#6BCB77]/50">
                  <div className="font-bold text-[#166534] mb-1" style={{ fontSize: "15px" }}>
                    {t("Bài mẫu đúng cấp độ", "Model answer at this level")}
                  </div>
                  <p className="text-slate-700 whitespace-pre-wrap" style={{ fontSize: "16px", lineHeight: "1.7" }}>
                    {task.sampleAnswer}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Result */}
        {result && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 md:p-5 rounded-2xl border-2 border-[#4D96FF]/40 bg-[#F7FBFF]">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-[#15803d]" />
              <div className="font-bold text-slate-800" style={{ fontSize: "18px" }}>
                {t("Kết quả chấm", "Marking result")}: <Stars score={result.score} /> ({result.score}/5)
              </div>
              {result.fastScore && (
                <Badge variant="secondary">{t("Chấm nhanh", "Quick score")}</Badge>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {result.criteria.map(c => (
                <div key={c.label} className="p-3 rounded-xl bg-white border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-800" style={{ fontSize: "16px" }}>{c.label}</span>
                    <Stars score={c.score} />
                  </div>
                  <p className="text-slate-700" style={{ fontSize: "15px", lineHeight: "1.6" }}>{c.feedback}</p>
                  {c.feedbackVi && (
                    <p className="text-slate-600 mt-1 italic" style={{ fontSize: "15px", lineHeight: "1.6" }}>{c.feedbackVi}</p>
                  )}
                </div>
              ))}
            </div>

            {result.corrections && result.corrections.length > 0 && (
              <div className="mt-4">
                <h4 className="font-bold text-slate-800 mb-2" style={{ fontSize: "16px" }}>
                  {t("Lỗi cần sửa", "Fix these")}
                </h4>
                <ul className="space-y-2">
                  {result.corrections.map((c, i) => (
                    <li key={i} className="p-3 rounded-xl bg-white border border-slate-200" style={{ fontSize: "15px" }}>
                      <span className="line-through text-[#b91c1c]">{c.original}</span>{" "}
                      <span className="font-semibold text-[#15803d]">{c.fixed}</span>
                      {c.why && <div className="text-slate-700 mt-1">{c.why}</div>}
                      {c.whyVi && <div className="text-slate-600 italic">{c.whyVi}</div>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(result.tips?.length || result.tipsVi?.length) && (
              <div className="mt-4 p-3 rounded-xl bg-[#FFF8E7] border border-[#F9A826]/40">
                <div className="font-bold text-[#8a5a00] mb-1" style={{ fontSize: "15px" }}>
                  {t("Bước tiếp theo", "Next steps")}
                </div>
                <ul className="list-disc pl-5 text-slate-700 space-y-1" style={{ fontSize: "15px" }}>
                  {(t("vi", "en") === "vi" ? result.tipsVi ?? result.tips ?? [] : result.tips ?? []).map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.improvedVersion && (
              <div className="mt-4 p-3 rounded-xl bg-white border border-[#6BCB77]/50">
                <div className="font-bold text-[#166534] mb-1" style={{ fontSize: "15px" }}>
                  {t("Bài của em sau khi nâng cấp", "Your answer, upgraded")}
                </div>
                <p className="text-slate-700 whitespace-pre-wrap" style={{ fontSize: "16px", lineHeight: "1.7" }}>
                  {result.improvedVersion}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </Card>
    </section>
  );
};

export default CambridgeWritingLab;
