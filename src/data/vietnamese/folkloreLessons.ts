// Vietnamese folklore language lessons — 20 lessons across 2 modules (10 per module)
import type { VietnameseModule } from "./types";

export const folkloreLanguageModules: VietnameseModule[] = [
  {
    id: "vn-folklore",
    title: "Ca Dao & Tục Ngữ",
    titleEn: "Folk Songs & Proverbs",
    icon: "🌾",
    color: "from-green-600 to-emerald-500",
    description: "Học ngữ pháp qua ca dao, tục ngữ dân gian",
    descriptionEn: "Learn grammar through folk poetry and proverbs",
    category: "folklore",
    lessons: [
      {
        id: "vn-folk-1", title: "Ca Dao về gia đình", titleEn: "Family Folk Songs", level: "intermediate",
        theory: `## Ca Dao về Gia đình 🌾\n\n> **"Công cha như núi Thái Sơn,\n> Nghĩa mẹ như nước trong nguồn chảy ra."**\n\n### Phân tích: **như** = like (so sánh), **một lòng** = wholeheartedly`,
        theoryEn: `## Family Folk Songs\n\n> "Father's merit is like Mount Thai Son, Mother's love is like water from the source."`,
        vocabulary: [
          { word: "công", meaning: "công lao", meaningEn: "merit", example: "Công cha rất lớn.", exampleEn: "Father's merit is great.", partOfSpeech: "noun" },
          { word: "hiếu", meaning: "kính trọng cha mẹ", meaningEn: "filial piety", example: "Chữ hiếu quan trọng.", exampleEn: "Filial piety is important.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Công cha' ví như gì?", questionEn: "Father's merit compared to?", options: ["Biển", "Núi Thái Sơn", "Sông", "Trời"], answer: 1, explanation: "Núi Thái Sơn.", explanationEn: "Mount Thai Son." },
        ],
      },
      {
        id: "vn-folk-2", title: "Tục ngữ về học tập", titleEn: "Learning Proverbs", level: "intermediate",
        theory: `## Tục ngữ Học tập 📚\n\n1. **"Không thầy đố mày làm nên"**\n2. **"Học ăn, học nói, học gói, học mở"**\n3. **"Đi một ngày đàng, học một sàng khôn"**`,
        theoryEn: `## Learning Proverbs\n\n1. Without a teacher, try succeeding\n2. Learn eating, speaking, wrapping, unwrapping\n3. Travel a day, learn a sieve of wisdom`,
        vocabulary: [
          { word: "thầy", meaning: "giáo viên", meaningEn: "teacher", example: "Tôn sư trọng đạo.", exampleEn: "Respect the teacher.", partOfSpeech: "noun" },
          { word: "khôn", meaning: "thông minh", meaningEn: "wise", example: "Học cho khôn.", exampleEn: "Study to be wise.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "'Đi một ngày đàng' dạy gì?", questionEn: "What does it teach?", options: ["Ở nhà", "Đi nhiều học nhiều", "Đừng đi", "Học ở trường"], answer: 1, explanation: "Trải nghiệm giúp học hỏi.", explanationEn: "Experience helps learning." },
        ],
      },
      {
        id: "vn-folk-3", title: "Ca dao về tình yêu", titleEn: "Love Folk Songs", level: "intermediate",
        theory: `## Ca Dao Tình yêu 💕\n\n> **"Thuyền ơi có nhớ bến chăng,\n> Bến thì một dạ khăng khăng đợi thuyền."**\n\nẨn dụ: Thuyền = chàng trai, Bến = cô gái`,
        theoryEn: `## Love Folk Songs\n\n> "Oh boat, do you remember the dock? The dock wholeheartedly waits."`,
        vocabulary: [
          { word: "thuyền", meaning: "phương tiện nước", meaningEn: "boat (metaphor: man)", example: "Thuyền đi, bến đợi.", exampleEn: "Boat goes, dock waits.", partOfSpeech: "noun" },
          { word: "bến", meaning: "nơi thuyền đỗ", meaningEn: "dock (metaphor: woman)", example: "Bến chờ thuyền.", exampleEn: "Dock waits for boat.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Thuyền' ẩn dụ cho?", questionEn: "Boat metaphor for?", options: ["Cô gái", "Chàng trai", "Bố mẹ", "Con cái"], answer: 1, explanation: "Chàng trai.", explanationEn: "The man." },
        ],
      },
      {
        id: "vn-folk-4", title: "Tục ngữ về thiên nhiên", titleEn: "Nature Proverbs", level: "beginner",
        theory: `## Tục ngữ Thiên nhiên 🌤️\n\n1. **"Chuồn chuồn bay thấp thì mưa, bay cao thì nắng, bay vừa thì râm"**\n2. **"Tháng bảy nước nhảy lên bờ"**\n3. **"Ráng mỡ gà, có nhà thì giữ"**`,
        theoryEn: `## Nature Proverbs: Folk weather forecasting.`,
        vocabulary: [
          { word: "chuồn chuồn", meaning: "côn trùng cánh mỏng", meaningEn: "dragonfly", example: "Chuồn chuồn bay thấp.", exampleEn: "Dragonflies fly low.", partOfSpeech: "noun" },
          { word: "lũ lụt", meaning: "nước dâng cao", meaningEn: "flood", example: "Miền Trung hay lũ.", exampleEn: "Central VN floods often.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Chuồn chuồn bay thấp = ?", questionEn: "What does it mean?", options: ["Nắng", "Mưa", "Gió", "Tuyết"], answer: 1, explanation: "Sắp mưa.", explanationEn: "Rain coming." },
        ],
      },
      {
        id: "vn-folk-5", title: "Truyện cổ tích VN", titleEn: "Vietnamese Fairy Tales", level: "intermediate",
        theory: `## Truyện cổ tích 🧚\n\n1. **Tấm Cám** – Vietnamese Cinderella\n2. **Sơn Tinh Thủy Tinh** – Mountain vs Water\n3. **Sự tích Hồ Gươm** – Sword Lake Legend\n4. **Thạch Sanh** – Brave hero\n5. **Cây tre trăm đốt** – Hundred-knot bamboo`,
        theoryEn: `## Vietnamese Fairy Tales\n\nFamous tales with moral lessons.`,
        vocabulary: [
          { word: "cổ tích", meaning: "truyện xưa", meaningEn: "fairy tale", example: "Kể truyện cổ tích.", exampleEn: "Tell a fairy tale.", partOfSpeech: "noun" },
          { word: "thiện", meaning: "tốt", meaningEn: "good / virtuous", example: "Thiện thắng ác.", exampleEn: "Good triumphs evil.", partOfSpeech: "noun/adj" },
        ],
        quiz: [
          { question: "'Tấm Cám' giống truyện nào?", questionEn: "Similar to?", options: ["Snow White", "Cinderella", "Rapunzel", "Sleeping Beauty"], answer: 1, explanation: "Cinderella.", explanationEn: "Cinderella." },
        ],
      },
      // NEW folklore lessons
      {
        id: "vn-folk-11", title: "Ca dao về quê hương", titleEn: "Homeland Folk Songs", level: "intermediate",
        theory: `## Ca Dao Quê hương 🏡\n\n> **"Anh đi anh nhớ quê nhà,\n> Nhớ canh rau muống, nhớ cà dầm tương."**\n\nNhớ quê qua món ăn giản dị.\n\n> **"Đường vô xứ Huế quanh quanh,\n> Non xanh nước biếc như tranh họa đồ."**`,
        theoryEn: `## Homeland Folk Songs\n\nHomesickness expressed through simple foods and beautiful landscapes.`,
        vocabulary: [
          { word: "quê nhà", meaning: "quê hương", meaningEn: "hometown", example: "Nhớ quê nhà.", exampleEn: "Miss hometown.", partOfSpeech: "noun" },
          { word: "rau muống", meaning: "rau phổ biến", meaningEn: "water spinach", example: "Rau muống xào tỏi.", exampleEn: "Stir-fried water spinach.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Nhớ quê qua gì?", questionEn: "Homesickness through?", options: ["Tiền", "Món ăn giản dị", "Xe cộ", "Công nghệ"], answer: 1, explanation: "Qua món ăn.", explanationEn: "Through simple foods." },
        ],
      },
      {
        id: "vn-folk-12", title: "Tục ngữ về đạo đức", titleEn: "Moral Proverbs", level: "intermediate",
        theory: `## Tục ngữ Đạo đức\n\n1. **"Uống nước nhớ nguồn"** – Gratitude\n2. **"Thương người như thể thương thân"** – Compassion\n3. **"Lá lành đùm lá rách"** – Help the unfortunate\n4. **"Một cây làm chẳng nên non"** – Unity`,
        theoryEn: `## Moral Proverbs about gratitude, compassion, and unity.`,
        vocabulary: [
          { word: "nguồn", meaning: "nơi phát sinh", meaningEn: "source", example: "Nhớ nguồn gốc.", exampleEn: "Remember origins.", partOfSpeech: "noun" },
          { word: "đoàn kết", meaning: "hợp tác", meaningEn: "unity", example: "Đoàn kết là sức mạnh.", exampleEn: "Unity is strength.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Lá lành đùm lá rách' dạy gì?", questionEn: "What does it teach?", options: ["Cạnh tranh", "Giúp đỡ", "Tiết kiệm", "Học hành"], answer: 1, explanation: "Giúp đỡ nhau.", explanationEn: "Help each other." },
        ],
      },
      {
        id: "vn-folk-13", title: "Ca dao về lao động", titleEn: "Labor Folk Songs", level: "intermediate",
        theory: `## Ca Dao Lao động ⚒️\n\n> **"Ai ơi bưng bát cơm đầy,\n> Dẻo thơm một hạt, đắng cay muôn phần."**\n\n> **"Tay làm hàm nhai, tay quai miệng trễ."**`,
        theoryEn: `## Labor Folk Songs\n\nEvery grain of rice comes from sweat and tears.`,
        vocabulary: [
          { word: "lao động", meaning: "làm việc", meaningEn: "labor", example: "Lao động là vinh quang.", exampleEn: "Labor is glory.", partOfSpeech: "noun" },
          { word: "mồ hôi", meaning: "nước tiết ra", meaningEn: "sweat", example: "Mồ hôi nông dân.", exampleEn: "Farmer's sweat.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Tay làm hàm nhai' nghĩa gì?", questionEn: "What does it mean?", options: ["Ăn nhiều", "Phải làm mới có ăn", "Tay khỏe", "Ăn ngon"], answer: 1, explanation: "Phải lao động mới có ăn.", explanationEn: "Must work to eat." },
        ],
      },
      {
        id: "vn-folk-14", title: "Tục ngữ về thời gian và cơ hội", titleEn: "Time & Opportunity Proverbs", level: "intermediate",
        theory: `## Tục ngữ Thời gian\n\n1. **"Nước đến chân mới nhảy"** – Wait until the last minute\n2. **"Sớm nắng chiều mưa"** – Things change quickly\n3. **"Thời gian là vàng"** – Time is gold\n4. **"Đánh rắn phải đánh dập đầu"** – Strike at the root`,
        theoryEn: `## Time & Opportunity Proverbs\n\nAdvice about timing and seizing opportunities.`,
        vocabulary: [
          { word: "thời gian", meaning: "khoảng thời gian", meaningEn: "time", example: "Thời gian là vàng.", exampleEn: "Time is gold.", partOfSpeech: "noun" },
          { word: "cơ hội", meaning: "dịp tốt", meaningEn: "opportunity", example: "Nắm bắt cơ hội.", exampleEn: "Seize the opportunity.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Nước đến chân mới nhảy' nghĩa gì?", questionEn: "What does it mean?", options: ["Chủ động", "Chờ đến phút cuối", "Bơi giỏi", "Nhảy xa"], answer: 1, explanation: "Chờ đến phút cuối mới hành động.", explanationEn: "Wait until the last minute." },
        ],
      },
      {
        id: "vn-folk-15", title: "Ca dao về phụ nữ Việt Nam", titleEn: "Folk Songs about Vietnamese Women", level: "advanced",
        theory: `## Ca Dao về Phụ nữ 👩\n\n> **"Thân em như tấm lụa đào,\n> Phất phơ giữa chợ biết vào tay ai."**\n\nSố phận phụ nữ trong xã hội phong kiến.\n\n> **"Con gái mười hai bến nước, trong nhờ đục chịu."**\n\nCuộc đời phụ nữ phụ thuộc vào may rủi.`,
        theoryEn: `## Folk Songs about Women\n\nWomen's fate in feudal society, comparing women to silk in the market, not knowing whose hands they'll fall into.`,
        vocabulary: [
          { word: "thân", meaning: "cuộc đời, bản thân", meaningEn: "fate / self", example: "Thân em như...", exampleEn: "My fate is like...", partOfSpeech: "noun" },
          { word: "lụa", meaning: "vải mịn quý", meaningEn: "silk", example: "Lụa đào mềm mại.", exampleEn: "Pink silk is soft.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Ca dao 'Thân em' nói về gì?", questionEn: "What is it about?", options: ["Thiên nhiên", "Số phận phụ nữ", "Ẩm thực", "Lao động"], answer: 1, explanation: "Số phận phụ nữ trong xã hội cũ.", explanationEn: "Women's fate in old society." },
        ],
      },
    ],
  },
  {
    id: "vn-folklore-advanced",
    title: "Văn học dân gian nâng cao",
    titleEn: "Advanced Folklore",
    icon: "🎭",
    color: "from-amber-500 to-yellow-500",
    description: "Phân tích sâu ca dao, tục ngữ, thành ngữ",
    descriptionEn: "Deep analysis of folk songs, proverbs, idioms",
    category: "folklore",
    lessons: [
      {
        id: "vn-folk-6", title: "Thành ngữ giao tiếp", titleEn: "Conversational Idioms", level: "advanced",
        theory: `## Thành ngữ giao tiếp\n\n- **"Nói có sách, mách có chứng"** – Speak with evidence\n- **"Ông nói gà, bà nói vịt"** – Talking past each other\n- **"Trống đánh xuôi, kèn thổi ngược"** – Contradicting`,
        theoryEn: `## Conversational Idioms for daily use.`,
        vocabulary: [
          { word: "chứng", meaning: "bằng chứng", meaningEn: "evidence", example: "Nói có chứng.", exampleEn: "Speak with evidence.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Ông nói gà, bà nói vịt'?", questionEn: "What does it mean?", options: ["Đồng ý", "Nói không ăn nhập", "Nói hay", "Nói dối"], answer: 1, explanation: "Nói lệch ý nhau.", explanationEn: "Talking past each other." },
        ],
      },
      {
        id: "vn-folk-7", title: "Truyện ngụ ngôn VN", titleEn: "Vietnamese Fables", level: "advanced",
        theory: `## Truyện ngụ ngôn 🐢\n\n### Trâu và ếch: Ếch phồng bụng bằng trâu → nổ tung. Bài học: Đừng tự cao.\n### Thỏ và rùa: Kiên trì hơn tài năng.\n### Đẽo cày giữa đường: Có chính kiến.`,
        theoryEn: `## Vietnamese Fables with moral lessons.`,
        vocabulary: [
          { word: "ngụ ngôn", meaning: "truyện có bài học", meaningEn: "fable", example: "Truyện ngụ ngôn hay.", exampleEn: "A good fable.", partOfSpeech: "noun" },
          { word: "kiên trì", meaning: "không bỏ cuộc", meaningEn: "persistent", example: "Kiên trì thành công.", exampleEn: "Persistence succeeds.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "Bài học Thỏ và Rùa?", questionEn: "Lesson?", options: ["Tài năng nhất", "Kiên trì hơn tài năng", "Chạy nhanh", "Đừng đua"], answer: 1, explanation: "Kiên trì quan trọng hơn.", explanationEn: "Persistence matters more." },
        ],
      },
      {
        id: "vn-folk-8", title: "Truyện Sơn Tinh – Thủy Tinh", titleEn: "Son Tinh – Thuy Tinh Legend", level: "intermediate",
        theory: `## Sơn Tinh – Thủy Tinh 🏔️🌊\n\nVua Hùng gả con gái cho ai mang lễ vật đến trước. Sơn Tinh (Thần Núi) thắng. Thủy Tinh (Thần Nước) tức giận, dâng nước lũ. Hàng năm lũ lụt = Thủy Tinh đánh Sơn Tinh.\n\n**Bài học**: Giải thích hiện tượng lũ lụt.`,
        theoryEn: `## Mountain vs Water Spirit\n\nKing Hung offered his daughter to whoever brought gifts first. Mountain Spirit won. Water Spirit's annual floods = his revenge.`,
        vocabulary: [
          { word: "thần", meaning: "vị thần linh", meaningEn: "god / spirit", example: "Thần Núi.", exampleEn: "Mountain Spirit.", partOfSpeech: "noun" },
          { word: "lũ lụt", meaning: "nước dâng", meaningEn: "flood", example: "Lũ lụt hàng năm.", exampleEn: "Annual floods.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Truyện giải thích hiện tượng gì?", questionEn: "What does it explain?", options: ["Hạn hán", "Lũ lụt", "Động đất", "Sấm sét"], answer: 1, explanation: "Lũ lụt hàng năm.", explanationEn: "Annual flooding." },
        ],
      },
      {
        id: "vn-folk-9", title: "Truyện Thạch Sanh", titleEn: "The Tale of Thach Sanh", level: "intermediate",
        theory: `## Thạch Sanh ⚔️\n\nThạch Sanh – anh hùng dân gian, người tiều phu nghèo nhưng dũng cảm. Chém chằn tinh, cứu công chúa, đánh bại Lý Thông (kẻ phản bội). Cây đàn thần và niêu cơm ăn không hết.\n\n**Bài học**: Người tốt sẽ được đền đáp.`,
        theoryEn: `## Thach Sanh – a poor but brave woodcutter hero. Magic lute and bottomless rice pot.`,
        vocabulary: [
          { word: "anh hùng", meaning: "người dũng cảm", meaningEn: "hero", example: "Thạch Sanh là anh hùng.", exampleEn: "Thach Sanh is a hero.", partOfSpeech: "noun" },
          { word: "phản bội", meaning: "lừa dối", meaningEn: "betray", example: "Lý Thông phản bội.", exampleEn: "Ly Thong betrayed.", partOfSpeech: "verb" },
        ],
        quiz: [
          { question: "Thạch Sanh có vật gì thần kỳ?", questionEn: "Magic items?", options: ["Gươm", "Đàn thần và niêu cơm", "Áo tàng hình", "Giày bay"], answer: 1, explanation: "Đàn thần và niêu cơm.", explanationEn: "Magic lute and rice pot." },
        ],
      },
      {
        id: "vn-folk-10", title: "Sự tích trầu cau", titleEn: "Legend of Betel & Areca", level: "intermediate",
        theory: `## Sự tích Trầu Cau 🌿\n\nHai anh em Tân và Lang giống hệt nhau. Tân lấy vợ, Lang buồn bỏ đi, hóa thành cây cau. Tân đi tìm em, hóa dây trầu quấn quanh cây cau. Vợ đi tìm chồng, hóa tảng đá vôi.\n\n**Bài học**: Tình anh em, vợ chồng thủy chung. Phong tục ăn trầu.`,
        theoryEn: `## Legend of Betel & Areca\n\nTwo identical brothers separated by marriage. Transformed into areca palm, betel vine, and limestone – explaining the betel-chewing tradition.`,
        vocabulary: [
          { word: "trầu cau", meaning: "lá trầu và quả cau", meaningEn: "betel leaf and areca nut", example: "Ăn trầu cau.", exampleEn: "Chew betel.", partOfSpeech: "noun" },
          { word: "thủy chung", meaning: "trung thành", meaningEn: "faithful / loyal", example: "Tình yêu thủy chung.", exampleEn: "Faithful love.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "Truyện giải thích phong tục gì?", questionEn: "What custom?", options: ["Uống trà", "Ăn trầu cau", "Gói bánh", "Thả đèn"], answer: 1, explanation: "Phong tục ăn trầu.", explanationEn: "Betel chewing custom." },
        ],
      },
      // NEW advanced folklore lessons
      {
        id: "vn-folk-16", title: "Tục ngữ về kinh nghiệm sống", titleEn: "Life Experience Proverbs", level: "advanced",
        theory: `## Kinh nghiệm sống\n\n1. **"Ăn quả nhớ kẻ trồng cây"** – Be grateful\n2. **"Gần mực thì đen, gần đèn thì sáng"** – Environment matters\n3. **"Cái khó ló cái khôn"** – Necessity is the mother of invention\n4. **"Có công mài sắt có ngày nên kim"** – Persistence pays off`,
        theoryEn: `## Life wisdom proverbs about gratitude, environment, and persistence.`,
        vocabulary: [
          { word: "mài sắt", meaning: "mài thanh sắt", meaningEn: "grind iron", example: "Mài sắt nên kim.", exampleEn: "Grind iron into needle.", partOfSpeech: "verb phrase" },
          { word: "khôn", meaning: "khéo léo, giỏi", meaningEn: "clever / wise", example: "Cái khó ló cái khôn.", exampleEn: "Necessity breeds invention.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "'Có công mài sắt' dạy gì?", questionEn: "What does it teach?", options: ["Bỏ cuộc", "Kiên trì", "Thông minh", "May mắn"], answer: 1, explanation: "Kiên trì sẽ thành công.", explanationEn: "Persistence succeeds." },
        ],
      },
      {
        id: "vn-folk-17", title: "Truyện Tấm Cám (chi tiết)", titleEn: "Tam Cam – Detailed Analysis", level: "advanced",
        theory: `## Tấm Cám 👗\n\nTấm – cô gái mồ côi, bị mẹ kế và Cám bắt nạt. Nhờ Bụt (fairy) giúp đỡ, Tấm đi dự hội, gặp vua. Cám hại Tấm nhiều lần, Tấm hóa thành chim, cây, quả. Cuối cùng Tấm trở lại.\n\n### So sánh với Cinderella:\n- Giống: Cô gái mồ côi, mẹ kế ác, phép thuật\n- Khác: Tấm bị hại nhiều lần và tái sinh`,
        theoryEn: `## Tam Cam – Vietnamese Cinderella with multiple rebirths.`,
        vocabulary: [
          { word: "mồ côi", meaning: "không có cha mẹ", meaningEn: "orphan", example: "Tấm mồ côi mẹ.", exampleEn: "Tam was motherless.", partOfSpeech: "adjective" },
          { word: "Bụt", meaning: "tiên ông giúp đỡ", meaningEn: "fairy godfather (VN)", example: "Bụt hiện ra.", exampleEn: "The fairy appeared.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Ai giúp đỡ Tấm?", questionEn: "Who helps Tam?", options: ["Vua", "Bụt", "Cám", "Mẹ kế"], answer: 1, explanation: "Bụt (ông Bụt).", explanationEn: "The fairy (But)." },
        ],
      },
      {
        id: "vn-folk-18", title: "Hát quan họ Bắc Ninh", titleEn: "Quan Ho Folk Singing", level: "advanced",
        theory: `## Quan họ 🎵\n\nQuan họ là dân ca đặc trưng của Bắc Ninh, UNESCO công nhận năm 2009. Đặc điểm: hát đối đáp giữa nam (liền anh) và nữ (liền chị), không dùng nhạc cụ.\n\n### Bài nổi tiếng:\n- "Trống cơm"\n- "Người ơi người ở đừng về"`,
        theoryEn: `## Quan Ho – Bac Ninh UNESCO-recognized folk singing tradition, featuring call-and-response between male and female singers.`,
        vocabulary: [
          { word: "dân ca", meaning: "bài hát dân gian", meaningEn: "folk song", example: "Dân ca Bắc Ninh.", exampleEn: "Bac Ninh folk songs.", partOfSpeech: "noun" },
          { word: "đối đáp", meaning: "hát trả lời nhau", meaningEn: "call-and-response", example: "Hát đối đáp.", exampleEn: "Call-and-response singing.", partOfSpeech: "verb" },
        ],
        quiz: [
          { question: "Quan họ từ đâu?", questionEn: "Where is Quan Ho from?", options: ["Huế", "Bắc Ninh", "Hà Nội", "Sài Gòn"], answer: 1, explanation: "Bắc Ninh.", explanationEn: "Bac Ninh." },
        ],
      },
      {
        id: "vn-folk-19", title: "Chèo – Nghệ thuật sân khấu dân gian", titleEn: "Cheo – Folk Theater", level: "advanced",
        theory: `## Chèo 🎭\n\nChèo là nghệ thuật sân khấu dân gian Bắc Bộ, kết hợp hát, múa, và kịch. Ra đời từ thế kỷ 10. Đặc điểm: hài hước, châm biếm xã hội, dùng ngôn ngữ bình dân.\n\n### Vở nổi tiếng:\n- Quan Âm Thị Kính\n- Lưu Bình – Dương Lễ`,
        theoryEn: `## Cheo – Northern Vietnamese folk theater combining singing, dancing, and drama from the 10th century.`,
        vocabulary: [
          { word: "sân khấu", meaning: "nơi biểu diễn", meaningEn: "stage / theater", example: "Nghệ thuật sân khấu.", exampleEn: "Performing arts.", partOfSpeech: "noun" },
          { word: "châm biếm", meaning: "chế giễu", meaningEn: "satirical", example: "Chèo hay châm biếm.", exampleEn: "Cheo is often satirical.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "Chèo bắt nguồn từ vùng nào?", questionEn: "Which region?", options: ["Bắc Bộ", "Trung Bộ", "Nam Bộ", "Tây Nguyên"], answer: 0, explanation: "Bắc Bộ (miền Bắc).", explanationEn: "Northern Vietnam." },
        ],
      },
      {
        id: "vn-folk-20", title: "Tín ngưỡng thờ Mẫu", titleEn: "Mother Goddess Worship", level: "advanced",
        theory: `## Thờ Mẫu 🙏\n\nTín ngưỡng thờ Mẫu (Mother Goddess Worship) được UNESCO công nhận năm 2016. Thờ các vị Thánh Mẫu liên quan đến thiên nhiên: Mẫu Thượng Thiên (Trời), Mẫu Thượng Ngàn (Rừng), Mẫu Thoải (Nước).\n\n### Hầu đồng:\nNghi lễ lên đồng với âm nhạc, trang phục đặc sắc.`,
        theoryEn: `## Mother Goddess Worship – UNESCO-recognized in 2016. Worshiping nature goddesses (Heaven, Forest, Water) with trance rituals and music.`,
        vocabulary: [
          { word: "tín ngưỡng", meaning: "niềm tin", meaningEn: "belief / worship", example: "Tín ngưỡng thờ Mẫu.", exampleEn: "Mother Goddess worship.", partOfSpeech: "noun" },
          { word: "nghi lễ", meaning: "buổi lễ chính thức", meaningEn: "ritual / ceremony", example: "Nghi lễ trang trọng.", exampleEn: "Solemn ritual.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Thờ Mẫu UNESCO công nhận năm?", questionEn: "UNESCO year?", options: ["2010", "2013", "2016", "2020"], answer: 2, explanation: "2016.", explanationEn: "2016." },
        ],
      },
    ],
  },
];
