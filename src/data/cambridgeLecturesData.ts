// Cambridge Journey: From Starters to PET — 15 strategic lessons with deep content

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

export interface CambridgeStepGuide {
  step: number;
  title: string;
  titleVi: string;
  detail: string;
  detailVi: string;
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
  isNew?: boolean;
  /** Optional key to load a level-themed kid-friendly illustration in the lecture view. */
  illustrationKey?: "starters" | "movers" | "flyers" | "ket" | "pet";
}

// === LEVEL COLORS (Vibrant Glow Palette) ===
export const LEVEL_CONFIG: Record<CambridgeLevel, {
  label: string; labelVi: string;
  color: string; bgClass: string; borderClass: string; textClass: string;
  gradientFrom: string; gradientTo: string;
  glowColor: string;
}> = {
  starters: {
    label: "STARTERS", labelVi: "STARTERS",
    color: "#FF6B6B",
    bgClass: "bg-red-500/20", borderClass: "border-red-400/40", textClass: "text-red-300",
    gradientFrom: "#FF6B6B", gradientTo: "#FF8E53",
    glowColor: "rgba(255,107,107,0.3)",
  },
  movers: {
    label: "MOVERS", labelVi: "MOVERS",
    color: "#4ECDC4",
    bgClass: "bg-cyan-500/20", borderClass: "border-cyan-400/40", textClass: "text-cyan-300",
    gradientFrom: "#4ECDC4", gradientTo: "#44A3FF",
    glowColor: "rgba(78,205,196,0.3)",
  },
  flyers: {
    label: "FLYERS", labelVi: "FLYERS",
    color: "#45E89D",
    bgClass: "bg-emerald-500/20", borderClass: "border-emerald-400/40", textClass: "text-emerald-300",
    gradientFrom: "#45E89D", gradientTo: "#2DD4BF",
    glowColor: "rgba(69,232,157,0.3)",
  },
  ket: {
    label: "KET", labelVi: "KET",
    color: "#A78BFA",
    bgClass: "bg-purple-500/20", borderClass: "border-purple-400/40", textClass: "text-purple-300",
    gradientFrom: "#A78BFA", gradientTo: "#C084FC",
    glowColor: "rgba(167,139,250,0.3)",
  },
  pet: {
    label: "PET", labelVi: "PET",
    color: "#F59E0B",
    bgClass: "bg-amber-500/20", borderClass: "border-amber-400/40", textClass: "text-amber-300",
    gradientFrom: "#F59E0B", gradientTo: "#FBBF24",
    glowColor: "rgba(245,158,11,0.3)",
  },
};

// ============ LESSON 1: Starters — Colors & Numbers ============
const startersColors: CambridgeLecture = {
  id: "cam-starters-colors-numbers",
  title: "Conquer the Color Code: Master Listening Part 3 & 4",
  titleVi: "Chinh phục Mật mã Màu sắc: Làm chủ Nghe Phần 3 & 4",
  level: "starters",
  skill: "listening",
  icon: "🎨",
  duration: "15 min",
  description: "Discover the 'Distractor' technique where speakers deliberately change colors at the last second — and learn to catch the FINAL answer every time.",
  descriptionVi: "Khám phá kỹ thuật 'Bẫy đánh lạc hướng' khi người nói cố tình đổi màu vào giây cuối — và học cách bắt đúng đáp án CUỐI CÙNG mỗi lần.",
  learningObjective: "By the end of this lesson, students can identify the correct color and number from a listening passage even when distractors are used.",
  learningObjectiveVi: "Kết thúc bài, học sinh có thể nhận diện đúng màu sắc và số từ bài nghe ngay cả khi có bẫy đánh lạc hướng.",
  examPattern: "Starters Listening Part 3: Listen and tick the box. Part 4: Listen and color. The examiner reads a conversation about objects in a picture. Students must listen for the FINAL instruction.",
  examPatternVi: "Starters Nghe Phần 3: Nghe và đánh dấu ô đúng. Phần 4: Nghe và tô màu. Giám khảo đọc hội thoại về các vật trong hình. Học sinh phải nghe hướng dẫn CUỐI CÙNG.",
  secretTip: "🔑 The speaker will ALWAYS mention a wrong color first, then correct it. Wait for words like 'No, actually...' or 'I mean...' — that's where the real answer is!",
  secretTipVi: "🔑 Người nói LUÔN nói màu sai trước, rồi mới sửa lại. Đợi các cụm từ 'No, actually...' hoặc 'I mean...' — đáp án thật ở đó!",
  welcomeMessage: "Hi friends! Today we crack the Color Code! 🎨 Speakers will try to TRICK you — but not anymore!",
  welcomeMessageVi: "Xin chào! Hôm nay chúng ta giải mã Mật mã Màu sắc! 🎨 Người nói sẽ cố ĐÁNH LỪA — nhưng không lừa được nữa!",
  stepByStep: [
    { step: 1, title: "Look at ALL the pictures first", titleVi: "Nhìn TẤT CẢ hình trước", detail: "Before listening, scan every picture. Identify what objects are there and what colors are possible.", detailVi: "Trước khi nghe, quét mọi hình. Xác định các vật thể và màu sắc có thể." },
    { step: 2, title: "Listen for the WHOLE conversation", titleVi: "Nghe TOÀN BỘ hội thoại", detail: "Don't pick your answer at the first color you hear. Wait until the speakers finish talking.", detailVi: "Đừng chọn đáp án ở màu đầu tiên nghe được. Đợi đến khi hết hội thoại." },
    { step: 3, title: "Catch the correction words", titleVi: "Bắt các từ sửa lại", detail: "Listen for: 'No, not that one...', 'Actually...', 'I mean...', 'Oh wait...' — the answer comes AFTER these.", detailVi: "Nghe: 'No, not that one...', 'Actually...', 'I mean...', 'Oh wait...' — đáp án ở SAU các từ này." },
  ],
  illustratedRules: [
    { icon: "👂", rule: "Listen to the WHOLE sentence — the answer is always at the END", ruleVi: "Nghe TOÀN BỘ câu — đáp án luôn ở CUỐI", example: "\"Color the big ball... no wait, the SMALL ball RED.\"" },
    { icon: "🔢", rule: "Thirteen (13) vs Thirty (30): Listen for the 'teen' ending", ruleVi: "Thirteen (13) vs Thirty (30): Nghe phần đuôi 'teen'", example: "ThirTEEN = 13 (stress on TEEN), THIRty = 30 (stress on THIR)" },
    { icon: "🖍️", rule: "Only color the EXACT object described — size + position matter", ruleVi: "Chỉ tô ĐÚNG vật được mô tả — kích thước + vị trí quan trọng", example: "\"The SMALL cat ON the chair\" — not the big cat, not the cat under the table!" },
  ],
  watchOut: [
    { mistake: "Coloring before hearing the correction", mistakeVi: "Tô màu trước khi nghe phần sửa", tip: "Keep your pencil UP until the whole sentence is done! The speaker often says 'No, make it BLUE instead.'", tipVi: "Giữ bút CHỜ đến khi hết câu! Người nói thường bảo 'No, make it BLUE instead.'" },
    { mistake: "Mixing up 'blue' /bluː/ and 'black' /blæk/", mistakeVi: "Nhầm 'blue' /bluː/ và 'black' /blæk/", tip: "Blue has a LONG sound: bluuuue. Black has a SHORT sharp sound: blACK!", tipVi: "Blue có âm DÀI: bluuuue. Black có âm NGẮN gọn: blACK!" },
    { mistake: "Not paying attention to SIZE words before the object", mistakeVi: "Không chú ý từ CHỈ KÍCH THƯỚC trước vật thể", tip: "Always listen for: big/small/tall/short/long + the object. 'The BIG dog' and 'the SMALL dog' are different!", tipVi: "Luôn nghe: big/small/tall/short/long + vật thể. 'The BIG dog' và 'the SMALL dog' là khác nhau!" },
  ],
  practiceSet: [
    { instruction: "Listen and choose the FINAL answer", instructionVi: "Nghe và chọn đáp án CUỐI CÙNG", question: "\"Color the three stars... no, I mean FOUR stars yellow.\" How many stars do you color?", options: ["3 stars", "4 stars", "5 stars", "2 stars"], answer: 1, explanation: "The speaker corrected: 'no, I mean FOUR' — so 4 is the real answer.", explanationVi: "Người nói sửa lại: 'no, I mean FOUR' — nên 4 là đáp án thật." },
    { instruction: "Catch the distractor", instructionVi: "Bắt bẫy đánh lạc hướng", question: "\"The cat ON the table is... actually, the cat UNDER the table is brown.\" Where is the brown cat?", options: ["On the table", "Under the table", "Next to the table", "Behind the table"], answer: 1, explanation: "After 'actually', the speaker corrects to UNDER the table.", explanationVi: "Sau 'actually', người nói sửa thành UNDER (dưới) bàn." },
    { instruction: "Number trap", instructionVi: "Bẫy số", question: "\"There are... let me count again... FIFTEEN pencils, not fifty.\" How many pencils?", options: ["50", "5", "15", "55"], answer: 2, explanation: "The speaker recounted and confirmed FIFTEEN (15), not fifty (50).", explanationVi: "Người nói đếm lại và xác nhận FIFTEEN (15), không phải fifty (50)." },
  ],
  vocabulary: [
    { word: "actually", meaning: "used to correct yourself", meaningVi: "thật ra (dùng để sửa lại)", example: "I want the red one... actually, the blue one." },
    { word: "thirteen", meaning: "number 13 (teen = -teen ending)", meaningVi: "số 13 (teen = đuôi -teen)", example: "There are thirteen birds in the tree." },
    { word: "thirty", meaning: "number 30 (ty = -ty ending)", meaningVi: "số 30 (ty = đuôi -ty)", example: "She has thirty books on her shelf." },
    { word: "instead", meaning: "in place of something else", meaningVi: "thay vào đó", example: "Color it blue instead of red." },
  ],
  quiz: [
    { question: "In Starters Listening, why shouldn't you choose the first color you hear?", options: ["Because it's too fast", "Because the speaker often CHANGES their answer", "Because the first color is always wrong", "Because you need to count"], answer: 1, explanation: "Speakers use distractors — they mention one color, then correct to the REAL answer." },
    { question: "What word tells you the speaker is correcting themselves?", options: ["Hello", "Actually / I mean", "Please", "Thank you"], answer: 1, explanation: "'Actually' and 'I mean' signal a correction — the real answer follows!" },
    { question: "How can you tell 'thirteen' (13) from 'thirty' (30)?", options: ["They sound the same", "Thirteen stresses TEEN at the end", "Thirty is louder", "You can't tell"], answer: 1, explanation: "ThirTEEN (stress on TEEN) vs THIRty (stress on THIR) — listen for the ending!" },
  ],
  parentInfo: "This lesson targets Cambridge Starters Listening Part 3 & 4 — the most challenging parts for young learners. Your child learns to resist 'distractor traps' where speakers change answers mid-sentence, building critical listening discipline.",
  parentInfoVi: "Bài này nhắm vào Starters Nghe Phần 3 & 4 — phần khó nhất cho trẻ nhỏ. Con em bạn học cách chống lại 'bẫy đánh lạc hướng' khi người nói đổi đáp án giữa câu, xây dựng kỷ luật nghe.",
};

// ============ LESSON 2: Starters — Prepositions ============
const startersPrepositions: CambridgeLecture = {
  id: "cam-starters-prepositions",
  title: "Master the Position Map: In, On, Under, Behind, Next to",
  titleVi: "Làm chủ Bản đồ Vị trí: In, On, Under, Behind, Next to",
  level: "starters",
  skill: "vocabulary",
  icon: "🐒",
  duration: "15 min",
  description: "Discover the 5 'Position Powerwords' that appear in EVERY Starters exam — learn the visual trick to never confuse them again.",
  descriptionVi: "Khám phá 5 'Từ Quyền lực Vị trí' xuất hiện trong MỌI đề thi Starters — học mẹo trực quan để không bao giờ nhầm nữa.",
  learningObjective: "Students will correctly use all 5 prepositions of place in context and identify them in listening/reading exercises.",
  learningObjectiveVi: "Học sinh sẽ dùng đúng 5 giới từ chỉ vị trí trong ngữ cảnh và nhận diện chúng trong bài nghe/đọc.",
  examPattern: "Starters Reading & Writing Part 3: Read and choose (fill-in). Starters Listening Part 2: Write the name of the object and where it is. Prepositions are tested in BOTH skills.",
  examPatternVi: "Starters Đọc & Viết Phần 3: Đọc và chọn (điền từ). Nghe Phần 2: Viết tên vật và vị trí. Giới từ được thi ở CẢ HAI kỹ năng.",
  secretTip: "🔑 Draw a tiny house in your mind: IN = inside the house, ON = on the roof, UNDER = in the basement, BEHIND = at the back door, NEXT TO = the neighbor's house!",
  secretTipVi: "🔑 Vẽ một ngôi nhà nhỏ trong đầu: IN = trong nhà, ON = trên mái, UNDER = dưới tầng hầm, BEHIND = ở cửa sau, NEXT TO = nhà hàng xóm!",
  welcomeMessage: "Let's play hide and seek with words! 🐒 After this lesson, you'll find EVERY hidden object!",
  welcomeMessageVi: "Cùng chơi trốn tìm với từ vựng! 🐒 Sau bài này, bạn sẽ tìm được MỌI vật bị giấu!",
  stepByStep: [
    { step: 1, title: "Learn each preposition with a picture", titleVi: "Học mỗi giới từ với một hình ảnh", detail: "IN = the ball is INSIDE the box (surrounded). ON = the ball is touching the TOP surface.", detailVi: "IN = quả bóng BÊN TRONG hộp (được bao quanh). ON = quả bóng chạm bề mặt TRÊN." },
    { step: 2, title: "Practice with 'Where is it?' questions", titleVi: "Luyện với câu hỏi 'Nó ở đâu?'", detail: "Look at a picture and describe: 'The cat is UNDER the table. The book is ON the shelf.'", detailVi: "Nhìn hình và mô tả: 'The cat is UNDER the table. The book is ON the shelf.'" },
    { step: 3, title: "Test yourself with tricky pairs", titleVi: "Tự kiểm tra với các cặp dễ nhầm", detail: "IN vs ON: IN the box (inside) vs ON the box (on top). BEHIND vs NEXT TO: behind (can't see) vs next to (can see).", detailVi: "IN vs ON: IN the box (bên trong) vs ON the box (trên đỉnh). BEHIND vs NEXT TO: behind (không thấy) vs next to (thấy được)." },
  ],
  illustratedRules: [
    { icon: "📦", rule: "IN = completely INSIDE (surrounded by walls/sides)", ruleVi: "IN = hoàn toàn BÊN TRONG (được bao quanh bởi thành/cạnh)", example: "The ball is IN the box → you can't see the whole ball!" },
    { icon: "🔝", rule: "ON = touching the TOP surface (supported from below)", ruleVi: "ON = chạm bề mặt TRÊN (được đỡ từ dưới)", example: "The cup is ON the table → it's sitting on top, not inside!" },
    { icon: "⬇️", rule: "UNDER = directly BELOW something (covered)", ruleVi: "UNDER = trực tiếp BÊN DƯỚI (bị che phủ)", example: "The shoes are UNDER the bed → the bed is above them!" },
    { icon: "🔙", rule: "BEHIND = at the BACK (hidden from view)", ruleVi: "BEHIND = ở phía SAU (bị che khuất)", example: "The cat is BEHIND the door → you can't see it from the front!" },
  ],
  watchOut: [
    { mistake: "Confusing IN and ON — they are NOT the same!", mistakeVi: "Nhầm IN và ON — chúng KHÔNG giống nhau!", tip: "Test: Can you see ALL of the object? If YES → it's ON. If NO (it's surrounded) → it's IN.", tipVi: "Kiểm tra: Bạn thấy TOÀN BỘ vật thể không? NẾU CÓ → ON. NẾU KHÔNG (bị bao quanh) → IN." },
    { mistake: "Forgetting 'between' for objects in the MIDDLE", mistakeVi: "Quên 'between' cho vật ở GIỮA", tip: "'Between' = in the middle of TWO things. The park is BETWEEN the school and the hospital.", tipVi: "'Between' = ở giữa HAI vật. Công viên ở GIỮA trường và bệnh viện." },
  ],
  practiceSet: [
    { instruction: "Choose the correct preposition", instructionVi: "Chọn giới từ đúng", question: "The monkey is sitting on top of a tree branch. The monkey is ___ the tree.", options: ["in", "on", "under", "behind"], answer: 1, explanation: "Sitting on a branch = ON (touching the surface on top).", explanationVi: "Ngồi trên cành = ON (chạm bề mặt phía trên)." },
    { instruction: "Fill in the blank", instructionVi: "Điền vào chỗ trống", question: "The ball is completely inside the box. You can't see it. The ball is ___ the box.", options: ["on", "in", "under", "next to"], answer: 1, explanation: "Completely inside = IN (surrounded by the box).", explanationVi: "Hoàn toàn bên trong = IN (bị hộp bao quanh)." },
    { instruction: "Where is the cat?", instructionVi: "Con mèo ở đâu?", question: "You can hear the cat but can't see it. The sofa is blocking your view. The cat is ___ the sofa.", options: ["on", "in", "under", "behind"], answer: 3, explanation: "If the sofa blocks your view → the cat is BEHIND the sofa (hidden at the back).", explanationVi: "Nếu sofa che khuất → mèo ở PHÍA SAU sofa (bị giấu ở sau)." },
  ],
  vocabulary: [
    { word: "in", meaning: "inside something (surrounded)", meaningVi: "bên trong (được bao quanh)", example: "The pencil is in the bag." },
    { word: "on", meaning: "touching the top surface", meaningVi: "trên bề mặt", example: "The cup is on the table." },
    { word: "under", meaning: "directly below", meaningVi: "bên dưới", example: "The shoes are under the bed." },
    { word: "behind", meaning: "at the back (hidden)", meaningVi: "phía sau (bị che)", example: "The cat is behind the door." },
    { word: "next to", meaning: "right beside", meaningVi: "ngay bên cạnh", example: "The park is next to the school." },
    { word: "between", meaning: "in the middle of two things", meaningVi: "ở giữa hai vật", example: "The shop is between the bank and the café." },
  ],
  quiz: [
    { question: "The ball is completely surrounded by the box. It's ___ the box.", options: ["on", "in", "under", "behind"], answer: 1, explanation: "Surrounded = IN. If you can't see the whole ball, it's inside." },
    { question: "My phone is below the pile of books. It's ___ the books.", options: ["on", "behind", "next to", "under"], answer: 3, explanation: "Below a pile = UNDER. The books are on top of the phone." },
    { question: "Which preposition means 'right beside, very close'?", options: ["in", "on", "next to", "under"], answer: 2, explanation: "'Next to' means directly beside something, close enough to touch." },
  ],
  parentInfo: "This lesson covers Prepositions of Place — tested in both Listening and Reading at Starters level. Your child learns visual memory techniques to distinguish similar prepositions, a skill that carries through all Cambridge levels.",
  parentInfoVi: "Bài này dạy Giới từ chỉ vị trí — được thi ở cả Nghe và Đọc cấp Starters. Con em bạn học kỹ thuật ghi nhớ trực quan để phân biệt các giới từ tương tự.",
};

// ============ LESSON 3: Movers — Difference Finder ============
const moversDifferences: CambridgeLecture = {
  id: "cam-movers-differences",
  title: "Discover 5 Differences: The Comparison Formula That Gets Full Marks",
  titleVi: "Khám phá 5 Điểm khác: Công thức So sánh Đạt Điểm Tối đa",
  level: "movers",
  skill: "speaking",
  icon: "🔍",
  duration: "20 min",
  description: "Master the 'Scan & Compare' method — systematically find and describe ALL 5 differences using the 'In this picture... but in that picture...' structure that examiners love.",
  descriptionVi: "Làm chủ phương pháp 'Quét & So sánh' — tìm và mô tả có hệ thống TẤT CẢ 5 điểm khác bằng cấu trúc 'In this picture... but in that picture...' mà giám khảo yêu thích.",
  learningObjective: "Students will systematically identify 5 differences and describe each one using full comparative sentences.",
  learningObjectiveVi: "Học sinh sẽ nhận diện có hệ thống 5 điểm khác và mô tả mỗi điểm bằng câu so sánh đầy đủ.",
  examPattern: "Movers Speaking Part 2: The examiner gives you two pictures. You must find and describe the differences between them. Full marks require describing 4-5 differences using complete sentences.",
  examPatternVi: "Movers Nói Phần 2: Giám khảo đưa hai bức tranh. Bạn phải tìm và mô tả điểm khác biệt. Điểm tối đa cần mô tả 4-5 điểm khác bằng câu hoàn chỉnh.",
  secretTip: "🔑 Scan in a Z-pattern: top-left → top-right → bottom-left → bottom-right. You'll catch differences you'd miss otherwise!",
  secretTipVi: "🔑 Quét theo hình chữ Z: trên-trái → trên-phải → dưới-trái → dưới-phải. Bạn sẽ bắt được điểm khác mà mình suýt bỏ lỡ!",
  welcomeMessage: "Detective time! 🔍 I'll teach you the SECRET scanning method that finds ALL 5 differences in under 30 seconds!",
  welcomeMessageVi: "Thời gian thám tử! 🔍 Thầy sẽ dạy phương pháp quét BÍ MẬT tìm TẤT CẢ 5 điểm khác trong dưới 30 giây!",
  stepByStep: [
    { step: 1, title: "Z-Scan both pictures", titleVi: "Quét chữ Z cả hai hình", detail: "Look at the top-left of both pictures first, then scan right, then bottom-left, then bottom-right.", detailVi: "Nhìn góc trên-trái cả hai hình trước, rồi quét sang phải, rồi dưới-trái, rồi dưới-phải." },
    { step: 2, title: "Use the magic structure", titleVi: "Dùng cấu trúc thần kỳ", detail: "For EVERY difference say: 'In this picture, [X], but in that picture, [Y].' This guarantees full sentences.", detailVi: "Cho MỖI điểm khác nói: 'In this picture, [X], but in that picture, [Y].' Đảm bảo câu đầy đủ." },
    { step: 3, title: "Check you've found at least 4", titleVi: "Kiểm tra đã tìm ít nhất 4", detail: "Count on your fingers: 1, 2, 3, 4... If you only have 3, scan the COLORS and SIZES — those are often missed!", detailVi: "Đếm trên ngón tay: 1, 2, 3, 4... Nếu chỉ có 3, quét MÀU SẮC và KÍCH THƯỚC — thường bị bỏ sót!" },
  ],
  illustratedRules: [
    { icon: "👀", rule: "Z-Scan: top-left → top-right → bottom-left → bottom-right", ruleVi: "Quét chữ Z: trên-trái → trên-phải → dưới-trái → dưới-phải", example: "This systematic scan prevents you from missing corner differences" },
    { icon: "🗣️", rule: "Always use: 'In this picture... but in that picture...'", ruleVi: "Luôn dùng: 'In this picture... but in that picture...'", example: "In this picture, the boy is wearing a hat, but in that picture, he isn't." },
    { icon: "📝", rule: "Describe ALL 5 — look for colors, sizes, numbers, positions, actions", ruleVi: "Mô tả ĐỦ 5 — tìm màu sắc, kích thước, số lượng, vị trí, hành động", example: "Color change, size change, number change, position change, action change" },
  ],
  watchOut: [
    { mistake: "Saying 'Here is a cat, there is no cat' — too simple!", mistakeVi: "Nói 'Here is a cat, there is no cat' — quá đơn giản!", tip: "Instead: 'In this picture, there's a cat ON the sofa, but in that picture, the cat is UNDER the table.'", tipVi: "Thay vào đó: 'In this picture, there's a cat ON the sofa, but in that picture, the cat is UNDER the table.'" },
    { mistake: "Only pointing without speaking full sentences", mistakeVi: "Chỉ trỏ mà không nói câu đầy đủ", tip: "The examiner can't mark gestures! Use WORDS. Even if your English isn't perfect, full sentences score higher.", tipVi: "Giám khảo không chấm cử chỉ! Dùng LỜI NÓI. Dù tiếng Anh chưa hoàn hảo, câu đầy đủ vẫn được điểm cao hơn." },
  ],
  practiceSet: [
    { instruction: "Describe the difference using the formula", instructionVi: "Mô tả điểm khác bằng công thức", question: "Picture A: A girl is reading. Picture B: A girl is writing. Complete: 'In picture A, the girl is ___, but in picture B, she is ___.'", options: ["reading / writing", "sleeping / eating", "standing / sitting", "happy / sad"], answer: 0, explanation: "reading / writing — describe the exact action difference using the comparison structure.", explanationVi: "reading / writing — mô tả chính xác sự khác biệt hành động bằng cấu trúc so sánh." },
    { instruction: "Spot & describe with numbers", instructionVi: "Tìm & mô tả bằng số", question: "Picture A has 3 birds. Picture B has 5 birds. What's the BEST description?", options: ["More birds in B", "In picture A there are three birds, but in picture B there are five birds", "Birds different", "I see birds"], answer: 1, explanation: "Full comparison with specific numbers = maximum marks!", explanationVi: "So sánh đầy đủ với số cụ thể = điểm tối đa!" },
  ],
  vocabulary: [
    { word: "difference", meaning: "something not the same between two things", meaningVi: "điểm khác biệt", example: "Can you spot the five differences?" },
    { word: "similar", meaning: "almost the same but not exactly", meaningVi: "tương tự", example: "The pictures are similar but have 5 differences." },
    { word: "but", meaning: "used to show contrast", meaningVi: "nhưng (chỉ sự tương phản)", example: "This one is big, but that one is small." },
    { word: "whereas", meaning: "formal way to show difference", meaningVi: "trong khi (cách trang trọng)", example: "In picture A the sun is out, whereas in B it's raining." },
  ],
  quiz: [
    { question: "What scanning method should you use to find differences?", options: ["Random looking", "Z-pattern: top-left → top-right → bottom-left → bottom-right", "Close your eyes first", "Only look at the center"], answer: 1, explanation: "The Z-scan ensures you check every corner systematically." },
    { question: "How many differences should you describe for full marks?", options: ["1-2", "2-3", "4-5", "6-7"], answer: 2, explanation: "The examiner expects 4-5 clearly described differences for maximum marks." },
  ],
  parentInfo: "This lesson covers Movers Speaking Part 2 — comparing two pictures. Your child learns the Z-scan technique and comparison formula, building systematic observation and structured speaking skills essential for all Cambridge levels.",
  parentInfoVi: "Bài này dạy Nói Phần 2 Movers — so sánh hai bức tranh. Con em bạn học kỹ thuật quét Z và công thức so sánh, xây dựng kỹ năng quan sát và nói có cấu trúc.",
};

// ============ LESSON 4: Movers — Verb Tenses ============
const moversTenses: CambridgeLecture = {
  id: "cam-movers-tenses",
  title: "Conquer Time Travel: Past Simple vs. Present Continuous in Stories",
  titleVi: "Chinh phục Du hành Thời gian: Quá khứ đơn vs. Hiện tại tiếp diễn trong Câu chuyện",
  level: "movers",
  skill: "reading-writing",
  icon: "📖",
  duration: "20 min",
  description: "Master the 'Time Machine' technique — instantly identify whether the story is about NOW or YESTERDAY by spotting Time Signal Words that the exam always uses.",
  descriptionVi: "Làm chủ kỹ thuật 'Cỗ máy Thời gian' — nhận diện ngay câu chuyện nói về BÂY GIỜ hay HÔM QUA bằng cách bắt Từ Tín hiệu Thời gian mà đề thi luôn dùng.",
  learningObjective: "Students can correctly choose between Past Simple and Present Continuous by identifying time signal words in any sentence.",
  learningObjectiveVi: "Học sinh có thể chọn đúng giữa Quá khứ đơn và Hiện tại tiếp diễn bằng cách nhận diện từ tín hiệu thời gian.",
  examPattern: "Movers Reading & Writing Part 4 & 6: Gap-fill exercises test verb tenses. Students must choose the correct verb form. Past Simple and Present Continuous are the TWO most tested tenses.",
  examPatternVi: "Movers Đọc & Viết Phần 4 & 6: Bài điền từ kiểm tra thì động từ. Quá khứ đơn và Hiện tại tiếp diễn là HAI thì được thi nhiều nhất.",
  secretTip: "🔑 Circle ALL time words FIRST before reading the questions. Yesterday/last/ago = Past. Now/look/at the moment = Present Continuous. This 5-second trick saves you from 80% of mistakes!",
  secretTipVi: "🔑 Khoanh tròn TẤT CẢ từ chỉ thời gian TRƯỚC khi đọc câu hỏi. Yesterday/last/ago = Quá khứ. Now/look/at the moment = Hiện tại tiếp diễn. Mẹo 5 giây này tránh 80% lỗi!",
  welcomeMessage: "Time travel activated! 📖 Let's jump between YESTERDAY and NOW — and never mix them up again!",
  welcomeMessageVi: "Kích hoạt du hành thời gian! 📖 Cùng nhảy giữa HÔM QUA và BÂY GIỜ — và không bao giờ nhầm nữa!",
  stepByStep: [
    { step: 1, title: "Scan for TIME WORDS first", titleVi: "Quét TỪ CHỈ THỜI GIAN trước", detail: "Before choosing a verb, find the time word: yesterday, last week, ago → Past Simple. Now, look!, right now → Present Continuous.", detailVi: "Trước khi chọn động từ, tìm từ thời gian: yesterday, last week, ago → Quá khứ. Now, look!, right now → Hiện tại tiếp diễn." },
    { step: 2, title: "Form the verb correctly", titleVi: "Chia động từ đúng", detail: "Past Simple: regular = add -ed (walked), irregular = memorize (went, ate, saw). Present Continuous: am/is/are + verb-ING.", detailVi: "Quá khứ đơn: thường = thêm -ed (walked), bất quy tắc = thuộc lòng (went, ate, saw). Hiện tại tiếp diễn: am/is/are + V-ING." },
    { step: 3, title: "Double-check by reading the full sentence", titleVi: "Kiểm tra lại bằng cách đọc cả câu", detail: "Read the complete sentence with your chosen verb. Does it make sense with the time word?", detailVi: "Đọc câu hoàn chỉnh với động từ đã chọn. Có hợp lý với từ thời gian không?" },
  ],
  illustratedRules: [
    { icon: "⏪", rule: "Past Simple = finished action → yesterday, last week, ago", ruleVi: "Quá khứ đơn = hành động xong → yesterday, last week, ago", example: "I playED football YESTERDAY. / She WENT to school LAST WEEK." },
    { icon: "🔄", rule: "Present Continuous = happening RIGHT NOW → now, look!, at this moment", ruleVi: "Hiện tại tiếp diễn = đang xảy ra NGAY BÂY GIỜ → now, look!, at this moment", example: "She IS playING football NOW. / LOOK! He IS runnING!" },
    { icon: "🔑", rule: "No time word? Look at the CONTEXT of the story", ruleVi: "Không có từ thời gian? Xem NGỮ CẢNH câu chuyện", example: "If the story is about 'what happened at the zoo' → Past Simple throughout" },
  ],
  watchOut: [
    { mistake: "Forgetting -ed for regular past verbs", mistakeVi: "Quên -ed cho động từ quá khứ thường", tip: "play → playED, walk → walkED, watch → watchED. Double consonant after short vowel: stop → stoPPED!", tipVi: "play → playED, walk → walkED, watch → watchED. Gấp đôi phụ âm sau nguyên âm ngắn: stop → stoPPED!" },
    { mistake: "Using 'is play' instead of 'is playing'", mistakeVi: "Dùng 'is play' thay vì 'is playing'", tip: "Present Continuous ALWAYS needs -ING! is + playING, is + readING, is + eatING.", tipVi: "Hiện tại tiếp diễn LUÔN cần -ING! is + playING, is + readING, is + eatING." },
  ],
  practiceSet: [
    { instruction: "Find the time word, choose the tense", instructionVi: "Tìm từ thời gian, chọn thì", question: "YESTERDAY, Tom ___ to school. (walk)", options: ["walks", "walked", "is walking", "walking"], answer: 1, explanation: "YESTERDAY = time signal for Past Simple → walked.", explanationVi: "YESTERDAY = tín hiệu Quá khứ đơn → walked." },
    { instruction: "What's happening NOW?", instructionVi: "Đang xảy ra BÂY GIỜ?", question: "LOOK! The children ___ in the park right now. (play)", options: ["played", "plays", "are playing", "play"], answer: 2, explanation: "LOOK! + right now = Present Continuous → are playing.", explanationVi: "LOOK! + right now = Hiện tại tiếp diễn → are playing." },
    { instruction: "Past or present?", instructionVi: "Quá khứ hay hiện tại?", question: "Last Saturday, we ___ a movie at home. (watch)", options: ["watching", "watched", "are watching", "watches"], answer: 1, explanation: "Last Saturday = past time signal → watched.", explanationVi: "Last Saturday = tín hiệu quá khứ → watched." },
  ],
  vocabulary: [
    { word: "yesterday", meaning: "the day before today", meaningVi: "hôm qua", example: "I went swimming yesterday." },
    { word: "now", meaning: "at this exact moment", meaningVi: "bây giờ, lúc này", example: "I am eating lunch now." },
    { word: "last week", meaning: "the week before this one", meaningVi: "tuần trước", example: "We visited grandma last week." },
    { word: "look!", meaning: "directing attention to something happening", meaningVi: "nhìn kìa! (chỉ việc đang xảy ra)", example: "Look! The bird is flying!" },
  ],
  quiz: [
    { question: "Which time word signals Past Simple?", options: ["now", "yesterday", "at this moment", "currently"], answer: 1, explanation: "'Yesterday' is a past time signal → Past Simple." },
    { question: "She ___ her homework now. (do)", options: ["did", "does", "is doing", "doing"], answer: 2, explanation: "'Now' = Present Continuous → is doing." },
    { question: "We ___ to the zoo last Sunday. (go)", options: ["go", "went", "are going", "going"], answer: 1, explanation: "'Last Sunday' = past → went (irregular verb: go → went)." },
  ],
  parentInfo: "This lesson teaches the two most critical verb tenses in Movers: Past Simple and Present Continuous. Your child learns the 'Time Signal' technique — a reliable method to choose the correct tense by identifying keywords, directly applicable to exam conditions.",
  parentInfoVi: "Bài này dạy hai thì quan trọng nhất trong Movers. Con em bạn học kỹ thuật 'Tín hiệu Thời gian' — phương pháp đáng tin cậy để chọn đúng thì bằng cách nhận diện từ khóa.",
};

// ============ LESSON 5: Movers — Reading Part 6 (NEW) ============
const moversReadingP6: CambridgeLecture = {
  id: "cam-movers-reading-p6",
  title: "Crack the Story Code: Writing Missing Words in Short Stories",
  titleVi: "Giải mã Câu chuyện: Viết từ còn thiếu trong Truyện ngắn",
  level: "movers",
  skill: "reading-writing",
  icon: "✏️",
  duration: "20 min",
  description: "Master the 'Grammar vs. Meaning' decision framework — learn to decide if a gap needs a GRAMMAR word (the, a, is) or a MEANING word (dog, happy, run) in under 3 seconds.",
  descriptionVi: "Làm chủ khung quyết định 'Ngữ pháp vs. Nghĩa' — học cách quyết định chỗ trống cần từ NGỮ PHÁP (the, a, is) hay từ NGHĨA (dog, happy, run) trong dưới 3 giây.",
  learningObjective: "Students can fill gaps in short stories by quickly deciding whether the gap requires a grammar word or a content word.",
  learningObjectiveVi: "Học sinh có thể điền chỗ trống trong truyện ngắn bằng cách nhanh chóng quyết định cần từ ngữ pháp hay từ nội dung.",
  examPattern: "Movers Reading & Writing Part 6: A short story with 5 gaps. Each gap needs ONE word. No word list is provided — students must think of the word themselves.",
  examPatternVi: "Movers Đọc & Viết Phần 6: Truyện ngắn với 5 chỗ trống. Mỗi chỗ cần MỘT từ. Không có danh sách từ — học sinh phải tự nghĩ từ.",
  secretTip: "🔑 90% of gaps in Part 6 are GRAMMAR words: a, the, is, was, and, but, to, at, in, on. Only memorize these 10 words and you'll fill most gaps correctly!",
  secretTipVi: "🔑 90% chỗ trống ở Phần 6 là từ NGỮ PHÁP: a, the, is, was, and, but, to, at, in, on. Chỉ cần thuộc 10 từ này là điền đúng hầu hết!",
  welcomeMessage: "Story detective mode! ✏️ Today you'll learn the SECRET: most missing words are tiny grammar words. Master them and you'll ace Part 6!",
  welcomeMessageVi: "Chế độ thám tử truyện! ✏️ Hôm nay bạn sẽ học BÍ MẬT: hầu hết từ thiếu là từ ngữ pháp nhỏ. Thành thạo chúng sẽ đạt điểm cao Phần 6!",
  stepByStep: [
    { step: 1, title: "Read the WHOLE story first", titleVi: "Đọc TOÀN BỘ truyện trước", detail: "Don't fill gaps one by one. Read everything to understand the story's meaning and time setting.", detailVi: "Đừng điền từng chỗ. Đọc hết để hiểu nghĩa câu chuyện và bối cảnh thời gian." },
    { step: 2, title: "Ask: Grammar or Meaning word?", titleVi: "Hỏi: Từ ngữ pháp hay từ nghĩa?", detail: "Look at words AROUND the gap. '__ dog' → article (a/the). 'She __ happy' → verb (is/was).", detailVi: "Xem từ XUNG QUANH chỗ trống. '__ dog' → mạo từ (a/the). 'She __ happy' → động từ (is/was)." },
    { step: 3, title: "Check the tense matches the story", titleVi: "Kiểm tra thì phù hợp câu chuyện", detail: "If the story uses 'yesterday', gaps need PAST forms: was, went, had. Not is, go, has.", detailVi: "Nếu truyện dùng 'yesterday', chỗ trống cần dạng QUÁ KHỨ: was, went, had. Không phải is, go, has." },
  ],
  illustratedRules: [
    { icon: "🧩", rule: "If a NOUN follows the gap → it's probably an article (a/the)", ruleVi: "Nếu DANH TỪ đi sau chỗ trống → có lẽ là mạo từ (a/the)", example: "___ dog ran fast → 'The' dog ran fast" },
    { icon: "🔗", rule: "If two sentences need connecting → try 'and', 'but', 'so', 'because'", ruleVi: "Nếu hai câu cần nối → thử 'and', 'but', 'so', 'because'", example: "She was tired ___ she went to bed → 'so' she went to bed" },
    { icon: "⏰", rule: "Match the tense of surrounding sentences", ruleVi: "Khớp thì với các câu xung quanh", example: "Yesterday she went to school. She ___ very happy. → 'was' (past like 'went')" },
  ],
  watchOut: [
    { mistake: "Writing a content word when it should be a grammar word", mistakeVi: "Viết từ nội dung khi cần từ ngữ pháp", tip: "If the gap is before a noun → probably 'a/the'. If before an adjective → probably 'is/was'. Start simple!", tipVi: "Chỗ trống trước danh từ → có lẽ 'a/the'. Trước tính từ → có lẽ 'is/was'. Bắt đầu đơn giản!" },
    { mistake: "Not checking if the whole sentence makes sense", mistakeVi: "Không kiểm tra cả câu có hợp lý không", tip: "Always read the complete sentence with your word. If it sounds weird, try another word!", tipVi: "Luôn đọc cả câu với từ đã chọn. Nếu nghe kỳ, thử từ khác!" },
  ],
  practiceSet: [
    { instruction: "Fill the gap", instructionVi: "Điền chỗ trống", question: "Last Saturday, Tom went to ___ park with his friends.", options: ["a", "the", "an", "is"], answer: 1, explanation: "'The park' — specific park (he always goes there). Article before noun.", explanationVi: "'The park' — công viên cụ thể (anh ấy luôn đến đó). Mạo từ trước danh từ." },
    { instruction: "Grammar or meaning?", instructionVi: "Ngữ pháp hay nghĩa?", question: "She ___ very happy because it was her birthday.", options: ["is", "was", "has", "can"], answer: 1, explanation: "'Was' matches the past tense ('it was her birthday').", explanationVi: "'Was' khớp với quá khứ ('it was her birthday')." },
    { instruction: "Connect the ideas", instructionVi: "Nối ý", question: "He wanted to play outside, ___ it was raining.", options: ["and", "but", "so", "because"], answer: 1, explanation: "'But' shows contrast — he WANTED to play, BUT it was raining (so he couldn't).", explanationVi: "'But' chỉ sự tương phản — anh ấy MUỐN chơi, NHƯNG trời mưa." },
  ],
  vocabulary: [
    { word: "article", meaning: "a/an/the — small words before nouns", meaningVi: "mạo từ — a/an/the trước danh từ", example: "A dog, the school, an apple" },
    { word: "conjunction", meaning: "a connecting word (and, but, so)", meaningVi: "liên từ (and, but, so)", example: "She was tired BUT she finished her homework." },
    { word: "gap", meaning: "an empty space to fill with a word", meaningVi: "chỗ trống cần điền từ", example: "Fill in the gap with one word." },
  ],
  quiz: [
    { question: "What type of word fills MOST gaps in Part 6?", options: ["Long adjectives", "Grammar words (a, the, is, was)", "People's names", "Numbers"], answer: 1, explanation: "About 90% of gaps need small grammar words — articles, verbs, conjunctions." },
    { question: "'She went to ___ school.' What word fills the gap?", options: ["big", "the", "happy", "go"], answer: 1, explanation: "'The school' — article before noun. The story already told us which school." },
  ],
  parentInfo: "This NEW lesson covers Movers Reading & Writing Part 6 — the most challenging part where students must write their own words. Your child learns the 'Grammar vs Meaning' decision framework, making gap-fill exercises systematic rather than guesswork.",
  parentInfoVi: "Bài MỚI này dạy Đọc & Viết Phần 6 Movers — phần khó nhất khi học sinh phải tự viết từ. Con em bạn học khung quyết định 'Ngữ pháp vs Nghĩa', biến bài điền từ thành hệ thống thay vì đoán mò.",
  isNew: true,
};

// ============ LESSON 6: Flyers — Matching Names ============
const flyersMatching: CambridgeLecture = {
  id: "cam-flyers-matching-names",
  title: "Master the Name Game: Listening Part 1 Name-Matching Strategy",
  titleVi: "Làm chủ Trò chơi Tên: Chiến lược Ghép tên Nghe Phần 1",
  level: "flyers",
  skill: "listening",
  icon: "👥",
  duration: "20 min",
  description: "Conquer the 'Last-Minute Switch' trap where speakers describe multiple people before confirming the RIGHT one — learn to wait for the FINAL description.",
  descriptionVi: "Chinh phục bẫy 'Đổi phút cuối' khi người nói mô tả nhiều người trước khi xác nhận đúng — học cách đợi mô tả CUỐI CÙNG.",
  learningObjective: "Students can accurately match names to people in pictures by listening for both appearance descriptions and actions, even when distractors are used.",
  learningObjectiveVi: "Học sinh có thể ghép đúng tên với nhân vật trong hình bằng cách nghe cả mô tả ngoại hình và hành động, kể cả khi có bẫy.",
  examPattern: "Flyers Listening Part 1: A picture with several people. Students listen to a conversation and match 5 names to the correct people. Key challenge: speakers often describe the WRONG person first.",
  examPatternVi: "Flyers Nghe Phần 1: Hình với nhiều nhân vật. Nghe hội thoại và ghép 5 tên vào đúng người. Thử thách chính: người nói thường mô tả NHẦM người trước.",
  secretTip: "🔑 Before listening, count the PEOPLE in the picture and note what makes each one UNIQUE (hat, color of shirt, what they're holding). This pre-scanning saves 50% of your thinking time!",
  secretTipVi: "🔑 Trước khi nghe, đếm NGƯỜI trong hình và ghi nhận điều KHÁC BIỆT của mỗi người (mũ, màu áo, đang cầm gì). Quét trước giúp tiết kiệm 50% thời gian suy nghĩ!",
  welcomeMessage: "Who's who? 👥 After this lesson, you'll catch EVERY name trick the speakers throw at you!",
  welcomeMessageVi: "Ai là ai? 👥 Sau bài này, bạn sẽ bắt được MỌI mẹo tên mà người nói dùng!",
  stepByStep: [
    { step: 1, title: "Pre-scan: Note unique features", titleVi: "Quét trước: Ghi nhận đặc điểm riêng", detail: "Before audio starts, look at each person. What's unique? Glasses, hat color, what they're doing.", detailVi: "Trước khi nghe, nhìn mỗi người. Gì đặc biệt? Kính, màu mũ, đang làm gì." },
    { step: 2, title: "Listen for TWO clues per person", titleVi: "Nghe HAI manh mối mỗi người", detail: "A name needs BOTH appearance + action: 'Ben is the boy in the blue hat who is HOLDING a ball.'", detailVi: "Cần CẢ ngoại hình + hành động: 'Ben is the boy in the blue hat who is HOLDING a ball.'" },
    { step: 3, title: "Watch for corrections", titleVi: "Chú ý phần sửa lại", detail: "If they say 'No, not that one...' or 'Actually, she's the one...' — the SECOND description is correct!", detailVi: "Nếu họ nói 'No, not that one...' hoặc 'Actually, she's the one...' — mô tả THỨ HAI mới đúng!" },
  ],
  illustratedRules: [
    { icon: "👂", rule: "Listen for DESCRIPTIONS: clothing + action + position", ruleVi: "Nghe MÔ TẢ: trang phục + hành động + vị trí", example: "\"Ben is the boy wearing the blue hat and holding a ball.\"" },
    { icon: "✏️", rule: "Write the name as a LINE to the person, not on them", ruleVi: "Viết tên bằng ĐƯỜNG NỐI đến nhân vật", example: "Draw a clean line from 'Ben' to the correct boy" },
    { icon: "🔄", rule: "Names may be SPELLED OUT — listen letter by letter", ruleVi: "Tên có thể được ĐÁNH VẦN — nghe từng chữ cái", example: "\"Her name is S-A-R-A-H, Sarah.\"" },
  ],
  watchOut: [
    { mistake: "Choosing the FIRST person the speaker describes", mistakeVi: "Chọn người ĐẦU TIÊN được mô tả", tip: "Wait! The speaker often describes the WRONG person first, then says 'No, actually...' to give the RIGHT answer.", tipVi: "Đợi đã! Người nói thường mô tả NHẦM người trước, rồi nói 'No, actually...' để cho đáp án ĐÚNG." },
    { mistake: "Not listening for the self-correction signal", mistakeVi: "Không nghe tín hiệu tự sửa", tip: "Key correction phrases: 'No, not that one...', 'Actually...', 'I mean the one who...', 'Oh wait...'", tipVi: "Cụm từ sửa: 'No, not that one...', 'Actually...', 'I mean the one who...', 'Oh wait...'" },
  ],
  practiceSet: [
    { instruction: "Match the name using TWO clues", instructionVi: "Ghép tên bằng HAI manh mối", question: "\"Tom is wearing a green shirt. He's the boy standing next to the tree.\" Who is Tom?", options: ["Boy on the bench", "Boy in green standing by the tree", "Boy running", "Girl in green"], answer: 1, explanation: "Green shirt (clue 1) + standing next to tree (clue 2) = Tom.", explanationVi: "Áo xanh (manh mối 1) + đứng cạnh cây (manh mối 2) = Tom." },
    { instruction: "Catch the correction", instructionVi: "Bắt phần sửa", question: "\"At first I thought Sarah was the girl with long hair, but actually, Sarah has SHORT hair and she's reading.\" Who is Sarah?", options: ["Girl with long hair", "Girl with short hair reading a book", "Girl standing", "Boy reading"], answer: 1, explanation: "After 'actually' = correction. SHORT hair + reading = Sarah.", explanationVi: "Sau 'actually' = phần sửa. Tóc NGẮN + đọc sách = Sarah." },
  ],
  vocabulary: [
    { word: "wearing", meaning: "having clothes/accessories on", meaningVi: "đang mặc/đeo", example: "She is wearing a red dress and glasses." },
    { word: "standing", meaning: "on your feet, upright position", meaningVi: "đang đứng", example: "He is standing near the window." },
    { word: "holding", meaning: "carrying in hands", meaningVi: "đang cầm/giữ", example: "She is holding a big book." },
    { word: "actually", meaning: "used to correct what was just said", meaningVi: "thật ra (sửa điều vừa nói)", example: "No, actually, Tom is the TALL boy." },
  ],
  quiz: [
    { question: "Before listening starts, what should you do?", options: ["Close your eyes", "Pre-scan the picture for unique features", "Write random names", "Start coloring"], answer: 1, explanation: "Pre-scanning helps you quickly identify who's who when you hear descriptions." },
    { question: "What does 'Actually, she's the one...' tell you?", options: ["The first answer was right", "A correction is coming — listen for the NEW answer", "Ignore this sentence", "It doesn't matter"], answer: 1, explanation: "'Actually' signals a correction — the NEXT description is the correct one." },
  ],
  parentInfo: "This lesson covers Flyers Listening Part 1 — the name-matching challenge. Your child learns pre-scanning techniques and how to handle speaker corrections, building advanced listening skills that transfer to KET/PET levels.",
  parentInfoVi: "Bài này dạy Nghe Phần 1 Flyers — thử thách ghép tên. Con em bạn học kỹ thuật quét trước và xử lý khi người nói tự sửa, xây dựng kỹ năng nghe nâng cao.",
};

// ============ LESSON 7: Flyers — Reading & Writing Part 4 ============
const flyersReadingWriting: CambridgeLecture = {
  id: "cam-flyers-reading-writing-p4",
  title: "Word Detective: Choosing the Perfect Word for Every Gap",
  titleVi: "Thám tử Từ vựng: Chọn Từ Hoàn hảo cho Mỗi Chỗ trống",
  level: "flyers",
  skill: "reading-writing",
  icon: "📝",
  duration: "20 min",
  description: "Master the 'Context Clue Triangle' — read the words BEFORE, AFTER, and AROUND each gap to eliminate wrong choices and find the only word that fits grammar AND meaning.",
  descriptionVi: "Làm chủ 'Tam giác Manh mối Ngữ cảnh' — đọc từ TRƯỚC, SAU, và XUNG QUANH mỗi chỗ trống để loại đáp án sai và tìm từ duy nhất phù hợp cả ngữ pháp VÀ nghĩa.",
  learningObjective: "Students can systematically fill gaps by analyzing whether the sentence needs a noun, verb, adjective, or preposition.",
  learningObjectiveVi: "Học sinh có thể điền chỗ trống có hệ thống bằng cách phân tích câu cần danh từ, động từ, tính từ, hay giới từ.",
  examPattern: "Flyers Reading & Writing Part 4: A factual text (e.g., about animals/places) with gaps. Students choose from 3 options per gap. Tests grammar (articles, prepositions, tenses) AND vocabulary.",
  examPatternVi: "Flyers Đọc & Viết Phần 4: Bài đọc thực tế (ví dụ về động vật/địa điểm) với chỗ trống. Chọn 1 trong 3 đáp án. Kiểm tra ngữ pháp VÀ từ vựng.",
  secretTip: "🔑 Read the sentence WITHOUT the gap word. Ask: 'What TYPE of word is missing?' If it's before a noun → article/adjective. After 'is/was' → adjective/verb. After 'go/come' → preposition.",
  secretTipVi: "🔑 Đọc câu KHÔNG CÓ từ trong chỗ trống. Hỏi: 'LOẠI từ nào bị thiếu?' Trước danh từ → mạo từ/tính từ. Sau 'is/was' → tính từ/động từ. Sau 'go/come' → giới từ.",
  welcomeMessage: "Word detective mode ON! 🔎 Every gap has clues hiding in the sentence. I'll teach you to find them!",
  welcomeMessageVi: "Chế độ thám tử từ vựng BẬT! 🔎 Mỗi chỗ trống đều có manh mối ẩn trong câu. Thầy sẽ dạy bạn tìm chúng!",
  stepByStep: [
    { step: 1, title: "Read the WHOLE text first", titleVi: "Đọc TOÀN BỘ bài trước", detail: "Understand the topic. Is it about animals? A place? A person? This context helps eliminate wrong answers.", detailVi: "Hiểu chủ đề. Về động vật? Địa điểm? Con người? Ngữ cảnh giúp loại đáp án sai." },
    { step: 2, title: "Look BEFORE and AFTER the gap", titleVi: "Nhìn TRƯỚC và SAU chỗ trống", detail: "Words around the gap tell you what type of word fits. 'She went ___ school' → preposition (to).", detailVi: "Từ xung quanh cho biết loại từ phù hợp. 'She went ___ school' → giới từ (to)." },
    { step: 3, title: "Try ALL options in the sentence", titleVi: "Thử TẤT CẢ đáp án vào câu", detail: "Read the complete sentence with each option. Only ONE will make sense grammatically AND in meaning.", detailVi: "Đọc câu hoàn chỉnh với mỗi đáp án. Chỉ MỘT đáp án hợp lý cả ngữ pháp VÀ nghĩa." },
  ],
  illustratedRules: [
    { icon: "📖", rule: "Read the WHOLE text before filling ANY gaps", ruleVi: "Đọc TOÀN BỘ bài trước khi điền BẤT KỲ chỗ trống", example: "Understanding the story helps you choose better words" },
    { icon: "🔎", rule: "The Context Clue Triangle: BEFORE + GAP + AFTER", ruleVi: "Tam giác Manh mối: TRƯỚC + CHỖ TRỐNG + SAU", example: "'She went ___ school' → 'to' (go TO school)" },
    { icon: "🧩", rule: "Identify the WORD TYPE needed: noun, verb, adj, or preposition", ruleVi: "Xác định LOẠI TỪ cần: danh, động, tính từ, hay giới từ", example: "'The ___ boy ran fast' → adjective (tall, young, small)" },
  ],
  watchOut: [
    { mistake: "Choosing a word because it 'looks right' without reading the full sentence", mistakeVi: "Chọn từ vì 'trông đúng' mà không đọc cả câu", tip: "Always plug your answer INTO the full sentence and read it aloud in your head. Does it flow naturally?", tipVi: "Luôn đặt đáp án VÀO câu đầy đủ và đọc thầm. Có tự nhiên không?" },
    { mistake: "Not checking grammar agreement (he go vs he goes)", mistakeVi: "Không kiểm tra hòa hợp ngữ pháp (he go vs he goes)", tip: "'She ___ to school' needs a conjugated verb: goes/went, NOT 'go'.", tipVi: "'She ___ to school' cần động từ chia: goes/went, KHÔNG phải 'go'." },
  ],
  practiceSet: [
    { instruction: "Use context clues", instructionVi: "Dùng manh mối ngữ cảnh", question: "Yesterday, Lily ___ to the park with her friends.", options: ["go", "went", "going"], answer: 1, explanation: "Yesterday = past tense. Go → went (irregular past).", explanationVi: "Yesterday = quá khứ. Go → went (bất quy tắc)." },
    { instruction: "What type of word is needed?", instructionVi: "Cần loại từ nào?", question: "The children were very ___ because it was their birthday.", options: ["happy", "sadly", "run"], answer: 0, explanation: "After 'were very ___' we need an ADJECTIVE → happy.", explanationVi: "Sau 'were very ___' cần TÍNH TỪ → happy." },
    { instruction: "Choose the preposition", instructionVi: "Chọn giới từ", question: "She put the books ___ the shelf.", options: ["at", "in", "on"], answer: 2, explanation: "Books go ON a shelf (sitting on top of a surface).", explanationVi: "Sách nằm TRÊN kệ (trên bề mặt)." },
  ],
  vocabulary: [
    { word: "context", meaning: "the words/sentences around a word", meaningVi: "ngữ cảnh (từ/câu xung quanh)", example: "Use context to understand the meaning." },
    { word: "clue", meaning: "a hint that helps you find the answer", meaningVi: "manh mối giúp tìm đáp án", example: "The time word 'yesterday' is a clue for past tense." },
    { word: "eliminate", meaning: "to rule out wrong options", meaningVi: "loại bỏ đáp án sai", example: "Eliminate the options that don't make sense." },
  ],
  quiz: [
    { question: "What should you do FIRST in a gap-fill exercise?", options: ["Fill the first gap", "Read the whole text", "Count the gaps", "Close the book"], answer: 1, explanation: "Always read the whole text first to understand context." },
    { question: "'The dog ___ very hungry.' What word type is needed?", options: ["Noun", "Verb (was/is)", "Adverb", "Preposition"], answer: 1, explanation: "'The dog __ hungry' needs a linking verb: was/is." },
  ],
  parentInfo: "This lesson covers Flyers Reading & Writing Part 4 — gap-fill with factual texts. Your child learns the 'Context Clue Triangle' to systematically choose correct answers, a technique that scales up to KET and PET levels.",
  parentInfoVi: "Bài này dạy Đọc & Viết Phần 4 Flyers. Con em bạn học 'Tam giác Manh mối Ngữ cảnh' để chọn đáp án có hệ thống.",
};

// ============ LESSON 8: Flyers — Picture Storytelling (NEW) ============
const flyersPictureStory: CambridgeLecture = {
  id: "cam-flyers-picture-story",
  title: "Picture Storytelling: The 'First, Then, Next, Finally' Formula",
  titleVi: "Kể chuyện qua Tranh: Công thức 'First, Then, Next, Finally'",
  level: "flyers",
  skill: "speaking",
  icon: "🎬",
  duration: "25 min",
  description: "Conquer Speaking Part 3 by learning the 4-step storytelling formula that organizes ANY set of pictures into a clear, high-scoring narrative the examiner loves.",
  descriptionVi: "Chinh phục Nói Phần 3 bằng công thức kể chuyện 4 bước biến BẤT KỲ bộ tranh nào thành câu chuyện rõ ràng, điểm cao mà giám khảo yêu thích.",
  learningObjective: "Students can narrate a sequence of picture stories using time markers and descriptive language to achieve full marks in Speaking Part 3.",
  learningObjectiveVi: "Học sinh có thể kể câu chuyện từ tranh bằng từ nối thời gian và ngôn ngữ mô tả để đạt điểm tối đa Nói Phần 3.",
  examPattern: "Flyers Speaking Part 3: The examiner gives you a sequence of 4-5 pictures telling a story. You must tell the story using your own words. No questions — you narrate freely.",
  examPatternVi: "Flyers Nói Phần 3: Giám khảo đưa chuỗi 4-5 tranh kể một câu chuyện. Bạn phải kể bằng lời riêng. Không có câu hỏi — bạn tự kể.",
  secretTip: "🔑 Add ONE feeling or thought to each picture: 'The boy looked excited because...' or 'She felt worried when...' — this shows advanced vocabulary and gets bonus marks!",
  secretTipVi: "🔑 Thêm MỘT cảm xúc hoặc suy nghĩ cho mỗi tranh: 'The boy looked excited because...' hoặc 'She felt worried when...' — thể hiện từ vựng nâng cao và được thêm điểm!",
  welcomeMessage: "Lights, camera, action! 🎬 Today you'll learn to tell stories like a movie director — with a beginning, middle, and exciting end!",
  welcomeMessageVi: "Đèn, máy quay, hành động! 🎬 Hôm nay bạn sẽ học kể chuyện như đạo diễn phim — có mở đầu, diễn biến, và kết thúc hấp dẫn!",
  stepByStep: [
    { step: 1, title: "Scan ALL pictures before speaking", titleVi: "Quét TẤT CẢ tranh trước khi nói", detail: "Look at all 4-5 pictures silently first. Understand the WHOLE story before you start talking.", detailVi: "Nhìn hết 4-5 tranh im lặng trước. Hiểu TOÀN BỘ câu chuyện trước khi nói." },
    { step: 2, title: "Use time markers for each picture", titleVi: "Dùng từ nối thời gian cho mỗi tranh", detail: "Picture 1: 'First/One day...' Picture 2: 'Then...' Picture 3: 'Next/After that...' Picture 4: 'Finally...'", detailVi: "Tranh 1: 'First/One day...' Tranh 2: 'Then...' Tranh 3: 'Next/After that...' Tranh 4: 'Finally...'" },
    { step: 3, title: "Add feelings for bonus marks", titleVi: "Thêm cảm xúc để được thêm điểm", detail: "For each picture, say how the character FEELS: 'He looked happy/worried/surprised because...'", detailVi: "Cho mỗi tranh, nói nhân vật CẢM THẤY gì: 'He looked happy/worried/surprised because...'" },
  ],
  illustratedRules: [
    { icon: "1️⃣", rule: "First/One day... (start the story)", ruleVi: "First/One day... (bắt đầu câu chuyện)", example: "One day, a boy was walking to school when he saw a dog." },
    { icon: "2️⃣", rule: "Then/After that... (continue the action)", ruleVi: "Then/After that... (tiếp tục hành động)", example: "Then, he picked up the dog and took it home." },
    { icon: "3️⃣", rule: "Next... (build the story)", ruleVi: "Next... (phát triển câu chuyện)", example: "Next, his mother helped him give the dog some food." },
    { icon: "4️⃣", rule: "Finally/In the end... (finish the story)", ruleVi: "Finally/In the end... (kết thúc câu chuyện)", example: "Finally, they found the dog's owner and everyone was happy!" },
  ],
  watchOut: [
    { mistake: "Just listing what you see: 'There is a boy. There is a dog. There is a house.'", mistakeVi: "Chỉ liệt kê: 'There is a boy. There is a dog. There is a house.'", tip: "TELL A STORY — connect the pictures! Don't just describe what's there. Show WHAT HAPPENS.", tipVi: "KỂ CHUYỆN — kết nối các tranh! Đừng chỉ mô tả. Cho thấy CHUYỆN GÌ XẢY RA." },
    { mistake: "Not using Past Simple for storytelling", mistakeVi: "Không dùng Quá khứ đơn để kể chuyện", tip: "Stories use Past Simple: 'The boy WALKED... He SAW... They WENT...' NOT 'The boy walks...'", tipVi: "Kể chuyện dùng Quá khứ đơn: 'The boy WALKED... He SAW... They WENT...' KHÔNG PHẢI 'The boy walks...'" },
  ],
  practiceSet: [
    { instruction: "Choose the best story opener", instructionVi: "Chọn câu mở đầu tốt nhất", question: "Picture 1 shows a girl waking up on a sunny morning. Which opening is best?", options: ["There is a girl.", "One sunny morning, a girl woke up and felt very excited because it was her birthday!", "Girl. Morning. Sun.", "The girl is happy."], answer: 1, explanation: "Full sentence with time marker + feeling = high-scoring opening!", explanationVi: "Câu đầy đủ với từ thời gian + cảm xúc = mở đầu điểm cao!" },
    { instruction: "Connect the pictures", instructionVi: "Kết nối các tranh", question: "Which time marker should you use for Picture 3?", options: ["First", "One day", "Next / After that", "The end"], answer: 2, explanation: "Picture 3 = middle of the story → 'Next' or 'After that'.", explanationVi: "Tranh 3 = giữa câu chuyện → 'Next' hoặc 'After that'." },
  ],
  vocabulary: [
    { word: "first", meaning: "at the beginning", meaningVi: "đầu tiên", example: "First, the boy went to the shop." },
    { word: "then", meaning: "after that (next step)", meaningVi: "sau đó (bước tiếp)", example: "Then, he bought some bread." },
    { word: "finally", meaning: "at the end, the last thing", meaningVi: "cuối cùng", example: "Finally, he went home and ate dinner." },
    { word: "excited", meaning: "very happy and eager", meaningVi: "hào hứng, phấn khích", example: "She looked excited about her birthday." },
  ],
  quiz: [
    { question: "What should you do BEFORE starting to tell the story?", options: ["Start talking immediately", "Look at ALL pictures first to understand the whole story", "Only look at picture 1", "Ask the examiner"], answer: 1, explanation: "Always scan all pictures first to plan your narrative arc." },
    { question: "What tense should you use for picture stories?", options: ["Present Simple", "Future", "Past Simple", "All of them equally"], answer: 2, explanation: "Stories are told in Past Simple: 'The boy walked... He saw...'." },
  ],
  parentInfo: "This NEW lesson covers Flyers Speaking Part 3 — picture storytelling. Your child learns a foolproof 4-step formula (First, Then, Next, Finally) and how to add emotional language for bonus marks. This skill directly prepares them for KET/PET narrative tasks.",
  parentInfoVi: "Bài MỚI này dạy Nói Phần 3 Flyers — kể chuyện qua tranh. Con em bạn học công thức 4 bước và cách thêm ngôn ngữ cảm xúc để được thêm điểm.",
  isNew: true,
};

// ============ LESSON 9: KET — Email Writing ============
const ketEmail: CambridgeLecture = {
  id: "cam-ket-email-writing",
  title: "The 3-Sentence Email Formula: Answer ALL Prompts in 25 Words",
  titleVi: "Công thức Email 3 Câu: Trả lời TẤT CẢ Gợi ý trong 25 Từ",
  level: "ket",
  skill: "reading-writing",
  icon: "✉️",
  duration: "25 min",
  description: "Discover the '1 Prompt = 1 Sentence' rule that guarantees you answer all 3 points every time — the simplest path to full marks in KET Writing Part 9.",
  descriptionVi: "Khám phá quy tắc '1 Gợi ý = 1 Câu' đảm bảo trả lời đủ 3 điểm mỗi lần — con đường đơn giản nhất đến điểm tối đa KET Viết Phần 9.",
  learningObjective: "Students can write a complete 25-35 word email response that addresses all 3 prompts using the one-sentence-per-prompt formula.",
  learningObjectiveVi: "Học sinh có thể viết email 25-35 từ trả lời đủ 3 gợi ý bằng công thức mỗi-gợi-ý-một-câu.",
  examPattern: "KET Writing Part 9: You receive an email from a friend with 3 prompts (underlined). Write 25-35 words responding to ALL THREE. Start with 'Hi [name],' and end naturally.",
  examPatternVi: "KET Viết Phần 9: Bạn nhận email từ bạn bè với 3 gợi ý (gạch chân). Viết 25-35 từ trả lời CẢ BA. Bắt đầu 'Hi [name],' và kết thúc tự nhiên.",
  secretTip: "🔑 After writing, TICK each prompt with your finger: ✓ Prompt 1, ✓ Prompt 2, ✓ Prompt 3. If you can't tick all three, you've missed one — add it immediately!",
  secretTipVi: "🔑 Sau khi viết, ĐẾM mỗi gợi ý bằng ngón tay: ✓ Gợi ý 1, ✓ Gợi ý 2, ✓ Gợi ý 3. Nếu không đếm đủ ba, bạn đã thiếu — thêm ngay!",
  welcomeMessage: "Email pro mode! ✉️ The secret? Just THREE sentences. One for each prompt. Simple, fast, and FULL MARKS!",
  welcomeMessageVi: "Chế độ pro viết email! ✉️ Bí quyết? Chỉ BA câu. Mỗi gợi ý một câu. Đơn giản, nhanh, và ĐIỂM TỐI ĐA!",
  stepByStep: [
    { step: 1, title: "Read the email and UNDERLINE the 3 prompts", titleVi: "Đọc email và GẠCH CHÂN 3 gợi ý", detail: "The 3 things you must answer are usually underlined. Circle or underline them so you don't forget.", detailVi: "3 điều cần trả lời thường được gạch chân. Khoanh hoặc gạch để không quên." },
    { step: 2, title: "Write ONE sentence for EACH prompt", titleVi: "Viết MỘT câu cho MỖI gợi ý", detail: "Prompt 1 → Sentence 1. Prompt 2 → Sentence 2. Prompt 3 → Sentence 3. Don't overthink!", detailVi: "Gợi ý 1 → Câu 1. Gợi ý 2 → Câu 2. Gợi ý 3 → Câu 3. Đừng suy nghĩ quá!" },
    { step: 3, title: "Count: Did I answer ALL THREE?", titleVi: "Đếm: Đã trả lời ĐỦ BA chưa?", detail: "Point to each prompt and find your answer for it. If one is missing, add it! This 10-second check prevents losing easy marks.", detailVi: "Chỉ vào mỗi gợi ý và tìm câu trả lời. Nếu thiếu, thêm vào! Kiểm tra 10 giây tránh mất điểm dễ." },
  ],
  illustratedRules: [
    { icon: "1️⃣", rule: "ONE sentence per prompt — keep it simple!", ruleVi: "MỘT câu cho mỗi gợi ý — giữ đơn giản!", example: "Prompt: 'say what time' → 'The party starts at 7 pm.'" },
    { icon: "🔢", rule: "Target 25-35 words — the sweet spot", ruleVi: "Nhắm 25-35 từ — khoảng lý tưởng", example: "Too short (10 words) = not enough. Too long (50+) = too many mistakes." },
    { icon: "👋", rule: "Start with 'Hi [name],' — end with something natural", ruleVi: "Bắt đầu 'Hi [name],' — kết thúc tự nhiên", example: "Hi Tom, ... See you there! / Can't wait!" },
  ],
  watchOut: [
    { mistake: "Answering only 2 of the 3 prompts — the #1 reason for lost marks!", mistakeVi: "Chỉ trả lời 2/3 gợi ý — lý do #1 mất điểm!", tip: "ALWAYS do the finger-tick check: ✓1 ✓2 ✓3. If you can only tick 2, you need to add another sentence!", tipVi: "LUÔN kiểm tra đếm ngón tay: ✓1 ✓2 ✓3. Nếu chỉ đếm được 2, cần thêm câu nữa!" },
    { mistake: "Writing too much (50+ words) which creates more grammar mistakes", mistakeVi: "Viết quá nhiều (50+ từ) tạo thêm lỗi ngữ pháp", tip: "3 short, correct sentences > 1 long, error-filled paragraph. Quality over quantity!", tipVi: "3 câu ngắn, đúng > 1 đoạn dài, đầy lỗi. Chất lượng hơn số lượng!" },
  ],
  practiceSet: [
    { instruction: "Does this email answer ALL 3 prompts?", instructionVi: "Email này trả lời ĐỦ 3 gợi ý không?", question: "Prompts: 1) say thank you 2) say what time you'll arrive 3) suggest what to bring. Response: 'Thanks for the invite! I'll come at 6pm. Shall I bring some cake?'", options: ["Only answers 2 prompts", "Answers all 3 prompts perfectly", "Too long", "Wrong format"], answer: 1, explanation: "Thanks (✓1), 6pm (✓2), cake? (✓3) = all 3 prompts answered!", explanationVi: "Thanks (✓1), 6pm (✓2), cake? (✓3) = đủ 3 gợi ý!" },
    { instruction: "Find the missing prompt", instructionVi: "Tìm gợi ý bị thiếu", question: "Prompts: 1) say thank you 2) say what time 3) ask about dress code. Response: 'Thanks so much! I'll be there at 7.' What's missing?", options: ["Thank you", "What time", "Dress code question", "Nothing is missing"], answer: 2, explanation: "Prompt 3 (dress code) is not answered! Add: 'What should I wear?'", explanationVi: "Gợi ý 3 (trang phục) chưa trả lời! Thêm: 'What should I wear?'" },
  ],
  vocabulary: [
    { word: "prompt", meaning: "a point you must answer in the task", meaningVi: "gợi ý cần trả lời trong bài", example: "There are 3 prompts in the email." },
    { word: "concise", meaning: "short and clear, saying only what's needed", meaningVi: "ngắn gọn, rõ ràng", example: "Keep your email concise — 25-35 words." },
    { word: "suggest", meaning: "offer an idea or proposal", meaningVi: "đề xuất, gợi ý", example: "Shall I bring some cake? (suggestion)" },
  ],
  quiz: [
    { question: "How many prompts must you answer in a KET email?", options: ["1", "2", "3", "4"], answer: 2, explanation: "KET emails always have exactly 3 prompts — miss one and you lose marks." },
    { question: "What's the ideal word count?", options: ["10-15 words", "25-35 words", "50-60 words", "100+ words"], answer: 1, explanation: "25-35 words = enough to answer all prompts without making unnecessary errors." },
    { question: "After writing, what should you check?", options: ["Spelling only", "That all 3 prompts are answered (finger-tick)", "Word count is exactly 25", "Nothing"], answer: 1, explanation: "The finger-tick check (✓1 ✓2 ✓3) is the most important final step!" },
  ],
  parentInfo: "This lesson covers KET Writing Part 9 — short email responses. Your teen learns the foolproof '1 prompt = 1 sentence' formula and the finger-tick checking method, ensuring they never miss a prompt again.",
  parentInfoVi: "Bài này dạy KET Viết Phần 9. Con em bạn học công thức '1 gợi ý = 1 câu' và phương pháp kiểm tra đếm ngón tay, đảm bảo không bao giờ thiếu gợi ý.",
};

// ============ LESSON 10: KET — Speaking Part 2 ============
const ketSpeaking: CambridgeLecture = {
  id: "cam-ket-speaking-part2",
  title: "Prompt Card Power: Ask Great Questions & Give Extended Answers",
  titleVi: "Sức mạnh Thẻ Gợi ý: Đặt Câu hỏi Hay & Trả lời Mở rộng",
  level: "ket",
  skill: "speaking",
  icon: "🎤",
  duration: "25 min",
  description: "Master the 'Short Answer + Reason' technique — turn every one-word answer into a scoring opportunity by adding WHY, WHEN, or HOW details that impress the examiner.",
  descriptionVi: "Làm chủ kỹ thuật 'Trả lời Ngắn + Lý do' — biến mọi câu trả lời một từ thành cơ hội ghi điểm bằng cách thêm chi tiết TẠI SAO, KHI NÀO, hoặc NHƯ THẾ NÀO.",
  learningObjective: "Students can form correct WH-questions from prompt cards and give extended 2-3 sentence answers that demonstrate vocabulary range.",
  learningObjectiveVi: "Học sinh có thể đặt câu hỏi WH- từ thẻ gợi ý và trả lời mở rộng 2-3 câu thể hiện vốn từ vựng.",
  examPattern: "KET Speaking Part 2: Two candidates take turns. One has a prompt card with words (e.g., 'Holiday? / Where? / Who with?'). You must turn the words into questions AND answer your partner's questions fully.",
  examPatternVi: "KET Nói Phần 2: Hai thí sinh thay phiên. Một người có thẻ gợi ý với từ khóa (ví dụ 'Holiday? / Where? / Who with?'). Bạn phải biến từ thành câu hỏi VÀ trả lời đầy đủ.",
  secretTip: "🔑 The 'Answer + Because + Extra' formula: 'I love pizza (answer) because it's cheesy and delicious (reason), and I usually eat it on Fridays with my family (extra).' Three parts = maximum marks!",
  secretTipVi: "🔑 Công thức 'Trả lời + Vì + Thêm': 'I love pizza (trả lời) because it's cheesy and delicious (lý do), and I usually eat it on Fridays (thêm).' Ba phần = điểm tối đa!",
  welcomeMessage: "Let's become conversation champions! 🎤 The secret: don't just answer — EXTEND your answers!",
  welcomeMessageVi: "Cùng trở thành nhà vô địch trò chuyện! 🎤 Bí quyết: đừng chỉ trả lời — MỞ RỘNG câu trả lời!",
  stepByStep: [
    { step: 1, title: "Read the prompt word and add a WH- word", titleVi: "Đọc từ gợi ý và thêm từ WH-", detail: "'Hobby?' → 'What is your hobby?' / 'When?' → 'When do you [do it]?' / 'Where?' → 'Where do you [do it]?'", detailVi: "'Hobby?' → 'What is your hobby?' / 'When?' → 'When do you [làm gì]?' / 'Where?' → 'Where do you [làm gì]?'" },
    { step: 2, title: "Answer with SHORT answer + REASON", titleVi: "Trả lời NGẮN + LÝ DO", detail: "Don't say just 'Pizza.' Say: 'I love pizza because it's really delicious, especially with extra cheese!'", detailVi: "Đừng chỉ nói 'Pizza.' Hãy nói: 'I love pizza because it's really delicious, especially with extra cheese!'" },
    { step: 3, title: "Add an EXTRA detail", titleVi: "Thêm chi tiết BỔ SUNG", detail: "After your reason, add when/where/who: 'I usually eat it on Friday evenings with my family.'", detailVi: "Sau lý do, thêm khi nào/ở đâu/với ai: 'I usually eat it on Friday evenings with my family.'" },
  ],
  illustratedRules: [
    { icon: "❓", rule: "Turn prompt WORDS into full WH-QUESTIONS", ruleVi: "Biến TỪ gợi ý thành CÂU HỎI WH- đầy đủ", example: "'Favourite food?' → 'What is your favourite food?'" },
    { icon: "➕", rule: "Answer + Because + Extra = Full marks", ruleVi: "Trả lời + Vì + Thêm = Điểm tối đa", example: "'Pizza (answer), because it's delicious (reason), on Fridays with family (extra).'" },
    { icon: "😊", rule: "Be natural — smile and speak clearly", ruleVi: "Tự nhiên — mỉm cười và nói rõ", example: "Pretend you're talking to a friend, not a robot!" },
  ],
  watchOut: [
    { mistake: "Giving bare one-word answers: 'Pizza.' 'Monday.' 'Home.'", mistakeVi: "Trả lời trơ trọi một từ: 'Pizza.' 'Monday.' 'Home.'", tip: "ALWAYS add a reason: 'Pizza, because I love the cheese!' Even one extra phrase scores higher.", tipVi: "LUÔN thêm lý do: 'Pizza, because I love the cheese!' Chỉ thêm một cụm từ cũng điểm cao hơn." },
    { mistake: "Forgetting to form proper questions (just reading the prompt word)", mistakeVi: "Quên đặt câu hỏi đúng (chỉ đọc từ gợi ý)", tip: "'Hobby?' is NOT a question. 'What is your hobby?' IS a question. Always use WH- + verb.", tipVi: "'Hobby?' KHÔNG phải câu hỏi. 'What is your hobby?' MỚI LÀ câu hỏi. Luôn dùng WH- + động từ." },
  ],
  practiceSet: [
    { instruction: "Form a question from the prompt", instructionVi: "Đặt câu hỏi từ gợi ý", question: "Prompt card says: 'Hobby?' What question should you ask?", options: ["Hobby?", "What is your hobby?", "You hobby?", "Tell hobby."], answer: 1, explanation: "Turn the word into a full WH-question: 'What is your hobby?'", explanationVi: "Biến từ thành câu hỏi WH- đầy đủ: 'What is your hobby?'" },
    { instruction: "Choose the best extended answer", instructionVi: "Chọn câu trả lời mở rộng tốt nhất", question: "'Where do you live?' Which answer scores highest?", options: ["Vietnam.", "I live in Ho Chi Minh City. It's a big, exciting city and I love the food here!", "House.", "Yes."], answer: 1, explanation: "Short answer + description + personal opinion = high-scoring extended answer!", explanationVi: "Trả lời ngắn + mô tả + ý kiến cá nhân = câu trả lời mở rộng điểm cao!" },
  ],
  vocabulary: [
    { word: "prompt card", meaning: "a card with keywords to make questions", meaningVi: "thẻ với từ khóa để đặt câu hỏi", example: "The prompt card says 'Favourite food?'" },
    { word: "extend", meaning: "to make longer by adding more details", meaningVi: "mở rộng bằng thêm chi tiết", example: "Extend your answer with a reason." },
    { word: "favourite", meaning: "the one you like most", meaningVi: "yêu thích nhất", example: "What's your favourite sport?" },
  ],
  quiz: [
    { question: "'Free time?' should become which full question?", options: ["Free time?", "What do you do in your free time?", "You free?", "Time free?"], answer: 1, explanation: "Always convert prompt words into complete WH-questions." },
    { question: "What makes the BEST speaking answer?", options: ["One word only", "Short answer + reason + extra detail", "Reading from a paper", "Staying silent"], answer: 1, explanation: "Answer + Because + Extra = the formula for maximum marks." },
  ],
  parentInfo: "This lesson covers KET Speaking Part 2 — prompt card interactions. Your teen learns the 'Answer + Because + Extra' formula, building conversational fluency that's essential for both the exam and real English communication.",
  parentInfoVi: "Bài này dạy KET Nói Phần 2. Con em bạn học công thức 'Trả lời + Vì + Thêm', xây dựng khả năng giao tiếp lưu loát cho cả thi cử và giao tiếp thực tế.",
};

// ============ LESSON 11: KET — Reading Part 4 (NEW) ============
const ketReadingP4: CambridgeLecture = {
  id: "cam-ket-reading-p4",
  title: "Synonym Spotter: How the Exam Hides Answers in Different Words",
  titleVi: "Thám tử Từ đồng nghĩa: Cách đề thi Giấu đáp án trong Từ khác",
  level: "ket",
  skill: "reading-writing",
  icon: "🔎",
  duration: "25 min",
  description: "Conquer the #1 KET Reading trick — the question uses one word but the text uses a SYNONYM. Master 50 common synonym pairs that appear every year.",
  descriptionVi: "Chinh phục mẹo #1 KET Đọc — câu hỏi dùng một từ nhưng bài đọc dùng TỪ ĐỒNG NGHĨA. Thành thạo 50 cặp đồng nghĩa xuất hiện hàng năm.",
  learningObjective: "Students can match question keywords to their synonyms in the text, finding correct answers even when exact words don't appear.",
  learningObjectiveVi: "Học sinh có thể ghép từ khóa câu hỏi với từ đồng nghĩa trong bài, tìm đáp án đúng ngay cả khi từ chính xác không xuất hiện.",
  examPattern: "KET Reading Part 4: A long text with multiple-choice questions. The KEY TRICK: questions use different words than the text. 'Happy' in the question = 'pleased' in the text. Students must match MEANINGS, not exact words.",
  examPatternVi: "KET Đọc Phần 4: Bài dài với câu hỏi trắc nghiệm. MẸO CHÍNH: câu hỏi dùng từ khác bài đọc. 'Happy' trong câu hỏi = 'pleased' trong bài. Phải ghép NGHĨA, không phải từ.",
  secretTip: "🔑 When you can't find the exact word from the question in the text — don't panic! Look for SIMILAR meanings. Cambridge ALWAYS uses synonyms. 'Start' = 'begin', 'big' = 'large', 'quick' = 'fast'.",
  secretTipVi: "🔑 Khi không tìm thấy từ chính xác từ câu hỏi trong bài — đừng hoảng! Tìm nghĩa TƯƠNG TỰ. Cambridge LUÔN dùng từ đồng nghĩa. 'Start' = 'begin', 'big' = 'large', 'quick' = 'fast'.",
  welcomeMessage: "Synonym detective mode! 🔎 The exam's biggest trick is using DIFFERENT WORDS for the same meaning. Let's crack it!",
  welcomeMessageVi: "Chế độ thám tử đồng nghĩa! 🔎 Mẹo lớn nhất đề thi là dùng TỪ KHÁC cho cùng nghĩa. Cùng phá giải!",
  stepByStep: [
    { step: 1, title: "Underline KEY WORDS in the question", titleVi: "Gạch chân TỪ KHÓA trong câu hỏi", detail: "Find the most important word in the question. 'What made Tom HAPPY?' → key word = 'happy'.", detailVi: "Tìm từ quan trọng nhất trong câu hỏi. 'What made Tom HAPPY?' → từ khóa = 'happy'." },
    { step: 2, title: "Search for SYNONYMS in the text (not the same word!)", titleVi: "Tìm TỪ ĐỒNG NGHĨA trong bài (không phải từ giống!)", detail: "Don't look for 'happy' — look for 'pleased', 'glad', 'delighted', 'enjoyed'. Same meaning, different word!", detailVi: "Đừng tìm 'happy' — tìm 'pleased', 'glad', 'delighted', 'enjoyed'. Cùng nghĩa, khác từ!" },
    { step: 3, title: "Read the sentence AROUND the synonym", titleVi: "Đọc câu XUNG QUANH từ đồng nghĩa", detail: "Once you find the synonym area, read the whole sentence. The answer is in that paragraph.", detailVi: "Khi tìm thấy vùng từ đồng nghĩa, đọc cả câu. Đáp án ở đoạn văn đó." },
  ],
  illustratedRules: [
    { icon: "🔄", rule: "Question word ≠ Text word — they use SYNONYMS", ruleVi: "Từ câu hỏi ≠ Từ bài đọc — họ dùng TỪ ĐỒNG NGHĨA", example: "Question: 'happy' → Text: 'pleased' / 'glad' / 'delighted'" },
    { icon: "🎯", rule: "Key synonym pairs to memorize: start/begin, big/large, fast/quick", ruleVi: "Cặp đồng nghĩa cần nhớ: start/begin, big/large, fast/quick", example: "'She began her homework' = 'She started her homework'" },
    { icon: "📍", rule: "Find the right PARAGRAPH first, then find the answer", ruleVi: "Tìm đúng ĐOẠN VĂN trước, rồi tìm đáp án", example: "Skim for the synonym area → read carefully → choose answer" },
  ],
  watchOut: [
    { mistake: "Searching for the EXACT word from the question in the text", mistakeVi: "Tìm TỪ CHÍNH XÁC từ câu hỏi trong bài", tip: "Cambridge almost NEVER uses the same word! Always think: 'What's another word for ___?'", tipVi: "Cambridge hầu như KHÔNG BAO GIỜ dùng cùng từ! Luôn nghĩ: 'Từ nào khác có nghĩa ___?'" },
    { mistake: "Picking an answer just because you see a word from the question nearby", mistakeVi: "Chọn đáp án vì thấy từ từ câu hỏi gần đó", tip: "Read the FULL sentence! A word appearing near a question word doesn't mean it's the right answer.", tipVi: "Đọc CẢ CÂU! Từ xuất hiện gần từ câu hỏi không có nghĩa là đáp án đúng." },
  ],
  practiceSet: [
    { instruction: "Find the synonym", instructionVi: "Tìm từ đồng nghĩa", question: "Question: 'What made Tom HAPPY?' Text: 'Tom was delighted when he received the gift.' What word in the text means 'happy'?", options: ["Tom", "delighted", "received", "gift"], answer: 1, explanation: "'Delighted' = very happy. This is the synonym used in the text.", explanationVi: "'Delighted' = rất vui. Đây là từ đồng nghĩa trong bài." },
    { instruction: "Match the synonym pair", instructionVi: "Ghép cặp đồng nghĩa", question: "Question uses 'start'. Which word in the text means the same?", options: ["stop", "begin", "finish", "end"], answer: 1, explanation: "'Begin' = 'start'. Cambridge frequently uses this swap.", explanationVi: "'Begin' = 'start'. Cambridge thường xuyên đổi cặp từ này." },
  ],
  vocabulary: [
    { word: "synonym", meaning: "a word with the same/similar meaning", meaningVi: "từ đồng nghĩa", example: "'Happy' and 'glad' are synonyms." },
    { word: "delighted", meaning: "very happy, pleased", meaningVi: "rất vui, hài lòng", example: "She was delighted with her results." },
    { word: "purchase", meaning: "to buy (formal synonym)", meaningVi: "mua (từ đồng nghĩa trang trọng)", example: "'Purchase' = 'buy' in exam texts." },
  ],
  quiz: [
    { question: "Why can't you find the exact question word in the text?", options: ["The text has a mistake", "Cambridge uses SYNONYMS (different words, same meaning)", "You need glasses", "The question is wrong"], answer: 1, explanation: "Cambridge deliberately uses synonyms to test your vocabulary range." },
    { question: "'Quick' in the question = which word in the text?", options: ["slow", "fast", "big", "old"], answer: 1, explanation: "'Quick' = 'fast' — one of the most common synonym pairs in exams." },
  ],
  parentInfo: "This NEW lesson teaches the most important KET Reading skill — synonym recognition. Cambridge exams systematically use different words in questions vs. texts. Your teen learns 50 common synonym pairs and a scanning method to find answers quickly.",
  parentInfoVi: "Bài MỚI này dạy kỹ năng Đọc KET quan trọng nhất — nhận diện từ đồng nghĩa. Con em bạn học 50 cặp đồng nghĩa phổ biến và phương pháp quét tìm đáp án nhanh.",
  isNew: true,
};

// ============ LESSON 12: PET — Reading Part 5 ============
const petReading: CambridgeLecture = {
  id: "cam-pet-reading-part5",
  title: "Crack the Cloze Code: PET Reading Part 5 Mastery",
  titleVi: "Giải mã Cloze: Làm chủ PET Đọc Phần 5",
  level: "pet",
  skill: "reading-writing",
  icon: "🧠",
  duration: "25 min",
  description: "Conquer the Multiple Choice Cloze by learning the 'Grammar vs Vocabulary Decision Tree' — a systematic method to decide if each gap tests collocations, prepositions, or verb patterns.",
  descriptionVi: "Chinh phục Multiple Choice Cloze bằng 'Cây Quyết định Ngữ pháp vs Từ vựng' — phương pháp hệ thống để quyết định chỗ trống kiểm tra collocations, giới từ, hay mẫu động từ.",
  learningObjective: "Students can identify whether a gap tests grammar or vocabulary, then apply the correct analysis method to choose the right answer from 4 options.",
  learningObjectiveVi: "Học sinh nhận diện chỗ trống kiểm tra ngữ pháp hay từ vựng, rồi áp dụng phương pháp phân tích đúng để chọn đáp án.",
  examPattern: "PET Reading Part 5: A text with 6 gaps. Each gap has 4 options (A, B, C, D). Tests: collocations, phrasal verbs, prepositions, conjunctions, and word forms. Often the most challenging PET reading part.",
  examPatternVi: "PET Đọc Phần 5: Bài đọc với 6 chỗ trống. Mỗi chỗ có 4 đáp án (A, B, C, D). Kiểm tra: collocations, phrasal verbs, giới từ, liên từ, dạng từ. Thường là phần Đọc khó nhất PET.",
  secretTip: "🔑 If ALL 4 options are the SAME word type (all prepositions, or all conjunctions) → it's a COLLOCATION question. The answer depends on which word naturally 'goes with' the nearby noun/verb, NOT grammar logic!",
  secretTipVi: "🔑 Nếu CẢ 4 đáp án CÙNG LOẠI từ (đều giới từ, hoặc đều liên từ) → đây là câu hỏi COLLOCATION. Đáp án phụ thuộc từ nào 'đi kèm' tự nhiên với danh/động từ gần đó, KHÔNG phải logic ngữ pháp!",
  welcomeMessage: "Brain workout time! 🧠 PET Part 5 is the ultimate test of vocabulary AND grammar. Let's build your decision tree!",
  welcomeMessageVi: "Thời gian vận động não! 🧠 PET Phần 5 là bài kiểm tra tối thượng từ vựng VÀ ngữ pháp. Cùng xây cây quyết định!",
  stepByStep: [
    { step: 1, title: "Read the full text first (skip gaps)", titleVi: "Đọc bài đầy đủ trước (bỏ qua chỗ trống)", detail: "Understand the topic and tone. Is it formal? Informal? About travel? Work? This context helps.", detailVi: "Hiểu chủ đề và giọng văn. Trang trọng? Thân mật? Về du lịch? Công việc? Ngữ cảnh giúp ích." },
    { step: 2, title: "Look at the 4 options — same type or different?", titleVi: "Nhìn 4 đáp án — cùng loại hay khác loại?", detail: "Same type (all prepositions) → collocation test. Different types → grammar test.", detailVi: "Cùng loại (đều giới từ) → kiểm tra collocation. Khác loại → kiểm tra ngữ pháp." },
    { step: 3, title: "Try each option in the full sentence", titleVi: "Thử mỗi đáp án vào câu đầy đủ", detail: "Read aloud in your head: 'She has lived here ___ 2010.' FOR 2010? SINCE 2010? DURING 2010? Only 'since' works.", detailVi: "Đọc thầm: 'She has lived here ___ 2010.' FOR 2010? SINCE 2010? DURING 2010? Chỉ 'since' đúng." },
  ],
  illustratedRules: [
    { icon: "🔍", rule: "Read the whole sentence — don't just look at the gap area", ruleVi: "Đọc cả câu — đừng chỉ nhìn vùng chỗ trống", example: "'She has been living here ___ 2010' → since (point in time)" },
    { icon: "🧩", rule: "Check: Grammar test or Vocabulary/Collocation test?", ruleVi: "Kiểm tra: thi Ngữ pháp hay Từ vựng/Collocation?", example: "4 prepositions → collocation. Mix of word types → grammar." },
    { icon: "❌", rule: "Eliminate 2 obviously wrong answers first → 50/50 chance!", ruleVi: "Loại 2 đáp án rõ sai trước → cơ hội 50/50!", example: "If unsure between 2, read both in the sentence and pick the natural one." },
  ],
  watchOut: [
    { mistake: "Confusing 'since' and 'for' — the #1 PET trap!", mistakeVi: "Nhầm 'since' và 'for' — bẫy #1 PET!", tip: "SINCE + POINT in time (since 2010, since Monday). FOR + PERIOD of time (for 5 years, for 3 days).", tipVi: "SINCE + MỐC thời gian (since 2010, since Monday). FOR + KHOẢNG thời gian (for 5 years, for 3 days)." },
    { mistake: "Not recognizing collocations (word partnerships)", mistakeVi: "Không nhận ra collocations (cặp từ)", tip: "'Make a decision' NOT 'do a decision'. 'Take a photo' NOT 'make a photo'. These are FIXED — memorize them!", tipVi: "'Make a decision' KHÔNG PHẢI 'do a decision'. 'Take a photo' KHÔNG PHẢI 'make a photo'. Chúng CỐ ĐỊNH — thuộc lòng!" },
  ],
  practiceSet: [
    { instruction: "Since or for?", instructionVi: "Since hay for?", question: "She has lived in London ___ three years.", options: ["since", "for", "during", "while"], answer: 1, explanation: "Three years = PERIOD of time → FOR. (Since needs a POINT: since 2020.)", explanationVi: "Three years = KHOẢNG thời gian → FOR. (Since cần MỐC: since 2020.)" },
    { instruction: "Collocation question", instructionVi: "Câu hỏi collocation", question: "I'm interested ___ learning new languages.", options: ["at", "on", "in", "for"], answer: 2, explanation: "'Interested IN' is a fixed collocation. Always IN + noun/gerund.", explanationVi: "'Interested IN' là collocation cố định. Luôn IN + danh từ/danh động từ." },
    { instruction: "Grammar or vocab test?", instructionVi: "Thi ngữ pháp hay từ vựng?", question: "Although it was raining, they ___ to go for a walk.", options: ["decided", "thought", "suggested", "wanted"], answer: 0, explanation: "Different verb types → vocabulary test. 'Decided to + infinitive' is the correct pattern.", explanationVi: "Các loại động từ khác nhau → thi từ vựng. 'Decided to + nguyên mẫu' là mẫu đúng." },
  ],
  vocabulary: [
    { word: "collocation", meaning: "words that naturally go together", meaningVi: "cặp từ đi kèm tự nhiên", example: "'Make a decision' not 'do a decision'." },
    { word: "since", meaning: "from a specific point in time until now", meaningVi: "kể từ (mốc thời gian)", example: "I've lived here since 2018." },
    { word: "although", meaning: "even though, despite the fact", meaningVi: "mặc dù", example: "Although it was cold, she went swimming." },
  ],
  quiz: [
    { question: "PET Reading Part 5 mainly tests:", options: ["Speed reading", "Grammar and vocabulary in context", "Pronunciation", "Listening"], answer: 1, explanation: "Part 5 is a Multiple Choice Cloze testing grammar patterns and vocabulary collocations." },
    { question: "I've been waiting ___ 3 o'clock.", options: ["for", "since", "during", "while"], answer: 1, explanation: "3 o'clock = specific POINT in time → SINCE." },
    { question: "If all 4 options are prepositions, it's probably testing:", options: ["Grammar rules", "Collocations (word partnerships)", "Spelling", "Pronunciation"], answer: 1, explanation: "Same-type options = collocation test. The answer is about which preposition naturally partners with the nearby word." },
  ],
  parentInfo: "This lesson covers PET Reading Part 5 — the hardest reading section. Your teen learns the 'Grammar vs Collocation Decision Tree', a systematic approach that eliminates guessing and builds the vocabulary awareness needed for B1+ level.",
  parentInfoVi: "Bài này dạy PET Đọc Phần 5 — phần đọc khó nhất. Con em bạn học 'Cây Quyết định Ngữ pháp vs Collocation', cách tiếp cận hệ thống loại bỏ đoán mò.",
};

// ============ LESSON 13: PET — Writing an Article ============
const petArticle: CambridgeLecture = {
  id: "cam-pet-writing-article",
  title: "Hook, Line & Writer: The Art of PET Article Writing",
  titleVi: "Mồi, Dây & Nhà văn: Nghệ thuật Viết Bài PET",
  level: "pet",
  skill: "reading-writing",
  icon: "✍️",
  duration: "30 min",
  description: "Master the 'Hook Formula' — 3 types of attention-grabbing openings (question, fact, story) that transform boring articles into high-scoring pieces the examiner remembers.",
  descriptionVi: "Làm chủ 'Công thức Hook' — 3 loại mở bài thu hút (câu hỏi, sự thật, câu chuyện) biến bài viết nhàm chán thành bài điểm cao mà giám khảo nhớ mãi.",
  learningObjective: "Students can write a well-structured 100-word article with a hook opening, 2 organized body paragraphs, and a conclusion using informal/neutral register.",
  learningObjectiveVi: "Học sinh có thể viết bài 100 từ có cấu trúc với mở bài hook, 2 đoạn thân có tổ chức, và kết luận bằng văn phong thân mật/trung tính.",
  examPattern: "PET Writing Part 2: Choose between an article or story (100 words). Articles need: an interesting title, a hook opening, 2 clear paragraphs with examples, and a conclusion. Informal/neutral language is expected.",
  examPatternVi: "PET Viết Phần 2: Chọn viết bài viết hoặc truyện (100 từ). Bài viết cần: tiêu đề hấp dẫn, mở bài hook, 2 đoạn rõ ràng với ví dụ, và kết luận. Văn phong thân mật/trung tính.",
  secretTip: "🔑 Start with a QUESTION hook: 'Have you ever wondered why...?' This FORCES the reader to think and the examiner to pay attention. It's the easiest hook type and works for ANY topic!",
  secretTipVi: "🔑 Bắt đầu bằng hook CÂU HỎI: 'Have you ever wondered why...?' Điều này BẮT người đọc phải suy nghĩ và giám khảo chú ý. Là loại hook dễ nhất và áp dụng cho MỌI chủ đề!",
  welcomeMessage: "Ready to write like a pro journalist? ✍️ The secret weapon is the HOOK — and I'll teach you three types!",
  welcomeMessageVi: "Sẵn sàng viết như nhà báo chuyên nghiệp? ✍️ Vũ khí bí mật là HOOK — và thầy sẽ dạy bạn ba loại!",
  stepByStep: [
    { step: 1, title: "Choose your HOOK type", titleVi: "Chọn LOẠI HOOK", detail: "Type 1: Question ('Have you ever...?'). Type 2: Surprising fact ('Did you know that...?'). Type 3: Personal story ('Last summer, I...').", detailVi: "Loại 1: Câu hỏi ('Have you ever...?'). Loại 2: Sự thật bất ngờ ('Did you know that...?'). Loại 3: Câu chuyện cá nhân ('Last summer, I...')." },
    { step: 2, title: "Write 2 body paragraphs with EXAMPLES", titleVi: "Viết 2 đoạn thân với VÍ DỤ", detail: "Paragraph 1: Main point + example. Paragraph 2: Second point + example. Each paragraph = 3-4 sentences.", detailVi: "Đoạn 1: Ý chính + ví dụ. Đoạn 2: Ý thứ hai + ví dụ. Mỗi đoạn = 3-4 câu." },
    { step: 3, title: "End with a strong CONCLUSION", titleVi: "Kết thúc bằng KẾT LUẬN mạnh mẽ", detail: "Summarize in 1-2 sentences. Use phrases like: 'In my opinion...', 'I believe that...', 'Overall...'", detailVi: "Tóm tắt trong 1-2 câu. Dùng cụm: 'In my opinion...', 'I believe that...', 'Overall...'" },
  ],
  illustratedRules: [
    { icon: "🪝", rule: "START with a hook — never 'I will write about...'", ruleVi: "BẮT ĐẦU bằng hook — không bao giờ 'I will write about...'", example: "'Have you ever wondered why some people love Mondays?'" },
    { icon: "📐", rule: "Structure: Title → Hook → 2 body paragraphs → Conclusion", ruleVi: "Cấu trúc: Tiêu đề → Hook → 2 đoạn thân → Kết luận", example: "4 clear parts = organized writing = high marks" },
    { icon: "🎯", rule: "Use informal/neutral language — articles are NOT formal letters!", ruleVi: "Dùng ngôn ngữ thân mật/trung tính — bài viết KHÔNG phải thư trang trọng!", example: "Use 'you', contractions, and rhetorical questions" },
  ],
  watchOut: [
    { mistake: "Starting with 'I will write about...' — instant examiner eye-roll!", mistakeVi: "Bắt đầu bằng 'I will write about...' — giám khảo lăn mắt ngay!", tip: "This is the MOST BORING opening possible. Use a question, fact, or story instead!", tipVi: "Đây là mở bài NHÀM CHÁN nhất! Dùng câu hỏi, sự thật, hoặc câu chuyện thay thế!" },
    { mistake: "Writing too formally ('Dear Sir, I am writing to inform you...')", mistakeVi: "Viết quá trang trọng ('Dear Sir, I am writing to inform you...')", tip: "An article is FRIENDLY! Use 'you', 'we', contractions ('don't', 'it's'), and questions.", tipVi: "Bài viết THÂN THIỆN! Dùng 'you', 'we', viết tắt ('don't', 'it's'), và câu hỏi." },
  ],
  practiceSet: [
    { instruction: "Choose the best hook", instructionVi: "Chọn hook tốt nhất", question: "Topic: 'My favourite hobby'. Which opening is the best HOOK?", options: ["I will write about my hobby.", "My hobby is reading.", "Have you ever been so lost in a book that you forgot to eat dinner? That happens to me every weekend!", "This article is about hobbies."], answer: 2, explanation: "A question + personal experience = powerful hook that grabs attention!", explanationVi: "Câu hỏi + trải nghiệm cá nhân = hook mạnh mẽ thu hút chú ý!" },
    { instruction: "Article structure", instructionVi: "Cấu trúc bài viết", question: "What's the correct order for a PET article?", options: ["Conclusion → Body → Intro", "Title → Hook → Body paragraphs → Conclusion", "Body → Title → Conclusion", "Just write randomly"], answer: 1, explanation: "Title → Hook → Body → Conclusion = standard article structure.", explanationVi: "Tiêu đề → Hook → Thân bài → Kết luận = cấu trúc bài chuẩn." },
  ],
  vocabulary: [
    { word: "hook", meaning: "opening that grabs the reader's attention", meaningVi: "mở bài thu hút chú ý người đọc", example: "Start with a hook to interest the reader!" },
    { word: "rhetorical question", meaning: "question asked for effect (no answer needed)", meaningVi: "câu hỏi tu từ (không cần trả lời)", example: "Who doesn't love summer? (everyone does!)" },
    { word: "conclusion", meaning: "final paragraph that wraps up your ideas", meaningVi: "kết luận, đoạn cuối tóm tắt ý", example: "In conclusion, reading is the best hobby!" },
  ],
  quiz: [
    { question: "What should you NEVER start an article with?", options: ["A question", "A surprising fact", "'I will write about...'", "A personal story"], answer: 2, explanation: "'I will write about...' is boring and loses marks — always use a hook!" },
    { question: "How many body paragraphs should a PET article have?", options: ["1", "2", "4", "6"], answer: 1, explanation: "2 body paragraphs is the ideal structure for 100 words." },
    { question: "Which language style is correct for articles?", options: ["Very formal", "Informal/neutral", "Academic", "Legal"], answer: 1, explanation: "Articles are friendly — use 'you', contractions, and casual language." },
  ],
  parentInfo: "This lesson covers PET Writing Part 2 — article writing. Your teen masters the 'Hook Formula' (question, fact, story openings) and structured paragraphing, skills that directly transfer to FCE and real-world writing.",
  parentInfoVi: "Bài này dạy PET Viết Phần 2. Con em bạn làm chủ 'Công thức Hook' và viết đoạn có cấu trúc, kỹ năng áp dụng trực tiếp cho FCE và viết thực tế.",
};

// ============ LESSON 14: PET — Listening Part 2 (NEW) ============
const petListeningP2: CambridgeLecture = {
  id: "cam-pet-listening-p2",
  title: "Who Said What? Tracking Multiple Speakers in PET Listening",
  titleVi: "Ai Nói Gì? Theo dõi Nhiều Người nói trong PET Nghe",
  level: "pet",
  skill: "listening",
  icon: "🎧",
  duration: "25 min",
  description: "Conquer the 'Multiple Speaker Maze' — learn to track WHO says WHAT when 2-3 speakers express DIFFERENT opinions, agreeing and disagreeing throughout the conversation.",
  descriptionVi: "Chinh phục 'Mê cung Nhiều Người nói' — học cách theo dõi AI nói GÌ khi 2-3 người bày tỏ ý kiến KHÁC NHAU, đồng ý và không đồng ý xuyên suốt hội thoại.",
  learningObjective: "Students can accurately attribute opinions to the correct speaker in multi-speaker recordings, even when speakers change their minds.",
  learningObjectiveVi: "Học sinh có thể gán đúng ý kiến cho đúng người nói trong bài nghe nhiều người, ngay cả khi người nói đổi ý.",
  examPattern: "PET Listening Part 2: 6 multiple-choice questions. You hear a monologue or conversation and must match information to the correct speaker or answer 'what does the speaker think about X?'",
  examPatternVi: "PET Nghe Phần 2: 6 câu trắc nghiệm. Nghe độc thoại hoặc hội thoại và phải ghép thông tin với đúng người nói hoặc trả lời 'người nói nghĩ gì về X?'",
  secretTip: "🔑 Listen for OPINION MARKERS: 'I think...', 'In my opinion...', 'I agree...', 'Actually, I disagree...' — these tell you WHOSE opinion follows. The last opinion stated is usually the one tested!",
  secretTipVi: "🔑 Nghe TỪ CHỈ Ý KIẾN: 'I think...', 'In my opinion...', 'I agree...', 'Actually, I disagree...' — cho biết ý kiến CỦA AI theo sau. Ý kiến cuối cùng thường là ý được hỏi!",
  welcomeMessage: "Detective ears ON! 🎧 When 3 people talk at once, it's confusing — but I'll teach you to track every voice!",
  welcomeMessageVi: "Tai thám tử BẬT! 🎧 Khi 3 người nói cùng lúc, rất rối — nhưng thầy sẽ dạy bạn theo dõi mọi giọng nói!",
  stepByStep: [
    { step: 1, title: "Pre-read ALL questions before listening", titleVi: "Đọc trước TẤT CẢ câu hỏi trước khi nghe", detail: "Know what you're listening FOR. If a question asks 'What does SARAH think?' — focus on Sarah's voice.", detailVi: "Biết mình đang nghe GÌ. Nếu câu hỏi hỏi 'SARAH nghĩ gì?' — tập trung vào giọng Sarah." },
    { step: 2, title: "Listen for opinion markers", titleVi: "Nghe từ chỉ ý kiến", detail: "'I think...' = personal opinion. 'Actually...' = correction. 'I agree but...' = partial agreement then disagreement.", detailVi: "'I think...' = ý kiến cá nhân. 'Actually...' = sửa lại. 'I agree but...' = đồng ý một phần rồi phản đối." },
    { step: 3, title: "Track the FINAL opinion", titleVi: "Theo dõi ý kiến CUỐI CÙNG", detail: "Speakers often change their minds! 'At first I thought... but now I think...' — the SECOND opinion is the answer.", detailVi: "Người nói thường đổi ý! 'At first I thought... but now I think...' — ý kiến THỨ HAI là đáp án." },
  ],
  illustratedRules: [
    { icon: "👤", rule: "Identify WHOSE voice is speaking — names are your anchors", ruleVi: "Xác định GIỌNG AI đang nói — tên là mỏ neo của bạn", example: "When you hear 'And Sarah, what do you think?' — Sarah's answer follows" },
    { icon: "💭", rule: "Opinion words: 'I think', 'I believe', 'In my view', 'I feel'", ruleVi: "Từ ý kiến: 'I think', 'I believe', 'In my view', 'I feel'", example: "'I think the museum was boring' = that person's opinion" },
    { icon: "🔄", rule: "Watch for mind-changers: 'Actually...', 'On second thought...'", ruleVi: "Chú ý người đổi ý: 'Actually...', 'On second thought...'", example: "'I liked it at first, but actually, I found it too expensive.'" },
  ],
  watchOut: [
    { mistake: "Attributing Speaker A's opinion to Speaker B", mistakeVi: "Gán ý kiến Người A cho Người B", tip: "ALWAYS check: who is NAMED before the opinion? 'Tom said he liked it' = Tom's opinion, not yours!", tipVi: "LUÔN kiểm tra: ai được NÊU TÊN trước ý kiến? 'Tom said he liked it' = ý kiến Tom, không phải bạn!" },
    { mistake: "Choosing the first opinion when speakers change their minds", mistakeVi: "Chọn ý kiến đầu tiên khi người nói đổi ý", tip: "If someone says 'I used to think X, but now I think Y' → the answer is Y (the FINAL opinion)!", tipVi: "Nếu ai đó nói 'I used to think X, but now I think Y' → đáp án là Y (ý kiến CUỐI CÙNG)!" },
  ],
  practiceSet: [
    { instruction: "Who thinks what?", instructionVi: "Ai nghĩ gì?", question: "Tom: 'I thought the movie was great!' Sarah: 'Really? I found it quite boring, actually.' What does SARAH think?", options: ["The movie was great", "The movie was boring", "She hasn't seen it", "She agrees with Tom"], answer: 1, explanation: "Sarah says 'I found it boring' — that's HER opinion, not Tom's.", explanationVi: "Sarah nói 'I found it boring' — đó là ý kiến CỦA CÔ ẤY, không phải Tom." },
    { instruction: "Track the mind-change", instructionVi: "Theo dõi sự đổi ý", question: "'At first I wanted to go to the beach, but then I decided the park would be better.' Where does the speaker want to go?", options: ["The beach", "The park", "Both places", "Neither"], answer: 1, explanation: "'But then I decided...' = mind change. The FINAL choice (park) is the answer.", explanationVi: "'But then I decided...' = đổi ý. Lựa chọn CUỐI CÙNG (park) là đáp án." },
  ],
  vocabulary: [
    { word: "opinion", meaning: "what someone thinks or believes", meaningVi: "ý kiến, quan điểm", example: "In my opinion, the book was excellent." },
    { word: "agree", meaning: "to have the same view", meaningVi: "đồng ý", example: "I agree with Tom — the film was great." },
    { word: "actually", meaning: "used to correct or contrast", meaningVi: "thật ra (dùng để sửa hoặc tương phản)", example: "Actually, I prefer the blue one." },
  ],
  quiz: [
    { question: "What should you do BEFORE the audio starts?", options: ["Close your eyes", "Pre-read all questions to know what to listen for", "Write random notes", "Nothing"], answer: 1, explanation: "Pre-reading questions tells you WHO and WHAT to focus on." },
    { question: "'I used to like coffee, but now I prefer tea.' What does the speaker prefer?", options: ["Coffee", "Tea", "Both equally", "Neither"], answer: 1, explanation: "'But now I prefer...' = final preference = the answer." },
  ],
  parentInfo: "This NEW lesson covers PET Listening Part 2 — multi-speaker comprehension. Your teen learns to track opinions, detect mind-changes, and correctly attribute views to the right speaker, essential skills for B1+ level and real-world listening.",
  parentInfoVi: "Bài MỚI này dạy PET Nghe Phần 2. Con em bạn học theo dõi ý kiến, phát hiện đổi ý, và gán đúng quan điểm cho đúng người nói.",
  isNew: true,
};

// ============ LESSON 15: Vocabulary — 100 Common Nouns (NEW) ============
const vocabCommonNouns: CambridgeLecture = {
  id: "cam-vocab-100-nouns",
  title: "The 100 Power Nouns: A Visual Guide to Cambridge's Most Tested Words",
  titleVi: "100 Danh từ Quyền lực: Hướng dẫn Trực quan về Từ Cambridge Thi Nhiều nhất",
  level: "starters",
  skill: "vocabulary",
  icon: "📚",
  duration: "30 min",
  description: "Discover the 100 nouns that appear in EVERY Cambridge exam from Starters to PET — organized by topic (School, Home, Food, Animals, Travel) with visual memory tricks.",
  descriptionVi: "Khám phá 100 danh từ xuất hiện trong MỌI đề thi Cambridge từ Starters đến PET — sắp xếp theo chủ đề (Trường, Nhà, Thức ăn, Động vật, Du lịch) với mẹo ghi nhớ trực quan.",
  learningObjective: "Students can recognize and use the 100 most frequently tested nouns across all Cambridge levels, organized in 5 topic groups for easy memorization.",
  learningObjectiveVi: "Học sinh nhận diện và sử dụng 100 danh từ thi nhiều nhất ở mọi cấp Cambridge, sắp theo 5 nhóm chủ đề dễ nhớ.",
  examPattern: "These 100 nouns appear across ALL Cambridge levels: Starters picture naming, Movers gap-fills, Flyers reading comprehension, KET vocabulary questions, and PET cloze tests. Knowing them gives you an instant advantage.",
  examPatternVi: "100 danh từ này xuất hiện ở MỌI cấp Cambridge: Starters đặt tên hình, Movers điền từ, Flyers đọc hiểu, KET từ vựng, và PET cloze. Thuộc chúng cho bạn lợi thế tức thì.",
  secretTip: "🔑 Group words by ROOM in a house: Kitchen → food words. Bedroom → clothes words. Garden → animal words. Living room → family words. Walk through your imaginary house and you'll remember 50+ words instantly!",
  secretTipVi: "🔑 Nhóm từ theo PHÒNG trong nhà: Bếp → từ thức ăn. Phòng ngủ → từ quần áo. Vườn → từ động vật. Phòng khách → từ gia đình. Đi qua ngôi nhà tưởng tượng sẽ nhớ 50+ từ ngay!",
  welcomeMessage: "Word power UP! 📚 These 100 words are like cheat codes — they appear in EVERY Cambridge exam. Master them and you've won half the battle!",
  welcomeMessageVi: "Sức mạnh từ vựng TĂNG! 📚 100 từ này như mã bí mật — xuất hiện trong MỌI đề thi Cambridge. Thành thạo chúng là thắng nửa trận đấu!",
  stepByStep: [
    { step: 1, title: "Learn 20 words per day (5 topics × 4 words)", titleVi: "Học 20 từ/ngày (5 chủ đề × 4 từ)", detail: "Don't memorize all 100 at once! Take 4 words from each topic group daily.", detailVi: "Đừng nhớ hết 100 cùng lúc! Lấy 4 từ mỗi nhóm chủ đề mỗi ngày." },
    { step: 2, title: "Use the 'House Walk' memory technique", titleVi: "Dùng kỹ thuật 'Đi dạo trong Nhà'", detail: "Imagine walking through rooms: Kitchen = food words, Bedroom = clothing words, etc.", detailVi: "Tưởng tượng đi qua các phòng: Bếp = từ thức ăn, Phòng ngủ = từ quần áo, v.v." },
    { step: 3, title: "Test yourself with flashcards", titleVi: "Tự kiểm tra bằng flashcards", detail: "Write the English word on front, Vietnamese + example on back. Review every evening.", detailVi: "Viết từ tiếng Anh mặt trước, tiếng Việt + ví dụ mặt sau. Ôn mỗi tối." },
  ],
  illustratedRules: [
    { icon: "🏫", rule: "SCHOOL words: teacher, student, classroom, pencil, rubber, ruler, book", ruleVi: "Từ TRƯỜNG HỌC: teacher, student, classroom, pencil, rubber, ruler, book", example: "The TEACHER gave each STUDENT a new BOOK." },
    { icon: "🏠", rule: "HOME words: kitchen, bedroom, bathroom, garden, door, window, wall", ruleVi: "Từ NHÀ: kitchen, bedroom, bathroom, garden, door, window, wall", example: "She went to the KITCHEN to get some water." },
    { icon: "🍕", rule: "FOOD words: bread, cheese, chicken, rice, fruit, juice, water", ruleVi: "Từ THỨC ĂN: bread, cheese, chicken, rice, fruit, juice, water", example: "For lunch, he had CHICKEN with RICE and JUICE." },
    { icon: "🐕", rule: "ANIMAL words: dog, cat, bird, fish, horse, monkey, elephant", ruleVi: "Từ ĐỘNG VẬT: dog, cat, bird, fish, horse, monkey, elephant", example: "The DOG chased the CAT up a tree." },
  ],
  watchOut: [
    { mistake: "Trying to memorize all 100 words in one day", mistakeVi: "Cố nhớ 100 từ trong một ngày", tip: "Your brain can only absorb 15-20 new words per day. Split into 5 days of 20 words!", tipVi: "Não chỉ hấp thụ được 15-20 từ mới/ngày. Chia thành 5 ngày × 20 từ!" },
    { mistake: "Learning words WITHOUT example sentences", mistakeVi: "Học từ KHÔNG CÓ câu ví dụ", tip: "A word without context is quickly forgotten. Always learn: WORD + MEANING + EXAMPLE SENTENCE.", tipVi: "Từ không có ngữ cảnh sẽ mau quên. Luôn học: TỪ + NGHĨA + CÂU VÍ DỤ." },
  ],
  practiceSet: [
    { instruction: "Which topic group?", instructionVi: "Thuộc nhóm chủ đề nào?", question: "The words 'bread, cheese, juice, chicken' belong to which topic group?", options: ["School", "Home", "Food", "Animals"], answer: 2, explanation: "These are all FOOD words — imagine them in the kitchen!", explanationVi: "Đều là từ THỨC ĂN — tưởng tượng chúng trong bếp!" },
    { instruction: "Complete the group", instructionVi: "Hoàn thành nhóm", question: "School group: teacher, student, classroom, ___. Which word fits?", options: ["kitchen", "pencil", "elephant", "bread"], answer: 1, explanation: "'Pencil' is a school item! Kitchen = home, elephant = animal, bread = food.", explanationVi: "'Pencil' là đồ dùng trường! Kitchen = nhà, elephant = động vật, bread = thức ăn." },
  ],
  vocabulary: [
    { word: "noun", meaning: "a word for a person, place, or thing", meaningVi: "danh từ (người, nơi, hoặc vật)", example: "'Teacher', 'school', and 'pencil' are nouns." },
    { word: "topic", meaning: "a subject or theme", meaningVi: "chủ đề", example: "The topic of this lesson is 'Food'." },
    { word: "memorize", meaning: "to learn something so you remember it", meaningVi: "ghi nhớ, học thuộc", example: "Memorize 20 new words every day." },
  ],
  quiz: [
    { question: "How many words should you learn per day for best results?", options: ["100", "50", "15-20", "5"], answer: 2, explanation: "15-20 words per day is the sweet spot — enough to make progress without overloading your brain." },
    { question: "What's the 'House Walk' technique?", options: ["Walking around your house", "Imagining words in different rooms to remember them", "Building a house", "Cleaning rooms"], answer: 1, explanation: "Associate word groups with rooms: Kitchen = food, Bedroom = clothes. Walk through your imaginary house!" },
  ],
  parentInfo: "This lesson provides a curated list of the 100 most frequently tested nouns across all Cambridge levels. Your child learns memory techniques (House Walk, Flashcards) that make vocabulary retention systematic and fun. These words form the foundation for all future exam success.",
  parentInfoVi: "Bài này cung cấp danh sách 100 danh từ thi nhiều nhất ở mọi cấp Cambridge. Con em bạn học kỹ thuật ghi nhớ (Đi dạo trong Nhà, Flashcards) biến việc nhớ từ thành hệ thống và vui.",
  isNew: true,
};

import { cambridgeLecturesExpansion } from "./cambridgeLecturesExpansion";
import { cambridgeLecturesExpansion2 } from "./cambridgeLecturesExpansion2";
import { cambridgeLecturesExpansion3 } from "./cambridgeLecturesExpansion3";
import { cambridgeLecturesExpansion4 } from "./cambridgeLecturesExpansion4";
import { cambridgeLecturesExpansion5 } from "./cambridgeLecturesExpansion5";

// === Export all lectures ===
export const allCambridgeLectures: CambridgeLecture[] = [
  startersColors,
  startersPrepositions,
  moversDifferences,
  moversTenses,
  moversReadingP6,
  flyersMatching,
  flyersReadingWriting,
  flyersPictureStory,
  ketEmail,
  ketSpeaking,
  ketReadingP4,
  petReading,
  petArticle,
  petListeningP2,
  vocabCommonNouns,
  ...cambridgeLecturesExpansion,
  ...cambridgeLecturesExpansion2,
  ...cambridgeLecturesExpansion3,
  ...cambridgeLecturesExpansion4,
  ...cambridgeLecturesExpansion5,
];
