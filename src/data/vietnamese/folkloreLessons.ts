// Vietnamese folklore language lessons — 10 lessons across 2 modules
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
        theory: `## Ca Dao về Gia đình 🌾\n\n> **"Công cha như núi Thái Sơn,\n> Nghĩa mẹ như nước trong nguồn chảy ra.\n> Một lòng thờ mẹ kính cha,\n> Cho tròn chữ hiếu mới là đạo con."**\n\n### Phân tích:\n- **như** = like (so sánh)\n- **một lòng** = wholeheartedly\n- **mới là** = only then is it`,
        theoryEn: `## Family Folk Songs\n\n> "Father's merit is like Mount Thai Son,\n> Mother's love is like water from the source.\n> Wholeheartedly respect your parents,\n> To fulfill filial piety is the child's way."\n\n### Analysis:\n- **như** = like (comparison)\n- **một lòng** = wholeheartedly\n- **mới là** = only then`,
        vocabulary: [
          { word: "công", meaning: "công lao", meaningEn: "merit, contribution", example: "Công cha rất lớn.", exampleEn: "Father's merit is great.", partOfSpeech: "noun" },
          { word: "hiếu", meaning: "kính trọng cha mẹ", meaningEn: "filial piety", example: "Chữ hiếu quan trọng.", exampleEn: "Filial piety is important.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Công cha' ví như gì?", questionEn: "What is father's merit compared to?", options: ["Biển", "Núi Thái Sơn", "Sông", "Trời"], answer: 1, explanation: "Ví như núi Thái Sơn.", explanationEn: "Compared to Mount Thai Son." },
        ],
      },
      {
        id: "vn-folk-2", title: "Tục ngữ về học tập", titleEn: "Learning Proverbs", level: "intermediate",
        theory: `## Tục ngữ về Học tập 📚\n\n1. **"Không thầy đố mày làm nên"** – Without a teacher, try succeeding\n2. **"Học ăn, học nói, học gói, học mở"** – Learn eating, speaking, wrapping, unwrapping\n3. **"Đi một ngày đàng, học một sàng khôn"** – Travel a day, learn a sieve of wisdom\n\n### Ngữ pháp:\n- **Đố** = challenge/dare (phủ định ngầm)\n- **Một…một** = correlative structure`,
        theoryEn: `## Learning Proverbs\n\n1. "Without a teacher, try to succeed" – Role of teachers\n2. "Learn to eat, speak, wrap, unwrap" – Learn life skills\n3. "Travel a day, learn a sieve of wisdom" – Experience is the teacher`,
        vocabulary: [
          { word: "thầy", meaning: "giáo viên, người dạy", meaningEn: "teacher / master", example: "Tôn sư trọng đạo.", exampleEn: "Respect the teacher.", partOfSpeech: "noun" },
          { word: "khôn", meaning: "thông minh, sáng suốt", meaningEn: "wise / clever", example: "Học cho khôn.", exampleEn: "Study to be wise.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "'Đi một ngày đàng' dạy điều gì?", questionEn: "What does this proverb teach?", options: ["Ở nhà tốt hơn", "Đi nhiều học nhiều", "Đừng đi đâu", "Học ở trường"], answer: 1, explanation: "Trải nghiệm thực tế giúp học hỏi.", explanationEn: "Real experience helps learning." },
        ],
      },
      {
        id: "vn-folk-3", title: "Ca dao về tình yêu", titleEn: "Love Folk Songs", level: "intermediate",
        theory: `## Ca Dao về Tình yêu 💕\n\n> **"Thuyền ơi có nhớ bến chăng,\n> Bến thì một dạ khăng khăng đợi thuyền."**\n\n### Ẩn dụ:\n- **Thuyền** = chàng trai (dịch chuyển)\n- **Bến** = cô gái (chờ đợi)\n\n> **"Yêu nhau cởi áo cho nhau,\n> Về nhà mẹ hỏi: qua cầu gió bay."**\n\nCách trả lời thông minh, dí dỏm.`,
        theoryEn: `## Love Folk Songs 💕\n\n> "Oh boat, do you remember the dock?\n> The dock wholeheartedly waits for the boat."\n\n### Metaphor:\n- **Boat** = the man (mobile)\n- **Dock** = the woman (waiting)`,
        vocabulary: [
          { word: "thuyền", meaning: "phương tiện trên nước", meaningEn: "boat (metaphor: man)", example: "Thuyền đi, bến đợi.", exampleEn: "The boat goes, the dock waits.", partOfSpeech: "noun" },
          { word: "bến", meaning: "nơi thuyền đỗ", meaningEn: "dock (metaphor: woman)", example: "Bến chờ thuyền.", exampleEn: "The dock waits for the boat.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Trong ca dao, 'thuyền' ẩn dụ cho?", questionEn: "'Boat' metaphor for?", options: ["Cô gái", "Chàng trai", "Bố mẹ", "Con cái"], answer: 1, explanation: "Thuyền = chàng trai.", explanationEn: "Boat = the man." },
        ],
      },
      {
        id: "vn-folk-4", title: "Tục ngữ về thiên nhiên", titleEn: "Nature Proverbs", level: "beginner",
        theory: `## Tục ngữ về Thiên nhiên 🌤️\n\n1. **"Chuồn chuồn bay thấp thì mưa, bay cao thì nắng, bay vừa thì râm"**\n   → Dự báo thời tiết dân gian\n\n2. **"Tháng bảy nước nhảy lên bờ"**\n   → Tháng 7 âm lịch hay lũ lụt\n\n3. **"Ráng mỡ gà, có nhà thì giữ"**\n   → Khi trời vàng như mỡ gà, sắp có bão`,
        theoryEn: `## Nature Proverbs\n\n1. "Dragonflies fly low = rain, high = sun, mid = cloudy" → Folk weather forecast\n2. "In July, water jumps to shore" → July floods\n3. "Chicken-fat sky, protect your house" → Yellow sky = storm coming`,
        vocabulary: [
          { word: "chuồn chuồn", meaning: "côn trùng cánh mỏng", meaningEn: "dragonfly", example: "Chuồn chuồn bay thấp.", exampleEn: "Dragonflies fly low.", partOfSpeech: "noun" },
          { word: "lũ lụt", meaning: "nước dâng cao gây hại", meaningEn: "flood", example: "Miền Trung hay bị lũ lụt.", exampleEn: "Central Vietnam often floods.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Chuồn chuồn bay thấp nghĩa là?", questionEn: "What does it mean when dragonflies fly low?", options: ["Nắng", "Mưa", "Gió", "Tuyết"], answer: 1, explanation: "Bay thấp = sắp mưa.", explanationEn: "Flying low = rain coming." },
        ],
      },
      {
        id: "vn-folk-5", title: "Truyện cổ tích Việt Nam", titleEn: "Vietnamese Fairy Tales", level: "intermediate",
        theory: `## Truyện cổ tích 🧚\n\n### Các truyện nổi tiếng:\n1. **Tấm Cám** – Vietnamese Cinderella\n2. **Sơn Tinh Thủy Tinh** – Mountain vs Water Spirit\n3. **Sự tích Hồ Gươm** – Legend of Sword Lake\n4. **Thạch Sanh** – The brave woodcutter\n5. **Cây tre trăm đốt** – The hundred-knot bamboo\n\n### Bài học chung:\n- Thiện thắng ác\n- Kiên trì sẽ thành công\n- Lòng tốt được đền đáp`,
        theoryEn: `## Vietnamese Fairy Tales 🧚\n\nFamous tales: Tam Cam (Cinderella), Son Tinh Thuy Tinh (Mountain vs Water), Legend of Sword Lake, Thach Sanh (the brave hero)\n\nCommon lessons: Good triumphs evil, persistence pays off, kindness is rewarded`,
        vocabulary: [
          { word: "cổ tích", meaning: "truyện xưa cho trẻ em", meaningEn: "fairy tale", example: "Kể truyện cổ tích.", exampleEn: "Tell a fairy tale.", partOfSpeech: "noun" },
          { word: "thiện", meaning: "tốt, lương thiện", meaningEn: "good / virtuous", example: "Thiện thắng ác.", exampleEn: "Good triumphs evil.", partOfSpeech: "noun/adj" },
        ],
        quiz: [
          { question: "'Tấm Cám' giống truyện nào phương Tây?", questionEn: "Which Western tale is similar?", options: ["Snow White", "Cinderella", "Rapunzel", "Sleeping Beauty"], answer: 1, explanation: "Tấm Cám tương tự Cinderella.", explanationEn: "Tam Cam is similar to Cinderella." },
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
        id: "vn-folk-6", title: "Ca dao về quê hương", titleEn: "Homeland Folk Songs", level: "advanced",
        theory: `## Ca Dao về Quê hương 🏡\n\n> **"Anh đi anh nhớ quê nhà,\n> Nhớ canh rau muống, nhớ cà dầm tương."**\n\nNhớ quê qua những món ăn giản dị.\n\n> **"Đường vô xứ Huế quanh quanh,\n> Non xanh nước biếc như tranh họa đồ."**\n\nMô tả vẻ đẹp xứ Huế.`,
        theoryEn: `## Homeland Folk Songs\n\n> "When I go, I miss home, / Miss the water spinach soup, miss the pickled eggplant."\n\nHomesickness through simple foods.\n\n> "The road to Hue winds around, / Green mountains, blue waters like a painting."`,
        vocabulary: [
          { word: "quê nhà", meaning: "quê hương, nơi sinh", meaningEn: "hometown", example: "Nhớ quê nhà.", exampleEn: "Miss my hometown.", partOfSpeech: "noun" },
          { word: "rau muống", meaning: "loại rau phổ biến VN", meaningEn: "water spinach", example: "Rau muống xào tỏi.", exampleEn: "Stir-fried water spinach.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Trong ca dao, nhớ quê qua gì?", questionEn: "Homesickness is expressed through?", options: ["Tiền bạc", "Món ăn giản dị", "Xe cộ", "Công nghệ"], answer: 1, explanation: "Qua món ăn: rau muống, cà.", explanationEn: "Through simple foods." },
        ],
      },
      {
        id: "vn-folk-7", title: "Tục ngữ về đạo đức", titleEn: "Moral Proverbs", level: "intermediate",
        theory: `## Tục ngữ về Đạo đức\n\n1. **"Uống nước nhớ nguồn"** – Remember your origins\n2. **"Ăn quả nhớ kẻ trồng cây"** – Be grateful to those who helped\n3. **"Thương người như thể thương thân"** – Love others as yourself\n4. **"Lá lành đùm lá rách"** – The fortunate help the unfortunate\n5. **"Một cây làm chẳng nên non"** – One tree doesn't make a mountain (unity!)`,
        theoryEn: `## Moral Proverbs\n\n1. "Drink water, remember the source" – Gratitude\n2. "Eat fruit, remember the planter" – Be thankful\n3. "Love others as yourself" – Compassion\n4. "Good leaves cover torn leaves" – Help the less fortunate\n5. "One tree doesn't make a mountain" – Unity`,
        vocabulary: [
          { word: "nguồn", meaning: "nơi phát sinh", meaningEn: "source / origin", example: "Nhớ nguồn gốc.", exampleEn: "Remember the origins.", partOfSpeech: "noun" },
          { word: "đoàn kết", meaning: "hợp tác, cùng nhau", meaningEn: "unity", example: "Đoàn kết là sức mạnh.", exampleEn: "Unity is strength.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Lá lành đùm lá rách' dạy gì?", questionEn: "What does this proverb teach?", options: ["Cạnh tranh", "Giúp đỡ người khó khăn", "Tiết kiệm", "Học hành"], answer: 1, explanation: "Giúp đỡ nhau.", explanationEn: "Help the less fortunate." },
        ],
      },
      {
        id: "vn-folk-8", title: "Ca dao về lao động", titleEn: "Labor Folk Songs", level: "intermediate",
        theory: `## Ca Dao về Lao động ⚒️\n\n> **"Ai ơi bưng bát cơm đầy,\n> Dẻo thơm một hạt, đắng cay muôn phần."**\n\nMỗi hạt gạo là mồ hôi nước mắt.\n\n> **"Tay làm hàm nhai, tay quai miệng trễ."**\n\nPhải làm mới có ăn.`,
        theoryEn: `## Labor Folk Songs\n\n> "Whoever holds a full bowl of rice, / Each fragrant grain came from bitter toil."\n\nEvery grain of rice comes from sweat and tears.\n\n> "Working hands eat, idle hands go hungry."`,
        vocabulary: [
          { word: "lao động", meaning: "làm việc", meaningEn: "labor / work", example: "Lao động là vinh quang.", exampleEn: "Labor is glory.", partOfSpeech: "noun" },
          { word: "mồ hôi", meaning: "nước tiết ra khi nóng", meaningEn: "sweat", example: "Mồ hôi nông dân.", exampleEn: "The farmer's sweat.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Tay làm hàm nhai' nghĩa là?", questionEn: "What does it mean?", options: ["Ăn nhiều", "Phải làm mới có ăn", "Tay khỏe", "Ăn ngon"], answer: 1, explanation: "Phải lao động mới có cơm ăn.", explanationEn: "You must work to eat." },
        ],
      },
      {
        id: "vn-folk-9", title: "Thành ngữ trong giao tiếp", titleEn: "Idioms in Conversation", level: "advanced",
        theory: `## Thành ngữ giao tiếp hàng ngày\n\n- **"Nói có sách, mách có chứng"** – Speak with evidence\n- **"Miệng nam mô, bụng bồ dao găm"** – Two-faced\n- **"Đi hỏi già, về nhà hỏi trẻ"** – Ask elders when out, kids when home\n- **"Ông nói gà, bà nói vịt"** – Talking past each other\n- **"Trống đánh xuôi, kèn thổi ngược"** – Contradicting each other`,
        theoryEn: `## Conversational Idioms\n\n- "Speak with books, point with proof" – Back up claims\n- "Mouth says prayers, belly hides daggers" – Hypocrite\n- "Drum beats forward, trumpet blows backward" – Contradicting`,
        vocabulary: [
          { word: "chứng", meaning: "bằng chứng", meaningEn: "evidence / proof", example: "Nói có chứng.", exampleEn: "Speak with evidence.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Ông nói gà, bà nói vịt' nghĩa là?", questionEn: "What does it mean?", options: ["Đồng ý", "Nói không ăn nhập", "Nói hay", "Nói dối"], answer: 1, explanation: "Nói không ăn nhập, lệch ý nhau.", explanationEn: "Talking past each other, miscommunication." },
        ],
      },
      {
        id: "vn-folk-10", title: "Truyện ngụ ngôn Việt Nam", titleEn: "Vietnamese Fables", level: "advanced",
        theory: `## Truyện ngụ ngôn 🐢\n\n### Trâu và ếch:\nẾch thấy trâu to, cố phồng bụng lên để bằng trâu → bụng nổ tung.\n**Bài học**: Đừng tự cao, biết mình biết ta.\n\n### Thỏ và rùa:\nThỏ chạy nhanh nhưng chủ quan. Rùa chậm nhưng kiên trì → Rùa thắng.\n**Bài học**: Kiên trì hơn tài năng.\n\n### Đẽo cày giữa đường:\nNghe mọi người góp ý, đẽo mãi → cày hỏng.\n**Bài học**: Có chính kiến, đừng nghe ai cũng theo.`,
        theoryEn: `## Vietnamese Fables\n\n### Buffalo and Frog: Frog tried to inflate to buffalo's size → exploded. Lesson: Don't be arrogant.\n### Turtle and Hare: Hare was overconfident, turtle persisted → Turtle won. Lesson: Persistence beats talent.\n### Carving the plow: Listened to everyone → ruined it. Lesson: Have your own opinion.`,
        vocabulary: [
          { word: "ngụ ngôn", meaning: "truyện mang bài học", meaningEn: "fable", example: "Truyện ngụ ngôn hay.", exampleEn: "A good fable.", partOfSpeech: "noun" },
          { word: "kiên trì", meaning: "không bỏ cuộc", meaningEn: "persistent", example: "Kiên trì sẽ thành công.", exampleEn: "Persistence leads to success.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "Bài học từ Thỏ và Rùa?", questionEn: "Lesson from Turtle and Hare?", options: ["Tài năng quan trọng nhất", "Kiên trì hơn tài năng", "Chạy nhanh là tốt", "Đừng đua"], answer: 1, explanation: "Kiên trì quan trọng hơn.", explanationEn: "Persistence is more important." },
        ],
      },
    ],
  },
];
