/**
 * @file LorToolkit.tsx
 * @description Letter of Recommendation toolkit: 3 archetype templates (academic
 * advisor, employer, mentor) plus an AI draft generator that calls the
 * draft-motivation-letter edge function with docType: "lor".
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Sparkles, Copy, Loader2, Mail, GraduationCap, Briefcase } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const TEMPLATES = [
  {
    id: "academic",
    icon: GraduationCap,
    title: { vi: "GV / Cố vấn học thuật", en: "Academic Advisor" },
    template: `Dear Admissions Committee,

I am writing to recommend [STUDENT NAME] for admission to [PROGRAM] at [UNIVERSITY]. I have known [him/her/them] for [N] years as [his/her/their] professor in [SUBJECT].

In my [COURSE NAME] class, [STUDENT] ranked in the top [%] of [N] students. [He/She/They] consistently demonstrated [SPECIFIC SKILL - e.g. analytical rigor, intellectual curiosity, mathematical maturity]. A specific example: [CONCRETE PROJECT/MOMENT].

Beyond grades, [STUDENT] [LEADERSHIP / RESEARCH / COLLABORATION quality]. [He/She/They] [STORY THAT PROVES IT].

I believe [STUDENT] will thrive at [UNIVERSITY] because [SPECIFIC FIT - research lab, professor, course]. I give [him/her/them] my highest recommendation.

Sincerely,
[NAME], [TITLE]
[UNIVERSITY] · [EMAIL]`,
  },
  {
    id: "employer",
    icon: Briefcase,
    title: { vi: "Quản lý / Sếp", en: "Employer / Supervisor" },
    template: `To the Admissions Committee,

It is my pleasure to recommend [STUDENT NAME], who worked under my direct supervision as [ROLE] at [COMPANY] from [DATE] to [DATE].

[STUDENT] was hired to [RESPONSIBILITY]. Within [TIME], [he/she/they] [QUANTIFIED ACHIEVEMENT - e.g. reduced X by 30%, shipped Y features, led team of Z].

What sets [STUDENT] apart is [SOFT SKILL - ownership, communication, learning velocity]. For instance, when [SITUATION], [he/she/they] [ACTION] which resulted in [RESULT].

Pursuing [PROGRAM] at [UNIVERSITY] is the logical next step for [STUDENT]'s career. [He/She/They] have my strongest endorsement.

Best regards,
[NAME], [TITLE]
[COMPANY] · [EMAIL]`,
  },
  {
    id: "mentor",
    icon: Mail,
    title: { vi: "Mentor / Hoạt động ngoại khóa", en: "Mentor / Extracurricular" },
    template: `Dear Admissions Committee,

I have had the privilege of mentoring [STUDENT NAME] in [CONTEXT - research group, volunteer organization, club] for the past [N] [months/years].

When [STUDENT] joined, [INITIAL STATE]. Over time, [he/she/they] grew into [CURRENT STATE], evidenced by [CONCRETE MILESTONE].

What makes [STUDENT] exceptional is [character trait]. I vividly remember the moment when [STORY] - it showed me [INSIGHT ABOUT THE STUDENT].

[STUDENT] will be a tremendous asset to [UNIVERSITY] and the wider community. I recommend [him/her/them] without reservation.

Warm regards,
[NAME], [TITLE / ROLE]
[ORGANIZATION] · [EMAIL]`,
  },
];

export default function LorToolkit() {
  const { t } = useLanguage();
  const [activeTpl, setActiveTpl] = useState("academic");
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState("");
  const [form, setForm] = useState({
    recommenderName: "", recommenderTitle: "", relationship: "Professor",
    studentName: "", programName: "", university: "", strengths: "", anecdote: "",
  });

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: t("Đã sao chép", "Copied") });
  };

  const handleDraft = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { toast({ title: t("Đăng nhập trước", "Sign in first"), variant: "destructive" }); return; }
    if (!form.studentName || !form.programName) {
      toast({ title: t("Điền tên SV + chương trình", "Fill student name + program"), variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("draft-motivation-letter", {
        body: {
          docType: "lor",
          fullName: form.studentName,
          programName: form.programName,
          university: form.university,
          background: `Recommender: ${form.recommenderName} (${form.recommenderTitle}), relationship: ${form.relationship}. Student strengths: ${form.strengths}. Specific anecdote: ${form.anecdote}`,
          language: "en",
        },
      });
      if (error) throw error;
      setDraft((data as any).letter || "");
    } catch (e: any) {
      toast({ title: "Error", description: e?.message || "Failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-violet-500/30">
      <CardContent className="p-5 space-y-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold">{t("Letter of Recommendation Toolkit", "Letter of Recommendation Toolkit")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("3 mẫu chuẩn + AI giúp người giới thiệu viết bản nháp trong 1 phút.",
                 "3 archetype templates + AI helps recommenders draft in 1 minute.")}
            </p>
          </div>
        </div>

        <Tabs value={activeTpl} onValueChange={setActiveTpl}>
          <TabsList className="grid grid-cols-3 w-full">
            {TEMPLATES.map(tpl => {
              const Icon = tpl.icon;
              return (
                <TabsTrigger key={tpl.id} value={tpl.id} className="gap-1.5 text-xs">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t(tpl.title.vi, tpl.title.en)}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          {TEMPLATES.map(tpl => (
            <TabsContent key={tpl.id} value={tpl.id} className="mt-3">
              <div className="rounded-lg bg-muted/40 p-4 text-sm whitespace-pre-wrap font-mono leading-relaxed max-h-[280px] overflow-y-auto">
                {tpl.template}
              </div>
              <Button size="sm" variant="outline" onClick={() => copy(tpl.template)} className="mt-2 gap-1.5">
                <Copy className="w-3.5 h-3.5" /> {t("Sao chép mẫu", "Copy template")}
              </Button>
            </TabsContent>
          ))}
        </Tabs>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            {t("Hoặc để AI viết bản nháp cá nhân hoá", "Or let AI draft a personalized letter")}
          </h4>
          <div className="grid sm:grid-cols-2 gap-2">
            <Input placeholder={t("Tên người giới thiệu", "Recommender name")} value={form.recommenderName} onChange={e => setForm({ ...form, recommenderName: e.target.value })} />
            <Input placeholder={t("Chức danh (vd: PhD, CTO)", "Title (e.g. PhD, CTO)")} value={form.recommenderTitle} onChange={e => setForm({ ...form, recommenderTitle: e.target.value })} />
            <Input placeholder={t("Mối quan hệ (Professor, Manager...)", "Relationship (Professor, Manager...)")} value={form.relationship} onChange={e => setForm({ ...form, relationship: e.target.value })} />
            <Input placeholder={t("Tên sinh viên *", "Student name *")} value={form.studentName} onChange={e => setForm({ ...form, studentName: e.target.value })} />
            <Input placeholder={t("Chương trình *", "Program *")} value={form.programName} onChange={e => setForm({ ...form, programName: e.target.value })} />
            <Input placeholder={t("Trường đại học", "University")} value={form.university} onChange={e => setForm({ ...form, university: e.target.value })} />
          </div>
          <Textarea className="mt-2" rows={2} placeholder={t("Điểm mạnh của SV (vd: phân tích, sáng tạo, lãnh đạo)", "Student strengths (e.g. analytical, creative, leadership)")} value={form.strengths} onChange={e => setForm({ ...form, strengths: e.target.value })} />
          <Textarea className="mt-2" rows={2} placeholder={t("1 câu chuyện cụ thể chứng minh điểm mạnh", "1 concrete anecdote that proves the strength")} value={form.anecdote} onChange={e => setForm({ ...form, anecdote: e.target.value })} />
          <Button onClick={handleDraft} disabled={loading} className="mt-3 gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {t("Tạo bản nháp LoR", "Generate LoR draft")}
          </Button>
        </div>

        {draft && (
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-4">
            <div className="flex items-center justify-between mb-2">
              <Badge className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30">{t("Bản nháp AI", "AI Draft")}</Badge>
              <Button size="sm" variant="outline" onClick={() => copy(draft)} className="gap-1.5"><Copy className="w-3.5 h-3.5" />{t("Sao chép", "Copy")}</Button>
            </div>
            <div className="whitespace-pre-wrap text-sm leading-relaxed max-h-[400px] overflow-y-auto">{draft}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
