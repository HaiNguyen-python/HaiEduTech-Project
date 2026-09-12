/**
 * @file EssayBandAnalysis.tsx
 * @description Renders a band-aware analysis panel for an IELTS sample essay,
 *   broken down by Task Achievement / Response, Coherence & Cohesion,
 *   Lexical Resource, and Grammatical Range & Accuracy.
 *
 *   The component derives essay-specific evidence by scanning the essay body
 *   for advanced grammatical patterns (inversion, cleft, perfect aspect,
 *   passives, hedging) and combining that with task-type specific guidance.
 */
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Award, Target, Link2, BookMarked, Wand2, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { SampleEssay } from "@/data/ieltsSampleEssays";

interface Props {
  essay: SampleEssay;
}

interface FeatureMatch {
  label: string;
  evidence: string;
}

interface AnalysisSection {
  title: string;
  icon: typeof Target;
  finding: string;
  evidence: string[];
  takeaway: string;
}

const cleanText = (text: string) => text.replace(/\*\*/g, "").trim();

const getSentences = (body: string) =>
  cleanText(body).replace(/\n+/g, " ").match(/[^.!?]+[.!?]+/g)?.map((sentence) => sentence.trim()) ?? [];

const shortenEvidence = (text: string, max = 180) =>
  text.length <= max ? text : `${text.slice(0, max).trim()}...`;

/** Find verifiable grammatical patterns and quote the full sentence containing each match. */
function detectGrammarFeatures(body: string): FeatureMatch[] {
  const out: FeatureMatch[] = [];
  const tests: { re: RegExp; label: string }[] = [
    { re: /\bnot only\b[^.]*\bbut\b/i, label: "Correlative construction: not only ... but also" },
    { re: /\b(had|were|should)\s+\w+\s+to\s+\w+/i, label: "Inverted conditional" },
    { re: /\bit\s+(is|has been)\s+(widely|generally|often|sometimes)\s+(believed|argued|claimed|recognised|recognized)\b/i, label: "Impersonal passive (academic register)" },
    { re: /\bwhat\s+[^,.]{2,45}\s+(is|was)\b/i, label: "What-clause for emphasis" },
    { re: /\b(despite|notwithstanding)\s+(the\s+)?\w+/i, label: "Concession with a noun phrase" },
    { re: /\b(having|being)\s+\w+ed\b/i, label: "Perfect / passive participle clause" },
    { re: /\bthe more\b.*\bthe more\b/i, label: "Double comparative (The more ... the more)" },
    { re: /\bwhich\s+(had\s+been|have\s+been|is\s+being)\b/i, label: "Relative clause with perfect or passive aspect" },
    { re: /\bwhile\b[^.]{3,100},|,\s*while\b/i, label: "Complex comparison with while" },
    { re: /\balthough\b[^.]{5,120},/i, label: "Concessive clause with although" },
    { re: /\b(by contrast|in contrast)\b/i, label: "Contrast embedded in a complex sentence" },
  ];
  const sentences = getSentences(body);
  for (const t of tests) {
    const m = body.match(t.re);
    if (m) {
      const sentence = sentences.find((candidate) => candidate.toLowerCase().includes(m[0].toLowerCase()));
      out.push({ label: t.label, evidence: shortenEvidence(sentence ?? m[0]) });
    }
  }
  return out.slice(0, 4);
}

const EssayBandAnalysis: React.FC<Props> = ({ essay }) => {
  const { t } = useLanguage();

  const features = useMemo(() => detectGrammarFeatures(essay.essayBody), [essay.essayBody]);
  const paragraphTexts = useMemo(() => essay.essayBody.split("\n\n").map(cleanText), [essay.essayBody]);
  const sentences = useMemo(() => getSentences(essay.essayBody), [essay.essayBody]);
  const paragraphs = paragraphTexts.length;
  const wordCount = essay.essayBody.trim().split(/\s+/).length;
  const isTask1 = essay.taskType === 1;
  const band = essay.band ?? "8.0+";
  const overviewEvidence = isTask1
    ? paragraphTexts.find((paragraph) => /^overall\b/i.test(paragraph)) ?? paragraphTexts[1] ?? paragraphTexts[0]
    : sentences.find((sentence) => /\b(i (believe|agree|disagree)|this essay|should|must|both|while)\b/i.test(sentence)) ?? sentences[0];
  const connectorCandidates = ["Overall", "however", "while", "although", "by contrast", "meanwhile", "therefore", "consequently", "furthermore", "moreover", "nevertheless", "notwithstanding"];
  const connectors = connectorCandidates.filter((connector) => new RegExp(`\\b${connector}\\b`, "i").test(cleanText(essay.essayBody)));
  const lexicalEvidence = essay.glossary.slice(0, 3).map((entry) => entry.term);

  const taskLabel = isTask1
    ? t("Hoàn thành Yêu cầu Bài (Task Achievement)", "Task Achievement")
    : t("Trả lời Đề bài (Task Response)", "Task Response");
  const sections: AnalysisSection[] = [
    {
      title: taskLabel,
      icon: Target,
      finding: isTask1
        ? t(`Bài có ${wordCount} từ và trình bày overview riêng trước các chi tiết.`, `${wordCount} words with a separate overview before the detailed comparisons.`)
        : t(`Bài có ${wordCount} từ và nêu lập trường hoặc hướng trả lời ngay từ phần mở bài.`, `${wordCount} words with the position or response direction established in the introduction.`),
      evidence: overviewEvidence ? [shortenEvidence(overviewEvidence)] : [],
      takeaway: isTask1
        ? t("Hãy viết overview về 2-3 đặc điểm lớn, không liệt kê mọi con số.", "Write an overview of 2-3 major features rather than listing every figure.")
        : t("Nêu quan điểm trực tiếp, rồi dùng mỗi đoạn thân bài để phát triển một lý do chính.", "State your position directly, then develop one main reason in each body paragraph."),
    },
    {
      title: t("Mạch lạc & Liên kết (Coherence & Cohesion)", "Coherence & Cohesion"),
      icon: Link2,
      finding: t(`Bài được chia thành ${paragraphs} đoạn có chức năng riêng.`, `The response is organised into ${paragraphs} paragraphs with distinct functions.`),
      evidence: connectors.length > 0
        ? [t(`Từ nối thực sự xuất hiện: ${connectors.join(", ")}.`, `Connectors actually used: ${connectors.join(", ")}.`)]
        : [t("Liên kết được tạo chủ yếu bằng tham chiếu và trình tự ý, không lạm dụng từ nối.", "Cohesion comes mainly from referencing and idea progression rather than repeated linkers.")],
      takeaway: t("Dùng từ nối theo quan hệ ý nghĩa; không chèn từ nối chỉ để câu trông học thuật.", "Choose linkers for the logical relationship; do not add them merely to sound academic."),
    },
    {
      title: t("Vốn Từ vựng (Lexical Resource)", "Lexical Resource"),
      icon: BookMarked,
      finding: t(`Bài dùng ${essay.glossary.length} cụm từ theo chủ đề được giải thích trong bảng chú giải.`, `${essay.glossary.length} topic-specific expressions are explained in the glossary.`),
      evidence: lexicalEvidence,
      takeaway: t("Học cả cụm từ cùng ngữ cảnh, sau đó viết lại một câu mới thay vì học từ đơn lẻ.", "Learn each phrase in context, then reuse it in a new sentence instead of memorising isolated words."),
    },
    {
      title: t("Ngữ pháp: Phạm vi & Chính xác (Grammatical Range & Accuracy)", "Grammatical Range & Accuracy"),
      icon: Wand2,
      finding: features.length > 0
        ? t(`Có ${features.length} kiểu cấu trúc phức có thể kiểm chứng trực tiếp trong bài.`, `${features.length} complex structure types can be verified directly in the essay.`)
        : t("Bài ưu tiên các câu rõ nghĩa; không gắn nhãn cấu trúc nâng cao khi chưa có bằng chứng chắc chắn.", "The essay prioritises clear sentences; no advanced structure is labelled without reliable evidence."),
      evidence: features.length > 0 ? features.map((feature) => `${feature.label}: “${feature.evidence}”`) : [shortenEvidence(sentences[0] ?? "")].filter(Boolean),
      takeaway: t("Sao chép mẫu cấu trúc, nhưng thay chủ ngữ và nội dung để luyện độ chính xác.", "Copy the sentence pattern, but change the subject and content to practise accuracy."),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-1"
    >
      <div className="flex items-start gap-3 mb-5">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center shrink-0">
          <Award className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-bold text-foreground">
            {t(`Bằng chứng cho bài mẫu Band ${band}`, `Evidence behind this Band ${band} model`)}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {t(
               "Mỗi nhận xét dưới đây đi kèm bằng chứng từ chính bài mẫu và một cách áp dụng rõ ràng.",
               "Each point below includes evidence from this essay and one clear way to apply it."
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
               className="border-t border-border/60 py-4 md:px-2"
            >
              <div className="flex items-center gap-2 mb-3">
                 <Icon className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground text-sm md:text-base">{sec.title}</h3>
              </div>
               <p className="text-sm leading-relaxed text-foreground/90">{sec.finding}</p>
               <div className="mt-3 flex items-start gap-2 rounded-md bg-muted/50 p-3">
                 <Quote className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                 <div className="min-w-0 space-y-1.5">
                   <p className="text-xs font-semibold uppercase text-muted-foreground">{t("Bằng chứng trong bài", "Evidence from the essay")}</p>
                   {sec.evidence.map((evidence, index) => (
                     <p key={index} className="break-words text-sm leading-relaxed text-foreground">{evidence}</p>
                   ))}
                 </div>
               </div>
               <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                 <span className="font-semibold text-foreground">{t("Học theo:", "Apply it:")}</span> {sec.takeaway}
               </p>
            </motion.div>
          );
        })}
      </div>

    </motion.div>
  );
};

export default EssayBandAnalysis;
