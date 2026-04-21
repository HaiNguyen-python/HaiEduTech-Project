import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Drum } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cultureTopics as baseTopics, type CultureTopic } from "@/data/vietnamese/cultureData";
import { cultureExpansion } from "@/data/vietnamese/cultureExpansion";
const cultureTopics = [...baseTopics, ...cultureExpansion];

const categoryLabels: Record<CultureTopic["category"], { vi: string; en: string }> = {
  attire: { vi: "Trang phục", en: "Attire" },
  festival: { vi: "Lễ hội", en: "Festivals" },
  ritual: { vi: "Nghi lễ", en: "Rituals" },
  craft: { vi: "Thủ công", en: "Crafts" },
  belief: { vi: "Tín ngưỡng", en: "Beliefs" },
};

const VietnameseCulture = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<"all" | CultureTopic["category"]>("all");

  const filtered = filter === "all" ? cultureTopics : cultureTopics.filter(c => c.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Văn hóa & Phong tục Việt Nam: Áo dài, Tết, Cưới hỏi | HaiEduTech" description="Áo dài, Tết Nguyên Đán, đám cưới truyền thống, thờ cúng tổ tiên, làng nghề và văn hóa bàn ăn." path="/learn-vietnamese/culture" />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <Link to="/learn-vietnamese" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            {t("Quay lại", "Back")}
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Drum className="w-8 h-8 text-red-500" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("Văn hóa & Phong tục", "Culture & Customs")}
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              {t("Khám phá hồn cốt văn hóa Việt qua áo dài, Tết, lễ cưới, thờ cúng và thủ công truyền thống", "Discover Vietnamese soul through áo dài, Tết, weddings, ancestor worship, and traditional crafts")}
            </p>
          </motion.div>

          <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="mb-6">
            <TabsList className="flex flex-wrap h-auto">
              <TabsTrigger value="all">{t("Tất cả", "All")}</TabsTrigger>
              {(Object.keys(categoryLabels) as CultureTopic["category"][]).map(cat => (
                <TabsTrigger key={cat} value={cat}>
                  {t(categoryLabels[cat].vi, categoryLabels[cat].en)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map((topic, idx) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="h-full border-border/50 hover:shadow-xl transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-5xl">{topic.emoji}</span>
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2 text-xs">
                          {t(categoryLabels[topic.category].vi, categoryLabels[topic.category].en)}
                        </Badge>
                        <h3 className="text-lg font-bold text-foreground leading-tight">
                          {t(topic.title, topic.titleEn)}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm text-foreground mb-4 leading-relaxed">
                      {t(topic.summary, topic.summaryEn)}
                    </p>

                    <Accordion type="single" collapsible className="mb-4">
                      {topic.details.map((d, i) => (
                        <AccordionItem key={i} value={`item-${i}`} className="border-border/40">
                          <AccordionTrigger className="text-sm font-semibold py-2 hover:no-underline">
                            {t(d.heading, d.headingEn)}
                          </AccordionTrigger>
                          <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                            {t(d.body, d.bodyEn)}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>

                    <div className="bg-muted/40 rounded-lg p-3">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                        📖 {t("Từ vựng", "Vocabulary")}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {topic.vocabulary.map((v, i) => (
                          <div key={i} className="text-xs">
                            <span className="font-medium text-foreground">{v.vi}</span>
                            <span className="text-muted-foreground"> — {v.en}</span>
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

export default VietnameseCulture;
