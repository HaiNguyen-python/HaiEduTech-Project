// Cambridge Journey: From Starters to PET — 10 strategic lessons

export type CambridgeLevel = "starters" | "movers" | "flyers" | "ket" | "pet";
export type CambridgeSkill = "listening" | "reading-writing" | "speaking" | "vocabulary";

export interface CambridgeQuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface CambridgeWatchOut {
  mistake: string;
  mistakeVi: string;
  tip: string;
  tipVi: string;
}

export interface CambridgeVocabItem {
  word: string;
  meaning: string;
  meaningVi: string;
  example: string;
  image?: string;
}

export interface CambridgePracticeItem {
  instruction: string;
  instructionVi: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  explanationVi: string;
}

export interface CambridgeIllustratedRule {
  icon: string;
  rule: string;
  ruleVi: string;
  example: string;
}

export interface CambridgeLecture {
  id: string;
  title: string;
  titleVi: string;
  level: CambridgeLevel;
  skill: CambridgeSkill;
  icon: string;
  duration: string;
  description: string;
  descriptionVi: string;
  welcomeMessage: string;
  welcomeMessageVi: string;
  illustratedRules: CambridgeIllustratedRule[];
  watchOut: CambridgeWatchOut[];
  practiceSet: CambridgePracticeItem[];
  vocabulary: CambridgeVocabItem[];
  quiz: CambridgeQuizQuestion[];
  parentInfo: string;
  parentInfoVi: string;
  isNew?: boolean;
}

// === LEVEL COLORS (Rainbow Palette) ===
export const LEVEL_CONFIG: Record<CambridgeLevel, {
  label: string; labelVi: string;
  color: string; bgClass: string; borderClass: string; textClass: string;
  gradientFrom: string; gradientTo: string;
}> = {
  starters: {
    label: "Starters (Pre-A1)", labelVi: "Starters (Pre-A1)",
    color: "#EF4444",
    bgClass: "bg-red-500/20", borderClass: "border-red-500/30", textClass: "text-red-300",
    gradientFrom: "#EF4444", gradientTo: "#F97316",
  },
  movers: {
    label: "Movers (A1)", labelVi: "Movers (A1)",
    color: "#3B82F6",
    bgClass: "bg-blue-500/20", borderClass: "border-blue-500/30", textClass: "text-blue-300",
    gradientFrom: "#3B82F6", gradientTo: "#6366F1",
  },
  flyers: {
    label: "Flyers (A2)", labelVi: "Flyers (A2)",
    color: "#22C55E",
    bgClass: "bg-green-500/20", borderClass: "border-green-500/30", textClass: "text-green-300",
    gradientFrom: "#22C55E", gradientTo: "#10B981",
  },
  ket: {
    label: "KET (A2-B1)", labelVi: "KET (A2-B1)",
    color: "#A855F7",
    bgClass: "bg-purple-500/20", borderClass: "border-purple-500/30", textClass: "text-purple-300",
    gradientFrom: "#A855F7", gradientTo: "#8B5CF6",
  },
  pet: {
    label: "PET (B1)", labelVi: "PET (B1)",
    color: "#A855F7",
    bgClass: "bg-violet-500/20", borderClass: "border-violet-500/30", textClass: "text-violet-300",
    gradientFrom: "#8B5CF6", gradientTo: "#7C3AED",
  },
};

// ============ LESSON 1: Starters — Colors & Numbers ============
const startersColors: CambridgeLecture = {
  id: "cam-starters-colors-numbers",
  title: "Colors & Numbers: Listening for Details",
  titleVi: "Nghe và tô màu: Luyện nghe chi tiết",
  level: "starters",
  skill: "listening",
  icon: "🎨",
  duration: "15 min",
  description: "Learn to listen carefully and match colors and numbers to the correct objects in pictures.",
  descriptionVi: "Luyện nghe kỹ và ghép màu sắc, số liệu đúng vào các vật thể trong hình.",
  welcomeMessage: "Hi friends! Today we're going to paint and count! Listen carefully and let's color together! 🎨",
  welcomeMessageVi: "Xin chào các bạn nhỏ! Hôm nay chúng ta sẽ tô màu và đếm! Lắng nghe thật kỹ nhé! 🎨",
  illustratedRules: [
    { icon: "👂", rule: "Listen to the WHOLE sentence before picking a color", ruleVi: "Nghe TOÀN BỘ câu trước khi chọn màu", example: "\"Color the big ball RED\" — wait for the color word!" },
    { icon: "🔢", rule: "Numbers can be tricky — 13 vs 30, 14 vs 40", ruleVi: "Số dễ nhầm — 13 vs 30, 14 vs 40", example: "\"There are THIRTEEN apples\" (not thirty!)" },
    { icon: "🖍️", rule: "Only color what they tell you — don't add extra!", ruleVi: "Chỉ tô cái được yêu cầu — đừng thêm!", example: "If they say 'the small cat', don't color the big cat!" },
  ],
  watchOut: [
    { mistake: "Coloring before the sentence finishes", mistakeVi: "Tô màu trước khi câu kết thúc", tip: "Wait until you hear the FULL instruction!", tipVi: "Đợi đến khi nghe TOÀN BỘ hướng dẫn!" },
    { mistake: "Mixing up 'blue' and 'black'", mistakeVi: "Nhầm lẫn 'blue' và 'black'", tip: "Blue = /bluː/ (long sound), Black = /blæk/ (short sound)", tipVi: "Blue = /bluː/ (âm dài), Black = /blæk/ (âm ngắn)" },
  ],
  practiceSet: [
    { instruction: "Listen and choose", instructionVi: "Nghe và chọn", question: "\"Color the THREE stars yellow.\" How many stars do you color?", options: ["2 stars", "3 stars", "4 stars", "5 stars"], answer: 1, explanation: "The instruction says THREE stars.", explanationVi: "Hướng dẫn nói BA ngôi sao." },
    { instruction: "Listen and choose", instructionVi: "Nghe và chọn", question: "\"The cat ON the table is brown.\" Where is the brown cat?", options: ["Under the table", "On the table", "Next to the table", "Behind the table"], answer: 1, explanation: "ON the table means it's sitting on top.", explanationVi: "ON the table nghĩa là ngồi TRÊN bàn." },
    { instruction: "Count carefully", instructionVi: "Đếm cẩn thận", question: "\"There are FIFTEEN pencils.\" Which number is fifteen?", options: ["50", "5", "15", "51"], answer: 2, explanation: "Fifteen = 15. Be careful: fifty = 50!", explanationVi: "Fifteen = 15. Cẩn thận: fifty = 50!" },
  ],
  vocabulary: [
    { word: "red", meaning: "the color of fire", meaningVi: "màu đỏ", example: "The apple is red." },
    { word: "blue", meaning: "the color of sky", meaningVi: "màu xanh dương", example: "The sky is blue." },
    { word: "thirteen", meaning: "number 13", meaningVi: "số 13", example: "There are thirteen birds." },
    { word: "thirty", meaning: "number 30", meaningVi: "số 30", example: "She has thirty books." },
  ],
  quiz: [
    { question: "Which color sounds similar to 'black'?", options: ["Red", "Blue", "White", "Brown"], answer: 1, explanation: "Blue (/bluː/) and Black (/blæk/) both start with 'bl-' which makes them confusing." },
    { question: "What number is 'fourteen'?", options: ["4", "40", "14", "44"], answer: 2, explanation: "Fourteen = 14. Four = 4, Forty = 40." },
    { question: "In Starters Listening, should you start coloring immediately?", options: ["Yes, be fast!", "No, wait for the full sentence", "Color everything", "Just guess"], answer: 1, explanation: "Always wait for the FULL sentence before coloring — the color word might come at the end!" },
  ],
  parentInfo: "In this lesson, your child practices Cambridge Starters Listening Part 3 & 4 skills — identifying colors and numbers from audio instructions. This builds focused listening and number recognition, essential foundations for language learning.",
  parentInfoVi: "Trong bài này, con em bạn luyện kỹ năng Nghe Phần 3 & 4 của Cambridge Starters — nhận diện màu sắc và số từ hướng dẫn nghe. Đây là nền tảng quan trọng cho việc học ngôn ngữ.",
};

// ============ LESSON 2: Starters — Prepositions of Place ============
const startersPrepositions: CambridgeLecture = {
  id: "cam-starters-prepositions",
  title: "Prepositions of Place: Where is the monkey?",
  titleVi: "Giới từ chỉ vị trí: Con khỉ ở đâu?",
  level: "starters",
  skill: "vocabulary",
  icon: "🐒",
  duration: "15 min",
  description: "Master in, on, under, behind, next to, and between — the most tested prepositions in Starters.",
  descriptionVi: "Thành thạo in, on, under, behind, next to, between — các giới từ thi nhiều nhất trong Starters.",
  welcomeMessage: "Let's play hide and seek! Can you find where the animals are hiding? 🐒🌳",
  welcomeMessageVi: "Chúng ta chơi trốn tìm nhé! Tìm xem các con vật trốn ở đâu? 🐒🌳",
  illustratedRules: [
    { icon: "📦", rule: "IN = inside something (a box, a bag, a room)", ruleVi: "IN = bên trong (hộp, túi, phòng)", example: "The ball is IN the box. 📦" },
    { icon: "🔝", rule: "ON = touching the surface on top", ruleVi: "ON = chạm bề mặt phía trên", example: "The book is ON the table. 📖" },
    { icon: "⬇️", rule: "UNDER = below something", ruleVi: "UNDER = bên dưới", example: "The cat is UNDER the chair. 🐱" },
    { icon: "🔙", rule: "BEHIND = at the back of something", ruleVi: "BEHIND = phía sau", example: "The dog is BEHIND the tree. 🐕" },
  ],
  watchOut: [
    { mistake: "Confusing IN and ON", mistakeVi: "Nhầm IN và ON", tip: "IN = something covers it (inside). ON = it sits on top.", tipVi: "IN = bị bao phủ (bên trong). ON = nằm trên bề mặt." },
    { mistake: "Forgetting 'next to' means BESIDE", mistakeVi: "Quên 'next to' nghĩa là BÊN CẠNH", tip: "'Next to' = right beside, very close!", tipVi: "'Next to' = ngay bên cạnh, rất gần!" },
  ],
  practiceSet: [
    { instruction: "Look at the picture and choose", instructionVi: "Nhìn hình và chọn", question: "The monkey is sitting on top of a tree branch. Where is the monkey?", options: ["in the tree", "on the tree", "under the tree", "behind the tree"], answer: 1, explanation: "Sitting on a branch = ON the tree.", explanationVi: "Ngồi trên cành = ON the tree." },
    { instruction: "Choose the correct preposition", instructionVi: "Chọn giới từ đúng", question: "The ball is ___ the box. (It's inside)", options: ["on", "in", "under", "next to"], answer: 1, explanation: "Inside the box = IN the box.", explanationVi: "Bên trong hộp = IN the box." },
    { instruction: "Where is the cat?", instructionVi: "Con mèo ở đâu?", question: "The cat is hiding. You can't see it because the sofa is in front. The cat is ___ the sofa.", options: ["on", "in", "under", "behind"], answer: 3, explanation: "If the sofa blocks your view, the cat is BEHIND the sofa.", explanationVi: "Nếu sofa che khuất, mèo ở phía SAU sofa." },
  ],
  vocabulary: [
    { word: "in", meaning: "inside", meaningVi: "bên trong", example: "The pencil is in the bag." },
    { word: "on", meaning: "on top of", meaningVi: "ở trên", example: "The cup is on the table." },
    { word: "under", meaning: "below", meaningVi: "bên dưới", example: "The shoes are under the bed." },
    { word: "behind", meaning: "at the back", meaningVi: "phía sau", example: "The cat is behind the door." },
    { word: "next to", meaning: "beside", meaningVi: "bên cạnh", example: "The park is next to the school." },
  ],
  quiz: [
    { question: "The bird is ___ the cage. (inside)", options: ["on", "in", "under", "behind"], answer: 1, explanation: "Inside the cage = IN the cage." },
    { question: "My phone is ___ the books. (below the pile)", options: ["on", "behind", "next to", "under"], answer: 3, explanation: "Below the pile = UNDER the books." },
    { question: "Which preposition means 'right beside'?", options: ["in", "on", "next to", "under"], answer: 2, explanation: "'Next to' means right beside, very close to something." },
  ],
  parentInfo: "This lesson covers Prepositions of Place — a key topic in Cambridge Starters Reading & Writing. Your child learns to describe where things are, a foundational English skill.",
  parentInfoVi: "Bài này dạy Giới từ chỉ vị trí — chủ đề chính trong Starters Đọc & Viết. Con em bạn sẽ học mô tả vị trí, một kỹ năng tiếng Anh nền tảng.",
};

// ============ LESSON 3: Movers — Difference Finder ============
const moversDifferences: CambridgeLecture = {
  id: "cam-movers-differences",
  title: "Difference Finder: Spotting 5 differences in pictures",
  titleVi: "Kể chuyện qua tranh: Tìm 5 điểm khác biệt",
  level: "movers",
  skill: "speaking",
  icon: "🔍",
  duration: "20 min",
  description: "Learn to describe picture differences using 'In picture A... but in picture B...' structure.",
  descriptionVi: "Học cách mô tả sự khác biệt giữa hai bức tranh bằng cấu trúc 'In picture A... but in picture B...'",
  welcomeMessage: "Detective time! 🔍 Can you spot all the differences between two pictures? Let's practice describing them!",
  welcomeMessageVi: "Thời gian thám tử! 🔍 Bạn có thể tìm hết điểm khác biệt giữa hai bức tranh không? Cùng luyện mô tả nhé!",
  illustratedRules: [
    { icon: "👀", rule: "Always compare systematically: left to right, top to bottom", ruleVi: "Luôn so sánh có hệ thống: trái sang phải, trên xuống dưới", example: "Start from the left side of both pictures" },
    { icon: "🗣️", rule: "Use the structure: 'In this picture... but in that picture...'", ruleVi: "Dùng cấu trúc: 'In this picture... but in that picture...'", example: "In this picture, the boy is wearing a hat, but in that picture, he isn't." },
    { icon: "📝", rule: "Describe ALL 5 differences — don't stop at 3!", ruleVi: "Mô tả ĐỦ 5 điểm khác — đừng dừng ở 3!", example: "The examiner expects 4-5 differences." },
  ],
  watchOut: [
    { mistake: "Saying 'Here is a cat but there is no cat'", mistakeVi: "Nói 'Here is a cat but there is no cat'", tip: "Better: 'In this picture, there's a cat ON the sofa, but in that picture, the cat is UNDER the table.'", tipVi: "Nói đúng hơn: 'In this picture, there's a cat ON the sofa, but in that picture, the cat is UNDER the table.'" },
    { mistake: "Only pointing without describing", mistakeVi: "Chỉ trỏ mà không mô tả", tip: "Use WORDS — the examiner wants to hear your English, not just gestures!", tipVi: "Dùng LỜI NÓI — giám khảo muốn nghe tiếng Anh, không chỉ cử chỉ!" },
  ],
  practiceSet: [
    { instruction: "Describe the difference", instructionVi: "Mô tả sự khác biệt", question: "Picture A: A girl is reading. Picture B: A girl is writing. Complete: 'In picture A, the girl is ___, but in picture B, she is ___.'", options: ["reading / writing", "sleeping / eating", "standing / sitting", "happy / sad"], answer: 0, explanation: "reading / writing — describe the action difference.", explanationVi: "reading / writing — mô tả sự khác biệt hành động." },
    { instruction: "Spot the difference", instructionVi: "Tìm điểm khác", question: "Picture A has 3 birds. Picture B has 5 birds. What should you say?", options: ["There are more birds", "In picture A there are three birds, but in picture B there are five", "Birds are different", "I see birds"], answer: 1, explanation: "Use the full comparison structure with specific numbers!", explanationVi: "Dùng cấu trúc so sánh đầy đủ với số cụ thể!" },
  ],
  vocabulary: [
    { word: "difference", meaning: "something that is not the same", meaningVi: "sự khác biệt", example: "Can you find the difference?" },
    { word: "similar", meaning: "almost the same", meaningVi: "tương tự", example: "The two pictures are similar." },
    { word: "but", meaning: "however (showing contrast)", meaningVi: "nhưng (chỉ sự tương phản)", example: "This one is big, but that one is small." },
  ],
  quiz: [
    { question: "What structure should you use to describe differences?", options: ["This is different", "In this picture... but in that picture...", "I see things", "Look at that"], answer: 1, explanation: "The comparison structure helps you clearly explain each difference." },
    { question: "How many differences should you find in Movers Speaking?", options: ["2-3", "4-5", "1-2", "6-7"], answer: 1, explanation: "The examiner expects you to find and describe 4-5 differences." },
  ],
  parentInfo: "This lesson covers Movers Speaking Part 2 — describing differences between two pictures. Your child practices comparative language and structured descriptions, building confidence for the speaking exam.",
  parentInfoVi: "Bài này dạy kỹ năng Nói Phần 2 của Movers — mô tả điểm khác biệt giữa hai bức tranh. Con em bạn luyện ngôn ngữ so sánh và mô tả có cấu trúc.",
};

// ============ LESSON 4: Movers — Verb Tenses ============
const moversTenses: CambridgeLecture = {
  id: "cam-movers-tenses",
  title: "Verb Tenses: Past Simple vs. Present Continuous in Stories",
  titleVi: "Thì động từ: Quá khứ đơn vs. Hiện tại tiếp diễn trong câu chuyện",
  level: "movers",
  skill: "reading-writing",
  icon: "📖",
  duration: "20 min",
  description: "Master when to use 'played' vs 'is playing' — the two most tested tenses in Movers.",
  descriptionVi: "Phân biệt khi nào dùng 'played' và 'is playing' — hai thì được thi nhiều nhất trong Movers.",
  welcomeMessage: "Story time! 📖 Let's learn when things HAPPENED yesterday and what's HAPPENING right now!",
  welcomeMessageVi: "Giờ kể chuyện! 📖 Cùng học khi nào việc ĐÃ XẢY RA hôm qua và đang XẢY RA bây giờ!",
  illustratedRules: [
    { icon: "⏪", rule: "Past Simple = finished action (yesterday, last week)", ruleVi: "Quá khứ đơn = hành động đã xong (hôm qua, tuần trước)", example: "I played football YESTERDAY." },
    { icon: "🔄", rule: "Present Continuous = happening NOW (right now, at this moment)", ruleVi: "Hiện tại tiếp diễn = đang xảy ra BÂY GIỜ", example: "She is playing football NOW." },
    { icon: "🔑", rule: "Look for TIME WORDS to decide which tense", ruleVi: "Tìm TỪ CHỈ THỜI GIAN để quyết định thì nào", example: "yesterday → Past Simple / now → Present Continuous" },
  ],
  watchOut: [
    { mistake: "Forgetting to add -ed for regular past verbs", mistakeVi: "Quên thêm -ed cho động từ quá khứ thường", tip: "play → playED, walk → walkED, watch → watchED", tipVi: "play → playED, walk → walkED, watch → watchED" },
    { mistake: "Forgetting -ing for present continuous", mistakeVi: "Quên -ing cho hiện tại tiếp diễn", tip: "is + verb-ING: is playING, is readING, is eatING", tipVi: "is + verb-ING: is playING, is readING, is eatING" },
  ],
  practiceSet: [
    { instruction: "Choose the correct tense", instructionVi: "Chọn thì đúng", question: "Yesterday, Tom ___ to school. (walk)", options: ["walks", "walked", "is walking", "walking"], answer: 1, explanation: "Yesterday = past → walked", explanationVi: "Yesterday = quá khứ → walked" },
    { instruction: "Choose the correct tense", instructionVi: "Chọn thì đúng", question: "Look! The children ___ in the park right now. (play)", options: ["played", "plays", "are playing", "play"], answer: 2, explanation: "Right now = present continuous → are playing", explanationVi: "Right now = hiện tại tiếp diễn → are playing" },
    { instruction: "Fill in the blank", instructionVi: "Điền vào chỗ trống", question: "Last Saturday, we ___ a movie at home. (watch)", options: ["watching", "watched", "are watching", "watches"], answer: 1, explanation: "Last Saturday = past → watched", explanationVi: "Last Saturday = quá khứ → watched" },
  ],
  vocabulary: [
    { word: "yesterday", meaning: "the day before today", meaningVi: "hôm qua", example: "I went to school yesterday." },
    { word: "now", meaning: "at this moment", meaningVi: "bây giờ", example: "I am eating now." },
    { word: "last week", meaning: "the week before this one", meaningVi: "tuần trước", example: "We visited grandma last week." },
  ],
  quiz: [
    { question: "Which time word signals Past Simple?", options: ["now", "yesterday", "at this moment", "currently"], answer: 1, explanation: "'Yesterday' is a past time word → use Past Simple." },
    { question: "She ___ her homework now. (do)", options: ["did", "does", "is doing", "doing"], answer: 2, explanation: "'Now' signals Present Continuous → is doing." },
    { question: "We ___ to the zoo last Sunday. (go)", options: ["go", "went", "are going", "going"], answer: 1, explanation: "'Last Sunday' = past → went (irregular verb)." },
  ],
  parentInfo: "This lesson teaches the two most important verb tenses in Movers: Past Simple and Present Continuous. Your child learns to recognize time markers and choose the correct tense — a critical skill for Reading & Writing exams.",
  parentInfoVi: "Bài này dạy hai thì động từ quan trọng nhất trong Movers: Quá khứ đơn và Hiện tại tiếp diễn. Con em bạn học nhận diện từ chỉ thời gian và chọn thì đúng.",
};

// ============ LESSON 5: Flyers — Matching Names ============
const flyersMatching: CambridgeLecture = {
  id: "cam-flyers-matching-names",
  title: "Matching Names to People: Handling the Listening Part 1",
  titleVi: "Ghép tên với nhân vật: Kỹ năng Nghe Phần 1",
  level: "flyers",
  skill: "listening",
  icon: "👥",
  duration: "20 min",
  description: "Learn to listen for descriptions and match names to the correct people in pictures.",
  descriptionVi: "Luyện nghe mô tả và ghép tên vào đúng nhân vật trong hình.",
  welcomeMessage: "Who's who? 👥 Let's become name-matching experts! Listen carefully to what people look like and what they're doing!",
  welcomeMessageVi: "Ai là ai? 👥 Cùng trở thành chuyên gia ghép tên! Nghe kỹ mô tả ngoại hình và hành động nhé!",
  illustratedRules: [
    { icon: "👂", rule: "Listen for DESCRIPTIONS: what they wear, what they're doing", ruleVi: "Nghe MÔ TẢ: mặc gì, đang làm gì", example: "\"Ben is the boy wearing the blue hat and holding a ball.\"" },
    { icon: "✏️", rule: "Write the name NEXT TO the person, not on them", ruleVi: "Viết tên BÊN CẠNH nhân vật, không viết ĐÈ lên", example: "Draw a line from the name to the person" },
    { icon: "🔄", rule: "Names may be spelled out — listen to each letter", ruleVi: "Tên có thể được đánh vần — nghe từng chữ cái", example: "\"Her name is S-A-R-A-H, Sarah.\"" },
  ],
  watchOut: [
    { mistake: "Choosing the first person mentioned", mistakeVi: "Chọn nhân vật đầu tiên được nhắc đến", tip: "The speaker might describe MULTIPLE people before confirming the right one!", tipVi: "Người nói có thể mô tả NHIỀU nhân vật trước khi xác nhận đúng!" },
    { mistake: "Not listening for the correction", mistakeVi: "Không nghe phần sửa lại", tip: "Sometimes they say 'No, not that one... the one with the red bag.'", tipVi: "Đôi khi họ nói 'No, not that one... the one with the red bag.'" },
  ],
  practiceSet: [
    { instruction: "Listen and match", instructionVi: "Nghe và ghép", question: "\"Tom is wearing a green shirt. He's the boy standing next to the tree.\" Who is Tom?", options: ["Boy sitting on the bench", "Boy standing next to the tree in green", "Boy running", "Girl in green"], answer: 1, explanation: "Green shirt + standing next to the tree = Tom.", explanationVi: "Áo xanh + đứng cạnh cây = Tom." },
    { instruction: "Listen carefully", instructionVi: "Nghe kỹ", question: "\"At first I thought it was the girl with long hair, but actually, Sarah has SHORT hair and she's reading a book.\" Who is Sarah?", options: ["Girl with long hair", "Girl with short hair reading", "Girl standing", "Boy reading"], answer: 1, explanation: "The correction tells us: SHORT hair + reading = Sarah.", explanationVi: "Phần sửa cho biết: tóc NGẮN + đọc sách = Sarah." },
  ],
  vocabulary: [
    { word: "wearing", meaning: "having clothes on", meaningVi: "đang mặc", example: "She is wearing a red dress." },
    { word: "standing", meaning: "on your feet, not sitting", meaningVi: "đang đứng", example: "He is standing near the door." },
    { word: "holding", meaning: "carrying in hands", meaningVi: "đang cầm", example: "She is holding a book." },
  ],
  quiz: [
    { question: "In Flyers Listening Part 1, what do you need to do?", options: ["Count objects", "Match names to people", "Color pictures", "Write sentences"], answer: 1, explanation: "Part 1 asks you to match names to the correct people in a picture." },
    { question: "What should you listen for when matching names?", options: ["Only hair color", "Descriptions of appearance AND actions", "Just the name", "The number of people"], answer: 1, explanation: "Listen for both what they look like AND what they're doing." },
  ],
  parentInfo: "This lesson covers Flyers Listening Part 1 — matching names to people in pictures. Your child develops focused listening skills and learns to process descriptive language under exam conditions.",
  parentInfoVi: "Bài này dạy Nghe Phần 1 của Flyers — ghép tên với nhân vật trong hình. Con em bạn phát triển kỹ năng nghe tập trung và xử lý ngôn ngữ mô tả.",
};

// ============ LESSON 6: Flyers — Reading & Writing Part 4 ============
const flyersReadingWriting: CambridgeLecture = {
  id: "cam-flyers-reading-writing-p4",
  title: "Reading & Writing Part 4: Choosing the correct word for the gap",
  titleVi: "Đọc & Viết Phần 4: Chọn từ đúng cho chỗ trống",
  level: "flyers",
  skill: "reading-writing",
  icon: "📝",
  duration: "20 min",
  description: "Master the gap-fill technique by understanding context clues and grammar patterns.",
  descriptionVi: "Thành thạo kỹ thuật điền từ bằng cách hiểu manh mối ngữ cảnh và mẫu ngữ pháp.",
  welcomeMessage: "Word detective mode ON! 🔎 Let's learn to pick the PERFECT word for each gap!",
  welcomeMessageVi: "Chế độ thám tử từ vựng BẬT! 🔎 Cùng học cách chọn từ HOÀN HẢO cho mỗi chỗ trống!",
  illustratedRules: [
    { icon: "📖", rule: "Read the WHOLE text first before filling ANY gaps", ruleVi: "Đọc TOÀN BỘ bài trước khi điền BẤT KỲ chỗ trống nào", example: "Understanding the story helps you choose better words" },
    { icon: "🔎", rule: "Look at words BEFORE and AFTER the gap for clues", ruleVi: "Xem từ TRƯỚC và SAU chỗ trống để tìm manh mối", example: "'She went ___ school' → 'to' (phrase: go to school)" },
    { icon: "🧩", rule: "Check if it's a noun, verb, adjective, or preposition needed", ruleVi: "Kiểm tra cần danh từ, động từ, tính từ, hay giới từ", example: "'The ___ boy ran fast' → adjective needed (tall, young, etc.)" },
  ],
  watchOut: [
    { mistake: "Choosing a word just because it 'looks right'", mistakeVi: "Chọn từ chỉ vì nó 'trông đúng'", tip: "Always read the complete sentence with your choice — does it make sense?", tipVi: "Luôn đọc lại câu hoàn chỉnh — có hợp lý không?" },
    { mistake: "Not checking grammar agreement", mistakeVi: "Không kiểm tra hòa hợp ngữ pháp", tip: "'She ___ to school' needs a VERB: goes/went, not 'go'", tipVi: "'She ___ to school' cần ĐỘNG TỪ chia: goes/went, không phải 'go'" },
  ],
  practiceSet: [
    { instruction: "Fill in the gap", instructionVi: "Điền vào chỗ trống", question: "Yesterday, Lily ___ to the park with her friends.", options: ["go", "went", "going", "goes"], answer: 1, explanation: "Yesterday = past tense → went", explanationVi: "Yesterday = quá khứ → went" },
    { instruction: "Choose the best word", instructionVi: "Chọn từ phù hợp nhất", question: "The children were very ___ because it was their birthday.", options: ["happy", "sadly", "anger", "careful"], answer: 0, explanation: "We need an adjective to describe feelings → happy", explanationVi: "Cần tính từ mô tả cảm xúc → happy" },
    { instruction: "Complete the sentence", instructionVi: "Hoàn thành câu", question: "She put the books ___ the shelf.", options: ["at", "in", "on", "under"], answer: 2, explanation: "Books go ON a shelf (sitting on top).", explanationVi: "Sách nằm TRÊN kệ (trên bề mặt)." },
  ],
  vocabulary: [
    { word: "gap", meaning: "an empty space to fill", meaningVi: "chỗ trống cần điền", example: "Fill in the gap with the correct word." },
    { word: "context", meaning: "the words around a word/gap", meaningVi: "ngữ cảnh (từ xung quanh)", example: "Use context clues to find the answer." },
    { word: "clue", meaning: "a hint that helps you find the answer", meaningVi: "manh mối, gợi ý", example: "The time word 'yesterday' is a clue for past tense." },
  ],
  quiz: [
    { question: "What should you do FIRST in a gap-fill exercise?", options: ["Fill in the first gap", "Read the whole text", "Count the gaps", "Look at the pictures"], answer: 1, explanation: "Always read the whole text first to understand the story." },
    { question: "'The dog ___ very hungry.' What type of word is needed?", options: ["Noun", "Verb (was/is)", "Adverb", "Preposition"], answer: 1, explanation: "The dog __ hungry → needs a verb: was/is." },
  ],
  parentInfo: "This lesson covers Flyers Reading & Writing Part 4 — gap-fill exercises. Your child learns systematic techniques to choose the correct word by analyzing context and grammar, a skill that carries through to higher-level exams.",
  parentInfoVi: "Bài này dạy Đọc & Viết Phần 4 của Flyers — bài tập điền từ. Con em bạn học kỹ thuật hệ thống để chọn từ đúng qua phân tích ngữ cảnh và ngữ pháp.",
};

// ============ LESSON 7: KET — Email Writing ============
const ketEmail: CambridgeLecture = {
  id: "cam-ket-email-writing",
  title: "Email Writing: How to answer all 3 prompts in 25 words",
  titleVi: "Viết Email: Cách trả lời đủ 3 gợi ý trong 25 từ",
  level: "ket",
  skill: "reading-writing",
  icon: "✉️",
  duration: "25 min",
  description: "Learn the 3-sentence formula to write a complete KET email every time — concise and effective.",
  descriptionVi: "Học công thức 3 câu để viết email KET hoàn chỉnh mọi lúc — ngắn gọn và hiệu quả.",
  welcomeMessage: "Time to become an email pro! ✉️ The secret? One sentence for each prompt. Simple and powerful!",
  welcomeMessageVi: "Đến lúc thành chuyên gia viết email! ✉️ Bí quyết? Mỗi gợi ý một câu. Đơn giản mà mạnh mẽ!",
  illustratedRules: [
    { icon: "1️⃣", rule: "ONE sentence per prompt — don't overcomplicate!", ruleVi: "MỘT câu cho mỗi gợi ý — đừng phức tạp hóa!", example: "Prompt: 'say what time' → 'The party starts at 7 pm.'" },
    { icon: "🔢", rule: "Aim for 25-35 words — not too short, not too long", ruleVi: "Nhắm 25-35 từ — không quá ngắn, không quá dài", example: "3 good sentences = perfect word count" },
    { icon: "👋", rule: "Always start with 'Hi [name],' and end naturally", ruleVi: "Luôn bắt đầu 'Hi [name],' và kết thúc tự nhiên", example: "Hi Tom, ... See you there!" },
  ],
  watchOut: [
    { mistake: "Answering only 2 out of 3 prompts", mistakeVi: "Chỉ trả lời 2/3 gợi ý", tip: "ALWAYS check: Did I answer ALL THREE points? Count them!", tipVi: "LUÔN kiểm tra: Mình đã trả lời ĐỦ BA điểm chưa? Đếm lại!" },
    { mistake: "Writing too much (50+ words)", mistakeVi: "Viết quá nhiều (50+ từ)", tip: "Keep it short! 25-35 words is the sweet spot. Extra words = extra mistakes.", tipVi: "Giữ ngắn gọn! 25-35 từ là vừa đẹp. Nhiều từ hơn = nhiều lỗi hơn." },
  ],
  practiceSet: [
    { instruction: "Write an email response", instructionVi: "Viết email trả lời", question: "You got an email from your friend about a party. Write back and: 1) say thank you 2) say what time you'll arrive 3) suggest what to bring. Which response covers all 3?", options: ["Thanks for the invite! I'll come at 6pm. Shall I bring some cake?", "Thank you so much for inviting me to your wonderful party, I am so excited!", "I'll bring cake.", "I'm busy sorry."], answer: 0, explanation: "Answer 1 covers all three prompts in a concise way.", explanationVi: "Đáp án 1 trả lời đủ 3 gợi ý một cách ngắn gọn." },
  ],
  vocabulary: [
    { word: "prompt", meaning: "a question/instruction to respond to", meaningVi: "gợi ý/yêu cầu cần trả lời", example: "The email has 3 prompts." },
    { word: "concise", meaning: "short and clear", meaningVi: "ngắn gọn và rõ ràng", example: "Keep your answer concise." },
    { word: "suggest", meaning: "offer an idea", meaningVi: "đề xuất, gợi ý", example: "Can I suggest we meet at the café?" },
  ],
  quiz: [
    { question: "How many prompts must you answer in a KET email?", options: ["1", "2", "3", "4"], answer: 2, explanation: "KET emails always have exactly 3 prompts — answer ALL of them." },
    { question: "What's the ideal word count for a KET email?", options: ["10-15 words", "25-35 words", "50-60 words", "100+ words"], answer: 1, explanation: "25-35 words is perfect — enough to answer all prompts without unnecessary detail." },
    { question: "How should you start a KET email?", options: ["Dear Sir/Madam,", "To Whom It May Concern,", "Hi [name],", "Hello everyone,"], answer: 2, explanation: "KET emails are informal — start with 'Hi [name],'." },
  ],
  parentInfo: "This lesson teaches KET Writing Part 9 — short email responses. Your teen learns a reliable 3-sentence formula to answer all prompts concisely, a skill essential for both the exam and real-life communication.",
  parentInfoVi: "Bài này dạy Viết Phần 9 của KET — trả lời email ngắn. Con em bạn học công thức 3 câu đáng tin cậy, kỹ năng thiết yếu cho cả thi cử và giao tiếp thực tế.",
};

// ============ LESSON 8: KET — Speaking Part 2 ============
const ketSpeaking: CambridgeLecture = {
  id: "cam-ket-speaking-part2",
  title: "Speaking Part 2: Asking and answering questions with prompt cards",
  titleVi: "Nói Phần 2: Hỏi và trả lời bằng thẻ gợi ý",
  level: "ket",
  skill: "speaking",
  icon: "🎤",
  duration: "25 min",
  description: "Master the KET Speaking Part 2 by learning to form questions and give extended answers from prompt cards.",
  descriptionVi: "Thành thạo Nói Phần 2 KET bằng cách học đặt câu hỏi và trả lời mở rộng từ thẻ gợi ý.",
  welcomeMessage: "Let's chat! 🎤 Speaking exams are like friendly conversations. I'll show you how to ask great questions and give awesome answers!",
  welcomeMessageVi: "Cùng trò chuyện! 🎤 Thi nói giống như cuộc trò chuyện thân thiện. Thầy sẽ chỉ cách đặt câu hỏi hay và trả lời tuyệt vời!",
  illustratedRules: [
    { icon: "❓", rule: "Turn prompt words into WH-questions", ruleVi: "Biến từ gợi ý thành câu hỏi WH-", example: "'Favourite food?' → 'What is your favourite food?'" },
    { icon: "➕", rule: "Give SHORT answer + EXTRA information", ruleVi: "Trả lời NGẮN + thêm thông tin BỔ SUNG", example: "'Pizza. I usually eat it on Fridays with my family.'" },
    { icon: "😊", rule: "Be natural — smile, make eye contact, speak clearly", ruleVi: "Tự nhiên — mỉm cười, giao tiếp bằng mắt, nói rõ ràng", example: "Pretend you're talking to a friend, not a robot!" },
  ],
  watchOut: [
    { mistake: "Giving one-word answers", mistakeVi: "Trả lời một từ", tip: "Don't say just 'Pizza.' Say 'I love pizza! I usually have it on Fridays.'", tipVi: "Đừng chỉ nói 'Pizza.' Hãy nói 'I love pizza! I usually have it on Fridays.'" },
    { mistake: "Forgetting to make a question", mistakeVi: "Quên đặt câu hỏi", tip: "Remember: you must BOTH ask AND answer in Part 2!", tipVi: "Nhớ: bạn phải VỪA HỎI VỪA TRẢ LỜI trong Phần 2!" },
  ],
  practiceSet: [
    { instruction: "Form a question", instructionVi: "Đặt câu hỏi", question: "Prompt card says: 'Hobby?' What question should you ask?", options: ["Hobby?", "What is your hobby?", "You hobby?", "Tell hobby"], answer: 1, explanation: "Turn the prompt into a full question: 'What is your hobby?'", explanationVi: "Biến gợi ý thành câu hỏi đầy đủ: 'What is your hobby?'" },
    { instruction: "Choose the best answer", instructionVi: "Chọn câu trả lời tốt nhất", question: "Question: 'Where do you live?' Which is the BEST answer?", options: ["Vietnam.", "I live in Ho Chi Minh City. It's a big and exciting city!", "House.", "Yes."], answer: 1, explanation: "Short answer + extra detail = perfect KET speaking answer!", explanationVi: "Trả lời ngắn + thêm chi tiết = câu trả lời nói KET hoàn hảo!" },
  ],
  vocabulary: [
    { word: "prompt card", meaning: "a card with keywords to make questions", meaningVi: "thẻ gợi ý với từ khóa để đặt câu hỏi", example: "Read the prompt card and ask a question." },
    { word: "extend", meaning: "to make longer, add more", meaningVi: "mở rộng, thêm thông tin", example: "Extend your answer with a reason or example." },
    { word: "favourite", meaning: "the one you like most", meaningVi: "yêu thích nhất", example: "What's your favourite color?" },
  ],
  quiz: [
    { question: "'Free time?' becomes which question?", options: ["Free time?", "What do you do in your free time?", "You free?", "Time free what?"], answer: 1, explanation: "Turn prompt words into proper WH-questions." },
    { question: "What makes a GOOD speaking answer?", options: ["One word", "Short answer + extra detail", "Very long paragraph", "Just nodding"], answer: 1, explanation: "Short answer plus extra information shows good communication skills." },
  ],
  parentInfo: "This lesson covers KET Speaking Part 2 — using prompt cards to ask and answer questions. Your teen builds conversational fluency and learns to extend answers, critical skills for the speaking exam and everyday English.",
  parentInfoVi: "Bài này dạy Nói Phần 2 KET — sử dụng thẻ gợi ý để hỏi và trả lời. Con em bạn xây dựng khả năng giao tiếp lưu loát và học cách mở rộng câu trả lời.",
};

// ============ LESSON 9: PET — Reading Part 5 ============
const petReading: CambridgeLecture = {
  id: "cam-pet-reading-part5",
  title: "Reading Part 5: Mastering Multiple Choice Cloze",
  titleVi: "Đọc Phần 5: Thành thạo Multiple Choice Cloze (Ngữ pháp & Từ vựng)",
  level: "pet",
  skill: "reading-writing",
  icon: "🧠",
  duration: "25 min",
  description: "Learn to choose the correct word from 4 options by analyzing grammar and vocabulary patterns in PET Reading Part 5.",
  descriptionVi: "Học cách chọn từ đúng từ 4 lựa chọn bằng cách phân tích mẫu ngữ pháp và từ vựng trong Đọc Phần 5 PET.",
  welcomeMessage: "Brain workout time! 🧠 PET Reading Part 5 tests your grammar AND vocabulary. Let's crack the code!",
  welcomeMessageVi: "Thời gian vận động não! 🧠 Đọc Phần 5 PET kiểm tra ngữ pháp VÀ từ vựng. Cùng giải mã nhé!",
  illustratedRules: [
    { icon: "🔍", rule: "Read the whole sentence — don't just look at the gap", ruleVi: "Đọc cả câu — đừng chỉ nhìn chỗ trống", example: "'She has been living here ___ 2010' → since (time period start)" },
    { icon: "🧩", rule: "Check: Is it testing GRAMMAR or VOCABULARY?", ruleVi: "Kiểm tra: Đang thi NGỮ PHÁP hay TỪ VỰNG?", example: "Grammar: since/for/during — Vocabulary: wide/broad/large" },
    { icon: "❌", rule: "Eliminate obviously wrong answers first", ruleVi: "Loại đáp án rõ ràng sai trước", example: "If 3 options are prepositions and 1 is a verb → the verb is probably wrong" },
  ],
  watchOut: [
    { mistake: "Confusing 'since' and 'for'", mistakeVi: "Nhầm 'since' và 'for'", tip: "SINCE + point in time (since 2010). FOR + period of time (for 5 years).", tipVi: "SINCE + mốc thời gian (since 2010). FOR + khoảng thời gian (for 5 years)." },
    { mistake: "Not reading the full text before answering", mistakeVi: "Không đọc hết bài trước khi trả lời", tip: "The overall meaning might change your answer — always read the complete text!", tipVi: "Nghĩa tổng thể có thể thay đổi đáp án — luôn đọc hết bài!" },
  ],
  practiceSet: [
    { instruction: "Choose the correct word", instructionVi: "Chọn từ đúng", question: "She has lived in London ___ three years.", options: ["since", "for", "during", "while"], answer: 1, explanation: "Three years = period of time → FOR", explanationVi: "Three years = khoảng thời gian → FOR" },
    { instruction: "Choose the correct word", instructionVi: "Chọn từ đúng", question: "I'm interested ___ learning new languages.", options: ["at", "on", "in", "for"], answer: 2, explanation: "Interested IN + gerund/noun is the correct collocation.", explanationVi: "Interested IN + danh động từ/danh từ là cụm từ đúng." },
    { instruction: "Choose the correct word", instructionVi: "Chọn từ đúng", question: "Although it was raining, they ___ to go for a walk.", options: ["decided", "thought", "suggested", "wanted"], answer: 0, explanation: "Decided + to infinitive fits the meaning and grammar.", explanationVi: "Decided + to + động từ phù hợp nghĩa và ngữ pháp." },
  ],
  vocabulary: [
    { word: "collocation", meaning: "words that naturally go together", meaningVi: "sự kết hợp từ tự nhiên", example: "'Make a decision' not 'do a decision'." },
    { word: "eliminate", meaning: "to remove/rule out", meaningVi: "loại bỏ", example: "Eliminate the wrong answers first." },
    { word: "although", meaning: "even though, despite the fact", meaningVi: "mặc dù", example: "Although it rained, we had fun." },
  ],
  quiz: [
    { question: "PET Reading Part 5 tests mainly:", options: ["Speed reading", "Grammar and vocabulary in context", "Pronunciation", "Listening skills"], answer: 1, explanation: "Part 5 is a multiple choice cloze testing grammar and vocabulary." },
    { question: "I've been waiting ___ 3 o'clock.", options: ["for", "since", "during", "while"], answer: 1, explanation: "3 o'clock = specific point in time → SINCE." },
    { question: "What's the first step when doing Part 5?", options: ["Fill in the first gap immediately", "Read the whole text first", "Look only at the options", "Skip to the quiz"], answer: 1, explanation: "Always read the whole text first to understand the context." },
  ],
  parentInfo: "This lesson covers PET Reading Part 5 — Multiple Choice Cloze. Your teen learns to distinguish grammar-based and vocabulary-based questions, a key skill for B1-level English and beyond.",
  parentInfoVi: "Bài này dạy Đọc Phần 5 PET — Multiple Choice Cloze. Con em bạn học phân biệt câu hỏi ngữ pháp và từ vựng, kỹ năng quan trọng cho trình độ B1.",
};

// ============ LESSON 10: PET — Writing an Article ============
const petArticle: CambridgeLecture = {
  id: "cam-pet-writing-article",
  title: "Writing an Article: Using 'Hooks' to interest the reader",
  titleVi: "Viết bài viết: Dùng 'Hook' để thu hút người đọc",
  level: "pet",
  skill: "reading-writing",
  icon: "✍️",
  duration: "30 min",
  description: "Master the PET article format with attention-grabbing openings, organized paragraphs, and a strong conclusion.",
  descriptionVi: "Thành thạo format bài viết PET với mở bài thu hút, đoạn văn có tổ chức, và kết luận mạnh mẽ.",
  welcomeMessage: "Ready to write like a pro journalist? ✍️ The secret to a great article is a HOOK — something that grabs the reader's attention from the very first line!",
  welcomeMessageVi: "Sẵn sàng viết như nhà báo chuyên nghiệp chưa? ✍️ Bí quyết bài viết hay là HOOK — thứ thu hút người đọc ngay từ câu đầu tiên!",
  illustratedRules: [
    { icon: "🪝", rule: "Start with a HOOK: a question, surprising fact, or personal story", ruleVi: "Bắt đầu bằng HOOK: câu hỏi, sự thật bất ngờ, hoặc câu chuyện cá nhân", example: "'Have you ever wondered why some people love Mondays? I'm one of them!'" },
    { icon: "📐", rule: "Structure: Title → Hook → 2 body paragraphs → Conclusion", ruleVi: "Cấu trúc: Tiêu đề → Hook → 2 đoạn thân → Kết luận", example: "Introduction + 2 paragraphs + final thought = perfect article" },
    { icon: "🎯", rule: "Use informal/neutral language — articles are NOT formal letters!", ruleVi: "Dùng ngôn ngữ thân mật/trung tính — bài viết KHÔNG phải thư trang trọng!", example: "Use 'you' and contractions: 'you'll love this...'" },
  ],
  watchOut: [
    { mistake: "Starting with 'I will write about...'", mistakeVi: "Bắt đầu bằng 'I will write about...'", tip: "That's boring! Use a question or surprising fact instead.", tipVi: "Chán lắm! Hãy dùng câu hỏi hoặc sự thật bất ngờ thay thế." },
    { mistake: "Writing too formally", mistakeVi: "Viết quá trang trọng", tip: "An article is friendly! Use 'you', 'we', and rhetorical questions.", tipVi: "Bài viết thân thiện! Dùng 'you', 'we', và câu hỏi tu từ." },
  ],
  practiceSet: [
    { instruction: "Choose the best hook", instructionVi: "Chọn hook tốt nhất", question: "Topic: 'My favourite hobby'. Which opening is the best HOOK?", options: ["I will write about my hobby.", "My hobby is reading.", "Have you ever been so lost in a book that you forgot to eat dinner? That happens to me every weekend!", "This article is about hobbies."], answer: 2, explanation: "A question + personal experience = powerful hook!", explanationVi: "Câu hỏi + trải nghiệm cá nhân = hook mạnh mẽ!" },
    { instruction: "Identify article structure", instructionVi: "Xác định cấu trúc bài viết", question: "What's the correct order for a PET article?", options: ["Conclusion → Body → Introduction", "Title → Hook/Intro → Body paragraphs → Conclusion", "Body → Title → Conclusion", "Just write anything"], answer: 1, explanation: "Title → Hook → Body → Conclusion is the standard article structure.", explanationVi: "Tiêu đề → Hook → Thân bài → Kết luận là cấu trúc chuẩn." },
  ],
  vocabulary: [
    { word: "hook", meaning: "an opening that grabs attention", meaningVi: "câu mở đầu thu hút chú ý", example: "Start your article with a hook!" },
    { word: "rhetorical question", meaning: "a question asked for effect, not a real answer", meaningVi: "câu hỏi tu từ (không cần trả lời)", example: "Who doesn't love summer?" },
    { word: "conclusion", meaning: "the final paragraph summing up", meaningVi: "kết luận, đoạn cuối tóm tắt", example: "In conclusion, reading is the best hobby!" },
  ],
  quiz: [
    { question: "What should you NOT start an article with?", options: ["A question", "A surprising fact", "'I will write about...'", "A personal story"], answer: 2, explanation: "'I will write about...' is boring and loses marks — use a hook instead!" },
    { question: "How many body paragraphs does a PET article usually have?", options: ["1", "2", "4", "6"], answer: 1, explanation: "2 body paragraphs is the ideal structure for a PET article." },
    { question: "What language style should you use in a PET article?", options: ["Very formal", "Informal/neutral", "Academic", "Legal"], answer: 1, explanation: "Articles use informal/neutral language — contractions and 'you' are fine!" },
  ],
  parentInfo: "This lesson covers PET Writing Part 2 — writing an article. Your teen learns the 'hook' technique and structured paragraph writing, skills that transfer to real-world writing and higher-level exams like FCE.",
  parentInfoVi: "Bài này dạy Viết Phần 2 PET — viết bài viết. Con em bạn học kỹ thuật 'hook' và viết đoạn có cấu trúc, kỹ năng áp dụng được cho viết thực tế và thi cấp cao hơn.",
};

// === Export all lectures ===
export const allCambridgeLectures: CambridgeLecture[] = [
  startersColors,
  startersPrepositions,
  moversDifferences,
  moversTenses,
  flyersMatching,
  flyersReadingWriting,
  ketEmail,
  ketSpeaking,
  petReading,
  petArticle,
];
