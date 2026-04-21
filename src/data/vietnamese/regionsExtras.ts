// Regions extras — Festivals, culture, travel tips, transport, money, safety, etiquette
export interface Festival {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  region: "north" | "central" | "south" | "all";
  time: string;
  timeEn: string;
  location: string;
  locationEn: string;
  description: string;
  descriptionEn: string;
  highlight: string;
  highlightEn: string;
}

export const festivals: Festival[] = [
  {
    id: "tet",
    name: "Tết Nguyên Đán",
    nameEn: "Lunar New Year (Tet)",
    emoji: "🧧",
    region: "all",
    time: "Mùng 1 tháng Giêng âm lịch (cuối tháng 1 – giữa tháng 2)",
    timeEn: "1st day of Lunar Month 1 (late Jan – mid Feb)",
    location: "Cả nước",
    locationEn: "Nationwide",
    description: "Lễ hội lớn nhất năm. Gia đình sum họp, lì xì, gói bánh chưng, thăm mộ tổ tiên, xông đất.",
    descriptionEn: "Biggest celebration of the year. Family reunions, lucky money, banh chung wrapping, ancestor visits.",
    highlight: "Đường phố vắng vẻ ngày 1–3 — quán xá đóng cửa. Hoa đào (Bắc), hoa mai (Nam) khắp nơi.",
    highlightEn: "Streets quiet days 1–3 — shops closed. Peach blossoms (North), apricot blossoms (South) everywhere.",
  },
  {
    id: "trung-thu",
    name: "Tết Trung Thu",
    nameEn: "Mid-Autumn Festival",
    emoji: "🥮",
    region: "all",
    time: "Rằm tháng 8 âm lịch (tháng 9)",
    timeEn: "15th day of Lunar Month 8 (September)",
    location: "Cả nước — đẹp nhất Hội An, Hà Nội",
    locationEn: "Nationwide — best in Hoi An, Hanoi",
    description: "Lễ hội của trẻ em với đèn lồng, múa lân, bánh trung thu. Phố Hàng Mã (Hà Nội) rực rỡ.",
    descriptionEn: "Children's festival with lanterns, lion dance, mooncakes. Hang Ma street (Hanoi) glows brightly.",
    highlight: "Hội An tổ chức Lễ hội Đèn lồng đêm rằm — khung cảnh huyền ảo nhất Việt Nam.",
    highlightEn: "Hoi An hosts a Lantern Festival on full moon — Vietnam's most magical scene.",
  },
  {
    id: "hung-king",
    name: "Giỗ Tổ Hùng Vương",
    nameEn: "Hung Kings' Festival",
    emoji: "👑",
    region: "north",
    time: "Mùng 10 tháng 3 âm lịch (tháng 4)",
    timeEn: "10th day of Lunar Month 3 (April)",
    location: "Đền Hùng, Phú Thọ",
    locationEn: "Hung Temple, Phu Tho",
    description: "Quốc lễ tưởng nhớ các Vua Hùng — quốc tổ Việt Nam. Lễ rước kiệu, dâng bánh chưng bánh giầy.",
    descriptionEn: "National holiday honoring Hung Kings — founders of Vietnam. Procession and offering of traditional cakes.",
    highlight: "Là ngày nghỉ quốc gia. Hàng triệu người hành hương về Phú Thọ.",
    highlightEn: "National holiday. Millions of pilgrims travel to Phu Tho.",
  },
  {
    id: "hue-festival",
    name: "Festival Huế",
    nameEn: "Hue Festival",
    emoji: "🎭",
    region: "central",
    time: "Tháng 4 hoặc tháng 6 (cách năm)",
    timeEn: "April or June (biennial)",
    location: "Cố đô Huế",
    locationEn: "Hue Imperial City",
    description: "Liên hoan văn hóa quốc tế — nhã nhạc cung đình, áo dài, ẩm thực hoàng gia, biểu diễn nghệ thuật.",
    descriptionEn: "International cultural festival — royal court music, áo dài, imperial cuisine, art performances.",
    highlight: "Đêm Hoàng cung — tái hiện nghi lễ vua chúa với 1000+ nghệ sĩ. Đặt phòng sớm 6 tháng.",
    highlightEn: "Imperial Night — royal ceremonies with 1000+ artists. Book hotels 6 months ahead.",
  },
  {
    id: "perfume-pagoda",
    name: "Lễ hội Chùa Hương",
    nameEn: "Perfume Pagoda Festival",
    emoji: "🛕",
    region: "north",
    time: "Mùng 6 tháng Giêng – hết tháng 3 âm lịch",
    timeEn: "From day 6 of Lunar Month 1 to end of Lunar Month 3",
    location: "Mỹ Đức, Hà Nội (60km tây nam)",
    locationEn: "My Duc, Hanoi (60km southwest)",
    description: "Lễ hội dài nhất Việt Nam (3 tháng). Đi đò trên suối Yến, leo núi đến động Hương Tích cầu may.",
    descriptionEn: "Longest festival in Vietnam (3 months). Boat ride on Yen Stream, hike to Huong Tich Cave for blessings.",
    highlight: "Có cáp treo cho người không leo nổi 4000 bậc. Đông nhất Rằm tháng Giêng — chen chúc!",
    highlightEn: "Cable car available if you can't climb 4,000 steps. Crowded most on full moon of Month 1.",
  },
  {
    id: "ok-om-bok",
    name: "Lễ hội Ok Om Bok",
    nameEn: "Ok Om Bok (Khmer Moon Festival)",
    emoji: "🌕",
    region: "south",
    time: "Rằm tháng 10 âm lịch (tháng 11)",
    timeEn: "Full moon Lunar Month 10 (November)",
    location: "Trà Vinh, Sóc Trăng",
    locationEn: "Tra Vinh, Soc Trang",
    description: "Lễ tạ ơn Mặt Trăng của người Khmer. Đua ghe Ngo (thuyền dài 25m, 50–60 tay chèo) sôi động.",
    descriptionEn: "Khmer thanksgiving to the Moon. Exciting Ngo boat racing (25m long, 50–60 rowers).",
    highlight: "Cốm dẹp giã từ lúa nếp non — món ăn nghi lễ độc đáo.",
    highlightEn: "Com dep — pounded young sticky rice, a unique ritual food.",
  },
];

// Travel essentials (transport, money, sim, etc.)
export interface TravelEssential {
  id: string;
  icon: string;
  title: string;
  titleEn: string;
  details: { label: string; labelEn: string; value: string; valueEn: string }[];
  tips: { vi: string; en: string }[];
}

export const travelEssentials: TravelEssential[] = [
  {
    id: "transport",
    icon: "🚆",
    title: "Phương tiện di chuyển",
    titleEn: "Getting Around",
    details: [
      { label: "Máy bay nội địa", labelEn: "Domestic flights", value: "Vietnam Airlines, Vietjet, Bamboo — 800k–2M VND", valueEn: "Vietnam Airlines, Vietjet, Bamboo — 800k–2M VND" },
      { label: "Tàu hỏa Bắc-Nam", labelEn: "North-South train", value: "Hà Nội ↔ Sài Gòn 30h, giường nằm ~1.2M VND", valueEn: "Hanoi ↔ Saigon 30h, sleeper ~1.2M VND" },
      { label: "Xe khách giường nằm", labelEn: "Sleeper bus", value: "Futa, Phương Trang — 200–500k VND", valueEn: "Futa, Phuong Trang — 200–500k VND" },
      { label: "Grab/Be (taxi app)", labelEn: "Grab/Be (rideshare)", value: "Rẻ hơn taxi truyền thống 30%", valueEn: "30% cheaper than traditional taxis" },
      { label: "Thuê xe máy", labelEn: "Motorbike rental", value: "100–200k VND/ngày, cần bằng quốc tế (IDP)", valueEn: "100–200k VND/day, IDP license required" },
    ],
    tips: [
      { vi: "Đặt vé tàu trước 7 ngày qua dsvn.vn — giường nằm điều hòa thoải mái nhất.", en: "Book trains 7 days ahead via dsvn.vn — A/C sleeper is most comfortable." },
      { vi: "Tải app Grab — gọi xe bằng tiếng Anh, giá hiển thị trước, không bị chặt chém.", en: "Install Grab app — order in English, price shown upfront, no scams." },
      { vi: "Xe ôm truyền thống mặc cả 50% giá đầu tiên họ đưa ra.", en: "Traditional motorbike taxi: bargain 50% off the first quoted price." },
    ],
  },
  {
    id: "money",
    icon: "💵",
    title: "Tiền tệ & Thanh toán",
    titleEn: "Money & Payments",
    details: [
      { label: "Đơn vị", labelEn: "Currency", value: "VND (Việt Nam Đồng), 1 USD ≈ 25,000 VND", valueEn: "VND (Vietnamese Dong), 1 USD ≈ 25,000 VND" },
      { label: "ATM", labelEn: "ATMs", value: "Có khắp nơi, phí rút thẻ nước ngoài 50–110k/lần", valueEn: "Everywhere, foreign card fee 50–110k/withdrawal" },
      { label: "Thanh toán điện tử", labelEn: "E-payments", value: "MoMo, ZaloPay, VNPay — chuyển khoản QR phổ biến", valueEn: "MoMo, ZaloPay, VNPay — QR transfer is widespread" },
      { label: "Đổi ngoại tệ", labelEn: "Currency exchange", value: "Tiệm vàng phố cổ tỉ giá tốt nhất, không phí", valueEn: "Old town gold shops have the best rates, no fees" },
      { label: "Tiền mặt", labelEn: "Cash needs", value: "Vẫn cần ở chợ, hàng rong, vùng quê", valueEn: "Still needed at markets, street food, rural areas" },
    ],
    tips: [
      { vi: "Mệnh giá lớn dễ nhầm: 20.000 (xanh) ≠ 500.000 (xanh lá) — xem kỹ!", en: "Big bills look alike: 20,000 (blue) ≠ 500,000 (green) — check carefully!" },
      { vi: "Vietcombank ATM cho rút 5–8 triệu/lần, phí thấp nhất với thẻ nước ngoài.", en: "Vietcombank ATMs allow 5–8M/withdrawal, lowest fees for foreign cards." },
      { vi: "Tip không bắt buộc — nhưng 10% rất được trân trọng ở nhà hàng cao cấp.", en: "Tipping not required — but 10% is appreciated at upscale restaurants." },
    ],
  },
  {
    id: "sim-internet",
    icon: "📱",
    title: "SIM & Internet",
    titleEn: "SIM & Internet",
    details: [
      { label: "Nhà mạng", labelEn: "Carriers", value: "Viettel (phủ sóng tốt nhất), Mobifone, Vinaphone", valueEn: "Viettel (best coverage), Mobifone, Vinaphone" },
      { label: "Gói du lịch", labelEn: "Tourist plan", value: "Viettel ST120K — 4GB/ngày × 30 ngày = 200k VND", valueEn: "Viettel ST120K — 4GB/day × 30 days = 200k VND" },
      { label: "eSIM", labelEn: "eSIM", value: "Mua online qua Airalo, Holafly từ 9 USD", valueEn: "Buy online via Airalo, Holafly from $9" },
      { label: "Wifi", labelEn: "Wi-Fi", value: "Miễn phí khắp quán cà phê, khách sạn", valueEn: "Free everywhere — cafés, hotels" },
    ],
    tips: [
      { vi: "Mua SIM ở quầy chính hãng Viettel tại sân bay — cần passport, lắp ngay tại chỗ.", en: "Buy SIM at official Viettel counters at the airport — need passport, set up on the spot." },
      { vi: "Tránh quầy SIM ở phố du lịch — họ bán gói fake hoặc đắt gấp 3.", en: "Avoid SIM stalls in tourist streets — they sell fake plans or 3x markup." },
    ],
  },
  {
    id: "safety",
    icon: "🛡️",
    title: "An toàn & Sức khỏe",
    titleEn: "Safety & Health",
    details: [
      { label: "Cấp cứu", labelEn: "Emergency", value: "115 (cấp cứu), 113 (cảnh sát), 114 (cứu hỏa)", valueEn: "115 (ambulance), 113 (police), 114 (fire)" },
      { label: "Bệnh viện quốc tế", labelEn: "International hospitals", value: "FV Hospital (HCM), Vinmec (HN/HCM/Phú Quốc)", valueEn: "FV Hospital (HCM), Vinmec (HN/HCM/Phu Quoc)" },
      { label: "Vacxin khuyến cáo", labelEn: "Recommended vaccines", value: "Viêm gan A, Thương hàn, Viêm não Nhật Bản (vùng quê)", valueEn: "Hepatitis A, Typhoid, Japanese Encephalitis (rural)" },
      { label: "Nước uống", labelEn: "Drinking water", value: "Chỉ uống nước đóng chai, đá viên ở nhà hàng OK", valueEn: "Bottled only, ice at restaurants is generally safe" },
    ],
    tips: [
      { vi: "Tội phạm chính: móc túi, giật điện thoại từ xe máy. Đeo balô trước ngực ở chỗ đông.", en: "Main crime: pickpocketing, phone snatching from motorbikes. Wear backpack on chest in crowds." },
      { vi: "Mua bảo hiểm du lịch — viện phí quốc tế đắt (1000 USD/ngày).", en: "Get travel insurance — international hospital costs are high ($1000/day)." },
      { vi: "Thức ăn đường phố OK nếu đông khách bản địa — họ không sống nổi với hàng bẩn.", en: "Street food is safe if locals crowd it — they wouldn't survive a dirty stall." },
    ],
  },
];

// Cultural etiquette (do's and don'ts)
export interface EtiquetteRule {
  type: "do" | "dont";
  vi: string;
  en: string;
  context: string;
  contextEn: string;
}

export const etiquetteRules: EtiquetteRule[] = [
  { type: "do", vi: "Bỏ giày khi vào nhà, chùa, đền", en: "Remove shoes when entering homes, pagodas, temples", context: "Văn hóa", contextEn: "Cultural" },
  { type: "do", vi: "Ăn mặc kín đáo (che vai, đầu gối) khi vào chùa", en: "Dress modestly (cover shoulders, knees) at temples", context: "Tôn giáo", contextEn: "Religious" },
  { type: "do", vi: "Đưa và nhận đồ bằng cả 2 tay với người lớn tuổi", en: "Give/receive items with both hands to elders", context: "Lễ phép", contextEn: "Respect" },
  { type: "do", vi: "Mặc cả 30–50% ở chợ — đừng ngại, đây là văn hóa", en: "Bargain 30–50% at markets — don't be shy, it's culture", context: "Mua sắm", contextEn: "Shopping" },
  { type: "do", vi: "Gọi 'anh/chị' (hơn tuổi) hoặc 'em' (kém tuổi) thay vì 'bạn'", en: "Use 'anh/chị' (older) or 'em' (younger) instead of 'bạn'", context: "Xưng hô", contextEn: "Address" },
  { type: "dont", vi: "Không chỉ tay vào người, tượng Phật — dùng cả bàn tay", en: "Don't point with index finger — use full hand", context: "Lịch sự", contextEn: "Politeness" },
  { type: "dont", vi: "Không cắm đũa thẳng vào bát cơm (giống cúng người chết)", en: "Don't stick chopsticks upright in rice (resembles funeral offering)", context: "Bàn ăn", contextEn: "Dining" },
  { type: "dont", vi: "Không xoa đầu trẻ con người Việt — bị coi là xui xẻo", en: "Don't pat Vietnamese children's heads — considered bad luck", context: "Tâm linh", contextEn: "Spiritual" },
  { type: "dont", vi: "Không chụp ảnh quân đội, công an, công trình quân sự", en: "Don't photograph military, police, or military sites", context: "Pháp luật", contextEn: "Legal" },
  { type: "dont", vi: "Không thể hiện tình cảm quá đà nơi công cộng (hôn, ôm chặt)", en: "Avoid heavy PDA in public (kissing, tight embraces)", context: "Văn hóa", contextEn: "Cultural" },
];

// Quick Vietnam stats
export interface CountryStat {
  icon: string;
  label: string;
  labelEn: string;
  value: string;
  valueEn: string;
}

export const countryStats: CountryStat[] = [
  { icon: "👥", label: "Dân số", labelEn: "Population", value: "~100 triệu", valueEn: "~100 million" },
  { icon: "🗣️", label: "Ngôn ngữ", labelEn: "Language", value: "Tiếng Việt + 53 dân tộc thiểu số", valueEn: "Vietnamese + 53 ethnic minorities" },
  { icon: "📐", label: "Diện tích", labelEn: "Area", value: "331,212 km² (xếp 65 thế giới)", valueEn: "331,212 km² (65th worldwide)" },
  { icon: "🏖️", label: "Bờ biển", labelEn: "Coastline", value: "3,260 km", valueEn: "3,260 km" },
  { icon: "🏔️", label: "Núi cao nhất", labelEn: "Highest peak", value: "Fansipan 3,143m", valueEn: "Fansipan 3,143m" },
  { icon: "🛂", label: "Visa", labelEn: "Visa", value: "Miễn 45 ngày cho 25 nước; e-visa 90 ngày USD 25", valueEn: "45-day waiver for 25 countries; e-visa 90 days $25" },
  { icon: "🕒", label: "Múi giờ", labelEn: "Timezone", value: "GMT+7 (cả nước, không đổi giờ)", valueEn: "GMT+7 (whole country, no DST)" },
  { icon: "🔌", label: "Điện", labelEn: "Electricity", value: "220V — chân tròn type A/C/F", valueEn: "220V — round pin type A/C/F" },
];
