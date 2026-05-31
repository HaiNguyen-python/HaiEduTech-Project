/**
 * @file InterviewPrep.tsx
 * @description Admission interview prep with Perplexity AI - generate program-specific
 * questions and get feedback on candidate answers.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, MessageSquare, Sparkles, Loader2, MicVocal, ChevronDown, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Q { q: string; category: string; why: string; model_answer_outline: string; }
interface Feedback { score: number; strengths: string[]; weaknesses: string[]; improved_answer: string; follow_up_question: string; }

const InterviewPrep = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [setup, setSetup] = useState({ university: "", program: "", level: "Master's" });
  const [loadingQ, setLoadingQ] = useState(false);
  const [questions, setQuestions] = useState<Q[]>([]);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [practice, setPractice] = useState<{ idx: number; answer: string } | null>(null);
  const [loadingFb, setLoadingFb] = useState(false);
  const [feedback, setFeedback] = useState<Record<number, Feedback>>({});

  const generate = async () => {
    if (!setup.university || !setup.program) {
      toast({ title: t("Cần nhập trường & chương trình", "Enter university & program") });
      return;
    }
    setLoadingQ(true); setQuestions([]);
    try {
      const { data, error } = await supabase.functions.invoke("interview-prep-ai", {
        body: { mode: "questions", ...setup, language: "vi" },
      });
      if (error) throw error;
      setQuestions(data?.questions || []);
    } catch (e: any) {
      toast({ title: t("Lỗi", "Error"), description: e.message, variant: "destructive" });
    } finally { setLoadingQ(false); }
  };

  const getFeedback = async (idx: number) => {
    if (!practice || practice.answer.trim().length < 30) {
      toast({ title: t("Câu trả lời quá ngắn", "Answer too short") });
      return;
    }
    setLoadingFb(true);
    try {
      const { data, error } = await supabase.functions.invoke("interview-prep-ai", {
        body: { mode: "feedback", ...setup, question: questions[idx].q, answer: practice.answer, language: "vi" },
      });
      if (error) throw error;
      setFeedback((f) => ({ ...f, [idx]: data as Feedback }));
    } catch (e: any) {
      toast({ title: t("Lỗi", "Error"), description: e.message, variant: "destructive" });
    } finally { setLoadingFb(false); }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Interview Prep AI - HaiEduTech" description="Luyện phỏng vấn nhập học với AI Perplexity: câu hỏi đặc thù theo trường + chấm điểm câu trả lời." path="/study-abroad/interview-prep" />
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 pt-28 lg:pt-32 pb-16">
        <Link to="/study-abroad" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronLeft className="w-4 h-4" /> {t("Quay lại Cổng du học", "Back to Study Abroad")}
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{t("Interview Prep AI", "Interview Prep AI")}</h1>
              <p className="text-sm text-muted-foreground">
                {t("AI tạo bộ 10 câu hỏi phỏng vấn riêng cho trường & ngành bạn ứng tuyển - kèm chấm điểm câu trả lời.", "AI generates 10 program-specific questions + scores your answers.")}
              </p>
            </div>
          </div>

          <Card className="mb-6">
            <CardContent className="p-5 grid sm:grid-cols-3 gap-3">
              <div>
                <Label>{t("Trường", "University")}</Label>
                <Input placeholder="Aalto University" value={setup.university} onChange={(e) => setSetup({ ...setup, university: e.target.value })} />
              </div>
              <div>
                <Label>{t("Chương trình", "Program")}</Label>
                <Input placeholder="MSc Computer Science" value={setup.program} onChange={(e) => setSetup({ ...setup, program: e.target.value })} />
              </div>
              <div>
                <Label>{t("Bậc", "Level")}</Label>
                <Input value={setup.level} onChange={(e) => setSetup({ ...setup, level: e.target.value })} />
              </div>
              <Button onClick={generate} disabled={loadingQ} className="sm:col-span-3">
                {loadingQ ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Sparkles className="w-4 h-4 mr-1" />}
                {t("Tạo 10 câu hỏi phỏng vấn", "Generate 10 questions")}
              </Button>
            </CardContent>
          </Card>

          {questions.length > 0 && (
            <div className="space-y-2">
              {questions.map((q, i) => {
                const open = openIdx === i;
                const fb = feedback[i];
                return (
                  <Card key={i} className="overflow-hidden">
                    <button onClick={() => { setOpenIdx(open ? null : i); setPractice(open ? null : { idx: i, answer: "" }); }}
                      className="w-full text-left p-4 flex items-start gap-3 hover:bg-accent/30">
                      <Badge variant="outline" className="shrink-0 mt-0.5">{q.category}</Badge>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{q.q}</p>
                      </div>
                      <ChevronDown className={`w-4 h-4 mt-1 transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>
                    {open && (
                      <div className="px-4 pb-4 border-t border-border/60 space-y-3 pt-3">
                        <div className="text-xs text-muted-foreground">
                          <p className="font-semibold text-foreground mb-1">{t("Vì sao họ hỏi", "Why they ask")}</p>
                          <p>{q.why}</p>
                        </div>
                        <div className="text-xs">
                          <p className="font-semibold mb-1">{t("Khung trả lời gợi ý", "Model answer outline")}</p>
                          <p className="whitespace-pre-wrap text-foreground/80">{q.model_answer_outline}</p>
                        </div>
                        <div>
                          <Label className="text-xs flex items-center gap-1">
                            <MicVocal className="w-3 h-3" /> {t("Câu trả lời của bạn", "Your answer")}
                          </Label>
                          <Textarea rows={4} placeholder={t("Nhập 100–200 từ…", "Type 100–200 words…")}
                            value={practice?.answer || ""}
                            onChange={(e) => setPractice({ idx: i, answer: e.target.value })} />
                          <Button size="sm" className="mt-2" onClick={() => getFeedback(i)} disabled={loadingFb}>
                            {loadingFb ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 mr-1" />}
                            {t("Chấm điểm AI", "AI Score")}
                          </Button>
                        </div>
                        {fb && (
                          <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 space-y-2 text-xs">
                            <div className="flex items-center gap-2">
                              <Badge className={fb.score >= 75 ? "bg-emerald-500" : fb.score >= 55 ? "bg-amber-500" : "bg-rose-500"}>
                                Score {fb.score}/100
                              </Badge>
                            </div>
                            <div>
                              <p className="font-semibold flex items-center gap-1 text-emerald-600"><CheckCircle2 className="w-3 h-3" />{t("Điểm mạnh", "Strengths")}</p>
                              <ul className="list-disc list-inside text-foreground/80">{fb.strengths.map((s, k) => <li key={k}>{s}</li>)}</ul>
                            </div>
                            <div>
                              <p className="font-semibold flex items-center gap-1 text-rose-600"><AlertCircle className="w-3 h-3" />{t("Cần cải thiện", "Improvements")}</p>
                              <ul className="list-disc list-inside text-foreground/80">{fb.weaknesses.map((s, k) => <li key={k}>{s}</li>)}</ul>
                            </div>
                            <div>
                              <p className="font-semibold mb-0.5">{t("Câu trả lời tốt hơn", "Improved answer")}</p>
                              <p className="whitespace-pre-wrap text-foreground/80">{fb.improved_answer}</p>
                            </div>
                            <div>
                              <p className="font-semibold mb-0.5">{t("Follow-up có thể gặp", "Likely follow-up")}</p>
                              <p className="italic text-foreground/80">{fb.follow_up_question}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InterviewPrep;
