// Cambridge Journey - GRAMMAR ESSENTIALS expansion.
// 25 dedicated grammar lessons (5 per level) covering Starters → PET.
// Each lesson follows the full CambridgeLecture shape used by the lecture viewer.

import type {
  CambridgeLecture,
  CambridgeLevel,
  CambridgeIllustratedRule,
  CambridgeWatchOut,
  CambridgePracticeItem,
  CambridgeVocabItem,
  CambridgeQuizQuestion,
  CambridgeStepGuide,
} from "./cambridgeLecturesData";

interface GrammarSpec {
  id: string;
  level: CambridgeLevel;
  icon: string;
  duration?: string;
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  learningObjective: string;
  learningObjectiveVi: string;
  examPattern: string;
  examPatternVi: string;
  secretTip: string;
  secretTipVi: string;
  welcomeMessage: string;
  welcomeMessageVi: string;
  stepByStep: CambridgeStepGuide[];
  illustratedRules: CambridgeIllustratedRule[];
  watchOut: CambridgeWatchOut[];
  practiceSet: CambridgePracticeItem[];
  vocabulary: CambridgeVocabItem[];
  quiz: CambridgeQuizQuestion[];
  parentInfo: string;
  parentInfoVi: string;
}

const build = (s: GrammarSpec): CambridgeLecture => ({
  id: s.id,
  level: s.level,
  skill: "grammar",
  icon: s.icon,
  duration: s.duration ?? "18 min",
  illustrationKey: s.level,
  title: s.title,
  titleVi: s.titleVi,
  description: s.description,
  descriptionVi: s.descriptionVi,
  learningObjective: s.learningObjective,
  learningObjectiveVi: s.learningObjectiveVi,
  examPattern: s.examPattern,
  examPatternVi: s.examPatternVi,
  secretTip: s.secretTip,
  secretTipVi: s.secretTipVi,
  welcomeMessage: s.welcomeMessage,
  welcomeMessageVi: s.welcomeMessageVi,
  stepByStep: s.stepByStep,
  illustratedRules: s.illustratedRules,
  watchOut: s.watchOut,
  practiceSet: s.practiceSet,
  vocabulary: s.vocabulary,
  quiz: s.quiz,
  parentInfo: s.parentInfo,
  parentInfoVi: s.parentInfoVi,
  isNew: true,
});

// =====================================================================
// STARTERS — 5 grammar foundations
// =====================================================================

const startersAAn = build({
  id: "cam-grammar-starters-a-an",
  level: "starters", icon: "🔤",
  title: "A vs An: The Vowel Sound Secret",
  titleVi: "A vs An: Bí mật Âm Nguyên âm",
  description: "Stop guessing! Use the 'next-sound test' to pick A or AN correctly every single time in Starters Reading & Writing.",
  descriptionVi: "Đừng đoán nữa! Dùng 'phép thử âm kế tiếp' để chọn A hay AN đúng mỗi lần trong Starters Đọc & Viết.",
  learningObjective: "Students will choose A or AN correctly before nouns by testing the first SOUND (not letter).",
  learningObjectiveVi: "Học sinh sẽ chọn đúng A hoặc AN trước danh từ bằng cách kiểm tra ÂM đầu (không phải chữ cái).",
  examPattern: "Starters Reading & Writing Part 1, 4 & 5: Match words to pictures, complete sentences. 'A' / 'An' appear in nearly every short sentence prompt.",
  examPatternVi: "Starters Đọc & Viết Phần 1, 4 & 5: Nối từ với hình, hoàn thành câu. 'A' / 'An' xuất hiện hầu hết các câu mẫu.",
  secretTip: "🔑 Say the next word OUT LOUD. If it starts with a vowel sound (a/e/i/o/u sound) → AN. Otherwise → A. 'an hour' (silent h!) but 'a university' (yoo sound!).",
  secretTipVi: "🔑 Đọc TO từ kế tiếp. Nếu bắt đầu bằng âm nguyên âm (a/e/i/o/u) → AN. Ngược lại → A. 'an hour' (h câm!) nhưng 'a university' (âm 'yu'!).",
  welcomeMessage: "Hi friends! 🔤 A or An? After today you'll never get stuck again!",
  welcomeMessageVi: "Xin chào! 🔤 A hay An? Sau hôm nay bạn sẽ không bao giờ bí nữa!",
  stepByStep: [
    { step: 1, title: "Find the next word", titleVi: "Tìm từ kế tiếp", detail: "Look at the word right after the blank — that's what we test.", detailVi: "Nhìn vào từ ngay sau chỗ trống — đó là từ ta kiểm tra." },
    { step: 2, title: "Say its first SOUND", titleVi: "Đọc ÂM đầu của nó", detail: "Don't look at the letter. Whisper the sound: apple = /æ/, dog = /d/.", detailVi: "Đừng nhìn chữ. Thì thầm âm: apple = /æ/, dog = /d/." },
    { step: 3, title: "Vowel sound → AN, else → A", titleVi: "Âm nguyên âm → AN, còn lại → A", detail: "a/e/i/o/u sounds get AN. Consonant sounds get A.", detailVi: "Âm a/e/i/o/u dùng AN. Âm phụ âm dùng A." },
  ],
  illustratedRules: [
    { icon: "🍎", rule: "AN before vowel sounds: an apple, an egg, an ice cream", ruleVi: "AN trước âm nguyên âm: an apple, an egg, an ice cream", example: "I have an orange and an umbrella." },
    { icon: "🐶", rule: "A before consonant sounds: a dog, a book, a car", ruleVi: "A trước âm phụ âm: a dog, a book, a car", example: "She has a pencil and a bag." },
    { icon: "🤫", rule: "Silent letters change the rule! 'hour' starts with /aʊ/ → an hour", ruleVi: "Chữ câm làm đổi quy tắc! 'hour' bắt đầu bằng /aʊ/ → an hour", example: "We waited for an hour." },
  ],
  watchOut: [
    { mistake: "Choosing AN just because the word starts with a vowel LETTER", mistakeVi: "Chọn AN chỉ vì từ bắt đầu bằng CHỮ nguyên âm", tip: "'University' starts with U but the sound is /juː/ → 'a university'.", tipVi: "'University' bắt đầu bằng U nhưng âm là /juː/ → 'a university'." },
    { mistake: "Using A or AN before plural nouns", mistakeVi: "Dùng A hoặc AN trước danh từ số nhiều", tip: "A/AN means ONE. Never say 'a books' → say 'books' or 'a book'.", tipVi: "A/AN nghĩa là MỘT. Không nói 'a books' → nói 'books' hoặc 'a book'." },
  ],
  practiceSet: [
    { instruction: "Choose A or AN", instructionVi: "Chọn A hoặc AN", question: "I want ___ apple, please.", options: ["a", "an", "the", "—"], answer: 1, explanation: "'apple' starts with vowel sound /æ/ → AN.", explanationVi: "'apple' bắt đầu bằng âm nguyên âm /æ/ → AN." },
    { instruction: "Choose A or AN", instructionVi: "Chọn A hoặc AN", question: "She has ___ big dog.", options: ["a", "an", "any", "the"], answer: 0, explanation: "'big' starts with /b/ → A.", explanationVi: "'big' bắt đầu bằng /b/ → A." },
    { instruction: "Tricky sound test", instructionVi: "Bẫy âm", question: "We waited for ___ hour.", options: ["a", "an", "the", "one"], answer: 1, explanation: "'hour' has silent H → starts with vowel sound /aʊ/ → AN.", explanationVi: "'hour' có H câm → bắt đầu bằng âm /aʊ/ → AN." },
  ],
  vocabulary: [
    { word: "apple", meaning: "a round fruit", meaningVi: "quả táo", example: "I eat an apple every day." },
    { word: "umbrella", meaning: "you open it in the rain", meaningVi: "cái ô", example: "Take an umbrella!" },
    { word: "elephant", meaning: "a very big grey animal", meaningVi: "con voi", example: "An elephant is huge." },
    { word: "hour", meaning: "60 minutes (silent h)", meaningVi: "một giờ (h câm)", example: "I'll be back in an hour." },
  ],
  quiz: [
    { question: "___ orange juice, please.", options: ["A", "An", "Some", "—"], answer: 1, explanation: "'orange' starts with vowel sound /ɒ/ → AN." },
    { question: "He is ___ university student.", options: ["a", "an", "the", "—"], answer: 0, explanation: "'university' sounds like /juː/ (consonant sound) → A." },
    { question: "Which sentence is correct?", options: ["I have a egg.", "I have an egg.", "I have an dog.", "I have an books."], answer: 1, explanation: "'egg' starts with /e/ vowel sound → an egg." },
  ],
  parentInfo: "Tests the most-tested article rule in Starters. The child learns to test by SOUND (not spelling), avoiding the classic 'an university' mistake.",
  parentInfoVi: "Luyện quy tắc mạo từ thi nhiều nhất ở Starters. Trẻ học cách thử bằng ÂM (không phải chính tả), tránh lỗi kinh điển 'an university'.",
});

const startersPlurals = build({
  id: "cam-grammar-starters-plurals",
  level: "starters", icon: "🐰",
  title: "One Cat, Two Cats: The Plural -s, -es, -ies Map",
  titleVi: "Một Mèo, Hai Mèo: Bản đồ Số nhiều -s, -es, -ies",
  description: "Master the 3-rule plural map so spelling plurals in Reading & Writing Part 5 becomes automatic.",
  descriptionVi: "Làm chủ 3 quy tắc số nhiều để viết đúng số nhiều trong Đọc & Viết Phần 5 một cách tự động.",
  learningObjective: "Students will form regular plurals correctly using -s, -es, or -ies based on the noun's ending.",
  learningObjectiveVi: "Học sinh sẽ tạo số nhiều đúng bằng -s, -es hoặc -ies tùy đuôi danh từ.",
  examPattern: "Starters Reading & Writing Part 2 & 5: 'How many ___ are there?' Children must SPELL plural nouns from a picture.",
  examPatternVi: "Starters Đọc & Viết Phần 2 & 5: 'Có bao nhiêu ___?' Trẻ phải VIẾT số nhiều danh từ từ hình.",
  secretTip: "🔑 Look at the LAST 2 letters: consonant+y → ies (baby→babies). End in s/x/ch/sh → es (bus→buses). Everything else → s.",
  secretTipVi: "🔑 Nhìn 2 chữ cuối: phụ âm+y → ies (baby→babies). Kết thúc s/x/ch/sh → es (bus→buses). Còn lại → s.",
  welcomeMessage: "🐰 One rabbit, two rabbits! Let's count and spell together!",
  welcomeMessageVi: "🐰 Một con thỏ, hai con thỏ! Cùng đếm và viết!",
  stepByStep: [
    { step: 1, title: "Look at the ending", titleVi: "Nhìn đuôi từ", detail: "Underline the last 1-2 letters: dog, bus, baby, box.", detailVi: "Gạch chân 1-2 chữ cuối: dog, bus, baby, box." },
    { step: 2, title: "Apply the right rule", titleVi: "Áp dụng quy tắc đúng", detail: "Normal → +s. s/x/ch/sh → +es. Consonant+y → drop y, +ies.", detailVi: "Bình thường → +s. s/x/ch/sh → +es. Phụ âm+y → bỏ y, +ies." },
    { step: 3, title: "Watch for surprises", titleVi: "Cẩn thận từ đặc biệt", detail: "Some words break the rules: child→children, foot→feet, fish→fish.", detailVi: "Một số từ phá luật: child→children, foot→feet, fish→fish." },
  ],
  illustratedRules: [
    { icon: "🐱", rule: "Most nouns: just add -s (cat→cats, book→books)", ruleVi: "Hầu hết: thêm -s (cat→cats, book→books)", example: "two cats, three books, five pens" },
    { icon: "🚌", rule: "End in s/x/ch/sh/o: add -es (bus→buses, box→boxes)", ruleVi: "Kết thúc s/x/ch/sh/o: thêm -es (bus→buses)", example: "buses, boxes, watches, brushes, potatoes" },
    { icon: "👶", rule: "Consonant + y: drop y, add -ies (baby→babies)", ruleVi: "Phụ âm + y: bỏ y, thêm -ies", example: "baby→babies, story→stories, family→families" },
    { icon: "🦶", rule: "Irregular plurals: learn by heart", ruleVi: "Số nhiều bất quy tắc: học thuộc", example: "child→children, foot→feet, man→men, mouse→mice" },
  ],
  watchOut: [
    { mistake: "Adding -s to s/x/ch/sh words: 'buss', 'boxs'", mistakeVi: "Thêm -s vào s/x/ch/sh: 'buss', 'boxs'", tip: "These need -ES because you can't pronounce two s's together. Bus → buses (bus-ez).", tipVi: "Cần -ES vì không phát âm được hai 's' liền. Bus → buses (bus-ez)." },
    { mistake: "Keeping the y: 'babys', 'storys'", mistakeVi: "Giữ y: 'babys', 'storys'", tip: "After a consonant, drop y → ies. baby→babies, story→stories.", tipVi: "Sau phụ âm, bỏ y → ies. baby→babies." },
    { mistake: "Adding -s to irregular plurals: 'childs', 'mans'", mistakeVi: "Thêm -s cho từ bất quy tắc: 'childs', 'mans'", tip: "Memorize the top 6: child→children, man→men, woman→women, foot→feet, tooth→teeth, mouse→mice.", tipVi: "Học thuộc 6 từ đầu bảng." },
  ],
  practiceSet: [
    { instruction: "Write the plural", instructionVi: "Viết số nhiều", question: "one box → two ___", options: ["boxs", "boxes", "boxies", "box"], answer: 1, explanation: "Ends in -x → add -es: boxes.", explanationVi: "Kết thúc -x → thêm -es: boxes." },
    { instruction: "Choose the plural", instructionVi: "Chọn số nhiều", question: "one baby → three ___", options: ["babys", "babyes", "babies", "babyies"], answer: 2, explanation: "Consonant + y → drop y, add ies: babies.", explanationVi: "Phụ âm + y → bỏ y, thêm ies: babies." },
    { instruction: "Irregular plural", instructionVi: "Số nhiều bất quy tắc", question: "one child → many ___", options: ["childs", "childes", "childrens", "children"], answer: 3, explanation: "child → children (irregular).", explanationVi: "child → children (bất quy tắc)." },
  ],
  vocabulary: [
    { word: "bus", meaning: "a big vehicle for many people", meaningVi: "xe buýt", example: "There are two buses." },
    { word: "baby", meaning: "a very young child", meaningVi: "em bé", example: "Three babies are sleeping." },
    { word: "child", meaning: "a young boy or girl", meaningVi: "trẻ em", example: "Five children are playing." },
    { word: "foot", meaning: "the bottom of your leg", meaningVi: "bàn chân", example: "My feet are tired." },
  ],
  quiz: [
    { question: "Which is correct?", options: ["two foots", "two feets", "two feet", "two feetes"], answer: 2, explanation: "foot → feet (irregular plural)." },
    { question: "one watch → six ___", options: ["watchs", "watches", "watchies", "watch"], answer: 1, explanation: "Ends in -ch → add -es." },
    { question: "one family → four ___", options: ["familys", "familyes", "families", "familly"], answer: 2, explanation: "Consonant+y → ies." },
  ],
  parentInfo: "Children must spell plural nouns correctly in Reading & Writing Part 5. This lesson gives them a 3-rule decision map plus the must-know irregular plurals.",
  parentInfoVi: "Trẻ phải viết đúng số nhiều ở Đọc & Viết Phần 5. Bài này cho bản đồ 3 quy tắc + số nhiều bất quy tắc quan trọng.",
});

const startersThisThat = build({
  id: "cam-grammar-starters-this-that",
  level: "starters", icon: "👉",
  title: "This, That, These, Those: The Pointing Power Words",
  titleVi: "This, That, These, Those: Bộ từ Chỉ trỏ",
  description: "Use distance + number to pick the right pointing word — perfect for the Speaking 'What's this?' question.",
  descriptionVi: "Dùng khoảng cách + số lượng để chọn từ chỉ trỏ đúng — hoàn hảo cho câu Speaking 'What's this?'.",
  learningObjective: "Students will choose this/that/these/those correctly based on distance (near/far) and number (one/many).",
  learningObjectiveVi: "Học sinh sẽ chọn đúng this/that/these/those dựa trên khoảng cách và số lượng.",
  examPattern: "Starters Speaking Part 2 & Reading Part 4: 'What's this?' / 'What are these?' answers must match singular/plural and near/far.",
  examPatternVi: "Starters Nói Phần 2 & Đọc Phần 4: Trả lời 'What's this?' / 'What are these?' phải khớp số ít/nhiều và gần/xa.",
  secretTip: "🔑 Quick chart: NEAR + 1 = this · NEAR + many = these · FAR + 1 = that · FAR + many = those. Point with your finger to feel it!",
  secretTipVi: "🔑 Bảng nhanh: GẦN + 1 = this · GẦN + nhiều = these · XA + 1 = that · XA + nhiều = those. Chỉ tay để cảm nhận!",
  welcomeMessage: "👉 Point and speak! Today you become a pointing pro!",
  welcomeMessageVi: "👉 Chỉ và nói! Hôm nay bạn trở thành chuyên gia chỉ trỏ!",
  stepByStep: [
    { step: 1, title: "Decide near or far", titleVi: "Quyết định gần hay xa", detail: "If you can touch it → NEAR. If it's across the room → FAR.", detailVi: "Chạm được → GẦN. Bên kia phòng → XA." },
    { step: 2, title: "Count: one or many?", titleVi: "Đếm: một hay nhiều?", detail: "One pen vs many pens changes the word.", detailVi: "Một bút vs nhiều bút sẽ đổi từ." },
    { step: 3, title: "Pick from the 2×2 chart", titleVi: "Chọn từ bảng 2×2", detail: "this/these (near) — that/those (far).", detailVi: "this/these (gần) — that/those (xa)." },
  ],
  illustratedRules: [
    { icon: "👆", rule: "this = 1 thing NEAR you", ruleVi: "this = 1 vật GẦN bạn", example: "This is my pen." },
    { icon: "✌️", rule: "these = many things NEAR you", ruleVi: "these = nhiều vật GẦN bạn", example: "These are my pens." },
    { icon: "🫳", rule: "that = 1 thing FAR away", ruleVi: "that = 1 vật ở XA", example: "That is your bag." },
    { icon: "🙌", rule: "those = many things FAR away", ruleVi: "those = nhiều vật ở XA", example: "Those are your bags." },
  ],
  watchOut: [
    { mistake: "Using 'this' for plural things", mistakeVi: "Dùng 'this' cho vật số nhiều", tip: "Many = these/those. 'These are my books', not 'This are my books'.", tipVi: "Nhiều = these/those. 'These are my books'." },
    { mistake: "Pairing 'this' with 'are'", mistakeVi: "Ghép 'this' với 'are'", tip: "this/that → IS · these/those → ARE.", tipVi: "this/that → IS · these/those → ARE." },
  ],
  practiceSet: [
    { instruction: "Pick the correct word", instructionVi: "Chọn từ đúng", question: "(Holding a pen) ___ is my pen.", options: ["This", "These", "That", "Those"], answer: 0, explanation: "Near + 1 → This.", explanationVi: "Gần + 1 → This." },
    { instruction: "Pick the correct word", instructionVi: "Chọn từ đúng", question: "(Pointing across the room) ___ are your shoes.", options: ["This", "These", "That", "Those"], answer: 3, explanation: "Far + many → Those.", explanationVi: "Xa + nhiều → Those." },
    { instruction: "Singular or plural verb", instructionVi: "Động từ số ít hay nhiều", question: "These ___ my friends.", options: ["is", "are", "am", "be"], answer: 1, explanation: "these → are.", explanationVi: "these → are." },
  ],
  vocabulary: [
    { word: "this", meaning: "1 thing near you", meaningVi: "1 vật gần bạn", example: "This is a book." },
    { word: "that", meaning: "1 thing far from you", meaningVi: "1 vật xa bạn", example: "That is a cat." },
    { word: "these", meaning: "many things near", meaningVi: "nhiều vật gần", example: "These are apples." },
    { word: "those", meaning: "many things far", meaningVi: "nhiều vật xa", example: "Those are trees." },
  ],
  quiz: [
    { question: "(Touching a hat) ___ is my hat.", options: ["This", "These", "That", "Those"], answer: 0, explanation: "Near + 1 = This." },
    { question: "(Far + many flowers) ___ are flowers.", options: ["This", "These", "That", "Those"], answer: 3, explanation: "Far + many = Those." },
    { question: "Which sentence is correct?", options: ["This are my pens.", "These is my pens.", "These are my pens.", "Those is my pens."], answer: 2, explanation: "Plural needs 'these are'." },
  ],
  parentInfo: "Tests demonstrative pronouns — used in every Starters speaking dialogue. The lesson links distance, number, and the verb (is/are) into one easy chart.",
  parentInfoVi: "Luyện đại từ chỉ định — dùng trong mọi đoạn hội thoại Starters. Bài liên kết khoảng cách, số lượng và động từ (is/are) thành một bảng dễ nhớ.",
});

const startersHaveGot = build({
  id: "cam-grammar-starters-have-got",
  level: "starters", icon: "🎒",
  title: "Have Got vs Has Got: The Backpack Rule",
  titleVi: "Have Got vs Has Got: Quy tắc Cặp sách",
  description: "Learn the simple HE/SHE/IT = HAS rule so the very common 'have got' question never trips you up.",
  descriptionVi: "Học quy tắc đơn giản HE/SHE/IT = HAS để câu 'have got' phổ biến không bao giờ làm bạn vấp.",
  learningObjective: "Students will use have got / has got correctly in positive, negative, and question forms.",
  learningObjectiveVi: "Học sinh sẽ dùng have got / has got đúng ở thể khẳng định, phủ định và nghi vấn.",
  examPattern: "Starters Speaking & Reading Part 3: 'Have you got a pet?' 'Has she got a brother?' Appears in family/possession topics.",
  examPatternVi: "Starters Nói & Đọc Phần 3: 'Have you got a pet?' 'Has she got a brother?' Xuất hiện ở chủ đề gia đình/sở hữu.",
  secretTip: "🔑 Cover the subject with your thumb. If it's HE / SHE / IT (or one name like Tom) → use HAS GOT. Everything else → HAVE GOT.",
  secretTipVi: "🔑 Lấy ngón cái che chủ ngữ. Nếu là HE / SHE / IT (hoặc 1 tên như Tom) → HAS GOT. Còn lại → HAVE GOT.",
  welcomeMessage: "🎒 What have you got in your backpack? Let's find out — in English!",
  welcomeMessageVi: "🎒 Trong cặp bạn có gì? Cùng tìm — bằng tiếng Anh!",
  stepByStep: [
    { step: 1, title: "Spot the subject", titleVi: "Tìm chủ ngữ", detail: "Who has it? I, you, we, they → HAVE. He, she, it, Tom → HAS.", detailVi: "Ai có? I, you, we, they → HAVE. He, she, it, Tom → HAS." },
    { step: 2, title: "Add GOT after", titleVi: "Thêm GOT phía sau", detail: "have/has + got + thing. 'I have got a dog.'", detailVi: "have/has + got + vật. 'I have got a dog.'" },
    { step: 3, title: "Negative & question flips", titleVi: "Đổi sang phủ định & câu hỏi", detail: "Negative: haven't got / hasn't got. Question: Have/Has + subject + got…?", detailVi: "Phủ định: haven't got / hasn't got. Câu hỏi: Have/Has + chủ ngữ + got…?" },
  ],
  illustratedRules: [
    { icon: "🧍", rule: "I / You / We / They → HAVE GOT", ruleVi: "I / You / We / They → HAVE GOT", example: "I have got a book." },
    { icon: "👨", rule: "He / She / It → HAS GOT", ruleVi: "He / She / It → HAS GOT", example: "She has got a cat." },
    { icon: "❓", rule: "Question: Have/Has + subject + got…?", ruleVi: "Câu hỏi: Have/Has + chủ ngữ + got…?", example: "Have you got a sister? Has he got a bike?" },
    { icon: "🚫", rule: "Negative: haven't got / hasn't got", ruleVi: "Phủ định: haven't got / hasn't got", example: "I haven't got any pets. He hasn't got a dog." },
  ],
  watchOut: [
    { mistake: "Saying 'He have got…'", mistakeVi: "Nói 'He have got…'", tip: "HE = HAS. Always: He / She / It has got.", tipVi: "HE = HAS. Luôn: He / She / It has got." },
    { mistake: "Saying 'Do you have got…?'", mistakeVi: "Nói 'Do you have got…?'", tip: "With 'have got' there is NO do/does. Just: 'Have you got…?'", tipVi: "Với 'have got' KHÔNG có do/does. Chỉ: 'Have you got…?'" },
  ],
  practiceSet: [
    { instruction: "Choose have or has", instructionVi: "Chọn have hay has", question: "My sister ___ got a red bag.", options: ["have", "has", "is", "got"], answer: 1, explanation: "sister = she → has.", explanationVi: "sister = she → has." },
    { instruction: "Make a question", instructionVi: "Đặt câu hỏi", question: "___ you got a brother?", options: ["Have", "Has", "Do", "Are"], answer: 0, explanation: "you → Have you got…?", explanationVi: "you → Have you got…?" },
    { instruction: "Choose the negative", instructionVi: "Chọn phủ định", question: "Tom ___ got a cat.", options: ["haven't", "hasn't", "don't", "isn't"], answer: 1, explanation: "Tom = he → hasn't got.", explanationVi: "Tom = he → hasn't got." },
  ],
  vocabulary: [
    { word: "have got", meaning: "to own / possess", meaningVi: "có (sở hữu)", example: "I have got a new pen." },
    { word: "has got", meaning: "for he/she/it", meaningVi: "dạng có cho he/she/it", example: "She has got a doll." },
    { word: "haven't got", meaning: "do not have", meaningVi: "không có", example: "We haven't got a car." },
    { word: "hasn't got", meaning: "does not have (he/she/it)", meaningVi: "không có (he/she/it)", example: "He hasn't got a sister." },
  ],
  quiz: [
    { question: "They ___ got two dogs.", options: ["has", "have", "is", "are"], answer: 1, explanation: "they → have." },
    { question: "___ she got a book?", options: ["Have", "Has", "Do", "Are"], answer: 1, explanation: "she → Has." },
    { question: "Which sentence is correct?", options: ["He have got a hat.", "He has got a hat.", "He got a hat.", "He do have got a hat."], answer: 1, explanation: "He → has got." },
  ],
  parentInfo: "'Have got' is THE possession structure tested at Starters. The lesson nails subject-verb agreement (he/she/it = HAS) plus question and negative forms.",
  parentInfoVi: "'Have got' là cấu trúc sở hữu CHÍNH ở Starters. Bài luyện chia động từ (he/she/it = HAS) cùng câu hỏi và phủ định.",
});

const startersAmIsAre = build({
  id: "cam-grammar-starters-am-is-are",
  level: "starters", icon: "🎈",
  title: "Am, Is, Are: The To Be Triangle",
  titleVi: "Am, Is, Are: Tam giác To Be",
  description: "Match every subject to the right form of TO BE with a memorable triangle map — the #1 grammar building block.",
  descriptionVi: "Khớp mỗi chủ ngữ với dạng đúng của TO BE bằng bản đồ tam giác dễ nhớ — viên gạch ngữ pháp số 1.",
  learningObjective: "Students will conjugate 'to be' (am/is/are) correctly with all pronouns and names.",
  learningObjectiveVi: "Học sinh sẽ chia 'to be' (am/is/are) đúng với mọi đại từ và tên.",
  examPattern: "Appears in EVERY Starters task: 'I am ten.' 'She is happy.' 'They are at school.' Wrong forms cost easy marks.",
  examPatternVi: "Xuất hiện trong MỌI phần Starters: 'I am ten.' 'She is happy.' 'They are at school.' Sai dạng mất điểm dễ.",
  secretTip: "🔑 Triangle: I = AM (top). HE/SHE/IT = IS (left). YOU/WE/THEY = ARE (right). Just memorize the triangle!",
  secretTipVi: "🔑 Tam giác: I = AM (đỉnh). HE/SHE/IT = IS (trái). YOU/WE/THEY = ARE (phải). Học thuộc tam giác!",
  welcomeMessage: "🎈 To be or not to be? Let's BE friends with grammar!",
  welcomeMessageVi: "🎈 To be or not to be? Cùng làm bạn với ngữ pháp!",
  stepByStep: [
    { step: 1, title: "Find the subject", titleVi: "Tìm chủ ngữ", detail: "I, you, he, she, it, we, they — or a name.", detailVi: "I, you, he, she, it, we, they — hoặc tên." },
    { step: 2, title: "Pick from the triangle", titleVi: "Chọn từ tam giác", detail: "I→am · he/she/it→is · you/we/they→are.", detailVi: "I→am · he/she/it→is · you/we/they→are." },
    { step: 3, title: "Use short forms in speech", titleVi: "Dạng rút gọn khi nói", detail: "I'm, you're, he's, she's, it's, we're, they're.", detailVi: "I'm, you're, he's, she's, it's, we're, they're." },
  ],
  illustratedRules: [
    { icon: "👤", rule: "I + AM (only I!)", ruleVi: "I + AM (chỉ I!)", example: "I am 8 years old." },
    { icon: "👧", rule: "He / She / It + IS (one person/thing)", ruleVi: "He / She / It + IS (1 người/vật)", example: "She is my teacher." },
    { icon: "👨‍👩‍👧", rule: "You / We / They + ARE (more than one OR you)", ruleVi: "You / We / They + ARE (nhiều hoặc you)", example: "We are friends." },
    { icon: "✂️", rule: "Short forms in speech: I'm, he's, you're, they're", ruleVi: "Rút gọn khi nói: I'm, he's, you're, they're", example: "I'm hungry. They're happy." },
  ],
  watchOut: [
    { mistake: "Saying 'I is' or 'He are'", mistakeVi: "Nói 'I is' hay 'He are'", tip: "Stick to the triangle: I→am, he→is. Don't swap!", tipVi: "Bám tam giác: I→am, he→is. Không đổi chỗ!" },
    { mistake: "Forgetting 'to be' completely: 'She happy.'", mistakeVi: "Quên 'to be' hoàn toàn: 'She happy.'", tip: "English needs the verb: 'She IS happy.'", tipVi: "Tiếng Anh cần động từ: 'She IS happy.'" },
  ],
  practiceSet: [
    { instruction: "Pick am / is / are", instructionVi: "Chọn am / is / are", question: "I ___ from Vietnam.", options: ["am", "is", "are", "be"], answer: 0, explanation: "I → am.", explanationVi: "I → am." },
    { instruction: "Pick am / is / are", instructionVi: "Chọn am / is / are", question: "My friends ___ in the park.", options: ["am", "is", "are", "be"], answer: 2, explanation: "friends (plural/they) → are.", explanationVi: "friends (số nhiều/they) → are." },
    { instruction: "Pick am / is / are", instructionVi: "Chọn am / is / are", question: "The cat ___ on the chair.", options: ["am", "is", "are", "be"], answer: 1, explanation: "The cat = it → is.", explanationVi: "The cat = it → is." },
  ],
  vocabulary: [
    { word: "am", meaning: "to be – for I", meaningVi: "to be – dùng cho I", example: "I am happy." },
    { word: "is", meaning: "to be – for he/she/it", meaningVi: "to be – he/she/it", example: "He is tall." },
    { word: "are", meaning: "to be – for you/we/they", meaningVi: "to be – you/we/they", example: "They are kind." },
    { word: "I'm", meaning: "short form of I am", meaningVi: "viết tắt của I am", example: "I'm a student." },
  ],
  quiz: [
    { question: "She ___ my sister.", options: ["am", "is", "are", "be"], answer: 1, explanation: "She → is." },
    { question: "We ___ in class.", options: ["am", "is", "are", "be"], answer: 2, explanation: "We → are." },
    { question: "Which sentence is correct?", options: ["I are tall.", "I am tall.", "I is tall.", "I be tall."], answer: 1, explanation: "I → am." },
  ],
  parentInfo: "The verb 'to be' is the foundation of every English sentence. Mastery here unlocks correct sentence building across all Cambridge levels.",
  parentInfoVi: "Động từ 'to be' là nền tảng của mọi câu tiếng Anh. Làm chủ ở đây mở khoá việc dựng câu đúng ở mọi cấp Cambridge.",
});

// =====================================================================
// MOVERS — 5 grammar lessons
// =====================================================================

const moversPresentCont = build({
  id: "cam-grammar-movers-present-cont",
  level: "movers", icon: "🏃",
  title: "Present Continuous: -ING for Right Now",
  titleVi: "Hiện tại Tiếp diễn: -ING cho Bây giờ",
  description: "Use BE + verb-ING to describe pictures and 'right now' actions — a Movers exam favourite.",
  descriptionVi: "Dùng BE + động từ-ING để mô tả tranh và hành động 'ngay bây giờ' — chủ đề tủ ở Movers.",
  learningObjective: "Students will form and use the present continuous to describe ongoing actions.",
  learningObjectiveVi: "Học sinh sẽ tạo và dùng hiện tại tiếp diễn để mô tả hành động đang xảy ra.",
  examPattern: "Movers Speaking Part 2 (Find the differences) & Reading Part 2 (Picture stories) constantly require '___ is/are -ing'.",
  examPatternVi: "Movers Nói Phần 2 (Tìm khác biệt) & Đọc Phần 2 (Tranh truyện) liên tục yêu cầu '___ is/are -ing'.",
  secretTip: "🔑 Formula: SUBJECT + AM/IS/ARE + VERB-ING. If you see 'now', 'look!', 'listen!', or a picture → present continuous.",
  secretTipVi: "🔑 Công thức: CHỦ NGỮ + AM/IS/ARE + V-ING. Thấy 'now', 'look!', 'listen!' hoặc tranh → hiện tại tiếp diễn.",
  welcomeMessage: "🏃 Action time! Right now, you are LEARNING — that's present continuous!",
  welcomeMessageVi: "🏃 Đến giờ hành động! Ngay bây giờ, bạn đang HỌC — đó là hiện tại tiếp diễn!",
  stepByStep: [
    { step: 1, title: "Pick the to-be form", titleVi: "Chọn dạng to-be", detail: "I am, he/she/it is, you/we/they are.", detailVi: "I am, he/she/it is, you/we/they are." },
    { step: 2, title: "Add -ing to the verb", titleVi: "Thêm -ing vào động từ", detail: "play→playing, run→running (double r), make→making (drop e).", detailVi: "play→playing, run→running (gấp r), make→making (bỏ e)." },
    { step: 3, title: "Build the sentence", titleVi: "Dựng câu", detail: "She is reading a book. They are playing football.", detailVi: "She is reading a book. They are playing football." },
  ],
  illustratedRules: [
    { icon: "👀", rule: "Form: BE + verb-ing", ruleVi: "Công thức: BE + V-ing", example: "He is eating. They are dancing." },
    { icon: "🔁", rule: "Short verbs ending CVC: double the last letter (run→running, swim→swimming)", ruleVi: "Động từ ngắn CVC: gấp đôi chữ cuối", example: "sit → sitting, get → getting" },
    { icon: "✂️", rule: "Verbs ending in -e: drop the e, add -ing (make→making)", ruleVi: "Động từ kết thúc -e: bỏ e, thêm -ing", example: "write→writing, ride→riding" },
    { icon: "⏰", rule: "Time clues: now, right now, at the moment, Look!, Listen!", ruleVi: "Dấu hiệu thời gian: now, right now, at the moment, Look!, Listen!", example: "Look! The baby is crying." },
  ],
  watchOut: [
    { mistake: "Forgetting BE: 'He playing football.'", mistakeVi: "Quên BE: 'He playing football.'", tip: "Always add is/are: 'He IS playing football.'", tipVi: "Luôn thêm is/are: 'He IS playing football.'" },
    { mistake: "Double-ing or wrong spelling: 'runing', 'makeing'", mistakeVi: "Sai chính tả -ing: 'runing', 'makeing'", tip: "CVC short verbs double (running). Drop silent e (making).", tipVi: "Động từ ngắn CVC gấp đôi (running). Bỏ e câm (making)." },
  ],
  practiceSet: [
    { instruction: "Complete the sentence", instructionVi: "Hoàn thành câu", question: "Look! The dog ___ in the garden.", options: ["run", "runs", "is running", "are running"], answer: 2, explanation: "'Look!' = present continuous; dog (it) → is running.", explanationVi: "'Look!' = hiện tại tiếp diễn; dog (it) → is running." },
    { instruction: "Choose the correct form", instructionVi: "Chọn dạng đúng", question: "We ___ a film right now.", options: ["watch", "watches", "are watching", "is watching"], answer: 2, explanation: "we → are + watching.", explanationVi: "we → are + watching." },
    { instruction: "Spell -ing correctly", instructionVi: "Viết -ing đúng", question: "She is ___ a cake.", options: ["makeing", "making", "makking", "makes"], answer: 1, explanation: "make → drop e → making.", explanationVi: "make → bỏ e → making." },
  ],
  vocabulary: [
    { word: "now", meaning: "at this moment", meaningVi: "bây giờ", example: "She is sleeping now." },
    { word: "at the moment", meaning: "now", meaningVi: "vào lúc này", example: "I am cooking at the moment." },
    { word: "look!", meaning: "use it to point to an action", meaningVi: "nhìn kìa!", example: "Look! It's raining." },
    { word: "listen!", meaning: "use it for sound actions", meaningVi: "nghe kìa!", example: "Listen! He is singing." },
  ],
  quiz: [
    { question: "They ___ in the pool.", options: ["swim", "swims", "are swimming", "is swimming"], answer: 2, explanation: "they → are swimming." },
    { question: "Which is spelled correctly?", options: ["runing", "runninng", "running", "runings"], answer: 2, explanation: "CVC verb → double n: running." },
    { question: "Look! The cat ___ a mouse.", options: ["chase", "chases", "is chasing", "are chasing"], answer: 2, explanation: "cat (it) → is chasing." },
  ],
  parentInfo: "Present continuous powers the picture-description tasks at Movers. The lesson covers spelling rules (double consonants, drop -e) so writing is exam-ready.",
  parentInfoVi: "Hiện tại tiếp diễn là trung tâm của các bài mô tả tranh ở Movers. Bài cũng dạy quy tắc chính tả (gấp đôi phụ âm, bỏ -e) để viết chuẩn thi.",
});

const moversPastWasWere = build({
  id: "cam-grammar-movers-was-were",
  level: "movers", icon: "🕰️",
  title: "Was vs Were: Yesterday's To-Be",
  titleVi: "Was vs Were: To-Be của Hôm qua",
  description: "Pick WAS or WERE every time using the same triangle you already know — just for yesterday.",
  descriptionVi: "Chọn WAS hay WERE dễ dàng bằng tam giác bạn đã biết — chỉ là cho hôm qua.",
  learningObjective: "Students will use was/were correctly to talk about past states and locations.",
  learningObjectiveVi: "Học sinh sẽ dùng was/were đúng để nói về trạng thái và vị trí trong quá khứ.",
  examPattern: "Movers Reading & Writing Part 6 (story) and Listening Part 5 (color/draw): 'Yesterday I was at the park. We were happy.'",
  examPatternVi: "Movers Đọc & Viết Phần 6 (truyện) và Nghe Phần 5: 'Yesterday I was at the park. We were happy.'",
  secretTip: "🔑 Same triangle, past form. I/HE/SHE/IT → WAS · YOU/WE/THEY → WERE. Memorize the split — that's it.",
  secretTipVi: "🔑 Cùng tam giác, dạng quá khứ. I/HE/SHE/IT → WAS · YOU/WE/THEY → WERE. Học thuộc cách chia.",
  welcomeMessage: "🕰️ Yesterday you WERE here. Today you ARE here. Let's time travel!",
  welcomeMessageVi: "🕰️ Hôm qua bạn ĐÃ ở đây. Hôm nay bạn Ở đây. Cùng du hành thời gian!",
  stepByStep: [
    { step: 1, title: "Spot the past time clue", titleVi: "Tìm dấu hiệu quá khứ", detail: "yesterday, last night, last week, ago, in 2020.", detailVi: "yesterday, last night, last week, ago, in 2020." },
    { step: 2, title: "Pick WAS or WERE", titleVi: "Chọn WAS hay WERE", detail: "I/he/she/it → WAS. you/we/they → WERE.", detailVi: "I/he/she/it → WAS. you/we/they → WERE." },
    { step: 3, title: "Negative / question", titleVi: "Phủ định / câu hỏi", detail: "wasn't / weren't. Question: 'Was/Were + subject…?'", detailVi: "wasn't / weren't. Câu hỏi: 'Was/Were + chủ ngữ…?'" },
  ],
  illustratedRules: [
    { icon: "🧒", rule: "I / He / She / It + WAS", ruleVi: "I / He / She / It + WAS", example: "I was tired. She was at home." },
    { icon: "👨‍👩‍👧‍👦", rule: "You / We / They + WERE", ruleVi: "You / We / They + WERE", example: "We were friends. They were here." },
    { icon: "❓", rule: "Question: Was/Were + subject + …?", ruleVi: "Câu hỏi: Was/Were + chủ ngữ + …?", example: "Were you happy? Was he late?" },
    { icon: "🚫", rule: "Negative: wasn't / weren't", ruleVi: "Phủ định: wasn't / weren't", example: "I wasn't at school. They weren't at home." },
  ],
  watchOut: [
    { mistake: "'You was…' (informal but wrong in exams)", mistakeVi: "'You was…' (nói thông tục nhưng SAI trong thi)", tip: "Always 'You WERE' in exams.", tipVi: "Luôn 'You WERE' trong thi." },
    { mistake: "Mixing was/were with present", mistakeVi: "Trộn was/were với hiện tại", tip: "If the time clue is past (yesterday/last…), use was/were — never is/are.", tipVi: "Nếu dấu hiệu là quá khứ, dùng was/were — không dùng is/are." },
  ],
  practiceSet: [
    { instruction: "Was or Were?", instructionVi: "Was hay Were?", question: "Yesterday she ___ at the zoo.", options: ["was", "were", "is", "are"], answer: 0, explanation: "she → was.", explanationVi: "she → was." },
    { instruction: "Was or Were?", instructionVi: "Was hay Were?", question: "We ___ very happy last night.", options: ["was", "were", "is", "are"], answer: 1, explanation: "we → were.", explanationVi: "we → were." },
    { instruction: "Make a question", instructionVi: "Đặt câu hỏi", question: "___ you at the park yesterday?", options: ["Was", "Were", "Is", "Are"], answer: 1, explanation: "you → Were.", explanationVi: "you → Were." },
  ],
  vocabulary: [
    { word: "yesterday", meaning: "the day before today", meaningVi: "hôm qua", example: "Yesterday I was tired." },
    { word: "last night", meaning: "the night before today", meaningVi: "tối qua", example: "We were at the cinema last night." },
    { word: "ago", meaning: "in the past", meaningVi: "trước đây", example: "Two days ago, she was sick." },
    { word: "wasn't", meaning: "was not", meaningVi: "đã không", example: "He wasn't at home." },
  ],
  quiz: [
    { question: "They ___ at school yesterday.", options: ["was", "were", "is", "are"], answer: 1, explanation: "they → were." },
    { question: "I ___ very tired last night.", options: ["was", "were", "am", "is"], answer: 0, explanation: "I → was." },
    { question: "Which is correct?", options: ["You was happy.", "You were happy.", "You is happy.", "You be happy."], answer: 1, explanation: "you → were." },
  ],
  parentInfo: "Was/were is the past form of the foundational verb 'to be'. Mastering it unlocks past-tense storytelling needed for Movers Reading & Writing Part 6.",
  parentInfoVi: "Was/were là quá khứ của 'to be' nền tảng. Làm chủ giúp kể chuyện quá khứ cần cho Movers Đọc & Viết Phần 6.",
});

const moversCan = build({
  id: "cam-grammar-movers-can",
  level: "movers", icon: "💪",
  title: "Can & Can't: Talking About Ability",
  titleVi: "Can & Can't: Nói về Khả năng",
  description: "Use CAN + base verb to describe what you can / can't do — no -s, no -ing, no fuss.",
  descriptionVi: "Dùng CAN + động từ nguyên thể để nói khả năng — không thêm -s, không -ing.",
  learningObjective: "Students will form positive, negative and question sentences with CAN to express ability.",
  learningObjectiveVi: "Học sinh sẽ tạo câu khẳng định, phủ định và câu hỏi với CAN để diễn đạt khả năng.",
  examPattern: "Movers Listening Part 1 & Speaking Part 4: 'Can you swim?' 'I can ride a bike but I can't play tennis.'",
  examPatternVi: "Movers Nghe Phần 1 & Nói Phần 4: 'Can you swim?' 'I can ride a bike but I can't play tennis.'",
  secretTip: "🔑 After CAN, the verb NEVER changes. He can swim. She can swim. They can swim. (No 'cans', no 'swims'!)",
  secretTipVi: "🔑 Sau CAN, động từ KHÔNG đổi. He can swim. She can swim. They can swim. (Không 'cans', không 'swims'!)",
  welcomeMessage: "💪 What CAN you do? Run? Sing? Dance? Let's say it in English!",
  welcomeMessageVi: "💪 Bạn LÀM ĐƯỢC gì? Chạy? Hát? Nhảy? Cùng nói bằng tiếng Anh!",
  stepByStep: [
    { step: 1, title: "Subject + CAN + base verb", titleVi: "Chủ ngữ + CAN + động từ nguyên thể", detail: "I can swim. She can dance. We can play.", detailVi: "I can swim. She can dance. We can play." },
    { step: 2, title: "Negative: CAN'T (cannot)", titleVi: "Phủ định: CAN'T (cannot)", detail: "I can't draw. He can't sing.", detailVi: "I can't draw. He can't sing." },
    { step: 3, title: "Question: Can + subject + verb?", titleVi: "Câu hỏi: Can + chủ ngữ + động từ?", detail: "Can you swim? Yes, I can. / No, I can't.", detailVi: "Can you swim? Yes, I can. / No, I can't." },
  ],
  illustratedRules: [
    { icon: "✅", rule: "Positive: Subject + can + base verb", ruleVi: "Khẳng định: Chủ ngữ + can + V nguyên thể", example: "He can ride a bike." },
    { icon: "❌", rule: "Negative: Subject + can't + base verb", ruleVi: "Phủ định: Chủ ngữ + can't + V", example: "I can't speak Japanese." },
    { icon: "❓", rule: "Question: Can + subject + base verb?", ruleVi: "Câu hỏi: Can + chủ ngữ + V?", example: "Can she play the piano?" },
    { icon: "💬", rule: "Short answers: Yes, I can. / No, I can't.", ruleVi: "Trả lời ngắn: Yes, I can. / No, I can't.", example: "Can you swim? — Yes, I can." },
  ],
  watchOut: [
    { mistake: "Adding -s after can: 'She cans swim'", mistakeVi: "Thêm -s sau can: 'She cans swim'", tip: "CAN never takes -s. 'She CAN swim.'", tipVi: "CAN không bao giờ thêm -s." },
    { mistake: "Using to-infinitive: 'I can to swim'", mistakeVi: "Dùng to-V: 'I can to swim'", tip: "After CAN we use the BARE verb (no 'to').", tipVi: "Sau CAN dùng động từ TRẦN (không 'to')." },
  ],
  practiceSet: [
    { instruction: "Complete with can / can't", instructionVi: "Hoàn thành với can / can't", question: "Fish ___ swim, but they ___ walk.", options: ["can / can", "can't / can", "can / can't", "can't / can't"], answer: 2, explanation: "Fish can swim but cannot walk.", explanationVi: "Cá biết bơi nhưng không biết đi." },
    { instruction: "Pick the correct form", instructionVi: "Chọn dạng đúng", question: "She can ___ a bike.", options: ["rides", "riding", "ride", "to ride"], answer: 2, explanation: "After CAN → bare verb 'ride'.", explanationVi: "Sau CAN → V nguyên thể 'ride'." },
    { instruction: "Make a question", instructionVi: "Đặt câu hỏi", question: "___ you speak English?", options: ["Do", "Are", "Can", "Is"], answer: 2, explanation: "Ability → Can you…?", explanationVi: "Khả năng → Can you…?" },
  ],
  vocabulary: [
    { word: "can", meaning: "to be able to do something", meaningVi: "có thể, biết làm", example: "I can play football." },
    { word: "can't", meaning: "cannot — not able", meaningVi: "không thể", example: "He can't sing." },
    { word: "ride", meaning: "to sit on a bike/horse and travel", meaningVi: "đi/cưỡi", example: "She can ride a bike." },
    { word: "draw", meaning: "to make a picture with a pencil", meaningVi: "vẽ", example: "I can draw a cat." },
  ],
  quiz: [
    { question: "Birds ___ fly.", options: ["can", "cans", "to can", "is can"], answer: 0, explanation: "Use 'can' for ability." },
    { question: "He ___ swim. He's afraid of water.", options: ["can", "cans", "can't", "doesn't can"], answer: 2, explanation: "Negative ability → can't." },
    { question: "Which is correct?", options: ["She cans dance.", "She can dances.", "She can dance.", "She can to dance."], answer: 2, explanation: "can + bare verb." },
  ],
  parentInfo: "Modal verb CAN expresses ability — vital for Movers speaking. The lesson nails the 'no -s, no to, no -ing' rule that trips up most learners.",
  parentInfoVi: "Động từ khuyết thiếu CAN diễn đạt khả năng — quan trọng cho Movers Nói. Bài luyện quy tắc 'không -s, không to, không -ing'.",
});

const moversPossessiveS = build({
  id: "cam-grammar-movers-possessive-s",
  level: "movers", icon: "🧸",
  title: "Possessive 'S: Whose Thing Is It?",
  titleVi: "Sở hữu 'S: Của ai?",
  description: "Add 's to show ownership: 'Tom's bag', 'the dog's tail'. Avoid the #1 plural-vs-possessive mistake.",
  descriptionVi: "Thêm 's để chỉ sở hữu: 'Tom's bag', 'the dog's tail'. Tránh lỗi #1 lẫn số nhiều với sở hữu.",
  learningObjective: "Students will use 's correctly to show possession and distinguish it from plural -s.",
  learningObjectiveVi: "Học sinh sẽ dùng 's đúng để chỉ sở hữu và phân biệt với -s số nhiều.",
  examPattern: "Movers Reading & Writing Part 4 & 5: 'Whose pen is this?' / 'It's Anna's pen.' Common in family/possession topics.",
  examPatternVi: "Movers Đọc & Viết Phần 4 & 5: 'Whose pen is this?' / 'It's Anna's pen.' Thường gặp ở chủ đề gia đình/sở hữu.",
  secretTip: "🔑 The apostrophe ' is the OWNER's flag. Owner + 's + thing they own. 'Sam's hat' = the hat OF Sam.",
  secretTipVi: "🔑 Dấu nháy ' là cờ của CHỦ SỞ HỮU. Chủ sở hữu + 's + vật. 'Sam's hat' = chiếc mũ CỦA Sam.",
  welcomeMessage: "🧸 Whose teddy is this? With 's you can say exactly who owns what!",
  welcomeMessageVi: "🧸 Gấu của ai đây? Với 's bạn nói chính xác ai sở hữu gì!",
  stepByStep: [
    { step: 1, title: "Find the owner", titleVi: "Tìm chủ sở hữu", detail: "Who does the thing belong to? Tom, my mum, the dog…", detailVi: "Vật thuộc về ai? Tom, mẹ, con chó…" },
    { step: 2, title: "Add 's to the owner", titleVi: "Thêm 's vào chủ sở hữu", detail: "Tom → Tom's. The dog → the dog's.", detailVi: "Tom → Tom's. The dog → the dog's." },
    { step: 3, title: "Put the thing after", titleVi: "Đặt vật phía sau", detail: "Tom's bag, my mum's car, the dog's tail.", detailVi: "Tom's bag, my mum's car, the dog's tail." },
  ],
  illustratedRules: [
    { icon: "🏷️", rule: "Owner + 's + thing", ruleVi: "Chủ sở hữu + 's + vật", example: "Anna's pencil, the cat's bowl" },
    { icon: "👥", rule: "Plural owners ending in -s: just add ' (apostrophe)", ruleVi: "Chủ số nhiều kết thúc -s: chỉ thêm '", example: "the boys' room, the teachers' meeting" },
    { icon: "❓", rule: "Question: Whose ___ is this/are these?", ruleVi: "Câu hỏi: Whose ___ is this/are these?", example: "Whose bag is this? — It's Tom's." },
    { icon: "⚠️", rule: "'s shows possession — NOT plural", ruleVi: "'s chỉ sở hữu — KHÔNG phải số nhiều", example: "two cats (plural) vs the cat's tail (possession)" },
  ],
  watchOut: [
    { mistake: "Adding 's to plurals: 'two cat's'", mistakeVi: "Thêm 's vào số nhiều: 'two cat's'", tip: "Plural = cats (no apostrophe). Possession = cat's.", tipVi: "Số nhiều = cats (không dấu '). Sở hữu = cat's." },
    { mistake: "Forgetting apostrophe: 'Toms bag'", mistakeVi: "Quên dấu nháy: 'Toms bag'", tip: "Always write the apostrophe: Tom'S.", tipVi: "Luôn viết dấu nháy: Tom'S." },
  ],
  practiceSet: [
    { instruction: "Choose the correct form", instructionVi: "Chọn dạng đúng", question: "This is ___ bag.", options: ["Tom", "Toms", "Tom's", "Toms'"], answer: 2, explanation: "Owner Tom + 's = Tom's.", explanationVi: "Chủ Tom + 's = Tom's." },
    { instruction: "Whose room?", instructionVi: "Phòng của ai?", question: "It's the ___ room. (The room of the boys)", options: ["boy's", "boys'", "boys", "boys's"], answer: 1, explanation: "Plural owners ending in s → just apostrophe: boys'.", explanationVi: "Chủ số nhiều kết thúc s → chỉ dấu nháy: boys'." },
    { instruction: "Spot the difference", instructionVi: "Phân biệt", question: "Which means 'the tail of the dog'?", options: ["dogs tail", "dog's tail", "dogs' tail", "dog tail"], answer: 1, explanation: "Singular owner dog + 's = dog's tail.", explanationVi: "Chủ số ít dog + 's = dog's tail." },
  ],
  vocabulary: [
    { word: "whose", meaning: "asking about the owner", meaningVi: "của ai", example: "Whose pen is this?" },
    { word: "mine", meaning: "belonging to me", meaningVi: "của tôi", example: "The blue bag is mine." },
    { word: "his", meaning: "belonging to him", meaningVi: "của anh ấy", example: "It's his book." },
    { word: "hers", meaning: "belonging to her", meaningVi: "của cô ấy", example: "The hat is hers." },
  ],
  quiz: [
    { question: "This is ___ car.", options: ["my dad", "my dads", "my dad's", "my dads'"], answer: 2, explanation: "Owner dad + 's." },
    { question: "Which is correct?", options: ["the girls bag (one girl)", "the girl's bag", "the girls' bag (one girl)", "the girl bag"], answer: 1, explanation: "One owner girl + 's." },
    { question: "Whose pencil ___ this?", options: ["are", "is", "be", "do"], answer: 1, explanation: "pencil (singular) → is." },
  ],
  parentInfo: "Possessive 's is essential for talking about family, friends and belongings. The lesson prevents the common 's vs plural -s confusion.",
  parentInfoVi: "Sở hữu 's thiết yếu khi nói về gia đình, bạn bè và đồ dùng. Bài chống lỗi nhầm 's với -s số nhiều.",
});

const moversComparatives = build({
  id: "cam-grammar-movers-comparatives",
  level: "movers", icon: "📏",
  title: "Comparatives: Bigger, Smaller, More Beautiful",
  titleVi: "So sánh hơn: Bigger, Smaller, More Beautiful",
  description: "Two-word formula (-ER + THAN) and the 'more + adjective' trick for long words — used in Movers Speaking Part 2.",
  descriptionVi: "Công thức 2 phần (-ER + THAN) và mẹo 'more + tính từ' cho từ dài — dùng trong Movers Nói Phần 2.",
  learningObjective: "Students will form comparative adjectives correctly and compare two things using 'than'.",
  learningObjectiveVi: "Học sinh sẽ tạo tính từ so sánh hơn đúng và so sánh hai vật bằng 'than'.",
  examPattern: "Movers Speaking Part 2 (Find the differences) frequently needs: 'This cat is bigger than that cat.'",
  examPatternVi: "Movers Nói Phần 2 (Tìm khác biệt) thường cần: 'This cat is bigger than that cat.'",
  secretTip: "🔑 Short adjective (1 syllable) → add -er (tall→taller). Long adjective (2+ syllables) → use MORE (more beautiful). Always end with THAN.",
  secretTipVi: "🔑 Tính từ ngắn (1 âm tiết) → thêm -er. Tính từ dài (2+ âm tiết) → dùng MORE. Luôn kết thúc bằng THAN.",
  welcomeMessage: "📏 Bigger! Smaller! Faster! Slower! Let's compare EVERYTHING!",
  welcomeMessageVi: "📏 To hơn! Nhỏ hơn! Nhanh hơn! Cùng so sánh MỌI THỨ!",
  stepByStep: [
    { step: 1, title: "Count the syllables", titleVi: "Đếm âm tiết", detail: "tall = 1, happy = 2, beautiful = 3.", detailVi: "tall = 1, happy = 2, beautiful = 3." },
    { step: 2, title: "Apply the rule", titleVi: "Áp dụng quy tắc", detail: "1 syll → +er. 2+ syll → 'more + adj'. Y-ending 2 syll → y→i+er (happy→happier).", detailVi: "1 âm → +er. 2+ âm → 'more + adj'. 2 âm kết thúc y → y→i+er (happy→happier)." },
    { step: 3, title: "Add THAN", titleVi: "Thêm THAN", detail: "A is + comparative + than B. 'Tom is taller than Sam.'", detailVi: "A là + so sánh hơn + than B." },
  ],
  illustratedRules: [
    { icon: "📐", rule: "1-syllable adj: add -er (tall→taller, fast→faster)", ruleVi: "Tính từ 1 âm: thêm -er", example: "Bobi is taller than Kim." },
    { icon: "🔁", rule: "CVC short adj: double the consonant (big→bigger, hot→hotter)", ruleVi: "Tính từ ngắn CVC: gấp đôi phụ âm (big→bigger)", example: "An elephant is bigger than a dog." },
    { icon: "😊", rule: "2-syll ending -y: change y→i + er (happy→happier, easy→easier)", ruleVi: "2 âm kết thúc -y: y→i + er", example: "Today is happier than yesterday." },
    { icon: "🌹", rule: "Long adjective: use MORE + adjective (more beautiful, more interesting)", ruleVi: "Tính từ dài: MORE + adj", example: "This flower is more beautiful than that one." },
    { icon: "⚠️", rule: "Irregular: good→better, bad→worse, far→farther", ruleVi: "Bất quy tắc: good→better, bad→worse, far→farther", example: "Pizza is better than soup (for me!)." },
  ],
  watchOut: [
    { mistake: "Double comparison: 'more taller'", mistakeVi: "So sánh kép: 'more taller'", tip: "Pick ONE: either -er OR more, never both.", tipVi: "Chọn MỘT: -er hoặc more, không cả hai." },
    { mistake: "Using 'that' instead of 'than'", mistakeVi: "Dùng 'that' thay vì 'than'", tip: "Comparison always uses THAN (with an N).", tipVi: "So sánh luôn dùng THAN (có N)." },
  ],
  practiceSet: [
    { instruction: "Form the comparative", instructionVi: "Tạo so sánh hơn", question: "A giraffe is ___ (tall) than a horse.", options: ["taller", "more tall", "tallest", "tall"], answer: 0, explanation: "tall (1 syll) → taller.", explanationVi: "tall (1 âm) → taller." },
    { instruction: "Form the comparative", instructionVi: "Tạo so sánh hơn", question: "This book is ___ (interesting) than that one.", options: ["interestinger", "more interesting", "interestingest", "interesting"], answer: 1, explanation: "interesting is long → more interesting.", explanationVi: "interesting là từ dài → more interesting." },
    { instruction: "Irregular form", instructionVi: "Dạng bất quy tắc", question: "My new bike is ___ (good) than my old one.", options: ["gooder", "more good", "better", "best"], answer: 2, explanation: "good → better (irregular).", explanationVi: "good → better (bất quy tắc)." },
  ],
  vocabulary: [
    { word: "than", meaning: "used in comparisons", meaningVi: "hơn (dùng khi so sánh)", example: "He is older than me." },
    { word: "bigger", meaning: "more big", meaningVi: "to hơn", example: "Elephants are bigger than cats." },
    { word: "happier", meaning: "more happy", meaningVi: "vui hơn", example: "I'm happier today." },
    { word: "better", meaning: "more good", meaningVi: "tốt hơn", example: "This pen is better." },
  ],
  quiz: [
    { question: "A mouse is ___ than an elephant.", options: ["smaller", "more small", "smallest", "small"], answer: 0, explanation: "small (1 syll) → smaller." },
    { question: "My homework is ___ than yours.", options: ["easyer", "easier", "more easy", "easiest"], answer: 1, explanation: "easy → easier (y→i+er)." },
    { question: "Which is correct?", options: ["more tall", "taller than", "tall than", "more taller"], answer: 1, explanation: "Use -er + than." },
  ],
  parentInfo: "Comparatives drive the entire 'Find the differences' speaking task at Movers. Mastery here = full speaking marks on comparison questions.",
  parentInfoVi: "So sánh hơn là trung tâm bài 'Tìm khác biệt' Movers Speaking. Làm chủ = điểm tối đa câu so sánh.",
});

// =====================================================================
// FLYERS — 5 grammar lessons
// =====================================================================

const flyersPastSimple = build({
  id: "cam-grammar-flyers-past-simple",
  level: "flyers", icon: "📖",
  title: "Past Simple: Regular -ED & The Irregular Top 20",
  titleVi: "Quá khứ Đơn: -ED Có quy tắc & 20 Bất quy tắc",
  description: "Build past stories with -ED rules (walk→walked, study→studied, stop→stopped) and the Flyers must-know irregular verbs.",
  descriptionVi: "Dựng truyện quá khứ với -ED và danh sách động từ bất quy tắc Flyers phải thuộc.",
  learningObjective: "Students will form past simple of regular and irregular verbs accurately in affirmative, negative, and question forms.",
  learningObjectiveVi: "Học sinh sẽ tạo quá khứ đơn của động từ có/bất quy tắc đúng ở 3 thể.",
  examPattern: "Flyers Reading & Writing Part 6 (story completion) & Listening Part 5: stories always use past simple.",
  examPatternVi: "Flyers Đọc & Viết Phần 6 (hoàn thành truyện) & Nghe Phần 5: truyện luôn dùng quá khứ đơn.",
  secretTip: "🔑 Negative & question use DID + base verb (no -ed!). 'I went' → 'I didn't GO', 'Did you GO?' — never 'didn't went'.",
  secretTipVi: "🔑 Phủ định và câu hỏi dùng DID + V nguyên thể (không -ed!). 'I went' → 'I didn't GO' — không 'didn't went'.",
  welcomeMessage: "📖 Story time! Yesterday I learned… you LEARNED… we LEARNED past simple!",
  welcomeMessageVi: "📖 Giờ kể chuyện! Hôm qua tôi học… bạn ĐÃ HỌC… chúng ta ĐÃ HỌC quá khứ đơn!",
  stepByStep: [
    { step: 1, title: "Regular: add -ED", titleVi: "Có quy tắc: thêm -ED", detail: "play→played. End in -e: just add d (live→lived). CVC short: double (stop→stopped). Cons.+y → ied (study→studied).", detailVi: "play→played. Kết thúc -e: chỉ thêm d. CVC ngắn: gấp đôi. Phụ âm+y → ied." },
    { step: 2, title: "Irregular: memorize the form", titleVi: "Bất quy tắc: học thuộc dạng", detail: "go→went, eat→ate, see→saw, have→had, do→did.", detailVi: "go→went, eat→ate, see→saw, have→had, do→did." },
    { step: 3, title: "Negative & question = DID + base", titleVi: "Phủ định & câu hỏi = DID + V nguyên thể", detail: "I didn't go. Did you go? (NEVER 'didn't went')", detailVi: "I didn't go. Did you go? (KHÔNG 'didn't went')" },
  ],
  illustratedRules: [
    { icon: "📝", rule: "Regular: verb + -ed (walked, talked, played)", ruleVi: "Có quy tắc: V + -ed", example: "I walked to school." },
    { icon: "✂️", rule: "Verb ends in -e: just +d (live→lived)", ruleVi: "V kết thúc -e: chỉ +d", example: "She lived in Hanoi." },
    { icon: "🔁", rule: "CVC: double the consonant (stop→stopped)", ruleVi: "CVC: gấp đôi phụ âm", example: "The car stopped suddenly." },
    { icon: "🔄", rule: "Cons.+y → ied (study→studied)", ruleVi: "Phụ âm+y → ied", example: "We studied hard." },
    { icon: "🎯", rule: "Irregular top 20: go→went, eat→ate, see→saw, do→did, have→had, get→got, take→took, come→came, make→made, give→gave, find→found, buy→bought, think→thought, write→wrote, read→read, say→said, tell→told, run→ran, drink→drank, fly→flew", ruleVi: "20 bất quy tắc Top 20: học thuộc lòng", example: "He went, ate, saw, did, had, got, took, came…" },
  ],
  watchOut: [
    { mistake: "Saying 'didn't went' / 'Did you went?'", mistakeVi: "Nói 'didn't went' / 'Did you went?'", tip: "After DID(N'T), always use BASE verb. 'didn't GO', 'Did you GO?'.", tipVi: "Sau DID(N'T), dùng V NGUYÊN THỂ. 'didn't GO', 'Did you GO?'." },
    { mistake: "Adding -ed to irregular verbs: 'goed', 'eated'", mistakeVi: "Thêm -ed vào bất quy tắc: 'goed', 'eated'", tip: "Memorize the top 20! go→went, eat→ate.", tipVi: "Học thuộc top 20!" },
  ],
  practiceSet: [
    { instruction: "Past form", instructionVi: "Dạng quá khứ", question: "Yesterday I ___ (go) to the zoo.", options: ["goed", "went", "gone", "going"], answer: 1, explanation: "go → went (irregular).", explanationVi: "go → went." },
    { instruction: "Past form (regular)", instructionVi: "Dạng quá khứ (có quy tắc)", question: "She ___ (study) for two hours.", options: ["studyed", "studied", "studyd", "study"], answer: 1, explanation: "study → studied (y→i+ed).", explanationVi: "study → studied." },
    { instruction: "Negative form", instructionVi: "Phủ định", question: "We ___ to the party.", options: ["didn't went", "didn't go", "don't went", "not go"], answer: 1, explanation: "didn't + bare verb GO.", explanationVi: "didn't + V nguyên thể GO." },
  ],
  vocabulary: [
    { word: "went", meaning: "past of go", meaningVi: "quá khứ của go", example: "We went home." },
    { word: "ate", meaning: "past of eat", meaningVi: "quá khứ của eat", example: "She ate an apple." },
    { word: "saw", meaning: "past of see", meaningVi: "quá khứ của see", example: "I saw a bird." },
    { word: "bought", meaning: "past of buy", meaningVi: "quá khứ của buy", example: "He bought a book." },
    { word: "didn't", meaning: "did not — for negative past", meaningVi: "không (phủ định quá khứ)", example: "I didn't see him." },
  ],
  quiz: [
    { question: "Last week he ___ a new bike.", options: ["buyed", "buy", "bought", "buys"], answer: 2, explanation: "buy → bought." },
    { question: "We ___ a film last night.", options: ["watched", "watch", "watching", "watches"], answer: 0, explanation: "watch → watched." },
    { question: "Which is correct?", options: ["Did she went home?", "Did she go home?", "She didn't went home.", "Does she went home?"], answer: 1, explanation: "Did + bare verb." },
  ],
  parentInfo: "Past simple powers all Flyers storytelling. The lesson covers both regular spelling rules and the must-know irregular Top 20, plus the critical 'did + base verb' trap.",
  parentInfoVi: "Quá khứ đơn là trung tâm mọi bài kể chuyện Flyers. Bài luyện cả quy tắc -ed và 20 từ bất quy tắc, cùng bẫy 'did + V nguyên thể'.",
});

const flyersGoingTo = build({
  id: "cam-grammar-flyers-going-to",
  level: "flyers", icon: "🎯",
  title: "Be Going To: Plans You Can See Coming",
  titleVi: "Be Going To: Kế hoạch Đã định",
  description: "Use BE + going to + base verb for future PLANS and predictions you can SEE (dark clouds → it's going to rain).",
  descriptionVi: "Dùng BE + going to + V cho KẾ HOẠCH tương lai và dự đoán có DẤU HIỆU (mây đen → trời sắp mưa).",
  learningObjective: "Students will use 'be going to' for plans, intentions, and evidence-based predictions.",
  learningObjectiveVi: "Học sinh sẽ dùng 'be going to' cho kế hoạch, ý định và dự đoán có cơ sở.",
  examPattern: "Flyers Speaking Part 4 ('What are you going to do at the weekend?') & Reading & Writing Part 6 (planning paragraphs).",
  examPatternVi: "Flyers Nói Phần 4 ('What are you going to do at the weekend?') & Đọc & Viết Phần 6 (đoạn kế hoạch).",
  secretTip: "🔑 Formula: SUBJECT + am/is/are + going to + BASE VERB. Use it when you can SEE the plan or evidence.",
  secretTipVi: "🔑 Công thức: CN + am/is/are + going to + V nguyên thể. Dùng khi bạn THẤY kế hoạch hoặc bằng chứng.",
  welcomeMessage: "🎯 What are YOU going to do tomorrow? Let's plan!",
  welcomeMessageVi: "🎯 Ngày mai bạn SẼ làm gì? Cùng lên kế hoạch!",
  stepByStep: [
    { step: 1, title: "Pick to-be", titleVi: "Chọn to-be", detail: "I am, he/she/it is, you/we/they are.", detailVi: "I am, he/she/it is, you/we/they are." },
    { step: 2, title: "Add 'going to'", titleVi: "Thêm 'going to'", detail: "be + going to (no change to going).", detailVi: "be + going to (going không đổi)." },
    { step: 3, title: "End with the base verb", titleVi: "Kết thúc bằng V nguyên thể", detail: "I am going to play / She is going to study / They are going to travel.", detailVi: "I am going to play / She is going to study / They are going to travel." },
  ],
  illustratedRules: [
    { icon: "📅", rule: "Plan: I am going to study tonight.", ruleVi: "Kế hoạch: I am going to study tonight.", example: "We are going to visit grandma on Sunday." },
    { icon: "👀", rule: "Evidence: Look at the clouds — it's going to rain.", ruleVi: "Bằng chứng: Look at the clouds — trời sắp mưa.", example: "The baby is going to cry — look at her face!" },
    { icon: "❓", rule: "Question: Are/Is + subject + going to + V?", ruleVi: "Câu hỏi: Are/Is + CN + going to + V?", example: "Are you going to come?" },
    { icon: "🚫", rule: "Negative: am/is/are NOT going to + V", ruleVi: "Phủ định: am/is/are NOT going to + V", example: "I'm not going to watch TV." },
  ],
  watchOut: [
    { mistake: "Forgetting 'to': 'I am going play'", mistakeVi: "Quên 'to': 'I am going play'", tip: "Always: going + TO + base verb.", tipVi: "Luôn: going + TO + V." },
    { mistake: "Changing 'going': 'I am goes to play'", mistakeVi: "Đổi 'going': 'I am goes to play'", tip: "'Going' stays the same; only BE changes (am/is/are).", tipVi: "'Going' giữ nguyên; chỉ BE đổi (am/is/are)." },
  ],
  practiceSet: [
    { instruction: "Complete the sentence", instructionVi: "Hoàn thành câu", question: "She ___ to visit her aunt tomorrow.", options: ["is going", "going", "is go", "are going"], answer: 0, explanation: "She → is going to.", explanationVi: "She → is going to." },
    { instruction: "Choose the form", instructionVi: "Chọn dạng", question: "We are going to ___ a film tonight.", options: ["watching", "watches", "watched", "watch"], answer: 3, explanation: "After 'going to' → base verb.", explanationVi: "Sau 'going to' → V nguyên thể." },
    { instruction: "Make a question", instructionVi: "Đặt câu hỏi", question: "___ you going to study tonight?", options: ["Do", "Is", "Are", "Will"], answer: 2, explanation: "you → Are.", explanationVi: "you → Are." },
  ],
  vocabulary: [
    { word: "tomorrow", meaning: "the day after today", meaningVi: "ngày mai", example: "Tomorrow I'm going to swim." },
    { word: "tonight", meaning: "this evening/night", meaningVi: "tối nay", example: "Tonight we're going to cook." },
    { word: "at the weekend", meaning: "on Saturday/Sunday", meaningVi: "vào cuối tuần", example: "I'm going to relax at the weekend." },
    { word: "plan", meaning: "something you decide to do", meaningVi: "kế hoạch", example: "My plan is to read 3 books." },
  ],
  quiz: [
    { question: "Look! The cat ___ jump!", options: ["is going to", "going to", "is go", "goes to"], answer: 0, explanation: "Visible evidence → is going to + base verb." },
    { question: "Which is correct?", options: ["He is going play.", "He is going to play.", "He going to play.", "He is goes to play."], answer: 1, explanation: "is + going + to + base verb." },
    { question: "What ___ you going to do at the weekend?", options: ["is", "are", "do", "have"], answer: 1, explanation: "you → are." },
  ],
  parentInfo: "'Be going to' is the most natural future form for plans — central to Flyers Speaking Part 4. The lesson nails word order and the 'evidence' usage.",
  parentInfoVi: "'Be going to' là tương lai tự nhiên nhất cho kế hoạch — trung tâm Flyers Speaking Phần 4. Bài luyện trật tự từ và cách dùng 'bằng chứng'.",
});

const flyersSuperlatives = build({
  id: "cam-grammar-flyers-superlatives",
  level: "flyers", icon: "🏆",
  title: "Superlatives: The Best, The Tallest, The Most Beautiful",
  titleVi: "So sánh nhất: The Best, The Tallest, The Most Beautiful",
  description: "Use THE + -EST or THE MOST to talk about #1 — and always remember the article THE.",
  descriptionVi: "Dùng THE + -EST hoặc THE MOST để nói về #1 — và luôn nhớ mạo từ THE.",
  learningObjective: "Students will form and use superlative adjectives correctly with 'the'.",
  learningObjectiveVi: "Học sinh sẽ tạo và dùng tính từ so sánh nhất đúng với 'the'.",
  examPattern: "Flyers Reading & Writing Part 5/6 and Speaking Part 3 use superlatives in profile/preference questions.",
  examPatternVi: "Flyers Đọc & Viết Phần 5/6 và Nói Phần 3 dùng so sánh nhất trong câu hỏi sở thích/giới thiệu.",
  secretTip: "🔑 THE + -EST (short adj) or THE + MOST + adj (long). Never forget THE — it's part of the rule.",
  secretTipVi: "🔑 THE + -EST (tính từ ngắn) hoặc THE + MOST + tính từ (dài). KHÔNG được quên THE.",
  welcomeMessage: "🏆 Who's THE best? THE tallest? THE most amazing? Let's crown them!",
  welcomeMessageVi: "🏆 Ai là NHẤT? Cao NHẤT? Tuyệt NHẤT? Cùng trao vương miện!",
  stepByStep: [
    { step: 1, title: "Decide short vs long", titleVi: "Quyết định ngắn hay dài", detail: "1 syll → -est. 2+ syll → most + adj. Y-ending 2 syll → y→i+est (happy→happiest).", detailVi: "1 âm → -est. 2+ âm → most + adj." },
    { step: 2, title: "Add THE", titleVi: "Thêm THE", detail: "Always 'THE tallest', 'THE most beautiful'.", detailVi: "Luôn 'THE tallest', 'THE most beautiful'." },
    { step: 3, title: "Put it in a sentence", titleVi: "Đặt vào câu", detail: "Mount Everest is THE tallest mountain IN the world.", detailVi: "Mount Everest is THE tallest mountain IN the world." },
  ],
  illustratedRules: [
    { icon: "📏", rule: "Short adj: the + adj + -est (tall→the tallest)", ruleVi: "Tính từ ngắn: the + adj + -est", example: "He is the tallest in the class." },
    { icon: "😀", rule: "2-syll -y: y→i + est (happy→the happiest)", ruleVi: "2 âm -y: y→i + est", example: "Today is the happiest day." },
    { icon: "🌟", rule: "Long adj: the most + adj (the most beautiful)", ruleVi: "Tính từ dài: the most + adj", example: "It's the most interesting book." },
    { icon: "⭐", rule: "Irregular: good→best, bad→worst, far→farthest", ruleVi: "Bất quy tắc: good→best, bad→worst", example: "She is the best singer." },
  ],
  watchOut: [
    { mistake: "Forgetting THE: 'He is tallest in class'", mistakeVi: "Quên THE: 'He is tallest in class'", tip: "Always say THE + -est / THE most.", tipVi: "Luôn nói THE + -est / THE most." },
    { mistake: "Double form: 'the most tallest'", mistakeVi: "Dạng kép: 'the most tallest'", tip: "Pick ONE: most + adj OR -est. Not both.", tipVi: "Chọn MỘT: most + adj HOẶC -est." },
  ],
  practiceSet: [
    { instruction: "Form the superlative", instructionVi: "Tạo so sánh nhất", question: "Mount Everest is ___ (tall) mountain in the world.", options: ["the tallest", "the most tall", "tallest", "more tall"], answer: 0, explanation: "tall (1 syll) → the tallest.", explanationVi: "tall → the tallest." },
    { instruction: "Form the superlative", instructionVi: "Tạo so sánh nhất", question: "She is ___ (intelligent) student in the class.", options: ["the intelligentest", "the most intelligent", "more intelligent", "intelligenter"], answer: 1, explanation: "intelligent is long → the most intelligent.", explanationVi: "intelligent là từ dài → the most intelligent." },
    { instruction: "Irregular form", instructionVi: "Dạng bất quy tắc", question: "Today was ___ (bad) day of my life.", options: ["the baddest", "the worst", "the most bad", "the worse"], answer: 1, explanation: "bad → the worst.", explanationVi: "bad → the worst." },
  ],
  vocabulary: [
    { word: "the tallest", meaning: "number 1 in height", meaningVi: "cao nhất", example: "He is the tallest." },
    { word: "the best", meaning: "number 1 in quality", meaningVi: "tốt nhất", example: "She is the best dancer." },
    { word: "the worst", meaning: "number 1 in being bad", meaningVi: "tệ nhất", example: "That was the worst movie." },
    { word: "the most", meaning: "with long adjectives", meaningVi: "dùng với tính từ dài", example: "the most beautiful flower" },
  ],
  quiz: [
    { question: "This is ___ cake I have ever eaten.", options: ["the deliciousest", "the most delicious", "deliciousest", "more delicious"], answer: 1, explanation: "delicious is long → the most delicious." },
    { question: "January is ___ month of the year (in Vietnam).", options: ["the coldest", "the most cold", "colder", "more cold"], answer: 0, explanation: "cold (1 syll) → the coldest." },
    { question: "Which is correct?", options: ["He's tallest in class.", "He's the most tallest.", "He's the tallest in class.", "He's the taller in class."], answer: 2, explanation: "THE + -est." },
  ],
  parentInfo: "Superlatives are essential for Flyers profile and opinion questions. The lesson cements both forms (-est / most) and the obligatory 'the'.",
  parentInfoVi: "So sánh nhất quan trọng cho câu hỏi giới thiệu/ý kiến ở Flyers. Bài luyện cả hai dạng và 'the' bắt buộc.",
});

const flyersMustMustnt = build({
  id: "cam-grammar-flyers-must-mustnt",
  level: "flyers", icon: "🚸",
  title: "Must vs Mustn't: Rules & Strong Advice",
  titleVi: "Must vs Mustn't: Quy định & Lời khuyên Mạnh",
  description: "Use MUST for things you HAVE to do, MUSTN'T for things that are FORBIDDEN — perfect for school/safety topics.",
  descriptionVi: "Dùng MUST cho điều PHẢI làm, MUSTN'T cho điều CẤM — hoàn hảo cho chủ đề trường lớp/an toàn.",
  learningObjective: "Students will use must/mustn't to express obligation and prohibition with the base verb.",
  learningObjectiveVi: "Học sinh sẽ dùng must/mustn't để diễn đạt bắt buộc và cấm với V nguyên thể.",
  examPattern: "Flyers Reading & Writing Part 4 (rules signs), Listening Part 5 (instructions), and Speaking Part 4.",
  examPatternVi: "Flyers Đọc & Viết Phần 4 (biển báo), Nghe Phần 5 (hướng dẫn), Nói Phần 4.",
  secretTip: "🔑 MUST = It's a RULE (necessary). MUSTN'T = It's FORBIDDEN (not allowed). Always followed by BARE verb.",
  secretTipVi: "🔑 MUST = QUY ĐỊNH (cần thiết). MUSTN'T = CẤM (không được phép). Sau là V NGUYÊN THỂ.",
  welcomeMessage: "🚸 Stop! Listen! What MUST you do? What MUSTN'T you do? Let's learn the rules!",
  welcomeMessageVi: "🚸 Dừng! Nghe! Bạn PHẢI làm gì? KHÔNG ĐƯỢC làm gì? Cùng học quy tắc!",
  stepByStep: [
    { step: 1, title: "Identify the meaning", titleVi: "Xác định nghĩa", detail: "Necessary? → must. Forbidden? → mustn't.", detailVi: "Bắt buộc? → must. Cấm? → mustn't." },
    { step: 2, title: "Subject + must(n't) + base verb", titleVi: "CN + must(n't) + V", detail: "All subjects use the same form — no -s!", detailVi: "Mọi CN dùng cùng dạng — không -s!" },
    { step: 3, title: "Read signs aloud", titleVi: "Đọc to biển báo", detail: "🚭 = You mustn't smoke. 🪖 = You must wear a helmet.", detailVi: "🚭 = You mustn't smoke. 🪖 = You must wear a helmet." },
  ],
  illustratedRules: [
    { icon: "✅", rule: "MUST = it's necessary / a rule", ruleVi: "MUST = cần thiết / quy định", example: "You must wear a helmet." },
    { icon: "❌", rule: "MUSTN'T = it's forbidden / not allowed", ruleVi: "MUSTN'T = cấm / không được phép", example: "You mustn't run in the corridor." },
    { icon: "🧒", rule: "Same form for all subjects (I, you, he, she, we, they)", ruleVi: "Cùng dạng cho mọi CN", example: "He must / They must / She mustn't" },
    { icon: "📚", rule: "After must(n't) → BARE verb (no to, no -s)", ruleVi: "Sau must(n't) → V TRẦN", example: "She must STUDY. (not 'studies', not 'to study')" },
  ],
  watchOut: [
    { mistake: "Adding -s: 'She musts go'", mistakeVi: "Thêm -s: 'She musts go'", tip: "Modal verbs (must, can, should) never take -s.", tipVi: "Động từ khuyết thiếu không bao giờ thêm -s." },
    { mistake: "Confusing 'mustn't' with 'don't have to'", mistakeVi: "Nhầm 'mustn't' với 'don't have to'", tip: "MUSTN'T = forbidden. DON'T HAVE TO = not necessary (but okay to do).", tipVi: "MUSTN'T = cấm. DON'T HAVE TO = không cần thiết (vẫn được làm)." },
  ],
  practiceSet: [
    { instruction: "Choose must or mustn't", instructionVi: "Chọn must hay mustn't", question: "🚭 You ___ smoke here.", options: ["must", "mustn't", "can", "have"], answer: 1, explanation: "No-smoking sign = forbidden = mustn't.", explanationVi: "Biển cấm hút thuốc = mustn't." },
    { instruction: "Choose must or mustn't", instructionVi: "Chọn must hay mustn't", question: "Students ___ wear a school uniform.", options: ["must", "mustn't", "can't", "don't"], answer: 0, explanation: "School rule = must.", explanationVi: "Quy định trường = must." },
    { instruction: "Choose the verb form", instructionVi: "Chọn dạng V", question: "We must ___ our homework.", options: ["doing", "does", "do", "to do"], answer: 2, explanation: "After must → bare verb 'do'.", explanationVi: "Sau must → V trần 'do'." },
  ],
  vocabulary: [
    { word: "must", meaning: "have to (rule / necessity)", meaningVi: "phải (quy định)", example: "You must be quiet in the library." },
    { word: "mustn't", meaning: "must not — forbidden", meaningVi: "không được phép", example: "You mustn't talk during the test." },
    { word: "rule", meaning: "something you must follow", meaningVi: "quy định", example: "Read the school rules." },
    { word: "allowed", meaning: "permitted to do", meaningVi: "được phép", example: "Phones are not allowed here." },
  ],
  quiz: [
    { question: "🪖 You ___ wear a helmet on a bike.", options: ["must", "mustn't", "can't", "doesn't"], answer: 0, explanation: "Safety rule = must." },
    { question: "We ___ talk loudly in the library.", options: ["must", "mustn't", "can", "are"], answer: 1, explanation: "Forbidden = mustn't." },
    { question: "Which is correct?", options: ["She musts study.", "She must studies.", "She must study.", "She must to study."], answer: 2, explanation: "must + bare verb." },
  ],
  parentInfo: "Modal verbs must/mustn't drive 'rules' tasks at Flyers (signs, instructions). The lesson cements the modal pattern (no -s, no to).",
  parentInfoVi: "Must/mustn't là trung tâm bài 'quy định' Flyers (biển báo, hướng dẫn). Bài luyện cấu trúc modal (không -s, không to).",
});

const flyersAdverbsFreq = build({
  id: "cam-grammar-flyers-adverbs-frequency",
  level: "flyers", icon: "📅",
  title: "Adverbs of Frequency: Always to Never on a Line",
  titleVi: "Trạng từ Tần suất: Always đến Never trên Trục",
  description: "Position 'always, usually, often, sometimes, rarely, never' correctly using the BEFORE-main / AFTER-be rule.",
  descriptionVi: "Đặt 'always, usually, often, sometimes, rarely, never' đúng vị trí dựa vào quy tắc TRƯỚC động từ chính / SAU to-be.",
  learningObjective: "Students will place adverbs of frequency correctly in sentences (before main verbs, after to-be).",
  learningObjectiveVi: "Học sinh sẽ đặt trạng từ tần suất đúng vị trí (trước V chính, sau to-be).",
  examPattern: "Flyers Reading & Writing Part 6 (routine paragraph) and Speaking Part 4 (daily routine).",
  examPatternVi: "Flyers Đọc & Viết Phần 6 (đoạn thói quen) và Nói Phần 4 (thói quen hàng ngày).",
  secretTip: "🔑 Rule of thumb: AFTER 'to-be' (am/is/are), BEFORE every other verb. 'I am always happy.' / 'I always play tennis.'",
  secretTipVi: "🔑 Quy tắc vàng: SAU 'to-be', TRƯỚC mọi động từ khác. 'I am always happy.' / 'I always play tennis.'",
  welcomeMessage: "📅 How often do you eat ice cream? Always? Sometimes? Never? Let's say it!",
  welcomeMessageVi: "📅 Bạn ăn kem mức nào? Always? Sometimes? Never? Cùng nói!",
  stepByStep: [
    { step: 1, title: "Memorize the frequency line", titleVi: "Học thuộc trục tần suất", detail: "always (100%) → usually → often → sometimes → rarely → never (0%).", detailVi: "always (100%) → usually → often → sometimes → rarely → never (0%)." },
    { step: 2, title: "Apply the position rule", titleVi: "Áp dụng quy tắc vị trí", detail: "After be, before other verbs.", detailVi: "Sau be, trước động từ khác." },
    { step: 3, title: "Build the sentence", titleVi: "Dựng câu", detail: "I always brush my teeth. She is never late.", detailVi: "I always brush my teeth. She is never late." },
  ],
  illustratedRules: [
    { icon: "📊", rule: "Frequency line: always 100% → usually 80% → often 60% → sometimes 40% → rarely 10% → never 0%", ruleVi: "Trục tần suất: 100% → 0%", example: "I always wake up at 6. I never drink coffee." },
    { icon: "🟰", rule: "After to-be: SUBJECT + BE + adverb + …", ruleVi: "Sau to-be: CN + BE + trạng từ", example: "She is always happy." },
    { icon: "⏩", rule: "Before main verb: SUBJECT + adverb + verb …", ruleVi: "Trước V chính: CN + trạng từ + V", example: "We often play football." },
    { icon: "📝", rule: "Adverbs of frequency answer 'How often?'", ruleVi: "Trả lời 'How often?'", example: "How often do you read? — I usually read at night." },
  ],
  watchOut: [
    { mistake: "Putting frequency adverb at the END: 'I play tennis always.'", mistakeVi: "Đặt cuối câu: 'I play tennis always.'", tip: "Move it before the main verb: 'I always play tennis.'", tipVi: "Đặt trước V chính: 'I always play tennis.'" },
    { mistake: "Putting it BEFORE be: 'She always is happy.'", mistakeVi: "Đặt trước be: 'She always is happy.'", tip: "After be: 'She IS always happy.'", tipVi: "Sau be: 'She IS always happy.'" },
  ],
  practiceSet: [
    { instruction: "Place the adverb correctly", instructionVi: "Đặt trạng từ đúng", question: "(usually) I ___ go ___ to school ___ by bike.", options: ["start", "after 'I'", "after 'go'", "at the end"], answer: 1, explanation: "Before main verb 'go' → 'I usually go to school by bike.'", explanationVi: "Trước V chính 'go'." },
    { instruction: "Place the adverb correctly", instructionVi: "Đặt trạng từ đúng", question: "(always) She ___ is ___ happy ___ in the morning.", options: ["before 'is'", "after 'is'", "after 'happy'", "at the end"], answer: 1, explanation: "After to-be: 'She is always happy.'", explanationVi: "Sau to-be: 'She is always happy.'" },
    { instruction: "Choose the correct sentence", instructionVi: "Chọn câu đúng", question: "Which sentence is correct?", options: ["I eat sometimes pizza.", "Sometimes I eat pizza.", "I sometimes eat pizza.", "Both B and C"], answer: 3, explanation: "'Sometimes' is flexible — beginning OR before main verb both work.", explanationVi: "'Sometimes' linh hoạt — đầu câu hoặc trước V chính đều được." },
  ],
  vocabulary: [
    { word: "always", meaning: "100% of the time", meaningVi: "luôn luôn", example: "I always brush my teeth." },
    { word: "usually", meaning: "most of the time", meaningVi: "thường", example: "She usually goes by bus." },
    { word: "often", meaning: "many times", meaningVi: "hay, thường", example: "We often visit grandma." },
    { word: "sometimes", meaning: "from time to time", meaningVi: "thỉnh thoảng", example: "I sometimes watch TV." },
    { word: "never", meaning: "0% — not ever", meaningVi: "không bao giờ", example: "He never eats meat." },
  ],
  quiz: [
    { question: "Which sentence is correct?", options: ["She is never late.", "She never is late.", "She is late never.", "Never she is late."], answer: 0, explanation: "After be → adverb after 'is'." },
    { question: "Which sentence is correct?", options: ["I play always tennis.", "I always play tennis.", "Always I play tennis.", "Play I always tennis."], answer: 1, explanation: "Before main verb 'play'." },
    { question: "How often = ___ ?", options: ["Tần suất bao nhiêu", "Khi nào", "Ở đâu", "Bao lâu"], answer: 0, explanation: "'How often' asks frequency." },
  ],
  parentInfo: "Frequency adverbs are essential for routine descriptions. The position rule (after be, before main verb) is one of the most-tested patterns at Flyers.",
  parentInfoVi: "Trạng từ tần suất quan trọng để mô tả thói quen. Quy tắc vị trí được kiểm tra nhiều ở Flyers.",
});

// =====================================================================
// KET — 5 grammar lessons
// =====================================================================

const ketPresentPerfect = build({
  id: "cam-grammar-ket-present-perfect",
  level: "ket", icon: "✅",
  title: "Present Perfect: Have/Has + V3 for Life Experiences",
  titleVi: "Hiện tại Hoàn thành: Have/Has + V3 cho Kinh nghiệm Sống",
  description: "Use HAVE/HAS + past participle to talk about experiences ('I have visited Paris') and recent actions with results.",
  descriptionVi: "Dùng HAVE/HAS + V3 để nói kinh nghiệm ('I have visited Paris') và hành động vừa có kết quả.",
  learningObjective: "Students will form and use the present perfect for life experiences and recent past with present results.",
  learningObjectiveVi: "Học sinh sẽ tạo và dùng hiện tại hoàn thành cho kinh nghiệm và quá khứ gần có kết quả ở hiện tại.",
  examPattern: "KET Reading Part 5 (open cloze) and Writing Part 7 frequently test: 'Have you ever…?' / 'I've just finished…'.",
  examPatternVi: "KET Đọc Phần 5 và Viết Phần 7 thường kiểm tra: 'Have you ever…?' / 'I've just finished…'.",
  secretTip: "🔑 Time markers: EVER, NEVER, JUST, ALREADY, YET, FOR, SINCE → present perfect. Specific past time (yesterday, in 2010) → past simple.",
  secretTipVi: "🔑 Dấu hiệu: EVER, NEVER, JUST, ALREADY, YET, FOR, SINCE → hiện tại hoàn thành. Thời gian quá khứ cụ thể → quá khứ đơn.",
  welcomeMessage: "✅ Have you EVER tried sushi? Have you EVER seen snow? Let's share experiences!",
  welcomeMessageVi: "✅ Bạn ĐÃ TỪNG ăn sushi chưa? ĐÃ TỪNG thấy tuyết chưa? Cùng chia sẻ!",
  stepByStep: [
    { step: 1, title: "Pick have / has", titleVi: "Chọn have / has", detail: "I/you/we/they → have. He/she/it → has.", detailVi: "I/you/we/they → have. He/she/it → has." },
    { step: 2, title: "Add past participle (V3)", titleVi: "Thêm V3", detail: "Regular = past simple (worked). Irregular: gone, eaten, seen, done…", detailVi: "Có quy tắc = quá khứ đơn (worked). Bất quy tắc: gone, eaten, seen, done…" },
    { step: 3, title: "Add the time marker", titleVi: "Thêm dấu hiệu thời gian", detail: "ever, never, just, already, yet, for, since.", detailVi: "ever, never, just, already, yet, for, since." },
  ],
  illustratedRules: [
    { icon: "🌍", rule: "Experience: I have visited 5 countries.", ruleVi: "Kinh nghiệm: I have visited 5 countries.", example: "Have you ever been to Japan?" },
    { icon: "⏱️", rule: "Just / Already / Yet: very recent or completion", ruleVi: "Just / Already / Yet: rất gần hoặc hoàn tất", example: "I've just finished my homework. Have you done it yet?" },
    { icon: "📆", rule: "For + period / Since + point in time", ruleVi: "For + khoảng / Since + mốc", example: "I have lived here for 5 years / since 2019." },
    { icon: "⚠️", rule: "Specific past time → past simple, NOT perfect", ruleVi: "Thời gian quá khứ cụ thể → quá khứ đơn", example: "I went to Paris in 2020. (NOT 'I have gone in 2020')" },
  ],
  watchOut: [
    { mistake: "'I have went' (using V2 instead of V3)", mistakeVi: "'I have went' (dùng V2 thay V3)", tip: "After have/has → V3 (past participle): 'I have GONE'.", tipVi: "Sau have/has → V3: 'I have GONE'." },
    { mistake: "Mixing with specific past times: 'I have seen it yesterday'", mistakeVi: "Trộn với thời gian quá khứ cụ thể: 'I have seen it yesterday'", tip: "Yesterday → past simple: 'I SAW it yesterday'.", tipVi: "Yesterday → quá khứ đơn: 'I SAW it yesterday'." },
  ],
  practiceSet: [
    { instruction: "Complete with present perfect", instructionVi: "Hoàn thành với hiện tại hoàn thành", question: "I ___ (never / be) to London.", options: ["have never been", "never was", "am never", "have never gone"], answer: 0, explanation: "have + never + been (V3 of be).", explanationVi: "have + never + been." },
    { instruction: "Choose tense", instructionVi: "Chọn thì", question: "She ___ (live) here for ten years.", options: ["lives", "lived", "has lived", "is living"], answer: 2, explanation: "'for ten years' → present perfect.", explanationVi: "'for ten years' → hiện tại hoàn thành." },
    { instruction: "Spot the trap", instructionVi: "Bẫy thời gian", question: "I ___ (see) that film last week.", options: ["have seen", "saw", "see", "had seen"], answer: 1, explanation: "'last week' = specific past → past simple SAW.", explanationVi: "'last week' = quá khứ cụ thể → SAW." },
  ],
  vocabulary: [
    { word: "ever", meaning: "at any time in your life", meaningVi: "đã từng", example: "Have you ever flown?" },
    { word: "never", meaning: "not at any time", meaningVi: "chưa bao giờ", example: "I've never tried it." },
    { word: "just", meaning: "a very short time ago", meaningVi: "vừa mới", example: "I've just arrived." },
    { word: "already", meaning: "before now (often sooner than expected)", meaningVi: "đã rồi", example: "She's already left." },
    { word: "yet", meaning: "up to now (questions/negatives)", meaningVi: "chưa (hỏi/phủ định)", example: "Have you finished yet?" },
  ],
  quiz: [
    { question: "Have you ___ been to Hue?", options: ["never", "ever", "just", "yet"], answer: 1, explanation: "Question of experience → ever." },
    { question: "He ___ his homework yet.", options: ["didn't finish", "hasn't finished", "doesn't finish", "isn't finishing"], answer: 1, explanation: "'yet' → present perfect negative." },
    { question: "I ___ Hanoi in 2018.", options: ["have visited", "visited", "visit", "am visiting"], answer: 1, explanation: "in 2018 = specific past → past simple." },
  ],
  parentInfo: "Present perfect is the key tense distinguishing KET writers from beginners. The lesson covers form (have/has + V3), time markers, and how to avoid mixing with past simple.",
  parentInfoVi: "Hiện tại hoàn thành là thì then chốt phân biệt thí sinh KET với người mới. Bài luyện công thức, dấu hiệu và cách tránh trộn với quá khứ đơn.",
});

const ketWillVsGoing = build({
  id: "cam-grammar-ket-will-vs-going",
  level: "ket", icon: "🔮",
  title: "Will vs Be Going To: Decisions, Plans, Predictions",
  titleVi: "Will vs Be Going To: Quyết định, Kế hoạch, Dự đoán",
  description: "Use WILL for on-the-spot decisions and offers, BE GOING TO for plans and evidence — KET examiners love this contrast.",
  descriptionVi: "Dùng WILL cho quyết định tức thì và lời đề nghị, BE GOING TO cho kế hoạch và bằng chứng — KET hay kiểm tra.",
  learningObjective: "Students will choose between WILL and BE GOING TO correctly based on context.",
  learningObjectiveVi: "Học sinh sẽ chọn WILL hay BE GOING TO đúng theo ngữ cảnh.",
  examPattern: "KET Reading Part 5 and Writing Part 7: 'I'll help you' (offer) vs 'I'm going to study tonight' (plan).",
  examPatternVi: "KET Đọc Phần 5 và Viết Phần 7: 'I'll help you' (đề nghị) vs 'I'm going to study tonight' (kế hoạch).",
  secretTip: "🔑 Decided BEFORE this moment → going to. Decided RIGHT NOW (or offering) → will. 'A: This bag is heavy. B: I'll help you!'",
  secretTipVi: "🔑 Quyết định TRƯỚC khoảnh khắc này → going to. Quyết định NGAY BÂY GIỜ (hoặc đề nghị) → will.",
  welcomeMessage: "🔮 Future time! Will it rain tomorrow? Are you going to study? Let's choose the right form!",
  welcomeMessageVi: "🔮 Tương lai! Mai có mưa? Bạn sẽ học? Cùng chọn dạng đúng!",
  stepByStep: [
    { step: 1, title: "Ask: was the decision made before?", titleVi: "Hỏi: quyết định trước đó?", detail: "Yes → going to. No (now/this moment) → will.", detailVi: "Có → going to. Không (ngay giờ) → will." },
    { step: 2, title: "Check for evidence", titleVi: "Kiểm tra bằng chứng", detail: "Visible evidence (dark clouds) → going to. Just a personal opinion → will.", detailVi: "Bằng chứng nhìn thấy → going to. Ý kiến cá nhân → will." },
    { step: 3, title: "Apply the formula", titleVi: "Áp dụng công thức", detail: "WILL + base verb. BE + going to + base verb.", detailVi: "WILL + V. BE + going to + V." },
  ],
  illustratedRules: [
    { icon: "💡", rule: "On-the-spot decision: I'll have the chicken, please.", ruleVi: "Quyết định tức thì: I'll have the chicken.", example: "(in a restaurant) I'll order pizza." },
    { icon: "🙋", rule: "Offer / promise: I'll help you. I'll call you tonight.", ruleVi: "Đề nghị / hứa: I'll help you.", example: "Don't worry, I'll be there." },
    { icon: "🗓️", rule: "Plan made before: I'm going to study tonight.", ruleVi: "Kế hoạch đã có: I'm going to study tonight.", example: "We're going to visit Da Nang in July." },
    { icon: "🌧️", rule: "Evidence prediction: Look at the clouds — it's going to rain.", ruleVi: "Dự đoán có bằng chứng: Look at the clouds — going to rain.", example: "She's so tired — she's going to fall asleep." },
    { icon: "🔮", rule: "Opinion prediction: I think it will rain tomorrow.", ruleVi: "Dự đoán theo ý kiến: I think it will rain tomorrow.", example: "I believe she'll win." },
  ],
  watchOut: [
    { mistake: "Using WILL for pre-made plans: 'I will visit Hanoi next week (already booked)'", mistakeVi: "Dùng WILL cho kế hoạch đã có: 'I will visit Hanoi next week (đã đặt vé)'", tip: "If you've already decided/booked, use 'going to' or present continuous.", tipVi: "Nếu đã quyết định/đặt trước, dùng 'going to' hoặc hiện tại tiếp diễn." },
    { mistake: "Using GOING TO for spontaneous offers: 'I'm going to help you (just now)'", mistakeVi: "Dùng GOING TO cho đề nghị tức thì", tip: "Spontaneous offers → 'I'll help you'.", tipVi: "Đề nghị tức thì → 'I'll help you'." },
  ],
  practiceSet: [
    { instruction: "Choose will or going to", instructionVi: "Chọn will hay going to", question: "A: The phone is ringing! B: Don't worry, I ___ answer it.", options: ["am going to", "will", "going to", "will be"], answer: 1, explanation: "Spontaneous offer → will.", explanationVi: "Đề nghị tức thì → will." },
    { instruction: "Choose will or going to", instructionVi: "Chọn will hay going to", question: "We ___ travel to Japan next summer. (tickets booked)", options: ["will", "are going to", "go to", "are will"], answer: 1, explanation: "Plan already decided → going to.", explanationVi: "Kế hoạch đã quyết → going to." },
    { instruction: "Choose will or going to", instructionVi: "Chọn will hay going to", question: "Look at the sky! It ___ rain.", options: ["will", "is going to", "rains", "going"], answer: 1, explanation: "Visible evidence → going to.", explanationVi: "Bằng chứng nhìn thấy → going to." },
  ],
  vocabulary: [
    { word: "will", meaning: "future for decisions/offers/predictions (opinion)", meaningVi: "tương lai (quyết định/đề nghị/dự đoán theo ý kiến)", example: "I'll help you." },
    { word: "be going to", meaning: "planned future or evidence-based prediction", meaningVi: "kế hoạch hoặc dự đoán có bằng chứng", example: "I'm going to study tonight." },
    { word: "promise", meaning: "say you will do something", meaningVi: "hứa", example: "I promise I'll call." },
    { word: "plan", meaning: "what you decide to do in advance", meaningVi: "kế hoạch", example: "My plan is to learn 5 words a day." },
  ],
  quiz: [
    { question: "I think Vietnam ___ win the match.", options: ["will", "is going to", "going to", "wins"], answer: 0, explanation: "Opinion prediction → will." },
    { question: "She has bought paint. She ___ paint her room.", options: ["will", "is going to", "is", "be going to"], answer: 1, explanation: "Plan with evidence → going to." },
    { question: "A: I'm cold. B: I ___ close the window.", options: ["am going to", "will", "going", "do"], answer: 1, explanation: "Spontaneous → will." },
  ],
  parentInfo: "WILL vs GOING TO is a KET examiner favorite. The lesson gives a clear decision rule based on WHEN the decision was made and WHETHER there is evidence.",
  parentInfoVi: "WILL vs GOING TO là trọng tâm KET. Bài cho quy tắc rõ dựa trên KHI nào quyết định và có BẰNG CHỨNG không.",
});

const ketArticles = build({
  id: "cam-grammar-ket-articles",
  level: "ket", icon: "📰",
  title: "A / An / The / Zero Article: The Definite Choice",
  titleVi: "A / An / The / Không Mạo từ: Lựa chọn Xác định",
  description: "Pick A/AN for first mention, THE for shared/known things, and NO article for general/plural/uncountable ideas.",
  descriptionVi: "Chọn A/AN cho lần đầu, THE cho điều đã biết/chung, KHÔNG mạo từ cho ý chung/số nhiều/không đếm.",
  learningObjective: "Students will correctly choose between a, an, the, and zero article in context.",
  learningObjectiveVi: "Học sinh sẽ chọn đúng giữa a, an, the, và không mạo từ theo ngữ cảnh.",
  examPattern: "KET Reading Part 5 (cloze) routinely tests articles in every paragraph.",
  examPatternVi: "KET Đọc Phần 5 thường kiểm tra mạo từ trong mọi đoạn.",
  secretTip: "🔑 3-step test: 1) First mention? → a/an. 2) Both speakers know it? → the. 3) Plural/uncountable general meaning? → no article.",
  secretTipVi: "🔑 3 bước: 1) Lần đầu? → a/an. 2) Cả 2 biết? → the. 3) Nghĩa chung số nhiều/không đếm? → không mạo từ.",
  welcomeMessage: "📰 A cat. The cat. Cats. Three little words — one big choice!",
  welcomeMessageVi: "📰 A cat. The cat. Cats. Ba từ nhỏ — một lựa chọn lớn!",
  stepByStep: [
    { step: 1, title: "First mention?", titleVi: "Lần đầu nhắc?", detail: "Use a/an (depending on sound).", detailVi: "Dùng a/an (theo âm)." },
    { step: 2, title: "Already known?", titleVi: "Đã biết rồi?", detail: "Use the.", detailVi: "Dùng the." },
    { step: 3, title: "General meaning, plural/uncountable?", titleVi: "Nghĩa chung, số nhiều/không đếm?", detail: "Use no article.", detailVi: "Không mạo từ." },
  ],
  illustratedRules: [
    { icon: "🆕", rule: "A/AN: first time you mention something singular and countable", ruleVi: "A/AN: lần đầu cho danh từ đếm được số ít", example: "I saw a dog." },
    { icon: "🎯", rule: "THE: both speakers know which one (already mentioned, unique, or in context)", ruleVi: "THE: cả 2 đều biết (đã nhắc, duy nhất, hoặc theo ngữ cảnh)", example: "The dog was huge." },
    { icon: "🌍", rule: "Unique things: the sun, the moon, the Earth, the world", ruleVi: "Duy nhất: the sun, the moon, the Earth", example: "The sun is bright today." },
    { icon: "🚫", rule: "No article: general plural / uncountable (Dogs are loyal. Water is essential.)", ruleVi: "Không mạo từ: chung số nhiều/không đếm", example: "I love music. Cats are cute." },
    { icon: "🏛️", rule: "No article with most countries, cities, languages, meals: 'in Vietnam', 'speak English', 'have breakfast'", ruleVi: "Không mạo từ với hầu hết quốc gia, thành phố, ngôn ngữ, bữa ăn", example: "I live in Vietnam and speak English." },
  ],
  watchOut: [
    { mistake: "Using THE with general plural: 'The dogs are loyal'", mistakeVi: "Dùng THE với số nhiều chung: 'The dogs are loyal'", tip: "General statement → no article: 'Dogs are loyal'.", tipVi: "Câu chung → không mạo từ." },
    { mistake: "Using A/AN with uncountable: 'a water', 'an information'", mistakeVi: "Dùng A/AN với danh từ không đếm: 'a water'", tip: "Uncountables don't take a/an. Say 'water', 'some water', 'information'.", tipVi: "Danh từ không đếm không dùng a/an." },
  ],
  practiceSet: [
    { instruction: "Choose the article", instructionVi: "Chọn mạo từ", question: "I have ___ idea. ___ idea is interesting.", options: ["a / The", "an / The", "the / An", "an / A"], answer: 1, explanation: "First mention: 'an idea' (vowel). Second mention: 'The idea'.", explanationVi: "Lần đầu: 'an idea'. Lần 2: 'The idea'." },
    { instruction: "Choose the article", instructionVi: "Chọn mạo từ", question: "___ Sun is very bright today.", options: ["A", "An", "The", "—"], answer: 2, explanation: "Sun is unique → THE.", explanationVi: "Mặt trời duy nhất → THE." },
    { instruction: "General statement", instructionVi: "Câu chung", question: "___ children love ___ ice cream.", options: ["The / the", "— / —", "A / a", "— / the"], answer: 1, explanation: "General plural and uncountable → no articles.", explanationVi: "Số nhiều chung và không đếm chung → không mạo từ." },
  ],
  vocabulary: [
    { word: "a", meaning: "first mention, consonant sound, singular countable", meaningVi: "lần đầu, âm phụ âm, đếm được số ít", example: "I have a book." },
    { word: "an", meaning: "first mention, vowel sound", meaningVi: "lần đầu, âm nguyên âm", example: "I have an apple." },
    { word: "the", meaning: "already known / unique", meaningVi: "đã biết / duy nhất", example: "The book on the table is mine." },
    { word: "zero article", meaning: "no article", meaningVi: "không có mạo từ", example: "Cats are cute." },
  ],
  quiz: [
    { question: "I live in ___ small house. ___ house is white.", options: ["a / The", "the / The", "a / A", "an / The"], answer: 0, explanation: "First mention → a. Second → The." },
    { question: "___ Earth moves around ___ Sun.", options: ["— / —", "An / A", "The / The", "A / A"], answer: 2, explanation: "Unique objects → the." },
    { question: "I love ___ music.", options: ["the", "a", "an", "— (no article)"], answer: 3, explanation: "General uncountable → no article." },
  ],
  parentInfo: "Article choice is heavily tested in KET cloze tasks. This lesson gives a 3-step decision flow that resolves most cases — and lists the 'no article' rule for general meanings.",
  parentInfoVi: "Mạo từ được kiểm tra nhiều ở KET cloze. Bài cho quy trình 3 bước giải quyết phần lớn trường hợp.",
});

const ketCountable = build({
  id: "cam-grammar-ket-countable",
  level: "ket", icon: "🍞",
  title: "Countable vs Uncountable: Some, Any, Many, Much",
  titleVi: "Đếm được vs Không đếm được: Some, Any, Many, Much",
  description: "Use MANY with countable, MUCH with uncountable, SOME for positive, ANY for negative/question — KET shopping topics love this.",
  descriptionVi: "Dùng MANY với đếm được, MUCH với không đếm, SOME cho khẳng định, ANY cho phủ định/câu hỏi.",
  learningObjective: "Students will distinguish countable and uncountable nouns and use the correct quantifier.",
  learningObjectiveVi: "Học sinh sẽ phân biệt danh từ đếm được và không đếm được và dùng lượng từ đúng.",
  examPattern: "KET Reading Part 5 and Listening Part 3 (shopping/food topics) test these quantifiers constantly.",
  examPatternVi: "KET Đọc Phần 5 và Nghe Phần 3 (chủ đề mua sắm/thực phẩm) kiểm tra liên tục.",
  secretTip: "🔑 Can you count 1, 2, 3? YES → countable (use many, a few). NO (liquid/abstract) → uncountable (use much, a little).",
  secretTipVi: "🔑 Đếm được 1, 2, 3? CÓ → đếm được (many, a few). KHÔNG (lỏng/trừu tượng) → không đếm (much, a little).",
  welcomeMessage: "🍞 How many apples? How much bread? Master the difference!",
  welcomeMessageVi: "🍞 Bao nhiêu táo? Bao nhiêu bánh mì? Làm chủ sự khác biệt!",
  stepByStep: [
    { step: 1, title: "Decide countable or not", titleVi: "Quyết định đếm được hay không", detail: "Apples (count) / bread, water, money, information (no count).", detailVi: "Apples (đếm) / bread, water, money, information (không đếm)." },
    { step: 2, title: "Match the quantifier", titleVi: "Khớp lượng từ", detail: "Countable: many, a few, a lot of, some/any. Uncountable: much, a little, a lot of, some/any.", detailVi: "Đếm được: many, a few. Không đếm: much, a little. Cả hai: a lot of, some/any." },
    { step: 3, title: "Positive vs negative/question", titleVi: "Khẳng định vs phủ định/câu hỏi", detail: "Positive → some. Negative/question → any.", detailVi: "Khẳng định → some. Phủ định/câu hỏi → any." },
  ],
  illustratedRules: [
    { icon: "🍎", rule: "Countable plural: many apples, a few apples, three apples", ruleVi: "Đếm được số nhiều: many apples, a few apples", example: "I have many apples." },
    { icon: "💧", rule: "Uncountable: much water, a little water, some water", ruleVi: "Không đếm: much water, a little water", example: "Is there much water?" },
    { icon: "✅", rule: "Positive: SOME. 'I have some friends / some money.'", ruleVi: "Khẳng định: SOME", example: "I bought some bread." },
    { icon: "❓", rule: "Negative / Question: ANY. 'I don't have any. / Do you have any?'", ruleVi: "Phủ định / Câu hỏi: ANY", example: "Do you have any sugar?" },
    { icon: "🔄", rule: "Both: A LOT OF / LOTS OF (informal) works with both", ruleVi: "Cả hai: A LOT OF / LOTS OF", example: "He has lots of books and lots of time." },
  ],
  watchOut: [
    { mistake: "'much apples' / 'many money'", mistakeVi: "'much apples' / 'many money'", tip: "Many = countable (apples). Much = uncountable (money). Don't swap!", tipVi: "Many = đếm được. Much = không đếm. Không đổi chỗ!" },
    { mistake: "Using SOME in questions: 'Do you have some money?'", mistakeVi: "Dùng SOME trong câu hỏi", tip: "Use ANY in negatives and questions. Exception: offers ('Would you like some tea?').", tipVi: "Dùng ANY trong phủ định/câu hỏi. Ngoại lệ: lời mời ('Would you like some tea?')." },
  ],
  practiceSet: [
    { instruction: "Choose many or much", instructionVi: "Chọn many hay much", question: "There isn't ___ milk in the fridge.", options: ["many", "much", "a few", "lots"], answer: 1, explanation: "Milk = uncountable → much.", explanationVi: "Milk = không đếm → much." },
    { instruction: "Some or any?", instructionVi: "Some hay any?", question: "Do you have ___ questions?", options: ["some", "any", "a few", "much"], answer: 1, explanation: "Question → any.", explanationVi: "Câu hỏi → any." },
    { instruction: "Choose the quantifier", instructionVi: "Chọn lượng từ", question: "She bought ___ bread for breakfast.", options: ["many", "some", "a few", "an"], answer: 1, explanation: "Positive + uncountable → some.", explanationVi: "Khẳng định + không đếm → some." },
  ],
  vocabulary: [
    { word: "many", meaning: "a lot of (countable)", meaningVi: "nhiều (đếm được)", example: "many books" },
    { word: "much", meaning: "a lot of (uncountable)", meaningVi: "nhiều (không đếm)", example: "much water" },
    { word: "some", meaning: "an unspecified amount (positive)", meaningVi: "một ít (khẳng định)", example: "I have some sugar." },
    { word: "any", meaning: "an unspecified amount (neg/question)", meaningVi: "một ít (phủ định/câu hỏi)", example: "Do you have any sugar?" },
    { word: "a few", meaning: "a small number (countable)", meaningVi: "một vài (đếm được)", example: "a few friends" },
    { word: "a little", meaning: "a small amount (uncountable)", meaningVi: "một chút (không đếm)", example: "a little time" },
  ],
  quiz: [
    { question: "How ___ sugar do you take?", options: ["many", "much", "a few", "any"], answer: 1, explanation: "Sugar = uncountable → much." },
    { question: "I haven't got ___ friends in this city.", options: ["some", "any", "much", "a little"], answer: 1, explanation: "Negative → any." },
    { question: "There are ___ apples in the bowl.", options: ["much", "a little", "a few", "any"], answer: 2, explanation: "Apples = countable → a few." },
  ],
  parentInfo: "Countable/uncountable nouns drive KET shopping and food tasks. The lesson maps each quantifier to the correct noun type plus polarity (positive/negative/question).",
  parentInfoVi: "Danh từ đếm được/không đếm là trung tâm bài mua sắm/thực phẩm KET. Bài khớp lượng từ với loại danh từ và tính khẳng định/phủ định.",
});

const ketShould = build({
  id: "cam-grammar-ket-should",
  level: "ket", icon: "🤔",
  title: "Should / Shouldn't: Friendly Advice",
  titleVi: "Should / Shouldn't: Lời khuyên Thân thiện",
  description: "Use SHOULD + base verb to give advice. KET examiners love advice in emails and notes — 'You should…'.",
  descriptionVi: "Dùng SHOULD + V nguyên thể để khuyên. KET Writing rất thích lời khuyên — 'You should…'.",
  learningObjective: "Students will use should/shouldn't to give and ask for advice with the base verb.",
  learningObjectiveVi: "Học sinh sẽ dùng should/shouldn't để đưa và xin lời khuyên với V nguyên thể.",
  examPattern: "KET Writing Part 7 (notes/emails) often asks: 'Give your friend advice…'.",
  examPatternVi: "KET Viết Phần 7 (ghi chú/email) thường yêu cầu: 'Cho bạn lời khuyên…'.",
  secretTip: "🔑 Should = advice (not a strong rule). Like 'must' in form (no -s, no to) but softer in meaning.",
  secretTipVi: "🔑 Should = lời khuyên (không phải quy định mạnh). Cấu trúc như 'must' (không -s, không to) nhưng nhẹ hơn.",
  welcomeMessage: "🤔 What SHOULD you do? Ask a friend for advice and give yours!",
  welcomeMessageVi: "🤔 Bạn NÊN làm gì? Hỏi bạn xin lời khuyên và tự đưa lời khuyên!",
  stepByStep: [
    { step: 1, title: "Subject + should + base verb", titleVi: "CN + should + V", detail: "You should rest. She should study.", detailVi: "You should rest. She should study." },
    { step: 2, title: "Negative: shouldn't", titleVi: "Phủ định: shouldn't", detail: "You shouldn't worry. He shouldn't smoke.", detailVi: "You shouldn't worry. He shouldn't smoke." },
    { step: 3, title: "Question: Should + subject + verb?", titleVi: "Câu hỏi: Should + CN + V?", detail: "What should I do? Should we go now?", detailVi: "What should I do? Should we go now?" },
  ],
  illustratedRules: [
    { icon: "💬", rule: "Advice: You should drink more water.", ruleVi: "Lời khuyên: You should drink more water.", example: "If you're tired, you should sleep early." },
    { icon: "🚷", rule: "Advice not to do: You shouldn't eat too much sugar.", ruleVi: "Khuyên không làm: You shouldn't eat too much sugar.", example: "You shouldn't stay up too late." },
    { icon: "❓", rule: "Asking for advice: What should I do?", ruleVi: "Xin lời khuyên: What should I do?", example: "Should I take an umbrella?" },
    { icon: "🛑", rule: "No -s, no 'to', no -ing after should", ruleVi: "Sau should không -s, không 'to', không -ing", example: "He should STUDY. (NOT 'studies', 'to study')" },
  ],
  watchOut: [
    { mistake: "Adding -s: 'She shoulds study'", mistakeVi: "Thêm -s: 'She shoulds study'", tip: "Modal verbs never take -s.", tipVi: "Động từ khuyết thiếu không thêm -s." },
    { mistake: "Confusing 'should' with 'must'", mistakeVi: "Nhầm 'should' với 'must'", tip: "SHOULD = advice (soft). MUST = rule (strong).", tipVi: "SHOULD = lời khuyên. MUST = quy định." },
  ],
  practiceSet: [
    { instruction: "Give advice", instructionVi: "Cho lời khuyên", question: "I have a headache. — You ___ rest.", options: ["should", "shoulds", "should to", "must"], answer: 0, explanation: "Soft advice → should + base verb.", explanationVi: "Lời khuyên nhẹ → should + V." },
    { instruction: "Negative advice", instructionVi: "Lời khuyên phủ định", question: "You ___ talk loudly in the library.", options: ["should", "shouldn't", "must", "don't should"], answer: 1, explanation: "Advice not to → shouldn't.", explanationVi: "Khuyên không nên → shouldn't." },
    { instruction: "Ask for advice", instructionVi: "Xin lời khuyên", question: "What ___ I do?", options: ["should", "shoulds", "do should", "is should"], answer: 0, explanation: "Should I + base verb.", explanationVi: "Should I + V." },
  ],
  vocabulary: [
    { word: "should", meaning: "advice — a good idea", meaningVi: "nên (lời khuyên)", example: "You should call her." },
    { word: "shouldn't", meaning: "advice not to do", meaningVi: "không nên", example: "You shouldn't eat that." },
    { word: "advice", meaning: "an idea about what to do", meaningVi: "lời khuyên", example: "Thanks for your advice." },
    { word: "rest", meaning: "stop and relax", meaningVi: "nghỉ ngơi", example: "You should rest." },
  ],
  quiz: [
    { question: "If you're cold, you ___ wear a jacket.", options: ["should", "shoulds", "should to", "must"], answer: 0, explanation: "Advice → should." },
    { question: "He ___ work so hard. He needs to relax.", options: ["should", "shouldn't", "must", "should to"], answer: 1, explanation: "Advice against → shouldn't." },
    { question: "Which is correct?", options: ["She shoulds study.", "She should studies.", "She should study.", "She should to study."], answer: 2, explanation: "Modal + bare verb." },
  ],
  parentInfo: "Should/shouldn't is essential for KET Writing Part 7 (giving advice). The lesson cements the modal pattern and contrasts with stronger 'must'.",
  parentInfoVi: "Should/shouldn't quan trọng cho KET Viết Phần 7. Bài luyện cấu trúc modal và so sánh với 'must' mạnh hơn.",
});

// =====================================================================
// PET — 5 grammar lessons
// =====================================================================

const petPresentPerfectVsPast = build({
  id: "cam-grammar-pet-pp-vs-past",
  level: "pet", icon: "⏳",
  title: "Present Perfect vs Past Simple: The Time Frame Test",
  titleVi: "Hiện tại Hoàn thành vs Quá khứ Đơn: Bài kiểm tra Khung Thời gian",
  description: "Use present perfect for FINISHED but RELEVANT, past simple for FINISHED with SPECIFIC time — the PET examiner's #1 trap.",
  descriptionVi: "Hiện tại hoàn thành = HOÀN TẤT nhưng CÒN LIÊN QUAN, quá khứ đơn = HOÀN TẤT với THỜI GIAN CỤ THỂ — bẫy số 1 ở PET.",
  learningObjective: "Students will choose between present perfect and past simple based on time markers and context.",
  learningObjectiveVi: "Học sinh sẽ chọn giữa hiện tại hoàn thành và quá khứ đơn dựa trên dấu hiệu thời gian và ngữ cảnh.",
  examPattern: "PET Reading Part 6 (open cloze), Writing Part 2 (email): mixing these two tenses is one of the most common mistakes.",
  examPatternVi: "PET Đọc Phần 6 (cloze), Viết Phần 2 (email): trộn hai thì là lỗi phổ biến nhất.",
  secretTip: "🔑 If you can answer 'WHEN?' with a specific time (yesterday, in 2019, last week, ago) → past simple. Otherwise → present perfect.",
  secretTipVi: "🔑 Trả lời 'KHI NÀO?' bằng thời gian cụ thể được → quá khứ đơn. Không → hiện tại hoàn thành.",
  welcomeMessage: "⏳ Two tenses, one decision. Master the time-frame test!",
  welcomeMessageVi: "⏳ Hai thì, một quyết định. Làm chủ bài kiểm tra khung thời gian!",
  stepByStep: [
    { step: 1, title: "Find the time clue", titleVi: "Tìm dấu hiệu thời gian", detail: "yesterday, last week, in 2019, ago → past simple. Ever, never, just, already, yet, since, for → present perfect.", detailVi: "yesterday, last week → quá khứ đơn. Ever, never, just → hiện tại hoàn thành." },
    { step: 2, title: "If no clue, ask: still relevant?", titleVi: "Không có dấu hiệu, hỏi: còn liên quan?", detail: "Result matters now → present perfect. Just a past fact → past simple.", detailVi: "Kết quả còn quan trọng → hiện tại hoàn thành. Chỉ là sự thật quá khứ → quá khứ đơn." },
    { step: 3, title: "Apply the form", titleVi: "Áp dụng dạng", detail: "Past simple: V2. Present perfect: have/has + V3.", detailVi: "Quá khứ đơn: V2. Hiện tại hoàn thành: have/has + V3." },
  ],
  illustratedRules: [
    { icon: "🕐", rule: "Past simple: finished action + specific time", ruleVi: "Quá khứ đơn: hành động xong + thời gian cụ thể", example: "I saw her yesterday. We moved in 2020." },
    { icon: "🌀", rule: "Present perfect: connection to NOW (experience, recent, ongoing period)", ruleVi: "Hiện tại hoàn thành: liên quan đến BÂY GIỜ", example: "I've seen that film twice. She's lived here for 5 years." },
    { icon: "📌", rule: "Same situation, different focus: I've lost my keys (still missing) vs I lost my keys yesterday (just a fact)", ruleVi: "Cùng tình huống, khác trọng tâm", example: "I've lost my keys! (need them now) — I lost my keys yesterday (story)." },
    { icon: "🚫", rule: "Don't mix: 'I have seen him yesterday' ❌. Use 'I saw him yesterday'.", ruleVi: "Không trộn: 'I have seen him yesterday' ❌", example: "Specific past time = past simple." },
  ],
  watchOut: [
    { mistake: "'I have visited Paris in 2020.'", mistakeVi: "'I have visited Paris in 2020.'", tip: "'in 2020' = specific past → 'I VISITED Paris in 2020.'", tipVi: "'in 2020' = quá khứ cụ thể → past simple." },
    { mistake: "'I lived here for 5 years' (when you still live here)", mistakeVi: "'I lived here for 5 years' (khi bạn vẫn còn ở)", tip: "Still happening → present perfect: 'I HAVE LIVED here for 5 years.'", tipVi: "Vẫn xảy ra → hiện tại hoàn thành." },
  ],
  practiceSet: [
    { instruction: "Pick the correct tense", instructionVi: "Chọn thì đúng", question: "I ___ (see) that film last weekend.", options: ["have seen", "saw", "have seen never", "had seen"], answer: 1, explanation: "'last weekend' = specific past → saw.", explanationVi: "'last weekend' = quá khứ cụ thể → saw." },
    { instruction: "Pick the correct tense", instructionVi: "Chọn thì đúng", question: "She ___ (work) here since 2018.", options: ["worked", "has worked", "works", "is working"], answer: 1, explanation: "'since 2018' (still working) → present perfect.", explanationVi: "'since 2018' → hiện tại hoàn thành." },
    { instruction: "Spot the natural one", instructionVi: "Chọn câu tự nhiên", question: "I can't find my phone! I ___ it.", options: ["lost", "have lost", "had lost", "lose"], answer: 1, explanation: "Result matters now → 'have lost'.", explanationVi: "Kết quả còn liên quan → have lost." },
  ],
  vocabulary: [
    { word: "since", meaning: "from a point in time until now", meaningVi: "từ khi (mốc thời gian)", example: "since 2010" },
    { word: "for", meaning: "for a period of time", meaningVi: "trong (khoảng thời gian)", example: "for 5 years" },
    { word: "ago", meaning: "in the past, before now", meaningVi: "trước đây", example: "two years ago" },
    { word: "yet", meaning: "up to now (questions/negatives)", meaningVi: "chưa", example: "Have you eaten yet?" },
    { word: "already", meaning: "before now (often early)", meaningVi: "đã rồi", example: "She's already left." },
  ],
  quiz: [
    { question: "He ___ (live) in London since 2015.", options: ["lives", "lived", "has lived", "is living"], answer: 2, explanation: "since 2015 + still there → present perfect." },
    { question: "We ___ (visit) Da Nang two years ago.", options: ["visit", "have visited", "visited", "are visiting"], answer: 2, explanation: "'two years ago' → past simple." },
    { question: "Which is correct?", options: ["I have seen her yesterday.", "I saw her yesterday.", "I saw her since yesterday.", "I have seen her since yesterday."], answer: 1, explanation: "Yesterday = specific past → saw." },
  ],
  parentInfo: "Distinguishing these two tenses is a PET-defining grammar skill. The lesson gives a clear time-clue checklist plus the 'still relevant?' question.",
  parentInfoVi: "Phân biệt hai thì này là kỹ năng then chốt ở PET. Bài cho danh sách dấu hiệu thời gian rõ ràng.",
});

const petReportedSpeech = build({
  id: "cam-grammar-pet-reported-speech",
  level: "pet", icon: "💬",
  title: "Reported Speech: Backshift Made Simple",
  titleVi: "Câu Tường thuật: Lùi Thì Đơn giản",
  description: "Backshift one step into the past (present → past, past → past perfect) and switch pronouns + time/place references.",
  descriptionVi: "Lùi thì một bậc về quá khứ và đổi đại từ + tham chiếu thời gian/địa điểm.",
  learningObjective: "Students will convert direct speech into reported speech with correct tense backshift and pronoun changes.",
  learningObjectiveVi: "Học sinh sẽ chuyển câu trực tiếp sang gián tiếp với lùi thì và đổi đại từ đúng.",
  examPattern: "PET Reading Part 6 and Writing Part 3 (story): reported speech connectors appear regularly.",
  examPatternVi: "PET Đọc Phần 6 và Viết Phần 3: liên từ tường thuật xuất hiện thường xuyên.",
  secretTip: "🔑 Reporting verb in PAST (said, told) → push every tense ONE STEP BACK. Present → past, past → past perfect, will → would, can → could.",
  secretTipVi: "🔑 Động từ tường thuật ở QUÁ KHỨ → lùi mọi thì MỘT BẬC. Hiện tại → quá khứ, quá khứ → quá khứ hoàn thành, will → would.",
  welcomeMessage: "💬 What did they say? Let's report it like a journalist!",
  welcomeMessageVi: "💬 Họ đã nói gì? Cùng tường thuật như nhà báo!",
  stepByStep: [
    { step: 1, title: "Choose said / told", titleVi: "Chọn said / told", detail: "TOLD needs a person object: 'told me'. SAID does not: 'said that…'.", detailVi: "TOLD cần tân ngữ chỉ người: 'told me'. SAID không cần: 'said that…'." },
    { step: 2, title: "Backshift the tense", titleVi: "Lùi thì", detail: "am/is/are→was/were · do/does→did · have/has→had · will→would · can→could.", detailVi: "am/is/are→was/were · do/does→did · have/has→had · will→would · can→could." },
    { step: 3, title: "Switch pronouns + time words", titleVi: "Đổi đại từ + từ chỉ thời gian", detail: "I→he/she · my→his/her · now→then · today→that day · tomorrow→the next day · yesterday→the day before.", detailVi: "I→he/she · my→his/her · now→then · today→that day · tomorrow→the next day · yesterday→the day before." },
  ],
  illustratedRules: [
    { icon: "🎙️", rule: "Direct: She said, 'I am happy.' → Reported: She said (that) she WAS happy.", ruleVi: "Trực tiếp → Gián tiếp: lùi 1 bậc", example: "He said, 'I work here.' → He said he worked there." },
    { icon: "📅", rule: "now→then · today→that day · tomorrow→the next/following day · yesterday→the day before", ruleVi: "Đổi từ chỉ thời gian", example: "'I'll call you tomorrow' → He said he would call me the next day." },
    { icon: "🧑", rule: "Pronouns: I→he/she, my→his/her, we→they, our→their", ruleVi: "Đổi đại từ", example: "'I love my dog' → She said she loved her dog." },
    { icon: "📍", rule: "this→that · here→there · these→those", ruleVi: "Đổi chỉ trỏ/địa điểm", example: "'I like this place' → She said she liked that place." },
  ],
  watchOut: [
    { mistake: "Forgetting to backshift: 'He said he IS tired.'", mistakeVi: "Quên lùi thì: 'He said he IS tired.'", tip: "Reporting verb past → main verb past: 'He said he WAS tired.'", tipVi: "Động từ tường thuật quá khứ → động từ chính quá khứ." },
    { mistake: "Using SAID with a person: 'He said me…'", mistakeVi: "Dùng SAID với người: 'He said me…'", tip: "SAID is alone or with 'to me'. With a person object → TOLD ME.", tipVi: "SAID đứng một mình hoặc 'to me'. Với tân ngữ chỉ người → TOLD ME." },
  ],
  practiceSet: [
    { instruction: "Report the sentence", instructionVi: "Tường thuật câu", question: "She said, 'I am tired.' → She said (that) she ___ tired.", options: ["is", "was", "were", "has been"], answer: 1, explanation: "Present → past: am → was.", explanationVi: "Hiện tại → quá khứ: am → was." },
    { instruction: "Report the sentence", instructionVi: "Tường thuật câu", question: "He said, 'I will call you tomorrow.' → He said he ___ me ___ .", options: ["will call / tomorrow", "would call / the next day", "called / tomorrow", "had called / tomorrow"], answer: 1, explanation: "will → would, tomorrow → the next day.", explanationVi: "will → would, tomorrow → the next day." },
    { instruction: "Said or told?", instructionVi: "Said hay told?", question: "He ___ me he was sorry.", options: ["said", "told", "say", "tell"], answer: 1, explanation: "With person object → told.", explanationVi: "Có tân ngữ chỉ người → told." },
  ],
  vocabulary: [
    { word: "said", meaning: "past of say (no person object)", meaningVi: "đã nói (không cần tân ngữ chỉ người)", example: "She said that…" },
    { word: "told", meaning: "past of tell (needs person object)", meaningVi: "đã nói với (cần tân ngữ chỉ người)", example: "She told me that…" },
    { word: "asked", meaning: "to put a question / request", meaningVi: "đã hỏi / yêu cầu", example: "He asked me where I lived." },
    { word: "explained", meaning: "to make clear", meaningVi: "đã giải thích", example: "She explained that she was late." },
  ],
  quiz: [
    { question: "'I can swim,' she said. → She said she ___ swim.", options: ["can", "could", "would", "is able"], answer: 1, explanation: "can → could." },
    { question: "'I saw him yesterday,' he said. → He said he ___ him ___.", options: ["saw / yesterday", "had seen / the day before", "sees / yesterday", "had seen / yesterday"], answer: 1, explanation: "Past → past perfect; yesterday → the day before." },
    { question: "Which sentence is correct?", options: ["He said me he was happy.", "He told he was happy.", "He told me he was happy.", "He said to he was happy."], answer: 2, explanation: "told + person object." },
  ],
  parentInfo: "Reported speech tests both grammar and listening comprehension. The lesson teaches a 3-step transformation: verb choice → tense backshift → pronoun/time switch.",
  parentInfoVi: "Câu tường thuật kiểm tra cả ngữ pháp và nghe hiểu. Bài dạy 3 bước biến đổi.",
});

const petConditionals = build({
  id: "cam-grammar-pet-conditionals",
  level: "pet", icon: "🔀",
  title: "Zero & First Conditional: If This, Then That",
  titleVi: "Câu Điều kiện Loại 0 & 1: Nếu Có Thế, Thì Sẽ Thế",
  description: "Zero (facts): If + present, present. First (real future): If + present, will + verb. Two patterns that cover 80% of PET cases.",
  descriptionVi: "Loại 0 (sự thật): If + hiện tại, hiện tại. Loại 1 (tương lai thực): If + hiện tại, will + V.",
  learningObjective: "Students will form zero and first conditional sentences correctly.",
  learningObjectiveVi: "Học sinh sẽ tạo câu điều kiện loại 0 và 1 đúng.",
  examPattern: "PET Reading Part 6, Listening Part 4, and Writing Part 2 frequently test these conditionals.",
  examPatternVi: "PET Đọc Phần 6, Nghe Phần 4, Viết Phần 2 kiểm tra thường xuyên.",
  secretTip: "🔑 Never use WILL after IF in zero/first conditional. The IF clause stays in the PRESENT. 'If it rains, I'll stay home.' (NOT 'If it will rain…')",
  secretTipVi: "🔑 KHÔNG dùng WILL sau IF ở loại 0/1. Mệnh đề IF ở HIỆN TẠI. 'If it rains, I'll stay home.' (KHÔNG 'If it will rain…')",
  welcomeMessage: "🔀 IF you study, you WILL pass! Let's predict the future!",
  welcomeMessageVi: "🔀 NẾU bạn học, bạn SẼ đỗ! Cùng dự đoán tương lai!",
  stepByStep: [
    { step: 1, title: "Decide: fact or future?", titleVi: "Quyết định: sự thật hay tương lai?", detail: "Always true (science/habit) → zero. Real possible future → first.", detailVi: "Luôn đúng (khoa học/thói quen) → loại 0. Tương lai có thể xảy ra → loại 1." },
    { step: 2, title: "Build zero: If + present, present", titleVi: "Dựng loại 0: If + hiện tại, hiện tại", detail: "If you heat water to 100°C, it boils.", detailVi: "If you heat water to 100°C, it boils." },
    { step: 3, title: "Build first: If + present, will + V", titleVi: "Dựng loại 1: If + hiện tại, will + V", detail: "If it rains tomorrow, I'll stay home.", detailVi: "If it rains tomorrow, I'll stay home." },
  ],
  illustratedRules: [
    { icon: "🔬", rule: "Zero conditional: scientific facts / general truths / habits", ruleVi: "Loại 0: sự thật khoa học / chân lý / thói quen", example: "If you mix blue and yellow, you get green." },
    { icon: "🔮", rule: "First conditional: real future possibility", ruleVi: "Loại 1: tương lai có thể xảy ra", example: "If I study hard, I'll pass the exam." },
    { icon: "🔁", rule: "You can swap the clauses (no comma needed if 'if' is second)", ruleVi: "Có thể đổi mệnh đề (không cần phẩy nếu 'if' đứng sau)", example: "I'll call you if I'm late." },
    { icon: "🛑", rule: "Never WILL inside the IF clause (zero/first)", ruleVi: "KHÔNG WILL trong mệnh đề IF (0/1)", example: "If it rains (NOT 'If it will rain'), I'll stay home." },
  ],
  watchOut: [
    { mistake: "'If it will rain, I will stay home.'", mistakeVi: "'If it will rain, I will stay home.'", tip: "After IF use present simple: 'If it RAINS, I will stay home.'", tipVi: "Sau IF dùng hiện tại đơn: 'If it RAINS, I will stay home.'" },
    { mistake: "Using comma when 'if' is in the middle: 'I'll call you, if I'm late.'", mistakeVi: "Dùng phẩy khi 'if' ở giữa", tip: "No comma when 'if' clause is second.", tipVi: "Không phẩy khi mệnh đề 'if' đứng sau." },
  ],
  practiceSet: [
    { instruction: "Complete the conditional", instructionVi: "Hoàn thành câu điều kiện", question: "If you ___ (heat) ice, it ___ (melt).", options: ["heat / melts", "will heat / melts", "heat / will melt", "heated / melted"], answer: 0, explanation: "Scientific fact → zero conditional: present + present.", explanationVi: "Sự thật khoa học → loại 0: hiện tại + hiện tại." },
    { instruction: "Complete the conditional", instructionVi: "Hoàn thành câu điều kiện", question: "If it ___ (rain) tomorrow, we ___ (cancel) the picnic.", options: ["rains / will cancel", "will rain / cancel", "rains / cancel", "rain / will cancel"], answer: 0, explanation: "Real future → first: if + present, will + V.", explanationVi: "Tương lai thực → loại 1." },
    { instruction: "Spot the error", instructionVi: "Tìm lỗi", question: "Which is correct?", options: ["If you will study, you pass.", "If you study, you will pass.", "If you studied, you will pass.", "If you study, you passed."], answer: 1, explanation: "First conditional pattern.", explanationVi: "Loại 1." },
  ],
  vocabulary: [
    { word: "if", meaning: "introduces a condition", meaningVi: "nếu (giới thiệu điều kiện)", example: "If it rains, …" },
    { word: "unless", meaning: "if not", meaningVi: "trừ khi", example: "Unless you study, you won't pass." },
    { word: "as soon as", meaning: "immediately when", meaningVi: "ngay khi", example: "I'll call you as soon as I arrive." },
    { word: "in case", meaning: "because something might happen", meaningVi: "phòng khi", example: "Take an umbrella in case it rains." },
  ],
  quiz: [
    { question: "Water ___ (boil) at 100°C if you ___ (heat) it.", options: ["boils / heat", "will boil / heat", "boils / will heat", "boil / will heat"], answer: 0, explanation: "Zero: present + present." },
    { question: "If I ___ time tonight, I ___ help you.", options: ["have / will", "will have / will", "have / —", "had / would"], answer: 0, explanation: "First: present + will." },
    { question: "Which is correct?", options: ["If she will come, I'll go.", "If she comes, I'll go.", "If she comes, I go.", "If she came, I'll go."], answer: 1, explanation: "First conditional." },
  ],
  parentInfo: "Zero and first conditionals are the two most-used 'if' patterns at PET. The lesson cements the rule 'no WILL after IF' to prevent the most common error.",
  parentInfoVi: "Loại 0 và 1 là hai mẫu 'if' dùng nhiều nhất ở PET. Bài luyện quy tắc 'không WILL sau IF'.",
});

const petPassive = build({
  id: "cam-grammar-pet-passive",
  level: "pet", icon: "🔁",
  title: "Passive Voice: Be + Past Participle for the Spotlight",
  titleVi: "Bị động: Be + V3 để Nhấn mạnh",
  description: "Turn the object into the subject using BE + V3 (English IS spoken here). Use it when the doer is unknown or unimportant.",
  descriptionVi: "Biến tân ngữ thành chủ ngữ bằng BE + V3 (English IS spoken here). Dùng khi không biết hoặc không quan trọng người làm.",
  learningObjective: "Students will form and use the passive voice in present and past tenses.",
  learningObjectiveVi: "Học sinh sẽ tạo và dùng câu bị động ở hiện tại và quá khứ.",
  examPattern: "PET Reading Part 6 (cloze), Listening Part 4, and Writing Part 3 (descriptions / processes).",
  examPatternVi: "PET Đọc Phần 6 (cloze), Nghe Phần 4, Viết Phần 3 (mô tả/quy trình).",
  secretTip: "🔑 Active: Subject + verb + object. Passive: OBJECT + BE + V3 (+ by + doer). Match the BE tense to the original verb tense.",
  secretTipVi: "🔑 Chủ động: CN + V + tân ngữ. Bị động: TÂN NGỮ + BE + V3 (+ by + người làm). Chia BE theo thì của V gốc.",
  welcomeMessage: "🔁 Same story, different focus! Let's switch the spotlight!",
  welcomeMessageVi: "🔁 Cùng câu chuyện, khác trọng tâm! Cùng đổi đèn sân khấu!",
  stepByStep: [
    { step: 1, title: "Find the object", titleVi: "Tìm tân ngữ", detail: "Active: 'They build houses.' → object = houses.", detailVi: "Chủ động: 'They build houses.' → tân ngữ = houses." },
    { step: 2, title: "Move object to subject + add BE in the right tense", titleVi: "Đưa tân ngữ lên chủ ngữ + thêm BE đúng thì", detail: "Present: are. Past: were. Present perfect: have/has been. Future: will be.", detailVi: "Hiện tại: are. Quá khứ: were. Hoàn thành: have/has been. Tương lai: will be." },
    { step: 3, title: "Add V3 (past participle)", titleVi: "Thêm V3", detail: "build → built. Houses are built.", detailVi: "build → built. Houses are built." },
  ],
  illustratedRules: [
    { icon: "🔁", rule: "Active → Passive: Subject and object swap; verb becomes BE + V3", ruleVi: "Chủ động → Bị động: CN và tân ngữ đổi chỗ; V → BE + V3", example: "They make iPhones in China → iPhones are made in China." },
    { icon: "⏱️", rule: "Match the tense via BE", ruleVi: "Khớp thì qua BE", example: "Present: are made · Past: were made · Perfect: have been made · Future: will be made" },
    { icon: "🤷", rule: "Use passive when the doer is unknown / unimportant / obvious", ruleVi: "Dùng khi không biết / không quan trọng / hiển nhiên người làm", example: "My bike was stolen. (we don't know who)" },
    { icon: "👤", rule: "Add 'by + doer' only if it's important", ruleVi: "Thêm 'by + người làm' khi cần thiết", example: "Hamlet was written by Shakespeare." },
  ],
  watchOut: [
    { mistake: "Forgetting BE: 'My bike stolen.'", mistakeVi: "Quên BE: 'My bike stolen.'", tip: "Always include BE: 'My bike WAS stolen.'", tipVi: "Luôn có BE: 'My bike WAS stolen.'" },
    { mistake: "Using V2 instead of V3: 'It was wrote'", mistakeVi: "Dùng V2 thay V3: 'It was wrote'", tip: "Use the past PARTICIPLE: 'It was WRITTEN.'", tipVi: "Dùng quá khứ phân từ: 'It was WRITTEN.'" },
  ],
  practiceSet: [
    { instruction: "Make it passive", instructionVi: "Đổi sang bị động", question: "They build houses. → Houses ___ (build).", options: ["build", "are built", "is build", "were build"], answer: 1, explanation: "Present passive → are + built.", explanationVi: "Hiện tại bị động → are + built." },
    { instruction: "Make it passive (past)", instructionVi: "Bị động quá khứ", question: "Shakespeare wrote Hamlet. → Hamlet ___ (write) by Shakespeare.", options: ["was wrote", "was written", "is written", "wrote"], answer: 1, explanation: "Past passive → was + written.", explanationVi: "Quá khứ bị động → was + written." },
    { instruction: "Pick the doer-less passive", instructionVi: "Chọn bị động không nhắc người làm", question: "Someone stole my bike. → My bike ___ .", options: ["stole", "was stolen", "is stealing", "is stole"], answer: 1, explanation: "We don't know who → passive past: was stolen.", explanationVi: "Không biết ai → bị động quá khứ: was stolen." },
  ],
  vocabulary: [
    { word: "built", meaning: "past participle of build", meaningVi: "V3 của build", example: "The bridge was built in 1995." },
    { word: "written", meaning: "past participle of write", meaningVi: "V3 của write", example: "Hamlet was written by Shakespeare." },
    { word: "made", meaning: "past participle of make", meaningVi: "V3 của make", example: "These shoes are made in Italy." },
    { word: "stolen", meaning: "past participle of steal", meaningVi: "V3 của steal", example: "My phone was stolen." },
  ],
  quiz: [
    { question: "English ___ (speak) in many countries.", options: ["speaks", "is spoken", "is speaking", "spoke"], answer: 1, explanation: "Present passive → is spoken." },
    { question: "The cake ___ (eat) by the children.", options: ["was eaten", "ate", "was ate", "eats"], answer: 0, explanation: "Past passive → was eaten." },
    { question: "Which is correct?", options: ["My car was steal.", "My car stole.", "My car was stolen.", "My car was stealed."], answer: 2, explanation: "BE + past participle." },
  ],
  parentInfo: "Passive voice is heavily tested in PET reading and writing. The lesson covers tense matching via BE and the choice to omit or include 'by + doer'.",
  parentInfoVi: "Bị động được kiểm tra nhiều ở PET. Bài luyện khớp thì qua BE và việc có/không thêm 'by + người làm'.",
});

const petRelative = build({
  id: "cam-grammar-pet-relative",
  level: "pet", icon: "🔗",
  title: "Relative Clauses: Who / Which / That / Where",
  titleVi: "Mệnh đề Quan hệ: Who / Which / That / Where",
  description: "Combine two sentences into one with relative pronouns. WHO for people, WHICH/THAT for things, WHERE for places.",
  descriptionVi: "Nối hai câu thành một với đại từ quan hệ. WHO cho người, WHICH/THAT cho vật, WHERE cho địa điểm.",
  learningObjective: "Students will join two sentences using the correct relative pronoun.",
  learningObjectiveVi: "Học sinh sẽ nối hai câu bằng đại từ quan hệ đúng.",
  examPattern: "PET Reading Part 6, Listening Part 3, Writing Part 3: defining relative clauses appear in nearly every long sentence.",
  examPatternVi: "PET Đọc Phần 6, Nghe Phần 3, Viết Phần 3: mệnh đề quan hệ xác định xuất hiện ở hầu hết câu dài.",
  secretTip: "🔑 People → WHO (or THAT). Things/animals → WHICH (or THAT). Places → WHERE. Time → WHEN. Possession → WHOSE.",
  secretTipVi: "🔑 Người → WHO. Vật/thú → WHICH (hoặc THAT). Địa điểm → WHERE. Thời gian → WHEN. Sở hữu → WHOSE.",
  welcomeMessage: "🔗 Tired of short sentences? Link them like a pro!",
  welcomeMessageVi: "🔗 Chán câu ngắn? Cùng nối câu chuyên nghiệp!",
  stepByStep: [
    { step: 1, title: "Find the repeated noun", titleVi: "Tìm danh từ lặp lại", detail: "The boy is Tom. The boy is my friend → 'The boy' repeats.", detailVi: "The boy is Tom. The boy is my friend → 'The boy' lặp." },
    { step: 2, title: "Replace with relative pronoun", titleVi: "Thay bằng đại từ quan hệ", detail: "Person → who/that. Thing → which/that. Place → where.", detailVi: "Người → who/that. Vật → which/that. Địa điểm → where." },
    { step: 3, title: "Join the two clauses", titleVi: "Nối 2 mệnh đề", detail: "The boy who is my friend is Tom.", detailVi: "The boy who is my friend is Tom." },
  ],
  illustratedRules: [
    { icon: "🧑", rule: "WHO / THAT for people: The teacher who/that helped me.", ruleVi: "WHO / THAT cho người", example: "The doctor who saved me is famous." },
    { icon: "📱", rule: "WHICH / THAT for things & animals", ruleVi: "WHICH / THAT cho vật & con vật", example: "The phone which/that I bought is broken." },
    { icon: "📍", rule: "WHERE for places", ruleVi: "WHERE cho địa điểm", example: "This is the café where we first met." },
    { icon: "🕐", rule: "WHEN for time", ruleVi: "WHEN cho thời gian", example: "I remember the day when we moved in." },
    { icon: "👜", rule: "WHOSE for possession", ruleVi: "WHOSE cho sở hữu", example: "She's the girl whose father is a pilot." },
  ],
  watchOut: [
    { mistake: "Using 'which' for people: 'The girl which sings'", mistakeVi: "Dùng 'which' cho người", tip: "People → WHO (or THAT). 'The girl WHO sings'.", tipVi: "Người → WHO (hoặc THAT)." },
    { mistake: "Doubling the subject: 'The boy who he is my friend'", mistakeVi: "Lặp chủ ngữ: 'The boy who he is my friend'", tip: "After the relative pronoun, DON'T repeat the subject. 'The boy who is my friend'.", tipVi: "Sau đại từ quan hệ, KHÔNG lặp chủ ngữ." },
  ],
  practiceSet: [
    { instruction: "Choose the relative pronoun", instructionVi: "Chọn đại từ quan hệ", question: "I have a friend ___ lives in Paris.", options: ["which", "who", "where", "whose"], answer: 1, explanation: "Person → who.", explanationVi: "Người → who." },
    { instruction: "Choose the relative pronoun", instructionVi: "Chọn đại từ quan hệ", question: "This is the book ___ I borrowed.", options: ["who", "which", "where", "when"], answer: 1, explanation: "Thing → which (or that).", explanationVi: "Vật → which (hoặc that)." },
    { instruction: "Choose the relative pronoun", instructionVi: "Chọn đại từ quan hệ", question: "Da Nang is the city ___ I was born.", options: ["which", "who", "where", "when"], answer: 2, explanation: "Place → where.", explanationVi: "Địa điểm → where." },
  ],
  vocabulary: [
    { word: "who", meaning: "for people (subject)", meaningVi: "cho người (chủ ngữ)", example: "the man who called" },
    { word: "which", meaning: "for things / animals", meaningVi: "cho vật / con vật", example: "the book which I read" },
    { word: "that", meaning: "for people OR things (defining)", meaningVi: "cho người HOẶC vật (xác định)", example: "the boy that lives next door" },
    { word: "where", meaning: "for places", meaningVi: "cho địa điểm", example: "the park where we play" },
    { word: "whose", meaning: "for possession", meaningVi: "cho sở hữu", example: "the girl whose bag is red" },
  ],
  quiz: [
    { question: "The actor ___ won the award is from Korea.", options: ["which", "who", "where", "what"], answer: 1, explanation: "Person → who." },
    { question: "Show me the bag ___ you bought yesterday.", options: ["who", "which", "where", "when"], answer: 1, explanation: "Thing → which." },
    { question: "Which sentence is correct?", options: ["She's the girl which sings.", "She's the girl who sings.", "She's the girl who she sings.", "She's the girl whom sings."], answer: 1, explanation: "Person → who; don't repeat subject." },
  ],
  parentInfo: "Relative clauses make sentences sound natural and advanced — exactly what PET examiners want. The lesson covers the 5 main pronouns and the most common error (doubling the subject).",
  parentInfoVi: "Mệnh đề quan hệ giúp câu nghe tự nhiên, nâng cao — đúng điều PET cần. Bài bao gồm 5 đại từ chính và lỗi phổ biến nhất.",
});

// =====================================================================
export const cambridgeLecturesGrammar: CambridgeLecture[] = [
  // Starters
  startersAAn, startersPlurals, startersThisThat, startersHaveGot, startersAmIsAre,
  // Movers
  moversPresentCont, moversPastWasWere, moversCan, moversPossessiveS, moversComparatives,
  // Flyers
  flyersPastSimple, flyersGoingTo, flyersSuperlatives, flyersMustMustnt, flyersAdverbsFreq,
  // KET
  ketPresentPerfect, ketWillVsGoing, ketArticles, ketCountable, ketShould,
  // PET
  petPresentPerfectVsPast, petReportedSpeech, petConditionals, petPassive, petRelative,
];
