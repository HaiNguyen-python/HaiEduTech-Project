/**
 * @file DidYouKnow.tsx
 * @description "Bạn có biết?" rotating fun-fact card on the home page.
 * Cycles through curated facts about languages, cultures & programming.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Sparkles, RefreshCw, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

type Category = "language" | "culture" | "programming" | "study";

interface Fact {
  emoji: string;
  category: Category;
  vi: string;
  en: string;
  cta?: { vi: string; en: string; to: string };
}

const FACTS: Fact[] = [
  // Language
  { emoji: "🇨🇳", category: "language", vi: "Tiếng Trung không có thì! Bạn dùng các từ như 了, 过, 将 để chỉ thời gian thay cho việc chia động từ.", en: "Mandarin has no verb tenses! Words like 了, 过, 将 mark time instead of conjugation.", cta: { vi: "Học HSK ngay", en: "Start HSK now", to: "/chinese" } },
  { emoji: "🇬🇧", category: "language", vi: "Tiếng Anh mượn hơn 60% từ vựng từ tiếng Pháp và Latin - nên học gốc từ giúp đoán nghĩa cực nhanh.", en: "Over 60% of English vocabulary is borrowed from French & Latin - learning roots unlocks fast guessing.", cta: { vi: "Khám phá IELTS Vocab", en: "Explore IELTS Vocab", to: "/ielts-vocabulary" } },
  { emoji: "🇫🇮", category: "language", vi: "Tiếng Phần Lan có 15 cách (cases)! Nhưng không có giới tính ngữ pháp như tiếng Đức hay Pháp.", en: "Finnish has 15 grammatical cases - but no grammatical gender like German or French.", cta: { vi: "Thử YKI A2", en: "Try YKI A2", to: "/finnish" } },
  { emoji: "🈶", category: "language", vi: "Chữ Hán '好' (tốt) gồm '女' (nữ) + '子' (con) - người xưa coi mẹ con sum vầy là điều tốt đẹp nhất!", en: "The character '好' (good) = '女' (woman) + '子' (child) - ancient Chinese saw mother & child together as the best thing!", cta: { vi: "Học Hán tự", en: "Learn Hanzi", to: "/chinese/hsk/vocabulary" } },
  { emoji: "🔤", category: "language", vi: "Từ tiếng Anh dài nhất không lặp chữ là 'uncopyrightable' - 15 chữ cái khác nhau hoàn toàn!", en: "The longest English word with no repeated letters is 'uncopyrightable' - 15 unique letters!", cta: { vi: "Luyện SAT Vocab", en: "Practice SAT Vocab", to: "/sat-vocabulary" } },
  { emoji: "🗣️", category: "language", vi: "Tiếng Việt có 6 thanh điệu - đổi thanh là đổi cả nghĩa: ma, má, mà, mả, mã, mạ.", en: "Vietnamese has 6 tones - change the tone, change the word: ma, má, mà, mả, mã, mạ.", cta: { vi: "Học tiếng Việt", en: "Learn Vietnamese", to: "/learn-vietnamese" } },
  { emoji: "📚", category: "language", vi: "TOEIC ban đầu được tạo ra cho... nhân viên ngân hàng Nhật Bản vào năm 1979!", en: "TOEIC was originally created for… Japanese bank employees in 1979!", cta: { vi: "Khám phá TOEIC", en: "Explore TOEIC", to: "/english/toeic" } },
  { emoji: "🎓", category: "language", vi: "IELTS có hơn 11.000 trung tâm khảo thí trên 140 quốc gia - là chứng chỉ tiếng Anh phổ biến nhất thế giới.", en: "IELTS is offered at 11,000+ test centres in 140+ countries - the world's most popular English test.", cta: { vi: "Vào IELTS Hub", en: "Open IELTS Hub", to: "/english/ielts" } },

  // Culture
  { emoji: "🥢", category: "culture", vi: "Người Trung Quốc kiêng cắm đũa thẳng vào bát cơm vì nó giống nén hương trên bàn thờ.", en: "In China, sticking chopsticks upright in rice is taboo - it resembles incense at a funeral altar.", cta: { vi: "Văn hoá Trung Hoa", en: "Chinese Culture", to: "/chinese" } },
  { emoji: "🎋", category: "culture", vi: "Tết Trung Thu ở Việt Nam vốn là lễ hội của trẻ em - rước đèn, phá cỗ và ngắm trăng tròn nhất năm.", en: "Vietnam's Mid-Autumn Festival is a kids' festival - lantern parades, mooncakes, and the year's brightest full moon.", cta: { vi: "Khám phá văn hoá Việt", en: "Vietnamese Culture", to: "/learn-vietnamese" } },
  { emoji: "❄️", category: "culture", vi: "Phần Lan có khoảng 3 triệu phòng tắm hơi (sauna) cho 5,5 triệu dân - gần như nhà nào cũng có!", en: "Finland has ~3 million saunas for 5.5 million people - almost every home owns one!", cta: { vi: "Học YKI Finnish", en: "Learn YKI Finnish", to: "/finnish" } },
  { emoji: "🇬🇧", category: "culture", vi: "Người Anh uống khoảng 100 triệu tách trà mỗi ngày - trà là một phần của 'small talk'!", en: "Brits drink ~100 million cups of tea a day - tea is part of British 'small talk'!", cta: { vi: "Luyện hội thoại EN", en: "Practice EN Conversation", to: "/english/conversational/curriculum" } },
  { emoji: "🏯", category: "culture", vi: "Vạn Lý Trường Thành dài hơn 21.000km - bạn KHÔNG thể nhìn thấy nó từ Mặt Trăng đâu, đó là tin đồn thôi!", en: "The Great Wall stretches 21,000+ km - but no, you cannot see it from the Moon. That's a myth!", cta: { vi: "Học HSK", en: "Study HSK", to: "/chinese/hsk-guide" } },
  { emoji: "🇺🇸", category: "culture", vi: "Đại học Harvard ra đời năm 1636 - sớm hơn nước Mỹ đến 140 năm!", en: "Harvard was founded in 1636 - 140 years before the United States existed!", cta: { vi: "Cổng du học", en: "Study Abroad Hub", to: "/study-abroad" } },

  // Programming
  { emoji: "🐍", category: "programming", vi: "Python được đặt tên theo nhóm hài Monty Python, không phải con rắn - nên ví dụ code hay có 'spam' và 'eggs'!", en: "Python is named after Monty Python - not the snake. That's why examples use 'spam' & 'eggs'!", cta: { vi: "Học Python", en: "Learn Python", to: "/programming" } },
  { emoji: "🪲", category: "programming", vi: "Bug đầu tiên trong lịch sử lập trình là... một con bướm đêm thật, kẹt trong máy tính Mark II năm 1947!", en: "The first computer 'bug' was a real moth stuck inside the Mark II computer in 1947!", cta: { vi: "Mở Programming Lab", en: "Open Programming Lab", to: "/programming" } },
  { emoji: "🤖", category: "programming", vi: "ChatGPT đạt 100 triệu người dùng chỉ trong 2 tháng - kỷ lục nhanh nhất lịch sử các app tiêu dùng.", en: "ChatGPT hit 100M users in just 2 months - the fastest-growing consumer app in history.", cta: { vi: "Vào AI Academy", en: "Enter AI Academy", to: "/programming/ai-academy" } },
  { emoji: "💾", category: "programming", vi: "Lập trình viên đầu tiên trên thế giới là Ada Lovelace - một phụ nữ, từ năm 1843!", en: "The world's first programmer was Ada Lovelace - a woman, back in 1843!", cta: { vi: "Học Lập trình", en: "Start Coding", to: "/programming" } },
  { emoji: "⚡", category: "programming", vi: "JavaScript được Brendan Eich tạo ra chỉ trong... 10 ngày năm 1995!", en: "JavaScript was created by Brendan Eich in just 10 days, in 1995!", cta: { vi: "Khám phá Tech Tools", en: "Explore Tech Tools", to: "/programming" } },
  { emoji: "🧠", category: "programming", vi: "Một mô hình AI lớn có thể có hơn 1.000 tỷ tham số - gấp gần 10 lần số neuron trong não người.", en: "A large AI model can have 1+ trillion parameters - almost 10× the neurons in a human brain.", cta: { vi: "Học AI Academy", en: "AI Academy", to: "/programming/ai-academy" } },
  { emoji: "📊", category: "programming", vi: "Mỗi ngày thế giới tạo ra 402,74 triệu TB dữ liệu - đó là lý do Data Engineer là nghề 'hot' nhất thập kỷ.", en: "The world generates 402.74 million TB of data every day - that's why Data Engineering is the hottest career of the decade.", cta: { vi: "Lộ trình Data", en: "Data Roadmap", to: "/programming" } },

  // Study tips
  { emoji: "💡", category: "study", vi: "Học 25 phút + nghỉ 5 phút (Pomodoro) giúp bạn nhớ lâu hơn 40% so với học liên tục 2 tiếng!", en: "25 min study + 5 min break (Pomodoro) improves retention by 40% vs cramming 2 hours straight!", cta: { vi: "Mở Dashboard học tập", en: "Open Study Dashboard", to: "/dashboard" } },
  { emoji: "🎯", category: "study", vi: "Spaced repetition giúp bạn nhớ 1 từ vựng suốt đời chỉ với 7 lần lặp ở khoảng cách đúng.", en: "Spaced repetition can lock a word into long-term memory with just 7 well-timed reviews.", cta: { vi: "Thử Vocab Bank", en: "Try Vocab Bank", to: "/ielts-vocabulary" } },
  { emoji: "🏆", category: "study", vi: "Học theo 'streak' hàng ngày kích thích dopamine - biến việc học thành 'gây nghiện tích cực'!", en: "Daily learning streaks trigger dopamine - turning studying into a positive addiction!", cta: { vi: "Bắt đầu Streak", en: "Start your Streak", to: "/dashboard" } },
];

const CATEGORY_META: Record<Category, { vi: string; en: string; color: string }> = {
  language: { vi: "Ngôn ngữ", en: "Language", color: "from-sky-500 to-blue-600" },
  culture: { vi: "Văn hoá", en: "Culture", color: "from-rose-500 to-amber-500" },
  programming: { vi: "Lập trình", en: "Programming", color: "from-emerald-500 to-teal-600" },
  study: { vi: "Mẹo học", en: "Study Tip", color: "from-violet-500 to-fuchsia-600" },
};

const ROTATE_MS = 3 * 60 * 1000; // 3 minutes

const DidYouKnow = () => {
  const { t, lang } = useLanguage();

  // Random starting fact each mount
  const startIdx = useMemo(() => Math.floor(Math.random() * FACTS.length), []);
  const [idx, setIdx] = useState(startIdx);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIdx((prev) => {
        let next = prev;
        // Always advance to a different fact
        while (next === prev) next = Math.floor(Math.random() * FACTS.length);
        return next;
      });
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  const fact = FACTS[idx];
  const meta = CATEGORY_META[fact.category];

  const handleNext = () => {
    let next = idx;
    while (next === idx) next = Math.floor(Math.random() * FACTS.length);
    setIdx(next);
  };

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden">
      {/* Soft decorative blobs */}
      <div aria-hidden className="absolute -top-12 left-10 w-56 h-56 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden className="absolute -bottom-16 right-10 w-64 h-64 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400/15 to-pink-400/15 border border-amber-300/30 text-amber-700 dark:text-amber-300 text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            {t("Bạn có biết?", "Did you know?")}
          </div>
          <h2 className="mt-3 text-2xl sm:text-3xl font-display font-bold text-foreground">
            {t("Một sự thật thú vị mỗi 3 phút", "A fun fact every 3 minutes")}
          </h2>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative rounded-3xl bg-gradient-to-br from-background via-background to-primary/5 border-2 border-primary/15 shadow-xl shadow-primary/10 p-6 sm:p-8"
            >
              {/* Cute corner ribbon */}
              <div className={`absolute -top-3 -left-3 px-3 py-1 rounded-full bg-gradient-to-r ${meta.color} text-white text-xs font-bold shadow-lg flex items-center gap-1`}>
                <Lightbulb className="w-3.5 h-3.5" />
                {t(meta.vi, meta.en)}
              </div>

              <div className="flex items-start gap-4 sm:gap-6">
                <motion.div
                  initial={{ rotate: -10, scale: 0.8 }}
                  animate={{ rotate: [0, -6, 6, 0], scale: 1 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-5xl sm:text-6xl shrink-0 drop-shadow-md"
                  aria-hidden
                >
                  {fact.emoji}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="text-base sm:text-lg lg:text-xl text-foreground/90 leading-relaxed font-medium">
                    {lang === "vi" ? fact.vi : fact.en}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    {fact.cta && (
                      <Link
                        to={fact.cta.to}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 group"
                      >
                        {t(fact.cta.vi, fact.cta.en)}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    )}
                    <button
                      onClick={handleNext}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors ml-auto"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      {t("Sự thật khác", "Another fact")}
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          <p className="text-center text-xs text-muted-foreground mt-3">
            {t(
              `Tự động làm mới mỗi 3 phút · ${FACTS.length} sự thật được tuyển chọn`,
              `Auto-refreshes every 3 minutes · ${FACTS.length} curated facts`,
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DidYouKnow;
