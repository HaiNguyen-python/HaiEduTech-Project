// Full MBTI personality test: 40 questions (10 per dimension), Likert -3 to +3
// Plus 16 type profiles with strengths, weaknesses, communication style, careers, and Teacher Hai's note.

export type MbtiDimension = "EI" | "SN" | "TF" | "JP";

export interface MbtiQuestion {
  id: string;
  dim: MbtiDimension;
  // If user agrees (positive Likert), the score goes to `positive`. If disagrees, to the opposite letter.
  positive: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
  en: string;
  vi: string;
}

// 40 statements — 10 per dimension. Mixed direction so positive isn't always the same letter.
export const MBTI_FULL_QUESTIONS: MbtiQuestion[] = [
  // E/I — 10
  { id: "ei1", dim: "EI", positive: "E", en: "I feel energized after spending time with a group of people.", vi: "Tôi cảm thấy tràn đầy năng lượng sau khi dành thời gian với một nhóm người." },
  { id: "ei2", dim: "EI", positive: "I", en: "I prefer quiet evenings alone over loud social gatherings.", vi: "Tôi thích những buổi tối yên tĩnh một mình hơn là tụ tập đông người." },
  { id: "ei3", dim: "EI", positive: "E", en: "I think out loud and process ideas best by talking with others.", vi: "Tôi suy nghĩ thành tiếng và xử lý ý tưởng tốt nhất khi trò chuyện với người khác." },
  { id: "ei4", dim: "EI", positive: "I", en: "I need time alone after socializing to recharge.", vi: "Tôi cần thời gian một mình sau khi giao tiếp để nạp lại năng lượng." },
  { id: "ei5", dim: "EI", positive: "E", en: "I easily start conversations with strangers.", vi: "Tôi dễ dàng bắt chuyện với người lạ." },
  { id: "ei6", dim: "EI", positive: "I", en: "I prefer deep one-on-one conversations to group small talk.", vi: "Tôi thích trò chuyện sâu 1-1 hơn là nói chuyện phiếm trong nhóm." },
  { id: "ei7", dim: "EI", positive: "E", en: "I enjoy being the center of attention.", vi: "Tôi thích trở thành trung tâm của sự chú ý." },
  { id: "ei8", dim: "EI", positive: "I", en: "I think carefully before I speak.", vi: "Tôi suy nghĩ kỹ trước khi nói." },
  { id: "ei9", dim: "EI", positive: "E", en: "I find it draining to spend long hours alone.", vi: "Tôi cảm thấy mệt mỏi khi phải ở một mình quá lâu." },
  { id: "ei10", dim: "EI", positive: "I", en: "Large parties make me feel overwhelmed rather than excited.", vi: "Những bữa tiệc lớn khiến tôi thấy quá tải hơn là hào hứng." },

  // S/N — 10
  { id: "sn1", dim: "SN", positive: "S", en: "I trust facts and concrete details more than theories.", vi: "Tôi tin vào sự kiện và chi tiết cụ thể hơn là các lý thuyết." },
  { id: "sn2", dim: "SN", positive: "N", en: "I often think about future possibilities and hidden meanings.", vi: "Tôi thường nghĩ về các khả năng tương lai và ý nghĩa ẩn giấu." },
  { id: "sn3", dim: "SN", positive: "S", en: "I prefer step-by-step instructions over abstract guidance.", vi: "Tôi thích hướng dẫn từng bước hơn là chỉ dẫn trừu tượng." },
  { id: "sn4", dim: "SN", positive: "N", en: "I love brainstorming new ideas, even impractical ones.", vi: "Tôi thích nảy sinh ý tưởng mới, kể cả những ý không thực tế." },
  { id: "sn5", dim: "SN", positive: "S", en: "I notice small details that others miss.", vi: "Tôi để ý những chi tiết nhỏ mà người khác bỏ qua." },
  { id: "sn6", dim: "SN", positive: "N", en: "I often see patterns and connections between unrelated things.", vi: "Tôi thường thấy các mô hình và mối liên hệ giữa những điều không liên quan." },
  { id: "sn7", dim: "SN", positive: "S", en: "I describe myself as practical and down-to-earth.", vi: "Tôi tự thấy mình thực tế và xuống đất." },
  { id: "sn8", dim: "SN", positive: "N", en: "I get excited by big-picture concepts more than daily routines.", vi: "Tôi hào hứng với những khái niệm lớn hơn là công việc hằng ngày." },
  { id: "sn9", dim: "SN", positive: "S", en: "I prefer learning skills I can use immediately.", vi: "Tôi thích học các kỹ năng có thể dùng ngay." },
  { id: "sn10", dim: "SN", positive: "N", en: "I daydream and imagine alternative scenarios often.", vi: "Tôi thường mơ mộng và tưởng tượng các kịch bản khác." },

  // T/F — 10
  { id: "tf1", dim: "TF", positive: "T", en: "I make decisions based on logic, even when feelings are involved.", vi: "Tôi ra quyết định dựa trên logic, kể cả khi có cảm xúc xen vào." },
  { id: "tf2", dim: "TF", positive: "F", en: "I prioritize harmony and people's feelings over being technically correct.", vi: "Tôi ưu tiên sự hài hòa và cảm xúc của mọi người hơn là đúng kỹ thuật." },
  { id: "tf3", dim: "TF", positive: "T", en: "I'm comfortable giving honest critical feedback.", vi: "Tôi thoải mái khi đưa phản hồi thẳng thắn mang tính phê bình." },
  { id: "tf4", dim: "TF", positive: "F", en: "I easily empathize with others' emotions.", vi: "Tôi dễ dàng đồng cảm với cảm xúc người khác." },
  { id: "tf5", dim: "TF", positive: "T", en: "I value fairness and consistency above personal warmth.", vi: "Tôi coi trọng sự công bằng và nhất quán hơn là sự ấm áp cá nhân." },
  { id: "tf6", dim: "TF", positive: "F", en: "I take criticism personally, even when it's about my work.", vi: "Tôi coi lời phê bình là chuyện cá nhân, kể cả khi nó nói về công việc." },
  { id: "tf7", dim: "TF", positive: "T", en: "I analyze pros and cons before making important choices.", vi: "Tôi phân tích ưu nhược điểm trước khi ra quyết định quan trọng." },
  { id: "tf8", dim: "TF", positive: "F", en: "I often help friends solve their emotional problems.", vi: "Tôi thường giúp bạn bè giải quyết các vấn đề cảm xúc." },
  { id: "tf9", dim: "TF", positive: "T", en: "I believe truth matters more than tact.", vi: "Tôi tin sự thật quan trọng hơn sự khéo léo." },
  { id: "tf10", dim: "TF", positive: "F", en: "I make decisions that consider how others will feel.", vi: "Tôi ra quyết định có cân nhắc cảm xúc của người khác." },

  // J/P — 10
  { id: "jp1", dim: "JP", positive: "J", en: "I like having a clear plan and sticking to it.", vi: "Tôi thích có kế hoạch rõ ràng và tuân theo nó." },
  { id: "jp2", dim: "JP", positive: "P", en: "I prefer keeping my options open rather than committing early.", vi: "Tôi thích giữ các lựa chọn mở thay vì cam kết sớm." },
  { id: "jp3", dim: "JP", positive: "J", en: "I feel uncomfortable when tasks are left unfinished.", vi: "Tôi thấy khó chịu khi công việc còn dang dở." },
  { id: "jp4", dim: "JP", positive: "P", en: "I work better under last-minute pressure.", vi: "Tôi làm việc tốt hơn khi có áp lực phút chót." },
  { id: "jp5", dim: "JP", positive: "J", en: "My workspace and schedule are typically well organized.", vi: "Không gian và lịch trình của tôi thường được sắp xếp gọn gàng." },
  { id: "jp6", dim: "JP", positive: "P", en: "I enjoy spontaneous changes and surprises in my plans.", vi: "Tôi thích những thay đổi và bất ngờ ngoài kế hoạch." },
  { id: "jp7", dim: "JP", positive: "J", en: "I make to-do lists and follow them.", vi: "Tôi lập danh sách việc cần làm và làm theo." },
  { id: "jp8", dim: "JP", positive: "P", en: "I dislike rigid deadlines that limit my flexibility.", vi: "Tôi không thích deadline cứng nhắc làm hạn chế sự linh hoạt." },
  { id: "jp9", dim: "JP", positive: "J", en: "I prefer to finish one project before starting another.", vi: "Tôi thích hoàn thành một dự án trước khi bắt đầu cái khác." },
  { id: "jp10", dim: "JP", positive: "P", en: "I often start projects on impulse without a detailed plan.", vi: "Tôi thường bắt đầu dự án theo ngẫu hứng không có kế hoạch chi tiết." },
];

// Likert labels (-3 to +3)
export const LIKERT_LABELS = [
  { value: -3, en: "Strongly Disagree", vi: "Rất không đồng ý", emoji: "😤" },
  { value: -2, en: "Disagree", vi: "Không đồng ý", emoji: "🙁" },
  { value: -1, en: "Slightly Disagree", vi: "Hơi không đồng ý", emoji: "😐" },
  { value: 0, en: "Neutral", vi: "Trung lập", emoji: "🤔" },
  { value: 1, en: "Slightly Agree", vi: "Hơi đồng ý", emoji: "🙂" },
  { value: 2, en: "Agree", vi: "Đồng ý", emoji: "😊" },
  { value: 3, en: "Strongly Agree", vi: "Rất đồng ý", emoji: "🤩" },
];

// Type profiles — 16 personality types with HaiEduTech-flavored Teacher Hai notes
export interface MbtiTypeProfile {
  code: string;
  title_en: string;
  title_vi: string;
  nickname_en: string;
  nickname_vi: string;
  color: string; // tailwind gradient stops
  description_en: string;
  description_vi: string;
  strengths_en: string[];
  strengths_vi: string[];
  weaknesses_en: string[];
  weaknesses_vi: string[];
  communication_en: string;
  communication_vi: string;
  teacher_note_en: string;
  teacher_note_vi: string;
}

export const MBTI_PROFILES: Record<string, MbtiTypeProfile> = {
  INTJ: {
    code: "INTJ", title_en: "The Architect", title_vi: "Nhà Kiến Trúc Sư",
    nickname_en: "Strategic Mastermind", nickname_vi: "Bộ não Chiến lược",
    color: "from-indigo-500 to-violet-600",
    description_en: "Imaginative, strategic thinkers with a plan for everything. INTJs combine deep analysis with bold long-term vision.",
    description_vi: "Người tư duy chiến lược, giàu trí tưởng tượng, có kế hoạch cho mọi thứ. INTJ kết hợp phân tích sâu sắc với tầm nhìn dài hạn táo bạo.",
    strengths_en: ["Strategic thinking", "Independent & determined", "Quick learner", "Original problem-solver"],
    strengths_vi: ["Tư duy chiến lược", "Độc lập & kiên định", "Học nhanh", "Giải quyết vấn đề sáng tạo"],
    weaknesses_en: ["Can seem aloof", "Overly critical", "Dismissive of emotions", "Perfectionist"],
    weaknesses_vi: ["Có thể bị xem là xa cách", "Quá khắt khe", "Bỏ qua cảm xúc", "Cầu toàn"],
    communication_en: "Direct, structured, prefers written communication and well-prepared discussions. Excellent in research interviews.",
    communication_vi: "Thẳng thắn, có cấu trúc, thích giao tiếp bằng văn bản và thảo luận đã chuẩn bị kỹ. Rất tốt trong phỏng vấn nghiên cứu.",
    teacher_note_en: "INTJs thrive in our Programming and Master's/PhD prep tracks. Build a 6-month roadmap and stick to it — your superpower is execution.",
    teacher_note_vi: "INTJ tỏa sáng trong Lập trình và lộ trình Master's/PhD. Xây kế hoạch 6 tháng và bám chặt — siêu năng lực của em là thực thi.",
  },
  INTP: {
    code: "INTP", title_en: "The Logician", title_vi: "Nhà Logic Học",
    nickname_en: "Curious Theorist", nickname_vi: "Nhà Lý Thuyết Tò Mò",
    color: "from-cyan-500 to-blue-600",
    description_en: "Innovative inventors with an unquenchable thirst for knowledge. INTPs love abstract theories and elegant systems.",
    description_vi: "Nhà phát minh sáng tạo với khát khao kiến thức không đáy. INTP yêu lý thuyết trừu tượng và các hệ thống tinh tế.",
    strengths_en: ["Analytical brilliance", "Open-minded", "Creative & original", "Objective"],
    strengths_vi: ["Phân tích xuất sắc", "Cởi mở", "Sáng tạo & độc đáo", "Khách quan"],
    weaknesses_en: ["Procrastination", "Insensitive to feelings", "Dislikes routine", "Over-thinks"],
    weaknesses_vi: ["Trì hoãn", "Vô tâm với cảm xúc", "Ghét thói quen", "Suy nghĩ quá nhiều"],
    communication_en: "Prefers debate over small talk. Asks probing 'why' questions. Shines in academic discussions.",
    communication_vi: "Thích tranh luận hơn nói chuyện phiếm. Đặt câu hỏi 'vì sao' sâu sắc. Tỏa sáng trong thảo luận học thuật.",
    teacher_note_en: "Em rất hợp Programming Lab và IELTS Academic. Đặt deadline ngắn (3 ngày) để chống trì hoãn — biến tò mò thành sản phẩm.",
    teacher_note_vi: "Em rất hợp Programming Lab và IELTS Academic. Đặt deadline ngắn (3 ngày) để chống trì hoãn — biến tò mò thành sản phẩm.",
  },
  ENTJ: {
    code: "ENTJ", title_en: "The Commander", title_vi: "Nhà Chỉ Huy",
    nickname_en: "Bold Leader", nickname_vi: "Lãnh Đạo Quyết Đoán",
    color: "from-red-500 to-rose-600",
    description_en: "Bold, imaginative leaders who always find a way — or make one. ENTJs are natural-born CEOs.",
    description_vi: "Nhà lãnh đạo táo bạo, giàu trí tưởng tượng, luôn tìm ra cách — hoặc tạo ra cách. ENTJ là CEO bẩm sinh.",
    strengths_en: ["Efficient & strategic", "Strong-willed", "Confident", "Inspiring leader"],
    strengths_vi: ["Hiệu quả & chiến lược", "Ý chí mạnh", "Tự tin", "Lãnh đạo truyền cảm hứng"],
    weaknesses_en: ["Stubborn & dominant", "Impatient", "Cold & ruthless", "Arrogant"],
    weaknesses_vi: ["Cứng đầu & áp đảo", "Thiếu kiên nhẫn", "Lạnh lùng", "Kiêu ngạo"],
    communication_en: "Commanding and direct. Comfortable leading meetings. Excellent in MBA and leadership scholarship interviews.",
    communication_vi: "Chỉ huy và thẳng thắn. Thoải mái dẫn dắt cuộc họp. Xuất sắc trong phỏng vấn MBA và học bổng lãnh đạo.",
    teacher_note_en: "ENTJ phù hợp với PTE Academic, học bổng MBA, và lộ trình du học cấp cao. Học cách lắng nghe team — đó là cấp độ leader tiếp theo.",
    teacher_note_vi: "ENTJ phù hợp với PTE Academic, học bổng MBA, và lộ trình du học cấp cao. Học cách lắng nghe team — đó là cấp độ leader tiếp theo.",
  },
  ENTP: {
    code: "ENTP", title_en: "The Debater", title_vi: "Nhà Tranh Luận",
    nickname_en: "Idea Generator", nickname_vi: "Cỗ Máy Ý Tưởng",
    color: "from-orange-500 to-amber-600",
    description_en: "Smart and curious thinkers who cannot resist an intellectual challenge. ENTPs love debating both sides of any issue.",
    description_vi: "Nhà tư duy thông minh, tò mò, không thể từ chối thử thách trí tuệ. ENTP yêu tranh luận cả hai phía của mọi vấn đề.",
    strengths_en: ["Quick-thinking", "Knowledgeable", "Charismatic", "Original"],
    strengths_vi: ["Nghĩ nhanh", "Hiểu biết rộng", "Có sức hút", "Độc đáo"],
    weaknesses_en: ["Argumentative", "Insensitive", "Easily bored", "Dislikes practical matters"],
    weaknesses_vi: ["Hay tranh cãi", "Vô tâm", "Dễ chán", "Ghét việc thực tế"],
    communication_en: "Witty, persuasive, loves verbal sparring. Naturally great in IELTS Speaking and case interviews.",
    communication_vi: "Hóm hỉnh, thuyết phục, yêu đối đáp. Thiên bẩm giỏi IELTS Speaking và phỏng vấn case.",
    teacher_note_en: "ENTP nên target IELTS Speaking 8.0+ và Master's startup track. Hoàn thành 1 dự án từ đầu đến cuối — đó là level-up.",
    teacher_note_vi: "ENTP nên target IELTS Speaking 8.0+ và Master's startup track. Hoàn thành 1 dự án từ đầu đến cuối — đó là level-up.",
  },
  INFJ: {
    code: "INFJ", title_en: "The Advocate", title_vi: "Người Bênh Vực",
    nickname_en: "Quiet Visionary", nickname_vi: "Nhà Tầm Nhìn Trầm Lặng",
    color: "from-emerald-500 to-teal-600",
    description_en: "Quiet and mystical, yet very inspiring and tireless idealists. INFJs combine empathy with deep insight.",
    description_vi: "Trầm lặng và bí ẩn, nhưng rất truyền cảm hứng và lý tưởng. INFJ kết hợp sự đồng cảm với cái nhìn sâu sắc.",
    strengths_en: ["Insightful", "Passionate & determined", "Altruistic", "Creative"],
    strengths_vi: ["Sâu sắc", "Đam mê & kiên định", "Vị tha", "Sáng tạo"],
    weaknesses_en: ["Sensitive to criticism", "Perfectionist", "Burns out easily", "Private"],
    weaknesses_vi: ["Nhạy cảm với phê bình", "Cầu toàn", "Dễ kiệt sức", "Kín đáo"],
    communication_en: "Thoughtful, written-first, prefers meaningful 1-1 conversations. Excellent in scholarship motivation letters.",
    communication_vi: "Sâu sắc, ưu tiên viết, thích trò chuyện ý nghĩa 1-1. Xuất sắc khi viết motivation letter du học.",
    teacher_note_en: "INFJ rất hợp PhD/Master's nhân văn, ngôn ngữ. Đừng ôm hết mọi nỗi đau của thế giới — em cần nghỉ ngơi để giúp được nhiều hơn.",
    teacher_note_vi: "INFJ rất hợp PhD/Master's nhân văn, ngôn ngữ. Đừng ôm hết mọi nỗi đau của thế giới — em cần nghỉ ngơi để giúp được nhiều hơn.",
  },
  INFP: {
    code: "INFP", title_en: "The Mediator", title_vi: "Người Hòa Giải",
    nickname_en: "Dreamy Idealist", nickname_vi: "Nhà Lý Tưởng Mơ Mộng",
    color: "from-pink-500 to-rose-500",
    description_en: "Poetic, kind and altruistic, always eager to help a good cause. INFPs are guided by deeply-held values.",
    description_vi: "Thi vị, tốt bụng, vị tha, luôn sẵn sàng vì mục đích tốt. INFP được dẫn dắt bởi giá trị sâu sắc.",
    strengths_en: ["Empathetic", "Open-minded", "Creative & passionate", "Loyal"],
    strengths_vi: ["Đồng cảm", "Cởi mở", "Sáng tạo & đam mê", "Trung thành"],
    weaknesses_en: ["Too idealistic", "Takes things personally", "Avoids conflict", "Hard to know"],
    weaknesses_vi: ["Quá lý tưởng", "Nhận chuyện riêng", "Né xung đột", "Khó hiểu"],
    communication_en: "Gentle and metaphorical. Writes beautifully. Best in creative writing and literary studies.",
    communication_vi: "Dịu dàng và đầy ẩn dụ. Viết rất hay. Tốt nhất trong viết sáng tạo và nghiên cứu văn học.",
    teacher_note_en: "INFP nên thử IELTS Writing Task 2 sáng tạo và Vietnamese Poetry. Lịch học cứng nhắc làm em ngộp — chia thành các 'tâm trạng học' linh hoạt.",
    teacher_note_vi: "INFP nên thử IELTS Writing Task 2 sáng tạo và Vietnamese Poetry. Lịch học cứng nhắc làm em ngộp — chia thành các 'tâm trạng học' linh hoạt.",
  },
  ENFJ: {
    code: "ENFJ", title_en: "The Protagonist", title_vi: "Người Chính Diện",
    nickname_en: "Charismatic Mentor", nickname_vi: "Người Cố Vấn Cuốn Hút",
    color: "from-fuchsia-500 to-pink-600",
    description_en: "Charismatic and inspiring leaders, able to mesmerize their listeners. ENFJs are natural teachers and coaches.",
    description_vi: "Lãnh đạo cuốn hút, truyền cảm hứng, có thể thôi miên người nghe. ENFJ là giáo viên và huấn luyện viên bẩm sinh.",
    strengths_en: ["Tolerant & reliable", "Charismatic", "Altruistic", "Natural leader"],
    strengths_vi: ["Khoan dung & tin cậy", "Cuốn hút", "Vị tha", "Lãnh đạo tự nhiên"],
    weaknesses_en: ["Overly idealistic", "Too selfless", "Sensitive", "Approval-seeking"],
    weaknesses_vi: ["Quá lý tưởng", "Quá hy sinh", "Nhạy cảm", "Cần được công nhận"],
    communication_en: "Warm, persuasive, inspiring. Naturally excellent in IELTS Speaking, presentations, and group projects.",
    communication_vi: "Ấm áp, thuyết phục, truyền cảm hứng. Thiên bẩm giỏi IELTS Speaking, thuyết trình, dự án nhóm.",
    teacher_note_en: "ENFJ rất hợp ngành Education, International Relations, học bổng lãnh đạo. Học cách nói 'không' — em không thể cứu cả thế giới một mình.",
    teacher_note_vi: "ENFJ rất hợp ngành Education, International Relations, học bổng lãnh đạo. Học cách nói 'không' — em không thể cứu cả thế giới một mình.",
  },
  ENFP: {
    code: "ENFP", title_en: "The Campaigner", title_vi: "Người Truyền Cảm Hứng",
    nickname_en: "Free Spirit", nickname_vi: "Tâm Hồn Tự Do",
    color: "from-yellow-500 to-orange-500",
    description_en: "Enthusiastic, creative and sociable free spirits, who always find a reason to smile. ENFPs see life as full of possibilities.",
    description_vi: "Tâm hồn tự do nhiệt tình, sáng tạo, hòa đồng, luôn tìm được lý do để cười. ENFP thấy cuộc sống đầy khả năng.",
    strengths_en: ["Curious & energetic", "Excellent communicator", "Festive", "Highly perceptive"],
    strengths_vi: ["Tò mò & tràn năng lượng", "Giao tiếp xuất sắc", "Vui vẻ", "Tinh ý"],
    weaknesses_en: ["Poor practical skills", "Easily stressed", "Highly emotional", "Disorganized"],
    weaknesses_vi: ["Yếu kỹ năng thực tế", "Dễ stress", "Cảm xúc mạnh", "Bừa bộn"],
    communication_en: "Bubbly, enthusiastic, persuasive. Naturally great at IELTS/PTE Speaking. Loves storytelling.",
    communication_vi: "Sôi nổi, nhiệt tình, thuyết phục. Tự nhiên giỏi IELTS/PTE Speaking. Thích kể chuyện.",
    teacher_note_en: "ENFP hợp ngành Marketing, Communications, Du học Mỹ/UK. Lập 1 lịch học cố định 30 phút/ngày — đều đặn nhỏ thắng động lực bùng nổ.",
    teacher_note_vi: "ENFP hợp ngành Marketing, Communications, Du học Mỹ/UK. Lập 1 lịch học cố định 30 phút/ngày — đều đặn nhỏ thắng động lực bùng nổ.",
  },
  ISTJ: {
    code: "ISTJ", title_en: "The Logistician", title_vi: "Người Hậu Cần",
    nickname_en: "Reliable Executor", nickname_vi: "Người Thực Thi Đáng Tin",
    color: "from-slate-500 to-gray-600",
    description_en: "Practical and fact-minded individuals, whose reliability cannot be doubted. ISTJs are the backbone of any institution.",
    description_vi: "Cá nhân thực tế, dựa trên sự kiện, độ tin cậy không thể nghi ngờ. ISTJ là xương sống của mọi tổ chức.",
    strengths_en: ["Honest & direct", "Strong-willed", "Responsible", "Calm & practical"],
    strengths_vi: ["Trung thực & thẳng thắn", "Ý chí mạnh", "Có trách nhiệm", "Bình tĩnh & thực tế"],
    weaknesses_en: ["Stubborn", "Insensitive", "Always by the book", "Judgmental"],
    weaknesses_vi: ["Cứng đầu", "Vô tâm", "Cứng nhắc theo sách", "Hay phán xét"],
    communication_en: "Concise, fact-based. Strong in formal writing and structured exams.",
    communication_vi: "Súc tích, dựa trên sự kiện. Mạnh ở viết trang trọng và thi có cấu trúc.",
    teacher_note_en: "ISTJ thi TOEIC, PTE rất tốt. Hợp ngành Accounting, Logistics, Engineering. Thử thêm hoạt động sáng tạo để mềm hóa tư duy.",
    teacher_note_vi: "ISTJ thi TOEIC, PTE rất tốt. Hợp ngành Accounting, Logistics, Engineering. Thử thêm hoạt động sáng tạo để mềm hóa tư duy.",
  },
  ISFJ: {
    code: "ISFJ", title_en: "The Defender", title_vi: "Người Bảo Vệ",
    nickname_en: "Caring Protector", nickname_vi: "Người Chăm Sóc",
    color: "from-teal-500 to-emerald-600",
    description_en: "Very dedicated and warm protectors, always ready to defend their loved ones. ISFJs combine humility with hard work.",
    description_vi: "Người bảo vệ tận tụy và ấm áp, luôn sẵn sàng bảo vệ người thân. ISFJ kết hợp sự khiêm tốn với chăm chỉ.",
    strengths_en: ["Supportive", "Reliable & patient", "Imaginative", "Loyal & hardworking"],
    strengths_vi: ["Hỗ trợ", "Tin cậy & kiên nhẫn", "Giàu trí tưởng tượng", "Trung thành & chăm chỉ"],
    weaknesses_en: ["Humble & shy", "Takes things personally", "Repress feelings", "Reluctant to change"],
    weaknesses_vi: ["Khiêm tốn & nhút nhát", "Nhận chuyện riêng", "Đè nén cảm xúc", "Ngại thay đổi"],
    communication_en: "Warm, attentive listener. Best in tutoring, healthcare, and supportive professional roles.",
    communication_vi: "Ấm áp, biết lắng nghe. Tốt nhất trong dạy kèm, y tế, và vai trò hỗ trợ chuyên nghiệp.",
    teacher_note_en: "ISFJ hợp Nursing, Education, Social Work du học. Học cách tự khen mình — em xứng đáng được công nhận!",
    teacher_note_vi: "ISFJ hợp Nursing, Education, Social Work du học. Học cách tự khen mình — em xứng đáng được công nhận!",
  },
  ESTJ: {
    code: "ESTJ", title_en: "The Executive", title_vi: "Nhà Điều Hành",
    nickname_en: "Organized Manager", nickname_vi: "Quản Lý Có Tổ Chức",
    color: "from-blue-600 to-indigo-700",
    description_en: "Excellent administrators, unsurpassed at managing things — or people. ESTJs value tradition and order.",
    description_vi: "Quản trị viên xuất sắc, không ai sánh kịp về quản lý — đồ vật hay con người. ESTJ trân trọng truyền thống và trật tự.",
    strengths_en: ["Dedicated", "Strong-willed", "Loyal & reliable", "Honest"],
    strengths_vi: ["Tận tụy", "Ý chí mạnh", "Trung thành & tin cậy", "Trung thực"],
    weaknesses_en: ["Inflexible", "Stubborn", "Judgmental", "Difficulty expressing emotion"],
    weaknesses_vi: ["Không linh hoạt", "Cứng đầu", "Hay phán xét", "Khó bày tỏ cảm xúc"],
    communication_en: "Direct, structured, follows agenda. Excellent in business interviews and TOEIC.",
    communication_vi: "Thẳng thắn, có cấu trúc, theo agenda. Xuất sắc trong phỏng vấn kinh doanh và TOEIC.",
    teacher_note_en: "ESTJ hợp Business, Law, Public Administration. Cho phép bản thân nghỉ một chút — không phải mọi việc đều cần xong NGAY.",
    teacher_note_vi: "ESTJ hợp Business, Law, Public Administration. Cho phép bản thân nghỉ một chút — không phải mọi việc đều cần xong NGAY.",
  },
  ESFJ: {
    code: "ESFJ", title_en: "The Consul", title_vi: "Lãnh Sự",
    nickname_en: "Social Harmonizer", nickname_vi: "Người Hòa Giải Xã Hội",
    color: "from-rose-400 to-pink-500",
    description_en: "Extraordinarily caring, social and popular people, always eager to help. ESFJs are the glue of communities.",
    description_vi: "Người chăm sóc, hòa đồng, được yêu mến, luôn sẵn sàng giúp đỡ. ESFJ là chất keo gắn kết cộng đồng.",
    strengths_en: ["Strong practical skills", "Loyal", "Sensitive & warm", "Good connectors"],
    strengths_vi: ["Kỹ năng thực tế tốt", "Trung thành", "Nhạy cảm & ấm áp", "Kết nối giỏi"],
    weaknesses_en: ["Worried about social status", "Inflexible", "Reluctant to innovate", "Vulnerable to criticism"],
    weaknesses_vi: ["Lo lắng địa vị xã hội", "Không linh hoạt", "Ngại đổi mới", "Dễ tổn thương"],
    communication_en: "Warm and engaging. Loves group study and team projects. Strong in conversational language.",
    communication_vi: "Ấm áp và lôi cuốn. Thích học nhóm và dự án team. Mạnh ở giao tiếp ngôn ngữ.",
    teacher_note_en: "ESFJ hợp Hospitality, Education, Healthcare. Conversational English/Chinese rất hợp em — học cùng bạn để duy trì động lực.",
    teacher_note_vi: "ESFJ hợp Hospitality, Education, Healthcare. Conversational English/Chinese rất hợp em — học cùng bạn để duy trì động lực.",
  },
  ISTP: {
    code: "ISTP", title_en: "The Virtuoso", title_vi: "Người Khéo Léo",
    nickname_en: "Hands-on Maker", nickname_vi: "Người Làm Thực Hành",
    color: "from-stone-500 to-amber-700",
    description_en: "Bold and practical experimenters, masters of all kinds of tools. ISTPs love to take things apart and understand how they work.",
    description_vi: "Người thử nghiệm táo bạo và thực tế, bậc thầy của mọi loại công cụ. ISTP thích tháo rời mọi thứ để hiểu cách chúng hoạt động.",
    strengths_en: ["Optimistic & energetic", "Creative & practical", "Spontaneous", "Knows how to prioritize"],
    strengths_vi: ["Lạc quan & nhiều năng lượng", "Sáng tạo & thực tế", "Tự phát", "Biết ưu tiên"],
    weaknesses_en: ["Stubborn", "Insensitive", "Private & reserved", "Easily bored"],
    weaknesses_vi: ["Cứng đầu", "Vô tâm", "Kín đáo", "Dễ chán"],
    communication_en: "Brief, action-oriented. Show, don't tell. Best in hands-on coding labs and engineering.",
    communication_vi: "Ngắn gọn, hướng hành động. Làm hơn nói. Tốt nhất trong lab lập trình và kỹ thuật.",
    teacher_note_en: "ISTP hợp Programming Lab (Python/SQL), Mechanical Engineering. Project-based learning > sách vở — code trước, đọc lý thuyết sau.",
    teacher_note_vi: "ISTP hợp Programming Lab (Python/SQL), Mechanical Engineering. Học qua dự án > sách vở — code trước, đọc lý thuyết sau.",
  },
  ISFP: {
    code: "ISFP", title_en: "The Adventurer", title_vi: "Nhà Phiêu Lưu",
    nickname_en: "Gentle Artist", nickname_vi: "Nghệ Sĩ Dịu Dàng",
    color: "from-lime-500 to-green-600",
    description_en: "Flexible and charming artists, always ready to explore and experience something new. ISFPs see beauty everywhere.",
    description_vi: "Nghệ sĩ linh hoạt và quyến rũ, luôn sẵn sàng khám phá điều mới. ISFP thấy vẻ đẹp ở khắp nơi.",
    strengths_en: ["Charming", "Sensitive to others", "Imaginative", "Passionate"],
    strengths_vi: ["Quyến rũ", "Nhạy cảm với người khác", "Giàu trí tưởng tượng", "Đam mê"],
    weaknesses_en: ["Fiercely independent", "Unpredictable", "Easily stressed", "Overly competitive"],
    weaknesses_vi: ["Độc lập mạnh mẽ", "Khó đoán", "Dễ stress", "Quá cạnh tranh"],
    communication_en: "Visual and expressive. Best in art, design, and creative language learning.",
    communication_vi: "Trực quan và biểu cảm. Tốt nhất trong nghệ thuật, thiết kế, học ngôn ngữ sáng tạo.",
    teacher_note_en: "ISFP hợp Design, Art, Vietnamese Poetry, Folklore. Lịch học cứng nhắc giết động lực — học theo dự án sáng tạo nhỏ.",
    teacher_note_vi: "ISFP hợp Design, Art, Thơ ca Việt Nam, Folklore. Lịch cứng nhắc giết động lực — học qua dự án sáng tạo nhỏ.",
  },
  ESTP: {
    code: "ESTP", title_en: "The Entrepreneur", title_vi: "Nhà Khởi Nghiệp",
    nickname_en: "Energetic Doer", nickname_vi: "Người Hành Động Năng Lượng",
    color: "from-red-600 to-orange-600",
    description_en: "Smart, energetic and very perceptive people, who truly enjoy living on the edge. ESTPs make decisions on the fly.",
    description_vi: "Người thông minh, năng động, tinh ý, thực sự thích sống ở giới hạn. ESTP ra quyết định nhanh chóng.",
    strengths_en: ["Bold", "Rational & practical", "Original", "Perceptive"],
    strengths_vi: ["Táo bạo", "Lý trí & thực tế", "Độc đáo", "Tinh ý"],
    weaknesses_en: ["Insensitive", "Impatient", "Risk-prone", "Unstructured"],
    weaknesses_vi: ["Vô tâm", "Thiếu kiên nhẫn", "Liều lĩnh", "Không cấu trúc"],
    communication_en: "Energetic and direct. Loves face-to-face. Strong in sales-style speaking and negotiations.",
    communication_vi: "Năng động và thẳng thắn. Thích gặp mặt. Mạnh ở nói kiểu bán hàng và đàm phán.",
    teacher_note_en: "ESTP hợp Business, Sales, Sports Management. PTE Academic > IELTS Academic vì nó nhanh và gọn hơn.",
    teacher_note_vi: "ESTP hợp Business, Sales, Sports Management. PTE Academic > IELTS Academic vì nó nhanh và gọn hơn.",
  },
  ESFP: {
    code: "ESFP", title_en: "The Entertainer", title_vi: "Người Trình Diễn",
    nickname_en: "Spontaneous Star", nickname_vi: "Ngôi Sao Tự Phát",
    color: "from-pink-500 to-fuchsia-600",
    description_en: "Spontaneous, energetic and enthusiastic people — life is never boring around them. ESFPs love being the center of attention.",
    description_vi: "Người tự phát, năng động và nhiệt tình — cuộc sống không bao giờ nhàm chán quanh họ. ESFP thích là trung tâm chú ý.",
    strengths_en: ["Bold", "Original", "Aesthetics & showmanship", "Practical"],
    strengths_vi: ["Táo bạo", "Độc đáo", "Thẩm mỹ & trình diễn", "Thực tế"],
    weaknesses_en: ["Sensitive", "Conflict-averse", "Easily bored", "Poor long-term planning"],
    weaknesses_vi: ["Nhạy cảm", "Né xung đột", "Dễ chán", "Yếu kế hoạch dài hạn"],
    communication_en: "Lively and storyteller. Excellent in IELTS/PTE Speaking, presentations, and acting.",
    communication_vi: "Sống động và kể chuyện hay. Xuất sắc trong IELTS/PTE Speaking, thuyết trình, diễn xuất.",
    teacher_note_en: "ESFP hợp Hospitality, Performing Arts, Tourism. Conversational English/Chinese hợp em — học bằng karaoke, phim, podcast.",
    teacher_note_vi: "ESFP hợp Hospitality, Nghệ thuật biểu diễn, Du lịch. Conversational English/Chinese hợp em — học bằng karaoke, phim, podcast.",
  },
};

// Compute MBTI code from Likert answers (-3..+3 per question)
export function computeMbtiCode(answers: Record<string, number>): {
  code: string;
  scores: Record<MbtiDimension, { positive: number; negative: number; pct: number }>;
} {
  const dims: MbtiDimension[] = ["EI", "SN", "TF", "JP"];
  const scores: Record<string, { positive: number; negative: number; pct: number }> = {};
  let code = "";

  for (const dim of dims) {
    const qs = MBTI_FULL_QUESTIONS.filter((q) => q.dim === dim);
    let posSum = 0;
    let negSum = 0;
    let maxPossible = 0;
    for (const q of qs) {
      const ans = answers[q.id] ?? 0;
      maxPossible += 3;
      if (ans > 0) posSum += ans;
      else if (ans < 0) negSum += -ans;
    }
    const positiveLetter = qs[0].positive; // all questions in dim have a "positive" letter representing the typed direction
    // But in our data each question has its own positive letter — we tally by per-question positive
    posSum = 0;
    negSum = 0;
    for (const q of qs) {
      const ans = answers[q.id] ?? 0;
      if (ans > 0) {
        // user agrees → counts toward q.positive
        if (q.positive === dim[0] || q.positive === dim[1]) {
          if (q.positive === dim[0]) posSum += ans; // dim[0] is first letter (E,S,T,J)
          else negSum += ans;
        }
      } else if (ans < 0) {
        if (q.positive === dim[0]) negSum += -ans;
        else posSum += -ans;
      }
    }
    const total = posSum + negSum || 1;
    const pct = (posSum / total) * 100;
    const letter = posSum >= negSum ? dim[0] : dim[1];
    code += letter;
    scores[dim] = { positive: posSum, negative: negSum, pct: Math.round(pct) };
  }

  return { code, scores: scores as any };
}
