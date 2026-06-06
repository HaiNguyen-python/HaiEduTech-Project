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
import chibiBeginner from "@/assets/grammar-chibi-beginner.png";
import chibiIntermediate from "@/assets/grammar-chibi-intermediate.png";
import chibiAdvanced from "@/assets/grammar-chibi-advanced.png";

const chibiByLevel: Record<string, string> = {
  beginner: chibiBeginner,
  intermediate: chibiIntermediate,
  advanced: chibiAdvanced,
};

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
    if (category === "grammar")
      return "Bạn hãy đọc câu tiếng Việt theo từng cụm 2-4 từ, đừng dịch từng chữ. Tiếng Việt gần như không biến đổi hình thái: cùng một từ **đi**, **học**, **ăn** dùng được cho mọi ngôi và mọi thì - cái thay đổi là **dấu thời gian** (đã, đang, sẽ) và **trật tự từ**. Khi nắm được khung *Ai - làm gì - ở đâu/khi nào*, bạn nói câu nào cũng tự nhiên.";
    if (category === "vocabulary")
      return "Đừng học từ rời. Hãy gom thành **cụm tình huống**: 'cho tôi một…', 'bao nhiêu tiền…', 'tôi muốn…'. Học kiểu này bạn dùng được ngay trong quán phở, ngoài chợ hay khi gọi Grab, không cần ghép câu lại từ đầu.";
    if (category === "reading")
      return "Đọc 2 lượt là đủ: **lượt 1** chỉ cần nắm ý chính - chuyện gì, ai, ở đâu. **Lượt 2** mới gạch chân từ khóa, dấu chấm câu và những chỗ tác giả nhấn mạnh. Với người mới, đọc to thành tiếng còn giúp luyện cả phát âm.";
    return "Với bài văn hóa hay dân gian, hãy đọc theo 3 tầng: **nghĩa đen** của câu, **bài học** mà người Việt rút ra, và **tình huống đời thật** mà người Việt sẽ dùng câu đó. Hiểu đủ ba tầng là bạn nghe người Việt nói chuyện đã có thể 'bắt sóng' được.";
  }

  if (category === "grammar")
    return "Read Vietnamese sentences in 2-4 word chunks, not word-by-word. Vietnamese almost never changes word form - the same **đi**, **học**, **ăn** works for every person and tense. What changes is the **time marker** (đã, đang, sẽ) and **word order**. Once you internalise the *Who - does what - where/when* frame, every sentence comes out naturally.";
  if (category === "vocabulary")
    return "Don't memorise isolated words. Bundle them into **situation chunks**: 'cho tôi một…', 'bao nhiêu tiền…', 'tôi muốn…'. With chunks you can speak immediately in a phở shop, at the market or when calling a Grab - no rebuilding sentences from scratch.";
  if (category === "reading")
    return "Two passes are enough: **pass 1**, just catch the gist - what happens, who, where. **Pass 2**, underline keywords, punctuation, and the writer's emphasis. Beginners gain extra mileage by reading aloud, which also trains pronunciation.";
  return "For culture or folklore lessons, read on three layers: the **literal meaning**, the **lesson** Vietnamese people draw from it, and the **real-life situations** where they actually use it. Once you cover all three, you'll start to 'tune in' when Vietnamese people talk.";
};

const buildLearningGoals = (lesson: VietnameseLesson, category: VietnameseModule["category"], isVietnamese: boolean) => {
  const focus = category === "grammar"
    ? (isVietnamese ? "quy tắc ngữ pháp" : "the grammar pattern")
    : category === "vocabulary"
      ? (isVietnamese ? "nhóm từ vựng" : "the vocabulary set")
      : category === "reading"
        ? (isVietnamese ? "đoạn đọc hiểu" : "the reading passage")
        : (isVietnamese ? "nội dung văn hóa" : "the cultural content");

  if (isVietnamese) {
    return `> 🎯 **Mục tiêu sau bài học**
>
> 1. Hiểu rõ ${focus} và biết **khi nào** thực sự dùng trong giao tiếp hằng ngày.
> 2. Nghe và đọc được câu mẫu của bài, **đọc đúng dấu thanh**, không bị "lơ lớ".
> 3. Tự đặt được **ít nhất 3 câu** của riêng bạn theo đúng cấu trúc.
> 4. Trả lời đúng **4/5 câu quiz** ở cuối bài để xem như đã nắm chắc.

`;
  }
  return `> 🎯 **By the end of this lesson, you will**
>
> 1. Understand ${focus} clearly and know **when** to use it in everyday talk.
> 2. Hear and read the lesson's sample sentences with **correct tones** - no flat pronunciation.
> 3. Build **at least 3 of your own sentences** using the same pattern.
> 4. Answer **4 out of 5 quiz questions** correctly to confirm you've got it.

`;
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

### Cách nắm bài nhanh
${getCategoryGuidance(category, true)}

### Mẫu câu dùng được ngay
Đây là các câu thầy chọn sát với bài học, bạn đọc to từng câu rồi thử thay 1 chi tiết bằng từ của riêng mình:

${examples.map((item) => `- **${item.example}** - ${item.exampleEn}`).join("\n")}

### Lưu ý phát âm và văn hóa
- Đọc chậm, ngắt theo cụm 2-4 từ. Đừng "nuốt" dấu thanh vì sai dấu là **đổi nghĩa từ** (ví dụ *ma - má - mà - mả - mã - mạ*).
- Khi chưa chắc cách xưng hô, cứ dùng **anh** với nam và **chị** với nữ trưởng thành - vừa lịch sự vừa an toàn.
- Người Việt thích **câu ngắn, trực tiếp**, kèm chút ngữ điệu thân thiện. Câu dài kiểu "sách vở" nghe sẽ hơi xa cách.
- Cuối câu hỏi thường có **không, à, hả, nhỉ** - đây là "nhạc điệu" của tiếng Việt, đừng bỏ qua.

### Tự luyện 3 phút (làm theo thứ tự)
**⏱️ Phút 1 - Khởi động phát âm:**
- Đọc to 3 lần các từ khóa: ${keyWords.map((w) => `**${w}**`).join(", ") || "(các từ trong phần Từ vựng)"}.
- Bấm 🔊 ở mỗi thẻ từ vựng và **lặp ngay** sau giọng mẫu - cố bắt chước cả ngữ điệu.

**⏱️ Phút 2 - Ghép câu mẫu:**
- Lấy câu này làm khuôn: *"${firstExample?.example ?? "(xem mẫu câu phía trên)"}"*.
- Thay 1-2 từ trong câu bằng từ của riêng bạn (tên người, đồ vật, nơi bạn biết).
- Nói thành tiếng **3 lần**, mỗi lần đổi một chi tiết khác.

**⏱️ Phút 3 - Áp dụng tình huống thật:**
- Tưởng tượng bạn đang ở Việt Nam và cần dùng nội dung "${lessonTitle}" ngay bây giờ.
- Viết hoặc nói **2 câu hoàn chỉnh** theo đúng cấu trúc bài.
- Tự chấm: câu có đủ **chủ ngữ + động từ + bổ ngữ** chưa? Dấu thanh đã rõ chưa?

> 💡 **Mẹo của thầy Hải:** Quay một clip 30 giây tự nói lại bài, rồi nghe lại. Bạn sẽ thấy ngay âm nào còn mờ - và sửa được trong đúng 1 phút.`;
  }

  return `

### Quick way to grasp the lesson
${getCategoryGuidance(category, false)}

### Ready-to-use sentence models
These sentences are hand-picked for this lesson. Read each one aloud, then swap one detail for a word of your own:

${examples.map((item) => `- **${item.example}** - ${item.exampleEn}`).join("\n")}

### Pronunciation and culture notes
- Speak in 2-4 word chunks. Never "swallow" a tone - **wrong tone = different word** (e.g. *ma - má - mà - mả - mã - mạ*).
- If unsure about pronouns, use **anh** for adult men and **chị** for adult women - polite and safe.
- Vietnamese prefers **short, direct sentences** with a friendly intonation. Long "bookish" sentences feel distant.
- Question particles **không, à, hả, nhỉ** at the end carry the "music" of Vietnamese - don't drop them.

### 3-minute practice (in order)
**⏱️ Minute 1 - Warm up pronunciation:**
- Read these key words aloud 3 times: ${keyWords.map((w) => `**${w}**`).join(", ") || "(see Vocabulary section)"}.
- Tap 🔊 on each vocabulary card and **repeat immediately** after the native voice - copy the intonation too.

**⏱️ Minute 2 - Build your own sentence:**
- Use this model: *"${firstExample?.example ?? "(see the sentence models above)"}"*.
- Replace 1-2 words with your own (a name, an object, a place you know).
- Say it out loud **3 times**, swapping one detail each round.

**⏱️ Minute 3 - Apply to a real situation:**
- Imagine you are in Vietnam and need "${lessonTitle}" right now.
- Write or speak **2 complete sentences** that follow the lesson's pattern.
- Self-check: do you have **subject + verb + extra info**? Are the tones clear?

> 💡 **Mr. Hai's tip:** Record a 30-second clip of yourself doing the lesson, then play it back. You'll spot any unclear sound instantly - and fix it in about a minute.`;
};

const getEnhancedTheory = (lesson: VietnameseLesson, category: VietnameseModule["category"], isVietnamese: boolean) => {
  const base = stripLeadingMarkdownTitle(isVietnamese ? lesson.theory : lesson.theoryEn);
  const goals = buildLearningGoals(lesson, category, isVietnamese);
  return `${goals}${base}${buildTheoryStudyGuide(lesson, category, isVietnamese)}`;
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
            {/* Sidebar: lesson list - professional, numbered cards */}
            <aside className="min-w-0">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-7 w-1.5 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-600" />
                <div>
                  <h3 className="text-sm font-extrabold tracking-tight text-foreground">{t(mod.title, mod.titleEn)}</h3>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {mod.lessons.length} {t("bài học", "lessons")}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 xl:block xl:space-y-1.5 xl:overflow-visible xl:pb-0">
                {mod.lessons.map((l, idx) => {
                  const active = l.id === lesson.id;
                  return (
                    <Link
                      key={l.id}
                      to={`/learn-vietnamese/module/${mod.id}/${l.id}`}
                      className={`group flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-xl border px-3 py-2.5 text-sm transition-all xl:whitespace-normal ${
                        active
                          ? "border-emerald-500/60 bg-gradient-to-r from-emerald-500/15 to-emerald-500/5 font-semibold text-foreground shadow-[0_2px_10px_-4px_rgba(16,185,129,0.45)]"
                          : "border-transparent text-muted-foreground hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-foreground"
                      }`}
                    >
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-bold transition-colors ${
                        active
                          ? "bg-emerald-500 text-white"
                          : "bg-muted text-muted-foreground group-hover:bg-emerald-500/20 group-hover:text-emerald-700 dark:group-hover:text-emerald-300"
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{t(l.title, l.titleEn)}</span>
                    </Link>
                  );
                })}
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
