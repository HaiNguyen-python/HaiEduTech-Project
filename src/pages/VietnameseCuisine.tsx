import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChefHat, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cuisineDishes } from "@/data/vietnamese/cuisineData";

const regionColors: Record<string, string> = {
  "Bắc": "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
  "Trung": "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
  "Nam": "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
};

const VietnameseCuisine = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<"all" | "Bắc" | "Trung" | "Nam">("all");

  const filtered = filter === "all" ? cuisineDishes : cuisineDishes.filter(d => d.region === filter);

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Ẩm thực Việt Nam: Phở, Bánh mì, Bún chả | HaiEduTech" description="Khám phá 12 món ăn biểu tượng của Việt Nam với từ vựng, công thức và câu chuyện văn hóa." path="/learn-vietnamese/cuisine" />
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <Link to="/learn-vietnamese" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            {t("Quay lại", "Back")}
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <ChefHat className="w-8 h-8 text-orange-500" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("Ẩm thực Việt Nam", "Vietnamese Cuisine")}
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              {t("12 món ăn biểu tượng — từ vựng, nguyên liệu và chuyện văn hóa", "12 iconic dishes — vocabulary, ingredients, cultural stories")}
            </p>
          </motion.div>

          <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="mb-6">
            <TabsList className="grid grid-cols-4 max-w-md">
              <TabsTrigger value="all">{t("Tất cả", "All")}</TabsTrigger>
              <TabsTrigger value="Bắc">🏔️ {t("Bắc", "North")}</TabsTrigger>
              <TabsTrigger value="Trung">🏖️ {t("Trung", "Central")}</TabsTrigger>
              <TabsTrigger value="Nam">🌴 {t("Nam", "South")}</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((dish, idx) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-5xl">{dish.emoji}</span>
                      <Badge className={regionColors[dish.region]}>
                        <MapPin className="w-3 h-3 mr-1" />
                        {t(dish.region, dish.regionEn)}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{dish.name}</h3>
                    <p className="text-sm text-muted-foreground italic">{dish.nameEn}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground mb-4 leading-relaxed">
                      {t(dish.description, dish.descriptionEn)}
                    </p>
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        {t("Nguyên liệu", "Ingredients")}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {(t(dish.ingredients.join("|"), dish.ingredientsEn.join("|")).split("|")).map((ing, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{ing}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-3 rounded-r-lg">
                      <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 mb-1">
                        💡 {t("Bạn có biết?", "Did you know?")}
                      </p>
                      <p className="text-xs text-foreground">{t(dish.funFact, dish.funFactEn)}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/learn-vietnamese">
              <Button variant="outline">{t("Khám phá thêm", "Explore more")}</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VietnameseCuisine;
