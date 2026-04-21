// Regions expansion — Top travel destinations với chi tiết & itinerary
export interface TravelDestination {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  region: "north" | "central" | "south";
  type: "beach" | "mountain" | "city" | "heritage" | "rural";
  bestTime: string;
  bestTimeEn: string;
  duration: string;
  duringEn: string;
  highlights: { vi: string; en: string }[];
  mustEat: { vi: string; en: string }[];
  tip: string;
  tipEn: string;
}

export const travelDestinations: TravelDestination[] = [
  {
    id: "halong",
    name: "Vịnh Hạ Long",
    nameEn: "Halong Bay",
    emoji: "⛵",
    region: "north",
    type: "heritage",
    bestTime: "Tháng 10–4 (mát mẻ, ít mưa)",
    bestTimeEn: "Oct–Apr (cool, less rain)",
    duration: "2–3 ngày",
    duringEn: "2–3 days",
    highlights: [
      { vi: "Tour du thuyền 2N1Đ ngủ trên vịnh", en: "2D1N overnight cruise on the bay" },
      { vi: "Hang Sửng Sốt — hang động lớn nhất", en: "Sung Sot Cave — the largest cave" },
      { vi: "Đảo Ti Tốp — leo núi ngắm vịnh", en: "Ti Top Island — hike for panoramic views" },
      { vi: "Chèo kayak qua hang Luồn", en: "Kayak through Luon Cave" },
    ],
    mustEat: [
      { vi: "Chả mực Hạ Long", en: "Halong squid cake" },
      { vi: "Sá sùng nướng", en: "Grilled peanut worm" },
    ],
    tip: "Chọn tour du thuyền uy tín (Bhaya, Paradise) — tránh ngày thời tiết xấu để không bị hủy chuyến.",
    tipEn: "Book reputable cruises (Bhaya, Paradise) — avoid bad weather days to prevent cancellation.",
  },
  {
    id: "sapa",
    name: "Sapa",
    nameEn: "Sapa",
    emoji: "🌾",
    region: "north",
    type: "mountain",
    bestTime: "Tháng 9–11 (lúa chín vàng)",
    bestTimeEn: "Sep–Nov (golden rice harvest)",
    duration: "3 ngày 2 đêm",
    duringEn: "3 days 2 nights",
    highlights: [
      { vi: "Trekking bản Cát Cát, Tả Van", en: "Trek to Cat Cat, Ta Van villages" },
      { vi: "Cáp treo Fansipan — nóc nhà Đông Dương 3143m", en: "Fansipan cable car — roof of Indochina 3,143m" },
      { vi: "Ruộng bậc thang Mường Hoa", en: "Muong Hoa terraced rice fields" },
      { vi: "Chợ tình Sapa thứ 7", en: "Sapa love market on Saturdays" },
    ],
    mustEat: [
      { vi: "Cá hồi Sa Pa nướng", en: "Sapa grilled salmon" },
      { vi: "Thắng cố", en: "H'mong horse meat stew" },
      { vi: "Cơm lam", en: "Bamboo-tube sticky rice" },
    ],
    tip: "Mang áo ấm cả mùa hè vì đêm lạnh. Thuê hướng dẫn viên người H'mong địa phương để hiểu sâu văn hóa.",
    tipEn: "Bring warm clothes even in summer — nights are cold. Hire a local H'mong guide for deeper cultural insight.",
  },
  {
    id: "hoian",
    name: "Phố cổ Hội An",
    nameEn: "Hoi An Ancient Town",
    emoji: "🏮",
    region: "central",
    type: "heritage",
    bestTime: "Tháng 2–5 (khô ráo, ít bão)",
    bestTimeEn: "Feb–May (dry, no storms)",
    duration: "2 ngày",
    duringEn: "2 days",
    highlights: [
      { vi: "Đi bộ phố cổ buổi tối — đèn lồng đẹp huyền ảo", en: "Walk old town at night — magical lantern lights" },
      { vi: "Thuê áo dài chụp ảnh", en: "Rent áo dài for photos" },
      { vi: "Tham quan Chùa Cầu — biểu tượng Hội An", en: "Visit Japanese Bridge — Hoi An's icon" },
      { vi: "Đi thuyền thả đèn hoa đăng đêm rằm", en: "Boat ride and float lanterns on full moon nights" },
      { vi: "May áo dài, comple chỉ trong 24h", en: "Tailor-made áo dài or suit in 24 hours" },
    ],
    mustEat: [
      { vi: "Cao lầu", en: "Cao lau noodles" },
      { vi: "Cơm gà Hội An", en: "Hoi An chicken rice" },
      { vi: "Bánh mì Phượng (huyền thoại)", en: "Banh Mi Phuong (legendary)" },
    ],
    tip: "Mua vé tham quan phố cổ (120k VND) cho 5 di tích. Tránh trưa nóng — đi sáng sớm hoặc chiều muộn.",
    tipEn: "Buy old town pass (120k VND) for 5 attractions. Avoid hot midday — go early morning or late afternoon.",
  },
  {
    id: "phongnha",
    name: "Phong Nha — Kẻ Bàng",
    nameEn: "Phong Nha-Ke Bang",
    emoji: "🕳️",
    region: "central",
    type: "heritage",
    bestTime: "Tháng 3–8 (khô)",
    bestTimeEn: "Mar–Aug (dry season)",
    duration: "2–3 ngày",
    duringEn: "2–3 days",
    highlights: [
      { vi: "Hang Sơn Đoòng — hang lớn nhất thế giới (tour 4N3Đ, ~3000 USD)", en: "Son Doong — world's largest cave (4D3N tour, ~$3000)" },
      { vi: "Hang Thiên Đường dài 31km", en: "Paradise Cave — 31km long" },
      { vi: "Sông Chày — Hang Tối: zipline + bơi suối", en: "Chay River — Dark Cave: zipline + swimming" },
      { vi: "Suối Mooc nước trong xanh", en: "Mooc Spring crystal-clear water" },
    ],
    mustEat: [
      { vi: "Cháo canh cá lóc", en: "Snakehead rice porridge" },
      { vi: "Bánh xèo Quảng Bình", en: "Quang Binh sizzling pancake" },
    ],
    tip: "Đặt tour Sơn Đoòng trước 1 năm. Chỉ 1000 khách/năm, do Oxalis độc quyền vận hành.",
    tipEn: "Book Son Doong tours 1 year ahead. Only 1,000 visitors/year, exclusively run by Oxalis.",
  },
  {
    id: "phuquoc",
    name: "Đảo Phú Quốc",
    nameEn: "Phu Quoc Island",
    emoji: "🏖️",
    region: "south",
    type: "beach",
    bestTime: "Tháng 11–4 (biển êm)",
    bestTimeEn: "Nov–Apr (calm sea)",
    duration: "4–5 ngày",
    duringEn: "4–5 days",
    highlights: [
      { vi: "Bãi Sao — bãi biển đẹp nhất Phú Quốc", en: "Sao Beach — most beautiful beach" },
      { vi: "Cáp treo Hòn Thơm dài nhất thế giới (7.9km)", en: "Hon Thom cable car — world's longest (7.9km)" },
      { vi: "Lặn ngắm san hô Nam Đảo", en: "Snorkel coral reefs in southern islands" },
      { vi: "Chợ đêm Dinh Cậu", en: "Dinh Cau night market" },
      { vi: "Vinpearl Safari — vườn thú bán hoang dã", en: "Vinpearl Safari — semi-wild zoo" },
    ],
    mustEat: [
      { vi: "Bún kèn", en: "Phu Quoc fish noodle soup" },
      { vi: "Gỏi cá trích", en: "Herring fish salad" },
      { vi: "Nhum (cầu gai) nướng mỡ hành", en: "Grilled sea urchin with scallion oil" },
    ],
    tip: "Visa free 30 ngày cho mọi quốc tịch nếu chỉ ở Phú Quốc. Thuê xe máy 100-150k/ngày để khám phá.",
    tipEn: "30-day visa-free for all nationalities if staying only on Phu Quoc. Rent motorbike 100-150k VND/day to explore.",
  },
  {
    id: "dalat",
    name: "Đà Lạt",
    nameEn: "Da Lat",
    emoji: "🌷",
    region: "south",
    type: "city",
    bestTime: "Quanh năm — đẹp nhất 11–3",
    bestTimeEn: "Year-round — best Nov–Mar",
    duration: "3 ngày",
    duringEn: "3 days",
    highlights: [
      { vi: "Vườn hoa thành phố, đồi chè Cầu Đất", en: "City flower garden, Cau Dat tea hills" },
      { vi: "Quảng trường Lâm Viên — bông hoa khổng lồ", en: "Lam Vien Square — giant artichoke flower" },
      { vi: "Thiền viện Trúc Lâm + cáp treo", en: "Truc Lam Zen Monastery + cable car" },
      { vi: "Hồ Tuyền Lâm — chèo kayak yên tĩnh", en: "Tuyen Lam Lake — peaceful kayaking" },
      { vi: "Săn mây Cầu Đất lúc 5h sáng", en: "Cloud-hunting at Cau Dat at 5am" },
    ],
    mustEat: [
      { vi: "Bánh tráng nướng (pizza Đà Lạt)", en: "Grilled rice paper (Da Lat pizza)" },
      { vi: "Lẩu gà lá é", en: "Chicken hot pot with basil leaves" },
      { vi: "Atisô (artichoke) ngọt mát", en: "Cooling artichoke" },
      { vi: "Sữa đậu nành nóng", en: "Hot soy milk" },
    ],
    tip: "Đà Lạt mát quanh năm 18-25°C — mang áo khoác mỏng. Cuối tuần đông kín khách, đặt hostel sớm.",
    tipEn: "Da Lat is cool year-round 18-25°C — bring light jacket. Weekends crowded, book hostels early.",
  },
  {
    id: "mekong",
    name: "Đồng bằng sông Cửu Long",
    nameEn: "Mekong Delta",
    emoji: "🛶",
    region: "south",
    type: "rural",
    bestTime: "Tháng 9–11 (mùa nước nổi)",
    bestTimeEn: "Sep–Nov (flooding season)",
    duration: "2–3 ngày",
    duringEn: "2–3 days",
    highlights: [
      { vi: "Chợ nổi Cái Răng (Cần Thơ) — đi từ 5h sáng", en: "Cai Rang Floating Market — start at 5am" },
      { vi: "Vườn trái cây Mỹ Tho — ăn buffet trái cây", en: "My Tho fruit gardens — fruit buffet" },
      { vi: "Đi thuyền len lỏi rừng dừa Bến Tre", en: "Boat through Ben Tre coconut groves" },
      { vi: "Làng nổi Châu Đốc — chợ Việt-Cam-Chăm", en: "Chau Doc floating village — Viet-Khmer-Cham market" },
      { vi: "Rừng tràm Trà Sư — chèo xuồng ba lá", en: "Tra Su cajuput forest — sampan ride" },
    ],
    mustEat: [
      { vi: "Bún cá Châu Đốc", en: "Chau Doc fish noodle soup" },
      { vi: "Bánh xèo miền Tây (cỡ lớn)", en: "Mekong-style sizzling pancake (giant)" },
      { vi: "Canh chua cá linh bông điên điển", en: "Sour soup with linh fish & Sesbania flower" },
    ],
    tip: "Đặt tour homestay 2N1Đ để trải nghiệm thật. Nói trước nếu không ăn được rắn, ếch, chuột đồng.",
    tipEn: "Book 2D1N homestay tour for authentic experience. Mention dietary limits — locals serve snake/frog/field rat.",
  },
  {
    id: "haggiang",
    name: "Hà Giang",
    nameEn: "Ha Giang Loop",
    emoji: "🏍️",
    region: "north",
    type: "mountain",
    bestTime: "Tháng 9–11 (hoa tam giác mạch)",
    bestTimeEn: "Sep–Nov (buckwheat flowers)",
    duration: "4–5 ngày",
    duringEn: "4–5 days",
    highlights: [
      { vi: "Đèo Mã Pí Lèng — 1 trong 'tứ đại đỉnh đèo' Việt Nam", en: "Ma Pi Leng Pass — top 4 mountain passes" },
      { vi: "Cao nguyên đá Đồng Văn — Công viên địa chất UNESCO", en: "Dong Van Karst Plateau — UNESCO Geopark" },
      { vi: "Cột cờ Lũng Cú — điểm cực Bắc Tổ quốc", en: "Lung Cu Flag Tower — northernmost point of Vietnam" },
      { vi: "Chợ phiên Đồng Văn chủ nhật", en: "Sunday Dong Van market" },
      { vi: "Mùa hoa tam giác mạch tháng 10–11", en: "Buckwheat flower season Oct–Nov" },
    ],
    mustEat: [
      { vi: "Thắng dền (bánh trôi nóng)", en: "Thang den (hot dumplings)" },
      { vi: "Mèn mén (bột ngô hấp)", en: "Steamed corn flour" },
      { vi: "Rượu ngô Bản Phố", en: "Ban Pho corn liquor" },
    ],
    tip: "Thuê xe máy 200k/ngày + lái xe (rider) nếu chưa quen đường đèo. Mang giấy phép quốc tế.",
    tipEn: "Rent motorbike 200k VND/day + hire a rider if not used to mountain roads. Bring international license.",
  },
];
