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
          { word: "nghĩa", meaning: "tình nghĩa, ân nghĩa", meaningEn: "gratitude / bond", example: "Nghĩa mẹ như nước trong nguồn.", exampleEn: "Mother's bond is like spring water.", partOfSpeech: "noun" },
          { word: "nguồn", meaning: "nơi bắt đầu của dòng nước", meaningEn: "source / spring", example: "Nước từ nguồn chảy ra.", exampleEn: "Water flows from the source.", partOfSpeech: "noun" },
          { word: "Thái Sơn", meaning: "ngọn núi cao, biểu tượng vĩ đại", meaningEn: "Mount Thai Son (symbol of greatness)", example: "Công cha như núi Thái Sơn.", exampleEn: "Father's merit is like Mount Thai Son.", partOfSpeech: "noun" },
          { word: "một lòng", meaning: "tận tâm, chung thủy", meaningEn: "wholeheartedly", example: "Con một lòng thờ mẹ kính cha.", exampleEn: "The child wholeheartedly honors parents.", partOfSpeech: "phrase" },
          { word: "ví", meaning: "so sánh", meaningEn: "to compare / liken", example: "Ông ví cuộc đời như giấc mơ.", exampleEn: "He compared life to a dream.", partOfSpeech: "verb" },
          { word: "đạo", meaning: "con đường, lẽ phải", meaningEn: "way / moral path", example: "Đạo làm con phải hiếu thảo.", exampleEn: "The way of a child is filial piety.", partOfSpeech: "noun" },
          { word: "hiếu thảo", meaning: "biết ơn và kính trọng cha mẹ", meaningEn: "filial / dutiful", example: "Cô ấy rất hiếu thảo.", exampleEn: "She is very dutiful to her parents.", partOfSpeech: "adjective" },
          { word: "thờ", meaning: "tôn kính, thờ phụng", meaningEn: "to worship / honor", example: "Thờ mẹ kính cha.", exampleEn: "Honor mother, respect father.", partOfSpeech: "verb" },
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
          { word: "sàng", meaning: "dụng cụ lọc gạo", meaningEn: "sieve / winnowing basket", example: "Học một sàng khôn.", exampleEn: "Learn a sieve of wisdom.", partOfSpeech: "noun" },
          { word: "đàng", meaning: "đường đi (cổ ngữ)", meaningEn: "road / way (archaic)", example: "Đi một ngày đàng.", exampleEn: "Travel a day's road.", partOfSpeech: "noun" },
          { word: "tôn sư", meaning: "kính trọng thầy cô", meaningEn: "to respect teachers", example: "Tôn sư trọng đạo là truyền thống.", exampleEn: "Respecting teachers is tradition.", partOfSpeech: "verb phrase" },
          { word: "trọng đạo", meaning: "coi trọng đạo lý", meaningEn: "to value moral principles", example: "Người Việt trọng đạo.", exampleEn: "Vietnamese value morality.", partOfSpeech: "verb phrase" },
          { word: "làm nên", meaning: "thành công", meaningEn: "to succeed / accomplish", example: "Không thầy đố mày làm nên.", exampleEn: "Without a teacher, try to succeed.", partOfSpeech: "verb phrase" },
          { word: "trải nghiệm", meaning: "kinh nghiệm thực tế", meaningEn: "experience", example: "Trải nghiệm giúp ta trưởng thành.", exampleEn: "Experience helps us grow.", partOfSpeech: "noun" },
          { word: "gói", meaning: "bọc lại", meaningEn: "to wrap", example: "Học gói, học mở.", exampleEn: "Learn to wrap, learn to unwrap.", partOfSpeech: "verb" },
          { word: "đố", meaning: "thách thức", meaningEn: "to challenge / dare", example: "Đố mày làm nên!", exampleEn: "I dare you to succeed!", partOfSpeech: "verb" },
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
          { word: "ẩn dụ", meaning: "cách nói gián tiếp", meaningEn: "metaphor", example: "Ca dao dùng nhiều ẩn dụ.", exampleEn: "Folk songs use many metaphors.", partOfSpeech: "noun" },
          { word: "khăng khăng", meaning: "kiên quyết, không thay đổi", meaningEn: "steadfast / insistent", example: "Bến một dạ khăng khăng.", exampleEn: "The dock steadfastly waits.", partOfSpeech: "adjective" },
          { word: "một dạ", meaning: "một lòng, trung thành", meaningEn: "single-hearted / faithful", example: "Một dạ đợi chờ.", exampleEn: "Faithfully waiting.", partOfSpeech: "phrase" },
          { word: "nhớ", meaning: "tưởng nhớ, thương nhớ", meaningEn: "to miss / remember", example: "Thuyền ơi có nhớ bến chăng?", exampleEn: "Oh boat, do you remember the dock?", partOfSpeech: "verb" },
          { word: "chờ đợi", meaning: "đợi ai đó", meaningEn: "to wait for", example: "Nàng chờ đợi chàng trở về.", exampleEn: "She waits for him to return.", partOfSpeech: "verb" },
          { word: "chung thủy", meaning: "trung thành trong tình yêu", meaningEn: "faithful / loyal in love", example: "Tình yêu chung thủy.", exampleEn: "Faithful love.", partOfSpeech: "adjective" },
          { word: "duyên", meaning: "duyên phận, số phận tình yêu", meaningEn: "fate / destined love", example: "Đôi ta có duyên.", exampleEn: "We are destined for each other.", partOfSpeech: "noun" },
          { word: "tương tư", meaning: "nhớ nhung người yêu", meaningEn: "lovesick / yearning", example: "Chàng tương tư nàng.", exampleEn: "He yearns for her.", partOfSpeech: "verb" },
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
          { word: "ráng", meaning: "ánh sáng đỏ vàng trên trời", meaningEn: "glow / sunset glow", example: "Ráng mỡ gà, có nhà thì giữ.", exampleEn: "Yellow glow means storms coming.", partOfSpeech: "noun" },
          { word: "mỡ gà", meaning: "màu vàng nhạt như mỡ gà", meaningEn: "chicken-fat color (yellowish)", example: "Ráng mỡ gà báo bão.", exampleEn: "Chicken-fat glow warns of storms.", partOfSpeech: "noun" },
          { word: "râm", meaning: "trời có mây che, không nắng", meaningEn: "overcast / shady", example: "Trời hôm nay râm mát.", exampleEn: "Today is overcast and cool.", partOfSpeech: "adjective" },
          { word: "dự báo", meaning: "đoán trước thời tiết", meaningEn: "to forecast", example: "Ông bà dự báo thời tiết qua tục ngữ.", exampleEn: "Elders forecast weather through proverbs.", partOfSpeech: "verb" },
          { word: "kinh nghiệm", meaning: "hiểu biết từ thực tế", meaningEn: "experience / wisdom", example: "Kinh nghiệm dân gian rất quý.", exampleEn: "Folk experience is precious.", partOfSpeech: "noun" },
          { word: "bão", meaning: "gió rất mạnh kèm mưa", meaningEn: "storm / typhoon", example: "Mùa bão thường vào tháng 9.", exampleEn: "Storm season is usually in September.", partOfSpeech: "noun" },
          { word: "mùa", meaning: "thời kỳ trong năm", meaningEn: "season", example: "Mùa mưa kéo dài.", exampleEn: "The rainy season is long.", partOfSpeech: "noun" },
          { word: "dân gian", meaning: "thuộc về nhân dân", meaningEn: "folk / popular", example: "Tục ngữ dân gian.", exampleEn: "Folk proverbs.", partOfSpeech: "adjective" },
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
          { word: "ác", meaning: "xấu, tàn nhẫn", meaningEn: "evil / wicked", example: "Kẻ ác bị trừng phạt.", exampleEn: "The wicked are punished.", partOfSpeech: "adjective" },
          { word: "truyền thuyết", meaning: "câu chuyện lịch sử dân gian", meaningEn: "legend", example: "Truyền thuyết Hồ Gươm rất nổi tiếng.", exampleEn: "The Sword Lake legend is famous.", partOfSpeech: "noun" },
          { word: "phép thuật", meaning: "sức mạnh siêu nhiên", meaningEn: "magic", example: "Bụt có phép thuật giúp Tấm.", exampleEn: "Buddha uses magic to help Tam.", partOfSpeech: "noun" },
          { word: "bài học", meaning: "điều rút ra được", meaningEn: "lesson / moral", example: "Mỗi truyện có một bài học.", exampleEn: "Each story has a moral.", partOfSpeech: "noun" },
          { word: "nhân vật", meaning: "người trong truyện", meaningEn: "character", example: "Thạch Sanh là nhân vật dũng cảm.", exampleEn: "Thach Sanh is a brave character.", partOfSpeech: "noun" },
          { word: "trừng phạt", meaning: "phạt nặng", meaningEn: "to punish", example: "Kẻ ác bị trừng phạt.", exampleEn: "The villain is punished.", partOfSpeech: "verb" },
          { word: "Bụt", meaning: "Phật, vị thần trong cổ tích", meaningEn: "Buddha (in fairy tales)", example: "Bụt hiện lên giúp Tấm.", exampleEn: "Buddha appears to help Tam.", partOfSpeech: "noun" },
          { word: "dũng cảm", meaning: "can đảm, không sợ hãi", meaningEn: "brave / courageous", example: "Thạch Sanh rất dũng cảm.", exampleEn: "Thach Sanh is very brave.", partOfSpeech: "adjective" },
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
          { word: "xứ", meaning: "vùng đất, miền", meaningEn: "land / region", example: "Xứ Huế thơ mộng.", exampleEn: "The land of Hue is poetic.", partOfSpeech: "noun" },
          { word: "canh", meaning: "món nước nấu rau", meaningEn: "soup / broth", example: "Canh rau muống mát.", exampleEn: "Water spinach soup is refreshing.", partOfSpeech: "noun" },
          { word: "dầm tương", meaning: "ngâm trong nước tương", meaningEn: "pickled in soy sauce", example: "Cà dầm tương.", exampleEn: "Eggplant pickled in soy sauce.", partOfSpeech: "verb phrase" },
          { word: "họa đồ", meaning: "bức tranh vẽ", meaningEn: "painting / drawing", example: "Non xanh nước biếc như tranh họa đồ.", exampleEn: "Green mountains and blue waters like a painting.", partOfSpeech: "noun" },
          { word: "biếc", meaning: "xanh đậm", meaningEn: "deep blue / verdant", example: "Nước biếc sông Hương.", exampleEn: "The verdant Perfume River.", partOfSpeech: "adjective" },
          { word: "hoài niệm", meaning: "nhớ về quá khứ", meaningEn: "nostalgia", example: "Hoài niệm tuổi thơ.", exampleEn: "Childhood nostalgia.", partOfSpeech: "noun" },
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
          { word: "lá lành", meaning: "lá tốt, nguyên vẹn", meaningEn: "whole leaf (metaphor: fortunate)", example: "Lá lành đùm lá rách.", exampleEn: "Whole leaves wrap torn leaves.", partOfSpeech: "noun" },
          { word: "đùm", meaning: "che chở, bao bọc", meaningEn: "to wrap / protect", example: "Đùm bọc nhau.", exampleEn: "Protect each other.", partOfSpeech: "verb" },
          { word: "thương", meaning: "yêu thương, cảm thông", meaningEn: "to love / empathize", example: "Thương người như thương thân.", exampleEn: "Love others as yourself.", partOfSpeech: "verb" },
          { word: "biết ơn", meaning: "cảm ơn sâu sắc", meaningEn: "grateful", example: "Uống nước nhớ nguồn là biết ơn.", exampleEn: "Drinking water, remembering the source means gratitude.", partOfSpeech: "verb" },
          { word: "chia sẻ", meaning: "cho người khác phần của mình", meaningEn: "to share", example: "Chia sẻ với người khó khăn.", exampleEn: "Share with those in need.", partOfSpeech: "verb" },
          { word: "sức mạnh", meaning: "năng lực, lực lượng", meaningEn: "strength / power", example: "Đoàn kết là sức mạnh.", exampleEn: "Unity is strength.", partOfSpeech: "noun" },
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
          { word: "hạt", meaning: "hạt gạo, hạt thóc", meaningEn: "grain", example: "Mỗi hạt cơm đều quý.", exampleEn: "Every grain of rice is precious.", partOfSpeech: "noun" },
          { word: "đắng cay", meaning: "khổ cực, vất vả", meaningEn: "bitter / hardship", example: "Đắng cay muôn phần.", exampleEn: "A thousand parts bitter.", partOfSpeech: "adjective" },
          { word: "dẻo thơm", meaning: "mềm và có mùi thơm", meaningEn: "soft and fragrant", example: "Cơm dẻo thơm.", exampleEn: "Soft, fragrant rice.", partOfSpeech: "adjective" },
          { word: "nông dân", meaning: "người làm nông", meaningEn: "farmer", example: "Nông dân cần cù.", exampleEn: "Farmers are hardworking.", partOfSpeech: "noun" },
          { word: "cần cù", meaning: "chăm chỉ", meaningEn: "diligent / hardworking", example: "Cần cù bù thông minh.", exampleEn: "Diligence compensates for talent.", partOfSpeech: "adjective" },
          { word: "vinh quang", meaning: "được tôn vinh", meaningEn: "glory / honor", example: "Lao động là vinh quang.", exampleEn: "Labor is glory.", partOfSpeech: "noun" },
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
          { word: "nắm bắt", meaning: "tận dụng, chớp lấy", meaningEn: "to seize / grasp", example: "Nắm bắt cơ hội ngay.", exampleEn: "Seize the opportunity now.", partOfSpeech: "verb" },
          { word: "chần chừ", meaning: "do dự, không quyết đoán", meaningEn: "hesitant / to hesitate", example: "Đừng chần chừ.", exampleEn: "Don't hesitate.", partOfSpeech: "verb" },
          { word: "phút cuối", meaning: "thời điểm cuối cùng", meaningEn: "last minute", example: "Đợi đến phút cuối.", exampleEn: "Wait until the last minute.", partOfSpeech: "noun" },
          { word: "quyết đoán", meaning: "quyết định nhanh", meaningEn: "decisive", example: "Người quyết đoán thành công.", exampleEn: "Decisive people succeed.", partOfSpeech: "adjective" },
          { word: "kiên nhẫn", meaning: "nhẫn nại, chịu đựng", meaningEn: "patient", example: "Kiên nhẫn sẽ được đền đáp.", exampleEn: "Patience will be rewarded.", partOfSpeech: "adjective" },
          { word: "đền đáp", meaning: "trả ơn, bù đắp", meaningEn: "to reward / repay", example: "Sự kiên trì được đền đáp.", exampleEn: "Persistence is rewarded.", partOfSpeech: "verb" },
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
          { word: "phất phơ", meaning: "bay nhẹ theo gió", meaningEn: "fluttering", example: "Phất phơ giữa chợ.", exampleEn: "Fluttering in the market.", partOfSpeech: "verb" },
          { word: "bến nước", meaning: "nơi lấy nước, ẩn dụ cho số phận", meaningEn: "water landing (metaphor: fate)", example: "Mười hai bến nước.", exampleEn: "Twelve landings of water (12 fates).", partOfSpeech: "noun" },
          { word: "phong kiến", meaning: "chế độ xã hội cũ", meaningEn: "feudal", example: "Xã hội phong kiến.", exampleEn: "Feudal society.", partOfSpeech: "adjective" },
          { word: "số phận", meaning: "vận mệnh, định mệnh", meaningEn: "fate / destiny", example: "Số phận éo le.", exampleEn: "A cruel fate.", partOfSpeech: "noun" },
          { word: "may rủi", meaning: "hên xui, may mắn hay xui xẻo", meaningEn: "fortune / luck", example: "Cuộc đời phụ thuộc may rủi.", exampleEn: "Life depends on fortune.", partOfSpeech: "noun" },
          { word: "cam chịu", meaning: "chấp nhận chịu đựng", meaningEn: "to endure / accept", example: "Phụ nữ phải cam chịu.", exampleEn: "Women had to endure.", partOfSpeech: "verb" },
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

// Module: Nghệ thuật truyền thống Việt Nam
export const traditionalArtsModule: VietnameseModule = {
  id: "vn-folk-arts",
  title: "Nghệ thuật truyền thống",
  titleEn: "Traditional Vietnamese Arts",
  icon: "🎭",
  color: "from-rose-500 to-pink-600",
  description: "Hát then, múa rối nước, nhạc cụ dân tộc",
  descriptionEn: "Then singing, water puppetry, traditional instruments",
  category: "folklore",
  lessons: [
    {
      id: "vn-folk-art-1",
      title: "Hát Then – Âm nhạc tâm linh",
      titleEn: "Then Singing – Spiritual Music",
      level: "intermediate",
      theory: `## Hát Then – Cầu nối trời và đất 🎶

**Hát Then** là loại hình nghệ thuật dân gian của các dân tộc Tày, Nùng, Thái ở vùng Đông Bắc Việt Nam, được UNESCO công nhận là **di sản văn hóa phi vật thể** năm 2019.

### Nguồn gốc
"Then" có nghĩa là "trời" trong tiếng Tày. Hát Then ban đầu là nghi lễ tâm linh, trong đó **thầy Then** (người hát) đóng vai trò cầu nối giữa thế giới người sống và thần linh. Qua lời hát, thầy Then kể lại hành trình lên trời để cầu xin sức khỏe, mùa màng tốt tươi.

### Nhạc cụ
Nhạc cụ chính đi kèm hát Then là **đàn tính** (còn gọi tính tẩu) – loại đàn 2-3 dây với thùng đàn làm từ quả bầu khô. Âm thanh đàn tính trong trẻo, nhẹ nhàng, hòa quyện với giọng hát mềm mại tạo nên giai điệu vừa huyền bí vừa gần gũi.

### Hát Then ngày nay
Ngày nay, hát Then không chỉ trong nghi lễ mà còn trên sân khấu hiện đại. Các nghệ sĩ trẻ sáng tạo phong cách mới, kết hợp Then với nhạc cụ phương Tây, giữ gìn bản sắc trong thời đại hội nhập.`,
      theoryEn: `## Then Singing – Bridge between Heaven and Earth 🎶

**Then singing** is folk art of the Tày, Nùng, and Thái ethnic groups in Northeast Vietnam, recognized by UNESCO as **intangible cultural heritage** in 2019.

"Then" means "heaven" in Tày language. Originally a spiritual ritual where the **Then master** serves as a bridge between the living and spirits. The key instrument is the **tính lute** – a 2-3 string instrument with a dried gourd body.

Today, Then singing has moved beyond rituals onto modern stages, with young artists blending traditional and contemporary styles.`,
      vocabulary: [
        { word: "tâm linh", meaning: "thuộc về tinh thần, linh hồn", meaningEn: "spiritual", example: "Nghi lễ tâm linh truyền thống.", exampleEn: "Traditional spiritual ritual.", partOfSpeech: "adjective" },
        { word: "đàn tính", meaning: "nhạc cụ dây truyền thống", meaningEn: "tính lute", example: "Đàn tính có âm thanh trong trẻo.", exampleEn: "The tính lute has a clear sound.", partOfSpeech: "noun" },
        { word: "thầy Then", meaning: "người thực hiện nghi lễ Then", meaningEn: "Then master / shaman", example: "Thầy Then hát suốt đêm.", exampleEn: "The Then master sang all night.", partOfSpeech: "noun" },
        { word: "huyền bí", meaning: "bí ẩn, khó hiểu", meaningEn: "mystical, mysterious", example: "Giai điệu huyền bí.", exampleEn: "A mystical melody.", partOfSpeech: "adjective" },
        { word: "dân tộc", meaning: "nhóm người có chung văn hóa", meaningEn: "ethnic group", example: "54 dân tộc Việt Nam.", exampleEn: "54 ethnic groups of Vietnam.", partOfSpeech: "noun" },
        { word: "nghi lễ", meaning: "buổi lễ trang trọng", meaningEn: "ritual / ceremony", example: "Nghi lễ cầu mùa.", exampleEn: "Harvest prayer ritual.", partOfSpeech: "noun" },
        { word: "bản sắc", meaning: "đặc trưng riêng", meaningEn: "identity / character", example: "Giữ gìn bản sắc văn hóa.", exampleEn: "Preserving cultural identity.", partOfSpeech: "noun" },
        { word: "hội nhập", meaning: "tham gia vào cộng đồng lớn hơn", meaningEn: "integration", example: "Hội nhập quốc tế.", exampleEn: "International integration.", partOfSpeech: "noun" },
        { word: "quả bầu", meaning: "loại quả dùng làm nhạc cụ", meaningEn: "gourd", example: "Thùng đàn làm từ quả bầu khô.", exampleEn: "The body is made from a dried gourd.", partOfSpeech: "noun" },
        { word: "mùa màng", meaning: "vụ trồng trọt", meaningEn: "harvest / crops", example: "Cầu mùa màng tốt tươi.", exampleEn: "Praying for a good harvest.", partOfSpeech: "noun" },
      ],
      quiz: [
        { question: "Hát Then được UNESCO công nhận năm nào?", questionEn: "When was Then singing UNESCO-recognized?", options: ["2016", "2017", "2019", "2021"], answer: 2, explanation: "UNESCO công nhận năm 2019.", explanationEn: "UNESCO recognized it in 2019." },
        { question: "'Then' có nghĩa gì trong tiếng Tày?", questionEn: "What does 'Then' mean in Tày?", options: ["Đất", "Trời", "Nước", "Rừng"], answer: 1, explanation: "'Then' = trời.", explanationEn: "'Then' = heaven." },
        { question: "Nhạc cụ chính của hát Then là gì?", questionEn: "Main instrument of Then singing?", options: ["Sáo", "Đàn tính", "Trống", "Đàn bầu"], answer: 1, explanation: "Đàn tính (tính tẩu).", explanationEn: "Tính lute." },
        { question: "'Huyền bí' nghĩa gì?", questionEn: "What does 'huyền bí' mean?", options: ["Vui vẻ", "Bí ẩn, khó hiểu", "Đơn giản", "Buồn"], answer: 1, explanation: "'Huyền bí' = mystical.", explanationEn: "'Huyền bí' = mystical." },
        { question: "Thầy Then đóng vai trò gì?", questionEn: "What role does the Then master play?", options: ["Nấu ăn", "Cầu nối trời và đất", "Dạy học", "Buôn bán"], answer: 1, explanation: "Thầy Then cầu nối giữa người sống và thần linh.", explanationEn: "Bridge between the living and spirits." },
      ],
    },
    {
      id: "vn-folk-art-2",
      title: "Múa Rối Nước – Sân khấu trên mặt nước",
      titleEn: "Water Puppetry – Theater on Water",
      level: "intermediate",
      theory: `## Múa Rối Nước – Nghệ thuật độc nhất vô nhị 🎭💧

**Múa rối nước** là loại hình nghệ thuật dân gian **chỉ có ở Việt Nam**, ra đời từ vùng đồng bằng sông Hồng cách đây hơn 1.000 năm. Khi cánh đồng ngập nước, nông dân biến ao làng thành sân khấu, điều khiển những con rối gỗ nhảy múa trên mặt nước.

### Cấu trúc sân khấu
Sân khấu là **ao nước** hoặc bể nước nhân tạo. Phía sau là **nhà thủy đình** – nơi nghệ sĩ đứng giấu mình sau tấm mành tre, điều khiển rối bằng hệ thống **sào, dây** phức tạp dưới mặt nước.

### Con rối
Mỗi con rối nặng 5-15 kg, được chạm khắc từ gỗ sung (nhẹ, không thấm nước), sơn đỏ vàng rực rỡ. Nhân vật phổ biến: **chú Tễu** (nhân vật hài hước dẫn chuyện), rồng, phượng, trâu, cá chép.

### Các tích trò nổi tiếng
- **Đánh cá**: Ngư dân bắt cá trên sông
- **Lê Lợi trả gươm**: Rùa vàng ngoi lên nhận gươm thần
- **Múa rồng**: Rồng phun nước, bay lượn trên mặt ao
- **Trâu đi cày**: Cảnh nông thôn bình dị

### Ngày nay
Nhà hát Múa Rối Thăng Long (Hà Nội) biểu diễn hàng ngày cho du khách quốc tế, trở thành trải nghiệm văn hóa không thể bỏ qua khi đến Việt Nam.`,
      theoryEn: `## Water Puppetry – A Uniquely Vietnamese Art 🎭💧

**Water puppetry** is a folk art **unique to Vietnam**, born in the Red River Delta over 1,000 years ago. Puppets are controlled by artists hidden behind bamboo screens using underwater **poles and strings**.

Each puppet (5-15 kg) is carved from fig wood and painted in vibrant red and gold. Famous character: **Tễu** – the comedic narrator. Popular scenes include fishing, Lê Lợi returning the sword, dragon dances, and buffalo plowing.

The Thang Long Water Puppet Theatre in Hanoi performs daily for international visitors.`,
      vocabulary: [
        { word: "rối nước", meaning: "con rối biểu diễn trên nước", meaningEn: "water puppet", example: "Xem múa rối nước ở Hà Nội.", exampleEn: "Watch water puppetry in Hanoi.", partOfSpeech: "noun" },
        { word: "thủy đình", meaning: "nhà trên mặt nước", meaningEn: "water pavilion", example: "Nhà thủy đình là sân khấu chính.", exampleEn: "The water pavilion is the main stage.", partOfSpeech: "noun" },
        { word: "chạm khắc", meaning: "tạo hình trên gỗ", meaningEn: "to carve", example: "Chạm khắc con rối bằng gỗ.", exampleEn: "Carving puppets from wood.", partOfSpeech: "verb" },
        { word: "mành tre", meaning: "rèm tre", meaningEn: "bamboo screen", example: "Nghệ sĩ đứng sau mành tre.", exampleEn: "Artists stand behind bamboo screens.", partOfSpeech: "noun" },
        { word: "chú Tễu", meaning: "nhân vật hài hước dẫn chuyện", meaningEn: "Tễu – comedic narrator puppet", example: "Chú Tễu luôn mở màn.", exampleEn: "Tễu always opens the show.", partOfSpeech: "noun" },
        { word: "tích trò", meaning: "câu chuyện biểu diễn", meaningEn: "performance story / act", example: "Nhiều tích trò dân gian.", exampleEn: "Many folk performance stories.", partOfSpeech: "noun" },
        { word: "điều khiển", meaning: "kiểm soát, vận hành", meaningEn: "to control / operate", example: "Điều khiển rối dưới nước.", exampleEn: "Controlling puppets underwater.", partOfSpeech: "verb" },
        { word: "gỗ sung", meaning: "loại gỗ nhẹ, không thấm nước", meaningEn: "fig wood", example: "Rối làm từ gỗ sung.", exampleEn: "Puppets made from fig wood.", partOfSpeech: "noun" },
        { word: "biểu diễn", meaning: "trình diễn nghệ thuật", meaningEn: "to perform", example: "Biểu diễn mỗi tối.", exampleEn: "Performing every evening.", partOfSpeech: "verb" },
        { word: "nông thôn", meaning: "vùng quê", meaningEn: "countryside / rural", example: "Cảnh nông thôn bình dị.", exampleEn: "Peaceful countryside scene.", partOfSpeech: "noun" },
      ],
      quiz: [
        { question: "Múa rối nước có nguồn gốc từ vùng nào?", questionEn: "Where did water puppetry originate?", options: ["Tây Nguyên", "Đồng bằng sông Hồng", "Miền Trung", "Miền Tây"], answer: 1, explanation: "Ra đời từ đồng bằng sông Hồng.", explanationEn: "Originated from the Red River Delta." },
        { question: "Chú Tễu đóng vai trò gì?", questionEn: "What role does Tễu play?", options: ["Vua", "Hài hước dẫn chuyện", "Chiến binh", "Nông dân"], answer: 1, explanation: "Chú Tễu là nhân vật hài hước mở màn.", explanationEn: "Tễu is the comedic opening narrator." },
        { question: "Rối nước làm từ gỗ gì?", questionEn: "Water puppets are made from?", options: ["Gỗ lim", "Gỗ sung", "Gỗ sến", "Gỗ trắc"], answer: 1, explanation: "Gỗ sung nhẹ, không thấm nước.", explanationEn: "Fig wood – light, waterproof." },
        { question: "Nghệ sĩ đứng ở đâu?", questionEn: "Where do artists stand?", options: ["Trên bờ", "Sau mành tre trong nhà thủy đình", "Trong nước", "Trên mái nhà"], answer: 1, explanation: "Nghệ sĩ giấu mình sau mành tre.", explanationEn: "Artists hide behind bamboo screens." },
        { question: "'Tích trò' là gì?", questionEn: "What is 'tích trò'?", options: ["Nhạc cụ", "Câu chuyện biểu diễn", "Trang phục", "Sân khấu"], answer: 1, explanation: "'Tích trò' = performance story.", explanationEn: "'Tích trò' = performance story." },
      ],
    },
    {
      id: "vn-folk-art-3",
      title: "Nhạc cụ dân tộc Việt Nam",
      titleEn: "Vietnamese Traditional Instruments",
      level: "intermediate",
      theory: `## Nhạc cụ dân tộc – Âm thanh của hồn Việt 🎵

Việt Nam có hệ thống nhạc cụ dân tộc phong phú, phản ánh đời sống văn hóa đa dạng của 54 dân tộc.

### Bộ dây (Chordophones)
- **Đàn bầu** (monochord): Nhạc cụ một dây độc đáo chỉ có ở Việt Nam. Âm thanh du dương, mênh mang như tiếng lòng. Nghệ sĩ uốn cần đàn để thay đổi cao độ.
- **Đàn tranh**: 16-17 dây, tương tự zither, âm thanh trong sáng. Thường dùng trong nhạc cung đình Huế.
- **Đàn nguyệt**: Đàn hình mặt trăng, 2 dây, âm thanh vang, trầm ấm. Phổ biến trong hát chầu văn.

### Bộ hơi (Aerophones)
- **Sáo trúc**: Sáo ngang làm từ tre, âm thanh trong trẻo, vui tươi. Gắn liền với hình ảnh trẻ chăn trâu.
- **Khèn**: Nhạc cụ đặc trưng của người H'Mông, gồm 6 ống tre. Tiếng khèn vang giữa núi rừng Tây Bắc.

### Bộ gõ (Percussion)
- **Trống đồng**: Biểu tượng văn hóa Đông Sơn (2.000+ năm tuổi). Dùng trong lễ hội, nghi lễ.
- **Đàn đá**: Bộ đàn bằng đá tự nhiên, phát hiện ở Tây Nguyên, có tuổi đời hàng nghìn năm.
- **Phách**: Thanh gõ bằng tre/gỗ, giữ nhịp trong ca trù.

### Giá trị văn hóa
Nhạc cụ dân tộc không chỉ để giải trí mà gắn liền với **nghi lễ, lao động, và đời sống tinh thần** của người Việt. Nhiều loại đã được UNESCO công nhận gắn liền với di sản phi vật thể (ca trù, nhã nhạc cung đình Huế, then).`,
      theoryEn: `## Traditional Instruments – The Sound of Vietnam 🎵

Vietnam has a rich system of traditional instruments reflecting the diverse cultural life of 54 ethnic groups.

**String:** Đàn bầu (unique monochord), Đàn tranh (16-17 string zither), Đàn nguyệt (moon lute). **Wind:** Sáo trúc (bamboo flute), Khèn (H'Mông mouth organ). **Percussion:** Bronze drums (2,000+ years old), Đàn đá (stone lithophone), Phách (bamboo clappers for Ca trù).

These instruments are tied to **rituals, labor, and spiritual life**, many linked to UNESCO-recognized heritage.`,
      vocabulary: [
        { word: "đàn bầu", meaning: "nhạc cụ một dây", meaningEn: "monochord", example: "Đàn bầu có âm thanh da diết.", exampleEn: "The monochord has a haunting sound.", partOfSpeech: "noun" },
        { word: "đàn tranh", meaning: "đàn nhiều dây kiểu zither", meaningEn: "16-string zither", example: "Đàn tranh trong nhạc cung đình.", exampleEn: "Đàn tranh in court music.", partOfSpeech: "noun" },
        { word: "sáo trúc", meaning: "sáo làm từ tre", meaningEn: "bamboo flute", example: "Tiếng sáo trúc giữa cánh đồng.", exampleEn: "Bamboo flute across the fields.", partOfSpeech: "noun" },
        { word: "khèn", meaning: "nhạc cụ hơi của người H'Mông", meaningEn: "mouth organ (H'Mông)", example: "Tiếng khèn vang giữa núi rừng.", exampleEn: "Khèn echoing through the mountains.", partOfSpeech: "noun" },
        { word: "trống đồng", meaning: "trống bằng đồng cổ đại", meaningEn: "bronze drum", example: "Trống đồng Đông Sơn.", exampleEn: "Đông Sơn bronze drum.", partOfSpeech: "noun" },
        { word: "du dương", meaning: "êm ái, ngọt ngào", meaningEn: "melodious", example: "Giai điệu du dương.", exampleEn: "A melodious tune.", partOfSpeech: "adjective" },
        { word: "cung đình", meaning: "thuộc hoàng cung", meaningEn: "royal court", example: "Nhạc cung đình Huế.", exampleEn: "Huế royal court music.", partOfSpeech: "adjective" },
        { word: "cao độ", meaning: "âm trầm hay cao", meaningEn: "pitch (music)", example: "Thay đổi cao độ bằng cần đàn.", exampleEn: "Changing pitch with the stem.", partOfSpeech: "noun" },
        { word: "đàn đá", meaning: "nhạc cụ bằng đá cổ xưa", meaningEn: "stone lithophone", example: "Đàn đá Tây Nguyên.", exampleEn: "Central Highlands stone lithophone.", partOfSpeech: "noun" },
        { word: "da diết", meaning: "sâu lắng, thiết tha", meaningEn: "haunting, poignant", example: "Âm thanh da diết.", exampleEn: "A haunting sound.", partOfSpeech: "adjective" },
      ],
      quiz: [
        { question: "Đàn bầu có bao nhiêu dây?", questionEn: "How many strings does đàn bầu have?", options: ["2", "1", "3", "4"], answer: 1, explanation: "Đàn bầu là nhạc cụ MỘT dây.", explanationEn: "Đàn bầu is a monochord (1 string)." },
        { question: "Khèn là nhạc cụ của dân tộc nào?", questionEn: "Whose instrument is khèn?", options: ["Kinh", "Tày", "H'Mông", "Chăm"], answer: 2, explanation: "Khèn là nhạc cụ đặc trưng của người H'Mông.", explanationEn: "Khèn is characteristic of the H'Mông people." },
        { question: "Trống đồng Đông Sơn có tuổi đời bao lâu?", questionEn: "How old are Đông Sơn bronze drums?", options: ["500 năm", "1.000 năm", "2.000+ năm", "100 năm"], answer: 2, explanation: "Hơn 2.000 năm tuổi.", explanationEn: "Over 2,000 years old." },
        { question: "'Du dương' nghĩa gì?", questionEn: "What does 'du dương' mean?", options: ["Ồn ào", "Êm ái, ngọt ngào", "Im lặng", "Đáng sợ"], answer: 1, explanation: "'Du dương' = melodious.", explanationEn: "'Du dương' = melodious." },
        { question: "Đàn tranh thường dùng trong loại nhạc nào?", questionEn: "What music uses đàn tranh?", options: ["Rock", "Nhạc cung đình Huế", "Pop", "EDM"], answer: 1, explanation: "Đàn tranh phổ biến trong nhạc cung đình.", explanationEn: "Đàn tranh is common in royal court music." },
      ],
    },
  ],
};

folkloreLanguageModules.push(traditionalArtsModule);
