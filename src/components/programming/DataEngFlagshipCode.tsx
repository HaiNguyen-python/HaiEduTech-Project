import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Building2, BookOpen, Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import CodeBlock from "@/components/CodeBlock";
import {
  dataEngFlagshipProjects,
  type DataEngFlagshipProject,
} from "@/data/dataEngFlagshipCode";

/**
 * 10 flagship Data Engineering project code samples for read-along practice.
 * All cards are collapsed by default; the learner opens one at a time.
 */

const MAX_STAGGER_DELAY = 0.25;
const STAGGER_STEP = 0.03;

const SectionHeader = () => {
  const { t } = useLanguage();
  return (
    <header className="rounded-2xl border-2 border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-rose-500/10 p-5 sm:p-6 mb-5">
      <div className="flex items-start gap-3 flex-wrap">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center text-white shrink-0">
          <BookOpen className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground">
            10 Data Engineering Projects
          </h2>
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
            {t(
              "Tổng hợp mẫu code thực chiến của các công ty lớn (Airbnb, Netflix, Uber, Spotify, Databricks...). Mỗi block đều có bình luận chi tiết bằng tiếng Việt để bạn hiểu vì sao code được viết như vậy, chứ không chỉ copy-paste.",
              "Real-world code patterns from companies like Airbnb, Netflix, Uber, Spotify and Databricks. Every snippet is heavily commented so you understand the WHY, not just the HOW.",
            )}
          </p>
        </div>
      </div>
    </header>
  );
};

interface ProjectCardProps {
  project: DataEngFlagshipProject;
  index: number;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

const ProjectCard = ({ project, index, isOpen, onToggle }: ProjectCardProps) => {
  const { t } = useLanguage();
  const panelId = `de-flagship-panel-${project.id}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: Math.min(index * STAGGER_STEP, MAX_STAGGER_DELAY),
        duration: 0.3,
      }}
      className="glass-card rounded-xl border border-border/60 overflow-hidden"
    >
      <button
        type="button"
        onClick={() => onToggle(project.id)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/40 transition-colors"
      >
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xl shrink-0">
          {project.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              #{index + 1}
            </span>
            <h3 className="font-display font-bold text-foreground text-base leading-snug">
              {t(project.title, project.titleEn)}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
            <Building2 className="w-3.5 h-3.5" />
            <span>{project.company}</span>
            <span className="mx-1">•</span>
            <span>{project.stack.slice(0, 3).join(" · ")}</span>
          </div>
        </div>

        <ChevronDown
          aria-hidden
          className={`w-5 h-5 text-muted-foreground transition-transform shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-border/60 overflow-hidden"
          >
            <div className="p-4 sm:p-5 space-y-4">
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3.5">
                <div className="flex items-center gap-1.5 mb-2 text-amber-700 dark:text-amber-300 font-semibold text-sm">
                  <Lightbulb className="w-4 h-4" />
                  {t("Bạn sẽ học được", "What you will learn")}
                </div>
                <ul className="space-y-1.5 text-sm text-foreground/85">
                  {project.whatYouLearn.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span aria-hidden className="text-amber-600 shrink-0">▸</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <CodeBlock code={project.code} language={project.language} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

const DataEngFlagshipCode = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  return (
    <section className="mb-10">
      <SectionHeader />
      <div className="space-y-3">
        {dataEngFlagshipProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            isOpen={openId === project.id}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </section>
  );
};

export default DataEngFlagshipCode;
