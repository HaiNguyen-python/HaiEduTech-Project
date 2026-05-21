/**
 * @file EssayOutline.tsx
 * @description Auto-generates a clear outline (structure + key idea per paragraph)
 *   from a Band 8.0+ sample essay so students see the skeleton before reading.
 */
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ListTree } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { SampleEssay } from "@/data/ieltsSampleEssays";

interface Props {
  essay: SampleEssay;
}

const stripBold = (s: string) => s.replace(/\*\*(.*?)\*\*/g, "$1");
const firstSentence = (p: string) => {
  const m = stripBold(p).match(/[^.!?]+[.!?]+/);
  return (m ? m[0] : p).trim();
};
const summarise = (p: string, max = 140) => {
  const s = stripBold(p).replace(/\s+/g, " ").trim();
  return s.length > max ? s.slice(0, max - 1).trim() + "…" : s;
};

const EssayOutline = ({ essay }: Props) => {
  const { t } = useLanguage();

  const sections = useMemo(() => {
    const paras = essay.essayBody.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
    const total = paras.length;
    const isTask1 = essay.taskType === 1;

    return paras.map((para, i) => {
      let label = "";
      let role = "";
      if (isTask1) {
        if (i === 0) { label = t("Mở bài", "Introduction"); role = t("Paraphrase đề bài", "Paraphrase the prompt"); }
        else if (i === 1) { label = t("Tổng quan", "Overview"); role = t("Nêu 2 xu hướng nổi bật nhất", "State the 2 most salient trends"); }
        else if (i === total - 1) { label = t(`Chi tiết ${i - 1}`, `Detail ${i - 1}`); role = t("Mô tả số liệu cụ thể & so sánh", "Specific figures & comparisons"); }
        else { label = t(`Chi tiết ${i - 1}`, `Detail ${i - 1}`); role = t("Nhóm dữ liệu liên quan", "Group related data points"); }
      } else {
        if (i === 0) { label = t("Mở bài", "Introduction"); role = t("Hook → paraphrase → thesis", "Hook → paraphrase → thesis"); }
        else if (i === total - 1) { label = t("Kết bài", "Conclusion"); role = t("Khẳng định lại + khuyến nghị", "Restate stance + recommendation"); }
        else { label = t(`Thân bài ${i}`, `Body ${i}`); role = t("Topic sentence → giải thích → ví dụ", "Topic sentence → explanation → example"); }
      }

      return {
        label,
        role,
        topic: firstSentence(para),
        summary: summarise(para),
      };
    });
  }, [essay, t]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-5 md:p-6 border border-primary/20"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center">
          <ListTree className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-base md:text-lg font-bold text-foreground">
            🗂️ {t("Outline bài viết", "Essay Outline")}
          </h2>
          <p className="text-xs text-muted-foreground">
            {t("Nắm cấu trúc & ý chính trước khi đọc chi tiết.", "Get the structure & key ideas before reading the full essay.")}
          </p>
        </div>
      </div>

      <ol className="space-y-3">
        {sections.map((s, i) => (
          <li key={i} className="rounded-lg border bg-background/60 p-3 md:p-4">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                {i + 1}
              </span>
              <span className="text-sm font-semibold text-primary">{s.label}</span>
              <span className="text-xs text-muted-foreground">— {s.role}</span>
            </div>
            <p className="text-sm font-medium text-foreground leading-snug">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{t("Ý chính:", "Key idea:")}</span>{" "}
              {s.topic}
            </p>
            <p className="text-xs text-muted-foreground italic mt-1 leading-relaxed">{s.summary}</p>
          </li>
        ))}
      </ol>
    </motion.div>
  );
};

export default EssayOutline;
