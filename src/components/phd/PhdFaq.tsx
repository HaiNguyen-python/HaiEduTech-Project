/**
 * @file PhdFaq.tsx
 * @description PhD FAQ accordion (Vi/En).
 */
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PHD_FAQ } from "@/data/phdFaq";

const PhdFaq = () => {
  const { t } = useLanguage();
  return (
    <Card className="mt-12 border-violet-200/60 dark:border-violet-800/40">
      <CardContent className="p-5 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-violet-500" />
          {t("Câu hỏi thường gặp về PhD", "PhD Frequently Asked Questions")}
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {PHD_FAQ.map((q) => (
            <AccordionItem key={q.id} value={q.id}>
              <AccordionTrigger className="text-left text-sm md:text-base font-semibold">
                {t(q.questionVi, q.questionEn)}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                {t(q.answerVi, q.answerEn)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default PhdFaq;
