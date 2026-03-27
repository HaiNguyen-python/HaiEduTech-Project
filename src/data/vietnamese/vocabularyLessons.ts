// Vietnamese vocabulary lessons — 20 lessons across 4 modules
import type { VietnameseModule } from "./types";

export const vocabularyModules: VietnameseModule[] = [
  {
    id: "vn-vocabulary",
    title: "Từ vựng cơ bản",
    titleEn: "Basic Vocabulary",
    icon: "📖",
    color: "from-yellow-500 to-red-500",
    description: "Từ vựng hàng ngày: ẩm thực, gia đình, mua sắm",
    descriptionEn: "Daily vocabulary: food, family, shopping",
    category: "vocabulary",
    lessons: [
      {
        id: "vn-vocab-food", title: "Ẩm thực Việt Nam", titleEn: "Vietnamese Cuisine", level: "beginner",
        theory: `## Ẩm thực Việt Nam 🍜\n\nMỗi vùng miền có món ăn đặc trưng:\n- **Miền Bắc**: Phở, bún chả, chả cá\n- **Miền Trung**: Bún bò Huế, mì Quảng, bánh xèo\n- **Miền Nam**: Cơm tấm, hủ tiếu, bánh mì Sài Gòn`,
        theoryEn: `## Vietnamese Cuisine 🍜\n\nEach region has signature dishes:\n- **North**: Phở, bún chả, chả cá\n- **Central**: Bún bò Huế, mì Quảng\n- **South**: Cơm tấm, hủ tiếu`,
        vocabulary: [
          { word: "phở", meaning: "soup bún truyền thống", meaningEn: "noodle soup", example: "Phở bò Hà Nội rất nổi tiếng.", exampleEn: "Hanoi beef pho is famous.", partOfSpeech: "noun" },
          { word: "bánh mì", meaning: "bánh mì ổ kiểu Việt", meaningEn: "Vietnamese baguette", example: "Mua một ổ bánh mì.", exampleEn: "Buy a banh mi.", partOfSpeech: "noun" },
          { word: "ngon", meaning: "có vị tốt", meaningEn: "delicious", example: "Món này rất ngon!", exampleEn: "This dish is delicious!", partOfSpeech: "adjective" },
          { word: "cay", meaning: "có vị ớt", meaningEn: "spicy", example: "Bún bò Huế rất cay.", exampleEn: "Hue noodles are spicy.", partOfSpeech: "adjective" },
          { word: "ngọt", meaning: "có vị đường", meaningEn: "sweet", example: "Chè rất ngọt.", exampleEn: "The dessert is sweet.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "'Phở' là món gì?", questionEn: "What is 'phở'?", options: ["Bánh", "Soup bún", "Xôi", "Cơm"], answer: 1, explanation: "Phở là soup bún truyền thống.", explanationEn: "Phở is traditional noodle soup." },
          { question: "'Ngon' có nghĩa là?", questionEn: "What does 'ngon' mean?", options: ["Ugly", "Spicy", "Delicious", "Cold"], answer: 2, explanation: "'Ngon' = delicious.", explanationEn: "'Ngon' = delicious." },
        ],
      },
      {
        id: "vn-vocab-family", title: "Gia đình & Quan hệ", titleEn: "Family & Relationships", level: "beginner",
        theory: `## Gia đình Việt Nam 👨‍👩‍👧‍👦\n\nHệ thống xưng hô rất phức tạp:\n- Bố/Ba – Father | Mẹ/Má – Mother\n- Anh – Older brother | Chị – Older sister | Em – Younger sibling\n- Ông nội/ngoại – Grandfather | Bà nội/ngoại – Grandmother\n- Chú – Uncle (father's younger brother) | Bác – Uncle (father's older brother)\n- Cô – Aunt (father's sister) | Dì – Aunt (mother's sister)`,
        theoryEn: `## Vietnamese Family 👨‍👩‍👧‍👦\n\nThe address system is complex:\n- Bố/Ba – Father | Mẹ/Má – Mother\n- Anh – Older brother | Chị – Older sister\n- Ông – Grandfather | Bà – Grandmother`,
        vocabulary: [
          { word: "bố", meaning: "cha", meaningEn: "father", example: "Bố tôi là bác sĩ.", exampleEn: "My father is a doctor.", partOfSpeech: "noun" },
          { word: "mẹ", meaning: "má", meaningEn: "mother", example: "Mẹ nấu ăn giỏi.", exampleEn: "Mom cooks well.", partOfSpeech: "noun" },
          { word: "gia đình", meaning: "tổ ấm", meaningEn: "family", example: "Gia đình tôi có 4 người.", exampleEn: "My family has 4 people.", partOfSpeech: "noun" },
          { word: "chú", meaning: "em trai của bố", meaningEn: "uncle (father's younger brother)", example: "Chú tôi ở Sài Gòn.", exampleEn: "My uncle lives in Saigon.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Ông nội' là ai?", questionEn: "Who is 'ông nội'?", options: ["Bố của mẹ", "Bố của bố", "Anh của bố", "Chú"], answer: 1, explanation: "Ông nội = bố của bố.", explanationEn: "Paternal grandfather." },
        ],
      },
      {
        id: "vn-vocab-colors", title: "Màu sắc & Hình dáng", titleEn: "Colors & Shapes", level: "beginner",
        theory: `## Màu sắc\n\n- **đỏ** – red | **xanh lá** – green | **xanh dương** – blue\n- **vàng** – yellow | **trắng** – white | **đen** – black\n- **tím** – purple | **hồng** – pink | **cam** – orange | **nâu** – brown\n\n## Hình dáng:\n- **tròn** – round | **vuông** – square | **dài** – long\n- **ngắn** – short | **to** – big | **nhỏ** – small`,
        theoryEn: `## Colors & Shapes\n\nColors: đỏ (red), xanh lá (green), xanh dương (blue), vàng (yellow), trắng (white), đen (black)\nShapes: tròn (round), vuông (square), dài (long), nhỏ (small)`,
        vocabulary: [
          { word: "đỏ", meaning: "màu đỏ", meaningEn: "red", example: "Hoa hồng đỏ.", exampleEn: "Red roses.", partOfSpeech: "adjective" },
          { word: "xanh", meaning: "màu xanh (lá hoặc dương)", meaningEn: "green / blue", example: "Trời xanh.", exampleEn: "Blue sky.", partOfSpeech: "adjective" },
          { word: "tròn", meaning: "hình tròn", meaningEn: "round", example: "Trái đất hình tròn.", exampleEn: "The Earth is round.", partOfSpeech: "adjective" },
          { word: "vàng", meaning: "màu vàng", meaningEn: "yellow / gold", example: "Lá vàng rơi.", exampleEn: "Yellow leaves fall.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "'Xanh lá' là màu gì?", questionEn: "What color is 'xanh lá'?", options: ["Blue", "Green", "Yellow", "Red"], answer: 1, explanation: "'Xanh lá' = green (lá = leaf).", explanationEn: "'Xanh lá' = green." },
        ],
      },
      {
        id: "vn-vocab-body", title: "Cơ thể con người", titleEn: "Human Body", level: "beginner",
        theory: `## Các bộ phận cơ thể\n\n### Đầu:\n- **đầu** – head | **tóc** – hair | **mắt** – eyes | **mũi** – nose\n- **miệng** – mouth | **tai** – ears | **răng** – teeth\n\n### Thân:\n- **vai** – shoulders | **ngực** – chest | **bụng** – stomach\n- **lưng** – back | **tay** – arm/hand | **chân** – leg/foot`,
        theoryEn: `## Body Parts\n\nHead: đầu (head), tóc (hair), mắt (eyes), mũi (nose), miệng (mouth)\nBody: vai (shoulders), tay (arm/hand), chân (leg/foot)`,
        vocabulary: [
          { word: "mắt", meaning: "bộ phận để nhìn", meaningEn: "eyes", example: "Mắt cô ấy đẹp.", exampleEn: "Her eyes are beautiful.", partOfSpeech: "noun" },
          { word: "tay", meaning: "chi trên", meaningEn: "arm / hand", example: "Rửa tay trước khi ăn.", exampleEn: "Wash hands before eating.", partOfSpeech: "noun" },
          { word: "chân", meaning: "chi dưới", meaningEn: "leg / foot", example: "Đau chân quá!", exampleEn: "My feet hurt!", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Mũi' là bộ phận nào?", questionEn: "What is 'mũi'?", options: ["Mouth", "Nose", "Eyes", "Ears"], answer: 1, explanation: "'Mũi' = nose.", explanationEn: "'Mũi' = nose." },
        ],
      },
      {
        id: "vn-vocab-numbers", title: "Số đếm & Thời gian", titleEn: "Numbers & Time", level: "beginner",
        theory: `## Số đếm\n\n1-một, 2-hai, 3-ba, 4-bốn, 5-năm, 6-sáu, 7-bảy, 8-tám, 9-chín, 10-mười\n11-mười một, 20-hai mươi, 100-một trăm, 1000-một nghìn\n\n## Thời gian:\n- **giờ** – hour/o'clock: 3 giờ (3 o'clock)\n- **phút** – minute: 15 phút\n- **ngày** – day | **tuần** – week | **tháng** – month | **năm** – year`,
        theoryEn: `## Numbers: 1-một to 10-mười. 100-một trăm. 1000-một nghìn.\n## Time: giờ (hour), phút (minute), ngày (day), tuần (week), tháng (month), năm (year)`,
        vocabulary: [
          { word: "mười", meaning: "số 10", meaningEn: "ten", example: "Mười cái bút.", exampleEn: "Ten pens.", partOfSpeech: "number" },
          { word: "giờ", meaning: "đơn vị thời gian", meaningEn: "hour / o'clock", example: "Bây giờ là 3 giờ.", exampleEn: "It's 3 o'clock now.", partOfSpeech: "noun" },
          { word: "ngày", meaning: "24 tiếng", meaningEn: "day", example: "Hôm nay là ngày đẹp trời.", exampleEn: "Today is a nice day.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Hai mươi' là số mấy?", questionEn: "What number is 'hai mươi'?", options: ["12", "20", "22", "200"], answer: 1, explanation: "Hai mươi = 20.", explanationEn: "Hai mươi = 20." },
        ],
      },
    ],
  },
  {
    id: "vn-vocab-daily",
    title: "Từ vựng đời sống",
    titleEn: "Daily Life Vocabulary",
    icon: "🏠",
    color: "from-green-500 to-lime-500",
    description: "Mua sắm, giao thông, trường học, bệnh viện",
    descriptionEn: "Shopping, transport, school, hospital",
    category: "vocabulary",
    lessons: [
      {
        id: "vn-vocab-shopping", title: "Mua sắm & Chợ", titleEn: "Shopping & Market", level: "beginner",
        theory: `## Mua sắm ở Việt Nam 🛒\n\n### Hội thoại mẫu:\n- Bao nhiêu tiền? (How much?)\n- Đắt quá! Bớt được không? (Too expensive! Can you lower it?)\n- Rẻ hơn đi! (Make it cheaper!)\n\n### Từ vựng:\n- **mua** – to buy | **bán** – to sell\n- **giá** – price | **tiền** – money\n- **đắt** – expensive | **rẻ** – cheap\n- **mặc cả** – to bargain`,
        theoryEn: `## Shopping in Vietnam\n\nKey phrases: Bao nhiêu tiền? (How much?), Bớt được không? (Can you lower the price?)`,
        vocabulary: [
          { word: "mua", meaning: "trao tiền lấy hàng", meaningEn: "to buy", example: "Tôi muốn mua áo.", exampleEn: "I want to buy a shirt.", partOfSpeech: "verb" },
          { word: "bán", meaning: "trao hàng lấy tiền", meaningEn: "to sell", example: "Cửa hàng bán trái cây.", exampleEn: "The shop sells fruit.", partOfSpeech: "verb" },
          { word: "giá", meaning: "số tiền phải trả", meaningEn: "price", example: "Giá bao nhiêu?", exampleEn: "How much is the price?", partOfSpeech: "noun" },
          { word: "mặc cả", meaning: "thương lượng giá", meaningEn: "to bargain", example: "Ở chợ có thể mặc cả.", exampleEn: "You can bargain at the market.", partOfSpeech: "verb" },
        ],
        quiz: [
          { question: "'Bao nhiêu tiền?' hỏi về gì?", questionEn: "What does it ask?", options: ["Thời gian", "Giá tiền", "Địa điểm", "Số lượng"], answer: 1, explanation: "Hỏi về giá tiền.", explanationEn: "Asks about the price." },
        ],
      },
      {
        id: "vn-vocab-transport", title: "Giao thông", titleEn: "Transportation", level: "beginner",
        theory: `## Phương tiện giao thông\n\n- **xe máy** – motorbike (phổ biến nhất!)\n- **ô tô / xe hơi** – car\n- **xe buýt** – bus | **xe đạp** – bicycle\n- **tàu hỏa** – train | **máy bay** – airplane\n- **taxi** – taxi | **xe ôm** – motorbike taxi\n- **tàu thuyền** – boat/ship`,
        theoryEn: `## Transportation\n\n- xe máy (motorbike – most common!)\n- ô tô (car), xe buýt (bus), xe đạp (bicycle)\n- tàu hỏa (train), máy bay (airplane)`,
        vocabulary: [
          { word: "xe máy", meaning: "phương tiện 2 bánh có động cơ", meaningEn: "motorbike", example: "Người Việt thường đi xe máy.", exampleEn: "Vietnamese people often ride motorbikes.", partOfSpeech: "noun" },
          { word: "máy bay", meaning: "phương tiện bay", meaningEn: "airplane", example: "Đi máy bay ra Hà Nội.", exampleEn: "Fly to Hanoi.", partOfSpeech: "noun" },
          { word: "đường", meaning: "nơi di chuyển", meaningEn: "road / street", example: "Đường phố Sài Gòn rất đông.", exampleEn: "Saigon streets are crowded.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Phương tiện phổ biến nhất ở VN?", questionEn: "Most common transport in Vietnam?", options: ["Ô tô", "Xe máy", "Xe buýt", "Tàu hỏa"], answer: 1, explanation: "Xe máy là phổ biến nhất.", explanationEn: "Motorbikes are the most common." },
        ],
      },
      {
        id: "vn-vocab-school", title: "Trường học", titleEn: "School & Education", level: "beginner",
        theory: `## Trường học\n\n- **học sinh** – student (K-12) | **sinh viên** – university student\n- **giáo viên / thầy / cô** – teacher\n- **lớp** – class | **trường** – school\n- **bài tập** – homework | **thi** – exam\n- **điểm** – score/grade | **học bổng** – scholarship`,
        theoryEn: `## School\n\nhọc sinh (student), giáo viên (teacher), lớp (class), trường (school), bài tập (homework), thi (exam)`,
        vocabulary: [
          { word: "học sinh", meaning: "người đi học", meaningEn: "student", example: "Học sinh đi học lúc 7 giờ.", exampleEn: "Students go to school at 7.", partOfSpeech: "noun" },
          { word: "bài tập", meaning: "công việc nhà được giao", meaningEn: "homework", example: "Làm bài tập xong chưa?", exampleEn: "Have you finished homework?", partOfSpeech: "noun" },
          { word: "thi", meaning: "kiểm tra kiến thức", meaningEn: "exam / test", example: "Ngày mai thi toán.", exampleEn: "Math exam tomorrow.", partOfSpeech: "verb/noun" },
        ],
        quiz: [
          { question: "'Sinh viên' khác 'học sinh' ở đâu?", questionEn: "Difference between them?", options: ["Giống nhau", "Sinh viên = đại học", "Học sinh = đại học", "Không có"], answer: 1, explanation: "Sinh viên = university student.", explanationEn: "Sinh viên = university student." },
        ],
      },
      {
        id: "vn-vocab-weather", title: "Thời tiết & Mùa", titleEn: "Weather & Seasons", level: "beginner",
        theory: `## Thời tiết\n\n- **nắng** – sunny | **mưa** – rainy | **gió** – windy\n- **nóng** – hot | **lạnh** – cold | **ấm** – warm | **mát** – cool\n- **bão** – storm | **sấm** – thunder | **chớp** – lightning\n\n## Mùa:\n- Miền Bắc: xuân, hạ, thu, đông (4 mùa)\n- Miền Nam: mùa mưa, mùa khô (2 mùa)`,
        theoryEn: `## Weather: nắng (sunny), mưa (rainy), nóng (hot), lạnh (cold)\n## Seasons: North has 4 seasons, South has 2 (rainy/dry)`,
        vocabulary: [
          { word: "mưa", meaning: "nước rơi từ trời", meaningEn: "rain", example: "Hôm nay trời mưa.", exampleEn: "It's raining today.", partOfSpeech: "noun/verb" },
          { word: "nóng", meaning: "nhiệt độ cao", meaningEn: "hot", example: "Sài Gòn rất nóng.", exampleEn: "Saigon is very hot.", partOfSpeech: "adjective" },
          { word: "lạnh", meaning: "nhiệt độ thấp", meaningEn: "cold", example: "Mùa đông rất lạnh.", exampleEn: "Winter is very cold.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "Miền Nam có mấy mùa?", questionEn: "How many seasons in the South?", options: ["4", "3", "2", "1"], answer: 2, explanation: "Miền Nam có 2 mùa: mưa và khô.", explanationEn: "South has 2 seasons: rainy and dry." },
        ],
      },
      {
        id: "vn-vocab-emotions", title: "Cảm xúc & Tính cách", titleEn: "Emotions & Personality", level: "intermediate",
        theory: `## Cảm xúc\n\n- **vui** – happy | **buồn** – sad | **giận** – angry\n- **sợ** – scared | **ngạc nhiên** – surprised\n- **lo lắng** – worried | **hạnh phúc** – happy (deeper)\n- **xấu hổ** – embarrassed | **tự hào** – proud\n\n## Tính cách:\n- **tốt bụng** – kind | **thông minh** – smart\n- **lười** – lazy | **chăm chỉ** – hardworking\n- **hài hước** – funny | **nghiêm túc** – serious`,
        theoryEn: `## Emotions: vui (happy), buồn (sad), giận (angry), sợ (scared)\n## Personality: tốt bụng (kind), thông minh (smart), chăm chỉ (hardworking)`,
        vocabulary: [
          { word: "vui", meaning: "cảm giác tích cực", meaningEn: "happy", example: "Tôi rất vui!", exampleEn: "I'm very happy!", partOfSpeech: "adjective" },
          { word: "buồn", meaning: "cảm giác tiêu cực", meaningEn: "sad", example: "Đừng buồn nữa.", exampleEn: "Don't be sad.", partOfSpeech: "adjective" },
          { word: "thông minh", meaning: "trí tuệ cao", meaningEn: "smart / intelligent", example: "Em bé rất thông minh.", exampleEn: "The child is very smart.", partOfSpeech: "adjective" },
        ],
        quiz: [
          { question: "'Xấu hổ' nghĩa là gì?", questionEn: "What does 'xấu hổ' mean?", options: ["Angry", "Embarrassed", "Happy", "Scared"], answer: 1, explanation: "'Xấu hổ' = embarrassed.", explanationEn: "'Xấu hổ' = embarrassed." },
        ],
      },
    ],
  },
  {
    id: "vn-vocab-advanced",
    title: "Từ vựng nâng cao",
    titleEn: "Advanced Vocabulary",
    icon: "📚",
    color: "from-indigo-500 to-purple-500",
    description: "Công nghệ, y tế, kinh tế, pháp luật",
    descriptionEn: "Technology, health, economics, law",
    category: "vocabulary",
    lessons: [
      {
        id: "vn-vocab-tech", title: "Công nghệ & Internet", titleEn: "Technology & Internet", level: "intermediate",
        theory: `## Công nghệ\n\n- **điện thoại** – phone | **máy tính** – computer\n- **mạng** – network/internet | **ứng dụng** – app\n- **trí tuệ nhân tạo** – artificial intelligence\n- **dữ liệu** – data | **phần mềm** – software\n- **trang web** – website | **mật khẩu** – password`,
        theoryEn: `## Technology\n\nđiện thoại (phone), máy tính (computer), mạng (internet), ứng dụng (app), trí tuệ nhân tạo (AI)`,
        vocabulary: [
          { word: "điện thoại", meaning: "thiết bị liên lạc", meaningEn: "phone", example: "Điện thoại thông minh.", exampleEn: "Smartphone.", partOfSpeech: "noun" },
          { word: "máy tính", meaning: "thiết bị xử lý dữ liệu", meaningEn: "computer", example: "Tôi dùng máy tính xách tay.", exampleEn: "I use a laptop.", partOfSpeech: "noun" },
          { word: "mật khẩu", meaning: "mã bảo mật", meaningEn: "password", example: "Đổi mật khẩu thường xuyên.", exampleEn: "Change your password regularly.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "'Trí tuệ nhân tạo' là gì?", questionEn: "What is it?", options: ["Cloud", "AI", "Database", "Software"], answer: 1, explanation: "Trí tuệ nhân tạo = AI.", explanationEn: "Trí tuệ nhân tạo = AI." },
        ],
      },
      {
        id: "vn-vocab-health", title: "Sức khỏe & Y tế", titleEn: "Health & Medicine", level: "intermediate",
        theory: `## Sức khỏe\n\n- **bệnh viện** – hospital | **bác sĩ** – doctor\n- **thuốc** – medicine | **bệnh** – illness/disease\n- **sốt** – fever | **ho** – cough | **đau** – pain\n- **khỏe** – healthy | **ốm** – sick\n- **tiêm** – inject | **xét nghiệm** – test/exam`,
        theoryEn: `## Health\n\nbệnh viện (hospital), bác sĩ (doctor), thuốc (medicine), bệnh (illness)`,
        vocabulary: [
          { word: "bác sĩ", meaning: "người chữa bệnh", meaningEn: "doctor", example: "Đi khám bác sĩ.", exampleEn: "Go see a doctor.", partOfSpeech: "noun" },
          { word: "thuốc", meaning: "chất chữa bệnh", meaningEn: "medicine", example: "Uống thuốc đúng giờ.", exampleEn: "Take medicine on time.", partOfSpeech: "noun" },
          { word: "đau", meaning: "cảm giác khó chịu", meaningEn: "pain / hurt", example: "Đau đầu quá!", exampleEn: "Such a headache!", partOfSpeech: "adjective/verb" },
        ],
        quiz: [
          { question: "'Ốm' nghĩa là gì?", questionEn: "What does 'ốm' mean?", options: ["Healthy", "Sick", "Fat", "Thin"], answer: 1, explanation: "'Ốm' = sick (miền Bắc), thin (miền Nam).", explanationEn: "'Ốm' = sick (Northern) / thin (Southern)." },
        ],
      },
      {
        id: "vn-vocab-work", title: "Nghề nghiệp & Công việc", titleEn: "Jobs & Careers", level: "intermediate",
        theory: `## Nghề nghiệp\n\n- **bác sĩ** – doctor | **giáo viên** – teacher\n- **kỹ sư** – engineer | **luật sư** – lawyer\n- **nhà báo** – journalist | **lập trình viên** – programmer\n- **doanh nhân** – entrepreneur | **nông dân** – farmer\n- **diễn viên** – actor | **ca sĩ** – singer`,
        theoryEn: `## Jobs\n\nbác sĩ (doctor), giáo viên (teacher), kỹ sư (engineer), luật sư (lawyer), lập trình viên (programmer)`,
        vocabulary: [
          { word: "kỹ sư", meaning: "người làm kỹ thuật", meaningEn: "engineer", example: "Anh ấy là kỹ sư phần mềm.", exampleEn: "He is a software engineer.", partOfSpeech: "noun" },
          { word: "lương", meaning: "tiền công hàng tháng", meaningEn: "salary", example: "Lương tháng này cao.", exampleEn: "This month's salary is high.", partOfSpeech: "noun" },
          { word: "xin việc", meaning: "nộp đơn tìm việc", meaningEn: "to apply for a job", example: "Tôi đang xin việc.", exampleEn: "I'm applying for a job.", partOfSpeech: "verb phrase" },
        ],
        quiz: [
          { question: "'Lập trình viên' làm gì?", questionEn: "What does a 'lập trình viên' do?", options: ["Dạy học", "Viết code", "Chữa bệnh", "Viết báo"], answer: 1, explanation: "Lập trình viên = programmer.", explanationEn: "Lập trình viên = programmer." },
        ],
      },
      {
        id: "vn-vocab-nature", title: "Thiên nhiên & Động vật", titleEn: "Nature & Animals", level: "beginner",
        theory: `## Thiên nhiên\n\n- **núi** – mountain | **sông** – river | **biển** – sea\n- **rừng** – forest | **hồ** – lake | **đảo** – island\n- **cây** – tree | **hoa** – flower | **lá** – leaf\n\n## Động vật:\n- **chó** – dog | **mèo** – cat | **gà** – chicken\n- **trâu** – buffalo | **voi** – elephant | **cá** – fish\n- **chim** – bird | **rắn** – snake | **hổ** – tiger`,
        theoryEn: `## Nature: núi (mountain), sông (river), biển (sea), rừng (forest)\n## Animals: chó (dog), mèo (cat), trâu (buffalo), voi (elephant)`,
        vocabulary: [
          { word: "biển", meaning: "vùng nước mặn lớn", meaningEn: "sea / ocean", example: "Đi biển mùa hè.", exampleEn: "Go to the beach in summer.", partOfSpeech: "noun" },
          { word: "trâu", meaning: "gia súc lớn", meaningEn: "water buffalo", example: "Trâu là bạn nhà nông.", exampleEn: "The buffalo is the farmer's friend.", partOfSpeech: "noun" },
          { word: "hoa", meaning: "bộ phận đẹp của cây", meaningEn: "flower", example: "Hoa sen là quốc hoa.", exampleEn: "Lotus is the national flower.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Quốc hoa Việt Nam là gì?", questionEn: "Vietnam's national flower?", options: ["Hoa hồng", "Hoa sen", "Hoa mai", "Hoa đào"], answer: 1, explanation: "Hoa sen = lotus.", explanationEn: "Lotus is Vietnam's national flower." },
        ],
      },
      {
        id: "vn-vocab-travel", title: "Du lịch & Địa danh", titleEn: "Travel & Landmarks", level: "intermediate",
        theory: `## Du lịch Việt Nam 🏖️\n\n### Địa danh nổi tiếng:\n- **Hạ Long** – Vịnh Hạ Long (UNESCO)\n- **Hội An** – Phố cổ đèn lồng\n- **Phú Quốc** – Đảo ngọc\n- **Sapa** – Ruộng bậc thang\n- **Đà Lạt** – Thành phố ngàn hoa\n- **Huế** – Kinh đô cổ\n\n### Từ vựng du lịch:\n- **khách sạn** – hotel | **vé** – ticket | **hướng dẫn viên** – guide`,
        theoryEn: `## Travel in Vietnam\n\nFamous landmarks: Ha Long Bay, Hoi An, Phu Quoc, Sapa, Da Lat, Hue`,
        vocabulary: [
          { word: "du lịch", meaning: "đi chơi xa", meaningEn: "travel / tourism", example: "Tôi thích du lịch.", exampleEn: "I like traveling.", partOfSpeech: "noun/verb" },
          { word: "khách sạn", meaning: "nơi ở tạm khi du lịch", meaningEn: "hotel", example: "Đặt khách sạn trước.", exampleEn: "Book a hotel in advance.", partOfSpeech: "noun" },
          { word: "vé", meaning: "giấy cho phép vào", meaningEn: "ticket", example: "Mua vé máy bay.", exampleEn: "Buy airplane tickets.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Vịnh Hạ Long thuộc tổ chức nào?", questionEn: "Ha Long Bay is recognized by?", options: ["ASEAN", "UNESCO", "WHO", "WTO"], answer: 1, explanation: "Vịnh Hạ Long là di sản UNESCO.", explanationEn: "Ha Long Bay is a UNESCO heritage site." },
        ],
      },
    ],
  },
  {
    id: "vn-vocab-culture",
    title: "Từ vựng văn hóa",
    titleEn: "Cultural Vocabulary",
    icon: "🎭",
    color: "from-rose-500 to-pink-500",
    description: "Lễ hội, trang phục, âm nhạc, tôn giáo",
    descriptionEn: "Festivals, clothing, music, religion",
    category: "vocabulary",
    lessons: [
      {
        id: "vn-vocab-festivals", title: "Lễ hội & Truyền thống", titleEn: "Festivals & Traditions", level: "intermediate",
        theory: `## Lễ hội Việt Nam 🎊\n\n- **Tết Nguyên Đán** – Lunar New Year (lễ lớn nhất)\n- **Tết Trung Thu** – Mid-Autumn Festival\n- **Giỗ Tổ Hùng Vương** – Hung Kings' Anniversary\n- **Lễ Vu Lan** – Ghost Festival / Parents' Day\n\n### Phong tục Tết:\n- Lì xì (red envelope) | Mâm ngũ quả (five-fruit tray)\n- Hoa mai (South) / Hoa đào (North)\n- Bánh chưng / Bánh tét`,
        theoryEn: `## Vietnamese Festivals\n\n- Tết Nguyên Đán – Lunar New Year\n- Tết Trung Thu – Mid-Autumn\n- Giỗ Tổ Hùng Vương – Hung Kings' Anniversary`,
        vocabulary: [
          { word: "Tết", meaning: "lễ hội đầu năm âm lịch", meaningEn: "Lunar New Year", example: "Tết là lễ lớn nhất.", exampleEn: "Tet is the biggest holiday.", partOfSpeech: "noun" },
          { word: "lì xì", meaning: "phong bao đỏ có tiền", meaningEn: "red envelope (lucky money)", example: "Trẻ em thích lì xì.", exampleEn: "Children love lucky money.", partOfSpeech: "noun" },
          { word: "bánh chưng", meaning: "bánh gạo vuông nhân thịt", meaningEn: "square sticky rice cake", example: "Gói bánh chưng ngày Tết.", exampleEn: "Making banh chung for Tet.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Lễ hội lớn nhất Việt Nam?", questionEn: "Biggest Vietnamese festival?", options: ["Trung Thu", "Tết Nguyên Đán", "Vu Lan", "Giỗ Tổ"], answer: 1, explanation: "Tết Nguyên Đán là lễ lớn nhất.", explanationEn: "Tet is the biggest festival." },
        ],
      },
      {
        id: "vn-vocab-clothing", title: "Trang phục", titleEn: "Clothing & Fashion", level: "beginner",
        theory: `## Trang phục\n\n- **áo** – shirt/top | **quần** – pants | **váy** – skirt/dress\n- **áo dài** – Vietnamese traditional dress\n- **giày** – shoes | **dép** – sandals/flip-flops\n- **mũ / nón** – hat | **nón lá** – conical hat\n- **khăn** – scarf | **kính** – glasses`,
        theoryEn: `## Clothing\n\náo (shirt), quần (pants), váy (dress), áo dài (traditional dress), nón lá (conical hat)`,
        vocabulary: [
          { word: "áo dài", meaning: "trang phục truyền thống VN", meaningEn: "Vietnamese traditional dress", example: "Áo dài rất đẹp.", exampleEn: "Ao dai is very beautiful.", partOfSpeech: "noun" },
          { word: "nón lá", meaning: "nón hình chóp bằng lá", meaningEn: "conical leaf hat", example: "Nón lá là biểu tượng VN.", exampleEn: "Conical hat is a VN symbol.", partOfSpeech: "noun" },
        ],
        quiz: [
          { question: "Trang phục truyền thống VN?", questionEn: "Vietnamese traditional dress?", options: ["Kimono", "Áo dài", "Hanbok", "Sari"], answer: 1, explanation: "Áo dài = Vietnamese traditional dress.", explanationEn: "Áo dài is the Vietnamese traditional dress." },
        ],
      },
      {
        id: "vn-vocab-food-advanced", title: "Ẩm thực nâng cao", titleEn: "Advanced Cuisine", level: "advanced",
        theory: `## Ẩm thực chuyên sâu\n\n### Gia vị:\n- **nước mắm** – fish sauce | **ớt** – chili\n- **hành** – onion/scallion | **tỏi** – garlic\n- **gừng** – ginger | **sả** – lemongrass\n\n### Cách chế biến:\n- **chiên / rán** – fry | **luộc** – boil\n- **nướng** – grill | **hấp** – steam\n- **xào** – stir-fry | **kho** – braise\n\n### Vị:\n- **mặn** – salty | **chua** – sour | **béo** – fatty/rich`,
        theoryEn: `## Advanced Cuisine\n\nSpices: nước mắm (fish sauce), ớt (chili), sả (lemongrass)\nCooking: chiên (fry), luộc (boil), nướng (grill), xào (stir-fry)`,
        vocabulary: [
          { word: "nước mắm", meaning: "gia vị từ cá", meaningEn: "fish sauce", example: "Nước mắm là linh hồn ẩm thực VN.", exampleEn: "Fish sauce is the soul of VN cuisine.", partOfSpeech: "noun" },
          { word: "xào", meaning: "chiên nhanh với ít dầu", meaningEn: "stir-fry", example: "Xào rau với tỏi.", exampleEn: "Stir-fry vegetables with garlic.", partOfSpeech: "verb" },
          { word: "kho", meaning: "nấu lâu với gia vị đậm", meaningEn: "to braise", example: "Thịt kho tàu.", exampleEn: "Braised pork.", partOfSpeech: "verb" },
        ],
        quiz: [
          { question: "'Nước mắm' được làm từ gì?", questionEn: "What is fish sauce made from?", options: ["Đậu", "Cá", "Thịt", "Rau"], answer: 1, explanation: "Nước mắm từ cá lên men.", explanationEn: "Fish sauce is made from fermented fish." },
        ],
      },
    ],
  },
];
