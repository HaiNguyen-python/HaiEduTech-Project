// Expanded Vietnamese history data — timeline, 4-month roadmap with ~15 lessons each
import type { HistoryEvent, HistoryMonth } from "./types";

export const historyTimeline: HistoryEvent[] = [
  { year: "2879 TCN", title: "Hùng Vương lập nước", titleEn: "Hung Kings Founded Nation", description: "Vua Hùng lập nước Văn Lang.", descriptionEn: "King Hung founded Van Lang." },
  { year: "~2000 TCN", title: "Văn hóa Phùng Nguyên", titleEn: "Phung Nguyen Culture", description: "Thời kỳ đồ đồng sớm.", descriptionEn: "Early Bronze Age culture." },
  { year: "~700 TCN", title: "Văn hóa Đông Sơn", titleEn: "Dong Son Culture", description: "Trống đồng Đông Sơn.", descriptionEn: "Dong Son bronze drums." },
  { year: "257 TCN", title: "An Dương Vương lập Âu Lạc", titleEn: "Au Lac Founded", description: "Xây thành Cổ Loa.", descriptionEn: "Built Co Loa citadel." },
  { year: "207 TCN", title: "Triệu Đà lập Nam Việt", titleEn: "Trieu Da Founded Nam Viet", description: "Triệu Đà lập nước Nam Việt.", descriptionEn: "Trieu Da founded Nam Viet." },
  { year: "111 TCN", title: "Bắc thuộc lần 1", titleEn: "First Chinese Domination", description: "Nhà Hán chiếm Âu Lạc.", descriptionEn: "Han Dynasty conquered Au Lac." },
  { year: "40", title: "Hai Bà Trưng khởi nghĩa", titleEn: "Trung Sisters' Uprising", description: "Hai Bà Trưng đánh đuổi quân Hán.", descriptionEn: "Trung Sisters expelled the Han." },
  { year: "248", title: "Bà Triệu khởi nghĩa", titleEn: "Lady Trieu's Uprising", description: "Bà Triệu chống quân Ngô.", descriptionEn: "Lady Trieu fought against Wu." },
  { year: "544", title: "Lý Bí lập Vạn Xuân", titleEn: "Ly Bi Founded Van Xuan", description: "Lý Bí xưng đế, lập nước Vạn Xuân.", descriptionEn: "Ly Bi proclaimed emperor." },
  { year: "938", title: "Ngô Quyền thắng Bạch Đằng", titleEn: "Bach Dang Victory", description: "Chấm dứt 1000 năm Bắc thuộc.", descriptionEn: "Ended 1000 years of Chinese rule." },
  { year: "968", title: "Đinh Bộ Lĩnh thống nhất", titleEn: "Dinh Bo Linh Unified", description: "Lập nước Đại Cồ Việt.", descriptionEn: "Founded Dai Co Viet." },
  { year: "981", title: "Lê Hoàn thắng Tống", titleEn: "Le Hoan Defeated Song", description: "Đánh bại quân Tống xâm lược.", descriptionEn: "Defeated Song invasion." },
  { year: "1010", title: "Dời đô về Thăng Long", titleEn: "Capital to Thang Long", description: "Lý Thái Tổ dời đô.", descriptionEn: "Ly Thai To moved capital." },
  { year: "1042", title: "Bộ luật Hình Thư", titleEn: "First Legal Code", description: "Bộ luật thành văn đầu tiên.", descriptionEn: "Vietnam's first written legal code." },
  { year: "1070", title: "Xây Văn Miếu", titleEn: "Temple of Literature", description: "Trường đại học đầu tiên.", descriptionEn: "First university built." },
  { year: "1075", title: "Lý Thường Kiệt phá Tống", titleEn: "Ly Thuong Kiet vs Song", description: "Tiên phát chế nhân.", descriptionEn: "Preemptive strike against Song." },
  { year: "1226", title: "Nhà Trần thành lập", titleEn: "Tran Dynasty Founded", description: "Nhà Trần thay nhà Lý.", descriptionEn: "Tran replaced Ly Dynasty." },
  { year: "1258", title: "Kháng Nguyên lần 1", titleEn: "1st Mongol Resistance", description: "Đánh lui quân Nguyên.", descriptionEn: "Repelled the Mongols." },
  { year: "1285", title: "Kháng Nguyên lần 2", titleEn: "2nd Mongol Resistance", description: "Trần Hưng Đạo đại thắng.", descriptionEn: "Tran Hung Dao's great victory." },
  { year: "1288", title: "Đại thắng Bạch Đằng", titleEn: "Bach Dang 1288", description: "Lần 3 đánh bại Nguyên Mông.", descriptionEn: "3rd defeat of the Mongols." },
  { year: "1428", title: "Lê Lợi đuổi quân Minh", titleEn: "Le Loi vs Ming", description: "Khởi nghĩa Lam Sơn thành công.", descriptionEn: "Lam Son uprising succeeded." },
  { year: "1471", title: "Lê Thánh Tông cải cách", titleEn: "Le Thanh Tong Reforms", description: "Thời kỳ hoàng kim Hậu Lê.", descriptionEn: "Golden age of Later Le." },
  { year: "1527", title: "Nhà Mạc", titleEn: "Mac Dynasty", description: "Mạc Đăng Dung cướp ngôi.", descriptionEn: "Mac Dang Dung seized the throne." },
  { year: "1558", title: "Trịnh-Nguyễn phân tranh", titleEn: "Trinh-Nguyen Civil War", description: "Đất nước chia đôi.", descriptionEn: "Country divided in two." },
  { year: "1771", title: "Phong trào Tây Sơn", titleEn: "Tay Son Movement", description: "Ba anh em Tây Sơn nổi dậy.", descriptionEn: "Three Tay Son brothers revolted." },
  { year: "1789", title: "Quang Trung phá Thanh", titleEn: "Quang Trung vs Qing", description: "Đại phá 29 vạn quân Thanh.", descriptionEn: "Crushed 290,000 Qing troops." },
  { year: "1802", title: "Nhà Nguyễn thống nhất", titleEn: "Nguyen Unification", description: "Gia Long thống nhất đất nước.", descriptionEn: "Gia Long unified Vietnam." },
  { year: "1858", title: "Pháp tấn công Đà Nẵng", titleEn: "French Attack Da Nang", description: "Bắt đầu xâm lược.", descriptionEn: "French colonization began." },
  { year: "1862", title: "Hiệp ước Nhâm Tuất", titleEn: "Treaty of Saigon", description: "Nhường 3 tỉnh miền Nam.", descriptionEn: "Ceded 3 southern provinces." },
  { year: "1885", title: "Phong trào Cần Vương", titleEn: "Can Vuong Movement", description: "Kháng chiến chống Pháp.", descriptionEn: "Anti-French resistance." },
  { year: "1911", title: "Nguyễn Tất Thành ra đi", titleEn: "Young Ho Chi Minh Left", description: "Bác Hồ ra đi tìm đường cứu nước.", descriptionEn: "Ho Chi Minh left to find a path." },
  { year: "1930", title: "Thành lập Đảng CSVN", titleEn: "Communist Party Founded", description: "Nguyễn Ái Quốc thành lập Đảng.", descriptionEn: "Nguyen Ai Quoc founded the Party." },
  { year: "1941", title: "Việt Minh thành lập", titleEn: "Viet Minh Founded", description: "Mặt trận Việt Minh ra đời.", descriptionEn: "Viet Minh front established." },
  { year: "1945", title: "Cách mạng Tháng Tám", titleEn: "August Revolution", description: "Tuyên ngôn Độc lập 2/9/1945.", descriptionEn: "Independence declared Sep 2, 1945." },
  { year: "1946", title: "Kháng chiến chống Pháp", titleEn: "First Indochina War", description: "Toàn quốc kháng chiến.", descriptionEn: "Nationwide resistance began." },
  { year: "1954", title: "Điện Biên Phủ", titleEn: "Dien Bien Phu", description: "Chiến thắng lịch sử.", descriptionEn: "Historic victory." },
  { year: "1955", title: "Chia cắt Bắc-Nam", titleEn: "North-South Division", description: "Hiệp định Geneva chia đôi.", descriptionEn: "Geneva Accords divided Vietnam." },
  { year: "1968", title: "Tổng tấn công Tết Mậu Thân", titleEn: "Tet Offensive", description: "Cuộc tấn công bất ngờ.", descriptionEn: "Surprise nationwide offensive." },
  { year: "1975", title: "Thống nhất đất nước", titleEn: "Reunification", description: "30/4/1975 giải phóng miền Nam.", descriptionEn: "April 30, 1975 liberation." },
  { year: "1986", title: "Đổi Mới", titleEn: "Doi Moi", description: "Mở cửa nền kinh tế.", descriptionEn: "Economic reform began." },
  { year: "1995", title: "Bình thường hóa quan hệ Mỹ", titleEn: "US Normalization", description: "Bình thường hóa quan hệ với Mỹ.", descriptionEn: "Normalized relations with the US." },
  { year: "1998", title: "Internet vào Việt Nam", titleEn: "Internet in Vietnam", description: "Việt Nam kết nối Internet.", descriptionEn: "Vietnam connected to the Internet." },
  { year: "2007", title: "Gia nhập WTO", titleEn: "Joined WTO", description: "Hội nhập kinh tế quốc tế.", descriptionEn: "International economic integration." },
  { year: "2010", title: "Đại lễ 1000 năm Thăng Long", titleEn: "1000 Years of Thang Long", description: "Kỷ niệm 1000 năm Hà Nội.", descriptionEn: "Celebrating 1000 years of Hanoi." },
  { year: "2020", title: "Chủ tịch ASEAN", titleEn: "ASEAN Chair 2020", description: "Việt Nam làm chủ tịch ASEAN.", descriptionEn: "Vietnam chaired ASEAN." },
];

export const historyMonths: HistoryMonth[] = [
  {
    id: "hist-month-1", month: 1, title: "Thời kỳ Dựng nước", titleEn: "Early Kingdoms",
    icon: "🏔️", color: "from-amber-600 to-yellow-500",
    description: "Hùng Vương, Âu Lạc, Bắc thuộc, và Ngô Quyền",
    descriptionEn: "Hung Kings, Au Lac, Chinese domination, and Ngo Quyen",
    lessons: [
      {
        id: "hist-1-1", title: "Sự tích Hùng Vương", titleEn: "Legend of Hung Kings",
        story: "Lạc Long Quân và Âu Cơ sinh ra 100 người con. 50 lên núi, 50 xuống biển. Người con cả lên ngôi Hùng Vương, lập nước Văn Lang – quốc gia đầu tiên, tồn tại 2.600 năm với 18 đời vua.",
        storyEn: "Lac Long Quan and Au Co had 100 children. 50 went to mountains, 50 to sea. The eldest became Hung Vuong, founding Van Lang – the first nation, lasting 2,600 years with 18 kings.",
        keyDates: [
          { year: "2879 TCN", title: "Lập Văn Lang", titleEn: "Founded Van Lang", description: "Hùng Vương thứ nhất.", descriptionEn: "First Hung King." },
          { year: "~700 TCN", title: "Đồ đồng Đông Sơn", titleEn: "Dong Son Bronze", description: "Trống đồng.", descriptionEn: "Bronze drums." },
        ],
        quiz: [
          { question: "Văn Lang có bao nhiêu đời vua?", questionEn: "How many Hung Kings?", options: ["10", "15", "18", "20"], answer: 2, explanation: "18 đời.", explanationEn: "18 generations." },
          { question: "Kinh đô Văn Lang ở đâu?", questionEn: "Van Lang capital?", options: ["Hà Nội", "Phong Châu", "Huế", "Hoa Lư"], answer: 1, explanation: "Phong Châu (Phú Thọ).", explanationEn: "Phong Chau." },
        ],
      },
      {
        id: "hist-1-2", title: "An Dương Vương và thành Cổ Loa", titleEn: "An Duong Vuong & Co Loa",
        story: "Thục Phán đánh bại Hùng Vương, lập nước Âu Lạc (257 TCN). Ông xây thành Cổ Loa hình xoáy ốc – công trình quân sự vĩ đại. Truyền thuyết nỏ thần Kim Quy giúp bảo vệ đất nước.",
        storyEn: "Thuc Phan defeated the Hung Kings, founding Au Lac (257 BCE). He built Co Loa citadel in a spiral shape – a great military structure. Legend says a magical crossbow from a golden turtle protected the nation.",
        keyDates: [
          { year: "257 TCN", title: "Lập Âu Lạc", titleEn: "Founded Au Lac", description: "Thục Phán lên ngôi.", descriptionEn: "Thuc Phan ascended." },
        ],
        quiz: [
          { question: "Thành Cổ Loa có hình gì?", questionEn: "Co Loa's shape?", options: ["Vuông", "Tròn", "Xoáy ốc", "Tam giác"], answer: 2, explanation: "Hình xoáy ốc.", explanationEn: "Spiral shape." },
        ],
      },
      {
        id: "hist-1-3", title: "Hai Bà Trưng", titleEn: "The Trung Sisters",
        story: "Năm 40, Trưng Trắc và Trưng Nhị lãnh đạo cuộc khởi nghĩa chống quân Hán, giải phóng 65 thành. Trưng Trắc xưng vương, đóng đô Mê Linh. Đây là cuộc khởi nghĩa đầu tiên do phụ nữ lãnh đạo trong lịch sử VN.",
        storyEn: "In 40 CE, Trung Trac and Trung Nhi led an uprising against the Han Dynasty, liberating 65 citadels. Trung Trac became queen. This was Vietnam's first female-led uprising.",
        keyDates: [
          { year: "40", title: "Khởi nghĩa Hai Bà Trưng", titleEn: "Trung Sisters' Uprising", description: "Giải phóng 65 thành.", descriptionEn: "Liberated 65 citadels." },
        ],
        quiz: [
          { question: "Hai Bà Trưng chống lại ai?", questionEn: "Who did the Trung Sisters fight?", options: ["Quân Ngô", "Quân Hán", "Quân Mông", "Quân Pháp"], answer: 1, explanation: "Chống quân Hán.", explanationEn: "Against the Han Dynasty." },
        ],
      },
      {
        id: "hist-1-4", title: "Bà Triệu", titleEn: "Lady Trieu",
        story: "Năm 248, Triệu Thị Trinh (Bà Triệu) khởi nghĩa chống quân Ngô. Bà nổi tiếng với câu nói: 'Tôi muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ, chém cá kình ở biển Đông.' Cuộc khởi nghĩa thất bại nhưng tinh thần bất khuất của Bà truyền cảm hứng cho hậu thế.",
        storyEn: "In 248, Lady Trieu led an uprising against the Wu Dynasty. Famous for: 'I want to ride the storm, tread dangerous waves, kill the sharks in the East Sea.' The uprising failed but her indomitable spirit inspired generations.",
        keyDates: [
          { year: "248", title: "Khởi nghĩa Bà Triệu", titleEn: "Lady Trieu's Uprising", description: "Chống quân Ngô.", descriptionEn: "Against Wu Dynasty." },
        ],
        quiz: [
          { question: "Bà Triệu chống lại triều đại nào?", questionEn: "Which dynasty?", options: ["Hán", "Ngô", "Đường", "Minh"], answer: 1, explanation: "Quân Ngô.", explanationEn: "Wu Dynasty." },
        ],
      },
      {
        id: "hist-1-5", title: "Ngô Quyền và trận Bạch Đằng 938", titleEn: "Ngo Quyen & Bach Dang 938",
        story: "Ngô Quyền cắm cọc nhọn bọc sắt xuống sông Bạch Đằng. Khi thủy triều lên, dụ thuyền Nam Hán vào. Thủy triều rút, thuyền mắc cạn bị cọc đâm. Chiến thắng chấm dứt 1000 năm Bắc thuộc.",
        storyEn: "Ngo Quyen planted iron-tipped stakes in Bach Dang River. At high tide, he lured Southern Han ships in. At low tide, ships were impaled. This victory ended 1000 years of Chinese rule.",
        keyDates: [
          { year: "938", title: "Trận Bạch Đằng", titleEn: "Bach Dang Battle", description: "Đánh tan quân Nam Hán.", descriptionEn: "Destroyed Southern Han fleet." },
        ],
        quiz: [
          { question: "Chiến thuật của Ngô Quyền?", questionEn: "Ngo Quyen's tactic?", options: ["Phục kích", "Cọc nhọn dưới sông", "Đốt thuyền", "Xây tường"], answer: 1, explanation: "Cắm cọc nhọn bọc sắt.", explanationEn: "Iron-tipped stakes in river." },
        ],
      },
    ],
  },
  {
    id: "hist-month-2", month: 2, title: "Các Triều đại Hoàng kim", titleEn: "The Golden Dynasties",
    icon: "👑", color: "from-yellow-500 to-amber-600",
    description: "Nhà Lý, Trần, Lê – thời kỳ rực rỡ nhất",
    descriptionEn: "Ly, Tran, Le – the most glorious periods",
    lessons: [
      {
        id: "hist-2-1", title: "Nhà Lý – Dời đô Thăng Long", titleEn: "Ly Dynasty – Thang Long",
        story: "Năm 1010, Lý Thái Tổ dời đô từ Hoa Lư về Thăng Long. Truyền thuyết rồng vàng bay lên. Nhà Lý xây Văn Miếu (1070), Quốc Tử Giám (1076) – trường đại học đầu tiên.",
        storyEn: "In 1010, Ly Thai To moved the capital to Thang Long (Rising Dragon). Built Temple of Literature (1070) and Imperial Academy (1076) – Vietnam's first university.",
        keyDates: [
          { year: "1010", title: "Dời đô", titleEn: "Capital Moved", description: "Thăng Long thành kinh đô.", descriptionEn: "Thang Long became capital." },
          { year: "1070", title: "Văn Miếu", titleEn: "Temple of Literature", description: "Trường đại học đầu tiên.", descriptionEn: "First university." },
        ],
        quiz: [
          { question: "Thăng Long nghĩa là gì?", questionEn: "What does Thang Long mean?", options: ["Rồng vàng", "Rồng bay lên", "Thành rồng", "Rồng thiêng"], answer: 1, explanation: "Rồng bay lên.", explanationEn: "Rising Dragon." },
        ],
      },
      {
        id: "hist-2-2", title: "Lý Thường Kiệt đánh Tống", titleEn: "Ly Thuong Kiet vs Song",
        story: "Năm 1075, Lý Thường Kiệt chủ động tấn công quân Tống (tiên phát chế nhân). Ông viết bài thơ 'Nam quốc sơn hà' – được coi là bản tuyên ngôn độc lập đầu tiên của Việt Nam.",
        storyEn: "In 1075, Ly Thuong Kiet preemptively attacked the Song Dynasty. He wrote 'Nam quoc son ha' (Our country's rivers and mountains) – considered Vietnam's first declaration of independence.",
        keyDates: [
          { year: "1075", title: "Đánh Tống", titleEn: "Song Attack", description: "Tiên phát chế nhân.", descriptionEn: "Preemptive strike." },
        ],
        quiz: [
          { question: "'Nam quốc sơn hà' do ai viết?", questionEn: "Who wrote it?", options: ["Lý Thái Tổ", "Lý Thường Kiệt", "Trần Hưng Đạo", "Lê Lợi"], answer: 1, explanation: "Lý Thường Kiệt.", explanationEn: "Ly Thuong Kiet." },
        ],
      },
      {
        id: "hist-2-3", title: "Nhà Trần – 3 lần thắng Nguyên Mông", titleEn: "Tran – Defeating Mongols",
        story: "Nhà Trần 3 lần đánh bại đế chế Nguyên Mông (1258, 1285, 1288). Trần Hưng Đạo viết 'Hịch tướng sĩ'. Trận Bạch Đằng 1288 dùng cọc nhọn tương tự Ngô Quyền.",
        storyEn: "The Tran Dynasty defeated the Mongol Empire three times (1258, 1285, 1288). Tran Hung Dao wrote the famous 'Proclamation to Officers.' The 1288 Bach Dang battle used stakes like Ngo Quyen.",
        keyDates: [
          { year: "1258", title: "Kháng Nguyên lần 1", titleEn: "1st Mongol Defense", description: "Đánh lui quân Nguyên.", descriptionEn: "Repelled Mongols." },
          { year: "1288", title: "Bạch Đằng 1288", titleEn: "Bach Dang 1288", description: "Đại thắng.", descriptionEn: "Great victory." },
        ],
        quiz: [
          { question: "Nhà Trần thắng Nguyên mấy lần?", questionEn: "How many times?", options: ["1", "2", "3", "4"], answer: 2, explanation: "3 lần.", explanationEn: "3 times." },
        ],
      },
      {
        id: "hist-2-4", title: "Lê Lợi và Khởi nghĩa Lam Sơn", titleEn: "Le Loi & Lam Son",
        story: "Sau 20 năm Minh thuộc, Lê Lợi lãnh đạo khởi nghĩa Lam Sơn (1418-1428). Nguyễn Trãi viết 'Bình Ngô Đại Cáo' – áng văn bất hủ. Truyền thuyết Hồ Gươm: Lê Lợi trả gươm thần cho rùa vàng.",
        storyEn: "After 20 years of Ming rule, Le Loi led the Lam Son uprising (1418-1428). Nguyen Trai wrote the 'Great Proclamation.' Legend of Sword Lake: Le Loi returned the divine sword to the golden turtle.",
        keyDates: [
          { year: "1428", title: "Đánh đuổi quân Minh", titleEn: "Expelled Ming", description: "Lập nhà Hậu Lê.", descriptionEn: "Founded Later Le Dynasty." },
        ],
        quiz: [
          { question: "'Bình Ngô Đại Cáo' do ai viết?", questionEn: "Who wrote it?", options: ["Lê Lợi", "Nguyễn Trãi", "Trần Hưng Đạo", "Lý Thường Kiệt"], answer: 1, explanation: "Nguyễn Trãi.", explanationEn: "Nguyen Trai." },
        ],
      },
      {
        id: "hist-2-5", title: "Lê Thánh Tông – Thời hoàng kim", titleEn: "Le Thanh Tong – Golden Age",
        story: "Lê Thánh Tông (1460-1497) là vị vua anh minh nhất nhà Lê. Ông ban hành Bộ luật Hồng Đức, cải cách hành chính, mở rộng lãnh thổ, phát triển giáo dục và văn hóa. Đây là thời kỳ hoàng kim của phong kiến VN.",
        storyEn: "Le Thanh Tong (1460-1497) was the greatest Later Le king. He issued the Hong Duc Legal Code, reformed administration, expanded territory, and developed education. This was feudal Vietnam's golden age.",
        keyDates: [
          { year: "1471", title: "Bộ luật Hồng Đức", titleEn: "Hong Duc Code", description: "Bộ luật tiến bộ.", descriptionEn: "Progressive legal code." },
        ],
        quiz: [
          { question: "Bộ luật Hồng Đức do ai ban hành?", questionEn: "Who issued Hong Duc Code?", options: ["Lê Lợi", "Lê Thánh Tông", "Nguyễn Trãi", "Lý Thái Tổ"], answer: 1, explanation: "Lê Thánh Tông.", explanationEn: "Le Thanh Tong." },
        ],
      },
    ],
  },
  {
    id: "hist-month-3", month: 3, title: "Lịch sử Cận đại", titleEn: "Modern History",
    icon: "⭐", color: "from-red-600 to-red-500",
    description: "Tây Sơn, Nguyễn, Pháp thuộc, và Hồ Chí Minh",
    descriptionEn: "Tay Son, Nguyen, French colonization, Ho Chi Minh",
    lessons: [
      {
        id: "hist-3-1", title: "Quang Trung đại phá quân Thanh", titleEn: "Quang Trung vs Qing",
        story: "Tết 1789, Hoàng đế Quang Trung (Nguyễn Huệ) hành quân thần tốc từ Phú Xuân ra Thăng Long, đại phá 29 vạn quân Thanh trong 5 ngày. Chiến dịch được coi là thiên tài quân sự.",
        storyEn: "Tet 1789, Emperor Quang Trung marched from Phu Xuan to Thang Long in a lightning campaign, crushing 290,000 Qing troops in 5 days. Considered a military genius.",
        keyDates: [{ year: "1789", title: "Đại phá quân Thanh", titleEn: "Crushed Qing Army", description: "5 ngày đánh tan 29 vạn quân.", descriptionEn: "5-day defeat of 290k troops." }],
        quiz: [{ question: "Quang Trung đánh Thanh trong mấy ngày?", questionEn: "How many days?", options: ["3", "5", "7", "10"], answer: 1, explanation: "5 ngày.", explanationEn: "5 days." }],
      },
      {
        id: "hist-3-2", title: "Nhà Nguyễn và Pháp xâm lược", titleEn: "Nguyen Dynasty & French Invasion",
        story: "Gia Long thống nhất VN (1802), đóng đô Huế. Năm 1858, Pháp tấn công Đà Nẵng, bắt đầu xâm lược. Hiệp ước 1862, 1874, 1884 dần nhượng toàn bộ VN cho Pháp.",
        storyEn: "Gia Long unified Vietnam (1802), capital at Hue. In 1858, France attacked Da Nang. Treaties of 1862, 1874, 1884 gradually ceded all of Vietnam to France.",
        keyDates: [
          { year: "1802", title: "Thống nhất", titleEn: "Unification", description: "Gia Long lên ngôi.", descriptionEn: "Gia Long crowned." },
          { year: "1858", title: "Pháp xâm lược", titleEn: "French Invasion", description: "Tấn công Đà Nẵng.", descriptionEn: "Attacked Da Nang." },
        ],
        quiz: [{ question: "Pháp xâm lược VN năm nào?", questionEn: "When did France invade?", options: ["1802", "1858", "1884", "1945"], answer: 1, explanation: "1858.", explanationEn: "1858." }],
      },
      {
        id: "hist-3-3", title: "Hồ Chí Minh và Cách mạng Tháng Tám", titleEn: "Ho Chi Minh & August Revolution",
        story: "Hồ Chí Minh (1890-1969) bôn ba 30 năm tìm đường cứu nước. 2/9/1945, tại Ba Đình, đọc Tuyên ngôn Độc lập khai sinh nước VNDCCH. Mở đầu: 'Tất cả mọi người đều sinh ra có quyền bình đẳng.'",
        storyEn: "Ho Chi Minh (1890-1969) spent 30 years abroad seeking liberation. Sep 2, 1945, at Ba Dinh Square, he read the Declaration of Independence. Opening: 'All men are created equal.'",
        keyDates: [
          { year: "1945", title: "Tuyên ngôn Độc lập", titleEn: "Independence Declaration", description: "2/9/1945 tại Ba Đình.", descriptionEn: "Sep 2, 1945 at Ba Dinh." },
        ],
        quiz: [{ question: "Ngày Quốc khánh VN?", questionEn: "Vietnam's National Day?", options: ["1/1", "2/9", "19/8", "30/4"], answer: 1, explanation: "2/9/1945.", explanationEn: "September 2, 1945." }],
      },
      {
        id: "hist-3-4", title: "Chiến thắng Điện Biên Phủ", titleEn: "Dien Bien Phu Victory",
        story: "Năm 1954, chiến dịch Điện Biên Phủ do Đại tướng Võ Nguyên Giáp chỉ huy kéo dài 56 ngày đêm. Quân đội VN đánh bại quân Pháp, chấm dứt thực dân Pháp ở Đông Dương. Trận đánh 'lừng lẫy năm châu, chấn động địa cầu'.",
        storyEn: "In 1954, the 56-day Dien Bien Phu campaign led by General Vo Nguyen Giap defeated the French, ending French colonialism in Indochina. A battle that 'shook the world.'",
        keyDates: [{ year: "1954", title: "Điện Biên Phủ", titleEn: "Dien Bien Phu", description: "56 ngày đêm.", descriptionEn: "56 days and nights." }],
        quiz: [{ question: "Ai chỉ huy ĐBP?", questionEn: "Who commanded DBP?", options: ["Hồ Chí Minh", "Võ Nguyên Giáp", "Phạm Văn Đồng", "Lê Duẩn"], answer: 1, explanation: "Đại tướng Võ Nguyên Giáp.", explanationEn: "General Vo Nguyen Giap." }],
      },
      {
        id: "hist-3-5", title: "Thống nhất đất nước 1975", titleEn: "National Reunification 1975",
        story: "Ngày 30/4/1975, xe tăng quân giải phóng tiến vào Dinh Độc Lập, Sài Gòn. Miền Nam hoàn toàn giải phóng, đất nước thống nhất sau hơn 20 năm chia cắt. Sài Gòn đổi tên thành TP. Hồ Chí Minh.",
        storyEn: "On April 30, 1975, liberation tanks entered Independence Palace, Saigon. South Vietnam was liberated, reunifying the country after 20+ years of division. Saigon was renamed Ho Chi Minh City.",
        keyDates: [{ year: "30/4/1975", title: "Thống nhất", titleEn: "Reunification", description: "Giải phóng miền Nam.", descriptionEn: "South liberated." }],
        quiz: [{ question: "Sài Gòn đổi tên thành gì?", questionEn: "Saigon renamed to?", options: ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Huế"], answer: 1, explanation: "TP. Hồ Chí Minh.", explanationEn: "Ho Chi Minh City." }],
      },
    ],
  },
  {
    id: "hist-month-4", month: 4, title: "Việt Nam Đương đại", titleEn: "Contemporary Vietnam",
    icon: "🌏", color: "from-emerald-600 to-teal-500",
    description: "Đổi Mới, hội nhập, phát triển và tương lai",
    descriptionEn: "Doi Moi, integration, development and future",
    lessons: [
      {
        id: "hist-4-1", title: "Đổi Mới 1986", titleEn: "Doi Moi Reform 1986",
        story: "Năm 1986, VN thực hiện Đổi Mới – chuyển từ kinh tế kế hoạch sang kinh tế thị trường. Bước ngoặt lịch sử giúp VN thoát khủng hoảng, thu hút đầu tư nước ngoài.",
        storyEn: "In 1986, Vietnam implemented Doi Moi – transitioning from planned to market economy. A historic turning point overcoming economic crisis.",
        keyDates: [{ year: "1986", title: "Đổi Mới", titleEn: "Doi Moi", description: "Mở cửa kinh tế.", descriptionEn: "Economic opening." }],
        quiz: [{ question: "Đổi Mới năm nào?", questionEn: "When was Doi Moi?", options: ["1975", "1980", "1986", "1990"], answer: 2, explanation: "1986.", explanationEn: "1986." }],
      },
      {
        id: "hist-4-2", title: "Gia nhập WTO và ASEAN", titleEn: "WTO & ASEAN Membership",
        story: "VN gia nhập ASEAN (1995), bình thường hóa quan hệ Mỹ (1995), gia nhập WTO (2007). Các bước hội nhập này đưa VN trở thành đối tác quan trọng trong khu vực và toàn cầu.",
        storyEn: "Vietnam joined ASEAN (1995), normalized US relations (1995), joined WTO (2007). These steps made Vietnam an important regional and global partner.",
        keyDates: [
          { year: "1995", title: "ASEAN & Mỹ", titleEn: "ASEAN & US", description: "Gia nhập ASEAN, bình thường hóa Mỹ.", descriptionEn: "Joined ASEAN, normalized US ties." },
          { year: "2007", title: "WTO", titleEn: "WTO", description: "Thành viên WTO.", descriptionEn: "WTO member." },
        ],
        quiz: [{ question: "VN gia nhập WTO năm?", questionEn: "When did VN join WTO?", options: ["1995", "2000", "2007", "2010"], answer: 2, explanation: "2007.", explanationEn: "2007." }],
      },
      {
        id: "hist-4-3", title: "Công nghệ và Kỷ nguyên số", titleEn: "Technology & Digital Era",
        story: "VN kết nối Internet (1997). Ngày nay, VN là trung tâm công nghệ mới nổi với các công ty như FPT, VNG, Viettel. Thanh toán di động, thương mại điện tử phát triển mạnh. Dân số trẻ và năng động.",
        storyEn: "Vietnam connected to the Internet in 1997. Today, it's an emerging tech hub with companies like FPT, VNG, Viettel. Mobile payments and e-commerce are booming. Young, dynamic population.",
        keyDates: [{ year: "1997", title: "Internet", titleEn: "Internet Arrives", description: "VN kết nối Internet.", descriptionEn: "Vietnam connected." }],
        quiz: [{ question: "Công ty công nghệ lớn của VN?", questionEn: "Major VN tech company?", options: ["Samsung", "FPT", "Apple", "Google"], answer: 1, explanation: "FPT, VNG, Viettel.", explanationEn: "FPT, VNG, Viettel." }],
      },
      {
        id: "hist-4-4", title: "Việt Nam trên trường quốc tế", titleEn: "Vietnam on the World Stage",
        story: "VN làm ủy viên không thường trực Hội đồng Bảo an LHQ (2008, 2020), chủ tịch ASEAN (2010, 2020), tổ chức APEC (2017), hội nghị thượng đỉnh Mỹ-Triều (2019). VN ngày càng có tiếng nói trên trường quốc tế.",
        storyEn: "Vietnam served as UN Security Council non-permanent member (2008, 2020), ASEAN Chair (2010, 2020), hosted APEC (2017) and US-DPRK Summit (2019). Vietnam's voice grows on the world stage.",
        keyDates: [{ year: "2020", title: "Chủ tịch ASEAN", titleEn: "ASEAN Chair", description: "Lần 2 làm chủ tịch.", descriptionEn: "2nd time as chair." }],
        quiz: [{ question: "VN tổ chức APEC năm?", questionEn: "When did VN host APEC?", options: ["2015", "2017", "2019", "2020"], answer: 1, explanation: "2017 tại Đà Nẵng.", explanationEn: "2017 in Da Nang." }],
      },
      {
        id: "hist-4-5", title: "Thách thức và Tương lai", titleEn: "Challenges & Future",
        story: "VN đối mặt nhiều thách thức: biến đổi khí hậu (Đồng bằng sông Cửu Long ngập lụt), bẫy thu nhập trung bình, chuyển đổi số, bảo vệ môi trường. Mục tiêu trở thành nước phát triển vào 2045.",
        storyEn: "Vietnam faces challenges: climate change (Mekong Delta flooding), middle-income trap, digital transformation, environmental protection. Goal: become a developed nation by 2045.",
        keyDates: [{ year: "2045", title: "Mục tiêu 2045", titleEn: "Vision 2045", description: "Nước phát triển.", descriptionEn: "Developed nation." }],
        quiz: [{ question: "Mục tiêu VN năm 2045?", questionEn: "Vietnam's 2045 goal?", options: ["Nước nghèo", "Nước phát triển", "Nước nông nghiệp", "Không có"], answer: 1, explanation: "Trở thành nước phát triển.", explanationEn: "Become a developed nation." }],
      },
    ],
  },
];
