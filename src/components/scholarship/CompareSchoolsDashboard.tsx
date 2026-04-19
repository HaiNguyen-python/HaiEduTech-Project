/**
 * @file CompareSchoolsDashboard.tsx
 * @description Slide-in panel where students search & pick up to 3 universities to compare
 *   side-by-side: tuition, living cost, post-study visa, QS ranking.
 *   Falls back to a Perplexity edge function for universities not in the static dataset.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, Search, X, Loader2, DollarSign, Home, Plane, Award, ExternalLink, Plus, Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { UNIVERSITIES, type University } from "@/data/universitiesData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const MAX_COMPARE = 3;

const CompareSchoolsDashboard = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<University[]>([]);
  const [aiLoading, setAiLoading] = useState(false);

  const filtered = query.trim().length === 0
    ? UNIVERSITIES.slice(0, 8)
    : UNIVERSITIES.filter((u) =>
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.country.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 12);

  const addUniversity = (u: University) => {
    if (selected.find((s) => s.id === u.id)) return;
    if (selected.length >= MAX_COMPARE) {
      toast({
        title: t("Đã đạt giới hạn", "Limit reached"),
        description: t(`So sánh tối đa ${MAX_COMPARE} trường`, `Compare up to ${MAX_COMPARE} schools`),
      });
      return;
    }
    setSelected((s) => [...s, u]);
  };

  const removeUniversity = (id: string) => {
    setSelected((s) => s.filter((u) => u.id !== id));
  };

  const handleAiLookup = async () => {
    const q = query.trim();
    if (q.length < 3) return;
    if (selected.length >= MAX_COMPARE) {
      toast({ title: t(`Tối đa ${MAX_COMPARE} trường`, `Max ${MAX_COMPARE} schools`) });
      return;
    }
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("lookup-university", {
        body: { query: q },
      });
      if (error) throw error;
      if (data?.error) {
        toast({ title: t("Không tìm thấy", "Not found"), description: data.error, variant: "destructive" });
        return;
      }
      const aiUniversity: University = {
        id: `ai-${Date.now()}`,
        name: data.name,
        country: data.country,
        flag: data.flag || "🌍",
        city: data.city || "",
        qsRanking: data.qsRanking || 9999,
        tuitionUsd: data.tuitionUsd || 0,
        livingCostUsd: data.livingCostUsd || 0,
        postStudyVisaMonths: data.postStudyVisaMonths || 0,
        programsHighlight: Array.isArray(data.programsHighlight) ? data.programsHighlight : [],
        websiteUrl: data.websiteUrl || "",
      };
      addUniversity(aiUniversity);
      toast({
        title: t("✨ Đã thêm trường (AI)", "✨ Added (AI lookup)"),
        description: aiUniversity.name,
      });
    } catch (err: any) {
      toast({
        title: t("Lỗi tra cứu AI", "AI lookup failed"),
        description: err?.message || "Try again",
        variant: "destructive",
      });
    } finally {
      setAiLoading(false);
    }
  };

  const fmtUsd = (n: number) => n > 0 ? `$${n.toLocaleString()}` : "—";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <GraduationCap className="w-4 h-4" />
          {t("So sánh trường", "Compare Schools")}
          {selected.length > 0 && (
            <Badge variant="secondary" className="ml-1">{selected.length}/{MAX_COMPARE}</Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-3xl overflow-y-auto"
      >
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <SheetHeader className="mb-4">
            <SheetTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              {t("So sánh trường đại học", "Compare Universities")}
            </SheetTitle>
            <p className="text-sm text-muted-foreground">
              {t(
                `Chọn tối đa ${MAX_COMPARE} trường để so sánh học phí, sinh hoạt phí, visa làm việc & xếp hạng.`,
                `Pick up to ${MAX_COMPARE} schools to compare tuition, living costs, post-study visa & ranking.`
              )}
            </p>
          </SheetHeader>

          {/* Search bar */}
          <div className="flex gap-2 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("Tìm trường (Aalto, Oxford, MIT...)", "Search school (Aalto, Oxford, MIT...)")}
                className="pl-9"
              />
            </div>
            <Button onClick={handleAiLookup} disabled={aiLoading || query.trim().length < 3} variant="outline" className="gap-2">
              {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {t("Tra AI", "AI Lookup")}
            </Button>
          </div>

          {/* Suggestions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 max-h-[200px] overflow-y-auto pr-1">
            {filtered.map((u) => {
              const isSelected = !!selected.find((s) => s.id === u.id);
              return (
                <button
                  key={u.id}
                  onClick={() => addUniversity(u)}
                  disabled={isSelected}
                  className={`flex items-center gap-2 p-2 rounded-lg border text-left text-xs transition-all ${isSelected ? "border-primary/40 bg-primary/5 opacity-60" : "border-border/60 hover:border-primary/40 hover:bg-accent/50"}`}
                >
                  <span className="text-lg">{u.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{u.name}</div>
                    <div className="text-muted-foreground truncate">{u.city} • QS #{u.qsRanking}</div>
                  </div>
                  {isSelected ? <Badge variant="secondary" className="text-[10px]">✓</Badge> : <Plus className="w-3 h-3" />}
                </button>
              );
            })}
            {filtered.length === 0 && (
              <p className="col-span-full text-xs text-muted-foreground text-center py-4">
                {t("Không có kết quả. Thử nút \"Tra AI\".", "No results. Try \"AI Lookup\".")}
              </p>
            )}
          </div>

          {/* Comparison table */}
          {selected.length > 0 ? (
            <AnimatePresence>
              <motion.div
                key={selected.map(s => s.id).join(",")}
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm" style={{ minWidth: 600 }}>
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="text-left p-3 font-semibold">{t("Tiêu chí", "Criteria")}</th>
                            {selected.map((u) => (
                              <th key={u.id} className="p-3 text-left font-semibold">
                                <div className="flex items-start gap-2">
                                  <span className="text-xl">{u.flag}</span>
                                  <div className="min-w-0 flex-1">
                                    <div className="leading-tight">{u.name}</div>
                                    <div className="text-[10px] text-muted-foreground font-normal">{u.city}</div>
                                  </div>
                                  <button
                                    onClick={() => removeUniversity(u.id)}
                                    className="text-muted-foreground hover:text-destructive"
                                    title={t("Xoá", "Remove")}
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-3 font-medium flex items-center gap-2"><Award className="w-4 h-4 text-violet-500" />{t("QS Ranking", "QS Ranking")}</td>
                            {selected.map((u) => (
                              <td key={u.id} className="p-3 font-bold">#{u.qsRanking < 9999 ? u.qsRanking : "—"}</td>
                            ))}
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 font-medium flex items-center gap-2"><DollarSign className="w-4 h-4 text-emerald-500" />{t("Học phí/năm", "Tuition / yr")}</td>
                            {selected.map((u) => (
                              <td key={u.id} className="p-3">{fmtUsd(u.tuitionUsd)}</td>
                            ))}
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 font-medium flex items-center gap-2"><Home className="w-4 h-4 text-sky-500" />{t("Sinh hoạt/năm", "Living / yr")}</td>
                            {selected.map((u) => (
                              <td key={u.id} className="p-3">{fmtUsd(u.livingCostUsd)}</td>
                            ))}
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 font-medium flex items-center gap-2"><Plane className="w-4 h-4 text-amber-500" />{t("Visa làm việc", "Post-study visa")}</td>
                            {selected.map((u) => (
                              <td key={u.id} className="p-3">{u.postStudyVisaMonths > 0 ? `${u.postStudyVisaMonths} ${t("tháng", "months")}` : "—"}</td>
                            ))}
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 font-medium">{t("Tổng/năm", "Total / yr")}</td>
                            {selected.map((u) => (
                              <td key={u.id} className="p-3 font-bold text-primary">
                                {fmtUsd(u.tuitionUsd + u.livingCostUsd)}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 font-medium">{t("Ngành nổi bật", "Top programs")}</td>
                            {selected.map((u) => (
                              <td key={u.id} className="p-3">
                                <div className="flex flex-wrap gap-1">
                                  {u.programsHighlight.map((p, i) => (
                                    <Badge key={i} variant="secondary" className="text-[10px]">{p}</Badge>
                                  ))}
                                </div>
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-3 font-medium">{t("Website", "Website")}</td>
                            {selected.map((u) => (
                              <td key={u.id} className="p-3">
                                {u.websiteUrl ? (
                                  <a href={u.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1 text-xs">
                                    {t("Mở", "Open")} <ExternalLink className="w-3 h-3" />
                                  </a>
                                ) : "—"}
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end mt-3">
                  <Button variant="ghost" size="sm" onClick={() => setSelected([])} className="gap-1 text-muted-foreground">
                    <Trash2 className="w-3.5 h-3.5" />
                    {t("Xoá tất cả", "Clear all")}
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-center py-12 text-sm text-muted-foreground border border-dashed rounded-xl">
              {t("Chọn ít nhất 1 trường để bắt đầu so sánh.", "Pick at least 1 school to start comparing.")}
            </div>
          )}
        </motion.div>
      </SheetContent>
    </Sheet>
  );
};

export default CompareSchoolsDashboard;
