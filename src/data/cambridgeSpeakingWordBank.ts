/**
 * @file cambridgeSpeakingWordBank.ts
 * @description Topic word bank for Cambridge Speaking Practice. Every question
 *   gets a list of concrete words (English + Vietnamese gloss) children can
 *   borrow while answering, so they always have material to speak with.
 *   Matching is keyword based on the task topic, with a level fallback.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeSpeakLevel } from "./cambridgeSpeakingTasks";

export interface SpeakWord {
  en: string;
  vi: string;
}

const w = (en: string, vi: string): SpeakWord => ({ en, vi });

/** keyword -> words. Keywords are matched against the lowercase topic. */
const TOPIC_WORDS: { keys: string[]; words: SpeakWord[] }[] = [
  {
    keys: ["toy", "game", "playing"],
    words: [
      w("teddy bear", "gấu bông"), w("doll", "búp bê"), w("robot", "rô-bốt"),
      w("puzzle", "trò xếp hình"), w("ball", "quả bóng"), w("kite", "cái diều"),
      w("board game", "trò chơi trên bàn"), w("soft", "mềm"), w("noisy", "ồn ào"),
      w("share", "chia sẻ"), w("take turns", "chơi lần lượt"), w("favourite", "yêu thích"),
    ],
  },
  {
    keys: ["animal", "pet", "farm", "zoo", "puppy", "cat", "nature"],
    words: [
      w("elephant", "con voi"), w("monkey", "con khỉ"), w("rabbit", "con thỏ"),
      w("puppy", "cún con"), w("kitten", "mèo con"), w("parrot", "con vẹt"),
      w("cow", "con bò"), w("feed", "cho ăn"), w("fur", "bộ lông"),
      w("tail", "cái đuôi"), w("friendly", "thân thiện"), w("look after", "chăm sóc"),
    ],
  },
  {
    keys: ["family", "celebration", "birthday", "cake", "neighbour"],
    words: [
      w("mum", "mẹ"), w("dad", "bố"), w("grandparents", "ông bà"),
      w("cousin", "anh/chị/em họ"), w("candle", "nến"), w("present", "món quà"),
      w("balloon", "bong bóng"), w("blow out", "thổi tắt"), w("invite", "mời"),
      w("kind", "tốt bụng"), w("together", "cùng nhau"), w("celebrate", "ăn mừng"),
    ],
  },
  {
    keys: ["food", "fruit", "meal", "cooking", "cafe", "eating out", "dinner", "kitchen"],
    words: [
      w("rice", "cơm"), w("noodles", "mì"), w("chicken", "thịt gà"),
      w("vegetables", "rau"), w("mango", "xoài"), w("watermelon", "dưa hấu"),
      w("delicious", "ngon"), w("sweet", "ngọt"), w("spicy", "cay"),
      w("order", "gọi món"), w("menu", "thực đơn"), w("healthy", "tốt cho sức khoẻ"),
    ],
  },
  {
    keys: ["school", "classroom", "subject", "library", "study", "exam", "club", "english", "language"],
    words: [
      w("teacher", "giáo viên"), w("classmate", "bạn cùng lớp"), w("timetable", "thời khoá biểu"),
      w("homework", "bài tập về nhà"), w("notebook", "vở"), w("whiteboard", "bảng trắng"),
      w("maths", "môn Toán"), w("break time", "giờ nghỉ"), w("revise", "ôn tập"),
      w("take notes", "ghi chú"), w("difficult", "khó"), w("useful", "hữu ích"),
    ],
  },
  {
    keys: ["home", "house", "bedroom", "helping at home", "moving house"],
    words: [
      w("living room", "phòng khách"), w("kitchen", "nhà bếp"), w("bed", "cái giường"),
      w("desk", "bàn học"), w("window", "cửa sổ"), w("shelf", "cái kệ"),
      w("tidy", "gọn gàng"), w("sweep the floor", "quét nhà"), w("wash the dishes", "rửa bát"),
      w("comfortable", "thoải mái"), w("upstairs", "trên gác"), w("share a room", "chung phòng"),
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
  },
  {
    keys: ["sport", "exercise", "football", "sports day", "health", "healthy lifestyle"],
    words: [
      w("swimming", "bơi"), w("badminton", "cầu lông"), w("cycling", "đạp xe"),
      w("team", "đội"), w("score a goal", "ghi bàn"), w("coach", "huấn luyện viên"),
      w("win", "thắng"), w("practise", "luyện tập"), w("get fit", "khoẻ lên"),
      w("tired", "mệt"), w("energy", "năng lượng"), w("twice a week", "hai lần một tuần"),
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
  },
  {
    keys: ["holiday", "travel", "transport", "train", "day out", "place i visited", "trip"],
    words: [
      w("suitcase", "vali"), w("ticket", "vé"), w("platform", "sân ga"),
      w("bus stop", "trạm xe buýt"), w("airport", "sân bay"), w("hotel", "khách sạn"),
      w("sightseeing", "đi ngắm cảnh"), w("souvenir", "quà lưu niệm"), w("by train", "bằng tàu"),
      w("exciting", "hào hứng"), w("crowded", "đông đúc"), w("relaxing", "thư giãn"),
    ],
  },
  {
    keys: ["shop", "market", "money", "charity", "raising money"],
    words: [
      w("shopping centre", "trung tâm mua sắm"), w("stall", "sạp hàng"), w("price", "giá"),
      w("cheap", "rẻ"), w("expensive", "đắt"), w("discount", "giảm giá"),
      w("cash", "tiền mặt"), w("save money", "tiết kiệm tiền"), w("donate", "quyên góp"),
      w("bargain", "món hời"), w("queue", "xếp hàng"), w("customer", "khách hàng"),
    ],
  },
  {
    keys: ["technology", "screen time", "social media", "phone"],
    words: [
      w("smartphone", "điện thoại thông minh"), w("laptop", "máy tính xách tay"), w("app", "ứng dụng"),
      w("headphones", "tai nghe"), w("wifi", "wifi"), w("online", "trực tuyến"),
      w("chat", "trò chuyện"), w("post a photo", "đăng ảnh"), w("screen time", "thời gian dùng màn hình"),
      w("useful", "hữu ích"), w("distracting", "gây mất tập trung"), w("charge", "sạc pin"),
    ],
  },
  {
    keys: ["friend", "free time", "hobby", "hobbies", "music", "film"],
    words: [
      w("best friend", "bạn thân"), w("hang out", "đi chơi cùng"), w("funny", "vui tính"),
      w("guitar", "đàn ghi-ta"), w("song", "bài hát"), w("cartoon", "phim hoạt hình"),
      w("comedy", "phim hài"), w("drawing", "vẽ"), w("reading", "đọc sách"),
      w("at the weekend", "vào cuối tuần"), w("in my free time", "khi rảnh"), w("relaxing", "thư giãn"),
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
  },
  {
    keys: ["town", "city", "countryside", "where i live", "places", "street", "bus stop", "museum"],
    words: [
      w("park", "công viên"), w("hospital", "bệnh viện"), w("library", "thư viện"),
      w("bakery", "cửa hàng bánh"), w("museum", "viện bảo tàng"), w("neighbourhood", "khu phố"),
      w("noisy", "ồn ào"), w("quiet", "yên tĩnh"), w("next to", "bên cạnh"),
      w("opposite", "đối diện"), w("traffic", "giao thông"), w("village", "làng"),
    ],
  },
  {
    keys: ["job", "work", "volunteer", "working"],
    words: [
      w("doctor", "bác sĩ"), w("nurse", "điều dưỡng"), w("engineer", "kỹ sư"),
      w("farmer", "nông dân"), w("shop assistant", "nhân viên bán hàng"), w("uniform", "đồng phục"),
      w("busy", "bận"), w("helpful", "hay giúp người"), w("earn money", "kiếm tiền"),
      w("part-time", "bán thời gian"), w("skill", "kỹ năng"), w("responsible", "có trách nhiệm"),
    ],
  },
  {
    keys: ["environment"],
    words: [
      w("rubbish", "rác"), w("recycle", "tái chế"), w("plastic bottle", "chai nhựa"),
      w("plant a tree", "trồng cây"), w("save water", "tiết kiệm nước"), w("clean up", "dọn sạch"),
      w("pollution", "ô nhiễm"), w("bin", "thùng rác"), w("reuse", "dùng lại"),
      w("poster", "áp phích"), w("save energy", "tiết kiệm điện"), w("look after", "bảo vệ"),
    ],
  },
  {
    keys: ["colour", "number", "lost", "waiting", "people"],
    words: [
      w("look for", "tìm"), w("find", "tìm thấy"), w("wait", "đợi"),
      w("smile", "nụ cười"), w("point at", "chỉ vào"), w("in front of", "phía trước"),
      w("behind", "phía sau"), w("next to", "bên cạnh"), w("happy", "vui"),
      w("worried", "lo lắng"), w("help", "giúp đỡ"), w("together", "cùng nhau"),
    ],
  },
];

/** Generic words per level when no topic keyword matches. */
const LEVEL_WORDS: Record<CambridgeSpeakLevel, SpeakWord[]> = {
  starters: [
    w("big", "to"), w("small", "nhỏ"), w("nice", "đẹp/dễ thương"),
    w("like", "thích"), w("very", "rất"), w("here", "ở đây"),
    w("my", "của em"), w("colour", "màu sắc"), w("happy", "vui"),
  ],
  movers: [
    w("because", "bởi vì"), w("favourite", "yêu thích"), w("every day", "mỗi ngày"),
    w("with my friends", "với các bạn"), w("a lot of", "rất nhiều"), w("fun", "vui"),
    w("first", "đầu tiên"), w("then", "sau đó"), w("finally", "cuối cùng"),
  ],
  flyers: [
    w("I think", "em nghĩ"), w("interesting", "thú vị"), w("exciting", "hào hứng"),
    w("usually", "thường"), w("prefer", "thích hơn"), w("for example", "ví dụ"),
    w("difficult", "khó"), w("easy", "dễ"), w("in the future", "trong tương lai"),
  ],
  ket: [
    w("in my opinion", "theo em"), w("that's why", "đó là lý do"), w("quite", "khá"),
    w("at the moment", "hiện tại"), w("last week", "tuần trước"), w("would like to", "muốn"),
    w("convenient", "tiện lợi"), w("boring", "nhàm chán"), w("enjoy", "thích thú"),
  ],
  pet: [
    w("on the one hand", "một mặt"), w("on the other hand", "mặt khác"), w("as far as I'm concerned", "theo quan điểm của em"),
    w("the main advantage", "lợi ích chính"), w("the biggest drawback", "hạn chế lớn nhất"), w("it depends on", "điều đó tuỳ vào"),
    w("I'd rather", "em thích hơn"), w("nowadays", "ngày nay"), w("in the long run", "về lâu dài"),
  ],
};

/**
 * Words a student can borrow to answer a given task. Combines topic-specific
 * vocabulary with level-appropriate connectors, capped for readability.
 */
export function wordBankForTask(topic: string, level: CambridgeSpeakLevel): SpeakWord[] {
  const key = topic.toLowerCase();
  const matched = TOPIC_WORDS.filter((g) => g.keys.some((k) => key.includes(k))).flatMap((g) => g.words);
  const seen = new Set<string>();
  const out: SpeakWord[] = [];
  for (const item of [...matched, ...LEVEL_WORDS[level]]) {
    const id = item.en.toLowerCase();
    if (seen.has(id)) continue;
    seen.add(id);
    out.push(item);
    if (out.length >= 16) break;
  }
  return out;
}
