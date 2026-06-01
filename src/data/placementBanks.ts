/**
 * @file placementBanks.ts
 * @description Subject-specific CEFR placement banks. Each bank reuses the
 *   item-type schema defined in `placementTest.ts` so the existing
 *   `QuestionRenderer` works for every subject without changes.
 *
 *   Subjects:
 *     - english     → full 40-Q CEFR bank (re-exports PLACEMENT_TEST)
 *     - chinese     → 18 Q, Pinyin + Hanzi, HSK 1-5 progression
 *     - vietnamese  → 18 Q, A1-C1 Vietnamese for learners
 *     - finnish     → 18 Q, A1-B2 Finnish (YKI-aligned)
 *     - programming → 18 Q, Python / SQL / AI fundamentals
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { PLACEMENT_TEST, type PlacementQuestion } from "./placementTest";

export type PlacementSubject =
  | "english" | "chinese" | "vietnamese" | "finnish" | "programming";

export interface SubjectMeta {
  title: string;
  subtitle: string;
  speakLang: string;        // BCP-47 tag passed to SpeechSynthesisUtterance
}

export const SUBJECT_META: Record<PlacementSubject, SubjectMeta> = {
  english: {
    title: "English Placement Test",
    subtitle: "40 adaptive questions · Listening · Reading · Writing · Speaking",
    speakLang: "en-US",
  },
  chinese: {
    title: "Chinese Placement Test (HSK 1-5)",
    subtitle: "18 questions · Hanzi · Pinyin · Listening · Speaking",
    speakLang: "zh-CN",
  },
  vietnamese: {
    title: "Vietnamese Placement Test",
    subtitle: "18 questions · Pronunciation · Reading · Writing · Speaking",
    speakLang: "vi-VN",
  },
  finnish: {
    title: "Finnish Placement Test (YKI A1-B2)",
    subtitle: "18 questions · Kuuntelu · Luku · Kirjoitus · Puhuminen",
    speakLang: "fi-FI",
  },
  programming: {
    title: "Programming Placement Test",
    subtitle: "18 questions · Python · SQL · Logic · AI Fundamentals",
    speakLang: "en-US",
  },
};

/* ── Chinese 18 Q ───────────────────────────────────────────────────── */
const CHINESE: PlacementQuestion[] = [
  { id: 101, skill: "listening", cefr: "A1", type: "listen-image",
    prompt: "Choose the matching picture.", audioText: "苹果", correct: 0,
    options: [
      { emoji: "🍎", label: "苹果 / Apple" }, { emoji: "🍌", label: "香蕉 / Banana" },
      { emoji: "🐱", label: "猫 / Cat" }, { emoji: "🚗", label: "车 / Car" },
    ]},
  { id: 102, skill: "listening", cefr: "A1", type: "listen-image",
    prompt: "Choose the matching picture.", audioText: "你好,我叫小明。", correct: 2,
    options: [
      { emoji: "🍜", label: "面 / Noodles" }, { emoji: "🐶", label: "狗 / Dog" },
      { emoji: "👋", label: "你好 / Hello" }, { emoji: "🏫", label: "学校 / School" },
    ]},
  { id: 103, skill: "listening", cefr: "A2", type: "listen-mcq",
    prompt: "What time does she go to school?",
    audioText: "她每天早上七点半去学校。",
    options: ["7:00", "7:15", "7:30", "8:00"], correct: 2 },
  { id: 104, skill: "listening", cefr: "B1", type: "listen-mcq",
    prompt: "What is the speaker doing this weekend?",
    audioText: "这个周末我打算和朋友去爬山,然后一起吃晚饭。",
    options: ["Study at the library", "Climb a mountain with friends", "Go shopping alone", "Stay home and rest"], correct: 1 },

  { id: 105, skill: "reading", cefr: "A1", type: "read-mcq",
    prompt: "我 ___ 学生。", options: ["是", "在", "有", "去"], correct: 0 },
  { id: 106, skill: "reading", cefr: "A1", type: "read-mcq",
    prompt: "今天 ___ 星期一。", options: ["有", "是", "在", "和"], correct: 1 },
  { id: 107, skill: "reading", cefr: "A2", type: "read-mcq",
    prompt: "他比我 ___ 高。", options: ["很", "更", "也", "都"], correct: 1 },
  { id: 108, skill: "reading", cefr: "A2", type: "read-mcq",
    prompt: "Pinyin for 朋友 is:", options: ["péng yǒu", "péng yòu", "běn yǒu", "míng yǒu"], correct: 0 },
  { id: 109, skill: "reading", cefr: "B1", type: "read-cloze",
    prompt: "Choose the best word for each blank.",
    paragraph: "很多年轻人[[0]]去外国学习,因为他们[[1]]学到新的[[2]]。",
    choices: [["想","让","给"],["可以","能够","应该"],["东西","知识","事情"]],
    correct: [0,0,1] },
  { id: 110, skill: "reading", cefr: "B2", type: "read-analytical",
    prompt: "What is the author's main point?",
    passage: "随着人工智能的发展,越来越多的中国学生开始把编程作为基础技能学习。专家认为,学会与机器合作比单纯记忆知识更重要,因为信息可以查阅,但思维方式必须长期培养。",
    options: [
      "Programming will replace traditional education",
      "Memorising knowledge is more important than thinking",
      "Learning to collaborate with AI is a vital long-term skill",
      "Chinese students prefer not to study programming"], correct: 2 },

  { id: 111, skill: "writing", cefr: "A1", type: "write-scramble",
    prompt: "Re-order the words into a correct Chinese sentence.",
    tokens: ["我","学生","是"], answer: "我是学生" },
  { id: 112, skill: "writing", cefr: "A2", type: "write-scramble",
    prompt: "Re-order the words into a correct Chinese sentence.",
    tokens: ["昨天","我","去","公园","了"], answer: "我昨天去公园了" },
  { id: 113, skill: "writing", cefr: "B1", type: "write-picture",
    prompt: "Write one Chinese sentence describing the picture.",
    emoji: "🍜🥢", hint: "Mention what you are eating and where.", minWords: 6 },
  { id: 114, skill: "writing", cefr: "B2", type: "write-essay",
    prompt: "请用中文写一段话,介绍你最喜欢的中国城市和原因。(60-100字)",
    minWords: 60, maxWords: 100 },

  { id: 115, skill: "speaking", cefr: "A1", type: "speak-read",
    prompt: "Read the sentence aloud in Chinese.",
    text: "你好,我叫小明,很高兴认识你。" },
  { id: 116, skill: "speaking", cefr: "A2", type: "speak-read",
    prompt: "Read the sentence aloud in Chinese.",
    text: "我每天早上喝咖啡,然后去上班。" },
  { id: 117, skill: "speaking", cefr: "B1", type: "speak-reply",
    prompt: "Listen to the question, then reply in Chinese within 30 seconds.",
    audioText: "请介绍一下你的家乡。", seconds: 30 },
  { id: 118, skill: "speaking", cefr: "B2", type: "speak-present",
    prompt: "Speak about your favourite Chinese food. Prepare for 30 seconds, then present for 60 seconds.",
    prepSeconds: 30, recordSeconds: 60 },
];

/* ── Vietnamese 18 Q ────────────────────────────────────────────────── */
const VIETNAMESE: PlacementQuestion[] = [
  { id: 201, skill: "listening", cefr: "A1", type: "listen-image",
    prompt: "Choose the matching picture.", audioText: "Quả táo.", correct: 0,
    options: [
      { emoji: "🍎", label: "Quả táo" }, { emoji: "🍌", label: "Quả chuối" },
      { emoji: "🐱", label: "Con mèo" }, { emoji: "🚗", label: "Xe hơi" },
    ]},
  { id: 202, skill: "listening", cefr: "A1", type: "listen-image",
    prompt: "Where is the speaker going?", audioText: "Tôi đang đi đến trường.", correct: 1,
    options: [
      { emoji: "🏥", label: "Bệnh viện" }, { emoji: "🏫", label: "Trường học" },
      { emoji: "🏬", label: "Siêu thị" }, { emoji: "✈️", label: "Sân bay" },
    ]},
  { id: 203, skill: "listening", cefr: "A2", type: "listen-mcq",
    prompt: "Buổi họp bắt đầu lúc mấy giờ?",
    audioText: "Cuộc họp đã được dời từ ba giờ sang bốn giờ rưỡi chiều nay.",
    options: ["3 giờ", "3 giờ 30", "4 giờ", "4 giờ 30"], correct: 3 },
  { id: 204, skill: "listening", cefr: "B1", type: "listen-mcq",
    prompt: "Người nói khuyên điều gì?",
    audioText: "Báo cáo của bạn khá đầy đủ, nhưng tôi nghĩ bạn nên rút gọn phần kết luận và thêm hai biểu đồ trước khi gửi cho khách hàng.",
    options: ["Viết lại toàn bộ báo cáo", "Thêm biểu đồ và sửa phần kết luận", "Gửi ngay không sửa", "Đổi tất cả biểu đồ"], correct: 1 },

  { id: 205, skill: "reading", cefr: "A1", type: "read-mcq",
    prompt: "Tôi ___ học sinh.", options: ["là", "có", "đi", "ăn"], correct: 0 },
  { id: 206, skill: "reading", cefr: "A1", type: "read-mcq",
    prompt: "Hôm nay trời ___ đẹp.", options: ["rất", "rất là", "lắm", "quá"], correct: 0 },
  { id: 207, skill: "reading", cefr: "A2", type: "read-mcq",
    prompt: "Anh ấy cao ___ tôi.", options: ["bằng", "hơn", "nhất", "như"], correct: 1 },
  { id: 208, skill: "reading", cefr: "A2", type: "read-mcq",
    prompt: "Choose the correct diacritic spelling for the word meaning \"mother\":",
    options: ["me", "mẹ", "mè", "mê"], correct: 1 },
  { id: 209, skill: "reading", cefr: "B1", type: "read-cloze",
    prompt: "Choose the best word for each blank.",
    paragraph: "Nhiều sinh viên Việt Nam [[0]] ra nước ngoài hàng năm để [[1]] một nền giáo dục [[2]] hơn.",
    choices: [["đi","ở","về"],["tìm","có","thấy"],["tốt","xấu","cũ"]],
    correct: [0,0,0] },
  { id: 210, skill: "reading", cefr: "B2", type: "read-analytical",
    prompt: "Ý chính của đoạn văn là gì?",
    passage: "Sự phát triển của công nghệ đã thay đổi cách người Việt học ngoại ngữ. Trước đây, học viên phải dựa hoàn toàn vào giáo viên trên lớp; ngày nay họ có thể luyện phát âm với AI bất cứ lúc nào. Tuy nhiên, các chuyên gia nhấn mạnh rằng công cụ chỉ thực sự hiệu quả khi đi kèm với phương pháp học có kỷ luật.",
    options: [
      "AI sẽ thay thế hoàn toàn giáo viên",
      "Công nghệ chỉ hiệu quả khi đi cùng kỷ luật học tập",
      "Người Việt không cần học ngoại ngữ nữa",
      "Phương pháp truyền thống là tốt nhất"], correct: 1 },

  { id: 211, skill: "writing", cefr: "A1", type: "write-scramble",
    prompt: "Sắp xếp các từ thành câu đúng.",
    tokens: ["Tôi","tên","là","Linh"], answer: "Tôi tên là Linh" },
  { id: 212, skill: "writing", cefr: "A2", type: "write-scramble",
    prompt: "Sắp xếp các từ thành câu đúng.",
    tokens: ["Hôm","qua","tôi","đi","xem","phim"], answer: "Hôm qua tôi đi xem phim" },
  { id: 213, skill: "writing", cefr: "B1", type: "write-picture",
    prompt: "Viết một câu tiếng Việt mô tả bức tranh.",
    emoji: "🍜👩‍🍳", hint: "Nói về món ăn và người nấu.", minWords: 7 },
  { id: 214, skill: "writing", cefr: "B2", type: "write-essay",
    prompt: "Hãy viết một đoạn văn ngắn về một địa danh Việt Nam bạn yêu thích và lý do. (80-120 từ)",
    minWords: 80, maxWords: 120 },

  { id: 215, skill: "speaking", cefr: "A1", type: "speak-read",
    prompt: "Đọc to câu sau bằng tiếng Việt.",
    text: "Gia đình tôi sống trong một ngôi nhà nhỏ gần sông." },
  { id: 216, skill: "speaking", cefr: "A2", type: "speak-read",
    prompt: "Đọc to câu sau bằng tiếng Việt.",
    text: "Cuối tuần tôi thường gặp bạn bè và cùng nhau chơi bóng đá." },
  { id: 217, skill: "speaking", cefr: "B1", type: "speak-reply",
    prompt: "Nghe câu hỏi rồi trả lời bằng tiếng Việt trong 30 giây.",
    audioText: "Hãy mô tả sở thích yêu thích của bạn và giải thích vì sao bạn thích nó.",
    seconds: 30 },
  { id: 218, skill: "speaking", cefr: "B2", type: "speak-present",
    prompt: "Trình bày bằng tiếng Việt về một truyền thống Việt Nam mà bạn yêu thích. Chuẩn bị 30 giây, trình bày 60 giây.",
    prepSeconds: 30, recordSeconds: 60 },
];

/* ── Finnish 18 Q ───────────────────────────────────────────────────── */
const FINNISH: PlacementQuestion[] = [
  { id: 301, skill: "listening", cefr: "A1", type: "listen-image",
    prompt: "Valitse oikea kuva.", audioText: "Omena.", correct: 0,
    options: [
      { emoji: "🍎", label: "Omena" }, { emoji: "🍌", label: "Banaani" },
      { emoji: "🐱", label: "Kissa" }, { emoji: "🚗", label: "Auto" },
    ]},
  { id: 302, skill: "listening", cefr: "A1", type: "listen-image",
    prompt: "Mihin puhuja menee?", audioText: "Minä menen kouluun.", correct: 1,
    options: [
      { emoji: "🏥", label: "Sairaala" }, { emoji: "🏫", label: "Koulu" },
      { emoji: "🏬", label: "Kauppa" }, { emoji: "✈️", label: "Lentokenttä" },
    ]},
  { id: 303, skill: "listening", cefr: "A2", type: "listen-mcq",
    prompt: "Mihin aikaan kokous alkaa?",
    audioText: "Kokous siirrettiin kolmesta puoli viiteen iltapäivällä.",
    options: ["15:00", "15:30", "16:00", "16:30"], correct: 3 },
  { id: 304, skill: "listening", cefr: "B1", type: "listen-mcq",
    prompt: "Mitä puhuja suosittelee?",
    audioText: "Raporttisi on hyvä, mutta ehdotan että lyhennät loppupäätelmää ja lisäät pari kaaviota ennen lähettämistä.",
    options: ["Kirjoita raportti uudelleen", "Lisää kaavioita ja muokkaa loppupäätelmää", "Lähetä raportti heti", "Vaihda kaikki kaaviot"], correct: 1 },

  { id: 305, skill: "reading", cefr: "A1", type: "read-mcq",
    prompt: "Minä ___ opiskelija.", options: ["olen", "on", "olet", "ovat"], correct: 0 },
  { id: 306, skill: "reading", cefr: "A1", type: "read-mcq",
    prompt: "Tänään ___ maanantai.", options: ["olen", "on", "olet", "ovat"], correct: 1 },
  { id: 307, skill: "reading", cefr: "A2", type: "read-mcq",
    prompt: "Hän on ___ kuin minä.", options: ["pitkä", "pidempi", "pisin", "pitkin"], correct: 1 },
  { id: 308, skill: "reading", cefr: "A2", type: "read-mcq",
    prompt: "Choose the correct partitive form of \"kahvi\":",
    options: ["kahvi", "kahvia", "kahvin", "kahvilla"], correct: 1 },
  { id: 309, skill: "reading", cefr: "B1", type: "read-cloze",
    prompt: "Valitse paras sana jokaiseen aukkoon.",
    paragraph: "Monet nuoret opiskelijat [[0]] ulkomaille joka vuosi [[1]] paremman koulutuksen ja laajempien [[2]] vuoksi.",
    choices: [["menevät","menee","mennä"],["etsiäkseen","etsivät","etsi"],["kokemusten","kokemus","kokemuksia"]],
    correct: [0,0,0] },
  { id: 310, skill: "reading", cefr: "B2", type: "read-analytical",
    prompt: "Mikä on kirjoittajan pääväite?",
    passage: "Suomalainen koulutusjärjestelmä on tunnettu tasa-arvoisuudestaan. Sen sijaan että oppilaita arvosteltaisiin ankarasti, opettajat keskittyvät jokaisen lapsen yksilölliseen kehitykseen. Tutkimukset osoittavat, että tämä lähestymistapa tuottaa pitkällä aikavälillä parempia oppimistuloksia kuin kilpailuun perustuvat järjestelmät.",
    options: [
      "Suomi käyttää erittäin kilpailullista järjestelmää",
      "Yksilöllinen tuki johtaa parempiin pitkäaikaistuloksiin",
      "Opettajat arvostelevat oppilaita ankarasti",
      "Tasa-arvo ei vaikuta oppimiseen"], correct: 1 },

  { id: 311, skill: "writing", cefr: "A1", type: "write-scramble",
    prompt: "Järjestä sanat oikeaksi lauseeksi.",
    tokens: ["Minun","nimeni","on","Linh"], answer: "Minun nimeni on Linh" },
  { id: 312, skill: "writing", cefr: "A2", type: "write-scramble",
    prompt: "Järjestä sanat oikeaksi lauseeksi.",
    tokens: ["Eilen","minä","menin","elokuviin"], answer: "Eilen minä menin elokuviin" },
  { id: 313, skill: "writing", cefr: "B1", type: "write-picture",
    prompt: "Kirjoita yksi suomenkielinen lause kuvasta.",
    emoji: "❄️⛷️", hint: "Kerro säästä ja toiminnasta.", minWords: 6 },
  { id: 314, skill: "writing", cefr: "B2", type: "write-essay",
    prompt: "Kirjoita lyhyt teksti lempipaikastasi Suomessa ja perustele valintasi. (60-100 sanaa)",
    minWords: 60, maxWords: 100 },

  { id: 315, skill: "speaking", cefr: "A1", type: "speak-read",
    prompt: "Lue lause ääneen suomeksi.",
    text: "Perheeni asuu pienessä talossa joen lähellä." },
  { id: 316, skill: "speaking", cefr: "A2", type: "speak-read",
    prompt: "Lue lause ääneen suomeksi.",
    text: "Viikonloppuisin tapaan yleensä ystäviäni ja pelaamme jalkapalloa yhdessä." },
  { id: 317, skill: "speaking", cefr: "B1", type: "speak-reply",
    prompt: "Kuuntele kysymys ja vastaa suomeksi 30 sekunnissa.",
    audioText: "Kuvaile lempiharrastustasi ja kerro miksi pidät siitä.",
    seconds: 30 },
  { id: 318, skill: "speaking", cefr: "B2", type: "speak-present",
    prompt: "Puhu suomeksi siitä, miksi haluat opiskella tai työskennellä Suomessa. Valmistaudu 30 sekuntia, puhu 60 sekuntia.",
    prepSeconds: 30, recordSeconds: 60 },
];

/* ── Programming 18 Q ───────────────────────────────────────────────── */
const PROGRAMMING: PlacementQuestion[] = [
  { id: 401, skill: "listening", cefr: "A1", type: "listen-image",
    prompt: "Pick the icon that best matches what you hear.",
    audioText: "A database table.", correct: 1,
    options: [
      { emoji: "📁", label: "Folder" }, { emoji: "🗃️", label: "Database" },
      { emoji: "🖼️", label: "Image" }, { emoji: "🎵", label: "Audio" },
    ]},
  { id: 402, skill: "listening", cefr: "A2", type: "listen-image",
    prompt: "Which concept is the speaker describing?",
    audioText: "A reusable block of code that takes inputs and returns an output.",
    correct: 2,
    options: [
      { emoji: "🧱", label: "Variable" }, { emoji: "🔁", label: "Loop" },
      { emoji: "⚙️", label: "Function" }, { emoji: "🧪", label: "Test" },
    ]},
  { id: 403, skill: "listening", cefr: "B1", type: "listen-mcq",
    prompt: "What is the bug being described?",
    audioText: "Our service crashes whenever a user submits a form without filling in the email field — it throws a null reference error before validation runs.",
    options: ["Network timeout", "Missing null check before validation", "Wrong database driver", "Race condition in the UI"],
    correct: 1 },
  { id: 404, skill: "listening", cefr: "B2", type: "listen-mcq",
    prompt: "Which architectural improvement is suggested?",
    audioText: "The monolith handles everything synchronously, so I'd recommend extracting the email pipeline into a background worker that consumes a message queue.",
    options: ["Add more database indexes", "Move email sending to a queued worker", "Switch from REST to GraphQL", "Rewrite the front-end in Vue"],
    correct: 1 },

  { id: 405, skill: "reading", cefr: "A1", type: "read-mcq",
    prompt: "Which value is a Python string?",
    options: ["42", "True", "\"hello\"", "[1, 2]"], correct: 2 },
  { id: 406, skill: "reading", cefr: "A1", type: "read-mcq",
    prompt: "What does `len([1, 2, 3])` return in Python?",
    options: ["2", "3", "6", "Error"], correct: 1 },
  { id: 407, skill: "reading", cefr: "A2", type: "read-mcq",
    prompt: "Which SQL clause filters rows?",
    options: ["GROUP BY", "WHERE", "ORDER BY", "JOIN"], correct: 1 },
  { id: 408, skill: "reading", cefr: "A2", type: "read-mcq",
    prompt: "What is the output of `print(2 ** 3)` in Python?",
    options: ["5", "6", "8", "9"], correct: 2 },
  { id: 409, skill: "reading", cefr: "B1", type: "read-cloze",
    prompt: "Complete the Python function.",
    paragraph: "def square(x):\n    [[0]] x [[1]] x\n\nresult = square([[2]])",
    choices: [["return","print","yield"],["*","+","-"],["3","\"3\"","[3]"]],
    correct: [0,0,0] },
  { id: 410, skill: "reading", cefr: "B2", type: "read-analytical",
    prompt: "Which statement best summarises the passage?",
    passage: "Supervised learning models learn from labelled examples, mapping inputs to known outputs. Their accuracy depends heavily on the quality and breadth of the training data; biased or narrow datasets cause the model to generalise poorly to unseen inputs. Practitioners therefore invest as much time curating data as tuning hyperparameters.",
    options: [
      "Model accuracy depends only on hyperparameter tuning",
      "Data quality is as critical as algorithm tuning for supervised learning",
      "Unsupervised learning needs labelled data",
      "Bias in datasets has no effect on generalisation"], correct: 1 },

  { id: 411, skill: "writing", cefr: "A1", type: "write-scramble",
    prompt: "Re-order the tokens into a valid Python statement.",
    tokens: ["x","=","10"], answer: "x = 10" },
  { id: 412, skill: "writing", cefr: "A2", type: "write-scramble",
    prompt: "Re-order the tokens into a valid SQL query.",
    tokens: ["SELECT","name","FROM","users"], answer: "SELECT name FROM users" },
  { id: 413, skill: "writing", cefr: "B1", type: "write-picture",
    prompt: "Describe what this pipeline does in one sentence.",
    emoji: "📥➡️🧠➡️📤", hint: "Mention input, model, and output.", minWords: 8 },
  { id: 414, skill: "writing", cefr: "B2", type: "write-essay",
    prompt: "Explain in 80-120 words how you would design a simple recommendation system for an online bookstore. Mention data, model, and evaluation.",
    minWords: 80, maxWords: 120 },

  { id: 415, skill: "speaking", cefr: "A1", type: "speak-read",
    prompt: "Read this code aloud, naming each operator clearly.",
    text: "if x is greater than ten, print x times two." },
  { id: 416, skill: "speaking", cefr: "A2", type: "speak-read",
    prompt: "Read this sentence aloud.",
    text: "A function in Python is defined using the keyword def followed by a name and parentheses." },
  { id: 417, skill: "speaking", cefr: "B1", type: "speak-reply",
    prompt: "Listen and answer within 30 seconds.",
    audioText: "Explain in your own words the difference between a list and a dictionary in Python.",
    seconds: 30 },
  { id: 418, skill: "speaking", cefr: "B2", type: "speak-present",
    prompt: "Present a project you would build with AI. Prepare for 30 seconds, present for 60 seconds.",
    prepSeconds: 30, recordSeconds: 60 },
];

/** Resolve the bank for a given subject. Falls back to the full English bank. */
export function getPlacementBank(subject: PlacementSubject): PlacementQuestion[] {
  switch (subject) {
    case "chinese": return CHINESE;
    case "vietnamese": return VIETNAMESE;
    case "finnish": return FINNISH;
    case "programming": return PROGRAMMING;
    case "english":
    default: return PLACEMENT_TEST;
  }
}

/** Normalise an unknown query string into a valid subject. */
export function parseSubject(raw: string | null | undefined): PlacementSubject {
  const v = (raw ?? "english").toLowerCase();
  if (v === "chinese" || v === "vietnamese" || v === "finnish" || v === "programming") return v;
  return "english";
}
