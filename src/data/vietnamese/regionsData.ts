// Vietnamese Travel & Regions - 3 macro regions, key provinces, UNESCO heritage sites
export interface RegionInfo {
  id: "north" | "central" | "south";
  name: string;
  nameEn: string;
  emoji: string;
  color: string; // tailwind gradient classes
  capital: string;
  capitalEn: string;
  population: string;
  climate: string;
  climateEn: string;
  description: string;
  descriptionEn: string;
  highlights: { name: string; nameEn: string; province: string; emoji: string }[];
  unesco: { name: string; nameEn: string; year: number; type: string; typeEn: string }[];
  travelPhrases: { vi: string; en: string }[];
}

export const regions: RegionInfo[] = [
  {
    id: "north",
    name: "Miền Bắc",
    nameEn: "Northern Vietnam",
    emoji: "🏔️",
    color: "from-blue-600 to-cyan-500",
    capital: "Hà Nội",
    capitalEn: "Hanoi",
    population: "~36 triệu / 36 million",
    climate: "4 mùa rõ rệt: xuân ấm, hè nóng ẩm, thu mát, đông lạnh.",
    climateEn: "Four distinct seasons: warm spring, hot humid summer, cool autumn, cold winter.",
    description: "Cái nôi văn hóa Việt với hơn 1000 năm Thăng Long - Hà Nội, núi non hùng vĩ vùng Tây Bắc và vịnh Hạ Long kỳ vĩ.",
    descriptionEn: "Cradle of Vietnamese culture with over 1,000 years of Thang Long - Hanoi, the majestic Northwest mountains and stunning Ha Long Bay.",
    highlights: [
      { name: "Hồ Hoàn Kiếm", nameEn: "Hoan Kiem Lake", province: "Hà Nội", emoji: "🐢" },
      { name: "Vịnh Hạ Long", nameEn: "Halong Bay", province: "Quảng Ninh", emoji: "⛵" },
      { name: "Sapa", nameEn: "Sapa Terraces", province: "Lào Cai", emoji: "🌾" },
      { name: "Ninh Bình", nameEn: "Ninh Binh", province: "Ninh Bình", emoji: "🚣" },
      { name: "Mộc Châu", nameEn: "Moc Chau", province: "Sơn La", emoji: "🌸" },
      { name: "Hà Giang", nameEn: "Ha Giang Loop", province: "Tuyên Quang (Hà Giang cũ)", emoji: "🏍️" },
    ],
    unesco: [
      { name: "Vịnh Hạ Long - Quần đảo Cát Bà", nameEn: "Ha Long Bay - Cat Ba Archipelago", year: 1994, type: "Tự nhiên", typeEn: "Natural" },
      { name: "Quần thể Yên Tử - Vĩnh Nghiêm - Côn Sơn, Kiếp Bạc", nameEn: "Yen Tu - Vinh Nghiem - Con Son, Kiep Bac Complex", year: 2025, type: "Văn hóa", typeEn: "Cultural" },
      { name: "Hoàng thành Thăng Long", nameEn: "Imperial Citadel of Thang Long", year: 2010, type: "Văn hóa", typeEn: "Cultural" },
      { name: "Quần thể Tràng An", nameEn: "Trang An Landscape", year: 2014, type: "Hỗn hợp", typeEn: "Mixed" },
    ],
    travelPhrases: [
      { vi: "Cho tôi đến Hồ Gươm", en: "Take me to Hoan Kiem Lake" },
      { vi: "Bao nhiêu tiền một đêm?", en: "How much per night?" },
      { vi: "Lạnh quá!", en: "It's so cold!" },
    ],
  },
  {
    id: "central",
    name: "Miền Trung",
    nameEn: "Central Vietnam",
    emoji: "🏖️",
    color: "from-amber-500 to-orange-500",
    capital: "Đà Nẵng",
    capitalEn: "Da Nang",
    population: "~27 triệu / 27 million",
    climate: "Ven biển: nắng nóng khoảng tháng 2–8, mưa và bão tập trung tháng 9–12.",
    climateEn: "Coast: hot and sunny roughly Feb–Aug, rain and typhoons mainly Sep–Dec.",
    description: "Dải đất hẹp giữa dãy Trường Sơn và biển Đông, với cố đô Huế, phố cổ Hội An, thánh địa Mỹ Sơn, hang động Phong Nha và những bãi biển dài.",
    descriptionEn: "A narrow strip between the Truong Son range and the East Sea, home to imperial Hue, ancient Hoi An, My Son Sanctuary, the Phong Nha caves and long beaches.",
    highlights: [
      { name: "Cố đô Huế", nameEn: "Hue Citadel", province: "TP. Huế", emoji: "🏯" },
      { name: "Phố cổ Hội An", nameEn: "Hoi An Old Town", province: "Đà Nẵng (Quảng Nam cũ)", emoji: "🏮" },
      { name: "Mỹ Sơn", nameEn: "My Son Sanctuary", province: "Đà Nẵng (Quảng Nam cũ)", emoji: "🛕" },
      { name: "Bà Nà Hills", nameEn: "Ba Na Hills", province: "Đà Nẵng", emoji: "🌉" },
      { name: "Phong Nha-Kẻ Bàng", nameEn: "Phong Nha Caves", province: "Quảng Trị (Quảng Bình cũ)", emoji: "🕳️" },
      { name: "Nha Trang", nameEn: "Nha Trang", province: "Khánh Hòa", emoji: "🏝️" },
    ],
    unesco: [
      { name: "Quần thể di tích Cố đô Huế", nameEn: "Complex of Hue Monuments", year: 1993, type: "Văn hóa", typeEn: "Cultural" },
      { name: "Phố cổ Hội An", nameEn: "Hoi An Ancient Town", year: 1999, type: "Văn hóa", typeEn: "Cultural" },
      { name: "Thánh địa Mỹ Sơn", nameEn: "My Son Sanctuary", year: 1999, type: "Văn hóa", typeEn: "Cultural" },
      { name: "Phong Nha-Kẻ Bàng", nameEn: "Phong Nha-Ke Bang National Park", year: 2003, type: "Tự nhiên", typeEn: "Natural" },
    ],
    travelPhrases: [
      { vi: "Bãi biển ở đâu?", en: "Where is the beach?" },
      { vi: "Tôi muốn thuê xe máy", en: "I want to rent a motorbike" },
      { vi: "Một bát bún bò Huế", en: "One bowl of Hue beef noodle soup" },
    ],
  },
  {
    id: "south",
    name: "Miền Nam",
    nameEn: "Southern Vietnam",
    emoji: "🌴",
    color: "from-emerald-500 to-lime-500",
    capital: "Thành phố Hồ Chí Minh",
    capitalEn: "Ho Chi Minh City",
    population: "~37 triệu / 37 million",
    climate: "Hai mùa: mùa khô tháng 12–4, mùa mưa tháng 5–11. Nhiệt đới quanh năm.",
    climateEn: "Two seasons: dry Dec–Apr, rainy May–Nov. Tropical year-round.",
    description: "Năng động với TP. Hồ Chí Minh hiện đại, đồng bằng sông Cửu Long trù phú, biển đảo Phú Quốc và Côn Đảo.",
    descriptionEn: "Dynamic Saigon, fertile Mekong Delta, paradise islands of Phu Quoc and Con Dao.",
    highlights: [
      { name: "Sài Gòn", nameEn: "Saigon", province: "TP.HCM", emoji: "🏙️" },
      { name: "Phú Quốc", nameEn: "Phu Quoc Island", province: "An Giang (Kiên Giang cũ)", emoji: "🏖️" },
      { name: "Cần Thơ - Chợ nổi", nameEn: "Can Tho Floating Market", province: "Cần Thơ", emoji: "🛶" },
      { name: "Đà Lạt", nameEn: "Da Lat (Central Highlands)", province: "Lâm Đồng", emoji: "🌷" },
      { name: "Mũi Né", nameEn: "Mui Ne Dunes", province: "Lâm Đồng (Bình Thuận cũ)", emoji: "🏜️" },
      { name: "Côn Đảo", nameEn: "Con Dao Islands", province: "TP.HCM (Bà Rịa-Vũng Tàu cũ)", emoji: "🐢" },
    ],
    unesco: [
      { name: "Khu dự trữ sinh quyển Cần Giờ", nameEn: "Can Gio Mangrove Biosphere Reserve", year: 2000, type: "Sinh quyển", typeEn: "Biosphere reserve" },
      { name: "Đờn ca tài tử Nam Bộ", nameEn: "Don ca tai tu Music", year: 2013, type: "Phi vật thể", typeEn: "Intangible" },
    ],
    travelPhrases: [
      { vi: "Cho tôi một ly cà phê sữa đá", en: "One iced milk coffee, please" },
      { vi: "Đi chợ nổi Cái Răng mất bao lâu?", en: "How long does it take to get to Cai Rang floating market?" },
      { vi: "Trời nóng quá!", en: "It's so hot!" },
    ],
  },
];
