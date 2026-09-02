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
  examples: { char: string; pinyin: string; meaningVi: string; meaningEn: string; strokes: number }[];
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

/** Combined (bent / hooked) strokes - written in a single motion. */
export const combinedStrokes: BasicStroke[] = [
  {
    glyph: "𠃍",
    nameZh: "横折",
    pinyin: "héngzhé",
    nameVi: "Ngang gập xuống",
    nameEn: "Horizontal then down",
    howVi: "Viết nét ngang, đến góc thì gập vuông xuống dưới, không nhấc bút.",
    howEn: "Write a horizontal stroke, then turn squarely downwards without lifting the pen.",
    examples: ["口", "日", "四", "田"],
  },
  {
    glyph: "𠄌",
    nameZh: "竖折",
    pinyin: "shùzhé",
    nameVi: "Sổ gập sang phải",
    nameEn: "Vertical then right",
    howVi: "Kéo nét sổ xuống, đến đáy thì gập ngang sang phải.",
    howEn: "Draw the vertical down, then turn right along the bottom.",
    examples: ["山", "医", "牙", "世"],
  },
  {
    glyph: "𠃌",
    nameZh: "横折钩",
    pinyin: "héngzhégōu",
    nameVi: "Ngang gập móc",
    nameEn: "Horizontal, turn, hook",
    howVi: "Ngang rồi gập xuống, kết thúc bằng móc nhỏ hất vào trong.",
    howEn: "Horizontal, turn down, then finish with a small hook flicking inwards.",
    examples: ["月", "同", "用", "问"],
  },
  {
    glyph: "乚",
    nameZh: "竖弯钩",
    pinyin: "shùwāngōu",
    nameVi: "Sổ cong móc",
    nameEn: "Vertical, curve, hook",
    howVi: "Sổ xuống rồi cong mềm sang phải, cuối nét hất lên tạo móc.",
    howEn: "Go down, curve smoothly to the right, then flick up into a hook.",
    examples: ["也", "电", "七", "儿"],
  },
  {
    glyph: "𠄎",
    nameZh: "撇折",
    pinyin: "piězhé",
    nameVi: "Phẩy gập hất",
    nameEn: "Left-falling then turn",
    howVi: "Phẩy chéo xuống trái rồi gập hất chéo lên phải.",
    howEn: "Sweep down-left, then turn and flick up to the right.",
    examples: ["会", "云", "去", "红"],
  },
  {
    glyph: "㇇",
    nameZh: "横撇",
    pinyin: "héngpiě",
    nameVi: "Ngang rồi phẩy",
    nameEn: "Horizontal then left-falling",
    howVi: "Ngang ngắn rồi gập, hất chéo xuống bên trái.",
    howEn: "A short horizontal, then turn and sweep down to the left.",
    examples: ["又", "友", "水", "对"],
  },
];

export interface StrokeMistake {
  titleVi: string;
  titleEn: string;
  wrongVi: string;
  wrongEn: string;
  rightVi: string;
  rightEn: string;
  chars: string[];
}

/** Frequent handwriting mistakes learners make. */
export const strokeMistakes: StrokeMistake[] = [
  {
    titleVi: "Viết nét ngang từ phải sang trái",
    titleEn: "Writing the horizontal right-to-left",
    wrongVi: "Kéo nét ngang từ phải về trái cho nhanh.",
    wrongEn: "Dragging the horizontal from right back to left to save time.",
    rightVi: "Nét ngang luôn đi từ trái sang phải, nét sổ luôn đi từ trên xuống.",
    rightEn: "A horizontal always goes left to right; a vertical always goes top to bottom.",
    chars: ["一", "十", "三"],
  },
  {
    titleVi: "Viết chữ 口 ngược chiều kim đồng hồ",
    titleEn: "Writing 口 counterclockwise",
    wrongVi: "Bắt đầu từ nét ngang trên hoặc vòng ngược sang trái.",
    wrongEn: "Starting from the top horizontal or looping to the left.",
    rightVi: "Thứ tự đúng: nét sổ bên trái, rồi nét 横折 (ngang gập xuống), cuối cùng nét ngang đáy.",
    rightEn: "Correct order: left vertical, then the 横折 (horizontal-turn-down), then the bottom horizontal.",
    chars: ["口", "日", "国"],
  },
  {
    titleVi: "Cắt nét ghép thành hai nét",
    titleEn: "Splitting a combined stroke in two",
    wrongVi: "Nhấc bút ở góc gập của 竖弯钩 hay 横折钩 nên thành 2 nét rời.",
    wrongEn: "Lifting the pen at the corner of 竖弯钩 or 横折钩, ending up with two separate strokes.",
    rightVi: "Nét ghép viết liền một hơi, số nét mới đúng khi đếm.",
    rightEn: "Write combined strokes in one motion, otherwise the stroke count is wrong.",
    chars: ["也", "月", "了"],
  },
  {
    titleVi: "Nhầm nét 撇 với nét 捺",
    titleEn: "Confusing 撇 with 捺",
    wrongVi: "Cả hai nét đều hất xuống cùng một hướng nên chữ bị lệch.",
    wrongEn: "Sweeping both strokes the same way, so the character leans.",
    rightVi: "撇 hất xuống bên trái và nhỏ dần; 捺 kéo xuống bên phải và nhấn dày ở cuối.",
    rightEn: "撇 sweeps down-left and thins out; 捺 goes down-right and presses thicker at the end.",
    chars: ["人", "大", "天"],
  },
  {
    titleVi: "Đếm sai số nét nên tra từ điển không ra",
    titleEn: "Miscounting strokes when looking words up",
    wrongVi: "Đếm mỗi đoạn gấp khúc là một nét riêng.",
    wrongEn: "Counting every bend as its own stroke.",
    rightVi: "Một nét là một lần đặt bút liên tục, dù có gấp khúc bao nhiêu lần.",
    rightEn: "One stroke is one continuous pen-down, no matter how many bends it has.",
    chars: ["马", "书", "为"],
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
      { char: "三", pinyin: "sān", meaningVi: "ba", meaningEn: "three", strokes: 3 },
      { char: "呈", pinyin: "chéng", meaningVi: "trình bày", meaningEn: "to present", strokes: 7 },
      { char: "言", pinyin: "yán", meaningVi: "lời nói", meaningEn: "speech", strokes: 7 },
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
      { char: "他", pinyin: "tā", meaningVi: "anh ấy", meaningEn: "he", strokes: 5 },
      { char: "好", pinyin: "hǎo", meaningVi: "tốt", meaningEn: "good", strokes: 6 },
      { char: "地", pinyin: "dì", meaningVi: "đất", meaningEn: "earth", strokes: 6 },
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
      { char: "十", pinyin: "shí", meaningVi: "mười", meaningEn: "ten", strokes: 2 },
      { char: "干", pinyin: "gàn", meaningVi: "làm", meaningEn: "to do", strokes: 3 },
      { char: "王", pinyin: "wáng", meaningVi: "vua", meaningEn: "king", strokes: 4 },
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
      { char: "月", pinyin: "yuè", meaningVi: "mặt trăng", meaningEn: "moon", strokes: 4 },
      { char: "同", pinyin: "tóng", meaningVi: "giống nhau", meaningEn: "same", strokes: 6 },
      { char: "间", pinyin: "jiān", meaningVi: "khoảng, giữa", meaningEn: "between", strokes: 7 },
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
      { char: "国", pinyin: "guó", meaningVi: "quốc gia", meaningEn: "country", strokes: 8 },
      { char: "回", pinyin: "huí", meaningVi: "quay về", meaningEn: "to return", strokes: 6 },
      { char: "四", pinyin: "sì", meaningVi: "bốn", meaningEn: "four", strokes: 5 },
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
      { char: "小", pinyin: "xiǎo", meaningVi: "nhỏ", meaningEn: "small", strokes: 3 },
      { char: "水", pinyin: "shuǐ", meaningVi: "nước", meaningEn: "water", strokes: 4 },
      { char: "永", pinyin: "yǒng", meaningVi: "mãi mãi", meaningEn: "forever", strokes: 5 },
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
      { char: "人", pinyin: "rén", meaningVi: "người", meaningEn: "person", strokes: 2 },
      { char: "大", pinyin: "dà", meaningVi: "to lớn", meaningEn: "big", strokes: 3 },
      { char: "文", pinyin: "wén", meaningVi: "văn", meaningEn: "writing", strokes: 4 },
    ],
  },
  {
    id: "through-vertical-last",
    titleVi: "Nét sổ xuyên giữa viết sau cùng",
    titleEn: "A vertical that runs through everything comes last",
    ruleZh: "贯穿的竖最后写",
    explainVi: "Nếu một nét sổ (hoặc nét ngang) xuyên qua cả chữ, hãy viết các phần còn lại trước rồi mới kéo nét xuyên đó.",
    explainEn: "If a vertical (or horizontal) runs through the whole character, write the other parts first, then the through-stroke.",
    examples: [
      { char: "中", pinyin: "zhōng", meaningVi: "giữa", meaningEn: "middle", strokes: 4 },
      { char: "事", pinyin: "shì", meaningVi: "việc", meaningEn: "matter", strokes: 8 },
      { char: "母", pinyin: "mǔ", meaningVi: "mẹ", meaningEn: "mother", strokes: 5 },
    ],
  },
  {
    id: "dot-position",
    titleVi: "Chấm trên viết trước, chấm phải dưới viết cuối",
    titleEn: "Top dot first, lower-right dot last",
    ruleZh: "点在上先写，点在右下最后写",
    explainVi: "Nét chấm ở phía trên đầu chữ viết trước tiên; còn nét chấm nằm ở góc dưới bên phải thì để lại viết sau cùng.",
    explainEn: "A dot sitting at the top is written first; a dot at the lower right is saved for last.",
    examples: [
      { char: "主", pinyin: "zhǔ", meaningVi: "chủ", meaningEn: "master", strokes: 5 },
      { char: "犬", pinyin: "quǎn", meaningVi: "con chó", meaningEn: "dog", strokes: 4 },
      { char: "问", pinyin: "wèn", meaningVi: "hỏi", meaningEn: "to ask", strokes: 6 },
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
  {
    id: "family",
    titleVi: "Gia đình & con người",
    titleEn: "Family & people",
    emoji: "👨‍👩‍👧",
    chars: [
      { char: "爸", pinyin: "bà", meaningVi: "bố", meaningEn: "dad", strokes: 8 },
      { char: "妈", pinyin: "mā", meaningVi: "mẹ", meaningEn: "mum", strokes: 6 },
      { char: "哥", pinyin: "gē", meaningVi: "anh trai", meaningEn: "elder brother", strokes: 10 },
      { char: "姐", pinyin: "jiě", meaningVi: "chị gái", meaningEn: "elder sister", strokes: 8 },
      { char: "弟", pinyin: "dì", meaningVi: "em trai", meaningEn: "younger brother", strokes: 7 },
      { char: "妹", pinyin: "mèi", meaningVi: "em gái", meaningEn: "younger sister", strokes: 8 },
      { char: "儿", pinyin: "ér", meaningVi: "con", meaningEn: "child, son", strokes: 2 },
      { char: "女", pinyin: "nǚ", meaningVi: "nữ", meaningEn: "female", strokes: 3 },
      { char: "男", pinyin: "nán", meaningVi: "nam", meaningEn: "male", strokes: 7 },
      { char: "友", pinyin: "yǒu", meaningVi: "bạn", meaningEn: "friend", strokes: 4 },
      { char: "老", pinyin: "lǎo", meaningVi: "già", meaningEn: "old", strokes: 6 },
      { char: "师", pinyin: "shī", meaningVi: "thầy", meaningEn: "teacher", strokes: 6 },
    ],
  },
  {
    id: "hsk2",
    titleVi: "Từ HSK 2",
    titleEn: "HSK 2 characters",
    emoji: "🎓",
    chars: [
      { char: "帮", pinyin: "bāng", meaningVi: "giúp", meaningEn: "to help", strokes: 9 },
      { char: "忙", pinyin: "máng", meaningVi: "bận", meaningEn: "busy", strokes: 6 },
      { char: "开", pinyin: "kāi", meaningVi: "mở", meaningEn: "to open", strokes: 4 },
      { char: "旁", pinyin: "páng", meaningVi: "bên cạnh", meaningEn: "beside", strokes: 10 },
      { char: "题", pinyin: "tí", meaningVi: "câu hỏi", meaningEn: "question", strokes: 15 },
      { char: "唱", pinyin: "chàng", meaningVi: "hát", meaningEn: "to sing", strokes: 11 },
      { char: "跳", pinyin: "tiào", meaningVi: "nhảy", meaningEn: "to jump", strokes: 13 },
      { char: "路", pinyin: "lù", meaningVi: "đường", meaningEn: "road", strokes: 13 },
      { char: "票", pinyin: "piào", meaningVi: "vé", meaningEn: "ticket", strokes: 11 },
      { char: "雪", pinyin: "xuě", meaningVi: "tuyết", meaningEn: "snow", strokes: 11 },
      { char: "药", pinyin: "yào", meaningVi: "thuốc", meaningEn: "medicine", strokes: 9 },
      { char: "错", pinyin: "cuò", meaningVi: "sai", meaningEn: "wrong", strokes: 13 },
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
  {
    id: "q13",
    questionVi: "Nét 竖弯钩 trong chữ 也 được viết như thế nào?",
    questionEn: "How is the 竖弯钩 stroke in 也 written?",
    options: [
      "Hai nét rời: một nét sổ và một nét móc",
      "Một nét liền: sổ xuống, cong sang phải rồi hất lên",
      "Một nét ngang rồi một nét chấm",
      "Ba nét nhỏ nối nhau",
    ],
    optionsEn: [
      "Two separate strokes: a vertical then a hook",
      "One continuous stroke: down, curving right, then flicking up",
      "A horizontal followed by a dot",
      "Three small strokes joined together",
    ],
    answer: 1,
    explainVi: "Nét ghép luôn viết liền một hơi, không nhấc bút ở góc cong.",
    explainEn: "Combined strokes are written in one motion - never lift the pen at the curve.",
  },
  {
    id: "q14",
    questionVi: "Chữ 中 viết nét sổ giữa ở bước nào?",
    questionEn: "When is the central vertical of 中 written?",
    options: [
      "Nét đầu tiên",
      "Nét thứ hai",
      "Nét cuối cùng",
      "Trước nét 横折",
    ],
    optionsEn: ["First stroke", "Second stroke", "Last stroke", "Before the 横折"],
    answer: 2,
    explainVi: "Nét sổ xuyên qua cả chữ nên viết sau cùng: 丨- 𠃍 - 一 - 丨.",
    explainEn: "The vertical runs through the whole character, so it comes last.",
  },
  {
    id: "q15",
    questionVi: "Chữ 口 có thứ tự nét nào đúng?",
    questionEn: "Which is the correct stroke order for 口?",
    options: [
      "Ngang trên - sổ trái - ngang đáy",
      "Sổ trái - ngang gập xuống - ngang đáy",
      "Ngang gập xuống - sổ trái - ngang đáy",
      "Sổ trái - sổ phải - ngang trên - ngang đáy",
    ],
    optionsEn: [
      "Top horizontal - left vertical - bottom horizontal",
      "Left vertical - horizontal-turn-down - bottom horizontal",
      "Horizontal-turn-down - left vertical - bottom horizontal",
      "Left vertical - right vertical - top horizontal - bottom horizontal",
    ],
    answer: 1,
    explainVi: "口 chỉ có 3 nét: 丨, 𠃍 (横折), rồi 一 đóng khung.",
    explainEn: "口 has only 3 strokes: the left vertical, the 横折, then the closing horizontal.",
  },
  {
    id: "q16",
    questionVi: "Nét chấm ở góc dưới bên phải (như trong chữ 犬) viết khi nào?",
    questionEn: "When do you write a dot at the lower right, as in 犬?",
    options: ["Đầu tiên", "Sau nét ngang", "Cuối cùng", "Cùng lúc với nét mác"],
    optionsEn: ["First", "After the horizontal", "Last", "At the same time as the 捺"],
    answer: 2,
    explainVi: "Chấm ở góc dưới bên phải luôn để lại viết sau cùng.",
    explainEn: "A dot at the lower right is always saved for last.",
  },
  {
    id: "q17",
    questionVi: "Chữ 月 dùng nét ghép nào?",
    questionEn: "Which combined stroke does 月 use?",
    options: ["竖折", "横折钩", "撇折", "横撇"],
    answer: 1,
    explainVi: "月 gồm nét 撇 rồi nét 横折钩, sau đó hai nét ngang bên trong.",
    explainEn: "月 starts with a 撇, then the 横折钩, then the two inner horizontals.",
  },
  {
    id: "q18",
    questionVi: "Chữ 山 có mấy nét?",
    questionEn: "How many strokes does 山 have?",
    options: ["2", "3", "4", "5"],
    answer: 1,
    explainVi: "山 có 3 nét: sổ giữa, 竖折 (sổ gập sang phải), rồi nét sổ bên phải.",
    explainEn: "山 has 3 strokes: the middle vertical, the 竖折, then the right vertical.",
  },
  {
    id: "q19",
    questionVi: "Nếu nhấc bút giữa nét ghép thì điều gì xảy ra?",
    questionEn: "What happens if you lift the pen in the middle of a combined stroke?",
    options: [
      "Không ảnh hưởng gì",
      "Số nét bị đếm sai và chữ mất cân đối",
      "Chữ đẹp hơn",
      "Chỉ ảnh hưởng khi viết bằng bút mực",
    ],
    optionsEn: [
      "Nothing changes",
      "The stroke count becomes wrong and the character loses balance",
      "The character looks nicer",
      "It only matters with an ink pen",
    ],
    answer: 1,
    explainVi: "Đếm sai số nét sẽ tra từ điển và viết tay trên điện thoại không ra chữ.",
    explainEn: "A wrong stroke count breaks dictionary lookup and handwriting input.",
  },
  {
    id: "q20",
    questionVi: "Nét 横撇 (㇇) trong chữ 又 đi theo hướng nào?",
    questionEn: "Which direction does the 横撇 (㇇) in 又 follow?",
    options: [
      "Ngang sang phải rồi hất chéo xuống trái",
      "Sổ xuống rồi cong sang phải",
      "Chéo lên phải rồi gập xuống",
      "Chấm rồi kéo ngang",
    ],
    optionsEn: [
      "Horizontal to the right, then sweeping down-left",
      "Down, then curving to the right",
      "Up to the right, then turning down",
      "A dot, then a horizontal",
    ],
    answer: 0,
    explainVi: "㇇ là nét ngang ngắn rồi gập, hất chéo xuống bên trái.",
    explainEn: "㇇ is a short horizontal that turns and sweeps down to the left.",
  },
];
