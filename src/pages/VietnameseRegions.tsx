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
import { travelDestinations as baseDestinations } from "@/data/vietnamese/regionsExpansion";
import { travelDestinationsV10 } from "@/data/vietnamese/expansionV10Culture";
const travelDestinations = Object.values(
  [...baseDestinations, ...travelDestinationsV10].reduce<Record<string, (typeof baseDestinations)[number]>>((acc, d) => {
    acc[d.nameEn.toLowerCase().replace(/[^a-z]/g, "")] = d; // dedupe (giữ bản chi tiết hơn)
    return acc;
  }, {})
);
import { festivals, travelEssentials, etiquetteRules, countryStats } from "@/data/vietnamese/regionsExtras";
import regionsAuthentic from "@/assets/vietnamese/regions-authentic.jpg";
import regionNorth from "@/assets/vietnamese/region-north.jpg";
import regionCentral from "@/assets/vietnamese/region-central.jpg";
import regionSouth from "@/assets/vietnamese/region-south.jpg";
import destPhongNha from "@/assets/vietnamese/destinations/phong-nha.jpg";
import destDaLat from "@/assets/vietnamese/destinations/dalat.jpg";
import destHaGiang from "@/assets/vietnamese/destinations/ha-giang.jpg";

const DEST_BG: Record<string, string> = {
  halong: "/vietnam-beauty-4.webp",
  sapa: "/vietnam-beauty-11.webp",
  hoian: "/vietnam-beauty-10.webp",
  phongnha: destPhongNha,
  phuquoc: "/vietnam-beauty-15.webp",
  "phu-quoc": "/vietnam-beauty-15.webp",
  dalat: destDaLat,
  mekong: "/vietnam-beauty-12.webp",
  haggiang: destHaGiang,
  "ninh-binh": "/vietnam-beauty-14.webp",
};

const FACT_IMAGES = Object.values(import.meta.glob("@/assets/vietnamese/facts/*.jpg", { eager: true, import: "default" })) as string[];
const FESTIVAL_IMAGES = import.meta.glob("@/assets/vietnamese/festivals/*.jpg", { eager: true, import: "default" }) as Record<string, string>;
const festivalImage = (id: string) => Object.entries(FESTIVAL_IMAGES).find(([k]) => k.endsWith(`/${id}.jpg`))?.[1];

const REGION_BG: Record<string, { src: string; vi: string; en: string }> = {
  north: { src: regionNorth, vi: "Vịnh Hạ Long lúc bình minh", en: "Ha Long Bay at dawn" },
  central: { src: regionCentral, vi: "Phố cổ Hội An bên sông Thu Bồn", en: "Hoi An Ancient Town on the Thu Bon River" },
  south: { src: regionSouth, vi: "Chợ nổi miền Tây lúc bình minh", en: "Mekong Delta floating market at sunrise" },
};

const VietnameseRegions = () => {
  const { t } = useLanguage();

  return (
    <div className="vietnamese-readable min-h-screen bg-background">
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
            <img src={regionsAuthentic} alt={t("Cảnh quan tiêu biểu của ba miền Việt Nam", "Representative landscapes of northern, central and southern Vietnam")} className="mb-6 aspect-[3/1] w-full rounded-lg object-cover" width={1200} height={800} />
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-8 h-8 text-emerald-500" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("Du lịch & Vùng miền", "Travel & Regions")}
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              {t(
                `3 miền · ${regions.reduce((n, r) => n + r.unesco.length, 0)} di sản & danh hiệu UNESCO · ${travelDestinations.length} điểm đến · ${festivals.length} lễ hội · Mẹo thực dụng`,
                `3 regions · ${regions.reduce((n, r) => n + r.unesco.length, 0)} UNESCO listings · ${travelDestinations.length} destinations · ${festivals.length} festivals · Practical tips`
              )}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("Lịch lễ hội, giá và thông tin dịch vụ có thể thay đổi. Hãy kiểm tra nguồn chính thức trước chuyến đi.", "Festival dates, prices and services may change. Check official sources before travelling.")}
            </p>
          </motion.div>

          {/* Quick country stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Flag className="w-5 h-5 text-primary" />
              {t("Việt Nam - Tổng quan nhanh", "Vietnam - Quick Facts")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {countryStats.map((s, i) => (
                <div key={i} className="group overflow-hidden bg-card border-2 border-emerald-500/55 shadow-[0_3px_14px_-6px_rgba(16,185,129,0.28)] rounded-lg hover:border-primary/40 transition-colors">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={FACT_IMAGES[i]} alt={t(s.label, s.labelEn)} loading="lazy" width={400} height={225} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-3">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">{t(s.label, s.labelEn)}</div>
                  <div className="text-sm font-semibold text-foreground mt-0.5">{t(s.value, s.valueEn)}</div>
                  </div>
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
                <Card className="overflow-hidden border-2 border-emerald-500/55 shadow-[0_3px_14px_-6px_rgba(16,185,129,0.28)]">
                  <div className="relative isolate min-h-[300px] overflow-hidden p-6 md:p-8 text-white flex flex-col justify-end">
                    <img src={REGION_BG[region.id].src} alt={t(REGION_BG[region.id].vi, REGION_BG[region.id].en)} loading="lazy" width={1600} height={640} className="absolute inset-0 -z-10 h-full w-full object-cover" />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
                    <span className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs text-white/90 backdrop-blur-sm">
                      {t(REGION_BG[region.id].vi, REGION_BG[region.id].en)}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold drop-shadow">{t(region.name, region.nameEn)}</h3>
                    <p className="text-white/90 text-sm mt-1">{t(`Trung tâm: ${region.capital}`, `Main city: ${region.capitalEn}`)} · {region.population}</p>
                    <p className="text-white/95 text-base mt-3 leading-relaxed max-w-3xl">
                      {t(region.description, region.descriptionEn)}
                    </p>
                    <div className="flex items-center gap-2 mt-4 w-fit text-sm bg-white/15 rounded-lg px-3 py-2 backdrop-blur-sm">
                      <Cloud className="w-4 h-4 shrink-0" />
                      <span>{t(region.climate, region.climateEn)}</span>
                    </div>
                  </div>

                  <CardContent className="pt-6 grid md:grid-cols-3 gap-6">
                    {/* Highlights */}
                    <div>
                      <h4 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
                        {t("Điểm nổi bật", "Highlights")}
                      </h4>
                      <div className="space-y-2">
                        {region.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
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
                        {t("Cụm từ du lịch", "Travel Phrases")}
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
                  <Card className="group h-full overflow-hidden border border-border/70 bg-card shadow-[0_14px_40px_-24px_hsl(var(--foreground)/0.35)] transition-shadow hover:shadow-[0_22px_54px_-24px_hsl(var(--foreground)/0.45)]">
                    {/* Scenic header */}
                    <div className="relative h-36 overflow-hidden sm:h-40">
                      {DEST_BG[d.id] ? (
                        <img src={DEST_BG[d.id]} alt={t(d.name, d.nameEn)} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-primary/70 to-emerald-600/70" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                        <div className="min-w-0">
                          <h3 className="truncate text-lg font-bold text-white drop-shadow-md">{t(d.name, d.nameEn)}</h3>
                          <div className="mt-0.5 truncate text-sm italic text-white/85">{t(d.nameEn, d.name)}</div>
                        </div>
                        <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
                          <Badge className="border-white/40 bg-white/20 text-xs capitalize text-white backdrop-blur-sm hover:bg-white/25">{d.region}</Badge>
                          <Badge className="border-white/40 bg-white/20 text-xs capitalize text-white backdrop-blur-sm hover:bg-white/25">{d.type}</Badge>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-4 sm:p-5">
                      {/* Quick facts */}
                      <div className="mb-4 grid grid-cols-2 gap-2">
                        <div className="flex items-start gap-2 rounded-lg border border-border/60 bg-muted/40 p-2.5">
                          <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <div className="min-w-0">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t("Thời điểm đẹp", "Best time")}</div>
                            <div className="text-xs font-medium leading-snug text-foreground">{t(d.bestTime, d.bestTimeEn)}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 rounded-lg border border-border/60 bg-muted/40 p-2.5">
                          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <div className="min-w-0">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t("Thời lượng", "Duration")}</div>
                            <div className="text-xs font-medium leading-snug text-foreground">{t(d.duration, d.duringEn)}</div>
                          </div>
                        </div>
                      </div>

                      {/* Experiences */}
                      <div className="mb-4">
                        <div className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 text-primary" /> {t("Trải nghiệm", "Experiences")}
                        </div>
                        <ul className="space-y-1.5">
                          {d.highlights.map((h, j) => (
                            <li key={j} className="relative pl-4 text-sm leading-snug text-foreground/90 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-primary">
                              {t(h.vi, h.en)}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Must eat */}
                      <div className="mb-4">
                        <div className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                          <Utensils className="h-3.5 w-3.5 text-primary" /> {t("Phải thử", "Must Eat")}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {d.mustEat.map((m, j) => (
                            <Badge key={j} variant="secondary" className="text-xs font-normal">{t(m.vi, m.en)}</Badge>
                          ))}
                        </div>
                      </div>

                      {/* Tip */}
                      <div className="rounded-lg border border-amber-500/25 bg-amber-500/10 p-2.5 text-sm">
                        <div className="flex gap-2">
                          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                          <span className="leading-relaxed text-foreground/90">{t(d.tip, d.tipEn)}</span>
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
                  <Card className="h-full border-2 border-emerald-500/55 shadow-[0_3px_14px_-6px_rgba(16,185,129,0.28)] hover:border-rose-500/40 transition-colors">
                    {festivalImage(f.id) && (
                      <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
                        <img src={festivalImage(f.id)} alt={t(f.name, f.nameEn)} loading="lazy" width={512} height={288} className="h-full w-full object-cover" />
                      </div>
                    )}
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3 mb-2">
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
                  <Card className="h-full overflow-hidden border border-border/70 bg-card shadow-[0_14px_40px_-24px_hsl(var(--foreground)/0.35)]">
                    <div className="h-1 w-full bg-gradient-to-r from-primary via-emerald-500 to-primary" />
                    <CardContent className="p-6">
                      <div className="mb-5 flex items-baseline justify-between gap-3 border-b border-border/60 pb-3">
                        <h3 className="text-lg font-bold text-foreground">{t(e.title, e.titleEn)}</h3>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <div className="rounded-xl bg-muted/40 px-4 py-1">
                        {e.details.map((d, j) => (
                          <div key={j} className="grid gap-0.5 border-b border-border/50 py-3 last:border-0 last:pb-1.5">
                            <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                              {t(d.label, d.labelEn)}
                            </div>
                            <div className="text-sm leading-relaxed text-foreground/90 mt-0.5">{t(d.value, d.valueEn)}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5">
                        <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                          <Lightbulb className="w-3.5 h-3.5 text-primary" />
                          {t("Mẹo thực dụng", "Practical tips")}
                        </div>
                        <ul className="space-y-2">
                          {e.tips.map((tip, j) => (
                            <li key={j} className="flex gap-2.5 rounded-lg border border-primary/15 bg-primary/5 p-3 text-sm">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <span className="leading-relaxed text-foreground/90">{t(tip.vi, tip.en)}</span>
                            </li>
                          ))}
                        </ul>
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
              <Info className="w-6 h-6 text-primary" />
              {t("Văn hóa ứng xử", "Cultural Etiquette")}
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {([
                {
                  type: "do" as const,
                  title: t("NÊN làm", "DO"),
                  icon: CheckCircle2,
                  bar: "from-emerald-500 to-teal-500",
                  headerText: "text-emerald-700 dark:text-emerald-300",
                  headerBg: "bg-emerald-500/10",
                  chip: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
                  pill: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
                },
                {
                  type: "dont" as const,
                  title: t("KHÔNG nên", "DON'T"),
                  icon: XCircle,
                  bar: "from-rose-500 to-red-500",
                  headerText: "text-rose-700 dark:text-rose-300",
                  headerBg: "bg-rose-500/10",
                  chip: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
                  pill: "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300",
                },
              ]).map((col) => {
                const Icon = col.icon;
                return (
                  <Card key={col.type} className="overflow-hidden border-border/60 shadow-sm">
                    <div className={`h-1.5 bg-gradient-to-r ${col.bar}`} />
                    <div className={`flex items-center gap-3 px-5 py-4 border-b border-border/50 ${col.headerBg}`}>
                      <span className={`flex h-9 w-9 items-center justify-center rounded-full ${col.chip}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className={`text-base font-bold tracking-wide ${col.headerText}`}>{col.title}</h3>
                      <span className={`ml-auto text-xs font-semibold ${col.headerText} opacity-70`}>
                        {etiquetteRules.filter(r => r.type === col.type).length} {t("quy tắc", "rules")}
                      </span>
                    </div>
                    <CardContent className="p-4 sm:p-5">
                      <ul className="space-y-2.5">
                        {etiquetteRules.filter(r => r.type === col.type).map((r, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-3 transition-colors hover:bg-muted/40"
                          >
                            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${col.chip}`}>
                              <Icon className="h-4 w-4" />
                            </span>
                            <p className="flex-1 text-sm leading-snug text-foreground">{t(r.vi, r.en)}</p>
                            <Badge variant="outline" className={`shrink-0 text-[11px] font-medium ${col.pill}`}>
                              {t(r.context, r.contextEn)}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VietnameseRegions;
