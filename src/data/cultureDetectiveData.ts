// Cultural items data for the Culture Detective mini-game
// Each item has correct/wrong keywords that players must identify

export interface CulturalItem {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  hint: string;
  hintEn: string;
  correctKeywords: string[];
  wrongKeywords: string[];
  secret: string;
  secretEn: string;
}

export const culturalItems: CulturalItem[] = [
  {
    id: "ao-dai",
    name: "Áo dài",
    nameEn: "Traditional Long Dress",
    emoji: "👘",
    hint: "Trang phục truyền thống thanh lịch với hai tà áo dài",
    hintEn: "An elegant traditional costume with two long flaps",
    correctKeywords: ["Truyền thống", "Lụa", "Tà áo", "Quốc phục"],
    wrongKeywords: ["Kimono", "Jeans", "Da thuộc", "Áo giáp"],
    secret: "Áo dài hiện đại được cải tiến bởi họa sĩ Cát Tường vào thập niên 1930, kết hợp Đông - Tây.",
    secretEn: "Modern áo dài was redesigned by artist Cát Tường in the 1930s, blending East and West.",
  },
  {
    id: "non-la",
    name: "Nón lá",
    nameEn: "Conical Hat",
    emoji: "🎋",
    hint: "Chiếc nón hình nón được đan từ lá, che nắng che mưa",
    hintEn: "A cone-shaped hat woven from leaves, protection from sun and rain",
    correctKeywords: ["Lá cọ", "Hình nón", "Thủ công", "Huế"],
    wrongKeywords: ["Kim loại", "Mũ bảo hiểm", "Nhựa", "Máy móc"],
    secret: "Nón bài thơ xứ Huế có thể soi lên ánh sáng để thấy hình ảnh và thơ ẩn bên trong.",
    secretEn: "Huế poem hats reveal hidden images and poetry when held up to light.",
  },
  {
    id: "tranh-dong-ho",
    name: "Tranh Đông Hồ",
    nameEn: "Đông Hồ Folk Painting",
    emoji: "🎨",
    hint: "Tranh dân gian nổi tiếng được in bằng khuôn gỗ trên giấy dó",
    hintEn: "Famous folk paintings printed with woodblocks on traditional paper",
    correctKeywords: ["Khuôn gỗ", "Giấy dó", "Bắc Ninh", "Dân gian"],
    wrongKeywords: ["Sơn dầu", "Canvas", "Kỹ thuật số", "Hà Nội"],
    secret: "Màu sắc trong tranh Đông Hồ được làm hoàn toàn từ thiên nhiên: lá cây, hoa, đá, vỏ sò.",
    secretEn: "Colors in Đông Hồ paintings are made entirely from nature: leaves, flowers, stones, shells.",
  },
  {
    id: "pho",
    name: "Phở",
    nameEn: "Vietnamese Pho",
    emoji: "🍜",
    hint: "Món soup nổi tiếng thế giới với nước dùng ninh xương hàng giờ",
    hintEn: "World-famous soup with bone broth simmered for hours",
    correctKeywords: ["Nước dùng", "Bánh phở", "Hồi quế", "Hà Nội"],
    wrongKeywords: ["Chiên giòn", "Pizza", "Sushi", "Nướng"],
    secret: "Phở xuất hiện đầu thế kỷ 20 ở Nam Định, ban đầu là món ăn bán rong trên đường phố.",
    secretEn: "Pho appeared in early 20th century Nam Định, originally sold by street vendors.",
  },
  {
    id: "mua-roi-nuoc",
    name: "Múa rối nước",
    nameEn: "Water Puppetry",
    emoji: "🎭",
    hint: "Nghệ thuật biểu diễn rối trên mặt nước, độc nhất vô nhị",
    hintEn: "Unique puppet performance art on water surface",
    correctKeywords: ["Mặt nước", "Tre", "Đồng bằng", "1000 năm"],
    wrongKeywords: ["Trên sân khấu", "Nhựa", "Nhật Bản", "Hiện đại"],
    secret: "Múa rối nước ra đời từ thế kỷ 11, khi nông dân biểu diễn trên ruộng ngập nước.",
    secretEn: "Water puppetry was born in the 11th century, when farmers performed on flooded rice paddies.",
  },
  {
    id: "dan-bau",
    name: "Đàn bầu",
    nameEn: "Monochord",
    emoji: "🎵",
    hint: "Nhạc cụ chỉ có một dây nhưng tạo ra âm thanh mê hoặc",
    hintEn: "An instrument with only one string but creates enchanting sound",
    correctKeywords: ["Một dây", "Tre", "Bầu khô", "Việt Nam"],
    wrongKeywords: ["Sáu dây", "Guitar", "Trung Quốc", "Điện tử"],
    secret: "Đàn bầu được UNESCO công nhận là nhạc cụ độc đáo nhất thế giới vì chỉ dùng 1 dây.",
    secretEn: "UNESCO recognized đàn bầu as the world's most unique instrument for using just 1 string.",
  },
  {
    id: "banh-chung",
    name: "Bánh chưng",
    nameEn: "Square Sticky Rice Cake",
    emoji: "🟩",
    hint: "Bánh vuông gói lá dong, biểu tượng của Tết Nguyên Đán",
    hintEn: "Square cake wrapped in dong leaves, symbol of Lunar New Year",
    correctKeywords: ["Lá dong", "Gạo nếp", "Tết", "Hình vuông"],
    wrongKeywords: ["Lò nướng", "Bột mì", "Tròn", "Giáng Sinh"],
    secret: "Truyền thuyết kể rằng Lang Liêu sáng tạo bánh chưng tượng trưng cho Đất để dâng vua cha.",
    secretEn: "Legend says Prince Lang Liêu created bánh chưng to symbolize Earth as an offering to his father the King.",
  },
  {
    id: "hoi-an",
    name: "Đèn lồng Hội An",
    nameEn: "Hội An Lanterns",
    emoji: "🏮",
    hint: "Những chiếc đèn rực rỡ sắc màu thắp sáng phố cổ mỗi đêm rằm",
    hintEn: "Colorful lanterns that light up the ancient town every full moon night",
    correctKeywords: ["Phố cổ", "Rằm", "Lụa", "Di sản"],
    wrongKeywords: ["Đèn LED", "Tokyo", "Nhà máy", "Hàng ngày"],
    secret: "Lễ hội đèn lồng Hội An diễn ra vào ngày 14 âm lịch hàng tháng, khi toàn bộ đèn điện tắt.",
    secretEn: "Hội An lantern festival happens on the 14th of each lunar month, when all electric lights are turned off.",
  },
  {
    id: "ao-ba-ba",
    name: "Áo bà ba",
    nameEn: "Bà Ba Shirt",
    emoji: "👕",
    hint: "Trang phục giản dị của người miền Nam, gắn liền với sông nước",
    hintEn: "Simple outfit of Southern people, associated with rivers and waterways",
    correctKeywords: ["Miền Nam", "Giản dị", "Sông nước", "Nông dân"],
    wrongKeywords: ["Miền Bắc", "Sang trọng", "Núi cao", "Hoàng gia"],
    secret: "Áo bà ba có nguồn gốc từ trang phục của người Hoa ở miền Nam, được Việt hóa qua nhiều thế kỷ.",
    secretEn: "Áo bà ba originated from Chinese-Vietnamese clothing in the South, Vietnamized over centuries.",
  },
  {
    id: "ca-tru",
    name: "Ca trù",
    nameEn: "Ca Trù Singing",
    emoji: "🎤",
    hint: "Nghệ thuật hát thơ cổ truyền, đào nương vừa hát vừa gõ phách",
    hintEn: "Ancient art of singing poetry, the singer plays a bamboo clapper while singing",
    correctKeywords: ["Đào nương", "Phách", "Thơ", "Phi vật thể"],
    wrongKeywords: ["Karaoke", "Guitar", "Rap", "K-pop"],
    secret: "Ca trù được UNESCO công nhận là Di sản văn hóa phi vật thể cần bảo vệ khẩn cấp năm 2009.",
    secretEn: "Ca trù was recognized by UNESCO as Intangible Cultural Heritage in Need of Urgent Safeguarding in 2009.",
  },
];
