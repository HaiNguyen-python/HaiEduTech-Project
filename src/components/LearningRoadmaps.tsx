import { motion } from "framer-motion";
import { icons } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { learningRoadmaps, type RoadmapStep } from "@/data/homePageData";
import { Cpu } from "lucide-react";
import FloatingChibi from "@/components/FloatingChibi";
import chibiGraduate from "@/assets/chibi-graduate.png";
import chibiPanda from "@/assets/chibi-panda.png";

/** Resolve a Lucide icon by name, with fallback */
const getIcon = (name: string) => (icons as Record<string, any>)[name] ?? Cpu;

/** Single step node — vertical on mobile, horizontal card on md+ */
const StepNode = ({ step, index, total }: { step: RoadmapStep; index: number; total: number }) => {
  const { t } = useLanguage();
  const Icon = getIcon(step.icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative flex gap-4 md:flex-col md:items-center md:gap-3 md:text-center"
    >
      {/* Icon + connector */}
      <div className="flex flex-col items-center md:contents">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} text-white shadow-lg md:h-14 md:w-14`}>
          <Icon className="h-5 w-5 md:h-6 md:w-6" />
        </div>
        {/* Vertical connector — mobile only */}
        {index < total - 1 && (
          <div className="my-1 w-0.5 flex-1 bg-gradient-to-b from-primary/30 to-transparent md:hidden" />
        )}
      </div>

      {/* Content */}
      <div className="pb-6 md:pb-0">
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
    <section className="relative overflow-x-clip py-16 sm:py-20">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-transparent to-transparent" />
      <FloatingChibi src={chibiGraduate} alt="" className="absolute left-[4%] top-12 z-20 opacity-90" size={100} />
      <FloatingChibi src={chibiPanda} alt="" className="absolute right-[4%] bottom-16 z-20 opacity-90" size={104} delay={1.3} />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
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
        <Tabs defaultValue="english" className="mx-auto w-full max-w-6xl">
          <TabsList className="mx-auto mb-6 flex w-full max-w-md">
            {learningRoadmaps.map((rm) => (
              <TabsTrigger key={rm.id} value={rm.id} className="flex-1 text-xs sm:text-sm">
                {t(rm.title.replace("Lộ trình ", ""), rm.titleEn.replace(" Roadmap", "").replace("Programming ", "Prog. "))}
              </TabsTrigger>
            ))}
          </TabsList>

          {learningRoadmaps.map((rm) => (
            <TabsContent key={rm.id} value={rm.id}>
              {/* Mobile: vertical column / md+: horizontal grid with connector */}
              <div className="relative mx-auto max-w-lg md:max-w-none">
                {/* Horizontal connector line (md+) */}
                <div
                  aria-hidden
                  className="absolute left-0 right-0 top-7 hidden h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block"
                  style={{
                    marginLeft: `${100 / rm.steps.length / 2}%`,
                    marginRight: `${100 / rm.steps.length / 2}%`,
                  }}
                />
                <div
                  className="relative grid gap-6 md:gap-4"
                  style={{ gridTemplateColumns: `repeat(${rm.steps.length}, minmax(0, 1fr))` }}
                >
                  {rm.steps.map((step, i) => (
                    <StepNode key={step.step} step={step} index={i} total={rm.steps.length} />
                  ))}
                </div>
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
