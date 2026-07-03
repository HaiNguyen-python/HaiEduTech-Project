/**
 * Cultural deep-dives for VFF learners.
 * Bilingual essays paired with "Do & Don't" behavioral tips.
 */
export interface CultureNote {
  id: string;
  emoji: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  body: string;
  bodyEn: string;
  dos: string[];
  donts: string[];
  keyPhrases: { vi: string; en: string }[];
}

export const vffCultureNotes: CultureNote[] = [
  {
    id: "tet",
    emoji: "🧧",
    title: "Tết Nguyên Đán",
    titleEn: "Lunar New Year (Tết)",
    summary: "Lễ lớn nhất trong năm - đoàn tụ gia đình, dọn nhà, mừng tuổi.",
    summaryEn: "The biggest festival of the year - family reunion, cleaning, lucky money.",
    body: "Tết diễn ra vào cuối tháng 1 hoặc đầu tháng 2. Người Việt về quê, dọn dẹp nhà cửa, cúng ông bà tổ tiên và ăn bánh chưng. Trẻ em nhận lì xì (tiền mừng tuổi) trong bao đỏ.",
    bodyEn: "Tết falls in late January or early February. Vietnamese travel home, clean the house, honor ancestors, and eat bánh chưng (sticky rice cake). Kids receive ‘lì xì’ (lucky money) in red envelopes.",
    dos: [
      "Chúc Tết ‘An khang thịnh vượng’ khi gặp người lớn.",
      "Chuẩn bị lì xì lẻ (10k, 20k) cho trẻ em bạn quen.",
      "Mặc màu đỏ hoặc vàng vào mùng 1.",
    ],
    donts: [
      "Không quét nhà hoặc vứt rác vào mùng 1 (kiêng ‘quét đi tài lộc’).",
      "Không cho vay tiền trong 3 ngày Tết.",
      "Không mặc màu trắng/đen (màu tang).",
    ],
    keyPhrases: [
      { vi: "Chúc mừng năm mới!", en: "Happy New Year!" },
      { vi: "An khang thịnh vượng!", en: "Peace and prosperity!" },
      { vi: "Chúc bé hay ăn chóng lớn.", en: "May the kid eat well and grow fast." },
    ],
  },
  {
    id: "cafe",
    emoji: "☕",
    title: "Văn hóa cà phê Việt",
    titleEn: "Vietnamese Coffee Culture",
    summary: "Cà phê phin, sữa đặc, ngồi vỉa hè - cách người Việt ‘slow down’.",
    summaryEn: "Phin drip, condensed milk, sidewalk seating - how Vietnamese slow down.",
    body: "Cà phê Việt dùng phin nhỏ giọt. ‘Cà phê sữa đá’ (cà phê + sữa đặc + đá) là thức uống quốc dân. Người Việt uống cà phê ở vỉa hè, chai ngồi ghế nhựa, có thể ngồi hàng giờ.",
    bodyEn: "Vietnamese coffee uses a small phin filter. ‘Cà phê sữa đá’ (coffee + condensed milk + ice) is the national drink. Locals sip on the sidewalk in plastic chairs for hours.",
    dos: [
      "Chờ 5-7 phút cho phin nhỏ hết.",
      "Khuấy đều trước khi đổ đá.",
      "Gọi ‘cho ly nữa’ để order thêm.",
    ],
    donts: [
      "Đừng vội - văn hóa cà phê là chậm rãi.",
      "Không dùng ống hút nhựa khi có ống inox.",
    ],
    keyPhrases: [
      { vi: "Cho một cà phê sữa đá.", en: "One iced milk coffee." },
      { vi: "Ít đường thôi ạ.", en: "Less sugar please." },
      { vi: "Cho ly nữa!", en: "Another glass!" },
    ],
  },
  {
    id: "market",
    emoji: "🥭",
    title: "Đi chợ & mặc cả",
    titleEn: "Markets & Bargaining",
    summary: "Chợ truyền thống, mặc cả 30-50%, mua theo cân.",
    summaryEn: "Traditional markets, 30-50% bargaining, buying by weight.",
    body: "Ở chợ truyền thống (Bến Thành, Đồng Xuân), giá lần đầu thường cao gấp đôi giá thật. Mặc cả là chuyện bình thường - luôn giữ nụ cười.",
    bodyEn: "At traditional markets (Ben Thanh, Dong Xuan), first prices are often double. Bargaining is expected - always smile.",
    dos: [
      "Trả giá bằng 40-50% giá được ra, tăng dần.",
      "Cầm tiền lẻ để dễ trả tiền.",
      "Hỏi ‘bao nhiêu một cân?’ (per kilogram).",
    ],
    donts: [
      "Không mặc cả rồi bỏ đi lạnh lùng.",
      "Không chụp ảnh không xin phép.",
      "Không mặc cả ở siêu thị hay quán ăn.",
    ],
    keyPhrases: [
      { vi: "Cái này bao nhiêu?", en: "How much is this?" },
      { vi: "Đắt quá! Bớt chút được không?", en: "Too expensive! Can you lower it?" },
      { vi: "Tôi lấy hai cái.", en: "I'll take two." },
    ],
  },
  {
    id: "family",
    emoji: "👨‍👩‍👧",
    title: "Xưng hô trong gia đình",
    titleEn: "Family Pronouns",
    summary: "‘Anh/chị/em’ không chỉ dùng cho người thân mà cho mọi người theo tuổi.",
    summaryEn: "‘Anh/chị/em’ apply not only to family but everyone by age.",
    body: "Tiếng Việt không dùng ‘you’ chung. Tùy tuổi và quan hệ, bạn xưng ‘em/anh/chị/cô/chú/bác/ông/bà’. Sai xưng hô = mất lịch sự.",
    bodyEn: "Vietnamese doesn't have a generic ‘you’. You pick from ‘em/anh/chị/cô/chú/bác/ông/bà’ by age and relation. Wrong pronoun = rude.",
    dos: [
      "Hỏi tuổi ngay khi mới gặp - đó là chuyện bình thường.",
      "Dùng ‘em’ nếu bạn nhỏ tuổi hơn.",
      "Gọi phụ nữ trẻ hơn 30 là ‘chị’, lớn hơn ba mẹ là ‘cô/bác’.",
    ],
    donts: [
      "Không dùng ‘bạn’ với người lớn tuổi hơn.",
      "Không gọi tên trực tiếp khi mới quen.",
    ],
    keyPhrases: [
      { vi: "Em chào anh/chị ạ.", en: "Hello (from younger to older)." },
      { vi: "Anh bao nhiêu tuổi?", en: "How old are you (to older man)?" },
      { vi: "Con chào bác.", en: "Child greeting older uncle/aunt." },
    ],
  },
  {
    id: "meal",
    emoji: "🍚",
    title: "Bàn ăn Việt",
    titleEn: "The Vietnamese Table",
    summary: "Chia sẻ món chung, mời người lớn trước khi ăn.",
    summaryEn: "Share dishes, invite elders before eating.",
    body: "Bữa ăn Việt có cơm + 3-4 món chung + canh. Trước khi ăn, người nhỏ tuổi mời từng người lớn: ‘Con mời ông bà, ba mẹ ăn cơm.’",
    bodyEn: "A Vietnamese meal has rice + 3-4 shared dishes + soup. Before eating, younger members invite elders: ‘Please have your meal.’",
    dos: [
      "Cầm chén cơm khi ăn.",
      "Gắp thức ăn cho người bên cạnh - biểu tượng của sự quan tâm.",
      "Nói ‘cảm ơn cô/chú’ sau bữa.",
    ],
    donts: [
      "Không cắm đũa thẳng vào bát cơm (giống bàn thờ).",
      "Không quay đũa dùng để gắp món chung.",
      "Không phàn nàn món ăn ngay tại bàn.",
    ],
    keyPhrases: [
      { vi: "Con mời cả nhà ăn cơm.", en: "Please everyone, let's eat." },
      { vi: "Ngon quá!", en: "So delicious!" },
      { vi: "Con no rồi ạ.", en: "I'm full (polite)." },
    ],
  },
  {
    id: "traffic",
    emoji: "🛵",
    title: "Giao thông xe máy",
    titleEn: "Motorbike Traffic",
    summary: "Băng qua đường - đi chậm, đều, đừng dừng đột ngột.",
    summaryEn: "Crossing streets - walk slow and steady, never stop suddenly.",
    body: "Việt Nam có 60 triệu xe máy. Băng qua đường: giữ ánh mắt, đi đều, xe sẽ tự né. Đội mũ bảo hiểm là bắt buộc khi đi Grab.",
    bodyEn: "Vietnam has 60M motorbikes. To cross: keep eye contact, walk steadily, bikes will flow around you. Helmets are mandatory on Grab.",
    dos: [
      "Băng qua đường chậm và đều tay.",
      "Đội mũ bảo hiểm khi đi Grab Bike.",
      "Trả trước qua Grab app để tránh mặc cả.",
    ],
    donts: [
      "Không đứng lại giữa đường.",
      "Không chạy hoặc thay đổi hướng đột ngột.",
      "Không đi xe máy khi chưa quen.",
    ],
    keyPhrases: [
      { vi: "Đi chậm giùm em.", en: "Please drive slowly." },
      { vi: "Cho mũ bảo hiểm.", en: "Give me a helmet." },
      { vi: "Dừng lại đây!", en: "Stop here!" },
    ],
  },
];
