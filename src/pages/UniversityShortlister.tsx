/**
 * @file UniversityShortlister.tsx
 * @description AI-powered university shortlist using Perplexity. Saves picks to Supabase.
 */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, GraduationCap, Sparkles, ExternalLink, Bookmark, BookmarkCheck, Loader2, Target, Rocket, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Uni {
  name: string; country: string; program: string;
  category: "reach" | "target" | "safety";
  fit_score: number; tuition_usd_per_year?: number;
  scholarship_available?: boolean; deadline?: string;
  rationale: string; url?: string;
}

const CAT_META: Record<string, { icon: any; color: string; label: string }> = {
  reach: { icon: Rocket, color: "from-rose-500 to-pink-600", label: "Reach" },
  target: { icon: Target, color: "from-blue-500 to-indigo-600", label: "Target" },
  safety: { icon: Shield, color: "from-emerald-500 to-teal-600", label: "Safety" },
};

const UniversityShortlister = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [form, setForm] = useState({
    field: "Computer Science", level: "Master's", country: "",
    gpa: "", testType: "IELTS", testScore: "", budgetUsd: "",
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Uni[]>([]);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const generate = async () => {
    if (!user) { toast({ title: t("Cần đăng nhập", "Sign in required") }); return; }
    setLoading(true); setResults([]);
    try {
      const { data, error } = await supabase.functions.invoke("shortlist-universities", {
        body: { ...form, language: "vi" },
      });
      if (error) throw error;
      setResults(data?.universities || []);
    } catch (e: any) {
      toast({ title: t("Lỗi", "Error"), description: e.message, variant: "destructive" });
    } finally { setLoading(false); }
  };

  const saveUni = async (u: Uni) => {
    if (!user) return;
    const key = `${u.name}-${u.program}`;
    try {
      const { error } = await supabase.from("university_shortlist").insert({
        user_id: user.id,
        university_name: u.name, country: u.country, program: u.program,
        category: u.category, fit_score: u.fit_score,
        tuition_usd: u.tuition_usd_per_year, scholarship_available: u.scholarship_available,
        deadline_date: u.deadline && /^\d{4}-\d{2}-\d{2}$/.test(u.deadline) ? u.deadline : null,
        ai_rationale: u.rationale, url: u.url,
      });
      if (error) throw error;
      setSaved((s) => new Set(s).add(key));
      toast({ title: t("Đã lưu", "Saved") });
    } catch (e: any) {
      toast({ title: t("Lỗi", "Error"), description: e.message, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="University Shortlister AI - HaiEduTech" description="Tạo danh sách trường mục tiêu (reach/target/safety) tự động bằng AI Perplexity với dữ liệu 2026." path="/study-abroad/shortlister" />
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 pt-28 lg:pt-32 pb-16">
        <Link to="/study-abroad" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronLeft className="w-4 h-4" /> {t("Quay lại Cổng du học", "Back to Study Abroad")}
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{t("University Shortlister AI", "University Shortlister AI")}</h1>
              <p className="text-sm text-muted-foreground">
                {t("AI gợi ý 9 trường (3 reach · 3 target · 3 safety) dựa trên hồ sơ của bạn - dữ liệu Perplexity 2026.", "AI suggests 9 universities (reach/target/safety) from your profile - Perplexity 2026 data.")}
              </p>
            </div>
          </div>

          <Card className="mb-6">
            <CardContent className="p-5 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <Label>{t("Ngành học", "Field")}</Label>
                <Input value={form.field} onChange={(e) => setForm({ ...form, field: e.target.value })} />
              </div>
              <div>
                <Label>{t("Bậc học", "Level")}</Label>
                <Select value={form.level} onValueChange={(v) => setForm({ ...form, level: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                    <SelectItem value="Master's">Master's</SelectItem>
                    <SelectItem value="PhD">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{t("Quốc gia (tuỳ chọn)", "Country (optional)")}</Label>
                <Input placeholder="Finland, USA, UK…" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
              </div>
              <div>
                <Label>GPA</Label>
                <Input placeholder="3.5 / 4.0" value={form.gpa} onChange={(e) => setForm({ ...form, gpa: e.target.value })} />
              </div>
              <div>
                <Label>{t("Loại chứng chỉ", "Test type")}</Label>
                <Select value={form.testType} onValueChange={(v) => setForm({ ...form, testType: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IELTS">IELTS</SelectItem>
                    <SelectItem value="TOEFL">TOEFL</SelectItem>
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="GRE">GRE</SelectItem>
                    <SelectItem value="GMAT">GMAT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{t("Điểm", "Score")}</Label>
                <Input placeholder="7.0 / 110 / 1450" value={form.testScore} onChange={(e) => setForm({ ...form, testScore: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <Label>{t("Ngân sách năm (USD, đã tính học bổng)", "Annual budget USD (incl. scholarship)")}</Label>
                <Input placeholder="15000" value={form.budgetUsd} onChange={(e) => setForm({ ...form, budgetUsd: e.target.value })} />
              </div>
              <Button onClick={generate} disabled={loading} className="self-end">
                {loading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Sparkles className="w-4 h-4 mr-1" />}
                {t("Tạo danh sách", "Generate")}
              </Button>
            </CardContent>
          </Card>

          {results.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((u, i) => {
                const meta = CAT_META[u.category] || CAT_META.target;
                const Icon = meta.icon;
                const key = `${u.name}-${u.program}`;
                const isSaved = saved.has(key);
                return (
                  <Card key={i} className="flex flex-col overflow-hidden">
                    <div className={`h-1.5 bg-gradient-to-r ${meta.color}`} />
                    <CardContent className="p-4 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge className={`bg-gradient-to-r ${meta.color} text-white border-0`}>
                          <Icon className="w-3 h-3 mr-1" /> {meta.label}
                        </Badge>
                        <Badge variant="outline">Fit {u.fit_score}/100</Badge>
                      </div>
                      <h3 className="font-bold text-base leading-snug mb-1">{u.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{u.country} · {u.program}</p>
                      <p className="text-xs text-foreground/80 leading-relaxed mb-3 flex-1">{u.rationale}</p>
                      <div className="flex flex-wrap gap-1.5 text-[11px] text-muted-foreground mb-3">
                        {u.tuition_usd_per_year != null && <span className="px-2 py-0.5 rounded bg-muted">${u.tuition_usd_per_year.toLocaleString()}/yr</span>}
                        {u.scholarship_available && <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600">🎓 Scholarship</span>}
                        {u.deadline && <span className="px-2 py-0.5 rounded bg-muted">📅 {u.deadline}</span>}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant={isSaved ? "secondary" : "default"} onClick={() => saveUni(u)} disabled={isSaved} className="flex-1">
                          {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 mr-1" /> : <Bookmark className="w-3.5 h-3.5 mr-1" />}
                          {isSaved ? t("Đã lưu", "Saved") : t("Lưu", "Save")}
                        </Button>
                        {u.url && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={u.url} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-3.5 h-3.5" /></a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
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

export default UniversityShortlister;
