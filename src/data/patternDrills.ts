/**
 * Pattern Drilling data for the Speaking Coach (English + Chinese).
 * Each pattern is a sentence frame with "___" and a list of substitutions.
 * Levels go from absolute beginner (mat goc) to C1 so learners build automatic
 * speaking reflexes one frame at a time.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export type DrillLevel = "starter" | "a1" | "a2" | "b1" | "b2" | "c1";

export interface DrillFill {
  /** Word/phrase inserted into the frame (English or Hanzi). */
  w: string;
  /** Pinyin for Chinese fills. */
  py?: string;
  /** Vietnamese meaning of the fill. */
  vi: string;
}

export interface DrillPattern {
  id: string;
  level: DrillLevel;
  frame: string;
  framePy?: string;
  frameVi: string;
  /** Short usage tip in Vietnamese / English. */
  tipVi: string;
  tipEn: string;
  fills: DrillFill[];
}

export const DRILL_LEVELS: { key: DrillLevel; vi: string; en: string; descVi: string; descEn: string }[] = [
  { key: "starter", vi: "Mất gốc", en: "Starter", descVi: "Câu 3-5 từ, dùng hằng ngày", descEn: "3-5 word everyday frames" },
  { key: "a1", vi: "Sơ cấp A1", en: "A1", descVi: "Giới thiệu, nhu cầu, sở thích", descEn: "Intro, needs, likes" },
  { key: "a2", vi: "Cơ bản A2", en: "A2", descVi: "Kế hoạch, quá khứ, so sánh", descEn: "Plans, past, comparing" },
  { key: "b1", vi: "Trung cấp B1", en: "B1", descVi: "Ý kiến, lý do, giả định", descEn: "Opinions, reasons, hypotheticals" },
  { key: "b2", vi: "Trên trung cấp B2", en: "B2", descVi: "Sắc thái, phản biện, thương lượng", descEn: "Nuance, discussion, negotiation" },
  { key: "c1", vi: "Nâng cao C1", en: "C1", descVi: "Lập luận, tổng hợp, giao tiếp chuyên nghiệp", descEn: "Reasoning, synthesis, professional speaking" },
];

export const fillSentence = (frame: string, fill: string) => frame.replace("___", fill);

export const splitDrillFrame = (frame: string) => {
  const placeholder = frame.indexOf("___");
  if (placeholder < 0) return { before: frame, after: "" };
  return { before: frame.slice(0, placeholder), after: frame.slice(placeholder + 3) };
};

export const ENGLISH_PATTERNS: DrillPattern[] = [
  // Starter
  { id: "en-s1", level: "starter", frame: "I like ___.", frameVi: "Tôi thích ___.", tipVi: "Dùng để nói sở thích. Nhấn vào từ sau 'like'.", tipEn: "Say what you like. Stress the word after 'like'.",
    fills: [{ w: "coffee", vi: "cà phê" }, { w: "music", vi: "âm nhạc" }, { w: "football", vi: "bóng đá" }, { w: "my job", vi: "công việc của tôi" }, { w: "rainy days", vi: "những ngày mưa" }] },
  { id: "en-s2", level: "starter", frame: "I am ___.", frameVi: "Tôi ___.", tipVi: "Nói trạng thái/cảm xúc. 'I am' có thể nối thành 'I'm'.", tipEn: "Describe how you are. 'I am' can link to 'I'm'.",
    fills: [{ w: "hungry", vi: "đói" }, { w: "tired", vi: "mệt" }, { w: "happy", vi: "vui" }, { w: "a student", vi: "là học sinh" }, { w: "from Vietnam", vi: "đến từ Việt Nam" }] },
  { id: "en-s3", level: "starter", frame: "Can I have ___, please?", frameVi: "Cho tôi ___ được không?", tipVi: "Câu gọi món, xin đồ lịch sự. Lên giọng ở cuối.", tipEn: "Polite request. Rise at the end.",
    fills: [{ w: "some water", vi: "ít nước" }, { w: "the menu", vi: "thực đơn" }, { w: "a coffee", vi: "một ly cà phê" }, { w: "the bill", vi: "hóa đơn" }, { w: "a bag", vi: "một cái túi" }] },
  { id: "en-s4", level: "starter", frame: "Where is ___?", frameVi: "___ ở đâu?", tipVi: "Hỏi đường. Giọng xuống ở cuối câu hỏi Wh-.", tipEn: "Ask for places. Wh- questions fall at the end.",
    fills: [{ w: "the toilet", vi: "nhà vệ sinh" }, { w: "the station", vi: "nhà ga" }, { w: "my phone", vi: "điện thoại của tôi" }, { w: "the bus stop", vi: "trạm xe buýt" }, { w: "your office", vi: "văn phòng của bạn" }] },
  // A1
  { id: "en-a1", level: "a1", frame: "I usually ___ in the morning.", frameVi: "Tôi thường ___ vào buổi sáng.", tipVi: "Nói thói quen. 'usually' đứng trước động từ.", tipEn: "Talk about routines. 'usually' goes before the verb.",
    fills: [{ w: "drink tea", vi: "uống trà" }, { w: "go jogging", vi: "đi chạy bộ" }, { w: "check my email", vi: "kiểm tra email" }, { w: "take the bus", vi: "đi xe buýt" }, { w: "read the news", vi: "đọc tin tức" }] },
  { id: "en-a2x", level: "a1", frame: "I would like to ___.", frameVi: "Tôi muốn ___.", tipVi: "Muốn một cách lịch sự, nối 'I'd like to'.", tipEn: "Polite wish; link as 'I'd like to'.",
    fills: [{ w: "book a table", vi: "đặt bàn" }, { w: "learn English", vi: "học tiếng Anh" }, { w: "see a doctor", vi: "gặp bác sĩ" }, { w: "change my ticket", vi: "đổi vé" }, { w: "try this on", vi: "thử cái này" }] },
  { id: "en-a1c", level: "a1", frame: "Do you have ___?", frameVi: "Bạn có ___ không?", tipVi: "Hỏi có/không, lên giọng ở cuối.", tipEn: "Yes/no question, rising intonation.",
    fills: [{ w: "a pen", vi: "cây bút" }, { w: "any brothers", vi: "anh em trai" }, { w: "time now", vi: "thời gian bây giờ" }, { w: "a smaller size", vi: "cỡ nhỏ hơn" }, { w: "free Wi-Fi", vi: "Wi-Fi miễn phí" }] },
  { id: "en-a1d", level: "a1", frame: "My favourite ___ is pizza.", frameVi: "___ yêu thích của tôi là pizza.", tipVi: "Nói điều yêu thích nhất.", tipEn: "Name your favourite thing.",
    fills: [{ w: "food", vi: "Món ăn" }, { w: "dinner", vi: "Bữa tối" }, { w: "snack", vi: "Món ăn vặt" }, { w: "weekend meal", vi: "Bữa ăn cuối tuần" }, { w: "fast food", vi: "Đồ ăn nhanh" }] },
  // A2
  { id: "en-b1a", level: "a2", frame: "I am going to ___ this weekend.", frameVi: "Cuối tuần này tôi sẽ ___.", tipVi: "Kế hoạch đã định. 'going to' có thể đọc 'gonna'.", tipEn: "Planned future. 'going to' can sound like 'gonna'.",
    fills: [{ w: "visit my parents", vi: "thăm bố mẹ" }, { w: "clean my room", vi: "dọn phòng" }, { w: "watch a film", vi: "xem phim" }, { w: "go camping", vi: "đi cắm trại" }, { w: "study for my test", vi: "ôn thi" }] },
  { id: "en-b1b", level: "a2", frame: "Yesterday I ___.", frameVi: "Hôm qua tôi ___.", tipVi: "Quá khứ đơn: đọc rõ đuôi -ed hoặc động từ bất quy tắc.", tipEn: "Past simple: say the -ed ending or irregular verb clearly.",
    fills: [{ w: "worked late", vi: "làm việc muộn" }, { w: "met an old friend", vi: "gặp một người bạn cũ" }, { w: "cooked dinner", vi: "nấu bữa tối" }, { w: "went to the market", vi: "đi chợ" }, { w: "stayed at home", vi: "ở nhà" }] },
  { id: "en-b1c", level: "a2", frame: "It is ___ than I expected.", frameVi: "Nó ___ hơn tôi nghĩ.", tipVi: "So sánh hơn: tính từ ngắn + -er, dài dùng more.", tipEn: "Comparatives: short adjective + -er, long ones use more.",
    fills: [{ w: "easier", vi: "dễ" }, { w: "more expensive", vi: "đắt" }, { w: "colder", vi: "lạnh" }, { w: "more interesting", vi: "thú vị" }, { w: "busier", vi: "bận rộn" }] },
  { id: "en-b1d", level: "a2", frame: "Have you ever ___?", frameVi: "Bạn đã bao giờ ___ chưa?", tipVi: "Hỏi trải nghiệm, dùng V3.", tipEn: "Ask about experiences with the past participle.",
    fills: [{ w: "been abroad", vi: "ra nước ngoài" }, { w: "tried sushi", vi: "ăn thử sushi" }, { w: "lost your wallet", vi: "mất ví" }, { w: "sung karaoke", vi: "hát karaoke" }, { w: "met someone famous", vi: "gặp người nổi tiếng" }] },
  // B1
  { id: "en-c1a", level: "b1", frame: "In my opinion, ___.", frameVi: "Theo tôi, ___.", tipVi: "Mở đầu nêu ý kiến, ngắt nhẹ sau dấu phẩy.", tipEn: "Opens an opinion; pause briefly after the comma.",
    fills: [{ w: "online learning is very flexible", vi: "học trực tuyến rất linh hoạt" }, { w: "cities need more parks", vi: "thành phố cần thêm công viên" }, { w: "reading is better than scrolling", vi: "đọc sách tốt hơn lướt mạng" }, { w: "teamwork builds trust", vi: "làm việc nhóm xây dựng lòng tin" }, { w: "sport should be taught every day", vi: "thể thao nên được dạy mỗi ngày" }] },
  { id: "en-c1b", level: "b1", frame: "The main reason is that ___.", frameVi: "Lý do chính là ___.", tipVi: "Đưa lý do cho câu trả lời IELTS/phỏng vấn.", tipEn: "Give a reason in IELTS or interviews.",
    fills: [{ w: "it saves time", vi: "nó tiết kiệm thời gian" }, { w: "prices keep rising", vi: "giá cả liên tục tăng" }, { w: "people feel less stressed", vi: "mọi người bớt căng thẳng" }, { w: "technology changes fast", vi: "công nghệ thay đổi nhanh" }, { w: "young people want freedom", vi: "người trẻ muốn tự do" }] },
  { id: "en-c1c", level: "b1", frame: "If I had more time, I would ___.", frameVi: "Nếu có nhiều thời gian hơn, tôi sẽ ___.", tipVi: "Câu điều kiện loại 2 cho giả định.", tipEn: "Second conditional for imagined situations.",
    fills: [{ w: "travel around Asia", vi: "du lịch khắp châu Á" }, { w: "learn the piano", vi: "học đàn piano" }, { w: "volunteer more", vi: "làm tình nguyện nhiều hơn" }, { w: "write a book", vi: "viết một cuốn sách" }, { w: "exercise every day", vi: "tập thể dục mỗi ngày" }] },
  { id: "en-c1d", level: "b1", frame: "What I find difficult is ___.", frameVi: "Điều tôi thấy khó là ___.", tipVi: "Cấu trúc nhấn mạnh, nghe tự nhiên khi nói.", tipEn: "Cleft sentence for natural emphasis.",
    fills: [{ w: "speaking in public", vi: "nói trước đám đông" }, { w: "waking up early", vi: "dậy sớm" }, { w: "remembering new words", vi: "nhớ từ mới" }, { w: "saying no to people", vi: "từ chối người khác" }, { w: "managing my money", vi: "quản lý tiền bạc" }] },
];

export const CHINESE_PATTERNS: DrillPattern[] = [
  // Starter
  { id: "zh-s1", level: "starter", frame: "我喜欢___。", framePy: "Wǒ xǐhuan ___.", frameVi: "Tôi thích ___.", tipVi: "喜欢 + danh từ/động từ để nói sở thích.", tipEn: "喜欢 + noun/verb for likes.",
    fills: [{ w: "喝茶", py: "hē chá", vi: "uống trà" }, { w: "音乐", py: "yīnyuè", vi: "âm nhạc" }, { w: "看书", py: "kàn shū", vi: "đọc sách" }, { w: "中国菜", py: "Zhōngguó cài", vi: "món Trung Quốc" }, { w: "运动", py: "yùndòng", vi: "thể thao" }] },
  { id: "zh-s2", level: "starter", frame: "我是___。", framePy: "Wǒ shì ___.", frameVi: "Tôi là ___.", tipVi: "是 nối hai danh từ, không dùng với tính từ.", tipEn: "是 links nouns, not adjectives.",
    fills: [{ w: "学生", py: "xuésheng", vi: "học sinh" }, { w: "老师", py: "lǎoshī", vi: "giáo viên" }, { w: "越南人", py: "Yuènán rén", vi: "người Việt Nam" }, { w: "医生", py: "yīshēng", vi: "bác sĩ" }, { w: "工程师", py: "gōngchéngshī", vi: "kỹ sư" }] },
  { id: "zh-s3", level: "starter", frame: "我要___。", framePy: "Wǒ yào ___.", frameVi: "Tôi muốn/cần ___.", tipVi: "要 dùng khi gọi món, mua đồ.", tipEn: "要 for ordering and buying.",
    fills: [{ w: "一杯水", py: "yì bēi shuǐ", vi: "một cốc nước" }, { w: "这个", py: "zhège", vi: "cái này" }, { w: "米饭", py: "mǐfàn", vi: "cơm" }, { w: "两张票", py: "liǎng zhāng piào", vi: "hai vé" }, { w: "咖啡", py: "kāfēi", vi: "cà phê" }] },
  { id: "zh-s4", level: "starter", frame: "___在哪儿？", framePy: "___ zài nǎr?", frameVi: "___ ở đâu?", tipVi: "Hỏi vị trí, 哪儿 đọc cuốn lưỡi nhẹ.", tipEn: "Ask for a place; 哪儿 has a light r sound.",
    fills: [{ w: "洗手间", py: "xǐshǒujiān", vi: "Nhà vệ sinh" }, { w: "地铁站", py: "dìtiě zhàn", vi: "Ga tàu điện ngầm" }, { w: "银行", py: "yínháng", vi: "Ngân hàng" }, { w: "你家", py: "nǐ jiā", vi: "Nhà bạn" }, { w: "超市", py: "chāoshì", vi: "Siêu thị" }] },
  // A1
  { id: "zh-a1", level: "a1", frame: "你有___吗？", framePy: "Nǐ yǒu ___ ma?", frameVi: "Bạn có ___ không?", tipVi: "Thêm 吗 cuối câu để hỏi có/không.", tipEn: "Add 吗 to make a yes/no question.",
    fills: [{ w: "时间", py: "shíjiān", vi: "thời gian" }, { w: "微信", py: "Wēixìn", vi: "WeChat" }, { w: "哥哥", py: "gēge", vi: "anh trai" }, { w: "零钱", py: "língqián", vi: "tiền lẻ" }, { w: "问题", py: "wèntí", vi: "câu hỏi" }] },
  { id: "zh-a2x", level: "a1", frame: "我想去___。", framePy: "Wǒ xiǎng qù ___.", frameVi: "Tôi muốn đi ___.", tipVi: "想 + động từ: muốn làm gì.", tipEn: "想 + verb: want to do.",
    fills: [{ w: "北京", py: "Běijīng", vi: "Bắc Kinh" }, { w: "商店", py: "shāngdiàn", vi: "cửa hàng" }, { w: "公园", py: "gōngyuán", vi: "công viên" }, { w: "图书馆", py: "túshūguǎn", vi: "thư viện" }, { w: "中国旅游", py: "Zhōngguó lǚyóu", vi: "du lịch Trung Quốc" }] },
  { id: "zh-a1c", level: "a1", frame: "这个___多少钱？", framePy: "Zhège ___ duōshao qián?", frameVi: "Cái ___ này bao nhiêu tiền?", tipVi: "Hỏi giá khi mua sắm.", tipEn: "Ask prices when shopping.",
    fills: [{ w: "包", py: "bāo", vi: "túi" }, { w: "手机", py: "shǒujī", vi: "điện thoại" }, { w: "苹果", py: "píngguǒ", vi: "táo" }, { w: "杯子", py: "bēizi", vi: "cốc" }, { w: "帽子", py: "màozi", vi: "mũ" }] },
  { id: "zh-a1d", level: "a1", frame: "我每天___。", framePy: "Wǒ měitiān ___.", frameVi: "Mỗi ngày tôi ___.", tipVi: "每天 đứng trước động từ để nói thói quen.", tipEn: "每天 before the verb for routines.",
    fills: [{ w: "学汉语", py: "xué Hànyǔ", vi: "học tiếng Trung" }, { w: "七点起床", py: "qī diǎn qǐchuáng", vi: "dậy lúc bảy giờ" }, { w: "坐公交车", py: "zuò gōngjiāochē", vi: "đi xe buýt" }, { w: "跑步", py: "pǎobù", vi: "chạy bộ" }, { w: "做饭", py: "zuò fàn", vi: "nấu cơm" }] },
  // A2
  { id: "zh-b1a", level: "a2", frame: "我昨天___了。", framePy: "Wǒ zuótiān ___ le.", frameVi: "Hôm qua tôi đã ___.", tipVi: "了 báo hành động đã hoàn thành.", tipEn: "了 marks a completed action.",
    fills: [{ w: "看电影", py: "kàn diànyǐng", vi: "xem phim" }, { w: "买衣服", py: "mǎi yīfu", vi: "mua quần áo" }, { w: "见朋友", py: "jiàn péngyou", vi: "gặp bạn" }, { w: "去医院", py: "qù yīyuàn", vi: "đi bệnh viện" }, { w: "加班", py: "jiābān", vi: "tăng ca" }] },
  { id: "zh-b1b", level: "a2", frame: "今天比昨天___。", framePy: "Jīntiān bǐ zuótiān ___.", frameVi: "Hôm nay ___ hơn hôm qua.", tipVi: "A 比 B + tính từ: so sánh hơn.", tipEn: "A 比 B + adjective for comparing.",
    fills: [{ w: "冷", py: "lěng", vi: "lạnh" }, { w: "热", py: "rè", vi: "nóng" }, { w: "忙", py: "máng", vi: "bận" }, { w: "暖和", py: "nuǎnhuo", vi: "ấm" }, { w: "舒服", py: "shūfu", vi: "dễ chịu" }] },
  { id: "zh-b1c", level: "a2", frame: "你___吗？", framePy: "Nǐ ___ ma?", frameVi: "Bạn đã từng ___ chưa?", tipVi: "过 nói về trải nghiệm.", tipEn: "过 for experiences.",
    fills: [{ w: "吃过烤鸭", py: "chī guo kǎoyā", vi: "ăn vịt quay" }, { w: "去过长城", py: "qù guo Chángchéng", vi: "đi Vạn Lý Trường Thành" }, { w: "学过游泳", py: "xué guo yóuyǒng", vi: "học bơi" }, { w: "坐过飞机", py: "zuò guo fēijī", vi: "đi máy bay" }, { w: "看过京剧", py: "kàn guo Jīngjù", vi: "xem Kinh kịch" }] },
  { id: "zh-b1d", level: "a2", frame: "我打算___。", framePy: "Wǒ dǎsuan ___.", frameVi: "Tôi dự định ___.", tipVi: "打算 + động từ để nói kế hoạch.", tipEn: "打算 + verb for plans.",
    fills: [{ w: "明年去留学", py: "míngnián qù liúxué", vi: "năm sau đi du học" }, { w: "周末爬山", py: "zhōumò pá shān", vi: "cuối tuần leo núi" }, { w: "换工作", py: "huàn gōngzuò", vi: "đổi việc" }, { w: "学开车", py: "xué kāichē", vi: "học lái xe" }, { w: "考HSK四级", py: "kǎo HSK sì jí", vi: "thi HSK 4" }] },
  // B1
  { id: "zh-c1a", level: "b1", frame: "我觉得___。", framePy: "Wǒ juéde ___.", frameVi: "Tôi cảm thấy/cho rằng ___.", tipVi: "觉得 để nêu ý kiến cá nhân.", tipEn: "觉得 to give an opinion.",
    fills: [{ w: "汉语不太难", py: "Hànyǔ bú tài nán", vi: "tiếng Trung không quá khó" }, { w: "这个办法很好", py: "zhège bànfǎ hěn hǎo", vi: "cách này rất tốt" }, { w: "城市太吵了", py: "chéngshì tài chǎo le", vi: "thành phố ồn quá" }, { w: "健康最重要", py: "jiànkāng zuì zhòngyào", vi: "sức khỏe quan trọng nhất" }, { w: "他说得对", py: "tā shuō de duì", vi: "anh ấy nói đúng" }] },
  { id: "zh-c1b", level: "b1", frame: "因为___，所以我很高兴。", framePy: "Yīnwèi ___, suǒyǐ wǒ hěn gāoxìng.", frameVi: "Vì ___ nên tôi rất vui.", tipVi: "因为...所以... nêu nguyên nhân - kết quả.", tipEn: "因为...所以... for cause and effect.",
    fills: [{ w: "考试通过了", py: "kǎoshì tōngguò le", vi: "thi đỗ rồi" }, { w: "朋友来看我", py: "péngyou lái kàn wǒ", vi: "bạn đến thăm tôi" }, { w: "今天放假", py: "jīntiān fàngjià", vi: "hôm nay được nghỉ" }, { w: "天气很好", py: "tiānqì hěn hǎo", vi: "thời tiết đẹp" }, { w: "我找到工作了", py: "wǒ zhǎodào gōngzuò le", vi: "tôi tìm được việc" }] },
  { id: "zh-c1c", level: "b1", frame: "如果有时间，我就___。", framePy: "Rúguǒ yǒu shíjiān, wǒ jiù ___.", frameVi: "Nếu có thời gian, tôi sẽ ___.", tipVi: "如果...就... để giả định.", tipEn: "如果...就... for conditions.",
    fills: [{ w: "去旅游", py: "qù lǚyóu", vi: "đi du lịch" }, { w: "多看书", py: "duō kàn shū", vi: "đọc sách nhiều hơn" }, { w: "学画画", py: "xué huàhuà", vi: "học vẽ" }, { w: "陪家人", py: "péi jiārén", vi: "ở bên gia đình" }, { w: "去健身房", py: "qù jiànshēnfáng", vi: "đi phòng gym" }] },
  { id: "zh-c1d", level: "b1", frame: "虽然___，但是我很喜欢。", framePy: "Suīrán ___, dànshì wǒ hěn xǐhuan.", frameVi: "Tuy ___ nhưng tôi rất thích.", tipVi: "虽然...但是... nêu sự đối lập.", tipEn: "虽然...但是... for contrast.",
    fills: [{ w: "工作很累", py: "gōngzuò hěn lèi", vi: "công việc rất mệt" }, { w: "汉字很难", py: "Hànzì hěn nán", vi: "chữ Hán rất khó" }, { w: "房间很小", py: "fángjiān hěn xiǎo", vi: "phòng rất nhỏ" }, { w: "价格有点贵", py: "jiàgé yǒudiǎn guì", vi: "giá hơi đắt" }, { w: "天气很冷", py: "tiānqì hěn lěng", vi: "trời rất lạnh" }] },
];

import { CHINESE_PATTERNS_MORE, ENGLISH_PATTERNS_MORE } from "./patternDrillsMore";

export const getPatterns = (language: string): DrillPattern[] =>
  language === "chinese" ? [...CHINESE_PATTERNS, ...CHINESE_PATTERNS_MORE]
    : language === "english" ? [...ENGLISH_PATTERNS, ...ENGLISH_PATTERNS_MORE] : [];
