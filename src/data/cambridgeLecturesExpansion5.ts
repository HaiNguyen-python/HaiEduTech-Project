/**
 * @file cambridgeLecturesExpansion5.ts
 * @description Bổ sung 10 bài Cambridge mới (2 bài/cấp): Starters, Movers,
 *              Flyers, KET, PET. Mỗi bài có illustrationKey ánh xạ tới
 *              hình minh họa vui nhộn dành cho học sinh nhỏ.
 * @author HaiEduTech
 */

import type { CambridgeLecture } from "./cambridgeLecturesData";

// ============================================================
// STARTERS - 2 bài
// ============================================================
const startersAnimalsZoo: CambridgeLecture = {
  id: "cam-starters-animals-zoo",
  title: "Animals at the Zoo: Listen, Match, Smile!",
  titleVi: "Động vật ở Sở thú: Nghe, Nối, Cười!",
  level: "starters",
  skill: "vocabulary",
  icon: "🦁",
  duration: "15 min",
  description: "Meet 15 animal friends and learn their sounds, sizes, and homes - perfect for Reading & Writing Part 2.",
  descriptionVi: "Gặp 15 bạn động vật và học âm thanh, kích thước, nơi ở - hoàn hảo cho Đọc & Viết Phần 2.",
  learningObjective: "Students can name 15 zoo animals and describe one feature for each.",
  learningObjectiveVi: "Học sinh đọc tên 15 con vật ở sở thú và mô tả 1 đặc điểm.",
  examPattern: "Starters R&W Part 2: True/False questions about a picture with animals. Look carefully at COLOR, NUMBER, and PLACE.",
  examPatternVi: "Starters Đọc & Viết Phần 2: Câu Đúng/Sai về một bức tranh có động vật. Chú ý MÀU, SỐ, và VỊ TRÍ.",
  secretTip: "🔑 If the sentence says ONE thing wrong (color OR number OR place), the answer is FALSE!",
  secretTipVi: "🔑 Nếu câu sai DÙ CHỈ 1 chi tiết (màu HOẶC số HOẶC vị trí), đáp án là SAI!",
  welcomeMessage: "Welcome to the zoo! 🦁🐘🐒 Let's meet the animals!",
  welcomeMessageVi: "Chào mừng đến sở thú! 🦁🐘🐒 Cùng gặp các bạn động vật!",
  stepByStep: [
    { step: 1, title: "Look at the picture for 10 seconds", titleVi: "Nhìn tranh trong 10 giây", detail: "Count animals. Note colors. See where each animal is.", detailVi: "Đếm con vật. Ghi nhớ màu. Xem mỗi con ở đâu." },
    { step: 2, title: "Read the sentence slowly", titleVi: "Đọc câu chậm rãi", detail: "Underline the COLOR, NUMBER, and PLACE words.", detailVi: "Gạch chân từ chỉ MÀU, SỐ, VỊ TRÍ." },
    { step: 3, title: "Compare and decide", titleVi: "So sánh và quyết định", detail: "If everything matches the picture → TRUE (✓). If anything is different → FALSE (✗).", detailVi: "Nếu khớp hoàn toàn → ĐÚNG (✓). Nếu khác bất kỳ chi tiết → SAI (✗)." },
  ],
  illustratedRules: [
    { icon: "🦁", rule: "Big animals: lion, tiger, elephant, bear, giraffe", ruleVi: "Động vật to: lion, tiger, elephant, bear, giraffe", example: "The elephant is big and grey." },
    { icon: "🐒", rule: "Funny animals: monkey, parrot, snake, frog", ruleVi: "Động vật vui: monkey, parrot, snake, frog", example: "The monkey is in the tree." },
    { icon: "🐧", rule: "Cold-place animals: penguin, polar bear, seal", ruleVi: "Động vật xứ lạnh: penguin, polar bear, seal", example: "The penguin can swim but cannot fly." },
  ],
  watchOut: [
    { mistake: "Choosing TRUE when only color is right", mistakeVi: "Chọn ĐÚNG khi chỉ đúng màu", tip: "Check ALL three: color + number + place. One wrong = FALSE.", tipVi: "Kiểm tra cả 3: màu + số + vị trí. Sai 1 = SAI." },
    { mistake: "Confusing 'in' the tree vs 'under' the tree", mistakeVi: "Nhầm 'in' (trên cây) vs 'under' (dưới cây)", tip: "IN = inside/up high. UNDER = below.", tipVi: "IN = bên trong/trên cao. UNDER = bên dưới." },
  ],
  practiceSet: [
    { instruction: "Picture: 3 brown monkeys IN a tree.", instructionVi: "Tranh: 3 con khỉ nâu Ở TRÊN cây.", question: "Sentence: 'There are three monkeys under the tree.' True or False?", options: ["TRUE", "FALSE", "Cannot tell", "Maybe"], answer: 1, explanation: "PLACE is wrong: the monkeys are IN the tree, not UNDER. → FALSE.", explanationVi: "VỊ TRÍ sai: khỉ đang TRÊN cây, không phải DƯỚI. → SAI." },
    { instruction: "Picture: 1 yellow giraffe.", instructionVi: "Tranh: 1 con hươu cao cổ vàng.", question: "Sentence: 'There is one yellow giraffe.' True or False?", options: ["TRUE", "FALSE", "Cannot tell", "Maybe"], answer: 0, explanation: "Color, number both match → TRUE.", explanationVi: "Màu và số đều đúng → ĐÚNG." },
  ],
  vocabulary: [
    { word: "lion", meaning: "big yellow cat, king of jungle", meaningVi: "sư tử", example: "The lion has a big mane." },
    { word: "elephant", meaning: "huge grey animal with a trunk", meaningVi: "con voi", example: "The elephant uses its trunk to drink." },
    { word: "monkey", meaning: "small clever animal that climbs trees", meaningVi: "con khỉ", example: "Monkeys love bananas." },
    { word: "giraffe", meaning: "tall animal with a very long neck", meaningVi: "hươu cao cổ", example: "The giraffe eats leaves from tall trees." },
    { word: "penguin", meaning: "black-and-white bird that cannot fly", meaningVi: "chim cánh cụt", example: "Penguins live where it is cold." },
    { word: "parrot", meaning: "colorful bird that can talk", meaningVi: "con vẹt", example: "My parrot says 'Hello!'" },
  ],
  quiz: [
    { question: "Which animal has a long neck?", options: ["Penguin", "Giraffe", "Lion", "Snake"], answer: 1, explanation: "Giraffe = long neck." },
    { question: "Picture shows 4 red parrots IN a cage. Sentence: '4 red parrots in a cage.' True or False?", options: ["TRUE", "FALSE", "Cannot tell", "Maybe"], answer: 0, explanation: "Color, number, place all match → TRUE." },
    { question: "Best rule for True/False questions?", options: ["Always say TRUE", "Check color, number, place", "Read fast", "Look only at color"], answer: 1, explanation: "Check all three details before deciding." },
  ],
  parentInfo: "Builds Reading & Writing Part 2 skills. Children learn to verify multiple details before committing to an answer - a key academic discipline.",
  parentInfoVi: "Xây dựng kỹ năng Đọc & Viết Phần 2. Trẻ học cách xác minh nhiều chi tiết trước khi chốt đáp án - kỷ luật học thuật quan trọng.",
  illustrationKey: "starters",
  isNew: true,
};

const startersFamilyHome: CambridgeLecture = {
  id: "cam-starters-family-home",
  title: "My Family at Home: Who is Who?",
  titleVi: "Gia đình tôi ở nhà: Ai là Ai?",
  level: "starters",
  skill: "speaking",
  icon: "👨‍👩‍👧‍👦",
  duration: "15 min",
  description: "Learn family words (mum, dad, brother, sister) and rooms in the house - for Speaking Part 4.",
  descriptionVi: "Học từ về gia đình (mum, dad, brother, sister) và các phòng trong nhà - cho Nói Phần 4.",
  learningObjective: "Students can introduce family members and say which room each person is in.",
  learningObjectiveVi: "Học sinh giới thiệu thành viên gia đình và nói mỗi người ở phòng nào.",
  examPattern: "Starters Speaking Part 4: Personal questions like 'Who is in your family?' and 'Where is your mum?'.",
  examPatternVi: "Starters Nói Phần 4: Câu hỏi cá nhân như 'Who is in your family?' và 'Where is your mum?'.",
  secretTip: "🔑 Use full sentences: 'My mum is in the kitchen.' - not just 'kitchen'. Examiners reward full sentences!",
  secretTipVi: "🔑 Dùng câu đầy đủ: 'My mum is in the kitchen.' - đừng chỉ nói 'kitchen'. Giám khảo thưởng câu đầy đủ!",
  welcomeMessage: "Hello! 👋 Tell me about your family! Who lives with you?",
  welcomeMessageVi: "Chào bạn! 👋 Kể tôi nghe về gia đình! Ai sống cùng bạn?",
  stepByStep: [
    { step: 1, title: "Memorize family words", titleVi: "Thuộc từ về gia đình", detail: "Mum, dad, brother, sister, grandma, grandpa, baby.", detailVi: "Mẹ, bố, anh/em trai, chị/em gái, bà, ông, em bé." },
    { step: 2, title: "Memorize room words", titleVi: "Thuộc từ về các phòng", detail: "Kitchen, bedroom, bathroom, living room, garden.", detailVi: "Bếp, phòng ngủ, nhà tắm, phòng khách, vườn." },
    { step: 3, title: "Combine in one sentence", titleVi: "Kết hợp trong 1 câu", detail: "My + family member + is in the + room. 'My dad is in the garden.'", detailVi: "My + người + is in the + phòng. 'My dad is in the garden.'" },
  ],
  illustratedRules: [
    { icon: "👩", rule: "Mum is in the kitchen → cooking food", ruleVi: "Mẹ ở bếp → nấu ăn", example: "My mum is in the kitchen. She cooks rice." },
    { icon: "👨", rule: "Dad is in the garden → planting flowers", ruleVi: "Bố ở vườn → trồng hoa", example: "My dad is in the garden. He likes flowers." },
    { icon: "👶", rule: "Baby is in the bedroom → sleeping", ruleVi: "Em bé ở phòng ngủ → ngủ", example: "The baby is in the bedroom. He is sleeping." },
  ],
  watchOut: [
    { mistake: "Saying 'in kitchen' (no 'the')", mistakeVi: "Nói 'in kitchen' (thiếu 'the')", tip: "Always use THE: 'in THE kitchen', 'in THE garden'.", tipVi: "Luôn dùng THE: 'in THE kitchen', 'in THE garden'." },
    { mistake: "One-word answers", mistakeVi: "Trả lời 1 từ", tip: "Examiner asks 'Where is your mum?' Don't say 'Kitchen.' Say 'My mum is in the kitchen.'", tipVi: "Giám khảo hỏi 'Where is your mum?' Đừng đáp 'Kitchen.' Hãy nói 'My mum is in the kitchen.'" },
  ],
  practiceSet: [
    { instruction: "Answer with a full sentence", instructionVi: "Trả lời bằng câu đầy đủ", question: "Q: 'Where is your dad?' Best answer:", options: ["Garden.", "He garden.", "My dad is in the garden.", "Dad garden is."], answer: 2, explanation: "Full sentence with 'My...is in the...' is best.", explanationVi: "Câu đầy đủ 'My...is in the...' là tốt nhất." },
    { instruction: "Family member + room", instructionVi: "Người + phòng", question: "Picture: A baby sleeping in the bedroom. Best sentence:", options: ["Baby sleep.", "The baby is in the bedroom.", "Bedroom baby.", "She sleeping bedroom."], answer: 1, explanation: "'The baby is in the bedroom' uses the correct pattern.", explanationVi: "'The baby is in the bedroom' đúng cấu trúc." },
  ],
  vocabulary: [
    { word: "mum / mom", meaning: "mother", meaningVi: "mẹ", example: "My mum is kind." },
    { word: "dad", meaning: "father", meaningVi: "bố", example: "My dad is tall." },
    { word: "brother", meaning: "boy in your family", meaningVi: "anh/em trai", example: "I have one brother." },
    { word: "sister", meaning: "girl in your family", meaningVi: "chị/em gái", example: "My sister is six." },
    { word: "kitchen", meaning: "room where you cook", meaningVi: "nhà bếp", example: "We eat in the kitchen." },
    { word: "garden", meaning: "outside area with plants", meaningVi: "vườn", example: "My cat is in the garden." },
  ],
  quiz: [
    { question: "Where do you cook food?", options: ["Bedroom", "Kitchen", "Bathroom", "Garden"], answer: 1, explanation: "Kitchen = cooking room." },
    { question: "Best answer to 'Who is in your family?':", options: ["Mum.", "I have a mum, a dad and a brother.", "Family.", "Mum dad brother."], answer: 1, explanation: "Full sentence wins points." },
  ],
  parentInfo: "Develops Speaking Part 4 confidence. Children practice the universal sentence pattern 'My X is in the Y' which transfers to many speaking topics.",
  parentInfoVi: "Phát triển sự tự tin Nói Phần 4. Trẻ luyện mẫu câu 'My X is in the Y' áp dụng cho nhiều chủ đề.",
  illustrationKey: "starters",
  isNew: true,
};

// ============================================================
// MOVERS - 2 bài
// ============================================================
const moversAdjectivesCompare: CambridgeLecture = {
  id: "cam-movers-adjectives-compare",
  title: "Bigger, Better, Best: The Comparison Magic!",
  titleVi: "To hơn, Tốt hơn, Tốt nhất: Phép thuật So sánh!",
  level: "movers",
  skill: "reading-writing",
  icon: "📏",
  duration: "18 min",
  description: "Master comparative & superlative adjectives - the secret weapon for Movers Reading Part 4 & Writing Part 6.",
  descriptionVi: "Làm chủ tính từ so sánh hơn & nhất - vũ khí bí mật cho Movers Đọc Phần 4 & Viết Phần 6.",
  learningObjective: "Students can form -er/-est for short adjectives and 'more/most' for long adjectives correctly.",
  learningObjectiveVi: "Học sinh dùng đúng -er/-est cho tính từ ngắn và 'more/most' cho tính từ dài.",
  examPattern: "Movers Reading Part 4: Choose words to fill a story. Writing Part 6: Describe a picture using comparisons.",
  examPatternVi: "Movers Đọc Phần 4: Chọn từ điền vào truyện. Viết Phần 6: Mô tả tranh dùng so sánh.",
  secretTip: "🔑 1-2 syllable adjective → add -er/-est. 3+ syllables → use more/most. Always say it OUT LOUD to hear what sounds right!",
  secretTipVi: "🔑 Tính từ 1-2 âm tiết → thêm -er/-est. 3+ âm tiết → dùng more/most. Luôn nói TO để cảm nhận đúng!",
  welcomeMessage: "Today we discover the magic of comparing things! 📏 Bigger, better, best - let's go!",
  welcomeMessageVi: "Hôm nay khám phá phép thuật so sánh! 📏 To hơn, tốt hơn, tốt nhất - đi nào!",
  stepByStep: [
    { step: 1, title: "Count syllables", titleVi: "Đếm âm tiết", detail: "BIG = 1, HAPPY = 2, BEAUTIFUL = 4. Count the parts.", detailVi: "BIG = 1, HAPPY = 2, BEAUTIFUL = 4. Đếm phần." },
    { step: 2, title: "Apply the rule", titleVi: "Áp dụng quy tắc", detail: "1-2 syllables → -er/-est. 3+ → more/most.", detailVi: "1-2 âm tiết → -er/-est. 3+ → more/most." },
    { step: 3, title: "Watch for IRREGULARS", titleVi: "Chú ý từ BẤT QUY TẮC", detail: "good→better→best. bad→worse→worst. far→further→furthest.", detailVi: "good→better→best. bad→worse→worst. far→further→furthest." },
  ],
  illustratedRules: [
    { icon: "📏", rule: "Short (1-2 syllables): tall → taller → tallest", ruleVi: "Ngắn (1-2 âm tiết): tall → taller → tallest", example: "The giraffe is the tallest animal." },
    { icon: "📚", rule: "Long (3+ syllables): beautiful → MORE beautiful → MOST beautiful", ruleVi: "Dài (3+ âm tiết): beautiful → MORE beautiful → MOST beautiful", example: "Roses are the most beautiful flowers." },
    { icon: "✨", rule: "Special (memorize!): good→better→best, bad→worse→worst", ruleVi: "Đặc biệt (thuộc lòng!): good→better→best, bad→worse→worst", example: "Today is better than yesterday." },
  ],
  watchOut: [
    { mistake: "Writing 'more taller' or 'most tallest'", mistakeVi: "Viết 'more taller' hoặc 'most tallest'", tip: "Pick ONE: either -er/-est OR more/most, never both!", tipVi: "Chọn 1: hoặc -er/-est, hoặc more/most, KHÔNG cả hai!" },
    { mistake: "Forgetting 'than' after comparative", mistakeVi: "Quên 'than' sau so sánh hơn", tip: "Comparative = adjective+er + THAN. 'Bigger THAN'.", tipVi: "So sánh hơn = tính từ+er + THAN. 'Bigger THAN'." },
    { mistake: "Forgetting 'the' before superlative", mistakeVi: "Quên 'the' trước so sánh nhất", tip: "Superlative = THE + adjective+est. 'THE biggest'.", tipVi: "So sánh nhất = THE + tính từ+est. 'THE biggest'." },
  ],
  practiceSet: [
    { instruction: "Choose the right form", instructionVi: "Chọn hình thức đúng", question: "An elephant is ___ a mouse.", options: ["bigger than", "more bigger than", "biggest", "the biggest"], answer: 0, explanation: "Comparative needs 'er' + 'than'. 'Bigger than' is correct.", explanationVi: "So sánh hơn cần 'er' + 'than'. 'Bigger than' đúng." },
    { instruction: "Long adjective rule", instructionVi: "Quy tắc tính từ dài", question: "Mount Everest is ___ mountain in the world.", options: ["the highest", "the most high", "higher", "more high"], answer: 0, explanation: "'High' is short → -est. 'The highest' wins.", explanationVi: "'High' ngắn → -est. 'The highest' đúng." },
    { instruction: "Irregular form", instructionVi: "Dạng bất quy tắc", question: "My new bike is ___ than my old one.", options: ["gooder", "more good", "better", "best"], answer: 2, explanation: "Good → better → best. Comparative = 'better'.", explanationVi: "Good → better → best. So sánh hơn = 'better'." },
  ],
  vocabulary: [
    { word: "tall / taller / tallest", meaning: "high (for people, trees)", meaningVi: "cao", example: "Tom is the tallest in class." },
    { word: "happy / happier / happiest", meaning: "feeling glad", meaningVi: "vui (đổi y → i)", example: "She is happier today." },
    { word: "beautiful / more beautiful / most beautiful", meaning: "very pretty", meaningVi: "đẹp (dài, dùng more/most)", example: "This is the most beautiful park." },
    { word: "good / better / best", meaning: "high quality (irregular!)", meaningVi: "tốt (bất quy tắc!)", example: "She is the best singer." },
    { word: "bad / worse / worst", meaning: "not good (irregular!)", meaningVi: "tệ (bất quy tắc!)", example: "Today is the worst day." },
  ],
  quiz: [
    { question: "Comparative of 'old':", options: ["older", "more old", "oldest", "more older"], answer: 0, explanation: "Old (1 syllable) → older." },
    { question: "Superlative of 'interesting':", options: ["interestinger", "more interesting", "the most interesting", "the interestingest"], answer: 2, explanation: "Long word → 'the most interesting'." },
    { question: "Which sentence is CORRECT?", options: ["She is more taller than me.", "She is taller than me.", "She is most tallest.", "She is the more tall."], answer: 1, explanation: "Use ONLY -er + than for short adjectives." },
  ],
  parentInfo: "Comparatives and superlatives appear in ~30% of Movers writing tasks. Mastering this saves children from the most common Movers mistake.",
  parentInfoVi: "So sánh hơn/nhất xuất hiện ~30% bài viết Movers. Làm chủ giúp tránh lỗi phổ biến nhất.",
  illustrationKey: "movers",
  isNew: true,
};

const moversWeatherSeasons: CambridgeLecture = {
  id: "cam-movers-weather-seasons",
  title: "Weather Wizards: Sun, Rain & Snow!",
  titleVi: "Phù thủy thời tiết: Nắng, Mưa & Tuyết!",
  level: "movers",
  skill: "listening",
  icon: "☀️",
  duration: "16 min",
  description: "Listen to weather forecasts and pick the right symbol - Listening Part 5 made easy!",
  descriptionVi: "Nghe dự báo thời tiết và chọn biểu tượng đúng - Nghe Phần 5 dễ như chơi!",
  learningObjective: "Students recognize 12 weather words and 4 seasons by listening.",
  learningObjectiveVi: "Học sinh nhận diện 12 từ thời tiết và 4 mùa qua nghe.",
  examPattern: "Movers Listening Part 5: Color and write - listen for the weather described and color the correct picture.",
  examPatternVi: "Movers Nghe Phần 5: Tô và viết - nghe thời tiết được mô tả và tô đúng tranh.",
  secretTip: "🔑 The weather word always comes with 'It is/was ___'. Listen for THIS pattern!",
  secretTipVi: "🔑 Từ thời tiết luôn đi kèm 'It is/was ___'. Nghe theo MẪU này!",
  welcomeMessage: "Brrr! ❄️ Wow! ☀️ Today we become weather wizards!",
  welcomeMessageVi: "Brrr! ❄️ Wow! ☀️ Hôm nay làm phù thủy thời tiết!",
  stepByStep: [
    { step: 1, title: "Group weather by season", titleVi: "Nhóm thời tiết theo mùa", detail: "Spring=warm, Summer=hot/sunny, Autumn=windy, Winter=cold/snowy.", detailVi: "Xuân=ấm, Hè=nóng/nắng, Thu=gió, Đông=lạnh/tuyết." },
    { step: 2, title: "Listen for 'It is + weather'", titleVi: "Nghe 'It is + thời tiết'", detail: "Examples: It is raining. It was sunny. It will be cold.", detailVi: "Ví dụ: It is raining. It was sunny. It will be cold." },
    { step: 3, title: "Match weather to clothes", titleVi: "Khớp thời tiết với quần áo", detail: "Cold → coat, hat. Hot → t-shirt, shorts. Rain → umbrella.", detailVi: "Lạnh → áo khoác, mũ. Nóng → áo phông, quần đùi. Mưa → ô." },
  ],
  illustratedRules: [
    { icon: "☀️", rule: "Sunny / Hot → summer, t-shirt, shorts, ice cream", ruleVi: "Nắng / Nóng → hè, áo phông, quần đùi, kem", example: "It is sunny. I wear my t-shirt." },
    { icon: "🌧️", rule: "Rainy → umbrella, raincoat, boots", ruleVi: "Mưa → ô, áo mưa, ủng", example: "It's raining. Take your umbrella!" },
    { icon: "❄️", rule: "Snowy / Cold → winter, coat, scarf, gloves", ruleVi: "Tuyết / Lạnh → đông, áo khoác, khăn, găng", example: "It snowed. We made a snowman." },
    { icon: "🌬️", rule: "Windy → autumn, kite, leaves flying", ruleVi: "Có gió → thu, diều, lá bay", example: "It is windy. My kite flies high." },
  ],
  watchOut: [
    { mistake: "Mixing 'sunny' and 'snowy'", mistakeVi: "Nhầm 'sunny' và 'snowy'", tip: "SUNny = sun (hot). SNOWy = snow (cold). Listen for the FIRST sound: S-UH vs S-NO.", tipVi: "SUNny = nắng (nóng). SNOWy = tuyết (lạnh). Nghe âm đầu: S-UH vs S-NO." },
    { mistake: "Forgetting 'It is' before weather word", mistakeVi: "Quên 'It is' trước từ thời tiết", tip: "Always start with 'It is' (now) or 'It was' (past).", tipVi: "Luôn bắt đầu với 'It is' (hiện tại) hoặc 'It was' (quá khứ)." },
  ],
  practiceSet: [
    { instruction: "Match clothes to weather", instructionVi: "Khớp đồ với thời tiết", question: "It is hot and sunny. What do you wear?", options: ["A coat", "A t-shirt and shorts", "Boots and umbrella", "A scarf"], answer: 1, explanation: "Hot weather → light clothes.", explanationVi: "Trời nóng → đồ mỏng." },
    { instruction: "Pick the season", instructionVi: "Chọn mùa", question: "It is snowing and very cold. What season is it?", options: ["Spring", "Summer", "Autumn", "Winter"], answer: 3, explanation: "Snow + cold = winter.", explanationVi: "Tuyết + lạnh = đông." },
  ],
  vocabulary: [
    { word: "sunny", meaning: "with sun", meaningVi: "có nắng", example: "It is sunny today." },
    { word: "rainy", meaning: "with rain", meaningVi: "có mưa", example: "Mondays are often rainy." },
    { word: "snowy", meaning: "with snow", meaningVi: "có tuyết", example: "December is snowy here." },
    { word: "windy", meaning: "with wind", meaningVi: "có gió", example: "Autumn is windy." },
    { word: "cloudy", meaning: "with clouds", meaningVi: "có mây", example: "The sky is cloudy." },
    { word: "umbrella", meaning: "tool that keeps rain off you", meaningVi: "cái ô", example: "Take an umbrella!" },
    { word: "scarf", meaning: "warm cloth around neck", meaningVi: "khăn quàng", example: "Wear a scarf in winter." },
  ],
  quiz: [
    { question: "Which is NOT weather?", options: ["sunny", "windy", "happy", "rainy"], answer: 2, explanation: "'Happy' is a feeling, not weather." },
    { question: "Best clothes for snow:", options: ["shorts", "swimsuit", "warm coat", "sandals"], answer: 2, explanation: "Snow = cold → warm coat." },
  ],
  parentInfo: "Weather and seasons are core Movers vocabulary. The 'It is + weather' pattern is the most-tested sentence frame in Movers Listening Part 5.",
  parentInfoVi: "Thời tiết & mùa là từ vựng cốt lõi Movers. Mẫu 'It is + thời tiết' là cấu trúc được test nhiều nhất Phần 5.",
  illustrationKey: "movers",
  isNew: true,
};

// ============================================================
// FLYERS - 2 bài
// ============================================================
const flyersStoryWriting: CambridgeLecture = {
  id: "cam-flyers-story-writing",
  title: "Story Maker: Build a 35-Word Adventure!",
  titleVi: "Người kể chuyện: Xây phiêu lưu 35 từ!",
  level: "flyers",
  skill: "reading-writing",
  icon: "📖",
  duration: "20 min",
  description: "Master the 3-picture story task - Reading & Writing Part 7 - with the BEGINNING-MIDDLE-END formula.",
  descriptionVi: "Làm chủ bài viết 3 tranh - Đọc & Viết Phần 7 - với công thức MỞ-THÂN-KẾT.",
  learningObjective: "Students write a 20-35 word story describing 3 pictures with correct sequence words.",
  learningObjectiveVi: "Học sinh viết truyện 20-35 từ mô tả 3 tranh với từ chỉ trình tự đúng.",
  examPattern: "Flyers R&W Part 7: 3 pictures shown. Write a story (20-35 words). Use sequence words: First, Then, Finally.",
  examPatternVi: "Flyers Đọc & Viết Phần 7: 3 tranh. Viết truyện (20-35 từ). Dùng từ trình tự: First, Then, Finally.",
  secretTip: "🔑 Use the 3-word formula: First… Then… Finally… One sentence per picture = perfect length!",
  secretTipVi: "🔑 Dùng công thức 3 từ: First… Then… Finally… Mỗi tranh 1 câu = độ dài hoàn hảo!",
  welcomeMessage: "Today YOU are the storyteller! 📖 Three pictures, one amazing story!",
  welcomeMessageVi: "Hôm nay BẠN là người kể chuyện! 📖 Ba tranh, một truyện tuyệt vời!",
  stepByStep: [
    { step: 1, title: "Look at all 3 pictures", titleVi: "Nhìn cả 3 tranh", detail: "What is the WHOLE story? Who is the main character?", detailVi: "Cả truyện kể gì? Nhân vật chính là ai?" },
    { step: 2, title: "Write 1 sentence per picture", titleVi: "Viết 1 câu/tranh", detail: "Picture 1 = First… Picture 2 = Then… Picture 3 = Finally…", detailVi: "Tranh 1 = First… Tranh 2 = Then… Tranh 3 = Finally…" },
    { step: 3, title: "Count your words", titleVi: "Đếm số từ", detail: "Aim for 20-35 words. Less = lose marks. More = no extra marks.", detailVi: "Mục tiêu 20-35 từ. Ít hơn = mất điểm. Nhiều hơn = không thêm điểm." },
  ],
  illustratedRules: [
    { icon: "1️⃣", rule: "BEGINNING: 'First, [character] [action] [where].'", ruleVi: "MỞ: 'First, [nhân vật] [hành động] [ở đâu].'", example: "First, Tom went to the park with his dog." },
    { icon: "2️⃣", rule: "MIDDLE: 'Then, [problem or surprise].'", ruleVi: "THÂN: 'Then, [vấn đề hoặc bất ngờ].'", example: "Then, his dog ran into the trees." },
    { icon: "3️⃣", rule: "END: 'Finally, [solution or feeling].'", ruleVi: "KẾT: 'Finally, [giải pháp hoặc cảm xúc].'", example: "Finally, Tom found his dog and they were happy." },
  ],
  watchOut: [
    { mistake: "Writing only 1 long sentence", mistakeVi: "Viết chỉ 1 câu dài", tip: "Use 3 short sentences. Each picture needs its own sentence.", tipVi: "Dùng 3 câu ngắn. Mỗi tranh cần 1 câu riêng." },
    { mistake: "Forgetting past tense", mistakeVi: "Quên thì quá khứ", tip: "Stories use past tense: went, saw, ran, found, were.", tipVi: "Truyện dùng quá khứ: went, saw, ran, found, were." },
    { mistake: "Writing under 20 words", mistakeVi: "Viết dưới 20 từ", tip: "Add WHO, WHERE, HOW or WHY to extend each sentence.", tipVi: "Thêm AI, Ở ĐÂU, CÁCH NÀO, VÌ SAO để kéo dài câu." },
  ],
  practiceSet: [
    { instruction: "Choose the best START", instructionVi: "Chọn câu MỞ tốt nhất", question: "Picture 1 shows a girl and a kite at the beach.", options: ["Girl kite.", "First, Anna went to the beach with her new kite.", "She going.", "Beach is."], answer: 1, explanation: "Uses 'First', past tense, full sentence with WHO/WHAT/WHERE.", explanationVi: "Dùng 'First', thì quá khứ, đủ AI/CÁI GÌ/Ở ĐÂU." },
    { instruction: "Best ENDING sentence", instructionVi: "Câu KẾT tốt nhất", question: "Picture 3 shows the kite in a tree and Anna sad.", options: ["Sad.", "Kite tree.", "Finally, the kite got stuck in a tree and Anna was sad.", "She no kite."], answer: 2, explanation: "'Finally', past tense, complete idea with feeling.", explanationVi: "'Finally', quá khứ, ý hoàn chỉnh có cảm xúc." },
  ],
  vocabulary: [
    { word: "first", meaning: "at the beginning (story word)", meaningVi: "đầu tiên", example: "First, he opened the door." },
    { word: "then", meaning: "after that", meaningVi: "sau đó", example: "Then, he saw a cat." },
    { word: "finally", meaning: "at the end", meaningVi: "cuối cùng", example: "Finally, they went home." },
    { word: "suddenly", meaning: "very quickly, surprise!", meaningVi: "đột nhiên", example: "Suddenly, it started to rain." },
    { word: "happily", meaning: "in a happy way", meaningVi: "vui vẻ", example: "They played happily all day." },
  ],
  quiz: [
    { question: "Best word to START a Flyers story:", options: ["Then", "First", "Finally", "Suddenly"], answer: 1, explanation: "'First' opens stories." },
    { question: "Story word count target:", options: ["10-15", "20-35", "50-60", "100+"], answer: 1, explanation: "20-35 words is the Flyers requirement." },
    { question: "Stories should be in:", options: ["Past tense", "Future tense", "Question form", "Exclamation"], answer: 0, explanation: "Stories describe past events." },
  ],
  parentInfo: "Story-writing is the highest-mark Flyers writing task. The First/Then/Finally formula gives children a reliable structure they can use even under exam pressure.",
  parentInfoVi: "Viết truyện là phần điểm cao nhất Flyers. Công thức First/Then/Finally cho cấu trúc đáng tin cậy ngay cả khi áp lực thi.",
  illustrationKey: "flyers",
  isNew: true,
};

const flyersListeningTraps: CambridgeLecture = {
  id: "cam-flyers-listening-traps",
  title: "Flyers Listening Part 1: Don't Fall for the Trap!",
  titleVi: "Flyers Nghe Phần 1: Đừng mắc bẫy!",
  level: "flyers",
  skill: "listening",
  icon: "🎯",
  duration: "18 min",
  description: "Decode the 3 most common distractor traps in Flyers Listening Part 1 (Match names to people).",
  descriptionVi: "Giải mã 3 bẫy phổ biến nhất Flyers Nghe Phần 1 (Nối tên với người).",
  learningObjective: "Students identify the correct person by listening to TWO clues, not just ONE.",
  learningObjectiveVi: "Học sinh xác định người đúng bằng cách nghe HAI manh mối, không chỉ MỘT.",
  examPattern: "Flyers Listening Part 1: 7 names + 1 picture with many people. Draw a line from name to person.",
  examPatternVi: "Flyers Nghe Phần 1: 7 tên + 1 tranh nhiều người. Kẻ đường từ tên đến người.",
  secretTip: "🔑 Each person has TWO clues (clothes + activity OR position + accessory). You need BOTH to find the right person!",
  secretTipVi: "🔑 Mỗi người có HAI manh mối (đồ + hoạt động HOẶC vị trí + phụ kiện). Cần CẢ HAI để tìm đúng người!",
  welcomeMessage: "Detective time! 🔍 We'll catch every trap in Flyers Listening Part 1!",
  welcomeMessageVi: "Giờ thám tử! 🔍 Bắt mọi bẫy trong Flyers Nghe Phần 1!",
  stepByStep: [
    { step: 1, title: "Scan the picture for differences", titleVi: "Quét tranh tìm khác biệt", detail: "Note clothes (colors), activities (sitting, running), accessories (hat, glasses).", detailVi: "Ghi áo (màu), hoạt động (ngồi, chạy), phụ kiện (mũ, kính)." },
    { step: 2, title: "Listen for TWO clues per person", titleVi: "Nghe HAI manh mối/người", detail: "Example: 'The boy with glasses, who is reading a book.' = glasses + reading.", detailVi: "Ví dụ: 'The boy with glasses, who is reading a book.' = kính + đang đọc." },
    { step: 3, title: "Check ALL people match clue 1", titleVi: "Kiểm tra mọi người khớp manh mối 1", detail: "If 2 people have glasses, use clue 2 (reading) to choose the right one.", detailVi: "Nếu 2 người đeo kính, dùng manh mối 2 (đọc) để chọn đúng." },
  ],
  illustratedRules: [
    { icon: "👕", rule: "Clue type 1 = APPEARANCE (colors, clothes, hair, accessories)", ruleVi: "Manh mối loại 1 = NGOẠI HÌNH (màu, đồ, tóc, phụ kiện)", example: "The girl with long red hair…" },
    { icon: "🏃", rule: "Clue type 2 = ACTION (sitting, running, eating, holding)", ruleVi: "Manh mối loại 2 = HÀNH ĐỘNG (ngồi, chạy, ăn, cầm)", example: "…who is holding a balloon." },
    { icon: "📍", rule: "Clue type 3 = POSITION (next to, behind, in front of)", ruleVi: "Manh mối loại 3 = VỊ TRÍ (cạnh, sau, trước)", example: "The boy next to the tree…" },
  ],
  watchOut: [
    { mistake: "Picking the first person who matches clue 1", mistakeVi: "Chọn ngay người đầu khớp manh mối 1", tip: "WAIT for the second clue. Two people may share the first clue!", tipVi: "ĐỢI manh mối 2. Hai người có thể chia sẻ manh mối 1!" },
    { mistake: "Confusing 'next to' and 'behind'", mistakeVi: "Nhầm 'next to' và 'behind'", tip: "Next to = beside (sides). Behind = back. In front of = forward.", tipVi: "Next to = cạnh. Behind = sau. In front of = trước." },
  ],
  practiceSet: [
    { instruction: "Use TWO clues", instructionVi: "Dùng HAI manh mối", question: "Audio: 'Sam is the boy with a hat, holding a kite.' Picture has 3 boys with hats. Which is Sam?", options: ["The first boy with a hat", "The boy with a hat AND a kite", "Any boy with a hat", "The smallest boy"], answer: 1, explanation: "BOTH clues must match: hat + kite.", explanationVi: "CẢ HAI manh mối phải khớp: mũ + diều." },
  ],
  vocabulary: [
    { word: "next to", meaning: "beside / on the side", meaningVi: "cạnh", example: "The cat is next to the dog." },
    { word: "behind", meaning: "at the back", meaningVi: "phía sau", example: "She is behind the tree." },
    { word: "in front of", meaning: "ahead of", meaningVi: "trước mặt", example: "He stands in front of the house." },
    { word: "between", meaning: "in the middle of two", meaningVi: "ở giữa hai", example: "Sam is between Tom and Anna." },
    { word: "holding", meaning: "having in your hand", meaningVi: "đang cầm", example: "She is holding a flower." },
  ],
  quiz: [
    { question: "Why use TWO clues?", options: ["Because the test is hard", "Because many people share ONE feature", "To use more time", "To be polite"], answer: 1, explanation: "Two clues separate similar people." },
    { question: "'The girl behind the chair' means the girl is:", options: ["On the chair", "In front of the chair", "Behind / at the back of the chair", "Under the chair"], answer: 2, explanation: "Behind = at the back." },
  ],
  parentInfo: "Listening Part 1 is the most-missed Flyers section. Two-clue strategy raises accuracy from 50% to 90% for most learners.",
  parentInfoVi: "Nghe Phần 1 là phần sai nhiều nhất Flyers. Chiến lược 2 manh mối nâng độ chính xác từ 50% lên 90%.",
  illustrationKey: "flyers",
  isNew: true,
};

// ============================================================
// KET - 2 bài
// ============================================================
const ketWritingMessage: CambridgeLecture = {
  id: "cam-ket-writing-message",
  title: "KET Writing Part 6: The 25-Word Message Formula",
  titleVi: "KET Viết Phần 6: Công thức tin nhắn 25 từ",
  level: "ket",
  skill: "reading-writing",
  icon: "✉️",
  duration: "22 min",
  description: "Write a perfect short message (25-35 words) covering ALL three points - the highest-scoring formula.",
  descriptionVi: "Viết tin nhắn ngắn hoàn hảo (25-35 từ) phủ CẢ ba ý - công thức điểm cao nhất.",
  learningObjective: "Students cover all 3 content points within 25-35 words while maintaining correct grammar.",
  learningObjectiveVi: "Học sinh phủ cả 3 ý trong 25-35 từ với ngữ pháp đúng.",
  examPattern: "KET R&W Part 6: Email/note with 3 bullet points to cover. Score = 5 marks (content + language).",
  examPatternVi: "KET Đọc & Viết Phần 6: Email/note với 3 ý cần phủ. Điểm = 5 (nội dung + ngôn ngữ).",
  secretTip: "🔑 Address ALL 3 bullet points = full content marks. Miss one = automatic -1. The order doesn't matter, but EVERY point must appear!",
  secretTipVi: "🔑 Phủ CẢ 3 ý = điểm nội dung tối đa. Thiếu 1 = mất 1 điểm. Thứ tự không quan trọng nhưng MỌI ý phải có!",
  welcomeMessage: "Time to write like a pro! ✉️ 25 words, 3 points, 5 marks. Let's nail it!",
  welcomeMessageVi: "Đến lúc viết như pro! ✉️ 25 từ, 3 ý, 5 điểm. Cùng đạt điểm!",
  stepByStep: [
    { step: 1, title: "Underline all 3 bullet points", titleVi: "Gạch chân cả 3 ý", detail: "Before writing, mark exactly what you must cover.", detailVi: "Trước khi viết, đánh dấu chính xác phải phủ gì." },
    { step: 2, title: "Write greeting + 3 sentences + sign-off", titleVi: "Viết chào + 3 câu + ký tên", detail: "Hi [Name], [point 1]. [point 2]. [point 3]. See you soon, [Your name].", detailVi: "Hi [Tên], [ý 1]. [ý 2]. [ý 3]. See you soon, [Tên bạn]." },
    { step: 3, title: "Count words & check grammar", titleVi: "Đếm từ & soát ngữ pháp", detail: "25-35 words. Check verbs (am/is/are, was/were) and prepositions (in/on/at).", detailVi: "25-35 từ. Soát động từ và giới từ." },
  ],
  illustratedRules: [
    { icon: "👋", rule: "Opening: 'Hi [name],' - informal & friendly", ruleVi: "Mở: 'Hi [tên],' - thân mật", example: "Hi Anna," },
    { icon: "📝", rule: "Body: 1 sentence per bullet point (3 sentences total)", ruleVi: "Thân: 1 câu/ý (tổng 3 câu)", example: "Thanks for inviting me. I will come at 7 pm. I'll bring a cake." },
    { icon: "👋", rule: "Closing: 'See you soon, [your name]' OR 'Bye, [name]'", ruleVi: "Kết: 'See you soon, [tên bạn]' HOẶC 'Bye, [tên]'", example: "See you soon, Tom" },
  ],
  watchOut: [
    { mistake: "Missing one of the 3 bullet points", mistakeVi: "Thiếu 1 trong 3 ý", tip: "Tick (✓) each bullet as you write it. Don't sign off until ALL 3 are ticked.", tipVi: "Tick (✓) mỗi ý khi viết xong. Đừng ký tên đến khi CẢ 3 đã tick." },
    { mistake: "Writing 50+ words", mistakeVi: "Viết quá 50 từ", tip: "Long messages waste time and may have more errors. Keep it short and correct.", tipVi: "Tin nhắn dài tốn giờ và dễ sai. Ngắn và đúng tốt hơn." },
    { mistake: "Forgetting to sign your name", mistakeVi: "Quên ký tên", tip: "Always end with your name. Examiners look for it!", tipVi: "Luôn kết bằng tên. Giám khảo tìm nó!" },
  ],
  practiceSet: [
    { instruction: "Identify the 3 points", instructionVi: "Nhận diện 3 ý", question: "Task: Write to your friend Sam. • Thank him for the gift • Say what you'll do with it • Invite him to your house. How many sentences in the body?", options: ["1", "2", "3", "5"], answer: 2, explanation: "1 sentence per bullet = 3 sentences.", explanationVi: "1 câu/ý = 3 câu." },
    { instruction: "Find the missing point", instructionVi: "Tìm ý thiếu", question: "Message: 'Hi Sam, Thanks for the book! I'll read it tonight. See you, Tom.' Which bullet is missing?", options: ["Thanks", "Plan to use it", "Invitation", "Sign-off"], answer: 2, explanation: "The invitation to your house is missing → loses content marks.", explanationVi: "Lời mời đến nhà thiếu → mất điểm nội dung." },
  ],
  vocabulary: [
    { word: "Thanks for…", meaning: "polite thank-you opener", meaningVi: "cảm ơn vì…", example: "Thanks for the lovely card." },
    { word: "I'd love to…", meaning: "polite acceptance", meaningVi: "tôi rất muốn…", example: "I'd love to come to your party." },
    { word: "Sorry, I can't…", meaning: "polite refusal", meaningVi: "xin lỗi, tôi không thể…", example: "Sorry, I can't come on Friday." },
    { word: "See you soon", meaning: "friendly closing", meaningVi: "hẹn gặp sớm", example: "See you soon, Maria." },
    { word: "Let me know", meaning: "ask for reply", meaningVi: "cho tôi biết", example: "Let me know what time is good." },
  ],
  quiz: [
    { question: "Word target for KET Part 6:", options: ["10-15", "25-35", "60-80", "100+"], answer: 1, explanation: "25-35 words is required." },
    { question: "How many content points must you cover?", options: ["1", "2", "3", "Any number"], answer: 2, explanation: "All 3 bullet points must appear." },
    { question: "Best opening for an INFORMAL message:", options: ["Dear Sir,", "To Whom It May Concern,", "Hi Anna,", "Greetings,"], answer: 2, explanation: "'Hi [name],' fits informal KET tasks." },
  ],
  parentInfo: "KET Writing Part 6 is worth 5 of 30 writing marks. The 3-bullet checklist removes guesswork and guarantees full content credit.",
  parentInfoVi: "KET Viết Phần 6 đáng 5/30 điểm viết. Checklist 3 ý loại bỏ mò mẫm và đảm bảo điểm nội dung.",
  illustrationKey: "ket",
  isNew: true,
};

const ketReadingSigns: CambridgeLecture = {
  id: "cam-ket-reading-signs",
  title: "KET Reading Part 1: Decoding Signs in 30 Seconds",
  titleVi: "KET Đọc Phần 1: Giải mã biển báo trong 30 giây",
  level: "ket",
  skill: "reading-writing",
  icon: "🚸",
  duration: "20 min",
  description: "Match signs and short messages to their meaning - Part 1 done in under 5 minutes.",
  descriptionVi: "Nối biển báo và tin ngắn với nghĩa - Phần 1 hoàn thành dưới 5 phút.",
  learningObjective: "Students decode the function (warning, instruction, info) of any short text or sign.",
  learningObjectiveVi: "Học sinh giải mã chức năng (cảnh báo, hướng dẫn, thông tin) của mọi văn bản/biển ngắn.",
  examPattern: "KET R&W Part 1: 6 short texts (signs, notes, ads). Match each to one of 8 meanings (A-H).",
  examPatternVi: "KET Đọc & Viết Phần 1: 6 văn bản ngắn. Nối mỗi cái với 1 trong 8 nghĩa (A-H).",
  secretTip: "🔑 Categorize each sign in 3 seconds: WARNING (don't!), INSTRUCTION (do!), INFO (just telling). This narrows your options instantly.",
  secretTipVi: "🔑 Phân loại mỗi biển trong 3 giây: CẢNH BÁO (đừng!), HƯỚNG DẪN (làm!), THÔNG TIN (chỉ nói). Thu hẹp lựa chọn ngay.",
  welcomeMessage: "Sign detective mode ON! 🔍 Read fast, decode faster!",
  welcomeMessageVi: "Bật chế độ thám tử biển báo! 🔍 Đọc nhanh, giải mã nhanh hơn!",
  stepByStep: [
    { step: 1, title: "Identify TYPE in 3 seconds", titleVi: "Nhận diện LOẠI trong 3 giây", detail: "Warning, instruction, info, request, advice, prohibition.", detailVi: "Cảnh báo, hướng dẫn, thông tin, đề nghị, lời khuyên, cấm." },
    { step: 2, title: "Find the KEY VERB", titleVi: "Tìm ĐỘNG TỪ chính", detail: "'Don't' = prohibition. 'Please' = request. 'Free' = info.", detailVi: "'Don't' = cấm. 'Please' = đề nghị. 'Free' = thông tin." },
    { step: 3, title: "Eliminate impossible meanings", titleVi: "Loại nghĩa không thể", detail: "Cross out 4-5 options that don't match the type. Choose from the remaining 2-3.", detailVi: "Gạch 4-5 lựa chọn không khớp loại. Chọn từ 2-3 còn lại." },
  ],
  illustratedRules: [
    { icon: "🚫", rule: "PROHIBITION: 'No smoking', 'Do not enter', 'Out of order'", ruleVi: "CẤM: 'No smoking', 'Do not enter', 'Out of order'", example: "Out of order = you cannot use this." },
    { icon: "📢", rule: "INSTRUCTION: 'Please pay here', 'Use the side door'", ruleVi: "HƯỚNG DẪN: 'Please pay here', 'Use the side door'", example: "Please pay here = pay at this counter." },
    { icon: "ℹ️", rule: "INFO: 'Open 9-5', 'Half price today', '20% off'", ruleVi: "THÔNG TIN: 'Open 9-5', 'Half price today', '20% off'", example: "Half price = pay 50% only." },
  ],
  watchOut: [
    { mistake: "Reading the sign word-by-word", mistakeVi: "Đọc biển từng từ", tip: "Read the WHOLE sign once, then decide the type. Don't get stuck on one word.", tipVi: "Đọc CẢ biển 1 lần rồi quyết định loại. Đừng kẹt ở 1 từ." },
    { mistake: "Picking a meaning that uses similar words", mistakeVi: "Chọn nghĩa dùng từ giống", tip: "Cambridge tests PARAPHRASING. The right answer rephrases - it doesn't repeat.", tipVi: "Cambridge test viết LẠI. Đáp án đúng diễn đạt khác - không lặp." },
  ],
  practiceSet: [
    { instruction: "Decode the sign", instructionVi: "Giải mã biển", question: "Sign in a shop: 'Buy one get one free!' Best meaning:", options: ["Pay double", "Take 2 items, pay for 1", "Shop is closed", "No entry"], answer: 1, explanation: "BOGOF = 2 for the price of 1.", explanationVi: "BOGOF = 2 với giá 1." },
    { instruction: "Match to meaning", instructionVi: "Khớp với nghĩa", question: "Note: 'Mum, I've gone to the gym. Back at 6.' Best meaning:", options: ["Mum is at the gym", "The writer is at the gym until 6", "The gym is closed", "Visit at 6"], answer: 1, explanation: "Writer = at gym, returning at 6.", explanationVi: "Người viết = ở gym, về lúc 6." },
  ],
  vocabulary: [
    { word: "out of order", meaning: "broken / not working", meaningVi: "hỏng / không dùng được", example: "The lift is out of order." },
    { word: "half price", meaning: "50% off", meaningVi: "nửa giá", example: "All shoes are half price today." },
    { word: "ban / banned", meaning: "not allowed", meaningVi: "cấm", example: "Smoking is banned here." },
    { word: "permit", meaning: "allow", meaningVi: "cho phép", example: "Dogs are not permitted." },
    { word: "discount", meaning: "lower price", meaningVi: "giảm giá", example: "10% discount for students." },
  ],
  quiz: [
    { question: "'No parking' means:", options: ["You can park", "You cannot park here", "Parking is free", "Park anywhere"], answer: 1, explanation: "'No' + verb = cannot do." },
    { question: "Best strategy for KET Part 1:", options: ["Read every word twice", "Categorize sign type FIRST", "Pick the longest option", "Always pick A"], answer: 1, explanation: "Type-categorization is fastest." },
  ],
  parentInfo: "Reading Part 1 is the easiest section to maximize - strategy alone can lift score from 4/6 to 6/6.",
  parentInfoVi: "Đọc Phần 1 là phần dễ tối đa điểm - chiến lược nâng điểm từ 4/6 lên 6/6.",
  illustrationKey: "ket",
  isNew: true,
};

// ============================================================
// PET - 2 bài
// ============================================================
const petEmailWriting: CambridgeLecture = {
  id: "cam-pet-email-writing",
  title: "PET Writing Part 1: The 100-Word Email Blueprint",
  titleVi: "PET Viết Phần 1: Bản thiết kế Email 100 từ",
  level: "pet",
  skill: "reading-writing",
  icon: "📧",
  duration: "25 min",
  description: "Plan and write a 100-word email that responds to all 4 prompts - the B1-level writing benchmark.",
  descriptionVi: "Lập kế hoạch và viết email 100 từ trả lời cả 4 gợi ý - chuẩn viết B1.",
  learningObjective: "Students respond to all 4 underlined prompts in clear, organized paragraphs (~100 words).",
  learningObjectiveVi: "Học sinh trả lời cả 4 gợi ý gạch chân trong các đoạn rõ ràng (~100 từ).",
  examPattern: "PET R&W Part 1: Email with 4 underlined notes (e.g., 'Yes, please!', 'Tell me more!', 'Sorry…', 'Great idea!'). Write 100 words.",
  examPatternVi: "PET Đọc & Viết Phần 1: Email có 4 ghi chú gạch chân. Viết 100 từ.",
  secretTip: "🔑 Each underlined note = one paragraph (~25 words). 4 paragraphs × 25 words = 100 words PERFECTLY.",
  secretTipVi: "🔑 Mỗi ghi chú gạch chân = 1 đoạn (~25 từ). 4 đoạn × 25 từ = 100 từ HOÀN HẢO.",
  welcomeMessage: "Welcome to PET writing! 📧 100 words, 4 prompts, 1 amazing email!",
  welcomeMessageVi: "Chào mừng đến với PET! 📧 100 từ, 4 gợi ý, 1 email tuyệt vời!",
  stepByStep: [
    { step: 1, title: "Underline ALL 4 notes", titleVi: "Gạch chân CẢ 4 ghi chú", detail: "Each underlined word/phrase = one prompt to respond to.", detailVi: "Mỗi từ/cụm gạch chân = 1 gợi ý cần trả lời." },
    { step: 2, title: "Plan 4 paragraphs (1 per note)", titleVi: "Lên kế hoạch 4 đoạn (1/ghi chú)", detail: "Para 1 → note 1. Para 2 → note 2. Etc. Use connectors: First, Also, However, Finally.", detailVi: "Đoạn 1 → ghi chú 1. Đoạn 2 → ghi chú 2. Dùng từ nối: First, Also, However, Finally." },
    { step: 3, title: "Write greeting + body + closing", titleVi: "Viết chào + thân + kết", detail: "Hi [name], … 4 paragraphs … Bye for now, [your name].", detailVi: "Hi [tên], … 4 đoạn … Bye for now, [tên bạn]." },
  ],
  illustratedRules: [
    { icon: "✅", rule: "Note 'Yes, please!' → ACCEPT and add 1 detail", ruleVi: "Ghi chú 'Yes, please!' → CHẤP NHẬN + 1 chi tiết", example: "Yes, I'd love to come! I'm free on Saturday." },
    { icon: "❓", rule: "Note 'Tell me more!' → ASK 1-2 questions", ruleVi: "Ghi chú 'Tell me more!' → HỎI 1-2 câu", example: "Could you tell me what time it starts? And where exactly?" },
    { icon: "🙅", rule: "Note 'Sorry, I can't!' → DECLINE + REASON + ALTERNATIVE", ruleVi: "Ghi chú 'Sorry, I can't!' → TỪ CHỐI + LÝ DO + GIẢI PHÁP", example: "Unfortunately, I can't make it because I have an exam. Can we meet next week instead?" },
    { icon: "💡", rule: "Note 'Great idea!' → PRAISE + 1 suggestion", ruleVi: "Ghi chú 'Great idea!' → KHEN + 1 đề xuất", example: "Brilliant idea! We could also invite Maria - she loves picnics." },
  ],
  watchOut: [
    { mistake: "Writing only 60 words", mistakeVi: "Viết chỉ 60 từ", tip: "Below 80 = automatic mark drop. Aim for 90-110 words.", tipVi: "Dưới 80 = tự động mất điểm. Nhắm 90-110 từ." },
    { mistake: "Ignoring one of the 4 notes", mistakeVi: "Bỏ qua 1 trong 4 ghi chú", tip: "Each missed note = -1 content mark. Number your notes 1-4 and tick after each paragraph.", tipVi: "Mỗi ghi chú bỏ qua = -1 điểm. Đánh số 1-4 và tick sau mỗi đoạn." },
    { mistake: "Using too informal language", mistakeVi: "Dùng quá thân mật", tip: "PET is semi-formal. Avoid 'gonna', 'wanna'. Use 'going to', 'want to'.", tipVi: "PET bán trang trọng. Tránh 'gonna', 'wanna'. Dùng 'going to', 'want to'." },
  ],
  practiceSet: [
    { instruction: "Match note to response", instructionVi: "Khớp ghi chú với phản hồi", question: "Note: 'Sorry, I can't!' Best response start:", options: ["Yes please!", "Tell me!", "I'd love to but I have football practice that day. How about Sunday?", "Great!"], answer: 2, explanation: "Decline + reason + alternative is the full pattern.", explanationVi: "Từ chối + lý do + giải pháp = mẫu đầy đủ." },
    { instruction: "Count words", instructionVi: "Đếm từ", question: "Target word count:", options: ["50-60", "75-90", "90-110", "150+"], answer: 2, explanation: "PET requires ~100 words.", explanationVi: "PET yêu cầu ~100 từ." },
  ],
  vocabulary: [
    { word: "I'd love to…", meaning: "polite enthusiastic acceptance", meaningVi: "tôi rất muốn…", example: "I'd love to join you on Saturday." },
    { word: "Unfortunately", meaning: "polite negative opener", meaningVi: "tiếc là", example: "Unfortunately, I can't come tonight." },
    { word: "Could you tell me…?", meaning: "polite question", meaningVi: "bạn có thể cho tôi biết…?", example: "Could you tell me when it starts?" },
    { word: "How about…?", meaning: "suggesting alternative", meaningVi: "hay là…?", example: "How about meeting on Sunday instead?" },
    { word: "Bye for now", meaning: "friendly closing", meaningVi: "tạm biệt", example: "Bye for now, Tom." },
  ],
  quiz: [
    { question: "How many notes must you respond to?", options: ["1", "2", "3", "All 4"], answer: 3, explanation: "All 4 underlined notes must be addressed." },
    { question: "Word count target:", options: ["50", "75", "100", "200"], answer: 2, explanation: "~100 words is correct for PET Part 1." },
    { question: "Best phrase to politely refuse:", options: ["No way!", "Unfortunately, I can't…", "Bye!", "Whatever"], answer: 1, explanation: "'Unfortunately, I can't…' is polite and B1-level." },
  ],
  parentInfo: "PET Writing Part 1 is worth 20% of the writing score. The 4-paragraph blueprint guarantees full content marks every time.",
  parentInfoVi: "PET Viết Phần 1 chiếm 20% điểm viết. Bản thiết kế 4 đoạn đảm bảo điểm nội dung tối đa.",
  illustrationKey: "pet",
  isNew: true,
};

const petListeningPart3: CambridgeLecture = {
  id: "cam-pet-listening-part3",
  title: "PET Listening Part 3: Note-Taking Like a Pro",
  titleVi: "PET Nghe Phần 3: Ghi chú như chuyên gia",
  level: "pet",
  skill: "listening",
  icon: "📝",
  duration: "22 min",
  description: "Master gap-fill notes from a monologue - Part 3 of PET Listening - with the 'predict-listen-verify' method.",
  descriptionVi: "Làm chủ điền chỗ trống từ độc thoại - Phần 3 PET Nghe - với phương pháp 'đoán-nghe-xác minh'.",
  learningObjective: "Students fill 6 gaps with the EXACT word/number heard, including correct spelling.",
  learningObjectiveVi: "Học sinh điền 6 chỗ trống bằng từ/số CHÍNH XÁC nghe được, đúng chính tả.",
  examPattern: "PET Listening Part 3: A monologue (announcement, talk). 6 sentences with gaps. Listen TWICE.",
  examPatternVi: "PET Nghe Phần 3: 1 độc thoại. 6 câu có chỗ trống. Nghe HAI lần.",
  secretTip: "🔑 The answer is ALWAYS 1-3 words: a number, name, day, place, or time. Never write a sentence!",
  secretTipVi: "🔑 Đáp án LUÔN 1-3 từ: số, tên, ngày, nơi, thời gian. KHÔNG viết câu!",
  welcomeMessage: "Note-taking ninja mode! 📝 Pre-read, predict, pounce on the answer!",
  welcomeMessageVi: "Chế độ ninja ghi chú! 📝 Đọc trước, đoán, vồ lấy đáp án!",
  stepByStep: [
    { step: 1, title: "Pre-read all 6 sentences (45 sec)", titleVi: "Đọc trước cả 6 câu (45 giây)", detail: "You get 45 seconds before audio starts. Use it!", detailVi: "Bạn có 45 giây trước khi audio bắt đầu. Dùng đi!" },
    { step: 2, title: "PREDICT the answer type", titleVi: "ĐOÁN loại đáp án", detail: "Gap before 'pm' = TIME. Gap after 'on' = DAY/DATE. Gap after 'name is' = NAME.", detailVi: "Chỗ trống trước 'pm' = THỜI GIAN. Sau 'on' = NGÀY. Sau 'name is' = TÊN." },
    { step: 3, title: "Listen FIRST time = jot. SECOND time = verify spelling", titleVi: "Nghe LẦN 1 = ghi nhanh. LẦN 2 = soát chính tả", detail: "First pass = catch the answer. Second pass = check spelling and number digits.", detailVi: "Lần 1 = bắt đáp án. Lần 2 = soát chính tả và chữ số." },
  ],
  illustratedRules: [
    { icon: "🕐", rule: "TIME gap → digits + am/pm (e.g., 7.30 pm)", ruleVi: "Chỗ trống THỜI GIAN → số + am/pm (vd: 7.30 pm)", example: "Class starts at ___. → 'half past seven' = 7.30" },
    { icon: "📅", rule: "DAY gap → Monday-Sunday (capital letter!)", ruleVi: "Chỗ trống NGÀY → Monday-Sunday (CHỮ HOA!)", example: "The meeting is on ___. → 'Wednesday'" },
    { icon: "💷", rule: "PRICE gap → £/$ + number (e.g., £25)", ruleVi: "Chỗ trống GIÁ → £/$ + số (vd: £25)", example: "Tickets cost ___. → '£25'" },
    { icon: "📍", rule: "PLACE gap → proper noun (e.g., King Street)", ruleVi: "Chỗ trống NƠI → danh từ riêng (vd: King Street)", example: "Meet at ___. → 'King Street'" },
  ],
  watchOut: [
    { mistake: "Writing a full sentence in the gap", mistakeVi: "Viết cả câu vào chỗ trống", tip: "Gap = 1-3 words ONLY. Anything longer = wrong answer.", tipVi: "Chỗ trống = CHỈ 1-3 từ. Dài hơn = sai." },
    { mistake: "Spelling errors", mistakeVi: "Sai chính tả", tip: "PET counts spelling. Practice common words: Wednesday, library, museum, restaurant.", tipVi: "PET tính chính tả. Luyện từ phổ biến: Wednesday, library, museum, restaurant." },
    { mistake: "Writing 'forty' when audio says '40'", mistakeVi: "Viết 'forty' khi audio nói '40'", tip: "Numbers can be digits OR words. Both accepted, but be consistent.", tipVi: "Số có thể chữ HOẶC số. Cả 2 được, nhưng nhất quán." },
  ],
  practiceSet: [
    { instruction: "Predict the answer type", instructionVi: "Đoán loại đáp án", question: "Sentence: 'The meeting starts at ___ pm.' What type of answer?", options: ["Day", "Time", "Place", "Name"], answer: 1, explanation: "'pm' tells you the gap is a TIME.", explanationVi: "'pm' cho biết chỗ trống là THỜI GIAN." },
    { instruction: "Spelling check", instructionVi: "Soát chính tả", question: "Audio says 'Wednesday'. Correct spelling:", options: ["Wensday", "Wednsday", "Wednesday", "Wendsday"], answer: 2, explanation: "Wednesday = W-E-D-N-E-S-D-A-Y.", explanationVi: "Wednesday = W-E-D-N-E-S-D-A-Y." },
  ],
  vocabulary: [
    { word: "approximately", meaning: "about / around (used for numbers)", meaningVi: "khoảng", example: "There are approximately 50 people." },
    { word: "located in", meaning: "found in (a place)", meaningVi: "nằm ở", example: "The museum is located in the city centre." },
    { word: "available", meaning: "you can get/use", meaningVi: "có sẵn", example: "Tickets are available online." },
    { word: "registration", meaning: "signing up officially", meaningVi: "đăng ký", example: "Registration closes on Friday." },
  ],
  quiz: [
    { question: "Maximum words per gap:", options: ["1-3", "5-10", "1 sentence", "Unlimited"], answer: 0, explanation: "1-3 words is the rule." },
    { question: "Best use of the 45-second pre-read:", options: ["Sleep", "Predict the type of each answer", "Read other questions", "Look at the room"], answer: 1, explanation: "Predicting answer types speeds up your listening." },
    { question: "Spell 'restaurant':", options: ["restaurant", "restaurnt", "resturant", "restorant"], answer: 0, explanation: "R-E-S-T-A-U-R-A-N-T." },
  ],
  parentInfo: "PET Listening Part 3 punishes spelling errors. Children who master the predict-listen-verify routine often gain 4-6 marks per test.",
  parentInfoVi: "PET Nghe Phần 3 phạt lỗi chính tả. Học sinh làm chủ đoán-nghe-xác minh thường tăng 4-6 điểm/đề.",
  illustrationKey: "pet",
  isNew: true,
};

// ============================================================
// EXPORT
// ============================================================
export const cambridgeLecturesExpansion5: CambridgeLecture[] = [
  startersAnimalsZoo,
  startersFamilyHome,
  moversAdjectivesCompare,
  moversWeatherSeasons,
  flyersStoryWriting,
  flyersListeningTraps,
  ketWritingMessage,
  ketReadingSigns,
  petEmailWriting,
  petListeningPart3,
];
