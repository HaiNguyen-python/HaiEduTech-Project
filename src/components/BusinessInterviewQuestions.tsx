import { useMemo, useState } from "react";
import { CheckCircle2, Lightbulb, MessageSquareQuote, XCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { businessInterviewCategories, businessInterviewQuestions, highlightPhrases, type BusinessInterviewLevel } from "@/data/businessInterviewQuestions";

const levels: Array<BusinessInterviewLevel | "all"> = ["all", "Junior", "Mid", "Senior"];

const Highlighted = ({ text, phrases }: { text: string; phrases: string[] }) => (
  <>{highlightPhrases(text, phrases).map((part, index) => part.important
    ? <strong key={index} className="font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-4">{part.text}</strong>
    : <span key={index}>{part.text}</span>)}</>
);

const BusinessInterviewQuestions = () => {
  const { t } = useLanguage();
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState<BusinessInterviewLevel | "all">("all");

  const items = useMemo(() => businessInterviewQuestions.filter((q) =>
    (category === "all" || q.category === category) && (level === "all" || q.level === level)), [category, level]);

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-secondary">{t("Luyện phỏng vấn", "Interview practice")}</p>
        <h2 className="mt-1 text-2xl font-bold text-foreground">{t("Câu hỏi phỏng vấn tiếng Anh thương mại", "Business English Interview Questions")}</h2>
        <p className="mt-2 max-w-3xl text-base text-muted-foreground">
          {t("Các tình huống và số liệu trong câu trả lời mẫu là giả định; hãy thay bằng kinh nghiệm và thông tin có thật của bạn.",
            "Model answers use fictional situations and figures; replace them with your own truthful experience and verified information.")}
        </p>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label={t("Lọc chủ đề", "Filter by topic")}>
        {["all", ...businessInterviewCategories].map((c) => (
          <Button key={c} size="sm" variant={category === c ? "default" : "outline"} aria-pressed={category === c} onClick={() => setCategory(c)}>
            {c === "all" ? t("Tất cả", "All topics") : c}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t("Lọc cấp độ", "Filter by level")}>
        {levels.map((l) => (
          <Button key={l} size="sm" variant={level === l ? "secondary" : "ghost"} aria-pressed={level === l} onClick={() => setLevel(l)}>
            {l === "all" ? t("Mọi cấp độ", "All levels") : l}
          </Button>
        ))}
        <span className="ml-auto text-sm text-muted-foreground">{items.length} {t("câu hỏi", "questions")}</span>
      </div>

      <Accordion type="multiple" className="space-y-3">
        {items.map((q) => (
          <AccordionItem key={q.id} value={q.id} className="rounded-lg border bg-card px-4 shadow-sm">
            <AccordionTrigger className="gap-3 text-left hover:no-underline">
              <span className="flex flex-1 items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {businessInterviewQuestions.indexOf(q) + 1}
                </span>
                <span className="space-y-1">
                  <span className="block text-base font-semibold text-foreground">{q.question}</span>
                  <span className="flex flex-wrap gap-2 pt-1">
                    <Badge variant="outline">{q.level}</Badge>
                    <Badge variant="secondary">{q.category}</Badge>
                  </span>
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-5 text-base leading-7">
              <div className="rounded-md border-l-4 border-secondary bg-muted/50 p-3">
                <p className="flex items-center gap-2 text-sm font-bold text-foreground"><Lightbulb className="h-4 w-4 text-secondary" /> {t("Nhà tuyển dụng muốn biết", "What the interviewer wants")}</p>
                <p className="mt-1 text-foreground/90">{q.purpose}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{t("Cấu trúc trả lời", "Answer structure")}</p>
                <ol className="mt-2 space-y-1">
                  {q.structure.map((step, i) => (
                    <li key={step} className="flex gap-2"><span className="font-bold text-primary">{i + 1}.</span><span>{step}</span></li>
                  ))}
                </ol>
              </div>
              <div className="rounded-md border bg-background p-4">
                <p className="flex items-center gap-2 text-sm font-bold text-foreground"><MessageSquareQuote className="h-4 w-4 text-primary" /> {t("Câu trả lời mẫu", "Sample answer")}</p>
                <p className="mt-2 whitespace-pre-line text-foreground/90"><Highlighted text={q.sampleAnswer} phrases={q.highlights} /></p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-bold text-foreground">{t("Cụm từ hữu ích", "Useful phrases")}</p>
                  <ul className="mt-2 space-y-1">
                    {q.usefulPhrases.map((p) => <li key={p} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-secondary" /><span>{p}</span></li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{t("Cần tránh", "Avoid")}</p>
                  <ul className="mt-2 space-y-1">
                    {q.avoid.map((p) => <li key={p} className="flex gap-2"><XCircle className="mt-1 h-4 w-4 shrink-0 text-destructive" /><span>{p}</span></li>)}
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default BusinessInterviewQuestions;
