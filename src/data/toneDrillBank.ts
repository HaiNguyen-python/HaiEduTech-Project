/**
 * @file toneDrillBank.ts
 * @description Bộ dữ liệu luyện thanh điệu tiếng Trung (4 thanh + thanh nhẹ).
 * 4 chế độ: single tone, tone pair, minimal pair, sandhi.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export type ToneNumber = 1 | 2 | 3 | 4 | 0; // 0 = thanh nhẹ (neutral)

export interface SingleToneItem {
  hanzi: string;
  pinyin: string;       // pinyin có dấu
  pinyinPlain: string;  // pinyin không dấu (để TTS chuẩn hơn nếu cần)
  tone: ToneNumber;
  meaning: string;
}

export interface TonePairItem {
  hanzi: string;        // 2 ký tự
  pinyin: string;
  tones: [ToneNumber, ToneNumber];
  meaning: string;
  meaningEn: string;
}


export interface MinimalPairItem {
  a: { hanzi: string; pinyin: string; tone: ToneNumber; meaning: string };
  b: { hanzi: string; pinyin: string; tone: ToneNumber; meaning: string };
}

export interface SandhiItem {
  hanzi: string;
  pinyinWritten: string;  // pinyin gốc (như sách)
  pinyinSpoken: string;   // pinyin thực tế khi nói (sau biến điệu)
  rule: "3-3" | "bu" | "yi";
  ruleNote: string;
  meaning: string;
}

// =============== SINGLE TONE - 60 từ (15 mỗi thanh + vài thanh nhẹ) ===============
export const SINGLE_TONE_BANK: SingleToneItem[] = [
  // Thanh 1 (cao bằng) - 1
  { hanzi: "妈", pinyin: "mā", pinyinPlain: "ma", tone: 1, meaning: "mẹ" },
  { hanzi: "高", pinyin: "gāo", pinyinPlain: "gao", tone: 1, meaning: "cao" },
  { hanzi: "书", pinyin: "shū", pinyinPlain: "shu", tone: 1, meaning: "sách" },
  { hanzi: "工", pinyin: "gōng", pinyinPlain: "gong", tone: 1, meaning: "công" },
  { hanzi: "三", pinyin: "sān", pinyinPlain: "san", tone: 1, meaning: "ba (3)" },
  { hanzi: "天", pinyin: "tiān", pinyinPlain: "tian", tone: 1, meaning: "trời/ngày" },
  { hanzi: "他", pinyin: "tā", pinyinPlain: "ta", tone: 1, meaning: "anh ấy" },
  { hanzi: "猫", pinyin: "māo", pinyinPlain: "mao", tone: 1, meaning: "mèo" },
  { hanzi: "杯", pinyin: "bēi", pinyinPlain: "bei", tone: 1, meaning: "cốc" },
  { hanzi: "鸡", pinyin: "jī", pinyinPlain: "ji", tone: 1, meaning: "gà" },
  // Thanh 2 (đi lên) - 2
  { hanzi: "麻", pinyin: "má", pinyinPlain: "ma", tone: 2, meaning: "gai/cây gai" },
  { hanzi: "国", pinyin: "guó", pinyinPlain: "guo", tone: 2, meaning: "nước/quốc" },
  { hanzi: "学", pinyin: "xué", pinyinPlain: "xue", tone: 2, meaning: "học" },
  { hanzi: "茶", pinyin: "chá", pinyinPlain: "cha", tone: 2, meaning: "trà" },
  { hanzi: "人", pinyin: "rén", pinyinPlain: "ren", tone: 2, meaning: "người" },
  { hanzi: "来", pinyin: "lái", pinyinPlain: "lai", tone: 2, meaning: "đến" },
  { hanzi: "明", pinyin: "míng", pinyinPlain: "ming", tone: 2, meaning: "sáng/Minh" },
  { hanzi: "毛", pinyin: "máo", pinyinPlain: "mao", tone: 2, meaning: "lông" },
  { hanzi: "红", pinyin: "hóng", pinyinPlain: "hong", tone: 2, meaning: "đỏ" },
  { hanzi: "鱼", pinyin: "yú", pinyinPlain: "yu", tone: 2, meaning: "cá" },
  // Thanh 3 (xuống rồi lên) - 3
  { hanzi: "马", pinyin: "mǎ", pinyinPlain: "ma", tone: 3, meaning: "ngựa" },
  { hanzi: "我", pinyin: "wǒ", pinyinPlain: "wo", tone: 3, meaning: "tôi" },
  { hanzi: "买", pinyin: "mǎi", pinyinPlain: "mai", tone: 3, meaning: "mua" },
  { hanzi: "好", pinyin: "hǎo", pinyinPlain: "hao", tone: 3, meaning: "tốt/khoẻ" },
  { hanzi: "你", pinyin: "nǐ", pinyinPlain: "ni", tone: 3, meaning: "bạn" },
  { hanzi: "五", pinyin: "wǔ", pinyinPlain: "wu", tone: 3, meaning: "năm (5)" },
  { hanzi: "水", pinyin: "shuǐ", pinyinPlain: "shui", tone: 3, meaning: "nước" },
  { hanzi: "走", pinyin: "zǒu", pinyinPlain: "zou", tone: 3, meaning: "đi" },
  { hanzi: "想", pinyin: "xiǎng", pinyinPlain: "xiang", tone: 3, meaning: "nghĩ/muốn" },
  { hanzi: "请", pinyin: "qǐng", pinyinPlain: "qing", tone: 3, meaning: "xin/mời" },
  // Thanh 4 (đi xuống) - 4
  { hanzi: "骂", pinyin: "mà", pinyinPlain: "ma", tone: 4, meaning: "mắng" },
  { hanzi: "卖", pinyin: "mài", pinyinPlain: "mai", tone: 4, meaning: "bán" },
  { hanzi: "是", pinyin: "shì", pinyinPlain: "shi", tone: 4, meaning: "là" },
  { hanzi: "去", pinyin: "qù", pinyinPlain: "qu", tone: 4, meaning: "đi" },
  { hanzi: "看", pinyin: "kàn", pinyinPlain: "kan", tone: 4, meaning: "nhìn/xem" },
  { hanzi: "大", pinyin: "dà", pinyinPlain: "da", tone: 4, meaning: "to/lớn" },
  { hanzi: "下", pinyin: "xià", pinyinPlain: "xia", tone: 4, meaning: "dưới" },
  { hanzi: "饭", pinyin: "fàn", pinyinPlain: "fan", tone: 4, meaning: "cơm" },
  { hanzi: "在", pinyin: "zài", pinyinPlain: "zai", tone: 4, meaning: "ở/đang" },
  { hanzi: "对", pinyin: "duì", pinyinPlain: "dui", tone: 4, meaning: "đúng/cặp" },
  // Thanh nhẹ - 0
  { hanzi: "吗", pinyin: "ma", pinyinPlain: "ma", tone: 0, meaning: "(trợ từ hỏi)" },
  { hanzi: "呢", pinyin: "ne", pinyinPlain: "ne", tone: 0, meaning: "(trợ từ hỏi)" },
  { hanzi: "了", pinyin: "le", pinyinPlain: "le", tone: 0, meaning: "(trợ từ hoàn thành)" },
  { hanzi: "的", pinyin: "de", pinyinPlain: "de", tone: 0, meaning: "(trợ từ sở hữu)" },
  { hanzi: "吧", pinyin: "ba", pinyinPlain: "ba", tone: 0, meaning: "(trợ từ đề nghị)" },
];

// =============== TONE PAIR - 30 cặp phủ đủ 20 tổ hợp thanh HSK 1-3 ===============
export const TONE_PAIR_BANK: TonePairItem[] = [
  { hanzi: "星期", pinyin: "xīngqī", tones: [1, 1], meaning: "tuần", meaningEn: "week" },
  { hanzi: "中国", pinyin: "Zhōngguó", tones: [1, 2], meaning: "Trung Quốc", meaningEn: "China" },
  { hanzi: "中午", pinyin: "zhōngwǔ", tones: [1, 3], meaning: "buổi trưa", meaningEn: "noon" },
  { hanzi: "高兴", pinyin: "gāoxìng", tones: [1, 4], meaning: "vui mừng", meaningEn: "happy" },
  { hanzi: "妈妈", pinyin: "māma", tones: [1, 0], meaning: "mẹ", meaningEn: "mum" },
  { hanzi: "明天", pinyin: "míngtiān", tones: [2, 1], meaning: "ngày mai", meaningEn: "tomorrow" },
  { hanzi: "学习", pinyin: "xuéxí", tones: [2, 2], meaning: "học tập", meaningEn: "to study" },
  { hanzi: "朋友", pinyin: "péngyǒu", tones: [2, 3], meaning: "bạn bè", meaningEn: "friend" },
  { hanzi: "学校", pinyin: "xuéxiào", tones: [2, 4], meaning: "trường học", meaningEn: "school" },
  { hanzi: "时候", pinyin: "shíhou", tones: [2, 0], meaning: "lúc, khi", meaningEn: "time, moment" },
  { hanzi: "老师", pinyin: "lǎoshī", tones: [3, 1], meaning: "giáo viên", meaningEn: "teacher" },
  { hanzi: "美国", pinyin: "Měiguó", tones: [3, 2], meaning: "nước Mỹ", meaningEn: "the USA" },
  { hanzi: "你好", pinyin: "nǐhǎo", tones: [3, 3], meaning: "xin chào", meaningEn: "hello" },
  { hanzi: "考试", pinyin: "kǎoshì", tones: [3, 4], meaning: "kỳ thi", meaningEn: "exam" },
  { hanzi: "喜欢", pinyin: "xǐhuan", tones: [3, 0], meaning: "thích", meaningEn: "to like" },
  { hanzi: "面包", pinyin: "miànbāo", tones: [4, 1], meaning: "bánh mì", meaningEn: "bread" },
  { hanzi: "大学", pinyin: "dàxué", tones: [4, 2], meaning: "đại học", meaningEn: "university" },
  { hanzi: "汉语", pinyin: "Hànyǔ", tones: [4, 3], meaning: "tiếng Hán", meaningEn: "Chinese language" },
  { hanzi: "再见", pinyin: "zàijiàn", tones: [4, 4], meaning: "tạm biệt", meaningEn: "goodbye" },
  { hanzi: "认识", pinyin: "rènshi", tones: [4, 0], meaning: "quen biết", meaningEn: "to know someone" },
  { hanzi: "医生", pinyin: "yīshēng", tones: [1, 1], meaning: "bác sĩ", meaningEn: "doctor" },
  { hanzi: "铅笔", pinyin: "qiānbǐ", tones: [1, 3], meaning: "bút chì", meaningEn: "pencil" },
  { hanzi: "工作", pinyin: "gōngzuò", tones: [1, 4], meaning: "công việc", meaningEn: "work, job" },
  { hanzi: "房子", pinyin: "fángzi", tones: [2, 0], meaning: "căn nhà", meaningEn: "house" },
  { hanzi: "苹果", pinyin: "píngguǒ", tones: [2, 3], meaning: "táo", meaningEn: "apple" },
  { hanzi: "可以", pinyin: "kěyǐ", tones: [3, 3], meaning: "có thể", meaningEn: "may, can" },
  { hanzi: "米饭", pinyin: "mǐfàn", tones: [3, 4], meaning: "cơm", meaningEn: "cooked rice" },
  { hanzi: "我们", pinyin: "wǒmen", tones: [3, 0], meaning: "chúng tôi", meaningEn: "we" },
  { hanzi: "电话", pinyin: "diànhuà", tones: [4, 4], meaning: "điện thoại", meaningEn: "telephone" },
  { hanzi: "谢谢", pinyin: "xièxie", tones: [4, 0], meaning: "cảm ơn", meaningEn: "thank you" },
];


// =============== MINIMAL PAIR - 20 cặp dễ nhầm ===============
export const MINIMAL_PAIR_BANK: MinimalPairItem[] = [
  { a: { hanzi: "买", pinyin: "mǎi", tone: 3, meaning: "mua" }, b: { hanzi: "卖", pinyin: "mài", tone: 4, meaning: "bán" } },
  { a: { hanzi: "妈", pinyin: "mā", tone: 1, meaning: "mẹ" }, b: { hanzi: "马", pinyin: "mǎ", tone: 3, meaning: "ngựa" } },
  { a: { hanzi: "麻", pinyin: "má", tone: 2, meaning: "gai" }, b: { hanzi: "骂", pinyin: "mà", tone: 4, meaning: "mắng" } },
  { a: { hanzi: "是", pinyin: "shì", tone: 4, meaning: "là" }, b: { hanzi: "十", pinyin: "shí", tone: 2, meaning: "mười" } },
  { a: { hanzi: "四", pinyin: "sì", tone: 4, meaning: "bốn" }, b: { hanzi: "十", pinyin: "shí", tone: 2, meaning: "mười" } },
  { a: { hanzi: "睡", pinyin: "shuì", tone: 4, meaning: "ngủ" }, b: { hanzi: "水", pinyin: "shuǐ", tone: 3, meaning: "nước" } },
  { a: { hanzi: "问", pinyin: "wèn", tone: 4, meaning: "hỏi" }, b: { hanzi: "吻", pinyin: "wěn", tone: 3, meaning: "hôn" } },
  { a: { hanzi: "请", pinyin: "qǐng", tone: 3, meaning: "mời" }, b: { hanzi: "情", pinyin: "qíng", tone: 2, meaning: "tình cảm" } },
  { a: { hanzi: "想", pinyin: "xiǎng", tone: 3, meaning: "nghĩ" }, b: { hanzi: "向", pinyin: "xiàng", tone: 4, meaning: "hướng" } },
  { a: { hanzi: "好", pinyin: "hǎo", tone: 3, meaning: "tốt" }, b: { hanzi: "号", pinyin: "hào", tone: 4, meaning: "số" } },
  { a: { hanzi: "买", pinyin: "mǎi", tone: 3, meaning: "mua" }, b: { hanzi: "麦", pinyin: "mài", tone: 4, meaning: "lúa mì" } },
  { a: { hanzi: "鸡", pinyin: "jī", tone: 1, meaning: "gà" }, b: { hanzi: "急", pinyin: "jí", tone: 2, meaning: "gấp" } },
  { a: { hanzi: "杯", pinyin: "bēi", tone: 1, meaning: "cốc" }, b: { hanzi: "北", pinyin: "běi", tone: 3, meaning: "bắc" } },
  { a: { hanzi: "包", pinyin: "bāo", tone: 1, meaning: "túi" }, b: { hanzi: "饱", pinyin: "bǎo", tone: 3, meaning: "no" } },
  { a: { hanzi: "猫", pinyin: "māo", tone: 1, meaning: "mèo" }, b: { hanzi: "毛", pinyin: "máo", tone: 2, meaning: "lông" } },
  { a: { hanzi: "天", pinyin: "tiān", tone: 1, meaning: "trời" }, b: { hanzi: "甜", pinyin: "tián", tone: 2, meaning: "ngọt" } },
  { a: { hanzi: "高", pinyin: "gāo", tone: 1, meaning: "cao" }, b: { hanzi: "搞", pinyin: "gǎo", tone: 3, meaning: "làm" } },
  { a: { hanzi: "书", pinyin: "shū", tone: 1, meaning: "sách" }, b: { hanzi: "树", pinyin: "shù", tone: 4, meaning: "cây" } },
  { a: { hanzi: "他", pinyin: "tā", tone: 1, meaning: "anh ấy" }, b: { hanzi: "踏", pinyin: "tà", tone: 4, meaning: "đạp" } },
  { a: { hanzi: "白", pinyin: "bái", tone: 2, meaning: "trắng" }, b: { hanzi: "百", pinyin: "bǎi", tone: 3, meaning: "trăm" } },
];

// =============== SANDHI - biến điệu ===============
export const SANDHI_BANK: SandhiItem[] = [
  { hanzi: "你好", pinyinWritten: "nǐ hǎo", pinyinSpoken: "ní hǎo", rule: "3-3", ruleNote: "Thanh 3 + thanh 3 → thanh 2 + thanh 3", meaning: "xin chào" },
  { hanzi: "很好", pinyinWritten: "hěn hǎo", pinyinSpoken: "hén hǎo", rule: "3-3", ruleNote: "Thanh 3 + thanh 3 → thanh 2 + thanh 3", meaning: "rất tốt" },
  { hanzi: "可以", pinyinWritten: "kě yǐ", pinyinSpoken: "ké yǐ", rule: "3-3", ruleNote: "Thanh 3 + thanh 3 → thanh 2 + thanh 3", meaning: "có thể" },
  { hanzi: "雨水", pinyinWritten: "yǔ shuǐ", pinyinSpoken: "yú shuǐ", rule: "3-3", ruleNote: "Thanh 3 + thanh 3 → thanh 2 + thanh 3", meaning: "nước mưa" },
  { hanzi: "永远", pinyinWritten: "yǒng yuǎn", pinyinSpoken: "yóng yuǎn", rule: "3-3", ruleNote: "Thanh 3 + thanh 3 → thanh 2 + thanh 3", meaning: "mãi mãi" },
  { hanzi: "不是", pinyinWritten: "bù shì", pinyinSpoken: "bú shì", rule: "bu", ruleNote: "不 trước thanh 4 → đọc thành thanh 2 (bú)", meaning: "không phải" },
  { hanzi: "不去", pinyinWritten: "bù qù", pinyinSpoken: "bú qù", rule: "bu", ruleNote: "不 trước thanh 4 → đọc thành thanh 2 (bú)", meaning: "không đi" },
  { hanzi: "不要", pinyinWritten: "bù yào", pinyinSpoken: "bú yào", rule: "bu", ruleNote: "不 trước thanh 4 → đọc thành thanh 2 (bú)", meaning: "không cần/đừng" },
  { hanzi: "不好", pinyinWritten: "bù hǎo", pinyinSpoken: "bù hǎo", rule: "bu", ruleNote: "不 trước thanh 1/2/3 → giữ nguyên thanh 4 (bù)", meaning: "không tốt" },
  { hanzi: "一个", pinyinWritten: "yī gè", pinyinSpoken: "yí gè", rule: "yi", ruleNote: "一 trước thanh 4 → đọc thành thanh 2 (yí)", meaning: "một cái" },
  { hanzi: "一定", pinyinWritten: "yī dìng", pinyinSpoken: "yí dìng", rule: "yi", ruleNote: "一 trước thanh 4 → đọc thành thanh 2 (yí)", meaning: "nhất định" },
  { hanzi: "一起", pinyinWritten: "yī qǐ", pinyinSpoken: "yì qǐ", rule: "yi", ruleNote: "一 trước thanh 1/2/3 → đọc thành thanh 4 (yì)", meaning: "cùng nhau" },
  { hanzi: "一天", pinyinWritten: "yī tiān", pinyinSpoken: "yì tiān", rule: "yi", ruleNote: "一 trước thanh 1/2/3 → đọc thành thanh 4 (yì)", meaning: "một ngày" },
  { hanzi: "一年", pinyinWritten: "yī nián", pinyinSpoken: "yì nián", rule: "yi", ruleNote: "一 trước thanh 1/2/3 → đọc thành thanh 4 (yì)", meaning: "một năm" },
  { hanzi: "一百", pinyinWritten: "yī bǎi", pinyinSpoken: "yì bǎi", rule: "yi", ruleNote: "一 trước thanh 1/2/3 → đọc thành thanh 4 (yì)", meaning: "một trăm" },
];
