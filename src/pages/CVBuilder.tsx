/**
 * @file CVBuilder.tsx
 * @description CV / Resume Builder with 3 templates (Europass-style, US/Modern,
 * UK/Classic). Stores draft in localStorage; exports via window.print() using
 * print-friendly CSS so users can save as PDF without extra deps.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Printer, Save, Trash2, Plus, GraduationCap, Briefcase, Award, Languages, Code, Mail, Phone, Globe, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";

type TemplateId = "europass" | "modern" | "classic";

interface Experience { id: string; role: string; org: string; period: string; bullets: string }
interface Education  { id: string; degree: string; school: string; period: string; details: string }
interface SkillGroup { id: string; group: string; items: string }

interface CVData {
  fullName: string; headline: string; email: string; phone: string;
  location: string; website: string; summary: string;
  education: Education[]; experience: Experience[];
  skills: SkillGroup[]; languages: string; awards: string;
}

const LS = "haiedu-cv-draft-v1";

const EMPTY: CVData = {
  fullName: "", headline: "", email: "", phone: "", location: "", website: "",
  summary: "",
  education: [{ id: "e1", degree: "", school: "", period: "", details: "" }],
  experience: [{ id: "x1", role: "", org: "", period: "", bullets: "" }],
  skills: [{ id: "s1", group: "Technical", items: "" }],
  languages: "", awards: "",
};

const uid = () => Math.random().toString(36).slice(2, 9);

export default function CVBuilder() {
  const { t } = useLanguage();
  const [tpl, setTpl] = useState<TemplateId>("modern");
  const [data, setData] = useState<CVData>(EMPTY);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS);
      if (raw) {
        const parsed = JSON.parse(raw);
        setData({ ...EMPTY, ...parsed });
        if (parsed.__tpl) setTpl(parsed.__tpl);
      }
    } catch { /* ignore */ }
  }, []);

  const save = () => {
    try {
      localStorage.setItem(LS, JSON.stringify({ ...data, __tpl: tpl }));
      toast({ title: t("Đã lưu nháp", "Draft saved") });
    } catch { toast({ title: "Save failed", variant: "destructive" }); }
  };

  const reset = () => {
    if (!confirm(t("Xoá toàn bộ CV?", "Clear the entire CV?"))) return;
    localStorage.removeItem(LS);
    setData(EMPTY);
  };

  const print = () => {
    save();
    setTimeout(() => window.print(), 50);
  };

  const update = (patch: Partial<CVData>) => setData(d => ({ ...d, ...patch }));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO title="CV Builder — Tạo CV Du Học Miễn Phí | HaiEduTech" description="Trình tạo CV / Resume cho du học sinh: 3 mẫu Europass, Modern (US), Classic (UK). Lưu nháp tự động, xuất PDF qua trình duyệt." path="/study-abroad/cv" />
      <Navbar />
      <main className="flex-1 pt-28 lg:pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="mb-6 print:hidden">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{t("CV Builder", "CV Builder")}</h1>
                <p className="text-sm text-muted-foreground">{t("3 mẫu chuẩn quốc tế · lưu nháp tự động · xuất PDF.", "3 international templates · auto-saved drafts · export PDF.")}</p>
              </div>
            </div>
          </div>

          {/* Template picker + actions */}
          <Card className="mb-4 print:hidden">
            <CardContent className="p-4 flex flex-wrap items-center justify-between gap-3">
              <Tabs value={tpl} onValueChange={v => setTpl(v as TemplateId)}>
                <TabsList>
                  <TabsTrigger value="europass">🇪🇺 Europass</TabsTrigger>
                  <TabsTrigger value="modern">🇺🇸 Modern (US)</TabsTrigger>
                  <TabsTrigger value="classic">🇬🇧 Classic (UK)</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={save} className="gap-1.5"><Save className="w-4 h-4" />{t("Lưu", "Save")}</Button>
                <Button size="sm" variant="outline" onClick={reset} className="gap-1.5 text-rose-500"><Trash2 className="w-4 h-4" />{t("Xoá", "Clear")}</Button>
                <Button size="sm" onClick={print} className="gap-1.5"><Printer className="w-4 h-4" />{t("In / PDF", "Print / PDF")}</Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Editor */}
            <div className="space-y-4 print:hidden">
              <CVEditor data={data} update={update} t={t} />
            </div>

            {/* Preview */}
            <div className="lg:sticky lg:top-24 lg:self-start print:static">
              <div id="cv-print-area" className="cv-page">
                {tpl === "europass" && <EuropassTemplate data={data} />}
                {tpl === "modern"   && <ModernTemplate data={data} />}
                {tpl === "classic"  && <ClassicTemplate data={data} />}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        @media print {
          body * { visibility: hidden; }
          #cv-print-area, #cv-print-area * { visibility: visible; }
          #cv-print-area { position: absolute; left: 0; top: 0; width: 100%; padding: 0; margin: 0; box-shadow: none; }
          @page { size: A4; margin: 14mm; }
        }
        .cv-page {
          background: white;
          color: #111827;
          padding: 28px 32px;
          border-radius: 8px;
          box-shadow: 0 4px 18px hsl(var(--foreground) / 0.08);
          min-height: 800px;
          font-size: 12.5px;
          line-height: 1.45;
        }
        .cv-page h2 { font-weight: 700; }
        .cv-page a  { color: #1d4ed8; }
      `}</style>
    </div>
  );
}

/* ============================== Editor ============================== */

const sectionTitle = "text-sm font-bold flex items-center gap-2 mb-2 text-foreground";

function CVEditor({ data, update, t }: { data: CVData; update: (p: Partial<CVData>) => void; t: (vi: string, en: string) => string }) {
  const addExp = () => update({ experience: [...data.experience, { id: uid(), role: "", org: "", period: "", bullets: "" }] });
  const addEdu = () => update({ education:  [...data.education,  { id: uid(), degree: "", school: "", period: "", details: "" }] });
  const addSkill = () => update({ skills:   [...data.skills,     { id: uid(), group: "", items: "" }] });

  const patchExp = (id: string, p: Partial<Experience>) => update({ experience: data.experience.map(e => e.id === id ? { ...e, ...p } : e) });
  const patchEdu = (id: string, p: Partial<Education>)  => update({ education:  data.education .map(e => e.id === id ? { ...e, ...p } : e) });
  const patchSk  = (id: string, p: Partial<SkillGroup>) => update({ skills:     data.skills    .map(e => e.id === id ? { ...e, ...p } : e) });

  const removeExp = (id: string) => update({ experience: data.experience.filter(e => e.id !== id) });
  const removeEdu = (id: string) => update({ education:  data.education .filter(e => e.id !== id) });
  const removeSk  = (id: string) => update({ skills:     data.skills    .filter(e => e.id !== id) });

  return (
    <>
      <Card><CardContent className="p-4 space-y-2">
        <h3 className={sectionTitle}>👤 {t("Thông tin cá nhân", "Personal Info")}</h3>
        <Input placeholder={t("Họ tên đầy đủ", "Full name")} value={data.fullName} onChange={e => update({ fullName: e.target.value })} />
        <Input placeholder={t("Tiêu đề (vd: Aspiring Data Engineer)", "Headline (e.g. Aspiring Data Engineer)")} value={data.headline} onChange={e => update({ headline: e.target.value })} />
        <div className="grid grid-cols-2 gap-2">
          <Input placeholder="Email" value={data.email} onChange={e => update({ email: e.target.value })} />
          <Input placeholder={t("Điện thoại", "Phone")} value={data.phone} onChange={e => update({ phone: e.target.value })} />
          <Input placeholder={t("Địa chỉ", "Location")} value={data.location} onChange={e => update({ location: e.target.value })} />
          <Input placeholder={t("Website / LinkedIn", "Website / LinkedIn")} value={data.website} onChange={e => update({ website: e.target.value })} />
        </div>
        <Textarea rows={3} placeholder={t("Tóm tắt bản thân (2-3 câu)", "Summary (2-3 sentences)")} value={data.summary} onChange={e => update({ summary: e.target.value })} />
      </CardContent></Card>

      <Card><CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className={sectionTitle}><GraduationCap className="w-4 h-4" />{t("Học vấn", "Education")}</h3>
          <Button size="sm" variant="outline" onClick={addEdu} className="gap-1"><Plus className="w-3.5 h-3.5" />{t("Thêm", "Add")}</Button>
        </div>
        {data.education.map(ed => (
          <div key={ed.id} className="space-y-2 border-l-2 border-primary/30 pl-3 relative">
            <Input placeholder={t("Bằng cấp (vd: BSc Computer Science)", "Degree (e.g. BSc CS)")} value={ed.degree} onChange={e => patchEdu(ed.id, { degree: e.target.value })} />
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder={t("Trường", "School")} value={ed.school} onChange={e => patchEdu(ed.id, { school: e.target.value })} />
              <Input placeholder={t("2022 — 2026", "2022 — 2026")} value={ed.period} onChange={e => patchEdu(ed.id, { period: e.target.value })} />
            </div>
            <Textarea rows={2} placeholder={t("GPA, môn nổi bật, đồ án…", "GPA, notable courses, projects…")} value={ed.details} onChange={e => patchEdu(ed.id, { details: e.target.value })} />
            <Button size="icon" variant="ghost" onClick={() => removeEdu(ed.id)} className="absolute -right-1 -top-1 h-7 w-7 text-rose-500"><Trash2 className="w-3.5 h-3.5" /></Button>
          </div>
        ))}
      </CardContent></Card>

      <Card><CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className={sectionTitle}><Briefcase className="w-4 h-4" />{t("Kinh nghiệm / Dự án", "Experience / Projects")}</h3>
          <Button size="sm" variant="outline" onClick={addExp} className="gap-1"><Plus className="w-3.5 h-3.5" />{t("Thêm", "Add")}</Button>
        </div>
        {data.experience.map(x => (
          <div key={x.id} className="space-y-2 border-l-2 border-primary/30 pl-3 relative">
            <Input placeholder={t("Vai trò (vd: Software Intern)", "Role (e.g. Software Intern)")} value={x.role} onChange={e => patchExp(x.id, { role: e.target.value })} />
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder={t("Công ty / Tổ chức", "Company / Org")} value={x.org} onChange={e => patchExp(x.id, { org: e.target.value })} />
              <Input placeholder="2024 — Present" value={x.period} onChange={e => patchExp(x.id, { period: e.target.value })} />
            </div>
            <Textarea rows={3} placeholder={t("Mỗi dòng = 1 gạch đầu dòng. Bắt đầu bằng động từ + con số.", "One line per bullet. Start with action verb + number.")} value={x.bullets} onChange={e => patchExp(x.id, { bullets: e.target.value })} />
            <Button size="icon" variant="ghost" onClick={() => removeExp(x.id)} className="absolute -right-1 -top-1 h-7 w-7 text-rose-500"><Trash2 className="w-3.5 h-3.5" /></Button>
          </div>
        ))}
      </CardContent></Card>

      <Card><CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className={sectionTitle}><Code className="w-4 h-4" />{t("Kỹ năng", "Skills")}</h3>
          <Button size="sm" variant="outline" onClick={addSkill} className="gap-1"><Plus className="w-3.5 h-3.5" />{t("Thêm nhóm", "Add group")}</Button>
        </div>
        {data.skills.map(s => (
          <div key={s.id} className="grid grid-cols-[1fr_2fr_auto] gap-2">
            <Input placeholder={t("Nhóm (Technical, Soft…)", "Group (Technical, Soft…)")} value={s.group} onChange={e => patchSk(s.id, { group: e.target.value })} />
            <Input placeholder={t("Python, SQL, Spark", "Python, SQL, Spark")} value={s.items} onChange={e => patchSk(s.id, { items: e.target.value })} />
            <Button size="icon" variant="ghost" onClick={() => removeSk(s.id)} className="h-9 w-9 text-rose-500"><Trash2 className="w-4 h-4" /></Button>
          </div>
        ))}
      </CardContent></Card>

      <Card><CardContent className="p-4 space-y-3">
        <h3 className={sectionTitle}><Languages className="w-4 h-4" />{t("Ngôn ngữ", "Languages")}</h3>
        <Textarea rows={2} placeholder={t("VD: English C1 (IELTS 7.5), Chinese HSK 4, Vietnamese native", "e.g. English C1 (IELTS 7.5), Chinese HSK 4, Vietnamese native")} value={data.languages} onChange={e => update({ languages: e.target.value })} />
        <h3 className={sectionTitle + " pt-2"}><Award className="w-4 h-4" />{t("Giải thưởng / Chứng chỉ", "Awards / Certifications")}</h3>
        <Textarea rows={3} placeholder={t("Mỗi dòng = 1 mục", "One per line")} value={data.awards} onChange={e => update({ awards: e.target.value })} />
      </CardContent></Card>
    </>
  );
}

/* ============================== Templates ============================== */

const splitLines = (s: string) => s.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

function Bullets({ text }: { text: string }) {
  const lines = splitLines(text);
  if (!lines.length) return null;
  return <ul className="list-disc pl-5 space-y-0.5 mt-1">{lines.map((l, i) => <li key={i}>{l}</li>)}</ul>;
}

function ContactLine({ data }: { data: CVData }) {
  const items = [
    data.email && { icon: Mail, v: data.email },
    data.phone && { icon: Phone, v: data.phone },
    data.location && { icon: MapPin, v: data.location },
    data.website && { icon: Globe, v: data.website },
  ].filter(Boolean) as Array<{ icon: any; v: string }>;
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
      {items.map((it, i) => {
        const Icon = it.icon;
        return <span key={i} className="flex items-center gap-1"><Icon className="w-3 h-3" />{it.v}</span>;
      })}
    </div>
  );
}

function EuropassTemplate({ data }: { data: CVData }) {
  return (
    <div>
      <div className="grid grid-cols-[1fr_2fr] gap-5 mb-4 pb-4 border-b-2 border-blue-700">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-blue-700 font-bold">Europass CV</div>
          <h1 className="text-2xl font-bold mt-1">{data.fullName || "Your Name"}</h1>
          <p className="text-sm text-gray-600 italic">{data.headline}</p>
        </div>
        <div className="text-xs space-y-1 self-end">
          <ContactLine data={data} />
        </div>
      </div>
      {data.summary && <p className="text-sm mb-4">{data.summary}</p>}

      <SectionHeading color="bg-blue-700">PERSONAL STATEMENT</SectionHeading>
      <p className="text-sm mb-4">{data.summary || "—"}</p>

      <SectionHeading color="bg-blue-700">WORK EXPERIENCE</SectionHeading>
      {data.experience.map(x => (
        <div key={x.id} className="mb-3">
          <div className="flex justify-between"><b>{x.role}</b><span className="text-xs text-gray-600">{x.period}</span></div>
          <div className="text-sm italic text-gray-700">{x.org}</div>
          <Bullets text={x.bullets} />
        </div>
      ))}

      <SectionHeading color="bg-blue-700">EDUCATION AND TRAINING</SectionHeading>
      {data.education.map(e => (
        <div key={e.id} className="mb-3">
          <div className="flex justify-between"><b>{e.degree}</b><span className="text-xs text-gray-600">{e.period}</span></div>
          <div className="text-sm italic text-gray-700">{e.school}</div>
          {e.details && <p className="text-sm mt-1">{e.details}</p>}
        </div>
      ))}

      <SectionHeading color="bg-blue-700">SKILLS</SectionHeading>
      {data.skills.map(s => <div key={s.id} className="text-sm mb-1"><b>{s.group}:</b> {s.items}</div>)}

      <SectionHeading color="bg-blue-700">LANGUAGES</SectionHeading>
      <p className="text-sm mb-3 whitespace-pre-wrap">{data.languages}</p>

      {data.awards && <>
        <SectionHeading color="bg-blue-700">AWARDS</SectionHeading>
        <Bullets text={data.awards} />
      </>}
    </div>
  );
}

function ModernTemplate({ data }: { data: CVData }) {
  return (
    <div>
      <div className="text-center pb-3 border-b border-gray-300 mb-4">
        <h1 className="text-3xl font-bold tracking-tight">{data.fullName || "Your Name"}</h1>
        {data.headline && <p className="text-sm text-emerald-600 font-semibold mt-1">{data.headline}</p>}
        <div className="mt-2 flex justify-center"><ContactLine data={data} /></div>
      </div>
      {data.summary && <p className="text-sm mb-4 leading-relaxed">{data.summary}</p>}

      {data.experience.some(x => x.role) && <>
        <ModernHeading>EXPERIENCE</ModernHeading>
        {data.experience.map(x => (
          <div key={x.id} className="mb-3">
            <div className="flex justify-between items-baseline">
              <span><b>{x.role}</b> {x.org && <>· <span className="text-gray-700">{x.org}</span></>}</span>
              <span className="text-xs text-gray-500">{x.period}</span>
            </div>
            <Bullets text={x.bullets} />
          </div>
        ))}
      </>}

      {data.education.some(e => e.degree) && <>
        <ModernHeading>EDUCATION</ModernHeading>
        {data.education.map(e => (
          <div key={e.id} className="mb-3">
            <div className="flex justify-between items-baseline">
              <span><b>{e.degree}</b> {e.school && <>· <span className="text-gray-700">{e.school}</span></>}</span>
              <span className="text-xs text-gray-500">{e.period}</span>
            </div>
            {e.details && <p className="text-sm">{e.details}</p>}
          </div>
        ))}
      </>}

      {data.skills.some(s => s.items) && <>
        <ModernHeading>SKILLS</ModernHeading>
        <div className="space-y-1 mb-3">{data.skills.map(s => <div key={s.id} className="text-sm"><b>{s.group}:</b> {s.items}</div>)}</div>
      </>}

      {data.languages && <>
        <ModernHeading>LANGUAGES</ModernHeading>
        <p className="text-sm mb-3 whitespace-pre-wrap">{data.languages}</p>
      </>}

      {data.awards && <>
        <ModernHeading>AWARDS & CERTIFICATIONS</ModernHeading>
        <Bullets text={data.awards} />
      </>}
    </div>
  );
}

function ClassicTemplate({ data }: { data: CVData }) {
  return (
    <div className="font-serif">
      <h1 className="text-2xl font-bold text-center">{data.fullName || "Your Name"}</h1>
      <div className="text-center text-xs mt-1"><ContactLine data={data} /></div>
      <hr className="my-3 border-gray-400" />

      {data.summary && <>
        <ClassicHeading>Personal Profile</ClassicHeading>
        <p className="text-sm mb-3">{data.summary}</p>
      </>}

      <ClassicHeading>Education</ClassicHeading>
      {data.education.map(e => (
        <div key={e.id} className="mb-2 text-sm">
          <div><b>{e.school}</b> — <i>{e.degree}</i> <span className="float-right text-xs">{e.period}</span></div>
          {e.details && <p>{e.details}</p>}
        </div>
      ))}

      <ClassicHeading>Employment History</ClassicHeading>
      {data.experience.map(x => (
        <div key={x.id} className="mb-2 text-sm">
          <div><b>{x.role}</b>, {x.org} <span className="float-right text-xs">{x.period}</span></div>
          <Bullets text={x.bullets} />
        </div>
      ))}

      <ClassicHeading>Key Skills</ClassicHeading>
      {data.skills.map(s => <p key={s.id} className="text-sm"><b>{s.group}:</b> {s.items}</p>)}

      {data.languages && <>
        <ClassicHeading>Languages</ClassicHeading>
        <p className="text-sm whitespace-pre-wrap">{data.languages}</p>
      </>}

      {data.awards && <>
        <ClassicHeading>Honours & Awards</ClassicHeading>
        <Bullets text={data.awards} />
      </>}
    </div>
  );
}

function SectionHeading({ children, color }: { children: React.ReactNode; color: string }) {
  return <h2 className={`text-[11px] font-bold tracking-widest text-white px-2 py-1 inline-block ${color} mt-3 mb-2`}>{children}</h2>;
}
function ModernHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[11px] font-bold tracking-widest text-emerald-700 mt-3 mb-1 pb-0.5 border-b border-emerald-200">{children}</h2>;
}
function ClassicHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-bold uppercase tracking-wider mt-3 mb-1 border-b border-gray-400 pb-0.5">{children}</h2>;
}
