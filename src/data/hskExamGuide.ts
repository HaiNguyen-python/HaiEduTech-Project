/**
 * @file hskExamGuide.ts
 * @description Comprehensive HSK 1-6 exam structure, strategic tips, and frequent vocabulary.
 * @author Teacher Hai (HaiEduTech)
 */

export interface ExamSection {
  name: string;
  nameVi: string;
  parts: { part: string; questions: number; format: string; formatVi: string }[];
  totalQuestions: number;
  duration: string; // e.g. "15 min"
}

export interface ProTip {
  title: string;
  titleVi: string;
  body: string;
  bodyVi: string;
}

export interface FrequentWord {
  hanzi: string;
  pinyin: string;
  meaning: string;
  meaningVi: string;
  category: "listening" | "reading" | "writing" | "general";
}

export interface HskTimedReadingDrill {
  title: string;
  titleVi: string;
  passage: string; // Hanzi
  pinyin?: string; // optional, levels 1-3
  translation: string;
  question: string;
  questionVi: string;
  options: string[];
  answerIndex: number;
  targetSeconds: number;
}

export interface HskkPrompt {
  level: "HSKK Initial" | "HSKK Intermediate" | "HSKK Advanced";
  prompt: string;
  promptVi: string;
  hanzi?: string;
  pinyin?: string;
  durationSeconds: number;
}

export interface HskLevelGuide {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  badge: string; // emoji icon (Chinese architectural / scholar)
  title: string;
  titleVi: string;
  vocabSize: number;
  totalQuestions: number;
  totalDuration: string;
  passingScore: string;
  sections: ExamSection[];
  writingFocus?: { description: string; descriptionVi: string };
  generalTips: ProTip[];
  levelTips: ProTip[];
  frequentWords: FrequentWord[];
  timedDrill: HskTimedReadingDrill;
  hskkPrompts?: HskkPrompt[]; // only for HSK 4-6
  vocabLink: string;
}

/* ============================================================
 * HSK 3.0 UPDATES (shared note for the hub)
 * ============================================================ */
export const HSK_3_UPDATES = {
  title: "Updates on the new HSK 3.0 standard",
  titleVi: "Cập nhật theo chuẩn HSK 3.0",
  bullets: [
    {
      en: "HSK 3.0 expands to 9 levels (3 bands × 3 levels) instead of 6 - the classic 6-level system is still widely accepted internationally through 2025.",
      vi: "HSK 3.0 mở rộng thành 9 cấp độ (3 bậc × 3 cấp), thay cho hệ 6 cấp. Hệ HSK 6 cấp truyền thống vẫn được công nhận quốc tế đến 2025.",
    },
    {
      en: "Vocabulary expectation roughly doubles per band: HSK 1 (500 words) ≈ old HSK 2-3.",
      vi: "Yêu cầu từ vựng tăng gấp đôi mỗi bậc: HSK 1 mới (500 từ) tương đương HSK 2-3 cũ.",
    },
    {
      en: "New skill: handwriting, translation and oral expression are integrated at higher bands.",
      vi: "Kỹ năng mới: viết tay, dịch và biểu đạt nói được tích hợp ở các bậc cao hơn.",
    },
    {
      en: "HSKK (Speaking test) is now strongly recommended alongside HSK 3-6 for academic & visa purposes.",
      vi: "Bài thi HSKK (Nói) được khuyến nghị mạnh đi kèm HSK 3-6 cho mục đích học thuật & visa.",
    },
  ],
};

/* ============================================================
 * GENERAL TIPS (apply to all levels)
 * ============================================================ */
const GENERAL_TIPS: ProTip[] = [
  {
    title: "Time Management",
    titleVi: "Quản lý thời gian",
    body: "Allocate ~45 seconds per Listening question and ~50 seconds per Reading question. Never spend more than 90 seconds on a single item - mark and move on.",
    bodyVi: "Dành ~45 giây mỗi câu Nghe và ~50 giây mỗi câu Đọc. Không bao giờ dành quá 90 giây cho một câu - đánh dấu và bỏ qua.",
  },
  {
    title: "Keyword Scanning",
    titleVi: "Quét từ khóa",
    body: "Read the question stem BEFORE the passage. Underline numbers, names, places, and time markers (今天, 明天, 在). They unlock 70% of answers.",
    bodyVi: "Đọc câu hỏi TRƯỚC khi đọc đoạn văn. Gạch chân số, tên, địa điểm và mốc thời gian (今天, 明天, 在). Đây là chìa khóa cho 70% đáp án.",
  },
  {
    title: "Unfamiliar Hanzi",
    titleVi: "Chữ Hán lạ",
    body: "If a character is unknown, look at the radical (部首) for meaning hint, then guess from context. Never leave blanks - eliminate 1-2 wrong options and pick.",
    bodyVi: "Nếu gặp chữ lạ, nhìn bộ thủ (部首) để đoán nghĩa, sau đó dựa vào ngữ cảnh. Đừng bao giờ để trống - loại 1-2 đáp án sai rồi chọn.",
  },
];

/* ============================================================
 * HSK 1
 * ============================================================ */
const HSK1: HskLevelGuide = {
  level: 1,
  badge: "🏮",
  title: "HSK 1 - Beginner Foundation",
  titleVi: "HSK 1 - Nền tảng sơ cấp",
  vocabSize: 150,
  totalQuestions: 40,
  totalDuration: "40 minutes (incl. instructions)",
  passingScore: "120/200 (60%)",
  sections: [
    {
      name: "Listening (听力)",
      nameVi: "Nghe (Tingli)",
      duration: "~15 min",
      totalQuestions: 20,
      parts: [
        { part: "Part 1", questions: 5, format: "Match audio sentence to picture (✓/✗)", formatVi: "Nghe câu, đối chiếu với hình ảnh (Đúng/Sai)" },
        { part: "Part 2", questions: 5, format: "Listen and choose the matching picture from 3 options", formatVi: "Nghe rồi chọn hình phù hợp trong 3 lựa chọn" },
        { part: "Part 3", questions: 5, format: "Short dialogues - match to picture", formatVi: "Hội thoại ngắn - chọn hình tương ứng" },
        { part: "Part 4", questions: 5, format: "Question + 3 written options (one heard)", formatVi: "Câu hỏi + 3 đáp án viết, chọn 1 đáp án nghe được" },
      ],
    },
    {
      name: "Reading (阅读)",
      nameVi: "Đọc (Yuedu)",
      duration: "17 min",
      totalQuestions: 20,
      parts: [
        { part: "Part 1", questions: 5, format: "Match Hanzi word to picture", formatVi: "Đối chiếu từ Hán tự với hình ảnh" },
        { part: "Part 2", questions: 5, format: "Match sentence to picture", formatVi: "Đối chiếu câu với hình ảnh" },
        { part: "Part 3", questions: 5, format: "Match question to response", formatVi: "Nối câu hỏi với câu trả lời" },
        { part: "Part 4", questions: 5, format: "Fill the blank - choose 1 of 6 words", formatVi: "Điền vào chỗ trống - chọn 1 trong 6 từ" },
      ],
    },
  ],
  generalTips: GENERAL_TIPS,
  levelTips: [
    {
      title: "Master Pinyin tones first",
      titleVi: "Làm chủ thanh điệu Pinyin trước",
      body: "All 40 questions assume you can distinguish 4 tones. Drill mā/má/mǎ/mà daily for 5 min until it's automatic.",
      bodyVi: "Tất cả 40 câu đều giả định bạn phân biệt được 4 thanh. Luyện mā/má/mǎ/mà mỗi ngày 5 phút đến khi phản xạ.",
    },
    {
      title: "Image association",
      titleVi: "Liên tưởng hình ảnh",
      body: "Listening Parts 2-3 are 100% picture-matching. Build a flashcard set with Hanzi + image (no translation) - your brain will react in 0.3s.",
      bodyVi: "Phần Nghe 2-3 hoàn toàn là chọn hình. Tạo flashcard với Hán tự + hình (không dịch) - não phản xạ trong 0.3 giây.",
    },
  ],
  frequentWords: [
    { hanzi: "你好", pinyin: "nǐ hǎo", meaning: "hello", meaningVi: "xin chào", category: "general" },
    { hanzi: "谢谢", pinyin: "xiè xie", meaning: "thank you", meaningVi: "cảm ơn", category: "listening" },
    { hanzi: "再见", pinyin: "zài jiàn", meaning: "goodbye", meaningVi: "tạm biệt", category: "listening" },
    { hanzi: "学生", pinyin: "xué shēng", meaning: "student", meaningVi: "học sinh", category: "reading" },
    { hanzi: "老师", pinyin: "lǎo shī", meaning: "teacher", meaningVi: "giáo viên", category: "reading" },
    { hanzi: "苹果", pinyin: "píng guǒ", meaning: "apple", meaningVi: "quả táo", category: "listening" },
    { hanzi: "中国", pinyin: "zhōng guó", meaning: "China", meaningVi: "Trung Quốc", category: "general" },
    { hanzi: "今天", pinyin: "jīn tiān", meaning: "today", meaningVi: "hôm nay", category: "general" },
    { hanzi: "电话", pinyin: "diàn huà", meaning: "telephone", meaningVi: "điện thoại", category: "reading" },
    { hanzi: "喜欢", pinyin: "xǐ huān", meaning: "to like", meaningVi: "thích", category: "general" },
  ],
  timedDrill: {
    title: "Quick Match",
    titleVi: "Ghép nhanh",
    passage: "我有一只猫。它叫小白。",
    pinyin: "wǒ yǒu yī zhī māo. tā jiào xiǎo bái.",
    translation: "I have a cat. Its name is Xiao Bai.",
    question: "What pet does the speaker have?",
    questionVi: "Người nói nuôi thú cưng gì?",
    options: ["Dog (狗)", "Cat (猫)", "Bird (鸟)", "Fish (鱼)"],
    answerIndex: 1,
    targetSeconds: 15,
  },
  vocabLink: "/chinese/hsk/vocabulary?level=HSK%201",
};

/* ============================================================
 * HSK 2
 * ============================================================ */
const HSK2: HskLevelGuide = {
  level: 2,
  badge: "🏯",
  title: "HSK 2 - Elementary Communication",
  titleVi: "HSK 2 - Giao tiếp cơ bản",
  vocabSize: 300,
  totalQuestions: 60,
  totalDuration: "55 minutes",
  passingScore: "120/200 (60%)",
  sections: [
    {
      name: "Listening (听力)",
      nameVi: "Nghe",
      duration: "~25 min",
      totalQuestions: 35,
      parts: [
        { part: "Part 1", questions: 10, format: "True/False with picture", formatVi: "Đúng/Sai với hình ảnh" },
        { part: "Part 2", questions: 10, format: "Match dialogue to one of 6 pictures", formatVi: "Nối hội thoại với 1 trong 6 hình" },
        { part: "Part 3", questions: 10, format: "Short dialogue + question, choose A/B/C", formatVi: "Hội thoại ngắn + câu hỏi, chọn A/B/C" },
        { part: "Part 4", questions: 5, format: "Longer dialogue + question", formatVi: "Hội thoại dài + câu hỏi" },
      ],
    },
    {
      name: "Reading (阅读)",
      nameVi: "Đọc",
      duration: "22 min",
      totalQuestions: 25,
      parts: [
        { part: "Part 1", questions: 5, format: "Match sentence to picture (6 pictures)", formatVi: "Nối câu với hình (6 hình)" },
        { part: "Part 2", questions: 5, format: "Fill in the blank from word bank", formatVi: "Điền từ từ ngân hàng từ" },
        { part: "Part 3", questions: 5, format: "True/False - short statements", formatVi: "Đúng/Sai cho câu ngắn" },
        { part: "Part 4", questions: 10, format: "Match question to response", formatVi: "Nối câu hỏi với câu trả lời" },
      ],
    },
  ],
  generalTips: GENERAL_TIPS,
  levelTips: [
    {
      title: "Family & daily routine vocab",
      titleVi: "Từ vựng gia đình & sinh hoạt",
      body: "70% of HSK 2 dialogues revolve around 家人, 工作, 学校, 时间. Memorize 10 family + 15 time words deeply.",
      bodyVi: "70% hội thoại HSK 2 xoay quanh gia đình, công việc, trường học, thời gian. Học sâu 10 từ gia đình + 15 từ thời gian.",
    },
    {
      title: "Listen for 不 (bù) and 没 (méi)",
      titleVi: "Lắng nghe 不 (bù) và 没 (méi)",
      body: "These two negatives flip the answer in True/False questions. Train your ear to catch them before nouns/verbs.",
      bodyVi: "Hai từ phủ định này đảo đáp án trong câu Đúng/Sai. Luyện tai bắt chúng trước danh/động từ.",
    },
  ],
  frequentWords: [
    { hanzi: "因为", pinyin: "yīn wèi", meaning: "because", meaningVi: "bởi vì", category: "reading" },
    { hanzi: "所以", pinyin: "suǒ yǐ", meaning: "so/therefore", meaningVi: "vì vậy", category: "reading" },
    { hanzi: "但是", pinyin: "dàn shì", meaning: "but", meaningVi: "nhưng", category: "reading" },
    { hanzi: "已经", pinyin: "yǐ jīng", meaning: "already", meaningVi: "đã", category: "listening" },
    { hanzi: "正在", pinyin: "zhèng zài", meaning: "in the middle of", meaningVi: "đang", category: "listening" },
    { hanzi: "希望", pinyin: "xī wàng", meaning: "to hope", meaningVi: "hy vọng", category: "general" },
    { hanzi: "公司", pinyin: "gōng sī", meaning: "company", meaningVi: "công ty", category: "general" },
    { hanzi: "可能", pinyin: "kě néng", meaning: "possibly", meaningVi: "có thể", category: "reading" },
    { hanzi: "考试", pinyin: "kǎo shì", meaning: "exam", meaningVi: "kỳ thi", category: "general" },
    { hanzi: "旅游", pinyin: "lǚ yóu", meaning: "travel", meaningVi: "du lịch", category: "listening" },
  ],
  timedDrill: {
    title: "Sentence Match",
    titleVi: "Ghép câu",
    passage: "他每天早上七点跑步，已经跑了两年了。",
    pinyin: "tā měi tiān zǎo shàng qī diǎn pǎo bù, yǐ jīng pǎo le liǎng nián le.",
    translation: "He runs every morning at 7, and has been doing so for 2 years.",
    question: "How long has he been running?",
    questionVi: "Anh ấy chạy bộ được bao lâu?",
    options: ["2 months", "2 years", "7 years", "Every weekend"],
    answerIndex: 1,
    targetSeconds: 25,
  },
  vocabLink: "/chinese/hsk/vocabulary?level=HSK%202",
};

/* ============================================================
 * HSK 3
 * ============================================================ */
const HSK3: HskLevelGuide = {
  level: 3,
  badge: "⛩️",
  title: "HSK 3 - Intermediate Bridge",
  titleVi: "HSK 3 - Cầu nối trung cấp",
  vocabSize: 600,
  totalQuestions: 80,
  totalDuration: "90 minutes",
  passingScore: "180/300 (60%)",
  sections: [
    {
      name: "Listening (听力)",
      nameVi: "Nghe",
      duration: "~35 min",
      totalQuestions: 40,
      parts: [
        { part: "Part 1", questions: 10, format: "Match dialogue to 1 of 10 pictures", formatVi: "Nối hội thoại với 1 trong 10 hình" },
        { part: "Part 2", questions: 10, format: "True/False statement matches what was said", formatVi: "Đúng/Sai theo nội dung nghe" },
        { part: "Part 3", questions: 10, format: "Short dialogue + A/B/C choice", formatVi: "Hội thoại ngắn + chọn A/B/C" },
        { part: "Part 4", questions: 10, format: "Longer dialogue (4-5 lines) + A/B/C", formatVi: "Hội thoại dài (4-5 lượt) + A/B/C" },
      ],
    },
    {
      name: "Reading (阅读)",
      nameVi: "Đọc",
      duration: "30 min",
      totalQuestions: 30,
      parts: [
        { part: "Part 1", questions: 10, format: "Match question/statement to response (20 sentences)", formatVi: "Ghép câu hỏi với câu trả lời (20 câu)" },
        { part: "Part 2", questions: 10, format: "Cloze - fill blank from word bank", formatVi: "Điền chỗ trống từ ngân hàng từ" },
        { part: "Part 3", questions: 10, format: "Short passage + multiple choice question", formatVi: "Đoạn ngắn + câu hỏi trắc nghiệm" },
      ],
    },
    {
      name: "Writing (书写)",
      nameVi: "Viết",
      duration: "15 min",
      totalQuestions: 10,
      parts: [
        { part: "Part 1", questions: 5, format: "Re-arrange given words into a correct sentence", formatVi: "Sắp xếp các từ cho sẵn thành câu đúng" },
        { part: "Part 2", questions: 5, format: "Write the correct Hanzi from Pinyin into a blank", formatVi: "Viết chữ Hán đúng từ Pinyin vào chỗ trống" },
      ],
    },
  ],
  writingFocus: {
    description: "HSK 3 introduces handwriting Hanzi from Pinyin and sentence re-ordering. Practice stroke order daily - partial-credit handwriting can save your overall score.",
    descriptionVi: "HSK 3 bắt đầu yêu cầu viết tay Hán tự từ Pinyin và sắp xếp câu. Luyện thứ tự nét mỗi ngày - chữ viết đủ tốt có thể cứu điểm tổng.",
  },
  generalTips: GENERAL_TIPS,
  levelTips: [
    {
      title: "Synonym hunting",
      titleVi: "Săn từ đồng nghĩa",
      body: "HSK 3 Reading Part 1 tests synonyms like 喜欢/爱, 高兴/开心. Build a 30-pair list and review weekly.",
      bodyVi: "Phần Đọc 1 HSK 3 kiểm tra đồng nghĩa như 喜欢/爱, 高兴/开心. Lập danh sách 30 cặp và ôn hàng tuần.",
    },
    {
      title: "Sentence re-ordering shortcut",
      titleVi: "Mẹo sắp xếp câu",
      body: "For Writing Part 1: find the SUBJECT first → then TIME → then VERB → then OBJECT. The frame 'Who + When + Verb + What' solves 90%.",
      bodyVi: "Phần Viết 1: tìm CHỦ NGỮ trước → sau đó THỜI GIAN → ĐỘNG TỪ → TÂN NGỮ. Khung 'Ai + Khi nào + Làm gì + Gì' giải quyết 90%.",
    },
  ],
  frequentWords: [
    { hanzi: "认为", pinyin: "rèn wéi", meaning: "to think/believe", meaningVi: "cho rằng", category: "reading" },
    { hanzi: "决定", pinyin: "jué dìng", meaning: "to decide", meaningVi: "quyết định", category: "general" },
    { hanzi: "解决", pinyin: "jiě jué", meaning: "to solve", meaningVi: "giải quyết", category: "general" },
    { hanzi: "环境", pinyin: "huán jìng", meaning: "environment", meaningVi: "môi trường", category: "reading" },
    { hanzi: "习惯", pinyin: "xí guàn", meaning: "habit", meaningVi: "thói quen", category: "general" },
    { hanzi: "应该", pinyin: "yīng gāi", meaning: "should", meaningVi: "nên", category: "general" },
    { hanzi: "其实", pinyin: "qí shí", meaning: "actually", meaningVi: "thật ra", category: "reading" },
    { hanzi: "互相", pinyin: "hù xiāng", meaning: "mutually", meaningVi: "lẫn nhau", category: "reading" },
    { hanzi: "突然", pinyin: "tū rán", meaning: "suddenly", meaningVi: "đột nhiên", category: "listening" },
    { hanzi: "终于", pinyin: "zhōng yú", meaning: "finally", meaningVi: "cuối cùng", category: "listening" },
  ],
  timedDrill: {
    title: "Find the connector",
    titleVi: "Tìm liên từ",
    passage: "虽然今天下雨，但是我们还是去爬山了。",
    pinyin: "suī rán jīn tiān xià yǔ, dàn shì wǒ men hái shì qù pá shān le.",
    translation: "Although it rained today, we still went hiking.",
    question: "What is the relationship between the two clauses?",
    questionVi: "Mối quan hệ giữa hai vế là gì?",
    options: ["Cause-effect", "Concession (although...still)", "Time sequence", "Condition"],
    answerIndex: 1,
    targetSeconds: 30,
  },
  vocabLink: "/chinese/hsk/vocabulary?level=HSK%203",
};

/* ============================================================
 * HSK 4
 * ============================================================ */
const HSK4: HskLevelGuide = {
  level: 4,
  badge: "🎓",
  title: "HSK 4 - Upper Intermediate",
  titleVi: "HSK 4 - Trung cấp cao",
  vocabSize: 1200,
  totalQuestions: 100,
  totalDuration: "105 minutes",
  passingScore: "180/300 (60%)",
  sections: [
    {
      name: "Listening (听力)",
      nameVi: "Nghe",
      duration: "~30 min",
      totalQuestions: 45,
      parts: [
        { part: "Part 1", questions: 10, format: "True/False to a recorded statement", formatVi: "Đúng/Sai với câu nói thu âm" },
        { part: "Part 2", questions: 15, format: "Short dialogue + A/B/C/D", formatVi: "Hội thoại ngắn + A/B/C/D" },
        { part: "Part 3", questions: 20, format: "Long dialogue / monologue + question", formatVi: "Hội thoại / độc thoại dài + câu hỏi" },
      ],
    },
    {
      name: "Reading (阅读)",
      nameVi: "Đọc",
      duration: "40 min",
      totalQuestions: 40,
      parts: [
        { part: "Part 1", questions: 10, format: "Cloze - fill word into sentence (4 options)", formatVi: "Điền từ vào câu (4 lựa chọn)" },
        { part: "Part 2", questions: 10, format: "Re-order 3 sentences into coherent paragraph", formatVi: "Sắp xếp 3 câu thành đoạn văn mạch lạc" },
        { part: "Part 3", questions: 20, format: "Short passage + 1-2 comprehension questions", formatVi: "Đoạn ngắn + 1-2 câu hỏi đọc hiểu" },
      ],
    },
    {
      name: "Writing (书写)",
      nameVi: "Viết",
      duration: "25 min",
      totalQuestions: 15,
      parts: [
        { part: "Part 1", questions: 10, format: "Arrange given words into a correct sentence", formatVi: "Sắp xếp từ thành câu đúng" },
        { part: "Part 2", questions: 5, format: "Write a sentence using a given word + picture", formatVi: "Viết một câu sử dụng từ cho sẵn + hình" },
      ],
    },
  ],
  writingFocus: {
    description: "HSK 4 Writing Part 2 evaluates word usage in context. Always write a Subject-Verb-Object sentence with the given word as the verb or noun, and add ONE descriptor (time/place/adjective).",
    descriptionVi: "Phần Viết 2 HSK 4 chấm cách dùng từ trong ngữ cảnh. Luôn viết câu Chủ-Động-Tân sử dụng từ cho sẵn làm động từ hoặc danh từ, thêm MỘT bổ ngữ (thời gian/địa điểm/tính từ).",
  },
  generalTips: GENERAL_TIPS,
  levelTips: [
    {
      title: "Sentence reordering = find the topic noun",
      titleVi: "Sắp xếp câu = tìm danh từ chủ đề",
      body: "Reading Part 2: locate the sentence introducing the main NOUN/SUBJECT - that's sentence #1. The other two follow logical/time order.",
      bodyVi: "Đọc Phần 2: tìm câu giới thiệu DANH TỪ/CHỦ NGỮ chính - đó là câu #1. Hai câu còn lại theo trình tự logic/thời gian.",
    },
    {
      title: "Listening: 70% paraphrase",
      titleVi: "Nghe: 70% diễn đạt lại",
      body: "The correct A/B/C/D rarely uses the exact words you hear. Learn synonym pairs: 便宜→不贵, 重要→关键.",
      bodyVi: "Đáp án đúng A/B/C/D hiếm khi dùng nguyên văn từ bạn nghe. Học cặp đồng nghĩa: 便宜→不贵, 重要→关键.",
    },
  ],
  frequentWords: [
    { hanzi: "积极", pinyin: "jī jí", meaning: "positive/active", meaningVi: "tích cực", category: "reading" },
    { hanzi: "消极", pinyin: "xiāo jí", meaning: "negative/passive", meaningVi: "tiêu cực", category: "reading" },
    { hanzi: "丰富", pinyin: "fēng fù", meaning: "rich/abundant", meaningVi: "phong phú", category: "writing" },
    { hanzi: "总结", pinyin: "zǒng jié", meaning: "to summarize", meaningVi: "tổng kết", category: "general" },
    { hanzi: "效果", pinyin: "xiào guǒ", meaning: "effect", meaningVi: "hiệu quả", category: "general" },
    { hanzi: "建议", pinyin: "jiàn yì", meaning: "suggestion", meaningVi: "đề xuất", category: "listening" },
    { hanzi: "支持", pinyin: "zhī chí", meaning: "to support", meaningVi: "ủng hộ", category: "general" },
    { hanzi: "印象", pinyin: "yìn xiàng", meaning: "impression", meaningVi: "ấn tượng", category: "reading" },
    { hanzi: "区别", pinyin: "qū bié", meaning: "difference", meaningVi: "sự khác biệt", category: "reading" },
    { hanzi: "适应", pinyin: "shì yìng", meaning: "to adapt", meaningVi: "thích nghi", category: "general" },
  ],
  timedDrill: {
    title: "Paraphrase challenge",
    titleVi: "Thử thách diễn đạt lại",
    passage: "调查显示，年轻人更喜欢通过手机购物，而不是去商场。",
    translation: "Surveys show that young people prefer mobile shopping over going to malls.",
    question: "Which statement best paraphrases the passage?",
    questionVi: "Câu nào diễn đạt lại tốt nhất?",
    options: [
      "Young people dislike mobile phones",
      "Young people favor online shopping over physical malls",
      "Malls are more popular with young people",
      "Surveys are unreliable",
    ],
    answerIndex: 1,
    targetSeconds: 35,
  },
  hskkPrompts: [
    {
      level: "HSKK Intermediate",
      prompt: "Describe your favorite hobby and explain why you like it.",
      promptVi: "Mô tả sở thích của bạn và giải thích tại sao bạn thích.",
      hanzi: "请说说你最喜欢的爱好，并解释为什么。",
      pinyin: "qǐng shuō shuo nǐ zuì xǐ huān de ài hào, bìng jiě shì wèi shén me.",
      durationSeconds: 120,
    },
    {
      level: "HSKK Intermediate",
      prompt: "Talk about a memorable trip you have taken.",
      promptVi: "Nói về một chuyến du lịch đáng nhớ.",
      hanzi: "请谈谈你印象深刻的一次旅行。",
      pinyin: "qǐng tán tan nǐ yìn xiàng shēn kè de yī cì lǚ xíng.",
      durationSeconds: 120,
    },
  ],
  vocabLink: "/chinese/hsk/vocabulary?level=HSK%204",
};

/* ============================================================
 * HSK 5
 * ============================================================ */
const HSK5: HskLevelGuide = {
  level: 5,
  badge: "🏛️",
  title: "HSK 5 - Advanced Mastery",
  titleVi: "HSK 5 - Thành thạo cao cấp",
  vocabSize: 2500,
  totalQuestions: 100,
  totalDuration: "125 minutes",
  passingScore: "180/300 (60%)",
  sections: [
    {
      name: "Listening (听力)",
      nameVi: "Nghe",
      duration: "~30 min",
      totalQuestions: 45,
      parts: [
        { part: "Part 1", questions: 20, format: "Short dialogue + A/B/C/D", formatVi: "Hội thoại ngắn + A/B/C/D" },
        { part: "Part 2", questions: 25, format: "Long dialogue / monologue (~150 chars) + A/B/C/D", formatVi: "Hội thoại / độc thoại dài (~150 chữ) + A/B/C/D" },
      ],
    },
    {
      name: "Reading (阅读)",
      nameVi: "Đọc",
      duration: "45 min",
      totalQuestions: 45,
      parts: [
        { part: "Part 1", questions: 15, format: "Cloze with 3-4 blanks per passage", formatVi: "Điền chỗ trống 3-4 ô mỗi đoạn" },
        { part: "Part 2", questions: 10, format: "Short passage + 1 question (find best summary)", formatVi: "Đoạn ngắn + 1 câu hỏi (tìm tóm tắt phù hợp)" },
        { part: "Part 3", questions: 20, format: "Long passages + 4 questions each", formatVi: "Đoạn dài + 4 câu hỏi mỗi đoạn" },
      ],
    },
    {
      name: "Writing (书写)",
      nameVi: "Viết",
      duration: "40 min",
      totalQuestions: 10,
      parts: [
        { part: "Part 1", questions: 8, format: "Re-order words into a sentence", formatVi: "Sắp xếp từ thành câu" },
        { part: "Part 2", questions: 2, format: "Write 80-character essay (1 from picture, 1 from 5 keywords)", formatVi: "Viết bài 80 chữ (1 từ tranh, 1 từ 5 từ khóa)" },
      ],
    },
  ],
  writingFocus: {
    description: "HSK 5 Writing Part 2 = an 80-character mini-essay. Use a 4-sentence template: (1) topic intro, (2) example, (3) opinion, (4) conclusion. Include 3 of 5 given keywords meaningfully.",
    descriptionVi: "Phần Viết 2 HSK 5 = bài luận 80 chữ. Dùng khung 4 câu: (1) giới thiệu chủ đề, (2) ví dụ, (3) ý kiến, (4) kết luận. Sử dụng 3/5 từ khóa cho sẵn một cách có ý nghĩa.",
  },
  generalTips: GENERAL_TIPS,
  levelTips: [
    {
      title: "Logical connectors are gold",
      titleVi: "Liên từ logic là vàng",
      body: "Memorize 不但…而且, 既然…那么, 无论…都, 即使…也. They appear in 80% of HSK 5 cloze tests and reading questions.",
      bodyVi: "Học thuộc 不但…而且, 既然…那么, 无论…都, 即使…也. Chúng xuất hiện trong 80% bài cloze và đọc HSK 5.",
    },
    {
      title: "Summarization = first + last sentence",
      titleVi: "Tóm tắt = câu đầu + câu cuối",
      body: "For Reading Part 2 (best summary): the first sentence usually states the topic, the last sentence usually states the author's stance. Combine them.",
      bodyVi: "Đọc Phần 2 (tóm tắt tốt nhất): câu đầu thường nêu chủ đề, câu cuối thường nêu quan điểm tác giả. Kết hợp chúng.",
    },
  ],
  frequentWords: [
    { hanzi: "无论", pinyin: "wú lùn", meaning: "regardless of", meaningVi: "bất kể", category: "reading" },
    { hanzi: "毕竟", pinyin: "bì jìng", meaning: "after all", meaningVi: "rốt cuộc", category: "reading" },
    { hanzi: "促进", pinyin: "cù jìn", meaning: "to promote", meaningVi: "thúc đẩy", category: "writing" },
    { hanzi: "现象", pinyin: "xiàn xiàng", meaning: "phenomenon", meaningVi: "hiện tượng", category: "writing" },
    { hanzi: "趋势", pinyin: "qū shì", meaning: "trend", meaningVi: "xu hướng", category: "reading" },
    { hanzi: "传统", pinyin: "chuán tǒng", meaning: "tradition", meaningVi: "truyền thống", category: "writing" },
    { hanzi: "策略", pinyin: "cè lüè", meaning: "strategy", meaningVi: "chiến lược", category: "general" },
    { hanzi: "概念", pinyin: "gài niàn", meaning: "concept", meaningVi: "khái niệm", category: "reading" },
    { hanzi: "实际", pinyin: "shí jì", meaning: "actual/practical", meaningVi: "thực tế", category: "general" },
    { hanzi: "意识", pinyin: "yì shí", meaning: "consciousness/awareness", meaningVi: "nhận thức", category: "reading" },
  ],
  timedDrill: {
    title: "Identify logical connector",
    titleVi: "Xác định liên từ logic",
    passage: "无论困难多大，他都不会放弃自己的梦想。",
    translation: "No matter how big the difficulty, he won't give up his dream.",
    question: "What does 无论…都 express?",
    questionVi: "无论…都 biểu đạt điều gì?",
    options: ["Cause and effect", "Universal condition (regardless)", "Concession", "Time"],
    answerIndex: 1,
    targetSeconds: 25,
  },
  hskkPrompts: [
    {
      level: "HSKK Advanced",
      prompt: "Discuss the impact of social media on modern relationships.",
      promptVi: "Thảo luận về tác động của mạng xã hội tới các mối quan hệ hiện đại.",
      hanzi: "请谈谈社交媒体对现代人际关系的影响。",
      pinyin: "qǐng tán tan shè jiāo méi tǐ duì xiàn dài rén jì guān xì de yǐng xiǎng.",
      durationSeconds: 150,
    },
    {
      level: "HSKK Advanced",
      prompt: "Compare studying abroad with studying at home.",
      promptVi: "So sánh việc du học với học trong nước.",
      hanzi: "请比较出国留学和在国内学习的优缺点。",
      pinyin: "qǐng bǐ jiào chū guó liú xué hé zài guó nèi xué xí de yōu quē diǎn.",
      durationSeconds: 150,
    },
  ],
  vocabLink: "/chinese/hsk/vocabulary?level=HSK%205",
};

/* ============================================================
 * HSK 6
 * ============================================================ */
const HSK6: HskLevelGuide = {
  level: 6,
  badge: "🐉",
  title: "HSK 6 - Native-Like Proficiency",
  titleVi: "HSK 6 - Trình độ gần bản xứ",
  vocabSize: 5000,
  totalQuestions: 101,
  totalDuration: "140 minutes",
  passingScore: "180/300 (60%)",
  sections: [
    {
      name: "Listening (听力)",
      nameVi: "Nghe",
      duration: "~35 min",
      totalQuestions: 50,
      parts: [
        { part: "Part 1", questions: 15, format: "News-style summary, choose matching A/B/C/D", formatVi: "Tóm tắt kiểu tin tức, chọn A/B/C/D" },
        { part: "Part 2", questions: 15, format: "Interview (~3 min) + 5 questions", formatVi: "Phỏng vấn (~3 phút) + 5 câu hỏi" },
        { part: "Part 3", questions: 20, format: "Long monologue / lecture + 3-4 questions", formatVi: "Độc thoại / bài giảng dài + 3-4 câu hỏi" },
      ],
    },
    {
      name: "Reading (阅读)",
      nameVi: "Đọc",
      duration: "50 min",
      totalQuestions: 50,
      parts: [
        { part: "Part 1", questions: 10, format: "Find the sentence with a grammar error", formatVi: "Tìm câu có lỗi ngữ pháp" },
        { part: "Part 2", questions: 10, format: "Cloze (3 blanks per sentence)", formatVi: "Điền chỗ trống (3 ô / câu)" },
        { part: "Part 3", questions: 10, format: "Insert sentence into correct paragraph spot", formatVi: "Chèn câu vào vị trí đúng trong đoạn" },
        { part: "Part 4", questions: 20, format: "Long passages + 4 questions each", formatVi: "Đoạn dài + 4 câu hỏi mỗi đoạn" },
      ],
    },
    {
      name: "Writing (书写)",
      nameVi: "Viết",
      duration: "55 min",
      totalQuestions: 1,
      parts: [
        { part: "Part 1", questions: 1, format: "Read 1000-char article in 10 min, then summarize in 400 chars", formatVi: "Đọc bài 1000 chữ trong 10 phút, sau đó tóm tắt thành 400 chữ" },
      ],
    },
  ],
  writingFocus: {
    description: "HSK 6 Writing = a 400-character summary of a 1000-character article. Memorize the structure, NOT the words. Practice condensing 5 paragraphs into 4 (intro → 2 main points → conclusion).",
    descriptionVi: "Phần Viết HSK 6 = tóm tắt 400 chữ từ bài 1000 chữ. Học cấu trúc, KHÔNG học thuộc câu chữ. Luyện rút gọn 5 đoạn thành 4 (mở bài → 2 ý chính → kết).",
  },
  generalTips: GENERAL_TIPS,
  levelTips: [
    {
      title: "Grammar error patterns",
      titleVi: "Mẫu lỗi ngữ pháp thường gặp",
      body: "Reading Part 1 errors are usually: (1) word order, (2) redundant 了/着, (3) missing 把/被, (4) misuse of 的/地/得. Drill these 4 categories specifically.",
      bodyVi: "Lỗi Đọc Phần 1 thường là: (1) trật tự từ, (2) thừa 了/着, (3) thiếu 把/被, (4) sai 的/地/得. Luyện chuyên sâu 4 nhóm này.",
    },
    {
      title: "Note-taking template for the 1000-char essay",
      titleVi: "Khung ghi chú cho bài 1000 chữ",
      body: "While reading, jot only: TITLE, 5 KEY NOUNS, MAIN ACTION VERB per paragraph. After 10 min, you have a skeleton - flesh out into 400 chars.",
      bodyVi: "Khi đọc, chỉ ghi: TIÊU ĐỀ, 5 DANH TỪ CHỦ ĐẠO, ĐỘNG TỪ CHÍNH mỗi đoạn. Sau 10 phút bạn có khung - phát triển thành 400 chữ.",
    },
  ],
  frequentWords: [
    { hanzi: "弘扬", pinyin: "hóng yáng", meaning: "to promote/carry forward", meaningVi: "phát huy", category: "writing" },
    { hanzi: "倡导", pinyin: "chàng dǎo", meaning: "to advocate", meaningVi: "đề xướng", category: "writing" },
    { hanzi: "凸显", pinyin: "tū xiǎn", meaning: "to highlight", meaningVi: "làm nổi bật", category: "reading" },
    { hanzi: "蕴含", pinyin: "yùn hán", meaning: "to contain (deep meaning)", meaningVi: "hàm chứa", category: "reading" },
    { hanzi: "悄然", pinyin: "qiǎo rán", meaning: "quietly", meaningVi: "lặng lẽ", category: "reading" },
    { hanzi: "蔚为", pinyin: "wèi wéi", meaning: "to develop into", meaningVi: "trở thành", category: "writing" },
    { hanzi: "迄今", pinyin: "qì jīn", meaning: "up to now", meaningVi: "cho đến nay", category: "general" },
    { hanzi: "斟酌", pinyin: "zhēn zhuó", meaning: "to deliberate", meaningVi: "cân nhắc kỹ", category: "writing" },
    { hanzi: "昭示", pinyin: "zhāo shì", meaning: "to demonstrate", meaningVi: "chứng tỏ", category: "reading" },
    { hanzi: "迥异", pinyin: "jiǒng yì", meaning: "vastly different", meaningVi: "hoàn toàn khác", category: "reading" },
  ],
  timedDrill: {
    title: "Spot the error",
    titleVi: "Tìm lỗi sai",
    passage: "通过这次活动，使我们提高了很大的能力。",
    translation: "(Erroneous) Through this activity, made us greatly improve our ability.",
    question: "Which type of error does this sentence contain?",
    questionVi: "Câu này mắc loại lỗi nào?",
    options: [
      "Tense error",
      "Missing subject (通过 + 使 cancel each other)",
      "Wrong measure word",
      "Tone error",
    ],
    answerIndex: 1,
    targetSeconds: 40,
  },
  hskkPrompts: [
    {
      level: "HSKK Advanced",
      prompt: "Express your view on the rapid development of AI and its societal implications.",
      promptVi: "Trình bày quan điểm về sự phát triển nhanh của AI và hệ quả xã hội.",
      hanzi: "请就人工智能的快速发展及其社会影响表达你的看法。",
      pinyin: "qǐng jiù rén gōng zhì néng de kuài sù fā zhǎn jí qí shè huì yǐng xiǎng biǎo dá nǐ de kàn fǎ.",
      durationSeconds: 180,
    },
    {
      level: "HSKK Advanced",
      prompt: "Discuss whether traditional culture and modernization can coexist.",
      promptVi: "Thảo luận liệu văn hóa truyền thống và hiện đại hóa có thể cùng tồn tại.",
      hanzi: "请讨论传统文化与现代化能否共存。",
      pinyin: "qǐng tǎo lùn chuán tǒng wén huà yǔ xiàn dài huà néng fǒu gòng cún.",
      durationSeconds: 180,
    },
  ],
  vocabLink: "/chinese/hsk/vocabulary?level=HSK%206",
};

export const HSK_LEVEL_GUIDES: HskLevelGuide[] = [HSK1, HSK2, HSK3, HSK4, HSK5, HSK6];

export const getHskLevel = (level: number): HskLevelGuide | undefined =>
  HSK_LEVEL_GUIDES.find((g) => g.level === level);
