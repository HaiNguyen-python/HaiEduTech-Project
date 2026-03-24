import { motion } from "framer-motion";
import { icons } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { learningRoadmaps, type RoadmapStep } from "@/data/homePageData";
import { Cpu } from "lucide-react";

/** Resolve a Lucide icon by name, with fallback */
const getIcon = (name: string) => (icons as Record<string, any>)[name] ?? Cpu;

/** Single step node in the visual roadmap */
const StepNode = ({ step, index, total }: { step: RoadmapStep; index: number; total: number }) => {
  const { t } = useLanguage();
  const Icon = getIcon(step.icon);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="relative flex gap-4"
    >
      {/* Vertical connector line */}
      <div className="flex flex-col items-center">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} text-white shadow-lg`}>
          <Icon className="h-5 w-5" />
        </div>
        {index < total - 1 && (
          <div className="my-1 w-0.5 flex-1 bg-gradient-to-b from-primary/30 to-transparent" />
        )}
      </div>

      {/* Content */}
      <div className="pb-8">
        <span className="mb-1 inline-block text-xs font-bold uppercase tracking-wider text-primary">
          Step {step.step}
        </span>
        <h4 className="font-display text-base font-semibold text-foreground sm:text-lg">
          {t(step.title, step.titleEn)}
        </h4>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {t(step.description, step.descriptionEn)}
        </p>
      </div>
    </motion.div>
  );
};

const LearningRoadmaps = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 sm:py-24">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-transparent to-transparent" />

      <div className="container relative mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
            {t("Lộ Trình ", "Learning ")}
            <span className="text-gradient">{t("Học Tập", "Roadmaps")}</span>
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            {t(
              "Lộ trình được tối ưu hóa dựa trên dữ liệu và hiệu suất học viên",
              "Roadmaps optimized by data-driven analysis and student performance"
            )}
          </p>
        </motion.div>

        {/* Tabbed roadmaps */}
        <Tabs defaultValue="english" className="mx-auto max-w-2xl">
          <TabsList className="mx-auto mb-10 flex w-full max-w-md">
            {learningRoadmaps.map((rm) => (
              <TabsTrigger key={rm.id} value={rm.id} className="flex-1 text-xs sm:text-sm">
                {t(rm.title.replace("Lộ trình ", ""), rm.titleEn.replace(" Roadmap", "").replace("Programming ", "Prog. "))}
              </TabsTrigger>
            ))}
          </TabsList>

          {learningRoadmaps.map((rm) => (
            <TabsContent key={rm.id} value={rm.id}>
              <div className="mx-auto max-w-lg">
                {rm.steps.map((step, i) => (
                  <StepNode key={step.step} step={step} index={i} total={rm.steps.length} />
                ))}
              </div>

              {/* RL engine label */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-center"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
                  <Cpu className="h-3 w-3" />
                  {t(
                    "Được tối ưu bởi HaiEduTech's RL Engine",
                    "Optimized by HaiEduTech's RL Engine"
                  )}
                </span>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default LearningRoadmaps;
