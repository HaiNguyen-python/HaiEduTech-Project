/**
 * @file englishFunFacts.ts
 * @description Seed dataset for the "English Fun Fact" interactive module.
 * Each fact is bilingual (EN/VI) and tagged into one of five categories.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export type FunFactCategory =
  | "wordOrigins"
  | "englishLogic"
  | "mindBlowing"
  | "idiomStories"
  | "vietnameseMistakes";

export interface FunFact {
  id: string;
  category: FunFactCategory;
  emoji: string;
  headline: string;
  headlineVi: string;
  hook: string;
  hookVi: string;
  reveal: string;
  revealVi: string;
  example?: string;
  exampleVi?: string;
}

export const FUN_FACT_CATEGORIES: {
  key: FunFactCategory;
  labelEn: string;
  labelVi: string;
  tag: string;
  emoji: string;
  /** Tailwind gradient class fragment, used for soft backgrounds. */
  gradient: string;
  /** Solid accent color for chips/borders. */
  accent: string;
}[] = [
  { key: "wordOrigins",        labelEn: "Word Origins",         labelVi: "Nguồn gốc từ",      tag: "#WordOrigins",        emoji: "🌱", gradient: "from-teal-500/15 to-emerald-500/10",   accent: "teal" },
  { key: "englishLogic",       labelEn: "English Logic",        labelVi: "Logic tiếng Anh",   tag: "#EnglishLogic",       emoji: "🧠", gradient: "from-sky-500/15 to-blue-500/10",        accent: "sky" },
  { key: "mindBlowing",        labelEn: "Mind-Blowing",         labelVi: "Sửng sốt",          tag: "#MindBlowing",        emoji: "🤯", gradient: "from-amber-500/15 to-orange-500/10",   accent: "amber" },
  { key: "idiomStories",       labelEn: "Idiom Stories",        labelVi: "Câu chuyện thành ngữ", tag: "#IdiomStories",   emoji: "🎭", gradient: "from-rose-500/15 to-pink-500/10",      accent: "rose" },
  { key: "vietnameseMistakes", labelEn: "VN Speaker Mistakes",  labelVi: "Lỗi hài hước người Việt", tag: "#VNMistakes",  emoji: "😂", gradient: "from-violet-500/15 to-fuchsia-500/10", accent: "violet" },
];

import { englishFunFactsExpansion } from "./englishFunFactsExpansion";

const baseFunFacts: FunFact[] = [
  // ---------- Word Origins ----------
  {
    id: "alphabet-origin",
    category: "wordOrigins",
    emoji: "🔤",
    headline: "The Word 'Alphabet' Is a Mash-Up",
    headlineVi: "Chữ 'Alphabet' Là Một Sự Pha Trộn",
    hook: "Two letters. One word. Pure history.",
    hookVi: "Hai chữ cái. Một từ duy nhất. Lịch sử thuần chất.",
    reveal: "The word 'alphabet' comes from the first two letters of the Greek alphabet: Alpha (Α) and Beta (Β). Together they became 'alphabetos' in Greek, then traveled through Latin to land in modern English.",
    revealVi: "Từ 'alphabet' bắt nguồn từ hai chữ cái đầu tiên trong bảng chữ cái Hy Lạp: Alpha (Α) và Beta (Β). Khi ghép lại, chúng trở thành 'alphabetos' trong tiếng Hy Lạp, rồi đi qua tiếng Latin trước khi xuất hiện trong tiếng Anh hiện đại.",
    example: "Greek 'alpha' + 'beta' → Latin 'alphabetum' → English 'alphabet'.",
    exampleVi: "Tiếng Hy Lạp 'alpha' + 'beta' → Latin 'alphabetum' → tiếng Anh 'alphabet'.",
  },
  {
    id: "robot-origin",
    category: "wordOrigins",
    emoji: "🤖",
    headline: "'Robot' Was Born in a Czech Play",
    headlineVi: "'Robot' Sinh Ra Trong Một Vở Kịch Tiệp Khắc",
    hook: "Before sci-fi movies, robots were forced laborers on stage.",
    hookVi: "Trước cả phim khoa học viễn tưởng, robot là những kẻ lao động cưỡng bức trên sân khấu.",
    reveal: "The word 'robot' was coined in 1920 by Czech writer Karel Čapek in his play 'R.U.R.' (Rossum's Universal Robots). It comes from the Czech word 'robota', meaning 'forced labor' or 'drudgery'.",
    revealVi: "Từ 'robot' được nhà văn Tiệp Khắc Karel Čapek đặt ra vào năm 1920 trong vở kịch 'R.U.R.' (Rossum's Universal Robots). Từ này bắt nguồn từ tiếng Séc 'robota', nghĩa là 'lao động cưỡng bức'.",
    example: "Czech 'robota' (forced labor) → English 'robot' (1920).",
    exampleVi: "Tiếng Séc 'robota' (lao động cưỡng bức) → tiếng Anh 'robot' (1920).",
  },
  {
    id: "sandwich-origin",
    category: "wordOrigins",
    emoji: "🥪",
    headline: "A Sandwich Is Named After a Gambler",
    headlineVi: "Bánh Sandwich Được Đặt Tên Theo Một Tay Cờ Bạc",
    hook: "Too busy playing cards to use a fork? Invent a meal.",
    hookVi: "Mải chơi bài đến nỗi không dùng nĩa? Hãy phát minh ra một bữa ăn.",
    reveal: "The 'sandwich' is named after John Montagu, the 4th Earl of Sandwich (1718–1792). Legend says he asked his cook to put meat between two slices of bread so he could eat without leaving the gambling table.",
    revealVi: "Bánh 'sandwich' được đặt theo tên John Montagu, Bá tước Sandwich đời thứ 4 (1718–1792). Tương truyền ông đã yêu cầu đầu bếp kẹp thịt vào giữa hai lát bánh mì để có thể ăn mà không phải rời khỏi bàn đánh bài.",
    example: "Earl of Sandwich → 'sandwich' (a hand-held meal for busy people).",
    exampleVi: "Bá tước Sandwich → 'sandwich' (bữa ăn cầm tay cho người bận rộn).",
  },
  {
    id: "salary-origin",
    category: "wordOrigins",
    emoji: "🧂",
    headline: "Your 'Salary' Used to Be Paid in Salt",
    headlineVi: "'Salary' Của Bạn Từng Được Trả Bằng Muối",
    hook: "Worth your salt? In Ancient Rome, that was literal.",
    hookVi: "Xứng đáng với muối của bạn? Ở La Mã cổ đại, điều này đúng theo nghĩa đen.",
    reveal: "The English word 'salary' comes from the Latin 'salarium', the allowance Roman soldiers received to buy salt — a precious preservative. The phrase 'worth your salt' still echoes that ancient pay system.",
    revealVi: "Từ 'salary' trong tiếng Anh bắt nguồn từ tiếng Latin 'salarium', khoản phụ cấp lính La Mã nhận để mua muối — một loại chất bảo quản quý giá. Cụm 'worth your salt' vẫn vang vọng hệ thống trả lương cổ xưa này.",
    example: "Latin 'sal' (salt) → 'salarium' (salt money) → English 'salary'.",
    exampleVi: "Latin 'sal' (muối) → 'salarium' (tiền muối) → tiếng Anh 'salary'.",
  },
  {
    id: "quarantine-origin",
    category: "wordOrigins",
    emoji: "⚓",
    headline: "'Quarantine' Originally Meant 40 Days",
    headlineVi: "'Quarantine' Ban Đầu Có Nghĩa Là 40 Ngày",
    hook: "Venice invented the world's first social distancing rule.",
    hookVi: "Venice đã phát minh ra quy tắc giãn cách xã hội đầu tiên trên thế giới.",
    reveal: "The word 'quarantine' comes from the Italian 'quaranta giorni', meaning 'forty days'. In 14th-century Venice, ships arriving from plague-stricken ports had to anchor offshore for 40 days before passengers could land.",
    revealVi: "Từ 'quarantine' bắt nguồn từ tiếng Ý 'quaranta giorni', nghĩa là 'bốn mươi ngày'. Tại Venice thế kỷ 14, các con tàu đến từ những cảng có dịch hạch phải neo ngoài khơi 40 ngày trước khi hành khách được phép lên bờ.",
    example: "Italian 'quaranta giorni' (40 days) → English 'quarantine'.",
    exampleVi: "Tiếng Ý 'quaranta giorni' (40 ngày) → tiếng Anh 'quarantine'.",
  },

  // ---------- English Logic ----------
  {
    id: "read-vs-read",
    category: "englishLogic",
    emoji: "📖",
    headline: "'Read' and 'Read' Look Identical — But Aren't",
    headlineVi: "'Read' và 'Read' Nhìn Giống Hệt — Nhưng Không Phải",
    hook: "Same spelling. Different sound. Different time.",
    hookVi: "Cùng cách viết. Khác cách phát âm. Khác thì.",
    reveal: "'Read' (present tense) is pronounced /riːd/ — like 'reed'. 'Read' (past tense) is pronounced /rɛd/ — like 'red'. English keeps the spelling but changes the vowel sound to mark time. Linguists call this a 'heteronym'.",
    revealVi: "'Read' (thì hiện tại) đọc là /riːd/ — giống 'reed'. 'Read' (thì quá khứ) đọc là /rɛd/ — giống 'red'. Tiếng Anh giữ nguyên cách viết nhưng đổi nguyên âm để báo hiệu thì. Các nhà ngôn ngữ học gọi đây là 'heteronym'.",
    example: "I read /riːd/ every day. Yesterday I read /rɛd/ a novel.",
    exampleVi: "Tôi đọc /riːd/ mỗi ngày. Hôm qua tôi đã đọc /rɛd/ một cuốn tiểu thuyết.",
  },
  {
    id: "ghoti-fish",
    category: "englishLogic",
    emoji: "🐟",
    headline: "'Ghoti' Could Be Pronounced 'Fish'",
    headlineVi: "'Ghoti' Có Thể Đọc Là 'Fish'",
    hook: "English spelling is so chaotic, you can spell 'fish' with G-H-O-T-I.",
    hookVi: "Chính tả tiếng Anh hỗn loạn đến mức bạn có thể viết 'fish' thành G-H-O-T-I.",
    reveal: "Take 'gh' as in 'enough' (/f/), 'o' as in 'women' (/ɪ/), and 'ti' as in 'nation' (/ʃ/). Combine them and you get 'fish'. This famous joke was popularized to highlight how unpredictable English spelling can be.",
    revealVi: "Lấy 'gh' như trong 'enough' (/f/), 'o' như trong 'women' (/ɪ/), và 'ti' như trong 'nation' (/ʃ/). Ghép lại bạn được 'fish'. Trò đùa nổi tiếng này được lan truyền để nhấn mạnh chính tả tiếng Anh khó đoán đến mức nào.",
    example: "gh + o + ti → /f/ + /ɪ/ + /ʃ/ → 'fish'.",
    exampleVi: "gh + o + ti → /f/ + /ɪ/ + /ʃ/ → 'fish'.",
  },
  {
    id: "plural-puzzle",
    category: "englishLogic",
    emoji: "🧩",
    headline: "Why Isn't the Plural of 'Mouse' 'Mice' — for Computers?",
    headlineVi: "Vì Sao Số Nhiều 'Mouse' Không Là 'Mice' — Khi Nói Về Máy Tính?",
    hook: "One mouse, two mice. But two computer… mouses?",
    hookVi: "Một con chuột, hai con chuột. Nhưng hai con chuột máy tính… mouses?",
    reveal: "When 'mouse' refers to the animal, the plural is 'mice' (an old Germanic pattern). For the computer device, both 'mice' and 'mouses' are accepted, with many tech writers preferring 'mouses' to keep the meaning clear.",
    revealVi: "Khi 'mouse' chỉ con vật, số nhiều là 'mice' (theo mẫu Germanic cổ). Khi chỉ thiết bị máy tính, cả 'mice' và 'mouses' đều được chấp nhận, và nhiều người viết kỹ thuật thích 'mouses' hơn để giữ nghĩa rõ ràng.",
    example: "Three mice ran across the floor. The lab ordered ten new mouses.",
    exampleVi: "Ba con chuột chạy ngang sàn. Phòng lab đặt mười con chuột máy tính mới.",
  },
  {
    id: "i-before-e",
    category: "englishLogic",
    emoji: "📏",
    headline: "'I Before E Except After C' — Mostly a Lie",
    headlineVi: "'I Trước E Trừ Sau C' — Phần Lớn Là Sai",
    hook: "The most famous spelling rule has more exceptions than examples.",
    hookVi: "Quy tắc chính tả nổi tiếng nhất có nhiều ngoại lệ hơn cả ví dụ.",
    reveal: "The rule works for 'believe' and 'receive', but breaks down with 'their, weird, science, height, foreign, neighbor, seize'. Researchers found the rule fails about 25% of the time across modern English texts.",
    revealVi: "Quy tắc đúng với 'believe' và 'receive', nhưng vỡ trận với 'their, weird, science, height, foreign, neighbor, seize'. Các nhà nghiên cứu thấy quy tắc này sai khoảng 25% trên các văn bản tiếng Anh hiện đại.",
    example: "Believe ✅ · Receive ✅ · Weird ❌ · Science ❌ · Height ❌",
    exampleVi: "Believe ✅ · Receive ✅ · Weird ❌ · Science ❌ · Height ❌",
  },

  // ---------- Mind-Blowing ----------
  {
    id: "shortest-sentence",
    category: "mindBlowing",
    emoji: "✂️",
    headline: "'I Am' Is the Shortest Complete Sentence",
    headlineVi: "'I Am' Là Câu Hoàn Chỉnh Ngắn Nhất",
    hook: "Two letters. One subject. One verb. Done.",
    hookVi: "Hai chữ cái. Một chủ ngữ. Một động từ. Xong.",
    reveal: "'I am' is the shortest grammatically complete sentence in English. It contains a subject ('I') and a finite verb ('am'). Some argue 'Go!' is even shorter (one word), but it relies on an implied subject 'you'.",
    revealVi: "'I am' là câu hoàn chỉnh ngữ pháp ngắn nhất tiếng Anh. Nó chứa chủ ngữ ('I') và động từ chia ('am'). Một số cho rằng 'Go!' còn ngắn hơn (một từ), nhưng nó phải dựa vào chủ ngữ ngầm 'you'.",
    example: "I am. (Subject + verb = complete thought)",
    exampleVi: "I am. (Chủ ngữ + động từ = ý hoàn chỉnh)",
  },
  {
    id: "pangram-fox",
    category: "mindBlowing",
    emoji: "🦊",
    headline: "One Sentence Contains Every Letter A–Z",
    headlineVi: "Một Câu Chứa Đủ 26 Chữ Cái A–Z",
    hook: "Type-testers love this tiny zoo.",
    hookVi: "Người kiểm tra bàn phím rất yêu sở thú nhỏ này.",
    reveal: "A 'pangram' is a sentence that uses every letter of the alphabet at least once. The classic example — 'The quick brown fox jumps over the lazy dog' — has been used since the 1880s to test fonts, typewriters and keyboards.",
    revealVi: "'Pangram' là câu sử dụng đủ mọi chữ cái trong bảng chữ cái ít nhất một lần. Ví dụ kinh điển — 'The quick brown fox jumps over the lazy dog' — đã được dùng từ thập niên 1880 để kiểm tra phông chữ, máy đánh chữ và bàn phím.",
    example: "The quick brown fox jumps over the lazy dog. (35 letters, all 26)",
    exampleVi: "The quick brown fox jumps over the lazy dog. (35 ký tự, đủ 26 chữ cái)",
  },
  {
    id: "sky-english",
    category: "mindBlowing",
    emoji: "✈️",
    headline: "English Is the Official Language of the Sky",
    headlineVi: "Tiếng Anh Là Ngôn Ngữ Chính Thức Của Bầu Trời",
    hook: "Whether the pilot is from Vietnam, Brazil or Japan — the cockpit speaks English.",
    hookVi: "Dù phi công đến từ Việt Nam, Brazil hay Nhật Bản — buồng lái vẫn nói tiếng Anh.",
    reveal: "Since 2008, the International Civil Aviation Organization (ICAO) requires all pilots and air traffic controllers on international flights to demonstrate English proficiency. It standardizes communication and prevents deadly misunderstandings.",
    revealVi: "Từ năm 2008, Tổ chức Hàng không Dân dụng Quốc tế (ICAO) yêu cầu mọi phi công và kiểm soát viên không lưu trên các chuyến bay quốc tế phải chứng minh trình độ tiếng Anh. Điều này chuẩn hóa giao tiếp và ngăn ngừa hiểu lầm chết người.",
    example: "ICAO standard: minimum 'Operational Level 4' English for international pilots.",
    exampleVi: "Chuẩn ICAO: phi công quốc tế cần tối thiểu 'Operational Level 4' tiếng Anh.",
  },
  {
    id: "longest-word",
    category: "mindBlowing",
    emoji: "🫁",
    headline: "The Longest Word Has 45 Letters",
    headlineVi: "Từ Dài Nhất Có 45 Chữ Cái",
    hook: "Try saying it before your next breath runs out.",
    hookVi: "Thử đọc nó trước khi bạn hết hơi.",
    reveal: "'Pneumonoultramicroscopicsilicovolcanoconiosis' (45 letters) is a lung disease caused by inhaling very fine silica dust. It was deliberately coined in 1935 to be the longest English word in major dictionaries.",
    revealVi: "'Pneumonoultramicroscopicsilicovolcanoconiosis' (45 chữ cái) là một bệnh phổi do hít phải bụi silica rất mịn. Từ này được đặt ra có chủ ý vào năm 1935 để trở thành từ tiếng Anh dài nhất trong các từ điển lớn.",
    example: "Pneumono · ultra · microscopic · silico · volcano · coniosis",
    exampleVi: "Pneumono · ultra · microscopic · silico · volcano · coniosis",
  },
  {
    id: "no-vowels",
    category: "mindBlowing",
    emoji: "🤐",
    headline: "Some English Words Have No Vowels at All",
    headlineVi: "Có Những Từ Tiếng Anh Không Có Nguyên Âm",
    hook: "Try saying 'rhythm' five times fast.",
    hookVi: "Thử đọc 'rhythm' năm lần thật nhanh.",
    reveal: "Words like 'rhythm', 'myth', 'crypt', 'lynx' and 'gypsy' contain no traditional vowels (a, e, i, o, u). The letter 'y' steps in as a vowel substitute, carrying the syllable's sound.",
    revealVi: "Những từ như 'rhythm', 'myth', 'crypt', 'lynx' và 'gypsy' không chứa nguyên âm truyền thống (a, e, i, o, u). Chữ 'y' đứng vào thay thế nguyên âm, gánh phần âm tiết.",
    example: "rhythm · myth · crypt · lynx · gypsy · hymn",
    exampleVi: "rhythm · myth · crypt · lynx · gypsy · hymn",
  },

  // ---------- Idiom Stories ----------
  {
    id: "break-a-leg",
    category: "idiomStories",
    emoji: "🎭",
    headline: "Why Actors Say 'Break a Leg!'",
    headlineVi: "Vì Sao Diễn Viên Nói 'Break a Leg!'",
    hook: "Wishing 'good luck' is bad luck in theater.",
    hookVi: "Chúc 'may mắn' lại là điều xui xẻo trong sân khấu.",
    reveal: "In theater superstition, wishing 'good luck' is thought to attract bad luck. Saying the opposite — 'break a leg' — is believed to fool the spirits. Another theory: a 'leg' was the side curtain; 'breaking' it meant stepping on stage to perform (and get paid).",
    revealVi: "Theo mê tín sân khấu, chúc 'may mắn' bị cho là gọi xui xẻo. Nói ngược lại — 'break a leg' — được tin sẽ đánh lừa các vong linh. Một giả thuyết khác: 'leg' là tấm rèm bên cánh gà; 'break' nghĩa là bước qua nó để diễn (và được trả tiền).",
    example: "“Break a leg tonight, I'll be in the front row!”",
    exampleVi: "“Diễn thật cháy tối nay nhé, tôi sẽ ngồi hàng đầu!”",
  },
  {
    id: "piece-of-cake",
    category: "idiomStories",
    emoji: "🍰",
    headline: "Why Easy Things Are 'A Piece of Cake'",
    headlineVi: "Vì Sao Việc Dễ Lại Là 'A Piece of Cake'",
    hook: "Cakes were once prizes for the easiest moves.",
    hookVi: "Bánh từng là phần thưởng cho những bước đi dễ nhất.",
    reveal: "The phrase likely comes from 19th-century 'cakewalk' contests in the American South, where the most graceful walking couple won a cake. Over time, 'a piece of cake' came to mean any task that is effortlessly easy.",
    revealVi: "Cụm này có lẽ bắt nguồn từ các cuộc thi 'cakewalk' thế kỷ 19 ở miền Nam nước Mỹ, nơi cặp đi duyên dáng nhất sẽ thắng một chiếc bánh. Theo thời gian, 'a piece of cake' mang nghĩa bất kỳ việc gì dễ như chơi.",
    example: "“The exam was a piece of cake — I finished it in 20 minutes.”",
    exampleVi: "“Bài thi dễ như ăn kẹo — tôi làm xong trong 20 phút.”",
  },
  {
    id: "raining-cats",
    category: "idiomStories",
    emoji: "🌧️",
    headline: "'Raining Cats and Dogs' Has a Smelly Origin",
    headlineVi: "'Raining Cats and Dogs' Có Một Nguồn Gốc Khá Hôi",
    hook: "Heavy rain in old London literally swept up animals.",
    hookVi: "Mưa to ở London xưa thực sự cuốn theo cả động vật.",
    reveal: "In 17th–18th century London, poor drainage meant heavy storms could wash dead stray cats, dogs and rats through the streets. People joked it was 'raining cats and dogs'. The phrase stuck for any extreme downpour.",
    revealVi: "Tại London thế kỷ 17–18, hệ thống thoát nước kém khiến những trận bão lớn có thể cuốn xác chó mèo và chuột hoang qua các con phố. Người ta nói đùa rằng trời đang 'raining cats and dogs'. Cụm từ trụ lại cho mọi cơn mưa cực lớn.",
    example: "“Take an umbrella — it's raining cats and dogs out there!”",
    exampleVi: "“Cầm ô đi — ngoài kia mưa như trút nước!”",
  },
  {
    id: "bite-bullet",
    category: "idiomStories",
    emoji: "🪖",
    headline: "Why Brave People 'Bite the Bullet'",
    headlineVi: "Vì Sao Người Dũng Cảm 'Bite the Bullet'",
    hook: "Before anesthesia, soldiers really did chew on lead.",
    hookVi: "Trước khi có thuốc tê, binh lính thực sự cắn vào chì.",
    reveal: "In 19th-century battlefield surgery — long before modern anesthesia — wounded soldiers were given a soft lead bullet to bite down on to endure the pain. Today, 'bite the bullet' means accepting something painful but unavoidable.",
    revealVi: "Trong phẫu thuật chiến trường thế kỷ 19 — rất lâu trước khi có thuốc tê hiện đại — binh lính bị thương được đưa cho một viên đạn chì mềm để cắn nhằm chịu đau. Ngày nay, 'bite the bullet' nghĩa là chấp nhận điều đau đớn nhưng không thể tránh.",
    example: "“I hate dentists, but I'll bite the bullet and book the appointment.”",
    exampleVi: "“Tôi ghét nha sĩ, nhưng đành bấm bụng đặt lịch hẹn.”",
  },
  {
    id: "spill-beans",
    category: "idiomStories",
    emoji: "🫘",
    headline: "'Spill the Beans' Was an Ancient Vote",
    headlineVi: "'Spill the Beans' Là Một Cuộc Bầu Cử Cổ Xưa",
    hook: "In Ancient Greece, beans were ballots.",
    hookVi: "Ở Hy Lạp cổ đại, hạt đậu chính là lá phiếu.",
    reveal: "Ancient Greeks reportedly voted by placing white or black beans into a jar — white for yes, black for no. If someone knocked the jar over, the secret result was revealed. To 'spill the beans' came to mean revealing a secret too early.",
    revealVi: "Người Hy Lạp cổ được cho là đã bỏ phiếu bằng cách thả hạt đậu trắng hoặc đen vào một chiếc bình — trắng nghĩa là đồng ý, đen là không. Nếu ai đó làm đổ bình, kết quả bí mật sẽ lộ ra. 'Spill the beans' từ đó mang nghĩa tiết lộ bí mật quá sớm.",
    example: "“Don't spill the beans about the surprise party!”",
    exampleVi: "“Đừng tiết lộ về bữa tiệc bất ngờ nhé!”",
  },

  // ---------- Vietnamese Speaker Mistakes (funny + relatable) ----------
  {
    id: "vn-final-s",
    category: "vietnameseMistakes",
    emoji: "🤫",
    headline: "The Mysterious Disappearing Final 'S'",
    headlineVi: "Chữ 'S' Cuối Bí Ẩn Hay Biến Mất",
    hook: "“He love you” sounds sweet… but is grammatically wrong.",
    hookVi: "“He love you” nghe lãng mạn… nhưng sai ngữ pháp.",
    reveal: "Vietnamese has no consonant clusters at the end of words, so Vietnamese speakers often drop the final 's' in verbs (he like → he likes) and plurals (two book → two books). Practising slow, exaggerated final-/s/ helps fix this within weeks.",
    revealVi: "Tiếng Việt không có cụm phụ âm cuối từ, nên người Việt thường bỏ chữ 's' cuối ở động từ (he like → he likes) và số nhiều (two book → two books). Luyện phát âm /s/ cuối thật chậm và rõ sẽ sửa được lỗi này chỉ trong vài tuần.",
    example: "❌ She have two cat. → ✅ She has two cats.",
    exampleVi: "❌ She have two cat. → ✅ She has two cats.",
  },
  {
    id: "vn-very-delicious",
    category: "vietnameseMistakes",
    emoji: "🍜",
    headline: "“Very Delicious!” Sounds… A Little Off",
    headlineVi: "“Very Delicious!” Nghe… Hơi Sai Sai",
    hook: "Native English speakers rarely say 'very delicious'.",
    hookVi: "Người Anh bản xứ hiếm khi nói 'very delicious'.",
    reveal: "'Delicious' is already a strong adjective, so adding 'very' sounds redundant — like saying 'very excellent'. Use intensifiers like 'absolutely delicious', 'really delicious', or 'incredibly tasty' instead.",
    revealVi: "'Delicious' vốn đã là tính từ mạnh, nên thêm 'very' nghe thừa — giống như nói 'very excellent'. Hãy dùng các từ tăng nghĩa khác như 'absolutely delicious', 'really delicious' hoặc 'incredibly tasty'.",
    example: "❌ This pho is very delicious. → ✅ This pho is absolutely delicious.",
    exampleVi: "❌ This pho is very delicious. → ✅ This pho is absolutely delicious.",
  },
  {
    id: "vn-open-tv",
    category: "vietnameseMistakes",
    emoji: "📺",
    headline: "You Don't 'Open' the TV in English",
    headlineVi: "Trong Tiếng Anh, Bạn Không 'Open' TV",
    hook: "Vietnamese 'mở TV' translated word-for-word causes a smile.",
    hookVi: "Cụm 'mở TV' trong tiếng Việt dịch word-by-word khiến ai cũng cười.",
    reveal: "In Vietnamese we 'mở' (open) the TV, fan or computer. In English, electrical devices are 'turned on' or 'switched on', not opened. Save 'open' for things with a lid, door or cover — like a book, a window, or a bottle.",
    revealVi: "Trong tiếng Việt, chúng ta 'mở' TV, quạt hay máy tính. Trong tiếng Anh, các thiết bị điện được 'turned on' hoặc 'switched on', không phải 'opened'. Hãy dành 'open' cho những thứ có nắp, cửa hay bìa — như cuốn sách, cửa sổ hay chai nước.",
    example: "❌ Open the air-conditioner please. → ✅ Turn on the air-conditioner please.",
    exampleVi: "❌ Open the air-conditioner please. → ✅ Turn on the air-conditioner please.",
  },
  {
    id: "vn-fun-funny",
    category: "vietnameseMistakes",
    emoji: "🎉",
    headline: "'Fun' vs 'Funny' — Same Vibe, Different Word",
    headlineVi: "'Fun' vs 'Funny' — Cùng Cảm Giác, Khác Nghĩa",
    hook: "Calling your serious teacher 'funny' might offend them.",
    hookVi: "Gọi thầy giáo nghiêm túc của bạn là 'funny' có thể khiến thầy phật lòng.",
    reveal: "'Fun' (enjoyable) describes a great experience: a fun trip, a fun party. 'Funny' (laughable) describes humor: a funny joke, a funny movie. Saying 'You are funny' to your boss can sound like 'You are laughable / strange'.",
    revealVi: "'Fun' (thú vị) mô tả trải nghiệm thích thú: a fun trip, a fun party. 'Funny' (gây cười) mô tả sự hài hước: a funny joke, a funny movie. Nói 'You are funny' với sếp có thể nghe như 'You are laughable / strange'.",
    example: "❌ The history class was very funny. → ✅ The history class was a lot of fun.",
    exampleVi: "❌ The history class was very funny. → ✅ The history class was a lot of fun.",
  },
  {
    id: "vn-th-sound",
    category: "vietnameseMistakes",
    emoji: "👅",
    headline: "The Mighty 'TH' Sound Trips Everyone Up",
    headlineVi: "Âm 'TH' Hùng Mạnh Khiến Ai Cũng Vấp",
    hook: "“Tank you very much!” for what exactly?",
    hookVi: "“Tank you very much!” chính xác là cảm ơn vì điều gì?",
    reveal: "Vietnamese has no /θ/ or /ð/ sound, so 'thank' often becomes 'tank' and 'three' becomes 'tree'. The fix is mechanical: place the tip of your tongue lightly between your teeth and gently push air out. Practise 'three thousand thoughtful thinkers'.",
    revealVi: "Tiếng Việt không có âm /θ/ hay /ð/, nên 'thank' thường thành 'tank' và 'three' thành 'tree'. Cách sửa rất cơ học: đặt nhẹ đầu lưỡi giữa hai hàm răng rồi đẩy hơi ra. Hãy luyện 'three thousand thoughtful thinkers'.",
    example: "❌ Tank you for tree tings. → ✅ Thank you for three things.",
    exampleVi: "❌ Tank you for tree tings. → ✅ Thank you for three things.",
  },
];

export const englishFunFacts: FunFact[] = [...baseFunFacts, ...englishFunFactsExpansion];

/** Returns the fact for a given day, deterministically rotated. */
export function getDailyFunFact(date: Date = new Date()): FunFact {
  const dayKey = Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000,
  );
  const idx = ((dayKey % englishFunFacts.length) + englishFunFacts.length) % englishFunFacts.length;
  return englishFunFacts[idx];
}
