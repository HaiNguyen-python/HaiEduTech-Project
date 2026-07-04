/**
 * CohesionLab - Sub-tab shell for the 4 Coherence & Cohesion practice modes:
 *  1. Linker Bank - practise linking words with AI grading
 *  2. Sentence Linking - combine 2 sentences into 1 cohesive sentence
 *  3. Paragraph Reorder - arrange shuffled sentences into a coherent paragraph
 *  4. Cohesion Analyser - paste your own paragraph, get IELTS C&C analysis
 */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link2, Combine, ListOrdered, Wand2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LinkerBank from "./cohesion/LinkerBank";
import SentenceLinking from "./cohesion/SentenceLinking";
import ParagraphReorder from "./cohesion/ParagraphReorder";
import CohesionAnalyser from "./cohesion/CohesionAnalyser";

interface Props {
  taskType: 1 | 2;
}

const CohesionLab = ({ taskType }: Props) => {
  const { t } = useLanguage();
  return (
    <Tabs defaultValue="linker" className="w-full">
      <TabsList className="grid w-full max-w-3xl grid-cols-2 md:grid-cols-4 mb-4 h-auto">
        <TabsTrigger value="linker" className="gap-1.5 py-2">
          <Link2 className="w-3.5 h-3.5" />
          <span className="text-xs md:text-sm">{t("Liên từ", "Linker Bank")}</span>
        </TabsTrigger>
        <TabsTrigger value="linking" className="gap-1.5 py-2">
          <Combine className="w-3.5 h-3.5" />
          <span className="text-xs md:text-sm">{t("Nối câu", "Sentence Linking")}</span>
        </TabsTrigger>
        <TabsTrigger value="reorder" className="gap-1.5 py-2">
          <ListOrdered className="w-3.5 h-3.5" />
          <span className="text-xs md:text-sm">{t("Sắp câu", "Reorder")}</span>
        </TabsTrigger>
        <TabsTrigger value="analyser" className="gap-1.5 py-2">
          <Wand2 className="w-3.5 h-3.5" />
          <span className="text-xs md:text-sm">{t("Phân tích", "Analyser")}</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="linker"><LinkerBank taskType={taskType} /></TabsContent>
      <TabsContent value="linking"><SentenceLinking taskType={taskType} /></TabsContent>
      <TabsContent value="reorder"><ParagraphReorder taskType={taskType} /></TabsContent>
      <TabsContent value="analyser"><CohesionAnalyser taskType={taskType} /></TabsContent>
    </Tabs>
  );
};

export default CohesionLab;
