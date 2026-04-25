// English Pronunciation & Intonation curriculum
// 4 modules × 6 lessons = 24 lessons total
// Each lesson: focus IPA, examples, minimal pairs (where applicable), tip, quiz

export interface PronExample {
  word: string;
  ipa: string;
  vi: string; // gloss
}

export interface MinimalPair {
  a: { word: string; ipa: string };
  b: { word: string; ipa: string };
  contrast: string; // sound contrast description (en)
  contrastVi: string;
}

export interface PronQuizQuestion {
  question: string;
  questionVi: string;
  options: string[];
  answer: number; // index
  explanation: string;
  explanationVi: string;
  audioWord?: string; // word to TTS for "what did you hear?" questions
}

export interface PronLesson {
  id: string;
  moduleId: "ipa-sounds" | "word-stress" | "sentence-stress" | "intonation";
  order: number;
  title: string;
  titleVi: string;
  symbol?: string; // primary IPA symbol or pattern label
  emoji: string;
  duration: string; // e.g. "12 min"
  difficulty: "Beginner" | "Elementary" | "Intermediate" | "Upper-Intermediate";
  introduction: string;
  introductionVi: string;
  howTo: { step: string; stepVi: string }[];
  examples: PronExample[];
  minimalPairs?: MinimalPair[];
  commonMistakeVi: string; // what Vietnamese learners typically get wrong
  teacherTip: string;
  teacherTipVi: string;
  practiceSentences: { en: string; vi: string }[]; // 4-6 drill sentences
  quiz: PronQuizQuestion[]; // 4-6 questions
}

export interface PronModule {
  id: PronLesson["moduleId"];
  title: string;
  titleVi: string;
  emoji: string;
  description: string;
  descriptionVi: string;
  color: string; // tailwind gradient classes
}

export const pronunciationModules: PronModule[] = [
  {
    id: "ipa-sounds",
    title: "IPA Sounds (44 Phonemes)",
    titleVi: "Bảng IPA - 44 Âm Cốt Lõi",
    emoji: "🔤",
    description:
      "Master the 44 sounds of English: 20 vowels (monophthongs + diphthongs) and 24 consonants. Learn each symbol, mouth position, and contrast pairs.",
    descriptionVi:
      "Làm chủ 44 âm tiếng Anh: 20 nguyên âm (đơn + đôi) và 24 phụ âm. Hiểu từng ký hiệu, khẩu hình và cặp âm dễ nhầm.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "word-stress",
    title: "Word Stress & Syllables",
    titleVi: "Trọng Âm Từ & Âm Tiết",
    emoji: "🎯",
    description:
      "Identify syllables, primary and secondary stress, and predictable stress patterns for nouns, verbs, suffixes (-tion, -ic, -ity).",
    descriptionVi:
      "Xác định âm tiết, trọng âm chính/phụ, các quy tắc dự đoán trọng âm cho danh từ, động từ và hậu tố (-tion, -ic, -ity).",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "sentence-stress",
    title: "Sentence Stress & Rhythm",
    titleVi: "Trọng Âm Câu & Nhịp Điệu",
    emoji: "🥁",
    description:
      "Discover content vs function words, the stress-timed nature of English, and how rhythm shapes meaning and listening comprehension.",
    descriptionVi:
      "Phân biệt content words vs function words, hiểu tiếng Anh là ngôn ngữ stress-timed, và cách nhịp điệu thay đổi nghĩa & khả năng nghe.",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "intonation",
    title: "Intonation & Connected Speech",
    titleVi: "Ngữ Điệu & Nối Âm",
    emoji: "🎵",
    description:
      "Rising vs falling tones, linking, weak forms, schwa /ə/, and elision - the secrets to sounding natural and understanding native speakers.",
    descriptionVi:
      "Ngữ điệu lên/xuống, linking, weak forms, âm schwa /ə/, và elision - bí quyết nói tự nhiên và nghe hiểu người bản xứ.",
    color: "from-violet-500 to-fuchsia-500",
  },
];

// =====================================================================
// MODULE 1 - IPA SOUNDS (6 lessons covering vowel groups + consonant groups)
// =====================================================================
const ipaLessons: PronLesson[] = [
  {
    id: "ipa-short-vowels",
    moduleId: "ipa-sounds",
    order: 1,
    title: "Short Vowels: /ɪ/ /e/ /æ/ /ʌ/ /ɒ/ /ʊ/ /ə/",
    titleVi: "Nguyên Âm Ngắn: /ɪ/ /e/ /æ/ /ʌ/ /ɒ/ /ʊ/ /ə/",
    symbol: "ɪ e æ ʌ ɒ ʊ ə",
    emoji: "🔵",
    duration: "15 min",
    difficulty: "Beginner",
    introduction:
      "Short vowels are quick, relaxed sounds. They are the foundation of English rhythm. Mastering them prevents the most common Vietnamese accent issues.",
    introductionVi:
      "Nguyên âm ngắn là âm nhanh, thả lỏng. Đây là nền tảng nhịp điệu tiếng Anh. Học tốt phần này sẽ loại bỏ các lỗi accent phổ biến của người Việt.",
    howTo: [
      { step: "Relax your jaw - short vowels don't need wide mouth movement.", stepVi: "Thả lỏng hàm - nguyên âm ngắn không cần há miệng rộng." },
      { step: "Keep them short. Cut them off quickly with the next sound.", stepVi: "Giữ âm ngắn. Cắt nhanh sang âm kế tiếp." },
      { step: "/æ/ in 'cat' - open your mouth wider than for /e/.", stepVi: "/æ/ trong 'cat' - há miệng rộng hơn /e/." },
      { step: "/ə/ (schwa) is the most common sound in English - use it for unstressed syllables.", stepVi: "/ə/ (schwa) là âm phổ biến nhất - dùng cho âm tiết không trọng âm." },
    ],
    examples: [
      { word: "sit", ipa: "/sɪt/", vi: "ngồi" },
      { word: "bed", ipa: "/bed/", vi: "giường" },
      { word: "cat", ipa: "/kæt/", vi: "mèo" },
      { word: "cup", ipa: "/kʌp/", vi: "cốc" },
      { word: "hot", ipa: "/hɒt/", vi: "nóng" },
      { word: "book", ipa: "/bʊk/", vi: "sách" },
      { word: "about", ipa: "/əˈbaʊt/", vi: "về" },
    ],
    minimalPairs: [
      { a: { word: "ship", ipa: "/ʃɪp/" }, b: { word: "sheep", ipa: "/ʃiːp/" }, contrast: "/ɪ/ short vs /iː/ long", contrastVi: "/ɪ/ ngắn vs /iː/ dài" },
      { a: { word: "bad", ipa: "/bæd/" }, b: { word: "bed", ipa: "/bed/" }, contrast: "/æ/ open vs /e/ mid", contrastVi: "/æ/ mở vs /e/ giữa" },
      { a: { word: "cup", ipa: "/kʌp/" }, b: { word: "cap", ipa: "/kæp/" }, contrast: "/ʌ/ central vs /æ/ open front", contrastVi: "/ʌ/ giữa vs /æ/ mở trước" },
    ],
    commonMistakeVi:
      "Người Việt thường phát âm /æ/ thành /e/ ('cat' → 'ket'), và bỏ qua schwa /ə/ khiến từ nghe cứng và không tự nhiên.",
    teacherTip: "Practice schwa daily: 'banana' = /bəˈnɑːnə/ - only the middle syllable is strong, everything else is /ə/.",
    teacherTipVi: "Luyện schwa mỗi ngày: 'banana' = /bəˈnɑːnə/ - chỉ âm tiết giữa mạnh, còn lại là /ə/.",
    practiceSentences: [
      { en: "The cat sat on the mat.", vi: "Con mèo ngồi trên thảm." },
      { en: "I had a good cup of coffee.", vi: "Tôi đã uống một cốc cà phê ngon." },
      { en: "She put the book on the bed.", vi: "Cô ấy đặt cuốn sách trên giường." },
      { en: "It was about ten minutes ago.", vi: "Khoảng mười phút trước." },
    ],
    quiz: [
      {
        question: "Which word contains /æ/?",
        questionVi: "Từ nào chứa âm /æ/?",
        options: ["bed", "cat", "cup", "book"],
        answer: 1,
        explanation: "'cat' /kæt/ uses /æ/ - open mouth front vowel.",
        explanationVi: "'cat' /kæt/ dùng /æ/ - nguyên âm mở phía trước.",
        audioWord: "cat",
      },
      {
        question: "What sound is the underlined vowel in 'about'?",
        questionVi: "Nguyên âm gạch chân trong 'about' là âm gì?",
        options: ["/æ/", "/ʌ/", "/ə/ schwa", "/e/"],
        answer: 2,
        explanation: "Unstressed first syllable of 'about' = /ə/ (schwa).",
        explanationVi: "Âm tiết đầu không trọng âm của 'about' = /ə/ (schwa).",
      },
      {
        question: "Which is a minimal pair contrasting /ɪ/ and /iː/?",
        questionVi: "Cặp nào tương phản /ɪ/ và /iː/?",
        options: ["cat / cap", "ship / sheep", "cup / cap", "bed / bad"],
        answer: 1,
        explanation: "ship /ʃɪp/ vs sheep /ʃiːp/ contrasts short /ɪ/ with long /iː/.",
        explanationVi: "ship /ʃɪp/ vs sheep /ʃiːp/ tương phản ngắn /ɪ/ với dài /iː/.",
      },
      {
        question: "Listen: which word is it?",
        questionVi: "Nghe: từ nào?",
        options: ["bed", "bad", "bud", "bird"],
        answer: 1,
        explanation: "'bad' uses /æ/ - open front vowel.",
        explanationVi: "'bad' dùng /æ/ - nguyên âm mở phía trước.",
        audioWord: "bad",
      },
    ],
  },
  {
    id: "ipa-long-vowels",
    moduleId: "ipa-sounds",
    order: 2,
    title: "Long Vowels: /iː/ /ɑː/ /ɔː/ /uː/ /ɜː/",
    titleVi: "Nguyên Âm Dài: /iː/ /ɑː/ /ɔː/ /uː/ /ɜː/",
    symbol: "iː ɑː ɔː uː ɜː",
    emoji: "📏",
    duration: "15 min",
    difficulty: "Beginner",
    introduction:
      "Long vowels are held longer and require more tension. The colon symbol /ː/ in IPA marks length - but length is paired with quality changes too.",
    introductionVi:
      "Nguyên âm dài giữ lâu hơn và cần độ căng. Ký hiệu /ː/ trong IPA chỉ độ dài - nhưng độ dài đi kèm với thay đổi chất giọng.",
    howTo: [
      { step: "Hold the vowel for ~2× longer than its short counterpart.", stepVi: "Giữ nguyên âm dài gấp ~2 lần so với âm ngắn tương ứng." },
      { step: "/iː/ - wide smile, tongue high and forward (sheep).", stepVi: "/iː/ - cười rộng, lưỡi cao và đưa ra trước (sheep)." },
      { step: "/ɑː/ - open mouth wide, tongue low and back (car).", stepVi: "/ɑː/ - há miệng rộng, lưỡi thấp và lùi (car)." },
      { step: "/ɜː/ - neutral tongue, slightly rounded lips (bird, learn).", stepVi: "/ɜː/ - lưỡi trung tính, môi hơi tròn (bird, learn)." },
    ],
    examples: [
      { word: "sheep", ipa: "/ʃiːp/", vi: "cừu" },
      { word: "car", ipa: "/kɑː/", vi: "xe hơi" },
      { word: "law", ipa: "/lɔː/", vi: "luật" },
      { word: "food", ipa: "/fuːd/", vi: "thức ăn" },
      { word: "bird", ipa: "/bɜːd/", vi: "chim" },
      { word: "learn", ipa: "/lɜːn/", vi: "học" },
    ],
    minimalPairs: [
      { a: { word: "ship", ipa: "/ʃɪp/" }, b: { word: "sheep", ipa: "/ʃiːp/" }, contrast: "/ɪ/ vs /iː/", contrastVi: "/ɪ/ vs /iː/" },
      { a: { word: "full", ipa: "/fʊl/" }, b: { word: "fool", ipa: "/fuːl/" }, contrast: "/ʊ/ vs /uː/", contrastVi: "/ʊ/ vs /uː/" },
      { a: { word: "cat", ipa: "/kæt/" }, b: { word: "cart", ipa: "/kɑːt/" }, contrast: "/æ/ vs /ɑː/", contrastVi: "/æ/ vs /ɑː/" },
    ],
    commonMistakeVi:
      "Người Việt hay rút ngắn nguyên âm dài (sheep → ship), khiến nghĩa từ bị thay đổi hoàn toàn.",
    teacherTip: "Tap your finger twice slowly when saying long vowels - this enforces the duration physically.",
    teacherTipVi: "Gõ tay 2 nhịp chậm khi phát âm nguyên âm dài - buộc cơ thể giữ đủ độ dài.",
    practiceSentences: [
      { en: "The sheep sleeps in the field.", vi: "Cừu ngủ trên cánh đồng." },
      { en: "My car is parked far away.", vi: "Xe tôi đỗ xa." },
      { en: "I learn new words every day.", vi: "Tôi học từ mới mỗi ngày." },
      { en: "The food is too good to refuse.", vi: "Đồ ăn ngon đến mức không thể từ chối." },
    ],
    quiz: [
      {
        question: "Which symbol represents the vowel in 'bird'?",
        questionVi: "Ký hiệu nào thể hiện nguyên âm trong 'bird'?",
        options: ["/iː/", "/ɜː/", "/ɔː/", "/ɑː/"],
        answer: 1,
        explanation: "'bird' = /bɜːd/ - central long vowel.",
        explanationVi: "'bird' = /bɜːd/ - nguyên âm dài trung tâm.",
        audioWord: "bird",
      },
      {
        question: "Which pair contrasts /ʊ/ and /uː/?",
        questionVi: "Cặp nào tương phản /ʊ/ và /uː/?",
        options: ["ship/sheep", "full/fool", "cat/cart", "bed/bad"],
        answer: 1,
        explanation: "full /fʊl/ vs fool /fuːl/.",
        explanationVi: "full /fʊl/ vs fool /fuːl/.",
      },
      {
        question: "True or False: long vowels are simply louder versions of short vowels.",
        questionVi: "Đúng hay Sai: nguyên âm dài chỉ là phiên bản to hơn của nguyên âm ngắn.",
        options: ["True", "False"],
        answer: 1,
        explanation: "False - they have different tongue positions and quality, not just volume.",
        explanationVi: "Sai - chúng có vị trí lưỡi và chất giọng khác, không chỉ to hơn.",
      },
      {
        question: "Listen: which word is it?",
        questionVi: "Nghe: từ nào?",
        options: ["ship", "sheep", "shape", "shop"],
        answer: 1,
        explanation: "'sheep' /ʃiːp/ - long /iː/.",
        explanationVi: "'sheep' /ʃiːp/ - /iː/ dài.",
        audioWord: "sheep",
      },
    ],
  },
  {
    id: "ipa-diphthongs",
    moduleId: "ipa-sounds",
    order: 3,
    title: "Diphthongs: /eɪ/ /aɪ/ /ɔɪ/ /aʊ/ /əʊ/ /ɪə/ /eə/ /ʊə/",
    titleVi: "Nguyên Âm Đôi: /eɪ/ /aɪ/ /ɔɪ/ /aʊ/ /əʊ/ /ɪə/ /eə/ /ʊə/",
    symbol: "eɪ aɪ ɔɪ aʊ əʊ ɪə eə ʊə",
    emoji: "🌗",
    duration: "18 min",
    difficulty: "Elementary",
    introduction:
      "A diphthong is one vowel that glides into another within the same syllable. English has 8 diphthongs - they are the 'voice' of native speech.",
    introductionVi:
      "Nguyên âm đôi là một nguyên âm trượt sang nguyên âm khác trong cùng âm tiết. Tiếng Anh có 8 nguyên âm đôi - tạo nên 'chất giọng' bản xứ.",
    howTo: [
      { step: "Start at the first vowel, then SLIDE smoothly to the second.", stepVi: "Bắt đầu ở nguyên âm thứ nhất, rồi TRƯỢT mềm sang nguyên âm thứ hai." },
      { step: "The first vowel is louder and longer than the second.", stepVi: "Nguyên âm đầu to và dài hơn nguyên âm sau." },
      { step: "Don't break it into 2 syllables - it stays ONE syllable.", stepVi: "Không tách thành 2 âm tiết - vẫn là MỘT âm tiết." },
    ],
    examples: [
      { word: "day", ipa: "/deɪ/", vi: "ngày" },
      { word: "my", ipa: "/maɪ/", vi: "của tôi" },
      { word: "boy", ipa: "/bɔɪ/", vi: "cậu bé" },
      { word: "now", ipa: "/naʊ/", vi: "bây giờ" },
      { word: "go", ipa: "/ɡəʊ/", vi: "đi" },
      { word: "near", ipa: "/nɪə/", vi: "gần" },
      { word: "hair", ipa: "/heə/", vi: "tóc" },
      { word: "tour", ipa: "/tʊə/", vi: "chuyến đi" },
    ],
    minimalPairs: [
      { a: { word: "buy", ipa: "/baɪ/" }, b: { word: "boy", ipa: "/bɔɪ/" }, contrast: "/aɪ/ vs /ɔɪ/", contrastVi: "/aɪ/ vs /ɔɪ/" },
      { a: { word: "no", ipa: "/nəʊ/" }, b: { word: "now", ipa: "/naʊ/" }, contrast: "/əʊ/ vs /aʊ/", contrastVi: "/əʊ/ vs /aʊ/" },
      { a: { word: "say", ipa: "/seɪ/" }, b: { word: "sigh", ipa: "/saɪ/" }, contrast: "/eɪ/ vs /aɪ/", contrastVi: "/eɪ/ vs /aɪ/" },
    ],
    commonMistakeVi:
      "Người Việt hay phát âm 'go' thành 'gô' (đơn âm), thay vì /ɡəʊ/ - bị mất chất diphthong và nghe rất 'Việt'.",
    teacherTip: "Move your jaw visibly when practicing - diphthongs require physical movement, not just sound.",
    teacherTipVi: "Cử động hàm rõ ràng khi luyện - nguyên âm đôi cần chuyển động vật lý, không chỉ âm thanh.",
    practiceSentences: [
      { en: "The boy bought a toy today.", vi: "Cậu bé mua đồ chơi hôm nay." },
      { en: "I don't know how to go now.", vi: "Tôi không biết đi thế nào bây giờ." },
      { en: "Near my house there's a fair.", vi: "Gần nhà tôi có hội chợ." },
      { en: "Say goodbye and try to fly high.", vi: "Tạm biệt và cố bay cao." },
    ],
    quiz: [
      {
        question: "How many diphthongs does English have?",
        questionVi: "Tiếng Anh có bao nhiêu nguyên âm đôi?",
        options: ["5", "6", "8", "10"],
        answer: 2,
        explanation: "Standard British English has 8 diphthongs.",
        explanationVi: "Tiếng Anh-Anh chuẩn có 8 nguyên âm đôi.",
      },
      {
        question: "Which word contains /əʊ/?",
        questionVi: "Từ nào chứa /əʊ/?",
        options: ["now", "no", "boy", "buy"],
        answer: 1,
        explanation: "'no' /nəʊ/ - closing diphthong.",
        explanationVi: "'no' /nəʊ/ - diphthong đóng.",
        audioWord: "no",
      },
      {
        question: "A diphthong is...",
        questionVi: "Diphthong là...",
        options: [
          "two consonants together",
          "two syllables",
          "one vowel sliding into another, in one syllable",
          "a long vowel",
        ],
        answer: 2,
        explanation: "One vowel gliding to another within a single syllable.",
        explanationVi: "Một nguyên âm trượt sang nguyên âm khác trong cùng một âm tiết.",
      },
      {
        question: "Listen: which word is it?",
        questionVi: "Nghe: từ nào?",
        options: ["go", "guy", "gay", "gone"],
        answer: 0,
        explanation: "'go' /ɡəʊ/.",
        explanationVi: "'go' /ɡəʊ/.",
        audioWord: "go",
      },
    ],
  },
  {
    id: "ipa-stop-consonants",
    moduleId: "ipa-sounds",
    order: 4,
    title: "Stop Consonants: /p b t d k ɡ/",
    titleVi: "Phụ Âm Tắc: /p b t d k ɡ/",
    symbol: "p b t d k ɡ",
    emoji: "💥",
    duration: "12 min",
    difficulty: "Beginner",
    introduction:
      "Stops (or 'plosives') block airflow then release it suddenly. They come in voiceless/voiced pairs: p/b, t/d, k/ɡ.",
    introductionVi:
      "Phụ âm tắc (plosive) chặn luồng khí rồi bung ra. Chúng đi theo cặp vô thanh/hữu thanh: p/b, t/d, k/ɡ.",
    howTo: [
      { step: "/p/ /t/ /k/ are voiceless - no vibration in the throat.", stepVi: "/p/ /t/ /k/ vô thanh - không rung dây thanh." },
      { step: "/b/ /d/ /ɡ/ are voiced - feel vibration in your throat.", stepVi: "/b/ /d/ /ɡ/ hữu thanh - sờ cổ thấy rung." },
      { step: "At the START of a stressed syllable, /p/ /t/ /k/ are 'aspirated' - release a small puff of air.", stepVi: "Đầu âm tiết có trọng âm, /p/ /t/ /k/ bật hơi (aspirated) - phun nhẹ luồng khí." },
      { step: "ALWAYS pronounce the FINAL consonant - Vietnamese learners often drop it.", stepVi: "LUÔN phát âm phụ âm CUỐI - người Việt hay nuốt mất." },
    ],
    examples: [
      { word: "pen / Ben", ipa: "/pen/ /ben/", vi: "bút / tên Ben" },
      { word: "ten / den", ipa: "/ten/ /den/", vi: "mười / hang ổ" },
      { word: "cap / cab", ipa: "/kæp/ /kæb/", vi: "mũ / taxi" },
      { word: "back", ipa: "/bæk/", vi: "lưng" },
      { word: "stopped", ipa: "/stɒpt/", vi: "đã dừng" },
    ],
    minimalPairs: [
      { a: { word: "pat", ipa: "/pæt/" }, b: { word: "bat", ipa: "/bæt/" }, contrast: "voiceless /p/ vs voiced /b/", contrastVi: "vô thanh /p/ vs hữu thanh /b/" },
      { a: { word: "ten", ipa: "/ten/" }, b: { word: "den", ipa: "/den/" }, contrast: "voiceless /t/ vs voiced /d/", contrastVi: "vô thanh /t/ vs hữu thanh /d/" },
      { a: { word: "cap", ipa: "/kæp/" }, b: { word: "cab", ipa: "/kæb/" }, contrast: "final /p/ vs final /b/", contrastVi: "/p/ cuối vs /b/ cuối" },
    ],
    commonMistakeVi:
      "Người Việt thường nuốt phụ âm cuối: 'cab' thành 'ca', 'stopped' thành 'stop'. Mất phụ âm cuối = mất nghĩa.",
    teacherTip: "Hold a tissue 5 cm from your mouth - when you say 'pen', the tissue must move from the puff of air.",
    teacherTipVi: "Cầm khăn giấy cách miệng 5 cm - khi nói 'pen' khăn phải di chuyển vì luồng khí bật ra.",
    practiceSentences: [
      { en: "Peter packed a big black bag.", vi: "Peter đóng một túi đen lớn." },
      { en: "The cab stopped at the back.", vi: "Taxi dừng ở phía sau." },
      { en: "Don't drop the cup - pick it up.", vi: "Đừng làm rớt cốc - nhặt lên." },
      { en: "Ted decided to dance until dawn.", vi: "Ted quyết định nhảy đến tận bình minh." },
    ],
    quiz: [
      {
        question: "Which pair are both VOICELESS?",
        questionVi: "Cặp nào CẢ HAI đều vô thanh?",
        options: ["/p/ /b/", "/t/ /d/", "/p/ /k/", "/b/ /ɡ/"],
        answer: 2,
        explanation: "/p/ and /k/ are both voiceless stops.",
        explanationVi: "/p/ và /k/ đều là phụ âm tắc vô thanh.",
      },
      {
        question: "What does 'aspirated' mean?",
        questionVi: "'Aspirated' (bật hơi) nghĩa là gì?",
        options: [
          "louder pronunciation",
          "released with a puff of air",
          "spoken from the throat",
          "vibration of vocal cords",
        ],
        answer: 1,
        explanation: "Aspirated = released with a small puff of air (like /p/ in 'pen').",
        explanationVi: "Bật hơi = phát ra cùng luồng hơi nhỏ (như /p/ trong 'pen').",
      },
      {
        question: "Listen: which word is it?",
        questionVi: "Nghe: từ nào?",
        options: ["pat", "bat", "pad", "bad"],
        answer: 1,
        explanation: "'bat' starts with voiced /b/.",
        explanationVi: "'bat' bắt đầu bằng /b/ hữu thanh.",
        audioWord: "bat",
      },
      {
        question: "Vietnamese learners commonly...",
        questionVi: "Người Việt thường mắc lỗi...",
        options: [
          "add extra consonants",
          "drop final consonants",
          "say all consonants too loudly",
          "skip vowels",
        ],
        answer: 1,
        explanation: "Vietnamese has fewer final consonants, so learners often drop English ones.",
        explanationVi: "Tiếng Việt ít phụ âm cuối, nên người học hay bỏ phụ âm cuối tiếng Anh.",
      },
    ],
  },
  {
    id: "ipa-fricatives",
    moduleId: "ipa-sounds",
    order: 5,
    title: "Fricatives: /f v θ ð s z ʃ ʒ h/",
    titleVi: "Phụ Âm Xát: /f v θ ð s z ʃ ʒ h/",
    symbol: "f v θ ð s z ʃ ʒ h",
    emoji: "💨",
    duration: "16 min",
    difficulty: "Elementary",
    introduction:
      "Fricatives are made by forcing air through a narrow gap, creating friction. The 'th' sounds /θ/ /ð/ are the hardest for Vietnamese learners.",
    introductionVi:
      "Phụ âm xát tạo ra bằng cách ép luồng khí qua khe hẹp, gây ma sát. Âm 'th' /θ/ /ð/ là khó nhất với người Việt.",
    howTo: [
      { step: "/θ/ (think) - tongue between teeth, blow air, NO voice.", stepVi: "/θ/ (think) - đầu lưỡi giữa hai hàm răng, thổi nhẹ, KHÔNG rung." },
      { step: "/ð/ (this) - same position as /θ/, but VOICED (vibration).", stepVi: "/ð/ (this) - cùng vị trí /θ/, nhưng RUNG dây thanh." },
      { step: "/ʃ/ (she) - round lips slightly, tongue raised behind alveolar ridge.", stepVi: "/ʃ/ (she) - môi hơi tròn, lưỡi nâng sau lợi." },
      { step: "/h/ (hat) - gentle puff from the throat, like fogging a mirror.", stepVi: "/h/ (hat) - luồng khí nhẹ từ họng, như thở vào gương." },
    ],
    examples: [
      { word: "think", ipa: "/θɪŋk/", vi: "nghĩ" },
      { word: "this", ipa: "/ðɪs/", vi: "cái này" },
      { word: "she", ipa: "/ʃiː/", vi: "cô ấy" },
      { word: "vision", ipa: "/ˈvɪʒən/", vi: "tầm nhìn" },
      { word: "five", ipa: "/faɪv/", vi: "năm (số)" },
      { word: "hat", ipa: "/hæt/", vi: "mũ" },
    ],
    minimalPairs: [
      { a: { word: "thin", ipa: "/θɪn/" }, b: { word: "tin", ipa: "/tɪn/" }, contrast: "/θ/ vs /t/", contrastVi: "/θ/ vs /t/" },
      { a: { word: "they", ipa: "/ðeɪ/" }, b: { word: "day", ipa: "/deɪ/" }, contrast: "/ð/ vs /d/", contrastVi: "/ð/ vs /d/" },
      { a: { word: "ship", ipa: "/ʃɪp/" }, b: { word: "sip", ipa: "/sɪp/" }, contrast: "/ʃ/ vs /s/", contrastVi: "/ʃ/ vs /s/" },
      { a: { word: "fan", ipa: "/fæn/" }, b: { word: "van", ipa: "/væn/" }, contrast: "/f/ vs /v/", contrastVi: "/f/ vs /v/" },
    ],
    commonMistakeVi:
      "Người Việt thường thay /θ/ → /t/ ('think' thành 'tink') và /ð/ → /d/ ('this' thành 'dis'). Phải đặt lưỡi giữa răng.",
    teacherTip: "Look in a mirror: when you say /θ/, you should SEE the tip of your tongue. If you don't, you're saying /t/.",
    teacherTipVi: "Soi gương: khi nói /θ/ phải THẤY đầu lưỡi. Nếu không thấy là bạn đang nói /t/.",
    practiceSentences: [
      { en: "I think this is the third thing.", vi: "Tôi nghĩ đây là điều thứ ba." },
      { en: "She sells seashells by the seashore.", vi: "Cô ấy bán vỏ sò bên bờ biển." },
      { en: "Five fans were vibrating in the van.", vi: "Năm chiếc quạt rung trong xe tải." },
      { en: "His vision is to share happiness.", vi: "Tầm nhìn của anh là chia sẻ hạnh phúc." },
    ],
    quiz: [
      {
        question: "Which is the VOICED 'th' sound?",
        questionVi: "Âm 'th' nào HỮU thanh?",
        options: ["/θ/", "/ð/", "/s/", "/ʃ/"],
        answer: 1,
        explanation: "/ð/ as in 'this' is voiced; /θ/ as in 'think' is voiceless.",
        explanationVi: "/ð/ trong 'this' hữu thanh; /θ/ trong 'think' vô thanh.",
      },
      {
        question: "Which pair contrasts /θ/ with /t/?",
        questionVi: "Cặp nào tương phản /θ/ với /t/?",
        options: ["thin/tin", "they/day", "ship/sip", "fan/van"],
        answer: 0,
        explanation: "thin /θɪn/ vs tin /tɪn/.",
        explanationVi: "thin /θɪn/ vs tin /tɪn/.",
      },
      {
        question: "Listen: which word is it?",
        questionVi: "Nghe: từ nào?",
        options: ["think", "tink", "sink", "drink"],
        answer: 0,
        explanation: "'think' /θɪŋk/ - tongue between teeth.",
        explanationVi: "'think' /θɪŋk/ - lưỡi giữa răng.",
        audioWord: "think",
      },
      {
        question: "How do you make /θ/?",
        questionVi: "Cách tạo âm /θ/?",
        options: [
          "Tongue behind upper teeth, voiced",
          "Tongue between teeth, voiceless",
          "Lips together, voiced",
          "Throat, voiceless",
        ],
        answer: 1,
        explanation: "Tongue tip lightly between teeth, blow air without voice.",
        explanationVi: "Đầu lưỡi nhẹ giữa răng, thổi khí không rung.",
      },
    ],
  },
  {
    id: "ipa-other-consonants",
    moduleId: "ipa-sounds",
    order: 6,
    title: "Affricates, Nasals, Approximants: /tʃ dʒ m n ŋ l r w j/",
    titleVi: "Tắc-Xát, Mũi & Cận Âm: /tʃ dʒ m n ŋ l r w j/",
    symbol: "tʃ dʒ m n ŋ l r w j",
    emoji: "👅",
    duration: "14 min",
    difficulty: "Elementary",
    introduction:
      "These remaining consonants complete the 24-consonant set. Pay special attention to /r/ (no rolling!), /l/ (light vs dark), and /ŋ/ (sing).",
    introductionVi:
      "Các phụ âm này hoàn thành bộ 24 phụ âm. Chú ý đặc biệt /r/ (không rung như tiếng Việt!), /l/ (sáng vs tối), và /ŋ/ (sing).",
    howTo: [
      { step: "/tʃ/ (chair) = /t/ + /ʃ/ blended; /dʒ/ (job) = /d/ + /ʒ/ blended.", stepVi: "/tʃ/ (chair) = /t/ + /ʃ/ liền; /dʒ/ (job) = /d/ + /ʒ/ liền." },
      { step: "/ŋ/ (sing) - tongue back, like /n/ but at the back of the mouth.", stepVi: "/ŋ/ (sing) - lưỡi sau, như /n/ nhưng ở vòm sau." },
      { step: "/r/ - DON'T roll the tongue. Curl tip back slightly without touching anything.", stepVi: "/r/ - KHÔNG rung lưỡi. Cuốn nhẹ đầu lưỡi về sau, không chạm vào đâu." },
      { step: "Light /l/ at start (love); dark /ɫ/ at end (cold).", stepVi: "/l/ sáng ở đầu từ (love); /ɫ/ tối ở cuối từ (cold)." },
    ],
    examples: [
      { word: "chair", ipa: "/tʃeə/", vi: "ghế" },
      { word: "job", ipa: "/dʒɒb/", vi: "công việc" },
      { word: "sing", ipa: "/sɪŋ/", vi: "hát" },
      { word: "right", ipa: "/raɪt/", vi: "đúng / phải" },
      { word: "love", ipa: "/lʌv/", vi: "yêu" },
      { word: "yes", ipa: "/jes/", vi: "vâng" },
      { word: "what", ipa: "/wɒt/", vi: "cái gì" },
    ],
    minimalPairs: [
      { a: { word: "chip", ipa: "/tʃɪp/" }, b: { word: "ship", ipa: "/ʃɪp/" }, contrast: "/tʃ/ vs /ʃ/", contrastVi: "/tʃ/ vs /ʃ/" },
      { a: { word: "right", ipa: "/raɪt/" }, b: { word: "light", ipa: "/laɪt/" }, contrast: "/r/ vs /l/", contrastVi: "/r/ vs /l/" },
      { a: { word: "sin", ipa: "/sɪn/" }, b: { word: "sing", ipa: "/sɪŋ/" }, contrast: "/n/ vs /ŋ/", contrastVi: "/n/ vs /ŋ/" },
    ],
    commonMistakeVi:
      "Người Việt hay phát /r/ rung như tiếng Việt (rất sai), trộn lẫn /l/ và /n/, và bỏ /ŋ/ ở 'sing' thành 'sin'.",
    teacherTip: "Practice 'red lorry, yellow lorry' to drill /r/ vs /l/ smoothly without confusion.",
    teacherTipVi: "Luyện 'red lorry, yellow lorry' để phân biệt /r/ vs /l/ trôi chảy.",
    practiceSentences: [
      { en: "The chef chose cheese chips.", vi: "Đầu bếp chọn khoai tây phô mai." },
      { en: "Right now, light the long candle.", vi: "Ngay bây giờ, thắp cây nến dài." },
      { en: "John is singing a song in the morning.", vi: "John đang hát một bài hát buổi sáng." },
      { en: "Yes, we will work with you.", vi: "Vâng, chúng tôi sẽ làm việc với bạn." },
    ],
    quiz: [
      {
        question: "Which symbol is for the 'ng' in 'sing'?",
        questionVi: "Ký hiệu nào cho âm 'ng' trong 'sing'?",
        options: ["/n/", "/ŋ/", "/ɲ/", "/ɡ/"],
        answer: 1,
        explanation: "/ŋ/ - velar nasal.",
        explanationVi: "/ŋ/ - âm mũi vòm sau.",
      },
      {
        question: "How is English /r/ produced?",
        questionVi: "Cách phát âm /r/ tiếng Anh?",
        options: [
          "Roll the tongue like Spanish 'rr'",
          "Tap the tongue once",
          "Curl the tip back without touching",
          "Vibrate the throat",
        ],
        answer: 2,
        explanation: "English /r/ is an approximant - tongue curls back, doesn't touch.",
        explanationVi: "/r/ tiếng Anh là cận âm - lưỡi cuốn về sau, không chạm.",
      },
      {
        question: "Listen: which word is it?",
        questionVi: "Nghe: từ nào?",
        options: ["chip", "ship", "sip", "trip"],
        answer: 0,
        explanation: "'chip' /tʃɪp/ - affricate /tʃ/.",
        explanationVi: "'chip' /tʃɪp/ - tắc-xát /tʃ/.",
        audioWord: "chip",
      },
      {
        question: "/dʒ/ is a combination of which two sounds?",
        questionVi: "/dʒ/ là sự kết hợp của hai âm nào?",
        options: ["/d/ + /ʃ/", "/d/ + /ʒ/", "/t/ + /ʒ/", "/d/ + /j/"],
        answer: 1,
        explanation: "/dʒ/ as in 'job' = /d/ + /ʒ/.",
        explanationVi: "/dʒ/ trong 'job' = /d/ + /ʒ/.",
      },
    ],
  },
];

// =====================================================================
// MODULE 2 - WORD STRESS & SYLLABLES (6 lessons)
// =====================================================================
const wordStressLessons: PronLesson[] = [
  {
    id: "ws-syllable-counting",
    moduleId: "word-stress",
    order: 1,
    title: "Counting Syllables - The Foundation",
    titleVi: "Đếm Âm Tiết - Nền Tảng Của Trọng Âm",
    emoji: "🔢",
    duration: "10 min",
    difficulty: "Beginner",
    introduction:
      "Before stress comes syllables. A syllable is one beat - one vowel sound. You can't place stress correctly if you can't count syllables.",
    introductionVi:
      "Trước khi học trọng âm, phải biết đếm âm tiết. Một âm tiết = một nhịp = một âm nguyên âm. Đếm sai âm tiết = đặt sai trọng âm.",
    howTo: [
      { step: "Place your hand under your chin.", stepVi: "Đặt tay dưới cằm." },
      { step: "Say the word naturally - count chin drops. Each drop = 1 syllable.", stepVi: "Nói từ tự nhiên - đếm số lần cằm hạ. Mỗi lần = 1 âm tiết." },
      { step: "Count VOWEL SOUNDS, not letters: 'cake' = /keɪk/ = 1 syllable (silent 'e').", stepVi: "Đếm ÂM NGUYÊN ÂM, không phải chữ cái: 'cake' = 1 âm tiết ('e' câm)." },
    ],
    examples: [
      { word: "dog", ipa: "/dɒɡ/ - 1", vi: "1 âm tiết" },
      { word: "table", ipa: "/ˈteɪ.bəl/ - 2", vi: "2 âm tiết" },
      { word: "computer", ipa: "/kəmˈpjuː.tə/ - 3", vi: "3 âm tiết" },
      { word: "education", ipa: "/ˌed.jʊˈkeɪ.ʃən/ - 4", vi: "4 âm tiết" },
      { word: "international", ipa: "/ˌɪn.təˈnæʃ.ən.əl/ - 5", vi: "5 âm tiết" },
    ],
    commonMistakeVi:
      "Người Việt hay đếm theo chữ cái thay vì âm. 'Chocolate' nhìn thì 4 chữ tách nhưng phát âm là 2 hoặc 3 âm tiết /ˈtʃɒk.lət/.",
    teacherTip: "If unsure, hum the word - each hum-beat is a syllable.",
    teacherTipVi: "Nếu phân vân, ngân nga từ đó - mỗi nhịp ngân là một âm tiết.",
    practiceSentences: [
      { en: "Try counting: hospital, beautiful, opportunity, refrigerator.", vi: "Thử đếm: hospital, beautiful, opportunity, refrigerator." },
      { en: "Camera = 2 or 3? (Both are heard, but 2 is common in fast speech.)", vi: "Camera = 2 hay 3? (Cả hai, nhưng 2 phổ biến hơn khi nói nhanh.)" },
    ],
    quiz: [
      {
        question: "How many syllables in 'beautiful'?",
        questionVi: "'beautiful' có bao nhiêu âm tiết?",
        options: ["2", "3", "4", "5"],
        answer: 1,
        explanation: "/ˈbjuː.tɪ.fəl/ - 3 syllables.",
        explanationVi: "/ˈbjuː.tɪ.fəl/ - 3 âm tiết.",
      },
      {
        question: "How many syllables in 'cake'?",
        questionVi: "'cake' có bao nhiêu âm tiết?",
        options: ["1", "2"],
        answer: 0,
        explanation: "'cake' /keɪk/ = 1 syllable. Silent 'e'.",
        explanationVi: "'cake' /keɪk/ = 1 âm tiết. 'e' câm.",
      },
      {
        question: "Which word has 4 syllables?",
        questionVi: "Từ nào có 4 âm tiết?",
        options: ["hospital", "education", "computer", "beautiful"],
        answer: 1,
        explanation: "education /ˌed.jʊˈkeɪ.ʃən/ - 4 syllables.",
        explanationVi: "education /ˌed.jʊˈkeɪ.ʃən/ - 4 âm tiết.",
      },
    ],
  },
  {
    id: "ws-primary-secondary",
    moduleId: "word-stress",
    order: 2,
    title: "Primary vs Secondary Stress",
    titleVi: "Trọng Âm Chính vs Trọng Âm Phụ",
    emoji: "⭐",
    duration: "12 min",
    difficulty: "Elementary",
    introduction:
      "In words of 3+ syllables, English uses TWO levels of stress: primary (strongest, marked ˈ) and secondary (medium, marked ˌ). All other syllables are weak.",
    introductionVi:
      "Trong từ 3+ âm tiết, tiếng Anh có HAI mức trọng âm: chính (mạnh nhất, ˈ) và phụ (trung bình, ˌ). Các âm tiết còn lại nhẹ.",
    howTo: [
      { step: "Primary stress is LOUDER, LONGER, and HIGHER pitch.", stepVi: "Trọng âm chính: TO HƠN, DÀI HƠN, CAO HƠN." },
      { step: "Secondary stress is medium - clearer than weak syllables.", stepVi: "Trọng âm phụ: trung bình - rõ hơn âm tiết yếu." },
      { step: "Weak syllables usually contain /ə/ schwa.", stepVi: "Âm tiết yếu thường chứa /ə/ schwa." },
    ],
    examples: [
      { word: "ˌunderˈstand", ipa: "/ˌʌn.dəˈstænd/", vi: "hiểu" },
      { word: "ˌeduˈcation", ipa: "/ˌed.jʊˈkeɪ.ʃən/", vi: "giáo dục" },
      { word: "ˌinterˈnational", ipa: "/ˌɪn.təˈnæʃ.ən.əl/", vi: "quốc tế" },
      { word: "ˌconverˈsation", ipa: "/ˌkɒn.vəˈseɪ.ʃən/", vi: "cuộc hội thoại" },
    ],
    commonMistakeVi:
      "Người Việt hay phát âm tất cả âm tiết bằng nhau, làm mất tính 'nhạc' của tiếng Anh.",
    teacherTip: "Clap the word: BIG clap on primary stress, medium clap on secondary, no clap on weak syllables.",
    teacherTipVi: "Vỗ tay theo từ: vỗ TO ở trọng âm chính, vỗ vừa ở phụ, không vỗ ở âm tiết yếu.",
    practiceSentences: [
      { en: "ˌUnderˈstand the ˌconverˈsation.", vi: "Hiểu cuộc hội thoại." },
      { en: "ˌInterˈnational ˌeduˈcation is important.", vi: "Giáo dục quốc tế quan trọng." },
    ],
    quiz: [
      {
        question: "Where is the PRIMARY stress in 'education'?",
        questionVi: "Trọng âm chính của 'education' ở đâu?",
        options: ["e-", "-du-", "-ca-", "-tion"],
        answer: 2,
        explanation: "/ˌed.jʊˈkeɪ.ʃən/ - primary on -CA-.",
        explanationVi: "/ˌed.jʊˈkeɪ.ʃən/ - trọng âm chính ở -CA-.",
      },
      {
        question: "What does the symbol /ˌ/ mean?",
        questionVi: "Ký hiệu /ˌ/ nghĩa là gì?",
        options: ["primary stress", "secondary stress", "weak syllable", "long vowel"],
        answer: 1,
        explanation: "/ˌ/ marks secondary stress.",
        explanationVi: "/ˌ/ đánh dấu trọng âm phụ.",
      },
      {
        question: "Listen: where's the primary stress in 'photographer'?",
        questionVi: "Nghe: trọng âm chính của 'photographer'?",
        options: ["pho-", "-tog-", "-ra-", "-pher"],
        answer: 1,
        explanation: "/fəˈtɒɡ.rə.fə/ - primary on -TOG-.",
        explanationVi: "/fəˈtɒɡ.rə.fə/ - trọng âm chính ở -TOG-.",
        audioWord: "photographer",
      },
    ],
  },
  {
    id: "ws-noun-verb-shift",
    moduleId: "word-stress",
    order: 3,
    title: "Noun-Verb Stress Shift (PREsent vs preSENT)",
    titleVi: "Chuyển Trọng Âm Danh-Động (PREsent vs preSENT)",
    emoji: "🔄",
    duration: "14 min",
    difficulty: "Intermediate",
    introduction:
      "Many 2-syllable words can be both noun and verb - and the stress changes! Noun = first syllable. Verb = second syllable. Memorize this rule!",
    introductionVi:
      "Nhiều từ 2 âm tiết có thể là cả danh từ lẫn động từ - và trọng âm thay đổi! Danh từ = âm tiết 1. Động từ = âm tiết 2. Học thuộc!",
    howTo: [
      { step: "If it's a NOUN → stress the FIRST syllable.", stepVi: "Nếu là DANH TỪ → trọng âm âm tiết ĐẦU." },
      { step: "If it's a VERB → stress the SECOND syllable.", stepVi: "Nếu là ĐỘNG TỪ → trọng âm âm tiết SAU." },
      { step: "This rule covers ~90% of 2-syllable noun/verb pairs.", stepVi: "Quy tắc này áp dụng ~90% các cặp danh/động 2 âm tiết." },
    ],
    examples: [
      { word: "PREsent (n)", ipa: "/ˈprez.ənt/", vi: "món quà" },
      { word: "preSENT (v)", ipa: "/prɪˈzent/", vi: "trao tặng" },
      { word: "REcord (n)", ipa: "/ˈrek.ɔːd/", vi: "kỷ lục" },
      { word: "reCORD (v)", ipa: "/rɪˈkɔːd/", vi: "ghi âm" },
      { word: "OBject (n)", ipa: "/ˈɒb.dʒɪkt/", vi: "vật thể" },
      { word: "obJECT (v)", ipa: "/əbˈdʒekt/", vi: "phản đối" },
      { word: "PROduce (n)", ipa: "/ˈprɒd.juːs/", vi: "nông sản" },
      { word: "proDUCE (v)", ipa: "/prəˈdjuːs/", vi: "sản xuất" },
    ],
    commonMistakeVi:
      "Người học hay nói 'I will REcord this song' (sai trọng âm) thay vì 'reCORD'.",
    teacherTip: "Make a sentence with both: 'I have a PREsent for you. I will preSENT it tomorrow.' Drill aloud daily.",
    teacherTipVi: "Đặt câu dùng cả hai: 'I have a PREsent for you. I will preSENT it tomorrow.' Luyện thành tiếng mỗi ngày.",
    practiceSentences: [
      { en: "I want to reCORD a new REcord.", vi: "Tôi muốn ghi âm một bản kỷ lục mới." },
      { en: "We need to proDUCE more PROduce.", vi: "Chúng ta cần sản xuất thêm nông sản." },
      { en: "Don't obJECT to the OBject on the table.", vi: "Đừng phản đối vật trên bàn." },
    ],
    quiz: [
      {
        question: "'I gave her a PRESENT.' Where is the stress?",
        questionVi: "'I gave her a PRESENT.' Trọng âm ở đâu?",
        options: ["PRE-sent (1st)", "pre-SENT (2nd)"],
        answer: 0,
        explanation: "Noun → first syllable.",
        explanationVi: "Danh từ → âm tiết đầu.",
      },
      {
        question: "'They will RECORD the song.' Stress on?",
        questionVi: "'They will RECORD the song.' Trọng âm ở?",
        options: ["RE-cord (1st)", "re-CORD (2nd)"],
        answer: 1,
        explanation: "Verb → second syllable: re-CORD.",
        explanationVi: "Động từ → âm tiết sau: re-CORD.",
      },
      {
        question: "Rule: 2-syllable noun → stress on...",
        questionVi: "Quy tắc: danh từ 2 âm tiết → trọng âm ở...",
        options: ["1st syllable", "2nd syllable", "depends on word", "always last"],
        answer: 0,
        explanation: "Nouns: 1st syllable. Verbs: 2nd syllable.",
        explanationVi: "Danh từ: âm tiết 1. Động từ: âm tiết 2.",
      },
    ],
  },
  {
    id: "ws-suffix-rules",
    moduleId: "word-stress",
    order: 4,
    title: "Suffix Stress Rules: -tion, -ic, -ity, -ical",
    titleVi: "Quy Tắc Trọng Âm Theo Hậu Tố: -tion, -ic, -ity, -ical",
    emoji: "🎚️",
    duration: "13 min",
    difficulty: "Intermediate",
    introduction:
      "Certain suffixes 'pull' the stress to the syllable RIGHT BEFORE them. Learning these patterns gives you instant stress prediction for thousands of words.",
    introductionVi:
      "Một số hậu tố 'kéo' trọng âm về âm tiết NGAY TRƯỚC chúng. Học quy tắc này = đoán trọng âm hàng nghìn từ ngay lập tức.",
    howTo: [
      { step: "-tion / -sion / -cian → stress on syllable BEFORE the suffix.", stepVi: "-tion / -sion / -cian → trọng âm âm tiết NGAY TRƯỚC." },
      { step: "-ic / -ical → stress on syllable BEFORE the suffix.", stepVi: "-ic / -ical → trọng âm âm tiết NGAY TRƯỚC." },
      { step: "-ity / -ify → stress on syllable BEFORE the suffix.", stepVi: "-ity / -ify → trọng âm âm tiết NGAY TRƯỚC." },
      { step: "-ee / -eer / -ese → stress ON the suffix itself.", stepVi: "-ee / -eer / -ese → trọng âm CHÍNH trên hậu tố." },
    ],
    examples: [
      { word: "ˌeduˈcation", ipa: "/ˌed.jʊˈkeɪ.ʃən/", vi: "giáo dục - trước -tion" },
      { word: "deˈcision", ipa: "/dɪˈsɪʒ.ən/", vi: "quyết định - trước -sion" },
      { word: "ˈmagic", ipa: "/ˈmæ.dʒɪk/", vi: "ma thuật - trước -ic" },
      { word: "ˈchemical", ipa: "/ˈkem.ɪ.kəl/", vi: "hóa học - trước -ical" },
      { word: "uniˈversity", ipa: "/ˌjuː.nɪˈvɜː.sə.ti/", vi: "đại học - trước -ity" },
      { word: "engiˈneer", ipa: "/ˌen.dʒɪˈnɪə/", vi: "kỹ sư - ON -eer" },
      { word: "Vietnaˈmese", ipa: "/ˌvjet.nəˈmiːz/", vi: "người Việt - ON -ese" },
    ],
    commonMistakeVi:
      "Người Việt hay nói 'EDucation' (trọng âm sai), nên ghi nhớ -tion = trọng âm liền trước.",
    teacherTip: "Highlight the syllable before the suffix in different color when studying - visual reinforcement helps.",
    teacherTipVi: "Tô màu âm tiết liền trước hậu tố khi học - củng cố trực quan rất hiệu quả.",
    practiceSentences: [
      { en: "ˌEduˈcation requires deˈcisions and ˌconcenˈtration.", vi: "Giáo dục đòi hỏi quyết định và sự tập trung." },
      { en: "The engiˈneer made a ˈmagic ˈchemical reˈaction.", vi: "Kỹ sư đã tạo phản ứng hóa học diệu kỳ." },
    ],
    quiz: [
      {
        question: "Where is the stress in 'communication'?",
        questionVi: "Trọng âm của 'communication' ở đâu?",
        options: ["com-", "-mu-", "-ni-", "-CA-", "-tion"],
        answer: 3,
        explanation: "/kəˌmjuː.nɪˈkeɪ.ʃən/ - primary on syllable before -tion.",
        explanationVi: "/kəˌmjuː.nɪˈkeɪ.ʃən/ - trọng âm chính trên âm tiết liền trước -tion.",
        audioWord: "communication",
      },
      {
        question: "Which suffix takes the stress ON ITSELF?",
        questionVi: "Hậu tố nào nhận trọng âm CHÍNH lên CHÍNH NÓ?",
        options: ["-tion", "-ic", "-eer", "-ity"],
        answer: 2,
        explanation: "-eer (engiNEER), -ee (employEE), -ese (JapaNESE) take the stress.",
        explanationVi: "-eer (engiNEER), -ee (employEE), -ese (JapaNESE) nhận trọng âm.",
      },
      {
        question: "Where is the stress in 'photographic'?",
        questionVi: "Trọng âm của 'photographic' ở đâu?",
        options: ["pho-", "-to-", "-GRAPH-", "-ic"],
        answer: 2,
        explanation: "/ˌfəʊ.təˈɡræf.ɪk/ - primary on syllable before -ic.",
        explanationVi: "/ˌfəʊ.təˈɡræf.ɪk/ - trọng âm chính trên âm tiết liền trước -ic.",
      },
    ],
  },
  {
    id: "ws-compound-nouns",
    moduleId: "word-stress",
    order: 5,
    title: "Compound Nouns: BLACKboard vs black BOARD",
    titleVi: "Danh Từ Ghép: BLACKboard vs black BOARD",
    emoji: "🧱",
    duration: "11 min",
    difficulty: "Intermediate",
    introduction:
      "Compound nouns (one word made of two) take stress on the FIRST element. Adjective + noun phrases (two separate words) stress the SECOND element.",
    introductionVi:
      "Danh từ ghép (1 từ ghép từ 2 từ) trọng âm ở phần ĐẦU. Cụm tính từ + danh từ (2 từ riêng) trọng âm ở phần SAU.",
    howTo: [
      { step: "Compound noun: one concept, often one written word → stress on FIRST part.", stepVi: "Danh từ ghép: một khái niệm, thường viết liền → trọng âm phần ĐẦU." },
      { step: "Adj + Noun phrase: two ideas → stress on the noun (SECOND part).", stepVi: "Cụm tính từ + danh từ: hai ý → trọng âm danh từ (phần SAU)." },
    ],
    examples: [
      { word: "BLACKboard", ipa: "/ˈblæk.bɔːd/", vi: "bảng đen (vật cụ thể)" },
      { word: "black BOARD", ipa: "/blæk ˈbɔːd/", vi: "tấm ván màu đen" },
      { word: "GREENhouse", ipa: "/ˈɡriːn.haʊs/", vi: "nhà kính" },
      { word: "green HOUSE", ipa: "/ɡriːn ˈhaʊs/", vi: "ngôi nhà màu xanh" },
      { word: "WHITE House", ipa: "/ˈwaɪt haʊs/", vi: "Nhà Trắng (US)" },
      { word: "white HOUSE", ipa: "/waɪt ˈhaʊs/", vi: "ngôi nhà màu trắng" },
    ],
    commonMistakeVi:
      "Người Việt hay nói 'black BOARD' khi chỉ vào bảng học - nghe như 'tấm ván đen', không phải bảng học.",
    teacherTip: "Test: can you replace with a single word? 'BLACKboard' = chalkboard. If yes → it's a compound, stress first.",
    teacherTipVi: "Mẹo: có thể thay bằng 1 từ không? 'BLACKboard' = chalkboard. Có → ghép, trọng âm trước.",
    practiceSentences: [
      { en: "The teacher writes on the BLACKboard.", vi: "Cô giáo viết trên bảng đen." },
      { en: "Vegetables grow well in a GREENhouse.", vi: "Rau mọc tốt trong nhà kính." },
      { en: "The president lives in the WHITE House.", vi: "Tổng thống sống trong Nhà Trắng." },
    ],
    quiz: [
      {
        question: "'I bought a new SWIMMING pool.' Stress on?",
        questionVi: "'I bought a new SWIMMING pool.' Trọng âm ở?",
        options: ["SWIMMING", "pool"],
        answer: 0,
        explanation: "Compound noun → stress on first part.",
        explanationVi: "Danh từ ghép → trọng âm phần đầu.",
      },
      {
        question: "Adj + noun phrase stresses which part?",
        questionVi: "Cụm tính từ + danh từ trọng âm ở phần nào?",
        options: ["First (adj)", "Second (noun)"],
        answer: 1,
        explanation: "Stress goes on the noun.",
        explanationVi: "Trọng âm rơi vào danh từ.",
      },
      {
        question: "Listen: did you hear a compound or a phrase?",
        questionVi: "Nghe: từ ghép hay cụm tính từ?",
        options: ["GREENhouse (compound)", "green HOUSE (phrase)"],
        answer: 0,
        explanation: "Stress on GREEN → compound noun.",
        explanationVi: "Trọng âm GREEN → danh từ ghép.",
        audioWord: "greenhouse",
      },
    ],
  },
  {
    id: "ws-stress-listening",
    moduleId: "word-stress",
    order: 6,
    title: "Stress for Listening: Why Bad Stress = Bad Listening",
    titleVi: "Trọng Âm Cho Nghe: Tại Sao Sai Trọng Âm = Nghe Kém",
    emoji: "👂",
    duration: "10 min",
    difficulty: "Intermediate",
    introduction:
      "When you say a word with wrong stress, native speakers may not understand you. Worse, when YOU listen, you focus on the wrong syllables and miss meaning.",
    introductionVi:
      "Khi nói sai trọng âm, người bản xứ có thể không hiểu. Tệ hơn, khi NGHE, bạn tập trung sai âm tiết và bỏ lỡ nghĩa.",
    howTo: [
      { step: "Native speakers RECOGNIZE words by their stress pattern, not just sounds.", stepVi: "Người bản xứ NHẬN BIẾT từ qua mẫu trọng âm, không chỉ qua âm." },
      { step: "Train your ear: listen for the LOUDER, HIGHER syllable in every word.", stepVi: "Luyện tai: nghe âm tiết TO HƠN, CAO HƠN trong mỗi từ." },
      { step: "When mimicking native speech, exaggerate the stress at first - then relax.", stepVi: "Khi nhái giọng bản xứ, hãy phóng đại trọng âm lúc đầu - rồi giảm dần." },
    ],
    examples: [
      { word: "ˈcomfortable", ipa: "/ˈkʌm.fə.tə.bəl/", vi: "trọng âm âm tiết 1" },
      { word: "comˈfortable (sai)", ipa: "(common Vietnamese error)", vi: "lỗi phổ biến" },
      { word: "deˈvelopment", ipa: "/dɪˈvel.əp.mənt/", vi: "trọng âm âm tiết 2" },
      { word: "ˌeconˈomic", ipa: "/ˌiː.kəˈnɒm.ɪk/", vi: "trọng âm trước -ic" },
    ],
    commonMistakeVi:
      "Đặt sai trọng âm khiến người bản xứ phải đoán nghĩa - họ thường giả vờ hiểu rồi đi tiếp.",
    teacherTip: "When learning a new word, write it phonetically with the stress mark - never learn spelling alone.",
    teacherTipVi: "Khi học từ mới, viết phiên âm + dấu trọng âm - đừng chỉ học chính tả.",
    practiceSentences: [
      { en: "ˈComfortable furniture aids deˈvelopment of ˌeconˈomic activity.", vi: "Đồ nội thất thoải mái hỗ trợ phát triển hoạt động kinh tế." },
    ],
    quiz: [
      {
        question: "Native speakers identify words mainly by:",
        questionVi: "Người bản xứ nhận diện từ chủ yếu qua:",
        options: ["spelling", "stress pattern + sounds", "speed", "context only"],
        answer: 1,
        explanation: "Stress pattern is a key recognition cue.",
        explanationVi: "Mẫu trọng âm là tín hiệu nhận diện then chốt.",
      },
      {
        question: "Where is the primary stress in 'comfortable'?",
        questionVi: "Trọng âm chính của 'comfortable' ở đâu?",
        options: ["COM-", "-FOR-", "-TA-", "-BLE"],
        answer: 0,
        explanation: "/ˈkʌm.fə.tə.bəl/ - first syllable.",
        explanationVi: "/ˈkʌm.fə.tə.bəl/ - âm tiết đầu.",
        audioWord: "comfortable",
      },
      {
        question: "Best way to learn stress:",
        questionVi: "Cách tốt nhất để học trọng âm:",
        options: [
          "Read silently",
          "Write phonetics + stress mark + speak aloud",
          "Translate to Vietnamese",
          "Listen once",
        ],
        answer: 1,
        explanation: "Multi-sensory learning works best.",
        explanationVi: "Học đa giác quan hiệu quả nhất.",
      },
    ],
  },
];

// =====================================================================
// MODULE 3 - SENTENCE STRESS & RHYTHM (6 lessons)
// =====================================================================
const sentenceStressLessons: PronLesson[] = [
  {
    id: "ss-content-vs-function",
    moduleId: "sentence-stress",
    order: 1,
    title: "Content vs Function Words",
    titleVi: "Từ Nội Dung vs Từ Chức Năng",
    emoji: "🔑",
    duration: "13 min",
    difficulty: "Elementary",
    introduction:
      "English stresses CONTENT WORDS (carry meaning) and reduces FUNCTION WORDS (grammatical glue). This is the #1 secret to sounding native.",
    introductionVi:
      "Tiếng Anh nhấn TỪ NỘI DUNG (mang nghĩa) và giảm TỪ CHỨC NĂNG (kết nối ngữ pháp). Đây là bí quyết số 1 để nói như bản xứ.",
    howTo: [
      { step: "Content words (STRESS): nouns, main verbs, adjectives, adverbs, question words, negatives.", stepVi: "Từ nội dung (NHẤN): danh từ, động từ chính, tính từ, trạng từ, từ để hỏi, phủ định." },
      { step: "Function words (REDUCE): articles, pronouns, prepositions, auxiliaries, conjunctions, 'to be'.", stepVi: "Từ chức năng (GIẢM): mạo từ, đại từ, giới từ, trợ động từ, liên từ, 'to be'." },
      { step: "Reduce function words to /ə/ schwa: 'to' → /tə/, 'for' → /fə/, 'and' → /ən/.", stepVi: "Giảm từ chức năng thành /ə/: 'to' → /tə/, 'for' → /fə/, 'and' → /ən/." },
    ],
    examples: [
      { word: "I'm GOing to the STORE.", ipa: "/aɪm ˈɡəʊ.ɪŋ tə ðə ˈstɔː/", vi: "Tôi đang đi cửa hàng. (chỉ GO + STORE nổi bật)" },
      { word: "She WANTS to BUY a CAR.", ipa: "/ʃi ˈwɒnts tə ˈbaɪ ə ˈkɑː/", vi: "Cô ấy muốn mua xe. (WANTS, BUY, CAR nổi bật)" },
      { word: "WHAT ARE you DOing?", ipa: "/ˈwɒt ə ju ˈduː.ɪŋ/", vi: "Bạn đang làm gì? (WHAT, DOing nổi bật)" },
    ],
    commonMistakeVi:
      "Người Việt nhấn đều mọi từ → nghe như đang đọc danh sách, không có nhịp điệu.",
    teacherTip: "Tap a desk on each content word as you speak - it forces a natural rhythm.",
    teacherTipVi: "Gõ bàn theo mỗi từ nội dung khi nói - buộc nhịp điệu tự nhiên.",
    practiceSentences: [
      { en: "I WANT to GO to the BEACH on SUNday.", vi: "Tôi muốn đi biển vào Chủ Nhật." },
      { en: "She CAN'T COME beCAUSE she's BUsy.", vi: "Cô ấy không đến được vì bận." },
      { en: "We've BEEN WAITing for an HOUR.", vi: "Chúng tôi đã chờ một tiếng rồi." },
    ],
    quiz: [
      {
        question: "Which is NOT a content word?",
        questionVi: "Loại từ nào KHÔNG phải từ nội dung?",
        options: ["main verb", "noun", "preposition", "adjective"],
        answer: 2,
        explanation: "Prepositions are function words → reduced.",
        explanationVi: "Giới từ là từ chức năng → giảm.",
      },
      {
        question: "How is 'to' pronounced in normal speech?",
        questionVi: "'to' phát âm thế nào trong câu nói thường?",
        options: ["/tuː/ always", "/tə/ (schwa) when unstressed", "/dɔː/", "silent"],
        answer: 1,
        explanation: "Reduced to /tə/ when not stressed.",
        explanationVi: "Giảm thành /tə/ khi không nhấn.",
      },
      {
        question: "Which words should be STRESSED in: 'I want to buy a new book.'?",
        questionVi: "Từ nào NÊN NHẤN trong: 'I want to buy a new book.'?",
        options: [
          "I, to, a",
          "want, buy, new, book",
          "all words equally",
          "only 'book'",
        ],
        answer: 1,
        explanation: "Content words: WANT, BUY, NEW, BOOK.",
        explanationVi: "Từ nội dung: WANT, BUY, NEW, BOOK.",
      },
    ],
  },
  {
    id: "ss-stress-timed",
    moduleId: "sentence-stress",
    order: 2,
    title: "Stress-Timed Rhythm",
    titleVi: "Nhịp Điệu Tiếng Anh - Stress-Timed",
    emoji: "⏱️",
    duration: "12 min",
    difficulty: "Intermediate",
    introduction:
      "English is STRESS-TIMED: stressed syllables occur at roughly EQUAL intervals, regardless of how many unstressed syllables are between them. Vietnamese is SYLLABLE-TIMED (every syllable equal). This is the BIGGEST difference!",
    introductionVi:
      "Tiếng Anh là STRESS-TIMED: các âm tiết nhấn xuất hiện cách đều nhau về thời gian, BẤT KỂ có bao nhiêu âm tiết yếu ở giữa. Tiếng Việt là SYLLABLE-TIMED (mỗi âm tiết đều). Đây là khác biệt LỚN NHẤT!",
    howTo: [
      { step: "Mark stressed words with a tap. Try to keep your taps EVEN.", stepVi: "Gõ tay theo từ nhấn. Cố gắng giữ nhịp ĐỀU." },
      { step: "Squeeze unstressed words to fit the time between taps.", stepVi: "Nén từ không nhấn cho vừa khoảng giữa các nhịp gõ." },
      { step: "More unstressed words = faster squeeze. Few = leisurely.", stepVi: "Nhiều từ yếu = nén nhanh. Ít = thong thả." },
    ],
    examples: [
      { word: "DOGS CHASE CATS.", ipa: "(3 stresses, equal beats)", vi: "3 nhịp đều" },
      { word: "The DOGS will CHASE the CATS.", ipa: "(same 3 beats, fillers squeezed)", vi: "vẫn 3 nhịp, từ phụ nén" },
      { word: "The DOGS will have been CHAsing the CATS.", ipa: "(still ~3 beats!)", vi: "vẫn ~3 nhịp!" },
    ],
    commonMistakeVi:
      "Người Việt nói tiếng Anh đều như tiếng Việt → mất hoàn toàn nhạc điệu, người bản xứ khó hiểu.",
    teacherTip: "Use a metronome at 60 BPM. Place stressed words on the click. Squeeze the rest in between.",
    teacherTipVi: "Dùng metronome 60 BPM. Đặt từ nhấn đúng nhịp gõ. Nén phần còn lại vào giữa.",
    practiceSentences: [
      { en: "BIRDS FLY SOUTH.", vi: "Chim bay về Nam. (3 nhịp)" },
      { en: "The BIRDS are FLying SOUTH.", vi: "(vẫn 3 nhịp)" },
      { en: "The BIRDS will be FLying to the SOUTH.", vi: "(vẫn ~3 nhịp)" },
    ],
    quiz: [
      {
        question: "English is __________ timed.",
        questionVi: "Tiếng Anh có nhịp __________ timed.",
        options: ["syllable", "stress", "vowel", "word"],
        answer: 1,
        explanation: "Stress-timed: stressed syllables at even intervals.",
        explanationVi: "Stress-timed: âm tiết nhấn cách đều.",
      },
      {
        question: "Vietnamese is __________ timed.",
        questionVi: "Tiếng Việt có nhịp __________ timed.",
        options: ["syllable", "stress", "phrase"],
        answer: 0,
        explanation: "Each syllable gets roughly equal time.",
        explanationVi: "Mỗi âm tiết có thời gian gần bằng nhau.",
      },
      {
        question: "Why must function words be reduced?",
        questionVi: "Tại sao từ chức năng phải bị giảm?",
        options: [
          "To save time",
          "To maintain even stress timing",
          "Because they're unimportant",
          "It's a regional preference",
        ],
        answer: 1,
        explanation: "Squeezing fillers keeps stress beats even.",
        explanationVi: "Nén từ phụ giữ nhịp nhấn đều.",
      },
    ],
  },
  {
    id: "ss-emphatic-stress",
    moduleId: "sentence-stress",
    order: 3,
    title: "Emphatic Stress - Changing Meaning by Stress",
    titleVi: "Trọng Âm Nhấn Mạnh - Thay Đổi Ý Bằng Trọng Âm",
    emoji: "❗",
    duration: "12 min",
    difficulty: "Intermediate",
    introduction:
      "By stressing a different word, you completely change the meaning. This is called EMPHATIC or CONTRASTIVE stress.",
    introductionVi:
      "Bằng cách nhấn một từ khác, bạn thay đổi hoàn toàn ý nghĩa. Đây gọi là trọng âm NHẤN MẠNH hoặc TƯƠNG PHẢN.",
    howTo: [
      { step: "Identify the contrast you want to highlight.", stepVi: "Xác định sự tương phản muốn nhấn." },
      { step: "Stress that word LOUDER and HIGHER than normal content words.", stepVi: "Nhấn từ đó TO HƠN và CAO HƠN bình thường." },
      { step: "Reduce other words even more than usual.", stepVi: "Giảm các từ khác mạnh hơn bình thường." },
    ],
    examples: [
      { word: "*I* didn't say he stole it. (someone else said it)", ipa: "Stress: I", vi: "Tôi không nói (người khác nói)" },
      { word: "I didn't *SAY* he stole it. (I implied it)", ipa: "Stress: SAY", vi: "Tôi không NÓI (tôi ám chỉ thôi)" },
      { word: "I didn't say *HE* stole it. (someone else stole)", ipa: "Stress: HE", vi: "Tôi không nói ANH ẤY (ai khác)" },
      { word: "I didn't say he *STOLE* it. (he borrowed it)", ipa: "Stress: STOLE", vi: "Không phải ăn cắp (mượn)" },
      { word: "I didn't say he stole *IT*. (stole something else)", ipa: "Stress: IT", vi: "Không phải vật đó" },
    ],
    commonMistakeVi:
      "Người Việt thường nhấn đều, làm mất khả năng truyền đạt sắc thái và ngụ ý.",
    teacherTip: "Practice the same sentence 5 times, stressing a different word each time. Listen for meaning changes.",
    teacherTipVi: "Luyện cùng 1 câu 5 lần, mỗi lần nhấn 1 từ khác nhau. Nghe sự thay đổi ý.",
    practiceSentences: [
      { en: "*JOHN* called Mary yesterday. (not Tom)", vi: "JOHN gọi Mary (không phải Tom)" },
      { en: "John *CALLED* Mary yesterday. (didn't text)", vi: "John GỌI Mary (không nhắn tin)" },
      { en: "John called *MARY* yesterday. (not Susan)", vi: "John gọi MARY (không phải Susan)" },
      { en: "John called Mary *YESTERday*. (not today)", vi: "John gọi Mary HÔM QUA (không phải hôm nay)" },
    ],
    quiz: [
      {
        question: "'I didn't see HER' - what does the stress on HER imply?",
        questionVi: "'I didn't see HER' - nhấn HER ngụ ý gì?",
        options: ["I saw her", "I saw someone else", "I didn't see at all", "I'm angry"],
        answer: 1,
        explanation: "Contrastive stress on HER → 'I saw someone else, not her.'",
        explanationVi: "Nhấn HER → 'tôi thấy người khác, không phải cô ấy.'",
      },
      {
        question: "Emphatic stress is used to:",
        questionVi: "Trọng âm nhấn mạnh dùng để:",
        options: [
          "speak louder",
          "highlight contrast or new info",
          "show anger",
          "speak slower",
        ],
        answer: 1,
        explanation: "Highlights contrast or new information.",
        explanationVi: "Làm nổi tương phản hoặc thông tin mới.",
      },
    ],
  },
  {
    id: "ss-thought-groups",
    moduleId: "sentence-stress",
    order: 4,
    title: "Thought Groups & Pausing",
    titleVi: "Nhóm Ý & Cách Ngắt Câu",
    emoji: "✂️",
    duration: "11 min",
    difficulty: "Intermediate",
    introduction:
      "Long sentences are spoken in short 'thought groups' (3-7 words) with brief pauses between. Pausing wisely makes you sound thoughtful, not robotic.",
    introductionVi:
      "Câu dài được nói thành các 'nhóm ý' ngắn (3-7 từ) với khoảng nghỉ ngắn giữa. Ngắt đúng chỗ làm bạn nghe điềm tĩnh, không cứng.",
    howTo: [
      { step: "Group words by meaning: subject + verb, prepositional phrases, clauses.", stepVi: "Nhóm từ theo nghĩa: chủ+vị, cụm giới từ, mệnh đề." },
      { step: "Pause briefly (~0.3s) between groups. Don't pause within a group!", stepVi: "Nghỉ ngắn (~0.3s) giữa nhóm. KHÔNG nghỉ giữa nhóm!" },
      { step: "The last stressed word in a group usually has a slight tone change.", stepVi: "Từ nhấn cuối nhóm thường có thay đổi giọng nhẹ." },
    ],
    examples: [
      { word: "When I got home, // I was so tired // that I fell asleep // immediately.", ipa: "(4 thought groups)", vi: "(4 nhóm ý)" },
      { word: "The man with the red hat // who lives next door // is a doctor.", ipa: "(3 thought groups)", vi: "(3 nhóm ý)" },
    ],
    commonMistakeVi:
      "Người học hay đọc liền tù tì hoặc ngắt sai chỗ (giữa danh từ và mạo từ), làm rối nghĩa.",
    teacherTip: "Mark scripts with // before reading aloud. Practice slow, then natural speed.",
    teacherTipVi: "Đánh dấu // trên kịch bản trước khi đọc thành tiếng. Luyện chậm rồi tăng tốc.",
    practiceSentences: [
      { en: "Yesterday, // I went to the park // with my friends // and we played football.", vi: "Hôm qua tôi đi công viên với bạn và chơi bóng." },
      { en: "If you study hard, // you will pass the exam // and make your parents proud.", vi: "Nếu chăm học, bạn sẽ qua kỳ thi và làm bố mẹ tự hào." },
    ],
    quiz: [
      {
        question: "How long should a thought group typically be?",
        questionVi: "Một nhóm ý thường dài bao nhiêu?",
        options: ["1-2 words", "3-7 words", "10+ words", "1 sentence"],
        answer: 1,
        explanation: "3-7 words is natural for English thought groups.",
        explanationVi: "3-7 từ là độ dài tự nhiên.",
      },
      {
        question: "Where should you NOT pause?",
        questionVi: "Bạn KHÔNG nên ngắt ở đâu?",
        options: [
          "Between clauses",
          "Between an article and noun (e.g. 'the // dog')",
          "After a comma",
          "Between thought groups",
        ],
        answer: 1,
        explanation: "Don't break grammatical units like article+noun.",
        explanationVi: "Đừng tách đơn vị ngữ pháp như mạo từ + danh từ.",
      },
      {
        question: "Pauses should be approximately:",
        questionVi: "Khoảng nghỉ nên dài khoảng:",
        options: ["~0.1 sec", "~0.3 sec", "~1 sec", "~2 sec"],
        answer: 1,
        explanation: "Brief pauses (~0.3s) feel natural.",
        explanationVi: "Nghỉ ngắn (~0.3s) tự nhiên.",
      },
    ],
  },
  {
    id: "ss-reduced-forms",
    moduleId: "sentence-stress",
    order: 5,
    title: "Reduced Forms: gonna, wanna, gotta, hafta",
    titleVi: "Dạng Rút Gọn Trong Nói: gonna, wanna, gotta, hafta",
    emoji: "🤝",
    duration: "11 min",
    difficulty: "Intermediate",
    introduction:
      "Native speakers reduce common phrases when speaking fast. These forms are essential for LISTENING (you'll hear them everywhere) and casual SPEAKING.",
    introductionVi:
      "Người bản xứ rút gọn các cụm thông dụng khi nói nhanh. Cần thiết cho NGHE (bạn sẽ nghe thấy khắp nơi) và NÓI thông thường.",
    howTo: [
      { step: "Use reduced forms in CASUAL speech, not in formal writing.", stepVi: "Dùng dạng rút gọn trong nói THÔNG THƯỜNG, không trong viết trang trọng." },
      { step: "Practice listening - these forms are unmistakable signs of native fluency.", stepVi: "Luyện nghe - đây là dấu hiệu rõ rệt của lưu loát bản xứ." },
      { step: "Don't over-pronounce 'going to' as /ˈɡəʊ.ɪŋ tuː/ - it sounds robotic.", stepVi: "Đừng phát quá rõ 'going to' thành /ˈɡəʊ.ɪŋ tuː/ - nghe máy móc." },
    ],
    examples: [
      { word: "going to → gonna", ipa: "/ˈɡʌn.ə/", vi: "I'm gonna leave." },
      { word: "want to → wanna", ipa: "/ˈwɒn.ə/", vi: "I wanna eat." },
      { word: "got to → gotta", ipa: "/ˈɡɒt.ə/", vi: "I gotta go." },
      { word: "have to → hafta", ipa: "/ˈhæf.tə/", vi: "I hafta study." },
      { word: "kind of → kinda", ipa: "/ˈkaɪn.də/", vi: "I'm kinda tired." },
      { word: "lots of → lotsa", ipa: "/ˈlɒt.sə/", vi: "I have lotsa time." },
    ],
    commonMistakeVi:
      "Người học chỉ học dạng đầy đủ → khi nghe người bản xứ nói /ˈɡʌn.ə/ thì không hiểu.",
    teacherTip: "Watch native YouTube videos with subtitles. Spot reduced forms - you'll see/hear them constantly.",
    teacherTipVi: "Xem YouTube bản xứ có phụ đề. Tìm dạng rút gọn - bạn sẽ thấy/nghe liên tục.",
    practiceSentences: [
      { en: "I'm gonna call you later. I gotta finish this first.", vi: "Tôi sẽ gọi bạn sau. Phải xong việc này đã." },
      { en: "Do you wanna grab a coffee?", vi: "Bạn muốn đi cà phê không?" },
      { en: "I hafta admit, that's kinda funny.", vi: "Phải thừa nhận, hơi buồn cười." },
    ],
    quiz: [
      {
        question: "'I wanna go.' is the reduced form of:",
        questionVi: "'I wanna go.' là dạng rút gọn của:",
        options: ["I want to go", "I went to go", "I won't go", "I am going"],
        answer: 0,
        explanation: "wanna = want to.",
        explanationVi: "wanna = want to.",
      },
      {
        question: "When should you AVOID reduced forms?",
        questionVi: "Khi nào nên TRÁNH dạng rút gọn?",
        options: [
          "Casual chat with friends",
          "Texting",
          "Formal writing / academic essays",
          "Watching movies",
        ],
        answer: 2,
        explanation: "Avoid in formal writing - use full forms.",
        explanationVi: "Tránh trong viết trang trọng - dùng dạng đầy đủ.",
      },
      {
        question: "Listen: what does the speaker say?",
        questionVi: "Nghe: người nói nói gì?",
        options: ["I want to go", "I'm gonna go", "I went to go", "I won't go"],
        answer: 1,
        explanation: "'gonna' = going to.",
        explanationVi: "'gonna' = going to.",
        audioWord: "I'm gonna go",
      },
    ],
  },
  {
    id: "ss-rhythm-drills",
    moduleId: "sentence-stress",
    order: 6,
    title: "Rhythm Drills - Build Native Flow",
    titleVi: "Bài Tập Nhịp - Xây Dựng Dòng Chảy Bản Xứ",
    emoji: "🎼",
    duration: "15 min",
    difficulty: "Upper-Intermediate",
    introduction:
      "Like learning music, rhythm requires daily drilling. These classic patterns from English literature and speech help train your mouth and ear together.",
    introductionVi:
      "Như học nhạc, nhịp điệu cần luyện hằng ngày. Các mẫu cổ điển từ văn học và đời thường giúp luyện cả miệng lẫn tai.",
    howTo: [
      { step: "Listen to a native pronouncing the line. Tap the stresses.", stepVi: "Nghe người bản xứ phát âm. Gõ theo trọng âm." },
      { step: "Repeat 5x slow, 5x fast. Match the rhythm exactly.", stepVi: "Nhái lại 5 lần chậm, 5 lần nhanh. Bám nhịp y hệt." },
      { step: "Record yourself. Compare to the model. Adjust.", stepVi: "Ghi âm bản thân. So với mẫu. Điều chỉnh." },
    ],
    examples: [
      { word: "PEter PIper PICKED a PECK of PICKled PEPpers.", ipa: "(6 stresses, even beats)", vi: "câu tongue twister" },
      { word: "The RAIN in SPAIN falls MAINly on the PLAIN.", ipa: "(4 stresses)", vi: "(My Fair Lady)" },
      { word: "TO be, or NOT to BE, that IS the QUEStion.", ipa: "(5 stresses)", vi: "Shakespeare" },
    ],
    commonMistakeVi:
      "Học viên hay luyện riêng từng từ rồi ghép lại - kết quả mất nhịp. Hãy luyện cả CỤM ngay từ đầu.",
    teacherTip: "Use shadowing: listen to a 30-second native clip, then immediately repeat over and over until your rhythm matches.",
    teacherTipVi: "Dùng shadowing: nghe đoạn bản xứ 30 giây, lặp lại ngay liên tục cho đến khi nhịp khớp.",
    practiceSentences: [
      { en: "ONCE upon a TIME, in a LAND far aWAY.", vi: "Ngày xửa ngày xưa, ở vùng đất xa xôi." },
      { en: "IF at FIRST you DON'T sucCEED, TRY, TRY aGAIN.", vi: "Nếu lần đầu chưa thành công, hãy thử lại." },
      { en: "EARly to BED and EARly to RISE makes a MAN HEALthy, WEALthy, and WISE.", vi: "Đi ngủ sớm dậy sớm khiến người khỏe, giàu và khôn." },
    ],
    quiz: [
      {
        question: "What is 'shadowing'?",
        questionVi: "'Shadowing' là gì?",
        options: [
          "Translating to native language",
          "Repeating immediately after a native model",
          "Reading from a book",
          "Speaking in front of a mirror",
        ],
        answer: 1,
        explanation: "Shadowing = listen + immediately repeat in real time.",
        explanationVi: "Shadowing = nghe + lặp lại ngay theo thời gian thực.",
      },
      {
        question: "Best frequency for rhythm drills:",
        questionVi: "Tần suất luyện nhịp tốt nhất:",
        options: ["Once a week", "Once a month", "Daily, 5-10 min", "Only before exams"],
        answer: 2,
        explanation: "Like music - daily short practice beats weekly long sessions.",
        explanationVi: "Giống học nhạc - mỗi ngày một chút hơn ít buổi dài.",
      },
      {
        question: "Drilling helps because:",
        questionVi: "Luyện tập có ích vì:",
        options: [
          "It memorizes vocabulary",
          "It trains muscle memory of mouth + ear",
          "It improves spelling",
          "It is fun",
        ],
        answer: 1,
        explanation: "Builds muscle memory, the foundation of fluent speech.",
        explanationVi: "Xây dựng trí nhớ cơ - nền tảng của lưu loát.",
      },
    ],
  },
];

// =====================================================================
// MODULE 4 - INTONATION & CONNECTED SPEECH (6 lessons)
// =====================================================================
const intonationLessons: PronLesson[] = [
  {
    id: "in-rising-falling",
    moduleId: "intonation",
    order: 1,
    title: "Rising vs Falling Intonation",
    titleVi: "Ngữ Điệu Lên vs Xuống",
    emoji: "📈📉",
    duration: "13 min",
    difficulty: "Elementary",
    introduction:
      "Intonation is the music of the voice. RISING tones signal questions, uncertainty, or 'more to come'. FALLING tones signal completion, certainty, or statements.",
    introductionVi:
      "Ngữ điệu là 'âm nhạc' của giọng nói. Tone LÊN báo hiệu câu hỏi, không chắc chắn, hoặc 'còn nữa'. Tone XUỐNG báo hiệu hoàn thành, chắc chắn, câu khẳng định.",
    howTo: [
      { step: "Statements / commands / WH-questions → FALLING tone at end.", stepVi: "Câu khẳng định / mệnh lệnh / câu hỏi WH → XUỐNG cuối câu." },
      { step: "Yes/No questions → RISING tone at end.", stepVi: "Câu hỏi Yes/No → LÊN cuối câu." },
      { step: "Lists → rising on each item, falling on the last.", stepVi: "Liệt kê → lên ở mỗi mục, xuống ở mục cuối." },
    ],
    examples: [
      { word: "I'm tired. ↘", ipa: "(falling - statement)", vi: "Tôi mệt. (xuống)" },
      { word: "Are you tired? ↗", ipa: "(rising - yes/no question)", vi: "Bạn mệt à? (lên)" },
      { word: "Where are you going? ↘", ipa: "(falling - WH question)", vi: "Bạn đi đâu? (xuống)" },
      { word: "I bought apples ↗, oranges ↗, and bananas. ↘", ipa: "(list)", vi: "Tôi mua táo↗, cam↗, và chuối.↘" },
    ],
    commonMistakeVi:
      "Người Việt hay nói câu khẳng định với tone LÊN (do thói quen tiếng Việt) → nghe như đang hỏi.",
    teacherTip: "Move your hand up/down as you speak - physical gesture reinforces tone awareness.",
    teacherTipVi: "Vẫy tay lên/xuống khi nói - cử chỉ vật lý giúp ý thức tone.",
    practiceSentences: [
      { en: "I love coffee. ↘", vi: "Tôi thích cà phê. (xuống)" },
      { en: "Do you love coffee? ↗", vi: "Bạn thích cà phê không? (lên)" },
      { en: "What do you want? ↘", vi: "Bạn muốn gì? (xuống)" },
    ],
    quiz: [
      {
        question: "'Are you happy?' should end with:",
        questionVi: "'Are you happy?' nên kết thúc với:",
        options: ["rising tone ↗", "falling tone ↘", "flat tone"],
        answer: 0,
        explanation: "Yes/No question → rising.",
        explanationVi: "Câu hỏi Yes/No → lên.",
      },
      {
        question: "'What time is it?' should end with:",
        questionVi: "'What time is it?' nên kết thúc với:",
        options: ["rising ↗", "falling ↘", "rising-falling"],
        answer: 1,
        explanation: "WH-questions normally fall.",
        explanationVi: "Câu hỏi WH thường xuống.",
      },
      {
        question: "Listen: is it a question or statement?",
        questionVi: "Nghe: câu hỏi hay câu khẳng định?",
        options: ["Question (rising)", "Statement (falling)"],
        answer: 0,
        explanation: "Rising tone → question.",
        explanationVi: "Tone lên → câu hỏi.",
        audioWord: "Are you ready",
      },
    ],
  },
  {
    id: "in-linking",
    moduleId: "intonation",
    order: 2,
    title: "Linking Sounds (Liaison)",
    titleVi: "Nối Âm (Liaison)",
    emoji: "🔗",
    duration: "14 min",
    difficulty: "Intermediate",
    introduction:
      "Native speakers connect words smoothly. The end of one word joins with the beginning of the next. This is why English sounds 'fast' - but it's just LINKED.",
    introductionVi:
      "Người bản xứ nối từ mượt mà. Âm cuối từ này nối với âm đầu từ sau. Đây là lý do tiếng Anh nghe 'nhanh' - thực ra chỉ là NỐI.",
    howTo: [
      { step: "Consonant + Vowel → link directly: 'an apple' → /ə.ˈnæp.əl/.", stepVi: "Phụ âm + Nguyên âm → nối trực tiếp: 'an apple' → /ə.ˈnæp.əl/." },
      { step: "Vowel + Vowel → insert /j/ or /w/ glide: 'go on' → /ɡəʊ.wɒn/.", stepVi: "Nguyên âm + Nguyên âm → chèn /j/ hoặc /w/: 'go on' → /ɡəʊ.wɒn/." },
      { step: "Same consonant + Same consonant → hold once, don't repeat: 'big game' → /bɪɡːeɪm/.", stepVi: "Phụ âm + cùng phụ âm → giữ một lần, không lặp: 'big game' → /bɪɡːeɪm/." },
    ],
    examples: [
      { word: "an apple", ipa: "/ə.ˈnæp.əl/", vi: "nối /n/-/æ/" },
      { word: "look out", ipa: "/lʊ.ˈkaʊt/", vi: "nối /k/-/aʊ/" },
      { word: "go away", ipa: "/ɡəʊ.wəˈweɪ/", vi: "chèn /w/" },
      { word: "I am", ipa: "/aɪ.jæm/", vi: "chèn /j/" },
      { word: "stop pushing", ipa: "/stɒpːʊʃɪŋ/", vi: "/p/+/p/ giữ một lần" },
    ],
    commonMistakeVi:
      "Người Việt phát âm rời rạc từng từ → nghe như đọc danh sách. Thiếu sự nối làm mất 'chất' bản xứ.",
    teacherTip: "Mark linking with curves under your script: 'an‿apple', 'look‿out'. Read aloud following the curves.",
    teacherTipVi: "Đánh dấu nối bằng dấu cung bên dưới: 'an‿apple', 'look‿out'. Đọc theo dấu cung.",
    practiceSentences: [
      { en: "Look‿at‿it.", vi: "Nhìn nó kìa." },
      { en: "I‿am‿an‿artist.", vi: "Tôi là một nghệ sĩ." },
      { en: "Take‿it‿easy.", vi: "Bình tĩnh nào." },
      { en: "Get‿out‿of‿here.", vi: "Đi khỏi đây." },
    ],
    quiz: [
      {
        question: "How is 'turn it off' linked?",
        questionVi: "'turn it off' nối thế nào?",
        options: [
          "/tɜːn ɪt ɒf/ (no link)",
          "/tɜː.nɪ.tɒf/ (consonants link to vowels)",
          "/tɜːn.tɒf/ (delete 'it')",
        ],
        answer: 1,
        explanation: "n→i, t→o all link: /tɜː.nɪ.tɒf/.",
        explanationVi: "n→i, t→o đều nối: /tɜː.nɪ.tɒf/.",
      },
      {
        question: "When do you insert /w/?",
        questionVi: "Khi nào chèn /w/?",
        options: [
          "After /uː/ or /əʊ/ before another vowel",
          "After /iː/ before another vowel",
          "Between two consonants",
        ],
        answer: 0,
        explanation: "Round vowels (u, o) glide with /w/.",
        explanationVi: "Nguyên âm tròn (u, o) trượt với /w/.",
      },
      {
        question: "Listen: what's being said?",
        questionVi: "Nghe: nói gì?",
        options: ["I notice", "I'm not sure", "An ice", "An eyes"],
        answer: 0,
        explanation: "Linked: 'I‿notice'.",
        explanationVi: "Nối: 'I‿notice'.",
        audioWord: "I notice",
      },
    ],
  },
  {
    id: "in-weak-forms",
    moduleId: "intonation",
    order: 3,
    title: "Weak Forms & Schwa /ə/",
    titleVi: "Dạng Yếu & Âm Schwa /ə/",
    emoji: "ə",
    duration: "13 min",
    difficulty: "Intermediate",
    introduction:
      "Schwa /ə/ is the most common vowel in English - used in nearly every unstressed syllable and in 'weak forms' of common function words.",
    introductionVi:
      "Schwa /ə/ là nguyên âm phổ biến nhất tiếng Anh - dùng ở gần như mọi âm tiết không nhấn và trong 'dạng yếu' của từ chức năng.",
    howTo: [
      { step: "Schwa = neutral, relaxed mouth. Like a tired sigh.", stepVi: "Schwa = miệng trung tính, thả lỏng. Như tiếng thở dài mệt mỏi." },
      { step: "Common weak forms: a /ə/, the /ðə/, of /əv/, for /fə/, to /tə/, and /ən/, can /kən/, was /wəz/.", stepVi: "Dạng yếu phổ biến: a /ə/, the /ðə/, of /əv/, for /fə/, to /tə/, and /ən/, can /kən/, was /wəz/." },
      { step: "Strong forms only used when the word is STRESSED for emphasis.", stepVi: "Dạng mạnh chỉ dùng khi từ được NHẤN MẠNH." },
    ],
    examples: [
      { word: "a book", ipa: "/ə bʊk/", vi: "weak 'a'" },
      { word: "for me", ipa: "/fə mi/", vi: "weak 'for'" },
      { word: "fish and chips", ipa: "/fɪʃ ən tʃɪps/", vi: "weak 'and'" },
      { word: "I can swim", ipa: "/aɪ kən swɪm/", vi: "weak 'can'" },
      { word: "Yes, I CAN!", ipa: "/jes aɪ kæn/", vi: "strong 'can' (emphasis)" },
    ],
    commonMistakeVi:
      "Người Việt phát âm 'and' là /ænd/ luôn - nghe rất Việt. Trong câu nói thường, đó chỉ là /ən/.",
    teacherTip: "Underline every schwa in a paragraph. You'll be shocked how many there are. Then read aloud, emphasizing the relaxation.",
    teacherTipVi: "Gạch dưới mọi schwa trong đoạn văn. Bạn sẽ kinh ngạc vì số lượng. Sau đó đọc to, nhấn mạnh sự thả lỏng.",
    practiceSentences: [
      { en: "I went to the store for a loaf of bread and a bottle of milk.", vi: "Tôi đi cửa hàng mua một ổ bánh mì và một chai sữa." },
      { en: "She can come if she wants to.", vi: "Cô ấy có thể đến nếu muốn." },
    ],
    quiz: [
      {
        question: "What's the weak form of 'and'?",
        questionVi: "Dạng yếu của 'and'?",
        options: ["/ænd/", "/ən/", "/end/", "/ʌnd/"],
        answer: 1,
        explanation: "Reduced to /ən/ in connected speech.",
        explanationVi: "Giảm thành /ən/ trong câu nói nối.",
      },
      {
        question: "When use STRONG form of 'can' /kæn/?",
        questionVi: "Khi nào dùng dạng MẠNH của 'can' /kæn/?",
        options: [
          "Always",
          "Only when 'can' is emphasized (e.g. 'Yes, I CAN!')",
          "Only at end of sentence",
          "In writing",
        ],
        answer: 1,
        explanation: "Strong form for emphasis or end of utterance.",
        explanationVi: "Dạng mạnh khi nhấn hoặc cuối câu.",
      },
      {
        question: "Schwa is...",
        questionVi: "Schwa là...",
        options: [
          "A long vowel",
          "The most common vowel in English",
          "Always stressed",
          "A consonant",
        ],
        answer: 1,
        explanation: "Schwa /ə/ - most common vowel; appears in unstressed syllables.",
        explanationVi: "Schwa /ə/ - nguyên âm phổ biến nhất; ở âm tiết không nhấn.",
      },
    ],
  },
  {
    id: "in-elision-assimilation",
    moduleId: "intonation",
    order: 4,
    title: "Elision & Assimilation - Sound Changes in Speech",
    titleVi: "Nuốt Âm & Đồng Hóa - Biến Đổi Âm Khi Nói",
    emoji: "🌀",
    duration: "14 min",
    difficulty: "Upper-Intermediate",
    introduction:
      "ELISION = dropping sounds. ASSIMILATION = sounds changing to match neighbors. Both make speech faster and smoother - and harder for learners to recognize.",
    introductionVi:
      "ELISION = lược bỏ âm. ASSIMILATION = âm biến đổi theo âm kế bên. Cả hai làm câu nói nhanh và mượt - nhưng khó cho người học nhận ra.",
    howTo: [
      { step: "Elision: drop /t/ and /d/ between consonants. 'next day' → /neks deɪ/.", stepVi: "Elision: lược /t/, /d/ giữa các phụ âm. 'next day' → /neks deɪ/." },
      { step: "Assimilation: /n/ becomes /m/ before /p/ /b/ /m/. 'in Paris' → /ɪmˈpærɪs/.", stepVi: "Assimilation: /n/ thành /m/ trước /p/ /b/ /m/. 'in Paris' → /ɪmˈpærɪs/." },
      { step: "/t/ + /j/ → /tʃ/. 'meet you' → /miːtʃu/.", stepVi: "/t/ + /j/ → /tʃ/. 'meet you' → /miːtʃu/." },
      { step: "/d/ + /j/ → /dʒ/. 'did you' → /dɪdʒu/.", stepVi: "/d/ + /j/ → /dʒ/. 'did you' → /dɪdʒu/." },
    ],
    examples: [
      { word: "next day", ipa: "/neks deɪ/", vi: "lược /t/" },
      { word: "old man", ipa: "/əʊl mæn/", vi: "lược /d/" },
      { word: "ten boys", ipa: "/tem bɔɪz/", vi: "/n/ → /m/" },
      { word: "meet you", ipa: "/miːtʃu/", vi: "/t/ + /j/ = /tʃ/" },
      { word: "did you", ipa: "/dɪdʒu/", vi: "/d/ + /j/ = /dʒ/" },
      { word: "would you", ipa: "/wʊdʒu/", vi: "/d/ + /j/ = /dʒ/" },
    ],
    commonMistakeVi:
      "Người học cố phát âm rõ từng âm → câu nói nghe cứng và chậm. Người bản xứ nói nhanh nhờ elision/assimilation.",
    teacherTip: "Listen to news broadcasts at 1.0x and 1.25x speeds. Mark every elision/assimilation you can hear.",
    teacherTipVi: "Nghe bản tin tốc độ 1.0x rồi 1.25x. Đánh dấu mọi elision/assimilation nghe được.",
    practiceSentences: [
      { en: "I want you to meet you next door.", vi: "Tôi muốn bạn gặp bạn ở phòng kế." },
      { en: "Could you tell him the old man arrived?", vi: "Bạn nói anh ấy ông cụ đã tới được không?" },
    ],
    quiz: [
      {
        question: "'Did you eat?' commonly sounds like:",
        questionVi: "'Did you eat?' thường nghe như:",
        options: ["did-you-eat", "/dɪdʒu iːt/", "/did ju eat/", "/dɪtʃu eat/"],
        answer: 1,
        explanation: "/d/+/j/ → /dʒ/ → 'did you' = /dɪdʒu/.",
        explanationVi: "/d/+/j/ → /dʒ/ → 'did you' = /dɪdʒu/.",
      },
      {
        question: "Elision means...",
        questionVi: "Elision nghĩa là...",
        options: [
          "adding sounds",
          "dropping sounds",
          "changing sounds",
          "stressing sounds",
        ],
        answer: 1,
        explanation: "Elision = dropping sounds (often /t/, /d/, /h/, /ə/).",
        explanationVi: "Elision = lược bỏ âm (thường /t/, /d/, /h/, /ə/).",
      },
      {
        question: "'In Paris' assimilates to:",
        questionVi: "'In Paris' đồng hóa thành:",
        options: ["/ɪn pærɪs/", "/ɪm pærɪs/", "/ɪŋ pærɪs/"],
        answer: 1,
        explanation: "/n/ becomes /m/ before /p/.",
        explanationVi: "/n/ thành /m/ trước /p/.",
      },
    ],
  },
  {
    id: "in-tone-emotion",
    moduleId: "intonation",
    order: 5,
    title: "Tone for Emotion - Excited, Bored, Sarcastic, Polite",
    titleVi: "Tone Theo Cảm Xúc - Vui, Chán, Mỉa, Lịch Sự",
    emoji: "😊",
    duration: "12 min",
    difficulty: "Intermediate",
    introduction:
      "The same words can convey love, anger, sarcasm, or boredom - depending on tone. Mastering emotional intonation makes you a fluent communicator.",
    introductionVi:
      "Cùng câu nói có thể truyền tải yêu thương, giận dữ, mỉa mai, hoặc chán nản - tùy tone. Làm chủ ngữ điệu cảm xúc = giao tiếp lưu loát.",
    howTo: [
      { step: "Excited: HIGH pitch, fast, big rises ↗↗↗.", stepVi: "Vui: cao độ CAO, nhanh, lên nhiều ↗↗↗." },
      { step: "Bored: LOW pitch, slow, flat ____.", stepVi: "Chán: cao độ THẤP, chậm, phẳng ____." },
      { step: "Sarcastic: exaggerated rise then sudden fall ↗↘↘.", stepVi: "Mỉa mai: lên phóng đại rồi xuống đột ngột ↗↘↘." },
      { step: "Polite: medium pitch, gentle rises, soft endings.", stepVi: "Lịch sự: cao độ vừa, lên nhẹ, kết mềm." },
    ],
    examples: [
      { word: "'Great!' (excited)", ipa: "↗↗ HIGH", vi: "Tuyệt! (hứng khởi)" },
      { word: "'Great...' (bored)", ipa: "↘ LOW flat", vi: "Tuyệt... (chán)" },
      { word: "'Oh, GREAT.' (sarcastic)", ipa: "↗↘", vi: "Ồ tuyệt. (mỉa)" },
      { word: "'Could you please help?' (polite)", ipa: "gentle ↗", vi: "Bạn giúp được không? (lịch sự)" },
    ],
    commonMistakeVi:
      "Người học giữ cùng tone phẳng cho mọi cảm xúc → nghe lạnh hoặc thiếu chân thật.",
    teacherTip: "Watch a 1-min movie scene. Repeat each line, copying tone exactly. Don't worry about words - copy the music.",
    teacherTipVi: "Xem một cảnh phim 1 phút. Nhái lại từng câu, copy tone y hệt. Đừng lo từ - copy 'âm nhạc'.",
    practiceSentences: [
      { en: "Wow, that's amazing! (excited)", vi: "Wow, tuyệt thật! (vui)" },
      { en: "Yeah, sure, whatever. (bored/sarcastic)", vi: "Ờ, chuyện gì cũng được. (chán/mỉa)" },
      { en: "Excuse me, could I have a moment? (polite)", vi: "Xin lỗi, cho tôi xin chút thời gian? (lịch sự)" },
    ],
    quiz: [
      {
        question: "Sarcastic tone is usually:",
        questionVi: "Tone mỉa mai thường:",
        options: [
          "Flat and low",
          "High and excited",
          "Exaggerated rise then sudden fall",
          "Whispered",
        ],
        answer: 2,
        explanation: "Exaggerated rise + sudden fall signals sarcasm.",
        explanationVi: "Lên phóng đại + xuống đột ngột = mỉa.",
      },
      {
        question: "To sound polite when asking, use:",
        questionVi: "Để hỏi nghe lịch sự, dùng:",
        options: [
          "Falling tone, low pitch",
          "Gentle rising tone, medium pitch",
          "Whispering",
          "Loud and slow",
        ],
        answer: 1,
        explanation: "Soft rises and medium pitch sound polite.",
        explanationVi: "Lên nhẹ và cao độ vừa nghe lịch sự.",
      },
      {
        question: "Listen: which emotion?",
        questionVi: "Nghe: cảm xúc nào?",
        options: ["Excited", "Bored", "Sarcastic", "Polite"],
        answer: 0,
        explanation: "High, fast = excited.",
        explanationVi: "Cao, nhanh = vui.",
        audioWord: "Wow that is amazing",
      },
    ],
  },
  {
    id: "in-shadowing-practice",
    moduleId: "intonation",
    order: 6,
    title: "Final Project: Shadowing & Self-Recording",
    titleVi: "Dự Án Cuối: Shadowing & Tự Ghi Âm",
    emoji: "🎬",
    duration: "20 min",
    difficulty: "Upper-Intermediate",
    introduction:
      "The final mastery technique: SHADOWING. Pick a 30-second native clip, listen, then speak SIMULTANEOUSLY with the speaker. This trains your mouth, ear, and brain together.",
    introductionVi:
      "Kỹ thuật làm chủ cuối cùng: SHADOWING. Chọn đoạn bản xứ 30 giây, nghe, rồi nói ĐỒNG THỜI với người nói. Luyện cả miệng, tai, và não.",
    howTo: [
      { step: "Step 1: Listen to the clip 3× with full attention.", stepVi: "Bước 1: Nghe đoạn 3 lần với sự tập trung." },
      { step: "Step 2: Listen + WHISPER along (1× delay).", stepVi: "Bước 2: Nghe + THÌ THẦM theo (chậm 1 nhịp)." },
      { step: "Step 3: Listen + SPEAK along simultaneously.", stepVi: "Bước 3: Nghe + NÓI đồng thời." },
      { step: "Step 4: Record yourself shadowing. Compare.", stepVi: "Bước 4: Ghi âm khi shadowing. So sánh." },
      { step: "Step 5: Repeat daily for 2 weeks. You will sound 50% more native.", stepVi: "Bước 5: Lặp mỗi ngày 2 tuần. Bạn sẽ nghe bản xứ hơn 50%." },
    ],
    examples: [
      { word: "Sources: TED talks, BBC Learning English, podcasts (English We Speak), Netflix shows.", ipa: "-", vi: "Nguồn: TED, BBC, podcasts, Netflix." },
      { word: "Best length: 20-60 seconds per session.", ipa: "-", vi: "Độ dài tốt: 20-60 giây mỗi lần." },
      { word: "Best topics: news, vlogs, conversations.", ipa: "-", vi: "Chủ đề tốt: tin tức, vlog, hội thoại." },
    ],
    commonMistakeVi:
      "Học viên nghe 1 lần rồi cố nói lại từ trí nhớ - đó là lặp lại, không phải shadowing.",
    teacherTip: "Use the AI Speaking Coach in HaiEduTech to record and get feedback after each shadowing session.",
    teacherTipVi: "Dùng AI Speaking Coach của HaiEduTech để ghi âm và nhận phản hồi sau mỗi buổi shadowing.",
    practiceSentences: [
      { en: "Pick any 30s clip you LOVE. Make it yours through daily shadowing.", vi: "Chọn đoạn 30s bạn YÊU. Biến nó thành của bạn qua shadowing hằng ngày." },
    ],
    quiz: [
      {
        question: "Shadowing means:",
        questionVi: "Shadowing nghĩa là:",
        options: [
          "Listening to a clip 10 times",
          "Speaking simultaneously with a native model",
          "Translating a clip",
          "Reading transcripts",
        ],
        answer: 1,
        explanation: "Speak in real time as the model speaks.",
        explanationVi: "Nói cùng lúc với người mẫu.",
      },
      {
        question: "Best clip length for shadowing:",
        questionVi: "Độ dài đoạn shadowing tốt nhất:",
        options: ["5 seconds", "20-60 seconds", "5 minutes", "30 minutes"],
        answer: 1,
        explanation: "20-60s - manageable and meaningful.",
        explanationVi: "20-60 giây - vừa quản lý vừa có ý nghĩa.",
      },
      {
        question: "How often should you shadow?",
        questionVi: "Tần suất shadowing?",
        options: ["Once a month", "Once a week", "Daily", "Only before exams"],
        answer: 2,
        explanation: "Daily, even 5-10 min, beats weekly long sessions.",
        explanationVi: "Mỗi ngày, dù 5-10 phút, hơn buổi dài hằng tuần.",
      },
    ],
  },
];

export const pronunciationLessons: PronLesson[] = [
  ...ipaLessons,
  ...wordStressLessons,
  ...sentenceStressLessons,
  ...intonationLessons,
];

// IPA chart data for the interactive chart component
export interface IpaChartItem {
  symbol: string;
  example: string;
  ipa: string;
  category: "short-vowel" | "long-vowel" | "diphthong" | "stop" | "fricative" | "affricate" | "nasal" | "approximant";
}

export const ipaChart: IpaChartItem[] = [
  // Short vowels
  { symbol: "ɪ", example: "ship", ipa: "/ʃɪp/", category: "short-vowel" },
  { symbol: "e", example: "bed", ipa: "/bed/", category: "short-vowel" },
  { symbol: "æ", example: "cat", ipa: "/kæt/", category: "short-vowel" },
  { symbol: "ʌ", example: "cup", ipa: "/kʌp/", category: "short-vowel" },
  { symbol: "ɒ", example: "hot", ipa: "/hɒt/", category: "short-vowel" },
  { symbol: "ʊ", example: "book", ipa: "/bʊk/", category: "short-vowel" },
  { symbol: "ə", example: "about", ipa: "/əˈbaʊt/", category: "short-vowel" },
  // Long vowels
  { symbol: "iː", example: "sheep", ipa: "/ʃiːp/", category: "long-vowel" },
  { symbol: "ɑː", example: "car", ipa: "/kɑː/", category: "long-vowel" },
  { symbol: "ɔː", example: "law", ipa: "/lɔː/", category: "long-vowel" },
  { symbol: "uː", example: "food", ipa: "/fuːd/", category: "long-vowel" },
  { symbol: "ɜː", example: "bird", ipa: "/bɜːd/", category: "long-vowel" },
  // Diphthongs
  { symbol: "eɪ", example: "day", ipa: "/deɪ/", category: "diphthong" },
  { symbol: "aɪ", example: "my", ipa: "/maɪ/", category: "diphthong" },
  { symbol: "ɔɪ", example: "boy", ipa: "/bɔɪ/", category: "diphthong" },
  { symbol: "aʊ", example: "now", ipa: "/naʊ/", category: "diphthong" },
  { symbol: "əʊ", example: "go", ipa: "/ɡəʊ/", category: "diphthong" },
  { symbol: "ɪə", example: "near", ipa: "/nɪə/", category: "diphthong" },
  { symbol: "eə", example: "hair", ipa: "/heə/", category: "diphthong" },
  { symbol: "ʊə", example: "tour", ipa: "/tʊə/", category: "diphthong" },
  // Stops
  { symbol: "p", example: "pen", ipa: "/pen/", category: "stop" },
  { symbol: "b", example: "bed", ipa: "/bed/", category: "stop" },
  { symbol: "t", example: "ten", ipa: "/ten/", category: "stop" },
  { symbol: "d", example: "day", ipa: "/deɪ/", category: "stop" },
  { symbol: "k", example: "cat", ipa: "/kæt/", category: "stop" },
  { symbol: "ɡ", example: "go", ipa: "/ɡəʊ/", category: "stop" },
  // Fricatives
  { symbol: "f", example: "fan", ipa: "/fæn/", category: "fricative" },
  { symbol: "v", example: "van", ipa: "/væn/", category: "fricative" },
  { symbol: "θ", example: "think", ipa: "/θɪŋk/", category: "fricative" },
  { symbol: "ð", example: "this", ipa: "/ðɪs/", category: "fricative" },
  { symbol: "s", example: "sun", ipa: "/sʌn/", category: "fricative" },
  { symbol: "z", example: "zoo", ipa: "/zuː/", category: "fricative" },
  { symbol: "ʃ", example: "she", ipa: "/ʃiː/", category: "fricative" },
  { symbol: "ʒ", example: "vision", ipa: "/ˈvɪʒən/", category: "fricative" },
  { symbol: "h", example: "hat", ipa: "/hæt/", category: "fricative" },
  // Affricates
  { symbol: "tʃ", example: "chair", ipa: "/tʃeə/", category: "affricate" },
  { symbol: "dʒ", example: "job", ipa: "/dʒɒb/", category: "affricate" },
  // Nasals
  { symbol: "m", example: "man", ipa: "/mæn/", category: "nasal" },
  { symbol: "n", example: "no", ipa: "/nəʊ/", category: "nasal" },
  { symbol: "ŋ", example: "sing", ipa: "/sɪŋ/", category: "nasal" },
  // Approximants
  { symbol: "l", example: "love", ipa: "/lʌv/", category: "approximant" },
  { symbol: "r", example: "red", ipa: "/red/", category: "approximant" },
  { symbol: "w", example: "what", ipa: "/wɒt/", category: "approximant" },
  { symbol: "j", example: "yes", ipa: "/jes/", category: "approximant" },
];
