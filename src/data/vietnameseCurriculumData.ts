// Vietnamese Language & History Curriculum Data
// Organized into language lessons, history timeline, folklore, and fact-or-myth game

// ===================== TYPES =====================

export interface VietnameseVocabEntry {
  word: string;
  meaning: string;
  meaningEn: string;
  example: string;
  exampleEn: string;
  partOfSpeech?: string;
}

export interface VietnameseQuizQuestion {
  question: string;
  questionEn: string;
  options: string[];
  answer: number;
  explanation: string;
  explanationEn: string;
}

export interface VietnameseLesson {
  id: string;
  title: string;
  titleEn: string;
  level: "beginner" | "intermediate" | "advanced";
  theory: string;
  theoryEn: string;
  vocabulary: VietnameseVocabEntry[];
  quiz: VietnameseQuizQuestion[];
  proTips?: string[];
  proTipsEn?: string[];
}

export interface VietnameseModule {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  color: string;
  description: string;
  descriptionEn: string;
  category: "grammar" | "vocabulary" | "reading" | "speaking" | "folklore";
  lessons: VietnameseLesson[];
}

// ===================== HISTORY TYPES =====================

export interface HistoryEvent {
  year: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
}

export interface HistoryLesson {
  id: string;
  title: string;
  titleEn: string;
  story: string;
  storyEn: string;
  keyDates: HistoryEvent[];
  quiz: VietnameseQuizQuestion[];
}

export interface HistoryMonth {
  id: string;
  month: number;
  title: string;
  titleEn: string;
  icon: string;
  color: string;
  description: string;
  descriptionEn: string;
  lessons: HistoryLesson[];
}

// ===================== FACT OR MYTH TYPES =====================

export interface FactOrMythItem {
  id: string;
  statement: string;
  statementEn: string;
  isFact: boolean;
  explanation: string;
  explanationEn: string;
  category: "history" | "culture" | "geography";
}

// ===================== FOLKLORE TYPES =====================

export interface FolkloreItem {
  id: string;
  title: string;
  titleEn: string;
  type: "ca-dao" | "tuc-ngu" | "truyen-co";
  content: string;
  contentEn: string;
  grammarNote: string;
  grammarNoteEn: string;
  meaning: string;
  meaningEn: string;
}

// ===================== LANGUAGE MODULES =====================

export const vietnameseLanguageModules: VietnameseModule[] = [
  {
    id: "vn-grammar-basics",
    title: "Ngữ pháp cơ bản",
    titleEn: "Basic Grammar",
    icon: "📝",
    color: "from-red-500 to-orange-500",
    description: "Học cấu trúc câu và ngữ pháp tiếng Việt cơ bản",
    descriptionEn: "Learn basic Vietnamese sentence structure and grammar",
    category: "grammar",
    lessons: [
      {
        id: "vn-gram-1",
        title: "Cấu trúc câu cơ bản",
        titleEn: "Basic Sentence Structure",
        level: "beginner",
        theory: `## Cấu trúc câu tiếng Việt\n\nTiếng Việt có cấu trúc **Chủ ngữ + Vị ngữ + Bổ ngữ** (SVO), tương tự tiếng Anh.\n\n### Ví dụ:\n- **Tôi** ăn cơm. (I eat rice.)\n- **Cô ấy** đọc sách. (She reads books.)\n- **Chúng tôi** đi học. (We go to school.)\n\n### Đặc điểm:\n- Không chia động từ theo ngôi\n- Không có mạo từ (a, an, the)\n- Tính từ đứng **sau** danh từ`,
        theoryEn: `## Vietnamese Sentence Structure\n\nVietnamese follows the **Subject + Verb + Object** (SVO) structure, similar to English.\n\n### Examples:\n- **Tôi** ăn cơm. (I eat rice.)\n- **Cô ấy** đọc sách. (She reads books.)\n- **Chúng tôi** đi học. (We go to school.)\n\n### Key Features:\n- Verbs don't conjugate based on person\n- No articles (a, an, the)\n- Adjectives come **after** nouns`,
        vocabulary: [
          { word: "tôi", meaning: "tôi (đại từ ngôi thứ nhất)", meaningEn: "I / me", example: "Tôi là sinh viên.", exampleEn: "I am a student.", partOfSpeech: "pronoun" },
          { word: "ăn", meaning: "hành động đưa thức ăn vào miệng", meaningEn: "to eat", example: "Tôi ăn phở mỗi sáng.", exampleEn: "I eat pho every morning.", partOfSpeech: "verb" },
          { word: "cơm", meaning: "gạo đã nấu chín", meaningEn: "rice (cooked)", example: "Cơm Việt Nam rất ngon.", exampleEn: "Vietnamese rice is very delicious.", partOfSpeech: "noun" },
          { word: "đi", meaning: "di chuyển từ nơi này đến nơi khác", meaningEn: "to go", example: "Chúng tôi đi chợ.", exampleEn: "We go to the market.", partOfSpeech: "verb" },
        ],
        quiz: [
          { question: "Cấu trúc câu cơ bản của tiếng Việt là gì?", questionEn: "What is the basic sentence structure of Vietnamese?", options: ["SOV", "SVO", "VSO", "OVS"], answer: 1, explanation: "Tiếng Việt theo cấu trúc Chủ ngữ - Vị ngữ - Bổ ngữ (SVO).", explanationEn: "Vietnamese follows Subject-Verb-Object (SVO) order." },
          { question: "Tính từ trong tiếng Việt đứng ở đâu?", questionEn: "Where do adjectives go in Vietnamese?", options: ["Trước danh từ", "Sau danh từ", "Đầu câu", "Cuối câu"], answer: 1, explanation: "Tính từ đứng sau danh từ: 'nhà lớn' (big house), không phải 'lớn nhà'.", explanationEn: "Adjectives come after nouns: 'nhà lớn' (big house), not 'lớn nhà'." },
        ],
        proTips: ["Hãy nhớ: tính từ luôn đứng SAU danh từ trong tiếng Việt!"],
        proTipsEn: ["Remember: adjectives always come AFTER nouns in Vietnamese!"],
      },
      {
        id: "vn-gram-2",
        title: "Hệ thống đại từ nhân xưng",
        titleEn: "Pronoun System",
        level: "beginner",
        theory: `## Đại từ nhân xưng tiếng Việt\n\nTiếng Việt có hệ thống đại từ phong phú, thay đổi theo **tuổi tác, giới tính, và mối quan hệ**.\n\n### Các đại từ thường dùng:\n| Đại từ | Nghĩa | Dùng khi |\n|--------|--------|----------|\n| Tôi | I (formal) | Trang trọng |\n| Mình | I/me (casual) | Thân mật |\n| Anh | You/He (older male) | Nam lớn tuổi hơn |\n| Chị | You/She (older female) | Nữ lớn tuổi hơn |\n| Em | You/He/She (younger) | Nhỏ tuổi hơn |\n| Ông | You/He (grandfather) | Ông/người lớn tuổi |\n| Bà | You/She (grandmother) | Bà/người lớn tuổi |`,
        theoryEn: `## Vietnamese Pronoun System\n\nVietnamese has a rich pronoun system that changes based on **age, gender, and relationship**.\n\n### Common Pronouns:\n| Pronoun | Meaning | Used When |\n|---------|---------|----------|\n| Tôi | I (formal) | Formal settings |\n| Mình | I/me (casual) | Casual/intimate |\n| Anh | You/He (older male) | Older male |\n| Chị | You/She (older female) | Older female |\n| Em | You/He/She (younger) | Younger person |\n| Ông | You/He (grandfather) | Elderly male |\n| Bà | You/She (grandmother) | Elderly female |`,
        vocabulary: [
          { word: "anh", meaning: "đại từ cho nam lớn tuổi hơn", meaningEn: "older brother / you (older male)", example: "Anh ơi, cho tôi hỏi.", exampleEn: "Excuse me, sir, may I ask.", partOfSpeech: "pronoun" },
          { word: "chị", meaning: "đại từ cho nữ lớn tuổi hơn", meaningEn: "older sister / you (older female)", example: "Chị có khỏe không?", exampleEn: "How are you, miss?", partOfSpeech: "pronoun" },
          { word: "em", meaning: "đại từ cho người nhỏ tuổi hơn", meaningEn: "younger sibling / you (younger)", example: "Em học lớp mấy?", exampleEn: "What grade are you in?", partOfSpeech: "pronoun" },
        ],
        quiz: [
          { question: "Khi nói với người nam lớn tuổi hơn, bạn dùng đại từ gì?", questionEn: "Which pronoun do you use for an older male?", options: ["Em", "Anh", "Chị", "Tôi"], answer: 1, explanation: "'Anh' dùng cho nam lớn tuổi hơn mình.", explanationEn: "'Anh' is used for males older than you." },
        ],
      },
    ],
  },
  {
    id: "vn-vocabulary",
    title: "Từ vựng theo chủ đề",
    titleEn: "Thematic Vocabulary",
    icon: "📖",
    color: "from-yellow-500 to-red-500",
    description: "Học từ vựng tiếng Việt theo các chủ đề hàng ngày",
    descriptionEn: "Learn Vietnamese vocabulary organized by daily themes",
    category: "vocabulary",
    lessons: [
      {
        id: "vn-vocab-food",
        title: "Ẩm thực Việt Nam",
        titleEn: "Vietnamese Cuisine",
        level: "beginner",
        theory: `## Ẩm thực Việt Nam 🍜\n\nViệt Nam nổi tiếng với nền ẩm thực đa dạng và phong phú. Mỗi vùng miền có những món ăn đặc trưng riêng.\n\n### Các món phổ biến:\n- **Phở**: Món soup bún với thịt bò hoặc gà\n- **Bánh mì**: Bánh mì kiểu Pháp với nhân Việt\n- **Bún chả**: Bún với chả nướng (đặc sản Hà Nội)\n- **Cơm tấm**: Cơm gạo tấm với sườn nướng (đặc sản Sài Gòn)`,
        theoryEn: `## Vietnamese Cuisine 🍜\n\nVietnam is famous for its diverse and rich cuisine. Each region has its own distinctive dishes.\n\n### Popular Dishes:\n- **Phở**: Noodle soup with beef or chicken\n- **Bánh mì**: French-style baguette with Vietnamese fillings\n- **Bún chả**: Rice noodles with grilled pork (Hanoi specialty)\n- **Cơm tấm**: Broken rice with grilled pork chop (Saigon specialty)`,
        vocabulary: [
          { word: "phở", meaning: "món soup bún truyền thống", meaningEn: "traditional noodle soup", example: "Phở bò Hà Nội rất nổi tiếng.", exampleEn: "Hanoi beef pho is very famous.", partOfSpeech: "noun" },
          { word: "bánh mì", meaning: "bánh mì ổ kiểu Việt", meaningEn: "Vietnamese baguette sandwich", example: "Tôi muốn mua một ổ bánh mì.", exampleEn: "I want to buy a banh mi.", partOfSpeech: "noun" },
          { word: "ngon", meaning: "có vị tốt, hấp dẫn", meaningEn: "delicious", example: "Món này rất ngon!", exampleEn: "This dish is very delicious!", partOfSpeech: "adjective" },
          { word: "cay", meaning: "có vị nóng, ớt", meaningEn: "spicy", example: "Bún bò Huế rất cay.", exampleEn: "Hue beef noodle soup is very spicy.", partOfSpeech: "adjective" },
          { word: "ngọt", meaning: "có vị đường", meaningEn: "sweet", example: "Chè Việt Nam rất ngọt.", exampleEn: "Vietnamese dessert soup is very sweet.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "'Phở' là món gì?", questionEn: "What is 'phở'?", options: ["Bánh", "Soup bún", "Xôi", "Cơm"], answer: 1, explanation: "Phở là món soup bún truyền thống của Việt Nam.", explanationEn: "Phở is a traditional Vietnamese noodle soup." },
          { question: "Từ 'ngon' có nghĩa là gì?", questionEn: "What does 'ngon' mean?", options: ["Ugly", "Spicy", "Delicious", "Cold"], answer: 2, explanation: "'Ngon' nghĩa là có vị tốt, hấp dẫn.", explanationEn: "'Ngon' means delicious or tasty." },
        ],
      },
      {
        id: "vn-vocab-family",
        title: "Gia đình & Quan hệ",
        titleEn: "Family & Relationships",
        level: "beginner",
        theory: `## Gia đình Việt Nam 👨‍👩‍👧‍👦\n\nGia đình là nền tảng của xã hội Việt Nam. Hệ thống xưng hô trong gia đình rất phức tạp.\n\n### Cách gọi trong gia đình:\n- **Bố/Ba** – Father\n- **Mẹ/Má** – Mother\n- **Anh** – Older brother\n- **Chị** – Older sister\n- **Em** – Younger sibling\n- **Ông nội** – Paternal grandfather\n- **Bà ngoại** – Maternal grandmother`,
        theoryEn: `## Vietnamese Family 👨‍👩‍👧‍👦\n\nFamily is the foundation of Vietnamese society. The family address system is very complex.\n\n### Family Terms:\n- **Bố/Ba** – Father\n- **Mẹ/Má** – Mother\n- **Anh** – Older brother\n- **Chị** – Older sister\n- **Em** – Younger sibling\n- **Ông nội** – Paternal grandfather\n- **Bà ngoại** – Maternal grandmother`,
        vocabulary: [
          { word: "bố", meaning: "cha, ba", meaningEn: "father", example: "Bố tôi là bác sĩ.", exampleEn: "My father is a doctor.", partOfSpeech: "noun" },
          { word: "mẹ", meaning: "má, mẫu", meaningEn: "mother", example: "Mẹ tôi nấu ăn rất giỏi.", exampleEn: "My mother cooks very well.", partOfSpeech: "noun" },
          { word: "gia đình", meaning: "tổ ấm, nhà", meaningEn: "family", example: "Gia đình tôi có 4 người.", exampleEn: "My family has 4 people.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Ông nội' là ai?", questionEn: "Who is 'ông nội'?", options: ["Bố của mẹ", "Bố của bố", "Anh của bố", "Chú"], answer: 1, explanation: "Ông nội là bố của bố (paternal grandfather).", explanationEn: "'Ông nội' is your father's father (paternal grandfather)." },
        ],
      },
    ],
  },
  {
    id: "vn-reading",
    title: "Đọc hiểu",
    titleEn: "Reading Comprehension",
    icon: "📚",
    color: "from-blue-500 to-indigo-500",
    description: "Luyện đọc hiểu với các văn bản tiếng Việt đa dạng",
    descriptionEn: "Practice reading comprehension with diverse Vietnamese texts",
    category: "reading",
    lessons: [
      {
        id: "vn-read-1",
        title: "Hà Nội – Thủ đô ngàn năm",
        titleEn: "Hanoi – The Thousand-Year Capital",
        level: "intermediate",
        theory: `## Hà Nội – Thủ đô ngàn năm văn hiến 🏛️\n\nHà Nội, thủ đô của Việt Nam, có lịch sử hơn **1000 năm**. Thành phố được vua Lý Thái Tổ chọn làm kinh đô vào năm **1010** với tên gọi **Thăng Long** (Rồng bay lên).\n\n### Đoạn đọc:\n> Hà Nội là trung tâm chính trị, kinh tế và văn hóa lớn nhất Việt Nam. Với 36 phố phường cổ, Hồ Hoàn Kiếm, và Văn Miếu – Quốc Tử Giám, Hà Nội thu hút hàng triệu du khách mỗi năm. Ẩm thực đường phố Hà Nội được CNN bình chọn là một trong những nền ẩm thực đường phố hấp dẫn nhất thế giới.\n\n### Từ khóa:\n- **Thăng Long**: tên cũ của Hà Nội\n- **Văn Miếu**: Temple of Literature (trường đại học đầu tiên)\n- **Phố cổ**: Old Quarter`,
        theoryEn: `## Hanoi – The Thousand-Year Capital 🏛️\n\nHanoi, the capital of Vietnam, has a history of over **1000 years**. The city was chosen as the capital by King Lý Thái Tổ in **1010**, named **Thăng Long** (Rising Dragon).\n\n### Reading Passage:\n> Hanoi is the largest political, economic, and cultural center of Vietnam. With its 36 ancient streets, Hoàn Kiếm Lake, and the Temple of Literature, Hanoi attracts millions of tourists every year. Hanoi's street food was voted by CNN as one of the most attractive street food scenes in the world.\n\n### Key Terms:\n- **Thăng Long**: ancient name of Hanoi\n- **Văn Miếu**: Temple of Literature (first university)\n- **Phố cổ**: Old Quarter`,
        vocabulary: [
          { word: "thủ đô", meaning: "thành phố trung tâm của quốc gia", meaningEn: "capital city", example: "Hà Nội là thủ đô của Việt Nam.", exampleEn: "Hanoi is the capital of Vietnam.", partOfSpeech: "noun" },
          { word: "văn hiến", meaning: "truyền thống văn hóa lâu đời", meaningEn: "cultural heritage", example: "Hà Nội có ngàn năm văn hiến.", exampleEn: "Hanoi has a thousand years of cultural heritage.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Thăng Long là tên cũ của thành phố nào?", questionEn: "Thang Long is the old name of which city?", options: ["Huế", "Hà Nội", "Sài Gòn", "Đà Nẵng"], answer: 1, explanation: "Thăng Long là tên cũ của Hà Nội, đặt năm 1010.", explanationEn: "Thang Long is the old name of Hanoi, given in 1010." },
        ],
      },
    ],
  },
  {
    id: "vn-folklore",
    title: "Ca Dao & Tục Ngữ",
    titleEn: "Folklore & Proverbs",
    icon: "🌾",
    color: "from-green-600 to-emerald-500",
    description: "Học ngữ pháp tự nhiên qua ca dao, tục ngữ Việt Nam",
    descriptionEn: "Learn grammar naturally through Vietnamese folklore and proverbs",
    category: "folklore",
    lessons: [
      {
        id: "vn-folk-1",
        title: "Ca Dao về gia đình",
        titleEn: "Folk Songs About Family",
        level: "intermediate",
        theory: `## Ca Dao về Gia đình 🌾\n\nCa dao là thơ dân gian Việt Nam, truyền miệng qua nhiều thế hệ. Ca dao giúp học ngữ pháp tự nhiên và hiểu văn hóa.\n\n### Ca dao nổi tiếng:\n\n> **"Công cha như núi Thái Sơn,\n> Nghĩa mẹ như nước trong nguồn chảy ra.\n> Một lòng thờ mẹ kính cha,\n> Cho tròn chữ hiếu mới là đạo con."**\n\n**Nghĩa**: Công lao của cha mẹ rất lớn, con cái phải hiếu thảo.\n\n### Phân tích ngữ pháp:\n- **như** = like/as (so sánh)\n- **một lòng** = wholeheartedly\n- **mới là** = only then is it (emphasis structure)`,
        theoryEn: `## Folk Songs About Family 🌾\n\nCa dao (folk poetry) is Vietnamese oral poetry passed down through generations. It helps learn grammar naturally and understand culture.\n\n### Famous Folk Song:\n\n> **"Công cha như núi Thái Sơn,\n> Nghĩa mẹ như nước trong nguồn chảy ra.\n> Một lòng thờ mẹ kính cha,\n> Cho tròn chữ hiếu mới là đạo con."**\n\n**Meaning**: Parents' contributions are immense; children must be filial.\n\n### Grammar Analysis:\n- **như** = like/as (comparison)\n- **một lòng** = wholeheartedly\n- **mới là** = only then is it (emphasis structure)`,
        vocabulary: [
          { word: "công", meaning: "công lao, đóng góp", meaningEn: "merit, contribution", example: "Công cha mẹ rất lớn.", exampleEn: "Parents' contributions are immense.", partOfSpeech: "noun" },
          { word: "hiếu", meaning: "lòng kính trọng cha mẹ", meaningEn: "filial piety", example: "Chữ hiếu rất quan trọng.", exampleEn: "Filial piety is very important.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Trong ca dao, 'công cha' được ví như gì?", questionEn: "In the folk song, what is 'father's merit' compared to?", options: ["Biển", "Núi Thái Sơn", "Sông", "Trời"], answer: 1, explanation: "'Công cha như núi Thái Sơn' – ví công cha như núi cao.", explanationEn: "'Father's merit is like Mount Thai Son' – compared to a tall mountain." },
        ],
      },
    ],
  },
];

// ===================== HISTORY TIMELINE =====================

export const historyTimeline: HistoryEvent[] = [
  { year: "2879 TCN", title: "Hùng Vương lập nước", titleEn: "Hung Kings Founded the Nation", description: "Vua Hùng lập ra nước Văn Lang, quốc gia đầu tiên của người Việt.", descriptionEn: "King Hung founded Van Lang, the first nation of the Vietnamese people." },
  { year: "257 TCN", title: "An Dương Vương lập Âu Lạc", titleEn: "An Duong Vuong Founded Au Lac", description: "Thục Phán đánh bại Hùng Vương, lập nước Âu Lạc, xây thành Cổ Loa.", descriptionEn: "Thuc Phan defeated the Hung Kings, founded Au Lac, and built Co Loa citadel." },
  { year: "938", title: "Ngô Quyền đại thắng Bạch Đằng", titleEn: "Ngo Quyen's Bach Dang Victory", description: "Ngô Quyền đánh bại quân Nam Hán trên sông Bạch Đằng, chấm dứt 1000 năm Bắc thuộc.", descriptionEn: "Ngo Quyen defeated the Southern Han army on Bach Dang River, ending 1000 years of Chinese rule." },
  { year: "1010", title: "Lý Thái Tổ dời đô về Thăng Long", titleEn: "Ly Thai To Moved Capital to Thang Long", description: "Vua Lý Thái Tổ dời đô từ Hoa Lư về Thăng Long (Hà Nội ngày nay).", descriptionEn: "King Ly Thai To moved the capital from Hoa Lu to Thang Long (today's Hanoi)." },
  { year: "1288", title: "Trần Hưng Đạo thắng quân Nguyên", titleEn: "Tran Hung Dao Defeated the Mongols", description: "Hưng Đạo Vương đại thắng quân Nguyên Mông lần thứ 3 trên sông Bạch Đằng.", descriptionEn: "General Tran Hung Dao defeated the Mongol army for the third time on Bach Dang River." },
  { year: "1428", title: "Lê Lợi đánh đuổi quân Minh", titleEn: "Le Loi Expelled the Ming Dynasty", description: "Lê Lợi lãnh đạo khởi nghĩa Lam Sơn, đánh đuổi quân Minh, lập nhà Hậu Lê.", descriptionEn: "Le Loi led the Lam Son uprising, expelled the Ming Dynasty, and founded the Later Le Dynasty." },
  { year: "1789", title: "Quang Trung đại phá quân Thanh", titleEn: "Quang Trung Defeated the Qing Army", description: "Hoàng đế Quang Trung tiến quân thần tốc, đại phá 29 vạn quân Thanh trong 5 ngày.", descriptionEn: "Emperor Quang Trung launched a lightning attack, crushing 290,000 Qing troops in 5 days." },
  { year: "1945", title: "Cách mạng Tháng Tám", titleEn: "August Revolution", description: "Cách mạng thành công, Hồ Chí Minh đọc Tuyên ngôn Độc lập ngày 2/9/1945.", descriptionEn: "The revolution succeeded; Ho Chi Minh read the Declaration of Independence on September 2, 1945." },
  { year: "1954", title: "Chiến thắng Điện Biên Phủ", titleEn: "Victory at Dien Bien Phu", description: "Chiến thắng lịch sử chấm dứt sự đô hộ của Pháp tại Đông Dương.", descriptionEn: "The historic victory ended French colonial rule in Indochina." },
  { year: "1975", title: "Thống nhất đất nước", titleEn: "National Reunification", description: "Miền Nam được giải phóng, đất nước thống nhất ngày 30/4/1975.", descriptionEn: "The South was liberated, and the country was reunified on April 30, 1975." },
  { year: "1986", title: "Đổi Mới", titleEn: "Doi Moi Reform", description: "Chính sách Đổi Mới mở cửa nền kinh tế, đưa Việt Nam hội nhập quốc tế.", descriptionEn: "The Doi Moi policy opened the economy, integrating Vietnam into the global community." },
  { year: "2007", title: "Gia nhập WTO", titleEn: "Joined WTO", description: "Việt Nam chính thức gia nhập Tổ chức Thương mại Thế giới.", descriptionEn: "Vietnam officially joined the World Trade Organization." },
];

// ===================== HISTORY MONTHS =====================

export const historyMonths: HistoryMonth[] = [
  {
    id: "hist-month-1",
    month: 1,
    title: "Thời kỳ Dựng nước",
    titleEn: "Early Kingdoms",
    icon: "🏔️",
    color: "from-amber-600 to-yellow-500",
    description: "Hùng Vương, Âu Lạc, và chiến thắng Bạch Đằng của Ngô Quyền",
    descriptionEn: "Hung Kings, Au Lac, and Ngo Quyen's Bach Dang Victory",
    lessons: [
      {
        id: "hist-1-1",
        title: "Sự tích Hùng Vương và nước Văn Lang",
        titleEn: "The Legend of Hung Kings and Van Lang",
        story: "Theo truyền thuyết, Lạc Long Quân và Âu Cơ sinh ra 100 người con. 50 người theo mẹ lên núi, 50 người theo cha xuống biển. Người con cả lên ngôi, lấy hiệu Hùng Vương, lập ra nước Văn Lang – quốc gia đầu tiên của người Việt. Kinh đô đặt tại Phong Châu (Phú Thọ ngày nay). Nước Văn Lang tồn tại khoảng 2.600 năm với 18 đời vua Hùng.",
        storyEn: "According to legend, Lac Long Quan and Au Co gave birth to 100 children. 50 followed their mother to the mountains, and 50 followed their father to the sea. The eldest son ascended the throne as Hung Vuong, founding Van Lang – the first nation of the Vietnamese people. The capital was at Phong Chau (today's Phu Tho). Van Lang lasted about 2,600 years with 18 Hung Kings.",
        keyDates: [
          { year: "2879 TCN", title: "Lập nước Văn Lang", titleEn: "Founded Van Lang", description: "Hùng Vương thứ nhất lên ngôi.", descriptionEn: "The first Hung King ascended the throne." },
          { year: "~700 TCN", title: "Thời kỳ đồ đồng Đông Sơn", titleEn: "Dong Son Bronze Age", description: "Trống đồng Đông Sơn – biểu tượng văn hóa Việt cổ.", descriptionEn: "Dong Son bronze drums – symbol of ancient Vietnamese culture." },
        ],
        quiz: [
          { question: "Nước Văn Lang có bao nhiêu đời vua Hùng?", questionEn: "How many Hung Kings ruled Van Lang?", options: ["10", "15", "18", "20"], answer: 2, explanation: "Nước Văn Lang trải qua 18 đời vua Hùng.", explanationEn: "Van Lang had 18 generations of Hung Kings." },
          { question: "Kinh đô Văn Lang ở đâu?", questionEn: "Where was Van Lang's capital?", options: ["Hà Nội", "Phong Châu", "Huế", "Hoa Lư"], answer: 1, explanation: "Kinh đô Văn Lang đặt tại Phong Châu (Phú Thọ).", explanationEn: "Van Lang's capital was at Phong Chau (Phu Tho)." },
        ],
      },
      {
        id: "hist-1-2",
        title: "Ngô Quyền và trận Bạch Đằng 938",
        titleEn: "Ngo Quyen and the Battle of Bach Dang 938",
        story: "Sau hơn 1000 năm bị các triều đại phương Bắc đô hộ, Ngô Quyền đã lập kế sách cắm cọc nhọn bọc sắt xuống lòng sông Bạch Đằng. Khi thủy triều lên, ông dụ chiến thuyền quân Nam Hán vào trận. Khi thủy triều rút, thuyền địch bị mắc cạn và cọc nhọn đâm xuyên. Chiến thắng này chấm dứt hơn 1000 năm Bắc thuộc, mở ra kỷ nguyên độc lập cho Việt Nam.",
        storyEn: "After over 1000 years of Chinese rule, Ngo Quyen devised a plan to plant iron-tipped wooden stakes in the Bach Dang River. When the tide rose, he lured the Southern Han warships into battle. When the tide retreated, the enemy ships were impaled on the stakes. This victory ended over 1000 years of Chinese domination and opened a new era of independence for Vietnam.",
        keyDates: [
          { year: "938", title: "Trận Bạch Đằng", titleEn: "Battle of Bach Dang", description: "Ngô Quyền đánh tan quân Nam Hán.", descriptionEn: "Ngo Quyen destroyed the Southern Han fleet." },
          { year: "939", title: "Ngô Quyền xưng vương", titleEn: "Ngo Quyen Proclaimed King", description: "Lập triều Ngô, đóng đô tại Cổ Loa.", descriptionEn: "Founded the Ngo Dynasty, capital at Co Loa." },
        ],
        quiz: [
          { question: "Ngô Quyền dùng chiến thuật gì ở sông Bạch Đằng?", questionEn: "What tactic did Ngo Quyen use at Bach Dang River?", options: ["Phục kích trên bờ", "Cắm cọc nhọn dưới sông", "Đốt thuyền địch", "Xây tường thành"], answer: 1, explanation: "Ngô Quyền cắm cọc nhọn bọc sắt dưới lòng sông.", explanationEn: "Ngo Quyen planted iron-tipped stakes in the riverbed." },
        ],
      },
    ],
  },
  {
    id: "hist-month-2",
    month: 2,
    title: "Các Triều đại Hoàng kim",
    titleEn: "The Golden Dynasties",
    icon: "👑",
    color: "from-yellow-500 to-amber-600",
    description: "Nhà Lý, Trần, Lê – thời kỳ rực rỡ nhất",
    descriptionEn: "Ly, Tran, Le Dynasties – the most glorious periods",
    lessons: [
      {
        id: "hist-2-1",
        title: "Nhà Lý – Dời đô và xây dựng quốc gia",
        titleEn: "Ly Dynasty – Moving the Capital",
        story: "Năm 1010, Lý Thái Tổ (Lý Công Uẩn) dời đô từ Hoa Lư về Đại La, đổi tên thành Thăng Long. Truyền thuyết kể rằng khi thuyền vua đến Đại La, có rồng vàng bay lên, nên đặt tên Thăng Long (Rồng bay lên). Nhà Lý xây dựng Văn Miếu (1070) – trường đại học đầu tiên của Việt Nam, và Quốc Tử Giám (1076).",
        storyEn: "In 1010, Ly Thai To (Ly Cong Uan) moved the capital from Hoa Lu to Dai La, renaming it Thang Long. Legend says when the king's boat arrived at Dai La, a golden dragon flew up, hence the name Thang Long (Rising Dragon). The Ly Dynasty built the Temple of Literature (1070) – Vietnam's first university, and the Imperial Academy (1076).",
        keyDates: [
          { year: "1010", title: "Dời đô về Thăng Long", titleEn: "Capital Moved to Thang Long", description: "Lý Thái Tổ chọn Thăng Long làm kinh đô.", descriptionEn: "Ly Thai To chose Thang Long as the capital." },
          { year: "1070", title: "Xây Văn Miếu", titleEn: "Temple of Literature Built", description: "Trường đại học đầu tiên của Việt Nam.", descriptionEn: "Vietnam's first university was established." },
        ],
        quiz: [
          { question: "Thăng Long có nghĩa là gì?", questionEn: "What does 'Thang Long' mean?", options: ["Rồng vàng", "Rồng bay lên", "Thành phố rồng", "Rồng thiêng"], answer: 1, explanation: "Thăng Long nghĩa là 'Rồng bay lên'.", explanationEn: "'Thang Long' means 'Rising Dragon'." },
        ],
      },
      {
        id: "hist-2-2",
        title: "Nhà Trần – Đại thắng quân Nguyên Mông",
        titleEn: "Tran Dynasty – Defeating the Mongols",
        story: "Nhà Trần 3 lần đánh bại quân Nguyên Mông (1258, 1285, 1288) – đế chế hùng mạnh nhất thế giới lúc bấy giờ. Trần Hưng Đạo là vị tướng tài ba nhất, ông viết 'Hịch tướng sĩ' để khích lệ tinh thần binh sĩ. Trận Bạch Đằng 1288 là chiến thắng quyết định, sử dụng chiến thuật cọc nhọn tương tự Ngô Quyền.",
        storyEn: "The Tran Dynasty defeated the Mongol Empire three times (1258, 1285, 1288) – the most powerful empire in the world at that time. Tran Hung Dao was the greatest general, who wrote the famous 'Proclamation to Officers' to boost soldiers' morale. The Battle of Bach Dang 1288 was the decisive victory, using iron-tipped stakes similar to Ngo Quyen's strategy.",
        keyDates: [
          { year: "1258", title: "Kháng chiến chống Nguyên lần 1", titleEn: "First Mongol Resistance", description: "Nhà Trần đánh lui quân Nguyên.", descriptionEn: "The Tran Dynasty repelled the Mongols." },
          { year: "1288", title: "Đại thắng Bạch Đằng", titleEn: "Great Victory at Bach Dang", description: "Trần Hưng Đạo đại phá quân Nguyên.", descriptionEn: "Tran Hung Dao crushed the Mongol army." },
        ],
        quiz: [
          { question: "Nhà Trần đánh bại quân Nguyên Mông bao nhiêu lần?", questionEn: "How many times did the Tran Dynasty defeat the Mongols?", options: ["1", "2", "3", "4"], answer: 2, explanation: "Nhà Trần 3 lần đánh bại quân Nguyên Mông.", explanationEn: "The Tran Dynasty defeated the Mongols 3 times." },
        ],
      },
    ],
  },
  {
    id: "hist-month-3",
    month: 3,
    title: "Lịch sử Cận đại",
    titleEn: "Modern History",
    icon: "⭐",
    color: "from-red-600 to-red-500",
    description: "Phong trào độc lập và thời đại Hồ Chí Minh",
    descriptionEn: "Independence movements and the Ho Chi Minh Era",
    lessons: [
      {
        id: "hist-3-1",
        title: "Hồ Chí Minh và Cách mạng Tháng Tám",
        titleEn: "Ho Chi Minh and the August Revolution",
        story: "Hồ Chí Minh (1890-1969) là lãnh tụ vĩ đại của dân tộc Việt Nam. Sau 30 năm bôn ba tìm đường cứu nước, Người về nước lãnh đạo cách mạng. Ngày 2/9/1945, tại Quảng trường Ba Đình, Người đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa. Bản tuyên ngôn mở đầu bằng câu nổi tiếng: 'Tất cả mọi người đều sinh ra có quyền bình đẳng.'",
        storyEn: "Ho Chi Minh (1890-1969) was the great leader of the Vietnamese nation. After 30 years abroad seeking a way to save the country, he returned to lead the revolution. On September 2, 1945, at Ba Dinh Square, he read the Declaration of Independence, founding the Democratic Republic of Vietnam. The declaration famously begins: 'All men are created equal.'",
        keyDates: [
          { year: "1945", title: "Cách mạng Tháng Tám", titleEn: "August Revolution", description: "Cách mạng thành công, khai sinh nước VNDCCH.", descriptionEn: "Revolution succeeded, founding the DRV." },
          { year: "1954", title: "Điện Biên Phủ", titleEn: "Dien Bien Phu", description: "Chiến thắng lịch sử chấm dứt đô hộ Pháp.", descriptionEn: "Historic victory ending French colonialism." },
        ],
        quiz: [
          { question: "Hồ Chí Minh đọc Tuyên ngôn Độc lập vào ngày nào?", questionEn: "When did Ho Chi Minh read the Declaration of Independence?", options: ["1/1/1945", "2/9/1945", "19/8/1945", "30/4/1945"], answer: 1, explanation: "Ngày 2/9/1945, tại Quảng trường Ba Đình.", explanationEn: "September 2, 1945, at Ba Dinh Square." },
        ],
      },
    ],
  },
  {
    id: "hist-month-4",
    month: 4,
    title: "Việt Nam Đương đại",
    titleEn: "Contemporary Vietnam",
    icon: "🌏",
    color: "from-emerald-600 to-teal-500",
    description: "Đổi Mới, hội nhập quốc tế và phát triển",
    descriptionEn: "Doi Moi reform, global integration and development",
    lessons: [
      {
        id: "hist-4-1",
        title: "Đổi Mới và Hội nhập Quốc tế",
        titleEn: "Doi Moi and Global Integration",
        story: "Năm 1986, Việt Nam thực hiện chính sách Đổi Mới, chuyển đổi từ kinh tế kế hoạch tập trung sang kinh tế thị trường định hướng xã hội chủ nghĩa. Đây là bước ngoặt lịch sử giúp Việt Nam thoát khỏi khủng hoảng kinh tế, thu hút đầu tư nước ngoài, và hội nhập vào nền kinh tế toàn cầu. Năm 2007, Việt Nam gia nhập WTO, đánh dấu bước hội nhập sâu rộng vào cộng đồng quốc tế.",
        storyEn: "In 1986, Vietnam implemented the Doi Moi (Renovation) policy, transitioning from a centrally planned economy to a socialist-oriented market economy. This was a historic turning point that helped Vietnam overcome the economic crisis, attract foreign investment, and integrate into the global economy. In 2007, Vietnam joined the WTO, marking deep integration into the international community.",
        keyDates: [
          { year: "1986", title: "Đổi Mới", titleEn: "Doi Moi Reform", description: "Mở cửa nền kinh tế Việt Nam.", descriptionEn: "Opening of Vietnam's economy." },
          { year: "2007", title: "Gia nhập WTO", titleEn: "WTO Membership", description: "Hội nhập kinh tế quốc tế.", descriptionEn: "International economic integration." },
        ],
        quiz: [
          { question: "Chính sách Đổi Mới bắt đầu năm nào?", questionEn: "When did the Doi Moi policy begin?", options: ["1975", "1980", "1986", "1990"], answer: 2, explanation: "Đổi Mới bắt đầu từ năm 1986.", explanationEn: "Doi Moi began in 1986." },
        ],
      },
    ],
  },
];

// ===================== FACT OR MYTH GAME =====================

export const factOrMythItems: FactOrMythItem[] = [
  { id: "fom-1", statement: "Việt Nam có 54 dân tộc.", statementEn: "Vietnam has 54 ethnic groups.", isFact: true, explanation: "Đúng! Việt Nam có 54 dân tộc, trong đó dân tộc Kinh chiếm đa số.", explanationEn: "Correct! Vietnam has 54 ethnic groups, with the Kinh being the majority.", category: "culture" },
  { id: "fom-2", statement: "Phở có nguồn gốc từ miền Nam.", statementEn: "Pho originated from Southern Vietnam.", isFact: false, explanation: "Sai! Phở có nguồn gốc từ miền Bắc Việt Nam, đặc biệt là Hà Nội và Nam Định.", explanationEn: "False! Pho originated from Northern Vietnam, especially Hanoi and Nam Dinh.", category: "culture" },
  { id: "fom-3", statement: "Quang Trung đại phá 29 vạn quân Thanh chỉ trong 5 ngày.", statementEn: "Quang Trung defeated 290,000 Qing troops in just 5 days.", isFact: true, explanation: "Đúng! Chiến dịch thần tốc Tết Kỷ Dậu 1789.", explanationEn: "Correct! The lightning Tet Ky Dau campaign of 1789.", category: "history" },
  { id: "fom-4", statement: "Hồ Gươm có tên gốc là Hồ Lục Thủy.", statementEn: "Hoan Kiem Lake was originally called Luc Thuy Lake.", isFact: true, explanation: "Đúng! Hồ Hoàn Kiếm trước đây gọi là Hồ Lục Thủy (Green Water Lake).", explanationEn: "Correct! Hoan Kiem Lake was formerly called Luc Thuy (Green Water Lake).", category: "geography" },
  { id: "fom-5", statement: "Nhà Trần đánh bại quân Nguyên Mông 4 lần.", statementEn: "The Tran Dynasty defeated the Mongols 4 times.", isFact: false, explanation: "Sai! Nhà Trần đánh bại quân Nguyên Mông 3 lần (1258, 1285, 1288).", explanationEn: "False! The Tran Dynasty defeated the Mongols 3 times (1258, 1285, 1288).", category: "history" },
  { id: "fom-6", statement: "Hang Sơn Đoòng là hang động lớn nhất thế giới.", statementEn: "Son Doong Cave is the largest cave in the world.", isFact: true, explanation: "Đúng! Hang Sơn Đoòng ở Quảng Bình là hang động tự nhiên lớn nhất thế giới.", explanationEn: "Correct! Son Doong Cave in Quang Binh is the world's largest natural cave.", category: "geography" },
  { id: "fom-7", statement: "Chữ Quốc ngữ do người Việt sáng tạo.", statementEn: "The Vietnamese alphabet was created by Vietnamese people.", isFact: false, explanation: "Sai! Chữ Quốc ngữ do các giáo sĩ phương Tây (đặc biệt Alexandre de Rhodes) phát triển dựa trên bảng chữ cái Latin.", explanationEn: "False! The Vietnamese alphabet was developed by Western missionaries (notably Alexandre de Rhodes) based on the Latin alphabet.", category: "culture" },
  { id: "fom-8", statement: "Việt Nam có đường bờ biển dài hơn 3.000 km.", statementEn: "Vietnam has a coastline longer than 3,000 km.", isFact: true, explanation: "Đúng! Đường bờ biển Việt Nam dài khoảng 3.260 km.", explanationEn: "Correct! Vietnam's coastline is approximately 3,260 km long.", category: "geography" },
];

// ===================== FOLKLORE / CA DAO =====================

export const folkloreItems: FolkloreItem[] = [
  {
    id: "folk-1",
    title: "Công cha nghĩa mẹ",
    titleEn: "Parents' Merit",
    type: "ca-dao",
    content: "Công cha như núi Thái Sơn,\nNghĩa mẹ như nước trong nguồn chảy ra.\nMột lòng thờ mẹ kính cha,\nCho tròn chữ hiếu mới là đạo con.",
    contentEn: "Father's merit is like Mount Thai Son,\nMother's love is like water from the source.\nWholeheartedly respect your parents,\nTo fulfill filial piety is the way of a child.",
    grammarNote: "Cấu trúc so sánh 'như' (like/as): A như B",
    grammarNoteEn: "Comparison structure 'như' (like/as): A như B",
    meaning: "Ca ngợi công lao cha mẹ, nhắc nhở con cái phải hiếu thảo.",
    meaningEn: "Praises parents' contributions and reminds children to be filial.",
  },
  {
    id: "folk-2",
    title: "Tục ngữ về học tập",
    titleEn: "Proverb About Learning",
    type: "tuc-ngu",
    content: "Không thầy đố mày làm nên.",
    contentEn: "Without a teacher, try to succeed on your own (implying you can't).",
    grammarNote: "Cấu trúc phủ định + thách thức: 'Không... đố... làm nên'",
    grammarNoteEn: "Negation + challenge structure: 'Không... đố... làm nên'",
    meaning: "Nhấn mạnh vai trò quan trọng của thầy cô trong việc học.",
    meaningEn: "Emphasizes the crucial role of teachers in learning.",
  },
  {
    id: "folk-3",
    title: "Có công mài sắt",
    titleEn: "Persistence Pays Off",
    type: "tuc-ngu",
    content: "Có công mài sắt, có ngày nên kim.",
    contentEn: "If you persist in grinding iron, one day it will become a needle.",
    grammarNote: "Cấu trúc điều kiện ngầm: 'Có... có ngày...'",
    grammarNoteEn: "Implicit conditional: 'Có (if you have)... có ngày (one day)...'",
    meaning: "Kiên trì thì sẽ thành công.",
    meaningEn: "With persistence, you will succeed.",
  },
  {
    id: "folk-4",
    title: "Truyện Tấm Cám",
    titleEn: "The Tale of Tam and Cam",
    type: "truyen-co",
    content: "Tấm Cám là câu chuyện cổ tích nổi tiếng nhất Việt Nam. Tấm – cô gái mồ côi, hiền lành nhưng bị mẹ kế và Cám hãm hại. Nhờ sự giúp đỡ của Bụt (ông tiên), Tấm được đi dự hội, gặp vua và trở thành hoàng hậu.",
    contentEn: "Tam Cam is Vietnam's most famous fairy tale. Tam – an orphan girl, kind but mistreated by her stepmother and Cam. With the help of But (a fairy), Tam attended the festival, met the king, and became queen.",
    grammarNote: "Từ vựng cổ tích: Bụt (fairy godfather), mồ côi (orphan), hoàng hậu (queen)",
    grammarNoteEn: "Fairy tale vocabulary: Bụt (fairy godfather), mồ côi (orphan), hoàng hậu (queen)",
    meaning: "Thiện thắng ác – người tốt sẽ được đền đáp.",
    meaningEn: "Good triumphs over evil – good people will be rewarded.",
  },
];
