/**
 * @file chineseToneMarks.ts
 * @description Bài tập đặt dấu thanh đúng vị trí (a > o > e > i, u, ü; iu -> u; ui -> i).
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface ToneMarkItem {
  /** Âm tiết không dấu */
  plain: string;
  /** Thanh cần đặt: 1-4 */
  tone: 1 | 2 | 3 | 4;
  /** 4 lựa chọn, chỉ một đáp án đúng */
  options: string[];
  answer: number;
  hanzi?: string;
  meaningVi: string;
  meaningEn: string;
  explainVi: string;
  explainEn: string;
}

export const TONE_MARK_ITEMS: ToneMarkItem[] = [
  {
    plain: "liu", tone: 4, options: ["lìu", "liù", "lıù", "líu"], answer: 1, hanzi: "六",
    meaningVi: "sáu (6)", meaningEn: "six",
    explainVi: "Vận mẫu iu là dạng viết gọn của iou, dấu luôn đặt trên u: liù.",
    explainEn: "iu is the shortened form of iou, so the mark always goes on the u: liù.",
  },
  {
    plain: "hui", tone: 4, options: ["hùi", "huì", "húi", "huǐ"], answer: 1, hanzi: "会",
    meaningVi: "biết, sẽ", meaningEn: "can, will",
    explainVi: "ui là dạng gọn của uei, dấu đặt trên i: huì.",
    explainEn: "ui is short for uei, so the mark goes on the i: huì.",
  },
  {
    plain: "hao", tone: 3, options: ["hǎo", "haǒ", "hāo", "hào"], answer: 0, hanzi: "好",
    meaningVi: "tốt, khoẻ", meaningEn: "good, well",
    explainVi: "Có a thì a luôn được ưu tiên nhận dấu: hǎo.",
    explainEn: "When a is present, a always takes the mark: hǎo.",
  },
  {
    plain: "guo", tone: 2, options: ["gúo", "guó", "guō", "guǒ"], answer: 1, hanzi: "国",
    meaningVi: "nước, quốc gia", meaningEn: "country",
    explainVi: "Không có a thì o nhận dấu: guó.",
    explainEn: "With no a, the o takes the mark: guó.",
  },
  {
    plain: "xue", tone: 2, options: ["xué", "xuè", "xuē", "xǔe"], answer: 0, hanzi: "学",
    meaningVi: "học", meaningEn: "to study",
    explainVi: "Không có a, o thì e nhận dấu: xué.",
    explainEn: "With no a or o, the e takes the mark: xué.",
  },
  {
    plain: "jia", tone: 1, options: ["jīa", "jiā", "jià", "jiǎ"], answer: 1, hanzi: "家",
    meaningVi: "nhà, gia đình", meaningEn: "home, family",
    explainVi: "a được ưu tiên, không đặt lên i: jiā.",
    explainEn: "a has priority, never the i: jiā.",
  },
  {
    plain: "shui", tone: 3, options: ["shǔi", "shuǐ", "shuī", "shùi"], answer: 1, hanzi: "水",
    meaningVi: "nước", meaningEn: "water",
    explainVi: "ui đặt dấu trên i: shuǐ (khác shuì 睡 là ngủ).",
    explainEn: "ui takes the mark on the i: shuǐ (compare shuì 睡, to sleep).",
  },
  {
    plain: "jiu", tone: 3, options: ["jǐu", "jiǔ", "jiū", "jiù"], answer: 1, hanzi: "九",
    meaningVi: "chín (9)", meaningEn: "nine",
    explainVi: "iu đặt dấu trên u: jiǔ.",
    explainEn: "iu takes the mark on the u: jiǔ.",
  },
  {
    plain: "lü", tone: 4, options: ["lǜ", "lṻ", "lù", "lǚ"], answer: 0, hanzi: "绿",
    meaningVi: "màu xanh lá", meaningEn: "green",
    explainVi: "Giữ nguyên hai dấu trên ü rồi thêm dấu thanh: lǜ. Đừng viết thành lù (đường).",
    explainEn: "Keep the umlaut on ü and add the tone mark: lǜ. Do not write lù (road).",
  },
  {
    plain: "nü", tone: 3, options: ["nǚ", "nǔ", "nǚ", "nù"], answer: 0, hanzi: "女",
    meaningVi: "nữ, con gái", meaningEn: "female",
    explainVi: "nǚ khác nǔ 努 (nỗ lực) - phải giữ ü.",
    explainEn: "nǚ differs from nǔ 努 (to strive) - keep the ü.",
  },
  {
    plain: "ju", tone: 1, options: ["jū", "jǖ", "jù", "jǔ"], answer: 0, hanzi: "居",
    meaningVi: "ở, cư trú", meaningEn: "to reside",
    explainVi: "Sau j q x y, ü viết thành u nên chỉ cần jū.",
    explainEn: "After j q x y, ü is written u, so it is simply jū.",
  },
  {
    plain: "zai", tone: 4, options: ["zaì", "zài", "zāi", "zǎi"], answer: 1, hanzi: "在",
    meaningVi: "ở, đang", meaningEn: "at, to be doing",
    explainVi: "a nhận dấu: zài.",
    explainEn: "The a takes the mark: zài.",
  },
  {
    plain: "gou", tone: 3, options: ["goǔ", "gǒu", "gōu", "gòu"], answer: 1, hanzi: "狗",
    meaningVi: "con chó", meaningEn: "dog",
    explainVi: "Trong ou thì o nhận dấu: gǒu.",
    explainEn: "In ou the o takes the mark: gǒu.",
  },
  {
    plain: "wen", tone: 4, options: ["wèn", "wén", "wěn", "wēn"], answer: 0, hanzi: "问",
    meaningVi: "hỏi", meaningEn: "to ask",
    explainVi: "e nhận dấu; wèn 问 (hỏi) khác wén 文 (văn).",
    explainEn: "The e takes the mark; wèn 问 (ask) differs from wén 文 (text).",
  },
  {
    plain: "kun", tone: 4, options: ["kùn", "kún", "kūn", "kǔn"], answer: 0, hanzi: "困",
    meaningVi: "buồn ngủ, khốn", meaningEn: "sleepy, stuck",
    explainVi: "un là dạng gọn của uen, dấu nằm trên u: kùn.",
    explainEn: "un is short for uen, and the mark sits on the u: kùn.",
  },
  {
    plain: "xiang", tone: 3, options: ["xiǎng", "xiāng", "xiàng", "xǐang"], answer: 0, hanzi: "想",
    meaningVi: "nghĩ, muốn", meaningEn: "to think, to want",
    explainVi: "a được ưu tiên trong iang: xiǎng.",
    explainEn: "a has priority in iang: xiǎng.",
  },
  {
    plain: "xie", tone: 4, options: ["xiè", "xìe", "xié", "xiē"], answer: 0, hanzi: "谢",
    meaningVi: "cảm ơn", meaningEn: "to thank",
    explainVi: "Trong ie thì e nhận dấu: xiè.",
    explainEn: "In ie the e takes the mark: xiè.",
  },
  {
    plain: "duo", tone: 1, options: ["duō", "dūo", "duò", "duǒ"], answer: 0, hanzi: "多",
    meaningVi: "nhiều", meaningEn: "many",
    explainVi: "Trong uo thì o nhận dấu: duō.",
    explainEn: "In uo the o takes the mark: duō.",
  },
  {
    plain: "er", tone: 4, options: ["èr", "ér", "ěr", "ēr"], answer: 0, hanzi: "二",
    meaningVi: "hai (2)", meaningEn: "two",
    explainVi: "e nhận dấu: èr. So sánh ér 儿 (con).",
    explainEn: "The e takes the mark: èr. Compare ér 儿 (son).",
  },
  {
    plain: "yue", tone: 4, options: ["yuè", "yùe", "yué", "yuē"], answer: 0, hanzi: "月",
    meaningVi: "tháng, mặt trăng", meaningEn: "month, moon",
    explainVi: "üe viết là ue sau y, dấu trên e: yuè.",
    explainEn: "üe is written ue after y, and the mark sits on the e: yuè.",
  },
  {
    plain: "niu", tone: 2, options: ["niú", "nǐu", "niū", "niù"], answer: 0, hanzi: "牛",
    meaningVi: "con bò", meaningEn: "cow, ox",
    explainVi: "iu đặt dấu trên u: niú.",
    explainEn: "iu takes the mark on the u: niú.",
  },
  {
    plain: "gui", tone: 4, options: ["guì", "gùi", "guī", "guǐ"], answer: 0, hanzi: "贵",
    meaningVi: "đắt", meaningEn: "expensive",
    explainVi: "ui đặt dấu trên i: guì.",
    explainEn: "ui takes the mark on the i: guì.",
  },
];
