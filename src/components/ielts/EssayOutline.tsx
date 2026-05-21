/**
 * @file EssayOutline.tsx
 * @description Concise outline of the key focus points for each section of a
 *   Band 7.0+ sample essay. Shown as short bullet lists so students grasp the
 *   structure at a glance.
 */
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ListTree } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { SampleEssay } from "@/data/ieltsSampleEssays";

interface Props {
  essay: SampleEssay;
}

const EssayOutline = ({ essay }: Props) => {
  const { t } = useLanguage();

  const sections = useMemo(() => {
    const paras = essay.essayBody.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
    const total = paras.length;
    const isTask1 = essay.taskType === 1;

    return paras.map((_, i) => {
      let label = "";
      let bullets: string[] = [];

      if (isTask1) {
        if (i === 0) {
          label = t("Mở bài", "Introduction");
          bullets = [
            t("Paraphrase đề bài (đổi từ, đổi cấu trúc).", "Paraphrase the prompt (synonyms + new structure)."),
            t("Nêu loại biểu đồ + khoảng thời gian.", "State the chart type + time period."),
          ];
        } else if (i === 1) {
          label = t("Tổng quan (Overview)", "Overview");
          bullets = [
            t("Bắt đầu bằng 'Overall' hoặc 'In general'.", "Open with 'Overall' or 'In general'."),
            t("Nêu 2 xu hướng nổi bật nhất (không có số liệu).", "State the 2 most salient trends (no figures)."),
          ];
        } else {
          label = t(`Chi tiết ${i - 1}`, `Detail ${i - 1}`);
          bullets = [
            t("Topic sentence nêu nhóm dữ liệu của đoạn.", "Topic sentence naming this paragraph's data group."),
            t("Số liệu cụ thể + động từ xu hướng (rose, plunged...).", "Specific figures + trend verbs (rose, plunged...)."),
            t("So sánh hoặc đối chiếu giữa các nhóm.", "Comparisons or contrasts between groups."),
          ];
        }
      } else {
        if (i === 0) {
          label = t("Mở bài", "Introduction");
          bullets = [
            t("Paraphrase đề + nêu rõ thesis (quan điểm).", "Paraphrase the prompt + clear thesis."),
          ];
        } else if (i === total - 1) {
          label = t("Kết bài", "Conclusion");
          bullets = [
            t("Khẳng định lại quan điểm + tóm tắt nhanh 2 luận điểm.", "Restate stance + quick recap of 2 main points."),
          ];
        } else {
          label = t(`Thân bài ${i}`, `Body ${i}`);
          bullets = [
            t("1 luận điểm chính + lý do + ví dụ ngắn.", "One main point + reason + brief example."),
          ];
        }
      }

      return { label, bullets };
    });
  }, [essay, t]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-4 md:p-5 border border-primary/20"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center">
          <ListTree className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-base md:text-lg font-bold text-foreground leading-tight">
            🗂️ {t("Outline bài viết", "Essay Outline")}
          </h2>
          <p className="text-xs text-muted-foreground">
            {t("Ý chính cần có trong mỗi phần.", "Key points for each section.")}
          </p>
        </div>
      </div>

      <ol className="space-y-2">
        {sections.map((s, i) => (
          <li key={i} className="rounded-lg border bg-background/60 px-3 py-2">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-[11px] font-bold">
                {i + 1}
              </span>
              <span className="text-sm font-semibold text-primary">{s.label}</span>
            </div>
            <ul className="space-y-1 pl-1">
              {s.bullets.map((b, j) => (
                <li key={j} className="flex gap-2 text-sm text-foreground/90 leading-snug">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </motion.div>
  );
};

export default EssayOutline;
