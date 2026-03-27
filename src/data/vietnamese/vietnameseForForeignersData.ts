// Vietnamese for Foreigners – Complete Beginner Curriculum

export interface ToneInfo {
  id: string;
  name: string;
  nameEn: string;
  mark: string;
  example: string;
  description: string;
  descriptionEn: string;
}

export interface DialogueLine {
  speaker: string;
  vi: string;
  en: string;
}

export interface VFFVocabItem {
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  exampleEn: string;
}

export interface VFFLesson {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  objectives: string[];
  objectivesEn: string[];
  vocabulary: VFFVocabItem[];
  dialogues: DialogueLine[];
  culturalNote: string;
  culturalNoteEn: string;
  quiz: { question: string; questionEn: string; options: string[]; answer: number }[];
}

export interface VFFModule {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  color: string;
  description: string;
  descriptionEn: string;
  lessons: VFFLesson[];
}

// Vietnamese Tones Reference
export const vietnameseTones: ToneInfo[] = [
  { id: "ngang", name: "Ngang (Level)", nameEn: "Level Tone", mark: "a", example: "ma (ghost)", description: "Giọng bằng, không lên không xuống.", descriptionEn: "Flat, mid-level pitch. No rise or fall." },
  { id: "sac", name: "Sắc (Rising)", nameEn: "Rising Tone", mark: "á", example: "má (cheek/mother)", description: "Giọng lên cao, từ giữa lên đỉnh.", descriptionEn: "Rises sharply from mid to high pitch." },
  { id: "huyen", name: "Huyền (Falling)", nameEn: "Falling Tone", mark: "à", example: "mà (but/that)", description: "Giọng hạ thấp, từ giữa xuống.", descriptionEn: "Falls gradually from mid to low pitch." },
  { id: "hoi", name: "Hỏi (Dipping-rising)", nameEn: "Dipping-Rising Tone", mark: "ả", example: "mả (grave/tomb)", description: "Giọng xuống rồi lên nhẹ, như đang hỏi.", descriptionEn: "Dips down then rises slightly, like a question." },
  { id: "nga", name: "Ngã (Rising-glottalized)", nameEn: "Rising Broken Tone", mark: "ã", example: "mã (horse/code)", description: "Giọng lên, bị ngắt giữa chừng rồi lên tiếp.", descriptionEn: "Rises, breaks in the middle, then rises again." },
  { id: "nang", name: "Nặng (Heavy)", nameEn: "Heavy/Drop Tone", mark: "ạ", example: "mạ (rice seedling)", description: "Giọng hạ xuống rất nhanh và dứt khoát.", descriptionEn: "Drops sharply and cuts off abruptly." },
];

// Course Modules
export const vffModules: VFFModule[] = [
  {
    id: "vff-intro",
    title: "Giới thiệu bản thân",
    titleEn: "Introduction & Self-Introduction",
    icon: "👋",
    color: "from-blue-500 to-cyan-500",
    description: "Học cách chào hỏi và giới thiệu bản thân bằng tiếng Việt.",
    descriptionEn: "Learn to greet people and introduce yourself in Vietnamese.",
    lessons: [
      {
        id: "vff-intro-1",
        title: "Xin chào! Tôi là...",
        titleEn: "Hello! I am...",
        icon: "👋",
        objectives: ["Biết cách chào hỏi cơ bản", "Giới thiệu tên"],
        objectivesEn: ["Learn basic greetings", "Introduce your name"],
        vocabulary: [
          { word: "Xin chào", pronunciation: "sin jào", meaning: "Hello", example: "Xin chào, tôi là Anna.", exampleEn: "Hello, I am Anna." },
          { word: "Tôi", pronunciation: "toy", meaning: "I/Me", example: "Tôi là sinh viên.", exampleEn: "I am a student." },
          { word: "là", pronunciation: "là", meaning: "am/is/are", example: "Anh ấy là bác sĩ.", exampleEn: "He is a doctor." },
          { word: "tên", pronunciation: "ten", meaning: "name", example: "Tên tôi là David.", exampleEn: "My name is David." },
          { word: "bạn", pronunciation: "ban", meaning: "you (friend)", example: "Bạn tên gì?", exampleEn: "What is your name?" },
          { word: "rất vui", pronunciation: "rất vui", meaning: "very happy", example: "Rất vui được gặp bạn.", exampleEn: "Very happy to meet you." },
        ],
        dialogues: [
          { speaker: "A", vi: "Xin chào! Tôi là Anna. Bạn tên gì?", en: "Hello! I am Anna. What is your name?" },
          { speaker: "B", vi: "Chào Anna! Tôi là Minh. Rất vui được gặp bạn.", en: "Hi Anna! I am Minh. Very happy to meet you." },
          { speaker: "A", vi: "Rất vui được gặp Minh. Bạn là người Việt Nam phải không?", en: "Nice to meet you, Minh. Are you Vietnamese?" },
          { speaker: "B", vi: "Vâng, tôi là người Việt Nam. Bạn là người nước nào?", en: "Yes, I am Vietnamese. Where are you from?" },
        ],
        culturalNote: "Người Việt thường hỏi tên, tuổi và nghề nghiệp khi mới gặp.",
        culturalNoteEn: "Vietnamese people often ask about name, age, and occupation when first meeting someone.",
        quiz: [
          { question: "'Xin chào' nghĩa là gì?", questionEn: "What does 'Xin chào' mean?", options: ["Goodbye", "Hello", "Thank you", "Sorry"], answer: 1 },
          { question: "'Tôi là sinh viên' nghĩa là gì?", questionEn: "What does 'Tôi là sinh viên' mean?", options: ["I am a teacher", "I am a student", "I am a doctor", "I am happy"], answer: 1 },
        ],
      },
      {
        id: "vff-intro-2",
        title: "Bạn bao nhiêu tuổi?",
        titleEn: "How old are you?",
        icon: "🎂",
        objectives: ["Hỏi và nói tuổi", "Sử dụng số đếm 1-100"],
        objectivesEn: ["Ask and tell age", "Use numbers 1-100"],
        vocabulary: [
          { word: "tuổi", pronunciation: "tuổi", meaning: "age/years old", example: "Tôi 25 tuổi.", exampleEn: "I am 25 years old." },
          { word: "bao nhiêu", pronunciation: "bao nyew", meaning: "how many/much", example: "Bạn bao nhiêu tuổi?", exampleEn: "How old are you?" },
          { word: "năm nay", pronunciation: "năm nai", meaning: "this year", example: "Năm nay tôi 30 tuổi.", exampleEn: "This year I am 30." },
          { word: "sinh năm", pronunciation: "sinh năm", meaning: "born in year", example: "Tôi sinh năm 1995.", exampleEn: "I was born in 1995." },
        ],
        dialogues: [
          { speaker: "A", vi: "Bạn bao nhiêu tuổi?", en: "How old are you?" },
          { speaker: "B", vi: "Tôi 28 tuổi. Còn bạn?", en: "I am 28 years old. And you?" },
          { speaker: "A", vi: "Tôi 25 tuổi. Tôi sinh năm 1999.", en: "I am 25. I was born in 1999." },
        ],
        culturalNote: "Ở Việt Nam, hỏi tuổi là bình thường và không bị coi là bất lịch sự.",
        culturalNoteEn: "In Vietnam, asking someone's age is normal and not considered rude.",
        quiz: [
          { question: "'Bao nhiêu tuổi' dùng để hỏi gì?", questionEn: "What does 'Bao nhiêu tuổi' ask about?", options: ["Name", "Age", "Job", "Country"], answer: 1 },
        ],
      },
    ],
  },
  {
    id: "vff-greetings",
    title: "Chào hỏi & Xưng hô",
    titleEn: "Greetings & Pronouns",
    icon: "🤝",
    color: "from-green-500 to-emerald-500",
    description: "Hệ thống xưng hô phức tạp và cách chào hỏi theo hoàn cảnh.",
    descriptionEn: "The complex pronoun system and context-appropriate greetings.",
    lessons: [
      {
        id: "vff-greet-1",
        title: "Anh, Chị, Em — Hệ thống đại từ",
        titleEn: "Anh, Chị, Em — The Pronoun System",
        icon: "👥",
        objectives: ["Hiểu hệ thống xưng hô Việt Nam", "Sử dụng đúng đại từ theo tuổi và giới tính"],
        objectivesEn: ["Understand Vietnamese pronoun system", "Use correct pronouns based on age and gender"],
        vocabulary: [
          { word: "anh", pronunciation: "anh", meaning: "older brother / you (male, older)", example: "Anh ơi, cho tôi hỏi.", exampleEn: "Excuse me sir, may I ask." },
          { word: "chị", pronunciation: "chee", meaning: "older sister / you (female, older)", example: "Chị tên gì ạ?", exampleEn: "What is your name, ma'am?" },
          { word: "em", pronunciation: "em", meaning: "younger sibling / you (younger)", example: "Em bao nhiêu tuổi?", exampleEn: "How old are you (younger person)?" },
          { word: "ông", pronunciation: "ông", meaning: "grandfather / Mr. (elderly)", example: "Ông khỏe không ạ?", exampleEn: "How are you, sir (elderly)?" },
          { word: "bà", pronunciation: "bà", meaning: "grandmother / Mrs. (elderly)", example: "Bà ơi, cháu chào bà.", exampleEn: "Hello, grandmother." },
          { word: "cháu", pronunciation: "cháu", meaning: "grandchild / I (to elders)", example: "Cháu chào ông bà.", exampleEn: "I greet you, grandparents." },
        ],
        dialogues: [
          { speaker: "Student", vi: "Em chào anh ạ!", en: "Hello (to an older male)!" },
          { speaker: "Teacher", vi: "Chào em! Em khỏe không?", en: "Hello! How are you?" },
          { speaker: "Student", vi: "Dạ, em khỏe. Cảm ơn anh.", en: "Yes, I'm fine. Thank you." },
        ],
        culturalNote: "Tiếng Việt không có 'you' chung chung. Phải chọn đại từ theo tuổi, giới tính và mối quan hệ.",
        culturalNoteEn: "Vietnamese has no generic 'you'. You must choose pronouns based on age, gender, and relationship.",
        quiz: [
          { question: "Gọi người lớn tuổi hơn mình (nam) là gì?", questionEn: "What do you call an older male?", options: ["Em", "Anh", "Cháu", "Bạn"], answer: 1 },
          { question: "'Ông' dùng khi nào?", questionEn: "When do you use 'Ông'?", options: ["For a young boy", "For an elderly man", "For a friend", "For yourself"], answer: 1 },
        ],
      },
      {
        id: "vff-greet-2",
        title: "Chào hỏi theo thời gian",
        titleEn: "Time-Based Greetings",
        icon: "🌅",
        objectives: ["Chào theo buổi sáng, chiều, tối", "Câu hỏi thăm sức khỏe"],
        objectivesEn: ["Greet by time of day", "Health inquiry phrases"],
        vocabulary: [
          { word: "Chào buổi sáng", pronunciation: "jào buổi sáng", meaning: "Good morning", example: "Chào buổi sáng, anh khỏe không?", exampleEn: "Good morning, how are you?" },
          { word: "Chào buổi chiều", pronunciation: "jào buổi chiều", meaning: "Good afternoon", example: "Chào buổi chiều!", exampleEn: "Good afternoon!" },
          { word: "Chào buổi tối", pronunciation: "jào buổi tối", meaning: "Good evening", example: "Chào buổi tối, chị!", exampleEn: "Good evening, sister!" },
          { word: "khỏe", pronunciation: "kweh", meaning: "healthy/fine", example: "Tôi khỏe, cảm ơn.", exampleEn: "I'm fine, thank you." },
          { word: "tạm biệt", pronunciation: "tạm biệt", meaning: "goodbye", example: "Tạm biệt, hẹn gặp lại!", exampleEn: "Goodbye, see you again!" },
        ],
        dialogues: [
          { speaker: "A", vi: "Chào buổi sáng! Anh khỏe không?", en: "Good morning! How are you?" },
          { speaker: "B", vi: "Cảm ơn, tôi khỏe. Còn bạn?", en: "Thank you, I'm fine. And you?" },
          { speaker: "A", vi: "Tôi cũng khỏe. Tạm biệt nhé!", en: "I'm also fine. Goodbye!" },
        ],
        culturalNote: "Người Việt thường chào bằng 'Ăn cơm chưa?' (Đã ăn cơm chưa?) — nghĩa là quan tâm, không phải mời ăn.",
        culturalNoteEn: "Vietnamese often greet with 'Have you eaten yet?' — it shows care, not an actual dinner invitation.",
        quiz: [
          { question: "'Tạm biệt' nghĩa là gì?", questionEn: "What does 'Tạm biệt' mean?", options: ["Hello", "Thank you", "Goodbye", "Sorry"], answer: 2 },
        ],
      },
    ],
  },
  {
    id: "vff-essentials",
    title: "Câu cần thiết hằng ngày",
    titleEn: "Essential Daily Phrases",
    icon: "💬",
    color: "from-purple-500 to-pink-500",
    description: "Những câu tiếng Việt quan trọng nhất để giao tiếp hằng ngày.",
    descriptionEn: "The most important Vietnamese phrases for daily communication.",
    lessons: [
      {
        id: "vff-essential-1",
        title: "Cảm ơn, Xin lỗi, Làm ơn",
        titleEn: "Thank you, Sorry, Please",
        icon: "🙏",
        objectives: ["Nói cảm ơn, xin lỗi", "Sử dụng 'làm ơn' đúng cách"],
        objectivesEn: ["Say thank you and sorry", "Use 'please' correctly"],
        vocabulary: [
          { word: "Cảm ơn", pronunciation: "kảm ơn", meaning: "Thank you", example: "Cảm ơn bạn rất nhiều!", exampleEn: "Thank you very much!" },
          { word: "Xin lỗi", pronunciation: "sin lỗi", meaning: "Sorry / Excuse me", example: "Xin lỗi, tôi đến muộn.", exampleEn: "Sorry, I am late." },
          { word: "Không có gì", pronunciation: "không kó jì", meaning: "You're welcome", example: "Không có gì, bạn không cần cảm ơn.", exampleEn: "You're welcome, no need to thank." },
          { word: "Làm ơn", pronunciation: "làm ơn", meaning: "Please", example: "Làm ơn cho tôi một ly nước.", exampleEn: "Please give me a glass of water." },
          { word: "Dạ/Vâng", pronunciation: "dạ/vâng", meaning: "Yes (polite)", example: "Dạ, tôi hiểu rồi.", exampleEn: "Yes, I understand." },
          { word: "Không", pronunciation: "không", meaning: "No", example: "Không, cảm ơn.", exampleEn: "No, thank you." },
        ],
        dialogues: [
          { speaker: "A", vi: "Làm ơn cho tôi xem cái này.", en: "Please let me see this." },
          { speaker: "B", vi: "Dạ, đây ạ!", en: "Yes, here you go!" },
          { speaker: "A", vi: "Cảm ơn bạn nhiều!", en: "Thank you so much!" },
          { speaker: "B", vi: "Không có gì ạ!", en: "You're welcome!" },
        ],
        culturalNote: "'Dạ' (miền Nam) và 'Vâng' (miền Bắc) đều nghĩa là 'Yes' nhưng dùng ở vùng khác nhau.",
        culturalNoteEn: "'Dạ' (Southern) and 'Vâng' (Northern) both mean 'Yes' but are used in different regions.",
        quiz: [
          { question: "'Không có gì' nghĩa là gì?", questionEn: "What does 'Không có gì' mean?", options: ["Nothing", "You're welcome", "I don't know", "No problem"], answer: 1 },
        ],
      },
      {
        id: "vff-essential-2",
        title: "Hỏi đường & Di chuyển",
        titleEn: "Asking Directions & Getting Around",
        icon: "🗺️",
        objectives: ["Hỏi đường đi", "Dùng phương tiện giao thông"],
        objectivesEn: ["Ask for directions", "Use transportation vocabulary"],
        vocabulary: [
          { word: "ở đâu", pronunciation: "ở đâu", meaning: "where", example: "Nhà hàng ở đâu?", exampleEn: "Where is the restaurant?" },
          { word: "rẽ trái", pronunciation: "rẽ trái", meaning: "turn left", example: "Rẽ trái ở ngã tư.", exampleEn: "Turn left at the intersection." },
          { word: "rẽ phải", pronunciation: "rẽ phải", meaning: "turn right", example: "Rẽ phải, đi thẳng.", exampleEn: "Turn right, go straight." },
          { word: "đi thẳng", pronunciation: "đi thẳng", meaning: "go straight", example: "Đi thẳng 200 mét.", exampleEn: "Go straight for 200 meters." },
          { word: "gần", pronunciation: "gần", meaning: "near", example: "Khách sạn gần đây.", exampleEn: "The hotel is nearby." },
          { word: "xa", pronunciation: "xa", meaning: "far", example: "Sân bay xa lắm.", exampleEn: "The airport is very far." },
        ],
        dialogues: [
          { speaker: "Tourist", vi: "Xin lỗi, bưu điện ở đâu ạ?", en: "Excuse me, where is the post office?" },
          { speaker: "Local", vi: "Bạn đi thẳng, rẽ phải ở ngã tư. Bưu điện ở bên trái.", en: "Go straight, turn right at the intersection. The post office is on the left." },
          { speaker: "Tourist", vi: "Có xa không ạ?", en: "Is it far?" },
          { speaker: "Local", vi: "Không xa, khoảng 5 phút đi bộ.", en: "Not far, about 5 minutes walking." },
        ],
        culturalNote: "Người Việt rất hay chỉ đường bằng 'mốc' (landmark) thay vì địa chỉ cụ thể.",
        culturalNoteEn: "Vietnamese people often give directions using landmarks rather than specific addresses.",
        quiz: [
          { question: "'Đi thẳng' nghĩa là gì?", questionEn: "What does 'Đi thẳng' mean?", options: ["Turn left", "Turn right", "Go straight", "Go back"], answer: 2 },
        ],
      },
    ],
  },
  {
    id: "vff-numbers",
    title: "Số đếm & Tiền tệ",
    titleEn: "Numbers & Money",
    icon: "💰",
    color: "from-amber-500 to-orange-500",
    description: "Học đếm số, đổi tiền và trả giá tại Việt Nam.",
    descriptionEn: "Learn to count, exchange money, and bargain in Vietnam.",
    lessons: [
      {
        id: "vff-numbers-1",
        title: "Số đếm 1-100",
        titleEn: "Numbers 1-100",
        icon: "🔢",
        objectives: ["Đếm từ 1 đến 100", "Kết hợp số với danh từ"],
        objectivesEn: ["Count from 1 to 100", "Combine numbers with nouns"],
        vocabulary: [
          { word: "một", pronunciation: "một", meaning: "one", example: "Một ly cà phê.", exampleEn: "One cup of coffee." },
          { word: "hai", pronunciation: "hai", meaning: "two", example: "Hai người.", exampleEn: "Two people." },
          { word: "ba", pronunciation: "ba", meaning: "three", example: "Ba cái bánh.", exampleEn: "Three cakes." },
          { word: "mười", pronunciation: "mười", meaning: "ten", example: "Mười nghìn đồng.", exampleEn: "Ten thousand dong." },
          { word: "trăm", pronunciation: "trăm", meaning: "hundred", example: "Một trăm ngàn.", exampleEn: "One hundred thousand." },
          { word: "nghìn/ngàn", pronunciation: "ngìn/ngàn", meaning: "thousand", example: "Năm nghìn đồng.", exampleEn: "Five thousand dong." },
        ],
        dialogues: [
          { speaker: "A", vi: "Cái này bao nhiêu tiền?", en: "How much is this?" },
          { speaker: "B", vi: "Năm mươi nghìn đồng.", en: "Fifty thousand dong." },
          { speaker: "A", vi: "Đắt quá! Ba mươi nghìn được không?", en: "Too expensive! Can you do thirty thousand?" },
          { speaker: "B", vi: "Bốn mươi nghìn nhé?", en: "How about forty thousand?" },
        ],
        culturalNote: "Trả giá (mặc cả) rất phổ biến ở chợ truyền thống Việt Nam, nhưng không nên trả giá ở siêu thị hoặc cửa hàng lớn.",
        culturalNoteEn: "Bargaining is very common at traditional Vietnamese markets, but not at supermarkets or big stores.",
        quiz: [
          { question: "'Mười nghìn đồng' bằng bao nhiêu?", questionEn: "How much is 'Mười nghìn đồng'?", options: ["1,000 VND", "10,000 VND", "100,000 VND", "1,000,000 VND"], answer: 1 },
        ],
      },
      {
        id: "vff-numbers-2",
        title: "Mua sắm & Trả giá",
        titleEn: "Shopping & Bargaining",
        icon: "🛒",
        objectives: ["Hỏi giá và trả giá", "Từ vựng mua sắm"],
        objectivesEn: ["Ask prices and bargain", "Shopping vocabulary"],
        vocabulary: [
          { word: "bao nhiêu tiền", pronunciation: "bao nyew tiền", meaning: "how much (money)", example: "Cái áo này bao nhiêu tiền?", exampleEn: "How much is this shirt?" },
          { word: "đắt", pronunciation: "đắt", meaning: "expensive", example: "Đắt quá!", exampleEn: "Too expensive!" },
          { word: "rẻ", pronunciation: "rẻ", meaning: "cheap", example: "Chỗ này rẻ hơn.", exampleEn: "This place is cheaper." },
          { word: "giảm giá", pronunciation: "giảm giá", meaning: "discount", example: "Có giảm giá không?", exampleEn: "Is there a discount?" },
          { word: "mua", pronunciation: "mua", meaning: "buy", example: "Tôi muốn mua cái này.", exampleEn: "I want to buy this." },
        ],
        dialogues: [
          { speaker: "Tourist", vi: "Cái nón lá này bao nhiêu tiền?", en: "How much is this conical hat?" },
          { speaker: "Vendor", vi: "Tám mươi nghìn đồng.", en: "Eighty thousand dong." },
          { speaker: "Tourist", vi: "Bớt cho tôi đi! Năm mươi nghìn được không?", en: "Give me a discount! Can you do fifty thousand?" },
          { speaker: "Vendor", vi: "Sáu mươi lăm nghìn đi!", en: "Sixty-five thousand then!" },
        ],
        culturalNote: "Khi trả giá, hãy mỉm cười và thân thiện. Bắt đầu từ 50-60% giá ban đầu.",
        culturalNoteEn: "When bargaining, smile and be friendly. Start at 50-60% of the asking price.",
        quiz: [
          { question: "'Giảm giá' nghĩa là gì?", questionEn: "What does 'Giảm giá' mean?", options: ["Increase price", "Discount", "No sale", "Free"], answer: 1 },
        ],
      },
    ],
  },
  {
    id: "vff-food",
    title: "Ẩm thực & Đồ uống",
    titleEn: "Food & Drinks",
    icon: "🍜",
    color: "from-red-500 to-rose-500",
    description: "Gọi món ăn, đồ uống và trải nghiệm ẩm thực Việt Nam.",
    descriptionEn: "Order food and drinks and experience Vietnamese cuisine.",
    lessons: [
      {
        id: "vff-food-1",
        title: "Gọi món tại nhà hàng",
        titleEn: "Ordering at a Restaurant",
        icon: "🍽️",
        objectives: ["Gọi món ăn và đồ uống", "Hỏi thêm về món ăn"],
        objectivesEn: ["Order food and drinks", "Ask about dishes"],
        vocabulary: [
          { word: "phở", pronunciation: "fuh", meaning: "pho (noodle soup)", example: "Cho tôi một tô phở bò.", exampleEn: "Give me a bowl of beef pho." },
          { word: "cơm", pronunciation: "kuhm", meaning: "rice", example: "Tôi muốn ăn cơm.", exampleEn: "I want to eat rice." },
          { word: "nước", pronunciation: "nước", meaning: "water", example: "Cho tôi một ly nước.", exampleEn: "Give me a glass of water." },
          { word: "cà phê", pronunciation: "kà fê", meaning: "coffee", example: "Một ly cà phê sữa đá.", exampleEn: "One iced milk coffee." },
          { word: "ngon", pronunciation: "ngon", meaning: "delicious", example: "Phở rất ngon!", exampleEn: "The pho is very delicious!" },
          { word: "cay", pronunciation: "kai", meaning: "spicy", example: "Không cay nhé!", exampleEn: "Not spicy please!" },
          { word: "tính tiền", pronunciation: "tính tiền", meaning: "check/bill", example: "Tính tiền cho tôi.", exampleEn: "Give me the bill." },
        ],
        dialogues: [
          { speaker: "Waiter", vi: "Chào anh/chị! Anh/chị muốn gọi gì?", en: "Hello! What would you like to order?" },
          { speaker: "Customer", vi: "Cho tôi một tô phở bò và một ly cà phê sữa đá.", en: "I'd like a bowl of beef pho and an iced milk coffee." },
          { speaker: "Waiter", vi: "Dạ được. Anh/chị muốn cay không?", en: "Sure. Would you like it spicy?" },
          { speaker: "Customer", vi: "Không cay. Cảm ơn!", en: "Not spicy. Thank you!" },
        ],
        culturalNote: "Phở là 'quốc hồn quốc túy' Việt Nam. Ăn phở nên kèm rau sống, chanh, ớt và tương.",
        culturalNoteEn: "Phở is the 'soul dish' of Vietnam. Eat it with fresh herbs, lime, chili, and sauces.",
        quiz: [
          { question: "'Cà phê sữa đá' là gì?", questionEn: "What is 'Cà phê sữa đá'?", options: ["Hot black coffee", "Iced milk coffee", "Green tea", "Lemonade"], answer: 1 },
          { question: "'Tính tiền' dùng khi nào?", questionEn: "When do you use 'Tính tiền'?", options: ["When ordering", "When paying", "When entering", "When greeting"], answer: 1 },
        ],
      },
      {
        id: "vff-food-2",
        title: "Ăn vặt đường phố",
        titleEn: "Street Food Adventures",
        icon: "🥖",
        objectives: ["Tên các món ăn vặt phổ biến", "Mua đồ ăn ngoài đường"],
        objectivesEn: ["Names of popular street foods", "Buy food from street vendors"],
        vocabulary: [
          { word: "bánh mì", pronunciation: "bánh mì", meaning: "Vietnamese baguette sandwich", example: "Một bánh mì thịt.", exampleEn: "One meat baguette." },
          { word: "bún chả", pronunciation: "bún chả", meaning: "grilled pork with noodles", example: "Bún chả Hà Nội ngon lắm.", exampleEn: "Hanoi bún chả is very delicious." },
          { word: "gỏi cuốn", pronunciation: "gỏi cuốn", meaning: "fresh spring rolls", example: "Hai phần gỏi cuốn.", exampleEn: "Two portions of spring rolls." },
          { word: "chè", pronunciation: "chè", meaning: "Vietnamese sweet soup/dessert", example: "Tôi thích chè đậu xanh.", exampleEn: "I like mung bean sweet soup." },
          { word: "nước mía", pronunciation: "nước mía", meaning: "sugarcane juice", example: "Một ly nước mía lớn.", exampleEn: "One large sugarcane juice." },
        ],
        dialogues: [
          { speaker: "Tourist", vi: "Chị ơi, cho tôi một bánh mì.", en: "Excuse me, give me one bánh mì." },
          { speaker: "Vendor", vi: "Bánh mì thịt hay trứng?", en: "Meat or egg bánh mì?" },
          { speaker: "Tourist", vi: "Bánh mì thịt. Bao nhiêu tiền?", en: "Meat bánh mì. How much?" },
          { speaker: "Vendor", vi: "Hai mươi nghìn đồng.", en: "Twenty thousand dong." },
        ],
        culturalNote: "Ăn vặt đường phố là một phần văn hóa quan trọng ở Việt Nam. Ngồi ghế nhựa thấp trên vỉa hè là trải nghiệm đặc trưng!",
        culturalNoteEn: "Street food is a vital part of Vietnamese culture. Sitting on low plastic chairs on the sidewalk is an iconic experience!",
        quiz: [
          { question: "'Bánh mì' là gì?", questionEn: "What is 'Bánh mì'?", options: ["Rice noodle", "Baguette sandwich", "Spring roll", "Sweet soup"], answer: 1 },
        ],
      },
    ],
  },
];
