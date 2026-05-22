/**
 * @file EssayOutline.tsx
 * @description Concise outline of the key focus points for each section of a
 *   Band 7.0+ sample essay. Task 2 essays use the I/II/III structure
 *   (Intro → SP1/SP2 → Conclusion) with bullets derived from THIS essay's
 *   own paragraphs so the outline stays prompt-specific.
 */
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ListTree } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { SampleEssay } from "@/data/ieltsSampleEssays";

interface Props {
  essay: SampleEssay;
}

// Extract the first complete sentence of a paragraph (markdown stripped, capped length)
const firstSentence = (para: string): string => {
  const clean = para.replace(/\*\*/g, "").trim();
  const m = clean.match(/[^.!?]+[.!?]/);
  let s = (m ? m[0] : clean).trim();
  if (s.length > 180) s = s.slice(0, 177).trimEnd() + "…";
  return s;
};

// Best-effort extraction of the writer's short thesis (typically the last sentence of intro)
const shortAnswer = (intro: string): string => {
  const clean = intro.replace(/\*\*/g, "").trim();
  const sentences = clean.match(/[^.!?]+[.!?]/g) || [clean];
  let s = (sentences[sentences.length - 1] || "").trim();
  if (s.length > 180) s = s.slice(0, 177).trimEnd() + "…";
  return s;
};

const EssayOutline = ({ essay }: Props) => {
  const { t } = useLanguage();

  const sections = useMemo(() => {
    const paras = essay.essayBody.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
    const total = paras.length;
    const isTask1 = essay.taskType === 1;

    // === TASK 1 — keep the existing generic outline ===
    if (isTask1) {
      return paras.map((_, i) => {
        let label = "";
        let bullets: string[] = [];
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
        return { label, bullets };
      });
    }

    // === TASK 2 — I. Intro → II. Body (SP1, SP2[, SP3]) → III. Conclusion ===
    // Each bullet pulls a real sentence from THIS essay so the outline is
    // specific to the prompt instead of being generic boilerplate.
    const result: { label: string; bullets: string[] }[] = [];
    const introPara = paras[0] || "";
    const conclusionPara = paras[total - 1] || "";
    const bodyParas = total >= 3 ? paras.slice(1, total - 1) : [];

    // I. Introduction
    result.push({
      label: t("I. Mở bài (Intro)", "I. Introduction (Intro)"),
      bullets: [
        t(
          `Paraphrase đề bài → ${firstSentence(introPara)}`,
          `Paraphrase the topic → ${firstSentence(introPara)}`,
        ),
        t(
          `Trả lời ngắn (thesis) → ${shortAnswer(introPara)}`,
          `Give your short answer (thesis) → ${shortAnswer(introPara)}`,
        ),
      ],
    });

    // II. Body — SP1 / SP2 / SP3
    bodyParas.forEach((bp, idx) => {
      const n = idx + 1;
      const letter = "ABCD"[idx] || "?";
      result.push({
        label: t(
          `II.${letter}. Đoạn thân bài ${n} (SP${n})`,
          `II.${letter}. Supporting Paragraph ${n} (SP${n})`,
        ),
        bullets: [
          t(
            `Trả lời Question ${n} = Points + Clarification + Example`,
            `Answer Question ${n} = Points + Clarification + Example`,
          ),
          t(`Ý chính của đoạn → ${firstSentence(bp)}`, `Main point of this paragraph → ${firstSentence(bp)}`),
        ],
      });
    });

    // III. Conclusion
    result.push({
      label: t("III. Kết bài (Conclusion)", "III. Conclusion"),
      bullets: [
        t(
          "Viết lại Intro theo cách khác (paraphrase + tóm tắt 2 luận điểm).",
          "Rewrite the introduction in another way (paraphrase + recap of the 2 main points).",
        ),
        t(
          `Gợi ý từ bài mẫu → ${firstSentence(conclusionPara)}`,
          `Reference from the sample → ${firstSentence(conclusionPara)}`,
        ),
      ],
    });

    return result;
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
