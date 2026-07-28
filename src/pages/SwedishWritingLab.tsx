/**
 * @file SwedishWritingLab.tsx
 * @description /swedish/writing — YKI Ruotsi Skriva practice studio.
 *              Pick a prompt by A1/A2/B1, draft in a textarea and get
 *              AI-graded feedback via the grade-swedish-yki edge function.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useMemo, useState } from "react";
import SwedishHeroBanner from "@/components/swedish/SwedishHeroBanner";
import FloatingNordicParticles from "@/components/FloatingNordicParticles";
import { motion } from "framer-motion";
import {
  PencilLine, Sparkles, Loader2, CheckCircle2, AlertCircle, Lightbulb,
  BookOpen, ChevronDown, ChevronUp,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { logStudentActivity } from "@/hooks/useActivityLogger";
import {
  SWEDISH_WRITING_PROMPTS,
  type SwedishWritingPrompt,
} from "@/data/swedishWritingPrompts";
import type { SwedishLevel } from "@/data/swedishWritingPrompts";
import { SWEDISH_SAMPLE_ESSAYS } from "@/data/swedishSampleEssays";

interface GradeResult {
  overall: number;
  ykiLevel: string;
  criteria: { label: string; score: number; feedback: string }[];
  errors: { original: string; correction: string; note: string }[];
  highlights: string[];
  nextSteps: string[];
}

const LEVELS: SwedishLevel[] = ["A1", "A2", "B1"];

const SwedishWritingLab = () => {
  const { t } = useLanguage();
  const [level, setLevel] = useState<SwedishLevel>("A1");
  const [activeId, setActiveId] = useState<string>(SWEDISH_WRITING_PROMPTS[0].id);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [showSample, setShowSample] = useState(false);

  const prompts = useMemo(
    () => SWEDISH_WRITING_PROMPTS.filter((p) => p.level === level),
    [level],
  );
  const active: SwedishWritingPrompt =
    prompts.find((p) => p.id === activeId) || prompts[0];

  const wordCount = draft.trim() ? draft.trim().split(/\s+/).filter(Boolean).length : 0;

  const onPickLevel = (lvl: SwedishLevel) => {
    setLevel(lvl);
    const first = SWEDISH_WRITING_PROMPTS.find((p) => p.level === lvl);
    if (first) setActiveId(first.id);
    setResult(null);
    setShowSample(false);
  };

  const onSubmit = async () => {
    if (draft.trim().length < 10) {
      toast({
        title: t("Bài quá ngắn", "Too short"),
        description: t("Hãy viết ít nhất một câu hoàn chỉnh.", "Please write at least one full sentence."),
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("grade-swedish-yki", {
        body: {
          mode: "writing",
          level: active.level,
          prompt: active.taskSv,
          text: draft,
        },
      });
      if (error) throw error;
      setResult(data as GradeResult);
      // Log Swedish writing attempt for analytics.
      const graded = data as GradeResult;
      void logStudentActivity({
        activityType: "swedish_writing",
        activityId: active.id,
        score: Number(graded?.overall) || 0,
        maxScore: 5,
        domain: "english",
        metadata: { level: active.level, wordCount, ykiLevel: graded?.ykiLevel },
      });
      toast({
        title: t("Đã chấm xong", "Graded"),
        description: t("Cuộn xuống xem phản hồi.", "Scroll down to see feedback."),
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      toast({ title: t("Lỗi", "Error"), description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-background">
      <FloatingNordicParticles variant="swedish" />
      <SEO
        title="Swedish Writing Lab — Skriva YKI Ruotsi A1–B1 | HaiEduTech"
        description="Luyện viết tiếng Thụy Điển theo chuẩn YKI Ruotsi A1, A2, B1. Đề viết thực tế + chấm AI cho 4 tiêu chí (Task, Vocabulary, Grammar, Coherence)."
        path="/swedish/writing"
      />
      <Navbar />
      <main className="pt-24 lg:pt-28">
        <SwedishHeroBanner pickKey="SwedishWritingLab" compact />
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <PencilLine className="w-5 h-5 text-primary" />
              <Badge variant="outline" className="border-primary/30 text-primary">
                {t("YKI Ruotsi · Skriva", "YKI Ruotsi · Skriva")}
              </Badge>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">
              ✍️ {t("Swedish Writing Lab", "Swedish Writing Lab")}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t(
                "Chọn cấp độ YKI, viết bài theo đề, AI sẽ chấm theo 4 tiêu chí và trích lỗi cụ thể.",
                "Pick a YKI level, write to the prompt, and the AI grades 4 criteria with concrete error feedback.",
              )}
            </p>
          </header>

          {/* Level tabs */}
          <Tabs value={level} onValueChange={(v) => onPickLevel(v as SwedishLevel)} className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              {LEVELS.map((lvl) => (
                <TabsTrigger key={lvl} value={lvl}>{lvl}</TabsTrigger>
              ))}
            </TabsList>
            {LEVELS.map((lvl) => (
              <TabsContent key={lvl} value={lvl} className="mt-4 space-y-2">
                {prompts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { setActiveId(p.id); setResult(null); setShowSample(false); }}
                    className={`w-full text-left rounded-lg border p-3 transition ${
                      p.id === activeId
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="font-semibold text-sm text-foreground">{p.titleVi}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{p.titleEn}</div>
                  </button>
                ))}
              </TabsContent>
            ))}
          </Tabs>

          {/* Prompt card */}
          <Card className="mb-6 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-3">
                <span className="text-base sm:text-lg">{active.titleVi}</span>
                <Badge>{active.level}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg bg-muted/50 p-3 text-sm leading-relaxed">
                <div className="font-semibold text-foreground mb-1">🇸🇪 {active.taskSv}</div>
                <div className="text-muted-foreground">🇻🇳 {active.taskVi}</div>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <Badge variant="secondary">
                  {t("Độ dài", "Length")}: {active.minWords}–{active.maxWords} {t("từ", "words")}
                </Badge>
                <Badge variant="secondary">
                  💡 {t("Mẹo", "Tip")}: {active.tipVi}
                </Badge>
              </div>
              <div>
                <div className="text-xs font-semibold text-muted-foreground mb-1">
                  {t("Câu mở đầu gợi ý", "Starter phrases")}
                </div>
                <ul className="space-y-1">
                  {active.starters.map((s, i) => (
                    <li key={i} className="text-sm text-foreground/90 flex items-start gap-2">
                      <Lightbulb className="w-3.5 h-3.5 mt-0.5 text-amber-500 shrink-0" />
                      <span className="italic">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Sample essay toggle */}
          {(() => {
            const sample = SWEDISH_SAMPLE_ESSAYS.find((s) => s.id === active.id);
            if (!sample) return null;
            return (
              <Card className="mb-6 border-amber-500/20 bg-amber-500/5">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-600" />
                      {t("Bài viết mẫu tham khảo", "Sample answer for reference")}
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSample((v) => !v)}
                      className="gap-1"
                    >
                      {showSample ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          {t("Thu gọn", "Collapse")}
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          {t("Xem bài mẫu", "View sample")}
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                {showSample && (
                  <CardContent className="space-y-4 pt-0">
                    <div className="rounded-lg bg-card border p-3 text-sm leading-relaxed whitespace-pre-wrap font-mono text-foreground/90">
                      {sample.essaySv}
                    </div>
                    <div className="rounded-lg bg-muted/40 p-3 text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                      {sample.essayVi}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline">
                        {sample.wordCount} {t("từ", "words")}
                      </Badge>
                      <Badge variant="secondary" className="text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30">
                        {t("Mẫu đạt điểm cao", "High-scoring model")}
                      </Badge>
                    </div>
                    {sample.grammarNotes.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                          {t("Ghi chú ngữ pháp", "Grammar notes")}
                        </h4>
                        <ul className="space-y-2">
                          {sample.grammarNotes.map((g, i) => (
                            <li key={i} className="text-xs bg-card border rounded-md p-2">
                              <span className="font-semibold text-foreground">{g.label}</span>
                              <span className="block text-muted-foreground mt-0.5">{g.noteVi}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {sample.highlights.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                          ✨ {t("Điểm hay", "Highlights")}
                        </h4>
                        <ul className="list-disc list-inside text-xs text-foreground/90 space-y-1">
                          {sample.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            );
          })()}

          {/* Textarea */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-base">
                  {t("Bài viết của bạn", "Your draft")}
                </CardTitle>
                <span className="text-xs text-muted-foreground">
                  {wordCount} / {active.maxWords} {t("từ", "words")}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={t(
                  "Viết bài của bạn bằng tiếng Thụy Điển ở đây…",
                  "Write your Swedish response here…",
                )}
                className="min-h-[200px] font-mono text-sm leading-relaxed"
              />
              <Button onClick={onSubmit} disabled={loading} className="w-full gap-2" size="lg">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t("AI đang chấm…", "AI grading…")}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    {t("Chấm bài bằng AI", "Grade with AI")}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Result */}
          {result && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-emerald-500/40 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>{t("Kết quả YKI", "YKI Result")}</span>
                    <Badge className="ml-auto text-base bg-emerald-600">
                      {result.overall?.toFixed(1)} / 5
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {result.criteria?.map((c) => (
                      <div key={c.label} className="rounded-lg border bg-card p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-sm">{c.label}</span>
                          <Badge variant="outline">{c.score?.toFixed(1)}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{c.feedback}</p>
                      </div>
                    ))}
                  </div>

                  {result.errors?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-500" />
                        {t("Lỗi cụ thể", "Specific errors")}
                      </h3>
                      <ul className="space-y-2">
                        {result.errors.map((er, i) => (
                          <li key={i} className="rounded-lg bg-rose-500/5 border border-rose-500/20 p-3 text-sm">
                            <div className="text-rose-700 dark:text-rose-300 line-through">{er.original}</div>
                            <div className="text-emerald-700 dark:text-emerald-300 font-semibold">→ {er.correction}</div>
                            <div className="text-xs text-muted-foreground mt-1">{er.note}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.highlights?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-sm mb-2">✨ {t("Điểm hay", "Highlights")}</h3>
                      <ul className="list-disc list-inside text-sm text-foreground/90 space-y-1">
                        {result.highlights.map((h, i) => <li key={i}>{h}</li>)}
                      </ul>
                    </div>
                  )}

                  {result.nextSteps?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-sm mb-2">🎯 {t("Bước tiếp theo", "Next steps")}</h3>
                      <ul className="list-disc list-inside text-sm text-foreground/90 space-y-1">
                        {result.nextSteps.map((n, i) => <li key={i}>{n}</li>)}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SwedishWritingLab;
