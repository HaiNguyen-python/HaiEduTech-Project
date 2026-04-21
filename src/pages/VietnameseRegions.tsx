import { Link } from "react-router-dom";
import { ArrowLeft, Globe, Award, Cloud, MapPin, Clock, Lightbulb, Utensils, Sparkles, Calendar, Info, CheckCircle2, XCircle, Flag } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { regions } from "@/data/vietnamese/regionsData";
import { travelDestinations } from "@/data/vietnamese/regionsExpansion";
import { festivals, travelEssentials, etiquetteRules, countryStats } from "@/data/vietnamese/regionsExtras";

const VietnameseRegions = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Du lịch Việt Nam: 3 miền, Lễ hội & Mẹo du lịch | HaiEduTech"
        description="Khám phá 3 miền Việt Nam, di sản UNESCO, lễ hội truyền thống, mẹo di chuyển, tiền tệ, an toàn và văn hóa ứng xử."
        path="/learn-vietnamese/regions"
      />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <Link to="/learn-vietnamese" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            {t("Quay lại", "Back")}
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-8 h-8 text-emerald-500" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("Du lịch & Vùng miền", "Travel & Regions")}
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              {t(
                "3 miền · 8 di sản UNESCO · 8 điểm đến · 6 lễ hội · Mẹo thực dụng",
                "3 regions · 8 UNESCO sites · 8 destinations · 6 festivals · Practical tips"
              )}
            </p>
          </motion.div>

          {/* Quick country stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Flag className="w-5 h-5 text-primary" />
              {t("Việt Nam — Tổng quan nhanh", "Vietnam — Quick Facts")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {countryStats.map((s, i) => (
                <div key={i} className="bg-card border border-border/50 rounded-lg p-3 hover:border-primary/40 transition-colors">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">{t(s.label, s.labelEn)}</div>
                  <div className="text-sm font-semibold text-foreground mt-0.5">{t(s.value, s.valueEn)}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Regions */}
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6 text-emerald-500" />
            {t("3 Miền của Việt Nam", "3 Regions of Vietnam")}
          </h2>
          <div className="space-y-8 mb-12">
            {regions.map((region, idx) => (
              <motion.div
                key={region.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="overflow-hidden border-border/50">
                  <div className={`bg-gradient-to-r ${region.color} p-6 text-white`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-5xl">{region.emoji}</span>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold">{t(region.name, region.nameEn)}</h3>
                        <p className="text-white/90 text-sm">{t(`Trung tâm: ${region.capital}`, `Capital: ${region.capitalEn}`)} · {region.population}</p>
                      </div>
                    </div>
                    <p className="text-white/95 text-base mt-3 leading-relaxed">
                      {t(region.description, region.descriptionEn)}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-sm bg-white/15 rounded-lg px-3 py-2 backdrop-blur-sm">
                      <Cloud className="w-4 h-4" />
                      <span>{t(region.climate, region.climateEn)}</span>
                    </div>
                  </div>

                  <CardContent className="pt-6 grid md:grid-cols-3 gap-6">
                    {/* Highlights */}
                    <div>
                      <h4 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
                        ⭐ {t("Điểm nổi bật", "Highlights")}
                      </h4>
                      <div className="space-y-2">
                        {region.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <span className="text-xl">{h.emoji}</span>
                            <div>
                              <div className="font-medium text-foreground">{t(h.name, h.nameEn)}</div>
                              <div className="text-xs text-muted-foreground">{h.province}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* UNESCO */}
                    <div>
                      <h4 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        {t("Di sản UNESCO", "UNESCO Heritage")}
                      </h4>
                      <div className="space-y-3">
                        {region.unesco.map((u, i) => (
                          <div key={i} className="border-l-2 border-primary/40 pl-3">
                            <div className="font-medium text-foreground text-sm">{t(u.name, u.nameEn)}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">{u.year}</Badge>
                              <Badge variant="outline" className="text-xs">{t(u.type, u.typeEn)}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Travel phrases */}
                    <div>
                      <h4 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
                        💬 {t("Cụm từ du lịch", "Travel Phrases")}
                      </h4>
                      <div className="space-y-2">
                        {region.travelPhrases.map((p, i) => (
                          <div key={i} className="bg-muted/50 rounded-lg p-2.5">
                            <div className="text-sm font-medium text-foreground">{p.vi}</div>
                            <div className="text-xs text-muted-foreground italic mt-0.5">{p.en}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Top destinations */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-500" />
              {t("Điểm đến hàng đầu", "Top Destinations")}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {travelDestinations.map((d, i) => (
                <motion.div key={d.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Card className="h-full border-border/50 hover:border-primary/40 transition-colors">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-4xl">{d.emoji}</span>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground">{t(d.name, d.nameEn)}</h3>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            <Badge variant="secondary" className="text-xs capitalize">{d.region}</Badge>
                            <Badge variant="outline" className="text-xs capitalize">{d.type}</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm mb-3">
                        <div className="flex items-start gap-2">
                          <Calendar className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-foreground">{t(d.bestTime, d.bestTimeEn)}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-foreground">{t(d.duration, d.duringEn)}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1.5 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" /> {t("Trải nghiệm", "Experiences")}
                        </div>
                        <ul className="space-y-1">
                          {d.highlights.map((h, j) => (
                            <li key={j} className="text-sm text-foreground/90 pl-4 relative before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-primary before:rounded-full">
                              {t(h.vi, h.en)}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-3">
                        <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1.5 flex items-center gap-1.5">
                          <Utensils className="w-3.5 h-3.5" /> {t("Phải thử", "Must Eat")}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {d.mustEat.map((m, j) => (
                            <Badge key={j} variant="secondary" className="text-xs font-normal">{t(m.vi, m.en)}</Badge>
                          ))}
                        </div>
                      </div>

                      <div className="bg-amber-500/10 border-l-2 border-amber-500 rounded-r-md p-2.5 text-sm">
                        <div className="flex gap-2">
                          <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                          <span className="text-foreground/90">{t(d.tip, d.tipEn)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Festivals */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-rose-500" />
              {t("Lễ hội truyền thống", "Traditional Festivals")}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {festivals.map((f, i) => (
                <motion.div key={f.id} initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Card className="h-full border-border/50 hover:border-rose-500/40 transition-colors">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3 mb-2">
                        <span className="text-4xl">{f.emoji}</span>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground">{t(f.name, f.nameEn)}</h3>
                          <Badge variant="outline" className="text-xs mt-1 capitalize">{f.region === "all" ? t("Toàn quốc", "Nationwide") : f.region}</Badge>
                        </div>
                      </div>
                      <div className="space-y-1.5 text-sm mb-3">
                        <div className="flex items-start gap-2">
                          <Clock className="w-3.5 h-3.5 text-rose-500 mt-1 shrink-0" />
                          <span className="text-foreground/90">{t(f.time, f.timeEn)}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 mt-1 shrink-0" />
                          <span className="text-foreground/90">{t(f.location, f.locationEn)}</span>
                        </div>
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed mb-2">
                        {t(f.description, f.descriptionEn)}
                      </p>
                      <div className="bg-rose-500/10 border-l-2 border-rose-500 rounded-r-md p-2.5 text-sm">
                        <div className="flex gap-2">
                          <Sparkles className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                          <span className="text-foreground/90">{t(f.highlight, f.highlightEn)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Travel essentials */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-500" />
              {t("Cẩm nang du lịch", "Travel Essentials")}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {travelEssentials.map((e, i) => (
                <motion.div key={e.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Card className="h-full border-border/50">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">{e.icon}</span>
                        <h3 className="text-lg font-bold text-foreground">{t(e.title, e.titleEn)}</h3>
                      </div>
                      <div className="space-y-2 mb-4">
                        {e.details.map((d, j) => (
                          <div key={j} className="border-b border-border/40 pb-2 last:border-0">
                            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                              {t(d.label, d.labelEn)}
                            </div>
                            <div className="text-sm text-foreground mt-0.5">{t(d.value, d.valueEn)}</div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        {e.tips.map((tip, j) => (
                          <div key={j} className="bg-blue-500/10 border-l-2 border-blue-500 rounded-r-md p-2 text-sm">
                            <div className="flex gap-2">
                              <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                              <span className="text-foreground/90">{t(tip.vi, tip.en)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Etiquette */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              🙏 {t("Văn hóa ứng xử", "Cultural Etiquette")}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-emerald-500/30 bg-emerald-500/5">
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    {t("NÊN làm", "DO")}
                  </h3>
                  <ul className="space-y-2.5">
                    {etiquetteRules.filter(r => r.type === "do").map((r, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-foreground">{t(r.vi, r.en)}</div>
                          <Badge variant="outline" className="text-xs mt-1">{t(r.context, r.contextEn)}</Badge>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-rose-500/30 bg-rose-500/5">
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold text-rose-600 dark:text-rose-400 mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    {t("KHÔNG nên", "DON'T")}
                  </h3>
                  <ul className="space-y-2.5">
                    {etiquetteRules.filter(r => r.type === "dont").map((r, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <XCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-foreground">{t(r.vi, r.en)}</div>
                          <Badge variant="outline" className="text-xs mt-1">{t(r.context, r.contextEn)}</Badge>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VietnameseRegions;
