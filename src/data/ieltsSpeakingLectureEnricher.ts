/**
 * @file ieltsSpeakingLectureEnricher.ts
 * @description Replaces the generic `mk()`-factory theory (identical 4-step
 *   strategy + 2 mistakes shared across ALL 17 lectures in
 *   ieltsLecturesSpeakingExpansion.ts) with lecture-specific, topic-anchored
 *   Strategy Steps and Mistakes To Avoid. Topic is detected from the lecture
 *   `id` and mapped to a hand-crafted pack. Only touches Speaking lectures
 *   whose current first strategy title matches the generic factory signature,
 *   so already-detailed lectures (Speaking Expansion 2-6) are left intact.
 */
import type {
  IeltsLecture,
  StrategyStep,
  MistakeToAvoid,
} from "./ieltsLecturesData";

const step = (
  n: number,
  title: string,
  titleVi: string,
  description: string,
  descriptionVi: string,
  example?: string,
): StrategyStep => ({ step: n, title, titleVi, description, descriptionVi, example });

const mist = (
  mistake: string,
  mistakeVi: string,
  why: string,
  whyVi: string,
): MistakeToAvoid => ({ mistake, mistakeVi, why, whyVi });

interface Pack {
  strategySteps: StrategyStep[];
  mistakesToAvoid: MistakeToAvoid[];
}

// ---------------------------------------------------------------------------
// PART 1 PACKS
// ---------------------------------------------------------------------------

const PART1_HOME: Pack = {
  strategySteps: [
    step(1, "Name a specific place, not a generic label", "Nêu địa danh cụ thể, không nói chung chung",
      "Say the city/district and one defining feature ('Hue, along the Perfume River') instead of 'a nice small town'.",
      "Nêu tên thành phố/quận và 1 nét đặc trưng thay vì 'một thị trấn nhỏ'."),
    step(2, "Layer a sensory detail (sight/sound/smell)", "Thêm chi tiết cảm giác (hình ảnh/âm thanh/mùi)",
      "One sensory image ('the smell of jasmine tea in the morning') instantly lifts Lexical Resource.",
      "Một chi tiết cảm giác lập tức nâng Lexical Resource."),
    step(3, "Use present perfect for duration", "Dùng hiện tại hoàn thành cho khoảng thời gian",
      "'I've lived here for over a decade' scores higher than 'I live here 10 years'.",
      "'I've lived here for over a decade' cao điểm hơn 'I live here 10 years'."),
    step(4, "End with a personal reaction line", "Kết bằng một câu cảm nhận cá nhân",
      "'…which I honestly wouldn't trade for anywhere else' - Band 7 personalisation.",
      "'…which I honestly wouldn't trade for anywhere else' - cá nhân hoá Band 7."),
  ],
  mistakesToAvoid: [
    mist("Describing your hometown as 'very beautiful and peaceful'",
      "Mô tả quê bằng 'very beautiful and peaceful'",
      "Empty adjectives with no specific evidence = Band 5 vocabulary signal.",
      "Tính từ rỗng, không dẫn chứng cụ thể = dấu hiệu từ vựng Band 5."),
    mist("Answering with just one sentence ('I live in Hanoi.')",
      "Trả lời chỉ 1 câu ('I live in Hanoi.')",
      "Under-extending caps Fluency & Coherence at Band 5.",
      "Trả lời quá ngắn giới hạn Fluency & Coherence ở Band 5."),
    mist("Mixing tenses ('I live here since 2010')",
      "Trộn thì ('I live here since 2010')",
      "'Since' requires present perfect - simple present here is a Band 5 grammar error.",
      "'Since' cần hiện tại hoàn thành - dùng hiện tại đơn là lỗi ngữ pháp Band 5."),
  ],
};

const PART1_WORK: Pack = {
  strategySteps: [
    step(1, "State role + industry, not just job title", "Nêu vị trí + ngành, không chỉ tên nghề",
      "'I'm a junior marketing executive at a fintech start-up' beats 'I'm a marketer'.",
      "'I'm a junior marketing executive at a fintech start-up' hơn 'I'm a marketer'."),
    step(2, "Add ONE concrete daily task", "Thêm 1 công việc thường ngày cụ thể",
      "'My typical day involves running A/B tests on ad copy…' shows real detail.",
      "'My typical day involves running A/B tests on ad copy…' cho thấy chi tiết thật."),
    step(3, "Justify how you feel about it", "Giải thích cảm nhận về công việc",
      "'demanding but genuinely rewarding' - two-layer feeling scores higher than 'good'.",
      "'demanding but genuinely rewarding' - cảm nhận 2 lớp cao hơn 'good'."),
    step(4, "Signal future direction in one line", "Nêu định hướng tương lai trong 1 câu",
      "'…which is why I'm hoping to move into product management in the next two years.'",
      "'…vì vậy tôi mong chuyển sang product management trong 2 năm tới.'"),
  ],
  mistakesToAvoid: [
    mist("Delivering a rehearsed CV monologue", "Đọc CV học thuộc",
      "Examiners immediately pivot to harder follow-ups when they hear a recital.",
      "Giám khảo chuyển sang câu khó hơn khi phát hiện học thuộc."),
    mist("Using 'I am work as…' instead of 'I work as…'",
      "Nói 'I am work as…' thay vì 'I work as…'",
      "Present-continuous + verb form error is a repeated Band 5 grammar slip.",
      "Sai cấu trúc thì tiếp diễn + động từ - lỗi Band 5 lặp lại."),
    mist("Saying 'My job is very good and interesting'",
      "Nói 'My job is very good and interesting'",
      "Two generic adjectives with no reason - lexis signals Band 5.",
      "Hai tính từ chung chung, không lý do - từ vựng Band 5."),
  ],
};

const PART1_HOBBIES: Pack = {
  strategySteps: [
    step(1, "Pick ONE hobby - do not list five", "Chọn 1 sở thích - đừng liệt kê 5 cái",
      "Depth beats breadth in Part 1. One hobby, three developed details.",
      "Sâu hơn rộng. Một sở thích, 3 chi tiết triển khai."),
    step(2, "Anchor with frequency + duration", "Neo bằng tần suất + khoảng thời gian",
      "'I've been into landscape photography for around five years, usually every weekend.'",
      "'I've been into landscape photography for around five years, usually every weekend.'"),
    step(3, "Explain the emotional payoff", "Giải thích cảm xúc/lợi ích",
      "'It's a great way to switch off from screens and reset my mind.' - Band 7 phrasing.",
      "'It's a great way to switch off from screens and reset my mind.' - Band 7."),
    step(4, "Close with a mini-anecdote if you can", "Kết bằng một mẩu chuyện nhỏ nếu có thể",
      "'Last Sunday I hiked up Ba Vi at 4 a.m. for the sunrise' - concrete, memorable.",
      "'Chủ nhật vừa rồi tôi leo Ba Vì lúc 4h sáng đón bình minh' - cụ thể, ấn tượng."),
  ],
  mistakesToAvoid: [
    mist("Listing 4-5 hobbies with no depth", "Liệt kê 4-5 sở thích không sâu",
      "Shallow list denies you the chance to show range and lexis - Band 5-6.",
      "Danh sách nông không cho bạn thể hiện vốn từ - Band 5-6."),
    mist("Saying 'My hobby is playing football'", "Nói 'My hobby is playing football'",
      "Textbook opener flagged as memorised. Use 'I'm really into…' or 'I've been hooked on…'.",
      "Mở kiểu sách giáo khoa bị đánh dấu học thuộc. Dùng 'I'm really into…'."),
    mist("Overusing 'very interesting' and 'very fun'",
      "Lạm dụng 'very interesting' và 'very fun'",
      "Weak adjectives with no upgrade to 'fascinating / gripping / exhilarating' cap lexis at 6.",
      "Tính từ yếu không nâng cấp lên 'fascinating / gripping / exhilarating' - trần Band 6."),
  ],
};

const PART1_FOOD: Pack = {
  strategySteps: [
    step(1, "Name a dish and its origin", "Gọi tên món ăn và nguồn gốc",
      "'Bun bo Hue, a spicy beef noodle soup from central Vietnam' - specific + context.",
      "'Bún bò Huế, món phở bò cay của miền Trung' - cụ thể + bối cảnh."),
    step(2, "Describe with sensory food adjectives", "Mô tả bằng tính từ ẩm thực đa giác quan",
      "'aromatic, savoury, tangy, mouth-watering, comforting' - Band 7 food lexis.",
      "'aromatic, savoury, tangy, mouth-watering, comforting' - từ vựng Band 7."),
    step(3, "Say when/why you eat it", "Nói khi nào/vì sao bạn ăn món này",
      "'I usually crave a bowl on a rainy morning because it's warming and filling.'",
      "'Tôi thường thèm ăn vào sáng mưa vì ấm bụng và no lâu.'"),
    step(4, "Compare cooking-at-home vs eating-out preference",
      "So sánh nấu ăn ở nhà vs đi ăn ngoài",
      "'I lean towards home-cooked meals - they're cheaper and healthier - but I'll eat out at the weekend.'",
      "'Tôi thiên về nấu ở nhà - rẻ và lành hơn - nhưng cuối tuần vẫn ăn ngoài.'"),
  ],
  mistakesToAvoid: [
    mist("Saying 'The food is delicious' with no detail",
      "Nói 'The food is delicious' không chi tiết",
      "'Delicious' alone is a Band 5 filler. Add flavour + texture words.",
      "'Delicious' đơn lẻ là filler Band 5 - thêm vị + kết cấu."),
    mist("Confusing 'food' (uncountable) with 'foods'",
      "Nhầm 'food' (không đếm được) với 'foods'",
      "'Vietnamese foods are…' is a Band 5 grammar/lexis slip - use 'Vietnamese food is…'.",
      "'Vietnamese foods are…' là lỗi Band 5 - dùng 'Vietnamese food is…'."),
    mist("Skipping frequency ('sometimes', 'usually', 'now and then')",
      "Bỏ trạng từ tần suất",
      "Frequency adverbs are the easiest way to lift Grammar Range in Part 1.",
      "Trạng từ tần suất là cách dễ nhất để nâng phạm vi ngữ pháp Part 1."),
  ],
};

const PART1_TECH: Pack = {
  strategySteps: [
    step(1, "Name the specific app or device", "Gọi tên ứng dụng hoặc thiết bị cụ thể",
      "'TikTok and Instagram Reels' beats 'social media'.",
      "'TikTok và Instagram Reels' hơn 'social media'."),
    step(2, "State frequency in natural chunks", "Nêu tần suất bằng cụm tự nhiên",
      "'I probably scroll through TikTok for a solid hour every evening.'",
      "'Tôi lướt TikTok chừng 1 tiếng mỗi tối.'"),
    step(3, "Balance one pro and one con", "Cân bằng 1 lợi ích và 1 hạn chế",
      "'It keeps me entertained, but I do worry about the amount of time I lose to it.'",
      "'Nó giải trí tốt, nhưng tôi lo về lượng thời gian mất.'"),
    step(4, "Use current tech collocations", "Dùng collocation công nghệ hiện đại",
      "'doom-scrolling', 'digital detox', 'algorithm rabbit hole', 'stay connected'.",
      "'doom-scrolling', 'digital detox', 'algorithm rabbit hole', 'stay connected'."),
  ],
  mistakesToAvoid: [
    mist("Saying 'Social media is very useful and bad'",
      "Nói 'Social media is very useful and bad'",
      "Contradictory generic adjectives - Task Response 5.",
      "Tính từ mâu thuẫn chung chung - Task Response 5."),
    mist("Using outdated apps as examples ('Yahoo', 'MSN')",
      "Dùng ví dụ ứng dụng lỗi thời ('Yahoo', 'MSN')",
      "Signals memorised answer from an old textbook - examiner suspects rehearsal.",
      "Cho thấy học thuộc từ sách cũ - giám khảo nghi ngờ."),
    mist("Answering 'Yes, I use it every day' and stopping",
      "Trả lời 'Yes, I use it every day' rồi dừng",
      "One-line answer caps Fluency & Coherence at Band 5.",
      "Câu 1 dòng giới hạn Fluency & Coherence ở Band 5."),
  ],
};

// ---------------------------------------------------------------------------
// PART 2 PACKS (Cue Card long turn)
// ---------------------------------------------------------------------------

const PART2_PERSON: Pack = {
  strategySteps: [
    step(1, "In 60s planning: pick a REAL person + 3 anchors",
      "Trong 60s chuẩn bị: chọn người THẬT + 3 mỏ neo",
      "Name, one physical detail, one personality trait, one shared memory. That's your skeleton.",
      "Tên, 1 ngoại hình, 1 tính cách, 1 kỷ niệm chung - bộ khung của bạn."),
    step(2, "Open with who + relationship in one sentence",
      "Mở bằng 'ai + mối quan hệ' trong 1 câu",
      "'The person I'd like to talk about is my paternal grandmother, Nga.'",
      "'The person I'd like to talk about is my paternal grandmother, Nga.'"),
    step(3, "Use SHOW-DON'T-TELL for personality", "Dùng SHOW-DON'T-TELL cho tính cách",
      "Instead of 'She's kind', say 'She still cooks a full pot of pho for the whole street on Sundays.'",
      "Thay vì 'She's kind', nói 'Bà vẫn nấu 1 nồi phở cho cả xóm mỗi chủ nhật.'"),
    step(4, "Close with WHY they influenced you",
      "Kết bằng LÝ DO họ ảnh hưởng đến bạn",
      "'She's the reason I value patience above almost every other quality.'",
      "'Bà là lý do tôi coi trọng sự kiên nhẫn hơn hầu hết đức tính khác.'"),
  ],
  mistakesToAvoid: [
    mist("Reciting a memorised cue-card answer", "Đọc thuộc cue card",
      "Examiners are trained to spot templated openings and penalise fluency.",
      "Giám khảo phát hiện mở bài mẫu và trừ điểm fluency."),
    mist("Only saying 'kind, funny, nice' with no evidence",
      "Chỉ nói 'kind, funny, nice' không dẫn chứng",
      "Flat adjectives cap Lexical Resource at Band 6.",
      "Tính từ phẳng giới hạn Lexical Resource ở Band 6."),
    mist("Running out at 45 seconds", "Hết ý ở giây 45",
      "You should speak 90-120s. Under 60s signals limited fluency - Band 5.",
      "Bạn phải nói 90-120 giây. Dưới 60s = Band 5."),
  ],
};

const PART2_PLACE: Pack = {
  strategySteps: [
    step(1, "Pick a place with sensory potential",
      "Chọn nơi có tiềm năng miêu tả cảm giác",
      "Beaches, markets, hilltops, cafés - anywhere you can invoke sight/sound/smell.",
      "Biển, chợ, đỉnh đồi, quán cà phê - nơi có thể gợi hình/âm/mùi."),
    step(2, "Locate it precisely (city + landmark)",
      "Định vị chính xác (thành phố + mốc)",
      "'Cua Dai Beach, about a 15-minute drive south of Hoi An old town.'",
      "'Biển Cửa Đại, cách phố cổ Hội An chừng 15 phút về phía nam.'"),
    step(3, "Layer 3 senses in your description",
      "Đưa 3 giác quan vào mô tả",
      "Sight (turquoise water), sound (waves + hawkers), smell (grilled seafood).",
      "Hình (nước xanh ngọc), âm (sóng + rao hàng), mùi (hải sản nướng)."),
    step(4, "Tie the place to a personal memory",
      "Nối địa điểm với một kỷ niệm cá nhân",
      "'It's where my family celebrates every Lunar New Year.' - anchors your emotion.",
      "'Đây là nơi gia đình tôi ăn Tết.' - neo cảm xúc."),
  ],
  mistakesToAvoid: [
    mist("Describing the place like a Wikipedia entry",
      "Mô tả như bài Wikipedia",
      "Facts without personal connection kill Task Response and lexis.",
      "Toàn dữ kiện, không cá nhân - phá Task Response."),
    mist("Overusing 'beautiful' and 'amazing'",
      "Lạm dụng 'beautiful' và 'amazing'",
      "Both are Band 5 fillers - upgrade to 'breathtaking', 'stunning', 'idyllic'.",
      "Cả hai là filler Band 5 - nâng thành 'breathtaking', 'stunning', 'idyllic'."),
    mist("Forgetting to answer WHY you like the place",
      "Quên trả lời VÌ SAO thích",
      "The final cue-card bullet ('why you like it') is compulsory - skipping = Band 5.",
      "Bullet cuối ('why you like it') là bắt buộc - bỏ = Band 5."),
  ],
};

const PART2_OBJECT: Pack = {
  strategySteps: [
    step(1, "Pick an object with a story",
      "Chọn đồ vật có câu chuyện",
      "A watch from your father, a first camera, a childhood book - not a random phone.",
      "Đồng hồ của bố, máy ảnh đầu tiên, sách tuổi thơ - không phải chiếc điện thoại ngẫu nhiên."),
    step(2, "Describe physical features precisely",
      "Mô tả đặc điểm vật lý chính xác",
      "Colour, material, size, weight, condition - build the picture.",
      "Màu, chất liệu, kích cỡ, cân nặng, tình trạng - dựng hình ảnh."),
    step(3, "Explain how/when you got it",
      "Kể có được khi nào/thế nào",
      "'It was a graduation gift from my mum back in 2019.' - past simple + date.",
      "'Đó là quà tốt nghiệp mẹ tặng năm 2019.' - quá khứ đơn + thời điểm."),
    step(4, "Reveal its emotional/sentimental value",
      "Bộc lộ giá trị tinh thần",
      "'It's the one thing I'd grab if the house caught fire.' - Band 7 hyperbole.",
      "'Đây là thứ duy nhất tôi vơ theo nếu cháy nhà.' - phóng đại Band 7."),
  ],
  mistakesToAvoid: [
    mist("Choosing 'my phone' or 'my laptop' - too generic",
      "Chọn 'điện thoại' hoặc 'laptop' - quá chung",
      "Common objects offer no unique lexis or narrative - Band 5-6.",
      "Đồ phổ biến không có từ vựng/chuyện riêng - Band 5-6."),
    mist("Skipping the 'why it's important to you' bullet",
      "Bỏ bullet 'vì sao quan trọng với bạn'",
      "This is the highest-marks bullet - missing it caps Task Response at 5.",
      "Đây là bullet cao điểm nhất - bỏ = Task Response 5."),
    mist("Reading a memorised gadget-review script",
      "Đọc kịch bản review đồ công nghệ học thuộc",
      "Examiners detect templated tech specs instantly.",
      "Giám khảo nhận ra template thông số công nghệ ngay."),
  ],
};

const PART2_EVENT: Pack = {
  strategySteps: [
    step(1, "Set the scene: when + where + who",
      "Dựng bối cảnh: khi + đâu + ai",
      "'It was July 2023, at my sister's wedding in Da Nang.' - three anchors in one line.",
      "'Đó là tháng 7/2023, đám cưới chị tôi ở Đà Nẵng.' - ba mỏ neo."),
    step(2, "Narrate with linked past tenses",
      "Kể bằng chuỗi thì quá khứ liên kết",
      "Past simple for events, past continuous for background, past perfect for what happened before.",
      "Quá khứ đơn cho sự kiện, tiếp diễn cho nền, hoàn thành cho việc trước đó."),
    step(3, "Insert dialogue or reaction verbs",
      "Chèn hội thoại hoặc động từ phản ứng",
      "'She burst into tears and whispered 'Thank you'.' - dramatic + Band 7 verbs.",
      "'Chị bật khóc và thì thầm 'Cảm ơn'.' - kịch tính + động từ Band 7."),
    step(4, "Close with the lasting significance",
      "Kết bằng ý nghĩa lâu dài",
      "'That day taught me the power of small gestures.' - reflective closure.",
      "'Ngày đó dạy tôi sức mạnh của cử chỉ nhỏ.' - kết luận phản chiếu."),
  ],
  mistakesToAvoid: [
    mist("Slipping into present tense mid-story",
      "Chuyển sang hiện tại giữa chuyện",
      "'And then she says…' during a past event is a Band 5 tense error.",
      "'And then she says…' trong sự kiện quá khứ là lỗi Band 5."),
    mist("Giving a summary instead of a scene",
      "Kể tóm tắt thay vì dựng cảnh",
      "'It was fun and we ate a lot' - no lexis, no narrative arc.",
      "'It was fun and we ate a lot' - không từ vựng, không cốt truyện."),
    mist("Forgetting the 'why memorable' final bullet",
      "Quên bullet cuối 'vì sao đáng nhớ'",
      "This bullet is where personal reflection lifts you to Band 7.",
      "Bullet này nơi phản chiếu cá nhân đưa lên Band 7."),
  ],
};

const PART2_ACTIVITY: Pack = {
  strategySteps: [
    step(1, "Choose an activity you can describe in stages",
      "Chọn hoạt động có nhiều bước",
      "Cooking, hiking, gaming - anything with 3+ phases lets you show sequence lexis.",
      "Nấu ăn, leo núi, chơi game - hoạt động có ≥3 giai đoạn giúp thể hiện từ nối trình tự."),
    step(2, "Explain WHY you took it up",
      "Giải thích VÌ SAO bắt đầu",
      "'I got into cycling during the lockdown when the gyms closed.' - context + trigger.",
      "'Tôi đến với đạp xe trong đợt phong toả khi phòng gym đóng.' - bối cảnh + nguyên nhân."),
    step(3, "Walk through a typical session",
      "Mô tả một buổi tiêu biểu",
      "'I usually start by warming up for ten minutes, then hit the loop around West Lake…'",
      "'Tôi thường khởi động 10 phút, rồi chạy quanh Hồ Tây…'"),
    step(4, "State the benefit it gives you",
      "Nêu lợi ích nó mang lại",
      "'It clears my head and boosts my energy for the whole week.'",
      "'Nó làm đầu óc thư thái và tiếp năng lượng cả tuần.'"),
  ],
  mistakesToAvoid: [
    mist("Naming an activity you don't actually do",
      "Chọn hoạt động bạn không thực sự làm",
      "You'll run out of authentic detail by 30 seconds - fluency collapses.",
      "Sẽ hết chi tiết thật ở giây 30 - fluency sụp."),
    mist("Only saying 'It's healthy and fun'",
      "Chỉ nói 'It's healthy and fun'",
      "Two shallow adjectives = Band 5 lexis.",
      "Hai tính từ nông = từ vựng Band 5."),
    mist("Skipping sequence linkers (first, then, after that, finally)",
      "Bỏ từ nối trình tự",
      "Sequence markers are Coherence gold - missing them drops CC to 6.",
      "Từ nối trình tự là 'vàng' Coherence - thiếu = CC 6."),
  ],
};

const PART2_TIME: Pack = {
  strategySteps: [
    step(1, "Buy 5-10 seconds with a natural opener",
      "Mua 5-10 giây bằng câu mở tự nhiên",
      "'Let me think for a moment - there are actually a couple of options that come to mind.'",
      "'Để tôi nghĩ một chút - có vài lựa chọn trong đầu.'"),
    step(2, "Note keywords, not full sentences",
      "Ghi từ khoá, không viết cả câu",
      "3-5 nouns/verbs is all your paper needs. Full sentences waste planning time.",
      "3-5 danh/động từ là đủ. Viết cả câu phí thời gian chuẩn bị."),
    step(3, "Use fillers that show thinking, not panic",
      "Dùng filler thể hiện suy nghĩ, không hoảng",
      "'I suppose', 'off the top of my head', 'if I had to pick one' - all Band 7.",
      "'I suppose', 'off the top of my head', 'if I had to pick one' - Band 7."),
    step(4, "Rescue a stalled sentence, don't restart",
      "Cứu câu bị đơ, đừng khởi động lại",
      "'…what I mean is…' or 'let me put that differently' preserves fluency.",
      "'…what I mean is…' hoặc 'let me put that differently' giữ fluency."),
  ],
  mistakesToAvoid: [
    mist("Silent pauses over 4 seconds",
      "Dừng im hơn 4 giây",
      "Silence is the #1 fluency killer - use a filler INSTEAD.",
      "Im lặng là kẻ giết fluency #1 - dùng filler THAY THẾ."),
    mist("Overusing 'um', 'uh', 'you know'",
      "Lạm dụng 'um', 'uh', 'you know'",
      "Filler garbage signals disorganised thought - Band 5-6.",
      "Filler tạp cho thấy tư duy lộn xộn - Band 5-6."),
    mist("Restarting a sentence three times",
      "Khởi động lại 1 câu 3 lần",
      "Repeated restarts crush Coherence - use rescue phrases instead.",
      "Khởi động lại nhiều lần phá Coherence - dùng cụm cứu câu."),
  ],
};

// ---------------------------------------------------------------------------
// PART 3 PACKS (Abstract discussion)
// ---------------------------------------------------------------------------

const PART3_COMPARE: Pack = {
  strategySteps: [
    step(1, "Frame the comparison with 'whereas / while'",
      "Đóng khung so sánh bằng 'whereas / while'",
      "'Whereas traditional classrooms rely on face-to-face interaction, online learning demands self-discipline.'",
      "'Trong khi lớp học truyền thống dựa vào tương tác trực diện, học online đòi hỏi tự kỷ luật.'"),
    step(2, "Use graded comparatives, not extremes",
      "Dùng so sánh có mức, không tuyệt đối",
      "'noticeably more…', 'considerably less…', 'marginally cheaper' - nuance beats 'much better'.",
      "'noticeably more…', 'considerably less…', 'marginally cheaper' - tinh tế hơn 'much better'."),
    step(3, "Give one concrete example per side",
      "Cho 1 ví dụ cụ thể mỗi bên",
      "'For instance, Finland's tuition-free system vs the UK's £9,250 fees.'",
      "'Ví dụ, học phí 0 đồng của Phần Lan vs 9.250 bảng của Anh.'"),
    step(4, "Reach a nuanced verdict, not a tie",
      "Kết luận có sắc thái, không hoà",
      "'On balance, I'd argue X because…' - commit but acknowledge trade-offs.",
      "'Nhìn chung, tôi nghĩ X vì…' - chốt nhưng nhận đánh đổi."),
  ],
  mistakesToAvoid: [
    mist("Comparing without linking words ('X is good. Y is bad.')",
      "So sánh không dùng từ nối",
      "Two isolated statements aren't a comparison - Coherence drops.",
      "Hai câu tách rời không phải so sánh - Coherence rớt."),
    mist("Absolute language ('X is 100% better')",
      "Ngôn ngữ tuyệt đối",
      "'100%' sounds unacademic - use 'significantly' or 'largely'.",
      "'100%' thiếu học thuật - dùng 'significantly' hoặc 'largely'."),
    mist("Refusing to give an opinion",
      "Không chịu nêu quan điểm",
      "Sitting on the fence in Part 3 = Fluency & Coherence 6.",
      "Không chọn phe ở Part 3 = Fluency & Coherence 6."),
  ],
};

const PART3_SPECULATE: Pack = {
  strategySteps: [
    step(1, "Use modal chains for probability",
      "Dùng chuỗi modal cho xác suất",
      "'may well', 'is likely to', 'could potentially', 'will almost certainly' - nuance signals Band 7+.",
      "'may well', 'is likely to', 'could potentially', 'will almost certainly' - Band 7+."),
    step(2, "Anchor future claims to current trends",
      "Neo tương lai vào xu hướng hiện tại",
      "'Given how rapidly AI is advancing, we could see…' - evidence-based speculation.",
      "'Vì AI đang phát triển nhanh, ta có thể thấy…' - phỏng đoán có bằng chứng."),
    step(3, "Hedge with 'in all likelihood', 'chances are'",
      "Rào bằng 'in all likelihood', 'chances are'",
      "Hedging shows academic caution and lifts Lexical Resource.",
      "Rào chắn thể hiện thận trọng học thuật và nâng lexis."),
    step(4, "Close with a knock-on effect ('which would in turn…')",
      "Kết bằng hệ quả dây chuyền",
      "Cause-effect chains are pure Band 7+ syntax.",
      "Chuỗi nhân-quả là cú pháp Band 7+."),
  ],
  mistakesToAvoid: [
    mist("Only using 'will' for every future statement",
      "Chỉ dùng 'will' cho mọi câu tương lai",
      "Modal poverty = Grammar Range Band 5-6.",
      "Nghèo modal = Grammar Range Band 5-6."),
    mist("Making wild predictions with no basis",
      "Dự đoán hoang đường không cơ sở",
      "'Robots will replace all humans in 5 years' loses credibility - Task Response drops.",
      "'Robot thay thế toàn bộ con người trong 5 năm' mất uy tín - Task Response rớt."),
    mist("Confusing 'will' with 'would' in hypotheticals",
      "Nhầm 'will' với 'would' trong giả định",
      "'If governments will invest…' is a Band 5 conditional error.",
      "'If governments will invest…' là lỗi điều kiện Band 5."),
  ],
};

const PART3_CAUSE: Pack = {
  strategySteps: [
    step(1, "Distinguish root cause vs symptom",
      "Phân biệt nguyên nhân gốc và triệu chứng",
      "'Traffic is slow' is a symptom; 'poor urban planning' is a root cause.",
      "'Kẹt xe chậm' là triệu chứng; 'quy hoạch đô thị kém' là gốc."),
    step(2, "Chain causes with linking verbs",
      "Nối các nguyên nhân bằng động từ nối",
      "'triggers', 'leads to', 'stems from', 'gives rise to', 'is compounded by'.",
      "'triggers', 'leads to', 'stems from', 'gives rise to', 'is compounded by'."),
    step(3, "Separate short-term vs long-term effects",
      "Tách hệ quả ngắn hạn và dài hạn",
      "'In the short run… however, over time…' - depth of analysis.",
      "'Trong ngắn hạn… tuy nhiên, về lâu dài…' - phân tích sâu."),
    step(4, "Support with ONE real-world example",
      "Hỗ trợ bằng 1 ví dụ thực tế",
      "'Detroit's decline after the auto-industry collapse illustrates this.'",
      "'Sự suy thoái của Detroit sau khủng hoảng công nghiệp ô tô minh chứng.'"),
  ],
  mistakesToAvoid: [
    mist("Circular reasoning ('It's bad because it's bad')",
      "Lập luận vòng tròn",
      "No genuine cause-effect chain - Task Response 5.",
      "Không có chuỗi nhân-quả thật - Task Response 5."),
    mist("Only listing effects with no cause analysis",
      "Chỉ liệt kê hệ quả, không phân tích nguyên nhân",
      "The examiner asked WHY - missing 'why' loses Task Response.",
      "Giám khảo hỏi VÌ SAO - thiếu 'vì sao' mất Task Response."),
    mist("Overusing 'because' for every link",
      "Lạm dụng 'because' cho mọi liên kết",
      "Single-connective vocabulary caps Grammar Range at Band 6.",
      "Chỉ 1 kiểu nối giới hạn Grammar Range ở Band 6."),
  ],
};

const PART3_OPINION: Pack = {
  strategySteps: [
    step(1, "Signal your stance in the first 5 seconds",
      "Nêu lập trường trong 5 giây đầu",
      "'Personally, I firmly believe that…' - no drifting into 'both sides have merits'.",
      "'Cá nhân tôi tin rằng…' - không lạc sang 'cả hai đều có lý'."),
    step(2, "Justify with 2 layered reasons",
      "Biện luận bằng 2 lý do có tầng",
      "Primary reason + a supporting sub-reason. 'Mainly because… and on top of that…'.",
      "Lý do chính + lý do phụ. 'Mainly because… and on top of that…'."),
    step(3, "Anchor at least one reason in evidence",
      "Neo ít nhất 1 lý do vào bằng chứng",
      "'A recent OECD report showed that…' or 'Take Singapore for instance…'.",
      "'Báo cáo OECD gần đây cho thấy…' hoặc 'Lấy Singapore làm ví dụ…'."),
    step(4, "Concede one counterpoint gracefully",
      "Thừa nhận 1 điểm phản biện có duyên",
      "'Admittedly, some argue X, but on balance…' - Band 7 critical thinking.",
      "'Phải công nhận có người nói X, nhưng nhìn chung…' - phản biện Band 7."),
  ],
  mistakesToAvoid: [
    mist("Refusing to commit ('I think both sides are correct')",
      "Không chốt lập trường",
      "Undecided answers cap Fluency & Coherence at 6.",
      "Câu không chốt giới hạn Fluency & Coherence ở 6."),
    mist("Justifying with 'because I like it'",
      "Biện luận bằng 'because I like it'",
      "Personal taste is not a Part 3 justification - use social/economic reasoning.",
      "Sở thích không phải biện luận Part 3 - dùng lý lẽ xã hội/kinh tế."),
    mist("Repeating the same reason in different words",
      "Lặp cùng 1 lý do bằng từ khác",
      "One idea stretched thin = Task Response 6 ceiling.",
      "Kéo dài 1 ý = trần Task Response 6."),
  ],
};

const PART3_ABSTRACT: Pack = {
  strategySteps: [
    step(1, "Rephrase the abstract term in your own words",
      "Diễn giải lại thuật ngữ trừu tượng",
      "'When we say 'success', I take it to mean not just wealth but fulfilment as well.'",
      "'Nói đến 'thành công', tôi hiểu không chỉ là giàu mà còn là mãn nguyện.'"),
    step(2, "Give a concrete example to ground it",
      "Đưa ví dụ cụ thể để 'neo đất'",
      "Abstract → concrete pivot: 'For instance, a village teacher may feel more successful than a burnt-out CEO.'",
      "Trừu tượng → cụ thể: 'Ví dụ, giáo viên làng có thể thấy thành công hơn CEO kiệt sức.'"),
    step(3, "Use hedging + nominalisation",
      "Dùng rào chắn + danh từ hoá",
      "'The very definition of happiness varies from culture to culture.'",
      "'Chính định nghĩa hạnh phúc thay đổi từ văn hoá này sang văn hoá khác.'"),
    step(4, "Close with a broader implication",
      "Kết bằng hệ luận rộng hơn",
      "'…which suggests that any policy must respect this diversity.'",
      "'…cho thấy mọi chính sách phải tôn trọng sự đa dạng này.'"),
  ],
  mistakesToAvoid: [
    mist("Answering an abstract question with a personal story only",
      "Trả lời câu trừu tượng chỉ bằng chuyện cá nhân",
      "Part 3 requires societal/analytical thinking, not just 'my case'.",
      "Part 3 cần tư duy xã hội/phân tích, không chỉ 'trường hợp tôi'."),
    mist("Getting stuck defining the term forever",
      "Sa lầy định nghĩa mãi thuật ngữ",
      "10 seconds max on definition, then move to analysis.",
      "Tối đa 10 giây định nghĩa, rồi chuyển sang phân tích."),
    mist("Using only concrete, everyday vocabulary",
      "Chỉ dùng từ vựng đời thường",
      "Abstract Part 3 rewards nominalisation and academic lexis.",
      "Part 3 trừu tượng thưởng cho danh từ hoá và từ vựng học thuật."),
  ],
};

const PART3_BUYING_TIME: Pack = {
  strategySteps: [
    step(1, "Master 3 opening buy-time phrases",
      "Thuộc 3 câu mở mua thời gian",
      "'That's an interesting question…', 'Well, let me think for a second…', 'I haven't given it much thought, but…'.",
      "'That's an interesting question…', 'Well, let me think for a second…', 'I haven't given it much thought, but…'."),
    step(2, "Repeat/rephrase the question in your own words",
      "Nhắc lại/diễn giải câu hỏi bằng lời mình",
      "Buys 5 seconds AND shows Fluency + Lexical Resource in one move.",
      "Mua 5 giây VÀ thể hiện Fluency + Lexical Resource cùng lúc."),
    step(3, "Use natural fillers, never 'um-um-um'",
      "Dùng filler tự nhiên, không 'um-um-um'",
      "'I suppose', 'sort of', 'in a way', 'to be honest', 'off the top of my head'.",
      "'I suppose', 'sort of', 'in a way', 'to be honest', 'off the top of my head'."),
    step(4, "Signpost your thinking out loud",
      "Nói ra tiến trình suy nghĩ",
      "'Two things come to mind - first…, and second…'. Turns thinking into structure.",
      "'Có hai điều tôi nghĩ đến - đầu tiên…, thứ hai…'. Biến suy nghĩ thành cấu trúc."),
  ],
  mistakesToAvoid: [
    mist("Long silent pauses over 4 seconds",
      "Dừng im dài hơn 4 giây",
      "Silence murders fluency - always fill with a natural buy-time phrase.",
      "Im lặng giết fluency - luôn lấp bằng cụm mua thời gian tự nhiên."),
    mist("Robotic 'That is a very good question' every time",
      "Lặp máy móc 'That is a very good question'",
      "Overused = flagged as memorised - Band 6 ceiling.",
      "Lặp quá = bị đánh dấu học thuộc - trần Band 6."),
    mist("Buying time then never actually answering",
      "Mua thời gian rồi không trả lời thật",
      "Fillers must lead to a substantive answer or Task Response drops.",
      "Filler phải dẫn tới câu trả lời có nội dung, nếu không rớt Task Response."),
  ],
};

// ---------------------------------------------------------------------------
// PACK MAP
// ---------------------------------------------------------------------------

const SPEAKING_PACKS: Record<string, Pack> = {
  "speaking-part1-home-hometown": PART1_HOME,
  "speaking-part1-work-study": PART1_WORK,
  "speaking-part1-hobbies-free-time": PART1_HOBBIES,
  "speaking-part1-food-cooking": PART1_FOOD,
  "speaking-part1-tech-social-media": PART1_TECH,
  "speaking-part2-describe-person": PART2_PERSON,
  "speaking-part2-describe-place": PART2_PLACE,
  "speaking-part2-describe-object": PART2_OBJECT,
  "speaking-part2-describe-event": PART2_EVENT,
  "speaking-part2-describe-activity": PART2_ACTIVITY,
  "speaking-part2-time-management": PART2_TIME,
  "speaking-part3-comparing-contrasting": PART3_COMPARE,
  "speaking-part3-speculating-predicting": PART3_SPECULATE,
  "speaking-part3-cause-effect-analysis": PART3_CAUSE,
  "speaking-part3-opinion-justification": PART3_OPINION,
  "speaking-part3-abstract-discussion": PART3_ABSTRACT,
  "speaking-part3-buying-time-naturally": PART3_BUYING_TIME,
};

// Signature of the generic factory theory to replace
const GENERIC_FIRST_STEP = "Decode the question intent";
const GENERIC_MIST_MARKER = "Memorised answers delivered word-for-word";

function hasGenericTheory(lecture: IeltsLecture): boolean {
  const firstTitle = lecture.strategySteps?.[0]?.title?.trim() || "";
  if (firstTitle === GENERIC_FIRST_STEP) return true;
  const joinedMist = (lecture.mistakesToAvoid || []).map(m => m.mistake).join(" | ");
  return joinedMist.includes(GENERIC_MIST_MARKER);
}

/**
 * Enrich Speaking lectures whose theory came from the generic mk() factory
 * with hand-crafted, topic-specific Strategy Steps and Mistakes To Avoid.
 * Lectures without a matching pack, or with already-detailed theory, are
 * returned unchanged.
 */
export function enrichSpeakingLectures(lectures: IeltsLecture[]): IeltsLecture[] {
  return lectures.map(lecture => {
    if (lecture.skill !== "speaking") return lecture;
    const pack = SPEAKING_PACKS[lecture.id];
    if (!pack) return lecture;
    if (!hasGenericTheory(lecture)) return lecture;
    return {
      ...lecture,
      strategySteps: pack.strategySteps,
      mistakesToAvoid: pack.mistakesToAvoid,
    };
  });
}
