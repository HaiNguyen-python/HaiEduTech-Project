// Vietnamese reading comprehension lessons — 20 lessons across 2 modules (10 per module)
import type { VietnameseModule } from "./types";

export const readingModules: VietnameseModule[] = [
  {
    id: "vn-reading",
    title: "Đọc hiểu cơ bản",
    titleEn: "Basic Reading",
    icon: "📚",
    color: "from-blue-500 to-indigo-500",
    description: "Đọc hiểu về địa danh, văn hóa và đời sống",
    descriptionEn: "Reading about landmarks, culture and daily life",
    category: "reading",
    lessons: [
      {
        id: "vn-read-1", title: "Hà Nội – Thủ đô ngàn năm", titleEn: "Hanoi – Thousand-Year Capital", level: "intermediate",
        theory: `## Hà Nội 🏛️\n\nHà Nội có lịch sử hơn 1000 năm. Vua Lý Thái Tổ chọn làm kinh đô năm 1010 với tên **Thăng Long**.\n\n> Hà Nội là trung tâm chính trị, kinh tế và văn hóa lớn nhất Việt Nam.`,
        theoryEn: `## Hanoi 🏛️\n\nHanoi has over 1000 years of history. King Ly Thai To chose it as capital in 1010, naming it **Thang Long**.`,
        vocabulary: [
          { word: "thủ đô", meaning: "thành phố trung tâm", meaningEn: "capital city", example: "Hà Nội là thủ đô.", exampleEn: "Hanoi is the capital.", partOfSpeech: "noun" },
          { word: "văn hiến", meaning: "truyền thống văn hóa", meaningEn: "cultural heritage", example: "Ngàn năm văn hiến.", exampleEn: "A thousand years of heritage.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Thăng Long là tên cũ của?", questionEn: "Thang Long is the old name of?", options: ["Huế", "Hà Nội", "Sài Gòn", "Đà Nẵng"], answer: 1, explanation: "Thăng Long = Hà Nội.", explanationEn: "Thang Long = Hanoi." },
        ],
      },
      {
        id: "vn-read-2", title: "Sài Gòn – Hòn ngọc Viễn Đông", titleEn: "Saigon – Pearl of the Far East", level: "intermediate",
        theory: `## TP. Hồ Chí Minh 🌆\n\nSài Gòn là thành phố lớn nhất VN. Được mệnh danh "Hòn ngọc Viễn Đông" với Chợ Bến Thành, Nhà thờ Đức Bà.`,
        theoryEn: `## Ho Chi Minh City 🌆\n\nSaigon is Vietnam's largest city, called the "Pearl of the Far East."`,
        vocabulary: [
          { word: "sầm uất", meaning: "nhộn nhịp", meaningEn: "bustling", example: "Phố đi bộ sầm uất.", exampleEn: "Walking street is bustling.", partOfSpeech: "adjective" },
          { word: "thương mại", meaning: "buôn bán", meaningEn: "commerce", example: "Trung tâm thương mại.", exampleEn: "Shopping center.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Sài Gòn được gọi là?", questionEn: "Saigon is called?", options: ["Thành phố hoa", "Hòn ngọc Viễn Đông", "Kinh đô cổ", "TP sương mù"], answer: 1, explanation: "Hòn ngọc Viễn Đông.", explanationEn: "Pearl of the Far East." },
        ],
      },
      {
        id: "vn-read-3", title: "Huế – Kinh đô cổ", titleEn: "Hue – Ancient Capital", level: "intermediate",
        theory: `## Huế 🏯\n\nHuế là kinh đô cuối cùng (nhà Nguyễn, 1802-1945). Đại Nội, lăng tẩm, sông Hương tạo nên vẻ đẹp trầm mặc.`,
        theoryEn: `## Hue 🏯\n\nHue was the last capital of Vietnamese feudal dynasties.`,
        vocabulary: [
          { word: "kinh đô", meaning: "thủ đô triều đại", meaningEn: "royal capital", example: "Huế là kinh đô nhà Nguyễn.", exampleEn: "Hue was Nguyen capital.", partOfSpeech: "noun" },
          { word: "lăng tẩm", meaning: "nơi chôn vua", meaningEn: "royal tomb", example: "Lăng tẩm Huế rất đẹp.", exampleEn: "Hue tombs are beautiful.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Nhà Nguyễn đóng đô ở đâu?", questionEn: "Nguyen capital?", options: ["Hà Nội", "Huế", "Sài Gòn", "Đà Nẵng"], answer: 1, explanation: "Huế.", explanationEn: "Hue." },
        ],
      },
      {
        id: "vn-read-4", title: "Đồng bằng sông Cửu Long", titleEn: "Mekong Delta", level: "intermediate",
        theory: `## Đồng bằng sông Cửu Long 🌾\n\nVựa lúa lớn nhất VN. Cuộc sống gắn liền sông nước: chợ nổi, vườn trái cây, rừng ngập mặn.`,
        theoryEn: `## Mekong Delta 🌾\n\nVietnam's largest rice bowl with floating markets.`,
        vocabulary: [
          { word: "đồng bằng", meaning: "vùng đất bằng", meaningEn: "plain / delta", example: "Đồng bằng sông Cửu Long.", exampleEn: "Mekong Delta.", partOfSpeech: "noun" },
          { word: "chợ nổi", meaning: "chợ trên sông", meaningEn: "floating market", example: "Chợ nổi Cái Răng.", exampleEn: "Cai Rang floating market.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "ĐBSCL nổi tiếng về?", questionEn: "Famous for?", options: ["Núi", "Lúa gạo", "Tuyết", "Sa mạc"], answer: 1, explanation: "Vựa lúa lớn nhất.", explanationEn: "Largest rice bowl." },
        ],
      },
      {
        id: "vn-read-5", title: "Vịnh Hạ Long", titleEn: "Ha Long Bay", level: "beginner",
        theory: `## Vịnh Hạ Long 🏞️\n\nDi sản UNESCO với ~1.600 đảo đá vôi. Truyền thuyết rồng phun ngọc thành đảo.`,
        theoryEn: `## Ha Long Bay 🏞️\n\nUNESCO site with ~1,600 limestone islands.`,
        vocabulary: [
          { word: "vịnh", meaning: "vùng biển ăn vào đất", meaningEn: "bay", example: "Vịnh Hạ Long đẹp.", exampleEn: "Ha Long Bay is beautiful.", partOfSpeech: "noun" },
          { word: "hùng vĩ", meaning: "to lớn, ấn tượng", meaningEn: "majestic", example: "Phong cảnh hùng vĩ.", exampleEn: "Majestic scenery.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "Hạ Long có bao nhiêu đảo?", questionEn: "How many islands?", options: ["500", "1000", "~1600", "3000"], answer: 2, explanation: "Khoảng 1600.", explanationEn: "About 1,600." },
        ],
      },
      // NEW reading lessons
      {
        id: "vn-read-11", title: "Đà Nẵng – Thành phố đáng sống", titleEn: "Da Nang – Most Livable City", level: "intermediate",
        theory: `## Đà Nẵng 🌊\n\nĐà Nẵng nằm giữa VN, nối Hà Nội và Sài Gòn. Nổi tiếng với bãi biển Mỹ Khê, Bà Nà Hills, Cầu Vàng. Được bình chọn là thành phố đáng sống nhất VN.`,
        theoryEn: `## Da Nang 🌊\n\nCentral Vietnam's largest city, famous for My Khe Beach, Ba Na Hills, and the Golden Bridge.`,
        vocabulary: [
          { word: "bãi biển", meaning: "bờ cát ven biển", meaningEn: "beach", example: "Bãi biển Mỹ Khê.", exampleEn: "My Khe Beach.", partOfSpeech: "noun" },
          { word: "đáng sống", meaning: "tốt để sinh sống", meaningEn: "livable / worth living in", example: "TP đáng sống nhất.", exampleEn: "Most livable city.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "Cầu Vàng ở đâu?", questionEn: "Where is the Golden Bridge?", options: ["Hà Nội", "Đà Nẵng", "Huế", "Sài Gòn"], answer: 1, explanation: "Bà Nà Hills, Đà Nẵng.", explanationEn: "Ba Na Hills, Da Nang." },
        ],
      },
      {
        id: "vn-read-12", title: "Hội An – Phố cổ đèn lồng", titleEn: "Hoi An – Lantern Ancient Town", level: "beginner",
        theory: `## Hội An 🏮\n\nHội An là phố cổ được UNESCO công nhận. Nổi tiếng với đèn lồng, Chùa Cầu, và phố đi bộ. Mỗi tối ngày 14 âm lịch là đêm phố cổ – tắt đèn điện, thắp nến và đèn lồng.`,
        theoryEn: `## Hoi An 🏮\n\nUNESCO-listed ancient town famous for lanterns and the Japanese Bridge. Full moon nights feature candlelight.`,
        vocabulary: [
          { word: "phố cổ", meaning: "khu phố lâu đời", meaningEn: "ancient town / old quarter", example: "Phố cổ Hội An.", exampleEn: "Hoi An ancient town.", partOfSpeech: "noun" },
          { word: "đèn lồng", meaning: "đèn trang trí truyền thống", meaningEn: "lantern", example: "Đèn lồng rất đẹp.", exampleEn: "Lanterns are beautiful.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Hội An nổi tiếng với gì?", questionEn: "Hoi An is famous for?", options: ["Biển", "Đèn lồng", "Núi", "Sông"], answer: 1, explanation: "Đèn lồng và phố cổ.", explanationEn: "Lanterns and ancient town." },
        ],
      },
      {
        id: "vn-read-13", title: "Sapa – Ruộng bậc thang", titleEn: "Sapa – Terraced Rice Fields", level: "intermediate",
        theory: `## Sapa 🏔️\n\nSapa (Lào Cai) nổi tiếng với ruộng bậc thang tuyệt đẹp và các dân tộc thiểu số: H'Mông, Dao, Tày. Đỉnh Fansipan (3.143m) là nóc nhà Đông Dương.`,
        theoryEn: `## Sapa 🏔️\n\nFamous for terraced rice fields and ethnic minorities. Fansipan (3,143m) is Indochina's highest peak.`,
        vocabulary: [
          { word: "ruộng bậc thang", meaning: "ruộng lúa trên sườn núi", meaningEn: "terraced rice field", example: "Ruộng bậc thang Sapa.", exampleEn: "Sapa terraced fields.", partOfSpeech: "noun" },
          { word: "dân tộc thiểu số", meaning: "nhóm dân tộc ít người", meaningEn: "ethnic minority", example: "54 dân tộc.", exampleEn: "54 ethnic groups.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Fansipan cao bao nhiêu?", questionEn: "How tall is Fansipan?", options: ["2000m", "3143m", "4000m", "1500m"], answer: 1, explanation: "3.143m.", explanationEn: "3,143 meters." },
        ],
      },
      {
        id: "vn-read-14", title: "Phú Quốc – Đảo ngọc", titleEn: "Phu Quoc – Pearl Island", level: "beginner",
        theory: `## Phú Quốc 🏝️\n\nĐảo lớn nhất VN, thuộc Kiên Giang. Nổi tiếng với nước mắm, hồ tiêu, và bãi biển cát trắng. Phú Quốc có sân bay quốc tế và nhiều resort sang trọng.`,
        theoryEn: `## Phu Quoc 🏝️\n\nVietnam's largest island, famous for fish sauce, pepper, and white sand beaches.`,
        vocabulary: [
          { word: "đảo", meaning: "vùng đất giữa biển", meaningEn: "island", example: "Phú Quốc là đảo lớn nhất.", exampleEn: "Phu Quoc is the largest island.", partOfSpeech: "noun" },
          { word: "hồ tiêu", meaning: "gia vị cay", meaningEn: "pepper", example: "Hồ tiêu Phú Quốc ngon.", exampleEn: "Phu Quoc pepper is great.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Phú Quốc thuộc tỉnh nào?", questionEn: "Which province?", options: ["Quảng Ninh", "Kiên Giang", "Bà Rịa", "Khánh Hòa"], answer: 1, explanation: "Kiên Giang.", explanationEn: "Kien Giang." },
        ],
      },
      {
        id: "vn-read-15", title: "Đà Lạt – Thành phố ngàn hoa", titleEn: "Da Lat – City of Flowers", level: "beginner",
        theory: `## Đà Lạt 🌸\n\nĐà Lạt (Lâm Đồng) ở độ cao 1.500m, khí hậu mát mẻ quanh năm. Nổi tiếng với hoa, rau củ, cà phê, và kiến trúc Pháp. Được mệnh danh "tiểu Paris" của Việt Nam.`,
        theoryEn: `## Da Lat 🌸\n\nAt 1,500m altitude, cool year-round. Famous for flowers, vegetables, coffee, and French architecture. Called Vietnam's "Little Paris."`,
        vocabulary: [
          { word: "khí hậu", meaning: "thời tiết chung của vùng", meaningEn: "climate", example: "Khí hậu Đà Lạt mát mẻ.", exampleEn: "Da Lat has cool climate.", partOfSpeech: "noun" },
          { word: "mát mẻ", meaning: "không nóng không lạnh", meaningEn: "cool / pleasant", example: "Thời tiết mát mẻ.", exampleEn: "Cool weather.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "Đà Lạt ở độ cao bao nhiêu?", questionEn: "Da Lat's altitude?", options: ["500m", "1000m", "1500m", "2000m"], answer: 2, explanation: "1.500m.", explanationEn: "1,500 meters." },
        ],
      },
    ],
  },
  {
    id: "vn-reading-advanced",
    title: "Đọc hiểu nâng cao",
    titleEn: "Advanced Reading",
    icon: "📰",
    color: "from-cyan-500 to-blue-500",
    description: "Văn học, xã hội, và các chủ đề chuyên sâu",
    descriptionEn: "Literature, society, and in-depth topics",
    category: "reading",
    lessons: [
      {
        id: "vn-read-6", title: "Truyện Kiều – Kiệt tác văn học", titleEn: "The Tale of Kieu", level: "advanced",
        theory: `## Truyện Kiều 📜\n\nNguyễn Du (1765-1820), 3.254 câu thơ lục bát. Cuộc đời đầy sóng gió của Thúy Kiều.`,
        theoryEn: `## The Tale of Kieu 📜\n\nVietnam's greatest literary work with 3,254 verses.`,
        vocabulary: [
          { word: "kiệt tác", meaning: "tác phẩm xuất sắc", meaningEn: "masterpiece", example: "Truyện Kiều là kiệt tác.", exampleEn: "Tale of Kieu is a masterpiece.", partOfSpeech: "noun" },
          { word: "lục bát", meaning: "thể thơ 6-8", meaningEn: "six-eight verse form", example: "Lục bát là thể thơ VN.", exampleEn: "Luc bat is a VN verse form.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Truyện Kiều có bao nhiêu câu?", questionEn: "How many verses?", options: ["1000", "2000", "3254", "5000"], answer: 2, explanation: "3.254 câu.", explanationEn: "3,254 verses." },
        ],
      },
      {
        id: "vn-read-7", title: "Hệ thống giáo dục VN", titleEn: "Vietnamese Education System", level: "advanced",
        theory: `## Giáo dục VN 🎓\n\nMầm non (3-5), Tiểu học (lớp 1-5), THCS (lớp 6-9), THPT (lớp 10-12), Đại học (4-6 năm). Tỷ lệ biết chữ trên 95%.`,
        theoryEn: `## Vietnamese Education 🎓\n\nPreschool, Primary (1-5), Lower Secondary (6-9), Upper Secondary (10-12), University.`,
        vocabulary: [
          { word: "giáo dục", meaning: "dạy và học", meaningEn: "education", example: "Giáo dục quan trọng.", exampleEn: "Education is important.", partOfSpeech: "noun" },
          { word: "tốt nghiệp", meaning: "hoàn thành", meaningEn: "to graduate", example: "Tốt nghiệp đại học.", exampleEn: "Graduate from university.", partOfSpeech: "verb" },
        ],
        quiz: [
          { question: "Tiểu học mấy năm?", questionEn: "How many years?", options: ["3", "4", "5", "6"], answer: 2, explanation: "5 năm (lớp 1-5).", explanationEn: "5 years." },
        ],
      },
      {
        id: "vn-read-8", title: "Kinh tế VN hiện đại", titleEn: "Modern Vietnamese Economy", level: "advanced",
        theory: `## Kinh tế VN 📈\n\nSau Đổi Mới 1986, GDP tăng 6-7%/năm. Xuất khẩu: điện tử, dệt may, cà phê, gạo. Thành viên WTO, ASEAN.`,
        theoryEn: `## Vietnamese Economy 📈\n\nAfter Doi Moi 1986, 6-7% average GDP growth.`,
        vocabulary: [
          { word: "kinh tế", meaning: "hoạt động sản xuất", meaningEn: "economy", example: "Kinh tế phát triển.", exampleEn: "Economy grows.", partOfSpeech: "noun" },
          { word: "xuất khẩu", meaning: "bán ra nước ngoài", meaningEn: "export", example: "VN xuất khẩu gạo.", exampleEn: "VN exports rice.", partOfSpeech: "noun/verb" },
        ],
        quiz: [
          { question: "Đổi Mới năm nào?", questionEn: "When?", options: ["1975", "1980", "1986", "1990"], answer: 2, explanation: "1986.", explanationEn: "1986." },
        ],
      },
      {
        id: "vn-read-9", title: "Phong tục cưới hỏi", titleEn: "Wedding Customs", level: "intermediate",
        theory: `## Phong tục cưới hỏi 💍\n\nLễ dạm ngõ, Lễ ăn hỏi, Lễ cưới. Tráp (mâm quả) số lẻ: 5, 7, 9, 11. Cô dâu mặc áo dài đỏ.`,
        theoryEn: `## Wedding Customs 💍\n\nEngagement visit, betrothal, wedding. Odd number of trays. Red ao dai for bride.`,
        vocabulary: [
          { word: "đám cưới", meaning: "lễ kết hôn", meaningEn: "wedding", example: "Đám cưới vui.", exampleEn: "Wedding is joyful.", partOfSpeech: "noun" },
          { word: "cô dâu", meaning: "người nữ kết hôn", meaningEn: "bride", example: "Cô dâu đẹp.", exampleEn: "Bride is beautiful.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Số tráp thường là?", questionEn: "Number of trays?", options: ["Chẵn", "Lẻ", "Bất kỳ", "Luôn 10"], answer: 1, explanation: "Số lẻ: 5, 7, 9, 11.", explanationEn: "Odd numbers." },
        ],
      },
      {
        id: "vn-read-10", title: "Cà phê Việt Nam", titleEn: "Vietnamese Coffee Culture", level: "beginner",
        theory: `## Văn hóa cà phê ☕\n\nVN xuất khẩu cà phê thứ 2 TG. Đặc trưng: cà phê sữa đá, cà phê trứng, cà phê muối, cà phê dừa.`,
        theoryEn: `## Vietnamese Coffee ☕\n\nWorld's 2nd largest coffee exporter. Signature: iced milk coffee, egg coffee.`,
        vocabulary: [
          { word: "cà phê", meaning: "thức uống từ hạt", meaningEn: "coffee", example: "Uống cà phê sáng.", exampleEn: "Morning coffee.", partOfSpeech: "noun" },
          { word: "vỉa hè", meaning: "lề đường", meaningEn: "sidewalk", example: "Cà phê vỉa hè.", exampleEn: "Sidewalk coffee.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "VN xuất khẩu cà phê thứ mấy?", questionEn: "Coffee export rank?", options: ["1", "2", "3", "5"], answer: 1, explanation: "Thứ 2 sau Brazil.", explanationEn: "2nd after Brazil." },
        ],
      },
      // NEW advanced reading lessons
      {
        id: "vn-read-16", title: "Bánh mì – Di sản ẩm thực", titleEn: "Banh Mi – Culinary Heritage", level: "intermediate",
        theory: `## Bánh mì Việt Nam 🥖\n\nBánh mì VN là sự pha trộn giữa bánh mì Pháp và ẩm thực Việt. Vỏ giòn, ruột mềm, nhân đa dạng: pate, chả, rau sống, đồ chua. Năm 2020, Google Doodle vinh danh bánh mì VN.`,
        theoryEn: `## Vietnamese Banh Mi 🥖\n\nA fusion of French baguette and Vietnamese ingredients. Google Doodle honored it in 2020.`,
        vocabulary: [
          { word: "pha trộn", meaning: "kết hợp", meaningEn: "to blend / mix", example: "Pha trộn văn hóa.", exampleEn: "Cultural blending.", partOfSpeech: "verb" },
          { word: "đồ chua", meaning: "rau ngâm chua", meaningEn: "pickled vegetables", example: "Đồ chua trong bánh mì.", exampleEn: "Pickled veggies in banh mi.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Bánh mì VN ảnh hưởng từ nước nào?", questionEn: "Influenced by?", options: ["Trung Quốc", "Pháp", "Nhật", "Mỹ"], answer: 1, explanation: "Ảnh hưởng từ Pháp.", explanationEn: "French influence." },
        ],
      },
      {
        id: "vn-read-17", title: "Áo dài – Linh hồn Việt Nam", titleEn: "Ao Dai – Soul of Vietnam", level: "intermediate",
        theory: `## Áo dài 👗\n\nÁo dài là trang phục truyền thống VN, được mặc trong các dịp lễ, trường học, và sự kiện quan trọng. Áo dài hiện đại được cải tiến từ thế kỷ 20, vừa giữ nét truyền thống vừa hợp thời trang.`,
        theoryEn: `## Ao Dai 👗\n\nVietnam's traditional dress, worn at ceremonies, schools, and important events.`,
        vocabulary: [
          { word: "truyền thống", meaning: "được giữ lâu đời", meaningEn: "traditional", example: "Trang phục truyền thống.", exampleEn: "Traditional dress.", partOfSpeech: "adjective" },
          { word: "cải tiến", meaning: "thay đổi cho tốt hơn", meaningEn: "to improve / modernize", example: "Cải tiến thiết kế.", exampleEn: "Improve the design.", partOfSpeech: "verb" },
        ],
        quiz: [
          { question: "Áo dài mặc khi nào?", questionEn: "When to wear ao dai?", options: ["Ngủ", "Lễ hội, trường học", "Thể thao", "Nấu ăn"], answer: 1, explanation: "Lễ hội và trường học.", explanationEn: "Festivals and schools." },
        ],
      },
      {
        id: "vn-read-18", title: "Văn hóa xe máy ở Việt Nam", titleEn: "Motorbike Culture in Vietnam", level: "intermediate",
        theory: `## Xe máy Việt Nam 🏍️\n\nVN có hơn 45 triệu xe máy, chiếm 90% phương tiện cá nhân. Xe máy không chỉ là phương tiện mà là "văn hóa": chở cả gia đình, vận chuyển hàng hóa, bán hàng rong.`,
        theoryEn: `## Motorbike Culture 🏍️\n\nWith 45+ million motorbikes (90% of personal vehicles), motorbikes are central to Vietnamese life.`,
        vocabulary: [
          { word: "phương tiện", meaning: "dụng cụ di chuyển", meaningEn: "vehicle / means", example: "Xe máy là phương tiện chính.", exampleEn: "Motorbikes are main transport.", partOfSpeech: "noun" },
          { word: "hàng rong", meaning: "bán hàng dạo", meaningEn: "street vendor", example: "Người bán hàng rong.", exampleEn: "Street vendor.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "VN có bao nhiêu xe máy?", questionEn: "How many motorbikes?", options: ["10 triệu", "25 triệu", "45 triệu+", "100 triệu"], answer: 2, explanation: "Hơn 45 triệu.", explanationEn: "Over 45 million." },
        ],
      },
      {
        id: "vn-read-19", title: "Ngày Tết ở Việt Nam", titleEn: "Tet Holiday in Vietnam", level: "beginner",
        theory: `## Tết Nguyên Đán 🎊\n\nTết là lễ lớn nhất, kéo dài 3-7 ngày. Chuẩn bị: dọn nhà, mua sắm, gói bánh chưng. Ngày Tết: thăm họ hàng, chúc Tết, nhận lì xì. Kiêng kỵ: không quét nhà ngày mùng 1.`,
        theoryEn: `## Tet Holiday 🎊\n\nVietnam's biggest celebration lasting 3-7 days. Preparations, family visits, lucky money, and taboos.`,
        vocabulary: [
          { word: "chúc Tết", meaning: "nói lời chúc đầu năm", meaningEn: "New Year wishes", example: "Chúc Tết ông bà.", exampleEn: "Wish grandparents happy new year.", partOfSpeech: "verb phrase" },
          { word: "kiêng kỵ", meaning: "tránh không làm", meaningEn: "taboo / avoid", example: "Kiêng quét nhà ngày Tết.", exampleEn: "Avoid sweeping on Tet.", partOfSpeech: "noun/verb" },
        ],
        quiz: [
          { question: "Kiêng gì ngày mùng 1?", questionEn: "What's taboo on day 1?", options: ["Ăn", "Quét nhà", "Uống nước", "Ngủ"], answer: 1, explanation: "Không quét nhà (quét may mắn đi).", explanationEn: "Don't sweep (sweeps away luck)." },
        ],
      },
      {
        id: "vn-read-20", title: "Giới trẻ Việt Nam ngày nay", titleEn: "Vietnamese Youth Today", level: "advanced",
        theory: `## Giới trẻ VN 🧑‍💻\n\nDân số VN rất trẻ (trung vị ~31 tuổi). Gen Z VN lớn lên với Internet, mạng xã hội, và toàn cầu hóa. Thách thức: áp lực học hành, cân bằng truyền thống và hiện đại, tìm kiếm bản sắc.`,
        theoryEn: `## Vietnamese Youth 🧑‍💻\n\nYoung population (median ~31). Gen Z growing up with internet, social media, and globalization.`,
        vocabulary: [
          { word: "giới trẻ", meaning: "thế hệ trẻ", meaningEn: "youth / young generation", example: "Giới trẻ VN năng động.", exampleEn: "VN youth is dynamic.", partOfSpeech: "noun" },
          { word: "toàn cầu hóa", meaning: "kết nối thế giới", meaningEn: "globalization", example: "Toàn cầu hóa ảnh hưởng lớn.", exampleEn: "Globalization has big impact.", partOfSpeech: "noun" },
          { word: "bản sắc", meaning: "đặc trưng riêng", meaningEn: "identity", example: "Giữ gìn bản sắc văn hóa.", exampleEn: "Preserve cultural identity.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Tuổi trung vị dân số VN?", questionEn: "Median age?", options: ["~21", "~31", "~41", "~51"], answer: 1, explanation: "Khoảng 31 tuổi.", explanationEn: "About 31 years old." },
        ],
      },
    ],
  },
];
