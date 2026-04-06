import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Globe, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { scholarships } from "@/data/globalScholarshipData";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const LEVEL_COLORS: Record<string, string> = {
  Bachelor: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  Master: "bg-sky-500/15 text-sky-700 dark:text-sky-400",
  PhD: "bg-violet-500/15 text-violet-700 dark:text-violet-400",
};

const KnowledgeHub = () => {
  const { t } = useLanguage();
  const featured = scholarships.filter((s) => s.isFeatured).slice(0, 6);

  return (
    <section className="relative py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <GraduationCap className="h-7 w-7 text-primary" />
          </div>
          <h2 className="mb-4 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
            {t("Học Bổng ", "Global ")}
            <span className="text-gradient">{t("Toàn Cầu", "Scholarship")}</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            {t(
              "Tổng hợp học bổng Cử nhân, Thạc sỹ, Tiến sỹ tại các quốc gia hàng đầu thế giới",
              "Curated Bachelor's, Master's & PhD scholarships from top countries worldwide"
            )}
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group cursor-pointer rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-lg"
              onClick={() => window.open(s.applyUrl, "_blank", "noopener,noreferrer")}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{s.flag}</span>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {t(s.countryVi, s.country)}
                  </span>
                </div>
              </div>

              <h3 className="mb-2 font-display text-base font-semibold leading-snug text-foreground sm:text-lg line-clamp-2">
                {t(s.nameVi, s.name)}
              </h3>

              <p className="mb-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {t(s.summaryVi, s.summaryEn)}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {s.levels.map((level) => (
                  <Badge key={level} variant="secondary" className={`text-xs ${LEVEL_COLORS[level]}`}>
                    {level}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {s.deadline}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2">
                  {t("Chi tiết", "Details")} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Link
            to="/global-scholarship"
            className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/10"
          >
            <Globe className="h-4 w-4" />
            {t("Xem tất cả học bổng", "View All Scholarships")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default KnowledgeHub;
