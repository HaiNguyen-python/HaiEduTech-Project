/**
 * @file PhdGlobalPathway.tsx
 * @description PhD Strategy Hub — country guides (8), funding database (28+),
 *              12-month timeline, AI Cold Email generator, downloadable templates.
 */
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap, Globe2, ChevronRight,
  Calendar, Wallet, AlertTriangle, Building2, Filter, Download,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { PHD_COUNTRY_GUIDES } from "@/data/phdCountryGuides";
import { PHD_FUNDING, PHD_FUNDING_COUNTRIES, PHD_FUNDING_FIELDS, PHD_FUNDING_TIERS, type PhdFundingField, type PhdFundingTier } from "@/data/phdFundingDatabase";
import { PHD_TIMELINE } from "@/data/phdTimeline";
import { PHD_FAQ } from "@/data/phdFaq";
import { FUNDING_WITH_MONTHS } from "@/lib/phdFundingHelpers";
import PhdProgressTracker from "@/components/phd/PhdProgressTracker";
import PhdProposalBuilder from "@/components/phd/PhdProposalBuilder";
import PhdColdEmailStudio from "@/components/phd/PhdColdEmailStudio";
import PhdFaq from "@/components/phd/PhdFaq";
import PhdSupervisorFinder from "@/components/phd/PhdSupervisorFinder";
import PhdDeadlineRadar from "@/components/phd/PhdDeadlineRadar";

const PhdGlobalPathway = () => {
  const { t, lang } = useLanguage();
  const vi = lang === "vi";

  // ---------- Funding filters ----------
  const [fCountry, setFCountry] = useState<string>("all");
  const [fField, setFField] = useState<PhdFundingField | "all">("all");
  const [fTier, setFTier] = useState<PhdFundingTier | "all">("all");
  const [fMonth, setFMonth] = useState<number | null>(null);

  const filteredFunding = useMemo(() => FUNDING_WITH_MONTHS.filter((f) =>
    (fCountry === "all" || f.country === fCountry) &&
    (fField === "all" || f.fields.includes(fField as PhdFundingField) || f.fields.includes("Any")) &&
    (fTier === "all" || f.tier === fTier) &&
    (fMonth === null || f.months.includes(fMonth) || f.rolling),
  ), [fCountry, fField, fTier, fMonth]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-28 lg:pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-700 dark:text-violet-400 text-xs font-semibold mb-4">
              <GraduationCap className="w-3.5 h-3.5" />
              {t("Chiến lược học bổng Tiến sĩ", "PhD Strategy Hub")}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 bg-clip-text text-transparent">
              {t("PhD Global Pathway", "PhD Global Pathway")}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t(
                "8 quốc gia · 28+ học bổng · lộ trình 12 tháng · AI sinh email gửi giáo sư.",
                "8 countries · 28+ funding sources · 12-month timeline · AI supervisor email.",
              )}
            </p>

            {/* Stats strip */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 max-w-2xl mx-auto">
              {[
                { num: PHD_COUNTRY_GUIDES.length, vi: "Quốc gia", en: "Countries" },
                { num: PHD_FUNDING.length, vi: "Học bổng", en: "Funding sources" },
                { num: PHD_TIMELINE.length, vi: "Tháng lộ trình", en: "Roadmap months" },
                { num: PHD_FAQ.length, vi: "Câu hỏi FAQ", en: "FAQ answered" },
              ].map((s) => (
                <div key={s.en} className="p-3 rounded-lg bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">{s.num}</div>
                  <div className="text-[11px] text-muted-foreground font-medium">{t(s.vi, s.en)}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Templates */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
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

          {/* PhD Journey Progress Tracker */}
          <PhdProgressTracker />



          {/* Country guides */}
          <h2 className="text-2xl md:text-3xl font-bold mb-5 flex items-center gap-2">
            <Globe2 className="w-6 h-6 text-violet-500" /> {t("Chiến lược theo quốc gia", "Country-Specific Strategy")}
          </h2>
          <Tabs defaultValue={PHD_COUNTRY_GUIDES[0].id} className="mb-14">
            <div className="overflow-x-auto -mx-1 px-1 mb-4">
              <TabsList className="inline-flex w-max gap-1">
                {PHD_COUNTRY_GUIDES.map((c) => (
                  <TabsTrigger key={c.id} value={c.id} className="gap-1.5 whitespace-nowrap">
                    <span>{c.flag}</span>
                    <span>{vi ? c.nameVi : c.nameEn}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {PHD_COUNTRY_GUIDES.map((c) => (
              <TabsContent key={c.id} value={c.id}>
                <Card className="overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${c.gradient}`} />
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="text-4xl">{c.flag}</div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold">{vi ? c.nameVi : c.nameEn}</h3>
                        <Badge className="mt-1 bg-primary/10 text-primary border-primary/30">{vi ? c.strategyVi : c.strategyEn}</Badge>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-5">
                      <div>
                        <h4 className="text-sm font-bold mb-2 uppercase tracking-wide text-muted-foreground">{t("Tips quan trọng", "Key tips")}</h4>
                        <ul className="space-y-2.5">
                          {(vi ? c.tipsVi : c.tipsEn).map((tip, i) => (
                            <li key={i} className="flex gap-2 text-sm">
                              <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-5 p-4 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40">
                          <h4 className="text-sm font-bold mb-2 flex items-center gap-1.5 text-rose-700 dark:text-rose-400">
                            <AlertTriangle className="w-4 h-4" /> {t("Sai lầm cần tránh", "Common red flags")}
                          </h4>
                          <ul className="space-y-1.5">
                            {(vi ? c.redFlagsVi : c.redFlagsEn).map((r, i) => (
                              <li key={i} className="text-xs text-rose-800 dark:text-rose-300">• {r}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40">
                          <h4 className="text-sm font-bold mb-2 flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                            <Wallet className="w-4 h-4" /> {t("Funding", "Funding")}
                          </h4>
                          <p className="text-sm">{vi ? c.fundingVi : c.fundingEn}</p>
                          <p className="text-xs mt-1.5 text-muted-foreground">
                            💵 {c.stipendUsdPerMonth} / mo · 🗓️ {vi ? c.typicalDeadlineVi : c.typicalDeadlineEn}
                          </p>
                        </div>

                        <div className="p-4 rounded-lg bg-sky-50 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-900/40">
                          <h4 className="text-sm font-bold mb-2 flex items-center gap-1.5 text-sky-700 dark:text-sky-400">
                            <Building2 className="w-4 h-4" /> {t("Trường gợi ý", "Top universities")}
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {c.topUnis.map((u) => (
                              <Badge key={u} variant="secondary" className="text-xs">{u}</Badge>
                            ))}
                          </div>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-xs min-w-[420px] border rounded-lg overflow-hidden">
                            <tbody>
                              <tr className="border-b"><td className="p-2 font-semibold bg-muted/40 w-1/3">IELTS</td><td className="p-2">{c.requirements.ielts}</td></tr>
                              <tr className="border-b"><td className="p-2 font-semibold bg-muted/40">TOEFL</td><td className="p-2">{c.requirements.toefl}</td></tr>
                              <tr className="border-b"><td className="p-2 font-semibold bg-muted/40">GPA</td><td className="p-2">{c.requirements.gpa}</td></tr>
                              <tr className="border-b"><td className="p-2 font-semibold bg-muted/40">GRE</td><td className="p-2">{c.requirements.gre}</td></tr>
                              <tr><td className="p-2 font-semibold bg-muted/40">{t("Khác", "Other")}</td><td className="p-2">{vi ? c.requirements.otherVi : c.requirements.other}</td></tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40">
                          <h4 className="text-sm font-bold mb-2 flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
                            <Calendar className="w-4 h-4" /> {t("Mốc thời gian", "When to start")}
                          </h4>
                          <ul className="space-y-1.5 text-xs">
                            {c.timeline.map((tl, i) => (
                              <li key={i} className="flex gap-2">
                                <span className="font-bold w-16 flex-shrink-0">{vi ? tl.whenVi : tl.whenEn}</span>
                                <span>{vi ? tl.doVi : tl.doEn}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          {/* Funding database */}
          <h2 className="text-2xl md:text-3xl font-bold mb-5 flex items-center gap-2">
            <Wallet className="w-6 h-6 text-emerald-500" /> {t("Kho học bổng PhD", "PhD Funding Database")}
            <Badge className="ml-1 bg-emerald-500/10 text-emerald-700 border-emerald-500/30">{PHD_FUNDING.length}</Badge>
          </h2>

          <Card className="mb-5">
            <CardContent className="p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground"><Filter className="w-4 h-4" />{t("Lọc", "Filter")}</div>
              <Select value={fCountry} onValueChange={setFCountry}>
                <SelectTrigger className="sm:w-44"><SelectValue placeholder={t("Quốc gia", "Country")} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("Tất cả quốc gia", "All countries")}</SelectItem>
                  {PHD_FUNDING_COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={fField} onValueChange={(v) => setFField(v as any)}>
                <SelectTrigger className="sm:w-40"><SelectValue placeholder={t("Ngành", "Field")} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("Mọi ngành", "All fields")}</SelectItem>
                  {PHD_FUNDING_FIELDS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={fTier} onValueChange={(v) => setFTier(v as any)}>
                <SelectTrigger className="sm:w-44"><SelectValue placeholder={t("Mức tài trợ", "Tier")} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("Tất cả mức", "All tiers")}</SelectItem>
                  {PHD_FUNDING_TIERS.map((t2) => <SelectItem key={t2} value={t2}>{t2}</SelectItem>)}
                </SelectContent>
              </Select>
              <div className="text-xs text-muted-foreground sm:ml-auto">{filteredFunding.length} {t("kết quả", "results")}</div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4 mb-14">
            {filteredFunding.map((f) => (
              <Card key={f.id} className="hover:shadow-lg transition-shadow border-2 hover:border-emerald-300 dark:hover:border-emerald-700">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{f.flag}</span>
                      <div>
                        <div className="font-bold leading-tight">{f.name}</div>
                        <div className="text-xs text-muted-foreground">{f.country}</div>
                      </div>
                    </div>
                    <Badge className={
                      f.tier === "full" ? "bg-emerald-500/15 text-emerald-700 border-emerald-500/30"
                      : f.tier === "stipend" ? "bg-sky-500/15 text-sky-700 border-sky-500/30"
                      : f.tier === "tuition" ? "bg-amber-500/15 text-amber-700 border-amber-500/30"
                      : "bg-slate-500/15 text-slate-700 border-slate-500/30"
                    }>{f.tier}</Badge>
                  </div>
                  <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-1">💰 {vi ? f.amountVi : f.amountEn}</p>
                  <p className="text-xs text-muted-foreground mb-2">🗓️ {vi ? f.deadlineVi : f.deadlineEn}</p>
                  <p className="text-xs mb-3">{vi ? f.noteVi : f.noteEn}</p>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {f.fields.map((fld) => <Badge key={fld} variant="secondary" className="text-[10px]">{fld}</Badge>)}
                    <a href={f.url} target="_blank" rel="noopener noreferrer" className="ml-auto text-xs font-semibold text-primary hover:underline">{t("Trang chính thức ↗", "Official site ↗")}</a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 12-month timeline */}
          <h2 className="text-2xl md:text-3xl font-bold mb-5 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-fuchsia-500" /> {t("Lộ trình 12 tháng", "12-Month Timeline")}
          </h2>
          <div className="overflow-x-auto -mx-1 px-1 mb-14">
            <div className="flex gap-3 min-w-max pb-3">
              {PHD_TIMELINE.map((m) => (
                <Card key={m.month} className="w-64 flex-shrink-0 hover:shadow-md transition-shadow border-l-4 border-l-fuchsia-400">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{m.icon}</span>
                      <Badge variant="secondary" className="text-xs">{vi ? m.labelVi : m.labelEn}</Badge>
                    </div>
                    <h4 className="font-bold text-sm mb-1.5 leading-tight">{vi ? m.taskVi : m.taskEn}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{vi ? m.detailVi : m.detailEn}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* AI Research Proposal Builder */}
          <PhdProposalBuilder />

          {/* AI Cold Email Studio v2 */}
          <PhdColdEmailStudio />

          {/* FAQ */}
          <PhdFaq />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PhdGlobalPathway;
