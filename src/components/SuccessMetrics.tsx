import { motion } from "framer-motion";
import { icons } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { successMetrics } from "@/data/homePageData";
import { Sparkles } from "lucide-react";

/** Resolve a Lucide icon by name */
const getIcon = (name: string) => (icons as Record<string, any>)[name] ?? Sparkles;

const SuccessMetrics = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="mb-3 font-display text-2xl font-bold sm:text-3xl">
            {t("Hiệu Quả ", "Proven ")}
            <span className="text-gradient">{t("Đã Chứng Minh", "Results")}</span>
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {successMetrics.map((metric, i) => {
            const Icon = getIcon(metric.icon);
            return (
              <motion.div
                key={metric.icon}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-5 text-center transition-all hover:shadow-lg"
              >
                <Icon className="mx-auto mb-3 h-7 w-7 text-primary" />
                <div className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  {t(metric.value, metric.valueEn)}
                </div>
                <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
                  {t(metric.label, metric.labelEn)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SuccessMetrics;
