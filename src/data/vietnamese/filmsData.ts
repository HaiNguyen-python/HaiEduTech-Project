// Vietnamese Films & Real Conversations — clip excerpts with bilingual subtitles for listening practice
export interface FilmClip {
  id: string;
  title: string;
  titleEn: string;
  type: "film" | "vlog" | "interview" | "drama";
  level: "A2" | "B1" | "B2";
  duration: string; // e.g. "2:30"
  youtubeId?: string; // optional
  thumbnail: string; // emoji or color
  synopsis: string;
  synopsisEn: string;
  dialogue: { speaker: string; vi: string; en: string }[];
  vocabHighlight: { vi: string; en: string; note?: string }[];
  comprehensionQ: { q: string; qEn: string; a: string; aEn: string }[];
}

export const filmClips: FilmClip[] = [
  {
    id: "tet-family-dinner",
    title: "Bữa cơm gia đình ngày Tết",
    titleEn: "Family Dinner on Tết",
    type: "drama",
    level: "A2",
    duration: "2:15",
    thumbnail: "🧧",
    synopsis: "Cảnh gia đình ba thế hệ quây quần đêm 30 Tết, ông bà mừng tuổi cháu nhỏ.",
    synopsisEn: "Three generations gather on New Year's Eve; grandparents give lucky money to grandchildren.",
    dialogue: [
      { speaker: "Bà", vi: "Cả nhà ngồi vào ăn cơm thôi nào!", en: "Everyone, come sit down for dinner!" },
      { speaker: "Cháu", vi: "Vâng ạ, cháu đói lắm rồi!", en: "Yes, I'm so hungry!" },
      { speaker: "Ông", vi: "Năm nay cháu được mấy điểm Toán?", en: "How were your Math grades this year?" },
      { speaker: "Cháu", vi: "Cháu được 9.5 điểm ạ.", en: "I got 9.5, grandpa." },
      { speaker: "Ông", vi: "Giỏi quá! Đây, ông lì xì cho cháu.", en: "Excellent! Here, take this lucky money." },
      { speaker: "Cháu", vi: "Cháu cảm ơn ông ạ. Chúc ông sức khỏe!", en: "Thank you, grandpa. Wishing you good health!" },
    ],
    vocabHighlight: [
      { vi: "lì xì", en: "lucky money", note: "Phong bao đỏ tặng dịp Tết" },
      { vi: "mừng tuổi", en: "to give New Year wishes" },
      { vi: "ngồi vào ăn cơm", en: "come sit and eat" },
      { vi: "chúc sức khỏe", en: "wish good health" },
    ],
    comprehensionQ: [
      { q: "Ai được lì xì?", qEn: "Who receives lucky money?", a: "Cháu nhỏ", aEn: "The grandchild" },
      { q: "Cháu được mấy điểm Toán?", qEn: "What was the math grade?", a: "9.5 điểm", aEn: "9.5" },
    ],
  },
  {
    id: "street-food-vlog",
    title: "Vlog ẩm thực Sài Gòn",
    titleEn: "Saigon Street Food Vlog",
    type: "vlog",
    level: "B1",
    duration: "3:40",
    thumbnail: "🍜",
    synopsis: "Vlogger giới thiệu xe bánh mì 30 năm tuổi ở quận 1, phỏng vấn cô chủ quán.",
    synopsisEn: "A vlogger introduces a 30-year-old bánh mì cart in District 1, interviews the owner.",
    dialogue: [
      { speaker: "Vlogger", vi: "Chào mọi người, hôm nay mình ghé một xe bánh mì cực nổi tiếng ở quận 1.", en: "Hi everyone, today I'm visiting a super famous bánh mì cart in District 1." },
      { speaker: "Vlogger", vi: "Cô ơi, cô bán ở đây bao lâu rồi ạ?", en: "Auntie, how long have you been selling here?" },
      { speaker: "Cô chủ", vi: "Cô bán hơn 30 năm rồi con. Từ hồi cô còn trẻ.", en: "Over 30 years, dear. Since I was young." },
      { speaker: "Vlogger", vi: "Bí quyết của bánh mì cô là gì ạ?", en: "What's the secret of your bánh mì?" },
      { speaker: "Cô chủ", vi: "Pate nhà cô tự làm, không có dùng đồ công nghiệp.", en: "I make pate myself, never use processed stuff." },
    ],
    vocabHighlight: [
      { vi: "ghé", en: "to drop by" },
      { vi: "bí quyết", en: "secret/recipe" },
      { vi: "tự làm", en: "homemade" },
      { vi: "đồ công nghiệp", en: "industrial product" },
    ],
    comprehensionQ: [
      { q: "Cô chủ bán bao lâu?", qEn: "How long has she sold?", a: "Hơn 30 năm", aEn: "Over 30 years" },
      { q: "Bí quyết là gì?", qEn: "What's the secret?", a: "Pate tự làm", aEn: "Homemade pate" },
    ],
  },
  {
    id: "office-meeting",
    title: "Họp công ty buổi sáng",
    titleEn: "Morning Office Meeting",
    type: "drama",
    level: "B2",
    duration: "2:50",
    thumbnail: "💼",
    synopsis: "Sếp họp đầu tuần với team marketing, phân công nhiệm vụ chiến dịch mới.",
    synopsisEn: "Boss runs Monday morning meeting with marketing team, assigns tasks for new campaign.",
    dialogue: [
      { speaker: "Sếp", vi: "Tuần này chúng ta sẽ launch chiến dịch mới cho sản phẩm A.", en: "This week we'll launch the new campaign for Product A." },
      { speaker: "Sếp", vi: "Linh phụ trách content, Hùng lo phần thiết kế nhé.", en: "Linh handles content, Hung takes design, OK?" },
      { speaker: "Linh", vi: "Dạ, em sẽ gửi draft trong ngày mai.", en: "Yes, I'll send the draft by tomorrow." },
      { speaker: "Hùng", vi: "Anh ơi, deadline cuối là khi nào ạ?", en: "Boss, when's the final deadline?" },
      { speaker: "Sếp", vi: "Thứ sáu phải xong hết, sáng thứ bảy mình review.", en: "Everything done by Friday, we review Saturday morning." },
    ],
    vocabHighlight: [
      { vi: "phụ trách", en: "in charge of" },
      { vi: "draft", en: "draft (loanword)" },
      { vi: "deadline", en: "deadline (loanword)" },
      { vi: "review", en: "review (loanword)", note: "Tiếng Anh business rất phổ biến trong văn phòng VN" },
    ],
    comprehensionQ: [
      { q: "Linh phụ trách gì?", qEn: "What is Linh in charge of?", a: "Content", aEn: "Content" },
      { q: "Deadline khi nào?", qEn: "When is the deadline?", a: "Thứ sáu", aEn: "Friday" },
    ],
  },
  {
    id: "grandma-story",
    title: "Bà kể chuyện cổ tích",
    titleEn: "Grandma Tells a Folk Tale",
    type: "drama",
    level: "A2",
    duration: "3:00",
    thumbnail: "📖",
    synopsis: "Bà kể chuyện Tấm Cám cho cháu nghe trước khi đi ngủ.",
    synopsisEn: "Grandma narrates the Tam Cam fairy tale to her grandchild at bedtime.",
    dialogue: [
      { speaker: "Cháu", vi: "Bà ơi, bà kể chuyện cổ tích cho cháu nghe đi!", en: "Grandma, tell me a fairy tale!" },
      { speaker: "Bà", vi: "Ngày xửa ngày xưa, có hai chị em tên là Tấm và Cám.", en: "Once upon a time, there were two sisters named Tam and Cam." },
      { speaker: "Bà", vi: "Tấm hiền lành, còn Cám thì lười biếng và độc ác.", en: "Tam was kind, but Cam was lazy and cruel." },
      { speaker: "Cháu", vi: "Rồi sao nữa hả bà?", en: "Then what happened, grandma?" },
      { speaker: "Bà", vi: "Một hôm, dì ghẻ bảo hai chị em đi bắt tôm tép.", en: "One day, the stepmother told the sisters to go catch shrimp." },
    ],
    vocabHighlight: [
      { vi: "ngày xửa ngày xưa", en: "once upon a time" },
      { vi: "hiền lành", en: "kind/gentle" },
      { vi: "lười biếng", en: "lazy" },
      { vi: "dì ghẻ", en: "stepmother" },
    ],
    comprehensionQ: [
      { q: "Hai chị em tên gì?", qEn: "What are the sisters' names?", a: "Tấm và Cám", aEn: "Tam and Cam" },
      { q: "Ai hiền lành hơn?", qEn: "Who is kinder?", a: "Tấm", aEn: "Tam" },
    ],
  },
];
