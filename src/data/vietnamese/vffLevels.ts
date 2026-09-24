/**
 * Vietnamese for Foreigners - Structured CEFR Curriculum
 * A1 Foundation + B1 Fluency level lesson data.
 * A2 content lives in detailedVietnameseData.ts (already tied to the existing page).
 */

export interface VFFVocab {
  word: string;
  ipa: string;
  meaning: string;
  example: string;
  exampleEn: string;
}

export interface VFFDialogueLine {
  speaker: string;
  vi: string;
  en: string;
  note?: string;
}

export interface VFFGrammarBox {
  title: string;
  titleEn: string;
  formula: string;
  explanation: string;
  explanationEn: string;
  examples: { vi: string; en: string }[];
  commonMistake?: { wrong: string; right: string; noteEn: string };
}

export interface VFFDrill {
  type: "fill" | "translate" | "match";
  prompt: string;
  promptEn: string;
  answer: string;
  hint?: string;
}

export interface VFFQuizItem {
  question: string;
  questionEn: string;
  options: string[];
  answer: number;
  explanation?: string;
  explanationEn: string;
}

export interface VFFLevelLesson {
  id: string;
  order: number;
  title: string;
  titleEn: string;
  icon: string;
  goal: string;
  goalEn: string;
  minutes: number;
  vocab: VFFVocab[];
  dialogue: VFFDialogueLine[];
  grammar: VFFGrammarBox[];
  pronunciationDrill: { word: string; ipa: string; tip: string }[];
  drills: VFFDrill[];
  quiz: VFFQuizItem[];
  culturalTip: { vi: string; en: string };
}

export interface VFFLevel {
  id: "a1" | "a2" | "b1";
  cefr: "A1" | "A2" | "B1";
  title: string;
  titleEn: string;
  tagline: string;
  taglineEn: string;
  hours: number;
  color: string;
  lessons: VFFLevelLesson[];
  checkpoint: VFFQuizItem[];
}


// ============================================================
// LEVEL A1 - Foundation (Survival Vietnamese) - 5 lessons
// ============================================================
export const vffLevelA1: VFFLevel = {
  id: "a1",
  cefr: "A1",
  title: "A1 - Nền tảng",
  titleEn: "A1 - Foundation",
  tagline: "Bảng chữ cái, 6 thanh điệu, giao tiếp sinh tồn.",
  taglineEn: "Alphabet, 6 tones, survival communication.",
  hours: 12,
  color: "from-emerald-500 to-teal-500",
  lessons: [
    {
      id: "a1-l1",
      order: 1,
      title: "Bảng chữ cái & 6 Thanh điệu",
      titleEn: "Alphabet & 6 Tones",
      icon: "🔤",
      goal: "Đọc đúng 29 chữ cái Việt và phân biệt 6 thanh.",
      goalEn: "Read the 29 Vietnamese letters correctly and distinguish all 6 tones.",
      minutes: 25,
      vocab: [
        { word: "ma", ipa: "/maː˧/", meaning: "ghost", example: "Con ma", exampleEn: "The ghost" },
        { word: "má", ipa: "/maː˧˥/", meaning: "cheek / mother (S)", example: "Má tôi", exampleEn: "My mother" },
        { word: "mà", ipa: "/maː˨˩/", meaning: "but / that", example: "Đẹp mà rẻ", exampleEn: "Beautiful but cheap" },
        { word: "mả", ipa: "/maː˧˩˧/", meaning: "grave", example: "Ngôi mả", exampleEn: "The grave" },
        { word: "mã", ipa: "/maː˧ˀ˥/", meaning: "horse / code", example: "Mã số", exampleEn: "The code" },
        { word: "mạ", ipa: "/maː˧ˀ˨/", meaning: "rice seedling", example: "Cây mạ", exampleEn: "Seedling" },
        { word: "ă", ipa: "/aː/", meaning: "short a", example: "ăn", exampleEn: "to eat" },
        { word: "â", ipa: "/ə/", meaning: "short schwa a", example: "cần", exampleEn: "need" },
        { word: "ơ", ipa: "/əː/", meaning: "long schwa", example: "cơm", exampleEn: "rice" },
        { word: "ư", ipa: "/ɨ/", meaning: "high back unrounded", example: "thư", exampleEn: "letter" },
      ],
      dialogue: [
        { speaker: "Teacher", vi: "Chào em! Em tên là gì?", en: "Hello! What's your name?" },
        { speaker: "You", vi: "Dạ, em tên là David ạ.", en: "My name is David.", note: "'ạ' = polite ending" },
        { speaker: "Teacher", vi: "David, em đọc thử: ma, má, mà nhé!", en: "David, try reading: ma, má, mà!" },
        { speaker: "You", vi: "Ma... má... mà... Khó quá cô ơi!", en: "Ma... má... mà... Too hard, teacher!" },
      ],
      grammar: [
        {
          title: "Sáu thanh điệu",
          titleEn: "The Six Tones",
          formula: "ma (–) · má (↗) · mà (↘) · mả (↘↗) · mã (↗̃) · mạ (↓)",
          explanation: "Mỗi âm tiết mang một thanh; đổi thanh là đổi nghĩa.",
          explanationEn: "Every syllable carries a tone; changing the tone changes the meaning.",
          examples: [
            { vi: "má (mother)", en: "high-rising" },
            { vi: "mà (but)", en: "low-falling" },
            { vi: "mạ (seedling)", en: "low, glottal drop" },
          ],
          commonMistake: {
            wrong: "Đọc 'má' với thanh bằng",
            right: "Đọc 'má' với thanh sắc (đi lên)",
            noteEn: "Foreigners often flatten the rising tone. Push pitch up sharply.",
          },
        },
        {
          title: "Nguyên âm đặc biệt",
          titleEn: "Special Vowels ă / â / ơ / ư",
          formula: "ă = short a · â = schwa short · ơ = schwa long · ư = /ɨ/",
          explanation: "Bốn nguyên âm này không có trong tiếng Anh - hãy nghe TTS và bắt chước.",
          explanationEn: "These four vowels don't exist in English - listen and imitate.",
          examples: [
            { vi: "ăn (eat) vs an (peace)", en: "short ă cuts short" },
            { vi: "cơm (rice) vs com (—)", en: "ơ opens the mouth wider" },
            { vi: "thư (letter)", en: "smile-shape lips for ư" },
          ],
        },
      ],
      pronunciationDrill: [
        { word: "ma / má / mà / mả / mã / mạ", ipa: "6 tones on /maː/", tip: "Warm-up: sing the 6 tones daily." },
        { word: "ăn cơm", ipa: "/aːn kəːm/", tip: "Snap ă short, open ơ." },
        { word: "cà phê sữa", ipa: "/kaː˨˩ fɛː səː˧˩˧/", tip: "Falling → level → dipping." },
      ],
      drills: [
        { type: "fill", prompt: "M__ tôi rất đẹp. (mother)", promptEn: "___ my is very beautiful (mother)", answer: "Má", hint: "Rising tone." },
        { type: "translate", prompt: "I eat rice.", promptEn: "Translate", answer: "Tôi ăn cơm." },
        { type: "match", prompt: "mà ↔ ?", promptEn: "Match the tone meaning", answer: "but" },
      ],
      quiz: [
        { question: "Từ 'má' mang thanh gì?", questionEn: "'má' carries which tone?", options: ["ngang", "sắc", "huyền", "nặng"], answer: 1, explanationEn: "The acute mark = sắc = high-rising tone." },
        { question: "Nguyên âm nào là /ɨ/?", questionEn: "Which vowel is /ɨ/?", options: ["ă", "â", "ơ", "ư"], answer: 3, explanationEn: "ư = high back unrounded, unique to Vietnamese." },
        { question: "'ạ' cuối câu để làm gì?", questionEn: "What is final 'ạ' for?", options: ["Hỏi", "Phủ định", "Lịch sự", "Mệnh lệnh"], answer: 2, explanationEn: "It's a politeness particle." },
      ],
      culturalTip: {
        vi: "Người Việt đánh giá 'ngoại ngữ giỏi' qua thanh điệu. Sai thanh nghe rất buồn cười.",
        en: "Vietnamese judge foreign fluency by tones. Wrong tones sound hilariously off.",
      },
    },
    {
      id: "a1-l2",
      order: 2,
      title: "Số đếm, Giờ & Ngày",
      titleEn: "Numbers, Time & Dates",
      icon: "🔢",
      goal: "Đếm 0-1000, hỏi giờ, nói ngày tháng.",
      goalEn: "Count 0-1000, ask the time, say dates.",
      minutes: 20,
      vocab: [
        { word: "một", ipa: "/mot̚˧˨/", meaning: "one", example: "một cái", exampleEn: "one item" },
        { word: "hai", ipa: "/haːj˧/", meaning: "two", example: "hai giờ", exampleEn: "two o'clock" },
        { word: "ba", ipa: "/ɓaː˧/", meaning: "three", example: "ba ngày", exampleEn: "three days" },
        { word: "mười", ipa: "/mɨəj˨˩/", meaning: "ten", example: "mười phút", exampleEn: "ten minutes" },
        { word: "trăm", ipa: "/ʈaːm˧/", meaning: "hundred", example: "một trăm", exampleEn: "one hundred" },
        { word: "nghìn / ngàn", ipa: "/ŋin˨˩/", meaning: "thousand (N/S)", example: "hai nghìn", exampleEn: "two thousand" },
        { word: "giờ", ipa: "/zəː˨˩/", meaning: "hour", example: "mấy giờ?", exampleEn: "what time?" },
        { word: "phút", ipa: "/fut̚˧˥/", meaning: "minute", example: "15 phút", exampleEn: "15 minutes" },
        { word: "hôm nay", ipa: "/hom˧ naj˧/", meaning: "today", example: "Hôm nay thứ hai.", exampleEn: "Today is Monday." },
        { word: "ngày mai", ipa: "/ŋaj˨˩ maːj˧/", meaning: "tomorrow", example: "Ngày mai gặp!", exampleEn: "See you tomorrow!" },
      ],
      dialogue: [
        { speaker: "You", vi: "Xin lỗi, bây giờ là mấy giờ ạ?", en: "Excuse me, what time is it?" },
        { speaker: "Local", vi: "Bây giờ là 3 giờ 15 phút.", en: "It's 3:15." },
        { speaker: "You", vi: "Cảm ơn. Hôm nay là thứ mấy?", en: "Thanks. What day is it today?" },
        { speaker: "Local", vi: "Hôm nay thứ tư, ngày 15 tháng 7.", en: "Today is Wednesday, July 15th." },
      ],
      grammar: [
        {
          title: "Cấu trúc giờ",
          titleEn: "Telling Time",
          formula: "[giờ] giờ [phút] phút",
          explanation: "Nói giờ trước, phút sau. 'Rưỡi' = 30 phút.",
          explanationEn: "Hours first, then minutes. 'Rưỡi' = half past.",
          examples: [
            { vi: "7 giờ 30 phút = 7 giờ rưỡi", en: "7:30" },
            { vi: "9 giờ kém 15", en: "8:45 (lit. '9 minus 15')" },
          ],
        },
        {
          title: "Thứ trong tuần",
          titleEn: "Days of the Week",
          formula: "Thứ 2/3/4/5/6/7 · Chủ nhật",
          explanation: "Từ 'Thứ hai' (Monday) đến 'Thứ bảy' (Saturday). 'Chủ nhật' = Sunday.",
          explanationEn: "Monday is 'day 2' because Sunday is day 1 (Chủ nhật).",
          examples: [
            { vi: "Thứ hai đi làm.", en: "I work on Monday." },
            { vi: "Chủ nhật nghỉ.", en: "Sunday off." },
          ],
        },
      ],
      pronunciationDrill: [
        { word: "một hai ba bốn năm", ipa: "1-2-3-4-5", tip: "Even rhythm, distinct tones." },
        { word: "mười một, mười hai", ipa: "11, 12", tip: "'mười' keeps falling tone before the digit." },
      ],
      drills: [
        { type: "translate", prompt: "It is 8:30.", promptEn: "Translate", answer: "Bây giờ là 8 giờ rưỡi." },
        { type: "fill", prompt: "Hôm nay là thứ ___ (Friday).", promptEn: "Fill day", answer: "sáu" },
      ],
      quiz: [
        { question: "'Rưỡi' nghĩa là gì?", questionEn: "'Rưỡi' means?", options: ["quarter", "half", "full", "minus"], answer: 1, explanationEn: "'Rưỡi' = half past." },
        { question: "Sunday là gì?", questionEn: "What is Sunday?", options: ["Thứ bảy", "Thứ hai", "Chủ nhật", "Thứ nhất"], answer: 2, explanationEn: "Chủ nhật = Sunday." },
      ],
      culturalTip: {
        vi: "Người Việt viết ngày trước, tháng sau: 15/7 = ngày 15 tháng 7.",
        en: "Vietnamese use day-month-year order: 15/7 = July 15.",
      },
    },
    {
      id: "a1-l3",
      order: 3,
      title: "Chào hỏi & Giới thiệu bản thân",
      titleEn: "Greetings & Self-introduction",
      icon: "👋",
      goal: "Chào, giới thiệu tên, tuổi, quốc tịch, nghề nghiệp.",
      goalEn: "Greet and introduce name, age, nationality, job.",
      minutes: 25,
      vocab: [
        { word: "xin chào", ipa: "/sin˧ ʨaːw˨˩/", meaning: "hello (formal)", example: "Xin chào mọi người!", exampleEn: "Hello everyone!" },
        { word: "tên", ipa: "/ten˧/", meaning: "name", example: "Tên tôi là David.", exampleEn: "My name is David." },
        { word: "tuổi", ipa: "/tuoj˧˩˧/", meaning: "age", example: "Tôi 30 tuổi.", exampleEn: "I'm 30." },
        { word: "người Mỹ", ipa: "/ŋɨəj˨˩ mi˧˥/", meaning: "American", example: "Tôi là người Mỹ.", exampleEn: "I'm American." },
        { word: "làm việc", ipa: "/laːm˨˩ viek̚˧˨/", meaning: "to work", example: "Tôi làm việc ở Hà Nội.", exampleEn: "I work in Hanoi." },
        { word: "kỹ sư", ipa: "/kiː˧˩˧ sɨː˧/", meaning: "engineer", example: "Tôi là kỹ sư.", exampleEn: "I'm an engineer." },
        { word: "rất vui", ipa: "/rat̚˧˥ vuj˧/", meaning: "very glad", example: "Rất vui được gặp bạn.", exampleEn: "Nice to meet you." },
        { word: "tạm biệt", ipa: "/taːm˧ˀ˨ biet̚˧˨/", meaning: "goodbye", example: "Tạm biệt nhé!", exampleEn: "Bye!" },
      ],
      dialogue: [
        { speaker: "You", vi: "Xin chào! Tôi tên là David.", en: "Hello! My name is David." },
        { speaker: "Linh", vi: "Chào anh David. Em tên Linh.", en: "Hi David. I'm Linh." },
        { speaker: "You", vi: "Anh là người Mỹ. Còn em?", en: "I'm American. And you?" },
        { speaker: "Linh", vi: "Em là người Việt. Anh làm gì?", en: "I'm Vietnamese. What do you do?" },
        { speaker: "You", vi: "Anh là kỹ sư phần mềm.", en: "I'm a software engineer." },
        { speaker: "Linh", vi: "Rất vui được gặp anh!", en: "Nice to meet you!" },
      ],
      grammar: [
        {
          title: "Cấu trúc 'là'",
          titleEn: "The copula 'là'",
          formula: "S + là + N (không dùng 'là' trước tính từ)",
          explanation: "'là' = 'to be' chỉ dùng trước danh từ. Trước tính từ thì bỏ 'là'.",
          explanationEn: "'là' = 'to be' only before a noun. Drop it before adjectives.",
          examples: [
            { vi: "Tôi là kỹ sư.", en: "I am an engineer." },
            { vi: "Tôi ✗là✗ đẹp → Tôi đẹp.", en: "I am beautiful (no 'là')." },
          ],
          commonMistake: {
            wrong: "Tôi là mệt.",
            right: "Tôi mệt.",
            noteEn: "Never use 'là' before an adjective. Simply drop it.",
          },
        },
        {
          title: "Câu hỏi 'gì'",
          titleEn: "'What' questions with 'gì'",
          formula: "S + V + gì?",
          explanation: "'gì' đứng cuối câu hỏi 'what'.",
          explanationEn: "'gì' goes at the end for 'what' questions.",
          examples: [
            { vi: "Anh làm gì?", en: "What do you do?" },
            { vi: "Đây là gì?", en: "What is this?" },
          ],
        },
      ],
      pronunciationDrill: [
        { word: "Xin chào", ipa: "/sin˧ ʨaːw˨˩/", tip: "Slight rise on 'xin', falling on 'chào'." },
        { word: "Rất vui được gặp bạn", ipa: "full sentence", tip: "Keep 'gặp' short with a heavy tone." },
      ],
      drills: [
        { type: "translate", prompt: "I am a teacher.", promptEn: "Translate", answer: "Tôi là giáo viên." },
        { type: "fill", prompt: "___ tên là gì?", promptEn: "Fill pronoun (asking a male peer)", answer: "Anh" },
      ],
      quiz: [
        { question: "Chọn câu ĐÚNG:", questionEn: "Choose the CORRECT sentence:", options: ["Tôi là mệt.", "Tôi mệt.", "Tôi là đang mệt.", "Là tôi mệt."], answer: 1, explanationEn: "No 'là' before adjectives." },
        { question: "'What do you do?' =", questionEn: "Translate", options: ["Anh gì làm?", "Anh làm gì?", "Gì anh làm?", "Làm anh gì?"], answer: 1, explanationEn: "'gì' goes at the end." },
      ],
      culturalTip: {
        vi: "Nói 'Rất vui được gặp bạn' kèm cái gật đầu nhẹ - không cần bắt tay chặt.",
        en: "Say 'Nice to meet you' with a light nod - firm handshakes are optional.",
      },
    },
    {
      id: "a1-l4",
      order: 4,
      title: "Gia đình & Đại từ nhân xưng",
      titleEn: "Family & Pronoun System",
      icon: "👨‍👩‍👧",
      goal: "Dùng đúng anh/chị/em/cô/chú/bác theo tuổi.",
      goalEn: "Use anh/chị/em/cô/chú/bác correctly by age.",
      minutes: 30,
      vocab: [
        { word: "anh", ipa: "/ʔaːɲ˧/", meaning: "older brother / you (older male)", example: "Anh của em.", exampleEn: "My older brother." },
        { word: "chị", ipa: "/ci˧ˀ˨/", meaning: "older sister / you (older female)", example: "Chị Linh.", exampleEn: "Sister Linh." },
        { word: "em", ipa: "/ʔɛm˧/", meaning: "younger sibling / I (to older)", example: "Em là David.", exampleEn: "I am David (to elder)." },
        { word: "cô", ipa: "/ko˧/", meaning: "aunt / Miss / teacher (f)", example: "Cô giáo em.", exampleEn: "My female teacher." },
        { word: "chú", ipa: "/cu˧˥/", meaning: "uncle (younger than dad)", example: "Chú của em.", exampleEn: "My uncle." },
        { word: "bác", ipa: "/ɓaːk̚˧˥/", meaning: "uncle/aunt older than parent", example: "Bác Nam.", exampleEn: "Uncle Nam." },
        { word: "ông", ipa: "/ʔoŋ˧/", meaning: "grandfather / sir", example: "Ông nội em.", exampleEn: "My paternal grandpa." },
        { word: "bà", ipa: "/ɓaː˨˩/", meaning: "grandmother / ma'am", example: "Bà ngoại.", exampleEn: "Maternal grandma." },
        { word: "bố / ba", ipa: "/ɓo˧˥/", meaning: "father (N/S)", example: "Ba tôi.", exampleEn: "My father." },
        { word: "mẹ / má", ipa: "/mɛ˧ˀ˨/", meaning: "mother (N/S)", example: "Mẹ tôi.", exampleEn: "My mother." },
      ],
      dialogue: [
        { speaker: "Friend", vi: "David, đây là ba mẹ mình.", en: "David, these are my parents." },
        { speaker: "You", vi: "Dạ, cháu chào hai bác ạ!", en: "Hello, sir and ma'am!" },
        { speaker: "Dad", vi: "Chào cháu! Cháu bao nhiêu tuổi?", en: "Hi! How old are you?" },
        { speaker: "You", vi: "Dạ, cháu 30 tuổi ạ.", en: "I'm 30." },
        { speaker: "Mom", vi: "Cháu ăn cơm chưa?", en: "Have you eaten?" },
        { speaker: "You", vi: "Dạ, cháu ăn rồi ạ. Cảm ơn bác.", en: "Yes, thank you." },
      ],
      grammar: [
        {
          title: "Ma trận xưng hô cơ bản",
          titleEn: "Basic Pronoun Matrix",
          formula: "You older → anh/chị · Same age → bạn · Younger → em · Parent's age → cô/chú · Grandparent → ông/bà",
          explanation: "Chọn đại từ theo tuổi & giới. Nếu không rõ tuổi → hỏi.",
          explanationEn: "Pick pronouns by age & gender. If unsure - ask their age.",
          examples: [
            { vi: "(You 25, she 30) → Chào chị. Em là David.", en: "Say 'chị', call yourself 'em'." },
            { vi: "(You 40, waiter 20) → Em ơi! Cho anh cà phê.", en: "Server = em, you = anh." },
          ],
          commonMistake: {
            wrong: "Dùng 'tôi/bạn' mọi lúc.",
            right: "Điều chỉnh theo mối quan hệ.",
            noteEn: "'Tôi/bạn' is neutral but distant - use anh/chị/em to sound native.",
          },
        },
        {
          title: "'Ăn cơm chưa?' - Chào bằng câu hỏi",
          titleEn: "'Have you eaten?' as greeting",
          formula: "S + V + chưa? → Đã V rồi / Chưa",
          explanation: "Câu hỏi kết thúc bằng 'chưa' = 'yet?'. Trả lời: 'rồi' (yes) / 'chưa' (not yet).",
          explanationEn: "Sentences ending in 'chưa' = 'yet?'. Answer 'rồi' (already) or 'chưa' (not yet).",
          examples: [
            { vi: "Anh ăn cơm chưa? - Rồi.", en: "Have you eaten? - Yes." },
            { vi: "Em học bài chưa? - Chưa.", en: "Have you studied? - Not yet." },
          ],
        },
      ],
      pronunciationDrill: [
        { word: "anh / chị / em / cô / chú / bác", ipa: "6 core pronouns", tip: "Say them daily until reflexive." },
        { word: "Dạ vâng ạ", ipa: "/zaː˧ˀ˨ vəŋ˧ ʔaː˧ˀ˨/", tip: "All heavy tones - stay low." },
      ],
      drills: [
        { type: "fill", prompt: "You(25, male) meet Linh(30, female). Say: '___ chào ___ ạ!'", promptEn: "Fill pronouns", answer: "Em / chị" },
        { type: "translate", prompt: "Have you eaten?", promptEn: "Casual greeting", answer: "Ăn cơm chưa?" },
      ],
      quiz: [
        { question: "You're 22, waiter is 18. You say:", questionEn: "Choose", options: ["Anh ơi, cho em nước.", "Em ơi, cho anh nước.", "Chú ơi, cho cháu nước.", "Bạn ơi, cho tôi nước."], answer: 1, explanationEn: "Customer is 'anh', server is 'em'." },
        { question: "'Chưa' means:", questionEn: "Translate", options: ["already", "not yet", "never", "again"], answer: 1, explanationEn: "'Chưa' = not yet." },
        { question: "Grandmother =", questionEn: "Vocab", options: ["ông", "bà", "cô", "má"], answer: 1, explanationEn: "bà = grandmother." },
      ],
      culturalTip: {
        vi: "Hỏi tuổi ở Việt Nam KHÔNG bất lịch sự - đó là cách chọn đại từ.",
        en: "Asking someone's age in Vietnam is NOT rude - it's how pronouns are chosen.",
      },
    },
    {
      id: "a1-l5",
      order: 5,
      title: "Ngữ pháp cơ bản: SVO, Loại từ, 'là'",
      titleEn: "Basic Grammar: SVO, Classifiers, 'là'",
      icon: "🧩",
      goal: "Đặt câu S-V-O có loại từ và câu hỏi có/không.",
      goalEn: "Form SVO sentences with classifiers and yes/no questions.",
      minutes: 30,
      vocab: [
        { word: "cái", ipa: "/kaːj˧˥/", meaning: "classifier: things", example: "cái bàn", exampleEn: "the table" },
        { word: "con", ipa: "/kɔn˧/", meaning: "classifier: animals", example: "con chó", exampleEn: "the dog" },
        { word: "quyển", ipa: "/kwien˧˩˧/", meaning: "classifier: books", example: "quyển sách", exampleEn: "the book" },
        { word: "chiếc", ipa: "/cieːk̚˧˥/", meaning: "classifier: vehicles/items (single)", example: "chiếc xe", exampleEn: "the vehicle" },
        { word: "có", ipa: "/kɔ˧˥/", meaning: "have / exist", example: "Tôi có xe.", exampleEn: "I have a car." },
        { word: "không", ipa: "/xoŋ˧/", meaning: "no / not", example: "Không phải.", exampleEn: "Not correct." },
        { word: "phải", ipa: "/faːj˧˩˧/", meaning: "must / right", example: "Đúng, phải rồi.", exampleEn: "Yes, that's right." },
        { word: "muốn", ipa: "/muən˧˥/", meaning: "want", example: "Tôi muốn ăn.", exampleEn: "I want to eat." },
      ],
      dialogue: [
        { speaker: "Shopkeeper", vi: "Anh muốn mua gì ạ?", en: "What would you like to buy?" },
        { speaker: "You", vi: "Chị có quyển từ điển tiếng Việt không?", en: "Do you have a Vietnamese dictionary?" },
        { speaker: "Shopkeeper", vi: "Có ạ. Anh xem quyển này nhé.", en: "Yes. Please look at this one." },
        { speaker: "You", vi: "Quyển này bao nhiêu tiền?", en: "How much is this?" },
        { speaker: "Shopkeeper", vi: "Dạ, 150 nghìn đồng ạ.", en: "150,000 dong." },
        { speaker: "You", vi: "Được. Em lấy một quyển.", en: "OK. I'll take one." },
      ],
      grammar: [
        {
          title: "Câu hỏi Yes/No: '...không?'",
          titleEn: "Yes/No questions with 'không?'",
          formula: "S + V + O + không? → Có / Không",
          explanation: "Thêm 'không?' cuối câu. Trả lời: 'Có' (yes) / 'Không' (no).",
          explanationEn: "Add 'không?' at the end. Answer: 'Có' (yes) / 'Không' (no).",
          examples: [
            { vi: "Anh có xe không? - Có.", en: "Do you have a car? - Yes." },
            { vi: "Em ăn phở không? - Không.", en: "Do you eat pho? - No." },
          ],
        },
        {
          title: "Loại từ (classifiers)",
          titleEn: "Classifiers",
          formula: "[số] + [loại từ] + [danh từ]",
          explanation: "'cái' cho đồ vật, 'con' cho động vật/người thân mật, 'quyển' cho sách, 'chiếc' cho phương tiện/đôi.",
          explanationEn: "'cái' for things, 'con' for animals, 'quyển' for books, 'chiếc' for vehicles/singles.",
          examples: [
            { vi: "hai cái ghế", en: "two chairs" },
            { vi: "ba con mèo", en: "three cats" },
            { vi: "một chiếc xe máy", en: "one motorbike" },
          ],
          commonMistake: {
            wrong: "hai ghế",
            right: "hai cái ghế",
            noteEn: "Numbers usually need a classifier before the noun.",
          },
        },
      ],
      pronunciationDrill: [
        { word: "có / không", ipa: "/kɔ˧˥ / xoŋ˧/", tip: "Rising vs level - contrast clearly." },
      ],
      drills: [
        { type: "translate", prompt: "I want to buy two books.", promptEn: "Translate", answer: "Tôi muốn mua hai quyển sách." },
        { type: "fill", prompt: "Anh có xe ___ ? - Có.", promptEn: "Fill", answer: "không" },
      ],
      quiz: [
        { question: "Câu 'Do you have coffee?':", questionEn: "Translate", options: ["Anh có cà phê không?", "Anh cà phê có?", "Có anh cà phê không?", "Không anh có cà phê?"], answer: 0, explanationEn: "S + V + O + không?" },
        { question: "'Two dogs' =", questionEn: "Classifier", options: ["hai chó", "hai cái chó", "hai con chó", "hai quyển chó"], answer: 2, explanationEn: "'con' classifies animals." },
        { question: "Bỏ qua 'là' trong câu:", questionEn: "Drop 'là' when:", options: ["Trước danh từ", "Trước tính từ", "Trước động từ", "Cuối câu"], answer: 1, explanationEn: "Never use 'là' before adjectives." },
      ],
      culturalTip: {
        vi: "Trả giá ở chợ là chuyện bình thường - hỏi '___ bớt không?' để giảm 10-20%.",
        en: "Bargaining at markets is normal - ask '___ bớt không?' for a 10-20% discount.",
      },
    },
  ],
  checkpoint: [
    { question: "Chọn thanh cho 'má':", questionEn: "Tone of 'má'?", options: ["ngang", "sắc", "huyền", "nặng"], answer: 1, explanationEn: "Rising = sắc." },
    { question: "'What time is it?' =", questionEn: "Translate", options: ["Bao nhiêu giờ?", "Mấy giờ rồi?", "Giờ nào?", "Khi nào giờ?"], answer: 1, explanationEn: "Standard: Mấy giờ rồi? / Bây giờ là mấy giờ?" },
    { question: "'I am tired' =", questionEn: "Translate", options: ["Tôi là mệt.", "Tôi mệt.", "Là tôi mệt.", "Tôi đang là mệt."], answer: 1, explanationEn: "Never 'là' before adjectives." },
    { question: "You(30, male) call a 25-year-old female peer:", questionEn: "Pronoun for her", options: ["chị", "em", "cô", "bà"], answer: 1, explanationEn: "Younger female = em." },
    { question: "'Do you have a dog?'", questionEn: "Translate", options: ["Anh có chó không?", "Anh có con chó không?", "Anh có cái chó không?", "Anh chó có không?"], answer: 1, explanationEn: "Animal classifier 'con'." },
    { question: "Sunday =", questionEn: "Vocab", options: ["Thứ bảy", "Thứ hai", "Chủ nhật", "Ngày một"], answer: 2, explanationEn: "Chủ nhật." },
    { question: "'ạ' at end shows:", questionEn: "Function", options: ["Question", "Politeness", "Negation", "Past tense"], answer: 1, explanationEn: "Politeness particle." },
    { question: "Vowel unique to Vietnamese:", questionEn: "Choose", options: ["a", "e", "ư", "i"], answer: 2, explanationEn: "ư = /ɨ/." },
    { question: "'Ăn cơm chưa?' answered 'Rồi' means:", questionEn: "Meaning", options: ["Not yet", "Already", "Never", "Later"], answer: 1, explanationEn: "'Rồi' = already." },
    { question: "Classifier for a motorbike:", questionEn: "Choose", options: ["cái", "con", "chiếc", "quyển"], answer: 2, explanationEn: "'chiếc' for vehicles." },
  ],
};

// ============================================================
// LEVEL B1 - Fluency (Work, News, Opinions) - 5 lessons
// ============================================================
export const vffLevelB1: VFFLevel = {
  id: "b1",
  cefr: "B1",
  title: "B1 - Thành thạo",
  titleEn: "B1 - Fluency",
  tagline: "Công việc, tin tức, ý kiến, ngữ pháp nâng cao.",
  taglineEn: "Work, news, opinions, advanced grammar.",
  hours: 20,
  color: "from-indigo-500 to-fuchsia-500",
  lessons: [
    {
      id: "b1-l1",
      order: 1,
      title: "Tiếng Việt Công sở & Email",
      titleEn: "Workplace Vietnamese & Email",
      icon: "💼",
      goal: "Viết email chuyên nghiệp, họp hành, báo cáo.",
      goalEn: "Write professional email, run meetings, give reports.",
      minutes: 35,
      vocab: [
        { word: "kính gửi", ipa: "/kiɲ˧˥ ɣɨːj˧˩˧/", meaning: "Dear (formal)", example: "Kính gửi Ban Giám đốc,", exampleEn: "Dear Board of Directors," },
        { word: "trân trọng", ipa: "/ʈan˧ ʈɔŋ˧ˀ˨/", meaning: "respectfully / regards", example: "Trân trọng, David", exampleEn: "Regards, David" },
        { word: "cuộc họp", ipa: "/kuok̚˧˨ hɔp̚˧˨/", meaning: "meeting", example: "Cuộc họp lúc 10 giờ.", exampleEn: "The meeting is at 10." },
        { word: "báo cáo", ipa: "/ɓaːw˧˥ kaːw˧˥/", meaning: "report", example: "Nộp báo cáo.", exampleEn: "Submit the report." },
        { word: "hạn chót", ipa: "/haːn˧ˀ˨ cɔt̚˧˥/", meaning: "deadline", example: "Hạn chót thứ sáu.", exampleEn: "Deadline Friday." },
        { word: "đề xuất", ipa: "/ɗe˨˩ swat̚˧˥/", meaning: "propose", example: "Tôi xin đề xuất...", exampleEn: "I'd like to propose..." },
        { word: "khả thi", ipa: "/xaː˧˩˧ tʰi˧/", meaning: "feasible", example: "Phương án khả thi.", exampleEn: "A feasible option." },
      ],
      dialogue: [
        { speaker: "Manager", vi: "David, em có thể phụ trách dự án này không?", en: "David, can you lead this project?" },
        { speaker: "You", vi: "Dạ được ạ. Khi nào là hạn chót?", en: "Yes. When is the deadline?" },
        { speaker: "Manager", vi: "Cuối tháng này. Em cần thêm nhân sự không?", en: "End of this month. Need extra staff?" },
        { speaker: "You", vi: "Em nghĩ nếu có thêm 2 người thì sẽ khả thi hơn.", en: "I think 2 more people would make it more feasible." },
        { speaker: "Manager", vi: "Được, em viết email đề xuất gửi HR nhé.", en: "OK, email HR with the request." },
      ],
      grammar: [
        {
          title: "Câu điều kiện 'nếu... thì...'",
          titleEn: "Conditionals: 'if... then...'",
          formula: "Nếu + (S) + V, thì + (S) + V",
          explanation: "'Nếu... thì...' = 'if... then...'. Có thể bỏ 'thì' trong văn nói.",
          explanationEn: "'Nếu... thì...' = 'if... then...'. Can drop 'thì' in speech.",
          examples: [
            { vi: "Nếu trời mưa thì tôi ở nhà.", en: "If it rains, I stay home." },
            { vi: "Nếu có thời gian, mình đi cà phê nhé.", en: "If we have time, let's grab coffee." },
          ],
        },
        {
          title: "Bị động với 'được / bị'",
          titleEn: "Passive: 'được' vs 'bị'",
          formula: "S + được/bị + (agent) + V",
          explanation: "'được' cho sự việc tích cực, 'bị' cho tiêu cực.",
          explanationEn: "'được' = positive passive, 'bị' = negative passive.",
          examples: [
            { vi: "Tôi được thăng chức.", en: "I got promoted (positive)." },
            { vi: "Anh ấy bị đuổi việc.", en: "He got fired (negative)." },
          ],
          commonMistake: {
            wrong: "Tôi bị thăng chức.",
            right: "Tôi được thăng chức.",
            noteEn: "Promotion is positive - use 'được', not 'bị'.",
          },
        },
      ],
      pronunciationDrill: [
        { word: "trân trọng", ipa: "/ʈan ʈɔŋ/", tip: "Rolled/retroflex 'tr' - distinct from 'ch'." },
        { word: "kính gửi", ipa: "/kiɲ ɣɨːj/", tip: "Nasal end on 'kính'." },
      ],
      drills: [
        { type: "translate", prompt: "The deadline is next Monday.", promptEn: "Translate", answer: "Hạn chót là thứ hai tuần sau." },
        { type: "fill", prompt: "Anh ấy ___ khen thưởng.", promptEn: "Passive (positive)", answer: "được" },
      ],
      quiz: [
        { question: "Bị động tiêu cực dùng:", questionEn: "Negative passive uses:", options: ["được", "bị", "đã", "sẽ"], answer: 1, explanationEn: "'bị' = negative passive." },
        { question: "Câu email lịch sự nhất mở đầu:", questionEn: "Most formal opening:", options: ["Hi David,", "Chào David,", "Kính gửi anh David,", "David ơi,"], answer: 2, explanationEn: "'Kính gửi' is the most formal." },
      ],
      culturalTip: {
        vi: "Email công việc VN thường mở 'Kính gửi...' và đóng 'Trân trọng,' - rất trịnh trọng.",
        en: "VN work emails open with 'Kính gửi' and close 'Trân trọng' - very formal.",
      },
    },
    {
      id: "b1-l2",
      order: 2,
      title: "Đọc tin tức & Bày tỏ ý kiến",
      titleEn: "Reading News & Expressing Opinions",
      icon: "📰",
      goal: "Hiểu bài báo ngắn, nêu quan điểm.",
      goalEn: "Understand short articles and share opinions.",
      minutes: 40,
      vocab: [
        { word: "theo tôi", ipa: "/tʰɛːw˧ toj˧/", meaning: "in my opinion", example: "Theo tôi, ý này tốt.", exampleEn: "In my view, this idea is good." },
        { word: "đồng ý", ipa: "/ɗoŋ˨˩ ʔi˧˥/", meaning: "agree", example: "Tôi đồng ý.", exampleEn: "I agree." },
        { word: "phản đối", ipa: "/faːn˧˩˧ ɗoj˧˥/", meaning: "oppose", example: "Anh ấy phản đối.", exampleEn: "He opposes." },
        { word: "kinh tế", ipa: "/kiɲ˧ te˧˥/", meaning: "economy", example: "Kinh tế phát triển.", exampleEn: "The economy grows." },
        { word: "chính phủ", ipa: "/ciɲ˧˥ fu˧˩˧/", meaning: "government", example: "Chính phủ quyết định.", exampleEn: "The government decides." },
        { word: "phát triển", ipa: "/faːt̚˧˥ ʈien˧˩˧/", meaning: "develop", example: "Phát triển bền vững.", exampleEn: "Sustainable development." },
        { word: "vấn đề", ipa: "/vən˧˥ ɗe˨˩/", meaning: "issue", example: "Vấn đề lớn.", exampleEn: "A big issue." },
      ],
      dialogue: [
        { speaker: "Friend", vi: "Anh đọc tin về giá xăng chưa?", en: "Read the news on petrol prices?" },
        { speaker: "You", vi: "Rồi. Theo anh, giá tăng là do kinh tế thế giới.", en: "Yes. Prices rose due to the global economy." },
        { speaker: "Friend", vi: "Em đồng ý một phần thôi. Em nghĩ chính phủ cũng có trách nhiệm.", en: "I only partly agree. I think the government is also responsible." },
        { speaker: "You", vi: "Có lý. Vấn đề này khá phức tạp.", en: "Fair point. This issue is complex." },
      ],
      grammar: [
        {
          title: "Diễn đạt quan điểm",
          titleEn: "Expressing Opinions",
          formula: "Theo tôi / Tôi nghĩ / Tôi cho rằng + [câu]",
          explanation: "Ba cách mở đầu quan điểm, mức trang trọng tăng dần.",
          explanationEn: "Three opinion openers, increasing formality.",
          examples: [
            { vi: "Theo tôi, đây là ý hay.", en: "In my opinion, this is a great idea." },
            { vi: "Tôi cho rằng chúng ta cần thay đổi.", en: "I hold that we must change." },
          ],
        },
        {
          title: "Liên từ nâng cao",
          titleEn: "Advanced Conjunctions",
          formula: "tuy... nhưng... · vì... nên... · mặc dù...",
          explanation: "Kết nối câu phức để nói tự nhiên hơn.",
          explanationEn: "Connect complex clauses to sound more natural.",
          examples: [
            { vi: "Tuy trời mưa nhưng chúng tôi vẫn đi.", en: "Though it rained, we still went." },
            { vi: "Vì bận nên tôi không đến được.", en: "Because I was busy, I couldn't come." },
          ],
        },
      ],
      pronunciationDrill: [
        { word: "chính phủ", ipa: "/ciɲ˧˥ fu˧˩˧/", tip: "Rising + dipping." },
      ],
      drills: [
        { type: "translate", prompt: "In my opinion, the economy will grow.", promptEn: "Translate", answer: "Theo tôi, kinh tế sẽ phát triển." },
      ],
      quiz: [
        { question: "'Although' =", questionEn: "Translate", options: ["vì", "tuy", "nên", "thì"], answer: 1, explanationEn: "'tuy' = although." },
        { question: "Câu nào là ý kiến?", questionEn: "Which is opinion?", options: ["Trời mưa.", "Theo tôi, phim hay.", "Anh đến chưa?", "Hôm nay thứ hai."], answer: 1, explanationEn: "'Theo tôi' = opinion marker." },
      ],
      culturalTip: {
        vi: "Người Việt ít khi phản đối trực tiếp - thường nói 'em đồng ý một phần thôi'.",
        en: "Vietnamese rarely disagree bluntly - soften with 'em đồng ý một phần thôi' (I only partly agree).",
      },
    },
    {
      id: "b1-l3",
      order: 3,
      title: "Sức khỏe & Đi khám bệnh",
      titleEn: "Health & Seeing a Doctor",
      icon: "🩺",
      goal: "Mô tả triệu chứng, đặt lịch khám, mua thuốc.",
      goalEn: "Describe symptoms, book appointments, buy medicine.",
      minutes: 30,
      vocab: [
        { word: "đau đầu", ipa: "/ɗaːw˧ ɗəw˨˩/", meaning: "headache", example: "Tôi bị đau đầu.", exampleEn: "I have a headache." },
        { word: "sốt", ipa: "/sot̚˧˥/", meaning: "fever", example: "Bé bị sốt.", exampleEn: "The baby has a fever." },
        { word: "ho", ipa: "/hɔ˧/", meaning: "cough", example: "Ho nhiều đêm qua.", exampleEn: "Coughing a lot last night." },
        { word: "bác sĩ", ipa: "/ɓaːk̚˧˥ si˧/", meaning: "doctor", example: "Bác sĩ giỏi.", exampleEn: "A good doctor." },
        { word: "đơn thuốc", ipa: "/ɗəːn˧ tʰuok̚˧˥/", meaning: "prescription", example: "Đơn thuốc của bác sĩ.", exampleEn: "The doctor's prescription." },
        { word: "bệnh viện", ipa: "/ɓeɲ˧ˀ˨ vien˧ˀ˨/", meaning: "hospital", example: "Đi bệnh viện.", exampleEn: "Go to the hospital." },
        { word: "hiệu thuốc", ipa: "/hieu˧ˀ˨ tʰuok̚˧˥/", meaning: "pharmacy", example: "Ghé hiệu thuốc.", exampleEn: "Stop by the pharmacy." },
      ],
      dialogue: [
        { speaker: "Doctor", vi: "Anh bị làm sao?", en: "What's wrong?" },
        { speaker: "You", vi: "Dạ, em bị đau đầu và sốt hai ngày rồi.", en: "I've had a headache and fever for two days." },
        { speaker: "Doctor", vi: "Có ho không?", en: "Any cough?" },
        { speaker: "You", vi: "Có một chút ạ.", en: "A little." },
        { speaker: "Doctor", vi: "Tôi kê đơn thuốc. Anh uống ngày ba lần sau ăn.", en: "I'll prescribe medicine. Take it three times daily after meals." },
      ],
      grammar: [
        {
          title: "Cấu trúc 'bị + bệnh'",
          titleEn: "'bị' + illness",
          formula: "S + bị + [bệnh/triệu chứng]",
          explanation: "'bị' dùng cho bệnh, chấn thương (điều tiêu cực xảy đến).",
          explanationEn: "'bị' for illnesses/injuries (negative things happening to you).",
          examples: [
            { vi: "Tôi bị cảm.", en: "I have a cold." },
            { vi: "Cô ấy bị gãy tay.", en: "She broke her arm." },
          ],
        },
      ],
      pronunciationDrill: [
        { word: "bệnh viện", ipa: "/ɓeɲ˧ˀ˨ vien˧ˀ˨/", tip: "Double heavy tones - drop pitch both syllables." },
      ],
      drills: [
        { type: "translate", prompt: "I have a fever.", promptEn: "Translate", answer: "Tôi bị sốt." },
      ],
      quiz: [
        { question: "'I have a headache' =", questionEn: "Translate", options: ["Tôi được đau đầu.", "Tôi bị đau đầu.", "Tôi có đau đầu.", "Tôi là đau đầu."], answer: 1, explanationEn: "Illness = 'bị'." },
      ],
      culturalTip: {
        vi: "Ở VN có thể mua nhiều thuốc không cần đơn tại hiệu thuốc - nhưng nên hỏi bác sĩ.",
        en: "Many meds in VN are sold without prescription at pharmacies - but ask a doctor first.",
      },
    },
    {
      id: "b1-l4",
      order: 4,
      title: "Kể chuyện quá khứ & tương lai",
      titleEn: "Storytelling: Past & Future",
      icon: "🗓️",
      goal: "Kể trải nghiệm, dự định bằng đã/đang/sẽ và mệnh đề quan hệ.",
      goalEn: "Narrate experiences and plans with tense markers and relative clauses.",
      minutes: 35,
      vocab: [
        { word: "đã", ipa: "/ɗaː˧ˀ˥/", meaning: "past marker", example: "Tôi đã đi.", exampleEn: "I went." },
        { word: "đang", ipa: "/ɗaːŋ˧/", meaning: "progressive", example: "Đang ăn.", exampleEn: "Eating (now)." },
        { word: "sẽ", ipa: "/sɛ˧˩˧/", meaning: "future", example: "Tôi sẽ đến.", exampleEn: "I will come." },
        { word: "mà", ipa: "/maː˨˩/", meaning: "that/which (relative)", example: "Người mà tôi gặp.", exampleEn: "The person that I met." },
        { word: "kỷ niệm", ipa: "/ki˧˩˧ niem˨˩/", meaning: "memory", example: "Kỷ niệm đẹp.", exampleEn: "A nice memory." },
        { word: "kế hoạch", ipa: "/ke˧˥ hwaːʨ̚˧˨/", meaning: "plan", example: "Kế hoạch của tôi.", exampleEn: "My plan." },
      ],
      dialogue: [
        { speaker: "Friend", vi: "Cuối tuần rồi anh đã làm gì?", en: "What did you do last weekend?" },
        { speaker: "You", vi: "Anh đã đi Đà Lạt với mấy người bạn mà anh quen ở phòng gym.", en: "I went to Da Lat with friends I met at the gym." },
        { speaker: "Friend", vi: "Hay quá! Tuần sau anh có kế hoạch gì không?", en: "Cool! Any plans next week?" },
        { speaker: "You", vi: "Anh sẽ ra Hà Nội công tác ba ngày.", en: "I'll travel to Hanoi for work for three days." },
      ],
      grammar: [
        {
          title: "Dấu hiệu thì: đã / đang / sẽ",
          titleEn: "Tense markers: đã / đang / sẽ",
          formula: "S + [đã/đang/sẽ] + V",
          explanation: "Không chia động từ - chỉ thêm dấu hiệu trước động từ.",
          explanationEn: "No verb conjugation - just add a marker before the verb.",
          examples: [
            { vi: "Tôi đã ăn.", en: "I ate." },
            { vi: "Tôi đang ăn.", en: "I am eating." },
            { vi: "Tôi sẽ ăn.", en: "I will eat." },
          ],
        },
        {
          title: "Mệnh đề quan hệ với 'mà'",
          titleEn: "Relative clauses with 'mà'",
          formula: "[N] + mà + [S + V]",
          explanation: "'mà' = which/that/whom, nối danh từ với mệnh đề mô tả.",
          explanationEn: "'mà' = which/that/whom, links a noun to a describing clause.",
          examples: [
            { vi: "Cuốn sách mà em tặng anh.", en: "The book that you gave me." },
            { vi: "Người mà tôi yêu.", en: "The person whom I love." },
          ],
        },
      ],
      pronunciationDrill: [
        { word: "đã / đang / sẽ", ipa: "3 tense markers", tip: "Sharp broken · level · dipping." },
      ],
      drills: [
        { type: "translate", prompt: "The friend that I met yesterday is kind.", promptEn: "Translate", answer: "Người bạn mà tôi gặp hôm qua rất tốt." },
      ],
      quiz: [
        { question: "'I will go' =", questionEn: "Translate", options: ["Tôi đã đi.", "Tôi đang đi.", "Tôi sẽ đi.", "Tôi đi rồi."], answer: 2, explanationEn: "'sẽ' = future." },
        { question: "'The book that I read':", questionEn: "Translate", options: ["Sách tôi đọc mà", "Sách mà tôi đọc", "Mà sách tôi đọc", "Tôi đọc mà sách"], answer: 1, explanationEn: "[N] + mà + [S+V]." },
      ],
      culturalTip: {
        vi: "Trong hội thoại thân mật, người Việt hay bỏ 'đã' và dùng ngữ cảnh để hiểu thì.",
        en: "In casual talk, Vietnamese often drop 'đã' and rely on context for tense.",
      },
    },
    {
      id: "b1-l5",
      order: 5,
      title: "Đàm phán & Giải quyết mâu thuẫn",
      titleEn: "Negotiation & Conflict Resolution",
      icon: "🤝",
      goal: "Từ chối lịch sự, đề xuất giải pháp, xin lỗi.",
      goalEn: "Politely decline, propose solutions, apologize.",
      minutes: 30,
      vocab: [
        { word: "xin lỗi", ipa: "/sin˧ loj˧ˀ˥/", meaning: "sorry", example: "Xin lỗi anh nhé.", exampleEn: "I'm sorry." },
        { word: "thông cảm", ipa: "/tʰoŋ˧ kaːm˧˩˧/", meaning: "understand/empathize", example: "Mong anh thông cảm.", exampleEn: "Please understand." },
        { word: "e rằng", ipa: "/ʔɛ˧ raŋ˨˩/", meaning: "I'm afraid that", example: "E rằng không được.", exampleEn: "I'm afraid it won't work." },
        { word: "giải pháp", ipa: "/zaːj˧˩˧ faːp̚˧˥/", meaning: "solution", example: "Có giải pháp không?", exampleEn: "Any solution?" },
        { word: "thay vào đó", ipa: "/tʰaːj˧ vaːw˨˩ ɗɔ˧˥/", meaning: "instead", example: "Thay vào đó, ta làm...", exampleEn: "Instead, let's..." },
      ],
      dialogue: [
        { speaker: "Client", vi: "Mai chúng tôi cần bản demo được không?", en: "Can we have the demo tomorrow?" },
        { speaker: "You", vi: "Dạ, e rằng mai hơi gấp. Mong anh thông cảm.", en: "I'm afraid tomorrow is too tight. Please understand." },
        { speaker: "Client", vi: "Vậy khi nào có?", en: "When then?" },
        { speaker: "You", vi: "Thay vào đó, thứ năm em gửi bản đầy đủ được không ạ?", en: "Instead, could I send the full version on Thursday?" },
        { speaker: "Client", vi: "Được. Cảm ơn.", en: "OK. Thanks." },
      ],
      grammar: [
        {
          title: "Từ chối lịch sự",
          titleEn: "Polite Refusal",
          formula: "'E rằng...' / 'Xin lỗi, hiện tại...' / 'Mong anh/chị thông cảm.'",
          explanation: "Không bao giờ nói 'Không' thẳng - dùng đệm và giải thích.",
          explanationEn: "Never say a flat 'No' - use softeners and reasons.",
          examples: [
            { vi: "E rằng em không tham gia được.", en: "I'm afraid I can't join." },
            { vi: "Xin lỗi, hiện tại em bận. Mong anh thông cảm.", en: "Sorry, I'm currently busy. Please understand." },
          ],
        },
      ],
      pronunciationDrill: [
        { word: "thông cảm", ipa: "/tʰoŋ˧ kaːm˧˩˧/", tip: "Level → dipping - keep 'cảm' clearly falling-rising." },
      ],
      drills: [
        { type: "translate", prompt: "I'm afraid I can't attend.", promptEn: "Polite refusal", answer: "E rằng em không tham gia được." },
      ],
      quiz: [
        { question: "Cách từ chối lịch sự nhất:", questionEn: "Most polite refusal:", options: ["Không.", "E rằng em không được.", "Đừng nói nữa.", "Tôi bận."], answer: 1, explanationEn: "Softener + reason = polite." },
      ],
      culturalTip: {
        vi: "Người Việt tránh mất mặt - luôn để người kia có 'đường lui'.",
        en: "Vietnamese avoid face-loss - always give the other party a face-saving exit.",
      },
    },
  ],
  checkpoint: [
    { question: "Bị động tích cực dùng:", questionEn: "Positive passive uses:", options: ["bị", "được", "đã", "sẽ"], answer: 1, explanationEn: "'được' = positive passive." },
    { question: "'If it rains, I stay home' =", questionEn: "Translate", options: ["Nếu trời mưa thì tôi ở nhà.", "Vì trời mưa nên tôi ở nhà.", "Tuy trời mưa nhưng tôi ở nhà.", "Trời mưa mà tôi ở nhà."], answer: 0, explanationEn: "'Nếu... thì...' = conditional." },
    { question: "'The friend whom I met':", questionEn: "Translate", options: ["Bạn tôi gặp mà", "Bạn mà tôi gặp", "Mà bạn tôi gặp", "Tôi gặp bạn mà"], answer: 1, explanationEn: "[N] + mà + [S+V]." },
    { question: "'In my opinion' =", questionEn: "Opinion opener", options: ["Bởi vì", "Theo tôi", "Tuy nhiên", "Mặc dù"], answer: 1, explanationEn: "'Theo tôi' = in my view." },
    { question: "'I got promoted' =", questionEn: "Passive positive", options: ["Tôi bị thăng chức.", "Tôi được thăng chức.", "Tôi thăng chức bị.", "Tôi thăng chức đã."], answer: 1, explanationEn: "Promotion is positive → 'được'." },
    { question: "'Instead' =", questionEn: "Translate", options: ["Thay vào đó", "Vì vậy", "Nếu vậy", "Do đó"], answer: 0, explanationEn: "'Thay vào đó' = instead." },
    { question: "Formal email opener:", questionEn: "Formal open:", options: ["Chào", "Kính gửi", "Hey", "Alo"], answer: 1, explanationEn: "'Kính gửi' = Dear (formal)." },
    { question: "'I have a fever' uses:", questionEn: "Illness marker", options: ["được", "bị", "có", "là"], answer: 1, explanationEn: "'bị' for illness." },
    { question: "'Although' =", questionEn: "Translate", options: ["nếu", "tuy", "vì", "nên"], answer: 1, explanationEn: "'tuy' = although." },
    { question: "'I will go' =", questionEn: "Future", options: ["đi đã", "đang đi", "sẽ đi", "đi rồi"], answer: 2, explanationEn: "'sẽ' = future marker." },
  ],
};

/** Add varied retrieval practice without changing stable lesson IDs. */
export const ensureFiveLessonQuizzes = (level: VFFLevel): VFFLevel => {
  level.lessons.forEach((lesson) => {
    let vocabIndex = 0;
    while (lesson.quiz.length < 5 && lesson.vocab.length >= 4) {
      const target = lesson.vocab[vocabIndex % lesson.vocab.length];
      const distractors = lesson.vocab
        .filter((item) => item.word !== target.word)
        .slice(vocabIndex + 1)
        .concat(lesson.vocab.filter((item) => item.word !== target.word).slice(0, vocabIndex + 1))
        .slice(0, 3)
        .map((item) => item.meaning);
      const answer = vocabIndex % 4;
      const options = [...distractors];
      options.splice(answer, 0, target.meaning);
      lesson.quiz.push({
        question: `“${target.word}” có nghĩa là gì?`,
        questionEn: `What does “${target.word}” mean?`,
        options,
        answer,
        explanation: `“${target.word}” có nghĩa là “${target.meaning}”.`,
        explanationEn: `“${target.word}” means “${target.meaning}”.`,
      });
      vocabIndex += 1;
    }
  });
  return level;
};

ensureFiveLessonQuizzes(vffLevelA1);
ensureFiveLessonQuizzes(vffLevelB1);

export const vffLevels = { a1: vffLevelA1, b1: vffLevelB1 };
