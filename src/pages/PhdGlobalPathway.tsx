/**
 * @file PhdGlobalPathway.tsx
 * @description PhD scholarship strategy - country guides + research proposal + AI cold email generator.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap, FileText, Mail, Sparkles, Loader2, Copy, Download, Globe2, ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const PhdGlobalPathway = () => {
  const { t, lang } = useLanguage();
  const [emailInput, setEmailInput] = useState({
    studentName: "", professorName: "", university: "", researchArea: "",
    paperOrProject: "", masterThesis: "", achievement: "", intakeYear: "Fall 2026",
  });
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailDraft, setEmailDraft] = useState("");

  const COUNTRIES = [
    {
      id: "europe",
      name: t("Châu Âu", "Europe"),
      gradient: "from-sky-500 to-blue-600",
      flag: "🇪🇺",
      strategy: t("Tìm \"vacancy\" cụ thể (project-based PhD)", "Find specific 'vacancies' (project-based PhDs)"),
      tips: [
        t("Tìm trên Academic Positions, EURAXESS, FindAPhD", "Search Academic Positions, EURAXESS, FindAPhD"),
        t("Hà Lan/Đức/Bắc Âu: PhD = nhân viên hợp đồng (có lương)", "Netherlands/Germany/Nordic: PhD = paid employee"),
        t("Apply trực tiếp vào project đã có sẵn supervisor", "Apply directly to projects with assigned supervisor"),
        t("Cần CV + Motivation + thường KHÔNG cần research proposal", "Need CV + Motivation; usually NO research proposal required"),
      ],
    },
    {
      id: "us",
      name: t("Mỹ / Canada", "USA / Canada"),
      gradient: "from-red-500 to-rose-600",
      flag: "🇺🇸",
      strategy: t("Cold email giáo sư + GRE/TOEFL", "Cold email professors + GRE/TOEFL"),
      tips: [
        t("PhD = chương trình 5-6 năm, có funding qua TA/RA", "PhD = 5-6 year program, funded via TA/RA"),
        t("Bắt buộc cold email supervisor TRƯỚC khi apply", "Must cold email supervisor BEFORE applying"),
        t("GRE: nhiều trường đã optional sau 2024", "GRE: optional at many schools post-2024"),
        t("TOEFL >100 hoặc IELTS >7.0", "TOEFL >100 or IELTS >7.0"),
        t("Statement of Purpose + 3 LoR", "Statement of Purpose + 3 LoRs"),
      ],
    },
    {
      id: "australia",
      name: t("Úc", "Australia"),
      gradient: "from-amber-500 to-orange-600",
      flag: "🇦🇺",
      strategy: t("Research Proposal + RTP scholarship", "Research Proposal + RTP scholarship"),
      tips: [
        t("Cần Research Proposal mạnh (5-10 trang)", "Strong Research Proposal required (5-10 pages)"),
        t("Tìm supervisor có cùng hướng nghiên cứu trước", "Find supervisor with matching research first"),
        t("Apply RTP (Research Training Program) - full funding", "Apply RTP (Research Training Program) - full funding"),
        t("Group of Eight (Go8): Melbourne, ANU, Sydney, UNSW...", "Group of Eight (Go8): Melbourne, ANU, Sydney, UNSW..."),
        t("IELTS >6.5 (overall), no band <6.0", "IELTS >6.5 (overall), no band <6.0"),
      ],
    },
  ];

  const handleGenerateEmail = async () => {
    if (!emailInput.professorName || !emailInput.researchArea) {
      toast({ title: t("Thiếu thông tin", "Missing"), description: t("Cần tên giáo sư & lĩnh vực", "Need professor name & area"), variant: "destructive" });
      return;
    }
    setEmailLoading(true);
    setEmailDraft("");
    try {
      const { data, error } = await supabase.functions.invoke("draft-cold-email", {
        body: { ...emailInput, language: lang },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setEmailDraft((data as any).email || "");
      setTimeout(() => document.getElementById("email-output")?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (e: any) {
      toast({ title: t("Lỗi", "Error"), description: e?.message || "AI failed", variant: "destructive" });
    } finally {
      setEmailLoading(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(emailDraft);
    toast({ title: t("Đã sao chép", "Copied") });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 lg:pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-700 dark:text-violet-400 text-xs font-semibold mb-4">
              <GraduationCap className="w-3.5 h-3.5" />
              {t("Chiến lược học bổng Tiến sĩ", "PhD Strategy Hub")}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              {t("PhD Global Pathway", "PhD Global Pathway")}
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              {t("Hướng dẫn theo từng quốc gia + Research Proposal + AI sinh email cold gửi giáo sư.", "Country-specific strategy + Research Proposal + AI Cold Email generator.")}
            </p>
          </motion.div>

          {/* Templates */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <Card className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/30 dark:to-fuchsia-950/30 border-violet-200/60 dark:border-violet-800/40">
              <CardContent className="p-5 flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold mb-1">{t("Research Proposal Template", "Research Proposal Template")}</div>
                  <div className="text-xs text-muted-foreground">{t("Cấu trúc 7 phần chuẩn quốc tế", "International 7-section structure")}</div>
                </div>
                <a href="/templates/research-proposal-phd.docx" download>
                  <Button size="sm" className="gap-2"><Download className="w-4 h-4" />.docx</Button>
                </a>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/30 dark:to-orange-950/30 border-rose-200/60 dark:border-rose-800/40">
              <CardContent className="p-5 flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold mb-1">{t("Cold Email Template", "Cold Email Template")}</div>
                  <div className="text-xs text-muted-foreground">{t("Mẫu email gửi giáo sư + tips", "Email template + tips")}</div>
                </div>
                <a href="/templates/cold-email-supervisor.docx" download>
                  <Button size="sm" className="gap-2"><Download className="w-4 h-4" />.docx</Button>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Country guides */}
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <Globe2 className="w-6 h-6 text-violet-500" /> {t("Chiến lược theo quốc gia", "Country-Specific Strategy")}
          </h2>
          <Tabs defaultValue="europe" className="mb-12">
            <TabsList className="grid grid-cols-3 w-full max-w-lg mb-4">
              {COUNTRIES.map((c) => (
                <TabsTrigger key={c.id} value={c.id} className="gap-1.5">
                  <span>{c.flag}</span>
                  <span className="hidden sm:inline">{c.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            {COUNTRIES.map((c) => (
              <TabsContent key={c.id} value={c.id}>
                <Card className="overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${c.gradient}`} />
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-4xl">{c.flag}</div>
                      <div>
                        <h3 className="text-xl font-bold">{c.name}</h3>
                        <Badge className="mt-1 bg-primary/10 text-primary border-primary/30">{c.strategy}</Badge>
                      </div>
                    </div>
                    <ul className="space-y-2.5">
                      {c.tips.map((tip, i) => (
                        <li key={i} className="flex gap-2 text-sm">
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          {/* AI Cold Email */}
          <Card className="border-primary/30 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-rose-500 to-orange-600 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{t("AI Cold Email Generator", "AI Cold Email Generator")}</h3>
                  <p className="text-xs text-muted-foreground">{t("Soạn email gửi giáo sư chuyên nghiệp trong 30 giây", "Craft a professional supervisor email in 30 seconds")}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div><Label className="text-xs">{t("Tên của em", "Your Name")}</Label><Input value={emailInput.studentName} onChange={(e) => setEmailInput({ ...emailInput, studentName: e.target.value })} /></div>
                <div><Label className="text-xs">{t("Tên giáo sư *", "Professor Name *")}</Label><Input value={emailInput.professorName} onChange={(e) => setEmailInput({ ...emailInput, professorName: e.target.value })} placeholder="Prof. Smith" /></div>
                <div><Label className="text-xs">{t("Trường", "University")}</Label><Input value={emailInput.university} onChange={(e) => setEmailInput({ ...emailInput, university: e.target.value })} /></div>
                <div><Label className="text-xs">{t("Lĩnh vực nghiên cứu *", "Research Area *")}</Label><Input value={emailInput.researchArea} onChange={(e) => setEmailInput({ ...emailInput, researchArea: e.target.value })} placeholder="Graph Neural Networks" /></div>
                <div className="sm:col-span-2"><Label className="text-xs">{t("Bài báo / project cụ thể của giáo sư", "Specific paper/project to reference")}</Label><Input value={emailInput.paperOrProject} onChange={(e) => setEmailInput({ ...emailInput, paperOrProject: e.target.value })} placeholder='"GNNs for protein folding (Nature 2024)"' /></div>
                <div className="sm:col-span-2"><Label className="text-xs">{t("Đề tài thesis Master của em", "Your Master thesis topic")}</Label><Input value={emailInput.masterThesis} onChange={(e) => setEmailInput({ ...emailInput, masterThesis: e.target.value })} /></div>
                <div className="sm:col-span-2"><Label className="text-xs">{t("Thành tích định lượng", "Quantitative achievement")}</Label><Input value={emailInput.achievement} onChange={(e) => setEmailInput({ ...emailInput, achievement: e.target.value })} placeholder='"improved baseline by 12%"' /></div>
                <div><Label className="text-xs">{t("Kỳ nhập học", "Intake")}</Label><Input value={emailInput.intakeYear} onChange={(e) => setEmailInput({ ...emailInput, intakeYear: e.target.value })} /></div>
              </div>

              <Button className="mt-4 gap-2" onClick={handleGenerateEmail} disabled={emailLoading}>
                {emailLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {t("Soạn email", "Generate Email")}
              </Button>
            </CardContent>
          </Card>

          {emailDraft && (
            <Card id="email-output" className="mt-6 border-emerald-500/40">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold flex items-center gap-2"><Mail className="w-5 h-5 text-emerald-500" />{t("Email AI đã soạn", "AI Drafted Email")}</h3>
                  <Button size="sm" variant="outline" onClick={copyEmail} className="gap-2"><Copy className="w-4 h-4" />{t("Sao chép", "Copy")}</Button>
                </div>
                <div className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/30 rounded-lg p-4">{emailDraft}</div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PhdGlobalPathway;
