/**
 * @file cambridgeSpeakingWordBank.ts
 * @description Word bank for Cambridge Speaking Practice. Words are chosen from
 *   the exact question the student is answering plus the card topic, and they are
 *   graded by exam level: concrete nouns and simple adjectives for Starters and
 *   Movers, collocations and opinion language for Flyers / A2 Key / B1 Preliminary.
 *   Every card is guaranteed at least 12 usable words.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeSpeakLevel } from "./cambridgeSpeakingTasks";

export interface SpeakWord {
  en: string;
  vi: string;
}

const w = (en: string, vi: string): SpeakWord => ({ en, vi });

/** Younger levels get concrete words; older levels also get collocations. */
const isYoung = (level: CambridgeSpeakLevel) => level === "starters" || level === "movers";

interface TopicBucket {
  keys: string[];
  /** Concrete, picture-friendly words (all levels). */
  words: SpeakWord[];
  /** Collocations and opinion language (Flyers / KET / PET only). */
  advanced?: SpeakWord[];
}

/** keyword -> words. Keywords are matched against the lowercase topic. */
const TOPIC_WORDS: TopicBucket[] = [
  {
    keys: ["toy", "game", "playing", "my favourite things"],
    words: [
      w("teddy bear", "gấu bông"), w("doll", "búp bê"), w("robot", "rô-bốt"),
      w("puzzle", "trò xếp hình"), w("ball", "quả bóng"), w("kite", "cái diều"),
      w("board game", "trò chơi trên bàn"), w("soft", "mềm"), w("noisy", "ồn ào"),
      w("share", "chia sẻ"), w("take turns", "chơi lần lượt"), w("favourite", "yêu thích"),
    ],
    advanced: [
      w("collect", "sưu tầm"), w("keep it for years", "giữ nhiều năm"),
      w("it means a lot to me", "nó rất có ý nghĩa với em"), w("hand-made", "làm thủ công"),
    ],
  },
  {
    keys: ["animal", "pet", "farm", "zoo", "puppy", "cat", "nature", "environment"],
    words: [
      w("elephant", "con voi"), w("monkey", "con khỉ"), w("rabbit", "con thỏ"),
      w("puppy", "cún con"), w("kitten", "mèo con"), w("parrot", "con vẹt"),
      w("cow", "con bò"), w("feed", "cho ăn"), w("fur", "bộ lông"),
      w("tail", "cái đuôi"), w("friendly", "thân thiện"), w("look after", "chăm sóc"),
    ],
    advanced: [
      w("take responsibility for", "chịu trách nhiệm cho"), w("wildlife", "động vật hoang dã"),
      w("endangered", "có nguy cơ tuyệt chủng"), w("protect their habitat", "bảo vệ môi trường sống"),
      w("rescue centre", "trung tâm cứu hộ"),
    ],
  },
  {
    keys: ["family", "celebration", "birthday", "cake", "neighbour", "friend"],
    words: [
      w("mum", "mẹ"), w("dad", "bố"), w("grandparents", "ông bà"),
      w("cousin", "anh/chị/em họ"), w("candle", "nến"), w("present", "món quà"),
      w("balloon", "bong bóng"), w("blow out", "thổi tắt"), w("invite", "mời"),
      w("kind", "tốt bụng"), w("together", "cùng nhau"), w("celebrate", "ăn mừng"),
    ],
    advanced: [
      w("get on well with", "hợp/thân với"), w("a close family", "gia đình gắn bó"),
      w("spend quality time", "dành thời gian chất lượng"), w("supportive", "luôn ủng hộ"),
      w("family tradition", "truyền thống gia đình"),
    ],
  },
  {
    keys: ["food", "fruit", "meal", "cooking", "cafe", "eating out", "dinner", "kitchen", "health"],
    words: [
      w("rice", "cơm"), w("noodles", "mì"), w("chicken", "thịt gà"),
      w("vegetables", "rau"), w("mango", "xoài"), w("watermelon", "dưa hấu"),
      w("delicious", "ngon"), w("sweet", "ngọt"), w("spicy", "cay"),
      w("order", "gọi món"), w("menu", "thực đơn"), w("healthy", "tốt cho sức khoẻ"),
    ],
    advanced: [
      w("a balanced diet", "chế độ ăn cân bằng"), w("home-cooked meal", "bữa cơm nhà"),
      w("cut down on sugar", "giảm đường"), w("street food", "đồ ăn đường phố"),
      w("eat out", "ăn ngoài"),
    ],
  },
  {
    keys: ["school", "classroom", "subject", "librar", "study", "studies", "exam", "club", "english", "language"],
    words: [
      w("teacher", "giáo viên"), w("classmate", "bạn cùng lớp"), w("timetable", "thời khoá biểu"),
      w("homework", "bài tập về nhà"), w("notebook", "vở"), w("whiteboard", "bảng trắng"),
      w("maths", "môn Toán"), w("break time", "giờ nghỉ"), w("revise", "ôn tập"),
      w("take notes", "ghi chú"), w("difficult", "khó"), w("useful", "hữu ích"),
    ],
    advanced: [
      w("make progress", "tiến bộ"), w("pay attention", "tập trung nghe"),
      w("a heavy workload", "khối lượng bài nhiều"), w("group project", "bài tập nhóm"),
      w("practical skills", "kỹ năng thực tế"),
    ],
  },
  {
    keys: ["book", "reading", "story"],
    words: [
      w("story book", "truyện"), w("comic", "truyện tranh"), w("page", "trang"),
      w("cover", "bìa sách"), w("character", "nhân vật"), w("library card", "thẻ thư viện"),
      w("borrow", "mượn"), w("exciting", "hào hứng"), w("funny", "vui"),
      w("read at bedtime", "đọc trước khi ngủ"), w("picture book", "sách tranh"), w("title", "tên sách"),
    ],
    advanced: [
      w("plot", "cốt truyện"), w("main character", "nhân vật chính"),
      w("it's based on", "nó dựa trên"), w("hard to put down", "khó rời mắt"),
      w("e-book", "sách điện tử"),
    ],
  },
  {
    keys: ["home", "house", "bedroom", "helping at home", "moving house", "where i live", "where you live"],
    words: [
      w("living room", "phòng khách"), w("kitchen", "nhà bếp"), w("bed", "cái giường"),
      w("desk", "bàn học"), w("window", "cửa sổ"), w("shelf", "cái kệ"),
      w("tidy", "gọn gàng"), w("sweep the floor", "quét nhà"), w("wash the dishes", "rửa bát"),
      w("comfortable", "thoải mái"), w("upstairs", "trên gác"), w("share a room", "chung phòng"),
    ],
    advanced: [
      w("do the chores", "làm việc nhà"), w("plenty of space", "nhiều không gian"),
      w("on the outskirts", "ở ngoại thành"), w("move in", "dọn vào ở"),
      w("cosy", "ấm cúng"),
    ],
  },
  {
    keys: ["clothes", "body", "face"],
    words: [
      w("T-shirt", "áo phông"), w("jacket", "áo khoác"), w("shorts", "quần đùi"),
      w("trainers", "giày thể thao"), w("hat", "cái mũ"), w("glasses", "kính"),
      w("curly hair", "tóc xoăn"), w("tall", "cao"), w("wear", "mặc"),
      w("stripes", "kẻ sọc"), w("comfortable", "thoải mái"), w("smart", "chỉnh chu"),
    ],
    advanced: [
      w("suit me", "phù hợp với em"), w("fashionable", "thời trang"),
      w("dress code", "quy định trang phục"), w("second-hand", "đồ cũ"),
    ],
  },
  {
    keys: ["sport", "exercise", "football", "sports day"],
    words: [
      w("swimming", "bơi"), w("badminton", "cầu lông"), w("cycling", "đạp xe"),
      w("team", "đội"), w("score a goal", "ghi bàn"), w("coach", "huấn luyện viên"),
      w("win", "thắng"), w("practise", "luyện tập"), w("get fit", "khoẻ lên"),
      w("tired", "mệt"), w("energy", "năng lượng"), w("twice a week", "hai lần một tuần"),
    ],
    advanced: [
      w("keep in shape", "giữ dáng"), w("team spirit", "tinh thần đồng đội"),
      w("build stamina", "tăng sức bền"), w("take part in", "tham gia"),
      w("warm up", "khởi động"),
    ],
  },
  {
    keys: ["weather", "season", "rainy", "beach", "park", "camping", "summer", "outside"],
    words: [
      w("sunny", "có nắng"), w("cloudy", "nhiều mây"), w("windy", "có gió"),
      w("rain", "mưa"), w("umbrella", "cái dù"), w("hot", "nóng"),
      w("cool", "mát"), w("sand", "cát"), w("picnic", "đi dã ngoại"),
      w("tent", "cái lều"), w("shade", "bóng mát"), w("fresh air", "không khí trong lành"),
    ],
    advanced: [
      w("heavy rain", "mưa lớn"), w("a heatwave", "đợt nắng nóng"),
      w("get soaked", "ướt sũng"), w("mild weather", "thời tiết dễ chịu"),
    ],
  },
  {
    keys: ["holiday", "travel", "transport", "train", "day out", "place i visited", "trip", "station"],
    words: [
      w("suitcase", "vali"), w("ticket", "vé"), w("platform", "sân ga"),
      w("bus stop", "trạm xe buýt"), w("airport", "sân bay"), w("hotel", "khách sạn"),
      w("sightseeing", "đi ngắm cảnh"), w("souvenir", "quà lưu niệm"), w("by train", "bằng tàu"),
      w("exciting", "hào hứng"), w("crowded", "đông đúc"), w("relaxing", "thư giãn"),
    ],
    advanced: [
      w("public transport", "giao thông công cộng"), w("catch a connection", "kịp chuyến nối"),
      w("book in advance", "đặt trước"), w("rush hour", "giờ cao điểm"),
      w("a change of scene", "đổi không khí"),
    ],
  },
  {
    keys: ["shop", "market", "money", "charity", "raising money", "shopping"],
    words: [
      w("shopping centre", "trung tâm mua sắm"), w("stall", "sạp hàng"), w("price", "giá"),
      w("cheap", "rẻ"), w("expensive", "đắt"), w("discount", "giảm giá"),
      w("cash", "tiền mặt"), w("save money", "tiết kiệm tiền"), w("donate", "quyên góp"),
      w("bargain", "món hời"), w("queue", "xếp hàng"), w("customer", "khách hàng"),
    ],
    advanced: [
      w("value for money", "xứng với giá"), w("shop online", "mua sắm trực tuyến"),
      w("raise funds", "gây quỹ"), w("on a budget", "trong khoản tiền có hạn"),
      w("local business", "cửa hàng địa phương"),
    ],
  },
  {
    keys: ["technology", "screen time", "social media", "phone", "internet"],
    words: [
      w("smartphone", "điện thoại thông minh"), w("laptop", "máy tính xách tay"), w("app", "ứng dụng"),
      w("headphones", "tai nghe"), w("wifi", "wifi"), w("online", "trực tuyến"),
      w("chat", "trò chuyện"), w("post a photo", "đăng ảnh"), w("screen time", "thời gian dùng màn hình"),
      w("useful", "hữu ích"), w("distracting", "gây mất tập trung"), w("charge", "sạc pin"),
    ],
    advanced: [
      w("stay in touch", "giữ liên lạc"), w("look things up", "tra cứu"),
      w("set a time limit", "đặt giới hạn thời gian"), w("reliable information", "thông tin đáng tin"),
      w("addicted to", "nghiện"),
    ],
  },
  {
    keys: ["free time", "hobby", "hobbies", "music", "film"],
    words: [
      w("best friend", "bạn thân"), w("hang out", "đi chơi cùng"), w("funny", "vui tính"),
      w("guitar", "đàn ghi-ta"), w("song", "bài hát"), w("cartoon", "phim hoạt hình"),
      w("comedy", "phim hài"), w("drawing", "vẽ"), w("reading", "đọc sách"),
      w("at the weekend", "vào cuối tuần"), w("in my free time", "khi rảnh"), w("relaxing", "thư giãn"),
    ],
    advanced: [
      w("take up a hobby", "bắt đầu một sở thích"), w("a live concert", "buổi diễn trực tiếp"),
      w("catchy tune", "bài hát bắt tai"), w("worth watching", "đáng xem"),
      w("unwind", "xả stress"),
    ],
  },
  {
    keys: ["routine", "my day", "weekend", "daily"],
    words: [
      w("wake up", "thức dậy"), w("brush my teeth", "đánh răng"), w("have breakfast", "ăn sáng"),
      w("go to school", "đi học"), w("after school", "sau giờ học"), w("bedtime", "giờ đi ngủ"),
      w("early", "sớm"), w("late", "muộn"), w("always", "luôn luôn"),
      w("usually", "thường"), w("sometimes", "thỉnh thoảng"), w("never", "không bao giờ"),
    ],
    advanced: [
      w("stick to a routine", "giữ nếp sinh hoạt"), w("get enough sleep", "ngủ đủ giấc"),
      w("manage my time", "quản lý thời gian"), w("a busy schedule", "lịch trình bận"),
    ],
  },
  {
    keys: ["town", "city", "countryside", "places", "street", "bus stop", "museum"],
    words: [
      w("park", "công viên"), w("hospital", "bệnh viện"), w("library", "thư viện"),
      w("bakery", "cửa hàng bánh"), w("museum", "viện bảo tàng"), w("neighbourhood", "khu phố"),
      w("noisy", "ồn ào"), w("quiet", "yên tĩnh"), w("next to", "bên cạnh"),
      w("opposite", "đối diện"), w("traffic", "giao thông"), w("village", "làng"),
    ],
    advanced: [
      w("within walking distance", "đi bộ được"), w("green space", "không gian xanh"),
      w("facilities", "tiện ích"), w("lively atmosphere", "không khí nhộn nhịp"),
      w("cost of living", "chi phí sinh hoạt"),
    ],
  },
  {
    keys: ["job", "work", "volunteer", "working", "future plans"],
    words: [
      w("doctor", "bác sĩ"), w("nurse", "điều dưỡng"), w("engineer", "kỹ sư"),
      w("farmer", "nông dân"), w("shop assistant", "nhân viên bán hàng"), w("uniform", "đồng phục"),
      w("busy", "bận"), w("helpful", "hay giúp người"), w("earn money", "kiếm tiền"),
      w("part-time", "bán thời gian"), w("skill", "kỹ năng"), w("responsible", "có trách nhiệm"),
    ],
    advanced: [
      w("gain experience", "có thêm kinh nghiệm"), w("work as a team", "làm việc nhóm"),
      w("give something back", "đóng góp lại cho cộng đồng"), w("a rewarding job", "công việc ý nghĩa"),
      w("apply for", "ứng tuyển"),
    ],
  },
  {
    keys: ["environment", "recycling"],
    words: [
      w("rubbish", "rác"), w("recycle", "tái chế"), w("plastic bottle", "chai nhựa"),
      w("plant a tree", "trồng cây"), w("save water", "tiết kiệm nước"), w("clean up", "dọn sạch"),
      w("pollution", "ô nhiễm"), w("bin", "thùng rác"), w("reuse", "dùng lại"),
      w("poster", "áp phích"), w("save energy", "tiết kiệm điện"), w("look after", "bảo vệ"),
    ],
    advanced: [
      w("cut down on waste", "giảm rác thải"), w("single-use plastic", "nhựa dùng một lần"),
      w("raise awareness", "nâng cao nhận thức"), w("make a difference", "tạo ra thay đổi"),
    ],
  },
  {
    keys: ["colour", "number", "lost", "waiting", "people", "about me", "welcom", "new student"],
    words: [
      w("look for", "tìm"), w("find", "tìm thấy"), w("wait", "đợi"),
      w("smile", "nụ cười"), w("point at", "chỉ vào"), w("in front of", "phía trước"),
      w("behind", "phía sau"), w("next to", "bên cạnh"), w("happy", "vui"),
      w("worried", "lo lắng"), w("help", "giúp đỡ"), w("together", "cùng nhau"),
    ],
    advanced: [
      w("introduce myself", "tự giới thiệu"), w("make someone feel welcome", "làm ai đó thấy được chào đón"),
      w("show them around", "dẫn đi tham quan"), w("get to know", "làm quen"),
    ],
  },
  {
    keys: ["photo", "describing", "picture"],
    words: [
      w("in the foreground", "ở tiền cảnh"), w("in the background", "ở phía sau"),
      w("on the left", "bên trái"), w("on the right", "bên phải"),
      w("in the middle", "ở giữa"), w("wearing", "đang mặc"),
      w("holding", "đang cầm"), w("standing", "đang đứng"),
      w("smiling", "đang cười"), w("busy", "nhộn nhịp"),
      w("bright", "sáng"), w("crowded", "đông người"),
    ],
    advanced: [
      w("it looks as if", "trông như thể"), w("they seem to be", "họ dường như đang"),
      w("what strikes me is", "điều em thấy nổi bật là"), w("the atmosphere is", "không khí thì"),
    ],
  },
];

/**
 * Words tied to what the question actually asks, not just the topic. These come
 * first in the list so two questions inside one topic never look identical.
 */
const QUESTION_WORDS: TopicBucket[] = [
  {
    keys: ["difference", "different"],
    words: [
      w("in the first picture", "trong tranh thứ nhất"), w("but in the second", "nhưng ở tranh thứ hai"),
      w("here there is", "ở đây có"), w("there isn't any", "ở đây không có"),
      w("the same", "giống nhau"), w("has changed", "đã thay đổi"),
    ],
  },
  {
    keys: ["tell the story", "tell me the story", "these pictures show", "what happens"],
    words: [
      w("first", "đầu tiên"), w("then", "sau đó"), w("after that", "sau đó nữa"),
      w("suddenly", "bất ngờ"), w("in the end", "cuối cùng"), w("so", "vì vậy"),
      w("because", "bởi vì"), w("happy again", "vui trở lại"),
    ],
  },
  {
    keys: ["why", "reason"],
    words: [
      w("because", "bởi vì"), w("that's why", "đó là lý do"), w("the main reason is", "lý do chính là"),
      w("for example", "ví dụ"), w("it helps me", "nó giúp em"),
    ],
  },
  {
    keys: ["how often", "how many times", "every day", "every week"],
    words: [
      w("once a week", "một lần một tuần"), w("twice a week", "hai lần một tuần"),
      w("every morning", "mỗi buổi sáng"), w("hardly ever", "hầu như không"),
      w("most days", "hầu hết các ngày"),
    ],
  },
  {
    keys: ["yesterday", "last week", "last weekend", "did you"],
    words: [
      w("last weekend", "cuối tuần trước"), w("we went", "chúng em đã đi"),
      w("it was", "nó đã rất"), w("I had a great time", "em đã rất vui"),
      w("after that", "sau đó"),
    ],
  },
  {
    keys: ["future", "would you like", "next year", "when you are older", "plan"],
    words: [
      w("I'd like to", "em muốn"), w("I'm planning to", "em đang dự định"),
      w("one day", "một ngày nào đó"), w("hopefully", "hy vọng là"),
      w("in a few years", "trong vài năm nữa"),
    ],
  },
  {
    keys: ["compare", "better", "prefer", "which one"],
    words: [
      w("I prefer", "em thích hơn"), w("more interesting than", "thú vị hơn"),
      w("less tiring than", "ít mệt hơn"), w("both of them", "cả hai"),
      w("the best thing about", "điều tuyệt nhất của"),
    ],
  },
  {
    keys: ["should", "agree", "do you think", "advantage", "disadvantage", "problem"],
    words: [
      w("in my opinion", "theo em"), w("I completely agree", "em hoàn toàn đồng ý"),
      w("the advantage is", "lợi ích là"), w("the drawback is", "hạn chế là"),
      w("one solution is", "một cách giải quyết là"),
    ],
  },
  {
    keys: ["how many", "count", "colour"],
    words: [
      w("there are three", "có ba"), w("I can see", "em thấy"),
      w("red", "màu đỏ"), w("blue", "màu xanh"), w("yellow", "màu vàng"),
      w("green", "màu xanh lá"),
    ],
  },
  {
    keys: ["where", "place"],
    words: [
      w("on the table", "trên bàn"), w("under the chair", "dưới ghế"),
      w("near the window", "gần cửa sổ"), w("outside", "bên ngoài"),
      w("at home", "ở nhà"),
    ],
  },
  {
    keys: ["who", "person", "people"],
    words: [
      w("my mum", "mẹ em"), w("my brother", "anh/em trai em"),
      w("my teacher", "cô/thầy em"), w("my classmates", "các bạn cùng lớp"),
      w("a woman", "một người phụ nữ"), w("a man", "một người đàn ông"),
    ],
  },
  {
    keys: ["feel", "happy", "enjoy", "like best"],
    words: [
      w("excited", "háo hức"), w("proud", "tự hào"), w("relaxed", "thoải mái"),
      w("nervous", "lo lắng"), w("cheerful", "vui vẻ"),
    ],
  },
];

/** Generic words per level when no topic keyword matches. */
const LEVEL_WORDS: Record<CambridgeSpeakLevel, SpeakWord[]> = {
  starters: [
    w("big", "to"), w("small", "nhỏ"), w("nice", "đẹp/dễ thương"),
    w("like", "thích"), w("very", "rất"), w("here", "ở đây"),
    w("my", "của em"), w("colour", "màu sắc"), w("happy", "vui"),
    w("this is", "đây là"), w("I can see", "em thấy"), w("there is", "có"),
  ],
  movers: [
    w("because", "bởi vì"), w("favourite", "yêu thích"), w("every day", "mỗi ngày"),
    w("with my friends", "với các bạn"), w("a lot of", "rất nhiều"), w("fun", "vui"),
    w("first", "đầu tiên"), w("then", "sau đó"), w("finally", "cuối cùng"),
    w("I think", "em nghĩ"), w("really", "thật sự"), w("after that", "sau đó nữa"),
  ],
  flyers: [
    w("I think", "em nghĩ"), w("interesting", "thú vị"), w("exciting", "hào hứng"),
    w("usually", "thường"), w("prefer", "thích hơn"), w("for example", "ví dụ"),
    w("difficult", "khó"), w("easy", "dễ"), w("in the future", "trong tương lai"),
    w("the best thing is", "điều tuyệt nhất là"), w("as well", "cũng vậy"), w("actually", "thật ra"),
  ],
  ket: [
    w("in my opinion", "theo em"), w("that's why", "đó là lý do"), w("quite", "khá"),
    w("at the moment", "hiện tại"), w("last week", "tuần trước"), w("would like to", "muốn"),
    w("convenient", "tiện lợi"), w("boring", "nhàm chán"), w("enjoy", "thích thú"),
    w("to be honest", "thật lòng mà nói"), w("especially", "đặc biệt là"), w("a bit", "một chút"),
  ],
  pet: [
    w("on the one hand", "một mặt"), w("on the other hand", "mặt khác"), w("as far as I'm concerned", "theo quan điểm của em"),
    w("the main advantage", "lợi ích chính"), w("the biggest drawback", "hạn chế lớn nhất"), w("it depends on", "điều đó tuỳ vào"),
    w("I'd rather", "em thích hơn"), w("nowadays", "ngày nay"), w("in the long run", "về lâu dài"),
    w("what's more", "hơn nữa"), w("generally speaking", "nói chung"), w("that said", "dù vậy"),
  ],
};

const matchBuckets = (buckets: TopicBucket[], text: string, level: CambridgeSpeakLevel) =>
  buckets
    .filter((g) => g.keys.some((k) => text.includes(k)))
    .flatMap((g) => (isYoung(level) ? g.words : [...(g.advanced ?? []), ...g.words]));

/**
 * Words a student can borrow to answer a given question. Question keywords come
 * first, then topic vocabulary, then level-appropriate connectors. Always
 * returns at least 12 words.
 */
export function wordBankForTask(
  topic: string,
  level: CambridgeSpeakLevel,
  question?: string,
): SpeakWord[] {
  const topicKey = topic.toLowerCase();
  const questionKey = (question ?? "").toLowerCase();
  const fromQuestion = questionKey ? matchBuckets(QUESTION_WORDS, questionKey, level) : [];
  const fromTopic = matchBuckets(TOPIC_WORDS, topicKey, level);
  const fromQuestionTopic = questionKey ? matchBuckets(TOPIC_WORDS, questionKey, level) : [];

  // Deterministic rotation keyed on the question, so two cards inside one topic
  // start their word list at a different place instead of looking identical.
  let hash = 0;
  for (let i = 0; i < questionKey.length; i += 1) hash = (hash * 31 + questionKey.charCodeAt(i)) % 9973;
  const rotate = (list: SpeakWord[]) =>
    list.length > 1 ? [...list.slice(hash % list.length), ...list.slice(0, hash % list.length)] : list;

  const seen = new Set<string>();
  const out: SpeakWord[] = [];
  for (const item of [
    ...fromQuestion.slice(0, 6),
    ...rotate(fromTopic),
    ...fromQuestionTopic,
    ...rotate(LEVEL_WORDS[level]),
    ...fromQuestion,
    ...fromTopic,
    ...LEVEL_WORDS[level],
  ]) {
    const id = item.en.toLowerCase();
    if (seen.has(id)) continue;
    seen.add(id);
    out.push(item);
    if (out.length >= 16) break;
  }
  return out;
}

