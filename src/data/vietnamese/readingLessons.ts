// Vietnamese reading comprehension lessons — 10 lessons across 2 modules
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
        theory: `## Hà Nội 🏛️\n\nHà Nội có lịch sử hơn 1000 năm. Vua Lý Thái Tổ chọn làm kinh đô năm 1010 với tên **Thăng Long**.\n\n> Hà Nội là trung tâm chính trị, kinh tế và văn hóa lớn nhất Việt Nam. Với 36 phố phường cổ, Hồ Hoàn Kiếm, và Văn Miếu – Quốc Tử Giám, Hà Nội thu hút hàng triệu du khách mỗi năm.`,
        theoryEn: `## Hanoi 🏛️\n\nHanoi has over 1000 years of history. King Ly Thai To chose it as capital in 1010, naming it **Thang Long** (Rising Dragon).\n\n> Hanoi is the largest political, economic, and cultural center of Vietnam, featuring the Old Quarter, Hoan Kiem Lake, and the Temple of Literature.`,
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
        theory: `## TP. Hồ Chí Minh 🌆\n\nSài Gòn (nay là TP. Hồ Chí Minh) là thành phố lớn nhất Việt Nam về dân số và kinh tế.\n\n> Được mệnh danh "Hòn ngọc Viễn Đông", Sài Gòn là trung tâm thương mại sầm uất với Chợ Bến Thành, Nhà thờ Đức Bà, Bưu điện trung tâm. Ẩm thực đường phố ở đây nổi tiếng thế giới.`,
        theoryEn: `## Ho Chi Minh City 🌆\n\nSaigon (now Ho Chi Minh City) is Vietnam's largest city by population and economy.\n\n> Called the "Pearl of the Far East," it's a bustling commercial hub with Ben Thanh Market, Notre-Dame Cathedral, and world-famous street food.`,
        vocabulary: [
          { word: "sầm uất", meaning: "nhộn nhịp, đông đúc", meaningEn: "bustling, prosperous", example: "Phố đi bộ rất sầm uất.", exampleEn: "The walking street is bustling.", partOfSpeech: "adjective" },
          { word: "thương mại", meaning: "buôn bán, kinh doanh", meaningEn: "commerce, trade", example: "Trung tâm thương mại lớn.", exampleEn: "A large shopping center.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Sài Gòn được gọi là gì?", questionEn: "What is Saigon called?", options: ["Thành phố hoa", "Hòn ngọc Viễn Đông", "Kinh đô cổ", "Thành phố sương mù"], answer: 1, explanation: "Hòn ngọc Viễn Đông.", explanationEn: "Pearl of the Far East." },
        ],
      },
      {
        id: "vn-read-3", title: "Huế – Kinh đô cổ", titleEn: "Hue – Ancient Capital", level: "intermediate",
        theory: `## Huế 🏯\n\n> Huế là kinh đô cuối cùng của các triều đại phong kiến Việt Nam (nhà Nguyễn, 1802-1945). Đại Nội Huế, lăng tẩm các vua Nguyễn, và sông Hương tạo nên vẻ đẹp trầm mặc của thành phố. Ẩm thực Huế tinh tế với bánh bèo, bún bò, và cơm hến.`,
        theoryEn: `## Hue 🏯\n\n> Hue was the last capital of Vietnamese feudal dynasties (Nguyen Dynasty, 1802-1945). The Imperial City, royal tombs, and the Perfume River create a serene beauty. Hue cuisine is refined with delicate dishes.`,
        vocabulary: [
          { word: "kinh đô", meaning: "thủ đô của triều đại", meaningEn: "royal capital", example: "Huế là kinh đô nhà Nguyễn.", exampleEn: "Hue was the Nguyen capital.", partOfSpeech: "noun" },
          { word: "lăng tẩm", meaning: "nơi chôn cất vua", meaningEn: "royal tomb", example: "Lăng tẩm ở Huế rất đẹp.", exampleEn: "Royal tombs in Hue are beautiful.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Nhà Nguyễn đóng đô ở đâu?", questionEn: "Where was Nguyen Dynasty's capital?", options: ["Hà Nội", "Huế", "Sài Gòn", "Đà Nẵng"], answer: 1, explanation: "Nhà Nguyễn đóng đô ở Huế.", explanationEn: "The Nguyen Dynasty was based in Hue." },
        ],
      },
      {
        id: "vn-read-4", title: "Đồng bằng sông Cửu Long", titleEn: "Mekong Delta", level: "intermediate",
        theory: `## Đồng bằng sông Cửu Long 🌾\n\n> Đồng bằng sông Cửu Long (Tây Nam Bộ) là vựa lúa lớn nhất Việt Nam, nuôi sống hàng chục triệu người. Cuộc sống gắn liền với sông nước: chợ nổi, vườn trái cây, rừng ngập mặn. Cần Thơ là thành phố lớn nhất vùng.`,
        theoryEn: `## Mekong Delta 🌾\n\n> The Mekong Delta is Vietnam's largest rice bowl, feeding tens of millions. Life revolves around water: floating markets, fruit orchards, and mangrove forests. Can Tho is the region's largest city.`,
        vocabulary: [
          { word: "đồng bằng", meaning: "vùng đất bằng phẳng", meaningEn: "plain / delta", example: "Đồng bằng sông Cửu Long màu mỡ.", exampleEn: "The Mekong Delta is fertile.", partOfSpeech: "noun" },
          { word: "chợ nổi", meaning: "chợ trên sông", meaningEn: "floating market", example: "Chợ nổi Cái Răng nổi tiếng.", exampleEn: "Cai Rang floating market is famous.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Đồng bằng sông Cửu Long nổi tiếng về gì?", questionEn: "What is the Mekong Delta famous for?", options: ["Núi", "Lúa gạo", "Tuyết", "Sa mạc"], answer: 1, explanation: "Vựa lúa lớn nhất.", explanationEn: "The largest rice bowl." },
        ],
      },
      {
        id: "vn-read-5", title: "Vịnh Hạ Long", titleEn: "Ha Long Bay", level: "beginner",
        theory: `## Vịnh Hạ Long 🏞️\n\n> Vịnh Hạ Long thuộc tỉnh Quảng Ninh, được UNESCO công nhận là Di sản Thiên nhiên Thế giới. Vịnh có khoảng 1.600 hòn đảo đá vôi, tạo nên phong cảnh hùng vĩ. Truyền thuyết kể rằng rồng đã bay xuống vịnh, phun ngọc trai thành các đảo đá.`,
        theoryEn: `## Ha Long Bay 🏞️\n\n> Ha Long Bay in Quang Ninh province is a UNESCO World Natural Heritage Site with about 1,600 limestone islands creating a majestic landscape. Legend says dragons descended and spat jewels that became the islands.`,
        vocabulary: [
          { word: "vịnh", meaning: "vùng biển ăn vào đất liền", meaningEn: "bay", example: "Vịnh Hạ Long rất đẹp.", exampleEn: "Ha Long Bay is beautiful.", partOfSpeech: "noun" },
          { word: "hùng vĩ", meaning: "to lớn, ấn tượng", meaningEn: "majestic, grand", example: "Phong cảnh hùng vĩ.", exampleEn: "Majestic scenery.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "Vịnh Hạ Long có bao nhiêu đảo?", questionEn: "How many islands in Ha Long Bay?", options: ["500", "1000", "~1600", "3000"], answer: 2, explanation: "Khoảng 1600 hòn đảo.", explanationEn: "About 1,600 islands." },
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
        id: "vn-read-6", title: "Truyện Kiều – Kiệt tác văn học", titleEn: "The Tale of Kieu – Literary Masterpiece", level: "advanced",
        theory: `## Truyện Kiều 📜\n\n> Truyện Kiều của Nguyễn Du (1765-1820) là kiệt tác văn học Việt Nam, gồm 3.254 câu thơ lục bát. Truyện kể về cuộc đời đầy sóng gió của Thúy Kiều – một cô gái tài sắc vẹn toàn phải bán mình chuộc cha. Tác phẩm phản ánh xã hội phong kiến và số phận người phụ nữ.`,
        theoryEn: `## The Tale of Kieu 📜\n\n> Nguyen Du's Tale of Kieu (1765-1820) is Vietnam's greatest literary work with 3,254 verses in luc bat (six-eight) meter. It tells the turbulent life of Thuy Kieu, a talented woman who sacrifices herself to save her father.`,
        vocabulary: [
          { word: "kiệt tác", meaning: "tác phẩm xuất sắc", meaningEn: "masterpiece", example: "Truyện Kiều là kiệt tác.", exampleEn: "Tale of Kieu is a masterpiece.", partOfSpeech: "noun" },
          { word: "lục bát", meaning: "thể thơ 6-8 chữ", meaningEn: "six-eight verse form", example: "Lục bát là thể thơ VN.", exampleEn: "Luc bat is a VN verse form.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Truyện Kiều có bao nhiêu câu?", questionEn: "How many verses?", options: ["1000", "2000", "3254", "5000"], answer: 2, explanation: "3.254 câu thơ lục bát.", explanationEn: "3,254 verses in luc bat meter." },
        ],
      },
      {
        id: "vn-read-7", title: "Hệ thống giáo dục Việt Nam", titleEn: "Vietnamese Education System", level: "advanced",
        theory: `## Giáo dục Việt Nam 🎓\n\n> Hệ thống gồm: Mầm non (3-5 tuổi), Tiểu học (6-10, lớp 1-5), THCS (11-14, lớp 6-9), THPT (15-17, lớp 10-12), Đại học (4-6 năm). Kỳ thi tốt nghiệp THPT quốc gia rất quan trọng. Tỷ lệ biết chữ trên 95%.`,
        theoryEn: `## Vietnamese Education 🎓\n\n> The system includes: Preschool (3-5), Primary (grades 1-5), Lower Secondary (grades 6-9), Upper Secondary (grades 10-12), University (4-6 years). The national high school graduation exam is crucial. Literacy rate is over 95%.`,
        vocabulary: [
          { word: "giáo dục", meaning: "dạy và học", meaningEn: "education", example: "Giáo dục rất quan trọng.", exampleEn: "Education is very important.", partOfSpeech: "noun" },
          { word: "tốt nghiệp", meaning: "hoàn thành chương trình", meaningEn: "to graduate", example: "Tốt nghiệp đại học.", exampleEn: "Graduate from university.", partOfSpeech: "verb" },
        ],
        quiz: [
          { question: "Tiểu học gồm mấy năm?", questionEn: "How many years is primary school?", options: ["3", "4", "5", "6"], answer: 2, explanation: "Tiểu học 5 năm (lớp 1-5).", explanationEn: "Primary school is 5 years." },
        ],
      },
      {
        id: "vn-read-8", title: "Kinh tế Việt Nam hiện đại", titleEn: "Modern Vietnamese Economy", level: "advanced",
        theory: `## Kinh tế Việt Nam 📈\n\n> Sau Đổi Mới 1986, Việt Nam chuyển sang kinh tế thị trường. GDP tăng trưởng trung bình 6-7%/năm. Các ngành xuất khẩu chính: điện tử, dệt may, thủy sản, cà phê, gạo. Việt Nam là thành viên WTO, ASEAN, và tham gia nhiều FTA.`,
        theoryEn: `## Vietnamese Economy 📈\n\n> After Doi Moi in 1986, Vietnam transitioned to a market economy with 6-7% average GDP growth. Key exports: electronics, textiles, seafood, coffee, rice. Vietnam is a member of WTO, ASEAN, and many FTAs.`,
        vocabulary: [
          { word: "kinh tế", meaning: "hoạt động sản xuất, trao đổi", meaningEn: "economy", example: "Kinh tế phát triển mạnh.", exampleEn: "The economy grows strongly.", partOfSpeech: "noun" },
          { word: "xuất khẩu", meaning: "bán hàng ra nước ngoài", meaningEn: "export", example: "VN xuất khẩu nhiều gạo.", exampleEn: "VN exports a lot of rice.", partOfSpeech: "noun/verb" },
        ],
        quiz: [
          { question: "Đổi Mới bắt đầu năm?", questionEn: "When did Doi Moi start?", options: ["1975", "1980", "1986", "1990"], answer: 2, explanation: "1986.", explanationEn: "1986." },
        ],
      },
      {
        id: "vn-read-9", title: "Phong tục cưới hỏi", titleEn: "Wedding Customs", level: "intermediate",
        theory: `## Phong tục cưới hỏi 💍\n\n> Đám cưới Việt Nam có nhiều nghi lễ truyền thống: Lễ dạm ngõ (đi xem mặt), Lễ ăn hỏi (đính hôn), và Lễ cưới. Nhà trai mang tráp (mâm quả) đến nhà gái. Số tráp thường là số lẻ: 5, 7, 9, 11. Cô dâu mặc áo dài đỏ.`,
        theoryEn: `## Wedding Customs 💍\n\n> Vietnamese weddings have many traditional ceremonies: engagement visit, betrothal ceremony, and wedding. The groom's family brings ceremonial trays to the bride's family (odd numbers: 5, 7, 9, 11). The bride wears a red ao dai.`,
        vocabulary: [
          { word: "đám cưới", meaning: "lễ kết hôn", meaningEn: "wedding", example: "Đám cưới rất vui.", exampleEn: "The wedding is joyful.", partOfSpeech: "noun" },
          { word: "cô dâu", meaning: "người nữ kết hôn", meaningEn: "bride", example: "Cô dâu rất đẹp.", exampleEn: "The bride is beautiful.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Số tráp trong lễ ăn hỏi thường là?", questionEn: "Number of trays is usually?", options: ["Số chẵn", "Số lẻ", "Bất kỳ", "Luôn là 10"], answer: 1, explanation: "Số lẻ: 5, 7, 9, 11.", explanationEn: "Odd numbers: 5, 7, 9, 11." },
        ],
      },
      {
        id: "vn-read-10", title: "Cà phê Việt Nam", titleEn: "Vietnamese Coffee Culture", level: "beginner",
        theory: `## Văn hóa cà phê Việt Nam ☕\n\n> Việt Nam là nước xuất khẩu cà phê lớn thứ 2 thế giới (sau Brazil). Các loại cà phê đặc trưng: cà phê sữa đá, cà phê trứng (Hà Nội), cà phê muối (Huế), cà phê dừa. Người Việt thích ngồi cà phê vỉa hè, trò chuyện với bạn bè.`,
        theoryEn: `## Vietnamese Coffee Culture ☕\n\n> Vietnam is the world's 2nd largest coffee exporter (after Brazil). Signature drinks: iced milk coffee, egg coffee (Hanoi), salt coffee (Hue), coconut coffee. Vietnamese love sitting at sidewalk cafes chatting with friends.`,
        vocabulary: [
          { word: "cà phê", meaning: "thức uống từ hạt cà phê", meaningEn: "coffee", example: "Uống cà phê sáng.", exampleEn: "Drink morning coffee.", partOfSpeech: "noun" },
          { word: "vỉa hè", meaning: "lề đường", meaningEn: "sidewalk", example: "Cà phê vỉa hè.", exampleEn: "Sidewalk coffee.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "VN xuất khẩu cà phê thứ mấy TG?", questionEn: "VN is what rank in coffee export?", options: ["1", "2", "3", "5"], answer: 1, explanation: "Thứ 2 sau Brazil.", explanationEn: "2nd after Brazil." },
        ],
      },
    ],
  },
];
