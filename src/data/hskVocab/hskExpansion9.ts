/**
 * @file hskExpansion9.ts
 * @description HSK Vocabulary Expansion #9 — additional everyday and academic
 * words covering travel, environment, internet, emotions and study.
 */
import type { HskWord } from "./types";

export const hskExpansion9Words: HskWord[] = [
  // Travel
  { character: "护照", pinyin: "hùzhào", level: "HSK 4", definition: { vi: "Hộ chiếu", en: "Passport" }, example: "请出示你的护照。", examplePinyin: "Qǐng chūshì nǐ de hùzhào.", category: "Travel" },
  { character: "签证", pinyin: "qiānzhèng", level: "HSK 5", definition: { vi: "Visa", en: "Visa" }, example: "我正在申请签证。", examplePinyin: "Wǒ zhèngzài shēnqǐng qiānzhèng.", category: "Travel" },
  { character: "登机牌", pinyin: "dēngjīpái", level: "HSK 4", definition: { vi: "Thẻ lên máy bay", en: "Boarding pass" }, example: "请拿好你的登机牌。", examplePinyin: "Qǐng ná hǎo nǐ de dēngjīpái.", category: "Travel" },
  { character: "行李", pinyin: "xíngli", level: "HSK 3", definition: { vi: "Hành lý", en: "Luggage" }, example: "我的行李很重。", examplePinyin: "Wǒ de xíngli hěn zhòng.", category: "Travel" },
  { character: "导游", pinyin: "dǎoyóu", level: "HSK 4", definition: { vi: "Hướng dẫn viên", en: "Tour guide" }, example: "导游讲得很有趣。", examplePinyin: "Dǎoyóu jiǎng de hěn yǒuqù.", category: "Travel" },
  { character: "目的地", pinyin: "mùdìdì", level: "HSK 5", definition: { vi: "Điểm đến", en: "Destination" }, example: "下一个目的地是上海。", examplePinyin: "Xià yí gè mùdìdì shì Shànghǎi.", category: "Travel" },

  // Environment
  { character: "环境", pinyin: "huánjìng", level: "HSK 4", definition: { vi: "Môi trường", en: "Environment" }, example: "保护环境很重要。", examplePinyin: "Bǎohù huánjìng hěn zhòngyào.", category: "Environment" },
  { character: "污染", pinyin: "wūrǎn", level: "HSK 5", definition: { vi: "Ô nhiễm", en: "Pollution" }, example: "空气污染越来越严重。", examplePinyin: "Kōngqì wūrǎn yuè lái yuè yánzhòng.", category: "Environment" },
  { character: "节约", pinyin: "jiéyuē", level: "HSK 5", definition: { vi: "Tiết kiệm", en: "To save / conserve" }, example: "我们要节约用水。", examplePinyin: "Wǒmen yào jiéyuē yòngshuǐ.", category: "Environment" },
  { character: "回收", pinyin: "huíshōu", level: "HSK 5", definition: { vi: "Tái chế", en: "To recycle" }, example: "请把瓶子放进回收箱。", examplePinyin: "Qǐng bǎ píngzi fàng jìn huíshōu xiāng.", category: "Environment" },
  { character: "气候", pinyin: "qìhòu", level: "HSK 5", definition: { vi: "Khí hậu", en: "Climate" }, example: "云南气候很舒服。", examplePinyin: "Yúnnán qìhòu hěn shūfu.", category: "Environment" },

  // Internet & study
  { character: "网络", pinyin: "wǎngluò", level: "HSK 4", definition: { vi: "Mạng / Internet", en: "Network / Internet" }, example: "今天网络很慢。", examplePinyin: "Jīntiān wǎngluò hěn màn.", category: "Technology" },
  { character: "搜索", pinyin: "sōusuǒ", level: "HSK 5", definition: { vi: "Tìm kiếm", en: "To search" }, example: "请用百度搜索一下。", examplePinyin: "Qǐng yòng Bǎidù sōusuǒ yíxià.", category: "Technology" },
  { character: "下载", pinyin: "xiàzài", level: "HSK 4", definition: { vi: "Tải xuống", en: "To download" }, example: "我想下载这个软件。", examplePinyin: "Wǒ xiǎng xiàzài zhège ruǎnjiàn.", category: "Technology" },
  { character: "复习", pinyin: "fùxí", level: "HSK 3", definition: { vi: "Ôn tập", en: "To review" }, example: "考试前要复习。", examplePinyin: "Kǎoshì qián yào fùxí.", category: "Education" },
  { character: "预习", pinyin: "yùxí", level: "HSK 4", definition: { vi: "Chuẩn bị bài trước", en: "To preview lessons" }, example: "请提前预习课文。", examplePinyin: "Qǐng tíqián yùxí kèwén.", category: "Education" },
  { character: "笔记", pinyin: "bǐjì", level: "HSK 4", definition: { vi: "Ghi chú", en: "Notes" }, example: "她的笔记写得很清楚。", examplePinyin: "Tā de bǐjì xiě de hěn qīngchu.", category: "Education" },

  // Emotions
  { character: "兴奋", pinyin: "xīngfèn", level: "HSK 4", definition: { vi: "Hào hứng", en: "Excited" }, example: "孩子们都很兴奋。", examplePinyin: "Háizimen dōu hěn xīngfèn.", category: "Emotion" },
  { character: "紧张", pinyin: "jǐnzhāng", level: "HSK 4", definition: { vi: "Căng thẳng", en: "Nervous / tense" }, example: "面试前我很紧张。", examplePinyin: "Miànshì qián wǒ hěn jǐnzhāng.", category: "Emotion" },
  { character: "失望", pinyin: "shīwàng", level: "HSK 4", definition: { vi: "Thất vọng", en: "Disappointed" }, example: "结果让我有点失望。", examplePinyin: "Jiéguǒ ràng wǒ yǒudiǎn shīwàng.", category: "Emotion" },
  { character: "感动", pinyin: "gǎndòng", level: "HSK 4", definition: { vi: "Cảm động", en: "Moved / touched" }, example: "这个故事很感动。", examplePinyin: "Zhège gùshi hěn gǎndòng.", category: "Emotion" },
  { character: "羡慕", pinyin: "xiànmù", level: "HSK 4", definition: { vi: "Ngưỡng mộ / ghen tị", en: "To envy / admire" }, example: "我很羡慕你的工作。", examplePinyin: "Wǒ hěn xiànmù nǐ de gōngzuò.", category: "Emotion" },

  // Daily
  { character: "习惯", pinyin: "xíguàn", level: "HSK 3", definition: { vi: "Thói quen", en: "Habit" }, example: "早睡是好习惯。", examplePinyin: "Zǎo shuì shì hǎo xíguàn.", category: "Daily Life" },
  { character: "麻烦", pinyin: "máfan", level: "HSK 4", definition: { vi: "Phiền phức", en: "Troublesome" }, example: "对不起，麻烦你了。", examplePinyin: "Duìbuqǐ, máfan nǐ le.", category: "Daily Life" },
  { character: "方便", pinyin: "fāngbiàn", level: "HSK 3", definition: { vi: "Tiện lợi", en: "Convenient" }, example: "这里交通很方便。", examplePinyin: "Zhèlǐ jiāotōng hěn fāngbiàn.", category: "Daily Life" },
  { character: "复杂", pinyin: "fùzá", level: "HSK 4", definition: { vi: "Phức tạp", en: "Complicated" }, example: "这个问题很复杂。", examplePinyin: "Zhège wèntí hěn fùzá.", category: "Daily Life" },
  { character: "简单", pinyin: "jiǎndān", level: "HSK 3", definition: { vi: "Đơn giản", en: "Simple" }, example: "操作非常简单。", examplePinyin: "Cāozuò fēicháng jiǎndān.", category: "Daily Life" },
  { character: "安全", pinyin: "ānquán", level: "HSK 4", definition: { vi: "An toàn", en: "Safe" }, example: "请注意交通安全。", examplePinyin: "Qǐng zhùyì jiāotōng ānquán.", category: "Daily Life" },
];

export default hskExpansion9Words;
