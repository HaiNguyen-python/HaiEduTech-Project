// Static data for IKIGAI prompts, MBTI questions (mini), Holland Code, and common dilemmas

export const IKIGAI_QUESTIONS = [
  {
    id: "love",
    en: "What do you LOVE doing? (activities, subjects, hobbies that make you lose track of time)",
    vi: "Em YÊU THÍCH làm gì? (hoạt động, môn học, sở thích khiến em quên cả thời gian)",
    placeholder_en: "e.g. Reading novels, debugging code, drawing, helping friends...",
    placeholder_vi: "VD: Đọc tiểu thuyết, debug code, vẽ tranh, giúp bạn bè...",
  },
  {
    id: "good_at",
    en: "What are you GOOD AT? (skills, talents — what others praise you for)",
    vi: "Em GIỎI cái gì? (kỹ năng, năng khiếu — điều người khác khen em)",
    placeholder_en: "e.g. Logical thinking, languages, listening, public speaking...",
    placeholder_vi: "VD: Tư duy logic, ngôn ngữ, lắng nghe, nói trước đám đông...",
  },
  {
    id: "world_needs",
    en: "What does the WORLD NEED that resonates with you?",
    vi: "Điều gì THẾ GIỚI CẦN mà em quan tâm?",
    placeholder_en: "e.g. Better education, climate action, mental health support...",
    placeholder_vi: "VD: Giáo dục tốt hơn, hành động vì khí hậu, sức khỏe tinh thần...",
  },
  {
    id: "paid_for",
    en: "What can you be PAID FOR? (skills with market value)",
    vi: "Em có thể được TRẢ TIỀN cho việc gì? (kỹ năng có giá trị thị trường)",
    placeholder_en: "e.g. Programming, teaching English, design, data analysis...",
    placeholder_vi: "VD: Lập trình, dạy tiếng Anh, thiết kế, phân tích dữ liệu...",
  },
];

// Mini MBTI: 8 questions, 2 per dimension
export const MBTI_QUESTIONS = [
  { id: "ei1", dim: "EI", en: "At a party, I prefer to:", vi: "Trong buổi tiệc, tôi thích:", a: { en: "Talk to many people", vi: "Trò chuyện với nhiều người", v: "E" }, b: { en: "Have deep talks with a few", vi: "Trò chuyện sâu với vài người", v: "I" } },
  { id: "ei2", dim: "EI", en: "I recharge my energy by:", vi: "Tôi nạp năng lượng bằng cách:", a: { en: "Being around people", vi: "Ở bên mọi người", v: "E" }, b: { en: "Spending time alone", vi: "Dành thời gian một mình", v: "I" } },
  { id: "sn1", dim: "SN", en: "I tend to focus on:", vi: "Tôi có xu hướng tập trung vào:", a: { en: "Concrete facts and details", vi: "Sự kiện và chi tiết cụ thể", v: "S" }, b: { en: "Patterns and possibilities", vi: "Mô hình và khả năng", v: "N" } },
  { id: "sn2", dim: "SN", en: "I prefer instructions that are:", vi: "Tôi thích hướng dẫn:", a: { en: "Step-by-step practical", vi: "Từng bước, thực tế", v: "S" }, b: { en: "Big-picture conceptual", vi: "Tổng quan, mang tính khái niệm", v: "N" } },
  { id: "tf1", dim: "TF", en: "When deciding, I value:", vi: "Khi quyết định, tôi coi trọng:", a: { en: "Logic and consistency", vi: "Logic và tính nhất quán", v: "T" }, b: { en: "Harmony and people's feelings", vi: "Sự hài hòa và cảm xúc mọi người", v: "F" } },
  { id: "tf2", dim: "TF", en: "I'm more likely to:", vi: "Tôi có xu hướng:", a: { en: "Critique to improve", vi: "Phê bình để cải thiện", v: "T" }, b: { en: "Encourage and empathize", vi: "Khuyến khích và đồng cảm", v: "F" } },
  { id: "jp1", dim: "JP", en: "My workspace is usually:", vi: "Không gian làm việc của tôi thường:", a: { en: "Organized and planned", vi: "Có tổ chức, có kế hoạch", v: "J" }, b: { en: "Flexible and spontaneous", vi: "Linh hoạt, tự phát", v: "P" } },
  { id: "jp2", dim: "JP", en: "I prefer deadlines that are:", vi: "Tôi thích deadline:", a: { en: "Fixed and clear", vi: "Cố định, rõ ràng", v: "J" }, b: { en: "Open and adjustable", vi: "Mở, có thể điều chỉnh", v: "P" } },
];

// Holland Code (RIASEC) — short version
export const HOLLAND_QUESTIONS = [
  { id: "r", code: "R", en: "I enjoy building, fixing, or working with my hands", vi: "Tôi thích xây dựng, sửa chữa hoặc làm việc tay chân" },
  { id: "i", code: "I", en: "I enjoy investigating, analyzing, and solving complex problems", vi: "Tôi thích nghiên cứu, phân tích và giải quyết vấn đề phức tạp" },
  { id: "a", code: "A", en: "I enjoy creating art, music, writing, or designing", vi: "Tôi thích sáng tạo nghệ thuật, âm nhạc, viết hoặc thiết kế" },
  { id: "s", code: "S", en: "I enjoy helping, teaching, or supporting others", vi: "Tôi thích giúp đỡ, dạy học hoặc hỗ trợ người khác" },
  { id: "e", code: "E", en: "I enjoy leading, persuading, or starting projects", vi: "Tôi thích lãnh đạo, thuyết phục hoặc khởi xướng dự án" },
  { id: "c", code: "C", en: "I enjoy organizing data, following procedures, working with details", vi: "Tôi thích tổ chức dữ liệu, theo quy trình, làm việc với chi tiết" },
];

export const COMMON_DILEMMAS = [
  { en: "I want to study IT but my parents want me to do Business", vi: "Em muốn học IT nhưng bố mẹ muốn em học Kinh doanh" },
  { en: "I feel overwhelmed by PTE prep — too many skills to master", vi: "Em quá tải khi luyện PTE — quá nhiều kỹ năng phải làm chủ" },
  { en: "I lost motivation halfway through my IELTS journey", vi: "Em mất động lực giữa chừng hành trình IELTS" },
  { en: "I'm afraid I'm not smart enough for a STEM career", vi: "Em sợ mình không đủ thông minh cho ngành STEM" },
  { en: "I don't know what major to choose for university", vi: "Em không biết chọn ngành nào cho đại học" },
  { en: "I struggle with social anxiety in speaking class", vi: "Em bị lo âu xã hội khi học lớp Speaking" },
  { en: "I procrastinate a lot — how do I build discipline?", vi: "Em hay trì hoãn — làm sao xây dựng kỷ luật?" },
  { en: "How do I balance studying abroad dreams with family duties?", vi: "Làm sao cân bằng giữa giấc mơ du học và bổn phận gia đình?" },
];

export const MOOD_OPTIONS = [
  { value: "great", emoji: "😄", score: 5, en: "Great", vi: "Tuyệt vời" },
  { value: "good", emoji: "🙂", score: 4, en: "Good", vi: "Tốt" },
  { value: "okay", emoji: "😐", score: 3, en: "Okay", vi: "Bình thường" },
  { value: "stressed", emoji: "😟", score: 2, en: "Stressed", vi: "Căng thẳng" },
  { value: "sad", emoji: "😢", score: 1, en: "Sad", vi: "Buồn" },
];
