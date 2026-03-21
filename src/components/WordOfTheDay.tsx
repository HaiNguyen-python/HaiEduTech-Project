import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Volume2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface WordEntry {
  word: string;
  phonetic?: string;
  pinyin?: string;
  meaning: string;
  example: string;
  exampleTranslation: string;
}

const englishWords: WordEntry[] = [
  { word: "Resilience", phonetic: "/rɪˈzɪl.i.əns/", meaning: "Khả năng phục hồi sau khó khăn", example: "Her resilience helped her overcome many challenges.", exampleTranslation: "Sự kiên cường đã giúp cô ấy vượt qua nhiều thử thách." },
  { word: "Articulate", phonetic: "/ɑːrˈtɪk.jə.lət/", meaning: "Diễn đạt rõ ràng, mạch lạc", example: "She is very articulate when presenting ideas.", exampleTranslation: "Cô ấy rất mạch lạc khi trình bày ý tưởng." },
  { word: "Endeavor", phonetic: "/ɪnˈdev.ər/", meaning: "Nỗ lực, cố gắng", example: "We should endeavor to improve every day.", exampleTranslation: "Chúng ta nên nỗ lực cải thiện mỗi ngày." },
  { word: "Meticulous", phonetic: "/məˈtɪk.jə.ləs/", meaning: "Tỉ mỉ, cẩn thận", example: "He is meticulous in his research work.", exampleTranslation: "Anh ấy rất tỉ mỉ trong công việc nghiên cứu." },
  { word: "Profound", phonetic: "/prəˈfaʊnd/", meaning: "Sâu sắc, uyên thâm", example: "The book had a profound impact on me.", exampleTranslation: "Cuốn sách có tác động sâu sắc đến tôi." },
  { word: "Ubiquitous", phonetic: "/juːˈbɪk.wɪ.təs/", meaning: "Có mặt ở khắp nơi", example: "Smartphones have become ubiquitous in modern life.", exampleTranslation: "Điện thoại thông minh đã trở nên phổ biến khắp nơi." },
  { word: "Eloquent", phonetic: "/ˈel.ə.kwənt/", meaning: "Hùng biện, lưu loát", example: "She gave an eloquent speech at the ceremony.", exampleTranslation: "Cô ấy đã có bài phát biểu hùng biện tại buổi lễ." },
];

const chineseWords: WordEntry[] = [
  { word: "坚持", pinyin: "jiān chí", meaning: "Kiên trì, bền bỉ", example: "只要你坚持，就一定能成功。", exampleTranslation: "Chỉ cần bạn kiên trì, nhất định sẽ thành công." },
  { word: "努力", pinyin: "nǔ lì", meaning: "Nỗ lực, cố gắng", example: "他很努力地学习中文。", exampleTranslation: "Anh ấy rất nỗ lực học tiếng Trung." },
  { word: "梦想", pinyin: "mèng xiǎng", meaning: "Ước mơ", example: "每个人都有自己的梦想。", exampleTranslation: "Mỗi người đều có ước mơ riêng." },
  { word: "勇气", pinyin: "yǒng qì", meaning: "Dũng khí, can đảm", example: "她有勇气面对困难。", exampleTranslation: "Cô ấy có dũng khí đối mặt với khó khăn." },
  { word: "智慧", pinyin: "zhì huì", meaning: "Trí tuệ, sự thông minh", example: "读书可以增长智慧。", exampleTranslation: "Đọc sách có thể tăng trưởng trí tuệ." },
  { word: "感恩", pinyin: "gǎn ēn", meaning: "Biết ơn", example: "我们要学会感恩。", exampleTranslation: "Chúng ta phải học cách biết ơn." },
  { word: "进步", pinyin: "jìn bù", meaning: "Tiến bộ", example: "你的中文进步很大！", exampleTranslation: "Tiếng Trung của bạn tiến bộ rất nhiều!" },
];

interface Props {
  type: "english" | "chinese";
}

const WordOfTheDay = ({ type }: Props) => {
  const { t } = useLanguage();
  const words = type === "english" ? englishWords : chineseWords;
  const dayIndex = new Date().getDate() % words.length;
  const word = words[dayIndex];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-display font-bold text-foreground">
            {type === "english" ? "📖 Word of the Day" : "📖 每日一词"}
          </h3>
          <p className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="bg-secondary rounded-xl p-5">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl font-bold text-foreground">{word.word}</span>
          {word.phonetic && <span className="text-base text-primary">{word.phonetic}</span>}
          {word.pinyin && <span className="text-base text-primary">{word.pinyin}</span>}
        </div>
        <p className="text-base text-secondary-foreground font-medium mb-3">{word.meaning}</p>
        <div className="bg-background/50 rounded-lg p-3">
          <p className="text-sm text-foreground italic mb-1">"{word.example}"</p>
          <p className="text-xs text-muted-foreground">{word.exampleTranslation}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WordOfTheDay;
