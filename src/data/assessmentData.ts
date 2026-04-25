// Assessment question banks for English, Chinese, and Programming
// Each bank has 10 questions with difficulty tiers for adaptive testing

export interface AssessmentQuestion {
  id: string;
  questionVi: string;
  questionEn: string;
  options: string[];
  correct: number;
  difficulty: "easy" | "medium" | "hard";
  skill: string; // e.g. "grammar", "vocabulary", "reading", "pinyin", "hanzi", "logic", "syntax"
}

// Skill profile labels based on score ranges
export interface SkillProfile {
  labelEn: string;
  labelVi: string;
  descriptionEn: string;
  descriptionVi: string;
  recommendedCourseEn: string;
  recommendedCourseVi: string;
  recommendedPath: string; // route path
  level: number; // 1-5 scale
}

// ─────────────────────────── ENGLISH QUESTIONS ───────────────────────────

export const englishQuestions: AssessmentQuestion[] = [
  // Easy (1-3)
  {
    id: "en-1",
    questionVi: "Choose the correct form: She ___ to the office every day.",
    questionEn: "Choose the correct form: She ___ to the office every day.",
    options: ["go", "goes", "going", "gone"],
    correct: 1,
    difficulty: "easy",
    skill: "grammar",
  },
  {
    id: "en-2",
    questionVi: "Which word means 'happy'?",
    questionEn: "Which word means 'happy'?",
    options: ["Sad", "Joyful", "Angry", "Tired"],
    correct: 1,
    difficulty: "easy",
    skill: "vocabulary",
  },
  {
    id: "en-3",
    questionVi: "Complete: I ___ breakfast at 7 AM yesterday.",
    questionEn: "Complete: I ___ breakfast at 7 AM yesterday.",
    options: ["have", "has", "had", "having"],
    correct: 2,
    difficulty: "easy",
    skill: "grammar",
  },
  // Medium (4-7)
  {
    id: "en-4",
    questionVi: "Which word is a synonym of 'significant'?",
    questionEn: "Which word is a synonym of 'significant'?",
    options: ["trivial", "notable", "ordinary", "minor"],
    correct: 1,
    difficulty: "medium",
    skill: "vocabulary",
  },
  {
    id: "en-5",
    questionVi: "Complete: If I ___ rich, I would travel the world.",
    questionEn: "Complete: If I ___ rich, I would travel the world.",
    options: ["am", "was", "were", "be"],
    correct: 2,
    difficulty: "medium",
    skill: "grammar",
  },
  {
    id: "en-6",
    questionVi: "Choose the correct spelling:",
    questionEn: "Choose the correct spelling:",
    options: ["accomodation", "accommodation", "acomodation", "acommodation"],
    correct: 1,
    difficulty: "medium",
    skill: "vocabulary",
  },
  {
    id: "en-7",
    questionVi: "Read: 'The ubiquitous smartphone has transformed how we communicate.' What does 'ubiquitous' mean?",
    questionEn: "Read: 'The ubiquitous smartphone has transformed how we communicate.' What does 'ubiquitous' mean?",
    options: ["Expensive", "Found everywhere", "Complicated", "Outdated"],
    correct: 1,
    difficulty: "medium",
    skill: "reading",
  },
  // Hard (8-10)
  {
    id: "en-8",
    questionVi: "Which sentence uses the subjunctive mood correctly?",
    questionEn: "Which sentence uses the subjunctive mood correctly?",
    options: [
      "I wish I was taller.",
      "I suggest that he goes home.",
      "It is essential that she be present.",
      "If I would have known, I'd have come.",
    ],
    correct: 2,
    difficulty: "hard",
    skill: "grammar",
  },
  {
    id: "en-9",
    questionVi: "In IELTS Writing Task 2, what does 'coherence and cohesion' primarily assess?",
    questionEn: "In IELTS Writing Task 2, what does 'coherence and cohesion' primarily assess?",
    options: [
      "Grammar accuracy",
      "Vocabulary range",
      "Logical flow and linking of ideas",
      "Task response completeness",
    ],
    correct: 2,
    difficulty: "hard",
    skill: "reading",
  },
  {
    id: "en-10",
    questionVi: "Choose the most appropriate academic phrase: 'The data ___ that there is a strong correlation.'",
    questionEn: "Choose the most appropriate academic phrase: 'The data ___ that there is a strong correlation.'",
    options: ["shows", "suggests", "tells", "says"],
    correct: 1,
    difficulty: "hard",
    skill: "vocabulary",
  },
];

// ─────────────────────────── CHINESE QUESTIONS ───────────────────────────

export const chineseQuestions: AssessmentQuestion[] = [
  // Easy (1-3)
  {
    id: "cn-1",
    questionVi: "Chọn Pinyin đúng cho 你好:",
    questionEn: "Choose the correct Pinyin for 你好:",
    options: ["nǐ hǎo", "ní hào", "nì hǎo", "nǐ háo"],
    correct: 0,
    difficulty: "easy",
    skill: "pinyin",
  },
  {
    id: "cn-2",
    questionVi: "'谢谢' có nghĩa là gì?",
    questionEn: "What does '谢谢' mean?",
    options: ["Hello", "Goodbye", "Thank you", "Sorry"],
    correct: 2,
    difficulty: "easy",
    skill: "hanzi",
  },
  {
    id: "cn-3",
    questionVi: "Chọn chữ Hán đúng cho 'nước' (water):",
    questionEn: "Choose the correct Hanzi for 'water':",
    options: ["火", "水", "木", "土"],
    correct: 1,
    difficulty: "easy",
    skill: "hanzi",
  },
  // Medium (4-7)
  {
    id: "cn-4",
    questionVi: "Câu nào đúng ngữ pháp tiếng Trung?",
    questionEn: "Which sentence is grammatically correct in Chinese?",
    options: [
      "我很是高兴。",
      "我很高兴。",
      "我是很高兴。",
      "很我高兴。",
    ],
    correct: 1,
    difficulty: "medium",
    skill: "grammar",
  },
  {
    id: "cn-5",
    questionVi: "Thanh điệu thứ 3 trong tiếng Trung đọc như thế nào?",
    questionEn: "How is the 3rd tone pronounced in Mandarin?",
    options: [
      "Rising tone (↗)",
      "Falling tone (↘)",
      "Dipping tone (↘↗)",
      "Flat tone (→)",
    ],
    correct: 2,
    difficulty: "medium",
    skill: "pinyin",
  },
  {
    id: "cn-6",
    questionVi: "Chọn lượng từ đúng: 一___书 (one book)",
    questionEn: "Choose the correct measure word: 一___书 (one book)",
    options: ["个", "本", "只", "条"],
    correct: 1,
    difficulty: "medium",
    skill: "grammar",
  },
  {
    id: "cn-7",
    questionVi: "'我想去中国旅游' nghĩa là gì?",
    questionEn: "What does '我想去中国旅游' mean?",
    options: [
      "I live in China.",
      "I want to travel to China.",
      "I am studying Chinese.",
      "I came from China.",
    ],
    correct: 1,
    difficulty: "medium",
    skill: "reading",
  },
  // Hard (8-10)
  {
    id: "cn-8",
    questionVi: "Chọn cụm từ phù hợp: '虽然他很忙，___他还是来了。'",
    questionEn: "Fill in: '虽然他很忙，___他还是来了。'",
    options: ["所以", "但是", "因为", "如果"],
    correct: 1,
    difficulty: "hard",
    skill: "grammar",
  },
  {
    id: "cn-9",
    questionVi: "Thành ngữ '画蛇添足' có nghĩa là gì?",
    questionEn: "What does the idiom '画蛇添足' mean?",
    options: [
      "Practice makes perfect",
      "Adding unnecessary details / ruining by overdoing",
      "Two birds with one stone",
      "Slow and steady wins",
    ],
    correct: 1,
    difficulty: "hard",
    skill: "vocabulary",
  },
  {
    id: "cn-10",
    questionVi: "Câu nào sử dụng '把' đúng?",
    questionEn: "Which sentence uses '把' correctly?",
    options: [
      "我把书看了。",
      "我把书放在桌子上了。",
      "我把去学校。",
      "他把很高兴。",
    ],
    correct: 1,
    difficulty: "hard",
    skill: "grammar",
  },
];

// ─────────────────────────── PROGRAMMING QUESTIONS ───────────────────────────

export const programmingQuestions: AssessmentQuestion[] = [
  // Easy (1-3)
  {
    id: "prog-1",
    questionVi: "Output của lệnh: print(type([1,2,3])) là gì?",
    questionEn: "What is the output of: print(type([1,2,3]))?",
    options: ["<class 'tuple'>", "<class 'list'>", "<class 'dict'>", "<class 'set'>"],
    correct: 1,
    difficulty: "easy",
    skill: "syntax",
  },
  {
    id: "prog-2",
    questionVi: "Trong Python, toán tử nào dùng để chia lấy dư?",
    questionEn: "In Python, which operator is used for modulus (remainder)?",
    options: ["/", "//", "%", "**"],
    correct: 2,
    difficulty: "easy",
    skill: "syntax",
  },
  {
    id: "prog-3",
    questionVi: "SQL: Lệnh nào dùng để lấy dữ liệu từ bảng?",
    questionEn: "SQL: Which command retrieves data from a table?",
    options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
    correct: 2,
    difficulty: "easy",
    skill: "syntax",
  },
  // Medium (4-7)
  {
    id: "prog-4",
    questionVi: "Trong SQL, mệnh đề nào lọc kết quả sau GROUP BY?",
    questionEn: "In SQL, which clause filters grouped results?",
    options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
    correct: 1,
    difficulty: "medium",
    skill: "logic",
  },
  {
    id: "prog-5",
    questionVi: "ETL là viết tắt của gì?",
    questionEn: "What does ETL stand for?",
    options: ["Extract, Test, Load", "Extract, Transform, Load", "Export, Transform, Link", "Extract, Transfer, Log"],
    correct: 1,
    difficulty: "medium",
    skill: "logic",
  },
  {
    id: "prog-6",
    questionVi: "Output: for i in range(3): print(i, end=' ')",
    questionEn: "Output: for i in range(3): print(i, end=' ')",
    options: ["1 2 3", "0 1 2", "0 1 2 3", "1 2"],
    correct: 1,
    difficulty: "medium",
    skill: "logic",
  },
  {
    id: "prog-7",
    questionVi: "Cấu trúc dữ liệu nào hoạt động theo nguyên tắc LIFO?",
    questionEn: "Which data structure follows the LIFO principle?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correct: 1,
    difficulty: "medium",
    skill: "logic",
  },
  // Hard (8-10)
  {
    id: "prog-8",
    questionVi: "Time complexity của Binary Search là gì?",
    questionEn: "What is the time complexity of Binary Search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correct: 1,
    difficulty: "hard",
    skill: "logic",
  },
  {
    id: "prog-9",
    questionVi: "Python: list comprehension [x**2 for x in range(5) if x%2==0] trả về?",
    questionEn: "Python: What does [x**2 for x in range(5) if x%2==0] return?",
    options: ["[0, 4, 16]", "[1, 9, 25]", "[0, 2, 4]", "[4, 16]"],
    correct: 0,
    difficulty: "hard",
    skill: "syntax",
  },
  {
    id: "prog-10",
    questionVi: "SQL: Sự khác biệt giữa INNER JOIN và LEFT JOIN là gì?",
    questionEn: "SQL: What is the key difference between INNER JOIN and LEFT JOIN?",
    options: [
      "INNER JOIN is faster",
      "LEFT JOIN returns all rows from left table even without matches",
      "They are identical",
      "INNER JOIN returns more rows",
    ],
    correct: 1,
    difficulty: "hard",
    skill: "logic",
  },
];

// ─────────────────────────── SKILL PROFILES ───────────────────────────

export function getEnglishProfile(score: number): SkillProfile {
  if (score >= 9) return {
    labelEn: "Advanced English Speaker", labelVi: "Trình độ Tiếng Anh Nâng Cao",
    descriptionEn: "Excellent command of English. Ready for IELTS 7.0+ preparation.",
    descriptionVi: "Nắm vững tiếng Anh xuất sắc. Sẵn sàng luyện IELTS 7.0+.",
    recommendedCourseEn: "Advanced IELTS Writing & Speaking Masterclass",
    recommendedCourseVi: "Lớp IELTS Writing & Speaking nâng cao",
    recommendedPath: "/english/ielts-writing",
    level: 5,
  };
  if (score >= 7) return {
    labelEn: "Upper-Intermediate Learner", labelVi: "Trình độ Trung Cấp Cao",
    descriptionEn: "Strong foundation. Focus on academic vocabulary and complex grammar.",
    descriptionVi: "Nền tảng vững chắc. Cần tập trung vào từ vựng học thuật và ngữ pháp phức tạp.",
    recommendedCourseEn: "IELTS Intensive Preparation Course",
    recommendedCourseVi: "Khóa Luyện Thi IELTS Chuyên Sâu",
    recommendedPath: "/english/conversational",
    level: 4,
  };
  if (score >= 5) return {
    labelEn: "Intermediate English Learner", labelVi: "Trình độ Trung Cấp",
    descriptionEn: "Good basics! Strengthen your grammar tenses and expand IELTS vocabulary.",
    descriptionVi: "Nền tảng tốt! Cần củng cố thì ngữ pháp và mở rộng từ vựng IELTS.",
    recommendedCourseEn: "Conversational English - Months 3-4",
    recommendedCourseVi: "Giao tiếp Tiếng Anh - Tháng 3-4",
    recommendedPath: "/english/conversational",
    level: 3,
  };
  if (score >= 3) return {
    labelEn: "Pre-Intermediate Learner", labelVi: "Trình độ Sơ Trung Cấp",
    descriptionEn: "Building foundations. Start with everyday conversations and basic grammar.",
    descriptionVi: "Đang xây nền tảng. Bắt đầu với hội thoại hàng ngày và ngữ pháp cơ bản.",
    recommendedCourseEn: "Conversational English - Month 1",
    recommendedCourseVi: "Giao tiếp Tiếng Anh - Tháng 1",
    recommendedPath: "/english/conversational",
    level: 2,
  };
  return {
    labelEn: "Beginner Explorer", labelVi: "Người Mới Bắt Đầu",
    descriptionEn: "Great start! Our beginner-friendly courses will build your confidence fast.",
    descriptionVi: "Khởi đầu tuyệt vời! Các khóa học dành cho người mới sẽ giúp bạn tự tin nhanh chóng.",
    recommendedCourseEn: "English Foundations - Getting Started",
    recommendedCourseVi: "Nền Tảng Tiếng Anh - Bắt Đầu",
    recommendedPath: "/english",
    level: 1,
  };
}

export function getChineseProfile(score: number): SkillProfile {
  if (score >= 9) return {
    labelEn: "HSK 4-5 Level", labelVi: "Trình độ HSK 4-5",
    descriptionEn: "Impressive! You can handle complex conversations and formal writing.",
    descriptionVi: "Ấn tượng! Bạn có thể xử lý hội thoại phức tạp và văn bản trang trọng.",
    recommendedCourseEn: "Advanced Chinese - Business & Literature",
    recommendedCourseVi: "Tiếng Trung Nâng Cao - Kinh doanh & Văn học",
    recommendedPath: "/chinese/conversational",
    level: 5,
  };
  if (score >= 7) return {
    labelEn: "HSK 3 Level", labelVi: "Trình độ HSK 3",
    descriptionEn: "Solid Chinese skills. Ready for intermediate conversations and HSK 3 prep.",
    descriptionVi: "Kỹ năng tiếng Trung vững. Sẵn sàng cho hội thoại trung cấp và luyện HSK 3.",
    recommendedCourseEn: "Conversational Chinese - Month 3-4",
    recommendedCourseVi: "Giao tiếp Tiếng Trung - Tháng 3-4",
    recommendedPath: "/chinese/conversational",
    level: 4,
  };
  if (score >= 5) return {
    labelEn: "HSK 2 Level", labelVi: "Trình độ HSK 2",
    descriptionEn: "You understand basic Chinese! Focus on measure words and sentence patterns.",
    descriptionVi: "Bạn hiểu tiếng Trung cơ bản! Tập trung lượng từ và mẫu câu.",
    recommendedCourseEn: "Conversational Chinese - Month 2",
    recommendedCourseVi: "Giao tiếp Tiếng Trung - Tháng 2",
    recommendedPath: "/chinese/conversational",
    level: 3,
  };
  if (score >= 3) return {
    labelEn: "HSK 1 Level", labelVi: "Trình độ HSK 1",
    descriptionEn: "Good start with Pinyin and basic Hanzi. Keep building your character bank!",
    descriptionVi: "Khởi đầu tốt với Pinyin và Hán tự cơ bản. Tiếp tục mở rộng vốn chữ!",
    recommendedCourseEn: "Conversational Chinese - Month 1",
    recommendedCourseVi: "Giao tiếp Tiếng Trung - Tháng 1",
    recommendedPath: "/chinese/conversational",
    level: 2,
  };
  return {
    labelEn: "Chinese Beginner", labelVi: "Người Mới Học Tiếng Trung",
    descriptionEn: "Welcome to Chinese! Start with tones, Pinyin, and your first 50 Hanzi.",
    descriptionVi: "Chào mừng đến với tiếng Trung! Bắt đầu với thanh điệu, Pinyin và 50 Hán tự đầu tiên.",
    recommendedCourseEn: "Chinese Foundations - Getting Started",
    recommendedCourseVi: "Nền Tảng Tiếng Trung - Bắt Đầu",
    recommendedPath: "/chinese",
    level: 1,
  };
}

export function getProgrammingProfile(score: number): SkillProfile {
  if (score >= 9) return {
    labelEn: "Logical Architect", labelVi: "Kiến Trúc Sư Logic",
    descriptionEn: "Strong problem-solving and algorithmic thinking. Ready for advanced challenges!",
    descriptionVi: "Tư duy giải quyết vấn đề và thuật toán mạnh mẽ. Sẵn sàng cho thử thách nâng cao!",
    recommendedCourseEn: "Advanced Data Engineering & ML Pipeline",
    recommendedCourseVi: "Kỹ sư Dữ liệu & ML Pipeline Nâng Cao",
    recommendedPath: "/programming",
    level: 5,
  };
  if (score >= 7) return {
    labelEn: "Confident Coder", labelVi: "Lập Trình Viên Tự Tin",
    descriptionEn: "Great coding foundations. Dive into data structures and SQL optimization.",
    descriptionVi: "Nền tảng lập trình tốt. Đi sâu vào cấu trúc dữ liệu và tối ưu SQL.",
    recommendedCourseEn: "SQL & Data Engineering Intermediate",
    recommendedCourseVi: "SQL & Kỹ sư Dữ liệu Trung Cấp",
    recommendedPath: "/programming",
    level: 4,
  };
  if (score >= 5) return {
    labelEn: "Logical Thinker", labelVi: "Tư Duy Logic",
    descriptionEn: "You understand programming basics. Practice more with Python challenges!",
    descriptionVi: "Bạn hiểu cơ bản lập trình. Luyện tập thêm với các thử thách Python!",
    recommendedCourseEn: "Python Foundations & Practice",
    recommendedCourseVi: "Nền Tảng Python & Thực Hành",
    recommendedPath: "/programming",
    level: 3,
  };
  if (score >= 3) return {
    labelEn: "Code Explorer", labelVi: "Nhà Khám Phá Code",
    descriptionEn: "Getting started with logic and syntax. Our guided lessons will help!",
    descriptionVi: "Đang bắt đầu với logic và cú pháp. Bài học có hướng dẫn sẽ giúp bạn!",
    recommendedCourseEn: "Intro to Programming with Python",
    recommendedCourseVi: "Giới thiệu Lập trình với Python",
    recommendedPath: "/programming",
    level: 2,
  };
  return {
    labelEn: "Future Programmer", labelVi: "Lập Trình Viên Tương Lai",
    descriptionEn: "Everyone starts somewhere! Begin with our beginner-friendly Python course.",
    descriptionVi: "Ai cũng bắt đầu từ đâu đó! Bắt đầu với khóa Python dành cho người mới.",
    recommendedCourseEn: "Programming 101 - Your First Code",
    recommendedCourseVi: "Lập Trình 101 - Dòng Code Đầu Tiên",
    recommendedPath: "/programming",
    level: 1,
  };
}
