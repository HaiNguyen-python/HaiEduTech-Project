import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap, Globe, Search, UserCog, Sparkles, Star, X,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { scholarships, COUNTRIES } from "@/data/globalScholarshipData";
import ConsultationBox, { type AdvisorInput } from "@/components/scholarship/ConsultationBox";
import AdvisorLoading from "@/components/scholarship/AdvisorLoading";
import RoadmapResults, { type AdvisorResponse } from "@/components/scholarship/RoadmapResults";
import ProfileEditorDialog from "@/components/scholarship/ProfileEditorDialog";
import CompareSchoolsDashboard from "@/components/scholarship/CompareSchoolsDashboard";
import ScholarshipCard from "@/components/scholarship/ScholarshipCard";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import AdSlot from "@/components/ads/AdSlot";

const LEVELS = ["Bachelor", "Master", "PhD"] as const;

// Group countries by region for cleaner filtering
const REGIONS = [
  {
    value: "north-america",
    labelEn: "North America",
    labelVi: "Bắc Mỹ",
    icon: "🌎",
    countries: ["USA", "Canada"],
  },
  {
    value: "europe",
    labelEn: "Europe",
    labelVi: "Châu Âu",
    icon: "🇪🇺",
    countries: ["UK", "Germany", "Finland", "EU", "France", "Switzerland", "Sweden", "Netherlands", "Ireland", "Estonia", "Belgium", "Norway"],
  },
  {
    value: "asia",
    labelEn: "Asia",
    labelVi: "Châu Á",
    icon: "🌏",
    countries: ["Japan", "South Korea", "Singapore", "China", "India", "Taiwan"],
  },
  {
    value: "oceania",
    labelEn: "Oceania",
    labelVi: "Châu Đại Dương",
    icon: "🏝️",
    countries: ["Australia", "New Zealand"],
  },
] as const;

const KnowledgeHubPage = () => {
  const { t, lang } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeRegion, setActiveRegion] = useState<string>("all");
  const [activeCountry, setActiveCountry] = useState("all");
  const [activeLevel, setActiveLevel] = useState<string>("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  // Countries available based on selected region
  const visibleCountries = useMemo(() => {
    if (activeRegion === "all") return COUNTRIES;
    const region = REGIONS.find((r) => r.value === activeRegion);
    if (!region) return COUNTRIES;
    return COUNTRIES.filter((c) => (region.countries as readonly string[]).includes(c.value));
  }, [activeRegion]);

  const filtered = useMemo(() => {
    const region = REGIONS.find((r) => r.value === activeRegion);
    return scholarships.filter((s) => {
      const matchesRegion = activeRegion === "all" || (region && (region.countries as readonly string[]).includes(s.country));
      const matchesCountry = activeCountry === "all" || s.country === activeCountry;
      const matchesLevel = activeLevel === "all" || s.levels.includes(activeLevel as any);
      const matchesFeatured = !featuredOnly || s.isFeatured;
      const name = lang === "vi" ? s.nameVi : s.name;
      const summary = lang === "vi" ? s.summaryVi : s.summaryEn;
      const matchesSearch = !search || name.toLowerCase().includes(search.toLowerCase()) || summary.toLowerCase().includes(search.toLowerCase()) || s.country.toLowerCase().includes(search.toLowerCase());
      return matchesRegion && matchesCountry && matchesLevel && matchesFeatured && matchesSearch;
    });
  }, [search, activeRegion, activeCountry, activeLevel, featuredOnly, lang]);

  // Group filtered scholarships by country for organized display
  const groupedByCountry = useMemo(() => {
    const groups = new Map<string, typeof filtered>();
    filtered.forEach((s) => {
      if (!groups.has(s.country)) groups.set(s.country, []);
      groups.get(s.country)!.push(s);
    });
    return Array.from(groups.entries()).sort((a, b) => b[1].length - a[1].length);
  }, [filtered]);

  const activeFilterCount =
    (activeRegion !== "all" ? 1 : 0) +
    (activeCountry !== "all" ? 1 : 0) +
    (activeLevel !== "all" ? 1 : 0) +
    (featuredOnly ? 1 : 0) +
    (search ? 1 : 0);

  const clearAllFilters = () => {
    setSearch("");
    setActiveRegion("all");
    setActiveCountry("all");
    setActiveLevel("all");
    setFeaturedOnly(false);
  };
  const [advisorLoading, setAdvisorLoading] = useState(false);
  const [advisorData, setAdvisorData] = useState<AdvisorResponse | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const { profile } = useStudentProfile();

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO title="60+ Học Bổng Quốc Tế ICT, EdTech, AI | HaiEduTech" description="Cơ sở dữ liệu 60+ học bổng tại 22 quốc gia ngành ICT, EdTech, AI. Tích hợp AI Scholarship Advisor cá nhân hóa lộ trình du học miễn phí." path="/global-scholarship" />
      <Navbar />
      <main className="flex-1 pt-28 lg:pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
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

          {/* Profile + Compare toolbar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setProfileOpen(true)}>
              <UserCog className="w-4 h-4" />
              {profile?.gpa || profile?.ielts_score
                ? t("Cập nhật hồ sơ", "Update Profile")
                : t("Tạo hồ sơ học thuật", "Create Academic Profile")}
            </Button>
            <CompareSchoolsDashboard />
            {(profile?.gpa || profile?.ielts_score) && (
              <Badge variant="secondary" className="gap-1 text-xs">
                <Sparkles className="w-3 h-3 text-primary" />
                {t("Match Score đã bật", "Match Score active")}
              </Badge>
            )}
          </div>

          <ProfileEditorDialog open={profileOpen} onOpenChange={setProfileOpen} />

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

          {/* AdSense - between AI advisor and scholarship library */}
          <AdSlot />

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

          {/* === Compact Filter Toolbar === */}
          <Card className="mb-6 border-primary/10">
            <CardContent className="p-4 sm:p-5 space-y-4">
              {/* Search bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t("Tìm theo tên học bổng, quốc gia...", "Search by name, country...")}
                  className="pl-10"
                />
              </div>

              {/* Region filter */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground mb-2">
                  🌍 {t("Khu vực", "Region")}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => { setActiveRegion("all"); setActiveCountry("all"); }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeRegion === "all" ? "bg-primary text-primary-foreground shadow-sm" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                  >
                    <Globe className="inline w-3 h-3 mr-1" />
                    {t("Toàn cầu", "Worldwide")}
                  </button>
                  {REGIONS.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => { setActiveRegion(r.value); setActiveCountry("all"); }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeRegion === r.value ? "bg-primary text-primary-foreground shadow-sm" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                    >
                      {r.icon} {lang === "vi" ? r.labelVi : r.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Country filter (auto-narrowed by region) */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground mb-2">
                  🏳️ {t("Quốc gia", "Country")}
                </p>
                <div className="flex gap-1.5 flex-wrap max-h-24 overflow-y-auto">
                  <button
                    onClick={() => setActiveCountry("all")}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${activeCountry === "all" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                  >
                    {t("Tất cả", "All")}
                  </button>
                  {visibleCountries.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setActiveCountry(c.value)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${activeCountry === c.value ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                    >
                      {c.flag} {lang === "vi" ? c.labelVi : c.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level + Featured row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1 border-t border-border">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground mb-2">
                    🎓 {t("Bậc học", "Level")}
                  </p>
                  <div className="flex gap-1.5 flex-wrap">
                    <button
                      onClick={() => setActiveLevel("all")}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${activeLevel === "all" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                    >
                      {t("Tất cả", "All")}
                    </button>
                    {LEVELS.map((level) => (
                      <button
                        key={level}
                        onClick={() => setActiveLevel(level)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${activeLevel === level ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground mb-2">
                    ⭐ {t("Loại", "Type")}
                  </p>
                  <button
                    onClick={() => setFeaturedOnly(!featuredOnly)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${featuredOnly ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                  >
                    <Star className={`w-3 h-3 ${featuredOnly ? "fill-current" : ""}`} />
                    {t("Chỉ học bổng nổi bật", "Featured only")}
                  </button>
                </div>

                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-3 h-3" />
                    {t(`Xóa bộ lọc (${activeFilterCount})`, `Clear filters (${activeFilterCount})`)}
                  </button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results summary */}
          <div className="flex items-center justify-between mb-5 px-1">
            <p className="text-sm text-muted-foreground">
              {t(`Tìm thấy `, `Found `)}
              <span className="font-bold text-foreground">{filtered.length}</span>
              {t(` học bổng tại `, ` scholarships across `)}
              <span className="font-bold text-foreground">{groupedByCountry.length}</span>
              {t(` quốc gia`, ` countries`)}
            </p>
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <GraduationCap className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground mb-3">
                {t("Không tìm thấy học bổng phù hợp.", "No matching scholarships found.")}
              </p>
              <Button variant="outline" size="sm" onClick={clearAllFilters}>
                {t("Đặt lại bộ lọc", "Reset filters")}
              </Button>
            </div>
          )}

          {/* === Scholarships grouped by country === */}
          <div className="space-y-10">
            {groupedByCountry.map(([countryCode, items]) => {
              const countryMeta = COUNTRIES.find((c) => c.value === countryCode);
              return (
                <section key={countryCode}>
                  <div className="flex items-center gap-3 mb-4 pb-2 border-b border-border">
                    <span className="text-2xl">{countryMeta?.flag || "🏳️"}</span>
                    <h2 className="text-lg font-bold text-foreground">
                      {countryMeta ? (lang === "vi" ? countryMeta.labelVi : countryMeta.labelEn) : countryCode}
                    </h2>
                    <Badge variant="secondary" className="text-xs">
                      {items.length} {t("học bổng", items.length === 1 ? "scholarship" : "scholarships")}
                    </Badge>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((s, i) => (
                      <ScholarshipCard key={s.id} scholarship={s} index={i} profile={profile} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* AdSense - bottom of scholarship library */}
          <AdSlot />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KnowledgeHubPage;
