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

// Holland Code (RIASEC) — 30 questions, 5 per group
export const HOLLAND_QUESTIONS = [
  // R — Realistic (Doer): hands-on, mechanical, physical
  { id: "r1", code: "R", en: "I enjoy building, fixing, or working with my hands", vi: "Tôi thích xây dựng, sửa chữa hoặc làm việc tay chân" },
  { id: "r2", code: "R", en: "I like working with tools, machines, or technology hardware", vi: "Tôi thích làm việc với công cụ, máy móc hoặc thiết bị công nghệ" },
  { id: "r3", code: "R", en: "I prefer outdoor or physical activities over sitting at a desk", vi: "Tôi thích hoạt động ngoài trời hoặc vận động hơn là ngồi bàn giấy" },
  { id: "r4", code: "R", en: "I enjoy taking things apart to see how they work", vi: "Tôi thích tháo rời đồ vật để xem chúng hoạt động thế nào" },
  { id: "r5", code: "R", en: "I would rather see concrete results than abstract ideas", vi: "Tôi thích thấy kết quả cụ thể hơn là ý tưởng trừu tượng" },

  // I — Investigative (Thinker): research, analysis, science
  { id: "i1", code: "I", en: "I enjoy investigating, analyzing, and solving complex problems", vi: "Tôi thích nghiên cứu, phân tích và giải quyết vấn đề phức tạp" },
  { id: "i2", code: "I", en: "I am curious about how the natural world or systems work", vi: "Tôi tò mò về cách thế giới tự nhiên hoặc các hệ thống vận hành" },
  { id: "i3", code: "I", en: "I like reading scientific articles, doing experiments, or research", vi: "Tôi thích đọc bài báo khoa học, làm thí nghiệm hoặc nghiên cứu" },
  { id: "i4", code: "I", en: "I enjoy math, logic puzzles, or data analysis", vi: "Tôi thích toán học, câu đố logic hoặc phân tích dữ liệu" },
  { id: "i5", code: "I", en: "I prefer working independently to think deeply about problems", vi: "Tôi thích làm việc độc lập để suy nghĩ sâu về vấn đề" },

  // A — Artistic (Creator): art, design, expression
  { id: "a1", code: "A", en: "I enjoy creating art, music, writing, or designing", vi: "Tôi thích sáng tạo nghệ thuật, âm nhạc, viết hoặc thiết kế" },
  { id: "a2", code: "A", en: "I express myself best through creative work", vi: "Tôi thể hiện bản thân tốt nhất qua các công việc sáng tạo" },
  { id: "a3", code: "A", en: "I enjoy attending concerts, exhibitions, or cultural events", vi: "Tôi thích đi xem hòa nhạc, triển lãm hoặc sự kiện văn hóa" },
  { id: "a4", code: "A", en: "I value originality and dislike strict rules or routines", vi: "Tôi coi trọng sự độc đáo và không thích quy tắc hoặc khuôn mẫu cứng nhắc" },
  { id: "a5", code: "A", en: "I often imagine new ideas, stories, or visual concepts", vi: "Tôi thường tưởng tượng ra ý tưởng, câu chuyện hoặc hình ảnh mới" },

  // S — Social (Helper): teaching, counseling, helping
  { id: "s1", code: "S", en: "I enjoy helping, teaching, or supporting others", vi: "Tôi thích giúp đỡ, dạy học hoặc hỗ trợ người khác" },
  { id: "s2", code: "S", en: "I'm a good listener and people often share their feelings with me", vi: "Tôi lắng nghe tốt và mọi người thường chia sẻ cảm xúc với tôi" },
  { id: "s3", code: "S", en: "I want my work to make a positive impact on people's lives", vi: "Tôi muốn công việc của mình tạo ra tác động tích cực lên cuộc sống mọi người" },
  { id: "s4", code: "S", en: "I enjoy volunteering or community activities", vi: "Tôi thích hoạt động tình nguyện hoặc cộng đồng" },
  { id: "s5", code: "S", en: "I work well in teams and enjoy collaborating", vi: "Tôi làm việc nhóm tốt và thích hợp tác" },

  // E — Enterprising (Persuader): leadership, sales, business
  { id: "e1", code: "E", en: "I enjoy leading, persuading, or starting projects", vi: "Tôi thích lãnh đạo, thuyết phục hoặc khởi xướng dự án" },
  { id: "e2", code: "E", en: "I am comfortable speaking in front of groups and presenting ideas", vi: "Tôi thoải mái khi nói trước đám đông và trình bày ý tưởng" },
  { id: "e3", code: "E", en: "I am ambitious and motivated by goals, status, or success", vi: "Tôi tham vọng và được thúc đẩy bởi mục tiêu, vị thế hoặc thành công" },
  { id: "e4", code: "E", en: "I would enjoy starting my own business or running an organization", vi: "Tôi sẽ thích khởi nghiệp hoặc điều hành một tổ chức" },
  { id: "e5", code: "E", en: "I enjoy negotiating, debating, or convincing others", vi: "Tôi thích đàm phán, tranh luận hoặc thuyết phục người khác" },

  // C — Conventional (Organizer): structure, data, administration
  { id: "c1", code: "C", en: "I enjoy organizing data, following procedures, working with details", vi: "Tôi thích tổ chức dữ liệu, theo quy trình, làm việc với chi tiết" },
  { id: "c2", code: "C", en: "I am punctual, reliable, and good at meeting deadlines", vi: "Tôi đúng giờ, đáng tin cậy và làm tốt việc đảm bảo thời hạn" },
  { id: "c3", code: "C", en: "I prefer clear instructions and a structured environment", vi: "Tôi thích hướng dẫn rõ ràng và môi trường có cấu trúc" },
  { id: "c4", code: "C", en: "I enjoy working with spreadsheets, schedules, or financial records", vi: "Tôi thích làm việc với bảng tính, lịch trình hoặc hồ sơ tài chính" },
  { id: "c5", code: "C", en: "I am careful, precise, and notice small mistakes others miss", vi: "Tôi cẩn thận, chính xác và phát hiện lỗi nhỏ mà người khác bỏ qua" },
];


export type DilemmaCategory = "career" | "study" | "emotion" | "family" | "social" | "habit";

export interface Dilemma {
  category: DilemmaCategory;
  emoji: string;
  en: string;
  vi: string;
  answerVi: string;
  answerEn: string;
}

export const COMMON_DILEMMAS: Dilemma[] = [
  {
    category: "family", emoji: "👨‍👩‍👧",
    en: "I want to study IT but my parents want me to do Business",
    vi: "Em muốn học IT nhưng bố mẹ muốn em học Kinh doanh",
    answerVi: "Thầy hiểu áp lực của em. Đây không phải cuộc chiến 'em vs bố mẹ' — mà là khoảng cách thông tin. Em hãy thử 3 bước: (1) Tự kiểm chứng đam mê IT bằng 1 khoá học miễn phí 4 tuần (Python, Web). (2) Làm 1 bản 'Business Case' bằng số liệu: lương trung bình IT ở VN, top công ty tuyển dụng, ngành Business Analytics – nơi IT và Kinh doanh giao thoa. (3) Đề xuất với bố mẹ một lộ trình kép: học IT nhưng chọn chuyên ngành 'Hệ thống thông tin Kinh doanh' (MIS). Khi em chứng minh được năng lực + lộ trình rõ ràng, bố mẹ sẽ tin tưởng. Đừng tranh cãi — hãy thuyết phục bằng hành động, em nhé.",
    answerEn: "I understand the pressure. This isn't 'you vs parents' — it's an information gap. Try 3 steps: (1) Validate your IT passion with a free 4-week course. (2) Build a data-backed 'Business Case': IT salaries, top hiring companies, the MIS field where IT meets Business. (3) Propose a hybrid path. Don't argue — persuade through action.",
  },
  {
    category: "study", emoji: "📚",
    en: "I feel overwhelmed by PTE prep — too many skills to master",
    vi: "Em quá tải khi luyện PTE — quá nhiều kỹ năng phải làm chủ",
    answerVi: "Cảm giác đó hoàn toàn bình thường, em à. PTE có 20 dạng bài — nhìn vào ai cũng choáng. Nhưng thầy mách em 'quy tắc 80/20': chỉ 4 dạng bài chiếm 60% điểm số: Read Aloud, Repeat Sentence, Describe Image, Summarize Written Text. Em hãy làm thế này: TUẦN 1-2 chỉ luyện 2 dạng (Read Aloud + Repeat Sentence) — mỗi ngày 30 phút thôi. TUẦN 3-4 thêm 2 dạng nữa. Đừng cố làm hết — hãy làm sâu. Mỗi tuần em sẽ thấy điểm tăng rõ rệt và động lực sẽ trở lại. Nhớ nhé: chậm mà chắc luôn nhanh hơn nhanh mà loạn.",
    answerEn: "That feeling is normal. PTE has 20 task types — anyone would panic. But here's my 80/20 rule: 4 tasks drive 60% of your score. Focus 30 min/day on 2 tasks for weeks 1-2, then add more. Slow and steady wins.",
  },
  {
    category: "emotion", emoji: "🔥",
    en: "I lost motivation halfway through my IELTS journey",
    vi: "Em mất động lực giữa chừng hành trình IELTS",
    answerVi: "Thầy đã thấy hàng trăm học sinh đi qua giai đoạn này — đây là 'bức tường giữa chặng' (mid-journey wall), bình thường thôi em. Động lực không phải là cảm xúc, nó là KỶ LUẬT + Ý NGHĨA. Em thử 3 cách: (1) Viết lại 'Vì sao' của em lên giấy dán bàn học — không phải '7.0' mà là điều phía sau (du học, công việc mơ ước, tự do). (2) Giảm khối lượng xuống 50% trong 1 tuần để nạp lại năng lượng — đừng bỏ hẳn. (3) Tham gia 1 nhóm học cùng (study buddy) — trách nhiệm xã hội mạnh hơn ý chí cá nhân. Hành trình dài cần nhịp thở, em đừng tự trách mình.",
    answerEn: "I've seen hundreds of students hit this 'mid-journey wall' — it's normal. Motivation isn't feeling, it's discipline + meaning. (1) Rewrite your real 'Why' — not '7.0' but what's behind it. (2) Cut workload 50% for a week to recharge. (3) Join a study buddy group. Long journeys need rhythm.",
  },
  {
    category: "emotion", emoji: "🧠",
    en: "I'm afraid I'm not smart enough for a STEM career",
    vi: "Em sợ mình không đủ thông minh cho ngành STEM",
    answerVi: "Em ơi, thầy nói thật: STEM không cần 'thông minh' — STEM cần 'kiên trì'. 90% kỹ sư giỏi nhất thầy biết đều từng bị điểm kém ở Toán, Lý. Cái họ có là thói quen 'gãi đầu 2 tiếng để hiểu 1 khái niệm' thay vì bỏ cuộc sau 5 phút. Đây là 'Growth Mindset' (Carol Dweck). Em hãy thử: chọn 1 chủ đề lập trình em ghét nhất, dành 1 tiếng/ngày trong 30 ngày. Em sẽ kinh ngạc với chính mình. Trí thông minh không phải là điểm xuất phát, nó là kết quả của hàng nghìn lần em chọn không bỏ cuộc.",
    answerEn: "Honestly: STEM doesn't need 'smart' — it needs 'persistence'. 90% of the best engineers I know failed Math early. They have the habit of 'scratching their head for 2 hours' instead of quitting after 5 min. That's Growth Mindset. Pick the topic you hate most, spend 1 hr/day for 30 days. You'll surprise yourself.",
  },
  {
    category: "career", emoji: "🎯",
    en: "I don't know what major to choose for university",
    vi: "Em không biết chọn ngành nào cho đại học",
    answerVi: "Đây là câu hỏi lớn, và thầy mừng vì em hỏi sớm. Em đừng cố tìm ngành 'hoàn hảo' — nó không tồn tại. Hãy dùng khung IKIGAI 4 vòng tròn: (1) Em GIỎI gì? (2) Em YÊU gì? (3) Thế giới CẦN gì? (4) Cái gì TRẢ TIỀN cho em? Giao điểm chính là ngành đáng chọn. Hành động cụ thể: viết ra 5 ngành em đang phân vân, mỗi ngành phỏng vấn 1 người đang làm trong nghề (LinkedIn, người quen). Sau 5 cuộc trò chuyện, em sẽ thấy bức tranh rõ hơn 100 lần đọc trên mạng. Và nhớ: ngành đầu tiên không quyết định cả đời — nó chỉ là điểm xuất phát.",
    answerEn: "Big question — glad you're asking early. Don't seek the 'perfect' major; it doesn't exist. Use IKIGAI: Good at? Love? World needs? Pays? The intersection wins. Action: list 5 majors, interview 1 professional per major on LinkedIn. 5 chats > 100 articles. First major isn't lifelong — it's the starting line.",
  },
  {
    category: "social", emoji: "🎤",
    en: "I struggle with social anxiety in speaking class",
    vi: "Em bị lo âu xã hội khi học lớp Speaking",
    answerVi: "Thầy rất trân trọng việc em chia sẻ điều này. Lo âu khi nói trước người khác là thật, không phải 'yếu đuối'. Khoa học chỉ ra: não em đang đánh giá tình huống là 'nguy hiểm' (fight-or-flight). Em thử ngay 3 kỹ thuật: (1) THỞ 4-7-8: hít 4s, giữ 7s, thở ra 8s — làm 3 lần trước giờ học. (2) GROUNDING 5-4-3-2-1: nhìn 5 thứ, sờ 4 thứ, nghe 3 âm thanh, ngửi 2 mùi, nếm 1 vị — kéo em về hiện tại. (3) Bắt đầu từ NHỎ: chỉ cần nói 1 câu/buổi đầu, tăng dần. Nếu lo âu kéo dài >3 tháng và ảnh hưởng cuộc sống, em hãy gặp chuyên viên tâm lý — đó là sự dũng cảm, không phải yếu đuối.",
    answerEn: "Thank you for sharing this. Speaking anxiety is real, not weakness. Your brain reads it as danger. Try: (1) 4-7-8 breathing before class. (2) 5-4-3-2-1 grounding. (3) Start tiny: 1 sentence/session, then grow. If it lasts >3 months, see a counselor — that's courage.",
  },
  {
    category: "habit", emoji: "⏰",
    en: "I procrastinate a lot — how do I build discipline?",
    vi: "Em hay trì hoãn — làm sao xây dựng kỷ luật?",
    answerVi: "Trì hoãn không phải lười — nó là cách não em né tránh cảm xúc khó chịu (chán, sợ thất bại). Vậy nên 'cố gắng hơn' không hiệu quả. Thầy chỉ em 3 chiến thuật khoa học: (1) QUY TẮC 2 PHÚT: bài nào em ngại, hãy cam kết làm đúng 2 phút. 90% trường hợp em sẽ làm tiếp. (2) POMODORO: 25 phút làm + 5 phút nghỉ. Não em chịu đựng được 25 phút bất kỳ việc gì. (3) THIẾT KẾ MÔI TRƯỜNG: cất điện thoại sang phòng khác, mở sẵn tài liệu trên màn hình. Kỷ luật không phải ý chí — nó là MÔI TRƯỜNG + HỆ THỐNG. Em đừng dựa vào cảm hứng, hãy dựa vào hệ thống.",
    answerEn: "Procrastination isn't laziness — it's brain avoidance of bad feelings. 'Try harder' fails. Use: (1) 2-MINUTE RULE: commit to 2 min, 90% you'll continue. (2) POMODORO: 25/5. (3) ENVIRONMENT DESIGN: phone in another room. Discipline = environment + system, not willpower.",
  },
  {
    category: "family", emoji: "✈️",
    en: "How do I balance studying abroad dreams with family duties?",
    vi: "Làm sao cân bằng giữa giấc mơ du học và bổn phận gia đình?",
    answerVi: "Đây là câu hỏi mà rất nhiều học sinh Việt Nam mang trong lòng, em không cô đơn đâu. Du học không phải 'bỏ rơi gia đình' — đó là đầu tư dài hạn cho cả nhà. Em hãy làm rõ 3 điều với bố mẹ: (1) KẾ HOẠCH TÀI CHÍNH minh bạch (học bổng, làm thêm, dự phòng). (2) KẾ HOẠCH KẾT NỐI: gọi video tuần 2 lần, về thăm 1-2 lần/năm. (3) KẾ HOẠCH TƯƠNG LAI: em sẽ đóng góp gì cho gia đình sau khi về (hỗ trợ tài chính, đưa bố mẹ đi du lịch, chăm sóc khi về già). Bổn phận lớn nhất với bố mẹ không phải ở cạnh — mà là sống có trách nhiệm và hạnh phúc. Hãy đi để trở về mạnh mẽ hơn.",
    answerEn: "Many Vietnamese students carry this — you're not alone. Studying abroad isn't 'abandoning family' — it's a long-term investment for everyone. Clarify 3 things with parents: financial plan, connection plan (video calls, visits), and future contribution plan. The biggest duty isn't proximity — it's living responsibly and happily.",
  },
  {
    category: "study", emoji: "📝",
    en: "I keep forgetting vocabulary I just learned",
    vi: "Em học từ vựng xong là quên ngay",
    answerVi: "Đó là cách bộ não hoạt động bình thường — 'Đường cong lãng quên Ebbinghaus' nói rằng sau 24h em quên 70% nếu không ôn lại. Thầy chỉ em phương pháp SRS (Spaced Repetition): ôn lại từ mới sau 1 ngày → 3 ngày → 7 ngày → 14 ngày → 30 ngày. Dùng Anki hoặc Quizlet để hệ thống tự nhắc. Quan trọng hơn: học từ trong NGỮ CẢNH (ví dụ câu, đoạn hội thoại) chứ đừng học rời rạc. Và áp dụng ngay trong 24h: viết 1 câu, nói 1 lần, dùng trong 1 tin nhắn. Từ nào em DÙNG, từ đó em NHỚ.",
    answerEn: "That's how the brain works — Ebbinghaus's Forgetting Curve says you forget 70% after 24h without review. Use SRS (Spaced Repetition): review at 1, 3, 7, 14, 30 days. Use Anki/Quizlet. Learn words in CONTEXT, and USE them within 24h. What you USE, you REMEMBER.",
  },
  {
    category: "emotion", emoji: "😰",
    en: "I'm scared of failing the exam I've prepared for",
    vi: "Em sợ thi rớt sau bao công sức ôn luyện",
    answerVi: "Sợ rớt nghĩa là em quan tâm — đó là dấu hiệu tốt, không phải xấu. Nhưng em đừng để nỗi sợ điều khiển. Thầy chỉ em 'tách bạch giá trị bản thân và kết quả thi': em là một con người trọn vẹn, dù điểm số thế nào. Trước thi 1 tuần, hãy: (1) Ngủ đủ 7-8 tiếng, không 'thức trắng cày bài'. (2) Làm 1 đề mock dưới điều kiện thật để não quen áp lực. (3) Viết kế hoạch B (nếu rớt thì sao?) — bất ngờ thay, có kế hoạch B làm em bớt sợ. Và nhớ: thi rớt không phải là kết thúc, nó chỉ là dữ liệu để em điều chỉnh. Thầy tin em.",
    answerEn: "Fear of failure means you care — a good sign. Separate self-worth from exam result: you are whole regardless of score. Week before exam: sleep 7-8 hrs, do 1 full mock under real conditions, write Plan B (it reduces fear). Failing isn't the end — it's data. I believe in you.",
  },
  {
    category: "habit", emoji: "📱",
    en: "I'm addicted to phone/social media — it's killing my study time",
    vi: "Em nghiện điện thoại/mạng xã hội — nó đang giết thời gian học của em",
    answerVi: "Em không 'yếu đuối' đâu — TikTok và Instagram được thiết kế bởi 1000 kỹ sư để gây nghiện. Đây là cuộc chiến không cân sức nếu em chỉ dựa vào ý chí. Hãy dùng 'thiết kế ma sát': (1) Xoá app khỏi màn hình chính, chuyển vào folder ẩn. (2) Đặt giới hạn thời gian (Screen Time/Digital Wellbeing) — 30 phút/ngày. (3) Dùng app chặn (Forest, Cold Turkey) khi học. (4) THAY THẾ chứ không CẤM: thay 30 phút TikTok bằng 30 phút đi bộ/đọc sách. Não cần dopamine — hãy cho nó nguồn lành mạnh. Em sẽ thấy đầu óc trở lại sáng suốt sau 2 tuần.",
    answerEn: "You're not weak — TikTok/IG are designed by 1000 engineers to addict you. Use 'friction design': delete from home screen, set 30-min limits, use Forest/Cold Turkey, REPLACE (not ban): swap 30 min TikTok for walking/reading. Brain needs dopamine — give it healthy sources.",
  },
  {
    category: "career", emoji: "🌍",
    en: "AI is taking jobs — should I still pursue my chosen career?",
    vi: "AI đang lấy việc — em có nên theo đuổi nghề mình chọn không?",
    answerVi: "Câu hỏi rất thời sự, thầy mừng vì em suy nghĩ về tương lai. Sự thật: AI thay thế NHIỆM VỤ, không thay thế NGHỀ NGHIỆP. Bác sĩ + AI thay thế bác sĩ không dùng AI. Em hãy hỏi 3 câu: (1) Nghề em chọn có cần SÁNG TẠO + ĐỒNG CẢM + LÃNH ĐẠO không? (Đây là 3 thứ AI yếu nhất.) (2) Em có thể dùng AI làm 'cộng sự' để tăng năng suất 10 lần không? (3) Em có sẵn sàng học tiếp suốt đời không? Nếu trả lời 'có' cho cả 3, hãy yên tâm theo đuổi. Tương lai không thuộc về người giỏi nhất — mà về người thích nghi nhanh nhất. Em đang ở đúng thời điểm để học AI như công cụ, không phải đối thủ.",
    answerEn: "Truth: AI replaces TASKS, not CAREERS. Doctor+AI replaces doctor without AI. Ask: Does your career need creativity + empathy + leadership? Can you use AI as co-pilot for 10x productivity? Are you ready for lifelong learning? Yes to all three — pursue it. The future belongs to the adaptable.",
  },
];

export const DILEMMA_CATEGORIES: { id: DilemmaCategory | "all"; emoji: string; vi: string; en: string }[] = [
  { id: "all", emoji: "🌟", vi: "Tất cả", en: "All" },
  { id: "career", emoji: "🎯", vi: "Hướng nghiệp", en: "Career" },
  { id: "study", emoji: "📚", vi: "Học tập", en: "Study" },
  { id: "emotion", emoji: "💭", vi: "Cảm xúc", en: "Emotion" },
  { id: "family", emoji: "👨‍👩‍👧", vi: "Gia đình", en: "Family" },
  { id: "social", emoji: "🎤", vi: "Xã hội", en: "Social" },
  { id: "habit", emoji: "⏰", vi: "Thói quen", en: "Habit" },
];

export const MOOD_OPTIONS = [
  { value: "great", emoji: "😄", score: 5, en: "Great", vi: "Tuyệt vời" },
  { value: "good", emoji: "🙂", score: 4, en: "Good", vi: "Tốt" },
  { value: "okay", emoji: "😐", score: 3, en: "Okay", vi: "Bình thường" },
  { value: "stressed", emoji: "😟", score: 2, en: "Stressed", vi: "Căng thẳng" },
  { value: "sad", emoji: "😢", score: 1, en: "Sad", vi: "Buồn" },
];
