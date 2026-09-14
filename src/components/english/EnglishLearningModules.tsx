import { useMemo } from "react";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

import businessArt from "@/assets/english-cluster-business.jpg.asset.json";
import grammarArt from "@/assets/english-cluster-grammar.jpg.asset.json";
import listeningArt from "@/assets/english-cluster-listening.jpg.asset.json";
import mathArt from "@/assets/english-cluster-math.jpg.asset.json";
import readingArt from "@/assets/english-cluster-reading.jpg.asset.json";
import speakingArt from "@/assets/english-cluster-speaking.jpg.asset.json";
import writingArt from "@/assets/english-cluster-writing.jpg.asset.json";
import youngLearnersArt from "@/assets/english-cluster-young-learners.jpg.asset.json";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import type { LanguageModule } from "@/data/languageCurriculum";
import { cn } from "@/lib/utils";

type CategoryId = LanguageModule["category"];
type ArtKey = "reading" | "writing" | "listening" | "speaking" | "grammar" | "math" | "young" | "business";

interface ClusterDefinition {
  id: string;
  titleVi: string;
  titleEn: string;
  descriptionVi: string;
  descriptionEn: string;
  art: ArtKey;
  matches: (moduleId: string) => boolean;
}

interface CategoryDefinition {
  id: CategoryId;
  titleVi: string;
  titleEn: string;
  icon: string;
  tone: string;
  clusters: ClusterDefinition[];
}

const ART: Record<ArtKey, { url: string; altVi: string; altEn: string }> = {
  reading: { url: readingArt.url, altVi: "Học viên chibi đọc sách tiếng Anh", altEn: "Chibi student reading an English book" },
  writing: { url: writingArt.url, altVi: "Học viên chibi luyện viết tiếng Anh", altEn: "Chibi student practising English writing" },
  listening: { url: listeningArt.url, altVi: "Học viên chibi luyện nghe với tai nghe", altEn: "Chibi student practising listening with headphones" },
  speaking: { url: speakingArt.url, altVi: "Hai học viên chibi luyện hội thoại", altEn: "Two chibi students practising conversation" },
  grammar: { url: grammarArt.url, altVi: "Học viên chibi ghép các khối ngữ pháp", altEn: "Chibi student arranging grammar blocks" },
  math: { url: mathArt.url, altVi: "Học viên chibi giải toán và phân tích dữ liệu", altEn: "Chibi student solving maths and data problems" },
  young: { url: youngLearnersArt.url, altVi: "Học viên nhỏ tuổi học tiếng Anh", altEn: "Young chibi learner studying English" },
  business: { url: businessArt.url, altVi: "Học viên chibi luyện tiếng Anh công việc", altEn: "Chibi learner practising workplace English" },
};

const resolveAssetUrl = (url: string) => {
  if (import.meta.env.DEV && window.location.hostname === "localhost") {
    return `https://id-preview--69bf04b5-2aaf-44a8-ab3b-d9285d8ce64b.lovable.app${url}`;
  }
  return url;
};

const includesAny = (id: string, terms: string[]) => terms.some((term) => id.includes(term));

const CLUSTER_DEFINITIONS: CategoryDefinition[] = [
  {
    id: "ielts", titleVi: "IELTS", titleEn: "IELTS", icon: "🎯", tone: "module-category--ielts",
    clusters: [
      { id: "ielts-vocabulary", titleVi: "Từ vựng học thuật", titleEn: "Academic Vocabulary", descriptionVi: "Từ vựng theo chủ đề và ngữ cảnh học thuật", descriptionEn: "Topic-based vocabulary for academic contexts", art: "reading", matches: (id) => id.includes("vocab") },
      { id: "ielts-writing", titleVi: "Kỹ năng Viết", titleEn: "Writing Skills", descriptionVi: "Task 1, Task 2 và chiến lược phát triển ý", descriptionEn: "Task 1, Task 2 and idea development", art: "writing", matches: (id) => id.includes("writing") },
      { id: "ielts-reading", titleVi: "Kỹ năng Đọc", titleEn: "Reading Skills", descriptionVi: "Đọc nhanh, định vị và xử lý dạng câu hỏi", descriptionEn: "Skimming, scanning and question strategies", art: "reading", matches: (id) => id.includes("reading") },
      { id: "ielts-listening", titleVi: "Kỹ năng Nghe", titleEn: "Listening Skills", descriptionVi: "Chiến thuật nghe cho cả bốn phần thi", descriptionEn: "Listening strategies for all four sections", art: "listening", matches: (id) => id.includes("listening") },
      { id: "ielts-speaking", titleVi: "Kỹ năng Nói", titleEn: "Speaking Skills", descriptionVi: "Part 1, 2, 3 và cách phát triển câu trả lời", descriptionEn: "Parts 1, 2, 3 and answer development", art: "speaking", matches: (id) => id.includes("speaking") },
      { id: "ielts-grammar", titleVi: "Ngữ pháp Band 7+", titleEn: "Band 7+ Grammar", descriptionVi: "Cấu trúc nâng cao cho bài thi IELTS", descriptionEn: "Advanced structures for IELTS performance", art: "grammar", matches: (id) => id.includes("grammar") },
    ],
  },
  {
    id: "toeic", titleVi: "TOEIC", titleEn: "TOEIC", icon: "💼", tone: "module-category--toeic",
    clusters: [
      { id: "toeic-listening", titleVi: "Nghe hiểu", titleEn: "Listening", descriptionVi: "Part 1-4 từ nền tảng đến nâng cao", descriptionEn: "Parts 1-4 from foundations to advanced", art: "listening", matches: (id) => id.includes("listening") },
      { id: "toeic-reading", titleVi: "Đọc hiểu", titleEn: "Reading", descriptionVi: "Part 5-7, tốc độ và độ chính xác", descriptionEn: "Parts 5-7, speed and accuracy", art: "reading", matches: (id) => id.includes("reading") },
      { id: "toeic-business", titleVi: "Tiếng Anh công việc", titleEn: "Business English", descriptionVi: "Từ vựng và giao tiếp trong doanh nghiệp", descriptionEn: "Vocabulary and communication for work", art: "business", matches: () => true },
    ],
  },
  {
    id: "cambridge", titleVi: "Cambridge (Trẻ em)", titleEn: "Cambridge (Kids)", icon: "🎓", tone: "module-category--cambridge",
    clusters: [
      { id: "cambridge-starters", titleVi: "Starters", titleEn: "Starters", descriptionVi: "Bước khởi đầu vui nhộn và vững chắc", descriptionEn: "A playful and confident first step", art: "young", matches: (id) => id.includes("starters") },
      { id: "cambridge-movers", titleVi: "Movers", titleEn: "Movers", descriptionVi: "Mở rộng bốn kỹ năng theo cấp độ", descriptionEn: "Build all four skills at the next level", art: "speaking", matches: (id) => id.includes("movers") },
      { id: "cambridge-flyers", titleVi: "Flyers & Luyện kỹ năng", titleEn: "Flyers & Skills", descriptionVi: "Tăng tốc đọc, viết, nghe và nói", descriptionEn: "Advance reading, writing, listening and speaking", art: "reading", matches: () => true },
    ],
  },
  {
    id: "national-exam", titleVi: "Thi THPT Quốc gia", titleEn: "National Exam", icon: "📋", tone: "module-category--national",
    clusters: [
      { id: "national-grammar", titleVi: "Ôn tập Ngữ pháp", titleEn: "Grammar Review", descriptionVi: "Hệ thống hóa cấu trúc trọng tâm", descriptionEn: "Organise the essential grammar structures", art: "grammar", matches: (id) => id.includes("grammar") },
      { id: "national-reading", titleVi: "Đọc hiểu", titleEn: "Reading", descriptionVi: "Kỹ thuật đọc và xử lý câu hỏi", descriptionEn: "Reading techniques and question handling", art: "reading", matches: (id) => id.includes("reading") },
      { id: "national-strategy", titleVi: "Chiến thuật & Luyện đề", titleEn: "Strategy & Practice", descriptionVi: "Chiến lược phòng thi và bài luyện tổng hợp", descriptionEn: "Test strategy and integrated practice", art: "writing", matches: () => true },
    ],
  },
  {
    id: "grammar", titleVi: "Ngữ pháp", titleEn: "Grammar", icon: "📝", tone: "module-category--grammar",
    clusters: [
      { id: "grammar-foundations", titleVi: "Nền tảng cốt lõi", titleEn: "Core Foundations", descriptionVi: "Thì, mạo từ, giới từ, so sánh và động từ", descriptionEn: "Tenses, articles, prepositions, comparisons and verbs", art: "grammar", matches: (id) => includesAny(id, ["tenses", "articles-prepositions", "gerunds", "comparisons"]) || id === "grammar-modals" },
      { id: "grammar-sentences", titleVi: "Xây dựng câu", titleEn: "Sentence Building", descriptionVi: "Trật tự từ, mẫu câu, câu hỏi và hòa hợp", descriptionEn: "Word order, sentence patterns, questions and agreement", art: "writing", matches: (id) => includesAny(id, ["word-order", "sentence-patterns", "question", "sv-agreement"]) },
      { id: "grammar-clauses", titleVi: "Mệnh đề & Liên kết", titleEn: "Clauses & Connections", descriptionVi: "Mệnh đề quan hệ, danh từ, phân từ và điều kiện", descriptionEn: "Relative, noun, participle and conditional clauses", art: "reading", matches: (id) => includesAny(id, ["relative", "noun-clauses", "participle", "conditionals", "linking-words"]) },
      { id: "grammar-advanced", titleVi: "Cấu trúc nâng cao", titleEn: "Advanced Structures", descriptionVi: "Bị động, gián tiếp, đảo ngữ, giả định và câu chẻ", descriptionEn: "Passive, reported speech, inversion, subjunctive and clefts", art: "speaking", matches: (id) => includesAny(id, ["passive", "reported", "inversion", "subjunctive", "cleft", "modals-deep"]) },
      { id: "grammar-usage", titleVi: "Cách dùng & Dấu câu", titleEn: "Usage & Mechanics", descriptionVi: "Dấu câu, lượng từ, giới từ và lỗi dễ nhầm", descriptionEn: "Punctuation, quantifiers, prepositions and confusing pairs", art: "writing", matches: (id) => includesAny(id, ["punctuation", "articles-advanced", "confusing-pairs", "prepositions-patterns"]) },
      { id: "grammar-patterns", titleVi: "Cụm từ & Kết hợp từ", titleEn: "Phrases & Collocations", descriptionVi: "Phrasal verbs và các kết hợp từ tự nhiên", descriptionEn: "Phrasal verbs and natural word combinations", art: "business", matches: () => true },
    ],
  },
  {
    id: "sat", titleVi: "SAT", titleEn: "SAT", icon: "🎖️", tone: "module-category--sat",
    clusters: [
      { id: "sat-reading", titleVi: "Đọc & Bằng chứng", titleEn: "Reading & Evidence", descriptionVi: "Đọc sâu, suy luận và kết nối văn bản", descriptionEn: "Close reading, inference and cross-text connections", art: "reading", matches: (id) => includesAny(id, ["reading", "cross-text", "evidence", "inference"]) },
      { id: "sat-writing", titleVi: "Ngôn ngữ & Viết", titleEn: "Writing & Language", descriptionVi: "Ngữ pháp, dấu câu, chuyển ý và tổng hợp", descriptionEn: "Grammar, punctuation, transitions and synthesis", art: "writing", matches: (id) => includesAny(id, ["writing", "grammar", "punctuation", "transition", "rhetorical", "synthesis", "conventions", "wl-"]) },
      { id: "sat-vocabulary", titleVi: "Từ vựng SAT", titleEn: "SAT Vocabulary", descriptionVi: "Từ học thuật và từ trong ngữ cảnh", descriptionEn: "Academic vocabulary and words in context", art: "business", matches: (id) => id.includes("vocab") || id.includes("words-in-context") },
      { id: "sat-algebra", titleVi: "Đại số & Hàm số", titleEn: "Algebra & Functions", descriptionVi: "Phương trình, hệ phương trình và hàm số", descriptionEn: "Equations, systems and functions", art: "math", matches: (id) => includesAny(id, ["algebra", "quadratic", "function", "linear", "advanced-math"]) },
      { id: "sat-geometry", titleVi: "Hình học & Dữ liệu", titleEn: "Geometry & Data", descriptionVi: "Hình học, lượng giác, thống kê và bài toán thực tế", descriptionEn: "Geometry, trigonometry, statistics and applied problems", art: "math", matches: (id) => includesAny(id, ["geometry", "stats", "data", "word-problems", "math-foundations"]) },
      { id: "sat-strategy", titleVi: "Chiến thuật & Thi thử", titleEn: "Strategy & Mock Review", descriptionVi: "Khởi động, luyện tập, quản lý thời gian và chữa đề", descriptionEn: "Foundations, drills, pacing and mock-test review", art: "young", matches: () => true },
    ],
  },
];

const groupModules = (modules: LanguageModule[], definitions: ClusterDefinition[]) => {
  const remaining = [...modules];
  return definitions.map((definition) => {
    const matched = remaining.filter((module) => definition.matches(module.id));
    matched.forEach((module) => remaining.splice(remaining.indexOf(module), 1));
    return { definition, modules: matched };
  }).filter((cluster) => cluster.modules.length > 0);
};

const LearningCluster = ({ definition, modules }: { definition: ClusterDefinition; modules: LanguageModule[] }) => {
  const { t } = useLanguage();
  const art = ART[definition.art];
  const lessonCount = modules.reduce((sum, module) => sum + module.lessons.length, 0);

  return (
    <AccordionItem value={definition.id} className="learning-cluster overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <AccordionTrigger className="group relative min-h-52 overflow-hidden px-5 py-5 text-left hover:no-underline sm:min-h-60 sm:px-6">
        <img
          src={resolveAssetUrl(art.url)}
          alt={t(art.altVi, art.altEn)}
          width={1024}
          height={640}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.03]"
        />
        <span className="absolute inset-0 bg-gradient-to-r from-card via-card/95 to-card/20" aria-hidden="true" />
        <span className="relative z-10 flex max-w-[72%] flex-col items-start self-end sm:max-w-[65%]">
          <span className="mb-3 rounded-full border border-primary/20 bg-card/85 px-3 py-1 text-sm font-bold text-primary backdrop-blur-sm">
            {modules.length} {t("chuyên đề", "modules")} · {lessonCount} {t("bài học", "lessons")}
          </span>
          <span className="font-display text-xl font-bold leading-tight text-foreground sm:text-2xl">
            {t(definition.titleVi, definition.titleEn)}
          </span>
          <span className="mt-2 text-base font-semibold leading-snug text-secondary-foreground">
            {t(definition.descriptionVi, definition.descriptionEn)}
          </span>
        </span>
      </AccordionTrigger>
      <AccordionContent className="border-t border-border bg-card px-4 pb-4 pt-4 sm:px-5">
        <div className="space-y-2">
          {modules.map((module) => (
            <Link
              key={module.id}
              to={`/english/learn/${module.id}`}
              className="group/link flex min-h-14 items-center gap-3 rounded-md border border-border bg-background/80 px-3 py-2.5 transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="text-xl" aria-hidden="true">{module.icon}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-bold leading-snug text-foreground group-hover/link:text-primary">
                  {t(module.title, module.titleEn)}
                </span>
                <span className="block text-sm font-semibold text-muted-foreground">
                  {module.lessons.length} {t("bài học", "lessons")}
                </span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

const EnglishLearningModules = ({ modules }: { modules: LanguageModule[] }) => {
  const { t } = useLanguage();
  const categories = useMemo(
    () => CLUSTER_DEFINITIONS.map((category) => ({
      ...category,
      modules: modules.filter((module) => module.category === category.id),
    })).filter((category) => category.modules.length > 0),
    [modules],
  );

  return (
    <section className="english-learning-modules mb-10 rounded-lg border border-border bg-card px-4 py-6 shadow-sm sm:px-6 lg:px-8">
      <div className="mb-6 flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <GraduationCap className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            {t("Hệ thống bài học tương tác", "Interactive Learning Modules")}
          </h2>
          <p className="mt-1 text-base font-medium text-muted-foreground">
            {t("Chọn một lộ trình, sau đó mở cụm kỹ năng bạn muốn học.", "Choose a pathway, then open the skill cluster you want to study.")}
          </p>
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["ielts"]} className="space-y-3">
        {categories.map((category) => {
          const lessonCount = category.modules.reduce((sum, module) => sum + module.lessons.length, 0);
          const clusters = groupModules(category.modules, category.clusters);
          return (
            <AccordionItem key={category.id} value={category.id} className={cn("module-category overflow-hidden rounded-lg border px-4", category.tone)}>
              <AccordionTrigger className="py-4 hover:no-underline">
                <span className="flex items-center gap-3 text-left">
                  <span className="text-2xl" aria-hidden="true">{category.icon}</span>
                  <span>
                    <span className="block font-display text-xl font-bold text-foreground sm:text-2xl">{t(category.titleVi, category.titleEn)}</span>
                    <span className="mt-0.5 block text-sm font-semibold text-muted-foreground sm:text-base">
                      {clusters.length} {t("cụm kỹ năng", "skill clusters")} · {lessonCount} {t("bài học", "lessons")}
                    </span>
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <Accordion type="multiple" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {clusters.map((cluster) => (
                    <LearningCluster key={cluster.definition.id} definition={cluster.definition} modules={cluster.modules} />
                  ))}
                </Accordion>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <BookOpen className="h-4 w-4 text-primary" aria-hidden="true" />
                  {category.modules.length} {t("chuyên đề được giữ nguyên đầy đủ", "modules preserved in full")}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
};

export default EnglishLearningModules;