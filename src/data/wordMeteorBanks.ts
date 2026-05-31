/**
 * Word Meteor banks - distinct, language-native vocabulary for each language.
 * Each language has its own theme: EN abstract adjectives, ZH HSK keywords,
 * VI everyday & cultural words, FI nature/sisu themed.
 */
export type MeteorLang = "en" | "zh" | "vi" | "fi";
export interface MeteorItem { word: string; meaning: string; }

export const METEOR_BANKS: Record<MeteorLang, MeteorItem[]> = {
  // English → Vietnamese (B1–C1 academic / IELTS flavor)
  en: [
    { word: "ephemeral", meaning: "ngắn ngủi" },
    { word: "resilient", meaning: "kiên cường" },
    { word: "candid", meaning: "thẳng thắn" },
    { word: "vivid", meaning: "sống động" },
    { word: "nurture", meaning: "nuôi dưỡng" },
    { word: "obstacle", meaning: "trở ngại" },
    { word: "thrive", meaning: "phát triển mạnh" },
    { word: "humble", meaning: "khiêm tốn" },
    { word: "diligent", meaning: "chăm chỉ" },
    { word: "ambiguous", meaning: "mơ hồ" },
    { word: "scrutinize", meaning: "xem xét kỹ" },
    { word: "advocate", meaning: "ủng hộ" },
    { word: "tedious", meaning: "tẻ nhạt" },
    { word: "lucid", meaning: "rõ ràng, sáng tỏ" },
    { word: "frugal", meaning: "tiết kiệm" },
    { word: "arduous", meaning: "gian khổ" },
  ],

  // Chinese (Hanzi + Pinyin) → Vietnamese (HSK 2–4)
  zh: [
    { word: "幸福 xìngfú", meaning: "hạnh phúc" },
    { word: "努力 nǔlì", meaning: "nỗ lực" },
    { word: "环境 huánjìng", meaning: "môi trường" },
    { word: "梦想 mèngxiǎng", meaning: "ước mơ" },
    { word: "成功 chénggōng", meaning: "thành công" },
    { word: "友谊 yǒuyì", meaning: "tình bạn" },
    { word: "健康 jiànkāng", meaning: "sức khỏe" },
    { word: "勇敢 yǒnggǎn", meaning: "dũng cảm" },
    { word: "经验 jīngyàn", meaning: "kinh nghiệm" },
    { word: "机会 jīhuì", meaning: "cơ hội" },
    { word: "文化 wénhuà", meaning: "văn hóa" },
    { word: "习惯 xíguàn", meaning: "thói quen" },
    { word: "聪明 cōngmíng", meaning: "thông minh" },
    { word: "礼物 lǐwù", meaning: "quà tặng" },
    { word: "旅行 lǚxíng", meaning: "du lịch" },
    { word: "认真 rènzhēn", meaning: "nghiêm túc" },
  ],

  // Vietnamese → English (for VN learners studying EN translation, plus foreigners)
  vi: [
    { word: "yêu thương", meaning: "to love" },
    { word: "biển cả", meaning: "the sea" },
    { word: "ánh trăng", meaning: "moonlight" },
    { word: "kỷ niệm", meaning: "memory" },
    { word: "hy vọng", meaning: "hope" },
    { word: "đoàn kết", meaning: "unity" },
    { word: "gia đình", meaning: "family" },
    { word: "tự hào", meaning: "proud" },
    { word: "phở bò", meaning: "beef noodle soup" },
    { word: "áo dài", meaning: "traditional long dress" },
    { word: "quê hương", meaning: "homeland" },
    { word: "lễ hội", meaning: "festival" },
    { word: "trống đồng", meaning: "bronze drum" },
    { word: "cánh đồng", meaning: "rice field" },
    { word: "chăm chỉ", meaning: "hard-working" },
    { word: "khám phá", meaning: "to explore" },
  ],

  // Finnish → Vietnamese (A2/B1 + culture)
  fi: [
    { word: "rakkaus", meaning: "tình yêu" },
    { word: "sisu", meaning: "kiên cường (Phần Lan)" },
    { word: "metsä", meaning: "rừng" },
    { word: "järvi", meaning: "hồ" },
    { word: "talvi", meaning: "mùa đông" },
    { word: "ystävä", meaning: "bạn bè" },
    { word: "rauha", meaning: "bình yên" },
    { word: "onni", meaning: "may mắn" },
    { word: "kahvi", meaning: "cà phê" },
    { word: "sauna", meaning: "phòng tắm hơi" },
    { word: "lumi", meaning: "tuyết" },
    { word: "kesä", meaning: "mùa hè" },
    { word: "perhe", meaning: "gia đình" },
    { word: "koti", meaning: "nhà" },
    { word: "kirja", meaning: "sách" },
    { word: "opiskella", meaning: "học tập" },
  ],
};

export const METEOR_LANG_THEME: Record<MeteorLang, { accent: string; emoji: string; label: string }> = {
  en: { accent: "from-violet-500 to-fuchsia-500", emoji: "☄️", label: "English" },
  zh: { accent: "from-red-500 to-amber-500",      emoji: "🐉", label: "中文" },
  vi: { accent: "from-amber-500 to-rose-500",     emoji: "🪷", label: "Tiếng Việt" },
  fi: { accent: "from-sky-500 to-cyan-500",       emoji: "❄️", label: "Suomi" },
};
