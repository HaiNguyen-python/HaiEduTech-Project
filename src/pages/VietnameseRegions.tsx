import { Link } from "react-router-dom";
import { ArrowLeft, Globe, Award, Cloud } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { regions } from "@/data/vietnamese/regionsData";
import { travelDestinations } from "@/data/vietnamese/regionsExpansion";
import { MapPin, Clock, Lightbulb, Utensils } from "lucide-react";

const VietnameseRegions = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Du lịch Việt Nam: 3 miền & Di sản UNESCO | HaiEduTech" description="Khám phá 3 miền Việt Nam, các tỉnh thành nổi bật, di sản UNESCO và cụm từ du lịch hữu ích." path="/learn-vietnamese/regions" />
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
              {t("3 miền · 8 di sản UNESCO · Cụm từ du lịch thực dụng", "3 regions · 8 UNESCO sites · Practical travel phrases")}
            </p>
          </motion.div>

          <div className="space-y-8">
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
                        <h2 className="text-2xl md:text-3xl font-bold">{t(region.name, region.nameEn)}</h2>
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
                      <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
                        ⭐ {t("Điểm nổi bật", "Highlights")}
                      </h3>
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
                      <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        {t("Di sản UNESCO", "UNESCO Heritage")}
                      </h3>
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
                      <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
                        💬 {t("Cụm từ du lịch", "Travel Phrases")}
                      </h3>
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VietnameseRegions;
