/**
 * @file chineseListeningVideos.ts
 * @description Curated YouTube videos for Chinese listening practice, graded HSK1 → HSK5.
 * All IDs verified via web search (Mandarin Corner, Learn Chinese Through Podcast, ShuoshuoChinese, etc.).
 */
import chibiHsk1 from "@/assets/chibi-cn-hsk1.png";
import chibiHsk2 from "@/assets/chibi-cn-hsk2.png";
import chibiHsk3 from "@/assets/chibi-cn-hsk3.png";
import chibiHsk4 from "@/assets/chibi-cn-hsk4.png";
import chibiHsk5 from "@/assets/chibi-cn-hsk5.png";

export interface ChineseListeningVideo {
  id: string;            // YouTube video ID
  title: string;
  titleVi: string;
  channel: string;
  topic: string;         // chip label EN
  topicVi: string;       // chip label VI
  emoji: string;
  durationMin: number;   // approx minutes
  description: string;
  descriptionVi: string;
  tips: string[];        // listening tips
  tipsVi: string[];
}

export interface ChineseListeningLevel {
  level: 1 | 2 | 3 | 4 | 5;
  label: string;
  labelVi: string;
  blurb: string;
  blurbVi: string;
  colorFrom: string;
  colorTo: string;
  chibi: string;
  videos: ChineseListeningVideo[];
}

// =================================================================
// HSK 1 - Tone, greetings, very short dialogues
// =================================================================
const hsk1: ChineseListeningVideo[] = [
  {
    id: "6rBdlcV3Ank",
    title: "100 Beginner Sentence Starters",
    titleVi: "100 mẫu câu khởi đầu cho người mới",
    channel: "Mandarin Corner",
    topic: "Daily phrases",
    topicVi: "Câu giao tiếp hằng ngày",
    emoji: "💬",
    durationMin: 72,
    description: "Slow native conversations using 100 core sentence patterns. Pinyin + Hanzi captions on screen.",
    descriptionVi: "Đối thoại bản xứ tốc độ chậm với 100 mẫu câu lõi. Phụ đề Pinyin + chữ Hán trên màn hình.",
    tips: ["Pause after each phrase and repeat aloud", "Focus on tones - exaggerate them at first"],
    tipsVi: ["Tạm dừng sau mỗi câu và nhắc lại to", "Tập trung vào thanh điệu - phóng đại lúc mới học"],
  },
  {
    id: "Sp_V0mjt1Uw",
    title: "Order Street Food Like a Native",
    titleVi: "Gọi món đường phố như người bản xứ",
    channel: "Traditional Chinese",
    topic: "Street food",
    topicVi: "Đồ ăn đường phố",
    emoji: "🍜",
    durationMin: 12,
    description: "Real-life market & food-stall dialogues. Perfect first taste of ordering Chinese food.",
    descriptionVi: "Đối thoại thực tế ở chợ & quầy ăn. Bài học hoàn hảo đầu tiên để gọi món tiếng Trung.",
    tips: ["Note prices (块/元) and quantities (一份, 两个)", "Try to shadow the seller's intonation"],
    tipsVi: ["Ghi giá tiền (块/元) và số lượng (一份, 两个)", "Bắt chước nhịp điệu của người bán"],
  },
  {
    id: "Vg6WAmEiMOs",
    title: "Plan a Perfect Sunday with Family",
    titleVi: "Lên kế hoạch Chủ nhật hoàn hảo với gia đình",
    channel: "Learn Chinese Through Podcast",
    topic: "Family life",
    topicVi: "Đời sống gia đình",
    emoji: "👨‍👩‍👧",
    durationMin: 30,
    description: "Gentle podcast about weekend family routines. Great rhythm for absolute beginners to get used to natural pace.",
    descriptionVi: "Podcast nhẹ nhàng về sinh hoạt gia đình cuối tuần. Nhịp điệu hay để người mới làm quen tốc độ nói.",
    tips: ["Listen once for gist, then again with subtitles", "Write down 5 new words you hear"],
    tipsVi: ["Nghe lần 1 lấy ý chính, lần 2 bật phụ đề", "Ghi lại 5 từ mới bạn nghe được"],
  },
  {
    id: "0aM19sfor70",
    title: "15+ Weather Dialogues in 19 Minutes",
    titleVi: "15+ đoạn hội thoại về thời tiết trong 19 phút",
    channel: "Say Mandarin",
    topic: "Weather · Small talk",
    topicVi: "Thời tiết · Chuyện phiếm",
    emoji: "🌦️",
    durationMin: 20,
    description: "Friendly mini-dialogues about weather - a perfect small-talk topic to start every Mandarin conversation.",
    descriptionVi: "Các mẩu hội thoại thân thiện về thời tiết - chủ đề chuyện phiếm hoàn hảo để bắt chuyện bằng tiếng Trung.",
    tips: ["Học các cặp 冷/热, 晴/阴/雨/雪", "Bắt chước intonation câu hỏi 怎么样?"],
    tipsVi: ["Học các cặp 冷/热, 晴/阴/雨/雪", "Bắt chước intonation câu hỏi 怎么样?"],
  },
  {
    id: "8WSKKQ5BMT0",
    title: "Comprehensible Input: 100 Chinese Stories #1",
    titleVi: "Nghe hiểu đầu vào: 100 chuyện tiếng Trung #1",
    channel: "Blabla Chinese",
    topic: "Stories · TPRS",
    topicVi: "Kể chuyện · TPRS",
    emoji: "📖",
    durationMin: 7,
    description: "Comprehensible-input storytelling with visuals and repetition - designed so true beginners understand almost everything.",
    descriptionVi: "Kể chuyện theo phương pháp Comprehensible Input có hình ảnh và lặp lại - thiết kế để người mới hoàn toàn vẫn hiểu gần hết.",
    tips: ["Don't translate - let images carry meaning", "Watch entire 100-video series in order"],
    tipsVi: ["Đừng dịch - để hình ảnh dẫn nghĩa", "Xem toàn bộ series 100 video theo thứ tự"],
  },
];

// =================================================================
// HSK 2 - Familiar topics, short sentences
// =================================================================
const hsk2: ChineseListeningVideo[] = [
  {
    id: "JUuqVbQeeCw",
    title: "Talk About Daily Routines",
    titleVi: "Nói về thói quen hằng ngày",
    channel: "Chinese Listening Practice",
    topic: "Daily routines",
    topicVi: "Thói quen hằng ngày",
    emoji: "🌅",
    durationMin: 18,
    description: "Pinyin-subtitled dialogue about wake-up, work, meals and bedtime - vocabulary you use every day.",
    descriptionVi: "Đối thoại có phụ đề Pinyin về dậy sớm, đi làm, ăn uống, đi ngủ - từ vựng dùng mỗi ngày.",
    tips: ["Pause and repeat every 时间词 (time word)", "Memorise common patterns like 'X 的时候我…'"],
    tipsVi: ["Tạm dừng và nhắc lại từng 'thời gian từ'", "Học mẫu câu 'X 的时候我…'"],
  },
  {
    id: "sbEEY3eIaBo",
    title: "Why People Love Snacks & Convenience Food",
    titleVi: "Vì sao người ta thích đồ ăn vặt và đồ ăn nhanh",
    channel: "Learn Chinese Through Podcast",
    topic: "Food culture",
    topicVi: "Văn hóa ẩm thực",
    emoji: "🍱",
    durationMin: 15,
    description: "Casual podcast on modern eating habits - slow, clear, with Pinyin subtitles.",
    descriptionVi: "Podcast giản dị về thói quen ăn uống hiện đại - chậm, rõ, có phụ đề Pinyin.",
    tips: ["Try to predict the speaker's next word", "Re-listen at 0.75x if too fast"],
    tipsVi: ["Đoán từ tiếp theo của người nói", "Nghe lại 0.75x nếu thấy quá nhanh"],
  },
  {
    id: "Sp_V0mjt1Uw",
    title: "Restaurant & Street-Food Dialogues",
    titleVi: "Đối thoại ở quán ăn & gánh hàng rong",
    channel: "Traditional Chinese",
    topic: "Restaurant",
    topicVi: "Nhà hàng",
    emoji: "🥟",
    durationMin: 12,
    description: "Useful question-answer patterns for ordering. Listen and try to answer before the customer does.",
    descriptionVi: "Mẫu hỏi-đáp hữu ích khi gọi món. Nghe và thử trả lời trước khách hàng.",
    tips: ["Catch the measure words (个, 碗, 杯)", "Notice politeness markers 请 / 谢谢"],
    tipsVi: ["Bắt các lượng từ (个, 碗, 杯)", "Để ý từ lịch sự 请 / 谢谢"],
  },
  {
    id: "yelfxueMlvc",
    title: "A Table for Two - Restaurant Story",
    titleVi: "Bàn cho hai - câu chuyện ở nhà hàng",
    channel: "FluentU Chinese",
    topic: "Restaurant story",
    topicVi: "Câu chuyện nhà hàng",
    emoji: "🍽️",
    durationMin: 4,
    description: "Short animated story following Wang Ming to dinner. Bite-sized practice with classic restaurant phrases.",
    descriptionVi: "Câu chuyện hoạt hình ngắn theo chân Wang Ming đi ăn tối. Bài luyện ngắn gọn với các câu kinh điển ở nhà hàng.",
    tips: ["Watch twice - first for fun, then for vocab", "List all menu/order phrases you hear"],
    tipsVi: ["Xem hai lần - lần đầu để giải trí, lần sau ghi từ", "Liệt kê tất cả câu gọi món bạn nghe được"],
  },
  {
    id: "0aM19sfor70",
    title: "15 Weather Talks - Long Practice",
    titleVi: "15 mẩu chuyện về thời tiết - luyện tập dài",
    channel: "Say Mandarin",
    topic: "Weather · Dialogue",
    topicVi: "Thời tiết · Đối thoại",
    emoji: "☀️",
    durationMin: 20,
    description: "Repeat-listen at HSK 2 level. Lock in weather adjectives and seasonal vocabulary.",
    descriptionVi: "Nghe lại ở trình độ HSK 2. Ghi nhớ tính từ thời tiết và từ vựng theo mùa.",
    tips: ["Tự nói câu '今天天气怎么样?' rồi tự trả lời", "Ghi nhớ 4 từ chỉ mùa: 春夏秋冬"],
    tipsVi: ["Tự nói câu '今天天气怎么样?' rồi tự trả lời", "Ghi nhớ 4 từ chỉ mùa: 春夏秋冬"],
  },
];

// =================================================================
// HSK 3 - Intermediate dialogues, podcasts
// =================================================================
const hsk3: ChineseListeningVideo[] = [
  {
    id: "Vo7GkLQ90UU",
    title: "Are You Willing to Learn a Little Every Day?",
    titleVi: "Bạn có sẵn sàng học mỗi ngày một chút?",
    channel: "Learn Chinese Through Podcast",
    topic: "Self-improvement",
    topicVi: "Phát triển bản thân",
    emoji: "📈",
    durationMin: 27,
    description: "Motivational podcast at intermediate speed. Builds vocabulary around habits, goals and discipline.",
    descriptionVi: "Podcast truyền cảm hứng tốc độ trung cấp. Mở rộng từ vựng về thói quen, mục tiêu, kỷ luật.",
    tips: ["Note any 4-character idioms (chengyu) you hear", "Write a 3-sentence summary in Chinese"],
    tipsVi: ["Ghi lại các thành ngữ 4 chữ", "Viết tóm tắt 3 câu bằng tiếng Trung"],
  },
  {
    id: "JUuqVbQeeCw",
    title: "Daily Routines (Long Form)",
    titleVi: "Thói quen hằng ngày (bản dài)",
    channel: "Chinese Listening Practice",
    topic: "Lifestyle",
    topicVi: "Phong cách sống",
    emoji: "📓",
    durationMin: 18,
    description: "Re-listen at 1.0x speed to test comprehension without leaning on subtitles.",
    descriptionVi: "Nghe lại tốc độ 1.0x để kiểm tra khả năng hiểu mà không bám phụ đề.",
    tips: ["Cover the subtitles with your hand", "Try to write the next sentence before it plays"],
    tipsVi: ["Lấy tay che phụ đề", "Đoán và viết câu tiếp theo trước khi phát"],
  },
  {
    id: "b_d-Yf-Gzyw",
    title: "A Walk Around Hong Kong",
    titleVi: "Dạo quanh Hong Kong",
    channel: "Mandarin Corner",
    topic: "Travel · City",
    topicVi: "Du lịch · Thành phố",
    emoji: "🏙️",
    durationMin: 48,
    description: "Authentic walking-tour Mandarin. Real outdoor noise, real pace - perfect bridge to HSK 4.",
    descriptionVi: "Tiếng Trung thực sự kiểu vlog dạo phố. Âm thanh ngoài trời thật, tốc độ thật - cầu nối hoàn hảo lên HSK 4.",
    tips: ["Focus on direction words (左/右/前面)", "List 10 place-related nouns you learn"],
    tipsVi: ["Tập trung vào từ chỉ hướng (左/右/前面)", "Liệt kê 10 danh từ về địa điểm bạn học được"],
  },
  {
    id: "3opING682vE",
    title: "HSK 3 Listening Practice Story",
    titleVi: "Truyện luyện nghe HSK 3",
    channel: "ChineseFor.Us",
    topic: "Short story",
    topicVi: "Truyện ngắn",
    emoji: "🎧",
    durationMin: 14,
    description: "Classroom-style HSK 3 story with clear narration, comprehension questions, and explanations.",
    descriptionVi: "Bài nghe HSK 3 theo phong cách lớp học với giọng đọc rõ, câu hỏi hiểu bài và giải thích.",
    tips: ["Trả lời câu hỏi trước khi giáo viên giải đáp", "Ghi lại 3 cấu trúc câu mới"],
    tipsVi: ["Trả lời câu hỏi trước khi giáo viên giải đáp", "Ghi lại 3 cấu trúc câu mới"],
  },
  {
    id: "sbEEY3eIaBo",
    title: "Snacks & Convenience Food Culture",
    titleVi: "Văn hóa ăn vặt & đồ ăn tiện lợi",
    channel: "Learn Chinese Through Podcast",
    topic: "Food culture",
    topicVi: "Văn hóa ẩm thực",
    emoji: "🍙",
    durationMin: 15,
    description: "Step-up listening: same podcast format as HSK 2 but practiced at 1.0x without subtitles.",
    descriptionVi: "Nâng cấp tai nghe: cùng format podcast ở HSK 2 nhưng luyện ở tốc độ 1.0x không phụ đề.",
    tips: ["Tóm tắt 3 ý chính sau khi nghe", "So sánh thói quen ăn uống TQ vs VN"],
    tipsVi: ["Tóm tắt 3 ý chính sau khi nghe", "So sánh thói quen ăn uống TQ vs VN"],
  },
];

// =================================================================
// HSK 4 - Native vlogs, street interviews
// =================================================================
const hsk4: ChineseListeningVideo[] = [
  {
    id: "b_d-Yf-Gzyw",
    title: "Hong Kong Walking Tour (Native Speed)",
    titleVi: "Tour dạo Hong Kong (tốc độ bản xứ)",
    channel: "Mandarin Corner",
    topic: "Street vlog",
    topicVi: "Vlog đường phố",
    emoji: "🚶",
    durationMin: 48,
    description: "Same beloved video - now treated as listening at full speed. Push your ears to native pace.",
    descriptionVi: "Vẫn video quen thuộc - nhưng nay nghe ở tốc độ thật. Rèn tai nghe với tốc độ bản xứ.",
    tips: ["Listen first without subtitles for 5 min", "Then watch with Hanzi only (no Pinyin)"],
    tipsVi: ["Nghe 5 phút đầu không phụ đề", "Sau đó xem chỉ với chữ Hán (tắt Pinyin)"],
  },
  {
    id: "hHPCtKsNIes",
    title: "50 Chengyu in Street Interviews",
    titleVi: "50 thành ngữ trong phỏng vấn đường phố",
    channel: "Mandarin Corner",
    topic: "Idioms · Interview",
    topicVi: "Thành ngữ · Phỏng vấn",
    emoji: "🎤",
    durationMin: 41,
    description: "Native speakers explain common 4-character idioms (chengyu). Real intonation, regional accents included.",
    descriptionVi: "Người bản xứ giải thích các thành ngữ 4 chữ thông dụng. Ngữ điệu thật, có cả giọng vùng miền.",
    tips: ["Keep a chengyu notebook - write the literal + figurative meaning", "Try to use one chengyu in a sentence each day"],
    tipsVi: ["Sổ chép thành ngữ - ghi nghĩa đen + nghĩa bóng", "Cố dùng một thành ngữ trong câu mỗi ngày"],
  },
  {
    id: "Vo7GkLQ90UU",
    title: "Discipline & Daily Improvement (Re-listen)",
    titleVi: "Kỷ luật & cải thiện mỗi ngày (nghe lại)",
    channel: "Learn Chinese Through Podcast",
    topic: "Mindset",
    topicVi: "Tư duy",
    emoji: "🧠",
    durationMin: 27,
    description: "Re-visit this podcast and try note-taking only in Chinese. Quiz yourself afterwards.",
    descriptionVi: "Nghe lại podcast này và chỉ ghi chú bằng tiếng Trung. Tự kiểm tra lại sau đó.",
    tips: ["Summarise each minute in 1 Chinese sentence", "Compare your summary to your notes"],
    tipsVi: ["Tóm tắt mỗi phút bằng 1 câu tiếng Trung", "So sánh tóm tắt với ghi chú"],
  },
  {
    id: "WA9CCC1Apys",
    title: "The Pig Butchering Scam in China",
    titleVi: "Lừa đảo 'mổ heo' ở Trung Quốc",
    channel: "Mandarin Corner",
    topic: "Society · Crime",
    topicVi: "Xã hội · Lừa đảo",
    emoji: "🐷",
    durationMin: 25,
    description: "Upper-intermediate podcast on the infamous 'pig butchering' romance-investment scam. Rich vocabulary and real social context.",
    descriptionVi: "Podcast trung-cao về vụ lừa đảo 'mổ heo' khét tiếng. Từ vựng phong phú và bối cảnh xã hội thật.",
    tips: ["Ghi 5 từ về tài chính / lừa đảo", "Kể lại câu chuyện cho bạn bè bằng tiếng Trung"],
    tipsVi: ["Ghi 5 từ về tài chính / lừa đảo", "Kể lại câu chuyện cho bạn bè bằng tiếng Trung"],
  },
  {
    id: "d_U59UWWLdo",
    title: "Mother's Day: A Day to Thank Mom",
    titleVi: "Ngày của Mẹ: ngày để cảm ơn mẹ",
    channel: "Easy Mandarin News",
    topic: "Mini news · Family",
    topicVi: "Tin ngắn · Gia đình",
    emoji: "💐",
    durationMin: 3,
    description: "Short news-style listening with HSK 4+ vocabulary about Mother's Day traditions across cultures.",
    descriptionVi: "Bài nghe ngắn theo phong cách tin tức ở trình độ HSK 4+ về phong tục Ngày của Mẹ ở nhiều nền văn hóa.",
    tips: ["Nghe 3 lần liên tiếp không phụ đề", "Dịch tóm tắt sang tiếng Anh/Việt"],
    tipsVi: ["Nghe 3 lần liên tiếp không phụ đề", "Dịch tóm tắt sang tiếng Anh/Việt"],
  },
];

// =================================================================
// HSK 5 - Advanced native content
// =================================================================
const hsk5: ChineseListeningVideo[] = [
  {
    id: "hHPCtKsNIes",
    title: "50 Chengyu - Native Conversation",
    titleVi: "50 thành ngữ - đối thoại bản xứ",
    channel: "Mandarin Corner",
    topic: "Advanced idioms",
    topicVi: "Thành ngữ nâng cao",
    emoji: "🏯",
    durationMin: 41,
    description: "Push for full comprehension without subtitles. Pause only when you truly cannot follow.",
    descriptionVi: "Cố gắng hiểu trọn vẹn không phụ đề. Chỉ tạm dừng khi thật sự không theo kịp.",
    tips: ["Shadow speakers - repeat 1 second behind them", "Translate the last 30s into English from memory"],
    tipsVi: ["Shadowing - nhắc lại sau người nói 1 giây", "Dịch 30 giây cuối ra tiếng Anh bằng trí nhớ"],
  },
  {
    id: "VKi7OexPYLU",
    title: "Advanced Vocabulary That Sounds Smart",
    titleVi: "Từ vựng nâng cao nghe rất thông minh",
    channel: "ShuoshuoChinese",
    topic: "Advanced vocab",
    topicVi: "Từ vựng nâng cao",
    emoji: "🎓",
    durationMin: 14,
    description: "Native teacher Shuo explains nuanced words you can use to sound natural and educated.",
    descriptionVi: "Cô Shuo (bản xứ) giải thích các từ tinh tế giúp bạn nói tự nhiên và trí thức hơn.",
    tips: ["Make example sentences using 3 new words", "Record yourself and compare to Shuo"],
    tipsVi: ["Đặt câu với 3 từ mới", "Tự ghi âm rồi so sánh với cô Shuo"],
  },
  {
    id: "b_d-Yf-Gzyw",
    title: "Hong Kong Walk - Full Comprehension",
    titleVi: "Dạo Hong Kong - hiểu trọn vẹn",
    channel: "Mandarin Corner",
    topic: "Travel vlog",
    topicVi: "Vlog du lịch",
    emoji: "🌃",
    durationMin: 48,
    description: "Aim to follow the entire 48-minute walk with zero subtitles. The HSK 5 final boss.",
    descriptionVi: "Mục tiêu: theo hết 48 phút không phụ đề. Trận đấu cuối của HSK 5.",
    tips: ["Take a 10-question quiz on details afterwards", "Re-watch any 30s segment you missed"],
    tipsVi: ["Tự làm 10 câu hỏi chi tiết sau khi xem", "Xem lại đoạn 30s nào bị lỡ"],
  },
  {
    id: "k8jg8l2oTkc",
    title: "Daily Expression «烧高香» - Speak Chinese With Da Peng",
    titleVi: "Thành ngữ thường ngày «烧高香» - học cùng Da Peng",
    channel: "Speak Chinese With Da Peng",
    topic: "Idioms · Slang",
    topicVi: "Thành ngữ · Tiếng lóng",
    emoji: "🏮",
    durationMin: 18,
    description: "Native teacher Da Peng dives deep into the slangy expression 烧高香 - perfect for sounding like a local.",
    descriptionVi: "Thầy Da Peng (bản xứ) phân tích sâu thành ngữ 烧高香 - hoàn hảo để nói chuyện như người bản địa.",
    tips: ["Học nghĩa đen + nghĩa bóng + ví dụ", "Tự đặt 2 câu mới với thành ngữ này"],
    tipsVi: ["Học nghĩa đen + nghĩa bóng + ví dụ", "Tự đặt 2 câu mới với thành ngữ này"],
  },
  {
    id: "WA9CCC1Apys",
    title: "Pig Butchering Scam - Advanced Re-listen",
    titleVi: "Lừa đảo 'mổ heo' - nghe lại nâng cao",
    channel: "Mandarin Corner",
    topic: "Society · Crime",
    topicVi: "Xã hội · Lừa đảo",
    emoji: "🕵️",
    durationMin: 25,
    description: "Re-tackle this podcast at full speed without subtitles. Aim to retell the full story afterwards.",
    descriptionVi: "Nghe lại podcast này ở tốc độ thật không phụ đề. Mục tiêu: kể lại toàn bộ câu chuyện sau khi nghe.",
    tips: ["Kể lại bằng tiếng Trung trong 2 phút", "Tranh luận: nạn nhân hay thủ phạm đáng trách hơn?"],
    tipsVi: ["Kể lại bằng tiếng Trung trong 2 phút", "Tranh luận: nạn nhân hay thủ phạm đáng trách hơn?"],
  },
];

export const chineseListeningLevels: ChineseListeningLevel[] = [
  {
    level: 1,
    label: "HSK 1 · Beginner ear training",
    labelVi: "HSK 1 · Luyện tai sơ cấp",
    blurb: "Short clear phrases. Get used to tones and rhythm.",
    blurbVi: "Câu ngắn rõ ràng. Làm quen với thanh điệu và nhịp điệu.",
    colorFrom: "from-emerald-500",
    colorTo: "to-teal-500",
    chibi: chibiHsk1,
    videos: hsk1,
  },
  {
    level: 2,
    label: "HSK 2 · Daily life dialogues",
    labelVi: "HSK 2 · Đối thoại đời sống",
    blurb: "Family, food, routine - recognise common patterns.",
    blurbVi: "Gia đình, ăn uống, sinh hoạt - nhận diện mẫu câu phổ biến.",
    colorFrom: "from-sky-500",
    colorTo: "to-cyan-500",
    chibi: chibiHsk2,
    videos: hsk2,
  },
  {
    level: 3,
    label: "HSK 3 · Podcasts & vlogs",
    labelVi: "HSK 3 · Podcast & vlog",
    blurb: "Multi-minute narration on lifestyle, travel, learning.",
    blurbVi: "Bài nói dài vài phút về phong cách sống, du lịch, học tập.",
    colorFrom: "from-indigo-500",
    colorTo: "to-blue-600",
    chibi: chibiHsk3,
    videos: hsk3,
  },
  {
    level: 4,
    label: "HSK 4 · Native speed",
    labelVi: "HSK 4 · Tốc độ bản xứ",
    blurb: "Real interviews, street tours and discussions.",
    blurbVi: "Phỏng vấn thật, tour đường phố và thảo luận.",
    colorFrom: "from-purple-500",
    colorTo: "to-violet-600",
    chibi: chibiHsk4,
    videos: hsk4,
  },
  {
    level: 5,
    label: "HSK 5 · Advanced immersion",
    labelVi: "HSK 5 · Nhập vai nâng cao",
    blurb: "Chengyu, nuance, full immersion - listen like a native.",
    blurbVi: "Thành ngữ, sắc thái, nhập vai trọn vẹn - nghe như người bản xứ.",
    colorFrom: "from-rose-500",
    colorTo: "to-red-600",
    chibi: chibiHsk5,
    videos: hsk5,
  },
];
