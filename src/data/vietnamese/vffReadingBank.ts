/**
 * Graded reading passages for VFF.
 */
export interface ReadingPassage {
  id: string;
  level: "A1" | "A2" | "B1";
  title: string;
  titleEn: string;
  wordCount: number;
  passage: string;
  translation: string;
  glossary: { word: string; en: string }[];
  questions: { q: string; options: string[]; answer: number }[];
}

export const vffReadingBank: ReadingPassage[] = [
  {
    id: "r-a1-01",
    level: "A1",
    title: "Menu quán cà phê",
    titleEn: "Cafe Menu",
    wordCount: 30,
    passage: "MENU\nCà phê đen: 20.000đ\nCà phê sữa đá: 25.000đ\nTrà đào: 35.000đ\nBánh mì thịt: 30.000đ\nGiờ mở cửa: 7:00 - 22:00.",
    translation: "MENU\nBlack coffee: 20,000 VND\nIced milk coffee: 25,000 VND\nPeach tea: 35,000 VND\nMeat banh mi: 30,000 VND\nHours: 7:00 - 22:00.",
    glossary: [
      { word: "cà phê đen", en: "black coffee" },
      { word: "sữa đá", en: "milk + ice" },
      { word: "bánh mì thịt", en: "meat banh mi" },
      { word: "mở cửa", en: "open" },
    ],
    questions: [
      { q: "Iced milk coffee price?", options: ["20k", "25k", "35k"], answer: 1 },
      { q: "Closing time?", options: ["8pm", "10pm", "11pm"], answer: 1 },
    ],
  },
  {
    id: "r-a1-02",
    level: "A1",
    title: "Tin nhắn Grab",
    titleEn: "Grab notification",
    wordCount: 32,
    passage: "Tài xế Minh đang trên đường đến. Xe: Honda Wave, biển số 59-P1 234.56. Thời gian dự kiến: 5 phút. Giá cuốc xe: 45.000đ. Thanh toán tiền mặt.",
    translation: "Driver Minh is on the way. Vehicle: Honda Wave, plate 59-P1 234.56. ETA: 5 min. Fare: 45,000 VND. Payment: cash.",
    glossary: [
      { word: "tài xế", en: "driver" },
      { word: "biển số", en: "license plate" },
      { word: "cuốc xe", en: "ride fare" },
    ],
    questions: [
      { q: "ETA?", options: ["3 min", "5 min", "10 min"], answer: 1 },
      { q: "Payment method?", options: ["Card", "Cash", "App wallet"], answer: 1 },
    ],
  },
  {
    id: "r-a2-01",
    level: "A2",
    title: "Bản đồ chợ đêm",
    titleEn: "Night market flyer",
    wordCount: 62,
    passage: "Chợ đêm Bến Thành mở từ 19:00 đến 24:00 mỗi tối. Có hơn 200 gian hàng bán quần áo, đồ lưu niệm và thức ăn đường phố. Món nổi tiếng: bánh xèo, chè, gỏi cuốn. Có ATM ở cổng chính. Vui lòng giữ đồ cá nhân cẩn thận và không mặc cả quá thấp - hãy tôn trọng người bán.",
    translation: "Ben Thanh Night Market opens 7pm-midnight every night. Over 200 stalls sell clothes, souvenirs, and street food. Popular: bánh xèo, chè, gỏi cuốn. ATM at main gate. Keep personal items safe and don't over-bargain - respect the sellers.",
    glossary: [
      { word: "gian hàng", en: "stall" },
      { word: "đồ lưu niệm", en: "souvenirs" },
      { word: "thức ăn đường phố", en: "street food" },
      { word: "mặc cả", en: "bargain" },
    ],
    questions: [
      { q: "Opening hours?", options: ["6-11pm", "7pm-midnight", "8-10pm"], answer: 1 },
      { q: "Number of stalls?", options: ["~100", "~200+", "~500"], answer: 1 },
      { q: "Advice mentioned?", options: ["Bring credit card", "Don't over-bargain", "Come early morning"], answer: 1 },
    ],
  },
  {
    id: "r-a2-02",
    level: "A2",
    title: "Email đặt phòng",
    titleEn: "Booking email",
    wordCount: 68,
    passage: "Kính gửi khách sạn Sen Vàng,\n\nTôi muốn đặt một phòng đôi từ ngày 15 đến 18 tháng 8, tổng cộng 3 đêm. Vui lòng cho biết giá phòng đã bao gồm bữa sáng chưa? Có dịch vụ đưa đón sân bay không? Nếu hủy trước 3 ngày có mất phí không?\n\nCảm ơn và trân trọng,\nDavid Nguyen",
    translation: "Dear Sen Vang Hotel,\n\nI'd like to book a double room from Aug 15-18, 3 nights total. Please tell me if the price includes breakfast, whether airport transfer is available, and the cancellation fee if I cancel 3 days ahead.\n\nBest regards,\nDavid Nguyen",
    glossary: [
      { word: "phòng đôi", en: "double room" },
      { word: "đưa đón", en: "shuttle" },
      { word: "hủy", en: "cancel" },
      { word: "phí", en: "fee" },
    ],
    questions: [
      { q: "How many nights?", options: ["2", "3", "4"], answer: 1 },
      { q: "Room type?", options: ["Single", "Double", "Suite"], answer: 1 },
      { q: "Cancellation window asked?", options: ["1 day", "3 days", "7 days"], answer: 1 },
    ],
  },
  {
    id: "r-b1-01",
    level: "B1",
    title: "Bài báo thời tiết",
    titleEn: "Weather news",
    wordCount: 95,
    passage: "Theo Trung tâm Dự báo Khí tượng Thủy văn, cuối tuần này miền Nam sẽ có mưa rào và giông vào chiều tối. Nhiệt độ dao động từ 25 đến 33 độ C. Người dân được khuyến cáo mang theo áo mưa khi ra đường và hạn chế đi lại trong thời gian giông sét. Miền Bắc trời nắng, nhiệt độ cao nhất 36 độ - cần bổ sung nước và tránh nắng gắt buổi trưa.",
    translation: "According to the Meteorological Center, this weekend southern Vietnam will have afternoon/evening showers and thunderstorms. Temps 25-33°C. Residents advised to carry raincoats and limit travel during storms. The North will be sunny, up to 36°C - stay hydrated and avoid the midday sun.",
    glossary: [
      { word: "dự báo", en: "forecast" },
      { word: "mưa rào", en: "shower" },
      { word: "giông sét", en: "thunderstorm" },
      { word: "khuyến cáo", en: "advise" },
    ],
    questions: [
      { q: "South weekend weather?", options: ["Sunny", "Showers/storms", "Snow"], answer: 1 },
      { q: "Max temp in the North?", options: ["30°C", "33°C", "36°C"], answer: 2 },
      { q: "Advice for the North?", options: ["Wear coats", "Stay hydrated", "Bring umbrella"], answer: 1 },
    ],
  },
  {
    id: "r-b1-02",
    level: "B1",
    title: "Đánh giá quán ăn",
    titleEn: "Restaurant review",
    wordCount: 92,
    passage: "Quán bún bò Huế trên đường Nguyễn Trãi thực sự làm tôi bất ngờ. Nước dùng đậm đà, cay vừa phải, thịt bò mềm và giá cả rất hợp lý - chỉ 55 nghìn một tô đầy đặn. Không gian nhỏ nhưng sạch sẽ, nhân viên thân thiện, phục vụ nhanh chóng. Điểm trừ duy nhất là chỗ đậu xe khá chật. Tôi cho 4.5/5 sao và chắc chắn sẽ quay lại vào cuối tuần cùng bạn bè.",
    translation: "The bún bò Huế shop on Nguyen Trai truly surprised me. Rich broth, medium spicy, tender beef, and very reasonable - only 55k for a hearty bowl. Small but clean space, friendly staff, fast service. Only downside is tight parking. I give 4.5/5 and will definitely return with friends on the weekend.",
    glossary: [
      { word: "nước dùng", en: "broth" },
      { word: "đậm đà", en: "flavorful/rich" },
      { word: "hợp lý", en: "reasonable" },
      { word: "điểm trừ", en: "downside" },
    ],
    questions: [
      { q: "Rating given?", options: ["3/5", "4/5", "4.5/5"], answer: 2 },
      { q: "Bowl price?", options: ["35k", "55k", "75k"], answer: 1 },
      { q: "Downside mentioned?", options: ["Slow service", "Tight parking", "Too spicy"], answer: 1 },
    ],
  },
];
