// Cambridge Journey - GRAMMAR ESSENTIALS expansion BATCH 2.
// 25 more grammar lessons (5 per level: Starters → PET).
// Same shape as cambridgeLecturesGrammar.ts.

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
// STARTERS — 5 more grammar foundations
// =====================================================================

const startersPronouns = build({
  id: "cam-grammar-starters-pronouns",
  level: "starters", icon: "🧑‍🤝‍🧑",
  title: "Subject Pronouns: I, You, He, She, It, We, They",
  titleVi: "Đại từ chủ ngữ: I, You, He, She, It, We, They",
  description: "Replace names with the right pronoun so your sentences sound smooth and natural.",
  descriptionVi: "Thay tên bằng đại từ đúng để câu nghe trôi chảy, tự nhiên.",
  learningObjective: "Students will replace nouns with correct subject pronouns based on gender and number.",
  learningObjectiveVi: "Học sinh sẽ thay danh từ bằng đại từ chủ ngữ đúng theo giới tính và số lượng.",
  examPattern: "Starters Reading & Writing Part 3 & 4: short story gaps where 'Tom' becomes 'he', 'the cats' becomes 'they'.",
  examPatternVi: "Starters Đọc & Viết Phần 3 & 4: chỗ trống trong truyện ngắn — 'Tom' thành 'he', 'the cats' thành 'they'.",
  secretTip: "🔑 Ask 2 questions: (1) one or many? (2) boy / girl / thing? Map → he / she / it / we / they.",
  secretTipVi: "🔑 Hỏi 2 câu: (1) một hay nhiều? (2) trai / gái / vật? Khớp → he / she / it / we / they.",
  welcomeMessage: "🧑‍🤝‍🧑 Let's meet the pronoun family!",
  welcomeMessageVi: "🧑‍🤝‍🧑 Cùng làm quen với gia đình đại từ!",
  stepByStep: [
    { step: 1, title: "Spot the noun", titleVi: "Tìm danh từ", detail: "Underline who or what the sentence is about.", detailVi: "Gạch chân ai/cái gì là chủ thể của câu." },
    { step: 2, title: "Decide one or many", titleVi: "Quyết định một hay nhiều", detail: "One → he/she/it. Many → they.", detailVi: "Một → he/she/it. Nhiều → they." },
    { step: 3, title: "Pick gender", titleVi: "Chọn giới tính", detail: "Boy → he, girl → she, animal/thing → it.", detailVi: "Trai → he, gái → she, con vật/vật → it." },
  ],
  illustratedRules: [
    { icon: "👦", rule: "Boy (1) → HE", ruleVi: "Bé trai (1) → HE", example: "Tom is here. He is tall." },
    { icon: "👧", rule: "Girl (1) → SHE", ruleVi: "Bé gái (1) → SHE", example: "Anna sings. She sings well." },
    { icon: "🐱", rule: "Animal / thing (1) → IT", ruleVi: "Con vật / vật (1) → IT", example: "The cat is sleeping. It is tired." },
    { icon: "👨‍👩‍👧‍👦", rule: "Many people / things → THEY", ruleVi: "Nhiều người / vật → THEY", example: "My friends are nice. They are kind." },
  ],
  watchOut: [
    { mistake: "Calling a baby/animal 'he' when gender is unknown", mistakeVi: "Gọi em bé/con vật là 'he' khi chưa biết giới tính", tip: "Use IT when unsure: 'The bird is small. It can fly.'", tipVi: "Khi không chắc, dùng IT: 'The bird is small. It can fly.'" },
    { mistake: "Repeating the noun: 'Tom is happy. Tom plays.'", mistakeVi: "Lặp danh từ: 'Tom is happy. Tom plays.'", tip: "Use HE the second time: 'Tom is happy. He plays.'", tipVi: "Lần 2 dùng HE: 'Tom is happy. He plays.'" },
  ],
  practiceSet: [
    { instruction: "Choose the pronoun", instructionVi: "Chọn đại từ", question: "Anna is my sister. ___ is 7.", options: ["He", "She", "It", "They"], answer: 1, explanation: "Anna = girl → She.", explanationVi: "Anna = bé gái → She." },
    { instruction: "Choose the pronoun", instructionVi: "Chọn đại từ", question: "The dogs are big. ___ are friendly.", options: ["He", "She", "It", "They"], answer: 3, explanation: "Many dogs → They.", explanationVi: "Nhiều chó → They." },
    { instruction: "Choose the pronoun", instructionVi: "Chọn đại từ", question: "My pencil is red. ___ is new.", options: ["He", "She", "It", "They"], answer: 2, explanation: "Thing (1) → It.", explanationVi: "Vật (1) → It." },
  ],
  vocabulary: [
    { word: "he", meaning: "1 boy/man", meaningVi: "1 bé trai/đàn ông", example: "He is my dad." },
    { word: "she", meaning: "1 girl/woman", meaningVi: "1 bé gái/phụ nữ", example: "She is my mum." },
    { word: "it", meaning: "1 animal/thing", meaningVi: "1 con vật/vật", example: "It is a cat." },
    { word: "they", meaning: "many people/things", meaningVi: "nhiều người/vật", example: "They are happy." },
  ],
  quiz: [
    { question: "My brother is funny. ___ tells jokes.", options: ["She", "He", "It", "They"], answer: 1, explanation: "brother → He." },
    { question: "The books are heavy. ___ are old.", options: ["He", "She", "It", "They"], answer: 3, explanation: "Many books → They." },
    { question: "The rabbit is white. ___ is cute.", options: ["He", "She", "It", "They"], answer: 2, explanation: "Animal (1, unknown) → It." },
  ],
  parentInfo: "Mastering subject pronouns is essential before learning verbs — it controls subject–verb agreement across every Cambridge level.",
  parentInfoVi: "Làm chủ đại từ chủ ngữ là bước đầu trước khi học động từ — quyết định việc chia đúng động từ ở mọi cấp Cambridge.",
});

const startersPrepIn = build({
  id: "cam-grammar-starters-prep-place",
  level: "starters", icon: "📍",
  title: "Where Is It? In, On, Under, Next To",
  titleVi: "Nó ở đâu? In, On, Under, Next To",
  description: "Describe where things are with the 4 most-tested prepositions of place in Starters Listening Part 1.",
  descriptionVi: "Mô tả vị trí với 4 giới từ chỉ nơi chốn được kiểm tra nhiều nhất trong Starters Nghe Phần 1.",
  learningObjective: "Students will use in / on / under / next to to describe positions of objects in pictures.",
  learningObjectiveVi: "Học sinh sẽ dùng in / on / under / next to để mô tả vị trí đồ vật trong tranh.",
  examPattern: "Starters Listening Part 1: 'Put the cat under the table' — children draw a line from the word to the position.",
  examPatternVi: "Starters Nghe Phần 1: 'Put the cat under the table' — trẻ nối từ với vị trí.",
  secretTip: "🔑 Mime it with your hand: IN (inside a box), ON (on top), UNDER (below), NEXT TO (beside). Body memory beats book memory!",
  secretTipVi: "🔑 Diễn tả bằng tay: IN (trong hộp), ON (trên), UNDER (dưới), NEXT TO (bên cạnh). Cơ thể nhớ tốt hơn sách!",
  welcomeMessage: "📍 Where is the cat? Let's find out!",
  welcomeMessageVi: "📍 Con mèo ở đâu? Cùng tìm!",
  stepByStep: [
    { step: 1, title: "Look at the picture", titleVi: "Nhìn vào tranh", detail: "Find the object and its container/surface.", detailVi: "Tìm đồ vật và nơi chứa/đặt nó." },
    { step: 2, title: "Ask: inside? on top? below? beside?", titleVi: "Hỏi: trong? trên? dưới? bên cạnh?", detail: "Each question maps to one preposition.", detailVi: "Mỗi câu hỏi tương ứng 1 giới từ." },
    { step: 3, title: "Build the sentence", titleVi: "Dựng câu", detail: "The X is in/on/under/next to the Y.", detailVi: "The X is in/on/under/next to the Y." },
  ],
  illustratedRules: [
    { icon: "📦", rule: "IN = inside something", ruleVi: "IN = bên trong", example: "The toy is in the box." },
    { icon: "🪑", rule: "ON = on top of a surface", ruleVi: "ON = trên bề mặt", example: "The book is on the table." },
    { icon: "🛏️", rule: "UNDER = below something", ruleVi: "UNDER = bên dưới", example: "The shoes are under the bed." },
    { icon: "👯", rule: "NEXT TO = beside / by the side", ruleVi: "NEXT TO = ngay bên cạnh", example: "Sam is next to Tom." },
  ],
  watchOut: [
    { mistake: "Using ON when something is INSIDE", mistakeVi: "Dùng ON khi vật ở BÊN TRONG", tip: "Inside a box / bag / room → IN, not ON.", tipVi: "Bên trong hộp/túi/phòng → IN, không phải ON." },
    { mistake: "Saying 'next of' or 'next from'", mistakeVi: "Nói 'next of' hay 'next from'", tip: "Always 'next TO'. Two words, with TO.", tipVi: "Luôn 'next TO'. Hai từ, có TO." },
  ],
  practiceSet: [
    { instruction: "Choose the preposition", instructionVi: "Chọn giới từ", question: "The cat is ___ the chair (sleeping on top).", options: ["in", "on", "under", "next to"], answer: 1, explanation: "On top → ON.", explanationVi: "Trên đỉnh → ON." },
    { instruction: "Choose the preposition", instructionVi: "Chọn giới từ", question: "My pen is ___ my bag.", options: ["in", "on", "under", "next to"], answer: 0, explanation: "Inside → IN.", explanationVi: "Bên trong → IN." },
    { instruction: "Choose the preposition", instructionVi: "Chọn giới từ", question: "The ball is ___ the bed (below).", options: ["in", "on", "under", "next to"], answer: 2, explanation: "Below → UNDER.", explanationVi: "Dưới → UNDER." },
  ],
  vocabulary: [
    { word: "in", meaning: "inside", meaningVi: "ở trong", example: "in the box" },
    { word: "on", meaning: "on top of", meaningVi: "ở trên", example: "on the table" },
    { word: "under", meaning: "below", meaningVi: "ở dưới", example: "under the chair" },
    { word: "next to", meaning: "beside", meaningVi: "kế bên", example: "next to my friend" },
  ],
  quiz: [
    { question: "The cat sleeps ___ the bed (below it).", options: ["in", "on", "under", "next to"], answer: 2, explanation: "Below → under." },
    { question: "My book is ___ my school bag.", options: ["in", "on", "under", "next to"], answer: 0, explanation: "Inside → in." },
    { question: "The vase is ___ the lamp (beside).", options: ["in", "on", "under", "next to"], answer: 3, explanation: "Beside → next to." },
  ],
  parentInfo: "Prepositions of place power the entire Starters Listening Part 1. Drilling these 4 lifts overall listening score quickly.",
  parentInfoVi: "Giới từ chỉ nơi chốn là xương sống Starters Nghe Phần 1. Luyện 4 từ này nâng điểm nghe nhanh.",
});

const startersImperatives = build({
  id: "cam-grammar-starters-imperatives",
  level: "starters", icon: "🙋",
  title: "Sit Down! Imperatives for Classroom Action",
  titleVi: "Sit Down! Câu mệnh lệnh cho lớp học",
  description: "Use the base verb to give friendly commands — the structure behind every classroom instruction.",
  descriptionVi: "Dùng động từ nguyên thể để ra lệnh thân thiện — cấu trúc đằng sau mọi chỉ dẫn lớp học.",
  learningObjective: "Students will form positive and negative imperatives using base verbs and 'don't'.",
  learningObjectiveVi: "Học sinh sẽ tạo câu mệnh lệnh khẳng định và phủ định bằng động từ nguyên và 'don't'.",
  examPattern: "Starters Listening Part 4 & Speaking: 'Open your book.' 'Don't run.' — children must follow or repeat the command.",
  examPatternVi: "Starters Nghe Phần 4 & Nói: 'Open your book.' 'Don't run.' — trẻ làm theo hoặc nhắc lại.",
  secretTip: "🔑 No subject! Start with the verb: 'Sit.' 'Stand.' 'Don't talk.' Imperatives drop 'you'.",
  secretTipVi: "🔑 Không có chủ ngữ! Bắt đầu bằng động từ: 'Sit.' 'Stand.' 'Don't talk.' Mệnh lệnh bỏ 'you'.",
  welcomeMessage: "🙋 Ready, set, action! Let's give some commands!",
  welcomeMessageVi: "🙋 Sẵn sàng, ra lệnh thôi!",
  stepByStep: [
    { step: 1, title: "Pick the action verb", titleVi: "Chọn động từ hành động", detail: "Open, close, sit, stand, look, listen, write…", detailVi: "Open, close, sit, stand, look, listen, write…" },
    { step: 2, title: "Use the base form (no -s, no to)", titleVi: "Dùng dạng nguyên (không -s, không to)", detail: "Just say: 'Open the door.'", detailVi: "Chỉ nói: 'Open the door.'" },
    { step: 3, title: "Add Don't for negatives", titleVi: "Thêm Don't cho phủ định", detail: "'Don't run.' 'Don't shout.'", detailVi: "'Don't run.' 'Don't shout.'" },
  ],
  illustratedRules: [
    { icon: "✋", rule: "Positive: base verb + object", ruleVi: "Khẳng định: động từ nguyên + tân ngữ", example: "Close the window. Open your book." },
    { icon: "🚫", rule: "Negative: Don't + base verb", ruleVi: "Phủ định: Don't + động từ nguyên", example: "Don't run. Don't talk." },
    { icon: "🤝", rule: "Add 'please' to be polite", ruleVi: "Thêm 'please' cho lịch sự", example: "Please sit down. Open the door, please." },
  ],
  watchOut: [
    { mistake: "Adding -s: 'Opens the door.'", mistakeVi: "Thêm -s: 'Opens the door.'", tip: "Imperative is base form: 'Open the door.'", tipVi: "Mệnh lệnh là nguyên thể: 'Open the door.'" },
    { mistake: "Saying 'No run' instead of 'Don't run'", mistakeVi: "Nói 'No run' thay vì 'Don't run'", tip: "Negative imperatives need DON'T + verb.", tipVi: "Phủ định cần DON'T + động từ." },
  ],
  practiceSet: [
    { instruction: "Pick the right command", instructionVi: "Chọn mệnh lệnh đúng", question: "___ your book, please.", options: ["Opens", "Open", "Opening", "To open"], answer: 1, explanation: "Base verb only.", explanationVi: "Chỉ dùng dạng nguyên." },
    { instruction: "Pick the negative", instructionVi: "Chọn phủ định", question: "___ run in class!", options: ["No", "Not", "Don't", "Doesn't"], answer: 2, explanation: "Don't + verb.", explanationVi: "Don't + động từ." },
    { instruction: "Pick the polite form", instructionVi: "Chọn dạng lịch sự", question: "Sit down, ___.", options: ["please", "thanks", "now", "yes"], answer: 0, explanation: "Add 'please' for politeness.", explanationVi: "Thêm 'please' cho lịch sự." },
  ],
  vocabulary: [
    { word: "open", meaning: "make something not closed", meaningVi: "mở", example: "Open the door." },
    { word: "close", meaning: "shut", meaningVi: "đóng", example: "Close your book." },
    { word: "sit", meaning: "rest on a chair", meaningVi: "ngồi", example: "Sit down." },
    { word: "stand", meaning: "be on your feet", meaningVi: "đứng", example: "Stand up." },
  ],
  quiz: [
    { question: "___ your hand, please.", options: ["Raises", "Raise", "Raising", "To raise"], answer: 1, explanation: "Base verb." },
    { question: "___ talk during the test.", options: ["No", "Not", "Don't", "Doesn't"], answer: 2, explanation: "Don't + verb." },
    { question: "Which is the most polite?", options: ["Sit!", "You sit.", "Sit down, please.", "Sitting!"], answer: 2, explanation: "'Please' = polite." },
  ],
  parentInfo: "Imperatives are the language of the classroom. Mastering them helps children understand teachers and games instantly.",
  parentInfoVi: "Mệnh lệnh là ngôn ngữ lớp học. Nắm vững giúp trẻ hiểu giáo viên và trò chơi ngay lập tức.",
});

const startersWhQuestions = build({
  id: "cam-grammar-starters-wh",
  level: "starters", icon: "❓",
  title: "Wh- Questions: What, Where, Who, How Many",
  titleVi: "Câu hỏi Wh-: What, Where, Who, How Many",
  description: "Pick the right question word so your question matches the answer you want.",
  descriptionVi: "Chọn từ hỏi đúng để câu hỏi khớp với câu trả lời bạn muốn.",
  learningObjective: "Students will form Wh- questions with the correct question word + auxiliary + subject.",
  learningObjectiveVi: "Học sinh sẽ tạo câu hỏi Wh- với từ hỏi + trợ động từ + chủ ngữ đúng.",
  examPattern: "Starters Speaking Part 4: examiner asks 'How many cats have you got?' 'Where do you live?' Kids must answer fully.",
  examPatternVi: "Starters Nói Phần 4: giám khảo hỏi 'How many cats have you got?' 'Where do you live?' Trẻ phải trả lời đầy đủ.",
  secretTip: "🔑 Match the question word to the answer type: thing→What, place→Where, person→Who, number→How many.",
  secretTipVi: "🔑 Khớp từ hỏi với loại câu trả lời: vật→What, nơi→Where, người→Who, số lượng→How many.",
  welcomeMessage: "❓ Curious minds make great speakers! Let's ask!",
  welcomeMessageVi: "❓ Tò mò là nói tốt! Cùng hỏi nào!",
  stepByStep: [
    { step: 1, title: "Decide answer type", titleVi: "Quyết định loại câu trả lời", detail: "Thing, place, person or number?", detailVi: "Vật, nơi, người hay số?" },
    { step: 2, title: "Pick Wh- word", titleVi: "Chọn từ Wh-", detail: "What/Where/Who/How many.", detailVi: "What/Where/Who/How many." },
    { step: 3, title: "Add auxiliary + subject + verb", titleVi: "Thêm trợ động từ + chủ ngữ + động từ", detail: "Where DO you live? What IS your name?", detailVi: "Where DO you live? What IS your name?" },
  ],
  illustratedRules: [
    { icon: "🎒", rule: "WHAT for things: What is it? What's your name?", ruleVi: "WHAT cho vật: What is it?", example: "What is your favourite colour?" },
    { icon: "🗺️", rule: "WHERE for places: Where do you live?", ruleVi: "WHERE cho nơi chốn", example: "Where is the cat?" },
    { icon: "🙋", rule: "WHO for people: Who is your friend?", ruleVi: "WHO cho người", example: "Who is that man?" },
    { icon: "🔢", rule: "HOW MANY + plural noun for number", ruleVi: "HOW MANY + danh từ số nhiều cho số lượng", example: "How many books have you got?" },
  ],
  watchOut: [
    { mistake: "Forgetting do/does/is/are after Wh-", mistakeVi: "Quên do/does/is/are sau Wh-", tip: "'Where you live?' ❌ → 'Where DO you live?' ✓", tipVi: "'Where you live?' ❌ → 'Where DO you live?' ✓" },
    { mistake: "Using singular noun after 'How many'", mistakeVi: "Dùng danh từ số ít sau 'How many'", tip: "'How many book?' ❌ → 'How many books?' ✓", tipVi: "'How many book?' ❌ → 'How many books?' ✓" },
  ],
  practiceSet: [
    { instruction: "Pick the right Wh-word", instructionVi: "Chọn từ Wh- đúng", question: "___ is your sister? — Lan.", options: ["What", "Where", "Who", "How many"], answer: 2, explanation: "Person name → Who.", explanationVi: "Tên người → Who." },
    { instruction: "Pick the right Wh-word", instructionVi: "Chọn từ Wh- đúng", question: "___ pens have you got? — Five.", options: ["What", "Where", "Who", "How many"], answer: 3, explanation: "Number → How many.", explanationVi: "Số → How many." },
    { instruction: "Pick the right Wh-word", instructionVi: "Chọn từ Wh- đúng", question: "___ do you live? — In Hanoi.", options: ["What", "Where", "Who", "How many"], answer: 1, explanation: "Place → Where.", explanationVi: "Nơi chốn → Where." },
  ],
  vocabulary: [
    { word: "what", meaning: "asks about things", meaningVi: "hỏi về vật", example: "What is this?" },
    { word: "where", meaning: "asks about places", meaningVi: "hỏi về nơi", example: "Where is mum?" },
    { word: "who", meaning: "asks about people", meaningVi: "hỏi về người", example: "Who are you?" },
    { word: "how many", meaning: "asks about number", meaningVi: "hỏi về số lượng", example: "How many cats?" },
  ],
  quiz: [
    { question: "___ your favourite food? — Pizza.", options: ["Who is", "Where is", "What is", "How many"], answer: 2, explanation: "Thing → What." },
    { question: "___ apples in the bag? — Three.", options: ["What", "Where", "Who", "How many"], answer: 3, explanation: "Number → How many." },
    { question: "Which is correct?", options: ["Where you go?", "Where do you go?", "Where goes you?", "Where you do go?"], answer: 1, explanation: "Wh- + do + subject + verb." },
  ],
  parentInfo: "Wh- questions form the backbone of Starters Speaking Part 4. Knowing the 4 main words boosts answer accuracy quickly.",
  parentInfoVi: "Câu hỏi Wh- là cốt lõi Starters Nói Phần 4. Biết 4 từ chính giúp trả lời chính xác hơn nhanh chóng.",
});

const startersColorsAdj = build({
  id: "cam-grammar-starters-colours-adj",
  level: "starters", icon: "🌈",
  title: "Colour + Noun: Adjective Order Made Simple",
  titleVi: "Màu + Danh từ: Thứ tự tính từ đơn giản",
  description: "Place colours and simple adjectives BEFORE the noun, never after — the #1 word-order fix at Starters.",
  descriptionVi: "Đặt màu sắc và tính từ đơn giản TRƯỚC danh từ, không phải sau — lỗi trật tự từ phổ biến nhất ở Starters.",
  learningObjective: "Students will place adjectives before nouns and order size+colour correctly.",
  learningObjectiveVi: "Học sinh sẽ đặt tính từ trước danh từ và sắp xếp kích thước + màu đúng.",
  examPattern: "Starters Speaking Part 2 & Writing Part 5: 'a red car', 'a big blue book' — wrong order loses marks.",
  examPatternVi: "Starters Nói Phần 2 & Viết Phần 5: 'a red car', 'a big blue book' — sai trật tự mất điểm.",
  secretTip: "🔑 Order: SIZE → COLOUR → NOUN. 'a big red ball', not 'a red big ball'.",
  secretTipVi: "🔑 Thứ tự: KÍCH THƯỚC → MÀU → DANH TỪ. 'a big red ball', không phải 'a red big ball'.",
  welcomeMessage: "🌈 Let's paint with words!",
  welcomeMessageVi: "🌈 Cùng vẽ bằng từ ngữ!",
  stepByStep: [
    { step: 1, title: "Adjective comes BEFORE noun", titleVi: "Tính từ ĐỨNG TRƯỚC danh từ", detail: "'red car' ✓, not 'car red' ❌", detailVi: "'red car' ✓, không phải 'car red' ❌" },
    { step: 2, title: "If two adjectives: size first", titleVi: "Nếu có 2 tính từ: kích thước trước", detail: "big + red + ball.", detailVi: "big + red + ball." },
    { step: 3, title: "Adjective never gets -s for plural", titleVi: "Tính từ không thêm -s khi số nhiều", detail: "two red cars (not 'two reds cars').", detailVi: "two red cars (không phải 'two reds cars')." },
  ],
  illustratedRules: [
    { icon: "🔴", rule: "Adjective + Noun: 'a red apple'", ruleVi: "Tính từ + Danh từ: 'a red apple'", example: "I have a blue pen." },
    { icon: "📏", rule: "Size + Colour + Noun: 'a big red ball'", ruleVi: "Kích thước + Màu + Danh từ", example: "She has a small green bag." },
    { icon: "👥", rule: "Plural: keep adjective unchanged", ruleVi: "Số nhiều: giữ tính từ nguyên", example: "two red cars, three big dogs" },
  ],
  watchOut: [
    { mistake: "Putting colour after noun ('car red')", mistakeVi: "Đặt màu sau danh từ ('car red')", tip: "Adjectives always come BEFORE the noun in English.", tipVi: "Tính từ luôn đứng TRƯỚC danh từ trong tiếng Anh." },
    { mistake: "Adding -s to adjective: 'reds cars'", mistakeVi: "Thêm -s vào tính từ: 'reds cars'", tip: "Only the noun takes -s. Adjective stays the same.", tipVi: "Chỉ danh từ thêm -s. Tính từ giữ nguyên." },
  ],
  practiceSet: [
    { instruction: "Choose correct order", instructionVi: "Chọn trật tự đúng", question: "I have ___.", options: ["a car red", "a red car", "red a car", "cars red"], answer: 1, explanation: "Adj + Noun.", explanationVi: "Tính từ + Danh từ." },
    { instruction: "Choose correct order", instructionVi: "Chọn trật tự đúng", question: "She has ___.", options: ["a big blue book", "a blue big book", "a book big blue", "big a blue book"], answer: 0, explanation: "Size + Colour + Noun.", explanationVi: "Kích thước + Màu + Danh từ." },
    { instruction: "Choose correct plural", instructionVi: "Chọn số nhiều đúng", question: "I see ___ in the garden.", options: ["two reds flowers", "two red flower", "two red flowers", "two flower reds"], answer: 2, explanation: "Adj unchanged + noun-s.", explanationVi: "Tính từ giữ nguyên + danh từ -s." },
  ],
  vocabulary: [
    { word: "red", meaning: "the colour of fire", meaningVi: "màu đỏ", example: "a red car" },
    { word: "blue", meaning: "the colour of the sea", meaningVi: "màu xanh dương", example: "a blue ball" },
    { word: "big", meaning: "large", meaningVi: "to", example: "a big house" },
    { word: "small", meaning: "little", meaningVi: "nhỏ", example: "a small cat" },
  ],
  quiz: [
    { question: "Pick the correct phrase.", options: ["a yellow happy duck", "a happy yellow duck", "a yellow duck happy", "duck happy yellow"], answer: 1, explanation: "Opinion (happy) before colour (yellow) before noun." },
    { question: "Three ___ in the box.", options: ["greens apples", "green apple", "green apples", "apple greens"], answer: 2, explanation: "Adj unchanged + plural noun." },
    { question: "Which is correct?", options: ["I want a ball big.", "I want a big ball.", "I want ball a big.", "I want big a ball."], answer: 1, explanation: "a + adj + noun." },
  ],
  parentInfo: "Word order is the #1 difference between Vietnamese and English noun phrases. Drilling 'adjective BEFORE noun' eliminates many beginner errors.",
  parentInfoVi: "Trật tự từ là khác biệt số 1 giữa cụm danh từ tiếng Việt và tiếng Anh. Luyện 'tính từ TRƯỚC danh từ' xoá nhiều lỗi sơ cấp.",
});

// =====================================================================
// MOVERS — 5 more grammar lessons
// =====================================================================

const moversLikeIng = build({
  id: "cam-grammar-movers-like-ing",
  level: "movers", icon: "❤️",
  title: "Like / Love / Hate + V-ing",
  titleVi: "Like / Love / Hate + V-ing",
  description: "Talk about what you enjoy with the always-tested 'like + verb-ing' structure.",
  descriptionVi: "Nói về sở thích với cấu trúc luôn được kiểm tra 'like + động từ-ing'.",
  learningObjective: "Students will combine like/love/hate/enjoy with the -ing form of a verb to express preferences.",
  learningObjectiveVi: "Học sinh sẽ kết hợp like/love/hate/enjoy với dạng -ing để thể hiện sở thích.",
  examPattern: "Movers Speaking Part 4 & Reading Part 6: 'I like swimming.' 'My brother loves playing football.' Wrong form is a common fail.",
  examPatternVi: "Movers Nói Phần 4 & Đọc Phần 6: 'I like swimming.' 'My brother loves playing football.' Sai dạng thường mất điểm.",
  secretTip: "🔑 After like/love/hate/enjoy, the next verb wears its -ING jacket. Always.",
  secretTipVi: "🔑 Sau like/love/hate/enjoy, động từ kế tiếp mặc áo -ING. Luôn luôn.",
  welcomeMessage: "❤️ What do you LOVE doing? Let's share!",
  welcomeMessageVi: "❤️ Bạn THÍCH làm gì? Cùng chia sẻ!",
  stepByStep: [
    { step: 1, title: "Pick a feeling verb", titleVi: "Chọn động từ cảm xúc", detail: "like / love / hate / enjoy.", detailVi: "like / love / hate / enjoy." },
    { step: 2, title: "Add the -ing verb", titleVi: "Thêm động từ -ing", detail: "swim → swimming, play → playing, dance → dancing.", detailVi: "swim → swimming, play → playing, dance → dancing." },
    { step: 3, title: "Spelling tweaks", titleVi: "Lưu ý chính tả", detail: "swim → swimming (double m); dance → dancing (drop e).", detailVi: "swim → swimming (gấp đôi m); dance → dancing (bỏ e)." },
  ],
  illustratedRules: [
    { icon: "🏊", rule: "like + V-ing: 'I like swimming.'", ruleVi: "like + V-ing", example: "I like reading books." },
    { icon: "🥳", rule: "love + V-ing: 'She loves dancing.'", ruleVi: "love + V-ing", example: "We love singing." },
    { icon: "😖", rule: "hate + V-ing: 'They hate waiting.'", ruleVi: "hate + V-ing", example: "He hates getting up early." },
    { icon: "😄", rule: "enjoy + V-ing: 'I enjoy painting.'", ruleVi: "enjoy + V-ing", example: "She enjoys cooking." },
  ],
  watchOut: [
    { mistake: "Using to-infinitive after enjoy: 'enjoy to swim'", mistakeVi: "Dùng to-infinitive sau enjoy: 'enjoy to swim'", tip: "ENJOY always takes -ing: 'enjoy swimming'.", tipVi: "ENJOY luôn dùng -ing: 'enjoy swimming'." },
    { mistake: "Forgetting double consonant: 'runing'", mistakeVi: "Quên gấp đôi phụ âm: 'runing'", tip: "Short verb + 1 vowel + 1 consonant → double: run → running.", tipVi: "Động từ ngắn + 1 nguyên âm + 1 phụ âm → gấp đôi: run → running." },
  ],
  practiceSet: [
    { instruction: "Pick the -ing form", instructionVi: "Chọn dạng -ing", question: "I like ___ to music.", options: ["listen", "listens", "listening", "to listen"], answer: 2, explanation: "like + V-ing.", explanationVi: "like + V-ing." },
    { instruction: "Pick the -ing form", instructionVi: "Chọn dạng -ing", question: "My dog hates ___ baths.", options: ["take", "takes", "taking", "to take"], answer: 2, explanation: "hate + V-ing.", explanationVi: "hate + V-ing." },
    { instruction: "Pick the spelling", instructionVi: "Chọn chính tả", question: "She enjoys ___ in the park.", options: ["runing", "running", "runned", "runs"], answer: 1, explanation: "run → running (double n).", explanationVi: "run → running (gấp đôi n)." },
  ],
  vocabulary: [
    { word: "like", meaning: "to enjoy something", meaningVi: "thích", example: "I like swimming." },
    { word: "love", meaning: "to enjoy very much", meaningVi: "rất thích", example: "She loves dancing." },
    { word: "hate", meaning: "to dislike strongly", meaningVi: "ghét", example: "He hates waiting." },
    { word: "enjoy", meaning: "to like doing", meaningVi: "thưởng thức", example: "We enjoy cooking." },
  ],
  quiz: [
    { question: "I love ___ comics.", options: ["read", "reads", "reading", "to reading"], answer: 2, explanation: "love + V-ing." },
    { question: "He enjoys ___ photos.", options: ["take", "taking", "took", "to taking"], answer: 1, explanation: "enjoy + V-ing." },
    { question: "Which is correct?", options: ["She likes to swimming.", "She likes swim.", "She likes swimming.", "She liking swim."], answer: 2, explanation: "like + V-ing." },
  ],
  parentInfo: "This structure is asked in every Movers Speaking Part 4. Mastering -ing spelling rules makes writing tasks faster too.",
  parentInfoVi: "Cấu trúc này được hỏi ở mọi Movers Nói Phần 4. Nắm quy tắc -ing giúp viết nhanh hơn.",
});

const moversPrepTime = build({
  id: "cam-grammar-movers-prep-time",
  level: "movers", icon: "🕒",
  title: "In, On, At for Time: The 3-Box Method",
  titleVi: "In, On, At chỉ Thời gian: Phương pháp 3 Hộp",
  description: "Sort every time word into IN (big), ON (day/date), AT (clock time) — never mix them up again.",
  descriptionVi: "Phân loại từ chỉ thời gian vào IN (lớn), ON (ngày), AT (giờ) — không bao giờ nhầm nữa.",
  learningObjective: "Students will choose in/on/at correctly with time expressions.",
  learningObjectiveVi: "Học sinh sẽ chọn in/on/at đúng với biểu thức thời gian.",
  examPattern: "Movers Reading & Writing Part 5: 'I get up ___ 7 o'clock ___ Monday ___ July.'",
  examPatternVi: "Movers Đọc & Viết Phần 5: 'I get up ___ 7 o'clock ___ Monday ___ July.'",
  secretTip: "🔑 BIG block (year/month/season) = IN · DAY/DATE = ON · CLOCK time = AT.",
  secretTipVi: "🔑 Khối LỚN (năm/tháng/mùa) = IN · NGÀY = ON · GIỜ ĐỒNG HỒ = AT.",
  welcomeMessage: "🕒 Time to talk about time!",
  welcomeMessageVi: "🕒 Đến lúc nói về thời gian!",
  stepByStep: [
    { step: 1, title: "Size up the time word", titleVi: "Đánh giá kích thước thời gian", detail: "Big block? Day? Clock?", detailVi: "Khối lớn? Ngày? Giờ?" },
    { step: 2, title: "Drop it in the right box", titleVi: "Bỏ vào hộp đúng", detail: "IN box / ON box / AT box.", detailVi: "Hộp IN / ON / AT." },
    { step: 3, title: "Remember 3 traps", titleVi: "Nhớ 3 bẫy", detail: "at night, at the weekend, on Monday morning.", detailVi: "at night, at the weekend, on Monday morning." },
  ],
  illustratedRules: [
    { icon: "📅", rule: "IN: months, years, seasons, parts of day → in July, in 2025, in summer, in the morning", ruleVi: "IN: tháng, năm, mùa, buổi", example: "I was born in 2015." },
    { icon: "📆", rule: "ON: days and dates → on Monday, on 5 June", ruleVi: "ON: ngày trong tuần và ngày tháng", example: "We play on Saturday." },
    { icon: "⏰", rule: "AT: clock time + night + weekend → at 7 o'clock, at night, at the weekend", ruleVi: "AT: giờ + at night + at the weekend", example: "School starts at 8 a.m." },
  ],
  watchOut: [
    { mistake: "Saying 'in Monday' or 'on July'", mistakeVi: "Nói 'in Monday' hoặc 'on July'", tip: "Day → ON; Month → IN.", tipVi: "Ngày → ON; Tháng → IN." },
    { mistake: "Saying 'in the night'", mistakeVi: "Nói 'in the night'", tip: "Use 'AT night' (no 'the').", tipVi: "Dùng 'AT night' (không có 'the')." },
  ],
  practiceSet: [
    { instruction: "Pick the preposition", instructionVi: "Chọn giới từ", question: "We meet ___ 6 o'clock.", options: ["in", "on", "at", "by"], answer: 2, explanation: "Clock time → AT.", explanationVi: "Giờ → AT." },
    { instruction: "Pick the preposition", instructionVi: "Chọn giới từ", question: "My birthday is ___ May.", options: ["in", "on", "at", "by"], answer: 0, explanation: "Month → IN.", explanationVi: "Tháng → IN." },
    { instruction: "Pick the preposition", instructionVi: "Chọn giới từ", question: "School is closed ___ Sunday.", options: ["in", "on", "at", "by"], answer: 1, explanation: "Day → ON.", explanationVi: "Ngày → ON." },
  ],
  vocabulary: [
    { word: "in the morning", meaning: "part of day", meaningVi: "vào buổi sáng", example: "I read in the morning." },
    { word: "on Monday", meaning: "specific day", meaningVi: "vào thứ hai", example: "We have PE on Monday." },
    { word: "at night", meaning: "during darkness (fixed)", meaningVi: "vào ban đêm (cố định)", example: "Owls hunt at night." },
    { word: "at the weekend", meaning: "Saturday & Sunday (fixed)", meaningVi: "vào cuối tuần (cố định)", example: "We play at the weekend." },
  ],
  quiz: [
    { question: "I was born ___ 2015.", options: ["in", "on", "at", "by"], answer: 0, explanation: "Year → IN." },
    { question: "The party starts ___ 5 p.m.", options: ["in", "on", "at", "by"], answer: 2, explanation: "Clock → AT." },
    { question: "We don't go to school ___ Sunday.", options: ["in", "on", "at", "by"], answer: 1, explanation: "Day → ON." },
  ],
  parentInfo: "The IN/ON/AT distinction is the most-tested preposition rule in Movers Writing. The 3-box method gives instant decisions.",
  parentInfoVi: "Phân biệt IN/ON/AT là quy tắc giới từ được kiểm tra nhiều nhất ở Movers Viết. Phương pháp 3 hộp giúp quyết định nhanh.",
});

const moversWhyBecause = build({
  id: "cam-grammar-movers-why-because",
  level: "movers", icon: "🤔",
  title: "Why? Because! Giving Reasons",
  titleVi: "Why? Because! Nêu lý do",
  description: "Answer 'Why?' questions with full 'Because + clause' sentences — a Movers Speaking favourite.",
  descriptionVi: "Trả lời câu hỏi 'Why?' bằng câu đầy đủ 'Because + mệnh đề' — câu Movers Nói rất hay gặp.",
  learningObjective: "Students will ask Why questions and respond with Because + subject + verb sentences.",
  learningObjectiveVi: "Học sinh sẽ hỏi Why và trả lời bằng Because + chủ ngữ + động từ.",
  examPattern: "Movers Speaking Part 3: 'Why is the boy crying?' — full answer required.",
  examPatternVi: "Movers Nói Phần 3: 'Why is the boy crying?' — cần trả lời đầy đủ.",
  secretTip: "🔑 BECAUSE always needs a full sentence after it: Because + Subject + Verb + ...",
  secretTipVi: "🔑 BECAUSE luôn cần câu đầy đủ: Because + Chủ ngữ + Động từ + ...",
  welcomeMessage: "🤔 Why? Why? Why? Let's answer like a pro!",
  welcomeMessageVi: "🤔 Tại sao? Cùng trả lời như chuyên gia!",
  stepByStep: [
    { step: 1, title: "Hear the Why-question", titleVi: "Nghe câu Why", detail: "Catch the verb form (is, are, do, does).", detailVi: "Bắt dạng động từ (is, are, do, does)." },
    { step: 2, title: "Start with Because", titleVi: "Bắt đầu bằng Because", detail: "Because + clause.", detailVi: "Because + mệnh đề." },
    { step: 3, title: "Match the tense", titleVi: "Khớp thì", detail: "Question 'is' → answer 'is'. Question 'do' → 'do/does'.", detailVi: "Câu hỏi 'is' → trả lời 'is'. Câu hỏi 'do' → 'do/does'." },
  ],
  illustratedRules: [
    { icon: "❓", rule: "Why + auxiliary + subject + verb?", ruleVi: "Why + trợ động từ + chủ ngữ + động từ?", example: "Why is she sad?" },
    { icon: "💬", rule: "Because + Subject + Verb + (object)", ruleVi: "Because + Chủ ngữ + Động từ + (tân ngữ)", example: "Because she lost her toy." },
    { icon: "🔁", rule: "Tenses must match in Q and A", ruleVi: "Thì câu hỏi và trả lời phải khớp", example: "Why do you cry? — Because I am hurt." },
  ],
  watchOut: [
    { mistake: "Answering with 'Because of + verb'", mistakeVi: "Trả lời 'Because of + động từ'", tip: "Use BECAUSE + full clause; BECAUSE OF needs a noun: 'because of the rain'.", tipVi: "Dùng BECAUSE + mệnh đề; BECAUSE OF cần danh từ: 'because of the rain'." },
    { mistake: "Dropping the subject: 'Because is sad.'", mistakeVi: "Bỏ chủ ngữ: 'Because is sad.'", tip: "Always include the subject: 'Because she is sad.'", tipVi: "Luôn có chủ ngữ: 'Because she is sad.'" },
  ],
  practiceSet: [
    { instruction: "Best answer", instructionVi: "Trả lời đúng nhất", question: "Why is the baby crying? —", options: ["Because hungry.", "Because he is hungry.", "Because of he hungry.", "Hungry."], answer: 1, explanation: "Because + S + V.", explanationVi: "Because + Chủ ngữ + Động từ." },
    { instruction: "Pick the right word", instructionVi: "Chọn từ đúng", question: "We stayed home ___ the rain.", options: ["because", "because of", "so", "but"], answer: 1, explanation: "Before a noun → because OF.", explanationVi: "Trước danh từ → because OF." },
    { instruction: "Form the question", instructionVi: "Tạo câu hỏi", question: "___ are you happy?", options: ["Where", "Why", "Who", "What"], answer: 1, explanation: "Reason → Why.", explanationVi: "Lý do → Why." },
  ],
  vocabulary: [
    { word: "why", meaning: "asks the reason", meaningVi: "hỏi lý do", example: "Why are you late?" },
    { word: "because", meaning: "gives a reason + clause", meaningVi: "vì + mệnh đề", example: "Because I missed the bus." },
    { word: "because of", meaning: "gives a reason + noun", meaningVi: "vì + danh từ", example: "Because of the rain." },
    { word: "so", meaning: "shows result", meaningVi: "nên", example: "It rained, so we stayed in." },
  ],
  quiz: [
    { question: "Why ___ you tired? — Because I studied a lot.", options: ["is", "are", "do", "does"], answer: 1, explanation: "you → are." },
    { question: "Pick the correct sentence.", options: ["Because rain we stayed.", "Because of the rain we stayed.", "Because of rain we stayed.", "Because of we stayed rain."], answer: 1, explanation: "Because of + noun phrase (the rain)." },
    { question: "Best answer to 'Why is he running?'", options: ["Because late.", "Because he is late.", "Because of late.", "He late."], answer: 1, explanation: "Because + S + V." },
  ],
  parentInfo: "Reason giving moves children from one-word answers to full sentences — a major step toward Flyers Speaking confidence.",
  parentInfoVi: "Trẻ chuyển từ trả lời 1 từ sang câu đầy đủ — bước lớn để tự tin Flyers Nói.",
});

const moversAdverbsManner = build({
  id: "cam-grammar-movers-adverbs-ly",
  level: "movers", icon: "🏃‍♀️",
  title: "Adverbs of Manner: Adjective + -ly",
  titleVi: "Trạng từ chỉ cách thức: Tính từ + -ly",
  description: "Turn adjectives into 'how' words by adding -ly. Place them after the verb.",
  descriptionVi: "Biến tính từ thành từ chỉ 'cách' bằng cách thêm -ly. Đặt sau động từ.",
  learningObjective: "Students will form -ly adverbs and place them after the verb to describe HOW an action happens.",
  learningObjectiveVi: "Học sinh sẽ tạo trạng từ -ly và đặt sau động từ để mô tả CÁCH hành động xảy ra.",
  examPattern: "Movers Reading & Writing Part 4: 'She sings ___ (beautiful).' — fill the gap with 'beautifully'.",
  examPatternVi: "Movers Đọc & Viết Phần 4: 'She sings ___ (beautiful).' — điền 'beautifully'.",
  secretTip: "🔑 Adjective describes the NOUN; Adverb describes the VERB. Add -ly to turn adjective → adverb.",
  secretTipVi: "🔑 Tính từ mô tả DANH TỪ; Trạng từ mô tả ĐỘNG TỪ. Thêm -ly để chuyển tính từ → trạng từ.",
  welcomeMessage: "🏃‍♀️ How do you run? Quickly? Slowly? Let's describe!",
  welcomeMessageVi: "🏃‍♀️ Bạn chạy thế nào? Quickly? Slowly? Cùng mô tả!",
  stepByStep: [
    { step: 1, title: "Find the verb", titleVi: "Tìm động từ", detail: "What action happens?", detailVi: "Hành động gì xảy ra?" },
    { step: 2, title: "Add -ly to the adjective", titleVi: "Thêm -ly vào tính từ", detail: "slow → slowly, quick → quickly.", detailVi: "slow → slowly, quick → quickly." },
    { step: 3, title: "Place after the verb (+object)", titleVi: "Đặt sau động từ (+tân ngữ)", detail: "She speaks English clearly.", detailVi: "She speaks English clearly." },
  ],
  illustratedRules: [
    { icon: "🐢", rule: "Most adj + ly: slow → slowly", ruleVi: "Hầu hết tính từ + ly", example: "He walks slowly." },
    { icon: "😊", rule: "Adj ending in -y → -ily: happy → happily", ruleVi: "Tính từ kết thúc -y → -ily", example: "She smiles happily." },
    { icon: "⚡", rule: "Irregular: good → well, fast → fast", ruleVi: "Bất quy tắc: good → well, fast → fast", example: "She sings well. He runs fast." },
  ],
  watchOut: [
    { mistake: "Saying 'He runs quick'", mistakeVi: "Nói 'He runs quick'", tip: "Verb needs adverb: 'He runs quickly.' (or 'He runs fast'.)", tipVi: "Động từ cần trạng từ: 'He runs quickly.'" },
    { mistake: "Adding -ly to 'good': 'goodly'", mistakeVi: "Thêm -ly vào 'good': 'goodly'", tip: "good → WELL (irregular).", tipVi: "good → WELL (bất quy tắc)." },
  ],
  practiceSet: [
    { instruction: "Form the adverb", instructionVi: "Tạo trạng từ", question: "She sings (beautiful) ___.", options: ["beautiful", "beautifuly", "beautifully", "beauty"], answer: 2, explanation: "Add -ly: beautifully.", explanationVi: "Thêm -ly: beautifully." },
    { instruction: "Pick adjective or adverb", instructionVi: "Chọn tính từ hoặc trạng từ", question: "He is a ___ runner.", options: ["quick", "quickly", "quicker", "quickest"], answer: 0, explanation: "Describes the noun → adjective.", explanationVi: "Bổ nghĩa danh từ → tính từ." },
    { instruction: "Pick the irregular adverb", instructionVi: "Chọn trạng từ bất quy tắc", question: "She plays the piano ___.", options: ["good", "goodly", "well", "best"], answer: 2, explanation: "good → well.", explanationVi: "good → well." },
  ],
  vocabulary: [
    { word: "slowly", meaning: "in a slow way", meaningVi: "một cách chậm", example: "Drive slowly!" },
    { word: "quickly", meaning: "in a fast way", meaningVi: "một cách nhanh", example: "Eat quickly." },
    { word: "happily", meaning: "in a happy way", meaningVi: "một cách vui vẻ", example: "She laughs happily." },
    { word: "well", meaning: "in a good way (irregular)", meaningVi: "tốt (bất quy tắc)", example: "He swims well." },
  ],
  quiz: [
    { question: "He speaks English ___ (clear).", options: ["clear", "cleary", "clearly", "more clear"], answer: 2, explanation: "clear + ly = clearly." },
    { question: "She is a ___ girl.", options: ["happy", "happily", "happier", "happys"], answer: 0, explanation: "Before a noun → adjective." },
    { question: "He cooks ___.", options: ["good", "goodly", "well", "better"], answer: 2, explanation: "good → well (irregular)." },
  ],
  parentInfo: "Adverbs are needed to upgrade Movers Writing from basic to descriptive. The -ly rule (plus 3 irregulars) covers 95% of cases.",
  parentInfoVi: "Trạng từ giúp nâng cấp Movers Viết từ cơ bản lên mô tả. Quy tắc -ly (+ 3 bất quy tắc) phủ 95% trường hợp.",
});

const moversWantToInfinitive = build({
  id: "cam-grammar-movers-want-to",
  level: "movers", icon: "✨",
  title: "Want / Would Like + To-Infinitive",
  titleVi: "Want / Would Like + To-Infinitive",
  description: "Express wishes politely with 'would like to' and clearly with 'want to'.",
  descriptionVi: "Diễn đạt mong muốn lịch sự bằng 'would like to' và rõ ràng bằng 'want to'.",
  learningObjective: "Students will form sentences with want / would like + to-infinitive correctly.",
  learningObjectiveVi: "Học sinh sẽ tạo câu với want / would like + to-infinitive đúng.",
  examPattern: "Movers Speaking Part 4 & Reading Part 6: 'I'd like to be a teacher.' 'She wants to play tennis.'",
  examPatternVi: "Movers Nói Phần 4 & Đọc Phần 6: 'I'd like to be a teacher.' 'She wants to play tennis.'",
  secretTip: "🔑 want / would like + TO + base verb. 'I'd like to' = polite. 'I want to' = direct.",
  secretTipVi: "🔑 want / would like + TO + động từ nguyên. 'I'd like to' = lịch sự. 'I want to' = trực tiếp.",
  welcomeMessage: "✨ What do you want to do today?",
  welcomeMessageVi: "✨ Hôm nay bạn muốn làm gì?",
  stepByStep: [
    { step: 1, title: "Choose tone", titleVi: "Chọn giọng điệu", detail: "Polite → would like to. Direct → want to.", detailVi: "Lịch sự → would like to. Trực tiếp → want to." },
    { step: 2, title: "Add TO + base verb", titleVi: "Thêm TO + động từ nguyên", detail: "want to go, would like to eat.", detailVi: "want to go, would like to eat." },
    { step: 3, title: "Conjugate WANT", titleVi: "Chia WANT", detail: "I/you/we/they want · he/she/it wants.", detailVi: "I/you/we/they want · he/she/it wants." },
  ],
  illustratedRules: [
    { icon: "🍕", rule: "want + to + base verb", ruleVi: "want + to + động từ nguyên", example: "I want to eat pizza." },
    { icon: "🥤", rule: "would like + to + base verb (polite)", ruleVi: "would like + to + động từ nguyên (lịch sự)", example: "I'd like to have water, please." },
    { icon: "👤", rule: "He/She → WANTS / would like", ruleVi: "He/She → WANTS / would like", example: "She wants to play. He'd like to sleep." },
  ],
  watchOut: [
    { mistake: "Saying 'want eat'", mistakeVi: "Nói 'want eat'", tip: "Always TO + base verb: 'want TO eat'.", tipVi: "Luôn TO + động từ nguyên: 'want TO eat'." },
    { mistake: "Saying 'would like eating'", mistakeVi: "Nói 'would like eating'", tip: "Would like + TO + base verb (not -ing).", tipVi: "Would like + TO + động từ nguyên (không -ing)." },
  ],
  practiceSet: [
    { instruction: "Pick the correct form", instructionVi: "Chọn dạng đúng", question: "I want ___ swimming.", options: ["go", "to go", "going", "goes"], answer: 1, explanation: "want + to + base verb.", explanationVi: "want + to + động từ nguyên." },
    { instruction: "Pick the polite form", instructionVi: "Chọn dạng lịch sự", question: "___ a glass of water, please.", options: ["I want", "I'd like", "I'd like to have", "I'm having"], answer: 2, explanation: "Polite request: I'd like to have.", explanationVi: "Yêu cầu lịch sự: I'd like to have." },
    { instruction: "Pick the verb form", instructionVi: "Chọn dạng động từ", question: "He ___ to be a doctor.", options: ["want", "wants", "wanting", "to want"], answer: 1, explanation: "He → wants.", explanationVi: "He → wants." },
  ],
  vocabulary: [
    { word: "want", meaning: "to wish for", meaningVi: "muốn", example: "I want to play." },
    { word: "would like", meaning: "polite want", meaningVi: "muốn (lịch sự)", example: "I'd like to help." },
    { word: "to-infinitive", meaning: "to + base verb", meaningVi: "to + động từ nguyên", example: "to eat, to go, to be" },
    { word: "wish", meaning: "hope for", meaningVi: "ước", example: "I wish to travel." },
  ],
  quiz: [
    { question: "She wants ___ a cake.", options: ["bake", "to bake", "baking", "bakes"], answer: 1, explanation: "want + to + base verb." },
    { question: "I'd like ___ a story, please.", options: ["hear", "to hear", "hearing", "hears"], answer: 1, explanation: "would like + to + base verb." },
    { question: "Which is most polite?", options: ["Give me water!", "I want water.", "I'd like some water, please.", "Water!"], answer: 2, explanation: "I'd like + please = polite." },
  ],
  parentInfo: "Polite requests with 'would like to' are essential for Movers Speaking. The to-infinitive structure also unlocks many future structures at higher levels.",
  parentInfoVi: "Yêu cầu lịch sự với 'would like to' rất cần ở Movers Nói. Cấu trúc to-infinitive cũng mở đường cho nhiều cấu trúc cao hơn.",
});

// =====================================================================
// FLYERS — 5 more grammar lessons
// =====================================================================

const flyersPresentPerfectEver = build({
  id: "cam-grammar-flyers-pp-ever",
  level: "flyers", icon: "🌟",
  title: "Have You Ever…? Present Perfect for Experience",
  titleVi: "Have You Ever…? Hiện tại hoàn thành chỉ trải nghiệm",
  description: "Talk about life experiences with 'ever / never + past participle' — a Flyers Speaking favourite.",
  descriptionVi: "Nói về trải nghiệm cuộc sống với 'ever / never + quá khứ phân từ' — câu Flyers Nói rất hay gặp.",
  learningObjective: "Students will form questions and answers with present perfect + ever/never to describe experiences.",
  learningObjectiveVi: "Học sinh sẽ tạo câu hỏi và trả lời với hiện tại hoàn thành + ever/never.",
  examPattern: "Flyers Speaking Part 4: 'Have you ever been to the sea?' Children answer Yes/No + details.",
  examPatternVi: "Flyers Nói Phần 4: 'Have you ever been to the sea?' Trẻ trả lời Yes/No + chi tiết.",
  secretTip: "🔑 Have/Has + ever + V3 → question. Have/Has + never + V3 → negative experience.",
  secretTipVi: "🔑 Have/Has + ever + V3 → câu hỏi. Have/Has + never + V3 → trải nghiệm phủ định.",
  welcomeMessage: "🌟 Tell me about your adventures!",
  welcomeMessageVi: "🌟 Kể cho thầy về những cuộc phiêu lưu của bạn!",
  stepByStep: [
    { step: 1, title: "Pick HAVE or HAS", titleVi: "Chọn HAVE hoặc HAS", detail: "He/She/It → HAS. Others → HAVE.", detailVi: "He/She/It → HAS. Còn lại → HAVE." },
    { step: 2, title: "Add ever (Q) or never (-)", titleVi: "Thêm ever (câu hỏi) hoặc never (phủ định)", detail: "Have you EVER… / I have NEVER…", detailVi: "Have you EVER… / I have NEVER…" },
    { step: 3, title: "Use V3 (past participle)", titleVi: "Dùng V3 (quá khứ phân từ)", detail: "be→been, eat→eaten, see→seen, go→gone.", detailVi: "be→been, eat→eaten, see→seen, go→gone." },
  ],
  illustratedRules: [
    { icon: "✈️", rule: "Q: Have/Has + S + ever + V3?", ruleVi: "Câu hỏi: Have/Has + S + ever + V3?", example: "Have you ever flown in a plane?" },
    { icon: "🚫", rule: "Negative: S + have/has + never + V3", ruleVi: "Phủ định: S + have/has + never + V3", example: "I have never seen snow." },
    { icon: "✅", rule: "Yes-answer: Yes, S + have/has", ruleVi: "Trả lời Yes: Yes, S + have/has", example: "Yes, I have. / Yes, she has." },
  ],
  watchOut: [
    { mistake: "Using V2 instead of V3: 'Have you ever ate sushi?'", mistakeVi: "Dùng V2 thay V3: 'Have you ever ate sushi?'", tip: "Use V3 = past participle: 'eaten'.", tipVi: "Dùng V3 = quá khứ phân từ: 'eaten'." },
    { mistake: "Saying 'I have ever…'", mistakeVi: "Nói 'I have ever…'", tip: "EVER goes in questions only. Use NEVER or just have + V3 in statements.", tipVi: "EVER chỉ trong câu hỏi. Câu khẳng định dùng NEVER hoặc have + V3." },
  ],
  practiceSet: [
    { instruction: "Pick the correct form", instructionVi: "Chọn dạng đúng", question: "Have you ever ___ to Japan?", options: ["go", "went", "gone", "been"], answer: 3, explanation: "been = visited a place.", explanationVi: "been = đã đến nơi đó." },
    { instruction: "Pick the auxiliary", instructionVi: "Chọn trợ động từ", question: "___ she ever played tennis?", options: ["Have", "Has", "Did", "Does"], answer: 1, explanation: "she → has.", explanationVi: "she → has." },
    { instruction: "Form the negative", instructionVi: "Tạo phủ định", question: "I ___ ___ tried sushi before.", options: ["have / never", "never / have", "haven't / ever", "didn't / never"], answer: 0, explanation: "have + never + V3.", explanationVi: "have + never + V3." },
  ],
  vocabulary: [
    { word: "ever", meaning: "at any time (in questions)", meaningVi: "đã từng (trong câu hỏi)", example: "Have you ever swum?" },
    { word: "never", meaning: "not at any time", meaningVi: "chưa từng", example: "I have never seen a tiger." },
    { word: "been", meaning: "past participle of 'be'", meaningVi: "quá khứ phân từ của 'be'", example: "I've been to Paris." },
    { word: "gone", meaning: "past participle of 'go'", meaningVi: "quá khứ phân từ của 'go'", example: "She has gone home." },
  ],
  quiz: [
    { question: "Has he ___ visited Da Lat?", options: ["ever", "never", "yet", "before"], answer: 0, explanation: "Question with present perfect → ever." },
    { question: "I ___ ridden an elephant.", options: ["have ever", "have never", "haven't never", "didn't"], answer: 1, explanation: "have + never + V3." },
    { question: "Which is correct?", options: ["Have you ever saw a panda?", "Have you ever seen a panda?", "Did you ever seen a panda?", "Have you ever see a panda?"], answer: 1, explanation: "have + ever + V3 (seen)." },
  ],
  parentInfo: "Present perfect with ever/never is the most natural way to share experiences. Mastering it lifts Speaking band from basic to confident.",
  parentInfoVi: "Hiện tại hoàn thành + ever/never là cách tự nhiên nhất để chia sẻ trải nghiệm. Nắm vững nâng band Nói từ cơ bản lên tự tin.",
});

const flyersFirstConditional = build({
  id: "cam-grammar-flyers-first-conditional",
  level: "flyers", icon: "🌦️",
  title: "First Conditional: If + Present, Will + Verb",
  titleVi: "Câu điều kiện loại 1: If + Hiện tại, Will + Động từ",
  description: "Talk about real future possibilities — the structure behind 'If it rains, we'll stay home'.",
  descriptionVi: "Nói về khả năng thật trong tương lai — cấu trúc đằng sau 'If it rains, we'll stay home'.",
  learningObjective: "Students will form first conditional sentences for real future situations.",
  learningObjectiveVi: "Học sinh sẽ tạo câu điều kiện loại 1 cho tình huống tương lai có thật.",
  examPattern: "Flyers Reading & Writing Part 6: 'If it ___ (rain), we'll cancel the picnic.'",
  examPatternVi: "Flyers Đọc & Viết Phần 6: 'If it ___ (rain), we'll cancel the picnic.'",
  secretTip: "🔑 Two halves: IF + present simple, , WILL + base verb. NEVER 'if + will'!",
  secretTipVi: "🔑 Hai vế: IF + hiện tại đơn, , WILL + động từ nguyên. KHÔNG BAO GIỜ 'if + will'!",
  welcomeMessage: "🌦️ What will happen if…? Let's predict!",
  welcomeMessageVi: "🌦️ Sẽ xảy ra gì nếu…? Cùng dự đoán!",
  stepByStep: [
    { step: 1, title: "Identify the condition", titleVi: "Xác định điều kiện", detail: "What needs to happen first?", detailVi: "Điều gì phải xảy ra trước?" },
    { step: 2, title: "Write IF + present simple", titleVi: "Viết IF + hiện tại đơn", detail: "If it rains, …", detailVi: "If it rains, …" },
    { step: 3, title: "Add result with WILL", titleVi: "Thêm kết quả với WILL", detail: "…, we will stay home.", detailVi: "…, we will stay home." },
  ],
  illustratedRules: [
    { icon: "☔", rule: "If + present, will + base verb", ruleVi: "If + hiện tại, will + động từ nguyên", example: "If it rains, we will stay home." },
    { icon: "🔄", rule: "Order can flip (no comma when WILL comes first)", ruleVi: "Có thể đảo vế (không cần dấu phẩy khi WILL trước)", example: "We will stay home if it rains." },
    { icon: "🚫", rule: "After IF: NEVER use 'will'", ruleVi: "Sau IF: KHÔNG dùng 'will'", example: "If you study, you will pass. (NOT: If you will study…)" },
  ],
  watchOut: [
    { mistake: "Putting 'will' after IF", mistakeVi: "Dùng 'will' sau IF", tip: "After IF use present simple only.", tipVi: "Sau IF chỉ dùng hiện tại đơn." },
    { mistake: "Forgetting -s with he/she/it after IF", mistakeVi: "Quên -s với he/she/it sau IF", tip: "'If she comes, …' not 'If she come…'", tipVi: "'If she comes, …' không phải 'If she come…'" },
  ],
  practiceSet: [
    { instruction: "Complete the sentence", instructionVi: "Hoàn thành câu", question: "If you study, you ___ pass.", options: ["will", "won't", "are", "would"], answer: 0, explanation: "Result clause → will + V.", explanationVi: "Vế kết quả → will + V." },
    { instruction: "Choose the IF-clause verb", instructionVi: "Chọn động từ vế IF", question: "If it ___ tomorrow, we'll stay in.", options: ["will rain", "rains", "rained", "rain"], answer: 1, explanation: "After IF → present simple (it rains).", explanationVi: "Sau IF → hiện tại đơn." },
    { instruction: "Pick the correct sentence", instructionVi: "Chọn câu đúng", question: "Choose:", options: ["If you will come, I will cook.", "If you come, I will cook.", "If you come, I cook.", "If you came, I cook."], answer: 1, explanation: "If + present, will + V.", explanationVi: "If + hiện tại, will + V." },
  ],
  vocabulary: [
    { word: "if", meaning: "introduces a condition", meaningVi: "nếu", example: "If it rains…" },
    { word: "will", meaning: "shows future result", meaningVi: "sẽ", example: "…we will stay." },
    { word: "won't", meaning: "will not (short)", meaningVi: "sẽ không", example: "We won't go." },
    { word: "unless", meaning: "if not", meaningVi: "trừ khi", example: "Unless it rains, we'll go." },
  ],
  quiz: [
    { question: "If you ___ early, you'll catch the bus.", options: ["will leave", "leave", "leaves", "left"], answer: 1, explanation: "After IF → present simple." },
    { question: "We ___ have a picnic if the weather is nice.", options: ["will", "are", "would", "do"], answer: 0, explanation: "Result → will." },
    { question: "Which is correct?", options: ["If it will snow, we will ski.", "If it snows, we will ski.", "If it snows, we ski.", "If snows, will ski."], answer: 1, explanation: "If + present, will + V." },
  ],
  parentInfo: "First conditional opens the door to predicting and planning — high-frequency in Flyers Speaking Part 4 prompts.",
  parentInfoVi: "Câu điều kiện loại 1 mở đường cho việc dự đoán và lập kế hoạch — xuất hiện nhiều ở Flyers Nói Phần 4.",
});

const flyersQuestionTags = build({
  id: "cam-grammar-flyers-question-tags",
  level: "flyers", icon: "🏷️",
  title: "Question Tags: …, isn't it? …, don't you?",
  titleVi: "Câu hỏi đuôi: …, isn't it? …, don't you?",
  description: "Add tiny mini-questions at the end of statements to check facts — a natural-sounding Flyers skill.",
  descriptionVi: "Thêm câu hỏi mini cuối câu để xác nhận — kỹ năng nghe tự nhiên ở Flyers.",
  learningObjective: "Students will form question tags by inverting the auxiliary and flipping positive/negative.",
  learningObjectiveVi: "Học sinh sẽ tạo câu hỏi đuôi bằng cách đảo trợ động từ và đổi khẳng/phủ định.",
  examPattern: "Flyers Listening Part 1 & Speaking: 'You like pizza, don't you?' Children must understand the tag.",
  examPatternVi: "Flyers Nghe Phần 1 & Nói: 'You like pizza, don't you?' Trẻ phải hiểu đuôi câu.",
  secretTip: "🔑 Positive statement → negative tag. Negative statement → positive tag. Use the same auxiliary.",
  secretTipVi: "🔑 Câu khẳng định → đuôi phủ định. Câu phủ định → đuôi khẳng định. Dùng cùng trợ động từ.",
  welcomeMessage: "🏷️ Let's add a question to every fact!",
  welcomeMessageVi: "🏷️ Cùng thêm câu hỏi vào mỗi sự thật!",
  stepByStep: [
    { step: 1, title: "Find the auxiliary", titleVi: "Tìm trợ động từ", detail: "is/are/was/were/do/does/can/will/have…", detailVi: "is/are/was/were/do/does/can/will/have…" },
    { step: 2, title: "Flip positive ↔ negative", titleVi: "Đảo khẳng ↔ phủ", detail: "is → isn't, do → don't.", detailVi: "is → isn't, do → don't." },
    { step: 3, title: "Add the pronoun", titleVi: "Thêm đại từ", detail: "Tom → he, the dogs → they.", detailVi: "Tom → he, the dogs → they." },
  ],
  illustratedRules: [
    { icon: "➕➖", rule: "Positive → negative tag: She is happy, isn't she?", ruleVi: "Khẳng định → đuôi phủ định", example: "It's cold, isn't it?" },
    { icon: "➖➕", rule: "Negative → positive tag: You don't like fish, do you?", ruleVi: "Phủ định → đuôi khẳng định", example: "He can't swim, can he?" },
    { icon: "🪄", rule: "No auxiliary? Use DO/DOES/DID", ruleVi: "Không có trợ động từ? Dùng DO/DOES/DID", example: "She likes apples, doesn't she?" },
  ],
  watchOut: [
    { mistake: "Keeping same polarity: 'She is nice, is she?'", mistakeVi: "Giữ nguyên tính: 'She is nice, is she?'", tip: "Flip it: 'She is nice, ISN'T she?'", tipVi: "Đảo: 'She is nice, ISN'T she?'" },
    { mistake: "Using a different auxiliary", mistakeVi: "Dùng trợ động từ khác", tip: "Use the SAME auxiliary as the statement.", tipVi: "Dùng cùng trợ động từ như câu chính." },
  ],
  practiceSet: [
    { instruction: "Add the tag", instructionVi: "Thêm đuôi", question: "It's hot today, ___?", options: ["is it", "isn't it", "doesn't it", "won't it"], answer: 1, explanation: "Positive → negative tag.", explanationVi: "Khẳng định → đuôi phủ định." },
    { instruction: "Add the tag", instructionVi: "Thêm đuôi", question: "You don't like onions, ___?", options: ["do you", "don't you", "are you", "aren't you"], answer: 0, explanation: "Negative → positive tag.", explanationVi: "Phủ định → đuôi khẳng định." },
    { instruction: "Add the tag", instructionVi: "Thêm đuôi", question: "She likes cake, ___?", options: ["does she", "doesn't she", "isn't she", "won't she"], answer: 1, explanation: "Likes (no aux) → doesn't she.", explanationVi: "Likes (không trợ) → doesn't she." },
  ],
  vocabulary: [
    { word: "isn't it", meaning: "negative tag for IS", meaningVi: "đuôi phủ định cho IS", example: "It's cold, isn't it?" },
    { word: "doesn't he", meaning: "negative tag for HE + V-s", meaningVi: "đuôi phủ định cho HE + V-s", example: "He sings, doesn't he?" },
    { word: "can you", meaning: "positive tag for can't", meaningVi: "đuôi khẳng định cho can't", example: "You can't swim, can you?" },
    { word: "will they", meaning: "positive tag for won't", meaningVi: "đuôi khẳng định cho won't", example: "They won't come, will they?" },
  ],
  quiz: [
    { question: "He can play guitar, ___?", options: ["can he", "can't he", "doesn't he", "isn't he"], answer: 1, explanation: "Positive can → can't he." },
    { question: "They aren't ready, ___?", options: ["are they", "aren't they", "do they", "don't they"], answer: 0, explanation: "Negative are → are they." },
    { question: "She studies hard, ___?", options: ["does she", "doesn't she", "isn't she", "won't she"], answer: 1, explanation: "studies → doesn't she." },
  ],
  parentInfo: "Question tags appear all through Flyers Listening. Mastering the polarity flip is the only trick needed.",
  parentInfoVi: "Câu hỏi đuôi xuất hiện xuyên suốt Flyers Nghe. Nắm phép đảo khẳng-phủ là đủ.",
});

const flyersTooEnough = build({
  id: "cam-grammar-flyers-too-enough",
  level: "flyers", icon: "⚖️",
  title: "Too vs Enough: Just the Right Amount",
  titleVi: "Too vs Enough: Vừa đủ",
  description: "Express 'more than needed' (too) or 'sufficient' (enough) with the right position and pattern.",
  descriptionVi: "Diễn đạt 'quá mức' (too) hay 'đủ' (enough) với vị trí và mẫu câu đúng.",
  learningObjective: "Students will place too BEFORE the adjective and enough AFTER it; use too + adj + to-inf and enough + noun.",
  learningObjectiveVi: "Học sinh sẽ đặt too TRƯỚC tính từ và enough SAU; dùng too + adj + to-inf và enough + danh từ.",
  examPattern: "Flyers Reading & Writing Part 4 & 6: 'It's too cold to swim.' 'I'm not tall enough.'",
  examPatternVi: "Flyers Đọc & Viết Phần 4 & 6: 'It's too cold to swim.' 'I'm not tall enough.'",
  secretTip: "🔑 too + adj (before) — adj + enough (after). Negative meaning hides in both!",
  secretTipVi: "🔑 too + adj (trước) — adj + enough (sau). Cả hai đều mang nghĩa phủ định ẩn!",
  welcomeMessage: "⚖️ Too much? Not enough? Let's balance it!",
  welcomeMessageVi: "⚖️ Quá nhiều? Chưa đủ? Cùng cân bằng!",
  stepByStep: [
    { step: 1, title: "Choose meaning", titleVi: "Chọn nghĩa", detail: "Too = MORE than needed. Enough = sufficient.", detailVi: "Too = QUÁ mức. Enough = vừa đủ." },
    { step: 2, title: "Place correctly", titleVi: "Đặt đúng chỗ", detail: "too BEFORE adj; enough AFTER adj; enough BEFORE noun.", detailVi: "too TRƯỚC tính từ; enough SAU tính từ; enough TRƯỚC danh từ." },
    { step: 3, title: "Add to-infinitive often", titleVi: "Thường thêm to-infinitive", detail: "too cold TO swim; old enough TO drive.", detailVi: "too cold TO swim; old enough TO drive." },
  ],
  illustratedRules: [
    { icon: "🥵", rule: "too + adj (+ to-inf): too hot to play", ruleVi: "too + tính từ (+ to-inf)", example: "It's too hot to play." },
    { icon: "🏀", rule: "adj + enough (+ to-inf): tall enough to reach", ruleVi: "tính từ + enough (+ to-inf)", example: "He's tall enough to reach the shelf." },
    { icon: "🪑", rule: "enough + noun: enough chairs", ruleVi: "enough + danh từ", example: "We have enough chairs." },
  ],
  watchOut: [
    { mistake: "Saying 'enough tall'", mistakeVi: "Nói 'enough tall'", tip: "After adjective: 'tall enough'.", tipVi: "Sau tính từ: 'tall enough'." },
    { mistake: "Saying 'too much hot'", mistakeVi: "Nói 'too much hot'", tip: "With adjectives use TOO alone: 'too hot'.", tipVi: "Với tính từ chỉ dùng TOO: 'too hot'." },
  ],
  practiceSet: [
    { instruction: "Pick the correct order", instructionVi: "Chọn trật tự đúng", question: "He's not ___ to ride the roller coaster.", options: ["enough tall", "tall enough", "too tall", "tall too"], answer: 1, explanation: "adj + enough.", explanationVi: "tính từ + enough." },
    { instruction: "Pick the correct word", instructionVi: "Chọn từ đúng", question: "It's ___ cold to go swimming today.", options: ["enough", "too", "so", "very"], answer: 1, explanation: "too + adj = more than needed.", explanationVi: "too + tính từ = quá mức." },
    { instruction: "Pick the correct pattern", instructionVi: "Chọn mẫu đúng", question: "We have ___ for everyone.", options: ["enough cookies", "cookies enough", "too cookies", "cookies too"], answer: 0, explanation: "enough + noun.", explanationVi: "enough + danh từ." },
  ],
  vocabulary: [
    { word: "too", meaning: "more than needed", meaningVi: "quá", example: "Too hot to drink." },
    { word: "enough", meaning: "sufficient", meaningVi: "đủ", example: "Tall enough." },
    { word: "not enough", meaning: "less than needed", meaningVi: "không đủ", example: "Not strong enough." },
    { word: "too much", meaning: "too + uncountable noun", meaningVi: "quá nhiều (không đếm được)", example: "Too much sugar." },
  ],
  quiz: [
    { question: "She's ___ young to drive.", options: ["enough", "too", "very enough", "much"], answer: 1, explanation: "too + adj." },
    { question: "Is the bag ___ for all your books?", options: ["enough big", "big enough", "too big", "much big"], answer: 1, explanation: "adj + enough." },
    { question: "We don't have ___ time.", options: ["enough", "too", "much enough", "very"], answer: 0, explanation: "enough + noun (time)." },
  ],
  parentInfo: "Too/enough is the #1 way to add nuance in Flyers Writing. Correct position is the only common error.",
  parentInfoVi: "Too/enough là cách số 1 để thêm sắc thái trong Flyers Viết. Sai vị trí là lỗi duy nhất hay gặp.",
});

const flyersUsedTo = build({
  id: "cam-grammar-flyers-used-to",
  level: "flyers", icon: "📼",
  title: "Used To: Past Habits That Stopped",
  titleVi: "Used To: Thói quen cũ đã dừng",
  description: "Talk about things you did regularly in the past but don't anymore — perfect for storytelling.",
  descriptionVi: "Nói về việc bạn từng làm thường xuyên nhưng giờ không nữa — hoàn hảo cho kể chuyện.",
  learningObjective: "Students will form positive, negative, and question sentences with 'used to + base verb'.",
  learningObjectiveVi: "Học sinh sẽ tạo câu khẳng định, phủ định và nghi vấn với 'used to + động từ nguyên'.",
  examPattern: "Flyers Reading & Writing Part 6 & Speaking: 'I used to play with dolls when I was 5.'",
  examPatternVi: "Flyers Đọc & Viết Phần 6 & Nói: 'I used to play with dolls when I was 5.'",
  secretTip: "🔑 Positive: USED to + V. Negative/Question: DIDN'T USE to / DID + S + USE to. The 'd' drops!",
  secretTipVi: "🔑 Khẳng định: USED to + V. Phủ định/Câu hỏi: DIDN'T USE to / DID + S + USE to. Chữ 'd' biến mất!",
  welcomeMessage: "📼 What did you USED to do?",
  welcomeMessageVi: "📼 Bạn đã TỪNG làm gì?",
  stepByStep: [
    { step: 1, title: "Identify the past habit", titleVi: "Nhận diện thói quen cũ", detail: "Done regularly before, not now.", detailVi: "Trước đây làm thường xuyên, nay không còn." },
    { step: 2, title: "Use USED TO + base verb", titleVi: "Dùng USED TO + động từ nguyên", detail: "I used to play piano.", detailVi: "I used to play piano." },
    { step: 3, title: "Flip with DID for –/?", titleVi: "Đổi sang DID cho – và ?", detail: "Did you USE to play? I didn't USE to like fish.", detailVi: "Did you USE to play? I didn't USE to like fish." },
  ],
  illustratedRules: [
    { icon: "✅", rule: "Positive: S + used to + base verb", ruleVi: "Khẳng định: S + used to + động từ nguyên", example: "She used to live in Hue." },
    { icon: "🚫", rule: "Negative: S + didn't use to + base verb", ruleVi: "Phủ định: S + didn't use to + động từ nguyên", example: "He didn't use to eat vegetables." },
    { icon: "❓", rule: "Question: Did + S + use to + base verb?", ruleVi: "Câu hỏi: Did + S + use to + động từ nguyên?", example: "Did you use to ride a bike to school?" },
  ],
  watchOut: [
    { mistake: "Saying 'I used to playing'", mistakeVi: "Nói 'I used to playing'", tip: "Use the BASE verb, not -ing.", tipVi: "Dùng động từ NGUYÊN, không -ing." },
    { mistake: "Keeping the 'd' in questions: 'Did you used to…?'", mistakeVi: "Giữ 'd' trong câu hỏi: 'Did you used to…?'", tip: "After DID/DIDN'T → drop the d: 'Did you USE to…?'", tipVi: "Sau DID/DIDN'T → bỏ d: 'Did you USE to…?'" },
  ],
  practiceSet: [
    { instruction: "Pick the verb form", instructionVi: "Chọn dạng động từ", question: "When I was little, I ___ to be afraid of dogs.", options: ["use", "used", "using", "uses"], answer: 1, explanation: "Positive past habit → used to.", explanationVi: "Thói quen quá khứ → used to." },
    { instruction: "Pick the negative form", instructionVi: "Chọn phủ định", question: "He ___ to wake up early.", options: ["didn't used", "didn't use", "doesn't use", "wasn't used"], answer: 1, explanation: "didn't + USE to.", explanationVi: "didn't + USE to." },
    { instruction: "Form the question", instructionVi: "Tạo câu hỏi", question: "___ you use to swim every weekend?", options: ["Do", "Did", "Are", "Were"], answer: 1, explanation: "Did + S + use to.", explanationVi: "Did + S + use to." },
  ],
  vocabulary: [
    { word: "used to", meaning: "past habit (stopped)", meaningVi: "đã từng (đã dừng)", example: "I used to play tennis." },
    { word: "didn't use to", meaning: "negative past habit", meaningVi: "không từng", example: "She didn't use to like coffee." },
    { word: "would (past habits)", meaning: "another way to say used to (action verbs only)", meaningVi: "cách khác (chỉ động từ hành động)", example: "We would walk to school." },
    { word: "no longer", meaning: "not anymore", meaningVi: "không còn", example: "I no longer live there." },
  ],
  quiz: [
    { question: "I ___ to love spicy food.", options: ["use", "used", "using", "am used"], answer: 1, explanation: "Positive: used to." },
    { question: "She didn't ___ to sing in public.", options: ["use", "used", "using", "uses"], answer: 0, explanation: "After DIDN'T → use to." },
    { question: "Which is correct?", options: ["Did you used to like school?", "Did you use to like school?", "Do you used to like school?", "You did use to like school?"], answer: 1, explanation: "Did + S + use to (no d)." },
  ],
  parentInfo: "Used to is a great storytelling tool. The 'd-drop' in negatives/questions is the only tricky part — and Flyers writers must know it.",
  parentInfoVi: "Used to là công cụ kể chuyện tuyệt vời. Việc 'bỏ d' trong phủ định/câu hỏi là điểm khó duy nhất — Flyers Viết phải biết.",
});

// =====================================================================
// KET — 5 more grammar lessons
// =====================================================================

const ketPastContinuous = build({
  id: "cam-grammar-ket-past-continuous",
  level: "ket", icon: "🎬",
  title: "Past Continuous vs Past Simple",
  titleVi: "Past Continuous vs Past Simple",
  description: "Set the scene with WAS/WERE + V-ing, then interrupt with past simple — the storytelling power combo.",
  descriptionVi: "Dựng bối cảnh bằng WAS/WERE + V-ing, rồi cắt ngang bằng past simple — bộ đôi kể chuyện.",
  learningObjective: "Students will use past continuous for ongoing actions and past simple for interrupting events.",
  learningObjectiveVi: "Học sinh sẽ dùng past continuous cho hành động đang xảy ra và past simple cho sự kiện cắt ngang.",
  examPattern: "KET Reading & Writing Part 7 & Listening Part 4: 'I was reading when he called.'",
  examPatternVi: "KET Đọc & Viết Phần 7 & Nghe Phần 4: 'I was reading when he called.'",
  secretTip: "🔑 Background = past continuous (was/were + V-ing). Sudden event = past simple. Linker = WHEN.",
  secretTipVi: "🔑 Nền = past continuous (was/were + V-ing). Sự kiện đột ngột = past simple. Liên từ = WHEN.",
  welcomeMessage: "🎬 Lights, camera, past action!",
  welcomeMessageVi: "🎬 Ánh sáng, máy quay, quá khứ!",
  stepByStep: [
    { step: 1, title: "Choose was/were", titleVi: "Chọn was/were", detail: "I/he/she/it → was. you/we/they → were.", detailVi: "I/he/she/it → was. you/we/they → were." },
    { step: 2, title: "Add V-ing for ongoing scene", titleVi: "Thêm V-ing cho cảnh đang diễn ra", detail: "was reading, were playing.", detailVi: "was reading, were playing." },
    { step: 3, title: "Add past simple after WHEN", titleVi: "Thêm past simple sau WHEN", detail: "…when the phone rang.", detailVi: "…when the phone rang." },
  ],
  illustratedRules: [
    { icon: "🎥", rule: "Past continuous: was/were + V-ing (longer background action)", ruleVi: "Past continuous: was/were + V-ing", example: "She was cooking dinner." },
    { icon: "⚡", rule: "Past simple: short, completed action", ruleVi: "Past simple: hành động ngắn, hoàn thành", example: "The lights went off." },
    { icon: "🔗", rule: "Combine with WHEN / WHILE", ruleVi: "Kết hợp với WHEN / WHILE", example: "She was cooking when the lights went off." },
  ],
  watchOut: [
    { mistake: "Using past simple for background scene", mistakeVi: "Dùng past simple cho cảnh nền", tip: "Background that LASTED → past continuous.", tipVi: "Cảnh nền KÉO DÀI → past continuous." },
    { mistake: "Saying 'was went'", mistakeVi: "Nói 'was went'", tip: "Past continuous = was/were + V-ING, not past simple verb.", tipVi: "Past continuous = was/were + V-ING, không phải past simple." },
  ],
  practiceSet: [
    { instruction: "Pick the correct tense", instructionVi: "Chọn thì đúng", question: "I ___ TV when you called.", options: ["watch", "watched", "was watching", "were watching"], answer: 2, explanation: "Background → was watching.", explanationVi: "Cảnh nền → was watching." },
    { instruction: "Pick the correct tense", instructionVi: "Chọn thì đúng", question: "While I was studying, my brother ___ in.", options: ["come", "came", "was coming", "comes"], answer: 1, explanation: "Sudden event → past simple.", explanationVi: "Sự kiện đột ngột → past simple." },
    { instruction: "Pick was or were", instructionVi: "Chọn was hoặc were", question: "They ___ playing football at 5 p.m.", options: ["was", "were", "is", "are"], answer: 1, explanation: "they → were.", explanationVi: "they → were." },
  ],
  vocabulary: [
    { word: "was", meaning: "to be (I/he/she/it past)", meaningVi: "to be quá khứ", example: "I was tired." },
    { word: "were", meaning: "to be (you/we/they past)", meaningVi: "to be quá khứ", example: "They were happy." },
    { word: "while", meaning: "during the same time", meaningVi: "trong khi", example: "While I cooked, he read." },
    { word: "when", meaning: "at the moment", meaningVi: "khi", example: "When he arrived, we ate." },
  ],
  quiz: [
    { question: "She ___ a shower when the bell rang.", options: ["takes", "took", "was taking", "is taking"], answer: 2, explanation: "Ongoing → was taking." },
    { question: "We ___ home when it started raining.", options: ["walk", "walked", "were walking", "are walking"], answer: 2, explanation: "Ongoing background → were walking." },
    { question: "Which sentence is correct?", options: ["I was sleep when he came.", "I sleeping when he came.", "I was sleeping when he came.", "I sleep when he came."], answer: 2, explanation: "was + V-ing." },
  ],
  parentInfo: "Mixing past continuous with past simple is the gold standard of KET storytelling. Mastery raises writing band noticeably.",
  parentInfoVi: "Kết hợp past continuous + past simple là chuẩn vàng kể chuyện ở KET. Nắm vững nâng band Viết rõ rệt.",
});

const ketQuantifiers = build({
  id: "cam-grammar-ket-quantifiers",
  level: "ket", icon: "📊",
  title: "Some, Any, Much, Many, A Lot Of",
  titleVi: "Some, Any, Much, Many, A Lot Of",
  description: "Choose the right quantifier by countable/uncountable and positive/negative/question.",
  descriptionVi: "Chọn lượng từ đúng theo đếm được/không đếm được và khẳng/phủ/nghi vấn.",
  learningObjective: "Students will pick the correct quantifier based on noun type and sentence type.",
  learningObjectiveVi: "Học sinh sẽ chọn lượng từ đúng theo loại danh từ và loại câu.",
  examPattern: "KET Reading & Writing Part 5: gap-fill with quantifiers.",
  examPatternVi: "KET Đọc & Viết Phần 5: điền lượng từ vào chỗ trống.",
  secretTip: "🔑 Positive → some/a lot of. Question/Negative → any/much/many. Countable → many. Uncountable → much.",
  secretTipVi: "🔑 Khẳng định → some/a lot of. Câu hỏi/Phủ định → any/much/many. Đếm được → many. Không đếm được → much.",
  welcomeMessage: "📊 How much? How many? Let's count!",
  welcomeMessageVi: "📊 Bao nhiêu? Cùng đếm!",
  stepByStep: [
    { step: 1, title: "Identify the noun", titleVi: "Xác định danh từ", detail: "Countable (books, apples) or Uncountable (water, money)?", detailVi: "Đếm được (books) hay không đếm được (water)?" },
    { step: 2, title: "Identify the sentence", titleVi: "Xác định loại câu", detail: "Positive / Negative / Question?", detailVi: "Khẳng định / Phủ định / Câu hỏi?" },
    { step: 3, title: "Pick the quantifier", titleVi: "Chọn lượng từ", detail: "some / any / much / many / a lot of.", detailVi: "some / any / much / many / a lot of." },
  ],
  illustratedRules: [
    { icon: "✅", rule: "Positive: some / a lot of (both types)", ruleVi: "Khẳng định: some / a lot of", example: "I have some milk and a lot of apples." },
    { icon: "❓", rule: "Question: any / how much / how many", ruleVi: "Câu hỏi: any / how much / how many", example: "Do you have any sugar? How many books?" },
    { icon: "🚫", rule: "Negative: any / much / many", ruleVi: "Phủ định: any / much / many", example: "I don't have any time / much money / many friends." },
  ],
  watchOut: [
    { mistake: "Using 'much' with countables: 'much books'", mistakeVi: "Dùng 'much' với danh từ đếm được", tip: "Countable → many. Uncountable → much.", tipVi: "Đếm được → many. Không đếm được → much." },
    { mistake: "Using 'any' in positive: 'I have any pens'", mistakeVi: "Dùng 'any' trong khẳng định", tip: "Positive → use SOME.", tipVi: "Khẳng định → dùng SOME." },
  ],
  practiceSet: [
    { instruction: "Pick the quantifier", instructionVi: "Chọn lượng từ", question: "I don't have ___ money.", options: ["some", "many", "much", "a lot"], answer: 2, explanation: "Negative + uncountable → much.", explanationVi: "Phủ định + không đếm được → much." },
    { instruction: "Pick the quantifier", instructionVi: "Chọn lượng từ", question: "How ___ apples do you want?", options: ["much", "many", "any", "some"], answer: 1, explanation: "Countable → many.", explanationVi: "Đếm được → many." },
    { instruction: "Pick the quantifier", instructionVi: "Chọn lượng từ", question: "There are ___ children in the park.", options: ["some", "any", "much", "a"], answer: 0, explanation: "Positive + countable → some.", explanationVi: "Khẳng định + đếm được → some." },
  ],
  vocabulary: [
    { word: "some", meaning: "a few/a little (positive)", meaningVi: "một vài (khẳng định)", example: "some water" },
    { word: "any", meaning: "for ? and –", meaningVi: "cho ? và –", example: "any milk?" },
    { word: "much", meaning: "lots of uncountable (–/?)", meaningVi: "nhiều (không đếm được)", example: "not much time" },
    { word: "many", meaning: "lots of countable (–/?)", meaningVi: "nhiều (đếm được)", example: "many friends" },
  ],
  quiz: [
    { question: "Do you have ___ brothers?", options: ["some", "any", "much", "a"], answer: 1, explanation: "Question → any." },
    { question: "We bought ___ bread for breakfast.", options: ["some", "any", "many", "few"], answer: 0, explanation: "Positive + uncountable → some." },
    { question: "There isn't ___ sugar left.", options: ["many", "much", "some", "a"], answer: 1, explanation: "Negative + uncountable → much." },
  ],
  parentInfo: "Quantifier rules are heavily tested in KET. The 'countable vs uncountable + sentence type' grid solves 90% of questions.",
  parentInfoVi: "Quy tắc lượng từ được kiểm tra nhiều ở KET. Bảng 'đếm được vs không đếm được + loại câu' giải 90% câu hỏi.",
});

const ketGerundInfinitive = build({
  id: "cam-grammar-ket-gerund-infinitive",
  level: "ket", icon: "🎭",
  title: "Verb + Gerund or To-Infinitive?",
  titleVi: "Động từ + V-ing hay To-Infinitive?",
  description: "Memorize the small groups of verbs that take -ing vs to-infinitive — a major KET test point.",
  descriptionVi: "Học thuộc nhóm động từ đi với -ing vs to-infinitive — điểm chính ở KET.",
  learningObjective: "Students will classify common verbs into +V-ing, +to-inf, or both, then apply correctly.",
  learningObjectiveVi: "Học sinh sẽ phân loại động từ theo +V-ing, +to-inf, hoặc cả hai, rồi áp dụng đúng.",
  examPattern: "KET Reading & Writing Part 5 & 6: 'She wants ___ (go) home.' 'I enjoy ___ (read).'",
  examPatternVi: "KET Đọc & Viết Phần 5 & 6.",
  secretTip: "🔑 +V-ing: enjoy, finish, mind, suggest, avoid, keep. +to-inf: want, decide, hope, plan, agree, promise.",
  secretTipVi: "🔑 +V-ing: enjoy, finish, mind, suggest, avoid, keep. +to-inf: want, decide, hope, plan, agree, promise.",
  welcomeMessage: "🎭 Two verbs in a row? Let's pick the right form!",
  welcomeMessageVi: "🎭 Hai động từ liền nhau? Chọn dạng đúng!",
  stepByStep: [
    { step: 1, title: "Look at verb 1", titleVi: "Nhìn động từ 1", detail: "Is it on the -ing list or to-inf list?", detailVi: "Nó thuộc danh sách -ing hay to-inf?" },
    { step: 2, title: "Apply the matching form", titleVi: "Áp dụng dạng tương ứng", detail: "enjoy + V-ing; want + to + V.", detailVi: "enjoy + V-ing; want + to + V." },
    { step: 3, title: "Watch for 'both' verbs", titleVi: "Chú ý động từ 'cả hai'", detail: "like / love / start / begin → both forms work.", detailVi: "like / love / start / begin → cả hai dạng đều được." },
  ],
  illustratedRules: [
    { icon: "🎨", rule: "+V-ing: enjoy, finish, mind, suggest, avoid, keep, practice", ruleVi: "+V-ing: enjoy, finish, mind, suggest, avoid, keep, practice", example: "I enjoy painting." },
    { icon: "🎯", rule: "+to-inf: want, decide, hope, plan, agree, promise, learn, need, would like", ruleVi: "+to-inf: want, decide, hope, plan, agree, promise, learn, need", example: "She decided to leave." },
    { icon: "♻️", rule: "Both: like, love, hate, start, begin, prefer", ruleVi: "Cả hai: like, love, hate, start, begin, prefer", example: "I like swimming / to swim." },
  ],
  watchOut: [
    { mistake: "Saying 'enjoy to read'", mistakeVi: "Nói 'enjoy to read'", tip: "ENJOY only takes -ing: 'enjoy reading'.", tipVi: "ENJOY chỉ đi với -ing." },
    { mistake: "Saying 'want playing'", mistakeVi: "Nói 'want playing'", tip: "WANT only takes to-inf: 'want to play'.", tipVi: "WANT chỉ đi với to-inf." },
  ],
  practiceSet: [
    { instruction: "Pick the form", instructionVi: "Chọn dạng", question: "She finished ___ her homework.", options: ["do", "to do", "doing", "did"], answer: 2, explanation: "finish + V-ing.", explanationVi: "finish + V-ing." },
    { instruction: "Pick the form", instructionVi: "Chọn dạng", question: "He decided ___ for a walk.", options: ["go", "to go", "going", "goes"], answer: 1, explanation: "decide + to-inf.", explanationVi: "decide + to-inf." },
    { instruction: "Pick the form", instructionVi: "Chọn dạng", question: "I love ___ to music. (both possible)", options: ["listen", "to listen", "listened", "to listening"], answer: 1, explanation: "love + to-inf works (or listening).", explanationVi: "love + to-inf đúng (hoặc listening)." },
  ],
  vocabulary: [
    { word: "enjoy", meaning: "+ V-ing", meaningVi: "+ V-ing", example: "enjoy reading" },
    { word: "decide", meaning: "+ to + V", meaningVi: "+ to + V", example: "decide to leave" },
    { word: "avoid", meaning: "+ V-ing", meaningVi: "+ V-ing", example: "avoid eating sugar" },
    { word: "promise", meaning: "+ to + V", meaningVi: "+ to + V", example: "promise to help" },
  ],
  quiz: [
    { question: "Would you mind ___ the door?", options: ["close", "to close", "closing", "closed"], answer: 2, explanation: "mind + V-ing." },
    { question: "We hope ___ you soon.", options: ["see", "to see", "seeing", "saw"], answer: 1, explanation: "hope + to-inf." },
    { question: "She suggested ___ a movie.", options: ["watch", "to watch", "watching", "watched"], answer: 2, explanation: "suggest + V-ing." },
  ],
  parentInfo: "Verb patterns are tested in nearly every KET reading paper. Drilling the 6+6 list eliminates the most common error type.",
  parentInfoVi: "Cấu trúc động từ được hỏi ở hầu hết bài KET Đọc. Học danh sách 6+6 loại bỏ lỗi phổ biến nhất.",
});

const ketPhrasalVerbs = build({
  id: "cam-grammar-ket-phrasal-verbs",
  level: "ket", icon: "🧩",
  title: "Phrasal Verbs: Everyday Verb + Particle Combos",
  titleVi: "Cụm động từ: Động từ + Tiểu từ thường ngày",
  description: "Learn the 20 most-tested KET phrasal verbs and how to split (or not split) them.",
  descriptionVi: "Học 20 cụm động từ được kiểm tra nhiều nhất ở KET và cách tách (hoặc không tách).",
  learningObjective: "Students will use common phrasal verbs and place pronoun objects correctly.",
  learningObjectiveVi: "Học sinh sẽ dùng cụm động từ phổ biến và đặt tân ngữ là đại từ đúng chỗ.",
  examPattern: "KET Reading & Writing Part 5 & Listening: 'turn on, look for, put on, get up…'",
  examPatternVi: "KET Đọc & Viết Phần 5 & Nghe.",
  secretTip: "🔑 Separable phrasal verb + PRONOUN must split: 'turn it on' (not 'turn on it'). With a noun: either order OK.",
  secretTipVi: "🔑 Cụm tách được + ĐẠI TỪ phải tách: 'turn it on' (không 'turn on it'). Với danh từ: cả hai trật tự đều được.",
  welcomeMessage: "🧩 Two-word verbs make English sound natural!",
  welcomeMessageVi: "🧩 Động từ hai từ giúp tiếng Anh tự nhiên!",
  stepByStep: [
    { step: 1, title: "Learn the meaning as a unit", titleVi: "Học nghĩa cả cụm", detail: "'look for' = search, not 'see for'.", detailVi: "'look for' = tìm kiếm." },
    { step: 2, title: "Check separable or not", titleVi: "Kiểm tra tách được hay không", detail: "Separable: turn on, put on, pick up. Inseparable: look for, listen to.", detailVi: "Tách được: turn on, put on, pick up. Không tách: look for, listen to." },
    { step: 3, title: "With pronoun → SPLIT", titleVi: "Với đại từ → TÁCH", detail: "'turn IT on', not 'turn on it'.", detailVi: "'turn IT on', không 'turn on it'." },
  ],
  illustratedRules: [
    { icon: "💡", rule: "turn on / turn off (separable)", ruleVi: "turn on / turn off (tách được)", example: "Turn on the light. / Turn it on." },
    { icon: "👕", rule: "put on / take off (separable)", ruleVi: "put on / take off (tách được)", example: "Put on your coat. / Put it on." },
    { icon: "🔍", rule: "look for / look after (inseparable)", ruleVi: "look for / look after (không tách)", example: "I'm looking for my keys." },
    { icon: "⏰", rule: "get up / wake up (no object)", ruleVi: "get up / wake up (không tân ngữ)", example: "I get up at 6." },
  ],
  watchOut: [
    { mistake: "Saying 'turn on it'", mistakeVi: "Nói 'turn on it'", tip: "With pronoun, separable verbs MUST split: 'turn it on'.", tipVi: "Với đại từ, cụm tách được PHẢI tách: 'turn it on'." },
    { mistake: "Splitting inseparable verbs: 'look it for'", mistakeVi: "Tách cụm không tách: 'look it for'", tip: "Inseparable stays together: 'look for it'.", tipVi: "Không tách: 'look for it'." },
  ],
  practiceSet: [
    { instruction: "Pick the correct order", instructionVi: "Chọn trật tự đúng", question: "It's dark — please ___ .", options: ["turn on it", "turn it on", "turn on", "it turn on"], answer: 1, explanation: "Pronoun → split: 'turn it on'.", explanationVi: "Đại từ → tách: 'turn it on'." },
    { instruction: "Pick the phrasal verb", instructionVi: "Chọn cụm động từ", question: "I can't find my book — I'm ___ it.", options: ["looking after", "looking for", "looking at", "looking up"], answer: 1, explanation: "look for = search.", explanationVi: "look for = tìm kiếm." },
    { instruction: "Pick the correct form", instructionVi: "Chọn dạng đúng", question: "She ___ at 7 a.m. every day.", options: ["gets up", "get up", "getting up", "got up"], answer: 0, explanation: "she → gets up.", explanationVi: "she → gets up." },
  ],
  vocabulary: [
    { word: "turn on/off", meaning: "start/stop a machine", meaningVi: "bật/tắt", example: "Turn off the TV." },
    { word: "put on", meaning: "wear", meaningVi: "mặc vào", example: "Put on a hat." },
    { word: "look for", meaning: "search", meaningVi: "tìm", example: "I'm looking for my pen." },
    { word: "get up", meaning: "leave bed", meaningVi: "thức dậy", example: "Get up early." },
  ],
  quiz: [
    { question: "Please ___ your shoes before entering.", options: ["take off", "take on", "take in", "take of"], answer: 0, explanation: "take off = remove." },
    { question: "I always ___ at 6 a.m.", options: ["wake on", "wake up", "wake for", "wake to"], answer: 1, explanation: "wake up = stop sleeping." },
    { question: "Which is correct?", options: ["Turn on it.", "Turn it on.", "On turn it.", "It on turn."], answer: 1, explanation: "Pronoun must split separable phrasal verb." },
  ],
  parentInfo: "Phrasal verbs appear in every KET Listening track. Learning the top 20 plus the pronoun-split rule covers most exam needs.",
  parentInfoVi: "Cụm động từ xuất hiện trong mọi bài Nghe KET. Học top 20 + quy tắc tách đại từ là đủ.",
});

const ketComparativesAdv = build({
  id: "cam-grammar-ket-comparative-adv",
  level: "ket", icon: "🚀",
  title: "Comparative & Superlative of Adverbs",
  titleVi: "So sánh hơn & nhất của Trạng từ",
  description: "Compare HOW actions happen using more …ly / the most …ly and irregulars like better/worst.",
  descriptionVi: "So sánh CÁCH hành động xảy ra bằng more …ly / the most …ly và bất quy tắc như better/worst.",
  learningObjective: "Students will form comparative and superlative adverbs and irregular forms.",
  learningObjectiveVi: "Học sinh sẽ tạo dạng so sánh hơn và nhất của trạng từ, kể cả bất quy tắc.",
  examPattern: "KET Reading & Writing Part 5: 'She runs ___ (fast) than me.'",
  examPatternVi: "KET Đọc & Viết Phần 5.",
  secretTip: "🔑 -ly adverbs → MORE ___ly / THE MOST ___ly. Short ones (fast, hard) → -er / -est. Irregulars: well→better→best · badly→worse→worst.",
  secretTipVi: "🔑 Trạng từ -ly → MORE ___ly / THE MOST ___ly. Trạng từ ngắn (fast, hard) → -er / -est. Bất quy tắc: well→better→best · badly→worse→worst.",
  welcomeMessage: "🚀 Faster, more carefully, the best — let's compare!",
  welcomeMessageVi: "🚀 Nhanh hơn, cẩn thận hơn, tốt nhất — cùng so sánh!",
  stepByStep: [
    { step: 1, title: "Identify the adverb", titleVi: "Xác định trạng từ", detail: "fast, hard, quickly, carefully…", detailVi: "fast, hard, quickly, carefully…" },
    { step: 2, title: "Short vs -ly form", titleVi: "Dạng ngắn vs -ly", detail: "Short: fast → faster → fastest. -ly: quickly → more quickly → the most quickly.", detailVi: "Ngắn: fast → faster → fastest. -ly: more/most." },
    { step: 3, title: "Add THAN / THE", titleVi: "Thêm THAN / THE", detail: "comparative + THAN; superlative needs THE.", detailVi: "comparative + THAN; superlative cần THE." },
  ],
  illustratedRules: [
    { icon: "🏎️", rule: "Short adverb: fast → faster → fastest", ruleVi: "Trạng từ ngắn: fast → faster → fastest", example: "He runs faster than me." },
    { icon: "🐢", rule: "-ly adverb: carefully → more carefully → the most carefully", ruleVi: "Trạng từ -ly: more / the most", example: "Drive more carefully!" },
    { icon: "⭐", rule: "Irregular: well→better→best, badly→worse→worst", ruleVi: "Bất quy tắc: well→better→best", example: "She sings better than him." },
  ],
  watchOut: [
    { mistake: "Saying 'more fast'", mistakeVi: "Nói 'more fast'", tip: "Short adverb → add -er: 'faster'.", tipVi: "Trạng từ ngắn → thêm -er." },
    { mistake: "Saying 'good' instead of 'well'", mistakeVi: "Nói 'good' thay 'well'", tip: "Adverb of 'good' is WELL (irregular). Comparative: better.", tipVi: "Trạng từ của good là WELL. So sánh: better." },
  ],
  practiceSet: [
    { instruction: "Pick the form", instructionVi: "Chọn dạng", question: "She speaks English ___ than me.", options: ["good", "better", "best", "more good"], answer: 1, explanation: "well → better.", explanationVi: "well → better." },
    { instruction: "Pick the form", instructionVi: "Chọn dạng", question: "He drives ___ (careful) than his sister.", options: ["carefuller", "more careful", "more carefully", "most carefully"], answer: 2, explanation: "-ly + more.", explanationVi: "-ly + more." },
    { instruction: "Pick the form", instructionVi: "Chọn dạng", question: "Of all the kids, Tom runs ___.", options: ["fast", "faster", "the fastest", "more fast"], answer: 2, explanation: "Superlative → the fastest.", explanationVi: "Nhất → the fastest." },
  ],
  vocabulary: [
    { word: "faster", meaning: "more quickly (short)", meaningVi: "nhanh hơn", example: "run faster" },
    { word: "more carefully", meaning: "comparative of carefully", meaningVi: "cẩn thận hơn", example: "drive more carefully" },
    { word: "better", meaning: "comparative of well", meaningVi: "tốt hơn", example: "play better" },
    { word: "the best", meaning: "superlative of well", meaningVi: "tốt nhất", example: "sing the best" },
  ],
  quiz: [
    { question: "He works ___ than me.", options: ["hard", "harder", "more hard", "hardest"], answer: 1, explanation: "Short adverb → -er." },
    { question: "She dances ___ in the class.", options: ["the best", "the better", "the goodest", "most good"], answer: 0, explanation: "Irregular superlative: the best." },
    { question: "Please speak ___ (quiet).", options: ["quieter", "more quietly", "most quietly", "quietest"], answer: 1, explanation: "-ly adverb → more quietly." },
  ],
  parentInfo: "Comparative adverbs appear in KET Writing Part 7. Knowing the -er / more / irregular pattern unlocks higher band scores.",
  parentInfoVi: "So sánh trạng từ xuất hiện ở KET Viết Phần 7. Biết mẫu -er / more / bất quy tắc mở khoá band cao hơn.",
});

// =====================================================================
// PET — 5 more grammar lessons
// =====================================================================

const petSecondConditional = build({
  id: "cam-grammar-pet-second-conditional",
  level: "pet", icon: "🌠",
  title: "Second Conditional: If I Were You…",
  titleVi: "Câu điều kiện loại 2: If I Were You…",
  description: "Talk about imaginary or unlikely situations and give advice — a PET Writing favourite.",
  descriptionVi: "Nói về tình huống tưởng tượng hoặc khó xảy ra và cho lời khuyên — câu PET Viết rất hay gặp.",
  learningObjective: "Students will form second conditional sentences with past simple + would + base verb.",
  learningObjectiveVi: "Học sinh sẽ tạo câu điều kiện loại 2 với quá khứ đơn + would + động từ nguyên.",
  examPattern: "PET Writing Part 3 (article/email) & Speaking Part 4: 'If I had more money, I would travel.'",
  examPatternVi: "PET Viết Phần 3 & Nói Phần 4.",
  secretTip: "🔑 If + past simple, , would + base verb. With BE always use 'WERE' (I were, he were) in formal English.",
  secretTipVi: "🔑 If + quá khứ đơn, , would + động từ nguyên. Với BE luôn dùng 'WERE' trong tiếng Anh chuẩn.",
  welcomeMessage: "🌠 If you could… what would you do?",
  welcomeMessageVi: "🌠 Nếu có thể… bạn sẽ làm gì?",
  stepByStep: [
    { step: 1, title: "Imagine an unreal situation", titleVi: "Tưởng tượng tình huống không thật", detail: "Now or future, but unlikely.", detailVi: "Hiện tại/tương lai, nhưng khó xảy ra." },
    { step: 2, title: "Use IF + past simple", titleVi: "Dùng IF + quá khứ đơn", detail: "If I had a car… If she lived here…", detailVi: "If I had a car… If she lived here…" },
    { step: 3, title: "Add WOULD + base verb", titleVi: "Thêm WOULD + động từ nguyên", detail: ", I would drive everywhere.", detailVi: ", I would drive everywhere." },
  ],
  illustratedRules: [
    { icon: "🪄", rule: "If + past simple, would + base verb", ruleVi: "If + quá khứ đơn, would + động từ nguyên", example: "If I had wings, I would fly." },
    { icon: "🧠", rule: "Use WERE with all subjects for BE", ruleVi: "Với BE luôn dùng WERE", example: "If I were you, I would study harder." },
    { icon: "💡", rule: "Common use: ADVICE with 'If I were you'", ruleVi: "Dùng phổ biến: KHUYÊN với 'If I were you'", example: "If I were you, I'd apologise." },
  ],
  watchOut: [
    { mistake: "Saying 'If I would have…'", mistakeVi: "Nói 'If I would have…'", tip: "Use past simple after IF, never 'would'.", tipVi: "Sau IF dùng quá khứ đơn, không 'would'." },
    { mistake: "Saying 'If I was you'", mistakeVi: "Nói 'If I was you'", tip: "In formal/exam English use WERE for all subjects.", tipVi: "Trong tiếng Anh chuẩn/thi dùng WERE cho mọi chủ ngữ." },
  ],
  practiceSet: [
    { instruction: "Complete the sentence", instructionVi: "Hoàn thành câu", question: "If I ___ rich, I would travel the world.", options: ["am", "was", "were", "would be"], answer: 2, explanation: "Formal: WERE for all subjects.", explanationVi: "Chuẩn: WERE cho mọi chủ ngữ." },
    { instruction: "Complete the sentence", instructionVi: "Hoàn thành câu", question: "If she had time, she ___ exercise more.", options: ["will", "would", "is going to", "does"], answer: 1, explanation: "Second conditional → would.", explanationVi: "Điều kiện loại 2 → would." },
    { instruction: "Pick correct form", instructionVi: "Chọn dạng đúng", question: "If we ___ a car, we would visit you.", options: ["have", "had", "would have", "having"], answer: 1, explanation: "After IF → past simple.", explanationVi: "Sau IF → quá khứ đơn." },
  ],
  vocabulary: [
    { word: "would", meaning: "imagined result", meaningVi: "sẽ (tưởng tượng)", example: "I would travel." },
    { word: "were", meaning: "BE for all subjects in 2nd conditional", meaningVi: "BE cho mọi chủ ngữ trong loại 2", example: "If I were you…" },
    { word: "I'd", meaning: "short of I would", meaningVi: "viết tắt I would", example: "I'd love to." },
    { word: "could", meaning: "would be able to", meaningVi: "có thể (tưởng tượng)", example: "I could fly." },
  ],
  quiz: [
    { question: "If I ___ a superpower, I would help people.", options: ["have", "had", "would have", "having"], answer: 1, explanation: "After IF → past simple (had)." },
    { question: "He ___ buy a house if he had the money.", options: ["will", "would", "is", "does"], answer: 1, explanation: "Result → would + base verb." },
    { question: "Which sentence sounds best as advice?", options: ["If I am you, I will study.", "If I were you, I would study.", "If I would be you, I will study.", "If I was you, I will study."], answer: 1, explanation: "Standard: If I WERE you, I WOULD…" },
  ],
  parentInfo: "Second conditional is a PET Writing scoring booster. The 'If I were you' advice frame is highly reusable in emails and articles.",
  parentInfoVi: "Câu điều kiện loại 2 là 'cú hích' điểm PET Viết. Mẫu 'If I were you' cho khuyên rất tái sử dụng.",
});

const petModalsDeduction = build({
  id: "cam-grammar-pet-modals-deduction",
  level: "pet", icon: "🕵️",
  title: "Modals of Deduction: Must / Might / Can't Be",
  titleVi: "Modal phỏng đoán: Must / Might / Can't Be",
  description: "Make logical guesses about now and the past with must / might / can't + base verb.",
  descriptionVi: "Phỏng đoán logic về hiện tại và quá khứ với must / might / can't + động từ nguyên.",
  learningObjective: "Students will choose must (sure positive), might (possible), can't (sure negative) for deductions.",
  learningObjectiveVi: "Học sinh sẽ chọn must (chắc chắn dương), might (có thể), can't (chắc chắn âm) để phỏng đoán.",
  examPattern: "PET Reading Part 5 & Listening: 'She must be tired — she's been studying all night.'",
  examPatternVi: "PET Đọc Phần 5 & Nghe.",
  secretTip: "🔑 SURE yes = must · MAYBE = might/may/could · SURE no = can't. All + base verb for present.",
  secretTipVi: "🔑 CHẮC CÓ = must · CÓ THỂ = might/may/could · CHẮC KHÔNG = can't. Tất cả + động từ nguyên cho hiện tại.",
  welcomeMessage: "🕵️ Detective time! Let's deduce!",
  welcomeMessageVi: "🕵️ Giờ thám tử! Cùng suy luận!",
  stepByStep: [
    { step: 1, title: "Estimate certainty", titleVi: "Ước lượng độ chắc chắn", detail: "100% yes / 50% / 100% no?", detailVi: "100% có / 50% / 100% không?" },
    { step: 2, title: "Pick the modal", titleVi: "Chọn modal", detail: "must / might / can't.", detailVi: "must / might / can't." },
    { step: 3, title: "Add base verb (or BE)", titleVi: "Thêm động từ nguyên (hoặc BE)", detail: "must be, might know, can't have it.", detailVi: "must be, might know, can't have it." },
  ],
  illustratedRules: [
    { icon: "🎯", rule: "must + base verb = sure positive deduction", ruleVi: "must + động từ nguyên = chắc chắn có", example: "He must be at home — his car is here." },
    { icon: "🤷", rule: "might / may / could + base verb = possible", ruleVi: "might / may / could + động từ nguyên = có thể", example: "She might be in the library." },
    { icon: "❌", rule: "can't + base verb = sure negative", ruleVi: "can't + động từ nguyên = chắc chắn không", example: "He can't be at school — it's Sunday!" },
  ],
  watchOut: [
    { mistake: "Using 'mustn't' for deduction", mistakeVi: "Dùng 'mustn't' để phỏng đoán", tip: "MUSTN'T = prohibition. For sure-negative deduction use CAN'T.", tipVi: "MUSTN'T = cấm. Để phỏng đoán chắc chắn không, dùng CAN'T." },
    { mistake: "Adding -s after modal: 'must goes'", mistakeVi: "Thêm -s sau modal: 'must goes'", tip: "After any modal: BASE verb only.", tipVi: "Sau modal: chỉ động từ NGUYÊN." },
  ],
  practiceSet: [
    { instruction: "Pick the modal", instructionVi: "Chọn modal", question: "The lights are on. They ___ be at home.", options: ["might", "must", "can't", "should"], answer: 1, explanation: "Evidence → sure positive → must.", explanationVi: "Bằng chứng → chắc có → must." },
    { instruction: "Pick the modal", instructionVi: "Chọn modal", question: "He ___ be hungry — he just ate.", options: ["must", "might", "can't", "should"], answer: 2, explanation: "Sure negative → can't.", explanationVi: "Chắc không → can't." },
    { instruction: "Pick the modal", instructionVi: "Chọn modal", question: "She isn't answering. She ___ be busy.", options: ["must", "might", "can't", "won't"], answer: 1, explanation: "Possible → might.", explanationVi: "Có thể → might." },
  ],
  vocabulary: [
    { word: "must be", meaning: "sure positive", meaningVi: "chắc chắn là", example: "It must be cold outside." },
    { word: "might be", meaning: "possibly", meaningVi: "có thể là", example: "He might be late." },
    { word: "can't be", meaning: "sure negative", meaningVi: "chắc chắn không", example: "That can't be true." },
    { word: "could be", meaning: "possibly (like might)", meaningVi: "có thể (như might)", example: "It could be raining." },
  ],
  quiz: [
    { question: "He's not at work today. He ___ sick.", options: ["might be", "must be", "can't be", "couldn't be"], answer: 0, explanation: "Possible reason → might be." },
    { question: "She speaks 5 languages! She ___ very smart.", options: ["might", "must be", "can't be", "isn't"], answer: 1, explanation: "Strong evidence → must be." },
    { question: "That ___ Lan — she's in Da Nang.", options: ["must be", "might be", "can't be", "should be"], answer: 2, explanation: "Sure not → can't be." },
  ],
  parentInfo: "Modals of deduction lift PET Speaking from describing to interpreting. Knowing the certainty scale is the key.",
  parentInfoVi: "Modal phỏng đoán nâng PET Nói từ mô tả lên diễn giải. Biết thang độ chắc chắn là chìa khoá.",
});

const petWish = build({
  id: "cam-grammar-pet-wish",
  level: "pet", icon: "🌟",
  title: "I Wish + Past Simple / Would",
  titleVi: "I Wish + Quá khứ đơn / Would",
  description: "Express regrets and impossible desires about now and the past.",
  descriptionVi: "Diễn đạt tiếc nuối và mong muốn không thể có thật về hiện tại và quá khứ.",
  learningObjective: "Students will use I wish + past simple for present regrets and I wish + would for annoying habits.",
  learningObjectiveVi: "Học sinh sẽ dùng I wish + quá khứ đơn cho tiếc nuối hiện tại và I wish + would cho thói quen phiền.",
  examPattern: "PET Writing Part 3 (story/article): 'I wish I had more time.' 'I wish she would stop talking.'",
  examPatternVi: "PET Viết Phần 3.",
  secretTip: "🔑 Wish about NOW → past simple. Wish about annoying habit → would. Wish about PAST → past perfect (advanced).",
  secretTipVi: "🔑 Tiếc HIỆN TẠI → quá khứ đơn. Thói quen phiền → would. Tiếc QUÁ KHỨ → quá khứ hoàn thành (nâng cao).",
  welcomeMessage: "🌟 What would you change if you could?",
  welcomeMessageVi: "🌟 Bạn muốn đổi điều gì nếu có thể?",
  stepByStep: [
    { step: 1, title: "Choose the time frame", titleVi: "Chọn thời gian", detail: "Now / annoying habit / past?", detailVi: "Hiện tại / thói quen phiền / quá khứ?" },
    { step: 2, title: "Pick the verb form", titleVi: "Chọn dạng động từ", detail: "Now → past simple. Habit → would + V.", detailVi: "Hiện tại → quá khứ đơn. Thói quen → would + V." },
    { step: 3, title: "Use WERE with BE", titleVi: "Dùng WERE với BE", detail: "I wish I WERE taller.", detailVi: "I wish I WERE taller." },
  ],
  illustratedRules: [
    { icon: "🕰️", rule: "Wish about NOW: I wish + past simple", ruleVi: "Tiếc HIỆN TẠI: I wish + quá khứ đơn", example: "I wish I had a bigger house." },
    { icon: "😤", rule: "Wish about annoying habit: I wish + would + V", ruleVi: "Tiếc thói quen phiền: I wish + would + V", example: "I wish you would stop shouting." },
    { icon: "🧠", rule: "Use WERE for BE", ruleVi: "Với BE dùng WERE", example: "I wish I were taller." },
  ],
  watchOut: [
    { mistake: "Using PRESENT after wish: 'I wish I have…'", mistakeVi: "Dùng HIỆN TẠI sau wish", tip: "Use PAST SIMPLE: 'I wish I had…'", tipVi: "Dùng QUÁ KHỨ ĐƠN: 'I wish I had…'" },
    { mistake: "Using would for own habits: 'I wish I would study more'", mistakeVi: "Dùng would cho thói quen của chính mình", tip: "WOULD is for OTHER people's annoying habits, not yourself.", tipVi: "WOULD dùng cho thói quen của NGƯỜI KHÁC, không phải bản thân." },
  ],
  practiceSet: [
    { instruction: "Pick the form", instructionVi: "Chọn dạng", question: "I wish I ___ more free time.", options: ["have", "had", "would have", "having"], answer: 1, explanation: "Wish about now → past simple.", explanationVi: "Tiếc hiện tại → quá khứ đơn." },
    { instruction: "Pick the form", instructionVi: "Chọn dạng", question: "I wish you ___ talking during the movie.", options: ["stop", "stopped", "would stop", "had stopped"], answer: 2, explanation: "Annoying habit → would + V.", explanationVi: "Thói quen phiền → would + V." },
    { instruction: "Pick the form", instructionVi: "Chọn dạng", question: "He wishes he ___ taller.", options: ["is", "was", "were", "would be"], answer: 2, explanation: "Formal: WERE for all subjects.", explanationVi: "Chuẩn: WERE cho mọi chủ ngữ." },
  ],
  vocabulary: [
    { word: "wish", meaning: "express a desire", meaningVi: "ước", example: "I wish I could fly." },
    { word: "regret", meaning: "feel sorry about", meaningVi: "tiếc", example: "I regret saying that." },
    { word: "hope", meaning: "want for the future", meaningVi: "hy vọng", example: "I hope it rains." },
    { word: "if only", meaning: "stronger 'I wish'", meaningVi: "giá mà (mạnh hơn wish)", example: "If only I knew!" },
  ],
  quiz: [
    { question: "I wish it ___ raining.", options: ["stop", "stops", "stopped", "would stop"], answer: 3, explanation: "Annoying current action → would stop." },
    { question: "She wishes she ___ a car.", options: ["has", "had", "have", "having"], answer: 1, explanation: "Wish about now → had." },
    { question: "Which sounds best?", options: ["I wish I am rich.", "I wish I was rich.", "I wish I were rich.", "I wish I would be rich."], answer: 2, explanation: "Standard: WERE for all subjects." },
  ],
  parentInfo: "Wish structures add emotion and band-7 fluency to PET Writing. The 3 patterns (now / habit / past) cover every test scenario.",
  parentInfoVi: "Cấu trúc wish thêm cảm xúc và độ trôi chảy band-7 cho PET Viết. 3 mẫu (hiện tại/thói quen/quá khứ) phủ mọi tình huống thi.",
});

const petCausative = build({
  id: "cam-grammar-pet-causative-have",
  level: "pet", icon: "🛠️",
  title: "Causative Have: Have Something Done",
  titleVi: "Causative Have: Have Something Done",
  description: "Say someone else did a job for you with HAVE + object + past participle.",
  descriptionVi: "Nói ai đó làm việc gì cho bạn bằng HAVE + tân ngữ + quá khứ phân từ.",
  learningObjective: "Students will form sentences with have + object + V3 to describe arranged services.",
  learningObjectiveVi: "Học sinh sẽ tạo câu với have + tân ngữ + V3 để mô tả dịch vụ được sắp xếp.",
  examPattern: "PET Reading & Writing Part 5 & 6: 'I had my hair cut yesterday.'",
  examPatternVi: "PET Đọc & Viết Phần 5 & 6.",
  secretTip: "🔑 You don't do it — someone does it FOR you. Form: HAVE + thing + V3. Tense lives in HAVE.",
  secretTipVi: "🔑 Bạn không làm — người khác làm CHO bạn. Mẫu: HAVE + vật + V3. Thì nằm ở HAVE.",
  welcomeMessage: "🛠️ Get things done by others — say it the smart way!",
  welcomeMessageVi: "🛠️ Nhờ người khác làm — nói cho thật chuẩn!",
  stepByStep: [
    { step: 1, title: "Identify the SERVICE", titleVi: "Xác định DỊCH VỤ", detail: "Hair cut, car fixed, photo taken…", detailVi: "Cắt tóc, sửa xe, chụp ảnh…" },
    { step: 2, title: "Conjugate HAVE", titleVi: "Chia HAVE", detail: "have / has / had / will have / am having…", detailVi: "have / has / had / will have / am having…" },
    { step: 3, title: "Add object + V3", titleVi: "Thêm tân ngữ + V3", detail: "had + my car + repaired.", detailVi: "had + my car + repaired." },
  ],
  illustratedRules: [
    { icon: "✂️", rule: "have + thing + V3 (someone else does it)", ruleVi: "have + vật + V3", example: "I have my hair cut every month." },
    { icon: "🚗", rule: "Past: had + thing + V3", ruleVi: "Quá khứ: had + vật + V3", example: "She had her car washed yesterday." },
    { icon: "🔮", rule: "Future: will have + thing + V3", ruleVi: "Tương lai: will have + vật + V3", example: "I'll have this letter translated." },
  ],
  watchOut: [
    { mistake: "Putting V3 first: 'I had cut my hair'", mistakeVi: "Đặt V3 trước: 'I had cut my hair'", tip: "Order: HAVE + THING + V3 → 'I had my hair cut'.", tipVi: "Trật tự: HAVE + VẬT + V3." },
    { mistake: "Using base verb: 'have my car repair'", mistakeVi: "Dùng động từ nguyên: 'have my car repair'", tip: "Use the past participle (V3): 'repaired'.", tipVi: "Dùng quá khứ phân từ (V3): 'repaired'." },
  ],
  practiceSet: [
    { instruction: "Pick the form", instructionVi: "Chọn dạng", question: "She had her photo ___ at the studio.", options: ["take", "took", "taken", "taking"], answer: 2, explanation: "V3 of take = taken.", explanationVi: "V3 của take = taken." },
    { instruction: "Pick the order", instructionVi: "Chọn trật tự", question: "I'm going to ___ next week.", options: ["have my eyes test", "have tested my eyes", "have my eyes tested", "test my eyes"], answer: 2, explanation: "have + object + V3.", explanationVi: "have + tân ngữ + V3." },
    { instruction: "Pick the auxiliary", instructionVi: "Chọn trợ động từ", question: "He ___ his bike fixed yesterday.", options: ["have", "has", "had", "having"], answer: 2, explanation: "Past → had.", explanationVi: "Quá khứ → had." },
  ],
  vocabulary: [
    { word: "have something done", meaning: "arrange a service", meaningVi: "thu xếp dịch vụ", example: "have my hair cut" },
    { word: "get something done", meaning: "informal version", meaningVi: "cách nói thân mật", example: "get my car washed" },
    { word: "past participle", meaning: "V3 form", meaningVi: "quá khứ phân từ", example: "done, taken, made" },
    { word: "service", meaning: "work done by someone", meaningVi: "dịch vụ", example: "a haircut service" },
  ],
  quiz: [
    { question: "I need to have my passport ___ .", options: ["renew", "renewed", "renewing", "renews"], answer: 1, explanation: "have + object + V3 (renewed)." },
    { question: "She ___ her wedding photos taken last summer.", options: ["have", "has", "had", "having"], answer: 2, explanation: "Past → had." },
    { question: "Which is correct?", options: ["I had cut my hair.", "I had my hair cut.", "I had my hair cutting.", "I cut had my hair."], answer: 1, explanation: "have + thing + V3." },
  ],
  parentInfo: "The causative is what separates 'I cut my hair' (you did it!) from 'I had my hair cut' (the salon did it). A PET high-frequency structure.",
  parentInfoVi: "Causative phân biệt 'I cut my hair' (bạn tự cắt!) với 'I had my hair cut' (tiệm cắt). Cấu trúc xuất hiện nhiều ở PET.",
});

const petFutureContinuous = build({
  id: "cam-grammar-pet-future-continuous",
  level: "pet", icon: "📅",
  title: "Future Continuous & Future Perfect",
  titleVi: "Future Continuous & Future Perfect",
  description: "Talk about actions in progress at a future moment and actions completed before a future deadline.",
  descriptionVi: "Nói về hành động đang diễn ra ở thời điểm tương lai và hành động hoàn thành trước hạn tương lai.",
  learningObjective: "Students will form will be + V-ing (future continuous) and will have + V3 (future perfect).",
  learningObjectiveVi: "Học sinh sẽ tạo will be + V-ing (future continuous) và will have + V3 (future perfect).",
  examPattern: "PET Reading & Writing Part 5 & Speaking: 'This time tomorrow I'll be flying to Paris.' 'By 2030 we'll have built it.'",
  examPatternVi: "PET Đọc & Viết Phần 5 & Nói.",
  secretTip: "🔑 Future continuous = WILL BE + V-ing (in progress THEN). Future perfect = WILL HAVE + V3 (done BEFORE then).",
  secretTipVi: "🔑 Future continuous = WILL BE + V-ing (đang diễn ra LÚC ĐÓ). Future perfect = WILL HAVE + V3 (xong TRƯỚC lúc đó).",
  welcomeMessage: "📅 Picture your future self in action!",
  welcomeMessageVi: "📅 Hình dung tương lai của bạn đang diễn ra!",
  stepByStep: [
    { step: 1, title: "Decide: in progress or finished?", titleVi: "Quyết định: đang diễn ra hay đã xong?", detail: "In progress at a future time → continuous. Finished by then → perfect.", detailVi: "Đang diễn ra → continuous. Đã xong → perfect." },
    { step: 2, title: "Pick the structure", titleVi: "Chọn cấu trúc", detail: "will be + V-ing  /  will have + V3.", detailVi: "will be + V-ing  /  will have + V3." },
    { step: 3, title: "Add the time marker", titleVi: "Thêm cụm thời gian", detail: "at 8 p.m. tomorrow · by 2030 · by the time…", detailVi: "at 8 p.m. tomorrow · by 2030 · by the time…" },
  ],
  illustratedRules: [
    { icon: "🛫", rule: "Future continuous: will be + V-ing — action happening AT that moment", ruleVi: "Future continuous: will be + V-ing", example: "This time tomorrow I'll be flying to Tokyo." },
    { icon: "🏁", rule: "Future perfect: will have + V3 — action completed BEFORE that moment", ruleVi: "Future perfect: will have + V3", example: "By 7 p.m. I will have finished my homework." },
    { icon: "⏳", rule: "Time markers: at 5 p.m., by 2030, by the time…", ruleVi: "Cụm thời gian: at 5 p.m., by 2030, by the time…", example: "By the time you arrive, we will have eaten." },
  ],
  watchOut: [
    { mistake: "Using future simple for in-progress: 'I will fly at 5'", mistakeVi: "Dùng future simple cho đang diễn ra", tip: "If progress is the focus, use FUTURE CONTINUOUS: 'I will be flying at 5'.", tipVi: "Nếu tập trung vào tiến trình, dùng FUTURE CONTINUOUS." },
    { mistake: "Using past participle after 'will be': 'will be done'", mistakeVi: "Dùng V3 sau 'will be'", tip: "After WILL BE → use V-ing for active. (will be + V3 is passive.)", tipVi: "Sau WILL BE → V-ing cho chủ động." },
  ],
  practiceSet: [
    { instruction: "Pick the tense", instructionVi: "Chọn thì", question: "At 8 a.m. tomorrow, I ___ to school.", options: ["walk", "will walk", "will be walking", "will have walked"], answer: 2, explanation: "Action in progress at that moment → future continuous.", explanationVi: "Đang diễn ra → future continuous." },
    { instruction: "Pick the tense", instructionVi: "Chọn thì", question: "By next year, she ___ her degree.", options: ["finishes", "will finish", "will be finishing", "will have finished"], answer: 3, explanation: "Completed before → future perfect.", explanationVi: "Xong trước → future perfect." },
    { instruction: "Pick the form", instructionVi: "Chọn dạng", question: "We ___ dinner when you arrive.", options: ["have", "will have", "will be having", "will have had"], answer: 2, explanation: "In progress at arrival → will be having.", explanationVi: "Đang diễn ra → will be having." },
  ],
  vocabulary: [
    { word: "will be V-ing", meaning: "in progress at future time", meaningVi: "đang diễn ra ở thời điểm tương lai", example: "I'll be sleeping." },
    { word: "will have V3", meaning: "completed before future time", meaningVi: "xong trước thời điểm tương lai", example: "I'll have finished." },
    { word: "by", meaning: "no later than", meaningVi: "trước (thời điểm)", example: "by 2030" },
    { word: "by the time", meaning: "before the moment that…", meaningVi: "vào lúc mà…", example: "by the time he arrives" },
  ],
  quiz: [
    { question: "This time next year, I ___ in Australia.", options: ["live", "will live", "will be living", "will have lived"], answer: 2, explanation: "In progress → future continuous." },
    { question: "By 9 p.m. they ___ the project.", options: ["finish", "will finish", "will be finishing", "will have finished"], answer: 3, explanation: "Completed before → future perfect." },
    { question: "Don't call at 10 — I ___ a meeting.", options: ["have", "will have", "will be having", "will have had"], answer: 2, explanation: "Ongoing → will be having." },
  ],
  parentInfo: "Future continuous and future perfect distinguish strong PET writers. The 'in progress vs completed' distinction is the only conceptual hurdle.",
  parentInfoVi: "Future continuous & perfect là dấu hiệu của người viết PET mạnh. Phân biệt 'đang diễn ra vs đã xong' là rào cản duy nhất.",
});

// =====================================================================
export const cambridgeLecturesGrammar2: CambridgeLecture[] = [
  // Starters
  startersPronouns, startersPrepIn, startersImperatives, startersWhQuestions, startersColorsAdj,
  // Movers
  moversLikeIng, moversPrepTime, moversWhyBecause, moversAdverbsManner, moversWantToInfinitive,
  // Flyers
  flyersPresentPerfectEver, flyersFirstConditional, flyersQuestionTags, flyersTooEnough, flyersUsedTo,
  // KET
  ketPastContinuous, ketQuantifiers, ketGerundInfinitive, ketPhrasalVerbs, ketComparativesAdv,
  // PET
  petSecondConditional, petModalsDeduction, petWish, petCausative, petFutureContinuous,
];
