// Vietnamese Language Lesson detail view with theory, vocabulary, and quiz
import { useParams, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Zap, Package, Sparkles, Lightbulb } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SmartVocabCard from "@/components/SmartVocabCard";
import { vietnameseLanguageModules } from "@/data/vietnameseCurriculumData";
import type { VietnameseLesson, VietnameseModule, VietnameseVocabEntry } from "@/data/vietnamese/types";

// Teacher Hai tips per lesson (keyed by lesson ID)
const teacherTips: Record<string, { vi: string; en: string }> = {
  "vn-vocab-shopping": {
    vi: "Bạn có biết? Ở Việt Nam, 'mặc cả' là một trải nghiệm văn hóa. Hãy bắt đầu bằng cách xin giảm 30%!",
    en: "Did you know? In Vietnam, 'mặc cả' (bargaining) is a cultural experience. Start by asking for 30% off!",
  },
  "vn-vocab-food": {
    vi: "Mẹo: Khi gọi phở, hãy nói 'Cho tôi một tô phở bò tái chín' – đó là combo phổ biến nhất!",
    en: "Tip: When ordering phở, say 'Cho tôi một tô phở bò tái chín' – that's the most popular combo!",
  },
  "vn-vocab-family": {
    vi: "Hệ thống xưng hô Việt Nam rất phức tạp – nhưng người Việt sẽ rất vui nếu bạn thử gọi đúng!",
    en: "Vietnamese pronouns are complex – but locals love it when you try to use them correctly!",
  },
  "vn-vocab-transport": {
    vi: "90% người Việt dùng xe máy. Nếu muốn hòa nhập, hãy học nói: 'Grab ơi, đến đây!'",
    en: "90% of Vietnamese use motorbikes. To blend in, learn to say: 'Grab ơi, đến đây!' (Hey Grab, come here!)",
  },
  "vn-vocab-greetings": {
    vi: "Luôn thêm 'anh/chị/em' sau 'Chào' – nó thể hiện sự tôn trọng và thân thiện.",
    en: "Always add 'anh/chị/em' after 'Chào' – it shows respect and friendliness.",
  },
};

// Group vocabulary by part of speech into semantic categories
interface VocabGroup {
  label: string;
  labelEn: string;
  icon: React.ReactNode;
  items: VietnameseVocabEntry[];
}

const groupVocabulary = (vocabulary: VietnameseVocabEntry[]): VocabGroup[] => {
  const actions: VietnameseVocabEntry[] = [];
  const objects: VietnameseVocabEntry[] = [];
  const descriptors: VietnameseVocabEntry[] = [];

  vocabulary.forEach((v) => {
    const pos = v.partOfSpeech?.toLowerCase() || "";
    if (pos.includes("verb") || pos === "phrase") {
      actions.push(v);
    } else if (pos === "adjective" || pos === "number") {
      descriptors.push(v);
    } else {
      objects.push(v);
    }
  });

  const groups: VocabGroup[] = [];
  if (actions.length > 0) groups.push({ label: "Hành động", labelEn: "Actions", icon: <Zap className="w-4 h-4" />, items: actions });
  if (objects.length > 0) groups.push({ label: "Danh từ", labelEn: "Objects", icon: <Package className="w-4 h-4" />, items: objects });
  if (descriptors.length > 0) groups.push({ label: "Mô tả", labelEn: "Descriptors", icon: <Sparkles className="w-4 h-4" />, items: descriptors });

  // If only one group, return flat
  if (groups.length <= 1) return [{ label: "Tất cả", labelEn: "All Words", icon: <Sparkles className="w-4 h-4" />, items: vocabulary }];
  return groups;
};

const stripLeadingMarkdownTitle = (content: string) => content.replace(/^##\s+[^\n]+\n+/, "").trim();

const getCategoryGuidance = (category: VietnameseModule["category"], isVietnamese: boolean) => {
  if (isVietnamese) {
    if (category === "grammar") return "Với bài ngữ pháp, hãy nhìn câu theo từng khối: **ai nói / hành động gì / thông tin thêm là gì**. Tiếng Việt ít biến đổi hình thức từ, nên vị trí từ và ngữ cảnh rất quan trọng.";
    if (category === "vocabulary") return "Với bài từ vựng, đừng học từng từ rời rạc. Hãy học theo **cụm dùng được ngay**: gọi món, hỏi đường, chào hỏi, mua đồ hoặc mô tả cảm xúc trong tình huống thật.";
    if (category === "reading") return "Với bài đọc hiểu, hãy đọc 2 lượt: lượt 1 nắm ý chính, lượt 2 gạch chân từ khóa, nhân vật, thời gian, địa điểm và thông điệp văn hóa.";
    return "Với bài văn hóa/dân gian, hãy chú ý tầng nghĩa: nghĩa đen của câu, bài học đạo đức, và cách người Việt dùng câu đó trong đời sống.";
  }

  if (category === "grammar") return "For grammar lessons, read the sentence in chunks: **who speaks / what action happens / what extra information is added**. Vietnamese changes word forms very little, so word order and context matter.";
  if (category === "vocabulary") return "For vocabulary lessons, do not memorize isolated words. Learn **ready-to-use chunks** for ordering food, asking directions, greeting people, shopping, or describing feelings in real situations.";
  if (category === "reading") return "For reading lessons, read twice: first for the main idea, then for keywords, people, time, place, and cultural meaning.";
  return "For culture and folklore lessons, notice the layers: literal meaning, moral message, and how Vietnamese speakers use the phrase in daily life.";
};

const buildTheoryStudyGuide = (lesson: VietnameseLesson, category: VietnameseModule["category"], isVietnamese: boolean) => {
  const examples = lesson.vocabulary
    .filter((item) => item.example && item.exampleEn)
    .slice(0, 5);
  const keyWords = lesson.vocabulary.slice(0, 3).map((v) => v.word).filter(Boolean);
  const firstExample = examples[0];
  const lessonTitle = isVietnamese ? lesson.title : lesson.titleEn;

  if (isVietnamese) {
    return `

### Mục tiêu học xong
- Hiểu quy tắc chính của bài và biết khi nào dùng trong giao tiếp thật.
- Nhìn được trật tự câu tiếng Việt theo từng phần nhỏ: người nói, hành động, đồ vật/thông tin.
- Tự tạo được câu ngắn, rõ nghĩa, phù hợp với tình huống hằng ngày.

### Cách hiểu nhanh cho người nước ngoài
${getCategoryGuidance(category, true)}

### Mẫu câu thực tế
${examples.map((item) => `- **${item.example}** - ${item.exampleEn}`).join("\n")}

### Lưu ý phát âm và văn hóa
- Đọc chậm từng cụm 2-4 từ; đừng nuốt dấu thanh vì dấu thanh có thể đổi nghĩa của từ.
- Khi chưa chắc cách xưng hô, dùng **anh/chị** với người trưởng thành để nghe tự nhiên và lịch sự hơn.
- Trong giao tiếp đời thường, người Việt thích câu ngắn, trực tiếp, có ngữ điệu thân thiện.

### Tự luyện 3 phút (làm theo thứ tự)
**⏱️ Phút 1 - Khởi động phát âm:**
- Đọc to 3 lần các từ khóa của bài: ${keyWords.map((w) => `**${w}**`).join(", ") || "(các từ trong phần Từ vựng)"}.
- Chú ý dấu thanh (sắc, huyền, hỏi, ngã, nặng) - hạ giọng hoặc lên giọng đúng chiều.
- Bấm nút 🔊 ở mỗi thẻ từ vựng để so sánh với giọng chuẩn.

**⏱️ Phút 2 - Ghép câu mẫu:**
- Lấy câu mẫu này làm khuôn: *"${firstExample?.example ?? "(xem mẫu câu phía trên)"}"*.
- Thay 1-2 từ trong câu bằng từ của riêng bạn (tên người, đồ vật, địa điểm bạn biết).
- Nói thành tiếng 3 lần, mỗi lần đổi 1 chi tiết khác nhau.

**⏱️ Phút 3 - Áp dụng tình huống thật:**
- Tưởng tượng bạn đang ở Việt Nam và cần dùng nội dung "${lessonTitle}" trong đời sống.
- Viết hoặc nói ra 2 câu hoàn chỉnh dùng đúng quy tắc bài học.
- Tự chấm: câu có đủ chủ ngữ + động từ + bổ ngữ chưa? Dấu thanh đã rõ ràng chưa?

> 💡 **Mẹo của thầy Hải:** Quay video 30 giây tự nói lại bài học, sau đó nghe lại - bạn sẽ phát hiện ngay các âm chưa rõ và sửa được trong 1 phút.`;
  }

  return `

### Learning goals
- Understand the main rule and know when to use it in real conversations.
- Break a Vietnamese sentence into clear chunks: person, action, and extra information.
- Produce short, natural sentences for daily situations.

### Simple logic for foreign learners
${getCategoryGuidance(category, false)}

### Real-life sentence models
${examples.map((item) => `- **${item.example}** - ${item.exampleEn}`).join("\n")}

### Pronunciation and culture notes
- Speak in small chunks of 2-4 words; tones are essential because a tone change can change meaning.
- If you are unsure about pronouns, use **anh/chị** with adults to sound polite and natural.
- In daily speech, Vietnamese favors short, direct sentences with a friendly tone.

### 3-minute practice (follow the order)
**⏱️ Minute 1 - Warm up pronunciation:**
- Read these key words aloud 3 times: ${keyWords.map((w) => `**${w}**`).join(", ") || "(see Vocabulary section)"}.
- Watch the tone marks (acute, grave, hook, tilde, dot) - they raise or lower your pitch.
- Tap the 🔊 button on each vocabulary card to compare with the native voice.

**⏱️ Minute 2 - Build your own sentence:**
- Use this model: *"${firstExample?.example ?? "(see the sentence models above)"}"*.
- Replace 1-2 words with your own (a name, an object, a place you know).
- Say it out loud 3 times, changing one detail each round.

**⏱️ Minute 3 - Apply to a real situation:**
- Imagine you are in Vietnam and need "${lessonTitle}" right now.
- Write or speak 2 complete sentences that follow the lesson's rule.
- Self-check: do you have a subject + verb + extra info? Are the tones clear?

> 💡 **Mr. Hai's tip:** Record a 30-second video of yourself using the lesson, then listen back - you will spot unclear sounds instantly and fix them within a minute.`;
};

const getEnhancedTheory = (lesson: VietnameseLesson, category: VietnameseModule["category"], isVietnamese: boolean) => {
  const base = stripLeadingMarkdownTitle(isVietnamese ? lesson.theory : lesson.theoryEn);
  return `${base}${buildTheoryStudyGuide(lesson, category, isVietnamese)}`;
};

const lessonMarkdownComponents: Components = {
  h2: ({ children }) => <h2 className="mt-8 mb-4 text-2xl font-display font-extrabold leading-tight text-foreground first:mt-0">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-7 mb-3 border-l-4 border-emerald-500 pl-3 text-xl font-display font-bold leading-snug text-foreground">{children}</h3>,
  p: ({ children }) => <p className="my-3 text-base leading-8 text-foreground sm:text-lg">{children}</p>,
  ul: ({ children }) => <ul className="my-4 space-y-2 pl-4 text-base text-foreground marker:text-emerald-600 sm:pl-5 sm:text-lg">{children}</ul>,
  ol: ({ children }) => <ol className="my-4 space-y-2 pl-5 text-base text-foreground marker:font-bold marker:text-emerald-600 sm:pl-6 sm:text-lg">{children}</ol>,
  li: ({ children }) => <li className="pl-1 leading-8 marker:text-emerald-600">{children}</li>,
  strong: ({ children }) => <strong className="font-extrabold text-foreground">{children}</strong>,
  em: ({ children }) => <em className="not-italic font-medium text-emerald-700 dark:text-emerald-300">{children}</em>,
  blockquote: ({ children }) => <blockquote className="my-5 rounded-r-xl border-l-4 border-emerald-500 bg-emerald-50/70 p-4 text-base sm:text-lg leading-8 text-foreground dark:bg-emerald-950/30">{children}</blockquote>,
  table: ({ children }) => <div className="my-5 overflow-x-auto rounded-xl border-2 border-emerald-500/45"><table className="min-w-[600px] w-full border-collapse text-left text-base text-foreground">{children}</table></div>,
  th: ({ children }) => <th className="border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 font-bold text-foreground">{children}</th>,
  td: ({ children }) => <td className="border border-emerald-500/20 px-4 py-3 align-top leading-7 text-foreground">{children}</td>,
};

const VietnameseLessonView = () => {
  const { moduleId, lessonId } = useParams();
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const mod = useMemo(
    () => vietnameseLanguageModules.find((m) => m.id === moduleId),
    [moduleId]
  );

  const lesson = useMemo(() => {
    if (!mod) return null;
    if (lessonId) return mod.lessons.find((l) => l.id === lessonId) || mod.lessons[0];
    return mod.lessons[0];
  }, [mod, lessonId]);

  if (!mod || !lesson) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 py-20 text-center">
          <p className="text-muted-foreground">{t("Không tìm thấy bài học.", "Lesson not found.")}</p>
          <Link to="/learn-vietnamese" className="text-primary underline mt-4 inline-block">
            {t("Quay lại", "Go back")}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const score = submitted
    ? lesson.quiz.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0)
    : 0;

  const levelColors = {
    beginner: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    advanced: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };

  const tip = teacherTips[lesson.id];
  const vocabGroups = groupVocabulary(lesson.vocabulary);
  const isVietnamese = t("vi", "en") === "vi";
  const theoryMarkdown = getEnhancedTheory(lesson, mod.category, isVietnamese);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-6 pb-16">
        <div className="container mx-auto max-w-full overflow-hidden px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/learn-vietnamese" className="hover:text-foreground">{t("Tiếng Việt", "Vietnamese")}</Link>
            <ChevronRight className="w-3 h-3" />
            <span>{t(mod.title, mod.titleEn)}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">{t(lesson.title, lesson.titleEn)}</span>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-8 xl:grid-cols-[16rem_minmax(0,1fr)]">
            {/* Sidebar: lesson list */}
            <aside className="min-w-0">
              <h3 className="text-sm font-bold text-foreground mb-3">{t(mod.title, mod.titleEn)}</h3>
              <div className="flex gap-2 overflow-x-auto pb-2 xl:block xl:space-y-1 xl:overflow-visible xl:pb-0">
                {mod.lessons.map((l) => (
                  <Link
                    key={l.id}
                    to={`/learn-vietnamese/module/${mod.id}/${l.id}`}
                    className={`block shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors xl:whitespace-normal ${
                      l.id === lesson.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    {t(l.title, l.titleEn)}
                  </Link>
                ))}
              </div>
            </aside>

            {/* Main content */}
            <div className="min-w-0 w-full max-w-4xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="mb-6 rounded-2xl border-2 border-emerald-500/60 bg-card p-5 shadow-sm">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge className={levelColors[lesson.level]}>{lesson.level}</Badge>
                    <span className="text-sm font-semibold text-muted-foreground">{t(mod.title, mod.titleEn)}</span>
                  </div>
                  <h1 className="mt-3 text-2xl font-display font-extrabold leading-tight text-foreground sm:text-4xl">
                    {t(lesson.title, lesson.titleEn)}
                  </h1>
                </div>

                {/* Teacher Hai's Tip */}
                {tip && (
                  <div className="mb-6 rounded-xl border-2 border-emerald-500/45 bg-primary/5 p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Lightbulb className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground mb-1">
                          🎓 Teacher Hai's Tip
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t(tip.vi, tip.en)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Theory */}
                <section className="mb-8 rounded-2xl border-2 border-emerald-500/60 bg-card p-5 shadow-sm sm:p-7 max-sm:pb-24">
                  <div className="mb-5 flex items-center gap-3 border-b border-emerald-500/20 pb-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-lg">📘</div>
                    <div>
                      <h2 className="text-xl font-display font-extrabold leading-tight text-foreground sm:text-2xl">
                        {t("Theory rõ ràng", "Clear Theory")}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {t("Quy tắc → ví dụ → lưu ý → tự luyện", "Rule → examples → notes → practice")}
                      </p>
                    </div>
                  </div>
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={lessonMarkdownComponents}>{theoryMarkdown}</ReactMarkdown>
                </section>

                {/* Pro Tips */}
                {lesson.proTips && lesson.proTips.length > 0 && (
                  <section className="mb-8">
                    <h2 className="text-xl font-display font-extrabold text-foreground mb-3">💡 Pro Tips</h2>
                    <ul className="space-y-2">
                      {(t("vi", "en") === "vi" ? lesson.proTips : lesson.proTipsEn || lesson.proTips).map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-base leading-7 text-muted-foreground">
                          <span className="text-primary mt-0.5">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Smart Vocabulary Cards */}
                {lesson.vocabulary.length > 0 && (
                  <section className="mb-8">
                  <h2 className="text-2xl font-display font-extrabold text-foreground mb-5">📖 {t("Từ vựng", "Vocabulary")}</h2>

                    {vocabGroups.map((group, gi) => (
                      <div key={gi} className="mb-6">
                        {/* Group header */}
                        {vocabGroups.length > 1 && (
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                              {group.icon}
                            </div>
                            <h3 className="text-base font-semibold text-foreground">
                              {t(group.label, group.labelEn)}
                            </h3>
                            <Badge variant="outline" className="text-xs">{group.items.length}</Badge>
                          </div>
                        )}

                        {/* Cards grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                          {group.items.map((v, vi) => (
                            <SmartVocabCard key={`${gi}-${vi}`} vocab={v} index={vi} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </section>
                )}

                {/* Quiz */}
                <section className="mb-8">
                  <h2 className="text-2xl font-display font-extrabold text-foreground mb-4">📝 Quiz</h2>
                  <div className="space-y-5">
                    {lesson.quiz.map((q, qi) => (
                      <div key={qi} className="bg-card border-2 border-emerald-500/50 rounded-xl p-5 shadow-sm">
                        <p className="font-semibold text-foreground mb-3 text-base sm:text-lg leading-7">
                          {qi + 1}. {t(q.question, q.questionEn)}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt, oi) => {
                            const selected = answers[qi] === oi;
                            const isCorrect = submitted && oi === q.answer;
                            const isWrong = submitted && selected && oi !== q.answer;
                            return (
                              <button
                                key={oi}
                                onClick={() => !submitted && setAnswers((p) => ({ ...p, [qi]: oi }))}
                                className={`text-left p-3.5 rounded-lg border transition-colors text-base leading-7 ${
                                  isCorrect
                                    ? "bg-emerald-50 border-emerald-300 dark:bg-emerald-950/30"
                                    : isWrong
                                    ? "bg-red-50 border-emerald-300 dark:bg-red-950/30"
                                    : selected
                                    ? "bg-primary/10 border-primary"
                                    : "bg-muted/50 border-border hover:bg-muted"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {submitted && (
                          <p className="text-sm text-muted-foreground mt-3 leading-7">
                            💡 {t(q.explanation, q.explanationEn)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {!submitted ? (
                    <Button
                      onClick={() => setSubmitted(true)}
                      disabled={Object.keys(answers).length < lesson.quiz.length}
                      className="mt-4 w-full"
                    >
                      {t("Nộp bài", "Submit")}
                    </Button>
                  ) : (
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-lg font-bold">
                        {t("Điểm", "Score")}: {score}/{lesson.quiz.length}
                      </p>
                      <Button variant="outline" onClick={() => { setAnswers({}); setSubmitted(false); }}>
                        {t("Làm lại", "Retry")}
                      </Button>
                    </div>
                  )}
                </section>

                {/* Back */}
                <Link to="/learn-vietnamese">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    {t("Quay lại", "Back")}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VietnameseLessonView;
