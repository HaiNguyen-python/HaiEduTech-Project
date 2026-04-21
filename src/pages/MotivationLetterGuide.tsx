/**
 * @file MotivationLetterGuide.tsx
 * @description Interactive guide for the Master's motivation letter + AI drafter + downloadable template.
 */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText, Sparkles, Download, CheckCircle2, XCircle, Loader2, Copy, ChevronRight,
  BookOpen, FilePlus2, GraduationCap, Lock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import MotivationLetterDrafts from "@/components/study-profile/MotivationLetterDrafts";
import { SAMPLE_LETTERS, type SampleLetter } from "@/data/motivationLetterSamples";

interface LetterInput {
  fullName: string;
  programName: string;
  university: string;
  country: string;
  fieldOfStudy: string;
  gpa: string;
  background: string;
  careerGoal: string;
}

const MotivationLetterGuide = () => {
  const { t, lang } = useLanguage();
  const [input, setInput] = useState<LetterInput>({
    fullName: "", programName: "", university: "", country: "",
    fieldOfStudy: "", gpa: "", background: "", careerGoal: "",
  });
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState("");

  const PARAGRAPHS = [
    {
      n: 1, title: t("Mở bài & Hook", "Introduction & Hook"),
      desc: t("Mở bằng câu chuyện hoặc khoảnh khắc định hình. Nêu rõ chương trình & trường.", "Open with a defining moment. State the program & university clearly."),
      words: "60-90",
    },
    {
      n: 2, title: t("Nền tảng học vấn", "Academic Background"),
      desc: t("Tóm tắt bằng cấp, GPA, môn học chính, thesis. Diễn giải, không nhắc lại CV.", "Summarize degree, GPA, key courses, thesis. Interpret, don't repeat CV."),
      words: "90-120",
    },
    {
      n: 3, title: t("Vì sao chương trình này", "Why This Program"),
      desc: t("Nêu 2-3 môn học/giáo sư/lab cụ thể. Vì sao chính trường này phù hợp.", "Name 2-3 specific courses, professors, or labs. Why this exact university."),
      words: "100-130",
    },
    {
      n: 4, title: t("Mục tiêu nghề nghiệp", "Career Goals"),
      desc: t("Ngắn hạn (job đầu tiên) + dài hạn (5-10 năm). Chương trình là cây cầu.", "Short-term (first job) + long-term (5-10y). The degree is the bridge."),
      words: "90-120",
    },
    {
      n: 5, title: t("Kết bài", "Conclusion"),
      desc: t("Khẳng định lại sự phù hợp, cảm ơn, kết câu mạnh.", "Reaffirm fit, thank the committee, close with confidence."),
      words: "40-60",
    },
  ];

  const DOS = [
    t("Cụ thể với từng trường — đổi tên trường/program cho mỗi đơn", "Be specific to each school — change school/program name per application"),
    t("Đề cập tên giáo sư, lab, hoặc môn học cụ thể", "Mention specific professors, labs, or courses"),
    t("Dùng số liệu định lượng cho thành tích", "Quantify your achievements with numbers"),
    t("Giữ giọng văn tự tin, chuyên nghiệp", "Keep tone confident and professional"),
    t("Giới hạn 1 trang A4 (~500 từ)", "Limit to 1 A4 page (~500 words)"),
  ];
  const DONTS = [
    t("Quá chung chung — copy-paste cho nhiều trường", "Too generic — copy-pasted across schools"),
    t("Lặp lại CV thay vì diễn giải nó", "Repeating the CV instead of interpreting it"),
    t("Nói về điểm yếu hoặc đổ lỗi cho ai đó", "Mentioning weaknesses or blaming others"),
    t("Dùng câu trích dẫn nổi tiếng làm mở bài", "Opening with a famous quote"),
    t("Dùng \"my dream since childhood\" — quá sáo rỗng", "Using \"my dream since childhood\" — too cliché"),
  ];

  const handleDraft = async () => {
    if (!input.programName || !input.university || !input.fieldOfStudy) {
      toast({
        title: t("Thiếu thông tin", "Missing info"),
        description: t("Cần ít nhất: tên chương trình, trường, ngành học", "Need at least: program, university, field"),
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setLetter("");
    try {
      const { data, error } = await supabase.functions.invoke("draft-motivation-letter", {
        body: { ...input, language: lang },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setLetter((data as any).letter || "");
      setTimeout(() => document.getElementById("ai-output")?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (e: any) {
      toast({ title: t("Lỗi", "Error"), description: e?.message || "AI failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const copyLetter = () => {
    navigator.clipboard.writeText(letter);
    toast({ title: t("Đã sao chép", "Copied") });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 lg:pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-400 text-xs font-semibold mb-4">
              <FileText className="w-3.5 h-3.5" />
              {t("Hướng dẫn chuyên sâu", "Master Class")}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
              {t("Mastering the Motivation Letter", "Mastering the Motivation Letter")}
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              {t("Công thức 5 đoạn vàng + AI viết bản nháp đầu tiên cá nhân hoá trong 30 giây.", "The 5-paragraph golden formula + a personalized AI first draft in 30 seconds.")}
            </p>
          </motion.div>

          {/* Template download */}
          <Card className="mb-8 bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-950/30 dark:to-indigo-950/30 border-sky-200/60 dark:border-sky-800/40">
            <CardContent className="p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-base mb-1">{t("Template Word chuẩn", "Standard Word Template")}</div>
                <div className="text-sm text-muted-foreground">{t("Tải về và điền theo cấu trúc đã được chứng minh", "Download and fill in the proven structure")}</div>
              </div>
              <a href="/templates/motivation-letter-master.docx" download>
                <Button className="gap-2"><Download className="w-4 h-4" />{t("Tải template (.docx)", "Download .docx")}</Button>
              </a>
            </CardContent>
          </Card>

          {/* Golden formula */}
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" /> {t("Công thức vàng 5 đoạn", "The Golden 5-Paragraph Formula")}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {PARAGRAPHS.map((p) => (
              <motion.div key={p.n} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: p.n * 0.04 }}>
                <Card className="h-full hover:border-primary/40 transition-colors">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0">{p.n}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-bold">{p.title}</h3>
                          <Badge variant="outline" className="text-xs">{p.words}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Dos & Donts */}
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            <Card className="border-emerald-500/30">
              <CardContent className="p-5">
                <h3 className="font-bold text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> {t("NÊN làm", "DO")}
                </h3>
                <ul className="space-y-2">
                  {DOS.map((d, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <ChevronRight className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-red-500/30">
              <CardContent className="p-5">
                <h3 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5" /> {t("KHÔNG nên", "DON'T")}
                </h3>
                <ul className="space-y-2">
                  {DONTS.map((d, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <ChevronRight className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* AI Drafter */}
          <Card className="mb-6 border-primary/30 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{t("Vẽ bản nháp với AI", "Draft with AI")}</h3>
                  <p className="text-xs text-muted-foreground">{t("Perplexity AI sẽ tìm thông tin chương trình & viết letter cá nhân hoá", "Perplexity AI will research the program & write a personalized letter")}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div><Label className="text-xs">{t("Tên đầy đủ", "Full Name")}</Label><Input value={input.fullName} onChange={(e) => setInput({ ...input, fullName: e.target.value })} placeholder="Nguyen Van A" /></div>
                <div><Label className="text-xs">{t("Tên chương trình *", "Program Name *")}</Label><Input value={input.programName} onChange={(e) => setInput({ ...input, programName: e.target.value })} placeholder="MSc Data Science" /></div>
                <div><Label className="text-xs">{t("Trường *", "University *")}</Label><Input value={input.university} onChange={(e) => setInput({ ...input, university: e.target.value })} placeholder="University of Helsinki" /></div>
                <div><Label className="text-xs">{t("Quốc gia", "Country")}</Label><Input value={input.country} onChange={(e) => setInput({ ...input, country: e.target.value })} placeholder="Finland" /></div>
                <div><Label className="text-xs">{t("Ngành học *", "Field of Study *")}</Label><Input value={input.fieldOfStudy} onChange={(e) => setInput({ ...input, fieldOfStudy: e.target.value })} placeholder="Data Science / NLP" /></div>
                <div><Label className="text-xs">GPA</Label><Input value={input.gpa} onChange={(e) => setInput({ ...input, gpa: e.target.value })} placeholder="3.5/4.0" /></div>
              </div>
              <div className="mt-3"><Label className="text-xs">{t("Nền tảng học vấn & thành tích", "Academic background & achievements")}</Label>
                <Textarea rows={3} value={input.background} onChange={(e) => setInput({ ...input, background: e.target.value })}
                  placeholder={t("BSc CS tại HUST, GPA 3.6, thesis về NLP, Top 5% lớp, intern tại VinAI...", "BSc CS at HUST, GPA 3.6, NLP thesis, top 5% of class, intern at VinAI...")} />
              </div>
              <div className="mt-3"><Label className="text-xs">{t("Mục tiêu nghề nghiệp", "Career goals")}</Label>
                <Textarea rows={2} value={input.careerGoal} onChange={(e) => setInput({ ...input, careerGoal: e.target.value })}
                  placeholder={t("Trở thành ML Engineer tại Bắc Âu, sau đó về VN xây startup AI giáo dục", "Become ML Engineer in Nordic region, then return to VN to build an EdTech AI startup")} />
              </div>

              <Button className="mt-4 w-full sm:w-auto gap-2" onClick={handleDraft} disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {t("Tạo bản nháp", "Generate Draft")}
              </Button>
            </CardContent>
          </Card>

          {letter && (
            <Card id="ai-output" className="border-emerald-500/40">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold flex items-center gap-2"><Sparkles className="w-5 h-5 text-emerald-500" />{t("Bản nháp AI", "AI Draft")}</h3>
                  <Button size="sm" variant="outline" onClick={copyLetter} className="gap-2"><Copy className="w-4 h-4" />{t("Sao chép", "Copy")}</Button>
                </div>
                <div className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/30 rounded-lg p-4 max-h-[600px] overflow-y-auto">{letter}</div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MotivationLetterGuide;
