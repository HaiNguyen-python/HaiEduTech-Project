/**
 * @file chineseStrokes.ts
 * @description Data for the Chinese stroke order guide: 8 basic strokes,
 * 7 stroke-order rules, practice character sets and a quiz bank.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface BasicStroke {
  /** Stroke glyph, e.g. 一 */
  glyph: string;
  nameZh: string;
  pinyin: string;
  nameVi: string;
  nameEn: string;
  howVi: string;
  howEn: string;
  /** Example characters that clearly contain this stroke */
  examples: string[];
}

export interface StrokeRule {
  id: string;
  titleVi: string;
  titleEn: string;
  ruleZh: string;
  explainVi: string;
  explainEn: string;
  examples: { char: string; pinyin: string; meaningVi: string; meaningEn: string }[];
}

export interface PracticeChar {
  char: string;
  pinyin: string;
  meaningVi: string;
  meaningEn: string;
  strokes: number;
}

export interface PracticeSet {
  id: string;
  titleVi: string;
  titleEn: string;
  emoji: string;
  chars: PracticeChar[];
}

export interface StrokeQuiz {
  id: string;
  questionVi: string;
  questionEn: string;
  options: string[];
  optionsEn?: string[];
  answer: number;
  explainVi: string;
  explainEn: string;
}

export const basicStrokes: BasicStroke[] = [
  {
    glyph: "一",
    nameZh: "横",
    pinyin: "héng",
    nameVi: "Nét ngang",
    nameEn: "Horizontal",
    howVi: "Kéo thẳng từ trái sang phải, giữ đều tay, hơi nhấn ở cuối nét.",
    howEn: "Draw straight from left to right, steady pressure, slight press at the end.",
    examples: ["一", "二", "三", "工"],
  },
  {
    glyph: "丨",
    nameZh: "竖",
    pinyin: "shù",
    nameVi: "Nét sổ",
    nameEn: "Vertical",
    howVi: "Kéo thẳng từ trên xuống dưới, không nghiêng.",
    howEn: "Draw straight down from top to bottom, no slant.",
    examples: ["十", "中", "干", "上"],
  },
  {
    glyph: "丿",
    nameZh: "撇",
    pinyin: "piě",
    nameVi: "Nét phẩy",
    nameEn: "Left-falling",
    howVi: "Từ trên bên phải hất xuống trái, nhỏ dần về cuối nét.",
    howEn: "From upper right sweeping down to the left, thinning at the end.",
    examples: ["人", "八", "千", "白"],
  },
  {
    glyph: "㇏",
    nameZh: "捺",
    pinyin: "nà",
    nameVi: "Nét mác",
    nameEn: "Right-falling",
    howVi: "Từ trên bên trái kéo xuống phải, nhấn dần rồi tỏa ra ở cuối.",
    howEn: "From upper left down to the right, pressing harder and flaring at the end.",
    examples: ["人", "大", "木", "天"],
  },
  {
    glyph: "丶",
    nameZh: "点",
    pinyin: "diǎn",
    nameVi: "Nét chấm",
    nameEn: "Dot",
    howVi: "Chấm ngắn, đặt bút nhẹ rồi nhấn nhanh theo hướng xuống phải.",
    howEn: "A short dot: touch lightly then press quickly down to the right.",
    examples: ["六", "文", "为", "主"],
  },
  {
    glyph: "㇀",
    nameZh: "提",
    pinyin: "tí",
    nameVi: "Nét hất",
    nameEn: "Rising",
    howVi: "Từ dưới bên trái hất chéo lên phải, kết thúc nhọn.",
    howEn: "From lower left flick up to the right, ending in a point.",
    examples: ["打", "冰", "地", "红"],
  },
  {
    glyph: "𠃍",
    nameZh: "折",
    pinyin: "zhé",
    nameVi: "Nét gập",
    nameEn: "Turning",
    howVi: "Một nét liền có góc gập, thường là ngang rồi gập xuống sổ.",
    howEn: "One continuous stroke with a corner, usually horizontal then turning down.",
    examples: ["口", "日", "国", "四"],
  },
  {
    glyph: "亅",
    nameZh: "钩",
    pinyin: "gōu",
    nameVi: "Nét móc",
    nameEn: "Hook",
    howVi: "Cuối nét sổ hoặc nét ngang hất ngược lại tạo móc nhỏ.",
    howEn: "At the end of a vertical or horizontal stroke, flick back to form a small hook.",
    examples: ["小", "水", "打", "了"],
  },
];

export const strokeRules: StrokeRule[] = [
  {
    id: "top-first",
    titleVi: "Trên trước, dưới sau",
    titleEn: "Top before bottom",
    ruleZh: "从上到下",
    explainVi: "Viết các nét hoặc bộ phận nằm phía trên trước, rồi mới xuống phần dưới.",
    explainEn: "Write the strokes or parts at the top first, then move downward.",
    examples: [
      { char: "三", pinyin: "sān", meaningVi: "ba", meaningEn: "three" },
      { char: "呈", pinyin: "chéng", meaningVi: "trình bày", meaningEn: "to present" },
      { char: "言", pinyin: "yán", meaningVi: "lời nói", meaningEn: "speech" },
    ],
  },
  {
    id: "left-first",
    titleVi: "Trái trước, phải sau",
    titleEn: "Left before right",
    ruleZh: "从左到右",
    explainVi: "Với chữ có bộ bên trái và phần bên phải, luôn viết bộ bên trái trước.",
    explainEn: "For characters with a left radical and a right part, always write the left side first.",
    examples: [
      { char: "他", pinyin: "tā", meaningVi: "anh ấy", meaningEn: "he" },
      { char: "好", pinyin: "hǎo", meaningVi: "tốt", meaningEn: "good" },
      { char: "地", pinyin: "dì", meaningVi: "đất", meaningEn: "earth" },
    ],
  },
  {
    id: "heng-before-shu",
    titleVi: "Ngang trước, sổ sau",
    titleEn: "Horizontal before vertical",
    ruleZh: "先横后竖",
    explainVi: "Khi nét ngang và nét sổ cắt nhau, viết nét ngang trước.",
    explainEn: "When a horizontal and a vertical stroke cross, write the horizontal one first.",
    examples: [
      { char: "十", pinyin: "shí", meaningVi: "mười", meaningEn: "ten" },
      { char: "干", pinyin: "gàn", meaningVi: "làm", meaningEn: "to do" },
      { char: "王", pinyin: "wáng", meaningVi: "vua", meaningEn: "king" },
    ],
  },
  {
    id: "outside-first",
    titleVi: "Ngoài trước, trong sau",
    titleEn: "Outside before inside",
    ruleZh: "先外后内",
    explainVi: "Viết khung bao bên ngoài trước, rồi mới viết phần bên trong.",
    explainEn: "Write the enclosing frame first, then the inner part.",
    examples: [
      { char: "月", pinyin: "yuè", meaningVi: "mặt trăng", meaningEn: "moon" },
      { char: "同", pinyin: "tóng", meaningVi: "giống nhau", meaningEn: "same" },
      { char: "间", pinyin: "jiān", meaningVi: "khoảng, giữa", meaningEn: "between" },
    ],
  },
  {
    id: "close-last",
    titleVi: "Vào nhà rồi mới đóng cửa",
    titleEn: "Enter, then close the door",
    ruleZh: "先里头后封口",
    explainVi: "Với chữ có khung kín, viết ba cạnh khung, rồi phần bên trong, cuối cùng mới đóng nét đáy.",
    explainEn: "For fully enclosed characters, write three sides of the frame, then the inside, and close the bottom last.",
    examples: [
      { char: "国", pinyin: "guó", meaningVi: "quốc gia", meaningEn: "country" },
      { char: "回", pinyin: "huí", meaningVi: "quay về", meaningEn: "to return" },
      { char: "四", pinyin: "sì", meaningVi: "bốn", meaningEn: "four" },
    ],
  },
  {
    id: "middle-first",
    titleVi: "Giữa trước, hai bên sau",
    titleEn: "Middle before the two sides",
    ruleZh: "先中间后两边",
    explainVi: "Với chữ đối xứng, viết nét giữa trước, rồi nét trái, cuối cùng là nét phải.",
    explainEn: "For symmetrical characters, write the centre stroke first, then left, then right.",
    examples: [
      { char: "小", pinyin: "xiǎo", meaningVi: "nhỏ", meaningEn: "small" },
      { char: "水", pinyin: "shuǐ", meaningVi: "nước", meaningEn: "water" },
      { char: "永", pinyin: "yǒng", meaningVi: "mãi mãi", meaningEn: "forever" },
    ],
  },
  {
    id: "pie-before-na",
    titleVi: "Nét phẩy trước, nét mác sau",
    titleEn: "Left-falling before right-falling",
    ruleZh: "先撇后捺",
    explainVi: "Khi nét phẩy và nét mác giao nhau, luôn viết nét phẩy trước.",
    explainEn: "When a left-falling and a right-falling stroke meet, always write the left-falling one first.",
    examples: [
      { char: "人", pinyin: "rén", meaningVi: "người", meaningEn: "person" },
      { char: "大", pinyin: "dà", meaningVi: "to lớn", meaningEn: "big" },
      { char: "文", pinyin: "wén", meaningVi: "văn", meaningEn: "writing" },
    ],
  },
];

export const practiceSets: PracticeSet[] = [
  {
    id: "numbers",
    titleVi: "Số đếm",
    titleEn: "Numbers",
    emoji: "🔢",
    chars: [
      { char: "一", pinyin: "yī", meaningVi: "một", meaningEn: "one", strokes: 1 },
      { char: "二", pinyin: "èr", meaningVi: "hai", meaningEn: "two", strokes: 2 },
      { char: "三", pinyin: "sān", meaningVi: "ba", meaningEn: "three", strokes: 3 },
      { char: "四", pinyin: "sì", meaningVi: "bốn", meaningEn: "four", strokes: 5 },
      { char: "五", pinyin: "wǔ", meaningVi: "năm", meaningEn: "five", strokes: 4 },
      { char: "六", pinyin: "liù", meaningVi: "sáu", meaningEn: "six", strokes: 4 },
      { char: "七", pinyin: "qī", meaningVi: "bảy", meaningEn: "seven", strokes: 2 },
      { char: "八", pinyin: "bā", meaningVi: "tám", meaningEn: "eight", strokes: 2 },
      { char: "九", pinyin: "jiǔ", meaningVi: "chín", meaningEn: "nine", strokes: 2 },
      { char: "十", pinyin: "shí", meaningVi: "mười", meaningEn: "ten", strokes: 2 },
    ],
  },
  {
    id: "basic",
    titleVi: "Chữ cơ bản",
    titleEn: "Basic characters",
    emoji: "✏️",
    chars: [
      { char: "人", pinyin: "rén", meaningVi: "người", meaningEn: "person", strokes: 2 },
      { char: "大", pinyin: "dà", meaningVi: "to lớn", meaningEn: "big", strokes: 3 },
      { char: "小", pinyin: "xiǎo", meaningVi: "nhỏ", meaningEn: "small", strokes: 3 },
      { char: "上", pinyin: "shàng", meaningVi: "trên", meaningEn: "up", strokes: 3 },
      { char: "下", pinyin: "xià", meaningVi: "dưới", meaningEn: "down", strokes: 3 },
      { char: "中", pinyin: "zhōng", meaningVi: "giữa, Trung", meaningEn: "middle", strokes: 4 },
      { char: "日", pinyin: "rì", meaningVi: "mặt trời, ngày", meaningEn: "sun, day", strokes: 4 },
      { char: "月", pinyin: "yuè", meaningVi: "mặt trăng, tháng", meaningEn: "moon, month", strokes: 4 },
      { char: "水", pinyin: "shuǐ", meaningVi: "nước", meaningEn: "water", strokes: 4 },
      { char: "火", pinyin: "huǒ", meaningVi: "lửa", meaningEn: "fire", strokes: 4 },
      { char: "山", pinyin: "shān", meaningVi: "núi", meaningEn: "mountain", strokes: 3 },
      { char: "口", pinyin: "kǒu", meaningVi: "miệng", meaningEn: "mouth", strokes: 3 },
    ],
  },
  {
    id: "radicals",
    titleVi: "Bộ thủ thường gặp",
    titleEn: "Common radicals",
    emoji: "🀄",
    chars: [
      { char: "亻", pinyin: "rén", meaningVi: "bộ nhân đứng", meaningEn: "person radical", strokes: 2 },
      { char: "氵", pinyin: "shuǐ", meaningVi: "bộ ba chấm thủy", meaningEn: "water radical", strokes: 3 },
      { char: "扌", pinyin: "shǒu", meaningVi: "bộ tay", meaningEn: "hand radical", strokes: 3 },
      { char: "讠", pinyin: "yán", meaningVi: "bộ ngôn", meaningEn: "speech radical", strokes: 2 },
      { char: "女", pinyin: "nǚ", meaningVi: "bộ nữ", meaningEn: "woman radical", strokes: 3 },
      { char: "木", pinyin: "mù", meaningVi: "bộ mộc", meaningEn: "tree radical", strokes: 4 },
      { char: "心", pinyin: "xīn", meaningVi: "bộ tâm", meaningEn: "heart radical", strokes: 4 },
      { char: "土", pinyin: "tǔ", meaningVi: "bộ thổ", meaningEn: "earth radical", strokes: 3 },
      { char: "目", pinyin: "mù", meaningVi: "bộ mục", meaningEn: "eye radical", strokes: 5 },
      { char: "食", pinyin: "shí", meaningVi: "bộ thực", meaningEn: "food radical", strokes: 9 },
    ],
  },
  {
    id: "hsk1",
    titleVi: "Từ HSK 1",
    titleEn: "HSK 1 words",
    emoji: "📖",
    chars: [
      { char: "我", pinyin: "wǒ", meaningVi: "tôi", meaningEn: "I, me", strokes: 7 },
      { char: "你", pinyin: "nǐ", meaningVi: "bạn", meaningEn: "you", strokes: 7 },
      { char: "好", pinyin: "hǎo", meaningVi: "tốt", meaningEn: "good", strokes: 6 },
      { char: "谢", pinyin: "xiè", meaningVi: "cảm ơn", meaningEn: "to thank", strokes: 12 },
      { char: "家", pinyin: "jiā", meaningVi: "nhà", meaningEn: "home", strokes: 10 },
      { char: "学", pinyin: "xué", meaningVi: "học", meaningEn: "to study", strokes: 8 },
      { char: "书", pinyin: "shū", meaningVi: "sách", meaningEn: "book", strokes: 4 },
      { char: "爱", pinyin: "ài", meaningVi: "yêu", meaningEn: "to love", strokes: 10 },
      { char: "吃", pinyin: "chī", meaningVi: "ăn", meaningEn: "to eat", strokes: 6 },
      { char: "国", pinyin: "guó", meaningVi: "quốc gia", meaningEn: "country", strokes: 8 },
      { char: "朋", pinyin: "péng", meaningVi: "bạn bè", meaningEn: "friend", strokes: 8 },
      { char: "时", pinyin: "shí", meaningVi: "thời gian", meaningEn: "time", strokes: 7 },
    ],
  },
];

export const strokeQuizzes: StrokeQuiz[] = [
  {
    id: "q1",
    questionVi: "Chữ 十 viết nét nào trước?",
    questionEn: "Which stroke comes first in 十?",
    options: ["Nét ngang", "Nét sổ", "Nét phẩy", "Nét chấm"],
    optionsEn: ["Horizontal", "Vertical", "Left-falling", "Dot"],
    answer: 0,
    explainVi: "Quy tắc ngang trước sổ sau: viết nét ngang rồi mới tới nét sổ.",
    explainEn: "Horizontal before vertical: write the horizontal stroke first.",
  },
  {
    id: "q2",
    questionVi: "Với chữ 国, nét đáy của khung 口 viết khi nào?",
    questionEn: "In 国, when do you write the bottom line of the outer frame?",
    options: [
      "Viết đầu tiên",
      "Viết sau khi xong phần bên trong",
      "Viết ngay sau nét ngang trên",
      "Không cần viết",
    ],
    optionsEn: [
      "First of all",
      "After finishing the inside part",
      "Right after the top horizontal",
      "It is not written",
    ],
    answer: 1,
    explainVi: "Quy tắc vào nhà rồi đóng cửa: viết phần trong trước, nét đáy đóng khung là nét cuối cùng.",
    explainEn: "Enter then close the door: the inside comes first, the bottom line closes the frame last.",
  },
  {
    id: "q3",
    questionVi: "Chữ 小 viết theo thứ tự nào?",
    questionEn: "What is the stroke order of 小?",
    options: [
      "Giữa - trái - phải",
      "Trái - giữa - phải",
      "Phải - giữa - trái",
      "Trái - phải - giữa",
    ],
    optionsEn: ["Middle - left - right", "Left - middle - right", "Right - middle - left", "Left - right - middle"],
    answer: 0,
    explainVi: "Chữ đối xứng: nét móc ở giữa viết trước, rồi tới hai bên.",
    explainEn: "Symmetrical characters: the centre hook first, then the two sides.",
  },
  {
    id: "q4",
    questionVi: "Trong chữ 人, nét nào viết trước?",
    questionEn: "In 人, which stroke comes first?",
    options: ["Nét mác (捺)", "Nét phẩy (撇)", "Nét sổ", "Nét chấm"],
    optionsEn: ["Right-falling (捺)", "Left-falling (撇)", "Vertical", "Dot"],
    answer: 1,
    explainVi: "Quy tắc phẩy trước mác sau, nên nét 撇 viết trước.",
    explainEn: "Left-falling before right-falling, so 撇 comes first.",
  },
  {
    id: "q5",
    questionVi: "Chữ 好 gồm 女 và 子. Viết phần nào trước?",
    questionEn: "好 has 女 and 子. Which part comes first?",
    options: ["子", "女", "Viết cùng lúc", "Tùy người viết"],
    optionsEn: ["子", "女", "Both together", "Writer's choice"],
    answer: 1,
    explainVi: "Trái trước phải sau: bộ 女 bên trái viết trước.",
    explainEn: "Left before right: the 女 radical on the left is written first.",
  },
  {
    id: "q6",
    questionVi: "Chữ 三 có bao nhiêu nét?",
    questionEn: "How many strokes does 三 have?",
    options: ["2", "3", "4", "5"],
    answer: 1,
    explainVi: "Ba nét ngang, viết từ trên xuống dưới.",
    explainEn: "Three horizontal strokes, written from top to bottom.",
  },
  {
    id: "q7",
    questionVi: "Chữ 四 có bao nhiêu nét?",
    questionEn: "How many strokes does 四 have?",
    options: ["4", "5", "6", "7"],
    answer: 1,
    explainVi: "四 có 5 nét, dù nghĩa là số bốn - đừng nhầm số nét với nghĩa.",
    explainEn: "四 has 5 strokes even though it means four - do not confuse meaning with stroke count.",
  },
  {
    id: "q8",
    questionVi: "Nét 提 (tí) được viết theo hướng nào?",
    questionEn: "In which direction is the 提 (tí) stroke written?",
    options: [
      "Từ dưới trái hất lên phải",
      "Từ trên phải xuống trái",
      "Từ trái sang phải theo đường ngang",
      "Từ trên xuống dưới",
    ],
    optionsEn: [
      "From lower left up to the right",
      "From upper right down to the left",
      "Straight left to right",
      "Straight top to bottom",
    ],
    answer: 0,
    explainVi: "提 là nét hất chéo lên, thường thấy trong bộ 扌 và 氵.",
    explainEn: "提 rises to the upper right, common in the 扌 and 氵 radicals.",
  },
  {
    id: "q9",
    questionVi: "Chữ 月 nên viết nét nào trước?",
    questionEn: "Which stroke comes first in 月?",
    options: [
      "Hai nét ngang bên trong",
      "Nét phẩy ngoài bên trái",
      "Nét móc bên phải",
      "Nét đáy",
    ],
    optionsEn: ["The two inner horizontals", "The outer left-falling stroke", "The right hook", "The bottom line"],
    answer: 1,
    explainVi: "Ngoài trước trong sau: viết khung ngoài trước, hai nét ngang bên trong viết sau.",
    explainEn: "Outside before inside: draw the outer frame first, then the two inner horizontals.",
  },
  {
    id: "q10",
    questionVi: "Vì sao cần viết đúng thứ tự nét?",
    questionEn: "Why does correct stroke order matter?",
    options: [
      "Chỉ để cho đẹp",
      "Giúp chữ cân đối, viết nhanh hơn và tra từ điển theo nét chính xác",
      "Không quan trọng khi gõ máy",
      "Chỉ cần cho thi HSK 6",
    ],
    optionsEn: [
      "Only for beauty",
      "It keeps characters balanced, speeds up writing and makes stroke-based lookup accurate",
      "It does not matter when typing",
      "Only needed for HSK 6",
    ],
    answer: 1,
    explainVi: "Thứ tự nét đúng giúp chữ cân đối, viết nhanh, và là cơ sở để tra từ điển hoặc viết tay trên điện thoại.",
    explainEn: "Correct order keeps characters balanced, speeds up writing, and powers dictionary and handwriting input.",
  },
  {
    id: "q11",
    questionVi: "Bộ 氵 (ba chấm thủy) có mấy nét?",
    questionEn: "How many strokes does the 氵 radical have?",
    options: ["2", "3", "4", "5"],
    answer: 1,
    explainVi: "Hai nét chấm và một nét hất, tổng cộng 3 nét.",
    explainEn: "Two dots plus one rising stroke, three in total.",
  },
  {
    id: "q12",
    questionVi: "Chữ 王 viết nét sổ ở bước nào?",
    questionEn: "At which step is the vertical stroke of 王 written?",
    options: [
      "Nét đầu tiên",
      "Sau nét ngang thứ hai, trước nét ngang cuối",
      "Nét cuối cùng",
      "Sau nét ngang đầu tiên",
    ],
    optionsEn: [
      "The first stroke",
      "After the second horizontal, before the last horizontal",
      "The last stroke",
      "Right after the first horizontal",
    ],
    answer: 1,
    explainVi: "王 viết ngang - ngang - sổ - ngang: nét sổ là nét thứ ba.",
    explainEn: "王 goes horizontal - horizontal - vertical - horizontal, so the vertical is stroke three.",
  },
];
