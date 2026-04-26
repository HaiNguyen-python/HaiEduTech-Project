/**
 * @file ChineseCultureHub.tsx
 * @description Trung tâm "Văn hóa Giao tiếp Trung Quốc" - tổng hợp các bài học
 *              văn hóa, lễ hội, phong tục, triết học và quy tắc giao tiếp.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Heart, Lightbulb, PartyPopper, Sparkles, Users, ScrollText, Globe2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { chineseConversationalPillars, type ChineseConvLesson } from "@/data/chineseConversationalCurriculum";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

// IDs các bài học mang đậm yếu tố văn hóa Trung Quốc trong curriculum hội thoại
const CULTURE_LESSON_IDS = [
  "cn-sc-04-festivals",   // Lễ hội & Phong tục (Tết, Trung thu...)
  "cn-sc-11-philosophy",  // Triết học & Tôn giáo (Nho/Đạo/Phật)
  "cn-dl-01-greetings",   // Chào hỏi & cách xưng hô
  "cn-bz-03-office",      // Văn hóa giao tiếp công sở
  "cn-sc-02-opinions",    // Cách bày tỏ quan điểm (giữ thể diện)
  "cn-sc-13-storytelling",// Nghệ thuật kể chuyện & ngôn ngữ thân mật
];

// Pillar văn hóa trừu tượng (chủ đề lý thuyết, không phải lesson dữ liệu)
const culturalThemes = [
  {
    icon: Users,
    color: "from-red-500 to-rose-500",
    titleVi: "Thể diện & Quan hệ (面子 & 关系)",
    titleEn: "Mianzi & Guanxi",
    descVi: "面子 (miànzi - thể diện) và 关系 (guānxi - mối quan hệ) là 2 cột trụ trong giao tiếp Trung Hoa. Người Trung không nói 'không' trực tiếp, ưa dùng cách nói vòng để giữ thể diện cho cả hai bên.",
    descEn: "Mianzi (face) and Guanxi (relationships) are the two pillars of Chinese communication. The Chinese rarely say 'no' directly, preferring indirect language to preserve face for both parties.",
    tips: [
      { vi: "Tránh phê bình thẳng trước đám đông", en: "Avoid public criticism" },
      { vi: "Khen ngợi gián tiếp qua bên thứ 3", en: "Compliment indirectly via a third party" },
      { vi: "Tặng quà đáp lễ kịp thời để duy trì 关系", en: "Reciprocate gifts promptly to maintain Guanxi" },
    ],
  },
  {
    icon: PartyPopper,
    color: "from-orange-500 to-amber-500",
    titleVi: "Lễ hội Truyền thống",
    titleEn: "Traditional Festivals",
    descVi: "Tết Nguyên đán (春节), Trung thu (中秋节), Đoan ngọ (端午节), Thanh minh (清明节)... mỗi lễ hội có nghi thức, ẩm thực và lời chúc riêng. Hiểu lễ hội = mở cánh cửa văn hóa.",
    descEn: "Spring Festival, Mid-Autumn, Dragon Boat, Qingming... each festival has its own rituals, foods and greetings. Knowing the festivals opens the door to the culture.",
    tips: [
      { vi: "新年快乐 - Lời chúc Tết phổ thông nhất", en: "Most common New Year greeting" },
      { vi: "Tặng 红包 (lì xì) bằng cả 2 tay", en: "Hand red envelopes with both hands" },
      { vi: "Số 4 (四) kiêng kỵ - tránh khi tặng quà", en: "Number 4 is taboo - avoid in gifting" },
    ],
  },
  {
    icon: ScrollText,
    color: "from-amber-500 to-yellow-500",
    titleVi: "Triết học cổ điển",
    titleEn: "Classical Philosophy",
    descVi: "Nho giáo (儒家) đề cao lễ nghi, hiếu thảo. Đạo giáo (道家) hướng đến thuận tự nhiên (无为). Phật giáo Hán hóa (禅宗) nhấn mạnh tỉnh thức. Ba trường phái này định hình tư duy người Trung.",
    descEn: "Confucianism values ritual & filial piety. Taoism embraces wu wei (effortless action). Chan Buddhism stresses mindfulness. These three schools shape Chinese thinking.",
    tips: [
      { vi: "已所不欲，勿施于人 - 'Kỷ sở bất dục, vật thi ư nhân'", en: "Confucian Golden Rule" },
      { vi: "上善若水 - Đức cao như nước (Lão Tử)", en: "Highest virtue is like water" },
      { vi: "Tôn trọng cấp trên, người lớn tuổi", en: "Respect seniors and elders" },
    ],
  },
  {
    icon: Heart,
    color: "from-rose-500 to-pink-500",
    titleVi: "Văn hóa Ẩm thực & Tiệc tùng",
    titleEn: "Dining & Banquet Culture",
    descVi: "Bữa tiệc Trung Quốc xoay quanh bàn tròn (圆桌). Chủ tiệc ngồi đối diện cửa, khách quý ngồi bên phải. 干杯 (cạn ly) là nghi thức quan trọng, cần biết cách từ chối lịch sự nếu không uống được.",
    descEn: "Chinese banquets revolve around the round table. The host sits facing the door, the guest of honor on the right. 'Ganbei' (bottoms up) is essential - know how to politely decline if you can't drink.",
    tips: [
      { vi: "Không cắm đũa thẳng vào bát cơm", en: "Never stick chopsticks upright in rice" },
      { vi: "Rót trà cho người khác trước khi rót cho mình", en: "Pour tea for others first" },
      { vi: "Gõ nhẹ ngón tay = lời cảm ơn khi được rót trà", en: "Tap fingers to say thank you for tea" },
    ],
  },
  {
    icon: Globe2,
    color: "from-emerald-500 to-teal-500",
    titleVi: "Ngôn ngữ Cơ thể & Tabu",
    titleEn: "Body Language & Taboos",
    descVi: "Bắt tay nhẹ (không nắm chặt), tránh ôm trừ khi rất thân. Đưa danh thiếp bằng 2 tay, mặt chữ hướng về người nhận. Tránh nói chuyện chính trị nhạy cảm như Đài Loan, Tây Tạng với người mới quen.",
    descEn: "Light handshakes, avoid hugs unless very close. Present business cards with both hands, text facing the receiver. Avoid sensitive political topics like Taiwan, Tibet with new acquaintances.",
    tips: [
      { vi: "Không chỉ tay bằng 1 ngón - dùng cả bàn tay", en: "Don't point with one finger - use whole hand" },
      { vi: "Màu trắng = tang lễ (tránh tặng hoa trắng)", en: "White = funeral (avoid white flowers)" },
      { vi: "Đồng hồ (送钟) đồng âm với 'tiễn cuối cùng' - không tặng", en: "Don't gift clocks - homophone for funeral" },
    ],
  },
  {
    icon: Sparkles,
    color: "from-purple-500 to-indigo-500",
    titleVi: "Thành ngữ & Tục ngữ Vàng",
    titleEn: "Golden Idioms & Proverbs",
    descVi: "Thành ngữ 4 chữ (成语) là tinh hoa văn hóa Hán. Sử dụng đúng thành ngữ trong hội thoại sẽ khiến đối phương đánh giá cao trình độ và sự am hiểu văn hóa của bạn.",
    descEn: "Four-character idioms (chengyu) are the essence of Chinese culture. Using them correctly in conversation earns immediate respect and demonstrates cultural depth.",
    tips: [
      { vi: "入乡随俗 - Nhập gia tùy tục", en: "When in Rome, do as Romans" },
      { vi: "一举两得 - Một công đôi việc", en: "Kill two birds with one stone" },
      { vi: "活到老学到老 - Học cả đời", en: "Learning is lifelong" },
    ],
  },
];

// Lấy bài học theo ID từ pillars
const getLessonsByIds = (ids: string[]): ChineseConvLesson[] => {
  const all = chineseConversationalPillars.flatMap(p => p.lessons);
  return ids.map(id => all.find(l => l.id === id)).filter(Boolean) as ChineseConvLesson[];
};

const ChineseCultureHub = () => {
  const { t } = useLanguage();
  const cultureLessons = getLessonsByIds(CULTURE_LESSON_IDS);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t("Văn hóa Giao tiếp Trung Quốc | HaiEduTech", "Chinese Communication Culture | HaiEduTech")}
        description={t(
          "Khám phá văn hóa giao tiếp Trung Quốc: thể diện, quan hệ, lễ hội, triết học cổ điển và các bài học giao tiếp văn hóa.",
          "Explore Chinese communication culture: Mianzi, Guanxi, festivals, classical philosophy and cultural lessons."
        )}
      />
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Link to="/chinese" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" />
          {t("Quay lại Tiếng Trung", "Back to Chinese")}
        </Link>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 mb-4">
            <Sparkles className="h-4 w-4 text-red-500" />
            <span className="text-xs font-medium text-red-700">
              {t("Văn hóa Giao tiếp", "Communication Culture")}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-3">
            {t("Văn hóa Giao tiếp ", "Chinese ")}
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
              {t("中国文化", "Communication 文化")}
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            {t(
              "Hiểu văn hóa = Nói tiếng Trung tự nhiên. Khám phá thể diện (面子), mối quan hệ (关系), lễ hội, triết học cổ điển và quy tắc ứng xử để giao tiếp hiệu quả với người Trung Quốc.",
              "Understanding culture = speaking Chinese naturally. Discover face (Mianzi), relationships (Guanxi), festivals, classical philosophy and etiquette to communicate effectively."
            )}
          </p>
        </motion.div>

        {/* 6 chủ đề văn hóa */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-amber-500" />
            {t("6 Trụ cột Văn hóa Giao tiếp", "6 Pillars of Communication Culture")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {culturalThemes.map((theme, i) => {
              const Icon = theme.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Card className="p-5 h-full hover:shadow-lg transition-shadow border-2 hover:border-red-500/30">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${theme.color} text-white mb-3 shadow-md`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{t(theme.titleVi, theme.titleEn)}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {t(theme.descVi, theme.descEn)}
                    </p>
                    <div className="space-y-1.5 pt-3 border-t">
                      {theme.tips.map((tip, j) => (
                        <div key={j} className="flex items-start gap-2 text-xs">
                          <span className="text-red-500 mt-0.5">•</span>
                          <span className="text-foreground/80">{t(tip.vi, tip.en)}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Bài học liên quan đến văn hóa từ Curriculum */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-red-500" />
            {t("Bài học Văn hóa Tương tác", "Interactive Culture Lessons")}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {t(
              "Các bài học tương tác (HSK 1-5) tập trung vào tình huống giao tiếp đậm chất văn hóa Trung Quốc.",
              "Interactive lessons (HSK 1-5) focused on culturally-rich communication situations."
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cultureLessons.map((lesson, i) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/chinese/conversational/learn/${lesson.id}`}>
                  <Card className="p-4 hover:shadow-md transition-all hover:border-red-500/40 border-2 group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                        {lesson.titleZh.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-base group-hover:text-red-500 transition-colors">
                            {t(lesson.titleVi, lesson.title)}
                          </h3>
                          <Badge variant="outline" className="text-[10px]">HSK {lesson.hskLevel}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{lesson.titleZh}</p>
                        <p className="text-xs text-foreground/70 line-clamp-2">
                          {t(lesson.descriptionVi, lesson.description)}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center p-8 rounded-2xl bg-gradient-to-r from-red-500/10 via-orange-500/10 to-amber-500/10 border border-red-500/20">
          <h3 className="text-xl font-bold mb-2">
            {t("Sẵn sàng học sâu hơn?", "Ready to dive deeper?")}
          </h3>
          <p className="text-sm text-muted-foreground mb-5 max-w-xl mx-auto">
            {t(
              "Khám phá toàn bộ 38+ bài hội thoại tương tác, luyện AI Roleplay và bài tập văn hóa.",
              "Explore all 38+ interactive conversation lessons, AI Roleplay practice and culture exercises."
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
              <Link to="/chinese/conversational/curriculum">
                <BookOpen className="h-4 w-4 mr-2" />
                {t("Chương trình Tương tác", "Interactive Curriculum")}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/speaking-coach/chinese">
                {t("🎙️ AI Speaking Coach", "🎙️ AI Speaking Coach")}
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ChineseCultureHub;
