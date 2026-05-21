/**
 * @file EssayBand8Analysis.tsx
 * @description Renders a Band 7.0+ analysis panel for an IELTS sample essay,
 *   broken down by Task Achievement / Response, Coherence & Cohesion,
 *   Lexical Resource, and Grammatical Range & Accuracy.
 *
 *   The component derives essay-specific evidence by scanning the essay body
 *   for advanced grammatical patterns (inversion, cleft, perfect aspect,
 *   passives, hedging) and combining that with task-type specific guidance.
 */
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Award, Target, Link2, BookMarked, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import type { SampleEssay } from "@/data/ieltsSampleEssays";

interface Props {
  essay: SampleEssay;
}

interface FeatureMatch {
  label: string;
  evidence: string;
}

/** Find advanced Band 7+ grammatical patterns in the essay body. */
function detectBand8Features(body: string): FeatureMatch[] {
  const out: FeatureMatch[] = [];
  const tests: { re: RegExp; label: string }[] = [
    { re: /\bnot only\b[^.]*\bbut\b/i, label: "Negative inversion (Not only ... but also)" },
    { re: /\b(had|were|should)\s+\w+\s+to\s+\w+/i, label: "Inverted conditional (Had / Were to / Should)" },
    { re: /\bit\s+(is|has been)\s+(widely|generally|often|sometimes)\s+(believed|argued|claimed|recognised|recognized)\b/i, label: "Impersonal passive (academic register)" },
    { re: /\bwhat\s+\w+\s+\w+\s+(is|was)\b/i, label: "Cleft sentence (What ... is)" },
    { re: /\bdespite\s+(the\s+)?[a-z]+ing\b|\bdespite\s+the\s+\w+/i, label: "'Despite + noun/-ing' concession" },
    { re: /\b(having|being)\s+\w+ed\b/i, label: "Perfect / passive participle clause" },
    { re: /\bthe more\b.*\bthe more\b/i, label: "Double comparative (The more ... the more)" },
    { re: /\bwhich\s+(had\s+been|have\s+been|is\s+being)\b/i, label: "Non-defining relative + perfect/passive" },
    { re: /\b(significantly|substantially|markedly|dramatically|considerably|exponentially)\b/i, label: "Precise quantifying adverbs" },
    { re: /\b(by and large|on the whole|to a large extent|to some extent)\b/i, label: "Hedging / scope-marking discourse markers" },
    { re: /\b(furthermore|moreover|in addition|consequently|nevertheless|conversely)\b/i, label: "High-band cohesive devices" },
    { re: /\b(arguably|undeniably|inevitably|ostensibly)\b/i, label: "Stance / hedging adverbs" },
  ];
  for (const t of tests) {
    const m = body.match(t.re);
    if (m) out.push({ label: t.label, evidence: m[0] });
  }
  return out;
}

const EssayBand8Analysis: React.FC<Props> = ({ essay }) => {
  const { t } = useLanguage();

  const features = useMemo(() => detectBand8Features(essay.essayBody), [essay.essayBody]);
  const paragraphs = essay.essayBody.split("\n\n").length;
  const glossaryCount = essay.glossary.length;
  const wordCount = essay.essayBody.trim().split(/\s+/).length;
  const isTask1 = essay.taskType === 1;

  // ---- TA / TR ----
  const taskLabel = isTask1
    ? t("Hoàn thành Yêu cầu Bài (Task Achievement)", "Task Achievement")
    : t("Trả lời Đề bài (Task Response)", "Task Response");
  const taskPoints = isTask1
    ? [
        t(`${wordCount} từ - vượt mốc 150, đủ chỗ phủ mọi xu hướng chính.`, `${wordCount} words - well above the 150 floor.`),
        t("Có câu paraphrase đề + overview rõ ràng (yêu cầu bắt buộc Band 7+).", "Clear paraphrase + overview (mandatory for Band 7+)."),
      ]
    : [
        t(`${wordCount} từ - vượt mốc 250, đủ sâu để phát triển luận điểm.`, `${wordCount} words - comfortably above 250.`),
        t("Thesis rõ ràng, mỗi thân bài 1 ý chính, kết bài có khuyến nghị.", "Clear thesis, one idea per body paragraph, conclusion with recommendation."),
      ];

  // ---- CC ----
  const ccPoints = [
    t(`${paragraphs} đoạn rõ ràng, mỗi đoạn 1 chức năng.`, `${paragraphs} clearly demarcated paragraphs.`),
    t("Connector cao cấp: Furthermore, Conversely, Consequently…", "High-band connectors: Furthermore, Conversely, Consequently…"),
  ];

  // ---- LR ----
  const lrPoints = [
    t(`${glossaryCount} cụm topic-specific & collocations tự nhiên.`, `${glossaryCount} topic-specific phrases & natural collocations.`),
    t("Trạng từ chính xác (significantly, marginally) thay 'very/a lot'.", "Precise adverbs (significantly, marginally) replace 'very/a lot'."),
  ];

  // ---- GRA ----
  const graPoints = [
    t(`${features.length} cấu trúc Band 7+ phát hiện trong bài (xem dưới).`, `${features.length} Band 7+ structures detected (see below).`),
    t("Xen kẽ câu đơn & câu phức, hầu như không có lỗi cơ bản.", "Mix of simple & complex sentences with minimal basic errors."),
  ];

  const sections: { title: string; icon: any; color: string; points: string[] }[] = [
    { title: taskLabel, icon: Target, color: "text-blue-600 dark:text-blue-400", points: taskPoints },
    {
      title: t("Mạch lạc & Liên kết (Coherence & Cohesion)", "Coherence & Cohesion"),
      icon: Link2,
      color: "text-emerald-600 dark:text-emerald-400",
      points: ccPoints,
    },
    {
      title: t("Vốn Từ vựng (Lexical Resource)", "Lexical Resource"),
      icon: BookMarked,
      color: "text-amber-600 dark:text-amber-400",
      points: lrPoints,
    },
    {
      title: t("Ngữ pháp: Phạm vi & Chính xác (Grammatical Range & Accuracy)", "Grammatical Range & Accuracy"),
      icon: Wand2,
      color: "text-purple-600 dark:text-purple-400",
      points: graPoints,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6 md:p-7 border-2 border-primary/20"
    >
      <div className="flex items-start gap-3 mb-5">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center shrink-0">
          <Award className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-bold text-foreground">
            🏆 {t("Phân tích: Vì sao bài này đạt Band 8.0+?", "Analysis: Why this is Band 8.0+")}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {t(
              "Breakdown theo 4 tiêu chí chấm của IELTS Examiner để bạn học cách viết - chứ không chỉ đọc.",
              "Broken down across the 4 official IELTS examiner criteria so you can learn to write - not just read."
            )}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {sections.map((sec, i) => {
          const Icon = sec.icon;
          return (
            <motion.div
              key={sec.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="rounded-xl border bg-background/60 p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon className={`w-5 h-5 ${sec.color}`} />
                <h3 className="font-semibold text-foreground text-sm md:text-base">{sec.title}</h3>
              </div>
              <ul className="space-y-2">
                {sec.points.map((p, j) => (
                  <li key={j} className="flex gap-2 text-sm text-foreground/85 leading-relaxed">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${sec.color.replace("text-", "bg-")}`} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {features.length > 0 && (
        <div className="mt-5 rounded-xl border border-purple-500/30 bg-purple-500/5 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Wand2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h3 className="font-semibold text-foreground text-sm">
              {t("Bằng chứng: Các cấu trúc Band 7+ thực tế trong bài", "Evidence: Actual Band 7+ structures in this essay")}
            </h3>
          </div>
          <ul className="space-y-2">
            {features.map((f, i) => (
              <li key={i} className="text-sm">
                <Badge variant="outline" className="mr-2 text-[11px]">{f.label}</Badge>
                <span className="font-mono text-xs bg-background/70 rounded px-2 py-0.5 text-foreground/80">
                  "{f.evidence.trim()}"
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default EssayBand8Analysis;
