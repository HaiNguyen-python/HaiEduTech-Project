import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap, Globe, Search, Calendar, ExternalLink, ChevronDown, ChevronUp, UserCog, Sparkles,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { scholarships, COUNTRIES, type Scholarship } from "@/data/globalScholarshipData";
import ConsultationBox, { type AdvisorInput } from "@/components/scholarship/ConsultationBox";
import AdvisorLoading from "@/components/scholarship/AdvisorLoading";
import RoadmapResults, { type AdvisorResponse } from "@/components/scholarship/RoadmapResults";
import ProfileEditorDialog from "@/components/scholarship/ProfileEditorDialog";
import CompareSchoolsDashboard from "@/components/scholarship/CompareSchoolsDashboard";
import MatchScoreRing from "@/components/scholarship/MatchScoreRing";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { computeMatchScore } from "@/lib/scholarshipMatcher";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const LEVELS = ["Bachelor", "Master", "PhD"] as const;

const LEVEL_COLORS: Record<string, string> = {
  Bachelor: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  Master: "bg-sky-500/15 text-sky-700 dark:text-sky-400",
  PhD: "bg-violet-500/15 text-violet-700 dark:text-violet-400",
};

const KnowledgeHubPage = () => {
  const { t, lang } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeCountry, setActiveCountry] = useState("all");
  const [activeLevel, setActiveLevel] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [advisorLoading, setAdvisorLoading] = useState(false);
  const [advisorData, setAdvisorData] = useState<AdvisorResponse | null>(null);

  const handleAdvisorSubmit = async (input: AdvisorInput) => {
    setAdvisorLoading(true);
    setAdvisorData(null);
    try {
      const { data, error } = await supabase.functions.invoke("scholarship-advisor", {
        body: { ...input, language: lang },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setAdvisorData(data as AdvisorResponse);
      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById("advisor-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (e: any) {
      toast({
        title: t("Lỗi", "Error"),
        description: e?.message || t("Không thể tư vấn lúc này. Thử lại sau.", "Couldn't get advice now. Try again."),
        variant: "destructive",
      });
    } finally {
      setAdvisorLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return scholarships.filter((s) => {
      const matchesCountry = activeCountry === "all" || s.country === activeCountry;
      const matchesLevel = activeLevel === "all" || s.levels.includes(activeLevel as any);
      const name = lang === "vi" ? s.nameVi : s.name;
      const summary = lang === "vi" ? s.summaryVi : s.summaryEn;
      const matchesSearch = !search || name.toLowerCase().includes(search.toLowerCase()) || summary.toLowerCase().includes(search.toLowerCase()) || s.country.toLowerCase().includes(search.toLowerCase());
      return matchesCountry && matchesLevel && matchesSearch;
    });
  }, [search, activeCountry, activeLevel, lang]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 lg:pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <GraduationCap className="w-8 h-8 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                {t("Học Bổng Toàn Cầu", "Global Scholarship")}
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t(
                "Tổng hợp các học bổng danh giá bậc Cử nhân, Thạc sỹ và Tiến sỹ tại nhiều quốc gia trên thế giới.",
                "Curated prestigious Bachelor's, Master's and PhD scholarships from countries around the world."
              )}
            </p>
          </motion.div>

          {/* AI Consultation Box */}
          <div className="mb-10">
            <ConsultationBox onSubmit={handleAdvisorSubmit} loading={advisorLoading} />
          </div>

          {/* AI Results / Loading */}
          <div id="advisor-results" className="mb-12 scroll-mt-24">
            {advisorLoading && <AdvisorLoading />}
            {!advisorLoading && advisorData && (
              <RoadmapResults data={advisorData} onReset={() => setAdvisorData(null)} />
            )}
          </div>

          {/* Browse curated scholarships divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-sm font-semibold text-muted-foreground">
                {t("Hoặc duyệt thư viện học bổng", "Or browse curated scholarships")}
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("Tìm học bổng...", "Search scholarships...")}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-3 mb-8">
            {/* Level filter */}
            <div className="flex gap-2 justify-center flex-wrap">
              <button
                onClick={() => setActiveLevel("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeLevel === "all" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
              >
                {t("Tất cả bậc", "All Levels")}
              </button>
              {LEVELS.map((level) => (
                <button
                  key={level}
                  onClick={() => setActiveLevel(level)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeLevel === level ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                >
                  {level}
                </button>
              ))}
            </div>
            {/* Country filter */}
            <div className="flex gap-2 justify-center flex-wrap">
              <button
                onClick={() => setActiveCountry("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeCountry === "all" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
              >
                <Globe className="inline w-3 h-3 mr-1" />
                {t("Tất cả", "All")}
              </button>
              {COUNTRIES.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setActiveCountry(c.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeCountry === c.value ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                >
                  {c.flag} {lang === "vi" ? c.labelVi : c.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6 text-center">
            {t(`Tìm thấy ${filtered.length} học bổng`, `Found ${filtered.length} scholarships`)}
          </p>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <GraduationCap className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">
                {t("Không tìm thấy học bổng phù hợp.", "No matching scholarships found.")}
              </p>
            </div>
          )}

          {/* Scholarship cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s, i) => {
              const isExpanded = expandedId === s.id;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.03, 0.3) }}
                >
                  <Card className="group hover:shadow-md transition-all h-full flex flex-col">
                    <CardContent className="p-5 flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{s.flag}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground font-medium">{t(s.countryVi, s.country)}</p>
                          {s.isFeatured && (
                            <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
                              ⭐ {t("Nổi bật", "Featured")}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {t(s.nameVi, s.name)}
                      </h3>

                      {/* Summary */}
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {t(s.summaryVi, s.summaryEn)}
                      </p>

                      {/* Levels */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {s.levels.map((level) => (
                          <Badge key={level} variant="secondary" className={`text-xs ${LEVEL_COLORS[level]}`}>
                            {level}
                          </Badge>
                        ))}
                      </div>

                      {/* Deadline */}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                        <Calendar className="h-3 w-3" />
                        <span>{t("Hạn nộp: ", "Deadline: ")}{s.deadline}</span>
                      </div>

                      {/* Expand/Collapse details */}
                      <button
                        onClick={() => toggleExpand(s.id)}
                        className="flex items-center gap-1 text-xs font-medium text-primary mb-2 hover:underline"
                      >
                        {isExpanded ? (
                          <>{t("Thu gọn", "Collapse")} <ChevronUp className="h-3 w-3" /></>
                        ) : (
                          <>{t("Xem chi tiết", "View details")} <ChevronDown className="h-3 w-3" /></>
                        )}
                      </button>

                      {isExpanded && (
                        <div className="text-xs space-y-3 mb-3 animate-in fade-in slide-in-from-top-2">
                          <div>
                            <p className="font-semibold text-foreground mb-1">{t("Quyền lợi:", "Benefits:")}</p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                              {(lang === "vi" ? s.benefitsVi : s.benefitsEn).map((b, idx) => (
                                <li key={idx}>{b}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground mb-1">{t("Điều kiện:", "Requirements:")}</p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                              {(lang === "vi" ? s.requirementsVi : s.requirementsEn).map((r, idx) => (
                                <li key={idx}>{r}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Apply link */}
                      <div className="mt-auto pt-2">
                        <a
                          href={s.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {t("Nộp hồ sơ", "Apply Now")} <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KnowledgeHubPage;
