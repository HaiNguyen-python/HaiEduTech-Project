// Regions extras - Festivals, culture, travel tips, transport, money, safety, etiquette
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
    highlight: "Đường phố vắng vẻ ngày 1–3 - quán xá đóng cửa. Hoa đào (Bắc), hoa mai (Nam) khắp nơi.",
    highlightEn: "Streets quiet days 1–3 - shops closed. Peach blossoms (North), apricot blossoms (South) everywhere.",
  },
  {
    id: "trung-thu",
    name: "Tết Trung Thu",
    nameEn: "Mid-Autumn Festival",
    emoji: "🥮",
    region: "all",
    time: "Rằm tháng 8 âm lịch (tháng 9)",
    timeEn: "15th day of Lunar Month 8 (September)",
    location: "Cả nước - đẹp nhất Hội An, Hà Nội",
    locationEn: "Nationwide - best in Hoi An, Hanoi",
    description: "Lễ hội của trẻ em với đèn lồng, múa lân, bánh trung thu. Phố Hàng Mã (Hà Nội) rực rỡ.",
    descriptionEn: "Children's festival with lanterns, lion dance, mooncakes. Hang Ma street (Hanoi) glows brightly.",
    highlight: "Hội An tổ chức Lễ hội Đèn lồng đêm rằm - khung cảnh huyền ảo nhất Việt Nam.",
    highlightEn: "Hoi An hosts a Lantern Festival on full moon - Vietnam's most magical scene.",
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
    description: "Quốc lễ tưởng nhớ các Vua Hùng - quốc tổ Việt Nam. Lễ rước kiệu, dâng bánh chưng bánh giầy.",
    descriptionEn: "National holiday honoring Hung Kings - founders of Vietnam. Procession and offering of traditional cakes.",
    highlight: "Là ngày nghỉ quốc gia. Hàng triệu người hành hương về Phú Thọ.",
    highlightEn: "National holiday. Millions of pilgrims travel to Phu Tho.",
  },
  {
    id: "hue-festival",
    name: "Festival Huế",
    nameEn: "Hue Festival",
    emoji: "🎭",
    region: "central",
    time: "Từ 2023 tổ chức quanh năm theo 4 mùa, sự kiện chính thường vào mùa hè",
    timeEn: "Since 2023 held year-round across four seasons, main events usually in summer",
    location: "Cố đô Huế",
    locationEn: "Hue Imperial City",
    description: "Liên hoan văn hóa quốc tế - nhã nhạc cung đình, áo dài, ẩm thực hoàng gia, biểu diễn nghệ thuật.",
    descriptionEn: "International cultural festival - royal court music, áo dài, imperial cuisine, art performances.",
    highlight: "Đêm Hoàng cung tái hiện không gian cung đình. Nên đặt phòng sớm vào dịp sự kiện chính.",
    highlightEn: "Imperial Night recreates royal court life. Book hotels early for the main events.",
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
    description: "Một trong những lễ hội kéo dài nhất Việt Nam (khoảng 3 tháng). Đi đò trên suối Yến, leo núi đến động Hương Tích cầu may.",
    descriptionEn: "One of Vietnam's longest festivals (about 3 months). Boat ride on Yen Stream, hike to Huong Tich Cave for blessings.",
    highlight: "Có cáp treo lên động Hương Tích nếu không muốn leo đường núi dài. Đông nhất quanh Rằm tháng Giêng.",
    highlightEn: "A cable car goes up to Huong Tich Cave if you prefer not to hike. Busiest around the full moon of Month 1.",
  },
  {
    id: "ok-om-bok",
    name: "Lễ hội Ok Om Bok",
    nameEn: "Ok Om Bok (Khmer Moon Festival)",
    emoji: "🌕",
    region: "south",
    time: "Rằm tháng 10 âm lịch (tháng 11)",
    timeEn: "Full moon Lunar Month 10 (November)",
    location: "Vĩnh Long (Trà Vinh cũ), Cần Thơ (Sóc Trăng cũ)",
    locationEn: "Vinh Long (former Tra Vinh), Can Tho (former Soc Trang)",
    description: "Lễ cúng trăng tạ ơn của đồng bào Khmer Nam Bộ, đi kèm hội đua ghe Ngo với hàng chục tay chèo mỗi thuyền.",
    descriptionEn: "Southern Khmer moon-worship thanksgiving, with lively Ngo boat races of dozens of rowers per boat.",
    highlight: "Cốm dẹp giã từ lúa nếp non - món ăn nghi lễ độc đáo.",
    highlightEn: "Com dep - pounded young sticky rice, a unique ritual food.",
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
      { label: "Máy bay nội địa", labelEn: "Domestic flights", value: "Vietnam Airlines, Vietjet, Bamboo, Vietravel - khoảng 800k–2,5 triệu VND", valueEn: "Vietnam Airlines, Vietjet, Bamboo, Vietravel - about 800k–2.5M VND" },
      { label: "Tàu hỏa Bắc-Nam", labelEn: "North-South train", value: "Hà Nội ↔ TP.HCM khoảng 30–35 giờ, giường nằm từ ~1,2 triệu VND", valueEn: "Hanoi ↔ Ho Chi Minh City about 30–35h, sleeper from ~1.2M VND" },
      { label: "Xe khách giường nằm", labelEn: "Sleeper bus", value: "Ví dụ Phương Trang (FUTA) - khoảng 200–500k VND", valueEn: "e.g. Phuong Trang (FUTA) - about 200–500k VND" },
      { label: "Grab/Be (taxi app)", labelEn: "Grab/Be (rideshare)", value: "Giá hiển thị trước, thường rẻ hơn taxi truyền thống", valueEn: "Upfront pricing, usually cheaper than street taxis" },
      { label: "Thuê xe máy", labelEn: "Motorbike rental", value: "100–200k VND/ngày, cần bằng lái hợp lệ tại Việt Nam (IDP Công ước 1968 hoặc bằng Việt Nam)", valueEn: "100–200k VND/day, needs a licence valid in Vietnam (1968-Convention IDP or Vietnamese licence)" },
    ],
    tips: [
      { vi: "Đặt vé tàu trước 7 ngày qua dsvn.vn - giường nằm điều hòa thoải mái nhất.", en: "Book trains 7 days ahead via dsvn.vn - A/C sleeper is most comfortable." },
      { vi: "Tải app Grab, Be hoặc Xanh SM - gọi xe bằng tiếng Anh, giá hiển thị trước.", en: "Install Grab, Be or Xanh SM - order in English with upfront prices." },
      { vi: "Đi xe ôm truyền thống thì thỏa thuận giá rõ ràng trước khi lên xe.", en: "With a traditional motorbike taxi, agree on the price before you ride." },
    ],
  },
  {
    id: "money",
    icon: "💵",
    title: "Tiền tệ & Thanh toán",
    titleEn: "Money & Payments",
    details: [
      { label: "Đơn vị", labelEn: "Currency", value: "VND (Việt Nam Đồng), 1 USD ≈ 26.000 VND (tỉ giá thay đổi)", valueEn: "VND (Vietnamese Dong), 1 USD ≈ 26,000 VND (rates change)" },
      { label: "ATM", labelEn: "ATMs", value: "Có ở hầu hết thành phố, thẻ nước ngoài thường chịu phí mỗi lần rút", valueEn: "Common in cities, foreign cards usually pay a fee per withdrawal" },
      { label: "Thanh toán điện tử", labelEn: "E-payments", value: "MoMo, ZaloPay, VNPay - chuyển khoản QR phổ biến", valueEn: "MoMo, ZaloPay, VNPay - QR transfer is widespread" },
      { label: "Đổi ngoại tệ", labelEn: "Currency exchange", value: "Đổi tại ngân hàng hoặc điểm đổi ngoại tệ được cấp phép", valueEn: "Exchange at banks or licensed exchange counters" },
      { label: "Tiền mặt", labelEn: "Cash needs", value: "Vẫn cần ở chợ, hàng rong, vùng quê", valueEn: "Still needed at markets, street food, rural areas" },
    ],
    tips: [
      { vi: "Tờ 20.000 và 500.000 đều màu xanh dương, dễ nhầm - xem kỹ số in trên tờ tiền!", en: "The 20,000 and 500,000 notes are both blue and easy to mix up - check the number!" },
      { vi: "Hạn mức và phí rút tiền khác nhau theo ngân hàng - xem trên màn hình ATM trước khi xác nhận.", en: "Limits and fees vary by bank - check the ATM screen before confirming." },
      { vi: "Tip không bắt buộc - nhưng 10% rất được trân trọng ở nhà hàng cao cấp.", en: "Tipping not required - but 10% is appreciated at upscale restaurants." },
    ],
  },
  {
    id: "sim-internet",
    icon: "📱",
    title: "SIM & Internet",
    titleEn: "SIM & Internet",
    details: [
      { label: "Nhà mạng", labelEn: "Carriers", value: "Viettel (phủ sóng tốt nhất), Mobifone, Vinaphone", valueEn: "Viettel (best coverage), Mobifone, Vinaphone" },
      { label: "Gói du lịch", labelEn: "Tourist plan", value: "Gói data du lịch nhiều GB, khoảng 100–300k VND/tháng tùy gói", valueEn: "Multi-GB tourist data plans, roughly 100–300k VND/month" },
      { label: "eSIM", labelEn: "eSIM", value: "Có thể mua online trước chuyến đi (giá tùy nhà cung cấp)", valueEn: "Can be bought online before travelling (price varies)" },
      { label: "Wifi", labelEn: "Wi-Fi", value: "Miễn phí khắp quán cà phê, khách sạn", valueEn: "Free everywhere - cafés, hotels" },
    ],
    tips: [
      { vi: "Mua SIM ở quầy chính hãng Viettel tại sân bay - cần passport, lắp ngay tại chỗ.", en: "Buy SIM at official Viettel counters at the airport - need passport, set up on the spot." },
      { vi: "SIM phải đăng ký chính chủ bằng hộ chiếu - nên mua tại cửa hàng chính hãng.", en: "SIMs must be registered with your passport - buy at official stores." },
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
      { label: "Nước uống", labelEn: "Drinking water", value: "Uống nước đóng chai hoặc đã đun sôi; đá viên công nghiệp thường an toàn", valueEn: "Drink bottled or boiled water; factory ice is usually safe" },
    ],
    tips: [
      { vi: "Tội phạm chính: móc túi, giật điện thoại từ xe máy. Đeo balô trước ngực ở chỗ đông.", en: "Main crime: pickpocketing, phone snatching from motorbikes. Wear backpack on chest in crowds." },
      { vi: "Mua bảo hiểm du lịch - chi phí ở bệnh viện quốc tế khá cao.", en: "Get travel insurance - international hospital costs can be high." },
      { vi: "Chọn quán đường phố đông khách địa phương, đồ ăn nấu chín và còn nóng.", en: "Pick street stalls busy with locals, with food freshly cooked and hot." },
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
  { type: "do", vi: "Mặc cả nhẹ nhàng, vui vẻ ở chợ truyền thống (trừ nơi niêm yết giá)", en: "Bargain politely at traditional markets (not where prices are fixed)", context: "Mua sắm", contextEn: "Shopping" },
  { type: "do", vi: "Gọi 'anh/chị' (hơn tuổi) hoặc 'em' (kém tuổi) thay vì 'bạn'", en: "Use 'anh/chị' (older) or 'em' (younger) instead of 'bạn'", context: "Xưng hô", contextEn: "Address" },
  { type: "dont", vi: "Không chỉ tay vào người, tượng Phật - dùng cả bàn tay", en: "Don't point with index finger - use full hand", context: "Lịch sự", contextEn: "Politeness" },
  { type: "dont", vi: "Không cắm đũa thẳng vào bát cơm (giống cúng người chết)", en: "Don't stick chopsticks upright in rice (resembles funeral offering)", context: "Bàn ăn", contextEn: "Dining" },
  { type: "dont", vi: "Không tùy tiện xoa đầu người lạ, kể cả trẻ em", en: "Don't casually touch strangers' heads, including children", context: "Tâm linh", contextEn: "Spiritual" },
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
  { icon: "👥", label: "Dân số", labelEn: "Population", value: "~101 triệu", valueEn: "~101 million" },
  { icon: "🗣️", label: "Ngôn ngữ", labelEn: "Language", value: "Tiếng Việt; 54 dân tộc anh em", valueEn: "Vietnamese; 54 ethnic groups" },
  { icon: "📐", label: "Diện tích", labelEn: "Area", value: "~331.345 km²", valueEn: "~331,345 km²" },
  { icon: "🏖️", label: "Bờ biển", labelEn: "Coastline", value: "3,260 km", valueEn: "3,260 km" },
  { icon: "🏔️", label: "Núi cao nhất", labelEn: "Highest peak", value: "Fansipan 3,143m", valueEn: "Fansipan 3,143m" },
  { icon: "🛂", label: "Visa", labelEn: "Visa", value: "Thay đổi theo quốc tịch - kiểm tra vietnam.travel trước khi đi", valueEn: "Varies by nationality - check vietnam.travel before travel" },
  { icon: "🕒", label: "Múi giờ", labelEn: "Timezone", value: "GMT+7 (cả nước, không đổi giờ)", valueEn: "GMT+7 (whole country, no DST)" },
  { icon: "🔌", label: "Điện", labelEn: "Electricity", value: "220V, 50Hz - ổ cắm loại A, C phổ biến", valueEn: "220V, 50Hz - plug types A and C common" },
];
