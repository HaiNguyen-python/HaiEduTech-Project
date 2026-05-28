/**
 * @file PhdColdEmailStudio.tsx
 * @description Cold Email Studio v2: tone + length + follow-up + health score.
 */
import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Sparkles, Loader2, Copy, CheckCircle2, XCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import PhdOutreachTracker from "./PhdOutreachTracker";

type Tone = "formal" | "friendly" | "concise";
type LengthKey = "short" | "standard" | "detailed";

const LENGTH_TARGETS: Record<LengthKey, { words: number; label: string }> = {
  short: { words: 120, label: "120w" },
  standard: { words: 200, label: "200w" },
  detailed: { words: 280, label: "280w" },
};

interface HealthCheck {
  id: string;
  vi: string;
  en: string;
  passed: boolean;
  tipVi: string;
  tipEn: string;
}

const scoreEmail = (email: string, targetWords: number, paperRef: string): HealthCheck[] => {
  const wordCount = email.trim().split(/\s+/).filter(Boolean).length;
  const lower = email.toLowerCase();
  const hasPaperRef =
    !!paperRef &&
    (lower.includes(paperRef.toLowerCase().split(/\s+/).slice(0, 3).join(" ")) ||
      /\b(your paper|your work|your recent|in your study|your \d{4}|et al\.|nature|science|neurips|icml|cvpr|acl)\b/.test(lower));
  const hasCta = /\b(accepting|taking students|would you be open|could we (schedule|chat)|may i ask|let me know|consider me|happy to (chat|discuss|share))\b/.test(lower);
  const hasNumber = /\d/.test(email) && /(\d+\s?%|\d+\.\d+|gpa|score|rank|top \d+|by \d+|\d+x|\+\d+)/i.test(email);
  const lengthOk = wordCount >= targetWords - 60 && wordCount <= targetWords + 80;

  return [
    {
      id: "ref",
      vi: "Tham chiếu cụ thể công trình của giáo sư",
      en: "Specific reference to professor's work",
      passed: hasPaperRef,
      tipVi: "Trích đích danh tên paper/dự án + năm.",
      tipEn: "Cite the exact paper/project + year.",
    },
    {
      id: "cta",
      vi: "Có CTA rõ ràng (hỏi nhận PhD không)",
      en: "Clear CTA (asking if accepting PhD)",
      passed: hasCta,
      tipVi: "Hỏi thẳng: 'Are you accepting PhD students for Fall 2026?'",
      tipEn: "Ask directly: 'Are you accepting PhD students for Fall 2026?'",
    },
    {
      id: "num",
      vi: "Thành tích định lượng (có số liệu)",
      en: "Quantitative achievement (with numbers)",
      passed: hasNumber,
      tipVi: "Thêm con số: '+12% F1', 'GPA 3.85/4', 'top 5%'.",
      tipEn: "Add a number: '+12% F1', 'GPA 3.85/4', 'top 5%'.",
    },
    {
      id: "len",
      vi: `Độ dài hợp lý (mục tiêu ~${targetWords} từ)`,
      en: `Reasonable length (target ~${targetWords} words)`,
      passed: lengthOk,
      tipVi: `Hiện ${wordCount} từ — chỉnh về gần ${targetWords}.`,
      tipEn: `Now ${wordCount} words — adjust toward ${targetWords}.`,
    },
  ];
};

const PhdColdEmailStudio = () => {
  const { t, lang } = useLanguage();
  const [input, setInput] = useState({
    studentName: "",
    professorName: "",
    university: "",
    researchArea: "",
    paperOrProject: "",
    masterThesis: "",
    achievement: "",
    intakeYear: "Fall 2026",
  });
  const [tone, setTone] = useState<Tone>("formal");
  const [lengthKey, setLengthKey] = useState<LengthKey>("standard");
  const [followUp, setFollowUp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [followUpEmail, setFollowUpEmail] = useState("");

  const update = (k: keyof typeof input, v: string) => setInput((p) => ({ ...p, [k]: v }));

  const handleGenerate = async () => {
    if (!input.professorName || !input.researchArea) {
      toast({
        title: t("Thiếu thông tin", "Missing fields"),
        description: t("Cần tên giáo sư & lĩnh vực", "Need professor name & area"),
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setEmail("");
    setFollowUpEmail("");
    try {
      const { data, error } = await supabase.functions.invoke("draft-cold-email", {
        body: {
          ...input,
          tone,
          length: LENGTH_TARGETS[lengthKey].words,
          followUp,
          language: lang,
        },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setEmail((data as any).email || "");
      setFollowUpEmail((data as any).followUpEmail || "");
      setTimeout(
        () => document.getElementById("cold-email-output")?.scrollIntoView({ behavior: "smooth" }),
        120,
      );
    } catch (e: any) {
      toast({ title: t("Lỗi", "Error"), description: e?.message || "AI failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: t("Đã sao chép", "Copied") });
  };

  const checks = useMemo(
    () => (email ? scoreEmail(email, LENGTH_TARGETS[lengthKey].words, input.paperOrProject) : []),
    [email, lengthKey, input.paperOrProject],
  );
  const score = checks.length ? Math.round((checks.filter((c) => c.passed).length / checks.length) * 100) : 0;

  return (
    <>
      <Card className="mt-12 border-rose-300 dark:border-rose-800 shadow-xl">
        <CardContent className="p-5 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-rose-500 to-orange-600 flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold">
                {t("Cold Email Studio v2", "Cold Email Studio v2")}
              </h3>
              <p className="text-xs text-muted-foreground">
                {t("Có tone, length, follow-up + chấm Email Health Score",
                  "Tone, length, follow-up + Email Health Score")}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div><Label className="text-xs">{t("Tên của em", "Your Name")}</Label><Input value={input.studentName} onChange={(e) => update("studentName", e.target.value)} /></div>
            <div><Label className="text-xs">{t("Tên giáo sư *", "Professor Name *")}</Label><Input value={input.professorName} onChange={(e) => update("professorName", e.target.value)} placeholder="Prof. Smith" /></div>
            <div><Label className="text-xs">{t("Trường", "University")}</Label><Input value={input.university} onChange={(e) => update("university", e.target.value)} /></div>
            <div><Label className="text-xs">{t("Lĩnh vực nghiên cứu *", "Research Area *")}</Label><Input value={input.researchArea} onChange={(e) => update("researchArea", e.target.value)} placeholder="Graph Neural Networks" /></div>
            <div className="sm:col-span-2"><Label className="text-xs">{t("Bài báo / project cụ thể của giáo sư", "Specific paper/project to reference")}</Label><Input value={input.paperOrProject} onChange={(e) => update("paperOrProject", e.target.value)} placeholder='"GNNs for protein folding (Nature 2024)"' /></div>
            <div className="sm:col-span-2"><Label className="text-xs">{t("Đề tài thesis Master của em", "Your Master thesis topic")}</Label><Input value={input.masterThesis} onChange={(e) => update("masterThesis", e.target.value)} /></div>
            <div className="sm:col-span-2"><Label className="text-xs">{t("Thành tích định lượng", "Quantitative achievement")}</Label><Input value={input.achievement} onChange={(e) => update("achievement", e.target.value)} placeholder='"improved baseline by 12%"' /></div>
            <div><Label className="text-xs">{t("Kỳ nhập học", "Intake")}</Label><Input value={input.intakeYear} onChange={(e) => update("intakeYear", e.target.value)} /></div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mt-4">
            <div>
              <Label className="text-xs">{t("Giọng văn", "Tone")}</Label>
              <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">{t("Trang trọng", "Formal")}</SelectItem>
                  <SelectItem value="friendly">{t("Thân thiện", "Friendly")}</SelectItem>
                  <SelectItem value="concise">{t("Ngắn gọn", "Concise")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">{t("Độ dài", "Length")}</Label>
              <Select value={lengthKey} onValueChange={(v) => setLengthKey(v as LengthKey)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">{t("Ngắn (~120 từ)", "Short (~120w)")}</SelectItem>
                  <SelectItem value="standard">{t("Chuẩn (~200 từ)", "Standard (~200w)")}</SelectItem>
                  <SelectItem value="detailed">{t("Chi tiết (~280 từ)", "Detailed (~280w)")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer p-2 rounded-md border border-input hover:bg-muted/40 w-full">
                <input type="checkbox" checked={followUp} onChange={(e) => setFollowUp(e.target.checked)} className="w-4 h-4" />
                <span className="text-xs">{t("Sinh thêm email follow-up (sau 7 ngày)", "Generate follow-up email (after 7 days)")}</span>
              </label>
            </div>
          </div>

          <Button className="mt-4 gap-2 bg-gradient-to-r from-rose-500 to-orange-600 hover:opacity-90 text-white" onClick={handleGenerate} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {t("Soạn email", "Generate Email")}
          </Button>
        </CardContent>
      </Card>

      {email && (
        <Card id="cold-email-output" className="mt-6 border-emerald-500/40">
          <CardContent className="p-5 md:p-6">
            {/* Health score */}
            <div className="mb-5 p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-sky-50 dark:from-emerald-950/30 dark:to-sky-950/20 border border-emerald-300/60">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <h4 className="font-bold flex items-center gap-2">
                  📊 {t("Email Health Score", "Email Health Score")}
                </h4>
                <Badge className={
                  score >= 75 ? "bg-emerald-600 text-white"
                  : score >= 50 ? "bg-amber-500 text-white"
                  : "bg-rose-600 text-white"
                }>{score}/100</Badge>
              </div>
              <Progress value={score} className="h-2 mb-3" />
              <ul className="space-y-1.5">
                {checks.map((c) => (
                  <li key={c.id} className="text-xs flex gap-2 items-start">
                    {c.passed
                      ? <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      : <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />}
                    <span>
                      <span className={c.passed ? "" : "font-semibold"}>{t(c.vi, c.en)}</span>
                      {!c.passed && (
                        <span className="block text-muted-foreground mt-0.5">→ {t(c.tipVi, c.tipEn)}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {followUpEmail ? (
              <Tabs defaultValue="main">
                <TabsList>
                  <TabsTrigger value="main">{t("Email chính", "Main Email")}</TabsTrigger>
                  <TabsTrigger value="follow">{t("Follow-up (sau 7 ngày)", "Follow-up (after 7d)")}</TabsTrigger>
                </TabsList>
                <TabsContent value="main">
                  <div className="flex justify-end mb-2">
                    <Button size="sm" variant="outline" onClick={() => copy(email)} className="gap-2"><Copy className="w-4 h-4" />{t("Sao chép", "Copy")}</Button>
                  </div>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/30 rounded-lg p-4">{email}</div>
                </TabsContent>
                <TabsContent value="follow">
                  <div className="flex justify-end mb-2">
                    <Button size="sm" variant="outline" onClick={() => copy(followUpEmail)} className="gap-2"><Copy className="w-4 h-4" />{t("Sao chép", "Copy")}</Button>
                  </div>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/30 rounded-lg p-4">{followUpEmail}</div>
                </TabsContent>
              </Tabs>
            ) : (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold flex items-center gap-2"><Mail className="w-5 h-5 text-emerald-500" />{t("Email AI đã soạn", "AI Drafted Email")}</h4>
                  <Button size="sm" variant="outline" onClick={() => copy(email)} className="gap-2"><Copy className="w-4 h-4" />{t("Sao chép", "Copy")}</Button>
                </div>
                <div className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/30 rounded-lg p-4">{email}</div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Outreach pipeline tracker */}
      <PhdOutreachTracker />
    </>
  );
};

export default PhdColdEmailStudio;
